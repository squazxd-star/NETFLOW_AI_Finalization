import { useState, useRef } from "react";
import { Controller } from "react-hook-form";
import {
    FileText, Stars, Pencil, RefreshCw, Mic, Sparkles, Globe,
    ImageIcon, ChevronDown, Tag, ShieldAlert, Video
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import { AiScriptSectionProps } from "./types";
import { useTheme } from "@/contexts/ThemeContext";
import { autoSelectBackgroundTop3, autoSelectBackgroundTop3WithAI } from "@/utils/autoBackground";
import {
    templateOptions,
    voiceToneOptions,
    saleStyleOptions,
    languageOptions,
    sceneBackgroundOptions,
    videoStyleOptions,
} from "@/types/netflow";

const AiScriptSection = ({
    register,
    control,
    setValue,
    watch,
    isOpen,
    onToggle,
    productImage
}: AiScriptSectionProps) => {
    const { config: themeConfig } = useTheme();
    const useAiScript = watch("useAiScript");
    const template = watch("template");
    const hookEnabled = watch("hookEnabled");
    const ctaEnabled = watch("ctaEnabled");
    const sceneBackground = watch("sceneBackground") || "studio";
    const isAiMode = useAiScript;

    const [showAllBackgrounds, setShowAllBackgrounds] = useState(false);
    const [autoFlash, setAutoFlash] = useState(false);
    const [isAutoBgLoading, setIsAutoBgLoading] = useState(false);

    // Cache top 3 results + cycle index
    const top3Cache = useRef<string[]>([]);
    const cycleIndex = useRef(0);

    const handleAutoBackground = async () => {
        const name = watch("productName") || "";
        const desc = watch("productDescription") || "";
        if (!name.trim()) {
            alert("กรุณากรอกชื่อสินค้าก่อน แล้วกด Auto อีกครั้ง");
            return;
        }

        // If we already have cached results → just cycle to next
        if (top3Cache.current.length > 0) {
            cycleIndex.current = (cycleIndex.current + 1) % top3Cache.current.length;
            const next = top3Cache.current[cycleIndex.current];
            setValue("sceneBackground", next);
            setAutoFlash(true);
            setTimeout(() => setAutoFlash(false), 800);
            return;
        }

        // First click → fetch top 3 from AI/keyword
        setIsAutoBgLoading(true);
        try {
            const top3 = await autoSelectBackgroundTop3WithAI(name, desc, productImage);
            top3Cache.current = top3;
            cycleIndex.current = 0;
            setValue("sceneBackground", top3[0]);
            setAutoFlash(true);
            setTimeout(() => setAutoFlash(false), 800);
        } catch {
            const top3 = autoSelectBackgroundTop3(name, desc);
            top3Cache.current = top3;
            cycleIndex.current = 0;
            setValue("sceneBackground", top3[0]);
            setAutoFlash(true);
            setTimeout(() => setAutoFlash(false), 800);
        } finally {
            setIsAutoBgLoading(false);
        }
    };

    return (
        <section className="glass-card overflow-hidden">
            <div className="px-4 pt-3">
                <SectionHeader
                    icon={FileText}
                    title="สคริปต์ AI"
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            </div>

            {isOpen && (
                <div className="px-4 pb-4 space-y-5">

                    {/* ═══ Row 1: Script Type Toggle ═══ */}
                    <div className="flex items-center gap-2 p-1 rounded-xl bg-muted/50 border border-border">
                        <button
                            type="button"
                            onClick={() => setValue("useAiScript", true)}
                            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${useAiScript
                                ? 'text-white shadow-lg shadow-primary/25'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            style={useAiScript ? { background: themeConfig.hex } : {}}
                        >
                            <Stars className="w-4 h-4" />
                            AI สร้างอัตโนมัติ
                            <span className={`text-[8px] font-bold px-1 py-0.5 rounded ${useAiScript ? 'text-white/80 bg-white/15' : ''}`} style={!useAiScript ? { color: themeConfig.hex, background: `rgba(${themeConfig.hexRgb}, 0.12)` } : {}}>
                                แนะนำ
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setValue("useAiScript", false)}
                            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${!useAiScript
                                ? 'text-white shadow-lg shadow-primary/25'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            style={!useAiScript ? { background: themeConfig.hex } : {}}
                        >
                            <Pencil className="w-3.5 h-3.5" />
                            เขียนเอง
                        </button>
                    </div>

                    {/* ═══ Row 2: Template + Language (side by side) ═══ */}
                    <div className="grid grid-cols-5 gap-3">
                        <div className="col-span-3">
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium">
                                เทมเพลตสคริปต์
                            </label>
                            <select
                                {...register("template")}
                                className="w-full neon-select text-xs"
                            >
                                {templateOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[10px] text-muted-foreground/60 mt-1 flex items-center gap-1 leading-tight">
                                <Sparkles className="w-3 h-3 flex-shrink-0" />
                                {templateOptions.find(t => t.value === template)?.description}
                            </p>
                        </div>
                        <div className="col-span-2">
                            <label className="text-[11px] text-muted-foreground mb-1.5 block font-medium flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                ภาษา
                            </label>
                            <select
                                {...register("language")}
                                className="w-full neon-select text-xs"
                            >
                                {languageOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ═══ Row 3: สไตล์ภาพ/วีดีโอ ═══ */}
                    <div>
                        <label className="text-[11px] mb-1.5 block font-medium flex items-center gap-1.5 text-muted-foreground">
                            <Video className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                            สไตล์ภาพ / วีดีโอ
                        </label>
                        <select
                            {...register("videoStyle")}
                            className="w-full neon-select text-xs"
                        >
                            {videoStyleOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* ═══ Row 4: Voice & Energy (compact row) ═══ */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] mb-1.5 block font-medium flex items-center gap-1.5 text-muted-foreground">
                                <Mic className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                น้ำเสียง & อารมณ์
                            </label>
                            <select
                                {...register("voiceTone")}
                                className="w-full neon-select text-xs"
                            >
                                {voiceToneOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-[11px] mb-1.5 block font-medium flex items-center gap-1.5 text-muted-foreground">
                                <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                ระดับพลังงาน
                            </label>
                            <select
                                {...register("saleStyle")}
                                className="w-full neon-select text-xs"
                            >
                                {saleStyleOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ═══ Row 5: Scene Background Picker ═══ */}
                    <div>
                        <div className="flex items-center mb-2">
                            <label className="text-[11px] font-medium flex items-center gap-1.5 text-muted-foreground">
                                <ImageIcon className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                ฉากพื้นหลัง (Background)
                            </label>
                        </div>

                        <div className={`grid grid-cols-5 gap-1.5 ${showAllBackgrounds ? '' : 'max-h-[160px] overflow-hidden'}`}>
                            {/* Auto tile — AI-powered when product image available */}
                            <button
                                type="button"
                                onClick={handleAutoBackground}
                                disabled={isAutoBgLoading}
                                className={`relative group flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-xl text-center transition-all duration-200 border aspect-square ${
                                    isAutoBgLoading
                                        ? 'shadow-md border-white/[0.15] bg-white/[0.04]'
                                        : autoFlash
                                            ? 'shadow-lg scale-[1.02]'
                                            : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] hover:scale-[1.03]'
                                }`}
                                style={autoFlash ? {
                                    borderColor: themeConfig.hex,
                                    background: `linear-gradient(145deg, rgba(${themeConfig.hexRgb}, 0.15), rgba(${themeConfig.hexRgb}, 0.05))`,
                                    boxShadow: `0 4px 16px rgba(${themeConfig.hexRgb}, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
                                } : {}}
                                title={productImage ? "AI วิเคราะห์รูป+ชื่อสินค้า แล้วเลือกฉากอัตโนมัติ" : "วิเคราะห์ชื่อสินค้าแล้วเลือกฉากอัตโนมัติ"}
                            >
                                {isAutoBgLoading ? (
                                    <RefreshCw className="w-5 h-5 animate-spin" style={{ color: themeConfig.hex }} />
                                ) : (
                                    <span className={`text-[20px] leading-none transition-all duration-200 ${autoFlash ? 'scale-110 drop-shadow-lg' : 'group-hover:scale-110'}`}>
                                        🪄
                                    </span>
                                )}
                                <span className={`text-[10px] font-medium leading-tight truncate w-full mt-0.5 ${isAutoBgLoading ? 'font-bold' : autoFlash ? 'font-bold' : 'text-muted-foreground/60'}`} style={isAutoBgLoading || autoFlash ? { color: themeConfig.hex } : {}}>
                                    {isAutoBgLoading ? 'AI...' : 'Auto'}
                                </span>
                                <div className="absolute -top-1 -right-1 text-[8px] leading-none drop-shadow">{productImage ? '🧠' : '⭐'}</div>
                            </button>
                            {sceneBackgroundOptions.map((bg) => {
                                const isActive = sceneBackground === bg.value;
                                return (
                                    <button
                                        key={bg.value}
                                        type="button"
                                        onClick={() => setValue("sceneBackground", bg.value)}
                                        className={`relative group flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-xl text-center transition-all duration-200 border aspect-square ${
                                            isActive
                                                ? 'shadow-lg scale-[1.02]'
                                                : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] hover:scale-[1.03]'
                                        }`}
                                        style={isActive ? {
                                            borderColor: themeConfig.hex,
                                            background: `linear-gradient(145deg, rgba(${themeConfig.hexRgb}, 0.15), rgba(${themeConfig.hexRgb}, 0.05))`,
                                            boxShadow: `0 4px 16px rgba(${themeConfig.hexRgb}, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
                                        } : {}}
                                        title={bg.description}
                                    >
                                        <span className={`text-[20px] leading-none transition-all duration-200 ${isActive ? 'scale-110 drop-shadow-lg' : 'group-hover:scale-110'}`}>
                                            {bg.emoji}
                                        </span>
                                        <span className={`text-[10px] font-medium leading-tight truncate w-full mt-0.5 ${isActive ? 'font-bold' : 'text-muted-foreground/60'}`} style={isActive ? { color: themeConfig.hex } : {}}>
                                            {bg.label}
                                        </span>
                                        {isActive && (
                                            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-md" style={{ background: themeConfig.hex }}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {sceneBackgroundOptions.length > 10 && (
                            <button
                                type="button"
                                onClick={() => setShowAllBackgrounds(!showAllBackgrounds)}
                                className="w-full mt-2 py-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-1 rounded-lg hover:bg-white/[0.03]"
                            >
                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAllBackgrounds ? 'rotate-180' : ''}`} />
                                {showAllBackgrounds ? 'แสดงน้อยลง' : `ดูทั้งหมด (${sceneBackgroundOptions.length} ฉาก)`}
                            </button>
                        )}

                        {sceneBackground === "custom" && (
                            <input
                                type="text"
                                placeholder="พิมพ์ฉากที่ต้องการ เช่น ร้านขายยา, สระว่ายน้ำ..."
                                className="w-full neon-input text-xs mt-2"
                                onChange={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    input.dataset.customBg = e.target.value;
                                }}
                            />
                        )}
                    </div>

                    {/* ═══ Row 6: Hook & CTA (compact) ═══ */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <Controller
                                    name="hookEnabled"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-7 h-4 rounded-full bg-muted border border-border peer-checked:bg-primary/80 transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:after:translate-x-3" />
                                        </label>
                                    )}
                                />
                                <label className="text-[11px] text-muted-foreground font-medium">
                                    ประโยคเปิด (Hook)
                                </label>
                            </div>
                            <input
                                type="text"
                                {...register("hookText")}
                                placeholder="เช่น หยุดดูคลิปนี้ก่อน..."
                                disabled={!hookEnabled}
                                className={`w-full neon-input text-xs ${!hookEnabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1.5">
                                <Controller
                                    name="ctaEnabled"
                                    control={control}
                                    render={({ field }) => (
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => field.onChange(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-7 h-4 rounded-full bg-muted border border-border peer-checked:bg-primary/80 transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:after:translate-x-3" />
                                        </label>
                                    )}
                                />
                                <label className="text-[11px] text-muted-foreground font-medium">
                                    ปุ่มกระตุ้น (CTA)
                                </label>
                            </div>
                            <input
                                type="text"
                                {...register("ctaText")}
                                placeholder="เช่น กดตะกร้าเลย..."
                                disabled={!ctaEnabled}
                                className={`w-full neon-input text-xs ${!ctaEnabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                            />
                        </div>
                    </div>

                    {/* ═══ Row 7: Keywords (compact) ═══ */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[11px] mb-1.5 block text-muted-foreground font-medium flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                คำสำคัญที่ต้องใช้
                            </label>
                            <input
                                type="text"
                                {...register("mustUseKeywords")}
                                placeholder="คั่นด้วยเครื่องหมาย จุลภาค"
                                className="w-full neon-input text-xs"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] mb-1.5 block text-muted-foreground font-medium flex items-center gap-1.5">
                                <ShieldAlert className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                                คำที่ต้องหลีกเลี่ยง
                            </label>
                            <input
                                type="text"
                                {...register("avoidKeywords")}
                                placeholder="คั่นด้วยเครื่องหมาย จุลภาค"
                                className="w-full neon-input text-xs"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AiScriptSection;
