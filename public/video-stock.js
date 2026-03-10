// ════════════════════════════════════════════════════════════════
// Netflow AI — Video Stock (คลังวิดีโอ)
// External JS file (required by Chrome extension CSP)
// ════════════════════════════════════════════════════════════════

// ── IndexedDB Access ──
const DB_NAME = 'netflow_video_stock';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

function openDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function getAllVideos() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).index('createdAt').getAll();
        req.onsuccess = () => resolve(req.result.reverse());
        req.onerror = () => reject(req.error);
    });
}

async function deleteVideo(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

async function updateVideoTitle(id, newTitle) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(id);
        req.onsuccess = () => {
            const video = req.result;
            if (video) {
                video.title = newTitle;
                store.put(video);
            }
        };
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// ── Thumbnail Generator ──
function generateThumbnail(videoBlob) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.muted = true;
        video.playsInline = true;
        const url = URL.createObjectURL(videoBlob);
        video.src = url;

        video.onloadeddata = () => {
            video.currentTime = Math.min(1, video.duration * 0.1);
        };
        video.onseeked = () => {
            try {
                const vw = video.videoWidth || 384;
                const vh = video.videoHeight || 216;
                const scale = Math.min(384 / vw, 384 / vh);
                const cw = Math.round(vw * scale);
                const ch = Math.round(vh * scale);
                const canvas = document.createElement('canvas');
                canvas.width = cw;
                canvas.height = ch;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, cw, ch);
                URL.revokeObjectURL(url);
                resolve(canvas.toDataURL('image/jpeg', 0.75));
            } catch (e) {
                URL.revokeObjectURL(url);
                resolve(null);
            }
        };
        video.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(null);
        };
        setTimeout(() => { URL.revokeObjectURL(url); resolve(null); }, 8000);
    });
}

// ── Helpers ──
function formatBytes(bytes) {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
    return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function formatDate(ts) {
    const d = new Date(ts);
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['\u0e21.\u0e04.','\u0e01.\u0e1e.','\u0e21\u0e35.\u0e04.','\u0e40\u0e21.\u0e22.','\u0e1e.\u0e04.','\u0e21\u0e34.\u0e22.','\u0e01.\u0e04.','\u0e2a.\u0e04.','\u0e01.\u0e22.','\u0e15.\u0e04.','\u0e1e.\u0e22.','\u0e18.\u0e04.'];
    const month = months[d.getMonth()];
    const year = d.getFullYear() + 543;
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return day + ' ' + month + ' ' + year + ' ' + h + ':' + m;
}

function formatDuration(sec) {
    if (!sec || sec <= 0) return '--:--';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + s.toString().padStart(2, '0');
}

function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}

// ── Render ──
let _videos = [];
let _deleteTargetId = null;
let _renameTargetId = null;
const _blobUrls = new Map();

