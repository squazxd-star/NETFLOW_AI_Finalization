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

// ═══════════════════════════════════════════════════════════════════════════
// MASTER FORMULA — คัมภีร์ 5 ส่วน (The 5-Part Master Formula)
// Based on Gemini expert recommendation for TikTok-safe commercial prompts
// ═══════════════════════════════════════════════════════════════════════════

// Part 1: Product Highlight — material & texture descriptors per category
const PRODUCT_HIGHLIGHT: Record<ProductCategory, string> = {
    food: "appetizing presentation, visible texture and steam, vibrant natural food colors",
    fashion: "premium fabric texture, clean stitching details, elegant draping",
    gadget: "sleek modern design, brushed metal or matte finish, clean product lines",
    beauty: "elegant glass or matte packaging, dewy product texture, premium aesthetic",
    other: "high-quality product details, clean presentation, visible material texture"
};

// Part 2: Character & Video Dynamics — action descriptors per template
const CHARACTER_DYNAMICS: Record<string, string> = {
    "product-review": "holding the product naturally, showing it to camera with confident gestures, genuine reaction expressions",
    "brainrot-product": "fast energetic movements, exaggerated surprised reactions, pointing at product dramatically",
    "food-review": "picking up food with anticipation, taking first bite with genuine reaction, showing texture close-up",
    "fashion-review": "modeling the outfit with confident walk, showing fit from multiple angles, smooth pose transitions",
    "gadget-review": "hands-on demonstration, pressing buttons and showing features, clean hand movements",
    "unboxing": "carefully opening package with anticipation, slow reveal of product, excited first impression",
    "comparison": "holding two items side by side, pointing at differences, analytical gestures",
    "testimonial": "speaking directly to camera with sincerity, natural hand gestures, emotional connection",
    "flash-sale": "urgent excited movements, showing price/deal with energy, countdown energy",
    "tutorial": "step-by-step hand movements, clear demonstration, pointing at key features",
    "lifestyle": "naturally using product in daily routine, relaxed authentic movements, lifestyle integration",
    "trending": "following viral movement pattern, trendy gestures, social media aesthetic poses",
    "mini-drama": "acting out dramatic scene, emotional expressions, story-driven movements",
    "before-after": "showing transformation clearly, dramatic reveal moment, amazed reaction"
};

// Part 3: Environment Layering — background setting per template
const ENVIRONMENT_SETTING: Record<string, string> = {
    "product-review": "clean minimalist desk or table setup, soft-focus background, modern aesthetic room",
    "brainrot-product": "vibrant colorful background, trendy room setup, eye-catching environment",
    "food-review": "clean kitchen counter or restaurant setting, appetizing ambiance, warm inviting space",
    "fashion-review": "modern room with full-length mirror, clean urban backdrop, fashion-forward setting",
    "gadget-review": "minimalist tech workspace, clean desk with subtle gadgets, modern office aesthetic",
    "unboxing": "clean table surface with packaging, organized unboxing area, neutral backdrop",
    "comparison": "clean comparison surface, organized layout, neutral professional background",
    "testimonial": "cozy living room setting, warm homey atmosphere, relatable everyday environment",
    "flash-sale": "bright attention-grabbing backdrop, sale energy environment, dynamic setting",
    "tutorial": "well-organized workspace, clear demonstration surface, educational setting",
    "lifestyle": "beautiful living space, daily life environment, aesthetic home or outdoor setting",
    "trending": "trendy aesthetic backdrop, social media ready environment, modern stylish space",
    "mini-drama": "cinematic scene setting, mood-appropriate environment, story-driven backdrop",
    "before-after": "split-screen friendly clean background, transformation-ready setting, clear contrast environment"
};

// Part 4: Lighting & Mood — lighting style matched to voice tone
const LIGHTING_BY_TONE: Record<string, string> = {
    "energetic": "Bright natural sunlight, high-key lighting, vibrant and energetic colors, punchy contrast",
    "calm": "Soft diffused golden-hour light, low-key gentle illumination, warm muted pastels, serene atmosphere",
    "friendly": "Warm natural daylight, balanced soft exposure, inviting warm tones, approachable feel",
    "professional": "Clean studio softbox lighting, sharp defined shadows, neutral crisp palette, polished look"
};

