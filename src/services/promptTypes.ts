/**
 * ═══════════════════════════════════════════════════════════
 * Shared Prompt Types — ทุก Engine ต้อง implement interface นี้
 * ═══════════════════════════════════════════════════════════
 * 
 * ไฟล์นี้กำหนด interface กลางที่ Veo (และ engine อื่นๆ ในอนาคต)
 * ต้อง implement เพื่อให้ระบบ Prompt Router ทำงานได้
 */

import type { PromptGenerationConfig, GeneratedPrompts, VideoPromptMeta } from "./veoPromptService";

// ── Re-export types ที่ engine ต้องใช้ ──
export type { PromptGenerationConfig, GeneratedPrompts, VideoPromptMeta };

// ── Video Engine Type ──
export type VideoEngine = "veo" | "grok";

/**
 * Interface ที่ทุก Prompt Service ต้อง implement
 * 
 * แต่ละ engine อาจสร้าง prompt ต่างกัน (format, ความยาว, directive)
 * แต่ต้อง return ออกมาในรูปแบบ GeneratedPrompts เหมือนกัน
 */
export interface EnginePromptBuilder {
    /** ชื่อ Engine */
    engineName: VideoEngine;

    /**
     * สร้าง Image + Video prompt จาก config
     * Return: GeneratedPrompts { imagePrompt, videoPrompt, sceneScripts, ... }
     */
    generatePrompts(config: PromptGenerationConfig): Promise<GeneratedPrompts>;

    /**
     * Quick prompt generation (ไม่มี image analysis) — ใช้สำหรับ preview/draft
     */
    generateQuickPrompts(config: PromptGenerationConfig): GeneratedPrompts;

    /**
     * วิเคราะห์รูปสินค้า (Vision API)
     * Return: คำอธิบายสินค้าจากรูป
     */
    analyzeProductImage(imageBase64: string, productName: string, clothingStyles?: string[], characterOutfit?: string, customOutfitPrompt?: string, cameraAngles?: string[]): Promise<string>;

    /**
     * สร้าง prompt สำหรับฉากที่ 2+ (ต่อฉาก)
     * ใช้ meta จากฉากแรกเพื่อรักษาความต่อเนื่อง
     */
    buildScenePrompt(meta: VideoPromptMeta, sceneScript: string, sceneNumber: number, sceneVideoAction?: string): string;
}
