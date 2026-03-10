import { useState } from "react";
import { Settings, RefreshCw, Wand2, Radio, ShoppingBag, HardDrive } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import logoIcon from "/icons/icon128.png";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SettingsDialog from "@/components/SettingsDialog";
import ErrorBoundary from "@/components/ErrorBoundary";
import CreateVideoTab from "@/components/dashboard/CreateVideoTab";
import NetCastTab from "@/components/dashboard/NetCastTab";
import TikTokSettingsTab from "@/components/dashboard/TikTokSettingsTab";


const NetflowPanel = () => {
    // Tab state for smooth transitions
    const [activeTab, setActiveTab] = useState("create");

    // Reset key — incrementing remounts CreateVideoTab, resetting all state to defaults
    const [resetKey, setResetKey] = useState(0);

    // Settings Dialog state
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

    // Theme
    const { config: themeConfig } = useTheme();

    return (
        <div className="min-h-screen w-full max-w-[417px] mx-auto bg-background overflow-y-auto">
            {/* Header — Cyber-Pulse Premium */}
            <header className="sticky top-0 z-10 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
                <div className="flex items-center justify-between px-5 py-3.5">
                    {/* Logo with Glow */}
                    <div className="flex items-center gap-2.5 group cursor-pointer">
                        <div className="relative w-8 h-8 flex-shrink-0">
                            <div className="absolute -inset-2 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" style={{ background: themeConfig.hex }} />
                            <div className="relative w-8 h-8 rounded-md overflow-hidden">
                                <img
                                    src={logoIcon}
                                    alt="Netflow"
                                    className="w-8 h-8 object-cover"
                                    style={{
                                        filter: `brightness(0.7) saturate(0)`,
                                    }}
                                />
                                <div className="absolute inset-0" style={{ background: themeConfig.hex, mixBlendMode: "color", opacity: 0.9 }} />
                                <div className="absolute inset-0" style={{ background: themeConfig.hex, mixBlendMode: "soft-light", opacity: 0.5 }} />
                                <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 10px rgba(${themeConfig.hexRgb},0.4)` }} />
                            </div>
                        </div>
                        <h1 className="text-[17px] font-black tracking-[0.25em] uppercase text-foreground whitespace-nowrap" style={{ fontFamily: "'Inter', 'SF Pro Display', 'Segoe UI', system-ui, sans-serif" }}>
                            <span
                                className="bg-clip-text text-transparent"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${themeConfig.gradientFrom} 0%, ${themeConfig.gradientVia} 40%, ${themeConfig.gradientTo} 100%)`,
                                    filter: `drop-shadow(0 0 12px rgba(${themeConfig.hexRgb},0.6))`,
                                    letterSpacing: "0.2em",
                                }}
                            >
                                NETFLOW
                            </span>{" "}
                            <span
                                className="text-white/90"
                                style={{
                                    letterSpacing: "0.35em",
                                    fontWeight: 300,
                                    fontSize: "0.75em",
                                    verticalAlign: "1px",
                                }}
                            >
                                AI
                            </span>
                        </h1>
                    </div>

                    {/* Right: Status + Actions */}
                    <div className="flex items-center gap-3">
                        {/* Status Pulse Badge */}
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-white/[0.04] rounded-full border border-white/[0.06] whitespace-nowrap">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium">ระบบพร้อมทำงาน</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setResetKey((k) => k + 1)}
                                title="รีเซ็ตฟอร์มทั้งหมด"
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-200"
                            >
                                <RefreshCw className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => {
                                    const isExt = typeof chrome !== 'undefined' && chrome.runtime?.getURL;
                                    if (isExt) {
                                        const url = chrome.runtime.getURL('video-stock.html');
                                        chrome.tabs.create({ url });
                                    } else {
                                        window.open('/video-stock.html', '_blank');
                                    }
                                }}
                                title="คลังวิดีโอ (Video Stock)"
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-all duration-200"
                            >
                                <HardDrive className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setSettingsDialogOpen(true)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/[0.06] hover:rotate-90 transition-all duration-300"
                            >
                                <Settings className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Settings Dialog */}
                        <SettingsDialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen} />
                    </div>
                </div>
            </header>

            {/* Main Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full h-auto p-0 px-2 bg-white/[0.02] rounded-none border-b border-white/[0.06]">
                    <TabsTrigger
                        value="create"
                        className="flex-1 py-3 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-neon-red data-[state=active]:bg-neon-red/[0.06] data-[state=active]:text-neon-red data-[state=active]:shadow-none data-[state=active]:font-bold text-muted-foreground text-xs font-medium transition-all duration-300 hover:text-foreground hover:bg-white/[0.03]"
                    >
                        <Wand2 className="w-3 h-3 mr-1.5" />
                        สร้างวิดีโอ
                    </TabsTrigger>
                    <TabsTrigger
                        value="netcast"
                        className="flex-1 py-3 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-neon-red data-[state=active]:bg-neon-red/[0.06] data-[state=active]:text-neon-red data-[state=active]:shadow-none data-[state=active]:font-bold text-muted-foreground text-xs font-medium transition-all duration-300 hover:text-foreground hover:bg-white/[0.03]"
                    >
                        <Radio className="w-3 h-3 mr-1.5" />
                        NetCast Pro
                    </TabsTrigger>
                    <TabsTrigger
                        value="tiktok"
                        className="flex-1 py-3 px-2 rounded-none border-b-2 border-transparent data-[state=active]:border-neon-red data-[state=active]:bg-neon-red/[0.06] data-[state=active]:text-neon-red data-[state=active]:shadow-none data-[state=active]:font-bold text-muted-foreground text-xs font-medium transition-all duration-300 hover:text-foreground hover:bg-white/[0.03]"
                    >
                        <ShoppingBag className="w-3 h-3 mr-1.5" />
                        TikTok
                    </TabsTrigger>
                </TabsList>

                {/* Create Video Tab - forceMount to preserve form state */}
                <TabsContent 
                    value="create" 
                    forceMount
                    className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-left-2 duration-200"
                >
                    <ErrorBoundary>
                        <CreateVideoTab key={resetKey} />
                    </ErrorBoundary>
                </TabsContent>

                {/* NetCast Pro Tab - forceMount to preserve form state */}
                <TabsContent 
                    value="netcast" 
                    forceMount
                    className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-right-2 duration-200"
                >
                    <ErrorBoundary>
                        <NetCastTab />
                    </ErrorBoundary>
                </TabsContent>

                {/* TikTok Settings Tab */}
                <TabsContent 
                    value="tiktok" 
                    forceMount
                    className="mt-0 data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-right-2 duration-200"
                >
                    <ErrorBoundary>
                        <TikTokSettingsTab />
                    </ErrorBoundary>
                </TabsContent>

            </Tabs>
        </div>
    );
};

export default NetflowPanel;
