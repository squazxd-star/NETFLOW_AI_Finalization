/**
 * NETFLOW AI — Engine Visualizer Overlay
 * 
 * Injected into the Google Flow page during automation.
 * Pure DOM + CSS — no React, no Tailwind.
 * 
 * 4 Tech Modules:
 *   1. ASSET INGEST       — Configure + Upload images
 *   2. AI IMAGE SYNTHESIS  — Prompt + Generate image + Wait
 *   3. VIDEO PRODUCTION    — Animate → Video prompt → Generate video
 *   4. FINAL RENDER        — Download + Upscale + Open
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
    icon: string;
    steps: SubStep[];
}

// ── State ──────────────────────────────────────────────────────────────────

let overlayRoot: HTMLDivElement | null = null;
let styleEl: HTMLStyleElement | null = null;
let startTime = 0;
let timerInterval: ReturnType<typeof setInterval> | null = null;

const modules: Module[] = [
    {
        id: "ingest",
        title: "ASSET INGEST",
        icon: "📦",
        steps: [
            { id: "settings", label: "ตั้งค่า Flow", status: "waiting" },
            { id: "upload-char", label: "อัพโหลดตัวละคร", status: "waiting" },
            { id: "upload-prod", label: "อัพโหลดสินค้า", status: "waiting" },
        ],
    },
    {
        id: "image",
        title: "AI IMAGE SYNTHESIS",
        icon: "🖼️",
        steps: [
            { id: "img-prompt", label: "ใส่ Prompt", status: "waiting" },
            { id: "img-generate", label: "สร้างภาพ", status: "waiting" },
            { id: "img-wait", label: "รอผลภาพ", status: "waiting", progress: 0 },
        ],
    },
    {
        id: "video",
        title: "VIDEO PRODUCTION",
        icon: "🎬",
        steps: [
            { id: "animate", label: "สลับเป็นโหมดวิดีโอ", status: "waiting" },
            { id: "vid-prompt", label: "ใส่ Video Prompt", status: "waiting" },
            { id: "vid-generate", label: "สร้างวิดีโอ", status: "waiting" },
            { id: "vid-wait", label: "รอผลวิดีโอ", status: "waiting", progress: 0 },
        ],
    },
    {
        id: "render",
        title: "FINAL RENDER & OUTPUT",
        icon: "🚀",
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
/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background: rgba(5, 5, 12, 0.88);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: nf-fade-in 0.6s ease-out;
    overflow: hidden;
}

@keyframes nf-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* ─── Grid Layout ─── */
.nf-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr auto 1fr;
    gap: 0;
    width: 92%;
    max-width: 1100px;
    height: 80vh;
    max-height: 700px;
    position: relative;
}

/* ─── Central Core ─── */
.nf-core-wrap {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 160px;
    height: 160px;
}

.nf-core-aura {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%);
    animation: nf-core-pulse 3s ease-in-out infinite;
}

@keyframes nf-core-pulse {
    0%, 100% { transform: scale(0.9); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.9; }
}

.nf-core-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.nf-core-ring-1 {
    width: 110px; height: 110px;
    border-color: rgba(220, 38, 38, 0.35);
    animation: nf-spin-cw 8s linear infinite;
}
.nf-core-ring-2 {
    width: 140px; height: 140px;
    border-color: rgba(56, 189, 248, 0.2);
    animation: nf-spin-ccw 12s linear infinite;
}
.nf-core-ring-3 {
    width: 165px; height: 165px;
    border-color: rgba(220, 38, 38, 0.15);
    border-style: dashed;
    animation: nf-spin-cw 18s linear infinite;
}

@keyframes nf-spin-cw { to { transform: rotate(360deg); } }
@keyframes nf-spin-ccw { to { transform: rotate(-360deg); } }

.nf-core-center {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fff, #fca5a5, #dc2626);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(220, 38, 38, 0.5), 0 0 100px rgba(220, 38, 38, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: nf-center-breathe 2s ease-in-out infinite;
}

@keyframes nf-center-breathe {
    0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(255,255,255,0.6), 0 0 60px rgba(220,38,38,0.5); }
    50% { transform: scale(1.08); box-shadow: 0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(220,38,38,0.7), 0 0 120px rgba(56,189,248,0.2); }
}

.nf-core-icon {
    font-size: 24px;
    filter: drop-shadow(0 0 4px rgba(255,255,255,0.8));
}

/* ─── Tech Modules ─── */
.nf-module {
    background: rgba(15, 15, 25, 0.7);
    border: 1px solid rgba(220, 38, 38, 0.25);
    border-radius: 12px;
    padding: 16px;
    backdrop-filter: blur(8px);
    position: relative;
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: border-color 0.4s;
}

