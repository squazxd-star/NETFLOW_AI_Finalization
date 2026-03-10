/**
 * YouTube Upload Service
 * Handles storage, preferences, and triggering YouTube Shorts upload
 */

const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;

const STORAGE_KEY_ENABLED = 'netflow_auto_post_youtube';
const STORAGE_KEY_CONFIG = 'netflow_youtube_config';

export interface YouTubeUploadConfig {
    title: string;
    description: string;
    madeForKids: boolean;
    visibility: 'public' | 'unlisted' | 'private';
}

/**
 * Check if YouTube auto-post is enabled
 */
export const isYouTubeAutoPostEnabled = async (): Promise<boolean> => {
    if (!isExtension) {
        return localStorage.getItem(STORAGE_KEY_ENABLED) === 'true';
    }
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY_ENABLED], (result) => {
            resolve(result[STORAGE_KEY_ENABLED] === true);
        });
    });
};

/**
 * Set YouTube auto-post preference
 */
export const setYouTubeAutoPostEnabled = async (enabled: boolean): Promise<void> => {
    if (!isExtension) {
        localStorage.setItem(STORAGE_KEY_ENABLED, String(enabled));
        return;
    }
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY_ENABLED]: enabled }, () => {
            resolve();
        });
    });
};

/**
 * Save YouTube upload config to storage
 */
export const saveYouTubeConfig = async (config: YouTubeUploadConfig): Promise<void> => {
    if (!isExtension) {
        localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
        return;
    }
    return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY_CONFIG]: config }, () => {
            resolve();
        });
    });
};

/**
 * Get saved YouTube upload config
 */
export const getYouTubeConfig = async (): Promise<YouTubeUploadConfig | null> => {
    if (!isExtension) {
        const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
        return raw ? JSON.parse(raw) : null;
    }
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY_CONFIG], (result) => {
            resolve((result[STORAGE_KEY_CONFIG] as YouTubeUploadConfig) || null);
        });
    });
};

/**
 * Trigger YouTube Shorts upload via background script
 */
export const uploadToYouTube = async (params: {
    videoUrl: string;
    config: YouTubeUploadConfig;
}): Promise<{ success: boolean; error?: string }> => {
    if (!isExtension) {
        console.warn('[YouTube] Not running as extension');
        return { success: false, error: 'Not running as Chrome Extension' };
    }

    return new Promise((resolve) => {
        chrome.runtime.sendMessage({
            action: 'UPLOAD_YOUTUBE',
            videoUrl: params.videoUrl,
            title: params.config.title,
            description: params.config.description,
            madeForKids: params.config.madeForKids,
            visibility: params.config.visibility,
        }, (response) => {
            if (chrome.runtime.lastError) {
                resolve({ success: false, error: chrome.runtime.lastError.message });
            } else {
                resolve(response || { success: false, error: 'No response' });
            }
        });
    });
};
