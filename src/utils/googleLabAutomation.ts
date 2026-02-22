/**
 * Google Lab Automation Service - HYBRID REMOTE
 * Capabilities: Smart State Detection + Keyboard/Pointer Fallbacks + Remote Config
 */

import { RemoteConfigService, AutomationSelectors } from './remoteConfig';

// --- Utilities ---
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper: Recursive Shadow DOM Search
const findAllElementsDeep = (selector: string = '*', root: Document | ShadowRoot | Element = document): Element[] => {
    let elements: Element[] = [];

    try {
        // Safety: check if root is valid and connected (if it's an element)
        if (root !== document && 'isConnected' in root && !(root as Element).isConnected) {
            return [];
        }

        // 1. Get elements in current root
        try {
            const nodes = (root as ParentNode).querySelectorAll(selector);
            elements.push(...Array.from(nodes));
        } catch (e) { }

        // 2. Traverse Shadow Roots
        const walker = document.createTreeWalker(
            root === document ? document.body : (root as Node),
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: (node) => (node as Element).shadowRoot ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        );

        while (walker.nextNode()) {
            const currentNode = walker.currentNode as Element;
            const shadowRoot = currentNode.shadowRoot;
            if (shadowRoot) {
                elements.push(...findAllElementsDeep(selector, shadowRoot));
            }
        }
    } catch (e) {
        console.warn('⚠️ Error in findAllElementsDeep:', e);
    }

    return elements;
};

// Helper: Auto-handle ANY "Switch to Veo 3.1 - ..." banner (Fast↔Quality)
// Uses exact element: <button data-radix-toast-announce-exclude class="sc-1e64bb07-3 etsAIJ">Switch to Veo 3.1 - Fast/Quality</button>
const autoHandleVeoSwitchBanner = async (): Promise<boolean> => {
    console.log("🔍 Checking for Veo version switch banner...");
    await delay(2000);

    for (let attempt = 1; attempt <= 3; attempt++) {
        // Method 1: Exact selector from user's element
        const exactBtns = findAllElementsDeep('button[data-radix-toast-announce-exclude]');
        for (const btn of exactBtns) {
            const text = (btn.textContent || '').trim();
            if (text.includes('Switch to Veo') || text.includes('เปลี่ยนเป็น Veo')) {
                console.log(`✅ Found Veo switch button (exact selector): "${text}"`);
                (btn as HTMLElement).click();
                (btn as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                console.log("✅ Veo version switched!");
                await delay(3000);
                return true;
            }
        }

        // Method 2: Class selector fallback
        const classBtns = findAllElementsDeep('button.etsAIJ, button[class*="sc-1e64bb07"]');
        for (const btn of classBtns) {
            const text = (btn.textContent || '').trim();
            if (text.includes('Switch to Veo') || text.includes('เปลี่ยนเป็น Veo')) {
                console.log(`✅ Found Veo switch button (class selector): "${text}"`);
                (btn as HTMLElement).click();
                (btn as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                console.log("✅ Veo version switched!");
                await delay(3000);
                return true;
            }
        }

        // Method 3: Text-based search (broadest fallback)
        const allElements = findAllElementsDeep('button, a, span');
        for (const el of allElements) {
            const text = (el.textContent || '').trim();
            const rect = (el as HTMLElement).getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            if (text.includes('Switch to Veo') || text.includes('เปลี่ยนเป็น Veo')) {
                console.log(`✅ Found Veo switch link (text match): "${text.substring(0, 60)}"`);
                (el as HTMLElement).click();
                (el as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                console.log("✅ Veo version switched!");
                await delay(3000);
                return true;
            }
        }

        await delay(1500);
    }

    console.log("  ℹ️ No Veo switch banner found (OK)");
    return false;
};

const detectGenerationMode = (): 'video' | 'image' | 'unknown' => {
    const videoTriggers = [
        'frames to video',
        'เฟรมเป็นวิดีโอ',
        'jump to',
        'extend'
    ];
    const imageTriggers = [
        'create image',
        'สร้างรูปภาพ',
        'สร้างภาพ',
        'generate an image'
    ];

    let hasVideo = false;
    let hasImage = false;

    const modeButtons = findAllElementsDeep('button[role="combobox"], button');
    for (const btn of modeButtons) {
        const el = btn as HTMLElement;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const text = (el.textContent || '').trim().toLowerCase();
        if (!text || text.length > 120) continue;

        if (videoTriggers.some((t) => text.includes(t))) hasVideo = true;
        if (imageTriggers.some((t) => text.includes(t))) hasImage = true;
    }

    if (hasVideo) return 'video';
    if (hasImage) return 'image';
    return 'unknown';
};

const hasUsableImageSrc = (el: HTMLElement): boolean => {
    const src = (el.getAttribute('src') || '').trim();
    if (!src || src === '#' || src === 'about:blank') return false;
    if (src.startsWith('data:') && src.length < 200) return false;

    if (el.tagName === 'IMG') {
        const img = el as HTMLImageElement;
        if (typeof img.naturalWidth === 'number' && img.naturalWidth <= 1) return false;
        if (typeof img.naturalHeight === 'number' && img.naturalHeight <= 1) return false;
    }
    return true;
};

const findPrimaryPreviewRect = (): DOMRect | null => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const media = findAllElementsDeep('video, img, canvas') as HTMLElement[];

    let bestRect: DOMRect | null = null;
    let bestArea = 0;

    for (const el of media) {
        if (el.offsetParent === null) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 280 || rect.height < 150) continue;
        if (rect.top > vh * 0.85 || rect.left > vw * 0.92) continue;

        const area = rect.width * rect.height;
        if (area > bestArea) {
            bestArea = area;
            bestRect = rect;
        }
    }

    return bestRect;
};

const getSceneBuilderReferenceRailBounds = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const previewRect = findPrimaryPreviewRect();

    const minTop = previewRect
        ? Math.max(120, previewRect.top + Math.min(180, previewRect.height * 0.28))
        : Math.max(120, vh * 0.28);
    const maxTop = previewRect
        ? Math.min(vh * 0.90, previewRect.bottom - 8)
        : vh * 0.86;

    const minLeft = previewRect
        ? Math.max(vw * 0.58, previewRect.right - 72)
        : vw * 0.62;
    const maxLeft = previewRect
        ? Math.min(vw - 8, previewRect.right + 220)
        : vw - 8;

    return { vw, vh, previewRect, minTop, maxTop, minLeft, maxLeft };
};

const robustElementClick = async (el: HTMLElement): Promise<void> => {
    const rect = el.getBoundingClientRect();
    const clickOpts = {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
    };

    // Use mouse events for generic UI clicks.
    // Synthetic PointerEvents can trigger setPointerCapture errors in Google Labs.
    el.dispatchEvent(new MouseEvent('mousedown', clickOpts));
    await delay(40);
    el.dispatchEvent(new MouseEvent('mouseup', clickOpts));
    el.dispatchEvent(new MouseEvent('click', clickOpts));
    el.click();
};

const normalizeVideoReferenceChips = async (promptInput: HTMLElement, keepCount: number = 1, force: boolean = false): Promise<void> => {
    const mode = detectGenerationMode();
    if (mode !== 'video' && !force) return;

    const promptRect = promptInput.getBoundingClientRect();
    const isNearPrompt = (rect: DOMRect) => {
        const nearY = rect.bottom >= promptRect.top - 180 && rect.top <= promptRect.bottom + 180;
        const nearX = rect.left >= promptRect.left - 360 && rect.right <= promptRect.right + 120;
        return nearY && nearX;
    };

    const getChipImages = (): HTMLElement[] => {
        return findAllElementsDeep('img').filter((img) => {
            const el = img as HTMLElement;
            const rect = el.getBoundingClientRect();
            if (rect.width < 18 || rect.width > 120 || rect.height < 18 || rect.height > 120) return false;
            if (el.offsetParent === null) return false;
            return isNearPrompt(rect);
        }) as HTMLElement[];
    };

    for (let pass = 1; pass <= 3; pass++) {
        const chipImages = getChipImages();
        if (chipImages.length <= keepCount) {
            if (pass === 1) return;
            console.log(`✅ Reference chip cleanup complete on pass ${pass - 1}. Remaining=${chipImages.length}`);
            return;
        }

        console.log(`🧹 [Pass ${pass}] Found ${chipImages.length} reference chips near prompt, keeping ${keepCount}...`);

        // Hover chips to reveal close buttons if hidden until hover.
        for (const chip of chipImages) {
            const rect = chip.getBoundingClientRect();
            const hoverOpts = {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: rect.left + rect.width / 2,
                clientY: rect.top + rect.height / 2
            };
            chip.dispatchEvent(new MouseEvent('mouseenter', hoverOpts));
            chip.dispatchEvent(new MouseEvent('mouseover', hoverOpts));
        }
        await delay(250);

        const sortedImages = [...chipImages].sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        const toRemove = sortedImages.slice(0, Math.max(0, sortedImages.length - keepCount)); // Keep right-most/latest chips

        const closeButtons = findAllElementsDeep('button, [role="button"]').filter((btn) => {
            const el = btn as HTMLElement;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return false;
            if (rect.width > 56 || rect.height > 56) return false;
            if (!isNearPrompt(rect)) return false;

            const iconText = (el.querySelector('i, .material-icons, .google-symbols')?.textContent || '').trim().toLowerCase();
            const text = (el.textContent || '').trim().toLowerCase();
            const ariaLabel = (el.getAttribute('aria-label') || '').trim().toLowerCase();
            const title = (el.getAttribute('title') || '').trim().toLowerCase();
            const combined = `${text} ${ariaLabel} ${title}`.trim();

            const isAddControl = iconText === 'add' || combined === '+' || combined === 'add';
            const isCloseIcon = iconText === 'close' || iconText === 'cancel' || iconText === 'clear';
            const isCloseText =
                combined === 'x' ||
                combined === '×' ||
                combined.includes('close') ||
                combined.includes('remove') ||
                combined.includes('delete') ||
                combined.includes('cancel') ||
                combined.includes('ลบ') ||
                combined.includes('ปิด');

            return !isAddControl && (isCloseIcon || isCloseText);
        }) as HTMLElement[];

        let removed = 0;
        const remainingCloseBtns = [...closeButtons];

        if (closeButtons.length === 0) {
            console.warn('⚠️ Duplicate chips found but no close buttons detected; using chip-select + Backspace fallback');
        }

        for (const chip of toRemove) {
            const chipRect = chip.getBoundingClientRect();
            const chipCx = chipRect.left + chipRect.width / 2;
            const chipCy = chipRect.top + chipRect.height / 2;

            let bestBtn: HTMLElement | null = null;
            let bestDist = Infinity;

            for (const btn of remainingCloseBtns) {
                const r = btn.getBoundingClientRect();
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                const dist = Math.hypot(cx - chipCx, cy - chipCy);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestBtn = btn;
                }
            }

            if (bestBtn && bestDist < 160) {
                await robustElementClick(bestBtn);
                removed++;
                await delay(300);
                const idx = remainingCloseBtns.indexOf(bestBtn);
                if (idx >= 0) remainingCloseBtns.splice(idx, 1);
            } else {
                // Fallback: select chip then Backspace/Delete (some UIs hide close controls)
                await robustElementClick(chip);
                await delay(120);
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', code: 'Backspace', bubbles: true }));
                document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace', code: 'Backspace', bubbles: true }));
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', code: 'Delete', bubbles: true }));
                document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Delete', code: 'Delete', bubbles: true }));
                await delay(260);
            }
        }

        const remaining = getChipImages().length;
        console.log(`✅ [Pass ${pass}] Reference chip cleanup done. Removed ${removed}/${toRemove.length}. Remaining=${remaining}`);
        if (remaining <= keepCount) {
            return;
        }
    }

    const unresolved = getChipImages().length;
    if (unresolved > keepCount) {
        console.warn(`⚠️ Reference chip cleanup incomplete. Remaining=${unresolved}, expected<=${keepCount}`);
    }
};

// Helper: Click element by text (supports array of triggers)
export const clickByText = async (searchText: string | string[], tagFilter?: string): Promise<boolean> => {
    const targets = Array.isArray(searchText) ? searchText : [searchText];
    // Use Deep Search instead of shallow querySelectorAll
    const elements = findAllElementsDeep(tagFilter || 'button, div, span, label, a');

    for (const el of elements) {
        const text = el.textContent?.trim() || '';
        // Exact or partial match
        if (targets.some(t => text.includes(t))) {
            console.log(`✅ Found "${text}", clicking...`);
            (el as HTMLElement).click();
            // Also try clicking parent to be safe (often button is inside a wrapper)
            if (el.parentElement) (el.parentElement as HTMLElement).click();
            return true;
        }
    }
    return false;
};

// --- Upload Single Image - Using proven selectors from working extension ---
// Track which inputs have been used to avoid injecting both images into the same input
const usedInputIds = new Set<string>();
let uploadClickCount = 0; // Track how many times we've clicked add buttons

// Proven selectors from working extension (Google Labs VideoFX)
const PROVEN_SELECTORS = {
    // Add button - Material Icons with "add" text
    addButtonContainer: 'div.sc-76e54377-0 button',
    addButtonIcon: 'i',
    addButtonIconText: 'add',
    // Dialog and file input (Radix UI)
    dialog: '[id^="radix-"]',
    fileInput: '[id^="radix-"] input[type="file"]',
    fileInputFallback: '[role="dialog"] input[type="file"]',
    // Confirm button
    confirmButton: '[id^="radix-"] button.sc-19de2353-7',
    confirmButtonFallback: '[role="dialog"] button'
};

/**
 * Wait for "Crop and Save" dialog and click the button.
 * Returns true if crop dialog was found and button clicked.
 */
const waitAndClickCropSave = async (selectors: AutomationSelectors): Promise<boolean> => {
    console.log("🔍 Checking for Crop and Save dialog...");

    // Wait up to 5 seconds for crop dialog to appear
    for (let i = 0; i < 10; i++) {
        // Search ALL visible buttons for crop/save text
        const allBtns = findAllElementsDeep('button') as HTMLElement[];
        for (const btn of allBtns) {
            const rect = btn.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            const text = (btn.textContent || '').toLowerCase();
            if (text.includes('crop and save') || text.includes('ครอบตัดและบันทึก')) {
                console.log(`✅ Found "Crop and Save" button: "${text.trim().substring(0, 30)}"`);
                await robustElementClick(btn);
                return true;
            }
        }

        // Also check for any dialog with crop-related heading
        const headings = findAllElementsDeep('h1, h2, h3, h4, h5, h6, p, span, div');
        let hasCropDialog = false;
        for (const h of headings) {
            const text = (h.textContent || '').toLowerCase();
            if (text.includes('crop your ingredient') || text.includes('ครอบตัด')) {
                hasCropDialog = true;
                break;
            }
        }

        if (!hasCropDialog && i >= 2) {
            // No crop dialog after 1 second, probably not coming
            return false;
        }

        await delay(500);
    }

    // Last resort: try cropSaveTriggers from config
    const clicked = await clickByText(selectors.upload.cropSaveTriggers);
    if (clicked) {
        console.log("✅ Clicked crop/save via config triggers");
        return true;
    }

    return false;
};

export const uploadSingleImage = async (base64Image: string, imageIndex: number, selectors: AutomationSelectors): Promise<boolean> => {
    console.log(`📷 Uploading image ${imageIndex} (Using proven selectors)...`);

    if (!base64Image) {
        console.warn("⚠️ No Base64 image provided to uploadSingleImage");
        return false;
    }

    try {
        // Convert base64 to File
        const arr = base64Image.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const filename = imageIndex === 1 ? 'character.png' : 'product.png';
        const file = new File([u8arr], filename, { type: mime });

        console.log(`✅ File created: ${file.name}, ${file.size} bytes`);

        // Robust Injection Loop
        for (let attempt = 0; attempt < 5; attempt++) {
            await delay(1000);
            console.log(`🔄 Attempt ${attempt + 1}/5`);

            // ========== STRATEGY 0: Direct file input injection (no button click needed) ==========
            // Some UI states already have a file input visible — inject directly
            const existingInputs = findAllElementsDeep('input[type="file"]') as HTMLInputElement[];
            if (existingInputs.length > 0 && attempt === 0) {
                console.log(`🔍 Strategy 0: Found ${existingInputs.length} existing file input(s), trying direct injection...`);
                const targetInput = existingInputs[existingInputs.length - 1];
                try {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    targetInput.files = dt.files;
                    targetInput.dispatchEvent(new Event('change', { bubbles: true }));
                    targetInput.dispatchEvent(new Event('input', { bubbles: true }));
                    console.log(`✅ Strategy 0: File injected directly into existing input!`);
                    await delay(2000);

                    // Handle "Crop and Save" dialog if it appeared
                    const cropClicked = await waitAndClickCropSave(selectors);
                    if (cropClicked) {
                        console.log(`✅ Strategy 0: Crop and Save clicked!`);
                        await delay(1500);
                        return true;
                    }

                    // Check if image appeared (no crop dialog case)
                    const imgs = findAllElementsDeep('img') as HTMLElement[];
                    const newImg = imgs.find(img => {
                        const r = img.getBoundingClientRect();
                        return r.width > 50 && r.height > 50 && hasUsableImageSrc(img);
                    });
                    if (newImg) {
                        console.log(`✅ Strategy 0: Image appeared after direct injection!`);
                        return true;
                    }
                } catch (e) {
                    console.warn(`⚠️ Strategy 0: Direct injection failed:`, e);
                }
            }

            // ========== STRATEGY 1: Find upload slots (buttons with "add" icon) ==========
            console.log("🔍 Looking for image upload slots...");

            let addBtn: HTMLElement | null = null;

            // Method A: Deep search for ALL buttons/clickable areas with "add" icon
            const allButtons = findAllElementsDeep('button');
            console.log(`   Found ${allButtons.length} buttons total`);

            const emptySlots: HTMLElement[] = [];
            const filledSlots: HTMLElement[] = [];

            const vh = window.innerHeight;
            for (const button of allButtons) {
                const rect = button.getBoundingClientRect();
                // Skip invisible or tiny buttons
                if (rect.width < 40 || rect.height < 40) continue;

                const icon = button.querySelector('i, .material-icons, .google-symbols');
                const iconText = icon?.textContent?.trim() || '';
                const hasAddIcon = iconText === 'add' || iconText === 'add_circle' || iconText === 'add_photo_alternate';
                const hasImage = button.querySelector('img') !== null;

                // Skip prompt-bar add buttons (bottom area, small size, has button-overlay)
                // Upload slots are larger (60x60+) and in the main content area
                const isPromptBarBtn = rect.top > vh * 0.80 && rect.width < 60 && rect.height < 60;
                const hasOverlay = button.querySelector('[data-type="button-overlay"]') !== null;
                if (hasAddIcon && (isPromptBarBtn || hasOverlay)) {
                    console.log(`   ⏭️ Skipping prompt-bar add button at y=${rect.top.toFixed(0)} size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`);
                    continue;
                }

                // Log potential upload buttons
                if (hasAddIcon || (rect.width > 60 && rect.width < 200)) {
                    console.log(`   Button: icon="${iconText}", hasImage=${hasImage}, size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}, y=${rect.top.toFixed(0)}`);
                }

                if (hasAddIcon && !hasImage) {
                    emptySlots.push(button as HTMLElement);
                } else if (hasImage) {
                    filledSlots.push(button as HTMLElement);
                }
            }

            console.log(`   Empty slots (with add icon): ${emptySlots.length}, Filled slots (with image): ${filledSlots.length}`);

            // Deterministic slot pick:
            // - Prefer left slot for character (imageIndex=1)
            // - Prefer right slot for product (imageIndex=2)
            // This avoids both images going into the same slot.
            const sortedEmptySlots = emptySlots
                .map((el) => ({ el, rect: el.getBoundingClientRect() }))
                .sort((a, b) => a.rect.left - b.rect.left)
                .map((x) => x.el);

            // For image 1: use first empty slot
            // For image 2: after first upload, find the remaining empty slot
            if (sortedEmptySlots.length > 0) {
                if (imageIndex === 1) {
                    addBtn = sortedEmptySlots[0];
                    console.log(`   ✅ Using first empty slot for image ${imageIndex}`);
                } else if (imageIndex === 2) {
                    // If we still have 2 empty slots, pick the right-most for product.
                    // If we only have 1 empty slot (after character upload), just pick it.
                    addBtn = sortedEmptySlots.length === 1
                        ? sortedEmptySlots[0]
                        : sortedEmptySlots[sortedEmptySlots.length - 1];
                    console.log(`   ✅ Using ${sortedEmptySlots.length === 1 ? 'remaining' : 'right-most'} empty slot for image ${imageIndex}`);
                }
            }

            // Fallback for image 2: if no empty slots with add icon, look harder
            if (!addBtn && imageIndex === 2) {
                console.log("🔍 Image 2: Deep searching for any clickable upload area...");

                // Look for any button that looks like an upload slot (square-ish, medium size)
                for (const button of allButtons) {
                    const rect = button.getBoundingClientRect();
                    if (rect.width < 60 || rect.height < 60) continue;
                    if (rect.width > 200 || rect.height > 200) continue;

                    // Check if this button has an image already
                    const hasImage = button.querySelector('img') !== null;
                    if (hasImage) continue;

                    // Check for add-like appearance
                    const text = button.textContent?.trim() || '';
                    const hasPlus = text.includes('+') || text.includes('add');
                    const isSquarish = Math.abs(rect.width - rect.height) < 30;

                    if (isSquarish || hasPlus) {
                        addBtn = button as HTMLElement;
                        console.log(`   ✅ Found upload-like button for image 2: size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`);
                        break;
                    }
                }
            }

            // Method 2: Deep search for any icon with "add" text
            if (!addBtn) {
                const allIcons = findAllElementsDeep('i, .material-icons, .google-symbols');
                console.log(`   Deep search: Found ${allIcons.length} icon elements`);

                for (const icon of allIcons) {
                    const text = icon.textContent?.trim();
                    if (text === 'add' || text === 'add_circle' || text === 'add_photo_alternate' || text === 'upload') {
                        addBtn = icon as HTMLElement;
                        console.log(`   ✅ Found icon with text: "${text}"`);
                        break;
                    }
                }
            }

            // Method 3: Look for clickable upload areas
            if (!addBtn) {
                const uploadAreas = findAllElementsDeep('[class*="upload"], [class*="drop"], [aria-label*="upload"]');
                console.log(`   Looking for upload areas: Found ${uploadAreas.length}`);
                for (const area of uploadAreas) {
                    const rect = area.getBoundingClientRect();
                    if (rect.width > 50 && rect.height > 50) {
                        addBtn = area as HTMLElement;
                        console.log(`   ✅ Found upload area`);
                        break;
                    }
                }
            }

            // ========== STRATEGY 2: Click add button to open dialog ==========
            if (addBtn) {
                console.log(`🖱️ Clicking add button for image ${imageIndex}...`);

                // Click the button (try multiple methods)
                addBtn.click();

                // Also click parent button if icon was found
                const parentButton = addBtn.closest('button');
                if (parentButton && parentButton !== addBtn) {
                    parentButton.click();
                }

                const slotContainer = (parentButton || addBtn.closest('button') || addBtn) as HTMLElement;

                uploadClickCount++;
                await delay(1000); // Wait for dialog to open

                // ========== STRATEGY 3: Find file input in dialog ==========
                console.log("🔍 Looking for file input in dialog...");

                // Try proven selector first
                let fileInput: HTMLInputElement | null = document.querySelector(PROVEN_SELECTORS.fileInput);

                // Fallback to role="dialog"
                if (!fileInput) {
                    fileInput = document.querySelector(PROVEN_SELECTORS.fileInputFallback);
                }

                // Fallback to any file input
                if (!fileInput) {
                    const allInputs = findAllElementsDeep('input[type="file"]');
                    if (allInputs.length > 0) {
                        fileInput = allInputs[allInputs.length - 1] as HTMLInputElement; // Get the newest one
                    }
                }

                if (fileInput) {
                    console.log(`✅ Found file input:`, fileInput);

                    // ========== STRATEGY 4: Inject file using DataTransfer ==========
                    try {
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        fileInput.files = dataTransfer.files;

                        // Dispatch events to trigger React/Vue
                        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                        fileInput.dispatchEvent(new Event('input', { bubbles: true }));

                        console.log(`✅ File injected successfully!`);

                        await delay(2000);

                        // ========== STRATEGY 5: Handle "Crop and Save" dialog ==========
                        console.log("🔍 Looking for Crop and Save / confirm button...");

                        // Primary: use dedicated crop dialog handler
                        const cropHandled = await waitAndClickCropSave(selectors);
                        if (cropHandled) {
                            console.log("✅ Crop and Save handled!");
                        } else {
                            // Fallback: try proven selector
                            let confirmBtn: HTMLElement | null = document.querySelector(PROVEN_SELECTORS.confirmButton);

                            // Fallback: broad button search
                            if (!confirmBtn) {
                                const dialogButtons = findAllElementsDeep('button');
                                for (const btn of dialogButtons) {
                                    const rect = (btn as HTMLElement).getBoundingClientRect();
                                    if (rect.width === 0 || rect.height === 0) continue;
                                    const text = (btn.textContent || '').toLowerCase();
                                    if (text.includes('crop and save') || text.includes('crop') ||
                                        text.includes('save') || text.includes('use') || text.includes('apply') ||
                                        text.includes('confirm') || text.includes('select') ||
                                        text.includes('ok') || text.includes('done') ||
                                        text.includes('ครอบตัด') || text.includes('บันทึก')) {
                                        confirmBtn = btn as HTMLElement;
                                        console.log(`✅ Found confirm/crop button: "${text.substring(0, 30)}"`);
                                        break;
                                    }
                                }
                            }

                            if (confirmBtn) {
                                await robustElementClick(confirmBtn);
                                console.log("✅ Clicked confirm/crop button");
                            } else {
                                await clickByText(selectors.upload.cropSaveTriggers);
                            }
                        }

                        await delay(1000);

                        // Soft verification: try to detect thumbnail presence in the slot.
                        // Do NOT fail the whole upload if UI structure changes; just log.
                        let verified = false;
                        for (let v = 0; v < 10; v++) {
                            const hasImg = !!(slotContainer.querySelector('img') || slotContainer.parentElement?.querySelector('img'));
                            if (hasImg) {
                                verified = true;
                                break;
                            }
                            await delay(300);
                        }
                        if (!verified) {
                            console.warn(`⚠️ Upload confirm done but could not verify thumbnail for image ${imageIndex}. Continuing.`);
                        }

                        return true;

                    } catch (e) {
                        console.error("❌ File injection failed:", e);
                    }
                } else {
                    console.warn("⚠️ No file input found in dialog");
                }
            } else {
                console.warn("⚠️ No add button found");

                // Fallback: try text-based triggers from config
                await clickByText(selectors.upload.uploadButtonTriggers);
                await delay(500);
            }
        }
    } catch (e) {
        console.error("Critical Upload Error:", e);
    }

    console.warn(`⚠️ All upload attempts failed for image ${imageIndex}`);
    return false;
};

// Reset used inputs when starting a new pipeline
export const resetUploadState = () => {
    usedInputIds.clear();
    uploadClickCount = 0;
    console.log("🔄 Upload state reset");
};

// --- Helper: Check if we are in Workspace ---
const isInWorkspace = (selectors: AutomationSelectors): boolean => {
    const tabs = findAllElementsDeep('button, div[role="tab"], span'); // Deep Search
    for (const tab of tabs) {
        const text = tab.textContent?.trim() || '';
        if (selectors.workspace.imageTabTriggers.some(t => text.includes(t))) {
            return true;
        }
    }
    return false;
};

