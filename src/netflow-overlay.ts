/**
 * NETFLOW AI — Engine Visualizer Overlay v2
 * 
 * Injected into the Google Flow page during automation.
 * Pure DOM + CSS — no React, no Tailwind.
 * 
 * High-tech engine monitor with:
 *   - Central CORE STATUS monitor (terminal log + audio visualizer)
 *   - 4 Corner tech modules with glowing red borders
 *   - Dark theme (zinc-950) with red accent glow
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
let styleEl: HTMLStyleElement | null = null;
let startTime = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;
let terminalInterval: ReturnType<typeof setInterval> | null = null;
let visualizerInterval: ReturnType<typeof setInterval> | null = null;
let activeStepCount = 0;

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
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: rgba(9, 9, 11, 0.92);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: nf-fade-in 0.6s ease-out;
    overflow: hidden;
}

@keyframes nf-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ─── Main Layout ─── */
.nf-layout {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ─── Central Core Monitor ─── */
.nf-core-monitor {
    position: relative;
    width: 420px;
    min-height: 280px;
    background: rgba(15, 15, 20, 0.85);
    border: 1.5px solid rgba(220, 38, 38, 0.45);
    border-radius: 16px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 40px rgba(220, 38, 38, 0.15),
        0 0 80px rgba(220, 38, 38, 0.08),
        inset 0 0 30px rgba(220, 38, 38, 0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 40px rgba(220, 38, 38, 0.15),
            0 0 80px rgba(220, 38, 38, 0.08),
            inset 0 0 30px rgba(220, 38, 38, 0.03);
    }
    50% {
        box-shadow:
            0 0 60px rgba(220, 38, 38, 0.25),
            0 0 120px rgba(220, 38, 38, 0.12),
            inset 0 0 40px rgba(220, 38, 38, 0.05);
    }
}

/* Core header */
.nf-core-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 12px;
    border-bottom: 1px solid rgba(220, 38, 38, 0.2);
}

.nf-core-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
}

.nf-core-title-label {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
}

.nf-core-title-val {
    color: #4ade80;
    font-weight: 700;
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
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: rgba(220, 38, 38, 0.15);
    border: 1px solid rgba(220, 38, 38, 0.3);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
}

/* Terminal log */
.nf-terminal {
    padding: 14px 20px;
    min-height: 100px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
}

.nf-term-line {
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.3s, opacity 0.3s;
}

.nf-term-line.nf-term-active {
    color: #fff;
}

.nf-term-line.nf-term-done {
    color: rgba(34, 197, 94, 0.7);
}

.nf-term-line.nf-term-error {
    color: rgba(239, 68, 68, 0.8);
}

.nf-term-line.nf-term-waiting {
    color: rgba(255, 255, 255, 0.25);
}

.nf-term-prefix {
    color: rgba(220, 38, 38, 0.7);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix {
    color: #dc2626;
}

.nf-term-status {
    margin-left: auto;
    font-size: 10px;
    font-weight: 500;
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
    height: 40px;
    padding: 8px 20px 14px;
    border-top: 1px solid rgba(220, 38, 38, 0.15);
}

.nf-viz-bar {
    width: 4px;
    min-height: 3px;
    background: linear-gradient(to top, rgba(220, 38, 38, 0.6), rgba(220, 38, 38, 0.9));
    border-radius: 2px 2px 0 0;
    transition: height 0.15s ease;
}

.nf-viz-bar.nf-viz-accent {
    background: linear-gradient(to top, rgba(251, 146, 60, 0.6), rgba(251, 146, 60, 0.9));
}

/* ─── Corner Modules ─── */
.nf-module {
    position: absolute;
    width: 240px;
    background: rgba(12, 12, 18, 0.75);
    border: 1px solid rgba(220, 38, 38, 0.2);
    border-radius: 12px;
    padding: 14px 16px;
    backdrop-filter: blur(8px);
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: border-color 0.4s, box-shadow 0.4s;
}

.nf-module.nf-active {
    border-color: rgba(220, 38, 38, 0.5);
    box-shadow: 0 0 25px rgba(220, 38, 38, 0.12), inset 0 0 20px rgba(220, 38, 38, 0.04);
}

.nf-module.nf-done {
    border-color: rgba(34, 197, 94, 0.35);
    box-shadow: 0 0 15px rgba(34, 197, 94, 0.08);
}

.nf-module::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.5), transparent);
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
    from { opacity: 0; transform: translateY(12px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

.nf-mod-tl { top: 40px; left: 40px; animation-delay: 0.1s; }
.nf-mod-tr { top: 40px; right: 40px; animation-delay: 0.2s; }
.nf-mod-bl { bottom: 70px; left: 40px; animation-delay: 0.3s; }
.nf-mod-br { bottom: 70px; right: 40px; animation-delay: 0.4s; }

.nf-mod-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
}

.nf-mod-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #dc2626;
    text-transform: uppercase;
}

