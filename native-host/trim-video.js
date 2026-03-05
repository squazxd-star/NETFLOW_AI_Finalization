#!/usr/bin/env node
// Netflow AI — Native Messaging Host for FFmpeg video trimming
// Reads a file path via native messaging, trims last 1 second, returns trimmed path

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// ── Native messaging I/O ──
function readMessage() {
    const header = Buffer.alloc(4);
    let offset = 0;
    while (offset < 4) {
        const n = fs.readSync(0, header, offset, 4 - offset);
        if (n <= 0) throw new Error("stdin closed");
        offset += n;
    }
    const length = header.readUInt32LE(0);
    if (length === 0 || length > 1024 * 1024) throw new Error("Bad message length: " + length);
    const body = Buffer.alloc(length);
    offset = 0;
    while (offset < length) {
        const n = fs.readSync(0, body, offset, length - offset);
        if (n <= 0) throw new Error("stdin closed");
        offset += n;
    }
    return JSON.parse(body.toString("utf8"));
}

function writeMessage(msg) {
    const json = JSON.stringify(msg);
    const header = Buffer.alloc(4);
    header.writeUInt32LE(Buffer.byteLength(json, "utf8"), 0);
    process.stdout.write(header);
    process.stdout.write(json, "utf8");
}

// ── Main ──
try {
    const msg = readMessage();
    const inputPath = msg.filePath;
    const trimSeconds = msg.trimSeconds || 1;

    if (!inputPath || !fs.existsSync(inputPath)) {
        writeMessage({ success: false, error: "File not found: " + inputPath });
        process.exit(0);
    }

    const ext = path.extname(inputPath);
    const base = path.basename(inputPath, ext);
    const dir = path.dirname(inputPath);
    const outputPath = path.join(dir, base + "_trimmed" + ext);

    // Get video duration via ffprobe
    const durationStr = execSync(
        `ffprobe -v error -show_entries format=duration -of csv=p=0 "${inputPath}"`,
        { encoding: "utf8", timeout: 15000 }
    ).trim();
    const duration = parseFloat(durationStr);

    if (isNaN(duration) || duration <= trimSeconds) {
        writeMessage({ success: false, error: "Video too short to trim: " + duration + "s" });
        process.exit(0);
    }

    const trimDuration = (duration - trimSeconds).toFixed(3);

    // Trim with FFmpeg (stream copy = instant, no re-encoding)
    execSync(
        `ffmpeg -y -i "${inputPath}" -t ${trimDuration} -c copy "${outputPath}"`,
        { encoding: "utf8", timeout: 30000 }
    );

    if (!fs.existsSync(outputPath)) {
        writeMessage({ success: false, error: "FFmpeg finished but output file not found" });
        process.exit(0);
    }

    writeMessage({
        success: true,
        trimmedPath: outputPath,
        originalDuration: duration,
        trimmedDuration: parseFloat(trimDuration),
        trimmedSeconds: trimSeconds
    });
} catch (e) {
    writeMessage({ success: false, error: e.message || String(e) });
}
process.exit(0);
