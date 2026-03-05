import { useState } from "react";
import { runFullWorkflow } from "../services/geminiService";
import { VideoGenerationResponse } from "../types/netflow";
import { useToast } from "./use-toast";

export const useVideoGeneration = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<VideoGenerationResponse | null>(null);
    const { toast } = useToast();

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
    };
};
