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
                const canvas = document.createElement('canvas');
                canvas.width = 384;
                canvas.height = 216;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, 384, 216);
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

        // Info section
        const infoDiv = document.createElement('div');
        infoDiv.className = 'card-info';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'card-title';
        titleDiv.title = video.title || 'Netflow AI Video';
        titleDiv.textContent = video.title || 'Netflow AI Video';

        const metaDiv = document.createElement('div');
        metaDiv.className = 'card-meta';
        metaDiv.innerHTML =
            '<span>' + formatDate(video.createdAt) + '</span>' +
            '<span class="dot"></span>' +
            '<span>' + formatBytes(video.fileSize) + '</span>';

        infoDiv.appendChild(titleDiv);
        infoDiv.appendChild(metaDiv);

        // Actions section
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'card-actions';

        const btnDownload = document.createElement('button');
        btnDownload.className = 'btn-download';
        btnDownload.title = '\u0e14\u0e32\u0e27\u0e19\u0e4c\u0e42\u0e2b\u0e25\u0e14';
        btnDownload.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>\u0e42\u0e2b\u0e25\u0e14';
        btnDownload.addEventListener('click', () => downloadVideo(video.id));

        const iconGroup = document.createElement('div');
        iconGroup.className = 'btn-icon-group';

        const btnYT = document.createElement('button');
        btnYT.className = 'btn-icon btn-yt';
        btnYT.title = 'YouTube';
        btnYT.textContent = 'YT';
        btnYT.addEventListener('click', () => uploadYouTube(video.id));

        const btnTT = document.createElement('button');
        btnTT.className = 'btn-icon btn-tt';
        btnTT.title = 'TikTok';
        btnTT.textContent = 'TT';
        btnTT.addEventListener('click', () => uploadTikTok(video.id));

        const btnDel = document.createElement('button');
        btnDel.className = 'btn-icon btn-del';
        btnDel.title = '\u0e25\u0e1a';
        btnDel.innerHTML = '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
        btnDel.addEventListener('click', () => confirmDeleteVideo(video.id));

        iconGroup.appendChild(btnYT);
        iconGroup.appendChild(btnTT);
        iconGroup.appendChild(btnDel);

        actionsDiv.appendChild(btnDownload);
        actionsDiv.appendChild(iconGroup);

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

function uploadYouTube(id) {
    const video = _videos.find(v => v.id === id);
    if (!video || !video.videoBlob) return;

    const reader = new FileReader();
    reader.onloadend = () => {
        chrome.runtime.sendMessage({ type: 'CACHE_VIDEO_DATA', data: reader.result }, () => {
            chrome.runtime.sendMessage({
                action: 'UPLOAD_YOUTUBE',
                title: video.title || 'Netflow AI Video',
                description: video.productName ? '\u0e2a\u0e34\u0e19\u0e04\u0e49\u0e32: ' + video.productName : '',
                madeForKids: false,
                visibility: 'public',
            });
            showToast('\u25b6\ufe0f \u0e01\u0e33\u0e25\u0e31\u0e07\u0e40\u0e1b\u0e34\u0e14 YouTube Studio...');
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
    }
});

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
