/**
 * Netflow AI — Content Script for Google Flow (labs.google)
 *
 * Target: the PROMPT BAR at the bottom of the page
 *   ┌───────────────────────────────────────────┐
 *   │ [thumb1] [thumb2]                      [X] │
 *   │ คุณต้องการสร้างอะไร                  [🟢]  │
 *   │ [+]              [🔥 Nano Banana 2 □ x1][→]│
 *   └───────────────────────────────────────────┘
 *
 * Actions:
 *   GENERATE_IMAGE — configure → upload refs → paste prompt → click generate
 *   PING           — health check
 */

import { showOverlay, hideOverlay, updateStep, skipStep, completeOverlay, configureScenes } from "./netflow-overlay";

const LOG = (msg: string) => {
    console.log(`[Netflow AI] ${msg}`);
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg }); } catch (_) { /* popup closed */ }
};
const WARN = (msg: string) => {
    console.warn(`[Netflow AI] ${msg}`);
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `⚠️ ${msg}` }); } catch (_) { /* popup closed */ }
};

// ─── Platform Detection ─────────────────────────────────────────────────────
const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isWindows = /Win/i.test(navigator.userAgent);
const platformTag = isMac ? '🍎 Mac' : isWindows ? '🪟 Win' : '🐧 Other';

LOG(`Content script loaded on Google Flow page ${platformTag}`);

// ─── Mouse Position Tracker (Debug) ─────────────────────────────────────────
document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    const tag = t.tagName.toLowerCase();
    const x = Math.round(e.clientX), y = Math.round(e.clientY);
    const txt = (t.textContent || "").trim().slice(0, 30);
    LOG(`🖱️ Click (${x},${y}) → <${tag}> "${txt}"`);
}, true);

// ─── Helpers ────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Cross-platform robust click: full pointer→mouse→click sequence for React/Radix */
async function robustClick(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };
    el.dispatchEvent(new PointerEvent("pointerdown", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mousedown", opts));
    await sleep(80);
    el.dispatchEvent(new PointerEvent("pointerup", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mouseup", opts));
    el.dispatchEvent(new MouseEvent("click", opts));
}

/** Cross-platform robust hover: pointer + mouse events for Radix UI menus */
function robustHover(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };
    el.dispatchEvent(new PointerEvent("pointerenter", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mouseenter", opts));
    el.dispatchEvent(new PointerEvent("pointerover", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mouseover", opts));
    el.dispatchEvent(new PointerEvent("pointermove", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mousemove", opts));
}

// ─── Element-Based Card Detection (Screen-Size Independent) ─────────────────

/**
 * Find workspace cards by their type icon text (e.g., "videocam" for video, "image" for image).
 * Uses <i> icon text instead of pixel coordinates — works on ANY screen size, Mac or Windows.
 * Returns card container elements sorted by position (leftmost first = newest).
 */
function findCardsByIcon(iconText: string): HTMLElement[] {
    const results: HTMLElement[] = [];
    const icons = document.querySelectorAll<HTMLElement>("i");
    for (const icon of icons) {
        const txt = (icon.textContent || "").trim();
        if (txt !== iconText) continue;

        // Walk up the DOM to find the card container
        let el: HTMLElement | null = icon;
        let card: HTMLElement | null = null;
        for (let depth = 0; depth < 20 && el; depth++) {
            el = el.parentElement;
            if (!el || el === document.body) break;
            const r = el.getBoundingClientRect();
            // Card: visible, reasonably sized, not the whole page
            if (r.width > 100 && r.height > 80 &&
                r.width < window.innerWidth * 0.6 &&
                r.top >= -10 && r.bottom <= window.innerHeight + 10) {
                card = el;
                break;
            }
        }
        if (card && !results.includes(card)) {
            results.push(card);
        }
    }
    // Sort: leftmost first (newest in Google Flow workspace)
    results.sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return ra.left - rb.left;
    });
    return results;
}

/**
 * Find the first (newest) video card by <i>videocam</i> icon.
 * Fallback: find card containing a <video> element.
 */
function findFirstVideoCard(): HTMLElement | null {
    const cards = findCardsByIcon("videocam");
    if (cards.length > 0) {
        const r = cards[0].getBoundingClientRect();
        LOG(`🎬 Found ${cards.length} video card(s) via <i>videocam</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
        return cards[0];
    }
    // Fallback: look for elements with <video> tag
    const videos = document.querySelectorAll<HTMLVideoElement>("video");
    for (const vid of videos) {
        let container = vid.parentElement;
        for (let i = 0; i < 10 && container; i++) {
            const r = container.getBoundingClientRect();
            if (r.width > 100 && r.height > 80 && r.width < window.innerWidth * 0.6) {
                LOG(`🎬 Found video card via <video> fallback at (${r.left.toFixed(0)},${r.top.toFixed(0)})`);
                return container;
            }
            container = container.parentElement;
        }
    }
    LOG("🎬 No video card found");
    return null;
}

/**
 * Find the first (newest) image card by <i>image</i> icon.
 * Fallback: find card containing a <canvas> element.
 */
function findFirstImageCard(): HTMLElement | null {
    const cards = findCardsByIcon("image");
    if (cards.length > 0) {
        const r = cards[0].getBoundingClientRect();
        LOG(`🖼️ Found ${cards.length} image card(s) via <i>image</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
        return cards[0];
    }
    // Fallback: look for <canvas> elements
    const canvases = document.querySelectorAll<HTMLCanvasElement>("canvas");
    for (const cvs of canvases) {
        let container = cvs.parentElement;
        for (let i = 0; i < 10 && container; i++) {
            const r = container.getBoundingClientRect();
            if (r.width > 100 && r.height > 80 && r.width < window.innerWidth * 0.6) {
                LOG(`🖼️ Found image card via <canvas> fallback at (${r.left.toFixed(0)},${r.top.toFixed(0)})`);
                return container;
            }
            container = container.parentElement;
        }
    }
    LOG("🖼️ No image card found");
    return null;
}

/** Convert a base64 data-URL to a File object */
function base64ToFile(dataUrl: string, fileName: string): File {
    const [header, data] = dataUrl.split(",");
    const mime = header.match(/:(.*?);/)?.[1] || "image/png";
    const binary = atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new File([bytes], fileName, { type: mime });
}

/** Inject a File into a file input using DataTransfer */
function setFileInput(input: HTMLInputElement, file: File) {
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("input", { bubbles: true }));
}

/** Find all buttons with a specific Material icon text */
function findAllButtonsByIcon(iconText: string): HTMLElement[] {
    const results: HTMLElement[] = [];
    const icons = document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");
    for (const icon of icons) {
        if (icon.textContent?.trim() === iconText) {
            const btn = icon.closest("button") as HTMLElement | null;
            if (btn) results.push(btn);
        }
    }
    return results;
}

/** Wait for a file input to appear in the DOM */
async function waitForFileInput(timeoutMs = 5000): Promise<HTMLInputElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
        if (inputs.length > 0) return inputs[inputs.length - 1];
        await sleep(300);
    }
    return null;
}

// ─── Element Detection ──────────────────────────────────────────────────────

/**
 * Find the "+" button in the prompt bar (bottom-most add button on page).
 */
function findPromptBarAddButton(): HTMLElement | null {
    const addButtons = [...findAllButtonsByIcon("add"), ...findAllButtonsByIcon("add_2")];

    if (addButtons.length === 0) {
        LOG("No add buttons found by icon — trying text search");
        // Fallback: look for buttons with just "+" text at the bottom
        const allBtns = document.querySelectorAll<HTMLElement>("button");
        for (const btn of allBtns) {
            const rect = btn.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.7 && rect.width < 60 && rect.height < 60) {
                const txt = (btn.textContent || "").trim();
                if (txt === "+" || txt === "add") return btn;
            }
        }
        return null;
    }

    // Pick the one closest to the bottom of the viewport
    let bestBtn: HTMLElement | null = null;
    let bestY = 0;
    for (const btn of addButtons) {
        const rect = btn.getBoundingClientRect();
        if (rect.y > bestY) {
            bestY = rect.y;
            bestBtn = btn;
        }
    }

    if (bestBtn) {
        LOG(`Found prompt bar "+" button at y=${bestY.toFixed(0)}`);
    }
    return bestBtn;
}

/**
 * Find the generate "→" button in the prompt bar.
 */
function findGenerateButton(): HTMLElement | null {
    // Strategy 1: icon buttons
    for (const icon of ["arrow_forward", "send", "arrow_upward", "navigate_next", "arrow_right"]) {
        const btns = findAllButtonsByIcon(icon);
        let best: HTMLElement | null = null;
        let bestY = 0;
        for (const btn of btns) {
            const rect = btn.getBoundingClientRect();
            if (rect.y > bestY) {
                bestY = rect.y;
                best = btn;
            }
        }
        if (best) {
            LOG(`Found generate button via icon "${icon}" at y=${bestY.toFixed(0)}`);
            return best;
        }
    }

    // Strategy 2: circular button at the bottom-right
    const allBtns = document.querySelectorAll<HTMLElement>("button");
    let candidate: HTMLElement | null = null;
    let bestScore = 0;
    for (const btn of allBtns) {
        const rect = btn.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.7 && rect.right > window.innerWidth * 0.5) {
            const isCircular = Math.abs(rect.width - rect.height) < 10 && rect.width < 60;
            const score = rect.y + rect.x + (isCircular ? 1000 : 0);
            if (score > bestScore) {
                bestScore = score;
                candidate = btn;
            }
        }
    }
    if (candidate) {
        LOG("Found generate button via bottom-right heuristic");
        return candidate;
    }

    // Strategy 3: aria-label
    for (const btn of allBtns) {
        const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
        if (aria.includes("generate") || aria.includes("submit") || aria.includes("send") || aria.includes("สร้าง")) {
            return btn;
        }
    }

    return null;
}

/**
 * Find the prompt text input.
 */
function findPromptTextInput(): HTMLTextAreaElement | HTMLInputElement | HTMLElement | null {
    // Strategy 1: textarea at the bottom area
    const textareas = document.querySelectorAll<HTMLTextAreaElement>("textarea");
    for (const ta of textareas) {
        const rect = ta.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) return ta;
    }

    // Strategy 2: contenteditable in bottom area
    const editables = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    for (const el of editables) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) return el;
    }

    // Strategy 3: input with Thai placeholder
    const inputs = document.querySelectorAll<HTMLInputElement>("input[type='text'], input:not([type])");
    for (const inp of inputs) {
        const ph = inp.placeholder || "";
        if (ph.includes("สร้าง") || ph.includes("prompt") || ph.includes("describe")) return inp;
    }

    if (textareas.length > 0) return textareas[textareas.length - 1];
    return null;
}

/**
 * Set text into Slate.js prompt editor.
 *
 * ROOT CAUSE: Slate.js has its own internal document model separate from DOM.
 * Any DOM-level insertion (execCommand, textContent, etc.) updates the DOM but
 * NOT Slate's model. When Generate is clicked, Slate reads its model → empty → error.
 *
 * Slate.js v0.90+ processes edits via `beforeinput` events.
 * For paste: inputType='insertFromPaste', reads text from event.dataTransfer.
 *
 * We dispatch beforeinput → Slate processes it → updates internal model → DOM matches.
 */
