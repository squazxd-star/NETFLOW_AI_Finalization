// Netflow AI — Install Native Messaging Host for FFmpeg trim
// Run: node install.js
// Requires: FFmpeg in PATH, Chrome extension ID

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const HOST_NAME = "com.netflow.trimvideo";
const hostDir = __dirname;
const manifestPath = path.join(hostDir, HOST_NAME + ".json");
const batPath = path.join(hostDir, "run.bat");

// Check FFmpeg
try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    console.log("✅ FFmpeg found");
} catch {
    console.log("❌ FFmpeg not found! Install it first:");
    console.log("   https://ffmpeg.org/download.html");
    console.log("   Then add ffmpeg.exe to your PATH");
    process.exit(1);
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

    // Write native messaging manifest
    const manifest = {
        name: HOST_NAME,
        description: "Netflow AI video trimmer — trims last 1s of downloaded videos",
        path: batPath,
        type: "stdio",
        allowed_origins: ["chrome-extension://" + extId + "/"]
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log("✅ Manifest: " + manifestPath);

    // Register in Windows registry
    const regKey = "HKCU\\Software\\Google\\Chrome\\NativeMessagingHosts\\" + HOST_NAME;
    try {
        execSync(`reg add "${regKey}" /ve /t REG_SZ /d "${manifestPath}" /f`, { stdio: "inherit" });
        console.log("✅ Registry key added");
    } catch (e) {
        console.log("❌ Registry error: " + e.message);
        rl.close();
        process.exit(1);
    }

    console.log("\n🎉 Setup complete! Restart Chrome for changes to take effect.");
    console.log("   Test: node trim-video.js (should wait for stdin)\n");
    rl.close();
});
