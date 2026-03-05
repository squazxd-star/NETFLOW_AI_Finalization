import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Settings, Maximize2, Sparkles, Loader2, Zap } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "./SectionHeader";
import { GenerationSettingsSectionProps } from "./types";
import { languageOptions, templateOptions, saleStyleOptions } from "@/types/netflow";
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
    productImage
}: GenerationSettingsSectionProps) => {
    const sceneCount = (watch("sceneCount") || 1) as 1 | 2 | 3;
    const aiPrompt = watch("aiPrompt") || "";
    const language = watch("language") || "th-central";
    const productName = watch("productName") || "";
    const saleStyle = watch("saleStyle") || "hard";
    const template = watch("template") || "product-review";
    const voiceTone = watch("voiceTone") || "friendly";

    const [sceneScripts, setSceneScripts] = useState<string[]>(() =>
        parseSceneScripts(aiPrompt, sceneCount)
    );
    const [isGenerating, setIsGenerating] = useState(false);
    const [starSpin, setStarSpin] = useState(false);

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

        if (!productName && !productImage) {
            alert("กรุณากรอกชื่อสินค้าหรืออัปโหลดรูปสินค้าก่อน");
            return;
        }

        setIsGenerating(true);

        try {
            const langLabel = languageOptions.find(l => l.value === language)?.label || "ไทย";
            const templateInfo = templateOptions.find(t => t.value === template);
            const templateLabel = templateInfo?.label || "รีวิวสินค้า";
            const templateDesc = templateInfo?.description || "";
            const saleStyleLabel = saleStyleOptions.find(s => s.value === saleStyle)?.label || "สูงมาก";

            // Voice tone mapping
            const toneMap: Record<string, string> = {
                energetic: "กระตือรือร้น ตื่นเต้น พูดเร็ว มีพลัง",
                calm: "สงบ นุ่มนวล พูดช้า ชัดถ้อยชัดคำ",
                friendly: "เป็นกันเอง อบอุ่น พูดเหมือนเพื่อน",
                professional: "มืออาชีพ น่าเชื่อถือ พูดชัดเจน มั่นใจ",
                cute: "น่ารัก สดใส พูดเสียงหวาน ร่าเริง"
            };
            const toneLabel = toneMap[voiceTone] || toneMap.friendly;

            // Template-specific scene structures (smarter per content type)
            const templateSceneGuide: Record<string, { s1: string; s2: string; s3: string }> = {
                "product-review": {
                    s1: "HOOK — ดึงความสนใจ ตั้งคำถาม/ปัญหาที่คนเจอ แล้วโชว์สินค้าแบบน่าตื่นเต้น",
                    s2: "DEMO — รีวิวจุดเด่น โชว์การใช้งานจริง บอกข้อดีที่จับต้องได้",
                    s3: "CTA — สรุปความประทับใจ + กระตุ้นให้ซื้อ/กดลิงก์"
                },
                "brainrot-product": {
                    s1: "HOOK — เปิดแบบ viral shock/surprise ดึงคนหยุดเลื่อน",
                    s2: "TWIST — เฉลยสินค้าแบบ plot twist ที่ทำให้อยากได้",
                    s3: "CTA — ปิดแบบ meme/viral + บอกให้กดซื้อ"
                },
                "food-review": {
                    s1: "HOOK — โชว์อาหารน่ากิน ดึงด้วยกลิ่น/สี/ไอน้ำ + reaction ตื่นเต้น",
                    s2: "TASTE — ชิมให้ดู บอกรส/เนื้อสัมผัส/ความพิเศษ",
                    s3: "CTA — สรุปว่าอร่อยแค่ไหน + ชวนไปลอง/สั่ง"
                },
                "fashion-review": {
                    s1: "HOOK — โชว์ลุค/ชุดแบบน่าสนใจ ดึงด้วยสไตล์",
                    s2: "TRY-ON — ลองใส่ให้ดู โชว์ฟิตติ้ง/เนื้อผ้า/ทรง",
                    s3: "CTA — บอกว่าใส่แล้วดีขนาดไหน + ชวนไปดู/ซื้อ"
                },
                "gadget-review": {
                    s1: "HOOK — โชว์ gadget + ตั้งคำถามว่าเจ๋งจริงไหม",
                    s2: "DEMO — เดโมฟีเจอร์เด่น 1-2 อย่าง + ผลลัพธ์จริง",
                    s3: "CTA — สรุปว่าคุ้มไหม + ชวนซื้อ"
                },
                "flash-sale": {
                    s1: "HOOK — ประกาศโปรแรง! ลดราคาช็อค! ดึงด้วยความด่วน",
                    s2: "VALUE — บอกราคาเดิม vs ราคาโปร + คุณสมบัติเด่น",
                    s3: "URGENCY — กระตุ้นรีบซื้อ มีจำกัด หมดเมื่อไหร่ไม่รู้"
                },
                "testimonial": {
                    s1: "HOOK — เล่าปัญหาที่เจอก่อนใช้สินค้า",
                    s2: "STORY — เล่าประสบการณ์หลังใช้ ผลลัพธ์ที่ได้",
                    s3: "CTA — แนะนำให้คนอื่นลองใช้บ้าง"
                },
                "mini-drama": {
                    s1: "SETUP — เปิดฉากด้วยสถานการณ์/ปัญหา ให้คนอยากดูต่อ",
                    s2: "CONFLICT — ปัญหาหนักขึ้น จนกระทั่ง... เจอสินค้า!",
                    s3: "RESOLUTION — สินค้าช่วยแก้ปัญหา + happy ending + CTA"
                }
            };

            const guide = templateSceneGuide[template] || templateSceneGuide["product-review"];

            // Scene structure with template-specific guidance
            let sceneStructure = "";
            if (sceneCount === 1) {
                sceneStructure = `ฉาก 1 (HOOK + CTA): ${guide.s1} รวมกับ ${guide.s3}`;
            } else if (sceneCount === 2) {
                sceneStructure = `ฉาก 1: ${guide.s1}\nฉาก 2: ${guide.s2} + ${guide.s3}`;
            } else {
                sceneStructure = `ฉาก 1: ${guide.s1}\nฉาก 2: ${guide.s2}\nฉาก 3: ${guide.s3}`;
            }

            // Randomized creative direction for variety (pick 1 of 6)
            const creativeStyles = [
                "เขียนแบบเพื่อนเล่าให้ฟัง เหมือนกำลัง Facetime กัน",
                "เขียนแบบ storytelling เล่าเรื่องสั้นๆ มี plot twist",
                "เขียนแบบ POV คนใช้จริง แชร์ประสบการณ์ตรง",
                "เขียนแบบคนรีวิวมืออาชีพ ให้ข้อมูลจริงจัง แต่ไม่น่าเบื่อ",
                "เขียนแบบคนเจอของดีแล้วตื่นเต้นมาก อยากบอกต่อ",
                "เขียนแบบถาม-ตอบตัวเอง สร้างความอยากรู้อยากเห็น"
            ];
            const randomStyle = creativeStyles[Math.floor(Math.random() * creativeStyles.length)];

            const systemPrompt = `คุณเป็นนักเขียนสคริปต์โฆษณาวิดีโอสั้นระดับมืออาชีพ เชี่ยวชาญ TikTok/Reels/Shorts
คุณเข้าใจจังหวะการพูด: แต่ละฉาก 8 วินาที = ประมาณ 15-25 คำไทย (พูดจังหวะปกติ ไม่เร็วเกินไป)
สไตล์: ${randomStyle}`;

            // Build product context (include image analysis if available)
            let productContext = `ชื่อสินค้า: ${productName || "สินค้าจากรูป"}`;
            if (productImage) {
                productContext += "\n(มีรูปสินค้า — ให้เขียนสคริปต์ที่สอดคล้องกับลักษณะสินค้าจากชื่อให้มากที่สุด)";
            }

            const userPrompt = `สร้างสคริปต์ขายสินค้าสำหรับวิดีโอสั้น!

📦 สินค้า:
${productContext}

🎭 รูปแบบ: ${templateLabel} — ${templateDesc}
🎤 น้ำเสียง: ${toneLabel}
💰 สไตล์การขาย: ${saleStyleLabel}
🌍 ภาษา: ${langLabel}

🎬 โครงสร้าง (${sceneCount} ฉาก, ฉากละ 8 วินาที, รวม ${sceneCount * 8} วินาที):
${sceneStructure}

� กฎเหล็ก:
1. แต่ละฉาก 15-25 คำไทยเท่านั้น (พูดได้พอดี 8 วินาที ไม่เร็วเกินไป)
2. เสียงพากย์ต่อเนื่องกัน เหมือนคนเดียวพูดตลอดคลิป
3. พูดถึง "${productName || 'สินค้า'}" อย่างน้อย 1 ครั้งต่อฉาก
4. ใช้ภาษาพูดธรรมชาติ เหมือนคนจริงพูด ไม่เป็นทางการเกินไป
5. ฉากสุดท้ายต้องมีคำชวนซื้อ/กดลิงก์ชัดเจน
6. ห้ามใช้ emoji ในสคริปต์
7. ห้ามเขียนคำอธิบาย ตอบเฉพาะสคริปต์คำพูด

✍️ ตอบตามรูปแบบนี้เท่านั้น:
ฉาก 1: [คำพูด 15-25 คำ]
${sceneCount >= 2 ? "ฉาก 2: [คำพูด 15-25 คำ]" : ""}
${sceneCount === 3 ? "ฉาก 3: [คำพูด 15-25 คำ]" : ""}`;

            let content = "";

            if (provider === 'gemini') {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                if (productImage) {
                    // Vision mode: send product image for smarter analysis
                    const base64Data = productImage.includes(',') ? productImage.split(',')[1] : productImage;
                    const mimeType = productImage.includes('png') ? 'image/png' : 'image/jpeg';
                    const result = await model.generateContent([
                        `${systemPrompt}\n\n${userPrompt}\n\nดูรูปสินค้านี้แล้วเขียนสคริปต์ให้เข้ากับลักษณะสินค้าจริงๆ`,
                        { inlineData: { data: base64Data, mimeType } }
                    ]);
                    content = result.response.text();
                } else {
                    const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
                    content = result.response.text();
                }
            } else {
                // OpenAI path (with optional vision)
                const messages: any[] = [
                    { role: "system", content: systemPrompt }
                ];

                if (productImage) {
                    messages.push({
                        role: "user",
                        content: [
                            { type: "text", text: `${userPrompt}\n\nดูรูปสินค้านี้แล้วเขียนสคริปต์ให้เข้ากับลักษณะสินค้าจริงๆ` },
                            { type: "image_url", image_url: { url: productImage } }
                        ]
                    });
                } else {
                    messages.push({ role: "user", content: userPrompt });
                }

                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: productImage ? "gpt-4o" : "gpt-4o-mini",
                        messages,
                        max_tokens: 500,
                        temperature: 0.9
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || "API Error");
                }

                const data = await response.json();
                content = data.choices[0]?.message?.content || "";
            }

            // Parse scenes from response
            const scenes = content
                .split(/ฉาก\s*\d+\s*[:\-]?\s*/i)
                .map((s: string) => s.trim().replace(/^"|"$/g, '').trim())
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
                    {/* Google Flow Settings */}
                    <div className="space-y-3 p-3 rounded-xl border border-neon-red/20 bg-neon-red/5">
                        <label className="text-xs font-bold text-neon-red flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            Google Flow Settings
                        </label>

                        {/* Orientation */}
                        <div>
                            <label className="text-xs text-muted-foreground mb-1.5 block">ขนาดภาพ</label>
                            <div className="flex gap-2">
                                {([
                                    { value: "horizontal", label: "แนวนอน", icon: "▬" },
                                    { value: "vertical", label: "แนวตั้ง", icon: "▮" }
                                ] as const).map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setValue("orientation", opt.value)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                                            (watch("orientation") || "horizontal") === opt.value
                                                ? 'bg-neon-red text-white shadow-sm shadow-neon-red/25'
                                                : 'bg-muted border border-border text-muted-foreground hover:border-neon-red/30'
                                        }`}
                                    >
                                        {opt.icon} {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Output Count */}
                        <div>
                            <label className="text-xs text-muted-foreground mb-1.5 block">จำนวนภาพ</label>
                            <div className="flex gap-2">
                                {([1, 2, 3, 4] as const).map((count) => (
                                    <button
                                        key={count}
                                        type="button"
                                        onClick={() => setValue("outputCount", count)}
                                        className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                                            (watch("outputCount") || 1) === count
                                                ? 'bg-neon-red text-white shadow-sm shadow-neon-red/25'
                                                : 'bg-muted border border-border text-muted-foreground hover:border-neon-red/30'
                                        }`}
                                    >
                                        x{count}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scene Count */}
                    <div>
                        <label className="text-sm text-foreground mb-2 block font-medium">
                            จำนวนฉาก
                        </label>
                        <div className="flex gap-2">
                            {([1, 2, 3] as const).map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => setValue("sceneCount", count)}
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        sceneCount === count
                                            ? 'bg-neon-red text-white'
                                            : 'bg-muted border border-border text-muted-foreground'
                                    }`}
                                >
                                    {count} ฉาก ({count * 8}s)
                                </button>
                            ))}
                        </div>
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

                    {/* Analyze with AI Button - Galactic Glow */}
                    <button
                        type="button"
                        onClick={() => {
                            setStarSpin(true);
                            setTimeout(() => setStarSpin(false), 600);
                            generateScriptsWithAI();
                        }}
                        disabled={isGenerating}
                        className={`group w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                            isGenerating
                                ? 'bg-neon-red/80 shadow-lg shadow-neon-red/20'
                                : 'ai-btn-shimmer shadow-lg shadow-neon-red/30'
                        }`}
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="relative">
                                    AI กำลังคิดสคริปต์
                                    <span className="inline-flex ml-1 gap-0.5">
                                        <span className="inline-block w-1 h-1 rounded-full bg-white animate-typing-dot-1" />
                                        <span className="inline-block w-1 h-1 rounded-full bg-white animate-typing-dot-2" />
                                        <span className="inline-block w-1 h-1 rounded-full bg-white animate-typing-dot-3" />
                                    </span>
                                </span>
                            </>
                        ) : (
                            <>
                                <Sparkles className={`w-5 h-5 transition-transform duration-500 group-hover:rotate-12 ${
                                    starSpin ? 'animate-star-spin' : ''
                                }`} />
                                <span className="relative z-10">วิเคราะห์ด้วย AI</span>
                            </>
                        )}
                    </button>

                    {/* Scene Cards */}
                    <div className="space-y-3">
                        <input type="hidden" {...register("aiPrompt")} />
                        {Array.from({ length: sceneCount }, (_, i) => (
                            <div
                                key={i}
                                className={`rounded-xl border p-4 space-y-3 transition-all duration-500 ${
                                    isGenerating
                                        ? 'border-neon-red/40 ai-thinking-card animate-border-glow'
                                        : 'border-neon-red/20 bg-card/50 hover:border-neon-red/40'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                                        isGenerating
                                            ? 'bg-neon-red text-white shadow-md shadow-neon-red/40 animate-pulse'
                                            : 'bg-neon-red/20 text-neon-red'
                                    }`}>
                                        {i + 1}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        ฉาก {i + 1}
                                    </span>
                                    {isGenerating && (
                                        <div className="ml-auto flex items-center gap-1.5 text-xs text-neon-red">
                                            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                            <span>AI กำลังคิด</span>
                                            <span className="inline-flex gap-0.5">
                                                <span className="inline-block w-1 h-1 rounded-full bg-neon-red animate-typing-dot-1" />
                                                <span className="inline-block w-1 h-1 rounded-full bg-neon-red animate-typing-dot-2" />
                                                <span className="inline-block w-1 h-1 rounded-full bg-neon-red animate-typing-dot-3" />
                                            </span>
                                        </div>
                                    )}
                                </div>
                                {isGenerating ? (
                                    <div className="w-full rounded-xl px-4 py-3 text-sm bg-input/50 border border-neon-red/10 min-h-[4.5rem] flex items-center">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <div className="h-3 rounded-full bg-neon-red/20 animate-pulse" style={{ width: `${60 + i * 15}%` }} />
                                        </div>
                                    </div>
                                ) : (
                                    <textarea
                                        value={sceneScripts[i] || ""}
                                        onChange={(e) => onChangeSceneScript(i, e.target.value)}
                                        placeholder="ใส่สคริปต์สำหรับฉากนี้..."
                                        rows={3}
                                        className="w-full neon-textarea text-sm resize-none focus:ring-1 focus:ring-neon-red/50"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </section>
    );
};

export default GenerationSettingsSection;