.nf-module.nf-active {
    border-color: rgba(220, 38, 38, 0.6);
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.15), inset 0 0 20px rgba(220, 38, 38, 0.05);
}

.nf-module.nf-done {
    border-color: rgba(34, 197, 94, 0.4);
}

.nf-module::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.6), transparent);
    animation: nf-scanline 3s ease-in-out infinite;
}

.nf-module.nf-done::after {
    background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.6), transparent);
}

@keyframes nf-scanline {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
}

@keyframes nf-module-in {
    from { opacity: 0; transform: translateY(15px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

.nf-mod-tl { grid-column: 1; grid-row: 1; align-self: end; margin-right: 24px; margin-bottom: 24px; animation-delay: 0.1s; }
.nf-mod-tr { grid-column: 3; grid-row: 1; align-self: end; margin-left: 24px; margin-bottom: 24px; animation-delay: 0.2s; }
.nf-mod-bl { grid-column: 1; grid-row: 3; align-self: start; margin-right: 24px; margin-top: 24px; animation-delay: 0.3s; }
.nf-mod-br { grid-column: 3; grid-row: 3; align-self: start; margin-left: 24px; margin-top: 24px; animation-delay: 0.4s; }

.nf-mod-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
}

.nf-mod-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 1.5px;
    color: #dc2626;
    text-transform: uppercase;
}

.nf-mod-title .nf-icon {
    font-size: 14px;
}

.nf-mod-pct {
    font-size: 12px;
    font-weight: 700;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    color: #fff;
}

/* ─── Sub-Steps ─── */
.nf-step {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 5px 0;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.3s;
}

.nf-step.nf-step-active {
    color: rgba(255, 255, 255, 0.9);
}

.nf-step.nf-step-done {
    color: rgba(34, 197, 94, 0.8);
}

.nf-step.nf-step-error {
    color: rgba(239, 68, 68, 0.8);
}

.nf-step-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    flex-shrink: 0;
    transition: all 0.3s;
}

.nf-step-active .nf-step-dot {
    background: #dc2626;
    box-shadow: 0 0 8px rgba(220, 38, 38, 0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: #22c55e;
    box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
}

.nf-step-error .nf-step-dot {
    background: #ef4444;
}

@keyframes nf-dot-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.4); }
}

/* ─── Progress Bar (inside substep) ─── */
.nf-progress-bar {
    flex: 1;
    height: 3px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
    overflow: hidden;
    max-width: 80px;
}

.nf-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #dc2626, #f87171);
    border-radius: 2px;
    transition: width 0.5s ease;
    position: relative;
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, #22c55e, #4ade80);
}

/* ─── Module overall progress bar ─── */
.nf-mod-progress {
    height: 2px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 1px;
    margin-top: 10px;
    overflow: hidden;
}

.nf-mod-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #dc2626, #fb923c);
    border-radius: 1px;
    transition: width 0.6s ease;
    width: 0%;
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, #22c55e, #4ade80);
}

/* ─── Footer ─── */
.nf-footer {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
}

.nf-brand {
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 3px;
    color: #dc2626;
    text-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
}

.nf-brand span {
    color: #fff;
}

.nf-timer {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.3);
    font-family: 'JetBrains Mono', monospace;
    margin-top: 4px;
    letter-spacing: 1px;
}

.nf-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 11px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 10;
    font-family: inherit;
}
.nf-close-btn:hover {
    background: rgba(220, 38, 38, 0.2);
    border-color: rgba(220, 38, 38, 0.4);
    color: #fff;
}

/* ─── Cyber Lines (decorative) ─── */
.nf-cyber-line {
    position: absolute;
    background: linear-gradient(90deg, rgba(220,38,38,0.3), rgba(56,189,248,0.15), transparent);
    height: 1px;
    animation: nf-line-glow 4s ease-in-out infinite alternate;
}
.nf-cyber-line-v {
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, rgba(220,38,38,0.3), rgba(56,189,248,0.15), transparent);
}

@keyframes nf-line-glow {
    from { opacity: 0.3; }
    to { opacity: 0.8; }
}

/* ─── Particles (subtle) ─── */
.nf-particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(220, 38, 38, 0.6);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
}

