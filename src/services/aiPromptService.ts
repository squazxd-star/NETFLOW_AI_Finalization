/**
 * AI Prompt Generation Service
 * Supports both OpenAI (GPT-4o) and Gemini for vision analysis and prompt generation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";
import { TemplateOption } from "@/types/netflow";

// Template descriptions for prompt building
const TEMPLATE_CONFIGS: Record<TemplateOption, { thaiName: string; style: string; focus: string }> = {
    "product-review": {
        thaiName: "รีวิวสินค้า",
        style: "Honest review style, authentic reaction",
        focus: "Show genuine reaction to the product, highlight key features"
    },
    "brainrot-product": {
        thaiName: "Brainrot + Product",
        style: "Gen-Z viral style, fast cuts, chaotic energy",
        focus: "Quick attention-grabbing movements, meme-like expressions"
    },
    "food-review": {
        thaiName: "รีวิวอาหาร",
        style: "Food review style, appetizing close-ups, authentic tasting reaction",
        focus: "Show texture, steam/sizzle, first bite reaction, and why it's delicious"
    },
    "fashion-review": {
        thaiName: "รีวิวเสื้อผ้า",
        style: "Fashion review style, clean styling, confident try-on",
        focus: "Show fit, fabric, movement, before/after look, and how to style it"
    },
    "gadget-review": {
        thaiName: "รีวิวแกดเจ็ต",
        style: "Gadget review style, hands-on demo, clear benefits",
        focus: "Show key features, real usage demo, and tangible results"
    },
    "unboxing": {
        thaiName: "แกะกล่อง",
        style: "ASMR unboxing, slow reveal, anticipation",
        focus: "Hands opening package, reveal moment, first impression reaction"
    },
    "comparison": {
        thaiName: "เปรียบเทียบ",
        style: "Side-by-side comparison, analytical",
        focus: "Show before/after or compare with other products"
    },
    "testimonial": {
        thaiName: "รีวิวลูกค้า",
        style: "Authentic customer story, emotional connection",
        focus: "Personal experience sharing, genuine emotions"
    },
    "flash-sale": {
        thaiName: "Flash Sale",
        style: "Urgent, high energy, countdown vibe",
        focus: "Fast movements, excitement, urgency in expression"
    },
    "tutorial": {
        thaiName: "สอนวิธีใช้",
        style: "Step-by-step demonstration, educational",
        focus: "Clear hand movements showing how to use product"
    },
    "lifestyle": {
        thaiName: "ไลฟ์สไตล์",
        style: "Day-in-life aesthetic, natural integration",
        focus: "Product naturally integrated into daily routine"
    },
    "trending": {
        thaiName: "ตามเทรนด์",
        style: "Trending TikTok style, viral format",
        focus: "Follow current viral video format and movements"
    },
    "mini-drama": {
        thaiName: "มินิดราม่า",
        style: "Short drama scene, storytelling with twist",
        focus: "Acting scene with emotional arc, product as solution"
    },
    "before-after": {
        thaiName: "ก่อน-หลัง",
        style: "Transformation reveal, dramatic difference",
        focus: "Clear before state, transition, impressive after result"
    }
};

// Clip duration configs
const DURATION_CONFIGS: Record<number, { description: string; pacing: string }> = {
    8: { description: "8-second quick clip", pacing: "Fast-paced, single key moment, punchy" },
    16: { description: "16-second medium clip", pacing: "Moderate pace, 2-3 key moments, balanced storytelling" },
    24: { description: "24-second extended clip", pacing: "Slower build-up, multiple scenes, complete narrative arc" }
};

// Voice tone configs (Thai)
const VOICE_TONE_THAI: Record<string, { tone: string; style: string; example: string }> = {
    "energetic": {
        tone: "กระตือรือร้น ตื่นเต้น",
        style: "พูดเร็ว เสียงดัง มีพลัง น้ำเสียงสนุกสนาน",
        example: "ว้าว! มาดูกันเลย สิ่งนี้เจ๋งมากๆ!"
    },
    "calm": {
        tone: "สงบ นุ่มนวล",
        style: "พูดช้าๆ ชัดถ้อยชัดคำ น้ำเสียงผ่อนคลาย",
        example: "วันนี้เราจะมาแนะนำสิ่งดีๆ ให้ทุกคนนะคะ"
    },
    "friendly": {
        tone: "เป็นกันเอง อบอุ่น",
        style: "พูดคุยเหมือนเพื่อน น้ำเสียงจริงใจ ไม่เป็นทางการ",
        example: "เฮ้! มาเล่าให้ฟังหน่อย อันนี้ดีจริงๆ นะ"
    },
    "professional": {
        tone: "มืออาชีพ น่าเชื่อถือ",
        style: "พูดชัดเจน มั่นใจ น้ำเสียงหนักแน่น",
        example: "สวัสดีครับ วันนี้ผมจะมารีวิวสินค้าที่น่าสนใจ"
    }
};

// Sale style configs (Thai)
const SALE_STYLE_THAI: Record<string, { approach: string; phrases: string[] }> = {
    "hard": {
        approach: "ขายตรง กระตุ้นซื้อทันที",
        phrases: ["รีบเลย!", "โปรนี้หมดเมื่อไหร่ไม่รู้!", "กดสั่งเลยตอนนี้!"]
    },
    "soft": {
        approach: "ขายอ้อม เน้นคุณค่า",
        phrases: ["ลองดูไหม", "ถ้าสนใจก็ไปดูกันได้นะ", "แนะนำเลย"]
    },
    "educational": {
        approach: "ให้ความรู้ก่อนขาย",
        phrases: ["รู้ไหมว่า...", "หลายคนอาจไม่รู้", "มาเรียนรู้กันว่า..."]
    },
    "storytelling": {
        approach: "เล่าเรื่องราว สร้างอารมณ์ร่วม",
        phrases: ["เรื่องมันเริ่มจาก...", "ตอนแรกไม่เชื่อเลย", "จนกระทั่งลองใช้..."]
    }
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

// Randomized Hook variations per template (many options!)
const HOOK_VARIATIONS: Record<string, string[]> = {
    "product-review": [
        "มาดูกันว่าตัวนี้ดียังไง!",
        "ใช้มา 1 เดือน ต้องรีวิวให้!",
        "หลายคนถามมา วันนี้บอกหมดเลย!",
        "ตัวนี้ดีจริงหรือแค่โฆษณา? มาดู!",
        "รีวิวตรงๆ ไม่อวย!",
        "ใครยังไม่รู้จักตัวนี้ ต้องดู!",
        "ลองมาแล้ว บอกเลยว่า...",
        "ของดีต้องบอกต่อ!",
        "ตัวนี้เปลี่ยนชีวิตเลย!",
        "รีวิวจริง ใช้จริง!"
    ],
    "brainrot-product": [
        "OMG! ต้องดูสิ่งนี้!",
        "No way! จริงดิ!?",
        "POV: เจอของดี",
        "Wait wait wait... ดูนี่ก่อน!",
        "Bro ดูนี่สิ!",
        "This is insane! 🤯",
        "ไม่ดูจะพลาดมาก!",
        "Viral แน่นอน!",
        "Main character energy!",
        "It's giving... everything!"
    ],
    "food-review": [
        "ของกินอะไรอะ? ทำไมคนพูดถึงกันทั้งฟีด!",
        "คำแรกคือรู้เรื่องเลย…",
        "ถ้าชอบของอร่อย ต้องดูอันนี้!",
        "สายกินห้ามเลื่อน!",
        "ของมันต้องลองจริงๆ",
        "เห็นแล้วหิวเลยอะ…",
        "อันนี้เด็ดจริงไหม?",
        "รีวิวแบบไม่อวย แต่ขอพูดตรงๆ…",
        "คือมันนัวมาก!",
        "กลิ่นนี่มาก่อนเลย!"
    ],
    "fashion-review": [
        "ชุดนี้ใส่แล้วดูแพงขึ้นเลยอะ",
        "ทรงมันดีมาก…",
        "ใส่แล้วหุ่นดูดีขึ้นทันที",
        "ลุคนี้แต่งง่ายแต่ดูมีอะไร",
        "ใครหาชุดไปคาเฟ่ต้องดู!",
        "เนื้อผ้าดีเกินราคา",
        "ลองใส่ให้ดูแบบชัดๆ",
        "ฟิตติ้งคือจบ!",
        "ใส่จริงเดินจริง ไม่หลอก",
        "ตัวนี้แมตช์ได้ทุกวัน"
    ],
    "gadget-review": [
        "ของชิ้นนี้ช่วยชีวิตมาก",
        "เปิดกล่องแล้วคือว้าว…",
        "ฟีเจอร์นี้โคตรคุ้ม",
        "ลองใช้ให้ดูจริงๆ",
        "ทำไมคนรีวิวเยอะขนาดนี้",
        "อันนี้คือมีแล้วชีวิตง่ายขึ้น",
        "ถ้าชอบของเล่นเทค ต้องดู",
        "สั้นๆ: มันเวิร์ค",
        "เดโมให้ดูชัดๆ",
        "คุ้มไหม? มาดูกัน"
    ],
    "unboxing": [
        "มาแกะกล่องกัน!",
        "ของมาแล้ว! มาดูกัน!",
        "First impression unboxing!",
        "รอมานาน ในที่สุดก็มา!",
        "แกะให้ดูสดๆ!",
        "เปิดกล่องปริศนา!",
        "มาดูกันว่าข้างในมีอะไร!",
        "Unbox กันเลย!",
        "พัสดุมาแล้วจ้า!",
        "แกะของใหม่กัน!"
    ],
    "comparison": [
        "อันไหนดีกว่ากัน? มาดู!",
        "เปรียบเทียบให้ดูชัดๆ!",
        "ตัวไหนคุ้มกว่า?",
        "Battle of the products!",
        "Head to head comparison!",
        "ซื้ออันไหนดี? มาดู!",
        "ต่างกันยังไง? บอกหมด!",
        "VS กันเลย!",
        "เทียบกันชัดๆ!",
        "อันไหน win?"
    ],
    "testimonial": [
        "ต้องเล่าให้ฟัง...",
        "เรื่องจริงจากประสบการณ์!",
        "ใช้มาแล้ว บอกเลยว่า...",
        "Story time: ตัวนี้เปลี่ยนชีวิต!",
        "Real review จากคนใช้จริง!",
        "ประสบการณ์ตรงของเรา!",
        "ต้องมาแชร์ให้ฟัง!",
        "คนใช้จริงพูด!",
        "My honest experience!",
        "เรื่องราวที่ต้องเล่า!"
    ],
    "flash-sale": [
        "โปรแรงมาก! รีบเลย!",
        "ลดหนักมาก! ไม่รีบพลาด!",
        "Flash sale! กดเลย!",
        "โปรนี้มีจำกัด!",
        "ถูกสุดในรอบปี!",
        "รีบๆ! หมดเมื่อไหร่ไม่รู้!",
        "ลดราคาช็อค!",
        "โปรนี้ห้ามพลาด!",
        "Sale สุดคุ้ม!",
        "ลดแหลก! รีบกดเลย!"
    ],
    "tutorial": [
        "สอนใช้ง่ายๆ ดูเลย!",
        "วิธีใช้แบบละเอียด!",
        "ทำตามได้เลย!",
        "Step by step tutorial!",
        "มือใหม่ต้องดู!",
        "สอนตั้งแต่เริ่มต้น!",
        "ทำยังไง? มาดู!",
        "Tips & Tricks!",
        "เทคนิคลับ บอกหมด!",
        "ง่ายมาก ทำตามได้เลย!"
    ],
    "lifestyle": [
        "ใช้ทุกวันเลย!",
        "A day with this product!",
        "ชีวิตดีขึ้นเพราะสิ่งนี้!",
        "Daily essential ของเรา!",
        "Must-have item!",
        "ขาดไม่ได้แล้ว!",
        "ของโปรดประจำวัน!",
        "Life hack ที่ต้องมี!",
        "Everyday essentials!",
        "ใช้แล้วชีวิตง่ายขึ้น!"
    ],
    "trending": [
        "ทำไมทุกคนพูดถึง!",
        "Viral ทั่ว TikTok!",
        "เทรนด์นี้ต้องลอง!",
        "Everyone's talking about this!",
        "ดังมากตอนนี้!",
        "Trending alert! 🔥",
        "ของฮิตที่ทุกคนต้องมี!",
        "Why is this viral?",
        "ทำไมฮิตขนาดนี้!",
        "ตามเทรนด์กัน!"
    ],
    "mini-drama": [
        "เรื่องมันเริ่มจาก...",
        "ตอนนั้นไม่รู้เลยว่า...",
        "Plot twist ของชีวิต!",
        "Story time ที่ต้องฟัง!",
        "เรื่องนี้สอนให้รู้ว่า...",
        "จุดเปลี่ยนของชีวิต!",
        "ถ้าวันนั้นไม่...",
        "POV: ชีวิตเปลี่ยนไป!",
        "Drama ในชีวิตจริง!",
        "เรื่องราวที่ไม่คาดคิด!"
    ],
    "before-after": [
        "ก่อน-หลัง ต่างกันมาก!",
        "Transformation สุดปัง!",
        "เปลี่ยนไปเลย!",
        "ผลลัพธ์จริง ไม่ตัดต่อ!",
        "ใช้ 1 เดือน ดูความต่าง!",
        "Before & After ชัดๆ!",
        "เปลี่ยนแบบนี้เลย!",
        "Real results!",
        "ต่างกันขนาดนี้!",
        "ไม่เชื่อก็ต้องเชื่อ!"
    ]
};

// Randomized CTA variations per sale style
const CTA_VARIATIONS: Record<string, string[]> = {
    "hard": [
        "รีบกดสั่งเลย!",
        "กดลิงก์ด้านล่างเลย!",
        "โปรนี้หมดเมื่อไหร่ไม่รู้!",
        "ไม่ซื้อตอนนี้จะเสียใจ!",
        "กดสั่งก่อนหมด!",
        "อย่ารอ กดเลย!",
        "ช้าอด รีบกด!",
        "กดตะกร้าเลย!",
        "ของมีจำกัด รีบเลย!",
        "กดเลยตอนนี้!"
    ],
    "soft": [
        "ลองดูไหม?",
        "ถ้าสนใจก็ไปดูกันได้นะ",
        "แนะนำเลย",
        "น่าลองมากๆ",
        "ไปดูรายละเอียดกันได้",
        "ใครสนใจตามไปดูนะ",
        "ถ้าชอบก็ลองดู",
        "Link อยู่ด้านล่างนะ",
        "ดูเพิ่มเติมได้เลย",
        "ถ้าโดนใจก็ไปดูกัน"
    ],
    "educational": [
        "รู้แล้วต้องลอง!",
        "เข้าใจแล้วใช่ไหม? ไปดูกัน!",
        "ข้อมูลครบแล้ว ตัดสินใจได้เลย",
        "หวังว่าจะเป็นประโยชน์นะ",
        "เรียนรู้แล้ว ลองใช้เลย",
        "ความรู้ใหม่ + ของดี = win!",
        "ศึกษาเพิ่มเติมได้ที่ลิงก์",
        "อยากรู้มากกว่านี้กดเลย",
        "ข้อมูลเพิ่มเติมด้านล่าง",
        "เข้าใจแล้ว ไปลองกัน!"
    ],
    "storytelling": [
        "เรื่องมันจบที่... ต้องลอง!",
        "และนั่นคือเหตุผลที่แนะนำ",
        "เรื่องราวนี้สอนให้รู้ว่า... ต้องมี!",
        "แล้วชีวิตก็เปลี่ยนไป",
        "ตอนจบ? ต้องลองเอง!",
        "และนี่คือ happy ending",
        "เรื่องยังไม่จบ ไปดูต่อ!",
        "อยากรู้ตอนจบ? กดเลย",
        "To be continued... ที่ลิงก์นี้",
        "จบดีเพราะตัวนี้!"
    ]
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

    if (includesAny(t, [
        "food", "snack", "chips", "cookie", "chocolate", "cake", "bread", "noodle", "ramen", "rice",
        "drink", "tea", "coffee", "milk", "juice", "soda", "cola", "matcha",
        "อาหาร", "ขนม", "ของกิน", "เครื่องดื่ม", "ชา", "กาแฟ", "นม", "น้ำผลไม้", "บะหมี่", "ก๋วยเตี๋ยว", "ข้าว"
    ])) return "food";

    if (includesAny(t, [
        "shirt", "t-shirt", "hoodie", "jacket", "pants", "jeans", "dress", "skirt", "shoes", "sneaker",
        "fashion", "outfit", "fabric", "fit", "size",
        "เสื้อ", "กางเกง", "เดรส", "กระโปรง", "รองเท้า", "ชุด", "ผ้า", "ทรง", "ฟิตติ้ง", "ไซส์"
    ])) return "fashion";

    if (includesAny(t, [
        "gadget", "device", "camera", "phone", "headphone", "earbuds", "charger", "powerbank", "keyboard", "mouse", "laptop",
        "electronics", "bluetooth", "usb",
        "แกดเจ็ต", "อุปกรณ์", "กล้อง", "มือถือ", "หูฟัง", "พาวเวอร์แบงค์", "คีย์บอร์ด", "เมาส์", "ชาร์จ", "บลูทูธ"
    ])) return "gadget";

    if (includesAny(t, [
        "skincare", "makeup", "lip", "serum", "cream", "cleanser", "sunscreen",
        "cosmetic", "beauty",
        "สกินแคร์", "เครื่องสำอาง", "ลิป", "เซรั่ม", "ครีม", "กันแดด", "โฟม", "บำรุง"
    ])) return "beauty";

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
    // Our automation supports these stable durations only.
    if (clipDuration === 8) return 1;
    if (clipDuration === 16) return 2;
    if (clipDuration === 24) return 3;
    return clamp(Math.round((clipDuration || 16) / 8), 1, 3);
};

const buildStoryboardSection = (config: PromptGenerationConfig, category: ProductCategory): string => {
    const sceneCount = getStoryboardSceneCount(config.clipDuration);
    const productName = config.productName;
    const rawHook = (config.hookText || "").trim()
        ? config.hookText
        : pickRandom(HOOK_VARIATIONS[config.template] || HOOK_VARIATIONS["product-review"]);
    const rawCta = (config.ctaText || "").trim()
        ? config.ctaText
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
        scene1Text,
        scene2Text,
        scene3Text,
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
    "ใช้ง่าย ได้ผลจริง",
    "คุณภาพดี ราคาโดน",
    "ลองแล้วจะติดใจ",
    "ของดีต้องบอกต่อ",
    "ใช้แล้วชีวิตเปลี่ยน",
    "ประหยัดเวลา ได้ผลลัพธ์",
    "ตอบโจทย์ทุกความต้องการ",
    "คุ้มค่าทุกบาท"
];

const URGENCY_PHRASES: string[] = [
    "รีบเลย ก่อนหมด!",
    "โปรนี้มีจำกัด!",
    "อย่าพลาด!",
    "ตอนนี้เท่านั้น!",
    "ของมีจำกัด!",
    "หมดแล้วหมดเลย!"
];

// Generate full Thai script with product name
const generateThaiScript = (
    productName: string,
    template: string,
    voiceTone: string,
    saleStyle: string,
    hookText: string,
    ctaText: string,
    clipDuration: number,
    category: ProductCategory
): string => {
    const powerWord = pickRandom(SALES_POWER_WORDS);
    const benefit = pickRandom(SALES_BENEFITS);
    const urgency = pickRandom(URGENCY_PHRASES);
    
    // Script parts based on duration
    let scriptParts: string[] = [];
    
    // Opening hook with product name
    const rawOpeningHook = hookText || pickRandom(HOOK_VARIATIONS[template] || HOOK_VARIATIONS["product-review"]);
    const openingHook = ensureMentionsProductName(rawOpeningHook, productName);
    scriptParts.push(`🎬 เปิด: "${openingHook}"`);
    
    // Middle content based on duration
    if (clipDuration >= 8) {
        if (category === "food") {
            scriptParts.push(`💬 แนะนำ: "วันนี้ขอลองชิม ${productName} แบบตรงๆ ${powerWord}!"`);
        } else if (category === "fashion") {
            scriptParts.push(`💬 แนะนำ: "วันนี้ลองใส่ ${productName} ให้ดูแบบชัดๆ ${powerWord}!"`);
        } else if (category === "gadget") {
            scriptParts.push(`💬 แนะนำ: "วันนี้ลองใช้ ${productName} ให้ดูจริงๆ ${powerWord}!"`);
        } else {
            scriptParts.push(`💬 แนะนำ: "วันนี้จะมาพูดถึง ${productName} ${powerWord}!"`);
        }
    }
    
    if (clipDuration >= 16) {
        if (category === "food") {
            scriptParts.push(`✨ จุดเด่น: "รสชาติ/กลิ่น/เนื้อสัมผัสของ ${productName} คือ ${powerWord}"`);
            scriptParts.push(`😍 รีวิว: "คำแรกคือ ${powerWord} เลย"`);
        } else if (category === "fashion") {
            scriptParts.push(`✨ จุดเด่น: "ทรง/เนื้อผ้า/ฟิตติ้งของ ${productName} คือ ${powerWord}"`);
            scriptParts.push(`😍 รีวิว: "ใส่แล้วลุคดูดีขึ้นแบบรู้สึกได้"`);
        } else if (category === "gadget") {
            scriptParts.push(`✨ จุดเด่น: "ฟีเจอร์หลักของ ${productName} คือ ${benefit}"`);
            scriptParts.push(`😍 รีวิว: "ใช้งานจริงแล้ว ${powerWord} มาก"`);
        } else {
            scriptParts.push(`✨ จุดเด่น: "${productName} นี่ ${benefit}"`);
            scriptParts.push(`😍 รีวิว: "ลองใช้แล้ว ${powerWord} มากๆ"`);
        }
    }
    
    if (clipDuration >= 24) {
        if (category === "food") {
            scriptParts.push(`🔥 เน้น: "${productName} ตัวนี้หอมมาก แล้วมันนัวจริง"`);
            scriptParts.push(`💡 สรุป: "ถ้าชอบแนวนี้ ต้องลอง"`);
        } else if (category === "fashion") {
            scriptParts.push(`🔥 เน้น: "${productName} ใส่แล้วดูแพงขึ้นจริง"`);
            scriptParts.push(`💡 สรุป: "แมตช์ง่าย ใส่ได้หลายโอกาส"`);
        } else if (category === "gadget") {
            scriptParts.push(`🔥 เน้น: "${productName} ช่วยประหยัดเวลา/แก้ปัญหาได้จริง"`);
            scriptParts.push(`💡 สรุป: "คุ้มถ้าใช้ทุกวัน"`);
        } else {
            scriptParts.push(`🔥 เน้น: "บอกเลยว่า ${productName} ตัวนี้ปังมาก!"`);
            scriptParts.push(`💡 สรุป: "${benefit} จริงๆ"`);
        }
    }
    
    // Closing CTA with urgency
    const rawClosingCTA = ctaText || pickRandom(CTA_VARIATIONS[saleStyle] || CTA_VARIATIONS["storytelling"]);
    const closingCTA = ensureMentionsProductName(rawClosingCTA, productName);
    scriptParts.push(`🎯 ปิด: "${closingCTA} ${urgency}"`);
    
    return scriptParts.join("\n");
};

export interface PromptGenerationConfig {
    // Images
    productImage?: string;      // Base64
    characterImage?: string;    // Base64
    
    // Product Info
    productName: string;
    productDescription?: string;
    
    // Template & Style
    template: TemplateOption;
    voiceTone: string;          // energetic, calm, friendly, professional
    saleStyle: string;          // hard, soft, educational, storytelling
    
    // Language
    language: string;           // th-central, etc.
    accent?: string;            // central, north, south, isan
    
    // Script Elements
    hookText?: string;
    ctaText?: string;
    mustUseKeywords?: string;
    avoidKeywords?: string;
    
    // Video Settings
    clipDuration: number;       // 8, 16, 24
    aspectRatio?: string;       // 9:16, 16:9
    gender?: string;
    expression?: string;
    movement?: string;
    
    // User-provided script (from GenerationSettingsSection scene cards)
    userScript?: string;        // Thai script from user input (joined by \n\n)
}

export interface GeneratedPrompts {
    imagePrompt: string;
    videoPrompt: string;
    productAnalysis?: string;
    sceneScripts?: string[];   // Individual scene scripts for multi-scene automation
    videoPromptMeta?: VideoPromptMeta; // Metadata for building Scene 2+ JSON prompts
}

export interface VideoPromptMeta {
    style: string;
    aspectRatio: string;
    gender: string;
    genderVoice: string;
    expression: string;
    camera: string;
    product: string;
    template: string;
    restrictions: string;
}

/**
 * Get the selected AI provider from localStorage
 */
