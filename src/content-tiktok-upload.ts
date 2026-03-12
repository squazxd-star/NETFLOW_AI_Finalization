/**
 * TikTok Studio Upload Automation Content Script
 * Runs on tiktok.com/tiktokstudio/upload* pages
 *
 * Handles the full upload flow:
 *   1. Upload video file (fetched via service worker)
 *   2. Fill caption + hashtags
 *   3. Add product link (ปักตะกร้า)
 *   4. Set schedule time
 *   5. Submit (ตั้งเวลา or โพสต์)
 */

// ── Re-entry guard: prevent duplicate execution when injected twice ──
if ((window as any).__NETFLOW_TIKTOK_UPLOAD_LOADED__) {
  console.log('[NetFlow TikTok Upload] Already loaded — skipping duplicate injection');
} else {
(window as any).__NETFLOW_TIKTOK_UPLOAD_LOADED__ = true;

console.log('[NetFlow TikTok Upload] Content script loaded on:', window.location.href);

// ── Utilities ────────────────────────────────────────────────────

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Detect minimized/hidden window — getBoundingClientRect returns all zeros in this state */
const _hidden = () => document.hidden;

const waitForElement = async (
  selectorOrFn: string | (() => Element | null),
  timeout = 15000,
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
  const htm = el as HTMLElement;
  htm.focus();
  // Full pointer→mouse→click sequence required for TikTok Studio's React components
  const r = htm.getBoundingClientRect();
  const cx = _hidden() ? 10 : r.left + r.width / 2;
  const cy = _hidden() ? 10 : r.top + r.height / 2;
  const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy, button: 0 };
  htm.dispatchEvent(new PointerEvent('pointerdown', { ...opts, pointerId: 1, isPrimary: true, pointerType: 'mouse' }));
  htm.dispatchEvent(new MouseEvent('mousedown', opts));
  htm.dispatchEvent(new PointerEvent('pointerup', { ...opts, pointerId: 1, isPrimary: true, pointerType: 'mouse' }));
  htm.dispatchEvent(new MouseEvent('mouseup', opts));
  htm.dispatchEvent(new MouseEvent('click', opts));
  htm.click();
};

const findByText = (
  text: string,
  selector = 'button, a, span, div, label',
  exact = false
): Element | null => {
  const all = Array.from(document.querySelectorAll(selector));
  for (const el of all) {
    const t = (el.textContent || '').trim();
    const match = exact ? t === text : t.includes(text);
    if (match) {
      if (_hidden()) return el;
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) return el;
    }
  }
  return null;
};

const findAllByText = (text: string, selector = 'button, a, span, div'): Element[] => {
  return Array.from(document.querySelectorAll(selector)).filter(el => {
    const t = (el.textContent || '').trim();
    return t.includes(text) && (_hidden() || (el as HTMLElement).getBoundingClientRect().width > 0);
  });
};

const log = (msg: string) => console.log(`[NetFlow TikTok Upload] ${msg}`);
const warn = (msg: string) => console.warn(`[NetFlow TikTok Upload] ⚠️ ${msg}`);

// ── On-Page Progress Overlay (HUD) ──────────────────────────────
let _overlayEl: HTMLElement | null = null;
let _overlayStepsEl: HTMLElement | null = null;
let _overlayTitleEl: HTMLElement | null = null;
let _overlayStepData: { label: string; status: string }[] = [];

const hudCreate = () => {
  if (_overlayEl) return;
  const el = document.createElement('div');
  el.id = 'netflow-tiktok-hud';
  el.style.cssText = `
    position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
    z-index: 2147483647; width: 420px; max-height: 80vh; overflow-y: auto;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border: 1px solid rgba(99,102,241,0.4); border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
    font-family: 'Prompt', 'Segoe UI', system-ui, sans-serif; color: #e2e8f0;
    padding: 0; backdrop-filter: blur(12px);
  `;
  el.innerHTML = `
    <div style="padding:16px 20px 12px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; gap:10px;">
      <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:18px;">🚀</div>
      <div style="flex:1;">
        <div style="font-weight:700;font-size:14px;color:#fff;" id="nf-hud-title">NETFLOW AI — กำลังโพสต์ TikTok</div>
        <div style="font-size:11px;color:#94a3b8;margin-top:2px;">Auto-Post Engine กำลังทำงาน...</div>
      </div>
      <button id="nf-hud-hide" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#94a3b8;font-size:16px;padding:4px 10px;cursor:pointer;transition:all 0.2s;line-height:1;" title="ซ่อน">✕</button>
    </div>
    <div id="nf-hud-steps" style="padding:12px 20px 16px;"></div>
  `;
  // Hide button handler
  const hideBtn = el.querySelector('#nf-hud-hide') as HTMLElement;
  if (hideBtn) {
    hideBtn.onmouseenter = () => { hideBtn.style.color = '#fff'; hideBtn.style.background = 'rgba(255,255,255,0.15)'; };
    hideBtn.onmouseleave = () => { hideBtn.style.color = '#94a3b8'; hideBtn.style.background = 'rgba(255,255,255,0.08)'; };
    hideBtn.onclick = () => {
      if (el.style.maxHeight === '52px') {
        el.style.maxHeight = '80vh';
        el.style.overflow = 'auto';
        hideBtn.textContent = '✕';
        hideBtn.title = 'ซ่อน';
        const stepsEl = el.querySelector('#nf-hud-steps') as HTMLElement;
        if (stepsEl) stepsEl.style.display = '';
      } else {
        el.style.maxHeight = '52px';
        el.style.overflow = 'hidden';
        hideBtn.textContent = '▼';
        hideBtn.title = 'แสดง';
        const stepsEl = el.querySelector('#nf-hud-steps') as HTMLElement;
        if (stepsEl) stepsEl.style.display = 'none';
      }
    };
  }
  document.body.appendChild(el);
  _overlayEl = el;
  _overlayStepsEl = el.querySelector('#nf-hud-steps');
  _overlayTitleEl = el.querySelector('#nf-hud-title');
};

