/**
 * AI Prompt Generation Service
 * Supports both OpenAI (GPT-4o) and Gemini for vision analysis and prompt generation
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";
import { TemplateOption } from "@/types/netflow";

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
    food: "appetizing presentation, visible texture and steam, vibrant natural food colors, fresh ingredients",
    beverage: "condensation droplets on glass, rich liquid color, visible pour or fizz, refreshing aesthetic",
    fashion: "premium fabric texture, clean stitching details, elegant draping, natural fabric movement",
    gadget: "sleek modern design, brushed metal or matte finish, clean product lines, sharp edges",
    beauty: "elegant glass or matte packaging, dewy product texture, premium cosmetic aesthetic",
    supplement: "clean clinical packaging, visible capsule or tablet details, health-forward branding, athletic fit presenter with toned physique holding product confidently",
    pet: "pet-safe materials, vibrant fun packaging, durable quality, animal-friendly design",
    baby: "soft pastel tones, BPA-free safe materials, gentle rounded edges, parent-trusted quality",
    home: "premium household material, clean modern design, functional elegance, lifestyle integration",
    kitchen: "durable cooking-grade material, heat-resistant finish, ergonomic design, professional look",
    fitness: "sweat-resistant material, bold sporty design, durable construction, performance-ready finish, athletic fit presenter with muscular toned physique",
    auto: "precision-engineered surface, metallic or carbon-fiber finish, rugged durability, automotive grade",
    jewelry: "brilliant gemstone sparkle, polished precious metal, intricate craftsmanship, luxury finish",
    watch: "precise dial details, premium strap material, polished case finish, sophisticated design",
    bag: "premium leather or fabric texture, quality hardware, clean stitching, structured silhouette",
    shoe: "detailed sole construction, premium upper material, clean profile lines, comfort-engineered design",
    book: "crisp cover design, quality paper texture, readable typography, engaging visual layout",
    toy: "vibrant safe-for-kids colors, smooth rounded edges, durable play-tested material, fun design",
    stationery: "smooth writing surface, precise construction, clean minimalist design, satisfying tactile feel",
    cleaning: "efficient formula, clear packaging, easy-grip bottle design, professional cleaning aesthetic",
    outdoor: "weather-resistant material, rugged durable construction, adventure-ready design, nature-compatible",
    health: "medical-grade quality, clean sterile packaging, precision instrumentation, trustworthy design",
    craft: "rich artisan texture, handmade quality details, natural material warmth, creative aesthetic",
    digital: "clean UI interface, modern digital design, intuitive layout, tech-forward presentation",
    other: "high-quality product details, clean presentation, visible material texture, professional finish"
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
// SMART ENVIRONMENT — Category-aware background override
// When template doesn't match product type, use category-appropriate setting
// ═══════════════════════════════════════════════════════════════════════════

// Category-specific environments — 10 randomized variations per category
const CATEGORY_ENVIRONMENTS: Record<ProductCategory, string[]> = {
    food: [
        "warm wooden kitchen counter, cozy home cooking atmosphere, copper pots hanging in background",
        "trendy café counter with espresso machine, soft ambient café lighting, rustic brick wall",
        "elegant restaurant table setting, white tablecloth, candlelight ambiance, fine dining backdrop",
        "outdoor garden picnic setup, natural sunlight through trees, wicker basket and greenery",
        "modern food truck window, vibrant street food scene, colorful awning overhead",
        "traditional Thai kitchen, wok station with steam rising, warm terracotta tiles",
        "minimalist Japanese izakaya counter, warm lantern glow, clean wooden bar top",
        "bright breakfast nook by a window, morning sunlight streaming in, fresh flowers on table",
        "night market stall, warm string lights overhead, bustling street food atmosphere",
        "rooftop dining terrace, city skyline at golden hour, elegant outdoor table setting"
    ],
    beverage: [
        "trendy café counter with espresso machine, latte art visible, rustic wood surface",
        "rooftop bar terrace at sunset, city skyline backdrop, elegant cocktail setting",
        "bright juice bar with colorful fruit display, clean white counter, fresh tropical vibe",
        "cozy living room coffee table, morning light streaming in, warm homey atmosphere",
        "outdoor garden tea setup, bamboo tray, natural greenery, serene afternoon light",
        "modern bubble tea shop interior, neon signs, pastel décor, youthful energy",
        "luxury hotel lounge, marble table, ambient warm lighting, premium drink setting",
        "night market drink stall, warm string lights, bustling street atmosphere",
        "minimalist Japanese tea room, tatami mat, wooden low table, zen calm",
        "beach bar counter, ocean view, sunset glow, tropical vacation vibe"
    ],
    beauty: [
        "elegant vanity counter with round mirror, soft ring-light glow, marble surface",
        "luxury bathroom counter, white marble with gold fixtures, spa-like atmosphere",
        "professional beauty salon station, well-lit mirror, sleek modern décor",
        "minimalist Scandinavian dresser, natural wood, soft diffused window light",
        "pink-toned boudoir setup, velvet textures, soft glamorous lighting",
        "clean white studio with floating shelves, premium product display, editorial feel",
        "chic boutique vanity, art deco mirror, warm rose-gold accents",
        "tropical spa setting, bamboo accents, natural stone surface, zen atmosphere",
        "modern Korean-style beauty room, pastel tones, neon accent light, clean aesthetic",
        "luxury hotel bathroom, large backlit mirror, premium amenities, warm ambient light"
    ],
    gadget: [
        "modern tech workspace with dual monitors, clean cable management, dark desk surface",
        "minimalist white desk setup, single plant accent, soft overhead LED panel",
        "gaming setup with RGB accent lighting, dark room, neon glow on product",
        "sleek coffee shop table, laptop lifestyle scene, natural window light",
        "industrial loft workspace, exposed brick, Edison bulb hanging, rustic-modern desk",
        "clean home office with bookshelf background, warm desk lamp, organized setup",
        "futuristic dark studio with blue LED strips, tech-forward atmosphere, matte surfaces",
        "co-working space with modern furniture, bright open layout, professional vibe",
        "bedside nightstand setup, cozy bedroom tech scene, soft warm lamp light",
        "outdoor urban bench, city street background, casual tech lifestyle setting"
    ],
    fashion: [
        "trendy urban street with graffiti wall, natural daylight, street-style setting",
        "clean white photography studio, seamless backdrop, professional fashion shoot feel",
        "modern boutique interior, clothing racks in background, warm spotlight",
        "rooftop terrace with city view, golden hour light, stylish outdoor setting",
        "vintage café storefront, European aesthetic, cobblestone sidewalk, warm tones",
        "modern loft apartment, floor-to-ceiling windows, industrial-chic interior",
        "botanical garden pathway, lush greenery backdrop, natural soft light",
        "shopping district walkway, glass storefronts, vibrant urban energy",
        "beach boardwalk, ocean horizon, natural wind and sunlight, casual resort vibe",
        "art gallery interior, white walls with abstract art, sophisticated minimal space"
    ],
    supplement: [
        "modern gym interior, dumbbells and weight racks in background, people exercising in the distance, bright motivational lighting, athletic atmosphere",
        "gym floor with squat rack and bench press, fit people training in background, energetic sporty atmosphere, high-energy environment",
        "professional fitness center, treadmills and exercise machines visible, athletic people working out behind, clean modern gym lighting",
        "CrossFit-style gym, barbell plates and kettlebells, people doing exercises in background, raw industrial fitness energy",
        "gym locker room bench, post-workout scene with gym equipment visible in background, energetic sporty atmosphere",
        "modern supplement store inside gym, protein shelf display, gym-goers in background, fitness-forward environment",
        "outdoor calisthenics park, pull-up bars and workout stations, athletic people exercising, bright natural sunlight",
        "boxing gym with heavy bags, fit people sparring in background, intense focused atmosphere, motivational energy"
    ],
    pet: [
        "cozy living room floor with pet bed, warm ambient light, homey atmosphere",
        "bright outdoor park with green grass, natural sunlight, playful open space",
        "modern pet shop interior, colorful shelves, cheerful clean display",
        "home backyard with garden, fence in background, comfortable pet-friendly space",
        "veterinary clinic lobby, clean bright waiting area, trustworthy professional setting",
        "sunny apartment balcony with pet toys, urban pet lifestyle, natural daylight"
    ],
    baby: [
        "soft pastel nursery room, crib in background, gentle diffused window light",
        "bright playroom with colorful mats, safe rounded furniture, cheerful atmosphere",
        "cozy bedroom with plush toys, warm lamp glow, nurturing calm environment",
        "modern baby store display, organized clean shelves, professional retail setting",
        "outdoor park picnic blanket, gentle sunlight, family-friendly greenery backdrop",
        "clean white studio with soft pastel props, baby-safe minimalist setting"
    ],
    home: [
        "modern living room with neutral décor, large windows, warm ambient afternoon light",
        "Scandinavian-style apartment, light wood floors, white walls, clean airy feel",
        "cozy bedroom with soft bedding, warm reading lamp, relaxing evening atmosphere",
        "bright open-plan kitchen and living area, natural daylight flooding in",
        "elegant dining room with centerpiece, warm chandelier glow, family gathering feel",
        "minimalist home office corner, organized shelf, productive comfortable space",
        "outdoor patio with potted plants, sunset glow, relaxed homey terrace",
        "modern bathroom with fresh towels, clean tiles, spa-like comfort"
    ],
    kitchen: [
        "bright modern kitchen with island counter, stainless steel appliances, warm overhead light",
        "rustic farmhouse kitchen, wooden cutting board, copper pots, cozy cooking atmosphere",
        "professional chef kitchen, commercial equipment, clean steel surfaces, restaurant quality",
        "outdoor BBQ station, grill with smoke rising, backyard party setting",
        "compact apartment kitchen, organized utensils, efficient cozy cooking space",
        "open kitchen with bar stools, social cooking scene, warm family atmosphere",
        "Thai home kitchen with wok station, fresh herbs, traditional cooking ambiance"
    ],
    fitness: [
        "modern gym floor with dumbbells and weight machines, fit people exercising in background, bright overhead lighting, motivational athletic space",
        "professional fitness center, squat rack and bench press area, athletic people training in background, energetic gym atmosphere",
        "CrossFit box gym, raw concrete walls, barbell plates visible, people doing WOD in background, industrial fitness energy",
        "boxing gym with heavy bags, fit people sparring in background, intense focused atmosphere, motivational energy",
        "outdoor running track with athletes, morning sunlight, sporty competitive atmosphere",
        "gym free-weight area, mirror wall, muscular people lifting in background, high-energy fitness environment"
    ],
    auto: [
        "clean garage workshop, organized tools on wall, professional automotive setting",
        "outdoor parking lot with car, city background, urban driving lifestyle",
        "showroom floor, polished concrete, dramatic spotlights on vehicle",
        "roadside scenic overlook, mountain or coastal view, adventure driving mood",
        "modern car interior dashboard view, clean leather seats, premium cabin feel",
        "gas station or car wash, practical everyday automotive scene"
    ],
    jewelry: [
        "dark velvet display surface, single spotlight, luxury showcase atmosphere",
        "elegant vanity mirror setup, soft warm lighting, feminine luxury feel",
        "modern jewelry store counter, glass display case, premium retail setting",
        "white marble surface with fresh flowers, bright natural light, editorial elegance",
        "romantic candlelit dinner table, soft bokeh lights, special occasion mood",
        "minimalist dark studio, dramatic single light source, high-end product photography"
    ],
    watch: [
        "dark leather desk surface, vintage map in background, masculine sophisticated feel",
        "modern executive office desk, clean surface, professional luxury atmosphere",
        "watch display stand on marble, dramatic side lighting, horological showcase",
        "outdoor urban setting, wrist visible with cityscape, lifestyle luxury feel",
        "minimalist dark studio, single spotlight, premium product photography mood",
        "luxury car interior, steering wheel visible, premium lifestyle integration"
    ],
    bag: [
        "trendy urban street corner, natural daylight, fashion-forward city backdrop",
        "modern boutique interior, clean shelving display, warm retail spotlight",
        "airport lounge, travel lifestyle setting, sophisticated professional atmosphere",
        "outdoor café terrace, European aesthetic, casual chic lifestyle scene",
        "clean white fashion studio, seamless backdrop, editorial product showcase",
        "office reception area, modern furniture, professional daily-use setting"
    ],
    shoe: [
        "clean concrete sidewalk, urban street-level angle, natural daylight",
        "modern shoe store display, organized rack, clean retail spotlighting",
        "outdoor running trail, natural scenery, active sporty atmosphere",
        "trendy urban staircase, graffiti wall, street-style fashion backdrop",
        "gym floor with exercise equipment, sporty energetic environment",
        "clean white studio, seamless backdrop, professional shoe photography"
    ],
    book: [
        "cozy reading nook with bookshelves, warm lamp light, intellectual atmosphere",
        "trendy café table with coffee cup, soft afternoon light, relaxed reading scene",
        "modern library interior, organized shelves, quiet studious ambiance",
        "outdoor park bench under a tree, natural dappled sunlight, peaceful reading",
        "minimalist desk with notebook, clean workspace, productive study mood",
        "bookstore interior, stacked shelves, warm inviting literary atmosphere"
    ],
    toy: [
        "bright colorful playroom, soft foam floor, cheerful kid-friendly setting",
        "living room floor with play mat, natural daylight, family home atmosphere",
        "outdoor playground, green grass, sunny day, fun energetic backdrop",
        "modern toy store shelf, organized colorful display, retail excitement",
        "bedroom floor with pillows, warm cozy light, imaginative play setting",
        "birthday party table setup, balloons and decorations, festive joyful scene"
    ],
    stationery: [
        "clean minimalist desk, organized supplies, soft natural window light",
        "trendy café table, notebook open, creative aesthetic workspace",
        "modern office desk with laptop, professional organized setting",
        "art studio worktable, creative tools around, warm inspirational atmosphere",
        "home study desk with bookshelf, focused productive environment",
        "bullet journal flat-lay surface, aesthetic arrangement, natural overhead light"
    ],
    cleaning: [
        "bright modern kitchen counter, clean sparkling surface, fresh hygienic feel",
        "bathroom with white tiles, organized cleaning supplies, spotless professional look",
        "laundry room with washing machine, organized detergents, practical home setting",
        "living room being cleaned, before-after contrast visible, real home environment",
        "commercial office space, professional cleaning scene, corporate hygiene standard",
        "outdoor deck or patio, power washing scene, satisfying clean transformation"
    ],
    outdoor: [
        "mountain trail overlook, panoramic nature view, golden hour adventure light",
        "lakeside campsite, tent and campfire, serene wilderness atmosphere",
        "beach with surfboard, ocean waves, tropical outdoor lifestyle",
        "forest hiking path, tall trees, dappled natural sunlight, adventure mood",
        "riverside picnic spot, kayak visible, fresh air outdoor recreation",
        "rooftop camping setup, city skyline, urban outdoor adventure blend"
    ],
    health: [
        "clean medical office, white surfaces, professional trustworthy atmosphere",
        "bright pharmacy counter, organized health products, clinical retail setting",
        "home bathroom medicine cabinet, clean organized wellness space",
        "modern wellness center lobby, calm zen décor, health-forward environment",
        "yoga or meditation studio, natural light, holistic health atmosphere",
        "hospital or clinic corridor, clean professional medical setting"
    ],
    craft: [
        "rustic wooden workshop table, hand tools visible, artisan creative atmosphere",
        "bright craft studio with supplies, natural window light, inspirational workspace",
        "outdoor art fair booth, handmade displays, colorful creative market",
        "home crafting corner, organized materials, cozy DIY environment",
        "pottery studio with wheel, clay textures, earthy creative ambiance",
        "sewing room with fabric rolls, vintage machine, warm artisan feel"
    ],
    digital: [
        "modern co-working space, multiple screens, tech-forward professional setting",
        "home office with ultrawide monitor, clean desk setup, focused digital workspace",
        "trendy startup office, whiteboard in background, innovative creative vibe",
        "café laptop lifestyle scene, natural window light, digital nomad atmosphere",
        "gaming room with RGB lighting, dark ambient, tech entertainment setting",
        "library study room with tablet, quiet focused digital learning environment"
    ],
    other: [
        "clean white studio with soft gradient background, professional product showcase",
        "modern living room with neutral décor, warm ambient lighting, lifestyle feel",
        "outdoor patio with potted plants, natural sunlight, relaxed homey atmosphere",
        "minimalist concrete surface, dark moody studio, dramatic single spotlight",
        "bright airy workspace with large windows, natural light flooding in",
        "cozy reading nook with bookshelves, warm lamp light, inviting atmosphere",
        "urban rooftop setting, city skyline backdrop, golden hour warmth",
        "Scandinavian-style room, light wood, white walls, clean modern aesthetic",
        "professional conference-style setting, sleek table, corporate modern look",
        "night scene with warm string lights, outdoor terrace, ambient evening glow"
    ]
};

// Category-specific lighting enhancement — supplements tone-based lighting
const CATEGORY_LIGHTING: Record<ProductCategory, string> = {
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
const TEMPLATE_CATEGORY_MATCH: Record<ProductCategory, string[]> = {
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

/** Smart environment selection: category overrides template when mismatched */
const getSmartEnvironment = (
    template: string,
    category: ProductCategory,
    aiEnvironment?: string
): string => {
    // AI Vision analysis always wins
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
    const categoryLighting = CATEGORY_LIGHTING[category];
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
    "trending": "TikTok viral aesthetic, vertical framing, zero lens distortion, trendy transitions, punchy color grading, high frame rate",
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

// Voiceover age mapping by tone (fallback when ageRange not specified)
const VOICEOVER_AGE: Record<string, string> = {
    "energetic": "20s",
    "calm": "30s",
    "friendly": "mid-20s",
    "professional": "30s",
    "cute": "early-20s"
};

// Detailed voice fingerprint per tone (pitch, tempo, resonance, breath)
const VOICEOVER_FINGERPRINT: Record<string, {
    personality: string;
    pitch: string;
    tempo: string;
    resonance: string;
    breath: string;
}> = {
    "energetic": {
        personality: "energetic and enthusiastic tone",
        pitch: "medium-high pitch (220–280 Hz)",
        tempo: "fast-paced delivery, ~160 WPM, sharp clear consonants",
        resonance: "bright chest resonance, forward placement",
        breath: "short controlled breaths between phrases"
    },
    "calm": {
        personality: "calm and soothing tone",
        pitch: "medium-low pitch (150–190 Hz)",
        tempo: "slow deliberate delivery, ~100 WPM, smooth legato flow",
        resonance: "warm deep resonance, relaxed throat",
        breath: "long steady breath support, gentle pauses"
    },
    "friendly": {
        personality: "friendly and warm tone",
        pitch: "medium pitch (180–230 Hz)",
        tempo: "natural conversational delivery, ~130 WPM, light upward inflections",
        resonance: "warm mid resonance, slight smile in voice",
        breath: "relaxed natural breaths, conversational rhythm"
    },
    "professional": {
        personality: "professional and confident tone",
        pitch: "medium pitch (170–210 Hz), stable and controlled",
        tempo: "clear precise delivery, ~120 WPM, strong consonants",
        resonance: "authoritative chest resonance, neutral placement",
        breath: "measured breath pacing, deliberate pauses"
    },
    "cute": {
        personality: "cute and cheerful tone with playful energy",
        pitch: "high pitch (240–300 Hz), light and bright",
        tempo: "upbeat bouncy delivery, ~140 WPM, playful inflections",
        resonance: "bright nasal-forward resonance, youthful sparkle",
        breath: "quick light breaths, bubbly rhythm"
    }
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
        // ── ENERGETIC (3 variants) ──
        { name: "Tawan",   voiceTone: "energetic",    ageRange: "teen",         age: "18",      characterType: "วัยรุ่นหนุ่มผอมสูง ผมสั้นสไตล์เกาหลี สปอร์ตบอย นักเรียนมัธยม" },
        { name: "First",   voiceTone: "energetic",    ageRange: "young-adult",  age: "24",      characterType: "หนุ่มฟิตหุ่นล่ำ นักกีฬา/ฟิตเนส ผิวแทน กล้ามชัด พลังงานสูง" },
        { name: "Fluke",   voiceTone: "energetic",    ageRange: "adult",        age: "35",      characterType: "ผู้ชายวัยทำงานแอคทีฟ หุ่นแข็งแรง พิธีกร/นักรีวิว พลังงานเหลือเฟือ" },
        // ── CALM (3 variants) ──
        { name: "Prem",    voiceTone: "calm",         ageRange: "young-adult",  age: "27",      characterType: "หนุ่มสุภาพเรียบร้อย ผมยาวเล็กน้อย ใส่แว่น หน้าตาอ่อนโยน นักอ่าน" },
        { name: "Pond",    voiceTone: "calm",         ageRange: "adult",        age: "40",      characterType: "ผู้ชายวัยกลางคน สุขุม ผมเกรียน ใบหน้าคม สง่า แพทย์/ที่ปรึกษา" },
        { name: "Suthep",  voiceTone: "calm",         ageRange: "middle-age",   age: "55",      characterType: "ลุงใจดี ผมหงอกเล็กน้อย ท่าทางสุขุม ปราชญ์/ครูบาอาจารย์" },
        // ── FRIENDLY (3 variants) ──
        { name: "Somsak",  voiceTone: "friendly",     ageRange: "teen",         age: "17",      characterType: "เด็กหนุ่มข้างบ้าน ยิ้มง่าย ผมตั้ง เสื้อยืดกางเกงยีนส์ เป็นกันเอง" },
        { name: "Bank",    voiceTone: "friendly",     ageRange: "young-adult",  age: "26",      characterType: "หนุ่มออฟฟิศ อบอุ่น ใส่เสื้อเชิ้ตพับแขน ยิ้มหวาน พ่อค้าออนไลน์" },
        { name: "Chai",    voiceTone: "friendly",     ageRange: "adult",        age: "38",      characterType: "คุณพ่อยุคใหม่ หุ่นท้วมนิดๆ ใจดี อบอุ่น บล็อกเกอร์ครอบครัว" },
        // ── PROFESSIONAL (3 variants) ──
        { name: "Natt",    voiceTone: "professional", ageRange: "young-adult",  age: "28",      characterType: "หนุ่มสตาร์ทอัพ สูทสลิมฟิต ผมเซ็ต ดูดีมีระดับ CEO รุ่นใหม่" },
        { name: "Arthit",  voiceTone: "professional", ageRange: "adult",        age: "42",      characterType: "ผู้บริหาร สูทสากล ท่าทางมั่นใจ น่าเชื่อถือ ผู้เชี่ยวชาญ" },
        { name: "Somchai", voiceTone: "professional", ageRange: "middle-age",   age: "52",      characterType: "ผู้ใหญ่มากประสบการณ์ ผมขาวเท่ มาดนิ่ง กูรู/ที่ปรึกษาอาวุโส" },
        // ── CUTE (3 variants) ──
        { name: "Beam",    voiceTone: "cute",         ageRange: "teen",         age: "16",      characterType: "เด็กหนุ่มหน้าใส ตาโต ผมปัด น่ารักสดใส ไอดอลวัยรุ่น" },
        { name: "Win",     voiceTone: "cute",         ageRange: "young-adult",  age: "23",      characterType: "ซอฟท์บอย ผิวขาว หน้าหวาน เสื้อผ้าพาสเทล อินฟลูเอนเซอร์" },
        { name: "Ohm",     voiceTone: "cute",         ageRange: "adult",        age: "33",      characterType: "ผู้ชายเสน่ห์แรง ยิ้มมีเสน่ห์ ลุคชิลล์ ดูดีแบบไม่ต้องพยายาม" },
    ],
    female: [
        // ── ENERGETIC (3 variants) ──
        { name: "Fah",     voiceTone: "energetic",    ageRange: "teen",         age: "18",      characterType: "สาววัยรุ่นไฟแรง ผมหางม้า ชุดสปอร์ต สดใสร่าเริง เชียร์ลีดเดอร์" },
        { name: "Mint",    voiceTone: "energetic",    ageRange: "young-adult",  age: "25",      characterType: "สาวฟิตเนส หุ่นดี ผิวสุขภาพดี กระฉับกระเฉง ยูทูบเบอร์ไลฟ์สไตล์" },
        { name: "Pat",     voiceTone: "energetic",    ageRange: "adult",        age: "35",      characterType: "ผู้หญิงแกร่ง พิธีกร/นักรีวิว พลังเยอะ แต่งตัวจัดจ้าน มีออร่า" },
        // ── CALM (3 variants) ──
        { name: "Namwan",  voiceTone: "calm",         ageRange: "young-adult",  age: "26",      characterType: "สาวเรียบร้อย ผมยาวตรง ใบหน้าอ่อนหวาน แต่งตัวมินิมอล สุภาพ" },
        { name: "Noon",    voiceTone: "calm",         ageRange: "adult",        age: "38",      characterType: "ผู้หญิงสง่า ผมประบ่า มาดสุขุม แพทย์/นักจิตวิทยา น่าไว้วางใจ" },
        { name: "Aree",    voiceTone: "calm",         ageRange: "middle-age",   age: "50",      characterType: "คุณป้าสง่างาม ผมสั้นเรียบร้อย ท่าทางอบอุ่น ครู/ที่ปรึกษาอาวุโส" },
        // ── FRIENDLY (3 variants) ──
        { name: "Somying", voiceTone: "friendly",     ageRange: "teen",         age: "17",      characterType: "สาวน้อยข้างบ้าน ยิ้มสดใส แก้มแดง เสื้อยืดน่ารัก เป็นกันเอง" },
        { name: "Pear",    voiceTone: "friendly",     ageRange: "young-adult",  age: "27",      characterType: "สาวออฟฟิศอบอุ่น ใส่เสื้อผ้าแคชชวล ยิ้มเก่ง แม่ค้าออนไลน์" },
        { name: "Nong",    voiceTone: "friendly",     ageRange: "adult",        age: "40",      characterType: "คุณแม่ยุคใหม่ หน้าตาดี อบอุ่น ห่วงใย บล็อกเกอร์ครอบครัว" },
        // ── PROFESSIONAL (3 variants) ──
        { name: "Ploy",    voiceTone: "professional", ageRange: "young-adult",  age: "28",      characterType: "สาวมั่น สูทสวย ผมเก็บมวย ดูดีมีระดับ ผู้ก่อตั้งสตาร์ทอัพ" },
        { name: "Kwan",    voiceTone: "professional", ageRange: "adult",        age: "42",      characterType: "ผู้บริหารหญิง สง่า น่าเชื่อถือ เสื้อผ้าเนี้ยบ ผู้เชี่ยวชาญ" },
        { name: "Suda",    voiceTone: "professional", ageRange: "middle-age",   age: "53",      characterType: "ผู้หญิงมากประสบการณ์ สง่างาม ผมสั้นทรงผู้ดี กูรู/ศาสตราจารย์" },
        // ── CUTE (3 variants) ──
        { name: "Minnie",  voiceTone: "cute",         ageRange: "teen",         age: "16",      characterType: "สาวน้อยหน้าใส ตากลมโต ผมสองข้าง ชุดน่ารักพาสเทล ไอดอล" },
        { name: "Ice",     voiceTone: "cute",         ageRange: "young-adult",  age: "22",      characterType: "สาวหวาน ผิวขาว ผมยาว แต่งตัวน่ารัก อินฟลูเอนเซอร์บิวตี้" },
        { name: "Jiew",    voiceTone: "cute",         ageRange: "adult",        age: "32",      characterType: "ผู้หญิงเสน่ห์แรง หน้าเด็ก ยิ้มหวาน ดูอ่อนกว่าวัย มีเสน่ห์" },
    ]
};

