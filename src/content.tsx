import React from 'react';
import ReactDOM from 'react-dom/client';
import AutomationOverlay from './components/overlay/AutomationOverlay';
import './index.css'; // Reuse main styles or import specific overlay styles
import { getFormattedPrompt } from './utils/videoPromptTemplates';
import { uploadImageToWeb, fillPrompt, clickButton } from './utils/controls';
import Controls from './services/automation/controls';

console.log('NetFlow AI Content Script Loaded');
Controls.init();

// ========== AUTO-CLICK NEW PROJECT ==========
const autoClickNewProject = async () => {
    console.log('🔄 Auto-click: Scanning for "New Project" button...');

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
    const allButtons = document.querySelectorAll('button');
    console.log(`🔍 Found ${allButtons.length} buttons on page`);

    for (const btn of allButtons) {
        const text = btn.textContent?.trim() || '';
        if (text.includes('โปรเจ็กต์ใหม่') || text.includes('New project')) {
            console.log(`✅ Found target button: "${text}"`);

            // Get button center coordinates
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            console.log(`📍 Button position: (${centerX}, ${centerY}), size: ${rect.width}x${rect.height}`);

            // Simulate full click sequence with Mac compatibility
            const eventOpts = {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: centerX,
                clientY: centerY,
                button: 0,
                buttons: 1
            };

            // Mac-specific click sequence - add more events for better compatibility
            try {
                // Focus first (Mac sometimes needs this)
                btn.focus();
                
                // Touch events for touch-enabled Macs (create proper Touch objects)
                const touch = new Touch({
                    identifier: 0,
                    target: btn,
                    clientX: centerX,
                    clientY: centerY,
                    pageX: centerX,
                    pageY: centerY,
                    screenX: centerX,
                    screenY: centerY,
                    radiusX: 2.5,
                    radiusY: 2.5,
                    rotationAngle: 0,
                    force: 1
                });
                
                btn.dispatchEvent(new TouchEvent('touchstart', { 
                    touches: [touch],
                    targetTouches: [touch]
                }));
                btn.dispatchEvent(new TouchEvent('touchend', { 
                    changedTouches: [touch]
                }));
                
                // Pointer events
                btn.dispatchEvent(new PointerEvent('pointerdown', { ...eventOpts, pointerType: 'mouse' }));
                btn.dispatchEvent(new PointerEvent('pointerup', { ...eventOpts, pointerType: 'mouse' }));
                
                // Mouse events
                btn.dispatchEvent(new MouseEvent('mousedown', eventOpts));
                btn.dispatchEvent(new MouseEvent('mouseup', eventOpts));
                btn.dispatchEvent(new MouseEvent('click', eventOpts));
                
                // Direct click as fallback
                btn.click();
                
                // Additional click for Mac compatibility
                const macClickEvent = new MouseEvent('click', {
                    ...eventOpts,
                    detail: 2 // Double click detail for Mac
                });
                btn.dispatchEvent(macClickEvent);
                
            } catch (e) {
                // Silent fail - use simple click
                btn.click();
            }

            console.log('🎯 CLICKED! Waiting for navigation...');
            return;
        }
    }

    console.warn('⚠️ "New Project" button not found');
};