const hudUpdateStep = (step: number, total: number, label: string, status: string) => {
  if (!_overlayStepsEl) return;

  // Update stored data
  while (_overlayStepData.length < total) {
    _overlayStepData.push({ label: '', status: 'pending' });
  }
  // Mark all prior steps as done
  for (let i = 0; i < step - 1; i++) {
    if (_overlayStepData[i].status !== 'error') _overlayStepData[i].status = 'done';
  }
  if (step > 0 && step <= total) {
    _overlayStepData[step - 1] = { label, status };
  }

  // Render
  let html = '';
  for (let i = 0; i < _overlayStepData.length; i++) {
    const d = _overlayStepData[i];
    if (!d.label) continue; // skip empty
    const icon = d.status === 'done' ? '✅' : d.status === 'error' ? '❌' : d.status === 'active' ? '⏳' : '⬜';
    const color = d.status === 'done' ? '#22c55e' : d.status === 'error' ? '#ef4444' : d.status === 'active' ? '#eab308' : '#64748b';
    const bg = d.status === 'active' ? 'rgba(234,179,8,0.08)' : 'transparent';
    html += `<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:8px;background:${bg};margin-bottom:2px;">
      <span style="font-size:13px;flex-shrink:0;">${icon}</span>
      <span style="font-size:12px;color:${color};${d.status === 'active' ? 'font-weight:600;' : ''}">${d.label}</span>
    </div>`;
  }
  _overlayStepsEl.innerHTML = html;

  // Auto-scroll to bottom
  _overlayStepsEl.scrollTop = _overlayStepsEl.scrollHeight;
};

const hudSuccess = () => {
  if (_overlayTitleEl) {
    _overlayTitleEl.textContent = '✅ โพสต์ TikTok สำเร็จ!';
    _overlayTitleEl.style.color = '#22c55e';
  }
  if (_overlayEl) {
    _overlayEl.style.borderColor = 'rgba(34,197,94,0.5)';
    // Auto-hide after 10s
    setTimeout(() => { if (_overlayEl) _overlayEl.style.opacity = '0.3'; }, 10000);
  }
};

const hudError = (msg: string) => {
  if (_overlayTitleEl) {
    _overlayTitleEl.textContent = `❌ ล้มเหลว: ${msg}`;
    _overlayTitleEl.style.color = '#ef4444';
  }
  if (_overlayEl) {
    _overlayEl.style.borderColor = 'rgba(239,68,68,0.5)';
  }
};

/** Send granular progress to side panel via service worker + update on-page HUD */
const sendProgress = (step: number, total: number, label: string, status: 'active' | 'done' | 'error' = 'active') => {
  log(`[${step}/${total}] ${label} (${status})`);
  hudUpdateStep(step, total, label, status);
  try {
    chrome.runtime.sendMessage({
      type: 'TIKTOK_UPLOAD_PROGRESS',
      step, total, label, status
    });
  } catch (_) { /* silent */ }
};

// ── Step 1: Upload Video File ────────────────────────────────────

/** Convert base64 data URL to Blob */
const dataUrlToBlob = (dataUrl: string): Blob | null => {
  try {
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeType = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType || 'video/mp4' });
  } catch (e) {
    warn('dataUrlToBlob failed: ' + (e as Error).message);
    return null;
  }
};

// Keep video blob locally for retries (survives across uploadVideoFile calls)
let _localVideoBlob: Blob | null = null;

