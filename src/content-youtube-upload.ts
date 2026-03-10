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
let _hudSteps: { label: string; status: string }[] = [];

const hudCreate = () => {
    if (_hudEl) return;
    _hudEl = document.createElement('div');
    _hudEl.id = 'netflow-youtube-hud';
    _hudEl.style.cssText = `
        position: fixed; top: 16px; right: 16px; z-index: 999999;
        background: rgba(0,0,0,0.9); border: 1px solid #22c55e;
        border-radius: 12px; padding: 16px; min-width: 280px;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        color: white; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    `;
    _hudEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <span style="font-size:16px">📤</span>
            <span style="font-weight:600;font-size:13px">Netflow → YouTube Shorts</span>
        </div>
        <div id="netflow-yt-steps"></div>
    `;
    document.body.appendChild(_hudEl);
};

const hudUpdate = (stepIdx: number, status: string) => {
    if (stepIdx >= 0 && stepIdx < _hudSteps.length) {
        _hudSteps[stepIdx].status = status;
    }
    const container = document.getElementById('netflow-yt-steps');
    if (!container) return;
    container.innerHTML = _hudSteps.map((s, _i) => {
        const icon = s.status === 'done' ? '✅' : s.status === 'active' ? '⏳' : s.status === 'error' ? '❌' : '○';
        const color = s.status === 'done' ? '#22c55e' : s.status === 'active' ? '#facc15' : s.status === 'error' ? '#ef4444' : '#6b7280';
        return `<div style="font-size:11px;padding:3px 0;color:${color}">${icon} ${s.label}</div>`;
    }).join('');
};

const hudRemove = (delayMs = 5000) => {
    setTimeout(() => { _hudEl?.remove(); _hudEl = null; }, delayMs);
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
    hudCreate();
    hudUpdate(-1, '');

    try {
        // ══════════════════════════════════════════════════════════════════════
        // Step 1: Click "สร้าง"/"Create" → "อัปโหลดวิดีโอ"/"Upload videos"
        // ══════════════════════════════════════════════════════════════════════
        hudUpdate(0, 'active');
        log('── ขั้น 1: เปิดหน้าอัพโหลด ──');

        // Check if upload dialog is already open
        let uploadDialog = document.querySelector('ytcp-uploads-dialog');
        if (!uploadDialog) {
            // Find the CREATE button (TH: "สร้าง", EN: "Create")
            // Selector: ytcp-button-shape > button[aria-label="สร้าง"] or [aria-label="Create"]
            const createBtn = await waitForElement(() => {
                return document.querySelector('ytcp-button-shape button[aria-label="สร้าง"]') ||
                       document.querySelector('ytcp-button-shape button[aria-label="Create"]') ||
                       findByTexts(['สร้าง', 'Create'], 'button');
            }, 10000);

            if (createBtn) {
                clickElement(createBtn);
                log('คลิกปุ่ม "สร้าง/Create"');
                await delay(1500);

                // Click "อัปโหลดวิดีโอ" / "Upload videos" from dropdown
                // Strategy 1: Direct test-id selector (most reliable)
                // Strategy 2: Text-based search (TH + EN)
                // Strategy 3: Deep shadow DOM traversal
                const uploadMenuItem = await waitForElement(() => {
                    // Primary: use test-id attribute (Polymer test hook)
                    const byTestId = document.querySelector('tp-yt-paper-item[test-id="upload"]') ||
                                     document.querySelector('[test-id="upload"]');
                    if (byTestId) {
                        const r = (byTestId as HTMLElement).getBoundingClientRect();
                        if (r.width > 0 && r.height > 0) return byTestId;
                    }
                    // Fallback: text match (TH + EN)
                    return findByTexts(
                        ['อัปโหลดวิดีโอ', 'Upload videos', 'Upload video'],
                        'yt-formatted-string, tp-yt-paper-item, div.text-content, div.right-container, ytcp-text-menu'
                    );
                }, 8000);

                if (uploadMenuItem) {
                    // Click the parent <tp-yt-paper-item> if we matched the inner text
                    const clickTarget = uploadMenuItem.closest('tp-yt-paper-item') || uploadMenuItem;
                    clickElement(clickTarget);
                    log(`คลิกเมนูอัปโหลด (tag=${clickTarget.tagName}, testId=${clickTarget.getAttribute('test-id')})`);
                    log('คลิก "อัปโหลดวิดีโอ/Upload videos"');
                    await delay(2000);
                } else {
                    warn('ไม่พบเมนู "อัปโหลดวิดีโอ" — ลอง URL ตรง');
                    window.location.href = 'https://studio.youtube.com/channel/UC/videos/upload';
                    await delay(3000);
                }
            } else {
                log('ไม่พบปุ่ม CREATE — ใช้ URL ตรง');
                window.location.href = 'https://studio.youtube.com/channel/UC/videos/upload';
                await delay(3000);
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
            // YouTube Studio's file input: inside <ytcp-uploads-file-picker>
            const picker = document.querySelector('ytcp-uploads-file-picker');
            if (picker) {
                const inp = picker.querySelector<HTMLInputElement>('input[type="file"]');
                if (inp) return inp;
            }
            // Fallback: any file input on page
            const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
            return inputs.length > 0 ? inputs[0] : null;
        }, 10000) as HTMLInputElement | null;

        if (fileInput) {
            // Make file input visible for DataTransfer
            fileInput.style.display = 'block';
            const dt = new DataTransfer();
            dt.items.add(videoFile);
            fileInput.files = dt.files;
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            fileInput.dispatchEvent(new Event('input', { bubbles: true }));
            log('ฉีดไฟล์ผ่าน file input ใน ytcp-uploads-file-picker');
            fileInjected = true;
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

        // Title — append #Shorts if not already present
        let finalTitle = config.title || 'Netflow AI Video';
        if (!finalTitle.includes('#Shorts')) {
            finalTitle = `${finalTitle} #Shorts`;
        }

        await typeIntoContentEditable(titleField as HTMLElement, finalTitle);
        log(`กรอกชื่อ: "${finalTitle}"`);
        await delay(500);

        // Description
        if (config.description) {
            const descField = document.querySelector('#description-textarea #textbox[contenteditable="true"]') ||
                              document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]') ||
                              document.querySelector('div[contenteditable="true"][aria-label*="description" i]') ||
                              document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]');
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
            const progressText = document.body.innerText;
            if (progressText.includes('การตรวจสอบเสร็จสมบูรณ์') ||
                progressText.includes('ตรวจสอบเสร็จแล้ว') ||
                progressText.includes('Checks complete') ||
                progressText.includes('การประมวลผลเสร็จสมบูรณ์') ||
                progressText.includes('Finished processing') ||
                progressText.includes('Upload complete') ||
                progressText.includes('ไม่พบปัญหา') ||
                progressText.includes('No issues found')) {
                log('✅ อัพโหลด/ตรวจสอบเสร็จ');
                break;
            }
            // Check if the done button is enabled (not disabled) — means ready to publish
            const doneBtn = document.querySelector('#done-button');
            if (doneBtn) {
                const innerBtn = doneBtn.querySelector('button');
                if (innerBtn && !innerBtn.disabled) {
                    log('✅ ปุ่มเผยแพร่พร้อมใช้งาน');
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
            const expandBtn = await waitForElement(() => {
                return document.querySelector('#second-container-expand-button') ||
                       findByTexts(['ตั้งเวลา', 'Schedule'], '#second-container, .early-access-header');
            }, 5000);

            if (expandBtn) {
                clickElement(expandBtn);
                log('คลิกเปิด "ตั้งเวลา"');
                await delay(1500);
            } else {
                warn('ไม่พบปุ่มเปิดตั้งเวลา');
            }

            // ── Set Date ──
            // Find the date dropdown trigger inside ytcp-datetime-picker
            const dateTrigger = await waitForElement(() => {
                const picker = document.querySelector('ytcp-datetime-picker');
                if (!picker) return null;
                const triggers = picker.querySelectorAll('ytcp-dropdown-trigger, ytcp-text-dropdown-trigger');
                // The first dropdown trigger is usually the date
                return triggers.length > 0 ? triggers[0] : null;
            }, 5000);

            if (dateTrigger) {
                clickElement(dateTrigger);
                log('คลิกเลือกวันที่');
                await delay(1000);

                // Find the date input field that appears after clicking
                // It's a <input> inside <tp-yt-paper-input> within the calendar popup
                const dateInput = await waitForElement(() => {
                    // Look for the input that shows the date with error validation
                    const inputs = document.querySelectorAll<HTMLInputElement>('tp-yt-paper-input input.style-scope');
                    for (const inp of inputs) {
                        const container = inp.closest('tp-yt-paper-input-container');
                        if (container && container.querySelector('#labelAndInputContainer')) {
                            // Check if this is the date input (near the calendar)
                            const parentPicker = inp.closest('ytcp-date-picker');
                            if (parentPicker) return inp;
                        }
                    }
                    // Fallback: find an autofocus input in a date picker context
                    const autofocusInput = document.querySelector('ytcp-date-picker tp-yt-paper-input input[autofocus]') ||
                                           document.querySelector('ytcp-date-picker input.style-scope');
                    return autofocusInput;
                }, 5000) as HTMLInputElement | null;

                if (dateInput) {
                    // Clear existing value, wait for error state, then type date
                    dateInput.focus();
                    dateInput.select();
                    await delay(200);
                    dateInput.value = '';
                    dateInput.dispatchEvent(new Event('input', { bubbles: true }));
                    await delay(500);

                    // Wait for "วันที่ไม่ถูกต้อง" / "Invalid date" error to appear
                    await waitForElement(() => {
                        return findByTexts(['วันที่ไม่ถูกต้อง', 'Invalid date'], 'div, tp-yt-paper-input-error');
                    }, 3000);
                    log('พบ error "วันที่ไม่ถูกต้อง" — พร้อมใส่วันที่');

                    // Type the date (format: "12 พ.ย. 2026")
                    await typeIntoInput(dateInput, config.scheduleDate);
                    log(`ใส่วันที่: "${config.scheduleDate}"`);
                    await delay(300);

                    // Press Enter to confirm
                    dateInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                    dateInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));
                    await delay(1000);
                } else {
                    warn('ไม่พบช่อง input วันที่');
                }
            }

            // ── Set Time ──
            // Find the time input inside ytcp-datetime-picker
            const timeInput = await waitForElement(() => {
                const picker = document.querySelector('ytcp-datetime-picker');
                if (!picker) return null;
                const timeContainer = picker.querySelector('#time-of-day-container');
                if (timeContainer) {
                    return timeContainer.querySelector('tp-yt-paper-input input.style-scope') ||
                           timeContainer.querySelector('input');
                }
                // Fallback: find the textbox in time section
                return picker.querySelector('#textbox input');
            }, 5000) as HTMLInputElement | null;

            if (timeInput) {
                // Click to open the time dropdown
                timeInput.focus();
                timeInput.click();
                await delay(500);

                // Clear existing and type new time
                timeInput.select();
                await delay(200);
                timeInput.value = '';
                timeInput.dispatchEvent(new Event('input', { bubbles: true }));
                await delay(300);

                // Type the time (format: "12:12")
                await typeIntoInput(timeInput, config.scheduleTime);
                log(`ใส่เวลา: "${config.scheduleTime}"`);
                await delay(300);

                // Press Enter to confirm
                timeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                timeInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));
                await delay(1000);
            } else {
                warn('ไม่พบช่อง input เวลา');
            }

            // ── Click "ตั้งเวลา"/"Schedule" button ──
            const scheduleBtn = await waitForElement(() => {
                // Look for the done-button which now says "ตั้งเวลา"/"Schedule"
                const btn = document.querySelector('#done-button');
                if (btn) {
                    const inner = btn.querySelector('button[aria-label="ตั้งเวลา"]') ||
                                  btn.querySelector('button[aria-label="Schedule"]');
                    if (inner && !(inner as HTMLButtonElement).disabled) return inner;
                }
                // Fallback: find by text
                return findByTexts(['ตั้งเวลา', 'Schedule'], 'button');
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

            // Click "เผยแพร่"/"Publish" or "บันทึก"/"Save"
            const publishBtn = await waitForElement(() => {
                const btn = document.querySelector('#done-button');
                if (btn) {
                    const inner = btn.querySelector('button[aria-label="เผยแพร่"]') ||
                                  btn.querySelector('button[aria-label="Publish"]') ||
                                  btn.querySelector('button[aria-label="บันทึก"]') ||
                                  btn.querySelector('button[aria-label="Save"]');
                    if (inner && !(inner as HTMLButtonElement).disabled) return inner;
                }
                return findByTexts(['เผยแพร่', 'Publish', 'บันทึก', 'Save'], 'button');
            }, 10000);

            if (publishBtn) {
                clickElement(publishBtn);
                log(`✅ คลิก "เผยแพร่/Publish"`);
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
        // Dialog title: "วิดีโอที่เผยแพร่"/"Video published" or "วิดีโอที่ตั้งเวลาไว้"/"Scheduled video"
        const closeBtn = await waitForElement(() => {
            // Look for close button inside the share dialog
            const dialog = document.querySelector('ytcp-video-share-dialog');
            if (dialog) {
                const btn = dialog.querySelector('#close-button button') ||
                            dialog.querySelector('ytcp-button#close-button button');
                if (btn) return btn;
            }
            // Fallback: any close button with aria-label "ปิด"/"Close" inside a dialog
            return document.querySelector('ytcp-video-share-dialog button[aria-label="ปิด"]') ||
                   document.querySelector('ytcp-video-share-dialog button[aria-label="Close"]') ||
                   findByTexts(['ปิด', 'Close'], 'ytcp-video-share-dialog button');
        }, 8000);

        if (closeBtn) {
            clickElement(closeBtn);
            log('ปิด dialog สำเร็จ');
        } else {
            // Try the X button on the dialog
            const xBtn = document.querySelector('ytcp-video-share-dialog #close-icon-button') ||
                         document.querySelector('ytcp-video-share-dialog ytcp-icon-button[icon="close"]');
            if (xBtn) {
                clickElement(xBtn);
                log('ปิด dialog ผ่าน X button');
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