const getAIProvider = (): 'openai' | 'gemini' => {
    return (localStorage.getItem("netflow_ai_provider") as 'openai' | 'gemini') || 'openai';
};

/**
 * Analyze product image using Vision API (OpenAI GPT-4o or Gemini)
 */
export const analyzeProductImage = async (
    imageBase64: string,
    productName: string
): Promise<string> => {
    const provider = getAIProvider();
    console.log(`👁️ Analyzing product image with ${provider.toUpperCase()}...`);

    if (provider === 'openai') {
        return await analyzeWithOpenAI(imageBase64, productName);
    } else {
        return await analyzeWithGemini(imageBase64, productName);
    }
};

/**
 * OpenAI Vision Analysis
 */
const analyzeWithOpenAI = async (imageBase64: string, productName: string): Promise<string> => {
    const apiKey = await getApiKey('openai');
    if (!apiKey) throw new Error("OpenAI API Key ไม่พบ! กรุณาใส่ Key ใน Settings");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{
                role: "user",
                content: [
                    {
                        type: "text",
                        text: `Analyze this product image for video generation.
                        
Product Name: ${productName}

Describe:
1. Product appearance (color, shape, packaging, size)
2. Key visual features that should be highlighted
3. Suggested camera angles and lighting
4. Mood/atmosphere that fits this product

Keep response concise (max 150 words). Focus on visual details useful for video generation.`
                    },
                    {
                        type: "image_url",
                        image_url: { url: imageBase64 }
                    }
                ]
            }],
            max_tokens: 300
        })
    });

    const json = await response.json();
    if (json.error) throw new Error(`OpenAI Error: ${json.error.message}`);
    
    return json.choices[0].message.content;
};

