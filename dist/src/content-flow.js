(function(){"use strict";let U=null,W=null,ne=null,xe=0,ce=null,le=null,Z=!1,V=[];const oe=[],Be=4;function pe(e){const o=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)o.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{o.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let s=2;s<=e;s++)o.push({stepId:`scene${s}-prompt`,label:`Scene ${s} Prompt`,status:"waiting"},{stepId:`scene${s}-gen`,label:`Scene ${s} Generate`,status:"waiting"},{stepId:`scene${s}-wait`,label:`Scene ${s} รอ %`,status:"waiting",progress:0});o.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return o}const ie=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];V=pe(1);function Ee(){ne||(ne=document.createElement("style"),ne.id="netflow-overlay-styles",ne.textContent=`
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
    `,document.head.appendChild(ne))}function Fe(){const e="http://www.w3.org/2000/svg",o=document.createElementNS(e,"svg");o.setAttribute("class","nf-pipes-svg"),o.setAttribute("viewBox","0 0 100 100"),o.setAttribute("preserveAspectRatio","none");const s=document.createElementNS(e,"defs"),n=document.createElementNS(e,"linearGradient");n.id="nf-pipe-gradient";const r=document.createElementNS(e,"stop");r.setAttribute("offset","0%"),r.setAttribute("stop-color","rgba(220,38,38,0.9)");const l=document.createElementNS(e,"stop");l.setAttribute("offset","50%"),l.setAttribute("stop-color","rgba(251,146,60,0.8)");const d=document.createElementNS(e,"stop");d.setAttribute("offset","100%"),d.setAttribute("stop-color","rgba(220,38,38,0.9)"),n.appendChild(r),n.appendChild(l),n.appendChild(d),s.appendChild(n);const c=document.createElementNS(e,"filter");c.id="nf-glow",c.setAttribute("x","-50%"),c.setAttribute("y","-50%"),c.setAttribute("width","200%"),c.setAttribute("height","200%");const i=document.createElementNS(e,"feGaussianBlur");i.setAttribute("stdDeviation","3"),i.setAttribute("result","coloredBlur");const a=document.createElementNS(e,"feMerge"),R=document.createElementNS(e,"feMergeNode");R.setAttribute("in","coloredBlur");const F=document.createElementNS(e,"feMergeNode");F.setAttribute("in","SourceGraphic"),a.appendChild(R),a.appendChild(F),c.appendChild(i),c.appendChild(a),s.appendChild(c),o.appendChild(s);function T(x,v){const P=document.createElementNS(e,"path");P.setAttribute("d",x),P.setAttribute("class","nf-pipe-glow"),P.style.animationDelay=`${v*.5}s`,o.appendChild(P);const Q=document.createElementNS(e,"path");Q.setAttribute("d",x),Q.setAttribute("class","nf-pipe-base"),o.appendChild(Q);const J=document.createElementNS(e,"path");J.setAttribute("d",x),J.setAttribute("class","nf-pipe-flow"),J.style.animationDelay=`${v*.3}s`,o.appendChild(J)}return T("M 39 44 C 39 47, 40 48, 40.5 46",0),T("M 61 44 C 61 47, 60 48, 59.5 46",1),T("M 39 56 C 39 53, 40 52, 40.5 54",2),T("M 61 56 C 61 53, 60 52, 59.5 54",3),T("M 39 38 C 44 30, 56 30, 61 38",4),T("M 39 62 C 44 70, 56 70, 61 62",5),T("M 28 46 C 23 50, 23 50, 28 54",6),T("M 72 46 C 77 50, 77 50, 72 54",7),[[40.5,46],[59.5,46],[40.5,54],[59.5,54],[39,44],[61,44],[39,56],[61,56],[39,38],[61,38],[39,62],[61,62],[28,46],[72,46],[28,54],[72,54]].forEach(([x,v])=>{const P=document.createElementNS(e,"circle");P.setAttribute("cx",String(x)),P.setAttribute("cy",String(v)),P.setAttribute("r","0.35"),P.setAttribute("class","nf-pipe-dot"),o.appendChild(P)}),o}function Ce(e){e.innerHTML="",V.forEach((o,s)=>{const n=document.createElement("div");n.className="nf-proc-row nf-proc-waiting",n.id=`nf-proc-${o.stepId}`,n.innerHTML=`
            <span class="nf-proc-num">${s+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${o.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(n)})}function De(){const e=document.getElementById("nf-terminal");if(!e)return;Ce(e);const o=document.getElementById("nf-step-counter");o&&(o.textContent=`0/${V.length}`)}function Ne(){const e=document.createElement("div");e.id="netflow-engine-overlay",["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(F=>{const T=document.createElement("div");T.className=`nf-corner-deco ${F}`,e.appendChild(T)});const o=document.createElement("button");o.className="nf-close-btn",o.textContent="✕ ซ่อน",o.onclick=()=>fe(),e.appendChild(o);const s=document.createElement("div");s.className="nf-layout",s.appendChild(Fe());const n=document.createElement("div");n.className="nf-core-monitor",n.id="nf-core-monitor";const r=document.createElement("div");r.className="nf-core-header",r.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">CORE STATUS:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${V.length}</div>
    `,n.appendChild(r);const l=document.createElement("div");l.className="nf-terminal",l.id="nf-terminal",Ce(l),n.appendChild(l);const d=document.createElement("div");d.className="nf-log-feed",d.id="nf-log-feed",d.innerHTML='<div class="nf-log-line" style="color:rgba(220,38,38,0.4)">Waiting for automation...</div>',n.appendChild(d);const c=document.createElement("div");c.className="nf-visualizer",c.id="nf-visualizer";const i=30;for(let F=0;F<i;F++){const T=document.createElement("div");T.className=`nf-viz-bar${F%5===0?" nf-viz-accent":""}`,T.style.height="3px",c.appendChild(T)}n.appendChild(c),s.appendChild(n);const a=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ie.forEach((F,T)=>{const h=Le(F);h.classList.add(a[T]),h.id=`nf-mod-${F.id}`,s.appendChild(h)}),e.appendChild(s);for(let F=0;F<20;F++){const T=document.createElement("div");T.className="nf-particle",T.style.left=`${10+Math.random()*80}%`,T.style.bottom=`${Math.random()*30}%`,T.style.animationDuration=`${3+Math.random()*5}s`,T.style.animationDelay=`${Math.random()*4}s`,Math.random()>.5&&(T.style.background="rgba(251, 146, 60, 0.4)"),e.appendChild(T)}const R=document.createElement("div");return R.className="nf-footer",R.innerHTML=`
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
    `,e.appendChild(R),e}function Le(e){const o=document.createElement("div");o.className="nf-module";const s=document.createElement("div");s.className="nf-mod-header",s.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,o.appendChild(s),e.steps.forEach(r=>{const l=document.createElement("div");l.className="nf-step",l.id=`nf-step-${r.id}`;let d="";r.progress!==void 0&&(d=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${r.id}" style="width: 0%"></div>
                </div>
            `),l.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${r.label}</span>
            ${d}
        `,o.appendChild(l)});const n=document.createElement("div");return n.className="nf-mod-progress",n.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,o.appendChild(n),o}function Re(){xe=Date.now(),ce=setInterval(()=>{const e=Math.floor((Date.now()-xe)/1e3),o=String(Math.floor(e/60)).padStart(2,"0"),s=String(e%60).padStart(2,"0"),n=document.getElementById("nf-timer");n&&(n.textContent=`${o}:${s}`)},1e3)}function $e(){ce&&(clearInterval(ce),ce=null)}function _e(){le=setInterval(()=>{const e=document.getElementById("nf-visualizer");if(!e)return;e.querySelectorAll(".nf-viz-bar").forEach(s=>{const n=3+Math.random()*28;s.style.height=`${n}px`})},180)}function ke(){le&&(clearInterval(le),le=null);const e=document.getElementById("nf-visualizer");e&&e.querySelectorAll(".nf-viz-bar").forEach(o=>{o.style.height="3px"})}function ue(){let e=0;const o=V.filter(c=>c.status!=="skipped").length;for(const c of V){const i=document.getElementById(`nf-proc-${c.stepId}`);if(!i)continue;i.className="nf-proc-row";const a=i.querySelector(".nf-proc-badge");switch(c.status){case"done":i.classList.add("nf-proc-done"),a&&(a.textContent="✅ done"),e++;break;case"active":i.classList.add("nf-proc-active"),a&&(a.textContent=c.progress!==void 0&&c.progress>0?`⏳ ${c.progress}%`:"⏳ active");break;case"error":i.classList.add("nf-proc-error"),a&&(a.textContent="❌ error");break;case"skipped":i.classList.add("nf-proc-skipped"),a&&(a.textContent="— skip");break;default:i.classList.add("nf-proc-waiting"),a&&(a.textContent="(queued)")}}const s=document.getElementById("nf-step-counter");s&&(s.textContent=`${e}/${V.length}`);const n=document.querySelector(".nf-core-title-val"),r=document.querySelector(".nf-status-dot");e>=o&&o>0?(n&&(n.textContent="COMPLETE",n.style.color="#4ade80"),r&&(r.style.background="#4ade80",r.style.boxShadow="0 0 8px rgba(74,222,128,0.7)")):V.some(i=>i.status==="error")?(n&&(n.textContent="ERROR",n.style.color="#f87171"),r&&(r.style.background="#ef4444",r.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):V.some(i=>i.status==="active")&&n&&(n.textContent="ACTIVE",n.style.color="#4ade80",n.style.textShadow="0 0 10px rgba(74,222,128,0.5)");const l=document.getElementById("nf-terminal"),d=l==null?void 0:l.querySelector(".nf-proc-active");d&&l&&d.scrollIntoView({behavior:"smooth",block:"center"})}function Pe(){W||(Ee(),W=document.createElement("button"),W.id="nf-toggle-btn",W.className="nf-toggle-hidden",W.innerHTML="⚡",W.title="เปิด Netflow Overlay",W.onclick=()=>fe(),document.body.appendChild(W))}function fe(){U&&(Pe(),Z?(U.classList.remove("nf-hidden"),U.classList.add("nf-visible"),W&&(W.classList.remove("nf-toggle-visible"),W.classList.add("nf-toggle-hidden")),Z=!1):(U.classList.remove("nf-visible"),U.classList.add("nf-hidden"),W&&(W.classList.remove("nf-toggle-hidden"),W.classList.add("nf-toggle-visible")),Z=!0))}function Oe(){if(U){Z&&fe();return}Ee(),V=pe(1),oe.length=0,U=Ne(),document.body.appendChild(U),Z=!1,Pe(),Re(),_e()}function ze(){$e(),ke(),Z=!1,U&&(U.classList.add("nf-fade-out"),setTimeout(()=>{U==null||U.remove(),U=null},500)),W&&(W.remove(),W=null)}function m(e,o,s){if(!U)return;for(const r of ie)for(const l of r.steps)l.id===e&&(l.status=o,s!==void 0&&(l.progress=s));for(const r of V)r.stepId===e&&(r.status=o,s!==void 0&&(r.progress=s));const n=document.getElementById(`nf-step-${e}`);if(n&&(n.className="nf-step",o==="active"?n.classList.add("nf-step-active"):o==="done"?n.classList.add("nf-step-done"):o==="error"&&n.classList.add("nf-step-error")),s!==void 0){const r=document.getElementById(`nf-bar-${e}`);r&&(r.style.width=`${Math.min(100,s)}%`)}ge(),ue()}function ee(e){m(e,"skipped");const o=document.getElementById(`nf-step-${e}`);o&&(o.style.opacity="0.2")}function Ge(e=4e3){$e(),ke(),ge(),ue(),setTimeout(()=>ze(),e)}function ge(){for(const e of ie){const o=e.steps.filter(i=>i.status!=="skipped").length,s=e.steps.filter(i=>i.status==="done").length,n=e.steps.some(i=>i.status==="active"),r=o>0?Math.round(s/o*100):0,l=document.getElementById(`nf-pct-${e.id}`);l&&(l.textContent=`${r}%`);const d=document.getElementById(`nf-modbar-${e.id}`);d&&(d.style.width=`${r}%`);const c=document.getElementById(`nf-mod-${e.id}`);c&&(c.classList.remove("nf-active","nf-done"),r>=100?c.classList.add("nf-done"):n&&c.classList.add("nf-active"))}}function We(e){var n,r,l,d;const o=new Map;for(const c of V)o.set(c.stepId,{status:c.status,progress:c.progress});V=pe(e);for(const c of V){const i=o.get(c.stepId);i&&(c.status=i.status,i.progress!==void 0&&(c.progress=i.progress))}if(De(),e>1){const c=ie.find(i=>i.id==="video");if(c){const i=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((n=c.steps.find(a=>a.id==="animate"))==null?void 0:n.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((r=c.steps.find(a=>a.id==="vid-prompt"))==null?void 0:r.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((l=c.steps.find(a=>a.id==="vid-generate"))==null?void 0:l.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((d=c.steps.find(a=>a.id==="vid-wait"))==null?void 0:d.status)||"waiting",progress:0}];for(let a=2;a<=e;a++)i.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),i.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),i.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});c.steps=i,Se(c)}}const s=ie.find(c=>c.id==="render");if(s&&e>1){const c=s.steps.find(a=>a.id==="download");c&&(c.label="ดาวน์โหลด 720p");const i=s.steps.find(a=>a.id==="upscale");i&&(i.label="Full Video"),Se(s)}ge(),ue()}function Se(e){const o=document.getElementById(`nf-mod-${e.id}`);if(!o)return;o.querySelectorAll(".nf-step, .nf-mod-progress").forEach(r=>r.remove()),e.steps.forEach(r=>{const l=document.createElement("div");l.className="nf-step",l.id=`nf-step-${r.id}`;let d="";r.progress!==void 0&&(d=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${r.id}" style="width: 0%"></div>
                </div>
            `),l.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${r.label}</span>
            ${d}
        `,o.appendChild(l)});const n=document.createElement("div");n.className="nf-mod-progress",n.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,o.appendChild(n)}function Ie(e){const o=e.replace(/^\[Netflow AI\]\s*/,"");oe.push(o),oe.length>Be&&oe.shift();const s=document.getElementById("nf-log-feed");s&&(s.innerHTML=oe.map(n=>`<div class="nf-log-line">&gt; ${n}</div>`).join(""))}const t=e=>{console.log(`[Netflow AI] ${e}`);try{Ie(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},I=e=>{console.warn(`[Netflow AI] ${e}`);try{Ie(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},re=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),me=/Win/i.test(navigator.userAgent),te=re?"🍎 Mac":me?"🪟 Win":"🐧 Other";t(`Content script loaded on Google Flow page ${te}`),document.addEventListener("click",e=>{const o=e.target;if(!o)return;const s=o.tagName.toLowerCase(),n=Math.round(e.clientX),r=Math.round(e.clientY),l=(o.textContent||"").trim().slice(0,30);t(`🖱️ Click (${n},${r}) → <${s}> "${l}"`)},!0);const p=e=>new Promise(o=>setTimeout(o,e));async function K(e){const o=e.getBoundingClientRect(),s=o.left+o.width/2,n=o.top+o.height/2,r={bubbles:!0,cancelable:!0,clientX:s,clientY:n,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",r)),await p(80),e.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",r)),e.dispatchEvent(new MouseEvent("click",r)),await p(50),e.click()}function Ue(e){const o=e.getBoundingClientRect(),s=o.left+o.width/2,n=o.top+o.height/2,r={bubbles:!0,cancelable:!0,clientX:s,clientY:n};e.dispatchEvent(new PointerEvent("pointerenter",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",r)),e.dispatchEvent(new PointerEvent("pointerover",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",r)),e.dispatchEvent(new PointerEvent("pointermove",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",r))}function Te(e){const o=[],s=document.querySelectorAll("i");for(const n of s){if((n.textContent||"").trim()!==e)continue;let l=n,d=null,c=1/0;for(let i=0;i<20&&l&&(l=l.parentElement,!(!l||l===document.body));i++){const a=l.getBoundingClientRect();if(a.width>100&&a.height>80&&a.width<window.innerWidth*.6&&a.top>=-10&&a.bottom<=window.innerHeight+10){const R=a.width*a.height;R<c&&(d=l,c=R)}}d&&!o.includes(d)&&o.push(d)}return o.sort((n,r)=>{const l=n.getBoundingClientRect(),d=r.getBoundingClientRect();return l.left-d.left}),o}function be(){const e=Te("videocam");if(e.length>0){const s=e[0].getBoundingClientRect();return t(`🎬 Found ${e.length} video card(s) via <i>videocam</i> — first at (${s.left.toFixed(0)},${s.top.toFixed(0)}) ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),e[0]}const o=document.querySelectorAll("video");for(const s of o){let n=s.parentElement;for(let r=0;r<10&&n;r++){const l=n.getBoundingClientRect();if(l.width>100&&l.height>80&&l.width<window.innerWidth*.6)return t(`🎬 Found video card via <video> fallback at (${l.left.toFixed(0)},${l.top.toFixed(0)})`),n;n=n.parentElement}}return t("🎬 No video card found"),null}function Ve(){const e=Te("image");if(e.length>0){const s=e[0].getBoundingClientRect();return t(`🖼️ Found ${e.length} image card(s) via <i>image</i> — first at (${s.left.toFixed(0)},${s.top.toFixed(0)}) ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),e[0]}const o=document.querySelectorAll("canvas");for(const s of o){let n=s.parentElement;for(let r=0;r<10&&n;r++){const l=n.getBoundingClientRect();if(l.width>100&&l.height>80&&l.width<window.innerWidth*.6)return t(`🖼️ Found image card via <canvas> fallback at (${l.left.toFixed(0)},${l.top.toFixed(0)})`),n;n=n.parentElement}}return t("🖼️ No image card found"),null}function qe(e,o){var c;const[s,n]=e.split(","),r=((c=s.match(/:(.*?);/))==null?void 0:c[1])||"image/png",l=atob(n),d=new Uint8Array(l.length);for(let i=0;i<l.length;i++)d[i]=l.charCodeAt(i);return new File([d],o,{type:r})}function ae(e){var n;const o=[],s=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const r of s)if(((n=r.textContent)==null?void 0:n.trim())===e){const l=r.closest("button");l&&o.push(l)}return o}function He(){const e=[...ae("add"),...ae("add_2")];if(e.length===0){t("No add buttons found by icon — trying text search");const n=document.querySelectorAll("button");for(const r of n){const l=r.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60){const d=(r.textContent||"").trim();if(d==="+"||d==="add")return r}}return null}let o=null,s=0;for(const n of e){const r=n.getBoundingClientRect();r.y>s&&(s=r.y,o=n)}return o&&t(`Found prompt bar "+" button at y=${s.toFixed(0)}`),o}function he(){for(const n of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const r=ae(n);let l=null,d=0;for(const c of r){const i=c.getBoundingClientRect();i.y>d&&(d=i.y,l=c)}if(l)return t(`Found generate button via icon "${n}" at y=${d.toFixed(0)}`),l}const e=document.querySelectorAll("button");let o=null,s=0;for(const n of e){const r=n.getBoundingClientRect();if(r.bottom>window.innerHeight*.7&&r.right>window.innerWidth*.5){const l=Math.abs(r.width-r.height)<10&&r.width<60,d=r.y+r.x+(l?1e3:0);d>s&&(s=d,o=n)}}if(o)return t("Found generate button via bottom-right heuristic"),o;for(const n of e){const r=(n.getAttribute("aria-label")||"").toLowerCase();if(r.includes("generate")||r.includes("submit")||r.includes("send")||r.includes("สร้าง"))return n}return null}function we(){const e=document.querySelectorAll("textarea");for(const n of e)if(n.getBoundingClientRect().bottom>window.innerHeight*.5)return n;const o=document.querySelectorAll('[contenteditable="true"]');for(const n of o)if(n.getBoundingClientRect().bottom>window.innerHeight*.5)return n;const s=document.querySelectorAll("input[type='text'], input:not([type])");for(const n of s){const r=n.placeholder||"";if(r.includes("สร้าง")||r.includes("prompt")||r.includes("describe"))return n}return e.length>0?e[e.length-1]:null}async function ve(e,o){var s,n,r,l;e.focus(),await p(300),t("setPromptText: Strategy 1 — Slate beforeinput insertFromPaste");try{const d=new DataTransfer;d.setData("text/plain",o),d.setData("text/html",`<p>${o.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:d});e.dispatchEvent(c),t("setPromptText: Dispatched beforeinput insertFromPaste");const i=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:d});e.dispatchEvent(i),await p(800);const a=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(a.length>20){t(`setPromptText: ✅ Strategy 1 worked (${a.length} chars)`);return}t(`setPromptText: Strategy 1 — text not detected (got ${a.length} chars)`)}catch(d){t(`setPromptText: Strategy 1 failed: ${d.message}`)}t("setPromptText: Strategy 2 — Slate beforeinput insertText");try{e.focus(),await p(100);const d=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:o});e.dispatchEvent(d);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:o});e.dispatchEvent(c),await p(800);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){t(`setPromptText: ✅ Strategy 2 worked (${i.length} chars)`);return}t("setPromptText: Strategy 2 — text not detected")}catch(d){t(`setPromptText: Strategy 2 failed: ${d.message}`)}t("setPromptText: Strategy 3 — ClipboardEvent paste (Mac-safe)");try{e.focus(),await p(200);const d=new DataTransfer;d.setData("text/plain",o),d.setData("text/html",`<p>${o.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:d});e.dispatchEvent(c),await p(800);const i=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(i.length>20){t(`setPromptText: ✅ Strategy 3 worked (${i.length} chars)`);return}t("setPromptText: Strategy 3 — ClipboardEvent text not detected")}catch(d){t(`setPromptText: Strategy 3 failed: ${d.message}`)}t("setPromptText: Strategy 4 — navigator.clipboard + execCommand paste");try{if((s=navigator.clipboard)!=null&&s.writeText)await navigator.clipboard.writeText(o),t("setPromptText: Copied to clipboard via navigator.clipboard");else{const c=document.createElement("textarea");c.value=o,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),t("setPromptText: Copied to clipboard via execCommand")}e.focus(),await p(200),document.execCommand("paste"),await p(500);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){t(`setPromptText: ✅ Strategy 4 worked (${d.length} chars)`);return}}catch(d){t(`setPromptText: Strategy 4 failed: ${d.message}`)}t("setPromptText: Strategy 5 — React fiber Slate editor");try{const d=Object.keys(e).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(d){let c=e[d];for(let i=0;i<30&&c;i++){const a=c.memoizedProps,R=c.memoizedState;if((n=a==null?void 0:a.editor)!=null&&n.insertText){t("setPromptText: Found Slate editor via fiber props");const F=a.editor;F.selection,F.insertText(o),t("setPromptText: ✅ Strategy 5 — inserted via editor.insertText");return}if((l=(r=R==null?void 0:R.memoizedState)==null?void 0:r.editor)!=null&&l.insertText){t("setPromptText: Found Slate editor via fiber state"),R.memoizedState.editor.insertText(o),t("setPromptText: ✅ Strategy 5 — inserted via state editor");return}c=c.return}t("setPromptText: Fiber found but no Slate editor in tree")}else t("setPromptText: No React fiber found on element")}catch(d){t(`setPromptText: Strategy 5 failed: ${d.message}`)}t("setPromptText: ⚠️ All 5 strategies attempted — check console for results")}function Ye(){const e=[],o=document.querySelectorAll('input[type="file"]');for(const s of o)e.push({input:s,origType:"file"}),s.type="text";return e.length>0&&t(`Neutralized ${e.length} file inputs (type → text)`),e}function je(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){t(`🚫 Blocked file dialog open (${te})`);return}return e.call(this)},t(`🔒 File dialog blocker installed (${te})`),()=>{HTMLInputElement.prototype.click=e,t("🔓 File dialog blocker removed")}}function Xe(e,o,s){var i;const n=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),r=[...e.map(a=>a.input)];for(const a of n)!r.includes(a)&&a.offsetParent===null&&r.push(a);for(const a of r)a.type="file";t(`Restored ${r.length} inputs to type=file`);const l=document.querySelectorAll('input[type="file"]');if(l.length===0)return t(`⚠️ No file inputs found after restore (${te})`),!1;let d;if(s&&s.size>0){const a=Array.from(l).filter(R=>!s.has(R));a.length>0?(d=a[a.length-1],t(`Targeting NEW file input (${a.length} new, ${l.length} total)`)):(d=l[l.length-1],t(`No new file inputs found — using last of ${l.length}`))}else d=l[l.length-1];const c=new DataTransfer;c.items.add(o);try{d.files=c.files,t(`Injected file via target.files (${((i=d.files)==null?void 0:i.length)??0} files)`)}catch(a){t(`target.files assignment failed: ${a.message} — trying defineProperty`);try{Object.defineProperty(d,"files",{value:c.files,writable:!0,configurable:!0}),t("Injected file via Object.defineProperty")}catch(R){return I(`Both file injection methods failed: ${R.message}`),!1}}d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0}));try{const a=new DataTransfer;a.items.add(o);const R=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:a});d.dispatchEvent(R),t("Also dispatched drop event on file input")}catch{}return t(`✅ File injection complete: ${o.name} (${(o.size/1024).toFixed(1)} KB) → <input> ${te}`),!0}async function Me(e,o){var i;t(`── Uploading ${o} into prompt bar ──`);const s=qe(e,o);t(`File size: ${(s.size/1024).toFixed(1)} KB`);const n=He();if(!n)return I("Could not find prompt bar '+' button"),!1;const r=new Set(document.querySelectorAll('input[type="file"]'));t(`Pre-existing file inputs: ${r.size}`);const l=je();let d=Ye();const c=new MutationObserver(a=>{for(const R of a)for(const F of R.addedNodes)if(F instanceof HTMLInputElement&&F.type==="file"&&(F.type="text",d.push({input:F,origType:"file"}),t("🎯 Observer neutralized new file input")),F instanceof HTMLElement){const T=F.querySelectorAll('input[type="file"]');for(const h of T)h.type="text",d.push({input:h,origType:"file"}),t("🎯 Observer neutralized nested file input")}});c.observe(document.body,{childList:!0,subtree:!0});try{await K(n),t("Clicked '+' button"),await p(1500),t("Checking for upload menu...");let a=!1;const R=Date.now();for(;!a&&Date.now()-R<5e3;){const T=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const h of T){if(h===n)continue;const x=h.querySelectorAll("i");for(const v of x){const P=((i=v.textContent)==null?void 0:i.trim())||"";if((P==="upload"||P==="upload_file")&&!Array.from(h.querySelectorAll("i")).map(J=>{var se;return(se=J.textContent)==null?void 0:se.trim()}).includes("drive_folder_upload")){await K(h),a=!0,t(`Clicked upload menu (icon: ${P}) [${re?"Mac":"Win"}]`);break}}if(a)break}if(!a)for(const h of T){if(h===n)continue;const x=h.childNodes.length<=5?(h.textContent||"").trim():"";if(x.length>0&&x.length<40){const v=x.toLowerCase();if(v==="upload"||v==="อัปโหลด"||v==="อัพโหลด"||v.includes("upload image")||v.includes("upload photo")||v.includes("อัปโหลดรูปภาพ")||v.includes("อัพโหลดรูปภาพ")||v.includes("from computer")||v.includes("จากคอมพิวเตอร์")){await K(h),a=!0,t(`Clicked upload menu (text: "${x}") [${re?"Mac":"Win"}]`);break}}}a||await p(500)}return a||t("⚠️ Upload menu not found after 5s polling"),await p(1e3),Xe(d,s,r)?(t(`✅ Injected ${o} — no dialog opened`),await p(2500),!0):(I(`No file input found for ${o}`),!1)}finally{c.disconnect(),l();for(const a of d)a.input.type!=="file"&&(a.input.type="file")}}async function Je(e,o){t("=== Step 0: Configure Flow settings ===");const s=document.querySelectorAll("button");let n=null;for(const h of s){const x=h.textContent||"";if((x.includes("Nano Banana")||x.includes("Imagen")||x.includes("วิดีโอ")||x.includes("รูปภาพ")||x.includes("Image")||x.includes("Video"))&&h.getBoundingClientRect().bottom>window.innerHeight*.7){n=h,t(`Found settings button by text: "${x.substring(0,30).trim()}"`);break}}if(!n)for(const h of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const x=ae(h);for(const v of x)if(v.getBoundingClientRect().bottom>window.innerHeight*.7){n=v,t(`Found settings button by icon: ${h}`);break}if(n)break}if(!n)return I("Could not find settings button"),!1;const r=n.getBoundingClientRect(),l=r.left+r.width/2,d=r.top+r.height/2,c={bubbles:!0,cancelable:!0,clientX:l,clientY:d,button:0};n.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mousedown",c)),await p(80),n.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseup",c)),n.dispatchEvent(new MouseEvent("click",c)),t("Clicked settings button"),await p(1500);let i=!1,a=null;const R=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const h of R){const x=h.getAttribute("aria-controls")||"",v=h.id||"";if(x.toUpperCase().includes("IMAGE")||v.toUpperCase().includes("IMAGE")){a=h,t(`Found Image tab via flow_tab_slider_trigger (aria-controls: ${x})`);break}}if(!a)for(const h of document.querySelectorAll('[role="tab"]')){const x=h.id||"";if(x.toUpperCase().includes("TRIGGER-IMAGE")){a=h,t(`Found Image tab via id: ${x}`);break}}if(!a)for(const h of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const x=(h.textContent||"").trim();if((x==="Image"||x.endsWith("Image")||x==="รูปภาพ"||x==="ภาพ")&&!x.includes("Video")&&!x.includes("วิดีโอ")){a=h,t(`Found Image tab via text match: "${x}"`);break}}if(a){const h=a.getAttribute("data-state")||"",x=a.getAttribute("aria-selected")||"";if(h==="active"||x==="true")i=!0,t("Image tab already active — no click needed");else{const v=a.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:v.left+v.width/2,clientY:v.top+v.height/2,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",P)),await p(80),a.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",P)),a.dispatchEvent(new MouseEvent("click",P)),i=!0,t("✅ Clicked Image tab — switched to Image mode"),await p(400)}}i||t("⚠️ Could not find Image mode button — may already be in Image mode");const F=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const h of document.querySelectorAll("button, [role='tab'], [role='option']")){const x=(h.textContent||"").trim();if(x===F||x.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const v=h.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:v.left+v.width/2,clientY:v.top+v.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",P)),await p(80),h.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",P)),h.dispatchEvent(new MouseEvent("click",P)),t(`Selected orientation: ${F}`),await p(400);break}}const T=`x${o}`;for(const h of document.querySelectorAll("button, [role='tab'], [role='option']"))if((h.textContent||"").trim()===T){const v=h.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:v.left+v.width/2,clientY:v.top+v.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",P)),await p(80),h.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",P)),h.dispatchEvent(new MouseEvent("click",P)),t(`Selected count: ${T}`),await p(400);break}return await p(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await p(300),n.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mousedown",c)),await p(80),n.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),n.dispatchEvent(new MouseEvent("mouseup",c)),n.dispatchEvent(new MouseEvent("click",c)),t("Closed settings panel"),await p(600),!0}async function Ke(e){var Q,J,se,Ae;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const o=navigator.userAgent,s=o.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),n=s?s[1]:"unknown",r=re?"macOS":me?"Windows":/Linux/i.test(o)?"Linux":/CrOS/i.test(o)?"ChromeOS":"Unknown",l=re?((J=(Q=o.match(/Mac OS X ([0-9_]+)/))==null?void 0:Q[1])==null?void 0:J.replace(/_/g,"."))||"":me&&((se=o.match(/Windows NT ([0-9.]+)/))==null?void 0:se[1])||"",d=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;t("══════════════════════════════════════════"),t(`🖥️ System: ${r} ${l} | Chrome ${n}`),t(`🌐 Language: ${d} | Screen: ${c} | Platform: ${te}`),t("══════════════════════════════════════════");try{Oe()}catch(f){console.warn("Overlay show error:",f)}const i=[],a=[];try{m("settings","active");const f=e.orientation||"horizontal",q=e.outputCount||1,A=await Je(f,q);i.push(A?"✅ Settings":"⚠️ Settings"),m("settings",A?"done":"error")}catch(f){I(`Settings error: ${f.message}`),i.push("⚠️ Settings"),m("settings","error")}t("=== Step 1: Upload reference images ===");const R=()=>{const f=document.querySelectorAll("span, div, p, label");for(const q of f){const A=(q.textContent||"").trim();if(/^\d{1,3}%$/.test(A)){if(A==="100%")return null;const y=q.getBoundingClientRect();if(y.width>0&&y.height>0&&y.top>0&&y.top<window.innerHeight)return A}}return null},F=async f=>{t(`Waiting for ${f} upload to complete...`),await p(2e3);const q=Date.now(),A=6e4;let y="",G=Date.now();const O=15e3;for(;Date.now()-q<A;){const B=R();if(B){if(B!==y)y=B,G=Date.now();else if(Date.now()-G>O){t(`✅ ${f} upload — % stuck at ${B} for ${O/1e3}s, treating as complete`),await p(1e3);return}t(`Upload in progress: ${B} — waiting...`),await p(1500)}else{t(`✅ ${f} upload complete — no % indicator found`),await p(1e3);return}}I(`⚠️ ${f} upload timeout after ${A/1e3}s — proceeding anyway`)};if(e.characterImage){m("upload-char","active");try{const f=await Me(e.characterImage,"character.png");i.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||a.push("character upload failed"),m("upload-char",f?"done":"error")}catch(f){I(`Character upload error: ${f.message}`),i.push("❌ ตัวละคร"),a.push("character upload error"),m("upload-char","error")}await F("character")}else ee("upload-char");if(e.productImage){m("upload-prod","active");try{const f=await Me(e.productImage,"product.png");i.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||a.push("product upload failed"),m("upload-prod",f?"done":"error")}catch(f){I(`Product upload error: ${f.message}`),i.push("❌ สินค้า"),a.push("product upload error"),m("upload-prod","error")}await F("product")}else ee("upload-prod");t("Closing any open dialogs..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await p(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await p(800);const T=R();T&&(t(`⚠️ Upload still showing ${T} after all uploads — waiting extra...`),await F("final")),t("All uploads complete — proceeding to prompt"),await p(1e3),t("=== Step 2: Paste image prompt ==="),m("img-prompt","active"),await p(1e3);const h=we();h?(await ve(h,e.imagePrompt),t(`Pasted prompt (${e.imagePrompt.length} chars)`),i.push("✅ Prompt"),m("img-prompt","done")):(I("Could not find prompt text input"),i.push("❌ Prompt"),a.push("prompt input not found"),m("img-prompt","error")),await p(800);const x=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&x.add(f.src)}),t(`Snapshot: ${x.size} existing images before Generate`),t("=== Step 3: Click Generate → ==="),m("img-generate","active"),await p(500);const v=he();if(v){const f=v.getBoundingClientRect(),q=f.left+f.width/2,A=f.top+f.height/2,y={bubbles:!0,cancelable:!0,clientX:q,clientY:A,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",y)),await p(80),v.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",y)),v.dispatchEvent(new MouseEvent("click",y)),t("Dispatched full click sequence on Generate button"),i.push("✅ Generate"),await p(500),v.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",y)),await p(80),v.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",y)),v.dispatchEvent(new MouseEvent("click",y)),t("Dispatched safety retry click on Generate button"),m("img-generate","done")}else I("Could not find → Generate button"),i.push("❌ Generate"),a.push("generate button not found"),m("img-generate","error");t("=== Step 4: Wait for generated image + Animate ==="),m("img-wait","active");try{t("Waiting 15s for generation to start..."),await p(15e3),t("Polling for NEW generated image (not in snapshot)...");let f=null;const q=Date.now();for(;!f&&Date.now()-q<18e4;){const A=document.querySelectorAll("img");for(const y of A){if(x.has(y.src)||!(y.alt||"").toLowerCase().includes("generated"))continue;const O=y.getBoundingClientRect();if(O.width>120&&O.height>120&&O.top>0&&O.top<window.innerHeight*.85){const B=y.closest("div");if(B){f=B,t(`Found AI-generated image via alt="${y.alt}": ${y.src.substring(0,80)}...`);break}}}if(!f)for(const y of A){if(x.has(y.src))continue;const G=y.closest("div"),O=(G==null?void 0:G.textContent)||"";if(O.includes("product.png")||O.includes("character.png")||O.includes(".png")||O.includes(".jpg")){t(`Skipping reference image (container has filename): ${O.substring(0,40)}`);continue}const B=y.getBoundingClientRect();if(B.width>120&&B.height>120&&B.top>0&&B.top<window.innerHeight*.85){const w=y.closest("div");if(w){f=w,t(`Found NEW image (fallback): ${y.src.substring(0,80)}...`);break}}}f||(await p(5e3),t("Still waiting for new generated image..."))}if(!f)I("Timeout waiting for generated image"),i.push("⚠️ Wait Image"),m("img-wait","error");else{t("Found generated image element"),i.push("✅ Image Found"),m("img-wait","done",100);const A=f.getBoundingClientRect(),y=A.left+A.width/2,G=A.top+A.height/2,O={bubbles:!0,cancelable:!0,clientX:y,clientY:G};f.dispatchEvent(new PointerEvent("pointerenter",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",O)),f.dispatchEvent(new PointerEvent("pointerover",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",O)),f.dispatchEvent(new PointerEvent("pointermove",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",O)),t("Dispatched hover events on image (pointer + mouse)"),await p(1500);let B=null;for(const w of["more_vert","more_horiz","more"]){const k=ae(w);for(const D of k){const u=D.getBoundingClientRect();if(u.top>=A.top-20&&u.top<=A.bottom&&u.right>=A.right-150&&u.right<=A.right+20){B=D;break}}if(B)break}if(!B){const w=document.querySelectorAll("button");for(const k of w){const D=k.getBoundingClientRect();if(D.width<50&&D.height<50&&D.top>=A.top-10&&D.top<=A.top+60&&D.left>=A.right-80){const u=k.querySelectorAll("i");for(const $ of u)if((((Ae=$.textContent)==null?void 0:Ae.trim())||"").includes("more")){B=k;break}if(B)break;const E=k.getAttribute("aria-label")||"";if(E.includes("เพิ่มเติม")||E.includes("more")){B=k;break}}}}if(!B)I("Could not find 3-dots button on generated image"),i.push("⚠️ 3-dots");else{const w=B.getBoundingClientRect(),k=w.left+w.width/2,D=w.top+w.height/2,u={bubbles:!0,cancelable:!0,clientX:k,clientY:D,button:0};B.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mousedown",u)),await p(80),B.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseup",u)),B.dispatchEvent(new MouseEvent("click",u)),t("Clicked 3-dots button"),await p(1500);let E=null;const $=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const S of $){const _=(S.textContent||"").trim();if(_.includes("ทำให้เป็นภาพเคลื่อนไหว")||_.includes("Animate")||_.includes("animate")){E=S;break}}if(!E)I("Could not find 'ทำให้เป็นภาพเคลื่อนไหว' menu item"),i.push("⚠️ Animate");else{const S=E.getBoundingClientRect(),_=S.left+S.width/2,H=S.top+S.height/2,N={bubbles:!0,cancelable:!0,clientX:_,clientY:H,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",N)),await p(80),E.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",N)),E.dispatchEvent(new MouseEvent("click",N)),t("✅ Clicked 'ทำให้เป็นภาพเคลื่อนไหว' — switching to video mode"),i.push("✅ Animate"),m("animate","done"),await p(3e3)}}}}catch(f){I(`Step 4 error: ${f.message}`),i.push("⚠️ Animate")}if(e.videoPrompt){t("=== Step 5: Paste video prompt + Generate video ==="),m("vid-prompt","active");try{t("Waiting for video mode UI..."),await p(3e3);let f=!1;const q=document.querySelectorAll("button, span, div");for(const G of q){const O=(G.textContent||"").trim(),B=G.getBoundingClientRect();if((O==="วิดีโอ"||O==="Video"||O.includes("วิดีโอ"))&&B.bottom>window.innerHeight*.7){f=!0,t("Confirmed: now in Video mode");break}}f||t("Video mode indicator not found — proceeding anyway (may already be in video mode after Animate)"),await p(1e3);const A=we();A?(await ve(A,e.videoPrompt),t(`Pasted video prompt (${e.videoPrompt.length} chars)`),i.push("✅ Video Prompt"),m("vid-prompt","done")):(I("Could not find prompt text input for video prompt"),i.push("❌ Video Prompt"),a.push("video prompt input not found"),m("vid-prompt","error")),await p(1e3),m("vid-generate","active");const y=he();if(y){const G=y.getBoundingClientRect(),O=G.left+G.width/2,B=G.top+G.height/2,w={bubbles:!0,cancelable:!0,clientX:O,clientY:B,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",w)),await p(80),y.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",w)),y.dispatchEvent(new MouseEvent("click",w)),t("✅ Clicked Generate for video — video generation started!"),i.push("✅ Video Generate"),m("vid-generate","done"),await p(500),y.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",w)),await p(80),y.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",w)),y.dispatchEvent(new MouseEvent("click",w)),t("Dispatched safety retry click on video Generate button")}else I("Could not find Generate button for video"),i.push("❌ Video Generate"),a.push("video generate button not found"),m("vid-generate","error")}catch(f){I(`Step 5 error: ${f.message}`),i.push("⚠️ Video Gen"),a.push(`video gen error: ${f.message}`)}}else t("No video prompt provided — skipping video generation step"),ee("animate"),ee("vid-prompt"),ee("vid-generate"),ee("vid-wait");if(e.videoPrompt){m("vid-wait","active");const f=e.sceneCount||1,q=e.videoScenePrompts||[e.videoPrompt];if(f>1)try{We(f)}catch{}t(`=== Step 6: Wait for video + ${f>1?`continue ${f} scenes`:"download"} ===`);const A=document.getElementById("netflow-engine-overlay"),y=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const k of w){if(A&&A.contains(k))continue;const D=(k.textContent||"").trim();if(D.length>10)continue;const u=D.match(/(\d{1,3})\s*%/);if(!u)continue;const E=parseInt(u[1],10);if(E<1||E>100)continue;const $=k.getBoundingClientRect();if(!($.width===0||$.width>150)&&!($.top<0||$.top>window.innerHeight))return E}return null},G=async(w=6e5)=>{t("Waiting for video generation..."),m("vid-wait","active"),await p(5e3);const k=()=>{const g=document.querySelectorAll("div, span, p, label, strong, small");let M=0;for(const z of g){if(A&&A.contains(z))continue;const X=(z.textContent||"").trim();if(X.includes("%")&&X.length<15){const j=z.tagName.toLowerCase(),de=z.className&&typeof z.className=="string"?z.className.split(/\s+/).slice(0,2).join(" "):"",ye=z.getBoundingClientRect();if(t(`  🔍 "${X}" in <${j}.${de}> at (${ye.left.toFixed(0)},${ye.top.toFixed(0)}) w=${ye.width.toFixed(0)}`),M++,M>=5)break}}M===0&&t("  🔍 No element with '%' text found")},D=be();t(D?"📍 Video card already present at start":"⏳ No video card yet — will poll for % progress"),t("🔍 Debug scan for % text nodes:"),k();const u=Date.now();let E=-1,$=0,S=!1;for(;Date.now()-u<w;){const g=y();if(g!==null){if(g!==E&&(t(`Video progress: ${g}%`),E=g,m("vid-wait","active",g)),$=Date.now(),g>=100){t("✅ 100% detected!"),S=!0;break}}else if(E>30){const M=Math.floor((Date.now()-$)/1e3);if(M>=5){t(`✅ % disappeared at ${E}% (lost for ${M}s) — video done!`),S=!0;break}t(`⏳ % lost at ${E}% — confirming in ${5-M}s...`)}else{const M=Math.floor((Date.now()-u)/1e3);M%15<3&&t(`⏳ Waiting... (${M}s) no % found`)}if(!S&&E>0&&be()&&!D){t(`✅ Video card appeared while tracking at ${E}% — video done!`),S=!0;break}await p(3e3)}const _=be();if(!_)return t("❌ No video card found to click"),m("vid-wait","error"),null;const H=_;S?(m("vid-wait","done",100),t("Cool-down 4s before clicking..."),await p(4e3)):t("⚠️ Timeout — attempting to click video card anyway");const N=H.getBoundingClientRect();let L=N.left+N.width/2,Y=N.top+N.height/2,b=H;const C=H.querySelector("video, img, canvas");if(C){const g=C.getBoundingClientRect();g.width>50&&g.height>50&&(L=g.left+g.width/2,Y=g.top+g.height/2,b=C,t(`🎯 Found thumbnail <${C.tagName.toLowerCase()}> inside card at (${L.toFixed(0)},${Y.toFixed(0)}) ${g.width.toFixed(0)}x${g.height.toFixed(0)}`))}else Y=N.top+N.height*.3,t(`🎯 No thumbnail child — clicking top 1/3 at (${L.toFixed(0)},${Y.toFixed(0)})`);t(`🖱️ Hovering video card 4s at (${L.toFixed(0)}, ${Y.toFixed(0)})...`),Ue(b);for(let g=0;g<8;g++){const M={bubbles:!0,cancelable:!0,clientX:L+g%2,clientY:Y};b.dispatchEvent(new PointerEvent("pointermove",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousemove",M)),await p(500)}t("Clicking video card...");for(let g=0;g<2;g++){const M=document.elementFromPoint(L,Y);M?await K(M):await K(b),await p(300)}return t("✅ Video card clicks done"),H},O=async(w,k=6e5)=>{t(`Waiting for scene ${w} video generation...`),await p(5e3);const D=Date.now();let u=-1,E=0;for(;Date.now()-D<k;){const $=y();if($!==null){if($!==u&&(t(`Scene ${w} progress: ${$}%`),u=$),E=Date.now(),$>=100)return t(`✅ Scene ${w} — 100%!`),!0}else if(u>30){const S=Math.floor((Date.now()-E)/1e3);if(S>=5)return t(`✅ Scene ${w} — % disappeared at ${u}% (${S}s) — done!`),!0;t(`⏳ Scene ${w} % lost at ${u}% — confirming in ${5-S}s...`)}else{const S=Math.floor((Date.now()-D)/1e3);S%15<3&&t(`⏳ Scene ${w} waiting... (${S}s)`)}await p(3e3)}return!1},B=async()=>{let w=null;const k=document.querySelectorAll("button");for(const b of k){const C=(b.textContent||"").trim();if(C.includes("ดาวน์โหลด")||C.toLowerCase().includes("download")){w=b,t(`Found ดาวน์โหลด button via text: "${C}"`);break}}if(!w)for(const b of k){const C=b.getBoundingClientRect();if(C.top<80&&C.right>window.innerWidth-300){const g=(b.textContent||"").trim().toLowerCase(),M=(b.getAttribute("aria-label")||"").toLowerCase();if(g.includes("ดาวน์")||g.includes("download")||M.includes("ดาวน์")||M.includes("download")){w=b,t("Found ดาวน์โหลด button via position+text");break}}}if(!w){const b=document.querySelectorAll('[data-type="button-overlay"]');for(const C of b){const g=C.closest("button")||C.parentElement;if(g){const M=(g.textContent||"").trim();if(M.includes("ดาวน์โหลด")||M.toLowerCase().includes("download")){w=g,t("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!w){I("Could not find ดาวน์โหลด button in detail view"),i.push("⚠️ Download btn");return}const D=w.getBoundingClientRect(),u={bubbles:!0,cancelable:!0,clientX:D.left+D.width/2,clientY:D.top+D.height/2,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",u)),await p(80),w.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",u)),w.dispatchEvent(new MouseEvent("click",u)),await p(50),w.click(),t("Clicked ดาวน์โหลด button"),i.push("✅ ดาวน์โหลด"),m("download","done"),m("upscale","active"),await p(1500);const E=async b=>{const C=b.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:C.left+C.width/2,clientY:C.top+C.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",g)),await p(80),b.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",g)),b.dispatchEvent(new MouseEvent("click",g)),await p(50),b.click()},$=async b=>{const C=b.getBoundingClientRect(),g={bubbles:!0,cancelable:!0,clientX:C.left+C.width/2,clientY:C.top+C.height/2};b.dispatchEvent(new PointerEvent("pointerenter",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseenter",g)),b.dispatchEvent(new PointerEvent("pointermove",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseover",g)),b.dispatchEvent(new MouseEvent("mousemove",g))},S=b=>{const C=document.querySelectorAll('[role="menuitem"]');for(const g of C)if((g.textContent||"").trim().includes(b)){const z=g.getBoundingClientRect();if(z.width>0&&z.height>0)return g}return null},_=S("Full Video");if(_){t("Multi-scene menu detected — hovering Full Video..."),await $(_),await p(500),await E(_),t("Clicked Full Video"),i.push("✅ Full Video"),await p(1500);let b=null;const C=Date.now();for(;Date.now()-C<5e3&&(b=S("720p"),!b);)t("Waiting for 720p submenu..."),await p(500);if(!b){I("Could not find 720p option in submenu"),i.push("⚠️ 720p");return}await E(b),t("Clicked 720p — download starting"),i.push("✅ 720p"),m("upscale","active")}else{let b=S("1080p");if(!b){const C=document.querySelectorAll("button, div[role='button'], span");for(const g of C)if((g.textContent||"").trim().includes("1080p")&&g.offsetParent!==null){b=g.closest("button")||g;break}}if(!b){I("Could not find 1080p option"),i.push("⚠️ 1080p");return}await E(b),t("Clicked 1080p — download starting"),i.push("✅ 1080p"),m("upscale","active")}t("Waiting for download to complete...");const H=Date.now();let N=!1;for(;Date.now()-H<3e5;){const b=(document.body.innerText||"")+" "+(document.body.textContent||"");if(b.includes("Download complete")){t("✅ Download complete!"),i.push("✅ Downloaded"),m("upscale","done",100),N=!0;break}if(b.includes("Upscaling complete")||b.includes("upscaling complete")){t("✅ Upscaling complete!"),i.push("✅ Upscaled"),m("upscale","done",100),N=!0;break}const C=document.querySelectorAll("div, span, p");for(const M of C){const z=(M.textContent||"").trim();if(z==="Upscaling complete!"||z==="Upscaling complete"||z==="Download complete!"||z==="Download complete"){t(`✅ ${z} (element-level detection)`),i.push("✅ "+(z.includes("Upscal")?"Upscaled":"Downloaded")),m("upscale","done",100),N=!0;break}}if(N)break;const g=Math.floor((Date.now()-H)/1e3);b.includes("Downloading your extended video")?t(`⏳ Downloading extended video... (${g}s)`):b.includes("Upscaling your video")?t(`⏳ Upscaling in progress... (${g}s)`):t(`⏳ Waiting... (${g}s)`),await p(3e3)}if(!N){I("Download timeout — file may still be downloading"),i.push("⚠️ Download timeout"),m("upscale","error");return}m("open","active"),t("Waiting for download file to be ready..."),await p(5e3);let L=!1;const Y=Date.now();for(;Date.now()-Y<6e4&&!L;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},C=>{chrome.runtime.lastError?I(`Download poll error: ${chrome.runtime.lastError.message}`):C!=null&&C.success?(t(`✅ Opened video: ${C.message}`),i.push("✅ Opened"),m("open","done"),L=!0):t(`Download not ready: ${C==null?void 0:C.message}`),b()})})}catch(b){I(`Poll exception: ${b.message}`)}L||await p(3e3)}L||(I("Could not find/open downloaded video"),i.push("⚠️ Open"))};try{if(!await G())I("Timeout waiting for video generation"),i.push("⚠️ Video Wait"),m("vid-wait","error");else if(i.push("✅ Video Complete"),m("vid-wait","done",100),m("download","active"),f<=1){t("Single scene — waiting 3s for detail view to load..."),i.push("✅ Clicked"),await p(3e3);let k=null;const D=document.querySelectorAll("button");for(const u of D){const E=(u.textContent||"").trim();if(E.includes("ดาวน์โหลด")||E.toLowerCase().includes("download")){k=u,t(`Found ดาวน์โหลด button via text: "${E}"`);break}}if(!k)for(const u of D){const E=u.getBoundingClientRect();if(E.top<80&&E.right>window.innerWidth-300){const $=(u.textContent||"").trim().toLowerCase(),S=(u.getAttribute("aria-label")||"").toLowerCase();if($.includes("ดาวน์")||$.includes("download")||S.includes("ดาวน์")||S.includes("download")){k=u,t("Found ดาวน์โหลด button via position+text");break}}}if(!k){const u=document.querySelectorAll('[data-type="button-overlay"]');for(const E of u){const $=E.closest("button")||E.parentElement;if($){const S=($.textContent||"").trim();if(S.includes("ดาวน์โหลด")||S.toLowerCase().includes("download")){k=$,t("Found ดาวน์โหลด via button-overlay parent");break}}}}if(!k)I("Could not find ดาวน์โหลด button in detail view"),i.push("⚠️ Download btn");else{const u=k.getBoundingClientRect(),E=u.left+u.width/2,$=u.top+u.height/2,S={bubbles:!0,cancelable:!0,clientX:E,clientY:$,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",S)),await p(80),k.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",S)),k.dispatchEvent(new MouseEvent("click",S)),await p(50),k.click(),t("Clicked ดาวน์โหลด button"),i.push("✅ ดาวน์โหลด"),m("download","done"),m("upscale","active"),await p(1500);let _=null;const H=document.querySelectorAll('button[role="menuitem"], [role="menuitem"], [role="option"], li');for(const N of H)if((N.textContent||"").trim().includes("1080p")){_=N;break}if(!_){const N=document.querySelectorAll("button, div[role='button'], span");for(const L of N)if((L.textContent||"").trim().includes("1080p")&&L.offsetParent!==null){_=L.closest("button")||L;break}}if(!_)I("Could not find 1080p option in dropdown"),i.push("⚠️ 1080p");else{const N=_.getBoundingClientRect(),L=N.left+N.width/2,Y=N.top+N.height/2,b={bubbles:!0,cancelable:!0,clientX:L,clientY:Y,button:0};_.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mousedown",b)),await p(80),_.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mouseup",b)),_.dispatchEvent(new MouseEvent("click",b)),await p(50),_.click(),t("Clicked 1080p — download starting"),i.push("✅ 1080p"),t("Waiting for upscaling + download...");const C=Date.now();let g=!1;for(;Date.now()-C<3e5;){const M=(document.body.innerText||"")+" "+(document.body.textContent||"");if(M.includes("Upscaling complete")||M.includes("upscaling complete")){t("✅ Upscaling complete!"),i.push("✅ Upscaled"),m("upscale","done",100),g=!0;break}const z=document.querySelectorAll("div, span, p");for(const j of z){const de=(j.textContent||"").trim();if(de==="Upscaling complete!"||de==="Upscaling complete"){t("✅ Upscaling complete! (element-level)"),i.push("✅ Upscaled"),m("upscale","done",100),g=!0;break}}if(g)break;const X=Math.floor((Date.now()-C)/1e3);M.includes("Upscaling your video")?t(`⏳ Upscaling in progress... (${X}s)`):t(`⏳ Waiting for upscale... (${X}s)`),await p(3e3)}if(g){m("open","active"),t("Waiting for download file to be ready..."),await p(5e3);let M=!1;const z=Date.now();for(;Date.now()-z<6e4&&!M;){try{await new Promise(X=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},j=>{chrome.runtime.lastError?I(`Download poll error: ${chrome.runtime.lastError.message}`):j!=null&&j.success?(t(`✅ Opened video: ${j.message}`),i.push("✅ Opened"),m("open","done"),M=!0):t(`Download not ready: ${j==null?void 0:j.message}`),X()})})}catch(X){I(`Poll exception: ${X.message}`)}M||await p(3e3)}M||(I("Could not find/open downloaded video"),i.push("⚠️ Open"))}else I("Upscaling timeout — download may still complete"),i.push("⚠️ Upscale timeout")}}}else{t(`Multi-scene mode: ${f} scenes`);for(let k=1;k<f;k++){const D=q[k];if(!D){t(`No prompt for scene ${k+1} — skipping`);continue}const u=k+1;t(`--- Scene ${u}/${f} ---`),await p(2e3),m(`scene${u}-prompt`,"active");const E=we();if(E)await ve(E,D),t(`Pasted scene ${u} prompt (${D.length} chars)`),i.push(`✅ Scene${u} Prompt`),m(`scene${u}-prompt`,"done");else{I(`Could not find prompt input for scene ${u}`),i.push(`❌ Scene${u}`),a.push(`scene ${u} prompt input not found`),m(`scene${u}-prompt`,"error");break}await p(1e3),m(`scene${u}-gen`,"active");const $=he();if($){const _=$.getBoundingClientRect(),H=_.left+_.width/2,N=_.top+_.height/2,L={bubbles:!0,cancelable:!0,clientX:H,clientY:N,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",L)),await p(80),$.dispatchEvent(new PointerEvent("pointerup",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",L)),$.dispatchEvent(new MouseEvent("click",L)),t(`Clicked Generate for scene ${u} (full event sequence)`),i.push(`✅ Scene${u} Gen`),m(`scene${u}-gen`,"done"),await p(500),$.dispatchEvent(new PointerEvent("pointerdown",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",L)),await p(80),$.dispatchEvent(new PointerEvent("pointerup",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",L)),$.dispatchEvent(new MouseEvent("click",L))}else{I(`Could not find Generate button for scene ${u}`),i.push(`❌ Scene${u} Gen`),a.push(`scene ${u} generate button not found`),m(`scene${u}-gen`,"error");break}m(`scene${u}-wait`,"active"),await O(u)?(i.push(`✅ Scene${u}`),m(`scene${u}-wait`,"done",100)):(I(`Timeout on scene ${u}`),i.push(`⚠️ Scene${u}`),m(`scene${u}-wait`,"error"))}t("All scenes generated!"),i.push("✅ All Scenes"),await p(3e3),await B()}}catch(w){I(`Step 6 error: ${w.message}`),i.push("⚠️ Step6"),a.push(`step 6: ${w.message}`)}}const P=a.length===0;try{Ge(P?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:P,message:P?`สำเร็จ! ${i.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${i.join(" → ")} | ${a.join(", ")}`,step:P?"done":"partial"}}chrome.runtime.onMessage.addListener((e,o,s)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,t("Received GENERATE_IMAGE request"),s({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Ke(e).then(n=>t(`✅ Automation finished: ${n.message}`)).catch(n=>console.error("[Netflow AI] Generate error:",n)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return t("⛔ STOP_AUTOMATION received — setting stop flag"),window.__NETFLOW_STOP__=!0,s({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return s({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return s({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{t("CLICK_FIRST_IMAGE — finding first image card via <i>image</i> icon..."),await p(500);const n=Ve();if(!n){I("No image card found via <i>image</i> icon");return}const r=n.getBoundingClientRect(),l=r.left+r.width/2,d=r.top+r.height/2;t(`Image card at (${l.toFixed(0)}, ${d.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} — clicking 2 times`);for(let c=0;c<2;c++){const i=document.elementFromPoint(l,d);i?(await K(i),t(`Click ${c+1}/2 on <${i.tagName.toLowerCase()}>`)):(await K(n),t(`Click ${c+1}/2 on card (fallback)`)),await p(300)}t("✅ 2 clicks on image card done")})(),!1}),t("Google Flow content script ready — waiting for commands"),document.addEventListener("dblclick",e=>{const o=e.target;if(!o)return;const s=o.tagName.toLowerCase(),n=Math.round(e.clientX),r=Math.round(e.clientY),l=(o.textContent||"").trim().slice(0,30);t(`🖱️🖱️ DblClick (${n},${r}) → <${s}> "${l}"`)},!0)})();
