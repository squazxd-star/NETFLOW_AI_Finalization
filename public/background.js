// Netflow AI — Background Service Worker (Manifest V3)
// Opens the side panel when the extension icon is clicked.
// Cross-platform: Windows + macOS compatible

// Open side panel when extension icon is clicked (explicit + reliable)
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});

// Fallback: explicitly open side panel on action click
chrome.action.onClicked.addListener(async (tab) => {
    try {
        await chrome.sidePanel.open({ windowId: tab.windowId });
    } catch (e) {
        console.warn('[Netflow] sidePanel.open failed:', e);
    }
});

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

// ─── TikTok Auto-Post: Video blob cache ──────────────────────────────────────
let _cachedVideoDataUrl = null;
let _cacheCleanupTimer = null;
let _latestVideoFilePath = null;  // Full path to latest downloaded video (e.g. C:\Users\...\video.mp4)

// ─── Ensure full video is cached for YouTube upload ─────────────────────────
// Reads the FULL downloaded video file from disk (not just one scene from page)
async function ensureFullVideoCached() {
    // If we already have a cached video, check if it's reasonably sized (> 500KB = likely full video)
    if (_cachedVideoDataUrl && _cachedVideoDataUrl.length > 500000) {
        console.log('[Netflow BG] ensureFullVideoCached: already cached (' + (_cachedVideoDataUrl.length / 1024 / 1024).toFixed(1) + ' MB)');
        return;
    }

    console.log('[Netflow BG] ensureFullVideoCached: no valid cache — finding latest downloaded video...');

    // Find latest downloaded video file
    let videoFilePath = _latestVideoFilePath;
    let downloadUrl = null;

    if (!videoFilePath) {
        // Search recent downloads for the latest video
        const downloads = await new Promise((resolve) => {
            chrome.downloads.search(
                { orderBy: ["-startTime"], limit: 10, state: "complete" },
                (results) => resolve(results || [])
            );
        });
        const videoDownload = downloads.find(d => {
            const name = (d.filename || "").toLowerCase();
            return name.endsWith(".mp4") || name.endsWith(".webm") || name.endsWith(".mov");
        });
        if (videoDownload) {
            videoFilePath = videoDownload.filename;
            downloadUrl = videoDownload.url || videoDownload.finalUrl || '';
            _latestVideoFilePath = videoFilePath;
            console.log('[Netflow BG] Found latest download:', videoFilePath);
        }
    }

    if (!videoFilePath) {
        console.warn('[Netflow BG] ensureFullVideoCached: no video file path found');
        return;
    }

    // Strategy 1: Read from file system via file:// URL
    try {
        const normalized = videoFilePath.replace(/\\/g, "/");
        const fileUrl = normalized.startsWith("/") ? "file://" + normalized : "file:///" + normalized;
        console.log('[Netflow BG] Trying to read video from file://', fileUrl.substring(0, 80));

        const resp = await fetch(fileUrl);
        if (resp.ok) {
            const blob = await resp.blob();
            if (blob.size > 10000) {
                const dataUrl = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(blob);
                });
                _cachedVideoDataUrl = dataUrl;
                console.log('[Netflow BG] ✅ Full video cached from file: ' + (blob.size / 1024 / 1024).toFixed(1) + ' MB');
                return;
            }
        }
    } catch (e) {
        console.warn('[Netflow BG] file:// fetch failed:', e.message);
    }

    // Strategy 2: Read via download URL (if HTTP)
    if (!downloadUrl && _latestVideoFilePath) {
        // Try to find the download entry for this file
        const downloads = await new Promise((resolve) => {
            chrome.downloads.search(
                { orderBy: ["-startTime"], limit: 10, state: "complete" },
                (results) => resolve(results || [])
            );
        });
        const match = downloads.find(d => d.filename === _latestVideoFilePath);
        if (match) downloadUrl = match.url || match.finalUrl || '';
    }

    if (downloadUrl && downloadUrl.startsWith('http')) {
        try {
            console.log('[Netflow BG] Trying download URL:', downloadUrl.substring(0, 80));
            const resp = await fetch(downloadUrl);
            if (resp.ok) {
                const blob = await resp.blob();
                if (blob.size > 10000) {
                    const dataUrl = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                    _cachedVideoDataUrl = dataUrl;
                    console.log('[Netflow BG] ✅ Full video cached from download URL: ' + (blob.size / 1024 / 1024).toFixed(1) + ' MB');
                    return;
                }
            }
        } catch (e) {
            console.warn('[Netflow BG] Download URL fetch failed:', e.message);
        }
    }

    // Strategy 3: Open the file in a temporary tab and inject a reader script
    try {
        const normalized = videoFilePath.replace(/\\/g, "/");
        const fileUrl = normalized.startsWith("/") ? "file://" + normalized : "file:///" + normalized;

        // Check if there's already a tab with this file open
        const existingTabs = await chrome.tabs.query({ url: fileUrl });
        let fileTab;
        if (existingTabs.length > 0) {
            fileTab = existingTabs[0];
            console.log('[Netflow BG] Found existing file tab:', fileTab.id);
        } else {
            // Open file in a background tab
            fileTab = await chrome.tabs.create({ url: fileUrl, active: false });
            console.log('[Netflow BG] Opened file in background tab:', fileTab.id);
            // Wait for tab to load
            await new Promise(r => setTimeout(r, 3000));
        }

        // Inject script to read the video file and send back as data URL
        const results = await chrome.scripting.executeScript({
            target: { tabId: fileTab.id },
            func: () => {
                return new Promise((resolve) => {
                    fetch(location.href)
                        .then(r => r.blob())
                        .then(blob => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve({ success: true, data: reader.result, size: blob.size });
                            reader.onerror = () => resolve({ success: false, error: 'FileReader error' });
                            reader.readAsDataURL(blob);
                        })
                        .catch(e => resolve({ success: false, error: e.message }));
                });
            },
        });

        if (results && results[0] && results[0].result && results[0].result.success) {
            _cachedVideoDataUrl = results[0].result.data;
            console.log('[Netflow BG] ✅ Full video cached via tab injection: ' + (results[0].result.size / 1024 / 1024).toFixed(1) + ' MB');

            // Close the background tab if we opened it
            if (!existingTabs.length) {
                try { chrome.tabs.remove(fileTab.id); } catch (_) {}
            }
            return;
        } else {
            console.warn('[Netflow BG] Tab injection read failed:', results?.[0]?.result?.error);
            // Close the background tab if we opened it
            if (!existingTabs.length) {
                try { chrome.tabs.remove(fileTab.id); } catch (_) {}
            }
        }
    } catch (e) {
        console.warn('[Netflow BG] Tab injection strategy failed:', e.message);
    }

    console.warn('[Netflow BG] ensureFullVideoCached: all strategies failed — YouTube upload may use incomplete video');
}

