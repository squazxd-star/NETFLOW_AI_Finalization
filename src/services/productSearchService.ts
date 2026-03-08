import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";

// ═══════════════════════════════════════════════════════════
// Product Search Service — Real product data lookup via AI
// Uses Gemini with Google Search grounding to find real specs
// ═══════════════════════════════════════════════════════════

export interface ProductInfo {
    /** Short product summary (1-2 sentences) */
    summary: string;
    /** Key features / selling points (array of strings) */
    keyFeatures: string[];
    /** Technical specifications (key-value pairs) */
    specs: Record<string, string>;
    /** Included accessories / what's in the box */
    accessories: string[];
    /** Approximate price range */
    priceRange: string;
    /** Pros for review script */
    pros: string[];
    /** Cons or things to note */
    cons: string[];
    /** Raw search result text (for debugging) */
    rawText: string;
}

const PRODUCT_SEARCH_PROMPT = `คุณเป็นผู้เชี่ยวชาญรีวิวสินค้า ค้นหาข้อมูลจริงของสินค้านี้จากอินเทอร์เน็ต

ชื่อสินค้า: "{PRODUCT_NAME}"

ค้นหาข้อมูลต่อไปนี้ให้ครบถ้วนและถูกต้อง:

1. สรุปสินค้าสั้นๆ (1-2 ประโยค)
2. จุดเด่น/ฟีเจอร์สำคัญ (อย่างน้อย 5 ข้อ — ข้อมูลจริงเท่านั้น)
3. สเปคทางเทคนิค (เช่น ขนาด น้ำหนัก วัสดุ ส่วนประกอบ ความจุ ฯลฯ)
4. อุปกรณ์เสริม/ของแถมในกล่อง
5. ช่วงราคาโดยประมาณ (บาท)
6. ข้อดี (สำหรับเขียนรีวิว)
7. ข้อควรรู้/ข้อเสีย

⚠️ กฎสำคัญ:
- ข้อมูลต้องเป็นข้อเท็จจริง ห้ามแต่งขึ้นเอง
- ถ้าไม่แน่ใจ ให้บอกว่า "ไม่พบข้อมูล" แทนการเดา
- ตอบเป็น JSON เท่านั้น ไม่ต้องมี markdown

ตอบในรูปแบบ JSON:
{
  "summary": "...",
  "keyFeatures": ["...", "..."],
  "specs": {"key": "value"},
  "accessories": ["...", "..."],
  "priceRange": "...",
  "pros": ["...", "..."],
  "cons": ["...", "..."]
}`;

/**
 * Search for real product information using Gemini with Google Search grounding.
 * Falls back to Gemini without grounding if search tool is unavailable.
 */
export async function searchProductInfo(
    productName: string,
    productImage?: string | null
): Promise<ProductInfo | null> {
    if (!productName?.trim()) return null;

    const provider = (localStorage.getItem("netflow_ai_provider") as 'openai' | 'gemini') || 'openai';

    try {
        if (provider === 'gemini') {
            return await searchWithGemini(productName, productImage);
        } else {
            return await searchWithOpenAI(productName, productImage);
        }
    } catch (error) {
        console.warn("🔍 Product search failed, trying fallback...", error);
        try {
            // Fallback: try Gemini without grounding
            return await searchWithGeminiFallback(productName);
        } catch (fallbackError) {
            console.error("🔍 All product search methods failed:", fallbackError);
            return null;
        }
    }
}

/**
 * Search using Gemini with Google Search grounding (preferred method)
 */
async function searchWithGemini(
    productName: string,
    productImage?: string | null
): Promise<ProductInfo | null> {
    const apiKey = await getApiKey('gemini');
    if (!apiKey) throw new Error("Gemini API Key not found");

    const genAI = new GoogleGenerativeAI(apiKey);

    // Try with Google Search grounding first
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [{ googleSearch: {} } as any],
    });

    const prompt = PRODUCT_SEARCH_PROMPT.replace("{PRODUCT_NAME}", productName);

    const parts: any[] = [prompt];

    // Include product image for better identification
    if (productImage) {
        const base64Data = productImage.includes(',') ? productImage.split(',')[1] : productImage;
        const mimeType = productImage.includes('png') ? 'image/png' : 'image/jpeg';
        parts.push({ inlineData: { data: base64Data, mimeType } });
        parts[0] = prompt + "\n\n(ดูรูปสินค้าประกอบเพื่อระบุสินค้าให้ถูกต้อง)";
    }

    console.log("🔍 Searching product info with Gemini + Google Search grounding...");
    const result = await model.generateContent(parts);
    const text = result.response.text();
    console.log("🔍 Gemini search result:", text.substring(0, 300));

    return parseProductInfoResponse(text, productName);
}

