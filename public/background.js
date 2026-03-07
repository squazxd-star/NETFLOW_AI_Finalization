// Netflow AI — Background Service Worker (Manifest V3)
// Opens the side panel when the extension icon is clicked.
// Cross-platform: Windows + macOS compatible

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ─── Engine Configuration ────────────────────────────────────────────────────
// Maps engine ID → { urlPatterns, contentScript, label }
const ENGINE_CONFIG = {
    veo: {
        urlPatterns: ["https://labs.google/*"],
        urlIncludes: "labs.google",
        contentScript: "src/content-flow.js",
        label: "Google Flow (Veo 3.1)"
    },
    grok: {
        urlPatterns: ["https://grok.com/*"],
        urlIncludes: "grok.com",
        contentScript: "src/content-grok.js",
        label: "Grok"
    }
};

// ─── Smart tab finder — finds the correct tab based on engine ───
async function findEngineTab(engine) {
    const config = ENGINE_CONFIG[engine] || ENGINE_CONFIG.veo;
    
    // Strategy 1: Find tab matching engine URL pattern (most reliable)
    const engineTabs = await chrome.tabs.query({ url: config.urlPatterns });
    if (engineTabs.length > 0) {
        const active = engineTabs.find(t => t.active) || engineTabs[0];
        return { tab: active, config };
    }

    // Strategy 2: Fallback to active tab in current window
    const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTabs.length > 0) {
        const match = activeTabs.find(t => (t.url || "").includes(config.urlIncludes));
        if (match) return { tab: match, config };
    }

    // Strategy 3: Last resort — active tab in any window
    const anyActive = await chrome.tabs.query({ active: true });
    if (anyActive.length > 0) {
        const match = anyActive.find(t => (t.url || "").includes(config.urlIncludes));
        if (match) return { tab: match, config };
    }

    return { tab: null, config };
}

// ─── Legacy wrapper for backward compatibility ───
async function findFlowTab() {
    const result = await findEngineTab("veo");
    return result.tab;
}

// ─── Fix #1: Programmatic content script injection ───
// Ensures content script is present before sending messages.
// If already injected, Chrome skips re-injection (idempotent).
async function ensureContentScript(tabId, scriptFile) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId },
            files: [scriptFile || "src/content-flow.js"],
        });
    } catch (e) {
        console.warn("[Netflow] Injection failed:", e.message);
        // Not fatal — content script may already be loaded via manifest
    }
}

// ─── Fix #4: Send message with auto-injection retry ───
// If first sendMessage fails (content script missing), inject and retry once.
function sendToContentScript(tabId, message, scriptFile) {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tabId, message, (response) => {
            if (chrome.runtime.lastError) {
                // Content script not found — inject programmatically and retry
                console.log("[Netflow] First attempt failed, injecting content script...");
                ensureContentScript(tabId, scriptFile).then(() => {
                    // Wait a moment for script to initialize
                    setTimeout(() => {
                        chrome.tabs.sendMessage(tabId, message, (retryResponse) => {
                            if (chrome.runtime.lastError) {
                                resolve({
                                    success: false,
                                    message: "Content script not found. Please refresh the Google Flow page and try again."
                                });
                            } else {
                                resolve(retryResponse || { success: false, message: "No response from content script" });
                            }
                        });
                    }, 1500);
                });
            } else {
                resolve(response || { success: false, message: "No response" });
            }
        });
    });
}

