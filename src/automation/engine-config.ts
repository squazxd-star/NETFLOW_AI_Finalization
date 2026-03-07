/**
 * Netflow AI — Engine Configuration Registry
 * 
 * Central registry for all video generation engines.
 * When adding a new engine, register it here.
 */

import { EngineConfig, VideoEngine } from "./types";

/** Veo 3.1 (Google Flow / labs.google) */
const VEO_CONFIG: EngineConfig = {
    id: "veo",
    name: "Veo 3.1",
    urlPatterns: ["https://labs.google/*"],
    contentScript: "src/content-flow.js",
    hostPermissions: ["https://labs.google/*"],
    resourceMatches: ["https://labs.google/*"],
};

/** Grok (xAI / grok.com) */
const GROK_CONFIG: EngineConfig = {
    id: "grok",
    name: "Grok",
    urlPatterns: ["https://grok.com/*"],
    contentScript: "src/content-grok.js",
    hostPermissions: ["https://grok.com/*"],
    resourceMatches: ["https://grok.com/*"],
};

/** All registered engines */
export const ENGINE_REGISTRY: Record<VideoEngine, EngineConfig> = {
    veo: VEO_CONFIG,
    grok: GROK_CONFIG,
};

/** Get engine config by ID (defaults to Veo) */
export const getEngineConfig = (engine?: VideoEngine): EngineConfig => {
    return ENGINE_REGISTRY[engine || "veo"] || ENGINE_REGISTRY.veo;
};

/** Get all engine configs */
export const getAllEngines = (): EngineConfig[] => {
    return Object.values(ENGINE_REGISTRY);
};
