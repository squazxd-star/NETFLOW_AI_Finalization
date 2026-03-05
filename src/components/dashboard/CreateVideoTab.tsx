import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Loader2, ExternalLink, Wand2, Rocket, Eye, Zap, ArrowRight, ChevronLeft, ChevronRight, MousePointerClick, Sparkles } from "lucide-react";
import { createVideoSchema, CreateVideoFormData, createVideoDefaultValues } from "@/schemas";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import {
    AiScriptSection,
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

    // UI State — single image per slot (base64)
    const [productImage, setProductImage] = useState<string | null>(null);
    const [characterImage, setCharacterImage] = useState<string | null>(null);
    const [aiScriptOpen, setAiScriptOpen] = useState(true);
    const [productDataOpen, setProductDataOpen] = useState(true);
    const [productionOpen, setProductionOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(true);

    // Workflow State
    const [generatedVideoPrompt, setGeneratedVideoPrompt] = useState<string | null>(null);
    const [generatedImagePrompt, setGeneratedImagePrompt] = useState<string | null>(null);
    const [videoScenePrompts, setVideoScenePrompts] = useState<string[]>([]);
    const [flowOpened, setFlowOpened] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [promptPage, setPromptPage] = useState(0); // 0 = image, 1 = video
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
    const [flowLogs, setFlowLogs] = useState<string[]>(["✅ ระบบพร้อมทำงาน..."]);

    // Listen for FLOW_LOG messages from content-flow.ts
    useEffect(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.onMessage) return;
        const handler = (message: any) => {
            if (message?.action === "FLOW_LOG" && message.msg) {
                const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                setFlowLogs(prev => [...prev.slice(-199), `[${ts}] ${message.msg}`]);
            }
        };
        chrome.runtime.onMessage.addListener(handler);
        return () => chrome.runtime.onMessage.removeListener(handler);
    }, []);

    // Append local workflow status to logs
    useEffect(() => {
        if (isLoading) setFlowLogs(prev => [...prev, "⏳ กำลังสร้าง Prompt ด้วย AI..."]);
    }, [isLoading]);
    useEffect(() => {
        if (result) setFlowLogs(prev => [...prev, "✅ สร้างสำเร็จ!"]);
    }, [result]);

    const pickImage = (setter: (v: string) => void) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => setter(ev.target?.result as string);
                reader.readAsDataURL(file);
            }
        };
        input.click();
    };

    // Form submission handler
    const onSubmit = async (data: CreateVideoFormData) => {
        console.log("Form data ready for video generation:", data);

        await generate({
            type: "video-generation",
            ...data,
            userImage: productImage || undefined,
            characterImage: characterImage || undefined,
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
                productImage={productImage}
                characterImage={characterImage}
                onProductImageUpload={() => pickImage(setProductImage)}
                onCharacterImageUpload={() => pickImage(setCharacterImage)}
            />

            {/* 2. AI Scripting Section - สคริปต์ AI */}
            <AiScriptSection
                {...sectionProps}
                isOpen={aiScriptOpen}
                onToggle={() => setAiScriptOpen(!aiScriptOpen)}
                productImage={productImage}
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
                productImage={productImage}
            />

            {/* Workflow Control Section */}
            <div className="glass-card p-4 space-y-4 border border-neon-red/20">
                <div className="flex items-center gap-2 mb-1">
                    <Rocket className="w-4 h-4 text-neon-red" />
                    <span className="text-sm font-bold text-foreground">สร้างวิดีโอ</span>
                    <div className="h-px bg-neon-red/20 flex-1" />
                </div>

                {/* Step 1: Preview Prompt */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-foreground flex items-center gap-2">
                            <span className="bg-neon-red/15 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
                            เตรียมคำสั่ง (Prompt)
                        </label>
                        <button
                            type="button"
                            onClick={async () => {
                                const isValid = await form.trigger();
                                if (!isValid) return;

                                const data = getValues();
                                const { generatePrompts, generateQuickPrompts } = await import("@/services/aiPromptService");

                                // Build config for AI prompt service — ALL form fields
                                const promptConfig = {
                                    productImage: productImage || undefined,
                                    productName: data.productName || "Product",
                                    productDescription: data.productDescription || "",
                                    template: data.template || "product-review",
                                    voiceTone: data.voiceTone || "friendly",
                                    saleStyle: data.saleStyle || "storytelling",
                                    language: data.language || "th-central",
                                    gender: data.gender || "female",
                                    ageRange: data.ageRange || "young-adult",
                                    expression: data.expression || "happy",
                                    movement: data.movement || "minimal",
                                    aspectRatio: data.orientation === "vertical" ? "9:16" : "16:9",
                                    clipDuration: (data.sceneCount || 1) * 8,
                                    hookText: data.hookEnabled ? data.hookText : "",
                                    ctaText: data.ctaEnabled ? data.ctaText : "",
                                    mustUseKeywords: data.mustUseKeywords || "",
                                    avoidKeywords: data.avoidKeywords || "",
                                    userScript: data.aiPrompt || "",
                                    clothingStyles: data.clothingStyles || ["casual"],
                                    cameraAngles: data.cameraAngles || ["front", "close-up"],
                                };

                                // Show loading state
                                setIsGeneratingPrompt(true);
                                setGeneratedImagePrompt("⏳ กำลังสร้าง Prompt...");
                                setGeneratedVideoPrompt("⏳ กำลังวิเคราะห์ด้วย AI...");

                                try {
                                    let prompts;
                                    if (data.useAiScript && productImage) {
                                        // Use AI Vision to analyze and generate
                                        prompts = await generatePrompts(promptConfig);
                                    } else {
                                        // Quick mode without AI
                                        prompts = generateQuickPrompts(promptConfig);
                                    }
                                    
                                    setGeneratedImagePrompt(prompts.imagePrompt);
                                    setGeneratedVideoPrompt(prompts.videoPrompt);

                                    // Pre-build all scene video prompts
                                    if (prompts.sceneScripts && prompts.videoPromptMeta && prompts.sceneScripts.length > 1) {
                                        const { buildSceneVideoPromptJSON } = await import("@/services/aiPromptService");
                                        const allScenePrompts = [prompts.videoPrompt]; // Scene 1 is the main videoPrompt
                                        for (let i = 1; i < prompts.sceneScripts.length; i++) {
                                            allScenePrompts.push(buildSceneVideoPromptJSON(prompts.videoPromptMeta, prompts.sceneScripts[i], i + 1));
                                        }
                                        setVideoScenePrompts(allScenePrompts);
                                    } else {
                                        setVideoScenePrompts([prompts.videoPrompt]);
                                    }
                                } catch (err: any) {
                                    console.error("Prompt generation failed:", err);
                                    // Fallback to quick mode
                                    const prompts = generateQuickPrompts(promptConfig);
                                    setGeneratedImagePrompt(prompts.imagePrompt);
                                    setGeneratedVideoPrompt(prompts.videoPrompt);
                                    setVideoScenePrompts([prompts.videoPrompt]);
                                } finally {
                                    setIsGeneratingPrompt(false);
                                }
                            }}
                            disabled={isGeneratingPrompt}
                            className={`text-[10px] px-3 py-1.5 rounded-lg transition-all duration-300 flex items-center gap-1.5 font-medium ${
                                isGeneratingPrompt
                                    ? 'bg-neon-red/80 text-white cursor-wait'
                                    : 'ai-btn-shimmer text-white hover:scale-105 active:scale-95 shadow-sm shadow-neon-red/20'
                            }`}
                        >
                            {isGeneratingPrompt ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                                <Wand2 className="w-3 h-3" />
                            )}
                            {isGeneratingPrompt ? 'AI กำลังสร้าง...' : 'สร้าง/อัปเดต Prompt'}
                        </button>
                    </div>

                    {generatedImagePrompt && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className={`p-3 rounded-xl border space-y-2 transition-all duration-500 ${
                                isGeneratingPrompt
                                    ? 'bg-black/60 border-neon-red/40 ai-thinking-card animate-border-glow'
                                    : 'bg-black/40 border-border'
                            }`}>
                                {/* Pagination header */}
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setPromptPage(0)}
                                        disabled={promptPage === 0}
                                        className={`p-1 rounded transition-colors ${promptPage === 0 ? 'text-muted-foreground/30 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5">
                                        {isGeneratingPrompt && <Sparkles className="w-3 h-3 text-neon-red animate-pulse" />}
                                        {promptPage === 0 ? '🖼️ Image Prompt' : `🎬 Video Prompt (${videoScenePrompts.length || 1} ฉาก)`}
                                        <span className="text-muted-foreground/50 ml-1">({promptPage + 1}/2)</span>
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setPromptPage(1)}
                                        disabled={promptPage === 1}
                                        className={`p-1 rounded transition-colors ${promptPage === 1 ? 'text-muted-foreground/30 cursor-not-allowed' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Page content */}
                                {isGeneratingPrompt ? (
                                    <div className="space-y-3 py-2">
                                        <div className="flex items-center gap-2 text-xs text-neon-red">
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            <span>{promptPage === 0 ? 'กำลังสร้าง Image Prompt' : 'กำลังวิเคราะห์ด้วย AI'}</span>
                                            <span className="inline-flex gap-0.5">
                                                <span className="inline-block w-1 h-1 rounded-full bg-neon-red animate-typing-dot-1" />
                                                <span className="inline-block w-1 h-1 rounded-full bg-neon-red animate-typing-dot-2" />
                                                <span className="inline-block w-1 h-1 rounded-full bg-neon-red animate-typing-dot-3" />
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2.5 rounded-full bg-neon-red/15 animate-pulse" style={{ width: '90%' }} />
                                            <div className="h-2.5 rounded-full bg-neon-red/10 animate-pulse" style={{ width: '75%', animationDelay: '0.2s' }} />
                                            <div className="h-2.5 rounded-full bg-neon-red/10 animate-pulse" style={{ width: '60%', animationDelay: '0.4s' }} />
                                            <div className="h-2.5 rounded-full bg-neon-red/8 animate-pulse" style={{ width: '80%', animationDelay: '0.6s' }} />
                                        </div>
                                    </div>
                                ) : promptPage === 0 ? (
                                    <div>
                                        <textarea
                                            value={generatedImagePrompt || ""}
                                            onChange={(e) => setGeneratedImagePrompt(e.target.value)}
                                            className="w-full bg-transparent text-[10px] text-foreground font-mono resize-none outline-none min-h-[80px]"
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {videoScenePrompts.length > 1 ? (
                                            videoScenePrompts.map((sp, idx) => (
                                                <div key={idx}>
                                                    <label className="text-[10px] text-neon-red/70 font-medium block mb-0.5">ฉาก {idx + 1}</label>
                                                    <textarea
                                                        value={sp}
                                                        onChange={(e) => {
                                                            const updated = [...videoScenePrompts];
                                                            updated[idx] = e.target.value;
                                                            setVideoScenePrompts(updated);
                                                        }}
                                                        className="w-full bg-transparent text-[10px] text-foreground font-mono resize-none outline-none min-h-[60px] border-b border-border/30 pb-2"
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <div>
                                                <textarea
                                                    value={generatedVideoPrompt || ""}
                                                    onChange={(e) => setGeneratedVideoPrompt(e.target.value)}
                                                    className="w-full bg-transparent text-[10px] text-foreground font-mono resize-none outline-none min-h-[80px]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Step 2: Open Flow */}
                <div className={`space-y-2 transition-opacity duration-200 ${!generatedImagePrompt ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/15 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                        เปิดหน้างาน (Google Flow)
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            window.open('https://labs.google/fx/tools/flow', '_blank');
                            setFlowOpened(true);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                            flowOpened
                                ? 'border-neon-red/40 text-neon-red bg-neon-red/10'
                                : 'border-border text-muted-foreground hover:border-neon-red/40 hover:text-neon-red hover:bg-neon-red/5'
                        }`}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {flowOpened ? "✓ เปิดแล้ว — เปิดอีกครั้ง" : "เปิด Google Flow"}
                    </button>
                </div>

                {/* Step 3: Automation — Electric Glow */}
                <div className={`space-y-3 transition-opacity duration-200 ${!generatedImagePrompt || !flowOpened ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/15 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                        เริ่มสร้างคลิป (Automation)
                    </label>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-neon-red/50" />
                        อัพโหลดรูป → ใส่ prompt → สร้างภาพ + วิดีโอ อัตโนมัติทั้งหมด
                    </p>

                    {/* Electric Glow Button Container */}
                    <div className="relative group">
                        {/* Lightning SVG Bolts — visible when generating */}
                        {isUploading && (
                            <>
                                {/* Lightning Bolt Top-Left */}
                                <svg
                                    className="absolute -top-5 -left-3 w-16 h-16 text-red-500 pointer-events-none z-0"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                    style={{ animation: 'electric-flicker 0.8s ease-in-out infinite', filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))' }}
                                >
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>

                                {/* Lightning Bolt Top-Right */}
                                <svg
                                    className="absolute -top-5 -right-3 w-14 h-14 text-sky-400 pointer-events-none z-0 rotate-12"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                    style={{ animation: 'electric-flicker 0.6s ease-in-out 0.15s infinite', filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.8))' }}
                                >
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>

                                {/* Lightning Bolt Bottom-Left */}
                                <svg
                                    className="absolute -bottom-4 -left-2 w-12 h-12 text-sky-400 pointer-events-none z-0 -rotate-45"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                    style={{ animation: 'electric-flicker 0.7s ease-in-out 0.3s infinite', filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.7))' }}
                                >
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>

                                {/* Lightning Bolt Bottom-Right */}
                                <svg
                                    className="absolute -bottom-5 -right-2 w-16 h-16 text-red-400 pointer-events-none z-0 rotate-180"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                    style={{ animation: 'electric-flicker 0.5s ease-in-out 0.1s infinite', filter: 'drop-shadow(0 0 8px rgba(248, 113, 113, 0.8))' }}
                                >
                                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>

                                {/* Electric Aura Glow */}
                                <div
                                    className="absolute -inset-1 rounded-2xl pointer-events-none z-0"
                                    style={{ animation: 'electric-aura 0.8s ease-in-out infinite' }}
                                />
                            </>
                        )}

                        {/* Main Button */}
                        <button
                            type="button"
                            disabled={isUploading || !generatedImagePrompt}
                            onClick={async () => {
                                if (!generatedImagePrompt) return;
                                setIsUploading(true);
                                setUploadStatus("⏳ กำลังอัพโหลดรูป + สร้างภาพ...");
                                try {
                                    const response = await new Promise<{ success: boolean; message: string; step?: string }>((resolve) => {
                                        const formData = getValues();
                                        chrome.runtime.sendMessage(
                                            {
                                                action: "GENERATE_IMAGE",
                                                imagePrompt: generatedImagePrompt,
                                                videoPrompt: generatedVideoPrompt || undefined,
                                                videoScenePrompts: videoScenePrompts.length > 0 ? videoScenePrompts : undefined,
                                                sceneCount: formData.sceneCount || 1,
                                                productImage: productImage || undefined,
                                                characterImage: characterImage || undefined,
                                                orientation: formData.orientation || "horizontal",
                                                outputCount: formData.outputCount || 1,
                                            },
                                            (res) => {
                                                if (chrome.runtime.lastError) {
                                                    resolve({ success: false, message: chrome.runtime.lastError.message || "Connection failed" });
                                                } else {
                                                    resolve(res || { success: false, message: "No response" });
                                                }
                                            }
                                        );
                                    });
                                    setUploadStatus(response.success ? `✅ ${response.message}` : `❌ ${response.message}`);
                                } catch (err: any) {
                                    setUploadStatus(`❌ ${err.message}`);
                                } finally {
                                    setIsUploading(false);
                                }
                            }}
                            className={`relative z-10 w-full py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed ${
                                isUploading
                                    ? 'electric-btn cursor-wait'
                                    : !generatedImagePrompt
                                        ? 'bg-muted text-muted-foreground'
                                        : 'electric-btn hover:scale-[1.02] active:scale-[0.96] shadow-lg shadow-neon-red/30'
                            }`}
                        >
                            {isUploading ? (
                                <>
                                    <Zap className="relative z-10 w-5 h-5" style={{ animation: 'electric-flicker 0.4s ease-in-out infinite' }} />
                                    <span className="relative z-10 tracking-wider uppercase text-sm" style={{ animation: 'electric-text-glow 1s ease-in-out infinite' }}>
                                        AI กำลังทำงาน...
                                    </span>
                                    <Sparkles className="relative z-10 w-4 h-4 animate-pulse" />
                                </>
                            ) : (
                                <>
                                    <Zap className="relative z-10 w-5 h-5" />
                                    <span className="relative z-10 tracking-wider uppercase text-sm">
                                        AUTOMATION
                                    </span>
                                    <span className="relative z-10 text-[10px] font-normal opacity-70">
                                        สร้างคลิปอัตโนมัติ
                                    </span>
                                </>
                            )}
                        </button>
                    </div>

                    {uploadStatus && (
                        <p className="text-[10px] text-center text-muted-foreground">{uploadStatus}</p>
                    )}
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
            <ConsoleLogSection logs={flowLogs} />
        </div>
    );
};

export default CreateVideoTab;
