import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mergeVideos, getTotalDuration, formatDuration } from '@/services/videoMergeService';

interface VideoResultOverlayProps {
    videoUrl: string;
    videoUrls?: string[];  // Optional array for multi-scene
    sceneCount?: number;   // Actual number of scenes generated
    onClose: () => void;
}

const VideoResultOverlay: React.FC<VideoResultOverlayProps> = ({ videoUrl, videoUrls, sceneCount = 1, onClose }) => {
    // Use videoUrls array if provided, otherwise use single videoUrl
    const urls = videoUrls && videoUrls.length > 0 ? videoUrls : [videoUrl];
    const hasMultipleClips = urls.length > 1;

    const [mergedVideoUrl, setMergedVideoUrl] = useState<string | null>(null);
    const [isMerging, setIsMerging] = useState(false);
    const [mergeProgress, setMergeProgress] = useState("");
    const [mergeError, setMergeError] = useState<string | null>(null);
    const [actualDuration, setActualDuration] = useState<number | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);

    // Use actual video duration if available, otherwise estimate from sceneCount
    const estimatedDuration = sceneCount * 8; // 8s per scene
    const totalDuration = actualDuration || estimatedDuration;
    const durationText = formatDuration(Math.round(totalDuration));
    const displaySceneCount = sceneCount || urls.length;

    // Get actual duration from video element when loaded
    const handleLoadedMetadata = () => {
        if (videoRef.current && videoRef.current.duration && isFinite(videoRef.current.duration)) {
            const dur = videoRef.current.duration;
            console.log(`📹 Actual video duration: ${dur.toFixed(1)}s`);
            setActualDuration(dur);
        }
    };

    // Auto-merge when multiple clips are provided
    // Skip merge if only 1 URL (blob from scene builder = already combined by VideoFX)
    useEffect(() => {
        if (hasMultipleClips && !mergedVideoUrl && !isMerging && !mergeError) {
            // Filter out blob URLs from different origins (they can't be fetched for merge)
            const fetchableUrls = urls.filter(u => u.startsWith('http'));
            if (fetchableUrls.length > 1) {
                mergAllClips();
            } else {
                console.log('📹 Skipping FFmpeg merge: VideoFX already combined the video');
                // Use the first available URL directly
                setMergedVideoUrl(urls[0]);
            }
        }
    }, [hasMultipleClips, urls]);

    const mergAllClips = async () => {
        setIsMerging(true);
        setMergeProgress("เริ่มต้นรวมวิดีโอ...");
        setMergeError(null);

        try {
            // Only merge real HTTP URLs (blob URLs from scene builder are already combined)
            const fetchableUrls = urls.filter(u => u.startsWith('http'));
            if (fetchableUrls.length <= 1) {
                console.log('📹 Only 1 fetchable URL, using directly');
                setMergedVideoUrl(urls[0]);
                return;
            }

            console.log(`🎬 Starting merge of ${fetchableUrls.length} clips...`);
            const merged = await mergeVideos(fetchableUrls, (msg) => {
                setMergeProgress(msg);
            });
            setMergedVideoUrl(merged);
            console.log("✅ Merge complete!");
        } catch (error) {
            console.error("❌ Merge failed, falling back to first URL:", error);
            // Graceful fallback: play first available URL instead of showing error
            const fallbackUrl = urls.find(u => u.startsWith('http')) || urls[0];
            if (fallbackUrl) {
                setMergedVideoUrl(fallbackUrl);
                console.log('📹 Fallback: using', fallbackUrl.substring(0, 60));
            } else {
                setMergeError((error as Error).message);
            }
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
                            {displaySceneCount} ฉาก (รวม {durationText})
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
                                    รวม {displaySceneCount} ฉาก เป็น {durationText}
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
                            onLoadedMetadata={handleLoadedMetadata}
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
                        {displaySceneCount > 1 && (mergedVideoUrl || displayUrl) && (
                            <span className="text-green-400">✓ {displaySceneCount} ฉาก{actualDuration ? ` (${durationText})` : ''}</span>
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
