/**
 * NETFLOW AI — Engine Visualizer Overlay v3
 * 
 * Injected into the Google Flow page during automation.
 * Pure DOM + CSS — no React, no Tailwind.
 * 
 * Cross-pattern layout matching NETFLOW AI ENGINE design:
 *   - Central CORE STATUS monitor (terminal log + audio visualizer)
 *   - 4 modules in cross pattern (TL, TR, BL, BR) with glowing pipe connections
 *   - Dark cyberpunk theme with red/crimson glow
 * 
 * 4 Tech Modules:
 *   1. ASSET_INGEST         — Configure + Upload images
 *   2. AI_IMAGE_SYNTHESIS   — Prompt + Generate image + Wait
 *   3. VIDEO_PRODUCTION     — Animate → Video prompt → Generate video
 *   4. FINAL_RENDER_OUTPUT  — Download + Upscale + Open
 */

// ── Types ──────────────────────────────────────────────────────────────────

type StepStatus = "waiting" | "active" | "done" | "error" | "skipped";

interface SubStep {
    id: string;
    label: string;
    status: StepStatus;
    progress?: number; // 0–100
}

interface Module {
    id: string;
    title: string;
    steps: SubStep[];
}

// ── State ──────────────────────────────────────────────────────────────────

let overlayRoot: HTMLDivElement | null = null;
let toggleBtn: HTMLButtonElement | null = null;
let styleEl: HTMLStyleElement | null = null;
let startTime = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let terminalInterval: ReturnType<typeof setInterval> | null = null;
let visualizerInterval: ReturnType<typeof setInterval> | null = null;
let activeStepCount = 0;
let overlayHidden = false;

const modules: Module[] = [
    {
        id: "ingest",
        title: "ASSET_INGEST",
        steps: [
            { id: "settings", label: "ตั้งค่า Flow", status: "waiting" },
            { id: "upload-char", label: "อัพโหลดตัวละคร", status: "waiting" },
            { id: "upload-prod", label: "อัพโหลดสินค้า", status: "waiting" },
        ],
    },
    {
        id: "image",
        title: "AI_IMAGE_SYNTHESIS",
        steps: [
            { id: "img-prompt", label: "ใส่ Prompt", status: "waiting" },
            { id: "img-generate", label: "สร้างภาพ", status: "waiting" },
            { id: "img-wait", label: "รอผลภาพ", status: "waiting", progress: 0 },
        ],
    },
    {
        id: "video",
        title: "VIDEO_PRODUCTION",
        steps: [
            { id: "animate", label: "สลับเป็นโหมดวิดีโอ", status: "waiting" },
            { id: "vid-prompt", label: "ใส่ Video Prompt", status: "waiting" },
            { id: "vid-generate", label: "สร้างวิดีโอ", status: "waiting" },
            { id: "vid-wait", label: "รอผลวิดีโอ", status: "waiting", progress: 0 },
        ],
    },
    {
        id: "render",
        title: "FINAL_RENDER_OUTPUT",
        steps: [
            { id: "download", label: "ดาวน์โหลด 1080p", status: "waiting" },
            { id: "upscale", label: "Upscaling", status: "waiting", progress: 0 },
            { id: "open", label: "เปิดไฟล์วิดีโอ", status: "waiting" },
        ],
    },
];

// ── CSS Injection ──────────────────────────────────────────────────────────

