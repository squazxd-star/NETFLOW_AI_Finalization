# NETFLOW — GOD VERSION

## Version Info
- **Version Name**: NetflowVGOD (God Version)
- **Date**: 2026-03-13 23:23 (UTC+7)
- **Commit**: `315b704` — "fix: rewrite image upload steps 2,3 - remove broken neutralize/fallback code, implement clean uploadImageToPromptBar with strict thumbnail verification"
- **Branch**: `main`
- **Status**: ✅ WORKING — ทุกระบบทำงานถูกต้อง ณ จุดนี้
- **Build**: ✅ PASSED — zero TypeScript errors, all bundles built
- **Deliverable**: `NetflowVGOD.zip` (2.4 MB) — Chrome Extension พร้อมใช้งาน

---

## สถานะระบบ ณ จุดนี้

| ระบบ | สถานะ |
|------|--------|
| Step 1: เปิด Google Flow workspace | ✅ Working |
| Step 2: อัพโหลดภาพตัวละคร (Character) | ✅ **FIXED** — ใช้วิธีใหม่ |
| Step 3: อัพโหลดภาพสินค้า (Product) | ✅ **FIXED** — ใช้วิธีใหม่ |
| Step 4: ใส่ Image Prompt | ✅ Working |
| Step 5: กด Generate | ✅ Working |
| Step 6: รอภาพ Generated | ✅ Working |
| Step 7-10: ขั้นตอนที่เหลือ | ✅ Working |
| Overlay UI | ✅ Working |
| Chrome Extension manifest | ✅ Valid |
| macOS 2016 compatibility | ✅ Compatible (Chrome 62+) |

---

## สิ่งที่แก้ไขใน God Version (เทียบกับ version ก่อน)

### ลบออก (~1,078 บรรทัด)
- `neutralizeFileInputs()` — เปลี่ยน input.type ทำ React handler พัง
- `blockFileDialogs()` เวอร์ชันซับซ้อน — block 3 APIs + label intercept
- `restoreAndInject()` — พึ่งพา neutralized inputs
- `checkPromptBarThumbnail()` — ซ้ำซ้อน
- `dropFileOnPromptBar()` — fallback ไม่จำเป็น
- `pasteImageViaRealClipboard()` — 3 clipboard methods ซ้อนกัน ~170 บรรทัด
- `pasteImageIntoPromptBar()` — synthetic paste ที่ Flow ไม่ยอมรับ
- Old `uploadImageToPromptBar()` body — ~500 บรรทัด toggle logic + observer + diagnostic

### เพิ่มเข้ามา (~257 บรรทัด)
- `uploadImageToPromptBar()` เขียนใหม่ — 4 ขั้นตอนสะอาด:
  1. คลิกปุ่ม "+" (Create) ใน prompt bar
  2. หาและคลิกปุ่ม "Upload image" ใน Radix dialog
  3. Block native file dialog → inject base64 file ผ่าน DataTransfer
  4. รอยืนยัน thumbnail ขึ้นจริง (15s timeout)
- `findUploadButtonInDialog()` — ค้นหาปุ่ม Upload ใน Radix dialog
- `_clickUploadAndInject()` — block dialog + inject file + verify
- `_dragDropFallback()` — fallback drag-drop กรณีไม่พบ file input

### หลักการสำคัญของ God Version
1. **ไม่แตะ input.type** — ไม่เปลี่ยน type จาก "file" เป็น "text" อีก
2. **ไม่มี false positive** — คืน true เฉพาะเมื่อ thumbnail ขึ้นจริง
3. **React compatible** — reset `_valueTracker` + dispatch change/input events
4. **Chrome 62+ compatible** — ใช้ได้ตั้งแต่ macOS 2016

---

## Version Lineage
```
AUTOCOMPLETEX1 → AutoC2 → PERFECT AUTOMATION (d2b8b00)
  → macOS fix (6aac009)
  → Radix Dialog fix (6aac009)
  → ... → broken upload
  → GOD VERSION (315b704) ← คุณอยู่ที่นี่
```

---

## วิธี Restore God Version

### จาก Git
```bash
git checkout 315b704 -- src/content-flow.ts dist/src/content-flow.js
npm run build
```

### จากไฟล์
ใช้ `NetflowVGOD.zip` ที่อยู่ที่ `C:\Users\MSI\Desktop\NetflowVGOD.zip`

---

## Key Rule
> **ถ้าขั้นตอน upload ภาพพังอีก → กลับมาที่ commit `315b704` (God Version)**
> 
> อย่าเพิ่ม neutralizeFileInputs, อย่าเปลี่ยน input.type, อย่าเพิ่ม clipboard fallback ซ้อนๆ