// Relay messages from sidepanel / content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // ── CACHE_VIDEO_DATA: Content script sends already-fetched video as data URL ──
    // This is the PRIMARY caching method — content script has auth cookies for Google CDN
    if (message?.type === 'CACHE_VIDEO_DATA' && message.data) {
        _cachedVideoDataUrl = message.data;
        const sizeMB = (message.data.length / 1024 / 1024).toFixed(1);
        console.log('[Netflow BG] Video data cached from content script: ' + sizeMB + ' MB');
        sendResponse({ success: true, size: message.data.length });
        return true;
    }

    // ── PEEK_CACHED_VIDEO: Non-destructive check if video is cached ──
    if (message?.type === 'PEEK_CACHED_VIDEO') {
        const hasCached = !!_cachedVideoDataUrl;
        const size = _cachedVideoDataUrl ? _cachedVideoDataUrl.length : 0;
        console.log('[Netflow BG] PEEK_CACHED_VIDEO: ' + (hasCached ? 'YES (' + (size / 1024 / 1024).toFixed(1) + ' MB)' : 'NO'));
        sendResponse({ success: hasCached, cached: hasCached, size: size });
        return true;
    }

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
            console.log('[Netflow BG] Serving cached video data URL (keeping for retries)');
            sendResponse({ success: true, data: _cachedVideoDataUrl });
            // Don't clear immediately — keep for retries. Auto-clear after 5 min.
            clearTimeout(_cacheCleanupTimer);
            _cacheCleanupTimer = setTimeout(() => { _cachedVideoDataUrl = null; console.log('[Netflow BG] Video cache auto-cleared (5 min timeout)'); }, 300000);
        } else {
            sendResponse({ success: false, error: 'No cached video' });
        }
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

    // ── UPLOAD_YOUTUBE: Open YouTube Studio, inject content script, forward config ──
    if (message?.action === 'UPLOAD_YOUTUBE') {
        (async () => {
            try {
                console.log('[Netflow BG] UPLOAD_YOUTUBE received');

                // ── STEP 0: Ensure FULL video is cached (not just one scene) ──
                await ensureFullVideoCached();

                // Find existing YouTube Studio tab or create new one
                const ytTabs = await chrome.tabs.query({ url: "https://studio.youtube.com/*" });
                let tab;
                if (ytTabs.length > 0) {
                    tab = ytTabs[0];
                    await chrome.tabs.update(tab.id, { active: true });
                    console.log('[Netflow BG] Reusing existing YouTube Studio tab:', tab.id);
                } else {
                    tab = await chrome.tabs.create({ url: "https://studio.youtube.com/", active: true });
                    console.log('[Netflow BG] Created new YouTube Studio tab:', tab.id);
                }

                // Wait for tab to fully load
                await new Promise((resolve) => {
                    const checkLoaded = () => {
                        chrome.tabs.get(tab.id, (t) => {
                            if (chrome.runtime.lastError || !t) { resolve(); return; }
                            if (t.status === 'complete') { resolve(); return; }
                            setTimeout(checkLoaded, 500);
                        });
                    };
                    // Start checking after a short delay
                    setTimeout(checkLoaded, 2000);
                    // Safety timeout
                    setTimeout(resolve, 15000);
                });

                // Ensure content script is injected
                try {
                    await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ["src/content-youtube-upload.js"],
                    });
                    console.log('[Netflow BG] YouTube content script injected');
                } catch (e) {
                    console.warn('[Netflow BG] YouTube script injection (may already be loaded):', e.message);
                }

                // Wait a moment for script to initialize
                await new Promise(r => setTimeout(r, 2000));

                // Forward upload config to content script
                chrome.tabs.sendMessage(tab.id, {
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
                        console.warn('[Netflow BG] YouTube content script message failed:', chrome.runtime.lastError.message);
                        sendResponse({ success: false, error: chrome.runtime.lastError.message });
                    } else {
                        console.log('[Netflow BG] YouTube upload forwarded to content script');
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
        (async () => {
            try {
                const afterTs = message.afterTimestamp || 0;
                const downloads = await new Promise((resolve) => {
                    chrome.downloads.search(
                        { orderBy: ["-startTime"], limit: 10, state: "complete" },
                        (results) => resolve(results || [])
                    );
                });

                const videoFile = downloads.find((d) => {
                    const name = (d.filename || "").toLowerCase();
                    const isVideo = name.endsWith(".mp4") || name.endsWith(".webm") || name.endsWith(".mov");
                    if (!isVideo) return false;
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

                // Store the file path for YouTube upload
                _latestVideoFilePath = videoFile.filename;
                const downloadUrl = videoFile.url || videoFile.finalUrl || '';
                console.log('[Netflow BG] Stored latest video path:', _latestVideoFilePath);

                // ── CRITICAL: Cache the FULL video BEFORE responding ──
                // This ensures captureVideoUrlAndPreFetch() sees PEEK_CACHED_VIDEO=true
                // and does NOT overwrite with the page video (which is only Scene 1)
                console.log('[Netflow BG] Caching FULL video before responding...');
                await ensureFullVideoCached();
                console.log('[Netflow BG] Full video cache done. Cached:', !!_cachedVideoDataUrl, _cachedVideoDataUrl ? (_cachedVideoDataUrl.length / 1024 / 1024).toFixed(1) + ' MB' : '');

                // Open file in Chrome
                const openFileInChrome = (filePath, label) => {
                    const normalized = filePath.replace(/\\/g, "/");
                    const url = normalized.startsWith("/")
                        ? "file://" + normalized
                        : "file:///" + normalized;
                    chrome.tabs.create({ url }, () => {
                        sendResponse({ success: true, message: label, filename: filePath, downloadUrl: downloadUrl });
                    });
                };

                // Try trimming via native host (FFmpeg)
                try {
                    chrome.runtime.sendNativeMessage(
                        "com.netflow.trimvideo",
                        { filePath: videoFile.filename, trimSeconds: 1 },
                        (response) => {
                            if (chrome.runtime.lastError || !response?.success) {
                                const reason = chrome.runtime.lastError?.message || response?.error || "unknown";
                                console.log("[Netflow] Trim skipped: " + reason);
                                const name = videoFile.filename.split(/[\\/]/).pop();
                                openFileInChrome(videoFile.filename, `เปิดใน Chrome: ${name}`);
                            } else {
                                const name = response.trimmedPath.split(/[\\/]/).pop();
                                console.log("[Netflow] Trimmed: " + response.trimmedPath);
                                openFileInChrome(response.trimmedPath, `✂️ Trimmed & opened: ${name} (${response.trimmedDuration}s)`);
                            }
                        }
                    );
                } catch (e) {
                    const name = videoFile.filename.split(/[\\/]/).pop();
                    openFileInChrome(videoFile.filename, `เปิดใน Chrome: ${name}`);
                }
            } catch (err) {
                console.error('[Netflow BG] OPEN_LATEST_VIDEO error:', err);
                sendResponse({ success: false, message: err.message || 'Unknown error' });
            }
        })();
        return true; // async
    }
});
