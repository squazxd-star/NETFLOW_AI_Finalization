import type { TemplateOption } from "../types/netflow";

export type PromptQaSeverity = "info" | "warning" | "critical";
export type PromptQaRiskLevel = "low" | "medium" | "high";
export type PromptSubjectMode = "presenter" | "hands" | "pov" | "interview";
export type PromptDialogueMode = "on_camera" | "voiceover" | "off_camera";
export type PromptTarget = "image" | "video" | "scene";

export interface PromptCompatibilityContext {
    template: TemplateOption;
    videoStyle?: string;
    sceneCount: number;
    aspectRatio?: string;
    hasCharacterImage: boolean;
    hasProductImage: boolean;
    hasUserScript: boolean;
}

export interface PromptCompatibilityProfile {
    key: string;
    template: TemplateOption;
    videoStyleKey: string;
    tags: string[];
    subjectMode: PromptSubjectMode;
    dialogueMode: PromptDialogueMode;
    scene1TalkOnly: boolean;
    allowSplitScreen: boolean;
    allowMultipleProducts: boolean;
    suppressFrontFacing: boolean;
    forceOffCameraEyeline: boolean;
    imageGuidance: string;
    videoGuidance: string;
    sceneGuidance: string;
    continuityGuidance: string;
    constraintGuidance: string;
}

export interface PromptQaIssue {
    severity: PromptQaSeverity;
    category: string;
    title: string;
    detail: string;
    evidence?: string;
}

export interface PromptQaMetrics {
    imagePromptLength: number;
    videoPromptLength: number;
    sceneCount: number;
    scenePromptCount: number;
    negativeDirectiveCount: number;
}

export interface PromptQaReport {
    score: number;
    riskLevel: PromptQaRiskLevel;
    summary: string;
    compatibilityTags: string[];
    rewritesApplied: string[];
    issues: PromptQaIssue[];
    metrics: PromptQaMetrics;
}

export interface PromptOptimizationInput {
    compatibility: PromptCompatibilityProfile;
    imagePrompt: string;
    videoPrompt: string;
    scenePrompts?: string[];
    sceneCount: number;
    hasCharacterImage: boolean;
}

export interface PromptOptimizationResult {
    imagePrompt: string;
    videoPrompt: string;
    scenePrompts: string[];
    qaReport: PromptQaReport;
}

const unique = (items: string[]): string[] => Array.from(new Set(items.filter(Boolean)));

const appendBlock = (prompt: string, block: string): string => {
    const trimmed = block.trim();
    if (!trimmed) return prompt;
    return `${prompt.trim()} ${trimmed}`.replace(/\s{2,}/g, " ").trim();
};

const cleanPrompt = (prompt: string): string => prompt
    .replace(/\s{2,}/g, " ")
    .replace(/\.\s*\./g, ".")
    .replace(/\s+([,.;:])/g, "$1")
    .trim();

