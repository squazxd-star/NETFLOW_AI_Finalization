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

    // ═══ Strategy 3: System clipboard + execCommand('paste') ═══
    LOG("setPromptText: Strategy 3 — system clipboard + execCommand paste");
    try {
        // Copy to clipboard
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);

        // Paste into Slate
        el.focus();
        await sleep(200);
        document.execCommand("paste");
        await sleep(500);

        const content3 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร/g, "").trim();
        if (content3.length > 20) {
            LOG(`setPromptText: ✅ Strategy 3 worked (${content3.length} chars)`);
            return;
        }
    } catch (e: any) {
        LOG(`setPromptText: Strategy 3 failed: ${e.message}`);
    }

    // ═══ Strategy 4: React fiber — find Slate editor and call insertText ═══
    LOG("setPromptText: Strategy 4 — React fiber Slate editor");
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
                    LOG(`setPromptText: ✅ Strategy 4 — inserted via editor.insertText`);
                    return;
                }

                // Check stateRef
                if (state?.memoizedState?.editor?.insertText) {
                    LOG("setPromptText: Found Slate editor via fiber state");
                    state.memoizedState.editor.insertText(text);
                    LOG(`setPromptText: ✅ Strategy 4 — inserted via state editor`);
                    return;
                }

                fiber = fiber.return;
            }
            LOG("setPromptText: Fiber found but no Slate editor in tree");
        } else {
            LOG("setPromptText: No React fiber found on element");
        }
    } catch (e: any) {
        LOG(`setPromptText: Strategy 4 failed: ${e.message}`);
    }

    LOG("setPromptText: ⚠️ All 4 strategies attempted — check console for results");
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
 * Restore file inputs to type="file", inject our file, and dispatch change.
 */
function restoreAndInject(neutralized: { input: HTMLInputElement; origType: string }[], file: File): boolean {
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
    if (fileInputs.length === 0) return false;

    const target = fileInputs[fileInputs.length - 1];
    const dt = new DataTransfer();
    dt.items.add(file);
    target.files = dt.files;
    target.dispatchEvent(new Event('change', { bubbles: true }));
    target.dispatchEvent(new Event('input', { bubbles: true }));
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

    // Step 1: Neutralize ALL existing file inputs (type → text)
    let neutralized = neutralizeFileInputs();

    // Step 2: Set up MutationObserver to neutralize ANY new file inputs immediately
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
        // Step 3: Click "+" to open menu
        addBtn.click();
        LOG("Clicked '+' button");
        await sleep(1500);

        // Step 4: Find and click upload menu option (precise: exclude drive_folder_upload)
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
                        el.click();
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
                        el.click();
                        clickedMenu = true;
                        LOG(`Clicked upload menu (text: "${directText}")`);
                        break;
                    }
                }
            }
        }

        // Step 5: Wait a moment for Google Flow to call .click() (which does nothing now)
        await sleep(1000);

        // Step 6: Restore file inputs and inject our file
        const ok = restoreAndInject(neutralized, file);
        if (ok) {
            LOG(`✅ Injected ${fileName} — no dialog opened`);
            await sleep(2500);
            return true;
        }

        WARN(`No file input found for ${fileName}`);
        return false;

    } finally {
        observer.disconnect();
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
        await sleep(1500);
    }

    if (req.productImage) {
        try {
            const ok = await uploadImageToPromptBar(req.productImage, "product.png");
            steps.push(ok ? "✅ สินค้า" : "⚠️ สินค้า");
            if (!ok) errors.push("product upload failed");
        } catch (e: any) {
            WARN(`Product upload error: ${e.message}`);
            steps.push("❌ สินค้า");
            errors.push("product upload error");
        }
        await sleep(1500);
    }

    // ── Step 1c: Close any open dialog/modal (Escape key) ──
    LOG("Closing any open dialogs...");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(500);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(500);

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
