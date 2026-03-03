/**
 * Netflow AI — Content Script for Google Flow (labs.google)
 * Handles uploading product + character images via base64.
 *
 * Flow:
 *   1. SidePanel sends "UPLOAD_IMAGES" message via background relay
 *   2. This script clicks the "+" (add_2) button to open the create dialog
 *   3. Clicks the "upload" icon button
 *   4. Injects a File into the hidden file input
 */

console.log("[Netflow AI] Content script loaded on Google Flow page");

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

/** Find a button whose inner icon text matches (e.g. "add_2", "upload") */
function findButtonByIconText(iconText: string): HTMLElement | null {
    const icons = document.querySelectorAll("i.google-symbols, i[class*='google-symbols']");
    for (const icon of icons) {
        if (icon.textContent?.trim() === iconText) {
            return icon.closest("button") as HTMLElement | null;
        }
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

/** Find a visible file input on the page */
async function waitForFileInput(timeoutMs = 5000): Promise<HTMLInputElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
        if (inputs.length > 0) return inputs[inputs.length - 1]; // last one is usually the active one
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

// ─── Upload Pipeline ────────────────────────────────────────────────────────

interface UploadRequest {
    action: "UPLOAD_IMAGES";
    productImage?: string;   // base64 data URL
    characterImage?: string; // base64 data URL
}

async function uploadSingleImage(dataUrl: string, fileName: string): Promise<boolean> {
    console.log(`[Netflow AI] Uploading ${fileName}...`);

    // Step 1: Click the "+" (add_2 / create) button
    const addBtn = findButtonByIconText("add_2") || findButtonByIconText("add");
    if (!addBtn) {
        console.warn("[Netflow AI] Could not find '+' (add_2) button");
        return false;
    }
    addBtn.click();
    console.log("[Netflow AI] Clicked '+' button");
    await sleep(800);

    // Step 2: Click the "upload" button
    const uploadBtn = await waitForButton("upload", 5000);
    if (!uploadBtn) {
        console.warn("[Netflow AI] Could not find 'upload' button");
        return false;
    }
    uploadBtn.click();
    console.log("[Netflow AI] Clicked 'upload' button");
    await sleep(600);

    // Step 3: Find the file input and inject the file
    const fileInput = await waitForFileInput(5000);
    if (!fileInput) {
        console.warn("[Netflow AI] Could not find file input");
        return false;
    }

    const file = base64ToFile(dataUrl, fileName);
    setFileInput(fileInput, file);
    console.log(`[Netflow AI] Injected ${fileName} (${(file.size / 1024).toFixed(1)} KB)`);

    // Wait for upload to process
    await sleep(1500);
    return true;
}

async function handleUploadImages(req: UploadRequest): Promise<{ success: boolean; message: string }> {
    const results: string[] = [];
    let anyFailed = false;

    // Upload product image first
    if (req.productImage) {
        const ok = await uploadSingleImage(req.productImage, "product.png");
        results.push(ok ? "✅ สินค้า uploaded" : "❌ สินค้า failed");
        if (!ok) anyFailed = true;

        // Small delay between uploads
        if (req.characterImage) await sleep(1000);
    }

    // Upload character image
    if (req.characterImage) {
        const ok = await uploadSingleImage(req.characterImage, "character.png");
        results.push(ok ? "✅ ตัวละคร uploaded" : "❌ ตัวละคร failed");
        if (!ok) anyFailed = true;
    }

    if (results.length === 0) {
        return { success: false, message: "ไม่มีรูปให้อัพโหลด" };
    }

    return {
        success: !anyFailed,
        message: results.join(" | ")
    };
}

// ─── Message Listener ───────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.action === "UPLOAD_IMAGES") {
        console.log("[Netflow AI] Received UPLOAD_IMAGES request");
        handleUploadImages(message as UploadRequest)
            .then(sendResponse)
            .catch(err => {
                console.error("[Netflow AI] Upload error:", err);
                sendResponse({ success: false, message: `Error: ${err.message}` });
            });
        return true; // async response
    }

    if (message?.action === "PING") {
        sendResponse({ status: "ready" });
        return true;
    }
});

// Announce ready
console.log("[Netflow AI] Google Flow content script ready — waiting for commands");
