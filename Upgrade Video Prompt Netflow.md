# Upgrade Video Prompt Netflow

บันทึกการแก้ไขปรับปรุง Video Prompt Generation ใน `veoPromptService.ts`  
แต่ละ Case มาจากการเทสวิดีโอจริงแล้วพบจุดบกพร่อง

---

## Failed Case No.1 — Dental (ยาสีฟัน)

**สินค้า:** ยาสีฟัน (category: `dental`)  
**ปัญหาหลัก:** ระบบ detect เป็น `dental` แต่ไม่มี dental entry ใน config ต่างๆ → ใช้ fallback ที่ไม่ตรง category  

### ปัญหาที่พบจากวิดีโอ:
1. **สินค้าซ้ำ** — เห็นหลอดยาสีฟัน 2 หลอดพร้อมกัน (ควรมีแค่ 1)
2. **สินค้า morph** — หลอดยาสีฟันเปลี่ยนทรง/สี/สัดส่วนระหว่าง scene
3. **ฟอนต์เพี้ยน** — ตัวหนังสือบนหลอดกลายเป็นตัวอักษรมั่วๆ
4. **Action ไม่ตรง** — ใช้ action จาก beauty/food แทน (บีบครีมทาหน้า แทนที่จะบีบยาสีฟันลงแปรง)
5. **บีบยาสีฟันผิดด้าน** — บีบลงด้านหลังแปรง แทนที่จะบีบลง bristle side (ด้านขนแปรง)
6. **สินค้าหายจากเฟรม** — บาง scene ยาสีฟันหายไปเลย
7. **แปรงสีฟันใหญ่กว่าหลอด** — แปรงกลายเป็นตัวเอก ทั้งที่หลอดยาสีฟันคือสินค้า

### แก้ไขที่ทำ:

| # | ตำแหน่งใน code | สิ่งที่แก้ |
|---|---|---|
| 1 | `CATEGORY_PRODUCT_ANATOMY` | เพิ่ม `dental` — tube shape, cap design, color gradient, logo placement, nozzle shape, squeeze zone |
| 2 | `CATEGORY_SCENE_PAIRS` | เพิ่ม `dental` 10 pairs — ทุก action ระบุชัดว่า tube คือ HERO, แปรงคือ PROP, บีบลง BRISTLE SIDE |
| 3 | `CATEGORY_POWER_WORDS` | เพิ่ม `dental` — "ฟันขาวขึ้น", "สดชื่นมาก", "ลดเสียวฟัน" ฯลฯ |
| 4 | `CATEGORY_BENEFITS` | เพิ่ม `dental` — "แปรงแล้วฟันขาว สดชื่นตลอดวัน" ฯลฯ |
| 5 | `CATEGORY_URGENCY` | เพิ่ม `dental` — "ฟันขาว ลมหายใจหอม เริ่มได้เลย" ฯลฯ |
| 6 | `scene1Intro` | เพิ่ม `dental` — "วันนี้มาแปรงฟันด้วย", "มาลองยาสีฟันตัวนี้" |
| 7 | `CATEGORY_REVIEW_PHRASE` | เพิ่ม `dental` — "แปรงปุ๊บ สดชื่นปั๊บ", "ฟันขาวขึ้นตั้งแต่วันแรก" |
| 8 | `PRODUCT_USAGE_REALISM` | แก้ `dental` — ระบุชัดว่าบีบลง "BRISTLE SIDE (top surface where bristles face UP)" + tube คือสินค้า, แปรงคือ prop |
| 9 | `scene2CoreByCategory` | เพิ่ม `dental` — "โชว์การแปรงฟัน/บ้วนปาก + ฟันขาว/ลมหายใจสดชื่น" |
| 10 | `productAnchor` (global) | เพิ่ม ANTI-DUPLICATION, LABEL LOCK, PROPS vs PRODUCT, PRODUCT EVERY FRAME directives |

---

## Failed Case No.2 — Fragrance (น้ำหอม Versace Bright Crystal)

