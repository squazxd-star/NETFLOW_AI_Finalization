/**
 * TikTok Studio Content Script — Product Scraper
 * Runs on tiktok.com/tiktokstudio/* and seller-th.tiktok.com/*
 *
 * KEY DESIGN:
 *   1. Try modal first ("เพิ่มลิงก์สินค้า" dialog)
 *   2. If no modal → scrape directly from the product management page
 *   3. Find product rows by looking for 16-20 digit product IDs
 *   4. For each ID, walk up to the row container
 *   5. Extract name + image + price from that row
 *   6. Works on both modal and direct page layouts (table + div-based)
 */

console.log('[NetFlow TikTok] Content script loaded on:', window.location.href);

interface TikTokProduct {
  id: string;
  name: string;
  imageUrl: string;
  price?: string;
  syncedAt: number;
}

// ── Constants ────────────────────────────────────────────────────

const SKIP_NAMES = new Set([
  'ชื่อสินค้า', 'ID สินค้า', 'ราคา', 'คลังสินค้า', 'สถานะ', 'สต็อกสินค้า',
  'ค้นหาสินค้า', 'เพิ่มลิงก์สินค้า', 'นำเสนอสินค้า', 'เลือกสินค้า',
  'ยกเลิก', 'ถัดไป', 'เลือก', 'ดำเนินอยู่', 'ดำเนินมูล',
  'สินค้า', 'จำนวน', 'ทั้งหมด', 'หน้า', 'รายการ', 'ผลลัพธ์',
  'ค้นหา', 'เรียงตาม', 'ตัวกรอง', 'หมวดหมู่',
  'เพิ่มสินค้า', 'จัดการสินค้า', 'เชื่อมโยงสินค้า',
  'Product', 'Price', 'Stock', 'Status', 'Name', 'ID',
  'Action', 'Actions', 'Select', 'Cancel', 'Next', 'Previous',
  'นำเสนอสินค้า', 'ยกเลิก', 'ถัดไป',
  'Product ID', 'Product Name', 'product', 'Product name',
  'Manage products', 'จัดการ', 'ดูทั้งหมด', 'View all',
]);

// ── Step 0: Find the best scope to scrape ───────────────────────
// Priority: modal > table > page content area > document.body

const findScrapeScope = (): { scope: Element; isModal: boolean } => {
  // ── A: Try modal/dialog first ──
  const modals = Array.from(document.querySelectorAll(
    '[role="dialog"], [role="modal"], .modal, .dialog, [class*="modal"], [class*="Modal"], [class*="dialog"], [class*="Dialog"], [class*="drawer"], [class*="Drawer"], [class*="overlay"], [class*="Overlay"], [class*="popup"], [class*="Popup"]'
  ));
  for (const modal of modals) {
    const tc = modal.textContent || '';
    if (/\d{16,20}/.test(tc)) {
      console.log('[NetFlow TikTok] Scope: modal (role/class), tag:', modal.tagName, 'textLen:', tc.length);
      return { scope: modal, isModal: true };
    }
  }

  // ── B: Header text "เพิ่มลิงก์สินค้า" → walk up to wrapper ──
  const headers = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, span, div, p'));
  for (const el of headers) {
    const dt = getDirectText(el);
    if (dt.includes('เพิ่มลิงก์สินค้า') || dt.includes('นำเสนอสินค้า') || dt.includes('Showcase products')) {
      let wrapper: Element | null = el;
      for (let i = 0; i < 8 && wrapper; i++) {
        wrapper = wrapper.parentElement;
        if (!wrapper) break;
        const wt = wrapper.textContent || '';
        if (/\d{16,20}/.test(wt) && wt.length > 100 && wt.length < 15000) {
          if (wrapper.tagName !== 'BODY' && wrapper.tagName !== 'HTML') {
            console.log('[NetFlow TikTok] Scope: modal (header text), tag:', wrapper.tagName, 'textLen:', wt.length);
            return { scope: wrapper, isModal: true };
          }
        }
      }
    }
  }

  // ── C: <table> element with product IDs ──
  const tables = Array.from(document.querySelectorAll('table'));
  for (const table of tables) {
    const tc = table.textContent || '';
    if (/\d{16,20}/.test(tc)) {
      console.log('[NetFlow TikTok] Scope: <table>, textLen:', tc.length);
      return { scope: table, isModal: false };
    }
  }

  // ── D: Div-based product list (TikTok Seller Center uses divs, not tables) ──
  // Look for a container that has multiple 16-20 digit IDs (product list area)
  const bodyText = document.body.textContent || '';
  if (/\d{16,20}/.test(bodyText)) {
    // Try to find the tightest container that holds all product rows
    // Look for common TikTok Seller Center layout containers
    const containerSelectors = [
      '[class*="product-list"]', '[class*="ProductList"]', '[class*="product_list"]',
      '[class*="table-body"]', '[class*="TableBody"]', '[class*="table_body"]',
      '[class*="list-body"]', '[class*="ListBody"]',
      'main [class*="content"]', 'main [class*="Content"]',
      '[data-tt]', '[class*="arco-table"]', '[class*="index_productList"]',
      'main', '#app main', '#root main',
    ];
    for (const sel of containerSelectors) {
      try {
        const containers = Array.from(document.querySelectorAll(sel));
        for (const c of containers) {
          const ct = c.textContent || '';
          const idMatches = ct.match(/(?<!\d)\d{16,20}(?!\d)/g) || [];
          const uniqueIds = new Set(idMatches).size;
          if (uniqueIds >= 1) {
            console.log('[NetFlow TikTok] Scope: div-container "' + sel + '", IDs:', uniqueIds, 'textLen:', ct.length);
            return { scope: c, isModal: false };
          }
        }
      } catch { /* invalid selector */ }
    }

    // Last resort: use document.body
    console.log('[NetFlow TikTok] Scope: document.body (fallback)');
    return { scope: document.body, isModal: false };
  }

  console.log('[NetFlow TikTok] No product IDs found anywhere on page');
  return { scope: document.body, isModal: false };
};

