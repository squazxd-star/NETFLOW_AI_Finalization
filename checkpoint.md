# NETFLOW Automation Checkpoints

## Checkpoint: PERFECT AUTOMATION Restore
- **Date**: 2026-03-13 02:16 (UTC+7)
- **Commit**: `4a200b5` — "Revert steps 2-6 to PERFECT AUTOMATION (d2b8b00): fix upload + prompt paste"
- **Status**: ✅ Working — Steps 1-10 all done (10/16 shown in overlay)
- **Base Reference**: PERFECT AUTOMATION commit `d2b8b00` (2026-03-11 22:49)

### What was fixed
Steps 2-6 (upload character, upload product, image prompt, generate image, wait for image) were broken by later commits that added excessive complexity. Reverted to PERFECT AUTOMATION 
Feedback submittedlogic:

| Function | What was removed |
|----------|-----------------|
| `findPromptBarAddButton` | minY filter (bottom 40% viewport) + relaxed fallback |
| `findPromptTextInput` | Slate.js/role=textbox/overlay-filtering/diagnostic logging — back to simple textarea → contenteditable → input |
| `blockFileDialogs` | `_capturedFileInput`, showPicker, showOpenFilePicker, label-intercept — back to `.click()` override only |
| `restoreAndInject` | `_capturedFileInput` references — back to DOM file inputs + prefer new over pre-existing |
| `uploadImageToPromptBar` | drag-drop fallback + Mac clipboard/drag-drop/synthetic paste fallbacks |
| Product upload section | FULL UI RESET block (Escape + body.click + remove stale inputs) |
| Image prompt paste | dual FOCUS_TAB + 5-retry loop — back to simple find → paste → done |

### Version Lineage
```
AUTOCOMPLETEX1 → AutoC2 → PERFECT AUTOMATION (d2b8b00) → ... → broken (ec8dd7d) → restored (4a200b5)
```

### Key Rule
If steps 2-6 break again, revert `src/content-flow.ts` to commit `4a200b5`.

---

## Checkpoint: macOS 2016 Upload Compatibility Fix
- **Date**: 2026-03-13 21:14 (UTC+7)
- **Status**: ✅ Built — zero TypeScript errors, awaiting Mac test
- **Problem**: Product image upload fails on customer's macOS 2016 (Sierra) Chrome. Overlay appears, automation runs, but upload step doesn't complete. Works fine on Windows.

### Root Cause Analysis
Older macOS Chrome may use different APIs to trigger file dialogs:
1. `showPicker()` (Chrome 99+) instead of `.click()` — bypassed the block
2. `showOpenFilePicker()` (File System Access API) — bypassed the block
3. `DataTransfer` file injection events may not trigger React's change detection on older macOS Chrome

### Why this is DIFFERENT from the previous broken version (ec8dd7d)
The previous fix added these AND broke everything:

| Previous (broken) | This fix (safe) |
|---|---|
| ❌ `_capturedFileInput` global variable | ✅ NOT added — no global state |
| ❌ label-intercept (too aggressive, clicked wrong things) | ✅ NOT added |
| ❌ Fallbacks ran on ALL platforms (added 20s delay to Windows) | ✅ Fallbacks gated with `if (isMac)` — Windows returns immediately |
| ❌ FULL UI RESET block (Escape + body.click) | ✅ NOT added |
| ❌ dual FOCUS_TAB + 5-retry loop for prompt paste | ✅ NOT added |

### What was fixed (3 areas in `src/content-flow.ts`)

| Area | Change |
|------|--------|
| `blockFileDialogs()` | Added `showPicker()` + `showOpenFilePicker()` overrides — blocks ALL 3 file dialog APIs. Simple overrides, properly restored in cleanup. |
| `restoreAndInject()` | Added `nativeInputValueSetter` reset + `blur` event + `composed:true` change event — covers React 16/17/18 on all platforms (harmless on Windows) |
| `uploadImageToPromptBar()` | **Mac-only fallbacks**: Clipboard paste → Drag-and-drop. Gated by `if (ok && !isMac) return true` so Windows NEVER enters fallback path. |

### Upload Method Priority (Mac only — Windows skips to return true)
```
1. PRIMARY: File Input Injection (neutralize → click → restore → DataTransfer → change event)
2. FALLBACK A: Clipboard Paste (write to clipboard → paste event on editable targets + document)
3. FALLBACK B: Drag-and-Drop (dragenter → dragover → drop on prompt bar area)
```

### Key Rule
- **Windows**: PERFECT AUTOMATION behavior PRESERVED — if injection succeeds, returns `true` immediately (no fallbacks, no delay)
- **Mac**: tries 3 methods before giving up. If injection reported success but no thumbnail, still returns `true` at end
- If Mac upload still fails, check console logs for: `🍎 Mac Fallback` → `Fallback A` → `Fallback B`

---

