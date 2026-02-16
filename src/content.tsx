import React from 'react';
import ReactDOM from 'react-dom/client';
import VideoResultOverlay from './components/overlay/VideoResultOverlay';
import AutomationOverlay from './components/overlay/AutomationOverlay';
import './index.css'; // Reuse main styles or import specific overlay styles
import { getFormattedPrompt } from './utils/videoPromptTemplates';
import { uploadImageToWeb, fillPrompt, clickButton } from './utils/controls';
import Controls from './services/automation/controls';

console.log('NetFlow AI Content Script Loaded');
Controls.init();

// ========== CHARACTER CONSISTENCY HELPER ==========
/**
 * Build detailed character description from payload settings
 * This description is prepended to every scene prompt to maintain visual consistency
 */
const buildCharacterDescFromPayload = (payload: any, productName: string): string => {
    const gender = payload.gender || 'female';
    const expression = payload.expression || payload.emotion || 'happy';
    const ageRange = payload.ageRange || 'young-adult';
    const personality = payload.personality || 'cheerful';
    const clothingStyles = payload.clothingStyles || ['casual'];
    const background = payload.background || 'studio';
    const cameraAngles = payload.cameraAngles || ['front'];
    const voiceSetting = payload.voiceSetting || 'original';

    // Gender + Age mapping
    const genderText = gender === 'male' ? 'Thai man' : 'Thai woman';
    const ageMapping: Record<string, string> = {
        'teen': '16-20 years old',
        'young-adult': '25-30 years old',
        'adult': '35-40 years old',
        'middle-age': '50-55 years old',
        'senior': '65-70 years old'
    };
    const ageText = ageMapping[ageRange] || '25-30 years old';

    // Personality to expression
    const personalityMapping: Record<string, string> = {
        'cheerful': 'energetic enthusiastic presenter, bright smile',
        'calm': 'calm composed demeanor, gentle smile',
        'professional': 'professional trustworthy, confident posture',
        'playful': 'playful fun personality, animated expressions',
        'mysterious': 'cool mysterious vibe, subtle smile'
    };
    const personalityText = personalityMapping[personality] || 'energetic enthusiastic presenter';

    // Clothing
    const clothingMapping: Record<string, string> = {
        'casual': gender === 'female' ? 'white V-neck t-shirt, light blue jeans' : 'navy polo shirt, khaki pants',
        'formal': gender === 'female' ? 'cream silk blouse, black skirt' : 'white dress shirt, blue suit',
        'fashion': gender === 'female' ? 'trendy cropped top, high-waisted pants' : 'designer t-shirt, fitted blazer',
        'sporty': gender === 'female' ? 'athletic tank top, yoga pants' : 'sports jersey, athletic shorts'
    };
    const mainStyle = clothingStyles[0] || 'casual';
    const clothingText = clothingMapping[mainStyle] || clothingMapping['casual'];

    // Background
    const backgroundMapping: Record<string, string> = {
        'studio': 'clean white studio backdrop, soft lighting',
        'outdoor': 'bright outdoor setting, natural sunlight',
        'home': 'cozy modern living room, warm ambient light',
        'office': 'professional office, neutral colors',
        'abstract': 'abstract gradient background'
    };
    const backgroundText = backgroundMapping[background] || 'clean studio backdrop';

    // Expression mapping
    const expressionMapping: Record<string, string> = {
        'neutral': 'natural pleasant expression',
        'happy': 'bright genuine smile',
        'excited': 'enthusiastic excited expression'
    };
    const expressionText = expressionMapping[expression] || 'natural pleasant expression';

    const cameraAngleMapping: Record<string, string> = {
        'front': 'front-facing medium shot, eye-level',
        'side': '3/4 side angle, flattering profile',
        'close-up': 'close-up on face and product details (keep face identical)',
        'full-body': 'full-body shot showing outfit and product',
        'dynamic': 'dynamic camera movement but keep identity consistent'
    };
    const cameraAngleText = (Array.isArray(cameraAngles) ? cameraAngles : [cameraAngles])
        .map((a: string) => cameraAngleMapping[a] || a)
        .join(', ');

    return `${genderText}, ${ageText}, ${personalityText}, ${expressionText}
Outfit: ${clothingText}
Setting: ${backgroundText}
Product: ${productName || 'the advertised product'}
Camera: ${cameraAngleText}`;
};

