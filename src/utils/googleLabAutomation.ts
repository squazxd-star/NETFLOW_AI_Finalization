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
                const clickOpts = { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width/2, clientY: rect.top + rect.height/2 };
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
                    
                    const clickOpts = { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width/2, clientY: rect.top + rect.height/2 };
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
            
            const clickOpts = { bubbles: true, cancelable: true, view: window, clientX: rect.left + rect.width/2, clientY: rect.top + rect.height/2 };
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

const handleVideoDownload = async (selectors: AutomationSelectors): Promise<string | null> => {
    console.log("💾 Attempting Auto-Download...");

    // 1. Try clicking Download button if available
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
