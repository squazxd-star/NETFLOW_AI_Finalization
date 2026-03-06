// ─── Mock Chrome Extension APIs ─────────────────────────────────────────────
(window as any).chrome = {
    runtime: {
        sendMessage: () => {},
        lastError: null,
    },
    storage: {
        local: {
            get: (_keys: any, cb: any) => cb?.({}),
            set: () => {},
        },
    },
};

// ─── Import overlay and trigger show ────────────────────────────────────────
import { showOverlay, setOverlayTheme, configureScenes, addLog, updateStep } from "./netflow-overlay";

// Pick theme from URL param: ?theme=red|blue|green|yellow|purple
const urlTheme = new URLSearchParams(location.search).get("theme") || "red";
setOverlayTheme(urlTheme);

// Configure with 2 demo scenes
configureScenes(2);

showOverlay();

// Demo: animate steps after a short delay
setTimeout(() => {
    addLog("🚀 Overlay preview started — theme: " + urlTheme);
    updateStep("settings", "active");
}, 400);
setTimeout(() => {
    updateStep("settings", "done");
    updateStep("upload", "active");
    addLog("✅ Settings configured");
}, 1600);
setTimeout(() => {
    updateStep("upload", "done");
    updateStep("prompt", "active");
    addLog("✅ Images uploaded (2 refs)");
}, 3000);
setTimeout(() => {
    updateStep("prompt", "done");
    updateStep("generate", "active");
    addLog("✅ Prompt injected");
    addLog("⏳ Waiting for Scene 1 generation...");
}, 4500);
setTimeout(() => {
    updateStep("generate", "done");
    updateStep("scene2", "active");
    addLog("✅ Scene 1 generated");
    addLog("⏳ Generating Scene 2...");
}, 7000);

// Theme switcher UI (bottom-right corner)
const switcher = document.createElement("div");
switcher.style.cssText = `
    position: fixed; bottom: 16px; right: 16px; z-index: 99999999;
    display: flex; gap: 8px; align-items: center;
`;
const themes = ["red", "blue", "green", "yellow", "purple"];
const colors: Record<string, string> = {
    red: "#ef4444", blue: "#3b82f6", green: "#00ff41",
    yellow: "#eab308", purple: "#8b5cf6"
};
themes.forEach(t => {
    const btn = document.createElement("button");
    btn.textContent = t;
    btn.style.cssText = `
        background: ${colors[t]}22; border: 1.5px solid ${colors[t]};
        color: ${colors[t]}; padding: 4px 10px; border-radius: 6px;
        cursor: pointer; font-size: 11px; font-family: monospace; font-weight: 700;
        ${t === urlTheme ? "opacity:1; box-shadow: 0 0 8px " + colors[t] : "opacity:0.5"};
    `;
    btn.onclick = () => location.search = "?theme=" + t;
    switcher.appendChild(btn);
});
document.body.appendChild(switcher);
