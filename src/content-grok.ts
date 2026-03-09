/**
 * NetflowAI Content Script — Grok Imagine (grok.com/imagine)
 * v7.1.0 — Full automation ported from Netflow_grok+TikTok
 *
 * Pipeline (8+ steps):
 *   1. Wait for grok.com/imagine root page
 *   2. Attach character + product images
 *   3. Type video prompt (short, cinematic)
 *   4. Submit → generate image
 *   5. Wait for image (patient: 5 min)
 *   6. Click "Make video"
 *   7. Select aspect ratio
 *   8. Wait for video (patient: 10 min)
 *   9+ Extend scenes (if multi-scene)
 *
 * Uses netflow-overlay.ts for UI overlay (not custom Shadow DOM HUD)
 */

import { showOverlay, hideOverlay, updateStep, skipStep, completeOverlay, configureScenes, addLog, setOverlayTheme } from "./netflow-overlay";

const GROK_VERSION = '7.1.0';
const LOG_PREFIX = '[Netflow AI — Grok]';

// ── Re-entry guard ──────────────────────────────────────────────────────────
if ((window as any).__NETFLOW_GROK_LOADED__) {
    console.log(`${LOG_PREFIX} Already loaded — skipping duplicate injection`);
}
(window as any).__NETFLOW_GROK_LOADED__ = true;

// ── Diagnostic Boot ─────────────────────────────────────────────────────────
(() => {
    const ua = navigator.userAgent;
    const chromeVer = ua.match(/Chrome\/(\d+)/)?.[1] || '?';
    const osName = /Mac/i.test(ua) ? 'macOS' : /Windows/i.test(ua) ? 'Windows' : 'Linux';
    const ok = !!(typeof chrome !== 'undefined' && chrome?.runtime?.id);
    console.log(
        `%c NetflowAI Grok v${GROK_VERSION} %c ${osName} · Chrome ${chromeVer} %c ${ok ? '✅ Ready' : '❌ No Runtime'}`,
        'background:#1d9bf0;color:#fff;font-weight:bold;padding:2px 6px;border-radius:4px 0 0 4px',
        'background:#334155;color:#fff;padding:2px 6px',
        `background:${ok ? '#16a34a' : '#dc2626'};color:#fff;padding:2px 6px;border-radius:0 4px 4px 0`
    );
})();

// ─── Utilities ──────────────────────────────────────────────────────────────
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
const LOG = (msg: string) => {
    console.log(`${LOG_PREFIX} ${msg}`);
    try { addLog(msg); } catch (_) {}
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg }); } catch (_) {}
};
const WARN = (msg: string) => {
    console.warn(`${LOG_PREFIX} ⚠️ ${msg}`);
    try { addLog(`⚠️ ${msg}`); } catch (_) {}
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `⚠️ ${msg}` }); } catch (_) {}
};

const safeSendMessage = (msg: any) => {
    try {
        if (!chrome.runtime?.id) { console.warn(`${LOG_PREFIX} Extension context invalidated`); return; }
        chrome.runtime.sendMessage(msg);
    } catch (e: any) {
        if (e.message?.includes('Extension context invalidated')) {
            console.error(`${LOG_PREFIX} ❌ Extension context invalidated! Refresh this page.`);
        }
    }
};

const sendStatus = (status: string, detail?: string) => {
    safeSendMessage({ type: 'GROK_STATUS', status, detail });
};

// ─── Stop Signal ────────────────────────────────────────────────────────────
let stopRequested = false;
const checkStop = () => stopRequested;

// ─── Types ──────────────────────────────────────────────────────────────────
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
    productName?: string;
    autoPostTikTok?: boolean;
    grokAspectRatio?: string;
    grokResolution?: string;
    grokDuration?: string;
}

interface GrokPipelineConfig {
    imagePrompt: string;
    videoPrompt: string;
    characterImage?: string;
    productImage?: string;
    aspectRatio?: string;
    sceneCount: number;
    sceneScripts: string[];
    productName?: string;
    autoPostTikTok?: boolean;
    theme?: string;
    resolution?: string;
    duration?: string;
}

const calcTotalSteps = (sc: number): number => 8 + (sc - 1) * 3;

// ═══════════════════════════════════════════════════════════════════════════════
// DOM FINDERS & UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/** Find the "Type to imagine" input — Grok uses a div[contenteditable], NOT a textarea */
const findPromptInput = (): HTMLElement | null => {
    // 1. contenteditable div with placeholder text
    const ceAll = document.querySelectorAll('[contenteditable="true"]');
    for (const el of ceAll) {
        const h = el as HTMLElement;
        const r = h.getBoundingClientRect();
        if (r.width > 150 && r.bottom > window.innerHeight * 0.5) return h;
    }
    // 2. aria-label or placeholder hint
    const hints = [
        '[placeholder*="imagine" i]', '[aria-label*="imagine" i]',
        '[data-placeholder*="imagine" i]', 'textarea[placeholder*="imagine" i]', 'textarea',
    ];
    for (const sel of hints) {
        const el = document.querySelector(sel) as HTMLElement;
        if (el) { const r = el.getBoundingClientRect(); if (r.width > 100) return el; }
    }
    // 3. Any large contenteditable near the bottom
    for (const el of ceAll) {
        const h = el as HTMLElement;
        const r = h.getBoundingClientRect();
        if (r.width > 100 && r.height > 10) return h;
    }
    return null;
};

/** Wait until we are on grok.com/imagine (root, NOT a /post/ sub-page) and input is ready */
const waitForImagineReady = async (timeoutMs = 20000): Promise<boolean> => {
    LOG('⏳ Waiting for grok.com/imagine root page...');
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
        const href = window.location.href;
        if (/grok\.com\/imagine\/?$/.test(href) || /grok\.com\/imagine\/?(\?|#|$)/.test(href)) {
            const inp = findPromptInput();
            if (inp) { LOG(`✅ On imagine root, input found (${inp.tagName})`); return true; }
        }
        const elapsed = Math.round((Date.now() - t0) / 1000);
        if (elapsed % 3 === 0 && elapsed > 0) LOG(`Still waiting for imagine root... ${elapsed}s`);
        await sleep(800);
    }
    return false;
};

