# Veo 3.1 Engine (Google Flow)

## Overview
Veo 3.1 uses Google Flow (labs.google) for video generation.

## Files
- **Content Script**: `src/content-flow.ts` — Main automation script (browser automation for labs.google)
- **Overlay**: `src/netflow-overlay.ts` — Progress overlay UI during automation
- **Prompt Service**: `src/services/aiPromptService.ts` — Builds image/video prompts optimized for Veo

## How it works
1. User fills form in extension sidebar → clicks "สร้างวิดีโอ"
2. Extension sends `GENERATE_IMAGE` message with `videoEngine: "veo"` to background.js
3. background.js finds `labs.google` tab → injects `content-flow.js`
4. content-flow.ts automates: configure settings → upload images → paste prompt → click generate → wait → download

## Key Functions (content-flow.ts)
- `handleGenerateImage()` — Main entry point
- `configureFlowSettings()` — Set orientation/output count
- `uploadImages()` — Upload product + character reference images
- `fillPromptAndGenerate()` — Paste prompt and click generate
- `runMultiScenePipeline()` — Multi-scene video generation (2-3 scenes)

## ⚠️ DO NOT MODIFY
The 2-scene video generation process, overlay steps, download with Radix UI selectors, 
toast detection, and open in Chrome — these are critical and must not be changed.
