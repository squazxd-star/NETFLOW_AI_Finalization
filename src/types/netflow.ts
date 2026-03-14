// Shared types for Netflow AI dashboard

export type ClipCountOption = 5 | 10 | 25 | 50 | 100 | "unlimited";
export type AspectRatioOption = "9:16" | "16:9";
export type RestIntervalOption = "30s" | "1m" | "2m" | "5m" | "10m";
export type VideoDurationOption = "short" | "medium" | "long";
export type GenderOption = "male" | "female";
export type SaleStyleOption = "hard" | "soft" | "educational" | "storytelling";
export type LanguageOption = "th-central" | "th-north" | "th-south" | "th-isan";
export type TemplateOption =
    | "product-review"
    | "brainrot-product"
    | "food-review"
    | "fashion-review"
    | "gadget-review"
    | "unboxing"
    | "comparison"
    | "testimonial"
    | "flash-sale"
    | "tutorial"
    | "lifestyle"
    | "trending"
    | "mini-drama"
    | "before-after";
export type VoiceToneOption = "energetic" | "calm" | "friendly" | "professional" | "cute";
export type EmotionSyncOption = "natural" | "lively" | "calm";
export type AgeRangeOption = "child" | "teen" | "young-adult" | "adult" | "middle-age" | "senior";
export type PersonalityOption = "cheerful" | "calm" | "professional" | "playful" | "mysterious";
export type ClothingStyleOption = "casual" | "formal" | "sporty" | "fashion" | "uniform";
export type CharacterOutfitOption =
    | "original"
    | "tshirt-casual" | "shirt-button" | "polo" | "hoodie" | "sweater-knit"
    | "jacket-denim" | "jacket-leather" | "blazer" | "suit-formal"
    | "tank-top" | "crop-top" | "oversize-tee"
    | "dress-casual" | "dress-elegant" | "dress-korean" | "dress-mini"
    | "skirt-outfit" | "jeans-outfit"
    | "sportswear" | "gym-wear" | "yoga-wear"
    | "streetwear" | "vintage" | "minimal-chic"
    | "korean-style" | "japanese-style" | "thai-traditional"
    | "uniform-nurse" | "uniform-office" | "uniform-school" | "uniform-chef"
    | "pajamas" | "beach-wear" | "luxury-brand"
    | "cardigan" | "trenchcoat" | "bomber-jacket"
    | "linen-casual" | "ruffle-blouse" | "off-shoulder"
    | "custom";
export type BackgroundOption = "studio" | "outdoor" | "home" | "office" | "abstract";
export type VoiceSettingOption = "original" | "ai-generated" | "text-to-speech";
export type ExpressionOption = "neutral" | "happy" | "excited" | "serious";
export type CameraAngleOption = "front" | "side" | "close-up" | "full-body" | "dynamic";
export type MovementOption = "static" | "minimal" | "active";
export type VideoStyleOption =
    | "ugc-review" | "cgi-realistic" | "hands-only" | "cute-dance" | "runway"
    | "product-demo" | "lifestyle" | "studio" | "outdoor" | "hook-pain"
    | "educational" | "opinion" | "problem-solution" | "comedy" | "theater-drama"
    | "musical" | "action" | "mild-horror" | "fantasy" | "scifi"
    | "timelapse" | "behind-the-scenes" | "challenge" | "comparison" | "tutorial"
    | "interview" | "vlog" | "storytelling" | "reaction" | "unboxing"
    | "straight-review" | "transformation" | "stop-motion" | "split-screen" | "first-person"
    | "aesthetic" | "vintage" | "futuristic" | "nature" | "city"
    | "minimal" | "chaotic" | "satisfying" | "epic" | "cute"
    | "mysterious" | "inspirational" | "urgent" | "relaxing";

// Option arrays for select elements
export const clipCountOptions: ClipCountOption[] = [5, 10, 25, 50, 100, "unlimited"];
export const restIntervalOptions: RestIntervalOption[] = ["30s", "1m", "2m", "5m", "10m"];

export const saleStyleOptions: { value: SaleStyleOption; label: string }[] = [
    { value: "hard", label: "สูงมาก" },
    { value: "soft", label: "สูง" },
    { value: "educational", label: "ปานกลาง" },
    { value: "storytelling", label: "ต่ำ" },
];

