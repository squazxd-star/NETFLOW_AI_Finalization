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
 *   GENERATE_IMAGE — configure → upload refs → paste prompt → click generate
 *   PING           — health check
 */

import { showOverlay, hideOverlay, updateStep, skipStep, completeOverlay, configureScenes, addLog, setOverlayTheme } from "./netflow-overlay";

// ─── Multi-Tab: Discover own tab ID from background ─────────────────────
let _myTabId: number | null = null;
let _tabIdResolve: ((id: number | null) => void) | null = null;
const _tabIdReady: Promise<number | null> = new Promise((resolve) => {
    _tabIdResolve = resolve;
    // Safety timeout — don't block forever if background doesn't respond
    setTimeout(() => resolve(null), 2000);
});
try {
    chrome.runtime.sendMessage({ type: 'GET_TAB_ID' }, (res) => {
        if (!chrome.runtime.lastError && res?.tabId) {
            _myTabId = res.tabId;
            console.log(`[Netflow AI] Tab ID: ${_myTabId}`);
        }
        if (_tabIdResolve) { _tabIdResolve(_myTabId); _tabIdResolve = null; }
    });
} catch (_) {
    if (_tabIdResolve) { _tabIdResolve(null); _tabIdResolve = null; }
}

/** Storage key helper — per-tab when tabId known, global fallback otherwise */
function pendingActionKey(): string {
    return _myTabId ? `netflow_pending_action_${_myTabId}` : "netflow_pending_action";
}

/** Notify background that automation is finished on this tab */
function notifyAutomationFinished(): void {
    try { chrome.runtime.sendMessage({ type: 'AUTOMATION_FINISHED' }); } catch (_) {}
}

const LOG = (msg: string) => {
    console.log(`[Netflow AI] ${msg}`);
    try { addLog(msg); } catch (_) { /* overlay not ready */ }
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg }); } catch (_) { /* popup closed */ }
};
const WARN = (msg: string) => {
    console.warn(`[Netflow AI] ${msg}`);
    try { addLog(`⚠️ ${msg}`); } catch (_) { /* overlay not ready */ }
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `⚠️ ${msg}` }); } catch (_) { /* popup closed */ }
};

// ─── Close Automation Tab ────────────────────────────────────────────────────
/** ปิดแท็บ automation (Google Flow) หลังแสดงผลวิดีโอเสร็จ */
function closeAutomationTab(delayMs: number = 3000): void {
    LOG(`🔒 จะปิดแท็บ automation ใน ${delayMs / 1000} วินาที...`);
    setTimeout(() => {
        try {
            chrome.runtime.sendMessage({ action: "CLOSE_AUTOMATION_TAB" }, (res) => {
                if (chrome.runtime.lastError) {
                    WARN(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`);
                } else {
                    LOG(`✅ ปิดแท็บแล้ว: ${res?.message}`);
                }
            });
        } catch (e: any) {
            WARN(`ปิดแท็บผิดพลาด: ${e.message}`);
        }
    }, delayMs);
}

// ─── TikTok Auto-Post: Capture video URL and notify React hook ──────────────
/**
 * Grab <video> src from the current page, fetch the blob DIRECTLY from the
 * content script (which has Google auth cookies), convert to data URL,
 * and cache it in the background service worker via CACHE_VIDEO_DATA.
 *
 * The background service worker CANNOT fetch Google's authenticated CDN URLs,
 * but the content script CAN because it runs on the same origin (labs.google).
 */
async function captureVideoUrlAndPreFetch(): Promise<string | null> {
    try {
        // ── FIRST: Check if background already has a cached video (from OPEN_LATEST_VIDEO download) ──
        // If yes, DON'T overwrite — that's the correct FULL video, not a page preview
        const alreadyCached = await new Promise<boolean>((resolve) => {
            try {
                chrome.runtime.sendMessage({ type: "PEEK_CACHED_VIDEO" }, (resp) => {
                    if (chrome.runtime.lastError) { resolve(false); return; }
                    resolve(!!resp?.cached);
                });
            } catch { resolve(false); }
        });

        if (alreadyCached) {
            LOG("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");
            // Return the page video URL for reference only, but don't re-cache
            const videos = document.querySelectorAll<HTMLVideoElement>("video");
            for (const v of videos) {
                const src = v.src || v.currentSrc || "";
                if (src) return src;
            }
            return null;
        }

        LOG("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");

        const videos = document.querySelectorAll<HTMLVideoElement>("video");
        let videoUrl: string | null = null;
        let bestArea = 0;

        // Find the LARGEST visible video element (most likely the generated video)
        for (const v of videos) {
            // Check v.src first, then <source> children
            let src = v.src || "";
            if (!src) {
                const sourceEl = v.querySelector("source");
                if (sourceEl) src = sourceEl.getAttribute("src") || "";
            }
            // Also try currentSrc (works for blob: URLs and resolved sources)
            if (!src && v.currentSrc) src = v.currentSrc;
            if (!src) continue;

            if (_hidden()) {
                // When minimized, can't measure size — pick first video with src
                if (!videoUrl) { videoUrl = src; bestArea = 1; }
                continue;
            }
            const r = v.getBoundingClientRect();
            const area = r.width * r.height;
            if (r.width > 50 && area > bestArea) {
                bestArea = area;
                videoUrl = src;
            }
        }
        if (!videoUrl) { LOG("[TikTok] ไม่พบ video URL บนหน้า"); return null; }
        LOG(`[TikTok] พบ video URL: ${videoUrl.substring(0, 80)}... (area=${bestArea.toFixed(0)})`);

        // ── Fetch the video blob FROM the content script (has auth cookies) ──
        try {
            LOG("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");
            const resp = await fetch(videoUrl);
            if (!resp.ok) {
                LOG(`[TikTok] fetch failed: HTTP ${resp.status}`);
                // Fallback: try PRE_FETCH_VIDEO via background (may fail for auth URLs)
                await preFetchViaBackground(videoUrl);
                return videoUrl;
            }
            const blob = await resp.blob();
            const sizeMB = (blob.size / 1024 / 1024).toFixed(1);
            LOG(`[TikTok] Video blob fetched: ${sizeMB} MB, type: ${blob.type}`);

            if (blob.size < 100000) {
                LOG(`[TikTok] ⚠️ Blob เล็กเกินไป (${blob.size} bytes) — อาจเป็น thumbnail`);
                // Still cache it as fallback, but warn
            }

            // Convert blob → data URL
            const dataUrl = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = () => reject(new Error("FileReader error"));
                reader.readAsDataURL(blob);
            });
            LOG(`[TikTok] Data URL พร้อม: ${(dataUrl.length / 1024 / 1024).toFixed(1)} MB`);

            // Send data URL to background for caching
            await new Promise<void>((resolve) => {
                chrome.runtime.sendMessage({ type: "CACHE_VIDEO_DATA", data: dataUrl }, (resp) => {
                    if (chrome.runtime.lastError) {
                        LOG(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`);
                    } else if (resp?.success) {
                        LOG("[TikTok] ✅ Video cached in background service worker");
                    } else {
                        LOG(`[TikTok] CACHE_VIDEO_DATA failed: ${resp?.error}`);
                    }
                    resolve();
                });
            });
        } catch (e: any) {
            LOG(`[TikTok] Content script fetch error: ${e.message}`);
            // Fallback: try PRE_FETCH_VIDEO via background
            await preFetchViaBackground(videoUrl);
        }
        return videoUrl;
    } catch (e: any) {
        LOG(`[TikTok] captureVideoUrl error: ${e.message}`);
        return null;
    }
}

