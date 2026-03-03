/**
 * TikTok Posting Config Service
 * Manages posting configuration persistence and validation
 */

import { TikTokSettingsFormData, tikTokSettingsDefaultValues } from "@/schemas/tikTokSettingsSchema";
import { getSyncedProducts } from "./tiktokProductService";

const CONFIG_STORAGE_KEY = "netflow_tiktok_posting_config";
const CONFIG_SAVED_KEY = "netflow_tiktok_config_saved";

const isExtension = typeof chrome !== "undefined" && chrome.storage;

/**
 * Save posting config to storage
 */
export const saveTikTokPostingConfig = async (config: TikTokSettingsFormData): Promise<void> => {
    const data = { ...config, _savedAt: Date.now() };

    if (isExtension) {
        return new Promise((resolve) => {
            chrome.storage.local.set({
                [CONFIG_STORAGE_KEY]: data,
                [CONFIG_SAVED_KEY]: true,
            }, () => {
                console.log("[TikTokPostingConfig] Config saved");
                resolve();
            });
        });
    }

    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(CONFIG_SAVED_KEY, "true");
};

/**
 * Load posting config from storage
 */
export const loadTikTokPostingConfig = async (): Promise<TikTokSettingsFormData> => {
    if (isExtension) {
        return new Promise((resolve) => {
            chrome.storage.local.get([CONFIG_STORAGE_KEY], (result) => {
                const saved = result[CONFIG_STORAGE_KEY] as Record<string, unknown> | undefined;
                if (saved) {
                    const { _savedAt, ...config } = saved;
                    void _savedAt;
                    resolve({ ...tikTokSettingsDefaultValues, ...config } as TikTokSettingsFormData);
                } else {
                    resolve(tikTokSettingsDefaultValues);
                }
            });
        });
    }

    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw) as Record<string, unknown>;
            const { _savedAt, ...config } = parsed;
            void _savedAt;
            return { ...tikTokSettingsDefaultValues, ...config } as TikTokSettingsFormData;
        } catch {
            return tikTokSettingsDefaultValues;
        }
    }
    return tikTokSettingsDefaultValues;
};

/**
 * Check if config has been saved at least once
 */
export const hasConfigBeenSaved = async (): Promise<boolean> => {
    if (isExtension) {
        return new Promise((resolve) => {
            chrome.storage.local.get([CONFIG_SAVED_KEY], (result) => {
                resolve(!!result[CONFIG_SAVED_KEY]);
            });
        });
    }
    return localStorage.getItem(CONFIG_SAVED_KEY) === "true";
};

/**
 * Validate minimum requirements for TikTok auto-posting
 * Returns { ready: boolean, reasons: string[] }
 */
export const validateTikTokPostingReady = async (): Promise<{
    ready: boolean;
    reasons: string[];
}> => {
    const reasons: string[] = [];

    // 1. Must have at least 1 synced product
    const products = await getSyncedProducts();
    if (products.length === 0) {
        reasons.push("ยังไม่มีสินค้าที่ซิงค์ (ไปซิงค์สินค้าจาก TikTok Studio ก่อน)");
    }

    // 2. Must have saved config at least once
    const saved = await hasConfigBeenSaved();
    if (!saved) {
        reasons.push("ยังไม่ได้บันทึกการตั้งค่า TikTok (กดบันทึกในหน้าตั้งค่า TikTok)");
    }

    return {
        ready: reasons.length === 0,
        reasons,
    };
};