/**
 * Lookup persona by gender + voiceTone + ageRange (with smart fallback).
 * Priority: exact match → same tone any age → same age any tone → first of tone.
 */
function getPersona(gender: string, voiceTone: string, ageRange?: string): VoicePersona {
    const genderKey = gender === 'male' ? 'male' : 'female';
    const pool = VOICE_PERSONA_DB[genderKey];

    // 1. Exact match: tone + ageRange
    if (ageRange) {
        const exact = pool.find(p => p.voiceTone === voiceTone && p.ageRange === ageRange);
        if (exact) return exact;
    }

    // 2. Same tone, any age (pick first = youngest variant)
    const sameTone = pool.find(p => p.voiceTone === voiceTone);
    if (sameTone) return sameTone;

    // 3. Fallback: friendly young-adult
    return pool.find(p => p.voiceTone === 'friendly') || pool[0];
}

// Legacy compat: simple name lookup by gender+tone (returns first match)
const VOICE_PERSONA: Record<string, Record<string, string>> = {
    male: Object.fromEntries(VOICE_PERSONA_DB.male.filter((p, i, arr) => arr.findIndex(x => x.voiceTone === p.voiceTone) === i).map(p => [p.voiceTone, p.name])),
    female: Object.fromEntries(VOICE_PERSONA_DB.female.filter((p, i, arr) => arr.findIndex(x => x.voiceTone === p.voiceTone) === i).map(p => [p.voiceTone, p.name]))
};

