/**
 * AI Prompt Generation Service
 * Supports both OpenAI (GPT-4o) and Gemini for vision analysis and prompt generation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";
import { TemplateOption } from "@/types/netflow";
import { ProductCategory, CATEGORY_ENVIRONMENTS } from "@/data/categoryEnvironments";

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
        "fitted ribbed tank top showing toned arms, casual summer vibe",
        "clean cotton sleeveless tank with scoop neck, relaxed warm-weather look",
        "athletic-fit muscle tank top, sporty confident casual energy",
    ],
    "crop-top": [
        "trendy cropped top with high-waist bottoms, youthful fashionable look",
        "fitted ribbed crop top showing midriff, paired with high-waisted jeans",
        "off-shoulder cropped blouse, feminine stylish summer aesthetic",
        "sporty crop tank with matching high-waist leggings, gym-to-street style",
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
        "chic fitted mini dress with modern cut, confident youthful style",
        "flirty A-line mini dress with structured bodice, playful party-ready look",
        "bodycon mini dress with sleek fabric, bold fashion-forward silhouette",
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
        "fitted compression gym top with athletic leggings, workout-ready physique",
        "athletic tank top with training shorts, sweat-ready gym aesthetic",
        "sports bra and high-waist leggings set, toned active fitness look",
        "performance dry-fit gym outfit, muscular active training style",
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
        "casual beach cover-up with swimwear peaking through, coastal holiday style",
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
    const variants = OUTFIT_PROMPT_MAP[outfitKey];
    if (!variants || variants.length === 0) return "casual everyday wear";
    return variants[Math.floor(Math.random() * variants.length)];
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
    toy: "vibrant child-safe glossy colors, smooth injection-molded rounded edges, durable play-tested ABS plastic material, fun dynamic design, bright cheerful lighting",
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
        "cozy small bedroom with fairy lights, pastel color scheme, neatly organized desk corner, youthful fresh aesthetic",
        "modern hotel-style bedroom with crisp white sheets, mood lighting, floor-to-ceiling window with city night view",
        "boho chic bedroom with macrame wall hanging, earth-tone bedding, indoor trailing plants, warm sunset light",
        "Parisian-style bedroom with ornate mirror, soft grey walls, vintage bedside table, elegant romantic charm",
        "teen bedroom with LED strip lights on ceiling, modern desk setup, colorful accents, youthful energetic space",
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
        "shared family office with kids artwork on wall, warm personal touches, work-from-home relatable atmosphere",
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
        "children's library with colorful book displays, playful reading nooks, bright cheerful lighting, educational fun atmosphere",
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
        "pediatric clinic with colorful wall murals, child-friendly furniture, warm welcoming medical atmosphere",
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
    const categoryEnv = pickRandom(categoryEnvs);
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
    "fashion-review": "Fashion editorial style, 85mm lens, zero lens distortion, full-body and detail shots, smooth tracking, runway-inspired, 4K",
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
    "product-review": "Smooth slow zoom-in on product, then gentle pan to presenter face, steady tripod feel",
    "brainrot-product": "Handheld shaky cam, quick whip pans, jump cuts between angles, high energy movement",
    "food-review": "Slow cinematic push-in on food, smooth orbit around dish, close-up macro tracking on texture",
    "fashion-review": "Smooth tracking shot following model walk, gentle tilt from shoes to face, fluid dolly movement",
    "gadget-review": "Steady close-up on hands demonstrating, smooth slide from product to presenter, controlled push-in on features",
    "unboxing": "Overhead bird's-eye slowly descending, gentle push-in on hands opening, reveal pan from box to product",
    "comparison": "Smooth horizontal slide between two products, steady locked-off comparison angle, controlled pan",
    "testimonial": "Static medium shot with subtle breathing movement, gentle drift closer during emotional moment",
    "flash-sale": "Fast zoom-in burst, energetic whip pan to product, dynamic angle switches with motion blur",
    "tutorial": "Steady overhead angle, smooth transition to eye-level for demonstration, controlled tracking on hands",
    "lifestyle": "Floating steadicam follow shot, natural handheld movement, golden-hour dolly through space",
    "trending": "Vertical smartphone POV, trendy snap-zoom, smooth transition matching viral format rhythm",
    "mini-drama": "Cinematic dolly push-in for drama, slow orbit during revelation, dramatic rack focus between subject and product",
    "before-after": "Locked-off static shot for comparison, smooth match-cut transition, controlled reveal pan"
};

// Scene Transition — keywords for seamless inter-scene continuity
const SCENE_TRANSITION: Record<string, string> = {
    "product-review": "Match cut transition, consistent lighting and color grading across shots, fluid continuation",
    "brainrot-product": "Jump cut style, matching energy between shots, continuous chaotic flow",
    "food-review": "Smooth dissolve, consistent warm color grading, continuous appetizing atmosphere",
    "fashion-review": "Smooth match cut on movement, consistent styling and lighting, runway-flow continuation",
    "gadget-review": "Clean cut on action, consistent tech-clean color grading, seamless demo flow",
    "unboxing": "Continuous single-take feel, time-lapse compression, consistent top-down perspective",
    "comparison": "Split-screen capable transition, consistent neutral grading, smooth analytical flow",
    "testimonial": "Gentle dissolve, consistent warm intimate tone, natural conversation flow",
    "flash-sale": "Fast hard cut on beat, consistent bold energy, countdown rhythm continuation",
    "tutorial": "Step-numbered transition, consistent clean grading, logical progression flow",
    "lifestyle": "Golden-hour dissolve, consistent aesthetic grading, day-in-life time flow",
    "trending": "Trend-matching snap transition, consistent punchy grading, viral rhythm flow",
    "mini-drama": "Cinematic fade or hard cut on emotion beat, consistent dramatic grading, story arc flow",
    "before-after": "Dramatic wipe or match cut, consistent contrast grading, transformation reveal flow"
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
        { name: "Tawan",   voiceTone: "energetic",    ageRange: "teen",         age: "18",      characterType: "วัยรุ่นหนุ่มผอมสูง ผมสั้นสไตล์เกาหลี สปอร์ตบอย นักเรียนมัธยม" },
        { name: "First",   voiceTone: "energetic",    ageRange: "young-adult",  age: "24",      characterType: "หนุ่มฟิตหุ่นล่ำ นักกีฬา/ฟิตเนส ผิวแทน กล้ามชัด พลังงานสูง" },
        { name: "Fluke",   voiceTone: "energetic",    ageRange: "adult",        age: "35",      characterType: "ผู้ชายวัยทำงานแอคทีฟ หุ่นแข็งแรง พิธีกร/นักรีวิว พลังงานเหลือเฟือ" },
        { name: "Gun",     voiceTone: "energetic",    ageRange: "young-adult",  age: "22",      characterType: "หนุ่มนักศึกษาสายสตรีท ผมทำสี แต่งตัวสตรีทแวร์ ไลฟ์ขายของมืออาชีพ" },
        { name: "Tle",     voiceTone: "energetic",    ageRange: "adult",        age: "30",      characterType: "พิธีกรหนุ่มมาดเท่ ผมเซ็ตเป๊ะ หุ่นดี นักรีวิวสายเทค พลังงานล้น" },
        // ── CALM (5 variants) ──
        { name: "Prem",    voiceTone: "calm",         ageRange: "young-adult",  age: "27",      characterType: "หนุ่มสุภาพเรียบร้อย ผมยาวเล็กน้อย ใส่แว่น หน้าตาอ่อนโยน นักอ่าน" },
        { name: "Pond",    voiceTone: "calm",         ageRange: "adult",        age: "40",      characterType: "ผู้ชายวัยกลางคน สุขุม ผมเกรียน ใบหน้าคม สง่า แพทย์/ที่ปรึกษา" },
        { name: "Suthep",  voiceTone: "calm",         ageRange: "middle-age",   age: "55",      characterType: "ลุงใจดี ผมหงอกเล็กน้อย ท่าทางสุขุม ปราชญ์/ครูบาอาจารย์" },
        { name: "Top",     voiceTone: "calm",         ageRange: "young-adult",  age: "25",      characterType: "หนุ่มมินิมอล ผมยาวหวีเรียบ เสื้อผ้าโทนเอิร์ธ สุขุม นักเขียน/ช่างภาพ" },
        { name: "Mark",    voiceTone: "calm",         ageRange: "adult",        age: "45",      characterType: "ผู้ชายสง่าเงียบขรึม หนวดเคราเล็กน้อย สายธรรมชาติ โยคะ/ครูสมาธิ" },
        // ── FRIENDLY (5 variants) ──
        { name: "Somsak",  voiceTone: "friendly",     ageRange: "teen",         age: "17",      characterType: "เด็กหนุ่มข้างบ้าน ยิ้มง่าย ผมตั้ง เสื้อยืดกางเกงยีนส์ เป็นกันเอง" },
        { name: "Bank",    voiceTone: "friendly",     ageRange: "young-adult",  age: "26",      characterType: "หนุ่มออฟฟิศอบอุ่น ใส่เสื้อเชิ้ตพับแขน ยิ้มหวาน พ่อค้าออนไลน์" },
        { name: "Chai",    voiceTone: "friendly",     ageRange: "adult",        age: "38",      characterType: "คุณพ่อยุคใหม่ หุ่นท้วมนิดๆ ใจดี อบอุ่น บล็อกเกอร์ครอบครัว" },
        { name: "Pete",    voiceTone: "friendly",     ageRange: "young-adult",  age: "23",      characterType: "หนุ่มบาริสต้า ผมหยิกธรรมชาติ ผ้ากันเปื้อน ยิ้มเป็นมิตร สายกาแฟ" },
        { name: "Dome",    voiceTone: "friendly",     ageRange: "adult",        age: "33",      characterType: "ช่างภาพฟรีแลนซ์ แต่งตัวชิลล์ ยิ้มง่าย เล่าเรื่องสนุก นักเดินทาง" },
        // ── PROFESSIONAL (5 variants) ──
        { name: "Natt",    voiceTone: "professional", ageRange: "young-adult",  age: "28",      characterType: "หนุ่มสตาร์ทอัพ สูทสลิมฟิต ผมเซ็ต ดูดีมีระดับ CEO รุ่นใหม่" },
        { name: "Arthit",  voiceTone: "professional", ageRange: "adult",        age: "42",      characterType: "ผู้บริหาร สูทสากล ท่าทางมั่นใจ น่าเชื่อถือ ผู้เชี่ยวชาญ" },
        { name: "Somchai", voiceTone: "professional", ageRange: "middle-age",   age: "52",      characterType: "ผู้ใหญ่มากประสบการณ์ ผมขาวเท่ มาดนิ่ง กูรู/ที่ปรึกษาอาวุโส" },
        { name: "James",   voiceTone: "professional", ageRange: "young-adult",  age: "30",      characterType: "ทนายหนุ่ม สูทเข้ารูป ผมเซ็ตเรียบร้อย มาดจริงจัง น่าเชื่อถือ" },
        { name: "Ton",     voiceTone: "professional", ageRange: "adult",        age: "48",      characterType: "หมอผู้เชี่ยวชาญ เสื้อกาวน์ขาว ท่าทางน่าไว้วางใจ สุขุม แม่นยำ" },
        // ── CUTE (5 variants) ──
        { name: "Beam",    voiceTone: "cute",         ageRange: "teen",         age: "16",      characterType: "เด็กหนุ่มหน้าใส ตาโต ผมปัด น่ารักสดใส ไอดอลวัยรุ่น" },
        { name: "Win",     voiceTone: "cute",         ageRange: "young-adult",  age: "23",      characterType: "ซอฟท์บอย ผิวขาว หน้าหวาน เสื้อผ้าพาสเทล อินฟลูเอนเซอร์" },
        { name: "Ohm",     voiceTone: "cute",         ageRange: "adult",        age: "33",      characterType: "ผู้ชายเสน่ห์แรง ยิ้มมีเสน่ห์ ลุคชิลล์ ดูดีแบบไม่ต้องพยายาม" },
        { name: "New",     voiceTone: "cute",         ageRange: "young-adult",  age: "20",      characterType: "หนุ่มน้อยหน้าเด็ก ผิวใส ผมม้า ตาแป๋ว สดใสร่าเริง ไอดอลเกาหลี" },
        { name: "Film",    voiceTone: "cute",         ageRange: "adult",        age: "28",      characterType: "หนุ่มหน้าใสดูอ่อนกว่าวัย ผมยาวปัดข้าง ยิ้มละไม เสน่ห์ธรรมชาติ" },
    ],
    female: [
        // ── ENERGETIC (5 variants) ──
        { name: "Fah",     voiceTone: "energetic",    ageRange: "teen",         age: "18",      characterType: "สาววัยรุ่นไฟแรง ผมหางม้า ชุดสปอร์ต สดใสร่าเริง เชียร์ลีดเดอร์" },
        { name: "Mint",    voiceTone: "energetic",    ageRange: "young-adult",  age: "25",      characterType: "สาวฟิตเนส หุ่นดี ผิวสุขภาพดี กระฉับกระเฉง ยูทูบเบอร์ไลฟ์สไตล์" },
        { name: "Pat",     voiceTone: "energetic",    ageRange: "adult",        age: "35",      characterType: "ผู้หญิงแกร่ง พิธีกร/นักรีวิว พลังเยอะ แต่งตัวจัดจ้าน มีออร่า" },
        { name: "Bow",     voiceTone: "energetic",    ageRange: "young-adult",  age: "23",      characterType: "สาวนักศึกษาเปรี้ยวจี๊ด ผมสั้นบ๊อบ แต่งตัวสตรีท ไลฟ์สดมือโปร พลังเยอะ" },
        { name: "Aom",     voiceTone: "energetic",    ageRange: "adult",        age: "32",      characterType: "แม่ค้าออนไลน์ตัวแม่ หุ่นดี แต่งตัวจัด เสียงดัง พลังงานล้นเวที นักขาย" },
        // ── CALM (5 variants) ──
        { name: "Namwan",  voiceTone: "calm",         ageRange: "young-adult",  age: "26",      characterType: "สาวเรียบร้อย ผมยาวตรง ใบหน้าอ่อนหวาน แต่งตัวมินิมอล สุภาพ" },
        { name: "Noon",    voiceTone: "calm",         ageRange: "adult",        age: "38",      characterType: "ผู้หญิงสง่า ผมประบ่า มาดสุขุม แพทย์/นักจิตวิทยา น่าไว้วางใจ" },
        { name: "Aree",    voiceTone: "calm",         ageRange: "middle-age",   age: "50",      characterType: "คุณป้าสง่างาม ผมสั้นเรียบร้อย ท่าทางอบอุ่น ครู/ที่ปรึกษาอาวุโส" },
        { name: "Mild",    voiceTone: "calm",         ageRange: "young-adult",  age: "24",      characterType: "สาวโยคะ ผิวเปล่งปลั่ง ผมยาวถักเปีย เสื้อผ้าธรรมชาติ สงบนิ่ง" },
        { name: "Orn",     voiceTone: "calm",         ageRange: "adult",        age: "43",      characterType: "เภสัชกรหญิง ท่าทางน่าเชื่อถือ ผมรวบมวยต่ำ เสื้อกาวน์ สุขุมนุ่มนวล" },
        // ── FRIENDLY (5 variants) ──
        { name: "Somying", voiceTone: "friendly",     ageRange: "teen",         age: "17",      characterType: "สาวน้อยข้างบ้าน ยิ้มสดใส แก้มแดง เสื้อยืดน่ารัก เป็นกันเอง" },
        { name: "Pear",    voiceTone: "friendly",     ageRange: "young-adult",  age: "27",      characterType: "สาวออฟฟิศอบอุ่น ใส่เสื้อผ้าแคชชวล ยิ้มเก่ง แม่ค้าออนไลน์" },
        { name: "Nong",    voiceTone: "friendly",     ageRange: "adult",        age: "40",      characterType: "คุณแม่ยุคใหม่ หน้าตาดี อบอุ่น ห่วงใย บล็อกเกอร์ครอบครัว" },
        { name: "Jui",     voiceTone: "friendly",     ageRange: "young-adult",  age: "22",      characterType: "สาวร้านกาแฟ ผ้ากันเปื้อนน่ารัก ผมม้า ยิ้มหวาน เป็นกันเอง อบอุ่น" },
        { name: "Kratae",  voiceTone: "friendly",     ageRange: "adult",        age: "35",      characterType: "แม่บ้านสายรีวิว แต่งตัวสบายๆ หน้าตาดี ยิ้มง่าย เล่าเรื่องสนุก" },
        // ── PROFESSIONAL (5 variants) ──
        { name: "Ploy",    voiceTone: "professional", ageRange: "young-adult",  age: "28",      characterType: "สาวมั่น สูทสวย ผมเก็บมวย ดูดีมีระดับ ผู้ก่อตั้งสตาร์ทอัพ" },
        { name: "Kwan",    voiceTone: "professional", ageRange: "adult",        age: "42",      characterType: "ผู้บริหารหญิง สง่า น่าเชื่อถือ เสื้อผ้าเนี้ยบ ผู้เชี่ยวชาญ" },
        { name: "Suda",    voiceTone: "professional", ageRange: "middle-age",   age: "53",      characterType: "ผู้หญิงมากประสบการณ์ สง่างาม ผมสั้นทรงผู้ดี กูรู/ศาสตราจารย์" },
        { name: "May",     voiceTone: "professional", ageRange: "young-adult",  age: "30",      characterType: "นักการตลาดสาว สูทเข้ารูป ผมยาวตรง แว่นตาทรงเท่ มาดมั่นใจ" },
        { name: "Ning",    voiceTone: "professional", ageRange: "adult",        age: "45",      characterType: "หมอผิวหนัง เสื้อกาวน์ขาว ท่าทางน่าไว้วางใจ ผมประบ่า สุขุม" },
        // ── CUTE (5 variants) ──
        { name: "Minnie",  voiceTone: "cute",         ageRange: "teen",         age: "16",      characterType: "สาวน้อยหน้าใส ตากลมโต ผมสองข้าง ชุดน่ารักพาสเทล ไอดอล" },
        { name: "Ice",     voiceTone: "cute",         ageRange: "young-adult",  age: "22",      characterType: "สาวหวาน ผิวขาว ผมยาว แต่งตัวน่ารัก อินฟลูเอนเซอร์บิวตี้" },
        { name: "Jiew",    voiceTone: "cute",         ageRange: "adult",        age: "32",      characterType: "ผู้หญิงเสน่ห์แรง หน้าเด็ก ยิ้มหวาน ดูอ่อนกว่าวัย มีเสน่ห์" },
        { name: "Bam",     voiceTone: "cute",         ageRange: "young-adult",  age: "20",      characterType: "สาวน้อยผมม้าหน้าเด็ก ตาแป๋ว แก้มป่อง ชุดน่ารักสไตล์ญี่ปุ่น" },
        { name: "Pim",     voiceTone: "cute",         ageRange: "adult",        age: "29",      characterType: "สาวหวานหน้าเด็ก ผมลอนยาว ผิวขาวใส ยิ้มหวานมีเสน่ห์ บิวตี้บล็อกเกอร์" },
    ]
};

/**
 * Lookup persona by gender + voiceTone + ageRange (with smart fallback).
 * Priority: exact match → same tone any age → same age any tone → first of tone.
 */