const buildUnifiedScenePrompt = (
    payload: any,
    productName: string,
    characterDesc: string,
    identityLock: string,
    sceneNum: number,
    totalScenes: number,
    script: string
): string => {
    // ===== Camera (from UI: cameraAngles) =====
    const cameraValue = Array.isArray(payload.cameraAngles) ? payload.cameraAngles[0] : (payload.cameraAngles || 'front');
    const cameraTextMap: Record<string, string> = {
        'front': 'Static camera, steady shot',
        'side': 'Static camera, side angle',
        'close-up': 'Close-up shot',
        'full-body': 'Full-body framing',
        'dynamic': 'Dynamic handheld camera'
    };
    const cameraText = cameraTextMap[cameraValue] || 'Static camera, steady shot';

    // ===== Scene (from UI: background) =====
    const sceneMap: Record<string, string> = {
        'studio': 'modern studio',
        'outdoor': 'outdoor setting',
        'home': 'living room',
        'office': 'office setting',
        'abstract': 'modern setting'
    };
    const sceneText = sceneMap[payload.background || 'studio'] || 'modern setting';

    // ===== Action (from UI: movement + product) =====
    const pName = productName || 'the product';
    const movementMap: Record<string, string> = {
        'static': `holds ${pName} steadily, looking at camera`,
        'minimal': `presents ${pName} with gentle gestures`,
        'active': `showcases ${pName}, showing details`
    };
    const actionText = payload.action
        || movementMap[payload.movement || 'minimal']
        || `Presents ${pName} naturally to the camera`;

    // ===== Voice Identity (from UI: gender + ageRange + voiceTone) =====
    const voiceGender = (payload.gender || 'female') === 'male' ? 'Male' : 'Female';
    const ageMap: Record<string, string> = {
        'teen': '18-year-old', 'young-adult': '25-year-old', 'adult': '30-year-old',
        'middle-age': '40-year-old', 'senior': '50-year-old'
    };
    const ageText = ageMap[payload.ageRange || 'young-adult'] || '25-year-old';

    // ===== Voice Delivery (from UI: voiceTone) — detailed for voice lock =====
    const deliveryMap: Record<string, string> = {
        'energetic': 'fast-paced, high-energy, upbeat rhythm, bright and lively',
        'calm': 'slow-paced, gentle, measured rhythm, soft and soothing',
        'friendly': 'moderate pace, warm and conversational, natural rhythm',
        'professional': 'measured pace, clear articulation, confident and composed'
    };
    const deliveryText = deliveryMap[payload.voiceTone || 'energetic'] || 'fast-paced, high-energy, bright and lively';

    // ===== Voice Pitch/Timbre (from age + gender) =====
    const pitchMap: Record<string, string> = {
        'teen': 'high-pitched, bright and youthful timbre',
        'young-adult': 'mid-high pitch, clear and bright timbre',
        'adult': 'mid-range pitch, clear and confident timbre',
        'middle-age': 'mid-low pitch, warm and rich timbre',
        'senior': 'lower pitch, deep and mature timbre'
    };
    const pitchText = pitchMap[payload.ageRange || 'young-adult'] || 'mid-high pitch, clear and bright timbre';

    // ===== Expression (from UI: expression) =====
    const expressionMap: Record<string, string> = {
        'neutral': 'natural pleasant expression',
        'happy': 'warm smile, friendly and approachable',
        'excited': 'excited, enthusiastic expression with energy',
        'serious': 'serious, focused and confident expression'
    };
    const expressionText = expressionMap[payload.expression || 'neutral'] || 'natural pleasant expression';

    // Strip surrounding quotes
    const cleanScript = (script || '').trim().replace(/^"+|"+$/g, '');

    // ===== JSON prompt — same structure as before, upgraded voice clarity =====
    const promptObj: Record<string, any> = {
        style: 'UGC, natural smartphone footage, real-person feel',
        aspect_ratio: payload.aspectRatio || '9:16',
        model: { description: 'Person from the reference image' },
        camera: cameraText,
        scene: sceneText,
        background: 'Background from reference image',
        product: pName,
        action: actionText,
        voice: `${voiceGender} Thai voice speaking, ${pitchText}, ${deliveryText}, steady consistent volume, clean close-mic recording`,
        voiceover: {
            language: 'thai',
            text: cleanScript
        },
        restrictions: 'No text overlays, no floating text in the video'
    };

    if (sceneNum > 1) {
        promptObj.voice_continuity = `Use the EXACT same ${voiceGender.toLowerCase()} Thai voice from previous clip. Identical pitch, identical speed, identical energy, identical tone, identical recording quality. Continuous take from the same speaker.`;
    }

    return JSON.stringify(promptObj);
};