// --- Switch to Image Tab ---
export const switchToImageTab = async (selectors: AutomationSelectors): Promise<boolean> => {
    console.log("🖼️ Switching to Image Tab...");

    // Strategy 1: Search broad set of elements (tabs, buttons, links, divs)
    const triggers = selectors.workspace.imageTabTriggers;
    const allElements = findAllElementsDeep('button, [role="tab"], a, div[role="tab"], span, nav a, nav button');
    for (const el of allElements) {
        const text = (el.textContent || '').trim();
        if (triggers.some(t => text.includes(t))) {
            const rect = (el as HTMLElement).getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            console.log(`✅ Found Image tab: "${text}" at (${rect.left.toFixed(0)},${rect.top.toFixed(0)})`);
            await robustElementClick(el as HTMLElement);
            return true;
        }
    }

    // Strategy 2: Fallback to clickByText with broader search
    const clicked = await clickByText(triggers);
    if (clicked) return true;

    console.warn("⚠️ Could not find Image tab with any strategy");
    return false;
};

type AspectRatioValue = '9:16' | '16:9';

const normalizeAspectRatioValue = (value?: string): AspectRatioValue => {
    const normalized = (value || '').trim().toLowerCase();
    if (normalized.includes('16:9') || normalized.includes('landscape') || normalized.includes('แนวนอน')) {
        return '16:9';
    }
    return '9:16';
};

const extractAspectRatioValue = (text: string): AspectRatioValue | null => {
    const normalized = (text || '').toLowerCase();
    if (normalized.includes('16:9') || normalized.includes('landscape') || normalized.includes('แนวนอน')) {
        return '16:9';
    }
    if (normalized.includes('9:16') || normalized.includes('portrait') || normalized.includes('protrait') || normalized.includes('แนวตั้ง')) {
        return '9:16';
    }
    return null;
};

const VIDEO_PROMPT_MAX_CHARS = 850;

// Voice seed management for consistent voice across scenes
let voiceSeed: string | null = null;
let voiceGender: string | null = null;
let capturedVoiceData: any = null;
let speakerEmbedding: string | null = null;
let voiceProfile: any = null;
let actorId: string | null = null;
let generationParams: any = null;

// Store first generation payload for comparison
let firstGenerationPayload: any = null;
let generationPayloads: any[] = [];
let comparisonResults: any = null;

// Intercept VideoFX network requests to capture real voice seeds
const interceptVideoFXRequests = (): void => {
    // Store original fetch
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        
        // Clone response to avoid consuming it
        const clonedResponse = response.clone();
        
        try {
            const url = args[0] as string;
            
            // Look for video generation requests
            if (url && typeof url === 'string' && 
                (url.includes('generate') || url.includes('video') || url.includes('veo'))) {
                
                const responseData = await clonedResponse.json();
                
                // Store payload for comparison
                generationPayloads.push({
                    data: responseData,
                    timestamp: Date.now(),
                    url: url
                });
                
                if (!firstGenerationPayload) {
                    firstGenerationPayload = responseData;
                    console.log('📊 Stored first generation payload for comparison');
                } else {
                    // Compare with first payload to find static parameters
                    performPayloadComparison();
                }
                
                // Enhanced search for voice-related data based on Gemini's insights
                const searchForVoiceData = (obj: any, path: string = ''): any => {
                    if (!obj || typeof obj !== 'object') return null;
                    
                    // Check current level for voice seed patterns
                    for (const [key, value] of Object.entries(obj)) {
                        const currentPath = path ? `${path}.${key}` : key;
                        const keyLower = key.toLowerCase();
                        
                        // Priority 1: Speaker Embedding / Voice Token (Gemini's insight)
                        if (keyLower.includes('speaker') && keyLower.includes('embedding')) {
                            if (typeof value === 'string' && value.length > 16) {
                                speakerEmbedding = value;
                                console.log(`🎯 FOUND SPEAKER EMBEDDING: ${currentPath} = ${value.substring(0, 20)}...`);
                            }
                        }
                        
                        // Priority 2: Voice Profile Metadata
                        if (keyLower.includes('voice') && keyLower.includes('profile')) {
                            if (typeof value === 'object' && value !== null) {
                                voiceProfile = value;
                                console.log(`🗣️ FOUND VOICE PROFILE: ${currentPath}`);
                            }
                        }
                        
                        // Priority 3: Actor ID (Veo specific)
                        if (keyLower.includes('actor') && keyLower.includes('id')) {
                            if (typeof value === 'string' && value.length > 4) {
                                actorId = value;
                                console.log(`🎭 FOUND ACTOR ID: ${currentPath} = ${value}`);
                            }
                        }
                        
                        // Priority 4: Audio Generation Params
                        if (keyLower.includes('audio') && keyLower.includes('generation') && keyLower.includes('param')) {
                            if (typeof value === 'object' && value !== null) {
                                generationParams = value;
                                console.log(`⚙️ FOUND AUDIO GENERATION PARAMS: ${currentPath}`);
                            }
                        }
                        
                        // Priority 5: Standard voice IDs
                        if ((keyLower.includes('speaker') || keyLower.includes('voice')) && 
                            (keyLower.includes('id') || key === 'id')) {
                            if (typeof value === 'string' && value.length > 8 && value.length < 200) {
                                if (!capturedVoiceData) {
                                    capturedVoiceData = {
                                        seed: value,
                                        path: currentPath,
                                        timestamp: Date.now(),
                                        type: 'speaker_id'
                                    };
                                    console.log(`✅ CAPTURED SPEAKER ID: ${value} from ${currentPath}`);
                                }
                            }
                        }
                        
                        // Priority 6: Reference ID / Embedding Hash
                        if (keyLower.includes('reference') && keyLower.includes('id')) {
                            if (typeof value === 'string' && value.length > 8) {
                                console.log(`🔗 FOUND REFERENCE ID: ${currentPath} = ${value}`);
                            }
                        }
                        
                        // Priority 7: Internal Seed (Multi-modal)
                        if (keyLower.includes('internal') && keyLower.includes('seed')) {
                            if (typeof value === 'string' && value.length > 4) {
                                console.log(`🌱 FOUND INTERNAL SEED: ${currentPath} = ${value}`);
                            }
                        }
                        
                        // Log all voice-related findings for debugging
                        if (typeof value === 'string' && 
                            (keyLower.includes('voice') || keyLower.includes('audio') || keyLower.includes('speaker')) &&
                            value.length > 4 && value.length < 300) {
                            console.log(`🔍 VOICE DATA: ${currentPath} = ${value}`);
                        }
                    }
                    
                    // Recursively search nested objects
                    for (const [key, value] of Object.entries(obj)) {
                        if (typeof value === 'object' && value !== null) {
                            searchForVoiceData(value, path ? `${path}.${key}` : key);
                        }
                    }
                };
                
                searchForVoiceData(responseData);
                
                // Log comprehensive voice data summary
                console.log('📊 VOICE DATA SUMMARY:', {
                    speakerEmbedding: speakerEmbedding ? `${speakerEmbedding.substring(0, 20)}...` : null,
                    voiceProfile: voiceProfile ? Object.keys(voiceProfile) : null,
                    actorId: actorId,
                    generationParams: generationParams ? Object.keys(generationParams) : null,
                    capturedVoiceData: capturedVoiceData ? capturedVoiceData.type : null,
                    payloadsStored: generationPayloads.length,
                    comparisonDone: comparisonResults ? true : false
                });
            }
        } catch (e) {
            // Silent fail - don't break the app
        }
        
        return response;
    };
};

// Compare payloads to find static voice parameters (Gemini's method)
const performPayloadComparison = (): void => {
    if (generationPayloads.length < 2 || !firstGenerationPayload) {
        return;
    }
    
    const latestPayload = generationPayloads[generationPayloads.length - 1].data;
    const staticParams: any = {};
    const changedParams: any = {};
    
    console.log(`🔍 COMPARING PAYLOAD #${generationPayloads.length} with first payload...`);
    
    // Deep comparison function
    const compareObjects = (obj1: any, obj2: any, path: string = ''): void => {
        if (!obj1 || !obj2 || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
            return;
        }
        
        // Get all keys from both objects
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        
        for (const key of allKeys) {
            const currentPath = path ? `${path}.${key}` : key;
            const val1 = obj1[key];
            const val2 = obj2[key];
            
            // Skip null/undefined values
            if (val1 === null || val1 === undefined || val2 === null || val2 === undefined) {
                continue;
            }
            
            // Compare based on type
            if (typeof val1 === 'string' && typeof val2 === 'string') {
                if (val1 === val2) {
                    // Static parameter - check if it's voice-related
                    if (currentPath.toLowerCase().includes('voice') || 
                        currentPath.toLowerCase().includes('audio') ||
                        currentPath.toLowerCase().includes('speaker') ||
                        currentPath.toLowerCase().includes('actor')) {
                        staticParams[currentPath] = val1;
                    }
                } else {
                    // Changed parameter
                    if (currentPath.toLowerCase().includes('voice') || 
                        currentPath.toLowerCase().includes('audio') ||
                        currentPath.toLowerCase().includes('speaker') ||
                        currentPath.toLowerCase().includes('actor')) {
                        changedParams[currentPath] = { from: val1 as string, to: val2 as string };
                    }
                }
            } else if (typeof val1 === 'object' && typeof val2 === 'object') {
                // Recursively compare nested objects
                compareObjects(val1, val2, currentPath);
            }
        }
    };
    
    // Perform comparison
    compareObjects(firstGenerationPayload, latestPayload);
    
    // Store results
    comparisonResults = {
        staticParams,
        changedParams,
        totalPayloads: generationPayloads.length,
        timestamp: Date.now()
    };
    
    // Log findings
    console.log('📊 PAYLOAD COMPARISON RESULTS:');
    console.log('🔒 STATIC VOICE PARAMETERS (These are the keys to consistency!):');
    
    if (Object.keys(staticParams).length === 0) {
        console.log('  ❌ No static voice parameters found');
    } else {
        for (const [path, value] of Object.entries(staticParams)) {
            console.log(`  ✅ ${path}: ${value}`);
        }
    }
    
    console.log('🔄 CHANGED VOICE PARAMETERS:');
    if (Object.keys(changedParams).length === 0) {
        console.log('  ✅ No voice parameters changed (Good for consistency!)');
    } else {
        for (const [path, change] of Object.entries(changedParams)) {
            const changeObj = change as { from: string; to: string };
            console.log(`  🔄 ${path}: "${changeObj.from}" → "${changeObj.to}"`);
        }
    }
    
    // Highlight the most important static parameters
    const importantStatic = Object.entries(staticParams).filter(([path]) => 
        path.includes('speaker') || path.includes('voice') || path.includes('actor')
    );
    
    if (importantStatic.length > 0) {
        console.log('🎯 CRITICAL STATIC PARAMETERS FOR VOICE CONSISTENCY:');
        importantStatic.forEach(([path, value]) => {
            console.log(`  🗝️ ${path}: ${value}`);
        });
    }
};

// Extract comprehensive voice data for consistency
const extractVoiceConsistencyData = (): any => {
    const voiceData: any = {};
    
    // Priority 1: Speaker Embedding (most reliable)
    if (speakerEmbedding) {
        voiceData.speakerEmbedding = speakerEmbedding;
        voiceData.primaryMethod = 'speaker_embedding';
        console.log('🎯 Using Speaker Embedding for voice consistency');
    }
    
    // Priority 2: Voice Profile
    if (voiceProfile) {
        voiceData.voiceProfile = voiceProfile;
        if (!voiceData.primaryMethod) voiceData.primaryMethod = 'voice_profile';
        console.log('🗣️ Using Voice Profile for voice consistency');
    }
    
    // Priority 3: Actor ID
    if (actorId) {
        voiceData.actorId = actorId;
        if (!voiceData.primaryMethod) voiceData.primaryMethod = 'actor_id';
        console.log('🎭 Using Actor ID for voice consistency');
    }
    
    // Priority 4: Standard Speaker ID
    if (capturedVoiceData && capturedVoiceData.seed) {
        voiceData.speakerId = capturedVoiceData.seed;
        voiceData.speakerIdPath = capturedVoiceData.path;
        if (!voiceData.primaryMethod) voiceData.primaryMethod = 'speaker_id';
        console.log('🎵 Using Speaker ID for voice consistency');
    }
    
    // Priority 5: Generation Parameters
    if (generationParams) {
        voiceData.generationParams = generationParams;
        console.log('⚙️ Including Generation Parameters for voice consistency');
    }
    
    // Priority 6: Static Parameters from Comparison (Gemini's method)
    if (comparisonResults && Object.keys(comparisonResults.staticParams).length > 0) {
        voiceData.staticParams = comparisonResults.staticParams;
        if (!voiceData.primaryMethod) voiceData.primaryMethod = 'static_comparison';
        console.log('📊 Using static parameters from payload comparison for voice consistency');
    }
    
    return voiceData;
};

// Extract voice seed from captured data or DOM elements (fallback)
const extractRealVoiceSeed = (): string | null => {
    const voiceData = extractVoiceConsistencyData();
    
    // Return the most reliable identifier
    if (voiceData.speakerEmbedding) return voiceData.speakerEmbedding;
    if (voiceData.speakerId) return voiceData.speakerId;
    if (voiceData.actorId) return voiceData.actorId;
    
    // Try to find voice data in page state/window objects (safe access, no eval)
    const win = window as any;
    const globalObjects: [string, any][] = [
        ['__STATE__', win.__STATE__],
        ['__INITIAL_DATA__', win.__INITIAL_DATA__],
        ['__VIDEO_STATE__', win.__VIDEO_STATE__],
        ['__VEO_STATE__', win.__VEO_STATE__]
    ];
    
    for (const [name, obj] of globalObjects) {
        try {
            if (obj && typeof obj === 'object') {
                const searchResult = searchObjectForVoiceSeed(obj);
                if (searchResult) {
                    console.log(`🎵 Found voice seed in window.${name}: ${searchResult}`);
                    return searchResult;
                }
            }
        } catch (e) {
            // Continue
        }
    }
    
    return null;
};

const searchObjectForVoiceSeed = (obj: any): string | null => {
    if (!obj || typeof obj !== 'object') return null;
    
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' && 
            (key.toLowerCase().includes('voice') || 
             key.toLowerCase().includes('audio') ||
             key.toLowerCase().includes('seed')) &&
            value.length > 8 && value.length < 100) {
            return value;
        }
        
        if (typeof value === 'object' && value !== null) {
            const result = searchObjectForVoiceSeed(value);
            if (result) return result;
        }
    }
    
    return null;
};

const getVoiceSeed = (): string => {
    if (!voiceSeed) {
        // Try to get real VideoFX voice data first
        const voiceData = extractVoiceConsistencyData();
        const realSeed = extractRealVoiceSeed();
        
        if (realSeed && voiceData.primaryMethod) {
            voiceSeed = realSeed;
            console.log(`🎵 Using real VideoFX voice data (${voiceData.primaryMethod}): ${voiceSeed.substring(0, 30)}...`);
        } else {
            // Fallback to generated seed
            voiceSeed = generateVoiceSeed();
            console.log(`🎵 Using fallback voice seed: ${voiceSeed}`);
        }
    }
    return voiceSeed;
};

// Get comprehensive voice data for prompt enhancement
const getVoiceDataForPrompt = (): any => {
    return extractVoiceConsistencyData();
};

const generateVoiceSeed = (): string => {
    // Generate consistent seed based on timestamp and random factor
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `VOICE_${timestamp}_${random}`;
};

const resetVoiceSeed = (): void => {
    voiceSeed = null;
    voiceGender = null;
    capturedVoiceData = null;
    speakerEmbedding = null;
    voiceProfile = null;
    actorId = null;
    generationParams = null;
    firstGenerationPayload = null;
    generationPayloads = [];
    comparisonResults = null;
    console.log('🔄 Voice seed and all voice data reset for new pipeline');
};

const setVoiceGender = (gender: string): void => {
    voiceGender = gender;
    console.log(`🗣️ Voice gender set to: ${gender}`);
};

const getVoiceGender = (): string | null => {
    return voiceGender;
};

// Initialize network interception
if (typeof window !== 'undefined') {
    interceptVideoFXRequests();
}

const compactPromptText = (text: string): string => {
    return (text || '').replace(/\r?\n+/g, ' ').replace(/\s{2,}/g, ' ').trim();
};

const buildAspectRatioPromptDirective = (ratio: AspectRatioValue): string => {
    return ratio === '9:16'
        ? 'Aspect ratio: 9:16 vertical portrait framing.'
        : 'Aspect ratio: 16:9 horizontal landscape framing.';
};

const trimPromptToLimit = (prompt: string, maxChars: number): string => {
    const cleaned = compactPromptText(prompt);
    if (cleaned.length <= maxChars) return cleaned;

    // Extract VOICEOVER section so it doesn't get cut off
    const voiceMatch = cleaned.match(/(THAI\s+VOICEOVER\s+SCRIPT\s*:\s*"[^"]*")/i) 
        || cleaned.match(/(VOICEOVER\s*:\s*"[^"]*")/i);
    const voiceSection = voiceMatch ? voiceMatch[1] : '';
    
    // Remove voiceover from prompt body, trim the rest, then re-append
    let body = voiceSection ? cleaned.replace(voiceSection, '').replace(/\s{2,}/g, ' ').trim() : cleaned;
    
    // Budget: leave room for voiceover section
    const voiceBudget = voiceSection ? voiceSection.length + 1 : 0;
    const bodyBudget = maxChars - voiceBudget;
    
    if (body.length > bodyBudget && bodyBudget > 100) {
        const hardSlice = body.slice(0, bodyBudget).trim();
        const softCut = hardSlice.lastIndexOf(' ');
        body = softCut > Math.floor(bodyBudget * 0.65) ? hardSlice.slice(0, softCut).trim() : hardSlice;
        if (!/[.!?…]$/.test(body)) body = `${body}.`;
    }
    
    // Re-append voiceover
    const result = voiceSection ? `${body} ${voiceSection}` : body;
    
    // Final hard limit
    if (result.length <= maxChars) return result;
    return result.slice(0, maxChars).trim();
};

const finalizeVideoPrompt = (rawPrompt: string, requestedAspectRatio?: string): string => {
    const targetRatio = normalizeAspectRatioValue(requestedAspectRatio);
    const aspectDirective = buildAspectRatioPromptDirective(targetRatio);

    let prompt = compactPromptText(rawPrompt);
    if (!prompt) {
        prompt = 'Thai presenter introduces the product naturally with clear speaking and cinematic motion.';
    }

    let normalized = prompt.toLowerCase();
    const hasAspectInstruction =
        normalized.includes('aspect ratio') ||
        normalized.includes('9:16') ||
        normalized.includes('16:9') ||
        normalized.includes('แนวตั้ง') ||
        normalized.includes('แนวนอน');
    if (!hasAspectInstruction) {
        prompt = `${prompt} ${aspectDirective}`;
        normalized = prompt.toLowerCase();
    }

    if (!normalized.includes('no text') && !normalized.includes('no subtitle') && !normalized.includes('ไม่มีข้อความ')) {
        prompt = `${prompt} No text overlays or subtitles.`;
        normalized = prompt.toLowerCase();
    }

    if (!normalized.includes('same person') && !normalized.includes('same face') && !normalized.includes('same outfit')) {
        prompt = `${prompt} Same person identity, outfit, and voice from previous scene.`;
    }

    // Voice continuity: log captured data but keep prompt concise
    const voiceData = getVoiceDataForPrompt();
    const currentVoiceGender = getVoiceGender();
    if (voiceData.primaryMethod) {
        console.log(`🎵 Voice data captured (${voiceData.primaryMethod}) — continuity handled via reference frame`);
    }
    if (currentVoiceGender && !normalized.includes('voice')) {
        prompt = `${prompt} ${currentVoiceGender} Thai voice, same pitch and tone throughout.`;
    }

    const finalPrompt = trimPromptToLimit(prompt, VIDEO_PROMPT_MAX_CHARS);
    console.log(`📝 Video prompt finalized: ${finalPrompt.length}/${VIDEO_PROMPT_MAX_CHARS} chars`);
    return finalPrompt;
};

const sanitizeSceneScriptForVoiceover = (sceneScriptText: string): string => {
    // Extract THAI VOICEOVER SCRIPT specifically
    const thaiScriptMatch = sceneScriptText.match(/THAI\s+VOICEOVER\s+SCRIPT\s*:\s*""([\s\S]*?)""/i);
    if (thaiScriptMatch?.[1]) {
        return thaiScriptMatch[1].trim();
    }

    // Fallback: extract any quoted text
    const quoteMatch = sceneScriptText.match(/"([\s\S]*?)"/);
    if (quoteMatch?.[1]) {
        return quoteMatch[1].trim();
    }

    // Remove prefixes and return cleaned text
    const cleaned = (sceneScriptText || '')
        .replace(/^🎬\s*ฉาก\s*\d+\s*:\s*/i, '')
        .replace(/^scene\s*\d+\s*:\s*/i, '')
        .trim();

    return cleaned.replace(/\s+/g, ' ').trim();
};

const replaceVoiceoverInPrompt = (basePrompt: string, sceneScriptText: string, requestedAspectRatio?: string): string => {
    let prompt = basePrompt || '';
    console.log(`🐛 DEBUG: replaceVoiceoverInPrompt called with sceneScriptText = "${sceneScriptText}"`);
    const voiceoverText = sanitizeSceneScriptForVoiceover(sceneScriptText);
    console.log(`🐛 DEBUG: extracted voiceoverText = "${voiceoverText}"`);
    if (!voiceoverText) {
        console.warn(`⚠️ No voiceover text extracted from sceneScriptText, falling back to finalizeVideoPrompt`);
        return finalizeVideoPrompt(prompt, requestedAspectRatio);
    }

    const quotedVoice = `"${voiceoverText}"`;

    // Prefer replacing THAI VOICEOVER SCRIPT block while keeping everything else unchanged.
    if (/THAI\s+VOICEOVER\s+SCRIPT\s*:/i.test(prompt)) {
        prompt = prompt.replace(/(THAI\s+VOICEOVER\s+SCRIPT\s*:\s*)("[\s\S]*?"|[^\n\r]*)/i, `$1${quotedVoice}`);
    } else if (/VOICEOVER\s*:/i.test(prompt)) {
        prompt = prompt.replace(/(VOICEOVER\s*:\s*)("[\s\S]*?"|[^\n\r]*)/i, `$1${quotedVoice}`);
    } else {
        prompt = `${compactPromptText(prompt)} THAI VOICEOVER SCRIPT: ${quotedVoice}`;
    }

    const finalPrompt = trimPromptToLimit(prompt, VIDEO_PROMPT_MAX_CHARS);
    console.log(`📝 Extend prompt (scene script replaced): ${finalPrompt.length}/${VIDEO_PROMPT_MAX_CHARS} chars`);
    return finalPrompt;
};

const findSettingsTuneButton = (): HTMLElement | null => {
    const buttons = findAllElementsDeep('button, [role="button"]') as HTMLElement[];
    const candidates: Array<{ btn: HTMLElement; score: number }> = [];

    for (const btn of buttons) {
        const rect = btn.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || btn.offsetParent === null) continue;

        const iconText = (btn.querySelector('i, .material-icons, .google-symbols')?.textContent || '').trim().toLowerCase();
        const text = (btn.textContent || '').trim().toLowerCase();
        const ariaLabel = (btn.getAttribute('aria-label') || '').trim().toLowerCase();
        const title = (btn.getAttribute('title') || '').trim().toLowerCase();
        const combined = `${text} ${ariaLabel} ${title}`;

        let score = 0;
        if (iconText === 'tune') score += 8;
        if (combined.includes('settings') || combined.includes('setting') || combined.includes('ตั้งค่า')) score += 5;
        if (btn.getAttribute('aria-haspopup') === 'dialog') score += 2;

        if (score > 0) {
            candidates.push({ btn, score });
        }
    }

    candidates.sort((a, b) => b.score - a.score);
    return candidates[0]?.btn || null;
};

const findAspectRatioCombobox = (): HTMLElement | null => {
    const combos = findAllElementsDeep('button[role="combobox"], [role="combobox"]') as HTMLElement[];
    const candidates: Array<{ el: HTMLElement; score: number }> = [];

    for (const combo of combos) {
        const rect = combo.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || combo.offsetParent === null) continue;

        const text = (combo.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        if (!text) continue;

        let score = 0;
        if (text.includes('aspect ratio') || text.includes('สัดส่วน')) score += 6;
        if (text.includes('16:9') || text.includes('9:16')) score += 4;
        if (text.includes('landscape') || text.includes('portrait') || text.includes('protrait') || text.includes('แนวตั้ง') || text.includes('แนวนอน')) score += 2;

        if (score > 0) {
            candidates.push({ el: combo, score });
        }
    }

    candidates.sort((a, b) => b.score - a.score);
    return candidates[0]?.el || null;
};

const findAspectRatioOption = (targetRatio: AspectRatioValue, avoidEl?: HTMLElement | null): HTMLElement | null => {
    const targetKeywords = targetRatio === '16:9'
        ? ['16:9', 'landscape', 'แนวนอน']
        : ['9:16', 'portrait', 'protrait', 'แนวตั้ง'];

    const strictPool = findAllElementsDeep('[role="option"], [role="menuitem"], [data-radix-collection-item]') as HTMLElement[];
    const broadPool = strictPool.length > 0
        ? strictPool
        : (findAllElementsDeep('button, div, span, li') as HTMLElement[]);

    const candidates: Array<{ el: HTMLElement; score: number }> = [];

    for (const el of broadPool) {
        if (avoidEl && (el === avoidEl || avoidEl.contains(el) || el.contains(avoidEl))) continue;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0 || el.offsetParent === null) continue;

        const text = (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
        if (!text || text.length > 120) continue;
        if (text.includes('aspect ratio') || text.includes('สัดส่วน')) continue;
        if (!targetKeywords.some((k) => text.includes(k))) continue;

        let score = 0;
        if (text.includes(targetRatio)) score += 6;
        if (targetRatio === '16:9' && text.includes('landscape')) score += 3;
        if (targetRatio === '9:16' && (text.includes('portrait') || text.includes('protrait'))) score += 3;
        if (el.getAttribute('role') === 'option' || el.getAttribute('role') === 'menuitem') score += 2;
        if (rect.width > 40 && rect.height > 20) score += 1;

        candidates.push({ el, score });
    }

    candidates.sort((a, b) => b.score - a.score);
    return candidates[0]?.el || null;
};

const closeSettingsPanelIfOpen = async (): Promise<void> => {
    for (let attempt = 1; attempt <= 3; attempt++) {
        const settingsBtn = findSettingsTuneButton();
        if (!settingsBtn) return;

        const isOpen = settingsBtn.getAttribute('data-state') === 'open' || settingsBtn.getAttribute('aria-expanded') === 'true';
        if (!isOpen) return;

        await robustElementClick(settingsBtn);
        await delay(300);
    }

    // Escape fallback
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape', bubbles: true }));
    await delay(220);
};

const ensureAspectRatioMatchesInput = async (requestedAspectRatio?: string): Promise<boolean> => {
    const targetRatio = normalizeAspectRatioValue(requestedAspectRatio);
    console.log(`🎛️ Pre-step: Ensuring Aspect Ratio matches app input (${targetRatio})...`);

    const settingsBtn = findSettingsTuneButton();
    if (!settingsBtn) {
        console.warn('⚠️ Could not find Settings (tune) button for aspect ratio check');
        return false;
    }

    const initiallyOpen = settingsBtn.getAttribute('data-state') === 'open' || settingsBtn.getAttribute('aria-expanded') === 'true';
    if (!initiallyOpen) {
        await robustElementClick(settingsBtn);
        await delay(500);
    }

    const aspectCombobox = findAspectRatioCombobox();
    if (!aspectCombobox) {
        console.warn('⚠️ Could not find Aspect Ratio combobox in settings panel');
        await closeSettingsPanelIfOpen();
        return false;
    }

    const currentRatio = extractAspectRatioValue(aspectCombobox.textContent || '');
    console.log(`  Current Aspect Ratio in UI: ${currentRatio || 'unknown'}`);

    if (currentRatio !== targetRatio) {
        console.log(`  🔄 Aspect Ratio mismatch (${currentRatio || 'unknown'} → ${targetRatio}), selecting target...`);
        await robustElementClick(aspectCombobox);
        await delay(420);

        const optionEl = findAspectRatioOption(targetRatio, aspectCombobox);
        if (optionEl) {
            await robustElementClick(optionEl);
            await delay(550);
            console.log(`  ✅ Selected Aspect Ratio option: ${targetRatio}`);
        } else {
            console.warn(`  ⚠️ Could not find dropdown option for Aspect Ratio ${targetRatio}`);
        }
    } else {
        console.log(`  ✅ Aspect Ratio already correct (${targetRatio})`);
    }

    const verifyCombo = findAspectRatioCombobox() || aspectCombobox;
    const verifiedRatio = extractAspectRatioValue(verifyCombo.textContent || '');
    const matched = verifiedRatio === targetRatio;
    if (!matched) {
        console.warn(`⚠️ Aspect Ratio verification failed. Expected=${targetRatio}, Found=${verifiedRatio || 'unknown'}`);
    } else {
        console.log(`✅ Aspect Ratio verified: ${verifiedRatio}`);
    }

    await closeSettingsPanelIfOpen();
    return matched;
};

// --- Fill Prompt ---
// Helper for robust typing simulation - Updated for modern frameworks
const simulateTyping = async (element: HTMLElement, text: string) => {
    element.focus();
    element.click();
    await delay(300);

    let injected = false;

    // Strategy 1: Use native setter to bypass React's synthetic events (Fixed for proper invocation)
    try {
        if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
            const inputEl = element as HTMLInputElement | HTMLTextAreaElement;

            // Get the correct native setter based on element type
            const prototype = element.tagName === 'TEXTAREA'
                ? window.HTMLTextAreaElement.prototype
                : window.HTMLInputElement.prototype;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

            if (nativeInputValueSetter) {
                // Clear first
                nativeInputValueSetter.call(inputEl, '');
                inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                await delay(50);

                // Set new value using native setter
                nativeInputValueSetter.call(inputEl, text);
                inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                injected = true;
                console.log(`✅ Text injected via native setter`);
            } else {
                // Fallback: direct assignment
                inputEl.value = text;
                inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                injected = true;
            }
        } else if (element.isContentEditable || element.getAttribute('contenteditable') === 'true') {
            // ContentEditable element
            element.textContent = '';
            element.dispatchEvent(new Event('input', { bubbles: true }));
            await delay(50);

            element.textContent = text;
            element.dispatchEvent(new Event('input', { bubbles: true }));
            injected = true;
            console.log(`✅ Text injected into contentEditable`);
        }
    } catch (e) {
        console.warn("Native setter injection failed:", e);
    }

    // Strategy 2: Fallback - simulate keystrokes for first few chars + paste rest
    if (!injected) {
        try {
            if (element.tagName === 'TEXTAREA' || element.tagName === 'INPUT') {
                (element as HTMLInputElement).value = text;
            } else {
                element.innerText = text;
            }
            injected = true;
        } catch (e) {
            console.error("Fallback injection failed:", e);
        }
    }

    // Dispatch sequence of events (Critical for React/Angular state sync)
    await delay(100);
    const events = ['keydown', 'keypress', 'input', 'keyup', 'change'];
    for (const type of events) {
        element.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
        await delay(30);
    }

    // Final blur to trigger validation
    await delay(100);
    element.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
};

