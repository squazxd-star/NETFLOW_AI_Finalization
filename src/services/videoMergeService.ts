/**
 * Video Merge Service using FFmpeg-wasm
 * Concatenates multiple video clips into one continuous video
 */

import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;
let isLoading = false;

/**
 * Load FFmpeg with WASM files
 */
const loadFFmpeg = async (onProgress?: (msg: string) => void): Promise<FFmpeg> => {
    if (ffmpeg && ffmpeg.loaded) {
        return ffmpeg;
    }

    if (isLoading) {
        // Wait for existing load to complete
        while (isLoading) {
            await new Promise(r => setTimeout(r, 100));
        }
        return ffmpeg!;
    }

    isLoading = true;
    onProgress?.("กำลังโหลด FFmpeg...");

    try {
        ffmpeg = new FFmpeg();

        // Use CDN for WASM files
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';

        ffmpeg.on('log', ({ message }) => {
            console.log('[FFmpeg]', message);
        });

        ffmpeg.on('progress', ({ progress }) => {
            const percent = Math.round(progress * 100);
            onProgress?.(`กำลังรวมวิดีโอ... ${percent}%`);
        });

        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });

        console.log('✅ FFmpeg loaded successfully');
        onProgress?.("FFmpeg พร้อมใช้งาน");
        return ffmpeg;

    } catch (error) {
        console.error('❌ FFmpeg load error:', error);
        throw error;
    } finally {
        isLoading = false;
    }
};

/**
 * Download video from URL (blob: or https:)
 */
const downloadVideo = async (url: string): Promise<Uint8Array> => {
    console.log(`📥 Downloading video: ${url.substring(0, 60)}...`);
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return new Uint8Array(arrayBuffer);
};

/**
 * Merge multiple video URLs into one continuous video
 * @param videoUrls Array of video URLs (blob: or https:)
 * @param onProgress Optional progress callback
 * @returns Blob URL of merged video
 */
export const mergeVideos = async (
    videoUrls: string[],
    onProgress?: (msg: string) => void
): Promise<string> => {
    console.log(`🎬 Starting video merge: ${videoUrls.length} clips`);

    if (videoUrls.length === 0) {
        throw new Error("No videos to merge");
    }

    if (videoUrls.length === 1) {
        console.log("📹 Only 1 video, no merge needed");
        return videoUrls[0];
    }

    try {
        // Load FFmpeg
        const ff = await loadFFmpeg(onProgress);

        // Download and write each video to FFmpeg filesystem
        onProgress?.("กำลังดาวน์โหลดวิดีโอ...");
        const inputFiles: string[] = [];

        for (let i = 0; i < videoUrls.length; i++) {
            const filename = `input${i}.mp4`;
            inputFiles.push(filename);

            onProgress?.(`ดาวน์โหลดคลิป ${i + 1}/${videoUrls.length}...`);
            console.log(`📥 Downloading clip ${i + 1}...`);

            const videoData = await downloadVideo(videoUrls[i]);
            await ff.writeFile(filename, videoData);
            console.log(`✅ Wrote ${filename} (${videoData.length} bytes)`);
        }

        // Create concat file list
        const concatList = inputFiles.map(f => `file '${f}'`).join('\n');
        await ff.writeFile('list.txt', concatList);
        console.log('📝 Created concat list:', concatList);

        // Run FFmpeg concat
        onProgress?.("กำลังรวมวิดีโอ...");
        console.log('🎬 Running FFmpeg concat...');

        await ff.exec([
            '-f', 'concat',
            '-safe', '0',
            '-i', 'list.txt',
            '-c', 'copy',  // Copy streams without re-encoding (fast!)
            'output.mp4'
        ]);

        console.log('✅ FFmpeg concat complete');

        // Read output file
        onProgress?.("กำลังสร้างไฟล์...");
        const outputData = await ff.readFile('output.mp4');
        const outputBlob = new Blob([outputData], { type: 'video/mp4' });
        const outputUrl = URL.createObjectURL(outputBlob);

        console.log(`✅ Merged video ready: ${outputUrl.substring(0, 50)}... (${outputBlob.size} bytes)`);
        onProgress?.("เสร็จสิ้น!");

        // Cleanup
        for (const file of [...inputFiles, 'list.txt', 'output.mp4']) {
            try {
                await ff.deleteFile(file);
            } catch (e) { }
        }

        return outputUrl;

    } catch (error) {
        console.error('❌ Video merge error:', error);
        onProgress?.("เกิดข้อผิดพลาด: " + (error as Error).message);
        throw error;
    }
};

/**
 * Get total duration from multiple clips (assumes 8s each)
 */
export const getTotalDuration = (clipCount: number): number => {
    return clipCount * 8; // 8 seconds per clip
};

/**
 * Format duration to display string
 */
export const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};
