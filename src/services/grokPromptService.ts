/**
 * Grok Prompt Service — AI Prompt Generation for Grok Engine
 * Supports both OpenAI (GPT-4o) and Gemini for vision analysis and prompt generation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";
import type { TemplateOption } from "@/types/netflow";
import type {
    EnginePromptBuilder,
    PromptGenerationConfig,
    GeneratedPrompts,
    VideoPromptMeta,
} from "./promptTypes";

// Template descriptions for prompt building
const TEMPLATE_CONFIGS: Record<TemplateOption, { thaiName: string; style: string; focus: string }> = {
    "product-review": { thaiName: "รีวิวสินค้า", style: "Honest review style, authentic reaction", focus: "Show genuine reaction to the product, highlight key features" },
    "brainrot-product": { thaiName: "Brainrot + Product", style: "Gen-Z viral style, fast cuts, chaotic energy", focus: "Quick attention-grabbing movements, meme-like expressions" },
    "food-review": { thaiName: "รีวิวอาหาร", style: "Food review style, appetizing close-ups, authentic tasting reaction", focus: "Show texture, steam/sizzle, first bite reaction, and why it's delicious" },
    "fashion-review": { thaiName: "รีวิวเสื้อผ้า", style: "Fashion review style, clean styling, confident try-on", focus: "Show fit, fabric, movement, before/after look, and how to style it" },
    "gadget-review": { thaiName: "รีวิวแกดเจ็ต", style: "Gadget review style, hands-on demo, clear benefits", focus: "Show key features, real usage demo, and tangible results" },
    "unboxing": { thaiName: "แกะกล่อง", style: "ASMR unboxing, slow reveal, anticipation", focus: "Hands opening package, reveal moment, first impression reaction" },
    "comparison": { thaiName: "เปรียบเทียบ", style: "Side-by-side comparison, analytical", focus: "Show before/after or compare with other products" },
    "testimonial": { thaiName: "รีวิวลูกค้า", style: "Authentic customer story, emotional connection", focus: "Personal experience sharing, genuine emotions" },
    "flash-sale": { thaiName: "Flash Sale", style: "Urgent, high energy, countdown vibe", focus: "Fast movements, excitement, urgency in expression" },
    "tutorial": { thaiName: "สอนวิธีใช้", style: "Step-by-step demonstration, educational", focus: "Clear hand movements showing how to use product" },
    "lifestyle": { thaiName: "ไลฟ์สไตล์", style: "Day-in-life aesthetic, natural integration", focus: "Product naturally integrated into daily routine" },
    "trending": { thaiName: "ตามเทรนด์", style: "Trending TikTok style, viral format", focus: "Follow current viral video format and movements" },
    "mini-drama": { thaiName: "มินิดราม่า", style: "Short drama scene, storytelling with twist", focus: "Acting scene with emotional arc, product as solution" },
    "before-after": { thaiName: "ก่อน-หลัง", style: "Transformation reveal, dramatic difference", focus: "Clear before state, transition, impressive after result" }
};

// Clip duration configs
const DURATION_CONFIGS: Record<number, { description: string; pacing: string }> = {
    8: { description: "8-second quick clip", pacing: "Fast-paced, single key moment, punchy" },
    16: { description: "16-second medium clip", pacing: "Moderate pace, 2-3 key moments, balanced storytelling" },
    24: { description: "24-second extended clip", pacing: "Slower build-up, multiple scenes, complete narrative arc" }
};

// Voice tone configs (Thai)
const VOICE_TONE_THAI: Record<string, { tone: string; style: string; example: string }> = {
    "energetic": { tone: "กระตือรือร้น ตื่นเต้น", style: "พูดเร็ว เสียงดัง มีพลัง น้ำเสียงสนุกสนาน", example: "ว้าว! มาดูกันเลย สิ่งนี้เจ๋งมากๆ!" },
    "calm": { tone: "สงบ นุ่มนวล", style: "พูดช้าๆ ชัดถ้อยชัดคำ น้ำเสียงผ่อนคลาย", example: "วันนี้เราจะมาแนะนำสิ่งดีๆ ให้ทุกคนนะคะ" },
    "friendly": { tone: "เป็นกันเอง อบอุ่น", style: "พูดคุยเหมือนเพื่อน น้ำเสียงจริงใจ ไม่เป็นทางการ", example: "เฮ้! มาเล่าให้ฟังหน่อย อันนี้ดีจริงๆ นะ" },
    "professional": { tone: "มืออาชีพ น่าเชื่อถือ", style: "พูดชัดเจน มั่นใจ น้ำเสียงหนักแน่น", example: "สวัสดีครับ วันนี้ผมจะมารีวิวสินค้าที่น่าสนใจ" }
};

// Sale style configs (Thai)
const SALE_STYLE_THAI: Record<string, { approach: string; phrases: string[] }> = {
    "hard": { approach: "ขายตรง กระตุ้นซื้อทันที", phrases: ["รีบเลย!", "โปรนี้หมดเมื่อไหร่ไม่รู้!", "กดสั่งเลยตอนนี้!"] },
    "soft": { approach: "ขายอ้อม เน้นคุณค่า", phrases: ["ลองดูไหม", "ถ้าสนใจก็ไปดูกันได้นะ", "แนะนำเลย"] },
    "educational": { approach: "ให้ความรู้ก่อนขาย", phrases: ["รู้ไหมว่า...", "หลายคนอาจไม่รู้", "มาเรียนรู้กันว่า..."] },
    "storytelling": { approach: "เล่าเรื่องราว สร้างอารมณ์ร่วม", phrases: ["เรื่องมันเริ่มจาก...", "ตอนแรกไม่เชื่อเลย", "จนกระทั่งลองใช้..."] }
};

// Language/Accent configs
const LANGUAGE_ACCENT_THAI: Record<string, { dialect: string; characteristic: string }> = {
    "th-central": { dialect: "ภาษากลาง", characteristic: "สำเนียงมาตรฐาน ชัดเจน" },
    "th-north": { dialect: "ภาษาเหนือ", characteristic: "สำเนียงอ่อนหวาน ม่วนใจ๋" },
    "th-south": { dialect: "ภาษาใต้", characteristic: "สำเนียงเข้มแข็ง พูดเร็ว" },
    "th-isan": { dialect: "ภาษาอีสาน", characteristic: "สำเนียงเป็นกันเอง ม่วนซื่น" }
};

const ACCENT_THAI: Record<string, { dialect: string; characteristic: string }> = {
    "central": { dialect: "ภาษากลาง", characteristic: "สำเนียงมาตรฐาน ชัดเจน" },
    "north": { dialect: "ภาษาเหนือ", characteristic: "สำเนียงอ่อนหวาน ม่วนใจ๋" },
    "south": { dialect: "ภาษาใต้", characteristic: "สำเนียงเข้มแข็ง พูดเร็ว" },
    "isan": { dialect: "ภาษาอีสาน", characteristic: "สำเนียงเป็นกันเอง ม่วนซื่น" }
};

// Randomized Hook variations per template
const HOOK_VARIATIONS: Record<string, string[]> = {
    "product-review": ["มาดูกันว่าตัวนี้ดียังไง!", "ใช้มา 1 เดือน ต้องรีวิวให้!", "หลายคนถามมา วันนี้บอกหมดเลย!", "ตัวนี้ดีจริงหรือแค่โฆษณา? มาดู!", "รีวิวตรงๆ ไม่อวย!", "ใครยังไม่รู้จักตัวนี้ ต้องดู!", "ลองมาแล้ว บอกเลยว่า...", "ของดีต้องบอกต่อ!", "ตัวนี้เปลี่ยนชีวิตเลย!", "รีวิวจริง ใช้จริง!"],
    "brainrot-product": ["OMG! ต้องดูสิ่งนี้!", "No way! จริงดิ!?", "POV: เจอของดี", "Wait wait wait... ดูนี่ก่อน!", "Bro ดูนี่สิ!", "This is insane! 🤯", "ไม่ดูจะพลาดมาก!", "Viral แน่นอน!", "Main character energy!", "It's giving... everything!"],
    "food-review": ["ของกินอะไรอะ? ทำไมคนพูดถึงกันทั้งฟีด!", "คำแรกคือรู้เรื่องเลย…", "ถ้าชอบของอร่อย ต้องดูอันนี้!", "สายกินห้ามเลื่อน!", "ของมันต้องลองจริงๆ", "เห็นแล้วหิวเลยอะ…", "อันนี้เด็ดจริงไหม?", "รีวิวแบบไม่อวย แต่ขอพูดตรงๆ…", "คือมันนัวมาก!", "กลิ่นนี่มาก่อนเลย!"],
    "fashion-review": ["ชุดนี้ใส่แล้วดูแพงขึ้นเลยอะ", "ทรงมันดีมาก…", "ใส่แล้วหุ่นดูดีขึ้นทันที", "ลุคนี้แต่งง่ายแต่ดูมีอะไร", "ใครหาชุดไปคาเฟ่ต้องดู!", "เนื้อผ้าดีเกินราคา", "ลองใส่ให้ดูแบบชัดๆ", "ฟิตติ้งคือจบ!", "ใส่จริงเดินจริง ไม่หลอก", "ตัวนี้แมตช์ได้ทุกวัน"],
    "gadget-review": ["ของชิ้นนี้ช่วยชีวิตมาก", "เปิดกล่องแล้วคือว้าว…", "ฟีเจอร์นี้โคตรคุ้ม", "ลองใช้ให้ดูจริงๆ", "ทำไมคนรีวิวเยอะขนาดนี้", "อันนี้คือมีแล้วชีวิตง่ายขึ้น", "ถ้าชอบของเล่นเทค ต้องดู", "สั้นๆ: มันเวิร์ค", "เดโมให้ดูชัดๆ", "คุ้มไหม? มาดูกัน"],
    "unboxing": ["มาแกะกล่องกัน!", "ของมาแล้ว! มาดูกัน!", "First impression unboxing!", "รอมานาน ในที่สุดก็มา!", "แกะให้ดูสดๆ!", "เปิดกล่องปริศนา!", "มาดูกันว่าข้างในมีอะไร!", "Unbox กันเลย!", "พัสดุมาแล้วจ้า!", "แกะของใหม่กัน!"],
    "comparison": ["อันไหนดีกว่ากัน? มาดู!", "เปรียบเทียบให้ดูชัดๆ!", "ตัวไหนคุ้มกว่า?", "Battle of the products!", "Head to head comparison!", "ซื้ออันไหนดี? มาดู!", "ต่างกันยังไง? บอกหมด!", "VS กันเลย!", "เทียบกันชัดๆ!", "อันไหน win?"],
    "testimonial": ["ต้องเล่าให้ฟัง...", "เรื่องจริงจากประสบการณ์!", "ใช้มาแล้ว บอกเลยว่า...", "Story time: ตัวนี้เปลี่ยนชีวิต!", "Real review จากคนใช้จริง!", "ประสบการณ์ตรงของเรา!", "ต้องมาแชร์ให้ฟัง!", "คนใช้จริงพูด!", "My honest experience!", "เรื่องราวที่ต้องเล่า!"],
    "flash-sale": ["โปรแรงมาก! รีบเลย!", "ลดหนักมาก! ไม่รีบพลาด!", "Flash sale! กดเลย!", "โปรนี้มีจำกัด!", "ถูกสุดในรอบปี!", "รีบๆ! หมดเมื่อไหร่ไม่รู้!", "ลดราคาช็อค!", "โปรนี้ห้ามพลาด!", "Sale สุดคุ้ม!", "ลดแหลก! รีบกดเลย!"],
    "tutorial": ["สอนใช้ง่ายๆ ดูเลย!", "วิธีใช้แบบละเอียด!", "ทำตามได้เลย!", "Step by step tutorial!", "มือใหม่ต้องดู!", "สอนตั้งแต่เริ่มต้น!", "ทำยังไง? มาดู!", "Tips & Tricks!", "เทคนิคลับ บอกหมด!", "ง่ายมาก ทำตามได้เลย!"],
    "lifestyle": ["ใช้ทุกวันเลย!", "A day with this product!", "ชีวิตดีขึ้นเพราะสิ่งนี้!", "Daily essential ของเรา!", "Must-have item!", "ขาดไม่ได้แล้ว!", "ของโปรดประจำวัน!", "Life hack ที่ต้องมี!", "Everyday essentials!", "ใช้แล้วชีวิตง่ายขึ้น!"],
    "trending": ["ทำไมทุกคนพูดถึง!", "Viral ทั่ว TikTok!", "เทรนด์นี้ต้องลอง!", "Everyone's talking about this!", "ดังมากตอนนี้!", "Trending alert! 🔥", "ของฮิตที่ทุกคนต้องมี!", "Why is this viral?", "ทำไมฮิตขนาดนี้!", "ตามเทรนด์กัน!"],
    "mini-drama": ["เรื่องมันเริ่มจาก...", "ตอนนั้นไม่รู้เลยว่า...", "Plot twist ของชีวิต!", "Story time ที่ต้องฟัง!", "เรื่องนี้สอนให้รู้ว่า...", "จุดเปลี่ยนของชีวิต!", "ถ้าวันนั้นไม่...", "POV: ชีวิตเปลี่ยนไป!", "Drama ในชีวิตจริง!", "เรื่องราวที่ไม่คาดคิด!"],
    "before-after": ["ก่อน-หลัง ต่างกันมาก!", "Transformation สุดปัง!", "เปลี่ยนไปเลย!", "ผลลัพธ์จริง ไม่ตัดต่อ!", "ใช้ 1 เดือน ดูความต่าง!", "Before & After ชัดๆ!", "เปลี่ยนแบบนี้เลย!", "Real results!", "ต่างกันขนาดนี้!", "ไม่เชื่อก็ต้องเชื่อ!"]
};

// Randomized CTA variations per sale style
const CTA_VARIATIONS: Record<string, string[]> = {
    "hard": ["รีบกดสั่งเลย!", "กดลิงก์ด้านล่างเลย!", "โปรนี้หมดเมื่อไหร่ไม่รู้!", "ไม่ซื้อตอนนี้จะเสียใจ!", "กดสั่งก่อนหมด!", "อย่ารอ กดเลย!", "ช้าอด รีบกด!", "กดตะกร้าเลย!", "ของมีจำกัด รีบเลย!", "กดเลยตอนนี้!"],
    "soft": ["ลองดูไหม?", "ถ้าสนใจก็ไปดูกันได้นะ", "แนะนำเลย", "น่าลองมากๆ", "ไปดูรายละเอียดกันได้", "ใครสนใจตามไปดูนะ", "ถ้าชอบก็ลองดู", "Link อยู่ด้านล่างนะ", "ดูเพิ่มเติมได้เลย", "ถ้าโดนใจก็ไปดูกัน"],
    "educational": ["รู้แล้วต้องลอง!", "เข้าใจแล้วใช่ไหม? ไปดูกัน!", "ข้อมูลครบแล้ว ตัดสินใจได้เลย", "หวังว่าจะเป็นประโยชน์นะ", "เรียนรู้แล้ว ลองใช้เลย", "ความรู้ใหม่ + ของดี = win!", "ศึกษาเพิ่มเติมได้ที่ลิงก์", "อยากรู้มากกว่านี้กดเลย", "ข้อมูลเพิ่มเติมด้านล่าง", "เข้าใจแล้ว ไปลองกัน!"],
    "storytelling": ["เรื่องมันจบที่... ต้องลอง!", "และนั่นคือเหตุผลที่แนะนำ", "เรื่องราวนี้สอนให้รู้ว่า... ต้องมี!", "แล้วชีวิตก็เปลี่ยนไป", "ตอนจบ? ต้องลองเอง!", "และนี่คือ happy ending", "เรื่องยังไม่จบ ไปดูต่อ!", "อยากรู้ตอนจบ? กดเลย", "To be continued... ที่ลิงก์นี้", "จบดีเพราะตัวนี้!"]
};

// Random picker helper
const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

type ProductCategory = "food" | "fashion" | "gadget" | "beauty" | "other";

const normalizeText = (s: string) => (s || "").toLowerCase();

const includesAny = (text: string, keywords: string[]) => keywords.some(k => text.includes(k));

const detectProductCategory = (productName: string, productAnalysis: string, template?: string): ProductCategory => {
    const t = normalizeText(`${productName} ${productAnalysis}`);
    if (template === "food-review") return "food";
    if (template === "fashion-review") return "fashion";
    if (template === "gadget-review") return "gadget";
    if (includesAny(t, ["food", "snack", "chips", "cookie", "chocolate", "cake", "bread", "noodle", "ramen", "rice", "drink", "tea", "coffee", "milk", "juice", "soda", "cola", "matcha", "อาหาร", "ขนม", "ของกิน", "เครื่องดื่ม", "ชา", "กาแฟ", "นม", "น้ำผลไม้", "บะหมี่", "ก๋วยเตี๋ยว", "ข้าว"])) return "food";
    if (includesAny(t, ["shirt", "t-shirt", "hoodie", "jacket", "pants", "jeans", "dress", "skirt", "shoes", "sneaker", "fashion", "outfit", "fabric", "fit", "size", "เสื้อ", "กางเกง", "เดรส", "กระโปรง", "รองเท้า", "ชุด", "ผ้า", "ทรง", "ฟิตติ้ง", "ไซส์"])) return "fashion";
    if (includesAny(t, ["gadget", "device", "camera", "phone", "headphone", "earbuds", "charger", "powerbank", "keyboard", "mouse", "laptop", "electronics", "bluetooth", "usb", "แกดเจ็ต", "อุปกรณ์", "กล้อง", "มือถือ", "หูฟัง", "พาวเวอร์แบงค์", "คีย์บอร์ด", "เมาส์", "ชาร์จ", "บลูทูธ"])) return "gadget";
    if (includesAny(t, ["skincare", "makeup", "lip", "serum", "cream", "cleanser", "sunscreen", "cosmetic", "beauty", "สกินแคร์", "เครื่องสำอาง", "ลิป", "เซรั่ม", "ครีม", "กันแดด", "โฟม", "บำรุง"])) return "beauty";
    return "other";
};

const ensureMentionsProductName = (text: string, productName: string): string => {
    const pn = (productName || "").trim();
    if (!pn) return text;
    const t = normalizeText(text);
    const p = normalizeText(pn);
    if (p && t.includes(p)) return text;
    return `${text} ${pn}`.trim();
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const getStoryboardSceneCount = (clipDuration: number): number => {
    if (clipDuration === 8) return 1;
    if (clipDuration === 16) return 2;
    if (clipDuration === 24) return 3;
    return clamp(Math.round((clipDuration || 16) / 8), 1, 3);
};

const buildStoryboardSection = (config: PromptGenerationConfig, category: ProductCategory): string => {
    const sceneCount = getStoryboardSceneCount(config.clipDuration || 16);
    const productName = config.productName;
    const rawHook = (config.hookText || "").trim()
        ? config.hookText!
        : pickRandom(HOOK_VARIATIONS[config.template] || HOOK_VARIATIONS["product-review"]);
    const rawCta = (config.ctaText || "").trim()
        ? config.ctaText!
        : pickRandom(CTA_VARIATIONS[config.saleStyle] || CTA_VARIATIONS["storytelling"]);
    const hook = ensureMentionsProductName(rawHook, productName);
    const cta = ensureMentionsProductName(rawCta, productName);

    const scene2CoreByCategory: Record<ProductCategory, string> = {
        food: "โชว์เนื้อสัมผัส/ไอน้ำ/ความนัว + คำแรก/คำต่อไปให้เห็น reaction",
        fashion: "โชว์ฟิตติ้ง/ทรง/เนื้อผ้า + before/after look + เดิน/หมุนให้เห็น movement",
        gadget: "เดโมฟีเจอร์ 1-2 อย่างแบบ hands-on + ผลลัพธ์ที่จับต้องได้",
        beauty: "โชว์ก่อน-หลัง/เท็กซ์เจอร์/วิธีใช้แบบสั้นๆ (หลีกเลี่ยงเคลมเกินจริง)",
        other: "เดโมการใช้งานจริง/จุดเด่น 1-2 ข้อ + ผลลัพธ์ที่จับต้องได้"
    };

    const scene1Text = `0-8s: HOOK (หยุดนิ้ว)\n- Visual: Close-up + reveal\n- Voice: "${hook}"`;
    const scene2Text = sceneCount >= 2
        ? `8-16s: DEMO / KEY MESSAGE\n- Visual: ${scene2CoreByCategory[category]}\n- Key message: (ต้องมีชื่อสินค้า ${productName} + ประโยชน์หลัก 1 ข้อ)`
        : "";
    const scene3Text = sceneCount >= 3
        ? `16-24s: PROOF + CTA\n- Visual: สรุปผล/ความต่าง/รีวิวสั้นๆ\n- Voice: "${cta}"`
        : "";

    return [
        "🧾 STORYBOARD (1 Scene = 8s)",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        scene1Text, scene2Text, scene3Text,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    ].filter(Boolean).join("\n");
};

// Compelling sales phrases (randomized)
const SALES_POWER_WORDS: string[] = [
    "ดีเกินคาด", "คุ้มมาก", "ต้องมี", "ขายดีมาก", "ฮิตสุดๆ",
    "ของดี", "ไม่ผิดหวัง", "เปลี่ยนชีวิต", "ปังมาก", "โคตรคุ้ม",
    "ใช้ดี", "ชอบมาก", "ประทับใจ", "แนะนำเลย", "ของแท้"
];

const SALES_BENEFITS: string[] = [
    "ใช้ง่าย ได้ผลจริง", "คุณภาพดี ราคาโดน", "ลองแล้วจะติดใจ", "ของดีต้องบอกต่อ",
    "ใช้แล้วชีวิตเปลี่ยน", "ประหยัดเวลา ได้ผลลัพธ์", "ตอบโจทย์ทุกความต้องการ", "คุ้มค่าทุกบาท"
];

const URGENCY_PHRASES: string[] = [
    "รีบเลย ก่อนหมด!", "โปรนี้มีจำกัด!", "อย่าพลาด!", "ตอนนี้เท่านั้น!", "ของมีจำกัด!", "หมดแล้วหมดเลย!"
];

/**
 * Generate SHORT Thai dialogue for video scenes.
 * MAX 5-8 words per scene (speakable in ~8 seconds)
 */