const uploadVideoFile = async (videoUrl: string, useCache = false): Promise<boolean> => {
  log('Step 1: Uploading video...');
  let videoBlob: Blob | null = null;

  // ── Strategy 0: Reuse locally stored blob from a previous attempt ──
  if (_localVideoBlob) {
    log(`Reusing locally stored blob: ${(_localVideoBlob.size / 1024 / 1024).toFixed(1)} MB`);
    videoBlob = _localVideoBlob;
  }

  // ── Strategy 1: Get pre-cached video from service worker (always try) ──
  if (!videoBlob) {
    log('Trying GET_CACHED_VIDEO (pre-fetched by service worker)...');
    videoBlob = await new Promise<Blob | null>((resolve) => {
      try {
        chrome.runtime.sendMessage({ type: 'GET_CACHED_VIDEO' }, (response) => {
          if (chrome.runtime.lastError || !response?.success) {
            warn('GET_CACHED_VIDEO failed: ' + (chrome.runtime.lastError?.message || response?.error || 'unknown'));
            resolve(null);
            return;
          }
          resolve(dataUrlToBlob(response.data as string));
        });
      } catch (e) {
        warn('GET_CACHED_VIDEO error: ' + (e as Error).message);
        resolve(null);
      }
    });
    if (videoBlob) {
      log(`Cached video blob ready: ${(videoBlob.size / 1024 / 1024).toFixed(1)} MB`);
    }
  }

  // ── Strategy 2: Fetch via service worker proxy (fallback) ──
  if (!videoBlob) {
    log('Trying FETCH_VIDEO_BLOB (service worker proxy)...');
    videoBlob = await new Promise<Blob | null>((resolve) => {
      try {
        chrome.runtime.sendMessage({ type: 'FETCH_VIDEO_BLOB', url: videoUrl }, (response) => {
          if (chrome.runtime.lastError || !response?.success) {
            warn('FETCH_VIDEO_BLOB failed');
            resolve(null);
            return;
          }
          resolve(dataUrlToBlob(response.data as string));
        });
      } catch (e) {
        resolve(null);
      }
    });
    if (videoBlob) log(`SW proxy video blob ready: ${(videoBlob.size / 1024 / 1024).toFixed(1)} MB`);
  }

  // ── Strategy 3: Direct fetch (last resort) ──
  if (!videoBlob) {
    log('Trying direct fetch...');
    try {
      const resp = await fetch(videoUrl);
      if (resp.ok) {
        videoBlob = await resp.blob();
        log(`Direct fetch video blob ready: ${(videoBlob.size / 1024 / 1024).toFixed(1)} MB`);
      }
    } catch (e) {
      warn('Direct fetch failed: ' + (e as Error).message);
    }
  }

  if (!videoBlob) {
    warn('All video fetch strategies failed');
    return false;
  }

  // Store locally for retries
  _localVideoBlob = videoBlob;

  // ── Find file input and set video ──
  const fileInput = await waitForElement(
    () => {
      const inputs = Array.from(document.querySelectorAll('input[type="file"]'));
      return inputs.find(inp => {
        const accept = inp.getAttribute('accept') || '';
        return accept.includes('video') || accept.includes('mp4') || accept === '*/*' || !accept;
      }) || inputs[0] || null;
    },
    15000,
    500
  ) as HTMLInputElement | null;

  if (!fileInput) {
    // Try clicking upload button to reveal hidden file input
    const addBtn = findByText('เพิ่มวิดีโอ') || findByText('เลือกวิดีโอ') || findByText('Select video');
    if (addBtn) {
      log('Clicking upload button to reveal file input...');
      clickElement(addBtn);
      await delay(2000);
    }

    const fileInput2 = document.querySelector('input[type="file"]') as HTMLInputElement | null;
    if (!fileInput2) {
      warn('No file input found on page — trying drag-drop fallback');
      return tryDragDrop(videoBlob);
    }

    return setFileInput(fileInput2, videoBlob);
  }

  return setFileInput(fileInput, videoBlob);
};

/** Determine correct file extension and MIME type from blob */
const getVideoMimeAndExt = (blob: Blob): { mime: string; ext: string } => {
  const type = (blob.type || '').toLowerCase();
  if (type.includes('webm')) return { mime: 'video/webm', ext: 'webm' };
  if (type.includes('quicktime') || type.includes('mov')) return { mime: 'video/quicktime', ext: 'mov' };
  if (type.includes('avi')) return { mime: 'video/x-msvideo', ext: 'avi' };
  // Default to mp4 (most compatible with TikTok)
  return { mime: 'video/mp4', ext: 'mp4' };
};

/** Check if TikTok is showing an upload error dialog */
const detectUploadError = (): Element | null => {
  const errorPatterns = ['ไม่สามารถอัปโหลด', 'อัปโหลดไม่สำเร็จ', 'เกิดข้อผิดพลาด', 'upload failed', 'unable to upload', 'cannot upload'];
  const allEls = document.querySelectorAll('div, span, p, h2, h3');
  for (const el of allEls) {
    const text = (el.textContent || '').trim().toLowerCase();
    if (text.length > 200 || text.length < 3) continue;
    for (const pat of errorPatterns) {
      if (text.includes(pat.toLowerCase())) return el;
    }
  }
  return null;
};

/** Click retry button in TikTok error dialog */
const clickRetryButton = async (): Promise<boolean> => {
  const retryBtn = findByText('ลองใหม่', 'button') || findByText('ลองอีกครั้ง', 'button') || findByText('Try again', 'button') || findByText('Retry', 'button');
  if (retryBtn) {
    log('Clicking retry button...');
    clickElement(retryBtn);
    await delay(2000);
    return true;
  }
  // Also try clicking "เปลี่ยน" (Change) to re-upload
  const changeBtn = findByText('เปลี่ยน', 'button') || findByText('Change', 'button');
  if (changeBtn) {
    log('Clicking change button to re-upload...');
    clickElement(changeBtn);
    await delay(2000);
    return true;
  }
  return false;
};

const setFileInput = (input: HTMLInputElement, blob: Blob): boolean => {
  try {
    // Log actual blob type for debugging
    const detected = getVideoMimeAndExt(blob);
    log(`Video blob type: ${blob.type || 'unknown'} (detected: ${detected.mime}) → forcing video/mp4 for TikTok`);
    // Always use .mp4 extension for TikTok compatibility
    const file = new File([blob], `netflow_video_${Date.now()}.mp4`, { type: 'video/mp4' });
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;

    // Dispatch multiple events to ensure React/framework picks it up
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // Also dispatch via native setter for React compatibility
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'files')?.set;
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, dt.files);
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }

    log(`File set on input: ${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`);
    return true;
  } catch (e) {
    warn('setFileInput failed: ' + (e as Error).message);
    return tryDragDrop(blob);
  }
};

/** Fallback: simulate drag-and-drop on the upload area */
const tryDragDrop = (blob: Blob): boolean => {
  log('Attempting drag-drop simulation...');
  try {
    const file = new File([blob], `netflow_video_${Date.now()}.mp4`, { type: 'video/mp4' });
    const dt = new DataTransfer();
    dt.items.add(file);

    // Find the drop zone (upload area)
    const dropZone =
      document.querySelector('[class*="upload-card"]') ||
      document.querySelector('[class*="upload"]') ||
      document.querySelector('[class*="Upload"]') ||
      document.querySelector('[class*="drop"]') ||
      document.querySelector('main');

    if (!dropZone) {
      warn('No drop zone found for drag-drop');
      return false;
    }

    // Simulate full drag sequence
    dropZone.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
    dropZone.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true }));
    dropZone.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true }));

    log('Drag-drop simulation dispatched');
    return true;
  } catch (e) {
    warn('Drag-drop simulation failed: ' + (e as Error).message);
    return false;
  }
};