export const buildPromptCompatibilityProfile = (context: PromptCompatibilityContext): PromptCompatibilityProfile => {
    const videoStyleKey = context.videoStyle || "ugc-review";
    const tags: string[] = [context.template, videoStyleKey];
    let subjectMode: PromptSubjectMode = "presenter";
    let dialogueMode: PromptDialogueMode = "on_camera";
    let scene1TalkOnly = context.sceneCount >= 2;
    let allowSplitScreen = false;
    let allowMultipleProducts = context.template === "comparison" || context.template === "before-after";
    let suppressFrontFacing = false;
    let forceOffCameraEyeline = false;
    const imageGuidance: string[] = [];
    const videoGuidance: string[] = [];
    const sceneGuidance: string[] = [];
    const continuityGuidance: string[] = [];
    const constraintGuidance: string[] = [];

    if (videoStyleKey === "hands-only") {
        subjectMode = "hands";
        dialogueMode = "voiceover";
        scene1TalkOnly = false;
        suppressFrontFacing = true;
        tags.push("hands_only_demo", "voiceover_only");
        imageGuidance.push("Hands-only composition. Show only hands, forearms, sleeves, and the product. No talking head, no visible full face, no presenter portrait.");
        videoGuidance.push("Use a premium hands-only product-demo grammar. The narrator is heard as voiceover while hands demonstrate the product with precise, logical handling.");
        sceneGuidance.push("Every scene must preserve the same hand appearance, sleeve styling, skin tone, accessories, manicure, and hand dominance continuity.");
        continuityGuidance.push("Continuity priority is hand appearance, grip logic, product orientation, and tabletop geography instead of face continuity.");
        constraintGuidance.push("Avoid face-centric framing, direct-to-camera presenter blocking, and visible mouth performance.");
    }

    if (videoStyleKey === "first-person") {
        subjectMode = "pov";
        dialogueMode = "voiceover";
        scene1TalkOnly = false;
        suppressFrontFacing = true;
        tags.push("first_person_pov", "voiceover_only");
        imageGuidance.push("First-person POV composition. Frame the product from the viewer's perspective with hands entering frame naturally. Avoid third-person talking-head staging.");
        videoGuidance.push("Use first-person camera logic with body-mounted or viewer-perspective framing. Let narration play as voiceover while the viewer-perspective hands interact with the product.");
        sceneGuidance.push("Preserve POV continuity: same hand appearance, sleeve styling, camera height, movement rhythm, and screen direction across scenes.");
        continuityGuidance.push("Protect viewer-perspective continuity more strongly than facial visibility. Keep the camera acting like the same person across the entire sequence.");
        constraintGuidance.push("Do not switch back to presenter-facing framing unless a reflection or motivated mirror shot is explicitly needed.");
    }

    if (videoStyleKey === "split-screen") {
        allowSplitScreen = true;
        scene1TalkOnly = false;
        tags.push("split_screen_layout");
        imageGuidance.push("A clean split-screen or dual-panel layout is allowed when it improves clarity. Keep the composition elegant, readable, and limited to two panels.");
        videoGuidance.push("Use split-screen language deliberately for comparison, before/after, or simultaneous context. Keep timing synchronized and the layout stable.");
        sceneGuidance.push("When split-screen is used, both panels must share consistent lighting logic, product identity, and editorial rhythm.");
        continuityGuidance.push("Never let split-screen degrade product continuity, character identity, or action readability.");
        constraintGuidance.push("Maximum two panels. Avoid collage clutter, chaotic multi-box grids, or unreadable panel stacks.");
    }

    if (context.template === "comparison" || context.template === "before-after" || videoStyleKey === "comparison") {
        allowMultipleProducts = true;
        scene1TalkOnly = false;
        tags.push("controlled_comparison");
        imageGuidance.push("A controlled two-object or two-state comparison is allowed when it directly supports the concept. Keep the hero product dominant and the comparison clean.");
        videoGuidance.push("Comparison grammar is allowed: use either hero product versus one comparator or before-versus-after state, but never clutter the frame with many competing objects.");
        sceneGuidance.push("Keep both compared states visually stable and easy to distinguish through framing, positioning, and action rather than on-screen text.");
        continuityGuidance.push("Maintain stable identity for the hero product while keeping the comparison object or prior state visually consistent from scene to scene.");
        constraintGuidance.push("Allow exactly two products or states only when comparison clarity requires it; otherwise default back to one hero product.");
    }

    if (context.template === "testimonial") {
        tags.push("testimonial_storytelling");
        imageGuidance.push("Authentic testimonial framing: calm, believable, emotionally grounded presence with natural posture and trust-building realism.");
        videoGuidance.push("Use testimonial grammar with sincerity, measured pacing, genuine emotional clarity, and restrained sales pressure.");
        sceneGuidance.push("Preserve testimonial continuity through stable emotion, believable delivery, and grounded body language across scenes.");
        continuityGuidance.push("Prioritize emotional truth, wardrobe continuity, and natural scene-to-scene progression over aggressive direct-response staging.");
        constraintGuidance.push("Keep the testimonial credible and human. Avoid overselling, theatrical hype, or gimmick blocking unless the selected style explicitly calls for it.");
    }

    if (videoStyleKey === "interview") {
        subjectMode = "interview";
        dialogueMode = "off_camera";
        scene1TalkOnly = false;
        suppressFrontFacing = true;
        forceOffCameraEyeline = true;
        tags.push("interview_language");
        imageGuidance.push("Interview portrait grammar: seated or stable posture, premium documentary lighting, slight off-camera eyeline, calm believable presence.");
        videoGuidance.push("Use interview grammar with a slight off-camera eyeline, measured speaking cadence, restrained gestures, and documentary-style camera blocking.");
        sceneGuidance.push("Preserve interview blocking across scenes: same seat logic, eyeline direction, and restrained gesture language, with motivated B-roll cutaways when needed.");
        continuityGuidance.push("Continuity priority is eyeline direction, chair or standing position, wardrobe, lighting family, and emotional truth rather than aggressive direct-to-lens delivery.");
        constraintGuidance.push("Avoid high-pressure direct-response sales posture and avoid direct lens staring unless the script intentionally shifts out of interview mode.");
    }

    if (["anime", "3d-cartoon", "2d-cartoon"].includes(videoStyleKey)) {
        tags.push("dedicated_stylized_medium");
        imageGuidance.push("Use a dedicated stylized rule set: preserve strong silhouette readability, stable character design language, consistent line treatment or stylized surface modeling, and clean shape hierarchy.");
        videoGuidance.push("Stylized-medium rule set: preserve consistent design language, stable anatomy for the chosen medium, clean motion arcs, and clear product readability without forcing live-action language.");
        sceneGuidance.push("Every scene must preserve the same stylized design model for face, hair, outfit silhouette, and product geometry.");
        continuityGuidance.push("Prioritize design-sheet consistency, silhouette continuity, and stable stylized anatomy over live-action realism cues.");
        constraintGuidance.push("Do not let the medium drift between anime, 3D cartoon, 2D cartoon, or semi-photoreal hybrid looks inside one video.");
    }

    return {
        key: `${context.template}:${videoStyleKey}`,
        template: context.template,
        videoStyleKey,
        tags: unique(tags),
        subjectMode,
        dialogueMode,
        scene1TalkOnly,
        allowSplitScreen,
        allowMultipleProducts,
        suppressFrontFacing,
        forceOffCameraEyeline,
        imageGuidance: unique(imageGuidance).join(" "),
        videoGuidance: unique(videoGuidance).join(" "),
        sceneGuidance: unique(sceneGuidance).join(" "),
        continuityGuidance: unique(continuityGuidance).join(" "),
        constraintGuidance: unique(constraintGuidance).join(" ")
    };
};

