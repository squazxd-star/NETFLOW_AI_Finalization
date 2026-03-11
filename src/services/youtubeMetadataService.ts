/**
 * YouTube Metadata AI Generation Service
 * Generates optimized YouTube Shorts title + description using Gemini + Google Search grounding
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { getApiKey } from "./storageService";

export interface YouTubeMetadataResult {
    title: string;
    description: string;
}

// ─── Helpers ───
function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(n, arr.length));
}

type CatKey = 'smartphone'|'laptop'|'tablet'|'gaming'|'audio'|'camera'|'wearable'|'tv'
    |'skincare'|'makeup'|'fragrance'|'haircare'|'sunscreen'
    |'fashion'|'sportswear'|'shoe'|'bag'|'jewelry'|'watch'|'sunglasses'
    |'food'|'snack'|'bakery'|'beverage'|'coffee'|'alcohol'
    |'supplement'|'protein'|'fitness'|'yoga'
    |'home'|'furniture'|'kitchen'|'cleaning'
    |'pet'|'baby'|'outdoor'|'camping'|'auto'
    |'book'|'stationery'|'toy'|'craft'|'gadget'|'other';

const CAT_KW: [string[], CatKey][] = [
    [["iphone","galaxy","pixel","redmi","poco","oppo","vivo","realme","oneplus","มือถือ","โทรศัพท์","smartphone","ซัมซุง"],"smartphone"],
    [["macbook","laptop","โน้ตบุ๊ค","notebook","thinkpad","zenbook","vivobook","predator"],"laptop"],
    [["ipad","tablet","แท็บเล็ต","galaxy tab","surface pro"],"tablet"],
    [["gaming","razer","logitech","keyboard","mouse","เกมมิ่ง","rog","mechanical","gpu","rtx","ps5","xbox","nintendo","switch"],"gaming"],
    [["airpods","earbuds","headphone","หูฟัง","ลำโพง","speaker","soundbar","bose","jbl","marshall"],"audio"],
    [["camera","กล้อง","canon","nikon","fujifilm","gopro","dji","drone","mirrorless","dslr","insta360"],"camera"],
    [["smartwatch","apple watch","galaxy watch","garmin","fitbit","mi band","สมาร์ทวอทช์"],"wearable"],
    [["tv","ทีวี","โทรทัศน์","oled tv","qled","smart tv"],"tv"],
    [["เซรั่ม","serum","ครีม","cream","lotion","โลชั่น","skincare","สกินแคร์","toner","moisturizer","retinol","niacinamide"],"skincare"],
    [["ลิปสติก","lipstick","แป้ง","foundation","makeup","เมคอัพ","คุชชั่น","cushion","บลัชออน","blush","มาสคาร่า","mascara"],"makeup"],
    [["น้ำหอม","perfume","eau de","edt","edp","fragrance","cologne"],"fragrance"],
    [["แชมพู","shampoo","ครีมนวด","conditioner","hair serum","ทรีทเมนท์"],"haircare"],
    [["กันแดด","sunscreen","sunblock","spf","ซันสกรีน"],"sunscreen"],
    [["อาหารแมว","อาหารหมา","cat food","dog food","whiskas","royal canin","สัตว์เลี้ยง","pet"],"pet"],
    [["เสื้อ","กางเกง","เดรส","dress","fashion","แฟชั่น","hoodie","jacket","แจ็คเก็ต","jeans"],"fashion"],
    [["ชุดออกกำลัง","sportswear","legging","under armour"],"sportswear"],
    [["รองเท้า","shoe","sneaker","สนีกเกอร์","nike","adidas","new balance","converse","jordan","yeezy"],"shoe"],
    [["กระเป๋า","bag","backpack","tote","crossbody"],"bag"],
    [["แหวน","ring","สร้อย","necklace","ต่างหู","earring","กำไล","bracelet","เพชร","diamond","ทอง","gold","เครื่องประดับ","jewelry"],"jewelry"],
    [["นาฬิกา","watch","rolex","casio","g-shock","seiko","omega"],"watch"],
    [["แว่นตา","sunglasses","แว่นกันแดด","rayban","oakley"],"sunglasses"],
    [["ขนม","snack","chip","คุกกี้","cookie","ช็อกโกแลต","chocolate","candy"],"snack"],
    [["เค้ก","cake","ขนมปัง","bread","bakery","เบเกอรี่","โดนัท","ครัวซองต์"],"bakery"],
    [["กาแฟ","coffee","espresso","ลาเต้","latte"],"coffee"],
    [["ชา","tea","matcha","น้ำผลไม้","juice","เครื่องดื่ม","drink","โซดา","นม","milk"],"beverage"],
    [["เบียร์","beer","ไวน์","wine","วิสกี้","whisky","เหล้า"],"alcohol"],
    [["อาหาร","food","อร่อย","ข้าว","แกง","ผัด"],"food"],
    [["วิตามิน","vitamin","อาหารเสริม","supplement","collagen","คอลลาเจน","กลูต้า","gluta"],"supplement"],
    [["โปรตีน","protein","whey","เวย์","bcaa","creatine"],"protein"],
    [["ดัมเบล","treadmill","fitness","ฟิตเนส","resistance band","gym"],"fitness"],
    [["โยคะ","yoga","เสื่อโยคะ","pilates"],"yoga"],
    [["เฟอร์นิเจอร์","furniture","โซฟา","sofa","เตียง","bed","โต๊ะ","desk","เก้าอี้","chair","หมอน","ที่นอน","mattress"],"furniture"],
    [["เครื่องครัว","kitchen","กระทะ","pan","หม้อทอด","air fryer","blender","เตาอบ"],"kitchen"],
    [["น้ำยาล้าง","detergent","cleaning","ทำความสะอาด","เครื่องดูดฝุ่น","vacuum"],"cleaning"],
    [["บ้าน","home","ของแต่งบ้าน","decor","เทียนหอม","candle","โคมไฟ","lamp"],"home"],
    [["เด็ก","baby","ผ้าอ้อม","diaper","ขวดนม","นมผง","stroller"],"baby"],
    [["แคมป์","camping","เต็นท์","tent","ถุงนอน","แคมปิ้ง"],"camping"],
    [["กลางแจ้ง","outdoor","ไฟฉาย","กระติกน้ำ","thermos"],"outdoor"],
    [["รถยนต์","car","auto","dashcam","กล้องติดรถ","car care"],"auto"],
    [["หนังสือ","book","นิยาย","novel","manga","มังงะ"],"book"],
    [["ปากกา","pen","ดินสอ","pencil","stationery","เครื่องเขียน"],"stationery"],
    [["ของเล่น","toy","lego","เลโก้","figure","ฟิกเกอร์","โมเดล","board game","puzzle"],"toy"],
    [["diy","craft","งานฝีมือ","crochet","paint","วาดรูป"],"craft"],
    [["gadget","adapter","hub","usb","charger","ที่ชาร์จ","power bank","พาวเวอร์แบงค์","สายชาร์จ"],"gadget"],
];

function detectCategory(productName: string): CatKey {
    const lower = productName.toLowerCase();
    for (const [kws, cat] of CAT_KW) {
        if (kws.some(k => lower.includes(k))) return cat;
    }
    return "other";
}

const CAT_DISPLAY: Record<CatKey, string> = {
    smartphone:"สมาร์ทโฟน",laptop:"แล็ปท็อป",tablet:"แท็บเล็ต",gaming:"เกมมิ่ง",
    audio:"เครื่องเสียง/หูฟัง",camera:"กล้อง",wearable:"สมาร์ทวอทช์",tv:"ทีวี",
    skincare:"สกินแคร์",makeup:"เครื่องสำอาง",fragrance:"น้ำหอม",haircare:"ผลิตภัณฑ์ผม",sunscreen:"กันแดด",
    fashion:"แฟชั่น",sportswear:"ชุดกีฬา",shoe:"รองเท้า",bag:"กระเป๋า",jewelry:"เครื่องประดับ",watch:"นาฬิกา",sunglasses:"แว่นตา",
    food:"อาหาร",snack:"ขนม",bakery:"เบเกอรี่",beverage:"เครื่องดื่ม",coffee:"กาแฟ",alcohol:"เครื่องดื่มแอลกอฮอล์",
    supplement:"อาหารเสริม",protein:"โปรตีน",fitness:"อุปกรณ์ฟิตเนส",yoga:"โยคะ",
    home:"ของแต่งบ้าน",furniture:"เฟอร์นิเจอร์",kitchen:"เครื่องครัว",cleaning:"ทำความสะอาด",
    pet:"สัตว์เลี้ยง",baby:"แม่และเด็ก",outdoor:"กลางแจ้ง",camping:"แคมปิ้ง",auto:"รถยนต์",
    book:"หนังสือ",stationery:"เครื่องเขียน",toy:"ของเล่น",craft:"DIY",gadget:"แกดเจ็ต",other:"สินค้าทั่วไป",
};

// ─── Category-Specific Title Hooks (ชวนคลิก) ───
const TITLE_HOOKS: Record<CatKey, string[]> = {
    smartphone:["กล้องโหดขนาดนี้!?","อย่าซื้อมือถือก่อนดูคลิปนี้!","จอสวย แบตอึด ครบจบ!","ถ่ายรูปสวยจนเพื่อนถาม!","เทียบรุ่นไหนก็สู้ไม่ได้!","ชาร์จไวจนตกใจ!"],
    laptop:["แรงจนน่ากลัว!","ใครทำงาน ต้องมี!","แบตอึดทั้งวัน ไม่ต้องพกสาย!","เปิดกี่โปรแกรมก็ไม่กระตุก!","สเปคเทพ ราคาเทพ!","คุ้มที่สุดในงบนี้!"],
    tablet:["วาดรูป ดูหนัง จดโน้ต จบในตัวเดียว!","คุ้มกว่าซื้อโน้ตบุ๊คอีก!","ทำไมถึงขายดีนักนะ?"],
    gaming:["เกมเมอร์ต้องมี!","FPS พุ่งเว่อร์!","RGB สวยจนเพื่อนอิจฉา!","ของมันต้องมี สายเกมห้ามพลาด!","อัพเกรดทีเดียว คุ้มหลายปี!","เล่นเกมลื่นจนหยุดไม่ได้!"],
    audio:["เสียงดี จนลืมถอดหูฟัง!","Bass หนักมาก ขนลุก!","ตัดเสียงดี นั่งรถไฟฟ้าก็ชิล!","คุณภาพเสียงระดับ Studio!","ใส่ทั้งวันไม่เจ็บหู!","เสียงคมชัด เหมือนอยู่คอนเสิร์ต!"],
    camera:["ถ่ายมาแล้วแบบนี้!?","กล้องตัวเดียวเอาอยู่ทุกสถานการณ์!","สี สวย คม จนไม่ต้องแต่ง!","Vlog ง่ายๆ ด้วยกล้องตัวนี้!","ภาพสวยจน feed ปัง!"],
    wearable:["ฟีเจอร์เยอะขนาดนี้!?","วัดสุขภาพครบ จบในข้อมือ!","ดีไซน์สวย ใส่ได้ทุกลุค!"],
    tv:["จอสวยจนนั่งดูทั้งวัน!","ภาพคมชัดระดับโรงหนัง!","ทีวีตัวเดียว เปลี่ยนห้องเป็นโรงหนัง!"],
    skincare:["ผิวเปลี่ยน ใน 7 วัน!","ตัวนี้ดีจริง ไม่ได้พูดเล่น!","ผิวแพ้ง่ายก็ใช้ได้!","หมอผิวแนะนำ!","เปิดขวดมาแล้ว ปังมาก!","ผิวกระจ่างใสขึ้นชัด!"],
    makeup:["สวยแบบไม่ต้องพยายาม!","ติดทนทั้งวัน ไม่เลอะ!","สีปังเกินไปแล้ว!","แต่งหน้าแป๊บเดียว สวยเป๊ะ!","ถูกและดี มีอยู่จริง!","ของดี ราคาน่ารัก!"],
    fragrance:["หอมจนคนเดินตาม!","กลิ่นนี้ได้ชิดมาก!","ฉีดแล้วมีออร่า!","หอมติดทนตลอดวัน!","กลิ่นหรูในราคาจับต้องได้!","แฟนชมตลอด!"],
    haircare:["ผมนุ่มลื่นตั้งแต่สระแรก!","ผมร่วงน้อยลงจริงๆ!","ตัวเดียวจบ ไม่ต้องใช้หลายขวด!"],
    sunscreen:["ทาแล้วไม่วอก!","กันแดดดี ราคาถูก!","หน้าไม่มัน ไม่อุดตัน!","ทาซ้ำง่าย บางเบาสุด!"],
    fashion:["ใส่แล้วดูแพงมาก!","ลุคนี้ปังสุด!","ของดีราคาหลักร้อย!","ใครใส่ก็ดูดี!","เสื้อตัวเดียว แมทช์ได้ 10 ลุค!","มิกซ์แอนด์แมทช์ง่ายมาก!"],
    sportswear:["ออกกำลังกายสบาย ดูดีด้วย!","ผ้ายืดหายใจได้ ใส่แล้วเลิฟ!","ชุดปัง ออกกำลังกายก็ต้องสวย!"],
    shoe:["ใส่แล้วหยุดไม่ได้!","นุ่มสบาย เดินทั้งวันไม่เจ็บ!","สนีกเกอร์ตัวนี้ ห้ามพลาด!","คู่เดียว ใส่ได้ทุกลุค!","เปิดกล่อง สวยกว่าในรูป!","หล่อ/สวย ตั้งแต่หัวจรดเท้า!"],
    bag:["จุของได้เยอะมาก!","สวย หรู ดูแพง!","ใช้ได้ทุกวัน ทุกโอกาส!","กระเป๋าตัวนี้ ใครเห็นก็ถาม!","ดีไซน์เรียบแต่เท่!"],
    jewelry:["ใส่แล้วดูหรูขึ้นทันที!","เครื่องประดับชิ้นเดียว เปลี่ยนลุค!","สวยละมุน ใส่ได้ทุกวัน!"],
    watch:["สวยจนหยุดมองไม่ได้!","คลาสสิค ใส่ได้ตลอดชีวิต!","นาฬิกาเรือนนี้ คือการลงทุน!","ดีไซน์หรู ราคาคุ้ม!","ใส่แล้วดูมีระดับ!"],
    sunglasses:["ใส่แล้วหล่อ/สวยขึ้น 10 เท่า!","แว่นตัวนี้ ไปไหนก็ได้คำชม!","กันแดดดี ดีไซน์ปัง!"],
    food:["อร่อยจนหยุดไม่ได้!","กินแล้วติดใจ!","อร่อยเกินราคา!","เปิดมาแล้ว น้ำลายไหล!","สูตรลับที่ต้องลอง!","ของกินแบบนี้ ต้องลอง!"],
    snack:["กรุบกรอบ หยุดกินไม่ได้!","เปิดถุงมา หมดเลย!","อร่อยจนซื้อซ้ำ!","กินคำแรก ติดใจเลย!","แจกสูตรขนมกินเล่น!"],
    bakery:["หอม นุ่ม ละลายในปาก!","อบสดใหม่ ฟินมาก!","ขนมปังร้านนี้ ต้องลอง!"],
    beverage:["ดื่มแล้วสดชื่นมาก!","รสชาติใหม่ ลองแล้วติดใจ!","เครื่องดื่มตัวนี้ ดับกระหายสุด!"],
    coffee:["กาแฟตัวนี้ หอมจนตื่น!","คอกาแฟต้องลอง!","ดริปง่ายๆ ได้กาแฟร้านที่บ้าน!","กลมกล่อม หอมละมุน!","เข้มแต่ไม่ขม ดื่มง่าย!"],
    alcohol:["รสชาติเข้มข้น กลมกล่อม!","จิบแล้วฟิน!","ขวดนี้ คืนนี้ ลองดู!"],
    supplement:["กินแล้วเห็นผลจริง!","ตัวเดียวครบ!","สุขภาพดี เริ่มต้นจากตรงนี้!","คุณหมอแนะนำ!","กินง่าย ผลลัพธ์ชัด!","ตัวนี้ขายดีมีเหตุผล!"],
    protein:["กล้ามโต ด้วยตัวนี้!","เวย์ตัวนี้ ละลายง่าย ไม่คาว!","อร่อย โปรตีนสูง แคลต่ำ!"],
    fitness:["เปลี่ยนห้องเป็นยิม!","ออกกำลังกายที่บ้าน สะดวกสุด!","อุปกรณ์คุ้ม ใช้ได้นาน!"],
    yoga:["ผ่อนคลาย เฟล็กซ์ได้ทุกท่า!","เสื่อนุ่ม ไม่ลื่น คุ้มมาก!","โยคะง่ายๆ ที่บ้าน!"],
    home:["ของชิ้นเดียว เปลี่ยนบรรยากาศ!","ของแต่งบ้านเปลี่ยนมู้ดห้อง!","มินิมอล แต่ปัง!"],
    furniture:["นั่งสบาย ดีไซน์สวย!","เฟอร์นิเจอร์ชิ้นเดียว เปลี่ยนห้อง!","คุ้มค่าทุกบาท!"],
    kitchen:["ทำอาหารง่ายขึ้น 10 เท่า!","แม่บ้านต้องมี!","อยู่ครัวแบบมืออาชีพ!"],
    cleaning:["สะอาดหมดจด ไม่ต้องออกแรง!","ตัวเดียวจบ สะอาดเอี่ยม!","บ้านสะอาดง่ายขึ้น!"],
    pet:["น้องกินแล้วชอบมาก!","สัตว์เลี้ยงฟิน ทาสฟิน!","น้องหมา/แมว ต้องมีตัวนี้!","เลือกให้ดีที่สุด สำหรับน้อง!","ของดีสำหรับขนฟู!"],
    baby:["ลูกน้อยชอบมาก!","ปลอดภัย อุ่นใจ ใช้ได้เลย!","คุณแม่ต้องมี!"],
    outdoor:["สายเอาท์ดอร์ต้องมี!","ไปไหนก็พร้อม!","ทนทาน ใช้ได้นาน!"],
    camping:["แคมป์ครั้งนี้ ต้องพกไป!","สายแคมป์ ต้องมีในลิสต์!","ชิลล์ท่ามกลางธรรมชาติ!"],
    auto:["ขับรถต้องมี!","อุปกรณ์เสริมที่คุ้มสุด!","รถสะอาด ขับแล้วฟิน!"],
    book:["อ่านแล้วเปลี่ยนชีวิต!","หนังสือเล่มนี้ ต้องอ่าน!","สายอ่าน ห้ามพลาด!"],
    stationery:["เขียนลื่น สวยมาก!","น่ารัก อยากใช้ทุกวัน!","ของดีสำหรับสายจด!"],
    toy:["สนุกจนวางไม่ลง!","ของเล่น ผู้ใหญ่ก็ชอบ!","เปิดกล่องมาแล้ว เจ๋งมาก!"],
    craft:["ทำเองง่ายกว่าที่คิด!","งานฝีมือชิ้นนี้ น่ารักมาก!","DIY ง่ายๆ ทำตามได้เลย!"],
    gadget:["แกดเจ็ตตัวนี้ เปลี่ยนชีวิต!","มีอันเดียว ช่วยได้เยอะ!","ของมันต้องมี!","ซื้อมาแล้ว ไม่ผิดหวัง!","สะดวกสุดๆ ต้องลอง!"],
    other:["ตัวนี้ดีจริง ไม่ได้โม้!","ลองแล้ว ติดใจ!","ห้ามพลาด ของดีมีจริง!","คุ้มเกินราคา!","ซื้อมาแล้ว ชอบมาก!","ไม่ซื้อ ไม่ได้แล้ว!"],
};

// ─── Category-Specific Power Words ───
const POWER_WORDS: Record<CatKey, string[]> = {
    smartphone:["สเปคเทพ","กล้องโปร","จอสวยคม","ชาร์จไว","แบตอึด","คุ้มค่า"],
    laptop:["แรงลื่น","สเปคจัด","น้ำหนักเบา","จอสวย","แบตทนทั้งวัน","คุ้มสุดในรุ่น"],
    tablet:["จอใหญ่คม","เขียนลื่น","พกง่าย","มัลติทาสก์ได้"],
    gaming:["FPS สูง","ลื่นไหล","RGB สวย","สเปคเทพ","ตอบสนองไว","ประสบการณ์เทพ"],
    audio:["เสียงคม","Bass หนัก","ตัดเสียงรบกวน","แบตอึด","ใส่สบาย","เสียงใส"],
    camera:["ภาพคม","สีสวย","AF เร็ว","วิดีโอ 4K","พกง่าย"],
    wearable:["วัดสุขภาพครบ","ดีไซน์สวย","แบตอึด","กันน้ำ"],
    tv:["จอ 4K","สีสดจริง","เสียงรอบทิศ","Smart TV"],
    skincare:["ผิวกระจ่างใส","บำรุงล้ำลึก","ผิวชุ่มชื้น","ลดรอยสิว","ผิวเนียนนุ่ม","ผิวแข็งแรง"],
    makeup:["ติดทนทั้งวัน","เนื้อเนียน","สีสวย","ไม่เลอะ","คุมมัน","แต่งง่าย"],
    fragrance:["หอมติดทน","กลิ่นหรู","มีเสน่ห์","กลิ่นละมุน","ได้ออร่า"],
    haircare:["ผมนุ่มลื่น","ลดผมร่วง","หอมติดผม","เงางาม"],
    sunscreen:["ไม่วอก","บางเบา","ไม่อุดตัน","กันแดดจริง","ทาซ้ำง่าย"],
    fashion:["ดูแพง","ใส่สบาย","มิกซ์ง่าย","เข้าทุกลุค","ผ้าดี","ตัดเย็บเนี้ยบ"],
    sportswear:["ระบายอากาศ","ยืดหยุ่น","แห้งไว","ใส่สบาย"],
    shoe:["นุ่มสบาย","น้ำหนักเบา","ดีไซน์เท่","ทนทาน","ใส่ได้ทุกลุค"],
    bag:["จุเยอะ","น้ำหนักเบา","ดีไซน์หรู","วัสดุดี","ใช้ได้ทุกโอกาส"],
    jewelry:["สวยหรู","ละมุน","ใส่ได้ทุกวัน","ดูมีราคา"],
    watch:["ดีไซน์คลาสสิค","แม่นยำ","ทนทาน","ดูมีระดับ"],
    sunglasses:["กัน UV","ดีไซน์เท่","ใส่สบาย","ดูดี"],
    food:["อร่อย","สดใหม่","สูตรเด็ด","ฟินทุกคำ","เข้มข้น"],
    snack:["กรุบกรอบ","อร่อยเพลิน","หยุดไม่ได้","รสชาติจัด"],
    bakery:["หอม","นุ่ม","ละลายในปาก","อบสดใหม่"],
    beverage:["สดชื่น","ดื่มง่าย","เย็นชื่นใจ","รสชาติใหม่"],
    coffee:["หอมกรุ่น","เข้มข้น","กลมกล่อม","คั่วสด","ดริปง่าย"],
    alcohol:["เข้มข้น","กลมกล่อม","พรีเมียม","รสชาติดี"],
    supplement:["เห็นผลจริง","ดูดซึมดี","ครบสูตร","ปลอดภัย","กินง่าย"],
    protein:["โปรตีนสูง","แคลต่ำ","รสชาติดี","ละลายง่าย","กล้ามโต"],
    fitness:["คุ้มค่า","ทนทาน","ใช้ง่าย","ประหยัดค่ายิม"],
    yoga:["นุ่มสบาย","ไม่ลื่น","หนาพอดี","พกง่าย"],
    home:["สวยงาม","เปลี่ยนบรรยากาศ","มินิมอล","ดูดี"],
    furniture:["นั่งสบาย","ดีไซน์สวย","แข็งแรง","คุ้มค่า"],
    kitchen:["ทำอาหารง่าย","ประหยัดเวลา","ทนทาน","ล้างง่าย"],
    cleaning:["สะอาดหมดจด","ไม่ต้องออกแรง","หอมสดชื่น","ตัวเดียวจบ"],
    pet:["น้องชอบ","สารอาหารครบ","ปลอดภัย","ขนสวย"],
    baby:["ปลอดภัย","อ่อนโยน","คุณแม่ไว้ใจ","ผิวบอบบางก็ใช้ได้"],
    outdoor:["ทนทาน","กันน้ำ","พกง่าย","ใช้ได้นาน"],
    camping:["ทนทาน","กันฝน","พับเก็บง่าย","น้ำหนักเบา"],
    auto:["ติดตั้งง่าย","คุ้มค่า","ทนทาน","ดูแลรถง่าย"],
    book:["อ่านสนุก","เปลี่ยนมุมมอง","ให้ความรู้","น่าสะสม"],
    stationery:["เขียนลื่น","สีสวย","น่ารัก","คุณภาพดี"],
    toy:["สนุก","สร้างจินตนาการ","เสริมพัฒนาการ","เล่นได้ทุกวัย"],
    craft:["ทำง่าย","สร้างสรรค์","ผลงานสวย","คลายเครียด"],
    gadget:["สะดวก","ชาร์จไว","ใช้งานง่าย","พกสะดวก","เปลี่ยนชีวิต"],
    other:["คุ้มค่า","ดีจริง","ห้ามพลาด","ใช้แล้วติดใจ","แนะนำเลย"],
};

// ─── Category-Specific CTAs ───
const CTA_POOL: Record<CatKey, string[]> = {
    smartphone:["ใครใช้รุ่นไหนอยู่ คอมเมนต์บอก!","ถ้าต้องเลือก 1 เครื่อง เลือกตัวไหน?","กดซับรอรีวิวรุ่นถัดไป!"],
    laptop:["ใครใช้ตัวไหนอยู่ แชร์หน่อย!","คอมเมนต์สเปคที่ใช้กัน!","กดซับรอรีวิวตัวต่อไป!"],
    tablet:["ใช้ทำอะไรบ้าง คอมเมนต์!","กดซับรอรีวิวถัดไป!"],
    gaming:["เกมเมอร์ใช้อะไรกัน คอมเมนต์!","กดไลค์ถ้าเป็นสายเกม!","ซับรอรีวิว Gear ตัวถัดไป!"],
    audio:["ใครใช้หูฟังรุ่นไหน คอมเมนต์!","กดซับ ถ้าเป็นสายฟังเพลง!","แนะนำเพลงทดสอบหูฟังกัน!"],
    camera:["ถ่ายด้วยกล้องอะไรกัน คอมเมนต์!","กดซับรอรีวิวกล้องถัดไป!"],
    wearable:["ใส่รุ่นไหนอยู่ คอมเมนต์!","กดซับรอรีวิว!"],
    tv:["ใช้ทีวีรุ่นไหน คอมเมนต์!","กดซับรอรีวิว!"],
    skincare:["ใครใช้ตัวนี้อยู่ มาแชร์!","คอมเมนต์รูทีนกัน!","ผิวแพ้ง่าย ใช้อะไรอยู่?"],
    makeup:["อยากรีวิวสีอื่น คอมเมนต์!","แชร์ลิปตัวเด็ดกัน!","กดซับรอรีวิวตัวต่อ!"],
    fragrance:["กลิ่นไหนคือตัวเด็ด มาแชร์!","น้ำหอมตัวเดียว ใช้ตัวไหน?","กดซับ ถ้าชอบน้ำหอม!"],
    haircare:["ใช้แชมพูอะไร คอมเมนต์!","มาแชร์วิธีดูแลผมกัน!"],
    sunscreen:["ใช้กันแดดตัวไหน มาแชร์!","กดซับรอรีวิวกันแดดตัวต่อ!"],
    fashion:["ใส่ไซส์อะไร คอมเมนต์!","ใครมีลุคเด็ดๆ มาแชร์!","กดซับรอลุคใหม่!"],
    sportswear:["ออกกำลังกายแบบไหน คอมเมนต์!","กดซับรอรีวิว!"],
    shoe:["ใส่ไซส์อะไร คอมเมนต์!","รองเท้าคู่เด็ด แชร์กัน!","กดซับรอรีวิวคู่ถัดไป!"],
    bag:["ใช้กระเป๋าอะไร มาแชร์!","กดซับรอรีวิว!"],
    jewelry:["ใส่เครื่องประดับแบบไหน มาแชร์!","กดซับรอคอลเลคชั่นใหม่!"],
    watch:["ใส่รุ่นไหน คอมเมนต์!","กดซับรอรีวิวเรือนถัดไป!"],
    sunglasses:["แว่นตัวเด็ด มาแชร์!","กดซับรอรีวิว!"],
    food:["อร่อยไหม ใครลองแล้วบ้าง?","แนะนำร้านอร่อยกัน!","กดซับรอเมนูถัดไป!"],
    snack:["ขนมตัวเด็ด มาแชร์กัน!","กินอะไรอยู่ คอมเมนต์!","กดซับรอรีวิวขนม!"],
    bakery:["ร้านเบเกอรี่เด็ด มาแชร์!","กดซับรอรีวิว!"],
    beverage:["ดื่มอะไรอยู่ คอมเมนต์!","แนะนำเครื่องดื่มกัน!"],
    coffee:["ดื่มกาแฟแบบไหน คอมเมนต์!","สายกาแฟ กดซับเลย!"],
    alcohol:["จิบอะไรอยู่ มาแชร์!","กดซับรอรีวิว!"],
    supplement:["ใครกินตัวนี้อยู่ คอมเมนต์ผลลัพธ์!","กดซับรอรีวิวตัวต่อ!"],
    protein:["สายฟิต ใช้เวย์ตัวไหน?","กดซับรอรีวิว!"],
    fitness:["ออกกำลังกายแบบไหน คอมเมนต์!","กดซับรอรีวิวอุปกรณ์!"],
    yoga:["โยคะท่าเด็ด มาแชร์!","กดซับรอรีวิว!"],
    home:["แต่งบ้านยังไง มาแชร์!","กดซับรอไอเดียแต่งบ้าน!"],
    furniture:["เฟอร์นิเจอร์ตัวเด็ด มาแชร์!","กดซับรอรีวิว!"],
    kitchen:["ใช้เครื่องครัวอะไร คอมเมนต์!","แม่บ้าน กดซับเลย!"],
    cleaning:["ใช้อะไรทำความสะอาด คอมเมนต์!","กดซับรอรีวิว!"],
    pet:["น้องหมา/แมว ใช้อะไรกัน?","ทาสแมว กดซับ!","โชว์น้องกัน คอมเมนต์!"],
    baby:["คุณแม่ใช้อะไรอยู่ มาแชร์!","กดซับรอรีวิวของใช้เด็ก!"],
    outdoor:["สายเอาท์ดอร์ พกอะไรกัน?","กดซับรอรีวิว!"],
    camping:["สายแคมป์ มีของเด็ดอะไร?","กดซับรอรีวิว!"],
    auto:["ดูแลรถยังไง คอมเมนต์!","กดซับรอรีวิว!"],
    book:["หนังสือเล่มเด็ด มาแชร์!","สายอ่าน กดซับ!"],
    stationery:["เครื่องเขียนตัวเด็ด มาแชร์!","กดซับรอรีวิว!"],
    toy:["ของเล่นตัวเด็ด มาแชร์!","กดซับรอรีวิว!"],
    craft:["ผลงาน DIY มาโชว์กัน!","กดซับรอไอเดียใหม่!"],
    gadget:["แกดเจ็ตตัวเด็ด มาแชร์!","กดซับรอรีวิว!","ใช้อะไรอยู่ คอมเมนต์!"],
    other:["ใช้แล้วเป็นไง คอมเมนต์!","กดซับรอรีวิวตัวต่อ!","แชร์ของเด็ดกัน!"],
};

// ─── Category Hashtag Pools ───
const CAT_HASHTAGS: Record<CatKey, string[]> = {
    smartphone:["#รีวิวมือถือ","#Smartphone","#มือถือใหม่","#Unboxing","#MobilePhoto"],
    laptop:["#รีวิวโน้ตบุ๊ค","#Laptop","#LaptopReview","#WFH","#คอมพิวเตอร์"],
    tablet:["#รีวิวแท็บเล็ต","#Tablet","#iPad","#DigitalNote"],
    gaming:["#Gaming","#เกมมิ่ง","#GamingGear","#GamingSetup","#Esports"],
    audio:["#รีวิวหูฟัง","#Earbuds","#Headphone","#AudioReview","#เสียงดี"],
    camera:["#รีวิวกล้อง","#Photography","#CameraReview","#Vlog","#ถ่ายรูป"],
    wearable:["#Smartwatch","#สมาร์ทวอทช์","#Wearable","#FitnessTracker"],
    tv:["#รีวิวทีวี","#SmartTV","#4K","#HomeTheater"],
    skincare:["#สกินแคร์","#Skincare","#SkincareRoutine","#ผิวสวย","#บำรุงผิว"],
    makeup:["#เมคอัพ","#Makeup","#MakeupReview","#แต่งหน้า","#ความสวย"],
    fragrance:["#น้ำหอม","#Perfume","#FragranceReview","#กลิ่นหอม","#รีวิวน้ำหอม"],
    haircare:["#ดูแลผม","#HairCare","#ผมสวย","#รีวิวแชมพู"],
    sunscreen:["#กันแดด","#Sunscreen","#SPF","#รีวิวกันแดด"],
    fashion:["#แฟชั่น","#Fashion","#OOTD","#ลุคประจำวัน","#แต่งตัว"],
    sportswear:["#ชุดออกกำลังกาย","#Sportswear","#Activewear","#GymOutfit"],
    shoe:["#รองเท้า","#Sneaker","#SneakerReview","#Kicks","#รีวิวรองเท้า"],
    bag:["#กระเป๋า","#Bag","#BagReview","#รีวิวกระเป๋า"],
    jewelry:["#เครื่องประดับ","#Jewelry","#Accessory","#สวยหรู"],
    watch:["#นาฬิกา","#Watch","#WatchReview","#รีวิวนาฬิกา"],
    sunglasses:["#แว่นตา","#Sunglasses","#EyeWear"],
    food:["#อาหาร","#Food","#FoodReview","#อร่อย","#Foodie","#กินอะไรดี"],
    snack:["#ขนม","#Snack","#SnackReview","#ของกินเล่น","#Yummy"],
    bakery:["#เบเกอรี่","#Bakery","#ขนมปัง","#เค้ก"],
    beverage:["#เครื่องดื่ม","#Drink","#สดชื่น","#รีวิวเครื่องดื่ม"],
    coffee:["#กาแฟ","#Coffee","#CoffeeLover","#คอกาแฟ","#BaristaThai"],
    alcohol:["#เครื่องดื่ม","#Drink","#Wine","#Beer"],
    supplement:["#อาหารเสริม","#Supplement","#สุขภาพดี","#วิตามิน","#Collagen"],
    protein:["#โปรตีน","#Protein","#Whey","#สายฟิต","#GymLife"],
    fitness:["#ฟิตเนส","#Fitness","#Workout","#HomeGym","#ออกกำลังกาย"],
    yoga:["#โยคะ","#Yoga","#Pilates","#Relax"],
    home:["#แต่งบ้าน","#HomeDecor","#ของแต่งบ้าน","#Interior","#มินิมอล"],
    furniture:["#เฟอร์นิเจอร์","#Furniture","#RoomTour","#ห้องนอน"],
    kitchen:["#เครื่องครัว","#Kitchen","#Cooking","#AirFryer","#แม่บ้าน"],
    cleaning:["#ทำความสะอาด","#Cleaning","#CleaningHacks","#บ้านสะอาด"],
    pet:["#สัตว์เลี้ยง","#Pet","#แมว","#หมา","#CatLover","#DogLover"],
    baby:["#แม่และเด็ก","#Baby","#คุณแม่","#ของใช้เด็ก"],
    outdoor:["#กลางแจ้ง","#Outdoor","#Adventure","#เอาท์ดอร์"],
    camping:["#แคมปิ้ง","#Camping","#Camp","#ธรรมชาติ"],
    auto:["#รถยนต์","#Car","#CarCare","#Dashcam"],
    book:["#หนังสือ","#Book","#BookReview","#สายอ่าน","#BookTok"],
    stationery:["#เครื่องเขียน","#Stationery","#Pen","#สายจด"],
    toy:["#ของเล่น","#Toy","#Lego","#Figure","#Unboxing"],
    craft:["#DIY","#Craft","#งานฝีมือ","#Handmade"],
    gadget:["#แกดเจ็ต","#Gadget","#Tech","#อุปกรณ์เสริม","#GadgetReview"],
    other:["#รีวิว","#Review","#แนะนำ","#ของดี","#ของมันต้องมี"],
};

// ─── Title Style Templates (สุ่มสไตล์ทุกครั้ง) ───
type TitleStyle = 'curiosity' | 'benefit' | 'hype' | 'challenge' | 'secret' | 'comparison' | 'fomo' | 'storytelling';
const TITLE_STYLE_TEMPLATES: Record<TitleStyle, { label: string; pattern: string; example: string }> = {
    curiosity:    { label: "Curiosity", pattern: "[คำถามชวนสงสัย] + [ชื่อสินค้า]", example: "M5 แรงไปไหม!? 🔥 MacBook Pro 14 #Shorts" },
    benefit:      { label: "Benefit", pattern: "[จุดขายหลัก] + [ชื่อสินค้า]", example: "แบตอึด 20 ชม.! 🔋 MacBook Pro M5 #Shorts" },
    hype:         { label: "Hype/ตื่นเต้น", pattern: "[คำสุดโต่ง] + [ชื่อสินค้า]", example: "ที่สุดของปี! 😱 MacBook Pro M5 #Shorts" },
    challenge:    { label: "Challenge/ท้าทาย", pattern: "อย่า[ทำ]...ก่อน[ทำ] + [ชื่อสินค้า]", example: "อย่าซื้อก่อนดูคลิปนี้! ⚠️ Galaxy S25 #Shorts" },
    secret:       { label: "Secret/ความลับ", pattern: "ความลับ/สิ่งที่คนไม่รู้ + [ชื่อสินค้า]", example: "ความลับที่ Samsung ไม่บอก! 🤫 Galaxy S25 #Shorts" },
    comparison:   { label: "เปรียบเทียบ", pattern: "[ตัวนี้] vs [ทั่วไป] + verdict", example: "ตัวนี้ vs ตัวฮิต ใครชนะ!? 🏆 #Shorts" },
    fomo:         { label: "FOMO/กลัวพลาด", pattern: "ใครยังไม่มี + [ชื่อสินค้า] = พลาดมาก", example: "ใครยังไม่มีตัวนี้ พลาดมาก! 😤 #Shorts" },
    storytelling: { label: "เล่าเรื่อง", pattern: "ใช้มา X เดือน/วัน + สรุปความรู้สึก", example: "ใช้มา 30 วัน สรุปให้! ✨ AirPods Pro #Shorts" },
};

const ALL_TITLE_STYLES = Object.keys(TITLE_STYLE_TEMPLATES) as TitleStyle[];

// ─── Description Angle Templates ───
const DESC_ANGLES: Record<CatKey, string[]> = {
    smartphone:["เปรียบเทียบกับรุ่นเดิม","จุดเด่นที่คนไม่ค่อยรู้","ใช้จริงในชีวิตประจำวัน"],
    laptop:["เหมาะกับใคร?","เทียบสเปค คุ้มแค่ไหน","ใช้ทำงานจริง ลื่นไหม"],
    tablet:["ใช้แทนโน้ตบุ๊คได้ไหม","สำหรับวาดรูป vs จดโน้ต"],
    gaming:["ใช้เล่นเกมจริง FPS เท่าไหร่","เทียบกับรุ่นเดิม","เซ็ตอัพครบจบในงบ"],
    audio:["เทียบเสียงจริง","ใส่นาน สบายไหม","ตัดเสียงได้แค่ไหน"],
    camera:["ตัวอย่างภาพจริง","เทียบกับมือถือ","สำหรับ Vlogger"],
    wearable:["วัดสุขภาพแม่นไหม","ดีไซน์ใส่ได้ทุกวัน","เทียบกับรุ่นก่อน"],
    tv:["ภาพจริง vs ภาพโฆษณา","เสียงดีแค่ไหน","ฟีเจอร์เด็ดที่ต้องรู้"],
    skincare:["ใช้จริง X วัน ผลลัพธ์เป็นไง","เหมาะกับสภาพผิวแบบไหน","เทียบกับตัวฮิต"],
    makeup:["สวอตช์สีจริง","ติดทนกี่ชม.","เหมาะกับผิวแบบไหน"],
    fragrance:["เปิดกลิ่น Top/Heart/Base","ติดทนกี่ชม.","กลิ่นนี้เหมาะกับโอกาสไหน"],
    haircare:["ใช้จริง X วัน ผมเปลี่ยนไหม","เหมาะกับผมแบบไหน"],
    sunscreen:["ทดสอบความวอก","ทาซ้ำง่ายไหม","เหมาะกับผิวมัน/แห้ง"],
    fashion:["มิกซ์แอนด์แมทช์ 3 ลุค","เทียบราคา คุ้มไหม","ผ้าจริง ใส่สบายไหม"],
    sportswear:["ออกกำลังจริง สบายไหม","ผ้าระบายอากาศดีไหม"],
    shoe:["ใส่เดินทั้งวัน เจ็บไหม","เทียบไซส์จริง","เปิดกล่องดูของจริง"],
    bag:["จุของได้เยอะแค่ไหน","ดีไซน์ vs ความใช้งาน","เหมาะกับสไตล์ไหน"],
    jewelry:["ใส่กับลุคไหนได้บ้าง","วัสดุจริง ดูหรูไหม"],
    watch:["ใส่จริง ดูสวยไหม","ฟีเจอร์เด็ดที่ต้องรู้"],
    sunglasses:["กัน UV ได้จริงไหม","ใส่แล้วเข้ากับหน้าไหม"],
    food:["สูตรเด็ดแบบง่าย","ลองชิมจริง อร่อยไหม","เหมาะกับใคร"],
    snack:["รีวิวรสชาติจริง","เปรียบเทียบแบรนด์","ติดใจแค่ไหน"],
    bakery:["เทียบกับร้านดัง","อบสด vs ซื้อร้าน"],
    beverage:["ลองชิมจริง","เปรียบเทียบรสชาติ"],
    coffee:["วิธีชงง่ายๆ","เทียบกับร้านกาแฟ","เมล็ดจากไหน"],
    alcohol:["จิบแล้ว กลิ่น/รสเป็นยังไง","เหมาะกับโอกาสไหน"],
    supplement:["กินจริง X วัน ผลลัพธ์","เหมาะกับใคร","เทียบกับตัวฮิต"],
    protein:["ชงจริง ละลายดีไหม","รสชาติ vs คุณค่า"],
    fitness:["ออกกำลังจริง ใช้ง่ายไหม","เทียบกับไปยิม"],
    yoga:["ท่าง่ายๆ สำหรับมือใหม่","เสื่อดีแค่ไหน"],
    home:["ก่อน vs หลังแต่ง","ไอเดียแต่งห้องง่ายๆ"],
    furniture:["นั่ง/นอนจริง สบายไหม","ประกอบง่ายไหม"],
    kitchen:["ทำอาหารจริง ใช้ง่ายไหม","เปรียบเทียบกับแบรนด์อื่น"],
    cleaning:["ทดสอบทำความสะอาดจริง","ก่อน vs หลังใช้"],
    pet:["น้องลองกิน/ใช้จริง","เปรียบเทียบแบรนด์","สัตวแพทย์แนะนำ"],
    baby:["ลูกใช้จริง ปลอดภัยไหม","เปรียบเทียบแบรนด์"],
    outdoor:["ทดสอบกลางแจ้งจริง","ทนแค่ไหน"],
    camping:["พกไปแคมป์จริง","ใช้งานง่ายไหม"],
    auto:["ติดตั้งจริง ง่ายไหม","ใช้แล้วต่างกันไหม"],
    book:["สรุปเนื้อหาสั้นๆ","อ่านแล้วได้อะไร"],
    stationery:["ทดสอบเขียนจริง","เปรียบเทียบยี่ห้อ"],
    toy:["เปิดกล่อง + รีวิว","เล่นจริง สนุกไหม"],
    craft:["ทำตามขั้นตอน","ผลงานสวยไหม"],
    gadget:["ใช้จริงในชีวิตประจำวัน","เปรียบเทียบตัวเลือก","คุ้มไหม ต้องซื้อไหม"],
    other:["รีวิวจริง ใช้แล้วเป็นไง","เปรียบเทียบตัวเลือก","คุ้มค่าไหม"],
};

/**
 * Build the prompt for Gemini to generate YouTube Shorts title + description
 * Now with category-specific hooks, power words, CTAs, and hashtags
 */
