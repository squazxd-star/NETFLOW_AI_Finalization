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
        const shadowRoot = (walker.currentNode as Element).shadowRoot;
        if (shadowRoot) {
            elements.push(...findAllElementsDeep(selector, shadowRoot));
        }
    }

    return elements;
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

            // ========== STRATEGY 1: Find upload slots (buttons with "add" icon) ==========
            console.log("🔍 Looking for image upload slots...");

            let addBtn: HTMLElement | null = null;

            // Method A: Deep search for ALL buttons/clickable areas with "add" icon
            const allButtons = findAllElementsDeep('button');
            console.log(`   Found ${allButtons.length} buttons total`);

            const emptySlots: HTMLElement[] = [];
            const filledSlots: HTMLElement[] = [];

            for (const button of allButtons) {
                const rect = button.getBoundingClientRect();
                // Skip invisible or tiny buttons
                if (rect.width < 40 || rect.height < 40) continue;

                const icon = button.querySelector('i, .material-icons, .google-symbols');
                const iconText = icon?.textContent?.trim() || '';
                const hasAddIcon = iconText === 'add' || iconText === 'add_circle' || iconText === 'add_photo_alternate';
                const hasImage = button.querySelector('img') !== null;

                // Log potential upload buttons
                if (hasAddIcon || (rect.width > 60 && rect.width < 200)) {
                    console.log(`   Button: icon="${iconText}", hasImage=${hasImage}, size=${rect.width.toFixed(0)}x${rect.height.toFixed(0)}`);
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

                        await delay(1500);

                        // ========== STRATEGY 5: Click confirm button ==========
                        console.log("🔍 Looking for confirm button...");

                        let confirmBtn: HTMLElement | null = document.querySelector(PROVEN_SELECTORS.confirmButton);

                        // Fallback: look for button with confirm-like text
                        if (!confirmBtn) {
                            const dialogButtons = document.querySelectorAll('[id^="radix-"] button, [role="dialog"] button');
                            for (const btn of dialogButtons) {
                                const text = btn.textContent?.toLowerCase() || '';
                                if (text.includes('use') || text.includes('apply') ||
                                    text.includes('confirm') || text.includes('select') ||
                                    text.includes('ok') || text.includes('done')) {
                                    confirmBtn = btn as HTMLElement;
                                    break;
                                }
                            }
                        }

                        // Fallback: try text triggers from config
                        if (!confirmBtn) {
                            await clickByText(selectors.upload.cropSaveTriggers);
                        } else {
                            confirmBtn.click();
                            console.log("✅ Clicked confirm button");
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
    return await clickByText(selectors.workspace.imageTabTriggers, 'button');
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

                    // Use execCommand for older React versions
                    if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
                        document.execCommand('selectAll', false);
                        document.execCommand('insertText', false, prompt);
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
                await delay(2000);
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

const switchToVideoModeAndGenerate = async (videoPrompt: string, selectors: AutomationSelectors): Promise<boolean> => {
    console.log("🎬 Switching to Video Mode...");
    await delay(2000);

    // Video mode triggers (Thai + English)
    const videoModeTriggers = ['Ingredients to Video', 'Ingredients to video', 'ส่วนผสมในวิดีโอ', 'ผสมวิดีโอ', ...selectors.generation.videoTabTriggers];
    // Dropdown button triggers (Thai + English) - for fallback
    const dropdownTriggers = ['สร้างรูปภาพ', 'Create Image', 'Create image', 'สร้างภาพ'];

    // Step 1: First check if "Ingredients to Video" button is already visible (after Add to Prompt)
    console.log("🔍 Step 1: Looking for 'Ingredients to Video' button (combobox)...");
    let videoModeClicked = false;

    for (let attempt = 1; attempt <= 3 && !videoModeClicked; attempt++) {
        console.log(`🔄 Attempt ${attempt} to find 'Ingredients to Video' button...`);

        // Find button with role="combobox" that already shows "Ingredients to Video"
        const buttons = findAllElementsDeep('button[role="combobox"], button');
        for (const btn of buttons) {
            const text = (btn.textContent || '').trim();
            const rect = btn.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            // Check for arrow_drop_down icon inside
            const hasDropdownIcon = btn.querySelector('i.material-icons')?.textContent?.includes('arrow_drop_down');

            // Check if button already shows "Ingredients to Video"
            const isVideoModeButton = videoModeTriggers.some(trigger =>
                text.toLowerCase().includes(trigger.toLowerCase())
            );

            if (isVideoModeButton && hasDropdownIcon) {
                console.log(`✅ Found 'Ingredients to Video' button: "${text.substring(0, 40)}"`);

                // Click to confirm/proceed
                const clickOpts = { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
                (btn as HTMLElement).dispatchEvent(new MouseEvent('mousedown', clickOpts));
                await delay(50);
                (btn as HTMLElement).dispatchEvent(new MouseEvent('mouseup', clickOpts));
                (btn as HTMLElement).dispatchEvent(new MouseEvent('click', clickOpts));
                (btn as HTMLElement).click();

                videoModeClicked = true;
                console.log("✅ Clicked 'Ingredients to Video' button!");
                break;
            }
        }

        if (!videoModeClicked) {
            await delay(1000);
        }
    }

    // Fallback: If no "Ingredients to Video" button, try "Create Image" dropdown
    if (!videoModeClicked) {
        console.log("🔍 Fallback: Looking for 'Create Image' dropdown...");

        for (let attempt = 1; attempt <= 3 && !videoModeClicked; attempt++) {
            const buttons = findAllElementsDeep('button[role="combobox"], button');
            for (const btn of buttons) {
                const text = (btn.textContent || '').trim();
                const rect = btn.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;

                const hasDropdownIcon = btn.querySelector('i.material-icons')?.textContent?.includes('arrow_drop_down');
                const matchesTrigger = dropdownTriggers.some(trigger => text.includes(trigger));

                if (matchesTrigger || (hasDropdownIcon && text.length < 30)) {
                    console.log(`✅ Found 'Create Image' dropdown: "${text.substring(0, 30)}"`);

                    const clickOpts = { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('mousedown', clickOpts));
                    await delay(50);
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('mouseup', clickOpts));
                    (btn as HTMLElement).dispatchEvent(new MouseEvent('click', clickOpts));
                    (btn as HTMLElement).click();

                    videoModeClicked = true;
                    break;
                }
            }

            if (!videoModeClicked) {
                await delay(1000);
            }
        }
    }

    if (!videoModeClicked) {
        console.warn("⚠️ Could not find any dropdown button");
    }

    // Wait for dropdown menu to appear
    await delay(2000);

    // Step 2: ALWAYS look for "Ingredients to Video" menu item and click it
    // (Both "Ingredients to Video" button and "Create Image" button will open a dropdown menu)
    console.log("🔍 Step 2: Looking for 'Ingredients to Video' menu item in dropdown...");
    let menuItemClicked = false;

    for (let attempt = 1; attempt <= 5 && !menuItemClicked; attempt++) {
        console.log(`🔄 Attempt ${attempt} to find menu item...`);

        // Find all possible menu items
        const menuItems = findAllElementsDeep('div[role="menuitem"], div[role="option"], button, div, span');
        console.log(`   Found ${menuItems.length} elements`);

        // Collect candidates with EXACT text match and small size
        let bestCandidate: Element | null = null;
        let bestSize = Infinity;

        for (const item of menuItems) {
            const text = (item.textContent || '').trim();
            const rect = item.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            // Log relevant items (both Thai and English)
            if (text.includes('ส่วนผสม') || text.toLowerCase().includes('ingredients')) {
                console.log(`   Candidate: "${text.substring(0, 40)}" [${rect.width.toFixed(0)}x${rect.height.toFixed(0)}]`);
            }

            // Check if text matches any video mode trigger from config
            // Size should be small (menu item ~100-250px wide, ~24-50px tall)
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

            const clickOpts = { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 };
            (bestCandidate as HTMLElement).dispatchEvent(new MouseEvent('mousedown', clickOpts));
            await delay(50);
            (bestCandidate as HTMLElement).dispatchEvent(new MouseEvent('mouseup', clickOpts));
            (bestCandidate as HTMLElement).dispatchEvent(new MouseEvent('click', clickOpts));
            (bestCandidate as HTMLElement).click();

            menuItemClicked = true;
        }

        if (!menuItemClicked) {
            await delay(1000);
        }
    }

    if (!menuItemClicked) {
        console.warn("⚠️ Could not find 'Ingredients to Video' menu item");
    }

    // Step 3: Wait 5 seconds for video mode to fully load
    console.log("⏳ Waiting 5 seconds for video mode to load...");
    await delay(5000);

    // Step 4: Fill video prompt and generate
    console.log("🎬 Filling Video Prompt...");
    return await fillPromptAndGenerate(videoPrompt);
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
        const videoThumbnails = findAllElementsDeep('video').filter(v => {
            const vid = v as HTMLVideoElement;
            const rect = vid.getBoundingClientRect();
            return rect.width > 20 && rect.height > 20 && vid.readyState >= 2;
        });

        console.log(`  Checking: loading=${visibleLoading.length}, progress100=${allProgressAt100}, downloadReady=${downloadReady}, videoThumbs=${videoThumbnails.length}`);

        // ===== 5. ตรวจสอบว่าเสร็จสมบูรณ์หรือยัง =====
        const isComplete = visibleLoading.length === 0 && downloadReady && allProgressAt100;

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
                console.log("⏳ Waiting for export to complete (up to 3 mins)...");
                const exportComplete = await waitForExportComplete(180000);

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
        const productUploadSuccess = await uploadSingleImage(config.productImage, 2, selectors);
        if (!productUploadSuccess) {
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

        report("Injecting Video Prompt...", 9, 12);
        console.log("🎬 Injecting Video Prompt...");
        await switchToVideoModeAndGenerate(config.videoPrompt, selectors);

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
 * Click the + button (PINHOLE_ADD_CLIP_CARD_ID) then click "ขยาย..." from menu
 * Element: <button id="PINHOLE_ADD_CLIP_CARD_ID" class="sc-c177465c-1 hVamcH sc-6a896c9b-1 jKwUyp sc-6a896c9b-0 iSHRLI">
 * Menu: <div role="menuitem" class="sc-93fd5d6e-2 hDmRLS">ขยาย…</div>
 */
const clickAddClipButton = async (): Promise<boolean> => {
    console.log("➕ Step 1: Looking for Add Clip button (PINHOLE_ADD_CLIP_CARD_ID)...");
    await delay(3000);

    // Helper function for robust clicking
    const robustClick = async (element: Element): Promise<boolean> => {
        const el = element as HTMLElement;
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await delay(300);

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return false;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Method 1: Mouse events sequence
        const mouseOpts = { bubbles: true, cancelable: true, view: window, clientX: centerX, clientY: centerY };
        el.dispatchEvent(new MouseEvent('mouseover', mouseOpts));
        el.dispatchEvent(new MouseEvent('mouseenter', mouseOpts));
        await delay(100);
        el.dispatchEvent(new MouseEvent('mousedown', { ...mouseOpts, button: 0 }));
        await delay(50);
        el.dispatchEvent(new MouseEvent('mouseup', { ...mouseOpts, button: 0 }));
        el.dispatchEvent(new MouseEvent('click', { ...mouseOpts, button: 0 }));

        // Method 2: Pointer events
        el.dispatchEvent(new PointerEvent('pointerdown', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));
        await delay(50);
        el.dispatchEvent(new PointerEvent('pointerup', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));

        // Method 3: Direct click
        el.click();

        // Method 4: Focus + Enter
        el.focus();
        await delay(50);
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
        el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));

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

    if (addButton) {
        console.log("✅ Found Add Clip (+) button! Clicking...");
        addButtonClicked = await robustClick(addButton);
        console.log(`✅ + button click result: ${addButtonClicked}`);
    } else {
        console.warn("⚠️ Could not find Add Clip button with any method");
        return false;
    }

    // STEP 2: Wait and click "Extend..." / "ขยาย" button (menu item)
    // ปุ่มนี้อยู่ใน popup menu หลังจากกดปุ่ม + มี icon logout (ลูกศรออก)
    // รองรับทั้งภาษาไทย (ขยาย) และอังกฤษ (Extend)
    console.log("⏳ Waiting for menu to appear...");
    await delay(2000);

    console.log("🔍 Step 2: Looking for 'Extend...' / 'ขยาย' menu item...");

    for (let attempt = 1; attempt <= 10; attempt++) {
        console.log(`🔄 Attempt ${attempt}/10 to find Extend button...`);

        // หา menu items ทั้งหมด
        const menuItems = [
            ...findAllElementsDeep('[role="menuitem"]'),
            ...findAllElementsDeep('div[class*="sc-93fd5d6e"]'),
            ...findAllElementsDeep('button'),
            ...findAllElementsDeep('span')
        ];

        console.log(`  Found ${menuItems.length} potential elements`);

        // เก็บปุ่ม Extend/ขยาย ที่หาเจอ
        const extendButtons: { element: Element, right: number }[] = [];

        for (const el of menuItems) {
            const text = (el.textContent || '').trim().toLowerCase();
            const rect = (el as HTMLElement).getBoundingClientRect();

            // หาทั้ง "extend" (EN) และ "ขยาย" (TH)
            const isExtendButton = text.includes('extend') || text.includes('ขยาย');

            if (isExtendButton && rect.width > 0 && rect.height > 0) {
                const clickTarget = el.closest('[role="menuitem"]') || el.closest('button') || el;
                extendButtons.push({ element: clickTarget, right: rect.right });
                console.log(`  Found Extend/ขยาย: "${text.substring(0, 20)}" at x=${rect.right.toFixed(0)}`);
            }
        }

        // Method 2: Find by icon "logout" (ลูกศรออก) - icon ของปุ่ม Extend
        const icons = findAllElementsDeep('i.google-symbols, i[class*="google-symbols"], i');
        for (const icon of icons) {
            const iconText = icon.textContent?.trim();
            // icon logout หรือ arrow_forward หรือ open_in_new
            if (iconText === 'logout' || iconText === 'arrow_forward' || iconText === 'open_in_new' || iconText === 'exit_to_app') {
                const parent = icon.closest('[role="menuitem"]') || icon.closest('button') || icon.parentElement;
                if (parent) {
                    const parentText = (parent.textContent || '').toLowerCase();
                    const rect = (parent as HTMLElement).getBoundingClientRect();
                    if ((parentText.includes('extend') || parentText.includes('ขยาย')) && rect.width > 0) {
                        extendButtons.push({ element: parent, right: rect.right });
                        console.log(`  Found Extend via ${iconText} icon at x=${rect.right.toFixed(0)}`);
                    }
                }
            }
        }

        console.log(`  Total Extend buttons found: ${extendButtons.length}`);

        // เลือกปุ่มที่อยู่ขวาสุด (เป็นของ clip ใหม่ล่าสุด)
        if (extendButtons.length > 0) {
            extendButtons.sort((a, b) => b.right - a.right);
            const targetBtn = extendButtons[0];

            console.log(`✅ Clicking Extend button at x=${targetBtn.right.toFixed(0)}`);
            await robustClick(targetBtn.element);
            console.log("✅ 'Extend' clicked! Waiting for expand view to fully load...");

            // รอนานขึ้นให้ expand view โหลดเสร็จสมบูรณ์ (4 วินาที)
            await delay(4000);

            // ตรวจสอบว่า expand view เปิดจริง โดยหา prompt textarea
            console.log("🔍 Verifying expand view is open...");
            for (let verifyAttempt = 1; verifyAttempt <= 5; verifyAttempt++) {
                const textareas = findAllElementsDeep('textarea');
                const visibleTextarea = textareas.find(ta => {
                    const rect = (ta as HTMLElement).getBoundingClientRect();
                    return rect.width > 100 && rect.height > 20;
                });
                if (visibleTextarea) {
                    console.log(`✅ Expand view confirmed open! (textarea found)`);
                    return true;
                }
                console.log(`  Verify attempt ${verifyAttempt}/5 - waiting...`);
                await delay(1000);
            }

            console.log("⚠️ Expand view may not be fully open, but continuing...");
            return true;
        }

        await delay(800);
    }

    console.warn("⚠️ Could not find 'Extend' button after 10 attempts");
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

    console.log("✅ Found prompt input, filling...");

    // Clear and fill the prompt
    promptInput.focus();
    await delay(100);

    if (promptInput.tagName === 'TEXTAREA' || promptInput.tagName === 'INPUT') {
        (promptInput as HTMLInputElement).value = '';
        (promptInput as HTMLInputElement).value = scenePrompt;
        promptInput.dispatchEvent(new Event('input', { bubbles: true }));
        promptInput.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
        // ContentEditable
        promptInput.textContent = scenePrompt;
        promptInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    console.log(`📝 Prompt filled: "${scenePrompt.substring(0, 50)}..."`);
    await delay(1000);

    // Click generate button (arrow_forward icon) - ใช้วิธีเดียวกับ fillPromptAndGenerate
    console.log("🔍 Looking for Generate button (arrow_forward)...");
    await delay(1500);

    let targetBtn: HTMLElement | null = null;

    // METHOD 1: Find button with google-symbols icon "arrow_forward" (เหมือน fillPromptAndGenerate)
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

    // METHOD 2: Text Match Fallback (สร้าง, generate)
    if (!targetBtn) {
        console.log("🔍 Method 2: Looking for button with generate text...");
        const allButtons = findAllElementsDeep('button, [role="button"]');
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
                console.log(`🎯 Found button by text: "${text || label}"`);
                break;
            }
        }
    }

    // METHOD 3: Find rightmost small circular button
    if (!targetBtn) {
        console.log("🔍 Method 3: Looking for rightmost circular button...");
        const allButtons = findAllElementsDeep('button, [role="button"]');
        let rightmostBtn: HTMLElement | null = null;
        let maxRight = 0;

        for (const btn of allButtons) {
            const rect = btn.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const isCircular = rect.width > 30 && rect.width < 80 && Math.abs(rect.width - rect.height) < 15;

            if (isCircular && rect.right > maxRight) {
                maxRight = rect.right;
                rightmostBtn = btn as HTMLElement;
            }
        }

        if (rightmostBtn) {
            targetBtn = rightmostBtn;
            console.log(`🎯 Found rightmost circular button at x=${maxRight}`);
        }
    }

    // CLICK THE BUTTON
    if (targetBtn) {
        console.log("🖱️ Clicking generate button...");

        targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await delay(300);

        const rect = targetBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseOpts = { bubbles: true, cancelable: true, view: window, clientX: centerX, clientY: centerY };

        targetBtn.dispatchEvent(new MouseEvent('mouseover', mouseOpts));
        targetBtn.dispatchEvent(new MouseEvent('mouseenter', mouseOpts));
        await delay(100);
        targetBtn.dispatchEvent(new MouseEvent('mousedown', { ...mouseOpts, button: 0 }));
        await delay(50);
        targetBtn.dispatchEvent(new MouseEvent('mouseup', { ...mouseOpts, button: 0 }));
        targetBtn.dispatchEvent(new MouseEvent('click', { ...mouseOpts, button: 0 }));
        targetBtn.dispatchEvent(new PointerEvent('pointerdown', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));
        await delay(50);
        targetBtn.dispatchEvent(new PointerEvent('pointerup', { ...mouseOpts, pointerType: 'mouse', isPrimary: true }));
        targetBtn.click();

        console.log("✅ Generate clicked for next scene!");
        return true;
    }

    console.warn("⚠️ Could not find Generate button after all methods");
    return false;
};

// ========== MULTI-SCENE PIPELINE INTERFACE ==========
export interface MultiScenePipelineConfig {
    characterImage: string;
    productImage: string;
    imagePrompt: string;
    videoPrompt: string;          // Full video prompt for Scene 1 (from Video Prompt Motion)
    sceneCount: number;           // Total number of scenes (1, 2, or 3)
    sceneScripts: string[];       // Array of scripts for each scene (Scene 2+ only uses script part)
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
    error?: string;
}> => {
    const { sceneCount, sceneScripts } = config;
    const totalSteps = sceneCount === 1 ? 12 : 12 + (sceneCount - 1) * 4;

    console.log(`🚀 Starting Multi-Scene Pipeline - ${sceneCount} scene(s)`);
    console.log(`📝 Scene Scripts:`, sceneScripts);

    // Reset upload state
    resetUploadState();

    // Array to collect all video URLs for multi-scene
    const videoUrls: string[] = [];

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

        // ===== SCENE 1: Generate First Video =====
        report("Switching to Image Mode...", 3, totalSteps);
        await switchToImageTab(selectors);
        await delay(1500);

        report("Uploading Character...", 4, totalSteps);
        await uploadSingleImage(config.characterImage, 1, selectors);
        await delay(2000);

        report("Uploading Product...", 5, totalSteps);
        await uploadSingleImage(config.productImage, 2, selectors);
        await delay(2000);

        console.log("⏳ Waiting for images to load...");
        await delay(10000);

        report("Generating Base Image...", 6, totalSteps);
        await fillPromptAndGenerate(config.imagePrompt);

        report("Waiting for Image...", 7, totalSteps);
        const imageGenSuccess = await waitForGenerationComplete(selectors);
        if (!imageGenSuccess) throw new Error("Image Gen Timeout");

        await delay(15000);

        report("Selecting Image...", 8, totalSteps);
        const imageClicked = await clickOnGeneratedImage(selectors);
        if (!imageClicked) throw new Error("Could not select image");

        await delay(10000);

        report("Generating Scene 1...", 9, totalSteps);
        // Scene 1 uses full videoPrompt but ONLY with Scene 1 script (remove Scene 2, 3 scripts)
        let scene1Prompt = config.videoPrompt || sceneScripts[0] || config.imagePrompt;

        // If videoPrompt contains multiple scenes, keep only Scene 1 script
        if (scene1Prompt.includes('🎬 ฉาก 2:') || scene1Prompt.includes('🎬 ฉาก 3:')) {
            // Remove Scene 2 and Scene 3 scripts from the prompt
            scene1Prompt = scene1Prompt
                .replace(/🎬 ฉาก 2:[^\n]*(\n|$)/g, '')
                .replace(/🎬 ฉาก 3:[^\n]*(\n|$)/g, '')
                .replace(/\n{3,}/g, '\n\n')  // Clean up extra newlines
                .trim();
            console.log("📝 Scene 1 prompt cleaned - removed Scene 2, 3 scripts");
        }

        await switchToVideoModeAndGenerate(scene1Prompt, selectors);

        report("Waiting for Video 1...", 10, totalSteps);
        const video1Src = await waitForVideoComplete(300000);
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

        // ===== MULTI-SCENE: Add more clips =====
        console.log(`🎬 Multi-scene mode: Adding ${sceneCount - 1} more scene(s)...`);

        // Hover video and click "เพิ่มลงในฉาก"
        report("Adding to Scene Builder...", 11, totalSteps);
        const addedToScene = await hoverVideoAndAddToScene(selectors);
        if (!addedToScene) {
            console.warn("⚠️ Could not add to scene, trying to continue...");
        }

        await delay(5000); // Wait for scene builder to load

        // Generate additional scenes
        console.log("📋 Scene Scripts Array:", sceneScripts);
        console.log("📋 Scene Scripts Length:", sceneScripts.length);

        for (let sceneIndex = 1; sceneIndex < sceneCount; sceneIndex++) {
            const sceneNum = sceneIndex + 1;
            const stepBase = 12 + (sceneIndex - 1) * 4;

            console.log(`🎬 ========== Generating Scene ${sceneNum} ==========`);
            console.log(`📝 sceneScripts[${sceneIndex}] = "${sceneScripts[sceneIndex]?.substring(0, 100) || 'UNDEFINED'}..."`);

            // ===== STEP 1: Click + button to add new clip =====
            report(`Adding Clip ${sceneNum}...`, stepBase, totalSteps);
            console.log(`\n🎯 STEP 1: Click + and Extend for Scene ${sceneNum}...`);

            const clipAdded = await clickAddClipButton();
            if (!clipAdded) {
                console.warn(`⚠️ Could not add clip ${sceneNum} - clickAddClipButton failed`);
                continue;
            }

            // ===== รอให้ expand view โหลดเสร็จสมบูรณ์ (5 วินาที) =====
            console.log(`⏳ Waiting 5 seconds for expand view to fully load...`);
            await delay(5000);

            // ===== STEP 2: Fill prompt for this scene =====
            console.log(`\n🎯 STEP 2: Filling prompt for Scene ${sceneNum}...`);
            report(`Filling Scene ${sceneNum} Prompt...`, stepBase + 1, totalSteps);
            await delay(2000); // รอ 2 วินาทีก่อนใส่ prompt

            // Get the script for this scene (index 1 = scene 2, index 2 = scene 3)
            const basePrompt = sceneScripts[sceneIndex];

            if (!basePrompt || basePrompt.trim() === '') {
                console.error(`❌ ERROR: No script found for Scene ${sceneNum} (sceneScripts[${sceneIndex}] is empty)`);
                continue;
            }

            console.log(`📝 Base Prompt for Scene ${sceneNum}: "${basePrompt.substring(0, 80)}..."`);

            // Determine scene role in advertisement structure
            const sceneRole = sceneNum === 2 ? 'DEMO (โชว์การใช้งาน/คุณสมบัติหลัก)' : 'CLOSING (สรุปและ Call-to-Action)';
            const totalScenes = sceneCount;

            // Enhanced consistency instructions (Thai + English for VideoFX)
            const scenePrompt = `${basePrompt}

[🎬 ข้อกำหนดสำคัญสำหรับฉาก ${sceneNum}/${totalScenes}:]

🎭 ความต่อเนื่องของตัวละคร (CHARACTER CONSISTENCY):
- ใช้คนเดียวกับฉาก 1 ทุกประการ: หน้าตา ผิวพรรณ ทรงผม เสื้อผ้า
- เสียงพากย์เดียวกัน: น้ำเสียง สำเนียง ความเร็วการพูด เหมือนฉาก 1
- ภาษาเดียวกัน: ใช้ภาษาไทยตลอด ห้ามเปลี่ยนภาษา

📦 ความต่อเนื่องของสินค้า (PRODUCT CONSISTENCY):
- รักษาสินค้าเดียวกับฉาก 1: packaging, สี, รูปทรง, ขนาด ต้องเหมือนกัน
- ถือสินค้าด้วยมือเดียวกัน ในมุมที่คล้ายกัน
- สินค้าต้องเด่นชัดในเฟรม

📖 โครงสร้างโฆษณา (AD STRUCTURE):
- ฉากนี้คือ: ${sceneRole}
- ต่อเนื่องจากฉาก ${sceneNum - 1} โดยตรง
- การกระทำต้องไหลลื่นจากจุดที่ฉากก่อนหน้าจบลง

🔗 การเชื่อมต่อเรื่องราว (STORY CONTINUITY):
- ห้ามเริ่มใหม่ ห้ามเปลี่ยนฉากหลัง ห้ามเปลี่ยนมุมกล้องอย่างกระทันหัน
- เหตุการณ์ต้องต่อเนื่องราวกับตัดจากคลิปเดียวกัน
- อารมณ์และพลังงานต้องไหลต่อจากฉากก่อนหน้า`;

            console.log(`📝 Full Scene ${sceneNum} Prompt (first 150 chars): "${scenePrompt.substring(0, 150)}..."`);

            // ===== STEP 3: Fill prompt and generate =====
            console.log(`\n🎯 STEP 3: Fill prompt and click Generate for Scene ${sceneNum}...`);
            const promptFilled = await fillNextScenePromptAndGenerate(scenePrompt, selectors);
            if (!promptFilled) {
                console.warn(`⚠️ Could not fill prompt for scene ${sceneNum}`);
                continue;
            }

            // รอ 3 วินาทีหลังกด generate
            console.log(`⏳ Waiting 3 seconds after clicking generate...`);
            await delay(3000);

            // ===== STEP 4: Wait for video generation =====
            console.log(`\n🎯 STEP 4: Waiting for Scene ${sceneNum} video to complete...`);
            report(`Generating Scene ${sceneNum}...`, stepBase + 2, totalSteps);
            const sceneVideoSrc = await waitForVideoComplete(300000);
            if (!sceneVideoSrc) {
                console.warn(`⚠️ Scene ${sceneNum} generation timeout`);
                continue;
            }

            // เก็บ URL ของ scene นี้
            videoUrls.push(sceneVideoSrc);
            console.log(`📹 Collected video URL ${sceneNum}: ${sceneVideoSrc.substring(0, 50)}...`);

            console.log(`✅ Scene ${sceneNum} Complete!`);
            report(`Scene ${sceneNum} Done!`, stepBase + 3, totalSteps);

            // ===== รอ 5 วินาทีก่อนทำฉากถัดไป =====
            if (sceneIndex < sceneCount - 1) {
                console.log(`\n⏳ Waiting 5 seconds before starting next scene...`);
                await delay(5000);
            }
        }

        // รอให้ทุก clip gen เสร็จ 100% ก่อน download
        report("Waiting for all clips to complete 100%...", totalSteps - 2, totalSteps);
        const allComplete = await waitForAllClipsComplete(300000, sceneCount); // รอสูงสุด 5 นาที, ส่งจำนวนฉากไปด้วย

        if (!allComplete) {
            console.warn("⚠️ Some clips may not be complete, attempting download anyway...");
        }

        // Final download
        report("Downloading Final Video...", totalSteps - 1, totalSteps);
        await delay(2000);
        const finalDownload = await handleVideoDownload(selectors);

        report("All Scenes Complete!", totalSteps, totalSteps);

        // Log summary of collected URLs
        console.log(`🎬 Video collection complete! Total: ${videoUrls.length} clips`);
        videoUrls.forEach((url, i) => console.log(`  Clip ${i + 1}: ${url.substring(0, 60)}...`));

        return {
            success: true,
            videoUrl: finalDownload?.startsWith('http') ? finalDownload : video1Src,
            videoUrls: videoUrls  // Array ของ URL ทุก clip สำหรับเล่นต่อเนื่อง
        };

    } catch (error: any) {
        console.error("Multi-Scene Pipeline Error:", error);
        return { success: false, error: error.message };
    }
};
