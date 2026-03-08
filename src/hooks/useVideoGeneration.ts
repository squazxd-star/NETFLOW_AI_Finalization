import { useState, useEffect, useCallback } from "react";
import { runFullWorkflow } from "../services/geminiService";
import { VideoGenerationResponse } from "../types/netflow";
import { useToast } from "./use-toast";
import { getActiveProduct } from "../services/tiktokProductService";
import { uploadToTikTok, isTikTokAutoPostEnabled, addPostHistory } from "../services/tiktokUploadService";

// Check if running as Chrome Extension
const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;

export interface TikTokPostProgress {
    status: 'idle' | 'posting' | 'done' | 'error';
    step: number;
    total: number;
    label: string;
    caption: string;
    hashtags: string[];
    productName: string;
    scheduleTime: string;
    steps: { label: string; status: 'pending' | 'active' | 'done' | 'error' }[];
}

const INITIAL_TIKTOK_STATUS: TikTokPostProgress = {
    status: 'idle', step: 0, total: 13, label: '',
    caption: '', hashtags: [], productName: '', scheduleTime: '',
    steps: []
};

export const useVideoGeneration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<VideoGenerationResponse | null>(null);
    const [tiktokPostStatus, setTiktokPostStatus] = useState<TikTokPostProgress>(INITIAL_TIKTOK_STATUS);
    const { toast } = useToast();

    // Handle TikTok auto-post after video generation
    const handleTikTokAutoPost = async (videoUrl: string) => {
        try {
            const autoPostEnabled = await isTikTokAutoPostEnabled();
            if (!autoPostEnabled) {
                console.log("[useVideoGeneration] TikTok auto-post disabled");
                return;
            }

            setTiktokPostStatus(prev => ({
                ...prev,
                status: 'posting',
                step: 0,
                label: 'เตรียมโพสต์ TikTok...',
                steps: []
            }));

            const product = await getActiveProduct();
            if (!product) {
                setTiktokPostStatus(prev => ({ ...prev, status: 'error', label: 'ไม่มีสินค้าที่เลือก' }));
                toast({
                    title: "ℹ️ ไม่มีสินค้าที่เลือก",
                    description: "กรุณาเลือกสินค้าในหน้าตั้งค่า TikTok ก่อนโพสต์",
                });
                return;
            }

            setTiktokPostStatus(prev => ({
                ...prev,
                productName: product.name || '',
                label: `ตรวจสอบคลิป + เตรียมโพสต์ "${product.name}"`
            }));

            toast({
                title: "📤 กำลังโพสต์ไป TikTok...",
                description: `กำลังอัปโหลดวิดีโอ + ปักตะกร้า "${product.name}"`,
            });

            const uploadResult = await uploadToTikTok({ videoUrl, product });

            if (uploadResult.success) {
                setTiktokPostStatus(prev => {
                    addPostHistory({
                        productName: prev.productName || product.name,
                        caption: prev.caption || '',
                        hashtags: prev.hashtags || [],
                        scheduleTime: prev.scheduleTime || '',
                        status: 'success'
                    });
                    return { ...prev, status: 'done', label: '✅ โพสต์สำเร็จ!' };
                });
                toast({
                    title: "✅ โพสต์สำเร็จ!",
                    description: `วิดีโอถูกตั้งเวลาโพสต์ + ปักตะกร้า "${product.name}" แล้ว`,
                    className: "bg-green-600 text-white"
                });
            } else {
                setTiktokPostStatus(prev => {
                    addPostHistory({
                        productName: prev.productName || product.name,
                        caption: prev.caption || '',
                        hashtags: prev.hashtags || [],
                        scheduleTime: prev.scheduleTime || '',
                        status: 'failed',
                        error: uploadResult.error
                    });
                    return { ...prev, status: 'error', label: uploadResult.error || 'โพสต์ไม่สำเร็จ' };
                });
                toast({
                    title: "❌ โพสต์ไม่สำเร็จ",
                    description: uploadResult.error || "เกิดข้อผิดพลาดในการโพสต์ไป TikTok",
                    variant: "destructive"
                });
            }
        } catch (error) {
            console.error("[useVideoGeneration] TikTok auto-post error:", error);
            setTiktokPostStatus(prev => ({ ...prev, status: 'error', label: 'เกิดข้อผิดพลาด' }));
        }
    };

    // Listen for TikTok messages from background script
    useEffect(() => {
        if (!isExtension) return;

        const handleMessage = (message: any) => {
            console.log("[Hook] Received message:", message.type, message);

            // Handle video generation complete — trigger TikTok auto-post
            if (message.type === "VIDEO_GENERATION_COMPLETE") {
                setIsLoading(false);
                const source = message.source || 'rpa';
                setResult({
                    success: true,
                    message: source === 'grok' ? "Video generated via Grok Imagine" : "Generated via VideoFX RPA",
                    data: {
                        script: source === 'grok' ? "Video generated via Grok Imagine ✅" : "Video generated via RPA",
                        videoUrl: message.videoUrl
                    }
                });
                toast({
                    title: "🎬 สร้างวิดีโอสำเร็จ!",
                    description: source === 'grok' ? "Grok Imagine สร้างวิดีโอเสร็จแล้ว!" : "VideoFX RPA ทำงานเสร็จสิ้น",
                    className: "bg-green-600 text-white"
                });
                // Trigger TikTok auto-post if enabled
                if (message.videoUrl) handleTikTokAutoPost(message.videoUrl);
            }

            if (message.type === "VIDEO_GENERATION_ERROR") {
                setIsLoading(false);
                setError(message.error);
                toast({
                    title: "❌ เกิดข้อผิดพลาด",
                    description: message.error,
                    variant: "destructive"
                });
            }

            // Handle TikTok granular progress
            if (message.type === "TIKTOK_UPLOAD_PROGRESS") {
                setTiktokPostStatus(prev => {
                    const newSteps = [...prev.steps];
                    while (newSteps.length < message.total) {
                        newSteps.push({ label: '', status: 'pending' });
                    }
                    for (let i = 0; i < message.step - 1; i++) {
                        if (newSteps[i] && newSteps[i].status !== 'error') newSteps[i].status = 'done';
                    }
                    if (message.step > 0 && message.step <= message.total) {
                        newSteps[message.step - 1] = { label: message.label, status: message.status };
                    }
                    return {
                        ...prev,
                        status: message.status === 'error' ? 'error' : (message.step >= message.total && message.status === 'done') ? 'done' : 'posting',
                        step: message.step,
                        total: message.total,
                        label: message.label,
                        steps: newSteps
                    };
                });
            }

            // Handle TikTok caption preview
            if (message.type === "TIKTOK_CAPTION_PREVIEW") {
                setTiktokPostStatus(prev => ({
                    ...prev,
                    status: 'posting',
                    caption: message.caption || '',
                    hashtags: message.hashtags || [],
                    productName: message.productName || '',
                    scheduleTime: message.scheduleTime || '',
                    steps: []
                }));
            }

            // Handle TikTok post results
            if (message.type === "TIKTOK_POST_SUCCESS") {
                setTiktokPostStatus(prev => ({ ...prev, status: 'done', label: '✅ โพสต์สำเร็จ!' }));
                toast({
                    title: "✅ โพสต์ TikTok สำเร็จ!",
                    description: "วิดีโอถูกตั้งเวลาโพสต์ + ปักตะกร้าเรียบร้อย",
                    className: "bg-green-600 text-white"
                });
            }

            if (message.type === "TIKTOK_POST_FAILED") {
                setTiktokPostStatus(prev => ({ ...prev, status: 'error', label: message.error || 'ล้มเหลว' }));
                toast({
                    title: "⚠️ โพสต์ TikTok ไม่สำเร็จ",
                    description: message.error || "เกิดข้อผิดพลาดในการโพสต์",
                    variant: "destructive"
                });
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);
        return () => chrome.runtime.onMessage.removeListener(handleMessage);
    }, [toast]);

    const generate = async (data: any) => {
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const payload = {
                productName: data.productName || "สินค้าทั่วไป",
                productDescription: data.productDescription || "",
                productId: data.productId || "",
                mustUseKeywords: data.mustUseKeywords || "",
                avoidKeywords: data.avoidKeywords || "",
                style: data.saleStyle || "storytelling",
                tone: data.voiceTone || "energetic",
                language: data.language || "th-central",
                template: data.template || "product-review",
                hookText: data.hookText || "",
                ctaText: data.ctaText || "",
                gender: data.gender || "female",
                ageRange: data.ageRange || "young-adult",
                personality: data.personality || "cheerful",
                background: data.background || "studio",
                expression: data.expression || "happy",
                movement: data.movement || "minimal",
                aspectRatio: data.aspectRatio || "9:16",
                videoDuration: data.videoDuration || "short",
                userImage: data.userImage || undefined,
                characterImage: data.characterImage || undefined,
                prompt: data.aiPrompt || "",
                loopCount: data.loopCount || 1,
                concatenate: data.concatenate || false
            };

            console.log("📤 Sending payload to workflow:", payload);

            const serviceResult = await runFullWorkflow(payload);

            const response = {
                success: true,
                message: "Generated via Gemini Service",
                data: {
                    script: serviceResult.script,
                    videoUrl: serviceResult.videoUrl,
                    audioUrl: serviceResult.audioUrl,
                    generatedPrompt: serviceResult.generatedPrompt,
                    imageUrl: serviceResult.imageUrl
                }
            };

            if (serviceResult.videoUrl) {
                toast({
                    title: "สร้างวิดีโอสำเร็จ! 🎉",
                    description: "วิดีโอถูกสร้างเรียบร้อยแล้ว",
                    className: "toast-theme-bg"
                });
            }

            setResult(response);
            return response;

        } catch (err: any) {
            const errorMessage = err.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับระบบ AI";
            setError(errorMessage);
            toast({
                title: "เกิดข้อผิดพลาด",
                description: errorMessage,
                variant: "destructive",
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const downloadVideo = () => {
        if (result?.data?.videoUrl) {
            const link = document.createElement('a');
            link.href = result.data.videoUrl;
            link.download = `netflow-video-${Date.now()}.mp4`;
            link.target = "_blank";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: "เริ่มการดาวน์โหลด",
                description: "กำลังบันทึกวิดีโอลงในเครื่องของคุณ",
            });
        } else {
            toast({
                title: "ไม่พบวิดีโอ",
                description: "โปรดสร้างวิดีโอก่อนทำการบันทึก",
                variant: "destructive",
            });
        }
    };

    return {
        generate,
        isLoading,
        error,
        result,
        downloadVideo,
        tiktokPostStatus,
    };
};