// Part 5: Cinematic Quality — technical specs per template style
// Anti-Distortion: all entries use 85mm+ lens, zero distortion, symmetrical framing
const CINEMATIC_SPECS: Record<string, string> = {
    "product-review": "Professional product commercial, 85mm lens, zero lens distortion, frontal eye-level shot, perfectly centered, symmetrical composition, 4K, smooth transitions",
    "brainrot-product": "Handheld smartphone aesthetic, quick cuts, high frame rate, POV angles, vertical framing, zero lens distortion",
    "food-review": "Food photography style, 100mm macro lens, zero lens distortion, frontal eye-level, warm color grading, appetizing close-ups, 4K",
    "fashion-review": "Fashion editorial style, 85mm lens, zero lens distortion, full-body and detail shots, smooth tracking, runway-inspired, 4K",
    "gadget-review": "Tech review aesthetic, 85mm lens, zero lens distortion, frontal eye-level, clean product shots, hands-on close-ups, sharp focus, 4K",
    "unboxing": "ASMR unboxing style, 85mm lens, zero lens distortion, close-up hands, slow-motion reveals, crisp audio-visual, 4K",
    "comparison": "Clean split-frame capable, 85mm lens, zero lens distortion, perfectly centered, symmetrical composition, sharp focus, 4K",
    "testimonial": "Documentary interview style, 85mm lens, zero lens distortion, eye-level framing, shallow depth of field, natural look, 4K",
    "flash-sale": "High-energy commercial, 85mm lens, zero lens distortion, fast cuts, dynamic angles, bold color grading, high frame rate",
    "tutorial": "Educational demo style, 85mm lens, zero lens distortion, overhead and eye-level angles, clear step visibility, steady shots, 4K",
    "lifestyle": "Lifestyle vlog aesthetic, 85mm lens, zero lens distortion, natural movement, golden hour grading, cinematic wide and close shots",
    "trending": "TikTok viral aesthetic, vertical framing, zero lens distortion, trendy transitions, punchy color grading, high frame rate",
    "mini-drama": "Short film cinematic, 85mm lens, zero lens distortion, dramatic angles, emotional color grading, shallow DOF, 4K",
    "before-after": "Transformation reveal style, 85mm lens, zero lens distortion, locked-off comparison shots, perfectly centered, dramatic lighting shift, 4K"
};

// Anti-Distortion directive — injected into all image prompts
const ANTI_DISTORTION_DIRECTIVE = "PRODUCT ACCURACY: Frontal eye-level shot, perfectly centered, symmetrical composition. Shot on 85mm lens, f/8 aperture, zero lens distortion. High-end product photography, no perspective warping. If product has a label, use blank minimalist packaging with no text (add real logo in post-production).";

// Brand & Policy Safety — words to auto-sanitize from prompts
const BRAND_REPLACEMENTS: [RegExp, string][] = [
    [/\biphone\b/gi, "premium smartphone"],
    [/\bsamsung\b/gi, "flagship device"],
    [/\bapple\b(?!\s*(cider|juice|pie|fruit))/gi, "premium tech brand"],
    [/\bgoogle\b/gi, "major tech platform"],
    [/\bnike\b/gi, "athletic brand"],
    [/\badidas\b/gi, "sportswear brand"],
    [/\bgucci\b/gi, "luxury fashion brand"],
    [/\blouis vuitton\b/gi, "luxury brand"],
    [/\bchanel\b/gi, "high-end fashion brand"],
    [/\brolex\b/gi, "luxury watch brand"],
    [/\btiktok\b/gi, "short video platform"],
    [/\binstagram\b/gi, "social media platform"],
    [/\bfacebook\b/gi, "social network"],
    [/\byoutube\b/gi, "video platform"],
];

// Policy-unsafe keywords that should be stripped
const POLICY_UNSAFE_WORDS = [
    "sexy", "seductive", "cheap", "fake", "counterfeit",
    "miracle", "cure", "heal", "guaranteed results",
    "100% effective", "instant results", "magic",
    "weight loss", "slimming", "diet pill",
    "before and after medical", "surgical",
];

/** Sanitize brand names and policy-unsafe keywords from a prompt */
const sanitizePromptForPolicy = (text: string): string => {
    let result = text;
    for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
    }
    for (const word of POLICY_UNSAFE_WORDS) {
        const re = new RegExp(`\\b${word}\\b`, 'gi');
        result = result.replace(re, '');
    }
    // Clean up double spaces
    return result.replace(/\s{2,}/g, ' ').trim();
};