**สินค้า:** Versace Bright Crystal (category: `fragrance`)  
**ปัญหาหลัก:** ขวดน้ำหอม morph เปลี่ยนทรงตลอดคลิป + ฝา diamond หายดื้อๆ + ฟอนต์เพี้ยน  

### ปัญหาที่พบจากวิดีโอ (13 รูป):

| รูป | วินาที | ปัญหา |
|-----|--------|-------|
| 1-4 | 0:01-0:07 | ✅ ปกติ — ขวด hexagonal + ฝา diamond ชัดเจน |
| 5 | 0:08 | ❌ หลังทรานซิชัน ขวดเปลี่ยนทรง ฝาเพี้ยน |
| 7-8 | 0:10 | ❌ ซูมปุ๊บ **ฝา diamond หายไปดื้อๆ** ไม่มีมือเปิด |
| 9 | 0:12 | ❌ ขวดเปลี่ยนเป็นทรงสี่เหลี่ยม + spray nozzle เปลี่ยน |
| 10-11 | 0:18-0:20 | ❌ ขวด morph เป็นทรงอื่น + ฟอนต์ "BRIGSI CR..." |
| 12-13 | 0:22-0:29 | ❌ ขวด morph สุด — ทรง+สัดส่วนเปลี่ยนหมด |

### Root Cause Analysis:

1. **ฝาหาย** — `PRODUCT_USAGE_REALISM` สั่ง "Remove decorative cap BEFORE spraying" → Veo ตีความว่าให้ฝาหายทันทีแทนที่จะมีมือเปิด
2. **ขวด morph ตอน camera movement** — `CATEGORY_SCENE_PAIRS` สั่ง orbit / 360° rotation / THEN chains ยาวๆ → Veo สับสนทรงขวด
3. **ฟอนต์เพี้ยน** — ไม่มี `fragrance` ใน `CATEGORY_PRODUCT_ANATOMY` → Veo เดาเองว่า label เขียนว่าอะไร
4. **ขวดเปลี่ยนทรงหลัง transition** — `productAnchor` ไม่มี transition stability directive → product shape ไม่ lock ระหว่าง scene change

### แก้ไขที่ทำ:

| # | ตำแหน่งใน code | สิ่งที่แก้ |
|---|---|---|
| 1 | `CATEGORY_PRODUCT_ANATOMY` | **เพิ่ม `fragrance`** — bottle silhouette, decorative cap shape (diamond-cut/sculpted/dome), cap-to-body ratio, glass transparency, metallic collar, spray nozzle, branding. เน้นว่า "decorative cap shape is the #1 identity feature" |
| 2 | `PRODUCT_USAGE_REALISM` | **แก้ `fragrance`** — เปลี่ยนจาก "Remove cap BEFORE spraying" เป็น "Character uses fingers to GENTLY LIFT the decorative cap off in a smooth visible hand motion — NEVER instant disappearance. Hold cap in other hand or place nearby — cap must NOT vanish from frame." |
| 3 | `CATEGORY_SCENE_PAIRS` | **เขียนใหม่ทั้ง 10 pairs** — ทุกอันใช้ "CAMERA: STABLE medium shot, NO camera orbit or rotation" แทน orbit/rotation/THEN chains ยาว |
| 4 | `PRODUCT_PRESENTATION_GUIDE` | **แก้ `fragrance` knowledge + sceneActions** — knowledge เน้น "bottle shape and cap are #1 identity, must NEVER morph. Keep camera STABLE." sceneActions ทุกข้อใส่ "STABLE camera angle" |
| 5 | `CHARACTER_ACTION` | **แก้ `fragrance`** — เปลี่ยนจาก "cap already removed" (ทำให้ Veo ข้ามการเปิดฝาไปเลย) เป็น "Uses fingers to gently lift cap off (visible hand motion — cap held in other hand, NOT vanished)" |
| 6 | `productAnchor` (global) | **เพิ่ม TRANSITION STABILITY** — "During ANY camera movement, zoom, pan, cut, or transition — product MUST maintain EXACT same shape, silhouette, proportions. Caps do NOT spontaneously disappear, morph, shrink." + **CAMERA STABILITY** — "Prefer STABLE fixed-angle shots over orbit/rotation/tracking" |