export const fillPromptAndGenerate = async (prompt: string): Promise<boolean> => {
    if (!prompt) {
        console.error("❌ No prompt provided to fillPromptAndGenerate");
        return false;
    }
    console.log(`📝 Attempting to fill prompt (${prompt.length} chars)...`);
    console.log(`📝 Prompt preview: "${prompt.substring(0, 100)}..."`);
    if (prompt.length > VIDEO_PROMPT_MAX_CHARS) {
        console.warn(`⚠️ Prompt length ${prompt.length} exceeds limit ${VIDEO_PROMPT_MAX_CHARS}!`);
    }

    let inputEl: HTMLElement | null = null;

    // RETRY LOOP 1: FIND INPUT (5 Attempts)
    for (let attempt = 1; attempt <= 5; attempt++) {
        const inputs = findAllElementsDeep('textarea, input[type="text"]');
        const visibleInputs = inputs.filter(el => (el as HTMLElement).clientHeight > 0);

        if (visibleInputs.length > 0) {
            inputEl = visibleInputs[visibleInputs.length - 1] as HTMLElement;
        }

        if (!inputEl) {
            const editables = findAllElementsDeep('div[contenteditable="true"], [role="textbox"], span[data-placeholder]');
            const isPromptBox = (el: Element) => {
                const txt = (el.textContent || '').toLowerCase();
                const placeholder = (el.getAttribute('data-placeholder') || '').toLowerCase();
                const knownPlaceholders = [
                    'สร้างวิดีโอที่มีข้อความ', 'type a prompt', 'describe', 'create video',
                    'พิมพ์ในช่องพร้อมต์เพื่อเริ่มต้น', 'describe your video', 'สร้างรูปภาพจากข้อความและองค์ประกอบ'
                ];
                return knownPlaceholders.some(p => txt.includes(p) || placeholder.includes(p));
            };
            const match = editables.find(isPromptBox);
            if (match) inputEl = match as HTMLElement;
            else if (editables.length > 0) inputEl = editables[editables.length - 1] as HTMLElement;
        }

        if (inputEl) {
            console.log(`✅ Found prompt input on attempt ${attempt}`);
            break;
        }
        await delay(1000);
    }

    if (inputEl) {
        console.log(`📝 Found prompt area (${inputEl.tagName}), injecting text...`);

        // --- ROBUST TYPING SIMULATION ---
        await simulateTyping(inputEl, prompt);

        await delay(1500); // Wait for UI to enable button

        // Video mode only: keep exactly ONE reference chip near prompt to avoid
        // VideoFX reference-image 403 when duplicate chips are attached.
        await normalizeVideoReferenceChips(inputEl, 1);

        // RETRY LOOP 2: CLICK GENERATE (5 Attempts)
        for (let attempt = 1; attempt <= 5; attempt++) {
            console.log(`🚀 Clicking Generate (Attempt ${attempt})...`);

            let clicked = false;
            let targetBtn: HTMLElement | null = null;

            // ========== STRATEGY A: Find exact generate button (arrow_forward icon) ==========
            // Google Labs VideoFX uses: <button><i class="google-symbols">arrow_forward</i><span>สร้าง</span></button>
            // The button is a small circular button (~40px) next to the prompt input
            const allButtons = findAllElementsDeep('button, [role="button"]');
            const inputRect = inputEl.getBoundingClientRect();

            console.log(`🔍 Found ${allButtons.length} buttons, input at x:${inputRect.left.toFixed(0)}`);

            // EXCLUDED icons - these are NOT the generate button
            const excludedIcons = ['tune', 'settings', 'filter_list', 'more_vert', 'more_horiz',
                'menu', 'close', 'expand_more', 'expand_less', 'check'];

            // METHOD 1: Find button with google-symbols icon "arrow_forward" ONLY
            const arrowForwardIcons = findAllElementsDeep('i.google-symbols, i[class*="google-symbols"]');
            console.log(`🔍 Found ${arrowForwardIcons.length} google-symbols icons`);

            for (const icon of arrowForwardIcons) {
                const iconText = icon.textContent?.trim();
                console.log(`   Icon: "${iconText}"`);

                // ONLY accept arrow_forward - this is THE generate button
                if (iconText === 'arrow_forward') {
                    const parentBtn = icon.closest('button');
                    if (parentBtn) {
                        const rect = parentBtn.getBoundingClientRect();
                        // Generate button should be small and circular (~40-60px)
                        if (rect.width <= 70 && rect.height <= 70) {
                            targetBtn = parentBtn as HTMLElement;
                            console.log(`✅ Found generate button: icon="${iconText}", size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`);
                            break;
                        }
                    }
                }
            }

            // If we found arrow_forward, skip all fallbacks - we have the correct button!
            if (targetBtn) {
                console.log(`🎯 Using arrow_forward button - skipping fallbacks`);
            }

            // ========== STRATEGY B: Text Match Fallback ==========
            if (!targetBtn) {
                const generateKeywords = ['generate', 'create', 'run', 'make', 'send', 'submit', 'ส่ง', 'สร้าง'];
                for (const btn of allButtons) {
                    const text = (btn.textContent || '').toLowerCase().trim();
                    const label = (btn.getAttribute('aria-label') || '').toLowerCase();
                    const rect = btn.getBoundingClientRect();
                    if (rect.width === 0 || rect.height === 0) continue;

                    if (generateKeywords.some(w => text.includes(w) || label.includes(w))) {
                        const excluded = ['tool', 'scene', 'ฉาก', 'เครื่องมือ', 'setting', 'ตั้งค่า'];
                        if (excluded.some(ex => text.includes(ex) || label.includes(ex))) continue;

                        targetBtn = btn as HTMLElement;
                        console.log(`🎯 Candidate (Text): "${text || label}"`);
                        break;
                    }
                }
            }

            // ========== STRATEGY C: Keyboard Shortcut (Enter key) ==========
            if (!targetBtn) {
                console.log("⌨️ Trying Enter key as fallback...");
                inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                inputEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));
                await delay(500);
                // Check if generation started
                const loadingIndicator = findAllElementsDeep('[class*="loading"], [class*="progress"], [class*="spinner"]');
                if (loadingIndicator.length > 0) {
                    console.log("✅ Generation started via Enter key!");
                    return true;
                }
            }

            // ========== CLICK THE BUTTON ==========
            if (targetBtn) {
                const isDisabled = targetBtn.hasAttribute('disabled') ||
                    targetBtn.getAttribute('aria-disabled') === 'true' ||
                    targetBtn.classList.contains('disabled');

                // Try to enable the button by triggering more events on input
                if (isDisabled && attempt <= 3) {
                    console.warn(`⚠️ Button DISABLED (attempt ${attempt}). Trying to trigger React state update...`);

                    // Re-focus and re-type with different events
                    inputEl.focus();
                    await delay(100);

                    // Use execCommand for older React versions (with deprecation safety)
                    try {
                        if (typeof document.execCommand === 'function') {
                            document.execCommand('selectAll', false);
                            document.execCommand('insertText', false, prompt);
                        }
                    } catch (cmdError) {
                        console.warn("execCommand fallback failed (deprecated API):", cmdError);
                    }

                    // Dispatch React-specific events
                    const nativeInputEvent = new InputEvent('input', {
                        bubbles: true,
                        cancelable: true,
                        inputType: 'insertText',
                        data: prompt
                    });
                    inputEl.dispatchEvent(nativeInputEvent);

                    // Also try change event
                    inputEl.dispatchEvent(new Event('change', { bubbles: true }));

                    // Blur to trigger validation
                    inputEl.blur();
                    await delay(500);
                    inputEl.focus();
                    await delay(500);
                    continue; // Retry finding button
                }

                // On later attempts, try clicking anyway (disabled might be just visual)
                console.log(`🖱️ Clicking generate button (disabled=${isDisabled})...`);

                // Full click simulation
                const rect = targetBtn.getBoundingClientRect();
                const clickOpts = {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                };

                // Remove disabled attribute temporarily if possible
                const wasDisabled = targetBtn.hasAttribute('disabled');
                if (wasDisabled) {
                    targetBtn.removeAttribute('disabled');
                }

                targetBtn.dispatchEvent(new PointerEvent('pointerdown', { ...clickOpts, pointerType: 'mouse' }));
                targetBtn.dispatchEvent(new MouseEvent('mousedown', clickOpts));
                await delay(50);
                targetBtn.dispatchEvent(new PointerEvent('pointerup', { ...clickOpts, pointerType: 'mouse' }));
                targetBtn.dispatchEvent(new MouseEvent('mouseup', clickOpts));
                targetBtn.dispatchEvent(new MouseEvent('click', clickOpts));
                targetBtn.click();

                // Restore disabled if we removed it
                if (wasDisabled) {
                    targetBtn.setAttribute('disabled', '');
                }

                clicked = true;
                console.log("✅ Generate button clicked!");
            } else {
                console.warn(`⚠️ No generate button found on attempt ${attempt}`);
            }

            if (clicked) {
                await delay(3000);

                // Check for Veo switch banner AFTER clicking generate
                // Banner: "This feature isn't supported on Veo 3.1 - Quality/Fast"
                // If banner appears → click switch → click generate AGAIN
                const bannerHandled = await autoHandleVeoSwitchBanner();
                if (bannerHandled) {
                    console.log("🔄 Veo switched! Re-clicking Generate...");
                    await delay(2000);

                    // Re-check duplicates after switch banner interactions.
                    await normalizeVideoReferenceChips(inputEl, 1);

                    // Find generate button again and click
                    const retryIcons = findAllElementsDeep('i.google-symbols, i[class*="google-symbols"]');
                    for (const icon of retryIcons) {
                        if (icon.textContent?.trim() === 'arrow_forward') {
                            const parentBtn = icon.closest('button');
                            if (parentBtn) {
                                const r = parentBtn.getBoundingClientRect();
                                if (r.width <= 70 && r.height <= 70) {
                                    console.log("🎯 Re-clicking generate button...");
                                    (parentBtn as HTMLElement).click();
                                    (parentBtn as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
                                    console.log("✅ Generate re-clicked after Veo switch!");
                                    await delay(2000);
                                    break;
                                }
                            }
                        }
                    }
                }

                return true;
            }
            await delay(1500);
        }
    } else {
        console.error("❌ CRITICAL: Prompt input not found.");
        return false;
    }
    return false;
};

// --- Wait Logic ---
const waitForGenerationComplete = async (selectors: AutomationSelectors, timeout = 180000): Promise<boolean> => {
    const startTime = Date.now();
    let lastProgress = 0;

    console.log("⏳ Waiting for image generation to complete...");

    while (Date.now() - startTime < timeout) {
        // Strategy 1: Look for progress indicators in specific contexts
        // Avoid false positives by looking for progress bars or specific containers
        const progressContainers = findAllElementsDeep('[role="progressbar"], [class*="progress"], [class*="loading"]');
        for (const container of progressContainers) {
            const progressText = container.textContent || '';
            const ariaValue = container.getAttribute('aria-valuenow');

            // Check aria-valuenow (standard progress bar)
            if (ariaValue && parseInt(ariaValue) >= 100) {
                console.log("✅ Generation complete (aria-valuenow = 100)");
                return true;
            }

            // Check text in progress container only
            const percentMatch = progressText.match(/(\d+)\s*%/);
            if (percentMatch) {
                const progress = parseInt(percentMatch[1]);
                if (progress !== lastProgress) {
                    console.log(`📊 Generation progress: ${progress}%`);
                    lastProgress = progress;
                }
                if (progress >= 100) {
                    console.log("✅ Generation complete (100%)");
                    return true;
                }
            }
        }

        // Strategy 2: Check for completion triggers (but in button/interactive elements only)
        const interactiveElements = findAllElementsDeep('button, [role="button"], a');
        for (const el of interactiveElements) {
            const txt = (el.textContent || '').trim();
            if (selectors.generation.addToPromptTriggers.some(t => txt.includes(t))) {
                console.log(`✅ Found completion trigger: "${txt}"`);
                return true;
            }
        }

        // Strategy 3: Check if a new image appeared (result image)
        const images = findAllElementsDeep('img');
        const resultImages = images.filter(img => {
            const i = img as HTMLImageElement;
            const src = i.src || '';
            // Look for generated images (usually blob URLs or specific patterns)
            return (src.startsWith('blob:') || src.includes('generated') || src.includes('result'))
                && i.naturalWidth > 200 && i.naturalHeight > 200;
        });

        if (resultImages.length > 0) {
            console.log("✅ Generated image detected");
            await delay(1000); // Give it a moment to fully render
            return true;
        }

        await delay(2000);
    }

    console.warn("⚠️ Generation timeout reached");
    return false;
};

const waitForVideoComplete = async (timeout = 300000): Promise<string | null> => {
    const startTime = Date.now();
    let lastProgress = -1;

    console.log("⏳ Waiting for video generation...");

    while (Date.now() - startTime < timeout) {
        // Strategy 1: Check progress percentage
        const allElements = findAllElementsDeep('div, span, p');
        for (const el of allElements) {
            const text = (el.textContent || '').trim();
            const rect = el.getBoundingClientRect();

            // Only check small elements that likely show progress
            if (rect.width > 300 || rect.height > 100) continue;

            const percentMatch = text.match(/^(\d+)\s*%$/);
            if (percentMatch) {
                const progress = parseInt(percentMatch[1]);
                if (progress !== lastProgress) {
                    console.log(`🎬 Video generation progress: ${progress}%`);
                    lastProgress = progress;
                }
                if (progress >= 100) {
                    console.log("✅ Video generation complete (100%)");
                    await delay(2000); // Wait for video to render
                    break;
                }
            }
        }

        // Strategy 2: Check for video element with src
        const videos = findAllElementsDeep('video');
        for (const v of videos) {
            const vid = v as HTMLVideoElement;
            if (vid.src && vid.src.length > 50) {
                console.log("✅ Video element found with src:", vid.src.substring(0, 80));
                return vid.src;
            }
        }

        // Strategy 3: Check for download button (indicates video is ready)
        const buttons = findAllElementsDeep('button, a');
        for (const btn of buttons) {
            const text = (btn.textContent || '').toLowerCase();
            if (text.includes('download') || text.includes('ดาวน์โหลด')) {
                console.log("✅ Download button detected - video should be ready");
                // Try to find video again
                const vids = findAllElementsDeep('video');
                for (const v of vids) {
                    const vid = v as HTMLVideoElement;
                    if (vid.src && vid.src.length > 50) return vid.src;
                }
            }
        }

        await delay(5000);
    }

    console.warn("⚠️ Video generation timeout");
    return null;
};

/**
 * Capture the most recent generated image as base64
 * Used to upload as reference for Scene 2/3 to maintain consistency
 */
const captureGeneratedImageBase64 = async (): Promise<string | null> => {
    console.log("📸 Capturing generated image as base64...");

    try {
        // Find all images
        const images = findAllElementsDeep('img');
        const candidateImages = images.filter(img => {
            const i = img as HTMLImageElement;
            const hasSize = (i.naturalWidth > 200 && i.naturalHeight > 200) || (i.width > 200 && i.height > 200);
            const isVisible = i.offsetParent !== null;
            // Skip UI icons, logos, etc.
            const src = i.src || '';
            const isGenerated = src.includes('blob:') || src.includes('data:') || src.includes('generated') || src.includes('output');
            return hasSize && isVisible && (isGenerated || i.naturalWidth > 400);
        });

        console.log(`📷 Found ${candidateImages.length} candidate generated images`);

        if (candidateImages.length === 0) {
            console.warn("⚠️ No generated image found to capture");
            return null;
        }

        // Get the last (most recent) image
        const targetImg = candidateImages[candidateImages.length - 1] as HTMLImageElement;
        console.log(`📸 Capturing image: ${targetImg.src?.substring(0, 60)}...`);

        // Create canvas and draw image
        const canvas = document.createElement('canvas');
        canvas.width = targetImg.naturalWidth || targetImg.width;
        canvas.height = targetImg.naturalHeight || targetImg.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.warn("⚠️ Could not get canvas context");
            return null;
        }

        // Handle CORS - try to draw directly first
        try {
            ctx.drawImage(targetImg, 0, 0, canvas.width, canvas.height);
            const base64 = canvas.toDataURL('image/png');
            console.log(`✅ Captured image: ${base64.substring(0, 50)}... (${base64.length} chars)`);
            return base64;
        } catch (corsError) {
            console.log("⚠️ CORS error, trying fetch approach...");

            // Try fetching the image
            try {
                const response = await fetch(targetImg.src);
                const blob = await response.blob();
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64 = reader.result as string;
                        console.log(`✅ Captured via fetch: ${base64.substring(0, 50)}...`);
                        resolve(base64);
                    };
                    reader.onerror = () => {
                        console.warn("⚠️ FileReader error");
                        resolve(null);
                    };
                    reader.readAsDataURL(blob);
                });
            } catch (fetchError) {
                console.warn("⚠️ Fetch failed:", fetchError);
                return null;
            }
        }
    } catch (error) {
        console.error("❌ Error capturing image:", error);
        return null;
    }
};

/**
 * Capture the last frame from the generated video as base64
 * Used as reference image for the next scene to maintain visual continuity
 */
const captureVideoLastFrame = async (): Promise<string | null> => {
    console.log("🎞️ Capturing last frame from generated video...");

    try {
        const videos = findAllElementsDeep('video');
        const candidateVideos = videos.filter(v => {
            const vid = v as HTMLVideoElement;
            const hasSize = vid.videoWidth > 200 || vid.offsetWidth > 200;
            const isVisible = vid.offsetParent !== null;
            return hasSize && isVisible;
        });

        if (candidateVideos.length === 0) {
            console.warn("⚠️ No video found to capture frame from");
            return null;
        }

        const target = candidateVideos[candidateVideos.length - 1] as HTMLVideoElement;
        console.log(`🎥 Found video: ${target.videoWidth}x${target.videoHeight}, duration=${target.duration?.toFixed(1)}s`);

        // Seek to last frame
        if (target.duration && isFinite(target.duration) && target.duration > 0) {
            target.currentTime = Math.max(0, target.duration - 0.1);
            // Wait for seek to complete
            await new Promise<void>((resolve) => {
                const onSeeked = () => { target.removeEventListener('seeked', onSeeked); resolve(); };
                target.addEventListener('seeked', onSeeked);
                setTimeout(resolve, 2000); // Fallback timeout
            });
        }

        // Capture via canvas
        const canvas = document.createElement('canvas');
        canvas.width = target.videoWidth || target.offsetWidth || 720;
        canvas.height = target.videoHeight || target.offsetHeight || 1280;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.warn("⚠️ Could not get canvas context");
            return null;
        }

        ctx.drawImage(target, 0, 0, canvas.width, canvas.height);
        const base64 = canvas.toDataURL('image/png');
        console.log(`✅ Captured last frame: ${canvas.width}x${canvas.height} (${(base64.length / 1024).toFixed(0)} KB)`);
        return base64;
    } catch (error) {
        console.error("❌ Error capturing video frame:", error);
        return null;
    }
};

/**
 * Upload reference image to the expanded clip view
 * Used for Scene 2/3 to maintain character/product consistency
 */
const uploadReferenceImageToExpandedClip = async (base64Image: string, selectors: AutomationSelectors): Promise<boolean> => {
    console.log("📷 Uploading reference image to expanded clip...");

    if (!base64Image) {
        console.warn("⚠️ No reference image provided");
        return false;
    }

    try {
        // Convert base64 to File
        const arr = base64Image.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        const file = new File([u8arr], 'reference.png', { type: mime });
        console.log(`✅ Reference file created: ${file.size} bytes`);

        // Find upload button in expanded clip view (look for "add" icon)
        for (let attempt = 0; attempt < 5; attempt++) {
            console.log(`🔄 Looking for upload slot in expanded clip (Attempt ${attempt + 1}/5)...`);
            await delay(1000);

            const allButtons = findAllElementsDeep('button');
            let addBtn: HTMLElement | null = null;

            for (const button of allButtons) {
                const rect = button.getBoundingClientRect();
                if (rect.width < 40 || rect.height < 40) continue;

                const icon = button.querySelector('i, .material-icons, .google-symbols');
                const iconText = icon?.textContent?.trim() || '';
                const hasAddIcon = iconText === 'add' || iconText === 'add_circle' || iconText === 'add_photo_alternate';
                const hasImage = button.querySelector('img') !== null;

                if (hasAddIcon && !hasImage) {
                    addBtn = button as HTMLElement;
                    console.log(`✅ Found empty add button for reference upload`);
                    break;
                }
            }

            if (addBtn) {
                // Click to open file dialog
                addBtn.click();
                await delay(1500);

                // Find file input
                const fileInputs = findAllElementsDeep('input[type="file"]');
                const fileInput = fileInputs[fileInputs.length - 1] as HTMLInputElement;

                if (fileInput) {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    fileInput.files = dt.files;
                    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                    console.log("✅ Reference image injected!");

                    await delay(2000);

                    // Try to click confirm button
                    const confirmButtons = findAllElementsDeep('button');
                    for (const btn of confirmButtons) {
                        const text = (btn.textContent || '').trim().toLowerCase();
                        if (text.includes('ยืนยัน') || text.includes('confirm') || text.includes('done') || text.includes('ok')) {
                            (btn as HTMLElement).click();
                            console.log("✅ Clicked confirm button");
                            await delay(1500);
                            break;
                        }
                    }

                    return true;
                }
            }
        }

        console.warn("⚠️ Could not find upload slot in expanded clip");
        return false;

    } catch (error) {
        console.error("❌ Error uploading reference image:", error);
        return false;
    }
};

const clickOnGeneratedImage = async (selectors: AutomationSelectors): Promise<boolean> => {
    console.log("🖱️ Searching for generated image to HOVER...");
    await delay(2000);

    // Find generated images
    const images = findAllElementsDeep('img');
    const candidateImages = images.filter(img => {
        const i = img as HTMLImageElement;
        const hasSize = (i.naturalWidth > 200 && i.naturalHeight > 200) || (i.width > 200 && i.height > 200);
        const isVisible = i.offsetParent !== null;
        return hasSize && isVisible;
    });

    console.log(`📷 Found ${candidateImages.length} candidate images`);

    if (candidateImages.length > 0) {
        // Get the last (most recent) image
        const target = candidateImages[candidateImages.length - 1];
        const parent = target.closest('button, a, [role="button"], div[class*="card"], div[class*="result"]') || target;
        const hoverTarget = parent as HTMLElement;

        console.log("✅ Found generated image, HOVERING to reveal buttons...");

        // HOVER simulation (mouseenter, mouseover, mousemove)
        const rect = hoverTarget.getBoundingClientRect();
        const hoverOpts = {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2
        };

        hoverTarget.dispatchEvent(new MouseEvent('mouseenter', hoverOpts));
        hoverTarget.dispatchEvent(new MouseEvent('mouseover', hoverOpts));
        hoverTarget.dispatchEvent(new MouseEvent('mousemove', hoverOpts));

        // Wait for hover UI to appear
        console.log("⏳ Waiting for hover UI to appear...");
        await delay(2000);

        // ========== STEP 2: Click "เพิ่มไปยังพรอมต์" / "Add to prompt" ==========
        console.log("🔍 Looking for 'Add to prompt' button...");

        const addToPromptTriggers = [
            ...selectors.generation.addToPromptTriggers,
            'เพิ่มไปยังพรอมต์',
            'Add to prompt',
            'เพิ่มไปยัง',
            'Add to',
            'ใช้ภาพนี้',
            'Use this image',
            'เลือก',
            'Select'
        ];

        // Try to find and click the "Add to prompt" button
        for (let attempt = 1; attempt <= 5; attempt++) {
            console.log(`🔄 Looking for 'Add to prompt' (Attempt ${attempt})...`);

            const buttons = findAllElementsDeep('button, [role="button"], a');
            for (const btn of buttons) {
                const text = (btn.textContent || '').trim();
                const rect = btn.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                if (addToPromptTriggers.some(t => text.includes(t))) {
                    console.log(`✅ Found "Add to prompt" button: "${text}"`);

                    // Click it
                    const btnRect = btn.getBoundingClientRect();
                    const btnClickOpts = {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        clientX: btnRect.left + btnRect.width / 2,
                        clientY: btnRect.top + btnRect.height / 2
                    };

                    (btn as HTMLElement).dispatchEvent(new PointerEvent('pointerdown', { ...btnClickOpts, pointerType: 'mouse' }));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('mousedown', btnClickOpts));
                    await delay(50);
                    (btn as HTMLElement).dispatchEvent(new PointerEvent('pointerup', { ...btnClickOpts, pointerType: 'mouse' }));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('mouseup', btnClickOpts));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('click', btnClickOpts));
                    (btn as HTMLElement).click();

                    console.log("✅ 'Add to prompt' clicked! Should transition to video mode...");
                    await delay(2000); // Wait for transition
                    return true;
                }
            }

            await delay(1000);
        }

        console.warn("⚠️ Could not find 'Add to prompt' button, but image was clicked");
        return true; // Still return true as image was clicked
    }

    console.warn("⚠️ No generated image found to click.");
    return false;
};

