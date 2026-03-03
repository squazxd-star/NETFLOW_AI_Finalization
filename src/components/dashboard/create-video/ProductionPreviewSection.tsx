import { Video, Youtube, Save } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { ProductionPreviewSectionProps } from "./types";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const ProductionPreviewSection = ({
    setValue,
    watch,
    isOpen,
    onToggle,
    hasVideo,
    onDownloadVideo,
    isTikTokReady,
    onTikTokNotReady
}: ProductionPreviewSectionProps) => {
    const aspectRatio = watch("aspectRatio");
    const autoPostTikTok = watch("autoPostTikTok");
    const autoPostYoutube = watch("autoPostYoutube");

    // TikTok button state:
    // - gray (text-muted-foreground/40) = not configured
    // - white (text-white) = configured & ready but not active
    // - orange (text-orange-400 bg-orange-500/15) = active (auto-post enabled)
    const handleTikTokToggle = () => {
        if (!isTikTokReady) {
            onTikTokNotReady?.();
            return;
        }
        setValue("autoPostTikTok", !autoPostTikTok);
    };

    const getTikTokButtonStyle = () => {
        if (!isTikTokReady) {
            return "text-muted-foreground/40 opacity-40";
        }
        if (autoPostTikTok) {
            return "text-orange-400 bg-orange-500/15";
        }
        return "text-white";
    };

    return (
        <section className="glass-card overflow-hidden">
            <div className="px-4 pt-3">
                <SectionHeader
                    icon={Video}
                    title="การผลิตและพรีวิว"
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            </div>

            {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Aspect Ratio */}
                    <div>
                        <label className="text-xs text-muted-foreground mb-2 block">
                            สัดส่วนวิดีโอ (Aspect Ratio)
                        </label>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setValue("aspectRatio", "9:16")}
                                className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-2 transition-all ${aspectRatio === "9:16"
                                    ? 'bg-neon-red text-white'
                                    : 'bg-muted border border-border text-muted-foreground'
                                    }`}
                            >
                                <div className="w-4 h-7 border-2 border-current rounded-sm"></div>
                                <span className="text-[10px]">แนวตั้ง 9:16</span>
                                <span className="text-[10px] opacity-70">TikTok</span>
                            </button>
                            <button
                                onClick={() => setValue("aspectRatio", "16:9")}
                                className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-2 transition-all ${aspectRatio === "16:9"
                                    ? 'bg-neon-red text-white'
                                    : 'bg-muted border border-border text-muted-foreground'
                                    }`}
                            >
                                <div className="w-7 h-4 border-2 border-current rounded-sm"></div>
                                <span className="text-[10px]">แนวนอน 16:9</span>
                                <span className="text-[10px] opacity-70">YouTube</span>
                            </button>
                        </div>
                    </div>

                    {/* Platform & Mode Selection */}
                    <div className="flex items-center justify-between gap-4">
                        {/* Platform Selection */}
                        <div className="flex-1">
                            <label className="text-xs text-neon-red mb-2 block">แพลตฟอร์ม</label>
                            <div className="flex items-center bg-background rounded-xl border border-border overflow-hidden">
                                <button
                                    onClick={handleTikTokToggle}
                                    className={`flex-1 flex items-center justify-center py-3 px-4 transition-all duration-200 ${getTikTokButtonStyle()}`}
                                    title={
                                        !isTikTokReady
                                            ? "ไปตั้งค่าในหน้า ตั้งค่า TikTok ก่อน"
                                            : autoPostTikTok
                                                ? "โพสต์ TikTok อัตโนมัติ: เปิด"
                                                : "กดเพื่อเปิดโพสต์ TikTok อัตโนมัติ"
                                    }
                                >
                                    <TikTokIcon className="w-6 h-6" />
                                </button>
                                <div className="w-px h-8 bg-border"></div>
                                <button
                                    onClick={() => setValue("autoPostYoutube", !autoPostYoutube)}
                                    className={`flex-1 flex items-center justify-center py-3 px-4 transition-all ${autoPostYoutube ? 'text-white' : 'text-muted-foreground'
                                        }`}
                                >
                                    <Youtube className="w-6 h-6" />
                                </button>
                            </div>
                            {/* TikTok status indicator */}
                            {autoPostTikTok && isTikTokReady && (
                                <p className="text-[9px] text-orange-400 mt-1 text-center">โพสต์ TikTok อัตโนมัติ: เปิด</p>
                            )}
                        </div>

                        {/* Mode Selection */}
                        <div className="flex-1">
                            <label className="text-xs text-neon-red mb-2 block text-right">โหมด</label>
                            <div className={`flex items-center justify-center bg-background rounded-xl border border-border overflow-hidden transition-all ${hasVideo ? 'border-neon-red/50 shadow-[0_0_10px_rgba(255,46,87,0.1)]' : ''}`}>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDownloadVideo();
                                    }}
                                    disabled={!hasVideo}
                                    className={`w-full py-3 px-6 flex items-center justify-center transition-all ${hasVideo
                                        ? 'text-white hover:bg-neon-red hover:text-white cursor-pointer'
                                        : 'text-muted-foreground opacity-50 cursor-not-allowed'
                                        }`}
                                    title="บันทึกวิดีโอลงเครื่อง"
                                >
                                    <Save className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductionPreviewSection;