async function loadAndRender() {
    const loadingEl = document.getElementById('loading');
    const emptyEl = document.getElementById('emptyState');
    const gridEl = document.getElementById('videoGrid');

    try {
        _videos = await Promise.race([
            getAllVideos(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('DB timeout')), 5000))
        ]);
    } catch (e) {
        console.error('Failed to load videos:', e);
        _videos = [];
    }

    loadingEl.style.display = 'none';

    if (_videos.length === 0) {
        emptyEl.style.display = 'flex';
        gridEl.style.display = 'none';
        document.getElementById('totalCount').textContent = '0';
        document.getElementById('totalSize').textContent = '0 MB';
        return;
    }

    emptyEl.style.display = 'none';
    gridEl.style.display = 'grid';

    const totalSize = _videos.reduce((sum, v) => sum + (v.fileSize || 0), 0);
    document.getElementById('totalCount').textContent = _videos.length;
    document.getElementById('totalSize').textContent = formatBytes(totalSize);

    gridEl.innerHTML = '';
    for (const video of _videos) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.dataset.id = video.id;

        const duration = video.duration || 0;
        const sourceName = (video.source || 'veo').toUpperCase();

        // Build card HTML without inline onclick (CSP compliance)
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'card-thumb';
        thumbDiv.dataset.id = video.id;
        thumbDiv.innerHTML =
            '<div style="width:100%;height:100%;background:#0a0a12;display:flex;align-items:center;justify-content:center;">' +
                '<div class="spinner" style="width:18px;height:18px;border-width:2px;"></div>' +
            '</div>' +
            '<div class="card-badge-row">' +
                '<span class="card-source">' + sourceName + '</span>' +
                '<span class="card-duration">' + formatDuration(duration) + '</span>' +
            '</div>' +
            '<div class="play-overlay">' +
                '<div class="play-btn">' +
                    '<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>' +
                '</div>' +
            '</div>';

        const bodyDiv = document.createElement('div');
        bodyDiv.className = 'card-body';

        // Info Wrapper
        const infoWrap = document.createElement('div');
        infoWrap.className = 'card-info-wrap';

        // Info
        const infoDiv = document.createElement('div');

        const titleRow = document.createElement('div');
        titleRow.className = 'card-title-row';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'card-title';
        titleDiv.title = video.title || 'Netflow AI Video';
        titleDiv.textContent = video.title || 'Netflow AI Video';

        const btnRename = document.createElement('button');
        btnRename.className = 'btn-rename';
        btnRename.title = '\u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e0a\u0e37\u0e48\u0e2d';
        btnRename.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>';
        btnRename.addEventListener('click', () => renameVideo(video.id));

        titleRow.appendChild(titleDiv);
        titleRow.appendChild(btnRename);

        const metaDiv = document.createElement('div');
        metaDiv.className = 'card-meta';
        metaDiv.innerHTML =
            '<span>' + formatDate(video.createdAt) + '</span>' +
            '<span class="dot"></span>' +
            '<span>' + formatBytes(video.fileSize) + '</span>';

        infoDiv.appendChild(titleRow);
        infoDiv.appendChild(metaDiv);
        
        infoWrap.appendChild(infoDiv);

        // Actions — all icon buttons
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions';

        const btnDl = document.createElement('button');
        btnDl.className = 'btn-icon btn-dl';
        btnDl.title = '\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14';
        btnDl.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>';
        btnDl.addEventListener('click', () => downloadVideo(video.id));

        const btnYT = document.createElement('button');
        btnYT.className = 'btn-icon btn-yt';
        btnYT.title = 'YouTube';
        btnYT.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.8 12l-6.25 3.57z"/></svg>';
        btnYT.addEventListener('click', () => uploadYouTube(video.id));

        const btnTT = document.createElement('button');
        btnTT.className = 'btn-icon btn-tt';
        btnTT.title = 'TikTok';
        btnTT.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.36a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.79z"/></svg>';
        btnTT.addEventListener('click', () => uploadTikTok(video.id));

        const btnDel = document.createElement('button');
        btnDel.className = 'btn-icon btn-del';
        btnDel.title = '\u0e25\u0e1a';
        btnDel.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';
        btnDel.addEventListener('click', () => confirmDeleteVideo(video.id));

        actionsDiv.appendChild(btnDl);
        actionsDiv.appendChild(btnYT);
        actionsDiv.appendChild(btnTT);
        actionsDiv.appendChild(btnDel);

        bodyDiv.appendChild(infoDiv);
        bodyDiv.appendChild(actionsDiv);

        card.appendChild(thumbDiv);
        card.appendChild(bodyDiv);
        gridEl.appendChild(card);

        generateThumbForCard(video, card);
    }
}

async function generateThumbForCard(video, card) {
    const thumbContainer = card.querySelector('.card-thumb');
    const durationEl = thumbContainer.querySelector('.card-duration');
    // The first child div is the loading spinner placeholder
    const spinnerDiv = thumbContainer.querySelector(':scope > div:first-child');

    if (!(video.videoBlob instanceof Blob)) {
        if (spinnerDiv) spinnerDiv.innerHTML = '<span style="color:#6b6b7a;font-size:11px;">No video data</span>';
        return;
    }

    const thumb = video.thumbnailDataUrl || await generateThumbnail(video.videoBlob);

    const blobUrl = URL.createObjectURL(video.videoBlob);
    _blobUrls.set(video.id, blobUrl);

    const tempVideo = document.createElement('video');
    tempVideo.src = blobUrl;
    tempVideo.onloadedmetadata = () => {
        if (tempVideo.duration && isFinite(tempVideo.duration) && durationEl) {
            durationEl.textContent = formatDuration(tempVideo.duration);
        }
    };

    if (thumb && spinnerDiv) {
        const img = document.createElement('img');
        img.src = thumb;
        img.alt = 'thumbnail';
        spinnerDiv.replaceWith(img);
    } else if (spinnerDiv) {
        const vid = document.createElement('video');
        vid.src = blobUrl;
        vid.muted = true;
        vid.style.pointerEvents = 'none';
        spinnerDiv.replaceWith(vid);
    }
}

