/**
 * YouTube Metadata AI Generation Service
 * Generates optimized YouTube Shorts title + description using Gemini + Google Search grounding
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";

export interface YouTubeMetadataResult {
    title: string;
    description: string;
}

/**
 * Detect product category from name (simplified version for YouTube context)
 */
function detectCategory(productName: string): string {
    const lower = productName.toLowerCase();
    const checks: [string[], string][] = [
        [["iphone", "galaxy", "pixel", "redmi", "poco", "มือถือ", "โทรศัพท์", "smartphone"], "สมาร์ทโฟน"],
        [["macbook", "laptop", "โน้ตบุ๊ค", "notebook"], "แล็ปท็อป"],
        [["ipad", "tablet", "แท็บเล็ต"], "แท็บเล็ต"],
        [["airpods", "earbuds", "headphone", "หูฟัง", "ลำโพง", "speaker"], "เครื่องเสียง/หูฟัง"],
        [["camera", "กล้อง", "canon", "nikon", "fujifilm"], "กล้อง"],
        [["เซรั่ม", "serum", "ครีม", "cream", "lotion", "โลชั่น", "skincare", "สกินแคร์"], "สกินแคร์"],
        [["ลิปสติก", "lipstick", "แป้ง", "foundation", "makeup", "เมคอัพ"], "เครื่องสำอาง"],
        [["น้ำหอม", "perfume", "eau de", "edt", "edp", "fragrance"], "น้ำหอม"],
        [["วิตามิน", "vitamin", "อาหารเสริม", "supplement", "collagen"], "อาหารเสริม"],
        [["รองเท้า", "shoe", "sneaker", "สนีกเกอร์", "nike", "adidas"], "รองเท้า"],
        [["กระเป๋า", "bag", "backpack"], "กระเป๋า"],
        [["นาฬิกา", "watch", "smartwatch"], "นาฬิกา"],
        [["อาหาร", "ขนม", "snack", "food"], "อาหาร"],
        [["กาแฟ", "coffee", "ชา", "tea", "เครื่องดื่ม"], "เครื่องดื่ม"],
        [["อาหารแมว", "อาหารหมา", "cat food", "dog food", "whiskas"], "สัตว์เลี้ยง"],
        [["เสื้อ", "กางเกง", "เดรส", "dress", "fashion", "แฟชั่น"], "แฟชั่น"],
        [["gaming", "razer", "logitech", "keyboard", "mouse"], "เกมมิ่ง"],
    ];
    for (const [keywords, cat] of checks) {
        if (keywords.some(k => lower.includes(k))) return cat;
    }
    return "สินค้าทั่วไป";
}

/**
 * Build the prompt for Gemini to generate YouTube Shorts title + description
 */
