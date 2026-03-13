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
