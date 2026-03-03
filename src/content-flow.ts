/**
 * Netflow AI — Content Script for Google Flow (labs.google)
 *
 * Actions:
 *   GENERATE_IMAGE — Full pipeline: upload refs → paste prompt → switch to Image mode → Generate
 *   UPLOAD_IMAGES  — Upload reference images only
 *   PING           — Health check
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

/** Find a button whose inner Google Material icon text matches */
function findButtonByIconText(iconText: string): HTMLElement | null {
    const icons = document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");
    for (const icon of icons) {
        if (icon.textContent?.trim() === iconText) {
            return icon.closest("button") as HTMLElement | null;
        }
    }
    return null;
}

/** Find a button by its visible text content */
function findButtonByText(text: string): HTMLElement | null {
    const buttons = document.querySelectorAll("button");
    for (const btn of buttons) {
        if (btn.textContent?.trim().toLowerCase().includes(text.toLowerCase())) {
            return btn as HTMLElement;
        }
    }
    return null;
}

/** Wait for any element matching a selector */
async function waitForSelector<T extends Element>(selector: string, timeoutMs = 8000): Promise<T | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const el = document.querySelector<T>(selector);
        if (el) return el;
        await sleep(300);
    }
    return null;
}

/** Wait for a button with specific icon text to appear */
async function waitForButton(iconText: string, timeoutMs = 8000): Promise<HTMLElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const btn = findButtonByIconText(iconText);
        if (btn) return btn;
        await sleep(300);
    }
    return null;
}

/** Wait for a button by text */
async function waitForButtonByText(text: string, timeoutMs = 8000): Promise<HTMLElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const btn = findButtonByText(text);
        if (btn) return btn;
        await sleep(300);
    }
    return null;
}

/** Find a visible file input on the page */
async function waitForFileInput(timeoutMs = 5000): Promise<HTMLInputElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
        if (inputs.length > 0) return inputs[inputs.length - 1];
        await sleep(300);
    }
    return null;
}

/** Inject a File into a file input using DataTransfer */
function setFileInput(input: HTMLInputElement, file: File) {
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("input", { bubbles: true }));
}

/** Find the main prompt textarea/input on the page */
function findPromptInput(): HTMLTextAreaElement | HTMLElement | null {
    // Strategy 1: textarea
    const ta = document.querySelector<HTMLTextAreaElement>('textarea');
    if (ta) return ta;

    // Strategy 2: contenteditable div with role=textbox
    const ce = document.querySelector<HTMLElement>('[contenteditable="true"][role="textbox"]');
    if (ce) return ce;

    // Strategy 3: any contenteditable div near prompt-related aria labels
    const ceAll = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    if (ceAll.length > 0) return ceAll[0];

    // Strategy 4: input with placeholder containing "prompt" or "describe"
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="text"]');
    for (const inp of inputs) {
        const ph = (inp.placeholder || '').toLowerCase();
        if (ph.includes('prompt') || ph.includes('describe') || ph.includes('type')) return inp;
    }

    return null;
}

/** Set text into a prompt input (textarea, contenteditable, or input) */
function setPromptText(el: HTMLTextAreaElement | HTMLElement, text: string) {
    if (el instanceof HTMLTextAreaElement || el instanceof HTMLInputElement) {
        // Native input/textarea
        const nativeSetter = Object.getOwnPropertyDescriptor(
            el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
            'value'
        )?.set;
        if (nativeSetter) {
            nativeSetter.call(el, text);
        } else {
            el.value = text;
        }
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
        // contenteditable
        el.focus();
        el.textContent = text;
        el.dispatchEvent(new InputEvent('input', { bubbles: true, data: text, inputType: 'insertText' }));
    }
}

/** Find and click the Generate button */
function findGenerateButton(): HTMLElement | null {
    // Strategy 1: button with icon "play_arrow" or "send" or "auto_awesome"
    for (const icon of ["play_arrow", "send", "auto_awesome", "spark"]) {
        const btn = findButtonByIconText(icon);
        if (btn) return btn;
    }

    // Strategy 2: button with text "Generate"
    const genBtn = findButtonByText("Generate");
    if (genBtn) return genBtn;

    // Strategy 3: button with aria-label containing "generate"
    const allBtns = document.querySelectorAll<HTMLElement>("button");
    for (const btn of allBtns) {
        const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
        if (aria.includes("generate")) return btn;
    }

    return null;
}

// ─── Upload Single Image ────────────────────────────────────────────────────

async function uploadSingleImage(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`Uploading ${fileName}...`);

    // Step 1: Click the "+" (add_2 / create) button
    const addBtn = findButtonByIconText("add_2") || findButtonByIconText("add");
    if (!addBtn) {
        WARN("Could not find '+' (add_2) button");
        return false;
    }
    addBtn.click();
    LOG("Clicked '+' button");
    await sleep(800);

    // Step 2: Click the "upload" button
    const uploadBtn = await waitForButton("upload", 5000);
    if (!uploadBtn) {
        WARN("Could not find 'upload' button");
        return false;
    }
    uploadBtn.click();
    LOG("Clicked 'upload' button");
    await sleep(600);

    // Step 3: Find the file input and inject the file
    const fileInput = await waitForFileInput(5000);
    if (!fileInput) {
        WARN("Could not find file input");
        return false;
    }

    const file = base64ToFile(dataUrl, fileName);
    setFileInput(fileInput, file);
    LOG(`Injected ${fileName} (${(file.size / 1024).toFixed(1)} KB)`);

    await sleep(1500);
    return true;
}