/**
 * Gemini Vision Analysis
 */
const analyzeWithGemini = async (imageBase64: string, productName: string): Promise<string> => {
    const apiKey = await getApiKey('gemini');
    if (!apiKey) throw new Error("Gemini API Key ไม่พบ! กรุณาใส่ Key ใน Settings");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Extract base64 data (remove prefix)
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const mimeType = imageBase64.includes('png') ? 'image/png' : 'image/jpeg';

    const result = await model.generateContent([
        `Analyze this product image for video generation.
        
Product Name: ${productName}

Describe:
1. Product appearance (color, shape, packaging, size)
2. Key visual features that should be highlighted
3. Suggested camera angles and lighting
4. Mood/atmosphere that fits this product

Keep response concise (max 150 words). Focus on visual details useful for video generation.`,
        {
            inlineData: {
                data: base64Data,
                mimeType
            }
        }
    ]);

    return result.response.text();
};

/**
 * Generate Image and Video prompts based on config
 */
export const generatePrompts = async (config: PromptGenerationConfig): Promise<GeneratedPrompts> => {
    console.log("🎬 Generating prompts with config:", config);
    
    let productAnalysis = "";
    
    // Step 1: Analyze product image if available
    if (config.productImage) {
        try {
            productAnalysis = await analyzeProductImage(config.productImage, config.productName);
            console.log("📸 Product analysis:", productAnalysis);
        } catch (e) {
            console.warn("Product image analysis failed:", e);
        }
    }

    // Step 2: Get template config
    const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const durationConfig = DURATION_CONFIGS[config.clipDuration] || DURATION_CONFIGS[16];

    // Step 3: Build Image Prompt (for Google Labs ImageFX)
    const imagePrompt = buildImagePrompt(config, templateConfig, productAnalysis);
    
    // Step 4: Build Video Prompt (for Google Labs VideoFX) — JSON format
    const videoResult = buildVideoPrompt(config, templateConfig, durationConfig, productAnalysis);

    return {
        imagePrompt,
        videoPrompt: videoResult.prompt,
        productAnalysis,
        sceneScripts: videoResult.sceneScripts,
        videoPromptMeta: videoResult.meta
    };
};