const generateThaiScript = (
    productName: string, template: string, voiceTone: string, saleStyle: string,
    hookText: string, ctaText: string, clipDuration: number, category: ProductCategory
): string => {
    const sceneCount = Math.max(1, Math.floor(clipDuration / 8));
    const pn = productName || 'ตัวนี้';

    const shortHooks: Record<ProductCategory, string[]> = {
        food: [`มาลองชิม ${pn} กัน`, `${pn} อร่อยมาก ต้องลอง`, `วันนี้ชิม ${pn} ให้ดู`, `เห็น ${pn} ต้องลอง`],
        fashion: [`มาดู ${pn} กัน`, `ใส่ ${pn} แล้วดูดีมาก`, `${pn} ตัวนี้สวยมาก`, `ลองใส่ ${pn} ให้ดู`],
        gadget: [`มาดู ${pn} กัน`, `${pn} ใช้ดีมากเลย`, `ลองใช้ ${pn} ให้ดู`, `${pn} ตัวนี้เจ๋งมาก`],
        beauty: [`มาลอง ${pn} กัน`, `ใช้ ${pn} แล้วผิวดีขึ้น`, `${pn} ตัวนี้ดีมาก`, `ลองใช้ ${pn} ให้ดู`],
        other: [`มาดู ${pn} กัน`, `${pn} ดีมากเลย`, `ลองใช้ ${pn} ให้ดู`, `${pn} ตัวนี้ต้องมี`]
    };

    const shortDemos: Record<ProductCategory, string[]> = {
        food: [`อร่อยจริงๆ เลย`, `รสชาติดีมาก คุ้มค่า`, `ชิมแล้ว ชอบมากเลย`, `หอมมาก กินง่ายด้วย`],
        fashion: [`ใส่สบาย ทรงดีมาก`, `เนื้อผ้าดี คุ้มราคา`, `ใส่แล้ว ดูดีเลย`, `ทรงสวย ใส่ได้ทุกวัน`],
        gadget: [`ใช้ง่าย ได้ผลจริง`, `คุณภาพดี คุ้มราคา`, `ใช้แล้ว ชอบมากเลย`, `ดีจริงๆ แนะนำเลย`],
        beauty: [`ใช้แล้ว ผิวดีขึ้นจริง`, `อ่อนโยน ใช้ง่ายมาก`, `ใช้แล้ว เห็นผลเลย`, `ดีจริงๆ ต้องลอง`],
        other: [`ใช้ง่าย ดีมากเลย`, `คุ้มค่า แนะนำเลย`, `ใช้แล้ว ชอบมาก`, `ดีจริงๆ ต้องมี`]
    };

    const shortCTAs: string[] = [`ลองดูนะ แนะนำเลย`, `สนใจ กดดูได้เลย`, `ไปดูกันได้เลย`, `แนะนำเลย ดีจริงๆ`, `ลองดูนะ ไม่ผิดหวัง`];

    const hook = hookText ? (hookText.length > 30 ? hookText.substring(0, 30) : hookText) : pickRandom(shortHooks[category]);
    const cta = ctaText ? (ctaText.length > 30 ? ctaText.substring(0, 30) : ctaText) : pickRandom(shortCTAs);

    let scriptParts: string[] = [];
    if (sceneCount === 1) {
        scriptParts.push(`🎬 ฉาก1: "${hook}"`);
    } else if (sceneCount === 2) {
        scriptParts.push(`🎬 ฉาก1: "${hook}"`);
        scriptParts.push(`🎬 ฉาก2: "${cta}"`);
    } else {
        scriptParts.push(`🎬 ฉาก1: "${hook}"`);
        scriptParts.push(`🎬 ฉาก2: "${pickRandom(shortDemos[category])}"`);
        scriptParts.push(`🎬 ฉาก3: "${cta}"`);
        for (let i = 3; i < sceneCount; i++) {
            scriptParts.push(`🎬 ฉาก${i + 1}: "${pickRandom(shortDemos[category])}"`);
        }
    }
    return scriptParts.join("\n");
};