// ── Actions ──
function playVideo(id) {
    const video = _videos.find(v => v.id === id);
    if (!video || !video.videoBlob) return;

    const modal = document.getElementById('playerModal');
    const modalVideo = document.getElementById('modalVideo');

    let url = _blobUrls.get(id);
    if (!url) {
        url = URL.createObjectURL(video.videoBlob);
        _blobUrls.set(id, url);
    }
    modalVideo.src = url;
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('playerModal');
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.pause();
    modalVideo.src = '';
    modal.classList.remove('active');
}

function downloadVideo(id) {
    const video = _videos.find(v => v.id === id);
    if (!video || !video.videoBlob) return;

    const url = URL.createObjectURL(video.videoBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (video.title || 'netflow-video') + '.mp4';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('\u2b07\ufe0f \u0e01\u0e33\u0e25\u0e31\u0e07\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14...');
}

// ── YouTube Popup State ──
let _ytTargetVideoId = null;
let _ytMadeForKids = false;
let _ytVisibility = 'public';
let _ytScheduleEnabled = false;

function uploadYouTube(id) {
    const video = _videos.find(v => v.id === id);
    if (!video || !video.videoBlob) return;

    _ytTargetVideoId = id;

    // Reset popup form
    document.getElementById('ytTitle').value = '';
    document.getElementById('ytDesc').value = '';
    document.getElementById('ytTitleCount').textContent = '0';
    _ytMadeForKids = false;
    _ytVisibility = 'public';
    _ytScheduleEnabled = false;

    // Reset toggle UI
    document.getElementById('ytKidsNo').classList.add('active');
    document.getElementById('ytKidsYes').classList.remove('active');
    document.querySelectorAll('.yt-vis-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.vis === 'public');
    });
    document.getElementById('ytScheduleToggle').textContent = '\u0e1b\u0e34\u0e14';
    document.getElementById('ytScheduleToggle').classList.remove('active');
    document.getElementById('ytScheduleFields').classList.remove('active');
    document.getElementById('ytScheduleDate').value = '';
    document.getElementById('ytScheduleTime').value = '';

    // Show popup
    document.getElementById('ytPopup').classList.add('active');
}

function closeYtPopup() {
    _ytTargetVideoId = null;
    document.getElementById('ytPopup').classList.remove('active');
}

function doYouTubeUpload() {
    if (!_ytTargetVideoId) return;
    const video = _videos.find(v => v.id === _ytTargetVideoId);
    if (!video || !video.videoBlob) return;

    const title = document.getElementById('ytTitle').value.trim() || 'Netflow AI Video';
    const description = document.getElementById('ytDesc').value.trim();
    const scheduleDate = _ytScheduleEnabled ? document.getElementById('ytScheduleDate').value.trim() : '';
    const scheduleTime = _ytScheduleEnabled ? document.getElementById('ytScheduleTime').value.trim() : '';

    const postBtn = document.getElementById('ytPost');
    postBtn.disabled = true;
    postBtn.innerHTML = '<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.2);border-top-color:var(--primary);border-radius:50%;animation:spin 0.7s linear infinite;"></span> \u0e01\u0e33\u0e25\u0e31\u0e07\u0e2a\u0e48\u0e07...';

    const reader = new FileReader();
    reader.onloadend = () => {
        chrome.runtime.sendMessage({ type: 'CACHE_VIDEO_DATA', data: reader.result }, () => {
            chrome.runtime.sendMessage({
                action: 'UPLOAD_YOUTUBE',
                title: title,
                description: description,
                madeForKids: _ytMadeForKids,
                visibility: _ytVisibility,
                scheduleEnabled: _ytScheduleEnabled,
                scheduleDate: scheduleDate,
                scheduleTime: scheduleTime,
            });
            showToast('\u25b6\ufe0f \u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e1b\u0e34\u0e14 YouTube Studio...');
            closeYtPopup();
            // Reset button
            postBtn.disabled = false;
            postBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.8 12l-6.25 3.57z"/></svg> \u0e42\u0e1e\u0e2a\u0e15\u0e4c YouTube \u0e2d\u0e31\u0e15\u0e42\u0e19\u0e21\u0e31\u0e15\u0e34';
        });
    };
    reader.readAsDataURL(video.videoBlob);
}