export const applyPromptCompatibility = (
    prompt: string,
    compatibility: PromptCompatibilityProfile,
    target: PromptTarget
): { prompt: string; rewritesApplied: string[] } => {
    let next = prompt;
    const rewritesApplied: string[] = [];

    if (compatibility.allowSplitScreen) {
        const updated = next.replace(/NO split screen, NO collage, NO side-by-side panels, NO divided frames\./gi, "Use a clean split-screen or dual-panel layout only when it improves clarity. Keep the layout elegant, readable, and limited to two panels.");
        if (updated !== next) rewritesApplied.push("Enabled split-screen-compatible composition rules");
        next = updated;
    }

    if (compatibility.allowMultipleProducts) {
        const replacements: Array<[RegExp, string]> = [
            [/Single product only\./gi, "Use one hero product by default, or exactly two clear products or states when comparison clarity requires it."],
            [/Show one hero product as the main object in frame\./gi, "Keep one hero product dominant in frame, or allow one controlled comparison object or prior state when the concept requires it."],
            [/PRODUCT IDENTITY LOCK:[^.]*\./gi, "PRODUCT IDENTITY LOCK: Preserve the hero product with maximum consistency. If comparison is required, keep the second product or state equally stable and clearly differentiated through framing rather than text."]
        ];
        for (const [pattern, replacement] of replacements) {
            const updated = next.replace(pattern, replacement);
            if (updated !== next) rewritesApplied.push("Enabled controlled comparison mode");
            next = updated;
        }
    }

    if (compatibility.subjectMode === "hands" || compatibility.subjectMode === "pov") {
        const patterns: Array<[RegExp, string]> = [
            [/CHARACTER POSE:[^.]*\./gi, ""],
            [/SCENE 1 FACE TEMPLATE:[^.]*\./gi, ""],
            [/FACE CONTINUITY CHECKPOINT \(SCENE \d+\):[^.]*\./gi, "HAND CONTINUITY CHECKPOINT: Match the same hands, sleeves, accessories, skin tone, and handling style established earlier."],
            [/STRICT FACE & HEAD LOCK:[^.]*\./gi, ""],
            [/FACE IDENTITY PERSISTENCE:[^.]*\./gi, ""],
            [/BODY LOCK:[^.]*\./gi, ""],
            [/HAIR LOCK:[^.]*\./gi, ""],
            [/Character speaks directly to camera[^.]*\./gi, "Voiceover guides the scene while the hands and product perform the action naturally."],
            [/Character speaks to camera with natural hand gestures, no product in hands\./gi, "Voiceover guides the viewer while hands or POV interaction demonstrates the product with natural motion."],
            [/Character talks directly to viewer, no product interaction\./gi, "Voiceover-only delivery. The visual focus stays on hands, sleeves, and the product interaction."],
            [/Same character '([^']+)', same outfit \(([^)]+)\), same environment family and lighting continuity\./gi, "Maintain the same hands, sleeves, accessories, environment family, and lighting continuity across scenes."],
            [/Product frontal, centered\./gi, "Keep the product clearly visible and readable within the hand-led composition."],
            [/Character speaks from first frame\./gi, "Voiceover starts from the first frame while the hands or POV action begins immediately."],
            [/Face fully visible\./gi, ""],
            [/looking directly into the lens/gi, "keeping POV-consistent framing"],
            [/front-facing/gi, compatibility.subjectMode === "hands" ? "hands-led" : "POV-consistent"]
        ];
        for (const [pattern, replacement] of patterns) {
            const updated = next.replace(pattern, replacement);
            if (updated !== next) rewritesApplied.push(compatibility.subjectMode === "hands" ? "Reframed prompts for hands-only mode" : "Reframed prompts for first-person POV mode");
            next = updated;
        }
    }

    if (compatibility.forceOffCameraEyeline) {
        const patterns: Array<[RegExp, string]> = [
            [/looking directly into the lens/gi, "holding a slight off-camera eyeline"],
            [/speaks directly to camera/gi, "speaks in an interview format with a slight off-camera eyeline"],
            [/speak directly to camera/gi, "speak in an interview format with a slight off-camera eyeline"],
            [/face the camera directly/gi, "hold a slight off-camera eyeline"],
            [/eyes looking straight at the viewer/gi, "eyes resting slightly off-camera"],
            [/looking straight at the viewer/gi, "holding a calm off-camera eyeline"],
            [/head-on symmetrical composition/gi, "balanced interview composition"],
            [/front-facing/gi, "interview-style"],
            [/Engaging eye contact, confident posture\./gi, "Calm interview presence, slight off-camera eyeline, grounded posture."],
            [/Character speaks from first frame\./gi, "Interview dialogue starts from the first frame with a measured, documentary-style cadence."],
            [/Character talks directly to viewer, no product interaction\./gi, "Interview-style delivery with calm body language and a slight off-camera eyeline."],
            [/Natural front-facing angle/gi, "Natural interview framing"]
        ];
        for (const [pattern, replacement] of patterns) {
            const updated = next.replace(pattern, replacement);
            if (updated !== next) rewritesApplied.push("Adjusted dialogue and framing for interview mode");
            next = updated;
        }
    }

    if (compatibility.imageGuidance && target === "image") {
        next = appendBlock(next, compatibility.imageGuidance);
        rewritesApplied.push("Appended image compatibility guidance");
    }

    if (compatibility.videoGuidance && target === "video") {
        next = appendBlock(next, compatibility.videoGuidance);
        rewritesApplied.push("Appended video compatibility guidance");
    }

    if (target === "scene") {
        if (compatibility.sceneGuidance) {
            next = appendBlock(next, compatibility.sceneGuidance);
            rewritesApplied.push("Appended scene compatibility guidance");
        }
        if (compatibility.continuityGuidance) {
            next = appendBlock(next, compatibility.continuityGuidance);
            rewritesApplied.push("Appended continuity compatibility guidance");
        }
    }

    if (compatibility.constraintGuidance) {
        next = appendBlock(next, compatibility.constraintGuidance);
        rewritesApplied.push("Appended compatibility constraint guidance");
    }

    return {
        prompt: cleanPrompt(next),
        rewritesApplied: unique(rewritesApplied)
    };
};

