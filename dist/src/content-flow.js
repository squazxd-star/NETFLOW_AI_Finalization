(function(){"use strict";let L=null,R=null,U=null,ce=0,Q=null,Z=null,W=!1,_=[];const Y=[],we=4;function ee(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let r=2;r<=e;r++)t.push({stepId:`scene${r}-prompt`,label:`Scene ${r} Prompt`,status:"waiting"},{stepId:`scene${r}-gen`,label:`Scene ${r} Generate`,status:"waiting"},{stepId:`scene${r}-wait`,label:`Scene ${r} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const j=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];_=ee(1);function le(){U||(U=document.createElement("style"),U.id="netflow-overlay-styles",U.textContent=`
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
    width: 420px;
    min-height: 280px;
    max-height: 80vh;
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
    min-width: 48px;
    height: 28px;
    border-radius: 8px;
    padding: 0 6px;
    background: rgba(220, 38, 38, 0.15);
    border: 1px solid rgba(220, 38, 38, 0.35);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: #fff;
}

/* Terminal log */
.nf-terminal {
    padding: 8px 14px;
    min-height: 60px;
    max-height: 300px;
    overflow-y: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    scrollbar-width: thin;
    scrollbar-color: rgba(220,38,38,0.3) transparent;
}

.nf-terminal::-webkit-scrollbar { width: 4px; }
.nf-terminal::-webkit-scrollbar-track { background: transparent; }
.nf-terminal::-webkit-scrollbar-thumb { background: rgba(220,38,38,0.3); border-radius: 2px; }

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

/* ─── Process Step Rows ─── */
.nf-proc-row {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 2.5px 0;
    transition: all 0.3s;
    color: rgba(255,255,255,0.25);
}
.nf-proc-num {
    width: 16px;
    font-size: 9px;
    font-weight: 700;
    text-align: right;
    flex-shrink: 0;
    color: rgba(220,38,38,0.35);
}
.nf-proc-dot {
    width: 5px; height: 5px;
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
    font-size: 10px;
}
.nf-proc-badge {
    font-size: 8px;
    font-weight: 600;
    padding: 1px 5px;
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
    color: #dc2626;
}
.nf-proc-active .nf-proc-dot {
    background: #dc2626;
    box-shadow: 0 0 6px rgba(220,38,38,0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(220,38,38,0.15);
    color: #f87171;
    animation: nf-status-pulse 1.5s ease-in-out infinite;
}

.nf-proc-done {
    color: rgba(34,197,94,0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(34,197,94,0.5); }
.nf-proc-done .nf-proc-dot {
    background: #22c55e;
    box-shadow: 0 0 5px rgba(34,197,94,0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(34,197,94,0.1);
    color: #4ade80;
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

/* ─── Log Feed ─── */
.nf-log-feed {
    padding: 6px 14px 8px;
    border-top: 1px solid rgba(220,38,38,0.15);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    line-height: 1.5;
    color: rgba(255,255,255,0.3);
    max-height: 65px;
    overflow: hidden;
}
.nf-log-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.5px 0;
}
.nf-log-line:last-child {
    color: rgba(255,255,255,0.55);
}
    `,document.head.appendChild(U))}function ve(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("class","nf-pipes-svg"),t.setAttribute("viewBox","0 0 100 100"),t.setAttribute("preserveAspectRatio","none");const r=document.createElementNS(e,"defs"),o=document.createElementNS(e,"linearGradient");o.id="nf-pipe-gradient";const i=document.createElementNS(e,"stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color","rgba(220,38,38,0.9)");const s=document.createElementNS(e,"stop");s.setAttribute("offset","50%"),s.setAttribute("stop-color","rgba(251,146,60,0.8)");const l=document.createElementNS(e,"stop");l.setAttribute("offset","100%"),l.setAttribute("stop-color","rgba(220,38,38,0.9)"),o.appendChild(i),o.appendChild(s),o.appendChild(l),r.appendChild(o);const a=document.createElementNS(e,"filter");a.id="nf-glow",a.setAttribute("x","-50%"),a.setAttribute("y","-50%"),a.setAttribute("width","200%"),a.setAttribute("height","200%");const u=document.createElementNS(e,"feGaussianBlur");u.setAttribute("stdDeviation","3"),u.setAttribute("result","coloredBlur");const d=document.createElementNS(e,"feMerge"),A=document.createElementNS(e,"feMergeNode");A.setAttribute("in","coloredBlur");const c=document.createElementNS(e,"feMergeNode");c.setAttribute("in","SourceGraphic"),d.appendChild(A),d.appendChild(c),a.appendChild(u),a.appendChild(d),r.appendChild(a),t.appendChild(r);function y(p,E){const h=document.createElementNS(e,"path");h.setAttribute("d",p),h.setAttribute("class","nf-pipe-glow"),h.style.animationDelay=`${E*.5}s`,t.appendChild(h);const $=document.createElementNS(e,"path");$.setAttribute("d",p),$.setAttribute("class","nf-pipe-base"),t.appendChild($);const w=document.createElementNS(e,"path");w.setAttribute("d",p),w.setAttribute("class","nf-pipe-flow"),w.style.animationDelay=`${E*.3}s`,t.appendChild(w)}return y("M 39 44 C 39 47, 40 48, 40.5 46",0),y("M 61 44 C 61 47, 60 48, 59.5 46",1),y("M 39 56 C 39 53, 40 52, 40.5 54",2),y("M 61 56 C 61 53, 60 52, 59.5 54",3),y("M 39 38 C 44 30, 56 30, 61 38",4),y("M 39 62 C 44 70, 56 70, 61 62",5),y("M 28 46 C 23 50, 23 50, 28 54",6),y("M 72 46 C 77 50, 77 50, 72 54",7),[[40.5,46],[59.5,46],[40.5,54],[59.5,54],[39,44],[61,44],[39,56],[61,56],[39,38],[61,38],[39,62],[61,62],[28,46],[72,46],[28,54],[72,54]].forEach(([p,E])=>{const h=document.createElementNS(e,"circle");h.setAttribute("cx",String(p)),h.setAttribute("cy",String(E)),h.setAttribute("r","0.35"),h.setAttribute("class","nf-pipe-dot"),t.appendChild(h)}),t}function de(e){e.innerHTML="",_.forEach((t,r)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${t.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(o)})}function ye(){const e=document.getElementById("nf-terminal");if(!e)return;de(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${_.length}`)}function xe(){const e=document.createElement("div");e.id="netflow-engine-overlay",["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(c=>{const y=document.createElement("div");y.className=`nf-corner-deco ${c}`,e.appendChild(y)});const t=document.createElement("button");t.className="nf-close-btn",t.textContent="✕ ซ่อน",t.onclick=()=>ne(),e.appendChild(t);const r=document.createElement("div");r.className="nf-layout",r.appendChild(ve());const o=document.createElement("div");o.className="nf-core-monitor",o.id="nf-core-monitor";const i=document.createElement("div");i.className="nf-core-header",i.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">CORE STATUS:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${_.length}</div>
    `,o.appendChild(i);const s=document.createElement("div");s.className="nf-terminal",s.id="nf-terminal",de(s),o.appendChild(s);const l=document.createElement("div");l.className="nf-log-feed",l.id="nf-log-feed",l.innerHTML='<div class="nf-log-line" style="color:rgba(220,38,38,0.4)">Waiting for automation...</div>',o.appendChild(l);const a=document.createElement("div");a.className="nf-visualizer",a.id="nf-visualizer";const u=30;for(let c=0;c<u;c++){const y=document.createElement("div");y.className=`nf-viz-bar${c%5===0?" nf-viz-accent":""}`,y.style.height="3px",a.appendChild(y)}o.appendChild(a),r.appendChild(o);const d=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];j.forEach((c,y)=>{const f=Ee(c);f.classList.add(d[y]),f.id=`nf-mod-${c.id}`,r.appendChild(f)}),e.appendChild(r);for(let c=0;c<20;c++){const y=document.createElement("div");y.className="nf-particle",y.style.left=`${10+Math.random()*80}%`,y.style.bottom=`${Math.random()*30}%`,y.style.animationDuration=`${3+Math.random()*5}s`,y.style.animationDelay=`${Math.random()*4}s`,Math.random()>.5&&(y.style.background="rgba(251, 146, 60, 0.4)"),e.appendChild(y)}const A=document.createElement("div");return A.className="nf-footer",A.innerHTML=`
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
    `,e.appendChild(A),e}function Ee(e){const t=document.createElement("div");t.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(r),e.steps.forEach(i=>{const s=document.createElement("div");s.className="nf-step",s.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),s.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,t.appendChild(s)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o),t}function Ce(){ce=Date.now(),Q=setInterval(()=>{const e=Math.floor((Date.now()-ce)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),r=String(e%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${t}:${r}`)},1e3)}function pe(){Q&&(clearInterval(Q),Q=null)}function ke(){Z=setInterval(()=>{const e=document.getElementById("nf-visualizer");if(!e)return;e.querySelectorAll(".nf-viz-bar").forEach(r=>{const o=3+Math.random()*28;r.style.height=`${o}px`})},180)}function ue(){Z&&(clearInterval(Z),Z=null);const e=document.getElementById("nf-visualizer");e&&e.querySelectorAll(".nf-viz-bar").forEach(t=>{t.style.height="3px"})}function te(){let e=0;const t=_.filter(a=>a.status!=="skipped").length;for(const a of _){const u=document.getElementById(`nf-proc-${a.stepId}`);if(!u)continue;u.className="nf-proc-row";const d=u.querySelector(".nf-proc-badge");switch(a.status){case"done":u.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),e++;break;case"active":u.classList.add("nf-proc-active"),d&&(d.textContent=a.progress!==void 0&&a.progress>0?`⏳ ${a.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${e}/${_.length}`);const o=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(o&&(o.textContent="COMPLETE",o.style.color="#4ade80"),i&&(i.style.background="#4ade80",i.style.boxShadow="0 0 8px rgba(74,222,128,0.7)")):_.some(u=>u.status==="error")?(o&&(o.textContent="ERROR",o.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):_.some(u=>u.status==="active")&&o&&(o.textContent="ACTIVE",o.style.color="#4ade80",o.style.textShadow="0 0 10px rgba(74,222,128,0.5)");const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function fe(){R||(le(),R=document.createElement("button"),R.id="nf-toggle-btn",R.className="nf-toggle-hidden",R.innerHTML="⚡",R.title="เปิด Netflow Overlay",R.onclick=()=>ne(),document.body.appendChild(R))}function ne(){L&&(fe(),W?(L.classList.remove("nf-hidden"),L.classList.add("nf-visible"),R&&(R.classList.remove("nf-toggle-visible"),R.classList.add("nf-toggle-hidden")),W=!1):(L.classList.remove("nf-visible"),L.classList.add("nf-hidden"),R&&(R.classList.remove("nf-toggle-hidden"),R.classList.add("nf-toggle-visible")),W=!0))}function $e(){if(L){W&&ne();return}le(),_=ee(1),Y.length=0,L=xe(),document.body.appendChild(L),W=!1,fe(),Ce(),ke()}function Pe(){pe(),ue(),W=!1,L&&(L.classList.add("nf-fade-out"),setTimeout(()=>{L==null||L.remove(),L=null},500)),R&&(R.remove(),R=null)}function v(e,t,r){if(!L)return;for(const i of j)for(const s of i.steps)s.id===e&&(s.status=t,r!==void 0&&(s.progress=r));for(const i of _)i.stepId===e&&(i.status=t,r!==void 0&&(i.progress=r));const o=document.getElementById(`nf-step-${e}`);if(o&&(o.className="nf-step",t==="active"?o.classList.add("nf-step-active"):t==="done"?o.classList.add("nf-step-done"):t==="error"&&o.classList.add("nf-step-error")),r!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,r)}%`)}oe(),te()}function q(e){v(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Se(e=4e3){pe(),ue(),oe(),te(),setTimeout(()=>Pe(),e)}function oe(){for(const e of j){const t=e.steps.filter(u=>u.status!=="skipped").length,r=e.steps.filter(u=>u.status==="done").length,o=e.steps.some(u=>u.status==="active"),i=t>0?Math.round(r/t*100):0,s=document.getElementById(`nf-pct-${e.id}`);s&&(s.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${e.id}`);l&&(l.style.width=`${i}%`);const a=document.getElementById(`nf-mod-${e.id}`);a&&(a.classList.remove("nf-active","nf-done"),i>=100?a.classList.add("nf-done"):o&&a.classList.add("nf-active"))}}function Ie(e){var o,i,s,l;const t=new Map;for(const a of _)t.set(a.stepId,{status:a.status,progress:a.progress});_=ee(e);for(const a of _){const u=t.get(a.stepId);u&&(a.status=u.status,u.progress!==void 0&&(a.progress=u.progress))}if(ye(),e>1){const a=j.find(u=>u.id==="video");if(a){const u=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=a.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=a.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((s=a.steps.find(d=>d.id==="vid-generate"))==null?void 0:s.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=a.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)u.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),u.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),u.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});a.steps=u,ge(a)}}const r=j.find(a=>a.id==="render");if(r&&e>1){const a=r.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const u=r.steps.find(d=>d.id==="upscale");u&&(u.label="Full Video"),ge(r)}oe(),te()}function ge(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const s=document.createElement("div");s.className="nf-step",s.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),s.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,t.appendChild(s)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o)}function me(e){const t=e.replace(/^\[Netflow AI\]\s*/,"");Y.push(t),Y.length>we&&Y.shift();const r=document.getElementById("nf-log-feed");r&&(r.innerHTML=Y.map(o=>`<div class="nf-log-line">&gt; ${o}</div>`).join(""))}const n=e=>{console.log(`[Netflow AI] ${e}`);try{me(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},T=e=>{console.warn(`[Netflow AI] ${e}`);try{me(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},Te=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Me=/Win/i.test(navigator.userAgent),X=Te?"🍎 Mac":Me?"🪟 Win":"🐧 Other";n(`Content script loaded on Google Flow page ${X}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),s=(t.textContent||"").trim().slice(0,30);n(`🖱️ Click (${o},${i}) → <${r}> "${s}"`)},!0);const g=e=>new Promise(t=>setTimeout(t,e));async function V(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i))}function Ae(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function be(e){const t=[],r=document.querySelectorAll("i");for(const o of r){if((o.textContent||"").trim()!==e)continue;let s=o,l=null;for(let a=0;a<20&&s&&(s=s.parentElement,!(!s||s===document.body));a++){const u=s.getBoundingClientRect();if(u.width>100&&u.height>80&&u.width<window.innerWidth*.6&&u.top>=-10&&u.bottom<=window.innerHeight+10){l=s;break}}l&&!t.includes(l)&&t.push(l)}return t.sort((o,i)=>{const s=o.getBoundingClientRect(),l=i.getBoundingClientRect();return s.left-l.left}),t}function ie(){const e=be("videocam");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🎬 Found ${e.length} video card(s) via <i>videocam</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("video");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const s=o.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6)return n(`🎬 Found video card via <video> fallback at (${s.left.toFixed(0)},${s.top.toFixed(0)})`),o;o=o.parentElement}}return n("🎬 No video card found"),null}function Be(){const e=be("image");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🖼️ Found ${e.length} image card(s) via <i>image</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const s=o.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6)return n(`🖼️ Found image card via <canvas> fallback at (${s.left.toFixed(0)},${s.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ No image card found"),null}function Fe(e,t){var a;const[r,o]=e.split(","),i=((a=r.match(/:(.*?);/))==null?void 0:a[1])||"image/png",s=atob(o),l=new Uint8Array(s.length);for(let u=0;u<s.length;u++)l[u]=s.charCodeAt(u);return new File([l],t,{type:i})}function J(e){var o;const t=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((o=i.textContent)==null?void 0:o.trim())===e){const s=i.closest("button");s&&t.push(s)}return t}function Ne(){const e=[...J("add"),...J("add_2")];if(e.length===0){n("No add buttons found by icon — trying text search");const o=document.querySelectorAll("button");for(const i of o){const s=i.getBoundingClientRect();if(s.bottom>window.innerHeight*.7&&s.width<60&&s.height<60){const l=(i.textContent||"").trim();if(l==="+"||l==="add")return i}}return null}let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();i.y>r&&(r=i.y,t=o)}return t&&n(`Found prompt bar "+" button at y=${r.toFixed(0)}`),t}function re(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=J(o);let s=null,l=0;for(const a of i){const u=a.getBoundingClientRect();u.y>l&&(l=u.y,s=a)}if(s)return n(`Found generate button via icon "${o}" at y=${l.toFixed(0)}`),s}const e=document.querySelectorAll("button");let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const s=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(s?1e3:0);l>r&&(r=l,t=o)}}if(t)return n("Found generate button via bottom-right heuristic"),t;for(const o of e){const i=(o.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return o}return null}function ae(){const e=document.querySelectorAll("textarea");for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const t=document.querySelectorAll('[contenteditable="true"]');for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of r){const i=o.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return o}return e.length>0?e[e.length-1]:null}async function se(e,t){var r,o,i,s;e.focus(),await g(300),n("setPromptText: Strategy 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",t),l.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const a=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});e.dispatchEvent(a),n("setPromptText: Dispatched beforeinput insertFromPaste");const u=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});e.dispatchEvent(u),await g(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(d.length>20){n(`setPromptText: ✅ Strategy 1 worked (${d.length} chars)`);return}n(`setPromptText: Strategy 1 — text not detected (got ${d.length} chars)`)}catch(l){n(`setPromptText: Strategy 1 failed: ${l.message}`)}n("setPromptText: Strategy 2 — Slate beforeinput insertText");try{e.focus(),await g(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(l);const a=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(a),await g(800);const u=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(u.length>20){n(`setPromptText: ✅ Strategy 2 worked (${u.length} chars)`);return}n("setPromptText: Strategy 2 — text not detected")}catch(l){n(`setPromptText: Strategy 2 failed: ${l.message}`)}n("setPromptText: Strategy 3 — ClipboardEvent paste (Mac-safe)");try{e.focus(),await g(200);const l=new DataTransfer;l.setData("text/plain",t),l.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const a=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});e.dispatchEvent(a),await g(800);const u=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(u.length>20){n(`setPromptText: ✅ Strategy 3 worked (${u.length} chars)`);return}n("setPromptText: Strategy 3 — ClipboardEvent text not detected")}catch(l){n(`setPromptText: Strategy 3 failed: ${l.message}`)}n("setPromptText: Strategy 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(t),n("setPromptText: Copied to clipboard via navigator.clipboard");else{const a=document.createElement("textarea");a.value=t,a.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),n("setPromptText: Copied to clipboard via execCommand")}e.focus(),await g(200),document.execCommand("paste"),await g(500);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(l.length>20){n(`setPromptText: ✅ Strategy 4 worked (${l.length} chars)`);return}}catch(l){n(`setPromptText: Strategy 4 failed: ${l.message}`)}n("setPromptText: Strategy 5 — React fiber Slate editor");try{const l=Object.keys(e).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(l){let a=e[l];for(let u=0;u<30&&a;u++){const d=a.memoizedProps,A=a.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("setPromptText: Found Slate editor via fiber props");const c=d.editor;c.selection,c.insertText(t),n("setPromptText: ✅ Strategy 5 — inserted via editor.insertText");return}if((s=(i=A==null?void 0:A.memoizedState)==null?void 0:i.editor)!=null&&s.insertText){n("setPromptText: Found Slate editor via fiber state"),A.memoizedState.editor.insertText(t),n("setPromptText: ✅ Strategy 5 — inserted via state editor");return}a=a.return}n("setPromptText: Fiber found but no Slate editor in tree")}else n("setPromptText: No React fiber found on element")}catch(l){n(`setPromptText: Strategy 5 failed: ${l.message}`)}n("setPromptText: ⚠️ All 5 strategies attempted — check console for results")}function De(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const r of t)e.push({input:r,origType:"file"}),r.type="text";return e.length>0&&n(`Neutralized ${e.length} file inputs (type → text)`),e}function Re(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 Blocked file dialog open (${X})`);return}return e.call(this)},n(`🔒 File dialog blocker installed (${X})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 File dialog blocker removed")}}function Le(e,t,r){var u;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(d=>d.input)];for(const d of o)!i.includes(d)&&d.offsetParent===null&&i.push(d);for(const d of i)d.type="file";n(`Restored ${i.length} inputs to type=file`);const s=document.querySelectorAll('input[type="file"]');if(s.length===0)return n(`⚠️ No file inputs found after restore (${X})`),!1;let l;if(r&&r.size>0){const d=Array.from(s).filter(A=>!r.has(A));d.length>0?(l=d[d.length-1],n(`Targeting NEW file input (${d.length} new, ${s.length} total)`)):(l=s[s.length-1],n(`No new file inputs found — using last of ${s.length}`))}else l=s[s.length-1];const a=new DataTransfer;a.items.add(t);try{l.files=a.files,n(`Injected file via target.files (${((u=l.files)==null?void 0:u.length)??0} files)`)}catch(d){n(`target.files assignment failed: ${d.message} — trying defineProperty`);try{Object.defineProperty(l,"files",{value:a.files,writable:!0,configurable:!0}),n("Injected file via Object.defineProperty")}catch(A){return T(`Both file injection methods failed: ${A.message}`),!1}}l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const d=new DataTransfer;d.items.add(t);const A=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:d});l.dispatchEvent(A),n("Also dispatched drop event on file input")}catch{}return n(`✅ File injection complete: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${X}`),!0}async function he(e,t){var u;n(`── Uploading ${t} into prompt bar ──`);const r=Fe(e,t);n(`File size: ${(r.size/1024).toFixed(1)} KB`);const o=Ne();if(!o)return T("Could not find prompt bar '+' button"),!1;const i=new Set(document.querySelectorAll('input[type="file"]'));n(`Pre-existing file inputs: ${i.size}`);const s=Re();let l=De();const a=new MutationObserver(d=>{for(const A of d)for(const c of A.addedNodes)if(c instanceof HTMLInputElement&&c.type==="file"&&(c.type="text",l.push({input:c,origType:"file"}),n("🎯 Observer neutralized new file input")),c instanceof HTMLElement){const y=c.querySelectorAll('input[type="file"]');for(const f of y)f.type="text",l.push({input:f,origType:"file"}),n("🎯 Observer neutralized nested file input")}});a.observe(document.body,{childList:!0,subtree:!0});try{await V(o),n("Clicked '+' button"),await g(1500),n("Checking for upload menu...");const d=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");let A=!1;for(const y of d){if(y===o)continue;const f=y.querySelectorAll("i");for(const p of f){const E=((u=p.textContent)==null?void 0:u.trim())||"";if((E==="upload"||E==="upload_file")&&!Array.from(y.querySelectorAll("i")).map($=>{var w;return(w=$.textContent)==null?void 0:w.trim()}).includes("drive_folder_upload")){await V(y),A=!0,n(`Clicked upload menu (icon: ${E})`);break}}if(A)break}if(!A)for(const y of d){if(y===o)continue;const f=y.childNodes.length<=3?(y.textContent||"").trim():"";if(f.length>0&&f.length<30){const p=f.toLowerCase();if(p==="upload"||p==="อัปโหลด"||p==="อัพโหลด"||p.includes("from computer")||p.includes("จากคอมพิวเตอร์")){await V(y),A=!0,n(`Clicked upload menu (text: "${f}")`);break}}}return await g(1e3),Le(l,r,i)?(n(`✅ Injected ${t} — no dialog opened`),await g(2500),!0):(T(`No file input found for ${t}`),!1)}finally{a.disconnect(),s();for(const d of l)d.input.type!=="file"&&(d.input.type="file")}}async function _e(e,t){n("=== Step 0: Configure Flow settings ===");const r=document.querySelectorAll("button");let o=null;for(const f of r){const p=f.textContent||"";if((p.includes("Nano Banana")||p.includes("Imagen")||p.includes("วิดีโอ")||p.includes("รูปภาพ")||p.includes("Image")||p.includes("Video"))&&f.getBoundingClientRect().bottom>window.innerHeight*.7){o=f,n(`Found settings button by text: "${p.substring(0,30).trim()}"`);break}}if(!o)for(const f of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const p=J(f);for(const E of p)if(E.getBoundingClientRect().bottom>window.innerHeight*.7){o=E,n(`Found settings button by icon: ${f}`);break}if(o)break}if(!o)return T("Could not find settings button"),!1;const i=o.getBoundingClientRect(),s=i.left+i.width/2,l=i.top+i.height/2,a={bubbles:!0,cancelable:!0,clientX:s,clientY:l,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",a)),o.dispatchEvent(new MouseEvent("click",a)),n("Clicked settings button"),await g(1500);let u=!1,d=null;const A=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const f of A){const p=f.getAttribute("aria-controls")||"",E=f.id||"";if(p.toUpperCase().includes("IMAGE")||E.toUpperCase().includes("IMAGE")){d=f,n(`Found Image tab via flow_tab_slider_trigger (aria-controls: ${p})`);break}}if(!d)for(const f of document.querySelectorAll('[role="tab"]')){const p=f.id||"";if(p.toUpperCase().includes("TRIGGER-IMAGE")){d=f,n(`Found Image tab via id: ${p}`);break}}if(!d)for(const f of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const p=(f.textContent||"").trim();if((p==="Image"||p.endsWith("Image")||p==="รูปภาพ"||p==="ภาพ")&&!p.includes("Video")&&!p.includes("วิดีโอ")){d=f,n(`Found Image tab via text match: "${p}"`);break}}if(d){const f=d.getAttribute("data-state")||"",p=d.getAttribute("aria-selected")||"";if(f==="active"||p==="true")u=!0,n("Image tab already active — no click needed");else{const E=d.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:E.left+E.width/2,clientY:E.top+E.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),d.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",h)),d.dispatchEvent(new MouseEvent("click",h)),u=!0,n("✅ Clicked Image tab — switched to Image mode"),await g(400)}}u||n("⚠️ Could not find Image mode button — may already be in Image mode");const c=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const f of document.querySelectorAll("button, [role='tab'], [role='option']")){const p=(f.textContent||"").trim();if(p===c||p.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const E=f.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:E.left+E.width/2,clientY:E.top+E.height/2,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),f.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",h)),f.dispatchEvent(new MouseEvent("click",h)),n(`Selected orientation: ${c}`),await g(400);break}}const y=`x${t}`;for(const f of document.querySelectorAll("button, [role='tab'], [role='option']"))if((f.textContent||"").trim()===y){const E=f.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:E.left+E.width/2,clientY:E.top+E.height/2,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),f.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",h)),f.dispatchEvent(new MouseEvent("click",h)),n(`Selected count: ${y}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),o.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",a)),o.dispatchEvent(new MouseEvent("click",a)),n("Closed settings panel"),await g(600),!0}async function Oe(e){var A;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}try{$e()}catch(c){console.warn("Overlay show error:",c)}const t=[],r=[];try{v("settings","active");const c=e.orientation||"horizontal",y=e.outputCount||1,f=await _e(c,y);t.push(f?"✅ Settings":"⚠️ Settings"),v("settings",f?"done":"error")}catch(c){T(`Settings error: ${c.message}`),t.push("⚠️ Settings"),v("settings","error")}n("=== Step 1: Upload reference images ===");const o=()=>{const c=document.querySelectorAll("span, div, p, label");for(const y of c){const f=(y.textContent||"").trim();if(/^\d{1,3}%$/.test(f)){if(f==="100%")return null;const p=y.getBoundingClientRect();if(p.width>0&&p.height>0&&p.top>0&&p.top<window.innerHeight)return f}}return null},i=async c=>{n(`Waiting for ${c} upload to complete...`),await g(2e3);const y=Date.now(),f=6e4;let p="",E=Date.now();const h=15e3;for(;Date.now()-y<f;){const $=o();if($){if($!==p)p=$,E=Date.now();else if(Date.now()-E>h){n(`✅ ${c} upload — % stuck at ${$} for ${h/1e3}s, treating as complete`),await g(1e3);return}n(`Upload in progress: ${$} — waiting...`),await g(1500)}else{n(`✅ ${c} upload complete — no % indicator found`),await g(1e3);return}}T(`⚠️ ${c} upload timeout after ${f/1e3}s — proceeding anyway`)};if(e.characterImage){v("upload-char","active");try{const c=await he(e.characterImage,"character.png");t.push(c?"✅ ตัวละคร":"⚠️ ตัวละคร"),c||r.push("character upload failed"),v("upload-char",c?"done":"error")}catch(c){T(`Character upload error: ${c.message}`),t.push("❌ ตัวละคร"),r.push("character upload error"),v("upload-char","error")}await i("character")}else q("upload-char");if(e.productImage){v("upload-prod","active");try{const c=await he(e.productImage,"product.png");t.push(c?"✅ สินค้า":"⚠️ สินค้า"),c||r.push("product upload failed"),v("upload-prod",c?"done":"error")}catch(c){T(`Product upload error: ${c.message}`),t.push("❌ สินค้า"),r.push("product upload error"),v("upload-prod","error")}await i("product")}else q("upload-prod");n("Closing any open dialogs..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const s=o();s&&(n(`⚠️ Upload still showing ${s} after all uploads — waiting extra...`),await i("final")),n("All uploads complete — proceeding to prompt"),await g(1e3),n("=== Step 2: Paste image prompt ==="),v("img-prompt","active"),await g(1e3);const l=ae();l?(await se(l,e.imagePrompt),n(`Pasted prompt (${e.imagePrompt.length} chars)`),t.push("✅ Prompt"),v("img-prompt","done")):(T("Could not find prompt text input"),t.push("❌ Prompt"),r.push("prompt input not found"),v("img-prompt","error")),await g(800);const a=new Set;document.querySelectorAll("img").forEach(c=>{c.src&&a.add(c.src)}),n(`Snapshot: ${a.size} existing images before Generate`),n("=== Step 3: Click Generate → ==="),v("img-generate","active"),await g(500);const u=re();if(u){const c=u.getBoundingClientRect(),y=c.left+c.width/2,f=c.top+c.height/2,p={bubbles:!0,cancelable:!0,clientX:y,clientY:f,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",p)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",p)),u.dispatchEvent(new MouseEvent("click",p)),n("Dispatched full click sequence on Generate button"),t.push("✅ Generate"),await g(500),u.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",p)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",p)),u.dispatchEvent(new MouseEvent("click",p)),n("Dispatched safety retry click on Generate button"),v("img-generate","done")}else T("Could not find → Generate button"),t.push("❌ Generate"),r.push("generate button not found"),v("img-generate","error");n("=== Step 4: Wait for generated image + Animate ==="),v("img-wait","active");try{n("Waiting 15s for generation to start..."),await g(15e3),n("Polling for NEW generated image (not in snapshot)...");let c=null;const y=Date.now();for(;!c&&Date.now()-y<18e4;){const f=document.querySelectorAll("img");for(const p of f){if(a.has(p.src)||!(p.alt||"").toLowerCase().includes("generated"))continue;const h=p.getBoundingClientRect();if(h.width>120&&h.height>120&&h.top>0&&h.top<window.innerHeight*.85){const $=p.closest("div");if($){c=$,n(`Found AI-generated image via alt="${p.alt}": ${p.src.substring(0,80)}...`);break}}}if(!c)for(const p of f){if(a.has(p.src))continue;const E=p.closest("div"),h=(E==null?void 0:E.textContent)||"";if(h.includes("product.png")||h.includes("character.png")||h.includes(".png")||h.includes(".jpg")){n(`Skipping reference image (container has filename): ${h.substring(0,40)}`);continue}const $=p.getBoundingClientRect();if($.width>120&&$.height>120&&$.top>0&&$.top<window.innerHeight*.85){const w=p.closest("div");if(w){c=w,n(`Found NEW image (fallback): ${p.src.substring(0,80)}...`);break}}}c||(await g(5e3),n("Still waiting for new generated image..."))}if(!c)T("Timeout waiting for generated image"),t.push("⚠️ Wait Image"),v("img-wait","error");else{n("Found generated image element"),t.push("✅ Image Found"),v("img-wait","done",100);const f=c.getBoundingClientRect(),p=f.left+f.width/2,E=f.top+f.height/2,h={bubbles:!0,cancelable:!0,clientX:p,clientY:E};c.dispatchEvent(new PointerEvent("pointerenter",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseenter",h)),c.dispatchEvent(new PointerEvent("pointerover",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseover",h)),c.dispatchEvent(new PointerEvent("pointermove",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousemove",h)),n("Dispatched hover events on image (pointer + mouse)"),await g(1500);let $=null;for(const w of["more_vert","more_horiz","more"]){const P=J(w);for(const M of P){const m=M.getBoundingClientRect();if(m.top>=f.top-20&&m.top<=f.bottom&&m.right>=f.right-150&&m.right<=f.right+20){$=M;break}}if($)break}if(!$){const w=document.querySelectorAll("button");for(const P of w){const M=P.getBoundingClientRect();if(M.width<50&&M.height<50&&M.top>=f.top-10&&M.top<=f.top+60&&M.left>=f.right-80){const m=P.querySelectorAll("i");for(const k of m)if((((A=k.textContent)==null?void 0:A.trim())||"").includes("more")){$=P;break}if($)break;const C=P.getAttribute("aria-label")||"";if(C.includes("เพิ่มเติม")||C.includes("more")){$=P;break}}}}if(!$)T("Could not find 3-dots button on generated image"),t.push("⚠️ 3-dots");else{const w=$.getBoundingClientRect(),P=w.left+w.width/2,M=w.top+w.height/2,m={bubbles:!0,cancelable:!0,clientX:P,clientY:M,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),$.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",m)),$.dispatchEvent(new MouseEvent("click",m)),n("Clicked 3-dots button"),await g(1500);let C=null;const k=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const S of k){const B=(S.textContent||"").trim();if(B.includes("ทำให้เป็นภาพเคลื่อนไหว")||B.includes("Animate")||B.includes("animate")){C=S;break}}if(!C)T("Could not find 'ทำให้เป็นภาพเคลื่อนไหว' menu item"),t.push("⚠️ Animate");else{const S=C.getBoundingClientRect(),B=S.left+S.width/2,O=S.top+S.height/2,N={bubbles:!0,cancelable:!0,clientX:B,clientY:O,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",N)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",N)),C.dispatchEvent(new MouseEvent("click",N)),n("✅ Clicked 'ทำให้เป็นภาพเคลื่อนไหว' — switching to video mode"),t.push("✅ Animate"),v("animate","done"),await g(3e3)}}}}catch(c){T(`Step 4 error: ${c.message}`),t.push("⚠️ Animate")}if(e.videoPrompt){n("=== Step 5: Paste video prompt + Generate video ==="),v("vid-prompt","active");try{n("Waiting for video mode UI..."),await g(3e3);let c=!1;const y=document.querySelectorAll("button, span, div");for(const E of y){const h=(E.textContent||"").trim(),$=E.getBoundingClientRect();if((h==="วิดีโอ"||h==="Video"||h.includes("วิดีโอ"))&&$.bottom>window.innerHeight*.7){c=!0,n("Confirmed: now in Video mode");break}}c||n("Video mode indicator not found — proceeding anyway (may already be in video mode after Animate)"),await g(1e3);const f=ae();f?(await se(f,e.videoPrompt),n(`Pasted video prompt (${e.videoPrompt.length} chars)`),t.push("✅ Video Prompt"),v("vid-prompt","done")):(T("Could not find prompt text input for video prompt"),t.push("❌ Video Prompt"),r.push("video prompt input not found"),v("vid-prompt","error")),await g(1e3),v("vid-generate","active");const p=re();if(p){const E=p.getBoundingClientRect(),h=E.left+E.width/2,$=E.top+E.height/2,w={bubbles:!0,cancelable:!0,clientX:h,clientY:$,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",w)),p.dispatchEvent(new MouseEvent("click",w)),n("✅ Clicked Generate for video — video generation started!"),t.push("✅ Video Generate"),v("vid-generate","done"),await g(500),p.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",w)),p.dispatchEvent(new MouseEvent("click",w)),n("Dispatched safety retry click on video Generate button")}else T("Could not find Generate button for video"),t.push("❌ Video Generate"),r.push("video generate button not found"),v("vid-generate","error")}catch(c){T(`Step 5 error: ${c.message}`),t.push("⚠️ Video Gen"),r.push(`video gen error: ${c.message}`)}}else n("No video prompt provided — skipping video generation step"),q("animate"),q("vid-prompt"),q("vid-generate"),q("vid-wait");if(e.videoPrompt){v("vid-wait","active");const c=e.sceneCount||1,y=e.videoScenePrompts||[e.videoPrompt];if(c>1)try{Ie(c)}catch{}n(`=== Step 6: Wait for video + ${c>1?`continue ${c} scenes`:"download"} ===`);const f=document.getElementById("netflow-engine-overlay"),p=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const P of w){if(f&&f.contains(P))continue;const M=(P.textContent||"").trim();if(M.length>10)continue;const m=M.match(/(\d{1,3})\s*%/);if(!m)continue;const C=parseInt(m[1],10);if(C<1||C>100)continue;const k=P.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return C}return null},E=async(w=6e5)=>{n("Waiting for video generation..."),v("vid-wait","active"),await g(5e3);const P=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");let x=0;for(const I of b){if(f&&f.contains(I))continue;const D=(I.textContent||"").trim();if(D.includes("%")&&D.length<15){const H=I.tagName.toLowerCase(),K=I.className&&typeof I.className=="string"?I.className.split(/\s+/).slice(0,2).join(" "):"",z=I.getBoundingClientRect();if(n(`  🔍 "${D}" in <${H}.${K}> at (${z.left.toFixed(0)},${z.top.toFixed(0)}) w=${z.width.toFixed(0)}`),x++,x>=5)break}}x===0&&n("  🔍 No element with '%' text found")},M=ie();n(M?"📍 Video card already present at start":"⏳ No video card yet — will poll for % progress"),n("🔍 Debug scan for % text nodes:"),P();const m=Date.now();let C=-1,k=0,S=!1;for(;Date.now()-m<w;){const b=p();if(b!==null){if(b!==C&&(n(`Video progress: ${b}%`),C=b,v("vid-wait","active",b)),k=Date.now(),b>=100){n("✅ 100% detected!"),S=!0;break}}else if(C>30){const x=Math.floor((Date.now()-k)/1e3);if(x>=5){n(`✅ % disappeared at ${C}% (lost for ${x}s) — video done!`),S=!0;break}n(`⏳ % lost at ${C}% — confirming in ${5-x}s...`)}else{const x=Math.floor((Date.now()-m)/1e3);x%15<3&&n(`⏳ Waiting... (${x}s) no % found`)}if(!S&&C>0&&ie()&&!M){n(`✅ Video card appeared while tracking at ${C}% — video done!`),S=!0;break}await g(3e3)}const B=ie();if(!B)return n("❌ No video card found to click"),v("vid-wait","error"),null;const O=B;S?(v("vid-wait","done",100),n("Cool-down 4s before clicking..."),await g(4e3)):n("⚠️ Timeout — attempting to click video card anyway");const N=O.getBoundingClientRect(),F=N.left+N.width/2,G=N.top+N.height/2;n(`🖱️ Hovering video card 4s at (${F.toFixed(0)}, ${G.toFixed(0)})...`),Ae(O);for(let b=0;b<8;b++){const x={bubbles:!0,cancelable:!0,clientX:F+b%2,clientY:G};O.dispatchEvent(new PointerEvent("pointermove",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousemove",x)),await g(500)}n("Clicking video card...");for(let b=0;b<2;b++){const x=document.elementFromPoint(F,G);x?await V(x):await V(O),await g(300)}return n("✅ Video card clicks done"),O},h=async(w,P=6e5)=>{n(`Waiting for scene ${w} video generation...`),await g(5e3);const M=Date.now();let m=-1,C=0;for(;Date.now()-M<P;){const k=p();if(k!==null){if(k!==m&&(n(`Scene ${w} progress: ${k}%`),m=k),C=Date.now(),k>=100)return n(`✅ Scene ${w} — 100%!`),!0}else if(m>30){const S=Math.floor((Date.now()-C)/1e3);if(S>=5)return n(`✅ Scene ${w} — % disappeared at ${m}% (${S}s) — done!`),!0;n(`⏳ Scene ${w} % lost at ${m}% — confirming in ${5-S}s...`)}else{const S=Math.floor((Date.now()-M)/1e3);S%15<3&&n(`⏳ Scene ${w} waiting... (${S}s)`)}await g(3e3)}return!1},$=async()=>{let w=null;const P=document.querySelectorAll("button");for(const b of P){const x=(b.textContent||"").trim();if(x.includes("ดาวน์โหลด")||x.toLowerCase()==="download"){w=b,n(`Found ดาวน์โหลด button via text: "${x}"`);break}}if(!w)for(const b of P){const x=b.getBoundingClientRect();if(x.top<80&&x.right>window.innerWidth-300){const I=(b.textContent||"").trim().toLowerCase(),D=(b.getAttribute("aria-label")||"").toLowerCase();if(I.includes("ดาวน์")||I.includes("download")||D.includes("ดาวน์")||D.includes("download")){w=b,n("Found ดาวน์โหลด button via position+text");break}}}if(!w){const b=document.querySelectorAll('[data-type="button-overlay"]');for(const x of b){const I=x.closest("button")||x.parentElement;if(I){const D=(I.textContent||"").trim();if(D.includes("ดาวน์โหลด")||D.toLowerCase().includes("download")){w=I,n("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!w){T("Could not find ดาวน์โหลด button in detail view"),t.push("⚠️ Download btn");return}const M=w.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),w.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",m)),w.dispatchEvent(new MouseEvent("click",m)),n("Clicked ดาวน์โหลด button"),t.push("✅ ดาวน์โหลด"),v("download","done"),v("upscale","active"),await g(1500);const C=async b=>{const x=b.getBoundingClientRect(),I={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",I)),b.dispatchEvent(new MouseEvent("click",I))},k=async b=>{const x=b.getBoundingClientRect(),I={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2};b.dispatchEvent(new PointerEvent("pointerenter",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseenter",I)),b.dispatchEvent(new PointerEvent("pointermove",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseover",I)),b.dispatchEvent(new MouseEvent("mousemove",I))},S=b=>{const x=document.querySelectorAll('[role="menuitem"]');for(const I of x)if((I.textContent||"").trim().includes(b)){const H=I.getBoundingClientRect();if(H.width>0&&H.height>0)return I}return null},B=S("Full Video");if(B){n("Multi-scene menu detected — hovering Full Video..."),await k(B),await g(500),await C(B),n("Clicked Full Video"),t.push("✅ Full Video"),await g(1500);let b=null;const x=Date.now();for(;Date.now()-x<5e3&&(b=S("720p"),!b);)n("Waiting for 720p submenu..."),await g(500);if(!b){T("Could not find 720p option in submenu"),t.push("⚠️ 720p");return}await C(b),n("Clicked 720p — download starting"),t.push("✅ 720p"),v("upscale","active")}else{let b=S("1080p");if(!b){const x=document.querySelectorAll("button, div[role='button'], span");for(const I of x)if((I.textContent||"").trim().includes("1080p")&&I.offsetParent!==null){b=I.closest("button")||I;break}}if(!b){T("Could not find 1080p option"),t.push("⚠️ 1080p");return}await C(b),n("Clicked 1080p — download starting"),t.push("✅ 1080p"),v("upscale","active")}n("Waiting for download to complete...");const O=Date.now();let N=!1;for(;Date.now()-O<3e5;){const b=document.body.innerText||"";if(b.includes("Download complete")){n("✅ Download complete!"),t.push("✅ Downloaded"),v("upscale","done",100),N=!0;break}if(b.includes("Upscaling complete")||b.includes("upscaling complete")){n("✅ Upscaling complete!"),t.push("✅ Upscaled"),v("upscale","done",100),N=!0;break}b.includes("Downloading your extended video")?n("Downloading extended video..."):n("Waiting..."),await g(3e3)}if(!N){T("Download timeout — file may still be downloading"),t.push("⚠️ Download timeout"),v("upscale","error");return}v("open","active"),n("Waiting for download file to be ready..."),await g(5e3);let F=!1;const G=Date.now();for(;Date.now()-G<6e4&&!F;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},x=>{chrome.runtime.lastError?T(`Download poll error: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ Opened video: ${x.message}`),t.push("✅ Opened"),v("open","done"),F=!0):n(`Download not ready: ${x==null?void 0:x.message}`),b()})})}catch(b){T(`Poll exception: ${b.message}`)}F||await g(3e3)}F||(T("Could not find/open downloaded video"),t.push("⚠️ Open"))};try{if(!await E())T("Timeout waiting for video generation"),t.push("⚠️ Video Wait"),v("vid-wait","error");else if(t.push("✅ Video Complete"),v("vid-wait","done",100),v("download","active"),c<=1){n("Single scene — waiting 3s for detail view to load..."),t.push("✅ Clicked"),await g(3e3);let P=null;const M=document.querySelectorAll("button");for(const m of M){const C=(m.textContent||"").trim();if(C.includes("ดาวน์โหลด")||C.toLowerCase()==="download"){P=m,n(`Found ดาวน์โหลด button via text: "${C}"`);break}}if(!P)for(const m of M){const C=m.getBoundingClientRect();if(C.top<80&&C.right>window.innerWidth-300){const k=(m.textContent||"").trim().toLowerCase(),S=(m.getAttribute("aria-label")||"").toLowerCase();if(k.includes("ดาวน์")||k.includes("download")||S.includes("ดาวน์")||S.includes("download")){P=m,n("Found ดาวน์โหลด button via position+text");break}}}if(!P){const m=document.querySelectorAll('[data-type="button-overlay"]');for(const C of m){const k=C.closest("button")||C.parentElement;if(k){const S=(k.textContent||"").trim();if(S.includes("ดาวน์โหลด")||S.toLowerCase().includes("download")){P=k,n("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!P)T("Could not find ดาวน์โหลด button in detail view"),t.push("⚠️ Download btn");else{const m=P.getBoundingClientRect(),C=m.left+m.width/2,k=m.top+m.height/2,S={bubbles:!0,cancelable:!0,clientX:C,clientY:k,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",S)),await g(80),P.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",S)),P.dispatchEvent(new MouseEvent("click",S)),n("Clicked ดาวน์โหลด button"),t.push("✅ ดาวน์โหลด"),v("download","done"),v("upscale","active"),await g(1500);let B=null;const O=document.querySelectorAll('button[role="menuitem"], [role="menuitem"], [role="option"], li');for(const N of O)if((N.textContent||"").trim().includes("1080p")){B=N;break}if(!B){const N=document.querySelectorAll("button, div[role='button'], span");for(const F of N)if((F.textContent||"").trim().includes("1080p")&&F.offsetParent!==null){B=F.closest("button")||F;break}}if(!B)T("Could not find 1080p option in dropdown"),t.push("⚠️ 1080p");else{const N=B.getBoundingClientRect(),F=N.left+N.width/2,G=N.top+N.height/2,b={bubbles:!0,cancelable:!0,clientX:F,clientY:G,button:0};B.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mousedown",b)),await g(80),B.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseup",b)),B.dispatchEvent(new MouseEvent("click",b)),n("Clicked 1080p — download starting"),t.push("✅ 1080p"),n("Waiting for upscaling + download...");const x=Date.now();let I=!1;for(;Date.now()-x<3e5;){const D=document.body.innerText||"";if(D.includes("Upscaling complete")||D.includes("upscaling complete")){n("✅ Upscaling complete!"),t.push("✅ Upscaled"),v("upscale","done",100),I=!0;break}await g(5e3),n("Upscaling...")}if(I){v("open","active"),n("Waiting for download file to be ready..."),await g(5e3);let D=!1;const H=Date.now();for(;Date.now()-H<6e4&&!D;){try{await new Promise(K=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},z=>{chrome.runtime.lastError?T(`Download poll error: ${chrome.runtime.lastError.message}`):z!=null&&z.success?(n(`✅ Opened video: ${z.message}`),t.push("✅ Opened"),v("open","done"),D=!0):n(`Download not ready: ${z==null?void 0:z.message}`),K()})})}catch(K){T(`Poll exception: ${K.message}`)}D||await g(3e3)}D||(T("Could not find/open downloaded video"),t.push("⚠️ Open"))}else T("Upscaling timeout — download may still complete"),t.push("⚠️ Upscale timeout")}}}else{n(`Multi-scene mode: ${c} scenes`);for(let P=1;P<c;P++){const M=y[P];if(!M){n(`No prompt for scene ${P+1} — skipping`);continue}const m=P+1;n(`--- Scene ${m}/${c} ---`),await g(2e3),v(`scene${m}-prompt`,"active");const C=ae();if(C)await se(C,M),n(`Pasted scene ${m} prompt (${M.length} chars)`),t.push(`✅ Scene${m} Prompt`),v(`scene${m}-prompt`,"done");else{T(`Could not find prompt input for scene ${m}`),t.push(`❌ Scene${m}`),r.push(`scene ${m} prompt input not found`),v(`scene${m}-prompt`,"error");break}await g(1e3),v(`scene${m}-gen`,"active");const k=re();if(k){const B=k.getBoundingClientRect(),O=B.left+B.width/2,N=B.top+B.height/2,F={bubbles:!0,cancelable:!0,clientX:O,clientY:N,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",F)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",F)),k.dispatchEvent(new MouseEvent("click",F)),n(`Clicked Generate for scene ${m} (full event sequence)`),t.push(`✅ Scene${m} Gen`),v(`scene${m}-gen`,"done"),await g(500),k.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",F)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",F)),k.dispatchEvent(new MouseEvent("click",F))}else{T(`Could not find Generate button for scene ${m}`),t.push(`❌ Scene${m} Gen`),r.push(`scene ${m} generate button not found`),v(`scene${m}-gen`,"error");break}v(`scene${m}-wait`,"active"),await h(m)?(t.push(`✅ Scene${m}`),v(`scene${m}-wait`,"done",100)):(T(`Timeout on scene ${m}`),t.push(`⚠️ Scene${m}`),v(`scene${m}-wait`,"error"))}n("All scenes generated!"),t.push("✅ All Scenes"),await g(3e3),await $()}}catch(w){T(`Step 6 error: ${w.message}`),t.push("⚠️ Step6"),r.push(`step 6: ${w.message}`)}}const d=r.length===0;try{Se(d?5e3:8e3)}catch(c){console.warn("Overlay complete error:",c)}return{success:d,message:d?`สำเร็จ! ${t.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${t.join(" → ")} | ${r.join(", ")}`,step:d?"done":"partial"}}chrome.runtime.onMessage.addListener((e,t,r)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("Received GENERATE_IMAGE request"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Oe(e).then(o=>n(`✅ Automation finished: ${o.message}`)).catch(o=>console.error("[Netflow AI] Generate error:",o)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ STOP_AUTOMATION received — setting stop flag"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return r({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — finding first image card via <i>image</i> icon..."),await g(500);const o=Be();if(!o){T("No image card found via <i>image</i> icon");return}const i=o.getBoundingClientRect(),s=i.left+i.width/2,l=i.top+i.height/2;n(`Image card at (${s.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — clicking 2 times`);for(let a=0;a<2;a++){const u=document.elementFromPoint(s,l);u?(await V(u),n(`Click ${a+1}/2 on <${u.tagName.toLowerCase()}>`)):(await V(o),n(`Click ${a+1}/2 on card (fallback)`)),await g(300)}n("✅ 2 clicks on image card done")})(),!1}),n("Google Flow content script ready — waiting for commands"),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),s=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ DblClick (${o},${i}) → <${r}> "${s}"`)},!0)})();