export const templateOptions: { value: TemplateOption; label: string; description: string }[] = [
    { value: "product-review", label: "รีวิวสินค้า (Product Review)", description: "เน้นรีวิวคุณภาพสินค้าและกลุ่มเป้าหมาย" },
    { value: "brainrot-product", label: "Brainrot + Product", description: "สไตล์ไวรัลผสมขายของ" },
    { value: "food-review", label: "รีวิวอาหาร (Food Review)", description: "เน้นความอร่อย เนื้อสัมผัส กลิ่น และปฏิกิริยาตอนชิม" },
    { value: "fashion-review", label: "รีวิวเสื้อผ้า (Fashion Review)", description: "เน้นทรงผ้า ฟิตติ้ง ลุคก่อน-หลัง และมิกซ์แอนด์แมตช์" },
    { value: "gadget-review", label: "รีวิวแกดเจ็ต (Gadget Review)", description: "เน้นฟีเจอร์เด่น เดโมใช้งานจริง และผลลัพธ์ที่จับต้องได้" },
    { value: "unboxing", label: "แกะกล่อง (Unboxing)", description: "เปิดกล่องสินค้าพร้อมรีวิว" },
    { value: "comparison", label: "เปรียบเทียบ (Comparison)", description: "เทียบสินค้าก่อน-หลังหรือคู่แข่ง" },
    { value: "testimonial", label: "รีวิวลูกค้า (Testimonial)", description: "เสียงจากลูกค้าจริง" },
    { value: "flash-sale", label: "Flash Sale", description: "โปรโมชั่นด่วน กระตุ้นตัดสินใจ" },
    { value: "tutorial", label: "สอนวิธีใช้ (How-To)", description: "สอนวิธีใช้สินค้าแบบ Step-by-Step" },
    { value: "lifestyle", label: "ไลฟ์สไตล์ (Lifestyle)", description: "แนะนำสินค้าผ่านการใช้ชีวิตประจำวัน" },
    { value: "trending", label: "ตามเทรนด์ (Trending)", description: "คอนเทนต์ตามกระแสไวรัล" },
    { value: "mini-drama", label: "มินิดราม่า (Mini-Drama)", description: "เล่าเรื่องสั้นๆ แบบละคร" },
    { value: "before-after", label: "ก่อน-หลัง (Before-After)", description: "แสดงผลลัพธ์ก่อนและหลังใช้" },
];

export const languageOptions: { value: LanguageOption; label: string }[] = [
    { value: "th-central", label: "ไทย" },
    { value: "th-north", label: "อังกฤษ" },
    { value: "th-south", label: "ลาว" },
    { value: "th-isan", label: "จีน" },
];

export const accentOptions: { value: string; label: string }[] = [
    { value: "central", label: "กลาง" },
    { value: "north", label: "เหนือ" },
    { value: "south", label: "ใต้" },
    { value: "isan", label: "อีสาน" },
];

