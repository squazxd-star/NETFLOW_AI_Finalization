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

// ── Theme ──────────────────────────────────────────────────────────────────

interface OverlayTheme {
    rgb: string;        // primary e.g. "0, 255, 65"
    hex: string;        // primary hex e.g. "#00ff41"
    accentRgb: string;  // accent e.g. "0, 255, 180"
    accentHex: string;
    doneRgb: string;    // done/success e.g. "34, 197, 94"
    doneHex: string;
}

const OVERLAY_THEMES: Record<string, OverlayTheme> = {
    green: {
        rgb: "0, 255, 65",    hex: "#00ff41",
        accentRgb: "0, 255, 180",   accentHex: "#00ffb4",
        doneRgb: "34, 197, 94",     doneHex: "#22c55e",
    },
    red: {
        rgb: "220, 38, 38",   hex: "#dc2626",
        accentRgb: "251, 146, 60",  accentHex: "#fb923c",
        doneRgb: "34, 197, 94",     doneHex: "#22c55e",
    },
    blue: {
        rgb: "43, 125, 233",  hex: "#2b7de9",
        accentRgb: "6, 182, 212",   accentHex: "#06b6d4",
        doneRgb: "34, 197, 94",     doneHex: "#22c55e",
    },
    yellow: {
        rgb: "234, 179, 8",   hex: "#eab308",
        accentRgb: "245, 158, 11",  accentHex: "#f59e0b",
        doneRgb: "34, 197, 94",     doneHex: "#22c55e",
    },
    purple: {
        rgb: "139, 92, 246",  hex: "#8b5cf6",
        accentRgb: "168, 85, 247",  accentHex: "#a855f7",
        doneRgb: "34, 197, 94",     doneHex: "#22c55e",
    },
};

let currentTheme: OverlayTheme = OVERLAY_THEMES.green;
let _themeKeyOverride: string | null = null;

/** Called from content script with theme key received from sidepanel message */
export function setOverlayTheme(key?: string): void {
    if (key && OVERLAY_THEMES[key]) {
        _themeKeyOverride = key;
        currentTheme = OVERLAY_THEMES[key];
        updateThemeComponents();
        // Update bg if overlay already visible
        requestAnimationFrame(() => applyCoreBg());
    }
}

function resolveThemeColors(): OverlayTheme {
    // 1. Use override from message if available
    if (_themeKeyOverride && OVERLAY_THEMES[_themeKeyOverride]) return OVERLAY_THEMES[_themeKeyOverride];
    // 2. Try localStorage (works in extension pages, not content scripts on other domains)
    try {
        const key = localStorage.getItem("netflow_app_theme");
        if (key && OVERLAY_THEMES[key]) return OVERLAY_THEMES[key];
    } catch {}
    return OVERLAY_THEMES.green;
}

// ── State ──────────────────────────────────────────────────────────────────

// Parsed primary RGB components for JS dynamic color (matrix rain, particles, etc.)
let _themeR = 0, _themeG = 255, _themeB = 65;
function updateThemeComponents() {
    const m = currentTheme.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (m) { _themeR = parseInt(m[1], 16); _themeG = parseInt(m[2], 16); _themeB = parseInt(m[3], 16); }
}

let overlayRoot: HTMLDivElement | null = null;
let toggleBtn: HTMLButtonElement | null = null;
let styleEl: HTMLStyleElement | null = null;
let startTime = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let terminalInterval: ReturnType<typeof setInterval> | null = null;
let waveAnimFrame: number | null = null;
let statsInterval: ReturnType<typeof setInterval> | null = null;
let wavePhase = 0;
let activeStepCount = 0;
let overlayHidden = false;
let matrixCanvas: HTMLCanvasElement | null = null;
let matrixCtx: CanvasRenderingContext2D | null = null;
let matrixAnimFrame: number | null = null;
let matrixColumns: number[] = [];
let hexGridAnimFrame: number | null = null;

// ── Process Steps (Dynamic Center Terminal) ────────────────────────────────

interface ProcessStep {
    stepId: string;
    label: string;
    status: StepStatus;
    progress?: number;
}

let currentSceneCount = 1;
let processSteps: ProcessStep[] = [];
const logBuffer: string[] = [];
const MAX_LOG_LINES = 4;

function generateProcessSteps(scenes: number): ProcessStep[] {
    const steps: ProcessStep[] = [
        { stepId: "upload-char", label: "อัปโหลดภาพตัวละคร", status: "waiting" },
        { stepId: "upload-prod", label: "อัปโหลดภาพสินค้า", status: "waiting" },
        { stepId: "img-prompt", label: "ใส่คำสั่งสร้างภาพ", status: "waiting" },
        { stepId: "img-generate", label: "สั่งสร้างภาพ", status: "waiting" },
        { stepId: "img-wait", label: "รอผลลัพธ์การสร้างภาพ", status: "waiting", progress: 0 },
        { stepId: "animate", label: "แปลงเป็นภาพเคลื่อนไหว", status: "waiting" },
    ];
    if (scenes <= 1) {
        steps.push(
            { stepId: "vid-prompt", label: "ใส่คำสั่งสร้างวิดีโอ", status: "waiting" },
            { stepId: "vid-generate", label: "สั่งสร้างวิดีโอ", status: "waiting" },
            { stepId: "vid-wait", label: "กำลังสร้างวิดีโอ", status: "waiting", progress: 0 },
            { stepId: "download", label: "ดาวน์โหลดวิดีโอ", status: "waiting" },
            { stepId: "upscale", label: "อัปสเกลความละเอียด", status: "waiting", progress: 0 },
            { stepId: "open", label: "เปิดดูตัวอย่างวิดีโอ", status: "waiting" },
        );
    } else {
        steps.push(
            { stepId: "vid-prompt", label: "ฉาก 1 — ใส่คำสั่ง", status: "waiting" },
            { stepId: "vid-generate", label: "ฉาก 1 — สั่งสร้าง", status: "waiting" },
            { stepId: "vid-wait", label: "ฉาก 1 — กำลังสร้าง", status: "waiting", progress: 0 },
        );
        for (let i = 2; i <= scenes; i++) {
            steps.push(
                { stepId: `scene${i}-prompt`, label: `ฉาก ${i} — ใส่คำสั่ง`, status: "waiting" },
                { stepId: `scene${i}-gen`, label: `ฉาก ${i} — สั่งสร้าง`, status: "waiting" },
                { stepId: `scene${i}-wait`, label: `ฉาก ${i} — กำลังสร้าง`, status: "waiting", progress: 0 },
            );
        }
        steps.push(
            { stepId: "download", label: "ดาวน์โหลดวิดีโอ", status: "waiting" },
            { stepId: "upscale", label: "อัปสเกลความละเอียด", status: "waiting", progress: 0 },
            { stepId: "open", label: "เปิดดูตัวอย่างวิดีโอ", status: "waiting" },
        );
    }
    return steps;
}

const modules: Module[] = [
    {
        id: "ingest",
        title: "ASSET_INGEST",
        steps: [
            { id: "settings", label: "กำหนดค่าเริ่มต้น", status: "waiting" },
            { id: "upload-char", label: "อัปโหลดภาพตัวละคร", status: "waiting" },
            { id: "upload-prod", label: "อัปโหลดภาพสินค้า", status: "waiting" },
        ],
    },
    {
        id: "image",
        title: "AI_IMAGE_SYNTHESIS",
        steps: [
            { id: "img-prompt", label: "ใส่คำสั่งสร้างภาพ", status: "waiting" },
            { id: "img-generate", label: "สั่งสร้างภาพ", status: "waiting" },
            { id: "img-wait", label: "รอผลลัพธ์การสร้างภาพ", status: "waiting", progress: 0 },
        ],
    },
    {
        id: "video",
        title: "VIDEO_PRODUCTION",
        steps: [
            { id: "animate", label: "แปลงเป็นภาพเคลื่อนไหว", status: "waiting" },
            { id: "vid-prompt", label: "ใส่คำสั่งสร้างวิดีโอ", status: "waiting" },
            { id: "vid-generate", label: "สั่งสร้างวิดีโอ", status: "waiting" },
            { id: "vid-wait", label: "กำลังสร้างวิดีโอ", status: "waiting", progress: 0 },
        ],
    },
    {
        id: "render",
        title: "FINAL_RENDER_OUTPUT",
        steps: [
            { id: "download", label: "ดาวน์โหลดวิดีโอ", status: "waiting" },
            { id: "upscale", label: "อัปสเกลความละเอียด", status: "waiting", progress: 0 },
            { id: "open", label: "เปิดดูตัวอย่างวิดีโอ", status: "waiting" },
        ],
    },
];

processSteps = generateProcessSteps(1);

// ── CSS Injection ──────────────────────────────────────────────────────────