// ── Step 2: Fill Caption ─────────────────────────────────────────

const fillCaption = async (caption: string): Promise<boolean> => {
  log('Step 2: Filling caption...');

  // Wait for the caption editor to appear (TikTok uses a contenteditable div)
  const editor = await waitForElement(
    () => {
      // TikTok Studio uses DraftJS or similar - look for the editor
      const editors = Array.from(document.querySelectorAll(
        '[contenteditable="true"], .public-DraftEditor-content, [data-contents="true"], div[role="textbox"]'
      ));
      // Filter: must be visible and reasonably sized (not a small comment box)
      return editors.find(el => {
        if (_hidden()) return true;
        const rect = (el as HTMLElement).getBoundingClientRect();
        return rect.width > 200 && rect.height > 30;
      }) || null;
    },
    20000
  );

  if (!editor) {
    // Fallback: try textarea
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.value = caption;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      textarea.dispatchEvent(new Event('change', { bubbles: true }));
      log('Caption filled via textarea');
      return true;
    }
    warn('No caption editor found');
    return false;
  }

  // Clear existing content
  (editor as HTMLElement).focus();
  document.execCommand('selectAll', false);
  await delay(100);
  document.execCommand('delete', false);
  await delay(100);

  // Insert caption text
  document.execCommand('insertText', false, caption);
  await delay(200);

  // Dispatch events for React state sync
  editor.dispatchEvent(new Event('input', { bubbles: true }));
  editor.dispatchEvent(new Event('change', { bubbles: true }));

  log('Caption filled: ' + caption.substring(0, 50) + '...');
  return true;
};

// ── Step 3: Add Hashtags ─────────────────────────────────────────

const addHashtags = async (hashtags: string[]): Promise<boolean> => {
  log('Step 3: Adding hashtags...');

  if (!hashtags || hashtags.length === 0) return true;

  // Find the hashtag input area - usually the same editor as caption
  const editor = document.querySelector(
    '[contenteditable="true"], .public-DraftEditor-content, div[role="textbox"]'
  ) as HTMLElement | null;

  if (!editor) {
    warn('No editor found for hashtags');
    return false;
  }

  editor.focus();

  // Move cursor to end
  const sel = window.getSelection();
  if (sel) {
    sel.selectAllChildren(editor);
    sel.collapseToEnd();
  }

  // Add line break before hashtags to separate from caption
  await delay(200);
  document.execCommand('insertText', false, '\n\n');
  await delay(300);

  // Add each hashtag
  for (let i = 0; i < hashtags.length; i++) {
    const cleanTag = hashtags[i].replace(/^#/, '');
    if (!cleanTag) continue;
    await delay(300);
    // First tag: no leading space; subsequent: space separator
    const prefix = i === 0 ? '' : ' ';
    document.execCommand('insertText', false, `${prefix}#${cleanTag}`);
    await delay(500);
    // Press space to confirm hashtag suggestion dropdown
    editor.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true }));
    editor.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', bubbles: true }));
    await delay(300);
  }

  log(`Added ${hashtags.length} hashtags`);
  return true;
};

// ── Step 4: Add Product Link (ปักตะกร้า) ────────────────────────

