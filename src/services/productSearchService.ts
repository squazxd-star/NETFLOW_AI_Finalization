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
    /** Review flow guidance: how to start, key points, closing */
    reviewFlow: {
        opening: string;
        keyPoints: string[];
        closing: string;
    };
    /** Thai pronunciation guide for brand/tech names */
    pronunciationGuide: Record<string, string>;
    /** Detected product category */
    detectedCategory: string;
    /** Raw search result text (for debugging) */
    rawText: string;
}

// ═══════════════════════════════════════════════════════════
// Category-specific search guidance — tells AI what matters
// for each product type so it returns review-useful data
// ═══════════════════════════════════════════════════════════
const CATEGORY_SEARCH_GUIDE: Record<string, { focus: string; reviewStart: string; reviewClose: string }> = {
    gadget:   { focus: "ชิปเซ็ต, RAM, สตอเรจ, หน้าจอ, กล้อง, แบตเตอรี่, ระบบชาร์จ, ระบบเชื่อมต่อ, ราคาเปิดตัว", reviewStart: "เปิดด้วยสเปคเด่นที่สุด + เปรียบเทียบรุ่นก่อน", reviewClose: "สรุปว่าคุ้มไหมเทียบราคา + ใครควรซื้อ" },
    phone:    { focus: "ชิปเซ็ต, RAM/ROM, หน้าจอ (ขนาด/ความละเอียด/Hz), กล้อง (MP/เลนส์), แบตเตอรี่ (mAh/ชาร์จ W), ราคา, สี", reviewStart: "เปิดด้วยจุดเด่นที่ต่างจากรุ่นก่อน/คู่แข่ง", reviewClose: "สรุปว่าคุ้มค่าระดับไหน ใครเหมาะซื้อ" },
    laptop:   { focus: "CPU, GPU, RAM, SSD, หน้าจอ (ขนาด/ความละเอียด/Hz), แบตเตอรี่, น้ำหนัก, พอร์ต, คีย์บอร์ด", reviewStart: "เปิดด้วยจุดเด่นด้านประสิทธิภาพ + กลุ่มเป้าหมาย", reviewClose: "เหมาะกับใคร + คุ้มเงินไหม" },
    tablet:   { focus: "ชิปเซ็ต, RAM, หน้าจอ, ปากกา stylus, คีย์บอร์ด, แบตเตอรี่, น้ำหนัก", reviewStart: "เปิดด้วยจุดเด่นด้าน productivity/entertainment", reviewClose: "ทดแทนโน้ตบุ๊คได้ไหม + ใครควรซื้อ" },
    audio:    { focus: "ไดรเวอร์, codec (LDAC/aptX), ANC ระดับ, แบตเตอรี่ (ชม.), กันน้ำ IP, น้ำหนัก, ชาร์จไว", reviewStart: "เปิดด้วยคุณภาพเสียง + ฟีเจอร์เด่น", reviewClose: "เสียงคุ้มราคาไหม + เทียบคู่แข่งระดับเดียวกัน" },
    camera:   { focus: "เซ็นเซอร์, เมกาพิกเซล, ISO range, ระบบ AF, วิดีโอ (4K/8K fps), เลนส์มาพร้อม, body กันน้ำ", reviewStart: "เปิดด้วยคุณภาพภาพ/วิดีโอที่ถ่ายได้", reviewClose: "เหมาะมือใหม่หรือมือโปร + คุ้มค่าแค่ไหน" },
    beauty:   { focus: "ส่วนผสมหลัก, ปริมาณ (ml/g), ผิวแบบไหนเหมาะ, วิธีใช้, ผลลัพธ์ที่คาดหวัง, มี อย./FDA", reviewStart: "เปิดด้วยปัญหาผิวที่สินค้าแก้ได้", reviewClose: "ใช้แล้วเห็นผลจริงไหม + ราคาเทียบปริมาณคุ้มไหม" },
    skincare: { focus: "ส่วนผสมหลัก (Active Ingredients), ความเข้มข้น %, ปริมาณ, เหมาะกับผิวประเภทไหน, มี อย.", reviewStart: "เปิดด้วยปัญหาผิวที่แก้ได้ + ส่วนผสมเด่น", reviewClose: "เห็นผลกี่วัน + คุ้มค่าต่อมิลลิลิตร" },
    makeup:   { focus: "เฉดสี, เนื้อสัมผัส, ความติดทน (ชม.), ส่วนผสม, เหมาะกับสีผิวไหน, กันน้ำ/เหงื่อ", reviewStart: "เปิดด้วยลุคที่ทำได้ + เนื้อสัมผัสโดดเด่น", reviewClose: "ติดทนจริงไหม + คุ้มเงินแค่ไหน" },
    fragrance:{ focus: "กลุ่มกลิ่น (top/heart/base notes), ความเข้มข้น (EDP/EDT), ปริมาณ ml, ความติดทน (ชม.), โอกาสที่เหมาะ", reviewStart: "เปิดด้วยกลิ่นแรกที่ได้ + บุคลิกของกลิ่น", reviewClose: "ใส่ไปงานไหนได้บ้าง + ฉีดตอนเช้าอยู่ถึงเย็นไหม" },
    food:     { focus: "ส่วนประกอบ, รสชาติ, ปริมาณ/น้ำหนัก, วิธีทำ/ปรุง, แคลอรี, วันหมดอายุ, จุดเด่นเฉพาะ", reviewStart: "เปิดด้วยรสชาติ/กลิ่น/ลักษณะเฉพาะที่น่าสนใจ", reviewClose: "อร่อยคุ้มเงินไหม + ซื้อซ้ำไหม" },
    beverage: { focus: "ส่วนประกอบ, รสชาติ, ปริมาณ ml, แคลอรี, น้ำตาล, คาเฟอีน, วิตามิน", reviewStart: "เปิดด้วยรสชาติ/ความสดชื่น + ส่วนผสมเด่น", reviewClose: "ดื่มแล้วรู้สึกยังไง + ซื้อซ้ำไหม" },
    supplement:{ focus: "ส่วนผสมหลัก, ปริมาณต่อเม็ด, จำนวนเม็ด/แคปซูล, วิธีทาน, มี อย./GMP, สรรพคุณ", reviewStart: "เปิดด้วยปัญหาสุขภาพที่แก้ได้ + ส่วนผสมเด่น", reviewClose: "เห็นผลจริงไหม + ทานยังไงให้ได้ผลดีที่สุด" },
    fashion:  { focus: "เนื้อผ้า, ไซส์ที่มี, สี, ทรง/ฟิตติ้ง, วิธีซัก, แบรนด์/คอลเลคชัน, ราคา", reviewStart: "เปิดด้วยดีไซน์/เนื้อผ้าที่โดดเด่น + ใส่แล้วดูยังไง", reviewClose: "คุ้มราคาไหม + แมตช์กับอะไรได้บ้าง" },
    jewelry:  { focus: "วัสดุ (ทอง/เงิน/เพชร), กะรัต, ขนาด, น้ำหนัก, ใบรับรอง, ดีไซน์", reviewStart: "เปิดด้วยความสวยงาม + วัสดุคุณภาพ", reviewClose: "คุ้มค่าการลงทุนไหม + เหมาะเป็นของขวัญ" },
    watch:    { focus: "กลไก (Automatic/Quartz/Smart), ขนาดหน้าปัด mm, กันน้ำ ATM/m, วัสดุ (สแตนเลส/ไทเทเนียม), สาย, ฟีเจอร์", reviewStart: "เปิดด้วยดีไซน์ + จุดเด่นด้านกลไก/ฟีเจอร์", reviewClose: "ใส่ได้ทุกโอกาสไหม + คุ้มค่าแค่ไหน" },
    bag:      { focus: "วัสดุ (หนัง/ผ้า), ขนาด, ช่องใส่ของ, สายสะพาย, อุปกรณ์เสริม, รุ่น/คอลเลคชัน", reviewStart: "เปิดด้วยดีไซน์ + ความจุใช้งานจริง", reviewClose: "ใช้งานสะดวกไหม + คุ้มราคาแค่ไหน" },
    shoe:     { focus: "วัสดุ, พื้นรองเท้า, ไซส์, น้ำหนัก, เทคโนโลยีพื้น (Air/Boost/Foam), กันน้ำ", reviewStart: "เปิดด้วยดีไซน์ + ความรู้สึกตอนใส่", reviewClose: "ใส่เดินทั้งวันสบายไหม + คุ้มค่าแค่ไหน" },
    home:     { focus: "ขนาด, วัสดุ, น้ำหนัก, สี, วิธีประกอบ, การดูแลรักษา, ประกัน", reviewStart: "เปิดด้วยดีไซน์ + ความเข้ากับห้อง", reviewClose: "ใช้งานจริงสะดวกไหม + คุ้มค่าแค่ไหน" },
    kitchen:  { focus: "วัสดุ, ขนาด, วัตต์, ฟังก์ชัน, อุณหภูมิ, ความจุ, การทำความสะอาด, ประกัน", reviewStart: "เปิดด้วยฟังก์ชันเด่น + ทำอาหารอะไรได้บ้าง", reviewClose: "ทำอาหารจริงง่ายไหม + ประหยัดเวลาจริงไหม" },
    fitness:  { focus: "วัสดุ, น้ำหนัก, ขนาด, ระดับความต้านทาน, การปรับตั้ง, พื้นที่จัดเก็บ", reviewStart: "เปิดด้วยจุดเด่นด้านการออกกำลังกาย", reviewClose: "ใช้ที่บ้านสะดวกไหม + เห็นผลจริงไหม" },
    pet:      { focus: "ส่วนผสม, ขนาด/น้ำหนัก, เหมาะกับสัตว์เลี้ยงประเภท/อายุ, คุณค่าทางโภชนาการ", reviewStart: "เปิดด้วยจุดเด่นที่สัตว์เลี้ยงชอบ", reviewClose: "สัตว์เลี้ยงชอบจริงไหม + คุ้มค่าแค่ไหน" },
    baby:     { focus: "วัสดุปลอดภัย, อายุที่เหมาะ, มาตรฐานความปลอดภัย, วิธีทำความสะอาด, ขนาด", reviewStart: "เปิดด้วยความปลอดภัย + เหมาะกับเด็กวัยไหน", reviewClose: "ปลอดภัยจริง + ลูกชอบไหม + คุ้มค่า" },
    auto:     { focus: "รุ่นรถที่เข้ากัน, วัสดุ, ขนาด, วิธีติดตั้ง, มาตรฐาน, ประกัน", reviewStart: "เปิดด้วยจุดเด่นที่แตกต่าง + เข้ากับรถรุ่นไหน", reviewClose: "ติดตั้งง่ายไหม + คุ้มค่าแค่ไหน" },
    cleaning: { focus: "ส่วนผสม, ปริมาณ ml, พื้นผิวที่เหมาะ, ความปลอดภัย, กลิ่น, ประสิทธิภาพ", reviewStart: "เปิดด้วยปัญหาความสะอาดที่แก้ได้", reviewClose: "ทำความสะอาดได้จริงไหม + คุ้มค่าแค่ไหน" },
    gaming:   { focus: "สเปค (DPI/Hz/Switch), RGB, การเชื่อมต่อ (wireless/wired), น้ำหนัก, ซอฟต์แวร์", reviewStart: "เปิดด้วยฟีเจอร์ที่เกมเมอร์สนใจ", reviewClose: "เล่นเกมดีขึ้นจริงไหม + คุ้มค่าแค่ไหน" },
    wearable: { focus: "เซ็นเซอร์, หน้าจอ, แบตเตอรี่ (วัน), กันน้ำ, GPS, เชื่อมต่อ, แอปรองรับ", reviewStart: "เปิดด้วยฟีเจอร์ health/fitness ที่เด่น", reviewClose: "ใส่ทั้งวันสะดวกไหม + จอสว่างพอไหม + คุ้มค่า" },
    outdoor:  { focus: "วัสดุ, น้ำหนัก, กันน้ำ, ขนาดพับเก็บ, ความทนทาน, อุณหภูมิที่เหมาะ", reviewStart: "เปิดด้วยจุดเด่นด้านการใช้งานกลางแจ้ง", reviewClose: "ทนทานจริงไหม + พกพาสะดวกไหม" },
    craft:    { focus: "วัสดุ, ขนาด, อุปกรณ์ที่มาด้วย, ระดับความยาก, ผลงานที่ทำได้", reviewStart: "เปิดด้วยผลงานที่ทำได้ + ความสนุก", reviewClose: "ทำง่ายจริงไหม + ผลงานออกมาสวยไหม" },
    book:     { focus: "ผู้เขียน, สำนักพิมพ์, จำนวนหน้า, เนื้อหาสรุป, กลุ่มเป้าหมาย, ISBN", reviewStart: "เปิดด้วยแก่นเรื่อง + ทำไมต้องอ่าน", reviewClose: "อ่านจบแล้วได้อะไร + แนะนำให้ใครอ่าน" },
    other:    { focus: "ข้อมูลทั่วไปของสินค้า, จุดเด่น, สเปค, ราคา", reviewStart: "เปิดด้วยจุดเด่นที่น่าสนใจที่สุด", reviewClose: "สรุปว่าคุ้มค่าไหม + ใครควรซื้อ" }
};