// Global Error Handler to catch "Node cannot be found"
window.onerror = (msg, url, line, col, error) => {
    if (typeof msg === 'string' && msg.includes('Node cannot be found')) {
        console.error('🔥 EXCEPTION CAUGHT: Node cannot be found');
        console.error('Stack:', error?.stack);
        console.error('Location:', url, line, col);
        // Prevent default logging if we handled it, but usually we want to see it
        return false;
    }
};

// ========== AUTO-CLICK NEW PROJECT ==========
const autoClickNewProject = async () => {
    console.log('🔄 Auto-click: Scanning for "New Project" button...');

    try {
        // Wait for page to fully load
        await new Promise(r => setTimeout(r, 2000));

        // Check if we're on dashboard (not in workspace)
        const isWorkspace = document.body.innerText.includes('สร้าง') &&
            (document.querySelector('textarea') !== null ||
                document.body.innerText.includes('อัพโหลด'));

        if (isWorkspace) {
            console.log('📍 Already in workspace, skipping auto-click');
            return;
        }

        // Find the button - target <button> containing "โปรเจ็กต์ใหม่"
        // Use Array.from to get a stable static list
        const allButtons = Array.from(document.querySelectorAll('button'));
        console.log(`🔍 Found ${allButtons.length} buttons on page`);

        for (const btn of allButtons) {
            // Safety check: ensure button is still connected to DOM
            if (!btn.isConnected) continue;

            const text = btn.textContent?.trim() || '';
            if (text.includes('โปรเจ็กต์ใหม่') || text.includes('New project')) {
                console.log(`✅ Found target button: "${text}"`);

                // Double check connection before accessing rect
                if (!btn.isConnected) {
                    console.warn('⚠️ Button detached before click, tracking...');
                    continue;
                }

                // Get button center coordinates
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                console.log(`📍 Button position: (${centerX}, ${centerY}), size: ${rect.width}x${rect.height}`);

                // Simulate full click sequence
                const eventOpts = {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: centerX,
                    clientY: centerY,
                    button: 0,
                    buttons: 1
                };

                try {
                    btn.dispatchEvent(new PointerEvent('pointerdown', { ...eventOpts, pointerType: 'mouse' }));
                    btn.dispatchEvent(new MouseEvent('mousedown', eventOpts));
                    btn.dispatchEvent(new PointerEvent('pointerup', { ...eventOpts, pointerType: 'mouse' }));
                    btn.dispatchEvent(new MouseEvent('mouseup', eventOpts));
                    btn.dispatchEvent(new MouseEvent('click', eventOpts));
                    btn.click();
                    console.log('🎯 CLICKED! Waiting for navigation...');
                } catch (clickErr) {
                    console.error('❌ Error during click dispatch:', clickErr);
                }

                return;
            }
        }

        console.warn('⚠️ "New Project" button not found. Buttons on page:');
        // truncated logging to avoid spam
        // allButtons.forEach((b, i) => console.log(`  ${i}: "${b.textContent?.trim().substring(0, 30)}"`));
    } catch (e) {
        console.error("❌ Critical error in autoClickNewProject:", e);
    }
};

