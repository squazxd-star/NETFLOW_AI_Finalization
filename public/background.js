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
// preferWindowId: when sidepanel sends its windowId, prefer tabs in that window
async function findEngineTab(engine, preferWindowId) {
    const config = ENGINE_CONFIG[engine] || ENGINE_CONFIG.veo;
    
    // Strategy 1: Find tab matching engine URL pattern (most reliable)
    const engineTabs = await chrome.tabs.query({ url: config.urlPatterns });
    if (engineTabs.length > 0) {
        // Multi-window: prefer tab in the SAME window as the requesting sidepanel
        if (preferWindowId) {
            const sameWindow = engineTabs.find(t => t.windowId === preferWindowId);
            if (sameWindow) {
                console.log(`[Netflow] Found ${config.label} tab in same window (${preferWindowId})`);
                return { tab: sameWindow, config };
            }
        }
        const active = engineTabs.find(t => t.active) || engineTabs[0];
        return { tab: active, config };
    }

    // Strategy 2: Fallback to active tab in preferred or current window
    const windowQuery = preferWindowId ? { active: true, windowId: preferWindowId } : { active: true, currentWindow: true };
    const activeTabs = await chrome.tabs.query(windowQuery);
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

// ─── TikTok Auto-Post: Video blob cache ──────────────────────────────────────
let _cachedVideoDataUrl = null;

// Relay messages from sidepanel / content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // ── PRE_FETCH_VIDEO: Download video and cache as data URL ──
    if (message?.type === 'PRE_FETCH_VIDEO' && message.url) {
        (async () => {
            try {
                console.log('[Netflow BG] PRE_FETCH_VIDEO:', message.url.substring(0, 80));
                const resp = await fetch(message.url);
                if (!resp.ok) { sendResponse({ success: false, error: 'HTTP ' + resp.status }); return; }
                const blob = await resp.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    _cachedVideoDataUrl = reader.result;
                    console.log('[Netflow BG] Video cached: ' + (blob.size / 1024 / 1024).toFixed(1) + ' MB');
                    sendResponse({ success: true, size: blob.size });
                };
                reader.onerror = () => { sendResponse({ success: false, error: 'FileReader error' }); };
                reader.readAsDataURL(blob);
            } catch (err) {
                console.warn('[Netflow BG] PRE_FETCH_VIDEO error:', err.message);
                sendResponse({ success: false, error: err.message });
            }
        })();
        return true;
    }

    // ── GET_CACHED_VIDEO: Return previously cached video data URL ──
    if (message?.type === 'GET_CACHED_VIDEO') {
        if (_cachedVideoDataUrl) {
            console.log('[Netflow BG] Serving cached video data URL');
            sendResponse({ success: true, data: _cachedVideoDataUrl });
        } else {
            sendResponse({ success: false, error: 'No cached video' });
        }
        return true;
    }

    // ── CACHE_VIDEO_FROM_FILE: Read video from the file:// tab and cache as data URL ──
    if (message?.type === 'CACHE_VIDEO_FROM_FILE' && message.fileTabId) {
        (async () => {
            try {
                const tabId = message.fileTabId;
                console.log('[Netflow BG] CACHE_VIDEO_FROM_FILE — waiting for file tab', tabId);

                // Wait for tab to finish loading (up to 15s)
                for (let i = 0; i < 15; i++) {
                    try {
                        const tab = await chrome.tabs.get(tabId);
                        if (tab.status === 'complete') break;
                    } catch (_) { break; }
                    await new Promise(r => setTimeout(r, 1000));
                }

                // Inject script to read the video file as data URL
                const results = await chrome.scripting.executeScript({
                    target: { tabId },
                    func: async () => {
                        try {
                            const resp = await fetch(window.location.href);
                            if (!resp.ok) return null;
                            const blob = await resp.blob();
                            return await new Promise((resolve) => {
                                const reader = new FileReader();
                                reader.onloadend = () => resolve({ data: reader.result, size: blob.size });
                                reader.onerror = () => resolve(null);
                                reader.readAsDataURL(blob);
                            });
                        } catch (e) {
                            return null;
                        }
                    }
                });

                const result = results?.[0]?.result;
                if (result?.data) {
                    _cachedVideoDataUrl = result.data;
                    console.log('[Netflow BG] ✅ Video cached from local file:', (result.size / 1024 / 1024).toFixed(1), 'MB');
                    sendResponse({ success: true, size: result.size });
                } else {
                    console.warn('[Netflow BG] Could not read video from file tab');
                    sendResponse({ success: false, error: 'Could not read video from file tab' });
                }
            } catch (err) {
                console.warn('[Netflow BG] CACHE_VIDEO_FROM_FILE error:', err.message);
                sendResponse({ success: false, error: err.message });
            }
        })();
        return true;
    }

    // ── FETCH_VIDEO_BLOB: Fetch video on-demand and return as data URL ──
    if (message?.type === 'FETCH_VIDEO_BLOB' && message.url) {
        (async () => {
            try {
                console.log('[Netflow BG] FETCH_VIDEO_BLOB:', message.url.substring(0, 80));
                const resp = await fetch(message.url);
                if (!resp.ok) { sendResponse({ success: false, error: 'HTTP ' + resp.status }); return; }
                const blob = await resp.blob();
                const reader = new FileReader();
                reader.onloadend = () => { sendResponse({ success: true, data: reader.result }); };
                reader.onerror = () => { sendResponse({ success: false, error: 'FileReader error' }); };
                reader.readAsDataURL(blob);
            } catch (err) {
                console.warn('[Netflow BG] FETCH_VIDEO_BLOB error:', err.message);
                sendResponse({ success: false, error: err.message });
            }
        })();
        return true;
    }

    if (message?.action === "GENERATE_IMAGE" || message?.action === "UPLOAD_IMAGES" ||
        message?.action === "PING" || message?.action === "STOP_AUTOMATION" || message?.action === "CLICK_FIRST_IMAGE") {
        (async () => {
            try {
                // ── Engine-aware routing ──
                const engine = message.videoEngine || "veo";
                const { tab, config } = await findEngineTab(engine, message.windowId);
                if (!tab?.id) {
                    const engineLabel = config.label || engine;
                    sendResponse({ success: false, message: `ไม่พบแท็บ ${engineLabel} — กรุณาเปิด ${config.urlIncludes} ก่อน` });
                    return;
                }
                console.log(`[Netflow] Routing to ${config.label} (tab ${tab.id})`);

                // ★ macOS fix: Always pre-inject content script before sending
                // (manifest auto-injection can silently fail after SPA navigation)
                await ensureContentScript(tab.id, config.contentScript);
                await new Promise(r => setTimeout(r, 500));

                // ★ PING pre-check: verify script is alive before sending the real command
                if (message.action !== "PING") {
                    const pingOk = await new Promise(resolve => {
                        const timer = setTimeout(() => resolve(false), 3000);
                        chrome.tabs.sendMessage(tab.id, { action: "PING" }, (resp) => {
                            clearTimeout(timer);
                            if (chrome.runtime.lastError || !resp?.status) resolve(false);
                            else resolve(true);
                        });
                    });
                    if (!pingOk) {
                        console.log('[Netflow] PING failed — re-injecting content script...');
                        await ensureContentScript(tab.id, config.contentScript);
                        await new Promise(r => setTimeout(r, 2000));
                    }
                }

                const response = await sendToContentScript(tab.id, message, config.contentScript);
                sendResponse(response);
            } catch (err) {
                sendResponse({ success: false, message: "Error: " + (err.message || "unknown") });
            }
        })();
        return true; // async
    }

    // ── UPLOAD_YOUTUBE: Open YouTube Studio + send upload command ──
    if (message?.action === 'UPLOAD_YOUTUBE') {
        (async () => {
            try {
                console.log('[Netflow BG] UPLOAD_YOUTUBE — opening YouTube Studio');

                // ── Cache the correct video for YouTube upload ──
                if (message.videoUrl && message.videoUrl.startsWith('http')) {
                    // HTTP URL: fetch directly and cache
                    console.log('[Netflow BG] Pre-fetching video for YouTube...');
                    try {
                        const resp = await fetch(message.videoUrl);
                        if (resp.ok) {
                            const blob = await resp.blob();
                            const reader = new FileReader();
                            await new Promise((resolve, reject) => {
                                reader.onloadend = () => { _cachedVideoDataUrl = reader.result; resolve(true); };
                                reader.onerror = reject;
                                reader.readAsDataURL(blob);
                            });
                            console.log('[Netflow BG] Video cached for YouTube (HTTP fetch)');
                        }
                    } catch (e) {
                        console.warn('[Netflow BG] Pre-fetch failed:', e.message);
                    }
                } else if (message.videoUrl && message.videoUrl.startsWith('file://')) {
                    // file:// URL: find the tab showing this file and read via injected script
                    console.log('[Netflow BG] Video is file:// URL — reading from file tab...');
                    try {
                        const allTabs = await chrome.tabs.query({});
                        const fileTab = allTabs.find(t => t.url && t.url.replace(/\\/g, '/') === message.videoUrl.replace(/\\/g, '/'));
                        if (fileTab && fileTab.id) {
                            // Wait for the tab to finish loading
                            for (let wi = 0; wi < 15; wi++) {
                                try {
                                    const tabInfo = await chrome.tabs.get(fileTab.id);
                                    if (tabInfo.status === 'complete') break;
                                } catch (_) { break; }
                                await new Promise(r => setTimeout(r, 1000));
                            }
                            // Read video as data URL from the file tab
                            const results = await chrome.scripting.executeScript({
                                target: { tabId: fileTab.id },
                                func: async () => {
                                    try {
                                        const resp = await fetch(window.location.href);
                                        if (!resp.ok) return null;
                                        const blob = await resp.blob();
                                        return await new Promise((resolve) => {
                                            const reader = new FileReader();
                                            reader.onloadend = () => resolve({ data: reader.result, size: blob.size });
                                            reader.onerror = () => resolve(null);
                                            reader.readAsDataURL(blob);
                                        });
                                    } catch (e) { return null; }
                                }
                            });
                            const fileResult = results?.[0]?.result;
                            if (fileResult?.data) {
                                _cachedVideoDataUrl = fileResult.data;
                                console.log('[Netflow BG] ✅ Video cached from file tab:', (fileResult.size / 1024 / 1024).toFixed(1), 'MB');
                            } else {
                                console.warn('[Netflow BG] Could not read video from file tab');
                            }
                        } else {
                            console.warn('[Netflow BG] No tab found with file URL:', message.videoUrl);
                        }
                    } catch (e) {
                        console.warn('[Netflow BG] file:// cache failed:', e.message);
                    }
                } else if (_cachedVideoDataUrl) {
                    console.log('[Netflow BG] Using existing cached video for YouTube');
                }

                // Find existing YouTube Studio tab or create new one
                let ytTabs = await chrome.tabs.query({ url: 'https://studio.youtube.com/*' });
                let ytTab;
                if (ytTabs.length > 0) {
                    ytTab = ytTabs[0];
                    await chrome.tabs.update(ytTab.id, { active: true });
                } else {
                    ytTab = await chrome.tabs.create({ url: 'https://studio.youtube.com' });
                }

                // Wait for tab to finish loading
                await new Promise((resolve) => {
                    let resolved = false;
                    const checkTab = async () => {
                        try {
                            const tab = await chrome.tabs.get(ytTab.id);
                            if (tab.status === 'complete') { if (!resolved) { resolved = true; resolve(true); } return; }
                        } catch (_) {}
                        if (!resolved) setTimeout(checkTab, 500);
                    };
                    setTimeout(checkTab, 2000);
                    // Safety timeout: resolve after 15 seconds regardless
                    setTimeout(() => { if (!resolved) { resolved = true; resolve(true); } }, 15000);
                });
                console.log('[Netflow BG] YouTube Studio tab loaded');

                // Ensure content script is injected
                try {
                    await chrome.scripting.executeScript({
                        target: { tabId: ytTab.id },
                        files: ['src/content-youtube-upload.js']
                    });
                } catch (e) {
                    console.warn('[Netflow BG] YT script injection:', e.message);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Ping content script to verify it's ready (retry up to 10 times)
                let scriptReady = false;
                for (let attempt = 0; attempt < 10; attempt++) {
                    try {
                        const pingResp = await new Promise((resolve) => {
                            chrome.tabs.sendMessage(ytTab.id, { action: 'PING' }, (resp) => {
                                if (chrome.runtime.lastError) { resolve(null); return; }
                                resolve(resp);
                            });
                        });
                        if (pingResp && pingResp.success) {
                            console.log('[Netflow BG] Content script ready (attempt ' + (attempt + 1) + ')');
                            scriptReady = true;
                            break;
                        }
                    } catch (_) {}
                    await new Promise(resolve => setTimeout(resolve, 1500));
                }
                if (!scriptReady) {
                    console.warn('[Netflow BG] Content script not responding after 10 attempts');
                    sendResponse({ success: false, error: 'YouTube content script not ready' });
                    return;
                }

                // Send upload command to content script
                chrome.tabs.sendMessage(ytTab.id, {
                    action: 'UPLOAD_YOUTUBE',
                    title: message.title || '',
                    description: message.description || '',
                    madeForKids: message.madeForKids || false,
                    visibility: message.visibility || 'public',
                    scheduleEnabled: message.scheduleEnabled || false,
                    scheduleDate: message.scheduleDate || '',
                    scheduleTime: message.scheduleTime || '',
                    theme: message.theme || 'green',
                }, (resp) => {
                    if (chrome.runtime.lastError) {
                        console.warn('[Netflow BG] YT sendMessage error:', chrome.runtime.lastError.message);
                        sendResponse({ success: false, error: chrome.runtime.lastError.message });
                    } else {
                        sendResponse(resp || { success: true });
                    }
                });
            } catch (err) {
                console.error('[Netflow BG] UPLOAD_YOUTUBE error:', err.message);
                sendResponse({ success: false, error: err.message });
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

                // Grab the actual download URL (HTTPS CDN URL) for re-caching full video
                const downloadUrl = videoFile.finalUrl || videoFile.url || '';

                const openFileInChrome = (filePath, label) => {
                    // Normalize path for both Windows (C:\...) and Mac (/Users/...)
                    const normalized = filePath.replace(/\\/g, "/");
                    const url = normalized.startsWith("/")
                        ? "file://" + normalized        // Mac: file:///Users/...  (2 slashes + leading /)
                        : "file:///" + normalized;      // Win: file:///C:/Users/...
                    chrome.tabs.create({ url }, (tab) => {
                        sendResponse({ success: true, message: label, filename: filePath, downloadUrl: downloadUrl, fileTabId: tab?.id || null });
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
