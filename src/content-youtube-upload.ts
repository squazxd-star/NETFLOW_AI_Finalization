/**
 * YouTube Studio Upload Automation Content Script
 * Runs on studio.youtube.com pages
 *
 * Handles the full YouTube Shorts upload flow:
 *   1. Click CREATE → Upload videos
 *   2. Inject video file into upload zone
 *   3. Fill Title + Description
 *   4. Select "Not made for kids"
 *   5. Click Next 3 times
 *   6. Select visibility (Public/Unlisted/Private)
 *   7. Click Publish/Save
 */

// ── Re-entry guard ──────────────────────────────────────────────────────────
if ((window as any).__NETFLOW_YOUTUBE_UPLOAD_LOADED__) {
    console.log('[NetFlow YouTube] Already loaded — skipping duplicate injection');
} else {
(window as any).__NETFLOW_YOUTUBE_UPLOAD_LOADED__ = true;

console.log('[NetFlow YouTube] Content script loaded on:', window.location.href);

// ── Utilities ────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

const log = (msg: string) => {
    console.log(`[NetFlow YouTube] ${msg}`);
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "info", msg: `[YT] ${msg}` }); } catch (_) {}
};
const warn = (msg: string) => {
    console.warn(`[NetFlow YouTube] ⚠️ ${msg}`);
    try { chrome.runtime.sendMessage({ action: "FLOW_LOG", level: "warn", msg: `[YT] ⚠️ ${msg}` }); } catch (_) {}
};

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

const clickElement = (el: Element) => {
    (el as HTMLElement).focus();
    (el as HTMLElement).click();
    el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
};

const findByText = (
    text: string,
    selector = 'button, a, span, div, label, tp-yt-paper-item, ytcp-text',
    exact = false
): Element | null => {
    const all = Array.from(document.querySelectorAll(selector));
    for (const el of all) {
        const t = (el.textContent || '').trim();
        const match = exact ? t === text : t.includes(text);
        if (match) {
            const rect = (el as HTMLElement).getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) return el;
        }
    }
    return null;
};

// ── Shadow DOM helper — YouTube Studio uses Web Components ──
const queryShadow = (root: Element | Document, selectors: string[]): Element | null => {
    let current: Element | Document = root;
    for (const sel of selectors) {
        if (!current) return null;
        const el = (current instanceof Document ? current : current.shadowRoot || current).querySelector(sel);
        if (!el) return null;
        current = el;
    }
    return current as Element;
};

// ── On-Page HUD Overlay ──────────────────────────────────────────────────────
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
    container.innerHTML = _hudSteps.map((s, i) => {
        const icon = s.status === 'done' ? '✅' : s.status === 'active' ? '⏳' : s.status === 'error' ? '❌' : '○';
        const color = s.status === 'done' ? '#22c55e' : s.status === 'active' ? '#facc15' : s.status === 'error' ? '#ef4444' : '#6b7280';
        return `<div style="font-size:11px;padding:3px 0;color:${color}">${icon} ${s.label}</div>`;
    }).join('');
};

const hudRemove = (delayMs = 5000) => {
    setTimeout(() => { _hudEl?.remove(); _hudEl = null; }, delayMs);
};

// ── Fetch video from background.js cache ─────────────────────────────────────
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

// ── Core Upload Flow ─────────────────────────────────────────────────────────

interface YouTubeUploadConfig {
    title: string;
    description: string;
    madeForKids: boolean;
    visibility: 'public' | 'unlisted' | 'private';
}