type ProductCategory = "food" | "fashion" | "gadget" | "beauty" | "other";

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
        "cosmetic", "beauty", "perfume", "fragrance", "cologne", "eau de", "toilette", "parfum",
        "lotion", "moisturizer", "foundation", "mascara", "blush", "concealer", "primer",
        "nail", "hair", "shampoo", "conditioner", "body wash", "deodorant",
        "crystal", "bright crystal", "versace",
        "สกินแคร์", "เครื่องสำอาง", "ลิป", "เซรั่ม", "ครีม", "กันแดด", "โฟม", "บำรุง",
        "น้ำหอม", "เพอร์ฟูม", "โคโลญ", "โลชั่น", "แชมพู", "ครีมอาบน้ำ", "มอยเจอร์ไรเซอร์",
        "รองพื้น", "มาสคาร่า", "บลัช", "คอนซีลเลอร์", "ไพรเมอร์"
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
    
    // Generate exactly 1 short script per scene (~8 seconds each, slow comfortable pace)
    // Each line should be 1-2 short sentences only — NOT crammed with text
    const sceneCount = Math.max(1, Math.floor(clipDuration / 8));
    let scriptParts: string[] = [];
    
    const rawOpeningHook = hookText || pickRandom(HOOK_VARIATIONS[template] || HOOK_VARIATIONS["product-review"]);
    const openingHook = ensureMentionsProductName(rawOpeningHook, productName);
    const rawClosingCTA = ctaText || pickRandom(CTA_VARIATIONS[saleStyle] || CTA_VARIATIONS["storytelling"]);
    const closingCTA = ensureMentionsProductName(rawClosingCTA, productName);

    if (sceneCount === 1) {
        // Single scene: hook + short benefit
        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${powerWord}!"`);
    } else if (sceneCount === 2) {
        // Scene 1: hook + introduce product
        if (category === "food") {
            scriptParts.push(`🎬 ฉาก1: "${openingHook} วันนี้ลองชิม ${productName} กัน!"`);
            scriptParts.push(`🎬 ฉาก2: "${benefit} ${closingCTA} ${urgency}"`);
        } else if (category === "fashion") {
            scriptParts.push(`🎬 ฉาก1: "${openingHook} วันนี้ลองใส่ ${productName} ให้ดูกัน!"`);
            scriptParts.push(`🎬 ฉาก2: "${benefit} ${closingCTA} ${urgency}"`);
        } else if (category === "gadget") {
            scriptParts.push(`🎬 ฉาก1: "${openingHook} วันนี้ลองใช้ ${productName} จริงๆ!"`);
            scriptParts.push(`🎬 ฉาก2: "${benefit} ${closingCTA} ${urgency}"`);
        } else {
            scriptParts.push(`🎬 ฉาก1: "${openingHook} มาดู ${productName} กัน!"`);
            scriptParts.push(`🎬 ฉาก2: "${benefit} ${closingCTA} ${urgency}"`);
        }
    } else {
        // 3+ scenes: hook → benefit/review → closing CTA
        scriptParts.push(`🎬 ฉาก1: "${openingHook} มาดู ${productName} กัน!"`);
        if (category === "food") {
            scriptParts.push(`🎬 ฉาก2: "ลองชิมแล้ว ${productName} ${powerWord} ${benefit}"`);
        } else if (category === "fashion") {
            scriptParts.push(`🎬 ฉาก2: "ใส่แล้ว ${productName} ${powerWord} ${benefit}"`);
        } else if (category === "gadget") {
            scriptParts.push(`🎬 ฉาก2: "ใช้จริงแล้ว ${productName} ${powerWord} ${benefit}"`);
        } else {
            scriptParts.push(`🎬 ฉาก2: "ลองใช้แล้ว ${productName} ${powerWord} ${benefit}"`);
        }
        scriptParts.push(`🎬 ฉาก3: "${closingCTA} ${urgency}"`);
        // Fill remaining scenes if > 3
        for (let i = 3; i < sceneCount; i++) {
            scriptParts.push(`� ฉาก${i + 1}: "${productName} ${pickRandom(SALES_BENEFITS)} ${pickRandom(URGENCY_PHRASES)}"`);
        }
    }
    
    return scriptParts.join("\n");
};

export interface PromptGenerationConfig {
    // Images
    productImage?: string;      // Base64
    
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
    
    // Video Settings (optional — defaults applied internally)
    clipDuration?: number;
    aspectRatio?: string;
    gender?: string;
    expression?: string;
    movement?: string;
    