/** Wait for element with function or CSS selector */
const waitFor = async (finder: string | (() => Element | null), timeoutMs = 30000, pollMs = 400): Promise<Element | null> => {
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
        const el = typeof finder === 'function' ? finder() : document.querySelector(finder);
        if (el && (el as HTMLElement).offsetParent !== null) return el;
        await sleep(pollMs);
    }
    return null;
};

/** Find the first visible element matching text (case-insensitive) */
const findByText = (selectors: string, text: string): Element | null => {
    const all = document.querySelectorAll(selectors);
    const lower = text.toLowerCase();
    for (const el of all) {
        const t = (el.textContent || '').trim().toLowerCase();
        if (t.includes(lower) && (el as HTMLElement).offsetParent !== null) return el;
    }
    return null;
};

/** Robust click: .click() + MouseEvent dispatch */
const safeClick = async (el: Element) => {
    const h = el as HTMLElement;
    h.scrollIntoView?.({ block: 'center', behavior: 'instant' });
    await sleep(100);
    h.focus?.();
    h.click();
    await sleep(50);
    const r = el.getBoundingClientRect();
    const opts = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
    el.dispatchEvent(new MouseEvent('pointerdown', opts));
    el.dispatchEvent(new MouseEvent('mousedown', opts));
    el.dispatchEvent(new MouseEvent('pointerup', opts));
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
};

/** Simulate hover (mouseenter + mouseover + mousemove) on element center */
const simulateHover = async (el: Element) => {
    const r = el.getBoundingClientRect();
    const opts = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2 };
    el.dispatchEvent(new MouseEvent('mouseenter', { ...opts, bubbles: false }));
    el.dispatchEvent(new MouseEvent('mouseover', opts));
    el.dispatchEvent(new MouseEvent('mousemove', opts));
    el.dispatchEvent(new PointerEvent('pointerenter', { ...opts, bubbles: false }));
    el.dispatchEvent(new PointerEvent('pointerover', opts));
    el.dispatchEvent(new PointerEvent('pointermove', opts));
};

