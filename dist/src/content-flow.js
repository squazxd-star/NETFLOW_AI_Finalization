(function(){"use strict";let L=null,R=null,H=null,ae=0,K=null,Q=null,V=!1,_=[];const U=[],he=4;function Z(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let r=2;r<=e;r++)t.push({stepId:`scene${r}-prompt`,label:`Scene ${r} Prompt`,status:"waiting"},{stepId:`scene${r}-gen`,label:`Scene ${r} Generate`,status:"waiting"},{stepId:`scene${r}-wait`,label:`Scene ${r} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const Y=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];_=Z(1);function se(){H||(H=document.createElement("style"),H.id="netflow-overlay-styles",H.textContent=`
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
    `,document.head.appendChild(H))}function we(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("class","nf-pipes-svg"),t.setAttribute("viewBox","0 0 100 100"),t.setAttribute("preserveAspectRatio","none");const r=document.createElementNS(e,"defs"),o=document.createElementNS(e,"linearGradient");o.id="nf-pipe-gradient";const i=document.createElementNS(e,"stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color","rgba(220,38,38,0.9)");const s=document.createElementNS(e,"stop");s.setAttribute("offset","50%"),s.setAttribute("stop-color","rgba(251,146,60,0.8)");const l=document.createElementNS(e,"stop");l.setAttribute("offset","100%"),l.setAttribute("stop-color","rgba(220,38,38,0.9)"),o.appendChild(i),o.appendChild(s),o.appendChild(l),r.appendChild(o);const a=document.createElementNS(e,"filter");a.id="nf-glow",a.setAttribute("x","-50%"),a.setAttribute("y","-50%"),a.setAttribute("width","200%"),a.setAttribute("height","200%");const u=document.createElementNS(e,"feGaussianBlur");u.setAttribute("stdDeviation","3"),u.setAttribute("result","coloredBlur");const d=document.createElementNS(e,"feMerge"),A=document.createElementNS(e,"feMergeNode");A.setAttribute("in","coloredBlur");const c=document.createElementNS(e,"feMergeNode");c.setAttribute("in","SourceGraphic"),d.appendChild(A),d.appendChild(c),a.appendChild(u),a.appendChild(d),r.appendChild(a),t.appendChild(r);function x(p,C){const w=document.createElementNS(e,"path");w.setAttribute("d",p),w.setAttribute("class","nf-pipe-glow"),w.style.animationDelay=`${C*.5}s`,t.appendChild(w);const b=document.createElementNS(e,"path");b.setAttribute("d",p),b.setAttribute("class","nf-pipe-base"),t.appendChild(b);const v=document.createElementNS(e,"path");v.setAttribute("d",p),v.setAttribute("class","nf-pipe-flow"),v.style.animationDelay=`${C*.3}s`,t.appendChild(v)}return x("M 39 44 C 39 47, 40 48, 40.5 46",0),x("M 61 44 C 61 47, 60 48, 59.5 46",1),x("M 39 56 C 39 53, 40 52, 40.5 54",2),x("M 61 56 C 61 53, 60 52, 59.5 54",3),x("M 39 38 C 44 30, 56 30, 61 38",4),x("M 39 62 C 44 70, 56 70, 61 62",5),x("M 28 46 C 23 50, 23 50, 28 54",6),x("M 72 46 C 77 50, 77 50, 72 54",7),[[40.5,46],[59.5,46],[40.5,54],[59.5,54],[39,44],[61,44],[39,56],[61,56],[39,38],[61,38],[39,62],[61,62],[28,46],[72,46],[28,54],[72,54]].forEach(([p,C])=>{const w=document.createElementNS(e,"circle");w.setAttribute("cx",String(p)),w.setAttribute("cy",String(C)),w.setAttribute("r","0.35"),w.setAttribute("class","nf-pipe-dot"),t.appendChild(w)}),t}function ce(e){e.innerHTML="",_.forEach((t,r)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${t.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(o)})}function ve(){const e=document.getElementById("nf-terminal");if(!e)return;ce(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${_.length}`)}function ye(){const e=document.createElement("div");e.id="netflow-engine-overlay",["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(c=>{const x=document.createElement("div");x.className=`nf-corner-deco ${c}`,e.appendChild(x)});const t=document.createElement("button");t.className="nf-close-btn",t.textContent="✕ ซ่อน",t.onclick=()=>te(),e.appendChild(t);const r=document.createElement("div");r.className="nf-layout",r.appendChild(we());const o=document.createElement("div");o.className="nf-core-monitor",o.id="nf-core-monitor";const i=document.createElement("div");i.className="nf-core-header",i.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">CORE STATUS:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${_.length}</div>
    `,o.appendChild(i);const s=document.createElement("div");s.className="nf-terminal",s.id="nf-terminal",ce(s),o.appendChild(s);const l=document.createElement("div");l.className="nf-log-feed",l.id="nf-log-feed",l.innerHTML='<div class="nf-log-line" style="color:rgba(220,38,38,0.4)">Waiting for automation...</div>',o.appendChild(l);const a=document.createElement("div");a.className="nf-visualizer",a.id="nf-visualizer";const u=30;for(let c=0;c<u;c++){const x=document.createElement("div");x.className=`nf-viz-bar${c%5===0?" nf-viz-accent":""}`,x.style.height="3px",a.appendChild(x)}o.appendChild(a),r.appendChild(o);const d=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];Y.forEach((c,x)=>{const f=xe(c);f.classList.add(d[x]),f.id=`nf-mod-${c.id}`,r.appendChild(f)}),e.appendChild(r);for(let c=0;c<20;c++){const x=document.createElement("div");x.className="nf-particle",x.style.left=`${10+Math.random()*80}%`,x.style.bottom=`${Math.random()*30}%`,x.style.animationDuration=`${3+Math.random()*5}s`,x.style.animationDelay=`${Math.random()*4}s`,Math.random()>.5&&(x.style.background="rgba(251, 146, 60, 0.4)"),e.appendChild(x)}const A=document.createElement("div");return A.className="nf-footer",A.innerHTML=`
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
    `,e.appendChild(A),e}function xe(e){const t=document.createElement("div");t.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
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
        `,t.appendChild(s)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o),t}function Ee(){ae=Date.now(),K=setInterval(()=>{const e=Math.floor((Date.now()-ae)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),r=String(e%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${t}:${r}`)},1e3)}function le(){K&&(clearInterval(K),K=null)}function Ce(){Q=setInterval(()=>{const e=document.getElementById("nf-visualizer");if(!e)return;e.querySelectorAll(".nf-viz-bar").forEach(r=>{const o=3+Math.random()*28;r.style.height=`${o}px`})},180)}function de(){Q&&(clearInterval(Q),Q=null);const e=document.getElementById("nf-visualizer");e&&e.querySelectorAll(".nf-viz-bar").forEach(t=>{t.style.height="3px"})}function ee(){let e=0;const t=_.filter(a=>a.status!=="skipped").length;for(const a of _){const u=document.getElementById(`nf-proc-${a.stepId}`);if(!u)continue;u.className="nf-proc-row";const d=u.querySelector(".nf-proc-badge");switch(a.status){case"done":u.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),e++;break;case"active":u.classList.add("nf-proc-active"),d&&(d.textContent=a.progress!==void 0&&a.progress>0?`⏳ ${a.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${e}/${_.length}`);const o=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(o&&(o.textContent="COMPLETE",o.style.color="#4ade80"),i&&(i.style.background="#4ade80",i.style.boxShadow="0 0 8px rgba(74,222,128,0.7)")):_.some(u=>u.status==="error")?(o&&(o.textContent="ERROR",o.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):_.some(u=>u.status==="active")&&o&&(o.textContent="ACTIVE",o.style.color="#4ade80",o.style.textShadow="0 0 10px rgba(74,222,128,0.5)");const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function pe(){R||(se(),R=document.createElement("button"),R.id="nf-toggle-btn",R.className="nf-toggle-hidden",R.innerHTML="⚡",R.title="เปิด Netflow Overlay",R.onclick=()=>te(),document.body.appendChild(R))}function te(){L&&(pe(),V?(L.classList.remove("nf-hidden"),L.classList.add("nf-visible"),R&&(R.classList.remove("nf-toggle-visible"),R.classList.add("nf-toggle-hidden")),V=!1):(L.classList.remove("nf-visible"),L.classList.add("nf-hidden"),R&&(R.classList.remove("nf-toggle-hidden"),R.classList.add("nf-toggle-visible")),V=!0))}function ke(){if(L){V&&te();return}se(),_=Z(1),U.length=0,L=ye(),document.body.appendChild(L),V=!1,pe(),Ee(),Ce()}function $e(){le(),de(),V=!1,L&&(L.classList.add("nf-fade-out"),setTimeout(()=>{L==null||L.remove(),L=null},500)),R&&(R.remove(),R=null)}function y(e,t,r){if(!L)return;for(const i of Y)for(const s of i.steps)s.id===e&&(s.status=t,r!==void 0&&(s.progress=r));for(const i of _)i.stepId===e&&(i.status=t,r!==void 0&&(i.progress=r));const o=document.getElementById(`nf-step-${e}`);if(o&&(o.className="nf-step",t==="active"?o.classList.add("nf-step-active"):t==="done"?o.classList.add("nf-step-done"):t==="error"&&o.classList.add("nf-step-error")),r!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,r)}%`)}ne(),ee()}function W(e){y(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Pe(e=4e3){le(),de(),ne(),ee(),setTimeout(()=>$e(),e)}function ne(){for(const e of Y){const t=e.steps.filter(u=>u.status!=="skipped").length,r=e.steps.filter(u=>u.status==="done").length,o=e.steps.some(u=>u.status==="active"),i=t>0?Math.round(r/t*100):0,s=document.getElementById(`nf-pct-${e.id}`);s&&(s.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${e.id}`);l&&(l.style.width=`${i}%`);const a=document.getElementById(`nf-mod-${e.id}`);a&&(a.classList.remove("nf-active","nf-done"),i>=100?a.classList.add("nf-done"):o&&a.classList.add("nf-active"))}}function Se(e){var o,i,s,l;const t=new Map;for(const a of _)t.set(a.stepId,{status:a.status,progress:a.progress});_=Z(e);for(const a of _){const u=t.get(a.stepId);u&&(a.status=u.status,u.progress!==void 0&&(a.progress=u.progress))}if(ve(),e>1){const a=Y.find(u=>u.id==="video");if(a){const u=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=a.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=a.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((s=a.steps.find(d=>d.id==="vid-generate"))==null?void 0:s.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=a.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)u.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),u.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),u.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});a.steps=u,ue(a)}}const r=Y.find(a=>a.id==="render");if(r&&e>1){const a=r.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const u=r.steps.find(d=>d.id==="upscale");u&&(u.label="Full Video"),ue(r)}ne(),ee()}function ue(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const s=document.createElement("div");s.className="nf-step",s.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),s.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,t.appendChild(s)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o)}function fe(e){const t=e.replace(/^\[Netflow AI\]\s*/,"");U.push(t),U.length>he&&U.shift();const r=document.getElementById("nf-log-feed");r&&(r.innerHTML=U.map(o=>`<div class="nf-log-line">&gt; ${o}</div>`).join(""))}const n=e=>{console.log(`[Netflow AI] ${e}`);try{fe(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},S=e=>{console.warn(`[Netflow AI] ${e}`);try{fe(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},Ie=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Te=/Win/i.test(navigator.userAgent),j=Ie?"🍎 Mac":Te?"🪟 Win":"🐧 Other";n(`Content script loaded on Google Flow page ${j}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),s=(t.textContent||"").trim().slice(0,30);n(`🖱️ Click (${o},${i}) → <${r}> "${s}"`)},!0);const g=e=>new Promise(t=>setTimeout(t,e));async function G(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i))}function Me(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function ge(e){const t=[],r=document.querySelectorAll("i");for(const o of r){if((o.textContent||"").trim()!==e)continue;let s=o,l=null;for(let a=0;a<20&&s&&(s=s.parentElement,!(!s||s===document.body));a++){const u=s.getBoundingClientRect();if(u.width>100&&u.height>80&&u.width<window.innerWidth*.6&&u.top>=-10&&u.bottom<=window.innerHeight+10){l=s;break}}l&&!t.includes(l)&&t.push(l)}return t.sort((o,i)=>{const s=o.getBoundingClientRect(),l=i.getBoundingClientRect();return s.left-l.left}),t}function me(){const e=ge("videocam");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🎬 Found ${e.length} video card(s) via <i>videocam</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("video");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const s=o.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6)return n(`🎬 Found video card via <video> fallback at (${s.left.toFixed(0)},${s.top.toFixed(0)})`),o;o=o.parentElement}}return n("🎬 No video card found"),null}function Ae(){const e=ge("image");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🖼️ Found ${e.length} image card(s) via <i>image</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const s=o.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6)return n(`🖼️ Found image card via <canvas> fallback at (${s.left.toFixed(0)},${s.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ No image card found"),null}function Be(e,t){var a;const[r,o]=e.split(","),i=((a=r.match(/:(.*?);/))==null?void 0:a[1])||"image/png",s=atob(o),l=new Uint8Array(s.length);for(let u=0;u<s.length;u++)l[u]=s.charCodeAt(u);return new File([l],t,{type:i})}function X(e){var o;const t=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((o=i.textContent)==null?void 0:o.trim())===e){const s=i.closest("button");s&&t.push(s)}return t}function Fe(){const e=[...X("add"),...X("add_2")];if(e.length===0){n("No add buttons found by icon — trying text search");const o=document.querySelectorAll("button");for(const i of o){const s=i.getBoundingClientRect();if(s.bottom>window.innerHeight*.7&&s.width<60&&s.height<60){const l=(i.textContent||"").trim();if(l==="+"||l==="add")return i}}return null}let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();i.y>r&&(r=i.y,t=o)}return t&&n(`Found prompt bar "+" button at y=${r.toFixed(0)}`),t}function oe(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=X(o);let s=null,l=0;for(const a of i){const u=a.getBoundingClientRect();u.y>l&&(l=u.y,s=a)}if(s)return n(`Found generate button via icon "${o}" at y=${l.toFixed(0)}`),s}const e=document.querySelectorAll("button");let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const s=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(s?1e3:0);l>r&&(r=l,t=o)}}if(t)return n("Found generate button via bottom-right heuristic"),t;for(const o of e){const i=(o.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return o}return null}function ie(){const e=document.querySelectorAll("textarea");for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const t=document.querySelectorAll('[contenteditable="true"]');for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of r){const i=o.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return o}return e.length>0?e[e.length-1]:null}async function re(e,t){var r,o,i,s;e.focus(),await g(300),n("setPromptText: Strategy 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",t),l.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const a=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});e.dispatchEvent(a),n("setPromptText: Dispatched beforeinput insertFromPaste");const u=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});e.dispatchEvent(u),await g(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(d.length>20){n(`setPromptText: ✅ Strategy 1 worked (${d.length} chars)`);return}n(`setPromptText: Strategy 1 — text not detected (got ${d.length} chars)`)}catch(l){n(`setPromptText: Strategy 1 failed: ${l.message}`)}n("setPromptText: Strategy 2 — Slate beforeinput insertText");try{e.focus(),await g(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(l);const a=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(a),await g(800);const u=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(u.length>20){n(`setPromptText: ✅ Strategy 2 worked (${u.length} chars)`);return}n("setPromptText: Strategy 2 — text not detected")}catch(l){n(`setPromptText: Strategy 2 failed: ${l.message}`)}n("setPromptText: Strategy 3 — ClipboardEvent paste (Mac-safe)");try{e.focus(),await g(200);const l=new DataTransfer;l.setData("text/plain",t),l.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const a=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});e.dispatchEvent(a),await g(800);const u=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(u.length>20){n(`setPromptText: ✅ Strategy 3 worked (${u.length} chars)`);return}n("setPromptText: Strategy 3 — ClipboardEvent text not detected")}catch(l){n(`setPromptText: Strategy 3 failed: ${l.message}`)}n("setPromptText: Strategy 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(t),n("setPromptText: Copied to clipboard via navigator.clipboard");else{const a=document.createElement("textarea");a.value=t,a.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),n("setPromptText: Copied to clipboard via execCommand")}e.focus(),await g(200),document.execCommand("paste"),await g(500);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(l.length>20){n(`setPromptText: ✅ Strategy 4 worked (${l.length} chars)`);return}}catch(l){n(`setPromptText: Strategy 4 failed: ${l.message}`)}n("setPromptText: Strategy 5 — React fiber Slate editor");try{const l=Object.keys(e).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(l){let a=e[l];for(let u=0;u<30&&a;u++){const d=a.memoizedProps,A=a.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("setPromptText: Found Slate editor via fiber props");const c=d.editor;c.selection,c.insertText(t),n("setPromptText: ✅ Strategy 5 — inserted via editor.insertText");return}if((s=(i=A==null?void 0:A.memoizedState)==null?void 0:i.editor)!=null&&s.insertText){n("setPromptText: Found Slate editor via fiber state"),A.memoizedState.editor.insertText(t),n("setPromptText: ✅ Strategy 5 — inserted via state editor");return}a=a.return}n("setPromptText: Fiber found but no Slate editor in tree")}else n("setPromptText: No React fiber found on element")}catch(l){n(`setPromptText: Strategy 5 failed: ${l.message}`)}n("setPromptText: ⚠️ All 5 strategies attempted — check console for results")}function Ne(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const r of t)e.push({input:r,origType:"file"}),r.type="text";return e.length>0&&n(`Neutralized ${e.length} file inputs (type → text)`),e}function De(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 Blocked file dialog open (${j})`);return}return e.call(this)},n(`🔒 File dialog blocker installed (${j})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 File dialog blocker removed")}}function Re(e,t,r){var u;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(d=>d.input)];for(const d of o)!i.includes(d)&&d.offsetParent===null&&i.push(d);for(const d of i)d.type="file";n(`Restored ${i.length} inputs to type=file`);const s=document.querySelectorAll('input[type="file"]');if(s.length===0)return n(`⚠️ No file inputs found after restore (${j})`),!1;let l;if(r&&r.size>0){const d=Array.from(s).filter(A=>!r.has(A));d.length>0?(l=d[d.length-1],n(`Targeting NEW file input (${d.length} new, ${s.length} total)`)):(l=s[s.length-1],n(`No new file inputs found — using last of ${s.length}`))}else l=s[s.length-1];const a=new DataTransfer;a.items.add(t);try{l.files=a.files,n(`Injected file via target.files (${((u=l.files)==null?void 0:u.length)??0} files)`)}catch(d){n(`target.files assignment failed: ${d.message} — trying defineProperty`);try{Object.defineProperty(l,"files",{value:a.files,writable:!0,configurable:!0}),n("Injected file via Object.defineProperty")}catch(A){return S(`Both file injection methods failed: ${A.message}`),!1}}l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const d=new DataTransfer;d.items.add(t);const A=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:d});l.dispatchEvent(A),n("Also dispatched drop event on file input")}catch{}return n(`✅ File injection complete: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${j}`),!0}async function be(e,t){var u;n(`── Uploading ${t} into prompt bar ──`);const r=Be(e,t);n(`File size: ${(r.size/1024).toFixed(1)} KB`);const o=Fe();if(!o)return S("Could not find prompt bar '+' button"),!1;const i=new Set(document.querySelectorAll('input[type="file"]'));n(`Pre-existing file inputs: ${i.size}`);const s=De();let l=Ne();const a=new MutationObserver(d=>{for(const A of d)for(const c of A.addedNodes)if(c instanceof HTMLInputElement&&c.type==="file"&&(c.type="text",l.push({input:c,origType:"file"}),n("🎯 Observer neutralized new file input")),c instanceof HTMLElement){const x=c.querySelectorAll('input[type="file"]');for(const f of x)f.type="text",l.push({input:f,origType:"file"}),n("🎯 Observer neutralized nested file input")}});a.observe(document.body,{childList:!0,subtree:!0});try{await G(o),n("Clicked '+' button"),await g(1500),n("Checking for upload menu...");const d=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");let A=!1;for(const x of d){if(x===o)continue;const f=x.querySelectorAll("i");for(const p of f){const C=((u=p.textContent)==null?void 0:u.trim())||"";if((C==="upload"||C==="upload_file")&&!Array.from(x.querySelectorAll("i")).map(b=>{var v;return(v=b.textContent)==null?void 0:v.trim()}).includes("drive_folder_upload")){await G(x),A=!0,n(`Clicked upload menu (icon: ${C})`);break}}if(A)break}if(!A)for(const x of d){if(x===o)continue;const f=x.childNodes.length<=3?(x.textContent||"").trim():"";if(f.length>0&&f.length<30){const p=f.toLowerCase();if(p==="upload"||p==="อัปโหลด"||p==="อัพโหลด"||p.includes("from computer")||p.includes("จากคอมพิวเตอร์")){await G(x),A=!0,n(`Clicked upload menu (text: "${f}")`);break}}}return await g(1e3),Re(l,r,i)?(n(`✅ Injected ${t} — no dialog opened`),await g(2500),!0):(S(`No file input found for ${t}`),!1)}finally{a.disconnect(),s();for(const d of l)d.input.type!=="file"&&(d.input.type="file")}}async function Le(e,t){n("=== Step 0: Configure Flow settings ===");const r=document.querySelectorAll("button");let o=null;for(const f of r){const p=f.textContent||"";if((p.includes("Nano Banana")||p.includes("Imagen")||p.includes("วิดีโอ")||p.includes("รูปภาพ")||p.includes("Image")||p.includes("Video"))&&f.getBoundingClientRect().bottom>window.innerHeight*.7){o=f,n(`Found settings button by text: "${p.substring(0,30).trim()}"`);break}}if(!o)for(const f of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const p=X(f);for(const C of p)if(C.getBoundingClientRect().bottom>window.innerHeight*.7){o=C,n(`Found settings button by icon: ${f}`);break}if(o)break}if(!o)return S("Could not find settings button"),!1;const i=o.getBoundingClientRect(),s=i.left+i.width/2,l=i.top+i.height/2,a={bubbles:!0,cancelable:!0,clientX:s,clientY:l,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",a)),o.dispatchEvent(new MouseEvent("click",a)),n("Clicked settings button"),await g(1500);let u=!1,d=null;const A=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const f of A){const p=f.getAttribute("aria-controls")||"",C=f.id||"";if(p.toUpperCase().includes("IMAGE")||C.toUpperCase().includes("IMAGE")){d=f,n(`Found Image tab via flow_tab_slider_trigger (aria-controls: ${p})`);break}}if(!d)for(const f of document.querySelectorAll('[role="tab"]')){const p=f.id||"";if(p.toUpperCase().includes("TRIGGER-IMAGE")){d=f,n(`Found Image tab via id: ${p}`);break}}if(!d)for(const f of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const p=(f.textContent||"").trim();if((p==="Image"||p.endsWith("Image")||p==="รูปภาพ"||p==="ภาพ")&&!p.includes("Video")&&!p.includes("วิดีโอ")){d=f,n(`Found Image tab via text match: "${p}"`);break}}if(d){const f=d.getAttribute("data-state")||"",p=d.getAttribute("aria-selected")||"";if(f==="active"||p==="true")u=!0,n("Image tab already active — no click needed");else{const C=d.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:C.left+C.width/2,clientY:C.top+C.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),d.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",w)),d.dispatchEvent(new MouseEvent("click",w)),u=!0,n("✅ Clicked Image tab — switched to Image mode"),await g(400)}}u||n("⚠️ Could not find Image mode button — may already be in Image mode");const c=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const f of document.querySelectorAll("button, [role='tab'], [role='option']")){const p=(f.textContent||"").trim();if(p===c||p.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const C=f.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:C.left+C.width/2,clientY:C.top+C.height/2,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),f.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",w)),f.dispatchEvent(new MouseEvent("click",w)),n(`Selected orientation: ${c}`),await g(400);break}}const x=`x${t}`;for(const f of document.querySelectorAll("button, [role='tab'], [role='option']"))if((f.textContent||"").trim()===x){const C=f.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:C.left+C.width/2,clientY:C.top+C.height/2,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),f.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",w)),f.dispatchEvent(new MouseEvent("click",w)),n(`Selected count: ${x}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),o.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",a)),o.dispatchEvent(new MouseEvent("click",a)),n("Closed settings panel"),await g(600),!0}async function _e(e){var A;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}try{ke()}catch(c){console.warn("Overlay show error:",c)}const t=[],r=[];try{y("settings","active");const c=e.orientation||"horizontal",x=e.outputCount||1,f=await Le(c,x);t.push(f?"✅ Settings":"⚠️ Settings"),y("settings",f?"done":"error")}catch(c){S(`Settings error: ${c.message}`),t.push("⚠️ Settings"),y("settings","error")}n("=== Step 1: Upload reference images ===");const o=()=>{const c=document.querySelectorAll("span, div, p, label");for(const x of c){const f=(x.textContent||"").trim();if(/^\d{1,3}%$/.test(f)){if(f==="100%")return null;const p=x.getBoundingClientRect();if(p.width>0&&p.height>0&&p.top>0&&p.top<window.innerHeight)return f}}return null},i=async c=>{n(`Waiting for ${c} upload to complete...`),await g(2e3);const x=Date.now(),f=6e4;let p="",C=Date.now();const w=15e3;for(;Date.now()-x<f;){const b=o();if(b){if(b!==p)p=b,C=Date.now();else if(Date.now()-C>w){n(`✅ ${c} upload — % stuck at ${b} for ${w/1e3}s, treating as complete`),await g(1e3);return}n(`Upload in progress: ${b} — waiting...`),await g(1500)}else{n(`✅ ${c} upload complete — no % indicator found`),await g(1e3);return}}S(`⚠️ ${c} upload timeout after ${f/1e3}s — proceeding anyway`)};if(e.characterImage){y("upload-char","active");try{const c=await be(e.characterImage,"character.png");t.push(c?"✅ ตัวละคร":"⚠️ ตัวละคร"),c||r.push("character upload failed"),y("upload-char",c?"done":"error")}catch(c){S(`Character upload error: ${c.message}`),t.push("❌ ตัวละคร"),r.push("character upload error"),y("upload-char","error")}await i("character")}else W("upload-char");if(e.productImage){y("upload-prod","active");try{const c=await be(e.productImage,"product.png");t.push(c?"✅ สินค้า":"⚠️ สินค้า"),c||r.push("product upload failed"),y("upload-prod",c?"done":"error")}catch(c){S(`Product upload error: ${c.message}`),t.push("❌ สินค้า"),r.push("product upload error"),y("upload-prod","error")}await i("product")}else W("upload-prod");n("Closing any open dialogs..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const s=o();s&&(n(`⚠️ Upload still showing ${s} after all uploads — waiting extra...`),await i("final")),n("All uploads complete — proceeding to prompt"),await g(1e3),n("=== Step 2: Paste image prompt ==="),y("img-prompt","active"),await g(1e3);const l=ie();l?(await re(l,e.imagePrompt),n(`Pasted prompt (${e.imagePrompt.length} chars)`),t.push("✅ Prompt"),y("img-prompt","done")):(S("Could not find prompt text input"),t.push("❌ Prompt"),r.push("prompt input not found"),y("img-prompt","error")),await g(800);const a=new Set;document.querySelectorAll("img").forEach(c=>{c.src&&a.add(c.src)}),n(`Snapshot: ${a.size} existing images before Generate`),n("=== Step 3: Click Generate → ==="),y("img-generate","active"),await g(500);const u=oe();if(u){const c=u.getBoundingClientRect(),x=c.left+c.width/2,f=c.top+c.height/2,p={bubbles:!0,cancelable:!0,clientX:x,clientY:f,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",p)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",p)),u.dispatchEvent(new MouseEvent("click",p)),n("Dispatched full click sequence on Generate button"),t.push("✅ Generate"),await g(500),u.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",p)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",p)),u.dispatchEvent(new MouseEvent("click",p)),n("Dispatched safety retry click on Generate button"),y("img-generate","done")}else S("Could not find → Generate button"),t.push("❌ Generate"),r.push("generate button not found"),y("img-generate","error");n("=== Step 4: Wait for generated image + Animate ==="),y("img-wait","active");try{n("Waiting 15s for generation to start..."),await g(15e3),n("Polling for NEW generated image (not in snapshot)...");let c=null;const x=Date.now();for(;!c&&Date.now()-x<18e4;){const f=document.querySelectorAll("img");for(const p of f){if(a.has(p.src)||!(p.alt||"").toLowerCase().includes("generated"))continue;const w=p.getBoundingClientRect();if(w.width>120&&w.height>120&&w.top>0&&w.top<window.innerHeight*.85){const b=p.closest("div");if(b){c=b,n(`Found AI-generated image via alt="${p.alt}": ${p.src.substring(0,80)}...`);break}}}if(!c)for(const p of f){if(a.has(p.src))continue;const C=p.closest("div"),w=(C==null?void 0:C.textContent)||"";if(w.includes("product.png")||w.includes("character.png")||w.includes(".png")||w.includes(".jpg")){n(`Skipping reference image (container has filename): ${w.substring(0,40)}`);continue}const b=p.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const v=p.closest("div");if(v){c=v,n(`Found NEW image (fallback): ${p.src.substring(0,80)}...`);break}}}c||(await g(5e3),n("Still waiting for new generated image..."))}if(!c)S("Timeout waiting for generated image"),t.push("⚠️ Wait Image"),y("img-wait","error");else{n("Found generated image element"),t.push("✅ Image Found"),y("img-wait","done",100);const f=c.getBoundingClientRect(),p=f.left+f.width/2,C=f.top+f.height/2,w={bubbles:!0,cancelable:!0,clientX:p,clientY:C};c.dispatchEvent(new PointerEvent("pointerenter",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseenter",w)),c.dispatchEvent(new PointerEvent("pointerover",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseover",w)),c.dispatchEvent(new PointerEvent("pointermove",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousemove",w)),n("Dispatched hover events on image (pointer + mouse)"),await g(1500);let b=null;for(const v of["more_vert","more_horiz","more"]){const B=X(v);for(const m of B){const $=m.getBoundingClientRect();if($.top>=f.top-20&&$.top<=f.bottom&&$.right>=f.right-150&&$.right<=f.right+20){b=m;break}}if(b)break}if(!b){const v=document.querySelectorAll("button");for(const B of v){const m=B.getBoundingClientRect();if(m.width<50&&m.height<50&&m.top>=f.top-10&&m.top<=f.top+60&&m.left>=f.right-80){const $=B.querySelectorAll("i");for(const T of $)if((((A=T.textContent)==null?void 0:A.trim())||"").includes("more")){b=B;break}if(b)break;const k=B.getAttribute("aria-label")||"";if(k.includes("เพิ่มเติม")||k.includes("more")){b=B;break}}}}if(!b)S("Could not find 3-dots button on generated image"),t.push("⚠️ 3-dots");else{const v=b.getBoundingClientRect(),B=v.left+v.width/2,m=v.top+v.height/2,$={bubbles:!0,cancelable:!0,clientX:B,clientY:m,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",$)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",$)),b.dispatchEvent(new MouseEvent("click",$)),n("Clicked 3-dots button"),await g(1500);let k=null;const T=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const M of T){const D=(M.textContent||"").trim();if(D.includes("ทำให้เป็นภาพเคลื่อนไหว")||D.includes("Animate")||D.includes("animate")){k=M;break}}if(!k)S("Could not find 'ทำให้เป็นภาพเคลื่อนไหว' menu item"),t.push("⚠️ Animate");else{const M=k.getBoundingClientRect(),D=M.left+M.width/2,F=M.top+M.height/2,I={bubbles:!0,cancelable:!0,clientX:D,clientY:F,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",I)),k.dispatchEvent(new MouseEvent("click",I)),n("✅ Clicked 'ทำให้เป็นภาพเคลื่อนไหว' — switching to video mode"),t.push("✅ Animate"),y("animate","done"),await g(3e3)}}}}catch(c){S(`Step 4 error: ${c.message}`),t.push("⚠️ Animate")}if(e.videoPrompt){n("=== Step 5: Paste video prompt + Generate video ==="),y("vid-prompt","active");try{n("Waiting for video mode UI..."),await g(3e3);let c=!1;const x=document.querySelectorAll("button, span, div");for(const C of x){const w=(C.textContent||"").trim(),b=C.getBoundingClientRect();if((w==="วิดีโอ"||w==="Video"||w.includes("วิดีโอ"))&&b.bottom>window.innerHeight*.7){c=!0,n("Confirmed: now in Video mode");break}}c||n("Video mode indicator not found — proceeding anyway (may already be in video mode after Animate)"),await g(1e3);const f=ie();f?(await re(f,e.videoPrompt),n(`Pasted video prompt (${e.videoPrompt.length} chars)`),t.push("✅ Video Prompt"),y("vid-prompt","done")):(S("Could not find prompt text input for video prompt"),t.push("❌ Video Prompt"),r.push("video prompt input not found"),y("vid-prompt","error")),await g(1e3),y("vid-generate","active");const p=oe();if(p){const C=p.getBoundingClientRect(),w=C.left+C.width/2,b=C.top+C.height/2,v={bubbles:!0,cancelable:!0,clientX:w,clientY:b,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),n("✅ Clicked Generate for video — video generation started!"),t.push("✅ Video Generate"),y("vid-generate","done"),await g(500),p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),n("Dispatched safety retry click on video Generate button")}else S("Could not find Generate button for video"),t.push("❌ Video Generate"),r.push("video generate button not found"),y("vid-generate","error")}catch(c){S(`Step 5 error: ${c.message}`),t.push("⚠️ Video Gen"),r.push(`video gen error: ${c.message}`)}}else n("No video prompt provided — skipping video generation step"),W("animate"),W("vid-prompt"),W("vid-generate"),W("vid-wait");if(e.videoPrompt){y("vid-wait","active");const c=e.sceneCount||1,x=e.videoScenePrompts||[e.videoPrompt];if(c>1)try{Se(c)}catch{}n(`=== Step 6: Wait for video + ${c>1?`continue ${c} scenes`:"download"} ===`);const f=()=>{const b=document.querySelectorAll("div, span, p, label, strong, small");for(const v of b){const B=(v.textContent||"").trim();if(B.length>10)continue;const m=B.match(/(\d{1,3})\s*%/);if(!m)continue;const $=parseInt(m[1],10);if($<1||$>100)continue;const k=v.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return $}return null},p=async(b=6e5)=>{n("Waiting for video generation..."),y("vid-wait","active"),await g(5e3);const v=()=>{const h=document.querySelectorAll("div, span, p, label, strong, small");let E=0;for(const P of h){const N=(P.textContent||"").trim();if(N.includes("%")&&N.length<15){const q=P.tagName.toLowerCase(),J=P.className&&typeof P.className=="string"?P.className.split(/\s+/).slice(0,2).join(" "):"",O=P.getBoundingClientRect();if(n(`  🔍 "${N}" in <${q}.${J}> at (${O.left.toFixed(0)},${O.top.toFixed(0)}) w=${O.width.toFixed(0)}`),E++,E>=5)break}}E===0&&n("  🔍 No element with '%' text found")},B=me();n(B?"📍 Video card already present at start":"⏳ No video card yet — will poll for % progress"),n("🔍 Debug scan for % text nodes:"),v();const m=Date.now();let $=-1,k=0,T=!1;for(;Date.now()-m<b;){const h=f();if(h!==null){if(h!==$&&(n(`Video progress: ${h}%`),$=h,y("vid-wait","active",h)),k=Date.now(),h>=100){n("✅ 100% detected!"),T=!0;break}}else if($>30){const E=Math.floor((Date.now()-k)/1e3);if(E>=5){n(`✅ % disappeared at ${$}% (lost for ${E}s) — video done!`),T=!0;break}n(`⏳ % lost at ${$}% — confirming in ${5-E}s...`)}else{const E=Math.floor((Date.now()-m)/1e3);E%15<3&&n(`⏳ Waiting... (${E}s) no % found`)}await g(3e3)}const M=me();if(!M)return n("❌ No video card found to click"),y("vid-wait","error"),null;const D=M;T?(y("vid-wait","done",100),n("Cool-down 4s before clicking..."),await g(4e3)):n("⚠️ Timeout — attempting to click video card anyway");const F=D.getBoundingClientRect(),I=F.left+F.width/2,z=F.top+F.height/2;n(`🖱️ Hovering video card 4s at (${I.toFixed(0)}, ${z.toFixed(0)})...`),Me(D);for(let h=0;h<8;h++){const E={bubbles:!0,cancelable:!0,clientX:I+h%2,clientY:z};D.dispatchEvent(new PointerEvent("pointermove",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),D.dispatchEvent(new MouseEvent("mousemove",E)),await g(500)}n("Clicking video card...");for(let h=0;h<2;h++){const E=document.elementFromPoint(I,z);E?await G(E):await G(D),await g(300)}return n("✅ Video card clicks done"),D},C=async(b,v=6e5)=>{n(`Waiting for scene ${b} video generation...`),await g(5e3);const B=Date.now();let m=-1,$=0;for(;Date.now()-B<v;){const k=f();if(k!==null){if(k!==m&&(n(`Scene ${b} progress: ${k}%`),m=k),$=Date.now(),k>=100)return n(`✅ Scene ${b} — 100%!`),!0}else if(m>30){const T=Math.floor((Date.now()-$)/1e3);if(T>=5)return n(`✅ Scene ${b} — % disappeared at ${m}% (${T}s) — done!`),!0;n(`⏳ Scene ${b} % lost at ${m}% — confirming in ${5-T}s...`)}else{const T=Math.floor((Date.now()-B)/1e3);T%15<3&&n(`⏳ Scene ${b} waiting... (${T}s)`)}await g(3e3)}return!1},w=async()=>{let b=null;const v=document.querySelectorAll("button");for(const h of v){const E=(h.textContent||"").trim();if(E.includes("ดาวน์โหลด")||E.toLowerCase()==="download"){b=h,n(`Found ดาวน์โหลด button via text: "${E}"`);break}}if(!b)for(const h of v){const E=h.getBoundingClientRect();if(E.top<80&&E.right>window.innerWidth-300){const P=(h.textContent||"").trim().toLowerCase(),N=(h.getAttribute("aria-label")||"").toLowerCase();if(P.includes("ดาวน์")||P.includes("download")||N.includes("ดาวน์")||N.includes("download")){b=h,n("Found ดาวน์โหลด button via position+text");break}}}if(!b){const h=document.querySelectorAll('[data-type="button-overlay"]');for(const E of h){const P=E.closest("button")||E.parentElement;if(P){const N=(P.textContent||"").trim();if(N.includes("ดาวน์โหลด")||N.toLowerCase().includes("download")){b=P,n("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!b){S("Could not find ดาวน์โหลด button in detail view"),t.push("⚠️ Download btn");return}const B=b.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:B.left+B.width/2,clientY:B.top+B.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",m)),b.dispatchEvent(new MouseEvent("click",m)),n("Clicked ดาวน์โหลด button"),t.push("✅ ดาวน์โหลด"),y("download","done"),y("upscale","active"),await g(1500);const $=async h=>{const E=h.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:E.left+E.width/2,clientY:E.top+E.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",P)),await g(80),h.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",P)),h.dispatchEvent(new MouseEvent("click",P))},k=async h=>{const E=h.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:E.left+E.width/2,clientY:E.top+E.height/2};h.dispatchEvent(new PointerEvent("pointerenter",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseenter",P)),h.dispatchEvent(new PointerEvent("pointermove",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseover",P)),h.dispatchEvent(new MouseEvent("mousemove",P))},T=h=>{const E=document.querySelectorAll('[role="menuitem"]');for(const P of E)if((P.textContent||"").trim().includes(h)){const q=P.getBoundingClientRect();if(q.width>0&&q.height>0)return P}return null},M=T("Full Video");if(M){n("Multi-scene menu detected — hovering Full Video..."),await k(M),await g(500),await $(M),n("Clicked Full Video"),t.push("✅ Full Video"),await g(1500);let h=null;const E=Date.now();for(;Date.now()-E<5e3&&(h=T("720p"),!h);)n("Waiting for 720p submenu..."),await g(500);if(!h){S("Could not find 720p option in submenu"),t.push("⚠️ 720p");return}await $(h),n("Clicked 720p — download starting"),t.push("✅ 720p"),y("upscale","active")}else{let h=T("1080p");if(!h){const E=document.querySelectorAll("button, div[role='button'], span");for(const P of E)if((P.textContent||"").trim().includes("1080p")&&P.offsetParent!==null){h=P.closest("button")||P;break}}if(!h){S("Could not find 1080p option"),t.push("⚠️ 1080p");return}await $(h),n("Clicked 1080p — download starting"),t.push("✅ 1080p"),y("upscale","active")}n("Waiting for download to complete...");const D=Date.now();let F=!1;for(;Date.now()-D<3e5;){const h=document.body.innerText||"";if(h.includes("Download complete")){n("✅ Download complete!"),t.push("✅ Downloaded"),y("upscale","done",100),F=!0;break}if(h.includes("Upscaling complete")||h.includes("upscaling complete")){n("✅ Upscaling complete!"),t.push("✅ Upscaled"),y("upscale","done",100),F=!0;break}h.includes("Downloading your extended video")?n("Downloading extended video..."):n("Waiting..."),await g(3e3)}if(!F){S("Download timeout — file may still be downloading"),t.push("⚠️ Download timeout"),y("upscale","error");return}y("open","active"),n("Waiting for download file to be ready..."),await g(5e3);let I=!1;const z=Date.now();for(;Date.now()-z<6e4&&!I;){try{await new Promise(h=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},E=>{chrome.runtime.lastError?S(`Download poll error: ${chrome.runtime.lastError.message}`):E!=null&&E.success?(n(`✅ Opened video: ${E.message}`),t.push("✅ Opened"),y("open","done"),I=!0):n(`Download not ready: ${E==null?void 0:E.message}`),h()})})}catch(h){S(`Poll exception: ${h.message}`)}I||await g(3e3)}I||(S("Could not find/open downloaded video"),t.push("⚠️ Open"))};try{if(!await p())S("Timeout waiting for video generation"),t.push("⚠️ Video Wait"),y("vid-wait","error");else if(t.push("✅ Video Complete"),y("vid-wait","done",100),y("download","active"),c<=1){n("Single scene — waiting 3s for detail view to load..."),t.push("✅ Clicked"),await g(3e3);let v=null;const B=document.querySelectorAll("button");for(const m of B){const $=(m.textContent||"").trim();if($.includes("ดาวน์โหลด")||$.toLowerCase()==="download"){v=m,n(`Found ดาวน์โหลด button via text: "${$}"`);break}}if(!v)for(const m of B){const $=m.getBoundingClientRect();if($.top<80&&$.right>window.innerWidth-300){const k=(m.textContent||"").trim().toLowerCase(),T=(m.getAttribute("aria-label")||"").toLowerCase();if(k.includes("ดาวน์")||k.includes("download")||T.includes("ดาวน์")||T.includes("download")){v=m,n("Found ดาวน์โหลด button via position+text");break}}}if(!v){const m=document.querySelectorAll('[data-type="button-overlay"]');for(const $ of m){const k=$.closest("button")||$.parentElement;if(k){const T=(k.textContent||"").trim();if(T.includes("ดาวน์โหลด")||T.toLowerCase().includes("download")){v=k,n("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!v)S("Could not find ดาวน์โหลด button in detail view"),t.push("⚠️ Download btn");else{const m=v.getBoundingClientRect(),$=m.left+m.width/2,k=m.top+m.height/2,T={bubbles:!0,cancelable:!0,clientX:$,clientY:k,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",T)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",T)),v.dispatchEvent(new MouseEvent("click",T)),n("Clicked ดาวน์โหลด button"),t.push("✅ ดาวน์โหลด"),y("download","done"),y("upscale","active"),await g(1500);let M=null;const D=document.querySelectorAll('button[role="menuitem"], [role="menuitem"], [role="option"], li');for(const F of D)if((F.textContent||"").trim().includes("1080p")){M=F;break}if(!M){const F=document.querySelectorAll("button, div[role='button'], span");for(const I of F)if((I.textContent||"").trim().includes("1080p")&&I.offsetParent!==null){M=I.closest("button")||I;break}}if(!M)S("Could not find 1080p option in dropdown"),t.push("⚠️ 1080p");else{const F=M.getBoundingClientRect(),I=F.left+F.width/2,z=F.top+F.height/2,h={bubbles:!0,cancelable:!0,clientX:I,clientY:z,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),M.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",h)),M.dispatchEvent(new MouseEvent("click",h)),n("Clicked 1080p — download starting"),t.push("✅ 1080p"),n("Waiting for upscaling + download...");const E=Date.now();let P=!1;for(;Date.now()-E<3e5;){const N=document.body.innerText||"";if(N.includes("Upscaling complete")||N.includes("upscaling complete")){n("✅ Upscaling complete!"),t.push("✅ Upscaled"),y("upscale","done",100),P=!0;break}await g(5e3),n("Upscaling...")}if(P){y("open","active"),n("Waiting for download file to be ready..."),await g(5e3);let N=!1;const q=Date.now();for(;Date.now()-q<6e4&&!N;){try{await new Promise(J=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},O=>{chrome.runtime.lastError?S(`Download poll error: ${chrome.runtime.lastError.message}`):O!=null&&O.success?(n(`✅ Opened video: ${O.message}`),t.push("✅ Opened"),y("open","done"),N=!0):n(`Download not ready: ${O==null?void 0:O.message}`),J()})})}catch(J){S(`Poll exception: ${J.message}`)}N||await g(3e3)}N||(S("Could not find/open downloaded video"),t.push("⚠️ Open"))}else S("Upscaling timeout — download may still complete"),t.push("⚠️ Upscale timeout")}}}else{n(`Multi-scene mode: ${c} scenes`);for(let v=1;v<c;v++){const B=x[v];if(!B){n(`No prompt for scene ${v+1} — skipping`);continue}const m=v+1;n(`--- Scene ${m}/${c} ---`),await g(2e3),y(`scene${m}-prompt`,"active");const $=ie();if($)await re($,B),n(`Pasted scene ${m} prompt (${B.length} chars)`),t.push(`✅ Scene${m} Prompt`),y(`scene${m}-prompt`,"done");else{S(`Could not find prompt input for scene ${m}`),t.push(`❌ Scene${m}`),r.push(`scene ${m} prompt input not found`),y(`scene${m}-prompt`,"error");break}await g(1e3),y(`scene${m}-gen`,"active");const k=oe();if(k){const M=k.getBoundingClientRect(),D=M.left+M.width/2,F=M.top+M.height/2,I={bubbles:!0,cancelable:!0,clientX:D,clientY:F,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",I)),k.dispatchEvent(new MouseEvent("click",I)),n(`Clicked Generate for scene ${m} (full event sequence)`),t.push(`✅ Scene${m} Gen`),y(`scene${m}-gen`,"done"),await g(500),k.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",I)),k.dispatchEvent(new MouseEvent("click",I))}else{S(`Could not find Generate button for scene ${m}`),t.push(`❌ Scene${m} Gen`),r.push(`scene ${m} generate button not found`),y(`scene${m}-gen`,"error");break}y(`scene${m}-wait`,"active"),await C(m)?(t.push(`✅ Scene${m}`),y(`scene${m}-wait`,"done",100)):(S(`Timeout on scene ${m}`),t.push(`⚠️ Scene${m}`),y(`scene${m}-wait`,"error"))}n("All scenes generated!"),t.push("✅ All Scenes"),await g(3e3),await w()}}catch(b){S(`Step 6 error: ${b.message}`),t.push("⚠️ Step6"),r.push(`step 6: ${b.message}`)}}const d=r.length===0;try{Pe(d?5e3:8e3)}catch(c){console.warn("Overlay complete error:",c)}return{success:d,message:d?`สำเร็จ! ${t.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${t.join(" → ")} | ${r.join(", ")}`,step:d?"done":"partial"}}chrome.runtime.onMessage.addListener((e,t,r)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("Received GENERATE_IMAGE request"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),_e(e).then(o=>n(`✅ Automation finished: ${o.message}`)).catch(o=>console.error("[Netflow AI] Generate error:",o)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ STOP_AUTOMATION received — setting stop flag"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return r({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — finding first image card via <i>image</i> icon..."),await g(500);const o=Ae();if(!o){S("No image card found via <i>image</i> icon");return}const i=o.getBoundingClientRect(),s=i.left+i.width/2,l=i.top+i.height/2;n(`Image card at (${s.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — clicking 2 times`);for(let a=0;a<2;a++){const u=document.elementFromPoint(s,l);u?(await G(u),n(`Click ${a+1}/2 on <${u.tagName.toLowerCase()}>`)):(await G(o),n(`Click ${a+1}/2 on card (fallback)`)),await g(300)}n("✅ 2 clicks on image card done")})(),!1}),n("Google Flow content script ready — waiting for commands"),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),s=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ DblClick (${o},${i}) → <${r}> "${s}"`)},!0)})();
