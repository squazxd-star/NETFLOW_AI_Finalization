/**
 * Netflow AI — Grok Imagine Automation (content-grok.ts)
 * 
 * Content script injected into https://grok.com/imagine
 * Handles: prompt input, settings configuration, generation trigger,
 * video monitoring, and download.
 * 
 * ┌──────────────────────────────────────────────────────────┐
 * │  GROK IMAGINE PAGE STRUCTURE                             │
 * │                                                          │
 * │  Prompt bar (bottom):                                    │
 * │  ┌─────────────────────────────────────────────────────┐ │
 * │  │ 🎨  "Type to imagine"          [🟢 upload]         │ │
 * │  │ [Image] [Video] [16:9 ▼] [480p] [720p] [6s] [10s] │ │
 * │  └─────────────────────────────────────────────────────┘ │
 * │                                                          │
 * │  Settings toggles:                                       │
 * │  - Image / Video mode toggle                             │
 * │  - Aspect ratio dropdown: 2:3, 3:2, 1:1, 9:16, 16:9    │
 * │  - Resolution: 480p, 720p (SuperGrok)                    │
 * │  - Duration: 6s, 10s (SuperGrok)                         │
 * │                                                          │
 * │  Editor: TipTap-based contenteditable                    │
 * └──────────────────────────────────────────────────────────┘
 */

// ─── Types ───────────────────────────────────────────────────────────────────
interface GrokAutomationMessage {
    action: string;
    videoEngine?: string;
    imagePrompt?: string;
    videoPrompt?: string;
    videoScenePrompts?: string[];
    sceneCount?: number;
    productImage?: string;
    characterImage?: string;
    grokAspectRatio?: string;
    grokResolution?: string;
    grokDuration?: string;
    orientation?: string;
    theme?: string;
}

// ─── State ───────────────────────────────────────────────────────────────────
let isAutomating = false;

// ─── Logging ─────────────────────────────────────────────────────────────────
const LOG_PREFIX = "[Netflow/Grok]";
const log = (...args: any[]) => console.log(LOG_PREFIX, ...args);
const warn = (...args: any[]) => console.warn(LOG_PREFIX, ...args);
const error = (...args: any[]) => console.error(LOG_PREFIX, ...args);

// ─── Anti-Throttle: Web Worker Timer ─────────────────────────────────────────
// Chrome throttles setTimeout in background/minimized tabs. Web Workers are NOT throttled.
let _grokTimerWorker: Worker | null = null;
const _grokPendingTimers = new Map<number, () => void>();
let _grokTimerId = 0;

function getGrokTimerWorker(): Worker | null {
    if (_grokTimerWorker) return _grokTimerWorker;
    try {
        const blob = new Blob([
            `self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};`
        ], { type: 'application/javascript' });
        _grokTimerWorker = new Worker(URL.createObjectURL(blob));
        _grokTimerWorker.onmessage = (e: MessageEvent) => {
            const cb = _grokPendingTimers.get(e.data);
            if (cb) { _grokPendingTimers.delete(e.data); cb(); }
        };
        log('⚡ Web Worker timer created — background tab throttling defeated');
        return _grokTimerWorker;
    } catch (_) { return null; }
}

const sleep = (ms: number) => new Promise<void>(resolve => {
    const worker = getGrokTimerWorker();
    if (worker) {
        const id = ++_grokTimerId;
        _grokPendingTimers.set(id, resolve);
        worker.postMessage({ id, ms });
    } else {
        setTimeout(resolve, ms);
    }
});

const waitFor = async (
    predicate: () => HTMLElement | null,
    timeout = 10000,
    interval = 300,
    label = "element"
): Promise<HTMLElement | null> => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const el = predicate();
        if (el) return el;
        await sleep(interval);
    }
    warn(`waitFor("${label}") timed out after ${timeout}ms`);
    return null;
};

// ═══════════════════════════════════════════════════════════════════════════════
// DOM Finders — เพิ่ม strategy หา element ตรงนี้
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * หา prompt input (TipTap contenteditable)
 * ดูจาก placeholder "Type to imagine"
 */
const findPromptInput = (): HTMLElement | null => {
    // Strategy 1: Find by placeholder text
    const placeholders = document.querySelectorAll('[data-placeholder="Type to imagine"]');
    if (placeholders.length > 0) return placeholders[0] as HTMLElement;

    // Strategy 2: Find contenteditable with ProseMirror class (TipTap)
    const proseMirror = document.querySelector('.ProseMirror[contenteditable="true"]');
    if (proseMirror) return proseMirror as HTMLElement;

    // Strategy 3: Find any contenteditable near the bottom prompt bar
    const editables = document.querySelectorAll('[contenteditable="true"]');
    for (const el of editables) {
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.7) return el as HTMLElement;
    }

    return null;
};