/** Type into either a textarea OR a contenteditable div (Grok uses contenteditable) */
const typeIntoInput = async (el: HTMLElement, text: string) => {
    el.focus();
    el.click();
    await sleep(150);
    const isContentEditable = el.getAttribute('contenteditable') === 'true' || el.isContentEditable;
    if (isContentEditable) {
        el.textContent = '';
        el.focus();
        await sleep(100);
        document.execCommand('selectAll', false);
        document.execCommand('delete', false);
        document.execCommand('insertText', false, text);
        el.dispatchEvent(new InputEvent('input', { bubbles: true, data: text, inputType: 'insertText' }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
        const ta = el as HTMLTextAreaElement;
        const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set
            || Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
        if (setter) { setter.call(ta, text); } else { ta.value = text; }
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        ta.dispatchEvent(new Event('change', { bubbles: true }));
        for (const char of text.slice(-3)) {
            ta.dispatchEvent(new InputEvent('input', { bubbles: true, data: char, inputType: 'insertText' }));
        }
    }
    await sleep(400);
};

// ═══════════════════════════════════════════════════════════════════════════════
// FILE CONVERSION UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/** Convert base64 data URL OR raw base64 to File object */
const base64ToFile = (input: string, filename: string): File | null => {
    try {
        if (input.startsWith('http://') || input.startsWith('https://') || input.startsWith('blob:')) {
            WARN('base64ToFile received a URL, not base64 — use fetchImageAsFile instead');
            return null;
        }
        let mime = 'image/png';
        let base64Data: string;
        if (input.startsWith('data:')) {
            const commaIndex = input.indexOf(',');
            if (commaIndex === -1) { WARN('Invalid data URL — no comma separator'); return null; }
            const meta = input.substring(0, commaIndex);
            base64Data = input.substring(commaIndex + 1);
            mime = meta.match(/:(.*?);/)?.[1] || 'image/png';
        } else {
            base64Data = input;
        }
        base64Data = base64Data.replace(/[\s\r\n]/g, '');
        if (!base64Data || base64Data.length < 10) { WARN('base64 data too short or empty'); return null; }
        const bytes = atob(base64Data);
        const arr = new Uint8Array(bytes.length);
        for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
        return new File([arr], filename, { type: mime });
    } catch (e) { WARN('base64ToFile failed: ' + e); return null; }
};

/** Fetch an image from a URL and return as File (for HTTPS product image URLs) */
const fetchImageAsFile = async (url: string, filename: string): Promise<File | null> => {
    try {
        LOG(`🌐 Fetching image from URL: ${url.substring(0, 80)}...`);
        const response = await fetch(url, { mode: 'cors' });
        if (!response.ok) { WARN(`Fetch failed: ${response.status} ${response.statusText}`); return null; }
        const blob = await response.blob();
        const mime = blob.type || 'image/png';
        const file = new File([blob], filename, { type: mime });
        LOG(`✅ Fetched image: ${(file.size / 1024).toFixed(1)} KB, type: ${mime}`);
        return file;
    } catch (e) {
        WARN('fetchImageAsFile failed: ' + e);
        try {
            const img = document.createElement('img');
            img.crossOrigin = 'anonymous';
            img.src = url;
            await new Promise<void>((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = () => reject(new Error('Image load failed'));
                setTimeout(() => reject(new Error('Image load timeout')), 10000);
            });
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            ctx.drawImage(img, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            return base64ToFile(dataUrl, filename);
        } catch (e2) { WARN('Canvas fallback also failed: ' + e2); return null; }
    }
};

/** Convert any image source (data URL, raw base64, or HTTPS URL) to a File */
const imageSourceToFile = async (source: string, filename: string): Promise<File | null> => {
    if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('blob:')) {
        return fetchImageAsFile(source, filename);
    }
    return base64ToFile(source, filename);
};

// ═══════════════════════════════════════════════════════════════════════════════
// SUBMIT BUTTON & IMAGE UPLOAD
// ═══════════════════════════════════════════════════════════════════════════════

/** Find the submit/send button (arrow icon next to the input bar) */
const findSubmitButton = (): HTMLElement | null => {
    const input = findPromptInput();
    if (input) {
        const parent = input.closest('form')
            || input.parentElement?.parentElement?.parentElement
            || input.parentElement?.parentElement
            || input.parentElement;
        if (parent) {
            const inputR = input.getBoundingClientRect();
            const buttons = Array.from(parent.querySelectorAll('button')) as HTMLElement[];
            const candidates = buttons.filter(btn => {
                const r = btn.getBoundingClientRect();
                return Math.abs(r.top - inputR.top) < 60 && r.left >= inputR.right - 60;
            });
            if (candidates.length > 0) {
                candidates.sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right);
                return candidates[0];
            }
            if (buttons.length > 0) return buttons[buttons.length - 1];
        }
    }
    const submit = document.querySelector('button[type="submit"]') as HTMLElement;
    if (submit) return submit;
    const allBtns = document.querySelectorAll('button');
    let best: HTMLElement | null = null;
    let bestRight = 0;
    for (const btn of allBtns) {
        const r = (btn as HTMLElement).getBoundingClientRect();
        if (r.bottom > window.innerHeight * 0.75 && r.right > bestRight && btn.querySelector('svg')) {
            best = btn as HTMLElement;
            bestRight = r.right;
        }
    }
    return best;
};

/**
 * Upload an image file directly into Grok's hidden file input WITHOUT clicking
 * any button (clicking the upload button opens OS file dialog and blocks automation).
 */
const uploadImageToGrok = async (imageSource: string, label = 'image'): Promise<boolean> => {
    LOG(`📤 Injecting ${label} into Grok file input...`);
    sendStatus('uploading', `กำลังแนบรูป${label === 'product' ? 'สินค้า' : 'ตัวละคร'}เข้า Grok...`);

    const file = await imageSourceToFile(imageSource, `${label}_${Date.now()}.png`);
    if (!file) { WARN(`imageSourceToFile failed for ${label}`); return false; }
    LOG(`📦 ${label} file ready: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    const findFileInput = (): HTMLInputElement | null => {
        const inputs = document.querySelectorAll('input[type="file"]');
        for (const inp of inputs) {
            const i = inp as HTMLInputElement;
            const accept = i.accept || '';
            if (!accept || accept.includes('image') || accept.includes('*')) return i;
        }
        return inputs.length > 0 ? inputs[0] as HTMLInputElement : null;
    };

    let fileInput = findFileInput();

    // Strategy 2: click attach button + intercept file input click to prevent OS dialog
    if (!fileInput) {
        LOG('No file input found, searching for attach button...');
        const attachBtn = findByText('button, [role="button"], label', 'Image')
            || document.querySelector('[aria-label*="image" i], [aria-label*="attach" i], [aria-label*="photo" i]') as HTMLElement;
        if (attachBtn) {
            const proto = HTMLInputElement.prototype;
            const origClick = proto.click;
            proto.click = function(this: HTMLInputElement) {
                if (this.type === 'file') { fileInput = this; LOG('Captured file input via button click intercept'); return; }
                return origClick.call(this);
            };
            (attachBtn as HTMLElement).click();
            await sleep(300);
            proto.click = origClick;
        }
        if (!fileInput) fileInput = findFileInput();
    }

    if (!fileInput) {
        WARN('Could not find file input — trying drag-and-drop fallback');
        const dropTarget = findPromptInput() || document.querySelector('main') || document.body;
        const dt = new DataTransfer();
        dt.items.add(file);
        dropTarget.dispatchEvent(new DragEvent('dragenter', { bubbles: true, dataTransfer: dt }));
        await sleep(100);
        dropTarget.dispatchEvent(new DragEvent('dragover', { bubbles: true, dataTransfer: dt }));
        await sleep(100);
        dropTarget.dispatchEvent(new DragEvent('drop', { bubbles: true, dataTransfer: dt }));
        await sleep(2000);
        return false;
    }

    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    fileInput.dispatchEvent(new Event('input', { bubbles: true }));
    LOG(`✅ File injected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    await sleep(2500);
    return true;
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/** Take a snapshot of current page URLs to detect new content */
const snapshotPageState = () => {
    const imgs = new Set<string>();
    document.querySelectorAll('img').forEach(img => {
        if (img.src && img.getBoundingClientRect().width > 50) imgs.add(img.src);
    });
    const videos = new Set<string>();
    document.querySelectorAll('video').forEach(v => {
        if (v.src) videos.add(v.src);
        v.querySelectorAll('source').forEach(s => { if ((s as HTMLSourceElement).src) videos.add((s as HTMLSourceElement).src); });
    });
    return { imgs, videos, count: imgs.size + videos.size };
};

/** Wait for NEW content (images or videos) to appear after generation */
const waitForNewContent = async (beforeSnapshot: ReturnType<typeof snapshotPageState>, timeoutMs = 180000): Promise<boolean> => {
    LOG('⏳ Waiting for new content to appear...');
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
        if (checkStop()) return false;
        const now = snapshotPageState();
        let newCount = 0;
        now.imgs.forEach(src => { if (!beforeSnapshot.imgs.has(src)) newCount++; });
        now.videos.forEach(src => { if (!beforeSnapshot.videos.has(src)) newCount++; });
        if (newCount > 0) {
            LOG(`✅ Found ${newCount} new content item(s)`);
            await sleep(3000);
            return true;
        }
        const elapsed = Math.round((Date.now() - t0) / 1000);
        if (elapsed % 10 === 0 && elapsed > 0) LOG(`⏳ Still waiting... ${elapsed}s`);
        await sleep(2000);
    }
    WARN('Timed out waiting for new content');
    return false;
};

/** Find generated images — tries multiple strategies with progressive relaxation */
const findGeneratedImageCandidates = (minWidth = 80, minHeight = 80): HTMLElement[] => {
    const mainArea = document.querySelector('main') || document.body;
    const allImgs = mainArea.querySelectorAll('img');
    const candidates: HTMLElement[] = [];
    for (const img of allImgs) {
        const r = img.getBoundingClientRect();
        if (r.width < minWidth || r.height < minHeight) continue;
        if (r.top < 0 || r.bottom > window.innerHeight + 200) continue;
        const src = img.getAttribute('src') || '';
        if (src.includes('avatar') || src.includes('icon') || src.includes('logo') || src.includes('favicon')) continue;
        if (src.includes('profile') || src.includes('emoji')) continue;
        candidates.push(img as HTMLElement);
    }
    candidates.sort((a, b) => {
        const ra = a.getBoundingClientRect();
        const rb = b.getBoundingClientRect();
        return (rb.width * rb.height) - (ra.width * ra.height);
    });
    return candidates;
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAKE VIDEO / ANIMATE
// ═══════════════════════════════════════════════════════════════════════════════

/** Find ONE generated image and hover over it — retries for up to 45s */
const hoverOnFirstGeneratedImage = async (timeoutMs = 45000): Promise<Element | null> => {
    LOG('🖼️ Looking for a generated image to hover...');
    const t0 = Date.now();
    let attempt = 0;
    while (Date.now() - t0 < timeoutMs) {
        attempt++;
        const minSize = attempt <= 3 ? 120 : attempt <= 6 ? 80 : 50;
        const candidates = findGeneratedImageCandidates(minSize, minSize);
        if (candidates.length > 0) {
            const target = candidates[0];
            const container = target.closest('a, div[class], article, li, [data-testid]') || target;
            LOG(`Found ${candidates.length} image(s) (attempt ${attempt}), hovering on first one`);
            target.scrollIntoView({ block: 'center', behavior: 'instant' });
            await sleep(300);
            await simulateHover(container);
            await sleep(600);
            await simulateHover(target);
            await sleep(800);
            const r = target.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                const x = r.left + r.width * (0.3 + i * 0.2);
                const y = r.top + r.height * 0.5;
                target.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }));
                container.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: x, clientY: y }));
                await sleep(200);
            }
            await sleep(1000);
            return container;
        }
        const elapsed = Math.round((Date.now() - t0) / 1000);
        if (elapsed % 5 === 0) LOG(`⏳ Still looking for generated image... ${elapsed}s`);
        await sleep(2000);
    }
    WARN('No suitable images found after ' + Math.round(timeoutMs / 1000) + 's');
    return null;
};