async function setPromptText(el: HTMLElement, text: string) {
    el.focus();
    await sleep(300);

    // ═══ Strategy 1: Slate beforeinput with insertFromPaste ═══
    LOG("setPromptText: Strategy 1 — Slate beforeinput insertFromPaste");
    try {
        // Create DataTransfer with our text
        const dt = new DataTransfer();
        dt.setData("text/plain", text);
        dt.setData("text/html", `<p>${text.replace(/\n/g, "<br>")}</p>`);

        // Dispatch beforeinput (Slate intercepts this)
        const beforeInput = new InputEvent("beforeinput", {
            bubbles: true,
            cancelable: true,
            inputType: "insertFromPaste",
            dataTransfer: dt,
        });
        el.dispatchEvent(beforeInput);
        LOG("setPromptText: Dispatched beforeinput insertFromPaste");

        // Dispatch input event (Slate's cleanup handler)
        const inputEv = new InputEvent("input", {
            bubbles: true,
            inputType: "insertFromPaste",
            dataTransfer: dt,
        });
        el.dispatchEvent(inputEv);
        await sleep(800);

        // Verify — check actual text, excluding placeholder
        const content = (el.textContent || "").replace(/คุณต้องการสร้างอะไร/g, "").trim();
        if (content.length > 20) {
            LOG(`setPromptText: ✅ Strategy 1 worked (${content.length} chars)`);
            return;
        }
        LOG(`setPromptText: Strategy 1 — text not detected (got ${content.length} chars)`);
    } catch (e: any) {
        LOG(`setPromptText: Strategy 1 failed: ${e.message}`);
    }

    // ═══ Strategy 2: Slate beforeinput with insertText (character-level, but batched) ═══
    LOG("setPromptText: Strategy 2 — Slate beforeinput insertText");
    try {
        el.focus();
        await sleep(100);

        const beforeInput2 = new InputEvent("beforeinput", {
            bubbles: true,
            cancelable: true,
            inputType: "insertText",
            data: text,
        });
        el.dispatchEvent(beforeInput2);

        const inputEv2 = new InputEvent("input", {
            bubbles: true,
            inputType: "insertText",
            data: text,
        });
        el.dispatchEvent(inputEv2);
        await sleep(800);

        const content2 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร/g, "").trim();
        if (content2.length > 20) {
            LOG(`setPromptText: ✅ Strategy 2 worked (${content2.length} chars)`);
            return;
        }
        LOG(`setPromptText: Strategy 2 — text not detected`);
    } catch (e: any) {
        LOG(`setPromptText: Strategy 2 failed: ${e.message}`);
    }

    // ═══ Strategy 3: ClipboardEvent paste (Mac-compatible — Slate intercepts paste events) ═══
    LOG("setPromptText: Strategy 3 — ClipboardEvent paste (Mac-safe)");
    try {
        el.focus();
        await sleep(200);

        // Build a ClipboardEvent with text in clipboardData
        const clipDt = new DataTransfer();
        clipDt.setData("text/plain", text);
        clipDt.setData("text/html", `<p>${text.replace(/\n/g, "<br>")}</p>`);

        const pasteEvent = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: clipDt,
        });
        el.dispatchEvent(pasteEvent);
        await sleep(800);

        const content3a = (el.textContent || "").replace(/คุณต้องการสร้างอะไร/g, "").trim();
        if (content3a.length > 20) {
            LOG(`setPromptText: ✅ Strategy 3 worked (${content3a.length} chars)`);
            return;
        }
        LOG("setPromptText: Strategy 3 — ClipboardEvent text not detected");
    } catch (e: any) {
        LOG(`setPromptText: Strategy 3 failed: ${e.message}`);
    }

    // ═══ Strategy 4: navigator.clipboard + execCommand('paste') ═══
    LOG("setPromptText: Strategy 4 — navigator.clipboard + execCommand paste");
    try {
        // Use modern clipboard API (works on Mac without user gesture in extensions with clipboardWrite)
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            LOG("setPromptText: Copied to clipboard via navigator.clipboard");
        } else {
            // Fallback: old-school copy
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            LOG("setPromptText: Copied to clipboard via execCommand");
        }

        // Paste into Slate
        el.focus();
        await sleep(200);
        document.execCommand("paste");
        await sleep(500);

        const content4 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร/g, "").trim();
        if (content4.length > 20) {
            LOG(`setPromptText: ✅ Strategy 4 worked (${content4.length} chars)`);
            return;
        }
    } catch (e: any) {
        LOG(`setPromptText: Strategy 4 failed: ${e.message}`);
    }

    // ═══ Strategy 5: React fiber — find Slate editor and call insertText ═══
    LOG("setPromptText: Strategy 5 — React fiber Slate editor");
    try {
        // Find React fiber key on the contenteditable element
        const fiberKey = Object.keys(el).find(k =>
            k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$")
        );
        if (fiberKey) {
            let fiber = (el as any)[fiberKey];
            // Walk up the fiber tree looking for the Slate editor in memoizedProps or stateRef
            for (let i = 0; i < 30 && fiber; i++) {
                const props = fiber.memoizedProps;
                const state = fiber.memoizedState;

                // Check for editor in props
                if (props?.editor?.insertText) {
                    LOG("setPromptText: Found Slate editor via fiber props");
                    const editor = props.editor;
                    // Select all and delete, then insert
                    if (editor.selection) {
                        // Move to end
                    }
                    editor.insertText(text);
                    LOG(`setPromptText: ✅ Strategy 5 — inserted via editor.insertText`);
                    return;
                }

                // Check stateRef
                if (state?.memoizedState?.editor?.insertText) {
                    LOG("setPromptText: Found Slate editor via fiber state");
                    state.memoizedState.editor.insertText(text);
                    LOG(`setPromptText: ✅ Strategy 5 — inserted via state editor`);
                    return;
                }

                fiber = fiber.return;
            }
            LOG("setPromptText: Fiber found but no Slate editor in tree");
        } else {
            LOG("setPromptText: No React fiber found on element");
        }
    } catch (e: any) {
        LOG(`setPromptText: Strategy 5 failed: ${e.message}`);
    }

    LOG("setPromptText: ⚠️ All 5 strategies attempted — check console for results");
}

// ─── Upload Image into Prompt Bar ───────────────────────────────────────────

/**
 * Neutralize all file inputs: change type to "text" so .click() won't open native dialog.
 * Returns the original types for restoration.
 */
function neutralizeFileInputs(): { input: HTMLInputElement; origType: string }[] {
    const neutralized: { input: HTMLInputElement; origType: string }[] = [];
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    for (const inp of inputs) {
        neutralized.push({ input: inp, origType: "file" });
        inp.type = "text";
    }
    if (neutralized.length > 0) {
        LOG(`Neutralized ${neutralized.length} file inputs (type → text)`);
    }
    return neutralized;
}

/**
 * Block ALL file dialog opens by overriding HTMLInputElement.prototype.click.
 * Returns a restore function. CRITICAL for Mac where MutationObserver timing
 * cannot reliably beat Google Flow's synchronous create→click sequence.
 */
function blockFileDialogs(): () => void {
    const origClick = HTMLInputElement.prototype.click;
    HTMLInputElement.prototype.click = function(this: HTMLInputElement) {
        if (this.type === "file") {
            LOG(`🚫 Blocked file dialog open (${platformTag})`);
            return; // suppress native file chooser
        }
        return origClick.call(this);
    };
    LOG(`🔒 File dialog blocker installed (${platformTag})`);
    return () => {
        HTMLInputElement.prototype.click = origClick;
        LOG(`🔓 File dialog blocker removed`);
    };
}

/**
 * Restore file inputs to type="file", inject our file, and dispatch events.
 * Uses multiple dispatch strategies for cross-platform React compatibility.
 */
function restoreAndInject(neutralized: { input: HTMLInputElement; origType: string }[], file: File, preExistingInputs?: Set<HTMLInputElement>): boolean {
    // Also check for any inputs that were added during the process
    const allInputs = document.querySelectorAll<HTMLInputElement>('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]');
    const candidates = [...neutralized.map(n => n.input)];

    // Also add any recently created hidden text inputs (likely our neutralized ones)
    for (const inp of allInputs) {
        if (!candidates.includes(inp) && inp.offsetParent === null) {
            candidates.push(inp);
        }
    }

    for (const inp of candidates) {
        inp.type = "file";
    }
    LOG(`Restored ${candidates.length} inputs to type=file`);

    // Find the best file input to inject into
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    if (fileInputs.length === 0) {
        LOG(`⚠️ No file inputs found after restore (${platformTag})`);
        return false;
    }

    // ★ Prefer NEW file inputs (not pre-existing) — fixes second upload targeting stale input
    let target: HTMLInputElement;
    if (preExistingInputs && preExistingInputs.size > 0) {
        const newInputs = Array.from(fileInputs).filter(inp => !preExistingInputs.has(inp));
        if (newInputs.length > 0) {
            target = newInputs[newInputs.length - 1];
            LOG(`Targeting NEW file input (${newInputs.length} new, ${fileInputs.length} total)`);
        } else {
            target = fileInputs[fileInputs.length - 1];
            LOG(`No new file inputs found — using last of ${fileInputs.length}`);
        }
    } else {
        target = fileInputs[fileInputs.length - 1];
    }

    // ★ Inject file via DataTransfer — cross-platform
    const dt = new DataTransfer();
    dt.items.add(file);

    // Method 1: Direct assignment (works on most Chrome)
    try {
        target.files = dt.files;
        LOG(`Injected file via target.files (${target.files?.length ?? 0} files)`);
    } catch (e: any) {
        LOG(`target.files assignment failed: ${e.message} — trying defineProperty`);
        // Method 2: defineProperty override (Mac fallback)
        try {
            Object.defineProperty(target, 'files', {
                value: dt.files,
                writable: true,
                configurable: true,
            });
            LOG(`Injected file via Object.defineProperty`);
        } catch (e2: any) {
            WARN(`Both file injection methods failed: ${e2.message}`);
            return false;
        }
    }

    // ★ Dispatch multiple event types for React/Radix compatibility
    // React listens on 'change'; some frameworks also listen on 'input'
    target.dispatchEvent(new Event('change', { bubbles: true }));
    target.dispatchEvent(new Event('input', { bubbles: true }));

    // ★ Also dispatch a synthetic 'drop' event (some Mac React builds listen for drag-drop)
    try {
        const dropDt = new DataTransfer();
        dropDt.items.add(file);
        const dropEvent = new DragEvent('drop', {
            bubbles: true,
            cancelable: true,
            dataTransfer: dropDt,
        });
        target.dispatchEvent(dropEvent);
        LOG(`Also dispatched drop event on file input`);
    } catch (_) {
        // drop event dispatch is optional — ignore errors
    }

    LOG(`✅ File injection complete: ${file.name} (${(file.size / 1024).toFixed(1)} KB) → <input> ${platformTag}`);
    return true;
}

/**
 * Upload a single image into the prompt bar.
 *
 * Key trick: NEUTRALIZE all file inputs (type="text") BEFORE clicking upload menu.
 * When Google Flow calls .click() on the input, it won't open the native dialog
 * because type="text" inputs don't trigger file chooser.
 * Then we restore type="file", inject our file, and dispatch change.
 */
