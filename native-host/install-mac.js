// Netflow AI — Install Native Messaging Host for FFmpeg trim (macOS)
// Run: node install-mac.js
// Requires: FFmpeg in PATH, Chrome extension ID

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const os = require("os");

const HOST_NAME = "com.netflow.trimvideo";
const hostDir = __dirname;
const shPath = path.join(hostDir, "run.sh");

// macOS native messaging host manifest location
const chromeNMHDir = path.join(os.homedir(), "Library", "Application Support", "Google", "Chrome", "NativeMessagingHosts");
const manifestPath = path.join(chromeNMHDir, HOST_NAME + ".json");

// Check platform
if (process.platform !== "darwin") {
    console.log("❌ This installer is for macOS only. Use install.js for Windows.");
    process.exit(1);
}

// Check FFmpeg
try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    console.log("✅ FFmpeg found");
} catch {
    console.log("❌ FFmpeg not found! Install it first:");
    console.log("   brew install ffmpeg");
    console.log("   Or download from: https://ffmpeg.org/download.html");
    process.exit(1);
}

// Check Node.js
try {
    execSync("node --version", { stdio: "ignore" });
    console.log("✅ Node.js found");
} catch {
    console.log("❌ Node.js not found in PATH");
    process.exit(1);
}

// Ensure run.sh is executable
try {
    execSync(`chmod +x "${shPath}"`, { stdio: "ignore" });
    console.log("✅ run.sh marked executable");
} catch (e) {
    console.log("⚠️ Could not chmod run.sh: " + e.message);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

console.log("\n📋 Go to chrome://extensions and copy your Netflow AI extension ID\n");
rl.question("Extension ID: ", (extId) => {
    extId = extId.trim();
    if (!extId || extId.length < 10) {
        console.log("❌ Invalid extension ID");
        rl.close();
        process.exit(1);
    }

    // Ensure NativeMessagingHosts directory exists
    try {
        fs.mkdirSync(chromeNMHDir, { recursive: true });
        console.log("✅ NativeMessagingHosts directory ready: " + chromeNMHDir);
    } catch (e) {
        console.log("❌ Could not create directory: " + e.message);
        rl.close();
        process.exit(1);
    }

    // Write native messaging manifest (macOS uses path to shell script, not .bat)
    const manifest = {
        name: HOST_NAME,
        description: "Netflow AI video trimmer — trims last 1s of downloaded videos",
        path: shPath,
        type: "stdio",
        allowed_origins: ["chrome-extension://" + extId + "/"]
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("✅ Manifest written: " + manifestPath);

    console.log("\n🎉 Setup complete! Restart Chrome for changes to take effect.");
    console.log("   Test: node trim-video.js (should wait for stdin)\n");
    rl.close();
});
