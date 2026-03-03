import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Settings, Maximize2, Sparkles, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "./SectionHeader";
import { GenerationSettingsSectionProps } from "./types";
import { languageOptions } from "@/types/netflow";
import { getApiKey } from "@/services/storageService";
import { GoogleGenerativeAI } from "@google/generative-ai";

const parseSceneScripts = (prompt: string, count: number) => {
    const parts = prompt
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    return Array.from({ length: count }, (_, i) => parts[i] || "");
};

const GenerationSettingsSection = ({
    register,
    control,
    setValue,
    watch,
    isOpen,
    onToggle,
    productImages
}: GenerationSettingsSectionProps) => {
    const sceneCount = (watch("sceneCount") || 1) as 1 | 2 | 3;
    const clipDuration = watch("clipDuration") || 8;
    const aiPrompt = watch("aiPrompt") || "";
    const language = watch("language") || "th-central";
    const productName = watch("productName") || "";
    const saleStyle = watch("saleStyle") || "hard";

    const [sceneScripts, setSceneScripts] = useState<string[]>(() =>
        parseSceneScripts(aiPrompt, sceneCount)
    );
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setSceneScripts(parseSceneScripts(aiPrompt, sceneCount));
    }, [aiPrompt, sceneCount]);

    const onChangeSceneScript = (index: number, value: string) => {
        setSceneScripts((prev) => {
            const next = [...prev];
            next[index] = value;
            setValue("aiPrompt", next.join("\n\n"));
            return next;
        });
    };

    const generateScriptsWithAI = async () => {
        const provider = (localStorage.getItem("netflow_ai_provider") as 'openai' | 'gemini') || 'openai';
        const apiKey = await getApiKey(provider);

        if (!apiKey) {
            alert(`กรุณาใส่ ${provider === 'gemini' ? 'Gemini' : 'OpenAI'} API Key ในหน้าตั้งค่าก่อน`);
            return;
        }

        if (!productName && !productImages[0]) {
            alert("กรุณากรอกชื่อสินค้าหรืออัปโหลดรูปสินค้าก่อน");
            return;
        }

        setIsGenerating(true);

        try {
            const langLabel = languageOptions.find(l => l.value === language)?.label || "ไทย";
            const styleLabel = saleStyle === "hard" ? "ดุดัน กระตุ้นซื้อ" : saleStyle === "soft" ? "นุ่มนวล" : "สมดุล";

            // Scene structure based on count
            let sceneStructure = "";
            if (sceneCount === 1) {
                sceneStructure = `ฉาก 1 (HOOK + CTA): เปิดเรื่อง + สรุปและกระตุ้นซื้อ`;
            } else if (sceneCount === 2) {
                sceneStructure = `ฉาก 1 (HOOK): เปิดเรื่อง ดึงความสนใจ หยุดนิ้ว
ฉาก 2 (DEMO + CTA): โชว์การใช้งาน + สรุปและกระตุ้นซื้อ`;
            } else {
                sceneStructure = `ฉาก 1 (HOOK): เปิดเรื่อง ดึงความสนใจ หยุดนิ้ว
ฉาก 2 (DEMO): โชว์การใช้งาน/คุณสมบัติหลัก
ฉาก 3 (CTA): สรุปและกระตุ้นซื้อ เรียกร้องให้ทำอะไร`;
            }

            const systemPrompt = "คุณเป็นนักเขียนสคริปต์โฆษณาวิดีโอสั้นมืออาชีพ เขียนสคริปต์ที่กระชับ น่าสนใจ และเหมาะกับ TikTok/Reels";
            const userPrompt = `สร้างสคริปต์โฆษณาสินค้าสำหรับวิดีโอสั้น TikTok/Reels ที่ต่อเนื่องกันเหมือนคลิปเดียว!

📦 ข้อมูลสินค้า:
- ชื่อสินค้า: ${productName || "สินค้าจากรูป"}
- ภาษา: ${langLabel}
- สไตล์การขาย: ${styleLabel}

🎬 โครงสร้างโฆษณา (${sceneCount} ฉาก รวม ${clipDuration} วินาที):
${sceneStructure}

📝 กฎสำคัญ:
1. ทุกฉากต้องต่อเนื่องกันราวกับตัดมาจากคลิปเดียว - ห้ามเริ่มใหม่ในแต่ละฉาก
2. เสียงพากย์/น้ำเสียงเดียวกันตลอด (คนเดียวพูด)
3. พูดถึงชื่อสินค้าอย่างน้อย 1 ครั้งต่อฉาก
4. แต่ละฉาก 20-30 คำ (พูดได้ใน 8 วินาที)
5. ใช้ภาษาพูดธรรมชาติ ไม่เป็นทางการเกินไป
6. ฉากสุดท้ายต้องมี Call-to-Action ชัดเจน

🔗 ตัวอย่าง Story Flow:
ฉาก 1: "เคยมีปัญหา...ไหม? วันนี้เจอ ${productName || 'ตัวนี้'} ต้องบอกเลย!"
ฉาก 2: "ดูนะ ใช้แบบนี้เลย... เห็นไหมว่ามันง่ายมาก และผลลัพธ์ก็..."
ฉาก 3: "สรุปเลย ตัวนี้ปังมาก! ใครสนใจกดลิงก์ด้านล่างได้เลย รีบๆ นะ!"

รูปแบบการตอบ (ตอบเฉพาะสคริปต์ ไม่ต้องมีคำอธิบาย):
ฉาก 1: [สคริปต์]
${sceneCount >= 2 ? "ฉาก 2: [สคริปต์]" : ""}
${sceneCount === 3 ? "ฉาก 3: [สคริปต์]" : ""}`;

            let content = "";

            if (provider === 'gemini') {
                // === Gemini path ===
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
                content = result.response.text();
            } else {
                // === OpenAI path ===
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-4o-mini",
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userPrompt }
                        ],
                        max_tokens: 500,
                        temperature: 0.7
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || "API Error");
                }

                const data = await response.json();
                content = data.choices[0]?.message?.content || "";
            }

            const scenes = content
                .split(/ฉาก\s*\d+\s*[:\-]?\s*/i)
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0);

            const newScripts = Array.from({ length: sceneCount }, (_, i) => scenes[i] || "");
            setSceneScripts(newScripts);
            setValue("aiPrompt", newScripts.join("\n\n"));

        } catch (error: any) {
            console.error("AI Generation Error:", error);
            alert("เกิดข้อผิดพลาด: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section className="glass-card overflow-hidden">
            <div className="px-4 pt-3">
                <SectionHeader
                    icon={Settings}
                    title="การตั้งค่าการสร้าง"
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            </div>

            {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Duration Dropdown */}
                    <div>
                        <label className="text-sm text-foreground mb-2 block font-medium">
                            ระยะเวลา
                        </label>
                        <select
                            value={clipDuration}
                            onChange={(e) => {
                                const duration = Number(e.target.value) as 8 | 16 | 24;
                                setValue("clipDuration", duration);
                                setValue("sceneCount", (duration / 8) as 1 | 2 | 3);
                            }}
                            className="w-full neon-select text-sm py-3"
                        >
                            {[8, 16, 24].map((duration) => (
                                <option key={duration} value={duration}>
                                    {duration} วินาที ({duration / 8} ฉาก)
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-muted-foreground mt-2">
                            เลือกระยะเวลา - กล่องสคริปต์ฉากจะอัปเดตโดยอัตโนมัติ
                        </p>
                    </div>

                    {/* Script Language */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-foreground font-medium whitespace-nowrap">
                            สคริปต์
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setValue("language", e.target.value as any)}
                            className="flex-1 neon-select text-sm py-3"
                        >
                            {languageOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <Maximize2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Analyze with AI Button */}
                    <button
                        type="button"
                        onClick={generateScriptsWithAI}
                        disabled={isGenerating}
                        className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-neon-red hover:bg-neon-red/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-neon-red/25 hover:shadow-neon-red/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                กำลังสร้างสคริปต์...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" />
                                วิเคราะห์ด้วย AI
                            </>
                        )}
                    </button>

                    {/* Scene Cards */}
                    <div className="space-y-3">
                        <input type="hidden" {...register("aiPrompt")} />
                        {Array.from({ length: sceneCount }, (_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-neon-red/20 bg-card/50 p-4 space-y-3 hover:border-neon-red/40 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-neon-red/20 text-neon-red flex items-center justify-center text-sm font-bold">
                                        {i + 1}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        ฉาก {i + 1}
                                    </span>
                                </div>
                                <textarea
                                    value={sceneScripts[i] || ""}
                                    onChange={(e) => onChangeSceneScript(i, e.target.value)}
                                    placeholder="ใส่สคริปต์สำหรับฉากนี้..."
                                    rows={3}
                                    className="w-full neon-textarea text-sm resize-none focus:ring-1 focus:ring-neon-red/50"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Smart Loop */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                        <span className="text-xs font-medium">โหมดวนซ้ำใช้วิดีโอเดิม (Smart Loop)</span>
                        <Controller
                            name="smartLoop"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-neon-red"
                                />
                            )}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default GenerationSettingsSection;