// ═══════════════════════════════════════════════════════════
// AI Provider & Vision Analysis
// ═══════════════════════════════════════════════════════════

const getAIProvider = (): 'openai' | 'gemini' => {
    return (localStorage.getItem("netflow_ai_provider") as 'openai' | 'gemini') || 'openai';
};

const analyzeProductImage = async (imageBase64: string, productName: string): Promise<string> => {
    const provider = getAIProvider();
    console.log(`👁️ [Grok] Analyzing product image with ${provider.toUpperCase()}...`);
    if (provider === 'openai') {
        return await analyzeWithOpenAI(imageBase64, productName);
    } else {
        return await analyzeWithGemini(imageBase64, productName);
    }
};

const analyzeWithOpenAI = async (imageBase64: string, productName: string): Promise<string> => {
    const apiKey = await getApiKey('openai');
    if (!apiKey) throw new Error("OpenAI API Key ไม่พบ! กรุณาใส่ Key ใน Settings");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "user", content: [
                { type: "text", text: `Analyze this product image for video generation.\n\nProduct Name: ${productName}\n\nDescribe:\n1. Product appearance (color, shape, packaging, size)\n2. Key visual features that should be highlighted\n3. Suggested camera angles and lighting\n4. Mood/atmosphere that fits this product\n\nKeep response concise (max 150 words). Focus on visual details useful for video generation.` },
                { type: "image_url", image_url: { url: imageBase64 } }
            ]}],
            max_tokens: 300
        })
    });
    const json = await response.json();
    if (json.error) throw new Error(`OpenAI Error: ${json.error.message}`);
    return json.choices[0].message.content;
};

