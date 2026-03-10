/**
 * YouTube Studio Upload Automation Content Script
 * Runs on studio.youtube.com pages
 *
 * Handles the full YouTube Shorts upload flow:
 *   1. Click "สร้าง"/"Create" button
 *   2. Click "อัปโหลดวิดีโอ"/"Upload videos" from dropdown
 *   3. Inject video file via file input
 *   4. Fill Title + Description (type-by-char or paste, random 50/50)
 *   5. Select "Made for kids" radio
 *   6. Click "ถัดไป"/"Next" 3 times (Details → Elements → Checks → Visibility)
 *   7. Select visibility (Public/Unlisted/Private)
 *   8a. If schedule: expand schedule → set date + time → click "ตั้งเวลา"/"Schedule"
 *   8b. If immediate: click "เผยแพร่"/"Publish" or "บันทึก"/"Save"
 *   9. Close success dialog
 *
 * Supports both Thai and English YouTube Studio UI.
 */

// ── Re-entry guard ──────────────────────────────────────────────────────────
if ((window as any).__NETFLOW_YOUTUBE_UPLOAD_LOADED__) {
    console.log('[NetFlow YouTube] Already loaded — skipping duplicate injection');
} else {
(window as any).__NETFLOW_YOUTUBE_UPLOAD_LOADED__ = true;

console.log('[NetFlow YouTube] Content script loaded on:', window.location.href);

// ══════════════════════════════════════════════════════════════════════════════
// ── Utilities ────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const log = (msg: string) => {
    console.log(`[NetFlow YouTube] ${msg}`);
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg: `[YT] ${msg}` }); } catch (_) {}
};
const warn = (msg: string) => {
    console.warn(`[NetFlow YouTube] ⚠️ ${msg}`);
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `[YT] ⚠️ ${msg}` }); } catch (_) {}
};

/**
 * Wait for an element to appear in the DOM
 */
const waitForElement = async (
    selectorOrFn: string | (() => Element | null),
    timeout = 20000,
    interval = 500
): Promise<Element | null> => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const el = typeof selectorOrFn === 'string'
            ? document.querySelector(selectorOrFn)
            : selectorOrFn();
        if (el) return el;
        await delay(interval);
    }
    return null;
};

/**
 * Deep-query: traverse shadow DOMs to find elements matching a selector
 */
const deepQueryAll = (root: ParentNode, selector: string): Element[] => {
    const results: Element[] = [];
    results.push(...Array.from(root.querySelectorAll(selector)));
    root.querySelectorAll('*').forEach(el => {
        if (el.shadowRoot) {
            results.push(...deepQueryAll(el.shadowRoot, selector));
        }
    });
    return results;
};

/**
 * Click an element with proper event dispatch
 */
const clickElement = (el: Element) => {
    (el as HTMLElement).focus();
    (el as HTMLElement).click();
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
};

/**
 * Find a visible element by its text content (supports TH+EN matching)
 * texts: array of possible text values to match (e.g. ['สร้าง', 'Create'])
 */
const findByTexts = (
    texts: string[],
    selector = 'button, a, span, div, label, tp-yt-paper-item, ytcp-text, yt-formatted-string, tp-yt-paper-radio-button',
    exact = false
): Element | null => {
    // Strategy 1: normal querySelectorAll
    const all = Array.from(document.querySelectorAll(selector));
    // Strategy 2: deep shadow DOM query
    const deep = deepQueryAll(document, selector);
    const combined = [...all, ...deep];
    const seen = new Set<Element>();
    for (const el of combined) {
        if (seen.has(el)) continue;
        seen.add(el);
        // Use both textContent and innerText for robust matching
        const tc = (el.textContent || '').replace(/\s+/g, ' ').trim();
        const it = ((el as HTMLElement).innerText || '').replace(/\s+/g, ' ').trim();
        for (const text of texts) {
            const matchTc = exact ? tc === text : tc.includes(text);
            const matchIt = exact ? it === text : it.includes(text);
            if (matchTc || matchIt) {
                const rect = (el as HTMLElement).getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) return el;
            }
        }
    }
    return null;
};

/**
 * Type text into a contenteditable field — randomly choose between
 * type-by-character (human-like) or paste (fast), 50/50 chance
 */
const typeIntoContentEditable = async (el: HTMLElement, text: string) => {
    el.focus();
    el.click();
    await delay(200);

    // Select all existing text and delete
    document.execCommand('selectAll');
    await delay(100);
    document.execCommand('delete');
    await delay(200);

    const usePaste = Math.random() < 0.5;
    if (usePaste) {
        // Paste method
        document.execCommand('insertText', false, text);
        log(`[Paste] "${text.substring(0, 40)}..."`);
    } else {
        // Type character by character (human-like)
        for (const char of text) {
            document.execCommand('insertText', false, char);
            await delay(randInt(30, 120));
        }
        log(`[Type] "${text.substring(0, 40)}..."`);
    }
    await delay(300);
};

/**
 * Type text into a regular input field, clear first, then set value
 */
const typeIntoInput = async (input: HTMLInputElement, text: string) => {
    input.focus();
    input.click();
    await delay(200);
    input.select();
    await delay(100);
    // Clear
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await delay(200);
    // Type
    for (const char of text) {
        input.value += char;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await delay(randInt(50, 150));
    }
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await delay(200);
};

// ══════════════════════════════════════════════════════════════════════════════
// ── On-Page HUD Overlay ──────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

let _hudEl: HTMLElement | null = null;
let _hudStyleEl: HTMLStyleElement | null = null;
let _hudSteps: { label: string; status: string }[] = [];
let _hudStartTime = 0;
let _hudTimerInterval: ReturnType<typeof setInterval> | null = null;

