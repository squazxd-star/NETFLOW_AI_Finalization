/**
 * TikTok Upload Service
 * Manages video upload automation to TikTok Studio
 */

import { TikTokProduct } from "./tiktokProductService";

export interface TikTokUploadOptions {
  videoUrl: string;
  product: TikTokProduct;
  caption?: string;
  hashtags?: string[];
  autoPublish?: boolean;
}

// Check if running as Chrome Extension
const isExtension = typeof chrome !== 'undefined' && chrome.tabs && chrome.runtime;

/**
 * Upload video to TikTok with product linking
 */
export const uploadToTikTok = async (options: TikTokUploadOptions): Promise<{ success: boolean; error?: string }> => {
  if (!isExtension) {
    return { success: false, error: 'Extension API not available' };
  }

  return new Promise((resolve) => {
    // Open TikTok Studio upload page in new tab
    chrome.tabs.create({ url: 'https://seller-th.tiktok.com/tiktokstudio/upload', active: true }, (tab) => {
      if (!tab.id) {
        resolve({ success: false, error: 'Failed to open TikTok Studio' });
        return;
      }

      // Wait for page to load then send upload message
      const checkAndSend = (attempts = 0) => {
        if (attempts > 20) {
          resolve({ success: false, error: 'TikTok Studio page did not load in time' });
          return;
        }

        chrome.tabs.sendMessage(tab.id!, { type: 'PING_TIKTOK_UPLOADER' }, (response) => {
          if (chrome.runtime.lastError) {
            // Page not ready yet, retry
            setTimeout(() => checkAndSend(attempts + 1), 500);
            return;
          }

          if (response?.status === 'ready') {
            // Send upload request
            chrome.tabs.sendMessage(tab.id!, {
              type: 'UPLOAD_TO_TIKTOK',
              payload: {
                videoUrl: options.videoUrl,
                productId: options.product.id,
                productName: options.product.name,
                caption: options.caption || generateCaption(options.product),
                hashtags: options.hashtags || generateHashtags(options.product)
              }
            }, (result) => {
              if (result?.success) {
                resolve({ success: true });
              } else {
                resolve({ success: false, error: result?.error || 'Upload failed' });
              }
            });
          } else {
            setTimeout(() => checkAndSend(attempts + 1), 500);
          }
        });
      };

      // Start checking after initial delay
      setTimeout(() => checkAndSend(), 3000);
    });
  });
};

/**
 * Generate caption from product info
 */
const generateCaption = (product: TikTokProduct): string => {
  const templates = [
    `${product.name} สินค้าดีบอกต่อ! 🛒✨`,
    `ใช้แล้วชอบ! ${product.name} แนะนำเลย 👍`,
    `ของดีต้องบอก! ${product.name} 🎉`,
    `${product.name} สินค้าเด็ดที่ห้ามพลาด! 🔥`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

/**
 * Generate hashtags from product info
 */
const generateHashtags = (product: TikTokProduct): string[] => {
  const baseTags = ['TikTokMadeMeBuyIt', 'ของดีบอกต่อ', 'รีวิว', 'สินค้าแนะนำ'];
  
  // Add product-specific tags
  const productTags = product.name.split(' ').slice(0, 3).map(word => 
    word.replace(/[^a-zA-Z0-9\u0E00-\u0E7F]/g, '')
  ).filter(word => word.length > 2);
  
  return [...baseTags, ...productTags].slice(0, 6);
};

/**
 * Check if auto-post is enabled for TikTok
 */
export const isTikTokAutoPostEnabled = async (): Promise<boolean> => {
  if (!isExtension) {
    return localStorage.getItem('netflow_auto_post_tiktok') === 'true';
  }

  return new Promise((resolve) => {
    chrome.storage.local.get(['netflow_auto_post_tiktok'], (result) => {
      resolve(result.netflow_auto_post_tiktok === true);
    });
  });
};

/**
 * Set auto-post preference
 */
export const setTikTokAutoPostEnabled = async (enabled: boolean): Promise<void> => {
  if (!isExtension) {
    localStorage.setItem('netflow_auto_post_tiktok', String(enabled));
    return;
  }

  return new Promise((resolve) => {
    chrome.storage.local.set({ netflow_auto_post_tiktok: enabled }, () => {
      resolve();
    });
  });
};
