# NETFLOW AI

NETFLOW AI is a modern, high-performance web application designed for AI-powered video generation and management. Built with a cyberpunk/red-neon aesthetic, it offers a professional dashboard for content creators.

## Features

- **Standard & Advanced AI Modes**: Create videos using automated AI scripts or manual input.
- **Character & Style Customization**: Select avatars, voice moods (Excited, Calm, etc.), and energy levels.
- **Script Management**: Templates for Product Reviews, Educational content, and more.
- **TikTok Integration**: Manage and schedule posts directly.
- **NetCast Pro**: Advanced broadcasting capabilities.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- **Node.js** >= 18.x (LTS recommended)
- **npm** >= 9.x
- **Chrome** >= 116 (required for Side Panel API)
- Works on **Windows**, **macOS**, and **Linux**

### Installation (All Platforms)

1. Clone the repository:
   ```bash
   git clone <YOUR_GIT_URL>
   cd NETFLOW_AI_REAL_PRODUCTION-main
   ```

2. **Delete `node_modules` if present** (critical for cross-platform):
   ```bash
   rm -rf node_modules
   ```

3. Install dependencies fresh:
   ```bash
   npm install
   ```

4. (Optional) Copy environment variables:
   ```bash
   cp .env.example .env
   # Then edit .env with your API keys
   ```

5. Build the Chrome Extension:
   ```bash
   npm run build
   ```

6. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** → select the `dist/` folder
   - Open any tab → click the NetFlow AI icon to open the side panel

### macOS Specific Notes

- If `npm install` fails with `@swc/core` errors, run:
  ```bash
  npm install --force
  ```
- If you see permission errors:
  ```bash
  sudo chown -R $(whoami) ~/.npm
  ```
- Make sure Chrome is version 116+ (check `chrome://version`)

### Development

```bash
npm run dev
```

## Project Structure

- `/src/components` — UI components (Side Panel)
- `/src/content.tsx` — Content script (runs on Google Labs VideoFX)
- `/src/utils/googleLabAutomation.ts` — VideoFX automation engine
- `/src/services/aiPromptService.ts` — AI prompt generation
- `/public/service-worker.js` — Background service worker
- `/public/manifest.json` — Chrome Extension manifest

## License

Private Project. All rights reserved.