export const sceneBackgroundOptions: { value: string; label: string; emoji: string; description: string }[] = [
    { value: "studio", label: "สตูดิโอ", emoji: "🎬", description: "พื้นหลังสตูดิโอสะอาด เรียบง่าย" },
    { value: "living-room", label: "ห้องนั่งเล่น", emoji: "🛋️", description: "บรรยากาศอบอุ่น เหมือนรีวิวที่บ้าน" },
    { value: "bedroom", label: "ห้องนอน", emoji: "🛏️", description: "สไตล์ส่วนตัว ใกล้ชิด" },
    { value: "cafe", label: "คาเฟ่", emoji: "☕", description: "บรรยากาศร้านกาแฟ ชิลๆ" },
    { value: "office", label: "ออฟฟิศ", emoji: "💼", description: "มืออาชีพ น่าเชื่อถือ" },
    { value: "outdoor-nature", label: "ธรรมชาติ", emoji: "🌿", description: "สวน ป่า ต้นไม้ อากาศสดใส" },
    { value: "outdoor-city", label: "เมือง", emoji: "🏙️", description: "ถนน ตึก บรรยากาศในเมือง" },
    { value: "kitchen", label: "ครัว", emoji: "🍳", description: "เหมาะกับรีวิวอาหาร/เครื่องครัว" },
    { value: "gym", label: "ฟิตเนส", emoji: "💪", description: "สไตล์สปอร์ต สุขภาพ" },
    { value: "beach", label: "ชายหาด", emoji: "🏖️", description: "ทะเล ทราย แดดอุ่น" },
    { value: "neon-dark", label: "นีออน", emoji: "✨", description: "แสงนีออน ไซเบอร์พังก์ ดูเท่" },
    { value: "white-minimal", label: "มินิมอล", emoji: "⬜", description: "พื้นหลังขาว สะอาด โฟกัสสินค้า" },
    { value: "gradient-abstract", label: "แกรเดียนท์", emoji: "🎨", description: "สีไล่เฉด สวยงาม ทันสมัย" },
    { value: "luxury", label: "หรูหรา", emoji: "👑", description: "หินอ่อน ทอง บรรยากาศพรีเมียม" },
    { value: "night-market", label: "ตลาดนัด", emoji: "🏮", description: "แสงไฟ บรรยากาศตลาดไทย" },
    { value: "rooftop", label: "ดาดฟ้า", emoji: "🌆", description: "วิวเมืองจากที่สูง บรรยากาศเปิดโล่ง" },
    { value: "library", label: "ห้องสมุด", emoji: "📚", description: "ชั้นหนังสือ บรรยากาศสงบ น่าเชื่อถือ" },
    { value: "restaurant", label: "ร้านอาหาร", emoji: "🍽️", description: "โต๊ะอาหาร บรรยากาศร้านหรู" },
    { value: "spa", label: "สปา", emoji: "🧖", description: "ผ่อนคลาย เทียนหอม บรรยากาศเซน" },
    { value: "hospital", label: "คลินิก", emoji: "🏥", description: "สะอาด น่าเชื่อถือ เหมาะสินค้าสุขภาพ" },
    { value: "school", label: "ห้องเรียน", emoji: "🎓", description: "บรรยากาศการเรียน เหมาะคอร์สออนไลน์" },
    { value: "temple", label: "วัด/ศาสนา", emoji: "🛕", description: "สงบ ศักดิ์สิทธิ์ บรรยากาศจิตใจ" },
    { value: "custom", label: "กำหนดเอง", emoji: "✏️", description: "พิมพ์ฉากที่ต้องการ" },
];