const addProductLink = async (productId: string): Promise<boolean> => {
  log('Step 4: Adding product link for ID: ' + productId);

  // ── 1. Scroll down to find "เพิ่มลิงก์" section ──
  const scrollContainer = document.querySelector('main') || document.documentElement;
  for (let i = 0; i < 8; i++) {
    scrollContainer.scrollTop += 300;
    await delay(400);
    const found = findByText('เพิ่มลิงก์สินค้า') || findByText('เพิ่มลิงก์') || findByText('Add product links') || findByText('Add link');
    if (found) break;
  }

  // Click "เพิ่มลิงก์สินค้า" / "เพิ่มลิงก์" / "Add link"
  const addLinkBtn = findByText('เพิ่มลิงก์สินค้า') || findByText('เพิ่มลิงก์') || findByText('Add product links') || findByText('Add link') || findByText('+ เพิ่ม');
  if (!addLinkBtn) {
    warn('Could not find "เพิ่มลิงก์" button');
    return false;
  }
  clickElement(addLinkBtn);
  log('Clicked เพิ่มลิงก์สินค้า');
  await delay(2500);

  // ── 2. Handle link type dialog if it appears (ประเภทของลิงก์ → สินค้า) ──
  const nextBtn1 = findByText('ถัดไป', 'button') || findByText('Next', 'button');
  if (nextBtn1) {
    clickElement(nextBtn1);
    log('Clicked ถัดไป (link type)');
    await delay(3000);
  }

  // ── 3. Wait for product selection dialog to fully load ──
  const productListReady = await waitForElement(
    () => {
      // Scope search to modal/dialog container ONLY — avoids grabbing the wrong input
      const modalScope: Element = document.querySelector(
        '[role="dialog"], [role="modal"], [class*="modal"], [class*="Modal"], [class*="dialog"], [class*="Dialog"], [class*="drawer"], [class*="Drawer"]'
      ) || document.body;
      const inputs = Array.from(modalScope.querySelectorAll('input[type="text"], input[type="search"], input[placeholder*="ค้นหา"], input[placeholder*="Search"], input[placeholder*="search"]'));
      // Filter to visible ones inside the modal
      for (const inp of inputs) {
        if (_hidden()) return inp;
        const rect = (inp as HTMLElement).getBoundingClientRect();
        if (rect.width > 100 && rect.height > 20) return inp;
      }
      return null;
    },
    10000
  );

  // ── 4. Type product ID into search bar ──
  if (productListReady) {
    const searchInput = productListReady as HTMLInputElement;
    log('Found search input, typing product ID: ' + productId);

    // Clear existing text
    searchInput.focus();
    await delay(200);
    searchInput.select();
    document.execCommand('selectAll', false);
    await delay(100);

    // Type using native setter for React compatibility
    const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
    if (nativeSetter) {
      nativeSetter.call(searchInput, productId);
    } else {
      searchInput.value = productId;
    }
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    searchInput.dispatchEvent(new Event('change', { bubbles: true }));
    // Also try keydown/keyup for search triggers
    searchInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: 'Enter' }));
    searchInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));
    await delay(100);
    // Simulate pressing Enter to trigger search
    searchInput.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, key: 'Enter', code: 'Enter' }));

    log('Typed product ID into search, waiting for filter...');
    await delay(3000); // Wait for search results to update
  } else {
    log('No search input found, will try to find product without search');
  }

  // ── 5. Find and select the product row matching our ID ──
  let productSelected = false;

  // Strategy A: Find smallest element containing exactly our product ID (most precise)
  const candidates = Array.from(document.querySelectorAll('span, td, div, p')).filter(el => {
    const t = (el.textContent || '').trim();
    if (!t.includes(productId) || t.length >= 200) return false;
    if (_hidden()) return true;
    const rect = (el as HTMLElement).getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });

  // Sort by text length (smallest = most specific match)
  candidates.sort((a, b) => (a.textContent || '').length - (b.textContent || '').length);

  for (const el of candidates) {
    // Walk up to find the row with a checkbox/radio
    let row: Element | null = el;
    for (let i = 0; i < 12 && row; i++) {
      row = row.parentElement;
      if (!row) break;
      const checkbox = row.querySelector('input[type="radio"], input[type="checkbox"], [role="radio"], [role="checkbox"], label[class*="check"], span[class*="check"]');
      if (checkbox) {
        clickElement(checkbox);
        productSelected = true;
        log('Selected product by checkbox/radio in row');
        break;
      }
      // Check if this row looks like a product row (has image + product ID text)
      if (row.querySelector('img') && (row.textContent || '').includes(productId)) {
        const rowRect = (row as HTMLElement).getBoundingClientRect();
        if (_hidden() || (rowRect.height > 40 && rowRect.height < 200)) {
          // Click the leftmost part of the row (likely the checkbox area)
          const clickX = _hidden() ? 30 : rowRect.left + 30;
          const clickY = _hidden() ? 30 : rowRect.top + rowRect.height / 2;
          row.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: clickX, clientY: clickY }));
          productSelected = true;
          log('Selected product by clicking row area');
          break;
        }
      }
    }
    if (productSelected) break;
  }

  if (!productSelected) {
    warn('Could not select product with ID: ' + productId);
    return false;
  }

  await delay(1500);

  // ── 6. Click confirm buttons ──
  // Try "ถัดไป" (Next) if visible
  const nextBtn2 = findByText('ถัดไป', 'button') || findByText('Next', 'button');
  if (nextBtn2) {
    clickElement(nextBtn2);
    log('Clicked ถัดไป (product selected)');
    await delay(2000);
  }

  // Click "เพิ่ม" (Add) / "Add" / "ยืนยัน" (Confirm)
  const addBtn = findByText('เพิ่ม', 'button') || findByText('Add', 'button') || findByText('ยืนยัน', 'button') || findByText('Confirm', 'button');
  if (addBtn) {
    clickElement(addBtn);
    log('Clicked เพิ่ม/Confirm');
    await delay(1500);
  }

  log('Product link added successfully');
  return true;
};

// ── Step 5: Set Schedule Time ────────────────────────────────────

