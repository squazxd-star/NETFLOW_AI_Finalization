/**
 * Netflow AI — Automation Module
 * 
 * Central hub for all video generation engine automation.
 * 
 * ┌─────────────────────────────────────────────────────────┐
 * │  ARCHITECTURE                                           │
 * │                                                         │
 * │  UI (CreateVideoTab) ──→ background.js ──→ Engine Tab   │
 * │       │                      │                │         │
 * │  videoEngine: "veo"    findEngineTab()   content-flow   │
 * │  videoEngine: "grok"   route by engine   content-grok   │
 * │                                                         │
 * │  Files:                                                 │
 * │  ├── src/automation/           ← You are here           │
 * │  │   ├── index.ts              ← Exports                │
 * │  │   ├── types.ts              ← Shared types           │
 * │  │   ├── engine-config.ts      ← Engine registry        │
 * │  │   └── engines/                                       │
 * │  │       ├── veo/README.md     ← Veo docs               │
 * │  │       └── grok/README.md    ← Grok docs              │
 * │  ├── src/content-flow.ts       ← Veo automation (165KB) │
 * │  ├── src/content-grok.ts       ← Grok automation (TODO) │
 * │  ├── src/netflow-overlay.ts    ← Shared overlay UI      │
 * │  └── public/background.js      ← Message router         │
 * └─────────────────────────────────────────────────────────┘
 */

export { ENGINE_REGISTRY, getEngineConfig, getAllEngines } from "./engine-config";
export type { VideoEngine, EngineConfig, AutomationMessage, AutomationResponse } from "./types";