/** Fallback: ask background to fetch (works only for public/non-auth URLs) */
async function preFetchViaBackground(videoUrl: string): Promise<void> {
    if (!videoUrl.startsWith("https://")) return;
    try {
        await new Promise<void>((resolve) => {
            chrome.runtime.sendMessage({ type: "PRE_FETCH_VIDEO", url: videoUrl }, (resp) => {
                if (chrome.runtime.lastError) {
                    LOG(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`);
                } else if (resp?.success) {
                    LOG(`[TikTok] Video pre-fetched via background: ${((resp.size || 0) / 1024 / 1024).toFixed(1)} MB`);
                } else {
                    LOG(`[TikTok] PRE_FETCH_VIDEO failed: ${resp?.error}`);
                }
                resolve();
            });
        });
    } catch (_) { /* silent */ }
}

/** Send VIDEO_GENERATION_COMPLETE to React hook so TikTok auto-post can trigger */
function sendVideoGenerationComplete(videoUrl: string | null): void {
    if (!videoUrl) return;
    
    // Prevent duplicate sends in the same session
    if ((window as any).__VIDEO_COMPLETE_SENT__) {
        LOG(`[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate`);
        return;
    }
    (window as any).__VIDEO_COMPLETE_SENT__ = true;
    
    try {
        chrome.runtime.sendMessage({
            type: "VIDEO_GENERATION_COMPLETE",
            videoUrl,
            source: "veo"
        });
        LOG(`[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)`);
    } catch (_) { /* popup/sidepanel closed */ }
}

// ─── Platform Detection ─────────────────────────────────────────────────────
const isMac = /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent);
const isWindows = /Win/i.test(navigator.userAgent);
const platformTag = isMac ? '🍎 Mac' : isWindows ? '🪟 Win' : '🐧 Other';

LOG(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${platformTag}`);

// Reset duplicate prevention flag on script load
(window as any).__VIDEO_COMPLETE_SENT__ = false;

// ─── Helpers ────────────────────────────────────────────────────────────────

class NetflowAbortError extends Error {
    constructor() { super("AUTOMATION_STOPPED"); this.name = "NetflowAbortError"; }
}

// ─── Anti-Throttle: Web Worker Timer + Port Relay Fallback ──────────────────
// Chrome throttles setTimeout in background/minimized tabs (1s min, or 1/min after 5 min).
// Strategy 1: Web Worker (separate thread, NOT throttled)
// Strategy 2: chrome.runtime.connect port relay (background SW setTimeout, NOT throttled)
// Strategy 3: regular setTimeout (last resort, throttled)
let _timerWorker: Worker | null = null;
let _timerPort: chrome.runtime.Port | null = null;
let _timerPortFailed = false;
const _pendingTimers = new Map<number, () => void>();
let _timerIdCounter = 0;

function getTimerWorker(): Worker | null {
    if (_timerWorker) return _timerWorker;
    try {
        const blob = new Blob([
            `self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};`
        ], { type: 'application/javascript' });
        _timerWorker = new Worker(URL.createObjectURL(blob));
        _timerWorker.onmessage = (e: MessageEvent) => {
            const cb = _pendingTimers.get(e.data);
            if (cb) { _pendingTimers.delete(e.data); cb(); }
        };
        console.log('[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated');
        return _timerWorker;
    } catch (_) {
        console.warn('[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay');
        return null;
    }
}

function getTimerPort(): chrome.runtime.Port | null {
    if (_timerPort) return _timerPort;
    if (_timerPortFailed) return null;
    try {
        _timerPort = chrome.runtime.connect({ name: 'timer' });
        _timerPort.onMessage.addListener((msg: any) => {
            const cb = _pendingTimers.get(msg.id);
            if (cb) { _pendingTimers.delete(msg.id); cb(); }
        });
        _timerPort.onDisconnect.addListener(() => {
            _timerPort = null; // will reconnect on next sleep
        });
        console.log('[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated');
        return _timerPort;
    } catch (_) {
        _timerPortFailed = true;
        console.warn('[Netflow AI] Port relay unavailable — falling back to setTimeout');
        return null;
    }
}

const sleep = (ms: number) => new Promise<void>((resolve, reject) => {
    if ((window as any).__NETFLOW_STOP__) return reject(new NetflowAbortError());

    let resolved = false;
    const done = () => {
        if (resolved) return;
        resolved = true;
        if ((window as any).__NETFLOW_STOP__) return reject(new NetflowAbortError());
        resolve();
    };

    // Strategy 1: Web Worker (best — separate thread, immune to tab throttling)
    const worker = getTimerWorker();
    if (worker) {
        const id = ++_timerIdCounter;
        _pendingTimers.set(id, done);
        worker.postMessage({ id, ms });
        // Safety: if Worker created but CSP blocks execution, sendMessage fires as backup
        try {
            chrome.runtime.sendMessage({ type: 'TIMER_DELAY', ms: ms + 2000 }, () => {
                if (!chrome.runtime.lastError) done();
            });
        } catch (_) { /* no backup available */ }
        return;
    }

    // Strategy 2: sendMessage relay via background SW (wakes SW per call, NOT throttled)
    try {
        chrome.runtime.sendMessage({ type: 'TIMER_DELAY', ms }, () => {
            if (chrome.runtime.lastError) {
                setTimeout(done, ms); // SW unavailable — fall back
            } else {
                done();
            }
        });
        return;
    } catch (_) { /* fall through */ }

    // Strategy 3: Port relay via background service worker
    const port = getTimerPort();
    if (port) {
        const id = ++_timerIdCounter;
        _pendingTimers.set(id, done);
        port.postMessage({ cmd: 'delay', id, ms });
        return;
    }

    // Strategy 4: regular setTimeout (throttled in background tabs — last resort)
    const id = setTimeout(done, ms);
    (sleep as any)._lastId = id;
});

/** Check if automation should stop (user clicked stop button) */
function checkStop(): boolean {
    return !!(window as any).__NETFLOW_STOP__;
}

/** Detect minimized/hidden window — getBoundingClientRect returns all zeros in this state */
const _hidden = () => document.hidden;

/**
 * When tab is hidden and progress is stalled, briefly activate the tab
 * to force Chrome to render/update Google Flow's DOM.
 * Returns true if activation was requested.
 */
let _lastBriefActivate = 0;
async function briefActivateIfHidden(): Promise<boolean> {
    if (!document.hidden) return false;
    // Rate-limit: max once every 15 seconds
    const now = Date.now();
    if (now - _lastBriefActivate < 15000) return false;
    _lastBriefActivate = now;
    try {
        LOG("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM");
        chrome.runtime.sendMessage({ type: 'BRIEF_ACTIVATE_TAB' });
        // Wait for the activation + render cycle to complete
        await sleep(1500);
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Ensure the tab is VISIBLE (not hidden) before performing coordinate-dependent actions
 * like hover, positional click, or getBoundingClientRect matching.
 * Calls FOCUS_TAB to bring Chrome window to foreground and waits for document.hidden=false.
 * Returns true if tab is now visible.
 */
async function ensureTabVisible(): Promise<boolean> {
    if (!document.hidden) return true;
    LOG("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");
    try {
        await new Promise<void>(r => chrome.runtime.sendMessage({ type: 'FOCUS_TAB' }, () => r()));
        const start = Date.now();
        while (document.hidden && Date.now() - start < 5000) {
            await sleep(200);
        }
        if (!document.hidden) {
            LOG("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ");
            await sleep(3000);
            return true;
        }
        LOG("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที");
        return false;
    } catch (_) {
        LOG("⚠️ ensureTabVisible ล้มเหลว");
        return false;
    }
}

/** Check if Google Flow is showing a generation failure message (Thai + English) */
function isGenerationFailed(): string | null {
    const failurePatterns = [
        "couldn't generate", "could not generate", "failed to generate",
        "generation failed", "ไม่สามารถสร้าง", "สร้างไม่สำเร็จ",
        "try again later", "ลองอีกครั้งภายหลัง", "ลองใหม่อีกครั้ง",
        "something went wrong", "เกิดข้อผิดพลาด",
        "safety filter", "policy violation", "content policy",
        "unable to generate", "ไม่สามารถสร้างวิดีโอ",
        "couldn't generate video", "couldn't generate image",
    ];
    const allEls = document.querySelectorAll<HTMLElement>("div, span, p, h1, h2, h3, li");
    for (const el of allEls) {
        if (el.closest("#netflow-engine-overlay")) continue;
        const txt = (el.textContent || "").trim().toLowerCase();
        if (txt.length > 200 || txt.length < 5) continue;
        for (const pattern of failurePatterns) {
            if (txt.includes(pattern)) {
                return el.textContent?.trim() || pattern;
            }
        }
    }
    return null;
}

/** Cross-platform robust click: full pointer→mouse→click sequence for React/Radix */
async function robustClick(el: HTMLElement) {
    // When minimized/hidden, getBoundingClientRect returns 0s — just use .click()
    if (_hidden()) {
        el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        el.click();
        return;
    }
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };
    el.dispatchEvent(new PointerEvent("pointerdown", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mousedown", opts));
    await sleep(80);
    el.dispatchEvent(new PointerEvent("pointerup", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mouseup", opts));
    el.dispatchEvent(new MouseEvent("click", opts));
    // Also fire native .click() for trusted event — React may ignore synthetic events on BOTH platforms
    await sleep(50);
    el.click();
}

/** Cross-platform robust hover: pointer + mouse events for Radix UI menus */
function robustHover(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // When minimized, coords are 0,0 but events still fire on the element — acceptable
    const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };
    el.dispatchEvent(new PointerEvent("pointerenter", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mouseenter", opts));
    el.dispatchEvent(new PointerEvent("pointerover", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mouseover", opts));
    el.dispatchEvent(new PointerEvent("pointermove", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    el.dispatchEvent(new MouseEvent("mousemove", opts));
}

// ─── Element-Based Card Detection (Screen-Size Independent) ─────────────────

/**
 * Find workspace cards by their type icon text (e.g., "videocam" for video, "image" for image).
 * Uses <i> icon text instead of pixel coordinates — works on ANY screen size, Mac or Windows.
 * Returns card container elements sorted by position (leftmost first = newest).
 */
function findCardsByIcon(iconText: string): HTMLElement[] {
    const results: HTMLElement[] = [];
    const icons = document.querySelectorAll<HTMLElement>("i");
    for (const icon of icons) {
        const txt = (icon.textContent || "").trim();
        if (txt !== iconText) continue;

        // Walk up the DOM to find the card container (prefer smallest valid match)
        let el: HTMLElement | null = icon;
        let card: HTMLElement | null = null;
        let cardArea = Infinity;
        for (let depth = 0; depth < 20 && el; depth++) {
            el = el.parentElement;
            if (!el || el === document.body) break;
            if (_hidden()) {
                // When minimized, can't measure size — use DOM depth heuristic (cards are ~4-8 levels up)
                if (depth >= 3 && el.children.length > 0 && !card) {
                    card = el;
                }
                continue;
            }
            const r = el.getBoundingClientRect();
            // Card: visible, reasonably sized, not the whole page
            if (r.width > 100 && r.height > 80 &&
                r.width < window.innerWidth * 0.6 &&
                r.top >= -10 && r.bottom <= window.innerHeight + 10) {
                const area = r.width * r.height;
                if (area < cardArea) {
                    card = el;
                    cardArea = area;
                }
            }
        }
        if (card && !results.includes(card)) {
            results.push(card);
        }
    }
    // Sort: leftmost first (newest in Google Flow workspace)
    results.sort((a, b) => {
        const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        return ra.left - rb.left;
    });
    return results;
}

/**
 * Find the first (newest) video card by <i>videocam</i> icon.
 * Fallback: find card containing a <video> element.
 */
function findFirstVideoCard(silent = false): HTMLElement | null {
    const candidates: { el: HTMLElement; left: number }[] = [];

    // Strategy 1: Look for <video> elements
    const videos = document.querySelectorAll<HTMLVideoElement>("video");
    for (const vid of videos) {
        let container = vid.parentElement;
        for (let i = 0; i < 10 && container; i++) {
            if (_hidden()) {
                if (i >= 3 && container.children.length > 0) {
                    candidates.push({ el: container, left: 0 });
                    break;
                }
                container = container.parentElement;
                continue;
            }
            const r = container.getBoundingClientRect();
            // Size check + Exclude right sidebar (settings) + allow near top edge
            if (r.width > 120 && r.height > 80 && r.width < window.innerWidth * 0.7 && r.top >= -50) {
                if (r.left < window.innerWidth * 0.75) {
                    candidates.push({ el: container, left: r.left });
                    break;
                }
            }
            container = container.parentElement;
        }
    }

    // Strategy 2: Look for 'play_arrow' or 'play_circle' icons commonly used on generated videos
    const icons = document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");
    for (const icon of icons) {
        const txt = (icon.textContent || "").trim();
        if (txt === "play_arrow" || txt === "play_circle" || txt === "videocam") {
            let container = icon.parentElement;
            for (let i = 0; i < 10 && container; i++) {
                if (_hidden()) {
                    if (i >= 3 && container.children.length > 0) {
                        candidates.push({ el: container, left: 0 });
                        break;
                    }
                    container = container.parentElement;
                    continue;
                }
                const r = container.getBoundingClientRect();
                if (r.width > 120 && r.height > 80 && r.width < window.innerWidth * 0.7 && r.top >= -50) {
                    if (r.left < window.innerWidth * 0.75) {
                        candidates.push({ el: container, left: r.left });
                        break;
                    }
                }
                container = container.parentElement;
            }
        }
    }

    // Strategy 3: Look for images with explicit video indicators in alt text
    const imgs = document.querySelectorAll("img");
    for (const img of imgs) {
        const alt = (img.alt || "").toLowerCase();
        if (alt.includes("video") || alt.includes("วิดีโอ")) {
            let container = img.parentElement;
            for (let i = 0; i < 10 && container; i++) {
                if (_hidden()) {
                    if (i >= 3 && container.children.length > 0) {
                        candidates.push({ el: container, left: 0 });
                        break;
                    }
                    container = container.parentElement;
                    continue;
                }
                const r = container.getBoundingClientRect();
                if (r.width > 120 && r.height > 80 && r.width < window.innerWidth * 0.7 && r.top >= -50) {
                    if (r.left < window.innerWidth * 0.75) {
                        candidates.push({ el: container, left: r.left });
                        break;
                    }
                }
                container = container.parentElement;
            }
        }
    }

    // Remove duplicates
    const uniqueCandidates = Array.from(new Set(candidates.map(c => c.el)))
        .map(el => candidates.find(c => c.el === el)!);

    // Sort: leftmost first (newest in Google Flow workspace)
    uniqueCandidates.sort((a, b) => a.left - b.left);

    if (uniqueCandidates.length > 0) {
        const best = uniqueCandidates[0].el;
        const r = best.getBoundingClientRect();
        if (!silent) LOG(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
        return best;
    }

    if (!silent) LOG("🎬 ไม่พบการ์ดวิดีโอ");
    return null;
}

/**
 * Find the first (newest) image card by <i>image</i> icon.
 * Fallback: find card containing a <canvas> element.
 */
function findFirstImageCard(): HTMLElement | null {
    const cards = findCardsByIcon("image");
    if (cards.length > 0) {
        const r = cards[0].getBoundingClientRect();
        LOG(`🖼️ พบการ์ดรูปภาพ ${cards.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
        return cards[0];
    }
    // Fallback: look for <canvas> elements
    const canvases = document.querySelectorAll<HTMLCanvasElement>("canvas");
    for (const cvs of canvases) {
        let container = cvs.parentElement;
        for (let i = 0; i < 10 && container; i++) {
            if (_hidden()) {
                if (i >= 3 && container.children.length > 0) {
                    LOG(`🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)`);
                    return container;
                }
                container = container.parentElement;
                continue;
            }
            const r = container.getBoundingClientRect();
            if (r.width > 100 && r.height > 80 && r.width < window.innerWidth * 0.6) {
                LOG(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${r.left.toFixed(0)},${r.top.toFixed(0)})`);
                return container;
            }
            container = container.parentElement;
        }
    }
    LOG("🖼️ ไม่พบการ์ดรูปภาพ");
    return null;
}

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

/** Wait for a file input to appear in the DOM */
async function waitForFileInput(timeoutMs = 5000): Promise<HTMLInputElement | null> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
        if (inputs.length > 0) return inputs[inputs.length - 1];
        await sleep(300);
    }
    return null;
}

// ─── Element Detection ──────────────────────────────────────────────────────

/**
 * Find the "+" button in the prompt bar (bottom-most add button on page).
 */
function findPromptBarAddButton(): HTMLElement | null {
    const addButtons = [...findAllButtonsByIcon("add"), ...findAllButtonsByIcon("add_2")];

    if (addButtons.length === 0) {
        LOG("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");
        // Fallback: look for buttons with just "+" text at the bottom
        const allBtns = document.querySelectorAll<HTMLElement>("button");
        for (const btn of allBtns) {
            const txt = (btn.textContent || "").trim();
            if (txt !== "+" && txt !== "add") continue;
            if (_hidden()) return btn;
            const rect = btn.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.7 && rect.width < 60 && rect.height < 60) {
                return btn;
            }
        }
        return null;
    }

    // Pick the one closest to the bottom of the viewport
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
        LOG(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${bestY.toFixed(0)}`);
    }
    return bestBtn;
}

/**
 * Find the generate "→" button in the prompt bar.
 */
function findGenerateButton(): HTMLElement | null {
    // Strategy 1: icon buttons
    for (const icon of ["arrow_forward", "send", "arrow_upward", "navigate_next", "arrow_right"]) {
        const btns = findAllButtonsByIcon(icon);
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
            LOG(`พบปุ่ม Generate จากไอคอน "${icon}" ที่ y=${bestY.toFixed(0)}`);
            return best;
        }
    }

    // Strategy 2: circular button at the bottom-right
    const allBtns = document.querySelectorAll<HTMLElement>("button");
    let candidate: HTMLElement | null = null;
    let bestScore = 0;
    for (const btn of allBtns) {
        if (_hidden()) {
            // When minimized, can't check position — skip this strategy
            break;
        }
        const rect = btn.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.7 && rect.right > window.innerWidth * 0.5) {
            const isCircular = Math.abs(rect.width - rect.height) < 10 && rect.width < 60;
            const score = rect.y + rect.x + (isCircular ? 1000 : 0);
            if (score > bestScore) {
                bestScore = score;
                candidate = btn;
            }
        }
    }
    if (candidate) {
        LOG("พบปุ่ม Generate จากตำแหน่งขวาล่าง");
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
 * Find the prompt text input.
 * Searches for Slate.js editor, contenteditable, textarea, and input elements.
 * Skips elements inside the Netflow overlay.
 */
function findPromptTextInput(): HTMLTextAreaElement | HTMLInputElement | HTMLElement | null {
    // Strategy 1: textarea at the bottom area
    const textareas = document.querySelectorAll<HTMLTextAreaElement>("textarea");
    for (const ta of textareas) {
        if (_hidden()) return ta; // When minimized, accept first textarea
        const rect = ta.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) return ta;
    }

    // Strategy 2: contenteditable in bottom area
    const editables = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    for (const el of editables) {
        if (_hidden()) return el; // When minimized, accept first editable
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) return el;
    }

    // Strategy 3: input with Thai placeholder
    const inputs = document.querySelectorAll<HTMLInputElement>("input[type='text'], input:not([type])");
    for (const inp of inputs) {
        const ph = inp.placeholder || "";
        if (ph.includes("สร้าง") || ph.includes("prompt") || ph.includes("describe")) return inp;
    }

    if (textareas.length > 0) return textareas[textareas.length - 1];
    return null;
}

/**
 * Set text into Slate.js prompt editor.
 *
 * ROOT CAUSE: Slate.js has its own internal document model separate from DOM.
 * Any DOM-level insertion (execCommand, textContent, etc.) updates the DOM but
 * NOT Slate's model. When Generate is clicked, Slate reads its model → empty → error.
 *
 * Slate.js v0.90+ processes edits via `beforeinput` events.
 * For paste: inputType='insertFromPaste', reads text from event.dataTransfer.
 *
 * We dispatch beforeinput → Slate processes it → updates internal model → DOM matches.
 */
async function setPromptText(el: HTMLElement, text: string) {
    el.focus();
    await sleep(300);

    // ═══ Strategy 1: Slate beforeinput with insertFromPaste ═══
    LOG("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");
    try {
        // Create DataTransfer with our text
        const dt = new DataTransfer();
        dt.setData("text/plain", text);
        dt.setData("text/html", `<p>${text.replace(/\n/g, "<br>")}</p>`);

        // Dispatch beforeinput (Slate intercepts this)
        const beforeInput = new InputEvent("beforeinput", {
            bubbles: true,
            cancelable: true,
            inputType: "insertFromPaste",
            dataTransfer: dt,
        });
        el.dispatchEvent(beforeInput);
        LOG("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");

        // Dispatch input event (Slate's cleanup handler)
        const inputEv = new InputEvent("input", {
            bubbles: true,
            inputType: "insertFromPaste",
            dataTransfer: dt,
        });
        el.dispatchEvent(inputEv);
        await sleep(800);

        // Verify — check actual text, excluding placeholder
        const content = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${content.length} ตัวอักษร)`);
            return;
        }
        LOG(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${content.length} ตัวอักษร)`);
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 1 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 2: Slate beforeinput with insertText (character-level, but batched) ═══
    LOG("วางข้อความ: วิธี 2 — Slate beforeinput insertText");
    try {
        el.focus();
        await sleep(100);

        const beforeInput2 = new InputEvent("beforeinput", {
            bubbles: true,
            cancelable: true,
            inputType: "insertText",
            data: text,
        });
        el.dispatchEvent(beforeInput2);

        const inputEv2 = new InputEvent("input", {
            bubbles: true,
            inputType: "insertText",
            data: text,
        });
        el.dispatchEvent(inputEv2);
        await sleep(800);

        const content2 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content2.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${content2.length} ตัวอักษร)`);
            return;
        }
        LOG(`วางข้อความ: วิธี 2 — ไม่พบข้อความ`);
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 2 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 3: ClipboardEvent paste (Mac-compatible — Slate intercepts paste events) ═══
    LOG("วางข้อความ: วิธี 3 — ClipboardEvent paste");
    try {
        el.focus();
        await sleep(200);

        // Build a ClipboardEvent with text in clipboardData
        const clipDt = new DataTransfer();
        clipDt.setData("text/plain", text);
        clipDt.setData("text/html", `<p>${text.replace(/\n/g, "<br>")}</p>`);

        const pasteEvent = new ClipboardEvent("paste", {
            bubbles: true,
            cancelable: true,
            clipboardData: clipDt,
        });
        el.dispatchEvent(pasteEvent);
        await sleep(800);

        const content3a = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content3a.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${content3a.length} ตัวอักษร)`);
            return;
        }
        LOG("วางข้อความ: วิธี 3 — ไม่พบข้อความ");
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 3 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 4: navigator.clipboard + execCommand('paste') ═══
    LOG("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");
    try {
        // Use modern clipboard API (works on Mac without user gesture in extensions with clipboardWrite)
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            LOG("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");
        } else {
            // Fallback: old-school copy
            const ta = document.createElement("textarea");
            ta.value = text;
            ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand("copy");
            document.body.removeChild(ta);
            LOG("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand");
        }

        // Paste into Slate
        el.focus();
        await sleep(200);
        document.execCommand("paste");
        await sleep(500);

        const content4 = (el.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
        if (content4.length > 20) {
            LOG(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${content4.length} ตัวอักษร)`);
            return;
        }
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 4 ล้มเหลว: ${e.message}`);
    }

    // ═══ Strategy 5: React fiber — find Slate editor and call insertText ═══
    LOG("วางข้อความ: วิธี 5 — React fiber Slate editor");
    try {
        // Find React fiber key on the contenteditable element
        const fiberKey = Object.keys(el).find(k =>
            k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$")
        );
        if (fiberKey) {
            let fiber = (el as any)[fiberKey];
            // Walk up the fiber tree looking for the Slate editor in memoizedProps or stateRef
            for (let i = 0; i < 30 && fiber; i++) {
                const props = fiber.memoizedProps;
                const state = fiber.memoizedState;

                // Check for editor in props
                if (props?.editor?.insertText) {
                    LOG("วางข้อความ: พบ Slate editor ผ่าน fiber props");
                    const editor = props.editor;
                    // Select all and delete, then insert
                    if (editor.selection) {
                        // Move to end
                    }
                    editor.insertText(text);
                    LOG(`วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText`);
                    return;
                }

                // Check stateRef
                if (state?.memoizedState?.editor?.insertText) {
                    LOG("วางข้อความ: พบ Slate editor ผ่าน fiber state");
                    state.memoizedState.editor.insertText(text);
                    LOG(`วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor`);
                    return;
                }

                fiber = fiber.return;
            }
            LOG("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree");
        } else {
            LOG("วางข้อความ: ไม่พบ React fiber บน element");
        }
    } catch (e: any) {
        LOG(`วางข้อความ: วิธี 5 ล้มเหลว: ${e.message}`);
    }

    LOG("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console");
}

// ─── Upload Image into Prompt Bar ───────────────────────────────────────────

/**
 * Neutralize all file inputs: change type to "text" so .click() won't open native dialog.
 * Returns the original types for restoration.
 */
function neutralizeFileInputs(): { input: HTMLInputElement; origType: string }[] {
    const neutralized: { input: HTMLInputElement; origType: string }[] = [];
    const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    for (const inp of inputs) {
        neutralized.push({ input: inp, origType: "file" });
        inp.type = "text";
    }
    if (neutralized.length > 0) {
        LOG(`ปิดกั้น file input ${neutralized.length} ตัว (type → text)`);
    }
    return neutralized;
}

/**
 * Block ALL file dialog opens by overriding HTMLInputElement.prototype.click.
 * Returns a restore function. CRITICAL for Mac where MutationObserver timing
 * cannot reliably beat Google Flow's synchronous create→click sequence.
 */
function blockFileDialogs(): () => void {
    const origClick = HTMLInputElement.prototype.click;
    HTMLInputElement.prototype.click = function(this: HTMLInputElement) {
        if (this.type === "file") {
            LOG(`🚫 บล็อกการเปิด file dialog (${platformTag})`);
            return; // suppress native file chooser
        }
        return origClick.call(this);
    };
    LOG(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${platformTag})`);
    return () => {
        HTMLInputElement.prototype.click = origClick;
        LOG(`🔓 ถอดตัวบล็อก file dialog แล้ว`);
    };
}

/**
 * Restore file inputs to type="file", inject our file, and dispatch events.
 * Uses multiple dispatch strategies for cross-platform React compatibility.
 */
function restoreAndInject(neutralized: { input: HTMLInputElement; origType: string }[], file: File, preExistingInputs?: Set<HTMLInputElement>): boolean {
    // Also check for any inputs that were added during the process
    const allInputs = document.querySelectorAll<HTMLInputElement>('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]');
    const candidates = [...neutralized.map(n => n.input)];

    // Also add any recently created hidden text inputs (likely our neutralized ones)
    for (const inp of allInputs) {
        if (!candidates.includes(inp) && inp.offsetParent === null) {
            candidates.push(inp);
        }
    }

    for (const inp of candidates) {
        inp.type = "file";
    }
    LOG(`คืนค่า input ${candidates.length} ตัวเป็น type=file`);

    // Find the best file input to inject into
    const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    if (fileInputs.length === 0) {
        LOG(`⚠️ ไม่พบ file input หลังคืนค่า (${platformTag})`);
        return false;
    }

    // ★ Prefer NEW file inputs (not pre-existing) — fixes second upload targeting stale input
    let target: HTMLInputElement;
    if (preExistingInputs && preExistingInputs.size > 0) {
        const newInputs = Array.from(fileInputs).filter(inp => !preExistingInputs.has(inp));
        if (newInputs.length > 0) {
            target = newInputs[newInputs.length - 1];
            LOG(`เล็งเป้า file input ใหม่ (${newInputs.length} ใหม่, ${fileInputs.length} ทั้งหมด)`);
        } else {
            target = fileInputs[fileInputs.length - 1];
            LOG(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${fileInputs.length} ตัว`);
        }
    } else {
        target = fileInputs[fileInputs.length - 1];
    }

    // ★ Inject file via DataTransfer — cross-platform
    const dt = new DataTransfer();
    dt.items.add(file);

    // Method 1: Direct assignment (works on most Chrome)
    try {
        target.files = dt.files;
        LOG(`ฉีดไฟล์ผ่าน target.files (${target.files?.length ?? 0} ไฟล์)`);
    } catch (e: any) {
        LOG(`กำหนด target.files ล้มเหลว: ${e.message} — ลอง defineProperty`);
        // Method 2: defineProperty override (Mac fallback)
        try {
            Object.defineProperty(target, 'files', {
                value: dt.files,
                writable: true,
                configurable: true,
            });
            LOG(`ฉีดไฟล์ผ่าน Object.defineProperty`);
        } catch (e2: any) {
            WARN(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${e2.message}`);
            return false;
        }
    }

    // ★ React _valueTracker reset — CRITICAL for React to detect the change
    const tracker = (target as any)._valueTracker;
    if (tracker) {
        tracker.setValue('');
        LOG(`รีเซ็ต React _valueTracker บน file input`);
    }

    // ★ Dispatch 'change' event — React's delegated listener at root should pick this up
    target.dispatchEvent(new Event('change', { bubbles: true }));
    target.dispatchEvent(new Event('input', { bubbles: true }));

    LOG(`✅ ฉีดไฟล์เสร็จ: ${file.name} (${(file.size / 1024).toFixed(1)} KB) → <input> ${platformTag}`);
    return true;
}

/**
 * Count how many reference thumbnails are in the prompt bar area.
 */
function countPromptBarThumbnails(): number {
    let count = 0;
    const images = document.querySelectorAll<HTMLImageElement>("img");
    for (const img of images) {
        if (img.closest("#netflow-engine-overlay")) continue;
        if (!img.src) continue;
        if (_hidden()) { count++; continue; }
        const rect = img.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && img.offsetParent !== null) {
            count++;
        }
    }
    const thumbDivs = document.querySelectorAll<HTMLElement>('[style*="background-image"], [class*="thumb"], [class*="preview"]');
    for (const div of thumbDivs) {
        if (div.closest("#netflow-engine-overlay")) continue;
        if (_hidden()) { count++; continue; }
        const rect = div.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && div.offsetParent !== null) {
            count++;
        }
    }
    return count;
}

/**
 * Check if a thumbnail/image reference appeared in the prompt bar area.
 * Looks for <img> tags or thumbnail containers in the bottom prompt bar region.
 */
function checkPromptBarThumbnail(): boolean {
    // Look for image thumbnails in the bottom portion of the page (prompt bar area)
    const images = document.querySelectorAll<HTMLImageElement>("img");
    for (const img of images) {
        if (!img.src) continue;
        if (img.closest("#netflow-engine-overlay")) continue;
        if (_hidden()) {
            LOG(`พบรูปย่อ (minimized mode)`);
            return true;
        }
        const rect = img.getBoundingClientRect();
        // Thumbnail should be in the bottom 40% of the screen, small-ish, and visible
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && img.offsetParent !== null) {
            LOG(`พบรูปย่อ: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)} ที่ y=${rect.top.toFixed(0)}`);
            return true;
        }
    }
    // Also check for div/span with background-image in prompt bar area
    const thumbDivs = document.querySelectorAll<HTMLElement>('[style*="background-image"], [class*="thumb"], [class*="preview"]');
    for (const div of thumbDivs) {
        if (div.closest("#netflow-engine-overlay")) continue;
        if (_hidden()) return true;
        const rect = div.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.6 && rect.width > 20 && rect.width < 200
            && rect.height > 20 && rect.height < 200 && div.offsetParent !== null) {
            LOG(`พบรูปย่อ div: ${rect.width.toFixed(0)}x${rect.height.toFixed(0)} ที่ y=${rect.top.toFixed(0)}`);
            return true;
        }
    }
    return false;
}

/**
 * Drop a file onto the prompt bar via drag-and-drop events.
 * Bypasses file input entirely — Google Flow's drop handler processes the file directly.
 */
async function dropFileOnPromptBar(file: File): Promise<boolean> {
    LOG("ลองลากวางไฟล์บน Prompt Bar (drag-and-drop)...");

    // Find the prompt bar container — the area with contenteditable or the form/wrapper
    const targets: HTMLElement[] = [];

    // Priority 1: contenteditable in bottom area
    const editables = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    for (const el of editables) {
        if (_hidden()) { targets.push(el); continue; }
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5) targets.push(el);
    }

    // Priority 2: form or wrapper in bottom area
    const wrappers = document.querySelectorAll<HTMLElement>('form, [role="textbox"], [data-slate-editor]');
    for (const el of wrappers) {
        if (_hidden()) { if (!targets.includes(el)) targets.push(el); continue; }
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.5 && !targets.includes(el)) targets.push(el);
    }

    // Priority 3: any div in bottom area that looks like a prompt container
    if (targets.length === 0 && !_hidden()) {
        const bottomDivs = document.querySelectorAll<HTMLElement>("div");
        for (const div of bottomDivs) {
            const rect = div.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.8 && rect.width > 300 && rect.height > 30 && rect.height < 200) {
                targets.push(div);
                if (targets.length >= 3) break;
            }
        }
    }

    if (targets.length === 0) {
        LOG("ไม่พบเป้าหมายบน Prompt Bar สำหรับ drag-and-drop");
        return false;
    }

    LOG(`พบเป้าหมาย drag-and-drop ${targets.length} ตัว`);

    for (const target of targets) {
        try {
            const rect = target.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const commonOpts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };

            // Create DataTransfer with our file
            const dt = new DataTransfer();
            dt.items.add(file);

            // Dispatch drag sequence: dragenter → dragover → drop
            target.dispatchEvent(new DragEvent('dragenter', { ...commonOpts, dataTransfer: dt }));
            await sleep(100);
            target.dispatchEvent(new DragEvent('dragover', { ...commonOpts, dataTransfer: dt }));
            await sleep(100);
            target.dispatchEvent(new DragEvent('drop', { ...commonOpts, dataTransfer: dt }));
            LOG(`ส่ง drag-and-drop บน <${target.tagName.toLowerCase()}> ที่ (${cx.toFixed(0)}, ${cy.toFixed(0)})`);

            await sleep(500);
            // Check if this worked immediately
            if (checkPromptBarThumbnail()) return true;
        } catch (err: any) {
            LOG(`drag-and-drop ผิดพลาด: ${err.message}`);
        }
    }

    return false;
}