const setScheduleTime = async (scheduleTime?: string): Promise<boolean> => {
  log('Step 5: Setting schedule...');

  // Scroll to scheduling section
  const scrollContainer = document.querySelector('main') || document.documentElement;
  for (let i = 0; i < 5; i++) {
    scrollContainer.scrollTop += 300;
    await delay(400);
  }

  // Calculate target time
  let targetDate: Date;
  if (scheduleTime) {
    targetDate = new Date(scheduleTime);
    const minTime = new Date(Date.now() + 15 * 60 * 1000);
    if (targetDate < minTime) targetDate = minTime;
  } else {
    targetDate = new Date(Date.now() + 15 * 60 * 1000);
  }

  log(`Target schedule time: ${targetDate.toLocaleString('th-TH')}`);

  // ── Find and click "ตั้งเวลา" radio button ──
  const scheduleRadio = await waitForElement(
    () => {
      // Strategy 1: Find by text content
      const labels = Array.from(document.querySelectorAll('label, div, span'));
      for (const el of labels) {
        const t = (el.textContent || '').trim();
        if ((t === 'ตั้งเวลา' || t === 'Schedule') && (_hidden() || (el as HTMLElement).getBoundingClientRect().width > 0)) {
          return el;
        }
      }
      // Strategy 2: Find input[type="radio"] near "ตั้งเวลา" text
      const radios = Array.from(document.querySelectorAll('[class*="Radio_root"], input[type="radio"]'));
      // Prefer radio that is near "ตั้งเวลา" / "Schedule" label
      for (const r of radios) {
        const nearby = r.parentElement?.textContent || r.closest('label')?.textContent || '';
        if (nearby.includes('ตั้งเวลา') || nearby.toLowerCase().includes('schedule')) return r;
      }
      if (radios.length >= 2) return radios[1]; // Index fallback: second radio = schedule
      return null;
    },
    8000
  );

  if (scheduleRadio) {
    clickElement(scheduleRadio);
    log('Clicked ตั้งเวลา radio');
    await delay(2000);
  } else {
    log('No schedule radio found, will try to set time anyway');
  }

  // ── Set time using TUXTextInputCore inputs ──
  const hours = targetDate.getHours().toString().padStart(2, '0');
  const mins = targetDate.getMinutes().toString().padStart(2, '0');

  // Find time inputs — TikTok uses custom TUXTextInputCore components
  const timeInputs = Array.from(document.querySelectorAll(
    'input[class*="TUXTextInputCore"], input[class*="time"], input.TUXTextInputCore-input'
  )) as HTMLInputElement[];

  if (timeInputs.length >= 2) {
    // First input = hours, second = minutes
    await setInputValue(timeInputs[0], hours);
    await delay(500);
    await setInputValue(timeInputs[1], mins);
    log(`Time set: ${hours}:${mins}`);
  } else {
    // Fallback: try standard time input
    const stdTimeInput = document.querySelector('input[type="time"]') as HTMLInputElement;
    if (stdTimeInput) {
      await setInputValue(stdTimeInput, `${hours}:${mins}`);
      log(`Time set via standard input: ${hours}:${mins}`);
    } else {
      // Last resort: find any input near "เวลา" text
      const timeLabel = findByText('เวลา') || findByText('Time');
      if (timeLabel) {
        const parent = timeLabel.closest('[class*="container"], [class*="schedule"], div') || timeLabel.parentElement;
        if (parent) {
          const inputs = Array.from(parent.querySelectorAll('input')) as HTMLInputElement[];
          if (inputs.length >= 2) {
            await setInputValue(inputs[0], hours);
            await delay(500);
            await setInputValue(inputs[1], mins);
            log(`Time set via label proximity: ${hours}:${mins}`);
          }
        }
      }
    }
  }

  // ── Set date ──
  const dateStr = `${targetDate.getFullYear()}-${(targetDate.getMonth() + 1).toString().padStart(2, '0')}-${targetDate.getDate().toString().padStart(2, '0')}`;
  const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
  if (dateInput) {
    await setInputValue(dateInput, dateStr);
    log(`Date set: ${dateStr}`);
  } else {
    // TikTok may use a date button — look for it and try to set
    const dateBtn = findByText(dateStr) || findByText(targetDate.getDate().toString());
    if (dateBtn) {
      clickElement(dateBtn);
      log('Clicked date in calendar');
    }
  }

  await delay(1000);
  log('Schedule time set');
  return true;
};

/** Helper: set input value with proper React/TikTok event dispatching */
const setInputValue = async (input: HTMLInputElement, value: string): Promise<void> => {
  input.focus();
  await delay(100);

  // Clear existing value
  input.select();
  document.execCommand('selectAll', false);
  await delay(50);

  // Set via native setter (React-compatible)
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
  if (nativeSetter) {
    nativeSetter.call(input, value);
  } else {
    input.value = value;
  }

  // Dispatch events for React state sync
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  input.dispatchEvent(new Event('blur', { bubbles: true }));
  await delay(100);
};

// ── Step 6: Submit / Post ────────────────────────────────────────

const submitPost = async (isScheduled: boolean): Promise<boolean> => {
  log('Step 6: Submitting post...');

  // Scroll to bottom
  const scrollContainer = document.querySelector('main') || document.documentElement;
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
  await delay(1000);

  // Find the submit button
  let submitBtn: Element | null = null;

  if (isScheduled) {
    // Look for "ตั้งเวลา" button (red button at bottom)
    submitBtn = findByText('ตั้งเวลา', 'button') || findByText('Schedule', 'button');

    // Make sure we get the SUBMIT button, not the radio option
    // The submit button should be at the bottom and styled differently
    const allScheduleBtns = findAllByText('ตั้งเวลา', 'button');
    if (allScheduleBtns.length > 1) {
      // Pick the last one (usually the submit button is at the bottom)
      submitBtn = allScheduleBtns[allScheduleBtns.length - 1];
    }
  } else {
    submitBtn = findByText('โพสต์', 'button') || findByText('Post', 'button') ||
      findByText('อัปโหลด', 'button') || findByText('Upload', 'button');
  }

  if (!submitBtn) {
    warn('Submit button not found');
    return false;
  }

  clickElement(submitBtn);
  log('Post submitted!');
  return true;
};

// ── Main Upload Flow ─────────────────────────────────────────────

interface UploadPayload {
  videoUrl: string;
  videoDataReady?: boolean; // true = video blob pre-cached in service worker
  productId: string;
  productName: string;
  caption: string;
  hashtags: string[];
  scheduleTime?: string;  // ISO string or empty for "now + 20min"
  postingMode?: 'immediate' | 'scheduled';
}

const TIKTOK_TOTAL_STEPS = 13;

