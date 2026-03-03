# NETFLOW AI v2

Clean rebuild — Chrome Extension (Manifest V3) with zero privacy issues on macOS.

## Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Extension**: Chrome Manifest V3 Side Panel
- **Platform**: macOS / Windows / Linux

## Privacy

Extension ใช้ permissions น้อยที่สุด — ไม่มีอะไรกระทบ privacy บน Mac:

- `storage` — เก็บข้อมูลภายใน extension เท่านั้น
- `sidePanel` — เปิด side panel เมื่อคลิก icon
- **ไม่มี** content scripts, host permissions, tabs, clipboard, webNavigation

## Quick Start

```bash
# Install
npm install

# Dev (hot reload)
npm run dev

# Build extension
npm run build
```

## Load Extension

1. `chrome://extensions/` → Enable **Developer mode**
2. Click **Load unpacked** → select `dist/`
3. Click Netflow AI icon → side panel opens

### macOS Notes

- ถ้า `npm install` ติด `@swc/core`:
  ```bash
  npm install --force
  ```
- ถ้าเจอ permission error:
  ```bash
  sudo chown -R $(whoami) ~/.npm
  ```
- Chrome ต้อง >= 116 (`chrome://version`)

## Project Structure

```
src/
├── main.tsx          # Entry point
├── App.tsx           # Main app shell
├── index.css         # TailwindCSS + theme variables
├── lib/utils.ts      # shadcn utility
└── vite-env.d.ts     # Vite types

public/
├── manifest.json     # Manifest V3 (minimal permissions)
├── background.js     # Service worker (side panel opener)
└── icons/            # Extension icons
```

## License

Private Project. All rights reserved.
