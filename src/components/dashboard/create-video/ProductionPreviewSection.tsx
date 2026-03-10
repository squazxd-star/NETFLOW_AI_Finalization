import { useState, useEffect } from "react";
import { Share2, Youtube, Save, Globe, Lock, EyeOff, Calendar, Clock, Sparkles, Loader2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { ProductionPreviewSectionProps } from "./types";
import { useToast } from "@/hooks/use-toast";
import { generateYouTubeMetadata } from "@/services/youtubeMetadataService";
import { setYouTubeAutoPostEnabled, saveYouTubeConfig } from "@/services/youtubeUploadService";

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const ProductionPreviewSection = ({
    register,
    setValue,
    watch,
    isOpen,
    onToggle,
    hasVideo,
    onDownloadVideo,
    isTikTokReady,
    onTikTokNotReady,
    productImage,
}: ProductionPreviewSectionProps) => {
    const autoPostYoutube = watch("autoPostYoutube");
    const autoPostTikTok = watch("autoPostTikTok");
    const youtubeVisibility = watch("youtubeVisibility");
    const youtubeMadeForKids = watch("youtubeMadeForKids");
    const youtubeScheduleEnabled = watch("youtubeScheduleEnabled");
    const youtubeTitle = watch("youtubeTitle");
    const youtubeDescription = watch("youtubeDescription");
    const youtubeScheduleDate = watch("youtubeScheduleDate");
    const youtubeScheduleTime = watch("youtubeScheduleTime");
    const { toast } = useToast();
    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
    const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

    // Persist YouTube auto-post settings to Chrome storage whenever they change
    useEffect(() => {
        setYouTubeAutoPostEnabled(!!autoPostYoutube);
        if (autoPostYoutube) {
            saveYouTubeConfig({
                title: (youtubeTitle as string) || '',
                description: (youtubeDescription as string) || '',
                madeForKids: !!youtubeMadeForKids,
                visibility: (youtubeVisibility as 'public' | 'unlisted' | 'private') || 'public',
                scheduleEnabled: !!youtubeScheduleEnabled,
                scheduleDate: (youtubeScheduleDate as string) || '',
                scheduleTime: (youtubeScheduleTime as string) || '',
            });
        }
    }, [autoPostYoutube, youtubeTitle, youtubeDescription, youtubeMadeForKids, youtubeVisibility, youtubeScheduleEnabled, youtubeScheduleDate, youtubeScheduleTime]);

    const handleGenerateTitle = async () => {
        const productName = watch("productName") as string;
        if (!productName?.trim()) {
            toast({ title: "⚠️ ใส่ชื่อสินค้าก่อน", description: "กรุณากรอกชื่อสินค้าในส่วน 'ข้อมูลสินค้า' ก่อนใช้ AI", variant: "destructive" });
            return;
        }
        setIsGeneratingTitle(true);
        try {
            const result = await generateYouTubeMetadata({
                productName,
                productDescription: watch("productDescription") as string,
                productImage,
                cachedProductInfo: watch("cachedProductInfo") as string,
            });
            setValue("youtubeTitle", result.title);
            toast({ title: "✅ สร้าง Title สำเร็จ", description: `"${result.title}"` });
        } catch (err: any) {
            toast({ title: "❌ สร้าง Title ไม่สำเร็จ", description: err.message, variant: "destructive" });
        } finally {
            setIsGeneratingTitle(false);
        }
    };

    const handleGenerateDesc = async () => {
        const productName = watch("productName") as string;
        if (!productName?.trim()) {
            toast({ title: "⚠️ ใส่ชื่อสินค้าก่อน", description: "กรุณากรอกชื่อสินค้าในส่วน 'ข้อมูลสินค้า' ก่อนใช้ AI", variant: "destructive" });
            return;
        }
        setIsGeneratingDesc(true);
        try {
            const result = await generateYouTubeMetadata({
                productName,
                productDescription: watch("productDescription") as string,
                productImage,
                cachedProductInfo: watch("cachedProductInfo") as string,
            });
            setValue("youtubeDescription", result.description);
            toast({ title: "✅ สร้าง Description สำเร็จ" });
        } catch (err: any) {
            toast({ title: "❌ สร้าง Description ไม่สำเร็จ", description: err.message, variant: "destructive" });
        } finally {
            setIsGeneratingDesc(false);
        }
    };

    const handleGenerateBoth = async () => {
        const productName = watch("productName") as string;
        if (!productName?.trim()) {
            toast({ title: "⚠️ ใส่ชื่อสินค้าก่อน", description: "กรุณากรอกชื่อสินค้าในส่วน 'ข้อมูลสินค้า' ก่อนใช้ AI", variant: "destructive" });
            return;
        }
        setIsGeneratingTitle(true);
        setIsGeneratingDesc(true);
        try {
            const result = await generateYouTubeMetadata({
                productName,
                productDescription: watch("productDescription") as string,
                productImage,
                cachedProductInfo: watch("cachedProductInfo") as string,
            });
            setValue("youtubeTitle", result.title);
            setValue("youtubeDescription", result.description);
            toast({ title: "✅ สร้าง Title + Description สำเร็จ", description: `"${result.title}"` });
        } catch (err: any) {
            toast({ title: "❌ สร้างไม่สำเร็จ", description: err.message, variant: "destructive" });
        } finally {
            setIsGeneratingTitle(false);
            setIsGeneratingDesc(false);
        }
    };

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
                        </div>
                        {/* Auto Post description */}
                        <p className="text-[10px] text-muted-foreground/70 leading-relaxed mt-1">
                            {autoPostYoutube && autoPostTikTok
                                ? "✅ YouTube Shorts + TikTok Auto Post เปิดอยู่"
                                : autoPostYoutube
                                ? "✅ YouTube Shorts Auto Post เปิดอยู่ — หลัง Generate คลิปเสร็จ ระบบจะโพสต์ขึ้น YouTube อัตโนมัติ"
                                : autoPostTikTok
                                ? "✅ TikTok Auto Post เปิดอยู่ — หลัง Generate คลิปเสร็จ ระบบจะโพสต์ + ปักตะกร้าอัตโนมัติ"
                                : "เปิด Auto Post เพื่อโพสต์อัตโนมัติหลัง Generate คลิปเสร็จ"}
                        </p>
                    </div>

                    {/* YouTube Shorts Form — shown when YouTube is selected */}
                    {autoPostYoutube && (
                        <div className="space-y-3 p-3 rounded-xl bg-background/50 border border-border/50">
                            <div className="flex items-center gap-2 mb-1">
                                <Youtube className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-medium text-white">YouTube Shorts</span>
                            </div>

                            {/* AI Generate All Button */}
                            <button
                                type="button"
                                onClick={handleGenerateBoth}
                                disabled={isGeneratingTitle || isGeneratingDesc}
                                className="w-full flex items-center justify-center gap-1.5 py-2 text-[11px] font-medium rounded-lg transition-all bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary border border-primary/30 hover:from-primary/30 hover:to-purple-500/30 hover:shadow-[0_0_12px_rgba(var(--primary-rgb),0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {(isGeneratingTitle || isGeneratingDesc) ? (
                                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> AI กำลังคิด...</>
                                ) : (
                                    <><Sparkles className="w-3.5 h-3.5" /> AI สร้าง Title + Description</>
                                )}
                            </button>

                            {/* Title */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-[11px] text-muted-foreground">ชื่อ (Title)</label>
                                    <button
                                        type="button"
                                        onClick={handleGenerateTitle}
                                        disabled={isGeneratingTitle}
                                        className="flex items-center gap-1 px-2 py-0.5 text-[9px] rounded-md transition-all bg-primary/10 text-primary/80 border border-primary/20 hover:bg-primary/20 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGeneratingTitle ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Sparkles className="w-2.5 h-2.5" />}
                                        AI คิดชื่อ
                                    </button>
                                </div>
                                <input
                                    {...register("youtubeTitle")}
                                    placeholder="ชื่อวิดีโอ (AI จะใส่ #Shorts ให้อัตโนมัติ)"
                                    maxLength={60}
                                    className="w-full px-3 py-2 text-xs bg-background border border-border rounded-lg text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                />
                                <p className="text-[9px] text-muted-foreground/50 mt-0.5 text-right">{(watch("youtubeTitle") || "").length}/60</p>
                            </div>

                            {/* Description */}
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-[11px] text-muted-foreground">คำอธิบาย (Description)</label>
                                    <button
                                        type="button"
                                        onClick={handleGenerateDesc}
                                        disabled={isGeneratingDesc}
                                        className="flex items-center gap-1 px-2 py-0.5 text-[9px] rounded-md transition-all bg-primary/10 text-primary/80 border border-primary/20 hover:bg-primary/20 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGeneratingDesc ? <Loader2 className="w-2.5 h-2.5 animate-spin" /> : <Sparkles className="w-2.5 h-2.5" />}
                                        AI เขียน
                                    </button>
                                </div>
                                <textarea
                                    {...register("youtubeDescription")}
                                    placeholder="คำอธิบายวิดีโอ + Hashtag (AI จะสร้างให้อัตโนมัติ)"
                                    rows={3}
                                    className="w-full px-3 py-2 text-xs bg-background border border-border rounded-lg text-white placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                                />
                            </div>

                            {/* Made for Kids */}
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] text-muted-foreground">สร้างมาเพื่อเด็ก?</label>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setValue("youtubeMadeForKids", false)}
                                        className={`px-3 py-1 text-[10px] rounded-md transition-all ${
                                            !youtubeMadeForKids
                                                ? 'bg-primary/20 text-primary border border-primary/30'
                                                : 'bg-background text-muted-foreground border border-border hover:bg-white/5'
                                        }`}
                                    >
                                        ไม่ใช่
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setValue("youtubeMadeForKids", true)}
                                        className={`px-3 py-1 text-[10px] rounded-md transition-all ${
                                            youtubeMadeForKids
                                                ? 'bg-primary/20 text-primary border border-primary/30'
                                                : 'bg-background text-muted-foreground border border-border hover:bg-white/5'
                                        }`}
                                    >
                                        ใช่
                                    </button>
                                </div>
                            </div>

                            {/* Visibility */}
                            <div>
                                <label className="text-[11px] text-muted-foreground mb-1.5 block">การเผยแพร่</label>
                                <div className="flex gap-1.5">
                                    {([
                                        { value: "public", label: "สาธารณะ", icon: Globe },
                                        { value: "unlisted", label: "ไม่แสดง", icon: EyeOff },
                                        { value: "private", label: "ส่วนตัว", icon: Lock },
                                    ] as const).map(({ value, label, icon: Icon }) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => setValue("youtubeVisibility", value)}
                                            className={`flex-1 flex items-center justify-center gap-1 py-1.5 text-[10px] rounded-lg transition-all ${
                                                youtubeVisibility === value
                                                    ? 'bg-primary/20 text-primary border border-primary/30'
                                                    : 'bg-background text-muted-foreground border border-border hover:bg-white/5'
                                            }`}
                                        >
                                            <Icon className="w-3 h-3" />
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Schedule Toggle + Date/Time */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        ตั้งเวลาเผยแพร่
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setValue("youtubeScheduleEnabled", !youtubeScheduleEnabled)}
                                        className={`px-3 py-1 text-[10px] rounded-md transition-all ${
                                            youtubeScheduleEnabled
                                                ? 'bg-primary/20 text-primary border border-primary/30'
                                                : 'bg-background text-muted-foreground border border-border hover:bg-white/5'
                                        }`}
                                    >
                                        {youtubeScheduleEnabled ? 'เปิด' : 'ปิด'}
                                    </button>
                                </div>

                                {youtubeScheduleEnabled && (
                                    <div className="flex gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-muted-foreground/70 mb-0.5 block flex items-center gap-1">
                                                <Calendar className="w-2.5 h-2.5" />
                                                วันที่ (เช่น 12 พ.ย. 2026)
                                            </label>
                                            <input
                                                {...register("youtubeScheduleDate")}
                                                placeholder="12 พ.ย. 2026"
                                                className="w-full px-2.5 py-1.5 text-[10px] bg-background border border-border rounded-lg text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div className="w-24">
                                            <label className="text-[10px] text-muted-foreground/70 mb-0.5 block flex items-center gap-1">
                                                <Clock className="w-2.5 h-2.5" />
                                                เวลา
                                            </label>
                                            <input
                                                {...register("youtubeScheduleTime")}
                                                placeholder="12:00"
                                                className="w-full px-2.5 py-1.5 text-[10px] bg-background border border-border rounded-lg text-white placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Shorts Info Tip */}
                            <div className="mt-2 p-2.5 rounded-lg bg-yellow-500/5 border border-yellow-500/15">
                                <p className="text-[10px] font-medium text-yellow-400/90 mb-1.5">💡 เกร็ดความรู้ YouTube Shorts</p>
                                <ul className="text-[9.5px] text-muted-foreground/80 space-y-1 leading-relaxed">
                                    <li>• <span className="text-yellow-400/70">อัตราส่วนภาพ:</span> ต้องเป็นแนวตั้ง (9:16) หรือสี่เหลี่ยม (1:1)</li>
                                    <li>• <span className="text-yellow-400/70">ความยาว:</span> ต้องไม่เกิน 60 วินาที — เกินจะกลายเป็นวิดีโอปกติ</li>
                                    <li>• <span className="text-yellow-400/70">#Shorts:</span> ระบบเติม #Shorts ใน Title ให้อัตโนมัติ เพื่อช่วยให้ YouTube จัดหมวดแม่นยำขึ้น</li>
                                </ul>
                                <p className="text-[9px] text-muted-foreground/50 mt-1.5 italic">คลิปจาก Veo เป็น 9:16 + สั้นกว่า 60 วิ → จัดเข้า Shorts อัตโนมัติ</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default ProductionPreviewSection;
