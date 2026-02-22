import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Loader2, ExternalLink, Wand2 } from "lucide-react";
import { createVideoSchema, CreateVideoFormData, createVideoDefaultValues } from "@/schemas";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import {
    AiScriptSection,
    CharacterStyleSection,
    ProductDataSection,
    ProductionPreviewSection,
    GenerationSettingsSection,
    ResultSection,
    ConsoleLogSection
} from "./create-video";

const CreateVideoTab = () => {
    // React Hook Form setup
    const form = useForm<CreateVideoFormData>({
        resolver: zodResolver(createVideoSchema),
        defaultValues: createVideoDefaultValues,
    });

    const { generate, isLoading, result, downloadVideo } = useVideoGeneration();
    const hasVideo = !!result?.data?.videoUrl;
    const hasImage = !!result?.data?.imageUrl;

    const { register, control, watch, setValue, getValues } = form;

    // UI State (not form data - stays as useState)
    const [characterImages, setCharacterImages] = useState<(string | null)[]>([null, null]);
    const [productImages, setProductImages] = useState<(string | null)[]>([null, null]);
    const [aiScriptOpen, setAiScriptOpen] = useState(true);
    const [characterOpen, setCharacterOpen] = useState(true);
    const [productDataOpen, setProductDataOpen] = useState(true);
    const [productionOpen, setProductionOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(true);

    // Workflow State
    const [generatedVideoPrompt, setGeneratedVideoPrompt] = useState<string | null>(null);
    const [generatedImagePrompt, setGeneratedImagePrompt] = useState<string | null>(null);
    const [flowOpened, setFlowOpened] = useState(false);

    const logs = [
        "ระบบพร้อมทำงาน...",
        ...(isLoading ? ["⏳ กำลังเชื่อมต่อ OpenAI/Gemini...", "🔄 กำลังสร้างสคริปต์และวิดีโอ..."] : []),
        ...(result ? ["✅ สร้างสำเร็จ! ผลลัพธ์แสดงอยู่ด้านล่าง"] : []),
    ];

    const handleCharacterUpload = (index: number) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImages = [...characterImages];
                    newImages[index] = e.target?.result as string;
                    setCharacterImages(newImages);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    const handleProductImageUpload = (index: number) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const newImages = [...productImages];
                    newImages[index] = e.target?.result as string;
                    setProductImages(newImages);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    // Form submission handler
    const onSubmit = async (data: CreateVideoFormData) => {
        console.log("Form data ready for video generation:", data);

        // Prepare data for advanced workflow
        const userImage = productImages[0] || undefined;
        const characterImage = characterImages[0] || undefined;

        // Try to trigger Browser Automation (Google Veo 2-Stage Pipeline)
        try {
            if (typeof chrome !== 'undefined' && chrome.tabs) {
                const payload = {
                    // Product Info
                    productName: data.productName,
                    productImage: userImage,
                    characterImage: characterImage,
                    
                    // Template & Style
                    template: data.template,
                    voiceTone: data.voiceTone,
                    saleStyle: data.saleStyle,
                    
                    // Language
                    language: data.language,
                    
                    // Script Elements
                    hookText: data.hookEnabled ? data.hookText : "",
                    ctaText: data.ctaEnabled ? data.ctaText : "",
                    mustUseKeywords: data.mustUseKeywords,
                    avoidKeywords: data.avoidKeywords,

                    // Character Details
                    ageRange: data.ageRange,
                    personality: data.personality,
                    clothingStyles: data.clothingStyles,
                    background: data.background,
                    voiceSetting: data.voiceSetting,
                    touchLevel: data.touchLevel,
                    cameraAngles: data.cameraAngles,
                    
                    // Character & Video Settings
                    gender: data.gender,
                    expression: data.expression,
                    movement: data.movement,
                    clipDuration: data.clipDuration,
                    sceneCount: data.sceneCount,
                    aspectRatio: data.aspectRatio,
                    videoDuration: data.videoDuration,
                    restInterval: data.restInterval,
                    autoPostTikTok: data.autoPostTikTok,
                    autoPostYoutube: data.autoPostYoutube,
                    
                    // AI Prompt — always send scene scripts from UI cards
                    aiPrompt: data.aiPrompt || "",
                    useAiScript: data.useAiScript
                };

                console.log("🚀 Sending 2-Stage Pipeline payload:", payload);

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (tabs[0]?.id) {
                        // Use TWO_STAGE_PIPELINE for the new flow
                        chrome.tabs.sendMessage(tabs[0].id, {
                            type: 'TWO_STAGE_PIPELINE',
                            payload
                        });
                    }
                });
            }
        } catch (err) {
            console.warn("Automation trigger failed (context might not be extension):", err);
        }

        // Use clipCount as loop count (parse if string)
        const loopCount = typeof data.clipCount === 'number' ? data.clipCount : 1;

        // Use smartLoop toggle as "concatenate" trigger
        const concatenate = data.smartLoop;

        await generate({
            type: "video-generation",
            ...data,
            userImage,
            characterImage,
            loopCount,
            concatenate
        });
    };

    // Shared props for section components
    const sectionProps = {
        register,
        control,
        setValue,
        getValues,
        watch: watch as <T extends keyof CreateVideoFormData>(name: T) => CreateVideoFormData[T]
    };

    return (
        <div className="p-4 space-y-3">
            {/* 1. Product Data Section - ข้อมูลสินค้า */}
            <ProductDataSection
                {...sectionProps}
                isOpen={productDataOpen}
                onToggle={() => setProductDataOpen(!productDataOpen)}
                productImages={productImages}
                onProductImageUpload={handleProductImageUpload}
            />

            {/* 2. Character & Style Section - ตัวละคร & สไตล์ */}
            <CharacterStyleSection
                {...sectionProps}
                isOpen={characterOpen}
                onToggle={() => setCharacterOpen(!characterOpen)}
                characterImages={characterImages}
                onCharacterUpload={handleCharacterUpload}
            />

            {/* 3. AI Scripting Section - สคริปต์ AI */}
            <AiScriptSection
                {...sectionProps}
                isOpen={aiScriptOpen}
                onToggle={() => setAiScriptOpen(!aiScriptOpen)}
                productImages={productImages}
            />

            {/* 4. Production & Preview Section - การผลิตและพรีวิว */}
            <ProductionPreviewSection
                {...sectionProps}
                isOpen={productionOpen}
                onToggle={() => setProductionOpen(!productionOpen)}
                hasVideo={hasVideo}
                onDownloadVideo={downloadVideo}
                isTikTokReady={false}
            />

            {/* 5. Generation Settings - การตั้งค่าการสร้าง */}
            <GenerationSettingsSection
                {...sectionProps}
                isOpen={settingsOpen}
                onToggle={() => setSettingsOpen(!settingsOpen)}
                productImages={productImages}
            />

            {/* Workflow Control Section */}
            <div className="glass-card p-4 space-y-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-blue-400">WORKFLOW CONTROL</span>
                    <div className="h-px bg-blue-500/30 flex-1" />
                </div>

                {/* Step 1: Preview Prompt */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-foreground flex items-center gap-2">
                            <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                            เตรียมคำสั่ง (Prompt)
                        </label>
                        <button
                            type="button"
                            onClick={async () => {
                                const isValid = await form.trigger();
                                if (!isValid) return;

                                const data = getValues();
                                const { generatePrompts, generateQuickPrompts } = await import("@/services/aiPromptService");

                                // Build config for AI prompt service
                                const promptConfig = {
                                    productImage: productImages[0] || undefined,
                                    characterImage: characterImages[0] || undefined,
                                    productName: data.productName || "Product",
                                    template: data.template || "product-review",
                                    voiceTone: data.voiceTone || "friendly",
                                    saleStyle: data.saleStyle || "storytelling",
                                    language: data.language || "th-central",
                                    hookText: data.hookEnabled ? data.hookText : "",
                                    ctaText: data.ctaEnabled ? data.ctaText : "",
                                    mustUseKeywords: data.mustUseKeywords || "",
                                    avoidKeywords: data.avoidKeywords || "",
                                    clipDuration: data.clipDuration || 16,
                                    aspectRatio: data.aspectRatio || "9:16",
                                    gender: data.gender || "female",
                                    expression: data.expression || "happy",
                                    movement: data.movement || "minimal",
                                    // User-provided Thai script from scene cards
                                    userScript: data.aiPrompt || ""
                                };

                                // Show loading state
                                setGeneratedImagePrompt("⏳ กำลังสร้าง Prompt...");
                                setGeneratedVideoPrompt("⏳ กำลังวิเคราะห์ด้วย AI...");

                                try {
                                    let prompts;
                                    if (data.useAiScript && productImages[0]) {
                                        // Use AI Vision to analyze and generate
                                        prompts = await generatePrompts(promptConfig);
                                    } else {
                                        // Quick mode without AI
                                        prompts = generateQuickPrompts(promptConfig);
                                    }
                                    
                                    setGeneratedImagePrompt(prompts.imagePrompt);
                                    setGeneratedVideoPrompt(prompts.videoPrompt);
                                } catch (err: any) {
                                    console.error("Prompt generation failed:", err);
                                    // Fallback to quick mode
                                    const prompts = generateQuickPrompts(promptConfig);
                                    setGeneratedImagePrompt(prompts.imagePrompt);
                                    setGeneratedVideoPrompt(prompts.videoPrompt);
                                }
                            }}
                            className="text-[10px] bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                        >
                            <Wand2 className="w-3 h-3" />
                            สร้าง/อัปเดต Prompt
                        </button>
                    </div>

                    {generatedVideoPrompt && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="bg-black/40 p-3 rounded-lg border border-border space-y-2">
                                <div>
                                    <label className="text-[10px] text-muted-foreground block mb-1">Image Prompt (Visual)</label>
                                    <textarea
                                        value={generatedImagePrompt || ""}
                                        onChange={(e) => setGeneratedImagePrompt(e.target.value)}
                                        className="w-full bg-transparent text-[10px] text-foreground font-mono resize-none outline-none min-h-[40px]"
                                    />
                                </div>
                                <div className="h-px bg-border/50" />
                                <div>
                                    <label className="text-[10px] text-muted-foreground block mb-1">Video Prompt (Motion)</label>
                                    <textarea
                                        value={generatedVideoPrompt}
                                        onChange={(e) => setGeneratedVideoPrompt(e.target.value)}
                                        className="w-full bg-transparent text-[10px] text-foreground font-mono resize-none outline-none min-h-[60px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 2: Open Flow */}
                <div className={`space-y-2 transition-opacity duration-200 ${!generatedVideoPrompt ? 'opacity-50 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-blue-500/20 text-blue-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                        เปิดหน้างาน (Google VideoFX)
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            window.open('https://labs.google/fx/tools/video-fx', '_blank');
                            setFlowOpened(true);
                        }}
                        className={`w-full py-2 px-4 rounded-lg text-xs font-medium border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2 ${flowOpened ? 'bg-blue-500/10' : ''}`}
                    >
                        <ExternalLink className="w-3 h-3" />
                        {flowOpened ? "เปิดอีกครั้ง (Opened)" : "เปิด Google VideoFX"}
                    </button>
                </div>

                {/* Step 3: Generate Video */}
                <div className={`space-y-2 transition-opacity duration-200 ${!flowOpened ? 'opacity-50 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/20 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span>
                        สั่งทำงาน (Execution)
                    </label>
                    <button
                        onClick={form.handleSubmit(async (data) => {
                            // Run the refined OnSubmit here with explicit prompts

                            // 1. Prepare Payload
                            const payload = {
                                productName: data.productName,
                                gender: data.gender,
                                expression: data.expression,
                                emotion: data.expression,
                                productImage: productImages[0],
                                characterImage: characterImages[0],
                                clipDuration: data.clipDuration,
                                sceneCount: data.sceneCount,
                                sceneDescription: data.aiPrompt, // Original scene desc
                                movement: data.movement,
                                template: data.template,
                                voiceTone: data.voiceTone,
                                saleStyle: data.saleStyle,
                                language: data.language,
                                hookText: data.hookEnabled ? data.hookText : "",
                                ctaText: data.ctaEnabled ? data.ctaText : "",
                                mustUseKeywords: data.mustUseKeywords,
                                avoidKeywords: data.avoidKeywords,
                                ageRange: data.ageRange,
                                personality: data.personality,
                                clothingStyles: data.clothingStyles,
                                background: data.background,
                                voiceSetting: data.voiceSetting,
                                touchLevel: data.touchLevel,
                                cameraAngles: data.cameraAngles,
                                aspectRatio: data.aspectRatio,
                                videoDuration: data.videoDuration,
                                restInterval: data.restInterval,
                                autoPostTikTok: data.autoPostTikTok,
                                autoPostYoutube: data.autoPostYoutube,
                                // Pass the edited prompts!
                                videoPrompt: generatedVideoPrompt,
                                imagePrompt: generatedImagePrompt
                            };

                            console.log("🚀 Executing with Manual Context:", payload);

                            try {
                                if (typeof chrome !== 'undefined' && chrome.tabs) {
                                    // FIX: Find the VideoFX tab specifically, not just active tab
                                    chrome.tabs.query({ url: '*://labs.google/*' }, (tabs) => {
                                        const videoFxTab = tabs.find(t => 
                                            t.url?.includes('video-fx') || 
                                            t.url?.includes('videofx') ||
                                            t.url?.includes('labs.google')
                                        );
                                        
                                        if (videoFxTab?.id) {
                                            console.log(`📡 Sending to VideoFX tab (ID: ${videoFxTab.id})`);
                                            chrome.tabs.sendMessage(videoFxTab.id, {
                                                type: 'TWO_STAGE_PIPELINE',
                                                payload
                                            }, (response) => {
                                                // Check if content script received the message
                                                if (chrome.runtime.lastError) {
                                                    console.error("❌ Content script not responding:", chrome.runtime.lastError.message);
                                                    console.warn("⚠️ Extension ไม่สามารถเชื่อมต่อกับหน้า VideoFX ได้ — ลอง Refresh หน้า VideoFX แล้วกดใหม่");
                                                } else {
                                                    console.log("✅ Message sent successfully");
                                                }
                                            });
                                        } else {
                                            // Fallback: Try active tab (user might have it focused)
                                            chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
                                                if (activeTabs[0]?.id) {
                                                    console.log(`📡 Fallback: Sending to active tab (ID: ${activeTabs[0].id})`);
                                                    chrome.tabs.sendMessage(activeTabs[0].id, {
                                                        type: 'TWO_STAGE_PIPELINE',
                                                        payload
                                                    }, (response) => {
                                                        if (chrome.runtime.lastError) {
                                                            console.error("❌ Fallback failed:", chrome.runtime.lastError.message);
                                                            console.warn("⚠️ ไม่พบหน้า VideoFX — ลองเปิดหน้า VideoFX แล้วกดใหม่");
                                                        }
                                                    });
                                                } else {
                                                    console.warn("⚠️ ไม่พบ Tab ที่เปิดอยู่ — กรุณาเปิดหน้า Google VideoFX ก่อน");
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    console.warn("⚠️ Extension API ไม่พร้อมใช้งาน");
                                }
                            } catch (e) { 
                                console.error("❌ Error:", e);
                                console.warn("⚠️ เกิดข้อผิดพลาด:", (e as Error).message);
                            }

                            // Also trigger the standard hook logic for tracking (optional, or just for UI loading state)
                            // We might just want to use the hook's loading state manually?
                            // Actually the hook 'generate' function calls the API service, which we might NOT want if we are doing RPA.
                            // The 'useVideoGeneration' generic function decides based on localStorage... 
                            // But here we are explicitly doing the RPA flow via button.

                            // Let's rely on the RPA message listener in the hook to update state.

                        })}
                        className="w-full py-4 px-6 rounded-2xl font-semibold text-white bg-neon-red pulse-glow hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200"
                    >
                        <span className="flex items-center justify-center gap-2">
                            <Play className="w-5 h-5 fill-current" />
                            GENERATE VIDEO
                        </span>
                    </button>
                </div>
            </div>

            {/* Result Section */}
            <ResultSection
                result={result}
                hasVideo={hasVideo}
                hasImage={hasImage}
                onDownloadVideo={downloadVideo}
            />

            {/* Console Log */}
            <ConsoleLogSection logs={logs} />
        </div>
    );
};

export default CreateVideoTab;
