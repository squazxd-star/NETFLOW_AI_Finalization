import { ShoppingBag, Link, FileText, Image, Plus, Sparkles, RefreshCw, ChevronDown, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { ProductDataSectionProps } from "./types";
import {
    getSyncedProducts,
    setActiveProduct,
    openTikTokStudio,
    TikTokProduct
} from "@/services/tiktokProductService";
import { useToast } from "@/hooks/use-toast";

const ProductDataSection = ({
    register,
    setValue,
    isOpen,
    onToggle,
    productImages,
    onProductImageUpload,
    onSyncedProductImageSelect
}: ProductDataSectionProps) => {
    const { toast } = useToast();
    const [syncedProducts, setSyncedProducts] = useState<TikTokProduct[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Load synced products on mount
    useEffect(() => {
        loadSyncedProducts();
    }, []);

    const loadSyncedProducts = async () => {
        const products = await getSyncedProducts();
        setSyncedProducts(products);
    };

    // Handle product selection
    const handleSelectProduct = async (product: TikTokProduct) => {
        setSelectedProductId(product.id);
        setIsDropdownOpen(false);
        
        // Auto-fill form fields
        setValue("productId", product.id);
        setValue("productName", product.name);
        onSyncedProductImageSelect?.(product.imageUrl || null);

        // Set as active product
        await setActiveProduct(product.id);
        
        toast({
            title: "✅ เลือกสินค้าแล้ว",
            description: `"${product.name}" ถูกใช้เป็นข้อมูลสินค้า`,
            className: "bg-green-600 text-white"
        });
    };

    // Handle open TikTok Studio
    const handleOpenTikTokStudio = () => {
        openTikTokStudio();
        toast({
            title: "🌐 เปิด TikTok Studio",
            description: "ไปที่หน้าสินค้าและกด 'ซิงค์' เพื่อเพิ่มสินค้าใหม่"
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
                <div className="px-4 pb-4 space-y-4">
                    {/* Synced Products Dropdown */}
                    <div>
                        <label className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <RefreshCw className="w-3 h-3 text-neon-red" />
                            เลือกจากสินค้าที่ซิงค์
                        </label>
                        
                        {syncedProducts.length > 0 ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full neon-input text-xs flex items-center justify-between"
                                >
                                    <span className={selectedProductId ? "text-foreground" : "text-muted-foreground"}>
                                        {selectedProductId 
                                            ? syncedProducts.find(p => p.id === selectedProductId)?.name 
                                            : "เลือกสินค้าที่ซิงค์ไว้..."}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                
                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                                        {syncedProducts.map((product) => (
                                            <button
                                                key={product.id}
                                                onClick={() => handleSelectProduct(product)}
                                                className={`w-full flex items-center gap-2 p-2 hover:bg-muted/50 transition-colors text-left ${
                                                    selectedProductId === product.id ? 'bg-neon-red/5 border-l-2 border-neon-red' : ''
                                                }`}
                                            >
                                                {product.imageUrl ? (
                                                    <img src={product.imageUrl} alt="" className="w-8 h-8 rounded object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
                                                        <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-xs font-medium text-foreground truncate">{product.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">ID: {product.id}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={handleOpenTikTokStudio}
                                className="w-full py-2.5 rounded-xl text-xs font-medium text-foreground bg-muted border border-border hover:border-neon-red/50 transition-colors flex items-center justify-center gap-2"
                            >
                                <ExternalLink className="w-3 h-3 text-neon-red" />
                                ไปที่ TikTok Studio เพื่อซิงค์สินค้า
                            </button>
                        )}
                    </div>

                    {/* Product ID */}
                    <div>
                        <label className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Link className="w-3 h-3 text-neon-red" />
                            รหัสสินค้า (TikTok)
                        </label>
                        <input
                            type="text"
                            {...register("productId")}
                            placeholder="ตัวอย่าง 1729384..."
                            className="w-full neon-input text-xs"
                        />
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <FileText className="w-3 h-3 text-neon-red" />
                            ชื่อสินค้า
                        </label>
                        <input
                            type="text"
                            {...register("productName")}
                            placeholder="ระบุชื่อสินค้า..."
                            className="w-full neon-input text-xs"
                        />
                    </div>

                    {/* Product Images */}
                    <div>
                        <label className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Image className="w-3 h-3 text-neon-red" />
                            รูปภาพ (สูงสุด 2)
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => onProductImageUpload(index)}
                                    className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-2 hover:border-neon-red/50 hover:bg-neon-red/5 transition-all duration-200 overflow-hidden"
                                >
                                    {img ? (
                                        <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <Plus className="w-6 h-6 text-muted-foreground" />
                                            <span className="text-[10px] text-muted-foreground">คลิกเพื่อเลือก</span>
                                        </>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info Note */}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
                        <Sparkles className="w-4 h-4 text-neon-red flex-shrink-0" />
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