// Run auto-click after page loads
if (document.readyState === 'complete') {
    // Add small delay to ensure everything is stable
    setTimeout(autoClickNewProject, 500);
} else {
    window.addEventListener('load', () => setTimeout(autoClickNewProject, 500));
}

// Create a container for our overlay
const containerId = 'netflow-ai-overlay-root';
let rootContainer = document.getElementById(containerId);

if (!rootContainer) {
    rootContainer = document.createElement('div');
    rootContainer.id = containerId;
    document.body.appendChild(rootContainer);
}

// Create a shadow root to isolate styles
const shadowRoot = rootContainer.attachShadow({ mode: 'open' });

// Inject styles into shadow DOM with proper error handling for Mac compatibility
// Check if chrome.runtime is available before accessing getURL
try {
    if (chrome?.runtime?.id) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = chrome.runtime.getURL('assets/index.css');
        styleLink.onerror = () => {
            console.log('ℹ️ Extension styles: Using inline fallback');
        };
        shadowRoot.appendChild(styleLink);
    } else {
        console.log('ℹ️ Extension context not ready, styles will load on next init');
    }
} catch (e) {
    // Extension context may be invalidated - this is OK, styles will use defaults
    console.log('ℹ️ Extension styles: Context unavailable, using defaults');
}

const renderRoot = ReactDOM.createRoot(shadowRoot);