function injectStyles() {
    if (styleEl) return;
    styleEl = document.createElement("style");
    styleEl.id = "netflow-overlay-styles";
    styleEl.textContent = `
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: radial-gradient(ellipse at center, rgba(15,10,20,0.95) 0%, rgba(5,3,10,0.98) 70%);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: nf-fade-in 0.6s ease-out;
    overflow: hidden;
}

@keyframes nf-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ─── Background grid pattern ─── */
#netflow-engine-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(220,38,38,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(220,38,38,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
}

/* ─── Main Layout: Cross Pattern ─── */
.nf-layout {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ─── SVG Pipes Layer ─── */
.nf-pipes-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

/* ─── Central Core Monitor ─── */
.nf-core-monitor {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    min-height: 250px;
    background: rgba(12, 10, 18, 0.92);
    border: 1.5px solid rgba(220, 38, 38, 0.5);
    border-radius: 14px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 50px rgba(220, 38, 38, 0.2),
        0 0 100px rgba(220, 38, 38, 0.1),
        inset 0 1px 0 rgba(255,255,255,0.05),
        inset 0 0 30px rgba(220, 38, 38, 0.04);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 50px rgba(220, 38, 38, 0.2),
            0 0 100px rgba(220, 38, 38, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 0 30px rgba(220, 38, 38, 0.04);
    }
    50% {
        box-shadow:
            0 0 70px rgba(220, 38, 38, 0.3),
            0 0 140px rgba(220, 38, 38, 0.15),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 0 40px rgba(220, 38, 38, 0.06);
    }
}

/* Core header */
.nf-core-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px 10px;
    border-bottom: 1px solid rgba(220, 38, 38, 0.25);
    background: linear-gradient(180deg, rgba(220,38,38,0.06) 0%, transparent 100%);
}

.nf-core-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12.5px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1.5px;
}

.nf-core-title-label {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
}

.nf-core-title-val {
    color: #4ade80;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(74,222,128,0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.7);
    animation: nf-blink 1.5s ease-in-out infinite;
}

@keyframes nf-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.nf-core-counter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: rgba(220, 38, 38, 0.15);
    border: 1px solid rgba(220, 38, 38, 0.35);
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
}

/* Terminal log */
.nf-terminal {
    padding: 12px 18px;
    min-height: 85px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    line-height: 1.9;
    color: rgba(255, 255, 255, 0.7);
}

.nf-term-line {
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.3s, opacity 0.3s;
}

.nf-term-line.nf-term-active { color: #fff; }
.nf-term-line.nf-term-done { color: rgba(34, 197, 94, 0.7); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.25); }

.nf-term-prefix {
    color: rgba(220, 38, 38, 0.7);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: #dc2626; }

.nf-term-status {
    margin-left: auto;
    font-size: 9.5px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.nf-term-active .nf-term-status {
    background: rgba(220, 38, 38, 0.15);
    color: #f87171;
    animation: nf-status-pulse 1.5s ease-in-out infinite;
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(34, 197, 94, 0.12);
    color: #4ade80;
}

.nf-term-error .nf-term-status {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
}

/* Audio visualizer */
.nf-visualizer {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 2px;
    height: 36px;
    padding: 6px 18px 12px;
    border-top: 1px solid rgba(220, 38, 38, 0.15);
}

.nf-viz-bar {
    width: 3.5px;
    min-height: 3px;
    background: linear-gradient(to top, rgba(220, 38, 38, 0.5), rgba(220, 38, 38, 0.85));
    border-radius: 2px 2px 0 0;
    transition: height 0.15s ease;
}

.nf-viz-bar.nf-viz-accent {
    background: linear-gradient(to top, rgba(251, 146, 60, 0.5), rgba(251, 146, 60, 0.85));
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 220px;
    background: rgba(10, 8, 16, 0.9);
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 10px;
    padding: 12px 14px;
    backdrop-filter: blur(12px);
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: border-color 0.4s, box-shadow 0.4s;
    z-index: 5;
}

.nf-module.nf-active {
    border-color: rgba(220, 38, 38, 0.6);
    box-shadow:
        0 0 30px rgba(220, 38, 38, 0.15),
        0 0 60px rgba(220, 38, 38, 0.08),
        inset 0 0 20px rgba(220, 38, 38, 0.04);
}

.nf-module.nf-done {
    border-color: rgba(34, 197, 94, 0.4);
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.1);
}

.nf-module::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.6), transparent);
    animation: nf-scanline 3s ease-in-out infinite;
}

.nf-module.nf-done::before {
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.5), transparent);
}

@keyframes nf-scanline {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
}

@keyframes nf-module-in {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

/* Cross layout positions — tight around center (matching reference image) */
.nf-mod-tl {
    top: 50%;
    left: 50%;
    transform: translate(calc(-100% - 205px), calc(-100% - 12px));
    animation-delay: 0.1s;
}
.nf-mod-tr {
    top: 50%;
    left: 50%;
    transform: translate(205px, calc(-100% - 12px));
    animation-delay: 0.2s;
}
.nf-mod-bl {
    top: 50%;
    left: 50%;
    transform: translate(calc(-100% - 205px), 12px);
    animation-delay: 0.3s;
}
.nf-mod-br {
    top: 50%;
    left: 50%;
    transform: translate(205px, 12px);
    animation-delay: 0.4s;
}

.nf-mod-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
}

.nf-mod-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #dc2626;
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(220,38,38,0.4);
}

.nf-mod-pct {
    font-size: 10.5px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(255, 255, 255, 0.8);
}

/* ─── Sub-Steps ─── */
.nf-step {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2.5px 0;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.3s;
    font-family: 'Inter', sans-serif;
}

.nf-step.nf-step-active { color: rgba(255, 255, 255, 0.9); }
.nf-step.nf-step-done { color: rgba(34, 197, 94, 0.75); }
.nf-step.nf-step-error { color: rgba(239, 68, 68, 0.8); }

.nf-step-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    flex-shrink: 0;
    transition: all 0.3s;
}

.nf-step-active .nf-step-dot {
    background: #dc2626;
    box-shadow: 0 0 6px rgba(220, 38, 38, 0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: #22c55e;
    box-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
}

.nf-step-error .nf-step-dot { background: #ef4444; }

@keyframes nf-dot-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.5); }
}

/* ─── Progress Bars ─── */
.nf-progress-bar {
    flex: 1;
    height: 3px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 2px;
    overflow: hidden;
    max-width: 60px;
}

.nf-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #dc2626, #f87171);
    border-radius: 2px;
    transition: width 0.5s ease;
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, #22c55e, #4ade80);
}

.nf-mod-progress {
    height: 2.5px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    margin-top: 8px;
    overflow: hidden;
}

.nf-mod-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #dc2626, #fb923c);
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, #22c55e, #4ade80);
}

/* ─── Footer with brand logo ─── */
.nf-footer {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.nf-brand {
    font-family: 'Orbitron', 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 6px;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(220,38,38,0.15);
}

.nf-brand-logo {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid rgba(220,38,38,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15,10,20,0.8);
    box-shadow: 0 0 20px rgba(220,38,38,0.15);
}

.nf-brand-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.nf-timer {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.2);
    font-family: 'JetBrains Mono', monospace;
    margin-top: 2px;
    letter-spacing: 1px;
}

/* ─── Close Button ─── */
.nf-close-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.35);
    font-size: 11px;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
}

.nf-close-btn:hover {
    background: rgba(220, 38, 38, 0.15);
    border-color: rgba(220, 38, 38, 0.4);
    color: #fff;
}

/* ─── Glowing Pipe Animations ─── */
@keyframes nf-pipe-flow {
    0% { stroke-dashoffset: 40; }
    100% { stroke-dashoffset: 0; }
}

@keyframes nf-pipe-glow-pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
}

.nf-pipe-base {
    fill: none;
    stroke: rgba(220, 38, 38, 0.25);
    stroke-width: 4px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.nf-pipe-glow {
    fill: none;
    stroke: rgba(220, 38, 38, 0.4);
    stroke-width: 12px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    filter: blur(6px);
    animation: nf-pipe-glow-pulse 3s ease-in-out infinite;
}

.nf-pipe-flow {
    fill: none;
    stroke: url(#nf-pipe-gradient);
    stroke-width: 3px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
    stroke-dasharray: 10 14;
    animation: nf-pipe-flow 1.2s linear infinite;
}

.nf-pipe-dot {
    fill: rgba(220, 38, 38, 0.9);
    filter: drop-shadow(0 0 6px rgba(220,38,38,0.9));
}

/* ─── Particles ─── */
.nf-particle {
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(220, 38, 38, 0.5);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
}

@keyframes nf-float-up {
    from { transform: translateY(0) scale(1); opacity: 0.7; }
    to { transform: translateY(-150px) scale(0); opacity: 0; }
}

/* ─── Fade-out ─── */
.nf-fade-out {
    animation: nf-fade-out 0.5s ease-in forwards;
}

@keyframes nf-fade-out {
    to { opacity: 0; }
}

/* ─── Hidden state ─── */
#netflow-engine-overlay.nf-hidden {
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
}

#netflow-engine-overlay.nf-visible {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.4s ease;
}

/* ─── Floating Toggle Button ─── */
#nf-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999998;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid rgba(220, 38, 38, 0.5);
    background: rgba(10, 10, 18, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #dc2626;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.3), 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    animation: nf-toggle-pulse 2.5s ease-in-out infinite;
    font-family: 'Inter', system-ui, sans-serif;
}

#nf-toggle-btn:hover {
    transform: scale(1.1);
    border-color: rgba(220, 38, 38, 0.8);
    box-shadow: 0 0 30px rgba(220, 38, 38, 0.5), 0 4px 16px rgba(0,0,0,0.6);
    background: rgba(220, 38, 38, 0.15);
}

#nf-toggle-btn.nf-toggle-hidden {
    opacity: 0;
    pointer-events: none;
    transform: scale(0.5);
    transition: all 0.3s ease;
}

#nf-toggle-btn.nf-toggle-visible {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
    transition: all 0.3s ease;
}

@keyframes nf-toggle-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3), 0 4px 12px rgba(0,0,0,0.5); }
    50% { box-shadow: 0 0 30px rgba(220, 38, 38, 0.5), 0 4px 16px rgba(0,0,0,0.5); }
}

/* ─── Corner decorative brackets ─── */
.nf-corner-deco {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: rgba(220, 38, 38, 0.15);
    border-style: solid;
    border-width: 0;
    pointer-events: none;
    z-index: 2;
}
.nf-corner-deco.nf-deco-tl { top: 8px; left: 8px; border-top-width: 1px; border-left-width: 1px; }
.nf-corner-deco.nf-deco-tr { top: 8px; right: 8px; border-top-width: 1px; border-right-width: 1px; }
.nf-corner-deco.nf-deco-bl { bottom: 8px; left: 8px; border-bottom-width: 1px; border-left-width: 1px; }
.nf-corner-deco.nf-deco-br { bottom: 8px; right: 8px; border-bottom-width: 1px; border-right-width: 1px; }
    `;
    document.head.appendChild(styleEl);
}

