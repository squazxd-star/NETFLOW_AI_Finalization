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

            btn.dispatchEvent(new PointerEvent('pointerdown', { ...eventOpts, pointerType: 'mouse' }));
            btn.dispatchEvent(new MouseEvent('mousedown', eventOpts));
            btn.dispatchEvent(new PointerEvent('pointerup', { ...eventOpts, pointerType: 'mouse' }));
            btn.dispatchEvent(new MouseEvent('mouseup', eventOpts));
            btn.dispatchEvent(new MouseEvent('click', eventOpts));
            btn.click();

            console.log('🎯 CLICKED! Waiting for navigation...');
            return;
        }
    }

    console.warn('⚠️ "New Project" button not found. Buttons on page:');
    allButtons.forEach((b, i) => console.log(`  ${i}: "${b.textContent?.trim().substring(0, 30)}"`));
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
    const [isAutomationRunning, setIsAutomationRunning] = React.useState(false);
    const [currentStep, setCurrentStep] = React.useState("Initializing...");
    const [stepNumber, setStepNumber] = React.useState(0);
    const [totalSteps, setTotalSteps] = React.useState(12);

    React.useEffect(() => {
        const messageListener = async (message: any, sender: any, sendResponse: any) => {
            if (message.type === 'SHOW_VIDEO_RESULT' && message.videoUrl) {
                console.log('Received video URL:', message.videoUrl);
                setVideoUrl(message.videoUrl);
            }

            if (message.type === 'INJECT_AUTOMATION_DATA') {
                console.log('Received automation data:', message);
                handleAutomation(message.payload);
            }

            // NEW: 2-Stage Pipeline Handler
            if (message.type === 'TWO_STAGE_PIPELINE') {
                console.log('🚀 Starting 2-Stage Pipeline:', message);
                const { runTwoStagePipeline } = await import('./utils/googleLabAutomation');
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
                    hookText,
                    ctaText,
                    mustUseKeywords,
                    avoidKeywords,
                    gender,
                    expression,
                    emotion,  // alias for expression
                    movement,
                    clipDuration,
                    aiPrompt,
                    useAiScript,
                    // Explicit prompts from Workflow Control
                    videoPrompt: explicitVideoPrompt,
                    imagePrompt: explicitImagePrompt
                } = payload;

                let imagePrompt: string;
                let videoPrompt: string;

                // Priority 1: Use explicit prompts if provided (from Workflow Control step 3)
                if (explicitVideoPrompt && explicitImagePrompt) {
                    console.log("📝 Using explicit prompts from Workflow Control");
                    imagePrompt = explicitImagePrompt;
                    videoPrompt = explicitVideoPrompt;
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
                        gender: gender || "female",
                        expression: expression || emotion || "happy",
                        movement: movement || "minimal"
                    };

                    // Generate prompts using AI or quick mode
                    if (useAiScript && productImage) {
                        console.log("🤖 Using AI to generate prompts...");
                        try {
                            const prompts = await generatePrompts(promptConfig);
                            imagePrompt = prompts.imagePrompt;
                            videoPrompt = prompts.videoPrompt;
                            console.log("✅ AI Prompts generated");
                        } catch (e) {
                            console.warn("⚠️ AI prompt generation failed, using quick mode:", e);
                            const prompts = generateQuickPrompts(promptConfig);
                            imagePrompt = prompts.imagePrompt;
                            videoPrompt = prompts.videoPrompt;
                        }
                    } else if (aiPrompt) {
                        console.log("📝 Using manual aiPrompt");
                        imagePrompt = aiPrompt;
                        videoPrompt = aiPrompt;
                    } else {
                        console.log("⚡ Using quick prompt generation");
                        const prompts = generateQuickPrompts(promptConfig);
                        imagePrompt = prompts.imagePrompt;
                        videoPrompt = prompts.videoPrompt;
                    }
                }

                console.log("📋 Final Prompts:");
                console.log("  Image:", imagePrompt.substring(0, 150) + "...");
                console.log("  Video:", videoPrompt.substring(0, 150) + "...");

                try {
                    const result = await runTwoStagePipeline({
                        characterImage,
                        productImage,
                        imagePrompt,
                        videoPrompt
                    }, (step, current, total) => {
                        // Update Overlay State
                        setIsAutomationRunning(true);
                        setCurrentStep(step);
                        setStepNumber(current);
                        setTotalSteps(total);
                    });

                    console.log("🎬 Pipeline Result:", result);

                    // Show video result in overlay if successful
                    if (result.success) {
                        console.log("✅ Pipeline Success! Result:", result);

                        if (result.videoUrl) {
                            setVideoUrl(result.videoUrl);
                        } else if (result.generatedImageUrl) {
                            // If only image, we might want to show a toast or just log it, 
                            // as the overlay currently only supports video.
                            console.log("Only Image Generated (Video step skipped by user)");
                        }

                        // Also notify the extension popup
                        chrome.runtime.sendMessage({
                            type: 'VIDEO_GENERATION_COMPLETE',
                            videoUrl: result.videoUrl || result.generatedImageUrl, // Fallback to image for notification
                            generatedImageUrl: result.generatedImageUrl
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
            }
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

    return (
        <>
            <AutomationOverlay
                isVisible={isAutomationRunning}
                currentStep={currentStep}
                stepNumber={stepNumber}
                totalSteps={totalSteps}
                onStop={() => {
                    setIsAutomationRunning(false);
                    window.location.reload();
                }}
            />
            {videoUrl && <VideoResultOverlay videoUrl={videoUrl} onClose={() => setVideoUrl(null)} />}
        </>
    );
};

renderRoot.render(<ContentScriptApp />);
