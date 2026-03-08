import { useState, useEffect } from "react";
import { TikTokPostProgress } from "@/hooks/useVideoGeneration";
import { getPostHistory, TikTokPostHistoryItem } from "@/services/tiktokUploadService";
import { ShoppingCart, Clock, Hash, MessageSquare, CheckCircle2, XCircle, Loader2, History, ChevronDown, ChevronUp } from "lucide-react";

interface Props {
    status: TikTokPostProgress;
}

const TikTokStatusCard = ({ status }: Props) => {
    const [history, setHistory] = useState<TikTokPostHistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        getPostHistory().then(setHistory);
    }, [status.status]);

    if (status.status === 'idle' && history.length === 0) return null;

    const isActive = status.status !== 'idle';
    const pct = status.total > 0 ? Math.round((status.step / status.total) * 100) : 0;

    const borderColor =
        status.status === 'done' ? 'border-green-500/50' :
        status.status === 'error' ? 'border-red-500/50' :
        status.status === 'idle' ? 'border-border' :
        'border-orange-500/50';

    const headerBg =
        status.status === 'done' ? 'bg-green-500/10' :
        status.status === 'error' ? 'bg-red-500/10' :
        status.status === 'idle' ? 'bg-muted/30' :
        'bg-orange-500/10';

    const headerText =
        status.status === 'done' ? 'text-green-500' :
        status.status === 'error' ? 'text-red-500' :
        status.status === 'idle' ? 'text-muted-foreground' :
        'text-orange-500';

    const headerIcon =
        status.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> :
        status.status === 'error' ? <XCircle className="w-4 h-4" /> :
        status.status === 'idle' ? <History className="w-4 h-4" /> :
        <Loader2 className="w-4 h-4 animate-spin" />;

    const headerLabel =
        status.status === 'done' ? 'TikTok Auto-Post สำเร็จ!' :
        status.status === 'error' ? 'TikTok Auto-Post ล้มเหลว' :
        status.status === 'idle' ? 'TikTok Post History' :
        'กำลังโพสต์ TikTok...';

    const successCount = history.filter(h => h.status === 'success').length;
    const failCount = history.filter(h => h.status === 'failed').length;

    return (
        <section className={`glass-card overflow-hidden border ${borderColor} mt-3`}>
            {/* Header */}
            <div className={`flex items-center gap-2 px-4 py-2 border-b border-border ${headerBg}`}>
                {headerIcon}
                <span className={`text-xs font-bold ${headerText}`}>{headerLabel}</span>
                {isActive && <span className={`ml-auto text-[10px] font-mono ${headerText}`}>{status.step}/{status.total}</span>}
                {!isActive && history.length > 0 && (
                    <span className="ml-auto text-[10px] text-muted-foreground">{history.length} โพสต์</span>
                )}
            </div>

            <div className="p-3 space-y-3">
                {/* Progress Bar — only when actively posting */}
                {isActive && (
                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-muted-foreground">ความคืบหน้า</span>
                            <span className="text-[10px] font-bold text-foreground">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${
                                    status.status === 'done' ? 'bg-green-500' :
                                    status.status === 'error' ? 'bg-red-500' :
                                    'bg-orange-500'
                                }`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Step List */}
                {isActive && status.steps.length > 0 && (
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {status.steps.map((s, i) => {
                            if (!s.label) return null;
                            const icon =
                                s.status === 'done' ? '✓' :
                                s.status === 'active' ? '●' :
                                s.status === 'error' ? '✕' : '→';
                            const color =
                                s.status === 'done' ? 'text-green-500' :
                                s.status === 'active' ? 'text-orange-400' :
                                s.status === 'error' ? 'text-red-500' :
                                'text-muted-foreground';
                            return (
                                <div key={i} className={`flex items-center gap-2 text-[11px] ${color}`}>
                                    <span className="w-4 text-center font-mono">{icon}</span>
                                    <span className={s.status === 'active' ? 'font-semibold' : ''}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Caption Preview */}
                {isActive && status.caption && (
                    <div className="border-t border-border pt-2 space-y-2">
                        <div className="flex items-center gap-1.5">
                            <MessageSquare className="w-3 h-3 text-blue-400" />
                            <span className="text-[10px] font-bold text-blue-400">AI Caption</span>
                        </div>
                        <div className="p-2 bg-blue-500/5 border border-blue-500/20 rounded text-[11px] text-foreground">
                            {status.caption}
                        </div>
                    </div>
                )}

                {/* Hashtags Preview */}
                {isActive && status.hashtags.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <Hash className="w-3 h-3 text-purple-400" />
                        {status.hashtags.map((tag, i) => (
                            <span key={i} className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded">
                                #{tag.replace(/^#/, '')}
                            </span>
                        ))}
                    </div>
                )}

                {/* Product + Schedule */}
                {isActive && (
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        {status.productName && (
                            <div className="flex items-center gap-1">
                                <ShoppingCart className="w-3 h-3 text-orange-400" />
                                <span>{status.productName}</span>
                            </div>
                        )}
                        {status.scheduleTime && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-cyan-400" />
                                <span>{new Date(status.scheduleTime).toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Post History */}
                {history.length > 0 && (
                    <div className="border-t border-border pt-2">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="flex items-center gap-1.5 w-full text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <History className="w-3 h-3" />
                            <span className="font-semibold">ประวัติโพสต์</span>
                            <span className="text-green-500">{successCount} สำเร็จ</span>
                            {failCount > 0 && <span className="text-red-500">{failCount} ล้มเหลว</span>}
                            <span className="ml-auto">
                                {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </span>
                        </button>

                        {showHistory && (
                            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                                {history.slice(0, 10).map((h) => (
                                    <div key={h.id} className="flex items-start gap-2 text-[10px] p-1.5 rounded bg-muted/30">
                                        <span className={h.status === 'success' ? 'text-green-500' : 'text-red-500'}>
                                            {h.status === 'success' ? '✓' : '✕'}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-1">
                                                <span className="font-semibold truncate">{h.productName}</span>
                                                <span className="text-muted-foreground ml-auto whitespace-nowrap">
                                                    {new Date(h.timestamp).toLocaleString('th-TH', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>
                                            {h.caption && <div className="text-muted-foreground truncate">{h.caption}</div>}
                                            {h.error && <div className="text-red-400 truncate">{h.error}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TikTokStatusCard;
