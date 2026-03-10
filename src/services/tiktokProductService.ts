/**
 * TikTok Product Service
 * Manages synced products from TikTok Studio
 */

export interface TikTokProduct {
  id: string;
  name: string;
  imageUrl: string;
  price?: string;
  category?: string;
  syncedAt: number;
}

const STORAGE_KEY = 'netflow_tiktok_products';
const ACTIVE_PRODUCT_KEY = 'netflow_active_product_id';

// Check if running as Chrome Extension
const isExtension = typeof chrome !== 'undefined' && chrome.storage;

/**
 * Get all synced products
 */
export const getSyncedProducts = async (): Promise<TikTokProduct[]> => {
  if (!isExtension) {
    // Fallback to localStorage
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  return new Promise((resolve) => {
    chrome.storage.local.get([STORAGE_KEY], (result) => {
      resolve((result[STORAGE_KEY] as TikTokProduct[]) || []);
    });
  });
};

/**
 * Sync a new product
 */
export const syncProduct = async (product: TikTokProduct): Promise<void> => {
  const products = await getSyncedProducts();
  
  // Check if product already exists
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    // Update existing product
    products[existingIndex] = product;
  } else {
    // Add new product
    products.push(product);
  }

  if (!isExtension) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return;
  }

  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: products }, () => {
      console.log('[TikTokProductService] Product synced:', product.id);
      resolve();
    });
  });
};

/**
 * Delete a product
 */
export const deleteProduct = async (productId: string): Promise<void> => {
  const products = await getSyncedProducts();
  const filtered = products.filter(p => p.id !== productId);

  if (!isExtension) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return;
  }

  return new Promise((resolve) => {
    chrome.storage.local.set({ [STORAGE_KEY]: filtered }, () => {
      console.log('[TikTokProductService] Product deleted:', productId);
      resolve();
    });
  });
};

/**
 * Get a product by ID
 */
export const getProductById = async (productId: string): Promise<TikTokProduct | null> => {
  const products = await getSyncedProducts();
  return products.find(p => p.id === productId) || null;
};

/**
 * Set active product for next video
 */
export const setActiveProduct = async (productId: string | null): Promise<void> => {
  if (!isExtension) {
    if (productId) {
      localStorage.setItem(ACTIVE_PRODUCT_KEY, productId);
    } else {
      localStorage.removeItem(ACTIVE_PRODUCT_KEY);
    }
    return;
  }

  return new Promise((resolve) => {
    if (productId) {
      chrome.storage.local.set({ [ACTIVE_PRODUCT_KEY]: productId }, () => {
        console.log('[TikTokProductService] Active product set:', productId);
        resolve();
      });
    } else {
      chrome.storage.local.remove(ACTIVE_PRODUCT_KEY, () => {
        console.log('[TikTokProductService] Active product cleared');
        resolve();
      });
    }
  });
};

/**
 * Get active product
 */
export const getActiveProduct = async (): Promise<TikTokProduct | null> => {
  if (!isExtension) {
    const id = localStorage.getItem(ACTIVE_PRODUCT_KEY);
    if (!id) return null;
    return getProductById(id);
  }

  return new Promise((resolve) => {
    chrome.storage.local.get([ACTIVE_PRODUCT_KEY], async (result) => {
      const id = result[ACTIVE_PRODUCT_KEY] as string | undefined;
      if (!id) {
        resolve(null);
        return;
      }
      const product = await getProductById(id);
      resolve(product);
    });
  });
};

/**
 * Find a TikTok Studio tab from all open tabs
 */
const findTikTokTab = (): Promise<chrome.tabs.Tab | null> => {
  return new Promise((resolve) => {
    chrome.tabs.query({}, (allTabs) => {
      // Look for TikTok Studio tabs with priority order
      const tiktokTab = allTabs.find(t => 
        t.url?.includes('tiktok.com/tiktokstudio')
      ) || allTabs.find(t => 
        t.url?.includes('seller-th.tiktok.com')
      ) || allTabs.find(t => 
        t.url?.includes('seller.tiktok.com')
      ) || allTabs.find(t =>
        t.url?.includes('tiktok.com') && !t.url?.includes('tiktok.com/@')
      );
      resolve(tiktokTab || null);
    });
  });
};