// Get only the direct text of an element (not children's text)
const getDirectText = (el: Element): string => {
  let text = '';
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += (node.textContent || '');
    }
  }
  return text.trim();
};

// ── Step 1: Find product IDs inside the scoped container ────────

const findProductIds = (scope: Element): Array<{ pid: string; element: Element }> => {
  const results: Array<{ pid: string; element: Element }> = [];
  const seenIds = new Set<string>();

  // Find leaf elements whose trimmed text is exactly a 16-20 digit number
  const candidates = Array.from(scope.querySelectorAll('span, td, div, p, a, li, em, strong, b'));
  for (const el of candidates) {
    const text = (el.textContent || '').trim();
    if (!/^\d{16,20}$/.test(text)) continue;

    // Skip if a child also matches (prefer leaf)
    let childMatches = false;
    for (const child of Array.from(el.children)) {
      if (/^\d{16,20}$/.test((child.textContent || '').trim())) {
        childMatches = true;
        break;
      }
    }
    if (childMatches) continue;

    if (!seenIds.has(text)) {
      seenIds.add(text);
      results.push({ pid: text, element: el });
      console.log('[NetFlow TikTok] Found ID:', text, '| tag:', el.tagName);
    }
  }

  // Fallback: regex scan the container's textContent
  if (results.length === 0) {
    const fullText = scope.textContent || '';
    const matches = fullText.match(/(?<!\d)\d{16,20}(?!\d)/g) || [];
    const uniqueIds = Array.from(new Set(matches));

    for (const pid of uniqueIds) {
      if (seenIds.has(pid)) continue;

      // Find the smallest element in scope containing this ID
      let best: Element | null = null;
      let bestLen = Infinity;
      for (const el of Array.from(scope.querySelectorAll('*'))) {
        const tc = el.textContent || '';
        if (!tc.includes(pid)) continue;
        if (tc.length < bestLen) {
          bestLen = tc.length;
          best = el;
        }
      }
      if (best) {
        seenIds.add(pid);
        results.push({ pid, element: best });
        console.log('[NetFlow TikTok] Found ID (fallback):', pid);
      }
    }
  }

  console.log('[NetFlow TikTok] Total IDs in modal:', results.length);
  return results;
};

// ── Step 2: Find the product row from an ID element ─────────────

