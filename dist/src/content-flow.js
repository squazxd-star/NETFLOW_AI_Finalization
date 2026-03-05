(function(){"use strict";let j=null,H=null,ae=null,Se=0,fe=null,ge=null,oe=!1,X=[];const se=[],Le=4;function we(t){const o=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)o.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{o.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let a=2;a<=t;a++)o.push({stepId:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"},{stepId:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"},{stepId:`scene${a}-wait`,label:`Scene ${a} รอ %`,status:"waiting",progress:0});o.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return o}const ce=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];X=we(1);function Te(){ae||(ae=document.createElement("style"),ae.id="netflow-overlay-styles",ae.textContent=`
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
    `,document.head.appendChild(ae))}function Oe(){const t="http://www.w3.org/2000/svg",o=document.createElementNS(t,"svg");o.setAttribute("class","nf-pipes-svg"),o.setAttribute("viewBox","0 0 100 100"),o.setAttribute("preserveAspectRatio","none");const a=document.createElementNS(t,"defs"),n=document.createElementNS(t,"linearGradient");n.id="nf-pipe-gradient";const i=document.createElementNS(t,"stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color","rgba(220,38,38,0.9)");const s=document.createElementNS(t,"stop");s.setAttribute("offset","50%"),s.setAttribute("stop-color","rgba(251,146,60,0.8)");const l=document.createElementNS(t,"stop");l.setAttribute("offset","100%"),l.setAttribute("stop-color","rgba(220,38,38,0.9)"),n.appendChild(i),n.appendChild(s),n.appendChild(l),a.appendChild(n);const c=document.createElementNS(t,"filter");c.id="nf-glow",c.setAttribute("x","-50%"),c.setAttribute("y","-50%"),c.setAttribute("width","200%"),c.setAttribute("height","200%");const r=document.createElementNS(t,"feGaussianBlur");r.setAttribute("stdDeviation","3"),r.setAttribute("result","coloredBlur");const d=document.createElementNS(t,"feMerge"),y=document.createElementNS(t,"feMergeNode");y.setAttribute("in","coloredBlur");const x=document.createElementNS(t,"feMergeNode");x.setAttribute("in","SourceGraphic"),d.appendChild(y),d.appendChild(x),c.appendChild(r),c.appendChild(d),a.appendChild(c),o.appendChild(a);function A(C,v){const k=document.createElementNS(t,"path");k.setAttribute("d",C),k.setAttribute("class","nf-pipe-glow"),k.style.animationDelay=`${v*.5}s`,o.appendChild(k);const V=document.createElementNS(t,"path");V.setAttribute("d",C),V.setAttribute("class","nf-pipe-base"),o.appendChild(V);const ee=document.createElementNS(t,"path");ee.setAttribute("d",C),ee.setAttribute("class","nf-pipe-flow"),ee.style.animationDelay=`${v*.3}s`,o.appendChild(ee)}return A("M 39 44 C 39 47, 40 48, 40.5 46",0),A("M 61 44 C 61 47, 60 48, 59.5 46",1),A("M 39 56 C 39 53, 40 52, 40.5 54",2),A("M 61 56 C 61 53, 60 52, 59.5 54",3),A("M 39 38 C 44 30, 56 30, 61 38",4),A("M 39 62 C 44 70, 56 70, 61 62",5),A("M 28 46 C 23 50, 23 50, 28 54",6),A("M 72 46 C 77 50, 77 50, 72 54",7),[[40.5,46],[59.5,46],[40.5,54],[59.5,54],[39,44],[61,44],[39,56],[61,56],[39,38],[61,38],[39,62],[61,62],[28,46],[72,46],[28,54],[72,54]].forEach(([C,v])=>{const k=document.createElementNS(t,"circle");k.setAttribute("cx",String(C)),k.setAttribute("cy",String(v)),k.setAttribute("r","0.35"),k.setAttribute("class","nf-pipe-dot"),o.appendChild(k)}),o}function Ie(t){t.innerHTML="",X.forEach((o,a)=>{const n=document.createElement("div");n.className="nf-proc-row nf-proc-waiting",n.id=`nf-proc-${o.stepId}`,n.innerHTML=`
            <span class="nf-proc-num">${a+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${o.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(n)})}function _e(){const t=document.getElementById("nf-terminal");if(!t)return;Ie(t);const o=document.getElementById("nf-step-counter");o&&(o.textContent=`0/${X.length}`)}function ze(){const t=document.createElement("div");t.id="netflow-engine-overlay",["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(x=>{const A=document.createElement("div");A.className=`nf-corner-deco ${x}`,t.appendChild(A)});const o=document.createElement("button");o.className="nf-close-btn",o.textContent="✕ ซ่อน",o.onclick=()=>ye(),t.appendChild(o);const a=document.createElement("div");a.className="nf-layout",a.appendChild(Oe());const n=document.createElement("div");n.className="nf-core-monitor",n.id="nf-core-monitor";const i=document.createElement("div");i.className="nf-core-header",i.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">CORE STATUS:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,n.appendChild(i);const s=document.createElement("div");s.className="nf-terminal",s.id="nf-terminal",Ie(s),n.appendChild(s);const l=document.createElement("div");l.className="nf-log-feed",l.id="nf-log-feed",l.innerHTML='<div class="nf-log-line" style="color:rgba(220,38,38,0.4)">Waiting for automation...</div>',n.appendChild(l);const c=document.createElement("div");c.className="nf-visualizer",c.id="nf-visualizer";const r=30;for(let x=0;x<r;x++){const A=document.createElement("div");A.className=`nf-viz-bar${x%5===0?" nf-viz-accent":""}`,A.style.height="3px",c.appendChild(A)}n.appendChild(c),a.appendChild(n);const d=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ce.forEach((x,A)=>{const E=Ge(x);E.classList.add(d[A]),E.id=`nf-mod-${x.id}`,a.appendChild(E)}),t.appendChild(a);for(let x=0;x<20;x++){const A=document.createElement("div");A.className="nf-particle",A.style.left=`${10+Math.random()*80}%`,A.style.bottom=`${Math.random()*30}%`,A.style.animationDuration=`${3+Math.random()*5}s`,A.style.animationDelay=`${Math.random()*4}s`,Math.random()>.5&&(A.style.background="rgba(251, 146, 60, 0.4)"),t.appendChild(A)}const y=document.createElement("div");return y.className="nf-footer",y.innerHTML=`
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
    `,t.appendChild(y),t}function Ge(t){const o=document.createElement("div");o.className="nf-module";const a=document.createElement("div");a.className="nf-mod-header",a.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,o.appendChild(a),t.steps.forEach(i=>{const s=document.createElement("div");s.className="nf-step",s.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),s.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,o.appendChild(s)});const n=document.createElement("div");return n.className="nf-mod-progress",n.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,o.appendChild(n),o}function We(){Se=Date.now(),fe=setInterval(()=>{const t=Math.floor((Date.now()-Se)/1e3),o=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),n=document.getElementById("nf-timer");n&&(n.textContent=`${o}:${a}`)},1e3)}function Me(){fe&&(clearInterval(fe),fe=null)}function qe(){ge=setInterval(()=>{const t=document.getElementById("nf-visualizer");if(!t)return;t.querySelectorAll(".nf-viz-bar").forEach(a=>{const n=3+Math.random()*28;a.style.height=`${n}px`})},180)}function Ae(){ge&&(clearInterval(ge),ge=null);const t=document.getElementById("nf-visualizer");t&&t.querySelectorAll(".nf-viz-bar").forEach(o=>{o.style.height="3px"})}function ve(){let t=0;const o=X.filter(c=>c.status!=="skipped").length;for(const c of X){const r=document.getElementById(`nf-proc-${c.stepId}`);if(!r)continue;r.className="nf-proc-row";const d=r.querySelector(".nf-proc-badge");switch(c.status){case"done":r.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),t++;break;case"active":r.classList.add("nf-proc-active"),d&&(d.textContent=c.progress!==void 0&&c.progress>0?`⏳ ${c.progress}%`:"⏳ active");break;case"error":r.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":r.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:r.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const a=document.getElementById("nf-step-counter");a&&(a.textContent=`${t}/${X.length}`);const n=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");t>=o&&o>0?(n&&(n.textContent="COMPLETE",n.style.color="#4ade80"),i&&(i.style.background="#4ade80",i.style.boxShadow="0 0 8px rgba(74,222,128,0.7)")):X.some(r=>r.status==="error")?(n&&(n.textContent="ERROR",n.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(r=>r.status==="active")&&n&&(n.textContent="ACTIVE",n.style.color="#4ade80",n.style.textShadow="0 0 10px rgba(74,222,128,0.5)");const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function Be(){H||(Te(),H=document.createElement("button"),H.id="nf-toggle-btn",H.className="nf-toggle-hidden",H.innerHTML="⚡",H.title="เปิด Netflow Overlay",H.onclick=()=>ye(),document.body.appendChild(H))}function ye(){j&&(Be(),oe?(j.classList.remove("nf-hidden"),j.classList.add("nf-visible"),H&&(H.classList.remove("nf-toggle-visible"),H.classList.add("nf-toggle-hidden")),oe=!1):(j.classList.remove("nf-visible"),j.classList.add("nf-hidden"),H&&(H.classList.remove("nf-toggle-hidden"),H.classList.add("nf-toggle-visible")),oe=!0))}function Ve(){if(j){oe&&ye();return}Te(),X=we(1),se.length=0,j=ze(),document.body.appendChild(j),oe=!1,Be(),We(),qe()}function He(){Me(),Ae(),oe=!1,j&&(j.classList.add("nf-fade-out"),setTimeout(()=>{j==null||j.remove(),j=null},500)),H&&(H.remove(),H=null)}function g(t,o,a){if(!j)return;for(const i of ce)for(const s of i.steps)s.id===t&&(s.status=o,a!==void 0&&(s.progress=a));for(const i of X)i.stepId===t&&(i.status=o,a!==void 0&&(i.progress=a));const n=document.getElementById(`nf-step-${t}`);if(n&&(n.className="nf-step",o==="active"?n.classList.add("nf-step-active"):o==="done"?n.classList.add("nf-step-done"):o==="error"&&n.classList.add("nf-step-error")),a!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,a)}%`)}xe(),ve()}function ie(t){g(t,"skipped");const o=document.getElementById(`nf-step-${t}`);o&&(o.style.opacity="0.2")}function Ue(t=4e3){Me(),Ae(),xe(),ve(),setTimeout(()=>He(),t)}function xe(){for(const t of ce){const o=t.steps.filter(r=>r.status!=="skipped").length,a=t.steps.filter(r=>r.status==="done").length,n=t.steps.some(r=>r.status==="active"),i=o>0?Math.round(a/o*100):0,s=document.getElementById(`nf-pct-${t.id}`);s&&(s.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):n&&c.classList.add("nf-active"))}}function je(t){var n,i,s,l;const o=new Map;for(const c of X)o.set(c.stepId,{status:c.status,progress:c.progress});X=we(t);for(const c of X){const r=o.get(c.stepId);r&&(c.status=r.status,r.progress!==void 0&&(c.progress=r.progress))}if(_e(),t>1){const c=ce.find(r=>r.id==="video");if(c){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((n=c.steps.find(d=>d.id==="animate"))==null?void 0:n.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((s=c.steps.find(d=>d.id==="vid-generate"))==null?void 0:s.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)r.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),r.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),r.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});c.steps=r,Fe(c)}}const a=ce.find(c=>c.id==="render");if(a&&t>1){const c=a.steps.find(d=>d.id==="download");c&&(c.label="ดาวน์โหลด 720p");const r=a.steps.find(d=>d.id==="upscale");r&&(r.label="Full Video"),Fe(a)}xe(),ve()}function Fe(t){const o=document.getElementById(`nf-mod-${t.id}`);if(!o)return;o.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const s=document.createElement("div");s.className="nf-step",s.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),s.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,o.appendChild(s)});const n=document.createElement("div");n.className="nf-mod-progress",n.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,o.appendChild(n)}function De(t){const o=t.replace(/^\[Netflow AI\]\s*/,"");se.push(o),se.length>Le&&se.shift();const a=document.getElementById("nf-log-feed");a&&(a.innerHTML=se.map(n=>`<div class="nf-log-line">&gt; ${n}</div>`).join(""))}const e=t=>{console.log(`[Netflow AI] ${t}`);try{De(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},M=t=>{console.warn(`[Netflow AI] ${t}`);try{De(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}},le=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ee=/Win/i.test(navigator.userAgent),re=le?"🍎 Mac":Ee?"🪟 Win":"🐧 Other";e(`Content script loaded on Google Flow page ${re}`),document.addEventListener("click",t=>{const o=t.target;if(!o)return;const a=o.tagName.toLowerCase(),n=Math.round(t.clientX),i=Math.round(t.clientY),s=(o.textContent||"").trim().slice(0,30);e(`🖱️ Click (${n},${i}) → <${a}> "${s}"`)},!0);const p=t=>new Promise(o=>setTimeout(o,t));async function ne(t){const o=t.getBoundingClientRect(),a=o.left+o.width/2,n=o.top+o.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:n,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await p(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await p(50),t.click()}function Ye(t){const o=t.getBoundingClientRect(),a=o.left+o.width/2,n=o.top+o.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:n};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function Ne(t){const o=[],a=document.querySelectorAll("i");for(const n of a){if((n.textContent||"").trim()!==t)continue;let s=n,l=null,c=1/0;for(let r=0;r<20&&s&&(s=s.parentElement,!(!s||s===document.body));r++){const d=s.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const y=d.width*d.height;y<c&&(l=s,c=y)}}l&&!o.includes(l)&&o.push(l)}return o.sort((n,i)=>{const s=n.getBoundingClientRect(),l=i.getBoundingClientRect();return s.left-l.left}),o}function Ce(){const t=Ne("videocam");if(t.length>0){const a=t[0].getBoundingClientRect();return e(`🎬 Found ${t.length} video card(s) via <i>videocam</i> — first at (${a.left.toFixed(0)},${a.top.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),t[0]}const o=document.querySelectorAll("video");for(const a of o){let n=a.parentElement;for(let i=0;i<10&&n;i++){const s=n.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6)return e(`🎬 Found video card via <video> fallback at (${s.left.toFixed(0)},${s.top.toFixed(0)})`),n;n=n.parentElement}}return e("🎬 No video card found"),null}function Xe(){const t=Ne("image");if(t.length>0){const a=t[0].getBoundingClientRect();return e(`🖼️ Found ${t.length} image card(s) via <i>image</i> — first at (${a.left.toFixed(0)},${a.top.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),t[0]}const o=document.querySelectorAll("canvas");for(const a of o){let n=a.parentElement;for(let i=0;i<10&&n;i++){const s=n.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6)return e(`🖼️ Found image card via <canvas> fallback at (${s.left.toFixed(0)},${s.top.toFixed(0)})`),n;n=n.parentElement}}return e("🖼️ No image card found"),null}function Je(t,o){var c;const[a,n]=t.split(","),i=((c=a.match(/:(.*?);/))==null?void 0:c[1])||"image/png",s=atob(n),l=new Uint8Array(s.length);for(let r=0;r<s.length;r++)l[r]=s.charCodeAt(r);return new File([l],o,{type:i})}function de(t){var n;const o=[],a=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of a)if(((n=i.textContent)==null?void 0:n.trim())===t){const s=i.closest("button");s&&o.push(s)}return o}function Ke(){const t=[...de("add"),...de("add_2")];if(t.length===0){e("No add buttons found by icon — trying text search");const n=document.querySelectorAll("button");for(const i of n){const s=i.getBoundingClientRect();if(s.bottom>window.innerHeight*.7&&s.width<60&&s.height<60){const l=(i.textContent||"").trim();if(l==="+"||l==="add")return i}}return null}let o=null,a=0;for(const n of t){const i=n.getBoundingClientRect();i.y>a&&(a=i.y,o=n)}return o&&e(`Found prompt bar "+" button at y=${a.toFixed(0)}`),o}function $e(){for(const n of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=de(n);let s=null,l=0;for(const c of i){const r=c.getBoundingClientRect();r.y>l&&(l=r.y,s=c)}if(s)return e(`Found generate button via icon "${n}" at y=${l.toFixed(0)}`),s}const t=document.querySelectorAll("button");let o=null,a=0;for(const n of t){const i=n.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const s=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(s?1e3:0);l>a&&(a=l,o=n)}}if(o)return e("Found generate button via bottom-right heuristic"),o;for(const n of t){const i=(n.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return n}return null}function me(){const t=document.querySelectorAll("textarea");for(const n of t)if(n.getBoundingClientRect().bottom>window.innerHeight*.5)return n;const o=document.querySelectorAll('[contenteditable="true"]');for(const n of o)if(n.getBoundingClientRect().bottom>window.innerHeight*.5)return n;const a=document.querySelectorAll("input[type='text'], input:not([type])");for(const n of a){const i=n.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return n}return t.length>0?t[t.length-1]:null}async function ke(t,o){var a,n,i,s;t.focus(),await p(300),e("setPromptText: Strategy 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",o),l.setData("text/html",`<p>${o.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),e("setPromptText: Dispatched beforeinput insertFromPaste");const r=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(r),await p(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){e(`setPromptText: ✅ Strategy 1 worked (${d.length} chars)`);return}e(`setPromptText: Strategy 1 — text not detected (got ${d.length} chars)`)}catch(l){e(`setPromptText: Strategy 1 failed: ${l.message}`)}e("setPromptText: Strategy 2 — Slate beforeinput insertText");try{t.focus(),await p(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:o});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:o});t.dispatchEvent(c),await p(800);const r=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){e(`setPromptText: ✅ Strategy 2 worked (${r.length} chars)`);return}e("setPromptText: Strategy 2 — text not detected")}catch(l){e(`setPromptText: Strategy 2 failed: ${l.message}`)}e("setPromptText: Strategy 3 — ClipboardEvent paste (Mac-safe)");try{t.focus(),await p(200);const l=new DataTransfer;l.setData("text/plain",o),l.setData("text/html",`<p>${o.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await p(800);const r=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(r.length>20){e(`setPromptText: ✅ Strategy 3 worked (${r.length} chars)`);return}e("setPromptText: Strategy 3 — ClipboardEvent text not detected")}catch(l){e(`setPromptText: Strategy 3 failed: ${l.message}`)}e("setPromptText: Strategy 4 — navigator.clipboard + execCommand paste");try{if((a=navigator.clipboard)!=null&&a.writeText)await navigator.clipboard.writeText(o),e("setPromptText: Copied to clipboard via navigator.clipboard");else{const c=document.createElement("textarea");c.value=o,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),e("setPromptText: Copied to clipboard via execCommand")}t.focus(),await p(200),document.execCommand("paste"),await p(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){e(`setPromptText: ✅ Strategy 4 worked (${l.length} chars)`);return}}catch(l){e(`setPromptText: Strategy 4 failed: ${l.message}`)}e("setPromptText: Strategy 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let r=0;r<30&&c;r++){const d=c.memoizedProps,y=c.memoizedState;if((n=d==null?void 0:d.editor)!=null&&n.insertText){e("setPromptText: Found Slate editor via fiber props");const x=d.editor;x.selection,x.insertText(o),e("setPromptText: ✅ Strategy 5 — inserted via editor.insertText");return}if((s=(i=y==null?void 0:y.memoizedState)==null?void 0:i.editor)!=null&&s.insertText){e("setPromptText: Found Slate editor via fiber state"),y.memoizedState.editor.insertText(o),e("setPromptText: ✅ Strategy 5 — inserted via state editor");return}c=c.return}e("setPromptText: Fiber found but no Slate editor in tree")}else e("setPromptText: No React fiber found on element")}catch(l){e(`setPromptText: Strategy 5 failed: ${l.message}`)}e("setPromptText: ⚠️ All 5 strategies attempted — check console for results")}function Qe(){const t=[],o=document.querySelectorAll('input[type="file"]');for(const a of o)t.push({input:a,origType:"file"}),a.type="text";return t.length>0&&e(`Neutralized ${t.length} file inputs (type → text)`),t}function Ze(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){e(`🚫 Blocked file dialog open (${re})`);return}return t.call(this)},e(`🔒 File dialog blocker installed (${re})`),()=>{HTMLInputElement.prototype.click=t,e("🔓 File dialog blocker removed")}}function et(t,o,a){var d;const n=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(y=>y.input)];for(const y of n)!i.includes(y)&&y.offsetParent===null&&i.push(y);for(const y of i)y.type="file";e(`Restored ${i.length} inputs to type=file`);const s=document.querySelectorAll('input[type="file"]');if(s.length===0)return e(`⚠️ No file inputs found after restore (${re})`),!1;let l;if(a&&a.size>0){const y=Array.from(s).filter(x=>!a.has(x));y.length>0?(l=y[y.length-1],e(`Targeting NEW file input (${y.length} new, ${s.length} total)`)):(l=s[s.length-1],e(`No new file inputs found — using last of ${s.length}`))}else l=s[s.length-1];const c=new DataTransfer;c.items.add(o);try{l.files=c.files,e(`Injected file via target.files (${((d=l.files)==null?void 0:d.length)??0} files)`)}catch(y){e(`target.files assignment failed: ${y.message} — trying defineProperty`);try{Object.defineProperty(l,"files",{value:c.files,writable:!0,configurable:!0}),e("Injected file via Object.defineProperty")}catch(x){return M(`Both file injection methods failed: ${x.message}`),!1}}const r=l._valueTracker;r&&(r.setValue(""),e("Reset React _valueTracker on file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const y=Object.keys(l).find(x=>x.startsWith("__reactProps$")||x.startsWith("__reactEvents$"));if(y){const x=l[y];if(x&&typeof x.onChange=="function"){const A={target:l,currentTarget:l,type:"change",bubbles:!0,isTrusted:!0};x.onChange(A),e("Triggered React fiber onChange directly")}else e("React fiber found but no onChange handler")}else e("No React fiber props found on file input")}catch(y){e(`React fiber onChange attempt: ${y.message}`)}try{const y=new DataTransfer;y.items.add(o);const x=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:y});l.dispatchEvent(x),e("Also dispatched drop event on file input")}catch{}return e(`✅ File injection complete: ${o.name} (${(o.size/1024).toFixed(1)} KB) → <input> ${re}`),!0}function he(){const t=document.querySelectorAll("img");for(const a of t){const n=a.getBoundingClientRect();if(n.bottom>window.innerHeight*.6&&n.width>20&&n.width<200&&n.height>20&&n.height<200&&a.src&&a.offsetParent!==null)return e(`Found thumbnail: ${n.width.toFixed(0)}x${n.height.toFixed(0)} at y=${n.top.toFixed(0)}`),!0}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of o){const n=a.getBoundingClientRect();if(n.bottom>window.innerHeight*.6&&n.width>20&&n.width<200&&n.height>20&&n.height<200&&a.offsetParent!==null)return e(`Found thumbnail div: ${n.width.toFixed(0)}x${n.height.toFixed(0)} at y=${n.top.toFixed(0)}`),!0}return!1}async function tt(t){e("Attempting drag-and-drop fallback on prompt bar...");const o=[],a=document.querySelectorAll('[contenteditable="true"]');for(const i of a)i.getBoundingClientRect().bottom>window.innerHeight*.5&&o.push(i);const n=document.querySelectorAll('form, [role="textbox"], [data-slate-editor]');for(const i of n)i.getBoundingClientRect().bottom>window.innerHeight*.5&&!o.includes(i)&&o.push(i);if(o.length===0){const i=document.querySelectorAll("div");for(const s of i){const l=s.getBoundingClientRect();if(l.bottom>window.innerHeight*.8&&l.width>300&&l.height>30&&l.height<200&&(o.push(s),o.length>=3))break}}if(o.length===0)return e("No prompt bar target found for drag-and-drop"),!1;e(`Found ${o.length} drag-and-drop targets`);for(const i of o)try{const s=i.getBoundingClientRect(),l=s.left+s.width/2,c=s.top+s.height/2,r={bubbles:!0,cancelable:!0,clientX:l,clientY:c},d=new DataTransfer;if(d.items.add(t),i.dispatchEvent(new DragEvent("dragenter",{...r,dataTransfer:d})),await p(100),i.dispatchEvent(new DragEvent("dragover",{...r,dataTransfer:d})),await p(100),i.dispatchEvent(new DragEvent("drop",{...r,dataTransfer:d})),e(`Dispatched drag-and-drop on <${i.tagName.toLowerCase()}> at (${l.toFixed(0)}, ${c.toFixed(0)})`),await p(500),he())return!0}catch(s){e(`Drag-and-drop error on target: ${s.message}`)}return!1}async function nt(t){e("Attempting clipboard paste fallback...");const o=me();if(!o)return e("No prompt element found for paste"),!1;try{o.focus(),await p(200);const a=new DataTransfer;a.items.add(t);const n=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:a});return o.dispatchEvent(n),e("Dispatched paste event with image file on prompt bar"),!0}catch(a){return e(`Paste fallback error: ${a.message}`),!1}}async function Re(t,o){var r;e(`── Uploading ${o} into prompt bar ──`);const a=Je(t,o);e(`File size: ${(a.size/1024).toFixed(1)} KB`);const n=Ke();if(!n)return M("Could not find prompt bar '+' button"),!1;const i=new Set(document.querySelectorAll('input[type="file"]'));e(`Pre-existing file inputs: ${i.size}`);const s=Ze();let l=Qe();const c=new MutationObserver(d=>{for(const y of d)for(const x of y.addedNodes)if(x instanceof HTMLInputElement&&x.type==="file"&&(x.type="text",l.push({input:x,origType:"file"}),e("🎯 Observer neutralized new file input")),x instanceof HTMLElement){const A=x.querySelectorAll('input[type="file"]');for(const E of A)E.type="text",l.push({input:E,origType:"file"}),e("🎯 Observer neutralized nested file input")}});c.observe(document.body,{childList:!0,subtree:!0});try{await ne(n),e("Clicked '+' button"),await p(1500),e("Checking for upload menu...");let d=!1;const y=Date.now();for(;!d&&Date.now()-y<5e3;){const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const v of C){if(v===n)continue;const k=v.querySelectorAll("i");for(const V of k){const ee=((r=V.textContent)==null?void 0:r.trim())||"";if((ee==="upload"||ee==="upload_file")&&!Array.from(v.querySelectorAll("i")).map(be=>{var pe;return(pe=be.textContent)==null?void 0:pe.trim()}).includes("drive_folder_upload")){await ne(v),d=!0,e(`Clicked upload menu (icon: ${ee}) [${le?"Mac":"Win"}]`);break}}if(d)break}if(!d)for(const v of C){if(v===n)continue;const k=v.childNodes.length<=5?(v.textContent||"").trim():"";if(k.length>0&&k.length<40){const V=k.toLowerCase();if(V==="upload"||V==="อัปโหลด"||V==="อัพโหลด"||V.includes("upload image")||V.includes("upload photo")||V.includes("อัปโหลดรูปภาพ")||V.includes("อัพโหลดรูปภาพ")||V.includes("from computer")||V.includes("จากคอมพิวเตอร์")){await ne(v),d=!0,e(`Clicked upload menu (text: "${k}") [${le?"Mac":"Win"}]`);break}}}d||await p(500)}d||e("⚠️ Upload menu not found after 5s polling"),await p(1e3);const x=et(l,a,i);if(x){if(e(`✅ Injected ${o} via file input — waiting for thumbnail...`),await p(2500),he())return e("✅ Thumbnail confirmed in prompt bar!"),!0;e("⚠️ No thumbnail detected after file input injection — trying drag-and-drop fallback")}else e("⚠️ File input injection failed — trying drag-and-drop fallback");if(await tt(a)){if(await p(2500),he())return e("✅ Thumbnail confirmed via drag-and-drop!"),!0;e("⚠️ Drag-and-drop dispatched but no thumbnail detected")}return await nt(a)&&(await p(2500),he())?(e("✅ Thumbnail confirmed via clipboard paste!"),!0):x?(e("File injection completed — thumbnail check may have false negative, proceeding"),!0):(M(`All upload strategies failed for ${o}`),!1)}finally{c.disconnect(),s();for(const d of l)d.input.type!=="file"&&(d.input.type="file")}}async function ot(t,o){e("=== Step 0: Configure Flow settings ===");const a=document.querySelectorAll("button");let n=null;for(const E of a){const C=E.textContent||"";if((C.includes("Nano Banana")||C.includes("Imagen")||C.includes("วิดีโอ")||C.includes("รูปภาพ")||C.includes("Image")||C.includes("Video"))&&E.getBoundingClientRect().bottom>window.innerHeight*.7){n=E,e(`Found settings button by text: "${C.substring(0,30).trim()}"`);break}}if(!n)for(const E of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const C=de(E);for(const v of C)if(v.getBoundingClientRect().bottom>window.innerHeight*.7){n=v,e(`Found settings button by icon: ${E}`);break}if(n)break}if(!n)return M("Could not find settings button"),!1;const i=n.getBoundingClientRect(),s=i.left+i.width/2,l=i.top+i.height/2,c={bubbles:!0,cancelable:!0,clientX:s,clientY:l,button:0};n.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mousedown",c)),await p(80),n.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseup",c)),n.dispatchEvent(new MouseEvent("click",c)),e("Clicked settings button"),await p(1500);let r=!1,d=null;const y=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const E of y){const C=E.getAttribute("aria-controls")||"",v=E.id||"";if(C.toUpperCase().includes("IMAGE")||v.toUpperCase().includes("IMAGE")){d=E,e(`Found Image tab via flow_tab_slider_trigger (aria-controls: ${C})`);break}}if(!d)for(const E of document.querySelectorAll('[role="tab"]')){const C=E.id||"";if(C.toUpperCase().includes("TRIGGER-IMAGE")){d=E,e(`Found Image tab via id: ${C}`);break}}if(!d)for(const E of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const C=(E.textContent||"").trim();if((C==="Image"||C.endsWith("Image")||C==="รูปภาพ"||C==="ภาพ")&&!C.includes("Video")&&!C.includes("วิดีโอ")){d=E,e(`Found Image tab via text match: "${C}"`);break}}if(d){const E=d.getAttribute("data-state")||"",C=d.getAttribute("aria-selected")||"";if(E==="active"||C==="true")r=!0,e("Image tab already active — no click needed");else{const v=d.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:v.left+v.width/2,clientY:v.top+v.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",k)),await p(80),d.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",k)),d.dispatchEvent(new MouseEvent("click",k)),r=!0,e("✅ Clicked Image tab — switched to Image mode"),await p(400)}}r||e("⚠️ Could not find Image mode button — may already be in Image mode");const x=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const E of document.querySelectorAll("button, [role='tab'], [role='option']")){const C=(E.textContent||"").trim();if(C===x||C.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const v=E.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:v.left+v.width/2,clientY:v.top+v.height/2,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",k)),await p(80),E.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",k)),E.dispatchEvent(new MouseEvent("click",k)),e(`Selected orientation: ${x}`),await p(400);break}}const A=`x${o}`;for(const E of document.querySelectorAll("button, [role='tab'], [role='option']"))if((E.textContent||"").trim()===A){const v=E.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:v.left+v.width/2,clientY:v.top+v.height/2,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",k)),await p(80),E.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",k)),E.dispatchEvent(new MouseEvent("click",k)),e(`Selected count: ${A}`),await p(400);break}return await p(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await p(300),n.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mousedown",c)),await p(80),n.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseup",c)),n.dispatchEvent(new MouseEvent("click",c)),e("Closed settings panel"),await p(600),!0}async function it(t){var V,ee,Pe,be,pe;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const o=navigator.userAgent,a=o.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),n=a?a[1]:"unknown",i=le?"macOS":Ee?"Windows":/Linux/i.test(o)?"Linux":/CrOS/i.test(o)?"ChromeOS":"Unknown",s=le?((ee=(V=o.match(/Mac OS X ([0-9_]+)/))==null?void 0:V[1])==null?void 0:ee.replace(/_/g,"."))||"":Ee&&((Pe=o.match(/Windows NT ([0-9.]+)/))==null?void 0:Pe[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;e("══════════════════════════════════════════"),e(`🖥️ System: ${i} ${s} | Chrome ${n}`),e(`🌐 Language: ${l} | Screen: ${c} | Platform: ${re}`),e("══════════════════════════════════════════");try{Ve()}catch(f){console.warn("Overlay show error:",f)}const r=[],d=[];try{g("settings","active");const f=t.orientation||"horizontal",J=t.outputCount||1,B=await ot(f,J);r.push(B?"✅ Settings":"⚠️ Settings"),g("settings",B?"done":"error")}catch(f){M(`Settings error: ${f.message}`),r.push("⚠️ Settings"),g("settings","error")}e("=== Step 1: Upload reference images ===");const y=()=>{const f=document.querySelectorAll("span, div, p, label");for(const J of f){const B=(J.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const w=J.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>0&&w.top<window.innerHeight)return B}}return null},x=async f=>{e(`Waiting for ${f} upload to complete...`),await p(2e3);const J=Date.now(),B=6e4;let w="",q=Date.now();const O=15e3;for(;Date.now()-J<B;){const F=y();if(F){if(F!==w)w=F,q=Date.now();else if(Date.now()-q>O){e(`✅ ${f} upload — % stuck at ${F} for ${O/1e3}s, treating as complete`),await p(1e3);return}e(`Upload in progress: ${F} — waiting...`),await p(1500)}else{e(`✅ ${f} upload complete — no % indicator found`),await p(1e3);return}}M(`⚠️ ${f} upload timeout after ${B/1e3}s — proceeding anyway`)};if(t.characterImage){g("upload-char","active");try{const f=await Re(t.characterImage,"character.png");r.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||d.push("character upload failed"),g("upload-char",f?"done":"error")}catch(f){M(`Character upload error: ${f.message}`),r.push("❌ ตัวละคร"),d.push("character upload error"),g("upload-char","error")}await x("character")}else ie("upload-char");if(t.productImage){g("upload-prod","active");try{const f=await Re(t.productImage,"product.png");r.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||d.push("product upload failed"),g("upload-prod",f?"done":"error")}catch(f){M(`Product upload error: ${f.message}`),r.push("❌ สินค้า"),d.push("product upload error"),g("upload-prod","error")}await x("product")}else ie("upload-prod");e("Closing any open dialogs..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await p(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await p(800);const A=y();A&&(e(`⚠️ Upload still showing ${A} after all uploads — waiting extra...`),await x("final")),e("All uploads complete — proceeding to prompt"),await p(1e3),e("=== Step 2: Paste image prompt ==="),g("img-prompt","active"),await p(1e3);const E=me();E?(await ke(E,t.imagePrompt),e(`Pasted prompt (${t.imagePrompt.length} chars)`),r.push("✅ Prompt"),g("img-prompt","done")):(M("Could not find prompt text input"),r.push("❌ Prompt"),d.push("prompt input not found"),g("img-prompt","error")),await p(800);const C=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&C.add(f.src)}),e(`Snapshot: ${C.size} existing images before Generate`),e("=== Step 3: Click Generate → ==="),g("img-generate","active"),await p(500);const v=$e();if(v){const f=v.getBoundingClientRect(),J=f.left+f.width/2,B=f.top+f.height/2,w={bubbles:!0,cancelable:!0,clientX:J,clientY:B,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",w)),await p(80),v.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",w)),v.dispatchEvent(new MouseEvent("click",w)),e("Dispatched full click sequence on Generate button"),r.push("✅ Generate"),await p(500),v.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",w)),await p(80),v.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",w)),v.dispatchEvent(new MouseEvent("click",w)),e("Dispatched safety retry click on Generate button"),g("img-generate","done")}else M("Could not find → Generate button"),r.push("❌ Generate"),d.push("generate button not found"),g("img-generate","error");e("=== Step 4: Wait for generated image + Animate ==="),g("img-wait","active");try{e("Waiting 15s for generation to start..."),await p(15e3),e("Polling for NEW generated image (not in snapshot)...");let f=null;const J=Date.now();for(;!f&&Date.now()-J<18e4;){const B=document.querySelectorAll("img");for(const w of B){if(C.has(w.src)||!(w.alt||"").toLowerCase().includes("generated"))continue;const O=w.getBoundingClientRect();if(O.width>120&&O.height>120&&O.top>0&&O.top<window.innerHeight*.85){const F=w.closest("div");if(F){f=F,e(`Found AI-generated image via alt="${w.alt}": ${w.src.substring(0,80)}...`);break}}}if(!f)for(const w of B){if(C.has(w.src))continue;const q=w.closest("div"),O=(q==null?void 0:q.textContent)||"";if(O.includes("product.png")||O.includes("character.png")||O.includes(".png")||O.includes(".jpg")){e(`Skipping reference image (container has filename): ${O.substring(0,40)}`);continue}const F=w.getBoundingClientRect();if(F.width>120&&F.height>120&&F.top>0&&F.top<window.innerHeight*.85){const b=w.closest("div");if(b){f=b,e(`Found NEW image (fallback): ${w.src.substring(0,80)}...`);break}}}f||(await p(5e3),e("Still waiting for new generated image..."))}if(!f)M("Timeout waiting for generated image"),r.push("⚠️ Wait Image"),g("img-wait","error");else{e("Found generated image element"),r.push("✅ Image Found"),g("img-wait","done",100);const B=f.getBoundingClientRect(),w=B.left+B.width/2,q=B.top+B.height/2,O={bubbles:!0,cancelable:!0,clientX:w,clientY:q};f.dispatchEvent(new PointerEvent("pointerenter",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",O)),f.dispatchEvent(new PointerEvent("pointerover",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",O)),f.dispatchEvent(new PointerEvent("pointermove",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",O)),e("Dispatched hover events on image (pointer + mouse)"),await p(1500);let F=null;for(const b of["more_vert","more_horiz","more"]){const S=de(b);for(const N of S){const u=N.getBoundingClientRect();if(u.top>=B.top-20&&u.top<=B.bottom&&u.right>=B.right-150&&u.right<=B.right+20){F=N;break}}if(F)break}if(!F){const b=document.querySelectorAll("button");for(const S of b){const N=S.getBoundingClientRect();if(N.width<50&&N.height<50&&N.top>=B.top-10&&N.top<=B.top+60&&N.left>=B.right-80){const u=S.querySelectorAll("i");for(const P of u)if((((be=P.textContent)==null?void 0:be.trim())||"").includes("more")){F=S;break}if(F)break;const $=S.getAttribute("aria-label")||"";if($.includes("เพิ่มเติม")||$.includes("more")){F=S;break}}}}if(!F)M("Could not find 3-dots button on generated image"),r.push("⚠️ 3-dots");else{const b=F.getBoundingClientRect(),S=b.left+b.width/2,N=b.top+b.height/2,u={bubbles:!0,cancelable:!0,clientX:S,clientY:N,button:0};F.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mousedown",u)),await p(80),F.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mouseup",u)),F.dispatchEvent(new MouseEvent("click",u)),e("Clicked 3-dots button"),await p(1500);let $=null;const P=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const T of P){const L=(T.textContent||"").trim();if(L.includes("ทำให้เป็นภาพเคลื่อนไหว")||L.includes("Animate")||L.includes("animate")){$=T;break}}if(!$)M("Could not find 'ทำให้เป็นภาพเคลื่อนไหว' menu item"),r.push("⚠️ Animate");else{const T=$.getBoundingClientRect(),L=T.left+T.width/2,K=T.top+T.height/2,R={bubbles:!0,cancelable:!0,clientX:L,clientY:K,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",R)),await p(80),$.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",R)),$.dispatchEvent(new MouseEvent("click",R)),e("✅ Clicked 'ทำให้เป็นภาพเคลื่อนไหว' — switching to video mode"),r.push("✅ Animate"),g("animate","done"),await p(3e3)}}}}catch(f){M(`Step 4 error: ${f.message}`),r.push("⚠️ Animate")}if(t.videoPrompt){e("=== Step 5: Paste video prompt + Generate video ==="),g("vid-prompt","active");try{e("Waiting for video mode UI..."),await p(3e3);let f=!1;const J=document.querySelectorAll("button, span, div");for(const q of J){const O=(q.textContent||"").trim(),F=q.getBoundingClientRect();if((O==="วิดีโอ"||O==="Video"||O.includes("วิดีโอ"))&&F.bottom>window.innerHeight*.7){f=!0,e("Confirmed: now in Video mode");break}}f||e("Video mode indicator not found — proceeding anyway (may already be in video mode after Animate)"),await p(1e3);const B=me();B?(await ke(B,t.videoPrompt),e(`Pasted video prompt (${t.videoPrompt.length} chars)`),r.push("✅ Video Prompt"),g("vid-prompt","done")):(M("Could not find prompt text input for video prompt"),r.push("❌ Video Prompt"),d.push("video prompt input not found"),g("vid-prompt","error")),await p(1e3),g("vid-generate","active");const w=$e();if(w){const q=w.getBoundingClientRect(),O=q.left+q.width/2,F=q.top+q.height/2,b={bubbles:!0,cancelable:!0,clientX:O,clientY:F,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",b)),await p(80),w.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",b)),w.dispatchEvent(new MouseEvent("click",b)),e("✅ Clicked Generate for video — video generation started!"),r.push("✅ Video Generate"),g("vid-generate","done"),await p(500),w.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",b)),await p(80),w.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",b)),w.dispatchEvent(new MouseEvent("click",b)),e("Dispatched safety retry click on video Generate button")}else M("Could not find Generate button for video"),r.push("❌ Video Generate"),d.push("video generate button not found"),g("vid-generate","error")}catch(f){M(`Step 5 error: ${f.message}`),r.push("⚠️ Video Gen"),d.push(`video gen error: ${f.message}`)}}else e("No video prompt provided — skipping video generation step"),ie("animate"),ie("vid-prompt"),ie("vid-generate"),ie("vid-wait");if(t.videoPrompt){g("vid-wait","active");const f=t.sceneCount||1,J=t.videoScenePrompts||[t.videoPrompt];if(f>1)try{je(f)}catch{}e(`=== Step 6: Wait for video + ${f>1?`continue ${f} scenes`:"download"} ===`);const B=document.getElementById("netflow-engine-overlay"),w=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");for(const S of b){if(B&&B.contains(S))continue;const N=(S.textContent||"").trim();if(N.length>10)continue;const u=N.match(/(\d{1,3})\s*%/);if(!u)continue;const $=parseInt(u[1],10);if($<1||$>100)continue;const P=S.getBoundingClientRect();if(!(P.width===0||P.width>150)&&!(P.top<0||P.top>window.innerHeight))return $}return null},q=async(b=6e5)=>{e("Waiting for video generation..."),g("vid-wait","active"),await p(5e3);const S=()=>{const D=document.querySelectorAll("div, span, p, label, strong, small");let G=0;for(const m of D){if(B&&B.contains(m))continue;const h=(m.textContent||"").trim();if(h.includes("%")&&h.length<15){const I=m.tagName.toLowerCase(),W=m.className&&typeof m.className=="string"?m.className.split(/\s+/).slice(0,2).join(" "):"",z=m.getBoundingClientRect();if(e(`  🔍 "${h}" in <${I}.${W}> at (${z.left.toFixed(0)},${z.top.toFixed(0)}) w=${z.width.toFixed(0)}`),G++,G>=5)break}}G===0&&e("  🔍 No element with '%' text found")},N=Ce();e(N?"📍 Video card already present at start":"⏳ No video card yet — will poll for % progress"),e("🔍 Debug scan for % text nodes:"),S();const u=Date.now();let $=-1,P=0,T=!1;for(;Date.now()-u<b;){const D=w();if(D!==null){if(D!==$&&(e(`Video progress: ${D}%`),$=D,g("vid-wait","active",D)),P=Date.now(),D>=100){e("✅ 100% detected!"),T=!0;break}}else if($>30){const G=Math.floor((Date.now()-P)/1e3);if(G>=5){e(`✅ % disappeared at ${$}% (lost for ${G}s) — video done!`),T=!0;break}e(`⏳ % lost at ${$}% — confirming in ${5-G}s...`)}else{const G=Math.floor((Date.now()-u)/1e3);G%15<3&&e(`⏳ Waiting... (${G}s) no % found`)}if(!T&&$>0&&Ce()&&!N){e(`✅ Video card appeared while tracking at ${$}% — video done!`),T=!0;break}await p(3e3)}const L=Ce();if(!L)return e("❌ No video card found to click"),g("vid-wait","error"),null;const K=L;T?(g("vid-wait","done",100),e("Cool-down 4s before clicking..."),await p(4e3)):e("⚠️ Timeout — attempting to click video card anyway");const R=K.getBoundingClientRect();let _=R.left+R.width/2,U=R.top+R.height/2,Y=K;const Z=K.querySelector("video, img, canvas");if(Z){const D=Z.getBoundingClientRect();D.width>50&&D.height>50&&(_=D.left+D.width/2,U=D.top+D.height/2,Y=Z,e(`🎯 Found thumbnail <${Z.tagName.toLowerCase()}> inside card at (${_.toFixed(0)},${U.toFixed(0)}) ${D.width.toFixed(0)}x${D.height.toFixed(0)}`))}else U=R.top+R.height*.3,e(`🎯 No thumbnail child — clicking top 1/3 at (${_.toFixed(0)},${U.toFixed(0)})`);e(`🖱️ Hovering video card 4s at (${_.toFixed(0)}, ${U.toFixed(0)})...`),Ye(Y);for(let D=0;D<8;D++){const G={bubbles:!0,cancelable:!0,clientX:_+D%2,clientY:U};Y.dispatchEvent(new PointerEvent("pointermove",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Y.dispatchEvent(new MouseEvent("mousemove",G)),await p(500)}e("Clicking video card...");for(let D=0;D<2;D++){const G=document.elementFromPoint(_,U);G?await ne(G):await ne(Y),await p(300)}return e("✅ Video card clicks done"),K},O=async(b,S=6e5)=>{e(`Waiting for scene ${b} video generation...`),await p(5e3);const N=Date.now();let u=-1,$=0;for(;Date.now()-N<S;){const P=w();if(P!==null){if(P!==u&&(e(`Scene ${b} progress: ${P}%`),u=P),$=Date.now(),P>=100)return e(`✅ Scene ${b} — 100%!`),!0}else if(u>30){const T=Math.floor((Date.now()-$)/1e3);if(T>=5)return e(`✅ Scene ${b} — % disappeared at ${u}% (${T}s) — done!`),!0;e(`⏳ Scene ${b} % lost at ${u}% — confirming in ${5-T}s...`)}else{const T=Math.floor((Date.now()-N)/1e3);T%15<3&&e(`⏳ Scene ${b} waiting... (${T}s)`)}await p(3e3)}return!1},F=async()=>{var G;let b=null;const S=document.querySelectorAll("button");for(const m of S){const h=(m.textContent||"").trim();if(h.includes("ดาวน์โหลด")||h.toLowerCase().includes("download")){b=m,e(`Found ดาวน์โหลด button via text: "${h}"`);break}}if(!b)for(const m of S){const h=m.getBoundingClientRect();if(h.top<80&&h.right>window.innerWidth-300){const I=(m.textContent||"").trim().toLowerCase(),W=(m.getAttribute("aria-label")||"").toLowerCase();if(I.includes("ดาวน์")||I.includes("download")||W.includes("ดาวน์")||W.includes("download")){b=m,e("Found ดาวน์โหลด button via position+text");break}}}if(!b){const m=document.querySelectorAll('[data-type="button-overlay"]');for(const h of m){const I=h.closest("button")||h.parentElement;if(I){const W=(I.textContent||"").trim();if(W.includes("ดาวน์โหลด")||W.toLowerCase().includes("download")){b=I,e("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!b){M("Could not find ดาวน์โหลด button in detail view"),r.push("⚠️ Download btn");return}const N=b.getBoundingClientRect(),u={bubbles:!0,cancelable:!0,clientX:N.left+N.width/2,clientY:N.top+N.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",u)),await p(80),b.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",u)),b.dispatchEvent(new MouseEvent("click",u)),await p(50),b.click(),e("Clicked ดาวน์โหลด button"),r.push("✅ ดาวน์โหลด"),g("download","done"),g("upscale","active"),await p(1500);const $=async m=>{const h=m.getBoundingClientRect(),I={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",I)),await p(80),m.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",I)),m.dispatchEvent(new MouseEvent("click",I)),await p(50),m.click()},P=async m=>{const h=m.getBoundingClientRect(),I={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2};m.dispatchEvent(new PointerEvent("pointerenter",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseenter",I)),m.dispatchEvent(new PointerEvent("pointermove",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseover",I)),m.dispatchEvent(new MouseEvent("mousemove",I))},T=m=>{const h=document.querySelectorAll('[role="menuitem"]');for(const I of h)if((I.textContent||"").trim().includes(m)){const z=I.getBoundingClientRect();if(z.width>0&&z.height>0)return I}return null},L=T("Full Video");if(L){e("Multi-scene menu detected — hovering Full Video..."),await P(L),await p(500),await $(L),e("Clicked Full Video"),r.push("✅ Full Video"),await p(1500);let m=null;const h=Date.now();for(;Date.now()-h<5e3&&(m=T("720p"),!m);)e("Waiting for 720p submenu..."),await p(500);if(!m){M("Could not find 720p option in submenu"),r.push("⚠️ 720p");return}await $(m),e("Clicked 720p — download starting"),r.push("✅ 720p"),g("upscale","active")}else{let m=T("1080p");if(!m){const h=document.querySelectorAll("button, div[role='button'], span");for(const I of h)if((I.textContent||"").trim().includes("1080p")&&I.offsetParent!==null){m=I.closest("button")||I;break}}if(!m){M("Could not find 1080p option"),r.push("⚠️ 1080p");return}await $(m),e("Clicked 1080p — download starting"),r.push("✅ 1080p"),g("upscale","active")}e("Waiting for download to complete...");const K=Date.now();let R=!1,_=!1,U=0;const Y=8e3;for(;Date.now()-K<3e5;){const h=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(h.includes("download complete")||h.includes("upscaling complete")||h.includes("upscale complete")||h.includes("video is ready")||h.includes("video ready")){const z=h.includes("download")?"Downloaded":"Upscaled";e(`✅ ${z}! (text match)`),r.push(`✅ ${z}`),g("upscale","done",100),R=!0;break}const I=document.querySelectorAll("div, span, p, h1, h2, h3");for(const z of I){const Q=(z.textContent||"").trim().toLowerCase();if(Q.length<60&&(Q.includes("upscaling complete")||Q.includes("upscale complete")||Q.includes("download complete")||Q.includes("video is ready"))){e(`✅ Complete! (element: "${(G=z.textContent)==null?void 0:G.trim()}")`),r.push("✅ Upscaled"),g("upscale","done",100),R=!0;break}}if(R)break;if(h.includes("upscaling your video")||h.includes("upscaling video")||h.includes("downloading your extended video")||h.includes("downloading video")){_=!0,U=0;const z=Math.floor((Date.now()-K)/1e3);h.includes("downloading")?e(`⏳ Downloading extended video... (${z}s)`):e(`⏳ Upscaling in progress... (${z}s)`)}else if(_)if(U===0)U=Date.now(),e("🔍 Processing text disappeared — confirming...");else if(Date.now()-U>=Y){e(`✅ Processing text gone for ${Y/1e3}s — done!`),r.push("✅ Upscaled"),g("upscale","done",100),R=!0;break}else{const z=Math.ceil((Y-(Date.now()-U))/1e3);e(`🔍 Confirming done... (${z}s)`)}else{const z=Math.floor((Date.now()-K)/1e3);e(`⏳ Waiting... (${z}s)`)}await p(2e3)}if(!R){M("Download timeout — file may still be downloading"),r.push("⚠️ Download timeout"),g("upscale","error");return}g("open","active"),e("Waiting for download file to be ready..."),await p(5e3);let Z=!1;const D=Date.now();for(;Date.now()-D<6e4&&!Z;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},h=>{chrome.runtime.lastError?M(`Download poll error: ${chrome.runtime.lastError.message}`):h!=null&&h.success?(e(`✅ Opened video: ${h.message}`),r.push("✅ Opened"),g("open","done"),Z=!0):e(`Download not ready: ${h==null?void 0:h.message}`),m()})})}catch(m){M(`Poll exception: ${m.message}`)}Z||await p(3e3)}Z||(M("Could not find/open downloaded video"),r.push("⚠️ Open"))};try{if(!await q())M("Timeout waiting for video generation"),r.push("⚠️ Video Wait"),g("vid-wait","error");else if(r.push("✅ Video Complete"),g("vid-wait","done",100),g("download","active"),f<=1){e("Single scene — waiting 3s for detail view to load..."),r.push("✅ Clicked"),await p(3e3);let S=null;const N=document.querySelectorAll("button");for(const u of N){const $=(u.textContent||"").trim();if($.includes("ดาวน์โหลด")||$.toLowerCase().includes("download")){S=u,e(`Found ดาวน์โหลด button via text: "${$}"`);break}}if(!S)for(const u of N){const $=u.getBoundingClientRect();if($.top<80&&$.right>window.innerWidth-300){const P=(u.textContent||"").trim().toLowerCase(),T=(u.getAttribute("aria-label")||"").toLowerCase();if(P.includes("ดาวน์")||P.includes("download")||T.includes("ดาวน์")||T.includes("download")){S=u,e("Found ดาวน์โหลด button via position+text");break}}}if(!S){const u=document.querySelectorAll('[data-type="button-overlay"]');for(const $ of u){const P=$.closest("button")||$.parentElement;if(P){const T=(P.textContent||"").trim();if(T.includes("ดาวน์โหลด")||T.toLowerCase().includes("download")){S=P,e("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!S)M("Could not find ดาวน์โหลด button in detail view"),r.push("⚠️ Download btn");else{const u=S.getBoundingClientRect(),$=u.left+u.width/2,P=u.top+u.height/2,T={bubbles:!0,cancelable:!0,clientX:$,clientY:P,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",T)),await p(80),S.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",T)),S.dispatchEvent(new MouseEvent("click",T)),await p(50),S.click(),e("Clicked ดาวน์โหลด button"),r.push("✅ ดาวน์โหลด"),g("download","done"),g("upscale","active"),await p(1500);let L=null;const K=document.querySelectorAll('button[role="menuitem"], [role="menuitem"], [role="option"], li');for(const R of K)if((R.textContent||"").trim().includes("1080p")){L=R;break}if(!L){const R=document.querySelectorAll("button, div[role='button'], span");for(const _ of R)if((_.textContent||"").trim().includes("1080p")&&_.offsetParent!==null){L=_.closest("button")||_;break}}if(!L)M("Could not find 1080p option in dropdown"),r.push("⚠️ 1080p");else{const R=L.getBoundingClientRect(),_=R.left+R.width/2,U=R.top+R.height/2,Y={bubbles:!0,cancelable:!0,clientX:_,clientY:U,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...Y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",Y)),await p(80),L.dispatchEvent(new PointerEvent("pointerup",{...Y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",Y)),L.dispatchEvent(new MouseEvent("click",Y)),await p(50),L.click(),e("Clicked 1080p — download starting"),r.push("✅ 1080p"),e("Waiting for upscaling + download...");const Z=Date.now();let D=!1,G=!1,m=0;const h=8e3;for(;Date.now()-Z<3e5;){const W=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(W.includes("upscaling complete")||W.includes("upscale complete")||W.includes("download complete")||W.includes("video is ready")||W.includes("video ready")){e("✅ Upscaling complete! (text match)"),r.push("✅ Upscaled"),g("upscale","done",100),D=!0;break}const z=document.querySelectorAll("div, span, p, h1, h2, h3");for(const te of z){const ue=(te.textContent||"").trim().toLowerCase();if(ue.length<60&&(ue.includes("upscaling complete")||ue.includes("upscale complete")||ue.includes("download complete")||ue.includes("video is ready"))){e(`✅ Upscaling complete! (element: "${(pe=te.textContent)==null?void 0:pe.trim()}")`),r.push("✅ Upscaled"),g("upscale","done",100),D=!0;break}}if(D)break;if(W.includes("upscaling your video")||W.includes("upscaling video")){G=!0,m=0;const te=Math.floor((Date.now()-Z)/1e3);e(`⏳ Upscaling in progress... (${te}s)`)}else if(G)if(m===0)m=Date.now(),e("🔍 Upscaling text disappeared — confirming...");else if(Date.now()-m>=h){e(`✅ Upscaling text gone for ${h/1e3}s — done!`),r.push("✅ Upscaled"),g("upscale","done",100),D=!0;break}else{const te=Math.ceil((h-(Date.now()-m))/1e3);e(`🔍 Confirming upscale done... (${te}s)`)}else{const te=Math.floor((Date.now()-Z)/1e3);e(`⏳ Waiting for upscale... (${te}s)`)}await p(2e3)}if(D){g("open","active"),e("Waiting for download file to be ready..."),await p(5e3);let I=!1;const W=Date.now();for(;Date.now()-W<6e4&&!I;){try{await new Promise(z=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},Q=>{chrome.runtime.lastError?M(`Download poll error: ${chrome.runtime.lastError.message}`):Q!=null&&Q.success?(e(`✅ Opened video: ${Q.message}`),r.push("✅ Opened"),g("open","done"),I=!0):e(`Download not ready: ${Q==null?void 0:Q.message}`),z()})})}catch(z){M(`Poll exception: ${z.message}`)}I||await p(3e3)}I||(M("Could not find/open downloaded video"),r.push("⚠️ Open"))}else M("Upscaling timeout — download may still complete"),r.push("⚠️ Upscale timeout")}}}else{e(`Multi-scene mode: ${f} scenes`);for(let S=1;S<f;S++){const N=J[S];if(!N){e(`No prompt for scene ${S+1} — skipping`);continue}const u=S+1;e(`--- Scene ${u}/${f} ---`),await p(2e3),g(`scene${u}-prompt`,"active");const $=me();if($)await ke($,N),e(`Pasted scene ${u} prompt (${N.length} chars)`),r.push(`✅ Scene${u} Prompt`),g(`scene${u}-prompt`,"done");else{M(`Could not find prompt input for scene ${u}`),r.push(`❌ Scene${u}`),d.push(`scene ${u} prompt input not found`),g(`scene${u}-prompt`,"error");break}await p(1e3),g(`scene${u}-gen`,"active");const P=$e();if(P){const L=P.getBoundingClientRect(),K=L.left+L.width/2,R=L.top+L.height/2,_={bubbles:!0,cancelable:!0,clientX:K,clientY:R,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",_)),await p(80),P.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",_)),P.dispatchEvent(new MouseEvent("click",_)),e(`Clicked Generate for scene ${u} (full event sequence)`),r.push(`✅ Scene${u} Gen`),g(`scene${u}-gen`,"done"),await p(500),P.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",_)),await p(80),P.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",_)),P.dispatchEvent(new MouseEvent("click",_))}else{M(`Could not find Generate button for scene ${u}`),r.push(`❌ Scene${u} Gen`),d.push(`scene ${u} generate button not found`),g(`scene${u}-gen`,"error");break}g(`scene${u}-wait`,"active"),await O(u)?(r.push(`✅ Scene${u}`),g(`scene${u}-wait`,"done",100)):(M(`Timeout on scene ${u}`),r.push(`⚠️ Scene${u}`),g(`scene${u}-wait`,"error"))}e("All scenes generated!"),r.push("✅ All Scenes"),await p(3e3),await F()}}catch(b){M(`Step 6 error: ${b.message}`),r.push("⚠️ Step6"),d.push(`step 6: ${b.message}`)}}const k=d.length===0;try{Ue(k?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:k,message:k?`สำเร็จ! ${r.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${r.join(" → ")} | ${d.join(", ")}`,step:k?"done":"partial"}}chrome.runtime.onMessage.addListener((t,o,a)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,e("Received GENERATE_IMAGE request"),a({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),it(t).then(n=>e(`✅ Automation finished: ${n.message}`)).catch(n=>console.error("[Netflow AI] Generate error:",n)),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return e("⛔ STOP_AUTOMATION received — setting stop flag"),window.__NETFLOW_STOP__=!0,a({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return a({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return a({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{e("CLICK_FIRST_IMAGE — finding first image card via <i>image</i> icon..."),await p(500);const n=Xe();if(!n){M("No image card found via <i>image</i> icon");return}const i=n.getBoundingClientRect(),s=i.left+i.width/2,l=i.top+i.height/2;e(`Image card at (${s.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — clicking 2 times`);for(let c=0;c<2;c++){const r=document.elementFromPoint(s,l);r?(await ne(r),e(`Click ${c+1}/2 on <${r.tagName.toLowerCase()}>`)):(await ne(n),e(`Click ${c+1}/2 on card (fallback)`)),await p(300)}e("✅ 2 clicks on image card done")})(),!1}),e("Google Flow content script ready — waiting for commands"),document.addEventListener("dblclick",t=>{const o=t.target;if(!o)return;const a=o.tagName.toLowerCase(),n=Math.round(t.clientX),i=Math.round(t.clientY),s=(o.textContent||"").trim().slice(0,30);e(`🖱️🖱️ DblClick (${n},${i}) → <${a}> "${s}"`)},!0)})();
