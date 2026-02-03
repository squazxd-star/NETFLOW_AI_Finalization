import { Radio, Sparkles, Mic, FileText, BookOpen } from "lucide-react";
import { NetCastHeroBannerProps } from "./types";

const NetCastHeroBanner = ({ netcastMode, setValue }: NetCastHeroBannerProps) => {
    return (
        <section className="relative overflow-hidden rounded-3xl border border-neon-red/20 bg-gradient-to-b from-neon-red/10 to-background p-6">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>

            <div className="relative z-10 flex flex-col gap-6">
                {/* Title & Badge Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="absolute -inset-2 bg-neon-red/20 blur-lg rounded-full animate-pulse-glow"></div>
                            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-red to-neon-red-dark flex items-center justify-center shadow-lg shadow-neon-red/20">
                                <Radio className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white neon-text">
                                NetCast Pro
                            </h2>
                            <div className="h-1 w-12 bg-neon-red rounded-full mt-1"></div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        <span className="text-[10px] font-medium text-yellow-500">ใหม่</span>
                    </div>
                </div>

                {/* Sub-function Navigation */}
                <div className="flex items-center gap-2 p-1 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
                    {[
                        { mode: "podcast", icon: Mic, label: "พอดแคสต์" },
                        { mode: "storyboard", icon: FileText, label: "สตอรี่บอร์ด" },
                        { mode: "script", icon: BookOpen, label: "บทเรียน" }
                    ].map(({ mode, icon: Icon, label }) => (
                        <button
                            key={mode}
                            onClick={() => setValue("netcastMode", mode as any)}
                            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${netcastMode === mode
                                ? 'bg-neon-red text-white shadow-lg shadow-neon-red/30'
                                : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NetCastHeroBanner;