## Checkpoint: Google Flow UI Update — Radix Dialog Upload Fix
- **Date**: 2026-03-13 21:50 (UTC+7)
- **Commit**: `6aac009` — "fix: Google Flow new UI - Radix Dialog upload detection + fallbacks"
- **Status**: ✅ Built + pushed — zero TypeScript errors, awaiting test

### What Changed in Google Flow (Google's side)
Google updated the Flow UI. The "+" button on the prompt bar **no longer opens a dropdown menu**. It now opens a **Radix Dialog** panel containing:

| Element | Details |
|---------|---------|
| "+" button (Create) | `<button aria-haspopup="dialog" aria-controls="radix-:rXX:" data-state="closed">` with icon `add_2` |
| Upload button | `<button>` with icon `upload` and screen-reader `<span>Upload image</span>` — **inside the dialog** |
| Image/Video tabs | `role="tab"` buttons with `data-state="active"/"inactive"` |
| Landscape/Portrait tabs | `role="tab"` buttons |
| x1/x2/x3/x4 tabs | Output count selectors |
| Model selector | `🍌 Nano Banana 2` with `crop_9_16` icon |

### Why Old Code Failed
```
OLD UI: "+" → dropdown menu ([role='menuitem']) → "Upload" menu item → file input
NEW UI: "+" → Radix Dialog (aria-haspopup="dialog") → Upload button (icon "upload") → file input
```
- Old code searched for `[role='menuitem']`, `[role='option']` etc. — new UI uses plain `<button>` inside a Radix Dialog
- Dialog content rendered via portal with ID from `aria-controls`
- If dialog doesn't open, upload button never exists in DOM → 8-second timeout → fail

### How It Was Fixed (`uploadImageToPromptBar()` in `content-flow.ts`)

#### Step 1: Open the Radix Dialog (3 attempts)
```
1A. addBtn.click()                          — Radix uses onClick
1B. Synthetic pointer/mouse event sequence  — fallback for React handlers
1C. focus() + Enter key                     — keyboard fallback
```
Each attempt checks `isDialogOpen()` which verifies:
- `data-state="open"` on the button
- `aria-expanded="true"` on the button
- Dialog element exists (via `aria-controls` ID) and has `offsetWidth > 0`

#### Step 2: Find Upload Button (3 strategies)
```
A. aria-controls → find dialog element by ID → scan <button> inside for icon "upload"
B. Direct CSS path inside dialog: dialogEl.querySelector("div > div > button")
C. Global scan: all <button> on page with icon "upload" (excluding "+" button itself)
```
Also checks screen-reader `<span>` text: "Upload image", "อัปโหลดรูปภาพ"

#### Step 2 Fallback: Legacy menu detection
If dialog approach fails, falls back to old menu item scanning (for backward compatibility with older UI versions).

#### Last Resort: Workspace drag-and-drop
New UI shows "Start creating or drop media" — sends synthetic `dragenter → dragover → drop` events to workspace center area.

#### Diagnostic Dump (if all fails)
Logs:
- `aria-controls` value and `data-state` of "+" button
- Dialog element existence and dimensions
- All buttons inside dialog with their icon text
- Any button on page with `upload`/`upload_file` icon

### Key DOM Elements Reference
```html
<!-- "+" button (prompt bar) -->
<button aria-haspopup="dialog" aria-controls="radix-:rXX:" data-state="closed" class="sc-addd5871-0">
  <i class="google-symbols">add_2</i>
  <span>Create</span>
</button>

<!-- Upload button (inside dialog) -->
<button class="sc-e8425ea6-0">
  <i class="google-symbols">upload</i>
  <span>Upload image</span>
</button>

<!-- JS path to upload button (dynamic ID) -->
document.querySelector("#radix-\\:rXX\\: > div > div > button")
```
**Note**: `:rXX:` is dynamic (Radix-generated) — never hardcode. Always use `aria-controls` from the "+" button.

### Lessons Learned
1. **Google Flow uses Radix UI** — dialogs, tabs, menus all use Radix primitives with `data-state`, `aria-controls`, `aria-haspopup`
2. **Icon font changed from `material-icons` to `google-symbols`** — but still uses `<i>` tags, so tag-based detection (`el.querySelectorAll("i")`) still works
3. **Screen-reader text is reliable** — upload button always has `<span>Upload image</span>` (visually hidden but queryable)
4. **`aria-controls` is the key to finding dialog content** — Radix renders dialog in a portal, but the ID link is always there
5. **`.click()` works better than synthetic events for Radix** — Radix Dialog trigger responds to React's `onClick`, not raw pointer events
6. **Always check `data-state` attribute** — Radix components use `data-state="open"/"closed"/"active"/"inactive"` instead of CSS classes
7. **Never hardcode Radix IDs** — they change on every page load (`:r24:`, `:r25:`, etc.)

### Key Rule
- If upload breaks again after a Google Flow update, inspect the "+" button's `aria-haspopup` and `aria-controls` attributes
- Check console for `DIAGNOSTIC:` dump to see what's inside the dialog
- The upload button icon text `"upload"` is the most reliable identifier