function uploadTikTok(id) {
    const video = _videos.find(v => v.id === id);
    if (!video || !video.videoBlob) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        chrome.runtime.sendMessage({ type: 'CACHE_VIDEO_DATA', data: reader.result }, () => {
            chrome.runtime.sendMessage({ action: 'UPLOAD_TIKTOK' });
            showToast('\ud83c\udfb5 \u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e1b\u0e34\u0e14 TikTok...');
        });
    };
    reader.readAsDataURL(video.videoBlob);
}

function confirmDeleteVideo(id) {
    _deleteTargetId = id;
    document.getElementById('confirmDialog').classList.add('active');
}

function renameVideo(id) {
    _renameTargetId = id;
    const video = _videos.find(v => v.id === id);
    const input = document.getElementById('renameInput');
    input.value = video ? (video.title || 'Netflow AI Video') : '';
    document.getElementById('renameDialog').classList.add('active');
    setTimeout(() => { input.focus(); input.select(); }, 100);
}

async function doRename() {
    if (!_renameTargetId) return;
    const newTitle = document.getElementById('renameInput').value.trim();
    if (!newTitle) return;
    try {
        await updateVideoTitle(_renameTargetId, newTitle);
        showToast('\u270f\ufe0f \u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e23\u0e35\u0e22\u0e1a\u0e23\u0e49\u0e2d\u0e22');
        loadAndRender();
    } catch (e) {
        showToast('\u274c \u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e0a\u0e37\u0e48\u0e2d\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08: ' + e.message);
    }
    _renameTargetId = null;
    document.getElementById('renameDialog').classList.remove('active');
}

async function doDelete() {
    if (!_deleteTargetId) return;
    try {
        await deleteVideo(_deleteTargetId);
        const url = _blobUrls.get(_deleteTargetId);
        if (url) { URL.revokeObjectURL(url); _blobUrls.delete(_deleteTargetId); }
        showToast('\ud83d\uddd1\ufe0f \u0e25\u0e1a\u0e27\u0e34\u0e14\u0e35\u0e42\u0e2d\u0e40\u0e23\u0e35\u0e22\u0e1a\u0e23\u0e49\u0e2d\u0e22');
        loadAndRender();
    } catch (e) {
        showToast('\u274c \u0e25\u0e1a\u0e44\u0e21\u0e48\u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08: ' + e.message);
    }
    _deleteTargetId = null;
    document.getElementById('confirmDialog').classList.remove('active');
}

// ── Event Listeners ──
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('playerModal')) closeModal();
});
document.getElementById('confirmCancel').addEventListener('click', () => {
    _deleteTargetId = null;
    document.getElementById('confirmDialog').classList.remove('active');
});
document.getElementById('confirmDelete').addEventListener('click', doDelete);

document.getElementById('renameCancel').addEventListener('click', () => {
    _renameTargetId = null;
    document.getElementById('renameDialog').classList.remove('active');
});
document.getElementById('renameConfirm').addEventListener('click', doRename);
document.getElementById('renameInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doRename();
});

document.getElementById('videoGrid').addEventListener('click', (e) => {
    const thumb = e.target.closest('.card-thumb');
    if (thumb && thumb.dataset.id) {
        playVideo(thumb.dataset.id);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        document.getElementById('confirmDialog').classList.remove('active');
        document.getElementById('renameDialog').classList.remove('active');
        closeYtPopup();
    }
});

