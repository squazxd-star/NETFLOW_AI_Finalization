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

/** Set text into prompt input (handles textarea, input, contenteditable) */
function setPromptText(el: HTMLElement, text: string) {
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const nativeSetter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
        if (nativeSetter) {
            nativeSetter.call(el, text);
        } else {
            el.value = text;
        }
        el.dispatchEvent(new Event("input", { bubbles: true }));
        el.dispatchEvent(new Event("change", { bubbles: true }));
    } else {
        // contenteditable
        el.focus();
        el.textContent = text;
        el.dispatchEvent(new InputEvent("input", { bubbles: true, data: text, inputType: "insertText" }));
    }
}

// ─── Upload Image into Prompt Bar ───────────────────────────────────────────

/**
 * Upload a single image into the prompt bar.
 * 1. Snapshot existing file inputs
 * 2. Click the "+" button → look for upload option
 * 3. Wait for a NEW file input → inject file
 */
async function uploadImageToPromptBar(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`── Uploading ${fileName} into prompt bar ──`);

    // Snapshot all existing file inputs so we can detect a new one
    const existingInputs = new Set(document.querySelectorAll<HTMLInputElement>('input[type="file"]'));
    LOG(`Existing file inputs: ${existingInputs.size}`);

    // Step 1: Find and click the "+" button
    const addBtn = findPromptBarAddButton();
    if (!addBtn) {
        WARN("Could not find prompt bar '+' button");
        return false;
    }

    addBtn.click();
    LOG("Clicked prompt bar '+' button");
    await sleep(1200);

    // Step 2: Look for upload menu option (if a popup/menu appeared)
    let clickedUpload = false;
    const menuElements = document.querySelectorAll<HTMLElement>(
        "button, [role='menuitem'], [role='option'], [role='listbox'] > *, li"
    );
    for (const el of menuElements) {
        // Skip if this is the add button itself
        if (el === addBtn) continue;

        // Check icon
        const icons = el.querySelectorAll("i");
        for (const icon of icons) {
            const iconText = icon.textContent?.trim() || "";
            if (iconText === "upload" || iconText === "upload_file" || iconText === "cloud_upload") {
                el.click();
                clickedUpload = true;
                LOG(`Clicked upload menu item (icon: ${iconText})`);
                break;
            }
        }
        if (clickedUpload) break;

        // Check text
        const txt = (el.textContent || "").trim().toLowerCase();
        if (txt.includes("upload") || txt.includes("อัปโหลด") || txt.includes("อัพโหลด") || txt.includes("from computer")) {
            el.click();
            clickedUpload = true;
            LOG(`Clicked upload menu item (text: "${txt.substring(0, 30)}")`);
            break;
        }
    }

    if (!clickedUpload) {
        LOG("No upload menu item found — assuming '+' directly triggers file input");
    }
    await sleep(1000);

    // Step 3: Wait for a NEW file input to appear
    const fileInput = await waitForNewFileInput(existingInputs, 8000);
    if (!fileInput) {
        WARN(`No file input found for ${fileName}`);
        return false;
    }

    // Step 4: Inject the file
    const file = base64ToFile(dataUrl, fileName);
    setFileInput(fileInput, file);
    LOG(`✅ Injected ${fileName} (${(file.size / 1024).toFixed(1)} KB)`);

    // Wait for thumbnail to appear and processing
    await sleep(3000);
    return true;
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
        setPromptText(promptInput, req.imagePrompt);
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
