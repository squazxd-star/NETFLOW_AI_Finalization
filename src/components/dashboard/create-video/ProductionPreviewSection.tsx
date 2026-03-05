import { Share2, Youtube, Save } from "lucide-react";
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
    const autoPostTikTok = watch("autoPostTikTok");
    const autoPostYoutube = watch("autoPostYoutube");

    const handleTikTokToggle = () => {
        if (!isTikTokReady) {
            onTikTokNotReady?.();
            return;
        }
        setValue("autoPostTikTok", !autoPostTikTok);
    };

    return (
        <section className="glass-card overflow-hidden">
            <div className="px-4 pt-3">
                <SectionHeader
                    icon={Share2}
                    title="โพสต์อัตโนมัติ"
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            </div>

            {isOpen && (
                <div className="px-4 pb-4 space-y-4">
                    {/* Platform Selection */}
                    <div>
                        <label className="text-xs text-muted-foreground mb-2 block">เลือกแพลตฟอร์ม</label>
                        <div className="flex items-center bg-background rounded-xl border border-border overflow-hidden">
                            <button
                                onClick={handleTikTokToggle}
                                className={`flex-1 flex items-center justify-center py-3 px-4 transition-all duration-200 ${
                                    !isTikTokReady ? 'text-muted-foreground/40 opacity-40' :
                                    autoPostTikTok ? 'text-orange-400 bg-orange-500/15' : 'text-white'
                                }`}
                                title={!isTikTokReady ? "ตั้งค่า TikTok ก่อน" : autoPostTikTok ? "TikTok: เปิด" : "TikTok: ปิด"}
                            >
                                <TikTokIcon className="w-5 h-5" />
                            </button>
                            <div className="w-px h-8 bg-border" />
                            <button
                                onClick={() => setValue("autoPostYoutube", !autoPostYoutube)}
                                className={`flex-1 flex items-center justify-center py-3 px-4 transition-all ${
                                    autoPostYoutube ? 'text-white' : 'text-muted-foreground'
                                }`}
                            >
                                <Youtube className="w-5 h-5" />
                            </button>
                            <div className="w-px h-8 bg-border" />
                            <button
                                onClick={(e) => { e.preventDefault(); onDownloadVideo(); }}
                                disabled={!hasVideo}
                                className={`flex-1 flex items-center justify-center py-3 px-4 transition-all ${
                                    hasVideo ? 'text-white hover:bg-neon-red cursor-pointer' : 'text-muted-foreground opacity-50 cursor-not-allowed'
                                }`}
                                title="บันทึกลงเครื่อง"
                            >
                                <Save className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductionPreviewSection;