const runUploadFlow = async (payload: UploadPayload): Promise<{ success: boolean; error?: string }> => {
  log('=== Starting TikTok Upload Flow ===');
  log(`Video: ${payload.videoUrl.substring(0, 60)}...`);
  log(`Product: ${payload.productName} (${payload.productId})`);
  log(`Caption: ${payload.caption.substring(0, 50)}...`);
  log(`Hashtags: ${payload.hashtags.join(', ')}`);

  // ★ Create on-page HUD so user can see progress
  hudCreate();

  const T = TIKTOK_TOTAL_STEPS;

  // Send initial caption/hashtag info so sidebar can show preview
  try {
    chrome.runtime.sendMessage({
      type: 'TIKTOK_CAPTION_PREVIEW',
      caption: payload.caption,
      hashtags: payload.hashtags,
      productName: payload.productName,
      scheduleTime: payload.scheduleTime || ''
    });
  } catch (_) { /* silent */ }

  try {
    // ── 1/13: รอหน้าอัปโหลด TikTok Studio ──
    sendProgress(1, T, 'รอหน้าอัปโหลด TikTok Studio');
    const uploadUIReady = await waitForElement(
      () => {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) return fileInput;
        const uploadBtn = findByText('เลือกวิดีโอ') || findByText('Select video') || findByText('เพิ่มวิดีโอ');
        if (uploadBtn) return uploadBtn;
        return null;
      },
      20000, // 20s timeout for heavy SPA
      1000
    );
    if (!uploadUIReady) {
      sendProgress(1, T, 'หน้าอัปโหลดไม่โหลด — ลองรอเพิ่ม', 'error');
      await delay(5000);
    }
    await delay(1000);
    sendProgress(1, T, 'รอหน้าอัปโหลด TikTok Studio', 'done');

    // ── 2/13: ดาวน์โหลดวิดีโอ ──
    sendProgress(2, T, 'ดาวน์โหลดวิดีโอจาก Grok');
    const uploadOk = await uploadVideoFile(payload.videoUrl, !!payload.videoDataReady);
    if (!uploadOk) {
      sendProgress(2, T, 'ดาวน์โหลดวิดีโอล้มเหลว', 'error');
      return { success: false, error: 'ไม่สามารถอัปโหลดวิดีโอได้' };
    }
    sendProgress(2, T, 'ดาวน์โหลดวิดีโอจาก Grok', 'done');

    // ── 3/13: รอ TikTok ประมวลผลวิดีโอ + ตรวจสอบ error ──
    sendProgress(3, T, 'รอ TikTok ประมวลผลวิดีโอ...');
    await delay(5000);

    // Check for upload error — TikTok may reject the file
    let uploadRetries = 0;
    const MAX_UPLOAD_RETRIES = 3;
    while (uploadRetries < MAX_UPLOAD_RETRIES) {
      const errorEl = detectUploadError();
      if (errorEl) {
        uploadRetries++;
        const errorText = (errorEl.textContent || '').trim().substring(0, 80);
        warn(`Upload error detected (attempt ${uploadRetries}/${MAX_UPLOAD_RETRIES}): ${errorText}`);
        sendProgress(3, T, `อัปโหลดล้มเหลว — ลองใหม่ครั้งที่ ${uploadRetries}...`);

        // Try clicking retry button
        const retried = await clickRetryButton();
        if (retried) {
          // After retry, need to re-upload the video
          await delay(3000);
          const reuploadOk = await uploadVideoFile(payload.videoUrl, true);
          if (!reuploadOk) {
            warn('Re-upload also failed');
          }
          await delay(8000); // Wait for TikTok to process again
          continue;
        } else {
          // No retry button found — try dismissing dialog
          const closeBtn = document.querySelector('[class*="modal"] button[class*="close"], [class*="dialog"] button') as HTMLElement;
          if (closeBtn) { closeBtn.click(); await delay(2000); }
          break;
        }
      } else {
        break; // No error — upload is processing
      }
    }

    if (uploadRetries >= MAX_UPLOAD_RETRIES) {
      sendProgress(3, T, `อัปโหลดล้มเหลว ${MAX_UPLOAD_RETRIES} ครั้ง`, 'error');
      return { success: false, error: 'TikTok ปฏิเสธวิดีโอ — ลองอัปโหลดใหม่' };
    }

    // Wait for editor to appear (sign that video was accepted)
    const editorReady = await waitForElement(
      () => document.querySelector('[contenteditable="true"], textarea, div[role="textbox"]'),
      45000
    );
    if (!editorReady) {
      // One final error check
      const finalError = detectUploadError();
      if (finalError) {
        sendProgress(3, T, 'TikTok ปฏิเสธวิดีโอ', 'error');
        return { success: false, error: 'TikTok ไม่สามารถประมวลผลวิดีโอได้' };
      }
      sendProgress(3, T, 'TikTok ประมวลผลวิดีโอล้มเหลว', 'error');
      return { success: false, error: 'หน้าอัปโหลดไม่ตอบสนองหลังจากอัปโหลดวิดีโอ' };
    }
    await delay(2000);

    // Double-check: make sure no error appeared during processing
    const postProcessError = detectUploadError();
    if (postProcessError) {
      sendProgress(3, T, 'วิดีโอถูกปฏิเสธหลังประมวลผล', 'error');
      await clickRetryButton();
      return { success: false, error: 'TikTok ปฏิเสธวิดีโอหลังประมวลผล' };
    }

    sendProgress(3, T, 'รอ TikTok ประมวลผลวิดีโอ', 'done');

    // ── 4/13: ใส่แคปชัน (AI-generated) ──
    sendProgress(4, T, 'ใส่แคปชัน (AI-generated)');
    await fillCaption(payload.caption);
    await delay(1000);
    sendProgress(4, T, 'ใส่แคปชัน (AI-generated)', 'done');

    // ── 5/13: ใส่แฮชแท็ก ──
    sendProgress(5, T, `ใส่แฮชแท็ก (${payload.hashtags.length} tags)`);
    await addHashtags(payload.hashtags);
    await delay(1000);
    sendProgress(5, T, `ใส่แฮชแท็ก (${payload.hashtags.length} tags)`, 'done');

    // ── 6/13: เลื่อนหาปุ่มเพิ่มลิงก์ ──
    if (payload.productId) {
      sendProgress(6, T, 'เลื่อนหาปุ่มเพิ่มลิงก์สินค้า');
      await delay(500);
      sendProgress(6, T, 'เลื่อนหาปุ่มเพิ่มลิงก์สินค้า', 'done');

      // ── 7/13: เปิดเมนูปักตะกร้า ──
      sendProgress(7, T, 'เปิดเมนูปักตะกร้าสินค้า');
      const productOk = await addProductLink(payload.productId);
      if (!productOk) {
        sendProgress(7, T, 'ปักตะกร้าไม่สำเร็จ (ข้ามไป)', 'error');
        warn('Product link failed but continuing...');
      } else {
        sendProgress(7, T, 'เปิดเมนูปักตะกร้าสินค้า', 'done');
      }
      await delay(1500);

      // ── 8/13: เลือกสินค้า + ยืนยัน ──
      sendProgress(8, T, `เลือกสินค้า "${payload.productName}"`, productOk ? 'done' : 'error');
    } else {
      sendProgress(6, T, 'ข้ามปักตะกร้า (ไม่มีสินค้า)', 'done');
      sendProgress(7, T, 'ข้ามปักตะกร้า', 'done');
      sendProgress(8, T, 'ข้ามปักตะกร้า', 'done');
    }

    // ── 9/13: เลื่อนหาส่วนตั้งเวลา ──
    const isScheduled = payload.postingMode === 'scheduled' || !!payload.scheduleTime;
    sendProgress(9, T, 'เลื่อนหาส่วนตั้งเวลา');
    await delay(500);
    sendProgress(9, T, 'เลื่อนหาส่วนตั้งเวลา', 'done');

    if (isScheduled) {
      // ── 10/13: คลิกปุ่มตั้งเวลา ──
      sendProgress(10, T, 'คลิกปุ่ม "ตั้งเวลา"');
      await setScheduleTime(payload.scheduleTime);
      sendProgress(10, T, 'คลิกปุ่ม "ตั้งเวลา"', 'done');
      await delay(1000);

      // ── 11/13: ใส่เวลาโพสต์ ──
      const targetDate = payload.scheduleTime ? new Date(payload.scheduleTime) : new Date(Date.now() + 15 * 60 * 1000);
      const timeStr = `${targetDate.getHours().toString().padStart(2, '0')}:${targetDate.getMinutes().toString().padStart(2, '0')}`;
      sendProgress(11, T, `ใส่เวลาโพสต์: ${timeStr}`, 'done');
    } else {
      sendProgress(10, T, 'โพสต์ทันที (ไม่ตั้งเวลา)', 'done');
      sendProgress(11, T, 'ข้ามการตั้งเวลา', 'done');
    }

    // ── 12/13: กดปุ่มยืนยัน ──
    sendProgress(12, T, isScheduled ? 'กดปุ่ม "ตั้งเวลา" (ยืนยัน)' : 'กดปุ่ม "โพสต์"');
    await submitPost(isScheduled);
    sendProgress(12, T, isScheduled ? 'กดปุ่ม "ตั้งเวลา" (ยืนยัน)' : 'กดปุ่ม "โพสต์"', 'done');

    // ── 13/13: เสร็จสิ้น ──
    sendProgress(13, T, '✅ โพสต์ TikTok สำเร็จ!', 'done');
    hudSuccess();

    log('=== Upload Flow Complete ===');
    return { success: true };

  } catch (err) {
    const msg = (err as Error).message || 'Unknown error';
    warn('Upload flow error: ' + msg);
    sendProgress(0, T, `❌ ล้มเหลว: ${msg}`, 'error');
    hudError(msg);
    return { success: false, error: msg };
  }
};