const ContentScriptApp = () => {
    const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
    const [videoUrls, setVideoUrls] = React.useState<string[]>([]);  // Array for multi-scene
    const [isAutomationRunning, setIsAutomationRunning] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState("Initializing...");
    const [stepNumber, setStepNumber] = React.useState(0);
    const [totalSteps, setTotalSteps] = React.useState(12);
    const [currentSceneCount, setCurrentSceneCount] = React.useState(1);

    // คำนวณ totalSteps ตามจำนวนฉาก
    const calculateTotalSteps = (sceneCount: number): number => {
        // 1 ฉาก: 12 steps (upload, gen image, select, gen video, download)
        // 2 ฉาก: 16 steps (+ add clip, fill prompt, gen video scene 2, wait)
        // 3 ฉาก: 20 steps (+ add clip, fill prompt, gen video scene 3, wait)
        return 12 + (sceneCount - 1) * 4;
    };

    // สร้าง step labels ตามจำนวนฉาก
    const getStepLabel = (step: number, sceneCount: number): string => {
        const baseSteps = [
            "กำลังเริ่มต้น...",                    // 1
            "กำลังอัพโหลดรูป Character...",        // 2
            "กำลังอัพโหลดรูป Product...",          // 3
            "กำลังสร้างคำสั่ง...",                 // 4
            "กำลังเปิดโหมดสร้างภาพ...",            // 5
            "กำลังสร้างภาพ...",                    // 6
            "กำลังรอภาพ...",                       // 7
            "กำลังเลือกภาพ...",                    // 8
            "กำลังสลับเป็นโหมดวิดีโอ...",          // 9
            `กำลังสร้างวิดีโอฉาก 1...`,            // 10
            "กำลังรอวิดีโอฉาก 1...",               // 11
        ];

        if (step <= 11) {
            return baseSteps[step - 1] || `ขั้นตอนที่ ${step}`;
        }

        // สำหรับ multi-scene
        if (sceneCount > 1) {
            const sceneIndex = Math.floor((step - 12) / 4) + 2; // ฉากที่ 2, 3...
            const sceneStep = (step - 12) % 4;

            if (sceneIndex <= sceneCount) {
                switch (sceneStep) {
                    case 0: return `กำลังเพิ่มคลิปฉาก ${sceneIndex}...`;
                    case 1: return `กำลังใส่ Prompt ฉาก ${sceneIndex}...`;
                    case 2: return `กำลังสร้างวิดีโอฉาก ${sceneIndex}...`;
                    case 3: return `ฉาก ${sceneIndex} เสร็จสิ้น!`;
                }
            }
        }

        // ขั้นตอนสุดท้าย
        const total = calculateTotalSteps(sceneCount);
        if (step === total - 1) return "กำลังรอทุกคลิปเสร็จ 100%...";
        if (step === total) return "กำลังดาวน์โหลด...";

        return `ขั้นตอนที่ ${step}`;
    };

    React.useEffect(() => {
        const messageListener = (message: any, sender: any, sendResponse: any) => {
            if (message.type === 'SHOW_VIDEO_RESULT' && message.videoUrl) {
                console.log('Received video URL:', message.videoUrl);
                setVideoUrl(message.videoUrl);
            }

            if (message.type === 'INJECT_AUTOMATION_DATA') {
                console.log('Received automation data:', message);
                handleAutomation(message.payload);
            }

            // NEW: Multi-Scene Pipeline Handler
            if (message.type === 'TWO_STAGE_PIPELINE') {
                // Acknowledge immediately so chrome.tabs.sendMessage callback doesn't hit lastError
                try {
                    sendResponse?.({ received: true, status: 'processing' });
                } catch {
                    // ignore
                }

                (async () => {
                    console.log('🚀 Starting Multi-Scene Pipeline:', message);
                    const { runMultiScenePipeline } = await import('./utils/googleLabAutomation');
                    const { generatePrompts, generateQuickPrompts } = await import('./services/aiPromptService');

                    const payload = message.payload;
                    console.log("📦 Received payload:", payload);

                    const {
                        characterImage,
                        productImage,
                        productName,
                        template,
                        voiceTone,
                        saleStyle,
                        language,
                        accent,
                        hookText,
                        ctaText,
                        mustUseKeywords,
                        avoidKeywords,
                        gender,
                        expression,
                        emotion,  // alias for expression
                        movement,
                        clipDuration,
                        aspectRatio,
                        videoDuration,
                        aiPrompt,
                        useAiScript,
                        sceneCount: payloadSceneCount,  // Number of scenes (1, 2, or 3)
                        // Explicit prompts from Workflow Control
                        videoPrompt: explicitVideoPrompt,
                        imagePrompt: explicitImagePrompt
                    } = payload;

                    // Determine scene count (default 1 if not specified)
                    const sceneCount = payloadSceneCount || Math.max(1, Math.floor((clipDuration || 8) / 8));
                    console.log(`🎬 Scene Count: ${sceneCount}`);

                    // ตั้งค่า overlay state
                    setCurrentSceneCount(sceneCount);
                    setTotalSteps(calculateTotalSteps(sceneCount));
                    setIsAutomationRunning(true);
                    setStepNumber(1);
                    setCurrentStep(getStepLabel(1, sceneCount));

                    let imagePrompt: string;
                    let videoPrompt: string = "";  // Full video prompt for Scene 1
                    let sceneScripts: string[] = [];  // Individual scripts for Scene 2+

                    // Priority 1: Use explicit prompts if provided (from Workflow Control step 3)
                    if (explicitVideoPrompt && explicitImagePrompt) {
                        console.log("📝 Using explicit prompts from Workflow Control");
                        imagePrompt = explicitImagePrompt;
                        videoPrompt = explicitVideoPrompt;  // Full prompt for Scene 1

                        // Parse individual scene scripts for Scene 2+
                        console.log("🔍 Parsing scene scripts from prompt...");

                        // Try multiple regex patterns
                        let sceneMatches: string[] | null = null;

                        // Pattern 1: Curly double quotes ""
                        sceneMatches = explicitVideoPrompt.match(/🎬 ฉาก \d+:\s*""([^""]+)""/g);
                        console.log("  Pattern 1 (curly double):", sceneMatches?.length || 0);

                        // Pattern 2: Regular double quotes ""
                        if (!sceneMatches || sceneMatches.length === 0) {
                            sceneMatches = explicitVideoPrompt.match(/🎬 ฉาก \d+:\s*"([^"]+)"/g);
                            console.log("  Pattern 2 (regular double):", sceneMatches?.length || 0);
                        }

                        // Pattern 3: Any quotes variation
                        if (!sceneMatches || sceneMatches.length === 0) {
                            sceneMatches = explicitVideoPrompt.match(/🎬 ฉาก \d+:\s*["""''']([^"""''']+)["""''']/g);
                            console.log("  Pattern 3 (any quotes):", sceneMatches?.length || 0);
                        }

                        if (sceneMatches && sceneMatches.length > 0) {
                            sceneScripts = sceneMatches.map((m, idx) => {
                                // Extract text between any type of quotes
                                const extracted = m.replace(/🎬 ฉาก \d+:\s*["""''']/, '').replace(/["""''']$/, '').trim();
                                console.log(`  📝 Scene ${idx + 1} script: "${extracted.substring(0, 50)}..."`);
                                return extracted;
                            });
                            console.log("✅ Parsed scene scripts count:", sceneScripts.length);
                        }

                        if (sceneScripts.length === 0) {
                            console.warn("⚠️ Could not parse scene scripts, using full prompt for all scenes");
                            sceneScripts = Array(sceneCount).fill(explicitVideoPrompt);
                        }
                    } else {
                        // Build prompt config for generation
                        const promptConfig = {
                            productImage,
                            characterImage,
                            productName: productName || "Product",
                            template: template || "product-review",
                            voiceTone: voiceTone || "friendly",
                            saleStyle: saleStyle || "storytelling",
                            language: language || "th-central",
                            accent: accent || "central",
                            hookText: hookText || "",
                            ctaText: ctaText || "",
                            mustUseKeywords: mustUseKeywords || "",
                            avoidKeywords: avoidKeywords || "",
                            clipDuration: clipDuration || 16,
                            aspectRatio: aspectRatio || "9:16",
                            gender: gender || "female",
                            expression: expression || emotion || "happy",
                            movement: movement || "minimal",
                            userScript: aiPrompt || ""  // User-provided script
                        };

                        // Generate prompts using AI or quick mode
                        if (useAiScript && productImage) {
                            console.log("🤖 Using AI to generate prompts...");
                            try {
                                const prompts = await generatePrompts(promptConfig);
                                imagePrompt = prompts.imagePrompt;
                                videoPrompt = prompts.videoPrompt;  // Full prompt for Scene 1

                                // Parse individual scene scripts for Scene 2+
                                console.log("🔍 AI: Parsing scene scripts...");
                                let sceneMatches: string[] | null = null;

                                // Pattern 1: Curly double quotes ""
                                sceneMatches = prompts.videoPrompt.match(/🎬 ฉาก \d+:\s*""([^""]+)""/g);
                                console.log("  Pattern 1:", sceneMatches?.length || 0);

                                // Pattern 2: Regular double quotes ""
                                if (!sceneMatches || sceneMatches.length === 0) {
                                    sceneMatches = prompts.videoPrompt.match(/🎬 ฉาก \d+:\s*"([^"]+)"/g);
                                    console.log("  Pattern 2:", sceneMatches?.length || 0);
                                }

                                if (sceneMatches && sceneMatches.length > 0) {
                                    sceneScripts = sceneMatches.map((m, idx) => {
                                        const extracted = m.replace(/🎬 ฉาก \d+:\s*["""''']/, '').replace(/["""''']$/, '').trim();
                                        console.log(`  📝 Scene ${idx + 1}: "${extracted.substring(0, 50)}..."`);
                                        return extracted;
                                    });
                                }

                                if (sceneScripts.length === 0) {
                                    console.warn("⚠️ Could not parse AI scene scripts, using full prompt");
                                    sceneScripts = Array(sceneCount).fill(prompts.videoPrompt);
                                }
                                console.log("✅ AI Prompts generated, scenes:", sceneScripts.length);
                            } catch (e) {
                                console.warn("⚠️ AI prompt generation failed, using quick mode:", e);
                                const prompts = generateQuickPrompts(promptConfig);
                                imagePrompt = prompts.imagePrompt;
                                videoPrompt = prompts.videoPrompt;
                                sceneScripts = Array(sceneCount).fill(prompts.videoPrompt);
                            }
                        } else if (aiPrompt) {
                            console.log("📝 Using manual aiPrompt");
                            // Parse user-provided scripts (split by double newline for each scene)
                            const userScenes = aiPrompt.split(/\n{2,}/).filter((s: string) => s.trim());
                            // Scene 1 uses full aiPrompt as videoPrompt
                            videoPrompt = aiPrompt;
                            imagePrompt = userScenes[0] || aiPrompt;
                            // Scene 2+ uses individual scripts
                            if (userScenes.length >= sceneCount) {
                                sceneScripts = userScenes.slice(0, sceneCount);
                            } else {
                                sceneScripts = [...userScenes];
                                while (sceneScripts.length < sceneCount) {
                                    sceneScripts.push(userScenes[userScenes.length - 1] || aiPrompt);
                                }
                            }
                        } else {
                            console.log("⚡ Using quick prompt generation");
                            const prompts = generateQuickPrompts(promptConfig);
                            imagePrompt = prompts.imagePrompt;
                            videoPrompt = prompts.videoPrompt;
                            sceneScripts = Array(sceneCount).fill(prompts.videoPrompt);
                        }
                    }

                    // ========== INJECT CHARACTER DESCRIPTION FOR CONSISTENCY ==========
                    // Build detailed character description based on UI settings
                    const characterDesc = buildCharacterDescFromPayload(payload, productName);

                    const identityLock = `Same person in every scene, matching the reference face image exactly. Same voice, same tone, same speaking speed, Thai language only throughout.`;

                    // Use one consistent prompt template for ALL scenes.
                    // Only script content changes by scene, as requested.
                    const rawScripts = sceneScripts.map((s) => (s || '').trim()).filter(Boolean);
                    sceneScripts = Array.from({ length: sceneCount }, (_, index) => {
                        const sourceScript = rawScripts[index]
                            || rawScripts[rawScripts.length - 1]
                            || (videoPrompt || '').trim()
                            || '';

                        return buildUnifiedScenePrompt(
                            payload,
                            productName,
                            characterDesc,
                            identityLock,
                            index + 1,
                            sceneCount,
                            sourceScript
                        );
                    });

                    // Scene 1 prompt uses the exact same template as other scenes.
                    if (sceneScripts.length > 0) {
                        videoPrompt = sceneScripts[0];
                    }

                    // Also constrain the base image generation prompt.
                    if (imagePrompt && imagePrompt.trim()) {
                        imagePrompt = `${characterDesc}\n${imagePrompt}`;
                    }

                    console.log("✅ Character consistency description injected into all scenes");
                    // ===================================================================

                    console.log("📋 Final Config:");
                    console.log("  Image Prompt:", imagePrompt.substring(0, 100) + "...");
                    console.log("  Scene Count:", sceneCount);
                    console.log("  Scene Scripts:", sceneScripts.map((s, i) => `Scene ${i + 1}: ${s.substring(0, 50)}...`));

                    try {
                        const result = await runMultiScenePipeline({
                            characterImage,
                            productImage,
                            imagePrompt,
                            videoPrompt,
                            sceneCount,
                            sceneScripts
                        }, (step, current, total) => {
                            // Update Overlay State
                            setIsAutomationRunning(true);
                            setCurrentStep(step);
                            setStepNumber(current);
                            setTotalSteps(total);
                        });

                        console.log("🎬 Pipeline Result:", result);

                        // Show video result if successful
                        if (result.success) {
                            console.log("✅ Pipeline Success! Result:", result);

                            if (result.videoUrl) {
                                setVideoUrl(result.videoUrl);
                            }

                            // เก็บ videoUrls array สำหรับ multi-scene playback
                            if (result.videoUrls && result.videoUrls.length > 0) {
                                console.log(`🎬 Collected ${result.videoUrls.length} video URLs for playback`);
                                setVideoUrls(result.videoUrls);
                            }

                            // เก็บ sceneCount สำหรับแสดงผลใน overlay
                            if (result.sceneCount) {
                                setCurrentSceneCount(result.sceneCount);
                            }

                            // Notify the extension popup
                            chrome.runtime.sendMessage({
                                type: 'VIDEO_GENERATION_COMPLETE',
                                videoUrl: result.videoUrl,
                                videoUrls: result.videoUrls  // ส่ง array ไปด้วย
                            });
                        } else {
                            console.error("❌ Pipeline failed:", result.error);
                            // Send error back to extension
                            chrome.runtime.sendMessage({
                                type: 'PIPELINE_ERROR',
                                error: result.error
                            });
                        }
                    } catch (error) {
                        console.error("❌ An unexpected error occurred during pipeline execution:", error);
                        chrome.runtime.sendMessage({
                            type: 'PIPELINE_ERROR',
                            error: (error as Error).message || 'Unknown pipeline error'
                        });
                    } finally {
                        setIsAutomationRunning(false);
                    }
                })();

                return true;
            }

            return false;
        };

        chrome.runtime.onMessage.addListener(messageListener);
        return () => chrome.runtime.onMessage.removeListener(messageListener);
    }, []);

    const handleAutomation = async (data: any) => {
        const { productName, gender, emotion, imageBase64, personImageBase64 } = data;

        console.log("🚀 Starting Automation Sequence...");

        // 1. Prepare Image (Merge if needed)
        // We do this FIRST so the image is ready effectively 'before' the prompt logic interacts with the page UI
        let finalImageToUpload = imageBase64;

        if (imageBase64 && personImageBase64) {
            console.log("🖼️ Merging Person + Product images...");
            try {
                const { mergeImages } = await import('./utils/imageProcessing');
                // Ensure Person is on LEFT (as per prompt instructions)
                finalImageToUpload = await mergeImages(personImageBase64, imageBase64, 'horizontal');
            } catch (err) {
                console.error("❌ Merge failed:", err);
            }
        } else if (personImageBase64 && !imageBase64) {
            finalImageToUpload = personImageBase64;
        }

        // 2. Upload Image to Veo (PRIORITY ACTION)
        if (finalImageToUpload) {
            console.log("⬆️ Uploading Image to Input...");
            const success = uploadImageToWeb(finalImageToUpload, 'input[type="file"]');
            if (success) {
                console.log("✅ Image Upload Triggered");
                // Add a small delay to let Veo process the image thumbnail
                await new Promise(r => setTimeout(r, 1000));
            } else {
                console.warn("⚠️ Image Upload Failed (Input not found?)");
            }
        }

        // 3. Generate & Fill Prompt
        // Now that image is set, we fill the text.
        const promptVars = {
            productName: productName || "Generic Product",
            genderText: gender === 'male' ? "Thai man" : "Thai woman",
            emotion: emotion || "Happy",
            sceneDescription: data.sceneDescription,
            movement: data.movement,
            style: data.style // Pass style from UI if available
        };

        const finalPrompt = getFormattedPrompt(promptVars);
        console.log("📝 Generated Prompt:", finalPrompt);

        fillPrompt(finalPrompt, 'textarea[placeholder*="Describe"]');

        console.log("✨ Automation Sequence Complete. Ready for User to clicking Generate.");
    };

    // Handler สำหรับหยุด automation
    const handleStopAutomation = () => {
        console.log("🛑 User requested to stop automation");
        setIsAutomationRunning(false);
        setCurrentStep("หยุดการทำงานแล้ว");
    };

    return (
        <>
            <AutomationOverlay
                isVisible={isAutomationRunning}
                currentStep={currentStep}
                stepNumber={stepNumber}
                totalSteps={totalSteps}
                onStop={handleStopAutomation}
            />
            {/* VideoResultOverlay removed — disabled for now */}
        </>
    );
};

renderRoot.render(<ContentScriptApp />);