// ── YouTube Popup Event Listeners ──
document.getElementById('ytCancel').addEventListener('click', closeYtPopup);
document.getElementById('ytPopup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('ytPopup')) closeYtPopup();
});
document.getElementById('ytPost').addEventListener('click', doYouTubeUpload);

// Title char count
document.getElementById('ytTitle').addEventListener('input', (e) => {
    document.getElementById('ytTitleCount').textContent = e.target.value.length;
});

// Made for Kids toggle
document.getElementById('ytKidsNo').addEventListener('click', () => {
    _ytMadeForKids = false;
    document.getElementById('ytKidsNo').classList.add('active');
    document.getElementById('ytKidsYes').classList.remove('active');
});
document.getElementById('ytKidsYes').addEventListener('click', () => {
    _ytMadeForKids = true;
    document.getElementById('ytKidsYes').classList.add('active');
    document.getElementById('ytKidsNo').classList.remove('active');
});

// Visibility buttons
document.querySelectorAll('.yt-vis-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        _ytVisibility = btn.dataset.vis;
        document.querySelectorAll('.yt-vis-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Schedule toggle
document.getElementById('ytScheduleToggle').addEventListener('click', () => {
    _ytScheduleEnabled = !_ytScheduleEnabled;
    const btn = document.getElementById('ytScheduleToggle');
    btn.textContent = _ytScheduleEnabled ? '\u0e40\u0e1b\u0e34\u0e14' : '\u0e1b\u0e34\u0e14';
    btn.classList.toggle('active', _ytScheduleEnabled);
    document.getElementById('ytScheduleFields').classList.toggle('active', _ytScheduleEnabled);
});

// AI Generate helpers (uses video productName from IndexedDB)
function ytAiGenerateTitle() {
    if (!_ytTargetVideoId) return;
    const video = _videos.find(v => v.id === _ytTargetVideoId);
    const productName = video?.productName || video?.title || 'Netflow AI Video';
    const btn = document.getElementById('ytAiTitle');
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;width:10px;height:10px;border:1.5px solid rgba(255,255,255,0.2);border-top-color:var(--primary);border-radius:50%;animation:spin 0.7s linear infinite;"></span> AI...';

    // Simple AI title generation via productName
    const titles = [
        productName + ' \u0e23\u0e35\u0e27\u0e34\u0e27\u0e08\u0e31\u0e14\u0e40\u0e15\u0e47\u0e21! #Shorts',
        '\u0e25\u0e2d\u0e07\u0e43\u0e0a\u0e49 ' + productName + ' \u0e14\u0e35\u0e21\u0e31\u0e49\u0e22? #Shorts',
        productName + ' \u0e15\u0e49\u0e2d\u0e07\u0e21\u0e35! \u0e2a\u0e34\u0e48\u0e07\u0e17\u0e35\u0e48\u0e04\u0e27\u0e23\u0e23\u0e39\u0e49 #Shorts',
        '\u0e17\u0e33\u0e44\u0e21\u0e15\u0e49\u0e2d\u0e07 ' + productName + '? \u0e14\u0e39\u0e08\u0e1a! #Shorts',
        productName + ' \u0e40\u0e1b\u0e25\u0e35\u0e48\u0e22\u0e19\u0e0a\u0e35\u0e27\u0e34\u0e15\u0e40\u0e25\u0e22! #Shorts',
    ];
    const title = titles[Math.floor(Math.random() * titles.length)];
    setTimeout(() => {
        document.getElementById('ytTitle').value = title.substring(0, 50);
        document.getElementById('ytTitleCount').textContent = Math.min(title.length, 50);
        btn.disabled = false;
        btn.innerHTML = '<span class="yt-sparkle">\u2728</span> AI \u0e04\u0e34\u0e14\u0e0a\u0e37\u0e48\u0e2d';
        showToast('\u2705 \u0e2a\u0e23\u0e49\u0e32\u0e07 Title \u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08');
    }, 600);
}

function ytAiGenerateDesc() {
    if (!_ytTargetVideoId) return;
    const video = _videos.find(v => v.id === _ytTargetVideoId);
    const productName = video?.productName || video?.title || 'Netflow AI Video';
    const btn = document.getElementById('ytAiDesc');
    btn.disabled = true;
    btn.innerHTML = '<span style="display:inline-block;width:10px;height:10px;border:1.5px solid rgba(255,255,255,0.2);border-top-color:var(--primary);border-radius:50%;animation:spin 0.7s linear infinite;"></span> AI...';

    const descs = [
        '\u0e23\u0e35\u0e27\u0e34\u0e27 ' + productName + ' \u0e41\u0e1a\u0e1a\u0e08\u0e31\u0e14\u0e40\u0e15\u0e47\u0e21! \u0e14\u0e35\u0e08\u0e23\u0e34\u0e07\u0e2b\u0e23\u0e37\u0e2d\u0e41\u0e04\u0e48\u0e42\u0e06\u0e29\u0e13\u0e32? \u0e21\u0e32\u0e14\u0e39\u0e01\u0e31\u0e19\u0e40\u0e25\u0e22!\n\n#' + productName.replace(/\s+/g, '') + ' #\u0e23\u0e35\u0e27\u0e34\u0e27 #\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32\u0e14\u0e35 #Shorts #NetflowAI',
        '\u0e25\u0e2d\u0e07\u0e43\u0e0a\u0e49 ' + productName + ' \u0e41\u0e25\u0e49\u0e27\u0e0a\u0e2d\u0e1a\u0e21\u0e32\u0e01! \u0e04\u0e38\u0e49\u0e21\u0e04\u0e48\u0e32\u0e2a\u0e38\u0e14\u0e46\n\n#' + productName.replace(/\s+/g, '') + ' #\u0e23\u0e35\u0e27\u0e34\u0e27\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32 #\u0e41\u0e19\u0e30\u0e19\u0e33 #Shorts',
    ];
    const desc = descs[Math.floor(Math.random() * descs.length)];
    setTimeout(() => {
        document.getElementById('ytDesc').value = desc;
        btn.disabled = false;
        btn.innerHTML = '<span class="yt-sparkle">\u2728</span> AI \u0e40\u0e02\u0e35\u0e22\u0e19';
        showToast('\u2705 \u0e2a\u0e23\u0e49\u0e32\u0e07 Description \u0e2a\u0e33\u0e40\u0e23\u0e47\u0e08');
    }, 800);
}

function ytAiGenerateBoth() {
    const allBtn = document.getElementById('ytAiAll');
    allBtn.disabled = true;
    allBtn.innerHTML = '<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.2);border-top-color:var(--primary);border-radius:50%;animation:spin 0.7s linear infinite;"></span> AI \u0e01\u0e33\u0e25\u0e31\u0e07\u0e04\u0e34\u0e14...';
    ytAiGenerateTitle();
    setTimeout(() => {
        ytAiGenerateDesc();
        setTimeout(() => {
            allBtn.disabled = false;
            allBtn.innerHTML = '<span class="yt-sparkle">\u2728</span> AI \u0e2a\u0e23\u0e49\u0e32\u0e07 Title + Description';
        }, 900);
    }, 700);
}

document.getElementById('ytAiAll').addEventListener('click', ytAiGenerateBoth);
document.getElementById('ytAiTitle').addEventListener('click', ytAiGenerateTitle);
document.getElementById('ytAiDesc').addEventListener('click', ytAiGenerateDesc);

// ── Theme ──
const THEME_COLORS = {
    green:  { hex: '#00ff41', rgb: '0, 255, 65' },
    red:    { hex: '#dc2626', rgb: '220, 38, 38' },
    blue:   { hex: '#2b7de9', rgb: '43, 125, 233' },
    yellow: { hex: '#eab308', rgb: '234, 179, 8' },
    purple: { hex: '#8b5cf6', rgb: '139, 92, 246' },
};

if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['netflow_app_theme'], (result) => {
        const key = result.netflow_app_theme || 'green';
        const t = THEME_COLORS[key] || THEME_COLORS.green;
        document.documentElement.style.setProperty('--primary', t.hex);
        document.documentElement.style.setProperty('--primary-rgb', t.rgb);
    });
}

// ── Init ──
loadAndRender();
