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

import { showOverlay, hideOverlay, updateStep, skipStep, completeOverlay, configureScenes, addLog, setOverlayTheme } from "./netflow-overlay";

const LOG = (msg: string) => {
    console.log(`[Netflow AI] ${msg}`);
    try { addLog(msg); } catch (_) { /* overlay not ready */ }
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg }); } catch (_) { /* popup closed */ }
};
const WARN = (msg: string) => {
    console.warn(`[Netflow AI] ${msg}`);
    try { addLog(`⚠️ ${msg}`); } catch (_) { /* overlay not ready */ }
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `⚠️ ${msg}` }); } catch (_) { /* popup closed */ }
};

// ─── Platform Detection ─────────────────────────────────────────────────────
const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isWindows = /Win/i.test(navigator.userAgent);
const platformTag = isMac ? '🍎 Mac' : isWindows ? '🪟 Win' : '🐧 Other';

LOG(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${platformTag}`);

// ─── Mouse Position Tracker (Debug) ─────────────────────────────────────────
document.addEventListener("click", (e) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    const tag = t.tagName.toLowerCase();
    const x = Math.round(e.clientX), y = Math.round(e.clientY);
    const txt = (t.textContent || "").trim().slice(0, 30);
    LOG(`🖱️ คลิก (${x},${y}) → <${tag}> "${txt}"`);
}, true);

// ─── Helpers ────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Check if automation should stop (user clicked stop button) */
function checkStop(): boolean {
    return !!(window as any).__NETFLOW_STOP__;
}

/** Check if Google Flow is showing a generation failure message (Thai + English) */
function isGenerationFailed(): string | null {
    const failurePatterns = [
        "couldn't generate", "could not generate", "failed to generate",
        "generation failed", "ไม่สามารถสร้าง", "สร้างไม่สำเร็จ",
        "try again later", "ลองอีกครั้งภายหลัง", "ลองใหม่อีกครั้ง",
        "something went wrong", "เกิดข้อผิดพลาด",
        "safety filter", "policy violation", "content policy",
        "unable to generate", "ไม่สามารถสร้างวิดีโอ",
        "couldn't generate video", "couldn't generate image",
    ];
    const overlayEl = document.getElementById("netflow-engine-overlay");
    const allEls = document.querySelectorAll<HTMLElement>("div, span, p, h1, h2, h3, li");
    for (const el of allEls) {
        if (overlayEl && overlayEl.contains(el)) continue;
        const txt = (el.textContent || "").trim().toLowerCase();
        if (txt.length > 200 || txt.length < 5) continue;
        for (const pattern of failurePatterns) {
            if (txt.includes(pattern)) {
                return el.textContent?.trim() || pattern;
            }
        }
    }
    return null;
}

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
    // Also fire native .click() for trusted event — React may ignore synthetic events on BOTH platforms
    await sleep(50);
    el.click();
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

        // Walk up the DOM to find the card container (prefer smallest valid match)
        let el: HTMLElement | null = icon;
        let card: HTMLElement | null = null;
        let cardArea = Infinity;
        for (let depth = 0; depth < 20 && el; depth++) {
            el = el.parentElement;
            if (!el || el === document.body) break;
            const r = el.getBoundingClientRect();
            // Card: visible, reasonably sized, not the whole page
            if (r.width > 100 && r.height > 80 &&
                r.width < window.innerWidth * 0.6 &&
                r.top >= -10 && r.bottom <= window.innerHeight + 10) {
                const area = r.width * r.height;
                if (area < cardArea) {
                    card = el;
                    cardArea = area;
                }
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
        LOG(`🎬 พบการ์ดวิดีโอ ${cards.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
        return cards[0];
    }
    // Fallback: look for elements with <video> tag
    const videos = document.querySelectorAll<HTMLVideoElement>("video");
    for (const vid of videos) {
        let container = vid.parentElement;
        for (let i = 0; i < 10 && container; i++) {
            const r = container.getBoundingClientRect();
            if (r.width > 100 && r.height > 80 && r.width < window.innerWidth * 0.6) {
                LOG(`🎬 พบการ์ดวิดีโอจาก <video> สำรองที่ (${r.left.toFixed(0)},${r.top.toFixed(0)})`);
                return container;
            }
            container = container.parentElement;
        }
    }
    LOG("🎬 ไม่พบการ์ดวิดีโอ");
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
        LOG(`🖼️ พบการ์ดรูปภาพ ${cards.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
        return cards[0];
    }
    // Fallback: look for <canvas> elements
    const canvases = document.querySelectorAll<HTMLCanvasElement>("canvas");
    for (const cvs of canvases) {
        let container = cvs.parentElement;
        for (let i = 0; i < 10 && container; i++) {
            const r = container.getBoundingClientRect();
            if (r.width > 100 && r.height > 80 && r.width < window.innerWidth * 0.6) {
                LOG(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${r.left.toFixed(0)},${r.top.toFixed(0)})`);
                return container;
            }
            container = container.parentElement;
        }
    }
    LOG("🖼️ ไม่พบการ์ดรูปภาพ");
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
        LOG("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");
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
        LOG(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${bestY.toFixed(0)}`);
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
            LOG(`พบปุ่ม Generate จากไอคอน "${icon}" ที่ y=${bestY.toFixed(0)}`);
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
        LOG("พบปุ่ม Generate จากตำแหน่งขวาล่าง");
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
    LOG("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");
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
        LOG("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");

        // Dispatch input event (Slate's cleanup handler)
        const inputEv = new InputEvent("input", {
            bubbles: true,
            inputType: "insertFromPaste",
            dataTransfer: dt,
        });
        el.dispatchEvent(inputEv);
        await sleep(800);

        // Verify — check actual text, excluding placeholder
        const content = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${content.length} ตัวอักษร)`);
            return;
        }
        LOG(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${content.length} ตัวอักษร)`);
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 1 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 2: Slate beforeinput with insertText (character-level, but batched) ═══
    LOG("วางข้อความ: วิธี 2 — Slate beforeinput insertText");
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

        const content2 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content2.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${content2.length} ตัวอักษร)`);
            return;
        }
        LOG(`วางข้อความ: วิธี 2 — ไม่พบข้อความ`);
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 2 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 3: ClipboardEvent paste (Mac-compatible — Slate intercepts paste events) ═══
    LOG("วางข้อความ: วิธี 3 — ClipboardEvent paste");
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

        const content3a = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content3a.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${content3a.length} ตัวอักษร)`);
            return;
        }
        LOG("วางข้อความ: วิธี 3 — ไม่พบข้อความ");
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 3 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 4: navigator.clipboard + execCommand('paste') ═══
    LOG("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");
    try {
        // Use modern clipboard API (works on Mac without user gesture in extensions with clipboardWrite)
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            LOG("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");
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
            LOG("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand");
        }

        // Paste into Slate
        el.focus();
        await sleep(200);
        document.execCommand("paste");
        await sleep(500);

        const content4 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content4.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${content4.length} ตัวอักษร)`);
            return;
        }
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 4 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 5: React fiber — find Slate editor and call insertText ═══
    LOG("วางข้อความ: วิธี 5 — React fiber Slate editor");
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
                    LOG("วางข้อความ: พบ Slate editor ผ่าน fiber props");
                    const editor = props.editor;
                    // Select all and delete, then insert
                    if (editor.selection) {
                        // Move to end
                    }
                    editor.insertText(text);
                    LOG(`วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText`);
                    return;
                }

                // Check stateRef
                if (state?.memoizedState?.editor?.insertText) {
                    LOG("วางข้อความ: พบ Slate editor ผ่าน fiber state");
                    state.memoizedState.editor.insertText(text);
                    LOG(`วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor`);
                    return;
                }

                fiber = fiber.return;
            }
            LOG("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree");
        } else {
            LOG("วางข้อความ: ไม่พบ React fiber บน element");
        }
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 5 ล้มเหลว: ${e.message}`);
    }

    LOG("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console");
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
        LOG(`ปิดกั้น file input ${neutralized.length} ตัว (type → text)`);
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
            LOG(`🚫 บล็อกการเปิด file dialog (${platformTag})`);
            return; // suppress native file chooser
        }
        return origClick.call(this);
    };
    LOG(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${platformTag})`);
    return () => {
        HTMLInputElement.prototype.click = origClick;
        LOG(`🔓 ถอดตัวบล็อก file dialog แล้ว`);
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
    LOG(`คืนค่า input ${candidates.length} ตัวเป็น type=file`);

    // Find the best file input to inject into
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    if (fileInputs.length === 0) {
        LOG(`⚠️ ไม่พบ file input หลังคืนค่า (${platformTag})`);
        return false;
    }

    // ★ Prefer NEW file inputs (not pre-existing) — fixes second upload targeting stale input
    let target: HTMLInputElement;
    if (preExistingInputs && preExistingInputs.size > 0) {
        const newInputs = Array.from(fileInputs).filter(inp => !preExistingInputs.has(inp));
        if (newInputs.length > 0) {
            target = newInputs[newInputs.length - 1];
            LOG(`เล็งเป้า file input ใหม่ (${newInputs.length} ใหม่, ${fileInputs.length} ทั้งหมด)`);
        } else {
            target = fileInputs[fileInputs.length - 1];
            LOG(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${fileInputs.length} ตัว`);
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
        LOG(`ฉีดไฟล์ผ่าน target.files (${target.files?.length ?? 0} ไฟล์)`);
    } catch (e: any) {
        LOG(`กำหนด target.files ล้มเหลว: ${e.message} — ลอง defineProperty`);
        // Method 2: defineProperty override (Mac fallback)
        try {
            Object.defineProperty(target, 'files', {
                value: dt.files,
                writable: true,
                configurable: true,
            });
            LOG(`ฉีดไฟล์ผ่าน Object.defineProperty`);
        } catch (e2: any) {
            WARN(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${e2.message}`);
            return false;
        }
    }

    // ★ React _valueTracker reset — CRITICAL for React to detect the change
    // React tracks input values internally. If the cached value matches current,
    // React skips the onChange handler. We must reset the tracker first.
    const tracker = (target as any)._valueTracker;
    if (tracker) {
        tracker.setValue('');
        LOG(`รีเซ็ต React _valueTracker บน file input`);
    }

    // ★ Dispatch 'change' event — React's delegated listener at root should pick this up
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
        LOG(`ส่ง drop event บน file input ด้วย`);
    } catch (_) {
        // drop event dispatch is optional — ignore errors
    }

    LOG(`✅ ฉีดไฟล์เสร็จ: ${file.name} (${(file.size / 1024).toFixed(1)} KB) → <input> ${platformTag}`);
    return true;
}

