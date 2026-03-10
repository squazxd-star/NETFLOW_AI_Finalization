/**
 * Netflow AI — Automation Engine Types
 * 
 * Shared types/interfaces for all video generation engines.
 * Each engine (Veo, etc.) implements these interfaces.
 */

/** Supported video generation engines */
export type VideoEngine = "veo" | "grok";

/** Engine configuration — defines how to find and communicate with each engine's browser tab */
export interface EngineConfig {
    /** Engine identifier */
    id: VideoEngine;
    /** Display name */
    name: string;
    /** URL patterns to match the engine's web app (for chrome.tabs.query) */
    urlPatterns: string[];
    /** Content script file path (relative to dist/) */
    contentScript: string;
    /** Host permissions needed in manifest.json */
    hostPermissions: string[];
    /** Web accessible resource URL matches */
    resourceMatches: string[];
}

/** Message payload sent from CreateVideoTab → background.js → content script */
export interface AutomationMessage {
    action: string;
    videoEngine: VideoEngine;
    imagePrompt?: string;
    videoPrompt?: string;
    videoScenePrompts?: string[];
    sceneCount?: number;
    productImage?: string;
    characterImage?: string;
    orientation?: string;
    outputCount?: number;
    theme?: string;
}

/** Response from content script back to the UI */
export interface AutomationResponse {
    success: boolean;
    message: string;
    step?: string;
}