function buildYouTubeMetadataPrompt(
    productName: string,
    productDescription: string,
    cachedProductInfo: string,
    category: CatKey
): string {
    const catDisplay = CAT_DISPLAY[category] || category;
    const hooks = TITLE_HOOKS[category] || TITLE_HOOKS.other;
    const powers = POWER_WORDS[category] || POWER_WORDS.other;
    const ctas = CTA_POOL[category] || CTA_POOL.other;
    const hashtags = CAT_HASHTAGS[category] || CAT_HASHTAGS.other;
    const angles = DESC_ANGLES[category] || DESC_ANGLES.other;

    // Randomize selections for variety
    const pickedHooks = pickN(hooks, 3);
    const pickedPowers = pickN(powers, 3);
    const pickedCTA = pickRandom(ctas);
    const pickedHashtags = pickN(hashtags, 4);
    const pickedAngle = pickRandom(angles);

    // Randomize title style
    const chosenStyle = pickRandom(ALL_TITLE_STYLES);
    const styleInfo = TITLE_STYLE_TEMPLATES[chosenStyle];

    return `คุณเป็น YouTube Shorts Content Expert ระดับมืออาชีพ — เชี่ยวชาญเรื่อง SEO, Hashtag Strategy, Viral Title, และ Copywriting ภาษาไทย

## ข้อมูลสินค้า
- ชื่อสินค้า: "${productName}"
- หมวดหมู่: ${catDisplay}
${productDescription ? `- รายละเอียด: ${productDescription}` : ""}
${cachedProductInfo ? `- ข้อมูลจากการค้นหา: ${cachedProductInfo.substring(0, 500)}` : ""}

## งาน: สร้าง Title + Description สำหรับ YouTube Shorts ที่ทำให้คนอยากคลิก + อยากซื้อ

---

### กฎสำหรับ Title (ชื่อ):
1. ความยาวรวมไม่เกิน 55 ตัวอักษร (รวม #Shorts) — ถ้าเกินจะถูกตัดในหน้า Feed
2. โครงสร้าง: [Hook กระแทกใจ] + [ชื่อสินค้า/แบรนด์] + #Shorts
3. **ต้องลงท้ายด้วย #Shorts เสมอ** (ตัว S ใหญ่ — ห้ามเขียน #Short)
4. ต้องมีชื่อแบรนด์/สินค้าจริงอยู่ใน title
5. **บังคับใช้สไตล์ "${styleInfo.label}"**: ${styleInfo.pattern}
   ตัวอย่าง: "${styleInfo.example}"
6. ใส่ Emoji 1 ตัวที่เข้ากับอารมณ์ (🔥😱🤯💥✨💡🎯⚡🏆🤫) เพื่อดึงสายตา
7. แรงบันดาลใจจาก Hook เหล่านี้ (ดัดแปลงตามสินค้า ห้ามก๊อปเป๊ะ):
   ${pickedHooks.map(h => `• "${h}"`).join('\n   ')}
8. สอดแทรก Power Word: ${pickedPowers.join(', ')}

---

### กฎสำหรับ Description (คำอธิบาย):
1. **บรรทัด 1-2 (SEO Hook)**: เขียนสรุปจุดเด่นสินค้าแบบ "${pickedAngle}" — ใช้คำที่คนจะค้นหา, ใส่ Keyword สำคัญ
2. **บรรทัด 3 (Benefit Punch)**: บอกข้อดีเด่นสุด 1-2 ข้อ ใช้ Power Word: ${pickedPowers.join(', ')}
3. **CTA**: "${pickedCTA}" — เป็นกันเอง ชวนคุย ชวนคอมเมนต์
4. ใช้ emoji ประกอบพอเหมาะ (✅🔥💡⭐🎯💎)
5. **Hashtag Strategy 3 ระดับ** (รวม 7-10 อัน):
   - **บังคับ**: #Shorts #YouTubeShorts
   - **หมวดหมู่**: ${pickedHashtags.join(' ')}
   - **สินค้า**: #${productName.replace(/\s+/g, '')} + ชื่อแบรนด์/รุ่นเป็น hashtag
   - ผสม Hashtag ภาษาไทย + อังกฤษ
6. ความยาวรวม description ไม่เกิน 400 ตัวอักษร
7. เขียนเป็นภาษาไทย (ผสมอังกฤษเฉพาะชื่อแบรนด์/คำศัพท์)
8. **ห้ามใช้ภาษาบอท** — ต้องเป็นกันเองเหมือนเพื่อนป้ายยาเพื่อน ชวนน่าซื้อ

---

## รูปแบบ Output (JSON เท่านั้น ห้ามมี markdown):
{"title":"...#Shorts","description":"..."}

ตอบเป็น JSON เท่านั้น ห้ามมีข้อความอื่นนอกจาก JSON`;
}

