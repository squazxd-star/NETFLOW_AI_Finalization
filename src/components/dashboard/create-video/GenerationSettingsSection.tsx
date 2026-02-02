import { useState } from "react";
import { Controller } from "react-hook-form";
import { Settings, Maximize2, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "./SectionHeader";
import { GenerationSettingsSectionProps } from "./types";

const durationOptions = [
    { value: 8, label: "8 วินาที (1 ฉาก)", scenes: 1 },
    { value: 16, label: "16 วินาที (2 ฉาก)", scenes: 2 },
    { value: 24, label: "24 วินาที (3 ฉาก)", scenes: 3 },
];

const GenerationSettingsSection = ({
    register,
    control,
    setValue,
    watch,
    isOpen,
    onToggle
}: GenerationSettingsSectionProps) => {
    const sceneCount = watch("sceneCount") || 3;
    const clipDuration = watch("clipDuration") || 24;
    const [scriptLanguage, setScriptLanguage] = useState("ไทย");
    const [sceneScripts, setSceneScripts] = useState<string[]>(["", "", ""]);

    const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const duration = parseInt(e.target.value) as 8 | 16 | 24;
        const scenes = duration / 8;
        setValue("clipDuration", duration);
        setValue("sceneCount", scenes as 1 | 2 | 3);
    };

    const handleSceneScriptChange = (index: number, value: string) => {
        const newScripts = [...sceneScripts];
        newScripts[index] = value;
        setSceneScripts(newScripts);
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
                        <label className="text-xs text-muted-foreground mb-2 block">
                            ระยะเวลา
                        </label>
                        <select
                            value={clipDuration}
                            onChange={handleDurationChange}
                            className="w-full bg-[#1a1a1a] border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-neon-red/50"
                        >
                            {durationOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                            เลือกระยะเวลา - กล่องสคริปต์ฉากจะอัปเดตโดยอัตโนมัติ
                        </p>
                    </div>

                    {/* Script Language */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">สคริปต์</span>
                        <div className="flex-1 bg-[#1a1a1a] border border-border rounded-lg px-3 py-2 flex items-center justify-between">
                            <select
                                value={scriptLanguage}
                                onChange={(e) => setScriptLanguage(e.target.value)}
                                className="bg-transparent text-sm text-foreground focus:outline-none flex-1"
                            >
                                <option value="ไทย">ไทย</option>
                                <option value="English">English</option>
                                <option value="ไทย-English">ไทย-English</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                        >
                            <Maximize2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                    </div>

                    {/* AI Analysis Button */}
                    <button
                        type="button"
                        className="w-full py-3 px-4 rounded-xl font-medium text-black bg-gradient-to-r from-green-400 to-lime-300 hover:from-green-500 hover:to-lime-400 transition-all flex items-center justify-center gap-2"
                    >
                        <Sparkles className="w-4 h-4" />
                        วิเคราะห์ด้วย AI
                    </button>

                    {/* Scene Script Cards */}
                    <div className="space-y-3">
                        {Array.from({ length: sceneCount }, (_, i) => (
                            <div 
                                key={i} 
                                className="border border-border rounded-xl p-4 bg-[#0d0d0d]"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-sm text-muted-foreground">{i + 1}</span>
                                    <span className="text-sm text-foreground font-medium">ฉาก {i + 1}</span>
                                </div>
                                <textarea
                                    value={sceneScripts[i]}
                                    onChange={(e) => handleSceneScriptChange(i, e.target.value)}
                                    placeholder="ใส่สคริปต์สำหรับฉากนี้..."
                                    className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-muted-foreground/50 min-h-[80px] resize-none"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Smart Loop */}
                    <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-medium">โหมดวนซ้ำใช้วิดีโอเดิม (Smart Loop)</span>
                        </div>
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