const switchToVideoModeAndGenerate = async (
    videoPrompt: string,
    selectors: AutomationSelectors,
    requestedAspectRatio?: string
): Promise<boolean> => {
    console.log("🎬 Switching to Video Mode...");
    await delay(2000);

    // Video mode triggers (Thai + English)
    const videoModeTriggers = ['Frames to Video', 'Frames to video', 'Frames To Video', 'เฟรมเป็นวิดีโอ', ...selectors.generation.videoTabTriggers];
    // Dropdown button triggers (Thai + English) - for fallback
    const dropdownTriggers = ['สร้างรูปภาพ', 'Create Image', 'Create image', 'สร้างภาพ'];

    // ===== CHECK: Are we already in "Frames to Video" mode? =====
    // After clicking "Add to prompt", the UI often auto-switches to Frames to Video.
    // If already correct, skip all clicking and go straight to fill prompt.
    let alreadyInVideoMode = false;

    const checkButtons = findAllElementsDeep('button[role="combobox"], button');
    for (const btn of checkButtons) {
        const text = (btn.textContent || '').trim();
        const rect = btn.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const hasDropdownIcon = !!(btn.querySelector('i')?.textContent?.includes('arrow_drop_down'));
        const isVideoMode = videoModeTriggers.some(trigger =>
            text.toLowerCase().includes(trigger.toLowerCase())
        );

        if (isVideoMode && (hasDropdownIcon || text.length < 40)) {
            console.log(`✅ Already in 'Frames to Video' mode! Button shows: "${text.substring(0, 40)}" — skipping dropdown clicks.`);
            alreadyInVideoMode = true;
            break;
        }
    }

    // Only do dropdown interaction if NOT already in video mode
    if (!alreadyInVideoMode) {
        console.log("🔍 Not in Frames to Video mode yet. Switching...");

        // Look for "Create Image" or similar dropdown and click to open it
        let dropdownOpened = false;

        for (let attempt = 1; attempt <= 3 && !dropdownOpened; attempt++) {
            console.log(`🔄 Dropdown open attempt ${attempt}/3...`);
            const buttons = findAllElementsDeep('button[role="combobox"], button');
            for (const btn of buttons) {
                const text = (btn.textContent || '').trim();
                const rect = btn.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                const hasDropdownIcon = !!(btn.querySelector('i')?.textContent?.includes('arrow_drop_down'));
                const matchesTrigger = dropdownTriggers.some(trigger => text.includes(trigger));

                if (matchesTrigger || (hasDropdownIcon && text.length < 40)) {
                    console.log(`✅ Found dropdown to switch: "${text.substring(0, 40)}" hasIcon=${hasDropdownIcon}`);
                    await robustElementClick(btn as HTMLElement);
                    dropdownOpened = true;
                    break;
                }
            }

            if (!dropdownOpened) {
                await delay(1000);
            }
        }

        if (!dropdownOpened) {
            console.warn("⚠️ Could not find any dropdown button to switch mode");
        }

        // Wait for dropdown menu to appear
        await delay(2000);

        // Select "Frames to Video" menu item from dropdown
        console.log("🔍 Looking for 'Frames to Video' menu item in dropdown...");
        let menuItemClicked = false;

        for (let attempt = 1; attempt <= 5 && !menuItemClicked; attempt++) {
            console.log(`🔄 Attempt ${attempt} to find menu item...`);

            const menuItems = findAllElementsDeep('div[role="menuitem"], div[role="option"], button, div, span');

            let bestCandidate: Element | null = null;
            let bestSize = Infinity;

            for (const item of menuItems) {
                const text = (item.textContent || '').trim();
                const rect = item.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                if (text.includes('เฟรม') || text.toLowerCase().includes('frames')) {
                    console.log(`   Candidate: "${text.substring(0, 40)}" [${rect.width.toFixed(0)}x${rect.height.toFixed(0)}]`);
                }

                const isSmallSize = rect.width < 300 && rect.height < 60;
                const matchesTrigger = videoModeTriggers.some(trigger => {
                    const lowerText = text.toLowerCase();
                    const lowerTrigger = trigger.toLowerCase();
                    return text === trigger ||
                        text.endsWith(trigger) ||
                        lowerText === lowerTrigger ||
                        lowerText.endsWith(lowerTrigger) ||
                        text.includes('photo_merge_auto' + trigger);
                });

                if (matchesTrigger && isSmallSize) {
                    const size = rect.width * rect.height;
                    if (size < bestSize) {
                        bestSize = size;
                        bestCandidate = item;
                        console.log(`   ✨ Best candidate so far: "${text.substring(0, 40)}"`);
                    }
                }
            }

            if (bestCandidate) {
                const text = (bestCandidate.textContent || '').trim();
                const rect = bestCandidate.getBoundingClientRect();
                console.log(`✅ Clicking menu item: "${text}" [${rect.width.toFixed(0)}x${rect.height.toFixed(0)}]`);
                await robustElementClick(bestCandidate as HTMLElement);
                menuItemClicked = true;
            }

            if (!menuItemClicked) {
                await delay(1000);
            }
        }

        if (!menuItemClicked) {
            console.warn("⚠️ Could not find 'Frames to Video' menu item");
        }
    }

    // Handle "Switch to Veo 3.1" banner (Frames to Video needs Fast)
    await autoHandleVeoSwitchBanner();

    // Wait for video mode to fully load
    console.log("⏳ Waiting 3 seconds for video mode to load...");
    await delay(3000);

    // Fill video prompt and generate
    console.log("🎬 Filling Video Prompt...");
    console.log(`🔍 Detecting flow: Checking for Veo mode indicators...`);
    const normalizedPrompt = finalizeVideoPrompt(videoPrompt, requestedAspectRatio);
    console.log(`📊 Flow: ${normalizedPrompt.length > 500 ? 'Image-to-Video (long prompt)' : 'Veo (short prompt)'}`);
    return await fillPromptAndGenerate(normalizedPrompt);
};

// รอให้ทุก clip gen เสร็จ 100% ก่อน download
const waitForAllClipsComplete = async (maxWaitMs: number = 300000, expectedClipCount: number = 0): Promise<boolean> => {
    console.log(`⏳ Waiting for all clips to complete 100%... (Expected: ${expectedClipCount || 'unknown'} clips)`);
    const startTime = Date.now();
    const checkInterval = 3000; // เช็คทุก 3 วินาที
    let consecutiveCompleteChecks = 0; // ต้องเช็คผ่าน 2 ครั้งติดกัน

    while (Date.now() - startTime < maxWaitMs) {
        // ===== 1. เช็คว่ามี loading/progress/spinner อยู่ไหม =====
        const loadingIndicators = findAllElementsDeep(
            '[class*="loading"], [class*="progress"], [class*="spinner"], ' +
            '[class*="generating"], [aria-busy="true"], [class*="pending"]'
        );

        // กรองเฉพาะ element ที่ visible
        const visibleLoading = loadingIndicators.filter(el => {
            const rect = (el as HTMLElement).getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
        });

        // ===== 2. เช็ค progress percentage ของทุก clip =====
        let allProgressAt100 = true;
        let foundProgressElements = 0;
        const allTextElements = findAllElementsDeep('div, span, p');

        for (const el of allTextElements) {
            const text = (el.textContent || '').trim();
            const rect = (el as HTMLElement).getBoundingClientRect();

            // มองหา percentage display (เช่น "50%", "100%")
            if (rect.width > 0 && rect.width < 150 && rect.height > 0 && rect.height < 60) {
                const percentMatch = text.match(/^(\d+)\s*%$/);
                if (percentMatch) {
                    const percent = parseInt(percentMatch[1]);
                    foundProgressElements++;
                    console.log(`  📊 Found progress: ${percent}%`);
                    if (percent < 100) {
                        allProgressAt100 = false;
                    }
                }
            }
        }

        // ===== 3. เช็คว่าปุ่ม download พร้อมใช้งานไหม =====
        const downloadIcons = findAllElementsDeep('i.google-symbols');
        let downloadReady = false;

        for (const icon of downloadIcons) {
            if (icon.textContent?.trim() === 'download') {
                const btn = icon.closest('button');
                if (btn) {
                    const isDisabled = btn.hasAttribute('disabled') ||
                        btn.getAttribute('aria-disabled') === 'true' ||
                        btn.classList.contains('disabled');
                    if (!isDisabled) {
                        downloadReady = true;
                        break;
                    }
                }
            }
        }

        // ===== 4. เช็ค video thumbnails ในไทม์ไลน์ =====
        const allVideosForCount = findAllElementsDeep('video');
        const timelineLikeVideos = allVideosForCount.filter(v => {
            const vid = v as HTMLVideoElement;
            const rect = vid.getBoundingClientRect();
            // Timeline thumbs are usually smaller than the main preview
            const sizeOk = rect.width > 30 && rect.height > 30 && rect.width < 420 && rect.height < 420;
            // Accept videos even if readyState is low (they may be lazy-loaded in timeline)
            return sizeOk && (vid.readyState >= 1 || vid.src || vid.currentSrc);
        });

        const clipCountOk = expectedClipCount <= 0 || timelineLikeVideos.length >= expectedClipCount;

        console.log(
            `  Checking: loading=${visibleLoading.length}, progress100=${allProgressAt100}, downloadReady=${downloadReady}, timelineVideos=${timelineLikeVideos.length}, expected=${expectedClipCount || 'n/a'}`
        );

        // ===== 5. ตรวจสอบว่าเสร็จสมบูรณ์หรือยัง =====
        // Primary: progress + download + no loading = complete
        // Timeline video count is a bonus check, NOT a hard requirement
        // (scene builder may render clips as canvas/thumbnails, not <video> elements)
        const coreComplete = visibleLoading.length === 0 && downloadReady && allProgressAt100;
        const isComplete = coreComplete && clipCountOk;

        // Fallback: if core signals say done but timeline videos not found, accept after 3 checks (~9s)
        if (coreComplete && !clipCountOk) {
            consecutiveCompleteChecks++;
            console.log(`  ⏳ Core complete but timelineVideos=${timelineLikeVideos.length}/${expectedClipCount}, fallback check ${consecutiveCompleteChecks}/3`);
            if (consecutiveCompleteChecks >= 3) {
                console.log("✅ Core signals confirmed complete (progress=100%, download ready, no loading). Proceeding.");
                await delay(2000);
                return true;
            }
            await delay(checkInterval);
            continue;
        }

        if (isComplete) {
            consecutiveCompleteChecks++;
            console.log(`  ✓ Completion check ${consecutiveCompleteChecks}/2 passed`);

            // ต้องผ่านการเช็ค 2 ครั้งติดกัน เพื่อให้แน่ใจว่าไม่ใช่ flash state
            if (consecutiveCompleteChecks >= 2) {
                console.log("✅ All clips appear complete! Waiting 5 seconds for full render...");
                await delay(5000);

                // Double-check ครั้งสุดท้ายหลังจากรอ 5 วินาที
                const finalLoadingCheck = findAllElementsDeep(
                    '[class*="loading"], [class*="progress"], [class*="spinner"], [class*="generating"]'
                ).filter(el => {
                    const rect = (el as HTMLElement).getBoundingClientRect();
                    return rect.width > 0 && rect.height > 0;
                });

                if (finalLoadingCheck.length === 0) {
                    console.log("✅ Final check passed! All clips confirmed complete!");
                    return true;
                } else {
                    console.log(`⚠️ Final check found ${finalLoadingCheck.length} loading elements, continuing to wait...`);
                    consecutiveCompleteChecks = 0; // Reset counter
                }
            }
        } else {
            consecutiveCompleteChecks = 0; // Reset if not complete

            // ถ้าไม่มี loading แต่ปุ่ม download ยังไม่พร้อม ให้รอเพิ่ม
            if (visibleLoading.length === 0 && !downloadReady) {
                console.log("  No loading but download not ready, waiting...");
            }
        }

        await delay(checkInterval);
    }

    console.warn("⚠️ Timeout waiting for clips to complete");
    return false;
};

// รอให้ VideoFX export วิดีโอรวมเสร็จ (หลังกดปุ่ม Download)
const waitForExportComplete = async (maxWaitMs: number = 180000): Promise<boolean> => {
    console.log("⏳ Waiting for video export to complete...");
    const startTime = Date.now();
    const checkInterval = 2000;
    let exportStarted = false;
    let noExportFoundCount = 0;

    while (Date.now() - startTime < maxWaitMs) {
        // หา export progress indicators (dialog, modal, progress bar)
        const allElements = findAllElementsDeep('div, span, p, dialog, [role="dialog"], [role="alertdialog"]');

        let isExporting = false;
        let exportProgress = '';

        for (const el of allElements) {
            const text = (el.textContent || '').trim().toLowerCase();
            const rect = (el as HTMLElement).getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            // เช็ค text ที่บอกว่ากำลัง export (Thai + English)
            const exportKeywords = [
                'exporting', 'rendering', 'processing', 'preparing',
                'กำลังส่งออก', 'กำลังประมวลผล', 'กำลังเตรียม', 'กำลังสร้าง',
                'generating', 'creating video', 'combining'
            ];

            for (const keyword of exportKeywords) {
                if (text.includes(keyword)) {
                    isExporting = true;
                    exportProgress = text.substring(0, 50);
                    break;
                }
            }

            // เช็ค percentage ใน export dialog
            const percentMatch = text.match(/(\d+)\s*%/);
            if (percentMatch && rect.width > 100 && rect.width < 500) {
                // อาจเป็น export progress
                const percent = parseInt(percentMatch[1]);
                if (percent > 0 && percent < 100) {
                    isExporting = true;
                    exportProgress = `${percent}%`;
                }
            }
        }

        // เช็ค modal/dialog ที่กำลังแสดง
        const modals = findAllElementsDeep('[role="dialog"], [role="alertdialog"], [class*="modal"], [class*="dialog"]');
        const visibleModals = modals.filter(m => {
            const rect = (m as HTMLElement).getBoundingClientRect();
            return rect.width > 50 && rect.height > 50;
        });

        if (isExporting || visibleModals.length > 0) {
            exportStarted = true;
            noExportFoundCount = 0;
            console.log(`  📥 Export in progress... ${exportProgress}`);
        } else if (exportStarted) {
            noExportFoundCount++;
            console.log(`  📥 Export dialog gone (check ${noExportFoundCount}/3)...`);

            // ต้องเห็น dialog หายไป 3 ครั้งติดกัน (6 วินาที) ถึงจะถือว่าเสร็จ
            if (noExportFoundCount >= 3) {
                console.log("✅ Export completed! (dialog disappeared)");
                await delay(2000); // รอเพิ่มให้ download เริ่ม
                return true;
            }
        } else {
            // ยังไม่เห็น export dialog เลย - อาจ download ตรงๆ
            noExportFoundCount++;
            console.log(`  📥 No export dialog found (check ${noExportFoundCount}/5)...`);

            // ถ้าไม่เห็น export 5 ครั้งติดกัน (10 วินาที) = อาจไม่ต้อง export
            if (noExportFoundCount >= 5) {
                console.log("✅ No export dialog detected, download may proceed directly");
                await delay(3000);
                return true;
            }
        }

        await delay(checkInterval);
    }

    console.warn("⚠️ Export wait timeout");
    return false;
};

const handleVideoDownload = async (selectors: AutomationSelectors): Promise<string | null> => {
    console.log("💾 Attempting Auto-Download...");

    // 1. Try clicking Download button if available (google-symbols icon "download")
    const downloadIcons = findAllElementsDeep('i.google-symbols');
    for (const icon of downloadIcons) {
        if (icon.textContent?.trim() === 'download') {
            const btn = icon.closest('button') as HTMLElement;
            if (btn) {
                console.log("✅ Found download button, clicking...");
                btn.click();

                // รอให้ VideoFX export วิดีโอรวมเสร็จ (สำหรับ multi-clip)
                console.log("⏳ Waiting for export to complete (up to 5 mins)...");
                const exportComplete = await waitForExportComplete(300000);

                if (exportComplete) {
                    console.log("✅ Export completed, download should be in progress!");
                    return "Download Complete (Export Finished)";
                } else {
                    console.warn("⚠️ Export timeout, download may still work");
                    return "Download Triggered (Export Status Unknown)";
                }
            }
        }
    }

    // 2. Fallback: Try clicking by text
    const downloadClicked = await clickByText(selectors.download.downloadButtonTriggers, 'button, a');
    if (downloadClicked) {
        console.log("✅ Download button clicked.");
        // We can't easily track the filename from here without chrome.downloads API usage in background
        // But for consistency we return a success indicator
        return "Manual Download Triggered";
    }

    // 2. Direct Video Source Extraction (Smart Download)
    const videos = findAllElementsDeep('video');
    // Find the main video (largest or longest duration placeholder)
    const mainVideo = videos.find(v => {
        const vid = v as HTMLVideoElement;
        return vid.src && vid.src.startsWith('http') && vid.videoWidth > 200;
    }) as HTMLVideoElement;

    if (mainVideo) {
        console.log("✅ Found Video Source:", mainVideo.src);

        // Trigger download via Chrome Messaging (if in extension)
        if (chrome && chrome.runtime) {
            try {
                chrome.runtime.sendMessage({
                    type: "DOWNLOAD_VIDEO",
                    url: mainVideo.src,
                    filename: `Netflow_Gen_${Date.now()}.mp4`
                });
                return mainVideo.src;
            } catch (e) {
                console.error("Chrome Download msg failed", e);
            }
        }

        // Fallback: Create A tag
        const a = document.createElement('a');
        a.href = mainVideo.src;
        a.download = `Netflow_Gen_${Date.now()}.mp4`;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return mainVideo.src;
    }

    return null;
};

// ========== MAIN PIPELINE ==========
export interface PipelineConfig {
    characterImage: string;
    productImage: string;
    imagePrompt: string;
    videoPrompt: string;
    aspectRatio?: string;
}

export const runTwoStagePipeline = async (
    config: PipelineConfig,
    onProgress?: (step: string, current: number, total: number) => void
): Promise<{
    success: boolean;
    generatedImageUrl?: string;
    videoUrl?: string;
    error?: string;
}> => {
    console.log("🚀 Starting Pipeline - Hybrid Remote Mode");

    // Reset upload state for fresh pipeline run
    resetUploadState();

    const report = (step: string, current: number, total: number) => {
        if (onProgress) onProgress(step, current, total);
        console.log(`[Progress ${current}/${total}] ${step}`);
    };

    try {
        // 1. Initialize Remote Config
        report("Initializing Remote Configurations...", 1, 12);
        const configService = RemoteConfigService.getInstance();
        await configService.init(); // Can pass valid URL here if needed
        const selectors = configService.getSelectors();

        console.log("👀 Checking State...");

        // 2. Check if already in workspace
        let inWorkspace = isInWorkspace(selectors);

        if (!inWorkspace) {
            report("Navigating to Workspace...", 2, 12);
            console.log("ℹ️ Not in workspace. Must find 'New Project'...");
            let clicked = false;

            // Loop until we get in, or timeout (try for 10 seconds)
            for (let attempt = 0; attempt < 10; attempt++) {
                // STRATEGY: Text Search using Remote Triggers + Deep Search
                const dashboardKeywords = selectors.dashboard.newProjectTriggers;

                // Use Deep Search for "New Project" buttons too
                const allElements = findAllElementsDeep('*');

                for (const kw of dashboardKeywords) {
                    const elements = allElements.filter(el =>
                        el.children.length === 0 && el.textContent?.includes(kw)
                    );
                    for (const el of elements) {
                        (el as HTMLElement).click();
                        // Try Parent (Card)
                        let parent = el.parentElement;
                        for (let p = 0; p < 5; p++) {
                            if (parent) {
                                try {
                                    const opts = { bubbles: true, cancelable: true, view: window };
                                    parent.dispatchEvent(new MouseEvent('click', opts));
                                } catch (e) { }
                                parent = parent.parentElement;
                            }
                        }
                        clicked = true;
                    }
                }

                if (clicked) {
                    console.log("✅ Click command sent. Waiting...");
                    await delay(3000);
                    if (isInWorkspace(selectors)) {
                        console.log("✅ Entered Workspace!");
                        inWorkspace = true;
                        break;
                    }
                }

                // If text failed, use KEYBOARD FORCE (Legacy fallback is robust)
                if (!clicked) {
                    console.log("🎹 Trying Keyboard Tab...");
                    document.body.focus();
                    for (let k = 0; k < 10; k++) {
                        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', code: 'Tab', bubbles: true }));
                        await delay(50);
                        const active = document.activeElement as HTMLElement;
                        const activeText = active ? active.innerText : '';

                        // Check if focused element matches any trigger
                        if (active && selectors.dashboard.newProjectTriggers.some(t => activeText.includes(t))) {
                            active.click();
                            active.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
                            clicked = true;
                            // Wait to see if it worked
                            await delay(2000);
                            if (isInWorkspace(selectors)) {
                                inWorkspace = true;
                                break;
                            }
                        }
                    }
                }

                // Coordinate Fallback
                if (!inWorkspace) {
                    // ... (Coordinates are universal, kept same)
                }

                if (inWorkspace) break;
                console.log("🔄 Retry finding start button...");
                await delay(1000);
            }
        } else {
            console.log("✅ Already in workspace (Image tab detected).");
        }

        // ==================== EXECUTE ====================

        if (!isInWorkspace(selectors) && !inWorkspace) {
            console.warn("⚠️ Could not confirm workspace entry. Proceeding anyway...");
        }

        // Required checkpoint #1: right after opening project/workspace, sync ratio to app input.
        console.log("🎛️ Aspect ratio check #1 (after project open)");
        const ratioOkAtStart = await ensureAspectRatioMatchesInput(config.aspectRatio);
        if (!ratioOkAtStart) {
            throw new Error("Aspect Ratio mismatch after project open. Stop before generation.");
        }
        await delay(600);

        // --- STEP 1: UPLOAD & GENERATE IMAGE ---
        console.log("🔹 STEP 1/3: Image Generation Phase");

        report("Switching to Image Mode...", 3, 12);
        await switchToImageTab(selectors);
        await delay(1500);

        // Upload 2 reference images (character + product)
        report("Uploading Character...", 4, 12);
        console.log("📷 Uploading Character Image...");
        const charUploadSuccess = await uploadSingleImage(config.characterImage, 1, selectors);
        if (!charUploadSuccess) {
            console.warn("⚠️ Character upload failed, continuing anyway...");
        }
        await delay(2000); // Wait for dialog to close

        report("Uploading Product...", 5, 12);
        console.log("📷 Uploading Product Image...");
        const shouldUploadProduct = !!config.productImage && config.productImage !== config.characterImage;
        const productUploadSuccess = shouldUploadProduct
            ? await uploadSingleImage(config.productImage, 2, selectors)
            : false;
        if (!shouldUploadProduct) {
            console.log("ℹ️ Skip product upload: missing or same as character image (prevents duplicate references)");
        }
        if (shouldUploadProduct && !productUploadSuccess) {
            console.warn("⚠️ Product upload failed, continuing anyway...");
        }
        await delay(2000);

        if (!charUploadSuccess && !productUploadSuccess) {
            throw new Error("Failed to upload any images.");
        }

        // Wait 10 seconds after upload before generating
        console.log("⏳ Waiting 10 seconds for images to fully load...");
        await delay(10000);

        report("Generating Base Image...", 6, 12);
        console.log("📝 Generating Base Image...");
        await fillPromptAndGenerate(config.imagePrompt);

        report("Waiting for Image Generation...", 7, 12);
        console.log("⏳ Waiting for Image Generation...");
        const imageGenSuccess = await waitForGenerationComplete(selectors);
        if (!imageGenSuccess) throw new Error("Image Gen Timeout");

        // Wait 15 seconds after image generation completes
        console.log("⏳ Waiting 15 seconds before clicking image...");
        await delay(15000);

        // --- STEP 2: IMAGE TO VIDEO ---
        console.log("🔹 STEP 2/3: Video Generation Phase");

        report("Selecting Generated Image...", 8, 12);
        // Click the result to open detail view and then click "เพิ่มไปยังพรอมต์"
        const imageClicked = await clickOnGeneratedImage(selectors);
        if (!imageClicked) throw new Error("Could not click generated image");

        // Wait 10 seconds for image to transfer to video prompt
        console.log("⏳ Waiting 10 seconds for image to transfer to video mode...");
        await delay(10000);

        // Required checkpoint #2: after image handoff, before first video generate.
        console.log("🎛️ Aspect ratio check #2 (before Scene 1 video generation)");
        const ratioOkBeforeVideo = await ensureAspectRatioMatchesInput(config.aspectRatio);
        if (!ratioOkBeforeVideo) {
            throw new Error("Aspect Ratio mismatch before Scene 1 video generation. Stop before generate.");
        }
        await delay(400);

        report("Injecting Video Prompt...", 9, 12);
        console.log("🎬 Injecting Video Prompt...");
        await switchToVideoModeAndGenerate(config.videoPrompt, selectors, config.aspectRatio);

        report("Generating Video (This takes time)...", 10, 12);
        console.log("⏳ Waiting for Video Generation (This may take 2-3 mins)...");
        // Longer timeout for video
        const videoSrc = await waitForVideoComplete(300000); // 5 mins

        if (!videoSrc) {
            throw new Error("Video Generation Timeout or Failed");
        }
        console.log("✅ Video Generation Complete!");

        // --- STEP 3: DOWNLOAD ---
        console.log("🔹 STEP 3/3: Auto-Download Phase");
        report("Downloading Video...", 11, 12);
        await delay(2000);

        const downloadResult = await handleVideoDownload(selectors);

        report("Process Complete!", 12, 12);

        // Always return the actual video source URL for the overlay to display
        // downloadResult may be "Manual Download Triggered" which is not a valid URL
        const isValidVideoUrl = downloadResult && downloadResult.startsWith('http');

        return {
            success: true,
            generatedImageUrl: "Process Complete",
            videoUrl: isValidVideoUrl ? downloadResult : videoSrc,
            error: downloadResult ? undefined : "Auto-download clicked but file verify uncertain"
        };

    } catch (error: any) {
        console.error("Pipeline Error:", error);
        return { success: false, error: error.message };
    }
};

// ========== MULTI-SCENE PIPELINE ==========

/**
 * Hover on generated video and click "เพิ่มลงในฉาก" (Add to Scene)
 */