/**
 * Build a FIXED speaking-character descriptor for video generation.
 * 
 * IMPORTANT: Google Veo generates SILENT video — it cannot produce audio.
 * This descriptor guides VISUAL speaking behavior only (mouth movement, expression, gestures).
 * Do NOT include audio-specific terms (pitch Hz, tempo WPM, resonance, breath patterns)
 * as they confuse the video model and may trigger content policy errors.
 * Do NOT use the phrase "lip sync" — it gets truncated to "Lip." triggering safety filters.
 */
const buildVoiceoverDescriptor = (gender: string, voiceTone: string, ageRange?: string): string => {
    const genderWord = gender === 'male' ? 'Thai male' : 'Thai female';
    const persona = getPersona(gender, voiceTone, ageRange);

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
const FACE_IDENTITY_LOCK = "CHARACTER REFERENCE: Use the attached reference photo ONLY as style inspiration for an ORIGINAL ANONYMOUS fictional character. Preserve the general facial aesthetic, hair style, and skin tone from the reference. This is NOT a real person — create a unique, original character that captures a similar visual style. Same consistent fictional character in every frame. Do not replicate any real celebrity or public figure.";

// Anti-Text Directive — strongest possible anti-text/font rendering prevention
const ANTI_TEXT_DIRECTIVE = "STRICTLY NO TEXT IN ANY FRAME: no subtitles, no captions, no watermarks, no typography, no floating text, no on-screen graphics, no Thai characters, no gibberish fonts, no signage, no banners, no logos, no UI elements. Every frame must be a clean visual with zero text of any kind. Shot on 85mm lens, shallow depth of field, natural environment.";

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY-SPECIFIC GRIP + CONTACT PHYSICS (20 subcategories in 5 groups)
// Prevents mangled hands, floating products, and unnatural interactions
// ═══════════════════════════════════════════════════════════════════════════

// Per-category: HOW presenter holds/touches the product (anatomical constraints)
const PRODUCT_GRIP_CONTACT: Record<ProductCategory, string> = {
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
const PRODUCT_PHYSICS_SHADOW: Record<ProductCategory, string> = {
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

/** Build category-specific contact + physics directive */
const buildContactPhysicsDirective = (category: ProductCategory): string => {
    return `${PRODUCT_GRIP_CONTACT[category]} ${PRODUCT_PHYSICS_SHADOW[category]}`;
};

// Anti-Distortion directive — injected into all image prompts
const ANTI_DISTORTION_DIRECTIVE = "PRODUCT ACCURACY: Frontal eye-level shot, perfectly centered, symmetrical composition. Shot on 85mm lens, f/8 aperture, zero lens distortion. High-end product photography, no perspective warping. Preserve original packaging design, labels, and branding exactly as shown in the reference image.";

// Brand & Policy Safety — words to auto-sanitize from prompts
const BRAND_REPLACEMENTS: [RegExp, string][] = [
    // Tech brands
    [/\biphone\b/gi, "premium smartphone"],
    [/\bsamsung\b/gi, "flagship device"],
    [/\bapple\b(?!\s*(cider|juice|pie|fruit))/gi, "premium tech brand"],
    [/\bgoogle\b/gi, "major tech platform"],
    [/\bhuawei\b/gi, "flagship smartphone"],
    [/\bxiaomi\b/gi, "popular smartphone"],
    [/\boppo\b/gi, "stylish smartphone"],
    // Athletic/Fashion brands
    [/\bnike\b/gi, "athletic brand"],
    [/\badidas\b/gi, "sportswear brand"],
    [/\bgucci\b/gi, "luxury fashion brand"],
    [/\blouis vuitton\b/gi, "luxury brand"],
    [/\bchanel\b/gi, "high-end fashion brand"],
    [/\brolex\b/gi, "luxury watch brand"],
    [/\bprada\b/gi, "luxury fashion brand"],
    [/\bhermes\b/gi, "luxury brand"],
    [/\bdior\b/gi, "luxury fashion brand"],
    [/\bbalenciaga\b/gi, "designer fashion brand"],
    [/\bzara\b/gi, "fashion brand"],
    [/\buniqlo\b/gi, "casual fashion brand"],
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
    // Social platforms
    [/\btiktok\b/gi, "short video platform"],
    [/\binstagram\b/gi, "social media platform"],
    [/\bfacebook\b/gi, "social network"],
    [/\byoutube\b/gi, "video platform"],
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
    "infographic", "presentation slide", "YouTube style", "TikTok overlay",
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

/** Sanitize brand names and policy-unsafe keywords from a prompt.
 *  If productName is provided, it will be preserved as-is (not sanitized).
 *  This is important because the user's product name IS the brand they're selling.
 */
const sanitizePromptForPolicy = (text: string, productName?: string): string => {
    let result = text;
    // Protect user's product name from brand replacement
    const placeholder = "___PRODUCT_NAME_PRESERVE___";
    if (productName) {
        result = result.replace(new RegExp(productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), placeholder);
    }
    for (const [pattern, replacement] of BRAND_REPLACEMENTS) {
        result = result.replace(pattern, replacement);
    }
    for (const word of POLICY_UNSAFE_WORDS) {
        const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp(escaped, 'gi');
        result = result.replace(re, '');
    }
    // ★ Strip "looks like [Name]", "resembles [Name]", "similar to [Name]" patterns
    result = result.replace(/(?:looks?\s+like|resembles?|similar\s+to|inspired\s+by|based\s+on|same\s+as|identical\s+to)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3}/g, '');
    // ★ Strip "[Name]-like" patterns (e.g., "Lisa-like", "Jennie-style")
    result = result.replace(/[A-Z][a-z]+(?:-like|-style|-inspired|-esque)/g, '');
    // Restore product name
    if (productName) {
        result = result.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), productName);
    }
    // Deduplicate repeated SENTENCES only (split on ". " not "," to preserve structure)
    const sentences = result.split(/(?<=\.)\s+/).map(s => s.trim()).filter(Boolean);
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

type ProductCategory =
    | "food" | "beverage" | "fashion" | "gadget" | "beauty"
    | "supplement" | "pet" | "baby" | "home" | "kitchen"
    | "fitness" | "auto" | "jewelry" | "watch" | "bag"
    | "shoe" | "book" | "toy" | "stationery" | "cleaning"
    | "outdoor" | "health" | "craft" | "digital" | "other";

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

    // Template-driven overrides
    if (template === "food-review") return "food";
    if (template === "fashion-review") return "fashion";
    if (template === "gadget-review") return "gadget";

    // ── Specific sub-categories first (before broader parent categories) ──

    // Jewelry (before fashion/beauty)
    if (includesAny(t, [
        "jewelry", "jewellery", "necklace", "bracelet", "ring", "earring", "pendant", "gemstone", "diamond", "gold chain",
        "เครื่องประดับ", "สร้อยคอ", "สร้อยข้อมือ", "แหวน", "ต่างหู", "จี้", "อัญมณี", "เพชร", "ทอง"
    ])) return "jewelry";

    // Watch (before gadget)
    if (includesAny(t, [
        "watch", "wristwatch", "timepiece", "horology", "chronograph", "smartwatch",
        "นาฬิกา", "นาฬิกาข้อมือ", "สมาร์ทวอทช์"
    ])) return "watch";

    // Shoe (before fashion)
    if (includesAny(t, [
        "shoe", "shoes", "sneaker", "sneakers", "boot", "boots", "sandal", "sandals", "slipper", "running shoe",
        "รองเท้า", "สนีกเกอร์", "บูท", "รองเท้าแตะ", "รองเท้าวิ่ง", "รองเท้ากีฬา"
    ])) return "shoe";

    // Bag (before fashion)
    if (includesAny(t, [
        "bag", "handbag", "backpack", "tote", "clutch", "wallet", "purse", "luggage", "suitcase", "crossbody",
        "กระเป๋า", "กระเป๋าสะพาย", "กระเป๋าเป้", "กระเป๋าถือ", "กระเป๋าเดินทาง", "กระเป๋าสตางค์"
    ])) return "bag";

    // Beverage (before food)
    if (includesAny(t, [
        "drink", "beverage", "tea", "coffee", "milk", "juice", "soda", "cola", "matcha", "smoothie", "wine", "beer",
        "cocktail", "water", "energy drink", "protein shake", "bubble tea", "boba",
        "เครื่องดื่ม", "ชา", "กาแฟ", "นม", "น้ำผลไม้", "น้ำอัดลม", "มัทฉะ", "ชานมไข่มุก", "น้ำ", "เบียร์", "ไวน์"
    ])) return "beverage";

    // Supplement (before health/food)
    if (includesAny(t, [
        "supplement", "vitamin", "protein", "collagen", "probiotic", "omega", "fish oil", "whey", "bcaa", "creatine",
        "multivitamin", "calcium", "zinc", "biotin", "glutathione",
        "อาหารเสริม", "วิตามิน", "โปรตีน", "คอลลาเจน", "โพรไบโอติก", "น้ำมันปลา", "กลูตาไธโอน", "แคลเซียม"
    ])) return "supplement";

    // Baby (before home)
    if (includesAny(t, [
        "baby", "infant", "toddler", "newborn", "diaper", "pacifier", "stroller", "baby bottle", "baby food",
        "เด็ก", "ทารก", "ผ้าอ้อม", "จุกนม", "รถเข็นเด็ก", "ขวดนม", "อาหารเด็ก", "แม่และเด็ก"
    ])) return "baby";

    // Pet
    if (includesAny(t, [
        "pet", "dog", "cat", "puppy", "kitten", "pet food", "pet toy", "collar", "leash", "aquarium",
        "สัตว์เลี้ยง", "หมา", "แมว", "สุนัข", "อาหารสัตว์", "ปลอกคอ", "สายจูง", "ตู้ปลา"
    ])) return "pet";

    // Fitness (before fashion)
    if (includesAny(t, [
        "fitness", "gym", "workout", "exercise", "dumbbell", "yoga mat", "resistance band", "kettlebell",
        "treadmill", "sports", "athletic",
        "ฟิตเนส", "ออกกำลังกาย", "ยิม", "ดัมเบล", "เสื่อโยคะ", "ยางยืด", "กีฬา"
    ])) return "fitness";

    // Auto
    if (includesAny(t, [
        "car", "auto", "automotive", "vehicle", "motorcycle", "motorbike", "tire", "engine", "dash cam",
        "car accessories", "gps", "car charger",
        "รถยนต์", "รถ", "มอเตอร์ไซค์", "ยาง", "กล้องติดรถ", "อุปกรณ์รถ", "น้ำมันเครื่อง"
    ])) return "auto";

    // Kitchen (before home)
    if (includesAny(t, [
        "kitchen", "cookware", "pan", "pot", "wok", "knife", "blender", "air fryer", "rice cooker",
        "cutting board", "spatula", "oven",
        "เครื่องครัว", "กระทะ", "หม้อ", "มีด", "เขียง", "เตาอบ", "หม้อทอดไร้น้ำมัน", "หม้อหุงข้าว"
    ])) return "kitchen";

    // Cleaning
    if (includesAny(t, [
        "cleaning", "cleaner", "detergent", "soap", "disinfectant", "mop", "broom", "vacuum",
        "laundry", "fabric softener", "bleach",
        "ทำความสะอาด", "น้ำยา", "ผงซักฟอก", "สบู่", "ไม้ถูพื้น", "เครื่องดูดฝุ่น", "น้ำยาปรับผ้านุ่ม"
    ])) return "cleaning";

    // Book
    if (includesAny(t, [
        "book", "novel", "manga", "comic", "textbook", "ebook", "audiobook", "journal", "diary",
        "หนังสือ", "นิยาย", "มังงะ", "การ์ตูน", "ตำรา", "ไดอารี่", "สมุดบันทึก"
    ])) return "book";

    // Toy
    if (includesAny(t, [
        "toy", "toys", "lego", "action figure", "board game", "puzzle", "plush", "doll", "rc car",
        "ของเล่น", "เลโก้", "ตุ๊กตา", "บอร์ดเกม", "จิ๊กซอว์", "โมเดล"
    ])) return "toy";

    // Stationery
    if (includesAny(t, [
        "stationery", "pen", "pencil", "notebook", "planner", "marker", "highlighter", "eraser",
        "ruler", "sticky note", "washi tape",
        "เครื่องเขียน", "ปากกา", "ดินสอ", "สมุด", "แพลนเนอร์", "ไฮไลท์", "ยางลบ", "เทปวาชิ"
    ])) return "stationery";

    // Outdoor
    if (includesAny(t, [
        "outdoor", "camping", "tent", "hiking", "backpacking", "sleeping bag", "flashlight", "compass",
        "fishing", "hammock", "camp stove",
        "แคมปิ้ง", "เต็นท์", "เดินป่า", "ถุงนอน", "ไฟฉาย", "ตกปลา", "เปลญวน", "เอาท์ดอร์"
    ])) return "outdoor";

    // Health (before beauty — medical devices, not cosmetics)
    if (includesAny(t, [
        "health", "medical", "thermometer", "blood pressure", "oximeter", "first aid", "bandage",
        "mask", "face mask", "sanitizer",
        "สุขภาพ", "เครื่องวัดความดัน", "เทอร์โมมิเตอร์", "ปฐมพยาบาล", "ผ้าปิดแผล", "หน้ากาก", "เจลล้างมือ"
    ])) return "health";

    // Craft
    if (includesAny(t, [
        "craft", "diy", "handmade", "knitting", "crochet", "sewing", "embroidery", "resin",
        "pottery", "clay", "candle making",
        "งานฝีมือ", "ถักโครเชต์", "ถักนิตติ้ง", "เย็บปักถักร้อย", "เรซิน", "ปั้นดิน", "ทำเทียน", "แฮนด์เมด"
    ])) return "craft";

    // Digital
    if (includesAny(t, [
        "digital", "software", "app", "online course", "subscription", "saas", "template", "preset",
        "plugin", "license", "ebook",
        "ดิจิทัล", "ซอฟต์แวร์", "แอป", "คอร์สออนไลน์", "เทมเพลต", "พรีเซ็ต", "ปลั๊กอิน"
    ])) return "digital";

    // ── Broad parent categories (checked after specific sub-categories) ──

    // Food (broad)
    if (includesAny(t, [
        "food", "snack", "chips", "cookie", "chocolate", "cake", "bread", "noodle", "ramen", "rice",
        "candy", "ice cream", "sauce", "seasoning", "instant",
        "อาหาร", "ขนม", "ของกิน", "บะหมี่", "ก๋วยเตี๋ยว", "ข้าว", "ซอส", "เครื่องปรุง", "ไอศกรีม"
    ])) return "food";

    // Fashion (broad)
    if (includesAny(t, [
        "shirt", "t-shirt", "hoodie", "jacket", "pants", "jeans", "dress", "skirt",
        "fashion", "outfit", "fabric", "clothing", "apparel", "wear",
        "เสื้อ", "กางเกง", "เดรส", "กระโปรง", "ชุด", "ผ้า", "ฟิตติ้ง", "ไซส์", "แฟชั่น"
    ])) return "fashion";

    // Gadget (broad)
    if (includesAny(t, [
        "gadget", "device", "camera", "phone", "headphone", "earbuds", "charger", "powerbank",
        "keyboard", "mouse", "laptop", "electronics", "bluetooth", "usb", "speaker", "monitor",
        "แกดเจ็ต", "กล้อง", "มือถือ", "หูฟัง", "พาวเวอร์แบงค์", "คีย์บอร์ด", "เมาส์", "ชาร์จ", "บลูทูธ", "ลำโพง"
    ])) return "gadget";

    // Beauty (broad)
    if (includesAny(t, [
        "skincare", "makeup", "serum", "cream", "cleanser", "sunscreen",
        "cosmetic", "beauty", "perfume", "fragrance", "cologne", "eau de", "toilette", "parfum",
        "lotion", "moisturizer", "foundation", "mascara", "blush", "concealer", "primer",
        "shampoo", "conditioner", "body wash", "deodorant",
        "crystal", "bright crystal", "versace",
        "สกินแคร์", "เครื่องสำอาง", "ลิป", "เซรั่ม", "ครีม", "กันแดด", "โฟม", "บำรุง",
        "น้ำหอม", "เพอร์ฟูม", "โคโลญ", "โลชั่น", "แชมพู", "ครีมอาบน้ำ", "มอยเจอร์ไรเซอร์",
        "รองพื้น", "มาสคาร่า", "บลัช", "คอนซีลเลอร์", "ไพรเมอร์"
    ])) return "beauty";

    // Home (broad catch-all before other)
    if (includesAny(t, [
        "home", "furniture", "decor", "pillow", "curtain", "lamp", "shelf", "rug", "candle",
        "storage", "organizer", "bedding",
        "บ้าน", "เฟอร์นิเจอร์", "ตกแต่ง", "หมอน", "ผ้าม่าน", "โคมไฟ", "ชั้นวาง", "พรม", "เทียนหอม", "ที่เก็บของ"
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

    const scene2CoreByCategory: Record<ProductCategory, string> = {
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

    // Category-specific intro verb for Scene 1
    const scene1Intro: Partial<Record<ProductCategory, string>> = {
        food: "วันนี้ลองชิม", beverage: "วันนี้ลองชง/จิบ",
        fashion: "วันนี้ลองใส่", gadget: "วันนี้ลองใช้",
        beauty: "วันนี้ลองทา", supplement: "วันนี้มาลอง",
        pet: "วันนี้พาน้องมาลอง", baby: "วันนี้ลองใช้",
        home: "วันนี้มาจัดบ้านด้วย", kitchen: "วันนี้ลองทำอาหารด้วย",
        fitness: "วันนี้ลองเทรนด้วย", auto: "วันนี้ลองติดตั้ง",
        jewelry: "วันนี้ลองใส่", watch: "วันนี้ลองสวม",
        bag: "วันนี้ลองสะพาย", shoe: "วันนี้ลองสวม",
        book: "วันนี้มาอ่าน", toy: "วันนี้มาเล่น",
        stationery: "วันนี้ลองเขียนด้วย", cleaning: "วันนี้ลองใช้",
        outdoor: "วันนี้ลองพกไปใช้", health: "วันนี้ลองวัด/ใช้",
        craft: "วันนี้มา DIY ด้วย", digital: "วันนี้ลองใช้"
    };

    // Category-specific action verb for Scene 2 (3-scene version)
    const scene2Action: Partial<Record<ProductCategory, string>> = {
        food: "ลองชิมแล้ว", beverage: "จิบแล้ว",
        fashion: "ใส่แล้ว", gadget: "ใช้จริงแล้ว",
        beauty: "ทาแล้ว", supplement: "ลองทานแล้ว",
        pet: "น้องลองแล้ว", baby: "ลูกใช้แล้ว",
        home: "จัดแล้ว", kitchen: "ใช้ทำอาหารแล้ว",
        fitness: "เทรนแล้ว", auto: "ติดตั้งแล้ว",
        jewelry: "ใส่แล้ว", watch: "สวมแล้ว",
        bag: "สะพายแล้ว", shoe: "สวมแล้ว",
        book: "อ่านแล้ว", toy: "เล่นแล้ว",
        stationery: "เขียนแล้ว", cleaning: "ใช้ทำความสะอาดแล้ว",
        outdoor: "ลองใช้แล้ว", health: "ลองใช้แล้ว",
        craft: "ลอง DIY แล้ว", digital: "ลองใช้แล้ว"
    };

    const intro = scene1Intro[category] || "มาดู";
    const action = scene2Action[category] || "ลองใช้แล้ว";

    if (sceneCount === 1) {
        // Single scene: hook + short benefit
        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${powerWord}!"`);
    } else if (sceneCount === 2) {
        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${intro} ${productName} กัน!"`);
        scriptParts.push(`🎬 ฉาก2: "${benefit} ${closingCTA} ${urgency}"`);
    } else {
        // 3+ scenes: hook → benefit/review → closing CTA
        scriptParts.push(`🎬 ฉาก1: "${openingHook} ${intro} ${productName} กัน!"`);
        scriptParts.push(`🎬 ฉาก2: "${action} ${productName} ${powerWord} ${benefit}"`);
        scriptParts.push(`🎬 ฉาก3: "${closingCTA} ${urgency}"`);
        // Fill remaining scenes if > 3
        for (let i = 3; i < sceneCount; i++) {
            scriptParts.push(`🎬 ฉาก${i + 1}: "${productName} ${pickRandom(SALES_BENEFITS)} ${pickRandom(URGENCY_PHRASES)}"`);
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
    
    // Character & Style
    gender?: string;            // male, female
    ageRange?: string;          // teen, young-adult, adult, middle-age, senior
    expression?: string;        // neutral, happy, excited, serious
    movement?: string;          // static, minimal, active
    clothingStyles?: string[];  // casual, formal, sporty, fashion, uniform
    cameraAngles?: string[];    // front, side, close-up, full-body, dynamic
    
    // Video Settings
    clipDuration?: number;
    aspectRatio?: string;       // 9:16, 16:9
    
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
    voiceoverDescriptor: string;   // FIXED voice cue — copy-paste to every scene
    cameraMovement: string;        // per-template camera motion
    sceneTransition: string;       // per-template transition keywords
    environment: string;           // setting/background
    lighting: string;              // lighting style
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
    const genderText = config.gender === 'male' ? 'professional male presenter' : 'professional female presenter';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';
    const hasProductImage = !!config.productImage;

    // ── Expression mapping (form value → descriptive English) ──
    const expressionMap: Record<string, string> = {
        neutral: "neutral and composed", happy: "happy and confident",
        excited: "excited and enthusiastic", serious: "serious and focused"
    };
    const expressionText = expressionMap[config.expression || 'happy'] || 'happy and confident';

    // ── Clothing style → descriptive English ──
    const clothingMap: Record<string, string> = {
        casual: "casual everyday wear", formal: "elegant formal attire",
        sporty: "athletic sporty outfit", fashion: "trendy fashion-forward outfit",
        uniform: "clean professional uniform"
    };
    const clothingDesc = (config.clothingStyles || ["casual"]).map(s => clothingMap[s] || s).join(", ");

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
    const fallbackHighlight = PRODUCT_HIGHLIGHT[category];
    const productDesc = config.productDescription?.trim()
        ? `${config.productDescription}. ${ai.product || fallbackHighlight}`
        : (ai.product || fallbackHighlight);

    // ── Character dynamics (AI-analyzed > template default) ──
    const dynamics = ai.character || CHARACTER_DYNAMICS[template] || CHARACTER_DYNAMICS["product-review"];
    const environment = getSmartEnvironment(template, category, ai.environment);
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

    let prompt = `Professional ${templateConfig.englishName} photograph.

[PRODUCT] ${config.productName}: ${productDesc}.
[CHARACTER] ${characterLine}.
[CAMERA] ${cameraDesc}. ${cinematic}.
[SETTING] ${environment}.
[LIGHTING] ${lighting}.
[QUALITY] ${aspectRatio} orientation, photorealistic. ${ANTI_TEXT_DIRECTIVE}

COMPOSITION: Single continuous scene — NO split screen, NO collage, NO side-by-side panels, NO divided frames. One unified photograph with character holding or interacting with the product naturally. Both must be clearly visible together.
${ANTI_DISTORTION_DIRECTIVE}
${FACE_IDENTITY_LOCK}

Reference Images:
- Image 1: Character style reference — use as visual inspiration for an ORIGINAL ANONYMOUS fictional character with similar aesthetic${hasProductImage ? `
- Image 2: Product reference (must preserve packaging and product type)` : ''}
- If text conflicts with images, images win. Character style from Image 1 is the visual guide.

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
    productAnalysis: string
): { prompt: string; sceneScripts: string[]; meta: VideoPromptMeta } => {
    const genderText = config.gender === 'male' ? 'professional male presenter' : 'professional female presenter';
    const genderVoice = config.gender === 'male' ? 'Male' : 'Female';
    const category = detectProductCategory(config.productName, productAnalysis, config.template);
    const template = config.template || 'product-review';
    const aspectRatio = config.aspectRatio || '9:16';
    const voiceTone = config.voiceTone || 'friendly';
    
    // ── Expression mapping ──
    const expressionMap: Record<string, string> = {
        neutral: "neutral and composed", happy: "happy and confident",
        excited: "excited and enthusiastic", serious: "serious and focused"
    };
    const expressionText = expressionMap[config.expression || 'happy'] || 'happy and confident';

    // ── Clothing style ──
    const clothingMap: Record<string, string> = {
        casual: "casual everyday wear", formal: "elegant formal attire",
        sporty: "athletic sporty outfit", fashion: "trendy fashion-forward outfit",
        uniform: "clean professional uniform"
    };
    const clothingDesc = (config.clothingStyles || ["casual"]).map(s => clothingMap[s] || s).join(", ");

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
        "th-central": "Thai", "th-north": "English",
        "th-south": "Lao", "th-isan": "Chinese Mandarin"
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
    const productHighlight = ai.product || PRODUCT_HIGHLIGHT[category];
    const dynamics = ai.character || CHARACTER_DYNAMICS[template] || CHARACTER_DYNAMICS["product-review"];
    const environment = getSmartEnvironment(template, category, ai.environment);
    const lighting = getSmartLighting(voiceTone, category, ai.lighting);
    const cinematic = ai.cinematic || CINEMATIC_SPECS[template] || CINEMATIC_SPECS["product-review"];
    const cameraMove = CAMERA_MOVEMENT[template] || CAMERA_MOVEMENT["product-review"];
    const transition = SCENE_TRANSITION[template] || SCENE_TRANSITION["product-review"];

    // ── FIXED Voiceover Descriptor — same string in EVERY scene ──
    const voiceoverDescriptor = buildVoiceoverDescriptor(config.gender || 'female', voiceTone, config.ageRange);

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

    const contactPhysics = buildContactPhysicsDirective(category);
    const productAccuracyDirective = `The ${config.productName} product is the HERO of the video — always visible and prominent. Product appearance must exactly match the reference image: ${fullProductHighlight}. Feature product in every frame, centered and clearly lit.`;

    const prompt = sanitizePromptForPolicy([
        // [Subject] — product + character
        `${templateConfig.englishName} commercial video. ${productAccuracyDirective}`,
        // [Action] — character details from form selections
        `${genderText}, ${expressionText} expression, wearing ${clothingDesc}. ${dynamics}. ${movementDesc}. ${contactPhysics} ${speakingDirective}`,
        // [Environment] — setting/background
        `${environment}.`,
        // [Camera & Lighting] — user-selected angles + template cinematic + lighting
        `Camera: ${cameraAngleDesc}. ${cinematic}. ${cameraMove}. ${lighting}.`,
        // [Style/Mood] — pacing + frame rate
        `${durationConfig.pacing}. Fluid motion, cinematic motion blur, high frame rate.`,
        // [Audio/Voiceover] — FIXED descriptor + script
        `${voiceoverDescriptor}`,
        `${genderVoice} ${voiceLanguage} voice speaking. ${voiceLanguage.toUpperCase()} SCRIPT (character speaks these exact words on-camera): "${sceneTexts[0] || `มาดู ${config.productName} กัน!`}"`,
        // [Constraints] — policy + technical
        `${aspectDirective} ${ANTI_TEXT_DIRECTIVE} ${FACE_IDENTITY_LOCK} Same fictional character and outfit throughout. Product must appear frontal, centered, symmetrical, zero lens distortion. ${VIDEO_POLICY_DIRECTIVE}`
    ].join(' '), config.productName);

    // ── Meta for Scene 2+ — carries ALL context for consistency ──
    const meta: VideoPromptMeta = {
        style: styleDesc,
        aspectRatio,
        gender: genderText,
        genderVoice: `${genderVoice} ${voiceLanguage} voice speaking`,
        expression: expressionText,
        camera: `Camera: ${cameraAngleDesc}. ${cinematic}. ${cameraMove}`,
        product: `${config.productName}, ${fullProductHighlight}`,
        template: templateConfig.englishName,
        pacing: durationConfig.pacing,
        restrictions: `${ANTI_TEXT_DIRECTIVE} ${FACE_IDENTITY_LOCK} ${buildContactPhysicsDirective(category)} ${VIDEO_POLICY_DIRECTIVE}`,
        voiceoverDescriptor,
        cameraMovement: cameraMove,
        sceneTransition: transition,
        environment,
        lighting
    };

    console.log("📝 Video prompt:", prompt.substring(0, 200) + "...");

    return { prompt, sceneScripts: sceneTexts, meta };
};

/**
 * Build a plain-text video prompt for Scene 2+ using meta from Scene 1.
 * 
 * Strong continuity: IDENTICAL character, product, environment, outfit across all scenes.
 * Only the voiceover script changes — everything visual is locked from Scene 1.
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

    // SAFETY: Do NOT use "lip sync" or "lip-sync" — gets truncated to "Lip." triggering safety filters.
    const speakingDirective = `Character speaks directly to camera throughout. Mouth opens and closes naturally matching spoken words. Realistic speaking animation, never silent or static expression.`;

    // ── CONTINUITY LOCK + TRANSITION TECHNIQUES ──
    const continuityDirective = [
        `SCENE ${sceneNumber} — DIRECT CONTINUATION from scene ${sceneNumber - 1}, character mid-conversation.`,
        `KEEP CONSISTENT: same fictional character face/body/clothing, product appearance, background, lighting, voice.`,
        `MATCH CUT: character position and pose at start of this scene must match exactly where scene ${sceneNumber - 1} ended.`,
        `CAMERA CARRY-OVER: continue same camera motion from previous scene — ${meta.cameraMovement}. Do not reset camera.`,
        `ACTION OVERLAP: character has slight continuous movement (gestures, breathing) at scene boundary — no freeze frame.`,
        `NO black screen, NO fade, NO silence gap. One continuous take.`,
    ].join(' ');

    return sanitizePromptForPolicy([
        continuityDirective,
        `${meta.template} commercial video. ${meta.product} — visible in every frame.`,
        `${meta.voiceoverDescriptor}`,
        `${meta.gender}, ${meta.expression}, ${meta.style}. ${speakingDirective}`,
        `${meta.camera}. ${meta.lighting}.`,
        `${meta.pacing}. Fluid motion, high frame rate.`,
        `${meta.genderVoice}. THAI SCRIPT (character speaks these exact words on-camera): "${cleanScript || 'สินค้าดีจริง คุ้มค่ามาก!'}"`,
        `${aspectDirective} ${meta.restrictions} Same fictional character, outfit, product, environment from scene ${sceneNumber - 1}.`
    ].filter(Boolean).join(' '), meta.product?.split(',')[0]?.trim());
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
