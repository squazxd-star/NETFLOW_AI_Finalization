import { z } from "zod";

export const createVideoSchema = z.object({
    // Product Data
    productId: z.string().default(""),
    productName: z.string().default(""),
    productDescription: z.string().default(""),

    // Character & Style
    characterDescription: z.string().default(""),
    gender: z.enum(["male", "female"]).default("female"),
    ageRange: z.enum(["child", "teen", "young-adult", "adult", "middle-age", "senior"]).default("young-adult"),
    expression: z.enum(["neutral", "happy", "excited", "serious"]).default("happy"),
    movement: z.enum(["static", "minimal", "active"]).default("minimal"),
    clothingStyles: z.array(z.enum(["casual", "formal", "sporty", "fashion", "uniform"])).default(["casual"]),
    characterOutfit: z.enum([
        "original",
        "tshirt-casual", "shirt-button", "polo", "hoodie", "sweater-knit",
        "jacket-denim", "jacket-leather", "blazer", "suit-formal",
        "tank-top", "crop-top", "oversize-tee",
        "dress-casual", "dress-elegant", "dress-korean", "dress-mini",
        "skirt-outfit", "jeans-outfit",
        "sportswear", "gym-wear", "yoga-wear",
        "streetwear", "vintage", "minimal-chic",
        "korean-style", "japanese-style", "thai-traditional",
        "uniform-nurse", "uniform-office", "uniform-school", "uniform-chef",
        "pajamas", "beach-wear", "luxury-brand",
        "cardigan", "trenchcoat", "bomber-jacket",
        "linen-casual", "ruffle-blouse", "off-shoulder",
        "custom"
    ]).default("original"),
<<<<<<< HEAD
    clothingHighlight: z.string().default(""),
=======
    customOutfitPrompt: z.string().default(""),
>>>>>>> 49f681acae472624be685d31d6f90cb2f5162026
    touchLevel: z.enum(["none", "light", "medium", "heavy"]).default("light"),
    cameraAngles: z.array(z.enum(["front", "side", "close-up", "full-body", "dynamic"])).default(["front", "close-up"]),

    // AI Scripting
    useAiScript: z.boolean().default(true),
    aiPrompt: z.string().default(""),
    videoStyle: z.enum([
        "ugc-review", "cgi-realistic", "hands-only", "cute-dance", "runway",
        "product-demo", "lifestyle", "studio", "outdoor", "hook-pain",
        "educational", "opinion", "problem-solution", "comedy", "theater-drama",
        "musical", "action", "mild-horror", "fantasy", "scifi",
        "timelapse", "behind-the-scenes", "challenge", "comparison", "tutorial",
        "interview", "vlog", "storytelling", "reaction", "unboxing",
        "straight-review", "transformation", "stop-motion", "split-screen", "first-person",
        "aesthetic", "vintage", "futuristic", "nature", "city",
        "minimal", "chaotic", "satisfying", "epic", "cute",
        "mysterious", "inspirational", "urgent", "relaxing"
    ]).default("ugc-review"),
    sceneScriptsRaw: z.string().default(""),
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
    hookEnabled: z.boolean().default(false),
    ctaEnabled: z.boolean().default(false),

    // Engine Selection
    videoEngine: z.enum(["veo", "grok"]).default("veo"),

    // Grok Settings
    grokAspectRatio: z.enum(["16:9", "9:16", "1:1", "3:2", "2:3"]).default("9:16"),
    grokResolution: z.enum(["480p", "720p"]).default("480p"),
    grokDuration: z.enum(["6s", "10s"]).default("6s"),

    // Google Flow Settings (Veo)
    outputType: z.enum(["image", "video"]).default("video"),
    orientation: z.enum(["horizontal", "vertical"]).default("vertical"),
    outputCount: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).default(1),
    veoQuality: z.enum(["fast", "quality"]).default("fast"),
    sceneCount: z.number().int().min(1).max(10).default(2),


    // Posting Settings
    autoPostYoutube: z.boolean().default(false),
    autoPostTikTok: z.boolean().default(false),

    // YouTube Shorts Settings
    youtubeTitle: z.string().default(""),
    youtubeDescription: z.string().default(""),
    youtubeMadeForKids: z.boolean().default(false),
    youtubeVisibility: z.enum(["public", "unlisted", "private"]).default("public"),
    youtubeScheduleEnabled: z.boolean().default(false),
    youtubeScheduleDate: z.string().default(""),
    youtubeScheduleTime: z.string().default(""),

    // Scene Background
    sceneBackground: z.string().default("studio"),
    customSceneBackground: z.string().default(""),

    // Keywords
    mustUseKeywords: z.string().default(""),
    avoidKeywords: z.string().default(""),

    // Per-scene video action descriptions (generated alongside scripts)
    sceneVideoActions: z.string().default(""),

    // Cached real product info from search (JSON string)
    cachedProductInfo: z.string().default(""),
});

export type CreateVideoFormData = z.infer<typeof createVideoSchema>;

export const createVideoDefaultValues: CreateVideoFormData = {
    productId: "",
    productName: "",
    productDescription: "",
    characterDescription: "",
    gender: "female",
    ageRange: "young-adult",
    expression: "happy",
    movement: "minimal",
    clothingStyles: ["casual"],
    characterOutfit: "original" as const,
    clothingHighlight: "",
    touchLevel: "light",
    cameraAngles: ["front", "close-up"],
    useAiScript: true,
    aiPrompt: "",
    videoStyle: "ugc-review" as const,
    sceneScriptsRaw: "",
    saleStyle: "storytelling",
    language: "th-central",
    voiceTone: "energetic",
    template: "product-review",
    hookText: "",
    ctaText: "",
    hookEnabled: false,
    ctaEnabled: false,
    videoEngine: "veo",
    outputType: "video",
    orientation: "vertical",
    outputCount: 1,
    veoQuality: "fast" as const,
    sceneCount: 2,
    grokAspectRatio: "9:16" as const,
    grokResolution: "480p" as const,
    grokDuration: "6s" as const,
    autoPostYoutube: false,
    autoPostTikTok: false,
    youtubeTitle: "",
    youtubeDescription: "",
    youtubeMadeForKids: false,
    youtubeVisibility: "public" as const,
    youtubeScheduleEnabled: false,
    youtubeScheduleDate: "",
    youtubeScheduleTime: "",
    sceneBackground: "studio",
    mustUseKeywords: "",
    avoidKeywords: "",
    sceneVideoActions: "",
    cachedProductInfo: "",
};