const hoverVideoAndAddToScene = async (selectors: AutomationSelectors): Promise<boolean> => {
    console.log("🎬 Searching for generated video to HOVER...");
    await delay(2000);

    // Find video elements
    const videos = findAllElementsDeep('video');
    const candidateVideos = videos.filter(v => {
        const vid = v as HTMLVideoElement;
        const hasSize = vid.videoWidth > 200 || vid.offsetWidth > 200;
        const isVisible = vid.offsetParent !== null;
        return hasSize && isVisible;
    });

    console.log(`🎥 Found ${candidateVideos.length} candidate videos`);

    if (candidateVideos.length > 0) {
        // Get the most recent video
        const target = candidateVideos[candidateVideos.length - 1];
        const parent = target.closest('div[class*="video"], div[class*="player"], div[class*="preview"]') || target.parentElement || target;
        const hoverTarget = parent as HTMLElement;

        console.log("✅ Found generated video, HOVERING to reveal buttons...");

        // HOVER simulation
        const rect = hoverTarget.getBoundingClientRect();
        const hoverOpts = {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2
        };

        hoverTarget.dispatchEvent(new MouseEvent('mouseenter', hoverOpts));
        hoverTarget.dispatchEvent(new MouseEvent('mouseover', hoverOpts));
        hoverTarget.dispatchEvent(new MouseEvent('mousemove', hoverOpts));

        // Wait for hover UI to appear
        console.log("⏳ Waiting for hover UI to appear...");
        await delay(2000);

        // Look for "เพิ่มลงในฉาก" button
        const addToSceneTriggers = [
            'เพิ่มลงในฉาก',
            'Add to scene',
            'Add to Scene',
            'เพิ่มในฉาก',
            'ใส่ฉาก'
        ];

        for (let attempt = 1; attempt <= 5; attempt++) {
            console.log(`🔄 Looking for 'Add to Scene' button (Attempt ${attempt})...`);

            const buttons = findAllElementsDeep('button, [role="button"], div[class*="button"]');
            for (const btn of buttons) {
                const text = (btn.textContent || '').trim();
                const btnRect = btn.getBoundingClientRect();
                if (btnRect.width === 0 || btnRect.height === 0) continue;

                if (addToSceneTriggers.some(t => text.includes(t))) {
                    console.log(`✅ Found "Add to Scene" button: "${text}"`);

                    // Click it
                    const clickOpts = {
                        bubbles: true,
                        cancelable: true,
                        view: window,
                        clientX: btnRect.left + btnRect.width / 2,
                        clientY: btnRect.top + btnRect.height / 2
                    };

                    (btn as HTMLElement).dispatchEvent(new PointerEvent('pointerdown', { ...clickOpts, pointerType: 'mouse' }));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('mousedown', clickOpts));
                    await delay(50);
                    (btn as HTMLElement).dispatchEvent(new PointerEvent('pointerup', { ...clickOpts, pointerType: 'mouse' }));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('mouseup', clickOpts));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('click', clickOpts));
                    (btn as HTMLElement).click();

                    console.log("✅ 'Add to Scene' clicked! Transitioning to scene builder...");
                    await delay(3000);
                    return true;
                }
            }

            await delay(1000);
        }

        console.warn("⚠️ Could not find 'Add to Scene' button");
        return false;
    }

    console.warn("⚠️ No generated video found to hover.");
    return false;
};

/**
 * Remove extra reference images in the scene builder so only ONE remains.
 * The scene builder shows reference thumbnails on the right side of the video preview.
 * Having multiple references causes the AI to generate inconsistent clips between scenes.
 * The correct behavior (observed in working flows) is: 1 reference → seamless continuous clips.
 */
const ensureSingleSceneBuilderReference = async (): Promise<void> => {
    console.log("🧹 Ensuring single reference in scene builder...");
    await delay(600);

    const bounds = getSceneBuilderReferenceRailBounds();
    console.log(
        `  📐 Ref rail bounds x=${bounds.minLeft.toFixed(0)}..${bounds.maxLeft.toFixed(0)} y=${bounds.minTop.toFixed(0)}..${bounds.maxTop.toFixed(0)}`
    );

    const isCloseControl = (btn: HTMLElement): boolean => {
        const iconText = (btn.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
        const text = (btn.textContent || '').trim().toLowerCase();
        const aria = (btn.getAttribute('aria-label') || '').trim().toLowerCase();
        const title = (btn.getAttribute('title') || '').trim().toLowerCase();
        const combined = `${text} ${aria} ${title}`;

        return iconText === 'close' || iconText === 'cancel' || iconText === 'clear' ||
            combined === 'x' || combined === '×' ||
            combined.includes('close') || combined.includes('remove') || combined.includes('delete') ||
            combined.includes('cancel') || combined.includes('ลบ') || combined.includes('ปิด');
    };

    const getRailReferenceImages = (): HTMLElement[] => {
        return (findAllElementsDeep('img') as HTMLElement[]).filter((img) => {
            const r = img.getBoundingClientRect();
            if (r.width < 24 || r.height < 24 || r.width > 130 || r.height > 130) return false;
            if (img.offsetParent === null) return false;
            if (!hasUsableImageSrc(img)) return false;

            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            if (cx < bounds.minLeft || cx > bounds.maxLeft) return false;
            if (cy < bounds.minTop || cy > bounds.maxTop) return false;

            return true;
        });
    };

    const findNearbyCloseButton = (img: HTMLElement): HTMLElement | null => {
        const r = img.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        const candidates = (findAllElementsDeep('button, [role="button"]') as HTMLElement[])
            .filter((btn) => {
                const br = btn.getBoundingClientRect();
                if (br.width === 0 || br.height === 0 || br.width > 40 || br.height > 40) return false;
                if (!isCloseControl(btn)) return false;
                const bcx = br.left + br.width / 2;
                const bcy = br.top + br.height / 2;
                const dist = Math.hypot(bcx - cx, bcy - cy);
                return dist <= 92;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                const ad = Math.hypot(ar.left + ar.width / 2 - cx, ar.top + ar.height / 2 - cy);
                const bd = Math.hypot(br.left + br.width / 2 - cx, br.top + br.height / 2 - cy);
                return ad - bd;
            });

        return candidates[0] || null;
    };

    for (let pass = 1; pass <= 3; pass++) {
        const refs = getRailReferenceImages();

        // Hover all refs first; many UIs only show close control on hover.
        for (const ref of refs) {
            const rr = ref.getBoundingClientRect();
            const hoverOpts = {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: rr.left + rr.width / 2,
                clientY: rr.top + rr.height / 2
            };
            const targets = [ref, ref.closest('button, [role="button"]') as HTMLElement | null, ref.parentElement]
                .filter(Boolean) as HTMLElement[];
            for (const target of targets) {
                target.dispatchEvent(new MouseEvent('mouseenter', hoverOpts));
                target.dispatchEvent(new MouseEvent('mouseover', hoverOpts));
                target.dispatchEvent(new MouseEvent('mousemove', hoverOpts));
            }
        }
        await delay(260);

        const closableRefs = refs
            .map((ref) => ({ ref, closeBtn: findNearbyCloseButton(ref) }))
            .filter((x) => x.closeBtn !== null) as { ref: HTMLElement; closeBtn: HTMLElement }[];

        console.log(`  [Pass ${pass}] railImages=${refs.length}, closableRefs=${closableRefs.length}`);

        // If close controls are hidden, fallback to selecting extra refs then Delete/Backspace.
        if (closableRefs.length <= 1) {
            if (refs.length <= 1) {
                console.log("  ✅ Single closable reference — ready for next scene");
                return;
            }

            console.log(`  ℹ️ Close controls hidden. Trying keyboard-delete fallback for ${refs.length - 1} extra ref(s)...`);
            const toRemoveByKey = [...refs]
                .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
                .slice(0, Math.max(0, refs.length - 1));

            for (const ref of toRemoveByKey) {
                const rr = ref.getBoundingClientRect();
                const target = (ref.closest('button, [role="button"]') as HTMLElement | null) || ref;
                console.log(`  🗑️ Fallback delete ref at (${rr.left.toFixed(0)}, ${rr.top.toFixed(0)})`);
                await robustElementClick(target);
                await delay(140);
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Delete', code: 'Delete', bubbles: true }));
                document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Delete', code: 'Delete', bubbles: true }));
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', code: 'Backspace', bubbles: true }));
                document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace', code: 'Backspace', bubbles: true }));
                await delay(320);
            }

            const remainingAfterFallback = getRailReferenceImages().length;
            console.log(`  ✅ [Pass ${pass}] Fallback done. Remaining rail images=${remainingAfterFallback}`);
            if (remainingAfterFallback <= 1) {
                console.log(`  ✅ Reference cleanup complete. Count: ${remainingAfterFallback}`);
                return;
            }

            // Continue next pass if still > 1
            continue;
        }

        // Keep latest (bottom-most) reference and remove older ones.
        closableRefs.sort((a, b) => a.ref.getBoundingClientRect().top - b.ref.getBoundingClientRect().top);
        const toRemove = closableRefs.slice(0, Math.max(0, closableRefs.length - 1));

        let removed = 0;
        for (const item of toRemove) {
            const rect = item.ref.getBoundingClientRect();
            console.log(`  🗑️ Removing extra reference at (${rect.left.toFixed(0)}, ${rect.top.toFixed(0)})`);
            await robustElementClick(item.closeBtn);
            removed++;
            await delay(420);
        }

        const remaining = getRailReferenceImages().length;
        console.log(`  ✅ [Pass ${pass}] Removed ${removed}/${toRemove.length}. Remaining rail images=${remaining}`);
        if (remaining <= 1) {
            console.log(`  ✅ Reference cleanup complete. Count: ${remaining}`);
            return;
        }
    }

    const finalCount = getRailReferenceImages().length;
    if (finalCount > 1) {
        console.warn(`  ⚠️ Could not reduce to 1 reference (still ${finalCount})`);
    } else {
        console.log(`  ✅ Reference cleanup complete. Count: ${finalCount}`);
    }
};

/**
 * Click "Save frame as asset" button — the white "+" on the clip/video in the scene builder.
 * This saves the last frame of the current clip as a reusable asset in the asset library.
 */
const clickSaveFrameAsAsset = async (): Promise<boolean> => {
    console.log("📸 Looking for 'Save frame as asset' button (white + on clip)...");
    await delay(2000);

    // ===== PRE-STEP: Move playhead slider to the END of the clip =====
    // The playhead must be at 100% (last frame) before saving frame as asset.
    console.log("  ⏩ Moving playhead to end of clip...");
    const sliders = findAllElementsDeep('[role="slider"]') as HTMLElement[];
    let playheadSlider: HTMLElement | null = null;

    for (const slider of sliders) {
        const rect = slider.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        // Check if this slider is the playhead (has playhead.svg or is horizontal with aria-valuemax=100)
        const hasPlayheadImg = slider.querySelector('img[src*="playhead"]') !== null;
        const isHorizontal = slider.getAttribute('data-orientation') === 'horizontal'
            || slider.getAttribute('aria-orientation') === 'horizontal';
        const hasValueRange = slider.getAttribute('aria-valuemin') === '0'
            && slider.getAttribute('aria-valuemax') === '100';

        if (hasPlayheadImg || (isHorizontal && hasValueRange)) {
            playheadSlider = slider;
            console.log(`  📍 Found playhead slider at (${rect.left.toFixed(0)}, ${rect.top.toFixed(0)}) valuenow=${slider.getAttribute('aria-valuenow')}`);
            break;
        }
    }

    if (playheadSlider) {
        // Method 1: Keyboard — focus slider and press End key (jumps to max)
        playheadSlider.focus();
        await delay(100);
        playheadSlider.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', code: 'End', bubbles: true }));
        playheadSlider.dispatchEvent(new KeyboardEvent('keyup', { key: 'End', code: 'End', bubbles: true }));
        await delay(300);

        // Also press Right arrow multiple times as fallback
        for (let i = 0; i < 30; i++) {
            playheadSlider.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', bubbles: true }));
        }
        playheadSlider.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight', code: 'ArrowRight', bubbles: true }));
        await delay(300);

        // Method 2: Drag simulation — drag from center to right edge of track
        const sliderParent = playheadSlider.closest('[data-orientation="horizontal"]')?.parentElement
            || playheadSlider.parentElement?.parentElement || playheadSlider.parentElement;
        if (sliderParent) {
            const trackRect = (sliderParent as HTMLElement).getBoundingClientRect();
            const startX = playheadSlider.getBoundingClientRect().left + playheadSlider.getBoundingClientRect().width / 2;
            const startY = playheadSlider.getBoundingClientRect().top + playheadSlider.getBoundingClientRect().height / 2;
            const endX = trackRect.right - 4; // Near right edge
            const endY = startY;

            const dragOpts = (x: number, y: number) => ({
                bubbles: true, cancelable: true, view: window,
                clientX: x, clientY: y, button: 0, pointerType: 'mouse' as const, isPrimary: true
            });

            playheadSlider.dispatchEvent(new PointerEvent('pointerdown', { ...dragOpts(startX, startY), pointerId: 1 }));
            playheadSlider.dispatchEvent(new MouseEvent('mousedown', dragOpts(startX, startY)));
            await delay(50);

            // Drag in steps to the right edge
            const steps = 5;
            for (let i = 1; i <= steps; i++) {
                const x = startX + (endX - startX) * (i / steps);
                playheadSlider.dispatchEvent(new PointerEvent('pointermove', { ...dragOpts(x, endY), pointerId: 1 }));
                playheadSlider.dispatchEvent(new MouseEvent('mousemove', dragOpts(x, endY)));
                await delay(30);
            }

            playheadSlider.dispatchEvent(new PointerEvent('pointerup', { ...dragOpts(endX, endY), pointerId: 1 }));
            playheadSlider.dispatchEvent(new MouseEvent('mouseup', dragOpts(endX, endY)));
            await delay(200);
        }

        const newValue = playheadSlider.getAttribute('aria-valuenow');
        console.log(`  ✅ Playhead moved — aria-valuenow=${newValue}`);
        await delay(1000);
    } else {
        console.warn("  ⚠️ Playhead slider not found, proceeding anyway...");
    }

    // Helper: check if save-frame button/menuitem appeared (including radix dropdown menuitems)
    const findSaveFrameButton = (): HTMLElement | null => {
        // Priority 1: Search radix menuitems first (exact match from UI)
        const menuItems = findAllElementsDeep('[role="menuitem"], [data-radix-collection-item]') as HTMLElement[];
        for (const el of menuItems) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            const text = (el.textContent || '').trim().toLowerCase();
            if (text.includes('save frame') || text.includes('บันทึกเฟรม') || text.includes('frame as asset')) {
                console.log(`  🎯 Found save-frame menuitem: "${text}" at (${rect.left.toFixed(0)},${rect.top.toFixed(0)})`);
                return el;
            }
        }
        // Priority 2: Search buttons and other elements
        const candidates = findAllElementsDeep('button, [role="button"], span, div, a');
        for (const el of candidates) {
            const htmlEl = el as HTMLElement;
            const rect = htmlEl.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const text = (htmlEl.textContent || '').trim().toLowerCase();
            const title = (htmlEl.getAttribute('title') || '').toLowerCase();
            const ariaLabel = (htmlEl.getAttribute('aria-label') || '').toLowerCase();
            const combined = `${text} ${title} ${ariaLabel}`;

            if (combined.includes('save frame') || combined.includes('บันทึกเฟรม') || combined.includes('frame as asset')) {
                return (htmlEl.closest('[role="menuitem"]') || htmlEl.closest('button') || htmlEl) as HTMLElement;
            }
        }
        return null;
    };

    // Strategy -1: Check if "Save frame as asset" menuitem is ALREADY visible (e.g. dropdown already open)
    console.log("  🔍 Strategy -1: Checking if save-frame menuitem is already visible...");
    const alreadyVisible = findSaveFrameButton();
    if (alreadyVisible) {
        console.log("  ✅ Save frame menuitem already visible! Clicking...");
        await robustElementClick(alreadyVisible);
        await delay(3000);
        return true;
    }

    // Strategy 0: The white "+" on the clip IS the "Save frame as asset" button.
    // Hover on each small "+" to reveal tooltip/dropdown, confirm it says "Save frame", then click.
    console.log("  🔍 Strategy 0: Finding '+' buttons on clip to hover → check tooltip → click...");
    const allSmallButtons = findAllElementsDeep('button, [role="button"]').filter(btn => {
        const el = btn as HTMLElement;
        if (el.id === 'PINHOLE_ADD_CLIP_CARD_ID') return false;
        const rect = el.getBoundingClientRect();
        if (rect.width < 14 || rect.height < 14 || rect.width > 50 || rect.height > 50) return false;
        if (rect.top < window.innerHeight * 0.25) return false;
        const iconEl = el.querySelector('i, .material-icons, .google-symbols, span[class*="icon"]');
        const iconText = (iconEl?.textContent || '').trim().toLowerCase();
        const text = (el.textContent || '').trim().toLowerCase();
        return iconText === 'add' || text === '+' || text === 'add';
    }) as HTMLElement[];

    console.log(`  Found ${allSmallButtons.length} small '+' buttons on clips`);

    for (const plusBtn of allSmallButtons) {
        const rect = plusBtn.getBoundingClientRect();
        console.log(`  🖱️ Hovering '+' at (${rect.left.toFixed(0)}, ${rect.top.toFixed(0)}) size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`);

        const hoverOpts = {
            bubbles: true, cancelable: true, view: window,
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2
        };

        // Hover on the button and its parents to trigger tooltip
        for (const target of [plusBtn, plusBtn.parentElement, plusBtn.parentElement?.parentElement].filter(Boolean)) {
            (target as HTMLElement).dispatchEvent(new MouseEvent('mouseenter', hoverOpts));
            (target as HTMLElement).dispatchEvent(new MouseEvent('mouseover', hoverOpts));
            (target as HTMLElement).dispatchEvent(new MouseEvent('mousemove', hoverOpts));
        }
        await delay(600);

        // Check tooltip first (before clicking)
        let tooltipEl = findSaveFrameButton();
        const title = (plusBtn.getAttribute('title') || '').toLowerCase();
        const ariaLabel = (plusBtn.getAttribute('aria-label') || '').toLowerCase();
        const hasTooltipAttr = title.includes('save frame') || title.includes('บันทึกเฟรม')
            || ariaLabel.includes('save frame') || ariaLabel.includes('บันทึกเฟรม');

        if (tooltipEl) {
            console.log(`  ✅ Found save-frame via tooltip/hover! Clicking menuitem...`);
            await robustElementClick(tooltipEl);
            await delay(3000);
            return true;
        }

        if (hasTooltipAttr) {
            console.log(`  ✅ '+' has save-frame tooltip attr, clicking directly...`);
            await robustElementClick(plusBtn);
            await delay(3000);
            return true;
        }

        // CLICK the '+' to open radix dropdown menu, then search for save-frame menuitem
        console.log(`  🖱️ Clicking '+' to open dropdown menu...`);
        await robustElementClick(plusBtn);
        await delay(800);

        // Check if dropdown opened with save-frame menuitem
        tooltipEl = findSaveFrameButton();
        if (tooltipEl) {
            console.log(`  ✅ Found save-frame menuitem in dropdown! Clicking...`);
            await robustElementClick(tooltipEl);
            await delay(3000);
            return true;
        }

        // Close any unrelated menu that opened
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
        await delay(300);

        // Even without tooltip/menu, if this small "+" is on a clip (near a video/img), try it
        const nearby = plusBtn.closest('div')?.querySelector('video, img');
        if (nearby) {
            console.log(`  🎯 Small '+' near video/img — trying as save-frame...`);
            await robustElementClick(plusBtn);
            await delay(800);
            // Check again after click
            const menuItem = findSaveFrameButton();
            if (menuItem) {
                console.log(`  ✅ Found save-frame after clicking near-video '+'!`);
                await robustElementClick(menuItem);
                await delay(3000);
                return true;
            }
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
            await delay(300);
        }
    }

    // Strategy 1: Search by tooltip/aria-label/title containing "save frame" or "บันทึกเฟรม"
    const allButtons = findAllElementsDeep('button, [role="button"]');
    console.log(`  🔍 Found ${allButtons.length} buttons total, searching for Save frame...`);

    for (const btn of allButtons) {
        const el = btn as HTMLElement;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        const text = (el.textContent || '').trim().toLowerCase();
        const title = (el.getAttribute('title') || '').toLowerCase();
        const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
        const tooltip = title || ariaLabel;

        // Check for "save frame as asset" or Thai equivalent
        const isSaveFrame =
            tooltip.includes('save frame') ||
            tooltip.includes('บันทึกเฟรม') ||
            text.includes('save frame') ||
            text.includes('บันทึกเฟรม');

        if (isSaveFrame) {
            console.log(`  ✅ Found 'Save frame as asset' button via tooltip: "${tooltip || text}" [${rect.width.toFixed(0)}x${rect.height.toFixed(0)}]`);
            el.click();
            el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            console.log("  ✅ Clicked 'Save frame as asset'!");
            await delay(3000);
            return true;
        }
    }

    // Strategy 2: Search for ANY visible element with text "Save frame as asset" or "บันทึกเฟรม"
    // Only match by VISIBLE textContent, never by innerHTML/classnames to avoid false positives
    console.log("  🔍 Strategy 2: Looking for visible 'Save frame as asset' text...");

    const allElements = findAllElementsDeep('button, [role="button"], span, div, a');
    for (const el of allElements) {
        const text = ((el as HTMLElement).textContent || '').trim();
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // Only match exact visible text — safe, no false positives
        if (text.includes('Save frame as asset') || text.includes('บันทึกเฟรมเป็น') || text.includes('บันทึกเฟรม')) {
            console.log(`  ✅ Found 'Save frame as asset' element: "${text.substring(0, 50)}" [${rect.width.toFixed(0)}x${rect.height.toFixed(0)}]`);

            // Click the element or its closest button parent
            const clickTarget = (el as HTMLElement).closest('button') || el as HTMLElement;
            clickTarget.click();
            clickTarget.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            console.log("  ✅ Clicked 'Save frame as asset'!");
            await delay(3000);
            return true;
        }
    }

    // Strategy 3: Click white "+" near clip/video, then choose "Save frame as asset" from menu.
    // This handles the flow shown in UI where save-frame is exposed as a menu action from the clip "+".
    console.log("  🔍 Strategy 3: Probing white '+' buttons near scene builder clip...");

    const plusButtons = findAllElementsDeep('button, [role="button"]').filter((btn) => {
        const el = btn as HTMLElement;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;
        if (rect.width < 14 || rect.height < 14 || rect.width > 70 || rect.height > 70) return false;

        const iconText = (el.querySelector('i, .material-icons, .google-symbols')?.textContent || '').trim().toLowerCase();
        const text = (el.textContent || '').trim().toLowerCase();
        return iconText === 'add' || text === '+' || text === 'add';
    }) as HTMLElement[];

    const findSaveFrameMenuItem = (): HTMLElement | null => {
        const menuItems = findAllElementsDeep('[role="menuitem"], button, div, span');
        for (const item of menuItems) {
            const el = item as HTMLElement;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const text = (el.textContent || '').trim().toLowerCase();
            const isSaveFrame =
                text.includes('save frame') ||
                text.includes('frame as asset') ||
                text.includes('save as asset') ||
                text.includes('บันทึกเฟรม');

            if (isSaveFrame) {
                return (el.closest('[role="menuitem"], button, [role="button"]') as HTMLElement) || el;
            }
        }
        return null;
    };

    const sortedPlusButtons = [...plusButtons].sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();

        // De-prioritize timeline add-clip button; try clip save-frame + first.
        const aPenalty = a.id === 'PINHOLE_ADD_CLIP_CARD_ID' ? 10000 : 0;
        const bPenalty = b.id === 'PINHOLE_ADD_CLIP_CARD_ID' ? 10000 : 0;

        return (aRect.top + aPenalty) - (bRect.top + bPenalty);
    });

    for (const plusBtn of sortedPlusButtons.slice(0, 12)) {
        const rect = plusBtn.getBoundingClientRect();
        console.log(`  🖱️ Trying '+' button at (${rect.left.toFixed(0)}, ${rect.top.toFixed(0)}) size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`);

        await robustElementClick(plusBtn);
        await delay(500);

        const saveFrameMenuItem = findSaveFrameMenuItem();
        if (saveFrameMenuItem) {
            const itemText = (saveFrameMenuItem.textContent || '').trim();
            console.log(`  ✅ Found save-frame menu item: "${itemText}"`);
            await robustElementClick(saveFrameMenuItem);
            await delay(3000);
            console.log("  ✅ Clicked 'Save frame as asset' from '+' menu");
            return true;
        }

        // Close unrelated menu (e.g. Jump to / Extend) and keep probing.
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }));
        document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape', code: 'Escape', bubbles: true }));
        await delay(250);
    }

    console.warn("  ⚠️ Could not find 'Save frame as asset' button");
    return false;
};

/**
 * Select the most recently saved frame asset as a reference image.
 * 
 * CORRECT FLOW (from working UI observations):
 * 1. Find the empty add-reference SLOT on the right side of the scene builder
 *    (black square below existing reference thumbnail — NOT a '+' button near prompt)
 * 2. Click the empty slot → opens the asset picker (Upload + saved images)
 * 3. In the asset picker, click the saved frame image (not the Upload area)
 * 4. Mode changes to "Frames to Video" → ready for prompt + generate
 */