function getPersona(gender: string, voiceTone: string, _ageRange?: string): VoicePersona {
    const genderKey = gender === 'male' ? 'male' : 'female';
    const pool = VOICE_PERSONA_DB[genderKey];
    const rnd = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

    // Always pick RANDOM from ALL personas matching the tone (diverse age/look variants)
    // DO NOT filter by ageRange — each (tone, ageRange) combo has only 1 persona,
    // which would always return the same person (e.g. Mint, First). Instead, randomize
    // from the full tone pool so every run can get a different persona.
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
    const genderWord = gender === 'male' ? 'Thai male' : 'Thai female';
    const persona = preSelectedPersona || getPersona(gender, voiceTone, ageRange);

    // Visual speaking behavior per tone (how the character LOOKS while speaking, not how they SOUND)
    const speakingBehavior: Record<string, string> = {
        "energetic": "animated expressive mouth movements, wide gestures, dynamic head movement, excited facial expressions",
        "calm": "gentle steady mouth movements, minimal gestures, relaxed composed expression, slow deliberate delivery",
        "friendly": "natural conversational mouth movements, warm smile between words, casual hand gestures, approachable expression",
        "professional": "clear articulate mouth movements, controlled gestures, confident posture, authoritative expression",
        "cute": "playful exaggerated mouth movements, bouncy head tilts, cheerful expressions, lively gestures"
    };
    const behavior = speakingBehavior[voiceTone] || speakingBehavior["friendly"];

    // Voice tone description (safe: no Hz, no WPM — natural language only)
    const voiceToneDesc: Record<string, string> = {
        "energetic": "high-energy enthusiastic voice, fast lively delivery, bright and loud",
        "calm": "soft soothing voice, slow deliberate delivery, warm and gentle",
        "friendly": "warm conversational voice, natural relaxed delivery, approachable and sincere",
        "professional": "confident authoritative voice, clear steady delivery, trustworthy and polished",
        "cute": "cheerful high-pitched voice, bouncy playful delivery, sweet and youthful"
    };
    const voiceDesc = voiceToneDesc[voiceTone] || voiceToneDesc["friendly"];

    return [
        `Character '${persona.name}': ${genderWord} presenter, age ${persona.age}, ${persona.characterType}.`,
        `Voice: ${voiceDesc}. Speaking Thai on-camera: ${behavior}.`,
        `Mouth opens and closes naturally matching spoken words — realistic speaking animation throughout.`,
        `VOICE IDENTITY LOCK: Speaker '${persona.name}' — same voice, same tone, same speaking style, same energy level in EVERY scene. No voice change between scenes. Consistent vocal character throughout the entire video.`
    ].join(' ');
};

