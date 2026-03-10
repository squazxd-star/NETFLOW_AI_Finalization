/**
 * TikTok Posting Config Service — STUB
 * ระบบถูกลบ รอใส่ของเพื่อนแทน (UI ยังคงอยู่)
 */

import { TikTokSettingsFormData, tikTokSettingsDefaultValues } from "@/schemas/tikTokSettingsSchema";

export const saveTikTokPostingConfig = async (_config: TikTokSettingsFormData): Promise<void> => {};
export const loadTikTokPostingConfig = async (): Promise<TikTokSettingsFormData> => tikTokSettingsDefaultValues;
export const hasConfigBeenSaved = async (): Promise<boolean> => false;
export const validateTikTokPostingReady = async (): Promise<{ ready: boolean; reasons: string[] }> => {
    return { ready: false, reasons: ['TikTok system not installed — รอติดตั้งระบบใหม่'] };
};
