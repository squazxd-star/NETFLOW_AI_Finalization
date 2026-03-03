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

const LOG = (msg: string) => console.log(`[Netflow AI] ${msg}`);
const WARN = (msg: string) => console.warn(`[Netflow AI] ${msg}`);

LOG("Content script loaded on Google Flow page");

// ─── Helpers ────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

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

/** Remove all existing file inputs from the DOM (cleanup for fresh upload) */
function removeAllFileInputs() {
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    inputs.forEach(inp => inp.remove());
    LOG(`Removed ${inputs.length} stale file inputs`);
}

/** Wait for a NEW file input to appear (that didn't exist before) */
async function waitForNewFileInput(knownInputs: Set<HTMLInputElement>, timeoutMs = 8000): Promise<HTMLInputElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
        for (const inp of inputs) {
            if (!knownInputs.has(inp)) {
                LOG("Found new file input element");
                return inp;
            }
        }
        await sleep(300);
    }
    // Fallback: return the last one if any
    const all = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    return all.length > 0 ? all[all.length - 1] : null;
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
 * Set text into prompt input using methods that React/framework state recognizes.
 * Priority: execCommand > clipboard paste > native setter fallback
 */
async function setPromptText(el: HTMLElement, text: string) {
    el.focus();
    await sleep(200);

    // Select all existing text first
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        el.select();
    } else {
        // contenteditable: select all
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(el);
        sel?.removeAllRanges();
        sel?.addRange(range);
    }
    await sleep(100);

    // Strategy 1: execCommand('insertText') — works with most React apps
    const execOk = document.execCommand('insertText', false, text);
    if (execOk) {
        LOG("setPromptText: execCommand('insertText') succeeded");
        return;
    }

    // Strategy 2: Clipboard paste simulation
    LOG("setPromptText: execCommand failed, trying clipboard paste");
    try {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', text);
        const pasteEvent = new ClipboardEvent('paste', {
            bubbles: true,
            cancelable: true,
            clipboardData: clipboardData
        });
        el.dispatchEvent(pasteEvent);

        // Check if it worked
        await sleep(200);
        const currentVal = el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement
            ? el.value
            : el.textContent || "";
        if (currentVal.includes(text.substring(0, 20))) {
            LOG("setPromptText: clipboard paste succeeded");
            return;
        }
    } catch (e) {
        LOG("setPromptText: clipboard paste failed");
    }

    // Strategy 3: Native setter + InputEvent (last resort)
    LOG("setPromptText: using native setter fallback");
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
        if (nativeSetter) {
            nativeSetter.call(el, text);
        } else {
            el.value = text;
        }
        el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
        el.textContent = text;
        el.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: text }));
    }
}

// ─── Upload Image into Prompt Bar ───────────────────────────────────────────

/** Count how many image thumbnails are currently visible in the prompt area */
function countPromptThumbnails(): number {
    // Look for small images/thumbnails near the bottom of the page (prompt bar area)
    let count = 0;
    const imgs = document.querySelectorAll<HTMLImageElement>("img");
    for (const img of imgs) {
        const rect = img.getBoundingClientRect();
        // Thumbnails in prompt bar: near bottom, small-ish
        if (rect.bottom > window.innerHeight * 0.5 && rect.width > 20 && rect.width < 300 && rect.height > 20) {
            count++;
        }
    }
    return count;
}

/**
 * Upload a single image into the prompt bar using multiple strategies:
 *  1. Clipboard paste (Ctrl+V simulation) — most reliable for React apps
 *  2. Drag-and-drop simulation onto prompt area
 *  3. File input injection via "+" button (fallback)
 */
