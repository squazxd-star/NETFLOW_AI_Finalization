// Netflow AI — Background Service Worker (Manifest V3)
// Opens the side panel when the extension icon is clicked.
// Cross-platform: Windows + macOS compatible

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// ─── Fix #2: Smart tab finder — find Google Flow tab by URL, not just currentWindow ───
async function findFlowTab() {
    // Strategy 1: Find tab matching labs.google URL (most reliable, cross-platform)
    const flowTabs = await chrome.tabs.query({ url: "https://labs.google/*" });
    if (flowTabs.length > 0) {
        // Prefer the active one if multiple are open
        const active = flowTabs.find(t => t.active) || flowTabs[0];
        return active;
    }

    // Strategy 2: Fallback to active tab in current window (original behavior)
    const activeTabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (activeTabs.length > 0) return activeTabs[0];

    // Strategy 3: Last resort — active tab in any window (macOS multi-window)
    const anyActive = await chrome.tabs.query({ active: true });
    if (anyActive.length > 0) {
        const flowish = anyActive.find(t => (t.url || "").includes("labs.google"));
        if (flowish) return flowish;
        return anyActive[0];
    }

    return null;
}

// ─── Fix #1: Programmatic content script injection ───
// Ensures content script is present before sending messages.
// If already injected, Chrome skips re-injection (idempotent).
async function ensureContentScript(tabId) {
    try {
        await chrome.scripting.executeScript({
            target: { tabId },
            files: ["src/content-flow.js"],
        });
    } catch (e) {
        console.warn("[Netflow] Injection failed:", e.message);
        // Not fatal — content script may already be loaded via manifest
    }
}

// ─── Fix #4: Send message with auto-injection retry ───
// If first sendMessage fails (content script missing), inject and retry once.
function sendToContentScript(tabId, message) {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tabId, message, (response) => {
            if (chrome.runtime.lastError) {
                // Content script not found — inject programmatically and retry
                console.log("[Netflow] First attempt failed, injecting content script...");
                ensureContentScript(tabId).then(() => {
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
                const tab = await findFlowTab();
                if (!tab?.id) {
                    sendResponse({ success: false, message: "ไม่พบแท็บ Google Flow — กรุณาเปิด labs.google ก่อน" });
                    return;
                }
                const response = await sendToContentScript(tab.id, message);
                sendResponse(response);
            } catch (err) {
                sendResponse({ success: false, message: "Error: " + (err.message || "unknown") });
            }
        })();
        return true; // async
    }

    // After upscaling: find the latest downloaded video, trim last 1s, open in Chrome
    if (message?.action === "OPEN_LATEST_VIDEO") {
        chrome.downloads.search(
            { orderBy: ["-startTime"], limit: 5, state: "complete" },
            (downloads) => {
                if (chrome.runtime.lastError) {
                    sendResponse({ success: false, message: chrome.runtime.lastError.message });
                    return;
                }
                const videoFile = downloads.find((d) => {
                    const name = (d.filename || "").toLowerCase();
                    return name.endsWith(".mp4") || name.endsWith(".webm") || name.endsWith(".mov");
                });
                if (!videoFile) {
                    sendResponse({ success: false, message: "ไม่พบไฟล์วิดีโอที่ดาวน์โหลดล่าสุด" });
                    return;
                }

                const openFileInChrome = (filePath, label) => {
                    const url = "file:///" + filePath.replace(/\\/g, "/");
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
