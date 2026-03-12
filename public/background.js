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

// ─── Anti-Throttle Timer via sendMessage (most reliable — wakes SW per call) ──
// Content script sends { type: 'TIMER_DELAY', ms } → SW setTimeout → sendResponse
// Not subject to tab throttling because response callbacks are event-driven.
// Falls through to onMessage handler below.

// ─── Anti-Throttle Timer Relay (fallback when Web Worker blocked by CSP) ─────
// Content scripts connect via chrome.runtime.connect({ name: 'timer' })
// and send { cmd: 'delay', id, ms }. We setTimeout here (NOT throttled in SW)
// and post back { id } when done. Keeps service worker alive via open port.
chrome.runtime.onConnect.addListener((port) => {
    if (port.name !== 'timer') return;
    port.onMessage.addListener((msg) => {
        if (msg.cmd === 'delay' && typeof msg.id === 'number' && typeof msg.ms === 'number') {
            setTimeout(() => {
                try { port.postMessage({ id: msg.id }); } catch (_) { /* port closed */ }
            }, msg.ms);
        }
    });
});

// ─── Per-Tab State Management (Multi-Tab Automation) ─────────────────────────
// Each tab gets its own isolated state: video cache, download info, automation status
const _tabStates = {};

function getTabState(tabId) {
    if (!tabId) return null;
    if (!_tabStates[tabId]) {
        _tabStates[tabId] = {
            cachedVideoDataUrl: null,
            cacheCleanupTimer: null,
            latestVideoFilePath: null,
            automationRunning: false,
            productName: null,
        };
    }
    return _tabStates[tabId];
}

// Clean up state + orphaned storage keys when tab is closed
chrome.tabs.onRemoved.addListener((tabId) => {
    if (_tabStates[tabId]) {
        clearTimeout(_tabStates[tabId].cacheCleanupTimer);
        delete _tabStates[tabId];
    }
    // Remove per-tab pending action key from storage
    const paKey = `netflow_pending_action_${tabId}`;
    chrome.storage.local.remove(paKey, () => {
        if (!chrome.runtime.lastError) {
            console.log(`[Netflow BG] Tab ${tabId} closed — state + storage cleaned up`);
        }
    });
});

// Legacy compat — global fallback for messages without tabId
let _cachedVideoDataUrl = null;
let _cacheCleanupTimer = null;
let _latestVideoFilePath = null;