/**
 * Count how many reference thumbnails are in the prompt bar area.
 */
function countPromptBarThumbnails(): number {
    let count = 0;
    const overlayEl = document.getElementById("netflow-engine-overlay");
    const images = document.querySelectorAll<HTMLImageElement>("img");
    for (const img of images) {
        if (overlayEl && overlayEl.contains(img)) continue;
        const rect = img.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && img.src && img.offsetParent !== null) {
            count++;
        }
    }
    const thumbDivs = document.querySelectorAll<HTMLElement>('[style*="background-image"], [class*="thumb"], [class*="preview"]');
    for (const div of thumbDivs) {
        if (overlayEl && overlayEl.contains(div)) continue;
        const rect = div.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && div.offsetParent !== null) {
            count++;
        }
    }
    return count;
}

/**
 * Check if a thumbnail/image reference appeared in the prompt bar area.
 * Looks for <img> tags or thumbnail containers in the bottom prompt bar region.
 */
function checkPromptBarThumbnail(): boolean {
    // Look for image thumbnails in the bottom portion of the page (prompt bar area)
    const images = document.querySelectorAll<HTMLImageElement>("img");
    for (const img of images) {
        const rect = img.getBoundingClientRect();
        // Thumbnail should be in the bottom 40% of the screen, small-ish, and visible
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && img.src && img.offsetParent !== null) {
            LOG(`พบรูปย่อ: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)} ที่ y=${rect.top.toFixed(0)}`);
            return true;
        }
    }
    // Also check for div/span with background-image in prompt bar area
    const thumbDivs = document.querySelectorAll<HTMLElement>('[style*="background-image"], [class*="thumb"], [class*="preview"]');
    for (const div of thumbDivs) {
        const rect = div.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && div.offsetParent !== null) {
            LOG(`พบรูปย่อ div: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)} ที่ y=${rect.top.toFixed(0)}`);
            return true;
        }
    }
    return false;
}

/**
 * Drop a file onto the prompt bar via drag-and-drop events.
 * Bypasses file input entirely — Google Flow's drop handler processes the file directly.
 */
async function dropFileOnPromptBar(file: File): Promise<boolean> {
    LOG("ลองลากวางไฟล์บน Prompt Bar (drag-and-drop)...");

    // Find the prompt bar container — the area with contenteditable or the form/wrapper
    const targets: HTMLElement[] = [];

    // Priority 1: contenteditable in bottom area
    const editables = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    for (const el of editables) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) targets.push(el);
    }

    // Priority 2: form or wrapper in bottom area
    const wrappers = document.querySelectorAll<HTMLElement>('form, [role="textbox"], [data-slate-editor]');
    for (const el of wrappers) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5 && !targets.includes(el)) targets.push(el);
    }

    // Priority 3: any div in bottom area that looks like a prompt container
    if (targets.length === 0) {
        const bottomDivs = document.querySelectorAll<HTMLElement>("div");
        for (const div of bottomDivs) {
            const rect = div.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.8 && rect.width > 300 && rect.height > 30 && rect.height < 200) {
                targets.push(div);
                if (targets.length >= 3) break;
            }
        }
    }

    if (targets.length === 0) {
        LOG("ไม่พบเป้าหมายบน Prompt Bar สำหรับ drag-and-drop");
        return false;
    }

    LOG(`พบเป้าหมาย drag-and-drop ${targets.length} ตัว`);

    for (const target of targets) {
        try {
            const rect = target.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const commonOpts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };

            // Create DataTransfer with our file
            const dt = new DataTransfer();
            dt.items.add(file);

            // Dispatch drag sequence: dragenter → dragover → drop
            target.dispatchEvent(new DragEvent('dragenter', { ...commonOpts, dataTransfer: dt }));
            await sleep(100);
            target.dispatchEvent(new DragEvent('dragover', { ...commonOpts, dataTransfer: dt }));
            await sleep(100);
            target.dispatchEvent(new DragEvent('drop', { ...commonOpts, dataTransfer: dt }));
            LOG(`ส่ง drag-and-drop บน <${target.tagName.toLowerCase()}> ที่ (${cx.toFixed(0)}, ${cy.toFixed(0)})`);

            await sleep(500);
            // Check if this worked immediately
            if (checkPromptBarThumbnail()) return true;
        } catch (err: any) {
            LOG(`drag-and-drop ผิดพลาด: ${err.message}`);
        }
    }

    return false;
}

