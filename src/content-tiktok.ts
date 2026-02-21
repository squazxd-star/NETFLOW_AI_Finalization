/**
 * TikTok Studio Content Script
 * Runs on tiktok.com/tiktokstudio/* and seller-th.tiktok.com/*
 * Scrapes product data from the "เพิ่มลิงก์สินค้า" product list page
 */

console.log('[NetFlow TikTok] Content script loaded on:', window.location.href);

interface TikTokProduct {
  id: string;
  name: string;
  imageUrl: string;
  price?: string;
  stock?: string;
  status?: string;
  syncedAt: number;
}

/**
 * Main scraping function - uses multiple strategies to find products
 * Strategy 1: Parse table rows (tr) looking for long numeric IDs
 * Strategy 2: Walk all text nodes looking for product-like patterns
 */
const scrapeAllProducts = (): TikTokProduct[] => {
  console.log('[NetFlow TikTok] Starting product scrape...');
  const products: TikTokProduct[] = [];
  const seenIds = new Set<string>();

  // ---- Strategy 1: Table rows ----
  const allRows = document.querySelectorAll('tr');
  console.log('[NetFlow TikTok] Strategy 1: Found', allRows.length, 'table rows');

  allRows.forEach((row) => {
    try {
      const text = row.textContent || '';
      // TikTok product IDs are 16-20 digit numbers
      const idMatches = text.match(/\b(\d{16,20})\b/g);
      if (!idMatches || idMatches.length === 0) return;

      const productId = idMatches[0];
      if (seenIds.has(productId)) return;

      // Get cells
      const cells = row.querySelectorAll('td');
      
      // Get product name - first cell usually has name + image
      let name = '';
      let imageUrl = '';

      if (cells.length > 0) {
        const firstCell = cells[0];
        const img = firstCell.querySelector('img');
        if (img) {
          imageUrl = img.src || img.getAttribute('data-src') || '';
        }
        const spans = firstCell.querySelectorAll('span, div, a, p');
        for (const span of spans) {
          const t = span.textContent?.trim() || '';
          if (t.length > 3 && !/^\d+$/.test(t) && !t.includes(productId)) {
            name = t;
            break;
          }
        }
        if (!name) {
          name = firstCell.textContent?.replace(productId, '').trim().split('\n')[0]?.trim() || '';
        }
      }

      // Get price from cells
      let price = '';
      let stock = '';
      let status = '';
      
      for (let i = 1; i < cells.length; i++) {
        const cellText = cells[i].textContent?.trim() || '';
        if (cellText.includes('฿') || cellText.match(/^\d[\d,.]+$/)) {
          if (!price) price = cellText;
          else if (!stock) stock = cellText;
        } else if (cellText.match(/^\d+$/)) {
          stock = cellText;
        } else if (cellText.length > 0 && cellText.length < 20) {
          status = cellText;
        }
      }

      if (productId && name) {
        seenIds.add(productId);
        products.push({
          id: productId,
          name: name.substring(0, 200),
          imageUrl,
          price: price || undefined,
          stock: stock || undefined,
          status: status || undefined,
          syncedAt: Date.now(),
        });
        console.log('[NetFlow TikTok] Found product:', productId, name.substring(0, 50));
      }
    } catch (e) {
      // Skip problematic rows
    }
  });

  // ---- Strategy 2: Generic DOM walk for non-table layouts ----
  if (products.length === 0) {
    console.log('[NetFlow TikTok] Strategy 2: Walking DOM for product patterns...');
    
    const allElements = document.querySelectorAll('*');
    const idElements: { el: Element; id: string }[] = [];
    
    allElements.forEach((el) => {
      const directText = Array.from(el.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent?.trim())
        .join('');
      
      const match = directText.match(/\b(\d{16,20})\b/);
      if (match && !seenIds.has(match[1])) {
        idElements.push({ el, id: match[1] });
      }
    });

    console.log('[NetFlow TikTok] Found', idElements.length, 'elements with product IDs');

    idElements.forEach(({ el, id }) => {
      if (seenIds.has(id)) return;
      
      let container = el.parentElement;
      for (let i = 0; i < 5 && container; i++) {
        const containerText = container.textContent || '';
        if (containerText.length > id.length + 10) break;
        container = container.parentElement;
      }

      if (!container) return;

      let name = '';
      const textNodes = container.querySelectorAll('span, div, a, p, h1, h2, h3, h4');
      for (const node of textNodes) {
        const t = node.textContent?.trim() || '';
        if (t.length > 5 && t.length < 200 && !/^\d+$/.test(t) && !t.includes(id)) {
          name = t;
          break;
        }
      }

      const img = container.querySelector('img');
      const imageUrl = img?.src || img?.getAttribute('data-src') || '';

      let price = '';
      const priceMatch = container.textContent?.match(/฿[\d,.]+/);
      if (priceMatch) price = priceMatch[0];

      if (id && name) {
        seenIds.add(id);
        products.push({
          id,
          name: name.substring(0, 200),
          imageUrl,
          price: price || undefined,
          syncedAt: Date.now(),
        });
        console.log('[NetFlow TikTok] Found product (strategy 2):', id, name.substring(0, 50));
      }
    });
  }

  console.log('[NetFlow TikTok] Total products found:', products.length);
  return products;
};

// Message handler
chrome.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: (resp: any) => void) => {
  console.log('[NetFlow TikTok] Received message:', message.type);

  if (message.type === 'SCRAPE_TIKTOK_PRODUCT') {
    setTimeout(() => {
      try {
        const products = scrapeAllProducts();
        
        if (products.length > 0) {
          sendResponse({
            success: true,
            product: products[0],
            products: products,
            count: products.length,
          });
        } else {
          const tables = document.querySelectorAll('table');
          const trs = document.querySelectorAll('tr');
          const imgs = document.querySelectorAll('img');
          sendResponse({
            success: false,
            error: `ไม่พบสินค้าในหน้านี้ (tables: ${tables.length}, rows: ${trs.length}, imgs: ${imgs.length}). กรุณาตรวจสอบว่าหน้า "เพิ่มลิงก์สินค้า" โหลดเสร็จแล้ว`,
            debug: {
              url: window.location.href,
              tables: tables.length,
              rows: trs.length,
              bodyLength: document.body?.textContent?.length || 0,
            }
          });
        }
      } catch (err) {
        sendResponse({
          success: false,
          error: `Scrape error: ${(err as Error).message}`,
        });
      }
    }, 1500);

    return true;
  }

  if (message.type === 'PING_TIKTOK_SCRIPT') {
    sendResponse({
      status: 'ready',
      url: window.location.href,
    });
    return true;
  }
});