const findRow = (idEl: Element, pid: string): Element => {
  // Try to find <tr>
  let cur: Element | null = idEl;
  for (let i = 0; i < 20 && cur; i++) {
    if (cur.tagName === 'TR') return cur;
    cur = cur.parentElement;
  }

  // Walk up to find smallest container that looks like a product row
  cur = idEl;
  let bestRow: Element | null = null;
  for (let i = 0; i < 15 && cur; i++) {
    cur = cur.parentElement;
    if (!cur) break;

    const tc = cur.textContent || '';
    if (!tc.includes(pid)) continue;

    // Count how many distinct product IDs are in this container
    const idMatches = tc.match(/(?<!\d)\d{16,20}(?!\d)/g) || [];
    const uniqueCount = new Set(idMatches).size;

    // Stop if we hit a container with multiple products
    if (uniqueCount > 1) break;

    // Good row: contains our ID, text < 800 chars (relaxed for div-based layouts)
    if (tc.length < 800) {
      bestRow = cur;
      // Ideal: has img too
      if (cur.querySelector('img')) return cur;
    }
  }

  if (bestRow) return bestRow;

  // Fallback: go up 5 levels
  cur = idEl;
  for (let i = 0; i < 5 && cur?.parentElement; i++) {
    cur = cur.parentElement;
  }
  return cur || idEl;
};

// ── Step 3: Extract product image ───────────────────────────────

const extractImage = (row: Element): string => {
  // Check <img> tags
  for (const img of Array.from(row.querySelectorAll('img'))) {
    const src = img.src || img.getAttribute('data-src') || '';
    if (src.startsWith('http') && src.length > 30) {
      // Prefer TikTok CDN images
      if (src.includes('tiktokcdn') || src.includes('bytedance') || src.includes('byteimg') || src.includes('alicdn')) {
        return src;
      }
      // Accept any http image that's not an icon/logo
      if (!src.includes('icon') && !src.includes('logo') && !src.includes('avatar') && !src.includes('emoji')) {
        return src;
      }
    }
  }

  // Check background images
  for (const el of Array.from(row.querySelectorAll('[style*="background"]'))) {
    const m = ((el as HTMLElement).style.backgroundImage || '').match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
    if (m?.[1] && m[1].length > 30) return m[1];
  }

  // Check sibling rows for image (sometimes img is in separate cell)
  const parent = row.parentElement;
  if (parent) {
    const prevSib = row.previousElementSibling;
    if (prevSib) {
      for (const img of Array.from(prevSib.querySelectorAll('img'))) {
        const src = img.src || '';
        if (src.startsWith('http') && src.length > 30) return src;
      }
    }
  }

  return '';
};

// ── Step 4: Extract product name ────────────────────────────────
// The product name is the descriptive Thai text near the product image,
// NOT video titles, NOT IDs, NOT prices.

const isGoodName = (t: string, pid: string): boolean => {
  if (!t || t.length < 4 || t.length > 250) return false;
  if (/^\d+$/.test(t)) return false;           // pure number
  if (t.includes(pid)) return false;            // contains the ID
  if (/^฿/.test(t)) return false;               // price
  if (/^\d[\d,.]+$/.test(t)) return false;       // number-like
  if (SKIP_NAMES.has(t)) return false;           // table header
  if (/^(ดำเนินอยู่|หมดสต็อก|ระงับ|ถูกลบ|Draft|Active|Inactive|Suspended|Published)$/i.test(t)) return false;
  return true;
};

