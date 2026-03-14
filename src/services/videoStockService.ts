/**
 * Video Stock Service — IndexedDB storage for generated video clips
 * Stores video blobs + metadata for the "คลังวิดีโอ" feature
 */

const DB_NAME = 'netflow_video_stock';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

// ── Compatibility helpers for older browsers (Mac 2016 / older Chrome) ──
function generateId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }
    // Fallback: manual UUID v4 generation (for Chrome < 92)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Simple mutex fallback when navigator.locks is unavailable (Chrome < 69)
let _saveMutex: Promise<void> = Promise.resolve();
async function withLock<T>(name: string, fn: () => Promise<T>): Promise<T> {
    if (typeof navigator !== 'undefined' && navigator.locks && typeof navigator.locks.request === 'function') {
        return navigator.locks.request(name, fn);
    }
    // Fallback: sequential execution via promise chain
    const prev = _saveMutex;
    let resolve: () => void;
    _saveMutex = new Promise<void>((r) => { resolve = r; });
    await prev;
    try {
        return await fn();
    } finally {
        resolve!();
    }
}

export interface VideoStockItem {
    id: string;
    title: string;
    videoBlob: Blob;
    thumbnailDataUrl?: string;
    createdAt: number;
    duration: number;       // seconds (0 = unknown)
    fileSize: number;       // bytes
    source: string;         // 'veo' | 'grok' | 'manual'
    productName?: string;
    mimeType: string;
}

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
                store.createIndex('createdAt', 'createdAt', { unique: false });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Save a video to stock, returns the generated ID. Includes deduplication based on exact file size within the last 2 minutes. */
export async function saveVideoToStock(
    item: Omit<VideoStockItem, 'id' | 'createdAt'>
): Promise<string> {
    // Synchronous cross-tab deduplication using localStorage
    // This is bulletproof against multiple React hook instances firing simultaneously
    const dedupKey = `netflow_saved_size_${item.fileSize}`;
    const lastSaved = localStorage.getItem(dedupKey);
    const now = Date.now();
    
    if (lastSaved && (now - parseInt(lastSaved, 10)) < 2 * 60 * 1000) {
        console.log(`[VideoStock] ⚠️ Duplicate video detected via localStorage (same size: ${(item.fileSize / 1024 / 1024).toFixed(2)}MB). Skipping.`);
        return "duplicate_skipped";
    }
    
    // Mark as saved immediately to block other concurrent tabs
    localStorage.setItem(dedupKey, now.toString());

    // Use Web Locks API to prevent concurrent saves across multiple extension contexts (side panel, popup, etc.)
    return withLock('video_stock_save_lock', async () => {
        const db = await openDB();
        
        // Deduplication check fallback: DB check
        const recentVideos = await new Promise<VideoStockItem[]>((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const request = tx.objectStore(STORE_NAME).index('createdAt').getAll();
            request.onsuccess = () => {
                const all = request.result as VideoStockItem[];
                // Only check videos saved in the last 2 minutes
                const twoMinsAgo = Date.now() - (2 * 60 * 1000);
                resolve(all.filter(v => v.createdAt > twoMinsAgo));
            };
            request.onerror = () => reject(request.error);
        });

        const isDuplicate = recentVideos.some(v => v.fileSize === item.fileSize);
        if (isDuplicate) {
            console.log(`[VideoStock] ⚠️ Duplicate video detected in DB (same size: ${(item.fileSize / 1024 / 1024).toFixed(2)}MB). Skipping.`);
            return "duplicate_skipped";
        }

        const id = generateId();
        const record: VideoStockItem = {
            ...item,
            id,
            createdAt: Date.now(),
        };
        return new Promise<string>((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readwrite');
            const store = tx.objectStore(STORE_NAME);
            store.put(record);
            tx.oncomplete = () => {
                console.log(`[VideoStock] Saved: ${id} (${(item.fileSize / 1024 / 1024).toFixed(1)} MB)`);
                resolve(id);
            };
            tx.onerror = () => reject(tx.error);
        });
    });
}

/** Get all videos, newest first */
export async function getAllVideos(): Promise<VideoStockItem[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).index('createdAt').getAll();
        request.onsuccess = () => resolve((request.result as VideoStockItem[]).reverse());
        request.onerror = () => reject(request.error);
    });
}

/** Get a single video by ID */
export async function getVideoById(id: string): Promise<VideoStockItem | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Delete a video from stock */
export async function deleteVideoFromStock(id: string): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(id);
        tx.oncomplete = () => {
            console.log(`[VideoStock] Deleted: ${id}`);
            resolve();
        };
        tx.onerror = () => reject(tx.error);
    });
}

/** Get total count of videos */
export async function getStockCount(): Promise<number> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/** Convert data URL to Blob */
export function dataUrlToBlob(dataUrl: string): Blob {
    const [header, b64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)?.[1] || 'video/mp4';
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
}