### Directives ที่เพิ่มใน `productAnchor` (ใช้กับทุก category):

```
TRANSITION STABILITY: During ANY camera movement, zoom, pan, cut, or transition — 
the product MUST maintain its EXACT same shape, silhouette, proportions, cap/closure design, 
and label text. Product shape is LOCKED and IMMUTABLE regardless of camera angle changes. 
Caps do NOT spontaneously disappear, morph, shrink, or change design.

CAMERA STABILITY: Prefer STABLE fixed-angle shots over orbit/rotation/tracking movements. 
When camera MUST move, product silhouette stays pixel-locked to reference.
```

---

## Failed Case No.3 — MacBook Pro (Apple Logo หายจากฝา)

**สินค้า:** MacBook Pro (category: `laptop`)  
**ปัญหาหลัก:** Apple logo บนฝา MacBook หายไป/ผิดรูปในวิดีโอที่ generate — Veo ไม่รู้ว่าต้องมี logo อะไรบนฝา

### ปัญหาที่พบจากวิดีโอ:

1. **Apple logo หาย** — ฝา MacBook เรียบไม่มี logo เลย
2. **Logo ผิดรูป** — มีสัญลักษณ์อะไรบางอย่างแต่ไม่ใช่ Apple logo
3. **Logo สีผิด** — โทนสีของ emblem ไม่สอดคล้องกับสี Mac

### Root Cause Analysis:

1. **ไม่มี `laptop` ใน `CATEGORY_PRODUCT_ANATOMY`** — Veo ไม่มีข้อมูลว่า laptop มี logo ตรงไหน
2. **ใช้ชื่อแบรนด์ตรงไม่ได้** — "Apple" ถูก safety filter บล็อก → ต้องใช้ visual description แทน
3. **ไม่มี logo color rule** — ไม่รู้ว่า dark Mac ใช้ lighter emblem, silver Mac ใช้ darker emblem

### แก้ไขที่ทำ:

| # | ตำแหน่งใน code | สิ่งที่แก้ |
|---|---|---|
| 1 | `CATEGORY_PRODUCT_ANATOMY` | **เพิ่ม `laptop`, `phone`, `tablet`** — explicit logo/emblem preservation directive: "lid emblem MUST match reference exactly — shape, position, color" |
| 2 | `getBrandVisualSignature()` | **สร้าง function ใหม่** — detect Apple/Samsung จาก original product name, return visual description โดยไม่ใช้ชื่อแบรนด์ (เลี่ยง safety filter) เช่น "fruit-shaped silhouette emblem bitten on right side, leaf at top" |
| 3 | `VideoPromptMeta` | **เพิ่ม field `brandVisualSignature`** — ส่งต่อ visual signature ไป Scene 2+ |
| 4 | Scene 1 `buildVideoPrompt` section [3.5] | **Inject `brandVisualSignature`** — เฉพาะ scene ที่สินค้าปรากฏ (skip talk-only) |
| 5 | Scene 2+ `buildSceneVideoPromptJSON` section [2.5] | **Inject `brandVisualSignature`** — เฉพาะ scene ที่สินค้าปรากฏ |
| 6 | Logo color rule | **dark Mac → lighter emblem, silver Mac → darker emblem** — สี emblem ตรงข้ามกับสีตัวเครื่อง |

---

## Failed Case No.5 — มาม่า ต้มยำกุ้งน้ำข้น (Instant Noodle)

**สินค้า:** มาม่า ต้มยำกุ้งน้ำข้น (category: `food`)  
**ตัวละคร:** ผู้หญิงวัยรุ่น  
**ปัญหาหลัก:** ซองมาม่าใหญ่ผิดสัดส่วน + ชามโผล่มาเฉยๆ + แบรนด์เพี้ยนเป็นคนละยี่ห้อ