// ═══════════════════════════════════════════════════════════
// Brand/Tech name pronunciation guide for Thai TTS accuracy
// Maps English spelling → Thai phonetic approximation
// ═══════════════════════════════════════════════════════════
const BRAND_PRONUNCIATION_MAP: Record<string, string> = {
    "iPhone": "ไอโฟน", "MacBook": "แม็คบุ๊ค", "AirPods": "แอร์พอดส์", "iPad": "ไอแพด",
    "Apple": "แอปเปิ้ล", "Samsung": "ซัมซุง", "Galaxy": "กาแล็คซี่", "Huawei": "หัวเว่ย",
    "Xiaomi": "เสียวหมี่", "OPPO": "ออปโป้", "Vivo": "วีโว่", "Realme": "เรียลมี",
    "OnePlus": "วันพลัส", "Google": "กูเกิ้ล", "Pixel": "พิกเซล", "Sony": "โซนี่",
    "Nike": "ไนกี้", "Adidas": "อาดิดาส", "Puma": "พูม่า", "New Balance": "นิวบาลานซ์",
    "Uniqlo": "ยูนิโคล่", "Zara": "ซาร่า", "H&M": "เอชแอนด์เอ็ม", "Gucci": "กุชชี่",
    "Louis Vuitton": "หลุยส์วิตตอง", "Chanel": "ชาแนล", "Dior": "ดิออร์", "Hermès": "แอร์เมส",
    "L'Oréal": "ลอรีอัล", "Maybelline": "เมย์เบลลีน", "MAC": "แม็ค", "NARS": "นาร์ส",
    "Innisfree": "อินนิสฟรี", "Laneige": "ลาเนจ", "Sulwhasoo": "ซอลวาซู",
    "The Ordinary": "ดิ ออร์ดินารี่", "CeraVe": "เซราวี", "La Roche-Posay": "ลา โรช-โพเซย์",
    "Dyson": "ไดสัน", "Panasonic": "พานาโซนิค", "Philips": "ฟิลิปส์", "LG": "แอลจี",
    "Bosch": "บอช", "Tefal": "เทฟาล", "Electrolux": "อิเลคโทรลักซ์",
    "JBL": "เจบีแอล", "Bose": "โบส", "Sennheiser": "เซนไฮเซอร์", "Marshall": "มาร์แชลล์",
    "Nintendo": "นินเทนโด", "PlayStation": "เพลย์สเตชั่น", "Xbox": "เอ็กซ์บ็อกซ์",
    "Logitech": "โลจิเทค", "Razer": "เรเซอร์", "SteelSeries": "สตีลซีรีส์",
    "GoPro": "โกโปร", "DJI": "ดีเจไอ", "Canon": "แคนนอน", "Nikon": "นิคอน", "Fujifilm": "ฟูจิฟิล์ม",
    "OLED": "โอแอลอีดี", "AMOLED": "อะโมเลด", "USB-C": "ยูเอสบีซี", "Bluetooth": "บลูทูธ",
    "Wi-Fi": "ไวไฟ", "NFC": "เอ็นเอฟซี", "HDR": "เอชดีอาร์", "ANC": "เอเอ็นซี",
    "Snapdragon": "สแนปดรากอน", "Dimensity": "ไดเมนซิตี้", "Exynos": "เอ็กซิโนส",
    "NVIDIA": "เอ็นวิเดีย", "GeForce": "จีฟอร์ซ", "Ryzen": "ไรเซน", "Core Ultra": "คอร์อัลตร้า",
    "Whiskas": "วิสกัส", "Royal Canin": "รอยัลคานิน", "Sheba": "ชีบา",
    "Starbucks": "สตาร์บัคส์", "Nescafé": "เนสกาแฟ", "Lactasoy": "แลคตาซอย",
    "Cetaphil": "เซตาฟิล", "Eucerin": "ยูเซอริน", "Bioderma": "ไบโอเดอร์มา",
    "Garnier": "การ์นิเย่", "Nivea": "นีเวีย", "Vaseline": "วาสลีน",
    "Colgate": "คอลเกต", "Oral-B": "ออรัลบี", "Sensodyne": "เซ็นโซดายน์"
};