const extractName = (row: Element, pid: string): string => {
  // Strategy A: Find a <td> or cell-like div that contains an <img> — name is usually in that same cell
  const firstImg = row.querySelector('img');
  if (firstImg) {
    // Walk up from img to find the cell (td or small div)
    let cell: Element = firstImg;
    for (let i = 0; i < 5; i++) {
      const p = cell.parentElement;
      if (!p || p === row) break;
      cell = p;
    }

    // Get text from the cell containing the image
    const cellTexts: string[] = [];
    for (const el of Array.from(cell.querySelectorAll('span, a, p, div, strong, em, b'))) {
      const t = (el.textContent || '').trim();
      if (isGoodName(t, pid)) cellTexts.push(t);
    }
    // Pick longest — product names are descriptive
    if (cellTexts.length > 0) {
      cellTexts.sort((a, b) => b.length - a.length);
      return cellTexts[0];
    }
  }

  // Strategy B: Scan ALL text elements in the row, score them
  const candidates: Array<{ text: string; score: number }> = [];
  for (const el of Array.from(row.querySelectorAll('span, a, p, strong, em, b'))) {
    const t = (el.textContent || '').trim();
    if (!isGoodName(t, pid)) continue;

    let score = 0;
    const childCount = el.querySelectorAll('*').length;
    if (childCount === 0) score += 200;  // leaf element bonus
    score += Math.min(t.length, 80);     // longer = better
    if (/[\u0E00-\u0E7F]/.test(t)) score += 30; // Thai text bonus
    if (el.tagName === 'SPAN' || el.tagName === 'A') score += 40;

    candidates.push({ text: t, score });
  }

  if (candidates.length > 0) {
    // Deduplicate
    const seen = new Set<string>();
    const unique = candidates.filter(c => { if (seen.has(c.text)) return false; seen.add(c.text); return true; });
    unique.sort((a, b) => b.score - a.score);
    return unique[0].text;
  }

  return '';
};

// ── Main scrape function ────────────────────────────────────────

const scrapeAllProducts = (): TikTokProduct[] => {
  console.log('[NetFlow TikTok] === Starting scrape ===');
  console.log('[NetFlow TikTok] URL:', window.location.href);

  // Find the best scope — modal first, then page content
  const { scope, isModal } = findScrapeScope();
  console.log('[NetFlow TikTok] Scope type:', isModal ? 'MODAL' : 'PAGE', '| textLen:', (scope.textContent || '').length);

  // Find product IDs within the scope
  const idElements = findProductIds(scope);
  if (idElements.length === 0) {
    console.log('[NetFlow TikTok] No product IDs found in scope');
    return [];
  }

  const products: TikTokProduct[] = [];

  for (const { pid, element } of idElements) {
    console.log('[NetFlow TikTok] Processing:', pid);

    const row = findRow(element, pid);
    const imageUrl = extractImage(row);
    const name = extractName(row, pid);

    // Price
    const priceMatch = (row.textContent || '').match(/฿[\d,.]+/);
    const price = priceMatch ? priceMatch[0] : '';

    const finalName = name || 'สินค้า TikTok';

    console.log('[NetFlow TikTok]  → name:', finalName.substring(0, 60), '| img:', imageUrl ? 'YES' : 'NO', '| price:', price);

    products.push({
      id: pid,
      name: finalName.substring(0, 200),
      imageUrl,
      price: price || undefined,
      syncedAt: Date.now(),
    });
  }

  console.log('[NetFlow TikTok] === Total:', products.length, '===');
  return products;
};

// ── Message handler ─────────────────────────────────────────────

chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: (resp: any) => void) => {
  // Ignore messages meant for content-tiktok-upload.ts — don't interfere
  if (message.type === 'PING_TIKTOK_UPLOADER' || message.type === 'UPLOAD_TO_TIKTOK') {
    return false; // Let the upload content script handle these
  }

  console.log('[NetFlow TikTok] Message:', message.type);

  if (message.type === 'SCRAPE_TIKTOK_PRODUCT') {
    let attempt = 0;
    const maxAttempts = 4;

    const doScrape = () => {
      attempt++;
      console.log('[NetFlow TikTok] Attempt', attempt);
      try {
        const products = scrapeAllProducts();

        if (products.length > 0) {
          sendResponse({
            success: true,
            product: products[0],
            products,
            count: products.length,
          });
        } else if (attempt < maxAttempts) {
          setTimeout(doScrape, attempt * 1200);
        } else {
          sendResponse({
            success: false,
            error: 'ไม่พบสินค้า กรุณาเปิดหน้ารายการสินค้า (Product list) ใน TikTok Studio / Seller Center แล้วกดซิงค์อีกครั้ง',
          });
        }
      } catch (err) {
        sendResponse({ success: false, error: `Scrape error: ${(err as Error).message}` });
      }
    };

    setTimeout(doScrape, 800);
    return true;
  }

  if (message.type === 'PING_TIKTOK_SCRIPT') {
    sendResponse({ status: 'ready', url: window.location.href });
    return true;
  }
});

console.log('[NetFlow TikTok] Message listener registered');
