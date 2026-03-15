import { buildSceneVideoPromptJSON, generateQuickPrompts, type PromptGenerationConfig } from "./veoPromptService";
import type { TemplateOption, VideoStyleOption } from "../types/netflow";

export interface PromptBenchmarkCase {
    id: string;
    template: TemplateOption;
    style: VideoStyleOption;
    sceneCount: number;
    config: PromptGenerationConfig;
}

export interface PromptBenchmarkCaseResult {
    id: string;
    template: TemplateOption;
    style: VideoStyleOption;
    sceneCount: number;
    score: number;
    riskLevel: "low" | "medium" | "high";
    imagePromptLength: number;
    videoPromptLength: number;
    scenePromptCount: number;
    issueCount: number;
    criticalIssueCount: number;
    warningIssueCount: number;
    summary: string;
    topIssues: string[];
}

export interface PromptBenchmarkAggregate {
    averageScore: number;
    minScore: number;
    maxScore: number;
    lowRiskCount: number;
    mediumRiskCount: number;
    highRiskCount: number;
}

export interface PromptBenchmarkReport {
    generatedAt: string;
    totalCases: number;
    templates: TemplateOption[];
    styles: VideoStyleOption[];
    sceneCounts: number[];
    aggregate: PromptBenchmarkAggregate;
    byTemplate: Record<string, PromptBenchmarkAggregate>;
    byStyle: Record<string, PromptBenchmarkAggregate>;
    bySceneCount: Record<string, PromptBenchmarkAggregate>;
    worstCases: PromptBenchmarkCaseResult[];
    bestCases: PromptBenchmarkCaseResult[];
    results: PromptBenchmarkCaseResult[];
}

export interface PromptBenchmarkMatrixOptions {
    templates?: TemplateOption[];
    styles?: VideoStyleOption[];
    sceneCounts?: number[];
}

export const DEFAULT_BENCHMARK_TEMPLATES: TemplateOption[] = [
    "product-review",
    "brainrot-product",
    "food-review",
    "fashion-review",
    "gadget-review",
    "unboxing",
    "comparison",
    "testimonial",
    "tutorial",
    "before-after"
];

export const DEFAULT_BENCHMARK_STYLES: VideoStyleOption[] = [
    "ugc-review",
    "product-demo",
    "hands-only",
    "first-person",
    "split-screen",
    "comparison",
    "interview",
    "tutorial",
    "lifestyle",
    "stop-motion",
    "anime",
    "3d-cartoon",
    "2d-cartoon",
    "transformation",
    "cgi-realistic"
];

export const DEFAULT_BENCHMARK_SCENE_COUNTS = [1, 3, 5, 8, 10];

const round = (value: number): number => Math.round(value * 100) / 100;

const aggregateResults = (results: PromptBenchmarkCaseResult[]): PromptBenchmarkAggregate => {
    if (results.length === 0) {
        return {
            averageScore: 0,
            minScore: 0,
            maxScore: 0,
            lowRiskCount: 0,
            mediumRiskCount: 0,
            highRiskCount: 0
        };
    }

    const scores = results.map(result => result.score);
    return {
        averageScore: round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
        minScore: Math.min(...scores),
        maxScore: Math.max(...scores),
        lowRiskCount: results.filter(result => result.riskLevel === "low").length,
        mediumRiskCount: results.filter(result => result.riskLevel === "medium").length,
        highRiskCount: results.filter(result => result.riskLevel === "high").length
    };
};

const groupAggregate = <T extends string>(results: PromptBenchmarkCaseResult[], keyFn: (result: PromptBenchmarkCaseResult) => T): Record<string, PromptBenchmarkAggregate> => {
    const groups = new Map<string, PromptBenchmarkCaseResult[]>();
    for (const result of results) {
        const key = keyFn(result);
        const existing = groups.get(key) || [];
        existing.push(result);
        groups.set(key, existing);
    }
    return Object.fromEntries(Array.from(groups.entries()).map(([key, items]) => [key, aggregateResults(items)]));
};