/**
 * Generate YouTube metadata using OpenAI
 */
async function generateWithOpenAI(
    apiKey: string,
    prompt: string,
    productImage?: string | null
): Promise<string> {
    const messages: any[] = [];

    if (productImage) {
        messages.push({
            role: "user",
            content: [
                { type: "text", text: prompt + "\n\n(ดูรูปสินค้าประกอบเพื่อวิเคราะห์ feature เด่นสำหรับ description)" },
                { type: "image_url", image_url: { url: productImage, detail: "low" } }
            ]
        });
    } else {
        messages.push({ role: "user", content: prompt });
    }

    console.log("[YT Metadata] Generating with OpenAI...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: productImage ? "gpt-4o" : "gpt-4o-mini",
            messages,
            max_tokens: 500,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `OpenAI HTTP ${response.status}`);
    }

    const json = await response.json();
    return json.choices?.[0]?.message?.content || "";
}

/**
 * Generate YouTube metadata using Gemini
 */
async function generateWithGemini(
    apiKey: string,
    prompt: string,
    productImage?: string | null
): Promise<string> {
    const genAI = new GoogleGenerativeAI(apiKey);

    // Try with Google Search grounding first (for trending hashtags + category research)
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            tools: [{ googleSearch: {} } as any],
        });

        const parts: any[] = [prompt];

        if (productImage) {
            const base64Data = productImage.includes(',') ? productImage.split(',')[1] : productImage;
            const mimeType = productImage.includes('png') ? 'image/png' : 'image/jpeg';
            parts.push({ inlineData: { data: base64Data, mimeType } });
            parts[0] = prompt + "\n\n(ดูรูปสินค้าประกอบเพื่อวิเคราะห์ feature เด่นสำหรับ description)";
        }

        console.log("[YT Metadata] Generating with Gemini + Google Search grounding...");
        const result = await model.generateContent(parts);
        return result.response.text();
    } catch (error: any) {
        console.warn("[YT Metadata] Grounding failed, trying without:", error.message);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        return result.response.text();
    }
}

