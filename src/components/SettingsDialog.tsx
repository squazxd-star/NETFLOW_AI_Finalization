import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    X,
    Settings,
    RefreshCw,
    Bell,
    Plus,
    MoreVertical,
    CheckCircle2,
    Loader2,
    Palette,
    Key,
    Link2,
    Check,
    Sparkles
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { saveApiKey, getApiKey } from "../services/storageService";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTheme, THEMES, ThemeKey } from "@/contexts/ThemeContext";

interface SettingsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
    const [tiktokConnected, setTiktokConnected] = useState(true);
    const [watermarkEnabled, setWatermarkEnabled] = useState(false);
    const [webhookUrl, setWebhookUrl] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [openaiKey, setOpenaiKey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isTesting, setIsTesting] = useState(false);
    const [isTestingOpenAI, setIsTestingOpenAI] = useState(false);
    const [isGeminiVerified, setIsGeminiVerified] = useState(false);
    const [isOpenAIVerified, setIsOpenAIVerified] = useState(false);
    const { toast } = useToast();
    const { theme, config: themeConfig, setTheme } = useTheme();

    useEffect(() => {
        if (open) {
            loadSettings();
        }
    }, [open]);

    const loadSettings = async () => {
        const key = await getApiKey('gemini');
        if (key) setApiKey(key);

        const openAi = await getApiKey('openai');
        if (openAi) setOpenaiKey(openAi);
    };

    useEffect(() => {
        setIsGeminiVerified(false);
    }, [apiKey]);

    useEffect(() => {
        setIsOpenAIVerified(false);
    }, [openaiKey]);

    const handleTestConnection = async () => {
        if (!apiKey.trim()) {
            toast({ title: "ผิดพลาด", description: "กรุณากรอก API Key ก่อน", variant: "destructive" });
            return;
        }

        setIsTesting(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKey.trim());
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            await model.generateContent("Test");

            setIsGeminiVerified(true);

            toast({
                title: "เชื่อมต่อ Gemini สำเร็จ ✅",
                description: "API Key ของคุณใช้งานได้",
                variant: "default",
                className: "toast-theme-bg"
            });
        } catch (error: any) {
            let msg = error.message || "Unknown error";
            if (msg.includes("403")) msg = "Key Invalid or Leaked (403)";
            if (msg.includes("429")) msg = "Quota Exceeded (429)";

            toast({
                title: "เชื่อมต่อ Gemini ล้มเหลว ❌",
                description: msg,
                variant: "destructive"
            });
        } finally {
            setIsTesting(false);
        }
    };

    const handleTestOpenAI = async () => {
        if (!openaiKey.trim()) {
            toast({ title: "ผิดพลาด", description: "กรุณากรอก OpenAI Key ก่อน", variant: "destructive" });
            return;
        }

        setIsTestingOpenAI(true);
        try {
            const response = await fetch("https://api.openai.com/v1/models", {
                headers: {
                    "Authorization": `Bearer ${openaiKey.trim()}`
                }
            });

            if (response.ok) {
                setIsOpenAIVerified(true);
                toast({
                    title: "เชื่อมต่อ OpenAI สำเร็จ ✅",
                    description: "API Key ของคุณใช้งานได้",
                    variant: "default",
                    className: "toast-theme-bg"
                });
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error: any) {
            toast({
                title: "เชื่อมต่อ OpenAI ล้มเหลว ❌",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setIsTestingOpenAI(false);
        }
    };

    const handleSaveAll = async () => {
        setIsLoading(true);
        try {
            if (apiKey.trim()) {
                await saveApiKey(apiKey.trim(), 'gemini');
            }
            if (openaiKey.trim()) {
                await saveApiKey(openaiKey.trim(), 'openai');
            }

            toast({
                title: "บันทึกการตั้งค่าสำเร็จ",
                description: "ข้อมูล API Key และการตั้งค่าอื่นๆ ถูกบันทึกแล้ว",
                variant: "default",
                className: "toast-theme-bg"
            });
            onOpenChange(false);
        } catch (error) {
            toast({
                title: "เกิดข้อผิดพลาด",
                description: "ไม่สามารถบันทึกข้อมูลได้",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const aiProvider = localStorage.getItem("netflow_ai_provider") || "openai";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-[#0a0a0a] border border-white/10 text-white p-0 gap-0 max-h-[90vh] overflow-y-auto rounded-2xl">
                {/* Header */}
                <DialogDescription className="sr-only">ตั้งค่าระบบ Netflow AI</DialogDescription>
                <DialogHeader className="px-5 pt-5 pb-4 sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm z-10 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-9 h-9 rounded-xl flex items-center justify-center"
                                style={{ background: `rgba(${themeConfig.hexRgb}, 0.15)` }}
                            >
                                <Settings className="w-4.5 h-4.5" style={{ color: themeConfig.hex }} />
                            </div>
                            <div>
                                <DialogTitle className="text-base font-bold text-white tracking-tight">การตั้งค่าระบบ</DialogTitle>
                                <p className="text-[11px] text-white/40 mt-0.5">จัดการบัญชี, API และธีมแอป</p>
                            </div>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <X className="w-4 h-4 text-white/40" />
                        </button>
                    </div>
                </DialogHeader>

                <div className="px-5 py-4 space-y-5">

                    {/* ═══════ Section 1: Theme Color ═══════ */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `rgba(${themeConfig.hexRgb}, 0.15)` }}>
                                <Palette className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                            </div>
                            <h3 className="text-[13px] font-semibold text-white">ธีมสีแอป</h3>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                            {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
                                const t = THEMES[key];
                                const isActive = theme === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => {
                                            setTheme(key);
                                            toast({
                                                title: `เปลี่ยนธีมเป็น ${t.labelTh}`,
                                                description: "สีแอปทั้งหมดถูกเปลี่ยนแล้ว",
                                                className: "toast-theme-bg"
                                            });
                                        }}
                                        className={`relative group flex flex-col items-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-300 ${
                                            isActive
                                                ? "border-white/40 bg-white/[0.08] scale-[1.02]"
                                                : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.12]"
                                        }`}
                                    >
                                        {/* Color circle */}
                                        <div className="relative">
                                            <div
                                                className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-110"
                                                style={{
                                                    background: `linear-gradient(135deg, ${t.gradientFrom}, ${t.gradientVia})`,
                                                    boxShadow: isActive ? `0 0 16px rgba(${t.hexRgb}, 0.5)` : `0 0 8px rgba(${t.hexRgb}, 0.2)`,
                                                }}
                                            />
                                            {isActive && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-white drop-shadow-lg" />
                                                </div>
                                            )}
                                        </div>
                                        <span className={`text-[10px] font-medium ${isActive ? "text-white" : "text-white/50"}`}>
                                            {t.labelTh}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <div className="border-t border-white/[0.06]" />

                    {/* ═══════ Section 2: Connection & Sync ═══════ */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `rgba(${themeConfig.hexRgb}, 0.15)` }}>
                                <Link2 className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                            </div>
                            <h3 className="text-[13px] font-semibold text-white">การเชื่อมต่อและซิงค์</h3>
                        </div>

                        {/* Connected Accounts */}
                        <div className="space-y-2">
                            <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium pl-1">บัญชีที่เชื่อมต่อ</span>

                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                        S
                                    </div>
                                    <div>
                                        <span className="text-[13px] font-medium text-white">@shopowner_th</span>
                                        <p className="text-[10px] text-white/30">Proxy: TH-Bangkok-01</p>
                                    </div>
                                </div>
                                <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                                    <MoreVertical className="w-3.5 h-3.5 text-white/30" />
                                </button>
                            </div>

                            {/* TikTok Studio Connection */}
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 via-pink-500 to-red-500 flex items-center justify-center text-white shadow-lg">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="text-[13px] font-medium text-white">TikTok Studio</span>
                                        <p className={`text-[10px] ${tiktokConnected ? 'text-green-400' : 'text-white/30'}`}>
                                            {tiktokConnected ? '✓ เชื่อมต่อแล้ว' : 'ยังไม่เชื่อมต่อ'}
                                        </p>
                                    </div>
                                </div>
                                <Switch
                                    checked={tiktokConnected}
                                    onCheckedChange={setTiktokConnected}
                                    className="data-[state=checked]:bg-green-500"
                                />
                            </div>

                            <button className="w-full bg-white/[0.02] hover:bg-white/[0.05] rounded-xl p-2.5 border border-dashed border-white/[0.08] flex items-center justify-center gap-1.5 transition-colors">
                                <Plus className="w-3.5 h-3.5 text-white/30" />
                                <span className="text-[11px] text-white/30">เพิ่มบัญชีใหม่</span>
                            </button>
                        </div>

                        {/* Webhooks — inline */}
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 pl-1">
                                <Bell className="w-3 h-3" style={{ color: themeConfig.hex }} />
                                <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">Webhook แจ้งเตือน</span>
                            </div>
                            <Input
                                value={webhookUrl}
                                onChange={(e) => setWebhookUrl(e.target.value)}
                                placeholder="https://..."
                                className="bg-white/[0.03] border-white/[0.06] text-white placeholder:text-white/20 text-xs h-8"
                            />
                            <p className="text-[9px] text-white/25 pl-1">แจ้งเตือนไปยัง Line/Discord เมื่อเรนเดอร์งานเสร็จ</p>
                        </div>
                    </section>

                    <div className="border-t border-white/[0.06]" />

                    {/* ═══════ Section 3: AI Provider ═══════ */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `rgba(${themeConfig.hexRgb}, 0.15)` }}>
                                <Sparkles className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                            </div>
                            <h3 className="text-[13px] font-semibold text-white">เลือก AI สำหรับสร้าง Script</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => {
                                    localStorage.setItem("netflow_ai_provider", "openai");
                                    toast({
                                        title: "เปลี่ยนเป็น OpenAI ✅",
                                        description: "ระบบจะใช้ OpenAI GPT-4 ในการสร้าง Script",
                                        className: "toast-theme-bg"
                                    });
                                }}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                                    aiProvider === "openai"
                                        ? ""
                                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                                }`}
                                style={aiProvider === "openai" ? {
                                    background: `rgba(${themeConfig.hexRgb}, 0.1)`,
                                    borderColor: `rgba(${themeConfig.hexRgb}, 0.5)`,
                                    boxShadow: `0 0 12px rgba(${themeConfig.hexRgb}, 0.1)`,
                                } : {}}
                            >
                                <div className={`text-sm font-bold ${aiProvider === "openai" ? "" : "text-white/60"}`} style={aiProvider === "openai" ? { color: themeConfig.hex } : {}}>OpenAI</div>
                                <div className={`text-[10px] mt-0.5 ${aiProvider === "openai" ? "" : "text-white/25"}`} style={aiProvider === "openai" ? { color: `rgba(${themeConfig.hexRgb}, 0.6)` } : {}}>GPT-4o-mini</div>
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.setItem("netflow_ai_provider", "gemini");
                                    toast({
                                        title: "เปลี่ยนเป็น Gemini ✅",
                                        description: "ระบบจะใช้ Google Gemini ในการสร้าง Script",
                                        className: "toast-theme-bg"
                                    });
                                }}
                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                                    aiProvider === "gemini"
                                        ? ""
                                        : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1]"
                                }`}
                                style={aiProvider === "gemini" ? {
                                    background: `rgba(${themeConfig.hexRgb}, 0.1)`,
                                    borderColor: `rgba(${themeConfig.hexRgb}, 0.5)`,
                                    boxShadow: `0 0 12px rgba(${themeConfig.hexRgb}, 0.1)`,
                                } : {}}
                            >
                                <div className={`text-sm font-bold ${aiProvider === "gemini" ? "" : "text-white/60"}`} style={aiProvider === "gemini" ? { color: themeConfig.hex } : {}}>Gemini</div>
                                <div className={`text-[10px] mt-0.5 ${aiProvider === "gemini" ? "" : "text-white/25"}`} style={aiProvider === "gemini" ? { color: `rgba(${themeConfig.hexRgb}, 0.6)` } : {}}>Gemini 2.0 Flash</div>
                            </button>
                        </div>
                        <p className="text-[9px] text-white/25 text-center">เลือก AI ที่จะใช้สร้าง Script (ต้องใส่ API Key ด้วย)</p>
                    </section>

                    <div className="border-t border-white/[0.06]" />

                    {/* ═══════ Section 4: API Keys ═══════ */}
                    <section className="space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `rgba(${themeConfig.hexRgb}, 0.15)` }}>
                                <Key className="w-3.5 h-3.5" style={{ color: themeConfig.hex }} />
                            </div>
                            <h3 className="text-[13px] font-semibold text-white">API Keys (BYOK)</h3>
                        </div>

                        <div className="space-y-2">
                            {/* Gemini API */}
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[15px] font-bold drop-shadow-sm" style={{ color: themeConfig.hex }}>Gemini API</span>
                                        <span className="text-[10px] text-white/30">(Google Ultra/Veo)</span>
                                    </div>
                                    <button
                                        onClick={handleTestConnection}
                                        disabled={isTesting || !apiKey || isGeminiVerified}
                                        className={`flex items-center gap-1.5 h-7 text-[11px] px-3 rounded-lg font-medium transition-all duration-300 ${
                                            isGeminiVerified
                                                ? 'scale-105'
                                                : apiKey 
                                                    ? 'hover:scale-[1.02] active:scale-95' 
                                                    : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                                        }`}
                                        style={isGeminiVerified ? {
                                            background: `rgba(${themeConfig.hexRgb}, 0.2)`,
                                            color: themeConfig.hex,
                                            border: `1px solid rgba(${themeConfig.hexRgb}, 0.3)`,
                                            boxShadow: `0 0 10px rgba(${themeConfig.hexRgb}, 0.2)`,
                                        } : apiKey ? {
                                            background: `rgba(${themeConfig.hexRgb}, 0.1)`,
                                            color: themeConfig.hex,
                                            border: `1px solid rgba(${themeConfig.hexRgb}, 0.2)`,
                                        } : {}}
                                    >
                                        {isTesting ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : isGeminiVerified ? (
                                            <div className="flex items-center gap-1 animate-in zoom-in duration-300">
                                                <Key className="w-3 h-3" />
                                                <Check className="w-3 h-3" />
                                            </div>
                                        ) : (
                                            <CheckCircle2 className="w-3 h-3" />
                                        )}
                                        {isGeminiVerified ? "Verified" : "Test"}
                                    </button>
                                </div>
                                <Input
                                    type="password"
                                    placeholder="AIza..."
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="bg-white/[0.03] border-white/[0.06] text-white text-xs h-7 placeholder:text-white/15"
                                />
                                <p className="text-[9px] text-white/25">
                                    สมัครฟรีที่ <a href="https://aistudio.google.com/" target="_blank" className="underline" style={{ color: `rgba(${themeConfig.hexRgb}, 0.7)` }} onMouseEnter={e => e.currentTarget.style.color = themeConfig.hex} onMouseLeave={e => e.currentTarget.style.color = `rgba(${themeConfig.hexRgb}, 0.7)`}>aistudio.google.com</a>
                                </p>
                            </div>

                            {/* OpenAI API */}
                            <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-[15px] font-bold drop-shadow-sm" style={{ color: themeConfig.hex }}>OpenAI API</span>
                                        <span className="text-[10px] text-white/30">(GPT-4)</span>
                                    </div>
                                    <button
                                        onClick={handleTestOpenAI}
                                        disabled={isTestingOpenAI || !openaiKey || isOpenAIVerified}
                                        className={`flex items-center gap-1.5 h-7 text-[11px] px-3 rounded-lg font-medium transition-all duration-300 ${
                                            isOpenAIVerified
                                                ? 'scale-105'
                                                : openaiKey 
                                                    ? 'hover:scale-[1.02] active:scale-95' 
                                                    : 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                                        }`}
                                        style={isOpenAIVerified ? {
                                            background: `rgba(${themeConfig.hexRgb}, 0.2)`,
                                            color: themeConfig.hex,
                                            border: `1px solid rgba(${themeConfig.hexRgb}, 0.3)`,
                                            boxShadow: `0 0 10px rgba(${themeConfig.hexRgb}, 0.2)`,
                                        } : openaiKey ? {
                                            background: `rgba(${themeConfig.hexRgb}, 0.1)`,
                                            color: themeConfig.hex,
                                            border: `1px solid rgba(${themeConfig.hexRgb}, 0.2)`,
                                        } : {}}
                                    >
                                        {isTestingOpenAI ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : isOpenAIVerified ? (
                                            <div className="flex items-center gap-1 animate-in zoom-in duration-300">
                                                <Key className="w-3 h-3" />
                                                <Check className="w-3 h-3" />
                                            </div>
                                        ) : (
                                            <CheckCircle2 className="w-3 h-3" />
                                        )}
                                        {isOpenAIVerified ? "Verified" : "Test"}
                                    </button>
                                </div>
                                <Input
                                    type="password"
                                    placeholder="sk-..."
                                    value={openaiKey}
                                    onChange={(e) => setOpenaiKey(e.target.value)}
                                    className="bg-white/[0.03] border-white/[0.06] text-white text-xs h-7 placeholder:text-white/15"
                                />
                            </div>

                            {/* ElevenLabs — placeholder */}
                            <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04] opacity-40">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                                    <span className="text-xs font-medium text-white/50">ElevenLabs API</span>
                                    <span className="text-[9px] text-white/15 ml-auto">Coming Soon</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="border-t border-white/[0.06]" />

                    {/* ═══════ Section 5: Misc ═══════ */}
                    <section className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: themeConfig.hex }} />
                            <span className="text-xs font-medium text-white">ลายน้ำ (Watermark)</span>
                        </div>
                        <Switch
                            checked={watermarkEnabled}
                            onCheckedChange={setWatermarkEnabled}
                            style={{ '--switch-checked-bg': themeConfig.hex } as React.CSSProperties}
                            className="data-[state=checked]:!bg-[--switch-checked-bg]"
                        />
                    </section>

                    {/* ═══════ Save Button ═══════ */}
                    <Button
                        onClick={handleSaveAll}
                        disabled={isLoading}
                        className="w-full text-white font-semibold py-5 text-sm rounded-xl transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, ${themeConfig.gradientFrom}, ${themeConfig.gradientVia})`,
                            boxShadow: `0 4px 20px rgba(${themeConfig.hexRgb}, 0.25)`,
                        }}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Settings className="w-4 h-4 mr-2" />
                        )}
                        {isLoading ? "กำลังบันทึก..." : "บันทึกการตั้งค่าทั้งหมด"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;