function buildYouTubeMetadataPrompt(
    productName: string,
    productDescription: string,
    cachedProductInfo: string,
    category: string
): string {
    return `คุณเป็น YouTube Shorts Content Expert ระดับมืออาชีพ — เชี่ยวชาญเรื่อง SEO, Hashtag Strategy, และ Viral Title

## ข้อมูลสินค้า
- ชื่อสินค้า: "${productName}"
- หมวดหมู่: ${category}
${productDescription ? `- รายละเอียด: ${productDescription}` : ""}
${cachedProductInfo ? `- ข้อมูลจากการค้นหา: ${cachedProductInfo.substring(0, 500)}` : ""}

## งาน: สร้าง Title และ Description สำหรับ YouTube Shorts

### กฎสำหรับ Title (ชื่อ):
1. ความยาวรวมไม่เกิน 55 ตัวอักษร (รวม #Shorts ที่ต่อท้าย) เพื่อไม่ให้ถูกตัดในหน้า Feed
2. โครงสร้าง: [Hook ที่กระแทกใจ] + [ชื่อสินค้า/หัวข้อหลัก] + #Shorts
3. **ต้องลงท้ายด้วย #Shorts เสมอ** (ตัว S ใหญ่, พหูพจน์ — ห้ามเขียน #Short)
4. ต้องมีชื่อแบรนด์/สินค้าจริงอยู่ใน title
5. ใช้ 1 ใน 3 สไตล์ต่อไปนี้:
   - **Curiosity**: ตั้งคำถามให้อยากรู้คำตอบ เช่น "M5 แรงไปไหม!? 🔥 MacBook Pro 14 ตัวใหม่ #Shorts"
   - **Benefit**: ชูจุดขายหลัก เช่น "แบตอึด 20 ชม.! 🔋 MacBook Pro M5 คุ้มสุดในปีนี้ #Shorts"
   - **Hype**: ใช้คำสุดโต่ง เช่น "ที่สุดของปี! 😱 MacBook Pro M5 แรงจนน่ากลัว #Shorts"
6. ใส่ Emoji 1 ตัวที่เข้ากับอารมณ์ (🔥😱🤯💥✨💡) เพื่อดึงสายตา
7. ใช้ Emotional Trigger: "ที่สุดของปี", "อย่าเพิ่งซื้อ...", "ความลับที่...ไม่บอก", "คุ้มหรือแพง?"

### กฎสำหรับ Description (คำอธิบาย):
1. **3 บรรทัดแรก (Crucial SEO)**: สรุปความเจ๋งของสินค้าด้วย Keyword ที่คนค้นหา — YouTube ใช้ส่วนนี้จัดหมวดหมู่คลิป
2. **CTA (Call to Action)**: เขียนประโยคชวนคุยเป็นกันเอง เช่น "ใครใช้รุ่นไหนอยู่ คอมเมนต์บอกหน่อย!", "กดซับรอรีวิวตัวต่อไป!"
3. ใช้ emoji ประกอบพอประมาณให้ดูน่าสนใจ (✅🔥💡⭐)
4. **Hashtag Strategy 3 ระดับ** (รวม 6-10 อัน):
   - **System Hashtags** (บังคับ): #Shorts #YouTubeShorts
   - **Category Hashtags**: เช่น #รีวิว #ไอที #Gadget #${category.replace(/\s/g, '')}
   - **Product/Specific Hashtags**: เช่น #${productName.replace(/\s+/g, '')} + ชื่อแบรนด์ + รุ่น
   - ผสม Hashtag ภาษาไทย + อังกฤษ
5. ความยาวรวม description ไม่เกิน 400 ตัวอักษร
6. เขียนเป็นภาษาไทย (ผสมอังกฤษเฉพาะชื่อแบรนด์/คำศัพท์)
7. ห้ามใช้ภาษาบอท — ต้องเป็นกันเองเหมือนเพื่อนป้ายยาเพื่อน

## รูปแบบ Output (JSON เท่านั้น ห้ามมี markdown):
{"title":"...#Shorts","description":"..."}

ตอบเป็น JSON เท่านั้น ห้ามมีข้อความอื่นนอกจาก JSON`;
}

/**
 * Generate YouTube metadata using OpenAI
 */
async function generateWithOpenAI(
    apiKey: string,
    prompt: string,
    productImage?: string | null
): Promise<string> {
    const messages: any[] = [];

    if (productImage) {
        messages.push({
            role: "user",
            content: [
                { type: "text", text: prompt + "\n\n(ดูรูปสินค้าประกอบเพื่อวิเคราะห์ feature เด่นสำหรับ description)" },
                { type: "image_url", image_url: { url: productImage, detail: "low" } }
            ]
        });
    } else {
        messages.push({ role: "user", content: prompt });
    }

    console.log("[YT Metadata] Generating with OpenAI...");
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
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `OpenAI HTTP ${response.status}`);
    }

    const json = await response.json();
    return json.choices?.[0]?.message?.content || "";
}

/**
 * Generate YouTube metadata using Gemini
 */