// ── Theme palette (mirrors netflow-overlay.ts) ──
interface HudTheme {
    rgb: string;        // primary e.g. "0, 255, 65"
    hex: string;        // primary hex e.g. "#00ff41"
    accentRgb: string;
    accentHex: string;
    doneRgb: string;
    doneHex: string;
}

const HUD_THEMES: Record<string, HudTheme> = {
    green:  { rgb: "0, 255, 65",    hex: "#00ff41",  accentRgb: "0, 255, 180",   accentHex: "#00ffb4",  doneRgb: "34, 197, 94",   doneHex: "#22c55e" },
    red:    { rgb: "220, 38, 38",   hex: "#dc2626",  accentRgb: "251, 146, 60",  accentHex: "#fb923c",  doneRgb: "34, 197, 94",   doneHex: "#22c55e" },
    blue:   { rgb: "43, 125, 233",  hex: "#2b7de9",  accentRgb: "6, 182, 212",   accentHex: "#06b6d4",  doneRgb: "34, 197, 94",   doneHex: "#22c55e" },
    yellow: { rgb: "234, 179, 8",   hex: "#eab308",  accentRgb: "245, 158, 11",  accentHex: "#f59e0b",  doneRgb: "34, 197, 94",   doneHex: "#22c55e" },
    purple: { rgb: "139, 92, 246",  hex: "#8b5cf6",  accentRgb: "168, 85, 247",  accentHex: "#a855f7",  doneRgb: "34, 197, 94",   doneHex: "#22c55e" },
};

const buildHudCss = (t: HudTheme): string => {
    const P = t.rgb;
    const A = t.accentRgb;
    const D = t.doneRgb;
    const PH = t.hex;
    const DH = t.doneHex;
    // Background tint: very dark version of primary
    const pm = PH.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    const pmax = pm ? Math.max(parseInt(pm[1],16), parseInt(pm[2],16), parseInt(pm[3],16), 1) : 255;
    const nr = pm ? parseInt(pm[1],16) / pmax : 0;
    const ng = pm ? parseInt(pm[2],16) / pmax : 1;
    const nb = pm ? parseInt(pm[3],16) / pmax : 0.25;
    const bgt = (i: number) => `${Math.round(nr*i)}, ${Math.round(ng*i)}, ${Math.round(nb*i)}`;

    return `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700&display=swap');

#netflow-youtube-hud {
    position: fixed; top: 16px; right: 16px; z-index: 999999;
    min-width: 300px; max-width: 340px;
    background:
        radial-gradient(ellipse at 20% 10%, rgba(${P},0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 90%, rgba(${A},0.06) 0%, transparent 50%),
        linear-gradient(135deg, rgba(${bgt(8)},0.97) 0%, rgba(${bgt(2)},0.98) 100%);
    border: 1px solid rgba(${P},0.35);
    border-radius: 14px;
    padding: 0;
    color: #e0ffe8;
    box-shadow:
        0 0 20px rgba(${P},0.15),
        0 0 60px rgba(${P},0.06),
        0 8px 32px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(${P},0.1);
    overflow: hidden;
    animation: nfyt-fade-in 0.5s ease-out;
    font-family: 'Inter', system-ui, sans-serif;
}

@keyframes nfyt-fade-in {
    from { opacity: 0; transform: translateY(-12px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes nfyt-fade-out {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95) translateY(-8px); }
}
@keyframes nfyt-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
@keyframes nfyt-scan {
    0% { top: 0; }
    100% { top: 100%; }
}

/* ── Header ── */
#netflow-youtube-hud .nfyt-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 14px 10px;
    background: linear-gradient(90deg, rgba(${P},0.08) 0%, transparent 70%);
    border-bottom: 1px solid rgba(${P},0.15);
    position: relative;
}
#netflow-youtube-hud .nfyt-header::after {
    content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 1px;
    background: linear-gradient(90deg, rgba(${P},0.5), rgba(${A},0.3), transparent);
}
#netflow-youtube-hud .nfyt-title {
    font-family: 'Orbitron', monospace;
    font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
    color: ${PH}; text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${P},0.5);
    display: flex; align-items: center; gap: 7px;
}
#netflow-youtube-hud .nfyt-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: rgba(${P},0.6);
    letter-spacing: 0.5px;
}

/* ── Steps ── */
#netflow-youtube-hud .nfyt-steps {
    padding: 10px 14px 12px;
    position: relative;
}
/* Scanline effect */
#netflow-youtube-hud .nfyt-steps::before {
    content: ''; position: absolute; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(${P},0.12), transparent);
    animation: nfyt-scan 4s linear infinite;
    pointer-events: none; z-index: 1;
}
#netflow-youtube-hud .nfyt-step {
    display: flex; align-items: center; gap: 8px;
    padding: 5px 0; font-size: 11.5px;
    transition: all 0.3s ease;
}
/* Dot indicator */
#netflow-youtube-hud .nfyt-dot {
    width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    border: 1.5px solid rgba(100,100,100,0.5);
    background: transparent;
    transition: all 0.3s ease;
    display: flex; align-items: center; justify-content: center;
}
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-dot {
    background: ${DH}; border-color: ${DH};
    box-shadow: 0 0 6px rgba(${D},0.6);
}
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-dot {
    background: ${PH}; border-color: ${PH};
    box-shadow: 0 0 8px rgba(${P},0.8);
    animation: nfyt-pulse 1.2s ease-in-out infinite;
}
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-dot {
    background: #ef4444; border-color: #ef4444;
    box-shadow: 0 0 6px rgba(239,68,68,0.6);
}
/* Labels */
#netflow-youtube-hud .nfyt-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: rgba(255,255,255,0.35);
    transition: color 0.3s ease;
}
#netflow-youtube-hud .nfyt-step[data-status="done"] .nfyt-label { color: rgba(${D},0.85); }
#netflow-youtube-hud .nfyt-step[data-status="active"] .nfyt-label { color: ${PH}; text-shadow: 0 0 6px rgba(${P},0.4); }
#netflow-youtube-hud .nfyt-step[data-status="error"] .nfyt-label { color: #ef4444; }

/* ── Footer ── */
#netflow-youtube-hud .nfyt-footer {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(${P},0.1);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; color: rgba(${P},0.3);
    text-align: center; letter-spacing: 0.5px;
}
`;
};

