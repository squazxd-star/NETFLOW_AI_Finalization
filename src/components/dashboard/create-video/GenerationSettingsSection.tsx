import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Settings, Maximize2, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "./SectionHeader";
import { GenerationSettingsSectionProps } from "./types";
import { languageOptions } from "@/types/netflow";

const parseSceneScripts = (prompt: string, count: number) => {
    const parts = prompt
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    return Array.from({ length: count }, (_, i) => parts[i] || "");
};

const GenerationSettingsSection = ({
    register,
    control,
    setValue,
    watch,
    isOpen,
    onToggle
}: GenerationSettingsSectionProps) => {
    const sceneCount = (watch("sceneCount") || 1) as 1 | 2 | 3;
    const clipDuration = watch("clipDuration") || 8;
    const aiPrompt = watch("aiPrompt") || "";
    const language = watch("language") || "th-central";

    const [sceneScripts, setSceneScripts] = useState<string[]>(() =>
        parseSceneScripts(aiPrompt, sceneCount)
    );

    useEffect(() => {
        setSceneScripts(parseSceneScripts(aiPrompt, sceneCount));
    }, [aiPrompt, sceneCount]);

    const onChangeSceneScript = (index: number, value: string) => {
        setSceneScripts((prev) => {
            const next = [...prev];
            next[index] = value;
            setValue("aiPrompt", next.join("\n\n"));
            return next;
        });
    };

    return (
        <section className="glass-card overflow-hidden">
            <div className="px-4 pt-3">
                <SectionHeader
                    icon={Settings}
                    title="การตั้งค่าการสร้าง"
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            </div>

            {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Duration Dropdown */}
                    <div>
                        <label className="text-sm text-foreground mb-2 block font-medium">
                            ระยะเวลา
                        </label>
                        <select
                            value={clipDuration}
                            onChange={(e) => {
                                const duration = Number(e.target.value) as 8 | 16 | 24;
                                setValue("clipDuration", duration);
                                setValue("sceneCount", (duration / 8) as 1 | 2 | 3);
                            }}
                            className="w-full neon-select text-sm py-3"
                        >
                            {[8, 16, 24].map((duration) => (
                                <option key={duration} value={duration}>
                                    {duration} วินาที ({duration / 8} ฉาก)
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-muted-foreground mt-2">
                            เลือกระยะเวลา - กล่องสคริปต์ฉากจะอัปเดตโดยอัตโนมัติ
                        </p>
                    </div>

                    {/* Script Language */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm text-foreground font-medium whitespace-nowrap">
                            สคริปต์
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setValue("language", e.target.value as any)}
                            className="flex-1 neon-select text-sm py-3"
                        >
                            {languageOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            className="p-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <Maximize2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Analyze with AI Button */}
                    <button
                        type="button"
                        onClick={() => {
                            console.log("Analyze with AI clicked");
                        }}
                        className="w-full py-3.5 px-4 rounded-xl font-semibold text-white bg-neon-red hover:bg-neon-red/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-neon-red/25 hover:shadow-neon-red/40 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Sparkles className="w-4 h-4" />
                        วิเคราะห์ด้วย AI
                    </button>

                    {/* Scene Cards */}
                    <div className="space-y-3">
                        <input type="hidden" {...register("aiPrompt")} />
                        {Array.from({ length: sceneCount }, (_, i) => (
                            <div
                                key={i}
                                className="rounded-xl border border-neon-red/20 bg-card/50 p-4 space-y-3 hover:border-neon-red/40 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-neon-red/20 text-neon-red flex items-center justify-center text-sm font-bold">
                                        {i + 1}
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        ฉาก {i + 1}
                                    </span>
                                </div>
                                <textarea
                                    value={sceneScripts[i] || ""}
                                    onChange={(e) => onChangeSceneScript(i, e.target.value)}
                                    placeholder="ใส่สคริปต์สำหรับฉากนี้..."
                                    rows={3}
                                    className="w-full neon-textarea text-sm resize-none focus:ring-1 focus:ring-neon-red/50"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Smart Loop */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                        <span className="text-xs font-medium">โหมดวนซ้ำใช้วิดีโอเดิม (Smart Loop)</span>
                        <Controller
                            name="smartLoop"
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-neon-red"
                                />
                            )}
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default GenerationSettingsSection;
