/**
 * TikTok Upload Service
 * Manages video upload automation to TikTok Studio
 */

import { TikTokProduct } from "./tiktokProductService";
import { loadTikTokPostingConfig } from "./tiktokPostingConfigService";

export interface TikTokUploadOptions {
  videoUrl: string;
  product: TikTokProduct;
  caption?: string;
  hashtags?: string[];
  scheduleTime?: string;
  postingMode?: 'immediate' | 'scheduled';
}

// Check if running as Chrome Extension
const isExtension = typeof chrome !== 'undefined' && chrome.tabs && chrome.runtime;

// TikTok Studio upload URL
const TIKTOK_UPLOAD_URL = 'https://www.tiktok.com/tiktokstudio/upload?from=creator_center';

/**
 * Open a FRESH TikTok Studio tab for uploading.
 * NEVER closes old tabs — chrome.tabs.remove() ALWAYS triggers "Leave site?" dialogs
 * which block user interaction. Old tabs are cleaned up AFTER upload succeeds.
 */
const openFreshTikTokTab = async (): Promise<chrome.tabs.Tab | null> => {
  console.log('[TikTok Upload] Opening fresh TikTok Studio tab (no old tab closing)');

  const newTab: chrome.tabs.Tab | null = await new Promise(r => {
    chrome.tabs.create({ url: TIKTOK_UPLOAD_URL, active: true }, tab => r(tab || null));
  });

  if (!newTab?.id) return null;

  console.log(`[TikTok Upload] New tab created: ${newTab.id}`);
  await waitForTabLoad(newTab.id, 30000);

  return newTab;
};

/**
 * Clean up old TikTok Studio tabs AFTER upload succeeds.
 * Called post-upload so any "Leave site?" dialog is non-disruptive.
 */
const cleanupOldTikTokTabs = (keepTabId: number) => {
  try {
    chrome.tabs.query({}, (allTabs) => {
      const oldTabs = allTabs.filter(t =>
        t.id && t.id !== keepTabId && (
          t.url?.includes('tiktok.com/tiktokstudio') ||
          t.url?.includes('tiktokstudio/upload') ||
          t.title?.includes('TikTok Studio')
        )
      );
      if (oldTabs.length > 0) {
        console.log(`[TikTok Upload] Post-upload cleanup: closing ${oldTabs.length} old tab(s)`);
        for (const t of oldTabs) {
          if (t.id) {
            // Suppress beforeunload then close
            chrome.scripting.executeScript({
              target: { tabId: t.id },
              func: () => {
                window.onbeforeunload = null;
                try { Object.defineProperty(window, 'onbeforeunload', { get: () => null, set: () => {}, configurable: true }); } catch(_){}
                window.addEventListener('beforeunload', (e) => { e.stopImmediatePropagation(); }, true);
              }
            }).catch(() => {}).finally(() => {
              try { chrome.tabs.remove(t.id!); } catch (_) {}
            });
          }
        }
      }
    });
  } catch (_) { /* silent */ }
};

/**
 * Wait for a tab to reach 'complete' load status
 */
const waitForTabLoad = (tabId: number, timeout = 30000): Promise<void> => {
  return new Promise((resolve) => {
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) { resolved = true; chrome.tabs.onUpdated.removeListener(listener); resolve(); }
    }, timeout);

    const listener = (id: number, info: { status?: string }) => {
      if (id === tabId && info.status === 'complete') {
        if (!resolved) {
          resolved = true;
          clearTimeout(timer);
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      }
    };

    // Check if already complete
    chrome.tabs.get(tabId, (tab) => {
      if (tab?.status === 'complete') {
        if (!resolved) { resolved = true; clearTimeout(timer); resolve(); }
      } else {
        chrome.tabs.onUpdated.addListener(listener);
      }
    });
  });
};

/**
 * Upload video to TikTok with product linking
 */