/**
 * PRIMARY METHOD: Write image to REAL system clipboard, then trigger real paste.
 * This creates a TRUSTED paste event (isTrusted: true) that Slate.js accepts.
 * Requires manifest permissions: clipboardWrite, clipboardRead.
 */
async function pasteImageViaRealClipboard(dataUrl: string, file: File, baselineCount: number): Promise<boolean> {
    LOG("── Real Clipboard: เขียนรูปลง system clipboard แล้ว paste จริง ──");

    // Helper: wait up to waitMs checking if thumbnail count increased above baseline
    const waitForNewThumb = async (label: string, waitMs = 2500): Promise<boolean> => {
        const t0 = Date.now();
        while (Date.now() - t0 < waitMs) {
            if (countPromptBarThumbnails() > baselineCount) {
                LOG(`✅ [${label}] รูปย่อเพิ่ม! (${countPromptBarThumbnails()} > ${baselineCount})`);
                return true;
            }
            await sleep(400);
        }
        return false;
    };

    // Find target editor (Slate or contenteditable)
    let editor: HTMLElement | null = null;
    const slateEds = document.querySelectorAll<HTMLElement>('[data-slate-editor="true"]');
    for (const el of slateEds) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.4) { editor = el; break; }
    }
    if (!editor) {
        const editables = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
        for (const el of editables) {
            const rect = el.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.4) { editor = el; break; }
        }
    }
    if (!editor) {
        LOG("ไม่พบ editor สำหรับ paste");
        return false;
    }

    // ═══ Method A: navigator.clipboard.write() + execCommand('paste') ═══
    let pasteDispatched = false;
    try {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type || 'image/png' });
        const clipItem = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([clipItem]);
        LOG(`เขียนรูป ${(file.size / 1024).toFixed(1)}KB ลง system clipboard สำเร็จ`);

        editor.focus();
        await sleep(300);

        const pasted = document.execCommand('paste');
        LOG(`execCommand('paste'): ${pasted}`);

        if (pasted) {
            pasteDispatched = true;
            // ★ Paste was dispatched — wait longer (8s) for thumbnail, then return true regardless
            //   DO NOT try more methods — that causes duplicate images
            if (await waitForNewThumb("ClipboardAPI", 8000)) return true;
            LOG("⚠️ Method A: paste dispatched แต่ thumbnail ยังไม่ขึ้น — ถือว่าสำเร็จ (async processing)");
            return true;
        }
    } catch (err: any) {
        LOG(`Method A (Clipboard API) ล้มเหลว: ${err.message}`);
    }

    // ★ Guard: check if Method A succeeded asynchronously before trying B
    if (countPromptBarThumbnails() > baselineCount) {
        LOG("✅ Method A สำเร็จ (ตรวจพบทีหลัง)");
        return true;
    }

    // ═══ Method B: Hidden contenteditable img copy → paste ═══
    try {
        LOG("ลอง Method B: copy img จาก hidden div → paste ลง editor");
        const tempDiv = document.createElement('div');
        tempDiv.contentEditable = 'true';
        tempDiv.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;';
        const img = document.createElement('img');
        img.src = dataUrl;
        img.style.cssText = 'max-width:200px;max-height:200px;';
        tempDiv.appendChild(img);
        document.body.appendChild(tempDiv);

        await new Promise<void>((resolve) => {
            if (img.complete) { resolve(); return; }
            img.onload = () => resolve();
            img.onerror = () => resolve();
            setTimeout(resolve, 2000);
        });
        await sleep(200);

        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);

        const copied = document.execCommand('copy');
        LOG(`execCommand('copy') จาก temp img: ${copied}`);
        document.body.removeChild(tempDiv);

        if (copied) {
            editor.focus();
            await sleep(300);
            const pasted = document.execCommand('paste');
            LOG(`execCommand('paste') ลง editor: ${pasted}`);
            if (pasted) {
                pasteDispatched = true;
                // ★ Paste dispatched — wait longer, then return true regardless
                if (await waitForNewThumb("HiddenDiv", 8000)) return true;
                LOG("⚠️ Method B: paste dispatched แต่ thumbnail ยังไม่ขึ้น — ถือว่าสำเร็จ");
                return true;
            }
        }
    } catch (err: any) {
        LOG(`Method B (hidden div) ล้มเหลว: ${err.message}`);
    }

    // ★ Guard: check again before trying C
    if (countPromptBarThumbnails() > baselineCount) {
        LOG("✅ Method B สำเร็จ (ตรวจพบทีหลัง)");
        return true;
    }

    // ═══ Method C: canvas.toBlob → clipboard.write → paste ═══
    try {
        LOG("ลอง Method C: canvas toBlob → clipboard write → paste");
        const img2 = new Image();
        img2.crossOrigin = 'anonymous';
        const loadPromise = new Promise<void>((resolve, reject) => {
            img2.onload = () => resolve();
            img2.onerror = () => reject(new Error("img load failed"));
            setTimeout(() => reject(new Error("img load timeout")), 5000);
        });
        img2.src = dataUrl;
        await loadPromise;

        const canvas = document.createElement('canvas');
        canvas.width = img2.naturalWidth;
        canvas.height = img2.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("no canvas context");
        ctx.drawImage(img2, 0, 0);

        const pngBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(b => b ? resolve(b) : reject(new Error("toBlob null")), 'image/png');
        });

        await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': pngBlob })
        ]);
        LOG(`เขียน canvas PNG ${(pngBlob.size / 1024).toFixed(1)}KB ลง clipboard`);

        editor.focus();
        await sleep(300);
        const pasted = document.execCommand('paste');
        LOG(`execCommand('paste') จาก canvas: ${pasted}`);
        if (pasted) {
            pasteDispatched = true;
            if (await waitForNewThumb("Canvas", 8000)) return true;
            LOG("⚠️ Method C: paste dispatched แต่ thumbnail ยังไม่ขึ้น — ถือว่าสำเร็จ");
            return true;
        }
    } catch (err: any) {
        LOG(`Method C (canvas) ล้มเหลว: ${err.message}`);
    }

    LOG("Real clipboard methods ล้มเหลวทั้งหมด");
    return false;
}

/**
 * Paste an image file into the prompt bar via synthetic clipboard events.
 * (Fallback — may not work if Google Flow checks isTrusted)
 */
async function pasteImageIntoPromptBar(file: File): Promise<boolean> {
    LOG("ลองวางไฟล์ผ่านคลิปบอร์ด (clipboard paste)...");

    // Build candidate targets in priority order
    const targets: HTMLElement[] = [];

    // Priority 1: Slate editor (data-slate-editor)
    const slateEditors = document.querySelectorAll<HTMLElement>('[data-slate-editor="true"]');
    for (const el of slateEditors) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.4) targets.push(el);
    }

    // Priority 2: contenteditable in bottom area
    const editables = document.querySelectorAll<HTMLElement>('[contenteditable="true"]');
    for (const el of editables) {
        if (targets.includes(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.bottom > window.innerHeight * 0.4) targets.push(el);
    }

    // Priority 3: prompt text input
    const promptEl = findPromptTextInput();
    if (promptEl && !targets.includes(promptEl as HTMLElement)) {
        targets.push(promptEl as HTMLElement);
    }

    if (targets.length === 0) {
        LOG("ไม่พบช่อง prompt สำหรับวางไฟล์");
        return false;
    }

    LOG(`พบเป้าหมาย paste ${targets.length} ตัว`);

    for (const target of targets) {
        try {
            // Focus the target element first
            target.focus();
            await sleep(200);

            const dt = new DataTransfer();
            dt.items.add(file);

            // Dispatch ClipboardEvent('paste')
            const pasteEvent = new ClipboardEvent('paste', {
                bubbles: true,
                cancelable: true,
                clipboardData: dt,
            });
            target.dispatchEvent(pasteEvent);
            LOG(`ส่ง paste event บน <${target.tagName.toLowerCase()}${target.hasAttribute('data-slate-editor') ? ' [Slate]' : ''}>`);

            // Also try InputEvent('insertFromPaste') for Slate.js beforeinput handler
            try {
                const inputEvent = new InputEvent('beforeinput', {
                    bubbles: true,
                    cancelable: true,
                    inputType: 'insertFromPaste',
                    dataTransfer: dt,
                } as any);
                target.dispatchEvent(inputEvent);
                LOG("ส่ง beforeinput(insertFromPaste) ด้วย");
            } catch (_) { /* optional — ignore */ }

            await sleep(800);
            // Quick check if thumbnail appeared
            if (checkPromptBarThumbnail()) {
                LOG("✅ พบรูปย่อหลัง paste!");
                return true;
            }
        } catch (err: any) {
            LOG(`วางผ่านคลิปบอร์ดผิดพลาดบน target: ${err.message}`);
        }
    }

    // Final attempt: dispatch paste on document itself (some apps listen at document level)
    try {
        const dt = new DataTransfer();
        dt.items.add(file);
        const pasteEvent = new ClipboardEvent('paste', {
            bubbles: true,
            cancelable: true,
            clipboardData: dt,
        });
        document.dispatchEvent(pasteEvent);
        LOG("ส่ง paste event บน document");
        return true;
    } catch (err: any) {
        LOG(`วาง paste บน document ผิดพลาด: ${err.message}`);
    }

    return false;
}

/**
 * Upload a single image into the prompt bar.
 *
 * Key trick: NEUTRALIZE all file inputs (type="text") BEFORE clicking upload menu.
 * When Google Flow calls .click() on the input, it won't open the native dialog
 * because type="text" inputs don't trigger file chooser.
 * Then we restore type="file", inject our file, and dispatch change.
 * Fallbacks: drag-and-drop onto prompt bar, clipboard paste.
 */