/** Try to find "Make video" / "Animate" button DIRECTLY (without hovering) */
const findMakeVideoButton = (): Element | null => {
    const sels = 'button, a, div[role="button"], div[role="menuitem"], span, li, [class*="option"], [class*="action"], [class*="menu-item"]';
    let el = findByText(sels, 'Make video');
    if (el) return el;
    el = findByText(sels, 'Animate Image');
    if (el) return el;
    el = findByText(sels, 'Animate');
    if (el) { const t = (el.textContent || '').trim(); if (t.length < 80 && /animate/i.test(t)) return el; }
    el = findByText(sels, 'Turn an image to a video');
    if (el) return el.closest('button, a, div[role="button"], li, [class*="option"]') || el;
    const allEls = document.querySelectorAll('*');
    for (const candidate of allEls) {
        if (candidate.children.length > 5) continue;
        const text = (candidate.textContent || '').trim();
        if (text.length > 0 && text.length < 60 && /animate\s*image|make\s*video/i.test(text)) {
            if ((candidate as HTMLElement).offsetParent === null) continue;
            return candidate;
        }
    }
    return null;
};

/** Find and click "Make video" / "Animate Image" — tries direct first, then hover + retry */
const clickAnimateOption = async (maxRetries = 8): Promise<boolean> => {
    LOG('🎬 Looking for "Make video" / "Animate Image" button...');
    sendStatus('animating', 'กำลังหาปุ่ม Make video...');
    const t0 = Date.now();
    const timeoutMs = 60000;

    for (let attempt = 0; attempt < maxRetries && (Date.now() - t0 < timeoutMs); attempt++) {
        // Strategy A: direct button
        const directBtn = findMakeVideoButton();
        if (directBtn) {
            LOG(`Found "Make video" button directly (attempt ${attempt})`);
            await safeClick(directBtn);
            await sleep(2000);
            if (isOnPostPage() || findMainVideo()) return true;
            await sleep(2000);
            return true;
        }
        // Strategy B: hover on image first to reveal button
        if (attempt >= 1) {
            LOG(`Trying hover strategy (attempt ${attempt})...`);
            const hovered = await hoverOnFirstGeneratedImage(10000);
            if (hovered) {
                await sleep(1500);
                const btnAfterHover = findMakeVideoButton();
                if (btnAfterHover) {
                    LOG('Found button after hover');
                    await safeClick(btnAfterHover);
                    await sleep(3000);
                    return true;
                }
            }
        }
        await sleep(3000);
    }
    WARN('Could not find "Make video" button');
    return false;
};

/** Check if we are on a /post/ or /video/ page */
const isOnPostPage = (): boolean => /\/(post|video)\//i.test(window.location.href);

// ═══════════════════════════════════════════════════════════════════════════════
// VIDEO WAIT & DETECTION
// ═══════════════════════════════════════════════════════════════════════════════

/** Find the main <video> element with src and visible size > 200px */
const findMainVideo = (): HTMLVideoElement | null => {
    const videos = document.querySelectorAll('video');
    for (const v of videos) {
        const src = v.src || v.querySelector('source[src]')?.getAttribute('src') || '';
        if (!src) continue;
        const r = v.getBoundingClientRect();
        if (r.width > 200 && r.height > 200) return v;
    }
    return null;
};

/** Check if Grok is still showing "Generating XX%", progress bar, or Cancel button */
const _isGrokStillGenerating = (): boolean => {
    // Use textContent instead of innerText — innerText forces expensive synchronous layout reflow
    const bodyText = document.body.textContent || '';
    if (/generating\s*\d+%/i.test(bodyText)) return true;
    const progressBars = document.querySelectorAll('[role="progressbar"], progress');
    for (const pb of progressBars) {
        const r = (pb as HTMLElement).getBoundingClientRect();
        if (r.width > 50) return true;
    }
    const cancelBtn = findByText('button', 'Cancel');
    if (cancelBtn) return true;
    return false;
};