@keyframes nf-float-up {
    from { transform: translateY(0) scale(1); opacity: 0.8; }
    to { transform: translateY(-120px) scale(0); opacity: 0; }
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

// ── DOM Builder ────────────────────────────────────────────────────────────

function buildOverlay(): HTMLDivElement {
    const root = document.createElement("div");
    root.id = "netflow-engine-overlay";

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "nf-close-btn";
    closeBtn.textContent = "✕ ซ่อน Overlay";
    closeBtn.onclick = () => hideOverlay();
    root.appendChild(closeBtn);

    // Grid
    const grid = document.createElement("div");
    grid.className = "nf-grid";

    // Modules in 4 corners
    const positions = ["nf-mod-tl", "nf-mod-tr", "nf-mod-bl", "nf-mod-br"];
    modules.forEach((mod, i) => {
        const el = buildModule(mod);
        el.classList.add(positions[i]);
        el.id = `nf-mod-${mod.id}`;
        grid.appendChild(el);
    });

    // Central Core
    const coreWrap = document.createElement("div");
    coreWrap.className = "nf-core-wrap";
    coreWrap.innerHTML = `
        <div class="nf-core-aura"></div>
        <div class="nf-core-ring nf-core-ring-1"></div>
        <div class="nf-core-ring nf-core-ring-2"></div>
        <div class="nf-core-ring nf-core-ring-3"></div>
        <div class="nf-core-center">
            <span class="nf-core-icon">⚡</span>
        </div>
    `;
    grid.appendChild(coreWrap);

    root.appendChild(grid);

    // Decorative cyber lines
    for (let i = 0; i < 4; i++) {
        const line = document.createElement("div");
        line.className = "nf-cyber-line";
        line.style.top = `${20 + i * 20}%`;
        line.style.left = "0";
        line.style.width = "100%";
        line.style.animationDelay = `${i * 0.8}s`;
        root.appendChild(line);
    }

    // Floating particles
    for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.className = "nf-particle";
        p.style.left = `${10 + Math.random() * 80}%`;
        p.style.bottom = `${Math.random() * 30}%`;
        p.style.animationDuration = `${2 + Math.random() * 4}s`;
        p.style.animationDelay = `${Math.random() * 3}s`;
        if (Math.random() > 0.5) p.style.background = "rgba(56, 189, 248, 0.5)";
        root.appendChild(p);
    }

    // Footer
    const footer = document.createElement("div");
    footer.className = "nf-footer";
    footer.innerHTML = `
        <div class="nf-brand">NETFLOW <span>AI</span> ENGINE</div>
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
        <div class="nf-mod-title">
            <span class="nf-icon">${mod.icon}</span>
            ${mod.title}
        </div>
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
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Show the overlay on the page */
export function showOverlay(): void {
    if (overlayRoot) return; // already visible
    injectStyles();
    overlayRoot = buildOverlay();
    document.body.appendChild(overlayRoot);
    startTimer();
}

/** Hide and remove the overlay */
export function hideOverlay(): void {
    stopTimer();
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

    // Update DOM
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

    // Update module-level state
    refreshModules();
}

/** Update multiple steps at once */
export function updateSteps(updates: Array<{ id: string; status: StepStatus; progress?: number }>): void {
    for (const u of updates) updateStep(u.id, u.status, u.progress);
}

/** Mark a step as skipped (not applicable) */
export function skipStep(stepId: string): void {
    updateStep(stepId, "skipped");
    const row = document.getElementById(`nf-step-${stepId}`);
    if (row) row.style.opacity = "0.25";
}

/** Complete everything and auto-hide after delay */
export function completeOverlay(delayMs = 4000): void {
    stopTimer();
    refreshModules();
    setTimeout(() => hideOverlay(), delayMs);
}

// ── Internal: recalculate module percentages & active state ───────────────

function refreshModules(): void {
    for (const mod of modules) {
        const total = mod.steps.filter((s) => s.status !== "skipped").length;
        const done = mod.steps.filter((s) => s.status === "done").length;
        const hasActive = mod.steps.some((s) => s.status === "active");
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        // Module percentage
        const pctEl = document.getElementById(`nf-pct-${mod.id}`);
        if (pctEl) pctEl.textContent = `${pct}%`;

        // Module progress bar
        const modBar = document.getElementById(`nf-modbar-${mod.id}`);
        if (modBar) (modBar as HTMLDivElement).style.width = `${pct}%`;

        // Module border state
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
    if (totalScenes <= 1) return; // single-scene — keep defaults

    const videoMod = modules.find((m) => m.id === "video");
    if (!videoMod) return;

    // Build new step list: keep animate + scene-1 base, then add scene 2..N
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

    // Rebuild DOM for this module
    rebuildModuleDom(videoMod);
    refreshModules();
}

/** Rebuild the DOM rows inside a module element (after steps changed) */
function rebuildModuleDom(mod: Module): void {
    const modEl = document.getElementById(`nf-mod-${mod.id}`);
    if (!modEl) return;

    // Remove old step rows and progress bar, keep header
    const oldRows = modEl.querySelectorAll(".nf-step, .nf-mod-progress");
    oldRows.forEach((r) => r.remove());

    // Re-add steps
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

    // Re-add module progress bar
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
}