    // User-provided script
    userScript?: string;
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
    pacing: string;
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
                        text: `Analyze this product image for TikTok commercial video generation.

Product Name: ${productName}

Describe using the 5-Part Formula:
1. PRODUCT HIGHLIGHT: Material, texture, finish, packaging details (e.g. "sleek matte white with brushed aluminum buttons")
2. CHARACTER ACTION: How a presenter should interact with this product (e.g. "gently holding and showing to camera")
3. ENVIRONMENT: Best background setting for this product (e.g. "bright minimalist bathroom with soft-focus plants")
4. LIGHTING: Ideal lighting style (e.g. "soft natural morning light, high-key, warm tones")
5. CINEMATIC: Best camera approach (e.g. "close-up product shots, 35mm lens feel")

Keep response concise (max 150 words). No brand names. Focus on visual details useful for video generation.`
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
        `Analyze this product image for TikTok commercial video generation.

Product Name: ${productName}

Describe using the 5-Part Formula:
1. PRODUCT HIGHLIGHT: Material, texture, finish, packaging details (e.g. "sleek matte white with brushed aluminum buttons")
2. CHARACTER ACTION: How a presenter should interact with this product (e.g. "gently holding and showing to camera")
3. ENVIRONMENT: Best background setting for this product (e.g. "bright minimalist bathroom with soft-focus plants")
4. LIGHTING: Ideal lighting style (e.g. "soft natural morning light, high-key, warm tones")
5. CINEMATIC: Best camera approach (e.g. "close-up product shots, 35mm lens feel")

Keep response concise (max 150 words). No brand names. Focus on visual details useful for video generation.`,
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
 * Parse AI vision analysis (numbered 1-5 format) into structured parts.
 * Returns an object with keys: product, character, environment, lighting, cinematic
 */
const parseAiAnalysis = (analysis: string): Record<string, string> => {
    const result: Record<string, string> = {};
    if (!analysis) return result;

    // Match patterns like "1. PRODUCT HIGHLIGHT: ..." or "1. **PRODUCT HIGHLIGHT**: ..."
    const patterns: [string, RegExp][] = [
        ["product",     /(?:1\.\s*\**PRODUCT\s*HIGHLIGHT\**\s*[:：]\s*)(.*?)(?=\n\s*2\.|$)/is],
        ["character",   /(?:2\.\s*\**CHARACTER\s*ACTION\**\s*[:：]\s*)(.*?)(?=\n\s*3\.|$)/is],
        ["environment", /(?:3\.\s*\**ENVIRONMENT\**\s*[:：]\s*)(.*?)(?=\n\s*4\.|$)/is],
        ["lighting",    /(?:4\.\s*\**LIGHTING\**\s*[:：]\s*)(.*?)(?=\n\s*5\.|$)/is],
        ["cinematic",   /(?:5\.\s*\**CINEMATIC\**\s*[:：]\s*)(.*?)$/is],
    ];

    for (const [key, regex] of patterns) {
        const match = analysis.match(regex);
        if (match?.[1]) {
            result[key] = match[1].trim().replace(/\*+/g, '');
        }
    }

    return result;
};

/**
 * Build Image Generation Prompt — คัมภีร์ 5 ส่วน (Master Formula)
 * When AI analysis exists, its 5 parts OVERRIDE template defaults.
 */
const buildImagePrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    productAnalysis: string
): string => {
    const genderText = config.gender === 'male' ? 'Thai man' : 'Thai woman';
    const expressionText = config.expression || 'happy and confident';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    
    const aspectRatio = config.aspectRatio || '9:16';
    const hasProductImage = !!config.productImage;

    // Parse AI analysis into structured parts (if available)
    const ai = parseAiAnalysis(productAnalysis);

    // ── Part 1: Product Highlight — AI-analyzed > template default ──
    const fallbackHighlight = PRODUCT_HIGHLIGHT[category];
    const productDesc = ai.product || fallbackHighlight;

    // ── Part 2: Character & Dynamics — AI-analyzed > template default ──
    const dynamics = ai.character || CHARACTER_DYNAMICS[template] || CHARACTER_DYNAMICS["product-review"];

    // ── Part 3: Environment — AI-analyzed > template default ──
    const environment = ai.environment || ENVIRONMENT_SETTING[template] || ENVIRONMENT_SETTING["product-review"];

    // ── Part 4: Lighting & Mood — AI-analyzed > voice-tone default ──
    const lighting = ai.lighting || LIGHTING_BY_TONE[config.voiceTone] || LIGHTING_BY_TONE["friendly"];

    // ── Part 5: Cinematic Quality — AI-analyzed > template default ──
    const cinematic = ai.cinematic || CINEMATIC_SPECS[template] || CINEMATIC_SPECS["product-review"];

    let prompt = `Professional ${templateConfig.thaiName} photograph.

[PRODUCT] ${config.productName}: ${productDesc}.
[CHARACTER] ${genderText}, ${expressionText} expression, ${dynamics}.
[SETTING] ${environment}.
[LIGHTING] ${lighting}.
[QUALITY] ${cinematic}, ${aspectRatio} orientation, photorealistic, no text overlays.

COMPOSITION: Character and product must be clearly visible together in the same frame. Product positioned naturally in hands or near the character.
${ANTI_DISTORTION_DIRECTIVE}

Reference Images:
- Image 1: Presenter face reference (must preserve exact face identity and gender)${hasProductImage ? `
- Image 2: Product reference (must preserve packaging and product type)` : ''}
- If text conflicts with images, images win.

${config.mustUseKeywords ? `Must include: ${config.mustUseKeywords}` : ''}
${config.avoidKeywords ? `Avoid: ${config.avoidKeywords}` : ''}`;

    return sanitizePromptForPolicy(prompt.trim());
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

    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';

    // ── 5-Part Master Formula lookups ──
    const productHighlight = PRODUCT_HIGHLIGHT[category];
    const dynamics = CHARACTER_DYNAMICS[template] || CHARACTER_DYNAMICS["product-review"];
    const environment = ENVIRONMENT_SETTING[template] || ENVIRONMENT_SETTING["product-review"];
    const lighting = LIGHTING_BY_TONE[config.voiceTone] || LIGHTING_BY_TONE["friendly"];
    const cinematic = CINEMATIC_SPECS[template] || CINEMATIC_SPECS["product-review"];

    const styleDesc = `${templateConfig.style}, ${saleStyle.approach}, ${dynamics}`;

    const aspectDirective = aspectRatio === '9:16'
        ? 'Aspect ratio: 9:16 vertical portrait framing.'
        : 'Aspect ratio: 16:9 horizontal landscape framing.';

    // Plain-text format — 5-Part Master Formula
    const prompt = sanitizePromptForPolicy([
        `[PRODUCT] ${config.productName}, ${productHighlight}.`,
        `[CHARACTER] ${genderText}, ${expressionText}, ${dynamics}.`,
        `[SETTING] ${environment}.`,
        `[LIGHTING] ${lighting}.`,
        `[QUALITY] ${cinematic}. ${durationConfig.pacing}.`,
        `${genderVoice} Thai voice speaking.`,
        `THAI VOICEOVER SCRIPT: "${sceneTexts[0] || ''}"`,
        `IMPORTANT: No CTA, no popup text, no floating text, no overlay text in the video. Maintain face/identity consistency from reference image. ${aspectDirective} No text overlays or subtitles. Same person identity, outfit, and voice from previous scene. Product must appear frontal, centered, symmetrical, zero lens distortion.`
    ].join(' '));

    // Meta for building Scene 2+ prompts (also uses 5-part)
    const meta: VideoPromptMeta = {
        style: styleDesc,
        aspectRatio,
        gender: genderText,
        genderVoice: `${genderVoice} Thai voice speaking`,
        expression: expressionText,
        camera: `${cinematic}. ${lighting}`,
        product: `${config.productName}, ${productHighlight}`,
        template: templateConfig.thaiName,
        pacing: durationConfig.pacing,
        restrictions: 'No CTA, no popup text, no floating text, no overlay text. Maintain face/identity consistency from reference image.'
    };

    console.log("\ud83d\udcdd Video prompt:", prompt.substring(0, 200) + "...");

    return { prompt, sceneScripts: sceneTexts, meta };
};