function buildCss(t: OverlayTheme): string {
    const P = t.rgb;            // primary RGB e.g. "0, 255, 65"
    const A = t.accentRgb;      // accent RGB
    const D = t.doneRgb;        // done RGB
    const PH = t.hex;           // primary hex
    const AH = t.accentHex;     // accent hex
    const DH = t.doneHex;       // done hex
    // Lighter tint of primary
    const PL = (() => {
        const m = PH.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (!m) return "#4ade80";
        const lighten = (v: number) => Math.min(255, v + 80);
        return `#${[1,2,3].map(i => lighten(parseInt(m[i],16)).toString(16).padStart(2,'0')).join('')}`;
    })();
    // Done lighter
    const DL = (() => {
        const m = DH.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (!m) return "#4ade80";
        const lighten = (v: number) => Math.min(255, v + 60);
        return `#${[1,2,3].map(i => lighten(parseInt(m[i],16)).toString(16).padStart(2,'0')).join('')}`;
    })();
    // Background tint: very dark version of primary for overlay backgrounds
    const _pm = PH.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    const _pmax = _pm ? Math.max(parseInt(_pm[1],16), parseInt(_pm[2],16), parseInt(_pm[3],16), 1) : 255;
    const _nr = _pm ? parseInt(_pm[1],16) / _pmax : 0;
    const _ng = _pm ? parseInt(_pm[2],16) / _pmax : 1;
    const _nb = _pm ? parseInt(_pm[3],16) / _pmax : 0.25;
    const bgt = (i: number) => `${Math.round(_nr*i)}, ${Math.round(_ng*i)}, ${Math.round(_nb*i)}`;

    return `
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${P},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${A},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${P},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${A},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${bgt(18)},0.94) 0%, rgba(${bgt(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: nf-fade-in 0.6s ease-out;
    overflow: hidden;
}

/* ─── Matrix Rain Canvas ─── */
#nf-matrix-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.85;
}

/* ─── Hex Grid Overlay ─── */
#nf-hex-grid-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.24;
    mix-blend-mode: screen;
}

/* ─── Vignette Overlay (enhanced with theme tint at edges) ─── */
#netflow-engine-overlay .nf-vignette {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%),
        radial-gradient(ellipse at 0% 0%, rgba(${P},0.12) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 100%, rgba(${A},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${P},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${A},0.06) 0%, transparent 35%);
    pointer-events: none;
    z-index: 1;
}

/* ─── Scanline CRT Effect ─── */
#netflow-engine-overlay .nf-crt-scanlines {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(${P},0.045) 2px,
        rgba(${P},0.045) 4px
    );
    pointer-events: none;
    z-index: 1;
    will-change: transform;
    animation: nf-scanline-shift 0.15s steps(2) infinite;
}

@keyframes nf-scanline-shift {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
}

/* ─── Radial Pulse Ring (enhanced glow + gradient border) ─── */
#netflow-engine-overlay .nf-pulse-ring {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    height: 800px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1.5px solid rgba(${P},0.24);
    box-shadow: 0 0 30px rgba(${P},0.09), inset 0 0 30px rgba(${P},0.06);
    pointer-events: none;
    z-index: 1;
    animation: nf-pulse-expand 5s ease-out infinite;
}
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${A},0.18); box-shadow: 0 0 25px rgba(${A},0.09); }
#netflow-engine-overlay .nf-pulse-ring:nth-child(3) { animation-delay: 3.2s; width: 1100px; height: 1100px; }

@keyframes nf-pulse-expand {
    0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 1; }
    50%  { opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(1.6);  opacity: 0; }
}

@keyframes nf-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ─── Background Pattern: Hex Dot Grid (scrolls upper-right) ─── */
#netflow-engine-overlay::before {
    content: '';
    position: absolute;
    inset: -80px;
    background-image:
        radial-gradient(circle, rgba(${P},0.15) 1px, transparent 1px),
        radial-gradient(circle, rgba(${P},0.10) 1px, transparent 1px);
    background-size: 26px 45px, 26px 45px;
    background-position: 0 0, 13px 22.5px;
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-hex 35s linear infinite;
}

@keyframes nf-pat-hex {
    from { transform: translate(0, 0); }
    to   { transform: translate(26px, -45px); }
}

/* ─── Background Pattern: Fine Grid (scrolls lower-left) ─── */
#netflow-engine-overlay::after {
    content: '';
    position: absolute;
    inset: -80px;
    background-image:
        linear-gradient(rgba(${P},0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${P},0.08) 1px, transparent 1px);
    background-size: 55px 55px;
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-grid 50s linear infinite;
}

@keyframes nf-pat-grid {
    from { transform: translate(0, 0); }
    to   { transform: translate(-55px, 55px); }
}

/* ─── Diagonal Traces A (35° scrolling right) ─── */
.nf-pat-diag-a {
    position: absolute;
    inset: -120px;
    will-change: transform;
    background: repeating-linear-gradient(
        35deg,
        transparent,
        transparent 70px,
        rgba(${A},0.054) 70px,
        rgba(${A},0.054) 71px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-diag-r 28s linear infinite;
}

/* ─── Diagonal Traces B (-35° scrolling left) ─── */
.nf-pat-diag-b {
    position: absolute;
    inset: -120px;
    will-change: transform;
    background: repeating-linear-gradient(
        -35deg,
        transparent,
        transparent 90px,
        rgba(${P},0.042) 90px,
        rgba(${P},0.042) 91px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-diag-l 35s linear infinite;
}

@keyframes nf-pat-diag-r {
    from { transform: translateX(0); }
    to   { transform: translateX(140px); }
}
@keyframes nf-pat-diag-l {
    from { transform: translateX(0); }
    to   { transform: translateX(-180px); }
}

/* ─── Data Stream Columns (vertical, scrolling up) ─── */
.nf-pat-data {
    position: absolute;
    inset: -120px;
    will-change: transform;
    background: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 110px,
        rgba(${P},0.066) 110px,
        rgba(${P},0.066) 111px,
        transparent 111px,
        transparent 113px,
        rgba(${A},0.045) 113px,
        rgba(${A},0.045) 114px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-up 18s linear infinite;
}

@keyframes nf-pat-up {
    from { transform: translateY(0); }
    to   { transform: translateY(-220px); }
}

/* ─── Noise / Grain Texture ─── */
.nf-pat-noise {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    opacity: 0.09;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
}

/* ─── Ambient Orbs (large soft drifting glows) ─── */
.nf-ambient-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
}
.nf-orb-1 {
    width: 550px; height: 550px;
    background: radial-gradient(circle, rgba(${P},0.21) 0%, transparent 70%);
    top: -8%; left: -6%;
    animation: nf-orb-1 22s ease-in-out infinite alternate;
}
.nf-orb-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(${A},0.16) 0%, transparent 70%);
    bottom: -6%; right: -4%;
    animation: nf-orb-2 28s ease-in-out infinite alternate;
}
.nf-orb-3 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(${P},0.13) 0%, transparent 70%);
    top: 35%; left: 55%;
    animation: nf-orb-3 32s ease-in-out infinite alternate;
}
.nf-orb-4 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(${A},0.12) 0%, transparent 70%);
    top: 60%; left: 10%;
    animation: nf-orb-4 26s ease-in-out infinite alternate;
}

@keyframes nf-orb-1 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(220px, 180px) scale(1.15); }
}
@keyframes nf-orb-2 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(-200px, -140px) scale(1.1); }
}
@keyframes nf-orb-3 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(-160px, 120px) scale(0.9); }
}
@keyframes nf-orb-4 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(180px, -100px) scale(1.2); }
}

/* ─── Center Glow Pulse ─── */
.nf-center-glow {
    position: absolute;
    left: 50%; top: 50%;
    width: 700px; height: 700px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(${P},0.18) 0%, rgba(${A},0.06) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    animation: nf-center-pulse 6s ease-in-out infinite;
}

@keyframes nf-center-pulse {
    0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
    50%      { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
}

/* ─── Extra Ambient Orbs (5-8) for 3x density ─── */
.nf-orb-5 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(${P},0.18) 0%, transparent 65%);
    top: 10%; right: 15%;
    animation: nf-orb-5 24s ease-in-out infinite alternate;
}
@keyframes nf-orb-5 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(-180px, 160px) scale(1.25); }
}

/* ─── Pattern: Circuit Board Traces ─── */
.nf-pat-circuit {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(0deg, rgba(${P},0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${P},0.04) 1px, transparent 1px),
        linear-gradient(0deg, rgba(${A},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${A},0.025) 2px, transparent 2px);
    background-size: 80px 80px, 80px 80px, 160px 160px, 160px 160px;
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Honeycomb Hex ─── */
.nf-pat-honeycomb {
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 50% 0%, rgba(${P},0.06) 2px, transparent 2px),
        radial-gradient(circle at 0% 75%, rgba(${A},0.05) 2px, transparent 2px),
        radial-gradient(circle at 100% 75%, rgba(${P},0.05) 2px, transparent 2px);
    background-size: 40px 46px;
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Radar Sweep ─── */
.nf-pat-radar {
    position: absolute;
    left: 50%; top: 50%;
    width: 1000px; height: 1000px;
    transform: translate(-50%, -50%);
    background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(${P},0.1) 15deg,
        transparent 60deg,
        transparent 180deg,
        rgba(${A},0.06) 195deg,
        transparent 240deg,
        transparent 360deg
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    animation: nf-radar-spin 12s linear infinite;
    opacity: 0.6;
}
@keyframes nf-radar-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
}

/* ─── Pattern: Horizontal Wave Lines ─── */
.nf-pat-wave-h {
    position: absolute;
    inset: -40px;
    will-change: transform;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 18px,
        rgba(${A},0.035) 18px,
        rgba(${A},0.035) 19px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-wave-h 12s linear infinite;
}
@keyframes nf-wave-h {
    from { transform: translateY(0); }
    to   { transform: translateY(38px); }
}

/* ─── Pattern: Binary Dots ─── */
.nf-pat-binary {
    position: absolute;
    inset: -70px;
    will-change: transform;
    background-image:
        radial-gradient(circle, rgba(${P},0.07) 1.5px, transparent 1.5px),
        radial-gradient(circle, rgba(${A},0.05) 1px, transparent 1px);
    background-size: 18px 22px, 30px 36px;
    background-position: 0 0, 9px 11px;
    pointer-events: none;
    z-index: 0;
    animation: nf-binary-fall 15s linear infinite;
}
@keyframes nf-binary-fall {
    from { transform: translateY(0); }
    to   { transform: translateY(-66px); }
}

/* ─── Pattern: Crosshatch Fine Lines ─── */
.nf-pat-crosshatch {
    position: absolute;
    inset: 0;
    background:
        repeating-linear-gradient(
            45deg, transparent, transparent 40px,
            rgba(${P},0.03) 40px, rgba(${P},0.03) 41px
        ),
        repeating-linear-gradient(
            -45deg, transparent, transparent 40px,
            rgba(${A},0.025) 40px, rgba(${A},0.025) 41px
        );
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Concentric Ripples ─── */
.nf-pat-ripple-1 {
    position: absolute;
    left: 20%; top: 30%;
    width: 700px; height: 700px;
    transform: translate(-50%, -50%);
    background: repeating-radial-gradient(
        circle, transparent 0px, transparent 30px,
        rgba(${P},0.04) 30px, rgba(${P},0.04) 31px
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
    animation: nf-ripple-grow 8s ease-out infinite;
}
.nf-pat-ripple-2 {
    position: absolute;
    left: 80%; top: 70%;
    width: 550px; height: 550px;
    transform: translate(-50%, -50%);
    background: repeating-radial-gradient(
        circle, transparent 0px, transparent 25px,
        rgba(${A},0.035) 25px, rgba(${A},0.035) 26px
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
    animation: nf-ripple-grow 10s ease-out infinite;
    animation-delay: 3s;
}
@keyframes nf-ripple-grow {
    0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

/* ─── Pattern: Diamond Tiles ─── */
.nf-pat-diamond {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(45deg, rgba(${P},0.035) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(${P},0.035) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(${A},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${A},0.03) 75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 30px, 30px -30px, 30px 0px;
    pointer-events: none;
    z-index: 0;
}

/* ─── Pattern: Plasma Blobs ─── */
.nf-pat-plasma {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at 20% 50%, rgba(${P},0.14) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(${A},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${P},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${A},0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(${P},0.09) 0%, transparent 45%);
    pointer-events: none;
    z-index: 0;
    will-change: opacity;
    animation: nf-plasma 20s ease-in-out infinite alternate;
}
@keyframes nf-plasma {
    0%   { opacity: 0.4; }
    50%  { opacity: 0.7; }
    100% { opacity: 0.5; }
}

/* ─── Pattern: Tech Scan Band ─── */
.nf-pat-techscan {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(${P},0.08) 1.5%,
        rgba(${A},0.04) 2.5%,
        transparent 4%,
        transparent 100%
    );
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    animation: nf-techscan 6s linear infinite;
}
@keyframes nf-techscan {
    from { transform: translateY(-100%); }
    to   { transform: translateY(100%); }
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
    width: 62vw;
    max-width: 750px;
    min-height: 380px;
    max-height: 72vh;
    display: flex;
    flex-direction: column;
    background: rgba(${bgt(8)}, 0.85);
    border: 1.5px solid rgba(${P},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${P},0.15),
        0 0 120px rgba(${P},0.08),
        0 0 200px rgba(${bgt(180)},0.05),
        inset 0 1px 0 rgba(${P},0.1),
        inset 0 0 40px rgba(${P},0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 60px rgba(${P},0.15),
            0 0 120px rgba(${P},0.08),
            0 0 200px rgba(${bgt(180)},0.05),
            inset 0 1px 0 rgba(${P},0.1),
            inset 0 0 40px rgba(${P},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${P},0.25),
            0 0 160px rgba(${P},0.12),
            0 0 250px rgba(${bgt(180)},0.08),
            inset 0 1px 0 rgba(${P},0.15),
            inset 0 0 50px rgba(${P},0.05);
    }
}

/* ─── Brain Neural Visualization ─── */
.nf-brain-wrap {
    position: absolute;
    top: 48px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: calc(100% - 48px);
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.nf-brain-svg {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    filter: drop-shadow(0 0 18px rgba(${A},0.25));
}

@keyframes nf-synapse-pulse {
    0%, 100% { opacity: 0.25; }
    50% { opacity: 1; }
}

@keyframes nf-synapse-pulse-fast {
    0%, 100% { opacity: 0.15; }
    30% { opacity: 1; }
    60% { opacity: 0.3; }
}

@keyframes nf-neuron-flow {
    0% { stroke-dashoffset: 14; }
    100% { stroke-dashoffset: 0; }
}

@keyframes nf-brain-ambient {
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${A},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${A},0.4)); }
}

.nf-brain-svg {
    animation: nf-brain-ambient 5s ease-in-out infinite;
}

/* Thinking streak animation — bright dash races along sulci */
@keyframes nf-think-streak {
    0%   { stroke-dashoffset: 220; opacity: 0; }
    6%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { stroke-dashoffset: -220; opacity: 0; }
}
@keyframes nf-think-streak-rev {
    0%   { stroke-dashoffset: -220; opacity: 0; }
    6%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { stroke-dashoffset: 220; opacity: 0; }
}

.nf-brain-streak {
    mix-blend-mode: screen;
    filter: drop-shadow(0 0 4px currentColor);
}

/* Hot-spot pulse at sulci intersections */
@keyframes nf-hotspot-pulse {
    0%, 100% { r: 2; opacity: 0.25; }
    50% { r: 4.5; opacity: 0.85; }
}

/* Ensure all content floats above the brain */
.nf-core-header,
.nf-terminal,
.nf-log-feed,
.nf-engine-core {
    position: relative;
    z-index: 1;
}

/* Core header */
.nf-core-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 17px 22px 12px;
    border-bottom: 1px solid rgba(${P},0.2);
    background: linear-gradient(180deg, rgba(${P},0.06) 0%, transparent 100%);
}

.nf-core-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'Rajdhani', 'Orbitron', monospace;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1.5px;
}

.nf-core-title-label {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
}

.nf-core-title-val {
    color: ${PL};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${P},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${PH};
    box-shadow: 0 0 8px rgba(${P}, 0.7);
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
    min-width: 58px;
    height: 34px;
    border-radius: 10px;
    padding: 0 8px;
    background: rgba(${P},0.1);
    border: 1px solid rgba(${P},0.3);
    font-family: 'Rajdhani', 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 8px rgba(${P},0.4);
}

/* Terminal log */
.nf-terminal {
    padding: 10px 17px;
    min-height: 100px;
    max-height: 55vh;
    flex: 1;
    overflow-y: auto;
    font-family: 'Rajdhani', 'Share Tech Mono', monospace;
    font-size: 19px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 1.0);
    scrollbar-width: thin;
    scrollbar-color: rgba(${P},0.3) transparent;
}

.nf-terminal::-webkit-scrollbar { width: 4px; }
.nf-terminal::-webkit-scrollbar-track { background: transparent; }
.nf-terminal::-webkit-scrollbar-thumb { background: rgba(${P},0.3); border-radius: 2px; }

.nf-term-line {
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.3s, opacity 0.3s;
}

.nf-term-line.nf-term-active { color: #fff; }
.nf-term-line.nf-term-done { color: rgba(${D}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${P},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${PH}; text-shadow: 0 0 6px rgba(${P},0.4); }

.nf-term-status {
    margin-left: auto;
    font-size: 17px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.nf-term-active .nf-term-status {
    background: rgba(${P},0.12);
    color: ${PL};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${P},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${D}, 0.12);
    color: ${DL};
}

.nf-term-error .nf-term-status {
    background: rgba(239, 68, 68, 0.15);
    color: #f87171;
}

/* Engine Core Visualizer */
.nf-engine-core {
    position: relative;
    height: 185px;
    margin: 0;
    border-top: 1px solid rgba(${P},0.2);
    background: linear-gradient(180deg, rgba(${bgt(5)},0.95) 0%, rgba(${bgt(12)},0.98) 100%);
    overflow: hidden;
}

/* Scanline overlay */
.nf-engine-core::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(${P},0.045) 2px,
        rgba(${P},0.045) 4px
    );
    pointer-events: none;
    z-index: 4;
}

/* HUD Frame */
.nf-engine-frame {
    position: absolute;
    inset: 8px 14px;
    border: 1px solid rgba(${P},0.25);
    border-radius: 3px;
    box-shadow:
        0 0 20px rgba(${P},0.08),
        0 0 40px rgba(${P},0.04),
        inset 0 0 20px rgba(${P},0.02);
    animation: nf-frame-pulse 4s ease-in-out infinite;
}

@keyframes nf-frame-pulse {
    0%, 100% {
        border-color: rgba(${P},0.25);
        box-shadow: 0 0 20px rgba(${P},0.08), inset 0 0 20px rgba(${P},0.02);
    }
    50% {
        border-color: rgba(${P},0.45);
        box-shadow: 0 0 30px rgba(${P},0.15), inset 0 0 30px rgba(${P},0.04);
    }
}

/* Frame corner accents */
.nf-frame-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-style: solid;
    border-color: rgba(${A},0.6);
}
.nf-frame-corner.nf-fc-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.nf-frame-corner.nf-fc-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.nf-frame-corner.nf-fc-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.nf-frame-corner.nf-fc-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

/* Wave SVG */
.nf-engine-waves {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

/* 3D Gear container */
.nf-gear-wrap {
    position: absolute;
    left: 14%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 92px;
    height: 92px;
    z-index: 3;
    perspective: 260px;
}

.nf-gear-spinner {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    animation: nf-gear-rotate 10s linear infinite;
}

@keyframes nf-gear-rotate {
    0%   { transform: rotateY(0deg)   rotateX(18deg); }
    100% { transform: rotateY(360deg) rotateX(18deg); }
}

/* Gear glow aura */
.nf-gear-aura {
    position: absolute;
    left: 14%;
    top: 55%;
    transform: translate(-50%, -50%);
    width: 110px;
    height: 110px;
    background: radial-gradient(circle, rgba(${P},0.25) 0%, rgba(${A},0.08) 40%, transparent 70%);
    border-radius: 50%;
    filter: blur(14px);
    animation: nf-aura-breathe 3s ease-in-out infinite;
    z-index: 2;
}

@keyframes nf-aura-breathe {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50%      { opacity: 1;   transform: translate(-50%, -50%) scale(1.3); }
}

/* ─── Brand row inside engine core ─── */
.nf-engine-brand-inner {
    position: absolute;
    top: 46%;
    left: 18px;
    right: 18px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding-left: 0;
    z-index: 3;
    pointer-events: none;
}

.nf-brand-gear-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter:
        drop-shadow(0 0 4px rgba(${P},1))
        drop-shadow(0 0 12px rgba(${P},0.7))
        drop-shadow(0 0 28px rgba(${P},0.35));
}

.nf-brand-gear-left {
    left: 34px;
}

.nf-brand-gear-right {
    right: 34px;
}

.nf-brand-inner-text {
    font-family: 'Orbitron', 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 900;
    letter-spacing: 8px;
    white-space: nowrap;
    text-transform: uppercase;
    background: linear-gradient(135deg, rgba(${P},1) 0%, rgba(255,255,255,0.95) 45%, rgba(${P},0.9) 70%, rgba(255,255,255,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-text-stroke: 0.5px rgba(255,255,255,0.35);
    filter:
        drop-shadow(0 0 4px rgba(255,255,255,0.9))
        drop-shadow(0 0 12px rgba(${P},0.8))
        drop-shadow(0 0 30px rgba(${P},0.45))
        drop-shadow(0 0 60px rgba(${P},0.2));
    text-align: center;
}

.nf-brand-gear-icon svg { overflow: visible; }

.nf-kinetic-outer  { animation: nf-k-cw  20s linear infinite; transform-origin: 120px 120px; }
.nf-kinetic-mid    { animation: nf-k-ccw 14s linear infinite; transform-origin: 120px 120px; }
.nf-kinetic-inner  { animation: nf-k-cw   8s linear infinite; transform-origin: 120px 120px; }
.nf-kinetic-sub    { animation: nf-k-cw   5s linear infinite; transform-origin: center; }
.nf-kinetic-pulse  { animation: nf-k-pulse 2s ease-in-out infinite; }

@keyframes nf-k-cw   { from { transform: rotate(0deg); }   to { transform: rotate(360deg); } }
@keyframes nf-k-ccw  { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
@keyframes nf-k-pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }

/* Stats bar — SpaceX Mission Control HUD */
.nf-engine-stats {
    position: absolute;
    bottom: 10px;
    left: 12px;
    right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    font-family: 'Share Tech Mono', 'JetBrains Mono', monospace;
    font-size: 12.5px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    z-index: 5;
    border: 1px solid rgba(${P},0.25);
    border-top: 1px solid rgba(${A},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${bgt(6)},0.75) 0%, rgba(${bgt(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${P},0.12), 0 0 24px rgba(${P},0.06), inset 0 1px 0 rgba(${A},0.08);
}

.nf-stat-item {
    display: flex;
    gap: 6px;
    align-items: center;
    padding: 0 10px;
    position: relative;
    white-space: nowrap;
}

.nf-stat-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 15%;
    bottom: 15%;
    width: 1px;
    background: linear-gradient(180deg, transparent, rgba(${P},0.4), transparent);
}

.nf-stat-label {
    color: rgba(${P},0.75);
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 1.8px;
    text-shadow: 0 0 4px rgba(${P},0.3);
    white-space: nowrap;
}
.nf-stat-val {
    color: rgba(${A},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${A},0.7),
        0 0 12px rgba(${A},0.35),
        0 0 20px rgba(${P},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${bgt(8)}, 0.88);
    border: 1px solid rgba(${P},0.2);
    border-radius: 12px;
    padding: 14px 17px;
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: border-color 0.4s, box-shadow 0.4s;
    z-index: 5;
}

.nf-module.nf-active {
    border-color: rgba(${P},0.5);
    box-shadow:
        0 0 30px rgba(${P},0.12),
        0 0 60px rgba(${P},0.06),
        inset 0 0 20px rgba(${P},0.03);
}

.nf-module.nf-done {
    border-color: rgba(${D}, 0.4);
    box-shadow: 0 0 20px rgba(${D}, 0.1);
}

.nf-module::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(${P},0.5), transparent);
    animation: nf-scanline 3s ease-in-out infinite;
}

.nf-module.nf-done::before {
    background: linear-gradient(90deg, transparent, rgba(${D}, 0.5), transparent);
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
    transform: translate(calc(-100% - 246px), calc(-100% - 14px));
    animation-delay: 0.1s;
}
.nf-mod-tr {
    top: 50%;
    left: 50%;
    transform: translate(246px, calc(-100% - 14px));
    animation-delay: 0.2s;
}
.nf-mod-bl {
    top: 50%;
    left: 50%;
    transform: translate(calc(-100% - 246px), 14px);
    animation-delay: 0.3s;
}
.nf-mod-br {
    top: 50%;
    left: 50%;
    transform: translate(246px, 14px);
    animation-delay: 0.4s;
}

.nf-mod-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.nf-mod-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: ${PH};
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${P},0.5), 0 0 16px rgba(${P},0.2);
}

.nf-mod-pct {
    font-size: 19px;
    font-weight: 700;
    font-family: 'JetBrains Mono', monospace;
    color: rgba(255, 255, 255, 0.8);
}

/* ─── Sub-Steps ─── */
.nf-step {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 3px 0;
    font-size: 18px;
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.3s;
    font-family: 'Inter', sans-serif;
}

.nf-step.nf-step-active {
    color: rgba(255, 255, 255, 0.95);
    text-shadow:
        0 0 4px rgba(255,255,255,0.6),
        0 0 10px rgba(${P},0.8),
        0 0 20px rgba(${P},0.5),
        0 0 35px rgba(${P},0.3);
}
.nf-step.nf-step-done {
    color: rgba(${D}, 0.85);
    text-shadow:
        0 0 4px rgba(${D},0.5),
        0 0 12px rgba(${D},0.3);
}
.nf-step.nf-step-error {
    color: rgba(239, 68, 68, 0.9);
    text-shadow:
        0 0 4px rgba(239,68,68,0.5),
        0 0 12px rgba(239,68,68,0.3);
}

.nf-step-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    flex-shrink: 0;
    transition: all 0.3s;
}

.nf-step-active .nf-step-dot {
    background: ${PH};
    box-shadow: 0 0 6px rgba(${P},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${DH};
    box-shadow: 0 0 5px rgba(${D}, 0.5);
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
    max-width: 72px;
}

.nf-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, ${PH}, ${PL});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${P},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${DH}, ${DL});
}

.nf-mod-progress {
    height: 2.5px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    margin-top: 10px;
    overflow: hidden;
}

.nf-mod-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, ${PH}, ${AH});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${P},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${DH}, ${DL});
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
    font-size: 25px;
    font-weight: 800;
    letter-spacing: 7px;
    color: rgba(${P}, 0.35);
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(${P},0.2), 0 0 40px rgba(${P},0.1);
}

.nf-brand-logo {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    border: 2px solid rgba(${P},0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(${bgt(8)},0.8);
    box-shadow: 0 0 20px rgba(${P},0.15);
}

.nf-brand-row {
    display: flex;
    align-items: center;
    gap: 14px;
}

.nf-timer {
    font-size: 18px;
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
    background: rgba(${P}, 0.04);
    border: 1px solid rgba(${P}, 0.15);
    border-radius: 8px;
    color: rgba(${P}, 0.5);
    font-size: 19px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
}

.nf-close-btn:hover {
    background: rgba(${P}, 0.15);
    border-color: rgba(${P}, 0.4);
    color: #fff;
    text-shadow: 0 0 8px rgba(${P},0.5);
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
    stroke: rgba(${P},0.2);
    stroke-width: 4px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.nf-pipe-glow {
    fill: none;
    stroke: rgba(${P},0.3);
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
    fill: rgba(${P},0.9);
    filter: drop-shadow(0 0 6px rgba(${P},0.9));
}

/* ─── Particles ─── */
.nf-particle {
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(${P},0.5);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
    box-shadow: 0 0 4px rgba(${P},0.3);
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
    top: 20px;
    right: 20px;
    z-index: 999998;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid rgba(${P},0.5);
    background: rgba(${bgt(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${PH};
    font-size: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(${P},0.3), 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    animation: nf-toggle-pulse 2.5s ease-in-out infinite;
    font-family: 'Inter', system-ui, sans-serif;
}

#nf-toggle-btn:hover {
    transform: scale(1.1);
    border-color: rgba(${P},0.8);
    box-shadow: 0 0 30px rgba(${P},0.5), 0 4px 16px rgba(0,0,0,0.6);
    background: rgba(${P},0.15);
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
    0%, 100% { box-shadow: 0 0 20px rgba(${P},0.3), 0 4px 12px rgba(0,0,0,0.5); }
    50% { box-shadow: 0 0 30px rgba(${P},0.5), 0 4px 16px rgba(0,0,0,0.5); }
}

/* ─── Corner decorative brackets ─── */
.nf-corner-deco {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: rgba(${P},0.15);
    border-style: solid;
    border-width: 0;
    pointer-events: none;
    z-index: 2;
}
.nf-corner-deco.nf-deco-tl { top: 8px; left: 8px; border-top-width: 1px; border-left-width: 1px; }
.nf-corner-deco.nf-deco-tr { top: 8px; right: 8px; border-top-width: 1px; border-right-width: 1px; }
.nf-corner-deco.nf-deco-bl { bottom: 8px; left: 8px; border-bottom-width: 1px; border-left-width: 1px; }
.nf-corner-deco.nf-deco-br { bottom: 8px; right: 8px; border-bottom-width: 1px; border-right-width: 1px; }

/* ─── Process Step Rows ─── */
.nf-proc-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 0;
    transition: all 0.3s;
    color: rgba(255,255,255,0.25);
}
.nf-proc-num {
    width: 24px;
    font-size: 17px;
    font-weight: 700;
    text-align: right;
    flex-shrink: 0;
    color: rgba(${P},0.35);
}
.nf-proc-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    flex-shrink: 0;
    transition: all 0.3s;
}
.nf-proc-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
}
.nf-proc-badge {
    font-size: 16px;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 3px;
    letter-spacing: 0.3px;
    flex-shrink: 0;
    color: rgba(255,255,255,0.2);
}

/* Process row states */
.nf-proc-active {
    color: #fff;
}
.nf-proc-active .nf-proc-num {
    color: ${PH};
    text-shadow: 0 0 6px rgba(${P},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${PH};
    box-shadow: 0 0 6px rgba(${P},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${P},0.12);
    color: ${PL};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${P},0.3);
}

.nf-proc-done {
    color: rgba(${D},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${D},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${DH};
    box-shadow: 0 0 5px rgba(${D},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${D},0.1);
    color: ${DL};
}

.nf-proc-error {
    color: rgba(239,68,68,0.8);
}
.nf-proc-error .nf-proc-dot { background: #ef4444; }
.nf-proc-error .nf-proc-badge {
    background: rgba(239,68,68,0.1);
    color: #f87171;
}

.nf-proc-skipped {
    opacity: 0.15;
}

    `;
}

