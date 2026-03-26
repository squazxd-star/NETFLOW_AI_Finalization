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
import { AutomationSummary } from "./AutomationSummary";

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
    const useAiScript = watch("useAiScript");
    const sceneScriptsRaw = watch("sceneScriptsRaw") || "";
    const sceneCount = (watch("sceneCount") || 2) as number;
    const manualSceneScripts = sceneScriptsRaw
        .split(/\n{2,}/)
        .map((part) => part.trim())
        .filter(Boolean);
    const isManualPromptReady = useAiScript || manualSceneScripts.length >= sceneCount;

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
    
    // Automation Summary State
    const [showSummary, setShowSummary] = useState(false);
    const [automationStats, setAutomationStats] = useState({
        products: 0,
        plannedClips: 0,
        images: 0,
        videos: 0,
        tiktokQueued: 0,
        tiktokPosts: 0,
        tiktokFailed: 0,
        youtubeQueued: 0,
        youtubeUploads: 0,
        youtubeFailed: 0,
        success: 0,
        failed: 0
    });
    const [automationStartTime, setAutomationStartTime] = useState<number | null>(null);
    const [automationDuration, setAutomationDuration] = useState("");

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
    const loopAdvanceInFlightRef = useRef(false);
    const lastLoopCompletionRef = useRef<{ tabId: number | null; videoUrl: string | null; at: number }>({
        tabId: null,
        videoUrl: null,
        at: 0
    });

    // Automation Refs for Event Listeners
    const isLoopingRef = useRef(false);
    const loopCountRef = useRef(1);
    const currentLoopRef = useRef(0);
    const automationStartTimeRef = useRef<number | null>(null);

    // Update Refs when state changes
    useEffect(() => { isLoopingRef.current = isLooping; }, [isLooping]);
    useEffect(() => { loopCountRef.current = loopCount; }, [loopCount]);
    useEffect(() => { currentLoopRef.current = currentLoop; }, [currentLoop]);
    useEffect(() => { automationStartTimeRef.current = automationStartTime; }, [automationStartTime]);

    const finalizeAutomationRun = useCallback(() => {
        if (automationStartTimeRef.current) {
            const endTime = Date.now();
            const diffMs = endTime - automationStartTimeRef.current;
            const diffMins = Math.floor(diffMs / 60000);
            const diffSecs = Math.floor((diffMs % 60000) / 1000);
            setAutomationDuration(`${diffMins} นาที ${diffSecs} วินาที`);
            automationStartTimeRef.current = null;
        }
        setShowSummary(true);
    }, []);

    // ─── Prompt Generation Logic ──────────────────────────────────────────
    const handleGeneratePrompt = async () => {
        console.log("[Prompt Generator] Starting validation...");
        const isValid = await form.trigger();
        
        if (!isValid) {
            const errors = form.formState.errors;
            console.error("[Prompt Generator] Validation failed:", errors);
            alert("กรุณากรอกข้อมูลให้ครบถ้วน:\n" + Object.keys(errors).join("\n"));
            return null;
        }

        const data = getValues();
        const manualScripts = (data.sceneScriptsRaw || "")
            .split(/\n{2,}/)
            .map((part) => part.trim())
            .filter(Boolean);
            
        if (!data.useAiScript && manualScripts.length < (data.sceneCount || 1)) {
            alert(`โหมดกำหนดบทเองต้องกรอกบทพูดให้ครบ ${data.sceneCount || 1} ฉากก่อนสร้าง Prompt`);
            return null;
        }
        
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
            sceneCount: data.sceneCount || 1,
            clipDuration: (data.sceneCount || 1) * 8,
            hookText: data.useAiScript && data.hookEnabled ? data.hookText : "",
            ctaText: data.useAiScript && data.ctaEnabled ? data.ctaText : "",
            mustUseKeywords: data.mustUseKeywords || "",
            avoidKeywords: data.avoidKeywords || "",
            userScript: data.sceneScriptsRaw || "",
            aiPrompt: data.aiPrompt || "",
            cachedProductInfo: data.cachedProductInfo || "",
            clothingStyles: data.clothingStyles || ["casual"],
            characterOutfit: data.characterOutfit || "original",
            customOutfitPrompt: data.customOutfitPrompt || "",
            clothingHighlight: data.clothingHighlight || "",
            cameraAngles: data.cameraAngles || ["front", "close-up"],
            touchLevel: data.touchLevel || "light",
            sceneBackground: data.sceneBackground === "custom" && data.customSceneBackground 
                ? data.customSceneBackground 
                : data.sceneBackground || "studio",
        };

        setIsGeneratingPrompt(true);
        setGeneratedImagePrompt("⏳ กำลังสร้าง Prompt...");
        setGeneratedVideoPrompt(data.useAiScript ? "⏳ กำลังวิเคราะห์ด้วย AI..." : "⏳ กำลังจัดบทที่คุณเขียนให้เข้ากับ Veo...");

        try {
            const { generatePrompts } = await import("@/services/veoPromptService");
            const prompts = await generatePrompts(promptConfig);
            
            setGeneratedImagePrompt(prompts.imagePrompt);
            setGeneratedVideoPrompt(prompts.videoPrompt);

            let allScenePrompts: string[] = [];
            if (prompts.sceneScripts && prompts.videoPromptMeta && prompts.sceneScripts.length > 1) {
                const { buildSceneVideoPromptJSON } = await import("@/services/veoPromptService");
                const videoActionsRaw = data.sceneVideoActions || "";
                const videoActions = videoActionsRaw.split(/\n{2,}/).map((s: string) => s.trim());
                
                let scene1Prompt = prompts.videoPrompt;
                if (videoActions[0]?.trim()) {
                    const scene1Action = videoActions[0].trim();
                    if (scene1Prompt.includes('PRODUCT PRESENTATION KNOWLEDGE')) {
                        scene1Prompt = scene1Prompt.replace(
                            'PRODUCT PRESENTATION KNOWLEDGE',
                            `VISUAL ACTION FOR THIS SCENE: ${scene1Action}. PRODUCT PRESENTATION KNOWLEDGE`
                        );
                    } else {
                        scene1Prompt += ` VISUAL ACTION FOR THIS SCENE: ${scene1Action}.`;
                    }
                }
                allScenePrompts = [scene1Prompt];
                for (let i = 1; i < prompts.sceneScripts.length; i++) {
                    allScenePrompts.push(buildSceneVideoPromptJSON(prompts.videoPromptMeta, prompts.sceneScripts[i], i + 1, videoActions[i] || ""));
                }
                setVideoScenePrompts(allScenePrompts);
            } else {
                allScenePrompts = [prompts.videoPrompt];
                setVideoScenePrompts(allScenePrompts);
            }
            
            return {
                imagePrompt: prompts.imagePrompt,
                videoPrompt: prompts.videoPrompt,
                videoScenePrompts: allScenePrompts
            };
        } catch (err: any) {
            console.error("[Prompt Generator] Failed:", err);
            alert("สร้าง Prompt ไม่สำเร็จ: " + (err.message || "Unknown error"));
            return null;
        } finally {
            setIsGeneratingPrompt(false);
        }
    };

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
                
                setIsLooping(false);
                finalizeAutomationRun();
            }
            if (message?.type === "TIKTOK_CAPTION_PREVIEW") {
                setAutomationStats(prev => ({
                    ...prev,
                    tiktokQueued: prev.tiktokQueued + 1
                }));
            }
            if (message?.type === "TIKTOK_UPLOAD_COMPLETE" || message?.type === "TIKTOK_POST_SUCCESS") {
                setAutomationStats(prev => ({
                    ...prev,
                    tiktokQueued: Math.max(0, prev.tiktokQueued - 1),
                    tiktokPosts: prev.tiktokPosts + 1
                }));
            }
            if (message?.type === "TIKTOK_UPLOAD_ERROR" || message?.type === "TIKTOK_POST_FAILED") {
                setAutomationStats(prev => ({
                    ...(message._fromHook && prev.tiktokQueued > 0 ? prev : {
                        ...prev,
                        tiktokQueued: Math.max(0, prev.tiktokQueued - 1),
                        tiktokFailed: prev.tiktokFailed + 1,
                        failed: prev.failed + 1
                    })
                }));
            }
            if (message?.type === "YOUTUBE_UPLOAD_STARTED") {
                setAutomationStats(prev => ({
                    ...prev,
                    youtubeQueued: prev.youtubeQueued + 1
                }));
            }
            if (message?.type === "YOUTUBE_UPLOAD_COMPLETE") {
                setAutomationStats(prev => ({
                    ...prev,
                    youtubeQueued: Math.max(0, prev.youtubeQueued - 1),
                    youtubeUploads: prev.youtubeUploads + 1
                }));
            }
            if (message?.type === "YOUTUBE_UPLOAD_FAILED") {
                setAutomationStats(prev => ({
                    ...prev,
                    youtubeQueued: Math.max(0, prev.youtubeQueued - 1),
                    youtubeFailed: prev.youtubeFailed + 1,
                    failed: prev.failed + 1
                }));
            }
        };
        chrome.runtime.onMessage.addListener(handler);
        return () => chrome.runtime.onMessage.removeListener(handler);
    }, [finalizeAutomationRun, myWindowId]);

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

    // ─── Loop System: Listen for VIDEO_GENERATION_COMPLETE / ERROR to trigger next loop ──
    useEffect(() => {
        if (typeof chrome === "undefined" || !chrome.runtime?.onMessage) return;

        /**
         * Shared logic: advance to the next loop iteration.
         * Called after both success (VIDEO_GENERATION_COMPLETE) and error (VIDEO_GENERATION_ERROR).
         */
        const advanceToNextLoop = async () => {
            const isCurrentlyLooping = isLoopingRef.current;
            const currentLoopValue = currentLoopRef.current;
            const currentLoopCount = loopCountRef.current;

            if (!isCurrentlyLooping || currentLoopValue >= currentLoopCount - 1) {
                const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🎉 ทำงานเสร็จสมบูรณ์!`] }));
                setIsLooping(false);
                setCurrentLoop(0);
                setIsUploading(false);
                (window as any).__NETFLOW_STOP_LOOP__ = true;
                finalizeAutomationRun();
                return;
            }

            const nextLoop = currentLoopValue + 1;
            const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            const loopLabel = currentLoopCount === Infinity ? '∞' : currentLoopCount;
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🔄 Loop ${nextLoop}/${loopLabel} — เตรียมรอบถัดไป...`] }));

            await new Promise(r => setTimeout(r, 4000));

            if ((window as any).__NETFLOW_STOP_LOOP__) {
                setIsLooping(false);
                setCurrentLoop(0);
                setIsUploading(false);
                return;
            }

            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🤖 วิเคราะห์ด้วย AI (Loop ${nextLoop + 1})...`] }));
            if (aiGenerateRef.current) {
                try {
                    await aiGenerateRef.current();
                } catch (e: any) {
                    console.warn("[Loop] AI generate error:", e);
                }
            }

            await new Promise(r => setTimeout(r, 1500));

            if ((window as any).__NETFLOW_STOP_LOOP__) {
                setIsLooping(false);
                setCurrentLoop(0);
                setIsUploading(false);
                return;
            }

            setCurrentLoop(nextLoop);
            setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] 🚀 เริ่ม Automation Loop ${nextLoop + 1}/${loopLabel}...`] }));

            const automationBtn = document.querySelector<HTMLButtonElement>('[data-automation-btn]');
            if (automationBtn) {
                setGeneratedImagePrompt(null);
                setGeneratedVideoPrompt(null);
                setIsUploading(false);
                await new Promise(r => setTimeout(r, 50));
                automationBtn.click();
            }
        };

        const loopHandler = async (message: any) => {
            // ── Handle SUCCESS: video generated OK ──
            if (message?.type === "VIDEO_GENERATION_COMPLETE") {
                const now = Date.now();
                const eventTabId = typeof message.tabId === "number" ? message.tabId : null;
                const eventVideoUrl = typeof message.videoUrl === "string" ? message.videoUrl : null;
                const lastCompletion = lastLoopCompletionRef.current;
                const isDuplicateCompletion =
                    loopAdvanceInFlightRef.current ||
                    (
                        now - lastCompletion.at < 10000 &&
                        (
                            (eventTabId !== null && lastCompletion.tabId === eventTabId) ||
                            (!!eventVideoUrl && lastCompletion.videoUrl === eventVideoUrl)
                        )
                    );

                if (isDuplicateCompletion) return;

                loopAdvanceInFlightRef.current = true;
                lastLoopCompletionRef.current = { tabId: eventTabId, videoUrl: eventVideoUrl, at: now };

                try {
                    setAutomationStats(prev => ({
                        ...prev,
                        images: prev.images + 1,
                        videos: prev.videos + 1,
                        success: prev.success + 1
                    }));
                    await advanceToNextLoop();
                } finally {
                    loopAdvanceInFlightRef.current = false;
                }
                return;
            }

            // ── Handle ERROR: automation failed — skip to next loop ──
            if (message?.type === "VIDEO_GENERATION_ERROR" && message?.recoverable) {
                if (!isLoopingRef.current) return; // Not looping — let useVideoGeneration handle normally
                if (loopAdvanceInFlightRef.current) return; // Already advancing

                loopAdvanceInFlightRef.current = true;
                const errorMsg = message.error || "Unknown error";
                const ts = new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                const currentLoopValue = currentLoopRef.current;
                const loopLabel = loopCountRef.current === Infinity ? '∞' : loopCountRef.current;

                console.warn(`[Loop] Loop ${currentLoopValue + 1}/${loopLabel} error — skipping: ${errorMsg}`);
                setTabLogs(prev => ({ ...prev, [0]: [...(prev[0] || []), `[${ts}] ⚠️ Loop ${currentLoopValue + 1}/${loopLabel} ล้มเหลว: ${errorMsg} — ข้ามไปรอบถัดไป`] }));

                setAutomationStats(prev => ({
                    ...prev,
                    failed: prev.failed + 1
                }));

                try {
                    await advanceToNextLoop();
                } finally {
                    loopAdvanceInFlightRef.current = false;
                }
                return;
            }
        };
        chrome.runtime.onMessage.addListener(loopHandler);
        return () => chrome.runtime.onMessage.removeListener(loopHandler);
    }, [finalizeAutomationRun]);

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

                {/* Automation — Auto Open Flow + New Project + Generate */}
                <div className="space-y-3 transition-opacity duration-200">
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <Zap className="w-4 h-4 text-neon-red" />
                        เริ่มสร้างคลิป (Automation)
                    </label>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-neon-red/50" />
                        สร้าง Prompt ด้วย AI → เปิด Google Flow → อัพโหลดรูป → สร้างภาพ + วิดีโอ
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
                                    onClick={() => { 
                                        setLoopCount(n); 
                                        setShowCustomLoop(false);
                                        // Allow dynamic switching to looping mode if currently running
                                        if (isUploading && n > 1 && !isLooping) {
                                            setIsLooping(true);
                                            (window as any).__NETFLOW_STOP_LOOP__ = false;
                                        }
                                    }}
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
                                onClick={() => { 
                                    setLoopCount(Infinity); 
                                    setShowCustomLoop(false);
                                    if (isUploading && !isLooping) {
                                        setIsLooping(true);
                                        (window as any).__NETFLOW_STOP_LOOP__ = false;
                                    }
                                }}
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
                                    if (isUploading && !isLooping) {
                                        setIsLooping(true);
                                        (window as any).__NETFLOW_STOP_LOOP__ = false;
                                    }
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
                                        if (!isNaN(v) && v >= 1) {
                                            setLoopCount(v);
                                            if (isUploading && v > 1 && !isLooping) {
                                                setIsLooping(true);
                                                (window as any).__NETFLOW_STOP_LOOP__ = false;
                                            }
                                        }
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
                    <div className={`electric-border-wrap ${isUploading ? 'is-active' : ''}`}>
                        <button
                            type="button"
                            data-automation-btn="true"
                            disabled={isUploading}
                            onClick={async () => {
                                playAutomationSound();
                                setIsUploading(true);
                                
                                // 1. Always generate fresh prompt based on current form inputs
                                setUploadStatus("⏳ กำลังสร้าง Prompt ด้วย AI...");
                                const prompts = await handleGeneratePrompt();
                                if (!prompts) {
                                    // If looping, skip this iteration and advance to next loop
                                    if (isLoopingRef.current) {
                                        setUploadStatus("⚠️ สร้าง Prompt ไม่สำเร็จ — ข้ามไปรอบถัดไป");
                                        try {
                                            chrome.runtime.sendMessage({
                                                type: "VIDEO_GENERATION_ERROR",
                                                error: "Prompt generation failed",
                                                source: "veo",
                                                recoverable: true
                                            });
                                        } catch (_) {}
                                        return;
                                    }
                                    setIsUploading(false);
                                    setUploadStatus("❌ สร้าง Prompt ไม่สำเร็จ");
                                    return;
                                }

                                setUploadStatus("⏳ กำลังเปิด Google Flow + สร้างโปรเจค...");

                                // Start loop tracking
                                if (!isLooping && loopCount > 1) {
                                    setIsLooping(true);
                                    setCurrentLoop(0);
                                    (window as any).__NETFLOW_STOP_LOOP__ = false;
                                }
                                
                                // Reset stats and start timer — only on FIRST loop, not re-triggers
                                if (!isLoopingRef.current) {
                                    setAutomationStartTime(Date.now());
                                    setAutomationStats({
                                        products: 1,
                                        plannedClips: Number.isFinite(loopCount) ? loopCount : -1,
                                        images: 0,
                                        videos: 0,
                                        tiktokQueued: 0,
                                        tiktokPosts: 0,
                                        tiktokFailed: 0,
                                        youtubeQueued: 0,
                                        youtubeUploads: 0,
                                        youtubeFailed: 0,
                                        success: 0,
                                        failed: 0
                                    });
                                }

                                try {
                                    const response = await new Promise<{ success: boolean; message: string; step?: string }>((resolve) => {
                                        const formData = getValues();
                                        const requestedEngine = formData.videoEngine === "veo" ? "veo" : "veo";
                                        chrome.runtime.sendMessage(
                                            {
                                                action: "OPEN_FLOW_AND_GENERATE",
                                                videoEngine: requestedEngine,
                                                productName: formData.productName || '',
                                                imagePrompt: prompts.imagePrompt,
                                                videoPrompt: prompts.videoPrompt,
                                                videoScenePrompts: prompts.videoScenePrompts.length > 0 ? prompts.videoScenePrompts : undefined,
                                                sceneCount: formData.sceneCount || 1,
                                                productImage: productImage || undefined,
                                                characterImage: characterImage || undefined,
                                                orientation: formData.orientation || "vertical",
                                                outputCount: formData.outputCount || 1,
                                                veoQuality: formData.veoQuality || "fast",
                                                grokAspectRatio: formData.grokAspectRatio || "9:16",
                                                grokResolution: formData.grokResolution || "480p",
                                                grokDuration: formData.grokDuration || "6s",
                                                theme: localStorage.getItem("netflow_app_theme") || "blue",
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
                                    if (response.success) {
                                        setUploadStatus(response.message);
                                    } else {
                                        // If looping, skip this iteration and advance to next loop
                                        if (isLoopingRef.current) {
                                            setUploadStatus(`⚠️ ${response.message} — ข้ามไปรอบถัดไป`);
                                            try {
                                                chrome.runtime.sendMessage({
                                                    type: "VIDEO_GENERATION_ERROR",
                                                    error: response.message || "OPEN_FLOW_AND_GENERATE failed",
                                                    source: "veo",
                                                    recoverable: true
                                                });
                                            } catch (_) {}
                                        } else {
                                            setUploadStatus(`❌ ${response.message}`);
                                            setIsUploading(false);
                                        }
                                    }
                                } catch (err: any) {
                                    // If looping, skip this iteration and advance to next loop
                                    if (isLoopingRef.current) {
                                        setUploadStatus(`⚠️ ${err.message} — ข้ามไปรอบถัดไป`);
                                        try {
                                            chrome.runtime.sendMessage({
                                                type: "VIDEO_GENERATION_ERROR",
                                                error: err.message || "Automation request failed",
                                                source: "veo",
                                                recoverable: true
                                            });
                                        } catch (_) {}
                                    } else {
                                        setUploadStatus(`❌ ${err.message}`);
                                        setIsUploading(false);
                                    }
                                }
                            }}
                            className={`w-full py-4 px-6 rounded-[calc(1rem-2px)] font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:cursor-not-allowed ${
                                isUploading
                                    ? 'opacity-80 cursor-wait'
                                    : 'hover:brightness-110 active:scale-[0.98]'
                            }`}
                            style={
                                isUploading 
                                    ? { background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia})` }
                                    : { background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia})` }
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
                                
                                finalizeAutomationRun();
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

            {/* Automation Summary Modal */}
            <AutomationSummary 
                isOpen={showSummary} 
                onClose={() => setShowSummary(false)} 
                stats={automationStats} 
                duration={automationDuration} 
            />
        </div>
    );
};

export default CreateVideoTab;
