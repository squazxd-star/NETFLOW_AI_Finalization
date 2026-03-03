import { z } from "zod";

export const createVideoSchema = z.object({
    // Product Data
    productId: z.string().default(""),
    productName: z.string().default(""),

    // AI Scripting
    useAiScript: z.boolean().default(true),
    aiPrompt: z.string().default(""),
    saleStyle: z.enum(["hard", "soft", "educational", "storytelling"]).default("hard"),
    language: z.enum(["th-central", "th-north", "th-south", "th-isan"]).default("th-central"),
    voiceTone: z.enum(["energetic", "calm", "friendly", "professional"]).default("energetic"),
    template: z.enum([
        "product-review",
        "brainrot-product",
        "food-review",
        "fashion-review",
        "gadget-review",
        "unboxing",
        "comparison",
        "testimonial",
        "flash-sale",
        "tutorial",
        "lifestyle",
        "trending",
        "mini-drama",
        "before-after"
    ]).default("product-review"),
    hookText: z.string().default(""),
    ctaText: z.string().default(""),
    hookEnabled: z.boolean().default(true),
    ctaEnabled: z.boolean().default(true),

    // Google Flow Settings (new)
    outputType: z.enum(["image", "video"]).default("video"),
    orientation: z.enum(["horizontal", "vertical"]).default("vertical"),
    outputCount: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).default(1),
    sceneCount: z.number().int().min(1).max(3).default(1),

    // Posting Settings
    autoPostTikTok: z.boolean().default(true),
    autoPostYoutube: z.boolean().default(false),

    // Keywords
    mustUseKeywords: z.string().default(""),
    avoidKeywords: z.string().default(""),
});

export type CreateVideoFormData = z.infer<typeof createVideoSchema>;

export const createVideoDefaultValues: CreateVideoFormData = {
    productId: "",
    productName: "",
    useAiScript: true,
    aiPrompt: "",
    saleStyle: "storytelling",
    language: "th-central",
    voiceTone: "energetic",
    template: "product-review",
    hookText: "",
    ctaText: "",
    hookEnabled: true,
    ctaEnabled: true,
    outputType: "video",
    orientation: "vertical",
    outputCount: 1,
    sceneCount: 1,
    autoPostTikTok: true,
    autoPostYoutube: false,
    mustUseKeywords: "",
    avoidKeywords: "",
};