async function uploadImageToPromptBar(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`── Uploading ${fileName} into prompt bar ──`);

    const file = base64ToFile(dataUrl, fileName);
    LOG(`File size: ${(file.size / 1024).toFixed(1)} KB`);

    // Find and click the "+" button
    const addBtn = findPromptBarAddButton();
    if (!addBtn) {
        WARN("Could not find prompt bar '+' button");
        return false;
    }

    // ★ Snapshot existing file inputs BEFORE neutralization
    //   so restoreAndInject can prefer NEW inputs created during this upload
    const preExistingInputs = new Set(
        document.querySelectorAll<HTMLInputElement>('input[type="file"]')
    );
    LOG(`Pre-existing file inputs: ${preExistingInputs.size}`);

    // Step 1: Block ALL file dialog opens at prototype level (Mac race-condition fix)
    //   On Mac, MutationObserver can't reliably beat Google Flow's synchronous
    //   create→click sequence. This override prevents ANY file input .click() from
    //   opening the native dialog, regardless of timing.
    const unblockDialogs = blockFileDialogs();

    // Step 2: Neutralize ALL existing file inputs (type → text)
    let neutralized = neutralizeFileInputs();

    // Step 3: Set up MutationObserver to neutralize ANY new file inputs immediately
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLInputElement && node.type === "file") {
                    node.type = "text";
                    neutralized.push({ input: node, origType: "file" });
                    LOG(`🎯 Observer neutralized new file input`);
                }
                if (node instanceof HTMLElement) {
                    const fis = node.querySelectorAll<HTMLInputElement>('input[type="file"]');
                    for (const fi of fis) {
                        fi.type = "text";
                        neutralized.push({ input: fi, origType: "file" });
                        LOG(`🎯 Observer neutralized nested file input`);
                    }
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    try {
        // Step 4: Click "+" to open menu (full event sequence for Mac React compatibility)
        await robustClick(addBtn);
        LOG("Clicked '+' button");
        await sleep(1500);

        // Step 5: Find and click upload menu option (precise: exclude drive_folder_upload)
        LOG("Checking for upload menu...");
        const menuElements = document.querySelectorAll<HTMLElement>(
            "button, [role='menuitem'], [role='option'], li, div[role='button']"
        );
        let clickedMenu = false;
        for (const el of menuElements) {
            if (el === addBtn) continue;
            const icons = el.querySelectorAll("i");
            for (const icon of icons) {
                const it = icon.textContent?.trim() || "";
                if (it === "upload" || it === "upload_file") {
                    const allIconTexts = Array.from(el.querySelectorAll("i")).map(i => i.textContent?.trim());
                    if (!allIconTexts.includes("drive_folder_upload")) {
                        await robustClick(el);
                        clickedMenu = true;
                        LOG(`Clicked upload menu (icon: ${it})`);
                        break;
                    }
                }
            }
            if (clickedMenu) break;
        }

        if (!clickedMenu) {
            for (const el of menuElements) {
                if (el === addBtn) continue;
                const directText = el.childNodes.length <= 3 ? (el.textContent || "").trim() : "";
                if (directText.length > 0 && directText.length < 30) {
                    const lower = directText.toLowerCase();
                    if (lower === "upload" || lower === "อัปโหลด" || lower === "อัพโหลด"
                        || lower.includes("from computer") || lower.includes("จากคอมพิวเตอร์")) {
                        await robustClick(el);
                        clickedMenu = true;
                        LOG(`Clicked upload menu (text: "${directText}")`);
                        break;
                    }
                }
            }
        }

        // Step 6: Wait a moment for Google Flow to call .click() (blocked by prototype override)
        await sleep(1000);

        // Step 7: Restore file inputs and inject our file (prefer NEW inputs over stale ones)
        const ok = restoreAndInject(neutralized, file, preExistingInputs);
        if (ok) {
            LOG(`✅ Injected ${fileName} — no dialog opened`);
            await sleep(2500);
            return true;
        }

        WARN(`No file input found for ${fileName}`);
        return false;

    } finally {
        observer.disconnect();
        unblockDialogs(); // ★ Remove prototype override — restore normal .click() behavior
        // Safety: restore any remaining neutralized inputs
        for (const n of neutralized) {
            if (n.input.type !== "file") n.input.type = "file";
        }
    }
}

// ─── GENERATE_IMAGE handler ─────────────────────────────────────────────────

interface GenerateImageRequest {
    action: "GENERATE_IMAGE";
    imagePrompt: string;
    videoPrompt?: string;
    videoScenePrompts?: string[];  // Pre-built prompts for each scene [scene1, scene2, scene3]
    sceneCount?: number;           // 1, 2, or 3
    productImage?: string;
    characterImage?: string;
    orientation?: "horizontal" | "vertical";
    outputCount?: 1 | 2 | 3 | 4;
}

/**
 * Configure Flow settings: Image mode, orientation, count
 */