/**
 * หาปุ่ม submit (ลูกศร ↑) ใน prompt bar
 */
const findSubmitButton = (): HTMLElement | null => {
    // Strategy 1: Find by aria-label
    const ariaBtn = document.querySelector('button[aria-label="Submit"]') ||
                    document.querySelector('button[aria-label="send"]') ||
                    document.querySelector('button[aria-label="Generate"]');
    if (ariaBtn) return ariaBtn as HTMLElement;

    // Strategy 2: Find the last button in the prompt bar area
    const promptBar = document.querySelector('[class*="query-bar"]') ||
                      document.querySelector('[class*="prompt"]') ||
                      document.querySelector('[class*="imagine"]');
    if (promptBar) {
        const buttons = promptBar.querySelectorAll('button');
        if (buttons.length > 0) return buttons[buttons.length - 1] as HTMLElement;
    }

    // Strategy 3: Find button with arrow SVG icon near bottom
    const allButtons = document.querySelectorAll('button');
    for (const btn of allButtons) {
        const rect = (btn as HTMLElement).getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.85 && rect.right > window.innerWidth * 0.8) {
            return btn as HTMLElement;
        }
    }

    return null;
};

/**
 * คลิกเลือก Video mode (ถ้ายังไม่ได้เลือก)
 */
const selectVideoMode = async (): Promise<boolean> => {
    // Find "Video" button/toggle in prompt bar
    const buttons = document.querySelectorAll('button, [role="tab"], [role="option"]');
    for (const btn of buttons) {
        const text = (btn as HTMLElement).textContent?.trim().toLowerCase();
        if (text === 'video') {
            (btn as HTMLElement).click();
            await sleep(300);
            log("Selected Video mode");
            return true;
        }
    }
    warn("Could not find Video mode toggle");
    return false;
};

/**
 * เลือก Aspect Ratio จาก dropdown
 */
const selectAspectRatio = async (ratio: string): Promise<boolean> => {
    // Find current aspect ratio button/dropdown trigger
    const triggers = document.querySelectorAll('button, [role="button"]');
    for (const trigger of triggers) {
        const text = (trigger as HTMLElement).textContent?.trim();
        if (text && /^\d+:\d+/.test(text)) {
            // This looks like an aspect ratio button — click to open dropdown
            (trigger as HTMLElement).click();
            await sleep(400);
            break;
        }
    }

    // Find the ratio option in dropdown
    await sleep(200);
    const options = document.querySelectorAll('[role="option"], [role="menuitem"], button, div');
    for (const opt of options) {
        const text = (opt as HTMLElement).textContent?.trim();
        if (text === ratio) {
            (opt as HTMLElement).click();
            await sleep(200);
            log(`Selected aspect ratio: ${ratio}`);
            return true;
        }
    }
    warn(`Could not find aspect ratio option: ${ratio}`);
    return false;
};

/**
 * เลือก Resolution (480p / 720p)
 */
const selectResolution = async (resolution: string): Promise<boolean> => {
    const buttons = document.querySelectorAll('button, [role="tab"], [role="option"]');
    for (const btn of buttons) {
        const text = (btn as HTMLElement).textContent?.trim().toLowerCase();
        if (text === resolution.toLowerCase()) {
            (btn as HTMLElement).click();
            await sleep(200);
            log(`Selected resolution: ${resolution}`);
            return true;
        }
    }
    warn(`Could not find resolution option: ${resolution}`);
    return false;
};

/**
 * เลือก Duration (6s / 10s)
 */
const selectDuration = async (duration: string): Promise<boolean> => {
    const buttons = document.querySelectorAll('button, [role="tab"], [role="option"]');
    for (const btn of buttons) {
        const text = (btn as HTMLElement).textContent?.trim().toLowerCase();
        if (text === duration.toLowerCase()) {
            (btn as HTMLElement).click();
            await sleep(200);
            log(`Selected duration: ${duration}`);
            return true;
        }
    }
    warn(`Could not find duration option: ${duration}`);
    return false;
};

// ═══════════════════════════════════════════════════════════════════════════════
// Prompt Input — พิมพ์ prompt ลง TipTap editor
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ใส่ prompt ลงใน TipTap editor
 * ใช้ insertFromPaste technique เหมือน content-flow.ts (Slate.js compatible)
 */
