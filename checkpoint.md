# NETFLOW Automation Checkpoints

## Checkpoint: PERFECT AUTOMATION Restore
- **Date**: 2026-03-13 02:16 (UTC+7)
- **Commit**: `4a200b5` — "Revert steps 2-6 to PERFECT AUTOMATION (d2b8b00): fix upload + prompt paste"
- **Status**: ✅ Working — Steps 1-10 all done (10/16 shown in overlay)
- **Base Reference**: PERFECT AUTOMATION commit `d2b8b00` (2026-03-11 22:49)

### What was fixed
Steps 2-6 (upload character, upload product, image prompt, generate image, wait for image) were broken by later commits that added excessive complexity. Reverted to PERFECT AUTOMATION logic:

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
