import { ShoppingBag, Link, FileText, Image, Plus, Sparkles, RefreshCw, ChevronDown, ExternalLink, User } from "lucide-react";
import { useState, useEffect, useCallback, DragEvent } from "react";
import SectionHeader from "./SectionHeader";
import { ProductDataSectionProps } from "./types";
import { useToast } from "@/hooks/use-toast";
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
    onProductImageFile,
    onCharacterImageFile,
    onSyncedProductImageSelect
}: ProductDataSectionProps) => {
    const gender = watch("gender");
    const { toast } = useToast();

    // Drag-and-drop state
    const [dragOverProduct, setDragOverProduct] = useState(false);
    const [dragOverCharacter, setDragOverCharacter] = useState(false);

    const readFileAsBase64 = useCallback((file: File, setter: ((base64: string) => void) | undefined) => {
        if (!setter) return;
        if (!file.type.startsWith('image/')) {
            toast({ title: "❌ ไฟล์นี้ไม่ใช่รูปภาพ", variant: "destructive" });
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result as string;
            if (result) setter(result);
        };
        reader.readAsDataURL(file);
    }, [toast]);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>, setter: ((base64: string) => void) | undefined, setDragOver: (v: boolean) => void) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) readFileAsBase64(file, setter);
    }, [readFileAsBase64]);

    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

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
                setSyncedProducts(result.products || [result.product]);
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

                    {/* ─── Category 2: รูปภาพ ─── */}
                    <div className="space-y-3 p-3 rounded-xl bg-muted/15 border border-border/50">
                        <div className="flex items-center gap-2 mb-1">
                            <Image className="w-3.5 h-3.5 text-neon-red" />
                            <span className="text-[11px] font-semibold text-foreground/80">รูปภาพ</span>
                            <div className="h-px bg-border/50 flex-1" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Product Image */}
                            <div>
                                <label className="text-[10px] text-muted-foreground mb-1 block text-center">รูปสินค้า</label>
                                <div
                                    onClick={() => onProductImageUpload()}
                                    onDragOver={handleDragOver}
                                    onDragEnter={(e) => { e.preventDefault(); setDragOverProduct(true); }}
                                    onDragLeave={(e) => { e.preventDefault(); setDragOverProduct(false); }}
                                    onDrop={(e) => handleDrop(e, onProductImageFile, setDragOverProduct)}
                                    className={`relative w-full aspect-[3/4] rounded-xl border-2 border-dashed bg-background/50 flex flex-col items-center justify-center gap-2 transition-all duration-200 overflow-hidden group cursor-pointer ${
                                        dragOverProduct
                                            ? 'border-neon-red bg-neon-red/10 scale-[1.02]'
                                            : 'border-border hover:border-neon-red/50 hover:bg-neon-red/5'
                                    }`}
                                >
                                    {dragOverProduct ? (
                                        <>
                                            <Image className="w-6 h-6 text-neon-red animate-bounce" />
                                            <span className="text-[9px] text-neon-red font-medium">วางรูปที่นี่</span>
                                        </>
                                    ) : productImage ? (
                                        <>
                                            <img src={productImage} alt="Product" className="w-full h-full object-contain p-1" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <RefreshCw className="w-5 h-5 text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5 text-muted-foreground/60" />
                                            <span className="text-[9px] text-muted-foreground/60 text-center px-2">เลือกรูปสินค้า</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Character Image */}
                            <div>
                                <label className="text-[10px] text-muted-foreground mb-1 block text-center">รูปตัวละคร</label>
                                <div
                                    onClick={() => onCharacterImageUpload()}
                                    onDragOver={handleDragOver}
                                    onDragEnter={(e) => { e.preventDefault(); setDragOverCharacter(true); }}
                                    onDragLeave={(e) => { e.preventDefault(); setDragOverCharacter(false); }}
                                    onDrop={(e) => handleDrop(e, onCharacterImageFile, setDragOverCharacter)}
                                    className={`relative w-full aspect-[3/4] rounded-xl border-2 border-dashed bg-background/50 flex flex-col items-center justify-center gap-2 transition-all duration-200 overflow-hidden group cursor-pointer ${
                                        dragOverCharacter
                                            ? 'border-neon-red bg-neon-red/10 scale-[1.02]'
                                            : 'border-border hover:border-neon-red/50 hover:bg-neon-red/5'
                                    }`}
                                >
                                    {dragOverCharacter ? (
                                        <>
                                            <Image className="w-6 h-6 text-neon-red animate-bounce" />
                                            <span className="text-[9px] text-neon-red font-medium">วางรูปที่นี่</span>
                                        </>
                                    ) : characterImage ? (
                                        <>
                                            <img src={characterImage} alt="Character" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <RefreshCw className="w-5 h-5 text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5 text-muted-foreground/60" />
                                            <span className="text-[9px] text-muted-foreground/60 text-center px-2">เลือกรูปตัวละคร</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
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
