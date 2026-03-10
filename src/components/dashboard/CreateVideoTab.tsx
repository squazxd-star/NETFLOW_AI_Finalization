import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Loader2, ExternalLink, Wand2, Rocket, Eye, Zap, ArrowRight, ChevronLeft, ChevronRight, MousePointerClick, Sparkles } from "lucide-react";
import { createVideoSchema, CreateVideoFormData, createVideoDefaultValues } from "@/schemas";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import { useTheme } from "@/contexts/ThemeContext";
import { playAutomationSound } from "@/utils/soundEffects";
import { getSyncedProducts } from "@/services/tiktokProductService";
import { setTikTokAutoPostEnabled } from "@/services/tiktokUploadService";
import { setYouTubeAutoPostEnabled, saveYouTubeConfig } from "@/services/youtubeUploadService";
import {
    AiScriptSection,
    ProductDataSection,
    ProductionPreviewSection,
    GenerationSettingsSection,
    ResultSection,
    ConsoleLogSection
} from "./create-video";
import BackgroundPickerSection from "./create-video/BackgroundPickerSection";
import TikTokStatusCard from "./create-video/TikTokStatusCard";

const CreateVideoTab = () => {
    // React Hook Form setup
    const form = useForm<CreateVideoFormData>({
        resolver: zodResolver(createVideoSchema),
        defaultValues: createVideoDefaultValues,
    });

    const { generate, isLoading, result, downloadVideo, tiktokPostStatus } = useVideoGeneration();
    const hasVideo = !!result?.data?.videoUrl;
    const hasImage = !!result?.data?.imageUrl;

    const { register, control, watch, setValue, getValues } = form;
    const { theme, config: themeConfig } = useTheme();

    // TikTok ready state - true when products are synced
    const [isTikTokReady, setIsTikTokReady] = useState(false);

    useEffect(() => {
        const checkTikTokReady = async () => {
            try {
                const products = await getSyncedProducts();
                const ready = products.length > 0;
                setIsTikTokReady(ready);
                // Auto-enable TikTok toggle when products are synced
                if (ready) {
                    setValue("autoPostTikTok", true);
                }
            } catch {
                setIsTikTokReady(false);
            }
        };
        checkTikTokReady();

        // Listen for storage changes (product sync)
        if (typeof chrome !== 'undefined' && chrome.storage) {
            const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
                if (changes['netflow_tiktok_products']) {
                    checkTikTokReady();
                }
            };
            chrome.storage.local.onChanged.addListener(listener);
            return () => chrome.storage.local.onChanged.removeListener(listener);
        }
    }, []);

    // When autoPostTikTok changes, persist to storage
    const autoPostTikTok = watch("autoPostTikTok");
    useEffect(() => {
        setTikTokAutoPostEnabled(!!autoPostTikTok);
    }, [autoPostTikTok]);

    // When YouTube settings change, persist to storage
    const autoPostYoutube = watch("autoPostYoutube");
    const youtubeTitle = watch("youtubeTitle");
    const youtubeDescription = watch("youtubeDescription");
    const youtubeMadeForKids = watch("youtubeMadeForKids");
    const youtubeVisibility = watch("youtubeVisibility");
    const youtubeScheduleEnabled = watch("youtubeScheduleEnabled");
    const youtubeScheduleDate = watch("youtubeScheduleDate");
    const youtubeScheduleTime = watch("youtubeScheduleTime");
    useEffect(() => {
        setYouTubeAutoPostEnabled(!!autoPostYoutube);
    }, [autoPostYoutube]);
    useEffect(() => {
        if (autoPostYoutube) {
            saveYouTubeConfig({
                title: youtubeTitle || '',
                description: youtubeDescription || '',
                madeForKids: !!youtubeMadeForKids,
                visibility: youtubeVisibility || 'public',
                scheduleEnabled: !!youtubeScheduleEnabled,
                scheduleDate: youtubeScheduleDate || '',
                scheduleTime: youtubeScheduleTime || '',
            });
        }
    }, [autoPostYoutube, youtubeTitle, youtubeDescription, youtubeMadeForKids, youtubeVisibility, youtubeScheduleEnabled, youtubeScheduleDate, youtubeScheduleTime]);

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
    const [flowConnected, setFlowConnected] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [promptPage, setPromptPage] = useState(0); // 0 = image, 1 = video
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);
    const [flowLogs, setFlowLogs] = useState<string[]>(["✅ ระบบพร้อมทำงาน..."]);
    const [myWindowId, setMyWindowId] = useState<number | null>(null);

    // Detect this sidepanel's Chrome window ID (for multi-window log isolation)
    useEffect(() => {
        if (typeof chrome !== "undefined" && chrome.windows?.getCurrent) {
            chrome.windows.getCurrent((win: any) => { if (win?.id) setMyWindowId(win.id); });
        }
    }, []);

    // Listen for FLOW_LOG + AUTOMATION_STOPPED messages from content-flow.ts
    // Filter by sender's windowId so each sidepanel only shows its own window's logs
    useEffect(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.onMessage) return;
        const handler = (message: any, sender: any) => {
            // Multi-window isolation: only accept logs from tabs in OUR window
            if (myWindowId !== null && sender?.tab?.windowId !== undefined && sender.tab.windowId !== myWindowId) {
                return;
            }
            if (message?.action === "FLOW_LOG" && message.msg) {
                const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                setFlowLogs(prev => [...prev.slice(-199), `[${ts}] ${message.msg}`]);
            }
            if (message?.action === "AUTOMATION_STOPPED") {
                setIsUploading(false);
                setUploadStatus("⛔ หยุดการทำงานแล้ว");
            }
        };
        chrome.runtime.onMessage.addListener(handler);
        return () => chrome.runtime.onMessage.removeListener(handler);
    }, [myWindowId]);

    // Fix #3: Auto-PING content script to check connection
    // Runs when prompt is generated or flowOpened changes
    useEffect(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) return;
        if (!generatedImagePrompt || !flowOpened) return;
        const pingFlow = () => {
            chrome.runtime.sendMessage({ action: "PING", windowId: myWindowId || undefined }, (res) => {
                if (chrome.runtime.lastError) {
                    setFlowConnected(false);
                    return;
                }
                setFlowConnected(res?.status === "ready");
            });
        };
        // Ping immediately + every 5s while panel is open
        pingFlow();
        const interval = setInterval(pingFlow, 5000);
        return () => clearInterval(interval);
    }, [generatedImagePrompt, flowOpened]);

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
        <div className="p-4 space-y-3 relative">

            {/* 1. Product Data Section - ข้อมูลสินค้า */}
            <ProductDataSection
                {...sectionProps}
                isOpen={productDataOpen}
                onToggle={() => setProductDataOpen(!productDataOpen)}
                productImage={productImage}
                characterImage={characterImage}
                onProductImageUpload={() => pickImage(setProductImage)}
                onCharacterImageUpload={() => pickImage(setCharacterImage)}
                onProductImageFile={setProductImage}
                onCharacterImageFile={setCharacterImage}
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
                isTikTokReady={isTikTokReady}
                onTikTokNotReady={() => {
                    // Navigate user to sync products
                }}
                productImage={productImage}
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
                                console.log("[Prompt Button] Clicked — starting validation...");
                                const isValid = await form.trigger();
                                console.log("[Prompt Button] Validation result:", isValid);
                                
                                if (!isValid) {
                                    const errors = form.formState.errors;
                                    console.error("[Prompt Button] Validation failed:", errors);
                                    alert("กรุณากรอกข้อมูลให้ครบถ้วน:\n" + Object.keys(errors).join("\n"));
                                    return;
                                }

                                const data = getValues();
                                console.log("[Prompt Button] Form data:", data);
                                const { generatePrompts, generateQuickPrompts } = await import("@/services/veoPromptService");

                                // Build config for AI prompt service — ALL form fields
                                const promptConfig = {
                                    productImage: productImage || undefined,
                                    characterImage: characterImage || undefined,
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
                                    userScript: data.sceneScriptsRaw || "",
                                    clothingStyles: data.clothingStyles || ["casual"],
                                    characterOutfit: data.characterOutfit || "tshirt-casual",
                                    cameraAngles: data.cameraAngles || ["front", "close-up"],
                                    sceneBackground: data.sceneBackground || "studio",
                                };

                                // Show loading state
                                setIsGeneratingPrompt(true);
                                setGeneratedImagePrompt("⏳ กำลังสร้าง Prompt...");
                                setGeneratedVideoPrompt("⏳ กำลังวิเคราะห์ด้วย AI...");

                                try {
                                    console.log("[Prompt Button] Importing veoPromptService...");
                                    const { generatePrompts, generateQuickPrompts } = await import("@/services/veoPromptService");
                                    console.log("[Prompt Button] Imported successfully");
                                    
                                    let prompts;
                                    if (data.useAiScript && productImage) {
                                        console.log("[Prompt Button] Using AI mode with vision...");
                                        prompts = await generatePrompts(promptConfig);
                                    } else {
                                        console.log("[Prompt Button] Using quick mode...");
                                        prompts = generateQuickPrompts(promptConfig);
                                    }
                                    console.log("[Prompt Button] Prompts generated:", prompts);
                                    
                                    setGeneratedImagePrompt(prompts.imagePrompt);
                                    setGeneratedVideoPrompt(prompts.videoPrompt);

                                    // Pre-build all scene video prompts
                                    if (prompts.sceneScripts && prompts.videoPromptMeta && prompts.sceneScripts.length > 1) {
                                        const { buildSceneVideoPromptJSON } = await import("@/services/veoPromptService");
                                        // Parse per-scene video actions (generated alongside scripts)
                                        const videoActionsRaw = data.sceneVideoActions || "";
                                        const videoActions = videoActionsRaw.split(/\n{2,}/).map((s: string) => s.trim());
                                        // Inject Scene 1 videoAction into Scene 1 prompt
                                        let scene1Prompt = prompts.videoPrompt;
                                        if (videoActions[0]?.trim()) {
                                            const scene1Action = videoActions[0].trim();
                                            // Insert AI videoAction before the generic PRODUCT PRESENTATION KNOWLEDGE
                                            if (scene1Prompt.includes('PRODUCT PRESENTATION KNOWLEDGE')) {
                                                scene1Prompt = scene1Prompt.replace(
                                                    'PRODUCT PRESENTATION KNOWLEDGE',
                                                    `VISUAL ACTION FOR THIS SCENE: ${scene1Action}. PRODUCT PRESENTATION KNOWLEDGE`
                                                );
                                            } else {
                                                // Fallback: append to end if marker not found
                                                scene1Prompt += ` VISUAL ACTION FOR THIS SCENE: ${scene1Action}.`;
                                            }
                                            console.log("🎬 Scene 1 videoAction injected:", scene1Action);
                                        }
                                        const allScenePrompts = [scene1Prompt]; // Scene 1 with videoAction
                                        for (let i = 1; i < prompts.sceneScripts.length; i++) {
                                            allScenePrompts.push(buildSceneVideoPromptJSON(prompts.videoPromptMeta, prompts.sceneScripts[i], i + 1, videoActions[i] || ""));
                                        }
                                        setVideoScenePrompts(allScenePrompts);
                                    } else {
                                        setVideoScenePrompts([prompts.videoPrompt]);
                                    }
                                } catch (err: any) {
                                    console.error("[Prompt Button] Prompt generation failed:", err);
                                    alert("สร้าง Prompt ไม่สำเร็จ: " + (err.message || "Unknown error"));
                                    // Fallback to quick mode
                                    try {
                                        const { generateQuickPrompts } = await import("@/services/veoPromptService");
                                        const prompts = generateQuickPrompts(promptConfig);
                                        setGeneratedImagePrompt(prompts.imagePrompt);
                                        setGeneratedVideoPrompt(prompts.videoPrompt);
                                        setVideoScenePrompts([prompts.videoPrompt]);
                                    } catch (fallbackErr) {
                                        console.error("[Prompt Button] Fallback also failed:", fallbackErr);
                                    }
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

                {/* Step 2: Open Engine Page */}
                <div className={`space-y-2 transition-opacity duration-200 ${!generatedImagePrompt ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/15 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
{(watch("videoEngine") || "veo") === "grok" ? "เปิดหน้างาน (Grok)" : "เปิดหน้างาน (Google Flow)"}
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            const engine = getValues("videoEngine") || "veo";
                            const url = engine === "grok"
                                ? 'https://grok.com/imagine'
                                : 'https://labs.google/fx/tools/flow';
                            window.open(url, '_blank');
                            setFlowOpened(true);
                            // Auto-ping after a delay to check if content script loads
                            setTimeout(() => {
                                if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
                                    chrome.runtime.sendMessage({ action: "PING", videoEngine: engine, windowId: myWindowId || undefined }, (res) => {
                                        if (!chrome.runtime.lastError && res?.status === "ready") {
                                            setFlowConnected(true);
                                        }
                                    });
                                }
                            }, 3000);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-medium border transition-all flex items-center justify-center gap-2 ${
                            flowConnected
                                ? 'border-green-500/40 text-green-400 bg-green-500/10'
                                : flowOpened
                                    ? 'border-neon-red/40 text-neon-red bg-neon-red/10'
                                    : 'border-border text-muted-foreground hover:border-neon-red/40 hover:text-neon-red hover:bg-neon-red/5'
                        }`}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
{(() => {
                            const eng = watch("videoEngine") || "veo";
                            const label = eng === "grok" ? "Grok" : "Google Flow";
                            if (flowConnected) return `✓ เชื่อมต่อ ${label} แล้ว`;
                            if (flowOpened) return `⏳ รอเชื่อมต่อ... (กรุณา refresh หน้า ${label})`;
                            return `เปิด ${label}`;
                        })()}
                    </button>
                </div>

                {/* Step 3: Automation — Electric Glow */}
                <div className={`space-y-3 transition-opacity duration-200 ${!generatedImagePrompt || !flowConnected ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/15 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
                        เริ่มสร้างคลิป (Automation)
                    </label>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-neon-red/50" />
                        อัพโหลดรูป → ใส่ prompt → สร้างภาพ + วิดีโอ อัตโนมัติทั้งหมด
                    </p>

                    {/* Electric Lightning Border Button */}
                    <div className={`electric-border-wrap ${isUploading ? 'is-active' : ''} ${!generatedImagePrompt || !flowConnected ? 'is-disabled' : ''}`}>
                        <button
                            type="button"
                            disabled={isUploading || !generatedImagePrompt}
                            onClick={async () => {
                                if (!generatedImagePrompt) return;
                                playAutomationSound();
                                setIsUploading(true);
                                setUploadStatus("⏳ กำลังอัพโหลดรูป + สร้างภาพ...");
                                try {
                                    const response = await new Promise<{ success: boolean; message: string; step?: string }>((resolve) => {
                                        const formData = getValues();
                                        chrome.runtime.sendMessage(
                                            {
                                                action: "GENERATE_IMAGE",
                                                videoEngine: formData.videoEngine || "veo",
                                                imagePrompt: generatedImagePrompt,
                                                videoPrompt: generatedVideoPrompt || undefined,
                                                videoScenePrompts: videoScenePrompts.length > 0 ? videoScenePrompts : undefined,
                                                sceneCount: formData.sceneCount || 1,
                                                productImage: productImage || undefined,
                                                characterImage: characterImage || undefined,
                                                orientation: formData.orientation || "horizontal",
                                                outputCount: formData.outputCount || 1,
                                                veoQuality: formData.veoQuality || "fast",
                                                grokAspectRatio: formData.grokAspectRatio || "9:16",
                                                grokResolution: formData.grokResolution || "480p",
                                                grokDuration: formData.grokDuration || "6s",
                                                theme: localStorage.getItem("netflow_app_theme") || "red",
                                                windowId: myWindowId || undefined,
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
                            className={`w-full py-4 px-6 rounded-[calc(1rem-2px)] font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed ${
                                isUploading
                                    ? 'opacity-80 cursor-wait'
                                    : !generatedImagePrompt
                                        ? 'bg-muted text-muted-foreground'
                                        : 'hover:brightness-110 active:scale-[0.98]'
                            }`}
                            style={
                                generatedImagePrompt && !isUploading
                                    ? { background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia})` }
                                    : isUploading 
                                        ? { background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia})` }
                                        : {}
                            }
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="tracking-wider uppercase text-sm" style={{ animation: 'electric-text-glow 1s ease-in-out infinite' }}>
                                        AI กำลังทำงาน...
                                    </span>
                                    <Sparkles className="w-4 h-4 animate-pulse" />
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    <span className="tracking-wider uppercase text-sm">
                                        AUTOMATION
                                    </span>
                                    <span className="text-[10px] font-normal opacity-70">
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

            {/* TikTok Auto-Post Status */}
            <TikTokStatusCard status={tiktokPostStatus} />

            {/* Console Log */}
            <ConsoleLogSection logs={flowLogs} />
        </div>
    );
};

export default CreateVideoTab;