async function generateWithGemini(
    apiKey: string,
    prompt: string,
    productImage?: string | null
): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try with Google Search grounding first (for trending hashtags + category research)
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            tools: [{ googleSearch: {} } as any],
        });

        const parts: any[] = [prompt];

        if (productImage) {
            const base64Data = productImage.includes(',') ? productImage.split(',')[1] : productImage;
            const mimeType = productImage.includes('png') ? 'image/png' : 'image/jpeg';
            parts.push({ inlineData: { data: base64Data, mimeType } });
            parts[0] = prompt + "\n\n(ดูรูปสินค้าประกอบเพื่อวิเคราะห์ feature เด่นสำหรับ description)";
        }

        console.log("[YT Metadata] Generating with Gemini + Google Search grounding...");
        const result = await model.generateContent(parts);
        return result.response.text();
    } catch (error: any) {
        console.warn("[YT Metadata] Grounding failed, trying without:", error.message);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}

/**
 * Generate YouTube Shorts title + description using AI (OpenAI or Gemini based on user setting)
 */
export async function generateYouTubeMetadata(params: {
    productName: string;
    productDescription?: string;
    productImage?: string | null;
    cachedProductInfo?: string;
}): Promise<YouTubeMetadataResult> {
    const { productName, productDescription, productImage, cachedProductInfo } = params;

    if (!productName?.trim()) {
        throw new Error("กรุณาใส่ชื่อสินค้าก่อน");
    }

    // Check user's AI provider preference
    const provider = (localStorage.getItem("netflow_ai_provider") as 'openai' | 'gemini') || 'openai';
    const apiKey = await getApiKey(provider);
    if (!apiKey) {
        throw new Error(`ไม่พบ ${provider === 'gemini' ? 'Gemini' : 'OpenAI'} API Key — กรุณาตั้งค่าใน Settings`);
    }

    console.log(`[YT Metadata] Using provider: ${provider.toUpperCase()}`);

    const category = detectCategory(productName);
    const prompt = buildYouTubeMetadataPrompt(
        productName,
        productDescription || "",
        cachedProductInfo || "",
        category
    );

    let text = "";
    if (provider === "openai") {
        text = await generateWithOpenAI(apiKey, prompt, productImage);
    } else {
        text = await generateWithGemini(apiKey, prompt, productImage);
    }

    // Parse JSON response
    console.log("[YT Metadata] Raw response:", text.substring(0, 200));

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*?"title"[\s\S]*?"description"[\s\S]*?\}/);
    if (!jsonMatch) {
        throw new Error("AI ตอบกลับในรูปแบบที่ไม่ถูกต้อง");
    }

    try {
        const parsed = JSON.parse(jsonMatch[0]) as YouTubeMetadataResult;

        // Validate + ensure #Shorts suffix in title
        let title = (parsed.title || productName).trim();

        // Fix common AI mistakes: #Short → #Shorts, missing #Shorts
        title = title.replace(/#Short\b(?!s)/gi, '#Shorts');
        if (!title.includes('#Shorts')) {
            title = title.replace(/\s*$/, '') + ' #Shorts';
        }

        // Trim to 60 chars max (keep #Shorts at end)
        if (title.length > 60) {
            const shortsTag = ' #Shorts';
            const maxBody = 60 - shortsTag.length;
            const body = title.replace(/\s*#Shorts\s*$/i, '').substring(0, maxBody).trim();
            title = body + shortsTag;
        }

        // Validate description — ensure #Shorts is in description too
        let description = (parsed.description || "").trim();
        if (!description.includes('#Shorts')) {
            description = description.trim() + '\n#Shorts';
        }
        if (description.length > 500) {
            description = description.substring(0, 500).trim();
        }

        return { title, description };
    } catch (parseErr) {
        console.error("[YT Metadata] JSON parse error:", parseErr);
        throw new Error("ไม่สามารถ parse ผลลัพธ์จาก AI ได้");
    }
}