export const uploadToTikTok = async (options: TikTokUploadOptions): Promise<{ success: boolean; error?: string }> => {
  if (!isExtension) {
    return { success: false, error: 'Extension API not available' };
  }

  // Load posting config for schedule/caption/hashtag settings
  let postingConfig;
  try {
    postingConfig = await loadTikTokPostingConfig();
  } catch {
    postingConfig = null;
  }

  // Build caption and hashtags (try AI first, fallback to templates)
  let caption = options.caption || '';
  let hashtags = options.hashtags || [];
  if (!caption || hashtags.length === 0) {
    try {
      const aiResult = await generateCaptionWithAI(options.product, postingConfig);
      if (!caption) caption = aiResult.caption;
      if (hashtags.length === 0) hashtags = aiResult.hashtags;
    } catch {
      if (!caption) caption = generateCaption(options.product, postingConfig);
      if (hashtags.length === 0) hashtags = generateHashtags(options.product, postingConfig);
    }
  }

  // Determine schedule time
  let scheduleTime = options.scheduleTime;
  let postingMode = options.postingMode || 'scheduled';

  if (!scheduleTime && postingConfig) {
    if (postingConfig.postingMode === 'scheduled') {
      // Use configured schedule time
      const now = new Date();
      const target = new Date(now);
      target.setHours(postingConfig.scheduleHour, postingConfig.scheduleMinute, 0, 0);
      // If target is in the past, set to tomorrow
      if (target <= now) {
        target.setDate(target.getDate() + 1);
      }
      scheduleTime = target.toISOString();
      postingMode = 'scheduled';
    } else if (postingConfig.postingMode === 'immediate') {
      // Post now + 20 min (TikTok minimum schedule buffer)
      scheduleTime = new Date(Date.now() + 20 * 60 * 1000).toISOString();
      postingMode = 'scheduled';
    }
  }

  if (!scheduleTime) {
    // Default: schedule 20 minutes from now
    scheduleTime = new Date(Date.now() + 20 * 60 * 1000).toISOString();
    postingMode = 'scheduled';
  }

  return new Promise(async (resolve) => {
    // ══════════════════════════════════════════════════════════════
    // PHASE 1: Get video blob — check cache first, then try pre-fetch
    // Content script on Google Flow caches via CACHE_VIDEO_DATA (has auth cookies).
    // Background PRE_FETCH_VIDEO is fallback (only works for public URLs).
    // ══════════════════════════════════════════════════════════════
    console.log('[TikTok Upload] Phase 1: Checking cached video...');

    // Step 1A: Check if content script already cached the video
    const alreadyCached = await new Promise<boolean>((res) => {
      chrome.runtime.sendMessage({ type: 'PEEK_CACHED_VIDEO' }, (resp) => {
        if (chrome.runtime.lastError) { res(false); return; }
        console.log('[TikTok Upload] PEEK_CACHED_VIDEO:', resp);
        res(resp?.success === true);
      });
    });

    if (alreadyCached) {
      console.log('[TikTok Upload] ✓ Video already cached by content script');
    } else {
      // Step 1B: Fallback — try PRE_FETCH_VIDEO via background (for public URLs like Grok)
      console.log('[TikTok Upload] No cached video — trying PRE_FETCH_VIDEO...');
      const preFetchOk = await new Promise<boolean>((res) => {
        chrome.runtime.sendMessage(
          { type: 'PRE_FETCH_VIDEO', url: options.videoUrl },
          (resp) => {
            if (chrome.runtime.lastError) {
              console.warn('[TikTok Upload] Pre-fetch error:', chrome.runtime.lastError.message);
              res(false);
              return;
            }
            console.log('[TikTok Upload] Pre-fetch result:', resp);
            res(resp?.success === true);
          }
        );
      });

      if (!preFetchOk) {
        resolve({ success: false, error: 'ดาวน์โหลดวิดีโอล้มเหลว — ไม่สามารถ fetch video blob ได้' });
        return;
      }
    }
    console.log('[TikTok Upload] Video blob ready in service worker ✓');

    // ══════════════════════════════════════════════════════════════
    // PHASE 2: Close old tabs + open fresh TikTok Studio tab
    // ══════════════════════════════════════════════════════════════
    console.log('[TikTok Upload] Phase 2: Opening fresh TikTok Studio tab...');
    const tab = await openFreshTikTokTab();
    if (!tab?.id) {
      resolve({ success: false, error: 'เปิด TikTok Studio ไม่ได้' });
      return;
    }
    const tabId = tab.id;
    console.log('[TikTok Upload] Tab opened:', tabId);

    // ══════════════════════════════════════════════════════════════
    // PHASE 3: Wait for content script to be ready, then send command
    // ══════════════════════════════════════════════════════════════
    const checkAndSend = (attempts = 0) => {
      if (attempts > 90) {
        resolve({ success: false, error: 'TikTok Studio content script ไม่ตอบสนอง (timeout 90s)' });
        return;
      }

      if (attempts > 0 && attempts % 15 === 0) {
        console.log(`[TikTok Upload] Still waiting for content script... (${attempts}s)`);
      }

      chrome.tabs.sendMessage(tabId, { type: 'PING_TIKTOK_UPLOADER' }, (response) => {
        if (chrome.runtime.lastError) {
          // Content script not loaded yet — keep retrying
          setTimeout(() => checkAndSend(attempts + 1), 1000);
          return;
        }

        // Accept both 'ready' and 'loading' (if we get ANY response, script is alive)
        // After 30 attempts, accept 'loading' too — page might be slow but script is there
        const scriptAlive = response?.status === 'ready' || (attempts >= 30 && response?.status === 'loading');

        if (scriptAlive) {
          console.log(`[TikTok Upload] Content script ready (status=${response?.status}, attempt=${attempts})! Sending upload command...`);
          chrome.tabs.sendMessage(tabId, {
            type: 'UPLOAD_TO_TIKTOK',
            payload: {
              videoUrl: options.videoUrl,
              videoDataReady: true, // tells content script to use GET_CACHED_VIDEO
              productId: options.product.id,
              productName: options.product.name,
              caption,
              hashtags,
              scheduleTime,
              postingMode
            }
          }, (result) => {
            if (chrome.runtime.lastError) {
              resolve({ success: false, error: 'ส่งคำสั่งอัปโหลดไม่สำเร็จ: ' + chrome.runtime.lastError.message });
            } else if (result?.success) {
              // Clean up old TikTok tabs AFTER success (non-disruptive)
              cleanupOldTikTokTabs(tabId);
              resolve({ success: true });
            } else {
              resolve({ success: false, error: result?.error || 'Upload failed' });
            }
          });
        } else {
          setTimeout(() => checkAndSend(attempts + 1), 1000);
        }
      });
    };

    // Wait 8s for TikTok Studio to load (heavy SPA)
    setTimeout(() => checkAndSend(), 8000);
  });
};