/**
 * Paste an image file into the prompt bar via clipboard events.
 */
async function pasteImageIntoPromptBar(file: File): Promise<boolean> {
    LOG("ลองวางไฟล์ผ่านคลิปบอร์ด (clipboard paste)...");

    // Find the prompt bar text element
    const promptEl = findPromptTextInput();
    if (!promptEl) {
        LOG("ไม่พบช่อง prompt สำหรับวางไฟล์");
        return false;
    }

    try {
        promptEl.focus();
        await sleep(200);

        const dt = new DataTransfer();
        dt.items.add(file);

        const pasteEvent = new ClipboardEvent('paste', {
            bubbles: true,
            cancelable: true,
            clipboardData: dt,
        });
        promptEl.dispatchEvent(pasteEvent);
        LOG("ส่ง paste event พร้อมไฟล์รูปบน Prompt Bar แล้ว");
        return true;
    } catch (err: any) {
        LOG(`วางผ่านคลิปบอร์ดผิดพลาด: ${err.message}`);
        return false;
    }
}

/**
 * Upload a single image into the prompt bar.
 *
 * Key trick: NEUTRALIZE all file inputs (type="text") BEFORE clicking upload menu.
 * When Google Flow calls .click() on the input, it won't open the native dialog
 * because type="text" inputs don't trigger file chooser.
 * Then we restore type="file", inject our file, and dispatch change.
 * Fallbacks: drag-and-drop onto prompt bar, clipboard paste.
 */
async function uploadImageToPromptBar(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`── กำลังอัพโหลด ${fileName} ไปยัง Prompt Bar ──`);

    const file = base64ToFile(dataUrl, fileName);
    LOG(`ขนาดไฟล์: ${(file.size / 1024).toFixed(1)} KB`);

    // Find and click the "+" button
    const addBtn = findPromptBarAddButton();
    if (!addBtn) {
        WARN("ไม่พบปุ่ม '+' บน Prompt Bar");
        return false;
    }

    // ★ Snapshot existing file inputs BEFORE neutralization
    //   so restoreAndInject can prefer NEW inputs created during this upload
    const preExistingInputs = new Set(
        document.querySelectorAll<HTMLInputElement>('input[type="file"]')
    );
    LOG(`file input ที่มีอยู่เดิม: ${preExistingInputs.size} ตัว`);

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
                    LOG(`🎯 Observer ปิดกั้น file input ใหม่`);
                }
                if (node instanceof HTMLElement) {
                    const fis = node.querySelectorAll<HTMLInputElement>('input[type="file"]');
                    for (const fi of fis) {
                        fi.type = "text";
                        neutralized.push({ input: fi, origType: "file" });
                        LOG(`🎯 Observer ปิดกั้น file input ซ้อน`);
                    }
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    try {
        // Step 4: Click "+" to open menu (full event sequence for Mac React compatibility)
        await robustClick(addBtn);
        LOG("คลิกปุ่ม '+' แล้ว");
        await sleep(1500);

        // Step 5: Find and click upload menu option (poll up to 5s for menu to appear)
        LOG("กำลังค้นหาเมนูอัพโหลด...");
        let clickedMenu = false;
        const menuPollStart = Date.now();
        while (!clickedMenu && Date.now() - menuPollStart < 5000) {
            const menuElements = document.querySelectorAll<HTMLElement>(
                "button, [role='menuitem'], [role='option'], li, div[role='button']"
            );
            // Try icon-based detection first (works on both Mac English and Windows Thai)
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
                            LOG(`คลิกเมนูอัพโหลด (ไอคอน: ${it}) [${isMac ? 'Mac' : 'Win'}]`);
                            break;
                        }
                    }
                }
                if (clickedMenu) break;
            }
            // Text fallback: check button text (Thai + English variants)
            if (!clickedMenu) {
                for (const el of menuElements) {
                    if (el === addBtn) continue;
                    const directText = el.childNodes.length <= 5 ? (el.textContent || "").trim() : "";
                    if (directText.length > 0 && directText.length < 40) {
                        const lower = directText.toLowerCase();
                        if (lower === "upload" || lower === "อัปโหลด" || lower === "อัพโหลด"
                            || lower.includes("upload image") || lower.includes("upload photo")
                            || lower.includes("อัปโหลดรูปภาพ") || lower.includes("อัพโหลดรูปภาพ")
                            || lower.includes("from computer") || lower.includes("จากคอมพิวเตอร์")) {
                            await robustClick(el);
                            clickedMenu = true;
                            LOG(`คลิกเมนูอัพโหลด (ข้อความ: "${directText}") [${isMac ? 'Mac' : 'Win'}]`);
                            break;
                        }
                    }
                }
            }
            if (!clickedMenu) {
                await sleep(500);
            }
        }
        if (!clickedMenu) {
            LOG("⚠️ ไม่พบเมนูอัพโหลดหลังรอ 5 วินาที");
        }

        // Step 6: Wait a moment for Google Flow to call .click() (blocked by prototype override)
        await sleep(1000);

        // Step 7: Restore file inputs and inject our file (prefer NEW inputs over stale ones)
        const ok = restoreAndInject(neutralized, file, preExistingInputs);
        if (ok) {
            LOG(`✅ ฉีดไฟล์ ${fileName} สำเร็จ — ไม่มี dialog เปิด`);
            await sleep(2500);
            return true;
        }

        // ═══ Fallback: Drag-and-drop onto prompt bar (only if file input injection failed) ═══
        LOG(`⚠️ การฉีดไฟล์ล้มเหลว — ลองวิธี drag-and-drop`);
        const dropOk = await dropFileOnPromptBar(file);
        if (dropOk) {
            await sleep(2500);
            if (checkPromptBarThumbnail()) {
                LOG(`✅ ยืนยันรูปย่อผ่าน drag-and-drop!`);
                return true;
            }
        }

        // ═══ Fallback 2: Paste image via clipboard ═══
        const pasteOk = await pasteImageIntoPromptBar(file);
        if (pasteOk) {
            await sleep(2500);
            if (checkPromptBarThumbnail()) {
                LOG(`✅ ยืนยันรูปย่อผ่าน clipboard paste!`);
                return true;
            }
        }

        WARN(`การอัพโหลดล้มเหลวทุกวิธีสำหรับ ${fileName}`);
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
    theme?: string;                // UI theme key from sidepanel (e.g. "red", "blue", "green")
}

