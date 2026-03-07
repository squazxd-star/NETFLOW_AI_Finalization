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
export type AgeRangeOption = "teen" | "young-adult" | "adult" | "middle-age" | "senior";
export type PersonalityOption = "cheerful" | "calm" | "professional" | "playful" | "mysterious";
export type ClothingStyleOption = "casual" | "formal" | "sporty" | "fashion" | "uniform";
export type BackgroundOption = "studio" | "outdoor" | "home" | "office" | "abstract";
export type VoiceSettingOption = "original" | "ai-generated" | "text-to-speech";
export type ExpressionOption = "neutral" | "happy" | "excited" | "serious";
export type CameraAngleOption = "front" | "side" | "close-up" | "full-body" | "dynamic";
export type MovementOption = "static" | "minimal" | "active";

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
    { value: "auto", label: "Auto ฉาก", emoji: "⚡", description: "AI เลือกฉากให้อัตโนมัติตามสินค้าและเทมเพลต" },
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

    // Character Settings
    gender?: string;
    ageRange?: string;
    personality?: string;
    background?: string;

    // Video Settings
    expression?: string;
    movement?: string;
    aspectRatio?: string;
    videoDuration?: string;

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