/**
 * Build Image Generation Prompt
 */
const buildImagePrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    productAnalysis: string
): string => {
    const genderText = config.gender === 'male' ? 'Thai man' : 'Thai woman';
    const expressionText = config.expression || 'happy and confident';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    
    const aspectRatio = config.aspectRatio || '9:16';
    const hasProductImage = !!config.productImage && config.productImage !== config.characterImage;

    let prompt = `Professional photograph for ${templateConfig.thaiName} video thumbnail.

Subject: ${genderText}, ${expressionText} expression, holding/presenting ${config.productName}.
Style: ${templateConfig.style}
Focus: ${templateConfig.focus}

Category: ${category}

Reference Images:
- Image 1: Presenter face reference (must preserve exact face identity and gender)${hasProductImage ? `
- Image 2: Product reference (must preserve packaging and product type)` : ''}
- If text conflicts with images, images win.

${productAnalysis ? `Product Details: ${productAnalysis}` : ''}

Technical: High resolution, studio lighting, sharp focus, social media optimized, ${aspectRatio} orientation.
${config.mustUseKeywords ? `Must include: ${config.mustUseKeywords}` : ''}
${config.avoidKeywords ? `Avoid: ${config.avoidKeywords}` : ''}

NO text overlays. Photorealistic style.`;

    return prompt.trim();
};