/**
 * Configure Flow settings: Image mode, orientation, count
 */
async function configureFlowSettings(orientation: string, outputCount: number): Promise<boolean> {
    LOG("=== ขั้น 0: ตั้งค่า Flow ===");

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
                LOG(`พบปุ่มตั้งค่าจากข้อความ: "${txt.substring(0, 30).trim()}"`);
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
                    LOG(`พบปุ่มตั้งค่าจากไอคอน: ${icon}`);
                    break;
                }
            }
            if (settingsBtn) break;
        }
    }

    if (!settingsBtn) {
        WARN("ไม่พบปุ่มตั้งค่า");
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
    LOG("คลิกปุ่มตั้งค่าแล้ว");
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
            LOG(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${ariaControls})`);
            break;
        }
    }

    // Strategy 2: role=tab with id containing trigger-IMAGE
    if (!imageTabBtn) {
        for (const btn of document.querySelectorAll<HTMLElement>('[role="tab"]')) {
            const btnId = btn.id || "";
            if (btnId.toUpperCase().includes("TRIGGER-IMAGE")) {
                imageTabBtn = btn;
                LOG(`พบแท็บ Image ผ่าน id: ${btnId}`);
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
                    LOG(`พบแท็บ Image ผ่านข้อความ: "${txt}"`);
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
            LOG("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");
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
            LOG("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว");
            await sleep(400);
        }
    }
    if (!selectedImage) LOG("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");

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
            LOG(`เลือกทิศทาง: ${orientationText}`);
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
            LOG(`เลือกจำนวน: ${countText}`);
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
    LOG("ปิดหน้าตั้งค่าแล้ว");
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

    // ── System Info Check ──
    const ua = navigator.userAgent;
    const chromeMatch = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    const chromeVer = chromeMatch ? chromeMatch[1] : "unknown";
    const osName = isMac ? "macOS" : isWindows ? "Windows" : /Linux/i.test(ua) ? "Linux" : /CrOS/i.test(ua) ? "ChromeOS" : "Unknown";
    const osDetail = isMac ? (ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, ".") || "") :
                     isWindows ? (ua.match(/Windows NT ([0-9.]+)/)?.[1] || "") : "";
    const lang = navigator.language || "unknown";
    const screen = `${window.innerWidth}x${window.innerHeight}`;
    LOG(`══════════════════════════════════════════`);
    LOG(`🖥️ ระบบ: ${osName} ${osDetail} | Chrome ${chromeVer}`);
    LOG(`🌐 ภาษา: ${lang} | หน้าจอ: ${screen} | แพลตฟอร์ม: ${platformTag}`);
    LOG(`══════════════════════════════════════════`);

    // ── Apply theme from sidepanel + Show Engine Overlay ──
    try { setOverlayTheme(req.theme); } catch (_) {}
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
        WARN(`ตั้งค่าผิดพลาด: ${e.message}`);
        steps.push("⚠️ Settings");
        updateStep("settings", "error");
    }

    // ── Step 1: Upload reference images ──
    LOG("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");

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
        LOG(`รอการอัพโหลด ${label} เสร็จ...`);
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
                    LOG(`✅ อัพโหลด ${label} — % ค้างที่ ${pct} นาน ${staleTimeout / 1000} วินาที ถือว่าเสร็จ`);
                    await sleep(1000);
                    return;
                }
                LOG(`กำลังอัพโหลด: ${pct} — รอ...`);
                await sleep(1500);
            } else {
                LOG(`✅ อัพโหลด ${label} เสร็จ — ไม่พบตัวบอก %`);
                await sleep(1000); // extra settle time after upload finishes
                return;
            }
        }
        WARN(`⚠️ อัพโหลด ${label} หมดเวลาหลัง ${timeout / 1000} วินาที — ดำเนินการต่อ`);
    };

    if (req.characterImage) {
        updateStep("upload-char", "active");
        try {
            const ok = await uploadImageToPromptBar(req.characterImage, "character.png");
            steps.push(ok ? "✅ ตัวละคร" : "⚠️ ตัวละคร");
            if (!ok) errors.push("character upload failed");
            updateStep("upload-char", ok ? "done" : "error");
        } catch (e: any) {
            WARN(`อัพโหลดตัวละครผิดพลาด: ${e.message}`);
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
            WARN(`อัพโหลดสินค้าผิดพลาด: ${e.message}`);
            steps.push("❌ สินค้า");
            errors.push("product upload error");
            updateStep("upload-prod", "error");
        }
        await waitForUploadsComplete("product");
    } else {
        skipStep("upload-prod");
    }

    // ── Step 1c: Close any open dialog/modal (Escape key) ──
    LOG("ปิด dialog ที่เปิดอยู่...");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(800);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(800);

    // ── Step 1d: Final check — make sure no uploads are still running ──
    const finalPct = isUploadInProgress();
    if (finalPct) {
        LOG(`⚠️ อัพโหลดยังแสดง ${finalPct} — รอเพิ่มเติม...`);
        await waitForUploadsComplete("final");
    }
    LOG("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt");
    await sleep(1000);

    // ── Step 1e: Verify reference thumbnails appeared in prompt bar ──
    const expectedThumbs = (req.characterImage ? 1 : 0) + (req.productImage ? 1 : 0);
    if (expectedThumbs > 0) {
        let thumbCount = countPromptBarThumbnails();
        if (thumbCount < expectedThumbs) {
            LOG(`⏳ เห็นรูปย่อแค่ ${thumbCount}/${expectedThumbs} — รอ 3 วินาที...`);
            await sleep(3000);
            thumbCount = countPromptBarThumbnails();
        }
        if (thumbCount >= expectedThumbs) {
            LOG(`✅ ยืนยันรูปย่ออ้างอิง: ${thumbCount}/${expectedThumbs}`);
        } else {
            WARN(`⚠️ คาดว่าจะมี ${expectedThumbs} รูปย่อ แต่พบ ${thumbCount} — ดำเนินการต่อ`);
        }
    }

    // ── Stop gate ──
    if (checkStop()) {
        LOG("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt");
        errors.push("stopped by user");
        try { completeOverlay(3000); } catch (_) {}
        return { success: false, message: "⛔ หยุดโดยผู้ใช้", step: "stopped" };
    }

    // ── Step 2: ALWAYS paste prompt (even if uploads failed) ──
    LOG("=== ขั้น 2: วาง Image Prompt ===");
    updateStep("img-prompt", "active");
    await sleep(1000);
    const promptInput = findPromptTextInput();
    if (promptInput) {
        await setPromptText(promptInput, req.imagePrompt);
        LOG(`วาง Prompt แล้ว (${req.imagePrompt.length} ตัวอักษร)`);
        steps.push("✅ Prompt");
        updateStep("img-prompt", "done");
    } else {
        WARN("ไม่พบช่องป้อนข้อความ Prompt");
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
    LOG(`บันทึกรูปเดิม: ${existingImageSrcs.size} รูปก่อน Generate`);

    // ── Step 3: ALWAYS click Generate → (even if some steps failed) ──
    LOG("=== ขั้น 3: คลิก Generate → ===");
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
        LOG("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว");
        steps.push("✅ Generate");

        // Safety: try again after 500ms if first didn't register
        await sleep(500);
        genBtn.dispatchEvent(new PointerEvent("pointerdown", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mousedown", evtOpts));
        await sleep(80);
        genBtn.dispatchEvent(new PointerEvent("pointerup", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mouseup", evtOpts));
        genBtn.dispatchEvent(new MouseEvent("click", evtOpts));
        LOG("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate");
        updateStep("img-generate", "done");
    } else {
        WARN("ไม่พบปุ่ม → Generate");
        steps.push("❌ Generate");
        errors.push("generate button not found");
        updateStep("img-generate", "error");
    }

    // ── Step 4: Wait for NEW image → hover → 3-dots → "ทำให้เป็นภาพเคลื่อนไหว" ──
    LOG("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ===");
    updateStep("img-wait", "active");
    try {
        // Step 4a: Wait minimum 15s for generation to start, then poll for NEW images
        LOG("รอ 15 วินาทีเพื่อเริ่มการสร้าง...");
        await sleep(15000);

        LOG("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");
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
                        LOG(`พบรูป AI จาก alt="${img.alt}": ${img.src.substring(0, 80)}...`);
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
                        LOG(`ข้ามรูปอ้างอิง (มีชื่อไฟล์): ${containerText.substring(0, 40)}`);
                        continue;
                    }

                    const rect = img.getBoundingClientRect();
                    if (rect.width > 120 && rect.height > 120 && rect.top > 0 && rect.top < window.innerHeight * 0.85) {
                        const parent = img.closest("div") as HTMLElement;
                        if (parent) {
                            generatedImg = parent;
                            LOG(`พบรูปใหม่ (สำรอง): ${img.src.substring(0, 80)}...`);
                            break;
                        }
                    }
                }
            }

            if (!generatedImg) {
                // Check for stop request
                if (checkStop()) {
                    LOG("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");
                    break;
                }
                // Check for generation failure (Thai + English)
                const failMsg = isGenerationFailed();
                if (failMsg) {
                    WARN(`❌ สร้างรูปล้มเหลว: ${failMsg}`);
                    errors.push(`image gen failed: ${failMsg}`);
                    updateStep("img-wait", "error");
                    break;
                }
                await sleep(5000);
                LOG("ยังรอรูปที่สร้างใหม่...");
            }
        }

        if (!generatedImg) {
            WARN("หมดเวลารอรูปที่สร้าง");
            steps.push("⚠️ Wait Image");
            updateStep("img-wait", "error");
        } else {
            LOG(`พบรูปที่สร้างแล้ว`);
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
            LOG("ส่งเหตุการณ์ hover บนรูปแล้ว");
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
                WARN("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง");
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
                LOG("คลิกปุ่ม 3 จุดแล้ว");
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
                    WARN("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'");
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
                    LOG("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว");
                    steps.push("✅ Animate");
                    updateStep("animate", "done");
                    await sleep(3000);
                }
            }
        }
    } catch (e: any) {
        WARN(`ขั้น 4 ผิดพลาด: ${e.message}`);
        steps.push("⚠️ Animate");
    }

    // ── Stop gate ──
    if (checkStop()) {
        LOG("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ");
        errors.push("stopped by user");
        try { completeOverlay(3000); } catch (_) {}
        return { success: false, message: "⛔ หยุดโดยผู้ใช้", step: "stopped" };
    }

    // ── Step 5: Paste video prompt + Generate video ──
    if (req.videoPrompt) {
        LOG("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ===");
        updateStep("vid-prompt", "active");
        try {
            // Wait for video mode UI to load (image becomes thumbnail in prompt bar)
            LOG("รอ UI โหมดวิดีโอ...");
            await sleep(3000);

            // Verify we're in video mode — look for "วิดีโอ" or "Video" indicator
            let inVideoMode = false;
            const allElements = document.querySelectorAll<HTMLElement>("button, span, div");
            for (const el of allElements) {
                const txt = (el.textContent || "").trim();
                const rect = el.getBoundingClientRect();
                if ((txt === "วิดีโอ" || txt === "Video" || txt.includes("วิดีโอ")) && rect.bottom > window.innerHeight * 0.7) {
                    inVideoMode = true;
                    LOG("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");
                    break;
                }
            }
            if (!inVideoMode) {
                LOG("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");
            }

            // Find prompt input and paste video prompt
            await sleep(1000);
            const videoPromptInput = findPromptTextInput();
            if (videoPromptInput) {
                await setPromptText(videoPromptInput, req.videoPrompt);
                LOG(`วาง Video Prompt แล้ว (${req.videoPrompt.length} ตัวอักษร)`);
                steps.push("✅ Video Prompt");
                updateStep("vid-prompt", "done");
            } else {
                WARN("ไม่พบช่อง Prompt สำหรับ Video Prompt");
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
                LOG("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!");
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
                LOG("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ");
            } else {
                WARN("ไม่พบปุ่ม Generate สำหรับวิดีโอ");
                steps.push("❌ Video Generate");
                errors.push("video generate button not found");
                updateStep("vid-generate", "error");
            }
        } catch (e: any) {
            WARN(`ขั้น 5 ผิดพลาด: ${e.message}`);
            steps.push("⚠️ Video Gen");
            errors.push(`video gen error: ${e.message}`);
        }
    } else {
        LOG("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ");
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

        LOG(`=== ขั้น 6: รอวิดีโอ + ${totalScenes > 1 ? `ต่อ ${totalScenes} ฉาก` : 'ดาวน์โหลด'} ===`);

        // ── Shared: Scan for "X%" by querying ALL elements directly ──
        const overlayEl = document.getElementById("netflow-engine-overlay");
        const scanForPct = (): number | null => {
            const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
            for (const el of els) {
                // Skip elements inside our own overlay (they echo the % back, causing feedback loop)
                if (overlayEl && overlayEl.contains(el)) continue;
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
            LOG("รอการสร้างวิดีโอ...");
            updateStep("vid-wait", "active");
            await sleep(5000);

            // ── Debug: dump all elements containing "%" text ──
            const debugDumpPct = () => {
                const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
                let count = 0;
                for (const el of els) {
                    if (overlayEl && overlayEl.contains(el)) continue;
                    const txt = (el.textContent || "").trim();
                    if (txt.includes("%") && txt.length < 15) {
                        const tag = el.tagName.toLowerCase();
                        const cls = el.className && typeof el.className === "string"
                            ? el.className.split(/\s+/).slice(0, 2).join(" ")
                            : "";
                        const rect = el.getBoundingClientRect();
                        LOG(`  🔍 "${txt}" ใน <${tag}.${cls}> ที่ (${rect.left.toFixed(0)},${rect.top.toFixed(0)}) w=${rect.width.toFixed(0)}`);
                        count++;
                        if (count >= 5) break;
                    }
                }
                if (count === 0) LOG("  🔍 ไม่พบ element ที่มีข้อความ '%'");
            };

            // Debug: scan for existing cards at start
            const earlyVideoCard = findFirstVideoCard();
            if (earlyVideoCard) {
                LOG(`📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม`);
            } else {
                LOG("⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %");
            }

            // Debug: dump % text once
            LOG("🔍 สแกนข้อความ % เพื่อตรวจสอบ:");
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
                        LOG(`ความคืบหน้าวิดีโอ: ${pct}%`);
                        lastPct = pct;
                        updateStep("vid-wait", "active", pct);
                    }
                    lastPctTime = Date.now();
                    if (pct >= 100) {
                        LOG("✅ ตรวจพบ 100%!");
                        completed = true;
                        break;
                    }
                } else if (lastPct > 30) {
                    // % disappeared = video generation finished
                    const lostFor = Math.floor((Date.now() - lastPctTime) / 1000);
                    if (lostFor >= 5) {
                        LOG(`✅ % หายไปที่ ${lastPct}% (หาย ${lostFor} วินาที) — วิดีโอเสร็จ!`);
                        completed = true;
                        break;
                    }
                    LOG(`⏳ % หายที่ ${lastPct}% — ยืนยันใน ${5 - lostFor} วินาที...`);
                } else {
                    const elapsed = Math.floor((Date.now() - start) / 1000);
                    if (elapsed % 15 < 3) {
                        LOG(`⏳ รอ... (${elapsed} วินาที) ไม่พบ %`);
                    }
                }

                // Secondary completion signal: if a video card appeared, video is done
                if (!completed && lastPct > 0) {
                    const newCard = findFirstVideoCard();
                    if (newCard && !earlyVideoCard) {
                        LOG(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${lastPct}% — วิดีโอเสร็จ!`);
                        completed = true;
                        break;
                    }
                }

                // Stop + failure checks inside video wait loop
                if (checkStop()) {
                    LOG("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ");
                    return null;
                }
                if (lastPct < 1) {
                    const failMsg = isGenerationFailed();
                    if (failMsg) {
                        WARN(`❌ สร้างวิดีโอล้มเหลว: ${failMsg}`);
                        return null;
                    }
                }
                await sleep(3000);
            }

            // Now find the VIDEO card to click — using <i>videocam</i> icon (screen-size independent)
            const videoCard = findFirstVideoCard();
            if (!videoCard) {
                LOG("❌ ไม่พบการ์ดวิดีโอที่จะคลิก");
                updateStep("vid-wait", "error");
                return null;
            }

            const el = videoCard;
            if (completed) {
                updateStep("vid-wait", "done", 100);
                LOG("รอ 4 วินาทีก่อนคลิก...");
                await sleep(4000);
            } else {
                LOG("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");
            }

            // Find the actual visual element inside the card for precise clicking
            const cardRect = el.getBoundingClientRect();
            let cx = cardRect.left + cardRect.width / 2;
            let cy = cardRect.top + cardRect.height / 2;
            let clickTarget: HTMLElement = el;

            // Look for actual thumbnail element (video/img/canvas) inside the card
            const thumb = el.querySelector("video, img, canvas") as HTMLElement | null;
            if (thumb) {
                const tr = thumb.getBoundingClientRect();
                if (tr.width > 50 && tr.height > 50) {
                    cx = tr.left + tr.width / 2;
                    cy = tr.top + tr.height / 2;
                    clickTarget = thumb;
                    LOG(`🎯 พบรูปย่อ <${thumb.tagName.toLowerCase()}> ในการ์ดที่ (${cx.toFixed(0)},${cy.toFixed(0)}) ${tr.width.toFixed(0)}x${tr.height.toFixed(0)}`);
                }
            } else {
                // No visual child — click top 1/3 of card where thumbnail typically is
                cy = cardRect.top + cardRect.height * 0.3;
                LOG(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${cx.toFixed(0)},${cy.toFixed(0)})`);
            }

            // Hover 4s (with PointerEvents for Mac Radix UI compatibility)
            LOG(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${cx.toFixed(0)}, ${cy.toFixed(0)})...`);
            robustHover(clickTarget);
            for (let t = 0; t < 8; t++) {
                const moveOpts = { bubbles: true, cancelable: true, clientX: cx + (t % 2), clientY: cy };
                clickTarget.dispatchEvent(new PointerEvent("pointermove", { ...moveOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                clickTarget.dispatchEvent(new MouseEvent("mousemove", moveOpts));
                await sleep(500);
            }

            // Click 2 times with full pointer event sequence (cross-platform)
            LOG("คลิกการ์ดวิดีโอ...");
            for (let i = 0; i < 2; i++) {
                const target = document.elementFromPoint(cx, cy) as HTMLElement | null;
                if (target) await robustClick(target); else await robustClick(clickTarget);
                await sleep(300);
            }
            LOG("✅ คลิกการ์ดวิดีโอเสร็จ");
            return el;
        };

        /**
         * Wait for scene N video progress in detail view (% tracking only, no clicking).
         */
        const waitForSceneProgress = async (sceneNum: number, timeoutMs = 600000): Promise<boolean> => {
            LOG(`รอการสร้างวิดีโอฉาก ${sceneNum}...`);
            await sleep(5000);

            const start = Date.now();
            let lastPct = -1;
            let lastPctTime = 0;

            while (Date.now() - start < timeoutMs) {
                const pct = scanForPct();
                if (pct !== null) {
                    if (pct !== lastPct) {
                        LOG(`ความคืบหน้าฉาก ${sceneNum}: ${pct}%`);
                        lastPct = pct;
                    }
                    lastPctTime = Date.now();
                    if (pct >= 100) {
                        LOG(`✅ ฉาก ${sceneNum} — 100%!`);
                        return true;
                    }
                } else if (lastPct > 30) {
                    const lostFor = Math.floor((Date.now() - lastPctTime) / 1000);
                    if (lostFor >= 5) {
                        LOG(`✅ ฉาก ${sceneNum} — % หายที่ ${lastPct}% (${lostFor} วินาที) — เสร็จ!`);
                        return true;
                    }
                    LOG(`⏳ ฉาก ${sceneNum} % หายที่ ${lastPct}% — ยืนยันใน ${5 - lostFor} วินาที...`);
                } else {
                    const elapsed = Math.floor((Date.now() - start) / 1000);
                    if (elapsed % 15 < 3) {
                        LOG(`⏳ ฉาก ${sceneNum} รอ... (${elapsed} วินาที)`);
                    }
                }
                // Stop + failure checks inside scene wait loop
                if (checkStop()) {
                    LOG(`⛔ ผู้ใช้สั่งหยุดระหว่างรอฉาก ${sceneNum}`);
                    return false;
                }
                if (lastPct < 1) {
                    const failMsg = isGenerationFailed();
                    if (failMsg) {
                        WARN(`❌ สร้างฉาก ${sceneNum} ล้มเหลว: ${failMsg}`);
                        return false;
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
            await sleep(50); card.click();
            LOG("คลิกการ์ดวิดีโอแล้ว");
            await sleep(2000);
        };

        /**
         * Shared download flow: ดาวน์โหลด → 1080p → wait upscale → open in Chrome
         */
        const performDownloadAndOpen = async () => {
            // Find ดาวน์โหลด / Download button
            let dlBtn: HTMLElement | null = null;
            const allBtns = document.querySelectorAll<HTMLElement>("button");
            for (const btn of allBtns) {
                const txt = (btn.textContent || "").trim();
                if (txt.includes("ดาวน์โหลด") || txt.toLowerCase().includes("download")) {
                    dlBtn = btn;
                    LOG(`พบปุ่มดาวน์โหลดจากข้อความ: "${txt}"`);
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
                            LOG("พบปุ่มดาวน์โหลดจากตำแหน่ง+ข้อความ");
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
                            LOG("พบปุ่มดาวน์โหลดผ่าน button-overlay parent");
                            break;
                        }
                    }
                }
            }

            if (!dlBtn) {
                WARN("ไม่พบปุ่มดาวน์โหลดในหน้ารายละเอียด");
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
            await sleep(50); dlBtn.click();
            LOG("คลิกปุ่มดาวน์โหลดแล้ว");
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
                await sleep(50); el.click();
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
            let fullVideoBtn: HTMLElement | null = null;
            const fullVideoKeywords = ["Full Video", "วิดีโอเต็ม", "ฉบับเต็ม", "คลิปเต็ม", "ทั้งหมด"];
            for (const kw of fullVideoKeywords) {
                fullVideoBtn = findMenuItem(kw);
                if (fullVideoBtn) break;
            }

            if (fullVideoBtn) {
                // ── Multi-scene: hover Full Video → submenu → click 720p ──
                LOG("พบเมนูหลายฉาก — ชี้ไปที่ Full Video...");
                await hoverEl(fullVideoBtn);
                await sleep(500);
                await clickEl(fullVideoBtn);
                LOG("คลิก Full Video แล้ว");
                steps.push("✅ Full Video");
                await sleep(1500);

                // Wait for 720p submenu to appear (poll up to 5s)
                let res720: HTMLElement | null = null;
                const subStart = Date.now();
                while (Date.now() - subStart < 5000) {
                    res720 = findMenuItem("720p");
                    if (res720) break;
                    LOG("รอเมนูย่อย 720p...");
                    await sleep(500);
                }
                if (!res720) {
                    WARN("ไม่พบตัวเลือก 720p ในเมนูย่อย");
                    steps.push("⚠️ 720p");
                    return;
                }
                await clickEl(res720);
                LOG("คลิก 720p — เริ่มดาวน์โหลด");
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
                    WARN("ไม่พบตัวเลือก 1080p");
                    steps.push("⚠️ 1080p");
                    return;
                }
                await clickEl(res1080);
                LOG("คลิก 1080p — เริ่มดาวน์โหลด");
                steps.push("✅ 1080p");
                updateStep("upscale", "active");
            }

            // Wait for download to complete
            // Detection: (A) explicit completion text, (B) "Upscaling/Downloading" text disappears,
            //            (C) element-level scan, (D) broad completion keywords
            LOG("รอการดาวน์โหลดเสร็จ...");
            const upStart = Date.now();
            let downloadDone = false;
            let sawProcessing = false;      // seen "Upscaling your video" or "Downloading"
            let processingGoneAt = 0;       // timestamp when processing text first disappeared
            const GONE_CONFIRM = 8000;      // confirm disappearance for 8s
            while (Date.now() - upStart < 300000) {
                const bodyText = (document.body.innerText || "") + " " + (document.body.textContent || "");
                const lower = bodyText.toLowerCase();
                // (A) Explicit completion text (English + Thai)
                if (lower.includes("download complete") || lower.includes("upscaling complete")
                    || lower.includes("upscale complete") || lower.includes("scaling complete")
                    || lower.includes("video is ready") || lower.includes("video ready")
                    || lower.includes("อัปสเกลเสร็จ") || lower.includes("ดาวน์โหลดเสร็จ")
                    || lower.includes("วิดีโอพร้อม")) {
                    const label = lower.includes("download") ? "Downloaded" : "Upscaled";
                    LOG(`✅ ${label}! (จับคู่ข้อความ)`);
                    steps.push(`✅ ${label}`);
                    updateStep("upscale", "done", 100);
                    downloadDone = true;
                    break;
                }
                // (C) Element-level scan
                const allEls = document.querySelectorAll<HTMLElement>("div, span, p, h1, h2, h3");
                for (const el of allEls) {
                    const t = (el.textContent || "").trim().toLowerCase();
                    if (t.length < 60 && (t.includes("upscaling complete") || t.includes("upscale complete")
                        || t.includes("scaling complete") || t.includes("download complete")
                        || t.includes("video is ready") || t.includes("อัปสเกลเสร็จ")
                        || t.includes("ดาวน์โหลดเสร็จ") || t.includes("วิดีโอพร้อม"))) {
                        LOG(`✅ เสร็จ! (element: "${el.textContent?.trim()}")`);
                        steps.push("✅ Upscaled");
                        updateStep("upscale", "done", 100);
                        downloadDone = true;
                        break;
                    }
                }
                if (downloadDone) break;
                // Track processing text presence
                const isProcessing = lower.includes("upscaling your video") || lower.includes("upscaling video")
                    || lower.includes("downloading your extended video") || lower.includes("downloading video")
                    || lower.includes("กำลังอัปสเกล") || lower.includes("กำลังดาวน์โหลด");
                if (isProcessing) {
                    sawProcessing = true;
                    processingGoneAt = 0;
                    const elapsed = Math.floor((Date.now() - upStart) / 1000);
                    if (lower.includes("downloading")) {
                        LOG(`⏳ กำลังดาวน์โหลดวิดีโอ... (${elapsed} วินาที)`);
                    } else {
                        LOG(`⏳ กำลังอัปสเกล... (${elapsed} วินาที)`);
                    }
                } else if (sawProcessing) {
                    // (B) Processing text disappeared → likely done
                    if (processingGoneAt === 0) {
                        processingGoneAt = Date.now();
                        LOG("🔍 ข้อความประมวลผลหายไป — กำลังยืนยัน...");
                    } else if (Date.now() - processingGoneAt >= GONE_CONFIRM) {
                        LOG(`✅ ข้อความประมวลผลหายไป ${GONE_CONFIRM / 1000} วินาที — เสร็จ!`);
                        steps.push("✅ Upscaled");
                        updateStep("upscale", "done", 100);
                        downloadDone = true;
                        break;
                    } else {
                        const remaining = Math.ceil((GONE_CONFIRM - (Date.now() - processingGoneAt)) / 1000);
                        LOG(`🔍 กำลังยืนยัน... (อีก ${remaining} วินาที)`);
                    }
                } else {
                    const elapsed = Math.floor((Date.now() - upStart) / 1000);
                    LOG(`⏳ รอ... (${elapsed} วินาที)`);
                }
                // Stop check inside download/upscale wait loop
                if (checkStop()) {
                    LOG("⛔ ผู้ใช้สั่งหยุดระหว่างรอดาวน์โหลด");
                    steps.push("⛔ Stopped");
                    updateStep("upscale", "error");
                    return;
                }
                await sleep(2000);
            }

            if (!downloadDone) {
                WARN("ดาวน์โหลดหมดเวลา — ไฟล์อาจยังดาวน์โหลดอยู่");
                steps.push("⚠️ Download timeout");
                updateStep("upscale", "error");
                return;
            }

            // Open file in Chrome
            updateStep("open", "active");
            LOG("รอไฟล์ดาวน์โหลดพร้อม...");
            await sleep(5000);
            let opened = false;
            const dlPollStart = Date.now();
            while (Date.now() - dlPollStart < 60000 && !opened) {
                try {
                    await new Promise<void>((resolve) => {
                        chrome.runtime.sendMessage({ action: "OPEN_LATEST_VIDEO" }, (res) => {
                            if (chrome.runtime.lastError) {
                                WARN(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`);
                            } else if (res?.success) {
                                LOG(`✅ เปิดวิดีโอแล้ว: ${res.message}`);
                                steps.push("✅ Opened");
                                updateStep("open", "done");
                                opened = true;
                            } else {
                                LOG(`ดาวน์โหลดยังไม่พร้อม: ${res?.message}`);
                            }
                            resolve();
                        });
                    });
                } catch (e: any) {
                    WARN(`ตรวจสอบผิดพลาด: ${e.message}`);
                }
                if (!opened) await sleep(3000);
            }
            if (!opened) {
                WARN("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");
                steps.push("⚠️ Open");
            }
        };

        try {
            // Wait for the first video to complete
            const videoCard = await waitForVideoComplete();
            if (!videoCard) {
                WARN("หมดเวลารอการสร้างวิดีโอ");
                steps.push("⚠️ Video Wait");
                updateStep("vid-wait", "error");
            } else {
                steps.push("✅ Video Complete");
                updateStep("vid-wait", "done", 100);
                updateStep("download", "active");

                if (totalScenes <= 1) {
                    // ── Single scene: hover+click already done in waitForVideoComplete ──
                    LOG("ฉากเดียว — รอ 3 วินาทีเพื่อโหลดหน้ารายละเอียด...");
                    steps.push("✅ Clicked");
                    await sleep(3000);

                    // Download: ดาวน์โหลด → 1080p → upscale → open in Chrome
                    await performDownloadAndOpen();
                } else {
                    // ── Multi-scene: paste next scene prompt → generate → track % → repeat ──
                    LOG(`โหมดหลายฉาก: ${totalScenes} ฉาก`);

                    for (let sceneIdx = 1; sceneIdx < totalScenes; sceneIdx++) {
                        const scenePrompt = scenePrompts[sceneIdx];
                        if (!scenePrompt) {
                            LOG(`ไม่มี Prompt สำหรับฉาก ${sceneIdx + 1} — ข้าม`);
                            continue;
                        }

                        // Stop check at top of each scene iteration
                        if (checkStop()) {
                            LOG(`⛔ ผู้ใช้สั่งหยุดก่อนฉาก ${sceneIdx + 1}`);
                            errors.push("stopped by user");
                            break;
                        }

                        const sn = sceneIdx + 1; // scene number (2, 3, ...)
                        LOG(`--- ฉาก ${sn}/${totalScenes} ---`);
                        await sleep(2000);

                        // Already in detail view — "ขยาย" is selected, paste prompt
                        updateStep(`scene${sn}-prompt`, "active");
                        const detailPromptInput = findPromptTextInput();
                        if (detailPromptInput) {
                            await setPromptText(detailPromptInput, scenePrompt);
                            LOG(`วาง Prompt ฉาก ${sn} แล้ว (${scenePrompt.length} ตัวอักษร)`);
                            steps.push(`✅ Scene${sn} Prompt`);
                            updateStep(`scene${sn}-prompt`, "done");
                        } else {
                            WARN(`ไม่พบช่อง Prompt สำหรับฉาก ${sn}`);
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
                            LOG(`คลิก Generate สำหรับฉาก ${sn} แล้ว`);
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
                            WARN(`ไม่พบปุ่ม Generate สำหรับฉาก ${sn}`);
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
                            WARN(`ฉาก ${sn} หมดเวลา`);
                            steps.push(`⚠️ Scene${sn}`);
                            updateStep(`scene${sn}-wait`, "error");
                        }
                    }

                    LOG("สร้างครบทุกฉากแล้ว!");
                    steps.push("✅ All Scenes");

                    // Download after all scenes
                    await sleep(3000);
                    await performDownloadAndOpen();
                }
            }
        } catch (e: any) {
            WARN(`ขั้น 6 ผิดพลาด: ${e.message}`);
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
        LOG("ได้รับคำสั่ง GENERATE_IMAGE");
        // Respond immediately to prevent MV3 service-worker message-channel timeout
        sendResponse({ success: true, message: "⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow", step: "started" });
        // Fire-and-forget: run the long automation in the background
        handleGenerateImage(message as GenerateImageRequest)
            .then(result => LOG(`✅ ระบบอัตโนมัติเสร็จ: ${result.message}`))
            .catch(err => console.error("[Netflow AI] Generate error:", err));
        return false;
    }

    if (message?.action === "STOP_AUTOMATION") {
        LOG("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด");
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
            LOG("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>...");
            await sleep(500);

            // Element-based detection: find card with <i>image</i> icon (works on any screen size)
            const imageCard = findFirstImageCard();
            if (!imageCard) {
                WARN("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");
                return;
            }

            const r = imageCard.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            LOG(`การ์ดรูปที่ (${cx.toFixed(0)}, ${cy.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} — คลิก 2 ครั้ง`);

            for (let i = 0; i < 2; i++) {
                const target = document.elementFromPoint(cx, cy) as HTMLElement | null;
                if (target) {
                    await robustClick(target);
                    LOG(`คลิก ${i + 1}/2 บน <${target.tagName.toLowerCase()}>`);
                } else {
                    await robustClick(imageCard);
                    LOG(`คลิก ${i + 1}/2 บนการ์ด (สำรอง)`);
                }
                await sleep(300);
            }
            LOG("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ");
        })();
        return false;
    }
});

LOG("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง");


document.addEventListener("dblclick", (e) => {
    const t = e.target as HTMLElement | null;
    if (!t) return;
    const tag = t.tagName.toLowerCase();
    const x = Math.round(e.clientX), y = Math.round(e.clientY);
    const txt = (t.textContent || "").trim().slice(0, 30);
    LOG(`🖱️🖱️ ดับเบิลคลิก (${x},${y}) → <${tag}> "${txt}"`);
}, true);