async function uploadImageToPromptBar(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`── Uploading ${fileName} into prompt bar ──`);

    const file = base64ToFile(dataUrl, fileName);
    LOG(`File size: ${(file.size / 1024).toFixed(1)} KB`);

    const thumbsBefore = countPromptThumbnails();
    LOG(`Thumbnails before: ${thumbsBefore}`);

    // Find the prompt input area as drop/paste target
    const promptInput = findPromptTextInput();
    const promptBar = promptInput?.closest('[class*="prompt"], [class*="input"], [class*="composer"]') as HTMLElement
        || promptInput?.parentElement?.parentElement as HTMLElement
        || document.querySelector('[class*="prompt-bar"], [class*="composer"]') as HTMLElement;

    const pasteTarget = promptInput || promptBar || document.body;

    // ═══ Strategy 1: Clipboard paste (Ctrl+V) ═══
    LOG("Strategy 1: Clipboard paste simulation");
    try {
        pasteTarget.focus();
        await sleep(200);

        const dt = new DataTransfer();
        dt.items.add(file);

        const pasteEvent = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: dt
        });
        pasteTarget.dispatchEvent(pasteEvent);
        LOG("Dispatched paste event on prompt target");
        await sleep(3000);

        if (countPromptThumbnails() > thumbsBefore) {
            LOG(`✅ Strategy 1 (paste) succeeded for ${fileName}`);
            return true;
        }
        LOG("Strategy 1: no new thumbnail detected");
    } catch (e: any) {
        LOG(`Strategy 1 failed: ${e.message}`);
    }

    // ═══ Strategy 2: Drag-and-drop simulation ═══
    LOG("Strategy 2: Drag-and-drop simulation");
    try {
        const dropTarget = promptBar || pasteTarget;
        const rect = dropTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        const dtDrag = new DataTransfer();
        dtDrag.items.add(file);

        // dragenter → dragover → drop
        dropTarget.dispatchEvent(new DragEvent("dragenter", { bubbles: true, cancelable: true, dataTransfer: dtDrag, clientX: cx, clientY: cy }));
        await sleep(100);
        dropTarget.dispatchEvent(new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer: dtDrag, clientX: cx, clientY: cy }));
        await sleep(100);
        dropTarget.dispatchEvent(new DragEvent("drop", { bubbles: true, cancelable: true, dataTransfer: dtDrag, clientX: cx, clientY: cy }));
        LOG("Dispatched drag-and-drop events");
        await sleep(3000);

        if (countPromptThumbnails() > thumbsBefore) {
            LOG(`✅ Strategy 2 (drop) succeeded for ${fileName}`);
            return true;
        }
        LOG("Strategy 2: no new thumbnail detected");
    } catch (e: any) {
        LOG(`Strategy 2 failed: ${e.message}`);
    }

    // ═══ Strategy 3: Click "+" → file input injection ═══
    LOG("Strategy 3: Click '+' → file input injection");
    try {
        const existingInputs = new Set(document.querySelectorAll<HTMLInputElement>('input[type="file"]'));
        const addBtn = findPromptBarAddButton();
        if (addBtn) {
            addBtn.click();
            LOG("Clicked '+' button");
            await sleep(1200);

            // Look for upload menu option
            const menuElements = document.querySelectorAll<HTMLElement>(
                "button, [role='menuitem'], [role='option'], li"
            );
            for (const el of menuElements) {
                if (el === addBtn) continue;
                const icons = el.querySelectorAll("i");
                let found = false;
                for (const icon of icons) {
                    const it = icon.textContent?.trim() || "";
                    if (it === "upload" || it === "upload_file" || it === "cloud_upload") {
                        el.click();
                        found = true;
                        LOG(`Clicked upload menu (icon: ${it})`);
                        break;
                    }
                }
                if (found) break;
                const txt = (el.textContent || "").trim().toLowerCase();
                if (txt.includes("upload") || txt.includes("อัปโหลด") || txt.includes("อัพโหลด")) {
                    el.click();
                    LOG(`Clicked upload menu (text: "${txt.substring(0, 30)}")`);
                    break;
                }
            }
            await sleep(1000);

            // Find file input (new or existing)
            const fileInput = await waitForNewFileInput(existingInputs, 8000);
            if (fileInput) {
                setFileInput(fileInput, file);
                LOG(`Injected file into input`);
                await sleep(3000);

                if (countPromptThumbnails() > thumbsBefore) {
                    LOG(`✅ Strategy 3 (file input) succeeded for ${fileName}`);
                    return true;
                }
            } else {
                LOG("No file input found");
            }
        } else {
            LOG("No '+' button found");
        }
    } catch (e: any) {
        LOG(`Strategy 3 failed: ${e.message}`);
    }

    WARN(`All 3 strategies failed for ${fileName}`);
    return false;
}

// ─── GENERATE_IMAGE handler ─────────────────────────────────────────────────

interface GenerateImageRequest {
    action: "GENERATE_IMAGE";
    imagePrompt: string;
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

    const allBtns = document.querySelectorAll<HTMLElement>("button");
    let settingsBtn: HTMLElement | null = null;
    for (const btn of allBtns) {
        const txt = btn.textContent || "";
        if (txt.includes("Nano Banana") || txt.includes("Imagen")) {
            settingsBtn = btn;
            break;
        }
    }

    if (!settingsBtn) {
        const cropBtns = findAllButtonsByIcon("crop_16_9");
        if (cropBtns.length > 0) settingsBtn = cropBtns[cropBtns.length - 1];
    }
    if (!settingsBtn) {
        // Try crop_portrait or crop_landscape icons
        for (const icon of ["crop_portrait", "crop_landscape", "crop_3_2", "crop_5_4"]) {
            const btns = findAllButtonsByIcon(icon);
            if (btns.length > 0) { settingsBtn = btns[btns.length - 1]; break; }
        }
    }

    if (!settingsBtn) {
        WARN("Could not find settings button");
        return false;
    }

    settingsBtn.click();
    LOG("Clicked settings button");
    await sleep(1000);

