import { Share2, Youtube, Save } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { ProductionPreviewSectionProps } from "./types";
import { useToast } from "@/hooks/use-toast";

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
    onTikTokNotReady,
}: ProductionPreviewSectionProps) => {
    const autoPostYoutube = watch("autoPostYoutube");
    const autoPostTikTok = watch("autoPostTikTok");
    const { toast } = useToast();

    const handleTikTokToggle = () => {
        if (!isTikTokReady && !autoPostTikTok) {
            onTikTokNotReady?.();
            toast({
                title: "⚠️ ยังไม่พร้อมโพสต์ TikTok",
                description: "กรุณาตั้งค่า TikTok ในแท็บ TikTok ก่อน (ซิงค์สินค้า + บันทึกการตั้งค่า)",
                variant: "destructive"
            });
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
                                onClick={() => setValue("autoPostYoutube", !autoPostYoutube)}
                                className={`flex-1 flex items-center justify-center py-3 px-4 transition-all duration-300 relative ${
                                    autoPostYoutube 
                                        ? 'text-primary bg-primary/10 shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.2)]' 
                                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                }`}
                                title={autoPostYoutube ? "YouTube: เปิด" : "YouTube: ปิด"}
                            >
                                <Youtube className={`w-5 h-5 transition-transform duration-300 ${autoPostYoutube ? 'scale-110 drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : ''}`} />
                                {autoPostYoutube && <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-l-xl"></div>}
                            </button>
                            <div className="w-px h-8 bg-border z-10" />
                            <button
                                onClick={handleTikTokToggle}
                                className={`flex-1 flex items-center justify-center py-3 px-4 transition-all duration-300 relative ${
                                    autoPostTikTok 
                                        ? 'text-primary bg-primary/10 shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.2)]' 
                                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                }`}
                                title={autoPostTikTok ? "TikTok: เปิด" : "TikTok: ปิด"}
                            >
                                <TikTokIcon className={`w-5 h-5 transition-transform duration-300 ${autoPostTikTok ? 'scale-110 drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : ''}`} />
                                {autoPostTikTok && <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-xl"></div>}
                            </button>
                            <div className="w-px h-8 bg-border z-10" />
                            <button
                                onClick={(e) => { e.preventDefault(); onDownloadVideo(); }}
                                disabled={!hasVideo}
                                className={`flex-1 flex items-center justify-center py-3 px-4 transition-all duration-300 relative ${
                                    hasVideo 
                                        ? 'text-white hover:text-primary hover:bg-primary/10 hover:shadow-[inset_0_0_10px_rgba(var(--primary-rgb),0.2)] cursor-pointer' 
                                        : 'text-muted-foreground opacity-50 cursor-not-allowed'
                                }`}
                                title="บันทึกลงเครื่อง"
                            >
                                <Save className={`w-5 h-5 transition-transform duration-300 ${hasVideo ? 'hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]' : ''}`} />
                            </button>
                        </div>
                        {/* Auto Post description */}
                        <p className="text-[10px] text-muted-foreground/70 leading-relaxed mt-1">
                            {autoPostTikTok 
                                ? "✅ TikTok Auto Post เปิดอยู่ — หลัง Generate คลิปเสร็จ ระบบจะโพสต์ + ปักตะกร้าอัตโนมัติ"
                                : "เปิด TikTok Auto Post เพื่อโพสต์อัตโนมัติหลัง Generate คลิปเสร็จ"}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProductionPreviewSection;
