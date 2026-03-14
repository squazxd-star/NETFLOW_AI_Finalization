/**
 * AI Prompt Generation Service
 * Supports both OpenAI (GPT-4o) and Gemini for vision analysis and prompt generation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";
import { TemplateOption } from "../types/netflow";
import { ProductCategory, CATEGORY_ENVIRONMENTS } from "../data/categoryEnvironments";

// Template descriptions for prompt building
const TEMPLATE_CONFIGS: Record<TemplateOption, { thaiName: string; englishName: string; style: string; focus: string }> = {
    "product-review": {
        thaiName: "รีวิวสินค้า",
        englishName: "Product Review",
        style: "Honest review style, authentic reaction",
        focus: "Show genuine reaction to the product, highlight key features"
    },
    "brainrot-product": {
        thaiName: "Brainrot + Product",
        englishName: "Viral Product Showcase",
        style: "Gen-Z viral style, fast cuts, chaotic energy",
        focus: "Quick attention-grabbing movements, meme-like expressions"
    },
    "food-review": {
        thaiName: "รีวิวอาหาร",
        englishName: "Food Review",
        style: "Food review style, appetizing close-ups, authentic tasting reaction",
        focus: "Show texture, steam/sizzle, first bite reaction, and why it's delicious"
    },
    "fashion-review": {
        thaiName: "รีวิวเสื้อผ้า",
        englishName: "Fashion Review",
        style: "Fashion review style, clean styling, confident try-on",
        focus: "Show fit, fabric, movement, before/after look, and how to style it"
    },
    "gadget-review": {
        thaiName: "รีวิวแกดเจ็ต",
        englishName: "Gadget Review",
        style: "Gadget review style, hands-on demo, clear benefits",
        focus: "Show key features, real usage demo, and tangible results"
    },
    "unboxing": {
        thaiName: "แกะกล่อง",
        englishName: "Unboxing",
        style: "ASMR unboxing, slow reveal, anticipation",
        focus: "Hands opening package, reveal moment, first impression reaction"
    },
    "comparison": {
        thaiName: "เปรียบเทียบ",
        englishName: "Product Comparison",
        style: "Side-by-side comparison, analytical",
        focus: "Show before/after or compare with other products"
    },
    "testimonial": {
        thaiName: "รีวิวลูกค้า",
        englishName: "Customer Testimonial",
        style: "Authentic customer story, emotional connection",
        focus: "Personal experience sharing, genuine emotions"
    },
    "flash-sale": {
        thaiName: "Flash Sale",
        englishName: "Flash Sale",
        style: "Urgent, high energy, countdown vibe",
        focus: "Fast movements, excitement, urgency in expression"
    },
    "tutorial": {
        thaiName: "สอนวิธีใช้",
        englishName: "How-To Tutorial",
        style: "Step-by-step demonstration, educational",
        focus: "Clear hand movements showing how to use product"
    },
    "lifestyle": {
        thaiName: "ไลฟ์สไตล์",
        englishName: "Lifestyle",
        style: "Day-in-life aesthetic, natural integration",
        focus: "Product naturally integrated into daily routine"
    },
    "trending": {
        thaiName: "ตามเทรนด์",
        englishName: "Trending",
        style: "Trending TikTok style, viral format",
        focus: "Follow current viral video format and movements"
    },
    "mini-drama": {
        thaiName: "มินิดราม่า",
        englishName: "Mini-Drama",
        style: "Short drama scene, storytelling with twist",
        focus: "Acting scene with emotional arc, product as solution"
    },
    "before-after": {
        thaiName: "ก่อน-หลัง",
        englishName: "Before-After",
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

// ═══════════════════════════════════════════════════════════════════════════
// SHARED MAPS — Used by both buildImagePrompt and buildVideoPrompt
// ═══════════════════════════════════════════════════════════════════════════

// Expression mapping (form value → descriptive English)
const EXPRESSION_MAP: Record<string, string> = {
    neutral: "natural relaxed neutral expression",
    happy: "subtle natural smile, relaxed facial muscles (no exaggerated grin)",
    excited: "bright confident expression, engaged eyes",
    serious: "professional focused expression"
};

// Video Style mapping (form value → descriptive English for prompts)
const VIDEO_STYLE_MAP: Record<string, string> = {
    "ugc-review": "authentic UGC style, raw and realistic smartphone footage look",
    "cgi-realistic": "hyper-realistic CGI render, ultra-high fidelity, Unreal Engine 5 style",
    "hands-only": "hands-only perspective, POV showing hands interacting with product",
    "cute-dance": "cute upbeat style, slight rhythmic swaying or trendy dance movement",
    "runway": "fashion runway style, walking confidently toward camera, dramatic flair",
    "product-demo": "clean product demonstration style, clear and focused on functionality",
    "lifestyle": "natural lifestyle aesthetic, everyday life integration, candid feel",
    "studio": "professional commercial studio setup, clean backdrop, controlled environment",
    "outdoor": "beautiful outdoor setting, natural sunlight, dynamic natural backdrop",
    "hook-pain": "dramatic pain-point hook, slightly tense or distressed initial expression",
    "educational": "informative educational style, informative gestures, professional tone",
    "opinion": "candid opinion sharing style, talking directly to camera, conversational",
    "problem-solution": "problem-solution narrative style, transition from frustrated to relieved",
    "comedy": "lighthearted comedic style, exaggerated facial expressions, fun vibe",
    "theater-drama": "theatrical dramatic lighting, emotional intensity, cinematic mood",
    "musical": "rhythmic musical visual style, synchronized dynamic movements",
    "action": "high-energy action style, fast movement, dynamic camera angles",
    "mild-horror": "moody dark lighting, slight mild tension, cinematic thriller vibe",
    "fantasy": "magical fantasy aesthetic, ethereal lighting, dreamy soft-focus",
    "scifi": "futuristic sci-fi aesthetic, neon lighting, clean high-tech environment",
    "timelapse": "time-lapse effect feel, showing progression or process quickly",
    "behind-the-scenes": "behind-the-scenes documentary style, candid, handheld camera feel",
    "challenge": "social media challenge style, enthusiastic, engaging direct eye contact",
    "comparison": "side-by-side comparison style, analytical setup, clear visual contrast",
    "tutorial": "step-by-step tutorial style, clear instructional framing, focus on hands/actions",
    "interview": "professional interview setup, off-camera eyeline, documentary style lighting",
    "vlog": "casual vlog style, handheld selfie-camera perspective, intimate and personal",
    "storytelling": "intimate storytelling style, soft lighting, close connection with viewer",
    "reaction": "genuine authentic reaction shot, wide eyes, surprised or impressed expression",
    "unboxing": "satisfying unboxing perspective, focus on packaging reveal, anticipation",
    "straight-review": "straightforward honest review, neutral setting, factual and clear",
    "transformation": "dramatic transformation reveal, clear before-and-after contrast",
    "stop-motion": "stop-motion animation aesthetic, slightly staggered frame rate feel",
    "split-screen": "split-screen aesthetic, multiple perspectives simultaneously",
    "first-person": "first-person POV camera angle, viewer's perspective looking at hands/product",
    "aesthetic": "highly aesthetic Pinterest style, soft pastel colors, visually pleasing composition",
    "vintage": "retro vintage film aesthetic, film grain, nostalgic color grading, 90s camcorder feel",
    "futuristic": "sleek futuristic look, holographic UI elements, advanced technology vibe",
    "nature": "lush nature documentary style, vibrant greens, beautiful natural environment",
    "city": "dynamic urban city aesthetic, street photography style, bustling background",
    "minimal": "clean minimalist aesthetic, negative space, simple uncluttered composition",
    "chaotic": "chaotic Gen-Z viral style, fast cuts, high visual energy, memetic feel",
    "satisfying": "oddly satisfying ASMR style, ultra-smooth movement, hyper-focus on texture",
    "epic": "epic cinematic blockbuster style, dramatic sweeping camera, heroic lighting",
    "cute": "kawaii cute aesthetic, soft lighting, pastel tones, adorable vibe",
    "mysterious": "mysterious enigmatic vibe, low-key lighting, shadows, intriguing mood",
    "inspirational": "uplifting inspirational mood, golden hour lighting, hopeful atmosphere",
    "urgent": "urgent flash-sale style, high-tension energy, immediate action required vibe",
    "relaxing": "calm relaxing zen aesthetic, soft diffused lighting, slow gentle movements"
};

// Clothing style → descriptive English
const CLOTHING_MAP: Record<string, string> = {
    casual: "casual everyday wear", formal: "elegant formal attire",
    sporty: "athletic sporty outfit", fashion: "trendy fashion-forward outfit",
    uniform: "clean professional uniform"
};

// ── OUTFIT_PROMPT_MAP: characterOutfit → array of diverse English prompt descriptions ──
// Each outfit has 3-5 variants — picked randomly each generation so prompts never repeat.
const OUTFIT_PROMPT_MAP: Record<string, string[]> = {
    "tshirt-casual": [
        "relaxed cotton crew-neck t-shirt with comfortable fit, paired with casual pants",
        "soft everyday round-neck tee in solid color, untucked relaxed style",
        "classic cotton t-shirt with natural drape, casual effortless vibe",
        "basic premium-cotton tee with clean neckline, relaxed street-ready look",
    ],
    "shirt-button": [
        "crisp button-down collared shirt with rolled-up sleeves, smart casual look",
        "tailored cotton dress shirt with neat collar, tucked in with polished style",
        "clean pressed button-up shirt with structured collar, professional yet approachable",
        "classic oxford button-down shirt, sleeves folded to elbow, refined casual aesthetic",
    ],
    "polo": [
        "fitted polo shirt with neat collar, smart-casual preppy style",
        "cotton piqué polo with subtle texture, collar slightly popped, clean sporty look",
        "classic polo shirt in solid color, buttons half-open, relaxed confident vibe",
    ],
    "hoodie": [
        "cozy oversized hoodie with front kangaroo pocket, relaxed streetwear energy",
        "soft fleece zip-up hoodie with drawstring hood, comfortable casual style",
        "premium cotton hoodie with clean silhouette, laid-back urban look",
        "thick pullover hoodie with ribbed cuffs, warm cozy everyday wear",
    ],
    "sweater-knit": [
        "soft chunky knit sweater with cable pattern, warm cozy aesthetic",
        "fine-gauge merino wool sweater with crew neck, elegant understated warmth",
        "oversized ribbed knit pullover in neutral tone, relaxed autumn/winter style",
        "cashmere-blend turtleneck sweater, smooth luxurious texture, sophisticated warmth",
    ],
    "jacket-denim": [
        "classic blue denim jacket with metal buttons, casual rugged Americana style",
        "fitted washed denim jacket with turned-up collar, effortless cool look",
        "vintage-wash jean jacket with chest pockets, layered over casual outfit",
    ],
    "jacket-leather": [
        "black leather biker jacket with silver zippers, edgy rebellious style",
        "sleek fitted leather jacket with mandarin collar, sharp modern silhouette",
        "vintage brown leather jacket with worn patina, rugged sophisticated look",
    ],
    "blazer": [
        "tailored single-breasted blazer over casual tee, smart-casual layered look",
        "structured fitted blazer with peak lapels, polished business-casual style",
        "relaxed unstructured linen blazer, sleeves pushed up, effortless elegance",
    ],
    "suit-formal": [
        "sharp tailored two-piece suit with pressed trousers, formal executive look",
        "classic fitted business suit with crisp white shirt and tie, professional authority",
        "modern slim-fit suit in dark tone, clean lines, confident corporate style",
        "elegant double-breasted suit with satin lapels, sophisticated formal presence",
    ],
    "tank-top": [
        "casual summer outfit with sleeveless top, relaxed warm-weather look",
        "clean cotton sleeveless top with scoop neck, relaxed warm-weather look",
        "athletic-fit sleeveless top, sporty confident casual energy",
    ],
    "crop-top": [
        "trendy short top with high-waist bottoms, youthful fashionable look",
        "fitted short top paired with high-waisted jeans",
        "off-shoulder blouse, feminine stylish summer aesthetic",
        "sporty short tank with matching high-waist leggings, gym-to-street style",
    ],
    "oversize-tee": [
        "baggy oversized graphic tee tucked at front, effortless street style",
        "extra-large drop-shoulder t-shirt with relaxed fit, trendy Gen-Z aesthetic",
        "loose oversized cotton tee dress-length, comfortable gender-neutral look",
    ],
    "dress-casual": [
        "flowy casual midi dress with relaxed silhouette, easy everyday elegance",
        "soft cotton wrap dress with subtle print, feminine laid-back charm",
        "simple A-line day dress in solid color, comfortable effortless style",
        "breezy shirt dress with belt cinch, casual smart weekend look",
    ],
    "dress-elegant": [
        "stunning floor-length evening gown with elegant draping, red-carpet glamour",
        "sleek fitted cocktail dress with sophisticated neckline, luxurious fabric sheen",
        "structured satin midi dress with clean lines, understated timeless elegance",
        "flowing chiffon formal dress with delicate details, ethereal graceful beauty",
    ],
    "dress-korean": [
        "pastel Korean-style midi dress with puff sleeves, soft feminine K-fashion look",
        "fitted Korean minimalist dress with clean collar, sweet elegant aesthetic",
        "romantic floral Korean dress with cinched waist, K-drama inspired style",
        "layered Korean-style outfit with pleated skirt and knit vest, cute coordinated look",
    ],
    "dress-mini": [
        "chic fitted short dress with modern cut, confident youthful style",
        "flirty A-line short dress with structured bodice, playful party-ready look",
        "modern short dress with sleek fabric, bold fashion-forward silhouette",
    ],
    "skirt-outfit": [
        "pleated midi skirt with tucked-in blouse, feminine polished look",
        "high-waisted A-line skirt with cropped top, balanced elegant proportion",
        "flowing maxi skirt with fitted top, bohemian romantic style",
        "structured pencil skirt with silk blouse, professional feminine power look",
    ],
    "jeans-outfit": [
        "classic straight-leg jeans with casual top, timeless denim everyday style",
        "slim-fit dark wash jeans with fitted tee, clean modern casual look",
        "high-waisted boyfriend jeans with tucked shirt, relaxed trendy aesthetic",
        "distressed skinny jeans with leather jacket, edgy urban street style",
    ],
    "sportswear": [
        "matching athletic tracksuit with zippered jacket, sporty dynamic energy",
        "breathable sports jersey with athletic shorts, game-ready active look",
        "sleek performance sportswear with moisture-wicking fabric, competitive athlete style",
    ],
    "gym-wear": [
        "fitted compression gym top with athletic leggings, workout-ready appearance",
        "athletic tank top with training shorts, sweat-ready gym aesthetic",
        "athletic top and high-waist leggings set, active fitness look",
        "performance dry-fit gym outfit, active training style",
    ],
    "yoga-wear": [
        "stretchy yoga pants with fitted crop top, zen athletic flexibility",
        "seamless yoga set in earthy tones, mindful movement aesthetic",
        "flowing yoga top with flexible leggings, balanced calm-energy style",
    ],
    "streetwear": [
        "bold graphic hoodie with cargo pants and chunky sneakers, urban streetwear flex",
        "oversized bomber jacket with baggy jeans and bucket hat, hypebeast aesthetic",
        "layered streetwear with zip-up vest and joggers, edgy city style",
        "vintage band tee with wide-leg pants and platform shoes, alternative street look",
    ],
    "vintage": [
        "retro 70s-inspired outfit with flared pants and patterned shirt, nostalgic vintage charm",
        "classic 90s grunge flannel over band tee with ripped jeans, throwback cool",
        "elegant vintage-style tea dress with pearl accessories, timeless retro beauty",
        "old-school varsity jacket with high-waist trousers, preppy vintage aesthetic",
    ],
    "minimal-chic": [
        "clean monochrome outfit with structured silhouette, effortless minimalist elegance",
        "neutral-tone fitted basics with one statement piece, curated minimalist style",
        "simple white shirt with tailored black trousers, sleek understated chic",
        "muted earth-tone layered outfit, Scandinavian minimalist aesthetic",
    ],
    "korean-style": [
        "soft pastel coordinated K-fashion outfit, clean youthful Korean aesthetic",
        "oversized blazer with pleated skirt and loafers, trendy Seoul street style",
        "layered Korean casual with knit vest over shirt, cute balanced proportion",
        "fitted turtleneck with wide-leg pants, modern Korean minimalist look",
    ],
    "japanese-style": [
        "structured Japanese streetwear with clean lines, Harajuku-meets-minimal aesthetic",
        "layered Japanese casual with oversized silhouette, Uniqlo-inspired simplicity",
        "modern kimono-inspired wrap top with wide pants, contemporary Japanese fusion",
        "clean Japanese workwear with utility details, functional aesthetic style",
    ],
    "thai-traditional": [
        "elegant Thai silk outfit with intricate patterns, traditional cultural beauty",
        "modern Thai-inspired dress with silk details, contemporary Thai elegance",
        "classic Thai traditional formal wear with gold embroidery, regal heritage style",
    ],
    "uniform-nurse": [
        "clean white nurse uniform with professional cap, trustworthy medical professional look",
        "modern medical scrubs in soft blue, healthcare professional appearance",
        "crisp nursing uniform with stethoscope, caring medical staff aesthetic",
    ],
    "uniform-office": [
        "professional office blouse with pencil skirt, corporate business attire",
        "smart office shirt with tailored trousers, polished workplace look",
        "business-casual blazer with dress pants, modern office professional style",
    ],
    "uniform-school": [
        "classic school uniform with white shirt and dark skirt/pants, student look",
        "neat school uniform with tie and blazer, well-dressed student style",
        "clean pressed school uniform, youthful academic aesthetic",
    ],
    "uniform-chef": [
        "professional white chef coat with double-breasted buttons, culinary expert look",
        "clean chef uniform with toque hat, professional kitchen authority",
        "modern chef jacket with rolled sleeves, contemporary culinary style",
    ],
    "pajamas": [
        "soft silk pajama set with relaxed fit, luxurious at-home comfort",
        "cozy cotton loungewear with cute pattern, warm bedtime aesthetic",
        "matching satin sleepwear set, elegant comfortable nighttime style",
    ],
    "beach-wear": [
        "breezy linen beach outfit with sun hat, tropical vacation vibes",
        "colorful floral resort wear with sandals, summer beach-ready look",
        "casual beach cover-up, coastal holiday style",
    ],
    "luxury-brand": [
        "high-end designer outfit with impeccable tailoring, luxury fashion statement",
        "premium branded ensemble with signature details, affluent sophisticated style",
        "couture-inspired outfit with luxurious fabric and accessories, elite fashion presence",
    ],
    "cardigan": [
        "soft knit cardigan over simple tee, cozy layered casual warmth",
        "oversized chunky cardigan with buttons open, relaxed autumn comfort",
        "fitted ribbed cardigan with delicate buttons, polished feminine layering",
    ],
    "trenchcoat": [
        "classic beige trench coat with belt cinched, timeless Parisian elegance",
        "long structured trench coat over fitted outfit, sophisticated autumn style",
        "modern oversized trench in neutral tone, dramatic fashion-forward silhouette",
    ],
    "bomber-jacket": [
        "satin bomber jacket with ribbed cuffs, sporty urban cool",
        "classic MA-1 bomber with patch details, military-inspired street style",
        "sleek fitted bomber jacket in dark tone, modern casual edge",
    ],
    "linen-casual": [
        "breathable linen shirt with matching pants, relaxed summer Mediterranean style",
        "natural linen tunic with cotton bottoms, effortless warm-weather elegance",
        "loose-fit linen blouse with high-waist linen trousers, coastal resort aesthetic",
    ],
    "ruffle-blouse": [
        "romantic ruffle-front blouse with tiered detail, feminine elegant charm",
        "soft chiffon blouse with cascading ruffles, delicate fashion-forward look",
        "Victorian-inspired ruffle-collar blouse, dramatic sophisticated feminine style",
    ],
    "off-shoulder": [
        "elegant off-shoulder top revealing collarbones, romantic feminine allure",
        "structured Bardot neckline blouse, sophisticated shoulder-baring style",
        "flowing off-shoulder dress with cinched waist, graceful evening elegance",
    ],
};

// Helper: pick random outfit prompt variant
function getOutfitDescription(outfitKey?: string): string {
    if (!outfitKey) return "casual everyday wear";
    if (outfitKey === "original") return "EXACTLY the same clothing visible in the reference image — preserve every detail of the outfit including color, pattern, fabric, fit, and accessories. Do NOT change or replace any clothing item.";
    const variants = OUTFIT_PROMPT_MAP[outfitKey];
    if (!variants || variants.length === 0) return "casual everyday wear";
    return variants[Math.floor(Math.random() * variants.length)];
}

// Helper: detect if character description explicitly mentions clothing/outfit
// When true, the user's text-based clothing description takes priority over the outfit dropdown.
function descriptionHasExplicitClothing(desc: string): boolean {
    if (!desc) return false;
    const d = desc.toLowerCase();
    const clothingPattern = /ใส่ชุด|ใส่เสื้อ|สวมชุด|สวมเสื้อ|ใส่กางเกง|ใส่กระโปรง|ชุดนักเรียน|ชุดพยาบาล|ชุดทำงาน|ชุดนอน|ชุดกีฬา|ชุดว่ายน้ำ|ชุดเดรส|ชุดสูท|ชุดไทย|ชุดครัว|ชุดเชฟ|ชุดยิม|ชุดโยคะ|ชุดออกกำลังกาย|ชุดฟอร์มอล|ชุดราตรี|ชุดแฟชั่น|เสื้อฮู้ด|เสื้อเชิ้ต|เสื้อยืด|เสื้อโปโล|เสื้อกล้าม|เสื้อครอป|เสื้อแจ็คเก็ต|เสื้อสูท|เสื้อกันหนาว|เสื้อผ้า|กางเกงยีนส์|กระโปรง|wearing|dressed in/i;
    return clothingPattern.test(d);
}

// Helper: detect if character description explicitly mentions hairstyle
// When true, skips generating a random default hairstyle to avoid conflicts.
function descriptionHasExplicitHair(desc: string): boolean {
    if (!desc) return false;
    const d = desc.toLowerCase();
    const hairPattern = /ผม|hair|หน้าม้า|เปีย|ลอน|หยิก|ทรงผม/i;
    return hairPattern.test(d);
}

// ═══════════════════════════════════════════════════════════════════════════
// MASTER FORMULA — คัมภีร์ 5 ส่วน (The 5-Part Master Formula)
// Based on Gemini expert recommendation for platform-safe commercial prompts
// ═══════════════════════════════════════════════════════════════════════════

// Part 1: Product Highlight — Technical Layers: [Material/Texture] + [Surface Detail] + [Lighting Response]
// Uses studio-grade descriptors so AI renders product with maximum physical accuracy
const PRODUCT_HIGHLIGHT: Partial<Record<ProductCategory, string>> = {
    food: "appetizing presentation with visible micro-texture, natural steam wisps, vibrant saturated food colors under warm three-point lighting, fresh ingredients with visible moisture droplets, macro-level surface detail",
    beverage: "condensation droplets on polished glass surface, rich translucent liquid color with caustics light refraction, visible pour dynamics or carbonation fizz, crisp rim lighting on glass edges, reflective surface highlights",
    fashion: "premium woven fabric texture with visible thread count, clean precision stitching, natural gravity-driven draping, soft directional lighting revealing fabric weave pattern, matte or satin material finish",
    gadget: "precision-machined surface with brushed aluminum or anodized metal finish, sharp chamfered edges catching rim light, clean product lines with reflective highlights, matte-gloss contrast on surfaces, studio softbox lighting",
    beauty: "elegant frosted glass or high-gloss packaging with visible light refraction, metallic cap with polished chrome or gold finish, dewy surface texture, soft beauty lighting with three-point setup, premium cosmetic studio aesthetic",
    supplement: "clean clinical matte packaging with crisp printing, visible capsule translucency or tablet surface texture, health-forward branding, softbox even illumination, athletic fit presenter with toned physique holding product confidently",
    pet: "durable pet-safe materials with visible texture, vibrant fun packaging with glossy print finish, quality construction details, bright even lighting, animal-friendly design aesthetic",
    baby: "soft pastel tones with gentle matte finish, BPA-free safe materials with smooth surface, rounded edges with no sharp points, warm diffused lighting, parent-trusted premium quality feel",
    home: "premium household material with visible grain or weave, clean modern industrial design, functional elegance with precise construction, lifestyle-integrated styling, natural window light aesthetic",
    kitchen: "durable cooking-grade stainless steel or ceramic material, heat-resistant matte or enamel finish, ergonomic handle design with visible grip texture, professional studio overhead lighting",
    fitness: "sweat-resistant textured material with matte grip surface, bold sporty design with precision molding, durable reinforced construction, high-energy studio lighting, athletic fit presenter with muscular toned physique",
    auto: "precision-engineered surface with metallic or carbon-fiber weave texture, polished chrome or matte black finish, rugged automotive-grade construction, dramatic side lighting revealing surface detail",
    jewelry: "brilliant gemstone with visible internal facet sparkle and light dispersion, polished precious metal with mirror-like reflective surface, intricate micro-craftsmanship detail, dramatic spotlight with deep bokeh",
    watch: "precise dial with visible minute markers and hands, premium leather or brushed metal strap texture, polished case with reflective bezel catching light, sapphire crystal face, sophisticated macro-detail lighting",
    bag: "premium leather grain texture or woven fabric with visible stitch pattern, polished metal hardware with reflective highlights, clean precision stitching, structured silhouette with natural shadow",
    shoe: "detailed outsole tread pattern, premium upper material with visible texture grain, clean profile lines with precise construction, comfort-engineered cushion visible at cross-section, studio side lighting",
    book: "crisp high-resolution cover printing, quality paper edge texture, engaging visual cover layout, even diffused top lighting",
    toy: "vibrant safe glossy colors, smooth injection-molded rounded edges, durable play-tested ABS plastic material, fun dynamic design, bright cheerful lighting",
    stationery: "smooth precision-ground writing surface, machined metal or molded polymer body, clean minimalist design with visible material quality, satisfying tactile finish, soft desk lamp lighting",
    cleaning: "transparent or translucent bottle with visible liquid formula, crisp packaging printing, ergonomic grip-textured bottle design, professional clean-white lighting aesthetic",
    outdoor: "weather-resistant ripstop or Cordura material with visible weave, rugged reinforced construction with metal hardware, adventure-ready functional design, natural outdoor golden-hour lighting",
    health: "medical-grade precision instrument with clean sterile white finish, sharp markings, clinical packaging, bright even clinical lighting, trustworthy professional design",
    craft: "rich artisan texture with visible handmade imperfections, natural wood or fiber material warmth, detailed craftsmanship visible at macro level, warm workshop ambient lighting",
    digital: "clean high-resolution UI interface on screen, modern flat design, intuitive layout visible on device display, cool-toned tech lighting with screen glow",
    other: "high-quality product surface with visible material texture and finish detail, clean professional presentation, precise construction, studio three-point lighting setup"
};

// Part 2: Character & Video Dynamics — action descriptors per template
const CHARACTER_DYNAMICS: Record<string, string> = {
    "product-review": "presenter gripping the product firmly with one hand, showing it to camera with confident gestures, genuine reaction expressions",
    "brainrot-product": "presenter with fast energetic movements, exaggerated surprised reactions, pointing at product dramatically",
    "food-review": "presenter picking up food with steady hand, tasting with genuine reaction, showing texture close-up",
    "fashion-review": "presenter demonstrating the product with confident posture, showing product details from multiple angles, smooth professional presentation",
    "gadget-review": "presenter hands-on demonstration, pressing buttons and showing features, clean hand movements",
    "unboxing": "presenter carefully opening package with both hands, slow reveal of product, excited first impression",
    "comparison": "presenter gripping one item per hand firmly, pointing at differences, analytical gestures",
    "testimonial": "presenter speaking directly to camera with sincerity, natural hand gestures, emotional connection",
    "flash-sale": "presenter with urgent excited movements, showing product with energy, enthusiastic presentation",
    "tutorial": "presenter step-by-step hand movements, clear demonstration, pointing at key features",
    "lifestyle": "presenter naturally using product in daily routine, relaxed authentic movements, lifestyle setting",
    "trending": "presenter with trendy gestures, dynamic presentation, social media style delivery",
    "mini-drama": "presenter with expressive storytelling movements, emotional presentation, story-driven delivery",
    "before-after": "presenter showing product transformation clearly, dramatic reveal moment, amazed reaction"
};

// Part 3: Environment Layering — background setting per template (base)
const ENVIRONMENT_SETTING: Record<string, string> = {
    "product-review": "clean minimalist desk or table setup, soft-focus background, modern aesthetic room",
    "brainrot-product": "vibrant colorful background, trendy room setup, eye-catching environment",
    "food-review": "clean kitchen counter or restaurant setting, appetizing ambiance, warm inviting space",
    "fashion-review": "modern clean studio backdrop, urban aesthetic, professional presentation setting",
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

// ═══════════════════════════════════════════════════════════════════════════
// USER-SELECTED BACKGROUND — maps UI background picker values to English prompts
// Priority: user-selected > smart environment (when not "auto")
// ═══════════════════════════════════════════════════════════════════════════
const USER_BACKGROUND_MAPPING: Record<string, string[]> = {
    "studio": [
        "professional photography studio with clean white seamless backdrop, controlled soft diffused lighting, product-focused minimal environment",
        "sleek grey photography studio with large softbox key lights, reflective glossy floor, high-end commercial shoot setting",
        "bright airy studio with natural daylight windows, white cyclorama wall, minimalist clean aesthetic, fashion shoot vibe",
        "dark studio with dramatic single spotlight, deep black backdrop, moody cinematic product lighting, high contrast",
        "modern content-creator studio with ring light glow, neutral grey wall, professional yet approachable setting",
        "warm-toned studio with honey-colored wooden panel accent wall, soft key light from left, cozy editorial feel",
        "industrial-chic studio with exposed concrete ceiling, polished floor, dramatic rim lighting from behind, edgy modern vibe",
        "pastel pink studio backdrop with soft fill light, feminine beauty brand aesthetic, clean dreamy atmosphere",
        "all-black void studio with colored gel lights in teal and orange, dramatic creative portrait lighting",
        "classic film studio set with vintage C-stands and flags visible, cinematic behind-the-scenes atmosphere",
        "high-key studio with dual softboxes, pure white floor and walls, blown-out bright catalog-ready lighting",
        "neon-accented studio with LED strip frame on dark wall, modern music video aesthetic, colorful creative energy",
        "natural light loft studio with floor-to-ceiling windows, white brick wall, golden afternoon light streaming in",
        "minimalist concrete studio with single overhead pendant light, raw architectural aesthetic, gallery-like setting",
        "luxury studio with velvet draped backdrop, crystal chandelier overhead, glamorous high-fashion shoot environment",
        "retro 70s-style studio with warm amber backdrop, vintage lens flare, nostalgic film grain aesthetic",
        "outdoor portable studio setup with collapsible backdrop, natural rim light from sun, on-location shoot feel",
        "blue-toned cool studio with steel grey backdrop, crisp directional lighting, tech product photography setting",
        "green screen studio with professional chroma key backdrop, even flat lighting, production-ready environment",
        "cozy home studio corner with fairy string lights on wall, warm desk lamp, intimate creator aesthetic",
    ],
    "living-room": [
        "cozy modern living room with warm ambient lighting, comfortable sofa and soft furnishings, homey relatable atmosphere, natural window light",
        "Scandinavian-style living room with light wood floors, minimalist white sofa, large windows with sheer curtains, airy bright space",
        "luxurious living room with plush velvet sofa, coffee table with books, warm golden floor lamp, elegant yet comfortable feel",
        "modern Thai condo living room with city view through glass balcony door, contemporary furniture, soft evening ambient light",
        "bohemian living room with textured throw pillows, indoor plants, woven rug, warm earthy tones, relaxed creative atmosphere",
        "mid-century modern living room with teak furniture, geometric rug, warm floor lamp, retro sophisticated charm",
        "Japanese minimalist living room with tatami mat area, low wooden table, shoji screen light, serene zen space",
        "coastal living room with white-washed walls, sea-blue accents, rattan furniture, breezy tropical morning light",
        "industrial loft living room with exposed brick wall, metal bookshelf, leather sofa, urban creative atmosphere",
        "traditional Thai living room with teak wood floor, silk cushions, warm pendant light, cultural elegance",
        "penthouse living room with panoramic floor-to-ceiling windows, city skyline at dusk, premium modern furniture",
        "cozy winter living room with lit fireplace, chunky knit blanket on sofa, warm orange glow, hygge comfort",
        "art-filled living room with gallery wall of paintings, eclectic colorful furniture, creative inspiring atmosphere",
        "minimalist white living room with single statement plant, clean lines, bright natural daylight, calm modern space",
        "dark moody living room with deep emerald walls, gold accent mirrors, velvet furniture, dramatic evening ambiance",
        "open-plan living room connected to kitchen, breakfast bar visible, family home warmth, soft morning light",
        "small studio apartment living area with smart space-saving furniture, cozy compact charm, warm string lights",
        "tropical resort living room with bamboo ceiling fan, large open windows to garden, exotic relaxed atmosphere",
        "modern farmhouse living room with shiplap accent wall, neutral linen sofa, rustic coffee table, warm homey feel",
        "maximalist colorful living room with patterned wallpaper, mix of textures, bold personality, playful creative energy",
    ],
    "bedroom": [
        "stylish modern bedroom with soft bedside lamp glow, neatly arranged bed and pillows, intimate personal space, warm cozy atmosphere",
        "minimalist Japanese-inspired bedroom with low platform bed, soft natural linen, morning sunlight streaming through shoji screens",
        "luxurious master bedroom with king-size bed, plush duvet, warm string lights on headboard, romantic dreamy atmosphere",
        "cozy small bedroom with fairy lights, pastel color scheme, neatly organized desk corner, fresh energetic aesthetic",
        "modern hotel-style bedroom with crisp white sheets, mood lighting, floor-to-ceiling window with city night view",
        "boho chic bedroom with macrame wall hanging, earth-tone bedding, indoor trailing plants, warm sunset light",
        "Parisian-style bedroom with ornate mirror, soft grey walls, vintage bedside table, elegant romantic charm",
        "modern bedroom with LED strip lights on ceiling, modern desk setup, colorful accents, energetic space",
        "rustic cabin bedroom with wooden log walls, quilted blanket, warm lantern glow, mountain retreat atmosphere",
        "luxury penthouse bedroom with silk sheets, panoramic window, city lights below, sophisticated evening mood",
        "coastal bedroom with white bedding and blue accents, seashell decor, ocean breeze through open window, beach vibes",
        "dark academia bedroom with bookshelves, warm reading lamp, dark wood furniture, intellectual cozy aesthetic",
        "Scandinavian bedroom with light pine furniture, white and grey palette, large window with plants, calm airy feel",
        "tropical resort bedroom with canopy bed, sheer white curtains, lush garden view outside, exotic luxury",
        "vintage retro bedroom with floral wallpaper, antique brass bed frame, warm amber table lamp, nostalgic charm",
        "modern loft bedroom with exposed brick and steel beams, industrial pendant light, urban cool aesthetic",
        "princess-style bedroom with soft pink walls, tulle canopy, plush carpet, dreamy fairy-tale atmosphere",
        "bachelor pad bedroom with dark grey walls, minimal furniture, mood LED lighting, sleek masculine aesthetic",
        "sunlit garden-view bedroom with French doors open to balcony, fresh morning air, white cotton bedding",
        "artist bedroom with paint supplies visible, creative mess on desk, inspiring mood board on wall, bohemian creative space",
    ],
    "cafe": [
        "trendy café interior with espresso machine and pastry display, warm Edison bulb lighting, rustic wooden tables, relaxed social atmosphere",
        "minimalist white café with marble tabletop, latte art in ceramic cup, indoor plants hanging from ceiling, bright airy space",
        "vintage Thai café with retro furniture, exposed brick wall, warm amber pendant lights, nostalgic cozy charm",
        "industrial loft café with concrete walls, metal stools, large windows, urban hip atmosphere, specialty coffee vibes",
        "garden café with outdoor seating under string lights, lush greenery surrounding, birdsong atmosphere, natural dappled sunlight",
        "Japanese kissaten café with dark wood counter, pour-over coffee setup, quiet jazz atmosphere, intimate warm glow",
        "Parisian sidewalk café with round marble table, wrought iron chair, morning croissant, European romantic charm",
        "rooftop café with city panorama view, modern furniture, golden hour sunlight, elevated urban escape",
        "cat café with playful cats lounging on shelves, warm cozy interior, cute comfortable atmosphere",
        "book café with floor-to-ceiling bookshelves, reading nooks, warm amber light, intellectual cozy retreat",
        "tropical café with palm leaf decor, rattan furniture, fresh coconut drinks, island vacation atmosphere",
        "artisan bakery café with fresh bread display, flour-dusted counter, warm oven glow, homemade comfort feel",
        "modern co-working café with power outlets and laptops, bright overhead lighting, productive social energy",
        "desert-themed café with cactus decor, terracotta pots, warm sand-colored walls, Southwestern charm",
        "underground speakeasy café with dim moody lighting, leather banquettes, vintage cocktail aesthetic, mysterious vibe",
        "Korean-style café with pastel decor, cute dessert display, soft K-pop aesthetic, Instagram-worthy setting",
        "lakeside café with waterfront view through glass wall, morning mist on water, serene peaceful escape",
        "converted warehouse café with high ceilings, exposed ducts, communal long tables, creative hub energy",
        "traditional Thai iced-tea shop with colorful drinks in glass jars, retro signage, nostalgic street-side charm",
        "minimalist Scandinavian café with blonde wood, white ceramic cups, clean lines, calm Nordic atmosphere",
    ],
    "office": [
        "clean professional office with modern desk setup, ergonomic chair, neutral corporate colors, bright overhead lighting, trustworthy business environment",
        "creative co-working space with standing desks, colorful accent walls, natural daylight, energetic productive atmosphere",
        "executive corner office with panoramic city view, dark wood desk, leather chair, premium business authority setting",
        "modern home office with plants on shelf, dual monitor setup, warm desk lamp, productive yet comfortable space",
        "startup office with open floor plan, whiteboard brainstorm wall, bright fluorescent lighting, dynamic innovative energy",
        "tech company office with neon logo sign on wall, sleek minimalist desks, cool blue-white lighting, Silicon Valley vibe",
        "library-style office with built-in bookshelves, warm reading lamp, leather desk pad, scholarly professional feel",
        "rooftop office with open-air terrace, laptop on outdoor table, city skyline, modern flexible work lifestyle",
        "medical professional office with clean white walls, organized desk, diplomas on wall, trustworthy clinical setting",
        "architect studio office with blueprint rolls, scale models on shelf, large drafting table, creative professional space",
        "law firm office with dark mahogany bookshelves, leather chairs, brass desk lamp, authoritative premium setting",
        "modern glass-partition office with collaborative zones, plants dividing spaces, bright natural light, open teamwork energy",
        "cozy home study with antique desk, warm rug, books stacked high, personal intellectual sanctuary",
        "gaming company office with colorful bean bags, arcade machine in corner, fun creative work culture",
        "photography studio office with prints on wall, editing workstation, warm task lighting, creative production space",
        "financial trading office with multiple monitors, ticker displays, intense focused atmosphere, high-stakes energy",
        "minimalist zen office with clean desk policy, single orchid on desk, natural bamboo accents, calm productive space",
        "vintage-themed office with typewriter on desk, retro clock, warm sepia-toned light, nostalgic charm",
        "podcast recording office with microphone and headphones on desk, acoustic foam panels, content creator setup",
        "shared family office with colorful artwork on wall, warm personal touches, work-from-home relatable atmosphere",
    ],
    "outdoor-nature": [
        "lush green garden or park setting, natural sunlight filtering through trees, fresh flowers and greenery, peaceful outdoor atmosphere",
        "tropical forest clearing with dappled golden sunlight, vibrant green foliage, misty morning air, exotic natural beauty",
        "blooming flower field in spring, soft pastel petals everywhere, gentle warm breeze, dreamy romantic natural setting",
        "serene lakeside with crystal clear water reflection, surrounding mountains, golden hour warm glow, tranquil peaceful escape",
        "bamboo grove path with soft filtered light, zen garden stones, gentle rustling leaves, meditative calm atmosphere",
        "misty mountain peak with clouds below, dramatic sunrise golden rays, epic elevated landscape, awe-inspiring nature",
        "cherry blossom garden in full bloom, pink petals falling gently, soft spring sunlight, Japanese romantic aesthetic",
        "dense rainforest with hanging vines and ferns, humid tropical air, dappled light through canopy, wild exotic adventure",
        "sunflower field at golden hour, tall yellow blooms stretching to horizon, warm summer glow, joyful vibrant energy",
        "peaceful riverside with smooth rocks and gentle current, willow trees hanging over water, soft afternoon light",
        "alpine meadow with wildflowers, snow-capped mountains in distance, crisp clean air, European countryside beauty",
        "autumn forest path with red and golden leaves, soft diffused light through branches, cozy fall atmosphere",
        "desert oasis with palm trees and clear blue pool, warm sandy surroundings, exotic remote paradise",
        "lavender field in Provence, endless purple rows, warm Mediterranean sunlight, aromatic calming beauty",
        "mossy ancient temple ruins overtaken by nature, mystical filtered light, atmospheric historical wonder",
        "rice paddy terraces with emerald green water, Thai countryside, warm morning mist, agricultural beauty",
        "waterfall cascade in tropical jungle, mist spray catching rainbow, lush green surroundings, powerful natural energy",
        "starlit meadow at night, clear Milky Way visible, gentle firefly glow, magical nocturnal nature scene",
        "mangrove forest with twisted roots above water, golden afternoon light, unique ecosystem atmosphere",
        "hilltop viewpoint overlooking valley, panoramic green landscape, golden sunset, sense of freedom and space",
    ],
    "outdoor-city": [
        "vibrant urban street with modern buildings, city sidewalk, natural daylight, dynamic metropolitan atmosphere, trendy urban backdrop",
        "neon-lit city street at night, rain-slicked pavement with reflections, bustling nightlife energy, cinematic urban mood",
        "modern shopping district with glass storefronts, well-dressed pedestrians, bright afternoon sun, upscale city lifestyle",
        "Bangkok Sukhumvit street with BTS skytrain in background, vibrant city energy, warm tropical daylight, Thai urban life",
        "quiet city alley with street art murals, vintage lampposts, morning golden light, artistic urban discovery vibe",
        "busy intersection crosswalk with crowd, tall skyscrapers, dynamic movement blur, energetic city pulse",
        "waterfront promenade with river and bridge view, evening lights reflecting on water, romantic city evening",
        "outdoor food court area with string lights, diverse cuisines, warm evening glow, social urban dining scene",
        "historic district with colonial architecture, cobblestone streets, warm afternoon light, charming old-world city",
        "modern transit station with sleek train, glass and steel architecture, commuter energy, futuristic urban mobility",
        "rooftop helipad view with city skyline 360, dramatic clouds, powerful elevated perspective, cinematic scene",
        "city park bench with skyscrapers in background, autumn trees, joggers passing by, urban nature harmony",
        "night market street with vendor carts and steam, colorful LED signs, bustling commercial energy",
        "upscale hotel entrance with doorman and luxury cars, polished marble, premium city lifestyle setting",
        "street musician corner with guitar case open, brick building backdrop, authentic urban culture moment",
        "modern campus walkway with young professionals, glass buildings, landscaped greenery, knowledge hub vibe",
        "Chinatown gate entrance with red and gold decor, lanterns hanging, cultural urban landmark atmosphere",
        "city canal with boats and waterfront cafes, European-inspired, warm golden sunset, picturesque urban charm",
        "construction site skyline with cranes and new towers, blue sky, dynamic progress and growth energy",
        "pedestrian shopping street with boutique storefronts, flower boxes on windows, bright midday sun, charming retail district",
    ],
    "kitchen": [
        "modern clean kitchen with marble countertop, cooking utensils and fresh ingredients visible, warm inviting culinary atmosphere, natural window light",
        "rustic farmhouse kitchen with wooden counters, copper pots hanging, herb garden by window, warm cozy home-cooking vibe",
        "sleek contemporary kitchen with island counter, stainless steel appliances, bright LED under-cabinet lighting, professional chef aesthetic",
        "small cozy kitchen with tiled backsplash, morning coffee brewing, warm sunlight through window, comforting home atmosphere",
        "open-concept kitchen connected to dining area, fresh fruits on counter, pendant lights above island, modern family home feel",
        "Thai home kitchen with wok station, steam rising, colorful spice rack on wall, authentic home-cooking atmosphere",
        "professional restaurant kitchen with stainless steel surfaces, blue flame burners, intense culinary action energy",
        "bright white IKEA-style kitchen with clean counters, organized jars, minimalist Scandinavian cooking aesthetic",
        "outdoor BBQ kitchen area with brick grill, garden herbs nearby, warm afternoon sunlight, backyard party setting",
        "vintage retro kitchen with pastel appliances, checkered floor, warm nostalgic 1950s American diner charm",
        "Japanese kitchen with wooden cutting board, fresh sushi ingredients, clean minimal countertop, zen culinary precision",
        "Mediterranean kitchen with terracotta tiles, olive oil bottles, hanging dried herbs, warm rustic European charm",
        "dark moody kitchen with black cabinets, brass fixtures, dramatic pendant lights, luxurious modern cooking space",
        "bakery kitchen with flour-dusted surface, rolling pin, fresh dough rising, warm golden oven-glow atmosphere",
        "smart modern kitchen with touch-screen fridge, built-in coffee machine, futuristic automated cooking aesthetic",
        "country cottage kitchen with exposed wooden beams, fresh flowers in vase, warm morning light through curtains",
        "Korean-style kitchen with banchan prep, colorful ingredients, clean organized workspace, Asian culinary aesthetic",
        "loft kitchen with concrete island counter, industrial pendant lights, raw urban chic cooking space",
        "tropical kitchen with open-air window to garden, bamboo utensils, fresh exotic fruits on counter, island cooking vibe",
        "grandma's kitchen with old wooden table, homemade jam jars on shelf, warm amber light, nostalgic comfort cooking",
    ],
    "gym": [
        "modern gym interior with dumbbells and weight racks, fit people exercising in background, bright motivational lighting, athletic sporty atmosphere",
        "boutique fitness studio with mirrored wall, clean rubber flooring, neon motivational signs, premium workout environment",
        "outdoor crossfit area with kettlebells and pull-up bars, morning sunlight, gritty determined training atmosphere",
        "yoga studio with bamboo floors, soft natural lighting, calming neutral walls, peaceful mindful exercise space",
        "home gym setup with compact equipment, rubber mat flooring, motivational poster on wall, personal training space",
        "boxing gym with heavy bags hanging, worn canvas ring in background, raw intense training atmosphere",
        "luxury hotel gym with panoramic window view, modern machines, warm wood accents, premium fitness experience",
        "rooftop outdoor gym with city skyline backdrop, morning golden light, fresh air workout energy",
        "pilates reformer studio with clean white equipment, soft natural light, elegant body-conditioning atmosphere",
        "martial arts dojo with tatami mats, Japanese calligraphy on wall, disciplined training environment",
        "swimming pool area with lane dividers, underwater blue glow, aquatic fitness freshness",
        "rock climbing gym with colorful holds on wall, chalk-dusted hands, adventurous indoor challenge atmosphere",
        "dance studio with ballet barre and mirror wall, wooden sprung floor, graceful movement space",
        "functional training zone with battle ropes and sleds, industrial concrete floor, hardcore athlete vibe",
        "spin cycling studio with dark room, colored LED mood lighting, high-energy group workout atmosphere",
        "calisthenics park with outdoor bars and rings, sunrise warm glow, street workout community vibe",
        "rehabilitation physio gym with therapy equipment, clean clinical setting, recovery-focused supportive space",
        "24-hour gym at night with few dedicated lifters, quiet focused intensity, late-night dedication atmosphere",
        "Muay Thai gym with thai boxing ring, kicking bags, traditional Thai training camp atmosphere",
        "senior fitness class in bright community center, gentle exercise equipment, inclusive welcoming health space",
    ],
    "beach": [
        "tropical beach setting with white sand and turquoise ocean, warm golden sunlight, palm trees swaying, relaxed vacation atmosphere",
        "sunset beach with dramatic orange-pink sky, gentle waves lapping shore, silhouette of palm trees, romantic golden hour",
        "crystal clear shallow water beach, coral visible underwater, bright midday tropical sun, paradise island feeling",
        "rocky coastline beach with waves crashing, dramatic cloudy sky, wild natural beauty, adventurous coastal atmosphere",
        "quiet private beach cove with hammock between palm trees, soft white sand, gentle turquoise waves, ultimate relaxation",
        "Thai island beach with longtail boat in background, limestone karsts rising from sea, exotic tropical paradise",
        "beach bonfire at dusk with warm orange glow, friends gathered, starry sky appearing, magical evening beach",
        "surf beach with big waves, surfers in water, salt spray in air, energetic adventurous ocean atmosphere",
        "mangrove beach with calm shallow water, kayaks on shore, eco-tourism natural beauty, peaceful exploration",
        "black sand volcanic beach with dramatic dark shore, foamy white waves, powerful raw nature landscape",
        "beach bar with thatched roof, colorful cocktails, reggae vibe, laid-back tropical party atmosphere",
        "early morning beach with jogger tracks in sand, pink sunrise sky, peaceful solitary coastal beauty",
        "beach picnic setup with blanket and basket, wine glasses, gentle waves in background, romantic date setting",
        "pier beach with wooden boardwalk extending into sea, fishing boats, warm afternoon light, coastal town charm",
        "beach resort pool merging with ocean view, infinity edge, luxury loungers, premium seaside relaxation",
        "stormy beach with dramatic dark clouds, powerful waves, lightning in distance, raw nature energy",
        "snorkeling beach with clear water and tropical fish visible, coral reef, bright underwater colors",
        "beach volleyball court with net and sand, bright sunny day, sporty energetic beach activity",
        "secluded beach with towering cliffs, hidden gem feeling, turquoise lagoon, paradise discovery",
        "moonlit beach at night with calm silver reflections, gentle tide, stars above, tranquil nocturnal beauty",
    ],
    "neon-dark": [
        "dark moody room with vibrant neon lights in pink and blue, cyberpunk aesthetic, dramatic colored shadows, edgy futuristic atmosphere",
        "underground club setting with purple and magenta neon strips, fog machine haze, pulsating energy, nightlife atmosphere",
        "futuristic corridor with cyan and red LED panels, reflective dark floor, sci-fi movie aesthetic, high-tech mood",
        "neon-lit gaming setup room with RGB lighting, dark walls with colored glow, tech-savvy streamer aesthetic, electric energy",
        "dark alley with neon signs in Thai and English, rain droplets catching colored light, noir cinematic atmosphere, urban mystery",
        "synthwave-inspired room with retro grid lines, purple and pink neon, 80s futuristic nostalgia, vaporwave aesthetic",
        "dark bar counter with neon cocktail sign glowing, moody blue ambient light, late-night urban sophistication",
        "laser tag arena with crossing beams of colored light, fog and darkness, adrenaline-pumping action setting",
        "recording studio with neon EQ visualizer on wall, dark soundproofed room, creative music production atmosphere",
        "dark mirror room with infinite neon reflections, mesmerizing depth effect, surreal artistic experience",
        "cyberpunk street market with holographic ads, rain and steam, blue-purple neon haze, dystopian future",
        "bowling alley with UV blacklight, glowing lanes and pins, fun retro entertainment atmosphere",
        "dark cinema screening room with single neon exit sign, plush seats, moody film-viewing ambiance",
        "neon art gallery with glowing installations, dark walls, contemporary light art exhibition, artistic edge",
        "rooftop at night with city neon below, LED-lit furniture, warm pink and cool blue contrast, elevated nightlife",
        "dark greenhouse with UV grow lights, exotic plants glowing, surreal botanical neon garden",
        "karaoke room with disco ball and colored stage lights, dark walls with star projections, party energy",
        "underground tunnel with strip LED lighting along ceiling, industrial raw concrete, moody urban exploration",
        "dark workspace with monitor glow illuminating face, RGB keyboard, late-night coding hacker aesthetic",
        "neon-lit pool table room with green felt under colored light, smoky atmosphere, retro entertainment den",
    ],
    "white-minimal": [
        "pure white minimalist backdrop with soft even lighting, zero distractions, product-focused clean space, professional e-commerce aesthetic",
        "bright white infinity cove with seamless floor-to-wall transition, studio strobe lighting, catalog-ready clean look",
        "white marble surface with subtle grey veins, soft overhead light, elegant minimalist product display setting",
        "all-white room with single accent shadow, geometric clean lines, contemporary art gallery aesthetic, sophisticated simplicity",
        "white textured fabric backdrop with gentle side lighting, soft shadows, fashion lookbook aesthetic, refined clean composition",
        "white concrete wall with subtle texture, diffused natural window light from side, architectural minimal beauty",
        "white paper backdrop on floor sweep, crisp product photography setup, clean commercial shooting environment",
        "frosted glass white environment with ethereal glow, dreamy bright atmosphere, luxury skincare brand aesthetic",
        "white wooden table surface, top-down flat lay ready, soft even overhead light, social media content setting",
        "white linen curtain backdrop with breeze movement, soft romantic light, bridal fashion aesthetic",
        "white tiled bathroom-style backdrop with clean geometric lines, bright clinical aesthetic, hygiene product setting",
        "white sand surface with soft natural texture, gentle side light creating depth, organic minimal backdrop",
        "white acrylic display pedestal in white room, product showcase spotlight, premium minimal display",
        "white cloud-like soft fabric environment, ethereal floating feeling, dreamy beauty campaign aesthetic",
        "white plaster wall with artistic texture, warm directional light creating shadows, Mediterranean minimal charm",
        "white modern apartment with minimal furniture, floor-to-ceiling windows, bright airy lifestyle backdrop",
        "white snow landscape, clean bright outdoor minimal, fresh pure natural white environment",
        "white silk draped surface with gentle folds, soft diffused light, luxury fashion presentation backdrop",
        "white tech lab environment with clean surfaces, bright LED overhead panels, scientific precision aesthetic",
        "white greenhouse with bright natural light streaming in, few green plants for accent, fresh airy botanical minimal",
    ],
    "gradient-abstract": [
        "smooth abstract gradient background in soft pastel colors, modern contemporary feel, clean artistic backdrop, visually appealing depth",
        "warm sunset gradient from coral to deep purple, dreamy ethereal atmosphere, soft bokeh light particles floating",
        "cool blue-to-teal gradient with subtle geometric shapes, modern tech aesthetic, clean futuristic backdrop",
        "soft pink-to-lavender gradient with gentle lens flare, feminine elegant atmosphere, beauty brand aesthetic",
        "bold orange-to-magenta gradient with dynamic diagonal light streaks, energetic vibrant modern backdrop",
        "deep navy-to-black gradient with gold dust particles, luxury premium atmosphere, high-end brand backdrop",
        "mint green-to-white gradient with soft cloud wisps, fresh clean healthy aesthetic, wellness brand feel",
        "warm peach-to-cream gradient with soft circular bokeh, gentle romantic mood, skincare beauty backdrop",
        "electric blue-to-purple gradient with digital glitch lines, modern tech startup aesthetic, innovation energy",
        "earth-tone brown-to-sand gradient with subtle grain texture, organic natural warm feel, artisan brand backdrop",
        "rainbow holographic gradient with iridescent shimmer, trendy Gen-Z aesthetic, playful colorful energy",
        "monochrome grey gradient with clean geometric accent, corporate professional minimal, business brand backdrop",
        "forest green-to-emerald gradient with leaf shadow overlay, natural organic luxury, eco-brand aesthetic",
        "red-to-dark crimson gradient with dramatic vignette, bold powerful energy, sports brand backdrop",
        "pastel yellow-to-white gradient with sun ray beams, cheerful bright morning feel, optimistic energy",
        "cyan-to-white gradient with water ripple effect, fresh aquatic feel, hydration product backdrop",
        "rose gold-to-champagne gradient with metallic shimmer, feminine luxury, premium beauty brand aesthetic",
        "dark teal-to-midnight gradient with northern lights effect, mystical cosmic atmosphere, premium tech backdrop",
        "coral-to-peach gradient with scattered cherry blossoms, soft spring aesthetic, Japanese-inspired beauty",
        "silver-to-white gradient with diamond sparkle particles, ice-crystal luxury feel, premium jewelry backdrop",
    ],
    "luxury": [
        "opulent luxury setting with marble surfaces and gold accents, crystal chandelier ambient light, premium high-end atmosphere, elegant rich textures",
        "penthouse lounge with floor-to-ceiling windows, city night view, velvet furniture, champagne on glass table, exclusive VIP atmosphere",
        "luxury boutique interior with dark wood panels, soft spotlight on display, premium leather and brass details, high-fashion retail setting",
        "royal palace-inspired room with ornate gold frames, silk drapes, warm candlelight glow, regal majestic atmosphere",
        "modern luxury car showroom aesthetic, polished concrete floor, dramatic single spotlight, sleek premium brand environment",
        "private jet interior with cream leather seats, polished wood trim, warm cabin lighting, ultra-premium travel luxury",
        "yacht deck lounge with ocean horizon, white leather seating, champagne service, maritime luxury lifestyle",
        "luxury hotel presidential suite with king bed, fresh roses, panoramic city view, five-star hospitality elegance",
        "high-end jewelry store interior with glass display cases, spot-lit diamonds, velvet black surfaces, exclusive boutique atmosphere",
        "wine cellar with aged oak barrels, dim warm candlelight, stone archway, sophisticated connoisseur setting",
        "luxury spa bath with rose petals floating, marble surround, warm golden light, indulgent self-care atmosphere",
        "Versailles-inspired ballroom with mirrored walls, gold leaf ceiling, crystal chandeliers, grand opulent scale",
        "designer fashion atelier with fabric bolts on shelf, dress form mannequin, soft elegant lighting, couture craftsmanship",
        "luxury cigar lounge with leather Chesterfield chairs, mahogany paneling, warm amber whisky glow, gentlemen's club",
        "modern art collector living room with museum-quality paintings, sculptural furniture, dramatic gallery lighting",
        "rooftop infinity pool at sunset with champagne flutes on edge, panoramic golden sky, ultimate luxury escape",
        "luxury watch boutique with glass-topped dark wood counter, single timepiece spotlit, precision craftsmanship aesthetic",
        "Monte Carlo casino-inspired room with green felt table, crystal decor, warm ambient glow, glamorous high-stakes atmosphere",
        "silk-draped tent at luxury desert camp, lantern glow, plush cushions, exotic glamping under stars",
        "premium first-class airport lounge with designer furniture, soft lighting, panoramic runway view, elite travel lifestyle",
    ],
    "night-market": [
        "vibrant Thai night market with colorful string lights and lanterns, food stalls in background, warm festive glow, lively street atmosphere",
        "bustling night bazaar with vendor tents, smoke from grilling meat, warm orange light bulbs, authentic Thai street food energy",
        "Chinatown night market with red lanterns, neon signs in Thai and Chinese, crowded lively walkway, cultural street atmosphere",
        "hipster night market with craft stalls and live music stage, fairy lights overhead, cool evening breeze, trendy social gathering",
        "floating market at dusk with wooden boats, warm lantern reflections on water, tropical evening atmosphere, unique Thai culture",
        "street food alley with wok flames and sizzling sounds, steam rising, warm golden light, intense culinary energy",
        "vintage flea market at night with retro collectibles, warm lamp glow on antiques, treasure-hunting atmosphere",
        "seafood night market with ice displays and fresh catch, bright fluorescent stall lights, coastal market energy",
        "clothing night market with racks of trendy fashion, colorful fabrics, warm string lights, bargain shopping excitement",
        "dessert and sweet stall zone with colorful treats, cotton candy and crepes, warm sugary aroma, festive sweet tooth paradise",
        "Ratchada train market with colorful tent roofs from above, geometric pattern of lights, iconic Bangkok nightlife view",
        "temple fair night market with carnival games, spinning lights, Thai traditional snacks, festive cultural celebration",
        "artisan craft night market with handmade goods, pottery and paintings, warm intimate stall lighting, creative community",
        "BBQ and grill night market with open-flame cooking, smoky aroma, communal seating, casual outdoor feast atmosphere",
        "fruit smoothie and juice stall row, colorful blended drinks, bright neon menu signs, refreshing tropical night snack",
        "night market entrance archway with welcome banner, crowd flowing in, anticipation energy, festive gateway moment",
        "late-night ramen stall with steaming bowls, solo diners at counter, warm intimate lamp, comforting midnight meal",
        "night market photo booth area with fun props, ring light glow, social media friendly, playful entertainment zone",
        "herbal medicine and tea night market stall, dried herbs in jars, warm earthy aroma, traditional Asian wellness",
        "night market closing time with vendors packing up, warm last-light glow, quiet end-of-evening calm, nostalgic fade-out",
    ],
    "rooftop": [
        "modern rooftop terrace with panoramic city skyline view, golden hour sunset lighting, open air urban setting, sophisticated elevated atmosphere",
        "rooftop bar with infinity pool edge, city lights twinkling below, deep blue twilight sky, luxury nightlife rooftop vibe",
        "rooftop garden with potted plants and wooden deck, fairy string lights, warm evening sky, intimate urban oasis",
        "high-rise rooftop with dramatic wind and clouds, sunrise golden light, panoramic 360 view, powerful elevated feeling",
        "casual rooftop hangout with bean bags and low tables, warm sunset glow, relaxed chill atmosphere, friends gathering vibe",
        "rooftop yoga session at dawn, mat on wooden platform, pink-orange sky, peaceful elevated mindfulness",
        "rooftop cinema with projector screen and blankets, city lights backdrop, cozy movie night under stars",
        "rooftop BBQ party with grill and fairy lights, group of friends, warm summer evening, social celebration energy",
        "luxury rooftop restaurant with white tablecloths, city panorama, fine dining at golden hour, premium elevated experience",
        "rooftop helipad with helicopter silhouette, dramatic clouds, powerful executive lifestyle imagery",
        "green rooftop farm with vegetable beds, urban agriculture, morning dew, sustainable city living aesthetic",
        "rooftop hot tub with steam rising, night city lights below, warm intimate luxury, urban spa escape",
        "industrial rooftop with water towers and pipes, gritty urban texture, dramatic cloudy sky, raw authentic city feel",
        "rooftop wedding setup with floral arch, white chairs, sunset ceremony, romantic elevated celebration",
        "rooftop DJ booth with turntables, crowd dancing, colorful LED lights, high-energy urban party atmosphere",
        "penthouse rooftop terrace with designer furniture, fire pit, champagne service, exclusive private gathering",
        "rooftop astronomical observatory with telescope, clear starry night, scientific wonder elevated above city lights",
        "rooftop sunrise meditation spot with incense burning, prayer flags, Himalayan-inspired peaceful elevation",
        "abandoned rooftop with graffiti art, urban exploration aesthetic, dramatic sky, raw artistic freedom",
        "rooftop coworking space with laptops and coffee, city skyline office, modern digital nomad elevated workspace",
    ],
    "library": [
        "elegant library with tall wooden bookshelves, warm reading lamp glow, quiet intellectual atmosphere, leather armchair, scholarly trustworthy setting",
        "modern library with floor-to-ceiling glass windows, minimalist white shelves, bright natural daylight, contemporary knowledge space",
        "cozy home library corner with overstuffed armchair, stacked books on side table, warm amber reading light, intimate study nook",
        "grand old library with spiral staircase, ornate ceiling, dust motes in sunbeam, classic academic majesty, timeless wisdom atmosphere",
        "trendy bookstore café with exposed shelves, coffee cup beside open book, warm Edison bulbs, intellectual yet casual social space",
        "colorful community library with bright displays, playful reading nooks, cheerful lighting, educational fun atmosphere",
        "university research library with study carrels, green desk lamps, academic focus and concentration atmosphere",
        "rare book collection room with glass cases, antique leather-bound volumes, hushed reverence, historical treasure",
        "Japanese manga library with floor-to-ceiling comic shelves, cozy reading pods, vibrant pop-culture atmosphere",
        "monastery library with ancient scrolls, stone arches, candlelight flickering, sacred knowledge sanctuary",
        "modern digital library with tablets and screens, futuristic pod seating, tech-forward knowledge access",
        "vintage secondhand bookshop with overflowing shelves, musty paper aroma, warm chaos, treasure-hunt charm",
        "presidential library with flags and portraits, dark wood paneling, authoritative formal atmosphere",
        "outdoor reading garden with book cart, bench under tree, dappled sunlight on pages, peaceful literary escape",
        "art library with oversized photo books, gallery lighting, coffee table browsing, visual intellectual space",
        "music library with vinyl records and headphone stations, warm wood shelves, audiophile listening atmosphere",
        "sci-fi themed library with futuristic shelving, cool blue lighting, knowledge of the future aesthetic",
        "rooftop reading lounge with comfortable daybed, city view, afternoon golden light, luxury literary leisure",
        "tiny personal library nook under staircase, fairy lights, cushioned bench, magical hidden reading spot",
        "law library with leather-bound legal volumes, long oak tables, brass fixtures, authoritative professional setting",
    ],
    "restaurant": [
        "upscale restaurant interior with elegant table setting, candlelight ambiance, fine dining backdrop, warm sophisticated atmosphere",
        "trendy rooftop restaurant with city night view, modern plating on dark table, moody ambient lighting, date-night vibe",
        "casual Thai street food restaurant with wooden tables, colorful dishes served, warm fluorescent glow, authentic local dining",
        "Japanese omakase counter with chef preparing sushi, warm cypress wood bar, minimal elegant plating, premium culinary artistry",
        "modern brunch restaurant with natural light flooding in, avocado toast and fresh juice on marble table, bright Instagram-worthy aesthetic",
        "Italian trattoria with red checkered tablecloths, wine bottles on shelf, warm rustic Mediterranean charm",
        "Chinese dim sum restaurant with steaming bamboo baskets, round table lazy Susan, bustling family dining energy",
        "seafood restaurant by the pier with ocean view, fresh catch display, nautical rope and wood decor, coastal dining charm",
        "Korean BBQ restaurant with tabletop grill, sizzling meat, colorful banchan sides, interactive social dining fun",
        "French bistro with zinc bar counter, chalkboard menu, classic Parisian dining, warm golden interior light",
        "food court hawker center with diverse cuisine stalls, communal tables, vibrant multicultural eating atmosphere",
        "farm-to-table restaurant with rustic wood interior, seasonal menu board, organic fresh ingredients on display",
        "sushi conveyor belt restaurant with colorful plates circling, fun interactive dining, bright clean Japanese aesthetic",
        "steakhouse with dark leather booths, wood-paneled walls, dim warm lighting, classic American premium dining",
        "vegan plant-based restaurant with green decor, fresh smoothie bowls, bright healthy lifestyle aesthetic",
        "buffet restaurant with long spread display, warm food stations, diverse international cuisine, abundant feast energy",
        "underground wine bar restaurant with brick cellar walls, candlelit tables, intimate romantic wine-pairing dinner",
        "food truck park with outdoor picnic tables, multiple cuisine trucks, string lights, casual festival dining atmosphere",
        "Michelin-star restaurant kitchen pass with plating in progress, chef focused, precision culinary artistry moment",
        "breakfast diner with retro counter stools, pancake stack and coffee, morning sunlight through blinds, classic Americana charm",
    ],
    "spa": [
        "serene spa environment with aromatic candles and smooth stones, soft diffused lighting, bamboo and natural elements, peaceful zen atmosphere",
        "Thai massage room with warm herbal compress, teak wood interior, dim candlelight, traditional healing sanctuary",
        "modern wellness center with white towels and orchids, soft ambient music atmosphere, clean luxurious relaxation space",
        "outdoor hot spring bath surrounded by natural rocks and steam, mountain forest view, misty tranquil healing environment",
        "minimalist spa reception with water feature wall, pebble floor path, soft incense aroma, calming entrance to wellness journey",
        "Balinese spa pavilion with tropical garden view, open-air treatment bed, frangipani flowers, exotic island healing",
        "hammam Turkish bath with mosaic tiles and steam, warm humid atmosphere, ancient bathing ritual setting",
        "Japanese onsen bath with wooden tub, bamboo fence, outdoor mountain scenery, traditional hot spring serenity",
        "luxury hotel spa suite with private jacuzzi, rose petals, champagne, couples premium relaxation experience",
        "salt cave therapy room with pink Himalayan salt walls, warm amber glow, mineral-rich healing atmosphere",
        "meditation room in spa with singing bowls, soft cushions, dim candlelight, inner peace sacred space",
        "facial treatment room with magnifying lamp, clean white bed, product bottles arranged, professional skincare setting",
        "infinity pool spa overlooking ocean, turquoise water horizon, warm sun, ultimate aquatic relaxation",
        "aromatherapy room with essential oil diffuser mist, dried lavender bundles, wooden shelves, fragrant healing space",
        "cryotherapy chamber exterior with frost and cool mist, modern wellness technology, advanced recovery setting",
        "yoga retreat spa with outdoor deck, incense burning, mountain sunrise, spiritual wellness journey",
        "hydrotherapy pool with underwater jets, blue tiled interior, therapeutic water movement, aquatic healing",
        "traditional Chinese medicine spa with acupuncture chart on wall, herbal tea service, ancient wisdom healing",
        "spa garden path with stepping stones over koi pond, lanterns along path, tranquil journey to treatment room",
        "Finnish sauna with cedar wood interior, hot stones and steam, birch branches, Nordic purification ritual",
    ],
    "hospital": [
        "modern clinic reception with clean white walls, comfortable waiting chairs, bright LED overhead lighting, trustworthy healthcare setting",
        "dental clinic with mint-green accents, professional dental chair visible, clean sterile atmosphere, friendly medical environment",
        "dermatology clinic with soft ambient lighting, skincare product display, clean white consultation room, beauty-meets-health aesthetic",
        "pharmacy counter with organized medicine shelves, warm helpful atmosphere, professional healthcare retail setting",
        "family clinic with colorful wall murals, friendly furniture, warm welcoming medical atmosphere",
        "physiotherapy room with exercise equipment, treatment bed, bright natural light, recovery-focused clinical space",
        "eye clinic with modern vision testing equipment, dark examination room, precise medical technology setting",
        "aesthetic clinic with sleek modern interior, before-after photo wall, premium beauty enhancement atmosphere",
        "traditional Thai medicine clinic with herbal displays, warm wooden interior, holistic healing environment",
        "veterinary clinic with pet-friendly decor, clean examination table, caring animal healthcare atmosphere",
        "mental health counseling room with comfortable sofa, soft warm lamp, calming neutral walls, safe supportive space",
        "hospital corridor with clean tile floors, bright fluorescent lighting, medical staff walking, professional healthcare energy",
        "laboratory with microscope and test tubes, clean white surfaces, precise scientific research atmosphere",
        "radiology room with modern scanning equipment, dim blue-lit interior, high-tech diagnostic medical setting",
        "nursing station with monitors and charts, organized medical supplies, dedicated care professional environment",
        "wellness check-up room with blood pressure cuff and stethoscope, clean desk, routine health assessment setting",
        "maternity ward with soft pink and blue accents, comfortable bed, warm nurturing atmosphere, new life celebration",
        "sports medicine clinic with athlete posters on wall, rehabilitation equipment, performance recovery setting",
        "Chinese medicine clinic with acupuncture needles and herbal jars, traditional wooden cabinet, ancient healing wisdom",
        "modern telehealth setup with screen and camera, clean home-office medical consultation, digital healthcare future",
    ],
    "school": [
        "modern classroom with whiteboard and projector, neat rows of desks, bright overhead lighting, educational learning atmosphere",
        "university lecture hall with tiered seating, large presentation screen, academic knowledge-sharing environment",
        "cozy tutoring room with small round table, colorful learning materials, warm encouraging study space",
        "science laboratory with beakers and periodic table poster, bright lab lighting, hands-on discovery atmosphere",
        "art classroom with easels and paint supplies, colorful student works on wall, creative expression space",
        "computer lab with rows of monitors, modern tech setup, bright productive digital learning environment",
        "kindergarten classroom with alphabet wall, tiny colorful chairs, playful educational toys, cheerful childhood learning",
        "music room with instruments on stands, sound-proofed walls, creative melodic learning atmosphere",
        "school library with study tables and bookshelves, quiet focus zone, academic research-ready setting",
        "outdoor school garden with raised plant beds, nature learning station, fresh-air environmental education",
        "home study desk with laptop open, organized notes, warm desk lamp, focused self-study atmosphere",
        "workshop classroom with tools and workbench, hands-on vocational training, practical skills environment",
        "language learning room with world flags on wall, headphone stations, multicultural education setting",
        "exam hall with individual desks spaced apart, clock on wall, focused silent concentration atmosphere",
        "teacher's desk with red pen and grade book, chalkboard behind, authority and guidance presence",
        "school hallway with lockers and students walking, bright morning light, youthful energy and social life",
        "dance practice room in school with mirror wall, wooden floor, after-school activity creative space",
        "school cafeteria with long tables and food trays, bright midday light, social gathering lunch break",
        "online learning setup with webcam and ring light, virtual classroom on screen, modern e-learning aesthetic",
        "graduation stage with podium and flowers, proud achievement backdrop, milestone celebration setting",
    ],
    "temple": [
        "serene Buddhist temple interior with golden Buddha statue, incense smoke rising, warm candlelight, peaceful spiritual atmosphere",
        "Thai temple courtyard with ornate golden spires, lotus pond, morning sunlight, sacred cultural beauty",
        "meditation hall with rows of cushions, soft ambient chanting, dim warm lighting, deep inner peace space",
        "temple garden with bodhi tree and stone pathway, gentle morning mist, tranquil monastic serenity",
        "ancient temple ruins with mossy stone walls, dappled forest light, mystical historical spiritual wonder",
        "Japanese Zen temple with rock garden, raked sand patterns, minimalist wooden architecture, meditative calm",
        "Hindu temple with colorful deity sculptures, flower garlands, warm oil lamp glow, vibrant spiritual devotion",
        "temple bell tower at sunrise, golden light hitting bronze bells, panoramic mountain view, awakening moment",
        "monastery kitchen with simple wooden table, monk's alms bowl, humble warm atmosphere, mindful simplicity",
        "Balinese temple with split gate entrance, tropical offerings with flowers, exotic spiritual island culture",
        "Christian church interior with stained glass windows, colored light streaming in, reverent quiet beauty",
        "mosque interior with geometric tile patterns, soft filtered light through screens, peaceful prayer space",
        "temple fair with festive decorations, Thai traditional dancers, colorful lanterns, cultural celebration atmosphere",
        "mountaintop temple with clouds below, panoramic view, golden pagoda against blue sky, elevated spiritual majesty",
        "temple library with ancient palm-leaf manuscripts, warm amber reading lamp, sacred knowledge preservation",
        "riverside temple with reflection in calm water, sunset golden glow, peaceful evening spiritual setting",
        "cave temple with natural rock formations, flickering candle light, ancient mystical underground sanctuary",
        "Thai ordination hall with elaborate murals, golden decorative ceiling, solemn ceremonial atmosphere",
        "Tibetan Buddhist monastery with prayer flags, mountain backdrop, colorful spiritual energy, Himalayan peace",
        "temple at night with illuminated pagoda, soft warm uplighting, peaceful quiet nocturnal spiritual beauty",
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// SMART ENVIRONMENT — Category-aware background override
// When template doesn't match product type, use category-appropriate setting
// ═══════════════════════════════════════════════════════════════════════════

// CATEGORY_ENVIRONMENTS now imported from @/data/categoryEnvironments (100 categories × 80 variations)

// Category-specific lighting enhancement — supplements tone-based lighting
const CATEGORY_LIGHTING: Partial<Record<ProductCategory, string>> = {
    food: "warm golden lighting, appetizing warm tones, soft overhead light simulating restaurant ambiance, food looks delicious under this light",
    beverage: "cool refreshing lighting with warm accent, condensation-highlighting backlight, crisp clean illumination, thirst-inducing glow",
    fashion: "fashion editorial lighting, directional key light with soft fill, fabric texture revealing light, stylish shadow play",
    gadget: "clean cool-toned lighting, subtle blue LED accent, sharp product-edge lighting, modern tech commercial illumination",
    beauty: "soft diffused beauty lighting, ring-light style even illumination, dewy skin-flattering light, soft shadows for premium cosmetic presentation",
    supplement: "high-energy bright gym lighting, dynamic contrast with warm tones, motivational bold illumination, fitness-commercial quality light, athletic atmosphere",
    pet: "warm cheerful daylight, playful bright tones, soft even illumination, pet-friendly cozy glow",
    baby: "ultra-soft diffused lighting, gentle pastel warm tones, no harsh shadows, nurturing safe atmosphere",
    home: "warm lifestyle ambient lighting, natural window light feel, cozy inviting tones, lived-in comfort glow",
    kitchen: "bright overhead kitchen lighting, warm practical illumination, clean countertop highlight, cooking-show quality light",
    fitness: "high-energy bright lighting, dynamic contrast, motivational bold illumination, gym-commercial quality light",
    auto: "dramatic showroom lighting, reflective metallic highlights, deep contrast, automotive commercial grade illumination",
    jewelry: "precise point-source sparkle lighting, brilliant highlight on gemstones, dark velvet contrast, luxury showcase illumination",
    watch: "elegant directional lighting, dial-detail revealing light, subtle metallic reflection, premium horological showcase",
    bag: "fashion editorial lighting, texture-revealing directional light, premium material highlight, boutique display illumination",
    shoe: "clean studio lighting with slight directional shadow, sole-detail revealing, profile-highlighting light, retail commercial quality",
    book: "warm reading-nook lighting, soft overhead diffusion, comfortable intellectual ambiance, cozy lamp-light feel",
    toy: "bright colorful lighting, saturated fun tones, playful even illumination, kid-friendly vibrant atmosphere",
    stationery: "clean neutral daylight, sharp detail lighting, minimalist aesthetic illumination, desk-lamp accent",
    cleaning: "bright clean clinical lighting, sparkling white tones, fresh hygienic illumination, before-after contrast capable",
    outdoor: "natural golden-hour sunlight, adventure-mood lighting, warm directional sun rays, nature-authentic illumination",
    health: "clean medical-grade white lighting, trustworthy bright illumination, sterile professional atmosphere, precision detail light",
    craft: "warm natural studio lighting, handmade texture revealing, artisan workshop ambiance, creative golden tones",
    digital: "modern cool-blue screen glow accent, clean tech lighting, futuristic subtle illumination, digital-forward atmosphere",
    other: "balanced professional studio lighting, clean even illumination, product-flattering light setup"
};

// Templates that naturally match each category (no override needed)
const TEMPLATE_CATEGORY_MATCH: Partial<Record<ProductCategory, string[]>> = {
    food: ["food-review"],
    beverage: ["food-review"],
    fashion: ["fashion-review"],
    gadget: ["gadget-review"],
    beauty: [],
    supplement: [],
    pet: [],
    baby: [],
    home: ["lifestyle"],
    kitchen: ["food-review", "tutorial"],
    fitness: [],
    auto: ["gadget-review"],
    jewelry: [],
    watch: ["gadget-review"],
    bag: ["fashion-review"],
    shoe: ["fashion-review"],
    book: [],
    toy: [],
    stationery: [],
    cleaning: ["before-after", "tutorial"],
    outdoor: ["lifestyle"],
    health: [],
    craft: ["tutorial"],
    digital: ["gadget-review", "tutorial"],
    other: []
};

/** Smart environment selection: user-selected > AI vision > category override > template default */
const getSmartEnvironment = (
    template: string,
    category: ProductCategory,
    aiEnvironment?: string,
    userBackground?: string
): string => {
    // 1. User-selected background from UI takes TOP priority (unless "auto" or "custom")
    if (userBackground && userBackground !== 'auto' && userBackground !== 'custom') {
        const mapped = USER_BACKGROUND_MAPPING[userBackground];
        if (mapped && mapped.length > 0) return pickRandom(mapped);
    }

    // 2. AI Vision analysis wins over template/category defaults
    if (aiEnvironment) return aiEnvironment;

    // If template naturally matches category, use template environment
    const matchedTemplates = TEMPLATE_CATEGORY_MATCH[category] || [];
    if (matchedTemplates.includes(template)) {
        return ENVIRONMENT_SETTING[template] || ENVIRONMENT_SETTING["product-review"];
    }

    // Otherwise pick random category environment
    const categoryEnvs = CATEGORY_ENVIRONMENTS[category] || CATEGORY_ENVIRONMENTS["other"];
    const categoryEnv = pickRandom(categoryEnvs) as string;
    const templateEnv = ENVIRONMENT_SETTING[template] || ENVIRONMENT_SETTING["product-review"];

    // For generic templates, use category environment primarily
    const genericTemplates = ["product-review", "testimonial", "tutorial", "lifestyle", "trending", "comparison", "before-after"];
    if (genericTemplates.includes(template)) {
        return categoryEnv;
    }

    // For specialized templates (unboxing, flash-sale, mini-drama, brainrot), blend both
    return `${categoryEnv}, ${templateEnv.split(',').slice(-1)[0]?.trim() || ''}`;
};

/** Smart lighting: blend tone-based + category-specific */
const getSmartLighting = (
    voiceTone: string,
    category: ProductCategory,
    aiLighting?: string
): string => {
    if (aiLighting) return aiLighting;
    const toneLighting = LIGHTING_BY_TONE[voiceTone] || LIGHTING_BY_TONE["friendly"];
    const categoryLighting = CATEGORY_LIGHTING[category] || CATEGORY_LIGHTING["other"] || "balanced professional studio lighting, clean even illumination";
    return `${toneLighting}. ${categoryLighting}`;
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
    "fashion-review": "Fashion editorial style, 85mm lens, zero lens distortion, head-to-toe and detail shots, smooth tracking, runway-inspired, 4K",
    "gadget-review": "Tech review aesthetic, 85mm lens, zero lens distortion, frontal eye-level, clean product shots, hands-on close-ups, sharp focus, 4K",
    "unboxing": "ASMR unboxing style, 85mm lens, zero lens distortion, close-up hands, slow-motion reveals, crisp audio-visual, 4K",
    "comparison": "Clean split-frame capable, 85mm lens, zero lens distortion, perfectly centered, symmetrical composition, sharp focus, 4K",
    "testimonial": "Documentary interview style, 85mm lens, zero lens distortion, eye-level framing, shallow depth of field, natural look, 4K",
    "flash-sale": "High-energy commercial, 85mm lens, zero lens distortion, fast cuts, dynamic angles, bold color grading, high frame rate",
    "tutorial": "Educational demo style, 85mm lens, zero lens distortion, overhead and eye-level angles, clear step visibility, steady shots, 4K",
    "lifestyle": "Lifestyle vlog aesthetic, 85mm lens, zero lens distortion, natural movement, golden hour grading, cinematic wide and close shots",
    "trending": "Short-form viral aesthetic, vertical framing, zero lens distortion, trendy transitions, punchy color grading, high frame rate",
    "mini-drama": "Short film cinematic, 85mm lens, zero lens distortion, dramatic angles, emotional color grading, shallow DOF, 4K",
    "before-after": "Transformation reveal style, 85mm lens, zero lens distortion, locked-off comparison shots, perfectly centered, dramatic lighting shift, 4K"
};

// ═══════════════════════════════════════════════════════════════════════════
// VIDEO-SPECIFIC CONFIGS — Camera Motion, Transitions, Voiceover
// Optimized for Google Veo / Flow video generation
// ═══════════════════════════════════════════════════════════════════════════

// Camera Movement — per-template motion directives for video (NOT image)
const CAMERA_MOVEMENT: Record<string, string> = {
    "product-review": "Dynamic sweeping camera movement, smooth orbit around product, engaging depth of field shifts, cinematic tracking",
    "brainrot-product": "Handheld shaky cam, quick whip pans, snap zooms, dynamic tracking, high energy movement",
    "food-review": "Slow cinematic push-in on food, smooth 45-degree orbit around dish, close-up macro tracking on texture",
    "fashion-review": "Smooth tracking shot following model walk, dynamic tilt and pan, fluid dolly movement",
    "gadget-review": "Dynamic macro slider shot, smooth sweeping orbit around device, controlled push-in on features with rack focus",
    "unboxing": "Overhead bird's-eye slowly descending, dynamic 3D rotation, reveal pan from box to product",
    "comparison": "Smooth horizontal slide between two products, dynamic split-focus shifts, controlled sweeping pan",
    "testimonial": "Slow cinematic dolly-in, subtle breathing movement, gentle drift closer during emotional moment",
    "flash-sale": "Fast snap-zoom burst, energetic whip pan to product, dynamic Dutch angle switches with motion blur",
    "tutorial": "Dynamic crane shot descending to eye-level, smooth tracking on hands, engaging cinematic flow",
    "lifestyle": "Floating steadicam follow shot, natural handheld movement, cinematic parallax tracking",
    "trending": "Vertical smartphone POV, trendy snap-zoom, dynamic whip pans matching viral format rhythm",
    "mini-drama": "Cinematic dolly push-in for drama, slow orbit during revelation, dramatic rack focus between subject and product",
    "before-after": "Dynamic wipe transition pan, smooth match-cut slider movement, controlled reveal pan"
};

// ═══════════════════════════════════════════════════════════════════════════
// Cinematic Camera Pool — per-scene camera variety (randomly picked per scene)
// Each entry is a short camera movement directive that adds unique motion flavor
// ═══════════════════════════════════════════════════════════════════════════
const CINEMATIC_CAMERA_POOL: string[] = [
    "Smooth dolly push-in with shallow depth of field",
    "Dynamic sweeping orbit around subject",
    "Slow cinematic crane-down from high angle",
    "Handheld tracking shot following action",
    "Macro slider glide with rack focus transition",
    "Low-angle hero shot tilting up dramatically",
    "Overhead bird's-eye slowly descending",
    "Whip pan with motion blur to new angle",
    "Steady dolly-out revealing full scene",
    "Dutch-angle tilt with dynamic energy",
    "Smooth 180-degree arc around subject",
    "Close-up snap zoom into detail",
    "Gentle floating steadicam drift",
    "Dramatic rack focus foreground to background",
    "Cinematic parallax tracking with depth layers",
    "Slow-motion sweeping pan across scene",
    "Dynamic push-in from wide to tight close-up",
    "Elegant circular orbit with bokeh background",
    "Controlled vertical crane-up reveal",
    "Intimate close-up with subtle breathing movement",
];

/** Pick a random cinematic camera movement from the pool, avoiding repeats within a session */
const pickSceneCamera = (usedIndices?: number[]): { camera: string; index: number } => {
    const available = CINEMATIC_CAMERA_POOL
        .map((c, i) => ({ camera: c, index: i }))
        .filter(c => !usedIndices?.includes(c.index));
    const pick = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : { camera: CINEMATIC_CAMERA_POOL[Math.floor(Math.random() * CINEMATIC_CAMERA_POOL.length)], index: -1 };
    return pick;
};

// Scene Transition — keywords for seamless inter-scene continuity
const SCENE_TRANSITION: Record<string, string> = {
    "product-review": "Seamless match cut transition, ZERO object morphing, strict solid continuity, no clipping, product remains perfectly solid",
    "brainrot-product": "Jump cut style, matching energy between shots, continuous chaotic flow, solid objects",
    "food-review": "Smooth dissolve, consistent warm color grading, solid food presentation, no shape shifting",
    "fashion-review": "Smooth match cut on movement, consistent styling and lighting, solid fabric flow, no morphing",
    "gadget-review": "Clean cut on action, solid device geometry, absolutely NO morphing or clipping, consistent tech-clean grading",
    "unboxing": "Continuous single-take feel, solid object continuity, zero structural morphing",
    "comparison": "Split-screen capable transition, solid shapes, no blending between objects",
    "testimonial": "Gentle dissolve, consistent warm intimate tone, solid character continuity",
    "flash-sale": "Fast hard cut on beat, solid product geometry, no transition warping",
    "tutorial": "Step-numbered transition, logical progression flow, solid physical objects",
    "lifestyle": "Golden-hour dissolve, solid spatial awareness, zero object distortion",
    "trending": "Trend-matching snap transition, solid dimensional structure, no morphing",
    "mini-drama": "Cinematic fade or hard cut on emotion beat, solid actor/object continuity",
    "before-after": "Dramatic wipe or match cut, solid physical forms, no unnatural melting"
};

// ── Voice Persona Database (15 per gender) ──────────────────────────────────
// Each persona has a character appearance descriptor so the AI matches
// the voice persona to the uploaded character image/body type.

interface VoicePersona {
    name: string;
    voiceTone: string;
    ageRange: string;
    age: string;
    characterType: string; // appearance/build description for matching
}

const VOICE_PERSONA_DB: Record<string, VoicePersona[]> = {
    male: [
        // ── ENERGETIC (5 variants) ──
        { name: "Tawan", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นหนุ่มผอมสูง ผมสั้นสไตล์เกาหลี สปอร์ตบอย นักเรียนมัธยม" },
        { name: "First", voiceTone: "energetic", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มฟิตหุ่นล่ำ นักกีฬา/ฟิตเนส ผิวแทน กล้ามชัด พลังงานสูง" },
        { name: "Fluke", voiceTone: "energetic", ageRange: "adult", age: "adult", characterType: "ผู้ชายวัยทำงานแอคทีฟ หุ่นแข็งแรง พิธีกร/นักรีวิว พลังงานเหลือเฟือ" },
        { name: "Gun", voiceTone: "energetic", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มนักศึกษาสายสตรีท ผมทำสี แต่งตัวสตรีทแวร์ ไลฟ์ขายของมืออาชีพ" },
        { name: "Tle", voiceTone: "energetic", ageRange: "adult", age: "adult", characterType: "พิธีกรหนุ่มมาดเท่ ผมเซ็ตเป๊ะ หุ่นดี นักรีวิวสายเทค พลังงานล้น" },
        // ── CALM (5 variants) ──
        { name: "Prem", voiceTone: "calm", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มสุภาพเรียบร้อย ผมยาวเล็กน้อย ใส่แว่น หน้าตาอ่อนโยน นักอ่าน" },
        { name: "Pond", voiceTone: "calm", ageRange: "adult", age: "adult", characterType: "ผู้ชายวัยกลางคน สุขุม ผมเกรียน ใบหน้าคม สง่า แพทย์/ที่ปรึกษา" },
        { name: "Suthep", voiceTone: "calm", ageRange: "middle-age", age: "middle-aged adult", characterType: "ลุงใจดี ผมหงอกเล็กน้อย ท่าทางสุขุม ปราชญ์/ครูบาอาจารย์" },
        { name: "Top", voiceTone: "calm", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มมินิมอล ผมยาวหวีเรียบ เสื้อผ้าโทนเอิร์ธ สุขุม นักเขียน/ช่างภาพ" },
        { name: "Mark", voiceTone: "calm", ageRange: "adult", age: "adult", characterType: "ผู้ชายสง่าเงียบขรึม หนวดเคราเล็กน้อย สายธรรมชาติ โยคะ/ครูสมาธิ" },
        // ── FRIENDLY (5 variants) ──
        { name: "Somsak", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "เด็กหนุ่มข้างบ้าน ยิ้มง่าย ผมตั้ง เสื้อยืดกางเกงยีนส์ เป็นกันเอง" },
        { name: "Bank", voiceTone: "friendly", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มออฟฟิศอบอุ่น ใส่เสื้อเชิ้ตพับแขน ยิ้มหวาน พ่อค้าออนไลน์" },
        { name: "Chai", voiceTone: "friendly", ageRange: "adult", age: "adult", characterType: "คุณพ่อยุคใหม่ หุ่นท้วมนิดๆ ใจดี อบอุ่น บล็อกเกอร์ครอบครัว" },
        { name: "Pete", voiceTone: "friendly", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มบาริสต้า ผมหยิกธรรมชาติ ผ้ากันเปื้อน ยิ้มเป็นมิตร สายกาแฟ" },
        { name: "Dome", voiceTone: "friendly", ageRange: "adult", age: "adult", characterType: "ช่างภาพฟรีแลนซ์ แต่งตัวชิลล์ ยิ้มง่าย เล่าเรื่องสนุก นักเดินทาง" },
        // ── PROFESSIONAL (5 variants) ──
        { name: "Natt", voiceTone: "professional", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มสตาร์ทอัพ สูทสลิมฟิต ผมเซ็ต ดูดีมีระดับ CEO รุ่นใหม่" },
        { name: "Arthit", voiceTone: "professional", ageRange: "adult", age: "adult", characterType: "ผู้บริหาร สูทสากล ท่าทางมั่นใจ น่าเชื่อถือ ผู้เชี่ยวชาญ" },
        { name: "Somchai", voiceTone: "professional", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้ใหญ่มากประสบการณ์ ผมขาวเท่ มาดนิ่ง กูรู/ที่ปรึกษาอาวุโส" },
        { name: "James", voiceTone: "professional", ageRange: "young-adult", age: "young adult", characterType: "ทนายหนุ่ม สูทเข้ารูป ผมเซ็ตเรียบร้อย มาดจริงจัง น่าเชื่อถือ" },
        { name: "Ton", voiceTone: "professional", ageRange: "adult", age: "adult", characterType: "หมอผู้เชี่ยวชาญ เสื้อกาวน์ขาว ท่าทางน่าไว้วางใจ สุขุม แม่นยำ" },
        // ── CUTE (5 variants) ──
        { name: "Beam", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "เด็กหนุ่มหน้าใส ตาโต ผมปัด น่ารักสดใส ไอดอลวัยรุ่น" },
        { name: "Win", voiceTone: "cute", ageRange: "young-adult", age: "young adult", characterType: "ซอฟท์บอย ผิวขาว หน้าหวาน เสื้อผ้าพาสเทล อินฟลูเอนเซอร์" },
        { name: "Ohm", voiceTone: "cute", ageRange: "adult", age: "adult", characterType: "ผู้ชายเสน่ห์แรง ยิ้มมีเสน่ห์ ลุคชิลล์ ดูดีแบบไม่ต้องพยายาม" },
        { name: "New", voiceTone: "cute", ageRange: "young-adult", age: "young adult", characterType: "หนุ่มน้อยหน้าเด็ก ผิวใส ผมม้า ตาแป๋ว สดใสร่าเริง ไอดอลเกาหลี" },
        { name: "Film", voiceTone: "cute", ageRange: "adult", age: "adult", characterType: "หนุ่มหน้าใสดูอ่อนกว่าวัย ผมยาวปัดข้าง ยิ้มละไม เสน่ห์ธรรมชาติ" },
        // ── CHILD (6-12) — 20 personas ──
        { name: "Kan", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กชายร่าเริง ผมสั้นเกรียน ยิ้มกว้าง ชุดนักเรียน วิ่งเล่นตลอด" },
        { name: "Pong", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กชายซน ผมตั้ง เสื้อยืดสีสด กางเกงขาสั้น พลังงานเหลือเฟือ" },
        { name: "Jet", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กชายนักกีฬา ชุดกีฬา ผมสั้น ร่างกายแข็งแรง กระฉับกระเฉง" },
        { name: "ArmJr", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กชายตัวเล็กน่ารัก ผมหน้าม้า แก้มป่อง ชอบเต้น สนุกสนาน" },
        { name: "NaiNoi", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กชายเงียบสงบ ใส่แว่น ผมเรียบร้อย ชอบอ่านหนังสือ นักคิด" },
        { name: "Pun", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กชายสุขุม ผมสั้นเรียบ ท่าทางผู้ใหญ่ ชอบวาดรูป สงบนิ่ง" },
        { name: "TonEk", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กชายขี้อาย ผมยาวนิด ตาโต เสื้อผ้าเรียบร้อย อ่อนโยน" },
        { name: "BossJr", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กชายนิ่งๆ ผมตัดสั้น ใบหน้าจริงจัง ชอบต่อเลโก้ มีสมาธิ" },
        { name: "Earth", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กชายยิ้มง่าย แก้มแดง ผมหยิกธรรมชาติ เป็นกันเอง คุยเก่ง" },
        { name: "BoomJr", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กชายร่าเริง ผมทรงเห็ด ยิ้มตลอด ชอบเล่าเรื่อง เพื่อนเยอะ" },
        { name: "Namo", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กชายอ้วนนิด ใจดี ผมสั้น หน้าตาน่ารัก ชอบช่วยเหลือคน" },
        { name: "MaxJr", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กชายหน้าตาดี ผมเซ็ต เสื้อผ้าน่ารัก อบอุ่น เป็นมิตร" },
        { name: "PalmJr", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กชายฉลาด ใส่แว่น ชุดเรียบร้อย ท่าทางมั่นใจ หัวหน้าห้อง" },
        { name: "Smart", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กชายเรียนเก่ง ผมตัดสั้น ยูนิฟอร์มเรียบ จริงจัง นักพูด" },
        { name: "BookJr", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กชายสายวิชาการ ใส่แว่น ผมเรียบ ชุดนักเรียน น่าเชื่อถือ" },
        { name: "BrightJr", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กชายเป็นผู้นำ ผมสั้น ท่าทางมั่นใจ ชุดเรียบร้อย ประธานนักเรียน" },
        { name: "MooJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กชายตัวจิ๋ว หน้ากลม ตาโต แก้มป่อง น่ารักมาก น่าหยิก" },
        { name: "PoohJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กชายอ้วนกลม ยิ้มหวาน ผมนิ่ม ตาหวาน น่ากอด อ้อนเก่ง" },
        { name: "BallJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กชายตัวกลม แก้มแดง ผมตั้ง ยิ้มซน น่ารักสดใส" },
        { name: "NonJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กชายหน้าใส ผมม้า ตาแป๋ว เสื้อลายการ์ตูน น่ารักใสซื่อ" },
        // ── ADDITIONAL TEEN (13-20) — 17 more personas ──
        { name: "Ping", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสายสปอร์ต ผมสั้น ชุดกีฬา กระฉับกระเฉง นักบาสเก็ตบอล" },
        { name: "Folk", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "หนุ่มวัยรุ่นสายแดนซ์ ผมทำสี เสื้อผ้าสตรีท พลังงานสูง" },
        { name: "MixM", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "เด็กหนุ่มม.ต้น ผมตั้ง เสื้อยืดกราฟิก กางเกงยีนส์ สนุกสนาน" },
        { name: "Turbo", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสายเกม ผมทำสี หูฟังคล้องคอ เสื้อยืดโอเวอร์ไซส์" },
        { name: "TanM", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสงบ ผมยาวปัดข้าง ใส่แว่น เสื้อเชิ้ต นักอ่าน" },
        { name: "Frame", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "หนุ่มม.ปลาย สุขุม ผมเรียบ เสื้อผ้ามินิมอล ช่างภาพ" },
        { name: "IceM", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นเงียบเท่ ผมยาว เสื้อผ้าสีเข้ม ดูลึกลับ นักดนตรี" },
        { name: "Zen", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "หนุ่มวัยรุ่นนิ่ง ผมสั้น เสื้อผ้าเรียบ สงบ นักเขียน" },
        { name: "NutM", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "เด็กหนุ่มเป็นกันเอง ผมสั้น ยิ้มง่าย เสื้อยืดลำลอง คุยสนุก" },
        { name: "GapM", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นอบอุ่น ผมหยิก ใส่เสื้อฮู้ด ยิ้มเป็นมิตร เพื่อนเยอะ" },
        { name: "AekM", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "หนุ่มม.ปลาย ใจดี ผมเซ็ต เสื้อโปโล อบอุ่น รุ่นพี่ที่น่ารัก" },
        { name: "Plan", voiceTone: "professional", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสายวิชาการ ผมตัดสั้น ชุดนักเรียนเรียบ ประธานนักเรียน" },
        { name: "Best", voiceTone: "professional", ageRange: "teen", age: "teenager", characterType: "หนุ่มม.ปลายจริงจัง ใส่แว่น ผมเรียบ ชุดเนี้ยบ หัวหน้าห้อง" },
        { name: "Title", voiceTone: "professional", ageRange: "teen", age: "teenager", characterType: "นักศึกษาปี 1 มั่นใจ ผมเซ็ต เสื้อเชิ้ต นักพูด น่าเชื่อถือ" },
        { name: "Champ", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "เด็กหนุ่มหน้าใส ตาโต ผมม้า แก้มป่อง น่ารัก ไอดอลม.ต้น" },
        { name: "BenzM", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นหน้าเด็ก ผิวขาว ผมนิ่ม เสื้อผ้าพาสเทล สดใส" },
        { name: "PopM", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นซอฟท์บอย ผมปัดข้าง ตาหวาน ยิ้มละมุน อ่อนหวาน" },
        // ── MIDDLE-AGE (46-60) — 10 personas ──
        { name: "Wuttichai", voiceTone: "energetic", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้ชายวัยกลางคนแข็งแรง ผมสั้นหงอกนิด หุ่นล่ำ เสื้อโปโล นักวิ่งมาราธอน พลังงานสูง" },
        { name: "Preecha", voiceTone: "energetic", ageRange: "middle-age", age: "middle-aged adult", characterType: "ลุงวัยกลางคนสายกีฬา ผมสั้น ผิวแทน เสื้อกีฬา กระฉับกระเฉง นักเดินทาง" },
        { name: "SuthepCalm", voiceTone: "calm", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้ชายวัยกลางคนสุขุม ผมหงอกเล็กน้อย ใส่แว่น เสื้อเชิ้ต อาจารย์มหาลัย" },
        { name: "Prasert", voiceTone: "calm", ageRange: "middle-age", age: "middle-aged adult", characterType: "ลุงนิ่งสง่า ผมสั้นเทา สูทลำลอง ท่าทางมั่นคง อดีตผู้พิพากษา" },
        { name: "Anon", voiceTone: "friendly", ageRange: "middle-age", age: "middle-aged adult", characterType: "ลุงข้างบ้านใจดี ผมหงอกนิด ยิ้มง่าย เสื้อยืดลำลอง อบอุ่น คุยสนุก" },
        { name: "Worawit", voiceTone: "friendly", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้ชายวัยกลางคนอบอุ่น ผมสั้นเทา เสื้อผ้าสบาย พ่อค้าตลาดนัด เป็นกันเอง" },
        { name: "SomchaiPro", voiceTone: "professional", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้บริหารวัยกลางคน ผมหงอกเล็กน้อย สูทเข้ารูป แว่นตา มาดมั่นใจ CEO" },
        { name: "Thanakorn", voiceTone: "professional", ageRange: "middle-age", age: "middle-aged adult", characterType: "แพทย์ผู้เชี่ยวชาญวัยกลางคน ผมสั้นเทา เสื้อกาวน์ ท่าทางน่าเชื่อถือ" },
        { name: "LungJai", voiceTone: "cute", ageRange: "middle-age", age: "middle-aged adult", characterType: "ลุงอารมณ์ดี หุ่นท้วมนิด ผมหงอกนิด ยิ้มซน ตาเป็นประกาย น่ารัก" },
        { name: "LungDee", voiceTone: "cute", ageRange: "middle-age", age: "middle-aged adult", characterType: "ลุงใจดีหน้าอ่อนกว่าวัย ผมสั้นเรียบ ยิ้มหวาน เสื้อยืดลายน่ารัก อบอุ่น" },
        // ── SENIOR (60+) — 20 personas ──
        { name: "Sombat", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "คุณลุงแข็งแรง ผมขาวสั้น ยิ้มกว้าง ชุดกีฬา ออกกำลังกายทุกวัน" },
        { name: "Prasit", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "ลุงพลังงานสูง ผมหงอกเล็กน้อย เสื้อโปโล กางเกงขายาว นักเดินทาง" },
        { name: "Wichai", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "คุณตาสุขภาพดี ผมขาว หุ่นดี เสื้อเชิ้ต พลังงานเยอะ ไลฟ์สด" },
        { name: "Boonchai", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "คุณลุงร่าเริง ผมขาวสั้น แว่นตา เสื้อฮาวาย อารมณ์ดีตลอด" },
        { name: "Boonmee", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณตาสุขุม ผมขาวยาว หนวดเครา เสื้อผ้าไทย ปราชญ์ชาวบ้าน" },
        { name: "Surin", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณลุงสงบ ผมหงอก ใส่แว่น เสื้อเชิ้ตขาว อดีตครู น่าเชื่อถือ" },
        { name: "Prapas", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณลุงนิ่งสง่า ผมขาวเรียบ เสื้อผ้าเรียบร้อย อดีตข้าราชการ" },
        { name: "Somsong", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณตาใจดี ผมขาวทั้งหัว หน้าตายิ้มแย้ม เสื้อคอกลม สงบนิ่ง" },
        { name: "Sawat", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "คุณลุงข้างบ้าน ผมหงอก ยิ้มง่าย เสื้อยืด เป็นกันเอง คุยสนุก" },
        { name: "Prasan", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "คุณลุงอบอุ่น ผมขาวสั้น แว่นตา เสื้อโปโล ใจดี ช่วยเหลือคน" },
        { name: "Amnuay", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "คุณตาใจดี ผมขาว หน้าตาอบอุ่น เสื้อผ้าสบาย เล่าเรื่องเก่ง" },
        { name: "SomjitM", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "ลุงยิ้มหวาน ผมหงอกเล็กน้อย เสื้อเชิ้ต อารมณ์ดี เป็นมิตร" },
        { name: "Manoch", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "ผู้ใหญ่ทรงคุณวุฒิ ผมขาวเนี้ยบ สูทสากล น่าเคารพ" },
        { name: "Viroj", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "คุณหมออาวุโส เสื้อกาวน์ แว่นตา ท่าทางแม่นยำ เชี่ยวชาญ" },
        { name: "Kriang", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "นักธุรกิจรุ่นใหญ่ ผมหงอกนิด สูทภูมิฐาน มั่นใจ เด็ดขาด" },
        { name: "Chanchai", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "อาจารย์มหาลัย ผมขาว ใส่แว่น สูทลำลอง ภูมิปัญญา" },
        { name: "LungYim", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณลุงหน้าตาใจดี แก้มยุ้ย ยิ้มตาหยี เสื้อไหมพรม อบอุ่น" },
        { name: "TaWaan", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณตาตัวเล็ก ยิ้มหวาน ผมขาวปุย อารมณ์ดี น่ารัก" },
        { name: "LungPao", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณลุงอารมณ์ดี หุ่นท้วม เสื้อลายดอก หน้าตาตลก เฮฮา" },
        { name: "TaNoi", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณตาผอมบาง ใส่หมวก ท่าทางใจดี อมยิ้มตลอด น่าเคารพรัก" },
        { name: "LungSak", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณลุงน่ารัก ผมหงอก ยิ้มซน ตาเป็นประกาย อารมณ์ดี" },
        { name: "PuChart", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณตาขี้เล่น แว่นตากลม ยิ้มกว้าง น่ารัก อารมณ์ดี" },
        { name: "DangM", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณตายิ้มแฉ่ง หน้ากลม แก้มป่อง เสื้อสีสด น่ากอด" },
        { name: "MaewM", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณลุงหน้าเด็ก ผมหงอกนิด ยิ้มละไม อ่อนโยน น่ารักดูอ่อนกว่าวัย" },
    ],
    female: [
        // ── ENERGETIC (5 variants) ──
        { name: "Fah", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "สาววัยรุ่นผมยาว ใส่ชุดสปอร์ต สดใสร่าเริง น่ารัก" },
        { name: "Mint", voiceTone: "energetic", ageRange: "young-adult", age: "young adult", characterType: "สาวฟิตเนส หุ่นดี ผิวสวย แข็งแรง พลังงานสูง" },
        { name: "Pat", voiceTone: "energetic", ageRange: "adult", age: "adult", characterType: "ผู้หญิงแกร่ง พิธีกร/นักรีวิว พลังเยอะ แต่งตัวจัดจ้าน มีออร่า" },
        { name: "Bow", voiceTone: "energetic", ageRange: "young-adult", age: "young adult", characterType: "สาวนักศึกษาเปรี้ยวจี๊ด ผมสั้นบ๊อบ แต่งตัวสตรีท ไลฟ์สดมือโปร พลังเยอะ" },
        { name: "Aom", voiceTone: "energetic", ageRange: "adult", age: "adult", characterType: "แม่ค้าออนไลน์ตัวแม่ หุ่นดี แต่งตัวจัด เสียงดัง พลังงานล้นเวที นักขาย" },
        // ── CALM (5 variants) ──
        { name: "Namwan", voiceTone: "calm", ageRange: "young-adult", age: "young adult", characterType: "สาวเรียบร้อย ผมยาวตรง ใบหน้าอ่อนหวาน แต่งตัวมินิมอล สุภาพ" },
        { name: "Noon", voiceTone: "calm", ageRange: "adult", age: "adult", characterType: "ผู้หญิงสง่า ผมประบ่า มาดสุขุม แพทย์/นักจิตวิทยา น่าไว้วางใจ" },
        { name: "Aree", voiceTone: "calm", ageRange: "middle-age", age: "middle-aged adult", characterType: "คุณป้าสง่างาม ผมสั้นเรียบร้อย ท่าทางอบอุ่น ครู/ที่ปรึกษาอาวุโส" },
        { name: "Mild", voiceTone: "calm", ageRange: "young-adult", age: "young adult", characterType: "สาวโยคะ ผิวเปล่งปลั่ง ผมยาวถักเปีย เสื้อผ้าธรรมชาติ สงบนิ่ง" },
        { name: "Orn", voiceTone: "calm", ageRange: "adult", age: "adult", characterType: "เภสัชกรหญิง ท่าทางน่าเชื่อถือ ผมรวบมวยต่ำ เสื้อกาวน์ สุขุมนุ่มนวล" },
        // ── FRIENDLY (5 variants) ──
        { name: "Somying", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "สาวน้อยข้างบ้าน ยิ้มสดใส แก้มแดง เสื้อยืดน่ารัก เป็นกันเอง" },
        { name: "Pear", voiceTone: "friendly", ageRange: "young-adult", age: "young adult", characterType: "สาวออฟฟิศอบอุ่น ใส่เสื้อผ้าแคชชวล ยิ้มเก่ง แม่ค้าออนไลน์" },
        { name: "Nong", voiceTone: "friendly", ageRange: "adult", age: "adult", characterType: "คุณแม่ยุคใหม่ หน้าตาดี อบอุ่น ห่วงใย บล็อกเกอร์ครอบครัว" },
        { name: "Jui", voiceTone: "friendly", ageRange: "young-adult", age: "young adult", characterType: "สาวร้านกาแฟ ผ้ากันเปื้อนน่ารัก ผมม้า ยิ้มหวาน เป็นกันเอง อบอุ่น" },
        { name: "Kratae", voiceTone: "friendly", ageRange: "adult", age: "adult", characterType: "แม่บ้านสายรีวิว แต่งตัวสบายๆ หน้าตาดี ยิ้มง่าย เล่าเรื่องสนุก" },
        // ── PROFESSIONAL (5 variants) ──
        { name: "Ploy", voiceTone: "professional", ageRange: "young-adult", age: "young adult", characterType: "สาวมั่น สูทสวย ผมเก็บมวย ดูดีมีระดับ ผู้ก่อตั้งสตาร์ทอัพ" },
        { name: "Kwan", voiceTone: "professional", ageRange: "adult", age: "adult", characterType: "ผู้บริหารหญิง สง่า น่าเชื่อถือ เสื้อผ้าเนี้ยบ ผู้เชี่ยวชาญ" },
        { name: "Suda", voiceTone: "professional", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้หญิงมากประสบการณ์ สง่างาม ผมสั้นทรงผู้ดี กูรู/ศาสตราจารย์" },
        { name: "May", voiceTone: "professional", ageRange: "young-adult", age: "young adult", characterType: "นักการตลาดสาว สูทเข้ารูป ผมยาวตรง แว่นตาทรงเท่ มาดมั่นใจ" },
        { name: "Ning", voiceTone: "professional", ageRange: "adult", age: "adult", characterType: "หมอผิวหนัง เสื้อกาวน์ขาว ท่าทางน่าไว้วางใจ ผมประบ่า สุขุม" },
        // ── CUTE (5 variants) ──
        { name: "Minnie", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "สาวน้อยหน้าใส ตากลมโต ผมสองข้าง ชุดน่ารักพาสเทล ไอดอล" },
        { name: "Ice", voiceTone: "cute", ageRange: "young-adult", age: "young adult", characterType: "สาวหวาน ผิวขาว ผมยาว แต่งตัวน่ารัก อินฟลูเอนเซอร์บิวตี้" },
        { name: "Jiew", voiceTone: "cute", ageRange: "adult", age: "adult", characterType: "ผู้หญิงเสน่ห์แรง หน้าเด็ก ยิ้มหวาน ดูอ่อนกว่าวัย มีเสน่ห์" },
        { name: "Bam", voiceTone: "cute", ageRange: "young-adult", age: "young adult", characterType: "สาวน้อยผมม้าหน้าเด็ก ตาแป๋ว แก้มป่อง ชุดน่ารักสไตล์ญี่ปุ่น" },
        { name: "Pim", voiceTone: "cute", ageRange: "adult", age: "adult", characterType: "สาวหวานหน้าเด็ก ผมลอนยาว ผิวขาวใส ยิ้มหวานมีเสน่ห์ บิวตี้บล็อกเกอร์" },
        // ── CHILD (6-12) — 20 personas ──
        { name: "Fon", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กหญิงร่าเริง ผมหางม้า ชุดนักเรียน ยิ้มสดใส วิ่งเล่นตลอด" },
        { name: "Pleng", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กหญิงซน ผมสั้นบ๊อบ เสื้อยืดสีสด กระโปรง พลังงานเยอะ" },
        { name: "JoyF", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กหญิงนักกีฬา ชุดกีฬา ผมถักเปีย แข็งแรง กระฉับกระเฉง" },
        { name: "BeeJr", voiceTone: "energetic", ageRange: "child", age: "child", characterType: "เด็กหญิงตัวเล็กน่ารัก ผมสองข้าง แก้มแดง ชอบเต้น สนุกสนาน" },
        { name: "NunJr", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กหญิงเงียบสงบ ผมยาวตรง ใส่แว่น ชอบอ่านหนังสือ นักเรียนดี" },
        { name: "PanJr", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กหญิงสุขุม ผมยาวถักเปีย ท่าทางผู้ใหญ่ ชอบวาดรูป สงบ" },
        { name: "NamJr", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กหญิงขี้อาย ผมยาว ตาโต เสื้อผ้าเรียบร้อย อ่อนหวาน" },
        { name: "DaoJr", voiceTone: "calm", ageRange: "child", age: "child", characterType: "เด็กหญิงนิ่งๆ ผมตัดสั้น ใบหน้าจริงจัง ชอบเขียนไดอารี่ มีสมาธิ" },
        { name: "NidJr", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กหญิงยิ้มง่าย แก้มป่อง ผมหน้าม้า เป็นกันเอง คุยเก่ง" },
        { name: "Prae", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กหญิงร่าเริง ผมยาว ยิ้มตลอด ชอบเล่าเรื่อง เพื่อนเยอะ" },
        { name: "FaiJr", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กหญิงอ้วนนิด ใจดี ผมสั้น หน้าตาน่ารัก ชอบช่วยเหลือเพื่อน" },
        { name: "TonNid", voiceTone: "friendly", ageRange: "child", age: "child", characterType: "เด็กหญิงหน้าตาดี ผมยาว เสื้อผ้าน่ารัก อบอุ่น เป็นมิตร" },
        { name: "ViewJr", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กหญิงฉลาด ใส่แว่น ชุดเรียบร้อย ท่าทางมั่นใจ หัวหน้าห้อง" },
        { name: "EyeJr", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กหญิงเรียนเก่ง ผมถักเปีย ยูนิฟอร์มเรียบ จริงจัง นักพูด" },
        { name: "GamJr", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กหญิงสายวิชาการ ใส่แว่น ผมเรียบ ชุดนักเรียน น่าเชื่อถือ" },
        { name: "SmartF", voiceTone: "professional", ageRange: "child", age: "child", characterType: "เด็กหญิงเป็นผู้นำ ผมยาว ท่าทางมั่นใจ ชุดเรียบร้อย ประธานนักเรียน" },
        { name: "MewJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กหญิงตัวจิ๋ว หน้ากลม ตาโต แก้มป่อง น่ารักมาก น่าหยิก" },
        { name: "NongPim", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กหญิงอ้วนกลม ยิ้มหวาน ผมสองข้าง ตาหวาน น่ากอด อ้อนเก่ง" },
        { name: "MookJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กหญิงตัวกลม แก้มแดง ผมหน้าม้า ยิ้มซน น่ารักสดใส" },
        { name: "WanJr", voiceTone: "cute", ageRange: "child", age: "child", characterType: "เด็กหญิงหน้าใส ผมยาว ตาแป๋ว เสื้อลายดอกไม้ น่ารักใสซื่อ" },
        // ── ADDITIONAL TEEN (13-20) — 17 more personas ──
        { name: "Fern", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "สาววัยรุ่นสายแดนซ์ ผมยาว ชุดสปอร์ต กระฉับกระเฉง นักเต้น" },
        { name: "PangF", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "สาววัยรุ่นไฟแรง ผมสั้น เสื้อผ้าสตรีท พลังงานสูง ยูทูบเบอร์" },
        { name: "Punch", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "สาวม.ต้น ผมหางม้า เสื้อยืดกราฟิก กระโปรง สนุกสนาน" },
        { name: "InkF", voiceTone: "energetic", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสาวสายเกม ผมทำสี หูฟัง เสื้อยืดโอเวอร์ไซส์ พลังเยอะ" },
        { name: "NoonJr", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "สาววัยรุ่นสงบ ผมยาวตรง ใส่แว่น เสื้อเชิ้ต นักอ่าน" },
        { name: "PraewF", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "สาวม.ปลาย สุขุม ผมยาว เสื้อผ้ามินิมอล ช่างภาพ" },
        { name: "FilmF", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นเงียบสง่า ผมยาว เสื้อผ้าสีอ่อน ดูสุขุม นักเขียน" },
        { name: "WanTeen", voiceTone: "calm", ageRange: "teen", age: "teenager", characterType: "สาววัยรุ่นนิ่ง ผมประบ่า เสื้อผ้าเรียบ สงบ นักวาดรูป" },
        { name: "Tangmo", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "สาวม.ต้นเป็นกันเอง ผมสั้น ยิ้มง่าย เสื้อยืดลำลอง คุยสนุก" },
        { name: "CreamF", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสาวอบอุ่น ผมยาว ใส่เสื้อฮู้ด ยิ้มเป็นมิตร เพื่อนเยอะ" },
        { name: "Peach", voiceTone: "friendly", ageRange: "teen", age: "teenager", characterType: "สาวม.ปลาย ใจดี ผมลอน เสื้อผ้าน่ารัก อบอุ่น รุ่นพี่ที่น่ารัก" },
        { name: "Grace", voiceTone: "professional", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสายวิชาการ ผมยาวตรง ชุดนักเรียนเรียบ ประธานนักเรียน" },
        { name: "MindF", voiceTone: "professional", ageRange: "teen", age: "teenager", characterType: "สาวม.ปลายจริงจัง ใส่แว่น ผมเรียบ ชุดเนี้ยบ หัวหน้าห้อง" },
        { name: "Proud", voiceTone: "professional", ageRange: "teen", age: "teenager", characterType: "นักศึกษาสาวปี 1 มั่นใจ ผมยาว เสื้อเชิ้ต นักพูด น่าเชื่อถือ" },
        { name: "MinkF", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "สาวม.ต้นหน้าใส ตาโต ผมสองข้าง แก้มป่อง น่ารัก ไอดอล" },
        { name: "Pinky", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นสาวหน้าเด็ก ผิวขาว ผมยาว เสื้อผ้าพาสเทล สดใส" },
        { name: "PerryF", voiceTone: "cute", ageRange: "teen", age: "teenager", characterType: "วัยรุ่นหวานใส ผมลอน ตาหวาน ยิ้มละมุน อ่อนหวาน น่ารัก" },
        // ── MIDDLE-AGE (46-60) — 10 personas ──
        { name: "Ratchanee", voiceTone: "energetic", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้หญิงวัยกลางคนแข็งแรง ผมสั้นหงอกนิด หุ่นดี เสื้อกีฬา นักวิ่ง พลังงานสูง" },
        { name: "Jintana", voiceTone: "energetic", ageRange: "middle-age", age: "middle-aged adult", characterType: "ป้าวัยกลางคนร่าเริง ผมประบ่า เสื้อผ้าสีสด แม่ค้าออนไลน์ กระฉับกระเฉง" },
        { name: "Wanna", voiceTone: "calm", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้หญิงวัยกลางคนสง่า ผมสั้นเทา ใส่แว่น เสื้อเชิ้ตขาว อาจารย์มหาลัย สุขุม" },
        { name: "Nittaya", voiceTone: "calm", ageRange: "middle-age", age: "middle-aged adult", characterType: "ป้านิ่งสง่างาม ผมประบ่าเทา เสื้อผ้าเรียบร้อย อดีตข้าราชการ น่าเชื่อถือ" },
        { name: "Urai", voiceTone: "friendly", ageRange: "middle-age", age: "middle-aged adult", characterType: "ป้าข้างบ้านใจดี ผมสั้นหงอกนิด ยิ้มง่าย เสื้อยืดลำลอง อบอุ่น คุยสนุก" },
        { name: "Kamol", voiceTone: "friendly", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้หญิงวัยกลางคนอบอุ่น ผมยาวเทา เสื้อผ้าสบาย แม่ค้าตลาดนัด เป็นกันเอง" },
        { name: "SudaPro", voiceTone: "professional", ageRange: "middle-age", age: "middle-aged adult", characterType: "ผู้บริหารหญิงวัยกลางคน ผมสั้นเทา สูทเข้ารูป แว่นตา มาดมั่นใจ ผู้จัดการ" },
        { name: "Ratree", voiceTone: "professional", ageRange: "middle-age", age: "middle-aged adult", characterType: "แพทย์หญิงผู้เชี่ยวชาญวัยกลางคน ผมประบ่า เสื้อกาวน์ ท่าทางน่าไว้วางใจ" },
        { name: "PaJai", voiceTone: "cute", ageRange: "middle-age", age: "middle-aged adult", characterType: "ป้าอารมณ์ดี หุ่นท้วมนิด ผมสั้นหงอกนิด ยิ้มซน ตาเป็นประกาย น่ารัก" },
        { name: "PaDee", voiceTone: "cute", ageRange: "middle-age", age: "middle-aged adult", characterType: "ป้าใจดีหน้าอ่อนกว่าวัย ผมยาวเทา ยิ้มหวาน เสื้อลายดอก อบอุ่น น่ารัก" },
        // ── SENIOR (60+) — 20 personas ──
        { name: "Somporn", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "คุณป้าแข็งแรง ผมสั้นขาว ยิ้มกว้าง ชุดกีฬา ออกกำลังกายทุกวัน" },
        { name: "Pranee", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "ป้าพลังงานสูง ผมสั้นหงอก เสื้อโปโล กางเกงขายาว นักเดินทาง" },
        { name: "Siriporn", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "คุณย่าสุขภาพดี ผมขาวสั้น หุ่นดี เสื้อผ้าสีสด พลังงานเยอะ" },
        { name: "Wilai", voiceTone: "energetic", ageRange: "senior", age: "senior", characterType: "คุณป้าร่าเริง ผมสั้นขาว แว่นตา เสื้อลายดอก อารมณ์ดีตลอด" },
        { name: "Boonruang", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณย่าสุขุม ผมขาวยาวมวย เสื้อผ้าไทย ปราชญ์หญิง น่าเคารพ" },
        { name: "Sunee", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณป้าสงบ ผมสั้นหงอก ใส่แว่น เสื้อเชิ้ตขาว อดีตครู น่าเชื่อถือ" },
        { name: "Prapai", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณป้านิ่งสง่า ผมขาวเรียบ เสื้อผ้าเรียบร้อย อดีตข้าราชการ" },
        { name: "Duangjai", voiceTone: "calm", ageRange: "senior", age: "senior", characterType: "คุณย่าใจดี ผมขาวทั้งหัว หน้าตายิ้มแย้ม เสื้อผ้าไทย สงบนิ่ง" },
        { name: "Sawang", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "คุณป้าข้างบ้าน ผมสั้นหงอก ยิ้มง่าย เสื้อยืด เป็นกันเอง คุยสนุก" },
        { name: "Prapa", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "คุณป้าอบอุ่น ผมขาวสั้น แว่นตา เสื้อผ้าสบาย ใจดี ช่วยเหลือคน" },
        { name: "Amporn", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "คุณย่าใจดี ผมขาว หน้าตาอบอุ่น เสื้อผ้าไทย เล่าเรื่องเก่ง" },
        { name: "SomjitF", voiceTone: "friendly", ageRange: "senior", age: "senior", characterType: "ป้ายิ้มหวาน ผมหงอกเล็กน้อย เสื้อลายดอก อารมณ์ดี เป็นมิตร" },
        { name: "Thawee", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "ผู้หญิงอาวุโสมากประสบการณ์ ผมขาวสั้น สูทสากล อดีตผู้บริหาร น่าเชื่อถือ" },
        { name: "Sudarat", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "คุณป้าผู้เชี่ยวชาญ ผมขาว แว่นตา เสื้อผ้าทางการ อาจารย์เกษียณ" },
        { name: "Usa", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "อดีตแพทย์หญิงอาวุโส ผมขาวสั้น เสื้อกาวน์ ท่าทางน่าไว้วางใจ" },
        { name: "Wimol", voiceTone: "professional", ageRange: "senior", age: "senior", characterType: "ศาสตราจารย์หญิงเกษียณ ผมขาว แว่น สูท กูรูผู้รู้จริง" },
        { name: "YaSiri", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณย่าน่ารัก ผมขาวสั้น ยิ้มซน ตาเป็นประกาย เสื้อยืด อารมณ์ดี" },
        { name: "YaPim", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณย่าขี้เล่น ผมขาว แว่นตากลม ยิ้มหวาน เสื้อลายดอก น่ารัก" },
        { name: "YaNoi", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณย่ายิ้มแฉ่ง ผมขาว หน้ากลม แก้มป่อง เสื้อผ้าสีสด น่ากอด" },
        { name: "YaWan", voiceTone: "cute", ageRange: "senior", age: "senior", characterType: "คุณป้าหน้าเด็ก ผมหงอกนิด ยิ้มละไม อ่อนโยน น่ารักดูอ่อนกว่าวัย" },
    ]
};

/**
 * Lookup persona by gender + voiceTone + ageRange (with smart fallback).
 * Priority: exact match → same tone any age → same age any tone → first of tone.
 */
function getPersona(gender: string, voiceTone: string, ageRange?: string): VoicePersona {
    const genderKey = gender === 'male' ? 'male' : 'female';
    const pool = VOICE_PERSONA_DB[genderKey];
    const rnd = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    // Compatible age ranges — e.g. UI "adult" maps to DB young-adult/adult/middle-age
    const COMPATIBLE_AGES: Record<string, string[]> = {
        "child": ["child"],
        "teen": ["teen"],
        "young-adult": ["young-adult", "teen", "adult"],
        "adult": ["adult", "young-adult", "middle-age"],
        "middle-age": ["middle-age", "adult"],
        "senior": ["senior"]
    };
    const compatibleAges = ageRange ? (COMPATIBLE_AGES[ageRange] || [ageRange]) : [];

    // Priority 1: same tone + matching age range → random pick (diverse personas within age group)
    if (ageRange) {
        const toneAndAge = pool.filter(p => p.voiceTone === voiceTone && compatibleAges.includes(p.ageRange));
        if (toneAndAge.length > 0) return rnd(toneAndAge);
    }

    // Priority 2: any tone + matching age range (age is more important than tone for visual)
    if (ageRange) {
        const anyToneMatchAge = pool.filter(p => compatibleAges.includes(p.ageRange));
        if (anyToneMatchAge.length > 0) return rnd(anyToneMatchAge);
    }

    // Priority 3: same tone, any age (fallback)
    const sameTonePool = pool.filter(p => p.voiceTone === voiceTone);
    if (sameTonePool.length > 0) return rnd(sameTonePool);

    // Fallback: random from any friendly, then first of pool
    const friendlyPool = pool.filter(p => p.voiceTone === 'friendly');
    return friendlyPool.length > 0 ? rnd(friendlyPool) : pool[0];
}

/**
 * Build a FIXED speaking-character descriptor for video generation.
 * 
 * IMPORTANT: Google Veo generates SILENT video — it cannot produce audio.
 * This descriptor guides VISUAL speaking behavior only (mouth movement, expression, gestures).
 * Do NOT include audio-specific terms (pitch Hz, tempo WPM, resonance, breath patterns)
 * as they confuse the video model and may trigger content policy errors.
 * Do NOT use the phrase "lip sync" — it gets truncated to "Lip." triggering safety filters.
 */
const buildVoiceoverDescriptor = (gender: string, voiceTone: string, ageRange?: string, preSelectedPersona?: VoicePersona): string => {
    const isMale = gender === 'male';
    const persona = preSelectedPersona || getPersona(gender, voiceTone, ageRange);

    // Age+Gender-aware character role label — no "presenter" for children/teens
    const VOICEOVER_ROLE_LABEL: Record<string, { male: string; female: string }> = {
        "child": { male: "Thai young boy", female: "Thai young girl" },
        "teen": { male: "Thai teenage boy", female: "Thai teenage girl" },
        "young-adult": { male: "Thai young man", female: "Thai young woman" },
        "adult": { male: "Thai male presenter", female: "Thai female presenter" },
        "middle-age": { male: "Thai mature male presenter", female: "Thai mature female presenter" },
        "senior": { male: "Thai elderly male", female: "Thai elderly female" },
    };
    const roleLabel = (VOICEOVER_ROLE_LABEL[ageRange || 'adult'] || VOICEOVER_ROLE_LABEL['adult'])[isMale ? 'male' : 'female'];

    // Age-appropriate visual appearance label — tells Veo exactly how old the character looks
    // SAFETY: Do NOT use specific minor ages (e.g. "6-12") — triggers Veo safety filters for minors in commercial content.
    const AGE_VISUAL_LABEL: Record<string, string> = {
        "child": "young child with round youthful face and small frame",
        "teen": "teenager with youthful fresh face and slim build",
        "young-adult": "young adult in early twenties with vibrant appearance",
        "adult": "adult in thirties with mature confident look",
        "middle-age": "middle-aged person with seasoned experienced appearance",
        "senior": "elderly person with gray hair and wisdom lines on face"
    };
    const ageLabel = ageRange ? (AGE_VISUAL_LABEL[ageRange] || 'adult') : 'adult';

    // Age+Gender-aware voice quality — child boy ≠ child girl, senior man ≠ senior woman
    const AGE_VOICE_QUALITY: Record<string, { male: string; female: string }> = {
        "child": {
            male: "young boy's voice — bright, high-pitched, innocent, cheerful, small child energy and wonder",
            female: "young girl's voice — sweet, high-pitched, innocent, cheerful, small child brightness and wonder"
        },
        "teen": {
            male: "teenage boy voice — youthful, slightly deeper than a child, fresh adolescent energy, not yet fully mature",
            female: "teenage girl voice — youthful, bright and clear, fresh adolescent energy, lively and expressive"
        },
        "young-adult": {
            male: "young man voice — clear, vibrant, confident, full vocal range, energetic masculinity",
            female: "young woman voice — clear, vibrant, confident, full vocal range, lively femininity"
        },
        "adult": {
            male: "mature male voice — full, deep, confident, experienced, natural authority and warmth",
            female: "mature female voice — full, warm, confident, experienced, natural authority and grace"
        },
        "middle-age": {
            male: "seasoned middle-aged male voice — deep, authoritative, rich baritone with experience",
            female: "seasoned middle-aged female voice — warm, composed, authoritative with refined grace"
        },
        "senior": {
            male: "elderly gentleman voice — deep, wise, gentle with age, slower pace, warm grandfatherly authority",
            female: "elderly lady voice — warm, wise, gentle with age, slower pace, kind grandmotherly softness"
        }
    };
    const ageKey = ageRange || 'adult';
    const ageVoiceQuality = ageRange
        ? (AGE_VOICE_QUALITY[ageRange] || AGE_VOICE_QUALITY['adult'])[isMale ? 'male' : 'female']
        : '';

    // Visual speaking behavior per tone — AGE-AWARE (senior shouldn't "bounce", child shouldn't look "authoritative")
    const AGE_SPEAKING_BEHAVIOR: Record<string, Record<string, string>> = {
        "child": {
            "energetic": "animated excited mouth movements, wide arm gestures, bouncy body, big facial expressions",
            "calm": "gentle small mouth movements, hands close to body, soft shy expression, quiet composed posture",
            "friendly": "natural chatty mouth movements, warm bright smile, small hand waves, open eager expression",
            "professional": "clear careful mouth movements, hands still, focused composed expression for a child",
            "cute": "adorable exaggerated mouth movements, head tilts, giggly expressions, fidgety playful gestures"
        },
        "teen": {
            "energetic": "animated expressive mouth movements, wide gestures, dynamic head movement, excited teen expressions",
            "calm": "relaxed steady mouth movements, minimal gestures, chill composed expression, laid-back posture",
            "friendly": "natural conversational mouth movements, warm smile, casual hand gestures, approachable teen expression",
            "professional": "clear articulate mouth movements, controlled gestures, confident upright posture, focused expression",
            "cute": "playful mouth movements, bouncy head tilts, cheerful bright expressions, lively animated gestures"
        },
        "young-adult": {
            "energetic": "animated expressive mouth movements, wide gestures, dynamic head movement, excited facial expressions",
            "calm": "gentle steady mouth movements, minimal gestures, relaxed composed expression, slow deliberate delivery",
            "friendly": "natural conversational mouth movements, warm smile between words, casual hand gestures, approachable expression",
            "professional": "clear articulate mouth movements, controlled gestures, confident posture, authoritative expression",
            "cute": "playful exaggerated mouth movements, bouncy head tilts, cheerful expressions, lively gestures"
        },
        "adult": {
            "energetic": "dynamic expressive mouth movements, confident wide gestures, strong head movement, powerful expressions",
            "calm": "measured steady mouth movements, controlled minimal gestures, composed serene expression, deliberate pacing",
            "friendly": "natural warm mouth movements, genuine smile between words, open hand gestures, inviting expression",
            "professional": "precise articulate mouth movements, controlled authoritative gestures, commanding posture, serious focused expression",
            "cute": "unexpectedly playful mouth movements, slight head tilts, warm charming expressions, light gestures"
        },
        "middle-age": {
            "energetic": "strong confident mouth movements, measured but powerful gestures, experienced dynamic expressions",
            "calm": "slow deliberate mouth movements, minimal composed gestures, wise serene expression, grounded posture",
            "friendly": "warm natural mouth movements, genuine experienced smile, open relaxed gestures, approachable presence",
            "professional": "precise commanding mouth movements, authoritative controlled gestures, seasoned confident posture",
            "cute": "warm gentle mouth movements, soft head nods, kind amused expression, endearing subtle gestures"
        },
        "senior": {
            "energetic": "spirited mouth movements with natural elderly pace, gentle but enthusiastic gestures, lively warm expressions",
            "calm": "slow gentle mouth movements, very minimal gestures, peaceful wise expression, still composed posture",
            "friendly": "warm unhurried mouth movements, gentle kind smile, soft hand gestures, welcoming grandparent expression",
            "professional": "deliberate measured mouth movements, dignified minimal gestures, wise authoritative expression, stately posture",
            "cute": "gentle sweet mouth movements, soft slow head nods, kind warm smile, endearing elderly mannerisms"
        }
    };
    const behavior = AGE_SPEAKING_BEHAVIOR[ageKey]?.[voiceTone] || AGE_SPEAKING_BEHAVIOR['adult']?.[voiceTone] || AGE_SPEAKING_BEHAVIOR['adult']['friendly'];

    // Voice tone description — AGE-AWARE to avoid contradictions (e.g. senior + "high-pitched youthful")
    // Each age group gets tone descriptors that COMPLEMENT (not contradict) the age voice quality above.
    const AGE_TONE_VOICE: Record<string, Record<string, string>> = {
        "child": {
            "energetic": "excited fast-paced child voice, bursting with energy and joy, loud and animated",
            "calm": "gentle quiet child voice, soft-spoken and a bit shy, innocent calm",
            "friendly": "warm cheerful child voice, talkative and open, eager to share",
            "professional": "clear articulate child voice, confident and composed for their age, focused delivery",
            "cute": "adorable sweet child voice, giggly and playful, irresistibly charming"
        },
        "teen": {
            "energetic": "lively excited teen voice, fast and enthusiastic, bursting with youthful energy",
            "calm": "chill relaxed teen voice, soft-spoken, laid-back cool vibe",
            "friendly": "warm friendly teen voice, approachable and chatty, natural ease",
            "professional": "mature-sounding teen voice, articulate and focused, impressive poise",
            "cute": "sweet bubbly teen voice, cheerful and animated, endearing charm"
        },
        "young-adult": {
            "energetic": "high-energy enthusiastic voice, fast lively delivery, bright and vibrant",
            "calm": "smooth soothing voice, relaxed unhurried delivery, warm and gentle",
            "friendly": "warm conversational voice, natural relaxed delivery, approachable and sincere",
            "professional": "confident clear voice, steady polished delivery, trustworthy presence",
            "cute": "sweet playful voice, bouncy light delivery, naturally charming"
        },
        "adult": {
            "energetic": "dynamic powerful voice, fast confident delivery, commanding energy and presence",
            "calm": "deep soothing voice, measured deliberate delivery, composed and warm",
            "friendly": "warm inviting voice, natural conversational delivery, genuine sincerity",
            "professional": "authoritative polished voice, clear steady delivery, trustworthy and seasoned",
            "cute": "youthful-sounding voice with light playful tone, charming despite mature age"
        },
        "middle-age": {
            "energetic": "strong experienced voice with sustained energy, passionate confident delivery",
            "calm": "deep composed voice, measured and deliberate, sage-like warmth and patience",
            "friendly": "warm approachable voice, experienced but down-to-earth, genuine kindness",
            "professional": "commanding seasoned voice, polished expert delivery, respected authority",
            "cute": "surprisingly warm and playful voice, gentle humor, endearing personality"
        },
        "senior": {
            "energetic": "spirited elderly voice, enthusiastic and lively despite age, warm with natural tremor of vitality",
            "calm": "slow wise elderly voice, deliberate and measured, deep calm with aged warmth and patience",
            "friendly": "warm grandparent voice, gentle and inviting, natural storytelling warmth",
            "professional": "distinguished elderly voice, authoritative with decades of wisdom, measured and respected",
            "cute": "gentle sweet elderly voice, warm and endearing, soft with occasional kind chuckle"
        }
    };
    const voiceDesc = AGE_TONE_VOICE[ageKey]?.[voiceTone] || AGE_TONE_VOICE['adult']?.[voiceTone] || AGE_TONE_VOICE['adult']['friendly'];

    return [
        `Character '${persona.name}': ${roleLabel}, ${ageLabel}.`,
        `Voice: ${ageVoiceQuality ? `${ageVoiceQuality}. ` : ''}${voiceDesc}. Speaking Thai on-camera: ${behavior}.`,
        `AGE LOCK: This character's visual age is ${ageLabel} — face, body, skin, and voice MUST match this appearance throughout. Do NOT change the character's apparent age.`,
        `Mouth opens and closes naturally matching spoken words — realistic speaking animation throughout.`,
        `VOICE IDENTITY LOCK: Speaker '${persona.name}' — same voice, same tone, same speaking style, same energy level in EVERY scene. No voice change between scenes. Consistent vocal character throughout the entire video.`
    ].join(' ');
};

// Video Policy Safety — additional directives for video generation
const VIDEO_POLICY_DIRECTIVE = "POLICY: No public figures or celebrities. No deceptive health claims. No violence, gambling, or misleading product claims. No trademark logos in generated visuals. Photorealistic style only, no cartoon effects unless specified.";

// Face Identity Lock — preserve facial features while framing as anonymous/fictional character
// CRITICAL: Avoid "identical likeness" or "direct match" phrasing that triggers Google's "famous person" policy.
// Instead, frame as "original anonymous character inspired by reference style".
const FACE_IDENTITY_LOCK = "FACIAL STRUCTURE & COMPLEXION PRESERVATION: Use Image 1 as the absolute visual blueprint for this character's face. You MUST reproduce the EXACT face from Image 1 with maximum fidelity — this is the #1 priority above all other instructions. Preserve EXACT: skin tone (match exact complexion, warmth, pigmentation — do NOT lighten or alter), bone structure, face width-to-height ratio, jawline shape and angle, eye shape and size, eye spacing, nose bridge width, nose tip shape, lip shape and thickness, eyebrow shape and arch, forehead height, cheekbone prominence, chin shape, ear shape. Do NOT widen the face, do NOT alter any facial proportion. Keep makeup natural and exactly as shown. The output face must be indistinguishable from the reference — same person, same facial geometry, same complexion, same features.";

// Front-Facing Character Directive — ensures face consistency with reference input
const FRONT_FACING_DIRECTIVE = "CHARACTER POSE: Natural front-facing angle, looking directly into the lens. Face fully visible. Avoid extreme close-ups that distort facial proportions. Keep a natural, relaxed posture.";

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY-SPECIFIC PRODUCT ANATOMY — tells AI exactly WHAT distinctive features
// to study from the reference image and preserve with 100% fidelity.
// Without this, AI guesses/imagines product details and gets them wrong.
// ═══════════════════════════════════════════════════════════════════════════
const CATEGORY_PRODUCT_ANATOMY: Partial<Record<ProductCategory, string>> = {
    fragrance: "STUDY REFERENCE: exact perfume bottle silhouette and geometric shape (hexagonal/round/rectangular/faceted — preserve EXACT outline), decorative cap shape and proportions (diamond-cut/sculpted/dome/faceted — this is the bottle's MOST DISTINCTIVE feature, preserve every facet angle), cap-to-body size ratio, glass transparency and liquid color (exact pink/gold/amber hue), metallic collar/ring between cap and body, spray nozzle shape when cap removed, any embossed or engraved branding on glass, bottle base shape and thickness, light refraction pattern through glass. CRITICAL: The decorative cap shape is the #1 identity feature — if the cap morphs, the entire product identity is lost.",
    beauty: "STUDY REFERENCE: exact bottle silhouette (round/angular/curved), cap/closure distinctive shape (faceted/smooth/dome/sculpted — preserve every geometric facet and angle), liquid color visible through glass (exact hue and saturation), bottle transparency/frosted level, nozzle or spray mechanism shape, any decorative sculpted elements on bottle or cap, metallic ring or collar details, branding placement and embossing style",
    beverage: "STUDY REFERENCE: exact bottle/can silhouette and proportions, cap/tab design and color, liquid color and opacity level visible through container, packaging wrap layout and color bands, bottle neck shape, grip texture or ridges, carbonation bubble density if visible",
    food: "STUDY REFERENCE: exact packaging shape and dimensions, seal/opening mechanism, color bands and stripe patterns on packaging, window cutouts showing product inside, logo placement and size, any embossed or raised lettering, texture of packaging material (matte/glossy/foil)",
    fashion: "STUDY REFERENCE: exact garment silhouette and cut, collar/neckline shape, sleeve style and length, button/zipper hardware style and color, fabric weave pattern and drape direction, pocket placement and style, any distinctive stitching or seam details, tag/label placement",
    laptop: "STUDY REFERENCE: exact laptop chassis shape, screen-to-bezel ratio, hinge design, keyboard layout and key cap shape, trackpad size and position, port locations and shapes, lid surface material and finish (aluminum/plastic/carbon), any logo or emblem on the lid (shape, position, size, color — MUST be preserved exactly), speaker grille pattern, screen display when open, chassis color and material transitions, ventilation slots",
    phone: "STUDY REFERENCE: exact phone silhouette and edge radius, screen-to-bezel ratio, camera module layout (number of lenses, arrangement, flash position), side button placement, port location, back panel material and color, any logo or emblem on the back (shape, position, size — MUST be preserved exactly), antenna lines, SIM tray position",
    tablet: "STUDY REFERENCE: exact tablet silhouette and proportions, screen-to-bezel ratio, camera placement (front and rear), button positions, port location, back panel material and color, any logo or emblem on the back (shape, position, size — MUST be preserved exactly), speaker positions, pencil attachment area if present",
    gadget: "STUDY REFERENCE: exact device form factor and edge radius, button placement and protrusion style, port locations and shapes, screen-to-bezel ratio, camera module layout, material transitions (metal/glass/plastic boundaries), antenna lines, LED indicator positions, logo engraving depth and placement",
    supplement: "STUDY REFERENCE: exact bottle/container shape and proportions, cap style (childproof/flip/screw), packaging layout and color scheme, capsule/tablet color and shape if visible, dosage markings, seal band, bottle material (opaque/translucent), any certification badges on packaging",
    pet: "STUDY REFERENCE: exact packaging shape, resealable mechanism, color palette and patterns, mascot/animal illustration style, portion window if present, texture of bag material, zipper or tear notch placement",
    baby: "STUDY REFERENCE: exact container shape and soft-touch texture, safety cap design, pour spout or pump mechanism, pastel color palette, rounded edge design, packaging layout with safety certifications, transparent window showing product level",
    home: "STUDY REFERENCE: exact product dimensions and silhouette, material surface (wood grain/metal/plastic), joint and connection details, color finish, hardware elements, any adjustable mechanisms, brand marking placement",
    kitchen: "STUDY REFERENCE: exact utensil/appliance shape, handle design and grip texture, cooking surface material, hinge or pivot mechanisms, temperature markings, lid fit, steam vents, brand logo placement and size",
    fitness: "STUDY REFERENCE: exact equipment shape and form factor, grip texture pattern, adjustment mechanism, weight markings, padding thickness, strap/buckle hardware, logo placement, color accents",
    auto: "STUDY REFERENCE: exact part shape and mounting design, connector types, surface finish (chrome/matte/carbon), installation hardware, certification markings, serial number area, brand embossing",
    jewelry: "STUDY REFERENCE: exact gem cut shape (round/princess/oval) and facet count, setting style (prong/bezel/pave), metal color and polish level, chain link pattern and thickness, clasp mechanism, any filigree or engraving details, gem color and internal light dispersion pattern",
    watch: "STUDY REFERENCE: exact case shape (round/square/tonneau), bezel design and markings, dial layout and indices style, crown shape and position, strap/bracelet link pattern, crystal dome profile, subdial placement, hand shapes, logo position on dial",
    bag: "STUDY REFERENCE: exact bag silhouette and proportions, closure mechanism (zipper/flap/buckle), hardware color and shape (gold/silver/gunmetal), handle attachment style, pocket layout, logo plaque design and placement, stitching pattern, interior lining color if visible",
    shoe: "STUDY REFERENCE: exact sole profile and tread pattern, upper material panels and stitching lines, tongue shape, lace eyelet style, heel height and shape, toe box silhouette, brand logo placement, midsole color bands, any air/gel visible units",
    book: "STUDY REFERENCE: exact cover layout, spine width, front cover illustration/photo, author name placement, publisher logo, any embossing or foil details, page edge color (gilt/plain), bookmark ribbon color",
    toy: "STUDY REFERENCE: exact figurine/toy proportions, articulation points, color placement on each body section, facial expression and eye style, accessory shapes, packaging window size, brand logo placement",
    stationery: "STUDY REFERENCE: exact pen/pencil barrel shape and taper, clip design, nib/tip style, cap attachment mechanism, grip section texture, barrel print pattern, brand marking placement and size",
    dental: "STUDY REFERENCE: exact toothpaste tube shape (cylindrical/flat/standing), cap design (flip-top/screw), tube material (plastic/metal), exact color gradient bands on packaging, logo placement and size on tube front, text layout on packaging, nozzle opening shape, squeeze zone ridges, tube bottom seal style, any decorative stripe or accent lines on tube body",
    cleaning: "STUDY REFERENCE: exact bottle shape and grip indentations, trigger spray or cap type, packaging color blocks and layout, liquid color and opacity visible through bottle, nozzle angle, safety cap style, volume markings",
    outdoor: "STUDY REFERENCE: exact equipment shape, strap adjustment system, buckle and hardware style, fabric panel colors and pattern, zipper pulls, brand patch placement, reflective elements, D-ring or attachment points",
    health: "STUDY REFERENCE: exact device shape and display area, button layout, sensor placement, measurement scale markings, power indicator, material transitions, carrying case shape, brand marking placement",
    craft: "STUDY REFERENCE: exact tool shape, blade/tip profile, handle ergonomic curves, material color gradients, measuring marks, brand stamping, storage slot design",
    digital: "STUDY REFERENCE: exact app icon design, UI color scheme, screen layout and navigation elements, button shapes, brand wordmark placement",
    other: "STUDY REFERENCE: exact product silhouette and proportions, distinctive design elements, material surface texture, logo placement, color palette, hardware or mechanical details"
};

// Build product anatomy directive dynamically based on category
const buildProductAnatomyDirective = (category: ProductCategory, productName: string): string => {
    const anatomy = CATEGORY_PRODUCT_ANATOMY[category] || CATEGORY_PRODUCT_ANATOMY["other"] || "STUDY REFERENCE: exact product shape, dimensions, material, color, logo placement, distinctive design elements";
    return `PRODUCT ANATOMY CHECKLIST for "${productName}": ${anatomy}. Preserve EVERY distinctive design element exactly as shown in the reference image — do NOT simplify, do NOT reimagine, do NOT substitute with generic shapes. If the reference shows a unique cap shape, that EXACT cap shape must appear. If it shows a specific liquid color, that EXACT color must render.`;
};

// ═══════════════════════════════════════════════════════════════════════════
// BRAND VISUAL SIGNATURE — explicit logo/emblem directives for major brands
// Uses visual descriptions (not brand names) to avoid policy/safety filters
// while ensuring AI renders the distinctive brand mark from the reference image.
// ═══════════════════════════════════════════════════════════════════════════
const getBrandVisualSignature = (originalProductName: string, category: ProductCategory, productAnalysis?: string): string => {
    const combinedText = `${originalProductName} ${productAnalysis || ''}`.toLowerCase();

    // ── Apple products — distinctive bitten-fruit silhouette emblem ──
    if (/\b(apple|macbook|ipad|iphone|imac|airpods|homepod|apple\s*watch)\b/i.test(originalProductName)) {
        // Detect chassis color from product name + AI analysis for logo contrast rule
        const isDark = /\b(space.?gr[ae]y|midnight|black|dark|สีดำ|เทาดำ|graphite)\b/i.test(combinedText);
        const isSilver = /\b(silver|starlight|white|สีขาว|สีเงิน|natural)\b/i.test(combinedText);

        if (category === 'laptop') {
            const logoColor = isDark
                ? 'Against the dark chassis, the emblem appears as a subtle lighter metallic tone.'
                : isSilver
                    ? 'Against the silver chassis, the emblem appears as a subtle darker tone.'
                    : 'The emblem subtly contrasts with the lid surface — match reference exactly.';
            return `BRAND VISUAL SIGNATURE (CRITICAL): The laptop lid MUST display a single small centered fruit-shaped silhouette emblem (bitten on the right side, with a small leaf at top) — this is the product's #1 ICONIC visual identity feature. ${logoColor} The emblem must be clean, sharp-edged, precisely centered on the lid. When the lid is visible (open or closed), this emblem MUST be clearly rendered — NEVER omit, NEVER replace with a blank surface, NEVER invent a different logo.`;
        }
        if (category === 'phone') {
            return `BRAND VISUAL SIGNATURE (CRITICAL): The phone's back panel MUST display a single small centered fruit-shaped silhouette emblem (bitten on the right side, small leaf at top) — this is the product's #1 ICONIC visual identity. When the back is visible, the emblem MUST be clearly rendered. NEVER omit.`;
        }
        if (category === 'tablet') {
            return `BRAND VISUAL SIGNATURE (CRITICAL): The tablet's back panel MUST display a single small centered fruit-shaped silhouette emblem (bitten on the right side, small leaf at top) — this is the product's #1 ICONIC visual identity. When the back is visible, the emblem MUST be clearly rendered. NEVER omit.`;
        }
        if (category === 'audio') {
            return `BRAND VISUAL SIGNATURE: Preserve the exact distinctive stem/capsule shape and any emblem from the reference. The earbuds must match the reference silhouette precisely.`;
        }
        if (category === 'wearable') {
            return `BRAND VISUAL SIGNATURE: Preserve the exact crown/button shape and case silhouette from the reference. The watch must match the reference design precisely.`;
        }
        return `BRAND VISUAL SIGNATURE: The product MUST display a small centered fruit-shaped silhouette emblem (bitten on the right side, small leaf at top) exactly as shown in reference. NEVER omit this distinctive mark.`;
    }

    // ── Samsung — wordmark on bezel/chin or back ──
    if (/\b(samsung|galaxy)\b/i.test(originalProductName)) {
        if (category === 'phone' || category === 'tablet') {
            return `BRAND VISUAL SIGNATURE: Preserve the horizontal wordmark text on the device bezel or back panel exactly as shown in reference image.`;
        }
    }

    // ── Generic: rely on reference image for logo fidelity ──
    return '';
};

// Product Match Directive — ensures product matches input reference exactly
const PRODUCT_MATCH_DIRECTIVE = "PRODUCT FIDELITY: Reproduce the reference product with photographic accuracy — same silhouette, same proportions, same material finish, same color palette. Render with extreme surface detail: visible material texture, realistic light interaction (caustics through glass, specular highlights on metallic surfaces, soft diffusion on matte, light refraction on transparent elements). SINGLE PRODUCT ONLY: EXACTLY ONE product unit in frame. No duplicate bottles, no extra containers, no background props resembling the product. Character holds ONE product. PRODUCT LIGHTING: soft rim light defining product edges and silhouette, key light revealing surface texture and material quality, fill light preventing harsh shadows, realistic light refraction through any transparent/glass elements.";

// Anti-Text Directive — strongest possible anti-text/font rendering prevention
const ANTI_TEXT_DIRECTIVE = "CRITICAL NO TEXT DIRECTIVE: Absolutely NO subtitles, NO captions, NO watermarks, NO floating text, NO on-screen graphics, NO gibberish fonts, NO banners, NO UI elements anywhere in the video. The video must contain zero rendered text or letters. Do NOT attempt to render any language or letters visually.";

// Anti-Addition Directive — prevents AI from inventing accessories/elements not in the reference
const ANTI_ADDITION_DIRECTIVE = "ZERO INVENTION POLICY: Do NOT add ANY accessory, prop, or element that is NOT explicitly shown in the reference images. Specifically: NO glasses/sunglasses unless in reference. NO hats/headbands unless in reference. NO scarves/neckwear unless in reference. NO earphones/AirPods unless the product IS earphones. NO extra jewelry unless in reference. NO tattoos unless in reference. NO background logos or brand signs. NO secondary products or props not in the brief. If the reference shows a plain-faced person, the output MUST show a plain-faced person. Every visible element must be traceable to either the character reference or the product reference.";

// Voice Discipline Directive — prevents filler sounds/gasps between dialogue lines during scene transitions
const VOICE_DISCIPLINE_DIRECTIVE = "VOICE DISCIPLINE: Character speaks ONLY the provided dialogue text with confident presenter delivery. No filler sounds, no gasps, no random exclamations between lines. Smooth confident tone when presenting the product. Between spoken lines, maintain composed silence with mouth closed.";

// Clothing Fidelity Directive — ensures AI reproduces outfit accurately from reference or description
const CLOTHING_FIDELITY_DIRECTIVE = "CLOTHING ACCURACY: Reproduce the character's outfit with 90%+ fidelity to the reference or description. Match: neckline shape, sleeve length, fabric color (exact hue/saturation), pattern/print, layering order, fit (loose/slim/oversized). Do NOT substitute a described casual t-shirt with a formal blouse. Do NOT change colors or add patterns not in the reference. If reference shows a white round-neck t-shirt, output MUST show a white round-neck t-shirt — not a V-neck, not cream, not striped.";

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY-SPECIFIC GRIP + CONTACT PHYSICS (20 subcategories in 5 groups)
// Prevents mangled hands, floating products, and unnatural interactions
// ═══════════════════════════════════════════════════════════════════════════

// Per-category: HOW presenter holds/touches the product (anatomical constraints)
const PRODUCT_GRIP_CONTACT: Partial<Record<ProductCategory, string>> = {
    food: "Anatomically correct hands, exactly five fingers per hand. Natural food handling: fingers wrapped around cup handle or gripping food firmly. For utensils: proper grip on handle. No extra fingers.",
    beverage: "Anatomically correct hands, exactly five fingers per hand. Natural drink grip: fingers wrapped around glass or cup with visible contact. For bottles: palm grip with thumb on cap. No extra fingers.",
    fashion: "Anatomically correct hands, exactly five fingers per hand. Product display grip: hands smoothing fabric or adjusting fit with simple movements. No distorted joints.",
    gadget: "Anatomically correct hands, exactly five fingers per hand. Firm grip: fingers naturally curled around device edges. For phones: palm supporting back, thumb on screen edge. No extra fingers, no fused joints.",
    beauty: "Anatomically correct hands, exactly five fingers per hand. Delicate precision grip: fingers holding tube/bottle/jar steadily. For perfume: index finger pressing nozzle, palm supporting base. No mangled hands.",
    supplement: "Anatomically correct hands, exactly five fingers per hand. Precision grip: holding bottle with palm wrap, or pinch grip on individual capsule between thumb and index finger. No extra fingers.",
    pet: "Anatomically correct hands, exactly five fingers per hand. Gentle product hold: one hand gripping pet product package, other hand petting animal or showing product label. No distorted joints.",
    baby: "Anatomically correct hands, exactly five fingers per hand. Gentle careful grip: cradling baby product softly, demonstrating safety features with delicate finger movements. No extra fingers.",
    home: "Anatomically correct hands, exactly five fingers per hand. Practical grip: hands naturally holding or placing home item, demonstrating function with simple clear movements. No distorted joints.",
    kitchen: "Anatomically correct hands, exactly five fingers per hand. Functional grip: proper handle hold for utensils, firm grip on cookware handles, natural stirring or cutting motion. No extra fingers.",
    fitness: "Anatomically correct hands, exactly five fingers per hand. Athletic grip: firm hold on equipment handles, natural sports grip, fingers wrapped around resistance bands or dumbbells. No fused joints.",
    auto: "Anatomically correct hands, exactly five fingers per hand. Mechanical grip: firm tool hold, natural installation motion, fingers gripping automotive accessory with practical contact. No extra fingers.",
    jewelry: "Anatomically correct hands, exactly five fingers per hand. Delicate showcase grip: pinch hold between thumb and index for rings/earrings, gentle clasp for necklaces, wrist presentation for bracelets. No mangled hands.",
    watch: "Anatomically correct hands, exactly five fingers per hand. Elegant wrist display: one hand presenting watch on opposite wrist, or delicate pinch grip holding watch by strap. No distorted joints.",
    bag: "Anatomically correct hands, exactly five fingers per hand. Natural carry grip: fingers curled around handle with visible weight, shoulder strap with natural drape, opening bag with both hands. No extra fingers.",
    shoe: "Anatomically correct hands, exactly five fingers per hand. Natural shoe hold: gripping heel and toe area, or holding by ankle collar, demonstrating sole or interior with simple motions. No fused joints.",
    book: "Anatomically correct hands, exactly five fingers per hand. Reading grip: fingers holding book open naturally, thumb on page edge, or both hands presenting cover to camera. No extra fingers.",
    toy: "Anatomically correct hands, exactly five fingers per hand. Playful grip: natural toy hold, demonstrating features with simple finger movements, pressing buttons or moving parts. No distorted joints.",
    stationery: "Anatomically correct hands, exactly five fingers per hand. Writing grip: proper three-finger pencil hold, or natural grip on supplies, demonstrating smooth writing motion. No extra fingers.",
    cleaning: "Anatomically correct hands, exactly five fingers per hand. Practical grip: firm hold on spray bottle trigger, natural squeeze or pour motion, wiping with cloth in hand. No fused joints.",
    outdoor: "Anatomically correct hands, exactly five fingers per hand. Adventure grip: firm hold on gear handles, natural carrying or setup motion, practical outdoor equipment handling. No extra fingers.",
    health: "Anatomically correct hands, exactly five fingers per hand. Careful precision grip: holding medical device steadily, reading instructions naturally, demonstrating usage with clear controlled motions. No distorted joints.",
    craft: "Anatomically correct hands, exactly five fingers per hand. Artisan grip: precise tool hold, natural crafting motion, fingers manipulating materials with visible skill and control. No extra fingers.",
    digital: "Anatomically correct hands, exactly five fingers per hand. Tech interaction: fingers tapping screen naturally, holding device with comfortable grip, demonstrating app or interface clearly. No fused joints.",
    other: "Anatomically correct hands, exactly five fingers per hand. Firm secure grip with fingers naturally curled around the product. Simple clean hand movements only. No extra fingers, no fused fingers, no distorted joints."
};

// Per-category: PHYSICS, shadows, gravity, contact points
const PRODUCT_PHYSICS_SHADOW: Partial<Record<ProductCategory, string>> = {
    food: "Realistic gravity. Food grounded on surface with contact shadows. Steam rises upward. No floating ingredients. Ambient occlusion at table contact.",
    beverage: "Realistic gravity. Liquid stays in container. Condensation follows gravity. Glass sits firmly with contact shadow. No floating cups or bottles.",
    fashion: "Realistic gravity. Fabric drapes naturally with weight. Clothing follows body contours. Contact shadows where items touch body. Ambient occlusion.",
    gadget: "Realistic gravity. Device has physical weight in hand. Contact shadows beneath device, no floating. Screen reflections match environment. Ambient occlusion.",
    beauty: "Realistic gravity. Bottles/jars sit firmly with contact shadows. Liquids follow realistic fluid physics. Glass reflections match lighting. Ambient occlusion.",
    supplement: "Realistic gravity. Bottles and packaging grounded firmly. Capsules/tablets have weight. Contact shadows beneath all containers. No floating pills.",
    pet: "Realistic gravity. Pet products grounded on surface. Packaging has realistic weight. Contact shadows at base. No floating items or hovering toys.",
    baby: "Realistic gravity. Baby products placed gently but firmly on surface. Soft items rest naturally. Contact shadows beneath all objects. No floating.",
    home: "Realistic gravity. Home items placed realistically on surfaces. Proper weight and balance. Contact shadows at base. Fabric drapes naturally.",
    kitchen: "Realistic gravity. Cookware and utensils grounded firmly. Liquids stay in containers. Steam rises naturally. Contact shadows at every surface point.",
    fitness: "Realistic gravity. Equipment has real weight feel. Resistance bands show tension. Weights sit flat on floor. Contact shadows at ground contact.",
    auto: "Realistic gravity. Auto parts have metallic weight. Tools rest on surfaces firmly. Contact shadows beneath all components. No floating accessories.",
    jewelry: "Realistic gravity. Jewelry pieces rest naturally on display. Chains drape with weight. Gemstone reflections match lighting. Subtle contact shadows.",
    watch: "Realistic gravity. Watch has weight on wrist. Strap conforms to wrist shape. When on surface: rests flat with contact shadow. Metal reflections accurate.",
    bag: "Realistic gravity. Bag shows realistic weight when carried. Straps have natural drape and pull. Contact shadows when placed down. No floating handles.",
    shoe: "Realistic gravity. Shoes sit flat on ground. Laces drape naturally. Visible sole contact with surface. Contact shadows at ground level.",
    book: "Realistic gravity. Pages have weight and thickness. Book sits flat or stands with realistic balance. Contact shadows at base. No floating pages.",
    toy: "Realistic gravity. Toy has appropriate weight for material. Wheels touch ground, parts don't float. Contact shadows at base of toy.",
    stationery: "Realistic gravity. Pens roll naturally on desk. Paper lies flat. Contact shadows beneath all writing instruments. No floating supplies.",
    cleaning: "Realistic gravity. Liquid products have visible weight. Spray follows downward arc. Bottles sit firmly on surface. Contact shadows at base.",
    outdoor: "Realistic gravity. Gear has field-weight feel. Ropes hang with tension. Equipment grounded on natural terrain. Contact shadows on ground.",
    health: "Realistic gravity. Medical devices placed precisely on surface. Packaging has realistic weight. Contact shadows beneath all instruments.",
    craft: "Realistic gravity. Materials have natural weight and texture. Tools rest on work surface. Thread/yarn drapes naturally. Contact shadows at base.",
    digital: "Realistic gravity. Devices have weight in hand. Screens reflect environment lighting. Cables drape naturally. Contact shadows on desk surface.",
    other: "Realistic gravity, all objects grounded. Product placed firmly on surface or held securely in hand. Natural contact shadows and ambient occlusion. No floating products."
};

// Category-specific IMAGE INTERACTION — what the character should be DOING with the product in the photograph
// This prevents generic "holding product and smiling" and creates more compelling, category-appropriate images
const CATEGORY_IMAGE_INTERACTION: Partial<Record<ProductCategory, string>> = {
    food: "CHARACTER ACTION: Character takes a bite or lifts food toward mouth with delighted expression. Show food texture and freshness. Reaction must convey genuine enjoyment.",
    snack: "CHARACTER ACTION: Character reaches into open snack bag and holds a piece near mouth, about to eat. Show crispy/crunchy texture of the snack. Genuinely excited expression.",
    bakery: "CHARACTER ACTION: Character breaks bread or pastry to reveal soft fluffy interior, holding both halves. Show fresh crumb texture. Amazed expression at freshness.",
    beverage: "CHARACTER ACTION: Character holds open drink near lips as if about to sip, or pours into glass showing liquid color and flow. Refreshed, satisfied expression.",
    coffee: "CHARACTER ACTION: Character holds steaming cup near face, enjoying aroma with eyes half-closed. Show steam rising from cup. Blissful morning expression.",
    alcohol: "CHARACTER ACTION: Character elegantly holds glass at eye level, examining liquid color and clarity. Sophisticated setting, appreciative expression.",
    tea: "CHARACTER ACTION: Character holds warm cup with both hands near chin, steam visible, serene relaxed expression. Calm, peaceful pose.",
    beauty: "CHARACTER ACTION: Character applies product to skin — dabbing cream on cheek or pressing perfume nozzle. Show product texture on skin. Satisfied glowing expression.",
    skincare: "CHARACTER ACTION: Character applies cream/serum to face with fingertips in upward motion, showing product texture. Skin looks radiant and hydrated. Satisfied expression.",
    makeup: "CHARACTER ACTION: Character applies product — holding lipstick to lips, brush to cheek, or mascara wand to lashes. Show precise application technique. Confident glamorous expression.",
    fragrance: "CHARACTER ACTION: Character holds perfume bottle showing label at chest level. Uses fingers to gently lift decorative cap off (visible hand motion — cap held in other hand, NOT vanished). Sprays on wrist — mist visible. Brings wrist near nose, closes eyes, blissful expression. Bottle shape and silhouette remain IDENTICAL throughout. STABLE camera angle, no orbit.",
    sunscreen: "CHARACTER ACTION: Character applies sunscreen dots on face then spreads evenly, outdoor sunny setting visible. Protected, confident expression.",
    haircare: "CHARACTER ACTION: Character runs fingers through shiny healthy hair after using product. Hair looks silky and luminous. Satisfied expression.",
    fashion: "CHARACTER ACTION: Character shows off outfit — adjusting collar, smoothing fabric, or striking a confident pose. Show fabric texture and fit. Stylish confident expression.",
    sportswear: "CHARACTER ACTION: Character in mid-stretch or athletic pose wearing the sportswear. Show fabric flexibility and breathability. Energetic, confident expression.",
    jewelry: "CHARACTER ACTION: Character showcases jewelry — holding necklace near neck, or extending hand to show ring catching light. Show sparkle and gem detail. Elegant expression.",
    watch: "CHARACTER ACTION: Character checks time on watch, wrist turned to camera showing dial clearly. Or holds watch presenting it proudly. Sophisticated expression.",
    bag: "CHARACTER ACTION: Character carries bag naturally — on shoulder, crossbody, or opening it to show interior. Show hardware details and leather/fabric quality. Stylish expression.",
    shoe: "CHARACTER ACTION: Character holds shoe at eye level showing sole detail, or points toe forward showing design. Show material quality and sole construction. Impressed expression.",
    sunglasses: "CHARACTER ACTION: Character puts on sunglasses stylishly or holds them near face. Show lens quality and frame design. Cool confident expression.",
    home: "CHARACTER ACTION: Character places or adjusts home item in room setting, stepping back to admire. Show product in context of living space. Satisfied proud expression.",
    furniture: "CHARACTER ACTION: Character sits on or interacts with furniture naturally, showing comfort and design. Show material quality and craftsmanship. Comfortable relaxed expression.",
    kitchen: "CHARACTER ACTION: Character uses kitchen item actively — stirring with utensil, placing food in appliance, or showing result. Show product function in action. Happy cooking expression.",
    cleaning: "CHARACTER ACTION: Character sprays or wipes surface showing cleaning action. Show before/after cleanliness contrast. Satisfied accomplished expression.",
    supplement: "CHARACTER ACTION: Character holds open bottle with capsules visible in palm, glass of water in other hand. Show capsule details. Healthy energetic expression.",
    vitamin: "CHARACTER ACTION: Character picks vitamin from open bottle, about to take with water glass ready. Show vitamin shape and color. Healthy glowing expression.",
    protein: "CHARACTER ACTION: Character holds shaker bottle after shaking, or scoops powder from open tub. Show product texture. Fit, energetic post-workout expression.",
    fitness: "CHARACTER ACTION: Character uses fitness equipment with proper form — gripping weights, stretching with band. Show equipment quality in action. Strong determined expression.",
    yoga: "CHARACTER ACTION: Character in yoga pose on mat, or holds yoga prop. Show mat grip and material quality. Calm, balanced, focused expression.",
    camping: "CHARACTER ACTION: Character sets up or uses camping gear outdoors — assembling tent, using camping stove. Show gear quality in nature. Adventurous excited expression.",
    outdoor: "CHARACTER ACTION: Character wears/carries outdoor gear in nature setting — hiking, climbing, or exploring. Show gear durability and function. Adventurous expression.",
    pet: "CHARACTER ACTION: Character gives pet product to happy pet — dog eating treat, cat playing with toy. Show pet's positive reaction. Loving caring expression.",
    baby: "CHARACTER ACTION: Character gently uses baby product with care — feeding, applying lotion, or presenting toy to baby. Show product safety and gentleness. Warm nurturing expression.",
    gadget: "CHARACTER ACTION: Character actively uses gadget — pressing buttons, reading display, demonstrating feature. Show device screen or function. Impressed amazed expression.",
    phone: "CHARACTER ACTION: Character holds phone with screen facing camera, showing interface or captured photo. Or takes selfie. Show screen brightness and quality. Impressed expression.",
    laptop: "CHARACTER ACTION: Character types on open laptop, screen showing vivid colorful content clearly visible to camera. Show keyboard and screen quality. Focused productive expression.",
    tablet: "CHARACTER ACTION: Character draws on tablet with stylus or swipes screen, showing vivid display content. Show screen size and color accuracy. Creative engaged expression.",
    camera: "CHARACTER ACTION: Character holds camera to eye looking through viewfinder, or reviews captured photo on LCD screen. Show camera body and lens detail. Passionate creative expression.",
    audio: "CHARACTER ACTION: Character wears headphones or earbuds, eyes closed enjoying music. Or holds speaker showing design. Show product design details. Blissful immersed expression.",
    wearable: "CHARACTER ACTION: Character checks wearable on wrist, showing display with health data or notification. Show screen clarity and band design. Impressed tech-savvy expression.",
    gaming: "CHARACTER ACTION: Character holds controller with both hands, screen showing vivid game graphics in background. Or wears gaming headset. Excited focused gaming expression.",
    auto: "CHARACTER ACTION: Character installs or showcases auto accessory on/near vehicle. Show product fit and finish quality. Proud satisfied expression.",
    book: "CHARACTER ACTION: Character holds open book or presents cover to camera, one hand on page. Show cover design and paper quality. Thoughtful intrigued expression.",
    toy: "CHARACTER ACTION: Character demonstrates toy in action — moving parts, showing features, playful interaction. Show toy detail and color. Playful delighted expression.",
    stationery: "CHARACTER ACTION: Character writes with pen on paper showing smooth ink flow, or organizes desk supplies. Show product quality in use. Focused creative expression.",
    craft: "CHARACTER ACTION: Character uses craft tool actively — cutting, drawing, or assembling. Show tool precision and material quality. Focused creative expression.",
    other: "CHARACTER ACTION: Character holds product prominently, demonstrating its primary function with natural confident interaction. Show product details clearly. Positive impressed expression."
};

// Anti-Floating Hands — prevents unrealistic hand/product physics
const ANTI_FLOATING_HANDS = "HAND REALISM: Arms and hands MUST connect naturally to the character's body. NO floating hands, NO disembodied limbs entering from off-screen, NO third hands. Hands must firmly grasp the product with visible physical connection and realistic weight distribution. If holding a laptop/device, both hands must support it naturally from the bottom/sides.";

// Dynamic Interaction Directive — prevents static single-angle product holding
const DYNAMIC_INTERACTION_DIRECTIVE = "DYNAMIC PRODUCT INTERACTION (CRITICAL): Character MUST NOT hold the product in one static pose or single angle throughout the scene. Character must CONTINUOUSLY shift interaction: rotate product to show different angles, tilt to reveal side profile then back to front, switch grip between one hand and two hands, lift product higher then bring it closer to camera, point at specific features, flip or turn the product naturally. At least 2-3 distinct pose/angle transitions within each scene. Smooth natural transitions between each interaction — never freeze in one position. STATIC SINGLE-ANGLE HOLDING IS STRICTLY FORBIDDEN.";

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT SIZE REALISM — prevents AI from distorting product dimensions
// E.g. single instant noodle packet appearing as huge multi-pack bag
// ═══════════════════════════════════════════════════════════════════════════
const PRODUCT_SIZE_REALISM: Partial<Record<ProductCategory, string>> = {
    food: "PRODUCT SIZE (CRITICAL): This is a SINGLE-SERVE food packet — it is SMALL, fits comfortably in ONE hand. The package must appear at REALISTIC real-world scale relative to the character's hands and body. Do NOT enlarge, inflate, or upscale the package into a multi-pack, family-size, or bulk bag. The product in hand should look exactly as a consumer would hold it in a convenience store — SMALL and lightweight. If the reference shows a single packet, render a single small packet — NEVER a giant bag.",
    snack: "PRODUCT SIZE (CRITICAL): This is a SINGLE snack packet — SMALL enough to hold in one hand. Render at REALISTIC real-world scale relative to character's body. Do NOT enlarge into family-size or party-size bag. A single snack bag is typically 50-100g — small and light.",
    beverage: "PRODUCT SIZE (CRITICAL): Render the bottle/can at REALISTIC real-world proportions. A standard drink bottle is about the length of a hand. Do NOT enlarge into oversized or novelty proportions.",
    bakery: "PRODUCT SIZE (CRITICAL): Bakery items are typically palm-sized to hand-sized. Render at REALISTIC scale — a single pastry or bread piece, not an oversized novelty version.",
    coffee: "PRODUCT SIZE (CRITICAL): Coffee sachet/bag is small (palm-sized for sachet, hand-length for bag). Render at REALISTIC scale relative to hands.",
    supplement: "PRODUCT SIZE (CRITICAL): Supplement bottles are typically 10-15cm tall. Render at REALISTIC scale relative to hand — the bottle should fit comfortably in one hand.",
    beauty: "PRODUCT SIZE (CRITICAL): Beauty products are typically small (5-15cm). Render at REALISTIC scale — the product fits in one hand easily.",
    fragrance: "PRODUCT SIZE (CRITICAL): Perfume bottles are typically 8-12cm tall, small and delicate. Render at REALISTIC scale — fits in palm.",
    skincare: "PRODUCT SIZE (CRITICAL): Skincare bottles/tubes are typically 10-20cm. Render at REALISTIC scale relative to face and hands.",
    condiment: "PRODUCT SIZE (CRITICAL): Condiment bottles are standard kitchen size. Render at REALISTIC proportions — NOT oversized.",
    dental: "PRODUCT SIZE (CRITICAL): Toothpaste tubes are typically 15-20cm long. Render at REALISTIC scale relative to hand.",
};

const getProductSizeDirective = (category: ProductCategory): string => {
    return PRODUCT_SIZE_REALISM[category] || "PRODUCT SIZE REALISM: Render the product at its REAL-WORLD size relative to the character's hands and body. Do NOT enlarge, distort, or change the product's real-world proportions. A small product must look small. A large product must look large. Match the reference image scale.";
};

// ═══════════════════════════════════════════════════════════════════════════
// MASTER PROMPT — Product-Centric Structure (4-Part System)
// [Product Identity] + [Material & Physicality] + [Environment & Lighting]
// + [Technical Camera Motion] + [Anti-Warping Keywords] + [Negative Prompt]
//
// Purpose: Force AI to maintain product accuracy, reduce warping/morphing,
// and produce studio-grade product cinematography across all categories.
// ═══════════════════════════════════════════════════════════════════════════

// ── PART 1: PRODUCT MATERIAL & PHYSICALITY ──
// Per-category material descriptors to reduce AI "warping" of product surfaces.
// Tells AI the EXACT physical material so it renders correct texture/reflection.
const PRODUCT_MATERIAL_PHYSICALITY: Partial<Record<ProductCategory, string>> = {
    // ── Food & Beverage ──
    food: "Visible food grain texture, natural moisture sheen, realistic steam vapor, consistent condensation pattern on cold items. Static label on packaging — text never shifts. Rigid packaging structure maintained throughout.",
    snack: "Crispy crunchy visible fracture texture on snack pieces, glossy printed foil packaging with fixed geometry, sealed bag with realistic air puff. Static label, rigid bag silhouette.",
    bakery: "Soft sponge crumb interior visible at break, golden-brown crust with micro-crack detail, powdered sugar or glaze with uniform sheen. Structured form — bread/pastry holds shape.",
    beverage: "Consistent condensation droplets on cold surface, translucent liquid with realistic caustics and light refraction, rigid glass/bottle geometry. Static label — text and logo never warp or shift. Cap/tab maintains fixed design.",
    coffee: "Visible coffee bean oil sheen, crema foam micro-bubbles, ceramic cup with glossy glaze finish, rising steam with natural fluid dynamics. Rigid cup/bag structure.",
    tea: "Translucent amber liquid with light refraction, delicate porcelain or ceramic cup surface, steam wisps rising naturally. Tea bag paper texture visible. Rigid vessel shape.",
    alcohol: "Crystal-clear glass with ray-traced reflections, liquid with accurate color depth and viscosity, polished bottle surface with specular highlights. Cork/cap with precise geometry. Static label.",
    organic: "Natural matte eco-packaging with visible paper fiber texture, earth-toned kraft paper finish, compostable material surface detail. Structured form.",
    "frozen-food": "Frost crystal texture on frozen surfaces, ice sheen with realistic light scatter, rigid frozen structure. Packaging with matte cold-resistant finish. Static label.",
    condiment: "Viscous liquid with realistic pour dynamics, glossy bottle/jar surface, squeeze-bottle deformation physics. Metal or plastic cap with fixed geometry. Static label.",

    // ── Beauty & Personal Care ──
    beauty: "Frosted glass or high-gloss acrylic packaging with visible light refraction, metallic cap with polished chrome or brushed gold finish, dewy surface texture. Rigid bottle/jar geometry.",
    skincare: "Translucent gel or opaque cream texture with realistic viscosity, pump mechanism with precise mechanical parts, tube/bottle with matte or glossy medical-grade finish. Rigid container shape.",
    makeup: "Fine-milled powder with micro-particle visibility, creamy pigment texture with realistic blend, compact/palette with magnetic closure precision, brush bristle detail. Rigid compact geometry.",
    haircare: "Viscous shampoo/conditioner with realistic pour, squeeze-tube flexible polymer material, pump bottle with chrome/matte cap. Rigid bottle silhouette — no warping.",
    fragrance: "Polished crystal-cut glass bottle with faceted light dispersion, metallic or decorative cap with intricate geometry, visible perfume liquid with amber/golden translucency. RIGID BOTTLE SHAPE — fixed geometry throughout, every facet angle preserved.",
    sunscreen: "Opaque cream with SPF white-cast texture, squeeze-tube with flexible polymer body, twist-cap or flip-cap with precise mechanism. Rigid tube proportions.",
    nail: "High-gloss lacquer with wet-look reflective finish, glass bottle with visible pigment suspension, precision brush applicator. Rigid small bottle geometry.",
    soap: "Smooth bar soap with matte surface and embossed logo, liquid soap with transparent bottle showing gel viscosity, foaming pump mechanism detail. Rigid packaging shape.",
    dental: "Opaque paste with minty swirl pattern, squeeze-tube with laminate packaging, precision nozzle tip. Toothbrush with molded bristle rows. Rigid tube structure.",
    barbershop: "Brushed stainless steel clipper body with precision blade edges, matte rubber grip texture, ceramic/titanium blade with mirror finish. Rigid tool geometry.",

    // ── Health & Wellness ──
    health: "Medical-grade white polymer instrument body, LCD display with sharp pixel rendering, rubber grip pads, precision sensor surfaces. Rigid clinical device shape.",
    supplement: "Matte HDPE or glossy PET bottle with crisp label printing, translucent capsule showing fill content, tablet with pressed-powder surface texture. Rigid bottle shape.",
    vitamin: "Childproof cap with mechanical precision, gummy with translucent gelatin surface, effervescent tablet with compressed-powder texture. Rigid bottle geometry.",
    protein: "Large HDPE tub with screw-lid, powder with visible protein granule texture, shaker bottle with BPA-free translucent body. Rigid tub/container shape.",
    "weight-loss": "Clinical-grade blister pack with foil backing, sachet with metallic printed film, capsule with two-tone gelatin shell. Rigid packaging form.",
    massage: "Smooth polished massage tool head, medical-grade silicone surface, stainless steel roller with mirror finish, textured grip handle. Rigid tool geometry.",
    "essential-oil": "Dark amber glass dropper bottle with visible oil viscosity, rubber dropper bulb, precise glass pipette. Rigid small bottle geometry.",
    elderly: "Large-print label packaging, easy-grip contoured handles, medical-grade polymer body, soft-touch rubber coating. Rigid assistive device shape.",
    medicine: "Pharmaceutical blister pack with individual cell geometry, child-resistant cap mechanism, clinical white bottle with precise markings. Rigid container shape.",
    "mental-health": "Calming matte-finish packaging, soft-touch journal cover, natural wood or bamboo diffuser base. Structured form with organic texture.",

    // ── Fashion & Accessories ──
    fashion: "Premium woven fabric with visible thread count, precision stitching with consistent stitch length, natural gravity-driven draping, structured form where applicable. Rigid hardware (buttons, zippers) maintains fixed geometry.",
    underwear: "Elastic fabric with smooth stretch texture, soft cotton or microfiber weave visible, clean flat-lock seam detail. Structured elastic band.",
    swimwear: "Quick-dry fabric with chlorine-resistant sheen, elastic stretch texture, reinforced seam detail, hardware (clasps/rings) with fixed geometry.",
    sportswear: "Moisture-wicking mesh with visible micro-perforations, four-way stretch fabric texture, reflective tape detail, athletic cut structure.",
    jewelry: "Brilliant gemstone with visible internal facet sparkle and light dispersion, polished precious metal with mirror-like surface, intricate micro-craftsmanship solder joints. RIGID FIXED GEOMETRY — every prong, every link, every clasp angle preserved.",
    watch: "Sapphire crystal face with anti-reflective coating, brushed or polished case metal with precise chamfers, dial with printed markers and luminous indices. RIGID CASE GEOMETRY — bezel shape, crown position, lug angle all fixed.",
    bag: "Premium leather grain or woven textile with visible stitch pattern, polished metal hardware (zippers, clasps, buckles) with reflective highlights, structured silhouette with reinforced panels. Rigid hardware geometry.",
    shoe: "Detailed outsole tread pattern with rubber compound texture, premium upper material (leather grain, mesh weave, or knit structure), precise stitching, molded midsole with cushion technology visible. Rigid sole geometry.",
    sunglasses: "Polished acetate or metal frame with precise hinge mechanism, optical-grade lens with UV coating sheen, nose pad with silicone texture. Rigid frame geometry — temple curve and lens shape fixed.",
    hat: "Fabric crown with structured or unstructured form, stitched brim with edge binding, metal/plastic adjustment hardware. Rigid hardware geometry.",

    // ── Tech & Gadgets ──
    gadget: "Precision-machined surface with brushed aluminum or anodized metal finish, sharp chamfered edges, matte-gloss contrast surfaces. RIGID BODY — fixed geometry, symmetrical design, CAD-level detail.",
    phone: "Gorilla Glass front with oleophobic coating sheen, brushed aluminum or glass back panel, precise camera module geometry with lens ring detail. RIGID BODY — identical components, industrial design accuracy.",
    laptop: "Anodized aluminum unibody with CNC-machined precision, anti-glare display coating, backlit keyboard with individual key caps, precise hinge mechanism. RIGID CHASSIS — fixed geometry throughout.",
    tablet: "Laminated display glass bonded to body, aluminum or polymer chassis with uniform thickness, chamfered edges with diamond-cut finish. RIGID BODY — symmetrical design.",
    camera: "Magnesium alloy or polycarbonate body with weather-sealed texture, precision lens elements with multi-coating reflections, rubberized grip with cross-hatch pattern. RIGID BODY — lens mount, dial, button positions all fixed.",
    audio: "Driver housing with acoustic mesh grille, silicone or memory-foam ear tips, charging case with magnetic hinge mechanism, LED indicator. RIGID BODY — capsule/stem shape fixed.",
    gaming: "RGB-lit mechanical switches with visible keycap legends, textured polymer/aluminum frame, braided cable or wireless dongle, rubberized grip surfaces. RIGID BODY — button layout fixed.",
    wearable: "Gorilla Glass or sapphire crystal display, aluminum or titanium case, silicone/leather band with precise buckle/clasp. RIGID CASE — crown, sensor array, band attachment points all fixed.",
    drone: "Carbon fiber or engineering plastic airframe, brushed motor bells, foldable arm hinge mechanism, gimbal with 3-axis stabilization housing. RIGID AIRFRAME — arm angle and prop guard geometry fixed.",
    charger: "Polycarbonate or aluminum body, USB-C/Lightning port with precise cavity, LED indicator array, heat-dissipation ventilation slots. RIGID BODY — port positions fixed.",

    // ── Home & Living ──
    home: "Premium household material with visible wood grain or fabric weave, clean industrial design lines, machined metal or molded polymer hardware. Rigid structural form.",
    furniture: "Solid wood grain with natural variation, upholstery fabric with visible weave pattern, metal frame with welded/bolted joints, foam cushion with structured compression. Rigid frame geometry.",
    bedding: "High thread-count cotton or linen with visible weave, elastic fitted corners, duvet with quilted stitch pattern, pillow with plush loft. Structured textile form.",
    curtain: "Woven or sheer fabric with natural drape, metal or wood rod with machined finials, hook/ring hardware with fixed geometry. Fabric follows gravity physics.",
    rug: "Dense pile with visible fiber texture (wool, synthetic, or natural fiber), bound edges with clean finishing, non-slip backing. Flat rigid surface when laid.",
    "lighting-decor": "Glass or fabric shade with light-transmitting translucency, metal base with polished or brushed finish, ceramic or resin body with matte glaze. Rigid fixture geometry.",
    storage: "Woven basket with natural fiber texture, plastic bin with matte or glossy injection-molded surface, metal wire frame with welded joints. Rigid container shape.",
    mirror: "Float glass with silver backing, wood or metal frame with precise mitered corners, anti-fog coating on bathroom models. Rigid frame geometry.",
    vase: "Ceramic glaze with glossy or matte finish, glass with transparent/translucent body, porcelain with smooth fired surface. Rigid vessel geometry.",
    frame: "Wood or metal molding profile, glass or acrylic glazing, backing board with easel or hanging hardware. Rigid frame proportions.",

    // ── Kitchen & Appliances ──
    kitchen: "Food-grade stainless steel with brushed finish, heat-resistant polymer handles, non-stick coating with smooth surface. Rigid tool/utensil geometry.",
    "rice-cooker": "Brushed stainless steel or glossy polymer outer body, non-stick inner pot with ceramic or Teflon coating, touch panel with LED indicators. Rigid appliance body.",
    blender: "Borosilicate glass or Tritan plastic jar with measurement markings, stainless steel blade assembly, motor base with rubberized feet. Rigid jar and base geometry.",
    "air-fryer": "Matte or glossy polymer body with touch/dial controls, non-stick removable basket with wire rack, stainless steel heating element. Rigid body shape.",
    vacuum: "ABS plastic body with glossy/matte two-tone finish, transparent dust bin showing contents, HEPA filter with visible pleats, wheels with rubber tread. Rigid body structure.",
    washer: "Enameled steel drum, tempered glass door with chrome ring, control panel with membrane buttons or dial. Rigid appliance body.",
    fridge: "Stainless steel or white enamel exterior, tempered glass shelves, LED interior lighting, rubber door gasket. Rigid cabinet structure.",
    "air-purifier": "Cylindrical or rectangular polymer body with air intake grille, HEPA filter visible through panel, LED air quality indicator ring. Rigid body shape.",
    "water-filter": "BPA-free transparent pitcher with measurement markings, activated carbon filter cartridge, pour spout with flip lid. Rigid pitcher geometry.",
    "smart-home": "Compact polymer or fabric-covered body, LED indicator ring or strip, microphone mesh grille, rubberized base. Rigid device geometry.",

    // ── Auto & Transport ──
    auto: "Automotive-grade ABS or carbon fiber with UV-resistant finish, chrome or matte black hardware, rubber gaskets and seals. Rigid component geometry.",
    motorcycle: "Injection-molded ABS shell (helmets), ballistic nylon with CE armor (jackets), tempered visor with anti-scratch coating. Rigid structural components.",
    bicycle: "6061 aluminum or chromoly steel frame with welded joints, rubber tire with tread pattern, cable-actuated brake/derailleur with precise adjustment. Rigid frame geometry.",
    "car-accessory": "Suction cup with flexible polymer, adjustable arm with ball-joint mechanism, adhesive mounting pad with 3M backing. Rigid mount geometry.",
    ev: "Industrial-grade connector with copper contacts, heavy-duty cable with TPE insulation, wall-mount bracket with powder-coated steel. Rigid connector geometry.",

    // ── Family & Kids ──
    baby: "BPA-free soft-touch silicone, food-grade polymer with rounded edges, cotton fabric with hypoallergenic finish. Rigid safety-certified construction.",
    toy: "Vibrant ABS plastic with glossy injection-molded surface, safe rounded edges, printed decals with tampo-print detail. Rigid toy structure — no melting or morphing.",
    "kids-education": "Durable laminated cardboard or EVA foam, bright non-toxic printed surfaces, rounded safety edges. Rigid educational toy/card structure.",
    maternity: "Medical-grade elastic with breathable mesh, soft-touch cotton jersey, adjustable hook-and-loop closures. Structured support form.",
    family: "Mixed materials — cardboard game boards with glossy print, wooden pieces with lacquer finish, plastic components with injection-molded precision. Rigid game piece geometry.",

    // ── Sports & Outdoor ──
    fitness: "Textured rubber grip with cross-knurl pattern, chrome-plated steel or cast iron weight, neoprene or nylon resistance band with elastic stretch. Rigid metal weight geometry.",
    sports: "Synthetic leather or TPU ball with panel-bonded construction, carbon fiber or aluminum equipment frame, EVA foam padding. Rigid equipment geometry.",
    outdoor: "Ripstop nylon or Cordura fabric with DWR coating, aircraft-grade aluminum poles, YKK zippers with corded pulls. Rigid frame/pole geometry.",
    camping: "Silnylon or polyester tent fly with taped seams, titanium or aluminum cookware with heat-anodized finish, LED headlamp with polycarbonate lens. Rigid pole/frame structure.",
    yoga: "Natural rubber or TPE mat with textured anti-slip surface, cork block with rounded edges, cotton strap with D-ring buckle. Rigid block geometry.",

    // ── Office & Education ──
    digital: "High-resolution UI on glossy or matte display, pixel-sharp typography, clean interface layout with precise alignment. Rigid device body housing the display.",
    stationery: "Precision-machined metal pen body or injection-molded polymer barrel, smooth ballpoint or gel ink flow, paper with visible cellulose fiber texture. Rigid pen/pencil geometry.",
    book: "High-GSM matte or glossy coated cover stock, perfect-bound or case-bound spine with visible spine text, cream or white interior paper with ink print. Rigid book structure.",
    office: "Steel frame with powder-coated finish, mesh fabric with tensioned support, pneumatic cylinder with chrome piston. Rigid frame structure.",
    course: "Laminated workbook cover, spiral or perfect binding, printed interior with crisp typography. Digital: UI with video player and progress bar. Rigid book form.",

    // ── Cleaning & Home Care ──
    cleaning: "HDPE or PET spray bottle with transparent body showing liquid level, trigger mechanism with spring-loaded pump, cap with child-safety lock. Rigid bottle geometry.",
    detergent: "HDPE jug with ergonomic pour handle, measuring cap with gradation markings, pod with water-soluble PVA film casing. Rigid container shape.",
    "air-freshener": "Aerosol can with steel body and plastic nozzle, plug-in device with translucent oil reservoir, reed diffuser with glass bottle and rattan sticks. Rigid container/device geometry.",
    insect: "Pressurized aerosol can with steel body, electric plug-in with liquid reservoir, adhesive trap with flat rigid form. Rigid can geometry.",
    garden: "Galvanized steel or powder-coated aluminum tools, ergonomic rubber-grip handles, stainless steel blade/tine edges. Rigid tool geometry.",

    // ── Misc ──
    pet: "Durable nylon or genuine leather collar/leash with metal hardware (D-ring, snap hook), BPA-free food-grade polymer bowl, plush toy with stitched seams. Rigid hardware geometry.",
    craft: "Natural wood handles with varnish finish, carbon steel blade with ground edge, woven textile with visible fiber. Rigid tool geometry.",
    gift: "Coated wrapping paper with metallic or matte print, satin ribbon with woven edge, rigid gift box with magnetic closure. Fixed box geometry.",
    wedding: "Satin or organza fabric with sheer translucency, pearl or crystal accent with light dispersion, metallic (gold/silver) card stock with embossed print. Rigid accessory geometry.",
    other: "High-quality material surface with visible texture detail, precise manufacturing finish, clean construction lines. RIGID BODY — fixed geometry, stable structure, no warping."
};

// ── PART 2: ANTI-WARPING KEYWORDS ──
// Per-category keywords injected to force AI to maintain geometric accuracy.
// Three tiers: structural integrity, temporal consistency, visual sharpness.
const ANTI_WARPING_KEYWORDS: Partial<Record<ProductCategory, string>> = {
    // ── Electronics (most warping-prone due to precise geometry) ──
    gadget: "Fixed geometry, symmetrical design, CAD-level detail, identical components, industrial design accuracy. High temporal consistency, static product object, no morphing, stable texture, rigid body. Macro photography detail, ray-traced reflections, deep depth of field.",
    phone: "Fixed geometry, symmetrical design, identical components, precise button/port placement. High temporal consistency, static product object, no morphing, stable glass texture, rigid body. Macro photography, ray-traced screen reflections.",
    laptop: "Fixed geometry, symmetrical chassis, precise hinge angle, CAD-level keyboard detail, identical key spacing. High temporal consistency, no morphing, stable aluminum texture, rigid unibody. Macro photography, ray-traced screen and surface reflections.",
    tablet: "Fixed geometry, symmetrical bezels, precise edge chamfers, identical port placement. High temporal consistency, no morphing, stable glass/metal texture, rigid body. Deep depth of field, ray-traced display reflections.",
    camera: "Fixed geometry, precise dial/button placement, symmetrical lens mount, identical grip pattern. High temporal consistency, no morphing, stable magnesium/polycarbonate texture, rigid body. Macro photography, ray-traced lens element reflections.",
    audio: "Fixed geometry, symmetrical driver housing, identical ear tip shape, precise charging case hinge. High temporal consistency, no morphing, stable surface texture, rigid capsule body.",
    gaming: "Fixed geometry, precise key/button layout, symmetrical controller shape, identical RGB LED positions. High temporal consistency, no morphing, stable texture, rigid body.",
    wearable: "Fixed geometry, precise crown/button placement, symmetrical case shape, identical band attachment. High temporal consistency, no morphing, stable crystal/metal texture, rigid case body.",
    drone: "Fixed geometry, symmetrical arm spacing, precise propeller pitch, identical motor housing. High temporal consistency, no morphing, stable composite texture, rigid airframe.",
    charger: "Fixed geometry, precise port cavity, symmetrical body design, identical LED positions. High temporal consistency, no morphing, stable surface texture, rigid body.",

    // ── Fashion & Accessories (fabric + hardware balance) ──
    fashion: "Structured form where applicable, consistent stitch detail, stable fabric texture. High temporal consistency, no morphing hardware, rigid buttons/zippers. Deep depth of field, precise stitching detail.",
    jewelry: "Fixed geometry, symmetrical setting, identical prong angles, CAD-level facet detail. High temporal consistency, no morphing, stable precious metal reflections, rigid structure. Ray-traced gemstone light dispersion.",
    watch: "Fixed geometry, symmetrical case, precise hand positions, CAD-level dial detail, identical lug angles. High temporal consistency, no morphing, stable crystal reflections, rigid case. Ray-traced bezel highlights.",
    bag: "Fixed hardware geometry, structured silhouette, consistent stitch pattern, stable leather/fabric texture. High temporal consistency, no morphing zippers/clasps, rigid hardware. Deep depth of field.",
    shoe: "Fixed sole geometry, symmetrical construction, precise stitch lines, stable material texture. High temporal consistency, no morphing outsole, rigid midsole structure. Macro stitching detail.",
    sunglasses: "Fixed frame geometry, symmetrical lens shape, precise hinge mechanism, stable acetate/metal texture. High temporal consistency, no morphing, rigid frame. Ray-traced lens reflections.",

    // ── Beauty & Personal Care (glass/liquid prone to warping) ──
    beauty: "Fixed bottle/jar geometry, symmetrical packaging, stable glass/acrylic texture. High temporal consistency, no morphing, rigid container body. Ray-traced glass reflections, macro surface detail.",
    skincare: "Fixed container geometry, precise pump mechanism, stable matte/glossy finish. High temporal consistency, no morphing, rigid tube/bottle body. Macro texture detail.",
    makeup: "Fixed compact/palette geometry, precise hinge mechanism, stable powder/pigment texture. High temporal consistency, no morphing, rigid compact body. Macro pigment detail.",
    fragrance: "Fixed crystal bottle geometry, EVERY FACET ANGLE preserved, symmetrical cap design, stable glass refraction. High temporal consistency, ZERO morphing, rigid bottle body. Ray-traced faceted light dispersion, macro glass detail.",
    haircare: "Fixed bottle geometry, precise pump/cap mechanism, stable polymer texture. High temporal consistency, no morphing, rigid bottle silhouette.",
    dental: "Fixed tube geometry, precise cap mechanism, stable laminate texture. High temporal consistency, no morphing, rigid tube body.",

    // ── Food & Beverage (packaging + organic matter) ──
    food: "Fixed packaging geometry, stable label text, consistent food texture. High temporal consistency, no packaging morphing, rigid container/bag structure. Static label — text never shifts.",
    beverage: "Fixed bottle/can geometry, stable label text, consistent condensation pattern. High temporal consistency, no morphing, rigid glass/aluminum body. Static label, ray-traced liquid caustics.",
    snack: "Fixed bag geometry, stable foil packaging texture, consistent crispy food texture. High temporal consistency, no morphing bag shape, rigid seal structure. Static label.",
    bakery: "Structured baked form, stable crust texture, consistent crumb pattern. High temporal consistency, no dough morphing, stable baked shape.",
    coffee: "Fixed bag/cup geometry, stable label, consistent bean/powder texture. High temporal consistency, no morphing packaging, rigid container.",
    tea: "Fixed box/pouch geometry, stable label, consistent tea leaf/bag texture. High temporal consistency, no morphing packaging, rigid container.",
    alcohol: "Fixed bottle geometry, stable label text, consistent glass reflections. High temporal consistency, no morphing, rigid glass body. Ray-traced liquid highlights.",

    // ── Home & Kitchen ──
    home: "Fixed product geometry, stable material texture, consistent construction detail. High temporal consistency, no morphing, rigid structure.",
    furniture: "Fixed frame geometry, stable upholstery texture, consistent joint construction. High temporal consistency, no morphing frame, rigid structural members.",
    kitchen: "Fixed utensil/appliance geometry, stable stainless steel/ceramic texture, consistent handle shape. High temporal consistency, no morphing, rigid body.",

    // ── Health & Fitness ──
    supplement: "Fixed bottle geometry, stable label text, consistent capsule/tablet shape. High temporal consistency, no morphing, rigid container. Static label.",
    fitness: "Fixed equipment geometry, stable rubber/metal texture, consistent weight markings. High temporal consistency, no morphing, rigid iron/steel body.",

    // ── Universal fallback ──
    other: "Fixed geometry, symmetrical design where applicable, stable material texture. High temporal consistency, static product object, no morphing, rigid body. Deep depth of field, macro detail."
};

// ── PART 3: PRODUCT-CENTRIC CAMERA MOTION ──
// Moves the CAMERA around the product instead of moving the product.
// This dramatically reduces warping/distortion of product parts.
const PRODUCT_CAMERA_MOTION: Partial<Record<ProductCategory, string>> = {
    // ── Tech ──
    gadget: "Slow dolly-in on product face, 180-degree orbital arc around device, macro pan across surface details, pull-back reveal shot. Camera moves — product stays static on surface.",
    phone: "Slow dolly-in on screen face, gentle 90-degree orbital sweep showing side profile, macro slide across camera module, pull-back to show in-hand. Camera orbits — phone position stable.",
    laptop: "Slow push-in on open screen, smooth 120-degree orbital arc showing keyboard and screen, macro pan across trackpad and ports, crane-up reveal of full setup. Camera orbits — laptop stays on desk.",
    tablet: "Gentle dolly-in on display, 90-degree orbital showing profile thickness, macro slide across stylus interaction on screen. Camera moves — tablet stays propped.",
    camera: "Slow orbital around camera body showing lens and grip, macro dolly across dial/button details, pull-back from viewfinder to full body. Camera orbits — camera stays on surface.",
    audio: "Macro dolly-in on earbud/headphone driver, gentle arc around charging case showing LED, pull-back from ear-level wearing shot. Camera moves — audio product stays in position.",
    gaming: "Slow dolly across RGB-lit keyboard/controller surface, 90-degree orbital showing grip ergonomics, macro push-in on switch/button detail. Camera glides — gear stays on desk.",
    wearable: "Macro dolly-in on watch face, gentle orbital around wrist showing case profile, pull-back showing full lifestyle. Camera orbits — wearable stays on wrist.",
    drone: "Slow 360-degree orbital around unfolded drone, macro pan across camera gimbal, dolly-out showing full wingspan. Camera orbits — drone stays on surface.",
    charger: "Macro push-in on USB-C port and LED indicators, gentle orbital showing compact profile, pull-back to in-use context. Camera moves — charger stays plugged.",

    // ── Fashion & Accessories ──
    fashion: "Slow tracking shot following fabric drape, gentle arc showing fit from front to side, macro dolly on stitch/texture detail. Camera moves — garment stays on presenter.",
    jewelry: "Ultra-slow macro orbital around gemstone catching light from multiple angles, dolly-in on clasp/setting detail, pull-back to wearing shot. Camera orbits — jewelry stays on body.",
    watch: "Slow macro orbital around dial showing hour markers, dolly-in on crown and pushers, gentle pull-back from wrist shot. Camera orbits — watch stays on wrist.",
    bag: "Slow dolly across zipper and hardware, 90-degree orbital from front to side showing depth, macro push-in on leather grain/stitch. Camera moves — bag stays in position.",
    shoe: "Slow lateral dolly showing profile silhouette, macro push-in on outsole tread, gentle arc from toe to heel. Camera glides — shoe stays on surface.",
    sunglasses: "Macro dolly across frame temple to lens, gentle orbital showing hinge detail, pull-back to wearing shot. Camera moves — sunglasses stay in position.",

    // ── Beauty ──
    beauty: "Slow dolly-in on product label, gentle orbital showing bottle curve and cap, macro push-in on texture/applicator. Camera orbits — product stays on vanity surface.",
    skincare: "Macro push-in on pump/dropper mechanism, gentle arc showing bottle profile, dolly-out to application context. Camera moves — product stays on counter.",
    makeup: "Macro dolly across palette/compact showing color range, gentle orbital showing product dimensions, push-in on brush/applicator tip. Camera glides — compact stays open on surface.",
    fragrance: "Ultra-slow macro orbital around crystal bottle showing faceted light dispersion, dolly-in on cap detail, gentle pull-back. Camera orbits — bottle STAYS PERFECTLY STILL on surface.",
    haircare: "Slow dolly along bottle shape, gentle orbital showing label and pump, macro push-in on texture. Camera moves — bottle stays on shelf.",

    // ── Food & Beverage ──
    food: "Slow macro push-in on food texture detail, gentle 45-degree orbital around plate, dolly across packaging label. Camera moves — food stays on surface.",
    beverage: "Slow dolly up along bottle showing condensation, macro push-in on label, gentle orbital around glass showing liquid color. Camera moves — drink stays on surface.",
    snack: "Macro push-in on crispy texture, gentle dolly across bag showing packaging art, pull-back to in-hand context. Camera moves — snack stays in position.",
    bakery: "Slow macro push-in on golden crust texture, dolly across pastry showing interior crumb, gentle arc around display. Camera moves — baked goods stay on surface.",
    coffee: "Macro dolly across bean texture or cup surface, gentle orbital around steaming cup, push-in on latte art or crema. Camera orbits — cup stays on table.",
    alcohol: "Slow orbital around bottle showing label and liquid level, macro dolly-in on cork/cap, gentle pull-back to pour context. Camera orbits — bottle stays on bar.",

    // ── Home & Kitchen ──
    home: "Slow dolly across product surface showing material detail, gentle orbital in room context, push-in on craftsmanship. Camera moves — product stays placed.",
    furniture: "Slow dolly along frame showing joinery, gentle arc from front to side, macro push-in on fabric/wood grain. Camera moves — furniture stays in position.",
    kitchen: "Slow orbital around appliance showing controls, macro push-in on cooking surface, dolly-out to kitchen context. Camera orbits — appliance stays on counter.",

    // ── Health & Fitness ──
    supplement: "Macro push-in on label and capsule detail, gentle orbital around bottle, dolly-out to health context. Camera moves — bottle stays on surface.",
    fitness: "Slow dolly across equipment surface, macro push-in on weight markings or texture grip, gentle arc showing ergonomics. Camera moves — equipment stays on floor.",
    health: "Macro push-in on device display, gentle orbital showing sensor array, pull-back to usage context. Camera orbits — medical device stays in position.",

    // ── Misc ──
    pet: "Macro push-in on product detail, gentle dolly showing packaging, pull-back to pet interaction context. Camera moves — product stays in position.",
    baby: "Gentle slow macro push-in on safety features, soft arc showing product from parent's perspective, pull-back to nursery context. Camera moves — baby product stays secure.",
    outdoor: "Slow dolly across gear surface showing material durability, orbital in outdoor setting, macro push-in on hardware detail. Camera moves — gear stays on ground/pack.",
    auto: "Slow orbital around automotive product showing finish, macro push-in on mounting hardware, pull-back to vehicle context. Camera orbits — product stays mounted.",
    toy: "Gentle orbital showing toy from multiple play angles, macro push-in on colorful detail, pull-back to play context. Camera orbits — toy stays on surface.",
    book: "Slow macro dolly across cover art, gentle orbital showing spine and thickness, push-in on page detail. Camera moves — book stays on surface.",
    stationery: "Macro push-in on writing tip showing ink flow, gentle dolly along pen body, pull-back to desk context. Camera moves — stationery stays on desk.",
    craft: "Macro push-in on tool edge/detail, gentle orbital showing craftsmanship, dolly-out to workshop context. Camera moves — craft supplies stay on workbench.",
    cleaning: "Macro push-in on nozzle/dispenser mechanism, gentle dolly along bottle showing label, pull-back to cleaning context. Camera moves — product stays on counter.",
    digital: "Macro push-in on UI element, gentle pull-back showing full screen interface, dolly-out to device in hand. Camera moves — device stays in position.",
    other: "Slow dolly-in on product face, gentle 90-degree orbital showing profile, macro push-in on surface texture detail, pull-back to context. Camera moves — product stays static."
};

// ── PART 4: NEGATIVE PROMPT / ANTI-DISTORTION CONSTRAINTS ──
// Per-category constraints telling AI what NOT to do.
// Injected as hard constraints in the prompt to prevent common AI failures.
const PRODUCT_ANTI_DISTORTION: Partial<Record<ProductCategory, string>> = {
    // ── Electronics ──
    gadget: "ANTI-DISTORTION: NO morphing, NO warping, NO melting, NO changing shape, NO extra ports/buttons, NO distorted logo, NO flickering screen, NO blurry edges, NO unstable lighting, NO liquid metal effect, NO disjointed components, NO deformed structure. Matte/Glossy finish preserved. Precise buttons/ports maintained.",
    phone: "ANTI-DISTORTION: NO morphing, NO warping, NO extra cameras appearing, NO changing bezel width, NO distorted screen ratio, NO melting glass, NO flickering display, NO blurry edges, NO deformed buttons/ports. Matte/Glossy finish preserved.",
    laptop: "ANTI-DISTORTION: NO morphing, NO warping, NO changing hinge angle spontaneously, NO extra keys appearing, NO keyboard layout shift, NO melting chassis, NO flickering screen, NO blurry edges, NO unstable screen content. Precise keyboard/ports maintained.",
    tablet: "ANTI-DISTORTION: NO morphing, NO warping, NO changing bezel width, NO melting edges, NO flickering display, NO deformed buttons, NO blurry edges. Precise edge chamfers maintained.",
    camera: "ANTI-DISTORTION: NO morphing, NO warping, NO extra dials/buttons appearing, NO changing lens shape, NO melting grip, NO flickering LCD, NO deformed structure. Precise controls maintained.",
    audio: "ANTI-DISTORTION: NO morphing, NO warping, NO extra driver housings, NO changing stem shape, NO melting case, NO deformed ear tips, NO blurry edges. Precise capsule shape maintained.",
    gaming: "ANTI-DISTORTION: NO morphing, NO warping, NO extra buttons appearing, NO changing grip shape, NO melting keys, NO flickering RGB, NO deformed structure. Precise button/key layout maintained.",
    wearable: "ANTI-DISTORTION: NO morphing, NO warping, NO changing case shape, NO extra crowns/buttons, NO melting band, NO flickering display, NO deformed lugs. Precise watch geometry maintained.",

    // ── Fashion ──
    fashion: "ANTI-DISTORTION: NO morphing fabric into different material, NO warping hardware, NO changing garment structure, NO melting buttons/zippers, NO distorted stitching, NO blurry edges on hardware. Stitch detail and structured form preserved.",
    jewelry: "ANTI-DISTORTION: NO morphing, NO warping, NO changing prong count, NO melting gemstone, NO extra stones appearing, NO distorted chain links, NO flickering sparkle, NO deformed setting. Identical facet geometry preserved.",
    watch: "ANTI-DISTORTION: NO morphing, NO warping, NO changing dial layout, NO extra hands appearing, NO melting case, NO distorted crown, NO flickering indices. Identical case and dial geometry preserved.",
    bag: "ANTI-DISTORTION: NO morphing, NO warping hardware, NO changing silhouette, NO melting zippers, NO extra buckles appearing, NO distorted stitching. Structured form preserved.",
    shoe: "ANTI-DISTORTION: NO morphing, NO warping sole, NO changing profile, NO melting materials, NO extra eyelets appearing, NO distorted outsole tread. Rigid sole geometry preserved.",

    // ── Beauty ──
    beauty: "ANTI-DISTORTION: NO morphing, NO warping bottle shape, NO changing cap design, NO melting glass, NO distorted label, NO flickering, NO blurry edges. Rigid packaging geometry preserved.",
    fragrance: "ANTI-DISTORTION: NO morphing, NO warping crystal facets, NO changing bottle shape, NO melting glass, NO distorted cap geometry, NO flickering reflections, NO blurry edges, NO liquid metal effect. EVERY FACET ANGLE PRESERVED — bottle is a RIGID CRYSTAL OBJECT.",
    skincare: "ANTI-DISTORTION: NO morphing, NO warping tube/bottle, NO changing pump shape, NO melting container, NO distorted label, NO blurry edges. Rigid container preserved.",
    makeup: "ANTI-DISTORTION: NO morphing, NO warping compact, NO changing palette layout, NO melting packaging, NO distorted hinge, NO blurry edges. Rigid compact geometry preserved.",

    // ── Food & Beverage ──
    food: "ANTI-DISTORTION: NO morphing packaging, NO warping bag/box shape, NO changing label text, NO melting packaging structure, NO blurry label, NO distorted logo. Static label, rigid packaging. Consistent condensation if cold.",
    beverage: "ANTI-DISTORTION: NO morphing bottle/can, NO warping glass shape, NO changing label text, NO melting container, NO flickering condensation, NO distorted cap/tab. Static label, consistent condensation pattern, rigid container.",

    // ── Home & Kitchen ──
    home: "ANTI-DISTORTION: NO morphing, NO warping, NO changing structure, NO melting material, NO distorted hardware, NO blurry edges. Rigid construction maintained.",
    kitchen: "ANTI-DISTORTION: NO morphing appliance body, NO warping handles, NO changing control layout, NO melting components, NO distorted display. Rigid appliance geometry maintained.",
    furniture: "ANTI-DISTORTION: NO morphing frame, NO warping joints, NO changing proportions, NO melting upholstery, NO distorted legs/arms. Rigid structural frame maintained.",

    // ── Health ──
    supplement: "ANTI-DISTORTION: NO morphing bottle, NO warping label, NO changing cap design, NO melting capsules, NO distorted text, NO blurry printing. Rigid bottle, static label.",
    health: "ANTI-DISTORTION: NO morphing device, NO warping display, NO changing button layout, NO melting sensor, NO distorted markings. Rigid medical device geometry maintained.",
    fitness: "ANTI-DISTORTION: NO morphing equipment, NO warping weights, NO changing markings, NO melting rubber grips, NO distorted structure. Rigid iron/steel body maintained.",

    // ── Fallback ──
    other: "ANTI-DISTORTION: NO morphing, NO warping, NO melting, NO changing shape, NO extra parts, NO distorted logo, NO flickering, NO blurry edges, NO unstable lighting, NO liquid metal effect, NO disjointed components, NO deformed structure."
};

// ── MASTER PRODUCT DIRECTIVE BUILDER ──
// Combines all 4 parts into a single injection string per category.
// Format: [Material & Physicality] + [Anti-Warping] + [Camera Motion] + [Anti-Distortion]
const getMasterProductDirective = (category: ProductCategory): string => {
    const material = PRODUCT_MATERIAL_PHYSICALITY[category] || PRODUCT_MATERIAL_PHYSICALITY["other"] || "";
    const antiWarp = ANTI_WARPING_KEYWORDS[category] || ANTI_WARPING_KEYWORDS["other"] || "";
    const cameraMotion = PRODUCT_CAMERA_MOTION[category] || PRODUCT_CAMERA_MOTION["other"] || "";
    const antiDistortion = PRODUCT_ANTI_DISTORTION[category] || PRODUCT_ANTI_DISTORTION["other"] || "";

    return [
        material ? `MATERIAL & PHYSICALITY: ${material}` : '',
        antiWarp ? `STRUCTURAL INTEGRITY: ${antiWarp}` : '',
        cameraMotion ? `PRODUCT CINEMATOGRAPHY: ${cameraMotion}` : '',
        antiDistortion ? antiDistortion : ''
    ].filter(Boolean).join(' ');
};

// ═══════════════════════════════════════════════════════════════════════════
// PROP INTRODUCTION DIRECTIVE — prevents objects appearing without action
// E.g. a bowl materializing out of nowhere without character picking it up
// ═══════════════════════════════════════════════════════════════════════════
const PROP_INTRODUCTION_DIRECTIVE = "PROP CONTINUITY (CRITICAL): Every new object, prop, or utensil that appears in frame MUST be introduced by a VISIBLE character action — picking up, placing down, reaching for, or bringing into frame with hands. Objects MUST NOT magically appear, materialize, teleport, or pop into existence. If a bowl appears, show the character placing it or picking it up. If utensils appear, show the character grabbing them. NO prop may exist in frame without the character having visibly interacted with it first. Scene-to-scene prop continuity must be maintained — objects present at the end of one scene must still be present at the start of the next.";

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT ANTI-MORPH DIRECTIVE — ultra-strong brand identity preservation
// Prevents product from changing brand/logo/design between scenes
// E.g. Mama noodle turning into "Antala TOM YUM KUNG" in later scenes
// ═══════════════════════════════════════════════════════════════════════════
// Prevents product PHYSICAL SHAPE from morphing between scenes
// E.g. Versace Bright Crystal hexagonal bottle becoming rectangular in Scene 2
// ═══════════════════════════════════════════════════════════════════════════
const SCENE_PRODUCT_SHAPE_CONTINUITY = "PRODUCT SHAPE CONTINUITY (CRITICAL — Scene 2+): The product in THIS scene is the EXACT SAME physical object from the previous scene — NOT a new product, NOT a re-creation. Do NOT re-imagine, re-design, or re-generate the product's 3D shape. TRACE the product's outline from the reference frame and LOCK it: same silhouette, same height-to-width ratio, same body curvature, same cap/closure geometric shape (every facet, every angle), same base shape, same proportions. If the reference shows a hexagonal bottle, it MUST stay hexagonal — not rectangular, not round. If the reference shows a diamond-cut faceted cap, that cap MUST keep the EXACT same facet count and angles. ZERO shape drift. The product is a RIGID PHYSICAL OBJECT — it cannot morph, stretch, shrink, or change geometric form between scenes.";

const PRODUCT_ANTI_MORPH_DIRECTIVE = "BRAND IDENTITY FREEZE (HIGHEST PRIORITY): The product's brand name, logo design, packaging layout, color scheme, and typography MUST remain ABSOLUTELY IDENTICAL across ALL scenes — zero deviation. The product brand MUST NOT morph, transform, evolve, or change into a different brand at any point. If Scene 1 shows brand X, Scene 2/3/4 MUST show the EXACT SAME brand X with IDENTICAL logo, IDENTICAL text layout, IDENTICAL color bands, IDENTICAL packaging design. BRAND MORPHING IS THE #1 FORBIDDEN ERROR. If the AI is uncertain about brand details in later scenes, show the product with the label slightly angled or partially visible rather than inventing wrong branding. NEVER replace the original brand with any other brand name or logo design.";

/** Build category-specific contact + physics directive (full — for image prompts) */
const buildContactPhysicsDirective = (category: ProductCategory): string => {
    return `${PRODUCT_GRIP_CONTACT[category] || PRODUCT_GRIP_CONTACT["other"]} ${PRODUCT_PHYSICS_SHADOW[category] || PRODUCT_PHYSICS_SHADOW["other"]} ${ANTI_FLOATING_HANDS}`;
};

// Per-category REALISTIC USAGE STEPS — prevents illogical actions (e.g. spraying perfume with cap still on)
const PRODUCT_USAGE_REALISM: Partial<Record<ProductCategory, string>> = {
    // ── Food & Beverage (10) ──
    food: "REALISTIC USAGE: If food is packaged/wrapped, open or unwrap BEFORE eating or serving. Tear open bag, peel lid, or remove wrapper first. Show realistic preparation steps: wash, cut, cook in order. Plated food should be served with appropriate utensils. For instant noodles: tear open SMALL packet, character VISIBLY places bowl on counter (bowl must NOT appear from nowhere), pour noodles in, add hot water, wait, stir, then eat with chopsticks/fork. CRITICAL SIZE: single-serve food packets are SMALL (fits in one hand) — do NOT enlarge to multi-pack or family-size bag. Every bowl, plate, and utensil MUST be introduced by visible character hand action — NEVER materialize out of nowhere. SINGLE UTENSIL RULE: Use exactly ONE fork or ONE spoon per hand — absolutely NO fused double-utensils, NO two forks morphed together.",
    beverage: "REALISTIC USAGE: If bottle/can has a cap or tab, it MUST be opened BEFORE drinking or pouring. Twist cap off or pull tab first. Pour into glass at natural angle. Never drink through a sealed container.",
    snack: "REALISTIC USAGE: Tear open snack bag or peel back wrapper BEFORE eating. Show reaching into bag and picking up piece. Bite-size items held between fingers naturally. Never eat through sealed packaging.",
    bakery: "REALISTIC USAGE: Open bakery box or remove from bag BEFORE displaying or eating. If wrapped, unwrap first. Break bread naturally with hands or slice with knife. Show fresh texture and interior crumb. SINGLE UTENSIL RULE: If using a fork or spoon, use exactly ONE per hand — NO fused double-utensils, NO two forks morphed together.",
    coffee: "REALISTIC USAGE: For beans — grind first, then brew. For instant — tear sachet, pour into cup, add hot water, stir. For bottled — twist cap off first. Show steam rising from hot coffee. Never pour without opening container.",
    tea: "REALISTIC USAGE: Tear open tea sachet, place tea bag in cup, pour hot water over tea bag, steep and wait. For loose leaf — measure leaves into infuser, pour hot water. Show color developing in water. Remove tea bag before drinking.",
    alcohol: "REALISTIC USAGE: Remove cork with corkscrew or twist off bottle cap BEFORE pouring. Pour at controlled angle into appropriate glass. Show liquid at realistic level. For cocktails — mix ingredients in correct order. Must appear age-appropriate setting.",
    organic: "REALISTIC USAGE: Open eco-friendly packaging carefully — unfold paper bag, remove from compostable wrap. Wash fresh produce under water first. Show natural, unprocessed preparation steps. Display certification labels visible on packaging.",
    "frozen-food": "REALISTIC USAGE: Remove from freezer packaging first. If needs thawing — show defrost step or microwave. If cook-from-frozen — place directly in pan/oven. Show temperature change (frost melting, steam rising). Never serve still frozen unless meant to be.",
    condiment: "REALISTIC USAGE: Remove cap or flip lid open BEFORE squeezing/pouring. For jars — unscrew lid and use spoon to scoop. Shake bottle if needed before dispensing. Apply on food in controlled amount. Replace cap after use.",

    // ── Beauty & Personal Care (10) ──
    beauty: "REALISTIC USAGE: If product has a cap/lid, it MUST be removed or opened BEFORE applying/spraying. Perfume: remove decorative cap first, then press nozzle. Cream/lotion: twist open lid first. Never spray or apply through a closed cap.",
    skincare: "REALISTIC USAGE: Remove cap or pump lid BEFORE dispensing. Squeeze tube from bottom or press pump 1-2 times. Apply small amount to fingertips first, then spread on skin in gentle upward motions. Show clean face before application.",
    makeup: "REALISTIC USAGE: Remove cap from lipstick/mascara first, twist up product if needed. Open compact/palette before using brush. Dip brush or applicator, tap off excess, then apply to face. Show precise application technique.",
    haircare: "REALISTIC USAGE: Open shampoo/conditioner cap or flip lid BEFORE squeezing. Pour into palm first, then work into hair. For spray — remove cap and press nozzle aimed at hair. Show wet or damp hair for shampoo, dry hair for styling products.",
    fragrance: "REALISTIC USAGE: Character uses fingers to GENTLY LIFT the decorative cap off the perfume bottle in a smooth visible hand motion — cap removal must be shown as a NATURAL HAND ACTION (fingers gripping cap, lifting upward), NEVER an instant disappearance. After removing, hold cap in other hand or place it visibly on surface nearby — cap must NOT vanish from frame. Hold bottle 15-20cm from skin. Press nozzle with index finger for single spray. Target pulse points (wrist, neck). The bottle SHAPE and SILHOUETTE must remain IDENTICAL before and after cap removal — only the cap is separated, the body never changes.",
    sunscreen: "REALISTIC USAGE: Flip cap open or remove lid BEFORE squeezing. Squeeze onto fingertips or palm first. Apply in dots on face/body, then spread evenly. Show outdoor/sunny setting for context. Apply BEFORE sun exposure.",
    nail: "REALISTIC USAGE: Unscrew nail polish cap by twisting. Wipe excess on bottle rim. Apply in thin strokes from base to tip of nail. Show steady hand technique. For nail tools — remove from packaging first. Let layers dry between coats.",
    soap: "REALISTIC USAGE: For bar soap — unwrap packaging first, wet hands and bar, lather between palms. For liquid soap — press pump to dispense onto wet hands. For body wash — squeeze onto loofah or palm. Show water and foam/lather.",
    dental: "REALISTIC USAGE: Remove cap from toothpaste tube FIRST, then squeeze paste onto the BRISTLE SIDE (top surface where bristles face UP) of the toothbrush — NEVER squeeze onto the back/bottom of the brush. The toothpaste TUBE is the PRODUCT and must always be the most prominent item. The toothbrush is just a PROP — always smaller and secondary. For mouthwash — unscrew cap, pour measured amount into cap or cup. For floss — pull out strand, wrap around fingers. Show proper brushing/flossing technique.",
    barbershop: "REALISTIC USAGE: For clippers — attach guard first, turn on with switch. For razor — remove cap, apply shaving cream first then shave in direction of growth. For styling products — open jar/tube, scoop with fingers, work through hair.",

    // ── Health & Wellness (10) ──
    health: "REALISTIC USAGE: For thermometer — turn on, place sensor correctly. For blood pressure monitor — wrap cuff on arm first, press start. For test kit — open sealed pouch, follow step-by-step instructions. Show clear display reading.",
    supplement: "REALISTIC USAGE: Open bottle cap or tear sachet BEFORE taking capsules/tablets. Pour capsules into palm or shake out single dose. Take with water — show glass of water and swallowing motion. Never swallow through closed packaging.",
    vitamin: "REALISTIC USAGE: Twist open childproof cap (press down and turn). Shake out correct dosage into palm. For gummy vitamins — pick one from bottle. For effervescent — drop tablet in water glass, wait for dissolve, then drink.",
    protein: "REALISTIC USAGE: Open tub lid, use included scoop to measure powder. Pour scoop into shaker bottle with water/milk. Close shaker lid securely, shake vigorously 10-15 seconds. Open flip-top and drink. Show mixing action.",
    "weight-loss": "REALISTIC USAGE: For meal replacement — open sachet, pour into shaker with liquid, shake well. For capsules — open bottle, take with water. For patches — peel backing off, apply to clean skin. Show before/after lifestyle context.",
    massage: "REALISTIC USAGE: For massage oil — uncap bottle, pour into palm to warm. For massage tool — grip handle properly, apply to muscle area with rolling/pressing motion. For hot pack — heat in microwave first, then apply to body.",
    "essential-oil": "REALISTIC USAGE: Remove dropper cap from bottle. Hold bottle at angle, squeeze dropper to fill. Add 2-3 drops to diffuser water tank. For topical — dilute with carrier oil first, never apply undiluted directly on skin. Turn diffuser on.",
    elderly: "REALISTIC USAGE: Show easy-to-open packaging (large tabs, simple twist caps). Demonstrate with steady, unhurried movements. For mobility aids — adjust to correct height first, demonstrate proper grip and posture. Show clear labels and large print.",
    medicine: "REALISTIC USAGE: Check label first, remove childproof cap (press and twist). For liquid — use measuring cup/spoon for exact dosage. For tablets — push through blister pack. For topical — open tube, apply to affected area. Follow dosage instructions visible.",
    "mental-health": "REALISTIC USAGE: For journals — open to blank page, begin writing with pen. For meditation tools — find comfortable seated position, press play on app/device. For aromatherapy — set up diffuser, add drops. Show calm, intentional usage in quiet setting.",

    // ── Fashion & Accessories (10) ──
    fashion: "REALISTIC USAGE: Remove tags and packaging before wearing. For clothing — put on naturally (pull over head, button up, zip). Show adjusting fit, smoothing fabric. For layering — put base layer first, then outer layer.",
    underwear: "REALISTIC USAGE: Remove from packaging. Show holding up item to display fit and fabric quality. For review — show material close-up, elasticity, and tag with size info. Keep presentation tasteful and non-explicit.",
    swimwear: "REALISTIC USAGE: Remove tags first. Show putting on over body naturally. Demonstrate stretch and fit. Show in appropriate pool/beach setting. For review — display fabric quality, lining, and strap adjustability.",
    sportswear: "REALISTIC USAGE: Remove tags and fold-out packaging. Put on athletic wear naturally. Show freedom of movement — stretching, squatting, running in place. Demonstrate moisture-wicking or ventilation features through active movement.",
    jewelry: "REALISTIC USAGE: Open jewelry box or pouch first. For necklace — unclasp, place around neck, secure clasp at back. For ring — slide onto finger. For earrings — open back/hook, insert through ear. Show sparkle catching light.",
    watch: "REALISTIC USAGE: Remove from box/case first. Open clasp or buckle, place on wrist, fasten securely. Adjust strap if needed. Show checking time naturally. For smart watch — press crown/button to wake display, swipe screen.",
    bag: "REALISTIC USAGE: Open zipper or unfasten clasp to show interior. Demonstrate putting items inside (phone, wallet, keys). Show carrying naturally — on shoulder, crossbody, or by handle. Open/close compartments to show organization.",
    shoe: "REALISTIC USAGE: Remove from box, take out stuffing paper. Loosen laces or open strap BEFORE putting on foot. Slide foot in, then lace up or fasten. Show walking naturally to demonstrate comfort and fit.",
    sunglasses: "REALISTIC USAGE: Remove from case first. Unfold temples (arms) before putting on. Place on face with both hands, adjust on nose bridge. Show UV protection in bright sunlight setting. Fold and return to case when done.",
    hat: "REALISTIC USAGE: Remove from packaging or shelf. Place on head naturally, adjust brim angle or strap. For fitted caps — pull down snugly. For adjustable — show snap-back or strap adjustment. Adjust angle confidently.",

    // ── Tech & Gadgets (10) ──
    gadget: "REALISTIC USAGE: If device is boxed, unbox first. If it has a power button, press it to turn on. Wait for boot-up screen. Show logical step-by-step device usage and feature demonstration.",
    phone: "REALISTIC USAGE: Unbox and remove protective film first. Press power button to turn on. Complete basic setup if new. Show natural one-handed grip, thumb scrolling, taking photo with camera. Demonstrate specific features.",
    laptop: "REALISTIC USAGE: Open lid to reveal screen. Press power button. Wait for boot screen. Show typing on keyboard naturally with correct finger placement. Demonstrate trackpad gestures. Show screen content clearly.",
    tablet: "REALISTIC USAGE: Press power button or home button to wake. Unlock screen with swipe or face ID. Hold with one hand at edge or place on stand. Use stylus or finger to interact with screen. Show drawing/browsing naturally.",
    camera: "REALISTIC USAGE: Remove lens cap BEFORE shooting. Power on camera. Look through viewfinder or at LCD screen. Half-press shutter to focus, then full-press to capture. For lens change — power off, press release button, twist to remove, mount new lens.",
    audio: "REALISTIC USAGE: Open charging case for earbuds, remove earbuds and place in ears. For headphones — extend headband, place over ears. For speakers — press power button, pair via Bluetooth. Show volume adjustment and playback controls.",
    gaming: "REALISTIC USAGE: Connect controller or power on console first. Hold controller with proper two-hand grip — thumbs on sticks, fingers on triggers. Show screen with gameplay. For keyboard/mouse gaming — show natural hand positions.",
    wearable: "REALISTIC USAGE: Charge device first if needed. Strap on wrist securely. Press button or tap screen to wake. Show pairing with phone. Demonstrate fitness tracking during exercise or notification checking on wrist.",
    drone: "REALISTIC USAGE: Unfold arms/propellers if foldable. Insert battery, ensure it clicks. Place on flat ground. Power on controller first, then drone. Calibrate if needed. Show smooth takeoff from open outdoor area. Always fly in safe open space.",
    charger: "REALISTIC USAGE: Unbox and uncoil cable. Plug power adapter into wall outlet. Connect cable end to device port — Lightning, USB-C, or micro-USB matching correctly. Show charging indicator light or battery icon on device screen.",

    // ── Home & Living (10) ──
    home: "REALISTIC USAGE: Unbox and remove protective wrapping. For furniture — assemble if needed following included instructions. Place in intended location. Show styling with existing décor. Demonstrate primary function in realistic home setting.",
    furniture: "REALISTIC USAGE: Unbox all pieces, lay out hardware. Follow assembly instructions step-by-step — attach legs, tighten bolts with included Allen key. Place in room, adjust leveling feet. Show sitting/using to demonstrate sturdiness.",
    bedding: "REALISTIC USAGE: Remove from packaging, unfold completely. For fitted sheet — stretch over mattress corners. For duvet — insert into cover, button or zip closed. Fluff pillows before placing. Show making bed in proper layering order.",
    curtain: "REALISTIC USAGE: Remove from packaging, unfold. Thread curtain rod through rod pocket or attach hooks/rings. Mount rod on brackets above window. Adjust curtain width and drape. Show opening/closing to demonstrate light control.",
    rug: "REALISTIC USAGE: Unroll on floor surface. Allow to flatten naturally (may take 24-48h). Position in desired location. For non-slip — place rug pad underneath first. Show vacuuming or spot cleaning for maintenance.",
    "lighting-decor": "REALISTIC USAGE: Unbox and assemble shade/base if separate. Insert correct bulb type (check wattage). Plug in or hardwire per instructions. Flip switch or use remote to turn on. Show adjusting brightness or color temperature if dimmable.",
    storage: "REALISTIC USAGE: Unbox and assemble if flat-pack. For bins/baskets — remove tags, unfold. Place in closet, shelf, or cabinet. Demonstrate organizing items inside — fold clothes, stack items, label containers. Show before/after organization.",
    mirror: "REALISTIC USAGE: Carefully unbox (heavy/fragile). Mount on wall using included hardware — measure, mark, drill, insert anchors, hang. Or place on floor/lean against wall for floor mirrors. Show reflection to demonstrate clarity and size.",
    vase: "REALISTIC USAGE: Unwrap carefully from protective packaging. Place on stable surface. Add water if using fresh flowers — fill 2/3 full. Trim flower stems at angle, arrange in vase. Show as decorative accent in room setting.",
    frame: "REALISTIC USAGE: Open back of frame, remove protective insert. Place photo or art inside, secure backing. For hanging — attach hook/wire to back, hammer nail into wall at measured spot, hang frame, level. Show finished display on wall.",

    // ── Kitchen & Appliances (10) ──
    kitchen: "REALISTIC USAGE: Show logical cooking steps — prep ingredients before cooking, use utensils in correct order. Wash produce first, then chop on cutting board, then cook in pan/pot. Season during or after cooking as appropriate.",
    "rice-cooker": "REALISTIC USAGE: Measure rice with included cup. Rinse rice in inner pot under water. Add correct water level (use markings inside pot). Place inner pot in cooker, close lid securely. Select cooking mode, press start. Wait for completion indicator.",
    blender: "REALISTIC USAGE: Place blender jar on base, ensure it locks. Add liquid first, then soft ingredients, then hard/frozen items last. Place lid securely with center cap. Select speed or program, press start. Pour from jar after blending stops.",
    "air-fryer": "REALISTIC USAGE: Pull out basket/tray. Place food in single layer (don't overcrowd). Slide basket back in until it clicks. Set temperature and time using dial/buttons. Press start. Shake basket halfway if needed. Use tongs to remove food when done.",
    vacuum: "REALISTIC USAGE: Assemble handle and attachments if needed. Check/empty dust bin before use. Plug in (or ensure battery charged for cordless). Press power button. Vacuum in overlapping passes. Switch attachments for different surfaces. Empty bin when indicator shows.",
    washer: "REALISTIC USAGE: Load clothes into drum (don't overfill). Add detergent to dispenser drawer. Close door securely until it clicks/locks. Select wash cycle and temperature. Press start. Wait for cycle to complete and door unlocks before opening.",
    fridge: "REALISTIC USAGE: Unbox and let stand upright for 4+ hours before plugging in. Set temperature dial/control. Wait 24h to reach optimal temperature before loading food. Show organizing shelves, drawers, and door bins with appropriate food items.",
    "air-purifier": "REALISTIC USAGE: Unbox and remove all packaging including plastic wrap on filter. Open panel, insert filter in correct orientation (check arrow). Close panel. Plug in and press power. Select fan speed or auto mode. Show indicator light for air quality.",
    "water-filter": "REALISTIC USAGE: Rinse new filter cartridge under water for 15 seconds. Insert into pitcher/system housing, twist to lock. Fill reservoir with tap water. Wait for water to filter through. Discard first 1-2 batches. Show clean filtered water pouring.",
    "smart-home": "REALISTIC USAGE: Unbox device. Plug into power outlet. Download companion app on phone. Follow app pairing instructions (scan QR code or press sync button). Configure settings — WiFi, schedules, automations. Show voice command or app control in action.",

    // ── Auto & Transport (5) ──
    auto: "REALISTIC USAGE: For accessories — clean installation surface first, peel adhesive backing, apply firmly. For fluids — open hood, locate correct reservoir, unscrew cap, pour to fill line. For tools — demonstrate proper usage technique with correct safety gear.",
    motorcycle: "REALISTIC USAGE: For accessories — install with correct tools per manual. For helmets — adjust strap length first, place on head, fasten chin strap securely (should fit two fingers). For gear — put on protective layers before riding.",
    bicycle: "REALISTIC USAGE: For accessories — mount using included bracket or clamp, tighten with Allen key. For lights — attach to handlebar/seatpost, charge via USB first. For helmet — adjust fit dial, place on head level, buckle chin strap snugly.",
    "car-accessory": "REALISTIC USAGE: For dash cam — mount on windshield with suction cup, connect power cable to cigarette lighter or USB. For seat covers — stretch over seat, secure with hooks underneath. For phone mount — attach to vent or windshield, adjust arm.",
    ev: "REALISTIC USAGE: For home charger — wall-mount bracket first, connect to electrical panel (show electrician install). Open charge port on vehicle, plug connector firmly until click. Show charge indicator on vehicle/app. For portable — uncoil cable, plug into outlet first.",

    // ── Family & Kids (5) ──
    baby: "REALISTIC USAGE: For bottles — sterilize first, add formula with scoop, add warm water, secure nipple and cap, shake to mix. For toys — remove from packaging, remove all small parts/tags. For skincare — test on small area first, apply gently.",
    toy: "REALISTIC USAGE: Remove all packaging, wire ties, and tape. Install batteries if needed (open compartment with screwdriver, insert correct polarity). For assembly toys — follow included instructions step-by-step. Show age-appropriate play interaction.",
    "kids-education": "REALISTIC USAGE: Unbox and set up learning materials. For electronic — insert batteries/charge, power on. For books/cards — open package, organize by subject. Show child interacting at appropriate developmental level with parental supervision.",
    maternity: "REALISTIC USAGE: For support belts — wrap around belly at correct height, adjust velcro for comfort. For supplements — check label, take with water after meals. For nursing items — assemble pump parts, sterilize before first use. Show gentle, comfortable usage.",
    family: "REALISTIC USAGE: Unbox and set up for family activity. For board games — lay out board, distribute pieces, read rules. For picnic items — unfold, set up in outdoor area. Show multiple family members engaging together naturally.",

    // ── Sports & Outdoor (5) ──
    fitness: "REALISTIC USAGE: For weights — start with proper warm-up, grip handles firmly. For resistance bands — check for tears first, anchor securely, maintain controlled movement. For mats — unroll on flat surface, show exercises with proper form.",
    sports: "REALISTIC USAGE: For balls — inflate to proper pressure using pump with correct needle. For equipment — assemble and adjust to user's size. For protective gear — put on BEFORE activity, secure all straps. Show proper athletic technique.",
    outdoor: "REALISTIC USAGE: For tents — lay footprint first, assemble poles, stake corners, attach fly. For gear — adjust straps to body, secure buckles. For tools — check condition before use, handle safely. Show in authentic outdoor environment.",
    camping: "REALISTIC USAGE: Choose flat ground first. For tent — stake corners, assemble pole frame, attach rainfly. For stove — connect fuel canister, turn valve, ignite. For sleeping bag — unroll, unzip, show insulation. Pack out all items when done.",
    yoga: "REALISTIC USAGE: Unroll mat on flat surface. For blocks/straps — place within reach before starting. For clothing — change into stretchy activewear. Show proper alignment in poses. For meditation cushion — sit with proper posture. Demonstrate in calm, quiet setting.",

    // ── Office & Education (5) ──
    digital: "REALISTIC USAGE: Download/install app or software first. Create account if needed. Navigate through setup wizard. Show main interface and key features. Demonstrate core workflow — input data, process, see output. Show save/export results.",
    stationery: "REALISTIC USAGE: For pens — remove cap or click to extend tip. For notebooks — open to fresh page. For markers — remove cap, test on scratch paper. For organizers — unbox, set up sections. Show writing smoothly with proper grip.",
    book: "REALISTIC USAGE: Remove shrink wrap if sealed. Open cover, flip to table of contents or first chapter. Hold book open naturally with both hands or place on surface. Show reading posture — seated comfortably with good lighting.",
    office: "REALISTIC USAGE: For chairs — assemble base, attach seat, adjust height lever. For desk organizers — place items in compartments. For printer — unbox, install ink/toner, load paper, connect to computer. Show in organized workspace.",
    course: "REALISTIC USAGE: Log in to platform, navigate to course page. Click play on first lesson video. Show taking notes alongside. For physical materials — open workbook, follow along with exercises. Show progress tracking or certificate.",

    // ── Cleaning & Home Care (5) ──
    cleaning: "REALISTIC USAGE: Remove safety cap or flip nozzle open BEFORE spraying or pouring cleaning product. For spray bottles — switch nozzle from OFF to SPRAY position. Apply to surface, wait if needed, then wipe with cloth. Wear gloves for harsh chemicals.",
    detergent: "REALISTIC USAGE: Open cap or flip lid. For liquid — pour into cap to measure dose, then pour into washer dispenser. For pods — pick up single pod with dry hands, place directly in drum BEFORE clothes. For powder — use scoop for correct amount.",
    "air-freshener": "REALISTIC USAGE: For spray — remove cap, press nozzle aimed upward. For plug-in — insert refill into device, plug into wall outlet, adjust intensity. For gel — peel back lid to expose surface. For reed diffuser — pour oil, insert reeds, flip after 1 hour.",
    insect: "REALISTIC USAGE: For spray — shake can first, remove cap, aim at target area 30cm away, press nozzle. For plug-in — insert liquid refill, plug into wall outlet. For traps — peel backing to expose adhesive, place in target area. Keep away from food.",
    garden: "REALISTIC USAGE: For seeds — dig holes at correct depth/spacing, place seeds, cover with soil, water gently. For tools — grip handle properly, use correct technique (prune at 45° angle). For fertilizer — measure correct amount, apply evenly, water in.",

    // ── Misc (5) ──
    pet: "REALISTIC USAGE: For food — tear open bag or peel lid, pour measured amount into bowl. For toys — remove packaging and tags. For grooming — brush in direction of fur growth. For leash — clip to collar/harness, adjust length. Show pet interacting naturally.",
    craft: "REALISTIC USAGE: Lay out all materials and tools first. Read instructions/pattern before starting. For paint — open containers, squeeze onto palette. For glue — remove cap, apply in thin line. For cutting — use ruler and sharp blade on cutting mat. Show step-by-step creation.",
    gift: "REALISTIC USAGE: For wrapping — measure and cut paper to size, place item face-down, fold edges neatly, tape securely. Add ribbon by crossing and tying bow. For gift sets — arrange items in box, add tissue paper. For gift cards — insert into envelope or holder.",
    wedding: "REALISTIC USAGE: For decorations — unbox and fluff artificial flowers, tie ribbons with even loops. For invitations — insert card in envelope, apply seal/sticker. For accessories — try on for fit, adjust clasp/tie. Show in elegant celebration setting.",
    other: "REALISTIC USAGE: If product has any cap, lid, seal, or wrapper, it must be removed/opened BEFORE use. Show logical step-by-step usage following the product's intended purpose. Demonstrate correct handling and operation sequence.",
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY CONTEXTUAL REALISM — Script-aware accessories, screen content,
// character actions, and cinematic transitions per product category.
// Analyzes the generated voiceover script to detect mentions of accessories,
// features, or usage scenarios and injects matching visual directives
// so the AI generates realistic, engaging, context-appropriate video clips.
// ═══════════════════════════════════════════════════════════════════════════

interface ContextualRealismEntry {
    accessories: { kw: string[]; v: string }[];
    screen?: { kw: string[]; v: string }[];
    actions: { kw: string[]; a: string }[];
    transitions: string[];
}

const CATEGORY_CONTEXTUAL_REALISM: Partial<Record<ProductCategory, ContextualRealismEntry>> = {
    // ── Tech & Gadgets ──
    laptop: {
        accessories: [
            { kw: ["ชาร์จ", "charger", "สายชาร์จ", "charging", "แบต", "battery", "adapter", "อะแดป"], v: "charging cable and power adapter on desk nearby" },
            { kw: ["เมาส์", "mouse", "คลิก"], v: "wireless mouse beside laptop" },
            { kw: ["กระเป๋า", "bag", "sleeve", "พกพา", "carry"], v: "laptop sleeve or bag on table" },
            { kw: ["USB", "hub", "port", "ต่อ", "เชื่อม", "dongle"], v: "USB hub connected to laptop port" },
            { kw: ["หูฟัง", "headphone", "earphone"], v: "headphones beside laptop or worn by presenter" },
        ],
        screen: [
            { kw: ["เกม", "game", "gaming", "เล่นเกม", "GPU", "กราฟิก", "graphic", "ประสิทธิภาพ"], v: "laptop screen showing vivid colorful gameplay with dynamic action running smoothly" },
            { kw: ["ตัดต่อ", "edit", "video editing", "render", "premiere", "content creator"], v: "laptop screen showing video editing timeline with colorful clips and waveforms" },
            { kw: ["ออกแบบ", "design", "photoshop", "illustrator", "creative"], v: "laptop screen showing design software with colorful artwork project" },
            { kw: ["โค้ด", "code", "programming", "developer", "เขียนโปรแกรม"], v: "laptop screen showing code editor with syntax highlighting" },
            { kw: ["ทำงาน", "work", "office", "เอกสาร", "document", "ประชุม"], v: "laptop screen showing productivity workspace with documents open" },
            { kw: ["ดูหนัง", "movie", "Netflix", "stream", "ดูซีรีส์"], v: "laptop screen showing cinematic movie scene with vibrant HDR colors" },
        ],
        actions: [
            { kw: ["เกม", "game", "gaming", "เล่นเกม"], a: "Character sitting at desk, hands on keyboard gaming intensely, reacting to gameplay action on screen" },
            { kw: ["ทำงาน", "work", "office", "productive"], a: "Character sitting professionally, typing on laptop, occasionally glancing at camera confidently" },
            { kw: ["พกพา", "portable", "เบา", "light", "บาง", "thin"], a: "Character lifts laptop with one hand showing lightweight, puts into bag effortlessly" },
            { kw: ["จอ", "screen", "display", "สี", "color"], a: "Character tilts screen to show vivid display, points at screen details admiringly" },
        ],
        transitions: [
            "Smooth dolly zoom from desk setup to screen content close-up",
            "Camera orbits around presenter and laptop in fluid arc",
            "Rack focus from presenter face to laptop screen details",
            "Dynamic whip pan between usage scenarios",
        ]
    },
    phone: {
        accessories: [
            { kw: ["เคส", "case", "ปกป้อง", "protect"], v: "protective phone case showing premium design" },
            { kw: ["ชาร์จ", "charger", "สายชาร์จ", "charging", "แบต"], v: "phone charging cable and adapter nearby" },
            { kw: ["หูฟัง", "earbuds", "airpods", "bluetooth", "ไร้สาย"], v: "wireless earbuds beside the phone" },
            { kw: ["ฟิล์ม", "screen protector", "กันรอย"], v: "screen protector visible on phone display" },
        ],
        screen: [
            { kw: ["กล้อง", "camera", "ถ่ายรูป", "photo", "ถ่ายภาพ"], v: "phone camera viewfinder open showing beautiful high-res scene" },
            { kw: ["เกม", "game", "gaming"], v: "phone screen showing colorful exciting mobile game" },
            { kw: ["โซเชียล", "social", "tiktok", "instagram", "scroll"], v: "phone showing social media feed with engaging content" },
            { kw: ["วิดีโอ", "video", "ดูหนัง", "youtube", "4K"], v: "phone playing high-definition video with vivid colors" },
            { kw: ["5G", "เร็ว", "speed", "internet", "ดาวน์โหลด"], v: "phone showing blazing fast speed test results" },
        ],
        actions: [
            { kw: ["ถ่ายรูป", "photo", "กล้อง", "camera", "เซลฟี่"], a: "Character holds phone to take photo, taps shutter, checks result with impressed expression" },
            { kw: ["เกม", "game", "gaming"], a: "Character holds phone horizontally, thumbs tapping screen, focused gaming expression" },
            { kw: ["โทร", "call", "วิดีโอคอล"], a: "Character holds phone to face, animated video call conversation" },
        ],
        transitions: [
            "Smooth zoom from phone screen to presenter's impressed reaction",
            "Camera sweep showing phone from multiple angles",
            "Quick match cut between phone features and real-world use",
        ]
    },
    tablet: {
        accessories: [
            { kw: ["ปากกา", "stylus", "pencil", "เขียน", "วาด"], v: "digital stylus pen beside tablet or in presenter's hand" },
            { kw: ["คีย์บอร์ด", "keyboard", "พิมพ์"], v: "detachable keyboard case attached to tablet" },
            { kw: ["ขาตั้ง", "stand", "วาง"], v: "tablet propped on adjustable stand" },
        ],
        screen: [
            { kw: ["วาด", "draw", "ออกแบบ", "design", "art"], v: "tablet screen showing digital art canvas with colorful illustration" },
            { kw: ["จด", "note", "เขียน", "write"], v: "tablet screen showing handwritten notes with colorful annotations" },
            { kw: ["ดูหนัง", "movie", "video"], v: "tablet screen showing cinematic video content" },
        ],
        actions: [
            { kw: ["วาด", "draw", "art"], a: "Character drawing on tablet with stylus, focused creative expression, smooth strokes" },
            { kw: ["อ่าน", "read", "book"], a: "Character comfortably holding tablet, reading with relaxed expression" },
        ],
        transitions: [
            "Smooth transition from tablet screen art to presenter's proud expression",
            "Camera slides from overhead tablet view to eye-level shot",
        ]
    },
    gaming: {
        accessories: [
            { kw: ["หูฟัง", "headset", "headphone"], v: "RGB gaming headset worn by presenter or on desk" },
            { kw: ["แผ่นรอง", "mousepad", "pad"], v: "large RGB gaming mousepad on desk" },
            { kw: ["เก้าอี้", "chair", "gaming chair"], v: "gaming chair visible in setup background" },
            { kw: ["จอ", "monitor", "screen"], v: "gaming monitor with gameplay in background" },
        ],
        screen: [
            { kw: ["FPS", "shooter", "ยิง", "battle", "war", "PUBG", "Valorant"], v: "monitor showing fast-paced FPS gameplay with HUD and combat action" },
            { kw: ["MOBA", "strategy", "วางแผน", "LOL", "DOTA"], v: "monitor showing MOBA team battle with colorful abilities" },
            { kw: ["racing", "แข่ง", "drift", "speed"], v: "monitor showing high-speed racing with motion blur" },
            { kw: ["RPG", "open world", "ผจญภัย"], v: "monitor showing beautiful open-world RPG landscape" },
        ],
        actions: [
            { kw: ["เล่น", "play", "game", "เกม"], a: "Character gripping controller or hands on keyboard+mouse, intensely focused, reacting to gameplay" },
            { kw: ["ชนะ", "win", "victory", "clutch"], a: "Character celebrates victory with raised hands, excited expression, looks at camera proudly" },
            { kw: ["stream", "ถ่ายทอด", "สตรีม"], a: "Character speaks to camera while gaming, engaging with audience" },
        ],
        transitions: [
            "Dynamic whip pan from gameplay screen to presenter's expression",
            "RGB lighting color shift transition between scenes",
            "Quick zoom burst from controller close-up to full setup wide shot",
        ]
    },
    camera: {
        accessories: [
            { kw: ["เลนส์", "lens", "ซูม", "zoom", "wide"], v: "extra camera lens on desk beside camera body" },
            { kw: ["ขาตั้ง", "tripod", "monopod"], v: "tripod set up in background or beside presenter" },
            { kw: ["เมมโมรี่", "memory", "SD", "การ์ด", "card"], v: "SD memory card being inserted into camera slot" },
            { kw: ["สาย", "strap", "สายคล้อง"], v: "camera strap around presenter's neck" },
            { kw: ["แฟลช", "flash", "light", "ไฟ"], v: "external flash or light attached to camera hot shoe" },
        ],
        actions: [
            { kw: ["ถ่ายรูป", "photo", "shoot", "ถ่ายภาพ", "capture"], a: "Character looking through viewfinder, half-press focus, clicks shutter with confident technique" },
            { kw: ["วิดีโอ", "video", "film", "ถ่ายวิดีโอ"], a: "Character recording video, smooth panning motion, monitoring LCD screen" },
            { kw: ["เลนส์", "lens", "เปลี่ยน"], a: "Character demonstrates lens change — presses release, twists off, mounts new lens with satisfying click" },
        ],
        transitions: [
            "Camera shutter click transition between scenes",
            "Rack focus transition mimicking camera autofocus",
            "Smooth dolly following presenter shooting with the camera",
        ]
    },
    audio: {
        accessories: [
            { kw: ["เคส", "case", "ชาร์จ"], v: "charging case open with LED indicator glowing" },
            { kw: ["จุก", "ear tip", "tip", "ซิลิโคน"], v: "extra silicone ear tips in different sizes" },
            { kw: ["สาย", "cable", "USB"], v: "USB charging cable beside earbuds case" },
        ],
        actions: [
            { kw: ["เพลง", "music", "ฟังเพลง", "song"], a: "Character wearing earbuds, eyes closed with slight head bobbing, peaceful music enjoyment" },
            { kw: ["ออกกำลัง", "workout", "วิ่ง", "run", "gym"], a: "Character wearing earbuds during workout, secure fit visible during active movement" },
            { kw: ["โทร", "call", "ประชุม"], a: "Character taking call via earbuds, speaking naturally, touch control gesture" },
            { kw: ["noise cancel", "ตัดเสียง", "ANC", "เงียบ"], a: "Character in noisy setting puts on headphones, expression shifts to peaceful calm" },
        ],
        transitions: [
            "Smooth dolly in from wide to close-up of earbuds in ear",
            "Audio visualization ripple effect transition between scenes",
        ]
    },
    wearable: {
        accessories: [
            { kw: ["สาย", "band", "strap"], v: "extra watch bands in different colors displayed" },
            { kw: ["ชาร์จ", "charger", "charge"], v: "magnetic charging dock with LED indicator" },
        ],
        screen: [
            { kw: ["ออกกำลัง", "workout", "exercise", "วิ่ง", "run", "ฟิตเนส"], v: "wearable screen showing heart rate, calories, workout timer in real-time" },
            { kw: ["นอน", "sleep", "พักผ่อน"], v: "wearable screen showing sleep tracking graph" },
            { kw: ["แจ้งเตือน", "notification", "message", "ข้อความ"], v: "wearable screen showing incoming notification" },
            { kw: ["สุขภาพ", "health", "หัวใจ", "heart rate"], v: "wearable screen showing heart rate pulse graph" },
        ],
        actions: [
            { kw: ["ออกกำลัง", "exercise", "วิ่ง", "run"], a: "Character exercising actively, glances at wrist to check stats on wearable screen" },
            { kw: ["แจ้งเตือน", "notification"], a: "Character's wrist vibrates, naturally raises wrist to read notification" },
        ],
        transitions: [
            "Zoom from wearable screen data to active lifestyle shot",
            "Wrist-raise reveal transition from daily life to tracking view",
        ]
    },
    drone: {
        accessories: [
            { kw: ["แบต", "battery", "ชาร์จ", "charge"], v: "extra drone batteries on charging hub" },
            { kw: ["รีโมท", "remote", "controller"], v: "drone controller with phone mount attached" },
            { kw: ["กระเป๋า", "bag", "case", "carry"], v: "protective drone carrying case open showing compartments" },
        ],
        actions: [
            { kw: ["บิน", "fly", "ถ่าย", "aerial", "มุมสูง"], a: "Character launches drone from flat surface, watches it rise, controls with steady hands on remote" },
            { kw: ["ถ่ายภาพ", "photo", "วิดีโอ", "video", "footage"], a: "Character monitors drone camera feed on phone/controller screen, adjusts gimbal angle" },
        ],
        transitions: [
            "Aerial sweep transition from drone launch to footage result",
            "Camera lifts upward mimicking drone takeoff perspective",
        ]
    },
    charger: {
        accessories: [
            { kw: ["สาย", "cable", "USB-C", "Lightning", "Type-C"], v: "compatible charging cables in different connector types" },
            { kw: ["อะแดป", "adapter", "หัว"], v: "wall adapter plugged into outlet with indicator LED" },
        ],
        actions: [
            { kw: ["ชาร์จ", "charge", "เสียบ", "plug"], a: "Character plugs cable into device, LED indicator lights up, battery icon appears on device screen" },
            { kw: ["เร็ว", "fast", "quick charge", "rapid"], a: "Character shows battery percentage climbing rapidly on device screen, impressed expression" },
        ],
        transitions: [
            "LED indicator glow transition between charging steps",
            "Smooth zoom from cable connection to device screen showing charge level",
        ]
    },

    // ── Beauty & Personal Care ──
    beauty: {
        accessories: [
            { kw: ["สำลี", "cotton", "pad"], v: "cotton pads stacked neatly on vanity tray" },
            { kw: ["กระจก", "mirror", "ส่อง"], v: "vanity mirror reflecting presenter's application" },
            { kw: ["แปรง", "brush", "applicator"], v: "makeup brush or applicator beside product" },
        ],
        actions: [
            { kw: ["ทา", "apply", "ลง", "spread"], a: "Character gently applying product with careful technique, checking result in mirror" },
            { kw: ["ก่อน", "before", "after", "หลัง", "ผลลัพธ์"], a: "Character shows skin before application, applies product, reveals glowing result" },
        ],
        transitions: [
            "Soft focus dreamy transition with warm light flare",
            "Elegant slow-motion close-up from product to skin result",
        ]
    },
    fragrance: {
        accessories: [
            { kw: ["กล่อง", "box", "packaging"], v: "elegant perfume box displayed beside bottle" },
            { kw: ["set", "ชุด", "travel", "mini"], v: "travel-size perfume set arranged artfully" },
        ],
        actions: [
            { kw: ["ฉีด", "spray", "สเปรย์", "พ่น"], a: "Character removes cap elegantly, sprays on wrist with precise motion, visible mist catching light" },
            { kw: ["กลิ่น", "scent", "หอม", "fragrance"], a: "Character brings wrist to nose, closes eyes, inhales deeply with blissful expression" },
        ],
        transitions: [
            "Dreamy slow-motion perfume mist floating in golden light between scenes",
            "Soft bokeh light flare transition as fragrance settles",
        ]
    },
    skincare: {
        accessories: [
            { kw: ["สำลี", "cotton", "pad", "โทนเนอร์", "toner"], v: "cotton pads and toner on vanity tray" },
            { kw: ["ลูกกลิ้ง", "roller", "jade", "กัวซา", "gua sha"], v: "jade roller or gua sha stone beside products" },
            { kw: ["กระจก", "mirror"], v: "lit vanity mirror for skin close-up" },
        ],
        actions: [
            { kw: ["ล้างหน้า", "cleanse", "ทำความสะอาด"], a: "Character splashing water, applying cleanser with gentle circular motions, patting dry" },
            { kw: ["เซรั่ม", "serum", "บำรุง", "moisturize", "ครีม"], a: "Character dispensing product onto fingertips, patting gently into skin with upward motions" },
        ],
        transitions: [
            "Smooth close-up dissolve from product texture to dewy skin",
            "Elegant light refraction through serum droplet transition",
        ]
    },
    makeup: {
        accessories: [
            { kw: ["แปรง", "brush", "พู่กัน"], v: "makeup brush set organized on vanity" },
            { kw: ["กระจก", "mirror"], v: "illuminated makeup mirror for precise application" },
            { kw: ["ฟองน้ำ", "sponge", "beauty blender"], v: "beauty sponge for blending beside palette" },
        ],
        actions: [
            { kw: ["ทา", "apply", "แต่ง", "blend"], a: "Character applies makeup with precise technique, blending carefully, checking mirror" },
            { kw: ["ปาก", "lip", "ลิปสติก", "lipstick"], a: "Character applies lipstick with steady hand, presses lips together, admires color" },
            { kw: ["ตา", "eye", "อายแชโดว์", "eyeshadow"], a: "Character sweeps eyeshadow across lid, blends crease, opens eyes to show result" },
        ],
        transitions: [
            "Glamorous close-up reveal transition from bare to made-up",
            "Slow-motion brush sweep transition between makeup steps",
        ]
    },
    haircare: {
        accessories: [
            { kw: ["หวี", "comb", "brush", "แปรง"], v: "hair brush or wide-tooth comb beside product" },
            { kw: ["ไดร์", "dryer", "blow dry", "เป่า"], v: "hair dryer nearby for styling after treatment" },
            { kw: ["ผ้า", "towel", "ผ้าเช็ด"], v: "microfiber hair towel draped over shoulder" },
        ],
        actions: [
            { kw: ["สระ", "shampoo", "ล้าง", "wash"], a: "Character works shampoo into rich lather, massaging scalp with proper technique" },
            { kw: ["จัดทรง", "style", "เซ็ท", "blow"], a: "Character styling hair with product, using brush and dryer, admiring volume and shine" },
            { kw: ["นุ่ม", "soft", "smooth", "เงา", "shine"], a: "Character runs fingers through silky transformed hair, hair catching light beautifully" },
        ],
        transitions: [
            "Slow-motion hair flip transition revealing transformed shine",
            "Camera arc around presenter showing hair from all angles",
        ]
    },

    // ── Food & Beverage ──
    food: {
        accessories: [
            { kw: ["จาน", "plate", "dish", "เสิร์ฟ"], v: "beautiful ceramic plate with elegant cutlery" },
            { kw: ["ซอส", "sauce", "dip", "น้ำจิ้ม"], v: "dipping sauce in small bowl beside food" },
            { kw: ["เครื่องดื่ม", "drink", "น้ำ"], v: "refreshing drink glass with ice beside food" },
        ],
        actions: [
            { kw: ["กิน", "eat", "ชิม", "taste", "ลอง"], a: "Character takes enthusiastic first bite, chews with genuine delight, flavor enjoyment expression" },
            { kw: ["ปรุง", "cook", "ทำ", "prepare"], a: "Character cooking with confident movements, stirring, seasoning, plating artfully" },
        ],
        transitions: [
            "Appetizing slow-motion close-up with steam rising transition",
            "Overhead-to-eye-level camera sweep showing plated food",
        ]
    },
    beverage: {
        accessories: [
            { kw: ["แก้ว", "glass", "cup", "ถ้วย"], v: "crystal clear glass with ice cubes" },
            { kw: ["น้ำแข็ง", "ice", "เย็น", "cold"], v: "glistening ice cubes in glass catching light" },
            { kw: ["หลอด", "straw"], v: "reusable straw in the glass" },
        ],
        actions: [
            { kw: ["เท", "pour", "ริน"], a: "Character pours beverage into glass, liquid color and carbonation visible" },
            { kw: ["ดื่ม", "drink", "จิบ", "sip"], a: "Character takes refreshing sip, satisfied expression, slight head tilt" },
        ],
        transitions: [
            "Slow-motion pour with droplet splash transition",
            "Condensation droplet sliding down glass into next scene",
        ]
    },
    coffee: {
        accessories: [
            { kw: ["แก้ว", "cup", "mug", "ถ้วย"], v: "artisan ceramic coffee cup on saucer" },
            { kw: ["นม", "milk", "cream", "ครีม"], v: "milk pitcher for latte art nearby" },
            { kw: ["เครื่องบด", "grinder", "grind", "บด"], v: "coffee grinder with whole beans nearby" },
        ],
        actions: [
            { kw: ["ชง", "brew", "ดริป", "drip", "ต้ม"], a: "Character carefully brewing coffee, precise pouring in circular motion, aroma rising" },
            { kw: ["ลาเต้", "latte", "art"], a: "Character pouring steamed milk creating latte art pattern, steady hand technique" },
            { kw: ["จิบ", "sip", "ดื่ม"], a: "Character cups warm mug with both hands, inhales aroma, takes first satisfied sip" },
        ],
        transitions: [
            "Steam-rise dissolve transition between brewing steps",
            "Overhead pour shot transitioning to eye-level tasting",
        ]
    },
    tea: {
        accessories: [
            { kw: ["ถ้วย", "cup", "กา", "teapot", "แก้ว"], v: "ceramic teacup on saucer with teapot nearby" },
            { kw: ["น้ำผึ้ง", "honey", "มะนาว", "lemon"], v: "honey dipper and lemon slice on small plate" },
        ],
        actions: [
            { kw: ["ชง", "steep", "แช่", "brew"], a: "Character places tea bag in cup, pours hot water, watches color develop with peaceful expression" },
            { kw: ["จิบ", "sip", "ดื่ม"], a: "Character cups warm tea, inhales aroma with closed eyes, sips peacefully" },
        ],
        transitions: [
            "Tea color developing dissolve transition with warm tones",
            "Steam-rise peaceful transition between steps",
        ]
    },

    // ── Fashion & Accessories ──
    fashion: {
        accessories: [
            { kw: ["กระเป๋า", "bag", "purse"], v: "stylish bag complementing the outfit" },
            { kw: ["รองเท้า", "shoe", "shoes"], v: "matching footwear completing the look" },
            { kw: ["เครื่องประดับ", "jewelry", "สร้อย", "necklace", "แหวน"], v: "complementary jewelry accenting the outfit" },
            { kw: ["แว่น", "sunglasses", "glasses"], v: "stylish eyewear as fashion accent" },
        ],
        actions: [
            { kw: ["ใส่", "wear", "สวม", "แต่ง"], a: "Character confidently wearing outfit, slow fashion turn, fabric moving naturally" },
            { kw: ["mix", "match", "จับคู่", "แมทช์", "คู่"], a: "Character styling piece with different accessories, showing combinations" },
            { kw: ["เดิน", "walk", "runway", "โชว์"], a: "Character walking toward camera with confident stride, outfit in motion" },
        ],
        transitions: [
            "Elegant slow-motion fabric movement between poses",
            "Quick-cut montage between outfit styling combinations",
            "Smooth camera orbit capturing outfit from all angles",
        ]
    },
    shoe: {
        accessories: [
            { kw: ["เชือก", "lace", "ผูก"], v: "extra laces in different colors beside shoes" },
            { kw: ["ถุงเท้า", "sock", "socks"], v: "matching socks complementing the shoe style" },
            { kw: ["กล่อง", "box", "packaging"], v: "branded shoe box open with tissue paper" },
        ],
        actions: [
            { kw: ["ใส่", "wear", "สวม", "ลอง"], a: "Character slides foot into shoe, laces up or fastens, stands and tests fit" },
            { kw: ["เดิน", "walk", "วิ่ง", "run"], a: "Character walks naturally in shoes, showing comfort and gait, different surfaces" },
        ],
        transitions: [
            "Dynamic step-by-step reveal from unboxing to walking",
            "Low-angle camera following footsteps transition",
        ]
    },
    bag: {
        accessories: [
            { kw: ["กระเป๋าตัง", "wallet", "กระเป๋าสตางค์"], v: "matching wallet tucked into bag compartment" },
            { kw: ["โทรศัพท์", "phone", "มือถือ"], v: "phone being placed into bag pocket" },
        ],
        actions: [
            { kw: ["เปิด", "open", "ซิป", "zip"], a: "Character opens bag zippers, shows organized interior compartments, stores items" },
            { kw: ["สะพาย", "carry", "ถือ", "shoulder"], a: "Character carries bag naturally in multiple ways — shoulder, crossbody, hand carry" },
        ],
        transitions: [
            "Smooth interior-to-exterior transition showing bag organization",
            "Camera follows presenter walking with bag in lifestyle setting",
        ]
    },
    watch: {
        accessories: [
            { kw: ["กล่อง", "box", "case"], v: "premium watch box with velvet cushion" },
            { kw: ["สาย", "strap", "band"], v: "extra watch straps in different materials" },
        ],
        actions: [
            { kw: ["ใส่", "wear", "สวม", "รัด"], a: "Character elegantly straps watch on wrist, adjusts buckle, admires on wrist" },
            { kw: ["เวลา", "time", "ดู"], a: "Character checks time with natural wrist-raise, impressed by dial readability" },
        ],
        transitions: [
            "Macro zoom from watch face details to lifestyle wrist shot",
            "Light catch on crystal creating elegant flare transition",
        ]
    },
    jewelry: {
        accessories: [
            { kw: ["กล่อง", "box", "case"], v: "velvet jewelry box with dramatic spotlight" },
            { kw: ["กระจก", "mirror"], v: "elegant mirror reflecting jewelry sparkle" },
        ],
        actions: [
            { kw: ["ใส่", "wear", "สวม"], a: "Character delicately puts on jewelry, fastens clasp, adjusts position gently" },
            { kw: ["เปล่ง", "sparkle", "shine", "วิบวับ", "ประกาย"], a: "Character tilts jewelry catching light, facets sparkle, admiring expression" },
        ],
        transitions: [
            "Sparkle light dispersion between macro and lifestyle shots",
            "Slow-motion jewelry catch-light with soft bokeh transition",
        ]
    },
    sunglasses: {
        accessories: [
            { kw: ["เคส", "case", "ซอง"], v: "sunglasses case and cleaning cloth beside" },
        ],
        actions: [
            { kw: ["ใส่", "wear", "สวม"], a: "Character puts on sunglasses confidently, pushes up nose bridge, strikes cool pose" },
            { kw: ["แดด", "sun", "outdoor", "กลางแจ้ง"], a: "Character wearing sunglasses outdoors in bright sun, glare-free comfortable vision" },
        ],
        transitions: [
            "Lens reflection transition showing sunny outdoor scene",
            "Dynamic sunglasses put-on reveal with light flare",
        ]
    },

    // ── Health & Wellness ──
    supplement: {
        accessories: [
            { kw: ["น้ำ", "water", "แก้ว"], v: "glass of water beside supplement bottle" },
            { kw: ["ช้อน", "scoop", "ตวง"], v: "measuring scoop with correct dosage" },
            { kw: ["shaker", "เชค"], v: "protein shaker bottle nearby" },
        ],
        actions: [
            { kw: ["กิน", "take", "ทาน"], a: "Character pours supplement into palm, takes with water, confident health routine" },
            { kw: ["ออกกำลัง", "gym", "workout", "ฟิตเนส"], a: "Character in gym context takes supplement as post-workout routine, energized" },
        ],
        transitions: [
            "Dynamic transition from supplement routine to active lifestyle",
            "Energy boost visual transition showing vitality",
        ]
    },
    protein: {
        accessories: [
            { kw: ["shaker", "เชค", "แก้ว", "bottle"], v: "shaker bottle with brand logo visible" },
            { kw: ["น้ำ", "water", "นม", "milk"], v: "water or milk being poured into shaker" },
        ],
        actions: [
            { kw: ["ผสม", "mix", "เชค", "shake"], a: "Character adds scoop to shaker, pours liquid, shakes vigorously, opens to show smooth mix" },
            { kw: ["ดื่ม", "drink", "ทาน"], a: "Character drinks protein shake post-workout, refreshed energized expression" },
        ],
        transitions: [
            "Shaker action slow-motion transition with liquid swirl",
            "Gym workout to recovery drink smooth transition",
        ]
    },
    fitness: {
        accessories: [
            { kw: ["น้ำ", "water", "bottle", "ขวด"], v: "sports water bottle beside equipment" },
            { kw: ["ผ้าเช็ด", "towel", "เหงื่อ", "sweat"], v: "gym towel on presenter's shoulder" },
            { kw: ["ถุงมือ", "gloves", "grip"], v: "weight lifting gloves on presenter's hands" },
            { kw: ["ดัมเบล", "dumbbell", "weight", "น้ำหนัก"], v: "dumbbells stacked neatly nearby" },
        ],
        actions: [
            { kw: ["ยก", "lift", "press", "pull", "เวท"], a: "Character performing exercise with proper form, muscles engaged, controlled breathing" },
            { kw: ["วิ่ง", "run", "cardio"], a: "Character doing cardio, wearing product, demonstrating comfort during movement" },
            { kw: ["ยืด", "stretch", "warm up", "วอร์ม"], a: "Character doing dynamic stretches using equipment for flexibility" },
        ],
        transitions: [
            "Speed ramp from slow-motion form to full-speed power movement",
            "Quick angle cut between exercises showcasing versatility",
        ]
    },

    // ── Home & Kitchen ──
    kitchen: {
        accessories: [
            { kw: ["จาน", "plate", "dish"], v: "serving plate ready for plating" },
            { kw: ["ช้อน", "spoon", "spatula", "ตะหลิว"], v: "cooking utensils beside appliance" },
            { kw: ["วัตถุดิบ", "ingredient", "ผัก", "เนื้อ"], v: "fresh colorful ingredients on cutting board" },
        ],
        actions: [
            { kw: ["ทำ", "cook", "ปรุง", "หุง"], a: "Character actively cooking with appliance, confident movements, steam rising" },
            { kw: ["เสิร์ฟ", "serve", "จัดจาน"], a: "Character beautifully plating food from appliance, garnishing with fresh herbs" },
        ],
        transitions: [
            "Steam-rise dissolve from cooking to plated result",
            "Overhead preparation montage transition",
        ]
    },
    home: {
        accessories: [
            { kw: ["ต้นไม้", "plant", "ดอกไม้", "flower"], v: "decorative plant or flowers accenting the product" },
            { kw: ["เทียน", "candle", "หอม"], v: "scented candle creating cozy ambiance nearby" },
        ],
        actions: [
            { kw: ["จัด", "arrange", "ตกแต่ง", "decorate"], a: "Character arranging product in room, styling with decor items, stepping back admiringly" },
            { kw: ["ใช้", "use", "สบาย", "comfort", "relax"], a: "Character using product comfortably in home, relaxed satisfied lifestyle" },
        ],
        transitions: [
            "Room transformation before/after transition with warm tones",
            "Camera pulls back to reveal styled room with product",
        ]
    },
    "smart-home": {
        accessories: [
            { kw: ["โทรศัพท์", "phone", "app", "แอป"], v: "phone showing smart home control app interface" },
            { kw: ["hub", "bridge", "เราเตอร์"], v: "smart hub device nearby with LED indicator" },
        ],
        screen: [
            { kw: ["แอป", "app", "ควบคุม", "control"], v: "phone screen showing smart home app with device controls and status" },
            { kw: ["ตั้งเวลา", "schedule", "timer", "อัตโนมัติ", "auto"], v: "phone screen showing automation schedule setup" },
        ],
        actions: [
            { kw: ["สั่ง", "voice", "เสียง", "command"], a: "Character speaks voice command, device responds with LED indicator, impressed expression" },
            { kw: ["ควบคุม", "control", "แตะ", "tap"], a: "Character taps phone app, device responds instantly, smart automation in action" },
        ],
        transitions: [
            "LED indicator activation transition between scenes",
            "App tap to device response smooth cross-dissolve",
        ]
    },

    // ── Outdoor & Sports ──
    outdoor: {
        accessories: [
            { kw: ["กระเป๋า", "backpack", "bag", "เป้"], v: "outdoor backpack with gear attached" },
            { kw: ["น้ำ", "water", "bottle"], v: "water bottle in side pocket or hand" },
            { kw: ["แผนที่", "map", "GPS", "compass"], v: "map or GPS device for navigation" },
        ],
        actions: [
            { kw: ["เดิน", "hike", "trek", "เดินป่า"], a: "Character hiking with gear, confident stride through trail, nature scenery" },
            { kw: ["ตั้ง", "setup", "กาง", "pitch"], a: "Character setting up gear outdoors, efficient practiced movements" },
        ],
        transitions: [
            "Wide landscape reveal transition showing outdoor setting",
            "Camera follows adventurer through terrain",
        ]
    },
    camping: {
        accessories: [
            { kw: ["ไฟฉาย", "flashlight", "torch", "headlamp"], v: "headlamp or flashlight on tent floor" },
            { kw: ["เตา", "stove", "ไฟ", "fire"], v: "camp stove with fuel canister ready" },
        ],
        actions: [
            { kw: ["กาง", "pitch", "tent", "เต็นท์"], a: "Character pitches tent with efficient movements, stakes, poles, guy lines" },
            { kw: ["ทำอาหาร", "cook", "กาแฟ", "coffee"], a: "Character cooking on camp stove at campsite, steam rising, outdoor atmosphere" },
        ],
        transitions: [
            "Golden hour light transition between camp setup scenes",
            "Wide campsite to cozy interior tent dissolve",
        ]
    },

    // ── Baby & Pet ──
    baby: {
        accessories: [
            { kw: ["ขวดนม", "bottle", "นม"], v: "baby bottle sterilized and ready" },
            { kw: ["ผ้าอ้อม", "diaper", "ผ้า"], v: "soft cloth or diaper beside baby product" },
        ],
        actions: [
            { kw: ["ใช้", "use", "อาบ", "feed", "ป้อน"], a: "Character gently using baby product with tender parental care, soft movements" },
            { kw: ["ปลอดภัย", "safe", "safety", "BPA"], a: "Character shows safety features, reads certification labels with trusting expression" },
        ],
        transitions: [
            "Warm soft-focus transition with gentle lighting",
            "Tender parental moment dissolve between scenes",
        ]
    },
    pet: {
        accessories: [
            { kw: ["ชาม", "bowl", "dish"], v: "pet food/water bowl beside product" },
            { kw: ["สายจูง", "leash", "collar", "ปลอกคอ"], v: "pet leash or collar displayed alongside" },
        ],
        actions: [
            { kw: ["กิน", "eat", "feed", "ป้อน"], a: "Character prepares food in bowl, pet approaches eagerly, happy feeding moment" },
            { kw: ["เล่น", "play", "fetch", "toy"], a: "Character plays with pet using product, joyful interaction, pet excitement visible" },
        ],
        transitions: [
            "Playful pet interaction transition between scenes",
            "Warm pet-owner bonding moment dissolve",
        ]
    },

    // ── Cleaning ──
    cleaning: {
        accessories: [
            { kw: ["ผ้า", "cloth", "wipe", "เช็ด"], v: "microfiber cloth for wiping surfaces" },
            { kw: ["ถุงมือ", "gloves", "rubber"], v: "rubber gloves for hand protection" },
        ],
        actions: [
            { kw: ["เช็ด", "wipe", "ทำความสะอาด", "clean"], a: "Character sprays and wipes surface, dramatic before/after cleanliness transformation" },
            { kw: ["ฉีด", "spray", "พ่น"], a: "Character sprays product on surface, visible mist, then wipes clean with cloth" },
        ],
        transitions: [
            "Before/after split-moment transformation transition",
            "Sparkle clean reveal transition showing polished result",
        ]
    },

    // ── Auto ──
    auto: {
        accessories: [
            { kw: ["เครื่องมือ", "tool", "ประแจ"], v: "tools for installation on car surface" },
            { kw: ["น้ำยา", "solution", "wax", "polish"], v: "car care solution beside the product" },
        ],
        actions: [
            { kw: ["ติดตั้ง", "install", "ต่อ"], a: "Character installs product on vehicle with steady hands, step-by-step process" },
            { kw: ["ล้าง", "wash", "ขัด", "polish"], a: "Character applies product to car surface, polishes to mirror finish, satisfied with result" },
        ],
        transitions: [
            "Before/after vehicle transformation reveal",
            "Camera orbit around vehicle showing installed product",
        ]
    },
};

// General cinematic flair directives — applied to ALL categories for visual interest
const GENERAL_CINEMATIC_FLAIR: string[] = [
    "Smooth cinematic dolly with shallow depth of field",
    "Dynamic camera push-in with rack focus on product details",
    "Elegant slow-motion moment highlighting product interaction",
    "Fluid camera orbit showing new angle of product and presenter",
    "Speed ramp from slow-motion detail to real-time action",
    "Professional match-cut maintaining visual continuity",
    "Smooth crane shot from product close-up to presenter medium shot",
    "Dramatic pull-back reveal showing full scene composition",
];

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCT PRESENTATION GUIDE — Deep per-category knowledge + per-scene
// visual action directives for professional multi-scene video production.
// Tells the AI EXACTLY how to showcase each product type in each scene.
// Without this, AI defaults to generic "holding product" which produces
// bad results (e.g. showing laptop lid/back instead of open screen).
// ═══════════════════════════════════════════════════════════════════════════
const PRODUCT_PRESENTATION_GUIDE: Partial<Record<ProductCategory, {
    knowledge: string;
    sceneActions: string[];
}>> = {
    // ── Tech & Gadgets ──
    laptop: {
        knowledge: "Laptops MUST be shown with lid OPEN and screen ON in EVERY scene. The screen display is the hero feature. Showing a closed laptop or just the back/lid is WRONG — like showing a TV that's off. SCREEN CONTENT RULE: The laptop screen MUST display content that matches what the presenter is talking about — if discussing gaming performance, the screen MUST show a vivid 3D video game environment with colorful game graphics clearly visible; if discussing video editing, the screen MUST show a professional video editing application interface (like Adobe Premiere Pro or After Effects) with timeline, preview panel, and editing tools visible; if discussing general use, show a bright colorful desktop or productivity apps. The screen content is NOT generic — it MUST visually prove the claim being made. Key features: screen quality, keyboard, trackpad, thin profile, ports, hinge design.",
        sceneActions: [
            "Presenter holds laptop open with BOTH hands, screen facing camera with display glowing vibrant colors. Hero reveal shot — screen is the star.",
            "Presenter typing naturally on keyboard, screen bright and active. Camera shows hands on keyboard and trackpad.",
            "Presenter tilts laptop to show how thin and light it is. Lifts with one hand to demonstrate portability. Screen still OPEN.",
            "Close-up of screen — vibrant glow, sharp display quality. Presenter points at screen, gesturing at features.",
            "Presenter shows side ports (USB, HDMI, etc). Then demonstrates opening/closing the smooth hinge mechanism. Returns to screen-facing view.",
            "Presenter uses laptop naturally at desk — typing, using trackpad, working productively. Professional workspace setting.",
            "Presenter holds laptop at slight angle showing both screen AND keyboard in one frame. Premium build quality visible.",
            "Final beauty shot — presenter proudly displays the open laptop to camera with satisfied expression. Screen bright and colorful.",
            "Presenter demonstrates portability — picks up laptop, walks with it, shows it fits in bag. Thin lightweight emphasis.",
            "Closing shot — presenter at desk with laptop open, working productively. Screen bright and active. Professional lifestyle."
        ]
    },
    phone: {
        knowledge: "Phones MUST show the screen facing camera in most scenes. Screen-on display is essential. SCREEN CONTENT RULE: The phone screen MUST display content that matches what the presenter is talking about — if discussing camera quality, show a captured photo on screen; if discussing speed, show apps launching; if discussing video, show vivid video playback; if discussing gaming, show mobile game graphics on screen. The screen content visually proves the claim. Key features: camera system, screen quality, thin profile, Face ID/unlock, app demos. Show both front screen and camera module but prioritize screen-facing shots.",
        sceneActions: [
            "Presenter holds phone in one hand, screen facing camera with bright glowing display. Premium screen quality visible. Hero product shot.",
            "Presenter demonstrates scrolling and tapping on bright screen. Natural one-handed use with thumb. Smooth responsive touch.",
            "Presenter flips phone to show camera module briefly, then flips back to show bright active screen.",
            "Close-up of screen quality — vibrant colors, smooth responsive display. Presenter swipes naturally on screen.",
            "Presenter shows thin profile from side angle. Touches screen to wake — display lights up brightly.",
            "Presenter uses phone naturally — holds up for photo, taps and swipes. Screen glowing throughout.",
            "Presenter shows phone build quality. Demonstrates comfortable grip and button placement. Screen glowing.",
            "Presenter holds phone up proudly, screen facing camera with satisfied expression. Beauty shot of the display.",
            "Presenter compares screen size to hand, shows comfortable grip and easy one-handed reachability.",
            "Closing lifestyle shot — presenter using phone naturally in daily setting. Screen bright and glowing."
        ]
    },
    tablet: {
        knowledge: "Tablets MUST show screen ON and facing camera. SCREEN CONTENT RULE: The tablet screen MUST display content matching the presenter's dialogue — if discussing drawing, show colorful digital art on screen; if discussing movies, show vivid video playback; if discussing productivity, show document or spreadsheet apps. The screen content visually proves the claim. Key features: large display, stylus/pen support, drawing/note capability, split-screen multitasking. Show both landscape and portrait orientations.",
        sceneActions: [
            "Presenter holds tablet in landscape, screen facing camera with bright vibrant glow. Both hands supporting edges.",
            "Presenter uses stylus or finger to interact with screen naturally. Close-up of smooth touch gestures.",
            "Presenter props tablet on stand/case, shows typing with keyboard attachment. Productive setup.",
            "Close-up of screen — color accuracy, vivid glow, smooth touch response. Presenter swipes naturally.",
            "Presenter holds tablet in portrait mode for reading or browsing. Comfortable one-handed grip visible.",
            "Presenter demonstrates multitasking — taps and swipes between tasks on the large bright display.",
            "Presenter shows thin profile and light weight. Lifts easily with one hand. Premium build quality.",
            "Final shot — presenter enjoying tablet screen with engaged expression. Display is the hero.",
            "Presenter shows tablet in various use cases — desk, lap, hand-held. Versatility demonstration.",
            "Closing lifestyle — presenter enjoying content on tablet in cozy setting. Screen bright and engaging."
        ]
    },
    camera: {
        knowledge: "Cameras must be shown with lens cap OFF and viewfinder/LCD active. Key features: lens system, viewfinder, LCD screen, grip, controls, image quality. Show the photographer's perspective AND the resulting photos.",
        sceneActions: [
            "Presenter holds camera with proper two-hand grip, lens facing slightly outward. Camera body and lens clearly visible.",
            "Presenter looks through viewfinder, frames a shot, half-presses shutter to focus, then captures. Natural shooting motion.",
            "Presenter shows LCD screen glowing, reviews captured shot — impressed expression at quality.",
            "Close-up of lens and camera controls — dial, buttons, settings. Presenter adjusts settings expertly.",
            "Presenter changes angle — shows camera from top/side, demonstrating compact form factor or rugged build.",
            "Presenter reviews photos on LCD, zooming in to show detail and sharpness. Satisfied expression.",
            "Presenter demonstrates lens change or zoom range — smooth mechanical precision.",
            "Presenter shooting in different lighting — shows camera adaptability. Flash or low-light capability.",
            "Presenter holds camera at arm's length for scale, then brings to eye for another shot.",
            "Closing — presenter holding camera with proud smile, lens facing forward. Professional photographer aesthetic."
        ]
    },
    audio: {
        knowledge: "Headphones/earbuds must be shown WORN on ears/in ears for most scenes. Speakers must show active LED/vibration. Key features: sound quality reaction, comfort fit, noise cancellation, controls, case/charging.",
        sceneActions: [
            "Presenter opens charging case, removes earbuds/unfolds headphones. Product reveal with premium packaging visible.",
            "Presenter places earbuds in ears / headphones over ears. Shows comfortable fit. Adjusts for perfect positioning.",
            "Presenter's expression shows enjoying music — slight head bobbing, closed eyes, smile. Sound quality reaction.",
            "Close-up of earbud in ear / headphone on ear — snug fit, premium materials visible. Touch control demonstration.",
            "Presenter demonstrates noise cancellation — covers one ear, shows ambient mode toggle via tap gesture.",
            "Presenter shows pairing with phone — Bluetooth connection demonstrated. Controls volume with touch/button.",
            "Presenter takes out one earbud for conversation, then puts back in — practical daily use scenario.",
            "Presenter shows charging case — LED indicator, magnetic snap closure. Premium build quality.",
            "Presenter wearing headphones during workout/commute — shows secure fit during movement.",
            "Closing — presenter wearing product with satisfied smile, thumbs up. Premium audio lifestyle."
        ]
    },
    gaming: {
        knowledge: "Gaming gear must show IN USE with game context. Controllers held properly, keyboards lit up with RGB, mice on mousepad. Screen with gameplay visible when possible.",
        sceneActions: [
            "Presenter holds gaming controller with proper two-hand grip OR shows keyboard/mouse setup. RGB lighting visible.",
            "Presenter actively playing — focused expression, thumbs on sticks/fingers on keys. Gaming display glowing in background.",
            "Close-up of controller buttons/keyboard switches — satisfying click, responsive feedback. Premium materials.",
            "Presenter shows reaction to game moment — excited, competitive expression. Product enhancing the experience.",
            "Presenter demonstrates special features — customizable buttons, DPI switch, macro keys.",
            "Presenter shows comfort during extended session — ergonomic grip, wrist position, breathable materials.",
            "Presenter connects peripherals — USB, wireless dongle, Bluetooth. Quick setup demonstration.",
            "Presenter shows RGB customization — color changing, effects, breathing patterns.",
            "Presenter in gaming setup context — monitor, chair, desk, full battle station aesthetic.",
            "Closing — presenter with victory pose, product prominently featured. Gaming lifestyle."
        ]
    },
    wearable: {
        knowledge: "Smartwatches/fitness trackers MUST show screen ON with watch face or data visible. Show on wrist in most scenes. Key features: health tracking, notifications, activity tracking, watch faces, band comfort.",
        sceneActions: [
            "Presenter straps wearable on wrist, presses button to wake display. Screen lights up with colorful glow.",
            "Presenter checks wrist naturally — shows watch face with time, health data, or notification on screen.",
            "Close-up of display — colorful health data glowing on screen. Bright clear display quality.",
            "Presenter demonstrates touch screen — swipes and taps smoothly, controls features with natural gestures.",
            "Presenter shows band/strap — comfortable fit, easy to adjust, premium material. Band swap demonstration.",
            "Presenter during exercise — wrist tracking movement, screen showing workout metrics.",
            "Presenter receives notification — glances at wrist naturally, screen glowing with alert. Seamless connectivity.",
            "Presenter shows sleep tracking or health feature — always-on display, gentle glow.",
            "Close-up of charging — magnetic attachment, wireless pad. Quick charge demonstration.",
            "Closing — presenter checking wrist with satisfied smile. Daily lifestyle essential."
        ]
    },
    charger: {
        knowledge: "Chargers/powerbanks must show the CHARGING PROCESS — cable plugged in, LED indicators lit, device being charged. Show charge speed, port types, capacity.",
        sceneActions: [
            "Presenter holds powerbank/charger, shows size compared to hand. Compact portable design. LED indicators visible.",
            "Presenter plugs cable into charger, connects to phone/device. Charging indicator lights up on both devices.",
            "Close-up of ports — USB-C, Lightning, etc. Multiple port options visible. Cable quality demonstration.",
            "Presenter shows fast charging — device charging indicator light glowing. Speed demonstration.",
            "Presenter demonstrates portability — slips into pocket/bag easily. Lightweight yet powerful.",
            "Presenter charges multiple devices simultaneously — shows multi-port capability.",
            "Close-up of LED battery indicator — shows remaining capacity. Premium build quality.",
            "Presenter uses phone while charging — demonstrates pass-through or wireless charging convenience.",
            "Presenter shows safety features — overcharge protection indicator, heat management.",
            "Closing — presenter with fully charged device and charger, ready to go. Essential daily carry."
        ]
    },
    drone: {
        knowledge: "Drones must show UNFOLDED with propellers visible and in-flight footage. Key features: camera gimbal, flight stability, compact folding, controller, aerial perspective.",
        sceneActions: [
            "Presenter unfolds drone arms, propellers extend. Shows full drone from above — camera gimbal visible.",
            "Presenter places drone on flat ground, powers on. LED lights activate, gimbal calibrates.",
            "Presenter holds controller with phone mounted, shows pre-flight screen/app. Confident pilot ready to fly.",
            "Drone takes off — smooth vertical ascent. Presenter watches with amazed expression.",
            "Presenter watches drone fly overhead — amazed expression, points up at drone in sky.",
            "Presenter demonstrates obstacle avoidance or tracking mode via controller. Smart features.",
            "Drone returns to land — precise landing near presenter. Follow-me mode demonstration.",
            "Presenter folds drone back to compact size — pocketable/packable portability.",
            "Presenter holds phone, impressed expression at captured footage — gestures excitedly.",
            "Closing — presenter holding folded drone with sunset/scenic backdrop. Adventure lifestyle."
        ]
    },

    // ── Fashion & Accessories ──
    fashion: {
        knowledge: "Clothing must be shown WORN on body in most scenes. Show fabric texture, fit, movement, styling. Avoid just holding garment flat — it must be shown how it looks when worn and in motion.",
        sceneActions: [
            "Presenter shows garment on hanger or folded — first impression of design, color, fabric quality.",
            "Presenter wearing the garment — full outfit visible. Turns slightly to show fit from front and side.",
            "Close-up of fabric texture, stitching quality, button/zipper hardware. Premium material visible.",
            "Presenter moves naturally in the garment — walks, sits, reaches. Shows comfort and flexibility.",
            "Presenter styles the piece with accessories — shows outfit combination potential.",
            "Presenter shows garment details — collar, cuffs, pockets, lining. Craftsmanship focus.",
            "Presenter adjusts fit — shows size flexibility, elastic, adjustable elements.",
            "Presenter adjusts outfit, checks fit from different angles — smooths fabric, satisfied expression. Try-on moment.",
            "Presenter in lifestyle setting wearing the outfit — cafe, street, office. Context styling.",
            "Closing — presenter confidently posing in complete outfit. Fashion editorial feel."
        ]
    },
    bag: {
        knowledge: "Bags must show BOTH exterior design AND interior organization. Show carrying on body — shoulder, crossbody, or hand. Open compartments to demonstrate functionality. Don't just hold it closed.",
        sceneActions: [
            "Presenter holds bag front-facing to camera — shows full exterior design, logo, hardware. Hero beauty shot.",
            "Presenter opens main compartment — shows interior lining, pockets, organization. Camera peers inside.",
            "Presenter demonstrates putting items inside — phone, wallet, keys, water bottle. Shows capacity and organization.",
            "Presenter carries bag naturally — on shoulder, crossbody, or by handle. Shows strap adjustment.",
            "Close-up of hardware — zipper, buckle, clasp, logo plate. Premium metal finish catching light.",
            "Presenter shows multiple compartments — front pocket, side pocket, hidden pocket. Functional design.",
            "Presenter walks with bag — shows comfortable carry, strap length, how bag moves with body.",
            "Presenter styles bag with outfit — shows versatility as fashion accessory.",
            "Presenter demonstrates closing mechanism — magnetic snap, zipper, drawstring. Secure closure.",
            "Closing — presenter with bag on shoulder, walking confidently. Lifestyle accessory shot."
        ]
    },
    shoe: {
        knowledge: "Shoes must show ON FEET walking/moving in most scenes. Show sole tread, side profile, interior comfort, lacing, and walking demonstration. Don't just hold shoes in hands.",
        sceneActions: [
            "Presenter holds shoe showing side profile — clean lines, material quality, design visible. Hero product shot.",
            "Presenter puts shoe on foot — shows easy entry, lacing up or strap fastening. Natural process.",
            "Presenter stands wearing shoes — full view from front showing both shoes on feet. Fit visible.",
            "Presenter walks naturally — shows comfort, cushion, natural gait. Movement demonstration.",
            "Close-up of sole — tread pattern, cushioning technology, brand logo on outsole.",
            "Presenter shows shoe from multiple angles while wearing — top view, side, back heel.",
            "Presenter demonstrates flexibility — bends shoe to show sole flex, or squeezes to show cushion.",
            "Presenter in lifestyle context wearing shoes — sport, casual, urban. Appropriate activity setting.",
            "Close-up of material quality — leather grain, knit texture, stitching detail. Premium craftsmanship.",
            "Closing — presenter walking confidently in shoes, lifestyle shot. Comfortable stride visible."
        ]
    },
    jewelry: {
        knowledge: "Jewelry must show WORN on body catching light with sparkle/reflection. Show clasp mechanism, gemstone facets, metal polish. Close-ups essential for detail. Don't just lay flat — show on neck, wrist, finger, ear.",
        sceneActions: [
            "Presenter opens jewelry box — reveals piece with dramatic lighting catching sparkle. First impression.",
            "Presenter picks up jewelry with delicate pinch grip — shows craftsmanship detail, size, weight.",
            "Presenter puts on jewelry — clasps necklace, slides on ring, inserts earring, fastens bracelet.",
            "Presenter shows jewelry on body catching light — sparkle and shine visible. Elegant pose.",
            "Extreme close-up — gemstone facets, metalwork detail, hallmark. Macro photography feel.",
            "Presenter moves naturally — jewelry catches light from different angles, creating sparkle flashes.",
            "Presenter shows clasp/closure mechanism — secure, easy to use. Build quality demonstration.",
            "Presenter styles jewelry with outfit — shows how it elevates the overall look.",
            "Presenter admires jewelry on self — touches piece gently, tilts to catch light. Emotional connection.",
            "Closing — presenter with jewelry beautifully displayed on body, elegant confident pose. Luxury feel."
        ]
    },
    watch: {
        knowledge: "Watches MUST show dial/face VISIBLE and readable in most scenes. Show on wrist with face-up angle. Don't show only the strap back or case back. Key features: dial design, bezel, crown, strap, clasp.",
        sceneActions: [
            "Presenter holds watch showing dial face — time visible, indices clear, hands sharp. Hero product shot.",
            "Presenter straps watch on wrist — fastens buckle or clasp. Shows comfortable fit on wrist.",
            "Presenter shows watch on wrist face-up — natural wrist-check gesture. Dial clearly readable.",
            "Close-up of dial — minute markers, subdials, date window, hands. Exquisite craftsmanship detail.",
            "Presenter demonstrates crown operation — sets time, winds mechanism. Mechanical precision.",
            "Presenter shows watch catching light — sapphire crystal reflection, polished case, bezel detail.",
            "Presenter shows strap/bracelet — material quality, links, easy adjustment mechanism.",
            "Presenter checks watch in lifestyle context — business meeting, casual outing. Versatile elegance.",
            "Close-up of case back — exhibition or engraving visible. Premium finishing.",
            "Closing — presenter's wrist prominently showing watch dial, confident professional gesture."
        ]
    },
    sunglasses: {
        knowledge: "Sunglasses must be shown WORN on face in most scenes. Show UV protection in sunlight, frame design, lens quality. Demonstrate folding mechanism and case.",
        sceneActions: [
            "Presenter holds sunglasses open, showing frame design and lens color. Premium quality visible.",
            "Presenter puts on sunglasses — slides onto face naturally. Stylish first impression.",
            "Presenter wearing sunglasses outdoors in sunlight — UV protection demonstrated. Cool confident look.",
            "Close-up of lens — reflections, polarization effect, lens clarity. Premium optics.",
            "Presenter shows frame details — hinge, temple tip, nose pads. Build quality.",
            "Presenter removes and folds sunglasses — smooth hinge mechanism. Places in case.",
            "Presenter wears sunglasses in different settings — driving, beach, city. Versatility.",
            "Presenter shows fit from side profile — frame shape complements face structure.",
            "Presenter pushes sunglasses up/adjusts on nose — comfortable everyday wear.",
            "Closing — presenter confidently wearing sunglasses, walking toward camera. Style statement."
        ]
    },
    hat: {
        knowledge: "Hats must be shown WORN on head. Show fit adjustment, brim angle, material quality. Demonstrate with different hair styles and outfits.",
        sceneActions: [
            "Presenter holds hat showing design, logo, material quality. Front-facing hero shot.",
            "Presenter puts hat on head — adjusts angle and position. Natural styling moment.",
            "Presenter wearing hat — front view showing how it frames the face. Stylish appearance.",
            "Close-up of material, stitching, logo embroidery, brim quality. Craftsmanship detail.",
            "Presenter shows size adjustment — snapback, strap, flex-fit mechanism.",
            "Presenter turns to show hat from side and back angle — profile and rear design.",
            "Presenter styles hat with complete outfit — shows hat as fashion accessory.",
            "Presenter in outdoor setting wearing hat — sun protection, practical use.",
            "Presenter removes hat briefly, runs hand over material, puts back on. Premium feel.",
            "Closing — presenter wearing hat confidently, walking lifestyle shot."
        ]
    },

    // ── Beauty & Personal Care ──
    beauty: {
        knowledge: "Beauty products must show the FULL usage ritual: display packaging → remove cap → apply/spray → show result on skin. Never show spraying with cap on. Show texture, color, finish of the product.",
        sceneActions: [
            "Presenter holds product showing packaging design, bottle shape, branding. Hero beauty shot.",
            "Presenter removes cap/lid — reveals applicator, nozzle, or opening. Satisfying reveal moment.",
            "Presenter applies product — spray on wrist/neck, dab cream, apply makeup. Natural application.",
            "Close-up of product texture — liquid, cream, powder, or mist. Color and consistency visible.",
            "Presenter shows result on skin — dewy finish, color payoff, fragrance enjoyment expression.",
            "Presenter displays bottle/packaging from another angle — side view, back with ingredients.",
            "Presenter demonstrates technique — blending, layering, or proper application method.",
            "Presenter reacts positively — smells wrist, touches skin, admires result in mirror.",
            "Presenter shows before/after or comparison — visible difference from using the product.",
            "Closing — presenter holding product with glowing skin/satisfied expression. Beauty ritual complete."
        ]
    },
    fragrance: {
        knowledge: "Perfume bottle shape and decorative cap are the #1 identity features — they must NEVER morph or change shape. Cap removal must be a VISIBLE HAND ACTION (fingers gripping and lifting), never instant disappearance. Keep camera STABLE — avoid orbit/rotation that causes shape morphing. Key showcase: bottle held at stable angle showing label, natural cap removal with hands, spray mist, wrist/neck application, enjoying scent.",
        sceneActions: [
            "Presenter holds perfume bottle at chest level with STABLE camera angle — label and decorative cap clearly visible, bottle shape consistent.",
            "Presenter uses fingers to GENTLY LIFT decorative cap off bottle (visible hand motion, cap held in other hand or placed nearby) — cap does NOT vanish.",
            "Presenter sprays on wrist from STABLE angle — visible mist in air catching light. One spray. Bottle shape unchanged.",
            "Presenter brings wrist to nose — closes eyes, smiles, enjoys the scent. Bottle remains visible in other hand, same shape.",
            "STABLE close-up of bottle in presenter's hands — label, glass transparency, liquid color visible. No camera orbit or rotation.",
            "Presenter sprays on neck pulse point from STABLE medium shot — bottle shape consistent throughout.",
            "Presenter holds bottle showing decorative cap detail — cap shape IDENTICAL to reference. STABLE angle.",
            "Presenter places bottle on vanity/display at STABLE angle — bottle shape consistent, decorative cap visible.",
            "Presenter picks up cap and places it back on bottle with visible hand motion — complete ritual. STABLE shot.",
            "Closing — presenter holds bottle prominently showing label and cap, confident smile. STABLE medium shot, bottle shape identical to scene start."
        ]
    },
    skincare: {
        knowledge: "Skincare must show APPLICATION on skin — squeeze, pump, spread, massage in. Show clean skin before, product texture close-up, and glowing result after. Key: dispense correctly, apply to face/hand, blend in.",
        sceneActions: [
            "Presenter holds skincare product showing label, packaging design. Clean minimalist beauty shot.",
            "Presenter opens/pumps product — dispenses onto fingertip or palm. Texture visible.",
            "Presenter applies to face/hand — gentle upward motions, natural skincare routine.",
            "Close-up of product texture on skin — serum droplet, cream spread, gel consistency.",
            "Presenter blends product into skin — massage motions, patting technique.",
            "Presenter shows result — dewy hydrated skin, healthy glow. Satisfied expression.",
            "Presenter shows packaging details — points at key areas on the bottle, highlighting quality.",
            "Presenter shows product in bathroom/vanity context — part of skincare routine.",
            "Presenter demonstrates layering — where this product fits in routine order.",
            "Closing — presenter with glowing skin holding product. Skincare goals achieved."
        ]
    },
    makeup: {
        knowledge: "Makeup must show APPLICATION process — open palette/tube, use brush/applicator, apply to face, blend, show final result. Color payoff must be visible. Show precise blending technique.",
        sceneActions: [
            "Presenter shows makeup product closed — packaging design, color, brand. Premium beauty product.",
            "Presenter opens product — twists lipstick up, opens palette, uncaps mascara. Satisfying reveal.",
            "Presenter applies makeup — brush to face, lipstick to lips, mascara to lashes. Technique visible.",
            "Close-up of color payoff — pigment on skin, shimmer, matte finish. True color visible.",
            "Presenter blends/builds — shows layering, blending edges, professional technique.",
            "Presenter admires the finished look — touches cheek, satisfied expression. Transformation visible.",
            "Presenter shows multiple shades/options in palette — variety and versatility.",
            "Presenter shows product compared to skin — swatches on hand for color matching.",
            "Presenter in final full-makeup look — product's contribution to overall beauty.",
            "Closing — presenter with finished makeup look, holding product. Beauty transformation complete."
        ]
    },

    // ── Food & Beverage ──
    food: {
        knowledge: "Food must show UNPACKING → PREPARATION → TASTING ritual. CRITICAL SIZE RULE: Single-serve food packets (instant noodles, snacks, etc.) are SMALL — they fit in ONE hand at convenience-store scale. Do NOT enlarge into multi-pack or family-size. PROP RULE: Every bowl, utensil, or plate must be introduced by the character's visible hand action (placing, picking up) — objects MUST NOT appear out of nowhere. Show food texture, steam, freshness, first bite reaction.",
        sceneActions: [
            "Presenter holds SMALL single-serve food packet in one hand (realistic palm-sized scale, NOT enlarged) — shows brand label, design clearly to camera.",
            "Presenter tears open SMALL packet with both hands — food contents revealed inside.",
            "Presenter VISIBLY reaches for and places bowl on counter with hand, then pours food from packet into bowl. Preparation visible step by step.",
            "Close-up of prepared food in bowl — texture, color, steam rising, noodles/food glistening. Macro food shot. SMALL packet visible beside bowl (IDENTICAL brand).",
            "Presenter picks up utensils (chopsticks/fork) with VISIBLE hand motion, takes first bite — genuine reaction, chewing, eyes widen with delight.",
            "Presenter describes flavor — gestures, nods, points at food in bowl. Enthusiastic review. SMALL packet brand visible.",
            "Presenter shows food from another angle — stirs with utensils, shows rich broth/sauce/ingredients. Steam rising.",
            "Presenter takes another enthusiastic bite — can't stop eating, reaches for more with utensils.",
            "Presenter holds SMALL packet next to prepared bowl — shows how much food came from this small packet. Impressed at value.",
            "Closing — presenter with prepared food in bowl, SMALL packet prominently visible beside it (IDENTICAL brand/design as opening). Satisfied smile, thumbs up."
        ]
    },
    beverage: {
        knowledge: "Beverages must show OPENING → POURING → DRINKING ritual. Show condensation, liquid color, pour dynamics, carbonation. Don't just hold a closed bottle — open and pour/drink it.",
        sceneActions: [
            "Presenter holds cold beverage — condensation droplets visible. Refreshing first impression.",
            "Presenter opens bottle/can — twist cap, pull tab, pop top. Satisfying opening sound implied.",
            "Presenter pours into glass — liquid color, carbonation fizz, pour height visible. Dynamic pour.",
            "Close-up of glass — ice cubes, bubbles rising, rich color. Thirst-inducing macro shot.",
            "Presenter takes first sip — refreshing reaction, satisfied expression. Genuine enjoyment.",
            "Presenter shows label/ingredients — turns bottle to show branding and nutritional info.",
            "Presenter in context setting — outdoor heat, after exercise, social gathering. Need for beverage.",
            "Presenter offers to camera — as if sharing with viewer. Social recommendation gesture.",
            "Presenter finishes drink — shows satisfaction, maybe second pour.",
            "Closing — presenter holding drink with refreshed happy expression. Recommendation."
        ]
    },
    coffee: {
        knowledge: "Coffee must show BREWING process — beans, grinding, brewing, pouring, sipping. Show crema, steam, aroma enjoyment. The ritual IS the content.",
        sceneActions: [
            "Presenter shows coffee package — beans or ground visible through window. Origin/brand shown.",
            "Presenter opens bag — aroma reaction, shows beans/grounds close-up. Deep inhale.",
            "Presenter brews — grinding beans, filling filter, operating machine. Brewing ritual.",
            "Close-up of coffee pouring — crema forming, steam rising, rich dark color. Sensory shot.",
            "Presenter cups mug with both hands — inhales aroma, eyes closed, blissful expression.",
            "Presenter takes first sip — taste reaction, nods appreciatively. Flavor enjoyment.",
            "Presenter shows coffee from above — latte art or crema pattern visible in cup.",
            "Presenter adds milk/sugar (optional) — shows customization, stirs gently.",
            "Presenter in morning routine context — kitchen or cafe, newspaper, sunlight.",
            "Closing — presenter with coffee mug, warm satisfied morning smile. Daily ritual essential."
        ]
    },

    // ── Health & Wellness ──
    supplement: {
        knowledge: "Supplements must show OPENING bottle → DISPENSING dose → TAKING with water. Show capsule/tablet close-up, dosage, and health-conscious lifestyle context.",
        sceneActions: [
            "Presenter holds supplement bottle showing label — health claims, brand, ingredients visible.",
            "Presenter opens cap — childproof twist, shows proper opening technique.",
            "Presenter shakes out dosage into palm — correct number of capsules/tablets visible.",
            "Close-up of capsules/tablets in hand — size, color, quality visible. Clean presentation.",
            "Presenter takes supplement with glass of water — natural swallowing motion.",
            "Presenter shows ingredient list — points to key active ingredients on label.",
            "Presenter in healthy lifestyle context — gym, morning routine, healthy meal alongside.",
            "Presenter shows results/energy — active, vibrant expression after daily use.",
            "Presenter compares bottle size to hand — shows supply duration, value.",
            "Closing — presenter with bottle and healthy smile. Wellness lifestyle recommendation."
        ]
    },

    // ── Home & Kitchen ──
    home: {
        knowledge: "Home products must show IN CONTEXT — placed in the home setting they belong to. Show functionality, sizing, integration with existing decor. Don't just hold items — show them in use in a room.",
        sceneActions: [
            "Presenter shows product packaging or product itself — first impression of design and quality.",
            "Presenter places/installs product in home setting — shelf, wall, table. Natural positioning.",
            "Presenter demonstrates primary function — how product works, what it does.",
            "Close-up of material quality — finish, texture, build quality. Premium detail.",
            "Presenter shows product integrated with existing room decor — stylistic harmony.",
            "Presenter interacts with product daily-use way — adjusting, cleaning, operating.",
            "Presenter shows size/scale in room context — proportions, space efficiency.",
            "Presenter shows multiple use cases or positions — versatility demonstration.",
            "Presenter steps back to show full room with product — lifestyle context.",
            "Closing — presenter gesturing at product in beautiful home setting. Home upgrade feel."
        ]
    },
    kitchen: {
        knowledge: "Kitchen products must show COOKING process — prep, cook, serve. Show the tool in action making food. Steam, sizzle, fresh ingredients. The product enables delicious results.",
        sceneActions: [
            "Presenter shows kitchen product — utensil, appliance, or tool. Design and build quality.",
            "Presenter begins food prep using the product — chopping, mixing, measuring.",
            "Presenter uses product during cooking — stirring, flipping, temperature control.",
            "Close-up of product in action — food sizzling, steam rising, precise control.",
            "Presenter shows result — perfectly cooked food made possible by the product.",
            "Presenter demonstrates cleaning/maintenance — easy to clean, dishwasher-safe.",
            "Presenter shows product features — adjustable settings, safety mechanisms.",
            "Presenter plates food from cooking — beautiful plated result from the cooking process.",
            "Presenter tastes the cooked result — satisfied expression. Product delivered.",
            "Closing — presenter with product and beautifully plated food. Kitchen essential."
        ]
    },

    // ── Fitness ──
    fitness: {
        knowledge: "Fitness gear must be shown IN USE during exercise. Show proper form, muscle engagement, sweat, effort. Don't just hold equipment — demonstrate workout movements with correct technique.",
        sceneActions: [
            "Presenter holds fitness equipment showing design, build quality, features. Gym setting.",
            "Presenter demonstrates proper grip/setup — correct form and positioning.",
            "Presenter performs exercise with equipment — full range of motion, controlled movement.",
            "Close-up of grip, material, adjustment mechanism during use. Quality under stress.",
            "Presenter shows effort — slight sweat, focused expression, muscles engaged.",
            "Presenter demonstrates alternate exercise — versatility of the equipment.",
            "Presenter adjusts settings — weight, resistance, difficulty. Customization.",
            "Presenter shows durability — equipment handling intense use without issue.",
            "Presenter in post-workout — satisfied, accomplished expression. Product delivered results.",
            "Closing — presenter with equipment in gym, athletic confident pose. Fitness lifestyle."
        ]
    },

    // ── Baby & Pet ──
    baby: {
        knowledge: "Baby products must show GENTLE safe handling and age-appropriate use. Demonstrate safety features, soft materials, BPA-free quality. Show parent's care and baby's comfort.",
        sceneActions: [
            "Presenter shows baby product packaging — safety certifications, age recommendation visible.",
            "Presenter opens package carefully — reveals soft, safe product. Gentle handling.",
            "Presenter demonstrates product features — safety locks, soft edges, easy grip.",
            "Close-up of material quality — smooth, BPA-free, soft-touch surface. Safe for baby.",
            "Presenter shows product in use context — feeding, bathing, playing appropriately.",
            "Presenter demonstrates ease of cleaning — dishwasher-safe, easy-wipe, sterilizable.",
            "Presenter shows size/ergonomics — fits small hands, parent-friendly design.",
            "Presenter expresses trust in product — reads safety labels, satisfied with quality.",
            "Presenter shows complete set/accessories — everything included for use.",
            "Closing — presenter holding baby product with warm parental smile. Safe choice."
        ]
    },
    pet: {
        knowledge: "Pet products must show WITH the pet whenever possible. Show pet's reaction, enjoyment, interaction. Demonstrate portion sizes for food, durability for toys.",
        sceneActions: [
            "Presenter shows pet product — packaging, design, brand. Pet curious in background.",
            "Presenter opens product — shows contents enthusiastically, demonstrates appeal and quality.",
            "Presenter prepares product for use — pours food in bowl, demonstrates toy, shows treats in hand.",
            "Close-up of product ready to serve — food in bowl, toy displayed, treat presented appealingly.",
            "Presenter shows product quality — ingredient label, durable construction.",
            "Presenter demonstrates product features — shows how to use for bonding and play activities.",
            "Presenter shows portion/usage guidance — correct amount for pet size.",
            "Presenter shows excitement about product quality — enthusiastic recommendation gesture.",
            "Presenter stores/organizes product — proper food storage, toy basket.",
            "Closing — presenter with happy pet and product. Pet parent recommendation."
        ]
    },

    // ── Craft & Stationery ──
    book: {
        knowledge: "Books must be shown OPEN with pages visible in reading scenes. Show cover design, spine, page quality. Demonstrate actually reading — flipping pages, engaged expression.",
        sceneActions: [
            "Presenter holds book showing front cover design — title, author, artwork clearly visible.",
            "Presenter opens book — flips through pages showing paper quality, layout.",
            "Presenter reads book — engaged expression, turning pages naturally.",
            "Close-up of interior pages — typography, illustrations, print quality.",
            "Presenter shows back cover — synopsis, reviews, ISBN. Complete package.",
            "Presenter reads specific passage — absorbed in content, genuine interest.",
            "Presenter shows book in reading context — cozy chair, cafe, bed. Lifestyle reading.",
            "Presenter marks favorite page — bookmark, tab, or fold corner (gentle).",
            "Presenter holds book open to recommend — sharing enthusiasm for content.",
            "Closing — presenter with book in cozy reading setting. Must-read recommendation."
        ]
    },
    stationery: {
        knowledge: "Writing instruments must show WRITING on paper — ink flow, line quality, smooth gliding. Show cap removal, grip comfort, and the actual mark/writing produced.",
        sceneActions: [
            "Presenter holds pen/pencil showing design, barrel, clip. Premium writing instrument.",
            "Presenter removes cap or clicks mechanism — ready to write. Satisfying action.",
            "Presenter writes on paper — smooth ink flow, beautiful handwriting visible.",
            "Close-up of nib/tip on paper — ink line quality, smoothness, precision.",
            "Presenter shows grip comfort — proper writing position, ergonomic barrel.",
            "Presenter writes different styles — notes, signatures, drawings. Versatility.",
            "Presenter shows color — ink shade, consistency, vibrancy on paper.",
            "Presenter in workspace context — desk, notebook, organized stationery setup.",
            "Presenter caps pen or retracts — satisfying closure mechanism.",
            "Closing — presenter with writing instrument and beautifully written page. Quality tool."
        ]
    },

    // ── Cleaning ──
    cleaning: {
        knowledge: "Cleaning products must show BEFORE → DURING → AFTER cleaning. Show dirty surface, product application, wiping/scrubbing, and sparkling clean result. The transformation is the content.",
        sceneActions: [
            "Presenter shows cleaning product — spray bottle, liquid, or tool. Design and brand.",
            "Presenter shows dirty/messy surface that needs cleaning — realistic before state.",
            "Presenter opens/prepares product — flip nozzle, squeeze, dilute. Ready to clean.",
            "Presenter sprays/applies product to surface — visible application.",
            "Presenter wipes/scrubs — cleaning action with cloth or tool. Effort visible.",
            "Close-up of surface transformation — dirt dissolving, stain lifting, grease cutting.",
            "Presenter shows clean result — sparkling surface compared to before. Dramatic difference.",
            "Presenter shows product efficiency — how little product needed for great results.",
            "Presenter shows safety/eco-friendly — ingredients, certifications, gentle on surfaces.",
            "Closing — presenter with product and sparkling clean background. Effective solution."
        ]
    },

    // ── Outdoor & Sports ──
    outdoor: {
        knowledge: "Outdoor gear must be shown IN NATURE — camping, hiking, traveling. Show setup, weather resistance, durability in outdoor conditions. Don't just hold gear indoors.",
        sceneActions: [
            "Presenter shows outdoor gear/product — design, portability, packed state.",
            "Presenter unpacks/sets up in outdoor setting — tent, gear, equipment deployment.",
            "Presenter uses product in nature — demonstrates function in actual outdoor conditions.",
            "Close-up of durability features — waterproof zippers, reinforced stitching, buckles.",
            "Presenter shows weather resistance — product handling wind, sun, or rain.",
            "Presenter demonstrates versatility — multiple uses or configurations.",
            "Presenter shows portability — packing back up, compact size, lightweight carry.",
            "Presenter in full outdoor adventure context — trail, campsite, summit.",
            "Presenter shows comfort during extended outdoor use — breathable, adjustable.",
            "Closing — presenter with gear in stunning natural landscape. Adventure ready."
        ]
    },

    // ── Auto ──
    auto: {
        knowledge: "Auto products must show ON/IN vehicle. Show installation process, before/after difference, compatibility with car. Don't just hold auto accessories in hand indoors.",
        sceneActions: [
            "Presenter shows auto product — packaging, design, compatibility info.",
            "Presenter approaches vehicle — shows where product will be installed/used.",
            "Presenter installs product — mounting, connecting, applying. Step-by-step process.",
            "Close-up of installed product — secure fit, clean integration with vehicle.",
            "Presenter demonstrates function — product working as intended on vehicle.",
            "Presenter shows before/after — improvement visible after installation.",
            "Presenter tests product — driving, using controls, showing features work.",
            "Presenter shows build quality — durable materials, weather resistance.",
            "Presenter shows convenience — easy to use daily, quick access.",
            "Closing — presenter with vehicle and installed product. Upgrade complete."
        ]
    },

    // ── Food & Beverage (sub-categories) ──
    snack: {
        knowledge: "Snacks must show OPENING package → EATING → REACTION. Show crispy texture, seasoning, sharing format. Don't just hold sealed bag.",
        sceneActions: [
            "Presenter shows snack package — brand, flavor, appetizing photo. Sealed fresh.",
            "Presenter tears open package — satisfying opening, snack visible inside.",
            "Presenter reaches in, picks up piece — shows size, texture, seasoning coating.",
            "Close-up of snack — crispy texture, seasoning detail, crunch appeal.",
            "Presenter takes first bite — crunchy reaction, flavor enjoyment, genuine delight.",
            "Presenter shows handful — portion size, variety of shapes and pieces.",
            "Presenter gestures snack toward camera — recommending to viewer, fun enthusiastic vibe.",
            "Presenter reads flavor info — points at ingredients, flavor description on bag.",
            "Presenter shows bag size — value, resealable feature if applicable.",
            "Closing — presenter munching happily, holding bag. Irresistible snack recommendation."
        ]
    },
    bakery: {
        knowledge: "Bakery items must show FRESH texture — flaky layers, soft crumb, golden crust, steam if warm. Show cross-section to reveal interior.",
        sceneActions: [
            "Presenter shows bakery item — beautiful golden exterior, packaging if boxed.",
            "Presenter unwraps or opens box — reveals fresh baked goods. Warm steam rises.",
            "Presenter breaks bread or pastry in half — shows fluffy interior, layers, filling.",
            "Close-up of texture — flaky crust, soft crumb, melted butter, cream filling.",
            "Presenter takes first bite — soft texture, flavor reaction, closes eyes savoring.",
            "Presenter shows variety — multiple flavors or types in the set.",
            "Presenter adds topping or spread — butter, jam, cream. Enhancement ritual.",
            "Presenter pairs with coffee or tea — perfect combination lifestyle shot.",
            "Presenter shows freshness — still warm, aromatic, just-baked appeal.",
            "Closing — presenter enjoying pastry with warm beverage. Bakery heaven."
        ]
    },
    tea: {
        knowledge: "Tea must show STEEPING ritual — boil water, steep leaves or bag, watch color develop, sip. Aroma and color change are key visual elements.",
        sceneActions: [
            "Presenter shows tea packaging — variety, origin, blend description visible.",
            "Presenter opens package — reveals tea bags or loose leaves. Aroma reaction.",
            "Presenter places tea in cup or teapot — bag dipped or leaves in infuser.",
            "Presenter pours hot water over tea — steam rises, first color appears.",
            "Close-up of steeping — tea color developing beautifully in clear cup.",
            "Presenter waits patiently — shows steeping time, calm ritual moment.",
            "Presenter removes bag or infuser — perfect amber or green color achieved.",
            "Presenter cups warm mug — inhales aroma, first gentle sip. Peaceful expression.",
            "Presenter adds honey or milk optional — shows customization, stirs gently.",
            "Closing — presenter in cozy setting with tea, serene satisfied smile."
        ]
    },
    alcohol: {
        knowledge: "Alcohol must show PROPER POUR and GLASS selection. Show bottle label, cork or cap removal, measured pour into correct glassware, color, aroma, tasting.",
        sceneActions: [
            "Presenter shows bottle — label, vintage, brand clearly visible. Premium presentation.",
            "Presenter opens — removes cork, twists cap, or cracks seal. Satisfying opening.",
            "Presenter pours into correct glass — wine glass, tumbler, flute. Controlled pour.",
            "Close-up of liquid — color, clarity, legs on glass, bubbles. Beautiful pour.",
            "Presenter swirls glass gently — shows color depth, body, viscosity.",
            "Presenter inhales aroma — nose over glass, eyes close, appreciating bouquet.",
            "Presenter takes measured sip — tasting expression, savoring flavor notes.",
            "Presenter shows food pairing — cheese, charcuterie, or meal alongside.",
            "Presenter examines label closely — origin, age, tasting notes on back.",
            "Closing — presenter raises glass in toast gesture, sophisticated ambiance."
        ]
    },
    organic: {
        knowledge: "Organic products must show NATURAL purity — clean ingredients, eco packaging, certification labels, farm-fresh feel. Emphasize sustainable choices.",
        sceneActions: [
            "Presenter shows organic product — eco packaging, certification logos visible.",
            "Presenter opens package — reveals natural unprocessed product. Fresh and clean.",
            "Presenter reads ingredients — points to organic certification, simple ingredient list.",
            "Close-up of product — natural colors, no artificial additives visible.",
            "Presenter prepares or uses product — washes produce, mixes ingredients naturally.",
            "Presenter shows eco-friendly packaging — recyclable, biodegradable, minimal waste.",
            "Presenter compares to regular version — cleaner, more natural, fewer additives.",
            "Presenter in healthy kitchen — fresh produce, natural light, wholesome setting.",
            "Presenter shows farm or origin story — sustainability, ethical sourcing on label.",
            "Closing — presenter with organic product in healthy lifestyle setting. Clean living."
        ]
    },
    "frozen-food": {
        knowledge: "Frozen food must show FROZEN → COOK → SERVE transformation. Show frost on package, cooking process, and steaming hot final result.",
        sceneActions: [
            "Presenter shows frozen package from freezer — frost visible, appetizing photo on box.",
            "Presenter reads cooking instructions — time, temperature, method on packaging.",
            "Presenter removes from packaging — shows frozen food items arranged for cooking.",
            "Presenter cooks — places in microwave, oven, or pan. Timer set, heat applied.",
            "Close-up during cooking — frost melting, steam starting, sizzling implied.",
            "Presenter checks doneness — opens oven or microwave, steam billows out.",
            "Presenter plates hot food — steaming, golden, appetizing. Complete transformation.",
            "Presenter takes first bite — surprised by quality from frozen. Delicious reaction.",
            "Presenter shows convenience — entire process took just minutes. Quick and easy.",
            "Closing — presenter with perfectly cooked meal. Frozen food elevated."
        ]
    },
    condiment: {
        knowledge: "Condiments must show APPLICATION on food. Open cap, pour or squeeze onto dish, show flavor enhancement. The before and after on food is the key visual.",
        sceneActions: [
            "Presenter shows condiment bottle or jar — label, flavor, brand clearly visible.",
            "Presenter opens cap or lid — flip top, unscrew, or peel seal. Ready to use.",
            "Presenter drizzles or squeezes onto food — controlled stream, appetizing application.",
            "Close-up of condiment on food — sauce pooling, texture, color contrast with dish.",
            "Presenter mixes condiment into food — even distribution, enhanced appearance.",
            "Presenter tastes food with condiment — flavor reaction, nods approvingly.",
            "Presenter shows versatility — uses on different dishes, multiple applications.",
            "Presenter shows ingredients and quality — natural, premium, special recipe on label.",
            "Presenter compares food before and after condiment — dramatic flavor upgrade.",
            "Closing — presenter with condiment and delicious dish. Essential flavor enhancer."
        ]
    },

    // ── Beauty & Personal Care (sub-categories) ──
    haircare: {
        knowledge: "Haircare must show APPLICATION in hair — lather, rinse, condition, style. Show wet hair for shampoo, dry hair for styling. Before and after hair texture is key.",
        sceneActions: [
            "Presenter shows haircare product — bottle design, key ingredients on label.",
            "Presenter opens cap or pump — dispenses product into palm. Texture visible.",
            "Presenter applies to hair — works shampoo into lather, or spreads serum through strands.",
            "Close-up of hair with product — lather foam, serum coating strands, treatment absorption.",
            "Presenter massages scalp or distributes through hair — proper technique shown.",
            "Presenter rinses or styles — water flowing through hair, or blow-dry and styling.",
            "Presenter shows hair result — shiny, smooth, voluminous, healthy-looking after treatment.",
            "Presenter runs fingers through transformed hair — silky, touchable, bouncy.",
            "Presenter shows product amount needed — demonstrates correct dosage for hair length.",
            "Closing — presenter with beautiful hair, holding product. Hair goals achieved."
        ]
    },
    sunscreen: {
        knowledge: "Sunscreen must show APPLICATION outdoors — squeeze onto fingers, dot on face or body, spread evenly, show outdoor sun context. SPF label must be visible.",
        sceneActions: [
            "Presenter shows sunscreen — SPF rating, brand, tube or bottle clearly visible.",
            "Presenter opens cap — squeezes onto fingertips. White or clear texture visible.",
            "Presenter dots sunscreen on face — forehead, cheeks, nose, chin. Five-dot method.",
            "Presenter spreads evenly — gentle circular motions, blending into skin.",
            "Close-up of application — smooth texture, no white cast, absorbed into skin.",
            "Presenter shows result — skin protected, dewy or matte finish as product type.",
            "Presenter in outdoor sun — demonstrates product in actual sun exposure context.",
            "Presenter shows water resistance — splash or sweat, product stays on skin.",
            "Presenter reapplies after time — shows proper reapplication routine.",
            "Closing — presenter outdoors in sun with protected glowing skin. Sun-safe lifestyle."
        ]
    },
    nail: {
        knowledge: "Nail products must show APPLICATION on nails — brush strokes, color building, precision work. Show steady hand technique, color payoff, glossy finish.",
        sceneActions: [
            "Presenter shows nail polish bottle — color visible through glass, cap design.",
            "Presenter unscrews cap — pulls out brush loaded with color. First look at shade.",
            "Presenter applies first stroke on nail — from base to tip, steady hand technique.",
            "Close-up of nail being painted — smooth application, even color coverage.",
            "Presenter shows second coat — building color depth and opacity.",
            "Presenter displays painted nails — fanned fingers showing color on all nails.",
            "Presenter shows color accuracy — matches expectation, true to bottle shade.",
            "Presenter demonstrates durability — taps nails, shows chip-resistant finish.",
            "Presenter shows nail in different lighting — color shift, shimmer, glossy shine.",
            "Closing — presenter with beautifully painted nails, elegant hand pose. Salon quality."
        ]
    },
    soap: {
        knowledge: "Soap must show LATHER and FOAM. Wet hands or body, rub soap, build rich lather, show bubbles and foam. Show clean refreshed result after rinsing.",
        sceneActions: [
            "Presenter shows soap — bar or bottle, packaging design, scent description.",
            "Presenter wets hands or unwraps bar — prepares for use under running water.",
            "Presenter lathers — rubs bar between palms or pumps liquid soap. Foam building.",
            "Close-up of lather — rich foam, bubbles, creamy texture on hands.",
            "Presenter washes thoroughly — between fingers, wrists, proper hand hygiene.",
            "Presenter rinses — water cascading over hands, soap washing away cleanly.",
            "Presenter shows clean result — fresh, moisturized hands after washing.",
            "Presenter smells hands — enjoys lingering scent. Satisfied with freshness.",
            "Presenter shows moisturizing effect — no dry skin, soft smooth hands.",
            "Closing — presenter with clean hands and soap product. Daily hygiene essential."
        ]
    },
    dental: {
        knowledge: "Dental products must show PROPER TECHNIQUE — squeeze toothpaste onto brush, brush in correct motions, or pour mouthwash into cap. Show clean teeth result.",
        sceneActions: [
            "Presenter shows dental product — toothpaste tube, mouthwash bottle, or toothbrush.",
            "Presenter opens and prepares — squeezes paste onto brush, or pours mouthwash.",
            "Presenter uses product — demonstrates brushing motion near mouth, or pours mouthwash into cap.",
            "Close-up of product in hand — toothpaste on brush, mouthwash in cap, floss ready. Clean preparation.",
            "Presenter finishes routine — wipes mouth, fresh minty expression, clean and refreshed.",
            "Presenter shows bright smile — clean white teeth result. Fresh and confident.",
            "Presenter reads product features — fluoride, whitening, sensitivity protection.",
            "Presenter demonstrates daily routine — morning or evening dental care ritual.",
            "Presenter shows product longevity — tube or bottle will last, good value.",
            "Closing — presenter with bright confident smile holding product. Oral care essential."
        ]
    },
    barbershop: {
        knowledge: "Barbershop products must show GROOMING ritual — apply cream, shave with direction, use clippers with guard, style with product. Show masculine grooming precision.",
        sceneActions: [
            "Presenter shows grooming product — clipper, razor, cream, or styling product.",
            "Presenter prepares — turns on clipper, attaches guard, or lathers shaving cream.",
            "Presenter applies — shaving cream on face, or positions clipper at hairline.",
            "Presenter grooms — shaving with grain, clipping with steady hand, styling hair.",
            "Close-up of technique — clean razor strokes, precise clipper lines, product application.",
            "Presenter shows result — clean shave, fresh hairline, styled hair.",
            "Presenter applies aftershave or styling product — finishing touch.",
            "Presenter touches smooth skin, runs hand over styled hair — satisfied with groomed result.",
            "Presenter shows tool quality — blade sharpness, clipper power, product premium feel.",
            "Closing — presenter looking sharp and groomed. Professional barbershop results at home."
        ]
    },

    // ── Health & Wellness (sub-categories) ──
    health: {
        knowledge: "Health devices must show MEASUREMENT process — power on device, position correctly on body, wait for reading, display result. Show clear digital readout.",
        sceneActions: [
            "Presenter shows health device — thermometer, blood pressure monitor, oximeter.",
            "Presenter powers on device — press button, screen lights up. Ready to use.",
            "Presenter positions device — on arm, in ear, on finger. Correct placement shown.",
            "Device measuring — wait indicator, processing animation on screen.",
            "Close-up of display — screen glowing with measurement result, indicator light active.",
            "Presenter checks result on display — nods with understanding, satisfied expression.",
            "Presenter shows ease of use — simple one-button operation, portable design.",
            "Presenter demonstrates storage — memory function, previous readings recall.",
            "Presenter shows device compared to hand — compact, portable size.",
            "Closing — presenter with health device, confident about health monitoring."
        ]
    },
    vitamin: {
        knowledge: "Vitamins must show DAILY ROUTINE — open bottle, take correct dose, swallow with water. Show label with vitamin type and benefits. Health-conscious lifestyle.",
        sceneActions: [
            "Presenter shows vitamin bottle — type (C, D, multi), dosage, brand visible.",
            "Presenter opens childproof cap — press and twist technique shown.",
            "Presenter pours vitamins into palm — correct daily dose, colorful capsules or gummies.",
            "Close-up of vitamins in hand — size, shape, color. Quality visible.",
            "Presenter takes with water — natural swallowing motion. Easy daily routine.",
            "Presenter shows label — key vitamins, daily value percentage, benefits listed.",
            "Presenter in morning routine — vitamins alongside healthy breakfast.",
            "Presenter shows energy and vitality — active, bright expression after daily use.",
            "Presenter shows bottle supply — how many days per bottle, value proposition.",
            "Closing — presenter with vitamin bottle in healthy morning setting. Daily wellness."
        ]
    },
    protein: {
        knowledge: "Protein powder must show MIXING ritual — scoop powder, pour into shaker with liquid, shake vigorously, drink. Show powder texture, mixing action, and post-workout context.",
        sceneActions: [
            "Presenter shows protein tub — flavor, brand, protein amount per serving visible.",
            "Presenter opens tub — reveals powder, uses included scoop to measure dose.",
            "Presenter adds scoop to shaker bottle — powder falling into liquid visible.",
            "Presenter adds water or milk — liquid pouring into shaker over powder.",
            "Presenter shakes vigorously — firm grip on shaker, back and forth 10-15 seconds.",
            "Presenter opens shaker flip-top — smooth mixed shake visible, no clumps.",
            "Presenter drinks protein shake — refreshing post-workout sip, energy refueling.",
            "Close-up of shake consistency — smooth, creamy, well-mixed in glass.",
            "Presenter in gym or post-workout context — fitness lifestyle, muscle recovery.",
            "Closing — presenter with shaker in gym, strong confident fitness lifestyle."
        ]
    },
    "weight-loss": {
        knowledge: "Weight management products must show HEALTHY routine — meal replacement prep, capsule with water, active lifestyle context. Emphasize sustainable healthy approach.",
        sceneActions: [
            "Presenter shows weight management product — packaging, key claims visible.",
            "Presenter opens and prepares — opens sachet, shakes bottle, or opens capsule container.",
            "Presenter uses product — mixes shake, takes capsule with water, applies patch.",
            "Close-up of product — texture, color, quality visible. Clean presentation.",
            "Presenter in active lifestyle — exercise, healthy eating, positive energy.",
            "Presenter shows meal context — product as part of balanced diet plan.",
            "Presenter reads instructions — dosage, timing, how to use effectively.",
            "Presenter shows progress mindset — motivated, disciplined, healthy routine.",
            "Presenter combines with exercise — product plus active lifestyle together.",
            "Closing — presenter with product, healthy active lifestyle. Wellness journey."
        ]
    },
    massage: {
        knowledge: "Massage products must show APPLICATION to muscle areas — apply oil, use tool with pressure, rolling or pressing motions. Show relaxation and tension relief.",
        sceneActions: [
            "Presenter shows massage product — oil bottle, massage gun, roller, or tool.",
            "Presenter prepares — uncaps oil, turns on device, positions tool.",
            "Presenter applies to arm or hand area — demonstrates oil application, positions tool on forearm.",
            "Close-up of technique — gentle pressure applied, rolling motion on arm, product working effectively.",
            "Presenter shows relaxation — tension releasing, shoulders dropping, relief expression.",
            "Presenter demonstrates on arm and hand areas — shows versatility of product on different muscles.",
            "Presenter shows intensity settings — adjustable speed, pressure, or heat levels.",
            "Presenter in relaxation context — dim lighting, calm setting, spa atmosphere.",
            "Presenter shows portability — compact, rechargeable, travel-friendly design.",
            "Closing — presenter relaxed and refreshed with massage product. Tension released."
        ]
    },
    "essential-oil": {
        knowledge: "Essential oils must show DIFFUSING or DILUTING ritual — add drops to diffuser, mix with carrier oil, show mist and aroma. Calming wellness atmosphere.",
        sceneActions: [
            "Presenter shows essential oil bottle — small amber glass, dropper cap, label visible.",
            "Presenter opens dropper — removes cap, squeezes bulb to fill pipette.",
            "Presenter adds drops to diffuser water — 2 to 3 drops falling into tank.",
            "Presenter turns on diffuser — mist begins flowing, soft LED light activates.",
            "Close-up of mist — gentle vapor rising from diffuser, atmospheric and calming.",
            "Presenter inhales deeply — aroma reaching, eyes close, peaceful expression.",
            "Presenter shows dilution with carrier oil — drops into palm, mixes for skin use.",
            "Presenter applies diluted oil to wrists or temples — gentle dabbing motion.",
            "Presenter in calm setting — candles, soft lighting, meditation or yoga space.",
            "Closing — presenter in zen atmosphere with diffuser misting. Aromatherapy wellness."
        ]
    },
    elderly: {
        knowledge: "Elderly products must show EASY usage — large buttons, simple design, comfortable grip. Demonstrate with unhurried gentle movements. Show safety and accessibility.",
        sceneActions: [
            "Presenter shows elderly product — large print, easy-grip design, safety features visible.",
            "Presenter demonstrates easy opening — large tabs, simple twist, accessible packaging.",
            "Presenter uses product — steady unhurried movements, comfortable natural pace.",
            "Close-up of accessibility features — large buttons, clear labels, non-slip grip.",
            "Presenter shows safety mechanisms — locked wheels, sturdy construction, fall prevention.",
            "Presenter demonstrates adjustability — height, grip angle, seat position.",
            "Presenter shows comfort — padded grip, ergonomic shape, lightweight design.",
            "Presenter reads clear instructions — large font, simple steps, visual guides.",
            "Presenter shows independence — product enables self-sufficiency, dignity in daily tasks.",
            "Closing — presenter with product showing ease of use. Quality of life improvement."
        ]
    },
    medicine: {
        knowledge: "Medicine must show CORRECT DOSAGE — read label, measure precisely, take as directed. Show dosage measurement, timing, and proper storage. Safety first.",
        sceneActions: [
            "Presenter shows medicine packaging — drug name, dosage, warnings clearly visible.",
            "Presenter reads label carefully — dosage instructions, active ingredients, warnings.",
            "Presenter opens package — childproof cap twist, blister pack push, or seal peel.",
            "Presenter measures dose — pour into cap, push tablet from blister, use dropper.",
            "Close-up of dosage — correct amount measured, clear and precise.",
            "Presenter takes medicine — with water, at correct time, as label directs.",
            "Presenter shows proper storage — cool dry place, away from sunlight, child-safe.",
            "Presenter checks expiry date — shows awareness of medication safety.",
            "Presenter shows relief or improvement — the medicine helping as intended.",
            "Closing — presenter with medicine stored properly. Responsible health management."
        ]
    },
    "mental-health": {
        knowledge: "Mental health products must show CALM intentional usage — journaling, meditating, aromatherapy. Show quiet setting, mindful practice, emotional wellbeing.",
        sceneActions: [
            "Presenter shows mental health product — journal, meditation tool, or wellness item.",
            "Presenter finds quiet space — sits comfortably, creates calm environment.",
            "Presenter begins practice — opens journal, presses play on meditation, lights candle.",
            "Close-up of engagement — pen on paper, deep breathing, peaceful closed eyes.",
            "Presenter shows mindful interaction — writing thoughts, following guided breathing.",
            "Presenter demonstrates routine — this product as part of daily wellness habit.",
            "Presenter shows emotional shift — tension releasing, peaceful calm settling in.",
            "Presenter in serene environment — natural light, plants, quiet minimalist space.",
            "Presenter reflects — satisfied with practice, feeling centered and grounded.",
            "Closing — presenter in peaceful state with product. Mental wellness ritual."
        ]
    },

    // ── Fashion (sub-categories) ──
    underwear: {
        knowledge: "Underwear must show FABRIC quality, fit, and comfort. Show material close-up, elasticity, tag with size info. Keep presentation tasteful and non-explicit. Focus on comfort and quality.",
        sceneActions: [
            "Presenter shows underwear packaging — brand, size, material info visible.",
            "Presenter removes from package — shows folded item, fabric quality, color.",
            "Presenter holds up item — shows shape, cut, elastic waistband quality.",
            "Close-up of fabric — softness, breathability, stitching quality visible.",
            "Presenter demonstrates elasticity — stretches waistband, shows recovery and flexibility.",
            "Presenter shows tag — material composition, care instructions, size.",
            "Presenter shows multiple colors or styles in the set — variety options.",
            "Presenter folds neatly — shows how compact and organized it stores.",
            "Presenter shows comfort features — seamless edges, tagless design, moisture-wicking.",
            "Closing — presenter with neatly displayed underwear set. Quality comfort essentials."
        ]
    },
    swimwear: {
        knowledge: "Swimwear must show FIT, FABRIC, and WATER context. Show stretch, lining quality, strap adjustability. Pool or beach setting for context.",
        sceneActions: [
            "Presenter shows swimwear — design, color, pattern visible. Fresh from package.",
            "Presenter holds up — shows cut, shape, coverage, back design.",
            "Close-up of fabric — UV protection, chlorine resistance, lining quality.",
            "Presenter demonstrates stretch — elastic recovery, comfortable fit material.",
            "Presenter shows strap adjustment — ties, clips, adjustable features.",
            "Presenter shows lining — double layer, opaque when wet, quality construction.",
            "Presenter displays front and back — complete design view.",
            "Presenter in beach or pool context — appropriate water activity setting.",
            "Presenter shows quick-dry feature — water droplets rolling off fabric.",
            "Closing — presenter with swimwear in sunny beach or pool setting. Summer ready."
        ]
    },
    sportswear: {
        knowledge: "Sportswear must show IN MOTION during exercise. Show moisture-wicking, stretch, ventilation. Don't just hold still — demonstrate active movement and performance.",
        sceneActions: [
            "Presenter shows sportswear item — design, brand, technical features on tag.",
            "Presenter wearing sportswear — shows athletic fit, range of motion ready.",
            "Presenter performs exercise — stretching, squatting, running. Freedom of movement.",
            "Close-up of fabric technology — mesh ventilation, moisture-wicking texture.",
            "Presenter shows sweat management — fabric stays dry, no cling, breathable.",
            "Presenter demonstrates stretch — squats, lunges, full range of motion without restriction.",
            "Presenter shows reflective elements — safety features for outdoor training.",
            "Presenter in gym or outdoor training context — authentic athletic setting.",
            "Presenter shows pocket or storage — phone pocket, key loop, functional design.",
            "Closing — presenter in active athletic pose wearing sportswear. Performance ready."
        ]
    },

    // ── Tech General ──
    gadget: {
        knowledge: "Tech gadgets must show POWER ON and FUNCTION demonstration. Unbox, power on, wait for boot, demonstrate key features step by step. Screen or display must be ON and visible.",
        sceneActions: [
            "Presenter shows gadget — design, packaging, brand. First impression of technology.",
            "Presenter unboxes — reveals device, accessories, manual. Premium unboxing experience.",
            "Presenter powers on — press button, LED lights, screen activates. Boot sequence.",
            "Close-up of device features — buttons, ports, display, build materials.",
            "Presenter demonstrates primary function — the main feature that makes this gadget special.",
            "Presenter shows interface — screen, app, controls. User-friendly interaction.",
            "Presenter shows connectivity — pairs with phone, connects to WiFi, Bluetooth.",
            "Presenter demonstrates secondary features — bonus functions, customization options.",
            "Presenter shows portability or setup — compact design, easy installation.",
            "Closing — presenter with powered-on gadget, satisfied with technology. Smart purchase."
        ]
    },

    // ── Home & Living (sub-categories) ──
    furniture: {
        knowledge: "Furniture must show ASSEMBLY if needed, then IN-ROOM placement. Show build quality, materials, comfort testing. Must be shown in actual room context.",
        sceneActions: [
            "Presenter shows furniture piece or box — design preview, dimensions visible.",
            "Presenter begins assembly — lays out pieces, hardware, follows instructions.",
            "Presenter assembles key steps — attaches legs, tightens bolts, connects panels.",
            "Close-up of material quality — wood grain, metal finish, fabric texture.",
            "Presenter places finished furniture in room — proper positioning, decor integration.",
            "Presenter tests function — sits on chair, opens drawer, adjusts shelf height.",
            "Presenter shows sturdiness — no wobble, solid construction, weight capacity.",
            "Presenter styles with decor — pillows, books, plants on or around furniture.",
            "Presenter shows room transformation — before empty space, now styled with furniture.",
            "Closing — presenter in beautifully furnished room. Home upgrade complete."
        ]
    },
    bedding: {
        knowledge: "Bedding must show ON BED — fitted sheet stretched on mattress, duvet fluffed, pillows arranged. Show fabric softness, thread count quality, layering order.",
        sceneActions: [
            "Presenter shows bedding set — packaging, thread count, fabric type visible.",
            "Presenter removes from package — unfolds, shows fabric drape, color richness.",
            "Presenter makes bed — fitted sheet first, stretches over mattress corners.",
            "Presenter adds flat sheet — smooth layer, tucked at bottom.",
            "Presenter adds duvet or comforter — fluffy, even coverage, inviting.",
            "Close-up of fabric — thread texture, softness, premium weave quality.",
            "Presenter arranges pillows — standard, decorative, proper layering order.",
            "Presenter touches fabric — shows softness, smooth hand feel, comfort appeal.",
            "Presenter shows complete bed — hotel-quality made bed, inviting sleep setting.",
            "Closing — presenter beside beautifully made bed. Luxury sleep upgrade."
        ]
    },
    curtain: {
        knowledge: "Curtains must show HUNG on window with light filtering. Show fabric drape, rod installation, opening and closing mechanism, light control.",
        sceneActions: [
            "Presenter shows curtain fabric — color, texture, pattern, weight quality.",
            "Presenter threads rod through curtain — rod pocket or ring attachment.",
            "Presenter hangs curtain on brackets — mounting above window frame.",
            "Close-up of fabric drape — natural fall, pleats, texture catching light.",
            "Presenter adjusts curtain width — pulls open and closed smoothly.",
            "Presenter shows light filtering — sunlight through sheer, or blackout darkness.",
            "Presenter shows room transformation — window dressed, elegant room upgrade.",
            "Presenter demonstrates easy removal — for washing, maintenance.",
            "Presenter shows curtain from outside — how it looks from exterior view.",
            "Closing — presenter in room with beautifully hung curtains. Window dressing complete."
        ]
    },
    rug: {
        knowledge: "Rugs must show ON FLOOR in room context. Show texture underfoot, pattern, size scale, and how it anchors room furniture.",
        sceneActions: [
            "Presenter shows rolled rug — pattern edge visible, size indication.",
            "Presenter unrolls on floor — pattern reveals beautifully, colors rich.",
            "Presenter positions in room — under table, beside bed, in living area.",
            "Close-up of texture — pile depth, weave pattern, fiber quality visible.",
            "Presenter walks on rug barefoot — shows softness, comfort underfoot.",
            "Presenter shows rug with furniture — anchors seating area, defines space.",
            "Presenter shows non-slip backing — safety, stays in place on floor.",
            "Presenter shows size and scale — proportional to room, good coverage.",
            "Presenter vacuums or spot-cleans — easy maintenance demonstration.",
            "Closing — presenter in room with rug creating warm inviting floor space."
        ]
    },
    "lighting-decor": {
        knowledge: "Lighting must show ON with warm glow. Show assembly, bulb installation, switch operation, brightness adjustment. The light effect on the room is the hero visual.",
        sceneActions: [
            "Presenter shows light fixture — design, shade, base, style visible.",
            "Presenter assembles if needed — attaches shade to base, inserts bulb.",
            "Presenter plugs in and turns on — warm glow activates, room transforms.",
            "Close-up of light quality — warm tone, brightness, shadow patterns.",
            "Presenter shows dimmer or brightness adjustment — sets mood lighting.",
            "Presenter shows light in room context — reading nook, bedside, living area.",
            "Presenter shows different angles — how light disperses, creates ambiance.",
            "Presenter demonstrates switch or remote — easy on and off, smart features.",
            "Presenter shows room before and after lighting — dramatic atmosphere change.",
            "Closing — presenter in beautifully lit room with warm inviting ambiance."
        ]
    },
    storage: {
        knowledge: "Storage must show ORGANIZING items inside. Show compartments, capacity, before and after organization. The transformation from messy to tidy is the content.",
        sceneActions: [
            "Presenter shows storage product — bins, shelves, organizer, closet system.",
            "Presenter shows messy before state — cluttered space that needs organizing.",
            "Presenter assembles or unfolds storage — sets up in target location.",
            "Presenter organizes items inside — folds clothes, stacks items, labels containers.",
            "Close-up of compartments — dividers, pockets, adjustable shelves.",
            "Presenter shows capacity — how much fits inside, maximized space usage.",
            "Presenter shows labeled or categorized items — everything has a place.",
            "Presenter shows before vs after — dramatic tidiness transformation.",
            "Presenter shows easy access — pull out drawer, lift lid, find items quickly.",
            "Closing — presenter with organized space. Storage solution success."
        ]
    },
    mirror: {
        knowledge: "Mirrors must show REFLECTION quality. Show mounting process, clarity, size. The reflection of the room and person in the mirror is the hero visual.",
        sceneActions: [
            "Presenter shows mirror — shape, frame design, size. Carefully handled.",
            "Presenter positions mirror — wall mount, lean against wall, or tabletop placement.",
            "Presenter shows reflection — clear, undistorted, true-color reflection quality.",
            "Close-up of frame — material quality, finish, edge detail.",
            "Presenter checks appearance in mirror — hair, outfit, makeup. Practical use.",
            "Presenter shows mirror reflecting room — makes space look bigger, brighter.",
            "Presenter demonstrates mounting hardware — included hooks, anchors, installation.",
            "Presenter adjusts angle — shows different viewing positions, versatility.",
            "Presenter shows light interaction — reflects natural and artificial light beautifully.",
            "Closing — presenter admiring reflection in beautiful mirror. Room elevated."
        ]
    },
    vase: {
        knowledge: "Vases must show WITH FLOWERS arranged inside. Show vase shape, add water, trim stems, arrange flowers. The complete arrangement is the hero visual.",
        sceneActions: [
            "Presenter shows vase — shape, material, color, craftsmanship detail.",
            "Presenter adds water — fills two-thirds, clear water through glass if transparent.",
            "Presenter trims flower stems — cuts at angle for better water absorption.",
            "Presenter arranges flowers in vase — one by one, creating balanced arrangement.",
            "Close-up of arrangement — colorful blooms, greenery, balanced composition.",
            "Presenter places vase in room — on table, shelf, or entryway. Decor context.",
            "Presenter shows vase from different angles — shape silhouette, proportions.",
            "Presenter adjusts arrangement — tweaks flower positions for perfect display.",
            "Presenter shows vase as standalone decor — beautiful even without flowers.",
            "Closing — presenter with stunning flower arrangement in vase. Room brightened."
        ]
    },
    frame: {
        knowledge: "Frames must show WITH photo or art inside, HUNG on wall. Show inserting photo, closing back, hanging process. The framed image on the wall is the hero visual.",
        sceneActions: [
            "Presenter shows frame — design, material, size, glass clarity.",
            "Presenter opens frame back — removes clips or turns latches.",
            "Presenter inserts photo or art — places carefully, centered in frame.",
            "Presenter secures back — closes clips, ensures photo stays in place.",
            "Close-up of framed image — glass protection, mat border, clean presentation.",
            "Presenter hangs on wall — nail, hook, or adhesive strip mounting.",
            "Presenter levels frame — adjusts until perfectly straight on wall.",
            "Presenter shows gallery arrangement — multiple frames creating wall display.",
            "Presenter steps back to admire — framed art enhancing the wall space.",
            "Closing — presenter with beautifully framed display on wall. Memories preserved."
        ]
    },

    // ── Kitchen Appliances (sub-categories) ──
    "rice-cooker": {
        knowledge: "Rice cookers must show FULL COOKING cycle — measure rice, rinse, add water to line, close lid, select mode, press start, steam release, serve fluffy rice.",
        sceneActions: [
            "Presenter shows rice cooker — design, digital display, included accessories.",
            "Presenter measures rice with cup — correct portions, included measuring cup.",
            "Presenter rinses rice in inner pot — water runs clear, proper technique.",
            "Presenter adds water to line marking — exact water level for perfect rice.",
            "Presenter places pot in cooker, closes lid — secure click, ready to cook.",
            "Presenter selects mode and starts — button press, timer begins, indicator light.",
            "Close-up of cooking progress — steam escaping, indicator changing as rice cooks.",
            "Presenter opens lid — steam rises, perfectly fluffy white rice revealed.",
            "Presenter scoops rice — fluffy, separate grains, perfect texture with paddle.",
            "Closing — presenter serving perfect rice from cooker. Essential kitchen appliance."
        ]
    },
    blender: {
        knowledge: "Blenders must show FULL BLEND cycle — add ingredients in order (liquid first, soft, then hard), secure lid, blend, pour smooth result. Show ingredient transformation.",
        sceneActions: [
            "Presenter shows blender — jar, base, blades, controls, design.",
            "Presenter places jar on base — locks securely with twist or click.",
            "Presenter adds ingredients — liquid first, fruits, ice last. Layering order.",
            "Presenter secures lid — locks center cap, ready to blend.",
            "Presenter selects speed and starts — blending action, ingredients swirling.",
            "Close-up through jar — ingredients breaking down, color mixing, smooth transition.",
            "Presenter stops blending — opens lid, thick smooth consistency achieved.",
            "Presenter pours from jar — smooth stream into glass, vibrant color.",
            "Presenter tastes — smooth, delicious, no chunks. Perfect blend result.",
            "Closing — presenter with smoothie in glass and blender. Healthy blending lifestyle."
        ]
    },
    "air-fryer": {
        knowledge: "Air fryers must show FULL COOK cycle — load food in basket, set temp and time, cook, remove crispy result. Show golden crispy texture without oil.",
        sceneActions: [
            "Presenter shows air fryer — design, basket, digital display, compact size.",
            "Presenter pulls out basket — shows non-stick interior, capacity.",
            "Presenter places food inside — single layer, not overcrowded, proper loading.",
            "Presenter slides basket in — clicks securely into air fryer body.",
            "Presenter sets temperature and time — digital controls, presets available.",
            "Close-up during cooking — timer counting, heat indicator, cooking sounds implied.",
            "Presenter opens to check — golden, crispy food visible. Shakes basket halfway.",
            "Presenter removes finished food — golden crispy exterior, no oil needed.",
            "Presenter tastes — crispy and delicious, healthier than deep-fried.",
            "Closing — presenter with crispy air-fried food. Healthy cooking revolution."
        ]
    },
    vacuum: {
        knowledge: "Vacuums must show CLEANING in action — on carpet, hard floor, corners. Show dust pickup, maneuverability, and clean result. Before and after visible dirt removal.",
        sceneActions: [
            "Presenter shows vacuum — design, attachments, cord or battery, features.",
            "Presenter assembles — attaches handle, hose, nozzle. Ready to clean.",
            "Presenter vacuums carpet — overlapping passes, visible debris pickup.",
            "Close-up of suction — dust and debris disappearing into nozzle. Powerful suction.",
            "Presenter switches to hard floor — smooth gliding, dust captured effectively.",
            "Presenter uses attachments — crevice tool for corners, brush for upholstery.",
            "Presenter shows dustbin — collected dirt visible, easy-empty mechanism.",
            "Presenter demonstrates maneuverability — around furniture, under tables, flexible.",
            "Presenter shows clean result — spotless floor compared to before.",
            "Closing — presenter with vacuum in sparkling clean home. Deep clean achieved."
        ]
    },
    washer: {
        knowledge: "Washers must show FULL WASH cycle — load clothes, add detergent, select cycle, start, show clean fresh result. Don't just show the machine exterior.",
        sceneActions: [
            "Presenter shows washing machine — design, door, control panel, capacity.",
            "Presenter loads clothes into drum — proper amount, not overfilled.",
            "Presenter adds detergent to dispenser — measured amount, correct compartment.",
            "Presenter closes door — secure click or lock indicator.",
            "Presenter selects wash cycle — temperature, spin speed, program on display.",
            "Presenter presses start — machine begins, water filling, drum rotating.",
            "Close-up of cycle progress — timer counting, wash action visible through door.",
            "Presenter opens door after cycle — clean fresh clothes, steam or fresh scent.",
            "Presenter removes clean clothes — holds up fresh, clean garment with satisfaction.",
            "Closing — presenter with fresh laundry from washer. Laundry made easy."
        ]
    },
    fridge: {
        knowledge: "Fridges must show INTERIOR organization — shelves, drawers, door bins with food. Show temperature controls, capacity, and food freshness preservation.",
        sceneActions: [
            "Presenter shows fridge exterior — design, finish, handles, display panel.",
            "Presenter opens door — LED lights illuminate organized interior.",
            "Presenter loads shelves — placing food items, organized by category.",
            "Close-up of features — adjustable shelves, humidity drawer, temperature zones.",
            "Presenter shows door bins — bottles, condiments, eggs neatly organized.",
            "Presenter shows freezer section — frozen items, ice maker, frost-free design.",
            "Presenter adjusts temperature — digital controls, precise degree setting.",
            "Presenter shows capacity — loaded with family groceries, still room to spare.",
            "Presenter shows fresh food after storage — crisp vegetables, cold drinks.",
            "Closing — presenter opening fully stocked organized fridge. Kitchen essential."
        ]
    },
    "air-purifier": {
        knowledge: "Air purifiers must show FILTER installation, power on, air quality indicator changing. Show clean air result via indicator light change from red to blue or green.",
        sceneActions: [
            "Presenter shows air purifier — design, size, air quality indicator display.",
            "Presenter opens filter panel — removes old or installs new HEPA filter.",
            "Presenter inserts filter correctly — checks arrow direction, secures panel.",
            "Presenter powers on — display activates, fan starts, initial air reading.",
            "Close-up of air quality indicator — shows current air quality level and color.",
            "Presenter shows fan speed adjustment — auto mode, manual speed, quiet sleep mode.",
            "Presenter shows air quality improving — indicator changing from poor to good.",
            "Presenter in room context — living room, bedroom, office. Clean air environment.",
            "Presenter shows filter life indicator — replacement reminder, maintenance easy.",
            "Closing — presenter breathing easy in clean air room with purifier running."
        ]
    },
    "water-filter": {
        knowledge: "Water filters must show FILTER installation, water flowing through, and clean filtered result. Show before and after water clarity, taste test.",
        sceneActions: [
            "Presenter shows water filter — pitcher, faucet mount, or under-sink system.",
            "Presenter installs or replaces filter — rinses new cartridge, inserts correctly.",
            "Presenter fills reservoir with tap water — water entering filter section.",
            "Close-up of filtration — water passing through, dripping into clean reservoir.",
            "Presenter pours filtered water — clear, clean water flowing from pitcher or tap.",
            "Presenter drinks filtered water — fresh, clean taste. Satisfied expression.",
            "Presenter shows filter indicator — tracks usage, replacement reminder.",
            "Presenter compares filtered vs tap — clarity difference visible in glasses.",
            "Presenter shows capacity — how much water filtered per fill, daily usage.",
            "Closing — presenter drinking clean filtered water. Pure hydration."
        ]
    },
    "smart-home": {
        knowledge: "Smart home devices must show SETUP and APP CONTROL. Unbox, plug in, pair with app, demonstrate voice or app control. Show the smart automation in action.",
        sceneActions: [
            "Presenter shows smart home device — design, compact form, modern tech aesthetic.",
            "Presenter unboxes and plugs in — connects to power, LED indicator activates.",
            "Presenter holds phone near device — pairing process, connection indicator glowing.",
            "Presenter pairs device — scans QR code or follows pairing wizard in app.",
            "Close-up of device responding — LED indicator confirms connection, smart features active.",
            "Presenter demonstrates voice command — speaks to device, it responds and acts.",
            "Presenter controls device — taps phone, device responds instantly. Smart automation.",
            "Presenter sets up automation — device activates on schedule, LED indicator changes.",
            "Presenter shows integration — works with other smart devices, ecosystem.",
            "Closing — presenter controlling smart home from phone or voice. Future living."
        ]
    },

    // ── Auto & Transport (sub-categories) ──
    motorcycle: {
        knowledge: "Motorcycle products must show ON BIKE. Show installation with correct tools, helmet fitting with strap, gear worn while riding. Safety and style.",
        sceneActions: [
            "Presenter shows motorcycle product — helmet, accessory, or gear. Design and brand.",
            "Presenter inspects quality — shell hardness, visor clarity, strap strength.",
            "Presenter puts on or installs — helmet on head, accessory on bike, gear on body.",
            "Close-up of fit — secure fastening, proper positioning, comfort padding.",
            "Presenter adjusts for perfect fit — strap tightened, visor position, mirror angle.",
            "Presenter shows safety features — certification, impact absorption, reflective elements.",
            "Presenter on or beside motorcycle — product in riding context.",
            "Presenter demonstrates function — visor flip, ventilation open, storage access.",
            "Presenter shows build quality — durable materials, weather resistance.",
            "Closing — presenter with motorcycle and product. Ride safe and stylish."
        ]
    },
    bicycle: {
        knowledge: "Bicycle products must show MOUNTED on bike or WORN while cycling. Show installation, adjustment, and riding demonstration.",
        sceneActions: [
            "Presenter shows bicycle product — light, lock, helmet, or accessory.",
            "Presenter installs on bike — clamps, mounts, or straps to handlebar or seatpost.",
            "Close-up of mounting — secure attachment, tool-free or Allen key install.",
            "Presenter adjusts — angle, tightness, position for optimal use.",
            "Presenter demonstrates function — light turns on, lock secures, bell rings.",
            "Presenter tests while riding — product works during actual cycling.",
            "Presenter shows durability — weather resistance, vibration resistance on road.",
            "Presenter shows ease of removal — quick detach for storage or charging.",
            "Presenter shows compatibility — fits different bike types, universal mount.",
            "Closing — presenter with equipped bicycle ready to ride. Cycling upgraded."
        ]
    },
    "car-accessory": {
        knowledge: "Car accessories must show IN-CAR installation and use. Show mounting on dashboard, windshield, or vent. Demonstrate while driving or parked.",
        sceneActions: [
            "Presenter shows car accessory — dash cam, phone mount, seat cover, organizer.",
            "Presenter enters car — shows where product will be installed.",
            "Presenter installs — mounts on windshield, clips to vent, covers seat.",
            "Close-up of secure attachment — suction cup, clip, or adhesive holding firm.",
            "Presenter adjusts — angle, position, height for optimal viewing or reach.",
            "Presenter demonstrates function — camera recording, phone mounted, seat covered.",
            "Presenter shows while driving — product stable, functional, not obstructing view.",
            "Presenter shows ease of use — one-hand operation, quick access, intuitive.",
            "Presenter shows interior upgrade — car looks cleaner, more organized with accessory.",
            "Closing — presenter in well-equipped car. Driving experience improved."
        ]
    },
    ev: {
        knowledge: "EV products must show CHARGING process. Show cable connection, charge port, indicator lights, app monitoring. Clean energy and technology focus.",
        sceneActions: [
            "Presenter shows EV charging product — charger, cable, adapter, or wall unit.",
            "Presenter installs or sets up — wall mount, outlet connection, cable management.",
            "Presenter opens vehicle charge port — reveals connector port on vehicle.",
            "Presenter plugs in connector — clicks securely into charge port. LED confirms.",
            "Close-up of charging indicator — LED light, app notification, charge percentage.",
            "Presenter shows app monitoring — charge level, estimated time, cost tracking.",
            "Presenter demonstrates safety features — weatherproof, overcharge protection.",
            "Presenter shows charge speed — fast charge progress, time comparison.",
            "Presenter unplugs and stores — cable organized, neat storage solution.",
            "Closing — presenter with fully charged EV. Clean energy driving."
        ]
    },

    // ── Family & Kids (sub-categories) ──
    toy: {
        knowledge: "Toys must show PLAY interaction — unbox, assemble if needed, demonstrate play action. Show age-appropriate engagement, fun reactions, and durability.",
        sceneActions: [
            "Presenter shows toy — colorful packaging, age recommendation, brand visible.",
            "Presenter unboxes — removes packaging, wire ties, protective wrapping.",
            "Presenter assembles if needed — follows instructions, connects pieces.",
            "Presenter demonstrates play — shows how toy works, moves, lights up, makes sound.",
            "Close-up of toy features — details, moving parts, colors, build quality.",
            "Presenter shows interactive play — pressing buttons, steering, building, creating.",
            "Presenter shows durability — sturdy construction, safe materials, no sharp edges.",
            "Presenter shows battery or power — installs batteries, charges, or wind-up mechanism.",
            "Presenter shows educational value — learning through play, skill development.",
            "Closing — presenter with toy in fun play setting. Joy and entertainment."
        ]
    },
    "kids-education": {
        knowledge: "Kids education products must show LEARNING interaction. Show age-appropriate engagement, parental supervision, skill development through fun activities.",
        sceneActions: [
            "Presenter shows educational product — learning kit, cards, electronic toy, workbook.",
            "Presenter opens and sets up — lays out materials, powers on device if electronic.",
            "Presenter demonstrates learning activity — matching, reading, counting, creating.",
            "Close-up of content quality — print quality, illustrations, interactive elements.",
            "Presenter shows engagement — child-friendly interface, fun learning approach.",
            "Presenter demonstrates progressive difficulty — levels, stages, advancement.",
            "Presenter shows curriculum alignment — subjects covered, age-appropriate content.",
            "Presenter shows parental features — progress tracking, parental controls.",
            "Presenter shows durability — kid-proof design, washable, drop-resistant.",
            "Closing — presenter with educational product. Smart learning investment."
        ]
    },
    maternity: {
        knowledge: "Maternity products must show COMFORTABLE supportive use. Show gentle adjustment, proper positioning, comfort features. Emphasize care and wellbeing.",
        sceneActions: [
            "Presenter shows maternity product — support belt, pillow, supplement, or clothing.",
            "Presenter opens package — soft, safe, comfortable materials revealed.",
            "Presenter demonstrates wearing or using — wraps belt, places pillow, takes supplement.",
            "Close-up of comfort features — soft padding, adjustable straps, breathable material.",
            "Presenter adjusts for comfort — velcro, elastic, positioning for support.",
            "Presenter shows support effect — back relief, comfortable positioning, proper posture.",
            "Presenter demonstrates daily use — wearing at home, during errands, while resting.",
            "Presenter shows ease of cleaning — removable cover, machine washable, easy care.",
            "Presenter reads safety info — safe materials, recommended usage, certifications.",
            "Closing — presenter comfortable with maternity product. Care and support."
        ]
    },
    family: {
        knowledge: "Family products must show TOGETHER activity — multiple people engaging, sharing, bonding. Show inclusive fun, setup, and group interaction.",
        sceneActions: [
            "Presenter shows family product — board game, picnic set, activity kit.",
            "Presenter sets up — unpacks, arranges pieces, prepares space for activity.",
            "Presenter excitedly prepares activity — sets out pieces, shows how fun it will be.",
            "Presenter demonstrates activity — playing game, setting up picnic, doing activity.",
            "Close-up of product quality — game pieces, material quality, included items.",
            "Presenter demonstrates how activity works — enthusiastic presentation, shows fun factor.",
            "Presenter shows rules or instructions — easy to understand, inclusive of all ages.",
            "Presenter shows versatile settings — indoors, outdoors, various locations.",
            "Presenter shows heartfelt recommendation — gestures enthusiastically about shared activity potential.",
            "Closing — presenter with family product in happy group setting. Quality time."
        ]
    },

    // ── Sports & Outdoor (sub-categories) ──
    sports: {
        knowledge: "Sports equipment must show IN PLAY — proper technique, athletic use, competitive or training context. Show equipment performance and proper form.",
        sceneActions: [
            "Presenter shows sports equipment — ball, racket, protective gear, training tool.",
            "Presenter prepares equipment — inflates ball, strings racket, adjusts gear size.",
            "Presenter demonstrates proper use — correct grip, stance, technique, form.",
            "Close-up of equipment quality — material, stitching, grip texture, brand detail.",
            "Presenter performs athletic action — throwing, hitting, kicking, blocking.",
            "Presenter shows protective features — padding, shock absorption, safety design.",
            "Presenter in sports context — court, field, gym, training ground.",
            "Presenter shows versatility — different drills, exercises, skill levels.",
            "Presenter shows durability — equipment handling intense athletic use.",
            "Closing — presenter with sports equipment in athletic setting. Game on."
        ]
    },
    camping: {
        knowledge: "Camping gear must show OUTDOOR SETUP — pitch tent, start stove, unroll sleeping bag. Show in actual outdoor or nature setting. Demonstrate setup process.",
        sceneActions: [
            "Presenter shows camping gear — packed state, compact, portable design.",
            "Presenter at campsite — selects flat ground, begins setup.",
            "Presenter sets up — pitches tent, assembles stove, unrolls sleeping bag.",
            "Close-up of construction — stake insertion, pole connection, zipper quality.",
            "Presenter shows completed setup — tent standing, camp organized, fire ready.",
            "Presenter demonstrates comfort — sits in tent, tests sleeping bag warmth.",
            "Presenter shows cooking — lights stove, heats water, prepares camp meal.",
            "Presenter shows weather protection — rainfly on, wind resistance, insulation.",
            "Presenter packs up — compact fold, back into carry bag, lightweight.",
            "Closing — presenter at beautiful campsite with gear. Outdoor adventure ready."
        ]
    },
    yoga: {
        knowledge: "Yoga products must show IN PRACTICE — on mat, proper alignment, poses demonstrated. Show calm setting, mindful use, and correct form.",
        sceneActions: [
            "Presenter shows yoga product — mat, block, strap, bolster, or clothing.",
            "Presenter unrolls mat or sets up props — on flat surface, calm environment.",
            "Presenter begins practice — sits on mat, centers breath, begins poses.",
            "Close-up of product in use — grip on mat, support from block, stretch with strap.",
            "Presenter demonstrates pose — proper alignment, product providing support.",
            "Presenter shows non-slip quality — hands and feet stable on mat surface.",
            "Presenter shows flexibility range — product enables deeper stretch, better form.",
            "Presenter in meditation — seated on mat or cushion, peaceful calm expression.",
            "Presenter shows portability — rolls mat, packs props, carries to class.",
            "Closing — presenter in peaceful yoga pose on mat. Mindful practice essentials."
        ]
    },

    // ── Office & Education (sub-categories) ──
    digital: {
        knowledge: "Digital products must show SCREEN interface — app navigation, features demo, results output. Show setup process, UI interaction, and what the software achieves.",
        sceneActions: [
            "Presenter shows digital product on glowing screen — holds device confidently.",
            "Presenter opens and navigates — taps and swipes through interface smoothly.",
            "Presenter demonstrates core feature — inputs data, creates content, runs function.",
            "Close-up of interaction — smooth responsive gestures, clean modern device.",
            "Presenter shows results — satisfied expression at the output, productive achievement.",
            "Presenter demonstrates workflow — step by step from input to output.",
            "Presenter shows settings — customization options, preferences, account features.",
            "Presenter shows device versatility — holds product confidently, demonstrates portability.",
            "Presenter shows final result — gestures proudly at completed work. Productivity tool.",
            "Closing — presenter with digital product on screen. Productivity enhanced."
        ]
    },
    office: {
        knowledge: "Office products must show IN WORKSPACE — on desk, assembled, organized. Show how product improves the work environment and productivity.",
        sceneActions: [
            "Presenter shows office product — chair, desk organizer, printer, monitor stand.",
            "Presenter assembles if needed — follows instructions, attaches components.",
            "Presenter places in workspace — proper positioning on or beside desk.",
            "Close-up of build quality — materials, adjustments, ergonomic features.",
            "Presenter uses product — sits in chair, organizes desk, prints document.",
            "Presenter shows ergonomic benefit — posture improvement, comfort, reduced strain.",
            "Presenter demonstrates adjustability — height, angle, tilt, position options.",
            "Presenter shows workspace before and after — productivity improvement visible.",
            "Presenter in full work session — product enhancing comfort and efficiency.",
            "Closing — presenter in organized productive workspace. Office upgraded."
        ]
    },
    course: {
        knowledge: "Courses must show LEARNING experience — login, navigate lessons, watch content, take notes, show progress. Demonstrate value of knowledge gained.",
        sceneActions: [
            "Presenter shows course — platform, title, instructor, curriculum overview.",
            "Presenter logs in — navigates to course page, shows lesson structure.",
            "Presenter plays lesson — video or content playing, engaging material.",
            "Close-up of content — clear instruction, quality visuals, professional production.",
            "Presenter takes notes alongside — active learning, engaged studying.",
            "Presenter completes exercise — quiz, assignment, or hands-on practice.",
            "Presenter shows progress — completion percentage, achievements, certificates.",
            "Presenter demonstrates skills learned — applying knowledge from the course.",
            "Presenter shows community — forum, Q&A, peer interaction features.",
            "Closing — presenter with course certificate or new skill demonstrated. Knowledge gained."
        ]
    },

    // ── Cleaning (sub-categories) ──
    detergent: {
        knowledge: "Detergent must show MEASURING dose and ADDING to washer. Show correct amount, dispensing method (liquid pour, pod placement, powder scoop). Clean laundry result.",
        sceneActions: [
            "Presenter shows detergent — bottle, pods, or powder. Brand and type visible.",
            "Presenter opens container — flips cap, opens pod bag, or removes powder lid.",
            "Presenter measures dose — pours into cap, picks up single pod, scoops powder.",
            "Presenter adds to washer — pours in dispenser, places pod in drum, adds scoop.",
            "Presenter loads clothes and starts wash — machine begins cleaning cycle.",
            "Close-up of product features — concentrated formula, scent beads, stain removal.",
            "Presenter shows fresh clean laundry — removes from washer, holds up, smells.",
            "Presenter shows stain removal result — before dirty, after spotless and fresh.",
            "Presenter shows value — concentration means less product needed per load.",
            "Closing — presenter with fresh-scented clean laundry. Effective clean."
        ]
    },
    "air-freshener": {
        knowledge: "Air fresheners must show ACTIVATION and SCENT dispersal. Show spray, plug-in, or diffuser setup. Room transformation from stale to fresh.",
        sceneActions: [
            "Presenter shows air freshener — spray can, plug-in, gel, or reed diffuser.",
            "Presenter activates — sprays upward, plugs into outlet, peels gel lid, inserts reeds.",
            "Presenter shows scent dispersal — spray mist in air, plug-in indicator light, reed absorption.",
            "Close-up of product in action — mist particles, oil wicking up reeds, gel surface.",
            "Presenter inhales — fresh scent reaching, pleasant reaction, room smells better.",
            "Presenter shows room context — living room, bathroom, bedroom. Freshness everywhere.",
            "Presenter demonstrates intensity control — adjustable spray, scent level settings.",
            "Presenter shows longevity — how long scent lasts, refill options, value.",
            "Presenter shows variety — different scents available, seasonal options.",
            "Closing — presenter in fresh-smelling room with air freshener. Home refreshed."
        ]
    },
    insect: {
        knowledge: "Insect control products must show SAFE application — spray from distance, plug in, place trap. Show effectiveness and safety precautions.",
        sceneActions: [
            "Presenter shows insect product — spray, plug-in, trap, or repellent.",
            "Presenter reads instructions — safe usage, distance, precautions visible.",
            "Presenter prepares — shakes can, removes trap backing, inserts refill.",
            "Presenter applies — sprays at distance, plugs into outlet, places trap in area.",
            "Close-up of product working — spray coverage, indicator light, adhesive trap.",
            "Presenter shows target area — entry points, corners, outdoor boundaries.",
            "Presenter shows safety — keeps away from food, pets, children as labeled.",
            "Presenter shows effectiveness — clean area, no more pest concerns.",
            "Presenter shows duration — how long protection lasts, when to reapply.",
            "Closing — presenter in pest-free home with product. Protection achieved."
        ]
    },
    garden: {
        knowledge: "Garden products must show OUTDOOR use in soil or garden context. Show planting, watering, pruning. Hands in dirt, green growing results.",
        sceneActions: [
            "Presenter shows garden product — seeds, tools, fertilizer, or planter.",
            "Presenter prepares garden area — soil, pot, or garden bed ready.",
            "Presenter uses product — plants seeds, applies fertilizer, prunes with tool.",
            "Close-up of technique — seed depth, fertilizer distribution, clean pruning cut.",
            "Presenter waters — gentle watering after planting, proper technique.",
            "Presenter shows tool quality — sharp blade, comfortable grip, durable construction.",
            "Presenter shows growth results — healthy plants from proper gardening.",
            "Presenter demonstrates maintenance — regular care, ongoing garden upkeep.",
            "Presenter shows garden beauty — flowers blooming, vegetables growing, lush green.",
            "Closing — presenter in beautiful thriving garden. Green thumb success."
        ]
    },

    // ── Misc ──
    craft: {
        knowledge: "Craft products must show CREATION process — materials laid out, step-by-step making, finished piece. Show hands creating, artistic skill, and final result.",
        sceneActions: [
            "Presenter shows craft supplies — materials, tools, patterns, kit contents.",
            "Presenter lays out workspace — organized materials, tools within reach.",
            "Presenter begins creating — cutting, gluing, painting, assembling first steps.",
            "Close-up of technique — precise cuts, even paint strokes, careful assembly.",
            "Presenter shows progress — piece taking shape, design becoming visible.",
            "Presenter demonstrates skill — detailed work, artistic decisions, craftsmanship.",
            "Presenter adds finishing touches — final details, embellishments, polish.",
            "Presenter shows completed creation — finished piece, proud of handmade result.",
            "Presenter shows versatility — different projects possible with same supplies.",
            "Closing — presenter with handmade creation. DIY creativity achieved."
        ]
    },
    gift: {
        knowledge: "Gift products must show WRAPPING and PRESENTATION. Show beautiful packaging, ribbon tying, gift arrangement. The unboxing experience and presentation is the content.",
        sceneActions: [
            "Presenter shows gift product — gift set, wrapping supplies, or gift box.",
            "Presenter opens and arranges — lays out items, organizes gift components.",
            "Presenter wraps — measures paper, folds neatly, tapes securely. Clean technique.",
            "Presenter adds ribbon — crosses, ties bow, curls ends. Decorative finishing.",
            "Close-up of finished wrapping — neat folds, straight edges, beautiful bow.",
            "Presenter shows gift tag or card — personal touch, heartfelt message option.",
            "Presenter arranges gift basket or box — tissue paper, items displayed beautifully.",
            "Presenter shows presentation — how gift looks ready to give. Premium appearance.",
            "Presenter simulates giving — offers wrapped gift to camera. Generous gesture.",
            "Closing — presenter with beautifully wrapped gift. Perfect giving moment."
        ]
    },
    wedding: {
        knowledge: "Wedding products must show ELEGANT presentation — ceremony and reception context. Show delicate handling, romantic styling, and celebration atmosphere.",
        sceneActions: [
            "Presenter shows wedding product — invitation, decoration, accessory, or favor.",
            "Presenter opens or unpacks — reveals elegant design, quality materials.",
            "Presenter demonstrates use — arranges decoration, assembles favor, addresses invitation.",
            "Close-up of detail — calligraphy, lace, ribbon, pearl, crystal elements.",
            "Presenter shows in ceremony context — altar, table setting, venue decoration.",
            "Presenter shows color coordination — matches wedding palette, complementary styling.",
            "Presenter demonstrates assembly — step by step setup for event day.",
            "Presenter shows quantity or set — enough for guest count, coordinated collection.",
            "Presenter shows personalization — custom names, dates, monograms available.",
            "Closing — presenter with wedding product in elegant celebration setting. Perfect day."
        ]
    },

    // ── Fallback ──
    other: {
        knowledge: "Show the product's PRIMARY FUNCTION in action. Don't just hold it — demonstrate what it does, how it works, and the result it delivers.",
        sceneActions: [
            "Presenter shows product — design, packaging, first impression. Hero product shot.",
            "Presenter opens/unpacks product — reveals features, build quality.",
            "Presenter demonstrates primary function — product doing what it's designed to do.",
            "Close-up of key feature — detail, quality, craftsmanship.",
            "Presenter shows product in real use context — practical application.",
            "Presenter shows result/benefit — what the product achieves for the user.",
            "Presenter shows additional features — versatility, bonus functions.",
            "Presenter demonstrates ease of use — intuitive, user-friendly design.",
            "Presenter shows value — quality, durability, included accessories.",
            "Closing — presenter with product, satisfied recommendation expression."
        ]
    }
};

/**
 * Analyze scene script text and generate context-aware visual directives.
 * Detects accessories, screen content, character actions, and transitions
 * mentioned in the voiceover script to make the video more realistic.
 * 
 * Examples:
 * - Laptop script mentions "เกม" → adds gameplay on screen + character sitting playing
 * - Phone script mentions "กล้อง" → adds camera viewfinder on screen + photo-taking action
 * - Fragrance script mentions "ฉีด" → adds spray mist visual + elegant spray action
 * - Any product with "ชาร์จ" → adds charger cable accessory in scene
 */
const buildScriptAwareDirective = (
    category: ProductCategory,
    sceneScript: string,
    sceneNumber: number,
    productName?: string
): string => {
    const cr = CATEGORY_CONTEXTUAL_REALISM[category];
    const text = `${(sceneScript || '').toLowerCase()} ${(productName || '').toLowerCase()}`;

    // General cinematic flair — always applied for visual interest
    const flairIdx = (sceneNumber - 1) % GENERAL_CINEMATIC_FLAIR.length;
    const generalFlair = GENERAL_CINEMATIC_FLAIR[flairIdx];

    if (!cr) {
        // Fallback: general cinematic flair only
        return sceneNumber > 1
            ? `CINEMATIC: ${generalFlair}. Smooth transition from scene ${sceneNumber - 1}.`
            : `CINEMATIC: ${generalFlair}.`;
    }

    const parts: string[] = [];

    // 1. Detect accessories (max 2 to keep prompt concise)
    const accs = cr.accessories.filter(a => a.kw.some(k => text.includes(k.toLowerCase()))).slice(0, 2);
    if (accs.length > 0) {
        parts.push(`ACCESSORIES VISIBLE: ${accs.map(a => a.v).join('; ')}`);
    }

    // 2. Detect screen content (for products with displays — first match only)
    if (cr.screen && cr.screen.length > 0) {
        const sc = cr.screen.find(s => s.kw.some(k => text.includes(k.toLowerCase())));
        if (sc) parts.push(`SCREEN CONTENT: ${sc.v}`);
    }

    // 3. Detect context-appropriate character action (first match)
    const act = cr.actions.find(a => a.kw.some(k => text.includes(k.toLowerCase())));
    if (act) parts.push(`CHARACTER ACTION: ${act.a}`);

    // 4. Category-specific cinematic transition + general flair
    if (cr.transitions.length > 0) {
        const tIdx = sceneNumber > 1
            ? (sceneNumber - 2) % cr.transitions.length
            : 0;
        parts.push(`CINEMATIC: ${cr.transitions[tIdx]}. ${generalFlair}`);
    } else {
        parts.push(`CINEMATIC: ${generalFlair}`);
    }

    return parts.join('. ') + '.';
};

/**
 * Get scene-specific presentation directive for a category.
 * Returns the visual action directive for a specific scene number.
 * Cycles through available directives if sceneNumber exceeds array length.
 */
const getScenePresentationDirective = (
    category: ProductCategory,
    sceneNumber: number,
    _totalScenes?: number
): string => {
    const guide = PRODUCT_PRESENTATION_GUIDE[category] || PRODUCT_PRESENTATION_GUIDE["other"];
    if (!guide) return "";

    const idx = Math.min(sceneNumber - 1, guide.sceneActions.length - 1);
    const sceneAction = guide.sceneActions[idx] || guide.sceneActions[guide.sceneActions.length - 1];

    return `PRODUCT PRESENTATION KNOWLEDGE: ${guide.knowledge} VISUAL ACTION FOR THIS SCENE: ${sceneAction} Character must shift grip, angle, and interaction with the product multiple times — never hold in one static pose.`;
};

/** Build slim contact physics directive (for video prompts — shorter to avoid policy filter) */
const buildContactPhysicsDirectiveSlim = (category: ProductCategory): string => {
    const usageRealism = PRODUCT_USAGE_REALISM[category] || "REALISTIC USAGE: If product has any cap, lid, seal, or wrapper, it must be removed/opened BEFORE use. Show logical step-by-step usage.";
    return `Anatomically correct hands, five fingers each. ${usageRealism} ${ANTI_FLOATING_HANDS}`;
};

// Anti-Distortion directive — injected into all image prompts
const ANTI_DISTORTION_DIRECTIVE = "PRODUCT ACCURACY: Frontal eye-level shot, perfectly centered, symmetrical composition. Shot on 85mm lens, f/8 aperture, zero lens distortion. High-end product photography, no perspective warping. Preserve original packaging design and visual branding exactly as shown in the reference image. VISUAL ACCURACY: All branding and visual elements on the product must match the reference image — same size, same position. Do not generate random markings or hallucinated graphics.";

// Brand & Policy Safety — words to auto-sanitize from prompts
const BRAND_REPLACEMENTS: [RegExp, string][] = [
    // ── Apple product lines (MUST come before generic "apple" brand match) ──
    [/\bmacbook\s*pro\b/gi, "premium professional laptop"],
    [/\bmacbook\s*air\b/gi, "premium slim laptop"],
    [/\bmacbook\b/gi, "premium laptop"],
    [/\bipad\s*pro\b/gi, "premium professional tablet"],
    [/\bipad\s*air\b/gi, "premium slim tablet"],
    [/\bipad\s*mini\b/gi, "compact premium tablet"],
    [/\bipad\b/gi, "premium tablet"],
    [/\bairpods?\s*pro\b/gi, "premium wireless earbuds"],
    [/\bairpods?\s*max\b/gi, "premium over-ear headphones"],
    [/\bairpods?\b/gi, "wireless earbuds"],
    [/\bapple\s*watch\b/gi, "premium smart watch"],
    [/\bapple\s*tv\b/gi, "premium streaming device"],
    [/\bimac\b/gi, "premium all-in-one desktop"],
    [/\bhomepod\b/gi, "premium smart speaker"],
    [/\bapple\s*vision\s*pro\b/gi, "premium mixed reality headset"],
    // ── Samsung product lines ──
    [/\bgalaxy\s*s\d+/gi, "flagship smartphone"],
    [/\bgalaxy\s*z\s*fold\d*/gi, "premium foldable smartphone"],
    [/\bgalaxy\s*z\s*flip\d*/gi, "premium flip smartphone"],
    [/\bgalaxy\s*tab\b/gi, "premium tablet"],
    [/\bgalaxy\s*buds?\d*\b/gi, "wireless earbuds"],
    [/\bgalaxy\s*watch\d*\b/gi, "smart watch"],
    [/\bgalaxy\s*ring\b/gi, "smart ring"],
    [/\bgalaxy\s*book\b/gi, "premium laptop"],
    [/\bgalaxy\b/gi, "flagship device"],
    // ── Microsoft product lines ──
    [/\bsurface\s*pro\b/gi, "premium 2-in-1 laptop"],
    [/\bsurface\s*laptop\b/gi, "premium laptop"],
    [/\bsurface\s*go\b/gi, "compact laptop tablet"],
    [/\bxbox\s*series\s*[xs]\b/gi, "gaming console"],
    [/\bxbox\b/gi, "gaming console"],
    // ── Google product lines ──
    [/\bpixel\s*\d+\s*pro\b/gi, "flagship smartphone"],
    [/\bpixel\s*\d+[a]?\b/gi, "premium smartphone"],
    [/\bpixel\s*watch\b/gi, "smart watch"],
    [/\bpixel\s*buds?\b/gi, "wireless earbuds"],
    [/\bpixel\s*tablet\b/gi, "premium tablet"],
    [/\bnest\s*hub\b/gi, "smart display"],
    [/\bchromecast\b/gi, "streaming device"],
    [/\bchromebook\b/gi, "affordable laptop"],
    // ── Sony product lines ──
    [/\bplaystation\s*\d*\b/gi, "gaming console"],
    [/\bps5\b/gi, "gaming console"],
    [/\bps4\b/gi, "gaming console"],
    [/\bxperia\b/gi, "premium smartphone"],
    [/\bsony\b/gi, "premium electronics"],
    // ── Other tech product lines ──
    [/\bnintendo\s*switch\b/gi, "portable gaming console"],
    [/\bnintendo\b/gi, "gaming brand"],
    [/\bdyson\b/gi, "premium home appliance"],
    [/\btesla\b/gi, "premium electric vehicle"],
    [/\bmarshall\b/gi, "premium audio brand"],
    [/\bbose\b/gi, "premium audio brand"],
    [/\bjbl\b/gi, "popular audio brand"],
    [/\bsennheiser\b/gi, "professional audio brand"],
    [/\bbeats\b(?!\s*(per|by\s+dre))/gi, "premium headphones"],
    [/\bbeats\s*by\s*dre\b/gi, "premium headphones"],
    [/\brazer\b/gi, "gaming gear brand"],
    [/\blogitech\b/gi, "computer accessory brand"],
    [/\basus\b/gi, "premium computer brand"],
    [/\blenovo\b/gi, "computer brand"],
    [/\bthinkpad\b/gi, "professional laptop"],
    [/\bdell\b/gi, "computer brand"],
    [/\bacer\b/gi, "computer brand"],
    [/\bmsi\b(?!\s*afterburner)/gi, "gaming computer brand"],
    [/\bhp\b(?!\s*(sauce|lovecraft))/gi, "computer brand"],
    // ── Car brands ──
    [/\bbmw\b/gi, "luxury car brand"],
    [/\bmercedes[\s-]*benz\b/gi, "luxury car brand"],
    [/\bmercedes\b/gi, "luxury car brand"],
    [/\bporsche\b/gi, "luxury sports car brand"],
    [/\bferrari\b/gi, "luxury sports car brand"],
    [/\blamborghini\b/gi, "luxury sports car brand"],
    [/\btoyota\b/gi, "popular car brand"],
    [/\bhonda\b/gi, "popular car brand"],
    [/\bmazda\b/gi, "popular car brand"],
    [/\baudi\b/gi, "luxury car brand"],
    [/\blexus\b/gi, "luxury car brand"],
    // ── Original tech brands ──
    [/\biphone\s*\d*\s*(?:pro\s*max|pro|plus|mini)?\b/gi, "premium smartphone"],
    [/\biphone\b/gi, "premium smartphone"],
    [/\bsamsung\b/gi, "flagship device"],
    [/\bapple\b(?!\s*(cider|juice|pie|fruit))/gi, "premium tech brand"],
    [/\bgoogle\b/gi, "major tech platform"],
    [/\bhuawei\b/gi, "flagship smartphone"],
    [/\bxiaomi\b/gi, "popular smartphone"],
    [/\boppo\b/gi, "stylish smartphone"],
    [/\bvivo\b/gi, "stylish smartphone"],
    [/\brealme\b/gi, "popular smartphone"],
    [/\boneplus\b/gi, "premium smartphone"],
    [/\bnothing\s*phone\b/gi, "premium smartphone"],
    // Athletic/Fashion brands
    [/\bnike\b/gi, "athletic brand"],
    [/\badidas\b/gi, "sportswear brand"],
    [/\bgucci\b/gi, "luxury fashion brand"],
    [/\blouis\s*vuitton\b/gi, "luxury brand"],
    [/\bchanel\b/gi, "high-end fashion brand"],
    [/\brolex\b/gi, "luxury watch brand"],
    [/\bprada\b/gi, "luxury fashion brand"],
    [/\bhermes\b/gi, "luxury brand"],
    [/\bdior\b/gi, "luxury fashion brand"],
    [/\bbalenciaga\b/gi, "designer fashion brand"],
    [/\bzara\b/gi, "fashion brand"],
    [/\buniqlo\b/gi, "casual fashion brand"],
    [/\bh&m\b/gi, "fashion brand"],
    [/\bfendi\b/gi, "luxury fashion brand"],
    [/\bcartier\b/gi, "luxury jewelry brand"],
    [/\btiffany\b/gi, "luxury jewelry brand"],
    [/\bomega\b/gi, "luxury watch brand"],
    [/\btag\s*heuer\b/gi, "luxury watch brand"],
    // Beauty/Fragrance brands
    [/\bversace\b/gi, "luxury fragrance brand"],
    [/\bbulgari\b/gi, "luxury brand"],
    [/\btom ford\b/gi, "luxury fragrance brand"],
    [/\bjo malone\b/gi, "premium fragrance brand"],
    [/\bysl\b/gi, "luxury beauty brand"],
    [/\blancôme\b/gi, "premium beauty brand"],
    [/\bestée lauder\b/gi, "premium beauty brand"],
    [/\bmac\b(?!\s*(address|os|book))/gi, "professional beauty brand"],
    [/\bsk-?ii\b/gi, "premium skincare brand"],
    [/\bla mer\b/gi, "luxury skincare brand"],
    [/\bclinique\b/gi, "premium skincare brand"],
    [/\bnars\b/gi, "professional makeup brand"],
    [/\bloreall?\b/gi, "beauty brand"],
    [/\bmaybelline\b/gi, "beauty brand"],
    [/\bshu\s*uemura\b/gi, "premium beauty brand"],
    [/\bbobbi\s*brown\b/gi, "premium beauty brand"],
    // Social platforms
    [/\binstagram\b/gi, "social media platform"],
    [/\bfacebook\b/gi, "social network"],
    [/\byoutube\b/gi, "video platform"],
    [/\btiktok\b/gi, "short video platform"],
    [/\btwitter\b/gi, "social platform"],
    [/\bx\.com\b/gi, "social platform"],
    // Celebrity/public figure references — replace with generic descriptions
    [/\blisa\b(?!\s*(simpson|kudrow))/gi, "young woman"],
    [/\bbambi?i?\b/gi, "young woman"],
    [/\bblackpink\b/gi, "music group"],
    [/\bbts\b/gi, "music group"],
    [/\btwice\b(?!\s*(a|per|as))/gi, "music group"],
    [/\bjungkook\b/gi, "young man"],
    [/\bjennie\b/gi, "young woman"],
    [/\brose\b(?=\s*(blackpink|bp))/gi, "young woman"],
    [/\btaylor swift\b/gi, "female singer"],
    [/\bariana grande\b/gi, "female singer"],
    [/\bbeyonce\b/gi, "female singer"],
    [/\brihanna\b/gi, "female singer"],
    [/\bkim kardashian\b/gi, "celebrity"],
    [/\bkardashian\b/gi, "celebrity"],
    [/\belon musk\b/gi, "tech entrepreneur"],
    [/\btrump\b/gi, "political figure"],
    [/\bobama\b/gi, "political figure"],
    [/\bmessi\b/gi, "football player"],
    [/\bronaldo\b/gi, "football player"],
    [/\b(?:มิลลิ)\b/gi, "นักร้องหญิง"], // Will fix these below
    [/มิลลิ/gi, "นักร้องหญิง"],
    [/ลิซ่า/gi, "สาวเอเชีย"],
    [/แบมแบม/gi, "หนุ่มเอเชีย"],
    [/บิวกิ้น/gi, "หนุ่มไทย"],
    [/พีพี/gi, "หนุ่มไทย"],
    [/ใบเฟิร์น/gi, "สาวไทย"],
    [/ญาญ่า/gi, "สาวไทย"],
    [/มาริโอ้/gi, "หนุ่มไทย"],
    [/ณเดชน์/gi, "หนุ่มไทย"],
    [/เบลล่า/gi, "สาวไทย"],
    [/ดาวิกา/gi, "สาวไทย"],
    [/อั้ม(?!\s*พัชรา)/gi, "สาวไทย"],
    [/อั้ม\s*พัชราภา/gi, "สาวไทย"],
    [/มาร์กี้/gi, "สาวไทย"],
];

// Policy-unsafe keywords that should be stripped
const POLICY_UNSAFE_WORDS = [
    "sexy", "seductive", "cheap", "fake", "counterfeit",
    "miracle", "cure", "heal", "guaranteed results",
    "100% effective", "instant results", "magic",
    "weight loss", "slimming", "diet pill",
    "before and after medical", "surgical",
    // Gender/body policy triggers
    "revealing", "skin-tight", "body-hugging", "low-cut", "cleavage",
    "bare skin", "exposed", "undressed", "lingerie", "bikini",
    "smooth skin", "body focus", "full-body", "figure", "curves",
    "sensual", "alluring", "provocative", "attractive body",
    "smooth young skin", "perfect skin", "flawless body",
    "glowing skin", "clear skin", "bright skin", "radiant skin",
    "youthful skin", "ageless skin", "wrinkle-free skin",
    // Lip sync trigger (specifically "lip sync" or "lip-sync" because it truncates to "Lip.")
    "lip sync", "lip-sync", "lipsync",
    // Text-trigger words — these cause AI to render text/fonts in frames
    "poster style", "thumbnail", "title card", "signage", "banner ad",
    "infographic", "presentation slide", "YouTube style",
    // Supplement/health overclaim triggers
    "FDA approved", "clinically proven", "doctor recommended", "treats disease",
    "prevents cancer", "anti-aging guaranteed", "permanent results",
    // Baby/pet safety triggers
    "unsupervised child", "leave baby alone", "not for children under",
    // Auto safety triggers
    "crash tested", "bulletproof", "indestructible",
    // Celebrity/public figure policy triggers
    "celebrity", "famous person", "public figure", "real person",
    "looks like", "resembles", "lookalike", "look-alike", "doppelganger",
    "identical to", "same as", "based on", "inspired by celebrity",
    "k-pop idol", "k-pop star", "kpop idol", "kpop star",
    "thai celebrity", "thai actress", "thai actor", "thai idol",
    "idol", "superstar", "mega star", "ดารา", "คนดัง", "เซเลบ",
    "นักร้องชื่อดัง", "ดาราชื่อดัง", "นางเอก", "พระเอก",
    "influencer ชื่อดัง", "ไอดอล",
    // Thai safety triggers
    "โป๊", "เปลือย", "ร่องอก", "หน้าอก", "ชุดว่ายน้ำ", "บิกินี่", "ชุดชั้นใน", "วาบหวิว", "ยั่วยวน",
];

/** Sanitize a product name for Veo visual prompts — replaces known brand/trademark
 *  words with generic visual descriptions. The product IMAGE reference handles visual
 *  identity, so we don't need trademarked names in the text prompt.
 *  Original name is kept only in SPOKEN DIALOGUE (audio-only section).
 */
const sanitizeProductNameForVeo = (productName: string): string => {
    let result = productName;
    for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
    }
    return result.replace(/\s{2,}/g, ' ').trim();
};

/** Sanitize brand names and policy-unsafe keywords from a prompt.
 *  If productName is provided, it will be preserved as-is (not sanitized).
 *  For VIDEO prompts: caller should pass veoSafeProductName (already brand-stripped).
 *  For IMAGE prompts: caller passes raw productName (ImageFX is more lenient with brands).
 */
const sanitizePromptForPolicy = (text: string, productName?: string): string => {
    let result = text;

    // ★ Protect directive constants from sanitization — they intentionally use
    //   words like "real person", "celebrity", "signage" in negative/instructive contexts
    const DIRECTIVE_PLACEHOLDERS: [string, string][] = [
        [FACE_IDENTITY_LOCK, "___DIRECTIVE_FACE_LOCK___"],
        [ANTI_TEXT_DIRECTIVE, "___DIRECTIVE_ANTI_TEXT___"],
        [ANTI_DISTORTION_DIRECTIVE, "___DIRECTIVE_ANTI_DISTORT___"],
        [VIDEO_POLICY_DIRECTIVE, "___DIRECTIVE_VIDEO_POLICY___"],
        [FRONT_FACING_DIRECTIVE, "___DIRECTIVE_FRONT_FACING___"],
        [PRODUCT_MATCH_DIRECTIVE, "___DIRECTIVE_PRODUCT_MATCH___"],
    ];
    for (const [directive, ph] of DIRECTIVE_PLACEHOLDERS) {
        if (result.includes(directive)) {
            result = result.replace(directive, ph);
        }
    }

    // Protect product name from brand replacement (caller decides what name to pass)
    const placeholder = "___PRODUCT_NAME_PRESERVE___";
    if (productName) {
        result = result.replace(new RegExp(productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), placeholder);
    }
    for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
    }
    for (const word of POLICY_UNSAFE_WORDS) {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Thai words don't work with \b (word boundary) because Thai characters are non-word characters in JS regex
        const isThai = /[ก-๙]/.test(word);
        const re = isThai ? new RegExp(escaped, 'gi') : new RegExp(`\\b${escaped}\\b`, 'gi');
        result = result.replace(re, '');
    }
    // ★ Strip "looks like [Name]", "resembles [Name]", "similar to [Name]" patterns
    result = result.replace(/(?:looks?\s+like|resembles?|similar\s+to|inspired\s+by|based\s+on|same\s+as|identical\s+to)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}/g, '');
    // ★ Strip "[Name]-like" patterns (e.g., "Lisa-like", "Jennie-style")
    result = result.replace(/[A-Z][a-z]+(?:-like|-style|-inspired|-esque)/g, '');

    // Restore directive constants
    for (const [directive, ph] of DIRECTIVE_PLACEHOLDERS) {
        if (result.includes(ph)) {
            result = result.replace(ph, directive);
        }
    }
    // Restore product name
    if (productName) {
        result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), productName);
    }
    // Deduplicate repeated SENTENCES only (split on sentence-ending punctuation, not "," to preserve structure)
    const sentences = result.split(/(?<=[.!?…])\s+/).map(s => s.trim()).filter(Boolean);
    const seen = new Set<string>();
    const deduped: string[] = [];
    for (const s of sentences) {
        const key = s.toLowerCase().replace(/[^a-z0-9ก-๙\s]/g, '').replace(/\s+/g, ' ').trim();
        if (key.length < 5 || !seen.has(key)) {
            if (key.length >= 5) seen.add(key);
            deduped.push(s);
        }
    }
    result = deduped.join(' ');
    // Clean up double spaces
    return result.replace(/\s{2,}/g, ' ').trim();
};

// ProductCategory now imported from @/data/categoryEnvironments (100 categories)

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
        "เนื้อผ้าดีเกินคาด",
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
        "ดีลพิเศษมาแล้ว! อย่าพลาด!",
        "Flash sale! กดเลย!",
        "โปรนี้มีจำกัด!",
        "โอกาสดีมาแล้ว! รีบเลย!",
        "รีบๆ! หมดเมื่อไหร่ไม่รู้!",
        "ของดีมาแล้ว! กดเลย!",
        "โปรนี้ห้ามพลาด!",
        "ดีลนี้สุดคุ้ม! กดเลย!",
        "โอกาสแบบนี้ไม่ได้มีบ่อย!"
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
        "Viral ทั่วโซเชียล!",
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

    // Template-driven overrides
    if (template === "food-review") return "food";
    if (template === "fashion-review") return "fashion";
    if (template === "gadget-review") return "gadget";

    // ═════════════════════════════════════════════════════════════════════
    // SPECIFIC sub-categories FIRST (before broader parent categories)
    // Order: most specific → broad parent → "other" fallback
    // ═════════════════════════════════════════════════════════════════════

    // ── Wedding (before fashion/gift) ──
    if (includesAny(t, [
        "wedding", "bridal", "bride", "groom", "engagement ring", "wedding ring", "wedding dress", "veil",
        "งานแต่ง", "เจ้าสาว", "เจ้าบ่าว", "แหวนแต่งงาน", "ชุดเจ้าสาว", "การ์ดแต่งงาน"
    ])) return "wedding";

    // ── Gift (before other) ──
    if (includesAny(t, [
        "gift set", "gift box", "gift basket", "gift wrap", "gift card", "gift hamper",
        "ของขวัญ", "เซ็ตของขวัญ", "กล่องของขวัญ", "ห่อของขวัญ"
    ])) return "gift";

    // ── Jewelry (before fashion/beauty) ──
    if (includesAny(t, [
        "jewelry", "jewellery", "necklace", "bracelet", "ring", "earring", "pendant", "gemstone", "diamond", "gold chain",
        "เครื่องประดับ", "สร้อยคอ", "สร้อยข้อมือ", "แหวน", "ต่างหู", "จี้", "อัญมณี", "เพชร", "ทอง"
    ])) return "jewelry";

    // ── Watch (before gadget) ──
    if (includesAny(t, [
        "watch", "wristwatch", "timepiece", "horology", "chronograph", "smartwatch",
        "นาฬิกา", "นาฬิกาข้อมือ", "สมาร์ทวอทช์"
    ])) return "watch";

    // ── Sunglasses (before fashion) ──
    if (includesAny(t, [
        "sunglasses", "sunglass", "aviator glasses", "polarized glasses", "ray-ban", "oakley",
        "แว่นกันแดด", "แว่นตากันแดด"
    ])) return "sunglasses";

    // ── Hat (before fashion) ──
    if (includesAny(t, [
        "hat", "cap", "beanie", "bucket hat", "snapback", "visor", "fedora", "beret",
        "หมวก", "หมวกแก๊ป", "หมวกบีนนี่", "หมวกบักเก็ต"
    ])) return "hat";

    // ── Shoe (before fashion) ──
    if (includesAny(t, [
        "shoe", "shoes", "sneaker", "sneakers", "boot", "boots", "sandal", "sandals", "slipper", "running shoe",
        "รองเท้า", "สนีกเกอร์", "บูท", "รองเท้าแตะ", "รองเท้าวิ่ง", "รองเท้ากีฬา"
    ])) return "shoe";

    // ── Bag (before fashion) ──
    if (includesAny(t, [
        "bag", "handbag", "backpack", "tote", "clutch", "wallet", "purse", "luggage", "suitcase", "crossbody",
        "กระเป๋า", "กระเป๋าสะพาย", "กระเป๋าเป้", "กระเป๋าถือ", "กระเป๋าเดินทาง", "กระเป๋าสตางค์"
    ])) return "bag";

    // ── Underwear / Swimwear / Sportswear (before fashion) ──
    if (includesAny(t, [
        "underwear", "bra", "panties", "boxer", "briefs", "lingerie", "undershirt",
        "ชุดชั้นใน", "บรา", "กางเกงใน", "บ็อกเซอร์"
    ])) return "underwear";

    if (includesAny(t, [
        "swimwear", "swimsuit", "bikini", "swim trunks", "rash guard", "swimming",
        "ชุดว่ายน้ำ", "บิกินี่", "กางเกงว่ายน้ำ"
    ])) return "swimwear";

    if (includesAny(t, [
        "sportswear", "jersey", "track pants", "sports bra", "compression", "athletic wear",
        "ชุดกีฬา", "เสื้อกีฬา", "กางเกงกีฬา", "ชุดออกกำลังกาย"
    ])) return "sportswear";

    // ── Coffee / Tea / Alcohol (before beverage) ──
    if (includesAny(t, [
        "coffee", "espresso", "latte", "cappuccino", "cold brew", "drip coffee", "coffee bean", "arabica", "robusta",
        "กาแฟ", "เอสเพรสโซ", "ลาเต้", "คาปูชิโน่", "โคลด์บริว", "เมล็ดกาแฟ"
    ])) return "coffee";

    if (includesAny(t, [
        "tea", "green tea", "herbal tea", "oolong", "chamomile", "black tea", "tea bag", "matcha",
        "ชา", "ชาเขียว", "ชาสมุนไพร", "อู่หลง", "คาโมมายล์", "ชาดำ", "มัทฉะ"
    ])) return "tea";

    if (includesAny(t, [
        "alcohol", "wine", "beer", "whisky", "whiskey", "vodka", "rum", "gin", "sake", "cocktail", "champagne",
        "เหล้า", "เบียร์", "ไวน์", "วิสกี้", "วอดก้า", "รัม", "ค็อกเทล", "สาเก"
    ])) return "alcohol";

    // ── Beverage (before food) ──
    if (includesAny(t, [
        "drink", "beverage", "milk", "juice", "soda", "cola", "smoothie", "water", "energy drink",
        "protein shake", "bubble tea", "boba",
        "monster", "monster energy", "red bull", "redbull", "carabao", "shark", "sting", "m-150", "m150",
        "กระทิงแดง", "คาราบาว", "สตาร์ค", "เอ็ม-150",
        "เครื่องดื่ม", "นม", "น้ำผลไม้", "น้ำอัดลม", "ชานมไข่มุก", "น้ำ"
    ])) return "beverage";

    // ── Fragrance (before beauty) ──
    if (includesAny(t, [
        "perfume", "fragrance", "cologne", "eau de", "toilette", "parfum", "body mist",
        "น้ำหอม", "เพอร์ฟูม", "โคโลญ", "สเปรย์น้ำหอม"
    ])) return "fragrance";

    // ── Skincare / Makeup / Haircare / Sunscreen / Nail / Dental / Barbershop (before beauty) ──
    if (includesAny(t, [
        "skincare", "serum", "toner", "cleanser", "moisturizer", "essence", "ampoule", "retinol", "niacinamide", "hyaluronic",
        "สกินแคร์", "เซรั่ม", "โทนเนอร์", "คลีนเซอร์", "มอยเจอร์ไรเซอร์", "เอสเซนส์"
    ])) return "skincare";

    if (includesAny(t, [
        "makeup", "foundation", "mascara", "lipstick", "lip gloss", "eyeshadow", "blush", "concealer", "primer", "contour", "eyeliner",
        "เครื่องสำอาง", "รองพื้น", "มาสคาร่า", "ลิปสติก", "อายแชโดว์", "บลัช", "คอนซีลเลอร์", "ไพรเมอร์", "อายไลเนอร์"
    ])) return "makeup";

    if (includesAny(t, [
        "shampoo", "conditioner", "hair serum", "hair mask", "hair oil", "hair spray", "hair dryer", "hair straightener", "hair curler",
        "แชมพู", "ครีมนวด", "เซรั่มผม", "มาสก์ผม", "น้ำมันผม", "สเปรย์ผม", "ไดร์เป่าผม"
    ])) return "haircare";

    if (includesAny(t, [
        "sunscreen", "sunblock", "spf", "uv protection", "sun cream",
        "กันแดด", "ครีมกันแดด", "ซันสกรีน"
    ])) return "sunscreen";

    if (includesAny(t, [
        "nail polish", "nail art", "gel nail", "manicure", "pedicure", "nail file", "cuticle",
        "ยาทาเล็บ", "เล็บเจล", "ทำเล็บ", "ตะไบเล็บ"
    ])) return "nail";

    if (includesAny(t, [
        "soap", "bar soap", "liquid soap", "body wash", "hand wash", "shower gel",
        "สบู่", "ครีมอาบน้ำ", "เจลอาบน้ำ", "สบู่เหลว", "สบู่ล้างมือ"
    ])) return "soap";

    if (includesAny(t, [
        "toothpaste", "toothbrush", "mouthwash", "dental floss", "teeth whitening", "dental",
        "ยาสีฟัน", "แปรงสีฟัน", "น้ำยาบ้วนปาก", "ไหมขัดฟัน", "ฟอกฟันขาว"
    ])) return "dental";

    if (includesAny(t, [
        "barbershop", "barber", "clipper", "hair clipper", "razor", "shaving cream", "aftershave", "trimmer", "beard",
        "บาร์เบอร์", "ปัตตาเลี่ยน", "มีดโกน", "ครีมโกนหนวด", "เคราะ", "หนวด"
    ])) return "barbershop";

    // ── Vitamin / Protein / Weight-loss (before supplement) ──
    if (includesAny(t, [
        "vitamin", "multivitamin", "vitamin c", "vitamin d", "vitamin e", "vitamin b",
        "วิตามิน", "มัลติวิตามิน", "วิตามินซี"
    ])) return "vitamin";

    if (includesAny(t, [
        "protein powder", "whey protein", "whey", "bcaa", "creatine", "mass gainer", "protein shake",
        "โปรตีน", "เวย์โปรตีน", "บีซีเอเอ", "ครีเอทีน"
    ])) return "protein";

    if (includesAny(t, [
        "weight loss", "diet pill", "fat burner", "slimming", "appetite suppressant", "meal replacement",
        "ลดน้ำหนัก", "ยาลดความอ้วน", "เบิร์นไขมัน", "ทดแทนมื้ออาหาร"
    ])) return "weight-loss";

    // ── Supplement (before health/food) ──
    if (includesAny(t, [
        "supplement", "collagen", "probiotic", "omega", "fish oil", "biotin", "glutathione", "calcium", "zinc",
        "อาหารเสริม", "คอลลาเจน", "โพรไบโอติก", "น้ำมันปลา", "กลูตาไธโอน", "แคลเซียม"
    ])) return "supplement";

    // ── Massage / Essential-oil / Elderly / Medicine / Mental-health (before health) ──
    if (includesAny(t, [
        "massage", "massage oil", "massage ball", "massage gun", "spa", "hot pack", "cold pack",
        "นวด", "น้ำมันนวด", "ปืนนวด", "สปา", "ประคบ"
    ])) return "massage";

    if (includesAny(t, [
        "essential oil", "aromatherapy", "diffuser", "lavender oil", "tea tree oil", "eucalyptus",
        "น้ำมันหอมระเหย", "อโรมา", "ดิฟฟิวเซอร์", "ลาเวนเดอร์"
    ])) return "essential-oil";

    if (includesAny(t, [
        "elderly", "senior", "walker", "cane", "wheelchair", "adult diaper", "hearing aid",
        "ผู้สูงอายุ", "คนชรา", "ไม้เท้า", "รถเข็น", "ผ้าอ้อมผู้ใหญ่", "เครื่องช่วยฟัง"
    ])) return "elderly";

    if (includesAny(t, [
        "medicine", "drug", "antibiotic", "painkiller", "cough syrup", "nasal spray", "eye drops", "ointment", "capsule",
        "ยา", "ยาแก้ปวด", "ยาแก้ไอ", "สเปรย์จมูก", "ยาหยอดตา", "ขี้ผึ้ง"
    ])) return "medicine";

    if (includesAny(t, [
        "mental health", "meditation", "mindfulness", "stress relief", "anxiety", "journal", "therapy",
        "สุขภาพจิต", "สมาธิ", "ลดความเครียด", "บำบัด", "ไดอารี่บำบัด"
    ])) return "mental-health";

    // ── Phone / Laptop / Tablet / Camera / Audio / Gaming / Wearable / Drone / Charger (before gadget) ──
    if (includesAny(t, [
        "phone", "iphone", "samsung galaxy", "smartphone", "mobile phone", "phone case", "screen protector",
        "โทรศัพท์", "มือถือ", "ไอโฟน", "ซัมซุง", "เคสมือถือ", "ฟิล์มกันรอย"
    ])) return "phone";

    if (includesAny(t, [
        "laptop", "notebook", "macbook", "chromebook", "ultrabook", "laptop stand",
        "แล็ปท็อป", "โน้ตบุ๊ค", "แมคบุ๊ค"
    ])) return "laptop";

    if (includesAny(t, [
        "tablet", "ipad", "galaxy tab", "drawing tablet", "wacom", "stylus",
        "แท็บเล็ต", "ไอแพด", "ปากกาสไตลัส"
    ])) return "tablet";

    if (includesAny(t, [
        "camera", "dslr", "mirrorless", "lens", "tripod", "gopro", "action cam",
        "กล้อง", "เลนส์", "ขาตั้งกล้อง", "กล้องแอคชั่น"
    ])) return "camera";

    if (includesAny(t, [
        "headphone", "earbuds", "earphone", "speaker", "soundbar", "amplifier", "dac", "audio", "airpods",
        "หูฟัง", "ลำโพง", "ซาวด์บาร์", "แอร์พอด"
    ])) return "audio";

    if (includesAny(t, [
        "gaming", "game console", "playstation", "xbox", "nintendo", "game controller", "gaming mouse", "gaming keyboard",
        "เกมมิ่ง", "คอนโซล", "จอย", "เพลย์สเตชั่น"
    ])) return "gaming";

    if (includesAny(t, [
        "wearable", "fitness tracker", "smart band", "apple watch", "garmin", "fitbit",
        "สมาร์ทแบนด์", "ฟิตเนสแทรคเกอร์"
    ])) return "wearable";

    if (includesAny(t, [
        "drone", "quadcopter", "fpv", "dji", "aerial camera",
        "โดรน", "กล้องบินได้"
    ])) return "drone";

    if (includesAny(t, [
        "charger", "powerbank", "power bank", "charging cable", "usb cable", "wireless charger", "fast charger",
        "ชาร์จ", "พาวเวอร์แบงค์", "สายชาร์จ", "ที่ชาร์จไร้สาย"
    ])) return "charger";

    // ── Furniture / Bedding / Curtain / Rug / Lighting-decor / Storage / Mirror / Vase / Frame (before home) ──
    if (includesAny(t, [
        "furniture", "sofa", "table", "chair", "desk", "cabinet", "bookshelf", "wardrobe", "dresser",
        "เฟอร์นิเจอร์", "โซฟา", "โต๊ะ", "เก้าอี้", "ตู้", "ชั้นหนังสือ", "ตู้เสื้อผ้า"
    ])) return "furniture";

    if (includesAny(t, [
        "bedding", "bed sheet", "duvet", "comforter", "pillow", "mattress", "bed cover",
        "ผ้าปูที่นอน", "ผ้านวม", "หมอน", "ที่นอน", "ผ้าห่ม"
    ])) return "bedding";

    if (includesAny(t, [
        "curtain", "blinds", "drape", "window shade", "blackout curtain",
        "ผ้าม่าน", "มู่ลี่", "ม่านกันแดด", "ม่านทึบ"
    ])) return "curtain";

    if (includesAny(t, [
        "rug", "carpet", "floor mat", "doormat", "area rug",
        "พรม", "พรมเช็ดเท้า", "พรมปูพื้น"
    ])) return "rug";

    if (includesAny(t, [
        "lamp", "light fixture", "chandelier", "string lights", "led strip", "night light", "fairy lights",
        "โคมไฟ", "โคมระย้า", "ไฟ led", "ไฟประดับ"
    ])) return "lighting-decor";

    if (includesAny(t, [
        "storage box", "organizer", "shelf", "basket", "container", "drawer organizer",
        "กล่องเก็บของ", "ที่จัดระเบียบ", "ชั้นวาง", "ตะกร้า"
    ])) return "storage";

    if (includesAny(t, [
        "mirror", "wall mirror", "vanity mirror", "floor mirror", "compact mirror",
        "กระจก", "กระจกแต่งตัว", "กระจกติดผนัง"
    ])) return "mirror";

    if (includesAny(t, [
        "vase", "flower vase", "ceramic vase", "glass vase",
        "แจกัน", "แจกันดอกไม้"
    ])) return "vase";

    if (includesAny(t, [
        "picture frame", "photo frame", "wall frame", "art frame",
        "กรอบรูป", "กรอบรูปติดผนัง"
    ])) return "frame";

    // ── Rice-cooker / Blender / Air-fryer / Vacuum / Washer / Fridge / Air-purifier / Water-filter / Smart-home (before kitchen) ──
    if (includesAny(t, [
        "rice cooker", "หม้อหุงข้าว"
    ])) return "rice-cooker";

    if (includesAny(t, [
        "blender", "food processor", "juicer", "mixer",
        "เครื่องปั่น", "เครื่องคั้นน้ำ"
    ])) return "blender";

    if (includesAny(t, [
        "air fryer", "หม้อทอดไร้น้ำมัน", "แอร์ฟรายเออร์"
    ])) return "air-fryer";

    if (includesAny(t, [
        "vacuum", "vacuum cleaner", "robot vacuum", "handheld vacuum",
        "เครื่องดูดฝุ่น", "หุ่นยนต์ดูดฝุ่น"
    ])) return "vacuum";

    if (includesAny(t, [
        "washing machine", "washer", "dryer", "laundry machine",
        "เครื่องซักผ้า", "เครื่องอบผ้า"
    ])) return "washer";

    if (includesAny(t, [
        "refrigerator", "fridge", "freezer", "mini fridge",
        "ตู้เย็น", "ตู้แช่", "ตู้แช่แข็ง"
    ])) return "fridge";

    if (includesAny(t, [
        "air purifier", "เครื่องฟอกอากาศ"
    ])) return "air-purifier";

    if (includesAny(t, [
        "water filter", "water purifier", "water dispenser",
        "เครื่องกรองน้ำ", "ตู้กดน้ำ"
    ])) return "water-filter";

    if (includesAny(t, [
        "smart home", "smart plug", "smart light", "smart lock", "alexa", "google home", "home assistant",
        "สมาร์ทโฮม", "ปลั๊กอัจฉริยะ", "ล็อคอัจฉริยะ"
    ])) return "smart-home";

    // ── Motorcycle / Bicycle / Car-accessory / EV (before auto) ──
    if (includesAny(t, [
        "motorcycle", "motorbike", "scooter", "moped", "helmet", "motorcycle jacket",
        "มอเตอร์ไซค์", "รถจักรยานยนต์", "สกู๊ตเตอร์", "หมวกกันน็อค"
    ])) return "motorcycle";

    if (includesAny(t, [
        "bicycle", "bike", "cycling", "mountain bike", "road bike", "bike light", "bike lock",
        "จักรยาน", "ปั่นจักรยาน", "เสือภูเขา", "ไฟจักรยาน"
    ])) return "bicycle";

    if (includesAny(t, [
        "dash cam", "car charger", "car mount", "seat cover", "car freshener", "car vacuum", "car accessory",
        "กล้องติดรถ", "ที่ชาร์จในรถ", "ที่จับมือถือในรถ", "ผ้าคลุมเบาะ"
    ])) return "car-accessory";

    if (includesAny(t, [
        "ev", "electric vehicle", "ev charger", "charging station", "tesla", "ev adapter",
        "รถไฟฟ้า", "ที่ชาร์จรถไฟฟ้า", "สถานีชาร์จ"
    ])) return "ev";

    // ── Kids-education / Maternity / Family (before baby) ──
    if (includesAny(t, [
        "kids education", "learning toy", "flash card", "kids tablet", "educational", "abc",
        "ของเล่นเสริมพัฒนาการ", "แฟลชการ์ด", "สื่อการเรียน"
    ])) return "kids-education";

    if (includesAny(t, [
        "maternity", "pregnancy", "prenatal", "nursing", "breast pump", "maternity belt", "postnatal",
        "คนท้อง", "ตั้งครรภ์", "ให้นม", "เครื่องปั๊มนม", "เข็มขัดพยุงครรภ์"
    ])) return "maternity";

    if (includesAny(t, [
        "family game", "family activity", "family picnic", "family set",
        "กิจกรรมครอบครัว", "เซ็ตครอบครัว"
    ])) return "family";

    // ── Sports / Camping / Yoga (before fitness/outdoor) ──
    if (includesAny(t, [
        "sports", "ball", "football", "basketball", "badminton", "tennis", "golf", "soccer",
        "กีฬา", "ฟุตบอล", "บาสเก็ตบอล", "แบดมินตัน", "เทนนิส", "กอล์ฟ"
    ])) return "sports";

    if (includesAny(t, [
        "camping", "tent", "sleeping bag", "camp stove", "camping chair", "cooler box", "lantern",
        "แคมปิ้ง", "เต็นท์", "ถุงนอน", "เตาแคมป์", "โคมไฟแคมป์"
    ])) return "camping";

    if (includesAny(t, [
        "yoga", "yoga mat", "yoga block", "yoga strap", "meditation cushion", "pilates",
        "โยคะ", "เสื่อโยคะ", "บล็อคโยคะ", "พิลาทิส"
    ])) return "yoga";

    // ── Office / Course (before digital/stationery) ──
    if (includesAny(t, [
        "office chair", "office desk", "printer", "scanner", "paper shredder", "whiteboard", "projector",
        "เก้าอี้สำนักงาน", "โต๊ะทำงาน", "เครื่องพิมพ์", "กระดานไวท์บอร์ด"
    ])) return "office";

    if (includesAny(t, [
        "course", "online course", "class", "workshop", "training", "certification", "tutorial video",
        "คอร์ส", "คอร์สออนไลน์", "เวิร์คช็อป", "คลาสเรียน", "ใบรับรอง"
    ])) return "course";

    // ── Detergent / Air-freshener / Insect / Garden (before cleaning) ──
    if (includesAny(t, [
        "detergent", "laundry detergent", "fabric softener", "washing powder", "laundry pod",
        "ผงซักฟอก", "น้ำยาซักผ้า", "น้ำยาปรับผ้านุ่ม", "น้ำยาซักผ้าเด็ก"
    ])) return "detergent";

    if (includesAny(t, [
        "air freshener", "room spray", "reed diffuser", "scented candle", "car freshener",
        "สเปรย์ปรับอากาศ", "น้ำหอมปรับอากาศ", "เทียนหอม", "ก้านหอม"
    ])) return "air-freshener";

    if (includesAny(t, [
        "insect repellent", "mosquito", "bug spray", "ant killer", "cockroach", "insecticide", "pest control",
        "ยากันยุง", "สเปรย์กันแมลง", "ยาฆ่ามด", "ยาฆ่าแมลงสาบ", "กำจัดแมลง"
    ])) return "insect";

    if (includesAny(t, [
        "garden", "plant pot", "seed", "fertilizer", "gardening tool", "watering can", "pruning shears", "soil",
        "สวน", "กระถาง", "เมล็ดพันธุ์", "ปุ๋ย", "อุปกรณ์สวน", "บัวรดน้ำ", "กรรไกรตัดกิ่ง", "ดิน"
    ])) return "garden";

    // ── Bakery / Snack / Organic / Frozen-food / Condiment (before food) ──
    // IMPORTANT: bakery MUST be checked BEFORE snack because "ขนม" in snack
    // uses substring matching and would catch "ขนมชั้น"/"ขนมหวาน"/"ขนมไทย" first.
    if (includesAny(t, [
        "bakery", "bread", "cake", "pastry", "croissant", "donut", "muffin", "pie", "tart", "dessert", "sweet", "kanom",
        "เบเกอรี่", "ขนมปัง", "เค้ก", "ครัวซองต์", "โดนัท", "มัฟฟิน", "พาย", "ขนมหวาน", "ขนมชั้น", "ขนมไทย"
    ])) return "bakery";

    if (includesAny(t, [
        "snack", "chips", "cookie", "candy", "popcorn", "cracker", "granola bar", "dried fruit",
        "ขนม", "มันฝรั่ง", "คุกกี้", "ลูกอม", "ป๊อปคอร์น", "แครกเกอร์", "ผลไม้อบแห้ง"
    ])) return "snack";

    if (includesAny(t, [
        "organic", "organic food", "non-gmo", "pesticide-free", "farm-to-table",
        "ออร์แกนิค", "อาหารออร์แกนิค", "ปลอดสารเคมี"
    ])) return "organic";

    if (includesAny(t, [
        "frozen food", "frozen", "ice cream", "frozen meal", "frozen pizza",
        "อาหารแช่แข็ง", "แช่แข็ง", "ไอศกรีม"
    ])) return "frozen-food";

    if (includesAny(t, [
        "condiment", "sauce", "seasoning", "ketchup", "mayonnaise", "soy sauce", "chili sauce", "dressing",
        "เครื่องปรุง", "ซอส", "เครื่องเทศ", "ซีอิ๊ว", "น้ำปลา", "ซอสพริก", "น้ำสลัด"
    ])) return "condiment";

    // ── Existing broad checks ──
    if (includesAny(t, [
        "baby", "infant", "toddler", "newborn", "diaper", "pacifier", "stroller", "baby bottle", "baby food",
        "เด็ก", "ทารก", "ผ้าอ้อม", "จุกนม", "รถเข็นเด็ก", "ขวดนม", "อาหารเด็ก", "แม่และเด็ก"
    ])) return "baby";

    if (includesAny(t, [
        "pet", "dog", "cat", "puppy", "kitten", "pet food", "pet toy", "collar", "leash", "aquarium",
        "สัตว์เลี้ยง", "หมา", "แมว", "สุนัข", "อาหารสัตว์", "ปลอกคอ", "สายจูง", "ตู้ปลา"
    ])) return "pet";

    if (includesAny(t, [
        "fitness", "gym", "workout", "exercise", "dumbbell", "resistance band", "kettlebell", "treadmill",
        "ฟิตเนส", "ออกกำลังกาย", "ยิม", "ดัมเบล", "ยางยืด"
    ])) return "fitness";

    if (includesAny(t, [
        "car", "auto", "automotive", "vehicle", "tire", "engine",
        "รถยนต์", "รถ", "ยาง", "อุปกรณ์รถ", "น้ำมันเครื่อง"
    ])) return "auto";

    if (includesAny(t, [
        "kitchen", "cookware", "pan", "pot", "wok", "knife", "cutting board", "spatula", "oven",
        "เครื่องครัว", "กระทะ", "หม้อ", "มีด", "เขียง", "เตาอบ"
    ])) return "kitchen";

    if (includesAny(t, [
        "cleaning", "cleaner", "disinfectant", "mop", "broom", "bleach",
        "ทำความสะอาด", "น้ำยา", "ไม้ถูพื้น"
    ])) return "cleaning";

    if (includesAny(t, [
        "book", "novel", "manga", "comic", "textbook", "audiobook",
        "หนังสือ", "นิยาย", "มังงะ", "การ์ตูน", "ตำรา"
    ])) return "book";

    if (includesAny(t, [
        "toy", "toys", "lego", "action figure", "board game", "puzzle", "plush", "doll", "rc car",
        "ของเล่น", "เลโก้", "ตุ๊กตา", "บอร์ดเกม", "จิ๊กซอว์", "โมเดล"
    ])) return "toy";

    if (includesAny(t, [
        "stationery", "pen", "pencil", "notebook", "planner", "marker", "highlighter",
        "เครื่องเขียน", "ปากกา", "ดินสอ", "สมุด", "แพลนเนอร์"
    ])) return "stationery";

    if (includesAny(t, [
        "outdoor", "hiking", "backpacking", "flashlight", "compass", "fishing", "hammock",
        "เดินป่า", "ไฟฉาย", "ตกปลา", "เปลญวน", "เอาท์ดอร์"
    ])) return "outdoor";

    if (includesAny(t, [
        "health", "medical", "thermometer", "blood pressure", "oximeter", "first aid", "bandage", "sanitizer",
        "สุขภาพ", "เครื่องวัดความดัน", "เทอร์โมมิเตอร์", "ปฐมพยาบาล", "หน้ากาก", "เจลล้างมือ"
    ])) return "health";

    if (includesAny(t, [
        "craft", "diy", "handmade", "knitting", "crochet", "sewing", "embroidery", "resin", "pottery", "clay",
        "งานฝีมือ", "ถักโครเชต์", "เย็บปักถักร้อย", "เรซิน", "ปั้นดิน", "แฮนด์เมด"
    ])) return "craft";

    if (includesAny(t, [
        "digital", "software", "app", "subscription", "saas", "template", "preset", "plugin",
        "ดิจิทัล", "ซอฟต์แวร์", "แอป", "เทมเพลต", "พรีเซ็ต", "ปลั๊กอิน"
    ])) return "digital";

    // ── Broad parent categories (checked after specific sub-categories) ──
    if (includesAny(t, [
        "food", "noodle", "ramen", "rice", "chocolate", "instant", "instant noodle", "cup noodle",
        "อาหาร", "ของกิน", "บะหมี่", "ก๋วยเตี๋ยว", "ข้าว", "มาม่า", "บะหมี่กึ่งสำเร็จรูป", "ยำยำ", "ไวไว"
    ])) return "food";

    if (includesAny(t, [
        "shirt", "t-shirt", "hoodie", "jacket", "pants", "jeans", "dress", "skirt",
        "fashion", "outfit", "fabric", "clothing", "apparel", "wear",
        "เสื้อ", "กางเกง", "เดรส", "กระโปรง", "ชุด", "ผ้า", "แฟชั่น"
    ])) return "fashion";

    if (includesAny(t, [
        "gadget", "device", "electronics", "bluetooth", "usb", "monitor",
        "แกดเจ็ต", "อิเล็กทรอนิกส์"
    ])) return "gadget";

    if (includesAny(t, [
        "beauty", "cosmetic", "lotion", "cream",
        "ความงาม", "เครื่องสำอาง", "ลิป", "ครีม", "โฟม", "บำรุง", "โลชั่น",
        "crystal", "bright crystal", "versace"
    ])) return "beauty";

    if (includesAny(t, [
        "home", "decor", "candle",
        "บ้าน", "ตกแต่ง", "เทียนหอม", "ที่เก็บของ"
    ])) return "home";

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
    const sceneCount = getStoryboardSceneCount(config.clipDuration ?? 16);
    const productName = config.productName;
    const rawHook = (config.hookText || "").trim()
        ? config.hookText!
        : pickRandom(HOOK_VARIATIONS[config.template] || HOOK_VARIATIONS["product-review"]);
    const rawCta = (config.ctaText || "").trim()
        ? config.ctaText!
        : pickRandom(CTA_VARIATIONS[config.saleStyle] || CTA_VARIATIONS["storytelling"]);

    const hook = ensureMentionsProductName(rawHook, productName);
    const cta = ensureMentionsProductName(rawCta, productName);

    const scene2CoreByCategory: Partial<Record<ProductCategory, string>> = {
        food: "โชว์เนื้อสัมผัส/ไอน้ำ/ความนัว + คำแรก/คำต่อไปให้เห็น reaction",
        beverage: "โชว์การเท/ริน/ชง + สีสันของเครื่องดื่ม + reaction จิบคำแรก",
        fashion: "โชว์ฟิตติ้ง/ทรง/เนื้อผ้า + before/after look + เดิน/หมุนให้เห็น movement",
        gadget: "เดโมฟีเจอร์ 1-2 อย่างแบบ hands-on + ผลลัพธ์ที่จับต้องได้",
        beauty: "โชว์ก่อน-หลัง/เท็กซ์เจอร์/วิธีใช้แบบสั้นๆ (หลีกเลี่ยงเคลมเกินจริง)",
        supplement: "โชว์เม็ด/แคปซูล + วิธีทาน + ประโยชน์หลักที่เห็นผลจริง",
        pet: "โชว์สัตว์เลี้ยงใช้/กิน/เล่นสินค้า + reaction น่ารักของสัตว์เลี้ยง",
        baby: "โชว์ความปลอดภัย/ความนุ่ม + เด็กหรือพ่อแม่ใช้จริง + ความไว้ใจ",
        home: "โชว์การจัดวาง/ใช้งานในบ้านจริง + ก่อน-หลังตกแต่ง + ความสะดวก",
        kitchen: "โชว์การทำอาหาร/ใช้งานจริง + ผลลัพธ์อาหารที่ออกมา + ง่ายมาก",
        fitness: "โชว์การออกกำลังกายใช้จริง + ท่าทาง/ฟอร์ม + ผลลัพธ์ที่เห็นได้",
        auto: "โชว์การติดตั้ง/ใช้งานกับรถจริง + ฟีเจอร์เด่น + ความแตกต่าง",
        jewelry: "โชว์ความวิบวับ/ดีเทล + สวมใส่จริง + มุมต่างๆ ที่เห็นความสวย",
        watch: "โชว์หน้าปัด/สาย/ดีเทล + สวมข้อมือจริง + ความเป็นพรีเมียม",
        bag: "โชว์ช่องใส่ของ/วัสดุ/ดีเทล + สะพาย/ถือจริง + ลุคที่ได้",
        shoe: "โชว์ทรง/พื้น/วัสดุ + สวมใส่เดินจริง + ความสบาย/สไตล์",
        book: "โชว์ปก/เนื้อหาข้างใน + อ่าน/พลิกหน้าจริง + ความน่าสนใจ",
        toy: "โชว์การเล่น/ฟีเจอร์สนุกๆ + สีสัน/ดีเทล + ความตื่นเต้นที่ได้",
        stationery: "โชว์การเขียน/วาด/ใช้งาน + ดีเทลวัสดุ + ความลื่น/สะดวก",
        cleaning: "โชว์ก่อน-หลังทำความสะอาด + ประสิทธิภาพจริง + ง่ายและเร็ว",
        outdoor: "โชว์การใช้งานกลางแจ้ง + ความทนทาน/สะดวก + บรรยากาศผจญภัย",
        health: "โชว์วิธีใช้/วัดค่า + ความแม่นยำ/น่าเชื่อถือ + ดูแลสุขภาพง่ายขึ้น",
        craft: "โชว์กระบวนการสร้างสรรค์ + วัสดุ/เท็กซ์เจอร์ + ผลงานที่ออกมา",
        digital: "โชว์หน้าจอ/UI/ฟีเจอร์ + ใช้งานจริง + ผลลัพธ์ที่ได้ทันที",
        other: "เดโมการใช้งานจริง/จุดเด่น 1-2 ข้อ + ผลลัพธ์ที่จับต้องได้"
    };

    const scene1Text = `0-8s: HOOK (หยุดนิ้ว)\n- Visual: Close-up + reveal\n- Voice: "${hook}"`;

    const scene2Text = sceneCount >= 2
        ? `8-16s: DEMO / KEY MESSAGE\n- Visual: ${scene2CoreByCategory[category] || scene2CoreByCategory["other"]}\n- Key message: (ต้องมีชื่อสินค้า ${productName} + ประโยชน์หลัก 1 ข้อ)`
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

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY-SPECIFIC SALES COPY — ทุก category มี power words, benefits, urgency เฉพาะ
// ═══════════════════════════════════════════════════════════════════════════

// Category-specific Power Words — คำที่กระตุ้นความสนใจตรงกลุ่มเป้าหมาย
const CATEGORY_POWER_WORDS: Partial<Record<ProductCategory, string[]>> = {
    food: ["อร่อยมาก", "รสชาติเข้มข้น", "ฟินสุดๆ", "กินแล้วหยุดไม่ได้", "รสดีเกินคาด", "เข้มข้นลงตัว", "อร่อยจนต้องซ้ำ"],
    snack: ["กรอบมาก", "รสชาติเข้มข้น", "กินแล้วหยุดไม่ได้", "อร่อยจัด", "เคี้ยวสนุก", "ฟินทุกคำ"],
    bakery: ["นุ่มมาก", "หอมเนย", "ฟูนุ่ม", "ละลายในปาก", "อร่อยเกินคาด", "หอมกรุ่น"],
    beverage: ["ชื่นใจมาก", "รสชาติกลมกล่อม", "สดชื่นทันที", "ดื่มแล้วฟิน", "หอมละมุน", "รสเข้มข้น", "ซดแล้วสะใจ"],
    coffee: ["หอมเข้มข้น", "รสชาติกลมกล่อม", "ตื่นตัวทันที", "ดื่มแล้วฟิน", "คั่วมาใหม่", "กาแฟเกรดพรีเมียม"],
    alcohol: ["รสชาติกลมกล่อม", "ดื่มแล้วฟิน", "หอมละมุน", "รสเข้มข้น", "พรีเมียมมาก"],
    fashion: ["ใส่แล้วดูดี", "เนื้อผ้าดีมาก", "สวยเกินคาด", "ทรงสวยมาก", "แมตช์ง่าย", "ดูแพงมาก", "ใส่สบายมาก"],
    sportswear: ["ใส่สบาย", "ระบายอากาศดี", "ยืดหยุ่นมาก", "เหงื่อแห้งเร็ว", "ใส่ออกกำลังกายดี", "ไม่อึดอัด"],
    laptop: ["จอคมชัดมาก", "เล่นเกมลื่น", "เบาบางพกง่าย", "สเปคจัดเต็ม", "คีย์บอร์ดพิมพ์สนุก", "ตัดต่อก็ลื่น", "แรงสะใจ"],
    phone: ["กล้องถ่ายสวยมาก", "จอสีสดเวอร์", "เร็วมาก", "ดีไซน์หรู", "แบตอึดมาก", "ถ่ายวีดีโอคมชัด", "จอใหญ่สวย"],
    tablet: ["จอใหญ่สวยมาก", "วาดรูปลื่น", "ดูหนังฟินมาก", "เบาถือสบาย", "ใช้ปากกาได้", "ทำงานได้จริง", "จอสีสดเวอร์"],
    gaming: ["เล่นเกมมันส์มาก", "ตอบสนองเร็ว", "RGB สวยจัด", "กดสนุก", "ไม่แลค", "เกมเมอร์ต้องมี", "สเปคเทพ"],
    audio: ["เสียงดีมาก", "เบสหนักสะใจ", "ตัดเสียงดีเยี่ยม", "ใส่สบายมาก", "ชาร์จเร็ว", "เชื่อมต่อง่าย", "เสียงใสมาก"],
    wearable: ["เช็คสุขภาพง่าย", "ดีไซน์สวย", "ใส่สบาย", "แบตอึด", "ฟีเจอร์ครบ", "ติดตามการออกกำลังกาย"],
    camera: ["ถ่ายคมชัดมาก", "สีสวยสมจริง", "โฟกัสเร็ว", "ถ่ายวีดีโอสวย", "กันสั่น", "เลนส์คุณภาพ"],
    gadget: ["เทคโนโลยีล้ำ", "ฟีเจอร์ครบ", "ใช้ง่ายมาก", "ดีเกินคาดมาก", "ดีไซน์สวย", "ทำงานเร็วมาก", "สเปกจัดเต็ม"],
    skincare: ["ผิวเนียนขึ้น", "ซึมเร็วมาก", "ไม่เหนียว", "ผิวชุ่มชื้น", "หน้าใส", "ลดสิว", "ผิวกระจ่างใส"],
    makeup: ["สีสวยมาก", "เกลี่ยง่าย", "ติดทนทั้งวัน", "สวยปังมาก", "เม็ดสีแน่น", "ไม่เลอะ"],
    fragrance: ["กลิ่นหอมหรู", "ติดทนนาน", "กลิ่นไม่ฉุน", "หอมตลอดวัน", "กลิ่นลงตัว", "พรีเมียมมาก"],
    sunscreen: ["กันแดดดี", "ไม่วอก", "เกลี่ยง่าย", "ไม่อุดตัน", "ปกป้องผิว", "เนื้อบางเบา"],
    haircare: ["ผมนุ่มสลวย", "เงางามมาก", "ไม่ชี้ฟู", "บำรุงล้ำลึก", "กลิ่นหอม", "ผมสุขภาพดี"],
    beauty: ["ผิวสวยขึ้นจริง", "เนียนละเอียด", "กลิ่นหอมมาก", "ติดทนนาน", "ผิวเปล่งประกาย", "เนื้อบางเบา", "เกลี่ยง่ายมาก"],
    supplement: ["เห็นผลจริง", "ร่างกายดีขึ้น", "พลังงานเพิ่ม", "สุขภาพดี", "ทานง่าย", "ดูดซึมเร็ว", "สารอาหารครบ"],
    vitamin: ["สุขภาพดีขึ้น", "ทานง่าย", "เห็นผลจริง", "เสริมภูมิ", "ร่างกายแข็งแรง", "ผิวสวยขึ้น"],
    protein: ["ชงง่าย", "รสชาติอร่อย", "กล้ามโต", "ดูดซึมเร็ว", "ไม่มีกลิ่นคาว", "เวย์คุณภาพ"],
    pet: ["น้องชอบมาก", "ปลอดภัย 100%", "คุณภาพดี", "น้องกินเพลิน", "สัตวแพทย์แนะนำ", "น้องมีความสุข", "วัตถุดิบดี"],
    baby: ["ปลอดภัยสำหรับลูก", "อ่อนโยนมาก", "ลูกชอบมาก", "คุณแม่วางใจ", "ผ่านมาตรฐาน", "นุ่มสบาย", "ไม่ระคายเคือง"],
    home: ["บ้านดูดีขึ้น", "ใช้งานง่าย", "ดีไซน์สวย", "คุณภาพเยี่ยม", "จัดระเบียบง่าย", "ประหยัดพื้นที่", "เปลี่ยนบ้านเลย"],
    furniture: ["นั่งสบายมาก", "ดีไซน์สวย", "แข็งแรงทนทาน", "เข้ากับห้อง", "คุณภาพดี", "ใช้งานง่าย"],
    kitchen: ["ทำอาหารง่ายขึ้น", "ทนทานมาก", "ประหยัดเวลา", "ใช้สะดวก", "ล้างง่าย", "ความร้อนสม่ำเสมอ", "มืออาชีพเลย"],
    fitness: ["กล้ามเนื้อชัดขึ้น", "เทรนได้เต็มที่", "ทนทานมาก", "จับถนัดมือ", "ฟิตหนักได้", "คุณภาพยิม", "เห็นผลจริง"],
    yoga: ["ยืดหยุ่นดี", "กันลื่นเยี่ยม", "ใช้สบาย", "เนื้อวัสดุดี", "ผ่อนคลายมาก", "ช่วยทรงตัว"],
    camping: ["ตั้งง่ายมาก", "ทนทุกสภาพอากาศ", "พกพาสะดวก", "คุณภาพดี", "น้ำหนักเบา", "กางง่ายพับง่าย"],
    auto: ["ติดตั้งง่าย", "ทนทานมาก", "ใช้งานสะดวก", "คุณภาพสูง", "เข้ากับรถทุกรุ่น", "ดีไซน์สวย", "ดีเกินคาด"],
    jewelry: ["สวยหรูมาก", "ประกายวิบวับ", "งานละเอียด", "ใส่แล้วดูแพง", "เพชรเจิดจรัส", "ดีไซน์หรู", "คุณภาพเยี่ยม"],
    watch: ["หรูหรามาก", "เครื่องแม่นยำ", "ดูดีมาก", "งานประณีต", "ใส่แล้วมีออร่า", "คลาสสิกเหนือกาล", "สวยทุกมุม"],
    bag: ["ใส่ของได้เยอะ", "หนังคุณภาพดี", "ทรงสวยมาก", "สะพายสบาย", "ดูแพงมาก", "ทนทานมาก", "แมตช์ทุกลุค"],
    shoe: ["ใส่สบายมาก", "พื้นนุ่ม", "ดีไซน์สวย", "เดินทั้งวันไม่เจ็บ", "ทรงสวย", "ระบายอากาศดี", "กระชับเท้า"],
    sunglasses: ["ใส่แล้วเท่มาก", "กันแดดดี", "เลนส์คมชัด", "น้ำหนักเบา", "ดีไซน์หรู", "กรอบทนทาน"],
    book: ["อ่านสนุกมาก", "เนื้อหาดี", "วางไม่ลง", "เปลี่ยนมุมมอง", "ได้ความรู้เพียบ", "เขียนดีมาก", "อ่านจบในวันเดียว"],
    toy: ["เล่นสนุกมาก", "สีสันสดใส", "พัฒนาสมอง", "ปลอดภัย", "เด็กชอบมาก", "เล่นได้นาน", "วัสดุดี"],
    stationery: ["เขียนลื่นมาก", "ดีไซน์สวย", "จับถนัดมือ", "สีสดสวย", "คุณภาพดี", "ใช้แล้วติดใจ", "เขียนสบาย"],
    dental: ["ฟันขาวขึ้น", "สะอาดหมดจด", "ลมหายใจสดชื่น", "ฟอกขาวจริง", "สูตรฟลูออไรด์", "เหงือกแข็งแรง", "ยิ้มมั่นใจ"],
    cleaning: ["สะอาดหมดจด", "ขจัดคราบง่าย", "กลิ่นหอมสะอาด", "ใช้ง่าย", "ทรงพลัง", "ฆ่าเชื้อ 99%", "คราบหลุดทันที"],
    outdoor: ["ทนทุกสภาพอากาศ", "พกพาสะดวก", "น้ำหนักเบา", "คุณภาพสูง", "ใช้งานง่าย", "เหมาะกับทุกทริป", "กันน้ำได้"],
    health: ["แม่นยำมาก", "ใช้ง่าย", "ผลลัพธ์น่าเชื่อถือ", "ดูแลสุขภาพได้", "วัดผลเร็ว", "มาตรฐานแพทย์", "พกพาสะดวก"],
    craft: ["งานออกมาสวย", "ใช้ง่ายมาก", "สีสดสวย", "ทำตามง่าย", "สนุกมาก", "คุณภาพดี", "DIY สำเร็จ"],
    digital: ["ใช้ง่ายมาก", "ฟีเจอร์เพียบ", "ทำงานเร็ว", "คุ้มค่า", "ครบจบในแอปเดียว", "UI สวยมาก", "ตอบโจทย์เลย"],
    other: ["ดีเกินคาด", "ประทับใจมาก", "ต้องมี", "ขายดีมาก", "ฮิตสุดๆ", "ของดี", "ไม่ผิดหวัง"]
};

// Category-specific Benefits — ประโยชน์เฉพาะกลุ่มสินค้า
const CATEGORY_BENEFITS: Partial<Record<ProductCategory, string[]>> = {
    food: ["รสชาติถูกปาก ทุกคำฟินหมด", "วัตถุดิบคุณภาพ อร่อยจริง", "ทานแล้วอิ่มอร่อย คุ้มค่า", "กินง่าย อร่อยทุกมื้อ"],
    snack: ["กินเพลิน หยุดไม่ได้", "กรอบทุกคำ รสชาติจัด", "พกพาง่าย กินได้ทุกที่"],
    bakery: ["นุ่มฟู หอมเนยกรุ่น", "กินแล้วละลายในปาก", "อร่อยเกินคาด สดใหม่ทุกวัน"],
    beverage: ["ดื่มแล้วสดชื่น ตื่นตัวทันที", "รสชาติลงตัว หอมกลมกล่อม", "ชงง่าย ได้รสเข้มข้น", "ดื่มทุกวันก็ไม่เบื่อ"],
    coffee: ["หอมเข้มข้น ดื่มแล้วตื่นตัว", "ชงง่าย ได้รสพรีเมียม", "ดื่มทุกเช้า ตื่นตัวทันที"],
    alcohol: ["รสชาติกลมกล่อม ดื่มแล้วฟิน", "หอมละมุน เหมาะกับทุกโอกาส"],
    fashion: ["ใส่แมตช์ได้ทุกวัน ทุกโอกาส", "เนื้อผ้าดี ใส่สบายตลอดวัน", "ทรงสวย ใส่แล้วดูดีทันที", "สวมใส่ง่าย ดูมีสไตล์"],
    sportswear: ["ใส่ออกกำลังกายสบายมาก", "ระบายเหงื่อดี ไม่ร้อน", "ยืดหยุ่นดี ไม่อึดอัด"],
    laptop: ["จอคมชัดสีสดมาก ดูแล้วฟิน", "เล่นเกมลื่นมาก แรงสะใจ", "เบาบาง พกพาสะดวกมาก", "สเปคแรง ทำทุกอย่างได้", "คีย์บอร์ดพิมพ์สนุก ไฟสวย", "ตัดต่อวีดีโอก็ลื่นมาก"],
    phone: ["กล้องถ่ายสวย ภาพคมชัด", "จอสีสดมาก ดูวีดีโอฟิน", "เร็วมาก เปิดแอปปุ๊บเลย", "ดีไซน์หรู จับถนัดมือ", "แบตอึด ใช้ได้ทั้งวัน", "ถ่ายวีดีโอ 4K สวยมาก"],
    tablet: ["จอใหญ่สวย วาดรูปลื่น", "ดูหนังจอใหญ่ ฟินมาก", "ใช้ปากกาเขียนได้เลย", "เบามาก ถือไม่เมื่อย", "ทำงานได้เหมือนโน้ตบุ๊ค"],
    gaming: ["เล่นเกมมันส์มาก ตอบสนองเร็ว", "RGB สวยจัด บรรยากาศเกมมิ่ง", "กดสนุก ไม่แลค", "สเปคเทพ เกมเมอร์ต้องมี"],
    audio: ["เสียงดีมาก เบสหนัก", "ตัดเสียงรบกวนดีเยี่ยม", "ใส่สบาย ใช้ได้ทั้งวัน", "เชื่อมต่อง่าย ชาร์จเร็ว"],
    wearable: ["เช็คสุขภาพง่าย ฟีเจอร์ครบ", "ดีไซน์สวย ใส่ได้ทุกวัน", "ติดตามการออกกำลังกายได้"],
    camera: ["ถ่ายรูปคมชัด สีสวยสมจริง", "โฟกัสเร็ว ภาพคมชัดทุกสถานการณ์", "ถ่ายวีดีโอสวยระดับมืออาชีพ"],
    gadget: ["ฟีเจอร์ครบจบในเครื่องเดียว", "ใช้งานง่าย เข้าใจทันที", "ช่วยให้ชีวิตสะดวกขึ้นจริง", "เทคโนโลยีล้ำ ดีเกินคาด"],
    skincare: ["ทาแล้วผิวเนียนขึ้นจริง", "ซึมเร็ว ไม่เหนียว ไม่อุดตัน", "ผิวชุ่มชื้น กระจ่างใส"],
    makeup: ["สีสวย เกลี่ยง่าย ติดทนทั้งวัน", "แต่งหน้าสวยปัง เม็ดสีแน่น", "ไม่เลอะ สวยทั้งวัน"],
    fragrance: ["กลิ่นหอมหรู ติดทนนาน", "สเปรย์แล้วหอมตลอดวัน", "กลิ่นลงตัว ไม่ฉุน"],
    sunscreen: ["กันแดดดี ปกป้องผิวทั้งวัน", "ทาแล้วไม่วอก ไม่อุดตัน", "เนื้อบางเบา ซึมเร็ว"],
    haircare: ["ผมนุ่มสลวย เงางามตั้งแต่วันแรก", "ไม่ชี้ฟู ผมสุขภาพดี", "บำรุงล้ำลึก หอมตลอดวัน"],
    beauty: ["ทาแล้วผิวสวยขึ้นทันตา", "เนื้อบางเบา ซึมเร็ว ไม่เหนียว", "กลิ่นหอมละมุน ติดทนทั้งวัน", "ใช้แล้วผิวเปล่งประกาย"],
    supplement: ["ทานง่าย เห็นผลจริง", "ร่างกายดีขึ้น แข็งแรงขึ้น", "สารอาหารครบ ดูดซึมเร็ว", "ดูแลสุขภาพจากภายใน"],
    vitamin: ["ทานง่าย สุขภาพดีขึ้นทันตา", "เสริมภูมิคุ้มกัน ร่างกายแข็งแรง", "ผิวสวยขึ้น สุขภาพดีขึ้น"],
    protein: ["ชงง่าย รสชาติดี กล้ามโต", "ไม่มีกลิ่นคาว ดูดซึมเร็ว", "เวย์คุณภาพ ฟิตได้เต็มที่"],
    pet: ["น้องชอบมาก กินเกลี้ยง", "วัตถุดิบดี ปลอดภัยต่อน้อง", "น้องสุขภาพดี มีความสุข", "สัตวแพทย์รับรอง วางใจได้"],
    baby: ["ลูกใช้ได้อย่างปลอดภัย", "อ่อนโยน ไม่ระคายเคืองผิว", "คุณแม่วางใจ ลูกมีความสุข", "ผ่านมาตรฐานความปลอดภัย"],
    home: ["บ้านดูสวย จัดระเบียบง่าย", "เปลี่ยนบ้านให้ดูดีทันที", "ใช้งานสะดวก ออกแบบมาดี", "ประหยัดพื้นที่ ดูเรียบร้อย"],
    furniture: ["นั่งสบาย ดีไซน์สวยเข้ากับห้อง", "แข็งแรงทนทาน ใช้ได้นาน", "คุณภาพดี คุ้มค่ามาก"],
    kitchen: ["ทำอาหารง่ายขึ้น ประหยัดเวลา", "ทนความร้อน ใช้ได้นาน", "ล้างง่าย ดูแลสะดวก", "เหมือนได้เชฟมาช่วยทำอาหาร"],
    fitness: ["เทรนได้เต็มประสิทธิภาพ", "กล้ามเนื้อชัดขึ้น เห็นผลเร็ว", "ทนทาน ฟิตหนักได้ทุกวัน", "เหมือนมีเทรนเนอร์ส่วนตัว"],
    yoga: ["ยืดหยุ่นดี กันลื่นเยี่ยม", "ใช้สบายมาก ช่วยทรงตัว", "เนื้อวัสดุดี ผ่อนคลายสุด"],
    camping: ["ตั้งง่าย ใช้ได้ทันที", "ทนทุกสภาพอากาศ ใช้ได้นาน", "พกพาสะดวก น้ำหนักเบา"],
    auto: ["ติดตั้งง่าย ใช้ได้ทันที", "เข้ากับรถได้ทุกรุ่น ทุกยี่ห้อ", "ทนทาน ใช้งานได้ยาวนาน", "อัปเกรดรถให้ดีขึ้นทันที"],
    jewelry: ["ใส่แล้วดูมีราคา สง่างาม", "ประกายเพชรเจิดจรัส สะดุดตา", "งานละเอียด คุณภาพช่างฝีมือ", "เพิ่มออร่าให้ทุกลุค"],
    watch: ["ใส่แล้วดูมีระดับทันที", "เครื่องแม่นยำ เชื่อถือได้", "คลาสสิกเหนือกาล สวยทุกโอกาส", "หรูหราทุกมุมมอง"],
    bag: ["ใส่ของได้เยอะ จัดระเบียบง่าย", "สะพายสบาย ไม่ปวดไหล่", "หนังคุณภาพดี ยิ่งใช้ยิ่งสวย", "แมตช์ได้ทุกชุด ทุกโอกาส"],
    shoe: ["ใส่สบายมาก เดินทั้งวันไม่เจ็บ", "พื้นนุ่ม รองรับทุกก้าว", "ดีไซน์สวย ใส่ได้ทุกโอกาส", "กระชับเท้า ระบายอากาศดี"],
    sunglasses: ["ใส่แล้วเท่มาก สไตล์ดี", "กันแดดดี เลนส์คมชัด", "น้ำหนักเบา ใส่สบาย"],
    book: ["อ่านสนุก วางไม่ลงเลย", "เนื้อหาดี ได้ความรู้เพียบ", "เปลี่ยนมุมมอง เปิดโลกใหม่", "เขียนดีมาก อ่านง่าย"],
    toy: ["เด็กเล่นสนุก พัฒนาสมอง", "วัสดุปลอดภัย พ่อแม่วางใจ", "เล่นได้นาน ไม่เบื่อง่าย", "สีสันสดใส ดึงดูดสายตา"],
    stationery: ["เขียนลื่น จับถนัดมือ", "ดีไซน์สวย ใช้แล้วอยากเขียน", "สีสด คมชัด ทุกเส้น", "คุณภาพดี ใช้ได้ยาวนาน"],
    dental: ["แปรงแล้วฟันขาวขึ้นจริง", "ลมหายใจสดชื่นตลอดวัน", "เหงือกแข็งแรง ฟันไม่ผุ", "ยิ้มสวยมั่นใจทุกวัน"],
    cleaning: ["สะอาดหมดจด ใช้ง่ายมาก", "ขจัดคราบฝังแน่นได้ทันที", "กลิ่นหอม สะอาดยาวนาน", "ประหยัด ใช้นิดเดียวก็เกลี้ยง"],
    outdoor: ["พกพาง่าย น้ำหนักเบา", "ทนทุกสภาพอากาศ ใช้ได้นาน", "เหมาะกับทุกทริป ทุกกิจกรรม", "กันน้ำกันฝุ่น ใช้ได้ทุกที่"],
    health: ["วัดผลแม่นยำ เชื่อถือได้", "ใช้ง่าย อ่านค่าเข้าใจทันที", "ดูแลสุขภาพที่บ้านได้เลย", "มาตรฐานทางการแพทย์"],
    craft: ["ทำตามง่าย สนุกมาก", "งานออกมาสวย ภูมิใจ", "สีสด คุณภาพดี ใช้ง่าย", "สร้างสรรค์ผลงานได้เลย"],
    digital: ["ใช้ง่าย ฟีเจอร์ครบจบ", "ประหยัดเวลา ทำงานเร็วขึ้น", "อินเทอร์เฟซสวย ใช้สะดวก", "ครบจบในแอปเดียว"],
    other: ["ใช้ง่าย ได้ผลจริง", "คุณภาพดี น่าใช้มาก", "ลองแล้วจะติดใจ", "ดีเกินคาดจริงๆ"]
};

// Category-specific Urgency — ความเร่งด่วนเฉพาะกลุ่ม
const CATEGORY_URGENCY: Partial<Record<ProductCategory, string[]>> = {
    food: ["สั่งเลย ก่อนล็อตนี้หมด!", "อย่าปล่อยให้ท้องรอ!", "กดสั่งเลย วันนี้!", "รีบเลย ของมีจำกัด!"],
    beverage: ["สั่งวันนี้ ส่งเร็ว!", "กดสั่งเลย ก่อนหมด!", "โปรพิเศษ วันนี้เท่านั้น!", "อย่าพลาด!"],
    fashion: ["สั่งเลย ก่อนไซส์หมด!", "โปรนี้มีจำกัด!", "ไม่รีบ หมดนะ!", "กดสั่งวันนี้!"],
    gadget: ["สั่งเลย ของมีจำกัด!", "โปรนี้ไม่รอใคร!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    beauty: ["สั่งเลย ก่อนสวยไม่ทัน!", "โปรนี้หมดแล้วหมดเลย!", "กดสั่งวันนี้!", "รีบเลย ของมีจำกัด!"],
    supplement: ["สั่งวันนี้ ดูแลสุขภาพเลย!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "อย่ารอ สุขภาพรอไม่ได้!"],
    pet: ["สั่งเลย ให้น้องได้ลอง!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "น้องรอไม่ไหวแล้ว!"],
    baby: ["สั่งเลย ลูกจะได้ใช้ของดี!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "อย่าพลาด!"],
    home: ["สั่งเลย เปลี่ยนบ้านวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "รีบเลย ก่อนหมด!"],
    kitchen: ["สั่งเลย อัปเกรดครัววันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "รีบเลย ก่อนหมด!"],
    fitness: ["สั่งเลย เริ่มเทรนวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "ไม่รอ ฟิตเลย!"],
    auto: ["สั่งเลย อัปเกรดรถวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    jewelry: ["สั่งเลย ก่อนแบบนี้หมด!", "โปรนี้หมดแล้วหมดเลย!", "กดสั่งวันนี้!", "ของมีจำกัด!"],
    watch: ["สั่งเลย ก่อนรุ่นนี้หมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    bag: ["สั่งเลย ก่อนสีนี้หมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "รีบเลย ก่อนหมด!"],
    shoe: ["สั่งเลย ก่อนไซส์หมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ไม่รีบ หมดนะ!"],
    book: ["สั่งเลย อ่านวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "อย่าพลาดเล่มนี้!"],
    toy: ["สั่งเลย ให้เด็กๆ ได้เล่น!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    stationery: ["สั่งเลย ก่อนหมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "รีบเลย ก่อนหมด!"],
    dental: ["สั่งเลย ฟันขาวรอไม่ได้!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "อย่ารอ สุขภาพช่องปากสำคัญ!"],
    cleaning: ["สั่งเลย บ้านสะอาดวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "ของมีจำนวนจำกัด!"],
    outdoor: ["สั่งเลย พร้อมลุยเลย!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    health: ["สั่งเลย ดูแลสุขภาพวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "สุขภาพสำคัญ อย่ารอ!"],
    craft: ["สั่งเลย เริ่ม DIY วันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "ของมีจำนวนจำกัด!"],
    digital: ["สมัครเลย เริ่มใช้วันนี้!", "โปรนี้มีจำกัด!", "กดสมัครเลย!", "ของมีจำกัด!"],
    other: ["รีบเลย ก่อนหมด!", "โปรนี้มีจำกัด!", "อย่าพลาด!", "กดสั่งวันนี้!"]
};

// Category-specific Scene 2 review phrase — ตอบรีวิวแบบเฉพาะสินค้า
const CATEGORY_REVIEW_PHRASE: Partial<Record<ProductCategory, string[]>> = {
    food: ["คำแรกรู้เรื่องเลย", "เคี้ยวทุกคำ รสชาติเต็มปาก", "กินแล้วร้องว้าวเลย"],
    beverage: ["จิบแรกรู้เลยว่าใช่", "รสชาติกลมกล่อมลงตัว", "ดื่มแล้วสดชื่นมาก"],
    fashion: ["ใส่แล้วมีสไตล์มาก", "เนื้อผ้าดีจริง สัมผัสเนียน", "ลองใส่แล้วถอดไม่ลง"],
    gadget: ["ลองใช้แล้วว้าวเลย", "ฟีเจอร์ดีเกินคาดมาก", "เปิดเครื่องปุ๊บ ใช้ได้ทันที"],
    beauty: ["ทาปุ๊บ เห็นผลปั๊บ", "ผิวดีขึ้นตั้งแต่วันแรก", "กลิ่นหอมมาก ติดทนทั้งวัน"],
    supplement: ["ทานได้ง่าย ไม่มีกลิ่น", "ทานมาอาทิตย์ เห็นผลแล้ว", "ร่างกายตื่นตัวขึ้นจริง"],
    pet: ["น้องวิ่งมาเลย ชอบมากๆ", "กินเกลี้ยงทุกมื้อ", "น้องขนสวย สุขภาพดีขึ้น"],
    baby: ["ลูกใช้แล้วยิ้มเลย", "อ่อนโยนจริง ไม่แพ้", "คุณแม่วางใจได้เลย"],
    fitness: ["เทรนมาเห็นผลจริง", "กล้ามชัดขึ้นเลย", "จับถนัดมือ เทรนได้เต็มที่"],
    jewelry: ["ใส่แล้วสวยมาก ประกายจับตา", "งานละเอียด คุณภาพเยี่ยม", "ใส่ออกงานได้ทุกโอกาส"],
    watch: ["สวมแล้วดูดีมาก มีระดับ", "เครื่องเดินแม่น ไม่ผิดเวลา", "ใส่แล้วมีออร่าเลย"],
    dental: ["แปรงปุ๊บ สดชื่นปั๊บ", "ฟันขาวขึ้นตั้งแต่วันแรก", "ลมหายใจหอมสดชื่นมาก"],
};

// ═══════════════════════════════════════════════════════════════════════════
// SCREEN CONTENT DIRECTIVE — for products with displays (laptop, phone, tablet, gaming)
// Ensures the product's screen shows CONTEXT-APPROPRIATE content matching dialogue
// ═══════════════════════════════════════════════════════════════════════════
const SCREEN_CONTENT_CATEGORIES: Set<ProductCategory> = new Set([
    "laptop", "phone", "tablet", "gaming", "wearable", "smart-home", "gadget"
]);

// Shared suffix for ALL screen content directives — prevents logos/watermarks/artifacts on displayed content
const SCREEN_CLEAN_SUFFIX = `SCREEN CLEANLINESS: The displayed content on the product screen must be CLEAN and SEAMLESS — NO floating logos, NO brand watermarks, NO semi-transparent overlays, NO game HUD elements (health bars, minimaps, crosshairs, ammo counters), NO UI chrome or debug info visible on the screen. Show ONLY pure immersive content as if the viewer is looking through a window into the game/video/app world. The screen content must blend naturally with the product display.`;

/**
 * Returns a screen content directive for products with displays.
 * Analyzes the scene script text and returns specific instructions
 * about what should appear on the product's screen.
 */
const getScreenContentDirective = (category: ProductCategory, sceneScript: string): string => {
    if (!SCREEN_CONTENT_CATEGORIES.has(category)) return '';

    const scriptLower = sceneScript.toLowerCase();

    // Gaming keywords → game visuals on screen
    if (/เกม|game|gaming|เล่นเกม|แรง.*สะใจ|ลื่น.*มาก|fps|แรงค์|rank|240hz|144hz|refresh|รีเฟรช|freesync|g-sync|ไม่กระตุก|ไม่ฉีก|ภาพ.*เบลอ/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show a vivid, HIGHLY ANIMATED 3D video game environment running in real-time — colorful open-world or action game with characters, vehicles, or fast-paced movement clearly visible and actively moving on the screen. The game graphics must be bright, detailed, and unmistakably a video game in motion — smooth fluid animation demonstrating high refresh rate. Do NOT show a static image or paused screen. ${SCREEN_CLEAN_SUFFIX}`;
    }

    // Video editing keywords → editing app UI on screen
    if (/ตัดต่อ|edit|premiere|after effect|วีดีโอ.*ลื่น|render|timeline/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show an ACTIVE, ANIMATED professional video editing application interface (resembling Adobe Premiere Pro or After Effects) — with visible timeline playback moving, video preview panel showing moving video, and editing tool panels. The editing workspace must be clearly in use and animating. Do NOT show a static screenshot. ${SCREEN_CLEAN_SUFFIX}`;
    }

    // Code / Work keywords
    if (/ทำงาน|work|code|โปรแกรม|office|เอกสาร|พิมพ์|typing/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show an ACTIVE computer operating system (like Windows or macOS). Show active typing, moving mouse cursor, scrolling through documents, or coding with animated syntax highlighting. It must look like a real, functioning computer interface in use, NOT a static wallpaper. ${SCREEN_CLEAN_SUFFIX}`;
    }

    // Photo/camera keywords → photo gallery on screen
    if (/กล้อง|ถ่ายรูป|ถ่ายภาพ|photo|camera|ภาพ.*สวย|ภาพ.*คม/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show a dynamic photo gallery interface with images swiping or a camera viewfinder actively framing a moving scene with focus UI elements.`;
    }

    // Video watching keywords → video playback on screen
    if (/ดูหนัง|ดูวีดีโอ|movie|video|netflix|youtube|ดู.*ฟิน/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show vivid colorful video content or a movie scene actively playing with bright rich visuals in motion on the screen. MUST be animated. ${SCREEN_CLEAN_SUFFIX}`;
    }

    // Screen quality keywords → vibrant display content
    if (/จอ.*สี|สี.*สด|คมชัด|display|screen|oled|amoled|จอ.*สวย/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show vibrant, ANIMATED colorful content (like an animated 3D live wallpaper, moving fluids, or playing video) with rich saturated colors that demonstrate the screen quality. MUST be actively moving. ${SCREEN_CLEAN_SUFFIX}`;
    }

    // Speed keywords → apps/UI responding
    if (/เร็ว|speed|fast|ปุ๊บ|ทันที|ลื่น|smooth/i.test(scriptLower)) {
        return `SCREEN CONTENT: The product display MUST show app interface elements or multiple windows responding and animating instantly — smooth UI animations, app icons popping, active OS interface clearly moving.`;
    }

    // Default for screen products — always show SOMETHING on screen
    return `SCREEN CONTENT: The product display MUST show highly active, ANIMATED content in motion — such as moving OS UI elements (Windows/macOS), video playback, scrolling, or game action. It must look like a real, functioning device screen. NEVER show a blank screen, and NEVER show a static image, static product ad, or motionless wallpaper on the screen. ${SCREEN_CLEAN_SUFFIX}`;
};

// ═══════════════════════════════════════════════════════════════════════════
// TECH PRONUNCIATION GUIDE — Thai phonetic for English brand/tech terms
// Injected into SPOKEN DIALOGUE so Veo TTS pronounces correctly
// ═══════════════════════════════════════════════════════════════════════════
const TECH_PRONUNCIATION_GUIDE: [RegExp, string][] = [
    // GPU / Tech terms (longer terms first to avoid partial matches)
    [/\bUSB[-\s]?C\b/gi, "USB-C(ยูเอสบีซี)"],
    [/\bThunderbolt\b/gi, "Thunderbolt(ธันเดอร์โบลต์)"],
    [/\bBluetooth\b/gi, "Bluetooth(บลูทูธ)"],
    [/\bWi[-\s]?Fi\b/gi, "Wi-Fi(ไวไฟ)"],
    [/\bNVIDIA\b/gi, "NVIDIA(เอ็นวีเดีย)"],
    [/\bNvidia\b/g, "Nvidia(เอ็นวีเดีย)"],
    [/\bAMOLED\b/gi, "AMOLED(อะโมเลด)"],
    [/\bOLED\b/gi, "OLED(โอแอลอีดี)"],
    [/\bHDMI\b/gi, "HDMI(เอชดีเอ็มไอ)"],
    [/\bRTX\b/gi, "RTX(อาร์ทีเอ็กซ์)"],
    [/\bGTX\b/gi, "GTX(จีทีเอ็กซ์)"],
    [/\bRGB\b/gi, "RGB(อาร์จีบี)"],
    [/\bSSD\b/gi, "SSD(เอสเอสดี)"],
    [/\bHDD\b/gi, "HDD(เอชดีดี)"],
    [/\bRAM\b/gi, "RAM(แรม)"],
    [/\bGPU\b/gi, "GPU(จีพียู)"],
    [/\bCPU\b/gi, "CPU(ซีพียู)"],
    [/\bUSB\b/gi, "USB(ยูเอสบี)"],
    [/\bLED\b/gi, "LED(แอลอีดี)"],
    // Brands — computer
    [/\bAcer\b/gi, "Acer(เอเซอร์)"],
    [/\bPredator\b/gi, "Predator(เพรดเดอร์)"],
    [/\bHelios\b/gi, "Helios(ฮีเลียส)"],
    [/\bASUS\b/gi, "ASUS(เอซุส)"],
    [/\bROG\b/gi, "ROG(อาร์โอจี)"],
    [/\bZephyrus\b/gi, "Zephyrus(เซฟิรัส)"],
    [/\bMSI\b/g, "MSI(เอ็มเอสไอ)"],
    [/\bLenovo\b/gi, "Lenovo(เลอโนโว)"],
    [/\bThinkPad\b/gi, "ThinkPad(ธิงค์แพด)"],
    [/\bDell\b/gi, "Dell(เดลล์)"],
    [/\bHP\b/g, "HP(เอชพี)"],
    [/\bRazer\b/gi, "Razer(เรเซอร์)"],
    [/\bLogitech\b/gi, "Logitech(โลจิเทค)"],
    // Brands — mobile
    [/\bSamsung\b/gi, "Samsung(ซัมซุง)"],
    [/\bGalaxy\b/gi, "Galaxy(กาแล็กซี่)"],
    [/\biPhone\b/g, "iPhone(ไอโฟน)"],
    [/\biPad\b/g, "iPad(ไอแพด)"],
    [/\bMacBook\b/gi, "MacBook(แมคบุ๊ค)"],
    [/\bAirPods\b/gi, "AirPods(แอร์พอดส์)"],
    [/\bApple\b/g, "Apple(แอปเปิ้ล)"],
    [/\bGoogle\b/gi, "Google(กูเกิ้ล)"],
    [/\bPixel\b/gi, "Pixel(พิกเซล)"],
    [/\bHuawei\b/gi, "Huawei(หัวเว่ย)"],
    [/\bXiaomi\b/gi, "Xiaomi(เสียวมี่)"],
    [/\bOPPO\b/gi, "OPPO(ออปโป้)"],
    [/\bvivo\b/gi, "vivo(วีโว่)"],
    [/\brealme\b/gi, "realme(เรียลมี)"],
    // Brands — audio
    [/\bSony\b/gi, "Sony(โซนี่)"],
    [/\bBose\b/gi, "Bose(โบส)"],
    [/\bJBL\b/gi, "JBL(เจบีแอล)"],
    [/\bMarshall\b/gi, "Marshall(มาร์แชล)"],
    [/\bSennheiser\b/gi, "Sennheiser(เซนไฮเซอร์)"],
    [/\bBeats\b/gi, "Beats(บีทส์)"],
];

/**
 * Inject Thai pronunciation hints into script text for Veo TTS.
 * Only injects once per unique term to avoid cluttering.
 * Example: "Nvidia RTX" → "Nvidia(เอ็นวีเดีย) RTX(อาร์ทีเอ็กซ์)"
 */
const injectPronunciation = (text: string): string => {
    let result = text;
    const alreadyInjected = new Set<string>();
    for (const [pattern, replacement] of TECH_PRONUNCIATION_GUIDE) {
        const key = replacement.split('(')[0].toLowerCase();
        if (alreadyInjected.has(key)) continue;
        if (pattern.test(result)) {
            // Reset regex lastIndex for global patterns
            pattern.lastIndex = 0;
            // Replace first occurrence only
            let replaced = false;
            result = result.replace(pattern, (match) => {
                if (!replaced) {
                    replaced = true;
                    alreadyInjected.add(key);
                    return replacement;
                }
                return match;
            });
        }
    }
    return result;
};

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY SCENE PAIRS — PAIRED script + visual action per category
// Ensures ZERO conflict between what character SAYS and what video SHOWS.
// Each pair: { script: fn(productName) → Thai text, action: English visual directive }
// ═══════════════════════════════════════════════════════════════════════════
type ScriptActionPair = {
    script: (name: string) => string;
    action: string;
};

const CATEGORY_SCENE_PAIRS: Partial<Record<ProductCategory, ScriptActionPair[]>> = {
    // ── Tech ──
    laptop: [
        { script: (name) => `จอ ${name} คมชัดมาก สีสดเวอร์`, action: "CAMERA: Dynamic close-up tracking shot, rack focus from keyboard to screen. Presenter FIRST holds laptop facing camera showing screen, THEN tilts it 45° to show side profile thinness, THEN rotates back and points at display with finger. Screen MUST show ANIMATED moving video or active OS desktop. Multi-angle screen showcase — never static." },
        { script: (name) => `${name} เล่นเกมลื่นมาก แรงสะใจ`, action: "CAMERA: Energetic Dutch-angle push-in toward screen. Presenter gaming — fingers rapidly pressing keys, THEN leans back showing full laptop+screen angle, THEN leans forward intense focused expression pointing at screen action. Screen MUST show ANIMATED 3D game running in real-time. RGB keyboard glow pulsing. Shifts between typing close-up and full laptop view." },
        { script: (name) => `${name} เบามาก ยกมือเดียวได้เลย`, action: "CAMERA: Low-angle tracking shot orbiting presenter. Presenter FIRST holds laptop with both hands, THEN lifts with ONE hand showing lightweight — amazed expression. Tilts to show thin side profile, THEN flips to show bottom/build quality, THEN opens screen wide showing animated content. Dynamic weight demo with multiple angles." },
        { script: (name) => `คีย์บอร์ด ${name} พิมพ์สนุก ไฟสวย`, action: "CAMERA: Macro slider gliding over keyboard, shallow DOF. Presenter FIRST tilts laptop toward camera showing keyboard layout, THEN types rapidly — RGB backlighting pulsing. THEN lifts hands to show key travel and switches, THEN resumes typing. Screen shows active coding/document interface with cursor moving. Alternates between keyboard close-up and typing action." },
        { script: (name) => `สเปค ${name} จัดเต็ม ทำทุกอย่างได้`, action: "CAMERA: Sweeping orbit around laptop. Presenter FIRST holds laptop showing screen to camera, THEN rotates it showing side ports and build quality, THEN turns back to screen — screen MUST show ACTIVE OS with multiple windows open, apps launching. THEN tilts lid to different angle showing premium finish. Multi-angle spec showcase with continuous repositioning." },
        { script: (name) => `${name} ตัดต่อวีดีโอก็ลื่นมาก`, action: "CAMERA: Smooth dolly-in from wide to screen close-up. Presenter FIRST shows full laptop from front angle, THEN adjusts screen angle for better view, THEN leans in editing — screen MUST show ANIMATED video editing UI (Premiere Pro style) with timeline playing. THEN pulls back gesturing at smooth performance. Shifts between wide laptop view and screen close-up." },
        { script: (name) => `พอร์ต ${name} ครบเลย ต่ออะไรก็ได้`, action: "CAMERA: Macro tracking along side of laptop. Presenter FIRST tilts laptop showing left-side ports, THEN rotates to show right-side ports, plugs USB-C/HDMI cables. THEN flips laptop back to front showing screen with active desktop. THEN holds at angle displaying overall design. Multi-side port showcase with continuous rotation." },
        { script: (name) => `เสียง ${name} ดังใส ฟังเพลงก็ดี`, action: "CAMERA: Medium shot with gentle push-in. Presenter FIRST holds laptop showing screen with ANIMATED music player, THEN tilts it to point at speaker grille location, THEN brings it closer to camera for speaker detail, THEN holds at medium distance while nodding to music. Shifts between screen view, speaker detail, and presenter reaction." },
        { script: (name) => `${name} เปิดเครื่องเร็วมาก พร้อมใช้ทันที`, action: "CAMERA: Time-lapse feel snap zoom. Presenter FIRST shows closed laptop from side angle, THEN opens lid smoothly — screen lights up instantly with boot animation. THEN tilts screen showing brightness, types password — desktop appears. THEN lifts laptop showing it ready to use from front angle. Dynamic open-to-ready sequence with angle changes." },
        { script: (name) => `ดีไซน์ ${name} พรีเมียม สวยทุกมุม`, action: "CAMERA: 360-degree orbit shot. Presenter FIRST shows laptop lid with logo catching light, THEN flips to show bottom build quality, THEN rotates to side showing thin profile and hinge, THEN opens lid revealing bright animated screen, THEN tilts screen at different angle. Continuous 360° rotation — never pauses at one angle. Full design showcase." },
    ],
    phone: [
        { script: (name) => `กล้อง ${name} ถ่ายรูปสวยมาก`, action: "CAMERA: Dynamic whip pan to phone screen. Presenter FIRST holds phone up in portrait showing camera app, taps shutter, THEN flips phone 180° to show captured photo on bright screen to camera, THEN tilts phone to show camera module close-up, THEN brings screen back toward camera showing photo result. Screen MUST display a beautiful photograph clearly. Multi-angle camera showcase." },
        { script: (name) => `จอ ${name} สีสดมาก ดูวีดีโอฟิน`, action: "CAMERA: Cinematic orbit around presenter. Presenter FIRST holds phone screen toward camera showing vivid ANIMATED video, THEN tilts phone to show thin side profile, THEN rotates back showing screen from different angle, THEN points at display quality with finger. Display MUST show bright rich colors moving on screen. Multi-angle display showcase — never static." },
        { script: (name) => `${name} เร็วมาก เปิดแอปปุ๊บเลย`, action: "CAMERA: Snap zoom onto screen. Presenter FIRST holds phone at medium distance showing full phone, THEN brings closer to camera for screen detail — rapidly tapping/swiping, THEN pulls back showing one-hand speed operation, THEN tilts phone landscape briefly. Screen MUST show apps launching with ANIMATED transitions. Speed demo with continuous repositioning." },
        { script: (name) => `ดีไซน์ ${name} สวยหรู จับถนัดมือ`, action: "CAMERA: Smooth macro orbit shot. Presenter FIRST shows phone front with animated wallpaper, THEN rotates to show side profile thinness, THEN flips to show back camera module detail, THEN rotates back to front — comfortable one-hand grip demo. Premium materials catching light at each angle. Continuous 360° rotation — never pauses at one angle." },
        { script: (name) => `แบต ${name} อึดมาก ใช้ได้ทั้งวัน`, action: "CAMERA: Medium push-in shot. Presenter FIRST shows phone screen with battery indicator at high charge, THEN scrolls social media with ANIMATED feed moving, THEN tilts phone to show side profile, THEN brings screen back to camera showing still-high battery. Shifts between screen view and phone angle showcase." },
        { script: (name) => `${name} เล่นเกมลื่นมาก ไม่กระตุก`, action: "CAMERA: High-energy handheld tracking. Presenter FIRST holds phone portrait showing game loading, THEN rotates to landscape — both thumbs rapidly tapping, THEN tilts phone toward camera showing screen action, THEN pulls back showing excited focused expression. Screen MUST show ANIMATED 3D mobile game. Shifts between gameplay close-up and full reaction." },
        { script: (name) => `ถ่ายวีดีโอ ${name} ภาพนิ่งมาก`, action: "CAMERA: Over-shoulder tracking shot. Presenter FIRST holds phone up in video recording mode, THEN pans phone left-right while filming — screen shows ANIMATED viewfinder with stabilization, THEN flips phone to show camera lens detail, THEN resumes recording from different angle. Dynamic filming demo with continuous phone repositioning." },
        { script: (name) => `${name} ชาร์จเร็วมาก เต็มไวเลย`, action: "CAMERA: Close-up push-in on charging port. Presenter FIRST shows phone bottom port, plugs cable — screen lights up with charging animation, THEN tilts phone showing screen with percentage climbing, THEN lifts phone+cable showing overall setup, THEN brings screen close to camera showing rapid charge. Dynamic charging demo with angle shifts." },
        { script: (name) => `ลำโพง ${name} เสียงดังใส ฟังชัดมาก`, action: "CAMERA: Medium shot, gentle dolly around. Presenter FIRST shows phone screen with ANIMATED music player, THEN rotates phone showing speaker grille toward camera, THEN flips back to screen view while nodding to music, THEN tilts phone at angle showing premium build. Sound quality demo with continuous phone repositioning." },
        { script: (name) => `${name} กันน้ำได้ ไม่ต้องกลัวเปียก`, action: "CAMERA: Dynamic low-angle shot. Presenter FIRST shows phone screen with active content, THEN confidently brings phone near water — splashes visible, THEN lifts phone showing screen still bright and ANIMATED, THEN rotates phone showing all sides unaffected. Water resistance demo with continuous repositioning." },
    ],
    tablet: [
        { script: (name) => `จอ ${name} ใหญ่สวย วาดรูปลื่น`, action: "CAMERA: Overhead bird's-eye descending to 45-degree angle. Presenter FIRST holds tablet flat drawing with stylus, THEN lifts tablet toward camera showing artwork progress, THEN tilts to show screen brightness from angle, THEN resumes drawing. Screen MUST show ANIMATED colorful digital art being drawn. Shifts between overhead drawing and front-facing showcase." },
        { script: (name) => `ดูหนังจอ ${name} ใหญ่ ฟินมาก`, action: "CAMERA: Smooth push-in from wide. Presenter FIRST holds tablet in landscape showing ANIMATED movie playing, THEN tilts screen toward camera for display showcase, THEN rotates to show thin side profile, THEN brings back to viewing position with impressed expression. Screen MUST show vivid bright moving visuals. Multi-angle viewing demo." },
        { script: (name) => `${name} เบามาก ถือไม่เมื่อย`, action: "CAMERA: Dynamic sweeping orbit. Presenter FIRST holds tablet with both hands, THEN lifts with ONE hand showing lightweight — amazed expression, THEN switches portrait to landscape naturally, THEN tilts showing thin side profile, THEN brings screen back to camera. Screen shows bright ANIMATED moving UI content. Continuous grip/angle changes." },
        { script: (name) => `${name} ตัดต่อวีดีโอได้เลย สะดวกมาก`, action: "CAMERA: Macro slider close-up. Presenter FIRST shows tablet screen with ANIMATED editing interface, THEN tilts tablet to show touch gestures on timeline, THEN lifts tablet toward camera for screen detail, THEN pulls back showing full editing workflow. Screen MUST show timeline playing, preview moving. Shifts between close-up and wide editing view." },
        { script: (name) => `${name} เล่นเกมจอใหญ่ มันส์สุดๆ`, action: "CAMERA: Dutch-angle energetic push-in. Presenter FIRST holds tablet landscape gaming — both hands gripping edges, THEN tilts tablet toward camera showing screen action, THEN pulls back to show full excited expression, THEN brings tablet close for gameplay detail. Screen MUST show ANIMATED 3D game with colorful action. Shifts between close-up gameplay and full reaction." },
        { script: (name) => `จด ${name} เขียนโน้ตลื่นมาก`, action: "CAMERA: Overhead tracking shot following stylus. Presenter FIRST writes notes with stylus — screen shows ANIMATED handwriting appearing, THEN lifts tablet to show notes to camera, THEN tilts to show stylus tip precision detail, THEN resumes writing from different angle. Ink flowing smoothly. Alternates between writing and showing." },
        { script: (name) => `${name} ต่อคีย์บอร์ดทำงานได้เลย`, action: "CAMERA: Wide to medium dolly-in. Presenter FIRST shows tablet standalone, THEN attaches keyboard case with satisfying snap, THEN types productively — screen shows ANIMATED document with cursor moving, THEN detaches keyboard showing tablet versatility. Shifts between tablet-only and laptop-mode angles." },
        { script: (name) => `สี ${name} คมชัดระดับโปร`, action: "CAMERA: Extreme close-up tracking across screen surface. Presenter FIRST holds tablet showing vivid ANIMATED colorful content, THEN tilts screen at different angle showing color consistency, THEN brings screen close to camera for detail, THEN pulls back pointing at color accuracy. Screen MUST show nature video, art, photos swiping. Multi-angle display quality showcase." },
        { script: (name) => `${name} อ่านหนังสือจอใหญ่ สบายตา`, action: "CAMERA: Gentle dolly-in, warm lighting. Presenter FIRST holds tablet in portrait reading — screen shows ANIMATED page-turning, THEN tilts tablet to show screen clarity from angle, THEN adjusts to comfortable viewing distance, THEN switches to landscape briefly showing wide-page view. Relaxed reading with natural repositioning." },
        { script: (name) => `แบต ${name} อึดมาก ใช้ได้ทั้งวัน`, action: "CAMERA: Medium tracking shot. Presenter FIRST shows tablet screen with battery at high charge, THEN uses tablet on desk, THEN picks up and carries while showing ANIMATED content still playing, THEN tilts to show screen from different angle. Screen always bright. Continuous repositioning across locations." },
    ],
    gaming: [
        { script: (name) => `เล่นเกมด้วย ${name} มันส์มาก`, action: "CAMERA: High-energy Dutch-angle whip pan. Presenter FIRST shows gaming gear to camera, THEN starts gaming intensely — rapid button presses, THEN leans back showing excited expression, THEN leans forward gripping gear tightly. Screen MUST show ANIMATED 3D game. RGB lighting pulsing. Shifts between gear close-up and full reaction." },
        { script: (name) => `${name} ตอบสนองเร็วมาก ไม่แลค`, action: "CAMERA: Snap zoom onto hands then screen. Rapid input — clicks show instant on-screen response. Screen MUST show ANIMATED game graphics responding in real-time. Zero delay competitive moment." },
        { script: (name) => `ดีไซน์ ${name} สวย RGB จัดเต็ม`, action: "CAMERA: Smooth sweeping orbit around gear. Presenter FIRST holds gear showing front design, THEN rotates to show side profile with RGB cycling, THEN tilts showing top/bottom detail, THEN brings close to camera for finish quality. Continuous 360° rotation — never pauses at one angle. Premium gaming aesthetic." },
        { script: (name) => `${name} เสียงชัดมาก ได้ยินทุกรายละเอียด`, action: "CAMERA: Close-up macro on headset/speaker, then pull-back to gaming setup. Presenter wearing headset, reacts to in-game audio — flinches at explosion sound, grins at victory. Immersive audio demo." },
        { script: (name) => `${name} จับถนัดมือ เล่นนานไม่เมื่อย`, action: "CAMERA: Macro tracking along controller/mouse contours. Presenter FIRST shows gear from front angle, THEN grips showing ergonomic hand fit, THEN rotates to show side buttons/scroll, THEN pulls back showing relaxed gaming posture. Shifts between close-up grip and wide comfort view. Comfort demo." },
        { script: (name) => `เซ็ตอัป ${name} สวยมาก ครบเซ็ต`, action: "CAMERA: Wide establishing shot then sweeping crane-down into setup. Full gaming battlestation — monitor with ANIMATED game, RGB keyboard/mouse, headset. Presenter sits down and starts playing. Setup showcase." },
        { script: (name) => `${name} คอนโทรลแม่น ยิงทีไรโดน`, action: "CAMERA: Over-shoulder tracking shot of hands. Precise mouse/controller movements — quick aiming, snapping to targets. Screen shows ANIMATED FPS/competitive game with crosshair hitting targets. Precision gameplay." },
        { script: (name) => `ไฟ ${name} สวยมาก เปลี่ยนสีได้`, action: "CAMERA: Slow-motion sweep in dim room. RGB lighting illuminating presenter's face — colors cycling, breathing effects, reactive patterns. Keyboard/mouse/headset all glowing. Atmospheric gaming ambiance." },
        { script: (name) => `${name} เชื่อมต่อไว ไม่หลุด`, action: "CAMERA: Close-up of wireless dongle/cable plug-in, then wide shot. Presenter connects gear — instant recognition, zero latency indicator. Smooth seamless connectivity demo." },
        { script: (name) => `${name} ทนทานมาก ใช้หนักได้`, action: "CAMERA: Dynamic low-angle hero shot. Presenter intensely gaming — aggressive key presses, gear performing flawlessly under pressure. Build quality close-up of switches/buttons. Durability and reliability under intense use." },
    ],
    audio: [
        { script: (name) => `เสียง ${name} ดีมาก เบสหนัก`, action: "CAMERA: Close-up push-in on presenter's face. Wearing headphones/earbuds — eyes closed, head bobbing, blissful expression. Deep bass reaction — feels the music. Rich sound quality demo." },
        { script: (name) => `ตัดเสียง ${name} ดีเยี่ยม เงียบมาก`, action: "CAMERA: Medium shot, noisy environment implied. Presenter puts on product — expression shifts from distracted to peaceful. Taps earbuds toggling ANC modes. Impressed at silence. Noise cancellation demo." },
        { script: (name) => `${name} ใส่สบาย ใช้ได้ทั้งวัน`, action: "CAMERA: Tracking shot following presenter through daily activities. Wearing product comfortably — walks, sits, exercises. Adjusts fit showing secure placement. All-day comfort demo." },
        { script: (name) => `เคส ${name} ชาร์จเร็ว พกง่าย`, action: "CAMERA: Macro close-up of charging case. Presenter opens case — LED indicators glow, magnetic snap, earbuds seated perfectly. Pockets case easily. Compact premium build detail." },
        { script: (name) => `${name} เชื่อมต่อง่าย เปิดปุ๊บเชื่อมปั๊บ`, action: "CAMERA: Close-up of case opening then medium shot. Presenter opens case near phone — instant Bluetooth connection animation implied. Places earbuds in ears, music starts immediately. Seamless pairing." },
        { script: (name) => `โทร ${name} เสียงชัดทั้งสองฝั่ง`, action: "CAMERA: Medium two-angle shot. Presenter takes call wearing product — speaks naturally, listens clearly. Points at microphone. Clear voice call quality demo with natural conversation." },
        { script: (name) => `ดีไซน์ ${name} สวย ใส่แล้วดูดี`, action: "CAMERA: Smooth orbit around presenter's head. Wearing product — premium materials catching light, sleek design on ear/in ear. Fashion-forward audio accessory showcase." },
        { script: (name) => `${name} กันน้ำ ออกกำลังกายได้สบาย`, action: "CAMERA: Dynamic tracking during exercise. Presenter running/working out wearing product — sweat visible, product stays secure. Water-resistant durability during intense activity." },
        { script: (name) => `${name} สัมผัสควบคุมง่ายมาก`, action: "CAMERA: Extreme close-up on touch controls. Presenter taps/swipes earbuds/headphone surface — play, pause, skip, volume. Intuitive gesture controls demo with responsive feedback." },
        { script: (name) => `เสียง ${name} รายละเอียดครบ ฟังแล้วฟิน`, action: "CAMERA: Cinematic dolly-in, moody lighting. Presenter deeply immersed in music — subtle facial expression changes reacting to musical details. Audiophile-grade appreciation moment." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Food & Drink ── (VISUAL PROOF: must show EATING/DRINKING + REACTION)
    // ═══════════════════════════════════════════════════════════════
    food: [
        { script: (name) => `ลองชิม ${name} แล้ว อร่อยมากจริง`, action: "CAMERA: Medium push-in to close-up on face. Presenter holds SMALL single-serve packet (realistic palm-sized scale — NOT enlarged). Takes a bite of prepared food — genuine delighted surprised reaction, eyes widening. Steam/freshness visible. PRODUCT SIZE: packet fits in ONE hand comfortably. Authentic taste reaction PROOF." },
        { script: (name) => `เนื้อสัมผัส ${name} ดีมาก ฟินเลย`, action: "CAMERA: Macro close-up tracking. Presenter shows SMALL packet front label to camera, then tears open — reveals food inside. Prepares with VISIBLE hand actions (character reaches for and places bowl on counter BEFORE pouring). Cross-section HERO shot. Texture quality PROOF." },
        { script: (name) => `${name} รสชาติเข้มข้น ลงตัวมาก`, action: "CAMERA: Close-up dolly-in on presenter. Presenter uses utensils (picks up chopsticks/fork with VISIBLE hand motion) to eat prepared food. Closes eyes savoring — genuine pleasure. Nods approvingly to camera. Involuntary enjoyment reaction PROOF." },
        { script: (name) => `วัตถุดิบ ${name} คุณภาพ อร่อยจริง`, action: "CAMERA: Overhead bird's-eye then sweeping down. Presenter VISIBLY tears open SMALL packet, pours contents into bowl (character places bowl with hand first). Shows premium ingredients — fresh noodles/food, rich sauce. Appetizing detail close-up, then satisfying bite. Ingredient quality PROOF." },
        { script: (name) => `${name} หน้าตาน่ากิน สวยมาก`, action: "CAMERA: Slow cinematic medium shot, shallow DOF. Presenter holds SMALL single-serve packet showing front label (packet fits in one hand — realistic convenience-store size). Beautiful food visible in bowl that character placed earlier. Steam rising. Presenter reaches for first bite. Visual appetite appeal PROOF." },
        { script: (name) => `กลิ่น ${name} หอมมาก เตะจมูก`, action: "CAMERA: Close-up push-in from food to presenter's face. Presenter leans over prepared food in bowl, inhales deeply — closes eyes, blissful aroma reaction. Bowl and utensils were introduced by character's hands in prior action. Then eagerly takes bite. Aroma-to-taste journey PROOF." },
        { script: (name) => `ปริมาณ ${name} เยอะมาก คุ้มค่า`, action: "CAMERA: Medium shot. Presenter holds SMALL single-serve packet in one hand (realistic size — NOT enlarged to multi-pack). Shows prepared food in bowl — generous portion from this small packet. Impressed at quantity from small packet. Value-for-money PROOF." },
        { script: (name) => `${name} กินแล้วอิ่มมาก จัดเต็ม`, action: "CAMERA: Medium tracking shot. Presenter actively eating with utensils (chopsticks/fork picked up with visible hand action). Enjoying multiple bites, satisfied expression growing. SMALL packet visible nearby on counter. Satisfying fullness PROOF." },
        { script: (name) => `${name} ทำง่ายมาก สะดวกสุดๆ`, action: "CAMERA: Step-by-step medium shot. Presenter FIRST picks up SMALL packet (one-hand hold, realistic size), THEN tears open, THEN character reaches for and places bowl on counter, THEN pours contents in. Quick easy preparation. Convenience PROOF." },
        { script: (name) => `${name} อร่อยมาก สั่งซ้ำแน่นอน`, action: "CAMERA: Dynamic medium shot. Presenter with prepared food in bowl and SMALL packet visible beside it (IDENTICAL brand/design throughout). Finishes bite — immediately reaches for more. Thumbs up to camera. PRODUCT BRAND on packet MUST be IDENTICAL to opening scene. Can't-stop-eating reaction PROOF." },
    ],
    snack: [
        { script: (name) => `กินแล้วหยุดไม่ได้ ${name} อร่อยมาก`, action: "CAMERA: Medium to close-up push-in. Presenter opens package, takes piece and eats — crunchy implied, satisfied. Reaches for another immediately. Can't-stop-eating PROOF." },
        { script: (name) => `${name} กรอบมาก รสชาติเข้มข้น`, action: "CAMERA: Macro close-up on bite. Presenter bites snack — visible crunch, crispy texture breaking. Seasoning visible on surface. Pleased surprised reaction at crunchiness PROOF." },
        { script: (name) => `เปิดซอง ${name} หอมฟุ้งเลย`, action: "CAMERA: Close-up of hands opening package then face reaction. Aroma hits — presenter inhales, eyes widen. Immediately grabs piece. Irresistible first-impression PROOF." },
        { script: (name) => `${name} รสเผ็ดมันส์มาก ติดใจ`, action: "CAMERA: Dynamic push-in on face. Presenter eats — hits by flavor punch, fans mouth, but immediately grabs more. Addictive spicy kick reaction PROOF." },
        { script: (name) => `แบ่งกิน ${name} เพื่อนก็ชอบ`, action: "CAMERA: Wide two-person shot. Presenter shares snack with friend — both eat and react positively. Reach for more together. Social sharing enjoyment PROOF." },
        { script: (name) => `${name} ซองใหญ่ กินได้เยอะ คุ้มมาก`, action: "CAMERA: Wide shot showing large package then close-up. Presenter shows generous size — pours out plenty. Eyes widen at quantity. Value demonstration PROOF." },
        { script: (name) => `${name} ชิ้นใหญ่ เต็มคำ`, action: "CAMERA: Macro close-up of snack size. Presenter picks up large piece — shows size comparison to hand. Takes satisfying full bite. Premium portion PROOF." },
        { script: (name) => `กินเพลิน ${name} ดูหนังก็เข้ากัน`, action: "CAMERA: Medium lifestyle shot, cozy setting. Presenter snacking while relaxing — reaches into bag naturally, munches happily. Perfect snacking moment PROOF." },
        { script: (name) => `${name} มีหลายรส เลือกได้เลย`, action: "CAMERA: Overhead shot of multiple flavors then medium. Presenter shows variety — tries each, reacts differently. Flavor range demonstration PROOF." },
        { script: (name) => `${name} อร่อยจนเกลี้ยงซอง`, action: "CAMERA: Time-progression medium shot. Presenter eating consistently — bag emptying visibly. Shows empty bag to camera, satisfied. Irresistible finish-the-whole-bag PROOF." },
    ],
    bakery: [
        { script: (name) => `${name} นุ่มมาก หอมเนย`, action: "CAMERA: Macro close-up of tear. Presenter tears bread/pastry — soft fluffy interior stretching, steam/warmth visible. Inhales aroma with closed eyes. Soft texture + aroma PROOF." },
        { script: (name) => `เนื้อ ${name} ฟู นุ่ม ละลายในปาก`, action: "CAMERA: Close-up dolly-in on bite. Soft bread/cake compressing gently, minimal crumbs. Melting-in-mouth expression. Soft yielding texture PROOF." },
        { script: (name) => `${name} สดใหม่ ออกเตาเลย`, action: "CAMERA: Wide bakery setting then close-up. Fresh-baked product — steam rising, golden crust visible. Presenter picks up warm piece. Fresh-from-oven PROOF." },
        { script: (name) => `ไส้ ${name} เยอะมาก แน่นๆ`, action: "CAMERA: Extreme macro on cross-section. Presenter cuts/breaks open — reveals generous overflowing filling (cream, chocolate, fruit). Impressed at quantity. Rich filling PROOF." },
        { script: (name) => `หน้าตา ${name} น่ากินมาก สวยเลย`, action: "CAMERA: Slow orbit around bakery item, shallow DOF. Beautiful decoration — icing, toppings, layers visible. Presenter admires before taking bite. Visual appeal PROOF." },
        { script: (name) => `${name} กรอบนอกนุ่มใน เพอร์เฟ็กต์`, action: "CAMERA: Macro close-up of bite texture. Crispy outer layer cracking, soft interior revealed. Presenter reacts to perfect contrast. Texture contrast PROOF." },
        { script: (name) => `${name} หวานกำลังดี ไม่หวานเกิน`, action: "CAMERA: Medium push-in on face. Presenter tastes — pleasant surprise at balanced sweetness. Nods approvingly. Not-too-sweet perfection PROOF." },
        { script: (name) => `กิน ${name} คู่กาแฟ ฟินมาก`, action: "CAMERA: Lifestyle overhead then medium. Bakery paired with coffee — presenter alternates bite and sip. Perfect pairing enjoyment. Coffee-pairing ritual PROOF." },
        { script: (name) => `${name} เนื้อแน่น เหนียวนุ่ม`, action: "CAMERA: Macro tracking on stretch. Presenter pulls apart — visible dough stretch, chewy elastic texture. Dense satisfying quality visible. Dense chewy texture PROOF." },
        { script: (name) => `${name} อร่อยมาก ซื้อมาแจกเพื่อน`, action: "CAMERA: Wide social shot. Presenter distributes bakery items — friends/colleagues react with delight. Everyone enjoying together. Shareworthy delicious PROOF." },
    ],
    beverage: [
        { script: (name) => `จิบ ${name} แล้ว สดชื่นมาก`, action: "CAMERA: Medium push-in to face close-up. Presenter takes long sip — visible refreshment, relieved happy expression. Condensation droplets on glass. Instant refreshment PROOF." },
        { script: (name) => `${name} รสชาติลงตัว หอมกลมกล่อม`, action: "CAMERA: Close-up dolly around glass then face. Holds drink near nose — inhales, pleased expression. Sips slowly. Rich liquid color through glass. Aroma-then-taste appreciation PROOF." },
        { script: (name) => `ชง ${name} ง่ายมาก ได้รสเข้มข้น`, action: "CAMERA: Overhead tracking of pour. Pours/brews drink — liquid flowing, rich deep color visible. Steam rising or condensation forming. Brewing process + rich result PROOF." },
        { script: (name) => `สี ${name} สวยมาก น่าดื่ม`, action: "CAMERA: Macro close-up of liquid in glass, backlit. Beautiful color — vibrant hue, ice cubes, bubbles. Presenter lifts glass to light, admires color. Visual appeal PROOF." },
        { script: (name) => `${name} เย็นซ่า ดับกระหายเลย`, action: "CAMERA: Dynamic low-angle shot. Ice-cold drink — visible condensation, ice clinking. Presenter takes refreshing gulp on hot day. Instant thirst-quench relief PROOF." },
        { script: (name) => `${name} กลิ่นหอมฟุ้ง ดื่มก่อนก็หอม`, action: "CAMERA: Close-up push-in from glass to nose. Aromatic steam/essence visible. Presenter deeply inhales aroma — blissful expression before first sip. Aromatic quality PROOF." },
        { script: (name) => `ผสม ${name} เอง ง่ายมาก`, action: "CAMERA: Overhead tracking of mixing process. Presenter mixes ingredients — pours, stirs, garnishes. Beautiful layered result in glass. DIY preparation ease PROOF." },
        { script: (name) => `${name} ดื่มแล้วสดชื่น กระปรี้กระเปร่า`, action: "CAMERA: Medium tracking shot. Presenter drinks then reacts with energy — sits up, smiles broadly. Before (tired) vs after (energized) visible. Energy boost PROOF." },
        { script: (name) => `รสชาติ ${name} หลากหลาย เลือกได้`, action: "CAMERA: Wide shot of multiple variants. Presenter tries different flavors — shows variety, reacts uniquely to each. Range of options PROOF." },
        { script: (name) => `${name} ดื่มง่าย รสชาติดี ติดใจ`, action: "CAMERA: Close-up dolly-in. Presenter sips — pleasant easy-drinking reaction. Takes another sip immediately, can't put down. Addictive drinkability PROOF." },
    ],
    coffee: [
        { script: (name) => `${name} หอมมาก กลิ่นกาแฟเข้มข้น`, action: "CAMERA: Close-up push-in on steam rising. Presenter holds cup near face — steam visible, closes eyes inhaling. Dark rich color visible. Blissful aroma reaction PROOF." },
        { script: (name) => `จิบ ${name} แล้ว ตื่นตัวทันที`, action: "CAMERA: Medium shot with rack focus. Takes sip — savoring then expression shifts to alert, energized. Sits up straighter. Energy boost reaction PROOF." },
        { script: (name) => `${name} เข้มข้น บอดี้หนา รสชาติดี`, action: "CAMERA: Macro of pour into cup. Rich dark coffee flowing — crema forming, thick body visible. Presenter sips, savors deep flavor. Rich intense body PROOF." },
        { script: (name) => `ชง ${name} เอง หอมทั้งห้อง`, action: "CAMERA: Overhead tracking of brewing process. Grinding beans, water pouring over grounds, dripping into cup. Presenter inhales rising aroma. Home brewing ritual PROOF." },
        { script: (name) => `ลาเต้อาร์ต ${name} สวยมาก`, action: "CAMERA: Overhead extreme close-up. Milk pouring into coffee — beautiful latte art forming. Presenter admires pattern then takes first sip. Artistic coffee craft PROOF." },
        { script: (name) => `${name} รสชาติสมดุล ดื่มง่าย`, action: "CAMERA: Medium dolly-in. Presenter sips coffee — pleasant balanced reaction, no bitterness grimace. Nods approvingly, takes another sip. Smooth balanced flavor PROOF." },
        { script: (name) => `ดื่ม ${name} ทุกเช้า ขาดไม่ได้`, action: "CAMERA: Warm morning lifestyle shot. Morning routine — presenter pours coffee, takes first sip with eyes closed. Peaceful morning ritual. Daily essential routine PROOF." },
        { script: (name) => `${name} เย็นก็อร่อย ดื่มได้ทุกวัน`, action: "CAMERA: Close-up of ice coffee with condensation. Presenter stirs ice coffee — takes refreshing sip. Cold version equally delicious reaction. Versatile hot/cold PROOF." },
        { script: (name) => `${name} ดริปง่าย ได้กาแฟคุณภาพ`, action: "CAMERA: Macro tracking of drip process. Water flowing through filter — steady drip, rich extraction visible. Presenter picks up cup, appreciates clarity. Drip quality PROOF." },
        { script: (name) => `กาแฟ ${name} คุณภาพ คั่วมาดี`, action: "CAMERA: Macro close-up of beans then medium. Shows roasted beans — rich color, oily surface. Presenter smells beans, impressed. Then brews and sips. Premium roast quality PROOF." },
    ],
    alcohol: [
        { script: (name) => `${name} รสชาติกลมกล่อม ดื่มแล้วฟิน`, action: "CAMERA: Elegant slow orbit around glass. Swirls drink — liquid coating glass visible. Slow sophisticated sip, savoring expression. Deliberate appreciation ritual PROOF." },
        { script: (name) => `${name} กลิ่นหอม ละมุนมาก`, action: "CAMERA: Close-up push-in on glass then nose. Presenter brings glass to nose — deep inhale, eyes closed, appreciating bouquet. Sophisticated aroma assessment PROOF." },
        { script: (name) => `สี ${name} สวยมาก สะท้อนแสงเลย`, action: "CAMERA: Macro backlit shot of glass. Beautiful liquid color — amber, ruby, golden tones catching light. Presenter holds to light, admires clarity. Visual liquid beauty PROOF." },
        { script: (name) => `${name} ดื่มง่าย ราบรื่นมาก`, action: "CAMERA: Medium dolly-in. Presenter takes smooth sip — no grimace, easy pleasant drinking. Nods appreciatively. Smooth easy-drinking quality PROOF." },
        { script: (name) => `${name} คู่กับอาหาร เข้ากันเลย`, action: "CAMERA: Wide lifestyle shot, dining setting. Drink paired with food — presenter alternates sip and bite. Perfect pairing moment. Food-pairing harmony PROOF." },
        { script: (name) => `เทใส่แก้ว ${name} สวยมาก`, action: "CAMERA: Macro tracking of pour. Liquid flowing into glass — beautiful cascade, foam forming, bubbles rising. Perfect pour technique visible. Pour ritual beauty PROOF." },
        { script: (name) => `${name} จิบเพลินๆ ผ่อนคลายมาก`, action: "CAMERA: Wide ambient lifestyle shot. Presenter relaxing with drink — cozy setting, warm lighting. Slow casual sips, peaceful expression. Relaxation moment PROOF." },
        { script: (name) => `ลอง ${name} แล้ว ติดใจเลย`, action: "CAMERA: Close-up reaction shot. First sip — pleasantly surprised expression. Takes another sip immediately. Impressed nodding to camera. First-impression addiction PROOF." },
        { script: (name) => `${name} ทำค็อกเทลง่ายเลย`, action: "CAMERA: Overhead tracking of mixology. Presenter mixes cocktail — pours, shakes, garnishes. Beautiful layered result. Takes sip, impressed. Cocktail creation PROOF." },
        { script: (name) => `${name} คุณภาพดี คุ้มค่าราคา`, action: "CAMERA: Medium shot, presenter examining bottle/label. Shows premium packaging, reads details. Pours and tastes — impressed at quality for price. Premium value PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Beauty & Skincare ── (VISUAL PROOF: must show APPLYING + VISIBLE RESULT)
    // ═══════════════════════════════════════════════════════════════
    beauty: [
        { script: (name) => `ทา ${name} แล้ว ผิวสวยขึ้นเลย`, action: "CAMERA: Close-up push-in on face. Applies product — smooth blending with fingertips. Skin appears radiant and glowing after. Before→after radiance PROOF." },
        { script: (name) => `เนื้อ ${name} บางเบา ซึมเร็วมาก`, action: "CAMERA: Macro close-up on back of hand. Dabs product — thin lightweight texture, spreads easily. Rubs in showing complete absorption, zero residue. Quick absorption PROOF." },
        { script: (name) => `กลิ่น ${name} หอมมาก ติดทนทั้งวัน`, action: "CAMERA: Medium dolly-in. Sprays fragrance on wrist — closes eyes, inhales deeply, blissful expression. Brings wrist to nose savoring. Involuntary pleasure reaction PROOF." },
        { script: (name) => `${name} ใช้ง่ายมาก แค่ทาก็เห็นผล`, action: "CAMERA: Step-by-step close-up. Simple application — squeeze, apply, blend. Minimal effort, visible result. Easy-to-use effectiveness PROOF." },
        { script: (name) => `แพ็คเกจ ${name} สวยหรู ดูแพง`, action: "CAMERA: Macro orbit around product packaging. Presenter FIRST holds bottle/tube/jar showing front label, THEN rotates to show side profile, THEN tilts to show cap/closure detail catching light, THEN brings closer to camera for texture detail. Premium elegant design at every angle. Continuous rotation — never static. Luxury packaging PROOF." },
        { script: (name) => `${name} ลดรอยแดง ผิวเรียบขึ้น`, action: "CAMERA: Before/after close-up on skin. Applies product to problem area — visible improvement in skin tone/texture. Presenter touches smooth skin, satisfied. Skin improvement PROOF." },
        { script: (name) => `ใช้ ${name} มาเดือนนึง เห็นผลจริง`, action: "CAMERA: Medium confident shot. Presenter shows clear healthy skin — touches face proudly, natural glow visible. Long-term results confidence PROOF." },
        { script: (name) => `${name} ส่วนผสมดี ปลอดภัย`, action: "CAMERA: Close-up of ingredient label then face. Reads ingredients — shows natural/premium components. Applies confidently on face. Safe quality ingredients PROOF." },
        { script: (name) => `ทา ${name} ก่อนนอน ตื่นมาผิวสวย`, action: "CAMERA: Warm evening lighting, close-up. Night routine — applies product gently before bed. Relaxing skincare ritual. Evening routine PROOF." },
        { script: (name) => `${name} คุ้มค่ามาก ใช้ได้นาน`, action: "CAMERA: Medium shot. Shows product amount needed — tiny amount sufficient. Demonstrates economical use. Long-lasting value PROOF." },
    ],
    skincare: [
        { script: (name) => `ทา ${name} แล้ว ผิวเนียนขึ้นจริง`, action: "CAMERA: Close-up dolly-in on face. Applies on cheek/forehead — gentle circular motion. Shows face closer — skin smoother, more luminous. Smoothness + glow PROOF." },
        { script: (name) => `เนื้อ ${name} ซึมเร็ว ไม่เหนียว`, action: "CAMERA: Macro on skin surface. Applies serum/cream — thin texture spreads easily. Pats gently, shows clean dewy finish. Zero sticky residue PROOF." },
        { script: (name) => `${name} ช่วยให้ผิวชุ่มชื้น ไม่แห้ง`, action: "CAMERA: Close-up push-in. Presses product into skin — dewy moisture visible. Skin plump and hydrated. Touches cheek showing bounce. Hydrated dewy texture PROOF." },
        { script: (name) => `${name} ลดสิว ผิวใสขึ้น`, action: "CAMERA: Before/after macro close-up. Applies to blemish area — gentle dabbing. Skin clarity improving visibly. Acne reduction PROOF." },
        { script: (name) => `เซรั่ม ${name} เข้มข้น ซึมลึก`, action: "CAMERA: Extreme macro of dropper and skin. Drops serum onto skin — clear/golden liquid, presenter pats in. Absorbed deeply, leaves healthy glow. Concentrated serum PROOF." },
        { script: (name) => `${name} กันแดดด้วย ครบจบในตัว`, action: "CAMERA: Medium outdoor-lit shot. Applies product — shows UV protection benefit. Blends seamlessly, no white cast. Multi-function convenience PROOF." },
        { script: (name) => `ล้างหน้าด้วย ${name} สะอาดหมดจด`, action: "CAMERA: Close-up of cleansing process. Lathers product on face — foam/gel visible. Rinses clean — fresh clear skin revealed. Deep cleansing PROOF." },
        { script: (name) => `${name} อ่อนโยน ไม่แพ้ผิว`, action: "CAMERA: Gentle close-up. Applies on sensitive area — zero irritation, comfortable expression. No redness or reaction. Gentle formula PROOF." },
        { script: (name) => `มาส์ก ${name} ฟื้นฟูผิวเลย`, action: "CAMERA: Time-progression close-up. Applies mask — waits, then peels/washes off. Skin underneath visibly brighter and refreshed. Restorative mask PROOF." },
        { script: (name) => `${name} ลดริ้วรอย ผิวตึงขึ้น`, action: "CAMERA: Macro close-up on fine lines. Applies product — skin appears tighter, smoother. Presenter touches firm skin, pleased. Anti-aging firming PROOF." },
    ],
    makeup: [
        { script: (name) => `แต่งหน้าด้วย ${name} สวยปังมาก`, action: "CAMERA: Close-up transformation sequence. Applies makeup — precise application visible. Shows finished result to camera. Dramatic before→after transformation PROOF." },
        { script: (name) => `สี ${name} สวยมาก เกลี่ยง่าย`, action: "CAMERA: Macro swatch close-up. Swatches color on arm/face — rich pigmented color, smooth blending. Vivid saturated payoff visible. Color intensity + blendability PROOF." },
        { script: (name) => `${name} ติดทนทั้งวัน ไม่เลอะ`, action: "CAMERA: Close-up tissue test. Presses tissue against makeup — lifts showing minimal transfer. Makeup still intact and perfect. Long-lasting formula PROOF." },
        { script: (name) => `ลิปสติก ${name} สีสวย ทาง่าย`, action: "CAMERA: Extreme close-up on lips. Applies lipstick — smooth glide, rich color payoff in one swipe. Presses lips, shows even coverage. Lip color application PROOF." },
        { script: (name) => `${name} คุมมันได้ดีมาก ไม่เยิ้ม`, action: "CAMERA: Close-up time test. Shows face with makeup — no shine, matte finish holding. Touches T-zone showing oil control. Mattifying oil-control PROOF." },
        { script: (name) => `แต่ง ${name} ง่าย ไม่ต้องเป็นมือโปร`, action: "CAMERA: Tutorial-style close-up. Beginner-friendly application — simple strokes, easy techniques. Perfect result despite simple method. Easy-to-use PROOF." },
        { script: (name) => `เฉดสี ${name} เข้ากับผิว เพอร์เฟ็กต์`, action: "CAMERA: Close-up shade matching. Applies foundation/concealer — blends seamlessly into skin tone. No visible line or mismatch. Perfect shade match PROOF." },
        { script: (name) => `${name} เกลี่ยง่าย ไม่เป็นคราบ`, action: "CAMERA: Macro blending close-up. Smooth application — no streaks, no patchiness. Even coverage across skin. Smooth flawless finish PROOF." },
        { script: (name) => `อายแชโดว์ ${name} เม็ดสีแน่น`, action: "CAMERA: Close-up on eye area. Applies eyeshadow — intense color payoff, smooth gradient blending. Opens eyes showing stunning eye look. Pigmented eyeshadow PROOF." },
        { script: (name) => `${name} ปกปิดดีมาก คอนซีลเก่ง`, action: "CAMERA: Before/after close-up on dark circles/blemishes. Applies concealer — spots disappear visibly. Flawless coverage revealed. Full-coverage concealing PROOF." },
    ],
    fragrance: [
        { script: (name) => `กลิ่น ${name} หอมหรูมาก`, action: "CAMERA: STABLE medium shot, NO camera orbit or rotation. Presenter holds perfume bottle at chest level with BOTH hands, label facing camera — bottle shape and decorative cap clearly visible. Presenter smiles confidently, gently tilts bottle slightly left-right to catch light on glass. Bottle silhouette NEVER changes. Luxury scent PROOF." },
        { script: (name) => `${name} ติดทนนาน กลิ่นหอมตลอดวัน`, action: "CAMERA: STABLE medium shot, NO camera movement. Presenter holds bottle in one hand showing label, brings wrist (already sprayed) to nose with other hand — closes eyes, inhales, blissful smile. Bottle remains STATIONARY in frame throughout, same angle, same shape. Lasting scent PROOF." },
        { script: (name) => `ขวด ${name} สวยหรู ดูมีระดับ`, action: "CAMERA: STABLE close-up on bottle held in presenter's hands, NO orbit, NO 360 rotation. Bottle faces camera showing label and decorative cap. Presenter's fingers gently frame the bottle. Light catches glass facets naturally. Bottle silhouette and cap shape remain FIXED — never changes angle. Luxury bottle PROOF." },
        { script: (name) => `${name} กลิ่นไม่ฉุน หอมละมุน`, action: "CAMERA: STABLE medium close-up. Presenter holds bottle in one hand at shoulder level showing label. With other hand, brings wrist near nose — soft pleasant expression, gentle smile. Bottle shape unchanged throughout. Gentle scent PROOF." },
        { script: (name) => `ฉีด ${name} นิดเดียว หอมทั้งวัน`, action: "CAMERA: STABLE medium shot. Presenter holds bottle showing label to camera. Uses fingers to gently lift decorative cap off (visible hand motion, cap held in other hand). Points nozzle at wrist, one spray — mist visible in air. Bottle body shape IDENTICAL before and after cap removal. Concentrated potency PROOF." },
        { script: (name) => `${name} กลิ่นเปลี่ยนตามเวลา ลึกซึ้งมาก`, action: "CAMERA: STABLE atmospheric medium shot, NO camera movement. Presenter holds bottle at chest, smells wrist — expression evolves from curious to pleased to deeply satisfied. Bottle remains in frame, same position, same shape. Layered scent PROOF." },
        { script: (name) => `ใส่ ${name} แล้ว มั่นใจมาก`, action: "CAMERA: STABLE medium shot. Presenter holds bottle showing label, sprays on neck pulse point — confident expression. Sets bottle down on surface in front (still visible, label facing camera). Smiles at camera. Bottle shape consistent. Confidence PROOF." },
        { script: (name) => `${name} หอมสะอาด สดชื่นมาก`, action: "CAMERA: STABLE bright medium shot, NO tracking. Presenter holds bottle showing label in one hand, sprays wrist with other. Inhales — refreshed, clean expression. Bottle remains in hand at same angle throughout. Fresh clean scent PROOF." },
        { script: (name) => `กลิ่น ${name} เข้ากับทุกโอกาส`, action: "CAMERA: STABLE medium shot, same angle throughout. Presenter holds bottle showing label, nods confidently. Gestures with free hand showing versatility. Bottle stays in same position, same shape, same angle. Versatile scent PROOF." },
        { script: (name) => `${name} แพ็คเกจสวย ให้เป็นของขวัญได้`, action: "CAMERA: STABLE overhead-angle shot looking down. Perfume bottle placed on elegant surface — full bottle with decorative cap visible from above. Presenter's hands gently frame the bottle. Bottle shape consistent from this single angle. Gift-worthy packaging PROOF." },
    ],
    sunscreen: [
        { script: (name) => `ทา ${name} แล้ว ปกป้องผิว ไม่วอก`, action: "CAMERA: Close-up application. Squeezes onto palm — lightweight texture, spreads evenly on face. Blends completely, no white cast. Invisible natural finish PROOF." },
        { script: (name) => `${name} เนื้อบางเบา ทาแล้วสบาย`, action: "CAMERA: Macro texture close-up. Shows lightweight texture on skin — sheer, non-greasy. Presenter touches face showing comfortable feel. Lightweight comfort PROOF." },
        { script: (name) => `${name} ทาทับเมคอัพได้ ไม่เลอะ`, action: "CAMERA: Step-by-step close-up. Applies over makeup — no disruption to base makeup underneath. Protective layer without mess. Makeup-compatible PROOF." },
        { script: (name) => `ทา ${name} ก่อนออกแดด ผิวไม่ดำ`, action: "CAMERA: Outdoor medium shot, bright sun. Applies sunscreen — goes out in sun confidently. Skin protected, no tanning visible. Sun protection PROOF." },
        { script: (name) => `${name} กันน้ำด้วย ทนทุกกิจกรรม`, action: "CAMERA: Dynamic outdoor shot. Presenter active in water/sweat — sunscreen stays effective, doesn't wash off. Water-resistant durability PROOF." },
        { script: (name) => `${name} ไม่อุดตัน ผิวหายใจได้`, action: "CAMERA: Close-up on pores. Applies sunscreen — skin still breathable, no clogged appearance. Light matte or dewy finish. Non-comedogenic PROOF." },
        { script: (name) => `${name} ทาง่าย เกลี่ยง่าย ไม่เป็นคราบ`, action: "CAMERA: Close-up of smooth application. Easy spread — no pilling, no streaks. Even coverage in seconds. Easy application PROOF." },
        { script: (name) => `${name} SPF สูง ปกป้องเต็มที่`, action: "CAMERA: Medium confident outdoor shot. Shows SPF level on packaging — applies generously. Full protection confidence. High SPF protection PROOF." },
        { script: (name) => `ทา ${name} ทุกวัน ผิวดีขึ้น`, action: "CAMERA: Gentle daily-routine shot. Morning routine — applies sunscreen as final step. Healthy protected skin. Daily essential PROOF." },
        { script: (name) => `${name} เนื้อโทนอัพ ผิวสว่างขึ้น`, action: "CAMERA: Before/after close-up. Applies tone-up sunscreen — skin instantly brighter, more even. Visible brightening effect. Tone-up brightening PROOF." },
    ],
    haircare: [
        { script: (name) => `ใช้ ${name} แล้ว ผมนุ่มสลวยมาก`, action: "CAMERA: Slow-motion medium shot. Runs fingers through hair — smooth silky strands flowing, visible shine and bounce. Beautiful luster in motion. Glossy smooth PROOF." },
        { script: (name) => `${name} ลดผมชี้ฟู เรียบสวย`, action: "CAMERA: Before/after close-up. Applies product — frizzy hair becomes smooth and tamed. Presenter touches silky result. Frizz control PROOF." },
        { script: (name) => `สระด้วย ${name} หอมมาก ฟองเยอะ`, action: "CAMERA: Close-up of lathering. Rich foam on hair — fragrant lather, gentle massaging. Rinses to reveal clean shiny hair. Cleansing + fragrance PROOF." },
        { script: (name) => `${name} ช่วยผมหนาขึ้น มีวอลุ่ม`, action: "CAMERA: Medium shot with wind/movement. Hair appears fuller, thicker after treatment — bouncy volume visible when moving. Volume-boosting PROOF." },
        { script: (name) => `ทรีทเม้นท์ ${name} ฟื้นฟูผมเสีย`, action: "CAMERA: Before/after close-up on hair strands. Applies treatment mask — damaged hair transforms to healthy shiny. Repair restoration PROOF." },
        { script: (name) => `${name} กลิ่นหอม ติดผมทั้งวัน`, action: "CAMERA: Medium lifestyle shot. Presenter shakes hair — fragrance implied, confident expression. Brings hair strand to nose, pleased. Long-lasting scent PROOF." },
        { script: (name) => `ใช้ ${name} แล้ว ผมไม่ร่วง`, action: "CAMERA: Close-up on brush/comb. Combs through hair — minimal hair on brush. Presenter shows clean brush, satisfied. Hair strength + reduced fallout PROOF." },
        { script: (name) => `จัดทรงด้วย ${name} อยู่ทรงนาน`, action: "CAMERA: Styling medium shot. Applies styling product — shapes hair into desired style. Shows lasting hold through movement. Styling hold PROOF." },
        { script: (name) => `${name} ทาแล้วไม่เหนียว ผมลื่นมาก`, action: "CAMERA: Close-up running fingers through. Applies product — hair stays light, not weighed down. Fingers glide through smoothly. Lightweight non-sticky PROOF." },
        { script: (name) => `ผมเงา ${name} สวยมาก เหมือนทำร้าน`, action: "CAMERA: Cinematic slow-motion hair flip. Light catches glossy hair strands — mirror-like shine. Salon-quality result at home. Professional shine PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Dental ── (VISUAL PROOF: must show PRODUCT TUBE as HERO + REALISTIC USAGE)
    // CRITICAL: Toothpaste TUBE is the product. Toothbrush is a PROP — always smaller/secondary.
    // ═══════════════════════════════════════════════════════════════
    dental: [
        { script: (name) => `${name} ฟอกขาวได้จริง เห็นผลเลย`, action: "CAMERA: Close-up on toothpaste tube held prominently in hand showing label to camera. Presenter FIRST shows tube front with branding clearly visible, THEN flips cap open with thumb, THEN squeezes a ribbon of paste onto the BRISTLE SIDE (top surface) of a toothbrush held in other hand. Toothpaste tube is LARGER and MORE PROMINENT than the toothbrush. Only ONE tube visible. Whitening claim PROOF." },
        { script: (name) => `เนื้อ ${name} เนียนนุ่ม รสชาติสดชื่น`, action: "CAMERA: Macro close-up on paste emerging from tube nozzle — smooth creamy texture visible. Presenter squeezes onto BRISTLE SIDE of toothbrush. THEN brings toothbrush near mouth showing brushing motion. Toothpaste tube remains in frame, prominently visible on counter. Texture + freshness PROOF." },
        { script: (name) => `แปรงด้วย ${name} ทุกเช้า ฟันขาวขึ้น`, action: "CAMERA: Morning bathroom medium shot. Presenter holds toothpaste tube showing label, opens cap, squeezes paste onto BRISTLE SIDE of brush. Demonstrates gentle circular brushing motion near mouth. THEN shows bright confident smile. Toothpaste tube visible throughout — it is the HERO product, toothbrush is just a prop. Daily routine PROOF." },
        { script: (name) => `${name} สูตรฟลูออไรด์ ปกป้องฟัน`, action: "CAMERA: Close-up of toothpaste tube label showing ingredients/features. Presenter FIRST holds tube showing front branding, THEN rotates tube to show back label with ingredient info, THEN flips cap and squeezes onto BRISTLE SIDE of brush. Tube is always the dominant, largest item in frame. Protection formula PROOF." },
        { script: (name) => `หลอด ${name} ดีไซน์สวย ใช้ง่าย`, action: "CAMERA: Macro orbit around toothpaste tube. Presenter FIRST shows tube front catching light — logo and branding crisp, THEN rotates slowly showing side profile and cap design, THEN flips cap open demonstrating easy squeeze mechanism, THEN closes cap. Continuous rotation of the tube — never static. Only ONE tube, no duplicates. Premium packaging PROOF." },
        { script: (name) => `ใช้ ${name} มา ฟันไม่เสียวมาก`, action: "CAMERA: Medium shot, presenter holds tube prominently. Opens cap, squeezes onto BRISTLE SIDE of toothbrush. Demonstrates gentle brushing near teeth. THEN smiles showing comfortable, no-sensitivity expression. THEN holds tube back to camera for final hero shot. Sensitivity relief PROOF." },
        { script: (name) => `${name} ลมหายใจสดชื่นตลอดวัน`, action: "CAMERA: Close-up then medium. Presenter squeezes paste from tube onto BRISTLE SIDE of brush, brushes near mouth. THEN exhales into cupped hand — fresh breath reaction, satisfied smile. THEN picks up toothpaste tube and holds to camera showing label. Tube is the HERO, always most prominent item. Fresh breath PROOF." },
        { script: (name) => `${name} ช่วยลดคราบ ฟันสะอาดหมดจด`, action: "CAMERA: Close-up of toothpaste tube being squeezed onto BRISTLE SIDE of brush — paste ribbon clearly visible on top of bristles. Presenter brushes in gentle motions. THEN rinses and shows bright clean smile to camera. THEN holds tube showing label — product is the hero of the final shot. Stain removal PROOF." },
        { script: (name) => `${name} เหงือกแข็งแรง ฟันแข็งแรง`, action: "CAMERA: Medium bathroom shot. Presenter holds tube showing branding, squeezes onto BRISTLE SIDE of brush. Brushes gently along gumline — careful technique shown. THEN smiles wide showing healthy gums and teeth. Tube stays visible on counter throughout. Gum health PROOF." },
        { script: (name) => `${name} คุ้มค่ามาก ใช้ได้นาน`, action: "CAMERA: Medium shot. Presenter shows toothpaste tube — squeezes small amount onto BRISTLE SIDE of brush demonstrating economical use. THEN holds tube showing remaining product amount — still plenty left. THEN holds tube to camera as final hero shot with satisfied expression. Value + longevity PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Fashion & Accessories ── (VISUAL PROOF: must show WEARING + FIT/STYLE)
    // ═══════════════════════════════════════════════════════════════
    fashion: [
        { script: (name) => `ใส่ ${name} แล้ว ดูดีมากเลย`, action: "CAMERA: Medium tracking with slow orbit. Presenter wearing garment — confident turn showing front, side, back. Fabric drapes beautifully. Flattering fit + confident body language PROOF." },
        { script: (name) => `เนื้อผ้า ${name} ดีมาก ใส่สบาย`, action: "CAMERA: Macro close-up on fabric then medium. Pinches/stretches fabric — quality texture, elasticity visible. Moves naturally (bends, stretches). Fabric quality + unrestricted movement PROOF." },
        { script: (name) => `แมตช์ง่าย ${name} ใส่ได้ทุกวัน`, action: "CAMERA: Medium lifestyle shot. Styles outfit with accessories — adjusts collar, rolls sleeves, pairs items. Checks self confidently. Effortless styling versatility PROOF." },
        { script: (name) => `${name} ทรงสวย เข้ารูปพอดี`, action: "CAMERA: Head-to-toe tracking then close-up on fit. Presenter shows silhouette — tailored fit, clean lines. Turns to show how garment follows body shape. Perfect fit/silhouette PROOF." },
        { script: (name) => `สี ${name} สวยมาก ถูกใจเลย`, action: "CAMERA: Well-lit medium shot. Garment color vibrant and true — presenter shows in different lighting. Rich dye quality visible. Color quality PROOF." },
        { script: (name) => `${name} ซักง่าย ไม่หด ไม่ย้วย`, action: "CAMERA: Close-up on fabric quality. Shows garment maintaining shape — no pilling, no stretching. Durable quality visible. Wash-durability PROOF." },
        { script: (name) => `ใส่ ${name} ไปทำงานก็ได้ ไปเที่ยวก็ดี`, action: "CAMERA: Multi-context medium shots. Same outfit in office, then casual outing — works for both. Versatile all-occasion PROOF." },
        { script: (name) => `ดีเทล ${name} ละเอียดมาก`, action: "CAMERA: Macro tracking on details. Stitching, buttons, zippers, lining — premium craftsmanship close-ups. Presenter points at details. Construction quality PROOF." },
        { script: (name) => `${name} ใส่แล้วดูผอมเลย`, action: "CAMERA: Head-to-toe medium with flattering angle. Garment's slimming/flattering effect visible — presenter turns showing how garment drapes. Flattering silhouette effect PROOF." },
        { script: (name) => `${name} ใส่กับอะไรก็เข้า`, action: "CAMERA: Quick outfit-change montage medium shots. Pairs with different bottoms/tops/accessories — all combinations work. Mix-and-match versatility PROOF." },
    ],
    sportswear: [
        { script: (name) => `ใส่ ${name} ออกกำลังกาย สบายมาก`, action: "CAMERA: Dynamic tracking during exercise. Stretching, jumping, running — fabric moves with body. Unrestricted athletic movement + fabric performance PROOF." },
        { script: (name) => `${name} ระบายอากาศดี ไม่ร้อน`, action: "CAMERA: Close-up on mesh/breathable areas. Active movement — comfortable despite exertion. Shows breathable zones. Comfortable active wear PROOF." },
        { script: (name) => `${name} ยืดหยุ่นดีมาก เคลื่อนไหวสะดวก`, action: "CAMERA: Low-angle dynamic shot. Deep stretches, lunges, squats — fabric stretches perfectly with body. Full range of motion. Stretch flexibility PROOF." },
        { script: (name) => `ใส่ ${name} วิ่งลื่นมาก ไม่อึดอัด`, action: "CAMERA: Tracking alongside running presenter. Running stride — fabric stays in place, doesn't ride up. Comfortable running motion. Running comfort PROOF." },
        { script: (name) => `${name} แห้งเร็ว ไม่เหนอะหนะ`, action: "CAMERA: Close-up post-workout. After intense exercise — fabric dries quickly, not clinging. Shows moisture-wicking performance. Quick-dry technology PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวย ใส่ออกข้างนอกได้`, action: "CAMERA: Lifestyle transition shot. From gym to casual outing — sportswear looks stylish outside gym context. Athleisure crossover PROOF." },
        { script: (name) => `${name} รัดรูปพอดี ซัพพอร์ตดี`, action: "CAMERA: Medium shot during exercise. Compression fit — supports muscles during activity. Secure fit, no shifting. Supportive compression PROOF." },
        { script: (name) => `เอว ${name} ยืดหยุ่น ไม่รัดแน่น`, action: "CAMERA: Close-up on waistband. Elastic waistband — comfortable stretch, stays put. No digging or discomfort. Comfortable elastic PROOF." },
        { script: (name) => `${name} มีกระเป๋าด้วย สะดวกมาก`, action: "CAMERA: Close-up of pocket functionality. Slips phone/keys into pocket — stays secure during movement. Functional pocket design PROOF." },
        { script: (name) => `ใส่ ${name} โยคะก็ดี เทรนก็สบาย`, action: "CAMERA: Multi-activity tracking. Yoga pose, then weightlifting, then stretching — same outfit works for all. Multi-sport versatility PROOF." },
    ],
    jewelry: [
        { script: (name) => `ใส่ ${name} แล้ว ประกายสวยมาก`, action: "CAMERA: Macro close-up with light play. Presenter FIRST shows jewelry on hand/wrist/neck from front angle, THEN tilts to catch light — sparkling facets dancing, THEN rotates showing different angle, THEN brings close to camera for detail. Continuous angle shifts. Sparkle + light play PROOF." },
        { script: (name) => `${name} งานละเอียด ดูแพงมาก`, action: "CAMERA: Extreme macro tracking on details. Presenter FIRST shows full jewelry piece, THEN tilts for macro view of metalwork, THEN rotates to show stone setting from side, THEN traces details with fingertip pointing at craftsmanship. Multi-angle detail exploration. Micro-craftsmanship PROOF." },
        { script: (name) => `ใส่ ${name} แมตช์ชุดง่ายมาก`, action: "CAMERA: Medium outfit pairing shots. Jewelry with different outfits — casual, formal, party. All combinations elegant. Versatile styling PROOF." },
        { script: (name) => `${name} ใส่สบาย ไม่หนัก ไม่บาด`, action: "CAMERA: Close-up wearing comfort. Puts on jewelry — comfortable fit, no irritation. Natural movement with jewelry on. Wearing comfort PROOF." },
        { script: (name) => `เปิดกล่อง ${name} สวยมาก ตื่นเต้น`, action: "CAMERA: Overhead unboxing. Opens jewelry box — dramatic lighting reveals piece. Presenter gasps at beauty. Gift-worthy unboxing PROOF." },
        { script: (name) => `${name} สีไม่ลอก ใส่ได้นาน`, action: "CAMERA: Close-up of lasting quality. Shows jewelry after use — still shiny, no tarnishing. Durable lasting quality PROOF." },
        { script: (name) => `ใส่ ${name} ถ่ายรูปสวยมาก`, action: "CAMERA: Photo-ready medium shot. Poses with jewelry — catches light beautifully in photos. Photogenic sparkle PROOF." },
        { script: (name) => `${name} ให้เป็นของขวัญ ถูกใจแน่นอน`, action: "CAMERA: Gift-giving medium shot. Presents jewelry box — recipient opens, delighted reaction. Perfect gift moment PROOF." },
        { script: (name) => `ตัวเรือน ${name} แข็งแรง ทนทาน`, action: "CAMERA: Macro on clasp/setting. Shows sturdy construction — secure clasp, firm stone setting. Build quality durability PROOF." },
        { script: (name) => `ใส่ ${name} แล้ว ดูหรูหราเลย`, action: "CAMERA: Cinematic medium portrait. Presenter wearing jewelry — elegant pose, luxury aesthetic. Jewelry elevating entire look. Luxury elevation PROOF." },
    ],
    watch: [
        { script: (name) => `สวม ${name} แล้ว ดูมีระดับมาก`, action: "CAMERA: Close-up wrist shot with orbit. Presenter FIRST shows watch face straight-on catching light, THEN rotates wrist to show side profile/crown, THEN tilts wrist for dial detail close-up, THEN pulls sleeve showing watch with outfit. Continuous wrist angle changes. Premium dial + outfit elevation PROOF." },
        { script: (name) => `เครื่อง ${name} เดินแม่น ดูดีทุกมุม`, action: "CAMERA: Extreme macro on watch face. FIRST shows dial straight-on — second hand ticking, markings crisp, THEN tilts wrist to show case thickness from side, THEN rotates showing caseback detail, THEN returns to face angle. Continuous wrist rotation showing every angle. Precision movement + craftsmanship PROOF." },
        { script: (name) => `สาย ${name} ใส่สบาย เปลี่ยนได้`, action: "CAMERA: Close-up strap detail. Shows strap material — comfortable on wrist, easy adjustment. Quick-release mechanism demo. Strap comfort + swappability PROOF." },
        { script: (name) => `${name} กันน้ำ ใส่อาบน้ำได้`, action: "CAMERA: Dynamic shot near water. Watch exposed to water — still functioning perfectly. Presenter checks time confidently. Water resistance PROOF." },
        { script: (name) => `หน้าปัด ${name} สวยมาก อ่านง่าย`, action: "CAMERA: Macro close-up on dial. Clear indices, hands, complications — easy to read at glance. Beautiful dial design. Legibility + dial beauty PROOF." },
        { script: (name) => `${name} ใส่แล้วดูเท่ มีสไตล์`, action: "CAMERA: Lifestyle medium shot. Presenter in stylish outfit with watch — confident gestures naturally showing watch. Watch as style statement PROOF." },
        { script: (name) => `น้ำหนัก ${name} กำลังดี ไม่หนัก`, action: "CAMERA: Close-up of wrist comfort. Shows watch on wrist during natural movement — no burden, balanced weight. Comfortable all-day wear PROOF." },
        { script: (name) => `กล่อง ${name} พรีเมียม สวยมาก`, action: "CAMERA: Overhead unboxing. Opens premium watch box — reveal moment, watch nestled in cushion. Presenter lifts out carefully. Premium presentation PROOF." },
        { script: (name) => `${name} เรืองแสงในที่มืดด้วย`, action: "CAMERA: Transition from light to dark. Watch lume visible in darkness — indices and hands glowing. Readable in any condition. Lume functionality PROOF." },
        { script: (name) => `ใส่ ${name} ไปไหนก็ได้ เข้ากับทุกชุด`, action: "CAMERA: Multiple outfit context shots. Same watch with formal, casual, sporty outfits — works with all. Universal versatility PROOF." },
    ],
    bag: [
        { script: (name) => `สะพาย ${name} แล้ว ดูดีมาก`, action: "CAMERA: Tracking shot following walk. Presenter FIRST holds bag showing front design to camera, THEN puts on shoulder adjusting strap, THEN walks showing side profile, THEN turns to show back. Shape holds, material quality visible at every angle. Multi-angle carry showcase PROOF." },
        { script: (name) => `${name} ใส่ของได้เยอะ ช่องเยอะ`, action: "CAMERA: Overhead shot into bag interior. Presenter FIRST shows bag exterior closed, THEN unzips revealing organized compartments, THEN puts phone/wallet/keys in, THEN lifts bag showing fullness without bulge, THEN closes and shows exterior again. Open-to-close dynamic sequence. Organized interior + capacity PROOF." },
        { script: (name) => `ซิป ${name} ลื่นมาก เปิดปิดง่าย`, action: "CAMERA: Macro close-up on hardware. Zips smoothly — premium metal hardware catching light. Buckle, clasp, logo detail. Hardware quality PROOF." },
        { script: (name) => `หนัง ${name} คุณภาพดี สวยมาก`, action: "CAMERA: Macro tracking on material surface. Presenter FIRST shows bag front material close-up, THEN runs finger along stitching, THEN flips to show back material texture, THEN tilts to show grain/finish catching light. Continuous surface exploration. Material quality PROOF." },
        { script: (name) => `${name} สะพายไม่เมื่อย เบาดี`, action: "CAMERA: Lifestyle tracking shot. Walks with bag all day — comfortable strap, no shoulder pain. Lightweight daily use. All-day comfort PROOF." },
        { script: (name) => `${name} กันน้ำด้วย ไม่กลัวฝน`, action: "CAMERA: Outdoor rainy shot. Bag in rain — water beads off surface. Contents safe and dry. Water resistance PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวยหรู เข้ากับทุกลุค`, action: "CAMERA: Multi-outfit medium shots. Bag with different outfits — work, casual, evening. All look great. Versatile design PROOF." },
        { script: (name) => `${name} มีช่องลับ ปลอดภัยมาก`, action: "CAMERA: Close-up of hidden pocket. Shows secret compartment — slides valuables inside safely. Secure and discrete. Security feature PROOF." },
        { script: (name) => `ขนาด ${name} พอดี ไม่ใหญ่ไม่เล็ก`, action: "CAMERA: Size comparison medium shot. Bag with everyday items — everything fits, not bulky. Goldilocks size demonstration. Perfect size PROOF." },
        { script: (name) => `${name} ฟอร์มสวย ตั้งได้ไม่ล้ม`, action: "CAMERA: Tabletop shot. Places bag down — stands upright on its own. Structured shape holds. Structural form PROOF." },
    ],
    shoe: [
        { script: (name) => `ใส่ ${name} แล้ว สบายมาก เดินลื่น`, action: "CAMERA: Low-angle tracking of feet walking. Walks naturally — cushioned stride, comfortable gait. Soft landing visible. Comfortable natural walking PROOF." },
        { script: (name) => `พื้น ${name} นุ่มมาก เดินทั้งวันไม่เจ็บ`, action: "CAMERA: Macro on sole compression. Presses thumb on sole — cushion compresses, bounces back. Walks comfortably after. Sole cushion + bounce-back PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวย แมตช์ง่าย`, action: "CAMERA: Multi-angle orbit around shoe. Presenter FIRST holds shoe showing side profile, THEN rotates to show front toe design, THEN tilts to show sole tread, THEN flips to show back heel detail, THEN sets down showing full silhouette. Continuous 360° rotation — never pauses at one angle. Design detail + outfit coordination PROOF." },
        { script: (name) => `สวม ${name} ง่าย ไม่ต้องนั่งใส่นาน`, action: "CAMERA: Medium shot of putting on. Slides foot in easily — quick entry, no struggle. Ready to go instantly. Easy on/off PROOF." },
        { script: (name) => `${name} กระชับเท้า ไม่หลวม ไม่บีบ`, action: "CAMERA: Close-up on foot fit. Shows snug but comfortable fit — no slipping, no tightness. Natural foot shape accommodation. Perfect fit PROOF." },
        { script: (name) => `วิ่งด้วย ${name} ลื่นมาก`, action: "CAMERA: Dynamic tracking during run. Running in shoes — visible cushion response, stable stride. Athletic performance visible. Running performance PROOF." },
        { script: (name) => `${name} กันลื่น เดินพื้นเปียกก็มั่นใจ`, action: "CAMERA: Low-angle on wet surface. Walks confidently on wet floor — no slipping. Tread grip visible. Anti-slip traction PROOF." },
        { script: (name) => `วัสดุ ${name} ดีมาก ทนทาน`, action: "CAMERA: Macro on material quality. Shows material — leather grain, knit texture, stitching. Premium durability visible. Material quality + durability PROOF." },
        { script: (name) => `${name} น้ำหนักเบา เดินไม่เหนื่อย`, action: "CAMERA: Medium tracking shot. Light bouncy stride — shoe barely felt. Picks up shoe to show lightweight. Lightweight comfort PROOF." },
        { script: (name) => `${name} ใส่ทั้งวัน เท้าไม่เหม็น`, action: "CAMERA: Close-up of breathable construction. Shows ventilation points — breathable mesh/holes. Fresh even after long wear. Breathable fresh PROOF." },
    ],
    sunglasses: [
        { script: (name) => `ใส่ ${name} แล้ว ดูเท่มาก`, action: "CAMERA: Medium cinematic shot. Presenter FIRST holds sunglasses showing frame design to camera, THEN rotates showing side temple detail, THEN puts on — instant style transformation, THEN tilts head showing different angles. Continuous angle changes before and after wearing. Before→after style upgrade PROOF." },
        { script: (name) => `เลนส์ ${name} ชัดมาก กันแดดดี`, action: "CAMERA: POV through lens then medium. Shows clear vision through lens — UV protection. Comfortable in bright sun. Lens clarity + protection PROOF." },
        { script: (name) => `ทรง ${name} เข้ากับหน้า พอดีเลย`, action: "CAMERA: Close-up face shot from angles. Frame shape flatters face — shows from front, side, 3/4 angle. Perfect frame-to-face match PROOF." },
        { script: (name) => `${name} เบามาก ใส่ทั้งวันไม่เจ็บจมูก`, action: "CAMERA: Close-up of nose bridge. Lightweight frame — no pressure marks. Comfortable extended wear. All-day comfort PROOF." },
        { script: (name) => `${name} พับเก็บง่าย พกสะดวก`, action: "CAMERA: Close-up of folding mechanism. Folds compactly — fits in case/pocket. Presenter pockets easily. Portability PROOF." },
        { script: (name) => `สี ${name} สวยมาก ดูมีสไตล์`, action: "CAMERA: Detail shots of color/finish. Frame color catches light — premium finish visible. Stylish color choice. Color/style PROOF." },
        { script: (name) => `${name} ทนทาน บิดงอได้ ไม่หัก`, action: "CAMERA: Close-up flex test. Gently flexes frame — returns to shape. Durable flexible construction. Flexibility + durability PROOF." },
        { script: (name) => `ใส่ ${name} ขับรถ มองชัดมาก`, action: "CAMERA: POV driving medium shot. Wearing sunglasses while driving — clear vision, reduced glare. Safe driving comfort. Anti-glare driving PROOF." },
        { script: (name) => `${name} แมตช์ได้ทุกลุค`, action: "CAMERA: Multi-outfit medium shots. Same sunglasses with different styles — sporty, casual, dressy. Universal match. Style versatility PROOF." },
        { script: (name) => `เคส ${name} สวย เก็บแว่นปลอดภัย`, action: "CAMERA: Close-up of case + storage. Opens premium case — sunglasses nestled safely. Quality case protection. Premium storage PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Home & Kitchen ── (VISUAL PROOF: must show IN-USE + VISIBLE RESULT)
    // ═══════════════════════════════════════════════════════════════
    home: [
        { script: (name) => `ใช้ ${name} แล้ว บ้านดูดีขึ้นเลย`, action: "CAMERA: Wide before→after shot. Places product in living space — steps back to admire. Room visibly improved. Room transformation PROOF." },
        { script: (name) => `${name} จัดระเบียบง่าย เรียบร้อยทันที`, action: "CAMERA: Overhead time-progression. Organizing items — messy→neat transformation. Final result satisfyingly tidy. Mess→neat PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวย เข้ากับห้อง`, action: "CAMERA: Medium orbit around product in room. Product blends with decor — enhances room aesthetic. Design harmony PROOF." },
        { script: (name) => `${name} ใช้งานง่าย สะดวกมาก`, action: "CAMERA: Close-up of operation. Simple intuitive use — press/turn/plug. Works immediately, effortless. Ease of use PROOF." },
        { script: (name) => `${name} ประหยัดพื้นที่ ดีมาก`, action: "CAMERA: Wide to close-up. Compact product fitting small space perfectly — maximizes room. Space-saving PROOF." },
        { script: (name) => `คุณภาพ ${name} ดีมาก ทนทาน`, action: "CAMERA: Macro on build quality. Premium materials, solid construction — presenter tests sturdiness. Durability quality PROOF." },
        { script: (name) => `${name} ทำให้ห้องหอมสบาย`, action: "CAMERA: Medium atmospheric shot. Product creating pleasant ambiance — presenter inhales, relaxed expression. Ambient comfort PROOF." },
        { script: (name) => `ติดตั้ง ${name} ง่ายเลย`, action: "CAMERA: Step-by-step medium. Quick assembly/installation — presenter does it easily. No tools needed. Easy setup PROOF." },
        { script: (name) => `${name} ช่วยประหยัดค่าไฟ`, action: "CAMERA: Medium informative shot. Efficient operation — low power consumption visible. Energy-saving practical benefit PROOF." },
        { script: (name) => `${name} ดูแพง แต่ราคาดี`, action: "CAMERA: Elegant medium orbit. Premium look — presenter admires quality vs price. Value-for-money premium PROOF." },
    ],
    furniture: [
        { script: (name) => `${name} นั่งสบายมาก ดีไซน์สวย`, action: "CAMERA: Medium to close-up. Sits on furniture — sinks slightly, comfortable cushioning. Runs hand over material. Comfort + quality PROOF." },
        { script: (name) => `${name} ดีไซน์เข้ากับห้องเลย`, action: "CAMERA: Wide room shot. Furniture enhancing room aesthetic — blends with decor perfectly. Interior design harmony PROOF." },
        { script: (name) => `${name} ทนทาน แข็งแรงมาก`, action: "CAMERA: Close-up of construction. Solid build — joints, materials, weight capacity. Presenter tests sturdiness. Build quality PROOF." },
        { script: (name) => `ประกอบ ${name} ง่าย ไม่ยุ่งยาก`, action: "CAMERA: Time-progression medium. Assembly process — quick, intuitive, no tools needed. Finished product beautiful. Easy assembly PROOF." },
        { script: (name) => `${name} ประหยัดพื้นที่ พับเก็บได้`, action: "CAMERA: Before/after medium. Folds/collapses compactly — saves space. Opens to full size easily. Space-saving foldable PROOF." },
        { script: (name) => `นอน ${name} สบาย หลับง่ายมาก`, action: "CAMERA: Gentle medium shot. Lies on bed/sofa — instantly relaxed, comfortable posture. Plush cushioning visible. Sleep comfort PROOF." },
        { script: (name) => `เนื้อวัสดุ ${name} พรีเมียมมาก`, action: "CAMERA: Macro on material surface. Wood grain, fabric texture, leather — premium materials. Presenter touches appreciatively. Material premium PROOF." },
        { script: (name) => `${name} มีที่เก็บของด้วย สะดวก`, action: "CAMERA: Close-up of storage feature. Opens drawers/compartments — organized hidden storage. Functional design PROOF." },
        { script: (name) => `${name} รับน้ำหนักได้ดี มั่นคง`, action: "CAMERA: Medium stability test. Sits/leans on furniture — no wobble, stable and firm. Weight capacity confidence PROOF." },
        { script: (name) => `${name} สวยทุกมุม ถ่ายรูปลงได้เลย`, action: "CAMERA: Multi-angle orbit. Shows from every angle — photogenic from all sides. Instagram-worthy furniture PROOF." },
    ],
    kitchen: [
        { script: (name) => `ใช้ ${name} ทำอาหาร สะดวกมาก`, action: "CAMERA: Medium tracking of cooking process. Actively cooking — sizzling/steaming/blending visible. Delicious result. Cooking producing real food PROOF." },
        { script: (name) => `${name} ทำอาหารเสร็จเร็ว ประหยัดเวลา`, action: "CAMERA: Time-progression close-up. Presses button — machine works quickly. Opens showing perfect result. Fast cooking + perfect result PROOF." },
        { script: (name) => `ล้าง ${name} ง่ายมาก ดูแลสะดวก`, action: "CAMERA: Close-up of cleaning. Rinses under water — detachable parts, smooth surfaces. Wipes dry quickly. Effortless cleaning PROOF." },
        { script: (name) => `${name} ทำได้หลายเมนู เก่งมาก`, action: "CAMERA: Quick-cut montage. Multiple dishes prepared — versatile cooking capability. All delicious results. Multi-function versatility PROOF." },
        { script: (name) => `${name} ใช้ง่าย กดปุ่มเดียว`, action: "CAMERA: Close-up of single-button operation. One-touch cooking — simple interface. Perfect result from minimal effort. One-touch simplicity PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวย เข้ากับครัว`, action: "CAMERA: Wide kitchen setting. Appliance blending with kitchen decor — premium appearance. Aesthetic kitchen upgrade PROOF." },
        { script: (name) => `${name} ปลอดภัย มีระบบตัดไฟ`, action: "CAMERA: Close-up of safety features. Auto-shutoff, cool-touch, safety locks — protection systems visible. Safety feature PROOF." },
        { script: (name) => `อาหารที่ทำจาก ${name} อร่อยมาก`, action: "CAMERA: Close-up of finished dish. Beautiful plated result — steam rising, appetizing. Presenter takes first bite, delighted. Delicious result PROOF." },
        { script: (name) => `${name} เก็บง่าย ไม่เปลืองที่`, action: "CAMERA: Medium storage demo. Compact storage — disassembles or stacks neatly. Fits in cabinet. Space-efficient PROOF." },
        { script: (name) => `${name} แข็งแรง ทนทาน ใช้ได้นาน`, action: "CAMERA: Close-up of build quality. Solid construction — stainless steel, durable materials. Heavy-duty reliable feel. Build durability PROOF." },
    ],
    cleaning: [
        { script: (name) => `ใช้ ${name} แล้ว สะอาดหมดจด`, action: "CAMERA: Before→after dramatic shot. Sprays/applies on dirty surface — wipes once, dirt disappears. Sparkling result. Dirty→clean transformation PROOF." },
        { script: (name) => `${name} ขจัดคราบง่าย ทรงพลังมาก`, action: "CAMERA: Close-up of stubborn stain. Applies product — scrubs briefly. Stain completely gone. Impressed expression. Stain vanishing PROOF." },
        { script: (name) => `กลิ่น ${name} หอมสะอาด สดชื่น`, action: "CAMERA: Medium after-cleaning. Inhales fresh clean scent — pleased expression. Room feels fresh. Clean fragrance PROOF." },
        { script: (name) => `${name} ฆ่าเชื้อได้ด้วย ปลอดภัย`, action: "CAMERA: Close-up of sanitizing spray/wipe. Disinfects surface — safe clean environment. Hygiene protection PROOF." },
        { script: (name) => `${name} ใช้ง่าย ฉีดแล้วเช็ด จบ`, action: "CAMERA: Quick step-by-step. Spray, wipe, done — effortless 3-step process. Simple cleaning routine PROOF." },
        { script: (name) => `${name} ทำความสะอาดได้ทุกพื้นผิว`, action: "CAMERA: Multi-surface demo. Cleans tile, glass, metal, wood — all surfaces sparkle. Universal cleaning PROOF." },
        { script: (name) => `${name} ปลอดภัย ไม่มีสารเคมีรุนแรง`, action: "CAMERA: Close-up label + use. Shows gentle formula — safe for hands, safe for family. Gentle safe formula PROOF." },
        { script: (name) => `ใช้ ${name} นิดเดียว พอเลย`, action: "CAMERA: Close-up of economical use. Small amount — big cleaning power. Long-lasting bottle/pack. Economical concentrated PROOF." },
        { script: (name) => `${name} ทำให้ห้องน้ำวิ้งเลย`, action: "CAMERA: Bathroom before→after. Scrubs tiles/fixtures — sparkling white result. Presenter admires. Bathroom sparkle PROOF." },
        { script: (name) => `ดูดฝุ่นด้วย ${name} สะอาดมาก`, action: "CAMERA: Tracking following vacuum/mop. Cleans floor visibly — dust/dirt disappearing path. Clean streak behind. Floor cleaning PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Health & Wellness ── (VISUAL PROOF: must show TAKING/USING + BENEFIT)
    // ═══════════════════════════════════════════════════════════════
    supplement: [
        { script: (name) => `ทาน ${name} แล้ว รู้สึกดีขึ้นจริง`, action: "CAMERA: Medium push-in. Pours capsules into palm — takes one with water. Natural swallow, satisfied expression. Healthy energetic appearance. Easy consumption + vitality PROOF." },
        { script: (name) => `${name} สารอาหารครบ ทานง่าย`, action: "CAMERA: Close-up label then consumption. Reads quality ingredients — opens container, takes easily. No grimace. Ingredient quality + effortless consumption PROOF." },
        { script: (name) => `${name} เม็ดเล็ก กลืนง่ายมาก`, action: "CAMERA: Macro on pill size then face. Small tablet/capsule — swallows easily with water. Comfortable no-fuss. Easy-to-swallow PROOF." },
        { script: (name) => `ทาน ${name} ทุกเช้า เป็นกิจวัตร`, action: "CAMERA: Morning routine medium shot. Takes supplement as daily habit — energetic start to day. Healthy routine confidence. Daily routine PROOF." },
        { script: (name) => `${name} ช่วยเรื่องนอนหลับ ดีขึ้นจริง`, action: "CAMERA: Evening relaxed shot. Takes supplement before bed — relaxed yawn, comfortable expression. Better sleep implied. Sleep improvement PROOF." },
        { script: (name) => `แพ็คเกจ ${name} สวย เก็บง่าย`, action: "CAMERA: Macro on packaging. Premium container/bottle — clean design, sealed quality. Easy to open/close. Premium packaging PROOF." },
        { script: (name) => `${name} ไม่มีกลิ่น ทานสบาย`, action: "CAMERA: Close-up sniff test then consumption. No unpleasant smell — presenter takes comfortably. Zero unpleasant taste/odor. Odorless comfortable PROOF." },
        { script: (name) => `ทาน ${name} แล้ว ผิวดีขึ้นเลย`, action: "CAMERA: Before/after face close-up. Shows healthier glowing skin after consistent use. Touches face proudly. Visible skin improvement PROOF." },
        { script: (name) => `${name} มี อย. ปลอดภัย ทานได้สบายใจ`, action: "CAMERA: Close-up of certification/label. Shows FDA/quality certification — takes supplement confidently. Safety certification PROOF." },
        { script: (name) => `${name} คุ้มค่า เม็ดเยอะ ทานได้นาน`, action: "CAMERA: Medium shot of quantity. Shows large count/supply — long-lasting value. Economical daily supplement PROOF." },
    ],
    vitamin: [
        { script: (name) => `ทาน ${name} ทุกวัน สุขภาพดีขึ้น`, action: "CAMERA: Morning routine medium. Takes vitamin with breakfast — energetic healthy appearance. Effortless daily routine + vitality PROOF." },
        { script: (name) => `${name} รสชาติดี ทานง่าย`, action: "CAMERA: Close-up of pleasant consumption. Chewable/gummy — pleasant taste reaction. No grimace. Enjoyable vitamin PROOF." },
        { script: (name) => `${name} มีวิตามินครบ จบในเม็ดเดียว`, action: "CAMERA: Close-up label then consumption. Complete nutritional info — one tablet covers all. Convenient complete nutrition PROOF." },
        { script: (name) => `ทาน ${name} แล้ว มีแรงขึ้นเลย`, action: "CAMERA: Before/after medium. Tired expression → takes vitamin → energized active. Visible energy boost PROOF." },
        { script: (name) => `${name} สำหรับผิว ผมเล็บ ดีขึ้นจริง`, action: "CAMERA: Close-up on skin/hair/nails. Healthy improvement visible — glowing skin, strong nails. Beauty benefit PROOF." },
        { script: (name) => `เด็กๆ ก็ทาน ${name} ได้ ชอบมาก`, action: "CAMERA: Family medium shot. Child takes vitamin happily — pleasant taste, no fuss. Family-friendly formula PROOF." },
        { script: (name) => `${name} ละลายน้ำได้ ดื่มสะดวก`, action: "CAMERA: Close-up dissolution. Drops effervescent tablet — fizzes in water, colorful liquid. Drinks refreshing vitamin water. Effervescent convenience PROOF." },
        { script: (name) => `${name} เสริมภูมิคุ้มกัน แข็งแรงขึ้น`, action: "CAMERA: Confident active medium shot. Takes vitamin — shows active healthy lifestyle. Strong immune system confidence. Immunity boost PROOF." },
        { script: (name) => `ทาน ${name} ก่อนนอน ตื่นมาสดชื่น`, action: "CAMERA: Evening to morning transition. Takes vitamin at night → wakes up refreshed. Overnight benefit PROOF." },
        { script: (name) => `${name} ซื้อง่าย ราคาดี`, action: "CAMERA: Medium product showcase. Affordable quality product — presenter shows good value. Accessible wellness PROOF." },
    ],
    protein: [
        { script: (name) => `ชง ${name} ง่ายมาก รสชาติอร่อย`, action: "CAMERA: Close-up mixing process. Scoops powder, shakes vigorously — smooth texture. Takes sip, pleased. Smooth mixing + taste PROOF." },
        { script: (name) => `${name} ละลายง่าย ไม่เป็นก้อน`, action: "CAMERA: Macro of liquid texture. Smooth mixed protein — no clumps, creamy texture. Pours showing consistency. Smooth dissolution PROOF." },
        { script: (name) => `ดื่ม ${name} หลังเทรน ฟื้นตัวเร็ว`, action: "CAMERA: Post-workout medium. After intense workout — drinks protein shake. Refreshed recovery feeling. Post-workout recovery PROOF." },
        { script: (name) => `${name} โปรตีนสูง อิ่มนาน`, action: "CAMERA: Medium shot through day. Drinks shake — stays satisfied, no hunger. High protein satiety. Lasting fullness PROOF." },
        { script: (name) => `รสชาติ ${name} อร่อย ดื่มง่ายมาก`, action: "CAMERA: Close-up tasting reaction. Sips — genuinely delicious reaction. Takes another sip eagerly. Delicious flavor PROOF." },
        { script: (name) => `${name} มีหลายรส เลือกได้`, action: "CAMERA: Wide shot of flavor variants. Multiple flavors displayed — presenter tries different ones, reacts positively. Flavor variety PROOF." },
        { script: (name) => `ชง ${name} กับนมก็อร่อย`, action: "CAMERA: Recipe-style close-up. Mixes with milk — rich creamy result. Tastes and approves. Recipe versatility PROOF." },
        { script: (name) => `${name} แคลอรี่ต่ำ ไม่อ้วน`, action: "CAMERA: Close-up nutrition label then consumption. Shows low-calorie, high-protein stats. Confident healthy drinking. Lean nutrition PROOF." },
        { script: (name) => `เวย์ ${name} คุณภาพดี เกรดพรีเมียม`, action: "CAMERA: Macro on premium packaging. Quality container, premium branding. Scoops showing fine powder. Premium quality PROOF." },
        { script: (name) => `${name} ช่วยสร้างกล้ามเนื้อ เห็นผล`, action: "CAMERA: Fitness medium shot. Drinks shake + shows fit physique — muscle definition, athletic build. Muscle building result PROOF." },
    ],
    fitness: [
        { script: (name) => `ใช้ ${name} เทรนแล้ว เห็นผลจริง`, action: "CAMERA: Dynamic tracking during exercise. Proper form, intense effort — muscles engaged, sweat visible. Real athletic exertion. Proper-form workout PROOF." },
        { script: (name) => `${name} ทนทานมาก ฟิตหนักได้`, action: "CAMERA: Low-angle hero shot. Pushes equipment hard — heavy weight, no flex/wobble. Equipment surviving intense use PROOF." },
        { script: (name) => `จับ ${name} ถนัดมือ กระชับดี`, action: "CAMERA: Macro on grip. Hand wraps naturally around handle — ergonomic fit, secure non-slip grip. Comfort during movement PROOF." },
        { script: (name) => `${name} ปรับระดับได้ เหมาะทุกคน`, action: "CAMERA: Close-up adjustment demo. Adjusts resistance/weight/height — versatile for all levels. Customizable equipment PROOF." },
        { script: (name) => `เก็บ ${name} ง่าย ไม่เปลืองที่`, action: "CAMERA: Medium storage demo. Folds/disassembles compactly — fits in small space. Space-efficient storage PROOF." },
        { script: (name) => `ใช้ ${name} ที่บ้านก็ฟิตได้`, action: "CAMERA: Home gym medium shot. Working out at home — full range exercises possible. Home fitness convenience PROOF." },
        { script: (name) => `${name} เงียบมาก ใช้ในคอนโดได้`, action: "CAMERA: Close-up quiet operation. Silent exercise — no noise disturbance. Apartment-friendly PROOF." },
        { script: (name) => `ออกกำลังกายด้วย ${name} สนุกมาก`, action: "CAMERA: Energetic tracking shot. Fun workout routine — presenter enjoying exercise, smiling. Enjoyable fitness PROOF." },
        { script: (name) => `${name} ช่วยลดพุง เห็นผลไว`, action: "CAMERA: Active medium shot. Core exercises — targeted muscle engagement. Effective body transformation PROOF." },
        { script: (name) => `${name} คุณภาพดี เหมือนยิมจริง`, action: "CAMERA: Professional gym-quality medium. Gym-grade equipment at home — premium feel, smooth operation. Professional quality PROOF." },
    ],
    yoga: [
        { script: (name) => `ใช้ ${name} โยคะแล้ว สบายมาก`, action: "CAMERA: Gentle medium shot, calm setting. Yoga pose on mat/with prop — stable balanced, serene expression. Perfect support. Stability + comfort PROOF." },
        { script: (name) => `${name} กันลื่นดีมาก มั่นใจเลย`, action: "CAMERA: Close-up on grip surface. Hands/feet on mat — zero slipping during poses. Secure grip. Non-slip PROOF." },
        { script: (name) => `เนื้อ ${name} นุ่ม รองรับดี`, action: "CAMERA: Macro on cushion/surface. Shows material density — soft yet supportive. Comfortable on joints. Cushion support PROOF." },
        { script: (name) => `${name} ม้วนเก็บง่าย พกไปได้`, action: "CAMERA: Close-up of rolling/folding. Compact rollup — fits in bag. Portable yoga. Easy portability PROOF." },
        { script: (name) => `สีสัน ${name} สวยมาก มีให้เลือกเยอะ`, action: "CAMERA: Wide shot of color options. Multiple beautiful colors — presenter picks favorite. Aesthetic variety PROOF." },
        { script: (name) => `ใช้ ${name} ยืดเหยียด ผ่อนคลายมาก`, action: "CAMERA: Peaceful tracking shot. Stretching with prop — deep relaxation, stress relief visible. Relaxation benefit PROOF." },
        { script: (name) => `${name} ทำความสะอาดง่าย`, action: "CAMERA: Quick cleaning medium. Wipes clean easily — hygienic, quick maintenance. Easy care PROOF." },
        { script: (name) => `${name} หนาพอดี ไม่บางเกินไป`, action: "CAMERA: Close-up thickness comparison. Shows adequate thickness — comfortable cushioning for joints. Proper thickness PROOF." },
        { script: (name) => `ใช้ ${name} ทำพิลาทีสก็ดี`, action: "CAMERA: Multi-exercise demo. Pilates, yoga, stretching — versatile use. Multi-discipline versatility PROOF." },
        { script: (name) => `${name} ไม่มีกลิ่น ใช้ได้สบาย`, action: "CAMERA: Close-up sniff test. No chemical/rubber smell — presenter uses comfortably. Odor-free comfort PROOF." },
    ],
    outdoor: [
        { script: (name) => `${name} ใช้กลางแจ้ง ทนทุกสภาพอากาศ`, action: "CAMERA: Dynamic outdoor shot. Using product outdoors — rain/sun/wind. Performs perfectly. Weather durability PROOF." },
        { script: (name) => `พก ${name} ไปเที่ยว สะดวกมาก`, action: "CAMERA: Travel packing medium. Compact, lightweight — fits in bag. Uses at destination. Portability + practical use PROOF." },
        { script: (name) => `${name} กันน้ำ ใช้ริมทะเลได้`, action: "CAMERA: Beach/water dynamic shot. Product near water — waterproof, functions perfectly. Water resistance PROOF." },
        { script: (name) => `${name} ทนแดด ไม่ซีดไม่พัง`, action: "CAMERA: Bright outdoor medium. UV exposure — product unaffected, colors intact. Sun durability PROOF." },
        { script: (name) => `เดินป่าด้วย ${name} สะดวกมาก`, action: "CAMERA: Trail tracking shot. Hiking with product — practical outdoor use in nature. Rugged outdoor utility PROOF." },
        { script: (name) => `${name} เบามาก แบกไม่หนัก`, action: "CAMERA: Packing close-up. Shows lightweight — lifts easily, no burden for travel. Ultralight travel PROOF." },
        { script: (name) => `${name} ใช้ง่าย แม้อยู่กลางป่า`, action: "CAMERA: Remote location medium. Simple operation in wild setting — no special tools needed. Field simplicity PROOF." },
        { script: (name) => `ตั้งแคมป์ ${name} ปุ๊บ พร้อมใช้ปั๊บ`, action: "CAMERA: Quick setup time-lapse. Rapid deployment — ready in seconds. Instant setup PROOF." },
        { script: (name) => `${name} แข็งแรง ใช้กลางแจ้งได้สบาย`, action: "CAMERA: Rugged durability test. Product handling rough conditions — impacts, wind, terrain. Outdoor toughness PROOF." },
        { script: (name) => `${name} คุ้มค่า ใช้ได้ทุกทริป`, action: "CAMERA: Multi-trip montage. Same product in different adventures — versatile reliable companion. Trip-after-trip reliability PROOF." },
    ],
    camping: [
        { script: (name) => `ใช้ ${name} ตั้งแคมป์ สะดวกมาก`, action: "CAMERA: Wide nature setting then close-up. Sets up camping gear — quick assembly, intuitive. Sturdy functional result. Easy setup + sturdy result PROOF." },
        { script: (name) => `${name} กางง่าย เก็บง่าย`, action: "CAMERA: Time-progression. Unfolds/sets up → uses → folds back. Compact storage. Easy deploy/store PROOF." },
        { script: (name) => `${name} ทนฝน กันลมได้`, action: "CAMERA: Weather-condition shot. Product in rain/wind — holds up perfectly. Weather protection PROOF." },
        { script: (name) => `นอน ${name} สบายมาก แม้ในป่า`, action: "CAMERA: Night camp medium. Lies in tent/sleeping bag — comfortable sleep in nature. Outdoor comfort PROOF." },
        { script: (name) => `${name} เบามาก พกไปได้สบาย`, action: "CAMERA: Packing close-up. Packs into backpack — lightweight, compact. Backpacking-friendly PROOF." },
        { script: (name) => `ใช้ ${name} ทำอาหารกลางป่า`, action: "CAMERA: Outdoor cooking medium. Camp cooking — fire/stove with gear. Delicious outdoor meal. Camp cooking PROOF." },
        { script: (name) => `${name} สว่างมาก ส่องได้ทั้งแคมป์`, action: "CAMERA: Night shot, darkness then illumination. Turns on light — bright coverage. Camping illumination PROOF." },
        { script: (name) => `${name} แข็งแรง ใช้ได้หลายทริป`, action: "CAMERA: Durability medium shot. Sturdy construction — handles rough use. Long-lasting camping gear PROOF." },
        { script: (name) => `${name} ดีไซน์สวย แคมป์สวยเลย`, action: "CAMERA: Wide aesthetic camp shot. Beautiful gear setup in nature — Instagram-worthy campsite. Aesthetic camping PROOF." },
        { script: (name) => `มี ${name} แคมป์สนุกขึ้นเลย`, action: "CAMERA: Social camping medium. Group enjoying camping with product — enhanced experience. Fun camping enhancement PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Pet & Baby ── (VISUAL PROOF: must show PET/BABY REACTING POSITIVELY)
    // ═══════════════════════════════════════════════════════════════
    pet: [
        { script: (name) => `น้องลอง ${name} แล้ว ชอบมาก`, action: "CAMERA: Medium tracking. Offers product to pet — approaches enthusiastically, eats/plays happily. Tail wagging/purring. Enthusiastic positive reaction PROOF." },
        { script: (name) => `${name} วัตถุดิบดี น้องสุขภาพดี`, action: "CAMERA: Close-up label then pet. Shows ingredients — gives to pet. Eats completely. Shiny coat, healthy appearance. Pet health + quality PROOF." },
        { script: (name) => `น้องกิน ${name} หมดเลย ชอบมาก`, action: "CAMERA: Close-up of pet eating. Eats eagerly — cleans bowl completely. Looks up wanting more. Can't-get-enough PROOF." },
        { script: (name) => `${name} เล่นสนุกมาก น้องชอบ`, action: "CAMERA: Dynamic tracking of play. Pet playing with toy — active, happy, engaged. Natural playful behavior. Fun engaging play PROOF." },
        { script: (name) => `ใช้ ${name} อาบน้ำน้อง สะอาดมาก`, action: "CAMERA: Close-up grooming. Bathing/grooming pet — pet tolerates well. Clean fluffy result. Grooming effectiveness PROOF." },
        { script: (name) => `${name} ขนน้องนุ่มสลวยเลย`, action: "CAMERA: Macro on fur/coat. After using product — soft silky coat, visible shine. Presenter strokes pet's fur. Coat quality improvement PROOF." },
        { script: (name) => `น้องนอนบน ${name} สบายมาก`, action: "CAMERA: Gentle medium shot. Pet lying on bed/cushion — comfortable, relaxed, content. Cozy pet comfort PROOF." },
        { script: (name) => `${name} ทนทาน น้องกัดก็ไม่พัง`, action: "CAMERA: Close-up durability test. Pet chewing/playing rough — product holds up. Durable pet-proof PROOF." },
        { script: (name) => `${name} ปลอดภัยสำหรับน้อง`, action: "CAMERA: Close-up label + pet using. Non-toxic, safe materials — pet uses comfortably. Safety assurance PROOF." },
        { script: (name) => `พก ${name} พาน้องเที่ยวสะดวก`, action: "CAMERA: Outdoor medium shot. Travel with pet gear — portable, convenient. Pet happy on the go. Travel convenience PROOF." },
    ],
    baby: [
        { script: (name) => `ลูกใช้ ${name} แล้ว ชอบมากเลย`, action: "CAMERA: Gentle close-up. Gives/applies to baby — smile or comfortable relaxed expression. No fussing. Baby comfort + happy reaction PROOF." },
        { script: (name) => `${name} อ่อนโยน ปลอดภัยสำหรับลูก`, action: "CAMERA: Soft close-up. Gentle careful application — zero irritation on delicate skin. Baby calm and content. Gentle + zero discomfort PROOF." },
        { script: (name) => `${name} นุ่มมาก ลูกใส่สบาย`, action: "CAMERA: Macro on soft material. Touches baby skin gently — soft fabric/material. Baby comfortable, no fussing. Soft comfortable PROOF." },
        { script: (name) => `ลูกกิน ${name} แล้ว ชอบเลย`, action: "CAMERA: Close-up feeding. Baby eating/drinking product — happy acceptance, no rejection. Enjoys the taste. Baby food acceptance PROOF." },
        { script: (name) => `${name} ดูดซึมเร็ว ไม่เหนียว`, action: "CAMERA: Close-up on baby skin. Quick absorption — leaves clean soft skin. No residue. Baby skincare absorption PROOF." },
        { script: (name) => `${name} กลิ่นอ่อนโยน หอมนุ่ม`, action: "CAMERA: Gentle medium. Presenter smells product — soft pleasant scent. Applies to baby, baby relaxed. Gentle fragrance PROOF." },
        { script: (name) => `${name} ซึมซับดี ลูกนอนสบาย`, action: "CAMERA: Soft medium shot. Diaper/pad change — excellent absorption. Baby dry and comfortable. Absorbency comfort PROOF." },
        { script: (name) => `ลูกเล่น ${name} สนุกมาก พัฒนาการดี`, action: "CAMERA: Playful medium. Baby interacting with toy — engaged, learning, smiling. Developmental play PROOF." },
        { script: (name) => `${name} ส่วนผสมปลอดภัย มั่นใจได้`, action: "CAMERA: Close-up label. Shows safe/organic ingredients — parent reads confidently. Applies to baby. Safe ingredients PROOF." },
        { script: (name) => `${name} ใช้ง่าย คุณแม่มือใหม่ก็ทำได้`, action: "CAMERA: Tutorial medium. Easy application/use — parent does it simply. No complicated steps. Parent-friendly ease PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Vehicle & Auto ── (VISUAL PROOF: must show INSTALLED + WORKING)
    // ═══════════════════════════════════════════════════════════════
    auto: [
        { script: (name) => `ติดตั้ง ${name} ง่ายมาก ใช้ได้ทันที`, action: "CAMERA: Step-by-step close-up. Installs on vehicle — clips/plugs/mounts easily. Quick secure attachment. Demonstrates working. Easy install + working PROOF." },
        { script: (name) => `${name} ทำให้รถดูดีขึ้นเลย`, action: "CAMERA: Wide before→after vehicle shot. Product installed — visible upgrade. Steps back to admire. Vehicle appearance upgrade PROOF." },
        { script: (name) => `${name} ทนทาน ใช้ได้นาน`, action: "CAMERA: Close-up of durable construction. Quality materials — weather-resistant, solid build. Long-lasting auto accessory PROOF." },
        { script: (name) => `ใช้ ${name} ขับรถสะดวกขึ้นมาก`, action: "CAMERA: In-car medium shot. Using product while driving — enhanced convenience. Practical daily driving improvement PROOF." },
        { script: (name) => `${name} พอดีรถเลย ดีไซน์เข้ากัน`, action: "CAMERA: Close-up of fit. Perfect integration with vehicle interior/exterior — seamless design match. OEM-quality fit PROOF." },
        { script: (name) => `${name} ปกป้องรถได้ดีมาก`, action: "CAMERA: Close-up protective application. Product protecting paint/interior — shield visible. Vehicle protection PROOF." },
        { script: (name) => `กลิ่น ${name} หอมมาก ในรถสดชื่น`, action: "CAMERA: In-car medium shot. Presenter inhales — fresh pleasant scent. Car interior freshness PROOF." },
        { script: (name) => `${name} ทำความสะอาดรถง่าย`, action: "CAMERA: Before→after cleaning shot. Dirty→clean vehicle surface. Sparkling result. Car cleaning PROOF." },
        { script: (name) => `ภาพ ${name} ชัดมาก ถ่ายติดหมด`, action: "CAMERA: Close-up of dashcam/camera screen. Clear recording quality — sharp footage visible on screen. Recording quality PROOF." },
        { script: (name) => `${name} ชาร์จในรถได้ สะดวกมาก`, action: "CAMERA: Close-up of charging setup. Plugs in — device charges. LED indicator, fast charging. In-car charging convenience PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Education & Stationery ── (VISUAL PROOF: must show USING + RESULT)
    // ═══════════════════════════════════════════════════════════════
    book: [
        { script: (name) => `อ่าน ${name} แล้ว สนุกมาก วางไม่ลง`, action: "CAMERA: Gentle dolly-in on reader. Completely absorbed — turning pages, smiles at content. Can't put down. Deep engagement PROOF." },
        { script: (name) => `${name} เนื้อหาดีมาก ได้ความรู้เพียบ`, action: "CAMERA: Close-up of pages then face. Reads and nods — highlights passage, looks up inspired. Learning 'aha' moment PROOF." },
        { script: (name) => `ปก ${name} สวยมาก อยากหยิบอ่าน`, action: "CAMERA: Macro on cover design. Presenter FIRST shows book cover front to camera, THEN tilts to show spine thickness, THEN flips to show back cover, THEN opens to interior showing pages. Beautiful cover art at every angle. Visual appeal drawing reader in PROOF." },
        { script: (name) => `${name} อ่านง่าย เข้าใจง่าย`, action: "CAMERA: Medium comfortable reading shot. Relaxed posture — reads fluently, nods understanding. Accessible writing style PROOF." },
        { script: (name) => `กระดาษ ${name} คุณภาพดี จับแล้วดี`, action: "CAMERA: Macro on paper quality. Thick quality pages — smooth texture, clear printing. Presenter feels pages. Print quality PROOF." },
        { script: (name) => `${name} เล่มนี้ เปลี่ยนมุมมองเลย`, action: "CAMERA: Medium reflective shot. Reads passage — pauses, looks thoughtful. Mind-expanding reaction. Perspective-changing PROOF." },
        { script: (name) => `อ่าน ${name} จบเร็วมาก สนุก`, action: "CAMERA: Time-progression reading. Pages turning quickly — can't stop reading. Reaches end, satisfied. Page-turner PROOF." },
        { script: (name) => `${name} เหมาะซื้อเป็นของขวัญ`, action: "CAMERA: Gift wrapping medium. Wraps book — gives to friend. Recipient opens happily. Gift-worthy PROOF." },
        { script: (name) => `${name} มีภาพประกอบสวยมาก`, action: "CAMERA: Close-up of illustrations. Beautiful images/diagrams — colorful, detailed. Presenter points at visuals. Illustration quality PROOF." },
        { script: (name) => `อ่าน ${name} ก่อนนอน ผ่อนคลายมาก`, action: "CAMERA: Warm evening medium shot. Reading in bed — relaxing wind-down. Peaceful bedtime reading PROOF." },
    ],
    stationery: [
        { script: (name) => `เขียนด้วย ${name} ลื่นมากเลย`, action: "CAMERA: Macro tracking on writing. Smooth continuous strokes — ink flowing evenly. Beautiful handwriting result. Smooth ink flow PROOF." },
        { script: (name) => `สี ${name} สดสวย ระบายง่าย`, action: "CAMERA: Close-up of coloring. Vivid pigmented colors on paper — smooth application. Rich color payoff. Color saturation PROOF." },
        { script: (name) => `${name} จับถนัดมือ เขียนไม่เมื่อย`, action: "CAMERA: Close-up of grip. Ergonomic pen/pencil — comfortable natural hold. Writes for extended period easily. Ergonomic comfort PROOF." },
        { script: (name) => `หมึก ${name} ไม่เลอะ แห้งเร็ว`, action: "CAMERA: Close-up smear test. Writes then touches — no smudge. Quick-dry ink quality PROOF." },
        { script: (name) => `${name} ดีไซน์สวย วางบนโต๊ะก็ดูดี`, action: "CAMERA: Medium desk setup. Stationery on desk — aesthetic premium look. Premium design PROOF." },
        { script: (name) => `${name} เส้นคม ชัดมาก`, action: "CAMERA: Extreme macro on line quality. Sharp consistent lines — no bleeding, no skipping. Line precision PROOF." },
        { script: (name) => `${name} มีหลายสี เลือกได้เลย`, action: "CAMERA: Wide shot of color range. Multiple colors displayed — presenter tests each. Color variety PROOF." },
        { script: (name) => `จด ${name} แล้ว ดูเรียบร้อยมาก`, action: "CAMERA: Overhead on notebook. Neat notes/lettering — organized beautiful handwriting. Satisfying result PROOF." },
        { script: (name) => `${name} คุ้มค่า ใช้ได้นาน`, action: "CAMERA: Medium product showcase. Shows quantity/durability — long-lasting supply. Value for money PROOF." },
        { script: (name) => `เอา ${name} ไปทำงานก็ดี ไปเรียนก็สะดวก`, action: "CAMERA: Multi-context shots. Office and school use — versatile practical stationery. Universal utility PROOF." },
    ],
    toy: [
        { script: (name) => `เด็กๆ เล่น ${name} สนุกมาก`, action: "CAMERA: Dynamic tracking of play. Genuine joy and laughter — toy functions as expected, lights/sounds/movement. Fun reaction + working toy PROOF." },
        { script: (name) => `${name} พัฒนาสมอง เด็กชอบมาก`, action: "CAMERA: Close-up of concentration. Solving puzzle/building/creating — achievement moment, proud smile. Problem-solving engagement PROOF." },
        { script: (name) => `${name} ทนทาน เล่นหนักได้`, action: "CAMERA: Close-up of build quality. Solid construction — handles rough play. Durable build PROOF." },
        { script: (name) => `เล่น ${name} ได้ทั้งครอบครัว`, action: "CAMERA: Wide family shot. Family playing together — shared fun, bonding. Family bonding PROOF." },
        { script: (name) => `${name} สีสดสวย ปลอดภัยสำหรับเด็ก`, action: "CAMERA: Macro on bright colors. Vibrant non-toxic colors — child-safe materials. Safe colorful PROOF." },
        { script: (name) => `${name} ต่อง่าย เด็กทำเองได้`, action: "CAMERA: Step-by-step medium. Child assembles independently — easy intuitive construction. Independent play PROOF." },
        { script: (name) => `แกะกล่อง ${name} ตื่นเต้นมาก`, action: "CAMERA: Unboxing close-up. Opens box — excited reaction at contents. Joyful unboxing PROOF." },
        { script: (name) => `${name} เล่นได้หลายแบบ ไม่เบื่อ`, action: "CAMERA: Multi-play montage. Different play modes — versatile entertainment. Long-lasting play value PROOF." },
        { script: (name) => `${name} ขนาดพอดี เก็บง่าย`, action: "CAMERA: Medium storage demo. Compact — fits in toy box/shelf. Easy cleanup PROOF." },
        { script: (name) => `เด็กๆ เล่น ${name} ด้วยกัน สนุกมาก`, action: "CAMERA: Social play medium. Multiple children playing together — sharing, laughing, cooperative play. Social play PROOF." },
    ],
    craft: [
        { script: (name) => `ใช้ ${name} ทำ DIY สวยมาก`, action: "CAMERA: Overhead tracking of creation. Artistic process visible — finished result impressive. Shows to camera proudly. Creation process PROOF." },
        { script: (name) => `${name} ใช้ง่าย แม้มือใหม่ก็ทำได้`, action: "CAMERA: Tutorial medium. Beginner-friendly — follows simple steps. Beautiful result despite being new. Beginner accessible PROOF." },
        { script: (name) => `สี ${name} สดมาก ติดแน่น`, action: "CAMERA: Macro on color application. Vibrant pigment — sticks well to surface. Long-lasting color PROOF." },
        { script: (name) => `${name} อุปกรณ์ครบ พร้อมทำเลย`, action: "CAMERA: Overhead unboxing of kit. Complete set — all materials included. Ready to create immediately. Complete kit PROOF." },
        { script: (name) => `ทำ ${name} แล้ว เอาไปตกแต่งบ้านได้`, action: "CAMERA: Before→after home display. Finished craft on display — enhances decor. Decorative result PROOF." },
        { script: (name) => `${name} ให้เป็นของขวัญ handmade ได้`, action: "CAMERA: Gift wrapping medium. Handmade gift — recipient delighted. Personal meaningful gift PROOF." },
        { script: (name) => `ทำ ${name} ผ่อนคลาย สนุกมาก`, action: "CAMERA: Peaceful medium shot. Crafting mindfully — relaxing creative process. Stress-relief hobby PROOF." },
        { script: (name) => `${name} คุณภาพดี ทำงานได้ละเอียด`, action: "CAMERA: Macro on fine detail. Precise detailed work — premium material enabling quality. Fine craftsmanship PROOF." },
        { script: (name) => `ใช้ ${name} กับเด็กๆ สนุกมาก`, action: "CAMERA: Family craft medium. Parent and child crafting together — bonding, learning. Family creative time PROOF." },
        { script: (name) => `${name} มีหลายแบบ ทำได้ไม่เบื่อ`, action: "CAMERA: Wide shot of project variety. Multiple project options — diverse creative possibilities. Creative variety PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Tech extras ── (wearable, camera)
    // ═══════════════════════════════════════════════════════════════
    wearable: [
        { script: (name) => `ใส่ ${name} แล้ว เช็คสุขภาพง่ายมาก`, action: "CAMERA: Close-up wrist shot. Taps screen — health stats (heart rate, steps) visible on ANIMATED display. Natural wrist glance. Real-time health data PROOF." },
        { script: (name) => `${name} ดีไซน์สวย ใส่ได้ทุกวัน`, action: "CAMERA: Medium orbit around wrist. Presenter FIRST shows wearable face straight-on with ANIMATED display, THEN rotates wrist to show side profile, THEN tilts showing strap material, THEN brings close to camera for screen detail. Continuous wrist angle changes. Design quality + versatility PROOF." },
        { script: (name) => `${name} แจ้งเตือนครบ ไม่พลาดอะไร`, action: "CAMERA: Close-up of notification on screen. Message/call notification appears on ANIMATED display — presenter glances, taps to respond. Smart notification PROOF." },
        { script: (name) => `ออกกำลังกายด้วย ${name} แทร็คได้หมด`, action: "CAMERA: Dynamic exercise tracking. Working out — wearable tracking metrics on ANIMATED screen (distance, calories, heart rate). Fitness tracking PROOF." },
        { script: (name) => `${name} กันน้ำ อาบน้ำก็ใส่ได้`, action: "CAMERA: Water-contact close-up. Water splashes on wearable — still functions. Screen ANIMATED and responsive. Water resistance PROOF." },
        { script: (name) => `แบต ${name} อยู่ได้หลายวัน`, action: "CAMERA: Medium daily-use montage. Multiple days of use — battery lasting. Screen still bright and ANIMATED. Long battery life PROOF." },
        { script: (name) => `เปลี่ยนหน้าปัด ${name} ได้หลายแบบ`, action: "CAMERA: Close-up of watch face changing. Swipes through different ANIMATED watch faces — customizable designs. Personalization PROOF." },
        { script: (name) => `${name} วัดการนอนแม่นมาก`, action: "CAMERA: Morning wrist check. Wakes up — checks sleep data on ANIMATED screen. Detailed sleep tracking visible. Sleep tracking PROOF." },
        { script: (name) => `สาย ${name} ใส่สบาย เปลี่ยนง่าย`, action: "CAMERA: Close-up strap swap. Quick-release strap — changes style easily. Multiple strap options. Strap comfort + swappability PROOF." },
        { script: (name) => `${name} จอสว่าง มองชัดแม้กลางแจ้ง`, action: "CAMERA: Outdoor bright-sun shot. Screen clearly visible in sunlight — ANIMATED content readable. Outdoor screen visibility PROOF." },
    ],
    camera: [
        { script: (name) => `ถ่ายด้วย ${name} คมชัดมาก`, action: "CAMERA: Over-shoulder then LCD close-up. Presenter FIRST holds camera showing body design, THEN raises to eye for shooting, THEN takes photo showing viewfinder, THEN flips LCD showing captured image, THEN rotates camera showing side profile. Multi-angle shooting demo. Sharp detailed capture PROOF." },
        { script: (name) => `${name} ถ่ายวีดีโอ สวยมากเลย`, action: "CAMERA: Tracking alongside filming. Records video — smooth pan. Flips LCD showing ANIMATED recording in progress. Cinematic video quality PROOF." },
        { script: (name) => `โฟกัส ${name} แม่นมาก ไวมาก`, action: "CAMERA: Close-up of AF in action. Points at subject — instant focus lock, sharp result on LCD. Fast accurate autofocus PROOF." },
        { script: (name) => `สี ${name} ถ่ายมาสวยมาก สมจริง`, action: "CAMERA: Comparison shot — real scene vs LCD. Accurate color reproduction on screen — vivid, true-to-life. Color science PROOF." },
        { script: (name) => `${name} ถ่ายกลางคืนก็สวย`, action: "CAMERA: Low-light shooting close-up. Night photo — LCD shows bright clear result despite darkness. Low-light capability PROOF." },
        { script: (name) => `ถือ ${name} จับถนัดมือ ถ่ายมั่นคง`, action: "CAMERA: Medium ergonomic shot. Presenter FIRST shows camera from front angle, THEN grips naturally showing ergonomic hold, THEN rotates to show side buttons/dial, THEN raises to eye showing shooting posture. Shifts between grip close-up and full shooting stance. Ergonomic handling PROOF." },
        { script: (name) => `เลนส์ ${name} คมมาก ละเอียดสุด`, action: "CAMERA: Macro on lens then sample shot. Glass quality — sharp detailed capture showing resolution. Lens sharpness PROOF." },
        { script: (name) => `${name} กันสั่นดีมาก ภาพไม่เบลอ`, action: "CAMERA: Handheld motion test. Moving while shooting — LCD shows stable non-blurry result. Image stabilization PROOF." },
        { script: (name) => `${name} เชื่อมต่อมือถือได้ ส่งรูปทันที`, action: "CAMERA: Close-up of wireless transfer. Camera to phone — photo appears on phone screen instantly. Wireless connectivity PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวย พกไปถ่ายรูปเท่มาก`, action: "CAMERA: Lifestyle medium shot. Presenter FIRST holds camera showing front body design to camera, THEN rotates showing side profile, THEN slings around neck showing strap, THEN raises to shoot outdoors. Continuous repositioning. Premium photographic aesthetic PROOF." },
    ],
    // ═══════════════════════════════════════════════════════════════
    // ── Generic fallbacks ── (must still show DEMONSTRATING + REACTION)
    // ═══════════════════════════════════════════════════════════════
    gadget: [
        { script: (name) => `ใช้ ${name} แล้ว สะดวกมาก`, action: "CAMERA: Before→after medium shot. Problem being solved — before: struggle, after: effortless. Visible problem→solution PROOF." },
        { script: (name) => `ฟีเจอร์ ${name} ครบจบเลย`, action: "CAMERA: Close-up feature demo sequence. Multiple features — each shown working. Button press → visible response. Feature functionality PROOF." },
        { script: (name) => `${name} ดีไซน์สวย พรีเมียมมาก`, action: "CAMERA: Macro orbit around product. Presenter FIRST holds product showing front face, THEN rotates to show side profile catching light, THEN tilts showing top/bottom detail, THEN brings close to camera for finish quality. Continuous 360° rotation — never pauses at one angle. Craftsmanship detail PROOF." },
        { script: (name) => `${name} ใช้ง่าย ไม่ต้องอ่านคู่มือ`, action: "CAMERA: Intuitive-use medium shot. Picks up and uses immediately — no manual needed. Intuitive simplicity PROOF." },
        { script: (name) => `ชาร์จ ${name} ทีเดียว ใช้ได้นาน`, action: "CAMERA: Close-up of charging then usage. Full charge → extended use through day. LED indicator, battery lasting. Long battery PROOF." },
        { script: (name) => `${name} เชื่อมต่อง่าย ใช้ได้ทันที`, action: "CAMERA: Close-up of pairing/connecting. Plug in or pair — instant connection, working immediately. Seamless connectivity PROOF." },
        { script: (name) => `${name} เบา พกพาสะดวก`, action: "CAMERA: Size comparison close-up. Compact lightweight — fits in pocket/bag. Portable convenience PROOF." },
        { script: (name) => `${name} ทนทาน ใช้ได้นาน`, action: "CAMERA: Close-up of build quality. Solid construction — durable materials. Long-lasting reliability PROOF." },
        { script: (name) => `แกะกล่อง ${name} อุปกรณ์ครบ`, action: "CAMERA: Overhead unboxing. Opens package — complete accessories included. Ready to use immediately. Complete package PROOF." },
        { script: (name) => `${name} คุ้มค่า ราคาดี ฟีเจอร์เยอะ`, action: "CAMERA: Medium product showcase. Shows many features for the price — impressed at value. Feature-rich value PROOF." },
    ],
    other: [
        { script: (name) => `ลองใช้ ${name} แล้ว ดีจริง`, action: "CAMERA: Medium practical demo. Uses for intended purpose — genuine positive reaction. Product performing visibly. Working + authentic reaction PROOF." },
        { script: (name) => `${name} ดีเกินคาดมาก`, action: "CAMERA: Close-up reaction shot. Demonstrates product — surprised impressed at quality exceeding expectations. Shows details. Exceeded expectations PROOF." },
        { script: (name) => `คุณภาพ ${name} ดี คุ้มค่ามาก`, action: "CAMERA: Macro quality inspection. Examines quality — touches materials, tests mechanisms. Nods approvingly. Quality inspection PROOF." },
        { script: (name) => `${name} ใช้ง่าย สะดวกมาก`, action: "CAMERA: Step-by-step medium. Simple intuitive use — no learning curve. Effortless operation. Ease of use PROOF." },
        { script: (name) => `แพ็คเกจ ${name} สวย ของครบ`, action: "CAMERA: Overhead unboxing. Opens package — premium presentation, complete contents. Unboxing satisfaction PROOF." },
        { script: (name) => `${name} ทนทาน ใช้ได้นานมาก`, action: "CAMERA: Close-up of build. Solid durable construction — quality materials visible. Built to last PROOF." },
        { script: (name) => `ดีไซน์ ${name} สวยมาก`, action: "CAMERA: Smooth orbit around product. Presenter FIRST shows product front, THEN rotates showing side catching light, THEN tilts to show back detail, THEN brings close for surface quality close-up. Continuous rotation — never static at one angle. Premium aesthetic PROOF." },
        { script: (name) => `${name} ตอบโจทย์ทุกอย่างเลย`, action: "CAMERA: Multi-use demo medium. Several use cases — all successful. Versatile all-rounder PROOF." },
        { script: (name) => `${name} ให้เป็นของขวัญก็ดี`, action: "CAMERA: Gift presentation medium. Premium packaging — perfect for gifting. Recipient delighted. Gift-worthy PROOF." },
        { script: (name) => `${name} แนะนำเลย ดีจริงๆ`, action: "CAMERA: Confident medium closing shot. Presenter FIRST holds product showing front, THEN rotates showing design, THEN brings close to camera, THEN holds proudly with thumbs up. Continuous repositioning. Authentic endorsement PROOF." },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// Script-Action sync helper: picks random PAIRED script+action from category
// Returns { script, action } that are GUARANTEED to match
// ═══════════════════════════════════════════════════════════════════════════
const pickScriptActionPair = (
    category: ProductCategory,
    productName: string,
    excludeIndices?: number[]
): { script: string; action: string; pairIndex: number } => {
    const pairs = CATEGORY_SCENE_PAIRS[category] || CATEGORY_SCENE_PAIRS["gadget"] || CATEGORY_SCENE_PAIRS["other"]!;
    // Filter out already-used indices to avoid repeats
    const available = pairs
        .map((p, i) => ({ ...p, idx: i }))
        .filter(p => !excludeIndices?.includes(p.idx));
    const pick = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : { ...pairs[0], idx: 0 };
    return {
        script: pick.script(productName),
        action: pick.action,
        pairIndex: pick.idx
    };
};

// ═══════════════════════════════════════════════════════════════════════════
// Generate full Thai script with product name — CATEGORY-SPECIFIC
// Returns structured data: rawScript + pre-parsed sceneTexts + PAIRED sceneActions
// ═══════════════════════════════════════════════════════════════════════════
interface ScriptWithActions {
    rawScript: string;           // Full text with 🎬 prefixes (for display)
    sceneTexts: string[];        // Pre-parsed script text per scene
    sceneActions: string[];      // PAIRED visual action directive per scene (matches script)
}

const generateThaiScript = (
    productName: string,
    template: string,
    voiceTone: string,
    saleStyle: string,
    hookText: string,
    ctaText: string,
    clipDuration: number,
    category: ProductCategory
): ScriptWithActions => {
    const benefit = pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other || ["คุ้มค่า"]);
    const urgency = pickRandom(CATEGORY_URGENCY[category] || CATEGORY_URGENCY.other || ["รีบเลย!"]);

    // Generate exactly 1 short script per scene (~8 seconds each, slow comfortable pace)
    const sceneCount = Math.max(1, Math.floor(clipDuration / 8));
    let scriptParts: string[] = [];
    let sceneTexts: string[] = [];
    let sceneActions: string[] = [];

    const rawOpeningHook = hookText || pickRandom(HOOK_VARIATIONS[template] || HOOK_VARIATIONS["product-review"]);
    const openingHook = ensureMentionsProductName(rawOpeningHook, productName);
    const rawClosingCTA = ctaText || pickRandom(CTA_VARIATIONS[saleStyle] || CTA_VARIATIONS["storytelling"]);
    const closingCTA = ensureMentionsProductName(rawClosingCTA, productName);

    // Category-specific intro verb for Scene 1
    const scene1Intro: Partial<Record<ProductCategory, string[]>> = {
        food: ["วันนี้ลองชิม", "มาชิมกัน", "ลองกินตัวนี้"],
        beverage: ["วันนี้ลองจิบ", "มาชิมเครื่องดื่มนี้", "ลองชงตัวนี้"],
        fashion: ["วันนี้ลองใส่", "มาลองชุดนี้", "ลองแมตช์ลุคนี้"],
        laptop: ["วันนี้ลองใช้", "มาลองดู", "เปิดเครื่องลองใช้"],
        phone: ["วันนี้ลองใช้", "มาลองมือถือนี้", "เปิดเครื่องลองดู"],
        tablet: ["วันนี้ลองใช้", "มาลองแท็บเล็ตนี้", "เปิดเครื่องลอง"],
        gaming: ["วันนี้ลองเล่น", "มาลองเกียร์นี้", "ลองเซ็ตอัป"],
        audio: ["วันนี้ลองฟัง", "มาลองหูฟังนี้", "ลองใส่ฟัง"],
        gadget: ["วันนี้ลองใช้", "มาลองฟีเจอร์", "เปิดกล่องลองใช้"],
        beauty: ["วันนี้ลองทา", "มาลองเลย", "ลองใช้ตัวนี้"],
        supplement: ["วันนี้มาลอง", "ลองทานตัวนี้", "มาดูแลสุขภาพด้วย"],
        pet: ["วันนี้พาน้องมาลอง", "น้องจะชอบไหม มาดู", "ให้น้องลอง"],
        baby: ["วันนี้ลูกลอง", "มาลองให้ลูกใช้", "ลองใช้กับลูก"],
        home: ["วันนี้มาจัดบ้านด้วย", "เปลี่ยนบ้านด้วย", "จัดมุมใหม่ด้วย"],
        kitchen: ["วันนี้ลองทำอาหารด้วย", "มาอัปเกรดครัวด้วย", "ลองใช้ในครัว"],
        fitness: ["วันนี้ลองเทรนด้วย", "มาฟิตด้วยตัวนี้", "เริ่มเทรนด้วย"],
        auto: ["วันนี้ลองติดตั้ง", "มาอัปเกรดรถด้วย", "ลองใช้กับรถ"],
        jewelry: ["วันนี้ลองใส่", "มาลองเครื่องประดับนี้", "ลองสวมตัวนี้"],
        watch: ["วันนี้ลองสวม", "มาลองนาฬิกาเรือนนี้", "ลองใส่ดู"],
        bag: ["วันนี้ลองสะพาย", "มาลองกระเป๋าใบนี้", "ลองถือดู"],
        shoe: ["วันนี้ลองสวม", "มาลองรองเท้าคู่นี้", "ลองใส่เดินดู"],
        book: ["วันนี้มาอ่าน", "มาดูเล่มนี้", "ลองอ่านดู"],
        toy: ["วันนี้มาเล่น", "มาลองของเล่นนี้", "เด็กๆ มาลอง"],
        stationery: ["วันนี้ลองเขียนด้วย", "มาลองปากกานี้", "ลองใช้ดู"],
        dental: ["วันนี้มาแปรงฟันด้วย", "มาลองยาสีฟันตัวนี้", "ลองใช้ดูแลช่องปากด้วย"],
        cleaning: ["วันนี้ลองใช้", "มาทำความสะอาดด้วย", "ลองตัวนี้"],
        outdoor: ["วันนี้ลองพกไปใช้", "มาลองเอาไปเที่ยว", "ลองใช้กลางแจ้ง"],
        health: ["วันนี้ลองวัดค่า", "มาเช็คสุขภาพด้วย", "ลองใช้ตรวจดู"],
        craft: ["วันนี้มา DIY ด้วย", "มาลองทำงานฝีมือ", "ลองสร้างสรรค์ด้วย"],
        digital: ["วันนี้ลองใช้", "มาลองแอปนี้", "ลองเปิดใช้ดู"]
    };

    const intro = pickRandom(scene1Intro[category] || ["มาดู"]);

    // Scene 1 intro action (generic — product reveal or talk-only handled in buildVideoPrompt)
    const guide = PRODUCT_PRESENTATION_GUIDE[category] || PRODUCT_PRESENTATION_GUIDE["other"];
    const introAction = guide?.sceneActions[0] || "Presenter holds product to camera. Hero reveal shot.";
    // CTA action (generic — final beauty shot)
    const ctaAction = guide?.sceneActions[guide.sceneActions.length - 1] || "Presenter proudly displays product to camera with satisfied expression. Final beauty shot.";

    // ── SHORT SCRIPTS — 1 short sentence per scene (~8s at comfortable pace) ──
    // Middle scenes use CATEGORY_SCENE_PAIRS for PAIRED script+action (zero conflict)
    if (sceneCount === 1) {
        const text = `${intro} ${productName} กัน!`;
        scriptParts.push(`🎬 ฉาก1: "${text}"`);
        sceneTexts.push(text);
        sceneActions.push(introAction);
    } else if (sceneCount === 2) {
        // Scene 1: intro
        const text1 = `${intro} ${productName} กัน!`;
        scriptParts.push(`🎬 ฉาก1: "${text1}"`);
        sceneTexts.push(text1);
        sceneActions.push(introAction);
        // Scene 2: PAIRED script+action from category + CTA
        const pair = pickScriptActionPair(category, productName);
        scriptParts.push(`🎬 ฉาก2: "${pair.script}"`);
        sceneTexts.push(pair.script);
        sceneActions.push(pair.action);
    } else {
        // 3+ scenes: intro → PAIRED middle scenes → CTA closing
        // Scene 1: intro (short)
        const text1 = `${intro} ${productName} กัน!`;
        scriptParts.push(`🎬 ฉาก1: "${text1}"`);
        sceneTexts.push(text1);
        sceneActions.push(introAction);

        // Middle scenes: use PAIRED script+action — script and action ALWAYS match
        const usedPairIndices: number[] = [];
        for (let i = 1; i < sceneCount - 1; i++) {
            const pair = pickScriptActionPair(category, productName, usedPairIndices);
            usedPairIndices.push(pair.pairIndex);
            scriptParts.push(`🎬 ฉาก${i + 1}: "${pair.script}"`);
            sceneTexts.push(pair.script);
            sceneActions.push(pair.action);
        }

        // Last scene: CTA only (short)
        scriptParts.push(`🎬 ฉาก${sceneCount}: "${closingCTA}"`);
        sceneTexts.push(closingCTA);
        sceneActions.push(ctaAction);
    }

    return {
        rawScript: scriptParts.join("\n"),
        sceneTexts,
        sceneActions
    };
};

export interface PromptGenerationConfig {
    // Images
    productImage?: string;      // Base64
    characterImage?: string;    // Base64 — character reference for AI age/appearance analysis

    // Product Info
    productName: string;
    productDescription?: string;

    // Template & Style
    template: TemplateOption;
    voiceTone: string;          // energetic, calm, friendly, professional
    saleStyle: string;          // hard, soft, educational, storytelling
    videoStyle?: string;        // ugc-review, commercial, tutorial, etc.

    // Language
    language: string;           // th-central, etc.
    accent?: string;            // central, north, south, isan

    // Script Elements
    hookText?: string;
    ctaText?: string;
    mustUseKeywords?: string;
    avoidKeywords?: string;

    // Character & Style
    characterDescription?: string; // Free text: "ผู้หญิง สาว สวยๆ เกาหลี"
    gender?: string;            // male, female
    ageRange?: string;          // teen, young-adult, adult, middle-age, senior
    expression?: string;        // neutral, happy, excited, serious
    movement?: string;          // static, minimal, active
    clothingStyles?: string[];  // casual, formal, sporty, fashion, uniform
    characterOutfit?: string;   // detailed outfit key from characterOutfitOptions
    cameraAngles?: string[];    // front, side, close-up, full-body, dynamic
    touchLevel?: string;        // none, light, medium, heavy — how much character touches/interacts with product

    // Video Settings
    clipDuration?: number;
    aspectRatio?: string;       // 9:16, 16:9

    // User-provided script
    userScript?: string;

    // Scene Background — "auto" = smart environment, otherwise specific background
    sceneBackground?: string;
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
    productAnchor: string;         // detailed product visual identity (from AI analysis) for Scene 2+ lock
    template: string;
    pacing: string;
    restrictions: string;
    voiceoverDescriptor: string;   // FIXED voice cue — copy-paste to every scene
    cameraMovement: string;        // per-template camera motion
    sceneTransition: string;       // per-template transition keywords
    environment: string;           // setting/background
    lighting: string;              // lighting style
    characterAnchor: string;       // FULL character Visual DNA — face, hair, outfit, body — for Scene 2+ lock
    personaName: string;           // Voice persona name (e.g. "Mint", "First") for voice lock
    clothingDesc: string;          // Clothing description for character consistency
    productUsageRealism: string;   // Category-specific usage realism (e.g. open cap before spray)
    category: ProductCategory;     // Product category for per-scene presentation guide lookup
    talkOnlySceneIndex: number;    // 0-indexed scene that is "talk-only" (character speaks to camera, NO product shown)
    sceneActions: string[];        // PAIRED visual action per scene — matches script content (zero conflict)
    brandVisualSignature: string;  // Brand-specific logo/emblem directive (e.g. Apple fruit emblem on lid)
    masterProductDirective: string; // Master Prompt: Material & Physicality + Anti-Warping + Camera Motion + Anti-Distortion
    touchLevelDesc: string;         // Product contact level directive for Scene 2+
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
                        text: `Analyze this product image for short-form commercial video generation.

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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Extract base64 data (remove prefix)
    const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
    const mimeType = imageBase64.includes('png') ? 'image/png' : 'image/jpeg';

    const result = await model.generateContent([
        `Analyze this product image for short-form commercial video generation.

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

// ═══════════════════════════════════════════════════════════════════════════
// CHARACTER IMAGE ANALYSIS — estimates age/gender/build for voice persona matching
// ═══════════════════════════════════════════════════════════════════════════

interface CharacterAnalysis {
    estimatedAge: number;       // e.g. 25
    ageRange: string;           // child, teen, young-adult, adult, middle-age, senior
    gender: string;             // male, female
    build: string;              // slim, athletic, average, muscular, curvy
    hairstyle: string;          // short black hair, long wavy brown hair, etc.
    skinTone: string;           // fair, medium, tan, dark
    clothing: string;           // casual t-shirt, formal suit, etc.
    overallLook: string;        // 1-2 sentence visual summary
}

const CHARACTER_ANALYSIS_PROMPT = `Analyze this person's appearance for video generation casting.

Respond in EXACTLY this JSON format (no markdown, no extra text):
{
  "estimatedAge": <number 6-80>,
  "ageRange": "<child|teen|young-adult|adult|middle-age|senior>",
  "gender": "<male|female>",
  "build": "<slim|athletic|average|muscular|curvy>",
  "hairstyle": "<short description of hair style, length, color>",
  "skinTone": "<fair|medium|tan|dark>",
  "clothing": "<what they are wearing>",
  "overallLook": "<1-2 sentence visual summary of this person's appearance>"
}

Rules:
- child = 6-12, teen = 13-20, young-adult = 21-29, adult = 30-44, middle-age = 45-59, senior = 60+
- Be accurate with age estimation based on facial features, skin condition, body proportion
- Focus on VISUAL details only, no personality assumptions
- Keep descriptions concise and factual`;

/**
 * Analyze character reference image to estimate age/gender/build for persona matching.
 * Uses the same AI provider (OpenAI/Gemini) as product analysis.
 */
export const analyzeCharacterImage = async (imageBase64: string): Promise<CharacterAnalysis | null> => {
    const provider = getAIProvider();
    console.log(`🧑 Analyzing character image with ${provider.toUpperCase()}...`);

    try {
        let rawResponse: string;

        if (provider === 'openai') {
            const apiKey = await getApiKey('openai');
            if (!apiKey) return null;

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
                            { type: "text", text: CHARACTER_ANALYSIS_PROMPT },
                            { type: "image_url", image_url: { url: imageBase64 } }
                        ]
                    }],
                    max_tokens: 300
                })
            });

            const json = await response.json();
            if (json.error) throw new Error(json.error.message);
            rawResponse = json.choices[0].message.content;
        } else {
            const apiKey = await getApiKey('gemini');
            if (!apiKey) return null;

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const base64Data = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
            const mimeType = imageBase64.includes('png') ? 'image/png' : 'image/jpeg';

            const result = await model.generateContent([
                CHARACTER_ANALYSIS_PROMPT,
                { inlineData: { data: base64Data, mimeType } }
            ]);
            rawResponse = result.response.text();
        }

        // Parse JSON response (strip markdown code fences if present)
        const cleaned = rawResponse.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
        const parsed = JSON.parse(cleaned) as CharacterAnalysis;

        // Validate and clamp
        parsed.estimatedAge = Math.max(15, Math.min(60, parsed.estimatedAge || 25));
        if (!["teen", "young-adult", "adult", "middle-age"].includes(parsed.ageRange)) {
            parsed.ageRange = parsed.estimatedAge < 20 ? "teen"
                : parsed.estimatedAge < 30 ? "young-adult"
                    : parsed.estimatedAge < 45 ? "adult"
                        : "middle-age";
        }
        if (!["male", "female"].includes(parsed.gender)) parsed.gender = "female";

        console.log(`🧑 Character analysis result:`, parsed);
        return parsed;
    } catch (e) {
        console.warn("Character image analysis failed:", e);
        return null;
    }
};

/**
 * Pick the best-matching voice persona based on character analysis from AI vision.
 * Prioritizes: same tone + closest age match.
 */
function getPersonaFromCharacterAnalysis(
    characterAnalysis: CharacterAnalysis,
    voiceTone: string
): VoicePersona {
    const genderKey = characterAnalysis.gender === 'male' ? 'male' : 'female';
    const pool = VOICE_PERSONA_DB[genderKey];
    const targetAge = characterAnalysis.estimatedAge;

    // Map ageRange string → representative numeric age for comparison
    const AGE_RANGE_MIDPOINT: Record<string, number> = {
        "child": 9, "teen": 16, "young-adult": 25,
        "adult": 35, "middle-age": 52, "senior": 68
    };

    // Map estimated age → best ageRange bucket
    const estimatedAgeRange = targetAge <= 12 ? "child"
        : targetAge <= 20 ? "teen"
        : targetAge <= 30 ? "young-adult"
        : targetAge <= 45 ? "adult"
        : targetAge <= 60 ? "middle-age"
        : "senior";

    // Filter by tone first
    const tonePool = pool.filter(p => p.voiceTone === voiceTone);
    if (tonePool.length === 0) {
        // Fallback: any persona from same gender
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // Priority 1: exact ageRange match + same tone
    const exactAgeMatch = tonePool.filter(p => p.ageRange === estimatedAgeRange);
    if (exactAgeMatch.length > 0) {
        return exactAgeMatch[Math.floor(Math.random() * exactAgeMatch.length)];
    }

    // Priority 2: sort by closest numeric age midpoint
    const sorted = [...tonePool].sort((a, b) => {
        const midA = AGE_RANGE_MIDPOINT[a.ageRange] ?? 35;
        const midB = AGE_RANGE_MIDPOINT[b.ageRange] ?? 35;
        return Math.abs(midA - targetAge) - Math.abs(midB - targetAge);
    });

    // Pick from top 3 closest (small randomization for diversity)
    const topN = sorted.slice(0, Math.min(3, sorted.length));
    return topN[Math.floor(Math.random() * topN.length)];
}

/**
 * Generate Image and Video prompts based on config
 */
export const generatePrompts = async (config: PromptGenerationConfig): Promise<GeneratedPrompts> => {
    console.log("🎬 Generating prompts with config:", config);

    let productAnalysis = "";
    let characterAnalysis: CharacterAnalysis | null = null;

    // Step 1: Analyze images in PARALLEL (product + character)
    const analysisPromises: Promise<void>[] = [];

    if (config.productImage) {
        analysisPromises.push(
            analyzeProductImage(config.productImage, config.productName)
                .then(r => { productAnalysis = r; console.log("📸 Product analysis:", r); })
                .catch(e => console.warn("Product image analysis failed:", e))
        );
    }

    if (config.characterImage) {
        analysisPromises.push(
            analyzeCharacterImage(config.characterImage)
                .then(r => { characterAnalysis = r; })
                .catch(e => console.warn("Character image analysis failed:", e))
        );
    }

    await Promise.all(analysisPromises);

    // Step 2: Get template config
    const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const durationConfig = DURATION_CONFIGS[config.clipDuration ?? 16] || DURATION_CONFIGS[16];

    // Step 3: Build Image Prompt (for Google Labs ImageFX)
    const imagePrompt = buildImagePrompt(config, templateConfig, productAnalysis, characterAnalysis);

    // Step 4: Build Video Prompt (for Google Labs VideoFX)
    // Pass characterAnalysis so persona selection matches the actual character's age/appearance
    const videoResult = buildVideoPrompt(config, templateConfig, durationConfig, productAnalysis, characterAnalysis);

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
        ["product", /(?:1\.\s*\**PRODUCT\s*HIGHLIGHT\**\s*[:：]\s*)(.*?)(?=\n\s*2\.|$)/is],
        ["character", /(?:2\.\s*\**CHARACTER\s*ACTION\**\s*[:：]\s*)(.*?)(?=\n\s*3\.|$)/is],
        ["environment", /(?:3\.\s*\**ENVIRONMENT\**\s*[:：]\s*)(.*?)(?=\n\s*4\.|$)/is],
        ["lighting", /(?:4\.\s*\**LIGHTING\**\s*[:：]\s*)(.*?)(?=\n\s*5\.|$)/is],
        ["cinematic", /(?:5\.\s*\**CINEMATIC\**\s*[:：]\s*)(.*?)$/is],
    ];

    for (const [key, regex] of patterns) {
        const match = analysis.match(regex);
        if (match?.[1]) {
            result[key] = match[1].trim().replace(/\*+/g, '');
        }
    }

    return result;
};

// ════════════════════════════════════════════════════════════════
// Character Portrait Prompt Builder — converts Thai descriptions
// into rich, randomized English character portrait prompts.
// ════════════════════════════════════════════════════════════════

interface CharacterStyleProfile {
    appearances: string[];   // physical descriptions
    hairstyles: string[];
    outfits: string[];
    settings: string[];
    lightings: string[];
}

const STYLE_PROFILES: Record<string, CharacterStyleProfile> = {
    korean_female: {
        appearances: [
            "stunningly beautiful Korean woman, glass-like complexion, soft natural K-Beauty makeup, bright youthful appearance",
            "gorgeous Korean woman, dewy radiant appearance, subtle gradient lip tint, flawless luminous look",
            "elegant Korean woman, porcelain complexion, delicate natural makeup with soft blush, refined features",
            "beautiful Korean woman, glowing glass-like complexion, minimal makeup enhancing natural beauty, warm gentle gaze",
            "attractive Korean woman, smooth dewy appearance, soft peach-tone makeup, bright expressive eyes",
        ],
        hairstyles: [
            "long wavy dark brown hair with soft layers",
            "sleek straight black hair with subtle highlights",
            "medium-length chestnut brown hair with gentle curls",
            "long silky dark hair with side-swept bangs",
            "shoulder-length layered hair with warm brown tones",
            "long flowing dark hair with soft face-framing layers",
        ],
        outfits: [
            "stylish modern Korean fashion outfit, clean lines",
            "trendy oversized blazer with minimal accessories",
            "elegant knit top with delicate gold jewelry",
            "chic casual Korean street style, sophisticated layers",
            "soft pastel blouse with minimal modern aesthetic",
        ],
        settings: [
            "trendy cafe in Seoul with warm ambient lighting",
            "modern minimalist interior with soft natural light",
            "elegant Korean-style room with warm wood tones",
            "bright airy space with large windows and soft curtains",
            "stylish boutique setting with clean aesthetic",
        ],
        lightings: [
            "soft sunlight through window, warm golden hour glow",
            "gentle diffused natural light, beauty lighting",
            "warm studio lighting with soft fill, cinematic quality",
            "golden hour side lighting, soft shadows on face",
            "bright even lighting with subtle warm undertone",
        ],
    },
    korean_male: {
        appearances: [
            "handsome Korean man, clear smooth appearance, sharp jawline, well-groomed appearance",
            "attractive Korean man, clean-cut features, bright appearance, confident gaze",
            "good-looking Korean man, defined features, healthy glowing appearance, charismatic presence",
            "stylish Korean man, sharp bone structure, minimal grooming, refined look",
        ],
        hairstyles: [
            "styled dark hair with textured layers, K-style",
            "neat side-parted dark brown hair, clean cut",
            "trendy two-block haircut with soft texture",
            "natural dark hair with slight wave, effortless style",
        ],
        outfits: [
            "smart casual Korean menswear, clean modern fit",
            "crisp button-up shirt with tailored fit",
            "minimal Korean street style, layered look",
            "sleek modern outfit with subtle accessories",
        ],
        settings: [
            "modern Seoul cafe with warm ambient lighting",
            "minimalist studio with clean backdrop",
            "stylish urban interior, contemporary design",
            "bright modern space with large windows",
        ],
        lightings: [
            "soft directional light, cinematic portrait quality",
            "warm studio lighting with gentle shadows",
            "natural window light, bright and even",
            "golden hour glow, warm and flattering",
        ],
    },
    thai_female: {
        appearances: [
            "gorgeous Thai woman, warm golden-tan appearance, striking features, radiant natural beauty",
            "beautiful Thai woman, honey-toned appearance, elegant bone structure, captivating dark eyes",
            "stunning Thai woman, smooth tan appearance, refined features, warm inviting smile",
            "attractive Thai woman, sun-kissed glowing appearance, defined cheekbones, natural elegance",
            "lovely Thai woman, warm bronze appearance, graceful features, bright expressive eyes",
        ],
        hairstyles: [
            "long straight black hair, sleek and glossy",
            "flowing dark hair with natural soft waves",
            "long silky dark brown hair with subtle layers",
            "elegant black hair flowing past shoulders",
            "medium-length dark hair with gentle movement",
        ],
        outfits: [
            "fashionable modern Thai style, elegant and trendy",
            "stylish summer dress, vibrant colors",
            "chic contemporary outfit with Thai-inspired accessories",
            "elegant casual wear, sophisticated and fresh",
            "modern Thai fashion, clean lines with cultural touches",
        ],
        settings: [
            "tropical garden in Bangkok, lush green foliage",
            "modern Thai-style interior with warm wood accents",
            "bright outdoor setting with tropical plants",
            "elegant Thai cafe with contemporary design",
            "warm ambient space with Thai decorative elements",
        ],
        lightings: [
            "golden hour tropical lighting, warm and rich",
            "soft natural light with warm undertones",
            "bright even lighting with soft bokeh background",
            "sunset warm glow, flattering skin tones",
            "diffused daylight, clean and luminous",
        ],
    },
    thai_male: {
        appearances: [
            "handsome Thai man, warm tan appearance, strong features, confident presence",
            "attractive Thai man, golden-bronze appearance, defined jawline, charismatic look",
            "good-looking Thai man, healthy tan appearance, sharp features, warm smile",
        ],
        hairstyles: [
            "neat dark hair, styled with clean lines",
            "short textured dark hair, modern cut",
            "styled black hair with slight volume",
        ],
        outfits: [
            "smart casual Thai style, clean modern look",
            "contemporary outfit, relaxed sophistication",
            "modern Thai menswear, well-fitted",
        ],
        settings: [
            "modern Bangkok interior, warm ambiance",
            "tropical setting with natural elements",
            "contemporary Thai space, clean design",
        ],
        lightings: [
            "warm golden lighting, flattering portrait",
            "natural tropical light, bright and warm",
            "soft studio light with warm tones",
        ],
    },
    japanese_female: {
        appearances: [
            "beautiful Japanese woman, fair porcelain appearance, delicate refined features, pure natural look",
            "elegant Japanese woman, flawless pale appearance, soft natural makeup, serene beauty",
            "lovely Japanese woman, luminous fair appearance, understated makeup, graceful presence",
            "stunning Japanese woman, smooth light appearance, minimal elegant makeup, quiet sophistication",
            "attractive Japanese woman, clear bright appearance, natural beauty, gentle expression",
        ],
        hairstyles: [
            "short bob hairstyle, sleek and modern",
            "long straight black hair with blunt bangs",
            "medium-length dark hair with soft layers",
            "shoulder-length bob with slight wave",
            "neat dark hair with side-parted fringe",
        ],
        outfits: [
            "minimalist white linen shirt, clean Japanese aesthetic",
            "elegant simple outfit, muted earth tones",
            "refined casual Japanese fashion, understated luxury",
            "soft neutral-toned outfit, minimal accessories",
            "chic Japanese street style, layered and modern",
        ],
        settings: [
            "under cherry blossom trees in Tokyo, soft spring ambiance",
            "minimalist Japanese interior, clean lines and natural materials",
            "bright airy Japanese cafe, warm wood and white",
            "serene garden setting with subtle Japanese elements",
            "modern Tokyo backdrop, clean urban aesthetic",
        ],
        lightings: [
            "soft spring lighting, gentle and dreamy",
            "natural diffused light, clean and bright",
            "warm ambient glow, soft shadows",
            "cinematic soft light with subtle bloom",
            "bright even lighting, pure and clean",
        ],
    },
    japanese_male: {
        appearances: [
            "handsome Japanese man, clear fair appearance, refined features, calm confidence",
            "attractive Japanese man, clean appearance, sharp understated features, composed presence",
            "good-looking Japanese man, smooth light appearance, defined jawline, sophisticated look",
        ],
        hairstyles: [
            "textured dark hair, modern Japanese style",
            "neat side-parted black hair, clean cut",
            "medium-length styled dark hair, natural movement",
        ],
        outfits: [
            "minimalist Japanese menswear, clean aesthetic",
            "smart casual outfit, muted tones",
            "refined modern Japanese fashion",
        ],
        settings: [
            "minimalist Japanese interior, clean design",
            "modern Tokyo setting, urban sophistication",
            "serene Japanese-inspired space",
        ],
        lightings: [
            "soft natural light, clean and even",
            "warm ambient lighting, gentle portrait",
            "bright diffused daylight, pure tones",
        ],
    },
    chinese_female: {
        appearances: [
            "beautiful Chinese woman, luminous fair appearance, elegant refined features, sophisticated beauty",
            "gorgeous Chinese woman, smooth porcelain appearance, delicate makeup, regal presence",
            "stunning Chinese woman, flawless bright appearance, graceful bone structure, captivating eyes",
        ],
        hairstyles: [
            "long flowing black hair, silky and lustrous",
            "elegant dark hair with soft waves",
            "sleek straight dark hair past shoulders",
        ],
        outfits: [
            "elegant modern Chinese fashion, refined taste",
            "sophisticated outfit with subtle cultural accents",
            "chic contemporary style, luxurious fabrics",
        ],
        settings: [
            "elegant Chinese-inspired interior, warm gold accents",
            "modern luxurious space, sophisticated ambiance",
            "bright contemporary setting with cultural elements",
        ],
        lightings: [
            "warm golden lighting, rich and flattering",
            "soft studio light, even and beautiful",
            "bright elegant lighting, subtle warmth",
        ],
    },
    western_female: {
        appearances: [
            "beautiful Western woman, radiant healthy appearance, striking features, confident natural beauty",
            "gorgeous Caucasian woman, bright appearance, defined features, warm engaging presence",
            "stunning European woman, clear glowing appearance, elegant bone structure, photogenic beauty",
        ],
        hairstyles: [
            "flowing blonde hair with soft waves",
            "long brunette hair with natural highlights",
            "wavy auburn hair, voluminous and healthy",
            "sleek dark blonde hair with subtle layers",
        ],
        outfits: [
            "stylish modern Western fashion, effortless chic",
            "elegant casual outfit, contemporary style",
            "trendy fashion-forward look, clean silhouette",
        ],
        settings: [
            "modern minimalist studio, clean backdrop",
            "bright contemporary interior, natural light",
            "chic urban setting, sophisticated ambiance",
        ],
        lightings: [
            "bright studio lighting, beauty portrait quality",
            "soft natural window light, warm and even",
            "golden hour glow, cinematic warmth",
        ],
    },
    generic_female: {
        appearances: [
            "beautiful woman, clear radiant appearance, attractive features, warm natural beauty",
            "gorgeous woman, healthy glowing appearance, elegant bone structure, captivating presence",
            "stunning woman, smooth flawless appearance, refined features, photogenic beauty",
            "attractive woman, luminous appearance, graceful features, confident warm gaze",
        ],
        hairstyles: [
            "long flowing dark hair with soft layers",
            "medium-length styled hair, natural and healthy",
            "sleek hair with gentle waves, well-kept",
            "elegant hairstyle, face-framing layers",
        ],
        outfits: [
            "stylish modern outfit, clean fashionable look",
            "elegant casual wear, sophisticated style",
            "trendy contemporary fashion, well-coordinated",
        ],
        settings: [
            "modern bright interior, clean aesthetic",
            "warm ambient space, natural elements",
            "contemporary studio setting, professional backdrop",
        ],
        lightings: [
            "soft beauty lighting, flattering and even",
            "warm natural light, gentle shadows",
            "bright studio lighting, cinematic quality",
        ],
    },
    generic_male: {
        appearances: [
            "handsome man, healthy clear appearance, strong features, confident presence",
            "attractive man, well-groomed appearance, defined jawline, charismatic look",
            "good-looking man, clean appearance, sharp features, warm confident gaze",
        ],
        hairstyles: [
            "styled dark hair, modern clean cut",
            "neat well-groomed hair, professional look",
            "textured natural hair, contemporary style",
        ],
        outfits: [
            "smart casual modern outfit, well-fitted",
            "clean contemporary menswear, refined style",
            "stylish modern look, minimal accessories",
        ],
        settings: [
            "modern interior, clean professional backdrop",
            "contemporary space, warm ambient design",
            "bright studio setting, minimal aesthetic",
        ],
        lightings: [
            "directional portrait lighting, cinematic",
            "warm natural light, flattering",
            "bright even studio light, professional",
        ],
    },
};

/**
 * Convert a short Thai character description into a rich, randomized English
 * character portrait prompt suitable for AI image generation.
 * 
 * @param description - Thai text like "สาวสวยเกาหลี", "สาวไทย", "หนุ่มญี่ปุ่น"
 * @param formGender - gender from form ("male" | "female")
 * @param formAgeRange - age range from form ("child" | "teen" | "young-adult" | "adult" | "middle-age" | "senior")
 * @returns Rich English character portrait description string
 */
const buildCharacterPortraitPrompt = (description: string, formGender: string, formAgeRange?: string, formOutfitKey?: string): string => {
    const desc = description.toLowerCase().trim();
    if (!desc) return '';

    // ── Detect gender from description text (override form gender if explicit) ──
    const maleKeywords = /ชาย|ผู้ชาย|หนุ่ม|พ่อ|male|man|boy/;
    const femaleKeywords = /หญิง|ผู้หญิง|สาว|แม่|นาง|female|woman|girl/;
    const isMaleFromText = maleKeywords.test(desc);
    const isFemaleFromText = femaleKeywords.test(desc);
    const effectiveGender = isMaleFromText ? 'male' : (isFemaleFromText ? 'female' : formGender);
    const isMale = effectiveGender === 'male';

    // ── Detect age from description text (override form ageRange if explicit) ──
    const childKeywords = /เด็ก|child|kid|little/;
    const teenKeywords = /วัยรุ่น|teen|teenager|adolescent/;
    const elderKeywords = /แก่|คนแก่|ผู้สูงอายุ|ลุง|ป้า|ตา|ยาย|old|elderly|senior|grandpa|grandma/;
    const youngAdultKeywords = /หนุ่มสาว|young.*adult|วัยทำงาน/;

    let effectiveAge = formAgeRange || 'adult';
    if (childKeywords.test(desc)) effectiveAge = 'child';
    else if (teenKeywords.test(desc)) effectiveAge = 'teen';
    else if (elderKeywords.test(desc)) effectiveAge = 'senior';
    else if (youngAdultKeywords.test(desc)) effectiveAge = 'young-adult';

    // ── Map age range to descriptive English phrases ──
    const AGE_DESCRIPTORS: Record<string, { male: string; female: string }> = {
        // Safe descriptors to avoid "harmful content related to minors" policy violations
        'child':       { male: 'person with a very youthful appearance, energetic and joyful', female: 'person with a very youthful appearance, cheerful and bright' },
        'teen':        { male: 'young adult, fresh-faced and energetic', female: 'young adult, fresh-faced and cheerful' },
        'young-adult': { male: 'young man in his early 20s, vibrant and confident', female: 'young woman in her early 20s, vibrant and radiant' },
        'adult':       { male: 'man in his early 30s, mature and confident', female: 'woman in her early 30s, mature and graceful' },
        'middle-age':  { male: 'distinguished man in his late 40s, experienced and charismatic', female: 'elegant woman in her late 40s, refined and sophisticated' },
        'senior':      { male: 'elderly gentleman, 65+ years old, wise and dignified', female: 'elderly lady, 65+ years old, wise and graceful' },
    };
    const ageDesc = AGE_DESCRIPTORS[effectiveAge]?.[isMale ? 'male' : 'female']
        || AGE_DESCRIPTORS['adult'][isMale ? 'male' : 'female'];

    // ── Detect nationality/style ──
    const isKorean = /เกาหลี|korean|k-?beauty|kpop|k-?pop|โคเรีย/.test(desc);
    const isThai = /ไทย|thai|สยาม/.test(desc);
    const isJapanese = /ญี่ปุ่น|japanese|japan|nihon/.test(desc);
    const isChinese = /จีน|chinese|china/.test(desc);
    const isWestern = /ฝรั่ง|western|american|european|อเมริกัน|ยุโรป/.test(desc);

    // ── Select style profile ──
    let profileKey: string;
    if (isKorean) profileKey = isMale ? 'korean_male' : 'korean_female';
    else if (isThai) profileKey = isMale ? 'thai_male' : 'thai_female';
    else if (isJapanese) profileKey = isMale ? 'japanese_male' : 'japanese_female';
    else if (isChinese) profileKey = isMale ? 'generic_female' : 'chinese_female'; // chinese_male falls to generic
    else if (isWestern) profileKey = isMale ? 'generic_male' : 'western_female';
    else profileKey = isMale ? 'generic_male' : 'generic_female';

    const profile = STYLE_PROFILES[profileKey] || STYLE_PROFILES['generic_female'];

    // ── Detect extra traits from the user's text ──
    const isBeautiful = /สวย|gorgeous|beautiful|stunning|sexy|เซ็กซี่/.test(desc);
    const isCute = /น่ารัก|cute|kawaii|sweet/.test(desc);
    const isElegant = /สง่า|elegant|classy|หรู/.test(desc);
    const isSexy = /เซ็กซี่|sexy|hot|ร้อนแรง/.test(desc);

    // ── Build randomized character prompt ──
    const appearance = pickRandom(profile.appearances);
    
    // If user explicitly describes hair, skip random hairstyle
    const descHasHair = descriptionHasExplicitHair(desc);
    const hair = descHasHair ? '' : pickRandom(profile.hairstyles);
    
    // If user explicitly describes clothing in text, prioritize that over dropdown/profile
    const descHasClothing = descriptionHasExplicitClothing(desc);
    const outfit = descHasClothing
        ? '' // Skip dropdown/profile — clothing from description flows through extraDesc
        : (formOutfitKey && formOutfitKey !== 'original')
            ? getOutfitDescription(formOutfitKey)
            : pickRandom(profile.outfits);
    const setting = pickRandom(profile.settings);
    const lighting = pickRandom(profile.lightings);

    // Extra modifiers based on detected traits
    const traitModifiers: string[] = [];
    if (isBeautiful) traitModifiers.push('exceptionally beautiful');
    if (isCute) traitModifiers.push('cute and charming');
    if (isElegant) traitModifiers.push('elegant and sophisticated');
    if (isSexy) traitModifiers.push('alluring and confident');

    const traitStr = traitModifiers.length > 0 ? `, ${traitModifiers.join(', ')}` : '';

    // ── Append any remaining user-specific keywords that weren't matched ──
    // This allows "สาวเกาหลี ผมสั้น ชุดนักเรียน" to pass through extra details
    const knownKeywords = /เกาหลี|ไทย|ญี่ปุ่น|จีน|ฝรั่ง|สาว|หนุ่ม|ผู้หญิง|ผู้ชาย|ชาย|หญิง|สวย|น่ารัก|สง่า|เซ็กซี่|เด็ก|วัยรุ่น|แก่|คนแก่|ผู้สูงอายุ|ลุง|ป้า|ตา|ยาย|หนุ่มสาว|korean|thai|japanese|chinese|western|male|female|beautiful|cute|sexy|elegant|child|teen|old|elderly|senior/gi;
    const extraDesc = desc.replace(knownKeywords, '').replace(/\s+/g, ' ').trim();
    const extraStr = extraDesc ? ` Additional details: ${extraDesc}.` : '';

    const hairPart = hair ? `, ${hair}` : '';
    const outfitPart = outfit ? `, ${outfit}` : '';
    return `${ageDesc}, ${appearance}${traitStr}${hairPart}${outfitPart}. FRONT-FACING PORTRAIT: character must face directly toward the camera, eyes looking straight at the viewer, head-on symmetrical composition. ${setting}, ${lighting}. Photorealistic, 8K resolution, highly detailed, masterpiece quality portrait.${extraStr}`;
};

/**
 * Build Image Generation Prompt — คัมภีร์ 5 ส่วน (Master Formula)
 * When AI analysis exists, its 5 parts OVERRIDE template defaults.
 */
const buildImagePrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    productAnalysis: string,
    characterAnalysis?: CharacterAnalysis | null
): string => {
    const genderText = config.gender === 'male' ? 'professional male presenter' : 'professional female presenter';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';
    const hasProductImage = !!config.productImage;

    const expressionText = EXPRESSION_MAP[config.expression || 'happy'] || 'subtle natural smile';
    const imgDescHasClothing = descriptionHasExplicitClothing(config.characterDescription || '');
    const clothingDesc = imgDescHasClothing
        ? (config.characterDescription?.trim() || "casual everyday wear")
        : config.characterOutfit
            ? getOutfitDescription(config.characterOutfit)
            : (config.clothingStyles || ["casual"]).map(s => CLOTHING_MAP[s] || s).join(", ");

    // ── Camera angles → cinematic direction ──
    const cameraMap: Record<string, string> = {
        front: "front-facing straight-on angle", side: "3/4 side angle",
        "close-up": "close-up detail shot", "full-body": "wide head-to-toe presenter shot",
        dynamic: "dynamic diagonal angle"
    };
    const cameraDesc = (config.cameraAngles || ["front", "close-up"]).map(a => cameraMap[a] || a).join(", ");

    // ── Movement → pose direction ──
    const movementMap: Record<string, string> = {
        static: "still pose, no movement", minimal: "subtle gentle movement",
        active: "dynamic active movement"
    };
    const movementDesc = movementMap[config.movement || 'minimal'] || 'subtle gentle movement';

    // ── Touch Level → product interaction intensity ──
    const TOUCH_LEVEL_DESC: Record<string, string> = {
        "none": "Character does NOT touch the product — product displayed separately on surface, character gestures toward it",
        "light": "Character lightly holds the product with fingertips, gentle minimal contact",
        "medium": "Character holds and interacts naturally with the product, demonstrating features",
        "heavy": "Character actively uses the product with full hands-on demonstration, close physical interaction"
    };
    const touchDesc = TOUCH_LEVEL_DESC[config.touchLevel || 'light'] || TOUCH_LEVEL_DESC['light'];

    // ── Product description: user-provided > AI-analyzed > template default ──
    const ai = parseAiAnalysis(productAnalysis);
    const fallbackHighlight = PRODUCT_HIGHLIGHT[category] || PRODUCT_HIGHLIGHT["other"];
    const productDesc = config.productDescription?.trim()
        ? `${config.productDescription}. ${ai.product || fallbackHighlight}`
        : (ai.product || fallbackHighlight);

    // ── Character dynamics (AI-analyzed > template default) ──
    const dynamics = ai.character || CHARACTER_DYNAMICS[template] || CHARACTER_DYNAMICS["product-review"];
    const environment = getSmartEnvironment(template, category, ai.environment, config.sceneBackground);
    const lighting = getSmartLighting(config.voiceTone || 'friendly', category, ai.lighting);
    const cinematic = ai.cinematic || CINEMATIC_SPECS[template] || CINEMATIC_SPECS["product-review"];
    const visualStyleDesc = VIDEO_STYLE_MAP[config.videoStyle || "ugc-review"] || VIDEO_STYLE_MAP["ugc-review"];

    // ── Fitness/Supplement/Protein/Yoga/Sportswear body override ──
    const ATHLETIC_CATEGORIES = new Set(['supplement', 'fitness', 'protein', 'yoga', 'sportswear']);
    const isFitnessCategory = ATHLETIC_CATEGORIES.has(category);
    const fitnessBodyDesc = isFitnessCategory
        ? (config.gender === 'male'
            ? 'athletic build, broad shoulders, confident gym-ready posture, wearing fitted gym tank top and athletic shorts'
            : 'athletic fit build, confident gym-ready posture, wearing athletic top and leggings')
        : '';
    // ── AI-analyzed appearance details from character image (if available) ──
    const aiCharDetails = characterAnalysis
        ? `Appearance from reference: ${characterAnalysis.overallLook}. Hair: ${characterAnalysis.hairstyle}. Skin tone: ${characterAnalysis.skinTone}. Build: ${characterAnalysis.build}.`
        : '';
    // ── Character portrait from text description (when no character image) ──
    const hasCharImage = !!config.characterImage;
    const charDescPrompt = (!hasCharImage && config.characterDescription?.trim())
        ? buildCharacterPortraitPrompt(config.characterDescription, config.gender || 'female', config.ageRange, config.characterOutfit)
        : '';

    // Age descriptor for image prompt — ensures generated face matches selected age
    // SAFETY: Do NOT use specific minor ages (e.g. "6-12") — triggers Veo safety filters for minors in commercial content.
    const IMAGE_AGE_DESC: Record<string, string> = {
        "child": "young child with round youthful face, childlike proportions, clear youthful complexion, small frame",
        "teen": "teenager with youthful face, slim adolescent build, clear youthful complexion, fresh young appearance",
        "young-adult": "young adult with fresh face, fit build, youthful energy",
        "adult": "adult with mature face, adult proportions, confident presence",
        "middle-age": "middle-aged person with some aging features, experienced mature look",
        "senior": "elderly person with gray hair and wisdom lines on face"
    };
    const imageAgeDesc = config.ageRange ? (IMAGE_AGE_DESC[config.ageRange] || '') : '';

    let characterLine: string;
    if (charDescPrompt) {
        // Use rich generated portrait from text description
        characterLine = isFitnessCategory
            ? `${charDescPrompt}. ${fitnessBodyDesc}, ${expressionText} expression. ${dynamics}. ${movementDesc}`
            : `${charDescPrompt}. ${expressionText} expression. ${dynamics}. ${movementDesc}`;
    } else {
        const agePrefix = imageAgeDesc ? `${imageAgeDesc}, ` : '';
        characterLine = isFitnessCategory
            ? `${agePrefix}${genderText}, ${fitnessBodyDesc}, ${expressionText} expression. ${dynamics}. ${movementDesc}${aiCharDetails ? ` ${aiCharDetails}` : ''}`
            : `${agePrefix}${genderText}, ${expressionText} expression, wearing ${clothingDesc}. ${dynamics}. ${movementDesc}${aiCharDetails ? ` ${aiCharDetails}` : ''}`;
    }

    // ── Sanitize product name for ImageFX too — copyright filter also rejects trademarked names ──
    const imageSafeProductName = sanitizeProductNameForVeo(config.productName);
    const productAnatomy = buildProductAnatomyDirective(category, imageSafeProductName);

    // ── Category-specific directives for image ──
    const imageInteraction = CATEGORY_IMAGE_INTERACTION[category] || CATEGORY_IMAGE_INTERACTION["other"] || '';
    const imageGripPhysics = buildContactPhysicsDirective(category);
    const imageUsageRealism = PRODUCT_USAGE_REALISM[category] || '';

    let referenceSection = "";
    if (hasCharImage && hasProductImage) {
        referenceSection = `Reference Images:
- Image 1: CHARACTER FACE REFERENCE (HIGHEST PRIORITY FOR FACE) — reproduce this person's EXACT facial features, bone structure, complexion, hairstyle, and overall appearance with maximum fidelity. The output character's face must look like the SAME PERSON as Image 1. Match every facial detail: eye shape, nose shape, jawline, lip shape, eyebrow arch, forehead, cheekbones, chin, complexion texture. This is the absolute authority for the character's face.
- Image 2: PRODUCT STRUCTURE REFERENCE (HIGHEST PRIORITY) — This image defines the EXACT product design. Study every detail: silhouette, proportions, cap/closure shape, label layout, material finish, color palette, distinctive decorative elements. Reproduce the product with photographic accuracy. The label text and brand name spelling are the #1 priority. Do NOT simplify or reimagine any part of the product — if the reference shows a unique feature, that EXACT feature must appear in the output.
- If text conflicts with images, images win. Product structure from Image 2 is the absolute visual authority for product design.`;
    } else if (hasCharImage) {
        referenceSection = `Reference Images:
- Image 1: CHARACTER FACE REFERENCE (HIGHEST PRIORITY FOR FACE) — reproduce this person's EXACT facial features, bone structure, complexion, hairstyle, and overall appearance with maximum fidelity. The output character's face must look like the SAME PERSON as Image 1. Match every facial detail: eye shape, nose shape, jawline, lip shape, eyebrow arch, forehead, cheekbones, chin, complexion texture. This is the absolute authority for the character's face.
- If text conflicts with images, images win. Character face from Image 1 is the absolute visual authority.`;
    } else if (hasProductImage) {
        referenceSection = `Reference Images:
- Image 1: PRODUCT STRUCTURE REFERENCE (HIGHEST PRIORITY) — This image defines the EXACT product design. Study every detail: silhouette, proportions, cap/closure shape, label layout, material finish, color palette, distinctive decorative elements. Reproduce the product with photographic accuracy. The label text and brand name spelling are the #1 priority. Do NOT simplify or reimagine any part of the product — if the reference shows a unique feature, that EXACT feature must appear in the output.
- If text conflicts with images, images win. Product structure from Image 1 is the absolute visual authority for product design.
${charDescPrompt ? `\nCHARACTER NOTE: No character reference image provided. Generate character based on the [CHARACTER] description above. The character MUST face the camera directly (front-facing portrait).` : ''}`;
    } else {
        referenceSection = charDescPrompt ? `CHARACTER NOTE: No character reference image provided. Generate character based on the [CHARACTER] description above. The character MUST face the camera directly (front-facing portrait).` : '';
    }

    let prompt = `Professional ${templateConfig.englishName} photograph.

[PRODUCT] ${imageSafeProductName}: ${productDesc}. ${productAnatomy} PRODUCT IDENTITY LOCK: exact packaging silhouette, proportions, cap/closure distinctive design, label typography and font, color palette, material texture and finish — all from reference image. Render with extreme surface detail: visible material grain, realistic light response (specular highlights on glossy, soft diffusion on matte, caustics and refraction on glass/transparent elements, light dispersion on faceted surfaces). Reproduce all text, logos, and branding on the product label exactly as shown in the reference image — correct font, correct letter spacing, no misspelling, no gibberish, high-fidelity logo detail. Product lit with soft rim light defining silhouette edges, key light revealing surface texture and material quality.
[CHARACTER] ${characterLine}.
[INTERACTION] ${touchDesc}. ${imageInteraction}${imageUsageRealism ? ` ${imageUsageRealism}` : ''}
[HANDS] ${imageGripPhysics}
[CAMERA] ${cameraDesc}. ${cinematic}.
[SETTING] ${environment}.
[LIGHTING] ${lighting}.
[QUALITY] ${aspectRatio} orientation, photorealistic, ultra-detailed textures, 4K quality. ${ANTI_TEXT_DIRECTIVE}

COMPOSITION: Single continuous scene — NO split screen, NO collage, NO side-by-side panels, NO divided frames. One unified photograph with character actively interacting with the product as described in [INTERACTION]. Both character and product must be clearly visible together.
${FRONT_FACING_DIRECTIVE}
${PRODUCT_MATCH_DIRECTIVE}
${ANTI_DISTORTION_DIRECTIVE}
${FACE_IDENTITY_LOCK}
${ANTI_ADDITION_DIRECTIVE}
${CLOTHING_FIDELITY_DIRECTIVE}

${referenceSection}

${config.mustUseKeywords ? `Must include: ${config.mustUseKeywords}` : ''}
${config.avoidKeywords ? `Avoid: ${config.avoidKeywords}` : ''}
Style: ${visualStyleDesc}.
`;

    return sanitizePromptForPolicy(prompt.trim(), imageSafeProductName);
};

/**
 * Build Video Generation Prompt — Google Veo / Flow optimized
 * 
 * Hierarchical format: [Subject] + [Action] + [Environment] + [Camera & Lighting] + [Style/Mood] + [Audio/Voiceover]
 * 
 * Key principles:
 * 1. Voiceover descriptor is FIXED and copy-pasted to every scene for voice consistency
 * 2. Camera movement + scene transition keywords prevent jitter between scenes
 * 3. AI Vision analysis overrides template defaults (same as image prompt)
 * 4. Policy safety directives prevent banned content
 */
const buildVideoPrompt = (
    config: PromptGenerationConfig,
    templateConfig: typeof TEMPLATE_CONFIGS[TemplateOption],
    durationConfig: typeof DURATION_CONFIGS[number],
    productAnalysis: string,
    characterAnalysis?: CharacterAnalysis | null
): { prompt: string; sceneScripts: string[]; meta: VideoPromptMeta } => {
    // Age-aware gender text — avoid "professional presenter" for children/teens (triggers safety filters for minors in commercial contexts)
    const GENDER_AGE_TEXT: Record<string, { male: string; female: string }> = {
        "child": { male: "young boy character", female: "young girl character" },
        "teen": { male: "teenage boy", female: "teenage girl" },
        "young-adult": { male: "young male presenter", female: "young female presenter" },
        "adult": { male: "professional male presenter", female: "professional female presenter" },
        "middle-age": { male: "mature male presenter", female: "mature female presenter" },
        "senior": { male: "elderly male presenter", female: "elderly female presenter" },
    };
    const genderText = (GENDER_AGE_TEXT[config.ageRange || 'adult'] || GENDER_AGE_TEXT['adult'])[config.gender === 'male' ? 'male' : 'female'];
    const genderVoice = config.gender === 'male' ? 'Male' : 'Female';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';
    const voiceTone = config.voiceTone || 'friendly';

    const expressionText = EXPRESSION_MAP[config.expression || 'happy'] || 'subtle natural smile';
    const vidDescHasClothing = descriptionHasExplicitClothing(config.characterDescription || '');
    const clothingDesc = vidDescHasClothing
        ? (config.characterDescription?.trim() || "casual everyday wear")
        : config.characterOutfit
            ? getOutfitDescription(config.characterOutfit)
            : (config.clothingStyles || ["casual"]).map(s => CLOTHING_MAP[s] || s).join(", ");

    // ── Camera angles ──
    const cameraAngleMap: Record<string, string> = {
        front: "front-facing angle", side: "3/4 side angle",
        "close-up": "close-up detail shot", "full-body": "wide head-to-toe presenter shot",
        dynamic: "dynamic diagonal angle"
    };
    const cameraAngleDesc = (config.cameraAngles || ["front", "close-up"]).map(a => cameraAngleMap[a] || a).join(", ");

    // ── Movement ──
    const movementMap: Record<string, string> = {
        static: "minimal static movement", minimal: "subtle gentle gestures",
        active: "dynamic active movement and gestures"
    };
    const movementDesc = movementMap[config.movement || 'minimal'] || 'subtle gentle gestures';

    // ── Touch Level → product interaction intensity (video) ──
    const VIDEO_TOUCH_LEVEL: Record<string, string> = {
        "none": "Character does NOT touch the product — product displayed on surface, character gestures toward it without contact",
        "light": "Character lightly touches the product with fingertips, gentle minimal contact, mostly presenting by gesture",
        "medium": "Character holds and naturally interacts with the product, demonstrating features hands-on",
        "heavy": "Character actively uses the product with full hands-on demonstration, vigorous close physical interaction"
    };
    const videoTouchDesc = VIDEO_TOUCH_LEVEL[config.touchLevel || 'light'] || VIDEO_TOUCH_LEVEL['light'];

    // ── Language → voiceover language ──
    const languageMap: Record<string, string> = {
        "th-central": "Thai", "th-north": "Thai",
        "th-south": "Thai", "th-isan": "Thai"
    };
    const voiceLanguage = languageMap[config.language] || "Thai";

    const saleStyle = SALE_STYLE_THAI[config.saleStyle] || SALE_STYLE_THAI["storytelling"];

    // Parse scene scripts + PAIRED actions
    let sceneTexts: string[] = [];
    let pairedSceneActions: string[] = [];

    if (config.userScript && config.userScript.trim()) {
        sceneTexts = config.userScript.split(/\n{2,}/).filter(s => s.trim()).map(s => s.trim());
        // User-provided scripts: generate matching actions from CATEGORY_SCENE_PAIRS
        const sceneCount = Math.max(1, Math.floor((config.clipDuration ?? 16) / 8));
        const usedIndices: number[] = [];
        for (let i = 0; i < sceneTexts.length; i++) {
            const pair = pickScriptActionPair(category, config.productName, usedIndices);
            usedIndices.push(pair.pairIndex);
            pairedSceneActions.push(pair.action);
        }
        console.log("📝 Using user-provided scripts:", sceneTexts);
    } else {
        const scriptResult = generateThaiScript(
            config.productName,
            config.template,
            voiceTone,
            config.saleStyle,
            config.hookText || "",
            config.ctaText || "",
            config.clipDuration ?? 16,
            category
        );

        sceneTexts = scriptResult.sceneTexts;
        pairedSceneActions = scriptResult.sceneActions;
        console.log("📝 Auto-generated scene scripts:", sceneTexts);
        console.log("🎬 Paired scene actions:", pairedSceneActions.map((a, i) => `Scene ${i + 1}: ${a.substring(0, 60)}...`));
    }

    // Inject pronunciation hints for brand/tech terms in all scene scripts
    sceneTexts = sceneTexts.map(text => injectPronunciation(text));

    // ── Parse AI Vision analysis (override template defaults like image prompt) ──
    const ai = parseAiAnalysis(productAnalysis);

    // ── 6-Part Hierarchical Lookups (AI-analyzed > template default) ──
    const productHighlight = ai.product || PRODUCT_HIGHLIGHT[category] || PRODUCT_HIGHLIGHT["other"];
    const dynamics = ai.character || CHARACTER_DYNAMICS[template] || CHARACTER_DYNAMICS["product-review"];
    const environment = getSmartEnvironment(template, category, ai.environment, config.sceneBackground);
    const lighting = getSmartLighting(voiceTone, category, ai.lighting);
    const cinematic = ai.cinematic || CINEMATIC_SPECS[template] || CINEMATIC_SPECS["product-review"];
    const cameraMove = CAMERA_MOVEMENT[template] || CAMERA_MOVEMENT["product-review"];
    const transition = SCENE_TRANSITION[template] || SCENE_TRANSITION["product-review"];
    const visualStyleDesc = VIDEO_STYLE_MAP[config.videoStyle || "ugc-review"] || VIDEO_STYLE_MAP["ugc-review"];

    // ── Select persona ONCE — if character image was analyzed, pick by closest age match ──
    const persona = characterAnalysis
        ? getPersonaFromCharacterAnalysis(characterAnalysis, voiceTone)
        : getPersona(config.gender || 'female', voiceTone, config.ageRange);

    // If AI detected gender from character image, override form gender for consistency
    const effectiveGender = characterAnalysis?.gender || config.gender || 'female';

    console.log(`🧑 Persona selected: ${persona.name} (age ${persona.age}) ${characterAnalysis ? `[AI-matched from estimated age ${characterAnalysis.estimatedAge}]` : '[random from tone pool]'}`);

    // ── FIXED Voiceover Descriptor — same string in EVERY scene ──
    const voiceoverDescriptor = buildVoiceoverDescriptor(effectiveGender, voiceTone, config.ageRange, persona);

    // ── Product description: user-provided > AI-analyzed > template default ──
    const fullProductHighlight = config.productDescription?.trim()
        ? `${config.productDescription}. ${productHighlight}`
        : productHighlight;

    const aspectDirective = aspectRatio === '9:16'
        ? 'Aspect ratio: 9:16 vertical portrait framing.'
        : 'Aspect ratio: 16:9 horizontal landscape framing.';

    const styleDesc = `${templateConfig.style}, ${saleStyle.approach}, ${dynamics}, ${visualStyleDesc}`;

    // ── TALK-ONLY SCENE 1 — character talks to camera WITHOUT product, product appears from Scene 2+ ──
    // For multi-scene (2+), Scene 1 is ALWAYS talk-only (index 0). Product is introduced from Scene 2 onward.
    // For 1-scene, always show product (talkOnlySceneIndex = -1 means none).
    const sceneCount = Math.max(1, Math.floor((config.clipDuration ?? 16) / 8));
    const talkOnlySceneIndex = sceneCount >= 2 ? 0 : -1;
    const isScene1TalkOnly = talkOnlySceneIndex === 0;
    console.log(`🎬 Talk-only scene: ${talkOnlySceneIndex === -1 ? 'NONE (1 scene)' : 'Scene 1 (ALWAYS)'} | Product from: ${sceneCount >= 2 ? 'Scene 2+' : 'Scene 1'} | Total scenes: ${sceneCount}`);

    // ── Build Scene 1 prompt — Hierarchical format ──
    // SAFETY: Do NOT use "lip sync" or "lip-sync" — gets truncated to "Lip." triggering safety filters.
    const speakingDirective = `Character speaks directly to camera throughout. Mouth opens and closes naturally matching spoken words. Realistic speaking animation, never silent or static expression.`;

    // ── Veo-safe product name — strip trademarked brands for visual prompt (product IMAGE handles identity) ──
    const veoSafeProductName = sanitizeProductNameForVeo(config.productName);
    console.log(`🛡️ Product name sanitized for Veo: "${config.productName}" → "${veoSafeProductName}"`);
    const videoProductAnatomy = buildProductAnatomyDirective(category, veoSafeProductName);

    // ── Product Usage Realism — prevents illogical actions (e.g. spraying with cap on) ──
    const productUsageRealism = PRODUCT_USAGE_REALISM[category] || "REALISTIC USAGE: If product has any cap, lid, seal, or wrapper, it must be removed/opened BEFORE use. Show logical step-by-step usage.";

    // ── Master Product Directive — 4-part system: Material + Anti-Warping + Camera Motion + Anti-Distortion ──
    const masterProductDirective = getMasterProductDirective(category);

    // ── CHARACTER VISUAL DNA ANCHOR — IDENTICAL text for Scene 1 AND Scene 2+ ──
    // Repeats FULL physical description in every scene for maximum consistency.
    // When characterAnalysis is available (AI Vision), include precise details from the actual reference image.
    const userCharDesc = config.characterDescription?.trim() || '';
    const richCharPortrait = (!config.characterImage && userCharDesc)
        ? buildCharacterPortraitPrompt(userCharDesc, config.gender || 'female', config.ageRange)
        : '';
    const aiAppearance = characterAnalysis
        ? `AI-observed appearance: ${characterAnalysis.overallLook}. Hair: ${characterAnalysis.hairstyle}. Build: ${characterAnalysis.build}. Skin tone: ${characterAnalysis.skinTone}. Estimated age: ${characterAnalysis.estimatedAge}.`
        : (richCharPortrait ? `Generated appearance: ${richCharPortrait}` : '');
    const aiClothing = characterAnalysis?.clothing
        ? `Reference clothing: ${characterAnalysis.clothing}.`
        : '';

    // Age-appropriate visual label for character anchor
    // SAFETY: Do NOT use specific minor ages (e.g. "6-12") — triggers Veo safety filters for minors in commercial content.
    const AGE_ANCHOR_LABEL: Record<string, string> = {
        "child": "young child — small frame, round youthful face, childlike proportions, clear youthful complexion, NO wrinkles, NO mature features",
        "teen": "teenager — youthful face, slim build, adolescent proportions, clear youthful complexion, NO wrinkles",
        "young-adult": "young adult — fresh face, fit build, youthful energy",
        "adult": "adult — mature face, adult proportions, confident presence",
        "middle-age": "middle-aged person — some aging features, mature build, experienced look",
        "senior": "elderly person — wrinkled skin, gray or white hair, elderly proportions, aged face with wisdom lines"
    };
    const ageAnchorText = config.ageRange ? (AGE_ANCHOR_LABEL[config.ageRange] || '') : '';

    const characterAnchor = [
        `CHARACTER VISUAL DNA (MUST be IDENTICAL in every scene — this is the SINGLE MOST IMPORTANT constraint):`,
        `Character '${persona.name}': ${genderText}.`,
        ageAnchorText ? `AGE (CRITICAL — HIGHEST PRIORITY): ${ageAnchorText}. The character MUST visually appear this age — face, body, skin texture, and overall appearance MUST match this age range. Do NOT generate an older or younger looking person.` : '',
        aiAppearance,
        `Outfit: ${clothingDesc}${aiClothing ? ` (${aiClothing})` : ''} — same outfit in EVERY scene, absolutely no wardrobe changes.`,
        `Expression baseline: ${expressionText}.`,
        `${dynamics}. ${movementDesc}.`,
        `STRICT FACE & HEAD LOCK (HIGHEST PRIORITY): Preserve EXACT facial bone structure, face width-to-height ratio, jawline shape, cheekbone prominence, eye shape and spacing, nose bridge width and tip shape, lip shape and thickness, ear position, forehead height, natural skin texture and pores, EXACT skin tone/complexion, and EXACT hair styling/bangs. The character's face MUST remain pixel-level IDENTICAL to frame 1 across the entire video — treat the face as a FROZEN MASK that never changes. Do NOT let the face morph, age, de-age, stretch, slim, widen, smooth, or change identity between ANY frames or shots. FACE IS IMMUTABLE.`,
        `FACE IDENTITY PERSISTENCE: This is the SAME SINGLE PERSON in every frame. If the face in any frame would look like a different person, REJECT that frame and re-render with the correct face from frame 1. Cross-reference every face against the frame-1 face template.`,
        `BODY LOCK: Same body type, same build, same posture style, same height proportion, same shoulder width, same body fat percentage across all scenes.`,
        `HAIR LOCK: Same hairstyle, same hair color, same hair length, same hair texture, same parting direction in every scene — hair is a FIXED attribute.`
    ].filter(Boolean).join(' ');

    // ── Brand Visual Signature — explicit logo/emblem directive for brands like Apple ──
    const brandVisualSignature = getBrandVisualSignature(config.productName, category, productAnalysis);
    if (brandVisualSignature) console.log(`🏷️ Brand visual signature: ${brandVisualSignature.substring(0, 80)}...`);

    // ── Unified Product Anchor — IDENTICAL text for Scene 1 AND Scene 2+ (Anchor Prompt technique) ──
    // Same material-level description copy-pasted everywhere so AI produces visually consistent product across all scenes.
    const productAnchor = `The ${veoSafeProductName} product is the HERO — always visible, prominent, centered. Product visual identity: ${fullProductHighlight}. ${videoProductAnatomy} Render with extreme surface detail: visible material texture, realistic light interaction (specular on glossy, diffusion on matte, caustics and refraction on glass/transparent, light dispersion on faceted surfaces). PRODUCT IDENTITY LOCK: exact packaging silhouette, proportions, cap/closure distinctive design, color palette — all IDENTICAL across every scene. High-fidelity visual detail — preserve exact visual branding from reference. Product is a FIXED visual constant — never morph, never simplify, never change shape, never alter any distinctive feature between scenes. Product lit with soft rim light defining silhouette, featured in every frame. ANTI-DUPLICATION: Only ONE copy of the product exists — NEVER show two or more copies of the same product simultaneously. LABEL LOCK: Do NOT generate, invent, or hallucinate any text, logos, or labels on the product — preserve EXACT branding from the reference image only. Any text on packaging must match the reference precisely — if unclear, show the label area slightly out of focus rather than inventing wrong text. PROPS vs PRODUCT: Any accessories (toothbrush, brush, applicator, spoon, glass, etc.) are secondary PROPS — the product itself must ALWAYS be the most prominent, largest, and most visible item in frame. Props must never obscure, replace, or visually dominate the product. PRODUCT EVERY FRAME: The product MUST be clearly visible and recognizable in EVERY single frame of this scene — never disappear, never be hidden behind hands or props, never exit the frame. TRANSITION STABILITY: During ANY camera movement, zoom, pan, cut, or transition — the product MUST maintain its EXACT same shape, silhouette, proportions, cap/closure design, and label text. Product shape is LOCKED and IMMUTABLE regardless of camera angle changes. If the product has a distinctive cap/closure (e.g. decorative perfume cap, flip-top, screw cap), it must remain the EXACT same shape and size ratio throughout — caps do NOT spontaneously disappear, morph, shrink, or change design. CAMERA STABILITY: Prefer STABLE fixed-angle shots over orbit/rotation/tracking movements. When camera MUST move, product silhouette stays pixel-locked to reference. ${productUsageRealism}`;

    // ── REALISM DIRECTIVE — ensures all actions look natural and believable ──
    const realismDirective = `REALISM: All character actions must look natural, authentic, and believable — real human movement, real physical interaction. No exaggerated or theatrical gestures. Photorealistic rendering only. Every motion grounded in reality.`;

    // ── Scene 1 prompt varies based on whether it's a TALK-ONLY scene or PRODUCT scene ──
    const scene1ProductBlock = isScene1TalkOnly
        ? `${templateConfig.englishName} commercial video. Character speaks directly to camera in a confident, engaging manner. Product is NOT visible yet — this is the hook scene. Character builds anticipation through storytelling and natural body language.`
        : `${templateConfig.englishName} commercial video. ${productAnchor}`;

    // Use lighter hand directive for video (usage realism already in productAnchor — avoid duplication)
    const videoHandDirective = `Anatomically correct hands, five fingers each. ${ANTI_FLOATING_HANDS}`;
    const scene1ActionBlock = isScene1TalkOnly
        ? `Character speaks to camera with natural hand gestures, no product in hands. Engaging eye contact, confident posture. ${speakingDirective}`
        : `${videoHandDirective} PRODUCT CONTACT LEVEL: ${videoTouchDesc}. ${speakingDirective} ${DYNAMIC_INTERACTION_DIRECTIVE}`;

    // Use PAIRED action for Scene 1 (matches script content) — falls back to generic if no paired action
    const scene1PairedAction = pairedSceneActions[0] || '';
    const scene1PresentationBlock = isScene1TalkOnly
        ? `Character talks directly to viewer, no product interaction. Natural conversational body language, hands visible but empty.`
        : `VISUAL ACTION FOR THIS SCENE (MUST match spoken dialogue): ${scene1PairedAction || getScenePresentationDirective(category, 1)}. ACTION-SCRIPT SYNC: The visual action shown MUST correspond to what the character is saying. If dialogue mentions gaming, show gaming. If dialogue mentions screen quality, show screen.`;

    let prompt = sanitizePromptForPolicy([
        // ★ [1. CHARACTER VISUAL DNA — HIGHEST PRIORITY] — full character identity
        `${characterAnchor}`,
        // ★ [2. VOICE PERSONA + SCRIPT] — voice persona + dialogue
        `${voiceoverDescriptor}`,
        `(Voice: ${persona.name}) ${genderVoice} ${voiceLanguage} voice speaking. SPOKEN DIALOGUE (AUDIO ONLY — do NOT render this text visually on screen, ZERO on-screen text): "${sceneTexts[0] || `มาดู ${veoSafeProductName} กัน!`}"`,
        // ★ [3. PRODUCT IDENTITY or TALK-ONLY] — depends on random assignment
        scene1ProductBlock,
        // [3.5. BRAND VISUAL SIGNATURE — explicit logo/emblem directive]
        (!isScene1TalkOnly && brandVisualSignature) ? brandVisualSignature : '',
        // [4. ACTION] — character interaction or talk-only
        scene1ActionBlock,
        // [4.5. PRODUCT PRESENTATION or TALK-ONLY BODY LANGUAGE]
        scene1PresentationBlock,
        // [4.6. SCREEN CONTENT DIRECTIVE — what must appear ON the product's display]
        getScreenContentDirective(category, sceneTexts[0] || ''),
        // [4.7. SIZE + PROP + ANTI-MORPH] — product size realism, prop introduction, brand identity freeze
        !isScene1TalkOnly ? getProductSizeDirective(category) : '',
        PROP_INTRODUCTION_DIRECTIVE,
        // ★ [4.8. MASTER PRODUCT DIRECTIVE] — Material & Physicality + Anti-Warping + Camera Motion + Anti-Distortion
        !isScene1TalkOnly ? masterProductDirective : '',
        // [5. ENVIRONMENT] — setting/background
        `${environment}.`,
        // [6. CAMERA & LIGHTING]
        `Camera: ${cameraAngleDesc}. ${cinematic}. ${cameraMove}. ${lighting}.`,
        // [7. STYLE/MOOD + REALISM]
        `${durationConfig.pacing}. Fluid motion, cinematic motion blur, high frame rate. ${realismDirective}`,
        // [7.5. SCENE 1 FACE TEMPLATE] — establishes the immutable face for all subsequent scenes
        `SCENE 1 FACE TEMPLATE: This scene establishes the DEFINITIVE face identity for the entire video. Every facial feature rendered here becomes the IMMUTABLE reference — all subsequent scenes MUST reproduce this EXACT face. The face is now LOCKED and FROZEN.`,
        // [8. CONSTRAINTS] — policy + anti-addition + brand freeze + voice discipline
        `${aspectDirective} ${ANTI_TEXT_DIRECTIVE} ${FRONT_FACING_DIRECTIVE} ${VOICE_DISCIPLINE_DIRECTIVE} ZERO INVENTION: Do NOT add accessories not in reference. Single product only. Character speaks from first frame. Product frontal, centered. Photorealistic only. ${PRODUCT_ANTI_MORPH_DIRECTIVE} ${VIDEO_POLICY_DIRECTIVE}`,
        // [9. USER KEYWORDS] — must-include and avoid keywords
        config.mustUseKeywords ? `MUST INCLUDE these elements: ${config.mustUseKeywords}` : '',
        config.avoidKeywords ? `MUST AVOID these elements: ${config.avoidKeywords}` : ''
    ].join(' '), veoSafeProductName);



    // ── Meta for Scene 2+ — carries ALL context for consistency ──
    const meta: VideoPromptMeta = {
        style: styleDesc,
        aspectRatio,
        gender: genderText,
        genderVoice: `${genderVoice} ${voiceLanguage} voice speaking`,
        expression: expressionText,
        camera: `Camera: ${cameraAngleDesc}. ${cinematic}. ${cameraMove}`,
        product: `${veoSafeProductName}, ${fullProductHighlight}`,
        productAnchor: productAnchor,
        template: templateConfig.englishName,
        pacing: durationConfig.pacing,
        restrictions: `${ANTI_TEXT_DIRECTIVE} ${FRONT_FACING_DIRECTIVE} ${VIDEO_POLICY_DIRECTIVE}`,
        voiceoverDescriptor,
        cameraMovement: cameraMove,
        sceneTransition: transition,
        environment,
        lighting,
        characterAnchor,
        personaName: persona.name,
        clothingDesc,
        productUsageRealism,
        category,
        talkOnlySceneIndex,
        sceneActions: pairedSceneActions,
        brandVisualSignature,
        masterProductDirective,
        touchLevelDesc: videoTouchDesc
    };

    console.log("📝 Video prompt:", prompt.substring(0, 200) + "...");
    console.log(`📏 Scene 1 prompt length: ${prompt.length} chars`);

    return { prompt, sceneScripts: sceneTexts, meta };
};

/**
 * Build a plain-text video prompt for Scene 2+ using meta from Scene 1.
 * 
 * HIGH-PRECISION CONSISTENCY approach (per Gemini expert recommendation):
 * 1. CHARACTER VISUAL DNA — full physical description repeated in EVERY scene
 * 2. PRODUCT IDENTITY — full product anchor repeated in EVERY scene
 * 3. VOICE PERSONA — full voice persona (not just VOICE LOCK) in EVERY scene
 * 4. ACTION + USAGE REALISM — prevents illogical actions
 * 5. CAMERA + CONTINUITY — seamless flow between scenes
 * Only the voiceover script changes — everything visual/vocal is locked from Scene 1.
 */
export const buildSceneVideoPromptJSON = (
    meta: VideoPromptMeta,
    sceneScript: string,
    sceneNumber: number,
    sceneVideoAction?: string
): string => {
    // Inject pronunciation hints for brand/tech terms in scene script
    const cleanScript = injectPronunciation(sceneScript.trim().replace(/^"+|"+$/g, '').trim());
    const aspectDirective = meta.aspectRatio === '9:16'
        ? 'Aspect ratio: 9:16 vertical portrait framing.'
        : 'Aspect ratio: 16:9 horizontal landscape framing.';

    // SAFETY: Do NOT use "lip sync" or "lip-sync" — gets truncated to "Lip." triggering safety filters.
    const speakingDirective = `Character speaks to camera, mouth naturally matching spoken words.`;

    // ── SEAMLESS TRANSITION ──
    const transitionDirective = `Seamless continuous flow from scene ${sceneNumber - 1}, one unbroken take.`;

    // ── Determine if this scene is TALK-ONLY (no product shown) ──
    const isTalkOnly = meta.talkOnlySceneIndex === (sceneNumber - 1);
    console.log(`🎬 Scene ${sceneNumber}: ${isTalkOnly ? 'TALK-ONLY (no product)' : 'PRODUCT REVIEW'}`);

    const productName = meta.product?.split(',')[0]?.trim() || 'the product';

    // ── PRODUCT or TALK-ONLY block ──
    const productBlock = isTalkOnly
        ? `${meta.template} commercial. Character speaks directly to camera in a confident, engaging manner. Product is NOT visible — character builds anticipation through storytelling and natural body language.`
        : `${meta.template} commercial. ${meta.productAnchor}`;

    // ── ACTION block (includes hand anatomy + usage realism for non-talk scenes) ──
    const actionBlock = isTalkOnly
        ? `Character speaks to camera with natural hand gestures, no product in hands. Engaging eye contact, confident posture. ${speakingDirective}`
        : `Anatomically correct hands, five fingers each. PRODUCT CONTACT LEVEL: ${meta.touchLevelDesc}. Character holds and presents ${productName}. ${meta.productUsageRealism} ${speakingDirective} ${DYNAMIC_INTERACTION_DIRECTIVE}`;

    // ── PRESENTATION block — use PAIRED action from meta (matches script content) ──
    // Priority: meta.sceneActions[sceneNumber-1] > sceneVideoAction > getScenePresentationDirective
    const pairedAction = meta.sceneActions?.[sceneNumber - 1] || '';
    const presentationBlock = isTalkOnly
        ? `Character talks directly to viewer, no product interaction. Natural conversational body language, hands visible but empty.`
        : (pairedAction
            ? `VISUAL ACTION FOR THIS SCENE (MUST match spoken dialogue): ${pairedAction}. ACTION-SCRIPT SYNC: The visual action MUST correspond to what the character is saying.${sceneVideoAction?.trim() ? ` ${sceneVideoAction.trim()}.` : ''}`
            : (sceneVideoAction?.trim()
                ? `${sceneVideoAction.trim()}. ${getScenePresentationDirective(meta.category, sceneNumber)}`
                : getScenePresentationDirective(meta.category, sceneNumber)));

    const prompt = sanitizePromptForPolicy([
        // [1. CHARACTER VISUAL DNA] — full anchor for face/body consistency
        meta.characterAnchor,

        // [2. PRODUCT or TALK-ONLY] — depends on talkOnlySceneIndex
        productBlock,
        // [2.5. BRAND VISUAL SIGNATURE — explicit logo/emblem for brands like Apple]
        (!isTalkOnly && meta.brandVisualSignature) ? meta.brandVisualSignature : '',
        // [2.7. PRODUCT SHAPE CONTINUITY — prevents physical shape morphing across scenes]
        !isTalkOnly ? SCENE_PRODUCT_SHAPE_CONTINUITY : '',

        // [3. VOICE + SCRIPT] — voiceoverDescriptor already contains voice lock
        meta.voiceoverDescriptor,
        `(Voice: ${meta.personaName}) ${meta.genderVoice}. SPOKEN DIALOGUE (AUDIO ONLY — not rendered on screen): "${cleanScript || 'สินค้าดีจริง คุ้มค่ามาก!'}"`,

        // [4. ACTION] — talk-only or product interaction + PAIRED visual action
        actionBlock,
        presentationBlock,
        // [4.6. SCREEN CONTENT DIRECTIVE — what must appear ON the product's display]
        getScreenContentDirective(meta.category, cleanScript),
        // [4.7. SIZE + PROP] — product size realism + prop introduction rule
        !isTalkOnly ? getProductSizeDirective(meta.category) : '',
        PROP_INTRODUCTION_DIRECTIVE,
        // ★ [4.8. MASTER PRODUCT DIRECTIVE] — Material & Physicality + Anti-Warping + Camera Motion + Anti-Distortion
        !isTalkOnly ? meta.masterProductDirective : '',

        // [5. CAMERA & LIGHTING]
        `${meta.camera}. ${meta.lighting}.`,

        // [6. CONTINUITY + REALISM]
        `SCENE ${sceneNumber} — continuation from scene ${sceneNumber - 1}. ${transitionDirective} ${meta.pacing}. REALISM: All actions must look natural and believable — real human movement, no exaggerated gestures. Photorealistic only.`,

        // [6.5. CROSS-SCENE FACE + PRODUCT CHECKPOINT]
        `FACE CONTINUITY CHECKPOINT (SCENE ${sceneNumber}): The character's face in this scene MUST be the EXACT SAME face as scene 1 — same bone structure, same eye shape, same nose, same jawline, same skin tone. This is the SAME PERSON, not a look-alike. If the face would differ from scene 1, regenerate until it matches. FACE IS IMMUTABLE ACROSS ALL SCENES.`,
        !isTalkOnly ? `PRODUCT CONTINUITY CHECKPOINT (SCENE ${sceneNumber}): The product MUST look EXACTLY the same as scene 1 — same shape, same color, same label, same packaging. Product is a FIXED VISUAL CONSTANT.` : '',

        // [7. CONSTRAINTS + LOCKS + ANTI-MORPH + VOICE DISCIPLINE] (FACE LOCK already in characterAnchor, not repeated)
        `${aspectDirective} No on-screen text, subtitles, or watermarks. ${VOICE_DISCIPLINE_DIRECTIVE} ZERO INVENTION: Do NOT add accessories not in reference. Single product only. Same character '${meta.personaName}', same outfit (${meta.clothingDesc}), same environment. Photorealistic only. ${PRODUCT_ANTI_MORPH_DIRECTIVE}`
    ].filter(Boolean).join(' '), productName);

    return prompt;
};

/**
 * Build a SAFE retry prompt from the original prompt when generation fails
 * with "might violate our policies" error.
 *
 * Strategy: Strip all heavy negative directives (LOCK, FREEZE, FORBIDDEN,
 * ANTI-, DO NOT) that paradoxically trigger safety filters. Keep only the
 * positive creative description: character + product + voice + script + camera.
 *
 * Typically reduces prompt from ~3000+ chars to ~800-1200 chars.
 */
export const buildSafeRetryPrompt = (originalPrompt: string): string => {
    let p = originalPrompt;

    // ── 1. Remove all LOCK / FREEZE / ANTI- directive blocks ──
    // These contain aggressive negative language that can trigger safety filters
    const heavyPatterns: RegExp[] = [
        /STRICT FACE & HEAD LOCK[^.]*\./gi,
        /FACE IDENTITY PERSISTENCE:[^.]*\./gi,
        /FACE CONTINUITY CHECKPOINT[^.]*\./gi,
        /SCENE 1 FACE TEMPLATE:[^.]*\./gi,
        /PRODUCT CONTINUITY CHECKPOINT[^.]*\./gi,
        /FACE IS IMMUTABLE[^.]*\./gi,
        /BODY LOCK:[^.]*\./gi,
        /HAIR LOCK:[^.]*\./gi,
        /FACE LOCK[^.]*\./gi,
        /PRODUCT IDENTITY LOCK:[^.]*\./gi,
        /LABEL LOCK:[^.]*\./gi,
        /PRODUCT EVERY FRAME:[^.]*\./gi,
        /TRANSITION STABILITY:[^.]*\./gi,
        /ANTI[_-]DUPLICATION:[^.]*\./gi,
        /ANTI[_-]TEXT[^.]*\./gi,
        /ANTI[_-]MORPH[^.]*\./gi,
        /ANTI[_-]DISTORTION[^.]*\./gi,
        /ANTI[_-]ADDITION[^.]*\./gi,
        /ANTI[_-]FLOATING[^.]*\./gi,
        /PROPS vs PRODUCT:[^.]*\./gi,
        /BRAND IDENTITY FREEZE[^.]*\./gi,
        /BRAND MORPHING[^.]*\./gi,
        /PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,
        /PRODUCT SIZE REALISM:[^.]*\./gi,
        /VOICE DISCIPLINE:[^.]*\./gi,
        /ZERO INVENTION:[^.]*\./gi,
        /REALISM:[^.]*\./gi,
        /SCREEN CONTENT[^.]*\./gi,
        /SINGLE UTENSIL RULE[^.]*\./gi,
        /PRODUCT LOCK[^.]*\./gi,
        /FACE & HEAD LOCK[^.]*\./gi,
        /CLOTHING FIDELITY[^.]*\./gi,
        /FRONT[_-]FACING[^.]*\./gi,
    ];
    for (const re of heavyPatterns) {
        p = p.replace(re, '');
    }

    // ── 2. Remove sentences containing heavy negative keywords ──
    // Split into sentences, filter out ones with aggressive negation
    const negativeKeywords = [
        'DO NOT', 'NEVER', 'FORBIDDEN', 'MUST NOT', 'ABSOLUTELY NO',
        'IMMUTABLE', 'LOCKED', 'HIGHEST PRIORITY', '#1 FORBIDDEN',
        'Do NOT let', 'Do NOT add', 'Do NOT generate', 'Do NOT simplify',
        'Do NOT invent', 'ZERO on-screen', 'NO split screen',
        'NO collage', 'NO side-by-side', 'NO divided frames',
        'never morph', 'never simplify', 'never change shape',
        'never disappear', 'never be hidden', 'never exit',
        'BRAND MORPHING IS', 'objects MUST NOT magically',
    ];
    const sentences = p.split(/(?<=[.!])\s+/);
    const filtered = sentences.filter(s => {
        const upper = s;
        return !negativeKeywords.some(kw => upper.includes(kw));
    });
    p = filtered.join(' ');

    // ── 5. Clean up any remaining minor/child terms to prevent policy violations ──
    const minorTerms = /\b(child|children|kid|kids|boy|girl|teen|teenager|youth|minor|student|toddler|baby|young)\b/gi;
    p = p.replace(minorTerms, "person");

    // ── 6. Collapse multiple spaces and trim ──
    p = p.replace(/\s{2,}/g, ' ').trim();

    // ── 4. If still too long (>1200 chars), aggressively trim non-essential parts ──
    if (p.length > 1200) {
        // Remove product anatomy details
        p = p.replace(/Render with extreme surface detail[^.]*\./gi, '');
        p = p.replace(/High-fidelity visual detail[^.]*\./gi, '');
        p = p.replace(/Product lit with soft rim light[^.]*\./gi, '');
        p = p.replace(/visible material texture[^.]*\./gi, '');
        // Remove camera movement details
        p = p.replace(/Fluid motion, cinematic motion blur[^.]*\./gi, '');
        // Remove AI-observed appearance if too verbose
        p = p.replace(/AI-observed appearance:[^.]*\./gi, '');
        p = p.replace(/Reference clothing:[^.]*\./gi, '');
        p = p.replace(/\s{2,}/g, ' ').trim();
    }

    console.log(`🛡️ Safe retry prompt: ${originalPrompt.length} → ${p.length} chars (${Math.round((1 - p.length / originalPrompt.length) * 100)}% reduction)`);
    return p;
};

/**
 * Quick prompt generation without image analysis (for faster processing)
 */
export const generateQuickPrompts = (config: PromptGenerationConfig): GeneratedPrompts => {
    const templateConfig = TEMPLATE_CONFIGS[config.template] || TEMPLATE_CONFIGS["product-review"];
    const durationConfig = DURATION_CONFIGS[config.clipDuration ?? 16] || DURATION_CONFIGS[16];
    const videoResult = buildVideoPrompt(config, templateConfig, durationConfig, "");

    return {
        imagePrompt: buildImagePrompt(config, templateConfig, ""),
        videoPrompt: videoResult.prompt,
        sceneScripts: videoResult.sceneScripts,
        videoPromptMeta: videoResult.meta
    };
};
