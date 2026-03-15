# NTCompleteVersionProcess 🌟
*บันทึกสถานะสมบูรณ์แบบของระบบ Netflow AI Video Automation (อัปเดตล่าสุด)*

เอกสารนี้รวบรวมหลักการทำงานและวิธีแก้ปัญหาสำคัญที่ทำให้ระบบ Automation ทำงานได้อย่างเสถียร 100% โดยเฉพาะในส่วนของการจัดการ UI ของ Google Flow, ระบบ Loop, และความเข้ากันได้กับทุกสเปคเครื่อง (โดยเฉพาะ macOS 8GB)

---

## 1. ระบบอัปโหลดรูปภาพ (The Perfected "God Version")
การอัปโหลดรูปลงใน Prompt Bar เป็นส่วนที่เปราะบางที่สุดเพราะ Google Flow ใช้ Radix UI และ React ระบบปัจจุบันใช้สถาปัตยกรรมดังนี้:

### 1.1 การค้นหาปุ่มกด (UI Targeting)
- **หาปุ่ม `+` (Create):** บังคับหาปุ่มที่มี `y > window.innerHeight * 0.6` เท่านั้น เพื่อป้องกันการไปกดปุ่ม `New Project` ที่อยู่ด้านบนของจอ
- **หาปุ่ม `Upload image`:** ค้นหา `<i>upload</i>` (Priority Search) พร้อมบังคับ `y > window.innerHeight * 0.4` เพื่อเลี่ยงปุ่ม `Upload media` ด้านบน

### 1.2 การบล็อค File Dialog (Main World Injection)
- **ปัญหาเดิม:** Content script รันใน Isolated World ทำให้การ override `HTMLInputElement.prototype.click` ไม่มีผลกับสคริปต์ของหน้าเว็บ
- **วิธีแก้:** ฉีดสคริปต์ลงไปใน **MAIN WORLD** ผ่าน `chrome.scripting.executeScript({ world: 'MAIN' })` (หรือ inline script fallback) เพื่อบล็อค native file dialog สำเร็จ 100%
- แปะ attribute `data-netflow-captured` ไว้ที่ input ที่ถูกกด เพื่อให้เรารู้ว่าต้องฉีดไฟล์เข้า input ตัวไหน (ป้องกันรูปไปโผล่เป็น Workspace Card)

### 1.3 การฉีดไฟล์ (File Injection)
- ใช้ `DataTransfer` สร้างไฟล์แล้วใส่เข้า `fileInput.files`
- รีเซ็ต `(fileInput)._valueTracker` เพื่อหลอกให้ React รู้สึกว่ามีการเปลี่ยนแปลง
- **CRITICAL FIX:** ส่ง Event `change` **แค่ครั้งเดียว** (`new Event('change', { bubbles: true })`) การส่งหลาย event (input, change ซ้อนกัน) จะทำให้เว็บอัปโหลดรูปซ้ำซ้อน

### 1.4 การตรวจสอบความสำเร็จ (Thumbnail Verification)
- ค้นหา `img` tag ที่อยู่บริเวณครึ่งล่างของจอ (bottom 40%) ขนาดระหว่าง 20-200px
- รอจนกว่าจำนวนรูปย่อจะเพิ่มขึ้น หรือ timeout 15 วินาที พร้อมดักจับสถานะอัปโหลด (เช่น `60%`)

---

## 2. ระบบจัดการ Loop (Loop vs Scene)
- **ปัญหาเดิม:** ผู้ใช้กด Loop 1 ครั้งแต่ระบบรัน 2 ครั้ง เพราะตัวแปร `loopCount` (จำนวนรอบการรันระบบ) ไปทับซ้อนกับ `sceneCount` (จำนวนฉาก/คลิปใน 1 วิดีโอ)
- **วิธีแก้สมบูรณ์:**
  - ตัดการ Fallback เข้าหากันอย่างเด็ดขาด
  - `loopCount: data.loopCount || 1` (จำนวนรอบที่ Extension จะสั่งทำซ้ำ)
  - `sceneCount: data.sceneCount || 1` (จำนวนฉากที่ Gemini จะคำนวณ)
  - `videoDuration` คำนวณจาก `sceneCount * 8` วินาทีเสมอ (ไม่เอา `loopCount` มาเกี่ยว)

---

## 3. ความเข้ากันได้และประสิทธิภาพ (macOS & 8GB RAM Safe)
ระบบถูกจูนให้ทนทานต่อเครื่องสเปคต่ำและการจัดการหน่วยความจำของ Mac:

- **Image Compression:** รูปภาพ Base64 ก่อนอัปโหลดจะถูกบีบอัดให้เหลือขนาดสูงสุด 1024px JPEG quality 0.8 เสมอ เพื่อลดภาระ RAM (แก้ปัญหาหน้าเว็บ Crash บน Mac 8GB)
- **Tab Throttling Defense:** Mac มักจะดรอปการทำงานของ Tab ที่อยู่เบื้องหลัง ระบบใช้ Web Worker ควบคู่กับ Chrome Messaging และ fallback ด้วย `setTimeout` เพื่อให้สคริปต์เดินต่อได้แม้ Tab ไม่ active
- **Timing & Sleep:** เพิ่มระยะเวลาการรอ (Wait time) ในจังหวะที่ UI ค่อยๆ โหลด (เช่น รอ popover เปิดนานขึ้น 2-5 วินาที)
- **Clipboard API:** ใช้ `navigator.clipboard` ควบคู่กับ ClipboardEvent สำหรับวางข้อความ (Paste) ซึ่งทำงานได้ดีที่สุดบน macOS

---

## 4. กระบวนการ Build (Build Process)
ระบบนี้ประกอบด้วยหลายส่วนที่แยกจากกัน ต้อง Build ให้ครบทุกส่วน:
- **Main App (UI & Logic):** `npx vite build`
- **Content Scripts (แยกต่างหาก):**
  - `npx vite build -c vite.content-flow.config.ts` (สคริปต์ฝั่ง Google Flow)
  - `npx vite build -c vite.content-grok.config.ts` (สคริปต์ฝั่ง Grok)
  - `npx vite build -c vite.content-tiktok.config.ts` (สคริปต์ฝั่ง TikTok)
  - `npx vite build -c vite.content-tiktok-upload.config.ts` (สคริปต์ฝั่งอัปโหลด TikTok)
  - `npx vite build -c vite.content-youtube-upload.config.ts` (สคริปต์ฝั่ง YouTube)
*หาก Build ไม่ครบ จะทำให้หน้าต่างส่วนขยาย Error "ไม่สามารถโหลด JavaScript"*

---
**สถานะ:** ✅ ถือเป็นสมบูรณ์แบบ (Production-Ready)
**คำแนะนำ:** หากในอนาคตมีการอัปเดต หรือ UI ของ Google Flow เปลี่ยนแปลง ให้ยึดเอกสารนี้เป็น Base Baseline ในการปรับแก้