export const characterOutfitOptions: { value: CharacterOutfitOption; label: string; emoji: string; group: string }[] = [
    // ── ใช้จากรูปต้นฉบับ ──
    { value: "original", label: "ใช้เสื้อผ้าจากรูปต้นฉบับ", emoji: "📷", group: "ค่าเริ่มต้น" },
    // ── เสื้อผ้าพื้นฐาน ──
    { value: "tshirt-casual", label: "เสื้อยืดลำลอง", emoji: "👕", group: "พื้นฐาน" },
    { value: "shirt-button", label: "เสื้อเชิ้ต", emoji: "👔", group: "พื้นฐาน" },
    { value: "polo", label: "เสื้อโปโล", emoji: "🎽", group: "พื้นฐาน" },
    { value: "tank-top", label: "เสื้อกล้าม", emoji: "🩱", group: "พื้นฐาน" },
    { value: "oversize-tee", label: "เสื้อโอเวอร์ไซส์", emoji: "👚", group: "พื้นฐาน" },
    // ── เสื้อคลุม / แจ็คเก็ต ──
    { value: "hoodie", label: "เสื้อฮู้ด", emoji: "🧥", group: "เสื้อคลุม" },
    { value: "sweater-knit", label: "เสื้อไหมพรม/สเวตเตอร์", emoji: "🧶", group: "เสื้อคลุม" },
    { value: "cardigan", label: "คาร์ดิแกน", emoji: "🧣", group: "เสื้อคลุม" },
    { value: "jacket-denim", label: "แจ็คเก็ตยีนส์", emoji: "🧥", group: "เสื้อคลุม" },
    { value: "jacket-leather", label: "แจ็คเก็ตหนัง", emoji: "🖤", group: "เสื้อคลุม" },
    { value: "bomber-jacket", label: "บอมเบอร์แจ็คเก็ต", emoji: "🧥", group: "เสื้อคลุม" },
    { value: "blazer", label: "เบลเซอร์", emoji: "🤵", group: "เสื้อคลุม" },
    { value: "trenchcoat", label: "เทรนช์โค้ท", emoji: "🧥", group: "เสื้อคลุม" },
    // ── ชุดเดรส / กระโปรง ──
    { value: "dress-casual", label: "เดรสลำลอง", emoji: "👗", group: "เดรส" },
    { value: "dress-elegant", label: "เดรสหรูหรา", emoji: "✨", group: "เดรส" },
    { value: "dress-korean", label: "เดรสสไตล์เกาหลี", emoji: "🇰🇷", group: "เดรส" },
    { value: "dress-mini", label: "มินิเดรส", emoji: "💃", group: "เดรส" },
    { value: "skirt-outfit", label: "ชุดกระโปรง", emoji: "👗", group: "เดรส" },
    { value: "crop-top", label: "เสื้อครอป", emoji: "👙", group: "เดรส" },
    { value: "ruffle-blouse", label: "เสื้อระบาย", emoji: "🌸", group: "เดรส" },
    { value: "off-shoulder", label: "เสื้อเปิดไหล่", emoji: "💫", group: "เดรส" },
    // ── ทางการ / ทำงาน ──
    { value: "suit-formal", label: "ชุดสูทเต็มยศ", emoji: "🤵", group: "ทางการ" },
    { value: "uniform-office", label: "ชุดออฟฟิศ", emoji: "💼", group: "ทางการ" },
    { value: "uniform-nurse", label: "ชุดพยาบาล", emoji: "🏥", group: "ทางการ" },
    { value: "uniform-school", label: "ชุดนักเรียน", emoji: "🎓", group: "ทางการ" },
    { value: "uniform-chef", label: "ชุดเชฟ", emoji: "👨‍🍳", group: "ทางการ" },
    // ── กีฬา / ออกกำลังกาย ──
    { value: "sportswear", label: "ชุดกีฬา", emoji: "⚽", group: "กีฬา" },
    { value: "gym-wear", label: "ชุดออกกำลังกาย", emoji: "💪", group: "กีฬา" },
    { value: "yoga-wear", label: "ชุดโยคะ", emoji: "🧘", group: "กีฬา" },
    // ── สไตล์แฟชั่น ──
    { value: "streetwear", label: "สตรีทแวร์", emoji: "🛹", group: "แฟชั่น" },
    { value: "vintage", label: "วินเทจ", emoji: "📻", group: "แฟชั่น" },
    { value: "minimal-chic", label: "มินิมอลชิค", emoji: "⬜", group: "แฟชั่น" },
    { value: "korean-style", label: "สไตล์เกาหลี", emoji: "🇰🇷", group: "แฟชั่น" },
    { value: "japanese-style", label: "สไตล์ญี่ปุ่น", emoji: "🇯🇵", group: "แฟชั่น" },
    { value: "luxury-brand", label: "ชุดแบรนด์หรู", emoji: "👑", group: "แฟชั่น" },
    { value: "jeans-outfit", label: "ชุดยีนส์", emoji: "👖", group: "แฟชั่น" },
    { value: "linen-casual", label: "ชุดลินิน/ผ้าฝ้าย", emoji: "🌾", group: "แฟชั่น" },
    // ── อื่นๆ ──
    { value: "thai-traditional", label: "ชุดไทย", emoji: "🇹🇭", group: "อื่นๆ" },
    { value: "pajamas", label: "ชุดนอน", emoji: "😴", group: "อื่นๆ" },
    { value: "beach-wear", label: "ชุดเที่ยวทะเล", emoji: "🏖️", group: "อื่นๆ" },
];