const selectLatestAssetAsReference = async (): Promise<boolean> => {
    console.log("🖼️ Selecting latest saved asset as reference...");
    await delay(1300);

    const bounds = getSceneBuilderReferenceRailBounds();
    console.log(
        `  📐 Ref rail bounds x=${bounds.minLeft.toFixed(0)}..${bounds.maxLeft.toFixed(0)} y=${bounds.minTop.toFixed(0)}..${bounds.maxTop.toFixed(0)}`
    );

    const getRailReferenceImages = (): HTMLElement[] => {
        return (findAllElementsDeep('img') as HTMLElement[]).filter((img) => {
            const r = img.getBoundingClientRect();
            if (r.width < 24 || r.height < 24 || r.width > 130 || r.height > 130) return false;
            if (img.offsetParent === null) return false;
            if (!hasUsableImageSrc(img)) return false;

            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            return cx >= bounds.minLeft && cx <= bounds.maxLeft && cy >= bounds.minTop && cy <= bounds.maxTop;
        });
    };

    const elementHasUsableImage = (el: HTMLElement): boolean => {
        const imgs = Array.from(el.querySelectorAll('img')) as HTMLElement[];
        return imgs.some((img) => hasUsableImageSrc(img));
    };

    const resolveAssetPickerContext = (): { uploadTile: HTMLElement; pickerRoot: HTMLElement | null } | null => {
        const inPickerViewport = (r: DOMRect): boolean => {
            return r.top > bounds.vh * 0.08 && r.bottom < bounds.vh * 0.98;
        };

        const textBasedTiles = (findAllElementsDeep('button, [role="button"], div') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 70 || r.height < 60 || r.width > 420 || r.height > 360) return false;
                if (!inPickerViewport(r)) return false;

                const text = (el.textContent || '').toLowerCase();
                return (
                    text.includes('upload') ||
                    text.includes('อัปโหลด') ||
                    text.includes('อัพโหลด') ||
                    text.includes('add media') ||
                    text.includes('เพิ่มสื่อ')
                );
            });

        const fileInputBasedTiles: HTMLElement[] = [];
        const fileInputs = findAllElementsDeep('input[type="file"]') as HTMLElement[];
        for (const input of fileInputs) {
            let current: HTMLElement | null = input;
            while (current && current !== document.body) {
                const r = current.getBoundingClientRect();
                if (current.offsetParent !== null && r.width >= 70 && r.height >= 60 && r.width <= 420 && r.height <= 360 && inPickerViewport(r)) {
                    fileInputBasedTiles.push(current);
                    break;
                }
                current = current.parentElement;
            }
        }

        const iconBasedTiles = (findAllElementsDeep('button, [role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 70 || r.height < 60 || r.width > 420 || r.height > 360) return false;
                if (!inPickerViewport(r)) return false;
                if (elementHasUsableImage(el)) return false;

                const iconText = (el.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${iconText} ${text} ${aria} ${title}`;

                const positive =
                    combined.includes('upload') ||
                    combined.includes('file_upload') ||
                    combined.includes('add_photo_alternate') ||
                    combined.includes('add media') ||
                    combined.includes('เพิ่มสื่อ') ||
                    combined.includes('อัปโหลด') ||
                    combined.includes('อัพโหลด');

                const negative =
                    combined.includes('save frame') ||
                    combined.includes('generate') ||
                    combined.includes('create image') ||
                    combined.includes('frames to video');

                return positive && !negative;
            });

        const merged = [...textBasedTiles, ...fileInputBasedTiles, ...iconBasedTiles];
        const uniqueTiles: HTMLElement[] = [];
        const seen = new Set<string>();
        for (const tile of merged) {
            const r = tile.getBoundingClientRect();
            const key = `${Math.round((r.left + r.width / 2) / 8)}:${Math.round((r.top + r.height / 2) / 8)}`;
            if (seen.has(key)) continue;
            seen.add(key);
            uniqueTiles.push(tile);
        }

        uniqueTiles.sort((a, b) => {
            const ar = a.getBoundingClientRect();
            const br = b.getBoundingClientRect();
            return ar.top - br.top || ar.left - br.left;
        });

        const uploadTile = uniqueTiles[0] || null;
        if (!uploadTile) return null;

        const ur = uploadTile.getBoundingClientRect();
        let pickerRoot: HTMLElement | null = null;
        let bestArea = Number.POSITIVE_INFINITY;
        let current: HTMLElement | null = uploadTile;

        while (current && current !== document.body) {
            const r = current.getBoundingClientRect();
            const containsUpload = r.left <= ur.left + 2 && r.top <= ur.top + 2 && r.right >= ur.right - 2 && r.bottom >= ur.bottom - 2;
            const largeEnough = r.width >= Math.max(280, ur.width * 1.6) && r.height >= Math.max(180, ur.height * 1.6);
            const inViewport = r.width <= bounds.vw * 0.98 && r.height <= bounds.vh * 0.98;

            if (containsUpload && largeEnough && inViewport) {
                const area = r.width * r.height;
                if (area < bestArea) {
                    bestArea = area;
                    pickerRoot = current;
                }
            }

            current = current.parentElement;
        }

        return { uploadTile, pickerRoot };
    };

    const isAssetPickerOpen = (): boolean => {
        const pickerCtx = resolveAssetPickerContext();
        if (pickerCtx) return true;

        const visibleFileInputs = (findAllElementsDeep('input[type="file"]') as HTMLElement[])
            .filter((el) => {
                let current: HTMLElement | null = el;
                while (current && current !== document.body) {
                    const r = current.getBoundingClientRect();
                    if (current.offsetParent !== null && r.width >= 70 && r.height >= 60 && r.top > bounds.vh * 0.08 && r.top < bounds.vh * 0.96) {
                        return true;
                    }
                    current = current.parentElement;
                }
                return false;
            });
        if (visibleFileInputs.length > 0) return true;

        const dialogLike = (findAllElementsDeep('[role="dialog"], [aria-modal="true"], [class*="dialog"], [class*="modal"]') as HTMLElement[])
            .find((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 280 || r.height < 180) return false;
                if (r.top < bounds.vh * 0.04 || r.bottom > bounds.vh * 0.99) return false;

                const imgs = Array.from(el.querySelectorAll('img')) as HTMLElement[];
                const usableImgs = imgs.filter((img) => hasUsableImageSrc(img));
                return usableImgs.length >= 2;
            });

        return !!dialogLike;
    };

    // ===== STEP 1: Find the correct add-reference slot in the right rail =====
    console.log("  🔍 Step 1: Locating add-reference slot near the right-side reference rail...");

    const railRefs = getRailReferenceImages().sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const lastRefRect = railRefs.length > 0 ? railRefs[railRefs.length - 1].getBoundingClientRect() : null;
    const refCx = lastRefRect ? lastRefRect.left + lastRefRect.width / 2 : (bounds.minLeft + bounds.maxLeft) / 2;
    const targetY = lastRefRect ? lastRefRect.bottom + 56 : (bounds.minTop + bounds.maxTop) / 2;
    const initialBottomRefSrc = (() => {
        const sorted = [...railRefs].sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
        const bottom = sorted[sorted.length - 1] as HTMLImageElement | undefined;
        return bottom?.src || null;
    })();

    const controlHints = [
        'tune', 'settings', 'setting', 'crop', 'ratio', 'aspect', 'arrange',
        'flex_no_wrap', 'volume', 'mute', 'restart', 'download', 'pen_spark'
    ];

    const hasControlIntent = (iconText: string, combined: string): boolean => {
        return controlHints.some((hint) => iconText.includes(hint) || combined.includes(hint));
    };

    const hasAddIntent = (iconText: string, text: string, aria: string, title: string, combined: string): boolean => {
        return (
            iconText === 'add' ||
            iconText === 'add_circle' ||
            iconText === 'add_photo_alternate' ||
            text === '+' ||
            text === 'add' ||
            aria.includes('add') ||
            title.includes('add') ||
            combined.includes('reference') ||
            combined.includes('asset') ||
            combined.includes('เพิ่ม') ||
            combined.includes('อ้างอิง')
        );
    };

    const fullscreenHints = ['fullscreen', 'full screen', 'open_in_full', 'fullscreen_exit', 'fit_screen', 'maximize', 'ขยายเต็มจอ'];

    const hasFullscreenIntent = (el: HTMLElement, iconText: string, combined: string): boolean => {
        if (fullscreenHints.some((hint) => iconText.includes(hint) || combined.includes(hint))) return true;

        // Exclude player controls near preview bottom edge.
        const r = el.getBoundingClientRect();
        if (r.width <= 56 && r.height <= 56 && r.top >= bounds.maxTop - 24) {
            const looksLikeControl =
                combined.includes('play') ||
                combined.includes('pause') ||
                combined.includes('volume') ||
                combined.includes('mute') ||
                combined.includes('เสียง') ||
                combined.includes('เล่น');
            if (looksLikeControl) return true;
        }

        return false;
    };

    const collectSlotCandidates = (): { el: HTMLElement; score: number }[] => {
        const candidates: { el: HTMLElement; score: number }[] = [];
        const nodes = findAllElementsDeep('button, [role="button"], div, span, img') as HTMLElement[];

        console.log(`  🔍 DEBUG: Scanning ${nodes.length} total nodes for add-slot candidates...`);
        console.log(`  📐 DEBUG: Bounds - x=${bounds.minLeft}-${bounds.maxLeft}, y=${bounds.minTop}-${bounds.maxTop+180}`);
        if (lastRefRect) {
            console.log(`  🖼️ DEBUG: LastRef - x=${lastRefRect.left.toFixed(0)}-${lastRefRect.right.toFixed(0)}, y=${lastRefRect.top.toFixed(0)}-${lastRefRect.bottom.toFixed(0)}`);
            console.log(`  🎯 DEBUG: Target - refCx=${refCx.toFixed(0)}, targetY=${targetY.toFixed(0)}`);
        }

        let filteredCount = { size: 0, visibility: 0, bounds: 0, reference: 0, image: 0, control: 0, shape: 0, intent: 0 };

        for (const el of nodes) {
            const r = el.getBoundingClientRect();
            if (r.width < 22 || r.height < 22 || r.width > 130 || r.height > 130) {
                filteredCount.size++;
                continue;
            }
            if (el.offsetParent === null) {
                filteredCount.visibility++;
                continue;
            }

            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            if (cx < bounds.minLeft || cx > bounds.maxLeft) {
                filteredCount.bounds++;
                continue;
            }
            if (cy < bounds.minTop || cy > bounds.maxTop + 180) {
                filteredCount.bounds++;
                continue;
            }
            if (el.id === 'PINHOLE_ADD_CLIP_CARD_ID') {
                filteredCount.reference++;
                continue;
            }

            if (lastRefRect) {
                if (cy < lastRefRect.bottom - 20) {
                    filteredCount.reference++;
                    continue;
                }
                if (cy > lastRefRect.bottom + 250) {
                    filteredCount.reference++;
                    continue;
                }
                if (Math.abs(cx - refCx) > 118) {
                    filteredCount.reference++;
                    continue;
                }
            }

            if (el.tagName === 'IMG' && hasUsableImageSrc(el)) {
                filteredCount.image++;
                continue;
            }

            const iconText = (el.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
            const text = (el.textContent || '').trim().toLowerCase();
            const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
            const title = (el.getAttribute('title') || '').trim().toLowerCase();
            const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();

            if (hasFullscreenIntent(el, iconText, combined)) {
                filteredCount.control++;
                continue;
            }
            if (hasControlIntent(iconText, combined)) {
                filteredCount.control++;
                continue;
            }

            const hasImageInside = elementHasUsableImage(el);
            if (hasImageInside) {
                filteredCount.image++;
                continue;
            }

            const isSquareish = Math.abs(r.width - r.height) <= 22;
            const isCompact = r.width <= 92 && r.height <= 92;
            if (!isSquareish || !isCompact) {
                filteredCount.shape++;
                continue;
            }

            const hasExplicitAdd = hasAddIntent(iconText, text, aria, title, combined);
            const hiddenSlotFallback = !hasExplicitAdd && Math.abs(cy - targetY) <= 165;
            if (!hasExplicitAdd && !hiddenSlotFallback) {
                filteredCount.intent++;
                continue;
            }

            console.log(`  ✅ DEBUG: Candidate found at (${cx.toFixed(0)}, ${cy.toFixed(0)}) size=${r.width.toFixed(0)}x${r.height.toFixed(0)} tag=${el.tagName} hasAdd=${hasExplicitAdd} text="${text}" aria="${aria}"`);

            let score = Math.abs(cx - refCx) * 2 + Math.abs(cy - targetY);
            score -= hasExplicitAdd ? 260 : 90;
            if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'button') score -= 55;
            if (Math.abs(cy - targetY) <= 92) score -= 55;

            candidates.push({ el, score });
        }

        console.log(`  📊 DEBUG: Filtered out - size:${filteredCount.size}, visibility:${filteredCount.visibility}, bounds:${filteredCount.bounds}, reference:${filteredCount.reference}, image:${filteredCount.image}, control:${filteredCount.control}, shape:${filteredCount.shape}, intent:${filteredCount.intent}`);
        console.log(`  🎯 DEBUG: Final candidates: ${candidates.length}`);

        candidates.sort((a, b) => a.score - b.score);
        return candidates;
    };

    const hoverRailNearReference = async (): Promise<void> => {
        if (!lastRefRect) return;

        const hoverables = (findAllElementsDeep('button, [role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 20 || r.height < 20 || r.width > 220 || r.height > 220) return false;
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                if (cx < bounds.minLeft || cx > bounds.maxLeft) return false;
                if (cy < lastRefRect.bottom - 26 || cy > Math.min(bounds.maxTop + 64, lastRefRect.bottom + 170)) return false;
                if (Math.abs(cx - refCx) > 130) return false;
                return true;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                const aScore = Math.abs((ar.left + ar.width / 2) - refCx) + Math.abs((ar.top + ar.height / 2) - targetY);
                const bScore = Math.abs((br.left + br.width / 2) - refCx) + Math.abs((br.top + br.height / 2) - targetY);
                return aScore - bScore;
            });

        for (const el of hoverables.slice(0, 6)) {
            const r = el.getBoundingClientRect();
            const hoverOpts = {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: r.left + r.width / 2,
                clientY: r.top + r.height / 2
            };
            el.dispatchEvent(new MouseEvent('mouseenter', hoverOpts));
            el.dispatchEvent(new MouseEvent('mouseover', hoverOpts));
            el.dispatchEvent(new MouseEvent('mousemove', hoverOpts));
            await delay(90);
        }
    };

    const probeSlotByCoordinates = (): HTMLElement | null => {
        if (!lastRefRect) return null;

        const probeXs = [refCx, refCx - 18, refCx + 18];
        const probeYs = [
            lastRefRect.bottom + 34,
            lastRefRect.bottom + 54,
            lastRefRect.bottom + 76,
            lastRefRect.bottom + 100,
            lastRefRect.bottom + 128,
            lastRefRect.bottom + 156,
            lastRefRect.bottom + 188
        ];

        for (const y of probeYs) {
            if (y < bounds.minTop || y > bounds.maxTop + 180) continue;
            for (const x of probeXs) {
                if (x < bounds.minLeft || x > bounds.maxLeft) continue;

                const stack = document.elementsFromPoint(x, y) as HTMLElement[];
                for (const raw of stack) {
                    const target = (raw.closest('button, [role="button"]') as HTMLElement | null) || raw;
                    if (!target || target.offsetParent === null) continue;

                    const r = target.getBoundingClientRect();
                    if (r.width < 18 || r.height < 18 || r.width > 120 || r.height > 120) continue;
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;
                    if (cx < bounds.minLeft || cx > bounds.maxLeft) continue;
                    if (cy < bounds.minTop || cy > bounds.maxTop + 180) continue;
                    if (Math.abs(cx - refCx) > 126) continue;

                    const iconText = (target.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
                    const text = (target.textContent || '').trim().toLowerCase();
                    const aria = (target.getAttribute('aria-label') || '').trim().toLowerCase();
                    const title = (target.getAttribute('title') || '').trim().toLowerCase();
                    const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();

                    if (hasFullscreenIntent(target, iconText, combined)) continue;
                    if (hasControlIntent(iconText, combined)) continue;

                    const hasImageInside = elementHasUsableImage(target);
                    const isSquareish = Math.abs(r.width - r.height) <= 24;
                    const likelyHiddenSlot = !hasImageInside && isSquareish && Math.abs(cy - targetY) <= 220;
                    const hasAdd = hasAddIntent(iconText, text, aria, title, combined);

                    if (hasAdd || likelyHiddenSlot) return target;
                }
            }
        }

        return null;
    };

    const clickOverlayAddNearRailReference = async (): Promise<boolean> => {
        if (!lastRefRect) return false;

        const candidates = (findAllElementsDeep('button, [role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 18 || r.height < 18 || r.width > 96 || r.height > 96) return false;

                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                if (cx < bounds.minLeft || cx > bounds.maxLeft) return false;
                if (cy < lastRefRect.bottom - 20 || cy > lastRefRect.bottom + 260) return false;
                if (Math.abs(cx - refCx) > 136) return false;

                const iconText = (el.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();

                if (hasFullscreenIntent(el, iconText, combined)) return false;
                if (hasControlIntent(iconText, combined)) return false;

                const hasImageInside = elementHasUsableImage(el);
                const isSquareish = Math.abs(r.width - r.height) <= 26;
                const hasAdd = hasAddIntent(iconText, text, aria, title, combined);

                return isSquareish && (hasAdd || (!hasImageInside && Math.abs(cy - targetY) <= 220));
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                const aScore = Math.abs((ar.left + ar.width / 2) - refCx) + Math.abs((ar.top + ar.height / 2) - targetY);
                const bScore = Math.abs((br.left + br.width / 2) - refCx) + Math.abs((br.top + br.height / 2) - targetY);
                return aScore - bScore;
            });

        for (const candidate of candidates.slice(0, 5)) {
            await robustElementClick(candidate);
            await delay(1050);
            if (isAssetPickerOpen()) {
                return true;
            }
        }

        return false;
    };

    const clickPromptReferenceAddButton = async (): Promise<boolean> => {
        const promptInputs = (findAllElementsDeep('textarea, input[type="text"], [contenteditable="true"]') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                return r.width >= 260 && r.height >= 36;
            })
            .sort((a, b) => b.getBoundingClientRect().top - a.getBoundingClientRect().top);

        const promptInput = promptInputs[0] || null;
        if (!promptInput) return false;

        const pr = promptInput.getBoundingClientRect();
        const chips = (findAllElementsDeep('img') as HTMLElement[])
            .filter((img) => {
                if (img.offsetParent === null || !hasUsableImageSrc(img)) return false;
                const r = img.getBoundingClientRect();
                if (r.width < 18 || r.width > 100 || r.height < 18 || r.height > 100) return false;
                const cy = r.top + r.height / 2;
                return cy >= pr.top - 86 && cy <= pr.bottom + 86 && r.left <= pr.left + 240;
            })
            .sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        const mainChip = chips[0] || null;
        const chipRect = mainChip?.getBoundingClientRect() || null;

        const plusCandidates = (findAllElementsDeep('button, [role="button"], div[role="button"], span[role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 18 || r.height < 18 || r.width > 82 || r.height > 82) return false;
                if (Math.abs(r.width - r.height) > 28) return false;

                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                if (cy < pr.top - 90 || cy > pr.bottom + 96) return false;
                if (cx < pr.left - 140 || cx > pr.left + Math.min(320, pr.width * 0.52)) return false;

                const iconText = (el.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();

                const blockHints = ['arrow_forward', 'send', 'generate', 'tune', 'settings', 'volume', 'crop'];
                if (blockHints.some((hint) => iconText.includes(hint) || combined.includes(hint))) return false;
                if (!hasAddIntent(iconText, text, aria, title, combined)) return false;

                if (chipRect) {
                    const chipCy = chipRect.top + chipRect.height / 2;
                    if (cy < chipCy - 56 || cy > chipCy + 56) return false;
                    if (cx < chipRect.right - 12 || cx > chipRect.right + 180) return false;
                }

                return true;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                const ax = ar.left + ar.width / 2;
                const ay = ar.top + ar.height / 2;
                const bx = br.left + br.width / 2;
                const by = br.top + br.height / 2;
                const targetX = chipRect ? chipRect.right + 36 : pr.left + 84;
                const targetY2 = chipRect ? chipRect.top + chipRect.height / 2 : pr.top + pr.height / 2;
                const aScore = Math.abs(ax - targetX) + Math.abs(ay - targetY2);
                const bScore = Math.abs(bx - targetX) + Math.abs(by - targetY2);
                return aScore - bScore;
            });

        const target = plusCandidates[0] || null;
        if (!target) return false;

        await robustElementClick(target);
        await delay(1200);
        return isAssetPickerOpen();
    };

    const clickSceneStripPlusButton = async (): Promise<boolean> => {
        const stripThumbs = (findAllElementsDeep('img') as HTMLElement[])
            .filter((img) => {
                if (img.offsetParent === null || !hasUsableImageSrc(img)) return false;
                const r = img.getBoundingClientRect();
                if (r.width < 70 || r.height < 45 || r.width > 340 || r.height > 220) return false;
                if (r.top < bounds.maxTop - 180 || r.bottom > bounds.vh - 30) return false;
                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                if (cx >= bounds.minLeft && cx <= bounds.maxLeft && cy >= bounds.minTop && cy <= bounds.maxTop + 180) return false;
                return true;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                return br.top - ar.top || br.width * br.height - ar.width * ar.height;
            });

        const stripThumb = stripThumbs[0] || null;
        if (!stripThumb) return false;

        const tr = stripThumb.getBoundingClientRect();
        const plusCandidates = (findAllElementsDeep('button, [role="button"], div[role="button"], span[role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 18 || r.height < 18 || r.width > 110 || r.height > 110) return false;

                const cx = r.left + r.width / 2;
                const cy = r.top + r.height / 2;
                if (cy < tr.top - 44 || cy > tr.bottom + 44) return false;
                if (cx < tr.right - 20 || cx > tr.right + 260) return false;

                const iconText = (el.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();

                if (!hasAddIntent(iconText, text, aria, title, combined)) return false;
                if (hasControlIntent(iconText, combined)) return false;
                if (hasFullscreenIntent(el, iconText, combined)) return false;
                if (combined.includes('save frame')) return false;
                if (combined.includes('generate') || combined.includes('arrow_forward')) return false;

                return true;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                const ax = ar.left + ar.width / 2;
                const ay = ar.top + ar.height / 2;
                const bx = br.left + br.width / 2;
                const by = br.top + br.height / 2;
                const targetX = tr.right + 56;
                const targetY2 = tr.top + tr.height / 2;
                const aScore = Math.abs(ax - targetX) + Math.abs(ay - targetY2);
                const bScore = Math.abs(bx - targetX) + Math.abs(by - targetY2);
                return aScore - bScore;
            });

        for (const candidate of plusCandidates.slice(0, 4)) {
            const r = candidate.getBoundingClientRect();
            console.log(`  🖱️ Scene-strip plus fallback click at (${r.left.toFixed(0)}, ${r.top.toFixed(0)})`);
            await robustElementClick(candidate);
            await delay(1150);
            if (isAssetPickerOpen()) {
                return true;
            }
        }

        return false;
    };

    // AGGRESSIVE FALLBACK: Click at calculated coordinates where add-reference slot should be
    const clickAtCalculatedReferenceSlotPosition = async (): Promise<boolean> => {
        console.log("  🎯 FALLBACK: Clicking at calculated reference slot coordinates...");
        
        // The add-reference slot is typically on the right side, below existing references
        // Try multiple coordinate strategies
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // Strategy A: Below last reference image
        const probePositions: Array<{x: number; y: number; label: string}> = [];
        
        if (lastRefRect) {
            // Below the last reference, centered horizontally
            for (let dy = 40; dy <= 220; dy += 30) {
                probePositions.push({ x: refCx, y: lastRefRect.bottom + dy, label: `below-ref+${dy}` });
            }
            // Slightly left/right of center
            for (let dy = 40; dy <= 180; dy += 40) {
                probePositions.push({ x: refCx - 25, y: lastRefRect.bottom + dy, label: `left-ref+${dy}` });
                probePositions.push({ x: refCx + 25, y: lastRefRect.bottom + dy, label: `right-ref+${dy}` });
            }
        }
        
        // Strategy B: Right side of screen where reference rail typically is
        const rightSideX = vw * 0.78;  // ~78% from left
        for (let y = vh * 0.35; y <= vh * 0.75; y += 30) {
            probePositions.push({ x: rightSideX, y, label: `right-side-${y.toFixed(0)}` });
        }
        
        // Strategy C: Near the right edge, common position for reference slots
        for (let x = vw * 0.72; x <= vw * 0.92; x += 40) {
            for (let y = vh * 0.4; y <= vh * 0.7; y += 40) {
                probePositions.push({ x, y, label: `grid-${x.toFixed(0)}-${y.toFixed(0)}` });
            }
        }
        
        for (const pos of probePositions) {
            const el = document.elementFromPoint(pos.x, pos.y) as HTMLElement | null;
            if (!el) continue;
            
            const target = (el.closest('button, [role="button"]') as HTMLElement | null) || el;
            const r = target.getBoundingClientRect();
            if (r.width < 18 || r.height < 18 || r.width > 150 || r.height > 150) continue;
            if (target.offsetParent === null) continue;
            
            // Skip if it has an image inside (it's an existing reference, not an empty slot)
            if (elementHasUsableImage(target)) continue;
            
            // Skip control buttons
            const iconText = (target.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
            const text = (target.textContent || '').trim().toLowerCase();
            const combined = `${iconText} ${text}`;
            if (hasControlIntent(iconText, combined)) continue;
            if (hasFullscreenIntent(target, iconText, combined)) continue;
            if (combined.includes('generate') || combined.includes('send')) continue;
            
            // Check if this is an add-like or empty slot element
            const isSquarish = Math.abs(r.width - r.height) <= 30;
            const hasAdd = hasAddIntent(iconText, text, 
                (target.getAttribute('aria-label') || '').toLowerCase(),
                (target.getAttribute('title') || '').toLowerCase(),
                combined);
            const looksEmpty = isSquarish && r.width >= 22 && r.width <= 100 && !text;
            
            if (hasAdd || looksEmpty) {
                console.log(`  🖱️ Coordinate click at (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}) [${pos.label}] tag=${target.tagName} size=${r.width.toFixed(0)}x${r.height.toFixed(0)} text="${text}"`);
                await robustElementClick(target);
                await delay(1500);
                
                if (isAssetPickerOpen()) {
                    console.log(`  ✅ Asset picker opened via coordinate click [${pos.label}]`);
                    return true;
                }
            }
        }
        
        return false;
    };

    const clickDirectSaveFrameAsAssetButton = async (): Promise<boolean> => {
        console.log("  🚨 EMERGENCY: Searching for direct 'Save frame as asset' button...");
        
        const saveFrameButtons = (findAllElementsDeep('button, [role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 20 || r.height < 20 || r.width > 400 || r.height > 200) return false;
                
                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();
                
                const hassaveFrame = 
                    combined.includes('save frame') ||
                    combined.includes('frame as asset') ||
                    combined.includes('save as asset') ||
                    combined.includes('บันทึกเฟรม');
                
                return hassaveFrame;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                return br.top - ar.top || ar.left - br.left;
            });

        console.log(`  🔍 Found ${saveFrameButtons.length} 'Save frame as asset' button candidates`);
        
        for (const btn of saveFrameButtons.slice(0, 3)) {
            const r = btn.getBoundingClientRect();
            const text = (btn.textContent || '').trim();
            console.log(`  🖱️ Emergency click 'Save frame as asset' at (${r.left.toFixed(0)}, ${r.top.toFixed(0)}) text="${text}"`);
            
            await robustElementClick(btn);
            await delay(2000);
            
            // Check if this opened the asset picker
            if (isAssetPickerOpen()) {
                console.log("  ✅ Emergency 'Save frame as asset' opened asset picker!");
                return true;
            }
        }
        
        return false;
    };

    const clickEmergencyAddButton = async (): Promise<boolean> => {
        console.log("  🚨 EMERGENCY: Broad search for any add/plus button that could open asset picker...");
        
        const emergencyButtons = (findAllElementsDeep('button, [role="button"], div[role="button"], span[role="button"], div, span') as HTMLElement[])
            .filter((el) => {
                if (el.offsetParent === null) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 16 || r.height < 16 || r.width > 200 || r.height > 200) return false;
                if (r.top < bounds.vh * 0.1 || r.top > bounds.vh * 0.9) return false;
                
                const iconText = (el.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim().toLowerCase();
                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${iconText} ${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();
                
                // Block obvious wrong buttons
                const blocked = 
                    combined.includes('generate') ||
                    combined.includes('arrow_forward') ||
                    combined.includes('send') ||
                    combined.includes('tune') ||
                    combined.includes('settings') ||
                    combined.includes('volume') ||
                    combined.includes('fullscreen') ||
                    combined.includes('crop');
                    
                if (blocked) return false;
                
                // Look for add-like content
                const hasAddLike = 
                    iconText === 'add' ||
                    iconText === 'add_circle' ||
                    iconText === 'add_photo_alternate' ||
                    iconText === 'file_upload' ||
                    text === '+' ||
                    text === 'add' ||
                    combined.includes('add') ||
                    combined.includes('plus') ||
                    combined.includes('upload') ||
                    combined.includes('reference') ||
                    combined.includes('asset') ||
                    combined.includes('เพิ่ม');
                
                return hasAddLike;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                return ar.top - br.top || ar.left - br.left;
            });

        console.log(`  🔍 Found ${emergencyButtons.length} emergency add button candidates`);
        
        for (const btn of emergencyButtons.slice(0, 10)) {
            const r = btn.getBoundingClientRect();
            const text = (btn.textContent || '').trim();
            const iconText = (btn.querySelector('i, .google-symbols, .material-icons')?.textContent || '').trim();
            console.log(`  🖱️ Emergency click add button at (${r.left.toFixed(0)}, ${r.top.toFixed(0)}) icon="${iconText}" text="${text}"`);
            
            await robustElementClick(btn);
            await delay(1200);
            
            if (isAssetPickerOpen()) {
                console.log("  ✅ Emergency add button opened asset picker!");
                return true;
            }
        }
        
        return false;
    };

    // ===== STRATEGY 0 (PRIMARY): Click the prompt-bar "+" add-reference button =====
    // This is the small "+" button near the prompt input at the bottom of Scenebuilder.
    // Element: <button class="sc-d02e9a37-1"><i class="google-symbols">add</i></button>
    const clickPromptBarAddReferenceButton = async (): Promise<boolean> => {
        console.log("  🎯 Strategy 0: Looking for prompt-bar add-reference button (google-symbols 'add')...");

        // Find all buttons with a google-symbols icon containing "add"
        const allButtons = findAllElementsDeep('button') as HTMLElement[];
        const addButtons: { btn: HTMLElement; score: number }[] = [];

        for (const btn of allButtons) {
            if (btn.offsetParent === null) continue;
            const r = btn.getBoundingClientRect();
            if (r.width < 16 || r.height < 16 || r.width > 80 || r.height > 80) continue;

            // Must contain a google-symbols icon with text "add"
            const icon = btn.querySelector('i.google-symbols, i[class*="google-symbols"]');
            if (!icon) continue;
            const iconText = (icon.textContent || '').trim().toLowerCase();
            if (iconText !== 'add') continue;

            // Exclude buttons in the top 40% of the screen (header/toolbar area)
            if (r.top < bounds.vh * 0.55) continue;

            // Exclude generate button (arrow_forward) — should already be excluded by iconText check
            // Exclude known control icons
            if (['arrow_forward', 'send', 'tune', 'settings', 'volume', 'download', 'fullscreen'].includes(iconText)) continue;

            // Score: prefer buttons lower on screen and to the left (near prompt area)
            let score = (bounds.vh - r.top); // Lower = better
            // Check if button has data-type="button-overlay" child (exact match for the user's element)
            const hasOverlay = btn.querySelector('[data-type="button-overlay"]');
            if (hasOverlay) score += 500; // Strong bonus
            // Check for sc-d02e9a37 class
            if (btn.className.includes('sc-d02e9a37')) score += 300;

            addButtons.push({ btn, score });
            console.log(`    ✅ Found prompt-bar add btn at (${r.left.toFixed(0)}, ${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} score=${score.toFixed(0)} class="${btn.className.substring(0, 60)}"`);
        }

        addButtons.sort((a, b) => b.score - a.score);

        for (const { btn } of addButtons.slice(0, 3)) {
            const r = btn.getBoundingClientRect();
            console.log(`  🖱️ Clicking prompt-bar add button at (${r.left.toFixed(0)}, ${r.top.toFixed(0)})`);
            await robustElementClick(btn);
            await delay(1500);

            if (isAssetPickerOpen()) {
                console.log("  ✅ Asset picker opened via prompt-bar add button!");
                return true;
            }
        }

        return false;
    };

    // Try Strategy 0 FIRST (prompt-bar button)
    let slotClicked = false;
    const promptBarOpened = await clickPromptBarAddReferenceButton();
    if (promptBarOpened) {
        slotClicked = true;
    }

    // Fallback to legacy strategies only if Strategy 0 failed
    let orderedSlotCandidates: { el: HTMLElement; score: number }[] = [];
    if (!slotClicked) {
        console.log("  ⚠️ Strategy 0 failed, falling back to rail-based scanning...");
        orderedSlotCandidates = collectSlotCandidates();
        if (orderedSlotCandidates.length === 0) {
            await hoverRailNearReference();
            orderedSlotCandidates = collectSlotCandidates();
        }
        console.log(`  📊 Add-slot candidates detected: ${orderedSlotCandidates.length}`);
    }

    // Click up to 4 candidates until asset picker actually opens.
    const triedCenters = new Set<string>();
    for (let i = 0; !slotClicked && i < Math.min(6, orderedSlotCandidates.length); i++) {
        const candidate = orderedSlotCandidates[i].el;
        const r = candidate.getBoundingClientRect();
        const centerKey = `${Math.round((r.left + r.width / 2) / 4)}:${Math.round((r.top + r.height / 2) / 4)}`;
        if (triedCenters.has(centerKey)) continue;
        triedCenters.add(centerKey);

        const nestedBtn = candidate.querySelector('button, [role="button"]') as HTMLElement | null;
        const clickTarget = nestedBtn && nestedBtn.offsetParent !== null ? nestedBtn : candidate;

        console.log(`  🖱️ Trying add-slot candidate ${i + 1}: (${r.left.toFixed(0)}, ${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} tag=${candidate.tagName}`);
        await robustElementClick(clickTarget);
        await delay(1200);

        if (isAssetPickerOpen()) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened");
            break;
        }

        // Retry by clicking raw candidate if nested clickable didn't open picker.
        if (clickTarget !== candidate) {
            await robustElementClick(candidate);
            await delay(800);
            if (isAssetPickerOpen()) {
                slotClicked = true;
                console.log("  ✅ Asset picker opened");
                break;
            }
        }
    }

    if (!slotClicked) {
        await hoverRailNearReference();
        const probeTarget = probeSlotByCoordinates();
        if (probeTarget) {
            const r = probeTarget.getBoundingClientRect();
            console.log(`  🎯 Probe fallback: clicking slot near ref at (${r.left.toFixed(0)}, ${r.top.toFixed(0)})`);
            await robustElementClick(probeTarget);
            await delay(1200);
            if (isAssetPickerOpen()) {
                slotClicked = true;
                console.log("  ✅ Asset picker opened (probe fallback)");
            }
        }
    }

    let openedViaOverlay = false;
    if (!slotClicked) {
        openedViaOverlay = await clickOverlayAddNearRailReference();
        if (openedViaOverlay) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened (rail overlay add fallback)");
        }
    }

    let openedViaStripPlus = false;
    if (!slotClicked) {
        openedViaStripPlus = await clickSceneStripPlusButton();
        if (openedViaStripPlus) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened (scene strip + fallback)");
        }
    }

    let openedViaPromptAdd = false;
    if (!slotClicked) {
        openedViaPromptAdd = await clickPromptReferenceAddButton();
        if (openedViaPromptAdd) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened (prompt + fallback)");
        }
    }

    let openedViaCoordinate = false;
    if (!slotClicked) {
        openedViaCoordinate = await clickAtCalculatedReferenceSlotPosition();
        if (openedViaCoordinate) {
            slotClicked = true;
        }
    }

    let openedViaSaveFrame = false;
    if (!slotClicked) {
        openedViaSaveFrame = await clickDirectSaveFrameAsAssetButton();
        if (openedViaSaveFrame) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened (direct save frame fallback)");
        }
    }

    let openedViaEmergency = false;
    if (!slotClicked) {
        openedViaEmergency = await clickEmergencyAddButton();
        if (openedViaEmergency) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened (emergency add fallback)");
        }
    }

    if (!slotClicked) {
        const pickerCtx = resolveAssetPickerContext();
        if (pickerCtx) {
            slotClicked = true;
            console.log("  ✅ Asset picker opened (verified by Upload tile)");
        }
    }

    if (!slotClicked) {
        console.warn(
            `  ⚠️ Could not open asset picker from add slot (railCandidates=${orderedSlotCandidates.length}, overlay=${openedViaOverlay}, strip=${openedViaStripPlus}, prompt=${openedViaPromptAdd}, coordinate=${openedViaCoordinate}, saveFrame=${openedViaSaveFrame}, emergency=${openedViaEmergency})`
        );
        return false;
    }

    // ===== STEP 2: In asset picker, click saved frame image (NOT upload tile) =====
    console.log("  🔍 Step 2: Selecting saved frame image in asset picker...");

    const findSavedAssetCandidate = (): HTMLElement | null => {
        const pickerCtx = resolveAssetPickerContext();
        if (!pickerCtx) {
            console.log("  ⚠️ findSavedAssetCandidate: picker context not found");
            return null;
        }

        const uploadTile = pickerCtx.uploadTile;
        const pickerRoot = pickerCtx.pickerRoot;
        const ur = uploadTile.getBoundingClientRect();

        console.log(`  📐 Upload tile: (${ur.left.toFixed(0)},${ur.top.toFixed(0)}) ${ur.width.toFixed(0)}x${ur.height.toFixed(0)}`);
        console.log(`  📐 Picker root: ${pickerRoot ? 'found' : 'null'}`);

        // Strategy A: Search container elements (button, div, a) that contain images
        let containerPool = pickerRoot
            ? (Array.from(pickerRoot.querySelectorAll('button, [role="button"], a, div, li, figure')) as HTMLElement[])
            : (findAllElementsDeep('button, [role="button"], a, div, li, figure') as HTMLElement[]);

        // Strategy B: Also search direct <img> elements (some pickers use bare img)
        let imgPool = pickerRoot
            ? (Array.from(pickerRoot.querySelectorAll('img')) as HTMLElement[])
            : (findAllElementsDeep('img') as HTMLElement[]);

        // Fallback: if pickerRoot yielded 0 images, broaden to full page
        let broadenedSearch = false;
        if (pickerRoot && imgPool.length === 0) {
            console.log("  ⚠️ pickerRoot has 0 images — broadening search to full page");
            containerPool = findAllElementsDeep('button, [role="button"], a, div, li, figure') as HTMLElement[];
            imgPool = findAllElementsDeep('img') as HTMLElement[];
            broadenedSearch = true;
        }

        const isInsideUploadTile = (el: HTMLElement): boolean => {
            return el === uploadTile || uploadTile.contains(el) || el.contains(uploadTile);
        };

        const isInsideRailRef = (el: HTMLElement, cx: number, cy: number): boolean => {
            // If the element is inside the picker root, it's a picker image, NOT a rail reference
            if (pickerRoot && pickerRoot.contains(el)) return false;
            return cx >= bounds.minLeft && cx <= bounds.maxLeft && cy >= bounds.minTop && cy <= bounds.maxTop + 180;
        };

        // Combine both strategies into scored candidates
        const allCandidates: { el: HTMLElement; score: number; source: string }[] = [];

        // --- Strategy A: Container elements with images inside ---
        for (const el of containerPool) {
            if (el.offsetParent === null) continue;
            if (isInsideUploadTile(el)) continue;
            if (pickerRoot && !broadenedSearch && !pickerRoot.contains(el)) continue;
            // When broadened, only consider images near the upload tile area (within 600px)
            if (broadenedSearch) {
                const r2 = el.getBoundingClientRect();
                if (Math.abs(r2.top - ur.top) > 600 || Math.abs(r2.left - ur.left) > 800) continue;
            }

            const r = el.getBoundingClientRect();
            if (r.width < 50 || r.height < 50 || r.width > 360 || r.height > 360) continue;
            if (r.top < bounds.vh * 0.05 || r.bottom > bounds.vh * 0.98) continue;

            const text = (el.textContent || '').toLowerCase();
            if (text.includes('upload') || text.includes('อัปโหลด') || text.includes('อัพโหลด')) continue;
            if (text.includes('create image') || text.includes('frames to video')) continue;

            if (!elementHasUsableImage(el)) continue;

            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            if (isInsideRailRef(el, cx, cy)) continue;

            // Score: prefer items near Upload tile (same row or below), closer = better
            let score = Math.abs(cy - ur.top) + Math.abs(cx - (ur.right + 80));
            // Bonus for being on same row as upload tile
            if (Math.abs(cy - (ur.top + ur.height / 2)) < ur.height * 0.8) score -= 200;
            // Bonus for being to the right of upload
            if (cx > ur.right) score -= 100;
            // Bonus for being below upload (second row)
            if (cy > ur.bottom && cy < ur.bottom + 200) score -= 50;

            allCandidates.push({ el, score, source: 'container' });
        }

        // --- Strategy B: Direct <img> elements ---
        for (const img of imgPool) {
            if (img.offsetParent === null) continue;
            if (!hasUsableImageSrc(img)) continue;
            if (isInsideUploadTile(img)) continue;

            const r = img.getBoundingClientRect();
            if (r.width < 40 || r.height < 40 || r.width > 360 || r.height > 360) continue;
            if (r.top < bounds.vh * 0.05 || r.bottom > bounds.vh * 0.98) continue;

            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            if (isInsideRailRef(img, cx, cy)) continue;

            // Check it's not already an attached reference (the small one at bottom-left of picker)
            if (r.width < 80 && r.height < 80 && cx < ur.left + 20) continue;

            // Score like above
            let score = Math.abs(cy - ur.top) + Math.abs(cx - (ur.right + 80));
            if (Math.abs(cy - (ur.top + ur.height / 2)) < ur.height * 0.8) score -= 200;
            if (cx > ur.right) score -= 100;
            if (cy > ur.bottom && cy < ur.bottom + 200) score -= 50;

            // For img, prefer clicking the parent button/div if available
            const clickable = (img.closest('button, [role="button"], a') as HTMLElement | null) || img;
            allCandidates.push({ el: clickable, score: score + 5, source: 'img' });
        }

        // Deduplicate by center coordinates
        const uniqueCandidates: typeof allCandidates = [];
        const seenKeys = new Set<string>();
        for (const c of allCandidates.sort((a, b) => a.score - b.score)) {
            const r = c.el.getBoundingClientRect();
            const key = `${Math.round((r.left + r.width / 2) / 12)}:${Math.round((r.top + r.height / 2) / 12)}`;
            if (seenKeys.has(key)) continue;
            seenKeys.add(key);
            uniqueCandidates.push(c);
        }

        console.log(`  🔍 Asset candidates: ${uniqueCandidates.length} (containers: ${allCandidates.filter(c => c.source === 'container').length}, imgs: ${allCandidates.filter(c => c.source === 'img').length})`);
        for (const c of uniqueCandidates.slice(0, 5)) {
            const r = c.el.getBoundingClientRect();
            console.log(`    📍 ${c.source} score=${c.score.toFixed(0)} at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} tag=${c.el.tagName}`);
        }

        return uniqueCandidates[0]?.el || null;
    };

    let selectedAsset = false;
    for (let attempt = 1; attempt <= 6; attempt++) {
        const candidate = findSavedAssetCandidate();
        if (candidate) {
            const r = candidate.getBoundingClientRect();
            console.log(`  🖱️ Selecting saved asset (attempt ${attempt}) at (${r.left.toFixed(0)}, ${r.top.toFixed(0)}) size=${r.width.toFixed(0)}x${r.height.toFixed(0)}`);
            await robustElementClick(candidate);
            await delay(2000);

            // Verify: check if picker closed or reference changed (indicates success)
            const pickerStillVisible = resolveAssetPickerContext() !== null;
            const refsNow = getRailReferenceImages();
            if (!pickerStillVisible || refsNow.length > railRefs.length) {
                console.log(`  ✅ Asset selection confirmed (picker closed or new ref appeared)`);
                selectedAsset = true;
                break;
            }

            // Picker still open — maybe selection needs a double-click or the item wasn't the right one
            console.log(`  ⚠️ Picker still open after click, trying double-click...`);
            await robustElementClick(candidate);
            await delay(1500);

            const pickerStillVisible2 = resolveAssetPickerContext() !== null;
            if (!pickerStillVisible2) {
                console.log(`  ✅ Asset selected after double-click`);
                selectedAsset = true;
                break;
            }

            // Still open but we did click something — mark as selected and let confirm button handle it
            selectedAsset = true;
            break;
        }

        console.log(`  ⏳ Saved asset not visible yet (attempt ${attempt}/6), waiting...`);
        await delay(1500 + attempt * 300);
    }

    if (!selectedAsset) {
        console.warn("  ⚠️ Could not find saved asset in picker");
        return false;
    }

    const clickPickerConfirmButton = async (): Promise<boolean> => {
        const pickerCtx = resolveAssetPickerContext();
        if (!pickerCtx) return false;

        const uploadTile = pickerCtx.uploadTile;
        const pickerRoot = pickerCtx.pickerRoot;
        const searchPool = pickerRoot
            ? (Array.from(pickerRoot.querySelectorAll('button, [role="button"], div[role="button"], span[role="button"]')) as HTMLElement[])
            : (findAllElementsDeep('button, [role="button"], div[role="button"], span[role="button"]') as HTMLElement[]);

        const confirmHints = ['add', 'insert', 'select', 'choose', 'use', 'done', 'เพิ่ม', 'แทรก', 'เลือก', 'ยืนยัน', 'ตกลง', 'เสร็จ'];
        const rejectHints = ['upload', 'close', 'cancel', 'ยกเลิก', 'ปิด'];

        const candidates = searchPool
            .filter((el) => {
                if (el.offsetParent === null) return false;
                if (uploadTile.contains(el) || el.contains(uploadTile)) return false;
                const r = el.getBoundingClientRect();
                if (r.width < 56 || r.height < 26 || r.width > 280 || r.height > 90) return false;

                const text = (el.textContent || '').trim().toLowerCase();
                const aria = (el.getAttribute('aria-label') || '').trim().toLowerCase();
                const title = (el.getAttribute('title') || '').trim().toLowerCase();
                const combined = `${text} ${aria} ${title}`.replace(/\s+/g, ' ').trim();
                if (!combined) return false;
                if (rejectHints.some((hint) => combined.includes(hint))) return false;
                if (!confirmHints.some((hint) => combined.includes(hint))) return false;
                if (elementHasUsableImage(el)) return false;
                return true;
            })
            .sort((a, b) => {
                const ar = a.getBoundingClientRect();
                const br = b.getBoundingClientRect();
                return br.top - ar.top || br.left - ar.left;
            });

        const confirmBtn = candidates[0] || null;
        if (!confirmBtn) return false;

        console.log("  🖱️ Clicking picker confirm button after asset selection...");
        await robustElementClick(confirmBtn);
        await delay(1100);
        return true;
    };

    await clickPickerConfirmButton();

    const modeLabels = findAllElementsDeep('button, span, div') as HTMLElement[];
    const framesMode = modeLabels.some((el) => {
        const text = (el.textContent || '').toLowerCase();
        return text.includes('frames to video') || text.includes('เฟรมเป็นวิดีโอ');
    });

    const pickerStillOpen = resolveAssetPickerContext() !== null;
    const afterRailRefs = getRailReferenceImages().sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const afterBottomRefSrc = (afterRailRefs[afterRailRefs.length - 1] as HTMLImageElement | undefined)?.src || null;
    const bottomRefChanged = !!afterBottomRefSrc && afterBottomRefSrc !== initialBottomRefSrc;
    const railReady = afterRailRefs.length >= 1;

    if (framesMode) {
        console.log("  ✅ Mode switched to 'Frames to Video' — reference attached!");
    } else {
        console.log("  ✅ Asset selected as reference (mode label not detected, proceeding)");
    }

    if (!framesMode && pickerStillOpen && !bottomRefChanged) {
        console.warn("  ⚠️ Asset picker is still open and right-rail reference did not change — treating attach as failed");
        return false;
    }

    if (!framesMode && !bottomRefChanged && !railReady) {
        console.warn("  ⚠️ Could not verify reference attachment in scene builder");
        return false;
    }

    return true;
};

/**
 * Find the "Jump to..." / "ข้ามไปยัง..." menu item from the dropdown near the anchor point.
 * Falls back to "Extend" if Jump to is not found.
 * Returns the element to click, or null if not found.
 */
const findExtendMenuItem = (anchorX: number, anchorY: number): Element | null => {
    // priority: 0 = Extend (preferred), 1 = Jump to (fallback)
    const candidates: { element: Element; dist: number; priority: number }[] = [];

    // Method 1: Search by role="menuitem" text
    const menuItems = findAllElementsDeep('[role="menuitem"], [role="menuitemradio"], [role="option"]');
    // DEBUG: Log ALL visible menu items
    console.log(`🔍 [DEBUG] All visible menu items (${menuItems.length} total):`);
    for (const el of menuItems) {
        const text = (el.textContent || '').trim();
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;
        console.log(`  📋 [MENU] "${text}" [${rect.width.toFixed(0)}x${rect.height.toFixed(0)}] role=${el.getAttribute('role')}`);
    }

    for (const el of menuItems) {
        const text = (el.textContent || '').trim();
        const rect = (el as HTMLElement).getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // Prefer "Extend" (priority 0) over "Jump to" (priority 1)
        const isJumpTo = text.includes('ข้ามไปยัง') || text.toLowerCase().includes('jump to');
        const isExtend = text.includes('ขยาย') || text.toLowerCase().includes('extend');
        if (isJumpTo || isExtend) {
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const priority = isExtend ? 0 : 1;
            candidates.push({ element: el, dist: Math.hypot(cx - anchorX, cy - anchorY), priority });
            console.log(`  📋 Found menu item: "${text}" priority=${priority} (${isJumpTo ? 'JUMP TO' : 'EXTEND'}) dist=${Math.hypot(cx - anchorX, cy - anchorY).toFixed(0)}`);
        }
    }

    // Method 2: Search by icon (airline_stops for Jump to, logout for Extend)
    if (candidates.length === 0) {
        const icons = findAllElementsDeep('i');
        const jumpToIcons = ['airline_stops'];
        const extendIcons = ['logout', 'arrow_forward', 'open_in_new', 'exit_to_app', 'arrow_outward', 'expand', 'east'];
        for (const icon of icons) {
            const iconText = icon.textContent?.trim();
            if (!iconText) continue;
            const isJumpIcon = jumpToIcons.includes(iconText);
            const isExtendIcon = extendIcons.includes(iconText);
            if (isJumpIcon || isExtendIcon) {
                const parent = icon.closest('[role="menuitem"]') || icon.closest('button') || icon.parentElement;
                if (!parent) continue;
                const rect = (parent as HTMLElement).getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const priority = isExtendIcon ? 0 : 1;
                candidates.push({ element: parent, dist: Math.hypot(cx - anchorX, cy - anchorY), priority });
                console.log(`  📋 Found via icon "${iconText}" priority=${priority} dist=${Math.hypot(cx - anchorX, cy - anchorY).toFixed(0)}`);
            }
        }
    }

    if (candidates.length === 0) return null;

    // Sort by priority first (Jump to = 0 preferred), then by distance
    candidates.sort((a, b) => a.priority - b.priority || a.dist - b.dist);
    const chosen = candidates[0];
    const chosenText = (chosen.element.textContent || '').trim();
    console.log(`  ✅ CHOSEN: "${chosenText}" priority=${chosen.priority} (${chosen.priority === 0 ? 'EXTEND' : 'JUMP TO'})`);
    return chosen.element;
};

/**
 * Click the + button (PINHOLE_ADD_CLIP_CARD_ID) then click "ขยาย..." from menu
 * Element: <button id="PINHOLE_ADD_CLIP_CARD_ID" class="sc-c177465c-1 hVamcH sc-6a896c9b-1 jKwUyp sc-6a896c9b-0 iSHRLI">
 * Menu: <div role="menuitem" class="sc-93fd5d6e-2 hDmRLS">ขยาย…</div>
 */
const clickAddClipButton = async (): Promise<boolean> => {
    console.log("➕ Step 1: Looking for Add Clip button (PINHOLE_ADD_CLIP_CARD_ID)...");
    await delay(3000);

    // Helper function for robust clicking — always dispatch on the actual element (bypass overlay)
    const robustClick = async (element: Element): Promise<boolean> => {
        const el = element as HTMLElement;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await delay(300);

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Always use the original element as click target (don't trust elementFromPoint which may return overlay)
        const clickTarget = el;

        // Method 1: Mouse events sequence
        const mouseOpts = { bubbles: true, cancelable: true, view: window, clientX: centerX, clientY: centerY, button: 0, buttons: 1 };
        clickTarget.dispatchEvent(new MouseEvent('mouseover', mouseOpts));
        clickTarget.dispatchEvent(new MouseEvent('mouseenter', mouseOpts));
        await delay(100);
        clickTarget.dispatchEvent(new MouseEvent('mousedown', mouseOpts));
        await delay(50);
        clickTarget.dispatchEvent(new MouseEvent('mouseup', mouseOpts));
        clickTarget.dispatchEvent(new MouseEvent('click', mouseOpts));

        // Method 2: Pointer events
        clickTarget.dispatchEvent(new PointerEvent('pointerdown', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));
        await delay(50);
        clickTarget.dispatchEvent(new PointerEvent('pointerup', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));

        // Method 3: Direct click
        clickTarget.click();

        // Method 4: Focus + Enter
        clickTarget.focus();
        await delay(50);
        clickTarget.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
        clickTarget.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));

        return true;
    };

    // STEP 1: Find the + button using multiple methods
    let addButtonClicked = false;
    let addButton: Element | null = null;

    // Method 1: Direct ID
    addButton = document.getElementById('PINHOLE_ADD_CLIP_CARD_ID');
    console.log(`  Method 1 (getElementById): ${addButton ? 'FOUND' : 'not found'}`);

    // Method 2: Query selector
    if (!addButton) {
        addButton = document.querySelector('#PINHOLE_ADD_CLIP_CARD_ID');
        console.log(`  Method 2 (querySelector): ${addButton ? 'FOUND' : 'not found'}`);
    }

    // Method 3: Find in shadow DOM
    if (!addButton) {
        const found = findAllElementsDeep('#PINHOLE_ADD_CLIP_CARD_ID');
        addButton = found[0] || null;
        console.log(`  Method 3 (findAllElementsDeep #ID): ${addButton ? 'FOUND' : 'not found'}`);
    }

    // Method 4: Find button with "add" icon and "เพิ่มคลิป" text
    if (!addButton) {
        const allButtons = findAllElementsDeep('button');
        for (const btn of allButtons) {
            const text = btn.textContent || '';
            const hasAddIcon = btn.querySelector('i')?.textContent === 'add';
            const hasAddText = text.includes('เพิ่มคลิป') || text.includes('add');
            if (hasAddIcon || (btn.id === 'PINHOLE_ADD_CLIP_CARD_ID')) {
                addButton = btn;
                console.log(`  Method 4 (button search): FOUND - text: "${text.substring(0, 30)}"`);
                break;
            }
        }
    }

    // Method 5: Find by class pattern
    if (!addButton) {
        const candidates = findAllElementsDeep('button[class*="sc-6a896c9b"]');
        for (const btn of candidates) {
            if (btn.querySelector('i')?.textContent === 'add') {
                addButton = btn;
                console.log(`  Method 5 (class pattern): FOUND`);
                break;
            }
        }
    }

    const addButtonRect = addButton ? (addButton as HTMLElement).getBoundingClientRect() : null;

    if (!addButton) {
        console.warn("⚠️ Could not find Add Clip button with any method");
        return false;
    }

    const anchorX = addButtonRect ? addButtonRect.left + addButtonRect.width / 2 : window.innerWidth / 2;
    const anchorY = addButtonRect ? addButtonRect.bottom : window.innerHeight / 2;

    // กด "+" แล้วรอ dropdown — ถ้า dropdown ไม่ขึ้นค่อย re-click (สูงสุด 3 ครั้ง)
    for (let plusAttempt = 1; plusAttempt <= 3; plusAttempt++) {
        console.log(`✅ Clicking + button (attempt ${plusAttempt}/3)...`);
        await robustClick(addButton);
        await delay(2000);

        // หา "Jump to" (preferred) หรือ "Extend" จาก dropdown
        const extendBtn = findExtendMenuItem(anchorX, anchorY);
        if (extendBtn) {
            const menuText = (extendBtn.textContent || '').trim();
            console.log(`✅ Found menu item "${menuText}" — clicking now...`);
            await robustClick(extendBtn);
            console.log(`✅ '${menuText}' clicked! Waiting for expand view...`);
            await delay(4000);

            // Handle "Switch to Veo 3.1 - Quality" banner (Jump to needs Quality)
            await autoHandleVeoSwitchBanner();

            return true;
        }

        console.log(`  ⚠️ Dropdown not found, will re-click +...`);
        await delay(1000);
    }

    console.warn("⚠️ Could not find 'Jump to' or 'Extend' button after 3 attempts");
    return false;
};

/**
 * Fill next scene prompt and click generate
 */
const fillNextScenePromptAndGenerate = async (scenePrompt: string, selectors: AutomationSelectors): Promise<boolean> => {
    console.log("📝 Filling next scene prompt...");
    await delay(2000);

    // Find the prompt textarea - look for "เหตุการณ์นี้เกิดขึ้นแล้ว" or similar
    const textareas = findAllElementsDeep('textarea, [contenteditable="true"], input[type="text"]');

    let promptInput: HTMLElement | null = null;

    for (const ta of textareas) {
        const placeholder = (ta as HTMLInputElement).placeholder || '';
        const ariaLabel = ta.getAttribute('aria-label') || '';
        const rect = ta.getBoundingClientRect();

        // Check if it's the prompt input
        if (rect.width > 100 && rect.height > 20) {
            const isPromptInput =
                placeholder.includes('เหตุการณ์') ||
                placeholder.includes('Describe') ||
                placeholder.includes('prompt') ||
                placeholder.includes('ฉาก') ||
                ariaLabel.includes('prompt');

            if (isPromptInput || textareas.length === 1) {
                promptInput = ta as HTMLElement;
                break;
            }
        }
    }

    // Fallback: just use the first visible textarea
    if (!promptInput && textareas.length > 0) {
        for (const ta of textareas) {
            const rect = ta.getBoundingClientRect();
            if (rect.width > 100 && rect.height > 20) {
                promptInput = ta as HTMLElement;
                break;
            }
        }
    }

    if (!promptInput) {
        console.warn("⚠️ Could not find prompt input");
        return false;
    }

    console.log("✅ Found prompt input, filling with multi-strategy approach...");

    // ===== MULTI-STRATEGY PROMPT INJECTION =====
    // VideoFX's React textarea ignores native setter, need aggressive approach
    let filled = false;

    promptInput.focus();
    promptInput.click();
    await delay(300);

    // STRATEGY 1: execCommand('insertText') — most reliable for React
    try {
        const inputEl = promptInput as HTMLInputElement | HTMLTextAreaElement;

        // Select all existing text first
        if (inputEl.select) {
            inputEl.select();
        } else {
            // For contenteditable
            const range = document.createRange();
            range.selectNodeContents(promptInput);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
        await delay(100);

        // Delete selected text
        document.execCommand('delete', false);
        await delay(100);

        // Insert new text via execCommand (triggers React's onChange!)
        const inserted = document.execCommand('insertText', false, scenePrompt);
        if (inserted) {
            console.log(`✅ Strategy 1: execCommand('insertText') succeeded`);
            filled = true;
        } else {
            console.log(`⚠️ Strategy 1: execCommand returned false`);
        }
    } catch (e) {
        console.warn("Strategy 1 failed:", e);
    }

    await delay(200);

    // STRATEGY 2: Native setter + full event sequence (fallback)
    if (!filled || !(promptInput as HTMLInputElement).value) {
        try {
            const inputEl = promptInput as HTMLInputElement | HTMLTextAreaElement;
            const prototype = promptInput.tagName === 'TEXTAREA'
                ? window.HTMLTextAreaElement.prototype
                : window.HTMLInputElement.prototype;
            const nativeSetter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;

            if (nativeSetter) {
                nativeSetter.call(inputEl, '');
                inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                await delay(50);
                nativeSetter.call(inputEl, scenePrompt);
                inputEl.dispatchEvent(new Event('input', { bubbles: true }));
                inputEl.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`✅ Strategy 2: native setter applied`);
                filled = true;
            }
        } catch (e) {
            console.warn("Strategy 2 failed:", e);
        }
    }

    // STRATEGY 3: Clipboard paste simulation
    if (!filled || !(promptInput as HTMLInputElement).value) {
        try {
            promptInput.focus();
            const inputEl = promptInput as HTMLInputElement | HTMLTextAreaElement;
            if (inputEl.select) inputEl.select();
            await delay(100);

            // Simulate paste via DataTransfer
            const dt = new DataTransfer();
            dt.setData('text/plain', scenePrompt);
            const pasteEvent = new ClipboardEvent('paste', {
                bubbles: true, cancelable: true, clipboardData: dt
            });
            promptInput.dispatchEvent(pasteEvent);
            console.log(`✅ Strategy 3: paste simulation applied`);
            filled = true;
        } catch (e) {
            console.warn("Strategy 3 failed:", e);
        }
    }

    // Dispatch full event sequence (critical for React state sync)
    await delay(100);
    const events = ['keydown', 'keypress', 'input', 'keyup', 'change'];
    for (const type of events) {
        promptInput.dispatchEvent(new Event(type, { bubbles: true, cancelable: true }));
        await delay(30);
    }
    promptInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
    await delay(200);
    promptInput.focus();

    // VERIFY: Check if prompt actually got filled
    const currentValue = (promptInput as HTMLInputElement).value || promptInput.textContent || '';
    if (currentValue.length > 10) {
        console.log(`✅ Prompt verified! (${currentValue.length} chars): "${currentValue.substring(0, 50)}..."`);
    } else {
        console.warn(`⚠️ Prompt may not be filled! Current value: "${currentValue.substring(0, 50)}" (${currentValue.length} chars)`);
    }

    console.log(`📝 Prompt fill complete: "${scenePrompt.substring(0, 50)}..."`);
    await delay(1000);

    // Click generate button with retries + verification.
    // Root cause fix: previously we returned true immediately after click simulation,
    // even when button was wrong/disabled and generation never started.
    console.log("🔍 Looking for Generate button in expand view...");
    await delay(1200);

    const isButtonDisabled = (btn: HTMLElement | null): boolean => {
        if (!btn) return true;
        return btn.hasAttribute('disabled') ||
            btn.getAttribute('aria-disabled') === 'true' ||
            btn.classList.contains('disabled') ||
            (btn as HTMLButtonElement).disabled === true;
    };

    const commitPromptState = async () => {
        const inputEl = promptInput as HTMLInputElement | HTMLTextAreaElement;
        inputEl.focus();
        await delay(80);
        inputEl.dispatchEvent(new InputEvent('input', {
            bubbles: true,
            cancelable: true,
            inputType: 'insertText',
            data: currentValue || scenePrompt
        }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));
        await delay(80);
        inputEl.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
        await delay(120);
        inputEl.focus();
    };

    const findGenerateButton = (): HTMLElement | null => {
        const inputRect = promptInput.getBoundingClientRect();
        const inputCenterX = inputRect.left + inputRect.width / 2;
        const inputCenterY = inputRect.top + inputRect.height / 2;

        const candidates: Array<{ btn: HTMLElement; score: number; reason: string }> = [];

        // Method 1: Icon-based candidates near prompt
        const icons = findAllElementsDeep('i.google-symbols, i[class*="google-symbols"], i');
        for (const icon of icons) {
            const iconText = (icon.textContent || '').trim();
            const allowedIcons = ['arrow_forward', 'send', 'spark', 'pen_spark', 'auto_awesome'];
            if (!allowedIcons.includes(iconText)) continue;

            const parentBtn = icon.closest('button, [role="button"]') as HTMLElement | null;
            if (!parentBtn) continue;

            const rect = parentBtn.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            if (rect.width > 110 || rect.height > 110) continue;

            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(cx - inputCenterX, cy - inputCenterY);
            if (dist > 550) continue;

            const disabledPenalty = isButtonDisabled(parentBtn) ? 1200 : 0;
            candidates.push({
                btn: parentBtn,
                score: dist + disabledPenalty,
                reason: `icon:${iconText}`
            });
        }

        // Method 2: Text-based fallback
        const allButtons = findAllElementsDeep('button, [role="button"]') as HTMLElement[];
        const generateKeywords = ['generate', 'create', 'run', 'make', 'send', 'submit', 'ส่ง', 'สร้าง'];
        for (const btn of allButtons) {
            const text = (btn.textContent || '').toLowerCase().trim();
            const label = (btn.getAttribute('aria-label') || '').toLowerCase();
            const rect = btn.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            if (generateKeywords.some(w => text.includes(w) || label.includes(w))) {
                const excluded = ['tool', 'scene', 'ฉาก', 'เครื่องมือ', 'setting', 'ตั้งค่า', 'edit', 'แก้ไข'];
                if (excluded.some(ex => text.includes(ex) || label.includes(ex))) continue;

                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dist = Math.hypot(cx - inputCenterX, cy - inputCenterY);
                if (dist > 650) continue;

                const disabledPenalty = isButtonDisabled(btn) ? 1200 : 0;
                candidates.push({
                    btn,
                    score: dist + 200 + disabledPenalty,
                    reason: `text:${text || label}`
                });
            }
        }

        if (candidates.length === 0) return null;

        candidates.sort((a, b) => a.score - b.score);
        const best = candidates[0];
        console.log(`🎯 Generate candidate selected (${best.reason}), score=${best.score.toFixed(0)}, disabled=${isButtonDisabled(best.btn)}`);
        return best.btn;
    };

    const clickButtonRobust = async (btn: HTMLElement) => {
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await delay(200);

        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseOpts = {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: centerX,
            clientY: centerY,
            button: 0
        };

        btn.dispatchEvent(new MouseEvent('mouseover', mouseOpts));
        btn.dispatchEvent(new MouseEvent('mouseenter', mouseOpts));
        await delay(60);
        btn.dispatchEvent(new PointerEvent('pointerdown', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));
        btn.dispatchEvent(new MouseEvent('mousedown', mouseOpts));
        await delay(40);
        btn.dispatchEvent(new PointerEvent('pointerup', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));
        btn.dispatchEvent(new MouseEvent('mouseup', mouseOpts));
        btn.dispatchEvent(new MouseEvent('click', mouseOpts));
        btn.click();
    };

    const waitForGenerationStartSignal = async (): Promise<boolean> => {
        const startedAt = Date.now();
        while (Date.now() - startedAt < 7000) {
            const progressEls = findAllElementsDeep('[role="progressbar"], [aria-busy="true"], [class*="progress"], [class*="loading"], [class*="spinner"]');
            if (progressEls.length > 0) {
                console.log(`✅ Generation start signal detected (${progressEls.length} progress/loading elements)`);
                return true;
            }

            const statusEls = findAllElementsDeep('div, span, p');
            for (const el of statusEls) {
                const rect = (el as HTMLElement).getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0 || rect.width > 500 || rect.height > 120) continue;
                const text = (el.textContent || '').trim().toLowerCase();
                if (!text) continue;

                if (/\b\d{1,3}\s*%\b/.test(text) ||
                    text.includes('generating') ||
                    text.includes('creating') ||
                    text.includes('processing') ||
                    text.includes('กำลังสร้าง') ||
                    text.includes('กำลังประมวลผล')) {
                    console.log(`✅ Generation status text detected: "${text.substring(0, 40)}"`);
                    return true;
                }
            }

            await delay(400);
        }

        return false;
    };

    for (let clickAttempt = 1; clickAttempt <= 6; clickAttempt++) {
        console.log(`🚀 Generate click attempt ${clickAttempt}/6...`);

        const targetBtn = findGenerateButton();
        if (!targetBtn) {
            console.warn("⚠️ Generate button not found near prompt");
            await commitPromptState();
            await delay(700);
            continue;
        }

        if (isButtonDisabled(targetBtn)) {
            console.warn(`⚠️ Generate button is disabled on attempt ${clickAttempt}, trying to re-sync prompt state...`);
            await commitPromptState();
            await delay(900);
            continue;
        }

        await clickButtonRobust(targetBtn);
        await delay(300);

        // If it turns disabled right after click, generation usually started.
        if (isButtonDisabled(targetBtn)) {
            console.log("✅ Generate accepted (button disabled after click)");
            return true;
        }

        // Otherwise, wait for progress/status evidence.
        const started = await waitForGenerationStartSignal();
        if (started) {
            console.log("✅ Generate triggered for next scene");
            return true;
        }

        // Fallback: Enter key on prompt input.
        console.warn("⚠️ No generation signal after click, trying Enter fallback...");
        promptInput.focus();
        promptInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
        promptInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));

        const startedByEnter = await waitForGenerationStartSignal();
        if (startedByEnter) {
            console.log("✅ Generate triggered via Enter fallback");
            return true;
        }

        await delay(700);
    }

    console.warn("⚠️ Failed to trigger generate for next scene after all retries");
    return false;
};