.nf-mod-pct {
    font-size: 11px;
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
    font-size: 10.5px;
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
    max-width: 70px;
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
    height: 3px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    margin-top: 10px;
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

/* ─── Footer ─── */
.nf-footer {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 5;
}

.nf-brand {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 4px;
    color: rgba(255, 255, 255, 0.25);
    text-transform: uppercase;
}

.nf-timer {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.2);
    font-family: 'JetBrains Mono', monospace;
    margin-top: 3px;
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

/* ─── Decorative Lines ─── */
.nf-hline {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.12), transparent);
    pointer-events: none;
}

.nf-vline {
    position: absolute;
    width: 1px;
    background: linear-gradient(180deg, transparent, rgba(220, 38, 38, 0.1), transparent);
    pointer-events: none;
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

function buildOverlay(): HTMLDivElement {
    const root = document.createElement("div");
    root.id = "netflow-engine-overlay";

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "nf-close-btn";
    closeBtn.textContent = "✕ ซ่อน";
    closeBtn.onclick = () => hideOverlay();
    root.appendChild(closeBtn);

    // Layout wrapper
    const layout = document.createElement("div");
    layout.className = "nf-layout";

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
    const BAR_COUNT = 32;
    for (let i = 0; i < BAR_COUNT; i++) {
        const bar = document.createElement("div");
        bar.className = `nf-viz-bar${i % 5 === 0 ? " nf-viz-accent" : ""}`;
        bar.style.height = "3px";
        viz.appendChild(bar);
    }
    core.appendChild(viz);

    layout.appendChild(core);

    // Corner modules
    const positions = ["nf-mod-tl", "nf-mod-tr", "nf-mod-bl", "nf-mod-br"];
    modules.forEach((mod, i) => {
        const el = buildModule(mod);
        el.classList.add(positions[i]);
        el.id = `nf-mod-${mod.id}`;
        layout.appendChild(el);
    });

    root.appendChild(layout);

    // Decorative horizontal lines
    [15, 35, 65, 85].forEach((top, i) => {
        const line = document.createElement("div");
        line.className = "nf-hline";
        line.style.top = `${top}%`;
        line.style.left = "0";
        line.style.width = "100%";
        line.style.opacity = `${0.3 + i * 0.1}`;
        root.appendChild(line);
    });

    // Decorative vertical lines
    [20, 80].forEach((left) => {
        const line = document.createElement("div");
        line.className = "nf-vline";
        line.style.left = `${left}%`;
        line.style.top = "0";
        line.style.height = "100%";
        root.appendChild(line);
    });

    // Floating particles
    for (let i = 0; i < 15; i++) {
        const p = document.createElement("div");
        p.className = "nf-particle";
        p.style.left = `${5 + Math.random() * 90}%`;
        p.style.bottom = `${Math.random() * 20}%`;
        p.style.animationDuration = `${3 + Math.random() * 5}s`;
        p.style.animationDelay = `${Math.random() * 4}s`;
        if (Math.random() > 0.6) p.style.background = "rgba(251, 146, 60, 0.4)";
        root.appendChild(p);
    }

    // Footer
    const footer = document.createElement("div");
    footer.className = "nf-footer";
    footer.innerHTML = `
        <div class="nf-brand">NETFLOW AI ENGINE</div>
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

// ── Public API ─────────────────────────────────────────────────────────────

/** Show the overlay on the page */
export function showOverlay(): void {
    if (overlayRoot) return;
    injectStyles();
    overlayRoot = buildOverlay();
    document.body.appendChild(overlayRoot);
    startTimer();
    startVisualizer();
}

/** Hide and remove the overlay */
export function hideOverlay(): void {
    stopTimer();
    stopVisualizer();
    if (overlayRoot) {
        overlayRoot.classList.add("nf-fade-out");
        setTimeout(() => {
            overlayRoot?.remove();
            overlayRoot = null;
        }, 500);
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
