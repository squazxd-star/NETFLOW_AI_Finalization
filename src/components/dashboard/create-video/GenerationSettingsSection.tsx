import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Settings, Maximize2, Sparkles, Loader2, Zap, ChevronDown, Film, Clock, Star, Monitor, Smartphone } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "./SectionHeader";
import { GenerationSettingsSectionProps } from "./types";
import { useTheme } from "@/contexts/ThemeContext";
import { languageOptions, templateOptions, saleStyleOptions } from "@/types/netflow";
import { getApiKey } from "@/services/storageService";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ── Inline SVG brand logos ── */
const VeoLogo = ({ className = "w-5 h-5", active = false }: { className?: string; active?: boolean }) => {
    const color = active ? "#ffffff" : "#9e9e9e";
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} opacity={active ? 1 : 0.6}>
            {/* Flask / Erlenmeyer beaker — Veo logo */}
            <path
                d="M9 2 h6 v0.5 h-1 v5.5 l4.5 9 c0.6 1.2 -0.2 2.5 -1.5 2.5 H7 c-1.3 0 -2.1 -1.3 -1.5 -2.5 L10 8 V2.5 H9 Z"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            {/* Liquid fill inside flask */}
            <path
                d="M7.5 16.5 c1.5 -1.5 5.5 -1.5 9 0 L18.5 17 c0.6 1.2 -0.2 2.5 -1.5 2.5 H7 c-1.3 0 -2.1 -1.3 -1.5 -2.5 Z"
                fill={active ? color : "#666"}
                opacity={active ? 0.9 : 0.4}
            />
        </svg>
    );
};

