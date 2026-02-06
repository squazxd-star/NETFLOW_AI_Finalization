import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mergeVideos, getTotalDuration, formatDuration } from '@/services/videoMergeService';

interface VideoResultOverlayProps {
    videoUrl: string;
    videoUrls?: string[];  // Optional array for multi-scene
    onClose: () => void;
}

const VideoResultOverlay: React.FC<VideoResultOverlayProps> = ({ videoUrl, videoUrls, onClose }) => {
    // Use videoUrls array if provided, otherwise use single videoUrl
    const urls = videoUrls && videoUrls.length > 0 ? videoUrls : [videoUrl];
    const hasMultipleClips = urls.length > 1;

    const [mergedVideoUrl, setMergedVideoUrl] = useState<string | null>(null);
    const [isMerging, setIsMerging] = useState(false);
    const [mergeProgress, setMergeProgress] = useState("");
    const [mergeError, setMergeError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);

    const totalDuration = getTotalDuration(urls.length);
    const durationText = formatDuration(totalDuration);

    // Auto-merge when multiple clips are provided
    useEffect(() => {
        if (hasMultipleClips && !mergedVideoUrl && !isMerging && !mergeError) {
            mergAllClips();
        }
    }, [hasMultipleClips, urls]);

    const mergAllClips = async () => {
        setIsMerging(true);
        setMergeProgress("เริ่มต้นรวมวิดีโอ...");
        setMergeError(null);

        try {
            console.log(`🎬 Starting merge of ${urls.length} clips...`);
            const merged = await mergeVideos(urls, (msg) => {
                setMergeProgress(msg);
            });
            setMergedVideoUrl(merged);
            console.log("✅ Merge complete!");
        } catch (error) {
            console.error("❌ Merge failed:", error);
            setMergeError((error as Error).message);
        } finally {
            setIsMerging(false);
        }
    };

    // Final video URL to display
    const displayUrl = hasMultipleClips ? mergedVideoUrl : videoUrl;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-gray-800 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#121212]">
                    <div className="flex items-center gap-3">
                        <Play className="w-5 h-5 text-red-500 fill-current" />
                        <h2 className="text-lg font-semibold text-white">NetFlow AI Video Result</h2>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
                            {urls.length} คลิป (รวม {durationText})
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Video Player or Loading State */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                    {isMerging ? (
                        // Merging in progress
                        <div className="flex flex-col items-center gap-4 text-white">
                            <Loader2 className="w-12 h-12 animate-spin text-red-500" />
                            <div className="text-center">
                                <p className="text-lg font-medium">กำลังรวมวิดีโอ...</p>
                                <p className="text-sm text-gray-400 mt-1">{mergeProgress}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    รวม {urls.length} คลิป เป็น {durationText}
                                </p>
                            </div>
                        </div>
                    ) : mergeError ? (
                        // Merge error
                        <div className="flex flex-col items-center gap-4 text-white p-4">
                            <div className="text-red-500 text-center">
                                <p className="text-lg font-medium">เกิดข้อผิดพลาด</p>
                                <p className="text-sm text-gray-400 mt-1">{mergeError}</p>
                            </div>
                            <Button
                                onClick={mergAllClips}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                ลองใหม่
                            </Button>
                        </div>
                    ) : displayUrl ? (
                        // Video ready
                        <video
                            ref={videoRef}
                            src={displayUrl}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    ) : (
                        // Waiting
                        <div className="text-gray-400">กำลังโหลด...</div>
                    )}
                </div>

                {/* Footer / Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800 bg-[#121212]">
                    <div className="text-sm text-gray-400">
                        {hasMultipleClips && mergedVideoUrl && (
                            <span className="text-green-400">✓ รวมแล้ว {urls.length} คลิป</span>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-gray-300 hover:text-white"
                        >
                            Close
                        </Button>
                        {displayUrl && (
                            <a
                                href={displayUrl}
                                download={`netflow-video-${durationText.replace(':', 'm')}s.mp4`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Button
                                    className="bg-red-600 hover:bg-red-700 text-white gap-2"
                                    disabled={isMerging}
                                >
                                    <Download className="w-4 h-4" />
                                    ดาวน์โหลดวิดีโอ ({durationText})
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoResultOverlay;
