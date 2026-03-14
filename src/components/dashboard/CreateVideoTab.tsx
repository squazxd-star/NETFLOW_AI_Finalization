import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Loader2, Wand2, Rocket, Eye, Zap, ArrowRight, ChevronLeft, ChevronRight, MousePointerClick, Sparkles, Repeat } from "lucide-react";
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

    const { generate, isLoading, result, downloadVideo, tiktokPostStatus, lastCompletedProductName } = useVideoGeneration();
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
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [promptPage, setPromptPage] = useState(0); // 0 = image, 1 = video
    const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

    // ─── Loop System ──────────────────────────────────────────────────────
    const [loopCount, setLoopCount] = useState<number>(1);
    const [currentLoop, setCurrentLoop] = useState(0);
    const [isLooping, setIsLooping] = useState(false);
    const [promptCompleteAnim, setPromptCompleteAnim] = useState(false);
    const [showCustomLoop, setShowCustomLoop] = useState(false);
    const [autoOpenVideo, setAutoOpenVideo] = useState(true);
    const aiGenerateRef = useRef<(() => Promise<void>) | null>(null);
    const prevGeneratingRef = useRef(false);

    // Load auto-open video setting
    useEffect(() => {
        try {
            chrome.storage.local.get({ autoOpenVideo: true }, (r: any) => {
                setAutoOpenVideo(r.autoOpenVideo !== false);
            });
        } catch (_) {}
    }, []);

    // Detect prompt generation complete → show animation (stays visible until next generate)
    useEffect(() => {
        if (prevGeneratingRef.current && !isGeneratingPrompt && generatedImagePrompt) {
            setPromptCompleteAnim(true);
        }
        if (isGeneratingPrompt) {
            setPromptCompleteAnim(false);
        }
        prevGeneratingRef.current = isGeneratingPrompt;
    }, [isGeneratingPrompt, generatedImagePrompt]);
    // ─── Multi-Tab Log Management ───────────────────────────────────────────
    const [tabLogs, setTabLogs] = useState<Record<number, string[]>>({});
    const [automationTabs, setAutomationTabs] = useState<{ tabId: number; title: string; running: boolean }[]>([]);
    const [selectedConsoleTab, setSelectedConsoleTab] = useState<number | 'all'>('all');
    const [myWindowId, setMyWindowId] = useState<number | null>(null);

    // Detect this sidepanel's Chrome window ID (for multi-window log isolation)
    useEffect(() => {
        if (typeof chrome !== "undefined" && chrome.windows?.getCurrent) {
            chrome.windows.getCurrent((win: any) => { if (win?.id) setMyWindowId(win.id); });
        }
    }, []);

    // Refresh engine tab list periodically
    const refreshEngineTabs = useCallback(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) return;
        chrome.runtime.sendMessage({ type: 'GET_ENGINE_TABS', engine: 'veo' }, (res) => {
            if (!chrome.runtime.lastError && res?.tabs) {
                setAutomationTabs(res.tabs);
            }
        });
    }, []);

    useEffect(() => {
        refreshEngineTabs();
        const interval = setInterval(refreshEngineTabs, 5000);
        return () => clearInterval(interval);
    }, [refreshEngineTabs]);

    // Listen for FLOW_LOG + AUTOMATION_STOPPED messages from content-flow.ts
    // Group logs by sender.tab.id for per-tab display
    useEffect(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.onMessage) return;
        const handler = (message: any, sender: any) => {
            // Multi-window isolation: only accept logs from tabs in OUR window
            if (myWindowId !== null && sender?.tab?.windowId !== undefined && sender.tab.windowId !== myWindowId) {
                return;
            }
            if (message?.action === "FLOW_LOG" && message.msg) {
                const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                const tabId = sender?.tab?.id;
                const logLine = `[${ts}] ${message.msg}`;
                if (tabId) {
                    setTabLogs(prev => {
                        const existing = prev[tabId] || [];
                        return { ...prev, [tabId]: [...existing.slice(-199), logLine] };
                    });
                    // Auto-register tab if not known (use real Chrome tab title)
                    const tabTitle = sender?.tab?.title || `Tab ${tabId}`;
                    setAutomationTabs(prev => {
                        if (prev.some(t => t.tabId === tabId)) return prev;
                        return [...prev, { tabId, title: tabTitle, running: true }];
                    });
                } else {
                    // Fallback: put in tabId=0 bucket
                    setTabLogs(prev => {
                        const existing = prev[0] || [];
                        return { ...prev, [0]: [...existing.slice(-199), logLine] };
                    });
                }
            }
            if (message?.action === "AUTOMATION_STOPPED") {
                setIsUploading(false);
                setUploadStatus("⛔ หยุดการทำงานแล้ว");
            }
        };
        chrome.runtime.onMessage.addListener(handler);
        return () => chrome.runtime.onMessage.removeListener(handler);
    }, [myWindowId]);

    // Compute displayed logs based on selected tab
    const flowLogs = useMemo(() => {
        const allTabIds = Object.keys(tabLogs).map(Number);
        if (allTabIds.length === 0) return ["✅ ระบบพร้อมทำงาน..."];
        if (selectedConsoleTab === 'all') {
            if (allTabIds.length === 1) return tabLogs[allTabIds[0]] || [];
            // Merge all tabs' logs with tab prefix, then sort chronologically by [HH:MM:SS]
            const merged = allTabIds.flatMap(tid =>
                (tabLogs[tid] || []).map(l => `[Tab ${tid}] ${l}`)
            );
            merged.sort((a, b) => {
                const ta = a.match(/\[(\d{2}:\d{2}:\d{2})\]/)?.[1] || '';
                const tb = b.match(/\[(\d{2}:\d{2}:\d{2})\]/)?.[1] || '';
                return ta.localeCompare(tb);
            });
            return merged;
        }
        return tabLogs[selectedConsoleTab] || [];
    }, [tabLogs, selectedConsoleTab]);

    // ─── Loop System: Listen for VIDEO_GENERATION_COMPLETE to trigger next loop ──
    useEffect(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.onMessage) return;
        const loopHandler = async (message: any) => {
            if (message?.type !== "VIDEO_GENERATION_COMPLETE") return;
            if (!isLooping || currentLoop >= loopCount) return;

            const nextLoop = currentLoop + 1;
            const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            const loopLabel = loopCount === Infinity ? '∞' : loopCount;
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🔄 Loop ${nextLoop}/${loopLabel} — เตรียมรอบถัดไป...`] }));

            // Wait for tab to close
            await new Promise(r => setTimeout(r, 4000));

            if ((window as any).__NETFLOW_STOP_LOOP__) {
                setIsLooping(false);
                setCurrentLoop(0);
                return;
            }

            // Step 1: Trigger AI script generation
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🤖 วิเคราะห์ด้วย AI (Loop ${nextLoop + 1})...`] }));
            if (aiGenerateRef.current) {
                try {
                    await aiGenerateRef.current();
                } catch (e: any) {
                    console.warn("[Loop] AI generate error:", e);
                }
            }
            await new Promise(r => setTimeout(r, 1500));

            // Step 2: Trigger prompt generation
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 📝 สร้าง/อัปเดต Prompt (Loop ${nextLoop + 1})...`] }));
            // Programmatically click the prompt button
            const promptBtn = document.querySelector<HTMLButtonElement>('[data-prompt-generate-btn]');
            if (promptBtn) {
                promptBtn.click();
            }

            // Wait for prompt generation to finish (watch isGeneratingPrompt)
            let waitAttempts = 0;
            while (waitAttempts < 60) {
                await new Promise(r => setTimeout(r, 1000));
                waitAttempts++;
                // Check if prompt is done (the button is re-enabled)
                const btn = document.querySelector<HTMLButtonElement>('[data-prompt-generate-btn]');
                if (btn && !btn.disabled) break;
            }
            await new Promise(r => setTimeout(r, 1000));

            // Show "Generate Prompt Complete" animation
            setPromptCompleteAnim(true);
            await new Promise(r => setTimeout(r, 3000));
            setPromptCompleteAnim(false);

            if ((window as any).__NETFLOW_STOP_LOOP__) {
                setIsLooping(false);
                setCurrentLoop(0);
                return;
            }

            // Step 3: Start automation again
            setCurrentLoop(nextLoop);
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🚀 เริ่ม Automation Loop ${nextLoop + 1}/${loopLabel}...`] }));

            // Trigger OPEN_FLOW_AND_GENERATE
            const automationBtn = document.querySelector<HTMLButtonElement>('[data-automation-btn]');
            if (automationBtn) {
                automationBtn.click();
            }
        };
        chrome.runtime.onMessage.addListener(loopHandler);
        return () => chrome.runtime.onMessage.removeListener(loopHandler);
    }, [isLooping, currentLoop, loopCount]);

    // Append local workflow status to logs (use tabId=0 bucket for local messages)
    useEffect(() => {
        if (isLoading) {
            const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] ⏳ กำลังสร้าง Prompt ด้วย AI...`] }));
        }
    }, [isLoading]);
    useEffect(() => {
        if (result) {
            const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] ✅ สร้างสำเร็จ!`] }));
        }
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
                characterImage={characterImage}
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
                activeProductName={lastCompletedProductName}
            />

            {/* 5. Generation Settings - การตั้งค่าการสร้าง */}
            <GenerationSettingsSection
                {...sectionProps}
                isOpen={settingsOpen}
                onToggle={() => setSettingsOpen(!settingsOpen)}
                productImage={productImage}
                onRegisterAiGenerate={(fn) => { aiGenerateRef.current = fn; }}
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
                                    videoStyle: data.videoStyle || "ugc-review",
                                    characterDescription: data.characterDescription || "",
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
                                    aiPrompt: data.aiPrompt || "",
                                    cachedProductInfo: data.cachedProductInfo || "",
                                    clothingStyles: data.clothingStyles || ["casual"],
                                    characterOutfit: data.characterOutfit || "original",
                                    cameraAngles: data.cameraAngles || ["front", "close-up"],
                                    touchLevel: data.touchLevel || "light",
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
                            data-prompt-generate-btn="true"
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
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 relative">
                            {/* Generate Prompt Complete — Cyber Full Card Takeover */}
                            {promptCompleteAnim ? (
                                <div
                                    className="rounded-xl overflow-hidden relative"
                                    style={{
                                        background: `linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(5,5,15,0.99) 50%, rgba(0,0,0,0.98) 100%)`,
                                        border: `1px solid ${themeConfig.gradientFrom}50`,
                                        minHeight: '200px',
                                        animation: `cyber-border-pulse 2s ease-in-out infinite`,
                                        ['--cyber-glow' as string]: `${themeConfig.gradientFrom}30`,
                                    }}
                                >
                                    {/* CRT Scanline overlay */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" style={{ opacity: 0.06 }}>
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
                                        }} />
                                        <div className="absolute w-full" style={{
                                            height: '40%',
                                            background: `linear-gradient(180deg, transparent 0%, ${themeConfig.gradientFrom}15 50%, transparent 100%)`,
                                            animation: 'cyber-scanline 3s linear infinite',
                                        }} />
                                    </div>

                                    {/* Cyber grid background */}
                                    <div className="absolute inset-0 pointer-events-none rounded-xl" style={{
                                        opacity: 0.04,
                                        backgroundImage: `linear-gradient(${themeConfig.gradientFrom}40 1px, transparent 1px), linear-gradient(90deg, ${themeConfig.gradientFrom}40 1px, transparent 1px)`,
                                        backgroundSize: '20px 20px',
                                    }} />

                                    {/* Corner accents */}
                                    {['top-0 left-0', 'top-0 right-0 -scale-x-100', 'bottom-0 left-0 -scale-y-100', 'bottom-0 right-0 -scale-x-100 -scale-y-100'].map((pos, idx) => (
                                        <div key={idx} className={`absolute ${pos} w-6 h-6 pointer-events-none`} style={{
                                            borderLeft: `2px solid ${themeConfig.gradientFrom}`,
                                            borderTop: `2px solid ${themeConfig.gradientFrom}`,
                                            opacity: 0,
                                            animation: `prompt-complete-letter 0.4s ease-out ${0.3 + idx * 0.1}s forwards`,
                                        }} />
                                    ))}

                                    {/* Top decorative bar */}
                                    <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1" style={{ opacity: 0, animation: `prompt-complete-letter 0.5s ease-out 0.2s forwards` }}>
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: themeConfig.gradientFrom, boxShadow: `0 0 6px ${themeConfig.gradientFrom}` }} />
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: themeConfig.gradientVia, boxShadow: `0 0 6px ${themeConfig.gradientVia}`, opacity: 0.7 }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                        <div className="h-px flex-1 ml-1" style={{ background: `linear-gradient(90deg, ${themeConfig.gradientFrom}50, transparent)` }} />
                                        <span className="text-[7px] font-mono tracking-widest uppercase" style={{ color: `${themeConfig.gradientFrom}80` }}>NETFLOW://PROMPT.GEN</span>
                                        <div className="h-px w-6" style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.gradientFrom}50)` }} />
                                    </div>

                                    {/* Main content */}
                                    <div className="flex flex-col items-center justify-center py-6 px-4 relative z-10">
                                        {/* Horizontal neon bar — top */}
                                        <div className="w-3/4 h-px mb-4" style={{
                                            background: `linear-gradient(90deg, transparent, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia}, ${themeConfig.gradientFrom}, transparent)`,
                                            boxShadow: `0 0 10px ${themeConfig.gradientFrom}60`,
                                            opacity: 0,
                                            transformOrigin: 'center',
                                            animation: `cyber-hbar 0.8s ease-out 0.5s forwards`,
                                        }} />

                                        {/* Line 1: Generate Prompt */}
                                        <div className="flex flex-wrap items-center justify-center" style={{ animation: 'cyber-flicker 3s ease-in-out 5s 1' }}>
                                            {'Generate Prompt'.split('').map((char, i) => (
                                                <span
                                                    key={`l1-${i}`}
                                                    className="inline-block font-black tracking-wider uppercase"
                                                    style={{
                                                        fontSize: '1.5rem',
                                                        lineHeight: 1.2,
                                                        fontFamily: '"Prompt", system-ui, sans-serif',
                                                        letterSpacing: '0.12em',
                                                        opacity: 0,
                                                        background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia}, #fff, ${themeConfig.gradientVia})`,
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        animation: `prompt-complete-letter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s forwards`,
                                                        filter: `drop-shadow(0 0 12px ${themeConfig.gradientFrom}) drop-shadow(0 0 24px ${themeConfig.gradientFrom}40)`,
                                                    }}
                                                >
                                                    {char === ' ' ? '\u00A0' : char}
                                                </span>
                                            ))}
                                        </div>
                                        {/* Line 2: Complete!! */}
                                        <div className="flex flex-wrap items-center justify-center mt-0.5" style={{ animation: 'cyber-glitch 0.3s ease-in-out 5.5s 2' }}>
                                            {'Complete!!'.split('').map((char, i) => {
                                                const delay = ('Generate Prompt'.length * 0.1) + (i * 0.1);
                                                return (
                                                    <span
                                                        key={`l2-${i}`}
                                                        className="inline-block font-black tracking-wider uppercase"
                                                        style={{
                                                            fontSize: '1.5rem',
                                                            lineHeight: 1.2,
                                                            fontFamily: '"Prompt", system-ui, sans-serif',
                                                            letterSpacing: '0.12em',
                                                            opacity: 0,
                                                            background: `linear-gradient(135deg, #fff, ${themeConfig.gradientVia}, ${themeConfig.gradientFrom})`,
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            animation: `prompt-complete-letter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s forwards, prompt-complete-glow 1.5s ease-in-out ${delay + 0.8}s infinite`,
                                                            filter: `drop-shadow(0 0 14px ${themeConfig.gradientVia}) drop-shadow(0 0 28px ${themeConfig.gradientVia}30)`,
                                                        }}
                                                    >
                                                        {char}
                                                    </span>
                                                );
                                            })}
                                        </div>

                                        {/* Horizontal neon bar — bottom */}
                                        <div className="w-3/4 h-px mt-4" style={{
                                            background: `linear-gradient(90deg, transparent, ${themeConfig.gradientVia}, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia}, transparent)`,
                                            boxShadow: `0 0 10px ${themeConfig.gradientVia}60`,
                                            opacity: 0,
                                            transformOrigin: 'center',
                                            animation: `cyber-hbar 0.8s ease-out ${('Generate Prompt'.length + 'Complete!!'.length) * 0.1 + 0.3}s forwards`,
                                        }} />

                                        {/* Status text */}
                                        <div className="mt-3 flex items-center gap-2" style={{
                                            opacity: 0,
                                            animation: `prompt-complete-letter 0.5s ease-out ${('Generate Prompt'.length + 'Complete!!'.length) * 0.1 + 0.6}s forwards`,
                                        }}>
                                            <span className="text-[8px] font-mono tracking-[0.2em] uppercase" style={{ color: `${themeConfig.gradientFrom}90` }}>
                                                ■ STATUS: SUCCESS
                                            </span>
                                            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{
                                                background: themeConfig.gradientFrom,
                                                boxShadow: `0 0 6px ${themeConfig.gradientFrom}`,
                                                animation: 'pulse 1.5s ease-in-out infinite',
                                            }} />
                                            <span className="text-[8px] font-mono tracking-[0.2em] uppercase" style={{ color: `${themeConfig.gradientVia}70` }}>
                                                READY
                                            </span>
                                        </div>

                                        {/* Data stream bars */}
                                        <div className="flex justify-center gap-1 mt-3">
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="rounded-sm"
                                                    style={{
                                                        width: '3px',
                                                        height: `${8 + Math.sin(i * 0.8) * 6}px`,
                                                        background: `linear-gradient(180deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia}80)`,
                                                        boxShadow: `0 0 4px ${themeConfig.gradientFrom}40`,
                                                        opacity: 0,
                                                        animation: `prompt-complete-letter 0.3s ease-out ${('Generate Prompt'.length + 'Complete!!'.length) * 0.1 + 0.5 + i * 0.05}s forwards, pulse 1.2s ease-in-out ${1 + i * 0.1}s infinite alternate`,
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Powered by Netflow */}
                                        <div className="flex flex-wrap items-center justify-center mt-4">
                                            {'Powered by Netflow'.split('').map((char, i) => {
                                                const baseDelay = ('Generate Prompt'.length + 'Complete!!'.length) * 0.1 + 1.0;
                                                return (
                                                    <span
                                                        key={`pbn-${i}`}
                                                        className="inline-block font-bold tracking-wider uppercase"
                                                        style={{
                                                            fontSize: '0.7rem',
                                                            lineHeight: 1.2,
                                                            fontFamily: '"Prompt", system-ui, sans-serif',
                                                            letterSpacing: '0.18em',
                                                            opacity: 0,
                                                            background: `linear-gradient(135deg, ${themeConfig.gradientFrom}90, ${themeConfig.gradientVia}, ${themeConfig.gradientFrom}90)`,
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            animation: `prompt-complete-letter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${baseDelay + i * 0.06}s forwards, prompt-complete-glow 2s ease-in-out ${baseDelay + i * 0.06 + 0.8}s infinite`,
                                                            filter: `drop-shadow(0 0 8px ${themeConfig.gradientFrom}50)`,
                                                        }}
                                                    >
                                                        {char === ' ' ? '\u00A0' : char}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Bottom decorative bar */}
                                    <div className="flex items-center gap-1.5 px-3 pb-2.5 pt-1" style={{ opacity: 0, animation: `prompt-complete-letter 0.5s ease-out ${('Generate Prompt'.length + 'Complete!!'.length) * 0.1 + 0.8}s forwards` }}>
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${themeConfig.gradientFrom}40, transparent)` }} />
                                        <span className="text-[7px] font-mono tracking-widest" style={{ color: `${themeConfig.gradientVia}50` }}>
                                            {'//'.padEnd(20, '─')}
                                        </span>
                                        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${themeConfig.gradientFrom}40)` }} />
                                    </div>
                                </div>
                            ) : (
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
                            )}
                        </div>
                    )}
                </div>

                {/* Step 2: Automation — Auto Open Flow + New Project + Generate */}
                <div className={`space-y-3 transition-opacity duration-200 ${!generatedImagePrompt ? 'opacity-40 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/15 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
                        เริ่มสร้างคลิป (Automation)
                    </label>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-neon-red/50" />
                        เปิด Google Flow → สร้างโปรเจค → อัพโหลดรูป → ใส่ prompt → สร้างภาพ + วิดีโอ
                    </p>

                    {/* Loop Count Selector */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Repeat className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">จำนวนรอบ:</span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 5, 10].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    onClick={() => { setLoopCount(n); setShowCustomLoop(false); }}
                                    className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all ${
                                        loopCount === n && !showCustomLoop
                                            ? 'bg-neon-red text-white shadow-md shadow-neon-red/30 scale-110'
                                            : 'bg-muted/30 text-muted-foreground hover:bg-neon-red/20 hover:text-neon-red border border-border/50'
                                    }`}
                                >
                                    {n}
                                </button>
                            ))}
                            {/* Infinity */}
                            <button
                                type="button"
                                onClick={() => { setLoopCount(Infinity); setShowCustomLoop(false); }}
                                className={`w-7 h-7 rounded-lg text-[12px] font-bold transition-all ${
                                    loopCount === Infinity
                                        ? 'bg-neon-red text-white shadow-md shadow-neon-red/30 scale-110'
                                        : 'bg-muted/30 text-muted-foreground hover:bg-neon-red/20 hover:text-neon-red border border-border/50'
                                }`}
                            >
                                ∞
                            </button>
                            {/* Custom */}
                            <button
                                type="button"
                                onClick={() => {
                                    setShowCustomLoop(true);
                                    if (![1,2,3,5,10].includes(loopCount) && loopCount !== Infinity) return;
                                    setLoopCount(20);
                                }}
                                className={`h-7 px-2 rounded-lg text-[9px] font-bold transition-all ${
                                    showCustomLoop
                                        ? 'bg-neon-red text-white shadow-md shadow-neon-red/30 scale-110'
                                        : 'bg-muted/30 text-muted-foreground hover:bg-neon-red/20 hover:text-neon-red border border-border/50'
                                }`}
                            >
                                กำหนดเอง
                            </button>
                            {showCustomLoop && (
                                <input
                                    type="number"
                                    min={1}
                                    max={9999}
                                    value={loopCount === Infinity ? '' : loopCount}
                                    onChange={(e) => {
                                        const v = parseInt(e.target.value, 10);
                                        if (!isNaN(v) && v >= 1) setLoopCount(v);
                                    }}
                                    className="w-14 h-7 rounded-lg text-[10px] font-bold text-center bg-muted/30 border border-neon-red/50 text-foreground focus:outline-none focus:ring-1 focus:ring-neon-red/50"
                                    autoFocus
                                />
                            )}
                        </div>
                        {isLooping && (
                            <span className="text-[10px] text-neon-red font-medium ml-auto animate-pulse">
                                🔄 Loop {currentLoop + 1}/{loopCount === Infinity ? '∞' : loopCount}
                            </span>
                        )}
                    </div>

                    {/* Auto-open video toggle */}
                    <div className="flex items-center justify-between py-1 px-1">
                        <div className="flex items-center gap-2">
                            <Play className="w-3.5 h-3.5 text-neon-red/70" />
                            <div>
                                <span className="text-[10px] font-medium text-foreground">เปิดวิดีโออัตโนมัติ</span>
                                <p className="text-[8px] text-muted-foreground">เปิดไฟล์วิดีโอใน Chrome หลังดาวน์โหลดเสร็จ</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                const next = !autoOpenVideo;
                                setAutoOpenVideo(next);
                                try { chrome.storage.local.set({ autoOpenVideo: next }); } catch (_) {}
                            }}
                            className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${
                                autoOpenVideo ? 'bg-neon-red' : 'bg-muted-foreground/30'
                            }`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                                autoOpenVideo ? 'translate-x-4' : 'translate-x-0'
                            }`} />
                        </button>
                    </div>

                    {/* Electric Lightning Border Button */}
                    <div className={`electric-border-wrap ${isUploading ? 'is-active' : ''} ${!generatedImagePrompt ? 'is-disabled' : ''}`}>
                        <button
                            type="button"
                            data-automation-btn="true"
                            disabled={isUploading || !generatedImagePrompt}
                            onClick={async () => {
                                if (!generatedImagePrompt) return;
                                playAutomationSound();
                                setIsUploading(true);
                                setUploadStatus("⏳ กำลังเปิด Google Flow + สร้างโปรเจค...");

                                // Start loop tracking
                                if (!isLooping && loopCount > 1) {
                                    setIsLooping(true);
                                    setCurrentLoop(0);
                                    (window as any).__NETFLOW_STOP_LOOP__ = false;
                                }

                                try {
                                    const response = await new Promise<{ success: boolean; message: string; step?: string }>((resolve) => {
                                        const formData = getValues();
                                        chrome.runtime.sendMessage(
                                            {
                                                action: "OPEN_FLOW_AND_GENERATE",
                                                videoEngine: formData.videoEngine || "veo",
                                                productName: formData.productName || '',
                                                imagePrompt: generatedImagePrompt,
                                                videoPrompt: generatedVideoPrompt || undefined,
                                                videoScenePrompts: videoScenePrompts.length > 0 ? videoScenePrompts : undefined,
                                                sceneCount: formData.sceneCount || 1,
                                                productImage: productImage || undefined,
                                                characterImage: characterImage || undefined,
                                                orientation: formData.orientation || "vertical",
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
                                        {isLooping ? `Loop ${currentLoop + 1}/${loopCount} — AI กำลังทำงาน...` : 'AI กำลังทำงาน...'}
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
                                        {loopCount === Infinity ? 'สร้างคลิปอัตโนมัติ x∞' : loopCount > 1 ? `สร้างคลิปอัตโนมัติ x${loopCount}` : 'สร้างคลิปอัตโนมัติ'}
                                    </span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Stop Loop Button */}
                    {isLooping && (
                        <button
                            type="button"
                            onClick={() => {
                                (window as any).__NETFLOW_STOP_LOOP__ = true;
                                setIsLooping(false);
                                setCurrentLoop(0);
                                setUploadStatus("⛔ หยุดการลูปแล้ว");
                            }}
                            className="w-full py-2 px-4 rounded-xl text-xs font-medium border border-red-500/40 text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            ⛔ หยุด Loop
                        </button>
                    )}

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
            <ConsoleLogSection
                logs={flowLogs}
                tabs={automationTabs}
                selectedTab={selectedConsoleTab}
                onTabSelect={setSelectedConsoleTab}
            />
        </div>
    );
};

export default CreateVideoTab;