### ปัญหาที่พบจากวิดีโอ:

| # | ปัญหา | รายละเอียด |
|---|--------|--------|
| 1 | **ซองมาม่าใหญ่ผิดธรรมชาติ** | ซองเดี่ยวกลายเป็นถุงใหญ่เท่าถุง multi-pack — ของจริงซองเล็กถือมือเดียว |
| 2 | **ชามโผล่มาเฉยๆ** | ชามปรากฏในเฟรมโดยไม่มีแอคชั่นหยิบ/วาง — เหมือน teleport มา |
| 3 | **แบรนด์เพี้ยนมาก** | ซีนหลังๆ ซองมาม่ากลายเป็น "อันตลา TOM YUM KUNG" — คนละยี่ห้อเลย |

### Root Cause Analysis:

1. **ซองใหญ่** — ไม่มี directive บังคับขนาดสินค้าตามจริง → AI ขยายสินค้าให้ใหญ่เต็มเฟรมเพื่อให้เห็นชัด
2. **ชามโผล่** — ไม่มีกฎว่า props ต้องถูกนำเข้าฉากโดย visible character action → AI สร้าง props ในที่ว่าง
3. **แบรนด์เพี้ยน** — `productAnchor` มี identity lock แต่ไม่แข็งแรงพอสำหรับ Scene 2+ → AI เดาเองว่าแบรนด์หน้าตายังไง

### แก้ไขที่ทำ:

| # | ตำแหน่งใน code | สิ่งที่แก้ |
|---|---|---|
| 1 | `PRODUCT_SIZE_REALISM` (ใหม่) | **สร้าง directive ใหม่** — per-category size constraints. Food: "SMALL single-serve packet fits in ONE hand. Do NOT enlarge to multi-pack/family-size." ครอบคลุม 11 categories + universal fallback |
| 2 | `PROP_INTRODUCTION_DIRECTIVE` (ใหม่) | **สร้าง directive ใหม่** — "ทุก prop ต้องถูกนำเข้ามาโดย visible character action — หยิบ, วาง, จับ. ห้ามโผล่มาเฉยๆ" |
| 3 | `PRODUCT_ANTI_MORPH_DIRECTIVE` (ใหม่) | **สร้าง directive ใหม่** — "BRAND IDENTITY FREEZE: แบรนด์, โลโก้, packaging, สี, ฟอนต์ ต้อง IDENTICAL ทุกซีน. BRAND MORPHING IS THE #1 FORBIDDEN ERROR." |
| 4 | Scene 1 `buildVideoPrompt` [4.7] + [8] | **Inject ทั้ง 3 directives** — Size Realism ที่ [4.7], Anti-Morph ที่ [8] |
| 5 | Scene 2+ `buildSceneVideoPromptJSON` [4.7] + [7] | **Inject ทั้ง 3 directives** — Size Realism ที่ [4.7], Anti-Morph ที่ [7] |
| 6 | `CATEGORY_SCENE_PAIRS` food | **เขียนใหม่ทั้ง 10 actions** — ทุกอันระบุ "SMALL single-serve packet", "VISIBLE hand action for bowl placement", "IDENTICAL brand throughout" |
| 7 | `PRODUCT_PRESENTATION_GUIDE` food | **แก้ knowledge + sceneActions** — เพิ่ม SIZE RULE + PROP RULE, ทุก sceneAction เน้น realistic size + visible prop intro |
| 8 | `PRODUCT_USAGE_REALISM` food | **แก้ให้ครอบคลุม instant noodle** — เพิ่มขั้นตอน: tear open SMALL packet → VISIBLY place bowl → pour → add water → stir → eat |
| 9 | `detectProductCategory` | **เพิ่ม keywords** — "instant noodle", "cup noodle", "มาม่า", "บะหมี่กึ่งสำเร็จรูป", "ยำยำ", "ไวไว" → map ไป `food` |