/** Detect video generation progress % — 4 methods */
const _detectGrokVideoProgress = (): number => {
    // Method 1: aria-valuenow
    const progressBars = document.querySelectorAll('[role="progressbar"]');
    for (const pb of progressBars) {
        const val = pb.getAttribute('aria-valuenow');
        if (val) return parseFloat(val);
    }
    // Method 2: Text scan "Generating XX%" (use textContent — no layout reflow)
    const bodyText = document.body.textContent || '';
    const match = bodyText.match(/generating\s*(\d+)%/i);
    if (match) return parseInt(match[1], 10);
    // Method 3: CSS width of progress bar
    const bars = document.querySelectorAll('[class*="progress"] > div, [class*="bar"]');
    for (const bar of bars) {
        const style = (bar as HTMLElement).style.width;
        if (style && style.endsWith('%')) {
            const pct = parseFloat(style);
            if (pct > 0 && pct <= 100) return pct;
        }
    }
    // Method 4: elapsed time estimate — return -1 (unknown)
    return -1;
};

/** Wait for video on /post/ page — 10 min timeout, readyState + download button check */
const waitForVideoReady = async (timeoutMs = 600000): Promise<boolean> => {
    LOG('⏳ Waiting for video to be ready (up to 10 min)...');
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
        if (checkStop()) return false;
        // Don't declare ready while still generating
        if (_isGrokStillGenerating()) {
            const pct = _detectGrokVideoProgress();
            if (pct >= 0) {
                const elapsed = Math.round((Date.now() - t0) / 1000);
                if (elapsed % 10 === 0) LOG(`⏳ Video generating: ${pct}% (${elapsed}s)`);
                try { updateStep('vid-wait', 'active', pct); } catch (_) {}
            }
            await sleep(3000);
            continue;
        }
        const video = findMainVideo();
        if (video) {
            if (video.readyState >= 2) { LOG('✅ Video ready (readyState >= 2)'); return true; }
            await sleep(2000);
            if (video.readyState >= 2) { LOG('✅ Video ready after brief wait'); return true; }
        }
        const dlBtn = findByText('button, a', 'Download');
        if (dlBtn) { LOG('✅ Download button found — video likely ready'); return true; }
        await sleep(3000);
    }
    WARN('⏰ Timed out waiting for video');
    return false;
};

/** Get the video URL from the current page — only works on /post/ pages */
const getVideoUrl = (): string | null => {
    if (!isOnPostPage()) { WARN('getVideoUrl called but not on /post/ page'); return null; }
    const video = findMainVideo();
    if (video?.src) return video.src;
    if (video) {
        const source = video.querySelector('source[src]');
        if (source) return (source as HTMLSourceElement).src;
    }
    const dlLink = document.querySelector('a[download], a[href*="download"]') as HTMLAnchorElement;
    if (dlLink?.href) return dlLink.href;
    const dlBtn = findByText('button, a', 'Download') as HTMLAnchorElement;
    if (dlBtn?.href) return dlBtn.href;
    return window.location.href;
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXTEND VIDEO (MULTI-SCENE)
// ═══════════════════════════════════════════════════════════════════════════════

/** Find direct "Extend video" button */
const findExtendButton = (): Element | null => {
    let el = findByText('button, a, div[role="button"], [role="menuitem"]', 'Extend video');
    if (el) return el;
    el = document.querySelector('[aria-label*="Extend" i]') as Element;
    if (el && (el as HTMLElement).offsetParent !== null) return el;
    return null;
};

/** Find ⋯ (three-dot menu) button near the video — must be OUTSIDE the video frame */
const findVideoMenuButton = (): HTMLElement | null => {
    const video = findMainVideo();
    if (!video) return null;
    const videoR = video.getBoundingClientRect();
    const buttons = Array.from(document.querySelectorAll('button')) as HTMLElement[];
    const candidates = buttons.filter(btn => {
        const r = btn.getBoundingClientRect();
        if (r.width < 10 || r.width > 60 || r.height < 10 || r.height > 60) return false;
        if (r.left < videoR.right - 60) return false;
        if (r.top < videoR.top - 50 || r.bottom > videoR.bottom + 50) return false;
        if (!btn.querySelector('svg') && !/⋯|\.\.\.|\u22EF|\u2026|more/i.test(btn.textContent || '')) return false;
        return true;
    });
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => b.getBoundingClientRect().bottom - a.getBoundingClientRect().bottom);
    return candidates[0];
};

/** Click Extend via direct button or ⋯ menu → dropdown → "Extend video" */
const clickExtendVideo = async (timeoutMs = 60000): Promise<boolean> => {
    LOG('🔄 Looking for Extend video button...');
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
        if (checkStop()) return false;
        if (!isOnPostPage()) { WARN('Not on /post/ page — aborting extend'); return false; }
        // Try direct button
        const directBtn = findExtendButton();
        if (directBtn) {
            LOG('Found direct "Extend video" button');
            await safeClick(directBtn);
            await sleep(2000);
            return true;
        }
        // Try ⋯ menu
        const menuBtn = findVideoMenuButton();
        if (menuBtn) {
            LOG('Found ⋯ menu button, clicking...');
            await safeClick(menuBtn);
            await sleep(1000);
            for (let attempt = 0; attempt < 5; attempt++) {
                const extendItem = findByText('[role="menuitem"], [role="option"], button, a, div[class*="menu"], li', 'Extend video');
                if (extendItem) {
                    LOG('Found "Extend video" in dropdown');
                    await safeClick(extendItem);
                    await sleep(2000);
                    return true;
                }
                await sleep(500);
            }
            // Close menu with Escape (not body.click)
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            await sleep(500);
        }
        await sleep(3000);
    }
    WARN('Could not find Extend video option');
    return false;
};

/** Find prompt input on the Extend page */
const findExtendPromptInput = async (timeoutMs = 15000): Promise<HTMLElement | null> => {
    LOG('🔍 Looking for Extend prompt input...');
    const t0 = Date.now();
    while (Date.now() - t0 < timeoutMs) {
        const input = findPromptInput();
        if (input) return input;
        const ta = document.querySelector('textarea') as HTMLElement;
        if (ta && ta.offsetParent !== null) return ta;
        await sleep(1000);
    }
    return null;
};

