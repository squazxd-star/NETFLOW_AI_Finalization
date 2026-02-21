/**
 * TikTok Studio Uploader Content Script
 * Automates video upload and product linking on TikTok Studio
 */

console.log('[TikTok Uploader] Content script loaded');

// Types
interface TikTokUploadPayload {
  videoUrl: string;
  productId: string;
  productName: string;
  caption?: string;
  hashtags?: string[];
}

// Helper: Delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Find element by text
const findElementByText = (text: string, tag = '*'): HTMLElement | null => {
  const elements = document.querySelectorAll(tag);
  for (const el of elements) {
    if (el.textContent?.includes(text)) {
      return el as HTMLElement;
    }
  }
  return null;
};

// Helper: Wait for element
const waitForElement = (selector: string, timeout = 10000): Promise<HTMLElement | null> => {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const check = () => {
      const el = document.querySelector(selector) as HTMLElement;
      if (el) {
        resolve(el);
        return;
      }
      
      if (Date.now() - startTime > timeout) {
        resolve(null);
        return;
      }
      
      setTimeout(check, 500);
    };
    
    check();
  });
};

// Step 1: Navigate to upload page
const navigateToUpload = async (): Promise<boolean> => {
  console.log('[TikTok Uploader] Navigating to upload page...');
  
  // Check if already on upload page
  if (window.location.href.includes('/upload')) {
    return true;
  }
  
  // Click upload button
  const uploadBtn = findElementByText('อัปโหลด') || 
                   findElementByText('Upload') ||
                   document.querySelector('[data-testid="upload-button"]') as HTMLElement;
  
  if (uploadBtn) {
    uploadBtn.click();
    await delay(2000);
    return window.location.href.includes('/upload');
  }
  
  // Direct navigation
  window.location.href = 'https://seller-th.tiktok.com/tiktokstudio/upload';
  return true;
};

// Step 2: Upload video file
const uploadVideo = async (videoUrl: string): Promise<boolean> => {
  console.log('[TikTok Uploader] Uploading video...');
  
  try {
    // Fetch video from URL
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const file = new File([blob], 'video.mp4', { type: 'video/mp4' });
    
    // Find file input
    const fileInput = await waitForElement('input[type="file"]', 10000);
    
    if (!fileInput) {
      console.error('[TikTok Uploader] File input not found');
      return false;
    }
    
    // Create DataTransfer
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    (fileInput as HTMLInputElement).files = dataTransfer.files;
    
    // Trigger change event
    const event = new Event('change', { bubbles: true });
    fileInput.dispatchEvent(event);
    
    console.log('[TikTok Uploader] Video file set');
    await delay(3000);
    
    return true;
  } catch (error) {
    console.error('[TikTok Uploader] Upload failed:', error);
    return false;
  }
};

// Step 3: Fill caption
const fillCaption = async (caption: string): Promise<boolean> => {
  console.log('[TikTok Uploader] Filling caption...');
  
  const captionInput = await waitForElement('textarea[placeholder*="คำอธิบาย"], textarea[placeholder*="caption"], [data-testid="caption-input"]', 5000);
  
  if (!captionInput) {
    console.warn('[TikTok Uploader] Caption input not found');
    return false;
  }
  
  (captionInput as HTMLTextAreaElement).value = caption;
  captionInput.dispatchEvent(new Event('input', { bubbles: true }));
  
  console.log('[TikTok Uploader] Caption filled');
  return true;
};

// Step 4: Add hashtags
const addHashtags = async (hashtags: string[]): Promise<boolean> => {
  console.log('[TikTok Uploader] Adding hashtags...');
  
  const captionInput = document.querySelector('textarea[placeholder*="คำอธิบาย"], textarea[placeholder*="caption"]') as HTMLTextAreaElement;
  
  if (!captionInput) {
    return false;
  }
  
  const hashtagText = hashtags.map(tag => `#${tag}`).join(' ');
  captionInput.value += ' ' + hashtagText;
  captionInput.dispatchEvent(new Event('input', { bubbles: true }));
  
  console.log('[TikTok Uploader] Hashtags added');
  return true;
};

