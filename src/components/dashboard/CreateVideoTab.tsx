import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Play, Loader2, ExternalLink, Wand2 } from "lucide-react";
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

    // UI State
    const [productImages, setProductImages] = useState<(string | null)[]>([null, null]);
    const [aiScriptOpen, setAiScriptOpen] = useState(true);
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

        const userImage = productImages[0] || undefined;

        await generate({
            type: "video-generation",
            ...data,
            userImage,
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

            {/* 2. AI Scripting Section - สคริปต์ AI */}
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
                                    productName: data.productName || "Product",
                                    template: data.template || "product-review",
                                    voiceTone: data.voiceTone || "friendly",
                                    saleStyle: data.saleStyle || "storytelling",
                                    language: data.language || "th-central",
                                    hookText: data.hookEnabled ? data.hookText : "",
                                    ctaText: data.ctaEnabled ? data.ctaText : "",
                                    mustUseKeywords: data.mustUseKeywords || "",
                                    avoidKeywords: data.avoidKeywords || "",
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
                        เปิดหน้างาน (Google Flow)
                    </label>
                    <button
                        type="button"
                        onClick={() => {
                            window.open('https://labs.google/fx/tools/flow', '_blank');
                            setFlowOpened(true);
                        }}
                        className={`w-full py-2 px-4 rounded-lg text-xs font-medium border border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center justify-center gap-2 ${flowOpened ? 'bg-blue-500/10' : ''}`}
                    >
                        <ExternalLink className="w-3 h-3" />
                        {flowOpened ? "เปิดอีกครั้ง (Opened)" : "เปิด Google Flow"}
                    </button>
                </div>

                {/* Step 3: Generate Video */}
                <div className={`space-y-2 transition-opacity duration-200 ${!flowOpened ? 'opacity-50 pointer-events-none' : ''}`}>
                    <label className="text-xs font-medium text-foreground flex items-center gap-2">
                        <span className="bg-neon-red/20 text-neon-red w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span>
                        สั่งทำงาน (Execution)
                    </label>
                    <button
                        onClick={form.handleSubmit(onSubmit)}
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
