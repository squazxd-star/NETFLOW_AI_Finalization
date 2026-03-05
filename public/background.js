// Netflow AI — Background Service Worker (Manifest V3)
// Opens the side panel when the extension icon is clicked.

chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Relay messages from sidepanel to content script on active tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message?.action === "GENERATE_IMAGE" || message?.action === "UPLOAD_IMAGES" || message?.action === "PING") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (!tab?.id) {
                sendResponse({ success: false, message: "No active tab found" });
                return;
            }
            chrome.tabs.sendMessage(tab.id, message, (response) => {
                if (chrome.runtime.lastError) {
                    sendResponse({
                        success: false,
                        message: "Content script not found on this page. Make sure Google Flow is open."
                    });
                } else {
                    sendResponse(response);
                }
            });
        });
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
