/**
 * ═══════════════════════════════════════════════════════════
 * Prompt Router — เลือก Prompt Service ตาม Engine ที่เลือก
 * ═══════════════════════════════════════════════════════════
 * 
 * ระบบนี้ทำหน้าที่เป็นตัวกลาง:
 * - User เลือก Engine (Veo / Grok)
 * - Router ส่งไปยัง Prompt Service ที่ถูกตัว
 * - Return GeneratedPrompts กลับมาในรูปแบบเดียวกัน
 * 
 * วิธีเพิ่ม Engine ใหม่:
 * 1. สร้าง xxxPromptService.ts ที่ implement EnginePromptBuilder
 * 2. Import + ลงทะเบียนใน ENGINE_PROMPT_BUILDERS ข้างล่าง
 * 3. เสร็จ!
 */

import type {
    VideoEngine,
    EnginePromptBuilder,
    PromptGenerationConfig,
    GeneratedPrompts,
    VideoPromptMeta,
} from "./promptTypes";

// ── Import Engine Prompt Builders ──
import {
    generatePrompts as veoGeneratePrompts,
    generateQuickPrompts as veoGenerateQuickPrompts,
    analyzeProductImage as veoAnalyzeProductImage,
    buildSceneVideoPromptJSON as veoBuildScenePrompt,
} from "./veoPromptService";
import { grokPromptBuilder } from "./grokPromptService";

// ═══════════════════════════════════════════════════════════
// Veo Prompt Builder — wrapper ที่ครอบ veoPromptService
// (ไม่แก้ไข veoPromptService.ts เลย แค่ครอบให้เข้า interface)
// ═══════════════════════════════════════════════════════════

const veoPromptBuilder: EnginePromptBuilder = {
    engineName: "veo",

    async generatePrompts(config: PromptGenerationConfig): Promise<GeneratedPrompts> {
        return veoGeneratePrompts(config);
    },

    generateQuickPrompts(config: PromptGenerationConfig): GeneratedPrompts {
        return veoGenerateQuickPrompts(config);
    },

    async analyzeProductImage(imageBase64: string, productName: string): Promise<string> {
        return veoAnalyzeProductImage(imageBase64, productName);
    },

    buildScenePrompt(meta: VideoPromptMeta, sceneScript: string, sceneNumber: number): string {
        return veoBuildScenePrompt(meta, sceneScript, sceneNumber);
    },
};

// ═══════════════════════════════════════════════════════════
// Engine Registry — ลงทะเบียน Engine ทั้งหมดตรงนี้
// ═══════════════════════════════════════════════════════════

const ENGINE_PROMPT_BUILDERS: Record<VideoEngine, EnginePromptBuilder> = {
    veo: veoPromptBuilder,
    grok: grokPromptBuilder,
};

// ═══════════════════════════════════════════════════════════
// Public API — ใช้ตรงนี้แทน import veoPromptService ตรงๆ
// ═══════════════════════════════════════════════════════════

/**
 * ดึง Prompt Builder ตาม Engine
 */
export const getPromptBuilder = (engine: VideoEngine): EnginePromptBuilder => {
    const builder = ENGINE_PROMPT_BUILDERS[engine];
    if (!builder) {
        console.warn(`⚠️ Unknown engine "${engine}", falling back to Veo`);
        return ENGINE_PROMPT_BUILDERS.veo;
    }
    return builder;
};

/**
 * สร้าง prompt ตาม engine ที่เลือก
 */
export const generatePromptsByEngine = async (
    engine: VideoEngine,
    config: PromptGenerationConfig
): Promise<GeneratedPrompts> => {
    console.log(`🔀 Prompt Router → ${engine}`);
    return getPromptBuilder(engine).generatePrompts(config);
};

/**
 * Quick prompt ตาม engine ที่เลือก
 */
export const generateQuickPromptsByEngine = (
    engine: VideoEngine,
    config: PromptGenerationConfig
): GeneratedPrompts => {
    return getPromptBuilder(engine).generateQuickPrompts(config);
};

/**
 * วิเคราะห์รูปสินค้าตาม engine ที่เลือก
 */
export const analyzeProductImageByEngine = async (
    engine: VideoEngine,
    imageBase64: string,
    productName: string
): Promise<string> => {
    return getPromptBuilder(engine).analyzeProductImage(imageBase64, productName);
};

/**
 * สร้าง scene prompt ฉาก 2+ ตาม engine ที่เลือก
 */
export const buildScenePromptByEngine = (
    engine: VideoEngine,
    meta: VideoPromptMeta,
    sceneScript: string,
    sceneNumber: number
): string => {
    return getPromptBuilder(engine).buildScenePrompt(meta, sceneScript, sceneNumber);
};

/**
 * ดึงรายชื่อ engine ทั้งหมดที่รองรับ
 */
export const getSupportedEngines = (): VideoEngine[] => {
    return Object.keys(ENGINE_PROMPT_BUILDERS) as VideoEngine[];
};
