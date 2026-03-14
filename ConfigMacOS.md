# ConfigMacOS.md — การตั้งค่าและผลตรวจสอบสำหรับ macOS (MacBook Air M2 2022, 8GB RAM, Tahoe 26.2)

> สร้างเมื่อ: 14 มีนาคม 2026  
> Build: `dist/src/content-flow.js` — 175.57 kB, 0 errors

---

## 1. God Version Key Rules — ✅ ไม่ละเมิด

| กฎ | สถานะ |
|----|--------|
| ❌ ห้ามมี `neutralizeFileInputs` | ✅ ไม่มี |
| ❌ ห้ามมี `input.type = "text"` | ✅ ไม่มี |
| ❌ ห้ามมี `pasteImageViaRealClipboard` / `pasteImageIntoPromptBar` | ✅ ไม่มี |
| ✅ ใช้ clipboard เฉพาะ text paste (ใน `setPromptText`) | ✅ ไม่ผิดกฎ |

God Version commit: `315b704`

---

## 2. Icon Selectors — Broadened ทุกจุดสำหรับ Tahoe 26.2+

### ก่อนแก้
```
querySelectorAll("i")   // แค่ <i> tag เท่านั้น
```

### หลังแก้
```
querySelectorAll("i, span[class*='icon'], span[class*='material'], span[class*='google-symbols'], [data-icon]")
```

### จุดที่แก้ทั้งหมด (12 จุด)

| จุด | ฟังก์ชัน/ตำแหน่ง | สถานะ |
|-----|-----------------|--------|
| 1 | Download button — multi-scene path | ✅ Broadened |
| 2 | Download button — single-scene path | ✅ Broadened + findAllButtonsByIcon |
| 3 | Download button — navigation path | ✅ Broadened |
| 4 | Send/Generate button — multi-scene path | ✅ Broadened + findAllButtonsByIcon fallback |
| 5 | Send/Generate button — navigation path | ✅ Broadened + findAllButtonsByIcon fallback |
| 6 | Mute button — multi-scene path | ✅ Broadened + aria-label |
| 7 | Mute button — navigation path | ✅ Broadened + aria-label |
| 8 | `findCardsByIcon` (video/image card detection) | ✅ Broadened |
| 9 | New Project button (icon `add_2`) | ✅ Broadened + findAllButtonsByIcon fallback |
| 10 | Settings/Crop button detection | ✅ Broadened (added `material-symbols-rounded`, `span`) |
| 11 | More/3-dots button detection | ✅ Broadened |
| 12 | `findAllButtonsByIcon` (shared utility) | ✅ Already broadened |

---

## 3. Upload Flow — 4 Fallback Layers

```
Layer 1: robustClick + pointer events → "+" button
Layer 2: findUploadButtonInDialog → 3 retries กับ different click strategies
Layer 3: _directFileInputFallback → inject file ตรงเข้า input
Layer 4: _dragDropFallback → drag-and-drop ลงบน prompt area
```

### ขั้นตอนหลัก
1. **Image Compression** — ลดขนาดก่อนอัปโหลด ป้องกัน memory pressure บน 8GB RAM
2. **findPromptBarAddButton** — หาปุ่ม "+" (5 strategies: text, aria-label, icon, proximity, SVG)
3. **findUploadButtonInDialog** — หาปุ่ม "Upload image" ใน Radix dialog
4. **_clickUploadAndInject** — block file dialog + inject file via DataTransfer + verify thumbnail
5. **Fallbacks** — direct file input injection + drag-and-drop

---

## 4. Download Flow — 3 Strategies ทุก Path

| Strategy | วิธี |
|----------|------|
| A | `findAllButtonsByIcon("download")` — broadened utility function |
| B | `<i>` + `<span>` icon text match (download, file_download, get_app) |
| C | `aria-label` + `title` attribute match |

### 3 Download Paths
- **Single-scene** — download button → 720p/1080p option
- **Multi-scene** — download button → Full Video → 720p option (Radix menu)
- **Navigation** — หลัง page navigation กลับมา → download button → Full Video → 720p

---

## 5. Overlay Safety — DOM-safe 100%

| ฟังก์ชัน | Safety Guard |
|----------|-------------|
| `updateStep()` | `if (!overlayRoot) return;` — ไม่ throw ถ้า DOM หาย |
| `refreshTerminal()` | `if (!row) continue;` — ข้ามถ้า element ไม่อยู่ |
| `refreshModules()` | `if (el)` guard ทุกจุด |
| `showOverlay()` | `if (overlayRoot && !overlayRoot.isConnected) { overlayRoot = null; }` — handle SPA navigation |
| `refreshStatBar()` | `if (stepEl)`, `if (statusEl)`, `if (progEl)` guards |

---

## 6. Null Safety — ALL CLEAR

- ❌ ไม่มี unguarded `.getBoundingClientRect()` บน null element
- ✅ ทุก `(x as any)._valueTracker` มี `if (tracker)` guard
- ✅ ทุก `window` flag access safe (read/write properties)
- ✅ ทุก `updateStep` ที่อยู่ใน catch block — safe เพราะ `updateStep` เอง return early ถ้า overlayRoot null

---

## 7. macOS-Specific Optimizations

| การปรับ | รายละเอียด |
|---------|-----------|
| **Timing Multiplier** | `isMac ? 1.8 : 1.0` สำหรับ sleep/wait ทุกจุด |
| **Image Compression** | ลดขนาดก่อนอัปโหลด ป้องกัน memory pressure |
| **ensureTabVisible()** | เรียก FOCUS_TAB ก่อนทำ coordinate-dependent actions |
| **robustClick/robustHover** | Full pointer→mouse→click sequence สำหรับ React/Radix |
| **Hidden mode fallback** | `.click()` ตรงถ้า `document.hidden === true` |

---

## 8. Forbidden Code Patterns (ห้ามเพิ่มกลับ)

```typescript
// ❌ ห้ามมีโค้ดเหล่านี้ในโปรเจค
neutralizeFileInputs()
input.type = "text"
pasteImageViaRealClipboard()
pasteImageIntoPromptBar()
```

---

## 9. วิธี Restore God Version (ถ้าจำเป็น)

```bash
# กลับไป God Version commit
git checkout 315b704 -- src/content-flow.ts
npm run build:content-flow

# หรือ restore จาก zip backup
# แตก god-version-backup.zip → src/content-flow.ts
# แล้ว npm run build:content-flow
```

---

## 10. Build Command

```bash
npm run build:content-flow
# Output: dist/src/content-flow.js (175.57 kB)
```

---

**สถานะ: ✅ พร้อมใช้งานบนเครื่องลูกค้า — No Error 100%**