function injectStyles() {
    if (styleEl) return;
    styleEl = document.createElement("style");
    styleEl.id = "netflow-overlay-styles";
    styleEl.textContent = buildCss(currentTheme);
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
    stop1.setAttribute("stop-color", `rgba(${currentTheme.rgb},0.9)`);
    const stop2 = document.createElementNS(ns, "stop");
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("stop-color", `rgba(${currentTheme.accentRgb},0.8)`);
    const stop3 = document.createElementNS(ns, "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", `rgba(${currentTheme.rgb},0.9)`);
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

/** Build numbered process step rows inside a container */
function buildProcessRows(container: HTMLElement): void {
    container.innerHTML = "";
    processSteps.forEach((step, i) => {
        const row = document.createElement("div");
        row.className = "nf-proc-row nf-proc-waiting";
        row.id = `nf-proc-${step.stepId}`;
        row.innerHTML = `
            <span class="nf-proc-num">${i + 1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${step.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `;
        container.appendChild(row);
    });
}

/** Rebuild the terminal process rows (after scene count changes) */
function rebuildTerminalDom(): void {
    const terminal = document.getElementById("nf-terminal");
    if (!terminal) return;
    buildProcessRows(terminal);
    // Update counter total
    const counter = document.getElementById("nf-step-counter");
    if (counter) counter.textContent = `0/${processSteps.length}`;
}

function buildBrainSVG(): SVGSVGElement {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "-10 -20 440 380");
    svg.setAttribute("class", "nf-brain-svg");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    const cP = currentTheme.rgb;
    const cA = currentTheme.accentRgb;

    // ── Defs ──
    const defs = document.createElementNS(ns, "defs");

    // Brain body radial gradient
    const bg = document.createElementNS(ns, "radialGradient");
    bg.id = "nfBrainGrad"; bg.setAttribute("cx", "46%"); bg.setAttribute("cy", "40%"); bg.setAttribute("r", "58%");
    bg.innerHTML = `<stop offset="0%" stop-color="rgba(${cA},0.20)"/><stop offset="40%" stop-color="rgba(${cA},0.08)"/><stop offset="100%" stop-color="rgba(${cP},0.02)"/>`;
    defs.appendChild(bg);

    // Cerebellum gradient
    const cg = document.createElementNS(ns, "radialGradient");
    cg.id = "nfCerebGrad"; cg.setAttribute("cx", "50%"); cg.setAttribute("cy", "50%"); cg.setAttribute("r", "60%");
    cg.innerHTML = `<stop offset="0%" stop-color="rgba(${cA},0.14)"/><stop offset="100%" stop-color="rgba(${cP},0.03)"/>`;
    defs.appendChild(cg);

    // Brain glow filter
    const gf = document.createElementNS(ns, "filter");
    gf.id = "nfBrainGlow"; gf.setAttribute("x", "-25%"); gf.setAttribute("y", "-25%"); gf.setAttribute("width", "150%"); gf.setAttribute("height", "150%");
    gf.innerHTML = '<feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>';
    defs.appendChild(gf);

    // Streak glow filter (double-glow for brightness)
    const stf = document.createElementNS(ns, "filter");
    stf.id = "nfStreakGlow"; stf.setAttribute("x", "-80%"); stf.setAttribute("y", "-80%"); stf.setAttribute("width", "260%"); stf.setAttribute("height", "260%");
    stf.innerHTML = '<feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>';
    defs.appendChild(stf);

    // Synapse glow filter
    const sf = document.createElementNS(ns, "filter");
    sf.id = "nfSynGlow"; sf.setAttribute("x", "-120%"); sf.setAttribute("y", "-120%"); sf.setAttribute("width", "340%"); sf.setAttribute("height", "340%");
    sf.innerHTML = '<feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>';
    defs.appendChild(sf);

    svg.appendChild(defs);

    // ═══ Helper ═══
    function mkPath(d: string, stroke: string, sw: number, fill = "none"): SVGPathElement {
        const p = document.createElementNS(ns, "path");
        p.setAttribute("d", d); p.setAttribute("fill", fill);
        p.setAttribute("stroke", stroke); p.setAttribute("stroke-width", String(sw));
        p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round");
        return p;
    }

    // ═══ BRAIN BODY — Realistic side-view with bumpy gyri outline ═══
    const brainGrp = document.createElementNS(ns, "g");
    brainGrp.setAttribute("filter", "url(#nfBrainGlow)");

    // Main brain outline — undulating edges following gyri bumps
    const brainD =
        "M 208 268 " +
        // Temporal lobe underside (bumpy)
        "C 198 260, 180 250, 164 242 C 154 236, 140 232, 128 228 " +
        "C 118 225, 108 220, 100 214 " +
        // Occipital lobe (back)
        "C 88 202, 78 188, 72 172 C 68 158, 66 144, 66 130 " +
        "C 66 118, 68 106, 72 96 " +
        // Parietal lobe top-back — bumpy gyri edge
        "C 76 86, 82 76, 90 68 C 94 64, 100 58, 108 52 " +
        "C 112 49, 118 44, 126 40 C 132 37, 140 34, 150 31 " +
        // Parietal crest — undulating bumps
        "C 156 30, 162 28, 170 27 C 176 26, 182 26, 188 27 " +
        "C 194 28, 200 30, 204 29 C 210 27, 218 26, 226 26 " +
        "C 234 26, 242 28, 248 30 C 254 32, 260 34, 266 38 " +
        // Frontal lobe — bumpy prominent bulge
        "C 274 42, 282 48, 290 56 C 296 62, 302 70, 308 80 " +
        "C 312 88, 316 98, 320 110 C 324 122, 326 134, 326 146 " +
        // Frontal descent
        "C 326 160, 322 172, 316 184 C 310 194, 302 204, 292 212 " +
        // Bottom-front temporal
        "C 280 220, 266 228, 252 236 C 240 244, 228 254, 218 262 " +
        "C 214 266, 210 268, 208 268 Z";

    brainGrp.appendChild(mkPath(brainD, `rgba(${cA},0.42)`, 2.0, "url(#nfBrainGrad)"));

    // Second hemisphere hint (depth effect)
    const hemi2D =
        "M 212 264 " +
        "C 202 256, 186 248, 172 240 C 156 232, 138 226, 124 222 " +
        "C 110 218, 98 208, 88 196 C 78 182, 72 166, 68 148 " +
        "C 66 134, 66 118, 70 104 C 74 92, 82 80, 94 70 " +
        "C 108 58, 126 46, 148 36 C 168 28, 192 26, 216 28 " +
        "C 238 28, 258 34, 274 44 C 292 56, 306 72, 316 92 " +
        "C 324 110, 328 132, 326 154 C 322 174, 314 192, 300 208 " +
        "C 288 220, 268 234, 250 246 C 236 254, 224 262, 212 264 Z";
    brainGrp.appendChild(mkPath(hemi2D, `rgba(${cA},0.12)`, 0.8));

    // Cerebellum (tight horizontal folds)
    brainGrp.appendChild(mkPath(
        "M 164 242 C 154 248, 138 252, 124 248 C 110 244, 102 234, 98 222 C 96 214, 96 206, 100 200",
        `rgba(${cA},0.34)`, 1.4, "url(#nfCerebGrad)"
    ));
    // Cerebellum folds — tight horizontal ridges
    const cbFolds = [
        "M 104 242 C 120 238, 138 242, 154 248",
        "M 102 234 C 118 230, 134 234, 148 240",
        "M 100 226 C 114 222, 130 226, 142 232",
        "M 98 218 C 110 214, 124 218, 136 224",
        "M 100 210 C 110 207, 120 210, 130 216",
    ];
    cbFolds.forEach(d => brainGrp.appendChild(mkPath(d, `rgba(${cA},0.20)`, 0.7)));

    // Brain stem
    brainGrp.appendChild(mkPath(
        "M 204 268 C 202 282, 198 298, 194 316 M 212 268 C 214 282, 218 298, 222 316",
        `rgba(${cA},0.30)`, 2.2
    ));

    // ═══ SULCI / GYRI FOLDS — Dense realistic wrinkle network ═══

    // ─── MAJOR SULCI (deep, thick, prominent grooves) ───
    const majorSulci = [
        // Central sulcus — divides frontal & parietal (deepest vertical)
        "M 198 30 C 196 48, 192 68, 188 92 C 184 118, 182 142, 186 162 C 190 180, 198 200, 208 224",
        // Lateral sulcus / Sylvian fissure — separates temporal lobe
        "M 100 196 C 124 184, 154 172, 190 164 C 226 156, 262 152, 296 160",
        // Parieto-occipital sulcus
        "M 132 36 C 126 56, 118 82, 112 110 C 106 136, 100 162, 96 188",
        // Superior frontal sulcus
        "M 252 32 C 262 52, 274 78, 282 108 C 288 134, 290 158, 286 180",
    ];
    majorSulci.forEach(d => brainGrp.appendChild(mkPath(d, `rgba(${cA},0.34)`, 1.6)));

    // ─── SECONDARY SULCI (medium wrinkles) ───
    const secSulci = [
        // Pre-central sulcus
        "M 220 28 C 222 48, 224 74, 220 102 C 216 130, 218 156, 226 180",
        // Post-central sulcus
        "M 176 28 C 170 50, 164 78, 162 108 C 160 136, 166 162, 174 188",
        // Inferior frontal sulcus
        "M 274 44 C 286 64, 296 92, 302 122 C 306 148, 304 170, 296 192",
        // Intraparietal sulcus
        "M 152 34 C 144 54, 136 80, 132 108 C 128 134, 132 160, 140 184",
        // Superior temporal sulcus
        "M 114 210 C 148 200, 188 192, 228 188 C 262 184, 288 186, 306 194",
        // Inferior temporal sulcus
        "M 128 226 C 160 218, 198 212, 240 210 C 268 208, 290 212, 308 220",
        // Frontal pole inner folds
        "M 310 84 C 318 102, 322 124, 320 148",
        "M 316 96 C 324 114, 326 136, 322 158",
        // Occipital folds
        "M 80 114 C 86 98, 94 82, 106 70",
        "M 76 140 C 80 122, 86 106, 96 92",
        "M 72 164 C 76 148, 82 130, 90 116",
    ];
    secSulci.forEach(d => brainGrp.appendChild(mkPath(d, `rgba(${cA},0.22)`, 1.0)));

    // ─── TERTIARY FOLDS (fine detail wrinkle texture) ───
    const tertFolds = [
        // Frontal lobe details
        "M 240 30 C 244 48, 246 70, 242 92",
        "M 260 38 C 266 56, 270 78, 266 102",
        "M 288 54 C 296 72, 300 94, 296 118",
        "M 306 68 C 312 86, 316 106, 312 128",
        "M 242 104 C 258 100, 276 104, 292 112",
        "M 236 130 C 254 126, 274 128, 292 136",
        "M 230 156 C 250 152, 272 154, 290 162",
        // Parietal lobe details
        "M 162 32 C 156 50, 154 72, 158 94",
        "M 144 40 C 138 58, 136 80, 140 102",
        "M 192 44 C 188 62, 186 84, 190 106",
        "M 162 108 C 180 104, 198 106, 216 114",
        "M 156 134 C 176 130, 196 132, 216 140",
        "M 148 158 C 170 154, 192 156, 214 164",
        // Temporal lobe fine wrinkles
        "M 136 214 C 154 210, 174 208, 194 210",
        "M 194 210 C 214 208, 236 212, 254 218",
        "M 150 230 C 172 226, 194 224, 214 228",
        "M 214 228 C 234 226, 254 230, 268 236",
        "M 162 244 C 182 240, 202 238, 220 242",
        // Occipital fine detail
        "M 84 148 C 88 134, 94 120, 102 108",
        "M 78 170 C 82 156, 88 142, 96 130",
        "M 92 88 C 100 76, 110 66, 122 58",
        "M 86 100 C 94 90, 104 80, 116 72",
        // Cross-connections between lobes
        "M 112 172 C 140 164, 170 158, 200 156",
        "M 200 156 C 230 154, 260 158, 284 166",
        "M 120 192 C 154 184, 192 178, 230 176",
        "M 230 176 C 258 174, 282 178, 302 186",
        "M 108 152 C 130 146, 156 142, 184 140",
        "M 184 140 C 212 138, 242 142, 268 150",
    ];
    tertFolds.forEach(d => brainGrp.appendChild(mkPath(d, `rgba(${cA},0.13)`, 0.6)));

    svg.appendChild(brainGrp);

    // ═══ THINKING STREAKS — Bright animated dashes racing along sulci ═══
    const streakGrp = document.createElementNS(ns, "g");
    streakGrp.setAttribute("filter", "url(#nfStreakGlow)");

    const streaks = [
        // Major sulci streaks (bright, wide)
        { d: "M 198 30 C 196 48, 192 68, 188 92 C 184 118, 182 142, 186 162 C 190 180, 198 200, 208 224", dur: 3.0, dl: 0, w: 2.8, rev: false },
        { d: "M 100 196 C 124 184, 154 172, 190 164 C 226 156, 262 152, 296 160", dur: 3.4, dl: 1.2, w: 2.5, rev: false },
        { d: "M 132 36 C 126 56, 118 82, 112 110 C 106 136, 100 162, 96 188", dur: 2.8, dl: 0.6, w: 2.5, rev: true },
        { d: "M 252 32 C 262 52, 274 78, 282 108 C 288 134, 290 158, 286 180", dur: 3.2, dl: 2.0, w: 2.5, rev: false },
        // Secondary sulci streaks (medium)
        { d: "M 220 28 C 222 48, 224 74, 220 102 C 216 130, 218 156, 226 180", dur: 2.6, dl: 0.8, w: 2, rev: true },
        { d: "M 176 28 C 170 50, 164 78, 162 108 C 160 136, 166 162, 174 188", dur: 3.0, dl: 1.8, w: 2, rev: false },
        { d: "M 274 44 C 286 64, 296 92, 302 122 C 306 148, 304 170, 296 192", dur: 2.4, dl: 2.8, w: 2, rev: true },
        { d: "M 114 210 C 148 200, 188 192, 228 188 C 262 184, 288 186, 306 194", dur: 3.6, dl: 0.4, w: 2, rev: false },
        // Cross-connection streaks (short, fast)
        { d: "M 162 108 C 180 104, 198 106, 216 114", dur: 1.6, dl: 0.3, w: 1.8, rev: false },
        { d: "M 156 134 C 176 130, 196 132, 216 140", dur: 1.4, dl: 2.2, w: 1.8, rev: true },
        { d: "M 112 172 C 140 164, 170 158, 200 156", dur: 1.8, dl: 1.0, w: 1.8, rev: false },
        { d: "M 200 156 C 230 154, 260 158, 284 166", dur: 1.8, dl: 3.0, w: 1.8, rev: true },
        { d: "M 242 104 C 258 100, 276 104, 292 112", dur: 1.4, dl: 1.6, w: 1.6, rev: false },
        { d: "M 108 152 C 130 146, 156 142, 184 140", dur: 1.6, dl: 3.4, w: 1.6, rev: true },
        { d: "M 184 140 C 212 138, 242 142, 268 150", dur: 1.6, dl: 2.6, w: 1.6, rev: false },
        // Occipital area streaks
        { d: "M 80 114 C 86 98, 94 82, 106 70", dur: 1.2, dl: 0.9, w: 1.8, rev: true },
        { d: "M 72 164 C 76 148, 82 130, 90 116", dur: 1.4, dl: 2.4, w: 1.6, rev: false },
        // Cerebellum streak
        { d: "M 102 234 C 118 230, 134 234, 148 240", dur: 1.0, dl: 3.8, w: 1.5, rev: false },
        { d: "M 100 226 C 114 222, 130 226, 142 232", dur: 1.0, dl: 1.4, w: 1.5, rev: true },
    ];

    streaks.forEach(({ d, dur, dl, w, rev }) => {
        const p = mkPath(d, `rgba(${cP},0.90)`, w);
        p.setAttribute("class", "nf-brain-streak");
        p.style.strokeDasharray = "22 198";
        p.style.animation = `${rev ? "nf-think-streak-rev" : "nf-think-streak"} ${dur}s ease-in-out infinite`;
        p.style.animationDelay = `${dl}s`;
        streakGrp.appendChild(p);
    });

    svg.appendChild(streakGrp);

    // ═══ HOTSPOT NODES — Glowing dots pulsing at sulci intersections ═══
    const synGrp = document.createElementNS(ns, "g");
    synGrp.setAttribute("filter", "url(#nfSynGlow)");

    const hotSpots = [
        // Major sulci intersections
        { x: 190, y: 164, r: 4.5, dl: 0 },     // Central × Lateral
        { x: 112, y: 110, r: 3.8, dl: 0.6 },    // Parieto-occipital mid
        { x: 282, y: 108, r: 3.8, dl: 1.2 },    // Superior frontal mid
        { x: 188, y: 92, r: 3.2, dl: 1.8 },     // Central sulcus upper
        { x: 220, y: 102, r: 3.2, dl: 2.4 },    // Pre-central mid
        { x: 162, y: 108, r: 3.0, dl: 0.3 },    // Post-central mid
        { x: 302, y: 122, r: 2.8, dl: 3.0 },    // Inf. frontal mid
        { x: 228, y: 188, r: 3.2, dl: 1.5 },    // Sup. temporal mid
        { x: 132, y: 108, r: 2.8, dl: 2.0 },    // Intraparietal mid
        // Cortex top junction highlights
        { x: 198, y: 30, r: 2.5, dl: 0.4 },
        { x: 252, y: 32, r: 2.5, dl: 0.8 },
        { x: 132, y: 36, r: 2.5, dl: 1.2 },
        { x: 170, y: 27, r: 2.2, dl: 1.6 },
        { x: 226, y: 26, r: 2.2, dl: 2.0 },
        // Cross-connection intersection highlights
        { x: 200, y: 156, r: 3.0, dl: 2.8 },
        { x: 184, y: 140, r: 2.5, dl: 3.4 },
        { x: 268, y: 150, r: 2.5, dl: 0.2 },
        { x: 108, y: 152, r: 2.5, dl: 1.0 },
        // Brain edge highlights
        { x: 96, y: 188, r: 2.8, dl: 3.6 },
        { x: 286, y: 180, r: 2.8, dl: 0.7 },
        { x: 296, y: 160, r: 2.2, dl: 2.6 },
        { x: 208, y: 224, r: 2.8, dl: 3.2 },
        // Deeper cortex highlights
        { x: 260, y: 76, r: 2.0, dl: 1.9 },
        { x: 150, y: 68, r: 2.0, dl: 3.8 },
        { x: 296, y: 140, r: 2.0, dl: 0.5 },
        { x: 106, y: 148, r: 2.0, dl: 2.2 },
    ];

    hotSpots.forEach(({ x, y, r, dl }) => {
        const circle = document.createElementNS(ns, "circle");
        circle.setAttribute("cx", String(x));
        circle.setAttribute("cy", String(y));
        circle.setAttribute("r", String(r));
        circle.setAttribute("fill", `rgba(${cP},${r > 3.5 ? 0.75 : r > 2.5 ? 0.55 : 0.4})`);
        circle.style.animation = `nf-synapse-pulse ${1.8 + r * 0.5}s ease-in-out infinite`;
        circle.style.animationDelay = `${dl}s`;
        synGrp.appendChild(circle);
    });

    svg.appendChild(synGrp);

    return svg;
}

