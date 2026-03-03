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
 *   GENERATE_IMAGE — upload refs into prompt bar → paste prompt → click → (generate)
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

/** Wait for a file input to appear */
async function waitForFileInput(timeoutMs = 5000): Promise<HTMLInputElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
        if (inputs.length > 0) return inputs[inputs.length - 1];
        await sleep(300);
    }
    return null;
}

// ─── Prompt Bar Detection ───────────────────────────────────────────────────

/**
 * Find the prompt bar container at the bottom of the page.
 * It contains the text input (placeholder: "คุณต้องการสร้างอะไร"),
 * the "+" button, thumbnails, and the "→" generate button.
 */
function findPromptBar(): HTMLElement | null {
    // Strategy 1: Find by placeholder text or aria-label
    const textInputs = document.querySelectorAll<HTMLElement>(
        'textarea, input[type="text"], [contenteditable="true"], [role="textbox"]'
    );
    for (const el of textInputs) {
        const ph = (el as HTMLInputElement).placeholder || el.getAttribute("aria-label") || el.getAttribute("data-placeholder") || "";
        if (ph.includes("สร้าง") || ph.includes("create") || ph.includes("prompt") || ph.includes("describe")) {
            // Walk up to find the prompt bar container
            let container = el.parentElement;
            for (let i = 0; i < 8 && container; i++) {
                // The prompt bar is usually a large container near the bottom
                const rect = container.getBoundingClientRect();
                if (rect.height > 60 && rect.bottom > window.innerHeight * 0.6) {
                    LOG(`Found prompt bar via text input (depth ${i}): ${rect.width}x${rect.height}`);
                    return container;
                }
                container = container.parentElement;
            }
        }
    }

    // Strategy 2: Find the bottom-most container that has both a "+" button and a "→" or send button
    const allButtons = document.querySelectorAll<HTMLElement>("button");
    let bestContainer: HTMLElement | null = null;
    let bestY = 0;
    for (const btn of allButtons) {
        const rect = btn.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.7 && rect.y > bestY) {
            const parent = btn.closest('[class*="prompt"], [class*="input"], [class*="composer"], [class*="chat"]') as HTMLElement;
            if (parent) {
                bestContainer = parent;
                bestY = rect.y;
            }
        }
    }
    if (bestContainer) {
        LOG("Found prompt bar via bottom button heuristic");
        return bestContainer;
    }

    return null;
}

/**
 * Find the "+" button inside or near the prompt bar.
 * This is the bottom-most "+" button on the page (inside the prompt bar).
 */