const analyzeWithGemini = async (imageBase64: string, productName: string): Promise<string> => {
    const apiKey = await getApiKey('gemini');
    if (!apiKey) throw new Error("Gemini API Key ไม่พบ! กรุณาใส่ Key ใน Settings");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const mimeType = imageBase64.includes('png') ? 'image/png' : 'image/jpeg';
    const result = await model.generateContent([
        `Analyze this product image for video generation.\n\nProduct Name: ${productName}\n\nDescribe:\n1. Product appearance (color, shape, packaging, size)\n2. Key visual features that should be highlighted\n3. Suggested camera angles and lighting\n4. Mood/atmosphere that fits this product\n\nKeep response concise (max 150 words). Focus on visual details useful for video generation.`,
        { inlineData: { data: base64Data, mimeType } }
    ]);
    return result.response.text();
};

// ═══════════════════════════════════════════════════════════
// OpenAI Smart Prompt Generation
// ═══════════════════════════════════════════════════════════

const generatePromptsWithOpenAI = async (
    config: PromptGenerationConfig, productAnalysis: string
): Promise<{ imagePrompt: string; videoPrompt: string; sceneScripts: string[] } | null> => {
    const apiKey = await getApiKey('openai');
    if (!apiKey) return null;

    const gender = config.gender === 'male' ? 'Thai man' : 'Thai woman';
    const template = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const sceneCount = Math.max(1, Math.floor((config.clipDuration || 16) / 8));
    const voiceTone = VOICE_TONE_THAI[config.voiceTone] || VOICE_TONE_THAI["friendly"];

    const systemPrompt = `You are a prompt engineer for Grok Imagine (image) and Veo 3 (video) AI generation.

IMAGE PROMPT RULES (Grok Imagine community best practices):
- SHORT (under 250 chars), purely descriptive scene description
- Format: "A [gender] with [expression], [action with product]. [Scene/lighting]."
- Follow-the-picture: prompt must NOT contradict the attached reference images
- Describe subject's prominent features to anchor identity
- Product image is attached separately — describe what person DOES with it
- NEVER use instructions like "IMPORTANT:", "Reference:", "Technical:", "Must include"
- No negative prompts (Grok ignores them)

VIDEO PROMPT RULES (Veo 3 community best practices for CLEAR speech):
- SHORT (under 350 chars)
- Use COLON format for dialogue: The man speaks clearly in Thai: "text" (KEY technique)
- Chain emotion + action + speech: "picks up item, smiles, then says: ..."
- Add "speaks clearly in Thai" for pronunciation quality
- Add "(no subtitles)" at the end to avoid baked-in subtitles
- Describe background audio: "quiet room ambience" to avoid unwanted sounds
- Format: "[Camera] of [subject doing action chain]. [Mood]. [Dialogue with colon]. [Audio]. (no subtitles)"

THAI DIALOGUE RULES (for AI-speakable clarity):
- MAX 5-8 Thai words per scene (speakable in ~8 seconds)
- Use simple, common Thai words ONLY — no slang, no complex compounds
- ONE idea per sentence — never concatenate multiple phrases
- Each scene script must be standalone, natural spoken Thai

Output ONLY valid JSON, no explanation.`;

    const userPrompt = `Generate prompts for a ${template.thaiName} video ad:

Product: "${config.productName}"
${productAnalysis ? `Product visual: ${productAnalysis.substring(0, 150)}` : ''}
Character: ${gender}, ${config.expression || 'smiling'}
Style: ${template.style}
Voice: ${voiceTone.tone}
Scenes needed: ${sceneCount} (each ~8 seconds)
${config.hookText ? `Opening hook: ${config.hookText}` : ''}
${config.ctaText ? `Closing CTA: ${config.ctaText}` : ''}
${config.userScript ? `User's own script: ${config.userScript}` : ''}

Return this exact JSON structure:
{
  "imagePrompt": "A [gender] with [expression], [physical action with product]. [Lighting/scene]. [Framing].",
  "videoPrompt": "[Camera] of a [gender], [emotion+action chain with product]. [Mood]. [He/She] speaks clearly in Thai: \\"[short Thai dialogue]\\". [Audio]. (no subtitles)",
  "sceneScripts": ["5-8 word Thai sentence for scene 1", "5-8 word Thai sentence for scene 2"]
}`;

    try {
        console.log("🤖 [Grok] Generating prompts with OpenAI ChatGPT...");
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                max_tokens: 600,
                temperature: 0.7
            })
        });
        const json = await response.json();
        if (json.error) { console.warn("OpenAI prompt gen error:", json.error.message); return null; }
        const content = json.choices?.[0]?.message?.content || '';
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (!jsonMatch) { console.warn("OpenAI returned non-JSON:", content); return null; }
        const parsed = JSON.parse(jsonMatch[0]);
        console.log("✅ [Grok] OpenAI prompts generated:", parsed);
        return { imagePrompt: parsed.imagePrompt || '', videoPrompt: parsed.videoPrompt || '', sceneScripts: parsed.sceneScripts || [] };
    } catch (e) {
        console.warn("OpenAI prompt generation failed:", e);
        return null;
    }
};

// ═══════════════════════════════════════════════════════════
// Main Prompt Generation
// ═══════════════════════════════════════════════════════════

const generatePrompts = async (config: PromptGenerationConfig): Promise<GeneratedPrompts> => {
    console.log("🎬 [Grok] Generating prompts with config:", config);
    let productAnalysis = "";

    // Step 1: Analyze product image if available
    if (config.productImage) {
        try {
            productAnalysis = await analyzeProductImage(config.productImage, config.productName);
            console.log("📸 [Grok] Product analysis:", productAnalysis);
        } catch (e) { console.warn("Product image analysis failed:", e); }
    }

    // Step 2: Try OpenAI smart prompt generation first
    const aiResult = await generatePromptsWithOpenAI(config, productAnalysis);
    if (aiResult && aiResult.imagePrompt && aiResult.videoPrompt) {
        console.log("✅ [Grok] Using OpenAI-generated prompts");
        const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
        const durationConfig = DURATION_CONFIGS[config.clipDuration || 16] || DURATION_CONFIGS[16];
        const gender = config.gender === 'male' ? 'Thai man' : 'Thai woman';
        const genderVoice = config.gender === 'male' ? 'Male' : 'Female';
        return {
            imagePrompt: aiResult.imagePrompt,
            videoPrompt: aiResult.videoPrompt,
            productAnalysis,
            sceneScripts: aiResult.sceneScripts,
            videoPromptMeta: {
                style: templateConfig.style,
                aspectRatio: config.aspectRatio || '9:16',
                gender,
                genderVoice: `${genderVoice} Thai voice`,
                expression: config.expression || 'smiling',
                camera: "Medium close-up shot",
                product: config.productName,
                productAnchor: productAnalysis ? productAnalysis.substring(0, 100) : '',
                template: config.template,
                pacing: durationConfig.pacing,
                restrictions: '(no subtitles)',
                voiceoverDescriptor: `${genderVoice} Thai voice speaking clearly`,
                cameraMovement: '',
                sceneTransition: '',
                environment: 'Warm studio lighting, soft bokeh background',
                lighting: 'Professional studio lighting',
                characterAnchor: '',
                personaName: '',
                clothingDesc: '',
                productUsageRealism: '',
                category: 'other' as any
            }
        };
    }

    // Step 3: Fallback to local prompt generation
    console.log("📝 [Grok] Using local prompt generation (no OpenAI key or API failed)");
    const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const durationConfig = DURATION_CONFIGS[config.clipDuration || 16] || DURATION_CONFIGS[16];
    const imagePrompt = buildImagePrompt(config, templateConfig, productAnalysis);
    const videoResult = buildVideoPrompt(config, templateConfig, durationConfig, productAnalysis);
    return {
        imagePrompt,
        videoPrompt: videoResult.prompt,
        productAnalysis,
        sceneScripts: videoResult.sceneScripts,
        videoPromptMeta: videoResult.meta
    };
};

// ═══════════════════════════════════════════════════════════
// Image Prompt Builder — Grok Imagine Best Practices
// ═══════════════════════════════════════════════════════════

const buildImagePrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    productAnalysis: string
): string => {
    const gender = config.gender === 'male' ? 'Thai man' : 'Thai woman';
    const expr = config.expression || 'smiling confidently';
    const product = config.productName || 'the product';

    let productVisual = '';
    if (productAnalysis) {
        const firstSentence = productAnalysis.split(/[.!\n]/)[0].trim();
        if (firstSentence.length < 80) productVisual = firstSentence;
    }

    const actionMap: Record<string, string> = {
        "product-review": `holding ${product} in one hand, showing it proudly to camera`,
        "brainrot-product": `holding ${product} close to face, excited surprised expression`,
        "food-review": `holding ${product} near mouth, about to taste, appetizing angle`,
        "fashion-review": `wearing ${product}, posing confidently`,
        "gadget-review": `holding ${product} in both hands, demonstrating it`,
        "unboxing": `opening ${product} box, revealing the item inside`,
        "comparison": `holding ${product} in one hand, comparing gesture`,
        "testimonial": `holding ${product} close to chest, sincere expression`,
        "flash-sale": `holding up ${product} excitedly, urgent energy`,
        "tutorial": `holding ${product}, showing how to use it step by step`,
        "lifestyle": `casually holding ${product} in a cozy setting`,
        "trending": `holding ${product}, trendy pose, looking at camera`,
        "mini-drama": `surprised expression discovering ${product}`,
        "before-after": `holding ${product}, showing dramatic improvement`
    };
    const action = actionMap[config.template] || `holding ${product} in hand, showing it to camera`;

    const parts = [
        `A ${gender} with ${expr} expression,`,
        action + '.',
        productVisual ? `The ${product}: ${productVisual}.` : '',
        'Professional studio lighting, soft bokeh background, photorealistic, high detail.',
        config.aspectRatio === '16:9' ? 'Horizontal 16:9 framing.' : 'Vertical 9:16 portrait framing.'
    ].filter(Boolean);
    return parts.join(' ').trim();
};

// ═══════════════════════════════════════════════════════════
// Video Prompt Builder — Veo 3 / Grok Best Practices
// ═══════════════════════════════════════════════════════════

const buildVideoPrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    durationConfig: typeof DURATION_CONFIGS[number],
    productAnalysis: string
): { prompt: string; sceneScripts: string[]; meta: VideoPromptMeta } => {
    const gender = config.gender === 'male' ? 'Thai man' : 'Thai woman';
    const genderVoice = config.gender === 'male' ? 'Male' : 'Female';
    const expr = config.expression || 'smiling';
    const product = config.productName || 'product';
    const category = detectProductCategory(product, productAnalysis, config.template);
    const pronoun = config.gender === 'male' ? 'He' : 'She';

    const voiceTone = VOICE_TONE_THAI[config.voiceTone] || VOICE_TONE_THAI["friendly"];
    const saleStyle = SALE_STYLE_THAI[config.saleStyle] || SALE_STYLE_THAI["storytelling"];

    let sceneTexts: string[] = [];
    if (config.userScript && config.userScript.trim()) {
        sceneTexts = config.userScript.split(/\n{2,}/).filter(s => s.trim()).map(s => s.trim());
    } else {
        const rawScript = generateThaiScript(
            product, config.template, config.voiceTone, config.saleStyle,
            config.hookText || "", config.ctaText || "", config.clipDuration || 16, category
        );
        const sceneCount = Math.max(1, Math.floor((config.clipDuration || 16) / 8));
        const scriptLines = rawScript.split('\n').filter(l => l.trim());
        const linesPerScene = Math.ceil(scriptLines.length / sceneCount);
        for (let i = 0; i < sceneCount; i++) {
            const start = i * linesPerScene;
            const end = Math.min(start + linesPerScene, scriptLines.length);
            const sceneLines = scriptLines.slice(start, end);
            const sceneText = sceneLines.map(line => {
                const match = line.match(/"([^"]+)"/);
                return match ? match[1] : line.replace(/^[🎬💬✨😍🔥💡🎯]\s*\S+:\s*/, '').replace(/"/g, '');
            }).join(' ');
            sceneTexts.push(sceneText);
        }
    }

    const aspectRatio = config.aspectRatio || '9:16';

    const cameraMap: Record<string, string> = {
        "product-review": "Medium close-up shot", "brainrot-product": "Handheld shaky close-up",
        "food-review": "Appetizing close-up shot", "fashion-review": "Full body medium shot",
        "gadget-review": "Close-up hands-on shot", "unboxing": "Overhead close-up shot",
        "comparison": "Medium shot", "testimonial": "Intimate close-up shot",
        "flash-sale": "Dynamic handheld close-up", "tutorial": "Clear medium shot",
        "lifestyle": "Natural medium shot, warm tones", "trending": "Vertical handheld selfie-style shot",
        "mini-drama": "Cinematic medium shot", "before-after": "Medium shot"
    };
    const camera = cameraMap[config.template] || "Medium close-up shot";

    const actionChainMap: Record<string, string> = {
        "product-review": `picks up ${product}, holds it toward camera proudly, ${expr}`,
        "brainrot-product": `grabs ${product}, reacts with exaggerated surprise, eyes wide`,
        "food-review": `picks up ${product}, smells it, takes a bite, eyes light up with delight`,
        "fashion-review": `shows off ${product}, turns around confidently, strikes a pose`,
        "gadget-review": `holds ${product} in both hands, demonstrates a feature, nods approvingly`,
        "unboxing": `tears open the ${product} packaging, reveals the item, gasps with excitement`,
        "comparison": `holds ${product} in one hand, gestures comparing, looks impressed`,
        "testimonial": `holds ${product} near chest, looks directly at camera with sincere expression`,
        "flash-sale": `holds up ${product} quickly, points at it urgently, excited energy`,
        "tutorial": `holds ${product}, demonstrates step by step, clear hand movements`,
        "lifestyle": `casually picks up ${product}, uses it naturally in a cozy room`,
        "trending": `holds ${product}, does a trendy gesture, looks straight at camera`,
        "mini-drama": `looks confused, then discovers ${product}, expression changes to amazement`,
        "before-after": `shows before state, then uses ${product}, reveals dramatic improvement`
    };
    const actionChain = actionChainMap[config.template] || `holds ${product} toward camera, ${expr}`;

    const moodMap: Record<string, string> = {
        "energetic": "energetic and excited, speaking with high energy",
        "calm": "calm and relaxed, speaking gently",
        "friendly": "warm and friendly, speaking naturally like talking to a friend",
        "professional": "confident and polished, speaking with authority"
    };
    const mood = moodMap[config.voiceTone] || "warm and friendly, speaking naturally";

    const dialogueLine = sceneTexts[0]
        ? `${pronoun} speaks clearly in Thai: "${sceneTexts[0]}"`
        : `${pronoun} speaks enthusiastically in Thai about ${product}`;

    const prompt = [
        `${camera} of a ${gender}, ${actionChain}.`,
        `${mood.charAt(0).toUpperCase() + mood.slice(1)}.`,
        `${dialogueLine}.`,
        `Warm studio lighting, soft bokeh background, quiet room ambience.`,
        `(no subtitles)`
    ].join(' ');

    const toneText = moodMap[config.voiceTone] || "warm, natural";
    const styleDesc = `${templateConfig.style}, ${saleStyle.approach}, ${toneText}`;

    const meta: VideoPromptMeta = {
        style: styleDesc,
        aspectRatio,
        gender,
        genderVoice: `${genderVoice} Thai voice`,
        expression: expr,
        camera,
        product,
        productAnchor: productAnalysis ? productAnalysis.substring(0, 100) : '',
        template: config.template,
        pacing: durationConfig.pacing,
        restrictions: `(no subtitles)`,
        voiceoverDescriptor: `${genderVoice} Thai voice speaking clearly`,
        cameraMovement: '',
        sceneTransition: '',
        environment: 'Warm studio lighting, soft bokeh background',
        lighting: 'Professional studio lighting',
        characterAnchor: '',
        personaName: '',
        clothingDesc: '',
        productUsageRealism: '',
        category: 'other' as any
    };

    console.log(`📝 [Grok] Video prompt (${prompt.length} chars):`, prompt);
    return { prompt, sceneScripts: sceneTexts, meta };
};

// ═══════════════════════════════════════════════════════════
// Scene 2+ Prompt & Quick Prompts
// ═══════════════════════════════════════════════════════════

const buildSceneVideoPromptJSON = (meta: VideoPromptMeta, sceneScript: string, sceneNumber: number, sceneVideoAction?: string): string => {
    const cleanScript = sceneScript.trim().replace(/^"+|"+$/g, '').trim();
    const pronoun = meta.gender.includes('man') ? 'He' : 'She';
    const parts = [
        `Continuation from previous scene. Same ${meta.gender}, same setting.`,
        `[CRITICAL] PRODUCT POSITION LOCK: The ${meta.product} MUST remain in the EXACT same position, same size, same scale as scene ${sceneNumber - 1}. NEVER shrink, NEVER fade, NEVER disappear. Product stays on the same spot on the surface, same screen area. Zero size change.`,
        `${pronoun} continues naturally, ${meta.expression}.`,
        cleanScript
            ? `${pronoun} speaks clearly in Thai: "${cleanScript}".`
            : `${pronoun} continues showing ${meta.product} enthusiastically.`,
        sceneVideoAction?.trim()
            ? `VISUAL ACTION: ${sceneVideoAction.trim()}.`
            : '',
        `Warm studio lighting, quiet room ambience. (no subtitles)`
    ].filter(Boolean);
    return parts.join(' ');
};

const generateQuickPrompts = (config: PromptGenerationConfig): GeneratedPrompts => {
    const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const durationConfig = DURATION_CONFIGS[config.clipDuration || 16] || DURATION_CONFIGS[16];
    const videoResult = buildVideoPrompt(config, templateConfig, durationConfig, "");
    return {
        imagePrompt: buildImagePrompt(config, templateConfig, ""),
        videoPrompt: videoResult.prompt,
        sceneScripts: videoResult.sceneScripts,
        videoPromptMeta: videoResult.meta
    };
};

// ═══════════════════════════════════════════════════════════
// Grok Prompt Builder — implements EnginePromptBuilder interface
// ═══════════════════════════════════════════════════════════

export const grokPromptBuilder: EnginePromptBuilder = {
    engineName: "grok",

    async generatePrompts(config: PromptGenerationConfig): Promise<GeneratedPrompts> {
        return generatePrompts(config);
    },

    generateQuickPrompts(config: PromptGenerationConfig): GeneratedPrompts {
        return generateQuickPrompts(config);
    },

    async analyzeProductImage(imageBase64: string, productName: string): Promise<string> {
        return analyzeProductImage(imageBase64, productName);
    },

    buildScenePrompt(meta: VideoPromptMeta, sceneScript: string, sceneNumber: number, sceneVideoAction?: string): string {
        return buildSceneVideoPromptJSON(meta, sceneScript, sceneNumber, sceneVideoAction);
    },
};
