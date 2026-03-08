import { useState } from "react";
import { ImageIcon, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { sceneBackgroundOptions } from "@/types/netflow";
import { autoSelectBackground } from "@/utils/autoBackground";
import { SectionProps } from "./types";

const BackgroundPickerSection = ({ setValue, watch }: SectionProps) => {
    const { config: themeConfig } = useTheme();
    const sceneBackground = watch("sceneBackground") || "studio";
    const [showAll, setShowAll] = useState(false);
    const [autoFlash, setAutoFlash] = useState(false);

    const handleAutoSelect = () => {
        const name = watch("productName") || "";
        const desc = watch("productDescription") || "";

        if (!name.trim()) {
            alert("กรุณากรอกชื่อสินค้าก่อน แล้วกด Auto อีกครั้ง");
            return;
        }

        const best = autoSelectBackground(name, desc);
        setValue("sceneBackground", best);

        // Flash feedback
        setAutoFlash(true);
        setTimeout(() => setAutoFlash(false), 800);
    };

    return (
        <section className="glass-card overflow-hidden">
            {/* Header */}
            <div className="px-4 pt-3.5 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `rgba(${themeConfig.hexRgb}, 0.15)` }}>
                            <ImageIcon className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                        </div>
                        <span className="text-xs font-bold text-foreground">ฉากพื้นหลัง</span>
                        <span className="text-[9px] text-muted-foreground/60 font-medium">Background</span>
                    </div>
                </div>
            </div>

            {/* Background Grid */}
            <div className="px-3 pb-3">
                <div className={`grid grid-cols-5 gap-1.5 ${showAll ? '' : 'max-h-[160px] overflow-hidden'}`}>
                    {/* Auto tile — identical structure to other bg tiles */}
                    <button
                        type="button"
                        onClick={handleAutoSelect}
                        className={`relative group flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-xl text-center transition-all duration-200 border aspect-square ${
                            autoFlash
                                ? 'shadow-lg scale-[1.02]'
                                : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.12] hover:scale-[1.03]'
                        }`}
                        style={autoFlash ? {
                            borderColor: themeConfig.hex,
                            background: `linear-gradient(145deg, rgba(${themeConfig.hexRgb}, 0.15), rgba(${themeConfig.hexRgb}, 0.05))`,
                            boxShadow: `0 4px 16px rgba(${themeConfig.hexRgb}, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)`,
                        } : {}}
                        title="วิเคราะห์ชื่อสินค้าแล้วเลือกฉากที่เหมาะสมอัตโนมัติ"
                    >
                        <span className={`text-[20px] leading-none transition-all duration-200 ${autoFlash ? 'scale-110 drop-shadow-lg' : 'group-hover:scale-110'}`}>
                            🪄
                        </span>
                        <span className={`text-[10px] font-medium leading-tight truncate w-full mt-0.5 ${autoFlash ? 'font-bold' : 'text-muted-foreground/60'}`} style={autoFlash ? { color: themeConfig.hex } : {}}>
                            Auto
                        </span>
                        <div className="absolute -top-1 -right-1 text-[8px] leading-none drop-shadow">⭐</div>
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

                {/* Show more/less */}
                {sceneBackgroundOptions.length > 10 && (
                    <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        className="w-full mt-2 py-1.5 text-[10px] text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-1 rounded-lg hover:bg-white/[0.03]"
                    >
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
                        {showAll ? 'แสดงน้อยลง' : `ดูทั้งหมด (${sceneBackgroundOptions.length} ฉาก)`}
                    </button>
                )}

                {/* Custom input */}
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
        </section>
    );
};

export default BackgroundPickerSection;