// Video Policy Safety — additional directives for video generation
const VIDEO_POLICY_DIRECTIVE = "POLICY: No public figures or celebrities. No deceptive health claims. No violence, gambling, or misleading product claims. No trademark logos in generated visuals. Photorealistic style only, no cartoon effects unless specified.";

// Face Identity Lock — preserve facial features while framing as anonymous/fictional character
// CRITICAL: Avoid "identical likeness" or "direct match" phrasing that triggers Google's "famous person" policy.
// Instead, frame as "original anonymous character inspired by reference style".
const FACE_IDENTITY_LOCK = "FACIAL STRUCTURE PRESERVATION: Use Image 1 ONLY as style inspiration for an ORIGINAL ANONYMOUS character. You MUST preserve the exact bone structure, face width, jawline shape, eye shape, and natural skin texture of the reference. Do NOT widen the face, do NOT exaggerate facial proportions. Keep the makeup natural, subtle, and exactly as shown in the reference (no heavy artificial makeup, no exaggerated lipstick unless in reference). This is an original fictional character but with the exact same natural facial anatomy and aesthetic style as the reference.";

// Front-Facing Character Directive — ensures face consistency with reference input
const FRONT_FACING_DIRECTIVE = "CHARACTER POSE: Natural front-facing angle, looking directly into the lens. Face fully visible. Avoid extreme close-ups that distort facial proportions. Keep a natural, relaxed posture.";

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY-SPECIFIC PRODUCT ANATOMY — tells AI exactly WHAT distinctive features
// to study from the reference image and preserve with 100% fidelity.
// Without this, AI guesses/imagines product details and gets them wrong.
// ═══════════════════════════════════════════════════════════════════════════
const CATEGORY_PRODUCT_ANATOMY: Partial<Record<ProductCategory, string>> = {
    beauty: "STUDY REFERENCE: exact bottle silhouette (round/angular/curved), cap/closure distinctive shape (faceted/smooth/dome/sculpted — preserve every geometric facet and angle), liquid color visible through glass (exact hue and saturation), bottle transparency/frosted level, nozzle or spray mechanism shape, any decorative sculpted elements on bottle or cap, metallic ring or collar details, branding placement and embossing style",
    beverage: "STUDY REFERENCE: exact bottle/can silhouette and proportions, cap/tab design and color, liquid color and opacity level visible through container, packaging wrap layout and color bands, bottle neck shape, grip texture or ridges, carbonation bubble density if visible",
    food: "STUDY REFERENCE: exact packaging shape and dimensions, seal/opening mechanism, color bands and stripe patterns on packaging, window cutouts showing product inside, logo placement and size, any embossed or raised lettering, texture of packaging material (matte/glossy/foil)",
    fashion: "STUDY REFERENCE: exact garment silhouette and cut, collar/neckline shape, sleeve style and length, button/zipper hardware style and color, fabric weave pattern and drape direction, pocket placement and style, any distinctive stitching or seam details, tag/label placement",
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

// Product Match Directive — ensures product matches input reference exactly
const PRODUCT_MATCH_DIRECTIVE = "PRODUCT FIDELITY: Reproduce the reference product with photographic accuracy — same silhouette, same proportions, same material finish, same color palette. Render with extreme surface detail: visible material texture, realistic light interaction (caustics through glass, specular highlights on metallic surfaces, soft diffusion on matte, light refraction on transparent elements). SINGLE PRODUCT ONLY: EXACTLY ONE product unit in frame. No duplicate bottles, no extra containers, no background props resembling the product. Character holds ONE product. PRODUCT LIGHTING: soft rim light defining product edges and silhouette, key light revealing surface texture and material quality, fill light preventing harsh shadows, realistic light refraction through any transparent/glass elements.";

// Anti-Text Directive — strongest possible anti-text/font rendering prevention
const ANTI_TEXT_DIRECTIVE = "CRITICAL NO TEXT DIRECTIVE: Absolutely NO subtitles, NO captions, NO watermarks, NO floating text, NO on-screen graphics, NO gibberish fonts, NO banners, NO UI elements anywhere in the video. The video must be purely visual action and audio dialogue. Do NOT attempt to render any language or letters visually.";

// Anti-Addition Directive — prevents AI from inventing accessories/elements not in the reference
const ANTI_ADDITION_DIRECTIVE = "ZERO INVENTION POLICY: Do NOT add ANY accessory, prop, or element that is NOT explicitly shown in the reference images. Specifically: NO glasses/sunglasses unless in reference. NO hats/headbands unless in reference. NO scarves/neckwear unless in reference. NO earphones/AirPods unless the product IS earphones. NO extra jewelry unless in reference. NO tattoos unless in reference. NO background logos or brand signs. NO secondary products or props not in the brief. If the reference shows a plain-faced person, the output MUST show a plain-faced person. Every visible element must be traceable to either the character reference or the product reference.";

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

// Anti-Floating Hands — prevents unrealistic hand/product physics
const ANTI_FLOATING_HANDS = "HAND REALISM: Product already held naturally from scene start — never spawns from thin air. No levitating hands, no disconnected fingers. Natural gripping with realistic weight.";

/** Build category-specific contact + physics directive (full — for image prompts) */
const buildContactPhysicsDirective = (category: ProductCategory): string => {
    return `${PRODUCT_GRIP_CONTACT[category] || PRODUCT_GRIP_CONTACT["other"]} ${PRODUCT_PHYSICS_SHADOW[category] || PRODUCT_PHYSICS_SHADOW["other"]} ${ANTI_FLOATING_HANDS}`;
};

// Per-category REALISTIC USAGE STEPS — prevents illogical actions (e.g. spraying perfume with cap still on)
const PRODUCT_USAGE_REALISM: Partial<Record<ProductCategory, string>> = {
    // ── Food & Beverage (10) ──
    food: "REALISTIC USAGE: If food is packaged/wrapped, open or unwrap BEFORE eating or serving. Tear open bag, peel lid, or remove wrapper first. Show realistic preparation steps: wash, cut, cook in order. Plated food should be served with appropriate utensils.",
    beverage: "REALISTIC USAGE: If bottle/can has a cap or tab, it MUST be opened BEFORE drinking or pouring. Twist cap off or pull tab first. Pour into glass at natural angle. Never drink through a sealed container.",
    snack: "REALISTIC USAGE: Tear open snack bag or peel back wrapper BEFORE eating. Show reaching into bag and picking up piece. Bite-size items held between fingers naturally. Never eat through sealed packaging.",
    bakery: "REALISTIC USAGE: Open bakery box or remove from bag BEFORE displaying or eating. If wrapped, unwrap first. Break bread naturally with hands or slice with knife. Show fresh texture and interior crumb.",
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
    fragrance: "REALISTIC USAGE: Remove decorative cap from perfume bottle BEFORE spraying. Hold bottle 15-20cm from skin. Press nozzle with index finger for single spray. Target pulse points (wrist, neck). Never spray with cap still on.",
    sunscreen: "REALISTIC USAGE: Flip cap open or remove lid BEFORE squeezing. Squeeze onto fingertips or palm first. Apply in dots on face/body, then spread evenly. Show outdoor/sunny setting for context. Apply BEFORE sun exposure.",
    nail: "REALISTIC USAGE: Unscrew nail polish cap by twisting. Wipe excess on bottle rim. Apply in thin strokes from base to tip of nail. Show steady hand technique. For nail tools — remove from packaging first. Let layers dry between coats.",
    soap: "REALISTIC USAGE: For bar soap — unwrap packaging first, wet hands and bar, lather between palms. For liquid soap — press pump to dispense onto wet hands. For body wash — squeeze onto loofah or palm. Show water and foam/lather.",
    dental: "REALISTIC USAGE: Remove cap from toothpaste, squeeze onto bristles of toothbrush. For mouthwash — unscrew cap, pour measured amount into cap or cup. For floss — pull out strand, wrap around fingers. Show proper brushing/flossing technique.",
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
        knowledge: "Laptops MUST be shown with lid OPEN and screen ON in EVERY scene. The screen display is the hero feature. Showing a closed laptop or just the back/lid is WRONG — like showing a TV that's off. Key features: screen quality, keyboard, trackpad, thin profile, ports, hinge design.",
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
        knowledge: "Phones MUST show the screen facing camera in most scenes. Screen-on display is essential. Key features: camera system, screen quality, thin profile, Face ID/unlock, app demos. Show both front screen and camera module but prioritize screen-facing shots.",
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
        knowledge: "Tablets MUST show screen ON and facing camera. Key features: large display, stylus/pen support, drawing/note capability, split-screen multitasking. Show both landscape and portrait orientations.",
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
        knowledge: "Perfume bottles MUST show cap removal before spraying. Key showcase: bottle design, cap shape, spray nozzle, mist in air, wrist/neck application, enjoying the scent. Never spray with cap on.",
        sceneActions: [
            "Presenter holds perfume bottle showing design — ornate cap, glass shape, liquid color visible.",
            "Presenter removes decorative cap — reveals spray nozzle. Satisfying cap-off moment.",
            "Presenter sprays on wrist — visible mist in air catching light. One or two sprays.",
            "Presenter brings wrist to nose — closes eyes, smiles, enjoys the scent. Genuine reaction.",
            "Close-up of bottle — liquid level, glass transparency, light refraction through fragrance.",
            "Presenter sprays on neck/pulse point — proper fragrance application technique.",
            "Presenter shows cap detail — ornate design, magnetic closure, premium feel.",
            "Presenter places bottle on vanity/display — beauty of bottle as decorative object.",
            "Presenter puts cap back on, holds bottle proudly — complete ritual.",
            "Closing — presenter with confident satisfied expression, bottle prominent in frame."
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
        knowledge: "Food must show UNPACKING → PREPARATION → TASTING ritual. Show food texture, steam, freshness, first bite reaction. Don't just hold sealed packaging — open it, prepare, and taste.",
        sceneActions: [
            "Presenter shows food packaging — brand, design, appetizing food photo on package.",
            "Presenter opens packaging — tears bag, peels lid, unwraps. Fresh food revealed.",
            "Presenter prepares food — plates it, adds garnish, heats up. Appetizing presentation.",
            "Close-up of food — texture, color, steam rising, moisture glistening. Macro food shot.",
            "Presenter takes first bite/taste — genuine reaction, chewing, eyes widen with delight.",
            "Presenter describes flavor — gestures, nods, points at food. Enthusiastic review.",
            "Presenter shows another angle of food — cross-section, layers, ingredients visible.",
            "Presenter takes another enthusiastic bite — can't stop eating, reaches for more.",
            "Presenter shows generous portion size — still plenty of food remaining, great quality visible.",
            "Closing — presenter with food, satisfied smile, thumbs up. Delicious recommendation."
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

    return `PRODUCT PRESENTATION KNOWLEDGE: ${guide.knowledge} VISUAL ACTION FOR THIS SCENE: ${sceneAction}`;
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
    [/\bsurface\b/gi, "premium laptop"],
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
    [/\bมิลลิ\b/gi, "นักร้องหญิง"],
    [/\bลิซ่า\b/gi, "สาวเอเชีย"],
    [/\bแบมแบม\b/gi, "หนุ่มเอเชีย"],
    [/\bบิวกิ้น\b/gi, "หนุ่มไทย"],
    [/\bพีพี\b/gi, "หนุ่มไทย"],
    [/\bใบเฟิร์น\b/gi, "สาวไทย"],
    [/\bญาญ่า\b/gi, "สาวไทย"],
    [/\bมาริโอ้\b/gi, "หนุ่มไทย"],
    [/\bณเดชน์\b/gi, "หนุ่มไทย"],
    [/\bเบลล่า\b/gi, "สาวไทย"],
    [/\bดาวิกา\b/gi, "สาวไทย"],
    [/\bอั้ม\b(?!\s*พัชรา)/gi, "สาวไทย"],
    [/\bอั้ม\s*พัชราภา\b/gi, "สาวไทย"],
    [/\bมาร์กี้\b/gi, "สาวไทย"],
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
 *  If productName is provided, a Veo-safe (brand-stripped) version is preserved
 *  so it won't be double-sanitized, but trademarked words are already removed.
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

    // Protect Veo-safe product name from further brand replacement (already sanitized)
    const placeholder = "___PRODUCT_NAME_PRESERVE___";
    const safeProductName = productName ? sanitizeProductNameForVeo(productName) : undefined;
    if (safeProductName) {
        result = result.replace(new RegExp(safeProductName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), placeholder);
    }
    for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
    }
    for (const word of POLICY_UNSAFE_WORDS) {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(`\\b${escaped}\\b`, 'gi');
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
    // Restore Veo-safe product name
    if (safeProductName) {
        result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), safeProductName);
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
        "gift set", "gift box", "gift basket", "gift wrap", "gift card", "present", "gift hamper",
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

    // ── Snack / Bakery / Organic / Frozen-food / Condiment (before food) ──
    if (includesAny(t, [
        "snack", "chips", "cookie", "candy", "popcorn", "cracker", "granola bar", "dried fruit",
        "ขนม", "มันฝรั่ง", "คุกกี้", "ลูกอม", "ป๊อปคอร์น", "แครกเกอร์", "ผลไม้อบแห้ง"
    ])) return "snack";

    if (includesAny(t, [
        "bakery", "bread", "cake", "pastry", "croissant", "donut", "muffin", "pie", "tart",
        "เบเกอรี่", "ขนมปัง", "เค้ก", "ครัวซองต์", "โดนัท", "มัฟฟิน", "พาย"
    ])) return "bakery";

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
        "food", "noodle", "ramen", "rice", "chocolate", "instant",
        "อาหาร", "ของกิน", "บะหมี่", "ก๋วยเตี๋ยว", "ข้าว"
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
    beverage: ["ชื่นใจมาก", "รสชาติกลมกล่อม", "สดชื่นทันที", "ดื่มแล้วฟิน", "หอมละมุน", "รสเข้มข้น", "ซดแล้วสะใจ"],
    fashion: ["ใส่แล้วดูดี", "เนื้อผ้าดีมาก", "สวยเกินคาด", "ทรงสวยมาก", "แมตช์ง่าย", "ดูแพงมาก", "ใส่สบายมาก"],
    gadget: ["เทคโนโลยีล้ำ", "ฟีเจอร์ครบ", "ใช้ง่ายมาก", "ดีเกินคาดมาก", "ดีไซน์สวย", "ทำงานเร็วมาก", "สเปกจัดเต็ม"],
    beauty: ["ผิวสวยขึ้นจริง", "เนียนละเอียด", "กลิ่นหอมมาก", "ติดทนนาน", "ผิวเปล่งประกาย", "เนื้อบางเบา", "เกลี่ยง่ายมาก"],
    supplement: ["เห็นผลจริง", "ร่างกายดีขึ้น", "พลังงานเพิ่ม", "สุขภาพดี", "ทานง่าย", "ดูดซึมเร็ว", "สารอาหารครบ"],
    pet: ["น้องชอบมาก", "ปลอดภัย 100%", "คุณภาพดี", "น้องกินเพลิน", "สัตวแพทย์แนะนำ", "น้องมีความสุข", "วัตถุดิบดี"],
    baby: ["ปลอดภัยสำหรับลูก", "อ่อนโยนมาก", "ลูกชอบมาก", "คุณแม่วางใจ", "ผ่านมาตรฐาน", "นุ่มสบาย", "ไม่ระคายเคือง"],
    home: ["บ้านดูดีขึ้น", "ใช้งานง่าย", "ดีไซน์สวย", "คุณภาพเยี่ยม", "จัดระเบียบง่าย", "ประหยัดพื้นที่", "เปลี่ยนบ้านเลย"],
    kitchen: ["ทำอาหารง่ายขึ้น", "ทนทานมาก", "ประหยัดเวลา", "ใช้สะดวก", "ล้างง่าย", "ความร้อนสม่ำเสมอ", "มืออาชีพเลย"],
    fitness: ["กล้ามเนื้อชัดขึ้น", "เทรนได้เต็มที่", "ทนทานมาก", "จับถนัดมือ", "ฟิตหนักได้", "คุณภาพยิม", "เห็นผลจริง"],
    auto: ["ติดตั้งง่าย", "ทนทานมาก", "ใช้งานสะดวก", "คุณภาพสูง", "เข้ากับรถทุกรุ่น", "ดีไซน์สวย", "ดีเกินคาด"],
    jewelry: ["สวยหรูมาก", "ประกายวิบวับ", "งานละเอียด", "ใส่แล้วดูแพง", "เพชรเจิดจรัส", "ดีไซน์หรู", "คุณภาพเยี่ยม"],
    watch: ["หรูหรามาก", "เครื่องแม่นยำ", "ดูดีมาก", "งานประณีต", "ใส่แล้วมีออร่า", "คลาสสิกเหนือกาล", "สวยทุกมุม"],
    bag: ["ใส่ของได้เยอะ", "หนังคุณภาพดี", "ทรงสวยมาก", "สะพายสบาย", "ดูแพงมาก", "ทนทานมาก", "แมตช์ทุกลุค"],
    shoe: ["ใส่สบายมาก", "พื้นนุ่ม", "ดีไซน์สวย", "เดินทั้งวันไม่เจ็บ", "ทรงสวย", "ระบายอากาศดี", "กระชับเท้า"],
    book: ["อ่านสนุกมาก", "เนื้อหาดี", "วางไม่ลง", "เปลี่ยนมุมมอง", "ได้ความรู้เพียบ", "เขียนดีมาก", "อ่านจบในวันเดียว"],
    toy: ["เล่นสนุกมาก", "สีสันสดใส", "พัฒนาสมอง", "ปลอดภัย", "เด็กชอบมาก", "เล่นได้นาน", "วัสดุดี"],
    stationery: ["เขียนลื่นมาก", "ดีไซน์สวย", "จับถนัดมือ", "สีสดสวย", "คุณภาพดี", "ใช้แล้วติดใจ", "เขียนสบาย"],
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
    beverage: ["ดื่มแล้วสดชื่น ตื่นตัวทันที", "รสชาติลงตัว หอมกลมกล่อม", "ชงง่าย ได้รสเข้มข้น", "ดื่มทุกวันก็ไม่เบื่อ"],
    fashion: ["ใส่แมตช์ได้ทุกวัน ทุกโอกาส", "เนื้อผ้าดี ใส่สบายตลอดวัน", "ทรงสวย ใส่แล้วดูดีทันที", "สวมใส่ง่าย ดูมีสไตล์"],
    gadget: ["ฟีเจอร์ครบจบในเครื่องเดียว", "ใช้งานง่าย เข้าใจทันที", "ช่วยให้ชีวิตสะดวกขึ้นจริง", "เทคโนโลยีล้ำ ดีเกินคาด"],
    beauty: ["ทาแล้วผิวสวยขึ้นทันตา", "เนื้อบางเบา ซึมเร็ว ไม่เหนียว", "กลิ่นหอมละมุน ติดทนทั้งวัน", "ใช้แล้วผิวเปล่งประกาย"],
    supplement: ["ทานง่าย เห็นผลจริง", "ร่างกายดีขึ้น แข็งแรงขึ้น", "สารอาหารครบ ดูดซึมเร็ว", "ดูแลสุขภาพจากภายใน"],
    pet: ["น้องชอบมาก กินเกลี้ยง", "วัตถุดิบดี ปลอดภัยต่อน้อง", "น้องสุขภาพดี มีความสุข", "สัตวแพทย์รับรอง วางใจได้"],
    baby: ["ลูกใช้ได้อย่างปลอดภัย", "อ่อนโยน ไม่ระคายเคืองผิว", "คุณแม่วางใจ ลูกมีความสุข", "ผ่านมาตรฐานความปลอดภัย"],
    home: ["บ้านดูสวย จัดระเบียบง่าย", "เปลี่ยนบ้านให้ดูดีทันที", "ใช้งานสะดวก ออกแบบมาดี", "ประหยัดพื้นที่ ดูเรียบร้อย"],
    kitchen: ["ทำอาหารง่ายขึ้น ประหยัดเวลา", "ทนความร้อน ใช้ได้นาน", "ล้างง่าย ดูแลสะดวก", "เหมือนได้เชฟมาช่วยทำอาหาร"],
    fitness: ["เทรนได้เต็มประสิทธิภาพ", "กล้ามเนื้อชัดขึ้น เห็นผลเร็ว", "ทนทาน ฟิตหนักได้ทุกวัน", "เหมือนมีเทรนเนอร์ส่วนตัว"],
    auto: ["ติดตั้งง่าย ใช้ได้ทันที", "เข้ากับรถได้ทุกรุ่น ทุกยี่ห้อ", "ทนทาน ใช้งานได้ยาวนาน", "อัปเกรดรถให้ดีขึ้นทันที"],
    jewelry: ["ใส่แล้วดูมีราคา สง่างาม", "ประกายเพชรเจิดจรัส สะดุดตา", "งานละเอียด คุณภาพช่างฝีมือ", "เพิ่มออร่าให้ทุกลุค"],
    watch: ["ใส่แล้วดูมีระดับทันที", "เครื่องแม่นยำ เชื่อถือได้", "คลาสสิกเหนือกาล สวยทุกโอกาส", "หรูหราทุกมุมมอง"],
    bag: ["ใส่ของได้เยอะ จัดระเบียบง่าย", "สะพายสบาย ไม่ปวดไหล่", "หนังคุณภาพดี ยิ่งใช้ยิ่งสวย", "แมตช์ได้ทุกชุด ทุกโอกาส"],
    shoe: ["ใส่สบายมาก เดินทั้งวันไม่เจ็บ", "พื้นนุ่ม รองรับทุกก้าว", "ดีไซน์สวย ใส่ได้ทุกโอกาส", "กระชับเท้า ระบายอากาศดี"],
    book: ["อ่านสนุก วางไม่ลงเลย", "เนื้อหาดี ได้ความรู้เพียบ", "เปลี่ยนมุมมอง เปิดโลกใหม่", "เขียนดีมาก อ่านง่าย"],
    toy: ["เด็กเล่นสนุก พัฒนาสมอง", "วัสดุปลอดภัย พ่อแม่วางใจ", "เล่นได้นาน ไม่เบื่อง่าย", "สีสันสดใส ดึงดูดสายตา"],
    stationery: ["เขียนลื่น จับถนัดมือ", "ดีไซน์สวย ใช้แล้วอยากเขียน", "สีสด คมชัด ทุกเส้น", "คุณภาพดี ใช้ได้ยาวนาน"],
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
    auto: ["สั่งเลย อัปเกรดรถวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "ของมีจำนวนจำกัด!"],
    jewelry: ["สั่งเลย ก่อนแบบนี้หมด!", "โปรนี้หมดแล้วหมดเลย!", "กดสั่งวันนี้!", "ของมีจำกัด!"],
    watch: ["สั่งเลย ก่อนรุ่นนี้หมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    bag: ["สั่งเลย ก่อนสีนี้หมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "รีบเลย ก่อนหมด!"],
    shoe: ["สั่งเลย ก่อนไซส์หมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ไม่รีบ หมดนะ!"],
    book: ["สั่งเลย อ่านวันนี้!", "โปรนี้มีจำกัด!", "กดสั่งเลย!", "อย่าพลาดเล่มนี้!"],
    toy: ["สั่งเลย ให้เด็กๆ ได้เล่น!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "ของมีจำนวนจำกัด!"],
    stationery: ["สั่งเลย ก่อนหมด!", "โปรนี้มีจำกัด!", "กดสั่งวันนี้!", "รีบเลย ก่อนหมด!"],
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
};

// Generate full Thai script with product name — CATEGORY-SPECIFIC
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
    const powerWord = pickRandom(CATEGORY_POWER_WORDS[category] || CATEGORY_POWER_WORDS.other);
    const benefit = pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other);
    const urgency = pickRandom(CATEGORY_URGENCY[category] || CATEGORY_URGENCY.other);
    
    // Generate exactly 1 short script per scene (~8 seconds each, slow comfortable pace)
    // Each line should be 1-2 short sentences only — NOT crammed with text
    const sceneCount = Math.max(1, Math.floor(clipDuration / 8));
    let scriptParts: string[] = [];
    
    const rawOpeningHook = hookText || pickRandom(HOOK_VARIATIONS[template] || HOOK_VARIATIONS["product-review"]);
    const openingHook = ensureMentionsProductName(rawOpeningHook, productName);
    const rawClosingCTA = ctaText || pickRandom(CTA_VARIATIONS[saleStyle] || CTA_VARIATIONS["storytelling"]);
    const closingCTA = ensureMentionsProductName(rawClosingCTA, productName);

    // Category-specific intro verb for Scene 1
    const scene1Intro: Partial<Record<ProductCategory, string[]>> = {
        food: ["วันนี้ลองชิม", "มาชิมกัน", "ลองกินตัวนี้"],
        beverage: ["วันนี้ลองจิบ", "มาชิมเครื่องดื่มนี้", "ลองชงตัวนี้"],
        fashion: ["วันนี้ลองใส่", "มาลองชุดนี้", "ลองแมตช์ลุคนี้"],
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
        cleaning: ["วันนี้ลองใช้", "มาทำความสะอาดด้วย", "ลองตัวนี้"],
        outdoor: ["วันนี้ลองพกไปใช้", "มาลองเอาไปเที่ยว", "ลองใช้กลางแจ้ง"],
        health: ["วันนี้ลองวัดค่า", "มาเช็คสุขภาพด้วย", "ลองใช้ตรวจดู"],
        craft: ["วันนี้มา DIY ด้วย", "มาลองทำงานฝีมือ", "ลองสร้างสรรค์ด้วย"],
        digital: ["วันนี้ลองใช้", "มาลองแอปนี้", "ลองเปิดใช้ดู"]
    };

    // Category-specific action verb for Scene 2 (3-scene version)
    const scene2Action: Partial<Record<ProductCategory, string[]>> = {
        food: ["ลองชิมแล้ว", "ลองกินแล้ว", "คำแรกเลย"],
        beverage: ["จิบแล้ว", "ลองดื่มแล้ว", "ชงแล้วลองดู"],
        fashion: ["ใส่แล้ว", "ลองใส่ให้ดู", "แมตช์ลุคแล้ว"],
        gadget: ["ใช้จริงแล้ว", "ลองฟีเจอร์แล้ว", "เทสต์แล้ว"],
        beauty: ["ทาแล้ว", "ลองใช้แล้ว", "เกลี่ยแล้ว"],
        supplement: ["ลองทานแล้ว", "ทานมาแล้ว", "ใช้มาแล้ว"],
        pet: ["น้องลองแล้ว", "ให้น้องกินแล้ว", "น้องใช้แล้ว"],
        baby: ["ลูกใช้แล้ว", "ลูกลองแล้ว", "ให้ลูกใช้แล้ว"],
        home: ["จัดแล้ว", "ใช้แล้ว", "ตกแต่งแล้ว"],
        kitchen: ["ลองทำอาหารแล้ว", "ใช้ในครัวแล้ว", "ทดสอบแล้ว"],
        fitness: ["เทรนแล้ว", "ลองฟิตแล้ว", "ใช้เทรนแล้ว"],
        auto: ["ติดตั้งแล้ว", "ลองใช้แล้ว", "ใส่รถแล้ว"],
        jewelry: ["ใส่แล้ว", "สวมแล้ว", "ลองใส่แล้ว"],
        watch: ["สวมแล้ว", "ใส่แล้ว", "ลองสวมแล้ว"],
        bag: ["สะพายแล้ว", "ลองถือแล้ว", "ใช้แล้ว"],
        shoe: ["สวมแล้ว", "ลองเดินแล้ว", "ใส่แล้ว"],
        book: ["อ่านแล้ว", "ลองอ่านแล้ว", "อ่านจบแล้ว"],
        toy: ["เล่นแล้ว", "ลองเล่นแล้ว", "เด็กๆ เล่นแล้ว"],
        stationery: ["เขียนแล้ว", "ลองใช้แล้ว", "ลองเขียนแล้ว"],
        cleaning: ["ใช้ทำความสะอาดแล้ว", "ลองฉีดแล้ว", "ใช้แล้ว"],
        outdoor: ["ลองใช้แล้ว", "เอาไปใช้แล้ว", "ทดสอบแล้ว"],
        health: ["ลองใช้แล้ว", "วัดค่าแล้ว", "เช็คแล้ว"],
        craft: ["ลอง DIY แล้ว", "ทำเสร็จแล้ว", "ลองทำแล้ว"],
        digital: ["ลองใช้แล้ว", "เปิดใช้แล้ว", "ทดสอบแล้ว"]
    };

    const intro = pickRandom(scene1Intro[category] || ["มาดู"]);
    const action = pickRandom(scene2Action[category] || ["ลองใช้แล้ว"]);
    const reviewPhrase = CATEGORY_REVIEW_PHRASE[category] ? pickRandom(CATEGORY_REVIEW_PHRASE[category]!) : `${action} ${productName} แล้วบอกเลย`;

    if (sceneCount === 1) {
        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${intro} ${productName} ${powerWord}!"`);
    } else if (sceneCount === 2) {
        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${intro} ${productName} กัน!"`);
        scriptParts.push(`🎬 ฉาก2: "${benefit} ${powerWord} ${closingCTA} ${urgency}"`);
    } else {
        // 3+ scenes: hook → review with variety → closing CTA
        // Build middle scene variety pool so each scene covers a different topic
        const middleTopics = [
            `${reviewPhrase} ${productName} ${powerWord} ${benefit}`,
            `${action} ${productName} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)} ดีมากจริงๆ`,
            `${productName} ${pickRandom(CATEGORY_POWER_WORDS[category] || CATEGORY_POWER_WORDS.other)} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)} เลย`,
            `ที่ชอบมากคือ ${productName} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)} ${pickRandom(CATEGORY_POWER_WORDS[category] || CATEGORY_POWER_WORDS.other)}`,
            `${productName} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)} ใช้แล้วติดใจ`,
            `บอกเลย ${productName} ตัวนี้ ${pickRandom(CATEGORY_POWER_WORDS[category] || CATEGORY_POWER_WORDS.other)} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)}`,
            `ลองมาแล้ว ${productName} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)} จริงๆ`,
            `${productName} ${pickRandom(CATEGORY_POWER_WORDS[category] || CATEGORY_POWER_WORDS.other)} ${pickRandom(CATEGORY_URGENCY[category] || CATEGORY_URGENCY.other)}`,
        ];

        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${intro} ${productName} กัน!"`);
        // Fill middle scenes (2 to sceneCount-1) with distinct topics
        for (let i = 1; i < sceneCount - 1; i++) {
            const topicIdx = (i - 1) % middleTopics.length;
            scriptParts.push(`🎬 ฉาก${i + 1}: "${middleTopics[topicIdx]}"`);
        }
        scriptParts.push(`🎬 ฉาก${sceneCount}: "${closingCTA} ${pickRandom(CATEGORY_BENEFITS[category] || CATEGORY_BENEFITS.other)} ${urgency}"`);
    }
    
    return scriptParts.join("\n");
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
    
    // Language
    language: string;           // th-central, etc.
    accent?: string;            // central, north, south, isan
    
    // Script Elements
    hookText?: string;
    ctaText?: string;
    mustUseKeywords?: string;
    avoidKeywords?: string;
    
    // Character & Style
    gender?: string;            // male, female
    ageRange?: string;          // teen, young-adult, adult, middle-age, senior
    expression?: string;        // neutral, happy, excited, serious
    movement?: string;          // static, minimal, active
    clothingStyles?: string[];  // casual, formal, sporty, fashion, uniform
    characterOutfit?: string;   // detailed outfit key from characterOutfitOptions
    cameraAngles?: string[];    // front, side, close-up, full-body, dynamic
    
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
    ageRange: string;           // teen, young-adult, adult, middle-age
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
  "estimatedAge": <number 15-60>,
  "ageRange": "<teen|young-adult|adult|middle-age>",
  "gender": "<male|female>",
  "build": "<slim|athletic|average|muscular|curvy>",
  "hairstyle": "<short description of hair style, length, color>",
  "skinTone": "<fair|medium|tan|dark>",
  "clothing": "<what they are wearing>",
  "overallLook": "<1-2 sentence visual summary of this person's appearance>"
}

Rules:
- teen = 15-19, young-adult = 20-29, adult = 30-44, middle-age = 45+
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

    // Filter by tone first
    const tonePool = pool.filter(p => p.voiceTone === voiceTone);
    if (tonePool.length === 0) {
        // Fallback: any persona from same gender
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // Sort by closest age match
    const sorted = [...tonePool].sort((a, b) => {
        const diffA = Math.abs(parseInt(a.age) - targetAge);
        const diffB = Math.abs(parseInt(b.age) - targetAge);
        return diffA - diffB;
    });

    // Pick from top 2 closest (small randomization to avoid always same pick)
    const topN = sorted.slice(0, Math.min(2, sorted.length));
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
    const durationConfig = DURATION_CONFIGS[config.clipDuration] || DURATION_CONFIGS[16];

    // Step 3: Build Image Prompt (for Google Labs ImageFX)
    const imagePrompt = buildImagePrompt(config, templateConfig, productAnalysis);
    
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
    const genderText = config.gender === 'male' ? 'professional male presenter' : 'professional female presenter';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';
    const hasProductImage = !!config.productImage;

    const expressionText = EXPRESSION_MAP[config.expression || 'happy'] || 'subtle natural smile';
    const clothingDesc = config.characterOutfit
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

    // ── Fitness/Supplement body override ──
    const isFitnessCategory = category === 'supplement' || category === 'fitness';
    const fitnessBodyDesc = isFitnessCategory
        ? (config.gender === 'male'
            ? 'muscular athletic build, broad shoulders, toned arms and chest, confident gym-ready posture, wearing fitted gym tank top and athletic shorts'
            : 'athletic toned fit body, slim waist, toned arms and shoulders, confident gym-ready posture, wearing fitted athletic sports bra and leggings')
        : '';
    const characterLine = isFitnessCategory
        ? `${genderText}, ${fitnessBodyDesc}, ${expressionText} expression. ${dynamics}. ${movementDesc}`
        : `${genderText}, ${expressionText} expression, wearing ${clothingDesc}. ${dynamics}. ${movementDesc}`;

    const productAnatomy = buildProductAnatomyDirective(category, config.productName);

    let prompt = `Professional ${templateConfig.englishName} photograph.

[PRODUCT] ${config.productName}: ${productDesc}. ${productAnatomy} PRODUCT IDENTITY LOCK: exact packaging silhouette, proportions, cap/closure distinctive design, label typography and font, color palette, material texture and finish — all from reference image. Render with extreme surface detail: visible material grain, realistic light response (specular highlights on glossy, soft diffusion on matte, caustics and refraction on glass/transparent elements, light dispersion on faceted surfaces). The text "${config.productName}" must appear on the product label exactly as spelled letter-by-letter — correct font, correct letter spacing, no misspelling, no gibberish, high-fidelity logo detail. Product lit with soft rim light defining silhouette edges, key light revealing surface texture and material quality.
[CHARACTER] ${characterLine}.
[CAMERA] ${cameraDesc}. ${cinematic}.
[SETTING] ${environment}.
[LIGHTING] ${lighting}.
[QUALITY] ${aspectRatio} orientation, photorealistic, ultra-detailed textures, 4K quality. ${ANTI_TEXT_DIRECTIVE}

COMPOSITION: Single continuous scene — NO split screen, NO collage, NO side-by-side panels, NO divided frames. One unified photograph with character holding or interacting with the product naturally. Both must be clearly visible together.
${FRONT_FACING_DIRECTIVE}
${PRODUCT_MATCH_DIRECTIVE}
${ANTI_DISTORTION_DIRECTIVE}
${FACE_IDENTITY_LOCK}
${ANTI_ADDITION_DIRECTIVE}
${CLOTHING_FIDELITY_DIRECTIVE}

Reference Images:
- Image 1: Character style reference — use as visual inspiration for an ORIGINAL ANONYMOUS fictional character with similar aesthetic${hasProductImage ? `
- Image 2: PRODUCT STRUCTURE REFERENCE (HIGHEST PRIORITY) — This image defines the EXACT product design. Study every detail: silhouette, proportions, cap/closure shape, label layout, material finish, color palette, distinctive decorative elements. Reproduce the product with photographic accuracy. The label text and brand name spelling are the #1 priority. Do NOT simplify or reimagine any part of the product — if the reference shows a unique feature, that EXACT feature must appear in the output.` : ''}
- If text conflicts with images, images win. Product structure from Image 2 is the absolute visual authority for product design.

${config.mustUseKeywords ? `Must include: ${config.mustUseKeywords}` : ''}
${config.avoidKeywords ? `Avoid: ${config.avoidKeywords}` : ''}`;

    return sanitizePromptForPolicy(prompt.trim(), config.productName);
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
    const genderText = config.gender === 'male' ? 'professional male presenter' : 'professional female presenter';
    const genderVoice = config.gender === 'male' ? 'Male' : 'Female';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';
    const voiceTone = config.voiceTone || 'friendly';
    
    const expressionText = EXPRESSION_MAP[config.expression || 'happy'] || 'subtle natural smile';
    const clothingDesc = config.characterOutfit
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

    // ── Language → voiceover language ──
    const languageMap: Record<string, string> = {
        "th-central": "Thai", "th-north": "Thai",
        "th-south": "Thai", "th-isan": "Thai"
    };
    const voiceLanguage = languageMap[config.language] || "Thai";

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
            voiceTone,
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

    const styleDesc = `${templateConfig.style}, ${saleStyle.approach}, ${dynamics}`;

    // ── Build Scene 1 prompt — Hierarchical format ──
    // SAFETY: Do NOT use "lip sync" or "lip-sync" — gets truncated to "Lip." triggering safety filters.
    const speakingDirective = `Character speaks directly to camera throughout. Mouth opens and closes naturally matching spoken words. Realistic speaking animation, never silent or static expression.`;

    const contactPhysics = buildContactPhysicsDirectiveSlim(category);
    // ── Veo-safe product name — strip trademarked brands for visual prompt (product IMAGE handles identity) ──
    const veoSafeProductName = sanitizeProductNameForVeo(config.productName);
    console.log(`🛡️ Product name sanitized for Veo: "${config.productName}" → "${veoSafeProductName}"`);
    const videoProductAnatomy = buildProductAnatomyDirective(category, veoSafeProductName);

    // ── Product Usage Realism — prevents illogical actions (e.g. spraying with cap on) ──
    const productUsageRealism = PRODUCT_USAGE_REALISM[category] || "REALISTIC USAGE: If product has any cap, lid, seal, or wrapper, it must be removed/opened BEFORE use. Show logical step-by-step usage.";

    // ── CHARACTER VISUAL DNA ANCHOR — IDENTICAL text for Scene 1 AND Scene 2+ ──
    // Repeats FULL physical description in every scene for maximum consistency.
    // When characterAnalysis is available (AI Vision), include precise details from the actual reference image.
    const aiAppearance = characterAnalysis
        ? `AI-observed appearance: ${characterAnalysis.overallLook}. Hair: ${characterAnalysis.hairstyle}. Build: ${characterAnalysis.build}. Skin tone: ${characterAnalysis.skinTone}. Estimated age: ${characterAnalysis.estimatedAge}.`
        : '';
    const aiClothing = characterAnalysis?.clothing
        ? `Reference clothing: ${characterAnalysis.clothing}.`
        : '';

    const characterAnchor = [
        `CHARACTER VISUAL DNA (MUST be IDENTICAL in every scene):`,
        `Character '${persona.name}': ${genderText}, age ${persona.age}, ${persona.characterType}.`,
        aiAppearance,
        `Outfit: ${clothingDesc}${aiClothing ? ` (${aiClothing})` : ''} — same outfit in EVERY scene, absolutely no wardrobe changes.`,
        `Expression baseline: ${expressionText}.`,
        `${dynamics}. ${movementDesc}.`,
        `FACE LOCK: Preserve EXACT facial bone structure, face width, jawline shape, eye shape, nose shape, natural skin texture, skin tone from scene 1. Zero face changes between scenes.`,
        `BODY LOCK: Same body type, same build, same posture style, same height proportion across all scenes.`,
        `HAIR LOCK: Same hairstyle, same hair color, same hair length, same hair texture in every scene.`
    ].filter(Boolean).join(' ');

    // ── Unified Product Anchor — IDENTICAL text for Scene 1 AND Scene 2+ (Anchor Prompt technique) ──
    // Same material-level description copy-pasted everywhere so AI produces visually consistent product across all scenes.
    const productAnchor = `The ${veoSafeProductName} product is the HERO — always visible, prominent, centered. Product visual identity: ${fullProductHighlight}. ${videoProductAnatomy} Render with extreme surface detail: visible material texture, realistic light interaction (specular on glossy, diffusion on matte, caustics and refraction on glass/transparent, light dispersion on faceted surfaces). PRODUCT IDENTITY LOCK: exact packaging silhouette, proportions, cap/closure distinctive design, color palette — all IDENTICAL across every scene. High-fidelity visual detail — preserve exact visual branding from reference. Product is a FIXED visual constant — never morph, never simplify, never change shape, never alter any distinctive feature between scenes. Product lit with soft rim light defining silhouette, featured in every frame. ${productUsageRealism}`;

    let prompt = sanitizePromptForPolicy([
        // ★ [1. CHARACTER VISUAL DNA — HIGHEST PRIORITY] — full character identity
        `${characterAnchor}`,
        // ★ [2. VOICE PERSONA + SCRIPT] — voice persona + dialogue
        `${voiceoverDescriptor}`,
        `(Voice: ${persona.name}) ${genderVoice} ${voiceLanguage} voice speaking. SPOKEN DIALOGUE (AUDIO ONLY — do NOT render this text visually on screen, ZERO on-screen text): "${sceneTexts[0] || `มาดู ${veoSafeProductName} กัน!`}"`,
        // ★ [3. PRODUCT IDENTITY] — product anchor with usage realism
        `${templateConfig.englishName} commercial video. ${productAnchor}`,
        // [4. ACTION] — character interaction + product presentation
        `${contactPhysics} ${speakingDirective}`,
        // [4.5. PRODUCT PRESENTATION] — category-specific visual action for this scene
        `${getScenePresentationDirective(category, 1)}`,
        // [5. ENVIRONMENT] — setting/background
        `${environment}.`,
        // [6. CAMERA & LIGHTING]
        `Camera: ${cameraAngleDesc}. ${cinematic}. ${cameraMove}. ${lighting}.`,
        // [7. STYLE/MOOD]
        `${durationConfig.pacing}. Fluid motion, cinematic motion blur, high frame rate.`,
        // [8. CONSTRAINTS] — condensed policy + technical (avoids bloated 3000-char directives that cause Veo truncation/rejection)
        `${aspectDirective} ${ANTI_TEXT_DIRECTIVE} ${FRONT_FACING_DIRECTIVE} PRODUCT FIDELITY: Reproduce product with photographic accuracy — same silhouette, proportions, material, color. Single product only. No invented accessories, glasses, hats, or props not in reference. Clothing accuracy: match neckline, sleeve, color, pattern exactly as described. Same fictional character and outfit throughout. Product frontal, centered, zero distortion. Character speaks from first frame — voice '${persona.name}' carries identically through every scene. Product maintains consistent size relative to character. ${VIDEO_POLICY_DIRECTIVE}`
    ].join(' '), veoSafeProductName);

    // Safety cap: prevent Veo prompt truncation that causes safety filter triggers
    const MAX_SCENE1_PROMPT_LENGTH = 3500;
    if (prompt.length > MAX_SCENE1_PROMPT_LENGTH) {
        console.warn(`⚠️ Scene 1 prompt too long (${prompt.length} chars), trimming to ${MAX_SCENE1_PROMPT_LENGTH}`);
        prompt = prompt.substring(0, MAX_SCENE1_PROMPT_LENGTH).replace(/\s\S*$/, '');
    }

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
        category
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
    const cleanScript = sceneScript.trim().replace(/^"+|"+$/g, '').trim();
    const aspectDirective = meta.aspectRatio === '9:16'
        ? 'Aspect ratio: 9:16 vertical portrait framing.'
        : 'Aspect ratio: 16:9 horizontal landscape framing.';

    // SAFETY: Do NOT use "lip sync" or "lip-sync" — gets truncated to "Lip." triggering safety filters.
    const speakingDirective = `Character speaks to camera, mouth naturally matching spoken words.`;

    // ── SEAMLESS TRANSITION ──
    const transitionDirective = `Seamless continuous flow from scene ${sceneNumber - 1}, one unbroken take.`;

    // ── SLIM PRODUCT IDENTITY — frame reference handles visual details ──
    // Full productAnchor is ~1000 chars; slim version keeps only essential identity
    const productName = meta.product?.split(',')[0]?.trim() || 'the product';
    const slimProductIdentity = `${meta.template} commercial. The ${productName} is the HERO — always visible, prominent, centered. Same product appearance, same size, same position as scene ${sceneNumber - 1}. ${meta.productUsageRealism}`;

    const prompt = sanitizePromptForPolicy([
        // [1. CHARACTER VISUAL DNA] — full anchor for face/body consistency
        meta.characterAnchor,

        // [2. PRODUCT IDENTITY] — slim version (frame reference has the visual details)
        slimProductIdentity,

        // [3. VOICE + SCRIPT] — voiceoverDescriptor already contains voice lock
        meta.voiceoverDescriptor,
        `(Voice: ${meta.personaName}) ${meta.genderVoice}. SPOKEN DIALOGUE (AUDIO ONLY — not rendered on screen): "${cleanScript || 'สินค้าดีจริง คุ้มค่ามาก!'}"`,

        // [4. ACTION] — what happens in this scene
        `Character holds and presents ${productName}. ${speakingDirective}`,
        sceneVideoAction?.trim()
            ? `${sceneVideoAction.trim()}. ${getScenePresentationDirective(meta.category, sceneNumber)}`
            : getScenePresentationDirective(meta.category, sceneNumber),

        // [5. CAMERA & LIGHTING]
        `${meta.camera}. ${meta.lighting}.`,

        // [6. CONTINUITY]
        `SCENE ${sceneNumber} — continuation from scene ${sceneNumber - 1}. ${transitionDirective} ${meta.pacing}.`,

        // [7. CONSTRAINTS] — slim: no 2860-char restrictions block, frame reference handles the rest
        `${aspectDirective} No on-screen text, subtitles, or watermarks. No invented accessories. Same character '${meta.personaName}', same outfit (${meta.clothingDesc}), same product, same environment. ${meta.cameraMovement}. Photorealistic only.`
    ].filter(Boolean).join(' '), productName);

    // Safety cap: prevent Veo prompt truncation that causes safety filter triggers
    const MAX_SCENE_PROMPT_LENGTH = 2500;
    if (prompt.length > MAX_SCENE_PROMPT_LENGTH) {
        console.warn(`⚠️ Scene ${sceneNumber} prompt too long (${prompt.length} chars), trimming to ${MAX_SCENE_PROMPT_LENGTH}`);
        return prompt.substring(0, MAX_SCENE_PROMPT_LENGTH).replace(/\s\S*$/, '');
    }
    return prompt;
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
