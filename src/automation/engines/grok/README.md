# Grok Engine (xAI)

## Overview
Grok uses grok.com for video generation.

## Files
- **Content Script**: `src/content-grok.ts` — Automation script for grok.com (PLACEHOLDER — needs implementation)
- **Overlay**: Uses shared `src/netflow-overlay.ts` — Same overlay UI as Veo

## How to implement
1. Open `src/content-grok.ts`
2. Implement the `handleGenerateImage()` function following the same pattern as Veo's content-flow.ts
3. The content script receives a message with:
   ```typescript
   {
     action: "GENERATE_IMAGE",
     videoEngine: "grok",
     imagePrompt: string,
     videoPrompt: string,
     videoScenePrompts: string[],
     sceneCount: number,
     productImage: string,      // base64 product image
     characterImage: string,    // base64 character image
     orientation: "horizontal" | "vertical",
     outputCount: number,
     theme: string
   }
   ```
4. Your automation should:
   - Upload reference images to Grok
   - Paste the video prompt
   - Click generate
   - Wait for generation to complete
   - Download the result
   - Send back `{ success: true, message: "..." }`

## Routing
- When user selects "Grok" engine in the UI, background.js will:
  1. Find a tab matching `https://grok.com/*`
  2. Inject `src/content-grok.js` into that tab
  3. Forward the automation message to the content script

## Build
- Grok content script is built separately via `vite.content-grok.config.ts`
- Build command: `npm run build` (builds everything including Grok)
