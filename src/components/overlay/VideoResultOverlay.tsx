import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoResultOverlayProps {
    videoUrl: string;
    videoUrls?: string[];  // Optional array for multi-scene
    onClose: () => void;
}

const VideoResultOverlay: React.FC<VideoResultOverlayProps> = ({ videoUrl, videoUrls, onClose }) => {
    // Use videoUrls array if provided, otherwise use single videoUrl
    const urls = videoUrls && videoUrls.length > 0 ? videoUrls : [videoUrl];
    const hasMultipleClips = urls.length > 1;

    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const currentUrl = urls[currentIndex] || videoUrl;

    // Auto-play next clip when current ends
    const handleVideoEnd = () => {
        if (currentIndex < urls.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Loop back to first clip
            setCurrentIndex(0);
        }
    };

    // Navigate to specific clip
    const goToClip = (index: number) => {
        if (index >= 0 && index < urls.length) {
            setCurrentIndex(index);
        }
    };

    // Reset and play when index changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => { });
        }
    }, [currentIndex]);

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-gray-800 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#121212]">
                    <div className="flex items-center gap-3">
                        <Play className="w-5 h-5 text-red-500 fill-current" />
                        <h2 className="text-lg font-semibold text-white">NetFlow AI Video Result</h2>
                        {hasMultipleClips && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded-full">
                                {urls.length} คลิป (รวม {urls.length * 8} วินาที)
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Video Player */}
                <div className="relative aspect-video bg-black flex items-center justify-center group">
                    <video
                        ref={videoRef}
                        src={currentUrl}
                        controls
                        autoPlay
                        onEnded={handleVideoEnd}
                        className="w-full h-full object-contain"
                    />

                    {/* Clip Navigation Overlay (for multi-clip) */}
                    {hasMultipleClips && (
                        <>
                            {/* Previous button */}
                            {currentIndex > 0 && (
                                <button
                                    onClick={() => goToClip(currentIndex - 1)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white" />
                                </button>
                            )}

                            {/* Next button */}
                            {currentIndex < urls.length - 1 && (
                                <button
                                    onClick={() => goToClip(currentIndex + 1)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </button>
                            )}

                            {/* Clip indicator dots */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 bg-black/60 rounded-full">
                                {urls.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToClip(i)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex
                                                ? 'bg-red-500 scale-125'
                                                : 'bg-white/50 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Clip Selector (for multi-clip) */}
                {hasMultipleClips && (
                    <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-800 bg-[#0d0d0d] overflow-x-auto">
                        {urls.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToClip(i)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${i === currentIndex
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }`}
                            >
                                ฉาก {i + 1}
                            </button>
                        ))}
                        <span className="ml-auto text-sm text-gray-500">
                            กำลังเล่น: {currentIndex + 1}/{urls.length}
                        </span>
                    </div>
                )}

                {/* Footer / Actions */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-[#121212]">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-gray-300 hover:text-white"
                    >
                        Close
                    </Button>
                    <a
                        href={currentUrl}
                        download={`netflow-scene-${currentIndex + 1}.mp4`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
                            <Download className="w-4 h-4" />
                            ดาวน์โหลดฉาก {currentIndex + 1}
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VideoResultOverlay;