/**
 * Build Video Generation Prompt with Thai Voice Script
 */
const buildVideoPrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    durationConfig: typeof DURATION_CONFIGS[number],
    productAnalysis: string
): { prompt: string; sceneScripts: string[]; meta: VideoPromptMeta } => {
    const genderText = config.gender === 'male' ? 'Thai man' : 'Thai woman';
    const genderVoice = config.gender === 'male' ? 'Male' : 'Female';
    const expressionText = config.expression || 'happy and confident';
    const movementText = config.movement || 'natural, fluid movements';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    
    const voiceTone = VOICE_TONE_THAI[config.voiceTone] || VOICE_TONE_THAI["friendly"];
    const saleStyle = SALE_STYLE_THAI[config.saleStyle] || SALE_STYLE_THAI["storytelling"];
    
    // Parse scene scripts
    let sceneTexts: string[] = [];
    
    if (config.userScript && config.userScript.trim()) {
        sceneTexts = config.userScript.split(/\n{2,}/).filter(s => s.trim()).map(s => s.trim());
        console.log("📝 Using user-provided scripts:", sceneTexts);
    } else {
        const rawScript = generateThaiScript(
            config.productName,
            config.template,
            config.voiceTone,
            config.saleStyle,
            config.hookText || "",
            config.ctaText || "",
            config.clipDuration,
            category
        );
        
        const sceneCount = Math.max(1, Math.floor(config.clipDuration / 8));
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
        console.log("📝 Auto-generated scene scripts:", sceneTexts);
    }

    const aspectRatio = config.aspectRatio || '9:16';
    const toneDescriptions: Record<string, string> = {
        "energetic": "High energy, excited, enthusiastic",
        "calm": "Relaxed, smooth, gentle",
        "friendly": "Warm, approachable, natural gestures",
        "professional": "Confident, polished, authoritative"
    };
    const toneText = toneDescriptions[config.voiceTone] || toneDescriptions["friendly"];

    // Build clean natural language prompt (Scene 1) — only Scene 1 script
    const styleDesc = `${templateConfig.style}, ${saleStyle.approach}, ${toneText}`;
    const actionDesc = `${templateConfig.focus}. Movement: ${movementText}. ${durationConfig.pacing}`;

    const promptLines = [
        `${durationConfig.pacing} ${templateConfig.thaiName} video.`,
        `${genderText}, ${expressionText} expression, presenting ${config.productName}.`,
        `${styleDesc}.`,
        `Smooth cinematic movement, professional lighting.`,
        `${actionDesc}.`,
        ``,
        `${genderVoice} Thai voice speaking.`,
        ``,
        `THAI VOICEOVER SCRIPT:`,
        `"${sceneTexts[0] || ''}"`,
        ``,
        `IMPORTANT: No CTA, no popup text, no floating text, no overlay text in the video. Maintain face/identity consistency from reference image.`
    ];

    const prompt = promptLines.join('\n');

    // Meta for building Scene 2+ prompts
    const meta: VideoPromptMeta = {
        style: styleDesc,
        aspectRatio,
        gender: genderText,
        genderVoice: `${genderVoice} Thai voice speaking`,
        expression: expressionText,
        camera: 'Smooth cinematic movement, professional lighting',
        product: config.productName,
        template: templateConfig.thaiName,
        restrictions: 'No CTA, no popup text, no floating text, no overlay text. Maintain face/identity consistency from reference image.'
    };

    console.log("\ud83d\udcdd Video prompt:", prompt.substring(0, 200) + "...");

    return { prompt, sceneScripts: sceneTexts, meta };
};