// ── Terminal line data ────────────────────────────────────────────────────

const TERMINAL_LINES: { moduleId: string; label: string }[] = [
    { moduleId: "ingest", label: "ASSET INGEST" },
    { moduleId: "image", label: "AI SCENE SYNTHESIS" },
    { moduleId: "video", label: "POST-PRODUCTION" },
    { moduleId: "render", label: "FINAL RENDER" },
];

function getTerminalStatus(moduleId: string): { text: string; cls: string } {
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) return { text: "queued", cls: "nf-term-waiting" };

    const total = mod.steps.filter((s) => s.status !== "skipped").length;
    const done = mod.steps.filter((s) => s.status === "done").length;
    const hasActive = mod.steps.some((s) => s.status === "active");
    const hasError = mod.steps.some((s) => s.status === "error");
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    if (hasError) return { text: "ERROR", cls: "nf-term-error" };
    if (pct >= 100) return { text: "COMPLETE", cls: "nf-term-done" };
    if (hasActive) return { text: `PROCESSING... ${pct}%`, cls: "nf-term-active" };
    return { text: "(queued)", cls: "nf-term-waiting" };
}

// ── DOM Builder ────────────────────────────────────────────────────────────

/**
 * Build SVG pipe connections between modules and center core.
 * Creates curved glowing pipes like the reference image.
 * Pipes use relative viewport coordinates (0-1000 viewBox).
 */