/**
 * Try to inject content script into a tab if it's not already loaded
 */
const ensureContentScript = async (tabId: number): Promise<boolean> => {
  return new Promise((resolve) => {
    // First try to ping existing content script
    chrome.tabs.sendMessage(tabId, { type: 'PING_TIKTOK_SCRIPT' }, (response) => {
      if (!chrome.runtime.lastError && response?.status === 'ready') {
        resolve(true);
        return;
      }
      
      // Content script not loaded - try to inject it
      if (chrome.scripting) {
        chrome.scripting.executeScript({
          target: { tabId },
          files: ['src/content-tiktok.js']
        }, () => {
          if (chrome.runtime.lastError) {
            console.error('[TikTokProductService] Inject error:', chrome.runtime.lastError);
            resolve(false);
            return;
          }
          // Wait a moment for script to initialize
          setTimeout(() => resolve(true), 500);
        });
      } else {
        resolve(false);
      }
    });
  });
};

/**
 * Trigger product sync from TikTok Studio
 * Finds the TikTok tab, ensures content script is loaded, then scrapes products
 */
export const triggerProductSync = async (): Promise<{ success: boolean; product?: TikTokProduct; products?: TikTokProduct[]; count?: number; error?: string }> => {
  try {
    if (!chrome?.tabs) {
      return { success: false, error: 'Extension API not available. กรุณาเปิดใช้งานผ่าน Chrome Extension' };
    }

    // Step 1: Find TikTok tab
    const tab = await findTikTokTab();
    if (!tab || !tab.id) {
      return { success: false, error: 'ไม่พบแท็บ TikTok กรุณาเปิดหน้า Seller Center หรือ TikTok Studio ในแท็บอื่นก่อน แล้วกดซิงค์อีกครั้ง' };
    }

    console.log('[TikTokProductService] Found TikTok tab:', tab.url);

    // Step 2: Ensure content script is loaded
    const scriptReady = await ensureContentScript(tab.id);
    if (!scriptReady) {
      return { success: false, error: 'ไม่สามารถโหลด script ได้ กรุณา refresh หน้า TikTok แล้วลองใหม่' };
    }

    // Step 3: Send scrape request
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tab.id!, { type: 'SCRAPE_TIKTOK_PRODUCT' }, async (response) => {
        if (chrome.runtime.lastError) {
          console.error('[TikTokProductService] Scrape error:', chrome.runtime.lastError);
          resolve({ success: false, error: 'ไม่สามารถสื่อสารกับหน้า TikTok ได้ กรุณา refresh แล้วลองใหม่' });
          return;
        }

        if (!response?.success || !response.product) {
          resolve({ success: false, error: response?.error || 'ไม่พบข้อมูลสินค้า กรุณาตรวจสอบว่าหน้า Seller Center หรือ TikTok Studio มีรายการสินค้าแสดงอยู่' });
          return;
        }

        // Save all products
        const productsToSave: TikTokProduct[] = response.products || [response.product];
        for (const p of productsToSave) {
          await syncProduct(p);
        }

        // Set first product as active
        await setActiveProduct(response.product.id);

        resolve({
          success: true,
          product: response.product,
          products: productsToSave,
          count: productsToSave.length,
        });
      });
    });
  } catch (err) {
    console.error('[TikTokProductService] Sync error:', err);
    return { success: false, error: `เกิดข้อผิดพลาด: ${(err as Error).message}` };
  }
};

/**
 * Open TikTok Studio in new tab
 */
export const openTikTokStudio = (): void => {
  if (chrome?.tabs?.create) {
    chrome.tabs.create({ url: 'https://www.tiktok.com/tiktokstudio/upload?from=creator_center' });
  } else {
    window.open('https://www.tiktok.com/tiktokstudio/upload?from=creator_center', '_blank');
  }
};

/**
 * Open TikTok Seller Center product management page
 */
export const openSellerCenter = (): void => {
  const url = 'https://seller-th.tiktok.com/product/manage';
  if (chrome?.tabs?.create) {
    chrome.tabs.create({ url });
  } else {
    window.open(url, '_blank');
  }
};