const hudCreate = (themeKey?: string) => {
    if (_hudEl) return;

    // Resolve theme from key or fallback to green
    const theme = HUD_THEMES[themeKey || ''] || HUD_THEMES.green;

    // Inject CSS
    if (!_hudStyleEl) {
        _hudStyleEl = document.createElement('style');
        document.head.appendChild(_hudStyleEl);
    }
    _hudStyleEl.textContent = buildHudCss(theme);

    _hudStartTime = Date.now();

    _hudEl = document.createElement('div');
    _hudEl.id = 'netflow-youtube-hud';
    _hudEl.innerHTML = `
        <div class="nfyt-header">
            <div class="nfyt-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                YOUTUBE UPLOAD
            </div>
            <div class="nfyt-timer" id="nfyt-timer">00:00</div>
        </div>
        <div class="nfyt-steps" id="netflow-yt-steps"></div>
        <div class="nfyt-footer">NETFLOW AI ENGINE • SHORTS AUTOMATION</div>
    `;
    document.body.appendChild(_hudEl);

    // Timer
    _hudTimerInterval = setInterval(() => {
        const el = document.getElementById('nfyt-timer');
        if (!el) return;
        const elapsed = Math.floor((Date.now() - _hudStartTime) / 1000);
        const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const ss = String(elapsed % 60).padStart(2, '0');
        el.textContent = `${mm}:${ss}`;
    }, 1000);
};

const hudUpdate = (stepIdx: number, status: string) => {
    if (stepIdx >= 0 && stepIdx < _hudSteps.length) {
        _hudSteps[stepIdx].status = status;
    }
    const container = document.getElementById('netflow-yt-steps');
    if (!container) return;
    container.innerHTML = _hudSteps.map((s) => {
        const st = s.status || 'pending';
        const checkSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        const xSvg = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        const extra = st === 'done' ? checkSvg : st === 'error' ? xSvg : '';
        return `<div class="nfyt-step" data-status="${st}"><div class="nfyt-dot">${extra}</div><span class="nfyt-label">${s.label}</span></div>`;
    }).join('');
};

const hudRemove = (delayMs = 5000) => {
    if (_hudTimerInterval) { clearInterval(_hudTimerInterval); _hudTimerInterval = null; }
    if (_hudEl) {
        _hudEl.style.animation = 'nfyt-fade-out 0.4s ease-in forwards';
    }
    setTimeout(() => {
        _hudEl?.remove(); _hudEl = null;
        _hudStyleEl?.remove(); _hudStyleEl = null;
    }, delayMs);
};

// ══════════════════════════════════════════════════════════════════════════════
// ── Fetch video from background.js cache ─────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

const fetchVideoFromBg = (): Promise<File | null> => {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'GET_CACHED_VIDEO' }, (resp) => {
            if (chrome.runtime.lastError || !resp?.success || !resp.data) {
                warn('No cached video from background');
                resolve(null);
                return;
            }
            try {
                const [header, b64] = resp.data.split(',');
                const mime = header.match(/:(.*?);/)?.[1] || 'video/mp4';
                const binary = atob(b64);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                const file = new File([bytes], 'netflow-shorts.mp4', { type: mime });
                log(`Video file created: ${(file.size / 1024 / 1024).toFixed(1)} MB`);
                resolve(file);
            } catch (e: any) {
                warn(`Failed to create File: ${e.message}`);
                resolve(null);
            }
        });
    });
};

// ══════════════════════════════════════════════════════════════════════════════
// ── Core Upload Flow ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

interface YouTubeUploadConfig {
    title: string;
    description: string;
    madeForKids: boolean;
    visibility: 'public' | 'unlisted' | 'private';
    scheduleEnabled?: boolean;
    scheduleDate?: string;   // e.g. "12 พ.ย. 2026"
    scheduleTime?: string;   // e.g. "12:12"
    theme?: string;          // app theme key: green | red | blue | yellow | purple
}

