import { Controller } from "react-hook-form";
import { Settings, Infinity as InfinityIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "./SectionHeader";
import { GenerationSettingsSectionProps } from "./types";
import { clipCountOptions, restIntervalOptions } from "@/types/netflow";

const GenerationSettingsSection = ({
    register,
    control,
    setValue,
    watch,
    isOpen,
    onToggle
}: GenerationSettingsSectionProps) => {
    const clipCount = watch("clipCount");
    const sceneCount = watch("sceneCount");

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
                    <div>
                        <label className="text-xs text-muted-foreground mb-2 block">
                            จำนวนฉาก (Storyboard) — 1 ฉาก = 8 วิ
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((count) => (
                                <button
                                    key={count}
                                    type="button"
                                    onClick={() => {
                                        setValue("sceneCount", count);
                                        setValue("clipDuration", (count * 8) as 8 | 16 | 24);
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                                        sceneCount === count
                                            ? 'bg-neon-red text-white'
                                            : 'bg-muted text-muted-foreground border border-border hover:border-neon-red/50'
                                    }`}
                                >
                                    <div className="text-lg font-bold">{count} ฉาก</div>
                                    <div className="text-[10px] opacity-70">{count * 8}วิ</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clip Count */}
                    <div>
                        <label className="text-xs text-muted-foreground mb-2 block">
                            จำนวนคลิปที่ต้องการสร้าง
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {clipCountOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => setValue("clipCount", option)}
                                    className={`pill-button ${clipCount === option ? "pill-button-active" : "pill-button-inactive"
                                        }`}
                                >
                                    {option === "unlimited" ? (
                                        <span className="flex items-center gap-1">
                                            <InfinityIcon className="w-3 h-3" /> ไม่จำกัด
                                        </span>
                                    ) : (
                                        option
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Clip Duration Selection */}
                    <div>
                        <label className="text-xs text-muted-foreground mb-2 block">
                            ความยาวคลิป
                        </label>
                        <div className="flex gap-2">
                            {[8, 16, 24].map((duration) => (
                                <button
                                    key={duration}
                                    type="button"
                                    onClick={() => {
                                        setValue("clipDuration", duration as 8 | 16 | 24);
                                        setValue("sceneCount", (duration / 8) as 1 | 2 | 3);
                                    }}
                                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                                        watch("clipDuration") === duration
                                            ? 'bg-neon-red text-white'
                                            : 'bg-muted text-muted-foreground border border-border hover:border-neon-red/50'
                                    }`}
                                >
                                    <div className="text-lg font-bold">{duration}วิ</div>
                                    <div className="text-[10px] opacity-70">
                                        {duration === 8 ? 'สั้น' : duration === 16 ? 'กลาง' : 'ยาว'}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Delay Interval */}
                    <div>
                        <label className="text-xs text-muted-foreground mb-2 block">
                            ระยะเวลา (Delay)
                        </label>
                        <select
                            {...register("restInterval")}
                            className="w-full neon-select text-xs"
                        >
                            {restIntervalOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quick Count Display */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30 flex-1">
                            <span className="text-xs text-muted-foreground">จำนวน</span>
                            <span className="text-2xl font-bold text-neon-red">
                                {typeof clipCount === 'number' ? clipCount : '∞'}
                            </span>
                        </div>
                        <span className="text-xs text-muted-foreground mx-3">รวมเป็น</span>
                        <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/30">
                            <span className="text-lg font-bold text-neon-red">
                                {watch("clipDuration") || 16}วิ
                            </span>
                        </div>
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