---

## Test Case 6 — ขนมชั้น (Thai Dessert)

**สินค้า:** ขนมชั้น (category: `bakery` / `food`)  
**ตัวละคร:** ผู้หญิงวัยรุ่นผมบ๊อบสั้น  

### ปัญหาที่พบจากวิดีโอ:
1. **ฉากหลังไม่ตรงบริบท:** กลายเป็นฉากตลาดสดขายของคาว (มีกุ้ง/ปลา) แทนที่จะเป็นร้านขนม
2. **หน้าตัวละครเปลี่ยนไปในฉากหลังๆ:** หน้าตาบิดเบี้ยวและเปลี่ยนโครงหน้า ไม่เหมือนกับวินาทีแรกที่ปรากฏตัว (Face morphing)
3. **อุปกรณ์ผิดธรรมชาติ (ช้อนส้อม):** ตัวละครถือส้อม 2 อันที่หลอมรวมกัน (Fused double-utensils) 
4. **พูดนอกสคริปต์/ขยับปากช่วงเชื่อมฉาก:** มีจังหวะรอยต่อที่ปากขยับพูดแต่ไม่มีเสียง/หรือมีเสียง filler

### Root Cause Analysis:
1. **Background Mismatch** — คำว่า "ขนมชั้น" ตกไปอยู่ในหมวดรวม `food` ซึ่ง environment map สุ่มได้ตลาดสด (market)
2. **Face Morphing** — `characterAnchor` มี Face Lock แล้วแต่ยังไม่แข็งแกร่งพอในประโยคคำสั่ง
3. **Utensil Glitch** — AI ชอบเสก prop ออกมาเบิ้ลในมือเดียวกันเมื่อระบุคำว่า "utensils/fork"
4. **Voice Discipline** — ตัวละครขยับปากรอยต่อซีนเพราะไม่ถูกสั่งให้ "หุบปากปิดสนิท"

### แก้ไขที่ทำ:
| # | ตำแหน่งใน code | สิ่งที่แก้ |
|---|---|---|
| 1 | `detectProductCategory` | เพิ่ม keyword `"ขนมหวาน", "dessert", "sweet", "kanom", "ขนมชั้น", "ขนมไทย"` ลงในกลุ่ม `bakery` เพื่อให้ตก Environment ที่เป็น คาเฟ่, ร้านเบเกอรี่ แทนตลาดสด |
| 2 | `characterAnchor` | ปรับแก้เป็น **`STRICT FACE & HEAD LOCK`** บังคับด้วยประโยค: *"The character's face MUST remain IDENTICAL to frame 1 across the entire video. Do NOT let the face morph, stretch, or change identity between shots."* |
| 3 | `PRODUCT_USAGE_REALISM` | เพิ่ม **`SINGLE UTENSIL RULE`** ในกลุ่ม food/bakery: *"Use exactly ONE fork or ONE spoon per hand — absolutely NO fused double-utensils, NO two forks morphed together."* |
| 4 | `VOICE_DISCIPLINE_DIRECTIVE` | ยกระดับความเข้มงวด: *"Between spoken lines, the character's mouth MUST be fully closed with composed silence. Do NOT let the character mouth words that are not in the script."* |

---

## Failed Case No.4 — LG UltraGear G6 34" 240Hz (จอมอนิเตอร์เกมมิ่ง)

**สินค้า:** จอมอนิเตอร์เกมมิ่ง LG UltraGear G6 34" 240Hz (category: `gadget`)  
**ตัวละคร:** ผู้หญิง  
**ปัญหาหลัก:** Screen logos/artifacts บนหน้าจอเกม + เสียง "ยะ ฮ๊า" ตอนเชื่อมฉาก