const collectPromptIssues = (
    compatibility: PromptCompatibilityProfile,
    imagePrompt: string,
    videoPrompt: string,
    scenePrompts: string[],
    sceneCount: number,
    hasCharacterImage: boolean
): PromptQaIssue[] => {
    const issues: PromptQaIssue[] = [];
    const combinedScenePrompts = scenePrompts.join(" ");
    const combined = `${imagePrompt} ${videoPrompt} ${combinedScenePrompts}`;

    const addIssue = (severity: PromptQaSeverity, category: string, title: string, detail: string, evidence?: string) => {
        issues.push({ severity, category, title, detail, evidence });
    };

    if (compatibility.allowSplitScreen && /NO split screen|NO side-by-side|NO divided frames/i.test(combined)) {
        addIssue("critical", "compatibility", "Split-screen contradiction remains", "A split-screen style is selected but the prompt still forbids split-screen composition.", combined.match(/NO split screen[^.]*\./i)?.[0]);
    }

    if (compatibility.allowMultipleProducts && /Single product only\./i.test(combined)) {
        addIssue("critical", "compatibility", "Comparison constraint conflict remains", "Comparison mode is allowed but the prompt still forces a single-product-only rule.", combined.match(/Single product only\./i)?.[0]);
    }

    if (["anime", "3d-cartoon", "2d-cartoon", "stop-motion"].includes(compatibility.videoStyleKey) && /Photorealistic only\./i.test(combined)) {
        addIssue("critical", "style", "Stylized medium conflict remains", "The prompt still contains a photorealistic-only rule while a stylized medium is selected.", combined.match(/Photorealistic only\./i)?.[0]);
    }

    if ((compatibility.subjectMode === "hands" || compatibility.subjectMode === "pov") && /SCENE 1 FACE TEMPLATE|FACE CONTINUITY CHECKPOINT|speaks directly to camera|front-facing/i.test(combined)) {
        addIssue("critical", "framing", "Hands or POV mode still references face-first staging", "Hands-only or first-person mode should not depend on face-centric, direct-to-camera presentation language.", combined.match(/SCENE 1 FACE TEMPLATE[^.]*\.|FACE CONTINUITY CHECKPOINT[^.]*\.|speaks directly to camera[^.]*\.|front-facing[^.]*\./i)?.[0]);
    }

    if (compatibility.forceOffCameraEyeline && /looking directly into the lens|directly to camera|front-facing/i.test(combined)) {
        addIssue("warning", "framing", "Interview mode still leans toward direct-to-lens blocking", "Interview grammar should preserve a slight off-camera eyeline and calmer documentary staging.", combined.match(/looking directly into the lens[^.]*\.|directly to camera[^.]*\.|front-facing[^.]*\./i)?.[0]);
    }

    if (!hasCharacterImage && /Use Image 1 as the absolute visual blueprint for this character's face/i.test(imagePrompt)) {
        addIssue("critical", "reference", "Image prompt still assumes a character face reference", "The image prompt should not reference Image 1 as a face blueprint when no character image exists.", imagePrompt.match(/Use Image 1 as the absolute visual blueprint for this character's face[^.]*\./i)?.[0]);
    }

    const negativeDirectiveCount = (combined.match(/\b(NO|Do NOT|MUST NOT|NEVER|FORBIDDEN|LOCK|IMMUTABLE|ANTI-)\b/gi) || []).length;
    if (negativeDirectiveCount > 95) {
        addIssue("warning", "policy", "Prompt uses very heavy directive density", "The prompt still contains a high density of negative or locking directives, which may increase policy sensitivity or model confusion.", `negative_directive_count=${negativeDirectiveCount}`);
    }

    if (videoPrompt.length > 14000) {
        addIssue("warning", "length", "Video prompt is very long", "Very long prompts can dilute scene priorities and increase contradiction risk.", `video_prompt_length=${videoPrompt.length}`);
    }

    if (sceneCount >= 7) {
        addIssue("warning", "continuity", "High scene-count continuity risk", "Seven or more scenes are supported, but the risk of continuity drift and pacing fatigue is still inherently higher than shorter videos.", `scene_count=${sceneCount}`);
    }

    if (scenePrompts.length > 0 && scenePrompts.some(scene => scene.length > 5500)) {
        addIssue("warning", "length", "One or more follow-up scene prompts are very long", "Long scene prompts can reduce the clarity of the single-beat-per-scene strategy.");
    }

    return issues;
};

export const evaluatePromptSet = (input: PromptOptimizationInput, rewritesApplied: string[] = []): PromptQaReport => {
    const scenePrompts = input.scenePrompts || [];
    const issues = collectPromptIssues(
        input.compatibility,
        input.imagePrompt,
        input.videoPrompt,
        scenePrompts,
        input.sceneCount,
        input.hasCharacterImage
    );
    const score = Math.max(0, 100 - issues.reduce((total, issue) => total + (issue.severity === "critical" ? 18 : issue.severity === "warning" ? 7 : 2), 0));
    const warningCount = issues.filter(issue => issue.severity === "warning").length;
    const riskLevel: PromptQaRiskLevel = issues.some(issue => issue.severity === "critical")
        ? "high"
        : (warningCount >= 2 || score < 80)
            ? "medium"
            : "low";
    const negativeDirectiveCount = ((`${input.imagePrompt} ${input.videoPrompt} ${(scenePrompts || []).join(" ")}`).match(/\b(NO|Do NOT|MUST NOT|NEVER|FORBIDDEN|LOCK|IMMUTABLE|ANTI-)\b/gi) || []).length;
    const metrics: PromptQaMetrics = {
        imagePromptLength: input.imagePrompt.length,
        videoPromptLength: input.videoPrompt.length,
        sceneCount: input.sceneCount,
        scenePromptCount: scenePrompts.length,
        negativeDirectiveCount
    };
    const summary = riskLevel === "low"
        ? "Prompt set passed the compatibility critic with only manageable residual risk."
        : riskLevel === "medium"
            ? "Prompt set is materially improved but still carries some scene-scaling or formatting risk."
            : "Prompt set still contains compatibility contradictions or high-risk prompt traits that need attention.";

    return {
        score,
        riskLevel,
        summary,
        compatibilityTags: input.compatibility.tags,
        rewritesApplied: unique(rewritesApplied),
        issues,
        metrics
    };
};

export const optimizePromptSet = (input: PromptOptimizationInput): PromptOptimizationResult => {
    const applied = new Set<string>();
    const imageResult = applyPromptCompatibility(input.imagePrompt, input.compatibility, "image");
    imageResult.rewritesApplied.forEach(item => applied.add(item));
    const videoResult = applyPromptCompatibility(input.videoPrompt, input.compatibility, "video");
    videoResult.rewritesApplied.forEach(item => applied.add(item));
    const scenePrompts = (input.scenePrompts || []).map(scenePrompt => {
        const sceneResult = applyPromptCompatibility(scenePrompt, input.compatibility, "scene");
        sceneResult.rewritesApplied.forEach(item => applied.add(item));
        return sceneResult.prompt;
    });

    const qaReport = evaluatePromptSet({
        ...input,
        imagePrompt: imageResult.prompt,
        videoPrompt: videoResult.prompt,
        scenePrompts
    }, Array.from(applied));

    return {
        imagePrompt: imageResult.prompt,
        videoPrompt: videoResult.prompt,
        scenePrompts,
        qaReport
    };
};