const typePrompt = async (prompt: string): Promise<boolean> => {
    const input = await waitFor(findPromptInput, 8000, 300, "prompt input");
    if (!input) {
        error("Cannot find prompt input");
        return false;
    }

    // Focus the editor
    input.focus();
    await sleep(200);

    // Clear existing content
    const selection = window.getSelection();
    if (selection) {
        selection.selectAllChildren(input);
        selection.deleteFromDocument();
    }
    await sleep(100);

    // Use insertFromPaste for TipTap/ProseMirror
    try {
        const dt = new DataTransfer();
        dt.setData("text/plain", prompt);
        const pasteEvent = new InputEvent("beforeinput", {
            inputType: "insertFromPaste",
            dataTransfer: dt,
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        input.dispatchEvent(pasteEvent);
        await sleep(300);

        // Verify content was inserted
        if (input.textContent && input.textContent.length > 10) {
            log(`Prompt inserted (${input.textContent.length} chars)`);
            return true;
        }
    } catch (e) {
        warn("insertFromPaste failed, trying fallback", e);
    }

    // Fallback: execCommand
    try {
        input.focus();
        document.execCommand("selectAll", false);
        document.execCommand("insertText", false, prompt);
        await sleep(200);
        if (input.textContent && input.textContent.length > 10) {
            log(`Prompt inserted via execCommand (${input.textContent.length} chars)`);
            return true;
        }
    } catch (e) {
        warn("execCommand fallback also failed", e);
    }

    // Last resort: direct innerHTML
    input.innerHTML = `<p>${prompt}</p>`;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    await sleep(200);
    log("Prompt inserted via innerHTML fallback");
    return true;
};

// ═══════════════════════════════════════════════════════════════════════════════
// Click helpers
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Full mouse event sequence for React/Next.js compatibility
 */
const clickElement = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const opts = { bubbles: true, cancelable: true, clientX: x, clientY: y, button: 0 };

    el.dispatchEvent(new PointerEvent("pointerdown", opts));
    el.dispatchEvent(new MouseEvent("mousedown", opts));
    setTimeout(() => {
        el.dispatchEvent(new PointerEvent("pointerup", opts));
        el.dispatchEvent(new MouseEvent("mouseup", opts));
        el.dispatchEvent(new MouseEvent("click", opts));
    }, 80);
};

// ═══════════════════════════════════════════════════════════════════════════════
// Main Automation Flow
// ═══════════════════════════════════════════════════════════════════════════════

const runGrokAutomation = async (msg: GrokAutomationMessage) => {
    if (isAutomating) {
        warn("Already automating, ignoring request");
        return { success: false, message: "Already automating" };
    }

    isAutomating = true;
    log("🚀 Starting Grok Imagine automation", msg);

    try {
        // Step 1: Select Video mode
        await selectVideoMode();
        await sleep(500);

        // Step 2: Configure settings
        if (msg.grokAspectRatio) {
            await selectAspectRatio(msg.grokAspectRatio);
        }
        if (msg.grokResolution) {
            await selectResolution(msg.grokResolution);
        }
        if (msg.grokDuration) {
            await selectDuration(msg.grokDuration);
        }
        await sleep(300);

        // Step 3: Type prompt
        const prompt = msg.videoPrompt || msg.imagePrompt || "";
        if (!prompt) {
            error("No prompt provided");
            return { success: false, message: "No prompt" };
        }
        const typed = await typePrompt(prompt);
        if (!typed) {
            return { success: false, message: "Failed to type prompt" };
        }
        await sleep(500);

        // Step 4: Click Generate
        const submitBtn = findSubmitButton();
        if (!submitBtn) {
            error("Cannot find submit button");
            return { success: false, message: "Cannot find submit button" };
        }
        clickElement(submitBtn);
        log("✅ Clicked Generate");

        // TODO: Step 5 — Monitor generation progress
        // TODO: Step 6 — Download completed video
        // TODO: Step 7 — Send VIDEO_GENERATION_COMPLETE message back

        return { success: true, message: "Generation triggered" };

    } catch (err: any) {
        error("Automation error:", err);
        return { success: false, message: err.message || "Unknown error" };
    } finally {
        isAutomating = false;
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// Chrome Extension Message Listener
// ═══════════════════════════════════════════════════════════════════════════════

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    log("📨 Message received:", message.action);

    if (message.action === "PING") {
        sendResponse({ status: "ready", engine: "grok" });
        return true;
    }

    if (message.action === "GENERATE_IMAGE") {
        if (message.videoEngine !== "grok") {
            sendResponse({ success: false, message: "Wrong engine" });
            return true;
        }

        runGrokAutomation(message).then(result => {
            sendResponse(result);
        }).catch(err => {
            sendResponse({ success: false, message: err.message });
        });

        return true; // Keep channel open for async response
    }

    return false;
});

// ─── Init ────────────────────────────────────────────────────────────────────
log("✅ Content script loaded on", window.location.href);
