/**
 * Video Stock Service — IndexedDB storage for generated video clips
 * Stores video blobs + metadata for the "คลังวิดีโอ" feature
 */

const DB_NAME = 'netflow_video_stock';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

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

/** Save a video to stock, returns the generated ID */
export async function saveVideoToStock(
    item: Omit<VideoStockItem, 'id' | 'createdAt'>
): Promise<string> {
    const db = await openDB();
    const id = crypto.randomUUID();
    const record: VideoStockItem = {
        ...item,
        id,
        createdAt: Date.now(),
    };
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(record);
        tx.oncomplete = () => {
            console.log(`[VideoStock] Saved: ${id} (${(item.fileSize / 1024 / 1024).toFixed(1)} MB)`);
            resolve(id);
        };
        tx.onerror = () => reject(tx.error);
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