export const buildPromptBenchmarkCase = (
    template: TemplateOption,
    style: VideoStyleOption,
    sceneCount: number
): PromptBenchmarkCase => {
    const config: PromptGenerationConfig = {
        productName: "Netflow Benchmark Product",
        productDescription: "Premium consumer product with clear demo-friendly features, stable packaging, and strong hero-object readability",
        template,
        voiceTone: style === "interview" ? "professional" : "friendly",
        saleStyle: template === "comparison" || template === "tutorial" ? "educational" : "storytelling",
        language: "th-central",
        videoStyle: style,
        characterDescription: "presentable Thai creator with clean modern styling",
        gender: "female",
        ageRange: "young-adult",
        expression: style === "interview" ? "serious" : "happy",
        movement: style === "hands-only" || style === "first-person" ? "minimal" : "active",
        aspectRatio: "9:16",
        sceneCount,
        clipDuration: sceneCount * 8,
        hookText: "หยุดก่อน ถ้าคุณยังไม่เคยลองสิ่งนี้",
        ctaText: "ลองเลยตอนนี้แล้วคุณจะเห็นความต่าง",
        mustUseKeywords: "clear product visibility, consistent identity, clean motion",
        avoidKeywords: "floating text, warped anatomy, confusing props",
        aiPrompt: "Maintain premium clarity, continuity, and natural action readability throughout the entire sequence.",
        cachedProductInfo: "Benchmark scenario focused on prompt quality, compatibility, continuity, and clarity across styles and scene counts.",
        clothingStyles: ["casual"],
        characterOutfit: "tshirt-casual",
        customOutfitPrompt: "",
        clothingHighlight: "clean silhouette, consistent sleeves",
        cameraAngles: style === "hands-only" || style === "first-person" ? ["close-up", "dynamic"] : ["front", "close-up"],
        touchLevel: template === "comparison" ? "light" : "medium",
        sceneBackground: style === "interview" ? "office" : style === "lifestyle" ? "living-room" : "studio",
        userScript: ""
    };

    return {
        id: `${template}__${style}__${sceneCount}`,
        template,
        style,
        sceneCount,
        config
    };
};

export const buildPromptBenchmarkMatrix = (options: PromptBenchmarkMatrixOptions = {}): PromptBenchmarkCase[] => {
    const templates = options.templates || DEFAULT_BENCHMARK_TEMPLATES;
    const styles = options.styles || DEFAULT_BENCHMARK_STYLES;
    const sceneCounts = options.sceneCounts || DEFAULT_BENCHMARK_SCENE_COUNTS;
    const cases: PromptBenchmarkCase[] = [];

    for (const template of templates) {
        for (const style of styles) {
            for (const sceneCount of sceneCounts) {
                cases.push(buildPromptBenchmarkCase(template, style, sceneCount));
            }
        }
    }

    return cases;
};

export const runPromptBenchmarkCase = (benchmarkCase: PromptBenchmarkCase): PromptBenchmarkCaseResult => {
    const result = generateQuickPrompts(benchmarkCase.config);
    const scenePromptCount = result.sceneScripts?.length || 0;
    const scenePrompts = result.videoPromptMeta && result.sceneScripts
        ? result.sceneScripts.slice(1).map((sceneScript, index) => buildSceneVideoPromptJSON(result.videoPromptMeta!, sceneScript, index + 2))
        : [];
    const qaReport = result.qaReport;
    const topIssues = (qaReport?.issues || []).slice(0, 5).map(issue => `${issue.severity.toUpperCase()}: ${issue.title}`);

    return {
        id: benchmarkCase.id,
        template: benchmarkCase.template,
        style: benchmarkCase.style,
        sceneCount: benchmarkCase.sceneCount,
        score: qaReport?.score ?? 0,
        riskLevel: qaReport?.riskLevel ?? "high",
        imagePromptLength: result.imagePrompt.length,
        videoPromptLength: result.videoPrompt.length,
        scenePromptCount: Math.max(scenePromptCount, scenePrompts.length + 1),
        issueCount: qaReport?.issues.length ?? 0,
        criticalIssueCount: qaReport?.issues.filter(issue => issue.severity === "critical").length ?? 0,
        warningIssueCount: qaReport?.issues.filter(issue => issue.severity === "warning").length ?? 0,
        summary: qaReport?.summary ?? "No QA report available",
        topIssues
    };
};

export const runPromptBenchmarkMatrix = (options: PromptBenchmarkMatrixOptions = {}): PromptBenchmarkReport => {
    const cases = buildPromptBenchmarkMatrix(options);
    const results = cases.map(runPromptBenchmarkCase);
    const sortedByScore = [...results].sort((a, b) => a.score - b.score || b.issueCount - a.issueCount);
    const templates = options.templates || DEFAULT_BENCHMARK_TEMPLATES;
    const styles = options.styles || DEFAULT_BENCHMARK_STYLES;
    const sceneCounts = options.sceneCounts || DEFAULT_BENCHMARK_SCENE_COUNTS;

    return {
        generatedAt: new Date().toISOString(),
        totalCases: results.length,
        templates,
        styles,
        sceneCounts,
        aggregate: aggregateResults(results),
        byTemplate: groupAggregate(results, result => result.template),
        byStyle: groupAggregate(results, result => result.style),
        bySceneCount: groupAggregate(results, result => String(result.sceneCount)),
        worstCases: sortedByScore.slice(0, 15),
        bestCases: [...results].sort((a, b) => b.score - a.score || a.issueCount - b.issueCount).slice(0, 15),
        results
    };
};