async function runYouTubeUpload(config: YouTubeUploadConfig): Promise<{ success: boolean; error?: string }> {
    log('=== เริ่ม YouTube Shorts Upload ===');
    log(`Title: "${config.title}" | Visibility: ${config.visibility} | Kids: ${config.madeForKids}`);

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
        // ── Step 1: Navigate to upload page or click CREATE ──
        hudUpdate(0, 'active');
        log('── ขั้น 1: เปิดหน้าอัพโหลด ──');

        // Check if already on upload dialog
        let uploadDialog = document.querySelector('ytcp-uploads-dialog');
        if (!uploadDialog) {
            // Try clicking CREATE button
            const createBtn = await waitForElement(() => {
                // YouTube Studio CREATE button
                return document.querySelector('#create-icon') ||
                       document.querySelector('ytcp-button#create-icon') ||
                       findByText('สร้าง', 'button, ytcp-button, tp-yt-paper-icon-button') ||
                       findByText('Create', 'button, ytcp-button, tp-yt-paper-icon-button');
            }, 10000);

            if (createBtn) {
                clickElement(createBtn);
                log('คลิกปุ่ม CREATE แล้ว');
                await delay(1500);

                // Click "Upload videos"
                const uploadOption = await waitForElement(() => {
                    return findByText('อัปโหลดวิดีโอ') ||
                           findByText('Upload videos') ||
                           findByText('Upload video');
                }, 5000);
                if (uploadOption) {
                    clickElement(uploadOption);
                    log('คลิก "Upload videos" แล้ว');
                    await delay(2000);
                }
            } else {
                // Direct navigation to upload
                log('ไม่พบปุ่ม CREATE — ใช้ URL ตรง');
                window.location.href = 'https://studio.youtube.com/channel/UC/videos/upload';
                await delay(3000);
            }
        }
        hudUpdate(0, 'done');

        // ── Step 2: Upload video file ──
        hudUpdate(1, 'active');
        log('── ขั้น 2: อัพโหลดวิดีโอ ──');

        const videoFile = await fetchVideoFromBg();
        if (!videoFile) {
            hudUpdate(1, 'error');
            return { success: false, error: 'ไม่พบไฟล์วิดีโอใน cache' };
        }

        // Find file input or upload drop zone
        let fileInjected = false;

        // Strategy 1: Find the file input directly
        const fileInput = await waitForElement(() => {
            const inputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
            for (const inp of inputs) {
                if (inp.accept?.includes('video') || inp.accept?.includes('*')) return inp;
            }
            // Fallback: any file input
            return inputs.length > 0 ? inputs[0] : null;
        }, 10000) as HTMLInputElement | null;

        if (fileInput) {
            const dt = new DataTransfer();
            dt.items.add(videoFile);
            fileInput.files = dt.files;
            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
            fileInput.dispatchEvent(new Event('input', { bubbles: true }));
            log('ฉีดไฟล์ผ่าน file input');
            fileInjected = true;
        }

        // Strategy 2: Drop on upload area
        if (!fileInjected) {
            const dropZone = document.querySelector('#upload-prompt-box') ||
                             document.querySelector('[id*="upload"]') ||
                             document.querySelector('.upload-area');
            if (dropZone) {
                const dt = new DataTransfer();
                dt.items.add(videoFile);
                dropZone.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
                dropZone.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true }));
                dropZone.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true }));
                log('ฉีดไฟล์ผ่าน drop event');
                fileInjected = true;
            }
        }

        if (!fileInjected) {
            hudUpdate(1, 'error');
            return { success: false, error: 'ไม่พบ file input หรือ drop zone' };
        }

        // Wait for upload to start processing
        log('รอ YouTube ประมวลผลไฟล์...');
        await delay(5000);

        // Wait for title field to appear (indicates upload started)
        const titleField = await waitForElement(() => {
            return document.querySelector('#textbox[aria-label]') ||
                   document.querySelector('ytcp-social-suggestions-textbox #textbox') ||
                   document.querySelector('[id="title-textarea"] #textbox') ||
                   document.querySelector('div[contenteditable="true"][aria-label*="title" i]') ||
                   document.querySelector('div[contenteditable="true"][aria-label*="ชื่อ"]');
        }, 30000);

        if (!titleField) {
            hudUpdate(1, 'error');
            return { success: false, error: 'อัพโหลดไม่สำเร็จ — ไม่พบช่อง Title' };
        }
        hudUpdate(1, 'done');

        // ── Step 3: Fill Title + Description ──
        hudUpdate(2, 'active');
        log('── ขั้น 3: กรอกชื่อ + คำอธิบาย ──');

        // Title — append #Shorts if not already present
        let finalTitle = config.title || 'Netflow AI Video';
        if (!finalTitle.includes('#Shorts')) {
            finalTitle = `${finalTitle} #Shorts`;
        }

        // Clear existing title and type new one
        (titleField as HTMLElement).focus();
        (titleField as HTMLElement).click();
        await delay(300);

        // Select all + delete
        document.execCommand('selectAll');
        await delay(100);
        document.execCommand('insertText', false, finalTitle);
        log(`กรอกชื่อ: "${finalTitle}"`);
        await delay(500);

        // Description
        if (config.description) {
            const descField = document.querySelector('[id="description-textarea"] #textbox') ||
                              document.querySelector('div[contenteditable="true"][aria-label*="description" i]') ||
                              document.querySelector('div[contenteditable="true"][aria-label*="คำอธิบาย"]') ||
                              document.querySelector('div[contenteditable="true"][aria-label*="บอกข้อมูล"]');
            if (descField) {
                (descField as HTMLElement).focus();
                (descField as HTMLElement).click();
                await delay(300);
                document.execCommand('selectAll');
                await delay(100);
                document.execCommand('insertText', false, config.description);
                log(`กรอกคำอธิบาย: ${config.description.substring(0, 50)}...`);
            } else {
                warn('ไม่พบช่อง Description');
            }
        }
        hudUpdate(2, 'done');

        // ── Step 4: Made for Kids ──
        hudUpdate(3, 'active');
        log('── ขั้น 4: เลือก "สร้างมาเพื่อเด็ก" ──');
        await delay(1000);

        // Scroll down to find the radio buttons
        const radioSelector = config.madeForKids
            ? () => findByText('วิดีโอนี้สร้างมาเพื่อเด็ก', 'tp-yt-paper-radio-button, #made-for-kids-group tp-yt-paper-radio-button') ||
                    findByText('Yes, it\'s made for kids', 'tp-yt-paper-radio-button')
            : () => findByText('ไม่ วิดีโอนี้ไม่ได้สร้างมาเพื่อเด็ก', 'tp-yt-paper-radio-button, #made-for-kids-group tp-yt-paper-radio-button') ||
                    findByText('No, it\'s not made for kids', 'tp-yt-paper-radio-button');

        const radioBtn = await waitForElement(radioSelector, 10000);
        if (radioBtn) {
            clickElement(radioBtn);
            log(`เลือก: ${config.madeForKids ? 'สร้างมาเพื่อเด็ก' : 'ไม่ได้สร้างมาเพื่อเด็ก'}`);
        } else {
            warn('ไม่พบตัวเลือก Made for Kids — ลองหาแบบอื่น');
            // Fallback: try radio by id
            const radios = document.querySelectorAll('tp-yt-paper-radio-button');
            if (radios.length >= 2) {
                clickElement(config.madeForKids ? radios[0] : radios[1]);
                log('เลือกผ่าน radio fallback');
            }
        }
        hudUpdate(3, 'done');
        await delay(1000);

        // ── Step 5: Click Next 3 times (Details → Elements → Checks → Visibility) ──
        hudUpdate(4, 'active');
        log('── ขั้น 5: กด "ถัดไป" 3 ครั้ง ──');

        for (let i = 0; i < 3; i++) {
            const nextBtn = await waitForElement(() => {
                return findByText('ถัดไป', 'button, ytcp-button, #next-button') ||
                       findByText('Next', 'button, ytcp-button, #next-button') ||
                       document.querySelector('#next-button');
            }, 8000);

            if (nextBtn) {
                clickElement(nextBtn);
                log(`กด "ถัดไป" ครั้งที่ ${i + 1}/3`);
                await delay(2000);
            } else {
                warn(`ไม่พบปุ่ม "ถัดไป" ครั้งที่ ${i + 1}`);
            }
        }
        hudUpdate(4, 'done');

        // ── Step 6: Select Visibility + Publish ──
        hudUpdate(5, 'active');
        log('── ขั้น 6: เลือกการเผยแพร่ ──');
        await delay(1500);

        // Select visibility radio
        const visibilityMap: Record<string, string[]> = {
            public: ['สาธารณะ', 'Public'],
            unlisted: ['ไม่แสดง', 'Unlisted', 'ไม่เป็นสาธารณะ'],
            private: ['ส่วนตัว', 'Private'],
        };

        const visLabels = visibilityMap[config.visibility] || visibilityMap.public;
        let visSelected = false;
        for (const label of visLabels) {
            const visRadio = findByText(label, 'tp-yt-paper-radio-button, #privacy-radios tp-yt-paper-radio-button, [name="PUBLIC"] , [name="UNLISTED"], [name="PRIVATE"]');
            if (visRadio) {
                clickElement(visRadio);
                log(`เลือกการเผยแพร่: ${label}`);
                visSelected = true;
                break;
            }
        }
        if (!visSelected) {
            // Fallback: try clicking radio by index
            const privacyRadios = document.querySelectorAll('#privacy-radios tp-yt-paper-radio-button');
            const idx = config.visibility === 'private' ? 0 : config.visibility === 'unlisted' ? 1 : 2;
            if (privacyRadios[idx]) {
                clickElement(privacyRadios[idx]);
                log(`เลือกการเผยแพร่ผ่าน index: ${idx}`);
            } else {
                warn('ไม่พบตัวเลือกการเผยแพร่');
            }
        }
        await delay(1500);

        // Wait for upload to complete before publishing
        log('รอการอัพโหลดเสร็จก่อนเผยแพร่...');
        const uploadDoneStart = Date.now();
        while (Date.now() - uploadDoneStart < 300000) { // Max 5 minutes
            const progressText = document.body.innerText;
            if (progressText.includes('การประมวลผลเสร็จสมบูรณ์') ||
                progressText.includes('Finished processing') ||
                progressText.includes('เผยแพร่แล้ว') ||
                progressText.includes('Upload complete') ||
                progressText.includes('ตรวจสอบเสร็จแล้ว') ||
                progressText.includes('Checks complete')) {
                log('✅ อัพโหลด/ประมวลผลเสร็จ');
                break;
            }
            // Check for progress percentage
            const pctMatch = progressText.match(/(\d+)%\s*(อัปโหลดแล้ว|uploaded|กำลังประมวลผล|processing)/i);
            if (pctMatch) {
                const pct = parseInt(pctMatch[1]);
                if (pct >= 100) {
                    log('อัพโหลด 100% — รอประมวลผล');
                }
            }
            await delay(3000);
        }

        // Click Publish / Save
        const publishBtn = await waitForElement(() => {
            return findByText('เผยแพร่', 'button, ytcp-button, #done-button') ||
                   findByText('Publish', 'button, ytcp-button, #done-button') ||
                   findByText('บันทึก', 'button, ytcp-button, #done-button') ||
                   findByText('Save', 'button, ytcp-button, #done-button') ||
                   document.querySelector('#done-button');
        }, 10000);

        if (publishBtn) {
            clickElement(publishBtn);
            log(`✅ คลิก "${config.visibility === 'private' ? 'บันทึก' : 'เผยแพร่'}" แล้ว!`);
            hudUpdate(5, 'done');
        } else {
            hudUpdate(5, 'error');
            return { success: false, error: 'ไม่พบปุ่มเผยแพร่/บันทึก' };
        }

        await delay(3000);

        // Close the success dialog if present
        const closeBtn = findByText('ปิด', 'button, ytcp-button') || findByText('Close', 'button, ytcp-button');
        if (closeBtn) {
            clickElement(closeBtn);
            log('ปิด dialog สำเร็จ');
        }

        log('=== ✅ YouTube Shorts Upload เสร็จสมบูรณ์! ===');
        hudRemove(5000);

        // Notify extension
        try {
            chrome.runtime.sendMessage({
                type: 'YOUTUBE_UPLOAD_COMPLETE',
                title: finalTitle,
                visibility: config.visibility
            });
        } catch (_) {}

        return { success: true };

    } catch (err: any) {
        warn(`Upload error: ${err.message}`);
        hudRemove(8000);
        return { success: false, error: err.message };
    }
}

// ── Message Listener ─────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.action === 'UPLOAD_YOUTUBE') {
        log('ได้รับคำสั่ง UPLOAD_YOUTUBE');
        sendResponse({ success: true, message: '⏳ เริ่มอัพโหลด YouTube Shorts...' });

        runYouTubeUpload({
            title: message.title || '',
            description: message.description || '',
            madeForKids: message.madeForKids || false,
            visibility: message.visibility || 'public',
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