function findPromptBarAddButton(): HTMLElement | null {
    // Find all "+" buttons (add, add_2 icons)
    const addButtons = [...findAllButtonsByIcon("add"), ...findAllButtonsByIcon("add_2")];

    if (addButtons.length === 0) {
        LOG("No add buttons found on page");
        return null;
    }

    // Pick the one closest to the bottom of the viewport (prompt bar is at bottom)
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
 * Find the generate "→" button in the prompt bar (bottom-right circular arrow).
 */
function findGenerateButton(): HTMLElement | null {
    // Strategy 1: icon buttons — arrow_forward, send, arrow_upward, navigate_next
    for (const icon of ["arrow_forward", "send", "arrow_upward", "navigate_next", "arrow_right"]) {
        const btns = findAllButtonsByIcon(icon);
        // Pick the bottom-most one
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

    // Strategy 2: circular button at the bottom-right of the page
    const allBtns = document.querySelectorAll<HTMLElement>("button");
    let candidate: HTMLElement | null = null;
    let bestScore = 0;
    for (const btn of allBtns) {
        const rect = btn.getBoundingClientRect();
        // Must be at the bottom-right area
        if (rect.bottom > window.innerHeight * 0.7 && rect.right > window.innerWidth * 0.6) {
            // Prefer circular buttons (roughly square aspect ratio, small size)
            const isCircular = Math.abs(rect.width - rect.height) < 10 && rect.width < 60;
            const score = rect.y + (isCircular ? 1000 : 0);
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
 * Find the prompt text input inside the prompt bar.
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

    // Strategy 4: any textarea/input
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
 * Upload a single image into the prompt bar as an ingredient.
 * Clicks the prompt bar "+" → triggers upload → injects file.
 */
async function uploadImageToPromptBar(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`Uploading ${fileName} into prompt bar...`);

    // Count existing file inputs before clicking "+"
    const inputsBefore = document.querySelectorAll<HTMLInputElement>('input[type="file"]').length;

    // Step 1: Click the "+" button in the prompt bar (bottom of page)
    const addBtn = findPromptBarAddButton();
    if (!addBtn) {
        WARN("Could not find prompt bar '+' button");
        return false;
    }
    addBtn.click();
    LOG("Clicked prompt bar '+' button");
    await sleep(1000);

    // Step 2: Look for "upload" button or menu option that appeared
    // Try to find an upload option in the popup/menu
    const allBtns = document.querySelectorAll<HTMLElement>("button, [role='menuitem'], [role='option']");
    let clickedUpload = false;
    for (const btn of allBtns) {
        const icons = btn.querySelectorAll("i");
        for (const icon of icons) {
            if (icon.textContent?.trim() === "upload" || icon.textContent?.trim() === "upload_file") {
                btn.click();
                clickedUpload = true;
                LOG("Clicked 'upload' option from menu");
                break;
            }
        }
        if (clickedUpload) break;

        const txt = (btn.textContent || "").trim().toLowerCase();
        if (txt.includes("upload") || txt.includes("อัปโหลด") || txt.includes("อัพโหลด")) {
            btn.click();
            clickedUpload = true;
            LOG("Clicked upload option by text");
            break;
        }
    }

    if (!clickedUpload) {
        LOG("No upload menu item found — trying direct file input approach");
    }
    await sleep(800);

    // Step 3: Find the file input (new one that appeared after clicking +)
    const inputsAfter = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    let fileInput: HTMLInputElement | null = null;

    if (inputsAfter.length > inputsBefore) {
        // Use the newly appeared file input
        fileInput = inputsAfter[inputsAfter.length - 1];
        LOG("Found new file input after clicking '+'");
    } else if (inputsAfter.length > 0) {
        // Use the last available file input
        fileInput = inputsAfter[inputsAfter.length - 1];
        LOG("Using existing file input");
    } else {
        // Wait for one to appear
        fileInput = await waitForFileInput(5000);
    }

    if (!fileInput) {
        WARN("Could not find file input after clicking '+'");
        return false;
    }

    // Step 4: Inject the file
    const file = base64ToFile(dataUrl, fileName);
    setFileInput(fileInput, file);
    LOG(`Injected ${fileName} (${(file.size / 1024).toFixed(1)} KB)`);

    // Wait for the thumbnail to appear in prompt bar
    await sleep(2000);
    return true;
}

// ─── GENERATE_IMAGE handler ─────────────────────────────────────────────────

interface GenerateImageRequest {
    action: "GENERATE_IMAGE";
    imagePrompt: string;
    productImage?: string;
    characterImage?: string;
    orientation?: "horizontal" | "vertical";  // แนวนอน | แนวตั้ง
    outputCount?: 1 | 2 | 3 | 4;               // x1 - x4
}

/**
 * Step 0: Click the "Nano Banana 2" settings button and configure:
 *   - Mode: Image (not Video)
 *   - Orientation: แนวนอน (horizontal) / แนวตั้ง (vertical)
 *   - Count: x1 / x2 / x3 / x4
 */
async function configureFlowSettings(orientation: string, outputCount: number): Promise<boolean> {
    LOG("=== Step 0: Configure Flow settings ===");

    // Find the Nano Banana settings button in prompt bar
    // It contains text "Nano Banana" and has aria-haspopup="menu"
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
        // Fallback: find button with crop icon at the bottom area
        const cropBtns = findAllButtonsByIcon("crop_16_9");
        if (cropBtns.length > 0) settingsBtn = cropBtns[cropBtns.length - 1];
    }

    if (!settingsBtn) {
        WARN("Could not find Nano Banana settings button");
        return false;
    }

    settingsBtn.click();
    LOG("Clicked Nano Banana settings button");
    await sleep(800);

    // ── Select Image mode ──
    const menuBtns = document.querySelectorAll<HTMLElement>("button");
    for (const btn of menuBtns) {
        const txt = (btn.textContent || "").trim();
        if (txt === "Image" || txt === "รูปภาพ") {
            btn.click();
            LOG("Selected Image mode");
            await sleep(300);
            break;
        }
    }

    // ── Select orientation ──
    const orientationText = orientation === "horizontal" ? "แนวนอน" : "แนวตั้ง";
    const orientationAlt = orientation === "horizontal" ? "Landscape" : "Portrait";
    for (const btn of document.querySelectorAll<HTMLElement>("button")) {
        const txt = (btn.textContent || "").trim();
        if (txt === orientationText || txt.toLowerCase() === orientationAlt.toLowerCase()) {
            btn.click();
            LOG(`Selected orientation: ${orientationText}`);
            await sleep(300);
            break;
        }
    }

    // ── Select output count ──
    const countText = `x${outputCount}`;
    for (const btn of document.querySelectorAll<HTMLElement>("button")) {
        const txt = (btn.textContent || "").trim();
        if (txt === countText) {
            btn.click();
            LOG(`Selected count: ${countText}`);
            await sleep(300);
            break;
        }
    }

    // Close the settings panel by clicking the settings button again
    await sleep(300);
    settingsBtn.click();
    LOG("Closed settings panel");
    await sleep(500);

    return true;
}

async function handleGenerateImage(req: GenerateImageRequest): Promise<{ success: boolean; message: string; step: string }> {
    const steps: string[] = [];

    // ── Step 0: Configure Flow settings ──
    const orientation = req.orientation || "horizontal";
    const outputCount = req.outputCount || 1;
    const configured = await configureFlowSettings(orientation, outputCount);
    steps.push(configured ? "✅ Settings" : "⚠️ Settings");
    if (!configured) {
        LOG("Settings configuration failed — continuing anyway");
    }

    // ── Step 1: Upload reference images into prompt bar ──
    LOG("=== Step 1: Upload reference images into prompt bar ===");
    if (req.characterImage) {
        const ok = await uploadImageToPromptBar(req.characterImage, "character.png");
        steps.push(ok ? "✅ ตัวละคร" : "❌ ตัวละคร");
        if (!ok) return { success: false, message: "อัพโหลดรูปตัวละครเข้า prompt bar ล้มเหลว", step: "upload-character" };
        await sleep(800);
    }

    if (req.productImage) {
        const ok = await uploadImageToPromptBar(req.productImage, "product.png");
        steps.push(ok ? "✅ สินค้า" : "❌ สินค้า");
        if (!ok) return { success: false, message: "อัพโหลดรูปสินค้าเข้า prompt bar ล้มเหลว", step: "upload-product" };
        await sleep(800);
    }

    // ── Step 2: Paste image prompt into prompt bar text input ──
    LOG("=== Step 2: Paste image prompt ===");
    await sleep(500);
    const promptInput = findPromptTextInput();
    if (!promptInput) {
        WARN("Could not find prompt text input");
        return { success: false, message: "ไม่พบช่อง prompt ใน prompt bar", step: "find-prompt" };
    }
    setPromptText(promptInput, req.imagePrompt);
    LOG(`Pasted prompt (${req.imagePrompt.length} chars)`);
    steps.push("✅ Prompt");
    await sleep(500);

    // ── Step 3: Click Generate → button ──
    LOG("=== Step 3: Click Generate → ===");
    await sleep(300);
    const genBtn = findGenerateButton();
    if (!genBtn) {
        WARN("Could not find → generate button");
        return { success: false, message: "ไม่พบปุ่ม → Generate", step: "find-generate" };
    }
    genBtn.click();
    LOG("Clicked → Generate button");
    steps.push("✅ Generate");

    return {
        success: true,
        message: `สร้างภาพสำเร็จ! ${steps.join(" → ")}`,
        step: "done"
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