/** Wait for extended video — checks src change, loading indicators, "Generating" guard */
const waitForExtendedVideo = async (oldVideoSrc: string | null, sceneNum: number, timeoutMs = 600000): Promise<boolean> => {
    LOG(`⏳ Waiting for extended video (Scene ${sceneNum})...`);
    const t0 = Date.now();
    const sceneStepId = `scene${sceneNum}-wait`;
    while (Date.now() - t0 < timeoutMs) {
        if (checkStop()) return false;
        if (_isGrokStillGenerating()) {
            const pct = _detectGrokVideoProgress();
            if (pct >= 0) { try { updateStep(sceneStepId, 'active', pct); } catch (_) {} }
            await sleep(3000);
            continue;
        }
        const video = findMainVideo();
        if (video) {
            const newSrc = video.src || video.querySelector('source')?.getAttribute('src') || '';
            if (newSrc && newSrc !== oldVideoSrc) {
                LOG(`✅ Extended video ready (Scene ${sceneNum}) — src changed`);
                return true;
            }
        }
        if (!isOnPostPage()) { WARN('Left /post/ page during extend wait'); return false; }
        const elapsed = Math.round((Date.now() - t0) / 1000);
        if (elapsed % 15 === 0 && elapsed > 0) LOG(`⏳ Still waiting for extend... ${elapsed}s`);
        await sleep(3000);
    }
    WARN(`⏰ Timed out waiting for extended video (Scene ${sceneNum})`);
    return false;
};

/** Run one round of Extend for a scene */
const runExtendScene = async (sceneIndex: number, sceneScript: string): Promise<boolean> => {
    const sceneNum = sceneIndex + 1;
    const promptStepId = `scene${sceneNum}-prompt`;
    const genStepId = `scene${sceneNum}-gen`;
    const waitStepId = `scene${sceneNum}-wait`;
    LOG(`═══ Scene ${sceneNum}: Starting Extend ═══`);

    if (!isOnPostPage()) { WARN(`Not on /post/ page — cannot extend for Scene ${sceneNum}`); return false; }

    const oldVideo = findMainVideo();
    const oldSrc = oldVideo?.src || oldVideo?.querySelector('source')?.getAttribute('src') || null;

    // Click Extend
    try { updateStep(promptStepId, 'active'); } catch (_) {}
    LOG(`Scene ${sceneNum}: Clicking Extend...`);
    const extendOk = await clickExtendVideo(60000);
    if (!extendOk) { WARN(`Failed to click Extend for Scene ${sceneNum}`); try { updateStep(promptStepId, 'error'); } catch (_) {} return false; }
    try { updateStep(promptStepId, 'done'); } catch (_) {}

    // Type script
    try { updateStep(genStepId, 'active'); } catch (_) {}
    LOG(`Scene ${sceneNum}: Typing script...`);
    const extendInput = await findExtendPromptInput(15000);
    if (!extendInput) { WARN(`No prompt input for Scene ${sceneNum}`); try { updateStep(genStepId, 'error'); } catch (_) {} return false; }
    await typeIntoInput(extendInput, sceneScript);
    await sleep(500);

    // Submit
    const submitBtn = findSubmitButton();
    if (submitBtn) { await safeClick(submitBtn); }
    else { extendInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }
    await sleep(2000);
    try { updateStep(genStepId, 'done'); } catch (_) {}

    // Wait for extended video
    try { updateStep(waitStepId, 'active', 0); } catch (_) {}
    LOG(`Scene ${sceneNum}: Waiting for video generation...`);
    const videoOk = await waitForExtendedVideo(oldSrc, sceneNum, 600000);
    if (!videoOk) {
        // Retry with shorter prompt (up to 2 times)
        WARN(`Scene ${sceneNum}: First attempt failed, retrying...`);
        const shortScript = sceneScript.substring(0, Math.min(sceneScript.length, 200));
        for (let retry = 0; retry < 2; retry++) {
            const retryExtend = await clickExtendVideo(30000);
            if (!retryExtend) continue;
            const retryInput = await findExtendPromptInput(10000);
            if (!retryInput) continue;
            await typeIntoInput(retryInput, shortScript);
            await sleep(500);
            const retrySubmit = findSubmitButton();
            if (retrySubmit) await safeClick(retrySubmit);
            else retryInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            await sleep(2000);
            const retryOk = await waitForExtendedVideo(oldSrc, sceneNum, 600000);
            if (retryOk) { try { updateStep(waitStepId, 'done', 100); } catch (_) {} return true; }
        }
        try { updateStep(waitStepId, 'error'); } catch (_) {}
        return false;
    }
    try { updateStep(waitStepId, 'done', 100); } catch (_) {}
    return true;
};

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT SCENE CONTEXT
// ═══════════════════════════════════════════════════════════════════════════════

