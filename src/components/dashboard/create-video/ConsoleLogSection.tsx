import { useEffect, useRef, useState } from "react";
import { Terminal, Activity, Shield } from "lucide-react";
import { ConsoleLogSectionProps } from "./types";

const ConsoleLogSection = ({ logs }: ConsoleLogSectionProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
                        "linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                }}
            />

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-xl nf-scanlines" />

            {/* Outer Glow Frame (hover) */}
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-red-600/0 via-red-600/15 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-2 px-3.5 py-2 border-b border-red-500/15">
                {/* Pulsing dot */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-40" />
                    <span className="relative rounded-full h-2.5 w-2.5 bg-red-600" style={{ boxShadow: "0 0 8px rgba(220,38,38,0.7)" }} />
                </span>

                <Terminal className="w-3.5 h-3.5 text-red-500 shrink-0" style={{ filter: "drop-shadow(0 0 4px rgba(220,38,38,0.5))" }} />
                <span className="text-red-500 font-bold tracking-[0.15em] text-[11px] uppercase" style={{ textShadow: "0 0 8px rgba(220,38,38,0.4)" }}>
                    Netflow Console
                </span>

                <span className="ml-auto flex items-center gap-2">
                    <span className="text-red-500/30 text-[9px] font-mono tracking-wider hidden group-hover:inline">EN-PROC_v2.0</span>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[9px] text-red-500/40 hover:text-red-500 transition-colors font-mono"
                    >
                        {expanded ? "▾ Collapse" : "▸ Expand"}
                    </button>
                    <span className="text-red-500/30 text-[9px] font-mono">{logs.length}</span>
                </span>
            </div>

            {/* Logs Area */}
            <div className={`relative z-10 px-3 py-2 space-y-[3px] overflow-y-auto font-mono text-[10px] leading-relaxed nf-console-scroll ${expanded ? "h-64" : "h-36"} transition-all duration-300`}>
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
                            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-red-500/40 via-red-500/20 to-transparent nf-underline-sweep" />
                        )}
                    </div>
                ))}

                {/* Blinking cursor */}
                <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-red-500/25 text-[10px] italic">Waiting for next node...</span>
                    <span className="nf-cursor" />
                </div>
                <div ref={bottomRef} />
            </div>

            {/* Footer Status Bar */}
            <div className="relative z-10 flex items-center justify-between px-3.5 py-1.5 border-t border-red-500/10 text-[8px] text-red-500/30 uppercase tracking-[0.2em] font-mono">
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
