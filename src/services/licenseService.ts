/**
 * License Service — NETFLOW AI
 * Handles license validation, storage, and expiry checking.
 * 
 * 3 Tiers:
 *   - Admin  : Permanent (no expiry)
 *   - Pro    : 30-day license
 *   - Trial  : 7-day trial for new customers
 * 
 * Keys are hardcoded for now (no admin panel yet).
 */

export type LicenseTier = "admin" | "pro" | "trial";

export interface LicenseInfo {
    key: string;
    tier: LicenseTier;
    activatedAt: number;   // timestamp ms
    expiresAt: number | null; // null = never (admin)
    label: string;
}

// ══════════════════════════════════════════════════════════════════
// Hardcoded Valid Keys (replace with API later)
// ══════════════════════════════════════════════════════════════════

const VALID_KEYS: Record<string, { tier: LicenseTier; label: string }> = {
    // ── Admin (permanent) ──
    "NETFLOW-ADMIN-2024-MASTER": { tier: "admin", label: "Admin Master Key" },
    "NETFLOW-ADMIN-PROD-9999":   { tier: "admin", label: "Admin Production" },
    "NETFLOW-ADMIN-DEV-0001":    { tier: "admin", label: "Admin Developer" },

    // ── Pro (30 days) ──
    "NETFLOW-PRO-2024-STAR01": { tier: "pro", label: "Pro License #1" },
    "NETFLOW-PRO-2024-STAR02": { tier: "pro", label: "Pro License #2" },
    "NETFLOW-PRO-2024-STAR03": { tier: "pro", label: "Pro License #3" },
    "NETFLOW-PRO-2024-STAR04": { tier: "pro", label: "Pro License #4" },
    "NETFLOW-PRO-2024-STAR05": { tier: "pro", label: "Pro License #5" },

    // ── Trial (7 days) ──
    "NETFLOW-TRIAL-FREE-TEST1": { tier: "trial", label: "Trial License #1" },
    "NETFLOW-TRIAL-FREE-TEST2": { tier: "trial", label: "Trial License #2" },
    "NETFLOW-TRIAL-FREE-TEST3": { tier: "trial", label: "Trial License #3" },
    "NETFLOW-TRIAL-FREE-TEST4": { tier: "trial", label: "Trial License #4" },
    "NETFLOW-TRIAL-FREE-TEST5": { tier: "trial", label: "Trial License #5" },
};

const STORAGE_KEY = "netflow_license";

const DURATIONS: Record<LicenseTier, number | null> = {
    admin: null,              // permanent
    pro:   30 * 24 * 60 * 60 * 1000, // 30 days in ms
    trial:  7 * 24 * 60 * 60 * 1000, //  7 days in ms
};

// ══════════════════════════════════════════════════════════════════
// Storage helpers — works in both extension and web contexts
// ══════════════════════════════════════════════════════════════════

const isExtension = (): boolean => {
    try {
        return typeof chrome !== "undefined" && !!chrome.storage?.local;
    } catch { return false; }
};

const saveLicense = async (info: LicenseInfo): Promise<void> => {
    const data = JSON.stringify(info);
    if (isExtension()) {
        await chrome.storage.local.set({ [STORAGE_KEY]: data });
    }
    localStorage.setItem(STORAGE_KEY, data);
};

const loadLicense = async (): Promise<LicenseInfo | null> => {
    try {
        // Extension storage first
        if (isExtension()) {
            const result = await chrome.storage.local.get(STORAGE_KEY);
            if (result[STORAGE_KEY]) {
                return JSON.parse(result[STORAGE_KEY]) as LicenseInfo;
            }
        }
        // Fallback: localStorage
        const local = localStorage.getItem(STORAGE_KEY);
        if (local) return JSON.parse(local) as LicenseInfo;
    } catch (e) {
        console.warn("[License] Failed to load:", e);
    }
    return null;
};

const clearLicenseStorage = async (): Promise<void> => {
    if (isExtension()) {
        await chrome.storage.local.remove(STORAGE_KEY);
    }
    localStorage.removeItem(STORAGE_KEY);
};

// ══════════════════════════════════════════════════════════════════
// Public API
// ══════════════════════════════════════════════════════════════════

/**
 * Validate and activate a license key.
 * Returns LicenseInfo on success, or an error string on failure.
 */
export const activateLicense = async (
    key: string
): Promise<{ success: true; info: LicenseInfo } | { success: false; error: string }> => {
    const normalized = key.trim().toUpperCase();

    const match = VALID_KEYS[normalized];
    if (!match) {
        return { success: false, error: "License Key ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง" };
    }

    // Check if this trial key was already used (and expired)
    const existing = await loadLicense();
    if (existing && existing.key === normalized && match.tier === "trial") {
        if (existing.expiresAt && Date.now() > existing.expiresAt) {
            return { success: false, error: "Trial License นี้หมดอายุแล้ว กรุณาอัปเกรดเป็น Pro" };
        }
    }

    const now = Date.now();
    const duration = DURATIONS[match.tier];

    const info: LicenseInfo = {
        key: normalized,
        tier: match.tier,
        activatedAt: existing?.key === normalized ? existing.activatedAt : now,
        expiresAt: duration ? (existing?.key === normalized ? existing.expiresAt : now + duration) : null,
        label: match.label,
    };

    await saveLicense(info);
    return { success: true, info };
};

/**
 * Get the current stored license (if any).
 */
export const getCurrentLicense = async (): Promise<LicenseInfo | null> => {
    return loadLicense();
};

/**
 * Check if the current license is valid (exists and not expired).
 */
export const isLicenseValid = async (): Promise<boolean> => {
    const info = await loadLicense();
    if (!info) return false;

    // Verify key still exists in valid keys
    if (!VALID_KEYS[info.key]) return false;

    // Admin = always valid
    if (info.tier === "admin") return true;

    // Check expiry
    if (info.expiresAt && Date.now() > info.expiresAt) return false;

    return true;
};

/**
 * Get remaining time for the license.
 * Returns { days, hours, minutes } or null if permanent/invalid.
 */
export const getRemainingTime = async (): Promise<{
    days: number;
    hours: number;
    minutes: number;
    total: number;
    expired: boolean;
} | null> => {
    const info = await loadLicense();
    if (!info || !info.expiresAt) return null; // admin or no license

    const remaining = info.expiresAt - Date.now();
    if (remaining <= 0) {
        return { days: 0, hours: 0, minutes: 0, total: 0, expired: true };
    }

    return {
        days: Math.floor(remaining / (24 * 60 * 60 * 1000)),
        hours: Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        minutes: Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000)),
        total: remaining,
        expired: false,
    };
};

/**
 * Logout / deactivate the current license.
 */
export const deactivateLicense = async (): Promise<void> => {
    await clearLicenseStorage();
};

/**
 * Get display info for a tier.
 */
export const getTierInfo = (tier: LicenseTier) => {
    switch (tier) {
        case "admin":
            return { label: "Admin", emoji: "👑", color: "#fbbf24", bgColor: "rgba(251, 191, 36, 0.15)" };
        case "pro":
            return { label: "Pro", emoji: "⚡", color: "#3b82f6", bgColor: "rgba(59, 130, 246, 0.15)" };
        case "trial":
            return { label: "Trial", emoji: "🎁", color: "#a855f7", bgColor: "rgba(168, 85, 247, 0.15)" };
    }
};
