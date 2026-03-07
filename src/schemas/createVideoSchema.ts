import { z } from "zod";

export const createVideoSchema = z.object({
    // Product Data
    productId: z.string().default(""),
    productName: z.string().default(""),
    productDescription: z.string().default(""),

    // Character & Style
    gender: z.enum(["male", "female"]).default("female"),
    ageRange: z.enum(["teen", "young-adult", "adult", "middle-age", "senior"]).default("young-adult"),
    expression: z.enum(["neutral", "happy", "excited", "serious"]).default("happy"),
    movement: z.enum(["static", "minimal", "active"]).default("minimal"),
    clothingStyles: z.array(z.enum(["casual", "formal", "sporty", "fashion", "uniform"])).default(["casual"]),
    touchLevel: z.enum(["none", "light", "medium", "heavy"]).default("light"),
    cameraAngles: z.array(z.enum(["front", "side", "close-up", "full-body", "dynamic"])).default(["front", "close-up"]),

    // AI Scripting
    useAiScript: z.boolean().default(true),
    aiPrompt: z.string().default(""),
    saleStyle: z.enum(["hard", "soft", "educational", "storytelling"]).default("hard"),
    language: z.enum(["th-central", "th-north", "th-south", "th-isan"]).default("th-central"),
    voiceTone: z.enum(["energetic", "calm", "friendly", "professional", "cute"]).default("energetic"),
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

    // Engine Selection
    videoEngine: z.enum(["veo", "grok"]).default("veo"),

    // Google Flow Settings (Veo)
    outputType: z.enum(["image", "video"]).default("video"),
    orientation: z.enum(["horizontal", "vertical"]).default("vertical"),
    outputCount: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).default(1),
    sceneCount: z.number().int().min(1).max(10).default(2),

    // Posting Settings
    autoPostTikTok: z.boolean().default(true),
    autoPostYoutube: z.boolean().default(false),

    // Scene Background
    sceneBackground: z.string().default("studio"),

    // Keywords
    mustUseKeywords: z.string().default(""),
    avoidKeywords: z.string().default(""),
});

export type CreateVideoFormData = z.infer<typeof createVideoSchema>;

export const createVideoDefaultValues: CreateVideoFormData = {
    productId: "",
    productName: "",
    productDescription: "",
    gender: "female",
    ageRange: "young-adult",
    expression: "happy",
    movement: "minimal",
    clothingStyles: ["casual"],
    touchLevel: "light",
    cameraAngles: ["front", "close-up"],
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
    videoEngine: "veo",
    outputType: "video",
    orientation: "horizontal",
    outputCount: 1,
    sceneCount: 2,
    autoPostTikTok: true,
    autoPostYoutube: false,
    sceneBackground: "studio",
    mustUseKeywords: "",
    avoidKeywords: "",
};