function buildGearSVG(): SVGSVGElement {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    svg.setAttribute("width", "92");
    svg.setAttribute("height", "92");
    svg.style.filter = `drop-shadow(0 0 8px rgba(${currentTheme.rgb},0.5))`;

    const defs = document.createElementNS(ns, "defs");
    const grad = document.createElementNS(ns, "linearGradient");
    grad.id = "nfGearGrad";
    grad.setAttribute("x1", "0%"); grad.setAttribute("y1", "0%");
    grad.setAttribute("x2", "100%"); grad.setAttribute("y2", "100%");
    const gs1 = document.createElementNS(ns, "stop");
    gs1.setAttribute("offset", "0%"); gs1.setAttribute("stop-color", `rgba(${currentTheme.rgb},0.85)`);
    const gs2 = document.createElementNS(ns, "stop");
    gs2.setAttribute("offset", "50%"); gs2.setAttribute("stop-color", `rgba(${currentTheme.accentRgb},0.75)`);
    const gs3 = document.createElementNS(ns, "stop");
    gs3.setAttribute("offset", "100%"); gs3.setAttribute("stop-color", `rgba(${currentTheme.rgb},0.85)`);
    grad.appendChild(gs1); grad.appendChild(gs2); grad.appendChild(gs3);
    defs.appendChild(grad);
    svg.appendChild(defs);

    const cx = 50, cy = 50;

    // Outer gear ring with cog teeth
    const teeth = 14, outerR = 45, innerR = 37;
    let d = "";
    for (let i = 0; i < teeth; i++) {
        const a = (i / teeth) * Math.PI * 2;
        const ht = (Math.PI * 2 / teeth) / 4;
        const pts: [number, number][] = [
            [cx + innerR * Math.cos(a - ht * 1.3), cy + innerR * Math.sin(a - ht * 1.3)],
            [cx + outerR * Math.cos(a - ht * 0.5), cy + outerR * Math.sin(a - ht * 0.5)],
            [cx + outerR * Math.cos(a + ht * 0.5), cy + outerR * Math.sin(a + ht * 0.5)],
            [cx + innerR * Math.cos(a + ht * 1.3), cy + innerR * Math.sin(a + ht * 1.3)],
        ];
        d += pts.map((p, j) => `${i === 0 && j === 0 ? "M" : "L"} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " ";
    }
    d += "Z";
    const gearPath = document.createElementNS(ns, "path");
    gearPath.setAttribute("d", d);
    gearPath.setAttribute("fill", "none");
    gearPath.setAttribute("stroke", "url(#nfGearGrad)");
    gearPath.setAttribute("stroke-width", "1.5");
    gearPath.setAttribute("stroke-linejoin", "round");
    svg.appendChild(gearPath);

    // Inner ring
    const ring = document.createElementNS(ns, "circle");
    ring.setAttribute("cx", "50"); ring.setAttribute("cy", "50"); ring.setAttribute("r", "30");
    ring.setAttribute("fill", "none"); ring.setAttribute("stroke", `rgba(${currentTheme.rgb},0.35)`); ring.setAttribute("stroke-width", "0.8");
    svg.appendChild(ring);

    // Sacred geometry — Star of David (two overlapping equilateral triangles)
    const triR = 22;
    const upPts = [-Math.PI / 2, Math.PI / 6, 5 * Math.PI / 6].map(a => [cx + triR * Math.cos(a), cy + triR * Math.sin(a)]);
    const upPoly = document.createElementNS(ns, "polygon");
    upPoly.setAttribute("points", upPts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "));
    upPoly.setAttribute("fill", "none"); upPoly.setAttribute("stroke", `rgba(${currentTheme.accentRgb},0.65)`); upPoly.setAttribute("stroke-width", "1.2");
    svg.appendChild(upPoly);

    const dnPts = [Math.PI / 2, -Math.PI / 6, -5 * Math.PI / 6].map(a => [cx + triR * Math.cos(a), cy + triR * Math.sin(a)]);
    const dnPoly = document.createElementNS(ns, "polygon");
    dnPoly.setAttribute("points", dnPts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "));
    dnPoly.setAttribute("fill", "none"); dnPoly.setAttribute("stroke", `rgba(${currentTheme.accentRgb},0.45)`); dnPoly.setAttribute("stroke-width", "1.2");
    svg.appendChild(dnPoly);

    // Inner dashed orbit ring
    const dash = document.createElementNS(ns, "circle");
    dash.setAttribute("cx", "50"); dash.setAttribute("cy", "50"); dash.setAttribute("r", "13");
    dash.setAttribute("fill", "none"); dash.setAttribute("stroke", `rgba(${currentTheme.rgb},0.25)`); dash.setAttribute("stroke-width", "0.5"); dash.setAttribute("stroke-dasharray", "2 2.5");
    svg.appendChild(dash);

    // Decorative inner circle
    const inner2 = document.createElementNS(ns, "circle");
    inner2.setAttribute("cx", "50"); inner2.setAttribute("cy", "50"); inner2.setAttribute("r", "8");
    inner2.setAttribute("fill", "none"); inner2.setAttribute("stroke", `rgba(${currentTheme.accentRgb},0.3)`); inner2.setAttribute("stroke-width", "0.5");
    svg.appendChild(inner2);

    // Center core dot
    const dot = document.createElementNS(ns, "circle");
    dot.setAttribute("cx", "50"); dot.setAttribute("cy", "50"); dot.setAttribute("r", "4.5");
    dot.setAttribute("fill", `rgba(${currentTheme.rgb},0.25)`); dot.setAttribute("stroke", `rgba(${currentTheme.accentRgb},0.7)`); dot.setAttribute("stroke-width", "1");
    svg.appendChild(dot);

    return svg;
}

/**
 * Build a complex sci-fi kinetic engine gear SVG (inline HTML string).
 * Multi-layer: outer teeth (CW), mid sub-gears (CCW), inner ring (CW), chip core (pulse).
 */
function buildKineticGearSVG(P: string, A: string): string {
    const cx = 120, cy = 120;

    // ═══ OUTER RING 1 — 32 sharp precision teeth ═══
    const t1 = 32, t1or = 116, t1ir = 104;
    let teeth1 = "";
    for (let i = 0; i < t1; i++) {
        const a1 = (i / t1) * Math.PI * 2;
        const a2 = ((i + 0.2) / t1) * Math.PI * 2;
        const a3 = ((i + 0.5) / t1) * Math.PI * 2;
        const a4 = ((i + 0.8) / t1) * Math.PI * 2;
        const a5 = ((i + 1) / t1) * Math.PI * 2;
        teeth1 += `${i === 0 ? "M" : "L"}${(cx + t1ir * Math.cos(a1)).toFixed(1)},${(cy + t1ir * Math.sin(a1)).toFixed(1)} `;
        teeth1 += `L${(cx + t1ir * Math.cos(a2)).toFixed(1)},${(cy + t1ir * Math.sin(a2)).toFixed(1)} `;
        teeth1 += `L${(cx + t1or * Math.cos(a3)).toFixed(1)},${(cy + t1or * Math.sin(a3)).toFixed(1)} `;
        teeth1 += `L${(cx + t1ir * Math.cos(a4)).toFixed(1)},${(cy + t1ir * Math.sin(a4)).toFixed(1)} `;
        teeth1 += `L${(cx + t1ir * Math.cos(a5)).toFixed(1)},${(cy + t1ir * Math.sin(a5)).toFixed(1)} `;
    }
    teeth1 += "Z";

    // ═══ OUTER RING 2 — 24 wider teeth (counter-rotating) ═══
    const t2 = 24, t2or = 100, t2ir = 90;
    let teeth2 = "";
    for (let i = 0; i < t2; i++) {
        const a1 = (i / t2) * Math.PI * 2;
        const a2 = ((i + 0.25) / t2) * Math.PI * 2;
        const a3 = ((i + 0.75) / t2) * Math.PI * 2;
        const a4 = ((i + 1) / t2) * Math.PI * 2;
        teeth2 += `${i === 0 ? "M" : "L"}${(cx + t2ir * Math.cos(a1)).toFixed(1)},${(cy + t2ir * Math.sin(a1)).toFixed(1)} `;
        teeth2 += `L${(cx + t2or * Math.cos(a2)).toFixed(1)},${(cy + t2or * Math.sin(a2)).toFixed(1)} `;
        teeth2 += `L${(cx + t2or * Math.cos(a3)).toFixed(1)},${(cy + t2or * Math.sin(a3)).toFixed(1)} `;
        teeth2 += `L${(cx + t2ir * Math.cos(a4)).toFixed(1)},${(cy + t2ir * Math.sin(a4)).toFixed(1)} `;
    }
    teeth2 += "Z";

    // ═══ Precision tick marks — 64 fine ticks around outermost edge ═══
    let ticks = "";
    for (let i = 0; i < 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        const rIn = i % 4 === 0 ? 117 : 119;
        const rOut = i % 4 === 0 ? 124 : 122;
        const sw = i % 4 === 0 ? 0.8 : 0.4;
        const op = i % 4 === 0 ? 0.7 : 0.35;
        ticks += `<line x1="${(cx + rIn * Math.cos(a)).toFixed(1)}" y1="${(cy + rIn * Math.sin(a)).toFixed(1)}" x2="${(cx + rOut * Math.cos(a)).toFixed(1)}" y2="${(cy + rOut * Math.sin(a)).toFixed(1)}" stroke="rgba(${P},${op})" stroke-width="${sw}"/>`;
    }

    // ═══ INNER RING 3 — 26 teeth (80% of outer 32) ═══
    const t3 = 26, t3or = 78, t3ir = 68;
    let teeth3 = "";
    for (let i = 0; i < t3; i++) {
        const a1 = (i / t3) * Math.PI * 2;
        const a2 = ((i + 0.2) / t3) * Math.PI * 2;
        const a3 = ((i + 0.5) / t3) * Math.PI * 2;
        const a4 = ((i + 0.8) / t3) * Math.PI * 2;
        const a5 = ((i + 1) / t3) * Math.PI * 2;
        teeth3 += `${i === 0 ? "M" : "L"}${(cx + t3ir * Math.cos(a1)).toFixed(1)},${(cy + t3ir * Math.sin(a1)).toFixed(1)} `;
        teeth3 += `L${(cx + t3ir * Math.cos(a2)).toFixed(1)},${(cy + t3ir * Math.sin(a2)).toFixed(1)} `;
        teeth3 += `L${(cx + t3or * Math.cos(a3)).toFixed(1)},${(cy + t3or * Math.sin(a3)).toFixed(1)} `;
        teeth3 += `L${(cx + t3ir * Math.cos(a4)).toFixed(1)},${(cy + t3ir * Math.sin(a4)).toFixed(1)} `;
        teeth3 += `L${(cx + t3ir * Math.cos(a5)).toFixed(1)},${(cy + t3ir * Math.sin(a5)).toFixed(1)} `;
    }
    teeth3 += "Z";

    // ═══ Inner tick marks — 48 ticks on inner ring edge ═══
    let innerTicks = "";
    for (let i = 0; i < 48; i++) {
        const a = (i / 48) * Math.PI * 2;
        const rIn = i % 4 === 0 ? 79 : 80;
        const rOut = i % 4 === 0 ? 85 : 83;
        const sw = i % 4 === 0 ? 0.6 : 0.3;
        const op = i % 4 === 0 ? 0.6 : 0.3;
        innerTicks += `<line x1="${(cx + rIn * Math.cos(a)).toFixed(1)}" y1="${(cy + rIn * Math.sin(a)).toFixed(1)}" x2="${(cx + rOut * Math.cos(a)).toFixed(1)}" y2="${(cy + rOut * Math.sin(a)).toFixed(1)}" stroke="rgba(${A},${op})" stroke-width="${sw}"/>`;
    }

    // ═══ 9 Sub-gears packed inside (1 center + 8 surrounding) ═══
    // Helper to build a single mini gear path
    function miniGear(gx: number, gy: number, numTeeth: number, outerR: number, innerR: number): string {
        let d = "";
        for (let i = 0; i < numTeeth; i++) {
            const a1 = (i / numTeeth) * Math.PI * 2;
            const a2 = ((i + 0.25) / numTeeth) * Math.PI * 2;
            const a3 = ((i + 0.75) / numTeeth) * Math.PI * 2;
            const a4 = ((i + 1) / numTeeth) * Math.PI * 2;
            d += `${i === 0 ? "M" : "L"}${(gx + innerR * Math.cos(a1)).toFixed(1)},${(gy + innerR * Math.sin(a1)).toFixed(1)} `;
            d += `L${(gx + outerR * Math.cos(a2)).toFixed(1)},${(gy + outerR * Math.sin(a2)).toFixed(1)} `;
            d += `L${(gx + outerR * Math.cos(a3)).toFixed(1)},${(gy + outerR * Math.sin(a3)).toFixed(1)} `;
            d += `L${(gx + innerR * Math.cos(a4)).toFixed(1)},${(gy + innerR * Math.sin(a4)).toFixed(1)} `;
        }
        return d + "Z";
    }

    // 8 gears in a ring (radius 42 from center) + 1 center gear
    const gearRing = 42;
    const allNineGears: string[] = [];

    // Center gear (#1) — largest, 14 teeth
    const cGearD = miniGear(cx, cy, 14, 18, 13);
    allNineGears.push(`<g class="nf-kinetic-sub" style="transform-origin:${cx}px ${cy}px">
        <path d="${cGearD}" fill="none" stroke="rgba(${P},0.8)" stroke-width="1.2"/>
        <circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="rgba(${A},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="${cx}" cy="${cy}" r="4" fill="rgba(${P},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);

    // 8 surrounding gears (#2-#9) — evenly spaced around center
    for (let g = 0; g < 8; g++) {
        const angle = (g / 8) * Math.PI * 2;
        const gx = cx + gearRing * Math.cos(angle);
        const gy = cy + gearRing * Math.sin(angle);
        const numT = 10;
        const gd = miniGear(gx, gy, numT, 14, 10);
        const reverse = g % 2 === 0 ? "" : "animation-direction:reverse;";
        allNineGears.push(`<g class="nf-kinetic-sub" style="transform-origin:${gx.toFixed(1)}px ${gy.toFixed(1)}px;${reverse}">
            <path d="${gd}" fill="none" stroke="rgba(${A},0.6)" stroke-width="0.9"/>
            <circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="7" fill="none" stroke="rgba(${P},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="2.5" fill="rgba(${P},0.6)"/>
        </g>`);
    }
    const nineGearsHTML = allNineGears.join("\n");

    // ═══ Connecting spokes from center to each surrounding gear ═══
    let spokes = "";
    for (let g = 0; g < 8; g++) {
        const angle = (g / 8) * Math.PI * 2;
        const x1 = cx + 10 * Math.cos(angle), y1 = cy + 10 * Math.sin(angle);
        const x2 = cx + (gearRing - 10) * Math.cos(angle), y2 = cy + (gearRing - 10) * Math.sin(angle);
        spokes += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(${A},0.25)" stroke-width="0.5"/>`;
    }

    return `<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${P},0.95)"/>
                <stop offset="50%" stop-color="rgba(${A},0.75)"/>
                <stop offset="100%" stop-color="rgba(${P},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${A},0.8)"/>
                <stop offset="100%" stop-color="rgba(${P},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${P},0.85)"/>
                <stop offset="50%" stop-color="rgba(${A},0.65)"/>
                <stop offset="100%" stop-color="rgba(${P},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${P},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${P},0.2)" stroke-width="0.2"/>
        </g>
        ${ticks}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${teeth1}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${t1ir}" fill="none" stroke="rgba(${P},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${teeth2}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${t2ir}" fill="none" stroke="rgba(${A},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${teeth3}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${t3ir}" fill="none" stroke="rgba(${P},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${A},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${innerTicks}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${P},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${A},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${spokes}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${nineGearsHTML}
        </g>
    </svg>`;
}

function buildOverlay(): HTMLDivElement {
    const root = document.createElement("div");
    root.id = "netflow-engine-overlay";

    // ═══ MATRIX RAIN CANVAS (background layer) ═══
    matrixCanvas = document.createElement("canvas");
    matrixCanvas.id = "nf-matrix-canvas";
    root.appendChild(matrixCanvas);

    // ═══ ANIMATED BACKGROUND PATTERNS (full set — 3x density) ═══

    // Plasma blobs (screen blend, soft morphing)
    const plasma = document.createElement("div");
    plasma.className = "nf-pat-plasma";
    root.appendChild(plasma);

    // 8 Ambient orbs (drifting glow spheres)
    for (let i = 1; i <= 5; i++) {
        const orb = document.createElement("div");
        orb.className = `nf-ambient-orb nf-orb-${i}`;
        root.appendChild(orb);
    }

    // Data stream columns (scrolling up)
    const dataPat = document.createElement("div");
    dataPat.className = "nf-pat-data";
    root.appendChild(dataPat);

    // Diagonal traces A & B
    const diagA = document.createElement("div");
    diagA.className = "nf-pat-diag-a";
    root.appendChild(diagA);
    const diagB = document.createElement("div");
    diagB.className = "nf-pat-diag-b";
    root.appendChild(diagB);

    // Circuit board traces
    const circuit = document.createElement("div");
    circuit.className = "nf-pat-circuit";
    root.appendChild(circuit);

    // Honeycomb hex
    const honeycomb = document.createElement("div");
    honeycomb.className = "nf-pat-honeycomb";
    root.appendChild(honeycomb);

    // Binary dots
    const binary = document.createElement("div");
    binary.className = "nf-pat-binary";
    root.appendChild(binary);

    // Crosshatch fine lines
    const crosshatch = document.createElement("div");
    crosshatch.className = "nf-pat-crosshatch";
    root.appendChild(crosshatch);

    // Diamond tiles
    const diamond = document.createElement("div");
    diamond.className = "nf-pat-diamond";
    root.appendChild(diamond);

    // Horizontal wave lines
    const waveH = document.createElement("div");
    waveH.className = "nf-pat-wave-h";
    root.appendChild(waveH);

    // Radar sweep
    const radar = document.createElement("div");
    radar.className = "nf-pat-radar";
    root.appendChild(radar);

    // Concentric ripples (2 sources)
    const ripple1 = document.createElement("div");
    ripple1.className = "nf-pat-ripple-1";
    root.appendChild(ripple1);
    const ripple2 = document.createElement("div");
    ripple2.className = "nf-pat-ripple-2";
    root.appendChild(ripple2);

    // Tech scan band
    const techscan = document.createElement("div");
    techscan.className = "nf-pat-techscan";
    root.appendChild(techscan);

    // Center glow pulse
    const centerGlow = document.createElement("div");
    centerGlow.className = "nf-center-glow";
    root.appendChild(centerGlow);

    // Noise grain texture
    const noise = document.createElement("div");
    noise.className = "nf-pat-noise";
    root.appendChild(noise);

    // CRT scanlines
    const crt = document.createElement("div");
    crt.className = "nf-crt-scanlines";
    root.appendChild(crt);

    // ═══ VIGNETTE OVERLAY ═══
    const vignette = document.createElement("div");
    vignette.className = "nf-vignette";
    root.appendChild(vignette);

    // ═══ PULSE RINGS (expanding from center) ═══
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement("div");
        ring.className = "nf-pulse-ring";
        root.appendChild(ring);
    }

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

    // SVG Pipe connections removed

    // Central Core Monitor
    const core = document.createElement("div");
    core.className = "nf-core-monitor";
    core.id = "nf-core-monitor";

    // Header
    const header = document.createElement("div");
    header.className = "nf-core-header";
    header.innerHTML = `
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${processSteps.length}</div>
    `;
    core.appendChild(header);

    // Process Steps Terminal
    const terminal = document.createElement("div");
    terminal.className = "nf-terminal";
    terminal.id = "nf-terminal";
    buildProcessRows(terminal);
    core.appendChild(terminal);

    // Engine Core Visualizer — 3D gear + waves + HUD frame + stats
    const engineCore = document.createElement("div");
    engineCore.className = "nf-engine-core";
    engineCore.id = "nf-engine-core";

    // HUD Frame with corner accents
    const frame = document.createElement("div");
    frame.className = "nf-engine-frame";
    ["nf-fc-tl", "nf-fc-tr", "nf-fc-bl", "nf-fc-br"].forEach(cls => {
        const corner = document.createElement("div");
        corner.className = `nf-frame-corner ${cls}`;
        frame.appendChild(corner);
    });
    engineCore.appendChild(frame);

    // Wave SVG layer (6 animated wave paths)
    const wNs = "http://www.w3.org/2000/svg";
    const waveSvg = document.createElementNS(wNs, "svg");
    waveSvg.setAttribute("class", "nf-engine-waves");
    waveSvg.setAttribute("viewBox", "0 0 560 140");
    waveSvg.setAttribute("preserveAspectRatio", "none");
    waveSvg.id = "nf-engine-waves";
    for (let w = 0; w < 4; w++) {
        const path = document.createElementNS(wNs, "path");
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-width", w < 2 ? "1.5" : "1");
        path.setAttribute("stroke", w < 2
            ? `rgba(${currentTheme.rgb},${0.14 + w * 0.10})`
            : `rgba(${currentTheme.accentRgb},${0.10 + (w - 2) * 0.08})`);
        path.setAttribute("data-wave-idx", String(w));
        waveSvg.appendChild(path);
    }
    engineCore.appendChild(waveSvg);

    // Brand row inside engine core (above stats)
    const brandInner = document.createElement("div");
    brandInner.className = "nf-engine-brand-inner";
    brandInner.innerHTML = `
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${buildKineticGearSVG(currentTheme.rgb, currentTheme.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${buildKineticGearSVG(currentTheme.rgb, currentTheme.accentRgb)}
        </div>
    `;
    engineCore.appendChild(brandInner);

    // Stats bar (real data: SCENES / ELAPSED / STEP / STATUS / PROGRESS)
    const statsBar = document.createElement("div");
    statsBar.className = "nf-engine-stats";
    statsBar.id = "nf-engine-stats";
    statsBar.innerHTML = [
        ["SCENES", "nf-stat-scenes", "1/1"],
        ["ELAPSED", "nf-stat-elapsed", "00:00"],
        ["STEP", "nf-stat-step", "0/0"],
        ["STATUS", "nf-stat-status", "READY"],
        ["PROGRESS", "nf-stat-progress", "—"],
    ].map(([label, id, val]) =>
        `<div class="nf-stat-item"><span class="nf-stat-label">${label}</span><span class="nf-stat-val" id="${id}">${val}</span></div>`
    ).join("");
    engineCore.appendChild(statsBar);

    core.appendChild(engineCore);

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

    // Floating particles (green matrix style)
    for (let i = 0; i < 30; i++) {
        const p = document.createElement("div");
        p.className = "nf-particle";
        p.style.left = `${5 + Math.random() * 90}%`;
        p.style.bottom = `${Math.random() * 40}%`;
        p.style.animationDuration = `${3 + Math.random() * 5}s`;
        p.style.animationDelay = `${Math.random() * 4}s`;
        const brightness = 0.3 + Math.random() * 0.4;
        const _pr = 0.7 + Math.random() * 0.3;
        p.style.background = `rgba(${Math.floor(_themeR * _pr)}, ${Math.floor(_themeG * _pr)}, ${Math.floor(_themeB * _pr)}, ${brightness})`;
        p.style.width = `${1 + Math.random() * 2}px`;
        p.style.height = p.style.width;
        root.appendChild(p);
    }

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
        // Also update stats bar elapsed
        const elapsedStat = document.getElementById("nf-stat-elapsed");
        if (elapsedStat) elapsedStat.textContent = `${mm}:${ss}`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

// ── Plexus / Neural Network Background Animation ──────────────────────────

interface PlexusNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    pulsePhase: number;
    pulseSpeed: number;
    // Motion pattern
    motion: number; // 0=drift, 1=orbit, 2=swirl, 3=figure8
    // Orbit/swirl params
    oCx: number; // orbit center x
    oCy: number; // orbit center y
    oRadius: number; // orbit radius
    oAngle: number; // current angle
    oSpeed: number; // angular speed (rad/frame)
}

const PLEXUS_COUNT = 120;
const PLEXUS_LINK_DIST = 160;
const PLEXUS_SPEED = 0.4;
let _glowSprite: HTMLCanvasElement | null = null;
let _glowSpriteR = 0; let _glowSpriteG = 0; let _glowSpriteB = 0;
let plexusNodes: PlexusNode[] = [];

function _initPlexusNodes(w: number, h: number): void {
    plexusNodes = [];
    for (let i = 0; i < PLEXUS_COUNT; i++) {
        const roll = Math.random();
        let motion: number;
        if (roll < 0.22) motion = 0;      // 22% drift (linear float)
        else if (roll < 0.40) motion = 1;  // 18% orbit (circle)
        else if (roll < 0.55) motion = 2;  // 15% swirl (ellipse)
        else if (roll < 0.68) motion = 3;  // 13% figure-8
        else if (roll < 0.84) motion = 4;  // 16% spiral-inward
        else motion = 5;                    // 16% sine-wave drift

        const cx = Math.random() * w;
        const cy = Math.random() * h;
        const oRadius = 50 + Math.random() * 220;
        const oAngle = Math.random() * Math.PI * 2;
        const oSpeed = (0.003 + Math.random() * 0.008) * (Math.random() > 0.5 ? 1 : -1);

        plexusNodes.push({
            x: motion === 0 ? Math.random() * w : cx + Math.cos(oAngle) * oRadius,
            y: motion === 0 ? Math.random() * h : cy + Math.sin(oAngle) * oRadius,
            vx: (Math.random() - 0.5) * PLEXUS_SPEED,
            vy: (Math.random() - 0.5) * PLEXUS_SPEED,
            radius: 1.2 + Math.random() * 2.5,
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            motion,
            oCx: cx,
            oCy: cy,
            oRadius,
            oAngle,
            oSpeed,
        });
    }
}

function initMatrixRain() {
    if (!matrixCanvas) return;
    const canvas = matrixCanvas;
    matrixCtx = canvas.getContext("2d");
    if (!matrixCtx) return;

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-init only if nodes don't exist yet or screen changed drastically
        if (plexusNodes.length === 0) {
            _initPlexusNodes(canvas.width, canvas.height);
        }
    };
    resize();
    window.addEventListener("resize", resize);

    // Cache depth gradient (recreate on resize)
    let _bgGrad: CanvasGradient | null = null;
    let _bgW = 0, _bgH = 0;

    function drawPlexus() {
        if (!matrixCtx || !matrixCanvas) { matrixAnimFrame = null; return; }
        matrixAnimFrame = requestAnimationFrame(drawPlexus);
        // No frame skip — run at full 60fps for smooth motion

        const ctx = matrixCtx;
        const w = matrixCanvas.width;
        const h = matrixCanvas.height;

        // Clear with dark background
        ctx.fillStyle = `rgba(${(_themeR * 0.04) | 0},${(_themeG * 0.04) | 0},${(_themeB * 0.06) | 0},1)`;
        ctx.fillRect(0, 0, w, h);

        // Cache depth gradient (only recreate if size changed)
        if (!_bgGrad || _bgW !== w || _bgH !== h) {
            _bgW = w; _bgH = h;
            _bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.6);
            _bgGrad.addColorStop(0, `rgba(${(_themeR * 0.08) | 0},${(_themeG * 0.08) | 0},${(_themeB * 0.1) | 0},0.4)`);
            _bgGrad.addColorStop(1, `rgba(0,0,0,0)`);
        }
        ctx.fillStyle = _bgGrad;
        ctx.fillRect(0, 0, w, h);

        const nodes = plexusNodes;
        const len = nodes.length;
        const linkDist2 = PLEXUS_LINK_DIST * PLEXUS_LINK_DIST;

        // ── Move particles ──
        for (let i = 0; i < len; i++) {
            const n = nodes[i];
            n.pulsePhase += n.pulseSpeed;

            if (n.motion === 0) {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx) * (0.8 + Math.random() * 0.4); }
                else if (n.x > w) { n.x = w; n.vx = -Math.abs(n.vx) * (0.8 + Math.random() * 0.4); }
                if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy) * (0.8 + Math.random() * 0.4); }
                else if (n.y > h) { n.y = h; n.vy = -Math.abs(n.vy) * (0.8 + Math.random() * 0.4); }
            } else if (n.motion === 1) {
                n.oAngle += n.oSpeed;
                n.x = n.oCx + Math.cos(n.oAngle) * n.oRadius;
                n.y = n.oCy + Math.sin(n.oAngle) * n.oRadius;
                n.oCx += Math.sin(n.oAngle * 0.3) * 0.15;
                n.oCy += Math.cos(n.oAngle * 0.3) * 0.15;
            } else if (n.motion === 2) {
                n.oAngle += n.oSpeed;
                n.x = n.oCx + Math.cos(n.oAngle) * n.oRadius;
                n.y = n.oCy + Math.sin(n.oAngle) * n.oRadius * 0.5;
                n.oCx += Math.sin(n.oAngle * 0.2) * 0.1;
                n.oCy += Math.cos(n.oAngle * 0.2) * 0.1;
            } else if (n.motion === 3) {
                // Figure-8 (lemniscate)
                n.oAngle += n.oSpeed;
                const a = n.oAngle;
                const r8 = n.oRadius * 0.7;
                n.x = n.oCx + r8 * Math.cos(a);
                n.y = n.oCy + r8 * Math.sin(a) * Math.cos(a);
                n.oCx += Math.sin(a * 0.15) * 0.12;
                n.oCy += Math.cos(a * 0.15) * 0.12;
            } else if (n.motion === 4) {
                // Spiral-inward: shrinking orbit then reset outward
                n.oAngle += n.oSpeed * 1.2;
                const shrink = n.oRadius * (0.5 + 0.5 * Math.abs(Math.sin(n.oAngle * 0.15)));
                n.x = n.oCx + Math.cos(n.oAngle) * shrink;
                n.y = n.oCy + Math.sin(n.oAngle) * shrink;
                n.oCx += Math.sin(n.oAngle * 0.1) * 0.18;
                n.oCy += Math.cos(n.oAngle * 0.1) * 0.18;
            } else {
                // Sine-wave drift: horizontal flow with vertical wave
                n.oAngle += n.oSpeed;
                n.x += n.vx * 0.8;
                n.y = n.oCy + Math.sin(n.oAngle + n.x * 0.008) * n.oRadius * 0.35;
                // Wrap horizontally
                if (n.x < -30) n.x = w + 30;
                else if (n.x > w + 30) n.x = -30;
                n.oCy += Math.sin(n.oAngle * 0.1) * 0.08;
            }

            if (n.motion > 0) {
                const margin = n.oRadius + 50;
                if (n.oCx < -margin) n.oCx = w + margin;
                else if (n.oCx > w + margin) n.oCx = -margin;
                if (n.oCy < -margin) n.oCy = h + margin;
                else if (n.oCy > h + margin) n.oCy = -margin;
            }
        }

        // ── Draw lines: 2 buckets (dim + bright) for fewer state changes ──
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${_themeR},${_themeG},${_themeB},0.06)`;
        ctx.lineWidth = 0.4;
        const linePath2 = new Path2D();
        for (let i = 0; i < len; i++) {
            const a = nodes[i];
            for (let j = i + 1; j < len; j++) {
                const bNode = nodes[j];
                const dx = a.x - bNode.x;
                const dy = a.y - bNode.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < linkDist2) {
                    const ratio = 1 - d2 / linkDist2; // approximate (skip sqrt)
                    if (ratio < 0.4) {
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(bNode.x, bNode.y);
                    } else {
                        linePath2.moveTo(a.x, a.y);
                        linePath2.lineTo(bNode.x, bNode.y);
                    }
                }
            }
        }
        ctx.stroke();
        ctx.strokeStyle = `rgba(${_themeR},${_themeG},${_themeB},0.18)`;
        ctx.lineWidth = 0.8;
        ctx.stroke(linePath2);

        // ── Draw particles using pre-rendered glow sprite (no shadowBlur) ──
        // Rebuild glow sprite if theme changed
        if (!_glowSprite || _glowSpriteR !== _themeR || _glowSpriteG !== _themeG || _glowSpriteB !== _themeB) {
            _glowSprite = document.createElement('canvas');
            const sz = 48;
            _glowSprite.width = sz; _glowSprite.height = sz;
            const gc = _glowSprite.getContext('2d')!;
            const grad = gc.createRadialGradient(sz/2, sz/2, 0, sz/2, sz/2, sz/2);
            grad.addColorStop(0, `rgba(${_themeR},${_themeG},${_themeB},0.9)`);
            grad.addColorStop(0.3, `rgba(${_themeR},${_themeG},${_themeB},0.35)`);
            grad.addColorStop(1, `rgba(${_themeR},${_themeG},${_themeB},0)`);
            gc.fillStyle = grad;
            gc.fillRect(0, 0, sz, sz);
            _glowSpriteR = _themeR; _glowSpriteG = _themeG; _glowSpriteB = _themeB;
        }

        // Glow layer — drawImage of cached sprite (GPU-composited, no shadowBlur)
        const sprite = _glowSprite;
        for (let i = 0; i < len; i++) {
            const n = nodes[i];
            const pulse = 0.6 + 0.4 * Math.sin(n.pulsePhase);
            const sz = (n.radius * 5) * (0.8 + pulse * 0.4);
            ctx.globalAlpha = 0.5 + pulse * 0.4;
            ctx.drawImage(sprite, n.x - sz / 2, n.y - sz / 2, sz, sz);
        }
        ctx.globalAlpha = 1;

        // Bright inner dots — batched into one path
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.beginPath();
        for (let i = 0; i < len; i++) {
            const n = nodes[i];
            if (n.radius > 2) {
                const pulse = 0.6 + 0.4 * Math.sin(n.pulsePhase);
                const r = n.radius * (0.8 + pulse * 0.4) * 0.35;
                ctx.moveTo(n.x + r, n.y);
                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
            }
        }
        ctx.fill();
    }

    drawPlexus();
}

function stopMatrixRain() {
    if (matrixAnimFrame !== null) {
        cancelAnimationFrame(matrixAnimFrame);
        matrixAnimFrame = null;
    }
    matrixCanvas = null;
    matrixCtx = null;
    matrixColumns = [];
    plexusNodes = [];
}

// ── Engine Core Wave Animation ────────────────────────────────────────────

let _wavePaths: SVGPathElement[] | null = null;
const _W = 560, _H = 140, _CX = _W / 2, _HH = _H / 2;
// Pre-compute fade table for wave (step=8, x: 0..560)
const _waveFade: number[] = [];
for (let x = 0; x <= _W; x += 8) {
    const dist = Math.abs(x - _CX) / _CX;
    _waveFade.push(Math.pow(Math.min(1, dist * 1.6), 0.6));
}
// Pre-compute wave constants per path index
const _waveConst = [0, 1, 2, 3].map(idx => ({
    amp: 10 + idx * 5,
    freq: (1.2 + idx * 0.35) * Math.PI * 2 / _W,
    off: idx * 0.6,
    spd: 0.7 + idx * 0.12,
}));

function animateEngineCoreWaves() {
    waveAnimFrame = requestAnimationFrame(animateEngineCoreWaves);
    wavePhase += 0.035;

    // Cache path references once
    if (!_wavePaths) {
        const svg = document.getElementById("nf-engine-waves");
        if (!svg) { waveAnimFrame = null; return; }
        _wavePaths = Array.from(svg.querySelectorAll("path")) as SVGPathElement[];
    }

    const parts: string[] = [];
    for (let pi = 0; pi < _wavePaths.length; pi++) {
        const c = _waveConst[pi];
        const phase = wavePhase * c.spd + c.off;
        parts.length = 0;
        parts.push(`M 0 ${_HH}`);
        let fi = 0;
        for (let x = 0; x <= _W; x += 8) {
            const y = _HH + c.amp * _waveFade[fi++] * Math.sin(x * c.freq + phase);
            parts.push(`L${x} ${(y * 10 + 0.5) | 0}`);  // fast round via bitwise
        }
        _wavePaths[pi].setAttribute("d", parts.join(' '));
    }
}

function startVisualizer() {
    wavePhase = 0;
    animateEngineCoreWaves();
    initMatrixRain();
    statsInterval = setInterval(() => {
        const f = document.getElementById("nf-stat-freq");
        const l1 = document.getElementById("nf-stat-lat1");
        const l2 = document.getElementById("nf-stat-lat2");
        const b = document.getElementById("nf-stat-buf");
        if (f) f.textContent = `${(4.5 + Math.random() * 0.5).toFixed(1)} GHz`;
        if (l1) l1.textContent = `${Math.floor(12 + Math.random() * 10)}ms`;
        if (l2) l2.textContent = `${Math.floor(12 + Math.random() * 10)}ms`;
        if (b) b.textContent = `${Math.floor(90 + Math.random() * 9)}%`;
    }, 2000);
}

function stopVisualizer() {
    if (waveAnimFrame !== null) { cancelAnimationFrame(waveAnimFrame); waveAnimFrame = null; }
    if (statsInterval) { clearInterval(statsInterval); statsInterval = null; }
    _wavePaths = null;
    stopMatrixRain();
}

// ── Terminal refresh ──────────────────────────────────────────────────────

function refreshTerminal() {
    let doneCount = 0;
    const nonSkipped = processSteps.filter(s => s.status !== "skipped").length;

    for (const step of processSteps) {
        const row = document.getElementById(`nf-proc-${step.stepId}`);
        if (!row) continue;

        row.className = "nf-proc-row";
        const badge = row.querySelector(".nf-proc-badge") as HTMLElement | null;

        switch (step.status) {
            case "done":
                row.classList.add("nf-proc-done");
                if (badge) badge.textContent = "\u2705 done";
                doneCount++;
                break;
            case "active":
                row.classList.add("nf-proc-active");
                if (badge) badge.textContent = step.progress !== undefined && step.progress > 0
                    ? `\u23f3 ${step.progress}%` : "\u23f3 active";
                break;
            case "error":
                row.classList.add("nf-proc-error");
                if (badge) badge.textContent = "\u274c error";
                break;
            case "skipped":
                row.classList.add("nf-proc-skipped");
                if (badge) badge.textContent = "\u2014 skip";
                break;
            default:
                row.classList.add("nf-proc-waiting");
                if (badge) badge.textContent = "(queued)";
        }
    }

    // Update counter
    activeStepCount = doneCount;
    const counter = document.getElementById("nf-step-counter");
    if (counter) counter.textContent = `${doneCount}/${processSteps.length}`;

    // Update core title based on overall state
    const titleVal = document.querySelector(".nf-core-title-val") as HTMLElement | null;
    const statusDot = document.querySelector(".nf-status-dot") as HTMLElement | null;
    if (doneCount >= nonSkipped && nonSkipped > 0) {
        if (titleVal) { titleVal.textContent = "COMPLETE"; titleVal.style.color = currentTheme.doneHex; }
        if (statusDot) { statusDot.style.background = currentTheme.doneHex; statusDot.style.boxShadow = `0 0 8px rgba(${currentTheme.doneRgb},0.7)`; }
    } else {
        const hasError = processSteps.some(s => s.status === "error");
        if (hasError) {
            if (titleVal) { titleVal.textContent = "ERROR"; titleVal.style.color = "#f87171"; }
            if (statusDot) { statusDot.style.background = "#ef4444"; statusDot.style.boxShadow = "0 0 8px rgba(239,68,68,0.7)"; }
        } else if (processSteps.some(s => s.status === "active")) {
            if (titleVal) { titleVal.textContent = "ACTIVE"; titleVal.style.color = currentTheme.hex; titleVal.style.textShadow = `0 0 10px rgba(${currentTheme.rgb},0.5)`; }
        }
    }

    // Auto-scroll terminal to active step
    const terminal = document.getElementById("nf-terminal");
    const activeRow = terminal?.querySelector(".nf-proc-active") as HTMLElement | null;
    if (activeRow && terminal) {
        activeRow.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

// ── Toggle Button Builder ──────────────────────────────────────────────────

function ensureToggleButton(): void {
    // Check if button is still in DOM (page navigation destroys it)
    if (toggleBtn && toggleBtn.isConnected) return;
    injectStyles();
    toggleBtn = document.createElement("button");
    toggleBtn.id = "nf-toggle-btn";
    toggleBtn.className = "nf-toggle-visible";
    toggleBtn.innerHTML = overlayHidden ? "⚡" : "✕";
    toggleBtn.title = "ซ่อน/แสดง Netflow Overlay";
    toggleBtn.onclick = () => toggleOverlayVisibility();
    document.body.appendChild(toggleBtn);
}

/** Toggle overlay: hide ↔ show */
function toggleOverlayVisibility(): void {
    if (!overlayRoot) return;
    ensureToggleButton();

    if (!overlayHidden) {
        // Hide overlay (toggle button stays visible)
        overlayRoot.classList.remove("nf-visible");
        overlayRoot.classList.add("nf-hidden");
        if (toggleBtn) toggleBtn.innerHTML = "⚡";
        overlayHidden = true;
    } else {
        // Show overlay (toggle button stays visible)
        overlayRoot.classList.remove("nf-hidden");
        overlayRoot.classList.add("nf-visible");
        if (toggleBtn) toggleBtn.innerHTML = "✕";
        overlayHidden = false;
    }
}

// ── Theme image backgrounds for Core Monitor ────────────────────────────────
const THEME_IMAGES: Record<string, string> = {
    red:    "themes/theme-red.jpg",
    yellow: "themes/theme-yellow.jpg",
    blue:   "themes/theme-blue.jpg",
    purple: "themes/theme-purple.jpg",
    green:  "themes/theme-green.jpg",
};

function applyCoreBg(): void {
    const monitor = document.getElementById("nf-core-monitor");
    if (!monitor) return;
    // Resolve correct theme key (try override → localStorage → default)
    let key = _themeKeyOverride;
    if (!key) {
        try { key = localStorage.getItem("netflow_app_theme") || "red"; } catch { key = "red"; }
    }
    const file = THEME_IMAGES[key] || THEME_IMAGES["red"];
    if (!file) return;
    let imgUrl: string;
    try {
        imgUrl = (chrome as any).runtime.getURL(file);
    } catch {
        imgUrl = `/${file}`; // dev preview fallback
    }
    const P = currentTheme.rgb;
    // 3-layer stack: dark overlay → theme color tint → background image
    monitor.style.backgroundImage = [
        `linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)`,
        `linear-gradient(180deg, rgba(${P},0.25) 0%, rgba(${P},0.12) 50%, rgba(${P},0.20) 100%)`,
        `url('${imgUrl}')`,
    ].join(", ");
    monitor.style.backgroundSize = "auto, auto, cover";
    monitor.style.backgroundPosition = "center, center, center";
    monitor.style.backgroundRepeat = "no-repeat, no-repeat, no-repeat";
    monitor.style.setProperty("--nf-bg-set", "1");
    // Enhance border glow for image bg
    monitor.style.border = `1.5px solid rgba(${P},0.45)`;
    monitor.style.boxShadow = `0 0 70px rgba(${P},0.22), 0 0 140px rgba(${P},0.1), inset 0 1px 0 rgba(${P},0.15)`;
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Show the overlay on the page */
export function showOverlay(sceneCount: number = 1): void {
    // Resolve theme from localStorage on every show
    currentTheme = resolveThemeColors();
    updateThemeComponents();

    if (overlayRoot && overlayRoot.isConnected) {
        // If overlay exists and still in DOM, just show it if hidden
        if (overlayHidden) {
            toggleOverlayVisibility();
        }
        return;
    }
    // Reset stale reference if DOM element was destroyed by SPA navigation
    if (overlayRoot && !overlayRoot.isConnected) {
        overlayRoot = null;
    }
    // Re-inject styles with resolved theme (remove old if exists)
    if (styleEl) { styleEl.remove(); styleEl = null; }
    injectStyles();
    // Configure process steps for the correct scene count from the start
    currentSceneCount = sceneCount;
    processSteps = generateProcessSteps(sceneCount);
    // Also update modules for multi-scene BEFORE building DOM
    if (sceneCount > 1) {
        const videoMod = modules.find(m => m.id === "video");
        if (videoMod) {
            const newSteps: SubStep[] = [
                { id: "animate", label: "สลับเป็นโหมดวิดีโอ", status: "waiting" },
                { id: "vid-prompt", label: "Scene 1 Prompt", status: "waiting" },
                { id: "vid-generate", label: "Scene 1 Generate", status: "waiting" },
                { id: "vid-wait", label: "Scene 1 รอผล", status: "waiting", progress: 0 },
            ];
            for (let i = 2; i <= sceneCount; i++) {
                newSteps.push({ id: `scene${i}-prompt`, label: `Scene ${i} Prompt`, status: "waiting" });
                newSteps.push({ id: `scene${i}-gen`, label: `Scene ${i} Generate`, status: "waiting" });
                newSteps.push({ id: `scene${i}-wait`, label: `Scene ${i} รอผล`, status: "waiting", progress: 0 });
            }
            videoMod.steps = newSteps;
        }
        const renderMod = modules.find(m => m.id === "render");
        if (renderMod) {
            const dlStep = renderMod.steps.find(s => s.id === "download");
            if (dlStep) dlStep.label = "ดาวน์โหลด 720p";
            const upStep = renderMod.steps.find(s => s.id === "upscale");
            if (upStep) upStep.label = "Full Video";
        }
    }
    logBuffer.length = 0;
    overlayRoot = buildOverlay();
    document.body.appendChild(overlayRoot);
    overlayHidden = false;
    ensureToggleButton();
    startTimer();
    startVisualizer();
    // Apply theme background image after DOM is ready
    requestAnimationFrame(() => applyCoreBg());
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

// ── Stats Bar Auto-Refresh ──────────────────────────────────────────────────

const STATUS_MAP: Record<string, string> = {
    "settings": "CONFIG",
    "upload-char": "UPLOAD",
    "upload-prod": "UPLOAD",
    "img-prompt": "PROMPT",
    "img-generate": "GENERATE",
    "img-wait": "IMG WAIT",
    "animate": "ANIMATE",
    "vid-prompt": "VID PROMPT",
    "vid-generate": "VID GEN",
    "vid-wait": "VID WAIT",
    "download": "DOWNLOAD",
    "upscale": "UPSCALE",
    "open": "OPENING",
};

function refreshStatBar(_stepId: string, status: StepStatus, progress?: number): void {
    // STEP: count done / total
    const doneCount = processSteps.filter(s => s.status === "done").length;
    const totalCount = processSteps.length;
    const stepEl = document.getElementById("nf-stat-step");
    if (stepEl) stepEl.textContent = `${doneCount}/${totalCount}`;

    // SCENES
    const scenesEl = document.getElementById("nf-stat-scenes");
    if (scenesEl) scenesEl.textContent = currentSceneCount > 1 ? `1/${currentSceneCount}` : "1/1";

    // STATUS
    if (status === "active") {
        const statusEl = document.getElementById("nf-stat-status");
        const label = STATUS_MAP[_stepId] || _stepId.toUpperCase();
        if (statusEl) statusEl.textContent = label;
    } else if (status === "done" && doneCount >= totalCount) {
        const statusEl = document.getElementById("nf-stat-status");
        if (statusEl) statusEl.textContent = "COMPLETE";
    } else if (status === "error") {
        const statusEl = document.getElementById("nf-stat-status");
        if (statusEl) statusEl.textContent = "ERROR";
    }

    // PROGRESS
    if (progress !== undefined && progress > 0) {
        const progEl = document.getElementById("nf-stat-progress");
        if (progEl) progEl.textContent = `${Math.min(100, progress)}%`;
    }
}

/** Manually set a stat bar value by id (e.g. "nf-stat-scenes", "nf-stat-status") */
export function updateStat(id: string, value: string): void {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

/** Update a sub-step status */
export function updateStep(stepId: string, status: StepStatus, progress?: number): void {
    if (!overlayRoot) return;

    // Update internal state (modules)
    for (const mod of modules) {
        for (const step of mod.steps) {
            if (step.id === stepId) {
                step.status = status;
                if (progress !== undefined) step.progress = progress;
            }
        }
    }

    // Update process steps (center terminal)
    for (const ps of processSteps) {
        if (ps.stepId === stepId) {
            ps.status = status;
            if (progress !== undefined) ps.progress = progress;
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

    // Auto-update stats bar: STEP count + STATUS
    refreshStatBar(stepId, status, progress);

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
    currentSceneCount = totalScenes;

    // ★ Regenerate process steps for the new scene count
    const oldStatuses = new Map<string, { status: StepStatus; progress?: number }>();
    for (const ps of processSteps) {
        oldStatuses.set(ps.stepId, { status: ps.status, progress: ps.progress });
    }
    processSteps = generateProcessSteps(totalScenes);
    // Preserve existing statuses (e.g. upload steps already done)
    for (const ps of processSteps) {
        const old = oldStatuses.get(ps.stepId);
        if (old) {
            ps.status = old.status;
            if (old.progress !== undefined) ps.progress = old.progress;
        }
    }
    // Rebuild center terminal DOM
    rebuildTerminalDom();

    // Also update video module (cross-pattern module)
    if (totalScenes > 1) {
        const videoMod = modules.find((m) => m.id === "video");
        if (videoMod) {
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
        }
    }

    // Also update FINAL_RENDER module label for multi-scene
    const renderMod = modules.find((m) => m.id === "render");
    if (renderMod && totalScenes > 1) {
        const dlStep = renderMod.steps.find(s => s.id === "download");
        if (dlStep) dlStep.label = "ดาวน์โหลด 720p";
        const upStep = renderMod.steps.find(s => s.id === "upscale");
        if (upStep) upStep.label = "Full Video";
        rebuildModuleDom(renderMod);
    }

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
    // Reset process steps
    currentSceneCount = 1;
    processSteps = generateProcessSteps(1);
    logBuffer.length = 0;
    rebuildTerminalDom();
    refreshModules();
    refreshTerminal();
}

/** Add a real-time log line (buffered, no UI feed) */
export function addLog(msg: string): void {
    const clean = msg.replace(/^\[Netflow AI\]\s*/, "");
    logBuffer.push(clean);
    if (logBuffer.length > MAX_LOG_LINES) logBuffer.shift();
}