/**
 * Generate YouTube Shorts title + description using AI (OpenAI or Gemini based on user setting)
 */
export async function generateYouTubeMetadata(params: {
    productName: string;
    productDescription?: string;
    productImage?: string | null;
    cachedProductInfo?: string;
}): Promise<YouTubeMetadataResult> {
    const { productName, productDescription, productImage, cachedProductInfo } = params;

    if (!productName?.trim()) {
        throw new Error("กรุณาใส่ชื่อสินค้าก่อน");
    }

    // Check user's AI provider preference
    const provider = (localStorage.getItem("netflow_ai_provider") as 'openai' | 'gemini') || 'openai';
    const apiKey = await getApiKey(provider);
    if (!apiKey) {
        throw new Error(`ไม่พบ ${provider === 'gemini' ? 'Gemini' : 'OpenAI'} API Key — กรุณาตั้งค่าใน Settings`);
    }

    const category = detectCategory(productName);
    const catDisplay = CAT_DISPLAY[category] || category;
    console.log(`[YT Metadata] Using provider: ${provider.toUpperCase()} | Category: ${catDisplay} (${category})`);
    const prompt = buildYouTubeMetadataPrompt(
        productName,
        productDescription || "",
        cachedProductInfo || "",
        category
    );

    let text = "";
    if (provider === "openai") {
        text = await generateWithOpenAI(apiKey, prompt, productImage);
    } else {
        text = await generateWithGemini(apiKey, prompt, productImage);
    }

    // Parse JSON response
    console.log("[YT Metadata] Raw response:", text.substring(0, 200));

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*?"title"[\s\S]*?"description"[\s\S]*?\}/);
    if (!jsonMatch) {
        throw new Error("AI ตอบกลับในรูปแบบที่ไม่ถูกต้อง");
    }

    try {
        const parsed = JSON.parse(jsonMatch[0]) as YouTubeMetadataResult;

        // Validate + ensure #Shorts suffix in title
        let title = (parsed.title || productName).trim();

        // Fix common AI mistakes: #Short → #Shorts, missing #Shorts
        title = title.replace(/#Short\b(?!s)/gi, '#Shorts');
        if (!title.includes('#Shorts')) {
            title = title.replace(/\s*$/, '') + ' #Shorts';
        }

        // Trim to 60 chars max (keep #Shorts at end)
        if (title.length > 60) {
            const shortsTag = ' #Shorts';
            const maxBody = 60 - shortsTag.length;
            const body = title.replace(/\s*#Shorts\s*$/i, '').substring(0, maxBody).trim();
            title = body + shortsTag;
        }

        // Validate description — ensure #Shorts is in description too
        let description = (parsed.description || "").trim();
        if (!description.includes('#Shorts')) {
            description = description.trim() + '\n#Shorts';
        }
        if (description.length > 500) {
            description = description.substring(0, 500).trim();
        }

        return { title, description };
    } catch (parseErr) {
        console.error("[YT Metadata] JSON parse error:", parseErr);
        throw new Error("ไม่สามารถ parse ผลลัพธ์จาก AI ได้");
    }
}
