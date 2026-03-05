import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ChevronDown, ChevronUp, Clock, RefreshCw, Check, ShoppingBag,
    Loader2, Trash2, ExternalLink, Send, Hash, Eye, Shield,
    Settings2, Bell, ShoppingCart, MessageSquare, Save, CalendarDays
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { tikTokSettingsSchema, TikTokSettingsFormData, tikTokSettingsDefaultValues } from "@/schemas";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import {
    getSyncedProducts,
    deleteProduct,
    setActiveProduct,
    triggerProductSync,
    openTikTokStudio,
    TikTokProduct
} from "@/services/tiktokProductService";
import {
    saveTikTokPostingConfig,
    loadTikTokPostingConfig,
} from "@/services/tiktokPostingConfigService";
import { useToast } from "@/hooks/use-toast";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const TikTokSettingsTab = () => {
    const { toast } = useToast();

    const form = useForm<TikTokSettingsFormData>({
        resolver: zodResolver(tikTokSettingsSchema),
        defaultValues: tikTokSettingsDefaultValues,
    });

    const { register, control, setValue, watch } = form;

    // UI State
    const [advancedOpen, setAdvancedOpen] = useState(false);

    // Synced products state
    const [syncedProducts, setSyncedProducts] = useState<TikTokProduct[]>([]);
    const [activeProductId, setActiveProductId] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
    const [syncError, setSyncError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Watch form values for reactive UI
    const postingMode = watch("postingMode");
    const scheduleDates = watch("scheduleDates");
    const scheduleHour = watch("scheduleHour");
    const scheduleMinute = watch("scheduleMinute");
    const autoCaption = watch("autoCaption");
    const autoHashtags = watch("autoHashtags");

    // Load synced products + saved config on mount
    useEffect(() => {
        loadSyncedProducts();
        loadSavedConfig();
    }, []);

    const loadSyncedProducts = async () => {
        const products = await getSyncedProducts();
        setSyncedProducts(products);
        if (products.length > 0) {
            const lastSync = Math.max(...products.map(p => p.syncedAt));
            setLastSyncedAt(new Date(lastSync).toLocaleString('th-TH'));
        }
    };

    const loadSavedConfig = async () => {
        const config = await loadTikTokPostingConfig();
        Object.entries(config).forEach(([key, value]) => {
            setValue(key as keyof TikTokSettingsFormData, value as never);
        });
    };

    // Handle sync button click
    const handleSyncProduct = async () => {
        setIsSyncing(true);
        setSyncError(null);
        try {
            const result = await triggerProductSync();

            if (result.success && result.product) {
                const count = result.count || 1;
                setSyncError(null);
                toast({
                    title: `✅ ซิงค์สำเร็จ! (${count} สินค้า)`,
                    description: count > 1
                        ? `พบ ${count} สินค้า - "${result.product.name}" และอื่นๆ` 
                        : `สินค้า "${result.product.name}" ถูกบันทึกแล้ว`,
                    className: "toast-theme-bg"
                });
                await loadSyncedProducts();
                setActiveProductId(result.product.id);
            } else {
                setSyncError(result.error || "กรุณาเปิดหน้าสินค้าใน TikTok Studio ก่อน");
                toast({
                    title: "❌ ซิงค์ไม่สำเร็จ",
                    description: result.error || "กรุณาเปิดหน้าสินค้าใน TikTok Studio ก่อน",
                    variant: "destructive"
                });
            }
        } catch (error) {
            const errMsg = "ไม่สามารถเชื่อมต่อกับ TikTok Studio ได้ กรุณา refresh หน้า TikTok Studio แล้วลองใหม่";
            setSyncError(errMsg);
            toast({
                title: "❌ เกิดข้อผิดพลาด",
                description: errMsg,
                variant: "destructive"
            });
        } finally {
            setIsSyncing(false);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        await deleteProduct(productId);
        await loadSyncedProducts();
        if (activeProductId === productId) {
            setActiveProductId(null);
        }
        toast({ title: "🗑️ ลบสำเร็จ", description: "ลบสินค้าออกจากรายการแล้ว" });
    };

    const handleUseProduct = async (product: TikTokProduct) => {
        await setActiveProduct(product.id);
        setActiveProductId(product.id);
        setValue("productId", product.id);
        setValue("productName", product.name);
        toast({
            title: "✅ เลือกสินค้าแล้ว",
            description: `"${product.name}" จะถูกใช้ในวิดีโอถัดไป`,
            className: "toast-theme-bg"
        });
    };

    const handleOpenTikTokStudio = () => {
        openTikTokStudio();
        toast({
            title: "🌐 เปิด TikTok Studio",
            description: "กรุณาเข้าสู่ระบบและเปิดหน้าสินค้าที่ต้องการซิงค์"
        });
    };

    // Convert scheduleDates (ISO strings) to Date objects for calendar
    const selectedCalendarDates = (scheduleDates || []).map(d => new Date(d));

    const handleCalendarSelect = (dates: Date[] | undefined) => {
        if (!dates) {
            setValue("scheduleDates", []);
            return;
        }
        const isoStrings = dates.map(d => format(d, "yyyy-MM-dd"));
        setValue("scheduleDates", isoStrings);
    };

    // Save config
    const handleSave = async (data: TikTokSettingsFormData) => {
        setIsSaving(true);
        try {
            await saveTikTokPostingConfig(data);
            toast({
                title: "✅ บันทึกสำเร็จ",
                description: "การตั้งค่า TikTok ถูกบันทึกแล้ว พร้อมใช้งานโพสต์อัตโนมัติ",
                className: "toast-theme-bg"
            });
        } catch {
            toast({
                title: "❌ บันทึกไม่สำเร็จ",
                description: "เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="p-4 space-y-3">

            {/* ===== 1. Product Sync Section ===== */}
            <section className="glass-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-neon-red" />
                        <span className="text-sm font-semibold text-foreground">ซิงค์สินค้า</span>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${syncedProducts.length > 0 ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'}`}>
                        {syncedProducts.length > 0 ? `${syncedProducts.length} สินค้า` : "ยังไม่ซิงค์"}
                    </span>
                </div>

                <button
                    onClick={handleSyncProduct}
                    disabled={isSyncing}
                    className="w-full py-2.5 rounded-xl font-medium text-white bg-neon-red hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    {isSyncing ? "กำลังซิงค์..." : "ซิงค์สินค้าจาก TikTok Studio"}
                </button>

                {syncError && (
                    <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/30">
                        <p className="text-[11px] text-red-400">{syncError}</p>
                    </div>
                )}

                {!syncError && syncedProducts.length > 0 && (
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1 text-green-500">
                            <Check className="w-3 h-3" />
                            ซิงค์แล้ว {syncedProducts.length} สินค้า
                        </span>
                        {lastSyncedAt && <span>ล่าสุด: {lastSyncedAt}</span>}
                    </div>
                )}

                {/* Synced product list (compact) */}
                {syncedProducts.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                        {syncedProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`flex items-center gap-2 p-2 rounded-lg border transition-colors ${
                                    activeProductId === product.id
                                        ? 'border-neon-red/50 bg-neon-red/5'
                                        : 'border-border bg-muted/20'
                                }`}
                            >
                                <div className="w-8 h-8 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {product.imageUrl ? (
                                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-medium text-foreground truncate">{product.name}</p>
                                    <p className="text-[9px] text-muted-foreground font-mono">{product.id}</p>
                                </div>
                                <button
                                    onClick={() => handleUseProduct(product)}
                                    className={`p-1 rounded transition-colors ${
                                        activeProductId === product.id
                                            ? 'text-neon-red'
                                            : 'text-muted-foreground hover:text-neon-red'
                                    }`}
                                >
                                    <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-1 rounded text-muted-foreground hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={handleOpenTikTokStudio}
                    className="w-full py-2 rounded-lg text-xs text-muted-foreground border border-border hover:border-neon-red/30 transition-colors flex items-center justify-center gap-1.5"
                >
                    <ExternalLink className="w-3 h-3" />
                    เปิด TikTok Studio
                </button>
            </section>

            {/* ===== 2. Posting Mode ===== */}
            <section className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-neon-red" />
                    <span className="text-sm font-semibold text-foreground">โหมดการโพสต์</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {([
                        { value: "immediate", label: "ทันที", desc: "โพสต์เลยหลังเจน" },
                        { value: "scheduled", label: "ตั้งเวลา", desc: "เลือกเวลาเอง" },
                        { value: "queue", label: "คิว", desc: "ต่อคิวอัตโนมัติ" },
                    ] as const).map((mode) => (
                        <button
                            key={mode.value}
                            onClick={() => setValue("postingMode", mode.value)}
                            className={`py-2.5 px-2 rounded-xl text-center transition-all border ${
                                postingMode === mode.value
                                    ? 'bg-neon-red text-white border-neon-red'
                                    : 'bg-muted/30 text-muted-foreground border-border hover:border-neon-red/30'
                            }`}
                        >
                            <p className="text-xs font-medium">{mode.label}</p>
                            <p className="text-[9px] opacity-70 mt-0.5">{mode.desc}</p>
                        </button>
                    ))}
                </div>

                {/* Schedule settings (show when scheduled or queue) */}
                {(postingMode === "scheduled" || postingMode === "queue") && (
                    <div className="space-y-4 pt-2">
                        {/* Time Picker */}
                        <div className="p-3 rounded-xl bg-muted/30 border border-border space-y-2">
                            <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                                <Clock className="w-3 h-3 text-neon-red" />
                                เวลาโพสต์
                            </label>
                            <div className="flex items-center gap-2">
                                {/* Hour */}
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <button
                                        onClick={() => setValue("scheduleHour", (scheduleHour + 1) % 24)}
                                        className="w-full flex justify-center py-0.5 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <div className="w-full text-center py-2 rounded-lg bg-background border border-border text-lg font-semibold text-foreground tabular-nums">
                                        {String(scheduleHour).padStart(2, "0")}
                                    </div>
                                    <button
                                        onClick={() => setValue("scheduleHour", (scheduleHour - 1 + 24) % 24)}
                                        className="w-full flex justify-center py-0.5 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <span className="text-[9px] text-muted-foreground">ชั่วโมง</span>
                                </div>

                                <span className="text-xl font-bold text-muted-foreground pb-5">:</span>

                                {/* Minute */}
                                <div className="flex-1 flex flex-col items-center gap-1">
                                    <button
                                        onClick={() => {
                                            const idx = MINUTES.indexOf(scheduleMinute);
                                            const next = idx >= 0 ? MINUTES[(idx + 1) % MINUTES.length] : 0;
                                            setValue("scheduleMinute", next);
                                        }}
                                        className="w-full flex justify-center py-0.5 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <div className="w-full text-center py-2 rounded-lg bg-background border border-border text-lg font-semibold text-foreground tabular-nums">
                                        {String(scheduleMinute).padStart(2, "0")}
                                    </div>
                                    <button
                                        onClick={() => {
                                            const idx = MINUTES.indexOf(scheduleMinute);
                                            const next = idx > 0 ? MINUTES[idx - 1] : MINUTES[MINUTES.length - 1];
                                            setValue("scheduleMinute", next);
                                        }}
                                        className="w-full flex justify-center py-0.5 rounded-lg hover:bg-muted transition-colors"
                                    >
                                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                                    </button>
                                    <span className="text-[9px] text-muted-foreground">นาที</span>
                                </div>

                                {/* Quick presets */}
                                <div className="flex flex-col gap-1 pl-2">
                                    {[
                                        { h: 12, m: 0, label: "12:00" },
                                        { h: 18, m: 0, label: "18:00" },
                                        { h: 20, m: 0, label: "20:00" },
                                    ].map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => {
                                                setValue("scheduleHour", preset.h);
                                                setValue("scheduleMinute", preset.m);
                                            }}
                                            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all border ${
                                                scheduleHour === preset.h && scheduleMinute === preset.m
                                                    ? 'bg-neon-red text-white border-neon-red'
                                                    : 'bg-muted/50 text-muted-foreground border-border hover:border-neon-red/30'
                                            }`}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <p className="text-[9px] text-green-500 text-center">AI แนะนำ 18:00 - 21:00 (Engagement สูง)</p>
                        </div>

                        {/* Calendar Date Picker */}
                        <div className="rounded-xl bg-muted/30 border border-border overflow-hidden">
                            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                                <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <CalendarDays className="w-3 h-3 text-neon-red" />
                                    วันที่โพสต์
                                </label>
                                {selectedCalendarDates.length > 0 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neon-red/10 text-neon-red">
                                        เลือก {selectedCalendarDates.length} วัน
                                    </span>
                                )}
                            </div>
                            <div className="flex justify-center py-2">
                                <Calendar
                                    mode="multiple"
                                    selected={selectedCalendarDates}
                                    onSelect={handleCalendarSelect as any}
                                    locale={th}
                                    className="!bg-transparent"
                                    classNames={{
                                        months: "flex flex-col space-y-2",
                                        month: "space-y-2",
                                        caption: "flex justify-center pt-1 relative items-center",
                                        caption_label: "text-xs font-semibold text-foreground",
                                        nav: "space-x-1 flex items-center",
                                        nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md border border-border hover:bg-muted transition-colors",
                                        nav_button_previous: "absolute left-1",
                                        nav_button_next: "absolute right-1",
                                        table: "w-full border-collapse",
                                        head_row: "flex",
                                        head_cell: "text-muted-foreground rounded-md w-8 font-medium text-[10px]",
                                        row: "flex w-full mt-1",
                                        cell: "h-8 w-8 text-center text-xs p-0 relative focus-within:relative focus-within:z-20",
                                        day: "h-8 w-8 p-0 font-normal rounded-lg hover:bg-muted transition-colors inline-flex items-center justify-center",
                                        day_selected: "!bg-neon-red !text-white hover:!bg-neon-red/90",
                                        day_today: "bg-muted/60 text-foreground font-semibold",
                                        day_outside: "text-muted-foreground/30 opacity-50",
                                        day_disabled: "text-muted-foreground/20 opacity-30",
                                        day_hidden: "invisible",
                                    }}
                                    disabled={{ before: new Date() }}
                                />
                            </div>
                            {selectedCalendarDates.length > 0 && (
                                <div className="px-3 pb-2">
                                    <div className="flex flex-wrap gap-1">
                                        {(scheduleDates || []).sort().slice(0, 5).map((d) => (
                                            <span key={d} className="text-[9px] px-1.5 py-0.5 rounded bg-neon-red/10 text-neon-red">
                                                {format(new Date(d), "d MMM", { locale: th })}
                                            </span>
                                        ))}
                                        {(scheduleDates || []).length > 5 && (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                                +{(scheduleDates || []).length - 5} วัน
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* ===== 3. Caption & Hashtags ===== */}
            <section className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-neon-red" />
                    <span className="text-sm font-semibold text-foreground">Caption & แฮชแท็ก</span>
                </div>

                {/* Auto Caption */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div>
                        <span className="text-xs text-foreground">AI สร้าง Caption อัตโนมัติ</span>
                        <p className="text-[9px] text-muted-foreground mt-0.5">สร้างจากชื่อสินค้าและเนื้อหาวิดีโอ</p>
                    </div>
                    <Controller
                        name="autoCaption"
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

                {/* Caption Template (show when auto caption is off) */}
                {!autoCaption && (
                    <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">Caption Template</label>
                        <textarea
                            {...register("captionTemplate")}
                            placeholder="เขียน caption ที่ต้องการ... ใช้ {productName} สำหรับชื่อสินค้า"
                            className="w-full neon-input text-xs min-h-[60px] resize-none"
                        />
                    </div>
                )}

                {/* Include product name */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border">
                    <span className="text-[11px] text-foreground">ใส่ชื่อสินค้าใน Caption</span>
                    <Controller
                        name="includeProductName"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-neon-red scale-90"
                            />
                        )}
                    />
                </div>

                {/* Auto Hashtags */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-2">
                        <Hash className="w-3.5 h-3.5 text-neon-red" />
                        <div>
                            <span className="text-xs text-foreground">แฮชแท็กอัตโนมัติ</span>
                            <p className="text-[9px] text-muted-foreground mt-0.5">AI เลือกแฮชแท็กที่เหมาะสม</p>
                        </div>
                    </div>
                    <Controller
                        name="autoHashtags"
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

                {/* Custom hashtags */}
                {!autoHashtags && (
                    <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">แฮชแท็กที่ต้องการ</label>
                        <input
                            type="text"
                            {...register("customHashtags")}
                            placeholder="#สินค้าดี #ของมันต้องมี #รีวิว"
                            className="w-full neon-input text-xs"
                        />
                    </div>
                )}

                {autoHashtags && (
                    <div>
                        <label className="text-xs text-muted-foreground mb-1.5 block">จำนวนแฮชแท็ก</label>
                        <select
                            {...register("hashtagCount", { valueAsNumber: true })}
                            className="w-full neon-select text-xs"
                        >
                            <option value={3}>3 แฮชแท็ก</option>
                            <option value={5}>5 แฮชแท็ก (แนะนำ)</option>
                            <option value={10}>10 แฮชแท็ก</option>
                            <option value={15}>15 แฮชแท็ก</option>
                        </select>
                    </div>
                )}
            </section>

            {/* ===== 4. Product Pin (ปักตะกร้า) ===== */}
            <section className="glass-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-neon-red" />
                        <span className="text-sm font-semibold text-foreground">ปักตะกร้าอัตโนมัติ</span>
                    </div>
                    <Controller
                        name="autoPinProduct"
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
                <p className="text-[10px] text-muted-foreground">
                    เมื่อเปิด ระบบจะปักสินค้าที่เลือกไว้ลงในวิดีโอ TikTok อัตโนมัติหลังอัปโหลด
                </p>
            </section>

            {/* ===== 5. Privacy & Visibility ===== */}
            <section className="glass-card p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-neon-red" />
                    <span className="text-sm font-semibold text-foreground">การมองเห็นวิดีโอ</span>
                </div>

                <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">ใครเห็นวิดีโอ</label>
                    <select
                        {...register("visibility")}
                        className="w-full neon-select text-xs"
                    >
                        <option value="public">สาธารณะ (ทุกคนเห็น)</option>
                        <option value="friends">เพื่อนเท่านั้น</option>
                        <option value="private">ส่วนตัว (เฉพาะฉัน)</option>
                    </select>
                </div>

                <div className="space-y-1.5">
                    {([
                        { name: "allowComments" as const, label: "อนุญาตคอมเมนต์" },
                        { name: "allowDuet" as const, label: "อนุญาต Duet" },
                        { name: "allowStitch" as const, label: "อนุญาต Stitch" },
                    ]).map((item) => (
                        <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border">
                            <span className="text-[11px] text-foreground">{item.label}</span>
                            <Controller
                                name={item.name}
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-neon-red scale-90"
                                    />
                                )}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== 6. Advanced Settings (Collapsible) ===== */}
            <section className="glass-card overflow-hidden">
                <button
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className="w-full flex items-center justify-between p-4"
                >
                    <div className="flex items-center gap-2">
                        <Settings2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground">ตั้งค่าขั้นสูง</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`} />
                </button>

                {advancedOpen && (
                    <div className="px-4 pb-4 space-y-3">
                        {/* Retry on fail */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border">
                            <div>
                                <span className="text-[11px] text-foreground flex items-center gap-1.5">
                                    <Shield className="w-3 h-3 text-neon-red" />
                                    ลองใหม่เมื่อโพสต์ล้มเหลว
                                </span>
                            </div>
                            <Controller
                                name="retryOnFail"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-neon-red scale-90"
                                    />
                                )}
                            />
                        </div>

                        {/* Max retries */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1 block">จำนวนครั้งที่ลองใหม่</label>
                            <select
                                {...register("maxRetries", { valueAsNumber: true })}
                                className="w-full neon-select text-xs"
                            >
                                <option value={1}>1 ครั้ง</option>
                                <option value={2}>2 ครั้ง</option>
                                <option value={3}>3 ครั้ง (แนะนำ)</option>
                                <option value={5}>5 ครั้ง</option>
                            </select>
                        </div>

                        {/* Delay between posts */}
                        <div>
                            <label className="text-[11px] text-muted-foreground mb-1 block">หน่วงเวลาระหว่างโพสต์ (วินาที)</label>
                            <select
                                {...register("delayBetweenPosts", { valueAsNumber: true })}
                                className="w-full neon-select text-xs"
                            >
                                <option value={10}>10 วินาที</option>
                                <option value={30}>30 วินาที (แนะนำ)</option>
                                <option value={60}>1 นาที</option>
                                <option value={120}>2 นาที</option>
                                <option value={300}>5 นาที</option>
                            </select>
                        </div>

                        {/* Notifications */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border">
                            <span className="text-[11px] text-foreground flex items-center gap-1.5">
                                <Bell className="w-3 h-3 text-neon-red" />
                                แจ้งเตือนเมื่อโพสต์สำเร็จ
                            </span>
                            <Controller
                                name="notifications"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-neon-red scale-90"
                                    />
                                )}
                            />
                        </div>

                        {/* Auto delete failed draft */}
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/20 border border-border">
                            <div>
                                <span className="text-[11px] text-foreground">ลบ Draft ที่ล้มเหลวอัตโนมัติ</span>
                                <p className="text-[9px] text-muted-foreground">ป้องกัน Draft สะสมใน TikTok</p>
                            </div>
                            <Controller
                                name="autoDeleteFailedDraft"
                                control={control}
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="data-[state=checked]:bg-neon-red scale-90"
                                    />
                                )}
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* ===== Save Button ===== */}
            <button
                onClick={form.handleSubmit(handleSave)}
                disabled={isSaving}
                className="w-full py-4 px-6 rounded-2xl font-semibold text-white bg-neon-red pulse-glow hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isSaving ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        กำลังบันทึก...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5" />
                        บันทึกการตั้งค่า
                    </>
                )}
            </button>

            <p className="text-[10px] text-muted-foreground text-center">
                เมื่อบันทึกแล้ว ปุ่ม TikTok ในหน้าสร้างวิดีโอจะพร้อมใช้งาน
            </p>
        </div>
    );
};

export default TikTokSettingsTab;