// Quick category detection for search optimization
function detectSearchCategory(productName: string): string {
    const lower = productName.toLowerCase();
    const checks: [string[], string][] = [
        [["iphone", "galaxy", "pixel", "redmi", "poco", "มือถือ", "โทรศัพท์", "smartphone"], "phone"],
        [["macbook", "laptop", "โน้ตบุ๊ค", "notebook", "thinkpad", "zenbook", "vivobook"], "laptop"],
        [["ipad", "tablet", "แท็บเล็ต", "galaxy tab"], "tablet"],
        [["airpods", "earbuds", "headphone", "หูฟัง", "ลำโพง", "speaker", "jbl", "bose", "marshall"], "audio"],
        [["camera", "กล้อง", "canon", "nikon", "fujifilm", "sony alpha", "mirrorless"], "camera"],
        [["drone", "โดรน", "dji", "mavic"], "drone"],
        [["controller", "gaming", "razer", "logitech g", "steelseries", "keyboard rgb"], "gaming"],
        [["smartwatch", "apple watch", "galaxy watch", "fitbit", "garmin", "สมาร์ทวอทช์"], "wearable"],
        [["เซรั่ม", "serum", "ครีม", "cream", "lotion", "โลชั่น", "moisturizer", "skincare", "สกินแคร์"], "skincare"],
        [["ลิปสติก", "lipstick", "อายแชโดว์", "eyeshadow", "แป้ง", "foundation", "บลัชออน", "blush", "makeup", "เมคอัพ"], "makeup"],
        [["น้ำหอม", "perfume", "eau de", "edt", "edp", "cologne", "fragrance"], "fragrance"],
        [["แชมพู", "shampoo", "ครีมนวด", "conditioner", "สบู่", "soap", "body wash"], "beauty"],
        [["วิตามิน", "vitamin", "อาหารเสริม", "supplement", "collagen", "คอลลาเจน", "โปรตีน", "whey"], "supplement"],
        [["รองเท้า", "shoe", "sneaker", "สนีกเกอร์", "nike", "adidas", "new balance", "converse"], "shoe"],
        [["กระเป๋า", "bag", "backpack", "กระเป๋าสะพาย", "กระเป๋าเป้"], "bag"],
        [["นาฬิกา", "watch", "rolex", "casio", "g-shock", "seiko", "omega"], "watch"],
        [["แหวน", "ring", "สร้อย", "necklace", "ต่างหู", "earring", "กำไล", "bracelet", "jewelry", "เครื่องประดับ"], "jewelry"],
        [["เสื้อ", "กางเกง", "เดรส", "dress", "jacket", "แจ็คเก็ต", "เสื้อกันหนาว", "fashion", "แฟชั่น"], "fashion"],
        [["หม้อทอด", "air fryer", "หม้อหุงข้าว", "rice cooker", "เครื่องปั่น", "blender", "ไมโครเวฟ", "microwave"], "kitchen"],
        [["เครื่องดูดฝุ่น", "vacuum", "เครื่องซักผ้า", "washer", "ตู้เย็น", "fridge", "แอร์", "air purifier"], "home"],
        [["อาหาร", "ขนม", "snack", "food", "บะหมี่", "noodle", "ข้าว", "rice", "เค้ก", "cake"], "food"],
        [["กาแฟ", "coffee", "ชา", "tea", "นม", "milk", "น้ำผลไม้", "juice", "เครื่องดื่ม", "drink"], "beverage"],
        [["อาหารแมว", "อาหารหมา", "cat food", "dog food", "whiskas", "royal canin", "อาหารสัตว์"], "pet"],
        [["ผ้าอ้อม", "diaper", "ขวดนม", "bottle", "baby", "เด็ก", "ของเล่นเด็ก"], "baby"],
        [["ดัมเบล", "dumbbell", "ลู่วิ่ง", "treadmill", "สายแรง", "resistance", "โยคะ", "yoga mat"], "fitness"],
        [["น้ำยาซักผ้า", "detergent", "น้ำยาล้างจาน", "สเปรย์", "spray", "น้ำยาทำความสะอาด"], "cleaning"],
        [["หนังสือ", "book", "นิยาย", "novel", "manga", "มังงะ", "การ์ตูน"], "book"],
        [["tent", "เต็นท์", "sleeping bag", "ถุงนอน", "camping", "แคมป์ปิ้ง", "outdoor"], "outdoor"],
    ];
    for (const [keywords, cat] of checks) {
        if (keywords.some(k => lower.includes(k))) return cat;
    }
    return "gadget";
}

