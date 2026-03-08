// ═══════════════════════════════════════════════════════════════
// Auto Background — เลือกฉากพื้นหลังอัตโนมัติจากชื่อ/คำอธิบายสินค้า
// อ้างอิง categoryEnvironments.ts (100 categories × 80 variations)
// 22 ฉาก × ~50 keywords = ~1,100 keywords รวม
// ═══════════════════════════════════════════════════════════════

type BackgroundMapping = { keywords: string[]; background: string };

const CATEGORY_BG_MAP: BackgroundMapping[] = [

    // ═══ 1. สตูดิโอ (studio) — แฟชั่น, เครื่องสำอาง, สินค้าทั่วไป ═══
    {
        background: "studio",
        keywords: [
            "เสื้อ", "กางเกง", "เดรส", "แฟชั่น", "fashion", "เสื้อผ้า", "clothes", "outfit", "ชุด",
            "เครื่องสำอาง", "makeup", "ลิปสติก", "แป้ง", "อายแชโดว์", "มาสคาร่า", "รองพื้น", "บลัช",
            "lip", "lipstick", "foundation", "blush", "eyeshadow", "mascara", "concealer", "primer",
            "รองเท้า", "shoe", "sneaker", "รองเท้าผ้าใบ", "boot", "sandal", "loafer", "slipper",
            "เล็บ", "nail", "ยาทาเล็บ", "เจลเล็บ", "manicure", "pedicure",
            "งานฝีมือ", "craft", "diy", "handmade", "ทำมือ", "ถัก", "เย็บ", "ปัก",
            "ผ้าพันคอ", "scarf", "เข็มขัด", "belt", "ถุงเท้า", "sock",
            "เสื้อกันหนาว", "jacket", "hoodie", "แจ็คเก็ต", "โค้ท", "coat",
        ],
    },

    // ═══ 2. ห้องนั่งเล่น (living-room) — เฟอร์นิเจอร์, สัตว์เลี้ยง, ของใช้ในบ้าน ═══
    {
        background: "living-room",
        keywords: [
            "เฟอร์นิเจอร์", "โต๊ะ", "เก้าอี้", "ตู้", "ชั้นวาง", "furniture", "desk", "chair", "shelf",
            "โซฟา", "sofa", "โคมไฟ", "lamp", "ไฟ", "lighting", "light", "แสง",
            "ผ้าม่าน", "curtain", "พรม", "rug", "carpet", "แจกัน", "vase", "กรอบรูป", "frame",
            "กระจก", "mirror", "ตกแต่ง", "decor", "decoration", "ของแต่งบ้าน",
            "เครื่องดูดฝุ่น", "vacuum", "ไดสัน", "dyson", "robot vacuum", "เครื่องฟอกอากาศ", "air purifier",
            "เครื่องซักผ้า", "washer", "เครื่องอบผ้า", "dryer",
            "smart home", "สมาร์ทโฮม", "alexa", "google home", "iot",
            "สุนัข", "แมว", "สัตว์เลี้ยง", "pet", "dog", "cat", "อาหารหมา", "อาหารแมว",
            "หมา", "ลูกหมา", "ลูกแมว", "กรงสัตว์", "ที่นอนหมา", "ที่นอนแมว",
            "ปรับอากาศ", "air freshener", "หอมปรับอากาศ", "สเปรย์หอม",
            "เด็ก", "baby", "ทารก", "ของเล่น", "toy", "kids", "ผ้าอ้อม", "diaper",
            "ทีวี", "tv", "television", "โทรทัศน์", "รีโมท", "remote",
        ],
    },

    // ═══ 3. ห้องนอน (bedroom) — เครื่องนอน, ชุดนอน ═══
    {
        background: "bedroom",
        keywords: [
            "ที่นอน", "หมอน", "ผ้าห่ม", "bedding", "mattress", "pillow", "blanket", "duvet",
            "ชุดนอน", "pajama", "ชุดชั้นใน", "underwear", "bra", "บรา", "กางเกงใน",
            "ผ้าปูที่นอน", "bed sheet", "ปลอกหมอน", "pillowcase", "ผ้านวม",
            "นาฬิกาปลุก", "alarm clock", "โคมไฟหัวเตียง", "bedside lamp",
            "ม่านกั้น", "ผ้าม่านห้องนอน", "sleep", "นอน", "หลับ",
            "เครื่องฟอกอากาศห้องนอน", "humidifier", "เครื่องทำความชื้น",
            "ผ้าห่มไฟฟ้า", "ที่นอนยางพารา", "latex", "memory foam",
            "ตุ๊กตา", "ตุ๊กตาหมี", "plush", "stuffed", "teddy",
            "โต๊ะเครื่องแป้ง", "vanity", "dresser", "ตู้เสื้อผ้า", "wardrobe", "closet",
            "nightstand", "ข้างเตียง", "โคมไฟตั้งโต๊ะ",
        ],
    },

    // ═══ 4. คาเฟ่ (cafe) — กาแฟ, ชา, ขนม, เครื่องดื่ม ═══
    {
        background: "cafe",
        keywords: [
            "กาแฟ", "coffee", "espresso", "latte", "cappuccino", "americano", "mocha",
            "ชา", "tea", "matcha", "มัทฉะ", "ชาเขียว", "green tea", "ชานม", "bubble tea",
            "ขนม", "snack", "คุกกี้", "cookie", "ช็อกโกแลต", "chocolate", "เค้ก", "cake",
            "ขนมปัง", "bakery", "เบเกอรี่", "bread", "donut", "โดนัท", "ครัวซอง", "croissant",
            "เครื่องดื่ม", "beverage", "drink", "juice", "น้ำผลไม้", "smoothie", "สมูทตี้",
            "นม", "milk", "โกโก้", "cocoa", "ไอศกรีม", "ice cream", "เจลาโต้", "gelato",
            "วาฟเฟิล", "waffle", "แพนเค้ก", "pancake", "มาการอง", "macaron",
            "เครื่องชงกาแฟ", "coffee machine", "french press", "drip", "pour over",
            "แก้วน้ำ", "tumbler", "cup", "mug", "แก้วเก็บความเย็น", "thermos",
            "ซีเรียล", "cereal", "granola", "oat", "โอ๊ต",
        ],
    },

    // ═══ 5. ออฟฟิศ (office) — อุปกรณ์สำนักงาน, เครื่องเขียน, แท็บเล็ต ═══
    {
        background: "office",
        keywords: [
            "โน้ตบุ๊ค", "laptop", "คอมพิวเตอร์", "computer", "macbook", "notebook", "pc",
            "แท็บเล็ต", "tablet", "ipad", "surface",
            "สายชาร์จ", "charger", "แบตเตอรี่", "powerbank", "power bank", "adapter",
            "เครื่องเขียน", "stationery", "ปากกา", "pen", "ดินสอ", "pencil", "สมุด",
            "เมาส์", "mouse", "คีย์บอร์ด", "keyboard", "จอมอนิเตอร์", "monitor", "screen",
            "พรินเตอร์", "printer", "สแกนเนอร์", "scanner", "เครื่องถ่ายเอกสาร",
            "กระดาษ", "paper", "แฟ้ม", "folder", "file", "สมุดโน้ต", "notebook",
            "โต๊ะทำงาน", "work desk", "เก้าอี้สำนักงาน", "office chair", "ergonomic",
            "usb", "flash drive", "external hard drive", "ssd", "hub",
            "webcam", "เว็บแคม", "ไมค์", "microphone", "mic", "หูฟังประชุม",
            "แผ่นรองเมาส์", "mousepad", "ที่วางโน้ตบุ๊ค", "laptop stand",
            "เครื่องคิดเลข", "calculator", "ลวดเย็บ", "stapler", "กรรไกร", "scissors",
        ],
    },

    // ═══ 6. ธรรมชาติ (outdoor-nature) — แคมป์, สวน, ต้นไม้, กล้อง ═══
    {
        background: "outdoor-nature",
        keywords: [
            "แคมป์", "camping", "เต็นท์", "tent", "outdoor", "เดินป่า", "hiking", "ตกปลา",
            "สวน", "garden", "ต้นไม้", "plant", "ดอกไม้", "flower", "ปลูก", "กระถาง", "pot",
            "กล้อง", "camera", "gopro", "action cam", "ถ่ายรูป", "photography", "กล้องฟิล์ม",
            "โดรน", "drone", "dji", "กล้องวงจรปิด", "cctv",
            "หมวก", "hat", "cap", "beanie", "หมวกปีกกว้าง", "bucket hat",
            "กล้องส่องทางไกล", "binocular", "กล้องดูดาว", "telescope",
            "จักรยาน", "bicycle", "bike", "ปั่นจักรยาน", "cycling",
            "ปุ๋ย", "fertilizer", "ดิน", "soil", "เมล็ดพันธุ์", "seed",
            "ถุงมือสวน", "garden glove", "บัวรดน้ำ", "watering can", "สายยาง", "hose",
            "ธรรมชาติ", "nature", "ป่า", "forest", "ภูเขา", "mountain", "น้ำตก", "waterfall",
            "นก", "bird", "ผีเสื้อ", "butterfly", "แมลง", "insect",
        ],
    },

    // ═══ 7. เมือง (outdoor-city) — ยานยนต์, แว่นตา, สตรีทแฟชั่น ═══
    {
        background: "outdoor-city",
        keywords: [
            "รถ", "car", "auto", "มอเตอร์ไซค์", "motorcycle", "อุปกรณ์รถ", "car accessory",
            "ev", "รถยนต์ไฟฟ้า", "electric vehicle", "tesla", "benz", "bmw", "toyota", "honda",
            "แว่น", "sunglasses", "แว่นตา", "glasses", "eyewear", "แว่นกันแดด",
            "กระเป๋าเป้", "backpack", "กระเป๋าเดินทาง", "luggage", "suitcase", "trolley",
            "สเก็ตบอร์ด", "skateboard", "roller blade", "scooter", "สกู๊ตเตอร์",
            "หมวกกันน็อค", "helmet", "ถุงมือขับรถ", "driving glove",
            "dashcam", "กล้องติดรถ", "gps", "เครื่องนำทาง",
            "น้ำมันเครื่อง", "engine oil", "ยางรถ", "tire", "ล้อ", "wheel",
            "ที่ชาร์จรถ", "ev charger", "แบตเตอรี่รถ",
            "street", "ถนน", "urban", "city", "เมือง", "สตรีท",
            "graffiti", "สตรีทแฟชั่น", "streetwear", "supreme", "off-white",
        ],
    },

    // ═══ 8. ครัว (kitchen) — อาหาร, เครื่องครัว, เครื่องปรุง ═══
    {
        background: "kitchen",
        keywords: [
            "อาหาร", "food", "ข้าว", "rice", "ก๋วยเตี๋ยว", "noodle", "แกง", "curry",
            "ผัด", "ทอด", "ต้ม", "ปิ้ง", "ย่าง", "grill", "bbq", "ซุป", "soup", "สลัด", "salad",
            "ส้มตำ", "ลาบ", "น้ำพริก", "ผักสด", "เนื้อ", "meat", "หมู", "pork", "ไก่", "chicken",
            "หม้อหุงข้าว", "rice cooker", "เครื่องปั่น", "blender", "หม้อทอด", "air fryer",
            "ตู้เย็น", "fridge", "refrigerator", "ไมโครเวฟ", "microwave", "เตาอบ", "oven",
            "เครื่องปรุง", "ซอส", "sauce", "น้ำปลา", "seasoning", "เกลือ", "salt", "พริก",
            "กระทะ", "pan", "wok", "หม้อ", "pot", "มีด", "knife", "เขียง", "cutting board",
            "จาน", "plate", "ชาม", "bowl", "ช้อน", "spoon", "ส้อม", "fork", "ตะเกียบ",
            "น้ำยาล้างจาน", "dish soap", "ทำความสะอาด", "cleaning", "ผงซักฟอก", "detergent",
            "ถุงมือทำครัว", "apron", "ผ้ากันเปื้อน", "เครื่องกรองน้ำ", "water filter",
            "อาหารแช่แข็ง", "frozen food", "อาหารกระป๋อง", "canned food", "instant",
        ],
    },

    // ═══ 9. ฟิตเนส (gym) — ออกกำลังกาย, ชุดกีฬา, อุปกรณ์ฟิตเนส ═══
    {
        background: "gym",
        keywords: [
            "ฟิตเนส", "fitness", "ออกกำลังกาย", "gym", "exercise", "workout", "ดัมเบล", "dumbbell",
            "ลดน้ำหนัก", "diet", "weight loss", "ไฟเบอร์", "fiber", "ดีท็อกซ์", "detox", "slim",
            "ชุดกีฬา", "sportswear", "กีฬา", "sport", "วิ่ง", "running", "จ็อกกิ้ง", "jogging",
            "โปรตีน", "protein", "whey", "bcaa", "creatine", "pre workout",
            "สายรัดข้อมือ", "wristband", "ที่รัดเข่า", "knee support", "ถุงมือฟิตเนส",
            "ลู่วิ่ง", "treadmill", "จักรยานปั่น", "spin bike", "เครื่องเวท", "weight machine",
            "เชือกกระโดด", "jump rope", "ยางยืด", "resistance band", "ลูกบอล", "exercise ball",
            "แผ่นรองออกกำลังกาย", "yoga mat", "mat", "foam roller",
            "กระบอกน้ำ", "water bottle", "shaker", "เชคเกอร์",
            "มวย", "boxing", "นวมชกมวย", "boxing glove", "muay thai", "มวยไทย",
            "ว่ายน้ำ", "swimming", "แว่นว่ายน้ำ", "goggle", "หมวกว่ายน้ำ",
        ],
    },

    // ═══ 10. ชายหาด (beach) — กันแดด, ชุดว่ายน้ำ, ทะเล ═══
    {
        background: "beach",
        keywords: [
            "กันแดด", "sunscreen", "spf", "uv", "ครีมกันแดด", "sun protection", "sun block",
            "ชุดว่ายน้ำ", "swimwear", "bikini", "บิกินี่", "ชุดเล่นน้ำ", "swim",
            "ทะเล", "sea", "beach", "ชายหาด", "ทราย", "sand", "คลื่น", "wave",
            "ร่มชายหาด", "beach umbrella", "เก้าอี้ชายหาด", "beach chair",
            "แว่นกันแดด", "sun hat", "หมวกปีกกว้าง",
            "ผ้าขนหนู", "towel", "ผ้าเช็ดตัว", "beach towel",
            "กระดานโต้คลื่น", "surfboard", "surf", "snorkel", "ดำน้ำ", "diving",
            "เรือ", "boat", "kayak", "คายัค", "แพ", "raft",
            "อาฟเตอร์ซัน", "after sun", "ว่านหางจระเข้", "aloe vera",
            "เสื้อชูชีพ", "life jacket", "ห่วงยาง", "float",
            "ครีมบำรุงหลังอาบแดด", "tanning", "แทนนิ่ง", "bronzer",
        ],
    },

    // ═══ 11. นีออน (neon-dark) — เทค, เกมมิ่ง, มือถือ, หูฟัง ═══
    {
        background: "neon-dark",
        keywords: [
            "โทรศัพท์", "มือถือ", "phone", "iphone", "samsung", "สมาร์ทโฟน", "smartphone",
            "หูฟัง", "ลำโพง", "audio", "earphone", "earbuds", "speaker", "headphone", "airpods",
            "เกมมิ่ง", "gaming", "เกม", "game", "joystick", "console", "ps5", "xbox", "switch",
            "rgb", "led", "neon", "ไฟ led", "ไฟนีออน",
            "wearable", "สมาร์ทวอทช์", "smart watch", "apple watch", "galaxy watch", "fitbit",
            "vr", "virtual reality", "ar", "แว่น vr", "metaverse",
            "เมาส์เกมมิ่ง", "gaming mouse", "คีย์บอร์ดเกมมิ่ง", "mechanical keyboard",
            "เก้าอี้เกมมิ่ง", "gaming chair", "โต๊ะเกมมิ่ง", "gaming desk",
            "สตรีมเมอร์", "streamer", "capture card", "กล้องเว็บแคม",
            "ไฟริ้ว", "fairy light", "strip light", "ไฟเส้น",
            "case มือถือ", "phone case", "เคสโทรศัพท์", "ฟิล์มกระจก", "screen protector",
            "แท่นชาร์จ", "wireless charger", "ชาร์จไร้สาย", "magsafe",
        ],
    },

    // ═══ 12. มินิมอล (white-minimal) — สินค้า clean, minimal, สีขาว ═══
    {
        background: "white-minimal",
        keywords: [
            "มินิมอล", "minimal", "minimalist", "สะอาด", "clean", "simple", "เรียบ",
            "สีขาว", "white", "ขาว", "ปลอดภัย", "organic", "ออร์แกนิค",
            "ธรรมดา", "basic", "essential", "natural", "ธรรมชาติ",
            "เปล่า", "plain", "ไร้สาร", "chemical free", "ไร้น้ำหอม", "unscented",
            "zero waste", "eco", "รักษ์โลก", "recycle", "รีไซเคิล",
            "ไร้สี", "ไม่มีสี", "โทนสีอ่อน", "pastel",
            "muji", "มูจิ", "ikea", "อิเกีย", "uniqlo",
            "ผ้าฝ้าย", "cotton", "ผ้าลินิน", "linen",
            "สบู่ธรรมชาติ", "natural soap", "เซรามิก", "ceramic",
            "ไม้", "wood", "ไม้ไผ่", "bamboo",
        ],
    },

    // ═══ 13. แกรเดียนท์ (gradient-abstract) — อาร์ต, ดีไซน์, สีสัน ═══
    {
        background: "gradient-abstract",
        keywords: [
            "แกรเดียนท์", "gradient", "abstract", "อาร์ต", "art", "ศิลปะ",
            "ดีไซน์", "design", "สี", "color", "colour", "สีสัน", "colorful",
            "digital art", "nft", "crypto", "คริปโต", "บิตคอยน์", "bitcoin",
            "สติ๊กเกอร์", "sticker", "ลาย", "pattern", "ลวดลาย",
            "โปสเตอร์", "poster", "ภาพวาด", "painting", "ภาพพิมพ์", "print",
            "พื้นหลังสวย", "wallpaper", "วอลเปเปอร์",
            "กราฟิก", "graphic", "illustration", "ภาพประกอบ",
            "เคสลาย", "custom case", "สกรีน", "screen print",
            "ไทดาย", "tie dye", "สเปรย์สี", "spray paint",
            "เทียน", "candle", "เทียนหอม", "scented candle", "wax",
        ],
    },

    // ═══ 14. หรูหรา (luxury) — นาฬิกา, เครื่องประดับ, น้ำหอม, แบรนด์เนม ═══
    {
        background: "luxury",
        keywords: [
            "น้ำหอม", "perfume", "fragrance", "cologne", "กลิ่น", "eau de",
            "นาฬิกา", "watch", "rolex", "omega", "casio", "g-shock", "seiko",
            "แหวน", "สร้อย", "ต่างหู", "jewelry", "เพชร", "diamond", "ทอง", "gold",
            "bracelet", "กำไล", "necklace", "สร้อยคอ", "pendant", "จี้",
            "กระเป๋า", "bag", "กระเป๋าสะพาย", "clutch", "wallet", "กระเป๋าตัง",
            "แบรนด์เนม", "brand name", "luxury", "premium", "พรีเมียม", "หรูหรา",
            "louis vuitton", "gucci", "chanel", "dior", "hermes", "prada", "versace",
            "ของขวัญ", "gift", "ของฝาก", "ของชำร่วย", "wedding", "งานแต่ง",
            "ทองคำ", "เงิน", "silver", "แพลทินัม", "platinum", "ไข่มุก", "pearl",
            "คริสตัล", "crystal", "swarovski", "หินสี", "gemstone",
            "ปากกาหรู", "pen luxury", "montblanc", "ไฟแช็ค", "lighter", "zippo",
        ],
    },

    // ═══ 15. ตลาดนัด (night-market) — ตลาด, ของกิน, สินค้าราคาประหยัด ═══
    {
        background: "night-market",
        keywords: [
            "ตลาดนัด", "night market", "ตลาด", "market", "ขายของ", "แผงลอย",
            "ราคาถูก", "ประหยัด", "คุ้มค่า", "sale", "ลดราคา", "โปรโมชั่น", "promotion",
            "ของกิน", "กินเล่น", "ของทานเล่น", "ขนมไทย", "ขนมตลาด",
            "เสื้อผ้าตลาด", "มือสอง", "secondhand", "มือ2", "vintage",
            "ของเก่า", "antique", "โบราณ", "retro",
            "ตลาดโรงเกลือ", "ตลาดจตุจักร", "jj market", "chatuchak",
            "ไฟราว", "string light", "ตลาดกลางคืน",
            "ลอตเตอรี่", "lottery", "สลาก",
            "ไม้กวาด", "กระเป๋าผ้า", "tote bag",
            "ของเล่นเด็ก", "ของเล่นราคาถูก", "gadget ราคาถูก",
        ],
    },

    // ═══ 16. ดาดฟ้า (rooftop) — วิวเมือง, ปาร์ตี้, ค็อกเทล ═══
    {
        background: "rooftop",
        keywords: [
            "rooftop", "ดาดฟ้า", "sky bar", "สกายบาร์", "วิว", "view", "ชมวิว",
            "ค็อกเทล", "cocktail", "wine", "ไวน์", "ปาร์ตี้", "party",
            "sunset", "พระอาทิตย์ตก", "golden hour", "ยามเย็น",
            "bar", "บาร์", "pub", "ผับ", "คลับ", "club", "nightlife",
            "champagne", "แชมเปญ", "prosecco", "sparkling",
            "เบียร์คราฟต์", "craft beer", "ipa",
            "อาหารค่ำ", "dinner", "มื้อค่ำ", "date night",
            "ร่มกลางแจ้ง", "patio", "ระเบียง", "balcony",
            "chill", "ชิล", "hangout", "สังสรรค์",
            "cigar", "ซิการ์", "pipe", "ไปป์",
        ],
    },

    // ═══ 17. ห้องสมุด (library) — หนังสือ, การศึกษา, ปัญญา ═══
    {
        background: "library",
        keywords: [
            "หนังสือ", "book", "นิยาย", "novel", "การ์ตูน", "manga", "comic",
            "อ่าน", "reading", "e-book", "kindle", "อีบุ๊ค",
            "วรรณกรรม", "literature", "กวี", "poetry", "บทกวี",
            "สารานุกรม", "encyclopedia", "dictionary", "พจนานุกรม",
            "ที่คั่นหนังสือ", "bookmark", "แว่นอ่านหนังสือ", "reading glasses",
            "ชั้นหนังสือ", "bookshelf", "ตู้หนังสือ", "bookcase",
            "ความรู้", "knowledge", "ปัญญา", "wisdom", "สติปัญญา",
            "ปรัชญา", "philosophy", "จิตวิทยา", "psychology",
            "ประวัติศาสตร์", "history", "ภูมิศาสตร์", "geography",
            "แมกกาซีน", "magazine", "นิตยสาร", "วารสาร", "journal",
        ],
    },

    // ═══ 18. ร้านอาหาร (restaurant) — อาหารหรู, เหล้า, มื้อพิเศษ ═══
    {
        background: "restaurant",
        keywords: [
            "เหล้า", "เบียร์", "beer", "whisky", "วิสกี้", "sake", "ซาเก",
            "alcohol", "แอลกอฮอล์", "สุรา", "เครื่องดื่มแอลกอฮอล์",
            "ร้านอาหาร", "restaurant", "fine dining", "อาหารหรู",
            "สเต็ก", "steak", "ซูชิ", "sushi", "อาหารญี่ปุ่น", "japanese food",
            "อาหารอิตาเลียน", "italian", "pasta", "พาสต้า", "pizza", "พิซซ่า",
            "อาหารฝรั่งเศส", "french", "อาหารเกาหลี", "korean food", "bbq",
            "บุฟเฟ่ต์", "buffet", "โอมากาเสะ", "omakase",
            "จานรอง", "ที่เปิดไวน์", "wine opener", "ที่เปิดขวด",
            "เครื่องปั่นน้ำผลไม้", "ที่บดพริก", "pepper mill",
            "ผ้าเช็ดปาก", "napkin", "เทียนบนโต๊ะอาหาร",
            "ชุดจานชาม", "dinnerware", "cutlery", "ชุดช้อนส้อม",
        ],
    },

    // ═══ 19. สปา (spa) — บิวตี้, นวด, ผ่อนคลาย, โยคะ ═══
    {
        background: "spa",
        keywords: [
            "ครีม", "เซรั่ม", "โลชั่น", "สกินแคร์", "skincare", "serum", "moisturizer",
            "toner", "cleanser", "บำรุงผิว", "ครีมบำรุง", "เอสเซนส์", "essence",
            "แชมพู", "ครีมนวด", "shampoo", "conditioner", "hair", "ผม", "ทรีทเมนต์",
            "สบู่", "soap", "เจลอาบน้ำ", "body wash", "สครับ", "scrub", "body scrub",
            "นวด", "massage", "น้ำมันหอม", "essential oil", "อโรม่า", "aroma",
            "โยคะ", "yoga", "สมาธิ", "meditation", "pilates", "พิลาทิส",
            "มาส์กหน้า", "face mask", "sheet mask", "มาส์ก", "clay mask",
            "เครื่องนวด", "massager", "เครื่องนวดคอ", "neck massager",
            "บาธบอมบ์", "bath bomb", "เกลืออาบน้ำ", "bath salt", "bubble bath",
            "ผ่อนคลาย", "relax", "wellness", "สุขภาพจิต", "mental health",
            "ดิฟฟิวเซอร์", "diffuser", "เครื่องพ่นไอน้ำ",
        ],
    },

    // ═══ 20. คลินิก (hospital) — ยา, วิตามิน, อุปกรณ์การแพทย์ ═══
    {
        background: "hospital",
        keywords: [
            "วิตามิน", "vitamin", "อาหารเสริม", "supplement", "คอลลาเจน", "collagen",
            "ยา", "medicine", "drug", "แก้ปวด", "painkiller", "แก้ไอ", "แก้หวัด", "pharma",
            "เวชสำอาง", "derma", "dermatology", "คลินิก", "clinic",
            "เครื่องวัดความดัน", "blood pressure", "เครื่องวัดน้ำตาล", "glucose meter",
            "เทอร์โมมิเตอร์", "thermometer", "วัดไข้", "ปรอทวัดไข้",
            "หน้ากากอนามัย", "mask", "แอลกอฮอล์เจล", "hand sanitizer", "เจลล้างมือ",
            "พลาสเตอร์", "bandage", "ผ้าพันแผล", "first aid", "ปฐมพยาบาล",
            "ถุงมือยาง", "latex glove", "ถุงมือไนไตร", "nitrile",
            "กลูตา", "glutathione", "ไฮยาลูรอน", "hyaluronic acid", "retinol", "เรตินอล",
            "โปรไบโอติก", "probiotic", "โอเมก้า", "omega", "fish oil", "น้ำมันปลา",
            "แคลเซียม", "calcium", "ธาตุเหล็ก", "iron", "zinc", "สังกะสี",
        ],
    },

    // ═══ 21. ห้องเรียน (school) — การศึกษา, คอร์สเรียน, เด็ก ═══
    {
        background: "school",
        keywords: [
            "การศึกษา", "education", "เรียน", "study", "course", "คอร์ส", "คอร์สเรียน",
            "ออนไลน์", "online course", "e-learning", "ติวเตอร์", "tutor",
            "ภาษาอังกฤษ", "english", "ภาษาจีน", "chinese", "ภาษาญี่ปุ่น", "japanese",
            "คณิตศาสตร์", "math", "วิทยาศาสตร์", "science", "ฟิสิกส์", "physics",
            "กระเป๋านักเรียน", "school bag", "ชุดนักเรียน", "uniform",
            "ไวท์บอร์ด", "whiteboard", "กระดานดำ", "blackboard",
            "สี", "crayon", "สีไม้", "colored pencil", "สีเทียน",
            "ของเล่นเสริมพัฒนาการ", "educational toy", "puzzle", "จิ๊กซอว์",
            "flash card", "แฟลชการ์ด", "abc", "อักษร", "ตัวเลข", "number",
            "กล่องดินสอ", "pencil case", "ไม้บรรทัด", "ruler", "ยางลบ", "eraser",
            "โน้ตย่อ", "สรุป", "mind map", "ไมนด์แมป",
        ],
    },

    // ═══ 22. วัด/ศาสนา (temple) — จิตวิญญาณ, พระ, ศรัทธา ═══
    {
        background: "temple",
        keywords: [
            "วัด", "temple", "พระ", "buddha", "พุทธ", "buddhist",
            "เครื่องราง", "amulet", "พระเครื่อง", "เหรียญ",
            "ธูป", "incense", "เทียนพรรษา", "เทียนบูชา",
            "สวดมนต์", "pray", "prayer", "มนต์", "mantra",
            "สายสิญจน์", "sacred thread", "น้ำมนต์", "holy water",
            "ศรัทธา", "faith", "จิตวิญญาณ", "spiritual", "spirit",
            "โหราศาสตร์", "astrology", "ดวง", "horoscope", "ทำนาย", "fortune",
            "คริสตัลฮีลลิ่ง", "crystal healing", "หินมงคล", "lucky stone",
            "สร้อยพระ", "ห้อยคอพระ", "กำไลหยก", "jade bracelet",
            "ผ้ายันต์", "yantra", "ปลุกเสก", "consecrate",
            "ชุดสังฆทาน", "ถวายพระ", "ทำบุญ", "merit",
        ],
    },
];

/**
 * วิเคราะห์ชื่อ/คำอธิบายสินค้า แล้วเลือกฉากพื้นหลังที่เหมาะสมที่สุด
 */
export function autoSelectBackground(productName: string, productDescription?: string): string {
    const text = `${productName} ${productDescription || ""}`.toLowerCase();

    let bestMatch: { background: string; score: number } = { background: "studio", score: 0 };

    for (const mapping of CATEGORY_BG_MAP) {
        let score = 0;
        for (const keyword of mapping.keywords) {
            if (text.includes(keyword.toLowerCase())) {
                score += keyword.length; // ยิ่ง keyword ยาว ยิ่งเจาะจง
            }
        }
        if (score > bestMatch.score) {
            bestMatch = { background: mapping.background, score };
        }
    }

    return bestMatch.background;
}