// ── Message Handler ──────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: (resp: any) => void) => {
  log('Message received: ' + message.type);

  if (message.type === 'PING_TIKTOK_UPLOADER') {
    // Verify page is truly ready — check for file input or upload button
    const hasFileInput = !!document.querySelector('input[type="file"]');
    const hasUploadBtn = !!findByText('เลือกวิดีโอ') || !!findByText('Select video') || !!findByText('เพิ่มวิดีโอ');
    const hasUploadArea = !!document.querySelector('[class*="upload"], [class*="Upload"]');
    const isReady = hasFileInput || hasUploadBtn || hasUploadArea;

    log(`PING check: fileInput=${hasFileInput}, uploadBtn=${hasUploadBtn}, uploadArea=${hasUploadArea} → ${isReady ? 'READY' : 'NOT_READY'}`);

    if (isReady) {
      sendResponse({ status: 'ready', url: window.location.href });
    } else {
      sendResponse({ status: 'loading', url: window.location.href });
    }
    return true;
  }

  if (message.type === 'UPLOAD_TO_TIKTOK') {
    const payload = message.payload as UploadPayload;

    // Run async upload flow
    runUploadFlow(payload).then((result) => {
      sendResponse(result);

      // Notify extension of result
      try {
        chrome.runtime.sendMessage({
          type: result.success ? 'TIKTOK_UPLOAD_COMPLETE' : 'TIKTOK_UPLOAD_ERROR',
          productId: payload.productId,
          error: result.error
        });
      } catch (e) {
        // Silent - extension might not be listening
      }
    });

    return true; // Keep channel open for async response
  }
});

log('Message listener registered. Ready for upload commands.');

} // end re-entry guard