// ─── Ensure full video is cached for YouTube upload ─────────────────────────
// Reads the FULL downloaded video file from disk (not just one scene from page)
// tabId: optional — if provided, uses per-tab state; otherwise global fallback
async function ensureFullVideoCached(tabId) {
    const ts = tabId ? getTabState(tabId) : null;
    const cachedUrl = ts ? ts.cachedVideoDataUrl : _cachedVideoDataUrl;

    // If we already have a cached video, check if it's reasonably sized (> 500KB = likely full video)
    if (cachedUrl && cachedUrl.length > 500000) {
        console.log('[Netflow BG] ensureFullVideoCached: already cached (' + (cachedUrl.length / 1024 / 1024).toFixed(1) + ' MB) tab=' + (tabId || 'global'));
        return;
    }

    console.log('[Netflow BG] ensureFullVideoCached: no valid cache — finding latest downloaded video... tab=' + (tabId || 'global'));

    // Find latest downloaded video file
    let videoFilePath = ts ? ts.latestVideoFilePath : _latestVideoFilePath;
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
            if (ts) ts.latestVideoFilePath = videoFilePath;
            _latestVideoFilePath = videoFilePath;
            console.log('[Netflow BG] Found latest download:', videoFilePath, 'tab=' + (tabId || 'global'));
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
                if (ts) ts.cachedVideoDataUrl = dataUrl;
                _cachedVideoDataUrl = dataUrl;
                console.log('[Netflow BG] ✅ Full video cached from file: ' + (blob.size / 1024 / 1024).toFixed(1) + ' MB tab=' + (tabId || 'global'));
                return;
            }
        }
    } catch (e) {
        console.warn('[Netflow BG] file:// fetch failed:', e.message);
    }

    // Strategy 2: Read via download URL (if HTTP)
    if (!downloadUrl && videoFilePath) {
        // Try to find the download entry for this file
        const downloads = await new Promise((resolve) => {
            chrome.downloads.search(
                { orderBy: ["-startTime"], limit: 10, state: "complete" },
                (results) => resolve(results || [])
            );
        });
        const match = downloads.find(d => d.filename === videoFilePath);
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
                    if (ts) ts.cachedVideoDataUrl = dataUrl;
                    _cachedVideoDataUrl = dataUrl;
                    console.log('[Netflow BG] ✅ Full video cached from download URL: ' + (blob.size / 1024 / 1024).toFixed(1) + ' MB tab=' + (tabId || 'global'));
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
            if (ts) ts.cachedVideoDataUrl = results[0].result.data;
            _cachedVideoDataUrl = results[0].result.data;
            console.log('[Netflow BG] ✅ Full video cached via tab injection: ' + (results[0].result.size / 1024 / 1024).toFixed(1) + ' MB tab=' + (tabId || 'global'));

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

    // ── GET_TAB_ID: Content script asks for its own tab ID ──
    if (message?.type === 'GET_TAB_ID') {
        const tabId = sender?.tab?.id || null;
        console.log('[Netflow BG] GET_TAB_ID:', tabId);
        sendResponse({ tabId });
        return true;
    }

    // ── TIMER_DELAY: Anti-throttle timer relay via sendMessage ──
    // Content script sends { type: 'TIMER_DELAY', ms } → SW waits ms → sendResponse
    // Response callbacks are NOT subject to Chrome's background tab throttling.
    if (message?.type === 'TIMER_DELAY' && typeof message.ms === 'number') {
        setTimeout(() => { sendResponse({ ok: true }); }, message.ms);
        return true; // keep channel open for async response
    }

    // ── FOCUS_TAB: Activate this tab AND bring Chrome window to foreground (for Slate.js paste) ──
    // Stores previous active tab so UNFOCUS_TAB can restore it.
    if (message?.type === 'FOCUS_TAB') {
        const tabId = sender?.tab?.id;
        if (!tabId) { sendResponse({ ok: false }); return true; }
        (async () => {
            try {
                const [prev] = await chrome.tabs.query({ active: true, currentWindow: true });
                const state = getTabState(tabId);
                if (state) state._prevFocusTabId = prev?.id;
                // ★ Bring Chrome WINDOW to foreground (critical when user switched to another app)
                const tab = await chrome.tabs.get(tabId);
                if (tab.windowId) {
                    await chrome.windows.update(tab.windowId, { focused: true });
                }
                await chrome.tabs.update(tabId, { active: true });
                console.log(`[Netflow BG] FOCUS_TAB: tab ${tabId}, window ${tab.windowId} (prev: ${prev?.id})`);
                sendResponse({ ok: true });
            } catch (e) {
                console.warn('[Netflow BG] FOCUS_TAB error:', e);
                sendResponse({ ok: false });
            }
        })();
        return true;
    }

    // ── UNFOCUS_TAB: Restore previous tab after FOCUS_TAB ──
    if (message?.type === 'UNFOCUS_TAB') {
        const tabId = sender?.tab?.id;
        const state = tabId ? getTabState(tabId) : null;
        const prev = state?._prevFocusTabId;
        if (state) delete state._prevFocusTabId;
        if (prev && prev !== tabId) {
            chrome.tabs.update(prev, { active: true }).catch(() => {});
            console.log(`[Netflow BG] UNFOCUS_TAB: restored tab ${prev}`);
        }
        sendResponse({ ok: true });
        return true;
    }

    // ── BRIEF_ACTIVATE_TAB: Content script asks to briefly activate its tab ──
    // This forces Chrome to render the page, updating stale DOM in background tabs.
    if (message?.type === 'BRIEF_ACTIVATE_TAB') {
        const requestingTabId = sender?.tab?.id;
        if (!requestingTabId) { sendResponse({ ok: false }); return true; }
        (async () => {
            try {
                // Remember which tab was active before
                const [prevActiveTab] = await chrome.tabs.query({ active: true, currentWindow: true });
                const prevTabId = prevActiveTab?.id;
                // ★ Bring Chrome WINDOW to foreground first
                const tab = await chrome.tabs.get(requestingTabId);
                if (tab.windowId) {
                    await chrome.windows.update(tab.windowId, { focused: true });
                }
                // Briefly activate the requesting tab
                await chrome.tabs.update(requestingTabId, { active: true });
                // Wait 800ms for DOM to render/update
                await new Promise(r => setTimeout(r, 800));
                // Switch back to the previous tab (if different)
                if (prevTabId && prevTabId !== requestingTabId) {
                    await chrome.tabs.update(prevTabId, { active: true });
                }
                console.log(`[Netflow BG] Brief tab activate: ${requestingTabId} → render forced → back to ${prevTabId}`);
                sendResponse({ ok: true });
            } catch (e) {
                console.warn('[Netflow BG] BRIEF_ACTIVATE_TAB error:', e);
                sendResponse({ ok: false });
            }
        })();
        return true;
    }

    // ── GET_ENGINE_TABS: Side panel requests list of engine tabs + status ──
    if (message?.type === 'GET_ENGINE_TABS') {
        (async () => {
            try {
                const engine = message.engine || 'veo';
                const config = ENGINE_CONFIG[engine] || ENGINE_CONFIG.veo;
                const engineTabs = await chrome.tabs.query({ url: config.urlPatterns });
                const tabInfos = engineTabs.map(t => ({
                    tabId: t.id,
                    title: t.title || ('Tab ' + t.id),
                    url: t.url,
                    running: !!(_tabStates[t.id]?.automationRunning),
                }));
                sendResponse({ tabs: tabInfos });
            } catch (e) {
                sendResponse({ tabs: [] });
            }
        })();
        return true;
    }

    // ── GET_TAB_PRODUCT_NAME: Return the productName stored for a specific engine tab ──
    if (message?.type === 'GET_TAB_PRODUCT_NAME') {
        const reqTabId = message.tabId;
        const ts = reqTabId ? _tabStates[reqTabId] : null;
        sendResponse({ productName: ts?.productName || '' });
        return true;
    }

    // ── AUTOMATION_FINISHED: Content script reports automation done ──
    if (message?.type === 'AUTOMATION_FINISHED') {
        const tabId = sender?.tab?.id;
        if (tabId && _tabStates[tabId]) {
            _tabStates[tabId].automationRunning = false;
            console.log('[Netflow BG] Automation finished on tab', tabId);
        }
        sendResponse({ success: true });
        return true;
    }

    // ── CACHE_VIDEO_DATA: Content script sends already-fetched video as data URL ──
    // This is the PRIMARY caching method — content script has auth cookies for Google CDN
    if (message?.type === 'CACHE_VIDEO_DATA' && message.data) {
        const tabId = sender?.tab?.id;
        const ts = tabId ? getTabState(tabId) : null;
        if (ts) ts.cachedVideoDataUrl = message.data;
        _cachedVideoDataUrl = message.data;
        const sizeMB = (message.data.length / 1024 / 1024).toFixed(1);
        console.log('[Netflow BG] Video data cached from content script: ' + sizeMB + ' MB tab=' + (tabId || 'global'));
        sendResponse({ success: true, size: message.data.length });
        return true;
    }

    // ── PEEK_CACHED_VIDEO: Non-destructive check if video is cached ──
    if (message?.type === 'PEEK_CACHED_VIDEO') {
        const tabId = sender?.tab?.id || message.tabId;
        const ts = tabId ? _tabStates[tabId] : null;
        const cached = (ts && ts.cachedVideoDataUrl) || _cachedVideoDataUrl;
        const hasCached = !!cached;
        const size = cached ? cached.length : 0;
        console.log('[Netflow BG] PEEK_CACHED_VIDEO: ' + (hasCached ? 'YES (' + (size / 1024 / 1024).toFixed(1) + ' MB)' : 'NO') + ' tab=' + (tabId || 'global'));
        sendResponse({ success: hasCached, cached: hasCached, size: size });
        return true;
    }

    // ── PRE_FETCH_VIDEO: Download video and cache as data URL ──
    if (message?.type === 'PRE_FETCH_VIDEO' && message.url) {
        const tabId = sender?.tab?.id || message.tabId;
        (async () => {
            try {
                console.log('[Netflow BG] PRE_FETCH_VIDEO:', message.url.substring(0, 80), 'tab=' + (tabId || 'global'));
                const resp = await fetch(message.url);
                if (!resp.ok) { sendResponse({ success: false, error: 'HTTP ' + resp.status }); return; }
                const blob = await resp.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    const ts = tabId ? getTabState(tabId) : null;
                    if (ts) ts.cachedVideoDataUrl = reader.result;
                    _cachedVideoDataUrl = reader.result;
                    console.log('[Netflow BG] Video cached: ' + (blob.size / 1024 / 1024).toFixed(1) + ' MB tab=' + (tabId || 'global'));
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
        const tabId = sender?.tab?.id || message.tabId;
        const ts = tabId ? _tabStates[tabId] : null;
        const cached = (ts && ts.cachedVideoDataUrl) || _cachedVideoDataUrl;
        if (cached) {
            console.log('[Netflow BG] Serving cached video data URL tab=' + (tabId || 'global'));
            sendResponse({ success: true, data: cached });
            // Auto-clear after 5 min per-tab
            if (ts) {
                clearTimeout(ts.cacheCleanupTimer);
                ts.cacheCleanupTimer = setTimeout(() => { ts.cachedVideoDataUrl = null; console.log('[Netflow BG] Tab ' + tabId + ' video cache auto-cleared'); }, 300000);
            }
            clearTimeout(_cacheCleanupTimer);
            _cacheCleanupTimer = setTimeout(() => { _cachedVideoDataUrl = null; console.log('[Netflow BG] Global video cache auto-cleared (5 min timeout)'); }, 300000);
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

    // ── VIDEO_GENERATION_COMPLETE: Store for panel reconnect + relay ──
    // Content-flow sends this when video is ready. Side panel receives it directly IF open.
    // If panel was closed/hidden, we store it in storage so panel can pick it up on next open.
    if (message?.type === 'VIDEO_GENERATION_COMPLETE') {
        console.log('[Netflow BG] VIDEO_GENERATION_COMPLETE received — storing for panel recovery');
        try {
            chrome.storage.local.set({
                netflow_pending_video_complete: {
                    videoUrl: message.videoUrl,
                    source: message.source || 'veo',
                    tabId: sender?.tab?.id || null,
                    timestamp: Date.now()
                }
            });
        } catch (_) {}
        // Relay to any open extension pages (side panel / popup) with small delay
        setTimeout(() => {
            try {
                chrome.runtime.sendMessage({
                    type: 'VIDEO_GENERATION_COMPLETE',
                    videoUrl: message.videoUrl,
                    source: message.source || 'veo',
                    tabId: sender?.tab?.id || null,
                    _fromBackground: true
                });
            } catch (_) {}
        }, 200);
        sendResponse({ ok: true });
        return true;
    }

    if (message?.action === "GENERATE_IMAGE" || message?.action === "UPLOAD_IMAGES" ||
        message?.action === "PING" || message?.action === "STOP_AUTOMATION" || message?.action === "CLICK_FIRST_IMAGE") {
        (async () => {
            try {
                // ── Engine-aware routing ──
                const engine = message.videoEngine || "veo";

                // If targetTabId specified, route directly to that tab
                let targetTab = null;
                const config = ENGINE_CONFIG[engine] || ENGINE_CONFIG.veo;
                if (message.targetTabId) {
                    try {
                        targetTab = await chrome.tabs.get(message.targetTabId);
                    } catch (_) { /* tab may not exist */ }
                }

                // Smart routing: find available (non-busy) engine tab
                if (!targetTab) {
                    if (message?.action === "GENERATE_IMAGE") {
                        // For GENERATE_IMAGE, prefer a non-busy tab
                        const engineTabs = await chrome.tabs.query({ url: config.urlPatterns });
                        // First try: non-busy tab
                        for (const t of engineTabs) {
                            if (!_tabStates[t.id]?.automationRunning) {
                                targetTab = t;
                                break;
                            }
                        }
                        // Fallback: any engine tab (even busy)
                        if (!targetTab && engineTabs.length > 0) {
                            targetTab = engineTabs[0];
                            console.log('[Netflow] All engine tabs busy, using first available');
                        }
                    }
                    // For PING/STOP/etc, use legacy findEngineTab
                    if (!targetTab) {
                        const result = await findEngineTab(engine);
                        targetTab = result.tab;
                    }
                }

                if (!targetTab?.id) {
                    const engineLabel = config.label || engine;
                    sendResponse({ success: false, message: `ไม่พบแท็บ ${engineLabel} — กรุณาเปิด ${config.urlIncludes} ก่อน` });
                    return;
                }
                console.log(`[Netflow] Routing ${message.action} to ${config.label} (tab ${targetTab.id})`);
                const response = await sendToContentScript(targetTab.id, message, config.contentScript);

                // Mark tab as busy for GENERATE_IMAGE + store productName per-tab
                if (message?.action === "GENERATE_IMAGE" && response?.success) {
                    const ts = getTabState(targetTab.id);
                    ts.automationRunning = true;
                    if (message.productName) {
                        ts.productName = message.productName;
                    }
                }

                // Include routed tabId in response so side panel knows which tab
                sendResponse({ ...response, _routedTabId: targetTab.id });
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
                await ensureFullVideoCached(message.sourceTabId);

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

                // Store the file path for YouTube upload (per-tab + global)
                const senderTabId = sender?.tab?.id;
                const senderTs = senderTabId ? getTabState(senderTabId) : null;
                if (senderTs) senderTs.latestVideoFilePath = videoFile.filename;
                _latestVideoFilePath = videoFile.filename;
                const downloadUrl = videoFile.url || videoFile.finalUrl || '';
                console.log('[Netflow BG] Stored latest video path:', _latestVideoFilePath, 'tab=' + (senderTabId || 'global'));

                // ── CRITICAL: Cache the FULL video BEFORE responding ──
                // This ensures captureVideoUrlAndPreFetch() sees PEEK_CACHED_VIDEO=true
                // and does NOT overwrite with the page video (which is only Scene 1)
                console.log('[Netflow BG] Caching FULL video before responding...');
                await ensureFullVideoCached(senderTabId);
                const cachedCheck = senderTs ? senderTs.cachedVideoDataUrl : _cachedVideoDataUrl;
                console.log('[Netflow BG] Full video cache done. Cached:', !!cachedCheck, cachedCheck ? (cachedCheck.length / 1024 / 1024).toFixed(1) + ' MB' : '');

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
