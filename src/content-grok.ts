/**
 * Netflow AI — Content Script for Grok (grok.com)
 * 
 * Target: Grok video generation interface at grok.com
 * 
 * Actions:
 *   GENERATE_IMAGE — configure → upload refs → paste prompt → click generate
 *   PING           — health check
 * 
 * ═══════════════════════════════════════════════════════════════
 * ⚠️ PLACEHOLDER — ต้องใส่โค้ด automation จริงของ Grok ที่นี่
 * ═══════════════════════════════════════════════════════════════
 */

import { showOverlay, hideOverlay, updateStep, skipStep, completeOverlay, configureScenes, addLog, setOverlayTheme } from "./netflow-overlay";

// ─── Logging ─────────────────────────────────────────────────────────────────
const LOG = (msg: string) => {
    console.log(`[Netflow AI — Grok] ${msg}`);
    try { addLog(msg); } catch (_) { /* overlay not ready */ }
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg }); } catch (_) { /* popup closed */ }
};
const WARN = (msg: string) => {
    console.warn(`[Netflow AI — Grok] ${msg}`);
    try { addLog(`⚠️ ${msg}`); } catch (_) { /* overlay not ready */ }
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `⚠️ ${msg}` }); } catch (_) { /* popup closed */ }
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Stop Signal ─────────────────────────────────────────────────────────────
let stopRequested = false;
const checkStop = () => stopRequested;

// ─── Types ───────────────────────────────────────────────────────────────────
interface GrokGenerateRequest {
    action: "GENERATE_IMAGE";
    videoEngine: "grok";
    imagePrompt?: string;
    videoPrompt?: string;
    videoScenePrompts?: string[];
    sceneCount?: number;
    productImage?: string;
    characterImage?: string;
    orientation?: string;
    outputCount?: number;
    theme?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HANDLER — Grok Automation
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Main handler: configure → upload images → paste prompt → click generate
 * 
 * ⚠️ TODO: Implement Grok-specific browser automation here
 * 
 * This function should:
 * 1. Configure Grok settings (orientation, quality, etc.)
 * 2. Upload product/character reference images
 * 3. Paste the video prompt
 * 4. Click generate
 * 5. Wait for generation to complete
 * 6. Download the result
 * 7. Return { success: true/false, message, step }
 */
async function handleGrokGenerate(req: GrokGenerateRequest): Promise<{ success: boolean; message: string; step: string }> {
    LOG("═══ Grok Automation Started ═══");
    LOG(`Engine: Grok | Scenes: ${req.sceneCount || 1} | Orientation: ${req.orientation || "vertical"}`);

    // Show overlay
    try {
        if (req.theme) setOverlayTheme(req.theme);
        showOverlay(req.sceneCount || 1);
    } catch (e: any) {
        LOG(`⚠️ Overlay error: ${e.message}`);
    }

    // ═══════════════════════════════════════════════════════════════
    // ⚠️ TODO: ใส่โค้ด automation ของ Grok ที่นี่
    // ═══════════════════════════════════════════════════════════════
    // 
    // ตัวอย่างขั้นตอน:
    // 1. หา prompt input box ของ Grok
    // 2. วาง prompt (req.videoPrompt)
    // 3. อัปโหลดรูปสินค้า (req.productImage) ถ้ามี
    // 4. อัปโหลดรูปตัวละคร (req.characterImage) ถ้ามี
    // 5. กดปุ่ม Generate
    // 6. รอผลลัพธ์
    // 7. ดาวน์โหลดวิดีโอ
    //
    // ดูตัวอย่างจาก content-flow.ts (Veo engine) เป็นแนวทาง
    // ═══════════════════════════════════════════════════════════════

    WARN("Grok automation ยังไม่ได้ implement — กรุณาเพิ่มโค้ดใน content-grok.ts");

    try { completeOverlay(5000); } catch (_) {}

    return {
        success: false,
        message: "Grok engine ยังไม่พร้อมใช้งาน — กำลังพัฒนา",
        step: "not-implemented"
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MESSAGE LISTENER — Chrome Extension Communication
// ═══════════════════════════════════════════════════════════════════════════════
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message?.action) return;

    // Health check
    if (message.action === "PING") {
        sendResponse({ status: "ready", engine: "grok", url: window.location.href });
        return;
    }

    // Stop automation
    if (message.action === "STOP_AUTOMATION") {
        stopRequested = true;
        LOG("⛔ ผู้ใช้สั่งหยุด automation");
        try { hideOverlay(); } catch (_) {}
        sendResponse({ success: true, message: "Stopped" });
        return;
    }

    // Generate
    if (message.action === "GENERATE_IMAGE") {
        stopRequested = false;
        handleGrokGenerate(message as GrokGenerateRequest).then(
            (result) => sendResponse(result),
            (err) => sendResponse({ success: false, message: `Error: ${err.message}`, step: "error" })
        );
        return true; // async response
    }
});

// ─── Init Log ────────────────────────────────────────────────────────────────
LOG(`✅ Grok content script loaded on: ${window.location.href}`);