/**
 * Build a natural language video prompt for Scene 2+ using meta from Scene 1.
 * Includes ALL scene voiceover scripts for voice continuity context.
 */
export const buildSceneVideoPromptJSON = (
    meta: VideoPromptMeta,
    sceneScript: string,
    sceneNumber: number,
    allSceneScripts?: string[]
): string => {
    // Only this scene's script in voiceover
    const promptLines = [
        `Scene ${sceneNumber} - ${meta.template} video. Same person from previous scene, exact same face, outfit, and identity.`,
        `${meta.gender}, ${meta.expression} expression, continuing to present ${meta.product}.`,
        `${meta.style}.`,
        `${meta.camera}. Smooth transition from previous scene.`,
        `Continue presenting ${meta.product} naturally. Same person, same setting.`,
        ``,
        `${meta.genderVoice}, same pitch and tone as previous scene.`,
        ``,
        `THAI VOICEOVER SCRIPT:`,
        `"${sceneScript}"`,
        ``,
        `CONTINUITY: Same person identity, same voice, same outfit, same lighting, same background throughout all scenes.`,
        `${meta.restrictions} Same person identity, outfit, and voice from previous scene.`
    ];

    return promptLines.join('\n');
};

/**
 * Quick prompt generation without image analysis (for faster processing)
 */
export const generateQuickPrompts = (config: PromptGenerationConfig): GeneratedPrompts => {
    const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const durationConfig = DURATION_CONFIGS[config.clipDuration] || DURATION_CONFIGS[16];
    const videoResult = buildVideoPrompt(config, templateConfig, durationConfig, "");

    return {
        imagePrompt: buildImagePrompt(config, templateConfig, ""),
        videoPrompt: videoResult.prompt,
        sceneScripts: videoResult.sceneScripts,
        videoPromptMeta: videoResult.meta
    };
};