export const videoStyleOptions: { value: VideoStyleOption; label: string }[] = [
    { value: "ugc-review", label: "รีวิว UGC" },
    { value: "cgi-realistic", label: "CGI สมจริง" },
    { value: "hands-only", label: "เฉพาะมือ" },
    { value: "cute-dance", label: "เต้นน่ารัก" },
    { value: "runway", label: "รันเวย์" },
    { value: "product-demo", label: "สาธิตสินค้า" },
    { value: "lifestyle", label: "ไลฟ์สไตล์" },
    { value: "studio", label: "สตูดิโอ" },
    { value: "outdoor", label: "กลางแจ้ง" },
    { value: "hook-pain", label: "Hook + จุดปวด" },
    { value: "educational", label: "การศึกษา" },
    { value: "opinion", label: "ความคิดเห็น" },
    { value: "problem-solution", label: "ปัญหา-วิธีแก้" },
    { value: "comedy", label: "ตลก" },
    { value: "theater-drama", label: "โรงละครดราม่า" },
    { value: "musical", label: "มิวสิคัล" },
    { value: "action", label: "แอ็คชั่น" },
    { value: "mild-horror", label: "สยองขวัญเบาๆ" },
    { value: "fantasy", label: "แฟนตาซี" },
    { value: "scifi", label: "ไซไฟ" },
    { value: "timelapse", label: "ไทม์แลปส์" },
    { value: "behind-the-scenes", label: "เบื้องหลัง" },
    { value: "challenge", label: "ชาเลนจ์" },
    { value: "comparison", label: "เปรียบเทียบ" },
    { value: "tutorial", label: "สอน" },
    { value: "interview", label: "สัมภาษณ์" },
    { value: "vlog", label: "วล็อก" },
    { value: "storytelling", label: "เล่าเรื่อง" },
    { value: "reaction", label: "รีแอ็คชั่น" },
    { value: "unboxing", label: "แกะกล่อง" },
    { value: "straight-review", label: "รีวิวตรงไปตรงมา" },
    { value: "transformation", label: "การเปลี่ยนแปลง" },
    { value: "stop-motion", label: "สต็อปโมชั่น" },
    { value: "split-screen", label: "แยกหน้าจอ" },
    { value: "first-person", label: "มุมบุคคลที่ 1" },
    { value: "aesthetic", label: "สุนทรียศาสตร์" },
    { value: "vintage", label: "วินเทจ" },
    { value: "futuristic", label: "อนาคต" },
    { value: "nature", label: "ธรรมชาติ" },
    { value: "city", label: "เมือง" },
    { value: "minimal", label: "มินิมอล" },
    { value: "chaotic", label: "โกลาหล" },
    { value: "satisfying", label: "พอใจ" },
    { value: "epic", label: "ยิ่งใหญ่" },
    { value: "cute", label: "Cute" },
    { value: "mysterious", label: "ลึกลับ" },
    { value: "inspirational", label: "บันดาลใจ" },
    { value: "urgent", label: "เร่งด่วน" },
    { value: "relaxing", label: "ผ่อนคลาย" },
];

export const voiceToneOptions: { value: VoiceToneOption; label: string }[] = [
    { value: "energetic", label: "ตื่นเต้น/กระตือรือร้น" },
    { value: "calm", label: "สงบ/ผ่อนคลาย" },
    { value: "friendly", label: "เป็นกันเอง/อบอุ่น" },
    { value: "professional", label: "มืออาชีพ/น่าเชื่อถือ" },
    { value: "cute", label: "น่ารัก/สดใส" },
];

export interface VideoGenerationResponse {
    success: boolean;
    message: string;
    data?: any;
}

export interface ScriptRequest {
    // Product Info
    productName: string;
    productDescription?: string;
    productId?: string;
    mustUseKeywords?: string;
    avoidKeywords?: string;

    // Script Settings
    style: string;          // saleStyle
    tone: string;           // voiceTone
    language: string;       // th-central, etc.
    template?: string;      // product-review, etc.
    hookText?: string;
    ctaText?: string;
    videoStyle?: string;
    sceneScriptsRaw?: string;
    cachedProductInfo?: string;
    prompt?: string;

    // Character Settings
    gender?: string;
    ageRange?: string;
    personality?: string;
    background?: string;
    characterDescription?: string;
    clothingStyles?: string[];
    characterOutfit?: string;
    cameraAngles?: string[];
    touchLevel?: string;
    sceneBackground?: string;

    // Video Settings
    expression?: string;
    movement?: string;
    aspectRatio?: string;
    videoDuration?: string;
    sceneCount?: number;

    // Legacy/Optional Compatibility
    targetAudience?: string;
    uniqueSellingPoint?: string;
    promotion?: string;
    length?: VideoDurationOption;
    platform?: string;
    hook?: string;
    cta?: string;
    hashtags?: string[];
}

export interface AdvancedVideoRequest extends ScriptRequest {
    prompt: string;
    userImage?: string;       // Product Image
    characterImage?: string;  // Character/Persona Image
    loopCount: number;
    concatenate: boolean;
}

export interface GeneratedAsset {
    type: 'image' | 'video' | 'audio';
    url: string;
    blob?: Blob;
}