const GrokLogo = ({ className = "w-5 h-5", active = false }: { className?: string; active?: boolean }) => {
    const color = active ? "#ffffff" : "#9e9e9e";
    return (
        <svg viewBox="0 0 256 256" fill="none" className={className} opacity={active ? 1 : 0.6}>
            <path
                d="M200 56 A 90 90 0 1 0 190 190"
                stroke={color}
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
            />
            <line
                x1="205"
                y1="28"
                x2="75"
                y2="228"
                stroke={color}
                strokeWidth="22"
                strokeLinecap="round"
            />
        </svg>
    );
};

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
    const { config: themeConfig } = useTheme();
    const sceneCount = (watch("sceneCount") || 2) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    const sceneScriptsRaw = watch("sceneScriptsRaw") || "";
    const language = watch("language") || "th-central";
    const productName = watch("productName") || "";
    const saleStyle = watch("saleStyle") || "hard";
    const template = watch("template") || "product-review";
    const voiceTone = watch("voiceTone") || "friendly";
    const hookEnabled = watch("hookEnabled");
    const ctaEnabled = watch("ctaEnabled");
    const hookText = watch("hookText") || "";
    const ctaText = watch("ctaText") || "";
    const mustUseKeywords = watch("mustUseKeywords") || "";
    const avoidKeywords = watch("avoidKeywords") || "";

    const [sceneScripts, setSceneScripts] = useState<string[]>(() =>
        parseSceneScripts(sceneScriptsRaw, sceneCount)
    );
    const [isGenerating, setIsGenerating] = useState(false);
    const [starSpin, setStarSpin] = useState(false);
    const [sceneDropdownOpen, setSceneDropdownOpen] = useState(false);

    useEffect(() => {
        setSceneScripts(parseSceneScripts(sceneScriptsRaw, sceneCount));
    }, [sceneScriptsRaw, sceneCount]);

    const onChangeSceneScript = (index: number, value: string) => {
        setSceneScripts((prev) => {
            const next = [...prev];
            next[index] = value;
            setValue("sceneScriptsRaw", next.join("\n\n"));
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
            // ══════════════════════════════════════════════════
            // Step 1: Search real product info
            // ══════════════════════════════════════════════════
            const { searchProductInfo, formatProductInfoForPrompt } = await import("@/services/productSearchService");
            let productDataText = "";
            let productInfo: any = null;
            try {
                console.log("🔍 Searching real product info for:", productName);
                productInfo = await searchProductInfo(productName, productImage);
                if (productInfo) {
                    productDataText = formatProductInfoForPrompt(productInfo);
                    setValue("cachedProductInfo", JSON.stringify(productInfo));
                    console.log("✅ Product info found:", productInfo.keyFeatures?.length, "features");
                }
            } catch (searchErr) {
                console.warn("🔍 Product search failed (continuing without real data):", searchErr);
            }

            // ══════════════════════════════════════════════════
            // Step 2: Build the enhanced prompt
            // ══════════════════════════════════════════════════
            const langLabel = languageOptions.find(l => l.value === language)?.label || "ไทย";
            const templateInfo = templateOptions.find(t => t.value === template);
            const templateLabel = templateInfo?.label || "รีวิวสินค้า";
            const templateDesc = templateInfo?.description || "";
            const saleStyleLabel = saleStyleOptions.find(s => s.value === saleStyle)?.label || "สูงมาก";

            const toneMap: Record<string, string> = {
                energetic: "กระตือรือร้น ตื่นเต้น พูดเร็ว มีพลัง",
                calm: "สงบ นุ่มนวล พูดช้า ชัดถ้อยชัดคำ",
                friendly: "เป็นกันเอง อบอุ่น พูดเหมือนเพื่อน",
                professional: "มืออาชีพ น่าเชื่อถือ พูดชัดเจน มั่นใจ",
                cute: "น่ารัก สดใส พูดเสียงหวาน ร่าเริง"
            };
            const toneLabel = toneMap[voiceTone] || toneMap.friendly;

            // Template-specific scene structures
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

            // Build smart scene structure for 4+ scenes
            let sceneStructure = "";
            const middleSceneIdeas = [
                "เจาะลึกจุดเด่น/ฟีเจอร์สำคัญ (ใช้ข้อมูลจริง)",
                "โชว์การใช้งานจริง/สาธิตฟังก์ชัน",
                "เจาะรายละเอียดสเปค/คุณสมบัติเด่น",
                "โชว์อุปกรณ์เสริม/ของในกล่อง",
                "เปรียบเทียบกับรุ่นก่อน/ตัวเลือกอื่น",
                "เล่าประสบการณ์ใช้จริง/ผลลัพธ์",
                "ตอบข้อสงสัย/สิ่งที่ต้องรู้ก่อนซื้อ",
                "สรุปข้อดี-ข้อเสีย ตรงไปตรงมา",
            ];

            if (sceneCount === 1) {
                sceneStructure = `ฉาก 1 (HOOK + CTA): ${guide.s1} รวมกับ ${guide.s3}`;
            } else if (sceneCount === 2) {
                sceneStructure = `ฉาก 1: ${guide.s1}\nฉาก 2: ${guide.s2} + ${guide.s3}`;
            } else if (sceneCount === 3) {
                sceneStructure = `ฉาก 1: ${guide.s1}\nฉาก 2: ${guide.s2}\nฉาก 3: ${guide.s3}`;
            } else {
                const lines = [`ฉาก 1: ${guide.s1}`, `ฉาก 2: ${guide.s2}`];
                for (let i = 3; i <= sceneCount - 1; i++) {
                    lines.push(`ฉาก ${i}: ${middleSceneIdeas[(i - 3) % middleSceneIdeas.length]}`);
                }
                lines.push(`ฉาก ${sceneCount}: ${guide.s3}`);
                sceneStructure = lines.join("\n");
            }

            // Randomized creative direction for variety
            const creativeStyles = [
                "เขียนแบบเพื่อนเล่าให้ฟัง เหมือนกำลัง Facetime กัน",
                "เขียนแบบ storytelling เล่าเรื่องสั้นๆ มี plot twist",
                "เขียนแบบ POV คนใช้จริง แชร์ประสบการณ์ตรง",
                "เขียนแบบคนรีวิวมืออาชีพ ให้ข้อมูลจริงจัง แต่ไม่น่าเบื่อ",
                "เขียนแบบคนเจอของดีแล้วตื่นเต้นมาก อยากบอกต่อ",
                "เขียนแบบถาม-ตอบตัวเอง สร้างความอยากรู้อยากเห็น"
            ];
            const randomStyle = creativeStyles[Math.floor(Math.random() * creativeStyles.length)];

            // Calculate target word count per scene (balanced distribution)
            const targetWordsPerScene = 14; // center of 10-18 range
            const minWords = 10;
            const maxWords = 18;

            const systemPrompt = `คุณเป็นนักเขียนสคริปต์โฆษณาวิดีโอสั้นระดับมืออาชีพ เชี่ยวชาญ TikTok/Reels/Shorts
คุณเข้าใจจังหวะการพูด: แต่ละฉาก 8 วินาที = ประมาณ ${minWords}-${maxWords} คำไทย (พูดช้าๆ สบายๆ ไม่รีบ ไม่เร็วเกินไป)
สไตล์: ${randomStyle}

กฎสำคัญที่สุด:
1. ข้อมูลสินค้าต้องเป็นข้อเท็จจริง 100% — ห้ามแต่งสเปค ห้ามเดาข้อมูล
2. ทุกฉากต้องมีจำนวนคำใกล้เคียงกัน (${minWords}-${maxWords} คำ) — ห้ามมีฉากที่สั้นเกินไปหรือยาวเกินไป
3. สคริปต์ต้องต่อเนื่องเหมือนคนเดียวพูดตลอดคลิป เรียงลำดับเรื่องราวอย่างมีเหตุผล
4. แต่ละฉากต้องมี videoAction คือคำอธิบายสิ่งที่ตัวละครทำในวิดีโอให้ตรงกับคำพูด`;

            let productContext = `ชื่อสินค้า: ${productName || "สินค้าจากรูป"}`;
            if (productImage) {
                productContext += "\n(มีรูปสินค้าแนบมา — ให้ดูรูปประกอบ)";
            }

            // Include real product data if available
            const realDataSection = productDataText
                ? `\n\n🔍 ข้อมูลจริงของสินค้า (จาก Internet Search — ใช้ข้อมูลนี้เขียนสคริปต์):\n${productDataText}\n\n⚠️ สำคัญมาก: ใช้ข้อมูลจริงข้างบนในสคริปต์ ห้ามแต่งข้อมูลเอง เช่น ถ้าสินค้ามีพอร์ต USB-A ห้ามเขียนว่า USB-C`
                : `\n\n⚠️ ไม่พบข้อมูลสินค้าจากอินเทอร์เน็ต — ให้เขียนสคริปต์แบบทั่วไปที่เน้นอารมณ์/ความรู้สึก โดยไม่ระบุสเปคที่ไม่แน่ใจ`;

            const userPrompt = `สร้างสคริปต์รีวิวสินค้าสำหรับวิดีโอสั้น!

📦 สินค้า:
${productContext}${realDataSection}

🎭 รูปแบบ: ${templateLabel} — ${templateDesc}
🎤 น้ำเสียง: ${toneLabel}
💰 สไตล์การขาย: ${saleStyleLabel}
🌍 ภาษา: ${langLabel}

🎬 โครงสร้าง (${sceneCount} ฉาก, ฉากละ 8 วินาที, รวม ${sceneCount * 8} วินาที):
${sceneStructure}
${hookEnabled && hookText.trim() ? `\n🪝 ประโยคเปิด (Hook) ที่ต้องใช้ในฉากแรก: "${hookText.trim()}"` : ''}
${ctaEnabled && ctaText.trim() ? `\n🎯 ประโยคปิด (CTA) ที่ต้องใช้ในฉากสุดท้าย: "${ctaText.trim()}"` : ''}
${mustUseKeywords.trim() ? `\n🔑 คำสำคัญที่ต้องใส่: ${mustUseKeywords.trim()}` : ''}
${avoidKeywords.trim() ? `\n🚫 คำที่ห้ามใช้: ${avoidKeywords.trim()}` : ''}

📋 กฎเหล็ก:
1. ทุกฉากต้องมี ${minWords}-${maxWords} คำไทย (เฉลี่ยประมาณ ${targetWordsPerScene} คำ) — กระจายจำนวนคำให้สม่ำเสมอทุกฉาก ห้ามมีฉากไหนสั้นจนว่างเปล่า
2. เสียงพากย์ต่อเนื่อง เรียงลำดับเรื่องราวอย่างมีเหตุผล เหมือนโฆษณาจริง:
   - ฉากแรก: ดึงความสนใจ/ตั้งคำถาม
   - ฉากกลาง: รีวิวจุดเด่น+สาธิต (แต่ละฉากพูดเรื่องต่างกัน ไม่ซ้ำ)
   - ฉากสุดท้าย: สรุป+ชวนซื้อ
3. ข้อมูลต้องถูกต้อง — ถ้ามีข้อมูลจริงให้ใช้ ถ้าไม่มีห้ามเดา
4. ใช้ภาษาพูดธรรมชาติ เหมือนคนจริงพูด
5. ห้ามใช้ emoji ในสคริปต์
6. ห้ามเขียนคำอธิบาย/หมายเหตุ

🎥 videoAction คือคำอธิบายภาษาอังกฤษสั้นๆ (10-25 คำ) บอกว่าตัวละครทำอะไรในฉากนั้นให้ตรงกับคำพูด

⚠️ กฎ videoAction ที่ต้องปฏิบัติอย่างเคร่งครัด:
- ต้องเป็นการกระทำทางกายภาพที่เป็นไปได้จริง (physical action) เช่น หยิบ ยก ชี้ เปิด ปิด กด โชว์
- ต้องสอดคล้องกับสิ่งที่พูดโดยตรง: ถ้าพูดเรื่องพอร์ต → ชี้พอร์ต, ถ้าพูดเรื่องน้ำหนัก → ยกให้ดู, ถ้าพูดเรื่ออุปกรณ์เสริม → หยิบของจากกล่อง
- ห้ามมี action ที่เป็นไปไม่ได้ทางกายภาพ เช่น ซูมเข้าไปในชิปข้างในเครื่อง, แสดงโลโก้ที่ไม่มีบนจอ
- ถ้าสคริปต์พูดเรื่องสเปคภายใน (เช่น ชิป, แรม, แบต) → ให้ใช้ action แบบสาธิตประสิทธิภาพแทน เช่น เปิดแอปหนักๆ, แสดงความเร็ว, ใช้งานได้นาน
- ทุก action ต้องมีตัวละคร (Character) เป็นผู้ทำ + มีสินค้าเป็นวัตถุ

ตัวอย่าง:
- พูด "มีสายชาร์จแถมมาให้" → "Character picks up the charging cable from the box and shows it to camera"
- พูด "หน้าจอคมชัดมาก" → "Character tilts the screen toward camera, showing the vivid display"
- พูด "ชิป M5 แรงมาก" → "Character opens multiple heavy apps rapidly, showing smooth instant performance"
- พูด "แบตอึด 18 ชั่วโมง" → "Character unplugs the charger and continues working, showing full battery icon"
- พูด "น้ำหนักเบา" → "Character lifts the product with one hand effortlessly, puts it into a bag"

✍️ ตอบตามรูปแบบนี้เท่านั้น (แยก script กับ videoAction ด้วย | ):
${Array.from({ length: sceneCount }, (_, i) => `ฉาก ${i + 1}: [คำพูด ${minWords}-${maxWords} คำ] | [videoAction ภาษาอังกฤษ]`).join("\n")}`;

            // ══════════════════════════════════════════════════
            // Step 3: Call AI
            // ══════════════════════════════════════════════════
            let content = "";

            if (provider === 'gemini') {
                const genAI = new GoogleGenerativeAI(apiKey);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

                if (productImage) {
                    const base64Data = productImage.includes(',') ? productImage.split(',')[1] : productImage;
                    const mimeType = productImage.includes('png') ? 'image/png' : 'image/jpeg';
                    const result = await model.generateContent([
                        `${systemPrompt}\n\n${userPrompt}\n\nดูรูปสินค้านี้แล้วเขียนสคริปต์ให้เข้ากับลักษณะสินค้าจริงๆ ใช้ข้อมูลจริงเท่านั้น`,
                        { inlineData: { data: base64Data, mimeType } }
                    ]);
                    content = result.response.text();
                } else {
                    const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
                    content = result.response.text();
                }
            } else {
                const messages: any[] = [
                    { role: "system", content: systemPrompt }
                ];

                if (productImage) {
                    messages.push({
                        role: "user",
                        content: [
                            { type: "text", text: `${userPrompt}\n\nดูรูปสินค้านี้แล้วเขียนสคริปต์ให้เข้ากับลักษณะสินค้าจริงๆ ใช้ข้อมูลจริงเท่านั้น` },
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
                        max_tokens: 1200,
                        temperature: 0.8
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error?.message || "API Error");
                }

                const data = await response.json();
                content = data.choices[0]?.message?.content || "";
            }

            console.log("📝 AI Script Response:", content);

            // ══════════════════════════════════════════════════
            // Step 4: Parse scripts AND video actions
            // ══════════════════════════════════════════════════
            const rawScenes = content
                .split(/ฉาก\s*\d+\s*[:\-]?\s*/i)
                .map((s: string) => s.trim().replace(/^"|"$/g, '').trim())
                .filter((s: string) => s.length > 0);

            const newScripts: string[] = [];
            const newVideoActions: string[] = [];

            for (let i = 0; i < sceneCount; i++) {
                const raw = rawScenes[i] || "";
                // Split by | to separate script from videoAction
                const pipeIdx = raw.indexOf('|');
                if (pipeIdx > 0) {
                    newScripts.push(raw.substring(0, pipeIdx).trim().replace(/^"|"$/g, '').trim());
                    newVideoActions.push(raw.substring(pipeIdx + 1).trim().replace(/^"|"$/g, '').trim());
                } else {
                    newScripts.push(raw.replace(/^"|"$/g, '').trim());
                    newVideoActions.push("");
                }
            }

            // ══════════════════════════════════════════════════
            // Step 5: Validate & fix videoActions that don't match scripts
            // ══════════════════════════════════════════════════
            const scenesToFix: number[] = [];
            for (let i = 0; i < sceneCount; i++) {
                if (!newVideoActions[i] || newVideoActions[i].length < 10) {
                    scenesToFix.push(i);
                }
            }

            // If more than half are empty/bad, skip validation (first gen probably failed format)
            if (scenesToFix.length <= Math.floor(sceneCount / 2)) {
                // Use lightweight AI call to validate + fix remaining scenes
                try {
                    const validationPrompt = `You are a video director. Check if each videoAction physically and logically matches its spoken script.

Rules:
- videoAction must describe a PHYSICAL action the character does ON CAMERA
- It must directly correspond to what is being SAID in the script
- If script talks about internal specs (chip, RAM, battery), action should DEMONSTRATE performance (open heavy apps, show speed, unplug and keep working)
- If script talks about physical features (ports, screen, weight, accessories), action should SHOW them directly
- NEVER zoom into invisible internal components
- NEVER show logos or UI elements that don't exist on the product
- Character must always be the subject performing the action with the product

Here are the scenes:
${newScripts.map((s, i) => `Scene ${i + 1}:\n  Script: "${s}"\n  videoAction: "${newVideoActions[i] || 'MISSING'}"`).join('\n')}

For EACH scene, respond with ONLY:
Scene N: OK
or
Scene N: FIX | [corrected videoAction in English, 10-25 words]

Do not explain. Only output the lines above.`;

                    let validationContent = "";
                    if (provider === 'gemini') {
                        const genAI = new GoogleGenerativeAI(apiKey);
                        const valModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
                        const valResult = await valModel.generateContent(validationPrompt);
                        validationContent = valResult.response.text();
                    } else {
                        const valResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                            method: "POST",
                            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
                            body: JSON.stringify({
                                model: "gpt-4o-mini",
                                messages: [{ role: "user", content: validationPrompt }],
                                max_tokens: 600,
                                temperature: 0.3
                            })
                        });
                        if (valResponse.ok) {
                            const valData = await valResponse.json();
                            validationContent = valData.choices[0]?.message?.content || "";
                        }
                    }

                    console.log("🔍 Validation Response:", validationContent);

                    // Parse fixes
                    const fixLines = validationContent.split('\n').filter(l => l.includes('FIX'));
                    let fixCount = 0;
                    for (const line of fixLines) {
                        const match = line.match(/Scene\s*(\d+)\s*:\s*FIX\s*\|\s*(.+)/i);
                        if (match) {
                            const sceneIdx = parseInt(match[1]) - 1;
                            const fixedAction = match[2].trim().replace(/^"|"$/g, '').trim();
                            if (sceneIdx >= 0 && sceneIdx < sceneCount && fixedAction.length > 10) {
                                console.log(`🔧 Fixed Scene ${sceneIdx + 1}: "${newVideoActions[sceneIdx]}" → "${fixedAction}"`);
                                newVideoActions[sceneIdx] = fixedAction;
                                fixCount++;
                            }
                        }
                    }
                    console.log(`✅ Validation complete: ${fixCount} scenes fixed out of ${sceneCount}`);
                } catch (valError) {
                    console.warn("⚠️ Validation step failed (using original videoActions):", valError);
                }
            }

            setSceneScripts(newScripts);
            setValue("sceneScriptsRaw", newScripts.join("\n\n"));
            setValue("sceneVideoActions", newVideoActions.join("\n\n"));

            console.log("✅ Final Scripts:", newScripts);
            console.log("🎥 Final Video Actions:", newVideoActions);

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
                    {/* Engine Selector — Theme-aware with brand logos */}
                    <div>
                        <label className="text-[11px] text-muted-foreground mb-2 block font-medium text-center tracking-wide">เลือก Engine</label>
                        <div className="grid grid-cols-2 gap-2.5">
                            {([
                                { value: "veo" as const, label: "Veo 3.1", sub: "Google" },
                                { value: "grok" as const, label: "Grok", sub: "xAI" }
                            ]).map((engine) => {
                                const isActive = (watch("videoEngine") || "veo") === engine.value;
                                return (
                                    <button
                                        key={engine.value}
                                        type="button"
                                        onClick={() => setValue("videoEngine", engine.value)}
                                        className={`flex flex-col items-center justify-center gap-1 py-3 px-3 rounded-xl text-xs font-semibold transition-all duration-300 relative overflow-hidden border ${
                                            isActive
                                                ? 'text-white shadow-lg border-transparent'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 border-border bg-muted/30'
                                        }`}
                                        style={isActive ? {
                                            background: `linear-gradient(135deg, ${themeConfig.hex}, ${themeConfig.gradientTo})`,
                                            boxShadow: `0 4px 15px rgba(${themeConfig.hexRgb}, 0.3)`,
                                        } : {}}
                                    >
                                        <div className="w-7 h-7 flex items-center justify-center">
                                            {engine.value === "veo"
                                                ? <VeoLogo className="w-7 h-7" active={isActive} />
                                                : <GrokLogo className="w-6 h-6" active={isActive} />
                                            }
                                        </div>
                                        <div className="flex flex-col items-center leading-tight">
                                            <span className="text-[12px] font-bold tracking-tight">{engine.label}</span>
                                            <span className={`text-[9px] font-normal ${isActive ? 'text-white/60' : 'text-muted-foreground/50'}`}>{engine.sub}</span>
                                        </div>
                                        {engine.value === "veo" && (
                                            <span className={`absolute top-1.5 right-1.5 text-[8px] font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'text-white/90 bg-white/20' : ''}`} style={!isActive ? { color: themeConfig.hex, background: `rgba(${themeConfig.hexRgb}, 0.12)` } : {}}>
                                                แนะนำ
                                            </span>
                                        )}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Veo 3.1 Settings — Theme-aware */}
                    {(watch("videoEngine") || "veo") === "veo" && (
                    <div
                        className="space-y-3.5 p-3.5 rounded-xl border transition-all duration-300 animate-in fade-in slide-in-from-top-1"
                        style={{
                            borderColor: `rgba(${themeConfig.hexRgb}, 0.25)`,
                            background: `linear-gradient(135deg, rgba(${themeConfig.hexRgb}, 0.06) 0%, rgba(${themeConfig.hexRgb}, 0.02) 100%)`,
                        }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <VeoLogo className="w-5 h-5" active />
                            <label className="text-[13px] font-bold tracking-tight" style={{ color: themeConfig.hex }}>
                                Veo 3.1 Settings
                            </label>
                        </div>

                        {/* Orientation */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">ขนาดภาพ</label>
                            <div className="flex gap-2">
                                {([
                                    { value: "horizontal", label: "แนวนอน", Icon: Monitor },
                                    { value: "vertical", label: "แนวตั้ง", Icon: Smartphone }
                                ] as const).map((opt) => {
                                    const isActive = (watch("orientation") || "horizontal") === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setValue("orientation", opt.value)}
                                            className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                                isActive
                                                    ? 'text-white shadow-md'
                                                    : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                                            }`}
                                            style={isActive ? {
                                                background: themeConfig.hex,
                                                boxShadow: `0 2px 10px rgba(${themeConfig.hexRgb}, 0.3)`,
                                            } : {}}
                                        >
                                            <opt.Icon className="w-3.5 h-3.5" />
                                            {opt.label}
                                            {opt.value === "vertical" && (
                                                <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${isActive ? 'text-white/80 bg-white/15' : ''}`} style={!isActive ? { color: themeConfig.hex, background: `rgba(${themeConfig.hexRgb}, 0.12)` } : {}}>
                                                    แนะนำ
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Output Count */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">จำนวนภาพ</label>
                            <div className="flex gap-2">
                                {([1, 2, 3, 4] as const).map((count) => {
                                    const isActive = (watch("outputCount") || 1) === count;
                                    return (
                                        <button
                                            key={count}
                                            type="button"
                                            onClick={() => setValue("outputCount", count)}
                                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                                                isActive
                                                    ? 'text-white shadow-md'
                                                    : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                                            }`}
                                            style={isActive ? {
                                                background: themeConfig.hex,
                                                boxShadow: `0 2px 10px rgba(${themeConfig.hexRgb}, 0.3)`,
                                            } : {}}
                                        >
                                            x{count}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Veo Quality */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">คุณภาพ Veo</label>
                            <div className="flex gap-2">
                                {([
                                    { value: "fast", label: "Fast", sub: "เร็ว", Icon: Zap },
                                    { value: "quality", label: "Quality", sub: "คุณภาพสูง", Icon: Star }
                                ] as const).map((opt) => {
                                    const isActive = (watch("veoQuality") || "fast") === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setValue("veoQuality", opt.value)}
                                            className={`flex-1 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                                isActive
                                                    ? 'text-white shadow-md'
                                                    : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                                            }`}
                                            style={isActive ? {
                                                background: themeConfig.hex,
                                                boxShadow: `0 2px 10px rgba(${themeConfig.hexRgb}, 0.3)`,
                                            } : {}}
                                        >
                                            <opt.Icon className="w-3.5 h-3.5" style={{ color: '#FFD700', filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))' }} />
                                            <div className="flex flex-col items-start leading-none">
                                                <span>{opt.label}</span>
                                                <span className={`text-[8px] font-normal ${isActive ? 'text-white/60' : 'text-muted-foreground/50'}`}>{opt.sub}</span>
                                            </div>
                                            {opt.value === "quality" && (
                                                <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${isActive ? 'text-white/80 bg-white/15' : ''}`} style={!isActive ? { color: themeConfig.hex, background: `rgba(${themeConfig.hexRgb}, 0.12)` } : {}}>
                                                    แนะนำ
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    )}

                    {/* Grok Settings — Theme-aware */}
                    {(watch("videoEngine") || "veo") === "grok" && (
                    <div
                        className="space-y-3.5 p-3.5 rounded-xl border transition-all duration-300 animate-in fade-in slide-in-from-top-1"
                        style={{
                            borderColor: `rgba(${themeConfig.hexRgb}, 0.25)`,
                            background: `linear-gradient(135deg, rgba(${themeConfig.hexRgb}, 0.06) 0%, rgba(${themeConfig.hexRgb}, 0.02) 100%)`,
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <GrokLogo className="w-4 h-4" active />
                            <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: themeConfig.hex }}>
                                Grok Settings
                            </label>
                        </div>

                        {/* Aspect Ratio (Grok) */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">Aspect Ratio</label>
                            <div className="flex gap-1.5">
                                {([
                                    { value: "2:3", w: 10, h: 14 },
                                    { value: "3:2", w: 14, h: 10 },
                                    { value: "1:1", w: 12, h: 12 },
                                    { value: "9:16", w: 9, h: 14 },
                                    { value: "16:9", w: 14, h: 8 },
                                ] as const).map((opt) => {
                                    const isActive = (watch("grokAspectRatio") || "9:16") === opt.value;
                                    return (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => setValue("grokAspectRatio", opt.value)}
                                            className={`flex-1 py-2 rounded-lg text-[10px] font-medium transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                                                isActive
                                                    ? 'text-white shadow-md'
                                                    : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                                            }`}
                                            style={isActive ? {
                                                background: themeConfig.hex,
                                                boxShadow: `0 2px 10px rgba(${themeConfig.hexRgb}, 0.3)`,
                                            } : {}}
                                        >
                                            <div
                                                className="rounded-[2px]"
                                                style={{
                                                    width: opt.w,
                                                    height: opt.h,
                                                    background: isActive ? 'rgba(255,255,255,0.9)' : 'currentColor',
                                                }}
                                            />
                                            <span>{opt.value}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Grok Resolution */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">ความละเอียด</label>
                            <div className="flex gap-2">
                                {([
                                    { value: "480p", label: "480p", sub: "ฟรี", premium: false },
                                    { value: "720p", label: "720p", sub: "HD", premium: true }
                                ] as const).map((opt) => {
                                    const isActive = (watch("grokResolution") || "480p") === opt.value;
                                    return (
                                        <div key={opt.value} className="flex-1 relative group">
                                            <button
                                                type="button"
                                                onClick={() => setValue("grokResolution", opt.value)}
                                                className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                                    isActive
                                                        ? 'text-white shadow-md'
                                                        : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                                                }`}
                                                style={isActive ? {
                                                    background: themeConfig.hex,
                                                    boxShadow: `0 2px 10px rgba(${themeConfig.hexRgb}, 0.3)`,
                                                } : {}}
                                            >
                                                <Film className="w-3.5 h-3.5" style={{ color: '#FFD700', filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))' }} />
                                                <div className="flex flex-col items-start leading-none">
                                                    <span>{opt.label}</span>
                                                    <span className={`text-[8px] font-normal ${isActive ? 'text-white/60' : 'text-muted-foreground/50'}`}>{opt.sub}</span>
                                                </div>
                                                {opt.premium && (
                                                    <span
                                                        className="relative text-[7px] font-extrabold px-1.5 py-0.5 rounded-md text-transparent bg-clip-text"
                                                        style={{
                                                            backgroundImage: 'linear-gradient(135deg, #D4AF37, #FFD700, #F5E6A3, #D4AF37)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            border: '1px solid rgba(212, 175, 55, 0.5)',
                                                            boxShadow: '0 0 8px rgba(212, 175, 55, 0.25), inset 0 0 4px rgba(212, 175, 55, 0.1)',
                                                            letterSpacing: '0.03em',
                                                        }}
                                                    >
                                                        SuperGrok
                                                    </span>
                                                )}
                                            </button>
                                            {opt.premium && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 backdrop-blur-md"
                                                    style={{
                                                        background: 'linear-gradient(145deg, rgba(15,12,8,0.97), rgba(25,20,10,0.97))',
                                                        border: '1px solid rgba(212, 175, 55, 0.35)',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.08)',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-1.5 mb-1.5">
                                                        <span className="text-[10px] font-bold" style={{ background: 'linear-gradient(135deg, #D4AF37, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦ SuperGrok Required</span>
                                                    </div>
                                                    <p className="text-[9px] text-white/60 leading-relaxed">HD 720p ต้องสมัคร <span className="font-semibold text-amber-400/90">SuperGrok</span> ($30/mo) — ถ้าไม่มีจะ fallback เป็น 480p</p>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 transform rotate-45 -mt-1" style={{ background: 'rgba(15,12,8,0.97)', borderRight: '1px solid rgba(212, 175, 55, 0.35)', borderBottom: '1px solid rgba(212, 175, 55, 0.35)' }}></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Grok Duration */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">ความยาววิดีโอ</label>
                            <div className="flex gap-2">
                                {([
                                    { value: "6s", label: "6s", sub: "ฟรี", premium: false },
                                    { value: "10s", label: "10s", sub: "ยาวขึ้น", premium: true }
                                ] as const).map((opt) => {
                                    const isActive = (watch("grokDuration") || "6s") === opt.value;
                                    return (
                                        <div key={opt.value} className="flex-1 relative group">
                                            <button
                                                type="button"
                                                onClick={() => setValue("grokDuration", opt.value)}
                                                className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                                                    isActive
                                                        ? 'text-white shadow-md'
                                                        : 'bg-muted/60 border border-border text-muted-foreground hover:bg-muted'
                                                }`}
                                                style={isActive ? {
                                                    background: themeConfig.hex,
                                                    boxShadow: `0 2px 10px rgba(${themeConfig.hexRgb}, 0.3)`,
                                                } : {}}
                                            >
                                                <Clock className="w-3.5 h-3.5" style={{ color: '#FFD700', filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.5))' }} />
                                                <div className="flex flex-col items-start leading-none">
                                                    <span>{opt.label}</span>
                                                    <span className={`text-[8px] font-normal ${isActive ? 'text-white/60' : 'text-muted-foreground/50'}`}>{opt.sub}</span>
                                                </div>
                                                {opt.premium && (
                                                    <span
                                                        className="relative text-[7px] font-extrabold px-1.5 py-0.5 rounded-md text-transparent bg-clip-text"
                                                        style={{
                                                            backgroundImage: 'linear-gradient(135deg, #D4AF37, #FFD700, #F5E6A3, #D4AF37)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            border: '1px solid rgba(212, 175, 55, 0.5)',
                                                            boxShadow: '0 0 8px rgba(212, 175, 55, 0.25), inset 0 0 4px rgba(212, 175, 55, 0.1)',
                                                            letterSpacing: '0.03em',
                                                        }}
                                                    >
                                                        SuperGrok
                                                    </span>
                                                )}
                                            </button>
                                            {opt.premium && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-xl shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 backdrop-blur-md"
                                                    style={{
                                                        background: 'linear-gradient(145deg, rgba(15,12,8,0.97), rgba(25,20,10,0.97))',
                                                        border: '1px solid rgba(212, 175, 55, 0.35)',
                                                        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.08)',
                                                    }}
                                                >
                                                    <div className="flex items-center gap-1.5 mb-1.5">
                                                        <span className="text-[10px] font-bold" style={{ background: 'linear-gradient(135deg, #D4AF37, #FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>✦ SuperGrok Required</span>
                                                    </div>
                                                    <p className="text-[9px] text-white/60 leading-relaxed">วิดีโอ 10 วินาทีต้องสมัคร <span className="font-semibold text-amber-400/90">SuperGrok</span> ($30/mo) — ถ้าไม่มีจะสร้างได้แค่ 6 วินาที</p>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 transform rotate-45 -mt-1" style={{ background: 'rgba(15,12,8,0.97)', borderRight: '1px solid rgba(212, 175, 55, 0.35)', borderBottom: '1px solid rgba(212, 175, 55, 0.35)' }}></div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    )}

                    {/* Scene Count — Theme-aware Custom Dropdown */}
                    <div className="relative">
                        <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">จำนวนฉาก</label>
                        <button
                            type="button"
                            onClick={() => setSceneDropdownOpen(!sceneDropdownOpen)}
                            className="w-full flex items-center justify-between gap-2 py-3 px-4 rounded-xl border border-border bg-background/80 transition-all duration-200 group"
                            style={{ borderColor: sceneDropdownOpen ? `rgba(${themeConfig.hexRgb}, 0.4)` : undefined }}
                            onMouseEnter={e => { if (!sceneDropdownOpen) e.currentTarget.style.borderColor = `rgba(${themeConfig.hexRgb}, 0.3)`; }}
                            onMouseLeave={e => { if (!sceneDropdownOpen) e.currentTarget.style.borderColor = ''; }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `rgba(${themeConfig.hexRgb}, 0.12)` }}>
                                    <Film className="w-4 h-4" style={{ color: themeConfig.hex }} />
                                </div>
                                <div className="text-left">
                                    <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        {sceneCount} ฉาก
                                        <span className="text-[10px] font-normal text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">
                                            {sceneCount * 8}s
                                        </span>
                                        {sceneCount === 2 && (
                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md animate-pulse" style={{ color: themeConfig.hex, background: `rgba(${themeConfig.hexRgb}, 0.12)` }}>
                                                แนะนำ
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">
                                        {sceneCount === 1 && "Quick Hook — เน้นสั้นกระชับ"}
                                        {sceneCount === 2 && "Hook + Demo — สมดุลที่ดีที่สุด"}
                                        {sceneCount === 3 && "Hook + Demo + CTA — ครบทุกส่วน"}
                                        {sceneCount === 4 && "Story-driven — เล่าเรื่องลึก"}
                                        {sceneCount === 5 && "Full Production — สมบูรณ์แบบ"}
                                        {sceneCount === 6 && "Extended Story — รายละเอียดเพิ่ม"}
                                        {sceneCount === 7 && "Deep Review — ครอบคลุมทุกมุม"}
                                        {sceneCount === 8 && "Mini Series — เนื้อหาเข้มข้น"}
                                        {sceneCount === 9 && "Full Feature — ละเอียดสุด"}
                                        {sceneCount === 10 && "Ultimate — มหากาพย์โฆษณา"}
                                    </div>
                                </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${sceneDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {sceneDropdownOpen && (
                            <div className="absolute z-50 w-full mt-1.5 rounded-xl border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[360px] overflow-y-auto"
                                style={{ borderColor: `rgba(${themeConfig.hexRgb}, 0.2)`, boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 20px rgba(${themeConfig.hexRgb}, 0.08)` }}
                            >
                                {([
                                    { count: 1, label: "1 ฉาก", desc: "Quick Hook — เน้นสั้นกระชับ จบใน 8 วิ", icon: "⚡", badge: null },
                                    { count: 2, label: "2 ฉาก", desc: "Hook + Demo — สมดุลที่ดีที่สุด", icon: "🎯", badge: "แนะนำ" },
                                    { count: 3, label: "3 ฉาก", desc: "Hook + Demo + CTA — ครบทุกส่วน", icon: "🎬", badge: "ยอดนิยม" },
                                    { count: 4, label: "4 ฉาก", desc: "Story-driven — เล่าเรื่องลึกซึ้ง", icon: "📖", badge: null },
                                    { count: 5, label: "5 ฉาก", desc: "Full Production — วิดีโอสมบูรณ์แบบ", icon: "🎥", badge: "PRO" },
                                    { count: 6, label: "6 ฉาก", desc: "Extended Story — เล่าเรื่องยาวขึ้น มีรายละเอียด", icon: "🎞️", badge: null },
                                    { count: 7, label: "7 ฉาก", desc: "Deep Review — รีวิวเชิงลึก ครอบคลุมทุกมุม", icon: "🔍", badge: null },
                                    { count: 8, label: "8 ฉาก", desc: "Mini Series — ซีรีส์สั้น เนื้อหาเข้มข้น", icon: "📺", badge: null },
                                    { count: 9, label: "9 ฉาก", desc: "Full Feature — ครบทุกแง่มุม ละเอียดสุด", icon: "🏆", badge: null },
                                    { count: 10, label: "10 ฉาก", desc: "Ultimate — มหากาพย์โฆษณาเต็มรูปแบบ", icon: "👑", badge: "MAX" },
                                ] as const).map((opt, idx) => {
                                    const isSelected = sceneCount === opt.count;
                                    return (
                                        <button
                                            key={opt.count}
                                            type="button"
                                            onClick={() => {
                                                setValue("sceneCount", opt.count);
                                                setSceneDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                                                idx > 0 ? 'border-t border-border/50' : ''
                                            } ${
                                                isSelected
                                                    ? 'text-foreground'
                                                    : 'text-foreground hover:bg-muted/50'
                                            }`}
                                            style={isSelected ? { background: `rgba(${themeConfig.hexRgb}, 0.1)` } : {}}
                                        >
                                            <span className="text-lg w-7 text-center flex-shrink-0">{opt.icon}</span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-sm font-semibold ${isSelected ? '' : ''}`} style={isSelected ? { color: themeConfig.hex } : {}}>{opt.label}</span>
                                                    <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md">{opt.count * 8}s</span>
                                                    {opt.badge && (
                                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                                                            opt.badge === "แนะนำ" ? '' :
                                                            opt.badge === "ยอดนิยม" ? 'text-amber-400 bg-amber-400/15' :
                                                            opt.badge === "MAX" ? 'text-rose-400 bg-rose-400/15' :
                                                            'text-violet-400 bg-violet-400/15'
                                                        }`}
                                                            style={opt.badge === "แนะนำ" ? { color: themeConfig.hex, background: `rgba(${themeConfig.hexRgb}, 0.15)` } : {}}
                                                        >
                                                            {opt.badge}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-muted-foreground truncate">{opt.desc}</p>
                                            </div>
                                            {isSelected && (
                                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: themeConfig.hex, boxShadow: `0 0 6px rgba(${themeConfig.hexRgb}, 0.6)` }} />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
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