// ─── UPLOAD_IMAGES handler ──────────────────────────────────────────────────

interface UploadRequest {
    action: "UPLOAD_IMAGES";
    productImage?: string;
    characterImage?: string;
}

async function handleUploadImages(req: UploadRequest): Promise<{ success: boolean; message: string }> {
    const results: string[] = [];
    let anyFailed = false;

    if (req.productImage) {
        const ok = await uploadSingleImage(req.productImage, "product.png");
        results.push(ok ? "✅ สินค้า uploaded" : "❌ สินค้า failed");
        if (!ok) anyFailed = true;
        if (req.characterImage) await sleep(1000);
    }

    if (req.characterImage) {
        const ok = await uploadSingleImage(req.characterImage, "character.png");
        results.push(ok ? "✅ ตัวละคร uploaded" : "❌ ตัวละคร failed");
        if (!ok) anyFailed = true;
    }

    if (results.length === 0) {
        return { success: false, message: "ไม่มีรูปให้อัพโหลด" };
    }

    return { success: !anyFailed, message: results.join(" | ") };
}

// ─── GENERATE_IMAGE handler — Full Image Generation Pipeline ────────────────

interface GenerateImageRequest {
    action: "GENERATE_IMAGE";
    imagePrompt: string;
    productImage?: string;
    characterImage?: string;
}

async function handleGenerateImage(req: GenerateImageRequest): Promise<{ success: boolean; message: string; step: string }> {
    const steps: string[] = [];

    // ── Step 1: Upload reference images ──
    LOG("=== Step 1: Upload reference images ===");
    if (req.characterImage) {
        const ok = await uploadSingleImage(req.characterImage, "character.png");
        steps.push(ok ? "✅ ตัวละคร" : "❌ ตัวละคร");
        if (!ok) return { success: false, message: "อัพโหลดรูปตัวละครล้มเหลว", step: "upload-character" };
        await sleep(800);
    }

    if (req.productImage) {
        const ok = await uploadSingleImage(req.productImage, "product.png");
        steps.push(ok ? "✅ สินค้า" : "❌ สินค้า");
        if (!ok) return { success: false, message: "อัพโหลดรูปสินค้าล้มเหลว", step: "upload-product" };
        await sleep(800);
    }

    // ── Step 2: Switch to Image mode ──
    LOG("=== Step 2: Switch to Image mode ===");
    // Look for model selector or mode buttons — click "Image" if available
    const imageModeBtns = document.querySelectorAll<HTMLElement>("button, [role='tab'], [role='menuitem']");
    let switchedToImage = false;
    for (const btn of imageModeBtns) {
        const txt = (btn.textContent || "").trim().toLowerCase();
        if (txt === "image" || txt === "รูปภาพ") {
            btn.click();
            LOG("Switched to Image mode");
            switchedToImage = true;
            await sleep(500);
            break;
        }
    }
    if (!switchedToImage) {
        LOG("Image mode button not found — may already be in Image mode");
    }
    steps.push(switchedToImage ? "✅ Image mode" : "⚠️ Mode unchanged");

    // ── Step 3: Paste image prompt ──
    LOG("=== Step 3: Paste image prompt ===");
    await sleep(500);
    const promptInput = findPromptInput();
    if (!promptInput) {
        WARN("Could not find prompt input");
        return { success: false, message: "ไม่พบช่อง prompt บนหน้า Google Flow", step: "find-prompt" };
    }
    setPromptText(promptInput as HTMLTextAreaElement, req.imagePrompt);
    LOG(`Pasted prompt (${req.imagePrompt.length} chars)`);
    steps.push("✅ Prompt");
    await sleep(500);

    // ── Step 4: Click Generate ──
    LOG("=== Step 4: Click Generate ===");
    await sleep(300);
    const genBtn = findGenerateButton();
    if (!genBtn) {
        WARN("Could not find Generate button");
        return { success: false, message: "ไม่พบปุ่ม Generate", step: "find-generate" };
    }
    genBtn.click();
    LOG("Clicked Generate button");
    steps.push("✅ Generate clicked");

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

    if (message?.action === "UPLOAD_IMAGES") {
        LOG("Received UPLOAD_IMAGES request");
        handleUploadImages(message as UploadRequest)
            .then(sendResponse)
            .catch(err => {
                console.error("[Netflow AI] Upload error:", err);
                sendResponse({ success: false, message: `Error: ${err.message}` });
            });
        return true;
    }

    if (message?.action === "PING") {
        sendResponse({ status: "ready" });
        return true;
    }
});

LOG("Google Flow content script ready — waiting for commands");