async function configureFlowSettings(orientation: string, outputCount: number): Promise<boolean> {
    LOG("=== Step 0: Configure Flow settings ===");

    // Find the settings button — it shows current mode like "วิดีโอ crop_16_9 x1" or "Nano Banana 2"
    const allBtns = document.querySelectorAll<HTMLElement>("button");
    let settingsBtn: HTMLElement | null = null;

    // Strategy 1: button text contains known keywords
    for (const btn of allBtns) {
        const txt = btn.textContent || "";
        if (txt.includes("Nano Banana") || txt.includes("Imagen") || txt.includes("วิดีโอ") || txt.includes("รูปภาพ") || txt.includes("Image") || txt.includes("Video")) {
            // Must be in the bottom prompt bar area
            const rect = btn.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.7) {
                settingsBtn = btn;
                LOG(`Found settings button by text: "${txt.substring(0, 30).trim()}"`);
                break;
            }
        }
    }

    // Strategy 2: button with crop icon in bottom area
    if (!settingsBtn) {
        for (const icon of ["crop_16_9", "crop_portrait", "crop_landscape", "crop_3_2", "crop_5_4"]) {
            const btns = findAllButtonsByIcon(icon);
            for (const btn of btns) {
                const rect = btn.getBoundingClientRect();
                if (rect.bottom > window.innerHeight * 0.7) {
                    settingsBtn = btn;
                    LOG(`Found settings button by icon: ${icon}`);
                    break;
                }
            }
            if (settingsBtn) break;
        }
    }

    if (!settingsBtn) {
        WARN("Could not find settings button");
        return false;
    }

    // Click settings button with full mouse sequence
    const sRect = settingsBtn.getBoundingClientRect();
    const sCx = sRect.left + sRect.width / 2;
    const sCy = sRect.top + sRect.height / 2;
    const sOpts = { bubbles: true, cancelable: true, clientX: sCx, clientY: sCy, button: 0 };
    settingsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mousedown", sOpts));
    await sleep(80);
    settingsBtn.dispatchEvent(new PointerEvent("pointerup", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mouseup", sOpts));
    settingsBtn.dispatchEvent(new MouseEvent("click", sOpts));
    LOG("Clicked settings button");
    await sleep(1500);

    // ALWAYS select Image mode (switch from Video if needed)
    let selectedImage = false;
    let imageTabBtn: HTMLElement | null = null;

    // Strategy 1: Radix tab with class flow_tab_slider_trigger + aria-controls containing IMAGE
    const tabTriggers = document.querySelectorAll<HTMLElement>('.flow_tab_slider_trigger[role="tab"]');
    for (const btn of tabTriggers) {
        const ariaControls = btn.getAttribute("aria-controls") || "";
        const btnId = btn.id || "";
        if (ariaControls.toUpperCase().includes("IMAGE") || btnId.toUpperCase().includes("IMAGE")) {
            imageTabBtn = btn;
            LOG(`Found Image tab via flow_tab_slider_trigger (aria-controls: ${ariaControls})`);
            break;
        }
    }

    // Strategy 2: role=tab with id containing trigger-IMAGE
    if (!imageTabBtn) {
        for (const btn of document.querySelectorAll<HTMLElement>('[role="tab"]')) {
            const btnId = btn.id || "";
            if (btnId.toUpperCase().includes("TRIGGER-IMAGE")) {
                imageTabBtn = btn;
                LOG(`Found Image tab via id: ${btnId}`);
                break;
            }
        }
    }

    // Strategy 3: fuzzy text match — textContent ends with "Image" or contains Thai equivalents
    if (!imageTabBtn) {
        for (const btn of document.querySelectorAll<HTMLElement>("button, [role='menuitem'], [role='option'], [role='tab']")) {
            const txt = (btn.textContent || "").trim();
            if (txt === "Image" || txt.endsWith("Image") || txt === "รูปภาพ" || txt === "ภาพ") {
                // Exclude buttons that also contain "Video" text
                if (!txt.includes("Video") && !txt.includes("วิดีโอ")) {
                    imageTabBtn = btn;
                    LOG(`Found Image tab via text match: "${txt}"`);
                    break;
                }
            }
        }
    }

    if (imageTabBtn) {
        // Check if already active
        const state = imageTabBtn.getAttribute("data-state") || "";
        const ariaSelected = imageTabBtn.getAttribute("aria-selected") || "";
        if (state === "active" || ariaSelected === "true") {
            selectedImage = true;
            LOG("Image tab already active — no click needed");
        } else {
            const bRect = imageTabBtn.getBoundingClientRect();
            const bOpts = { bubbles: true, cancelable: true, clientX: bRect.left + bRect.width / 2, clientY: bRect.top + bRect.height / 2, button: 0 };
            imageTabBtn.dispatchEvent(new PointerEvent("pointerdown", { ...bOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            imageTabBtn.dispatchEvent(new MouseEvent("mousedown", bOpts));
            await sleep(80);
            imageTabBtn.dispatchEvent(new PointerEvent("pointerup", { ...bOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            imageTabBtn.dispatchEvent(new MouseEvent("mouseup", bOpts));
            imageTabBtn.dispatchEvent(new MouseEvent("click", bOpts));
            selectedImage = true;
            LOG("✅ Clicked Image tab — switched to Image mode");
            await sleep(400);
        }
    }
    if (!selectedImage) LOG("⚠️ Could not find Image mode button — may already be in Image mode");

    // Select orientation
    const orientationText = orientation === "horizontal" ? "แนวนอน" : "แนวตั้ง";
    for (const btn of document.querySelectorAll<HTMLElement>("button, [role='tab'], [role='option']")) {
        const txt = (btn.textContent || "").trim();
        if (txt === orientationText || txt.toLowerCase() === (orientation === "horizontal" ? "landscape" : "portrait")) {
            const oRect = btn.getBoundingClientRect();
            const oOpts = { bubbles: true, cancelable: true, clientX: oRect.left + oRect.width / 2, clientY: oRect.top + oRect.height / 2, button: 0 };
            btn.dispatchEvent(new PointerEvent("pointerdown", { ...oOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mousedown", oOpts));
            await sleep(80);
            btn.dispatchEvent(new PointerEvent("pointerup", { ...oOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mouseup", oOpts));
            btn.dispatchEvent(new MouseEvent("click", oOpts));
            LOG(`Selected orientation: ${orientationText}`);
            await sleep(400);
            break;
        }
    }

    // Select count
    const countText = `x${outputCount}`;
    for (const btn of document.querySelectorAll<HTMLElement>("button, [role='tab'], [role='option']")) {
        const txt = (btn.textContent || "").trim();
        if (txt === countText) {
            const cRect = btn.getBoundingClientRect();
            const cOpts = { bubbles: true, cancelable: true, clientX: cRect.left + cRect.width / 2, clientY: cRect.top + cRect.height / 2, button: 0 };
            btn.dispatchEvent(new PointerEvent("pointerdown", { ...cOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mousedown", cOpts));
            await sleep(80);
            btn.dispatchEvent(new PointerEvent("pointerup", { ...cOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mouseup", cOpts));
            btn.dispatchEvent(new MouseEvent("click", cOpts));
            LOG(`Selected count: ${countText}`);
            await sleep(400);
            break;
        }
    }

    // Close settings — press Escape to dismiss the dropdown
    await sleep(300);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(300);
    // Also try clicking the settings button again to toggle it closed
    settingsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mousedown", sOpts));
    await sleep(80);
    settingsBtn.dispatchEvent(new PointerEvent("pointerup", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mouseup", sOpts));
    settingsBtn.dispatchEvent(new MouseEvent("click", sOpts));
    LOG("Closed settings panel");
    await sleep(600);

    return true;
}

/**
 * Main handler: configure → upload images → paste prompt → click generate
 * IMPORTANT: Never abort early — always try to paste prompt and click generate
 */
async function handleGenerateImage(req: GenerateImageRequest): Promise<{ success: boolean; message: string; step: string }> {
    // ── Pre-flight: Clear console + stale cache to prevent extension conflicts ──
    try {
        console.clear();
        console.log("%c[Netflow AI] 🚀 Automation started — console cleared", "color:#00e676;font-weight:bold;font-size:14px");
        // Clear any stale Netflow session data (NOT localStorage — that belongs to Google Flow)
        sessionStorage.removeItem("netflow_last_run");
        sessionStorage.setItem("netflow_last_run", new Date().toISOString());
    } catch { /* ignore if blocked */ }

    // ── Show Engine Overlay ──
    try { showOverlay(); } catch (e) { console.warn("Overlay show error:", e); }

    const steps: string[] = [];
    const errors: string[] = [];

    // ── Step 0: Configure settings ──
    try {
        updateStep("settings", "active");
        const orientation = req.orientation || "horizontal";
        const outputCount = req.outputCount || 1;
        const ok = await configureFlowSettings(orientation, outputCount);
        steps.push(ok ? "✅ Settings" : "⚠️ Settings");
        updateStep("settings", ok ? "done" : "error");
    } catch (e: any) {
        WARN(`Settings error: ${e.message}`);
        steps.push("⚠️ Settings");
        updateStep("settings", "error");
    }

    // ── Step 1: Upload reference images ──
    LOG("=== Step 1: Upload reference images ===");

    /** Check if any upload is still in progress (look for % text on thumbnails) */
    const isUploadInProgress = (): string | null => {
        const allElements = document.querySelectorAll<HTMLElement>("span, div, p, label");
        for (const el of allElements) {
            const txt = (el.textContent || "").trim();
            if (/^\d{1,3}%$/.test(txt)) {
                // 100% means upload finished — treat as complete
                if (txt === "100%") return null;
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && rect.top > 0 && rect.top < window.innerHeight) {
                    return txt;
                }
            }
        }
        return null;
    };

    /** Wait until all uploads finish (no more % indicators visible), timeout 60s */
    const waitForUploadsComplete = async (label: string): Promise<void> => {
        LOG(`Waiting for ${label} upload to complete...`);
        await sleep(2000); // initial wait for % to appear
        const start = Date.now();
        const timeout = 60000;
        let lastPct = "";
        let lastPctChangeTime = Date.now();
        const staleTimeout = 15000; // if % unchanged for 15s, consider done
        while (Date.now() - start < timeout) {
            const pct = isUploadInProgress();
            if (pct) {
                if (pct !== lastPct) {
                    lastPct = pct;
                    lastPctChangeTime = Date.now();
                } else if (Date.now() - lastPctChangeTime > staleTimeout) {
                    LOG(`✅ ${label} upload — % stuck at ${pct} for ${staleTimeout / 1000}s, treating as complete`);
                    await sleep(1000);
                    return;
                }
                LOG(`Upload in progress: ${pct} — waiting...`);
                await sleep(1500);
            } else {
                LOG(`✅ ${label} upload complete — no % indicator found`);
                await sleep(1000); // extra settle time after upload finishes
                return;
            }
        }
        WARN(`⚠️ ${label} upload timeout after ${timeout / 1000}s — proceeding anyway`);
    };

    if (req.characterImage) {
        updateStep("upload-char", "active");
        try {
            const ok = await uploadImageToPromptBar(req.characterImage, "character.png");
            steps.push(ok ? "✅ ตัวละคร" : "⚠️ ตัวละคร");
            if (!ok) errors.push("character upload failed");
            updateStep("upload-char", ok ? "done" : "error");
        } catch (e: any) {
            WARN(`Character upload error: ${e.message}`);
            steps.push("❌ ตัวละคร");
            errors.push("character upload error");
            updateStep("upload-char", "error");
        }
        await waitForUploadsComplete("character");
    } else {
        skipStep("upload-char");
    }

    if (req.productImage) {
        updateStep("upload-prod", "active");
        try {
            const ok = await uploadImageToPromptBar(req.productImage, "product.png");
            steps.push(ok ? "✅ สินค้า" : "⚠️ สินค้า");
            if (!ok) errors.push("product upload failed");
            updateStep("upload-prod", ok ? "done" : "error");
        } catch (e: any) {
            WARN(`Product upload error: ${e.message}`);
            steps.push("❌ สินค้า");
            errors.push("product upload error");
            updateStep("upload-prod", "error");
        }
        await waitForUploadsComplete("product");
    } else {
        skipStep("upload-prod");
    }

    // ── Step 1c: Close any open dialog/modal (Escape key) ──
    LOG("Closing any open dialogs...");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(800);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(800);

    // ── Step 1d: Final check — make sure no uploads are still running ──
    const finalPct = isUploadInProgress();
    if (finalPct) {
        LOG(`⚠️ Upload still showing ${finalPct} after all uploads — waiting extra...`);
        await waitForUploadsComplete("final");
    }
    LOG("All uploads complete — proceeding to prompt");
    await sleep(1000);

    // ── Step 2: ALWAYS paste prompt (even if uploads failed) ──
    LOG("=== Step 2: Paste image prompt ===");
    updateStep("img-prompt", "active");
    await sleep(1000);
    const promptInput = findPromptTextInput();
    if (promptInput) {
        await setPromptText(promptInput, req.imagePrompt);
        LOG(`Pasted prompt (${req.imagePrompt.length} chars)`);
        steps.push("✅ Prompt");
        updateStep("img-prompt", "done");
    } else {
        WARN("Could not find prompt text input");
        steps.push("❌ Prompt");
        errors.push("prompt input not found");
        updateStep("img-prompt", "error");
    }
    await sleep(800);

    // ── Snapshot existing images BEFORE generating ──
    const existingImageSrcs = new Set<string>();
    document.querySelectorAll<HTMLImageElement>("img").forEach(img => {
        if (img.src) existingImageSrcs.add(img.src);
    });
    LOG(`Snapshot: ${existingImageSrcs.size} existing images before Generate`);

    // ── Step 3: ALWAYS click Generate → (even if some steps failed) ──
    LOG("=== Step 3: Click Generate → ===");
    updateStep("img-generate", "active");
    await sleep(500);
    const genBtn = findGenerateButton();
    if (genBtn) {
        // React needs full mouse event sequence, not just .click()
        const rect = genBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const evtOpts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };

        genBtn.dispatchEvent(new PointerEvent("pointerdown", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mousedown", evtOpts));
        await sleep(80);
        genBtn.dispatchEvent(new PointerEvent("pointerup", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mouseup", evtOpts));
        genBtn.dispatchEvent(new MouseEvent("click", evtOpts));
        LOG("Dispatched full click sequence on Generate button");
        steps.push("✅ Generate");

        // Safety: try again after 500ms if first didn't register
        await sleep(500);
        genBtn.dispatchEvent(new PointerEvent("pointerdown", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mousedown", evtOpts));
        await sleep(80);
        genBtn.dispatchEvent(new PointerEvent("pointerup", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mouseup", evtOpts));
        genBtn.dispatchEvent(new MouseEvent("click", evtOpts));
        LOG("Dispatched safety retry click on Generate button");
        updateStep("img-generate", "done");
    } else {
        WARN("Could not find → Generate button");
        steps.push("❌ Generate");
        errors.push("generate button not found");
        updateStep("img-generate", "error");
    }

    // ── Step 4: Wait for NEW image → hover → 3-dots → "ทำให้เป็นภาพเคลื่อนไหว" ──
    LOG("=== Step 4: Wait for generated image + Animate ===");
    updateStep("img-wait", "active");
    try {
        // Step 4a: Wait minimum 15s for generation to start, then poll for NEW images
        LOG("Waiting 15s for generation to start...");
        await sleep(15000);

        LOG("Polling for NEW generated image (not in snapshot)...");
        let generatedImg: HTMLElement | null = null;
        const imgWaitStart = Date.now();
        while (!generatedImg && Date.now() - imgWaitStart < 180000) { // 3 min timeout
            const imgs = document.querySelectorAll<HTMLImageElement>("img");

            // Priority 1: find image with alt text containing "generated" (AI-generated images)
            for (const img of imgs) {
                if (existingImageSrcs.has(img.src)) continue;
                const alt = (img.alt || "").toLowerCase();
                if (!alt.includes("generated")) continue;

                const rect = img.getBoundingClientRect();
                if (rect.width > 120 && rect.height > 120 && rect.top > 0 && rect.top < window.innerHeight * 0.85) {
                    const parent = img.closest("div") as HTMLElement;
                    if (parent) {
                        generatedImg = parent;
                        LOG(`Found AI-generated image via alt="${img.alt}": ${img.src.substring(0, 80)}...`);
                        break;
                    }
                }
            }

            // Priority 2: fallback — any new large image, but skip reference/uploaded images
            if (!generatedImg) {
                for (const img of imgs) {
                    if (existingImageSrcs.has(img.src)) continue;

                    // Skip uploaded reference images (their container has filename labels)
                    const container = img.closest("div");
                    const containerText = container?.textContent || "";
                    if (containerText.includes("product.png") || containerText.includes("character.png") ||
                        containerText.includes(".png") || containerText.includes(".jpg")) {
                        LOG(`Skipping reference image (container has filename): ${containerText.substring(0, 40)}`);
                        continue;
                    }

                    const rect = img.getBoundingClientRect();
                    if (rect.width > 120 && rect.height > 120 && rect.top > 0 && rect.top < window.innerHeight * 0.85) {
                        const parent = img.closest("div") as HTMLElement;
                        if (parent) {
                            generatedImg = parent;
                            LOG(`Found NEW image (fallback): ${img.src.substring(0, 80)}...`);
                            break;
                        }
                    }
                }
            }

            if (!generatedImg) {
                await sleep(5000);
                LOG("Still waiting for new generated image...");
            }
        }

        if (!generatedImg) {
            WARN("Timeout waiting for generated image");
            steps.push("⚠️ Wait Image");
            updateStep("img-wait", "error");
        } else {
            LOG(`Found generated image element`);
            steps.push("✅ Image Found");
            updateStep("img-wait", "done", 100);

            // Step 4b: Hover over the image to reveal the 3 overlay icons
            const imgRect = generatedImg.getBoundingClientRect();
            const imgCx = imgRect.left + imgRect.width / 2;
            const imgCy = imgRect.top + imgRect.height / 2;

            const imgHoverOpts = { bubbles: true, cancelable: true, clientX: imgCx, clientY: imgCy };
            generatedImg.dispatchEvent(new PointerEvent("pointerenter", { ...imgHoverOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            generatedImg.dispatchEvent(new MouseEvent("mouseenter", imgHoverOpts));
            generatedImg.dispatchEvent(new PointerEvent("pointerover", { ...imgHoverOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            generatedImg.dispatchEvent(new MouseEvent("mouseover", imgHoverOpts));
            generatedImg.dispatchEvent(new PointerEvent("pointermove", { ...imgHoverOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            generatedImg.dispatchEvent(new MouseEvent("mousemove", imgHoverOpts));
            LOG("Dispatched hover events on image (pointer + mouse)");
            await sleep(1500);

            // Step 4c: Find and click the 3-dots (more_vert / more_horiz) icon
            let dotsBtn: HTMLElement | null = null;

            // Search for more_vert or more_horiz icon buttons near the image
            for (const iconName of ["more_vert", "more_horiz", "more"]) {
                const btns = findAllButtonsByIcon(iconName);
                for (const btn of btns) {
                    const btnRect = btn.getBoundingClientRect();
                    // Must be near the top-right of the image
                    if (btnRect.top >= imgRect.top - 20 && btnRect.top <= imgRect.bottom &&
                        btnRect.right >= imgRect.right - 150 && btnRect.right <= imgRect.right + 20) {
                        dotsBtn = btn;
                        break;
                    }
                }
                if (dotsBtn) break;
            }

            // Fallback: look for any small button in the top-right corner of the image
            if (!dotsBtn) {
                const allBtns = document.querySelectorAll<HTMLElement>("button");
                for (const btn of allBtns) {
                    const btnRect = btn.getBoundingClientRect();
                    if (btnRect.width < 50 && btnRect.height < 50 &&
                        btnRect.top >= imgRect.top - 10 && btnRect.top <= imgRect.top + 60 &&
                        btnRect.left >= imgRect.right - 80) {
                        // Check if it has 3-dots icon or "เพิ่มเติม" tooltip
                        const icons = btn.querySelectorAll("i");
                        for (const icon of icons) {
                            const t = icon.textContent?.trim() || "";
                            if (t.includes("more")) {
                                dotsBtn = btn;
                                break;
                            }
                        }
                        if (dotsBtn) break;

                        // Or if it's the rightmost small button
                        const aria = btn.getAttribute("aria-label") || "";
                        if (aria.includes("เพิ่มเติม") || aria.includes("more")) {
                            dotsBtn = btn;
                            break;
                        }
                    }
                }
            }

            if (!dotsBtn) {
                WARN("Could not find 3-dots button on generated image");
                steps.push("⚠️ 3-dots");
            } else {
                // Click the 3-dots button with full mouse sequence
                const dotsRect = dotsBtn.getBoundingClientRect();
                const dotsCx = dotsRect.left + dotsRect.width / 2;
                const dotsCy = dotsRect.top + dotsRect.height / 2;
                const dotsOpts = { bubbles: true, cancelable: true, clientX: dotsCx, clientY: dotsCy, button: 0 };

                dotsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dotsOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                dotsBtn.dispatchEvent(new MouseEvent("mousedown", dotsOpts));
                await sleep(80);
                dotsBtn.dispatchEvent(new PointerEvent("pointerup", { ...dotsOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                dotsBtn.dispatchEvent(new MouseEvent("mouseup", dotsOpts));
                dotsBtn.dispatchEvent(new MouseEvent("click", dotsOpts));
                LOG("Clicked 3-dots button");
                await sleep(1500);

                // Step 4d: Find and click "ทำให้เป็นภาพเคลื่อนไหว" in the dropdown
                let animateBtn: HTMLElement | null = null;
                const menuItems = document.querySelectorAll<HTMLElement>(
                    "button, [role='menuitem'], [role='option'], li, div[role='button']"
                );
                for (const item of menuItems) {
                    const txt = (item.textContent || "").trim();
                    if (txt.includes("ทำให้เป็นภาพเคลื่อนไหว") || txt.includes("Animate") || txt.includes("animate")) {
                        animateBtn = item;
                        break;
                    }
                }

                if (!animateBtn) {
                    WARN("Could not find 'ทำให้เป็นภาพเคลื่อนไหว' menu item");
                    steps.push("⚠️ Animate");
                } else {
                    // Click Animate with full mouse sequence
                    const animRect = animateBtn.getBoundingClientRect();
                    const animCx = animRect.left + animRect.width / 2;
                    const animCy = animRect.top + animRect.height / 2;
                    const animOpts = { bubbles: true, cancelable: true, clientX: animCx, clientY: animCy, button: 0 };

                    animateBtn.dispatchEvent(new PointerEvent("pointerdown", { ...animOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                    animateBtn.dispatchEvent(new MouseEvent("mousedown", animOpts));
                    await sleep(80);
                    animateBtn.dispatchEvent(new PointerEvent("pointerup", { ...animOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                    animateBtn.dispatchEvent(new MouseEvent("mouseup", animOpts));
                    animateBtn.dispatchEvent(new MouseEvent("click", animOpts));
                    LOG("✅ Clicked 'ทำให้เป็นภาพเคลื่อนไหว' — switching to video mode");
                    steps.push("✅ Animate");
                    updateStep("animate", "done");
                    await sleep(3000);
                }
            }
        }
    } catch (e: any) {
        WARN(`Step 4 error: ${e.message}`);
        steps.push("⚠️ Animate");
    }

    // ── Step 5: Paste video prompt + Generate video ──
    if (req.videoPrompt) {
        LOG("=== Step 5: Paste video prompt + Generate video ===");
        updateStep("vid-prompt", "active");
        try {
            // Wait for video mode UI to load (image becomes thumbnail in prompt bar)
            LOG("Waiting for video mode UI...");
            await sleep(3000);

            // Verify we're in video mode — look for "วิดีโอ" or "Video" indicator
            let inVideoMode = false;
            const allElements = document.querySelectorAll<HTMLElement>("button, span, div");
            for (const el of allElements) {
                const txt = (el.textContent || "").trim();
                const rect = el.getBoundingClientRect();
                if ((txt === "วิดีโอ" || txt === "Video" || txt.includes("วิดีโอ")) && rect.bottom > window.innerHeight * 0.7) {
                    inVideoMode = true;
                    LOG("Confirmed: now in Video mode");
                    break;
                }
            }
            if (!inVideoMode) {
                LOG("Video mode indicator not found — proceeding anyway (may already be in video mode after Animate)");
            }

            // Find prompt input and paste video prompt
            await sleep(1000);
            const videoPromptInput = findPromptTextInput();
            if (videoPromptInput) {
                await setPromptText(videoPromptInput, req.videoPrompt);
                LOG(`Pasted video prompt (${req.videoPrompt.length} chars)`);
                steps.push("✅ Video Prompt");
                updateStep("vid-prompt", "done");
            } else {
                WARN("Could not find prompt text input for video prompt");
                steps.push("❌ Video Prompt");
                errors.push("video prompt input not found");
                updateStep("vid-prompt", "error");
            }
            await sleep(1000);

            // Click Generate button for video
            updateStep("vid-generate", "active");
            const videoGenBtn = findGenerateButton();
            if (videoGenBtn) {
                const vRect = videoGenBtn.getBoundingClientRect();
                const vCx = vRect.left + vRect.width / 2;
                const vCy = vRect.top + vRect.height / 2;
                const vOpts = { bubbles: true, cancelable: true, clientX: vCx, clientY: vCy, button: 0 };

                videoGenBtn.dispatchEvent(new PointerEvent("pointerdown", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mousedown", vOpts));
                await sleep(80);
                videoGenBtn.dispatchEvent(new PointerEvent("pointerup", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mouseup", vOpts));
                videoGenBtn.dispatchEvent(new MouseEvent("click", vOpts));
                LOG("✅ Clicked Generate for video — video generation started!");
                steps.push("✅ Video Generate");
                updateStep("vid-generate", "done");

                // Safety retry after 500ms
                await sleep(500);
                videoGenBtn.dispatchEvent(new PointerEvent("pointerdown", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mousedown", vOpts));
                await sleep(80);
                videoGenBtn.dispatchEvent(new PointerEvent("pointerup", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mouseup", vOpts));
                videoGenBtn.dispatchEvent(new MouseEvent("click", vOpts));
                LOG("Dispatched safety retry click on video Generate button");
            } else {
                WARN("Could not find Generate button for video");
                steps.push("❌ Video Generate");
                errors.push("video generate button not found");
                updateStep("vid-generate", "error");
            }
        } catch (e: any) {
            WARN(`Step 5 error: ${e.message}`);
            steps.push("⚠️ Video Gen");
            errors.push(`video gen error: ${e.message}`);
        }
    } else {
        LOG("No video prompt provided — skipping video generation step");
        skipStep("animate"); skipStep("vid-prompt"); skipStep("vid-generate"); skipStep("vid-wait");
    }

    // ── Step 6: Wait for video generation complete + handle scenes/download ──
    if (req.videoPrompt) {
        updateStep("vid-wait", "active");
        const totalScenes = req.sceneCount || 1;
        const scenePrompts = req.videoScenePrompts || [req.videoPrompt];

        // Configure overlay for multi-scene (adds per-scene steps dynamically)
        if (totalScenes > 1) {
            try { configureScenes(totalScenes); } catch (_) { /* overlay may not be visible */ }
        }

        LOG(`=== Step 6: Wait for video + ${totalScenes > 1 ? `continue ${totalScenes} scenes` : 'download'} ===`);

        // ── Shared: Scan for "X%" by querying ALL elements directly ──
        const scanForPct = (): number | null => {
            const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
            for (const el of els) {
                const txt = (el.textContent || "").trim();
                if (txt.length > 10) continue;
                const m = txt.match(/(\d{1,3})\s*%/);
                if (!m) continue;
                const pct = parseInt(m[1], 10);
                if (pct < 1 || pct > 100) continue;
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.width > 150) continue;
                if (rect.top < 0 || rect.top > window.innerHeight) continue;
                return pct;
            }
            return null;
        };

        /**
         * Wait for a NEW video to appear (play icon ▶ on thumbnail).
         * Returns the video card element or null on timeout.
         */
        const waitForVideoComplete = async (timeoutMs = 600000): Promise<HTMLElement | null> => {
            LOG("Waiting for video generation...");
            updateStep("vid-wait", "active");
            await sleep(5000);

            // ── Debug: dump all elements containing "%" text ──
            const debugDumpPct = () => {
                const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
                let count = 0;
                for (const el of els) {
                    const txt = (el.textContent || "").trim();
                    if (txt.includes("%") && txt.length < 15) {
                        const tag = el.tagName.toLowerCase();
                        const cls = el.className && typeof el.className === "string"
                            ? el.className.split(/\s+/).slice(0, 2).join(" ")
                            : "";
                        const rect = el.getBoundingClientRect();
                        LOG(`  🔍 "${txt}" in <${tag}.${cls}> at (${rect.left.toFixed(0)},${rect.top.toFixed(0)}) w=${rect.width.toFixed(0)}`);
                        count++;
                        if (count >= 5) break;
                    }
                }
                if (count === 0) LOG("  🔍 No element with '%' text found");
            };

            // Debug: scan for existing cards at start
            const earlyVideoCard = findFirstVideoCard();
            if (earlyVideoCard) {
                LOG(`📍 Video card already present at start`);
            } else {
                LOG("⏳ No video card yet — will poll for % progress");
            }

            // Debug: dump % text once
            LOG("🔍 Debug scan for % text nodes:");
            debugDumpPct();

            const start = Date.now();
            let lastPct = -1;
            let lastPctTime = 0;
            let completed = false;

            // Poll until completion
            while (Date.now() - start < timeoutMs) {
                const pct = scanForPct();
                if (pct !== null) {
                    if (pct !== lastPct) {
                        LOG(`Video progress: ${pct}%`);
                        lastPct = pct;
                        updateStep("vid-wait", "active", pct);
                    }
                    lastPctTime = Date.now();
                    if (pct >= 100) {
                        LOG("✅ 100% detected!");
                        completed = true;
                        break;
                    }
                } else if (lastPct > 30) {
                    // % disappeared = video generation finished
                    const lostFor = Math.floor((Date.now() - lastPctTime) / 1000);
                    if (lostFor >= 5) {
                        LOG(`✅ % disappeared at ${lastPct}% (lost for ${lostFor}s) — video done!`);
                        completed = true;
                        break;
                    }
                    LOG(`⏳ % lost at ${lastPct}% — confirming in ${5 - lostFor}s...`);
                } else {
                    const elapsed = Math.floor((Date.now() - start) / 1000);
                    if (elapsed % 15 < 3) {
                        LOG(`⏳ Waiting... (${elapsed}s) no % found`);
                    }
                }
                await sleep(3000);
            }

            // Now find the VIDEO card to click — using <i>videocam</i> icon (screen-size independent)
            const videoCard = findFirstVideoCard();
            if (!videoCard) {
                LOG("❌ No video card found to click");
                updateStep("vid-wait", "error");
                return null;
            }

            const el = videoCard;
            if (completed) {
                updateStep("vid-wait", "done", 100);
                LOG("Cool-down 4s before clicking...");
                await sleep(4000);
            } else {
                LOG("⚠️ Timeout — attempting to click video card anyway");
            }

            // Compute center of the card for hover/click
            const cardRect = el.getBoundingClientRect();
            const cx = cardRect.left + cardRect.width / 2;
            const cy = cardRect.top + cardRect.height / 2;

            // Hover 4s (with PointerEvents for Mac Radix UI compatibility)
            LOG(`🖱️ Hovering video card 4s at (${cx.toFixed(0)}, ${cy.toFixed(0)})...`);
            robustHover(el);
            for (let t = 0; t < 8; t++) {
                const moveOpts = { bubbles: true, cancelable: true, clientX: cx + (t % 2), clientY: cy };
                el.dispatchEvent(new PointerEvent("pointermove", { ...moveOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                el.dispatchEvent(new MouseEvent("mousemove", moveOpts));
                await sleep(500);
            }

            // Click 2 times with full pointer event sequence (cross-platform)
            LOG("Clicking video card...");
            for (let i = 0; i < 2; i++) {
                const target = document.elementFromPoint(cx, cy) as HTMLElement | null;
                if (target) await robustClick(target); else await robustClick(el);
                await sleep(300);
            }
            LOG("✅ Video card clicks done");
            return el;
        };

        /**
         * Wait for scene N video progress in detail view (% tracking only, no clicking).
         */
        const waitForSceneProgress = async (sceneNum: number, timeoutMs = 600000): Promise<boolean> => {
            LOG(`Waiting for scene ${sceneNum} video generation...`);
            await sleep(5000);

            const start = Date.now();
            let lastPct = -1;
            let lastPctTime = 0;

            while (Date.now() - start < timeoutMs) {
                const pct = scanForPct();
                if (pct !== null) {
                    if (pct !== lastPct) {
                        LOG(`Scene ${sceneNum} progress: ${pct}%`);
                        lastPct = pct;
                    }
                    lastPctTime = Date.now();
                    if (pct >= 100) {
                        LOG(`✅ Scene ${sceneNum} — 100%!`);
                        return true;
                    }
                } else if (lastPct > 30) {
                    const lostFor = Math.floor((Date.now() - lastPctTime) / 1000);
                    if (lostFor >= 5) {
                        LOG(`✅ Scene ${sceneNum} — % disappeared at ${lastPct}% (${lostFor}s) — done!`);
                        return true;
                    }
                    LOG(`⏳ Scene ${sceneNum} % lost at ${lastPct}% — confirming in ${5 - lostFor}s...`);
                } else {
                    const elapsed = Math.floor((Date.now() - start) / 1000);
                    if (elapsed % 15 < 3) {
                        LOG(`⏳ Scene ${sceneNum} waiting... (${elapsed}s)`);
                    }
                }
                await sleep(3000);
            }
            return false;
        };

        /**
         * Click a video card to open the detail view.
         */
        const clickVideoCard = async (card: HTMLElement) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };

            card.dispatchEvent(new PointerEvent("pointerdown", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            card.dispatchEvent(new MouseEvent("mousedown", opts));
            await sleep(80);
            card.dispatchEvent(new PointerEvent("pointerup", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            card.dispatchEvent(new MouseEvent("mouseup", opts));
            card.dispatchEvent(new MouseEvent("click", opts));
            LOG("Clicked video card");
            await sleep(2000);
        };

        /**
         * Download the video: 3-dots → ดาวน์โหลด → 1080p → wait upscale
         */
        const downloadVideo1080p = async (): Promise<boolean> => {
            // Find and click 3-dots (เพิ่มเติม) button in the detail view
            let dotsBtn: HTMLElement | null = null;
            const allBtns = document.querySelectorAll<HTMLElement>("button");
            for (const btn of allBtns) {
                const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
                const icons = btn.querySelectorAll("i, span");
                let hasMore = aria.includes("เพิ่มเติม") || aria.includes("more");
                for (const icon of icons) {
                    const t = icon.textContent?.trim() || "";
                    if (t === "more_vert" || t === "more_horiz") hasMore = true;
                }
                if (hasMore) {
                    const rect = btn.getBoundingClientRect();
                    if (rect.top > 0 && rect.width < 60) {
                        dotsBtn = btn;
                        break;
                    }
                }
            }

            if (!dotsBtn) {
                // Fallback: look for small button at top-right
                for (const btn of allBtns) {
                    const rect = btn.getBoundingClientRect();
                    if (rect.width < 50 && rect.height < 50 && rect.top < 100 && rect.right > window.innerWidth * 0.8) {
                        const txt = btn.textContent?.trim() || "";
                        if (txt.includes("more") || txt.includes("⋮")) {
                            dotsBtn = btn;
                            break;
                        }
                    }
                }
            }

            if (!dotsBtn) {
                WARN("Could not find 3-dots button for download");
                return false;
            }

            // Click 3-dots
            const dRect = dotsBtn.getBoundingClientRect();
            const dOpts = { bubbles: true, cancelable: true, clientX: dRect.left + dRect.width / 2, clientY: dRect.top + dRect.height / 2, button: 0 };
            dotsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            dotsBtn.dispatchEvent(new MouseEvent("mousedown", dOpts));
            await sleep(80);
            dotsBtn.dispatchEvent(new PointerEvent("pointerup", { ...dOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            dotsBtn.dispatchEvent(new MouseEvent("mouseup", dOpts));
            dotsBtn.dispatchEvent(new MouseEvent("click", dOpts));
            LOG("Clicked 3-dots menu");
            await sleep(1500);

            // Find and click "ดาวน์โหลด" menu item
            let downloadBtn: HTMLElement | null = null;
            const menuItems = document.querySelectorAll<HTMLElement>("button, [role='menuitem'], li, div[role='button']");
            for (const item of menuItems) {
                const txt = (item.textContent || "").trim();
                if (txt.includes("ดาวน์โหลด") || txt.toLowerCase().includes("download")) {
                    downloadBtn = item;
                    break;
                }
            }

            if (!downloadBtn) {
                WARN("Could not find 'ดาวน์โหลด' menu item");
                return false;
            }

            const dlRect = downloadBtn.getBoundingClientRect();
            const dlOpts = { bubbles: true, cancelable: true, clientX: dlRect.left + dlRect.width / 2, clientY: dlRect.top + dlRect.height / 2, button: 0 };
            downloadBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dlOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            downloadBtn.dispatchEvent(new MouseEvent("mousedown", dlOpts));
            await sleep(80);
            downloadBtn.dispatchEvent(new PointerEvent("pointerup", { ...dlOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            downloadBtn.dispatchEvent(new MouseEvent("mouseup", dlOpts));
            downloadBtn.dispatchEvent(new MouseEvent("click", dlOpts));
            LOG("Clicked ดาวน์โหลด");
            await sleep(2000);

            // Find and click "1080p" option
            let btn1080: HTMLElement | null = null;
            const options = document.querySelectorAll<HTMLElement>("button, [role='menuitem'], [role='option'], li, div[role='button']");
            for (const opt of options) {
                const txt = (opt.textContent || "").trim();
                if (txt.includes("1080p") || txt.includes("1080")) {
                    btn1080 = opt;
                    break;
                }
            }

            if (!btn1080) {
                WARN("Could not find 1080p option — trying 720p");
                for (const opt of options) {
                    const txt = (opt.textContent || "").trim();
                    if (txt.includes("720p") || txt.includes("720")) {
                        btn1080 = opt;
                        break;
                    }
                }
            }

            if (btn1080) {
                const hRect = btn1080.getBoundingClientRect();
                const hOpts = { bubbles: true, cancelable: true, clientX: hRect.left + hRect.width / 2, clientY: hRect.top + hRect.height / 2, button: 0 };
                btn1080.dispatchEvent(new PointerEvent("pointerdown", { ...hOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                btn1080.dispatchEvent(new MouseEvent("mousedown", hOpts));
                await sleep(80);
                btn1080.dispatchEvent(new PointerEvent("pointerup", { ...hOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                btn1080.dispatchEvent(new MouseEvent("mouseup", hOpts));
                btn1080.dispatchEvent(new MouseEvent("click", hOpts));
                LOG("Clicked 1080p — upscaling started");
            } else {
                WARN("Could not find resolution option");
                return false;
            }

            // Wait for "Upscaling complete!" text to appear (poll for up to 5 minutes)
            LOG("Waiting for upscale to complete...");
            const upscaleStart = Date.now();
            while (Date.now() - upscaleStart < 300000) {
                const allText = document.body.innerText || "";
                if (allText.includes("Upscaling complete") || allText.includes("upscaling complete")) {
                    LOG("✅ Upscaling complete! Video downloaded.");
                    return true;
                }
                await sleep(5000);
            }
            WARN("Upscale timeout — video may still be processing");
            return true; // Still return true, download might have started
        };

        /**
         * Shared download flow: ดาวน์โหลด → 1080p → wait upscale → open in Chrome
         */
        const performDownloadAndOpen = async () => {
            // Find ดาวน์โหลด button
            let dlBtn: HTMLElement | null = null;
            const allBtns = document.querySelectorAll<HTMLElement>("button");
            for (const btn of allBtns) {
                const txt = (btn.textContent || "").trim();
                if (txt.includes("ดาวน์โหลด") || txt.toLowerCase() === "download") {
                    dlBtn = btn;
                    LOG(`Found ดาวน์โหลด button via text: "${txt}"`);
                    break;
                }
            }
            if (!dlBtn) {
                for (const btn of allBtns) {
                    const rect = btn.getBoundingClientRect();
                    if (rect.top < 80 && rect.right > window.innerWidth - 300) {
                        const txt = (btn.textContent || "").trim().toLowerCase();
                        const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
                        if (txt.includes("ดาวน์") || txt.includes("download") ||
                            aria.includes("ดาวน์") || aria.includes("download")) {
                            dlBtn = btn;
                            LOG("Found ดาวน์โหลด button via position+text");
                            break;
                        }
                    }
                }
            }
            if (!dlBtn) {
                const overlays = document.querySelectorAll<HTMLElement>('[data-type="button-overlay"]');
                for (const overlay of overlays) {
                    const parent = overlay.closest("button") || overlay.parentElement;
                    if (parent) {
                        const ptxt = (parent.textContent || "").trim();
                        if (ptxt.includes("ดาวน์โหลด") || ptxt.toLowerCase().includes("download")) {
                            dlBtn = parent as HTMLElement;
                            LOG("Found ดาวน์โหลด via button-overlay parent");
                            break;
                        }
                    }
                }
            }

            if (!dlBtn) {
                WARN("Could not find ดาวน์โหลด button in detail view");
                steps.push("⚠️ Download btn");
                return;
            }

            // Click ดาวน์โหลด
            const dlRect = dlBtn.getBoundingClientRect();
            const dlOpts = { bubbles: true, cancelable: true, clientX: dlRect.left + dlRect.width / 2, clientY: dlRect.top + dlRect.height / 2, button: 0 };
            dlBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dlOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            dlBtn.dispatchEvent(new MouseEvent("mousedown", dlOpts));
            await sleep(80);
            dlBtn.dispatchEvent(new PointerEvent("pointerup", { ...dlOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            dlBtn.dispatchEvent(new MouseEvent("mouseup", dlOpts));
            dlBtn.dispatchEvent(new MouseEvent("click", dlOpts));
            LOG("Clicked ดาวน์โหลด button");
            steps.push("✅ ดาวน์โหลด");
            updateStep("download", "done");
            updateStep("upscale", "active");
            await sleep(1500);

            // Helper: click any HTMLElement with full pointer events
            const clickEl = async (el: HTMLElement) => {
                const r = el.getBoundingClientRect();
                const opts = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, button: 0 };
                el.dispatchEvent(new PointerEvent("pointerdown", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                el.dispatchEvent(new MouseEvent("mousedown", opts));
                await sleep(80);
                el.dispatchEvent(new PointerEvent("pointerup", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                el.dispatchEvent(new MouseEvent("mouseup", opts));
                el.dispatchEvent(new MouseEvent("click", opts));
            };

            // Helper: hover an element (Radix menus open on hover/pointerenter)
            const hoverEl = async (el: HTMLElement) => {
                const r = el.getBoundingClientRect();
                const opts = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
                el.dispatchEvent(new PointerEvent("pointerenter", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                el.dispatchEvent(new MouseEvent("mouseenter", opts));
                el.dispatchEvent(new PointerEvent("pointermove", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                el.dispatchEvent(new MouseEvent("mouseover", opts));
                el.dispatchEvent(new MouseEvent("mousemove", opts));
            };

            // Helper: find visible menuitem by text (Radix uses role="menuitem")
            const findMenuItem = (text: string): HTMLElement | null => {
                const items = document.querySelectorAll<HTMLElement>('[role="menuitem"]');
                for (const item of items) {
                    const txt = (item.textContent || "").trim();
                    if (txt.includes(text)) {
                        const r = item.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0) return item;
                    }
                }
                return null;
            };

            // Detect menu type: "Full Video" = multi-scene submenu
            const fullVideoBtn = findMenuItem("Full Video");
            if (fullVideoBtn) {
                // ── Multi-scene: hover Full Video → submenu → click 720p ──
                LOG("Multi-scene menu detected — hovering Full Video...");
                await hoverEl(fullVideoBtn);
                await sleep(500);
                await clickEl(fullVideoBtn);
                LOG("Clicked Full Video");
                steps.push("✅ Full Video");
                await sleep(1500);

                // Wait for 720p submenu to appear (poll up to 5s)
                let res720: HTMLElement | null = null;
                const subStart = Date.now();
                while (Date.now() - subStart < 5000) {
                    res720 = findMenuItem("720p");
                    if (res720) break;
                    LOG("Waiting for 720p submenu...");
                    await sleep(500);
                }
                if (!res720) {
                    WARN("Could not find 720p option in submenu");
                    steps.push("⚠️ 720p");
                    return;
                }
                await clickEl(res720);
                LOG("Clicked 720p — download starting");
                steps.push("✅ 720p");
                updateStep("upscale", "active");
            } else {
                // ── Single scene: 1080p directly ──
                let res1080 = findMenuItem("1080p");
                if (!res1080) {
                    const allEls = document.querySelectorAll<HTMLElement>("button, div[role='button'], span");
                    for (const el of allEls) {
                        const txt = (el.textContent || "").trim();
                        if (txt.includes("1080p") && el.offsetParent !== null) {
                            res1080 = el.closest("button") as HTMLElement || el;
                            break;
                        }
                    }
                }
                if (!res1080) {
                    WARN("Could not find 1080p option");
                    steps.push("⚠️ 1080p");
                    return;
                }
                await clickEl(res1080);
                LOG("Clicked 1080p — download starting");
                steps.push("✅ 1080p");
                updateStep("upscale", "active");
            }

            // Wait for download to complete
            // Single scene: "Upscaling complete" / "upscaling complete"
            // Multi-scene: "Downloading your extended video." → "Download complete!"
            LOG("Waiting for download to complete...");
            const upStart = Date.now();
            let downloadDone = false;
            while (Date.now() - upStart < 300000) {
                const bodyText = document.body.innerText || "";
                if (bodyText.includes("Download complete")) {
                    LOG("✅ Download complete!");
                    steps.push("✅ Downloaded");
                    updateStep("upscale", "done", 100);
                    downloadDone = true;
                    break;
                }
                if (bodyText.includes("Upscaling complete") || bodyText.includes("upscaling complete")) {
                    LOG("✅ Upscaling complete!");
                    steps.push("✅ Upscaled");
                    updateStep("upscale", "done", 100);
                    downloadDone = true;
                    break;
                }
                // Log progress for multi-scene
                if (bodyText.includes("Downloading your extended video")) {
                    LOG("Downloading extended video...");
                } else {
                    LOG("Waiting...");
                }
                await sleep(3000);
            }

            if (!downloadDone) {
                WARN("Download timeout — file may still be downloading");
                steps.push("⚠️ Download timeout");
                updateStep("upscale", "error");
                return;
            }

            // Open file in Chrome
            updateStep("open", "active");
            LOG("Waiting for download file to be ready...");
            await sleep(5000);
            let opened = false;
            const dlPollStart = Date.now();
            while (Date.now() - dlPollStart < 60000 && !opened) {
                try {
                    await new Promise<void>((resolve) => {
                        chrome.runtime.sendMessage({ action: "OPEN_LATEST_VIDEO" }, (res) => {
                            if (chrome.runtime.lastError) {
                                WARN(`Download poll error: ${chrome.runtime.lastError.message}`);
                            } else if (res?.success) {
                                LOG(`✅ Opened video: ${res.message}`);
                                steps.push("✅ Opened");
                                updateStep("open", "done");
                                opened = true;
                            } else {
                                LOG(`Download not ready: ${res?.message}`);
                            }
                            resolve();
                        });
                    });
                } catch (e: any) {
                    WARN(`Poll exception: ${e.message}`);
                }
                if (!opened) await sleep(3000);
            }
            if (!opened) {
                WARN("Could not find/open downloaded video");
                steps.push("⚠️ Open");
            }
        };

        try {
            // Wait for the first video to complete
            const videoCard = await waitForVideoComplete();
            if (!videoCard) {
                WARN("Timeout waiting for video generation");
                steps.push("⚠️ Video Wait");
                updateStep("vid-wait", "error");
            } else {
                steps.push("✅ Video Complete");
                updateStep("vid-wait", "done", 100);
                updateStep("download", "active");

                if (totalScenes <= 1) {
                    // ── Single scene: hover+click already done in waitForVideoComplete ──
                    LOG("Single scene — waiting 3s for detail view to load...");
                    steps.push("✅ Clicked");
                    await sleep(3000);

                    // Step 6B: Find and click "ดาวน์โหลด" button in detail view (top-right area)
                    let dlBtn: HTMLElement | null = null;

                    // Strategy 1: button containing text "ดาวน์โหลด" / "Download"
                    const allBtns = document.querySelectorAll<HTMLElement>("button");
                    for (const btn of allBtns) {
                        const txt = (btn.textContent || "").trim();
                        if (txt.includes("ดาวน์โหลด") || txt.toLowerCase() === "download") {
                            dlBtn = btn;
                            LOG(`Found ดาวน์โหลด button via text: "${txt}"`);
                            break;
                        }
                    }

                    // Strategy 2: look for button with download icon near top-right
                    if (!dlBtn) {
                        for (const btn of allBtns) {
                            const rect = btn.getBoundingClientRect();
                            if (rect.top < 80 && rect.right > window.innerWidth - 300) {
                                const txt = (btn.textContent || "").trim().toLowerCase();
                                const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
                                if (txt.includes("ดาวน์") || txt.includes("download") ||
                                    aria.includes("ดาวน์") || aria.includes("download")) {
                                    dlBtn = btn;
                                    LOG("Found ดาวน์โหลด button via position+text");
                                    break;
                                }
                            }
                        }
                    }

                    // Strategy 3: div with data-type="button-overlay" inside a download-like container
                    if (!dlBtn) {
                        const overlays = document.querySelectorAll<HTMLElement>('[data-type="button-overlay"]');
                        for (const overlay of overlays) {
                            const parent = overlay.closest("button") || overlay.parentElement;
                            if (parent) {
                                const ptxt = (parent.textContent || "").trim();
                                if (ptxt.includes("ดาวน์โหลด") || ptxt.toLowerCase().includes("download")) {
                                    dlBtn = parent as HTMLElement;
                                    LOG("Found ดาวน์โหลด via button-overlay parent");
                                    break;
                                }
                            }
                        }
                    }

                    if (!dlBtn) {
                        WARN("Could not find ดาวน์โหลด button in detail view");
                        steps.push("⚠️ Download btn");
                    } else {
                        // Click ดาวน์โหลด
                        const dlRect = dlBtn.getBoundingClientRect();
                        const dlCx = dlRect.left + dlRect.width / 2;
                        const dlCy = dlRect.top + dlRect.height / 2;
                        const dlOpts = { bubbles: true, cancelable: true, clientX: dlCx, clientY: dlCy, button: 0 };
                        dlBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dlOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                        dlBtn.dispatchEvent(new MouseEvent("mousedown", dlOpts));
                        await sleep(80);
                        dlBtn.dispatchEvent(new PointerEvent("pointerup", { ...dlOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                        dlBtn.dispatchEvent(new MouseEvent("mouseup", dlOpts));
                        dlBtn.dispatchEvent(new MouseEvent("click", dlOpts));
                        LOG("Clicked ดาวน์โหลด button");
                        steps.push("✅ ดาวน์โหลด");
                        updateStep("download", "done");
                        updateStep("upscale", "active");
                        await sleep(1500);

                        // Step 6C: Find and click "1080p" from the dropdown
                        let res1080: HTMLElement | null = null;
                        const menuItems = document.querySelectorAll<HTMLElement>(
                            'button[role="menuitem"], [role="menuitem"], [role="option"], li'
                        );
                        for (const item of menuItems) {
                            const txt = (item.textContent || "").trim();
                            if (txt.includes("1080p")) {
                                res1080 = item;
                                break;
                            }
                        }
                        // Broader fallback
                        if (!res1080) {
                            const allEls = document.querySelectorAll<HTMLElement>("button, div[role='button'], span");
                            for (const el of allEls) {
                                const txt = (el.textContent || "").trim();
                                if (txt.includes("1080p") && el.offsetParent !== null) {
                                    res1080 = el.closest("button") as HTMLElement || el;
                                    break;
                                }
                            }
                        }

                        if (!res1080) {
                            WARN("Could not find 1080p option in dropdown");
                            steps.push("⚠️ 1080p");
                        } else {
                            const rRect = res1080.getBoundingClientRect();
                            const rCx = rRect.left + rRect.width / 2;
                            const rCy = rRect.top + rRect.height / 2;
                            const rOpts = { bubbles: true, cancelable: true, clientX: rCx, clientY: rCy, button: 0 };
                            res1080.dispatchEvent(new PointerEvent("pointerdown", { ...rOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                            res1080.dispatchEvent(new MouseEvent("mousedown", rOpts));
                            await sleep(80);
                            res1080.dispatchEvent(new PointerEvent("pointerup", { ...rOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                            res1080.dispatchEvent(new MouseEvent("mouseup", rOpts));
                            res1080.dispatchEvent(new MouseEvent("click", rOpts));
                            LOG("Clicked 1080p — download starting");
                            steps.push("✅ 1080p");

                            // Step 6D: Wait for upscaling to complete (server-side), then download finishes
                            LOG("Waiting for upscaling + download...");

                            // 6D-1: Poll page for "Upscaling complete!" (up to 5 min)
                            const upStart = Date.now();
                            let upscaleDone = false;
                            while (Date.now() - upStart < 300000) {
                                const bodyText = document.body.innerText || "";
                                if (bodyText.includes("Upscaling complete") || bodyText.includes("upscaling complete")) {
                                    LOG("✅ Upscaling complete!");
                                    steps.push("✅ Upscaled");
                                    updateStep("upscale", "done", 100);
                                    upscaleDone = true;
                                    break;
                                }
                                await sleep(5000);
                                LOG("Upscaling...");
                            }

                            // 6D-2: After upscale done, wait for download to finish then open
                            if (upscaleDone) {
                                updateStep("open", "active");
                                LOG("Waiting for download file to be ready...");
                                await sleep(5000); // give Chrome time to finish saving

                                // Poll chrome.downloads for the completed video file
                                let opened = false;
                                const dlPollStart = Date.now();
                                while (Date.now() - dlPollStart < 60000 && !opened) {
                                    try {
                                        await new Promise<void>((resolve) => {
                                            chrome.runtime.sendMessage({ action: "OPEN_LATEST_VIDEO" }, (res) => {
                                                if (chrome.runtime.lastError) {
                                                    WARN(`Download poll error: ${chrome.runtime.lastError.message}`);
                                                } else if (res?.success) {
                                                    LOG(`✅ Opened video: ${res.message}`);
                                                    steps.push("✅ Opened");
                                                    updateStep("open", "done");
                                                    opened = true;
                                                } else {
                                                    LOG(`Download not ready: ${res?.message}`);
                                                }
                                                resolve();
                                            });
                                        });
                                    } catch (e: any) {
                                        WARN(`Poll exception: ${e.message}`);
                                    }
                                    if (!opened) await sleep(3000);
                                }

                                if (!opened) {
                                    WARN("Could not find/open downloaded video");
                                    steps.push("⚠️ Open");
                                }
                            } else {
                                WARN("Upscaling timeout — download may still complete");
                                steps.push("⚠️ Upscale timeout");
                            }
                        }
                    }
                } else {
                    // ── Multi-scene: paste next scene prompt → generate → track % → repeat ──
                    LOG(`Multi-scene mode: ${totalScenes} scenes`);

                    for (let sceneIdx = 1; sceneIdx < totalScenes; sceneIdx++) {
                        const scenePrompt = scenePrompts[sceneIdx];
                        if (!scenePrompt) {
                            LOG(`No prompt for scene ${sceneIdx + 1} — skipping`);
                            continue;
                        }

                        const sn = sceneIdx + 1; // scene number (2, 3, ...)
                        LOG(`--- Scene ${sn}/${totalScenes} ---`);
                        await sleep(2000);

                        // Already in detail view — "ขยาย" is selected, paste prompt
                        updateStep(`scene${sn}-prompt`, "active");
                        const detailPromptInput = findPromptTextInput();
                        if (detailPromptInput) {
                            await setPromptText(detailPromptInput, scenePrompt);
                            LOG(`Pasted scene ${sn} prompt (${scenePrompt.length} chars)`);
                            steps.push(`✅ Scene${sn} Prompt`);
                            updateStep(`scene${sn}-prompt`, "done");
                        } else {
                            WARN(`Could not find prompt input for scene ${sn}`);
                            steps.push(`❌ Scene${sn}`);
                            errors.push(`scene ${sn} prompt input not found`);
                            updateStep(`scene${sn}-prompt`, "error");
                            break;
                        }
                        await sleep(1000);

                        // Click → generate button (full pointer event sequence for React)
                        updateStep(`scene${sn}-gen`, "active");
                        const sceneGenBtn = findGenerateButton();
                        if (sceneGenBtn) {
                            const sgRect = sceneGenBtn.getBoundingClientRect();
                            const sgCx = sgRect.left + sgRect.width / 2;
                            const sgCy = sgRect.top + sgRect.height / 2;
                            const sgOpts = { bubbles: true, cancelable: true, clientX: sgCx, clientY: sgCy, button: 0 };

                            sceneGenBtn.dispatchEvent(new PointerEvent("pointerdown", { ...sgOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                            sceneGenBtn.dispatchEvent(new MouseEvent("mousedown", sgOpts));
                            await sleep(80);
                            sceneGenBtn.dispatchEvent(new PointerEvent("pointerup", { ...sgOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                            sceneGenBtn.dispatchEvent(new MouseEvent("mouseup", sgOpts));
                            sceneGenBtn.dispatchEvent(new MouseEvent("click", sgOpts));
                            LOG(`Clicked Generate for scene ${sn} (full event sequence)`);
                            steps.push(`✅ Scene${sn} Gen`);
                            updateStep(`scene${sn}-gen`, "done");

                            // Safety retry after 500ms
                            await sleep(500);
                            sceneGenBtn.dispatchEvent(new PointerEvent("pointerdown", { ...sgOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                            sceneGenBtn.dispatchEvent(new MouseEvent("mousedown", sgOpts));
                            await sleep(80);
                            sceneGenBtn.dispatchEvent(new PointerEvent("pointerup", { ...sgOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                            sceneGenBtn.dispatchEvent(new MouseEvent("mouseup", sgOpts));
                            sceneGenBtn.dispatchEvent(new MouseEvent("click", sgOpts));
                        } else {
                            WARN(`Could not find Generate button for scene ${sn}`);
                            steps.push(`❌ Scene${sn} Gen`);
                            errors.push(`scene ${sn} generate button not found`);
                            updateStep(`scene${sn}-gen`, "error");
                            break;
                        }

                        // Wait for scene % progress (in detail view)
                        updateStep(`scene${sn}-wait`, "active");
                        const sceneDone = await waitForSceneProgress(sn);
                        if (sceneDone) {
                            steps.push(`✅ Scene${sn}`);
                            updateStep(`scene${sn}-wait`, "done", 100);
                        } else {
                            WARN(`Timeout on scene ${sn}`);
                            steps.push(`⚠️ Scene${sn}`);
                            updateStep(`scene${sn}-wait`, "error");
                        }
                    }

                    LOG("All scenes generated!");
                    steps.push("✅ All Scenes");

                    // Download after all scenes
                    await sleep(3000);
                    await performDownloadAndOpen();
                }
            }
        } catch (e: any) {
            WARN(`Step 6 error: ${e.message}`);
            steps.push("⚠️ Step6");
            errors.push(`step 6: ${e.message}`);
        }
    }

    const success = errors.length === 0;

    // ── Complete Overlay ──
    try { completeOverlay(success ? 5000 : 8000); } catch (e) { console.warn("Overlay complete error:", e); }

    return {
        success,
        message: success
            ? `สำเร็จ! ${steps.join(" → ")}`
            : `บางขั้นตอนมีปัญหา: ${steps.join(" → ")} | ${errors.join(", ")}`,
        step: success ? "done" : "partial"
    };
}

// ─── Message Listener ───────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.action === "GENERATE_IMAGE") {
        (window as any).__NETFLOW_STOP__ = false;
        LOG("Received GENERATE_IMAGE request");
        // Respond immediately to prevent MV3 service-worker message-channel timeout
        sendResponse({ success: true, message: "⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow", step: "started" });
        // Fire-and-forget: run the long automation in the background
        handleGenerateImage(message as GenerateImageRequest)
            .then(result => LOG(`✅ Automation finished: ${result.message}`))
            .catch(err => console.error("[Netflow AI] Generate error:", err));
        return false;
    }

    if (message?.action === "STOP_AUTOMATION") {
        LOG("⛔ STOP_AUTOMATION received — setting stop flag");
        (window as any).__NETFLOW_STOP__ = true;
        sendResponse({ success: true, message: "Stop signal sent" });
        return false;
    }

    if (message?.action === "PING") {
        sendResponse({ status: "ready" });
        return false;
    }

    if (message?.action === "CLICK_FIRST_IMAGE") {
        sendResponse({ success: true, message: "⏳ กำลังคลิกรูปแรก..." });
        (async () => {
            LOG("CLICK_FIRST_IMAGE — finding first image card via <i>image</i> icon...");
            await sleep(500);

            // Element-based detection: find card with <i>image</i> icon (works on any screen size)
            const imageCard = findFirstImageCard();
            if (!imageCard) {
                WARN("No image card found via <i>image</i> icon");
                return;
            }

            const r = imageCard.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            LOG(`Image card at (${cx.toFixed(0)}, ${cy.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} — clicking 2 times`);

            for (let i = 0; i < 2; i++) {
                const target = document.elementFromPoint(cx, cy) as HTMLElement | null;
                if (target) {
                    await robustClick(target);
                    LOG(`Click ${i + 1}/2 on <${target.tagName.toLowerCase()}>`);
                } else {
                    await robustClick(imageCard);
                    LOG(`Click ${i + 1}/2 on card (fallback)`);
                }
                await sleep(300);
            }
            LOG("✅ 2 clicks on image card done");
        })();
        return false;
    }
});

LOG("Google Flow content script ready — waiting for commands");


document.addEventListener("dblclick", (e) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    const tag = t.tagName.toLowerCase();
    const x = Math.round(e.clientX), y = Math.round(e.clientY);
    const txt = (t.textContent || "").trim().slice(0, 30);
    LOG(`🖱️🖱️ DblClick (${x},${y}) → <${tag}> "${txt}"`);
}, true);