async function uploadImageToPromptBar(dataUrl: string, fileName: string): Promise<boolean> {
    LOG(`── กำลังอัพโหลด ${fileName} ไปยัง Prompt Bar ──`);

    const file = base64ToFile(dataUrl, fileName);
    LOG(`ขนาดไฟล์: ${(file.size / 1024).toFixed(1)} KB`);

    // ★ Baseline: count existing thumbnails BEFORE any upload attempt
    const baselineCount = countPromptBarThumbnails();
    LOG(`รูปย่อปัจจุบันใน Prompt Bar: ${baselineCount} รูป`);

    // Helper: verify that a new thumbnail actually appeared
    const verifyNewThumbnail = async (method: string, waitMs = 8000): Promise<boolean> => {
        const start = Date.now();
        while (Date.now() - start < waitMs) {
            const currentCount = countPromptBarThumbnails();
            if (currentCount > baselineCount) {
                LOG(`✅ [${method}] ยืนยัน: รูปย่อเพิ่มจาก ${baselineCount} → ${currentCount}`);
                return true;
            }
            await sleep(500);
        }
        LOG(`⚠️ [${method}] รูปย่อไม่เพิ่ม (ยังคง ${countPromptBarThumbnails()} รูป)`);
        return false;
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PRIMARY METHOD: "+" Button → Upload Button → File Input Injection (base64)
    // ═══════════════════════════════════════════════════════════════════════════

    // ── STEP 1: Find and click "+" button (add_2 icon / "สร้าง") ──
    LOG("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");
    const addBtn = findPromptBarAddButton();
    if (!addBtn) {
        WARN("ไม่พบปุ่ม '+' บน Prompt Bar");
        return false;
    }

    // ★ Snapshot existing file inputs BEFORE any action
    const preExistingInputs = new Set(
        document.querySelectorAll<HTMLInputElement>('input[type="file"]')
    );
    LOG(`file input ที่มีอยู่เดิม: ${preExistingInputs.size} ตัว`);

    // ★ Block file dialogs + neutralize inputs BEFORE clicking
    const unblockDialogs = blockFileDialogs();
    let neutralized = neutralizeFileInputs();

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLInputElement && node.type === "file") {
                    node.type = "text";
                    neutralized.push({ input: node, origType: "file" });
                    LOG(`🎯 Observer ปิดกั้น file input ใหม่`);
                }
                if (node instanceof HTMLElement) {
                    const fis = node.querySelectorAll<HTMLInputElement>('input[type="file"]');
                    for (const fi of fis) {
                        fi.type = "text";
                        neutralized.push({ input: fi, origType: "file" });
                        LOG(`🎯 Observer ปิดกั้น file input ซ้อน`);
                    }
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    try {
        // Click "+" to open the dialog (use single .click() — NOT robustClick)
        // robustClick fires synthetic click + .click() = 2 clicks, which TOGGLES Radix dialog open→closed
        addBtn.click();
        LOG("คลิกปุ่ม '+' (สร้าง) แล้ว ✅");
        await sleep(1500);

        // ── STEP 2: Find and click "upload" button (อัปโหลดรูปภาพ) ──
        LOG("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");
        let clickedUpload = false;
        const menuPollStart = Date.now();
        while (!clickedUpload && Date.now() - menuPollStart < 8000) {
            const menuElements = document.querySelectorAll<HTMLElement>(
                "button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']"
            );
            // Icon-based detection first (look for "upload" icon)
            for (const el of menuElements) {
                if (el === addBtn) continue;
                const icons = el.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");
                for (const icon of icons) {
                    const it = icon.textContent?.trim() || "";
                    // Strictly match local upload icons. Avoid 'photo_library' or 'image' which open the asset manager.
                    if (it === "upload" || it === "upload_file" || it === "add_photo_alternate") {
                        const allIconTexts = Array.from(el.querySelectorAll("i")).map(i => i.textContent?.trim());
                        if (!allIconTexts.includes("drive_folder_upload") && !allIconTexts.includes("photo_library")) {
                            el.click();
                            clickedUpload = true;
                            LOG(`คลิกปุ่มอัปโหลด (ไอคอน: ${it}) ✅`);
                            break;
                        }
                    }
                }
                if (clickedUpload) break;
            }
            // Text fallback (look for "อัปโหลดรูปภาพ" / "upload" text)
            if (!clickedUpload) {
                for (const el of menuElements) {
                    if (el === addBtn) continue;
                    const directText = el.childNodes.length <= 8 ? (el.textContent || "").trim() : "";
                    if (directText.length > 0 && directText.length < 60) {
                        const lower = directText.toLowerCase();
                        // Skip library options
                        if (lower.includes("ไลบรารี") || lower.includes("library") || lower.includes("drive") || lower.includes("ไดรฟ์")) continue;
                        
                        if (lower === "upload" || lower === "อัปโหลด" || lower === "อัพโหลด"
                            || lower.includes("upload image") || lower.includes("upload photo")
                            || lower.includes("upload a file") || lower.includes("upload file")
                            || lower.includes("อัปโหลดรูปภาพ") || lower.includes("อัพโหลดรูปภาพ")
                            || lower.includes("อัปโหลดไฟล์") || lower.includes("อัพโหลดไฟล์")
                            || lower.includes("from computer") || lower.includes("จากคอมพิวเตอร์")
                            || lower.includes("from device") || lower.includes("จากอุปกรณ์")
                            || lower.includes("my computer") || lower.includes("คอมพิวเตอร์ของฉัน")) {
                            el.click();
                            clickedUpload = true;
                            LOG(`คลิกปุ่มอัปโหลด (ข้อความ: "${directText}") ✅`);
                            break;
                        }
                    }
                }
            }
            // ★ Broader fallback: any menu item that's NOT "สร้าง"/"Create"/"Google Drive"/"Library"
            if (!clickedUpload) {
                for (const el of menuElements) {
                    if (el === addBtn) continue;
                    const txt = (el.textContent || "").trim().toLowerCase();
                    if (txt.length > 0 && txt.length < 60) {
                        // Skip known non-upload items
                        if (txt.includes("drive") || txt.includes("ไดรฟ์") || txt.includes("google") 
                            || txt.includes("สร้าง") || txt.includes("create") || txt.includes("cancel")
                            || txt.includes("ยกเลิก") || txt.includes("ไลบรารี") || txt.includes("library")) continue;
                        // If it contains upload-related keywords in any language
                        if (txt.includes("upload") || txt.includes("อัป") || txt.includes("อัพ") || txt.includes("file") || txt.includes("ไฟล์") || txt.includes("รูปภาพ") || txt.includes("image") || txt.includes("photo")) {
                            const rect = el.getBoundingClientRect();
                            if (rect.width > 0 && rect.height > 0) {
                                el.click();
                                clickedUpload = true;
                                LOG(`คลิกปุ่มอัปโหลด (broad match: "${txt.substring(0, 40)}") ✅`);
                                break;
                            }
                        }
                    }
                }
            }
            if (!clickedUpload) {
                await sleep(500);
            }
        }
        if (!clickedUpload) {
            WARN("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที");
            return false;
        }

        // Wait for file input to be triggered
        await sleep(1000);

        // ── STEP 3: Inject file via base64 into file input ──
        LOG("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──");
        const ok = restoreAndInject(neutralized, file, preExistingInputs);
        if (!ok) {
            WARN(`ฉีดไฟล์ ${fileName} ล้มเหลว`);
            return false;
        }
        LOG(`ฉีดไฟล์ ${fileName} เสร็จ ✅`);

        // ── STEP 4: Verify upload succeeded (thumbnail appeared) ──
        LOG("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──");
        if (await verifyNewThumbnail("FileInput", 10000)) {
            return true;
        }

        // Even if thumbnail not detected yet, the upload might be processing (shows %)
        LOG("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)");
        return true;
    } finally {
        observer.disconnect();
        unblockDialogs();
        for (const n of neutralized) {
            if (n.input.type !== "file") n.input.type = "file";
        }
    }
}

// ─── GENERATE_IMAGE handler ─────────────────────────────────────────────────

interface GenerateImageRequest {
    action: "GENERATE_IMAGE";
    imagePrompt: string;
    videoPrompt?: string;
    videoScenePrompts?: string[];  // Pre-built prompts for each scene [scene1, scene2, scene3]
    sceneCount?: number;           // 1-10
    productImage?: string;
    characterImage?: string;
    orientation?: "horizontal" | "vertical";
    outputCount?: 1 | 2 | 3 | 4;
    veoQuality?: "fast" | "quality";  // Veo 3.1 rendering quality
    theme?: string;                // UI theme key from sidepanel (e.g. "red", "blue", "green")
}

/**
 * Configure Flow settings: Image mode, orientation, count
 */
async function configureFlowSettings(orientation: string, outputCount: number): Promise<boolean> {
    LOG("=== ขั้น 0: ตั้งค่า Flow ===");

    // Find the settings button — it shows current mode like "วิดีโอ □ x1" or "Nano Banana 2"
    // NOTE: Google Flow may use <div>, <span>, or other elements — not just <button>
    const allClickable = document.querySelectorAll<HTMLElement>("button, div, span, [role='button']");
    let settingsBtn: HTMLElement | null = null;

    // Strategy 1: any element with known keywords at the bottom prompt bar area
    for (const el of allClickable) {
        const txt = (el.textContent || "").trim();
        if (txt.length > 80) continue; // skip large containers
        if (txt.includes("Nano Banana") || txt.includes("Imagen") || txt.includes("วิดีโอ") || txt.includes("รูปภาพ") || txt.includes("Image") || txt.includes("Video")) {
            const rect = el.getBoundingClientRect();
            if (rect.bottom > window.innerHeight * 0.7 && rect.width > 30 && rect.height > 10) {
                // Prefer the most specific (smallest) matching element
                if (!settingsBtn || (el.textContent || "").length < (settingsBtn.textContent || "").length) {
                    settingsBtn = el;
                }
            }
        }
    }
    if (settingsBtn) LOG(`พบปุ่มตั้งค่าจากข้อความ: "${(settingsBtn.textContent || "").substring(0, 40).trim()}"`);

    // Strategy 2: element with crop/aspect-ratio icon in bottom area
    if (!settingsBtn) {
        const icons = document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");
        for (const icon of icons) {
            const it = icon.textContent?.trim() || "";
            if (it.includes("crop") || it === "aspect_ratio" || it === "photo_size_select_large") {
                const parent = icon.closest("button, div[role='button'], [role='button']") as HTMLElement || icon.parentElement as HTMLElement;
                if (parent) {
                    const rect = parent.getBoundingClientRect();
                    if (rect.bottom > window.innerHeight * 0.7 && rect.width > 0) {
                        settingsBtn = parent;
                        LOG(`พบปุ่มตั้งค่าจากไอคอน: ${it}`);
                        break;
                    }
                }
            }
        }
    }

    // Strategy 3: look for "x1"/"x2"/"x3"/"x4" text near the bottom (settings indicator)
    if (!settingsBtn) {
        for (const el of allClickable) {
            const txt = (el.textContent || "").trim();
            if (txt.length > 40) continue;
            if (/x[1-4]/.test(txt) && (txt.includes("วิดีโอ") || txt.includes("รูปภาพ") || txt.includes("Video") || txt.includes("Image"))) {
                const rect = el.getBoundingClientRect();
                if (rect.bottom > window.innerHeight * 0.7 && rect.width > 30) {
                    settingsBtn = el;
                    LOG(`พบปุ่มตั้งค่าจาก x-count + mode text: "${txt.substring(0, 40)}"`);
                    break;
                }
            }
        }
    }

    if (!settingsBtn) {
        WARN("ไม่พบปุ่มตั้งค่า");
        return false;
    }

    // Click settings button with full mouse sequence
    const sRect = settingsBtn.getBoundingClientRect();
    const sCx = sRect.left + sRect.width / 2;
    const sCy = sRect.top + sRect.height / 2;
    const sOpts = { bubbles: true, cancelable: true, clientX: sCx, clientY: sCy, button: 0 };
    settingsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mousedown", sOpts));
    await sleep(80);
    settingsBtn.dispatchEvent(new PointerEvent("pointerup", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mouseup", sOpts));
    settingsBtn.dispatchEvent(new MouseEvent("click", sOpts));
    LOG("คลิกปุ่มตั้งค่าแล้ว");
    await sleep(1500);

    // ALWAYS select Image mode (switch from Video if needed)
    let selectedImage = false;
    let imageTabBtn: HTMLElement | null = null;

    // Strategy 1: Radix tab with class flow_tab_slider_trigger + aria-controls containing IMAGE
    const tabTriggers = document.querySelectorAll<HTMLElement>('.flow_tab_slider_trigger[role="tab"]');
    for (const btn of tabTriggers) {
        const ariaControls = btn.getAttribute("aria-controls") || "";
        const btnId = btn.id || "";
        if (ariaControls.toUpperCase().includes("IMAGE") || btnId.toUpperCase().includes("IMAGE")) {
            imageTabBtn = btn;
            LOG(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${ariaControls})`);
            break;
        }
    }

    // Strategy 2: role=tab with id containing trigger-IMAGE
    if (!imageTabBtn) {
        for (const btn of document.querySelectorAll<HTMLElement>('[role="tab"]')) {
            const btnId = btn.id || "";
            if (btnId.toUpperCase().includes("TRIGGER-IMAGE")) {
                imageTabBtn = btn;
                LOG(`พบแท็บ Image ผ่าน id: ${btnId}`);
                break;
            }
        }
    }

    // Strategy 3: fuzzy text match — textContent ends with "Image" or contains Thai equivalents
    if (!imageTabBtn) {
        for (const btn of document.querySelectorAll<HTMLElement>("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")) {
            const txt = (btn.textContent || "").trim();
            if (txt.length > 30) continue;
            if (txt === "Image" || txt.endsWith("Image") || txt === "รูปภาพ" || txt === "ภาพ" || txt.includes("รูปภาพ")) {
                // Exclude elements that also contain "Video" text
                if (!txt.includes("Video") && !txt.includes("วิดีโอ")) {
                    const rect = btn.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        imageTabBtn = btn;
                        LOG(`พบแท็บ Image ผ่านข้อความ: "${txt}"`);
                        break;
                    }
                }
            }
        }
    }

    if (imageTabBtn) {
        // Check if already active
        const state = imageTabBtn.getAttribute("data-state") || "";
        const ariaSelected = imageTabBtn.getAttribute("aria-selected") || "";
        if (state === "active" || ariaSelected === "true") {
            selectedImage = true;
            LOG("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");
        } else {
            const bRect = imageTabBtn.getBoundingClientRect();
            const bOpts = { bubbles: true, cancelable: true, clientX: bRect.left + bRect.width / 2, clientY: bRect.top + bRect.height / 2, button: 0 };
            imageTabBtn.dispatchEvent(new PointerEvent("pointerdown", { ...bOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            imageTabBtn.dispatchEvent(new MouseEvent("mousedown", bOpts));
            await sleep(80);
            imageTabBtn.dispatchEvent(new PointerEvent("pointerup", { ...bOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            imageTabBtn.dispatchEvent(new MouseEvent("mouseup", bOpts));
            imageTabBtn.dispatchEvent(new MouseEvent("click", bOpts));
            selectedImage = true;
            LOG("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว");
            await sleep(400);
        }
    }
    if (!selectedImage) LOG("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");

    // Select orientation
    const orientationText = orientation === "horizontal" ? "แนวนอน" : "แนวตั้ง";
    const orientationEn = orientation === "horizontal" ? "landscape" : "portrait";
    for (const btn of document.querySelectorAll<HTMLElement>("button, div, span, [role='tab'], [role='option'], [role='button']")) {
        const txt = (btn.textContent || "").trim();
        if (txt.length > 30) continue;
        if (txt === orientationText || txt.includes(orientationText) || txt.toLowerCase() === orientationEn || txt.toLowerCase().includes(orientationEn)) {
            const oRect = btn.getBoundingClientRect();
            const oOpts = { bubbles: true, cancelable: true, clientX: oRect.left + oRect.width / 2, clientY: oRect.top + oRect.height / 2, button: 0 };
            btn.dispatchEvent(new PointerEvent("pointerdown", { ...oOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mousedown", oOpts));
            await sleep(80);
            btn.dispatchEvent(new PointerEvent("pointerup", { ...oOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mouseup", oOpts));
            btn.dispatchEvent(new MouseEvent("click", oOpts));
            LOG(`เลือกทิศทาง: ${orientationText}`);
            await sleep(400);
            break;
        }
    }

    // Select count
    const countText = `x${outputCount}`;
    for (const btn of document.querySelectorAll<HTMLElement>("button, div, span, [role='tab'], [role='option'], [role='button']")) {
        const txt = (btn.textContent || "").trim();
        if (txt.length > 10) continue;
        if (txt === countText || txt === `${outputCount}`) {
            const cRect = btn.getBoundingClientRect();
            const cOpts = { bubbles: true, cancelable: true, clientX: cRect.left + cRect.width / 2, clientY: cRect.top + cRect.height / 2, button: 0 };
            btn.dispatchEvent(new PointerEvent("pointerdown", { ...cOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mousedown", cOpts));
            await sleep(80);
            btn.dispatchEvent(new PointerEvent("pointerup", { ...cOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            btn.dispatchEvent(new MouseEvent("mouseup", cOpts));
            btn.dispatchEvent(new MouseEvent("click", cOpts));
            LOG(`เลือกจำนวน: ${countText}`);
            await sleep(400);
            break;
        }
    }

    // Close settings — press Escape to dismiss the dropdown
    await sleep(300);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(300);
    // Also try clicking the settings button again to toggle it closed
    settingsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mousedown", sOpts));
    await sleep(80);
    settingsBtn.dispatchEvent(new PointerEvent("pointerup", { ...sOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    settingsBtn.dispatchEvent(new MouseEvent("mouseup", sOpts));
    settingsBtn.dispatchEvent(new MouseEvent("click", sOpts));
    LOG("ปิดหน้าตั้งค่าแล้ว");
    await sleep(600);

    return true;
}

/**
 * Select Veo quality: click the "Veo 3.1 - Fast" dropdown at the bottom,
 * then pick either "Veo 3.1 - Fast" or "Veo 3.1 - Quality" from the menu.
 */
async function selectVeoQuality(quality: "fast" | "quality"): Promise<boolean> {
    const targetLabel = quality === "quality" ? "Veo 3.1 - Quality" : "Veo 3.1 - Fast";
    const shortLabel = quality === "quality" ? "Quality" : "Fast";
    const oppositeShortLabel = quality === "quality" ? "Fast" : "Quality";
    
    const thShortLabel = quality === "quality" ? "คุณภาพ" : "เร็ว";
    const thOppositeShortLabel = quality === "quality" ? "เร็ว" : "คุณภาพ";
    
    LOG(`=== เลือกคุณภาพ Veo: ${targetLabel} (${thShortLabel}) ===`);

    // ★ Retry loop — dropdown may not be rendered immediately after page load
    let dropdownBtn: HTMLElement | null = null;
    const retryDeadline = Date.now() + 10000; // 10 seconds total

    while (!dropdownBtn && Date.now() < retryDeadline) {
        const allBtns = document.querySelectorAll<HTMLElement>("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");
        
        // Strategy A: Look for "Veo" and popup indicator
        for (const btn of allBtns) {
            const txt = (btn.textContent || "").trim();
            if (txt.length > 80) continue;

            if (txt.includes("Veo") || txt.includes("veo")) {
                if (btn.hasAttribute("aria-haspopup") || 
                    btn.hasAttribute("aria-expanded") || 
                    btn.getAttribute("role") === "combobox" || 
                    txt.includes("arrow_drop_down") || 
                    btn.querySelector("svg")) {
                    dropdownBtn = btn;
                    LOG(`พบปุ่ม Veo dropdown (Strategy A): "${txt.substring(0, 50).trim()}"`);
                    break;
                }
            }
        }

        // Strategy B: Any button/element containing "Veo" anywhere on page
        if (!dropdownBtn) {
            for (const btn of allBtns) {
                const txt = (btn.textContent || "").trim();
                if (txt.length > 80) continue;

                if (txt.includes("Veo") || txt.includes("veo")) {
                    const rect = btn.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        dropdownBtn = btn;
                        LOG(`พบปุ่ม Veo dropdown (Strategy B): "${txt.substring(0, 50).trim()}"`);
                        break;
                    }
                }
            }
        }

        // Strategy C: Check if it says "Fast"/"Quality" or "เร็ว"/"คุณภาพ" with popup
        if (!dropdownBtn) {
            for (const btn of allBtns) {
                const txt = (btn.textContent || "").trim();
                if (txt.length > 50) continue;

                if (txt.includes("Fast") || txt.includes("Quality") || txt.includes("เร็ว") || txt.includes("คุณภาพ")) {
                    if (btn.hasAttribute("aria-haspopup") || btn.hasAttribute("aria-expanded") || btn.querySelector("svg")) {
                        dropdownBtn = btn;
                        LOG(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${txt.substring(0, 50).trim()}"`);
                        break;
                    }
                }
            }
        }
        
        // Strategy D: Any visible element with exact matching text
        if (!dropdownBtn) {
            const allEls = document.querySelectorAll<HTMLElement>("div, span, button, [role='button']");
            for (const el of allEls) {
                const txt = (el.textContent || "").trim();
                if (
                    txt === "Veo 3.1 - Fast" || txt === "Veo 3.1 - Quality" || 
                    txt === "Fast" || txt === "Quality" || 
                    txt === "Veo 3.1 - เร็ว" || txt === "Veo 3.1 - คุณภาพสูง" || txt === "Veo 3.1 - คุณภาพ" ||
                    txt === "Veo 2 - Fast" || txt === "Veo 2 - Quality"
                ) {
                    const rect = el.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        dropdownBtn = el;
                        LOG(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${txt}"`);
                        break;
                    }
                }
            }
        }

        // Strategy E: Look for any clickable element containing "3.1" near the prompt bar area (bottom half)
        if (!dropdownBtn) {
            const allEls = document.querySelectorAll<HTMLElement>("button, [role='button'], div[tabindex], span[tabindex]");
            for (const el of allEls) {
                const txt = (el.textContent || "").trim();
                if (txt.length > 60) continue;
                if (txt.includes("3.1") || txt.includes("model") || txt.includes("โมเดล")) {
                    const rect = el.getBoundingClientRect();
                    if (rect.bottom > window.innerHeight * 0.4 && rect.width > 0 && rect.height > 0) {
                        dropdownBtn = el;
                        LOG(`พบปุ่ม model selector (Strategy E): "${txt.substring(0, 50).trim()}"`);
                        break;
                    }
                }
            }
        }

        if (!dropdownBtn) {
            await sleep(1000);
        }
    }

    if (!dropdownBtn) {
        WARN("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)");
        return true; // ★ Return true (non-fatal) — don't block automation just because dropdown wasn't found
    }

    // Check if already showing the target quality
    const currentTxt = (dropdownBtn.textContent || "").trim();
    if (
        currentTxt.includes(targetLabel) || 
        (currentTxt.includes(shortLabel) && !currentTxt.includes(oppositeShortLabel)) ||
        (currentTxt.includes(thShortLabel) && !currentTxt.includes(thOppositeShortLabel))
    ) {
        LOG(`✅ Veo quality เป็น "${currentTxt}" อยู่แล้ว — ไม่ต้องเปลี่ยน`);
        return true;
    }

    // Step 2: Click the dropdown trigger
    const dRect = dropdownBtn.getBoundingClientRect();
    const dCx = dRect.left + dRect.width / 2;
    const dCy = dRect.top + dRect.height / 2;
    const dOpts = { bubbles: true, cancelable: true, clientX: dCx, clientY: dCy, button: 0 };
    dropdownBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    dropdownBtn.dispatchEvent(new MouseEvent("mousedown", dOpts));
    await sleep(80);
    dropdownBtn.dispatchEvent(new PointerEvent("pointerup", { ...dOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
    dropdownBtn.dispatchEvent(new MouseEvent("mouseup", dOpts));
    dropdownBtn.dispatchEvent(new MouseEvent("click", dOpts));
    LOG("คลิกเปิด Veo quality dropdown");
    await sleep(1000);

    // Step 3: Find and click the target option in the dropdown menu
    let found = false;
    const menuItems = document.querySelectorAll<HTMLElement>("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");
    for (const item of menuItems) {
        // Check spans inside for exact text match or check full text content
        const itemTxt = (item.textContent || "").trim();
        const hasTargetText = itemTxt === targetLabel || itemTxt === shortLabel || itemTxt.includes(targetLabel) || itemTxt.includes(thShortLabel);
        
        if (hasTargetText && !itemTxt.includes("arrow_drop_down")) {
            const iRect = item.getBoundingClientRect();
            if (iRect.width > 0 && iRect.height > 0) {
                const iCx = iRect.left + iRect.width / 2;
                const iCy = iRect.top + iRect.height / 2;
                const iOpts = { bubbles: true, cancelable: true, clientX: iCx, clientY: iCy, button: 0 };
                item.dispatchEvent(new PointerEvent("pointerdown", { ...iOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                item.dispatchEvent(new MouseEvent("mousedown", iOpts));
                await sleep(80);
                item.dispatchEvent(new PointerEvent("pointerup", { ...iOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                item.dispatchEvent(new MouseEvent("mouseup", iOpts));
                item.dispatchEvent(new MouseEvent("click", iOpts));
                LOG(`✅ เลือก "${itemTxt}" สำเร็จ`);
                found = true;
                break;
            }
        }
    }

    if (!found) {
        WARN(`ไม่พบตัวเลือก "${targetLabel}" หรือ "${thShortLabel}" ใน dropdown`);
        // Close the dropdown
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
        await sleep(300);
        document.body.click();
        return false;
    }

    await sleep(600);
    return true;
}

/**
 * Main handler: configure → upload images → paste prompt → click generate
 * IMPORTANT: Never abort early — always try to paste prompt and click generate
 */
async function handleGenerateImage(req: GenerateImageRequest): Promise<{ success: boolean; message: string; step: string }> {
    // ── Pre-flight: Clear console + stale cache to prevent extension conflicts ──
    try {
        console.clear();
        console.log("%c[Netflow AI] 🚀 Automation started — console cleared", "color:#00e676;font-weight:bold;font-size:14px");
        // Clear any stale Netflow session data (NOT localStorage — that belongs to Google Flow)
        sessionStorage.removeItem("netflow_last_run");
        sessionStorage.setItem("netflow_last_run", new Date().toISOString());
    } catch { /* ignore if blocked */ }

    // ── System Info Check ──
    const ua = navigator.userAgent;
    const chromeMatch = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/);
    const chromeVer = chromeMatch ? chromeMatch[1] : "unknown";
    const osName = isMac ? "macOS" : isWindows ? "Windows" : /Linux/i.test(ua) ? "Linux" : /CrOS/i.test(ua) ? "ChromeOS" : "Unknown";
    const osDetail = isMac ? (ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, ".") || "") :
                     isWindows ? (ua.match(/Windows NT ([0-9.]+)/)?.[1] || "") : "";
    const lang = navigator.language || "unknown";
    const screen = `${window.innerWidth}x${window.innerHeight}`;
    LOG(`══════════════════════════════════════════`);
    LOG(`🖥️ ระบบ: ${osName} ${osDetail} | Chrome ${chromeVer}`);
    LOG(`🌐 ภาษา: ${lang} | หน้าจอ: ${screen} | แพลตฟอร์ม: ${platformTag}`);
    LOG(`══════════════════════════════════════════`);

    // ── Apply theme from sidepanel + Show Engine Overlay ──
    try { setOverlayTheme(req.theme); } catch (_) {}
    try { showOverlay(); } catch (e) { console.warn("Overlay show error:", e); }

    const steps: string[] = [];
    const errors: string[] = [];

    // ── Step 0: Configure settings ──
    try {
        updateStep("settings", "active");
        const orientation = req.orientation || "horizontal";
        const outputCount = req.outputCount || 1;
        const ok = await configureFlowSettings(orientation, outputCount);
        steps.push(ok ? "✅ Settings" : "⚠️ Settings");
        updateStep("settings", ok ? "done" : "error");
    } catch (e: any) {
        WARN(`ตั้งค่าผิดพลาด: ${e.message}`);
        steps.push("⚠️ Settings");
        updateStep("settings", "error");
    }

    // ── Step 0.5: Select Veo quality (Fast / Quality) ──
    try {
        const veoQuality = req.veoQuality || "fast";
        const qOk = await selectVeoQuality(veoQuality);
        if (qOk) {
            steps.push(`✅ Veo ${veoQuality}`);
            LOG(`✅ Veo quality: ${veoQuality}`);
        } else {
            steps.push(`⚠️ Veo quality`);
            WARN("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม");
        }
    } catch (e: any) {
        WARN(`Veo quality error: ${e.message}`);
        steps.push("⚠️ Veo quality");
    }

    // ── Step 0.9: Close any lingering dropdown/popover from settings/quality selection ──
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(300);
    document.body.click();
    await sleep(500);

    // ── Step 1: Upload reference images ──
    LOG("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");

    /** Check if any upload is still in progress (look for % text on thumbnails) */
    const isUploadInProgress = (): string | null => {
        const allElements = document.querySelectorAll<HTMLElement>("span, div, p, label");
        for (const el of allElements) {
            const txt = (el.textContent || "").trim();
            if (/^\d{1,3}%$/.test(txt)) {
                // 100% means upload finished — treat as complete
                if (txt === "100%") return null;
                const rect = el.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0 && rect.top > 0 && rect.top < window.innerHeight) {
                    return txt;
                }
            }
        }
        return null;
    };

    /** Wait until all uploads finish (no more % indicators visible), timeout 60s */
    const waitForUploadsComplete = async (label: string): Promise<void> => {
        LOG(`รอการอัพโหลด ${label} เสร็จ...`);
        await sleep(2000); // initial wait for % to appear
        const start = Date.now();
        const timeout = 60000;
        let lastPct = "";
        let lastPctChangeTime = Date.now();
        const staleTimeout = 15000; // if % unchanged for 15s, consider done
        while (Date.now() - start < timeout) {
            const pct = isUploadInProgress();
            if (pct) {
                if (pct !== lastPct) {
                    lastPct = pct;
                    lastPctChangeTime = Date.now();
                    LOG(`กำลังอัพโหลด: ${pct} — รอ...`);
                } else if (Date.now() - lastPctChangeTime > staleTimeout) {
                    LOG(`✅ อัพโหลด ${label} — % ค้างที่ ${pct} นาน ${staleTimeout / 1000} วินาที ถือว่าเสร็จ`);
                    await sleep(1000);
                    return;
                }
                await sleep(1500);
            } else {
                LOG(`✅ อัพโหลด ${label} เสร็จ — ไม่พบตัวบอก %`);
                await sleep(1000); // extra settle time after upload finishes
                return;
            }
        }
        WARN(`⚠️ อัพโหลด ${label} หมดเวลาหลัง ${timeout / 1000} วินาที — ดำเนินการต่อ`);
    };

    if (req.characterImage) {
        updateStep("upload-char", "active");
        try {
            const ok = await uploadImageToPromptBar(req.characterImage, "character.png");
            steps.push(ok ? "✅ ตัวละคร" : "⚠️ ตัวละคร");
            if (!ok) errors.push("character upload failed");
            updateStep("upload-char", ok ? "done" : "error");
        } catch (e: any) {
            WARN(`อัพโหลดตัวละครผิดพลาด: ${e.message}`);
            steps.push("❌ ตัวละคร");
            errors.push("character upload error");
            updateStep("upload-char", "error");
        }
        await waitForUploadsComplete("character");
        // Close any lingering upload dialog before next upload
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
        await sleep(500);
    } else {
        skipStep("upload-char");
    }

    if (req.productImage) {
        updateStep("upload-prod", "active");
        try {
            const ok = await uploadImageToPromptBar(req.productImage, "product.png");
            steps.push(ok ? "✅ สินค้า" : "⚠️ สินค้า");
            if (!ok) errors.push("product upload failed");
            updateStep("upload-prod", ok ? "done" : "error");
        } catch (e: any) {
            WARN(`อัพโหลดสินค้าผิดพลาด: ${e.message}`);
            steps.push("❌ สินค้า");
            errors.push("product upload error");
            updateStep("upload-prod", "error");
        }
        await waitForUploadsComplete("product");
        // Close any lingering upload dialog after product upload (same as character)
        document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
        await sleep(500);
    } else {
        skipStep("upload-prod");
    }

    // ── Step 1c: Close any open dialog/modal (Escape key) ──
    LOG("ปิด dialog ที่เปิดอยู่...");
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(800);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    await sleep(800);

    // ── Step 1d: Final check — make sure no uploads are still running ──
    const finalPct = isUploadInProgress();
    if (finalPct) {
        LOG(`⚠️ อัพโหลดยังแสดง ${finalPct} — รอเพิ่มเติม...`);
        await waitForUploadsComplete("final");
    }
    LOG("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt");
    await sleep(1000);

    // ── Step 1e: Verify reference thumbnails appeared in prompt bar ──
    const expectedThumbs = (req.characterImage ? 1 : 0) + (req.productImage ? 1 : 0);
    if (expectedThumbs > 0) {
        let thumbCount = countPromptBarThumbnails();
        if (thumbCount < expectedThumbs) {
            LOG(`⏳ เห็นรูปย่อแค่ ${thumbCount}/${expectedThumbs} — รอ 3 วินาที...`);
            await sleep(3000);
            thumbCount = countPromptBarThumbnails();
        }
        if (thumbCount >= expectedThumbs) {
            LOG(`✅ ยืนยันรูปย่ออ้างอิง: ${thumbCount}/${expectedThumbs}`);
        } else {
            WARN(`⚠️ คาดว่าจะมี ${expectedThumbs} รูปย่อ แต่พบ ${thumbCount} — ดำเนินการต่อ`);
        }
    }

    // ── Stop gate ──
    if (checkStop()) {
        LOG("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt");
        errors.push("stopped by user");
        try { completeOverlay(3000); } catch (_) {}
        return { success: false, message: "⛔ หยุดโดยผู้ใช้", step: "stopped" };
    }

    // ── Step 2: ALWAYS paste prompt (even if uploads failed) ──
    LOG("=== ขั้น 2: วาง Image Prompt ===");
    updateStep("img-prompt", "active");
    await sleep(1000);
    const promptInput = findPromptTextInput();
    if (promptInput) {
        await setPromptText(promptInput, req.imagePrompt);
        LOG(`วาง Prompt แล้ว (${req.imagePrompt.length} ตัวอักษร)`);
        steps.push("✅ Prompt");
        updateStep("img-prompt", "done");
    } else {
        WARN("ไม่พบช่องป้อนข้อความ Prompt");
        steps.push("❌ Prompt");
        errors.push("prompt input not found");
        updateStep("img-prompt", "error");
    }
    await sleep(800);

    // ── Snapshot existing images BEFORE generating ──
    const existingImageSrcs = new Set<string>();
    document.querySelectorAll<HTMLImageElement>("img").forEach(img => {
        if (img.src) existingImageSrcs.add(img.src);
    });
    LOG(`บันทึกรูปเดิม: ${existingImageSrcs.size} รูปก่อน Generate`);

    // ── Step 3: ALWAYS click Generate → (even if some steps failed) ──
    LOG("=== ขั้น 3: คลิก Generate → ===");
    updateStep("img-generate", "active");
    await sleep(500);
    const genBtn = findGenerateButton();
    if (genBtn) {
        // React needs full mouse event sequence, not just .click()
        const rect = genBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const evtOpts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };

        genBtn.dispatchEvent(new PointerEvent("pointerdown", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mousedown", evtOpts));
        await sleep(80);
        genBtn.dispatchEvent(new PointerEvent("pointerup", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mouseup", evtOpts));
        genBtn.dispatchEvent(new MouseEvent("click", evtOpts));
        LOG("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว");
        steps.push("✅ Generate");

        // Safety: try again after 500ms if first didn't register
        await sleep(500);
        genBtn.dispatchEvent(new PointerEvent("pointerdown", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mousedown", evtOpts));
        await sleep(80);
        genBtn.dispatchEvent(new PointerEvent("pointerup", { ...evtOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
        genBtn.dispatchEvent(new MouseEvent("mouseup", evtOpts));
        genBtn.dispatchEvent(new MouseEvent("click", evtOpts));
        LOG("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate");
        updateStep("img-generate", "done");
    } else {
        WARN("ไม่พบปุ่ม → Generate");
        steps.push("❌ Generate");
        errors.push("generate button not found");
        updateStep("img-generate", "error");
    }

    // ── Step 4: Wait for NEW image → hover → 3-dots → "ทำให้เป็นภาพเคลื่อนไหว" ──
    LOG("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ===");
    updateStep("img-wait", "active");
    try {
        // Step 4a: Wait minimum 15s for generation to start, then poll for NEW images
        LOG("รอ 15 วินาทีเพื่อเริ่มการสร้าง...");
        await sleep(15000);

        // ── Helper: scan for image generation % on page ──
        const scanImagePct = (): number | null => {
            const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
            for (const el of els) {
                if (el.closest("#netflow-engine-overlay")) continue;
                const txt = (el.textContent || "").trim();
                if (txt.length > 10) continue;
                const m = txt.match(/(\d{1,3})\s*%/);
                if (!m) continue;
                const pct = parseInt(m[1], 10);
                if (pct < 1 || pct > 100) continue;
                if (_hidden()) {
                    // When tab is hidden, getBoundingClientRect returns 0s — trust text match alone
                    return pct;
                }
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.width > 150) continue;
                if (rect.top < 0 || rect.top > window.innerHeight) continue;
                return pct;
            }
            return null;
        };

        LOG("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");
        let generatedImg: HTMLElement | null = null;
        let lastImgPct = -1;
        let lastImgPctTime = 0;
        const imgWaitStart = Date.now();
        while (!generatedImg && Date.now() - imgWaitStart < 180000) { // 3 min timeout
            const imgs = document.querySelectorAll<HTMLImageElement>("img");

            // Priority 1: find image with alt text containing "generated" (AI-generated images)
            for (const img of imgs) {
                if (existingImageSrcs.has(img.src)) continue;
                const alt = (img.alt || "").toLowerCase();
                if (!alt.includes("generated")) continue;

                const isLargeEnough = _hidden()
                    ? (img.naturalWidth > 120 && img.naturalHeight > 120)
                    : (() => { const rect = img.getBoundingClientRect(); return rect.width > 120 && rect.height > 120 && rect.top > 0 && rect.top < window.innerHeight * 0.85; })();
                if (isLargeEnough) {
                    const parent = img.closest("div") as HTMLElement;
                    if (parent) {
                        generatedImg = parent;
                        LOG(`พบรูป AI จาก alt="${img.alt}": ${img.src.substring(0, 80)}...${_hidden() ? ' (hidden-mode)' : ''}`);
                        break;
                    }
                }
            }

            // Priority 2: fallback — any new large image, but skip reference/uploaded images
            if (!generatedImg) {
                for (const img of imgs) {
                    if (existingImageSrcs.has(img.src)) continue;

                    // Skip uploaded reference images (their container has filename labels)
                    const container = img.closest("div");
                    const containerText = container?.textContent || "";
                    if (containerText.includes("product.png") || containerText.includes("character.png") ||
                        containerText.includes(".png") || containerText.includes(".jpg")) {
                        continue;
                    }

                    const isLarge = _hidden()
                        ? (img.naturalWidth > 120 && img.naturalHeight > 120)
                        : (() => { const rect = img.getBoundingClientRect(); return rect.width > 120 && rect.height > 120 && rect.top > 0 && rect.top < window.innerHeight * 0.85; })();
                    if (isLarge) {
                        const parent = img.closest("div") as HTMLElement;
                        if (parent) {
                            generatedImg = parent;
                            LOG(`พบรูปใหม่ (สำรอง): ${img.src.substring(0, 80)}...${_hidden() ? ' (hidden-mode)' : ''}`);
                            break;
                        }
                    }
                }
            }

            if (!generatedImg) {
                // Check for stop request
                if (checkStop()) {
                    LOG("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");
                    break;
                }
                // Check for generation failure (Thai + English)
                const failMsg = isGenerationFailed();
                if (failMsg) {
                    WARN(`❌ สร้างรูปล้มเหลว: ${failMsg}`);
                    errors.push(`image gen failed: ${failMsg}`);
                    updateStep("img-wait", "error");
                    break;
                }

                // Track image generation % progress
                const imgPct = scanImagePct();
                if (imgPct !== null) {
                    if (imgPct !== lastImgPct) {
                        LOG(`🖼️ ความคืบหน้ารูปภาพ: ${imgPct}%`);
                        lastImgPct = imgPct;
                        updateStep("img-wait", "active", imgPct);
                    }
                    lastImgPctTime = Date.now();
                } else if (lastImgPct > 30) {
                    // % disappeared after being > 30% → image likely done, will be found next loop
                    const lostFor = Math.floor((Date.now() - lastImgPctTime) / 1000);
                    if (lostFor >= 3) {
                        LOG(`🖼️ % หายที่ ${lastImgPct}% — รูปน่าจะเสร็จแล้ว`);
                    }
                }

                // ★ Force DOM update if tab is hidden and progress is stalled
                if (document.hidden && lastImgPct > 0 && Date.now() - lastImgPctTime > 10000) {
                    await briefActivateIfHidden();
                }
                // ★ Also activate tab if we've NEVER found any % for 30+ seconds
                if (document.hidden && lastImgPct < 1 && Date.now() - imgWaitStart > 30000) {
                    await briefActivateIfHidden();
                }

                await sleep(3000);
            }
        }

        if (!generatedImg) {
            WARN("หมดเวลารอรูปที่สร้าง");
            steps.push("⚠️ Wait Image");
            updateStep("img-wait", "error");
        } else {
            LOG(`พบรูปที่สร้างแล้ว`);
            steps.push("✅ Image Found");
            updateStep("img-wait", "done", 100);

            // ★ Ensure tab is visible before hover/click steps that need real coordinates
            await ensureTabVisible();

            // Step 4b: Hover over the image to reveal the 3 overlay icons
            const imgRect = generatedImg.getBoundingClientRect();
            const imgCx = imgRect.left + imgRect.width / 2;
            const imgCy = imgRect.top + imgRect.height / 2;

            const imgHoverOpts = { bubbles: true, cancelable: true, clientX: imgCx, clientY: imgCy };
            generatedImg.dispatchEvent(new PointerEvent("pointerenter", { ...imgHoverOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            generatedImg.dispatchEvent(new MouseEvent("mouseenter", imgHoverOpts));
            generatedImg.dispatchEvent(new PointerEvent("pointerover", { ...imgHoverOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            generatedImg.dispatchEvent(new MouseEvent("mouseover", imgHoverOpts));
            generatedImg.dispatchEvent(new PointerEvent("pointermove", { ...imgHoverOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            generatedImg.dispatchEvent(new MouseEvent("mousemove", imgHoverOpts));
            LOG("ส่งเหตุการณ์ hover บนรูปแล้ว");
            await sleep(1500);

            // Step 4c: Find and click the 3-dots (more_vert / more_horiz) icon
            let dotsBtn: HTMLElement | null = null;

            // Search for more_vert or more_horiz icon buttons near the image
            for (const iconName of ["more_vert", "more_horiz", "more"]) {
                const btns = findAllButtonsByIcon(iconName);
                for (const btn of btns) {
                    const btnRect = btn.getBoundingClientRect();
                    // Must be near the top-right of the image
                    if (btnRect.top >= imgRect.top - 20 && btnRect.top <= imgRect.bottom &&
                        btnRect.right >= imgRect.right - 150 && btnRect.right <= imgRect.right + 20) {
                        dotsBtn = btn;
                        break;
                    }
                }
                if (dotsBtn) break;
            }

            // Fallback: look for any small button in the top-right corner of the image
            if (!dotsBtn) {
                const allBtns = document.querySelectorAll<HTMLElement>("button");
                for (const btn of allBtns) {
                    const btnRect = btn.getBoundingClientRect();
                    if (btnRect.width < 50 && btnRect.height < 50 &&
                        btnRect.top >= imgRect.top - 10 && btnRect.top <= imgRect.top + 60 &&
                        btnRect.left >= imgRect.right - 80) {
                        // Check if it has 3-dots icon or "เพิ่มเติม" tooltip
                        const icons = btn.querySelectorAll("i");
                        for (const icon of icons) {
                            const t = icon.textContent?.trim() || "";
                            if (t.includes("more")) {
                                dotsBtn = btn;
                                break;
                            }
                        }
                        if (dotsBtn) break;

                        // Or if it's the rightmost small button
                        const aria = btn.getAttribute("aria-label") || "";
                        if (aria.includes("เพิ่มเติม") || aria.includes("more")) {
                            dotsBtn = btn;
                            break;
                        }
                    }
                }
            }

            if (!dotsBtn) {
                WARN("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง");
                steps.push("⚠️ 3-dots");
            } else {
                // Click the 3-dots button with full mouse sequence
                const dotsRect = dotsBtn.getBoundingClientRect();
                const dotsCx = dotsRect.left + dotsRect.width / 2;
                const dotsCy = dotsRect.top + dotsRect.height / 2;
                const dotsOpts = { bubbles: true, cancelable: true, clientX: dotsCx, clientY: dotsCy, button: 0 };

                dotsBtn.dispatchEvent(new PointerEvent("pointerdown", { ...dotsOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                dotsBtn.dispatchEvent(new MouseEvent("mousedown", dotsOpts));
                await sleep(80);
                dotsBtn.dispatchEvent(new PointerEvent("pointerup", { ...dotsOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                dotsBtn.dispatchEvent(new MouseEvent("mouseup", dotsOpts));
                dotsBtn.dispatchEvent(new MouseEvent("click", dotsOpts));
                LOG("คลิกปุ่ม 3 จุดแล้ว");
                await sleep(1500);

                // Step 4d: Find and click "ทำให้เป็นภาพเคลื่อนไหว" in the dropdown
                let animateBtn: HTMLElement | null = null;
                const menuItems = document.querySelectorAll<HTMLElement>(
                    "button, [role='menuitem'], [role='option'], li, div[role='button']"
                );
                for (const item of menuItems) {
                    const txt = (item.textContent || "").trim();
                    if (txt.includes("ทำให้เป็นภาพเคลื่อนไหว") || txt.includes("Animate") || txt.includes("animate")) {
                        animateBtn = item;
                        break;
                    }
                }

                if (!animateBtn) {
                    WARN("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'");
                    steps.push("⚠️ Animate");
                } else {
                    // Click Animate with full mouse sequence
                    const animRect = animateBtn.getBoundingClientRect();
                    const animCx = animRect.left + animRect.width / 2;
                    const animCy = animRect.top + animRect.height / 2;
                    const animOpts = { bubbles: true, cancelable: true, clientX: animCx, clientY: animCy, button: 0 };

                    animateBtn.dispatchEvent(new PointerEvent("pointerdown", { ...animOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                    animateBtn.dispatchEvent(new MouseEvent("mousedown", animOpts));
                    await sleep(80);
                    animateBtn.dispatchEvent(new PointerEvent("pointerup", { ...animOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                    animateBtn.dispatchEvent(new MouseEvent("mouseup", animOpts));
                    animateBtn.dispatchEvent(new MouseEvent("click", animOpts));
                    LOG("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว");
                    steps.push("✅ Animate");
                    updateStep("animate", "done");
                    await sleep(3000);
                }
            }
        }
    } catch (e: any) {
        WARN(`ขั้น 4 ผิดพลาด: ${e.message}`);
        steps.push("⚠️ Animate");
    }

    // ── Stop gate ──
    if (checkStop()) {
        LOG("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ");
        errors.push("stopped by user");
        try { completeOverlay(3000); } catch (_) {}
        return { success: false, message: "⛔ หยุดโดยผู้ใช้", step: "stopped" };
    }

    // ── Step 5: Paste video prompt + Generate video ──
    if (req.videoPrompt) {
        LOG("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ===");
        updateStep("vid-prompt", "active");
        try {
            // Wait for video mode UI to load (image becomes thumbnail in prompt bar)
            LOG("รอ UI โหมดวิดีโอ...");
            await sleep(3000);

            // Verify we're in video mode — look for "วิดีโอ" or "Video" indicator
            let inVideoMode = false;
            const allElements = document.querySelectorAll<HTMLElement>("button, span, div");
            for (const el of allElements) {
                const txt = (el.textContent || "").trim();
                const rect = el.getBoundingClientRect();
                if ((txt === "วิดีโอ" || txt === "Video" || txt.includes("วิดีโอ")) && rect.bottom > window.innerHeight * 0.7) {
                    inVideoMode = true;
                    LOG("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");
                    break;
                }
            }
            if (!inVideoMode) {
                LOG("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");
            }

            // ★ FOCUS_TAB: Keep tab active during paste+generate — Slate.js REQUIRES real document focus
            let needsUnfocus = false;
            if (document.hidden) {
                LOG("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");
                try {
                    await new Promise<void>(r => chrome.runtime.sendMessage({ type: 'FOCUS_TAB' }, () => r()));
                    needsUnfocus = true;
                    // Wait for document.hidden to become false (window must be in foreground)
                    const focusStart = Date.now();
                    while (document.hidden && Date.now() - focusStart < 5000) {
                        await sleep(200);
                    }
                    if (document.hidden) {
                        LOG("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ");
                    } else {
                        LOG("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ");
                        await sleep(3000);
                    }
                } catch (_) { LOG("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ"); }
            }

            // Find prompt input and paste video prompt
            await sleep(1000);
            let vidPromptOk = false;
            for (let attempt = 1; attempt <= 5 && !vidPromptOk; attempt++) {
                // ★ Re-focus Chrome on every retry — previous attempt may have lost focus
                if (attempt > 1 && document.hidden) {
                    LOG(`🔄 Retry ${attempt}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);
                    try {
                        await new Promise<void>(r => chrome.runtime.sendMessage({ type: 'FOCUS_TAB' }, () => r()));
                        needsUnfocus = true;
                        const retryStart = Date.now();
                        while (document.hidden && Date.now() - retryStart < 5000) {
                            await sleep(200);
                        }
                        if (!document.hidden) await sleep(2000);
                    } catch (_) {}
                }
                const videoPromptInput = findPromptTextInput();
                if (!videoPromptInput) {
                    LOG(`⚠️ ครั้งที่ ${attempt}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`);
                    await sleep(3000);
                    continue;
                }
                if (attempt > 1) {
                    videoPromptInput.focus();
                    await sleep(500);
                }
                await setPromptText(videoPromptInput, req.videoPrompt);
                await sleep(500);
                const pastedCheck = (videoPromptInput.textContent || "").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi, "").trim();
                if (pastedCheck.length >= 20) {
                    LOG(`วาง Video Prompt สำเร็จ ครั้งที่ ${attempt} (${pastedCheck.length} ตัวอักษร)`);
                    steps.push("✅ Video Prompt");
                    updateStep("vid-prompt", "done");
                    vidPromptOk = true;
                } else {
                    LOG(`⚠️ ครั้งที่ ${attempt}: Prompt ไม่ถูกวาง (ได้ ${pastedCheck.length} ตัวอักษร)`);
                    await sleep(1500);
                }
            }
            if (!vidPromptOk) {
                WARN("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate");
                steps.push("❌ Video Prompt");
                errors.push("video prompt paste failed after 5 attempts");
                updateStep("vid-prompt", "error");
                throw new Error("Video prompt paste failed");
            }
            await sleep(1000);

            // Click Generate button for video
            updateStep("vid-generate", "active");
            const videoGenBtn = findGenerateButton();
            if (videoGenBtn) {
                const vRect = videoGenBtn.getBoundingClientRect();
                const vCx = vRect.left + vRect.width / 2;
                const vCy = vRect.top + vRect.height / 2;
                const vOpts = { bubbles: true, cancelable: true, clientX: vCx, clientY: vCy, button: 0 };

                videoGenBtn.dispatchEvent(new PointerEvent("pointerdown", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mousedown", vOpts));
                await sleep(80);
                videoGenBtn.dispatchEvent(new PointerEvent("pointerup", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mouseup", vOpts));
                videoGenBtn.dispatchEvent(new MouseEvent("click", vOpts));
                LOG("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!");
                steps.push("✅ Video Generate");
                updateStep("vid-generate", "done");

                // Safety retry after 500ms
                await sleep(500);
                videoGenBtn.dispatchEvent(new PointerEvent("pointerdown", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mousedown", vOpts));
                await sleep(80);
                videoGenBtn.dispatchEvent(new PointerEvent("pointerup", { ...vOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                videoGenBtn.dispatchEvent(new MouseEvent("mouseup", vOpts));
                videoGenBtn.dispatchEvent(new MouseEvent("click", vOpts));
                LOG("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ");
            } else {
                WARN("ไม่พบปุ่ม Generate สำหรับวิดีโอ");
                steps.push("❌ Video Generate");
                errors.push("video generate button not found");
                updateStep("vid-generate", "error");
            }

            // ★ UNFOCUS_TAB: Restore previous tab — video generation runs fine in background
            if (needsUnfocus) {
                await sleep(2000); // wait for generation to start
                try { chrome.runtime.sendMessage({ type: 'UNFOCUS_TAB' }); } catch (_) {}
                LOG("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง");
            }
        } catch (e: any) {
            WARN(`ขั้น 5 ผิดพลาด: ${e.message}`);
            steps.push("⚠️ Video Gen");
            errors.push(`video gen error: ${e.message}`);
        }
    } else {
        LOG("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ");
        skipStep("animate"); skipStep("vid-prompt"); skipStep("vid-generate"); skipStep("vid-wait");
    }

    // ── Step 6: Wait for video generation complete + handle scenes/download ──
    if (req.videoPrompt) {
        updateStep("vid-wait", "active");
        const totalScenes = req.sceneCount || 1;
        const scenePrompts = req.videoScenePrompts || [req.videoPrompt];

        // Configure overlay for multi-scene (adds per-scene steps dynamically)
        if (totalScenes > 1) {
            try { configureScenes(totalScenes); } catch (_) { /* overlay may not be visible */ }
        }

        LOG(`=== ขั้น 6: รอวิดีโอ + ${totalScenes > 1 ? `ต่อ ${totalScenes} ฉาก` : 'ดาวน์โหลด'} ===`);

        // ── Shared: Scan for "X%" by querying ALL elements directly ──
        const scanForPct = (): number | null => {
            const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
            for (const el of els) {
                // Skip elements inside our own overlay (they echo the % back, causing feedback loop)
                if (el.closest("#netflow-engine-overlay")) continue;
                const txt = (el.textContent || "").trim();
                if (txt.length > 10) continue;
                const m = txt.match(/(\d{1,3})\s*%/);
                if (!m) continue;
                const pct = parseInt(m[1], 10);
                if (pct < 1 || pct > 100) continue;
                if (_hidden()) {
                    // When tab is hidden, getBoundingClientRect returns 0s — trust text match alone
                    return pct;
                }
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.width > 150) continue;
                if (rect.top < 0 || rect.top > window.innerHeight) continue;
                return pct;
            }
            return null;
        };

        /**
         * Wait for a NEW video to appear (play icon ▶ on thumbnail).
         * Returns the video card element or null on timeout.
         */
        const waitForVideoComplete = async (timeoutMs = 600000): Promise<HTMLElement | null> => {
            LOG("รอการสร้างวิดีโอ...");
            updateStep("vid-wait", "active");
            await sleep(5000);

            // ── Debug: dump all elements containing "%" text ──
            const debugDumpPct = () => {
                const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
                let count = 0;
                for (const el of els) {
                    if (el.closest("#netflow-engine-overlay")) continue;
                    const txt = (el.textContent || "").trim();
                    if (txt.includes("%") && txt.length < 15) {
                        const tag = el.tagName.toLowerCase();
                        const cls = el.className && typeof el.className === "string"
                            ? el.className.split(/\s+/).slice(0, 2).join(" ")
                            : "";
                        const rect = el.getBoundingClientRect();
                        LOG(`  🔍 "${txt}" ใน <${tag}.${cls}> ที่ (${rect.left.toFixed(0)},${rect.top.toFixed(0)}) w=${rect.width.toFixed(0)}`);
                        count++;
                        if (count >= 5) break;
                    }
                }
                if (count === 0) LOG("  🔍 ไม่พบ element ที่มีข้อความ '%'");
            };

            // Debug: scan for existing cards at start
            const earlyVideoCard = findFirstVideoCard();
            if (earlyVideoCard) {
                LOG(`📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม`);
            } else {
                LOG("⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %");
            }

            // Debug: dump % text once
            LOG("🔍 สแกนข้อความ % เพื่อตรวจสอบ:");
            debugDumpPct();

            const start = Date.now();
            let lastPct = -1;
            let lastPctTime = 0;
            let completed = false;

            // Poll until completion
            while (Date.now() - start < timeoutMs) {
                const pct = scanForPct();
                if (pct !== null) {
                    if (pct !== lastPct) {
                        LOG(`ความคืบหน้าวิดีโอ: ${pct}%`);
                        lastPct = pct;
                        updateStep("vid-wait", "active", pct);
                    }
                    lastPctTime = Date.now();
                    if (pct >= 100) {
                        LOG("✅ ตรวจพบ 100%!");
                        completed = true;
                        break;
                    }
                } else if (lastPct > 30) {
                    // % disappeared = video generation finished
                    const lostFor = Math.floor((Date.now() - lastPctTime) / 1000);
                    if (lostFor >= 5) {
                        LOG(`✅ % หายไปที่ ${lastPct}% (หาย ${lostFor} วินาที) — วิดีโอเสร็จ!`);
                        completed = true;
                        break;
                    }
                    LOG(`⏳ % หายที่ ${lastPct}% — ยืนยันใน ${5 - lostFor} วินาที...`);
                } else {
                    const elapsed = Math.floor((Date.now() - start) / 1000);
                    if (elapsed % 15 < 3) {
                        LOG(`⏳ รอ... (${elapsed} วินาที) ไม่พบ %`);
                    }
                }

                // Secondary completion signal: if a video card appeared, video is done
                if (!completed && lastPct > 0) {
                    const newCard = findFirstVideoCard(true);
                    if (newCard && !earlyVideoCard) {
                        LOG(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${lastPct}% — วิดีโอเสร็จ!`);
                        completed = true;
                        break;
                    }
                }

                // Stop + failure checks inside video wait loop
                if (checkStop()) {
                    LOG("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ");
                    return null;
                }
                if (lastPct < 1) {
                    const failMsg = isGenerationFailed();
                    if (failMsg) {
                        WARN(`❌ สร้างวิดีโอล้มเหลว: ${failMsg}`);
                        return null;
                    }
                }

                // ★ Force DOM update if tab is hidden and progress is stalled
                if (document.hidden && lastPct > 0 && Date.now() - lastPctTime > 10000) {
                    await briefActivateIfHidden();
                }
                // ★ Also activate tab if we've NEVER found any % for 30+ seconds
                // (generation might not have started, or % element isn't rendering in background)
                if (document.hidden && lastPct < 1 && Date.now() - start > 30000) {
                    await briefActivateIfHidden();
                }

                await sleep(3000);
            }

            // ★ Ensure tab is visible before hover+click on video card
            await ensureTabVisible();

            // Now find the VIDEO card to click — retry up to 10 times (card may take time to render after % disappears)
            let videoCard: HTMLElement | null = null;
            for (let cardAttempt = 1; cardAttempt <= 10; cardAttempt++) {
                videoCard = findFirstVideoCard();
                if (videoCard) break;
                LOG(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${cardAttempt}/10)`);
                if (cardAttempt % 3 === 0) {
                    // Re-ensure tab is visible every 3 attempts
                    await ensureTabVisible();
                }
                await sleep(3000);
            }
            if (!videoCard) {
                LOG("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)");
                updateStep("vid-wait", "error");
                return null;
            }

            const el = videoCard;
            if (completed) {
                updateStep("vid-wait", "done", 100);
                LOG("รอ 4 วินาทีก่อนคลิก...");
                await sleep(4000);
            } else {
                LOG("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");
            }

            // Find the actual visual element inside the card for precise clicking
            const cardRect = el.getBoundingClientRect();
            let cx = cardRect.left + cardRect.width / 2;
            let cy = cardRect.top + cardRect.height / 2;
            let clickTarget: HTMLElement = el;

            // Look for actual thumbnail element (video/img/canvas) inside the card
            const thumb = el.querySelector("video, img, canvas") as HTMLElement | null;
            if (thumb) {
                const tr = thumb.getBoundingClientRect();
                if (tr.width > 50 && tr.height > 50) {
                    cx = tr.left + tr.width / 2;
                    cy = tr.top + tr.height / 2;
                    clickTarget = thumb;
                    LOG(`🎯 พบรูปย่อ <${thumb.tagName.toLowerCase()}> ในการ์ดที่ (${cx.toFixed(0)},${cy.toFixed(0)}) ${tr.width.toFixed(0)}x${tr.height.toFixed(0)}`);
                }
            } else {
                // No visual child — click top 1/3 of card where thumbnail typically is
                cy = cardRect.top + cardRect.height * 0.3;
                LOG(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${cx.toFixed(0)},${cy.toFixed(0)})`);
            }

            // Hover 4s (with PointerEvents for Mac Radix UI compatibility)
            LOG(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${cx.toFixed(0)}, ${cy.toFixed(0)})...`);
            robustHover(clickTarget);
            for (let t = 0; t < 8; t++) {
                const moveOpts = { bubbles: true, cancelable: true, clientX: cx + (t % 2), clientY: cy };
                clickTarget.dispatchEvent(new PointerEvent("pointermove", { ...moveOpts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
                clickTarget.dispatchEvent(new MouseEvent("mousemove", moveOpts));
                await sleep(500);
            }

            // ★ Save pending action BEFORE clicking (page will navigate, destroying this script)
            try {
                chrome.storage.local.set({ [pendingActionKey()]: { timestamp: Date.now(), action: "mute_video", sceneCount: totalScenes, scenePrompts: scenePrompts, theme: req.theme } });
                LOG(`💾 บันทึก pending action: mute_video (${totalScenes} ฉาก, ${scenePrompts.length} prompts, theme: ${req.theme})`);
            } catch (e: any) {
                LOG(`⚠️ ไม่สามารถบันทึก pending action: ${e.message}`);
            }

            // Click the card to open detail view (single click only — double causes re-navigation black screen)
            LOG("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด...");
            await clickVideoCard(clickTarget);
            LOG("✅ คลิกการ์ดวิดีโอเสร็จ");
            return el;
        };

        /**
         * Click a video card to open the detail view.
         */
        const clickVideoCard = async (card: HTMLElement) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };

            card.dispatchEvent(new PointerEvent("pointerdown", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            card.dispatchEvent(new MouseEvent("mousedown", opts));
            await sleep(80);
            card.dispatchEvent(new PointerEvent("pointerup", { ...opts, pointerId: 1, isPrimary: true, pointerType: "mouse" }));
            card.dispatchEvent(new MouseEvent("mouseup", opts));
            card.dispatchEvent(new MouseEvent("click", opts));
            await sleep(50); card.click();
            LOG("คลิกการ์ดวิดีโอแล้ว");
            await sleep(2000);
        };

        try {
            // Wait for the first video to complete → hover → click → navigate to detail
            const videoCard = await waitForVideoComplete();
            if (!videoCard) {
                WARN("หมดเวลารอการสร้างวิดีโอ");
                steps.push("⚠️ Video Wait");
                updateStep("vid-wait", "error");
            } else {
                steps.push("✅ Video Complete");
                updateStep("vid-wait", "done", 100);
                LOG("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action");

                // ★ SPA navigation fix: if script survived the card click (no full page reload),
                // the pending action won't be picked up by checkAndRunPendingAction (only runs at init).
                // Wait 3s then check — if pending action is still unclaimed, execute it directly.
                await sleep(3000);
                const pendingCheck = await new Promise<any>((resolve) => {
                    chrome.storage.local.get(pendingActionKey(), (data) => {
                        if (chrome.runtime.lastError) { resolve(null); return; }
                        resolve(data?.[pendingActionKey()] || null);
                    });
                });
                if (pendingCheck && !pendingCheck._claimed) {
                    LOG("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง");
                    chrome.storage.local.remove(pendingActionKey());
                    if (pendingCheck.action === "mute_video") {
                        await standaloneMuteAndDownload(pendingCheck.sceneCount || 1, pendingCheck.scenePrompts || [], pendingCheck.theme);
                    } else if (pendingCheck.action === "wait_scene_gen_and_download") {
                        await waitForSceneGenAndDownload(pendingCheck.sceneCount || 2, pendingCheck.currentScene || 2, pendingCheck.theme, pendingCheck.scenePrompts || []);
                    }
                }
            }
        } catch (e: any) {
            WARN(`ขั้น 6 ผิดพลาด: ${e.message}`);
            steps.push("⚠️ Step6");
            errors.push(`step 6: ${e.message}`);
        }
    }

    const success = errors.length === 0;

    // ── Complete Overlay ──
    try { completeOverlay(success ? 5000 : 8000); } catch (e) { console.warn("Overlay complete error:", e); }

    return {
        success,
        message: success
            ? `สำเร็จ! ${steps.join(" → ")}`
            : `บางขั้นตอนมีปัญหา: ${steps.join(" → ")} | ${errors.join(", ")}`,
        step: success ? "done" : "partial"
    };
}

// ─── Pending Action: mute video after page navigation ────────────────────────

/**
 * Mute video on detail page after navigation.
 * For 1-scene: also runs download → 1080p Upscaled → wait upscaling → open in Chrome.
 */
async function standaloneMuteAndDownload(sceneCount: number, scenePrompts: string[] = [], theme?: string): Promise<void> {
    LOG("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");

    // Re-show overlay with correct theme AND scene count (page navigation destroyed both)
    try { if (theme) setOverlayTheme(theme); } catch (_) {}
    try { showOverlay(sceneCount); } catch (e: any) { LOG(`⚠️ showOverlay error: ${e.message}`); }

    // Restore overlay progress — all steps up to video detail are DONE
    try {
        const doneSteps = ["settings", "upload-char", "upload-prod", "img-prompt", "img-generate", "img-wait", "animate", "vid-prompt", "vid-generate", "vid-wait"];
        for (const s of doneSteps) updateStep(s, "done");
        if (sceneCount >= 2) updateStep("scene2-prompt", "active");
        LOG(`✅ overlay restored: ${doneSteps.length} steps done, sceneCount=${sceneCount}`);
    } catch (e: any) { LOG(`⚠️ overlay restore error: ${e.message}`); }

    // ── Step A: Mute video ──
    await sleep(1500); // wait for video player to render
    const muteBtn = (() => {
        for (const btn of document.querySelectorAll<HTMLElement>("button")) {
            const icons = btn.querySelectorAll("i");
            for (const icon of icons) {
                const txt = (icon.textContent || "").trim();
                if (txt === "volume_up" || txt === "volume_off" || txt === "volume_mute") {
                    const r = btn.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) return btn;
                }
            }
            const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
            if (aria.includes("mute") || aria.includes("ปิดเสียง")) {
                const r = btn.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) return btn;
            }
        }
        return null;
    })();
    if (muteBtn) {
        muteBtn.click();
        LOG("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅");
    } else {
        LOG("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");
    }

    // ── TikTok video URL will be captured from download URL (not page video) ──
    let tiktokVideoUrl: string | null = null;

    // ── 2+ scenes: paste remaining scene prompts, generate each, then download Full Video 720p ──
    if (sceneCount >= 2) {
        LOG(`═══ ${sceneCount} ฉาก — เริ่มต่อฉาก ═══`);
        await sleep(2000);

        // Helper: find visible element by text
        const findByText2 = (text: string, sel = "button, [role='menuitem'], [role='option'], li, span, div[role='button'], div"): HTMLElement | null => {
            let best: HTMLElement | null = null;
            let bestLen = Infinity;
            for (const el of document.querySelectorAll<HTMLElement>(sel)) {
                const t = (el.textContent || "").trim();
                if (t.includes(text) && t.length < 100) {
                    const r = el.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0 && r.top >= 0 && t.length < bestLen) {
                        best = el;
                        bestLen = t.length;
                    }
                }
            }
            return best;
        };

        // For each additional scene (2, 3, ...)
        for (let scene = 2; scene <= sceneCount; scene++) {
            const prompt = scenePrompts[scene - 1];
            if (!prompt) { WARN(`ไม่พบ prompt สำหรับฉากที่ ${scene}`); continue; }

            LOG(`── ฉากที่ ${scene}/${sceneCount}: วาง prompt + generate ──`);

            // Find the Slate prompt editor (bottom prompt bar on video detail page)
            let slateEditor: HTMLElement | null = null;
            const taPollStart = Date.now();
            while (!slateEditor && Date.now() - taPollStart < 10000) {
                // Priority 1: Slate editor with data-slate-editor attribute
                const slateEditors = document.querySelectorAll<HTMLElement>("[data-slate-editor='true']");
                if (slateEditors.length > 0) {
                    // Pick the LAST one (bottom of page = the extend/continue prompt bar)
                    slateEditor = slateEditors[slateEditors.length - 1];
                }
                // Priority 2: role=textbox with contenteditable
                if (!slateEditor) {
                    const textboxes = document.querySelectorAll<HTMLElement>("[role='textbox'][contenteditable='true']");
                    if (textboxes.length > 0) {
                        slateEditor = textboxes[textboxes.length - 1];
                    }
                }
                if (!slateEditor) { await sleep(1000); }
            }
            if (!slateEditor) { WARN("ไม่พบช่อง prompt (Slate editor)"); return; }
            LOG(`พบ Slate editor: <${slateEditor.tagName.toLowerCase()}> ${slateEditor.className.substring(0, 40)}`);

            // Paste prompt using Slate-compatible method (same as main flow)
            await setPromptText(slateEditor, prompt);
            LOG(`วาง prompt ฉาก ${scene} (${prompt.length} ตัวอักษร) ✅`);
            try { updateStep(`scene${scene}-prompt`, "done"); updateStep(`scene${scene}-gen`, "active"); } catch (_) {}
            await sleep(1000);

            // Click the generate/send button — find the one NEAREST to the Slate editor (same parent area)
            const editorRect = slateEditor.getBoundingClientRect();
            let sendBtn: HTMLElement | null = null;
            let bestDist = Infinity;

            for (const btn of document.querySelectorAll<HTMLElement>("button")) {
                if ((btn as HTMLButtonElement).disabled) continue; // skip disabled buttons
                const icons = btn.querySelectorAll("i");
                let hasArrow = false;
                for (const icon of icons) {
                    const txt = (icon.textContent || "").trim();
                    if (txt === "arrow_forward") { hasArrow = true; break; }
                }
                if (!hasArrow) continue;
                const r = btn.getBoundingClientRect();
                if (r.width <= 0 || r.height <= 0) continue;
                // Prefer buttons near the editor (same vertical area)
                const dist = Math.abs(r.top - editorRect.top) + Math.abs(r.right - editorRect.right);
                if (dist < bestDist) {
                    bestDist = dist;
                    sendBtn = btn;
                }
            }
            // Fallback: any visible arrow_forward button
            if (!sendBtn) {
                for (const btn of document.querySelectorAll<HTMLElement>("button")) {
                    const icons = btn.querySelectorAll("i");
                    for (const icon of icons) {
                        if ((icon.textContent || "").trim() === "arrow_forward") {
                            const r = btn.getBoundingClientRect();
                            if (r.width > 0 && r.height > 0) { sendBtn = btn; break; }
                        }
                    }
                    if (sendBtn) break;
                }
            }
            if (!sendBtn) { WARN("ไม่พบปุ่ม Generate/Send"); return; }

            // Save pending action BEFORE clicking Generate — Google Flow may navigate to new page
            await new Promise<void>((resolve) => {
                chrome.storage.local.set({
                    [pendingActionKey()]: {
                        timestamp: Date.now(),
                        action: "wait_scene_gen_and_download",
                        theme: theme,
                        sceneCount: sceneCount,
                        currentScene: scene,
                        scenePrompts: scenePrompts
                    }
                }, () => resolve());
            });
            LOG(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${scene}/${sceneCount})`);

            await robustClick(sendBtn);
            LOG(`คลิก Generate ฉาก ${scene} ✅`);
            try { updateStep(`scene${scene}-gen`, "done"); updateStep(`scene${scene}-wait`, "active"); } catch (_) {}

            // Track % for this scene
            LOG(`── รอวิดีโอฉาก ${scene} gen เสร็จ ──`);
            await sleep(5000); // initial wait

            let lastPct = 0;
            let pctGoneAt = 0;
            const scenePollStart = Date.now();
            const SCENE_TIMEOUT = 600000; // 10 min
            const PCT_GONE_CONFIRM = 5000; // % gone for 5s = done
            let sceneGenDone = false;

            while (Date.now() - scenePollStart < SCENE_TIMEOUT) {
                let foundPct: number | null = null;
                const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
                for (const el of els) {
                    if (el.closest("#netflow-engine-overlay")) continue;
                    const txt = (el.textContent || "").trim();
                    const m = txt.match(/^(\d{1,3})%$/);
                    if (m) {
                        const r = el.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0 && r.width < 120 && r.height < 60) {
                            foundPct = parseInt(m[1], 10);
                            break;
                        }
                    }
                }
                if (foundPct !== null) {
                    if (foundPct !== lastPct) {
                        LOG(`🎬 ฉาก ${scene} ความคืบหน้า: ${foundPct}%`);
                        lastPct = foundPct;
                        try { updateStep(`scene${scene}-wait`, "active", foundPct); } catch (_) {}
                    }
                    pctGoneAt = 0;
                } else if (lastPct > 0) {
                    if (pctGoneAt === 0) {
                        pctGoneAt = Date.now();
                        LOG(`🔍 ฉาก ${scene}: % หายไป (จาก ${lastPct}%) — กำลังยืนยัน...`);
                    } else if (Date.now() - pctGoneAt >= PCT_GONE_CONFIRM) {
                        LOG(`✅ ฉาก ${scene}: % หายไป ${PCT_GONE_CONFIRM / 1000} วินาที — เจนเสร็จ!`);
                        sceneGenDone = true;
                        break;
                    }
                }
                if (checkStop()) { LOG("⛔ ผู้ใช้สั่งหยุด"); return; }

                // ★ Force DOM update if tab is hidden and progress is stalled
                if (document.hidden && lastPct > 0 && pctGoneAt === 0) {
                    await briefActivateIfHidden();
                }

                await sleep(2000);
            }
            if (!sceneGenDone) { WARN(`ฉาก ${scene} หมดเวลา`); }
            LOG(`✅ ฉาก ${scene} เสร็จแล้ว`);
            try { updateStep(`scene${scene}-wait`, "done", 100); } catch (_) {}

            // Clear pending action — page didn't navigate, we completed tracking here
            chrome.storage.local.remove(pendingActionKey());
            LOG("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)");
            await sleep(2000);
        }

        // ── Download: Full Video → 720p (Radix UI selectors) ──
        LOG("── เริ่มดาวน์โหลด Full Video ──");
        try { updateStep("download", "active"); } catch (_) {}
        
        // ★ FOCUS_TAB: Radix UI dropdown menus require real layout/focus to render properly
        let needsDownloadUnfocus = false;
        if (document.hidden) {
            LOG("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");
            try {
                await new Promise<void>(r => chrome.runtime.sendMessage({ type: 'FOCUS_TAB' }, () => r()));
                needsDownloadUnfocus = true;
                await sleep(5000); // wait for focus + layout to settle (5 วิ ชัวร์)
            } catch (_) {}
        }
        
        await sleep(2000);
        const downloadStartedAt2 = Date.now();

        // Step 1: Click ดาวน์โหลด button (has <i>download</i> icon)
        let dlBtn2: HTMLElement | null = null;
        const dlPoll2 = Date.now();
        while (!dlBtn2 && Date.now() - dlPoll2 < 10000) {
            for (const btn of document.querySelectorAll<HTMLElement>("button")) {
                const icon = btn.querySelector("i");
                if (icon && (icon.textContent || "").trim() === "download") {
                    const r = btn.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) { dlBtn2 = btn; break; }
                }
            }
            if (!dlBtn2) await sleep(1000);
        }
        if (!dlBtn2) {
            WARN("ไม่พบปุ่มดาวน์โหลด");
            if (needsDownloadUnfocus) try { chrome.runtime.sendMessage({ type: 'UNFOCUS_TAB' }); } catch (_) {}
            return;
        }
        await robustClick(dlBtn2);
        LOG("คลิกดาวน์โหลดแล้ว ✅");
        try { updateStep("download", "done"); updateStep("upscale", "active"); } catch (_) {}
        await sleep(1500);

        // Step 2: Click "Full Video" [role=menuitem] + hover to expand submenu
        let res720: HTMLElement | null = null;
        for (let attempt = 0; attempt < 3 && !res720; attempt++) {
            if (attempt > 0) LOG(`🔄 ลองหา 720p ครั้งที่ ${attempt + 1}...`);

            let fullVideoBtn: HTMLElement | null = null;
            const fvStart = Date.now();
            while (!fullVideoBtn && Date.now() - fvStart < 5000) {
                for (const mi of document.querySelectorAll<HTMLElement>("[role='menuitem']")) {
                    const t = (mi.textContent || "").trim();
                    if (t.includes("Full Video") && mi.querySelector("i")) {
                        const r = mi.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0) { fullVideoBtn = mi; break; }
                    }
                }
                if (!fullVideoBtn) await sleep(500);
            }
            if (!fullVideoBtn) { WARN("ไม่พบ Full Video"); continue; }

            // Hover + click to expand submenu
            const fvRect = fullVideoBtn.getBoundingClientRect();
            const fvX = fvRect.left + fvRect.width / 2;
            const fvY = fvRect.top + fvRect.height / 2;
            fullVideoBtn.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true, clientX: fvX, clientY: fvY }));
            fullVideoBtn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, clientX: fvX, clientY: fvY }));
            fullVideoBtn.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: fvX, clientY: fvY }));
            await robustClick(fullVideoBtn);
            LOG("คลิก/hover Full Video ✅");
            await sleep(2000);

            // Step 3: Find "720p" button[role=menuitem] in expanded submenu
            const r720Start = Date.now();
            while (!res720 && Date.now() - r720Start < 8000) {
                for (const btn of document.querySelectorAll<HTMLElement>("button[role='menuitem']")) {
                    const spans = btn.querySelectorAll("span");
                    for (const sp of spans) {
                        if ((sp.textContent || "").trim() === "720p") {
                            const r = btn.getBoundingClientRect();
                            if (r.width > 0 && r.height > 0) { res720 = btn; break; }
                        }
                    }
                    if (res720) break;
                }
                if (!res720) {
                    // Re-hover to keep submenu open
                    if (fullVideoBtn.isConnected) {
                        fullVideoBtn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, clientX: fvX, clientY: fvY }));
                        fullVideoBtn.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: fvX + 20, clientY: fvY }));
                    }
                    await sleep(500);
                }
            }
        }
        
        if (!res720) {
            WARN("ไม่พบ 720p");
            if (needsDownloadUnfocus) try { chrome.runtime.sendMessage({ type: 'UNFOCUS_TAB' }); } catch (_) {}
            return;
        }
        await robustClick(res720);
        LOG("คลิก 720p ✅");

        if (needsDownloadUnfocus) {
            try { chrome.runtime.sendMessage({ type: 'UNFOCUS_TAB' }); } catch (_) {}
            LOG("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)");
        }

        // Step 4: Wait for toast "Downloading your extended video." → "Download complete!"
        LOG("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");
        const dlWaitStart = Date.now();
        let dlDone = false;
        let sawDownloading = false;
        while (Date.now() - dlWaitStart < 300000) {
            // Search for toast elements specifically (class sc-9472394d-2)
            for (const el of document.querySelectorAll<HTMLElement>("div[data-title] div, div[data-content] div")) {
                const t = (el.textContent || "").trim();
                if (t === "Download complete!" || t === "ดาวน์โหลดเสร็จ") {
                    LOG("✅ เตรียมไฟล์เสร็จสิ้น! (toast)");
                    dlDone = true;
                    break;
                }
                if (t.includes("Downloading your extended video") || t.includes("กำลังดาวน์โหลด")) {
                    if (!sawDownloading) { sawDownloading = true; LOG("⏳ กำลังเตรียมไฟล์วิดีโอรวม..."); }
                }
            }
            if (dlDone) break;
            // Fallback: if saw downloading toast but it disappeared, count as done
            if (sawDownloading) {
                let stillDownloading = false;
                for (const el of document.querySelectorAll<HTMLElement>("div[data-title] div, div[data-content] div")) {
                    const t = (el.textContent || "").trim();
                    if (t.includes("Downloading")) { stillDownloading = true; break; }
                }
                if (!stillDownloading) {
                    LOG("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)");
                    dlDone = true;
                    break;
                }
            }
            if (checkStop()) { LOG("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์"); return; }
            await sleep(2000);
        }
        if (!dlDone) { WARN("เตรียมไฟล์หมดเวลา"); return; }
        try { updateStep("upscale", "done", 100); updateStep("open", "active"); } catch (_) {}

        // Step 5: Open in Chrome
        LOG("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง...");
        await sleep(5000);
        let opened2 = false;
        const openPoll2 = Date.now();
        while (Date.now() - openPoll2 < 60000 && !opened2) {
            try {
                await new Promise<void>((resolve) => {
                    chrome.runtime.sendMessage({ action: "OPEN_LATEST_VIDEO", afterTimestamp: downloadStartedAt2 }, (res: any) => {
                        if (chrome.runtime.lastError) {
                            WARN(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`);
                        } else if (res?.success) {
                            LOG(`✅ เปิดวิดีโอใน Chrome แล้ว: ${res.message}`);
                            opened2 = true;
                            // Capture download URL for TikTok auto-post
                            if (res.downloadUrl) {
                                tiktokVideoUrl = res.downloadUrl;
                                LOG(`[TikTok] จะใช้ download URL: ${res.downloadUrl.substring(0, 80)}...`);
                            }
                        } else {
                            LOG(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now() - openPoll2) / 1000)}s)`);
                        }
                        resolve();
                    });
                });
            } catch (e: any) {
                WARN(`ตรวจสอบผิดพลาด: ${e.message}`);
            }
            if (!opened2) await sleep(3000);
        }
        if (!opened2) { WARN("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"); }

        // Always cache video blob from content script (has Google auth cookies)
        LOG("[TikTok] กำลัง capture + cache video blob จาก content script...");
        const capturedUrl = await captureVideoUrlAndPreFetch();
        if (!tiktokVideoUrl) tiktokVideoUrl = capturedUrl;

        try { updateStep("open", "done"); completeOverlay(8000); } catch (_) {}
        LOG("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");
        sendVideoGenerationComplete(tiktokVideoUrl);
        closeAutomationTab(2000);
        return;
    }

    // ══════════════════════════════════════════════════════════════
    // ── 1-Scene Download Flow: ดาวน์โหลด → 1080p → Upscale → Open in Chrome ──
    // ══════════════════════════════════════════════════════════════
    LOG("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══");
    await sleep(2000); // wait for detail page to fully load

    // Helper: find visible element by text
    const findByText = (text: string, sel = "button, [role='menuitem'], [role='option'], li, span, div[role='button']"): HTMLElement | null => {
        for (const el of document.querySelectorAll<HTMLElement>(sel)) {
            const t = (el.textContent || "").trim();
            if (t.includes(text) && t.length < 100) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && r.top >= 0) return el;
            }
        }
        return null;
    };

    // ── STEP 1: Find & click "ดาวน์โหลด" button (poll 10s) ──
    LOG("── ค้นหาปุ่มดาวน์โหลด ──");
    let dlBtn: HTMLElement | null = null;
    const dlPollStart = Date.now();
    while (!dlBtn && Date.now() - dlPollStart < 10000) {
        for (const btn of document.querySelectorAll<HTMLElement>("button, [role='button']")) {
            const txt = (btn.textContent || "").trim();
            const lower = txt.toLowerCase();
            if ((lower.includes("download") || lower.includes("ดาวน์โหลด")) && txt.length < 80) {
                const r = btn.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) { dlBtn = btn; break; }
            }
        }
        if (!dlBtn) {
            for (const btn of document.querySelectorAll<HTMLElement>("button")) {
                const aria = (btn.getAttribute("aria-label") || "").toLowerCase();
                if (aria.includes("download") || aria.includes("ดาวน์")) {
                    const r = btn.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) { dlBtn = btn; break; }
                }
            }
        }
        if (!dlBtn) {
            LOG(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`);
            await sleep(1000);
        }
    }
    if (!dlBtn) {
        WARN("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");
        return;
    }
    LOG(`พบปุ่มดาวน์โหลด: "${(dlBtn.textContent || "").trim().substring(0, 40)}"`);
    await robustClick(dlBtn);
    LOG("คลิกปุ่มดาวน์โหลดแล้ว ✅");
    await sleep(1500);

    // ── STEP 2: Click "1080p Upscaled" ──
    const downloadStartedAt = Date.now(); // timestamp to filter correct download later
    let res1080: HTMLElement | null = null;
    const sub1080Start = Date.now();
    while (!res1080 && Date.now() - sub1080Start < 5000) {
        res1080 = findByText("1080p");
        if (!res1080) { LOG("รอ 1080p..."); await sleep(500); }
    }
    if (!res1080) { WARN("ไม่พบ 1080p"); return; }
    await robustClick(res1080);
    LOG("คลิก 1080p Upscaled ✅");

    // ── STEP 3: Wait for upscaling complete ──
    LOG("รอการอัปสเกลเสร็จ...");
    const upStart = Date.now();
    let upscaleDone = false;
    let sawUpscaling = false;
    let upscalingGoneAt = 0;
    const GONE_CONFIRM_MS = 3000; // text gone for 3s = done

    while (Date.now() - upStart < 300000) {
        const bodyText = (document.body.innerText || "") + " " + (document.body.textContent || "");
        const lower = bodyText.toLowerCase();

        // (A) "Upscaling complete!" detected → done
        if (lower.includes("upscaling complete") || lower.includes("อัปสเกลเสร็จ")) {
            LOG("✅ Upscaling complete!");
            upscaleDone = true;
            break;
        }

        // (B) Element-level scan for completion text
        for (const el of document.querySelectorAll<HTMLElement>("div, span, p")) {
            const t = (el.textContent || "").trim().toLowerCase();
            if (t.length < 60 && (t.includes("upscaling complete") || t.includes("อัปสเกลเสร็จ"))) {
                LOG(`✅ Upscaling complete! (element: "${el.textContent?.trim()}")`);
                upscaleDone = true;
                break;
            }
        }
        if (upscaleDone) break;

        // (C) Track "Upscaling your video" text
        const isUpscaling = lower.includes("upscaling your video") || lower.includes("กำลังอัปสเกล");
        if (isUpscaling) {
            sawUpscaling = true;
            upscalingGoneAt = 0;
            const elapsed = Math.floor((Date.now() - upStart) / 1000);
            LOG(`⏳ กำลังอัปสเกล... (${elapsed} วินาที)`);
        } else if (sawUpscaling) {
            // Text disappeared
            if (upscalingGoneAt === 0) {
                upscalingGoneAt = Date.now();
                LOG("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");
            } else if (Date.now() - upscalingGoneAt >= GONE_CONFIRM_MS) {
                LOG(`✅ ข้อความ Upscaling หายไป ${GONE_CONFIRM_MS / 1000} วินาที — เสร็จ!`);
                upscaleDone = true;
                break;
            }
        } else {
            const elapsed = Math.floor((Date.now() - upStart) / 1000);
            if (elapsed % 10 < 3) LOG(`⏳ รอ Upscale... (${elapsed} วินาที)`);
        }

        if (checkStop()) { LOG("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale"); return; }
        await sleep(2000);
    }

    if (!upscaleDone) {
        WARN("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");
        return;
    }

    // ── STEP 4: Open downloaded file in Chrome ──
    LOG("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง...");
    await sleep(5000);
    let opened = false;
    const openPollStart = Date.now();
    while (Date.now() - openPollStart < 60000 && !opened) {
        try {
            await new Promise<void>((resolve) => {
                chrome.runtime.sendMessage({ action: "OPEN_LATEST_VIDEO", afterTimestamp: downloadStartedAt }, (res: any) => {
                    if (chrome.runtime.lastError) {
                        WARN(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`);
                    } else if (res?.success) {
                        LOG(`✅ เปิดวิดีโอใน Chrome แล้ว: ${res.message}`);
                        opened = true;
                        // Capture download URL for TikTok auto-post
                        if (res.downloadUrl) {
                            tiktokVideoUrl = res.downloadUrl;
                            LOG(`[TikTok] จะใช้ download URL: ${res.downloadUrl.substring(0, 80)}...`);
                        }
                    } else {
                        LOG(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now() - openPollStart) / 1000)}s)`);
                    }
                    resolve();
                });
            });
        } catch (e: any) {
            WARN(`ตรวจสอบผิดพลาด: ${e.message}`);
        }
        if (!opened) await sleep(3000);
    }
    if (!opened) {
        WARN("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");
    }

    // Always cache video blob from content script (has Google auth cookies)
    LOG("[TikTok] กำลัง capture + cache video blob จาก content script...");
    const capturedUrl = await captureVideoUrlAndPreFetch();
    if (!tiktokVideoUrl) tiktokVideoUrl = capturedUrl;

    LOG("═══ ดาวน์โหลดเสร็จสิ้น ═══");
    sendVideoGenerationComplete(tiktokVideoUrl);
    closeAutomationTab(2000);
}

/**
 * Called when page navigated during scene N generation.
 * Tracks generation % on the new page, then downloads Full Video 720p.
 */
async function waitForSceneGenAndDownload(sceneCount: number = 2, currentScene: number = 2, theme?: string, scenePrompts: string[] = []): Promise<void> {
    LOG(`═══ Pending: รอ scene ${currentScene}/${sceneCount} gen เสร็จ + ดาวน์โหลด ═══`);

    // Re-show overlay with correct theme AND scene count (page navigation destroyed both)
    try { if (theme) setOverlayTheme(theme); } catch (_) {}
    try { showOverlay(sceneCount); } catch (e: any) { LOG(`⚠️ showOverlay error: ${e.message}`); }

    // Restore overlay progress — all steps through current scene's gen are DONE
    try {
        const doneSteps = ["settings", "upload-char", "upload-prod", "img-prompt", "img-generate", "img-wait", "animate", "vid-prompt", "vid-generate", "vid-wait"];
        // Mark all completed scenes as done
        for (let s = 2; s <= currentScene; s++) {
            doneSteps.push(`scene${s}-prompt`, `scene${s}-gen`);
            if (s < currentScene) doneSteps.push(`scene${s}-wait`);
        }
        for (const s of doneSteps) updateStep(s, "done");
        updateStep(`scene${currentScene}-wait`, "active");
        LOG(`✅ overlay restored: ${doneSteps.length} steps done (scene ${currentScene}/${sceneCount} navigate)`);
    } catch (e: any) { LOG(`⚠️ overlay restore error: ${e.message}`); }

    // Try to mute video
    await sleep(2000);
    const muteBtn = (() => {
        for (const btn of document.querySelectorAll<HTMLElement>("button")) {
            const icons = btn.querySelectorAll("i");
            for (const icon of icons) {
                const txt = (icon.textContent || "").trim();
                if (txt === "volume_up" || txt === "volume_off" || txt === "volume_mute") {
                    const r = btn.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) return btn;
                }
            }
        }
        return null;
    })();
    if (muteBtn) {
        muteBtn.click();
        LOG("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅");
    } else {
        LOG("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");
    }

    // ── Track generation % ──
    LOG(`── รอวิดีโอ scene ${currentScene} gen เสร็จ (หลัง page navigate) ──`);
    let lastPct = 0;
    let pctGoneAt = 0;
    const scenePollStart = Date.now();
    const SCENE_TIMEOUT = 600000; // 10 min
    const PCT_GONE_CONFIRM = 5000;
    let sceneGenDone = false;
    let noPctCount = 0;

    while (Date.now() - scenePollStart < SCENE_TIMEOUT) {
        let foundPct: number | null = null;
        const els = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
        for (const el of els) {
            if (el.closest("#netflow-engine-overlay")) continue;
            const txt = (el.textContent || "").trim();
            const m = txt.match(/^(\d{1,3})%$/);
            if (m) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && r.width < 120 && r.height < 60) {
                    foundPct = parseInt(m[1], 10);
                    break;
                }
            }
        }
        if (foundPct !== null) {
            noPctCount = 0;
            if (foundPct !== lastPct) {
                LOG(`🎬 scene ${currentScene} ความคืบหน้า: ${foundPct}%`);
                lastPct = foundPct;
                try { updateStep(`scene${currentScene}-wait`, "active", foundPct); } catch (_) {}
            }
            pctGoneAt = 0;
        } else if (lastPct > 0) {
            if (pctGoneAt === 0) {
                pctGoneAt = Date.now();
                LOG(`🔍 scene ${currentScene}: % หายไป (จาก ${lastPct}%) — กำลังยืนยัน...`);
            } else if (Date.now() - pctGoneAt >= PCT_GONE_CONFIRM) {
                LOG(`✅ scene ${currentScene}: % หายไป ${PCT_GONE_CONFIRM / 1000} วินาที — เจนเสร็จ!`);
                sceneGenDone = true;
                break;
            }
        } else {
            // No % found yet — page might still be loading or gen already done
            noPctCount++;
            if (noPctCount >= 15) {
                // 30 seconds with no % — check if video is already playing (gen completed during navigation)
                const videoEls = document.querySelectorAll<HTMLVideoElement>("video");
                let hasPlayingVideo = false;
                for (const v of videoEls) {
                    if (v.readyState >= 2 && !v.paused && v.getBoundingClientRect().width > 200) {
                        hasPlayingVideo = true;
                        break;
                    }
                }
                if (hasPlayingVideo) {
                    LOG(`✅ scene ${currentScene}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`);
                    sceneGenDone = true;
                    break;
                }
                if (noPctCount >= 30) {
                    LOG(`✅ scene ${currentScene}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`);
                    sceneGenDone = true;
                    break;
                }
            }
        }

        // ★ Force DOM update if tab is hidden and progress is stalled
        if (document.hidden && lastPct > 0 && pctGoneAt === 0) {
            await briefActivateIfHidden();
        }

        await sleep(2000);
    }
    if (!sceneGenDone) { LOG(`⚠️ scene ${currentScene} หมดเวลา — ลองต่อไป`); }
    try { updateStep(`scene${currentScene}-wait`, "done", 100); } catch (_) {}
    LOG(`✅ scene ${currentScene} เสร็จ`);

    // ── Continue remaining scenes (if any) before downloading ──
    if (currentScene < sceneCount && scenePrompts.length > 0) {
        LOG(`═══ ยังเหลืออีก ${sceneCount - currentScene} ฉาก — ต่อฉากถัดไป ═══`);
        await sleep(2000);

        for (let scene = currentScene + 1; scene <= sceneCount; scene++) {
            const prompt = scenePrompts[scene - 1];
            if (!prompt) { LOG(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${scene} — ข้าม`); continue; }

            LOG(`── ฉากที่ ${scene}/${sceneCount}: วาง prompt + generate (pending recovery) ──`);

            // Find Slate prompt editor
            let slateEditor: HTMLElement | null = null;
            const taPollStart2 = Date.now();
            while (!slateEditor && Date.now() - taPollStart2 < 10000) {
                const slateEditors = document.querySelectorAll<HTMLElement>("[data-slate-editor='true']");
                if (slateEditors.length > 0) slateEditor = slateEditors[slateEditors.length - 1];
                if (!slateEditor) {
                    const textboxes = document.querySelectorAll<HTMLElement>("[role='textbox'][contenteditable='true']");
                    if (textboxes.length > 0) slateEditor = textboxes[textboxes.length - 1];
                }
                if (!slateEditor) await sleep(1000);
            }
            if (!slateEditor) { LOG(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${scene}`); break; }

            await setPromptText(slateEditor, prompt);
            LOG(`วาง prompt ฉาก ${scene} (${prompt.length} ตัวอักษร) ✅`);
            try { updateStep(`scene${scene}-prompt`, "done"); updateStep(`scene${scene}-gen`, "active"); } catch (_) {}
            await sleep(1000);

            // Find generate/send button nearest to editor
            const editorRect2 = slateEditor.getBoundingClientRect();
            let sendBtn2: HTMLElement | null = null;
            let bestDist2 = Infinity;
            for (const btn of document.querySelectorAll<HTMLElement>("button")) {
                if ((btn as HTMLButtonElement).disabled) continue;
                const icons = btn.querySelectorAll("i");
                let hasArrow = false;
                for (const icon of icons) { if ((icon.textContent || "").trim() === "arrow_forward") { hasArrow = true; break; } }
                if (!hasArrow) continue;
                const r = btn.getBoundingClientRect();
                if (r.width <= 0 || r.height <= 0) continue;
                const dist = Math.abs(r.top - editorRect2.top) + Math.abs(r.right - editorRect2.right);
                if (dist < bestDist2) { bestDist2 = dist; sendBtn2 = btn; }
            }
            if (!sendBtn2) {
                for (const btn of document.querySelectorAll<HTMLElement>("button")) {
                    const icons = btn.querySelectorAll("i");
                    for (const icon of icons) {
                        if ((icon.textContent || "").trim() === "arrow_forward") {
                            const r = btn.getBoundingClientRect();
                            if (r.width > 0 && r.height > 0) { sendBtn2 = btn; break; }
                        }
                    }
                    if (sendBtn2) break;
                }
            }
            if (!sendBtn2) { LOG(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${scene}`); break; }

            // Save pending action before clicking (in case page navigates again)
            await new Promise<void>((resolve) => {
                chrome.storage.local.set({
                    [pendingActionKey()]: {
                        timestamp: Date.now(),
                        action: "wait_scene_gen_and_download",
                        theme: theme,
                        sceneCount: sceneCount,
                        currentScene: scene,
                        scenePrompts: scenePrompts
                    }
                }, () => resolve());
            });

            await robustClick(sendBtn2);
            LOG(`คลิก Generate ฉาก ${scene} ✅`);
            try { updateStep(`scene${scene}-gen`, "done"); updateStep(`scene${scene}-wait`, "active"); } catch (_) {}

            // Track % for this scene
            await sleep(5000);
            let lastPct2 = 0;
            let pctGoneAt2 = 0;
            const scenePollStart2 = Date.now();
            let sceneGenDone2 = false;
            let noPctCount2 = 0;

            while (Date.now() - scenePollStart2 < 600000) {
                let foundPct2: number | null = null;
                const els2 = document.querySelectorAll<HTMLElement>("div, span, p, label, strong, small");
                for (const el of els2) {
                    if (el.closest("#netflow-engine-overlay")) continue;
                    const txt = (el.textContent || "").trim();
                    const m = txt.match(/^(\d{1,3})%$/);
                    if (m) {
                        const r = el.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0 && r.width < 120 && r.height < 60) {
                            foundPct2 = parseInt(m[1], 10);
                            break;
                        }
                    }
                }
                if (foundPct2 !== null) {
                    noPctCount2 = 0;
                    if (foundPct2 !== lastPct2) {
                        LOG(`🎬 ฉาก ${scene} ความคืบหน้า: ${foundPct2}%`);
                        lastPct2 = foundPct2;
                        try { updateStep(`scene${scene}-wait`, "active", foundPct2); } catch (_) {}
                    }
                    pctGoneAt2 = 0;
                } else if (lastPct2 > 0) {
                    if (pctGoneAt2 === 0) {
                        pctGoneAt2 = Date.now();
                    } else if (Date.now() - pctGoneAt2 >= 5000) {
                        LOG(`✅ ฉาก ${scene}: เจนเสร็จ!`);
                        sceneGenDone2 = true;
                        break;
                    }
                } else {
                    noPctCount2++;
                    if (noPctCount2 >= 15) {
                        const videoEls = document.querySelectorAll<HTMLVideoElement>("video");
                        let hasPlayingVideo = false;
                        for (const v of videoEls) {
                            if (v.readyState >= 2 && !v.paused && v.getBoundingClientRect().width > 200) { hasPlayingVideo = true; break; }
                        }
                        if (hasPlayingVideo) { LOG(`✅ ฉาก ${scene}: พบวิดีโอเล่นอยู่ — เสร็จ`); sceneGenDone2 = true; break; }
                        if (noPctCount2 >= 30) { LOG(`✅ ฉาก ${scene}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`); sceneGenDone2 = true; break; }
                    }
                }

                // ★ Force DOM update if tab is hidden and progress is stalled
                if (document.hidden && lastPct2 > 0 && pctGoneAt2 === 0) {
                    await briefActivateIfHidden();
                }

                await sleep(2000);
            }
            if (!sceneGenDone2) { LOG(`⚠️ ฉาก ${scene} หมดเวลา`); }
            try { updateStep(`scene${scene}-wait`, "done", 100); } catch (_) {}
            LOG(`✅ ฉาก ${scene} เสร็จแล้ว`);

            // Clear pending action — completed on this page
            chrome.storage.local.remove(pendingActionKey());
            await sleep(2000);
        }
    }

    LOG(`✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด`);
    await sleep(3000);

    // ── Helper: find visible element by text ──
    const findByText = (text: string, sel = "button, [role='menuitem'], [role='option'], li, span, div[role='button'], div"): HTMLElement | null => {
        let best: HTMLElement | null = null;
        let bestLen = Infinity;
        for (const el of document.querySelectorAll<HTMLElement>(sel)) {
            const t = (el.textContent || "").trim();
            if (t.includes(text) && t.length < 100) {
                const r = el.getBoundingClientRect();
                if (r.width > 0 && r.height > 0 && r.top >= 0 && t.length < bestLen) {
                    best = el;
                    bestLen = t.length;
                }
            }
        }
        return best;
    };

    // ── Download: Full Video → 720p (Radix UI selectors) ──
    let tiktokVideoUrlNav: string | null = null;
    try { updateStep("download", "active"); } catch (_) {}
    LOG("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");
    const downloadStartedAt = Date.now();

    // Step 1: Click ดาวน์โหลด button (has <i>download</i> icon)
    let dlBtn: HTMLElement | null = null;
    const dlPoll = Date.now();
    while (!dlBtn && Date.now() - dlPoll < 10000) {
        for (const btn of document.querySelectorAll<HTMLElement>("button")) {
            const icon = btn.querySelector("i");
            if (icon && (icon.textContent || "").trim() === "download") {
                const r = btn.getBoundingClientRect();
                if (r.width > 0 && r.height > 0) { dlBtn = btn; break; }
            }
        }
        if (!dlBtn) await sleep(1000);
    }
    if (!dlBtn) { WARN("ไม่พบปุ่มดาวน์โหลด"); return; }
    await robustClick(dlBtn);
    LOG("คลิกดาวน์โหลดแล้ว ✅");
    try { updateStep("download", "done"); updateStep("upscale", "active"); } catch (_) {}
    await sleep(1500);

    // Step 2: Click "Full Video" [role=menuitem] + hover to expand submenu
    let res720: HTMLElement | null = null;
    for (let attempt = 0; attempt < 3 && !res720; attempt++) {
        if (attempt > 0) LOG(`🔄 ลองหา 720p ครั้งที่ ${attempt + 1}...`);

        let fullVideoBtn: HTMLElement | null = null;
        const fvStart = Date.now();
        while (!fullVideoBtn && Date.now() - fvStart < 5000) {
            for (const mi of document.querySelectorAll<HTMLElement>("[role='menuitem']")) {
                const t = (mi.textContent || "").trim();
                if (t.includes("Full Video") && mi.querySelector("i")) {
                    const r = mi.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) { fullVideoBtn = mi; break; }
                }
            }
            if (!fullVideoBtn) await sleep(500);
        }
        if (!fullVideoBtn) { WARN("ไม่พบ Full Video"); continue; }

        // Hover + click to expand submenu
        const fvRect = fullVideoBtn.getBoundingClientRect();
        const fvX = fvRect.left + fvRect.width / 2;
        const fvY = fvRect.top + fvRect.height / 2;
        fullVideoBtn.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true, clientX: fvX, clientY: fvY }));
        fullVideoBtn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, clientX: fvX, clientY: fvY }));
        fullVideoBtn.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: fvX, clientY: fvY }));
        await robustClick(fullVideoBtn);
        LOG("คลิก/hover Full Video ✅");
        await sleep(2000);

        // Step 3: Find "720p" button[role=menuitem] in expanded submenu
        const r720Start = Date.now();
        while (!res720 && Date.now() - r720Start < 8000) {
            for (const btn of document.querySelectorAll<HTMLElement>("button[role='menuitem']")) {
                const spans = btn.querySelectorAll("span");
                for (const sp of spans) {
                    if ((sp.textContent || "").trim() === "720p") {
                        const r = btn.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0) { res720 = btn; break; }
                    }
                }
                if (res720) break;
            }
            if (!res720) {
                // Re-hover to keep submenu open
                if (fullVideoBtn.isConnected) {
                    fullVideoBtn.dispatchEvent(new MouseEvent("mouseover", { bubbles: true, clientX: fvX, clientY: fvY }));
                    fullVideoBtn.dispatchEvent(new MouseEvent("mousemove", { bubbles: true, clientX: fvX + 20, clientY: fvY }));
                }
                await sleep(500);
            }
        }
    }
    if (!res720) { WARN("ไม่พบ 720p"); return; }
    await robustClick(res720);
    LOG("คลิก 720p ✅");

    // Step 4: Wait for toast "Downloading your extended video." → "Download complete!"
    LOG("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");
    const dlWaitStart = Date.now();
    let dlDone = false;
    let sawDownloading = false;
    while (Date.now() - dlWaitStart < 300000) {
        for (const el of document.querySelectorAll<HTMLElement>("div[data-title] div, div[data-content] div")) {
            const t = (el.textContent || "").trim();
            if (t === "Download complete!" || t === "ดาวน์โหลดเสร็จ") {
                LOG("✅ เตรียมไฟล์เสร็จสิ้น! (toast)");
                dlDone = true;
                break;
            }
            if (t.includes("Downloading your extended video") || t.includes("กำลังดาวน์โหลด")) {
                if (!sawDownloading) { sawDownloading = true; LOG("⏳ กำลังเตรียมไฟล์วิดีโอรวม..."); }
            }
        }
        if (dlDone) break;
        if (sawDownloading) {
            let stillDownloading = false;
            for (const el of document.querySelectorAll<HTMLElement>("div[data-title] div, div[data-content] div")) {
                const t = (el.textContent || "").trim();
                if (t.includes("Downloading")) { stillDownloading = true; break; }
            }
            if (!stillDownloading) {
                LOG("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)");
                dlDone = true;
                break;
            }
        }
        await sleep(2000);
    }
    if (!dlDone) { WARN("เตรียมไฟล์หมดเวลา"); return; }
    try { updateStep("upscale", "done", 100); updateStep("open", "active"); } catch (_) {}

    // Step 5: Open in Chrome
    LOG("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง...");
    await sleep(5000);
    let opened = false;
    const openPoll = Date.now();
    while (Date.now() - openPoll < 60000 && !opened) {
        try {
            await new Promise<void>((resolve) => {
                chrome.runtime.sendMessage({ action: "OPEN_LATEST_VIDEO", afterTimestamp: downloadStartedAt }, (res: any) => {
                    if (chrome.runtime.lastError) {
                        WARN(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`);
                    } else if (res?.success) {
                        LOG(`✅ เปิดวิดีโอใน Chrome แล้ว: ${res.message}`);
                        opened = true;
                        // Capture download URL for TikTok auto-post
                        if (res.downloadUrl) {
                            tiktokVideoUrlNav = res.downloadUrl;
                            LOG(`[TikTok] จะใช้ download URL: ${res.downloadUrl.substring(0, 80)}...`);
                        }
                    } else {
                        LOG(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now() - openPoll) / 1000)}s)`);
                    }
                    resolve();
                });
            });
        } catch (e: any) {
            WARN(`ตรวจสอบผิดพลาด: ${e.message}`);
        }
        if (!opened) await sleep(3000);
    }
    if (!opened) { WARN("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"); }

    // Always cache video blob from content script (has Google auth cookies)
    LOG("[TikTok] กำลัง capture + cache video blob จาก content script...");
    const capturedUrlNav = await captureVideoUrlAndPreFetch();
    if (!tiktokVideoUrlNav) tiktokVideoUrlNav = capturedUrlNav;

    try { updateStep("open", "done"); completeOverlay(8000); } catch (_) {}
    LOG("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══");
    sendVideoGenerationComplete(tiktokVideoUrlNav);
    closeAutomationTab(2000);
}