// Run auto-click after page loads
if (document.readyState === 'complete') {
    autoClickNewProject();
} else {
    window.addEventListener('load', autoClickNewProject);
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
const loadStyles = async () => {
    try {
        // Wait for extension context to be ready (Mac may need more time)
        let attempts = 0;
        const maxAttempts = 10;
        
        while (attempts < maxAttempts) {
            if (chrome?.runtime?.id) {
                const styleLink = document.createElement('link');
                styleLink.rel = 'stylesheet';
                styleLink.href = chrome.runtime.getURL('assets/index.css');
                styleLink.onerror = () => {};
                styleLink.onload = () => {};
                shadowRoot.appendChild(styleLink);
                return;
            }
            attempts++;
            await new Promise(r => setTimeout(r, 100));
        }
    } catch (e) {
        // Ignore errors
    }
};

// Load styles asynchronously
loadStyles();

const renderRoot = ReactDOM.createRoot(shadowRoot);

const ContentScriptApp = () => {
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
        const messageListener = async (message: any, sender: any, sendResponse: any) => {
            // Handle PING message to check if content script is ready
            if (message.type === 'PING') {
                sendResponse({ status: 'ready', timestamp: Date.now() });
                return;
            }

            if (message.type === 'SHOW_VIDEO_RESULT' && message.videoUrl) {
                console.log('Received video URL (download via Chrome bar):', message.videoUrl);
            }

            if (message.type === 'INJECT_AUTOMATION_DATA') {
                handleAutomation(message.payload);
            }

            // NEW: Multi-Scene Pipeline Handler
            if (message.type === 'TWO_STAGE_PIPELINE') {
                console.log('🚀 Starting Pipeline...');
                const { runMultiScenePipeline } = await import('./utils/googleLabAutomation');
                const { generatePrompts, generateQuickPrompts } = await import('./services/aiPromptService');

                const payload = message.payload;
                
                const {
                    characterImage,
                    productImage,
                    productName,
                    template,
                    voiceTone,
                    saleStyle,
                    language,
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
                    aiPrompt: rawAiPrompt,
                    sceneDescription,  // alias used by Execution payload
                    useAiScript,
                    sceneCount: payloadSceneCount,  // Number of scenes (1, 2, or 3)
                    // Explicit prompts from Workflow Control
                    videoPrompt: explicitVideoPrompt,
                    imagePrompt: explicitImagePrompt
                } = payload;
                // Merge: aiPrompt takes priority, fall back to sceneDescription
                const aiPrompt = rawAiPrompt || sceneDescription || "";

                // Determine scene count (default 1 if not specified)
                const sceneCount = payloadSceneCount || Math.max(1, Math.floor((clipDuration || 8) / 8));
                
                // ตั้งค่า overlay state
                setCurrentSceneCount(sceneCount);
                setTotalSteps(calculateTotalSteps(sceneCount));
                setIsAutomationRunning(true);
                setStepNumber(1);
                setCurrentStep(getStepLabel(1, sceneCount));

                let imagePrompt: string;
                let videoPrompt: string = "";
                let sceneScripts: string[] = [];
                let videoPromptMeta: any = null;

                // Priority 1: Use explicit prompts if provided (from Workflow Control step 3)
                if (explicitVideoPrompt && explicitImagePrompt) {
                    imagePrompt = explicitImagePrompt;
                    videoPrompt = explicitVideoPrompt;
                    
                    // Parse individual scene scripts for Scene 2+
                    let sceneMatches: string[] | null = null;
                    
                    // Pattern 1: Curly double quotes ""
                    sceneMatches = explicitVideoPrompt.match(/🎬 ฉาก \d+:\s*""([^""]+)""/g);
                    
                    // Pattern 2: Regular double quotes ""
                    if (!sceneMatches || sceneMatches.length === 0) {
                        sceneMatches = explicitVideoPrompt.match(/🎬 ฉาก \d+:\s*"([^"]+)"/g);
                    }
                    
                    // Pattern 3: Any quotes variation
                    if (!sceneMatches || sceneMatches.length === 0) {
                        sceneMatches = explicitVideoPrompt.match(/🎬 ฉาก \d+:\s*["""''']([^""''']+)["""''']/g);
                    }
                    
                    if (sceneMatches && sceneMatches.length > 0) {
                        sceneScripts = sceneMatches.map((m, idx) => {
                            const extracted = m.replace(/🎬 ฉาก \d+:\s*["""''']/, '').replace(/[""''']$/, '').trim();
                            return extracted;
                        });
                    }
                    
                    // Parse scene scripts from aiPrompt (individual voiceover scripts joined by \n\n)
                    if (sceneScripts.length === 0 && aiPrompt && aiPrompt.trim()) {
                        const aiScenes = aiPrompt.split(/\n{2,}/).map((s: string) => s.trim()).filter((s: string) => s.length > 0);
                        console.log(`🐛 Parsed ${aiScenes.length} scene script(s) from aiPrompt`);
                        if (aiScenes.length >= sceneCount) {
                            sceneScripts = aiScenes.slice(0, sceneCount);
                        } else if (aiScenes.length > 0) {
                            sceneScripts = [...aiScenes];
                            while (sceneScripts.length < sceneCount) {
                                sceneScripts.push(aiScenes[aiScenes.length - 1]);
                            }
                        }
                    }

                    if (sceneScripts.length === 0) {
                        console.warn('⚠️ No individual scene scripts found — falling back to full videoPrompt for all scenes');
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
                        try {
                            const prompts = await generatePrompts(promptConfig);
                            imagePrompt = prompts.imagePrompt;
                            videoPrompt = prompts.videoPrompt;
                            videoPromptMeta = prompts.videoPromptMeta || null;
                            
                            // Use sceneScripts directly from generatePrompts (no regex needed)
                            if (prompts.sceneScripts && prompts.sceneScripts.length > 0) {
                                sceneScripts = prompts.sceneScripts;
                            } else {
                                sceneScripts = Array(sceneCount).fill(prompts.videoPrompt);
                            }
                        } catch (e) {
                            const prompts = generateQuickPrompts(promptConfig);
                            imagePrompt = prompts.imagePrompt;
                            videoPrompt = prompts.videoPrompt;
                            videoPromptMeta = prompts.videoPromptMeta || null;
                            sceneScripts = prompts.sceneScripts || Array(sceneCount).fill(prompts.videoPrompt);
                        }
                    } else if (aiPrompt) {
                        // Parse user-provided scripts (split by double newline for each scene)
                        const userScenes = aiPrompt.split(/\n{2,}/).filter((s: string) => s.trim());
                        
                        // Create a proper prompt template from the first scene script
                        const firstSceneScript = userScenes[0] || aiPrompt;
                        const { generateQuickPrompts } = await import('./services/aiPromptService');
                        const templatePrompts = generateQuickPrompts({
                            productName,
                            template,
                            voiceTone,
                            saleStyle,
                            hookText,
                            ctaText,
                            clipDuration,
                            movement,
                            userScript: firstSceneScript,
                            language: 'th-central'
                        });
                        
                        // Use the generated template as base prompt
                        videoPrompt = templatePrompts.videoPrompt;
                        videoPromptMeta = templatePrompts.videoPromptMeta || null;
                        imagePrompt = templatePrompts.imagePrompt;
                        
                        // Scene scripts come from user input
                        if (userScenes.length >= sceneCount) {
                            sceneScripts = userScenes.slice(0, sceneCount);
                        } else {
                            sceneScripts = [...userScenes];
                            while (sceneScripts.length < sceneCount) {
                                sceneScripts.push(userScenes[userScenes.length - 1] || aiPrompt);
                            }
                        }
                    } else {
                        const prompts = generateQuickPrompts(promptConfig);
                        imagePrompt = prompts.imagePrompt;
                        videoPrompt = prompts.videoPrompt;
                        videoPromptMeta = prompts.videoPromptMeta || null;
                        sceneScripts = prompts.sceneScripts || Array(sceneCount).fill(prompts.videoPrompt);
                    }
                }

                // Debug: verify scene scripts before pipeline
                console.log(`🐛 sceneScripts before pipeline (${sceneScripts.length} items):`);
                sceneScripts.forEach((s: any, i: number) => {
                    const text = typeof s === 'string' ? s : s?.script || '';
                    console.log(`  ฉาก ${i + 1}: "${text.substring(0, 80)}..." (${text.length} chars)`);
                });

                try {
                    const result = await runMultiScenePipeline({
                        characterImage,
                        productImage,
                        imagePrompt,
                        videoPrompt,
                        sceneCount,
                        sceneScripts,
                        aspectRatio,
                        videoPromptMeta
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
                        // Download is handled by handleVideoDownload() — Chrome's download bar
                        // will show the file. No custom popup overlay needed.
                        console.log('✅ Pipeline complete. Video available via Chrome downloads.');

                        // Notify the extension popup
                        chrome.runtime.sendMessage({
                            type: 'VIDEO_GENERATION_COMPLETE',
                            videoUrl: result.videoUrl
                        });
                    } else {
                        // Send error back to extension
                        chrome.runtime.sendMessage({
                            type: 'PIPELINE_ERROR',
                            error: result.error
                        });
                    }
                } catch (error) {
                    // Send error back to extension
                    chrome.runtime.sendMessage({
                        type: 'PIPELINE_ERROR',
                        error: (error as Error).message || 'Unknown error'
                    });
                } finally {
                    setIsAutomationRunning(false);
                }
            }
        };

        chrome.runtime.onMessage.addListener(messageListener);
        return () => chrome.runtime.onMessage.removeListener(messageListener);
    }, []);

    const handleAutomation = async (data: any) => {
        const { productName, gender, emotion, imageBase64, personImageBase64 } = data;

        // 1. Prepare Image (Merge if needed)
        let finalImageToUpload = imageBase64;

        if (imageBase64 && personImageBase64) {
            try {
                const { mergeImages } = await import('./utils/imageProcessing');
                // Ensure Person is on LEFT (as per prompt instructions)
                finalImageToUpload = await mergeImages(personImageBase64, imageBase64, 'horizontal');
            } catch (err) {
                // Silent fail
            }
        } else if (personImageBase64 && !imageBase64) {
            finalImageToUpload = personImageBase64;
        }

        // 2. Upload Image to Veo (PRIORITY ACTION)
        if (finalImageToUpload) {
            const success = uploadImageToWeb(finalImageToUpload, 'input[type="file"]');
            if (success) {
                // Add a small delay to let Veo process the image thumbnail
                await new Promise(r => setTimeout(r, 1000));
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
            {/* Video result is now shown via Chrome's native download bar instead of custom overlay */}
        </>
    );
};

renderRoot.render(<ContentScriptApp />);
