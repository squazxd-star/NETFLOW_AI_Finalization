import { useEffect, useRef, useState } from "react";
import { Terminal, Activity, Shield } from "lucide-react";
import { ConsoleLogSectionProps } from "./types";
import { useTheme } from "@/contexts/ThemeContext";

const ConsoleLogSection = ({ logs, tabs, selectedTab, onTabSelect }: ConsoleLogSectionProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const userScrolledUp = useRef(false);
    const [expanded, setExpanded] = useState(false);
    const { config: themeConfig } = useTheme();

    const handleScroll = () => {
        const el = scrollContainerRef.current;
        if (!el) return;
        // If user is within 60px of bottom, consider them "at bottom"
        const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
        userScrolledUp.current = !atBottom;
    };

    useEffect(() => {
        if (!userScrolledUp.current && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const getColor = (log: string) => {
        if (log.includes("✅") || log.includes("สำเร็จ") || log.includes("complete")) return "nf-log-success";
        if (log.includes("⚠️") || log.includes("Timeout") || log.includes("Could not")) return "nf-log-warn";
        if (log.includes("❌") || log.includes("error") || log.includes("Error")) return "nf-log-error";
        if (log.includes("🖱️")) return "nf-log-click";
        if (log.includes("%") || log.includes("progress") || log.includes("Click")) return "nf-log-info";
        return "nf-log-default";
    };

    const getIcon = (log: string) => {
        if (log.includes("✅") || log.includes("สำเร็จ") || log.includes("complete")) return "▸";
        if (log.includes("⚠️")) return "▹";
        if (log.includes("❌")) return "✕";
        if (log.includes("🖱️")) return "◆";
        if (log.includes("%")) return "◈";
        return "›";
    };

    return (
        <section className="nf-console-wrap group">
            {/* Red Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-xl"
                style={{
                    backgroundImage:
                        `linear-gradient(rgba(${themeConfig.hexRgb},0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(${themeConfig.hexRgb},0.5) 1px, transparent 1px)`,
                    backgroundSize: "16px 16px",
                }}
            />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-xl nf-scanlines" />

            {/* Outer Glow Frame (hover) */}
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-neon-red/0 via-neon-red/15 to-neon-red/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-2 px-3.5 py-2 border-b border-neon-red/15">
                {/* Pulsing dot */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-neon-red animate-ping opacity-40" />
                    <span className="relative rounded-full h-2.5 w-2.5 bg-neon-red" style={{ boxShadow: `0 0 8px rgba(${themeConfig.hexRgb},0.7)` }} />
                </span>

                <Terminal className="w-3.5 h-3.5 text-neon-red shrink-0" style={{ filter: `drop-shadow(0 0 4px rgba(${themeConfig.hexRgb},0.5))` }} />
                <span className="text-neon-red font-bold tracking-[0.15em] text-[11px] uppercase" style={{ textShadow: `0 0 8px rgba(${themeConfig.hexRgb},0.4)` }}>
                    Netflow Console
                </span>

                <span className="ml-auto flex items-center gap-2">
                    <span className="text-neon-red/30 text-[9px] font-mono tracking-wider hidden group-hover:inline">EN-PROC_v2.0</span>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[9px] text-neon-red/40 hover:text-neon-red transition-colors font-mono"
                    >
                        {expanded ? "▾ Collapse" : "▸ Expand"}
                    </button>
                    <span className="text-neon-red/30 text-[9px] font-mono">{logs.length}</span>
                </span>
            </div>

            {/* Tab Switcher (multi-tab) */}
            {tabs && tabs.length > 0 && onTabSelect && (
                <div className="relative z-10 flex items-center gap-1 px-3 py-1.5 border-b border-neon-red/10 overflow-x-auto">
                    <button
                        onClick={() => onTabSelect('all')}
                        className={`shrink-0 px-2 py-0.5 rounded text-[9px] font-mono transition-all ${
                            selectedTab === 'all'
                                ? 'bg-neon-red/20 text-neon-red border border-neon-red/40'
                                : 'text-neon-red/40 hover:text-neon-red/70 border border-transparent hover:border-neon-red/20'
                        }`}
                    >
                        All
                    </button>
                    {tabs.map(t => (
                        <button
                            key={t.tabId}
                            onClick={() => onTabSelect(t.tabId)}
                            className={`shrink-0 flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono transition-all ${
                                selectedTab === t.tabId
                                    ? 'bg-neon-red/20 text-neon-red border border-neon-red/40'
                                    : 'text-neon-red/40 hover:text-neon-red/70 border border-transparent hover:border-neon-red/20'
                            }`}
                        >
                            {t.running && (
                                <span className="relative flex h-1.5 w-1.5 shrink-0">
                                    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
                                    <span className="relative rounded-full h-1.5 w-1.5 bg-green-400" />
                                </span>
                            )}
                            Tab {t.tabId}
                        </button>
                    ))}
                </div>
            )}

            {/* Logs Area */}
            <div ref={scrollContainerRef} onScroll={handleScroll} className={`relative z-10 px-3 py-2 space-y-[3px] overflow-y-auto font-mono text-[10px] leading-relaxed nf-console-scroll ${expanded ? "h-64" : "h-36"} transition-all duration-300`}>
                {logs.map((log, index) => (
                    <div
                        key={index}
                        className={`nf-log-row ${getColor(log)}`}
                        style={{
                            animation: index === logs.length - 1 ? "nf-log-slide 0.3s ease-out" : undefined,
                        }}
                    >
                        <span className="nf-log-icon">{getIcon(log)}</span>
                        <span className="nf-log-text">{log}</span>
                        {/* Underline glow for latest entry */}
                        {index === logs.length - 1 && (
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-neon-red/40 via-neon-red/20 to-transparent nf-underline-sweep" />
                        )}
                    </div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-neon-red/25 text-[10px] italic">Waiting for next node...</span>
                    <span className="nf-cursor" />
                </div>
                <div ref={bottomRef} />
            </div>

            {/* Footer Status Bar */}
            <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 border-t border-neon-red/10 text-[8px] text-neon-red/30 uppercase tracking-[0.2em] font-mono">
                <span className="flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5" />
                    Buffer: 1024kb
                </span>
                <span className="flex items-center gap-1 nf-live-pulse">
                    <Shield className="w-2.5 h-2.5" />
                    Live Data: Secure
                </span>
            </div>
        </section>
    );
};

export default ConsoleLogSection;