    // Select Image mode
    for (const btn of document.querySelectorAll<HTMLElement>("button")) {
        const txt = (btn.textContent || "").trim();
        if (txt === "Image" || txt === "รูปภาพ") {
            btn.click();
            LOG("Selected Image mode");
            await sleep(400);
            break;
        }
    }

    // Select orientation
    const orientationText = orientation === "horizontal" ? "แนวนอน" : "แนวตั้ง";
    for (const btn of document.querySelectorAll<HTMLElement>("button")) {
        const txt = (btn.textContent || "").trim();
        if (txt === orientationText || txt.toLowerCase() === (orientation === "horizontal" ? "landscape" : "portrait")) {
            btn.click();
            LOG(`Selected orientation: ${orientationText}`);
            await sleep(400);
            break;
        }
    }

    // Select count
    const countText = `x${outputCount}`;
    for (const btn of document.querySelectorAll<HTMLElement>("button")) {
        const txt = (btn.textContent || "").trim();
        if (txt === countText) {
            btn.click();
            LOG(`Selected count: ${countText}`);
            await sleep(400);
            break;
        }
    }

    // Close settings
    await sleep(300);
    settingsBtn.click();
    LOG("Closed settings panel");
    await sleep(600);

    return true;
}

/**
 * Main handler: configure → upload images → paste prompt → click generate
 * IMPORTANT: Never abort early — always try to paste prompt and click generate
 */
async function handleGenerateImage(req: GenerateImageRequest): Promise<{ success: boolean; message: string; step: string }> {
    const steps: string[] = [];
    const errors: string[] = [];

    // ── Step 0: Configure settings ──
    try {
        const orientation = req.orientation || "horizontal";
        const outputCount = req.outputCount || 1;
        const ok = await configureFlowSettings(orientation, outputCount);
        steps.push(ok ? "✅ Settings" : "⚠️ Settings");
    } catch (e: any) {
        WARN(`Settings error: ${e.message}`);
        steps.push("⚠️ Settings");
    }

    // ── Step 1: Upload reference images ──
    LOG("=== Step 1: Upload reference images ===");

    // Clean up stale file inputs from any previous run
    removeAllFileInputs();
    await sleep(500);

    if (req.characterImage) {
        try {
            const ok = await uploadImageToPromptBar(req.characterImage, "character.png");
            steps.push(ok ? "✅ ตัวละคร" : "⚠️ ตัวละคร");
            if (!ok) errors.push("character upload failed");
        } catch (e: any) {
            WARN(`Character upload error: ${e.message}`);
            steps.push("❌ ตัวละคร");
            errors.push("character upload error");
        }
        await sleep(1000);
    }

    if (req.productImage) {
        try {
            // Remove file inputs created by previous upload to force a fresh one
            removeAllFileInputs();
            await sleep(500);

            const ok = await uploadImageToPromptBar(req.productImage, "product.png");
            steps.push(ok ? "✅ สินค้า" : "⚠️ สินค้า");
            if (!ok) errors.push("product upload failed");
        } catch (e: any) {
            WARN(`Product upload error: ${e.message}`);
            steps.push("❌ สินค้า");
            errors.push("product upload error");
        }
        await sleep(1000);
    }

    // ── Step 2: ALWAYS paste prompt (even if uploads failed) ──
    LOG("=== Step 2: Paste image prompt ===");
    await sleep(500);
    const promptInput = findPromptTextInput();
    if (promptInput) {
        await setPromptText(promptInput, req.imagePrompt);
        LOG(`Pasted prompt (${req.imagePrompt.length} chars)`);
        steps.push("✅ Prompt");
    } else {
        WARN("Could not find prompt text input");
        steps.push("❌ Prompt");
        errors.push("prompt input not found");
    }
    await sleep(800);

    // ── Step 3: ALWAYS click Generate → (even if some steps failed) ──
    LOG("=== Step 3: Click Generate → ===");
    await sleep(500);
    const genBtn = findGenerateButton();
    if (genBtn) {
        genBtn.click();
        LOG("Clicked → Generate button");
        steps.push("✅ Generate");
        await sleep(300);
        // Double-click safety: sometimes first click doesn't register
        genBtn.click();
    } else {
        WARN("Could not find → Generate button");
        steps.push("❌ Generate");
        errors.push("generate button not found");
    }

    const success = errors.length === 0;
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
        LOG("Received GENERATE_IMAGE request");
        handleGenerateImage(message as GenerateImageRequest)
            .then(sendResponse)
            .catch(err => {
                console.error("[Netflow AI] Generate error:", err);
                sendResponse({ success: false, message: `Error: ${err.message}`, step: "error" });
            });
        return true;
    }

    if (message?.action === "PING") {
        sendResponse({ status: "ready" });
        return true;
    }
});

LOG("Google Flow content script ready — waiting for commands");