/**
 * Build a plain-text video prompt for Scene 2+ using meta from Scene 1.
 * Uses the same proven format as Scene 1. Only the THAI VOICEOVER SCRIPT changes per scene.
 */
export const buildSceneVideoPromptJSON = (
    meta: VideoPromptMeta,
    sceneScript: string,
    sceneNumber: number
): string => {
    const cleanScript = sceneScript.trim().replace(/^"+|"+$/g, '').trim();
    const aspectDirective = meta.aspectRatio === '9:16'
        ? 'Aspect ratio: 9:16 vertical portrait framing.'
        : 'Aspect ratio: 16:9 horizontal landscape framing.';
    const transitionNote = sceneNumber > 1 ? ' Continue seamlessly from previous clip with natural transition from last frame.' : '';

    return [
        `${meta.pacing} ${meta.template} video.`,
        `${meta.gender}, ${meta.expression}, presenting ${meta.product}.`,
        `${meta.style}.`,
        `${meta.camera}.`,
        `Movement: active. ${meta.pacing}.`,
        `${meta.genderVoice}.`,
        `THAI VOICEOVER SCRIPT: "${cleanScript}"`,
        `IMPORTANT: No CTA, no popup text, no floating text, no overlay text in the video. Maintain face/identity consistency from reference image. ${aspectDirective} No text overlays or subtitles. Same person identity, outfit, and voice from previous scene${transitionNote}`
    ].join(' ');
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