const buildSearchPrompt = (productName: string): string => {
    const cat = detectSearchCategory(productName);
    const guide = CATEGORY_SEARCH_GUIDE[cat] || CATEGORY_SEARCH_GUIDE["other"];

    return `คุณเป็นผู้เชี่ยวชาญรีวิวสินค้า ค้นหาข้อมูลจริงของสินค้านี้จากอินเทอร์เน็ต

ชื่อสินค้า: "${productName}"
หมวดหมู่ที่ตรวจพบ: ${cat}
ข้อมูลสำคัญที่ต้องค้นหาเป็นพิเศษ: ${guide.focus}

ค้นหาข้อมูลต่อไปนี้ให้ครบถ้วนและถูกต้อง:

1. สรุปสินค้าสั้นๆ (1-2 ประโยค)
2. จุดเด่น/ฟีเจอร์สำคัญ (อย่างน้อย 5 ข้อ — ข้อมูลจริงเท่านั้น เน้น: ${guide.focus})
3. สเปคทางเทคนิค (ให้ครบทุกข้อที่เกี่ยวข้อง: ${guide.focus})
4. อุปกรณ์เสริม/ของแถมในกล่อง
5. ช่วงราคาโดยประมาณ (บาท)
6. ข้อดี (สำหรับเขียนรีวิว)
7. ข้อควรรู้/ข้อเสีย
8. แนวทางรีวิว:
   - เปิดรีวิวอย่างไร: ${guide.reviewStart}
   - จุดที่ต้องพูดถึง: ให้ 3-5 หัวข้อเรียงลำดับ (เรื่องไหนน่าสนใจสุดก่อน)
   - ปิดรีวิวอย่างไร: ${guide.reviewClose}
9. คำอ่านภาษาไทย: สำหรับชื่อแบรนด์และศัพท์เทคนิคที่อยู่ในสินค้านี้ (เฉพาะคำที่อ่านยาก)
   ตัวอย่าง: {"iPhone": "ไอโฟน", "AMOLED": "อะโมเลด"}

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
  "cons": ["...", "..."],
  "reviewFlow": {
    "opening": "ประโยคเปิดรีวิว...",
    "keyPoints": ["หัวข้อ 1", "หัวข้อ 2", "หัวข้อ 3"],
    "closing": "ประโยคปิดรีวิว..."
  },
  "pronunciationGuide": {"BrandName": "คำอ่านไทย"},
  "detectedCategory": "${cat}"
}`
};

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

    const prompt = buildSearchPrompt(productName);

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

    const prompt = buildSearchPrompt(productName);

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
            max_tokens: 1500,
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

    const prompt = buildSearchPrompt(productName);

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

        // Merge AI-returned pronunciation with our static map
        const aiPronunciation = (typeof parsed.pronunciationGuide === 'object' && parsed.pronunciationGuide) ? parsed.pronunciationGuide : {};
        const mergedPronunciation: Record<string, string> = { ...aiPronunciation };
        // Add static brand pronunciations for any brands found in productName
        for (const [brand, thai] of Object.entries(BRAND_PRONUNCIATION_MAP)) {
            if (productName.toLowerCase().includes(brand.toLowerCase()) && !mergedPronunciation[brand]) {
                mergedPronunciation[brand] = thai;
            }
        }

        const info: ProductInfo = {
            summary: parsed.summary || `${productName}`,
            keyFeatures: Array.isArray(parsed.keyFeatures) ? parsed.keyFeatures : [],
            specs: (typeof parsed.specs === 'object' && parsed.specs) ? parsed.specs : {},
            accessories: Array.isArray(parsed.accessories) ? parsed.accessories : [],
            priceRange: parsed.priceRange || "ไม่พบข้อมูล",
            pros: Array.isArray(parsed.pros) ? parsed.pros : [],
            cons: Array.isArray(parsed.cons) ? parsed.cons : [],
            reviewFlow: {
                opening: parsed.reviewFlow?.opening || "",
                keyPoints: Array.isArray(parsed.reviewFlow?.keyPoints) ? parsed.reviewFlow.keyPoints : [],
                closing: parsed.reviewFlow?.closing || ""
            },
            pronunciationGuide: mergedPronunciation,
            detectedCategory: parsed.detectedCategory || detectSearchCategory(productName),
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

    // Review flow guidance
    if (info.reviewFlow && (info.reviewFlow.opening || info.reviewFlow.keyPoints.length > 0)) {
        const flowLines: string[] = [];
        if (info.reviewFlow.opening) flowLines.push(`เปิด: ${info.reviewFlow.opening}`);
        if (info.reviewFlow.keyPoints.length > 0) flowLines.push(`จุดสำคัญ:\n${info.reviewFlow.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}`);
        if (info.reviewFlow.closing) flowLines.push(`ปิด: ${info.reviewFlow.closing}`);
        parts.push(`🎬 แนวทางรีวิว:\n${flowLines.join('\n')}`);
    }

    // Pronunciation guide for TTS
    const pronEntries = Object.entries(info.pronunciationGuide || {});
    if (pronEntries.length > 0) {
        parts.push(`🗣️ คำอ่าน:\n${pronEntries.map(([en, th]) => `- ${en} → ${th}`).join('\n')}`);
    }

    return parts.join('\n\n');
}

/**
 * Get pronunciation guide for a product name from the static map.
 * Useful when full search is skipped but TTS still needs pronunciation hints.
 */
export function getPronunciationHints(productName: string): Record<string, string> {
    const hints: Record<string, string> = {};
    for (const [brand, thai] of Object.entries(BRAND_PRONUNCIATION_MAP)) {
        if (productName.toLowerCase().includes(brand.toLowerCase())) {
            hints[brand] = thai;
        }
    }
    return hints;
}