/**
 * Search using OpenAI (GPT-4o with web browsing capability)
 */
async function searchWithOpenAI(
    productName: string,
    productImage?: string | null
): Promise<ProductInfo | null> {
    const apiKey = await getApiKey('openai');
    if (!apiKey) throw new Error("OpenAI API Key not found");

    const prompt = PRODUCT_SEARCH_PROMPT.replace("{PRODUCT_NAME}", productName);

    const messages: any[] = [];

    if (productImage) {
        messages.push({
            role: "user",
            content: [
                { type: "text", text: prompt + "\n\n(ดูรูปสินค้าประกอบเพื่อระบุสินค้าให้ถูกต้อง)" },
                { type: "image_url", image_url: { url: productImage, detail: "low" } }
            ]
        });
    } else {
        messages.push({ role: "user", content: prompt });
    }

    console.log("🔍 Searching product info with OpenAI...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: productImage ? "gpt-4o" : "gpt-4o-mini",
            messages,
            max_tokens: 1000,
            temperature: 0.3
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || "OpenAI API Error");
    }

    const json = await response.json();
    const text = json.choices?.[0]?.message?.content || "";
    console.log("🔍 OpenAI search result:", text.substring(0, 300));

    return parseProductInfoResponse(text, productName);
}

/**
 * Fallback: Gemini without Google Search grounding
 */
async function searchWithGeminiFallback(productName: string): Promise<ProductInfo | null> {
    const apiKey = await getApiKey('gemini');
    if (!apiKey) {
        // Try OpenAI as last resort
        const openaiKey = await getApiKey('openai');
        if (openaiKey) return searchWithOpenAI(productName, null);
        throw new Error("No API Key available");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = PRODUCT_SEARCH_PROMPT.replace("{PRODUCT_NAME}", productName);

    console.log("🔍 Searching product info with Gemini (no grounding fallback)...");
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return parseProductInfoResponse(text, productName);
}

/**
 * Parse the AI response into ProductInfo structure
 */
function parseProductInfoResponse(text: string, productName: string): ProductInfo | null {
    try {
        // Strip markdown code fences if present
        const cleaned = text
            .replace(/```json\s*/gi, '')
            .replace(/```\s*/gi, '')
            .trim();

        // Find JSON object in response
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.warn("🔍 Could not find JSON in response");
            return null;
        }

        const parsed = JSON.parse(jsonMatch[0]);

        const info: ProductInfo = {
            summary: parsed.summary || `${productName}`,
            keyFeatures: Array.isArray(parsed.keyFeatures) ? parsed.keyFeatures : [],
            specs: (typeof parsed.specs === 'object' && parsed.specs) ? parsed.specs : {},
            accessories: Array.isArray(parsed.accessories) ? parsed.accessories : [],
            priceRange: parsed.priceRange || "ไม่พบข้อมูล",
            pros: Array.isArray(parsed.pros) ? parsed.pros : [],
            cons: Array.isArray(parsed.cons) ? parsed.cons : [],
            rawText: text
        };

        console.log(`🔍 Product info parsed: ${info.keyFeatures.length} features, ${Object.keys(info.specs).length} specs`);
        return info;
    } catch (e) {
        console.warn("🔍 Failed to parse product info:", e);
        return null;
    }
}

/**
 * Format ProductInfo into a concise string for use in script generation prompts.
 * Keeps only the most relevant info to avoid prompt bloat.
 */
export function formatProductInfoForPrompt(info: ProductInfo): string {
    const parts: string[] = [];

    if (info.summary) {
        parts.push(`📋 สรุป: ${info.summary}`);
    }

    if (info.keyFeatures.length > 0) {
        parts.push(`✨ จุดเด่น:\n${info.keyFeatures.map(f => `- ${f}`).join('\n')}`);
    }

    if (Object.keys(info.specs).length > 0) {
        const specLines = Object.entries(info.specs)
            .slice(0, 8) // Limit to 8 most important specs
            .map(([k, v]) => `- ${k}: ${v}`);
        parts.push(`📐 สเปค:\n${specLines.join('\n')}`);
    }

    if (info.accessories.length > 0) {
        parts.push(`📦 อุปกรณ์ในกล่อง: ${info.accessories.join(', ')}`);
    }

    if (info.priceRange && info.priceRange !== "ไม่พบข้อมูล") {
        parts.push(`💰 ราคา: ${info.priceRange}`);
    }

    if (info.pros.length > 0) {
        parts.push(`👍 ข้อดี:\n${info.pros.map(p => `- ${p}`).join('\n')}`);
    }

    if (info.cons.length > 0) {
        parts.push(`⚠️ ข้อควรรู้:\n${info.cons.map(c => `- ${c}`).join('\n')}`);
    }

    return parts.join('\n\n');
}
