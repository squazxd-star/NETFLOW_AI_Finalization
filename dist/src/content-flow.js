(function(){"use strict";let _=null,L=null,Y=null,ue=0,Q=null,Z=null,q=!1,O=[];const j=[],Ee=4;function ne(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let r=2;r<=e;r++)t.push({stepId:`scene${r}-prompt`,label:`Scene ${r} Prompt`,status:"waiting"},{stepId:`scene${r}-gen`,label:`Scene ${r} Generate`,status:"waiting"},{stepId:`scene${r}-wait`,label:`Scene ${r} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const X=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];O=ne(1);function fe(){Y||(Y=document.createElement("style"),Y.id="netflow-overlay-styles",Y.textContent=`
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
    `,document.head.appendChild(Y))}function Ce(){const e="http://www.w3.org/2000/svg",t=document.createElementNS(e,"svg");t.setAttribute("class","nf-pipes-svg"),t.setAttribute("viewBox","0 0 100 100"),t.setAttribute("preserveAspectRatio","none");const r=document.createElementNS(e,"defs"),o=document.createElementNS(e,"linearGradient");o.id="nf-pipe-gradient";const i=document.createElementNS(e,"stop");i.setAttribute("offset","0%"),i.setAttribute("stop-color","rgba(220,38,38,0.9)");const c=document.createElementNS(e,"stop");c.setAttribute("offset","50%"),c.setAttribute("stop-color","rgba(251,146,60,0.8)");const d=document.createElementNS(e,"stop");d.setAttribute("offset","100%"),d.setAttribute("stop-color","rgba(220,38,38,0.9)"),o.appendChild(i),o.appendChild(c),o.appendChild(d),r.appendChild(o);const a=document.createElementNS(e,"filter");a.id="nf-glow",a.setAttribute("x","-50%"),a.setAttribute("y","-50%"),a.setAttribute("width","200%"),a.setAttribute("height","200%");const u=document.createElementNS(e,"feGaussianBlur");u.setAttribute("stdDeviation","3"),u.setAttribute("result","coloredBlur");const s=document.createElementNS(e,"feMerge"),D=document.createElementNS(e,"feMergeNode");D.setAttribute("in","coloredBlur");const l=document.createElementNS(e,"feMergeNode");l.setAttribute("in","SourceGraphic"),s.appendChild(D),s.appendChild(l),a.appendChild(u),a.appendChild(s),r.appendChild(a),t.appendChild(r);function E(p,x){const b=document.createElementNS(e,"path");b.setAttribute("d",p),b.setAttribute("class","nf-pipe-glow"),b.style.animationDelay=`${x*.5}s`,t.appendChild(b);const S=document.createElementNS(e,"path");S.setAttribute("d",p),S.setAttribute("class","nf-pipe-base"),t.appendChild(S);const v=document.createElementNS(e,"path");v.setAttribute("d",p),v.setAttribute("class","nf-pipe-flow"),v.style.animationDelay=`${x*.3}s`,t.appendChild(v)}return E("M 39 44 C 39 47, 40 48, 40.5 46",0),E("M 61 44 C 61 47, 60 48, 59.5 46",1),E("M 39 56 C 39 53, 40 52, 40.5 54",2),E("M 61 56 C 61 53, 60 52, 59.5 54",3),E("M 39 38 C 44 30, 56 30, 61 38",4),E("M 39 62 C 44 70, 56 70, 61 62",5),E("M 28 46 C 23 50, 23 50, 28 54",6),E("M 72 46 C 77 50, 77 50, 72 54",7),[[40.5,46],[59.5,46],[40.5,54],[59.5,54],[39,44],[61,44],[39,56],[61,56],[39,38],[61,38],[39,62],[61,62],[28,46],[72,46],[28,54],[72,54]].forEach(([p,x])=>{const b=document.createElementNS(e,"circle");b.setAttribute("cx",String(p)),b.setAttribute("cy",String(x)),b.setAttribute("r","0.35"),b.setAttribute("class","nf-pipe-dot"),t.appendChild(b)}),t}function ge(e){e.innerHTML="",O.forEach((t,r)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${t.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(o)})}function ke(){const e=document.getElementById("nf-terminal");if(!e)return;ge(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${O.length}`)}function $e(){const e=document.createElement("div");e.id="netflow-engine-overlay",["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(l=>{const E=document.createElement("div");E.className=`nf-corner-deco ${l}`,e.appendChild(E)});const t=document.createElement("button");t.className="nf-close-btn",t.textContent="✕ ซ่อน",t.onclick=()=>ie(),e.appendChild(t);const r=document.createElement("div");r.className="nf-layout",r.appendChild(Ce());const o=document.createElement("div");o.className="nf-core-monitor",o.id="nf-core-monitor";const i=document.createElement("div");i.className="nf-core-header",i.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">CORE STATUS:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${O.length}</div>
    `,o.appendChild(i);const c=document.createElement("div");c.className="nf-terminal",c.id="nf-terminal",ge(c),o.appendChild(c);const d=document.createElement("div");d.className="nf-log-feed",d.id="nf-log-feed",d.innerHTML='<div class="nf-log-line" style="color:rgba(220,38,38,0.4)">Waiting for automation...</div>',o.appendChild(d);const a=document.createElement("div");a.className="nf-visualizer",a.id="nf-visualizer";const u=30;for(let l=0;l<u;l++){const E=document.createElement("div");E.className=`nf-viz-bar${l%5===0?" nf-viz-accent":""}`,E.style.height="3px",a.appendChild(E)}o.appendChild(a),r.appendChild(o);const s=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];X.forEach((l,E)=>{const f=Pe(l);f.classList.add(s[E]),f.id=`nf-mod-${l.id}`,r.appendChild(f)}),e.appendChild(r);for(let l=0;l<20;l++){const E=document.createElement("div");E.className="nf-particle",E.style.left=`${10+Math.random()*80}%`,E.style.bottom=`${Math.random()*30}%`,E.style.animationDuration=`${3+Math.random()*5}s`,E.style.animationDelay=`${Math.random()*4}s`,Math.random()>.5&&(E.style.background="rgba(251, 146, 60, 0.4)"),e.appendChild(E)}const D=document.createElement("div");return D.className="nf-footer",D.innerHTML=`
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
    `,e.appendChild(D),e}function Pe(e){const t=document.createElement("div");t.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(r),e.steps.forEach(i=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${i.id}`;let d="";i.progress!==void 0&&(d=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${d}
        `,t.appendChild(c)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o),t}function Se(){ue=Date.now(),Q=setInterval(()=>{const e=Math.floor((Date.now()-ue)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),r=String(e%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${t}:${r}`)},1e3)}function me(){Q&&(clearInterval(Q),Q=null)}function Ie(){Z=setInterval(()=>{const e=document.getElementById("nf-visualizer");if(!e)return;e.querySelectorAll(".nf-viz-bar").forEach(r=>{const o=3+Math.random()*28;r.style.height=`${o}px`})},180)}function be(){Z&&(clearInterval(Z),Z=null);const e=document.getElementById("nf-visualizer");e&&e.querySelectorAll(".nf-viz-bar").forEach(t=>{t.style.height="3px"})}function oe(){let e=0;const t=O.filter(a=>a.status!=="skipped").length;for(const a of O){const u=document.getElementById(`nf-proc-${a.stepId}`);if(!u)continue;u.className="nf-proc-row";const s=u.querySelector(".nf-proc-badge");switch(a.status){case"done":u.classList.add("nf-proc-done"),s&&(s.textContent="✅ done"),e++;break;case"active":u.classList.add("nf-proc-active"),s&&(s.textContent=a.progress!==void 0&&a.progress>0?`⏳ ${a.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),s&&(s.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),s&&(s.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),s&&(s.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${e}/${O.length}`);const o=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(o&&(o.textContent="COMPLETE",o.style.color="#4ade80"),i&&(i.style.background="#4ade80",i.style.boxShadow="0 0 8px rgba(74,222,128,0.7)")):O.some(u=>u.status==="error")?(o&&(o.textContent="ERROR",o.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):O.some(u=>u.status==="active")&&o&&(o.textContent="ACTIVE",o.style.color="#4ade80",o.style.textShadow="0 0 10px rgba(74,222,128,0.5)");const c=document.getElementById("nf-terminal"),d=c==null?void 0:c.querySelector(".nf-proc-active");d&&c&&d.scrollIntoView({behavior:"smooth",block:"center"})}function he(){L||(fe(),L=document.createElement("button"),L.id="nf-toggle-btn",L.className="nf-toggle-hidden",L.innerHTML="⚡",L.title="เปิด Netflow Overlay",L.onclick=()=>ie(),document.body.appendChild(L))}function ie(){_&&(he(),q?(_.classList.remove("nf-hidden"),_.classList.add("nf-visible"),L&&(L.classList.remove("nf-toggle-visible"),L.classList.add("nf-toggle-hidden")),q=!1):(_.classList.remove("nf-visible"),_.classList.add("nf-hidden"),L&&(L.classList.remove("nf-toggle-hidden"),L.classList.add("nf-toggle-visible")),q=!0))}function Te(){if(_){q&&ie();return}fe(),O=ne(1),j.length=0,_=$e(),document.body.appendChild(_),q=!1,he(),Se(),Ie()}function Me(){me(),be(),q=!1,_&&(_.classList.add("nf-fade-out"),setTimeout(()=>{_==null||_.remove(),_=null},500)),L&&(L.remove(),L=null)}function w(e,t,r){if(!_)return;for(const i of X)for(const c of i.steps)c.id===e&&(c.status=t,r!==void 0&&(c.progress=r));for(const i of O)i.stepId===e&&(i.status=t,r!==void 0&&(i.progress=r));const o=document.getElementById(`nf-step-${e}`);if(o&&(o.className="nf-step",t==="active"?o.classList.add("nf-step-active"):t==="done"?o.classList.add("nf-step-done"):t==="error"&&o.classList.add("nf-step-error")),r!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,r)}%`)}re(),oe()}function H(e){w(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ae(e=4e3){me(),be(),re(),oe(),setTimeout(()=>Me(),e)}function re(){for(const e of X){const t=e.steps.filter(u=>u.status!=="skipped").length,r=e.steps.filter(u=>u.status==="done").length,o=e.steps.some(u=>u.status==="active"),i=t>0?Math.round(r/t*100):0,c=document.getElementById(`nf-pct-${e.id}`);c&&(c.textContent=`${i}%`);const d=document.getElementById(`nf-modbar-${e.id}`);d&&(d.style.width=`${i}%`);const a=document.getElementById(`nf-mod-${e.id}`);a&&(a.classList.remove("nf-active","nf-done"),i>=100?a.classList.add("nf-done"):o&&a.classList.add("nf-active"))}}function Be(e){var o,i,c,d;const t=new Map;for(const a of O)t.set(a.stepId,{status:a.status,progress:a.progress});O=ne(e);for(const a of O){const u=t.get(a.stepId);u&&(a.status=u.status,u.progress!==void 0&&(a.progress=u.progress))}if(ke(),e>1){const a=X.find(u=>u.id==="video");if(a){const u=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=a.steps.find(s=>s.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=a.steps.find(s=>s.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((c=a.steps.find(s=>s.id==="vid-generate"))==null?void 0:c.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((d=a.steps.find(s=>s.id==="vid-wait"))==null?void 0:d.status)||"waiting",progress:0}];for(let s=2;s<=e;s++)u.push({id:`scene${s}-prompt`,label:`Scene ${s} Prompt`,status:"waiting"}),u.push({id:`scene${s}-gen`,label:`Scene ${s} Generate`,status:"waiting"}),u.push({id:`scene${s}-wait`,label:`Scene ${s} รอผล`,status:"waiting",progress:0});a.steps=u,we(a)}}const r=X.find(a=>a.id==="render");if(r&&e>1){const a=r.steps.find(s=>s.id==="download");a&&(a.label="ดาวน์โหลด 720p");const u=r.steps.find(s=>s.id==="upscale");u&&(u.label="Full Video"),we(r)}re(),oe()}function we(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${i.id}`;let d="";i.progress!==void 0&&(d=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${d}
        `,t.appendChild(c)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o)}function ve(e){const t=e.replace(/^\[Netflow AI\]\s*/,"");j.push(t),j.length>Ee&&j.shift();const r=document.getElementById("nf-log-feed");r&&(r.innerHTML=j.map(o=>`<div class="nf-log-line">&gt; ${o}</div>`).join(""))}const n=e=>{console.log(`[Netflow AI] ${e}`);try{ve(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},T=e=>{console.warn(`[Netflow AI] ${e}`);try{ve(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},ae=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ee=/Win/i.test(navigator.userAgent),J=ae?"🍎 Mac":ee?"🪟 Win":"🐧 Other";n(`Content script loaded on Google Flow page ${J}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),c=(t.textContent||"").trim().slice(0,30);n(`🖱️ Click (${o},${i}) → <${r}> "${c}"`)},!0);const g=e=>new Promise(t=>setTimeout(t,e));async function W(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),ee&&(await g(50),e.click())}function Fe(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function ye(e){const t=[],r=document.querySelectorAll("i");for(const o of r){if((o.textContent||"").trim()!==e)continue;let c=o,d=null,a=1/0;for(let u=0;u<20&&c&&(c=c.parentElement,!(!c||c===document.body));u++){const s=c.getBoundingClientRect();if(s.width>100&&s.height>80&&s.width<window.innerWidth*.6&&s.top>=-10&&s.bottom<=window.innerHeight+10){const D=s.width*s.height;D<a&&(d=c,a=D)}}d&&!t.includes(d)&&t.push(d)}return t.sort((o,i)=>{const c=o.getBoundingClientRect(),d=i.getBoundingClientRect();return c.left-d.left}),t}function se(){const e=ye("videocam");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🎬 Found ${e.length} video card(s) via <i>videocam</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("video");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const c=o.getBoundingClientRect();if(c.width>100&&c.height>80&&c.width<window.innerWidth*.6)return n(`🎬 Found video card via <video> fallback at (${c.left.toFixed(0)},${c.top.toFixed(0)})`),o;o=o.parentElement}}return n("🎬 No video card found"),null}function De(){const e=ye("image");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🖼️ Found ${e.length} image card(s) via <i>image</i> — first at (${r.left.toFixed(0)},${r.top.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const c=o.getBoundingClientRect();if(c.width>100&&c.height>80&&c.width<window.innerWidth*.6)return n(`🖼️ Found image card via <canvas> fallback at (${c.left.toFixed(0)},${c.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ No image card found"),null}function Ne(e,t){var a;const[r,o]=e.split(","),i=((a=r.match(/:(.*?);/))==null?void 0:a[1])||"image/png",c=atob(o),d=new Uint8Array(c.length);for(let u=0;u<c.length;u++)d[u]=c.charCodeAt(u);return new File([d],t,{type:i})}function K(e){var o;const t=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((o=i.textContent)==null?void 0:o.trim())===e){const c=i.closest("button");c&&t.push(c)}return t}function Re(){const e=[...K("add"),...K("add_2")];if(e.length===0){n("No add buttons found by icon — trying text search");const o=document.querySelectorAll("button");for(const i of o){const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width<60&&c.height<60){const d=(i.textContent||"").trim();if(d==="+"||d==="add")return i}}return null}let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();i.y>r&&(r=i.y,t=o)}return t&&n(`Found prompt bar "+" button at y=${r.toFixed(0)}`),t}function ce(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=K(o);let c=null,d=0;for(const a of i){const u=a.getBoundingClientRect();u.y>d&&(d=u.y,c=a)}if(c)return n(`Found generate button via icon "${o}" at y=${d.toFixed(0)}`),c}const e=document.querySelectorAll("button");let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const c=Math.abs(i.width-i.height)<10&&i.width<60,d=i.y+i.x+(c?1e3:0);d>r&&(r=d,t=o)}}if(t)return n("Found generate button via bottom-right heuristic"),t;for(const o of e){const i=(o.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return o}return null}function le(){const e=document.querySelectorAll("textarea");for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const t=document.querySelectorAll('[contenteditable="true"]');for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of r){const i=o.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return o}return e.length>0?e[e.length-1]:null}async function de(e,t){var r,o,i,c;e.focus(),await g(300),n("setPromptText: Strategy 1 — Slate beforeinput insertFromPaste");try{const d=new DataTransfer;d.setData("text/plain",t),d.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const a=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:d});e.dispatchEvent(a),n("setPromptText: Dispatched beforeinput insertFromPaste");const u=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:d});e.dispatchEvent(u),await g(800);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(s.length>20){n(`setPromptText: ✅ Strategy 1 worked (${s.length} chars)`);return}n(`setPromptText: Strategy 1 — text not detected (got ${s.length} chars)`)}catch(d){n(`setPromptText: Strategy 1 failed: ${d.message}`)}n("setPromptText: Strategy 2 — Slate beforeinput insertText");try{e.focus(),await g(100);const d=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(d);const a=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(a),await g(800);const u=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(u.length>20){n(`setPromptText: ✅ Strategy 2 worked (${u.length} chars)`);return}n("setPromptText: Strategy 2 — text not detected")}catch(d){n(`setPromptText: Strategy 2 failed: ${d.message}`)}n("setPromptText: Strategy 3 — ClipboardEvent paste (Mac-safe)");try{e.focus(),await g(200);const d=new DataTransfer;d.setData("text/plain",t),d.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const a=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:d});e.dispatchEvent(a),await g(800);const u=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(u.length>20){n(`setPromptText: ✅ Strategy 3 worked (${u.length} chars)`);return}n("setPromptText: Strategy 3 — ClipboardEvent text not detected")}catch(d){n(`setPromptText: Strategy 3 failed: ${d.message}`)}n("setPromptText: Strategy 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(t),n("setPromptText: Copied to clipboard via navigator.clipboard");else{const a=document.createElement("textarea");a.value=t,a.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),n("setPromptText: Copied to clipboard via execCommand")}e.focus(),await g(200),document.execCommand("paste"),await g(500);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร/g,"").trim();if(d.length>20){n(`setPromptText: ✅ Strategy 4 worked (${d.length} chars)`);return}}catch(d){n(`setPromptText: Strategy 4 failed: ${d.message}`)}n("setPromptText: Strategy 5 — React fiber Slate editor");try{const d=Object.keys(e).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(d){let a=e[d];for(let u=0;u<30&&a;u++){const s=a.memoizedProps,D=a.memoizedState;if((o=s==null?void 0:s.editor)!=null&&o.insertText){n("setPromptText: Found Slate editor via fiber props");const l=s.editor;l.selection,l.insertText(t),n("setPromptText: ✅ Strategy 5 — inserted via editor.insertText");return}if((c=(i=D==null?void 0:D.memoizedState)==null?void 0:i.editor)!=null&&c.insertText){n("setPromptText: Found Slate editor via fiber state"),D.memoizedState.editor.insertText(t),n("setPromptText: ✅ Strategy 5 — inserted via state editor");return}a=a.return}n("setPromptText: Fiber found but no Slate editor in tree")}else n("setPromptText: No React fiber found on element")}catch(d){n(`setPromptText: Strategy 5 failed: ${d.message}`)}n("setPromptText: ⚠️ All 5 strategies attempted — check console for results")}function Le(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const r of t)e.push({input:r,origType:"file"}),r.type="text";return e.length>0&&n(`Neutralized ${e.length} file inputs (type → text)`),e}function _e(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 Blocked file dialog open (${J})`);return}return e.call(this)},n(`🔒 File dialog blocker installed (${J})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 File dialog blocker removed")}}function Oe(e,t,r){var u;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(s=>s.input)];for(const s of o)!i.includes(s)&&s.offsetParent===null&&i.push(s);for(const s of i)s.type="file";n(`Restored ${i.length} inputs to type=file`);const c=document.querySelectorAll('input[type="file"]');if(c.length===0)return n(`⚠️ No file inputs found after restore (${J})`),!1;let d;if(r&&r.size>0){const s=Array.from(c).filter(D=>!r.has(D));s.length>0?(d=s[s.length-1],n(`Targeting NEW file input (${s.length} new, ${c.length} total)`)):(d=c[c.length-1],n(`No new file inputs found — using last of ${c.length}`))}else d=c[c.length-1];const a=new DataTransfer;a.items.add(t);try{d.files=a.files,n(`Injected file via target.files (${((u=d.files)==null?void 0:u.length)??0} files)`)}catch(s){n(`target.files assignment failed: ${s.message} — trying defineProperty`);try{Object.defineProperty(d,"files",{value:a.files,writable:!0,configurable:!0}),n("Injected file via Object.defineProperty")}catch(D){return T(`Both file injection methods failed: ${D.message}`),!1}}d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0}));try{const s=new DataTransfer;s.items.add(t);const D=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:s});d.dispatchEvent(D),n("Also dispatched drop event on file input")}catch{}return n(`✅ File injection complete: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${J}`),!0}async function xe(e,t){var u;n(`── Uploading ${t} into prompt bar ──`);const r=Ne(e,t);n(`File size: ${(r.size/1024).toFixed(1)} KB`);const o=Re();if(!o)return T("Could not find prompt bar '+' button"),!1;const i=new Set(document.querySelectorAll('input[type="file"]'));n(`Pre-existing file inputs: ${i.size}`);const c=_e();let d=Le();const a=new MutationObserver(s=>{for(const D of s)for(const l of D.addedNodes)if(l instanceof HTMLInputElement&&l.type==="file"&&(l.type="text",d.push({input:l,origType:"file"}),n("🎯 Observer neutralized new file input")),l instanceof HTMLElement){const E=l.querySelectorAll('input[type="file"]');for(const f of E)f.type="text",d.push({input:f,origType:"file"}),n("🎯 Observer neutralized nested file input")}});a.observe(document.body,{childList:!0,subtree:!0});try{await W(o),n("Clicked '+' button"),await g(1500),n("Checking for upload menu...");let s=!1;const D=Date.now();for(;!s&&Date.now()-D<5e3;){const E=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const f of E){if(f===o)continue;const p=f.querySelectorAll("i");for(const x of p){const b=((u=x.textContent)==null?void 0:u.trim())||"";if((b==="upload"||b==="upload_file")&&!Array.from(f.querySelectorAll("i")).map(v=>{var $;return($=v.textContent)==null?void 0:$.trim()}).includes("drive_folder_upload")){await W(f),s=!0,n(`Clicked upload menu (icon: ${b}) [${ae?"Mac":"Win"}]`);break}}if(s)break}if(!s)for(const f of E){if(f===o)continue;const p=f.childNodes.length<=5?(f.textContent||"").trim():"";if(p.length>0&&p.length<40){const x=p.toLowerCase();if(x==="upload"||x==="อัปโหลด"||x==="อัพโหลด"||x.includes("upload image")||x.includes("upload photo")||x.includes("อัปโหลดรูปภาพ")||x.includes("อัพโหลดรูปภาพ")||x.includes("from computer")||x.includes("จากคอมพิวเตอร์")){await W(f),s=!0,n(`Clicked upload menu (text: "${p}") [${ae?"Mac":"Win"}]`);break}}}s||await g(500)}return s||n("⚠️ Upload menu not found after 5s polling"),await g(1e3),Oe(d,r,i)?(n(`✅ Injected ${t} — no dialog opened`),await g(2500),!0):(T(`No file input found for ${t}`),!1)}finally{a.disconnect(),c();for(const s of d)s.input.type!=="file"&&(s.input.type="file")}}async function ze(e,t){n("=== Step 0: Configure Flow settings ===");const r=document.querySelectorAll("button");let o=null;for(const f of r){const p=f.textContent||"";if((p.includes("Nano Banana")||p.includes("Imagen")||p.includes("วิดีโอ")||p.includes("รูปภาพ")||p.includes("Image")||p.includes("Video"))&&f.getBoundingClientRect().bottom>window.innerHeight*.7){o=f,n(`Found settings button by text: "${p.substring(0,30).trim()}"`);break}}if(!o)for(const f of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const p=K(f);for(const x of p)if(x.getBoundingClientRect().bottom>window.innerHeight*.7){o=x,n(`Found settings button by icon: ${f}`);break}if(o)break}if(!o)return T("Could not find settings button"),!1;const i=o.getBoundingClientRect(),c=i.left+i.width/2,d=i.top+i.height/2,a={bubbles:!0,cancelable:!0,clientX:c,clientY:d,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",a)),o.dispatchEvent(new MouseEvent("click",a)),n("Clicked settings button"),await g(1500);let u=!1,s=null;const D=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const f of D){const p=f.getAttribute("aria-controls")||"",x=f.id||"";if(p.toUpperCase().includes("IMAGE")||x.toUpperCase().includes("IMAGE")){s=f,n(`Found Image tab via flow_tab_slider_trigger (aria-controls: ${p})`);break}}if(!s)for(const f of document.querySelectorAll('[role="tab"]')){const p=f.id||"";if(p.toUpperCase().includes("TRIGGER-IMAGE")){s=f,n(`Found Image tab via id: ${p}`);break}}if(!s)for(const f of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const p=(f.textContent||"").trim();if((p==="Image"||p.endsWith("Image")||p==="รูปภาพ"||p==="ภาพ")&&!p.includes("Video")&&!p.includes("วิดีโอ")){s=f,n(`Found Image tab via text match: "${p}"`);break}}if(s){const f=s.getAttribute("data-state")||"",p=s.getAttribute("aria-selected")||"";if(f==="active"||p==="true")u=!0,n("Image tab already active — no click needed");else{const x=s.getBoundingClientRect(),b={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};s.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",b)),await g(80),s.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",b)),s.dispatchEvent(new MouseEvent("click",b)),u=!0,n("✅ Clicked Image tab — switched to Image mode"),await g(400)}}u||n("⚠️ Could not find Image mode button — may already be in Image mode");const l=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const f of document.querySelectorAll("button, [role='tab'], [role='option']")){const p=(f.textContent||"").trim();if(p===l||p.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const x=f.getBoundingClientRect(),b={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",b)),await g(80),f.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",b)),f.dispatchEvent(new MouseEvent("click",b)),n(`Selected orientation: ${l}`),await g(400);break}}const E=`x${t}`;for(const f of document.querySelectorAll("button, [role='tab'], [role='option']"))if((f.textContent||"").trim()===E){const x=f.getBoundingClientRect(),b={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",b)),await g(80),f.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",b)),f.dispatchEvent(new MouseEvent("click",b)),n(`Selected count: ${E}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),o.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",a)),o.dispatchEvent(new MouseEvent("click",a)),n("Closed settings panel"),await g(600),!0}async function Ge(e){var D;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}try{Te()}catch(l){console.warn("Overlay show error:",l)}const t=[],r=[];try{w("settings","active");const l=e.orientation||"horizontal",E=e.outputCount||1,f=await ze(l,E);t.push(f?"✅ Settings":"⚠️ Settings"),w("settings",f?"done":"error")}catch(l){T(`Settings error: ${l.message}`),t.push("⚠️ Settings"),w("settings","error")}n("=== Step 1: Upload reference images ===");const o=()=>{const l=document.querySelectorAll("span, div, p, label");for(const E of l){const f=(E.textContent||"").trim();if(/^\d{1,3}%$/.test(f)){if(f==="100%")return null;const p=E.getBoundingClientRect();if(p.width>0&&p.height>0&&p.top>0&&p.top<window.innerHeight)return f}}return null},i=async l=>{n(`Waiting for ${l} upload to complete...`),await g(2e3);const E=Date.now(),f=6e4;let p="",x=Date.now();const b=15e3;for(;Date.now()-E<f;){const S=o();if(S){if(S!==p)p=S,x=Date.now();else if(Date.now()-x>b){n(`✅ ${l} upload — % stuck at ${S} for ${b/1e3}s, treating as complete`),await g(1e3);return}n(`Upload in progress: ${S} — waiting...`),await g(1500)}else{n(`✅ ${l} upload complete — no % indicator found`),await g(1e3);return}}T(`⚠️ ${l} upload timeout after ${f/1e3}s — proceeding anyway`)};if(e.characterImage){w("upload-char","active");try{const l=await xe(e.characterImage,"character.png");t.push(l?"✅ ตัวละคร":"⚠️ ตัวละคร"),l||r.push("character upload failed"),w("upload-char",l?"done":"error")}catch(l){T(`Character upload error: ${l.message}`),t.push("❌ ตัวละคร"),r.push("character upload error"),w("upload-char","error")}await i("character")}else H("upload-char");if(e.productImage){w("upload-prod","active");try{const l=await xe(e.productImage,"product.png");t.push(l?"✅ สินค้า":"⚠️ สินค้า"),l||r.push("product upload failed"),w("upload-prod",l?"done":"error")}catch(l){T(`Product upload error: ${l.message}`),t.push("❌ สินค้า"),r.push("product upload error"),w("upload-prod","error")}await i("product")}else H("upload-prod");n("Closing any open dialogs..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const c=o();c&&(n(`⚠️ Upload still showing ${c} after all uploads — waiting extra...`),await i("final")),n("All uploads complete — proceeding to prompt"),await g(1e3),n("=== Step 2: Paste image prompt ==="),w("img-prompt","active"),await g(1e3);const d=le();d?(await de(d,e.imagePrompt),n(`Pasted prompt (${e.imagePrompt.length} chars)`),t.push("✅ Prompt"),w("img-prompt","done")):(T("Could not find prompt text input"),t.push("❌ Prompt"),r.push("prompt input not found"),w("img-prompt","error")),await g(800);const a=new Set;document.querySelectorAll("img").forEach(l=>{l.src&&a.add(l.src)}),n(`Snapshot: ${a.size} existing images before Generate`),n("=== Step 3: Click Generate → ==="),w("img-generate","active"),await g(500);const u=ce();if(u){const l=u.getBoundingClientRect(),E=l.left+l.width/2,f=l.top+l.height/2,p={bubbles:!0,cancelable:!0,clientX:E,clientY:f,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",p)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",p)),u.dispatchEvent(new MouseEvent("click",p)),n("Dispatched full click sequence on Generate button"),t.push("✅ Generate"),await g(500),u.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",p)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",p)),u.dispatchEvent(new MouseEvent("click",p)),n("Dispatched safety retry click on Generate button"),w("img-generate","done")}else T("Could not find → Generate button"),t.push("❌ Generate"),r.push("generate button not found"),w("img-generate","error");n("=== Step 4: Wait for generated image + Animate ==="),w("img-wait","active");try{n("Waiting 15s for generation to start..."),await g(15e3),n("Polling for NEW generated image (not in snapshot)...");let l=null;const E=Date.now();for(;!l&&Date.now()-E<18e4;){const f=document.querySelectorAll("img");for(const p of f){if(a.has(p.src)||!(p.alt||"").toLowerCase().includes("generated"))continue;const b=p.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const S=p.closest("div");if(S){l=S,n(`Found AI-generated image via alt="${p.alt}": ${p.src.substring(0,80)}...`);break}}}if(!l)for(const p of f){if(a.has(p.src))continue;const x=p.closest("div"),b=(x==null?void 0:x.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg")){n(`Skipping reference image (container has filename): ${b.substring(0,40)}`);continue}const S=p.getBoundingClientRect();if(S.width>120&&S.height>120&&S.top>0&&S.top<window.innerHeight*.85){const v=p.closest("div");if(v){l=v,n(`Found NEW image (fallback): ${p.src.substring(0,80)}...`);break}}}l||(await g(5e3),n("Still waiting for new generated image..."))}if(!l)T("Timeout waiting for generated image"),t.push("⚠️ Wait Image"),w("img-wait","error");else{n("Found generated image element"),t.push("✅ Image Found"),w("img-wait","done",100);const f=l.getBoundingClientRect(),p=f.left+f.width/2,x=f.top+f.height/2,b={bubbles:!0,cancelable:!0,clientX:p,clientY:x};l.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseenter",b)),l.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseover",b)),l.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousemove",b)),n("Dispatched hover events on image (pointer + mouse)"),await g(1500);let S=null;for(const v of["more_vert","more_horiz","more"]){const $=K(v);for(const A of $){const m=A.getBoundingClientRect();if(m.top>=f.top-20&&m.top<=f.bottom&&m.right>=f.right-150&&m.right<=f.right+20){S=A;break}}if(S)break}if(!S){const v=document.querySelectorAll("button");for(const $ of v){const A=$.getBoundingClientRect();if(A.width<50&&A.height<50&&A.top>=f.top-10&&A.top<=f.top+60&&A.left>=f.right-80){const m=$.querySelectorAll("i");for(const P of m)if((((D=P.textContent)==null?void 0:D.trim())||"").includes("more")){S=$;break}if(S)break;const C=$.getAttribute("aria-label")||"";if(C.includes("เพิ่มเติม")||C.includes("more")){S=$;break}}}}if(!S)T("Could not find 3-dots button on generated image"),t.push("⚠️ 3-dots");else{const v=S.getBoundingClientRect(),$=v.left+v.width/2,A=v.top+v.height/2,m={bubbles:!0,cancelable:!0,clientX:$,clientY:A,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),S.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",m)),S.dispatchEvent(new MouseEvent("click",m)),n("Clicked 3-dots button"),await g(1500);let C=null;const P=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const I of P){const N=(I.textContent||"").trim();if(N.includes("ทำให้เป็นภาพเคลื่อนไหว")||N.includes("Animate")||N.includes("animate")){C=I;break}}if(!C)T("Could not find 'ทำให้เป็นภาพเคลื่อนไหว' menu item"),t.push("⚠️ Animate");else{const I=C.getBoundingClientRect(),N=I.left+I.width/2,z=I.top+I.height/2,B={bubbles:!0,cancelable:!0,clientX:N,clientY:z,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",B)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",B)),C.dispatchEvent(new MouseEvent("click",B)),n("✅ Clicked 'ทำให้เป็นภาพเคลื่อนไหว' — switching to video mode"),t.push("✅ Animate"),w("animate","done"),await g(3e3)}}}}catch(l){T(`Step 4 error: ${l.message}`),t.push("⚠️ Animate")}if(e.videoPrompt){n("=== Step 5: Paste video prompt + Generate video ==="),w("vid-prompt","active");try{n("Waiting for video mode UI..."),await g(3e3);let l=!1;const E=document.querySelectorAll("button, span, div");for(const x of E){const b=(x.textContent||"").trim(),S=x.getBoundingClientRect();if((b==="วิดีโอ"||b==="Video"||b.includes("วิดีโอ"))&&S.bottom>window.innerHeight*.7){l=!0,n("Confirmed: now in Video mode");break}}l||n("Video mode indicator not found — proceeding anyway (may already be in video mode after Animate)"),await g(1e3);const f=le();f?(await de(f,e.videoPrompt),n(`Pasted video prompt (${e.videoPrompt.length} chars)`),t.push("✅ Video Prompt"),w("vid-prompt","done")):(T("Could not find prompt text input for video prompt"),t.push("❌ Video Prompt"),r.push("video prompt input not found"),w("vid-prompt","error")),await g(1e3),w("vid-generate","active");const p=ce();if(p){const x=p.getBoundingClientRect(),b=x.left+x.width/2,S=x.top+x.height/2,v={bubbles:!0,cancelable:!0,clientX:b,clientY:S,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),n("✅ Clicked Generate for video — video generation started!"),t.push("✅ Video Generate"),w("vid-generate","done"),await g(500),p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),n("Dispatched safety retry click on video Generate button")}else T("Could not find Generate button for video"),t.push("❌ Video Generate"),r.push("video generate button not found"),w("vid-generate","error")}catch(l){T(`Step 5 error: ${l.message}`),t.push("⚠️ Video Gen"),r.push(`video gen error: ${l.message}`)}}else n("No video prompt provided — skipping video generation step"),H("animate"),H("vid-prompt"),H("vid-generate"),H("vid-wait");if(e.videoPrompt){w("vid-wait","active");const l=e.sceneCount||1,E=e.videoScenePrompts||[e.videoPrompt];if(l>1)try{Be(l)}catch{}n(`=== Step 6: Wait for video + ${l>1?`continue ${l} scenes`:"download"} ===`);const f=document.getElementById("netflow-engine-overlay"),p=()=>{const v=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of v){if(f&&f.contains($))continue;const A=($.textContent||"").trim();if(A.length>10)continue;const m=A.match(/(\d{1,3})\s*%/);if(!m)continue;const C=parseInt(m[1],10);if(C<1||C>100)continue;const P=$.getBoundingClientRect();if(!(P.width===0||P.width>150)&&!(P.top<0||P.top>window.innerHeight))return C}return null},x=async(v=6e5)=>{n("Waiting for video generation..."),w("vid-wait","active"),await g(5e3);const $=()=>{const h=document.querySelectorAll("div, span, p, label, strong, small");let M=0;for(const R of h){if(f&&f.contains(R))continue;const V=(R.textContent||"").trim();if(V.includes("%")&&V.length<15){const U=R.tagName.toLowerCase(),te=R.className&&typeof R.className=="string"?R.className.split(/\s+/).slice(0,2).join(" "):"",pe=R.getBoundingClientRect();if(n(`  🔍 "${V}" in <${U}.${te}> at (${pe.left.toFixed(0)},${pe.top.toFixed(0)}) w=${pe.width.toFixed(0)}`),M++,M>=5)break}}M===0&&n("  🔍 No element with '%' text found")},A=se();n(A?"📍 Video card already present at start":"⏳ No video card yet — will poll for % progress"),n("🔍 Debug scan for % text nodes:"),$();const m=Date.now();let C=-1,P=0,I=!1;for(;Date.now()-m<v;){const h=p();if(h!==null){if(h!==C&&(n(`Video progress: ${h}%`),C=h,w("vid-wait","active",h)),P=Date.now(),h>=100){n("✅ 100% detected!"),I=!0;break}}else if(C>30){const M=Math.floor((Date.now()-P)/1e3);if(M>=5){n(`✅ % disappeared at ${C}% (lost for ${M}s) — video done!`),I=!0;break}n(`⏳ % lost at ${C}% — confirming in ${5-M}s...`)}else{const M=Math.floor((Date.now()-m)/1e3);M%15<3&&n(`⏳ Waiting... (${M}s) no % found`)}if(!I&&C>0&&se()&&!A){n(`✅ Video card appeared while tracking at ${C}% — video done!`),I=!0;break}await g(3e3)}const N=se();if(!N)return n("❌ No video card found to click"),w("vid-wait","error"),null;const z=N;I?(w("vid-wait","done",100),n("Cool-down 4s before clicking..."),await g(4e3)):n("⚠️ Timeout — attempting to click video card anyway");const B=z.getBoundingClientRect();let F=B.left+B.width/2,G=B.top+B.height/2,y=z;const k=z.querySelector("video, img, canvas");if(k){const h=k.getBoundingClientRect();h.width>50&&h.height>50&&(F=h.left+h.width/2,G=h.top+h.height/2,y=k,n(`🎯 Found thumbnail <${k.tagName.toLowerCase()}> inside card at (${F.toFixed(0)},${G.toFixed(0)}) ${h.width.toFixed(0)}x${h.height.toFixed(0)}`))}else G=B.top+B.height*.3,n(`🎯 No thumbnail child — clicking top 1/3 at (${F.toFixed(0)},${G.toFixed(0)})`);n(`🖱️ Hovering video card 4s at (${F.toFixed(0)}, ${G.toFixed(0)})...`),Fe(y);for(let h=0;h<8;h++){const M={bubbles:!0,cancelable:!0,clientX:F+h%2,clientY:G};y.dispatchEvent(new PointerEvent("pointermove",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousemove",M)),await g(500)}n("Clicking video card...");for(let h=0;h<2;h++){const M=document.elementFromPoint(F,G);M?await W(M):await W(y),await g(300)}return n("✅ Video card clicks done"),z},b=async(v,$=6e5)=>{n(`Waiting for scene ${v} video generation...`),await g(5e3);const A=Date.now();let m=-1,C=0;for(;Date.now()-A<$;){const P=p();if(P!==null){if(P!==m&&(n(`Scene ${v} progress: ${P}%`),m=P),C=Date.now(),P>=100)return n(`✅ Scene ${v} — 100%!`),!0}else if(m>30){const I=Math.floor((Date.now()-C)/1e3);if(I>=5)return n(`✅ Scene ${v} — % disappeared at ${m}% (${I}s) — done!`),!0;n(`⏳ Scene ${v} % lost at ${m}% — confirming in ${5-I}s...`)}else{const I=Math.floor((Date.now()-A)/1e3);I%15<3&&n(`⏳ Scene ${v} waiting... (${I}s)`)}await g(3e3)}return!1},S=async()=>{let v=null;const $=document.querySelectorAll("button");for(const y of $){const k=(y.textContent||"").trim();if(k.includes("ดาวน์โหลด")||k.toLowerCase()==="download"){v=y,n(`Found ดาวน์โหลด button via text: "${k}"`);break}}if(!v)for(const y of $){const k=y.getBoundingClientRect();if(k.top<80&&k.right>window.innerWidth-300){const h=(y.textContent||"").trim().toLowerCase(),M=(y.getAttribute("aria-label")||"").toLowerCase();if(h.includes("ดาวน์")||h.includes("download")||M.includes("ดาวน์")||M.includes("download")){v=y,n("Found ดาวน์โหลด button via position+text");break}}}if(!v){const y=document.querySelectorAll('[data-type="button-overlay"]');for(const k of y){const h=k.closest("button")||k.parentElement;if(h){const M=(h.textContent||"").trim();if(M.includes("ดาวน์โหลด")||M.toLowerCase().includes("download")){v=h,n("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!v){T("Could not find ดาวน์โหลด button in detail view"),t.push("⚠️ Download btn");return}const A=v.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:A.left+A.width/2,clientY:A.top+A.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",m)),v.dispatchEvent(new MouseEvent("click",m)),ee&&(await g(50),v.click()),n("Clicked ดาวน์โหลด button"),t.push("✅ ดาวน์โหลด"),w("download","done"),w("upscale","active"),await g(1500);const C=async y=>{const k=y.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:k.left+k.width/2,clientY:k.top+k.height/2,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),y.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",h)),y.dispatchEvent(new MouseEvent("click",h)),ee&&(await g(50),y.click())},P=async y=>{const k=y.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:k.left+k.width/2,clientY:k.top+k.height/2};y.dispatchEvent(new PointerEvent("pointerenter",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseenter",h)),y.dispatchEvent(new PointerEvent("pointermove",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseover",h)),y.dispatchEvent(new MouseEvent("mousemove",h))},I=y=>{const k=document.querySelectorAll('[role="menuitem"]');for(const h of k)if((h.textContent||"").trim().includes(y)){const R=h.getBoundingClientRect();if(R.width>0&&R.height>0)return h}return null},N=I("Full Video");if(N){n("Multi-scene menu detected — hovering Full Video..."),await P(N),await g(500),await C(N),n("Clicked Full Video"),t.push("✅ Full Video"),await g(1500);let y=null;const k=Date.now();for(;Date.now()-k<5e3&&(y=I("720p"),!y);)n("Waiting for 720p submenu..."),await g(500);if(!y){T("Could not find 720p option in submenu"),t.push("⚠️ 720p");return}await C(y),n("Clicked 720p — download starting"),t.push("✅ 720p"),w("upscale","active")}else{let y=I("1080p");if(!y){const k=document.querySelectorAll("button, div[role='button'], span");for(const h of k)if((h.textContent||"").trim().includes("1080p")&&h.offsetParent!==null){y=h.closest("button")||h;break}}if(!y){T("Could not find 1080p option"),t.push("⚠️ 1080p");return}await C(y),n("Clicked 1080p — download starting"),t.push("✅ 1080p"),w("upscale","active")}n("Waiting for download to complete...");const z=Date.now();let B=!1;for(;Date.now()-z<3e5;){const y=(document.body.innerText||"")+" "+(document.body.textContent||"");if(y.includes("Download complete")){n("✅ Download complete!"),t.push("✅ Downloaded"),w("upscale","done",100),B=!0;break}if(y.includes("Upscaling complete")||y.includes("upscaling complete")){n("✅ Upscaling complete!"),t.push("✅ Upscaled"),w("upscale","done",100),B=!0;break}const k=document.querySelectorAll("div, span, p");for(const M of k){const R=(M.textContent||"").trim();if(R==="Upscaling complete!"||R==="Upscaling complete"||R==="Download complete!"||R==="Download complete"){n(`✅ ${R} (element-level detection)`),t.push("✅ "+(R.includes("Upscal")?"Upscaled":"Downloaded")),w("upscale","done",100),B=!0;break}}if(B)break;const h=Math.floor((Date.now()-z)/1e3);y.includes("Downloading your extended video")?n(`⏳ Downloading extended video... (${h}s)`):y.includes("Upscaling your video")?n(`⏳ Upscaling in progress... (${h}s)`):n(`⏳ Waiting... (${h}s)`),await g(3e3)}if(!B){T("Download timeout — file may still be downloading"),t.push("⚠️ Download timeout"),w("upscale","error");return}w("open","active"),n("Waiting for download file to be ready..."),await g(5e3);let F=!1;const G=Date.now();for(;Date.now()-G<6e4&&!F;){try{await new Promise(y=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},k=>{chrome.runtime.lastError?T(`Download poll error: ${chrome.runtime.lastError.message}`):k!=null&&k.success?(n(`✅ Opened video: ${k.message}`),t.push("✅ Opened"),w("open","done"),F=!0):n(`Download not ready: ${k==null?void 0:k.message}`),y()})})}catch(y){T(`Poll exception: ${y.message}`)}F||await g(3e3)}F||(T("Could not find/open downloaded video"),t.push("⚠️ Open"))};try{if(!await x())T("Timeout waiting for video generation"),t.push("⚠️ Video Wait"),w("vid-wait","error");else if(t.push("✅ Video Complete"),w("vid-wait","done",100),w("download","active"),l<=1){n("Single scene — waiting 3s for detail view to load..."),t.push("✅ Clicked"),await g(3e3);let $=null;const A=document.querySelectorAll("button");for(const m of A){const C=(m.textContent||"").trim();if(C.includes("ดาวน์โหลด")||C.toLowerCase()==="download"){$=m,n(`Found ดาวน์โหลด button via text: "${C}"`);break}}if(!$)for(const m of A){const C=m.getBoundingClientRect();if(C.top<80&&C.right>window.innerWidth-300){const P=(m.textContent||"").trim().toLowerCase(),I=(m.getAttribute("aria-label")||"").toLowerCase();if(P.includes("ดาวน์")||P.includes("download")||I.includes("ดาวน์")||I.includes("download")){$=m,n("Found ดาวน์โหลด button via position+text");break}}}if(!$){const m=document.querySelectorAll('[data-type="button-overlay"]');for(const C of m){const P=C.closest("button")||C.parentElement;if(P){const I=(P.textContent||"").trim();if(I.includes("ดาวน์โหลด")||I.toLowerCase().includes("download")){$=P,n("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!$)T("Could not find ดาวน์โหลด button in detail view"),t.push("⚠️ Download btn");else{const m=$.getBoundingClientRect(),C=m.left+m.width/2,P=m.top+m.height/2,I={bubbles:!0,cancelable:!0,clientX:C,clientY:P,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),$.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",I)),$.dispatchEvent(new MouseEvent("click",I)),n("Clicked ดาวน์โหลด button"),t.push("✅ ดาวน์โหลด"),w("download","done"),w("upscale","active"),await g(1500);let N=null;const z=document.querySelectorAll('button[role="menuitem"], [role="menuitem"], [role="option"], li');for(const B of z)if((B.textContent||"").trim().includes("1080p")){N=B;break}if(!N){const B=document.querySelectorAll("button, div[role='button'], span");for(const F of B)if((F.textContent||"").trim().includes("1080p")&&F.offsetParent!==null){N=F.closest("button")||F;break}}if(!N)T("Could not find 1080p option in dropdown"),t.push("⚠️ 1080p");else{const B=N.getBoundingClientRect(),F=B.left+B.width/2,G=B.top+B.height/2,y={bubbles:!0,cancelable:!0,clientX:F,clientY:G,button:0};N.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mousedown",y)),await g(80),N.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mouseup",y)),N.dispatchEvent(new MouseEvent("click",y)),n("Clicked 1080p — download starting"),t.push("✅ 1080p"),n("Waiting for upscaling + download...");const k=Date.now();let h=!1;for(;Date.now()-k<3e5;){const M=(document.body.innerText||"")+" "+(document.body.textContent||"");if(M.includes("Upscaling complete")||M.includes("upscaling complete")){n("✅ Upscaling complete!"),t.push("✅ Upscaled"),w("upscale","done",100),h=!0;break}const R=document.querySelectorAll("div, span, p");for(const U of R){const te=(U.textContent||"").trim();if(te==="Upscaling complete!"||te==="Upscaling complete"){n("✅ Upscaling complete! (element-level)"),t.push("✅ Upscaled"),w("upscale","done",100),h=!0;break}}if(h)break;const V=Math.floor((Date.now()-k)/1e3);M.includes("Upscaling your video")?n(`⏳ Upscaling in progress... (${V}s)`):n(`⏳ Waiting for upscale... (${V}s)`),await g(3e3)}if(h){w("open","active"),n("Waiting for download file to be ready..."),await g(5e3);let M=!1;const R=Date.now();for(;Date.now()-R<6e4&&!M;){try{await new Promise(V=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},U=>{chrome.runtime.lastError?T(`Download poll error: ${chrome.runtime.lastError.message}`):U!=null&&U.success?(n(`✅ Opened video: ${U.message}`),t.push("✅ Opened"),w("open","done"),M=!0):n(`Download not ready: ${U==null?void 0:U.message}`),V()})})}catch(V){T(`Poll exception: ${V.message}`)}M||await g(3e3)}M||(T("Could not find/open downloaded video"),t.push("⚠️ Open"))}else T("Upscaling timeout — download may still complete"),t.push("⚠️ Upscale timeout")}}}else{n(`Multi-scene mode: ${l} scenes`);for(let $=1;$<l;$++){const A=E[$];if(!A){n(`No prompt for scene ${$+1} — skipping`);continue}const m=$+1;n(`--- Scene ${m}/${l} ---`),await g(2e3),w(`scene${m}-prompt`,"active");const C=le();if(C)await de(C,A),n(`Pasted scene ${m} prompt (${A.length} chars)`),t.push(`✅ Scene${m} Prompt`),w(`scene${m}-prompt`,"done");else{T(`Could not find prompt input for scene ${m}`),t.push(`❌ Scene${m}`),r.push(`scene ${m} prompt input not found`),w(`scene${m}-prompt`,"error");break}await g(1e3),w(`scene${m}-gen`,"active");const P=ce();if(P){const N=P.getBoundingClientRect(),z=N.left+N.width/2,B=N.top+N.height/2,F={bubbles:!0,cancelable:!0,clientX:z,clientY:B,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",F)),await g(80),P.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",F)),P.dispatchEvent(new MouseEvent("click",F)),n(`Clicked Generate for scene ${m} (full event sequence)`),t.push(`✅ Scene${m} Gen`),w(`scene${m}-gen`,"done"),await g(500),P.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",F)),await g(80),P.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",F)),P.dispatchEvent(new MouseEvent("click",F))}else{T(`Could not find Generate button for scene ${m}`),t.push(`❌ Scene${m} Gen`),r.push(`scene ${m} generate button not found`),w(`scene${m}-gen`,"error");break}w(`scene${m}-wait`,"active"),await b(m)?(t.push(`✅ Scene${m}`),w(`scene${m}-wait`,"done",100)):(T(`Timeout on scene ${m}`),t.push(`⚠️ Scene${m}`),w(`scene${m}-wait`,"error"))}n("All scenes generated!"),t.push("✅ All Scenes"),await g(3e3),await S()}}catch(v){T(`Step 6 error: ${v.message}`),t.push("⚠️ Step6"),r.push(`step 6: ${v.message}`)}}const s=r.length===0;try{Ae(s?5e3:8e3)}catch(l){console.warn("Overlay complete error:",l)}return{success:s,message:s?`สำเร็จ! ${t.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${t.join(" → ")} | ${r.join(", ")}`,step:s?"done":"partial"}}chrome.runtime.onMessage.addListener((e,t,r)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("Received GENERATE_IMAGE request"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Ge(e).then(o=>n(`✅ Automation finished: ${o.message}`)).catch(o=>console.error("[Netflow AI] Generate error:",o)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ STOP_AUTOMATION received — setting stop flag"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return r({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — finding first image card via <i>image</i> icon..."),await g(500);const o=De();if(!o){T("No image card found via <i>image</i> icon");return}const i=o.getBoundingClientRect(),c=i.left+i.width/2,d=i.top+i.height/2;n(`Image card at (${c.toFixed(0)}, ${d.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — clicking 2 times`);for(let a=0;a<2;a++){const u=document.elementFromPoint(c,d);u?(await W(u),n(`Click ${a+1}/2 on <${u.tagName.toLowerCase()}>`)):(await W(o),n(`Click ${a+1}/2 on card (fallback)`)),await g(300)}n("✅ 2 clicks on image card done")})(),!1}),n("Google Flow content script ready — waiting for commands"),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),c=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ DblClick (${o},${i}) → <${r}> "${c}"`)},!0)})();