async function checkAndRunPendingAction(): Promise<void> {
    try {
        // Wait for tabId to be resolved before checking pending actions
        await _tabIdReady;

        // Step 1: Read the pending action — try per-tab key first, then global fallback
        const paKey = pendingActionKey();
        let result = await new Promise<any>((resolve) => {
            chrome.storage.local.get(paKey, (data) => {
                if (chrome.runtime.lastError) { resolve(null); return; }
                resolve(data?.[paKey] || null);
            });
        });

        // Fallback: if per-tab key found nothing and we have a tabId, also try global key
        if (!result && _myTabId) {
            const globalKey = "netflow_pending_action";
            result = await new Promise<any>((resolve) => {
                chrome.storage.local.get(globalKey, (data) => {
                    if (chrome.runtime.lastError) { resolve(null); return; }
                    resolve(data?.[globalKey] || null);
                });
            });
            if (result) {
                LOG("🔄 Pending action found under global key (legacy fallback)");
                chrome.storage.local.remove(globalKey);
            }
        }

        if (!result || !result.timestamp) return;

        // Only run on video detail pages (URL contains /edit/) — not the gallery page
        const currentUrl = window.location.href;
        if (!currentUrl.includes("/edit/")) {
            LOG("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");
            return;
        }

        // Skip if already claimed by another tab
        if (result._claimed) {
            LOG("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");
            return;
        }

        // Only act on recent flags (< 5 minutes old)
        const age = Date.now() - result.timestamp;
        if (age > 300000) {
            LOG("⏰ พบ pending action แต่เก่าเกินไป — ข้าม");
            chrome.storage.local.remove(paKey);
            return;
        }

        // Step 2: Atomically claim with unique token (last-writer-wins mutex)
        const claimToken = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        result._claimed = claimToken;
        await new Promise<void>((resolve) => {
            chrome.storage.local.set({ [paKey]: result }, () => resolve());
        });

        // Step 3: Wait for any competing tab to also write, then verify our claim
        await sleep(300);
        const verified = await new Promise<boolean>((resolve) => {
            chrome.storage.local.get(paKey, (data) => {
                const action = data?.[paKey];
                resolve((action as any)?._claimed === claimToken);
            });
        });
        if (!verified) {
            LOG("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");
            return;
        }

        // Step 4: We won the claim — clear and execute
        chrome.storage.local.remove(paKey);

        LOG(`🔄 ตรวจพบ pending action: ${result.action} (อายุ ${Math.round(age / 1000)} วินาที)`);

        if (result.action === "mute_video") {
            await standaloneMuteAndDownload(result.sceneCount || 1, result.scenePrompts || [], result.theme);
        } else if (result.action === "wait_scene_gen_and_download" || result.action === "wait_scene2_gen_and_download") {
            await waitForSceneGenAndDownload(result.sceneCount || 2, result.currentScene || 2, result.theme, result.scenePrompts || []);
        } else {
            LOG(`⚠️ ไม่รู้จัก pending action: ${result.action}`);
        }
    } catch (e: any) {
        LOG(`⚠️ checkAndRunPendingAction error: ${e.message}`);
    }
}