function buildPipesSVG(): SVGSVGElement {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "nf-pipes-svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("preserveAspectRatio", "none");

    // Gradient definition for flowing pipes
    const defs = document.createElementNS(ns, "defs");
    const grad = document.createElementNS(ns, "linearGradient");
    grad.id = "nf-pipe-gradient";
    const stop1 = document.createElementNS(ns, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", "rgba(220,38,38,0.9)");
    const stop2 = document.createElementNS(ns, "stop");
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("stop-color", "rgba(251,146,60,0.8)");
    const stop3 = document.createElementNS(ns, "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", "rgba(220,38,38,0.9)");
    grad.appendChild(stop1);
    grad.appendChild(stop2);
    grad.appendChild(stop3);
    defs.appendChild(grad);

    // Glow filter
    const filter = document.createElementNS(ns, "filter");
    filter.id = "nf-glow";
    filter.setAttribute("x", "-50%");
    filter.setAttribute("y", "-50%");
    filter.setAttribute("width", "200%");
    filter.setAttribute("height", "200%");
    const blur = document.createElementNS(ns, "feGaussianBlur");
    blur.setAttribute("stdDeviation", "3");
    blur.setAttribute("result", "coloredBlur");
    const merge = document.createElementNS(ns, "feMerge");
    const m1 = document.createElementNS(ns, "feMergeNode");
    m1.setAttribute("in", "coloredBlur");
    const m2 = document.createElementNS(ns, "feMergeNode");
    m2.setAttribute("in", "SourceGraphic");
    merge.appendChild(m1);
    merge.appendChild(m2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    svg.appendChild(defs);

    // Helper to add a 3-layer pipe (glow + base + animated flow)
    function addPipe(d: string, delay: number) {
        const glow = document.createElementNS(ns, "path");
        glow.setAttribute("d", d);
        glow.setAttribute("class", "nf-pipe-glow");
        glow.style.animationDelay = `${delay * 0.5}s`;
        svg.appendChild(glow);

        const base = document.createElementNS(ns, "path");
        base.setAttribute("d", d);
        base.setAttribute("class", "nf-pipe-base");
        svg.appendChild(base);

        const flow = document.createElementNS(ns, "path");
        flow.setAttribute("d", d);
        flow.setAttribute("class", "nf-pipe-flow");
        flow.style.animationDelay = `${delay * 0.3}s`;
        svg.appendChild(flow);
    }

    // Pipe paths using percentage coordinates (0-100 viewBox, preserveAspectRatio="none")
    // Layout: modules at ±10.7% from center, core ±9.9% from center
    // Module inner edges: ~39% and ~61%. Core edges: ~40% and ~60%
    // Vertical: modules at ±1% from center, core at ±12% from center

    // 4 diagonal pipes: module inner corner → core corner (dramatic curves like reference image)
    addPipe("M 39 44 C 39 47, 40 48, 40.5 46", 0);    // TL → Core TL
    addPipe("M 61 44 C 61 47, 60 48, 59.5 46", 1);    // TR → Core TR
    addPipe("M 39 56 C 39 53, 40 52, 40.5 54", 2);    // BL → Core BL
    addPipe("M 61 56 C 61 53, 60 52, 59.5 54", 3);    // BR → Core BR

    // Horizontal cross-connections: TL↔TR top arc, BL↔BR bottom arc
    addPipe("M 39 38 C 44 30, 56 30, 61 38", 4);      // Top arc connecting TL-TR
    addPipe("M 39 62 C 44 70, 56 70, 61 62", 5);      // Bottom arc connecting BL-BR

    // Vertical side connections: TL↔BL left, TR↔BR right
    addPipe("M 28 46 C 23 50, 23 50, 28 54", 6);      // Left arc TL-BL
    addPipe("M 72 46 C 77 50, 77 50, 72 54", 7);      // Right arc TR-BR

    // Glowing junction dots at pipe endpoints (r set via CSS)
    const junctions: [number, number][] = [
        [40.5, 46], [59.5, 46], [40.5, 54], [59.5, 54],  // core corners
        [39, 44], [61, 44], [39, 56], [61, 56],           // module inner corners
        [39, 38], [61, 38], [39, 62], [61, 62],           // cross-arc endpoints
        [28, 46], [72, 46], [28, 54], [72, 54],           // side-arc endpoints
    ];
    junctions.forEach(([cx, cy]) => {
        const dot = document.createElementNS(ns, "circle");
        dot.setAttribute("cx", String(cx));
        dot.setAttribute("cy", String(cy));
        dot.setAttribute("r", "0.35");
        dot.setAttribute("class", "nf-pipe-dot");
        svg.appendChild(dot);
    });

    return svg;
}

function buildOverlay(): HTMLDivElement {
    const root = document.createElement("div");
    root.id = "netflow-engine-overlay";

    // Corner decorative brackets
    ["nf-deco-tl", "nf-deco-tr", "nf-deco-bl", "nf-deco-br"].forEach(cls => {
        const d = document.createElement("div");
        d.className = `nf-corner-deco ${cls}`;
        root.appendChild(d);
    });

    // Close button (toggles overlay visibility, doesn't destroy)
    const closeBtn = document.createElement("button");
    closeBtn.className = "nf-close-btn";
    closeBtn.textContent = "✕ ซ่อน";
    closeBtn.onclick = () => toggleOverlayVisibility();
    root.appendChild(closeBtn);

    // Layout wrapper
    const layout = document.createElement("div");
    layout.className = "nf-layout";

    // SVG Pipe connections (behind everything)
    layout.appendChild(buildPipesSVG());

    // Central Core Monitor
    const core = document.createElement("div");
    core.className = "nf-core-monitor";
    core.id = "nf-core-monitor";

    // Header
    const header = document.createElement("div");
    header.className = "nf-core-header";
    header.innerHTML = `
        <div class="nf-core-title">
            <span class="nf-core-title-label">CORE STATUS:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0</div>
    `;
    core.appendChild(header);

    // Terminal
    const terminal = document.createElement("div");
    terminal.className = "nf-terminal";
    terminal.id = "nf-terminal";
    TERMINAL_LINES.forEach((line) => {
        const row = document.createElement("div");
        row.className = "nf-term-line nf-term-waiting";
        row.id = `nf-term-${line.moduleId}`;
        row.innerHTML = `
            <span class="nf-term-prefix">&gt;</span>
            <span class="nf-term-label">${line.label}</span>
            <span class="nf-term-status">(queued)</span>
        `;
        terminal.appendChild(row);
    });
    core.appendChild(terminal);

    // Visualizer
    const viz = document.createElement("div");
    viz.className = "nf-visualizer";
    viz.id = "nf-visualizer";
    const BAR_COUNT = 30;
    for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement("div");
        bar.className = `nf-viz-bar${i % 5 === 0 ? " nf-viz-accent" : ""}`;
        bar.style.height = "3px";
        viz.appendChild(bar);
    }
    core.appendChild(viz);

    layout.appendChild(core);

    // Cross-pattern modules (TL, TR, BL, BR)
    const positions = ["nf-mod-tl", "nf-mod-tr", "nf-mod-bl", "nf-mod-br"];
    modules.forEach((mod, i) => {
        const el = buildModule(mod);
        el.classList.add(positions[i]);
        el.id = `nf-mod-${mod.id}`;
        layout.appendChild(el);
    });

    root.appendChild(layout);

    // Floating particles
    for (let i = 0; i < 20; i++) {
        const p = document.createElement("div");
        p.className = "nf-particle";
        p.style.left = `${10 + Math.random() * 80}%`;
        p.style.bottom = `${Math.random() * 30}%`;
        p.style.animationDuration = `${3 + Math.random() * 5}s`;
        p.style.animationDelay = `${Math.random() * 4}s`;
        if (Math.random() > 0.5) p.style.background = "rgba(251, 146, 60, 0.4)";
        root.appendChild(p);
    }

    // Footer with brand
    const footer = document.createElement("div");
    footer.className = "nf-footer";
    footer.innerHTML = `
        <div class="nf-brand-row">
            <div class="nf-brand">NETFLOW AI ENGINE</div>
            <div class="nf-brand-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(220,38,38,0.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2 L12 22 M2 12 L22 12"/>
                    <circle cx="12" cy="12" r="4" fill="rgba(220,38,38,0.2)"/>
                </svg>
            </div>
        </div>
        <div class="nf-timer" id="nf-timer">00:00</div>
    `;
    root.appendChild(footer);

    return root;
}

function buildModule(mod: Module): HTMLDivElement {
    const el = document.createElement("div");
    el.className = "nf-module";

    // Header
    const header = document.createElement("div");
    header.className = "nf-mod-header";
    header.innerHTML = `
        <div class="nf-mod-title">${mod.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${mod.id}">0%</span>
    `;
    el.appendChild(header);

    // Sub-steps
    mod.steps.forEach((step) => {
        const row = document.createElement("div");
        row.className = "nf-step";
        row.id = `nf-step-${step.id}`;

        let progressHtml = "";
        if (step.progress !== undefined) {
            progressHtml = `
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${step.id}" style="width: 0%"></div>
                </div>
            `;
        }

        row.innerHTML = `
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${step.label}</span>
            ${progressHtml}
        `;
        el.appendChild(row);
    });

    // Module progress bar
    const modBar = document.createElement("div");
    modBar.className = "nf-mod-progress";
    modBar.innerHTML = `<div class="nf-mod-progress-fill" id="nf-modbar-${mod.id}"></div>`;
    el.appendChild(modBar);

    return el;
}

// ── Timer ──────────────────────────────────────────────────────────────────

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const ss = String(elapsed % 60).padStart(2, "0");
        const timerEl = document.getElementById("nf-timer");
        if (timerEl) timerEl.textContent = `${mm}:${ss}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

// ── Visualizer animation ──────────────────────────────────────────────────

function startVisualizer() {
    visualizerInterval = setInterval(() => {
        const viz = document.getElementById("nf-visualizer");
        if (!viz) return;
        const bars = viz.querySelectorAll<HTMLDivElement>(".nf-viz-bar");
        bars.forEach((bar) => {
            const h = 3 + Math.random() * 28;
            bar.style.height = `${h}px`;
        });
    }, 180);
}

function stopVisualizer() {
    if (visualizerInterval) { clearInterval(visualizerInterval); visualizerInterval = null; }
    // Flatten bars
    const viz = document.getElementById("nf-visualizer");
    if (viz) {
        viz.querySelectorAll<HTMLDivElement>(".nf-viz-bar").forEach((b) => { b.style.height = "3px"; });
    }
}

// ── Terminal refresh ──────────────────────────────────────────────────────

function refreshTerminal() {
    let doneCount = 0;
    for (const tl of TERMINAL_LINES) {
        const el = document.getElementById(`nf-term-${tl.moduleId}`);
        if (!el) continue;
        const info = getTerminalStatus(tl.moduleId);
        el.className = `nf-term-line ${info.cls}`;
        const statusSpan = el.querySelector(".nf-term-status");
        if (statusSpan) statusSpan.textContent = info.text;
        if (info.cls === "nf-term-done") doneCount++;
    }
    // Update counter
    activeStepCount = doneCount;
    const counter = document.getElementById("nf-step-counter");
    if (counter) counter.textContent = String(doneCount);

    // Update core title based on overall state
    const titleVal = document.querySelector(".nf-core-title-val") as HTMLElement | null;
    const statusDot = document.querySelector(".nf-status-dot") as HTMLElement | null;
    if (doneCount >= TERMINAL_LINES.length) {
        if (titleVal) { titleVal.textContent = "COMPLETE"; titleVal.style.color = "#4ade80"; }
        if (statusDot) { statusDot.style.background = "#4ade80"; statusDot.style.boxShadow = "0 0 8px rgba(74,222,128,0.7)"; }
    } else {
        const hasError = TERMINAL_LINES.some((tl) => getTerminalStatus(tl.moduleId).cls === "nf-term-error");
        if (hasError) {
            if (titleVal) { titleVal.textContent = "ERROR"; titleVal.style.color = "#f87171"; }
            if (statusDot) { statusDot.style.background = "#ef4444"; statusDot.style.boxShadow = "0 0 8px rgba(239,68,68,0.7)"; }
        }
    }
}

// ── Toggle Button Builder ──────────────────────────────────────────────────

function ensureToggleButton(): void {
    if (toggleBtn) return;
    injectStyles();
    toggleBtn = document.createElement("button");
    toggleBtn.id = "nf-toggle-btn";
    toggleBtn.className = "nf-toggle-hidden";
    toggleBtn.innerHTML = "⚡";
    toggleBtn.title = "เปิด Netflow Overlay";
    toggleBtn.onclick = () => toggleOverlayVisibility();
    document.body.appendChild(toggleBtn);
}

/** Toggle overlay: hide ↔ show */
function toggleOverlayVisibility(): void {
    if (!overlayRoot) return;
    ensureToggleButton();

    if (!overlayHidden) {
        // Hide overlay → show toggle button
        overlayRoot.classList.remove("nf-visible");
        overlayRoot.classList.add("nf-hidden");
        if (toggleBtn) {
            toggleBtn.classList.remove("nf-toggle-hidden");
            toggleBtn.classList.add("nf-toggle-visible");
        }
        overlayHidden = true;
    } else {
        // Show overlay → hide toggle button
        overlayRoot.classList.remove("nf-hidden");
        overlayRoot.classList.add("nf-visible");
        if (toggleBtn) {
            toggleBtn.classList.remove("nf-toggle-visible");
            toggleBtn.classList.add("nf-toggle-hidden");
        }
        overlayHidden = false;
    }
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Show the overlay on the page */
export function showOverlay(): void {
    if (overlayRoot) {
        // If overlay exists but is hidden, show it
        if (overlayHidden) {
            toggleOverlayVisibility();
        }
        return;
    }
    injectStyles();
    overlayRoot = buildOverlay();
    document.body.appendChild(overlayRoot);
    overlayHidden = false;
    ensureToggleButton();
    startTimer();
    startVisualizer();
}

/** Hide and remove the overlay completely (called on automation finish) */
export function hideOverlay(): void {
    stopTimer();
    stopVisualizer();
    overlayHidden = false;
    if (overlayRoot) {
        overlayRoot.classList.add("nf-fade-out");
        setTimeout(() => {
            overlayRoot?.remove();
            overlayRoot = null;
        }, 500);
    }
    // Also remove toggle button
    if (toggleBtn) {
        toggleBtn.remove();
        toggleBtn = null;
    }
}

/** Update a sub-step status */
export function updateStep(stepId: string, status: StepStatus, progress?: number): void {
    if (!overlayRoot) return;

    // Update internal state
    for (const mod of modules) {
        for (const step of mod.steps) {
            if (step.id === stepId) {
                step.status = status;
                if (progress !== undefined) step.progress = progress;
            }
        }
    }

    // Update DOM step row
    const row = document.getElementById(`nf-step-${stepId}`);
    if (row) {
        row.className = "nf-step";
        if (status === "active") row.classList.add("nf-step-active");
        else if (status === "done") row.classList.add("nf-step-done");
        else if (status === "error") row.classList.add("nf-step-error");
    }

    // Update progress bar if applicable
    if (progress !== undefined) {
        const bar = document.getElementById(`nf-bar-${stepId}`);
        if (bar) (bar as HTMLDivElement).style.width = `${Math.min(100, progress)}%`;
    }

    // Refresh everything
    refreshModules();
    refreshTerminal();
}

/** Update multiple steps at once */
export function updateSteps(updates: Array<{ id: string; status: StepStatus; progress?: number }>): void {
    for (const u of updates) updateStep(u.id, u.status, u.progress);
}

/** Mark a step as skipped (not applicable) */
export function skipStep(stepId: string): void {
    updateStep(stepId, "skipped");
    const row = document.getElementById(`nf-step-${stepId}`);
    if (row) row.style.opacity = "0.2";
}

/** Complete everything and auto-hide after delay */
export function completeOverlay(delayMs = 4000): void {
    stopTimer();
    stopVisualizer();
    refreshModules();
    refreshTerminal();
    setTimeout(() => hideOverlay(), delayMs);
}

// ── Internal: recalculate module percentages & active state ───────────────

function refreshModules(): void {
    for (const mod of modules) {
        const total = mod.steps.filter((s) => s.status !== "skipped").length;
        const done = mod.steps.filter((s) => s.status === "done").length;
        const hasActive = mod.steps.some((s) => s.status === "active");
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        const pctEl = document.getElementById(`nf-pct-${mod.id}`);
        if (pctEl) pctEl.textContent = `${pct}%`;

        const modBar = document.getElementById(`nf-modbar-${mod.id}`);
        if (modBar) (modBar as HTMLDivElement).style.width = `${pct}%`;

        const modEl = document.getElementById(`nf-mod-${mod.id}`);
        if (modEl) {
            modEl.classList.remove("nf-active", "nf-done");
            if (pct >= 100) modEl.classList.add("nf-done");
            else if (hasActive) modEl.classList.add("nf-active");
        }
    }
}

/**
 * Configure multi-scene mode: replaces VIDEO PRODUCTION steps
 * with per-scene sub-steps (Scene 1 is already handled by the first vid-wait).
 * Call this AFTER showOverlay() and BEFORE scene loop starts.
 *
 * @param totalScenes — total number of scenes (e.g. 2 or 3)
 */
export function configureScenes(totalScenes: number): void {
    if (totalScenes <= 1) return;

    const videoMod = modules.find((m) => m.id === "video");
    if (!videoMod) return;

    const newSteps: SubStep[] = [
        { id: "animate", label: "สลับเป็นโหมดวิดีโอ", status: videoMod.steps.find(s => s.id === "animate")?.status || "waiting" },
        { id: "vid-prompt", label: "Scene 1 Prompt", status: videoMod.steps.find(s => s.id === "vid-prompt")?.status || "waiting" },
        { id: "vid-generate", label: "Scene 1 Generate", status: videoMod.steps.find(s => s.id === "vid-generate")?.status || "waiting" },
        { id: "vid-wait", label: "Scene 1 รอผล", status: videoMod.steps.find(s => s.id === "vid-wait")?.status || "waiting", progress: 0 },
    ];

    for (let i = 2; i <= totalScenes; i++) {
        newSteps.push({ id: `scene${i}-prompt`, label: `Scene ${i} Prompt`, status: "waiting" });
        newSteps.push({ id: `scene${i}-gen`, label: `Scene ${i} Generate`, status: "waiting" });
        newSteps.push({ id: `scene${i}-wait`, label: `Scene ${i} รอผล`, status: "waiting", progress: 0 });
    }

    videoMod.steps = newSteps;
    rebuildModuleDom(videoMod);
    refreshModules();
    refreshTerminal();
}

/** Rebuild the DOM rows inside a module element (after steps changed) */
function rebuildModuleDom(mod: Module): void {
    const modEl = document.getElementById(`nf-mod-${mod.id}`);
    if (!modEl) return;

    const oldRows = modEl.querySelectorAll(".nf-step, .nf-mod-progress");
    oldRows.forEach((r) => r.remove());

    mod.steps.forEach((step) => {
        const row = document.createElement("div");
        row.className = "nf-step";
        row.id = `nf-step-${step.id}`;

        let progressHtml = "";
        if (step.progress !== undefined) {
            progressHtml = `
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${step.id}" style="width: 0%"></div>
                </div>
            `;
        }

        row.innerHTML = `
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${step.label}</span>
            ${progressHtml}
        `;
        modEl.appendChild(row);
    });

    const modBar = document.createElement("div");
    modBar.className = "nf-mod-progress";
    modBar.innerHTML = `<div class="nf-mod-progress-fill" id="nf-modbar-${mod.id}"></div>`;
    modEl.appendChild(modBar);
}

/** Reset all modules to waiting state (for re-runs) */
export function resetOverlay(): void {
    for (const mod of modules) {
        for (const step of mod.steps) {
            step.status = "waiting";
            step.progress = step.progress !== undefined ? 0 : undefined;
        }
    }
    refreshModules();
    refreshTerminal();
}
