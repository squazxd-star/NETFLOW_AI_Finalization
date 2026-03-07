/**
 * ═══════════════════════════════════════════════════════════
 * Grok Prompt Service — สร้าง prompt สำหรับ Grok Engine
 * ═══════════════════════════════════════════════════════════
 * 
 * ⚠️  ไฟล์นี้เป็น PLACEHOLDER สำหรับเพื่อนที่จะมาเติมโค้ด
 * 
 * วิธีใช้:
 * 1. implement แต่ละ function ตาม TODO
 * 2. prompt format ของ Grok อาจต่างจาก Veo — ปรับได้ตามต้องการ
 * 3. แต่ต้อง return ออกมาเป็น GeneratedPrompts เหมือนกัน
 * 4. ดูตัวอย่างจาก aiPromptService.ts (Veo) ได้
 * 
 * หมายเหตุ:
 * - Grok รองรับ prompt format แบบไหน ให้ปรับ buildImagePrompt / buildVideoPrompt ตามนั้น
 * - ถ้า Grok ไม่ต้องการ image analysis ก็ return string ว่างได้
 * - scenePrompt ฉาก 2+ ถ้า Grok ไม่ต้องการ meta ก็ return prompt ตรงๆ ได้
 */

import type {
    EnginePromptBuilder,
    PromptGenerationConfig,
    GeneratedPrompts,
    VideoPromptMeta,
} from "./promptTypes";

// ═══════════════════════════════════════════════════════════
// Grok Prompt Builder — implement EnginePromptBuilder interface
// ═══════════════════════════════════════════════════════════

export const grokPromptBuilder: EnginePromptBuilder = {
    engineName: "grok",

    /**
     * สร้าง Image + Video prompt สำหรับ Grok
     * 
     * TODO: เพื่อนเติมโค้ดตรงนี้
     * - ใช้ config.productName, config.template, config.language ฯลฯ
     * - สร้าง imagePrompt สำหรับ Grok (ถ้ามี)
     * - สร้าง videoPrompt สำหรับ Grok
     * - สร้าง sceneScripts[] ตามจำนวน config.clipDuration / 8
     */
    async generatePrompts(config: PromptGenerationConfig): Promise<GeneratedPrompts> {
        console.log("🤖 [Grok] Generating prompts with config:", config);

        const sceneCount = Math.max(1, Math.floor((config.clipDuration || 16) / 8));

        // ─── PLACEHOLDER: แทนที่ด้วย prompt จริงของ Grok ───
        const imagePrompt = `[GROK IMAGE] ${config.productName} — ${config.template} style`;
        const videoPrompt = `[GROK VIDEO] ${config.productName} — ${sceneCount} scenes`;
        const sceneScripts = Array.from({ length: sceneCount }, (_, i) =>
            `[GROK ฉาก ${i + 1}] placeholder script for ${config.productName}`
        );

        return {
            imagePrompt,
            videoPrompt,
            sceneScripts,
        };
    },

    /**
     * Quick prompt (ไม่มี image analysis)
     * 
     * TODO: เพื่อนเติมโค้ดตรงนี้
     */
    generateQuickPrompts(config: PromptGenerationConfig): GeneratedPrompts {
        const sceneCount = Math.max(1, Math.floor((config.clipDuration || 16) / 8));

        return {
            imagePrompt: `[GROK IMAGE] ${config.productName}`,
            videoPrompt: `[GROK VIDEO] ${config.productName}`,
            sceneScripts: Array.from({ length: sceneCount }, (_, i) =>
                `[GROK ฉาก ${i + 1}] quick script for ${config.productName}`
            ),
        };
    },

    /**
     * วิเคราะห์รูปสินค้า
     * 
     * TODO: ถ้า Grok มี Vision API ให้เพื่อนเติมตรงนี้
     * ถ้าไม่มี return "" ได้เลย
     */
    async analyzeProductImage(imageBase64: string, productName: string): Promise<string> {
        console.log("🤖 [Grok] analyzeProductImage — not implemented yet");
        return "";
    },

    /**
     * สร้าง prompt สำหรับฉาก 2+ (ต่อฉาก)
     * 
     * TODO: เพื่อนเติมโค้ดตรงนี้
     * - meta มาจากฉากแรก (style, character, product ฯลฯ)
     * - ใช้เพื่อรักษาความต่อเนื่องระหว่างฉาก
     */
    buildScenePrompt(meta: VideoPromptMeta, sceneScript: string, sceneNumber: number): string {
        console.log(`🤖 [Grok] buildScenePrompt — Scene ${sceneNumber}`);
        return `[GROK Scene ${sceneNumber}] ${sceneScript}`;
    },
};