// ─── Message Listener ───────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.action === "GENERATE_IMAGE") {
        (window as any).__NETFLOW_STOP__ = false;
        LOG("ได้รับคำสั่ง GENERATE_IMAGE");
        // Respond immediately to prevent MV3 service-worker message-channel timeout
        sendResponse({ success: true, message: "⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow", step: "started" });
        // Fire-and-forget: run the long automation in the background
        handleGenerateImage(message as GenerateImageRequest)
            .then(result => {
                LOG(`✅ ระบบอัตโนมัติเสร็จ: ${result.message}`);
                notifyAutomationFinished();
            })
            .catch(err => {
                if (err instanceof NetflowAbortError || err?.name === "NetflowAbortError") {
                    LOG("⛔ Automation หยุดทำงานโดยผู้ใช้");
                    try { addLog("⛔ ผู้ใช้หยุดการทำงาน"); } catch (_) {}
                    try { hideOverlay(); } catch (_) {}
                } else {
                    console.error("[Netflow AI] Generate error:", err);
                }
                notifyAutomationFinished();
            });
        return false;
    }

    if (message?.action === "STOP_AUTOMATION") {
        LOG("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด");
        (window as any).__NETFLOW_STOP__ = true;
        sendResponse({ success: true, message: "Stop signal sent" });
        return false;
    }

    if (message?.action === "PING") {
        sendResponse({ status: "ready" });
        return false;
    }

    if (message?.action === "CLICK_FIRST_IMAGE") {
        sendResponse({ success: true, message: "⏳ กำลังคลิกรูปแรก..." });
        (async () => {
            LOG("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>...");
            await sleep(500);

            // Element-based detection: find card with <i>image</i> icon (works on any screen size)
            const imageCard = findFirstImageCard();
            if (!imageCard) {
                WARN("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");
                return;
            }

            const r = imageCard.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            LOG(`การ์ดรูปที่ (${cx.toFixed(0)}, ${cy.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} — คลิก 2 ครั้ง`);

            for (let i = 0; i < 2; i++) {
                const target = document.elementFromPoint(cx, cy) as HTMLElement | null;
                if (target) {
                    await robustClick(target);
                    LOG(`คลิก ${i + 1}/2 บน <${target.tagName.toLowerCase()}>`);
                } else {
                    await robustClick(imageCard);
                    LOG(`คลิก ${i + 1}/2 บนการ์ด (สำรอง)`);
                }
                await sleep(300);
            }
            LOG("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ");
        })();
        return false;
    }
});

LOG("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง");

// ★ Check for pending action from previous page (video card click caused navigation)
checkAndRunPendingAction();