/** Map product keywords → contextual scene description */
const getProductSceneContext = (productName: string): string => {
    const lower = (productName || '').toLowerCase();
    if (/fitness|gym|sport|workout|protein/i.test(lower)) return 'in a modern gym setting with equipment and mirrors';
    if (/beauty|skincare|makeup|cream|serum/i.test(lower)) return 'in a spa-like vanity setting with soft lighting and mirror';
    if (/perfume|fragrance|cologne|scent/i.test(lower)) return 'in a luxury setting with golden bokeh and soft focus';
    if (/fashion|clothing|dress|shirt|shoes/i.test(lower)) return 'in an editorial fashion setting with dramatic lighting';
    if (/food|snack|drink|coffee|tea|restaurant/i.test(lower)) return 'in a stylish kitchen or café setting with warm lighting';
    if (/tech|phone|laptop|gadget|computer/i.test(lower)) return 'in a clean modern workspace with ambient lighting';
    if (/home|furniture|decor|kitchen|bed/i.test(lower)) return 'in a beautifully designed home interior';
    if (/pet|dog|cat|animal/i.test(lower)) return 'in a warm, pet-friendly environment';
    if (/car|vehicle|auto|motor/i.test(lower)) return 'in a sleek showroom or scenic road setting';
    if (/baby|kid|child|toy/i.test(lower)) return 'in a safe, colorful, child-friendly space';
    return 'in a professional studio setting with clean background';
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PIPELINE — runGrokPipeline
// ═══════════════════════════════════════════════════════════════════════════════

const runGrokPipeline = async (config: GrokPipelineConfig): Promise<{ success: boolean; videoUrl?: string }> => {
    const { imagePrompt, videoPrompt, characterImage, productImage, aspectRatio, sceneCount, sceneScripts, productName, theme, resolution, duration } = config;
    const totalSteps = calcTotalSteps(sceneCount);

    // Initialize overlay
    try {
        if (theme) setOverlayTheme(theme);
        showOverlay(sceneCount, 'grok');
    } catch (e: any) { LOG(`⚠️ Overlay error: ${e.message}`); }

    // ═══ Step 1: Wait for Imagine page ═══
    LOG('Step 1/8: Waiting for Grok Imagine page...');
    sendStatus('step_1', 'รอหน้า Grok Imagine...');
    const pageReady = await waitForImagineReady(25000);
    if (!pageReady) {
        if (!/grok\.com\/imagine/i.test(window.location.href)) {
            LOG('Navigating to /imagine...');
            window.location.href = 'https://grok.com/imagine';
            await sleep(3000);
            const retryReady = await waitForImagineReady(15000);
            if (!retryReady) { WARN('Could not reach Grok Imagine page'); return { success: false }; }
        }
    }

    // ═══ Step 2: Upload images ═══
    LOG('Step 2/8: Uploading images...');
    sendStatus('step_2', 'กำลังแนบรูป...');
    try { updateStep('upload-char', 'active'); } catch (_) {}
    if (characterImage) {
        const charOk = await uploadImageToGrok(characterImage, 'character');
        if (charOk) LOG('✅ Character image uploaded');
        else WARN('Character image upload failed (continuing)');
    }
    try { updateStep('upload-char', 'done'); } catch (_) {}
    try { updateStep('upload-prod', 'active'); } catch (_) {}
    if (productImage) {
        const prodOk = await uploadImageToGrok(productImage, 'product');
        if (prodOk) LOG('✅ Product image uploaded');
        else WARN('Product image upload failed (continuing)');
    }
    try { updateStep('upload-prod', 'done'); } catch (_) {}

    // ═══ Step 3: Type prompt ═══
    LOG('Step 3/8: Typing image prompt...');
    sendStatus('step_3', 'กำลังใส่ prompt...');
    try { updateStep('img-prompt', 'active'); } catch (_) {}

    // Use videoPrompt for Grok (short, cinematic) — NOT imagePrompt
    let promptText = videoPrompt || imagePrompt || '';
    // Smart prompt: add product context, trim to 500 chars
    if (productName) {
        const context = getProductSceneContext(productName);
        if (context && !promptText.includes(context)) {
            promptText = promptText + ' ' + context;
        }
    }
    if (promptText.length > 500) promptText = promptText.substring(0, 500);

    if (!promptText) { WARN('No prompt text provided'); return { success: false }; }

    let input = findPromptInput();
    if (!input) { await sleep(2000); input = findPromptInput(); }
    if (!input) { WARN('Could not find prompt input'); return { success: false }; }

    await typeIntoInput(input, promptText);
    await sleep(500);
    // Verify text was entered
    const entered = input.textContent || (input as HTMLTextAreaElement).value || '';
    if (entered.trim().length === 0) {
        LOG('Retrying prompt entry...');
        await typeIntoInput(input, promptText);
        await sleep(500);
    }
    try { updateStep('img-prompt', 'done'); } catch (_) {}

    // ═══ Step 4: Submit (Generate) ═══
    LOG('Step 4/8: Clicking Generate...');
    sendStatus('step_4', 'กด Generate...');
    try { updateStep('img-generate', 'active'); } catch (_) {}
    const beforeSnap = snapshotPageState();
    const submitBtn = findSubmitButton();
    if (submitBtn) { await safeClick(submitBtn); }
    else { input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); }
    await sleep(2000);
    try { updateStep('img-generate', 'done'); } catch (_) {}

    // ═══ Step 5: Wait for image generation (5 min) ═══
    LOG('Step 5/8: Waiting for image generation...');
    sendStatus('step_5', 'กำลังรอสร้างภาพ...');
    try { updateStep('img-wait', 'active', 0); } catch (_) {}
    const contentOk = await waitForNewContent(beforeSnap, 300000);
    if (!contentOk) {
        WARN('No new content after 5 minutes');
        try { updateStep('img-wait', 'error'); } catch (_) {}
        return { success: false };
    }
    await sleep(3000);
    try { updateStep('img-wait', 'done', 100); } catch (_) {}

    // ═══ Step 6: Click "Make video" ═══
    LOG('Step 6/8: Clicking "Make video"...');
    sendStatus('step_6', 'กำลังคลิก Make video...');
    try { updateStep('animate', 'active'); } catch (_) {}
    const animateOk = await clickAnimateOption(8);
    if (!animateOk) {
        WARN('Could not find/click "Make video" button');
        try { updateStep('animate', 'error'); } catch (_) {}
        return { success: false };
    }
    try { updateStep('animate', 'done'); } catch (_) {}

    // ═══ Step 7: Set aspect ratio ═══
    LOG('Step 7/8: Setting aspect ratio...');
    sendStatus('step_7', 'ตั้ง Aspect Ratio...');
    try { updateStep('vid-prompt', 'active'); } catch (_) {}
    // ── Aspect Ratio (Radix dropdown) ──
    if (aspectRatio) {
        const triggerBtn = document.querySelector('button[aria-label="Aspect Ratio"]') as HTMLElement;
        if (triggerBtn) {
            // Check if already showing the desired ratio
            const currentText = (triggerBtn.textContent || '').trim();
            if (currentText.includes(aspectRatio)) {
                LOG(`Aspect ratio already ${aspectRatio} — skipping`);
            } else {
                LOG(`Opening Aspect Ratio dropdown (current: ${currentText})...`);
                await safeClick(triggerBtn);
                await sleep(800);
                // Find the menu item in Radix dropdown
                const menuItems = document.querySelectorAll('[role="menuitemradio"], [role="menuitem"], [role="option"], [data-radix-collection-item]');
                let found = false;
                for (const item of menuItems) {
                    const text = (item.textContent || '').trim();
                    if (text === aspectRatio || text.replace(/\s/g, '') === aspectRatio.replace(/\s/g, '')) {
                        LOG(`Selecting aspect ratio: "${text}"`);
                        await safeClick(item as HTMLElement);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    // Fallback: try findByText on any visible element
                    const fallback = findByText('[role="menuitemradio"], [role="menuitem"], [role="option"], div, span', aspectRatio);
                    if (fallback) { await safeClick(fallback as HTMLElement); LOG(`Fallback: selected ${aspectRatio}`); }
                    else { WARN(`Could not find aspect ratio option: ${aspectRatio}`); }
                }
                await sleep(600);
            }
        } else {
            // Fallback: try direct text match buttons
            const fallbackBtn = findByText('button, div[role="button"], span', aspectRatio);
            if (fallbackBtn) { await safeClick(fallbackBtn as HTMLElement); LOG(`Direct click aspect ratio: ${aspectRatio}`); await sleep(600); }
            else { WARN('Could not find Aspect Ratio trigger button'); }
        }
    }

    // ── Resolution (480p / 720p) ──
    if (resolution) {
        const resBtn = findByText('button, div[role="button"], span, [class*="option"]', resolution);
        if (resBtn) { LOG(`Setting resolution: ${resolution}`); await safeClick(resBtn as HTMLElement); await sleep(600); }
        else { LOG(`Resolution button "${resolution}" not found — may already be set`); }
    }

    // ── Duration (6s / 10s) ──
    if (duration) {
        const durBtn = findByText('button, div[role="button"], span, [class*="option"]', duration);
        if (durBtn) { LOG(`Setting duration: ${duration}`); await safeClick(durBtn as HTMLElement); await sleep(600); }
        else { LOG(`Duration button "${duration}" not found — may already be set`); }
    }

    try { updateStep('vid-prompt', 'done'); } catch (_) {}

    // ═══ Step 8: Wait for video (10 min) ═══
    LOG('Step 8/8: Waiting for video generation...');
    sendStatus('step_8', 'กำลังสร้างวิดีโอฉาก 1...');
    try { updateStep('vid-wait', 'active', 0); } catch (_) {}
    const videoReady = await waitForVideoReady(600000);
    if (!videoReady) {
        WARN('Video generation timed out');
        try { updateStep('vid-wait', 'error'); } catch (_) {}
        return { success: false };
    }
    try { updateStep('vid-wait', 'done', 100); } catch (_) {}
    LOG('✅ Scene 1 video ready');

    // ═══ Steps 9+: Extend scenes (if multi-scene) ═══
    if (sceneCount > 1) {
        for (let i = 1; i < sceneCount; i++) {
            const sceneNum = i + 1;
            LOG(`═══ Starting Scene ${sceneNum} ═══`);
            const script = sceneScripts[i] || sceneScripts[0] || videoPrompt;
            const extendOk = await runExtendScene(i, script);
            if (!extendOk) {
                WARN(`Scene ${sceneNum} extend failed — using Scene 1 result`);
                const fallbackUrl = getVideoUrl();
                return { success: true, videoUrl: fallbackUrl || undefined };
            }
            LOG(`✅ Scene ${sceneNum} complete`);
        }
    }

    // Get final video URL
    const finalUrl = getVideoUrl();
    LOG(`🎬 Pipeline complete! Video URL: ${finalUrl?.substring(0, 80) || 'N/A'}`);
    return { success: true, videoUrl: finalUrl || undefined };
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN HANDLER — Adapter from request to pipeline config
// ═══════════════════════════════════════════════════════════════════════════════

async function handleGrokGenerate(req: GrokGenerateRequest): Promise<{ success: boolean; message: string; step: string }> {
    LOG("═══ Grok Automation Started ═══");
    LOG(`Engine: Grok v${GROK_VERSION} | Scenes: ${req.sceneCount || 1} | Orientation: ${req.orientation || "vertical"}`);

    const sceneCount = Math.min(3, Math.max(1, req.sceneCount || 1));

    // Parse scene scripts from videoScenePrompts or split aiPrompt
    let sceneScripts: string[] = [];
    if (req.videoScenePrompts && req.videoScenePrompts.length > 0) {
        sceneScripts = req.videoScenePrompts;
    } else if (req.videoPrompt) {
        const parts = req.videoPrompt.split(/\n{2,}/).map(s => s.trim()).filter(s => s.length > 0);
        sceneScripts = Array.from({ length: sceneCount }, (_, i) => parts[i] || parts[0] || req.videoPrompt!);
    }

    const config: GrokPipelineConfig = {
        imagePrompt: req.imagePrompt || req.videoPrompt || '',
        videoPrompt: req.videoPrompt || req.imagePrompt || '',
        characterImage: req.characterImage,
        productImage: req.productImage,
        aspectRatio: req.grokAspectRatio || (req.orientation === 'horizontal' ? '16:9' : '9:16'),
        sceneCount,
        sceneScripts,
        productName: req.productName,
        autoPostTikTok: req.autoPostTikTok,
        theme: req.theme,
        resolution: req.grokResolution || '480p',
        duration: req.grokDuration || '6s',
    };

    try {
        const result = await runGrokPipeline(config);
        if (result.success) {
            // Send completion to React hook
            safeSendMessage({
                type: 'VIDEO_GENERATION_COMPLETE',
                videoUrl: result.videoUrl,
                sceneCount,
                source: 'grok',
            });
            try { updateStep('complete', 'done'); } catch (_) {}
            try { completeOverlay(8000); } catch (_) {}
            return { success: true, message: `วิดีโอสำเร็จ (${sceneCount} ฉาก)`, step: 'complete' };
        } else {
            safeSendMessage({ type: 'VIDEO_GENERATION_ERROR', error: 'Pipeline failed', source: 'grok' });
            return { success: false, message: 'Grok pipeline failed — ลองใหม่อีกครั้ง', step: 'pipeline-error' };
        }
    } catch (err: any) {
        WARN(`Pipeline crashed: ${err.message}`);
        safeSendMessage({ type: 'VIDEO_GENERATION_ERROR', error: err.message, source: 'grok' });
        return { success: false, message: `Error: ${err.message}`, step: 'error' };
    }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MESSAGE LISTENER — Chrome Extension Communication
// ═══════════════════════════════════════════════════════════════════════════════
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message?.action) return;

    // Health check
    if (message.action === "PING") {
        sendResponse({ status: "ready", engine: "grok", version: GROK_VERSION, url: window.location.href });
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
LOG(`✅ Grok content script v${GROK_VERSION} loaded on: ${window.location.href}`);
