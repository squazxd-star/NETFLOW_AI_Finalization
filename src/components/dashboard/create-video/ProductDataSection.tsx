import { ShoppingBag, Link, FileText, Image, Plus, Sparkles, RefreshCw, ChevronDown, ExternalLink, User, Shirt, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { ProductDataSectionProps } from "./types";
import { useToast } from "@/hooks/use-toast";
import { characterOutfitOptions } from "@/types/netflow";
import {
    getSyncedProducts,
    triggerProductSync,
    setActiveProduct,
    openTikTokStudio,
    TikTokProduct
} from "@/services/tiktokProductService";

const ProductDataSection = ({
    register,
    setValue,
    watch,
    isOpen,
    onToggle,
    productImage,
    characterImage,
    onProductImageUpload,
    onCharacterImageUpload,
    onSyncedProductImageSelect
}: ProductDataSectionProps) => {
    const gender = watch("gender");
    const ageRange = watch("ageRange");
    const characterOutfit = watch("characterOutfit");
    const [outfitDropdownOpen, setOutfitDropdownOpen] = useState(false);
    const { toast } = useToast();

    // TikTok product sync state
    const [syncedProducts, setSyncedProducts] = useState<TikTokProduct[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [showProductDropdown, setShowProductDropdown] = useState(false);

    useEffect(() => {
        getSyncedProducts().then(setSyncedProducts);
    }, []);

    const handleSyncProduct = async () => {
        setIsSyncing(true);
        try {
            const result = await triggerProductSync();
            if (result.success && result.product) {
                toast({
                    title: `✅ ซิงค์สำเร็จ! (${result.count || 1} สินค้า)`,
                    description: `สินค้า "${result.product.name}" ถูกบันทึกแล้ว`,
                    className: "bg-green-600 text-white"
                });
                // Reload ALL accumulated products from storage (not just this sync batch)
                const allProducts = await getSyncedProducts();
                setSyncedProducts(allProducts);
                setValue("productId", result.product.id);
                setValue("productName", result.product.name);
                if (result.product.imageUrl && onSyncedProductImageSelect) {
                    onSyncedProductImageSelect(result.product.imageUrl);
                }
            } else {
                toast({
                    title: "❌ ซิงค์ไม่สำเร็จ",
                    description: result.error || "กรุณาเปิดหน้าสินค้าใน TikTok Studio ก่อน",
                    variant: "destructive"
                });
            }
        } catch {
            toast({ title: "❌ เกิดข้อผิดพลาด", variant: "destructive" });
        } finally {
            setIsSyncing(false);
        }
    };

    const handleSelectSyncedProduct = async (product: TikTokProduct) => {
        await setActiveProduct(product.id);
        setValue("productId", product.id);
        setValue("productName", product.name);
        if (product.imageUrl && onSyncedProductImageSelect) {
            onSyncedProductImageSelect(product.imageUrl);
        }
        setShowProductDropdown(false);
        toast({
            title: "✅ เลือกสินค้าแล้ว",
            description: `"${product.name}"`,
            className: "bg-green-600 text-white"
        });
    };

    return (
        <section className="glass-card overflow-hidden">
            <div className="px-4 pt-3">
                <SectionHeader
                    icon={ShoppingBag}
                    title="ข้อมูลสินค้า"
                    isOpen={isOpen}
                    onToggle={onToggle}
                />
            </div>

            {isOpen && (
                <div className="px-4 pb-4 space-y-3">

                    {/* ─── TikTok Sync (top) ─── */}
                    <div className="space-y-2.5 p-3 rounded-xl bg-muted/15 border border-border/50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-neon-red" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                                <span className="text-[11px] font-semibold text-foreground/80">ซิงค์สินค้า</span>
                            </div>
                            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                                syncedProducts.length > 0
                                    ? 'bg-green-500/15 text-green-400'
                                    : 'bg-muted/40 text-muted-foreground'
                            }`}>
                                {syncedProducts.length > 0 ? `${syncedProducts.length} สินค้า` : "ยังไม่ซิงค์"}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleSyncProduct}
                            disabled={isSyncing}
                            className="w-full py-2.5 rounded-xl font-medium text-white bg-neon-red hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-xs disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                            {isSyncing ? "กำลังซิงค์..." : "ซิงค์สินค้าจาก TikTok Studio"}
                        </button>

                        <button
                            type="button"
                            onClick={() => openTikTokStudio()}
                            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ExternalLink className="w-3 h-3" />
                            เปิด TikTok Studio
                        </button>

                        {/* Synced product dropdown */}
                        {syncedProducts.length > 0 && (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                                    className="w-full flex items-center justify-between py-1.5 px-3 rounded-lg border border-border bg-background/30 text-[11px] text-muted-foreground hover:border-neon-red/30 transition-colors"
                                >
                                    <span>สินค้าที่ซิงค์แล้ว ({syncedProducts.length})</span>
                                    <ChevronDown className={`w-3 h-3 transition-transform ${showProductDropdown ? 'rotate-180' : ''}`} />
                                </button>
                                {showProductDropdown && (
                                    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-border bg-background shadow-lg">
                                        {syncedProducts.map((p) => (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => handleSelectSyncedProduct(p)}
                                                className="w-full flex items-center gap-2 p-2 text-xs hover:bg-muted/50 transition-colors"
                                            >
                                                {p.imageUrl ? (
                                                    <img src={p.imageUrl} alt="" className="w-6 h-6 rounded object-cover" />
                                                ) : (
                                                    <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                                                )}
                                                <div className="flex-1 min-w-0 text-left">
                                                    <p className="truncate text-foreground">{p.name}</p>
                                                    <p className="text-[9px] text-muted-foreground font-mono">{p.id}</p>
                                                </div>
                                                {p.price && <span className="text-neon-red text-[10px]">{p.price}</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ─── Category 1: ข้อมูลสินค้า ─── */}
                    <div className="space-y-3 p-3 rounded-xl bg-muted/15 border border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-3.5 h-3.5 text-neon-red" />
                            <span className="text-[11px] font-semibold text-foreground/80">รายละเอียดสินค้า</span>
                            <div className="h-px bg-border/50 flex-1" />
                        </div>

                        {/* Product ID — primary */}
                        <div>
                            <label className="text-[10px] text-muted-foreground mb-1 block">รหัสสินค้า (TikTok)</label>
                            <input
                                type="text"
                                {...register("productId")}
                                placeholder="ตัวอย่าง 1729384..."
                                className="w-full neon-input text-xs"
                            />
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className="text-[10px] text-muted-foreground mb-1 block">ชื่อสินค้า</label>
                            <input
                                type="text"
                                {...register("productName")}
                                placeholder="ระบุชื่อสินค้า..."
                                className="w-full neon-input text-xs"
                            />
                        </div>
                    </div>

                    {/* ─── Category 2a: อัพโหลดรูปสินค้า ─── */}
                    <div className="space-y-3 p-3 rounded-xl bg-muted/15 border border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                            <ShoppingBag className="w-3.5 h-3.5 text-neon-red" />
                            <span className="text-[11px] font-semibold text-foreground/80">อัพโหลดรูปสินค้า</span>
                            <div className="h-px bg-border/50 flex-1" />
                        </div>

                        <button
                            onClick={() => onProductImageUpload()}
                            className="relative w-full aspect-video rounded-xl border-2 border-dashed border-border bg-background/50 flex flex-col items-center justify-center gap-2 hover:border-neon-red/50 hover:bg-neon-red/5 transition-all duration-200 overflow-hidden group"
                        >
                            {productImage ? (
                                <>
                                    <img src={productImage} alt="Product" className="w-full h-full object-contain p-2" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                        <span className="text-[10px] text-white font-medium">เปลี่ยนรูปสินค้า</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Image className="w-6 h-6 text-muted-foreground/40" />
                                    <span className="text-[10px] text-muted-foreground/60">คลิกเพื่ออัพโหลดรูปสินค้า</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* ─── Category 2b: อัพโหลดรูปตัวละคร ─── */}
                    <div className="space-y-3 p-3 rounded-xl bg-muted/15 border border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                            <User className="w-3.5 h-3.5 text-neon-red" />
                            <span className="text-[11px] font-semibold text-foreground/80">อัพโหลดรูปตัวละคร</span>
                            <div className="h-px bg-border/50 flex-1" />
                        </div>

                        <button
                            onClick={() => onCharacterImageUpload()}
                            className="relative w-full aspect-video rounded-xl border-2 border-dashed border-border bg-background/50 flex flex-col items-center justify-center gap-2 hover:border-neon-red/50 hover:bg-neon-red/5 transition-all duration-200 overflow-hidden group"
                        >
                            {characterImage ? (
                                <>
                                    <img src={characterImage} alt="Character" className="w-full h-full object-cover rounded-lg" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <RefreshCw className="w-5 h-5 text-white" />
                                        <span className="text-[10px] text-white font-medium">เปลี่ยนรูปตัวละคร</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <User className="w-6 h-6 text-muted-foreground/40" />
                                    <span className="text-[10px] text-muted-foreground/60">คลิกเพื่ออัพโหลดรูปตัวละคร</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* ─── Category 3: ตัวละคร ─── */}
                    <div className="space-y-3 p-3 rounded-xl bg-muted/15 border border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                            <User className="w-3.5 h-3.5 text-neon-red" />
                            <span className="text-[11px] font-semibold text-foreground/80">ตัวละคร</span>
                            <div className="h-px bg-border/50 flex-1" />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="text-[10px] text-muted-foreground mb-1.5 block">เพศ</label>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setValue("gender", "male")}
                                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                                        gender === "male"
                                            ? 'bg-neon-red text-white shadow-sm shadow-neon-red/25'
                                            : 'bg-background/50 text-muted-foreground border border-border hover:border-neon-red/30'
                                    }`}
                                >
                                    <span className="text-sm">♂</span> ชาย
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setValue("gender", "female")}
                                    className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                                        gender === "female"
                                            ? 'bg-neon-red text-white shadow-sm shadow-neon-red/25'
                                            : 'bg-background/50 text-muted-foreground border border-border hover:border-neon-red/30'
                                    }`}
                                >
                                    <span className="text-sm">♀</span> หญิง
                                </button>
                            </div>
                        </div>

                        {/* Age Group */}
                        <div>
                            <label className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1.5">
                                <Calendar className="w-3 h-3 text-neon-red" />
                                ช่วงอายุ
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { value: "child", label: "เด็ก", desc: "6-12 ปี" },
                                    { value: "teen", label: "วัยรุ่น", desc: "13-20 ปี" },
                                    { value: "adult", label: "ผู้ใหญ่", desc: "21-60 ปี" },
                                    { value: "senior", label: "คนแก่", desc: "60+ ปี" },
                                ].map((ag) => (
                                    <button
                                        key={ag.value}
                                        type="button"
                                        onClick={() => setValue("ageRange", ag.value as any)}
                                        className={`py-2 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-0.5 ${
                                            ageRange === ag.value
                                                ? 'bg-neon-red text-white shadow-sm shadow-neon-red/25'
                                                : 'bg-background/50 text-muted-foreground border border-border hover:border-neon-red/30'
                                        }`}
                                    >
                                        <span>{ag.label}</span>
                                        <span className={`text-[9px] ${ageRange === ag.value ? 'text-white/70' : 'text-muted-foreground/60'}`}>{ag.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Character Outfit Dropdown */}
                        <div>
                            <label className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1.5">
                                <Shirt className="w-3 h-3 text-neon-red" />
                                เสื้อผ้าตัวละคร
                            </label>
                            <button
                                type="button"
                                onClick={() => setOutfitDropdownOpen(!outfitDropdownOpen)}
                                className="w-full py-2 px-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 bg-background/50 text-foreground border border-border hover:border-neon-red/30"
                            >
                                <span>
                                    {(() => {
                                        const selected = characterOutfitOptions.find(o => o.value === characterOutfit);
                                        return selected ? `${selected.emoji} ${selected.label}` : "เลือกชุด...";
                                    })()}
                                </span>
                                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${outfitDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {outfitDropdownOpen && (
                                <div className="mt-1 w-full max-h-60 overflow-y-auto rounded-xl bg-background border border-border shadow-xl">
                                    {(() => {
                                        const groups = [...new Set(characterOutfitOptions.map(o => o.group))];
                                        return groups.map(group => (
                                            <div key={group}>
                                                <div className="px-3 py-1.5 text-[9px] font-bold text-muted-foreground/60 uppercase tracking-wider bg-muted/30 sticky top-0">
                                                    {group}
                                                </div>
                                                {characterOutfitOptions.filter(o => o.group === group).map(option => (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setValue("characterOutfit", option.value);
                                                            setOutfitDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-3 py-2 text-left text-xs flex items-center gap-2 transition-colors ${
                                                            characterOutfit === option.value
                                                                ? 'bg-neon-red/10 text-neon-red font-medium'
                                                                : 'text-foreground hover:bg-muted/50'
                                                        }`}
                                                    >
                                                        <span className="text-sm">{option.emoji}</span>
                                                        <span>{option.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ));
                                    })()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neon-red/5 border border-neon-red/10">
                        <Sparkles className="w-3.5 h-3.5 text-neon-red flex-shrink-0" />
                        <p className="text-[10px] text-muted-foreground">
                            AI จะวิเคราะห์ข้อมูลสินค้าเพื่อสร้างคลิปโฆษณาได้ตรงจุด
                        </p>
                    </div>

                </div>
            )}
        </section>
    );
};

export default ProductDataSection;