/**
 * Generate caption + hashtags using OpenAI ChatGPT for viral TikTok content.
 * Falls back to templates if no API key available.
 */
const generateCaptionWithAI = async (
  product: TikTokProduct,
  config?: any
): Promise<{ caption: string; hashtags: string[] }> => {
  // Try OpenAI first
  try {
    const apiKey = await getOpenAIKey();
    if (apiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}` 
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `คุณเป็นคนเขียนแคปชัน TikTok มืออาชีพระดับ Top Creator ที่ทำคลิป Viral ได้ทุกครั้ง

กฎสำคัญ:
- แคปชันต้องสั้นกระชับ 1-2 ประโยค (ไม่เกิน 120 ตัวอักษร)
- ต้องชวนให้คนหยุดเลื่อน (scroll-stopping) — ใช้เทคนิค curiosity gap, ถามคำถาม, หรือพูดแบบช็อค
- ใส่ Emoji 2-4 ตัวที่เข้ากับเนื้อหา
- ภาษาต้องเป็นธรรมชาติ เหมือนคนพูดจริงๆ ไม่เป็นทางการ
- ห้ามขายตรง ให้เล่าเรื่อง/รีวิวแบบจริงใจ

รูปแบบแคปชันที่ Viral ได้:
- "ไม่คิดว่า [สินค้า] จะดีขนาดนี้..."
- "POV: คุณเพิ่งค้นพบ [สินค้า]"
- "ใช้มา X วัน ผลคือ..."
- "ถ้าไม่ลองคือพลาดมาก 😭"
- "ของดีต้องบอกต่อ ห้ามเก็บไว้คนเดียว"
- "Wait for it... 🤯"

แฮชแท็ก: เลือก 8-12 แท็กที่ trending ในไทย + แท็กสากล + แท็กเฉพาะสินค้า
- ต้องมี fyp, foryou, foryoupage, viral
- ต้องมีแท็กไทย: ของดีบอกต่อ, รีวิวจริง, TikTokMadeMeBuyIt
- เพิ่มแท็กที่เกี่ยวกับหมวดสินค้า

ตอบเป็น JSON เท่านั้น ห้ามมีข้อความอื่น`
            },
            {
              role: "user",
              content: `เขียนแคปชัน TikTok แบบ Viral สำหรับคลิปรีวิว/โปรโมทสินค้า "${product.name}"${product.price ? ` ราคา ${product.price}` : ''}
ตอบเป็น JSON:
{"caption": "แคปชันสั้นๆ ที่ทำให้คนหยุดดู", "hashtags": ["fyp", "foryou", "viral", "ของดีบอกต่อ", "รีวิวจริง", "TikTokMadeMeBuyIt", "แท็กเฉพาะสินค้า1", "แท็กเฉพาะสินค้า2"]}`
            }
          ],
          max_tokens: 400,
          temperature: 0.95
        })
      });

      const json = await response.json();
      if (!json.error) {
        const content = json.choices?.[0]?.message?.content || '';
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log("[TikTok] AI caption generated:", parsed);
          return {
            caption: parsed.caption || generateCaption(product, config),
            hashtags: parsed.hashtags || generateHashtags(product, config)
          };
        }
      }
    }
  } catch (e) {
    console.warn("[TikTok] AI caption generation failed:", e);
  }

  // Fallback to templates
  return {
    caption: generateCaption(product, config),
    hashtags: generateHashtags(product, config)
  };
};

/** Get OpenAI API key from storage */
const getOpenAIKey = async (): Promise<string | null> => {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    return new Promise((resolve) => {
      chrome.storage.local.get(['openai_api_key'], (result) => {
        resolve((result.openai_api_key as string) || null);
      });
    });
  }
  return localStorage.getItem('openai_api_key');
};

/**
 * Generate caption from product info (template fallback)
 */
const generateCaption = (product: TikTokProduct, config?: any): string => {
  if (config?.captionTemplate && config.captionTemplate.trim()) {
    let caption = config.captionTemplate;
    caption = caption.replace('{productName}', product.name);
    caption = caption.replace('{productId}', product.id);
    caption = caption.replace('{price}', product.price || '');
    return caption;
  }

  const templates = [
    `ไม่คิดว่า ${product.name} จะดีขนาดนี้... 😳🔥`,
    `POV: คุณเพิ่งค้นพบ ${product.name} แล้วชีวิตเปลี่ยน ✨`,
    `ใช้มา 3 วัน ผลคือ... ${product.name} ปังเกิน! 🤯`,
    `ถ้าไม่ลอง ${product.name} คือพลาดมากแม่!! �💕`,
    `ของดีห้ามเก็บไว้คนเดียว ${product.name} ต้องบอกต่อ 🛒✨`,
    `Wait for it... ${product.name} เปลี่ยนเกมเลย 🤩🔥`,
    `รีวิวจริงไม่จกตา ${product.name} ดีเกินราคา!! 💯`,
    `เพื่อนแนะนำ ${product.name} มา ตอนแรกไม่เชื่อ แต่... �`,
    `${product.name} ทำไมไม่บอกกันเร็วกว่านี้!! 🥺🔥`,
    `Unbox ${product.name} ของมันต้องมี!! 📦✨`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

/**
 * Generate hashtags from product info (template fallback)
 */
const generateHashtags = (product: TikTokProduct, config?: any): string[] => {
  if (config?.customHashtags && config.customHashtags.trim()) {
    const custom = config.customHashtags.split(/[,\s]+/).map((t: string) => t.replace(/^#/, '').trim()).filter((t: string) => t.length > 0);
    if (custom.length > 0) return custom;
  }

  // Viral base tags (Thai TikTok trending + universal)
  const viralTags = ['fyp', 'foryou', 'foryoupage', 'viral', 'ของดีบอกต่อ', 'รีวิวจริง', 'TikTokMadeMeBuyIt', 'รีวิว', 'สินค้าแนะนำ', 'ของดีต้องมี', 'ไม่ซื้อไม่ได้'];
  const productTags = product.name.split(' ').slice(0, 3).map(word => 
    word.replace(/[^a-zA-Z0-9\u0E00-\u0E7F]/g, '')
  ).filter(word => word.length > 2);
  
  // Add category-specific tags
  const lower = (product.name || '').toLowerCase();
  const categoryTags: string[] = [];
  if (/beauty|skincare|makeup|cream|serum|ครีม|เซรั่ม/i.test(lower)) categoryTags.push('skincaretiktok', 'beautytok', 'สกินแคร์');
  if (/fashion|clothing|เสื้อ|กางเกง|รองเท้า/i.test(lower)) categoryTags.push('fashiontiktok', 'ootd', 'แฟชั่น');
  if (/food|snack|drink|อาหาร|ขนม/i.test(lower)) categoryTags.push('foodtiktok', 'mukbang', 'อาหาร');
  if (/tech|phone|gadget|มือถือ|แก็ดเจ็ต/i.test(lower)) categoryTags.push('techtok', 'gadget', 'เทคโนโลยี');
  if (/fitness|gym|sport|ออกกำลัง/i.test(lower)) categoryTags.push('fitnesstok', 'gym', 'ออกกำลังกาย');
  if (/home|decor|บ้าน|ตกแต่ง/i.test(lower)) categoryTags.push('homedecor', 'hometok', 'ของแต่งบ้าน');
  
  const count = config?.hashtagCount || 10;
  return [...viralTags, ...productTags, ...categoryTags].slice(0, count);
};

// ── Post History ─────────────────────────────────────────────────

export interface TikTokPostHistoryItem {
  id: string;
  timestamp: number;
  productName: string;
  caption: string;
  hashtags: string[];
  scheduleTime: string;
  status: 'success' | 'failed';
  error?: string;
}

const HISTORY_KEY = 'netflow_tiktok_post_history';
const MAX_HISTORY = 50;

export const addPostHistory = async (item: Omit<TikTokPostHistoryItem, 'id' | 'timestamp'>): Promise<void> => {
  const entry: TikTokPostHistoryItem = {
    ...item,
    id: `post_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now()
  };

  if (!isExtension) {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list: TikTokPostHistoryItem[] = raw ? JSON.parse(raw) : [];
    list.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, MAX_HISTORY)));
    return;
  }

  return new Promise((resolve) => {
    chrome.storage.local.get([HISTORY_KEY], (result) => {
      const list: TikTokPostHistoryItem[] = (result[HISTORY_KEY] as TikTokPostHistoryItem[]) || [];
      list.unshift(entry);
      chrome.storage.local.set({ [HISTORY_KEY]: list.slice(0, MAX_HISTORY) }, () => resolve());
    });
  });
};

export const getPostHistory = async (): Promise<TikTokPostHistoryItem[]> => {
  if (!isExtension) {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  return new Promise((resolve) => {
    chrome.storage.local.get([HISTORY_KEY], (result) => {
      resolve((result[HISTORY_KEY] as TikTokPostHistoryItem[]) || []);
    });
  });
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