// Step 5: Link product
const linkProduct = async (productId: string): Promise<boolean> => {
  console.log('[TikTok Uploader] Linking product:', productId);
  
  try {
    // Click "Link Product" or "เชื่อมโยงสินค้า" button
    const linkBtn = findElementByText('เชื่อมโยงสินค้า') || 
                     findElementByText('Link Product') ||
                     findElementByText('เพิ่มสินค้า') ||
                     document.querySelector('[data-testid="link-product-button"]') as HTMLElement;
    
    if (!linkBtn) {
      console.warn('[TikTok Uploader] Link product button not found');
      return false;
    }
    
    linkBtn.click();
    await delay(2000);
    
    // Search for product
    const searchInput = await waitForElement('input[placeholder*="ค้นหา"], input[placeholder*="search"]', 5000);
    
    if (searchInput) {
      (searchInput as HTMLInputElement).value = productId;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      await delay(1500);
    }
    
    // Select product from results
    const productItem = await waitForElement(`[data-product-id="${productId}"], .product-item, [class*="product"]`, 5000);
    
    if (productItem) {
      productItem.click();
      await delay(1000);
      
      // Click confirm
      const confirmBtn = findElementByText('ยืนยัน') || 
                        findElementByText('Confirm') ||
                        findElementByText('เพิ่ม') ||
                        findElementByText('Add');
      
      if (confirmBtn) {
        confirmBtn.click();
        console.log('[TikTok Uploader] Product linked successfully');
        await delay(1000);
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.error('[TikTok Uploader] Link product failed:', error);
    return false;
  }
};

// Step 6: Publish video
const publishVideo = async (): Promise<boolean> => {
  console.log('[TikTok Uploader] Publishing video...');
  
  const publishBtn = findElementByText('โพสต์') || 
                    findElementByText('Post') ||
                    findElementByText('เผยแพร่') ||
                    findElementByText('Publish') ||
                    document.querySelector('[data-testid="publish-button"]') as HTMLElement ||
                    document.querySelector('button[type="submit"]') as HTMLElement;
  
  if (!publishBtn) {
    console.error('[TikTok Uploader] Publish button not found');
    return false;
  }
  
  publishBtn.click();
  console.log('[TikTok Uploader] Video published!');
  return true;
};

// Main upload flow
const executeUpload = async (payload: TikTokUploadPayload): Promise<{ success: boolean; error?: string }> => {
  console.log('[TikTok Uploader] Starting upload flow:', payload);
  
  try {
    // Step 1: Navigate
    const navSuccess = await navigateToUpload();
    if (!navSuccess) {
      return { success: false, error: 'Failed to navigate to upload page' };
    }
    
    // Step 2: Upload video
    const uploadSuccess = await uploadVideo(payload.videoUrl);
    if (!uploadSuccess) {
      return { success: false, error: 'Failed to upload video' };
    }
    
    // Step 3: Fill caption
    if (payload.caption) {
      await fillCaption(payload.caption);
    }
    
    // Step 4: Add hashtags
    if (payload.hashtags && payload.hashtags.length > 0) {
      await addHashtags(payload.hashtags);
    }
    
    // Step 5: Link product
    if (payload.productId) {
      const linkSuccess = await linkProduct(payload.productId);
      if (!linkSuccess) {
        console.warn('[TikTok Uploader] Could not link product, continuing...');
      }
    }
    
    // Step 6: Publish
    const publishSuccess = await publishVideo();
    if (!publishSuccess) {
      return { success: false, error: 'Failed to publish video' };
    }
    
    return { success: true };
  } catch (error) {
    console.error('[TikTok Uploader] Upload flow failed:', error);
    return { success: false, error: String(error) };
  }
};

// Message handler
chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: (resp: any) => void) => {
  console.log('[TikTok Uploader] Received message:', message.type);
  
  if (message.type === 'UPLOAD_TO_TIKTOK') {
    executeUpload(message.payload).then((result) => {
      sendResponse(result);
    });
    return true;
  }
  
  if (message.type === 'PING_TIKTOK_UPLOADER') {
    sendResponse({ status: 'ready', url: window.location.href });
    return true;
  }
});

// Auto-detect if on upload page
if (window.location.href.includes('/upload')) {
  console.log('[TikTok Uploader] Upload page detected');
}