async function runYouTubeUpload(config: YouTubeUploadConfig): Promise<{ success: boolean; error?: string }> {
    log('=== เริ่ม YouTube Shorts Upload ===');
    log(`Title: "${config.title}" | Visibility: ${config.visibility} | Kids: ${config.madeForKids} | Schedule: ${config.scheduleEnabled ? `${config.scheduleDate} ${config.scheduleTime}` : 'ไม่ตั้ง'}`);

    _hudSteps = [
        { label: 'เปิดหน้าอัพโหลด', status: 'pending' },
        { label: 'อัพโหลดวิดีโอ', status: 'pending' },
        { label: 'กรอกชื่อ + คำอธิบาย', status: 'pending' },
        { label: 'เลือกผู้ชม (เด็ก/ไม่เด็ก)', status: 'pending' },
        { label: 'ข้ามไปหน้าเผยแพร่', status: 'pending' },
        { label: 'เลือกการเผยแพร่ + โพสต์', status: 'pending' },
    ];
    hudCreate(config.theme);
    hudUpdate(-1, '');

    try {
        // ══════════════════════════════════════════════════════════════════════
        // Step 1: เนื้อหา (Content) → Shorts tab → อัปโหลดวิดีโอ button
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(0, 'active');
        log('── ขั้น 1: เปิดหน้าอัพโหลด (เนื้อหา → Shorts → อัปโหลดวิดีโอ) ──');

        // Check if upload dialog is already open
        let uploadDialog = document.querySelector('ytcp-uploads-dialog');
        if (!uploadDialog) {
            // ── 1a: Click "เนื้อหา" (Content) in left sidebar ──
            const contentLink = await waitForElement(() => {
                // Primary: direct ID selector
                const byId = document.querySelector('#menu-item-1') as HTMLElement | null;
                if (byId) {
                    const r = byId.getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) return byId;
                }
                // Fallback: find by nav text
                return findByTexts(
                    ['เนื้อหา', 'Content'],
                    'a.menu-item-link, tp-yt-paper-icon-item, div.nav-item-text'
                );
            }, 10000);

            if (contentLink) {
                // Click the <a> parent if we matched inner text
                const clickTarget = contentLink.closest('a.menu-item-link') || contentLink;
                clickElement(clickTarget);
                log('คลิก "เนื้อหา/Content" ใน sidebar');
                await delay(3000);
            } else {
                // Fallback: extract channel ID from current URL and navigate directly
                const channelMatch = window.location.pathname.match(/\/channel\/([^/]+)/);
                const channelId = channelMatch ? channelMatch[1] : '';
                if (channelId) {
                    log('ไม่พบเมนู "เนื้อหา" — ใช้ URL ตรง');
                    window.location.href = `${window.location.origin}/channel/${channelId}/videos/shorts`;
                    await delay(4000);
                }
            }

            // ── 1b: Click "Shorts" tab ──
            const shortsTab = await waitForElement(() => {
                // Search for the Shorts tab text inside tp-yt-paper-tab
                const tabs = document.querySelectorAll('tp-yt-paper-tab');
                for (const tab of tabs) {
                    const text = (tab.textContent || '').trim();
                    if (text === 'Shorts') {
                        const r = (tab as HTMLElement).getBoundingClientRect();
                        if (r.width > 0 && r.height > 0) return tab;
                    }
                }
                // Fallback: find by text in tab-content divs
                return findByTexts(['Shorts'], 'tp-yt-paper-tab, div.tab-content');
            }, 8000);

            if (shortsTab) {
                const tabTarget = shortsTab.closest('tp-yt-paper-tab') || shortsTab;
                clickElement(tabTarget);
                log('คลิก tab "Shorts"');
                await delay(2500);
            } else {
                warn('ไม่พบ tab "Shorts" — ลอง URL ตรง');
                const channelMatch = window.location.pathname.match(/\/channel\/([^/]+)/);
                const channelId = channelMatch ? channelMatch[1] : '';
                if (channelId) {
                    window.location.href = `${window.location.origin}/channel/${channelId}/videos/shorts`;
                    await delay(3000);
                }
            }

            // ── 1c: Click "อัปโหลดวิดีโอ" / "Upload videos" button on Shorts page ──
            const uploadBtn = await waitForElement(() => {
                // Primary: aria-label match
                const byAria = document.querySelector('ytcp-button-shape button[aria-label="อัปโหลดวิดีโอ"]') ||
                               document.querySelector('ytcp-button-shape button[aria-label="Upload videos"]') ||
                               document.querySelector('ytcp-button-shape button[aria-label="Upload video"]');
                if (byAria) {
                    const r = (byAria as HTMLElement).getBoundingClientRect();
                    if (r.width > 0 && r.height > 0) return byAria;
                }
                // Fallback: text match
                return findByTexts(
                    ['อัปโหลดวิดีโอ', 'Upload videos', 'Upload video'],
                    'button, ytcp-button-shape'
                );
            }, 10000);

            if (uploadBtn) {
                clickElement(uploadBtn);
                log('คลิกปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts');
                await delay(2500);
            } else {
                warn('ไม่พบปุ่ม "อัปโหลดวิดีโอ" บนหน้า Shorts');
            }
        }
        hudUpdate(0, 'done');

        // ══════════════════════════════════════════════════════════════════════
        // Step 2: Upload video file
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(1, 'active');
        log('── ขั้น 2: อัพโหลดวิดีโอ ──');

        const videoFile = await fetchVideoFromBg();
        if (!videoFile) {
            hudUpdate(1, 'error');
            return { success: false, error: 'ไม่พบไฟล์วิดีโอใน cache' };
        }

        let fileInjected = false;

        // Strategy 1: Use the file input inside ytcp-uploads-file-picker
        const fileInput = await waitForElement(() => {
            // YouTube Studio's file input: <input type="file" name="Filedata"> inside <ytcp-uploads-file-picker>
            const picker = document.querySelector('ytcp-uploads-file-picker');
            if (picker) {
                const inp = picker.querySelector<HTMLInputElement>('input[type="file"]') ||
                            picker.querySelector<HTMLInputElement>('input[name="Filedata"]');
                if (inp) return inp;
            }
            // Fallback: direct selectors
            return document.querySelector<HTMLInputElement>('input[name="Filedata"]') ||
                   document.querySelector<HTMLInputElement>('ytcp-uploads-dialog input[type="file"]');
        }, 10000) as HTMLInputElement | null;

        if (fileInput) {
            // Make file input fully visible — YouTube hides it with multiple CSS props:
            // style="position:absolute; height:0; width:0; opacity:0; display:none"
            const origStyle = fileInput.getAttribute('style') || '';
            fileInput.style.cssText = 'display:block !important; opacity:1; width:auto; height:auto; position:static; overflow:visible;';
            await delay(200);

            const dt = new DataTransfer();
            dt.items.add(videoFile);
            fileInput.files = dt.files;
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            fileInput.dispatchEvent(new Event('input', { bubbles: true }));
            log(`ฉีดไฟล์ผ่าน file input (${videoFile.name}, ${(videoFile.size / 1024 / 1024).toFixed(1)} MB)`);
            fileInjected = true;

            // Restore original style after a short delay
            await delay(500);
            fileInput.setAttribute('style', origStyle);
        }

        // Strategy 2: Drop on the upload area (#content inside file picker)
        if (!fileInjected) {
            const dropZone = document.querySelector('ytcp-uploads-file-picker #content') ||
                             document.querySelector('ytcp-uploads-file-picker');
            if (dropZone) {
                const dt = new DataTransfer();
                dt.items.add(videoFile);
                dropZone.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
                await delay(100);
                dropZone.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true }));
                await delay(100);
                dropZone.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true }));
                log('ฉีดไฟล์ผ่าน drag-and-drop');
                fileInjected = true;
            }
        }

        if (!fileInjected) {
            hudUpdate(1, 'error');
            return { success: false, error: 'ไม่พบ file input หรือ drop zone' };
        }

        // Wait for upload to start — title field appears when YouTube processes the file
        log('รอ YouTube ประมวลผลไฟล์...');
        await delay(5000);

        // Wait for title textbox to appear (inside #title-textarea)
        const titleField = await waitForElement(() => {
            // Primary: the contenteditable textbox inside ytcp-social-suggestion-input
            return document.querySelector('#title-textarea #textbox[contenteditable="true"]') ||
                   document.querySelector('ytcp-social-suggestion-input #textbox[contenteditable="true"]') ||
                   document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]') ||
                   document.querySelector('div[contenteditable="true"][aria-label*="title" i]');
        }, 30000);

        if (!titleField) {
            hudUpdate(1, 'error');
            return { success: false, error: 'อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title' };
        }
        hudUpdate(1, 'done');

        // ══════════════════════════════════════════════════════════════════════
        // Step 3: Fill Title + Description
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(2, 'active');
        log('── ขั้น 3: กรอกชื่อ + คำอธิบาย ──');

        // Title (no need for #Shorts suffix — uploading via Shorts tab handles categorization)
        let finalTitle = config.title || 'Netflow AI Video';

        await typeIntoContentEditable(titleField as HTMLElement, finalTitle);
        log(`กรอกชื่อ: "${finalTitle}"`);
        await delay(1000);

        // Click "เพิ่มทั้งหมด" / "Add all" to accept all suggested hashtags
        const addAllHashtagsBtn = findByTexts(
            ['เพิ่มทั้งหมด', 'Add all'],
            'button, ytcp-button-shape button, div.ytcpButtonShapeImpl__button-text-content'
        );
        if (addAllHashtagsBtn) {
            const hashTarget = addAllHashtagsBtn.closest('button') || addAllHashtagsBtn;
            clickElement(hashTarget);
            log('คลิก "เพิ่มทั้งหมด" — เพิ่มแฮชแท็กที่แนะนำ');
            await delay(800);
        } else {
            log('ไม่พบปุ่ม "เพิ่มทั้งหมด" สำหรับแฮชแท็ก — ข้าม');
        }

        // Description
        if (config.description) {
            const descField = await waitForElement(() => {
                return document.querySelector('#description-textarea #textbox[contenteditable="true"]') ||
                       document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]') ||
                       document.querySelector('div[contenteditable="true"][aria-label*="description" i]') ||
                       document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]');
            }, 8000);
            if (descField) {
                await typeIntoContentEditable(descField as HTMLElement, config.description);
                log(`กรอกคำอธิบาย: "${config.description.substring(0, 50)}..."`);
            } else {
                warn('ไม่พบช่อง Description');
            }
        }
        hudUpdate(2, 'done');

        // ══════════════════════════════════════════════════════════════════════
        // Step 4: Made for Kids selection
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(3, 'active');
        log('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──');
        await delay(1000);

        // Scroll the dialog to make the radio buttons visible
        const scrollable = document.querySelector('#scrollable-content') ||
                           document.querySelector('ytcp-uploads-dialog .scrollable');
        if (scrollable) {
            (scrollable as HTMLElement).scrollTop = (scrollable as HTMLElement).scrollHeight;
            await delay(500);
        }

        // TH: "ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก" / "ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก"
        // EN: "Yes, it's made for kids" / "No, it's not made for kids"
        const kidsTexts = config.madeForKids
            ? ['ใช่ วิดีโอนี้สร้างมาเพื่อเด็ก', "Yes, it's made for kids"]
            : ['ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก', "No, it's not made for kids"];

        const kidsRadio = await waitForElement(() => {
            return findByTexts(kidsTexts, 'tp-yt-paper-radio-button');
        }, 10000);

        if (kidsRadio) {
            clickElement(kidsRadio);
            log(`เลือก: ${config.madeForKids ? 'สร้างมาเพื่อเด็ก' : 'ไม่ได้สร้างมาเพื่อเด็ก'}`);
        } else {
            warn('ไม่พบตัวเลือก Made for Kids — fallback');
            const radios = document.querySelectorAll('tp-yt-paper-radio-button');
            // In Thai UI: first radio = "ใช่" (yes), second = "ไม่" (no)
            if (radios.length >= 2) {
                clickElement(config.madeForKids ? radios[0] : radios[1]);
            }
        }
        hudUpdate(3, 'done');
        await delay(1000);

        // ══════════════════════════════════════════════════════════════════════
        // Step 5: Click "ถัดไป"/"Next" 3 times
        // (Details → Elements → Checks → Visibility)
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(4, 'active');
        log('── ขั้น 5: กด "ถัดไป/Next" 3 ครั้ง ──');

        for (let i = 0; i < 3; i++) {
            const nextBtn = await waitForElement(() => {
                // #next-button is the primary selector
                const btn = document.querySelector('#next-button');
                if (btn && !(btn as HTMLElement).hidden) {
                    // Find the inner <button> inside ytcp-button-shape
                    const inner = btn.querySelector('ytcp-button-shape button') ||
                                  btn.querySelector('button');
                    if (inner && !(inner as HTMLButtonElement).disabled) return inner;
                    // If no inner button found, return the element itself
                    if (!(btn as any).disabled) return btn;
                }
                // Fallback: find by text
                return findByTexts(['ถัดไป', 'Next'], 'button');
            }, 10000);

            if (nextBtn) {
                clickElement(nextBtn);
                log(`กด "ถัดไป/Next" ครั้งที่ ${i + 1}/3`);
                await delay(2500);
            } else {
                warn(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${i + 1}`);
                // Try clicking #next-button directly as last resort
                const fallback = document.querySelector('#next-button');
                if (fallback) { clickElement(fallback); await delay(2500); }
            }
        }
        hudUpdate(4, 'done');

        // ══════════════════════════════════════════════════════════════════════
        // Step 6: Select Visibility + Publish/Schedule
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(5, 'active');
        log('── ขั้น 6: เลือกการเผยแพร่ ──');
        await delay(1500);

        // Select visibility radio using the name attribute
        // PRIVATE, UNLISTED, PUBLIC are the radio button names
        const visNameMap: Record<string, string> = {
            public: 'PUBLIC',
            unlisted: 'UNLISTED',
            private: 'PRIVATE',
        };
        const visName = visNameMap[config.visibility] || 'PUBLIC';

        // Primary: use name attribute on tp-yt-paper-radio-button
        let visRadio = document.querySelector(`tp-yt-paper-radio-button[name="${visName}"]`) as HTMLElement | null;
        if (!visRadio) {
            // Fallback: find by text
            const visTextMap: Record<string, string[]> = {
                public: ['สาธารณะ', 'Public'],
                unlisted: ['ไม่เป็นสาธารณะ', 'Unlisted'],
                private: ['ส่วนตัว', 'Private'],
            };
            visRadio = findByTexts(visTextMap[config.visibility] || visTextMap.public, 'tp-yt-paper-radio-button') as HTMLElement | null;
        }

        if (visRadio) {
            clickElement(visRadio);
            log(`เลือกการเผยแพร่: ${config.visibility} (${visName})`);
        } else {
            warn('ไม่พบตัวเลือกการเผยแพร่ — ลอง index');
            const privacyRadios = document.querySelectorAll('#privacy-radios tp-yt-paper-radio-button');
            const idx = config.visibility === 'private' ? 0 : config.visibility === 'unlisted' ? 1 : 2;
            if (privacyRadios[idx]) clickElement(privacyRadios[idx]);
        }
        await delay(1500);

        // ── Wait for upload processing to complete ──
        log('รอการอัพโหลดเสร็จก่อนเผยแพร่...');
        const uploadDoneStart = Date.now();
        while (Date.now() - uploadDoneStart < 300000) { // Max 5 minutes
            // Check page text for TH/EN completion indicators
            const progressText = document.body.innerText;
            const doneKeywords = [
                'การตรวจสอบเสร็จสมบูรณ์', 'ตรวจสอบเสร็จแล้ว', 'Checks complete',
                'การประมวลผลเสร็จสมบูรณ์', 'Finished processing', 'Upload complete',
                'ไม่พบปัญหา', 'No issues found',
                'การอัปโหลดเสร็จสมบูรณ์', 'อัปโหลดเสร็จแล้ว'
            ];
            if (doneKeywords.some(kw => progressText.includes(kw))) {
                log('✅ อัพโหลด/ตรวจสอบเสร็จ');
                break;
            }
            // Check if the done button is enabled (not disabled) — means ready to publish
            const doneBtn = document.querySelector('#done-button');
            if (doneBtn) {
                const innerBtn = doneBtn.querySelector('button');
                if (innerBtn && !innerBtn.disabled) {
                    log('✅ ปุ่มเผยแพร่/ตั้งเวลา พร้อมใช้งาน');
                    break;
                }
            }
            await delay(3000);
        }

        // ── Schedule or Publish immediately ──
        if (config.scheduleEnabled && config.scheduleDate && config.scheduleTime) {
            // ── SCHEDULE FLOW ──
            log('── โหมดตั้งเวลา ──');

            // Click the schedule expand chevron (#second-container-expand-button)
            // User HTML: <ytcp-icon-button id="second-container-expand-button" ...>
            const expandBtn = await waitForElement(() => {
                // Primary: direct ID
                const byId = document.querySelector('#second-container-expand-button');
                if (byId) {
                    const rect = (byId as HTMLElement).getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) return byId;
                }
                // Fallback: find the chevron near "ตั้งเวลา"/"Schedule" header
                return findByTexts(['ตั้งเวลา', 'Schedule'], 'ytcp-icon-button, .early-access-header');
            }, 5000);

            if (expandBtn) {
                clickElement(expandBtn);
                log('คลิกเปิด "ตั้งเวลา" chevron');
                await delay(2000);
            } else {
                warn('ไม่พบปุ่มเปิดตั้งเวลา');
            }

            // ── Set Date ──
            // Click the date dropdown trigger (shows current date like "12 พ.ย. 2026")
            // User HTML: <ytcp-text-dropdown-trigger> → <div role="button" class="container style-scope ytcp-dropdown-trigger">
            const dateTrigger = await waitForElement(() => {
                const picker = document.querySelector('ytcp-datetime-picker');
                if (!picker) return null;
                // Primary: ytcp-text-dropdown-trigger or ytcp-dropdown-trigger
                const trigger = picker.querySelector('ytcp-text-dropdown-trigger') ||
                                picker.querySelector('ytcp-dropdown-trigger');
                if (trigger) {
                    const rect = (trigger as HTMLElement).getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) return trigger;
                }
                // Fallback: div[role="button"] inside the picker container
                return picker.querySelector('div[role="button"].container');
            }, 5000);

            if (dateTrigger) {
                clickElement(dateTrigger);
                log('คลิกเปิด date dropdown');
                await delay(1500);

                // Find the date input field inside ytcp-date-picker popup
                // User HTML: <tp-yt-iron-input> → <input class="style-scope tp-yt-paper-input" autofocus>
                const dateInput = await waitForElement(() => {
                    // Primary: input inside ytcp-date-picker
                    return document.querySelector('ytcp-date-picker tp-yt-iron-input input') ||
                           document.querySelector('ytcp-date-picker tp-yt-paper-input input[autofocus]') ||
                           document.querySelector('ytcp-date-picker tp-yt-paper-input input') ||
                           document.querySelector('ytcp-date-picker input.style-scope');
                }, 5000) as HTMLInputElement | null;

                if (dateInput) {
                    // Clear existing value to trigger error state
                    dateInput.focus();
                    await delay(200);
                    dateInput.select();
                    await delay(100);
                    dateInput.value = '';
                    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
                    dateInput.dispatchEvent(new Event('change', { bubbles: true }));
                    await delay(500);

                    // Wait for "วันที่ไม่ถูกต้อง" / "Invalid date" error
                    // User HTML: <div id="a11yWrapper" ...>วันที่ไม่ถูกต้อง</div>
                    const errorEl = await waitForElement(() => {
                        return findByTexts(
                            ['วันที่ไม่ถูกต้อง', 'Invalid date'],
                            'div, tp-yt-paper-input-error, #a11yWrapper'
                        );
                    }, 3000);
                    if (errorEl) {
                        log('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่');
                    }

                    // Type the date (format: "12 พ.ย. 2026")
                    await typeIntoInput(dateInput, config.scheduleDate!);
                    log(`ใส่วันที่: "${config.scheduleDate}"`);
                    await delay(500);

                    // Press Enter to confirm date
                    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                    dateInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                    dateInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                    await delay(1000);
                    log('กด Enter ยืนยันวันที่');
                } else {
                    warn('ไม่พบช่อง input วันที่');
                }
            } else {
                warn('ไม่พบ date dropdown trigger');
            }

            // ── Set Time ──
            // User HTML: <ytcp-form-input-container id="time-of-day-container"> → <tp-yt-paper-input id="textbox"> → <tp-yt-iron-input> → <input>
            const timeInput = await waitForElement(() => {
                const picker = document.querySelector('ytcp-datetime-picker');
                if (!picker) return null;
                const timeContainer = picker.querySelector('#time-of-day-container');
                if (timeContainer) {
                    // Primary: input inside tp-yt-iron-input inside time container
                    return timeContainer.querySelector('tp-yt-iron-input input') ||
                           timeContainer.querySelector('tp-yt-paper-input input') ||
                           timeContainer.querySelector('input');
                }
                // Fallback: find the textbox#textbox input in time section
                return picker.querySelector('tp-yt-paper-input#textbox input') ||
                       picker.querySelector('#time-of-day-container input');
            }, 5000) as HTMLInputElement | null;

            if (timeInput) {
                // Click to open the time dropdown/popup
                timeInput.focus();
                timeInput.click();
                await delay(800);

                // Clear existing time value
                timeInput.select();
                await delay(200);
                timeInput.value = '';
                timeInput.dispatchEvent(new Event('input', { bubbles: true }));
                timeInput.dispatchEvent(new Event('change', { bubbles: true }));
                await delay(300);

                // Type the time (format: "12:12")
                await typeIntoInput(timeInput, config.scheduleTime!);
                log(`ใส่เวลา: "${config.scheduleTime}"`);
                await delay(500);

                // Press Enter to confirm time
                timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                timeInput.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                timeInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
                await delay(1000);
                log('กด Enter ยืนยันเวลา');
            } else {
                warn('ไม่พบช่อง input เวลา');
            }

            // ── Click "ตั้งเวลา"/"Schedule" button ──
            // User HTML: <button aria-label="ตั้งเวลา"> inside #done-button
            const scheduleBtn = await waitForElement(() => {
                // Primary: #done-button inner button with schedule label
                const btn = document.querySelector('#done-button');
                if (btn) {
                    const inner = btn.querySelector('button[aria-label="ตั้งเวลา"]') ||
                                  btn.querySelector('button[aria-label="Schedule"]');
                    if (inner && !(inner as HTMLButtonElement).disabled) return inner;
                    // Also check if inner button text contains the keyword
                    const anyBtn = btn.querySelector('button:not([disabled])');
                    if (anyBtn) {
                        const txt = (anyBtn.textContent || '').trim();
                        if (txt.includes('ตั้งเวลา') || txt.includes('Schedule')) return anyBtn;
                    }
                }
                // Fallback: find by aria-label directly
                return document.querySelector('button[aria-label="ตั้งเวลา"]:not([disabled])') ||
                       document.querySelector('button[aria-label="Schedule"]:not([disabled])') ||
                       findByTexts(['ตั้งเวลา', 'Schedule'], 'button');
            }, 10000);

            if (scheduleBtn) {
                clickElement(scheduleBtn);
                log('✅ คลิก "ตั้งเวลา/Schedule"');
                hudUpdate(5, 'done');
            } else {
                hudUpdate(5, 'error');
                return { success: false, error: 'ไม่พบปุ่ม "ตั้งเวลา/Schedule"' };
            }

        } else {
            // ── PUBLISH IMMEDIATELY ──
            log('── โหมดเผยแพร่ทันที ──');

            // Click "เผยแพร่"/"Publish" button
            // User HTML: <button aria-label="เผยแพร่"> inside #done-button
            const publishBtn = await waitForElement(() => {
                const btn = document.querySelector('#done-button');
                if (btn) {
                    const inner = btn.querySelector('button[aria-label="เผยแพร่"]') ||
                                  btn.querySelector('button[aria-label="Publish"]') ||
                                  btn.querySelector('button[aria-label="บันทึก"]') ||
                                  btn.querySelector('button[aria-label="Save"]');
                    if (inner && !(inner as HTMLButtonElement).disabled) return inner;
                    // Also check button text
                    const anyBtn = btn.querySelector('button:not([disabled])');
                    if (anyBtn) {
                        const txt = (anyBtn.textContent || '').trim();
                        if (['เผยแพร่', 'Publish', 'บันทึก', 'Save'].some(k => txt.includes(k))) return anyBtn;
                    }
                }
                // Fallback: find by aria-label directly
                return document.querySelector('button[aria-label="เผยแพร่"]:not([disabled])') ||
                       document.querySelector('button[aria-label="Publish"]:not([disabled])') ||
                       findByTexts(['เผยแพร่', 'Publish', 'บันทึก', 'Save'], 'button');
            }, 10000);

            if (publishBtn) {
                clickElement(publishBtn);
                log('✅ คลิก "เผยแพร่/Publish"');
                hudUpdate(5, 'done');
            } else {
                hudUpdate(5, 'error');
                return { success: false, error: 'ไม่พบปุ่มเผยแพร่/บันทึก' };
            }
        }

        // ══════════════════════════════════════════════════════════════════════
        // Step 7: Close the success dialog
        // ══════════════════════════════════════════════════════════════════════
        await delay(3000);

        // Find and close the success/confirmation dialog
        // Dialog titles: "วิดีโอที่เผยแพร่"/"Video published" or "วิดีโอที่ตั้งเวลาไว้"/"Scheduled video"
        // User HTML: <tp-yt-paper-dialog> → <ytcp-video-share-dialog> → <ytcp-button#close-button> → <button aria-label="ปิด">
        const closeBtn = await waitForElement(() => {
            // Strategy 1: close-button inside share dialog (TH/EN)
            const dialog = document.querySelector('ytcp-video-share-dialog');
            if (dialog) {
                // Primary: the "ปิด"/"Close" button at the footer
                const btn = dialog.querySelector('#close-button button[aria-label="ปิด"]') ||
                            dialog.querySelector('#close-button button[aria-label="Close"]') ||
                            dialog.querySelector('#close-button button');
                if (btn) {
                    const rect = (btn as HTMLElement).getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) return btn;
                }
            }
            // Strategy 2: any button with aria-label "ปิด"/"Close" inside a paper-dialog
            return document.querySelector('tp-yt-paper-dialog button[aria-label="ปิด"]') ||
                   document.querySelector('tp-yt-paper-dialog button[aria-label="Close"]') ||
                   document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]') ||
                   document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]');
        }, 10000);

        if (closeBtn) {
            clickElement(closeBtn);
            log('ปิด dialog สำเร็จ');
        } else {
            // Fallback: try X icon button or findByTexts
            const xBtn = document.querySelector('ytcp-video-share-dialog #close-icon-button') ||
                         document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]') ||
                         document.querySelector('tp-yt-paper-dialog ytcp-icon-button[icon="close"]');
            if (xBtn) {
                clickElement(xBtn);
                log('ปิด dialog ผ่าน X button');
            } else {
                // Last resort: find "ปิด"/"Close" text button anywhere in dialog
                const textBtn = findByTexts(['ปิด', 'Close'], 'tp-yt-paper-dialog button, ytcp-video-share-dialog button');
                if (textBtn) {
                    clickElement(textBtn);
                    log('ปิด dialog ผ่าน text match');
                }
            }
        }

        log('=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ===');
        hudRemove(5000);

        // Notify extension
        try {
            chrome.runtime.sendMessage({
                type: 'YOUTUBE_UPLOAD_COMPLETE',
                title: finalTitle,
                visibility: config.visibility,
                scheduled: config.scheduleEnabled || false
            });
        } catch (_) {}

        return { success: true };

    } catch (err: any) {
        warn(`Upload error: ${err.message}`);
        hudRemove(8000);
        return { success: false, error: err.message };
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// ── Message Listener ─────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.action === 'UPLOAD_YOUTUBE') {
        log('ได้รับคำสั่ง UPLOAD_YOUTUBE');
        sendResponse({ success: true, message: '⏳ เริ่มอัพโหลด YouTube Shorts...' });

        runYouTubeUpload({
            title: message.title || '',
            description: message.description || '',
            madeForKids: message.madeForKids || false,
            visibility: message.visibility || 'public',
            scheduleEnabled: message.scheduleEnabled || false,
            scheduleDate: message.scheduleDate || '',
            scheduleTime: message.scheduleTime || '',
            theme: message.theme || 'green',
        }).then(result => {
            log(`Upload result: ${result.success ? '✅' : '❌'} ${result.error || ''}`);
        });

        return false; // Already responded
    }

    if (message?.action === 'PING') {
        sendResponse({ success: true, message: 'YouTube Upload script ready' });
        return false;
    }
});

log('สคริปต์ YouTube Upload พร้อมแล้ว — รอคำสั่ง');

} // end re-entry guard