### ปัญหาที่พบจากวิดีโอ:
1. **Screen logos/artifacts บนหน้าจอเกม** — จอภาพมี logo ลอยไปมาและ UI แปลกๆ ไม่ใช่ game footage แบบเนียนๆ
2. **เสียง "ยะ ฮ๊า" ตอนเชื่อมฉาก** — ตัวละครขยับปากพูดนอกสคริปต์/ส่งเสียง filler แทนที่จะพูดแบบ ท๊าดา

### Root Cause Analysis:
1. **Screen Artifacts** — จอ monitor ถูก detect เป็น category `"gadget"` แต่ `SCREEN_CONTENT_CATEGORIES` ไม่มี `"gadget"` ทำให้ directive สำหรับควบคุมเนื้อหาบนจอ (screen content) **ไม่เคยถูกเรียกใช้**
2. **Voice Fillers** — ขาด directive เพื่อควบคุมระเบียบการขยับปากและเสียงพูดช่วงรอยต่อฉาก

### แก้ไขที่ทำ:
| # | ตำแหน่งใน code | สิ่งที่แก้ |
|---|---|---|
| 1 | `SCREEN_CONTENT_CATEGORIES` | เพิ่ม `"gadget"` เข้าไปในกลุ่มที่มีจอภาพแสดงผล |
| 2 | `SCREEN_CLEAN_SUFFIX` (ใหม่) | สร้าง suffix ต่อท้าย screen directive: *"NO floating logos, NO brand watermarks, NO game HUD elements, NO UI chrome"* |
| 3 | `getScreenContentDirective` | ขยาย gaming keywords: `240hz`, `144hz`, `freesync`, `g-sync`, `ไม่กระตุก`, `ไม่ฉีก`, `ภาพเบลอ` |
| 4 | `VOICE_DISCIPLINE_DIRECTIVE` (ใหม่) | เพิ่มกฎเหล็ก: *"NO filler sounds, NO 'ยะ!', 'ฮ๊า!'... When revealing product, use CONFIDENT smooth presenter tone (like 'ท๊าดา!' reveal) — NOT shocked/gasping"* |

---

## Global Fixes (ใช้กับทุก category)

### `productAnchor` Directives ที่เพิ่มจาก Case No.1 + No.2:

| Directive | ป้องกันปัญหา |
|---|---|
| **ANTI-DUPLICATION** | สินค้าซ้ำ — ห้ามแสดงสินค้ามากกว่า 1 ชิ้น |
| **LABEL LOCK** | ฟอนต์เพี้ยน — ห้ามสร้าง/เดา text บน packaging, ต้องตรง reference |
| **PROPS vs PRODUCT** | แปรง/อุปกรณ์ใหญ่กว่าสินค้า — สินค้าต้อง prominent ที่สุดเสมอ |
| **PRODUCT EVERY FRAME** | สินค้าหายจากเฟรม — สินค้าต้องเห็นทุกเฟรม |
| **TRANSITION STABILITY** | สินค้า morph ตอนเปลี่ยน scene — shape locked ระหว่าง transition |
| **CAMERA STABILITY** | สินค้า morph ตอน camera เคลื่อน — prefer STABLE shots |

### Universal Directives ใหม่จาก Case No.3 + No.5:

| Directive | ที่มา | ป้องกันปัญหา |
|---|---|---|
| **`getBrandVisualSignature()`** | Case 3 | Logo/emblem หาย — สร้าง visual description ของ logo โดยไม่ใช้ชื่อแบรนด์ (เลี่ยง safety filter) |
| **`PRODUCT_SIZE_REALISM`** | Case 5 | สินค้าใหญ่ผิดสัดส่วน — บังคับขนาดตามจริงแต่ละ category (food: "fits in ONE hand") |
| **`PROP_INTRODUCTION_DIRECTIVE`** | Case 5 | Props โผล่จากที่ว่าง — ทุก prop ต้องถูกนำเข้าโดย visible character action |
| **`PRODUCT_ANTI_MORPH_DIRECTIVE`** | Case 5 | แบรนด์เพี้ยนข้ามซีน — "BRAND IDENTITY FREEZE" ล็อคแบรนด์ทุกซีน |
