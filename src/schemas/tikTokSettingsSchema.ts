import { z } from "zod";

export const tikTokSettingsSchema = z.object({
    // === Product Sync (kept from before) ===
    productId: z.string().default(""),
    productName: z.string().default(""),

    // === Posting Mode ===
    postingMode: z.enum(["immediate", "scheduled", "queue"]).default("immediate"),

    // === Schedule Settings ===
    scheduleHour: z.number().int().min(0).max(23).default(18),
    scheduleMinute: z.number().int().min(0).max(59).default(0),
    scheduleDates: z.array(z.string()).default([]),

    // === Caption Settings ===
    autoCaption: z.boolean().default(true),
    captionTemplate: z.string().default(""),
    includeProductName: z.boolean().default(true),

    // === Hashtags ===
    autoHashtags: z.boolean().default(true),
    customHashtags: z.string().default(""),
    hashtagCount: z.number().int().min(1).max(30).default(5),

    // === Product Pin (ปักตะกร้า) ===
    autoPinProduct: z.boolean().default(true),

    // === Privacy & Visibility ===
    visibility: z.enum(["public", "friends", "private"]).default("public"),
    allowComments: z.boolean().default(true),
    allowDuet: z.boolean().default(true),
    allowStitch: z.boolean().default(true),

    // === Advanced Settings ===
    retryOnFail: z.boolean().default(true),
    maxRetries: z.number().int().min(1).max(5).default(3),
    delayBetweenPosts: z.number().int().min(0).max(3600).default(30),
    notifications: z.boolean().default(true),
    autoDeleteFailedDraft: z.boolean().default(false),
});

export type TikTokSettingsFormData = z.infer<typeof tikTokSettingsSchema>;

export const tikTokSettingsDefaultValues: TikTokSettingsFormData = {
    productId: "",
    productName: "",
    postingMode: "immediate",
    scheduleHour: 18,
    scheduleMinute: 0,
    scheduleDates: [],
    autoCaption: true,
    captionTemplate: "",
    includeProductName: true,
    autoHashtags: true,
    customHashtags: "",
    hashtagCount: 5,
    autoPinProduct: true,
    visibility: "public",
    allowComments: true,
    allowDuet: true,
    allowStitch: true,
    retryOnFail: true,
    maxRetries: 3,
    delayBetweenPosts: 30,
    notifications: true,
    autoDeleteFailedDraft: false,
};