// ========== MULTI-SCENE PIPELINE INTERFACE ==========
export interface SceneScript {
    script: string;
    voiceGender?: 'male' | 'female';
}

export interface MultiScenePipelineConfig {
    characterImage: string;
    productImage: string;
    imagePrompt: string;
    videoPrompt: string;          // Full video prompt for Scene 1 (JSON format)
    sceneCount: number;           // Total number of scenes (1, 2, or 3)
    sceneScripts: (SceneScript | string)[];  // Array of scripts for each scene (Scene 2+ only uses script part)
    aspectRatio?: string;
    videoPromptMeta?: any;        // Metadata for building Scene 2+ JSON prompts (VideoPromptMeta)
}

/**
 * Run multi-scene pipeline
 * - 1 scene: Generate video and return URL
 * - 2+ scenes: Generate first video, add to scene, then add more clips
 */
export const runMultiScenePipeline = async (
    config: MultiScenePipelineConfig,
    onProgress?: (step: string, current: number, total: number) => void
): Promise<{
    success: boolean;
    videoUrl?: string;
    videoUrls?: string[];  // Array of all clip URLs for multi-scene
    sceneCount?: number;   // Actual scene count for overlay display
    error?: string;
}> => {
    console.log('🐛 DEBUG: runMultiScenePipeline config =', {
        hasVideoPrompt: !!config.videoPrompt,
        hasVideoPromptMeta: !!config.videoPromptMeta,
        sceneScriptsLength: config.sceneScripts?.length || 0,
        sceneScripts: config.sceneScripts,
        aspectRatio: config.aspectRatio,
        sceneCount: config.sceneCount
    });

    const { sceneCount, sceneScripts } = config;
    const totalSteps = sceneCount === 1 ? 12 : 12 + (sceneCount - 1) * 3;

    console.log(`🚀 Starting Multi-Scene Pipeline - ${sceneCount} scene(s)`);
    console.log(`📝 Scene Scripts:`, sceneScripts);

    // Reset upload state and voice seed for fresh pipeline
    resetUploadState();
    resetVoiceSeed();

    // Array to collect all video URLs for multi-scene
    const videoUrls: string[] = [];

    // Store generated base image for Scene 2/3 reference (consistency)
    let scene1GeneratedImage: string | null = null;

    // Extract voice gender from first scene script for consistency
    if (sceneScripts.length > 0 && sceneScripts[0]) {
        const firstScript = sceneScripts[0];
        let voiceGender: 'male' | 'female' = 'female'; // default to female
        
        if (typeof firstScript === 'object' && firstScript.voiceGender) {
            voiceGender = firstScript.voiceGender;
        }
        
        setVoiceGender(voiceGender);
    }

    const report = (step: string, current: number, total: number) => {
        if (onProgress) onProgress(step, current, total);
        console.log(`[Progress ${current}/${total}] ${step}`);
    };

    try {
        // Initialize Remote Config
        report("Initializing...", 1, totalSteps);
        const configService = RemoteConfigService.getInstance();
        await configService.init();
        const selectors = configService.getSelectors();

        // Check/Enter workspace
        let inWorkspace = isInWorkspace(selectors);
        if (!inWorkspace) {
            report("Navigating to Workspace...", 2, totalSteps);
            // ... (same workspace entry logic as runTwoStagePipeline)
            for (let attempt = 0; attempt < 10; attempt++) {
                const dashboardKeywords = selectors.dashboard.newProjectTriggers;
                const allElements = findAllElementsDeep('*');
                for (const kw of dashboardKeywords) {
                    const elements = allElements.filter(el =>
                        el.children.length === 0 && el.textContent?.includes(kw)
                    );
                    for (const el of elements) {
                        (el as HTMLElement).click();
                        let parent = el.parentElement;
                        for (let p = 0; p < 5; p++) {
                            if (parent) {
                                try {
                                    parent.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                                } catch (e) { }
                                parent = parent.parentElement;
                            }
                        }
                    }
                }
                await delay(2000);
                if (isInWorkspace(selectors)) {
                    inWorkspace = true;
                    break;
                }
            }
        }

        // Required checkpoint #1: right after opening project/workspace, sync ratio to app input.
        console.log("🎛️ Aspect ratio check #1 (after project open)");
        const ratioOkAtStart = await ensureAspectRatioMatchesInput(config.aspectRatio);
        if (!ratioOkAtStart) {
            throw new Error("Aspect Ratio mismatch after project open. Stop before Scene 1 generation.");
        }
        await delay(600);

        // ===== SCENE 1: Generate First Video =====
        report("Switching to Image Mode...", 3, totalSteps);
        await switchToImageTab(selectors);
        await delay(1500);

        report("Uploading Character...", 4, totalSteps);
        await uploadSingleImage(config.characterImage, 1, selectors);
        await delay(2000);

        report("Uploading Product...", 5, totalSteps);
        const shouldUploadProduct = !!config.productImage && config.productImage !== config.characterImage;
        if (shouldUploadProduct) {
            await uploadSingleImage(config.productImage, 2, selectors);
        } else {
            console.log("ℹ️ Skip product upload: missing or same as character image (prevents duplicate references)");
        }
        await delay(2000);

        console.log("⏳ Waiting for images to load...");
        await delay(10000);

        report("Generating Base Image...", 6, totalSteps);
        await fillPromptAndGenerate(config.imagePrompt);

        report("Waiting for Image...", 7, totalSteps);
        const imageGenSuccess = await waitForGenerationComplete(selectors);
        if (!imageGenSuccess) throw new Error("Image Gen Timeout");

        // 📸 Capture generated image for reference in Scene 2/3
        report("Capturing Reference Image...", 7, totalSteps);
        scene1GeneratedImage = await captureGeneratedImageBase64();
        if (scene1GeneratedImage) {
            console.log("✅ Scene 1 reference image captured for consistency!");
        } else {
            console.warn("⚠️ Could not capture reference image, Scene 2/3 may have different characters");
        }

        await delay(15000);

        report("Selecting Image...", 8, totalSteps);
        const imageClicked = await clickOnGeneratedImage(selectors);
        if (!imageClicked) throw new Error("Could not select image");

        await delay(10000);

        // Required checkpoint #2: after image handoff, before first video generate.
        console.log("🎛️ Aspect ratio check #2 (before Scene 1 video generation)");
        const ratioOkBeforeScene1Video = await ensureAspectRatioMatchesInput(config.aspectRatio);
        if (!ratioOkBeforeScene1Video) {
            throw new Error("Aspect Ratio mismatch before Scene 1 video generation. Stop before generate.");
        }
        await delay(400);

        report("Generating Scene 1...", 9, totalSteps);
        // Scene 1: build proper prompt with voice script
        let scene1Prompt: string;
        if (config.videoPrompt) {
            // If we have a full prompt template, use Scene 1 script
            const scene1Script = Array.isArray(config.sceneScripts) && config.sceneScripts.length > 0 
                ? (typeof config.sceneScripts[0] === 'string' ? config.sceneScripts[0] : config.sceneScripts[0]?.script || '')
                : '';
            if (scene1Script) {
                scene1Prompt = replaceVoiceoverInPrompt(config.videoPrompt, scene1Script, config.aspectRatio);
            } else {
                scene1Prompt = finalizeVideoPrompt(config.videoPrompt, config.aspectRatio);
            }
        } else {
            // Fallback to image prompt
            scene1Prompt = finalizeVideoPrompt(config.imagePrompt, config.aspectRatio);
        }
        
        console.log(`📝 Scene 1 Prompt: "${scene1Prompt.substring(0, 150)}..." (${scene1Prompt.length} chars)`);
        console.log(`🎬 SCENE 1 FULL PROMPT:\n${scene1Prompt}`);
        console.log(`✅ Scene 1 has voice script: ${scene1Prompt.includes('THAI VOICEOVER SCRIPT') || scene1Prompt.includes('VOICEOVER:')}`);
        await switchToVideoModeAndGenerate(scene1Prompt, selectors, config.aspectRatio);

        report("Waiting for Video 1...", 10, totalSteps);
        let video1Src = await waitForVideoComplete(300000);
        if (!video1Src) {
            console.warn("⚠️ Scene 1 video did not complete. Retrying once with cleaned references...");
            const retryGenerated = await fillPromptAndGenerate(finalizeVideoPrompt(scene1Prompt, config.aspectRatio));
            if (retryGenerated) {
                video1Src = await waitForVideoComplete(180000);
            }
        }
        if (!video1Src) throw new Error("Video 1 Generation Timeout");

        // เก็บ URL ของ scene 1
        videoUrls.push(video1Src);
        console.log(`📹 Collected video URL 1: ${video1Src.substring(0, 50)}...`);

        console.log("✅ Scene 1 Video Complete!");

        // ===== SINGLE SCENE: Done =====
        if (sceneCount === 1) {
            report("Downloading...", 11, totalSteps);
            await delay(2000);
            const downloadResult = await handleVideoDownload(selectors);

            report("Complete!", 12, totalSteps);
            return {
                success: true,
                videoUrl: downloadResult?.startsWith('http') ? downloadResult : video1Src,
                videoUrls: videoUrls  // Single scene = array with 1 element
            };
        }

        // ===== MULTI-SCENE: Click + → Extend → Fill prompt → Generate =====
        console.log(`🎬 Multi-scene mode: Generating ${sceneCount - 1} more scene(s)...`);
        console.log("📋 Scene Scripts Array:", sceneScripts);

        // STEP A: Hover video and click "เพิ่มลงในฉาก" (Add to Scene Builder)
        report("Adding to Scene Builder...", 11, totalSteps);
        const addedToScene = await hoverVideoAndAddToScene(selectors);
        if (!addedToScene) {
            console.warn("⚠️ Could not add to scene, trying to continue...");
        }
        await delay(5000);

        let actualScenesGenerated = 1; // Scene 1 already done

        for (let sceneIndex = 1; sceneIndex < sceneCount; sceneIndex++) {
            const sceneNum = sceneIndex + 1;
            const stepBase = 12 + (sceneIndex - 1) * 3;

            console.log(`\n🎬 ========== Generating Scene ${sceneNum} ==========`);

            // ===== STEP 1: Click + (PINHOLE_ADD_CLIP_CARD_ID) → Extend =====
            report(`Extending clip...`, stepBase, totalSteps);
            console.log(`🎯 STEP 1: Click + → Extend for Scene ${sceneNum}...`);

            let extendSuccess = false;
            for (let extAttempt = 1; extAttempt <= 2; extAttempt++) {
                console.log(`  🔁 Extend attempt ${extAttempt}/2...`);
                extendSuccess = await clickAddClipButton();
                if (extendSuccess) {
                    console.log(`✅ Extend clicked for Scene ${sceneNum} (attempt ${extAttempt})!`);
                    break;
                }
                if (extAttempt < 2) {
                    console.warn(`  ⚠️ Extend failed on attempt ${extAttempt}. Retrying...`);
                    await delay(2000);
                }
            }

            if (!extendSuccess) {
                const extError = `Could not click Extend for Scene ${sceneNum} after 2 attempts. Stop.`;
                console.error(`❌ ${extError}`);
                throw new Error(extError);
            }
            await delay(2000);
            console.log(`✅ Scene ${sceneNum}: Extend mode active → ready for prompt`);

            // ===== STEP 2: Fill prompt with new script and generate =====
            report(`Generating Scene ${sceneNum}...`, stepBase + 1, totalSteps);
            console.log(`🎯 STEP 2: Fill prompt for Scene ${sceneNum} and generate...`);

            const sceneScriptData = sceneScripts[sceneIndex];
            const sceneScriptText = typeof sceneScriptData === 'string' ? sceneScriptData : sceneScriptData?.script || '';
            
            if (!sceneScriptText || sceneScriptText.trim() === '') {
                console.error(`❌ No script for Scene ${sceneNum} (sceneScripts[${sceneIndex}] is empty)`);
                continue;
            }

            // Build Scene 2+ prompt
            let scenePrompt: string;
            if (config.videoPrompt) {
                // User-required behavior: keep Scene 1 prompt structure, change only script
                scenePrompt = replaceVoiceoverInPrompt(config.videoPrompt, sceneScriptText, config.aspectRatio);
                console.log(`📝 Scene ${sceneNum} Prompt (scene1-template): "${scenePrompt.substring(0, 150)}..." (${scenePrompt.length} chars)`);
            } else if (config.videoPromptMeta) {
                const { buildSceneVideoPromptJSON } = await import('../services/aiPromptService');
                scenePrompt = buildSceneVideoPromptJSON(config.videoPromptMeta, sceneScriptText, sceneNum);
                console.log(`📝 Scene ${sceneNum} Prompt (meta): "${scenePrompt.substring(0, 150)}..." (${scenePrompt.length} chars)`);
            } else {
                scenePrompt = finalizeVideoPrompt(sceneScriptText, config.aspectRatio);
                console.log(`📝 Scene ${sceneNum} Prompt (fallback): "${scenePrompt.substring(0, 150)}..." (${scenePrompt.length} chars)`);
            }
            console.log(`🎬 SCENE ${sceneNum} FULL PROMPT:\n${scenePrompt}`);
            console.log(`✅ Scene ${sceneNum} has voice script: ${scenePrompt.includes('THAI VOICEOVER SCRIPT') || scenePrompt.includes('VOICEOVER:')}`);
            const generated = await fillPromptAndGenerate(scenePrompt);
            if (!generated) {
                console.warn(`⚠️ Could not generate Scene ${sceneNum}`);
                continue;
            }

            // ===== STEP 3: Wait for video to complete =====
            report(`Waiting for Video ${sceneNum}...`, stepBase + 2, totalSteps);
            console.log(`🎯 STEP 3: Waiting for Scene ${sceneNum} video...`);

            let videoSrc = await waitForVideoComplete(300000);
            if (!videoSrc) {
                console.warn(`⚠️ Scene ${sceneNum} not ready. Retrying generate once...`);
                const retryGenerated = await fillPromptAndGenerate(scenePrompt);
                if (retryGenerated) {
                    videoSrc = await waitForVideoComplete(180000);
                }
            }

            if (videoSrc) {
                videoUrls.push(videoSrc);
                actualScenesGenerated++;
                console.log(`✅ Scene ${sceneNum} Complete! URL: ${videoSrc.substring(0, 50)}...`);
            } else {
                console.warn(`⚠️ Scene ${sceneNum} video timed out after retry`);
            }

            if (sceneIndex < sceneCount - 1) {
                await delay(3000);
            }
        }

        // ===== ALL SCENES DONE =====
        console.log(`\n🎬 All scenes complete! Generated ${actualScenesGenerated}/${sceneCount} scenes`);
        videoUrls.forEach((url, i) => console.log(`  Video ${i + 1}: ${url.substring(0, 60)}...`));

        // Download final video
        report("Downloading Final Video...", totalSteps, totalSteps);
        await delay(2000);
        const finalDownload = await handleVideoDownload(selectors);

        report("All Scenes Complete!", totalSteps, totalSteps);

        const primaryUrl = video1Src || videoUrls[0] || '';

        return {
            success: true,
            videoUrl: primaryUrl,
            videoUrls: videoUrls,
            sceneCount: actualScenesGenerated
        };

    } catch (error: any) {
        console.error("Multi-Scene Pipeline Error:", error);
        return { success: false, error: error.message };
    }
};