// Relay messages from sidepanel to content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.action === "GENERATE_IMAGE" || message?.action === "UPLOAD_IMAGES" ||
        message?.action === "PING" || message?.action === "STOP_AUTOMATION" || message?.action === "CLICK_FIRST_IMAGE") {
        (async () => {
            try {
                // ── Engine-aware routing ──
                const engine = message.videoEngine || "veo";
                const { tab, config } = await findEngineTab(engine);
                if (!tab?.id) {
                    const engineLabel = config.label || engine;
                    sendResponse({ success: false, message: `ไม่พบแท็บ ${engineLabel} — กรุณาเปิด ${config.urlIncludes} ก่อน` });
                    return;
                }
                console.log(`[Netflow] Routing to ${config.label} (tab ${tab.id})`);
                const response = await sendToContentScript(tab.id, message, config.contentScript);
                sendResponse(response);
            } catch (err) {
                sendResponse({ success: false, message: "Error: " + (err.message || "unknown") });
            }
        })();
        return true; // async
    }

    // Close the automation tab (Google Flow) after automation is complete
    if (message?.action === "CLOSE_AUTOMATION_TAB") {
        const tabId = sender?.tab?.id;
        if (tabId) {
            console.log("[Netflow] Closing automation tab:", tabId);
            chrome.tabs.remove(tabId, () => {
                if (chrome.runtime.lastError) {
                    console.warn("[Netflow] Failed to close tab:", chrome.runtime.lastError.message);
                    sendResponse({ success: false, message: chrome.runtime.lastError.message });
                } else {
                    sendResponse({ success: true, message: "Tab closed" });
                }
            });
        } else {
            sendResponse({ success: false, message: "No tab ID found" });
        }
        return true; // async
    }

    // After upscaling: find the latest downloaded video, trim last 1s, open in Chrome
    if (message?.action === "OPEN_LATEST_VIDEO") {
        const afterTs = message.afterTimestamp || 0;
        chrome.downloads.search(
            { orderBy: ["-startTime"], limit: 10, state: "complete" },
            (downloads) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ success: false, message: chrome.runtime.lastError.message });
                    return;
                }
                const videoFile = downloads.find((d) => {
                    const name = (d.filename || "").toLowerCase();
                    const isVideo = name.endsWith(".mp4") || name.endsWith(".webm") || name.endsWith(".mov");
                    if (!isVideo) return false;
                    // Filter: only downloads started after the given timestamp
                    if (afterTs && d.startTime) {
                        const dlTime = new Date(d.startTime).getTime();
                        if (dlTime < afterTs) return false;
                    }
                    return true;
                });
                if (!videoFile) {
                    sendResponse({ success: false, message: "ไม่พบไฟล์วิดีโอที่ดาวน์โหลดล่าสุด" });
                    return;
                }

                const openFileInChrome = (filePath, label) => {
                    // Normalize path for both Windows (C:\...) and Mac (/Users/...)
                    const normalized = filePath.replace(/\\/g, "/");
                    const url = normalized.startsWith("/")
                        ? "file://" + normalized        // Mac: file:///Users/...  (2 slashes + leading /)
                        : "file:///" + normalized;      // Win: file:///C:/Users/...
                    chrome.tabs.create({ url }, () => {
                        sendResponse({ success: true, message: label, filename: filePath });
                    });
                };

                // Try trimming via native host (FFmpeg)
                try {
                    chrome.runtime.sendNativeMessage(
                        "com.netflow.trimvideo",
                        { filePath: videoFile.filename, trimSeconds: 1 },
                        (response) => {
                            if (chrome.runtime.lastError || !response?.success) {
                                // Native host not installed or FFmpeg error — open original
                                const reason = chrome.runtime.lastError?.message || response?.error || "unknown";
                                console.log("[Netflow] Trim skipped: " + reason);
                                const name = videoFile.filename.split(/[\\/]/).pop();
                                openFileInChrome(videoFile.filename, `เปิดใน Chrome: ${name}`);
                            } else {
                                // Trim succeeded — open trimmed file
                                const name = response.trimmedPath.split(/[\\/]/).pop();
                                console.log("[Netflow] Trimmed: " + response.trimmedPath);
                                openFileInChrome(response.trimmedPath, `✂️ Trimmed & opened: ${name} (${response.trimmedDuration}s)`);
                            }
                        }
                    );
                } catch (e) {
                    // sendNativeMessage not available — open original
                    const name = videoFile.filename.split(/[\\/]/).pop();
                    openFileInChrome(videoFile.filename, `เปิดใน Chrome: ${name}`);
                }
            }
        );
        return true; // async
    }
});
