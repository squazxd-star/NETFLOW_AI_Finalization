(function(){"use strict";const se={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let W=se.green,me=null;function Me(t){t&&se[t]&&(me=t,W=se[t],Ge(),requestAnimationFrame(()=>je()))}function nt(){if(me&&se[me])return se[me];try{const t=localStorage.getItem("netflow_app_theme");if(t&&se[t])return se[t]}catch{}return se.green}let ne=0,oe=255,ie=65;function Ge(){const t=W.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}let X=null,j=null,le=null,Oe=0,Ee=null,he=null,ke=null,Ie=0,fe=!1,ae=null,be=null,we=null,Ce=1,Y=[];function Se(t){const e=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let c=2;c<=t;c++)e.push({stepId:`scene${c}-prompt`,label:`Scene ${c} Prompt`,status:"waiting"},{stepId:`scene${c}-gen`,label:`Scene ${c} Generate`,status:"waiting"},{stepId:`scene${c}-wait`,label:`Scene ${c} รอ %`,status:"waiting",progress:0});e.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return e}const ce=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];Y=Se(1);function ot(t){const e=t.rgb,c=t.accentRgb,a=t.doneRgb,i=t.hex,d=t.accentHex,s=t.doneHex,r=(()=>{const g=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const v=C=>Math.min(255,C+80);return`#${[1,2,3].map(C=>v(parseInt(g[C],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const g=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const v=C=>Math.min(255,C+60);return`#${[1,2,3].map(C=>v(parseInt(g[C],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),y=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,I=p?parseInt(p[1],16)/y:0,O=p?parseInt(p[2],16)/y:1,b=p?parseInt(p[3],16)/y:.25,o=g=>`${Math.round(I*g)}, ${Math.round(O*g)}, ${Math.round(b*g)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.05) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${c},0.04) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(${o(18)},0.94) 0%, rgba(${o(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    opacity: 0.55;
}

/* ─── Hex Grid Overlay ─── */
#nf-hex-grid-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.08;
    mix-blend-mode: screen;
}

/* ─── Vignette Overlay (enhanced with theme tint at edges) ─── */
#netflow-engine-overlay .nf-vignette {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%),
        radial-gradient(ellipse at 0% 0%, rgba(${e},0.04) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 100%, rgba(${c},0.03) 0%, transparent 40%);
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
        rgba(${e},0.015) 2px,
        rgba(${e},0.015) 4px
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
    border: 1.5px solid rgba(${e},0.08);
    box-shadow: 0 0 30px rgba(${e},0.03), inset 0 0 30px rgba(${e},0.02);
    pointer-events: none;
    z-index: 1;
    animation: nf-pulse-expand 5s ease-out infinite;
}
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${c},0.06); box-shadow: 0 0 25px rgba(${c},0.03); }
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
        radial-gradient(circle, rgba(${e},0.055) 1px, transparent 1px),
        radial-gradient(circle, rgba(${e},0.035) 1px, transparent 1px);
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
        linear-gradient(rgba(${e},0.028) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${e},0.028) 1px, transparent 1px);
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
    inset: -250px;
    background: repeating-linear-gradient(
        35deg,
        transparent,
        transparent 70px,
        rgba(${c},0.018) 70px,
        rgba(${c},0.018) 71px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-diag-r 28s linear infinite;
}

/* ─── Diagonal Traces B (-35° scrolling left) ─── */
.nf-pat-diag-b {
    position: absolute;
    inset: -250px;
    background: repeating-linear-gradient(
        -35deg,
        transparent,
        transparent 90px,
        rgba(${e},0.014) 90px,
        rgba(${e},0.014) 91px
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
    inset: -200px;
    background: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 110px,
        rgba(${e},0.022) 110px,
        rgba(${e},0.022) 111px,
        transparent 111px,
        transparent 113px,
        rgba(${c},0.015) 113px,
        rgba(${c},0.015) 114px
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
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
    mix-blend-mode: overlay;
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
    background: radial-gradient(circle, rgba(${e},0.07) 0%, transparent 70%);
    top: -8%; left: -6%;
    animation: nf-orb-1 22s ease-in-out infinite alternate;
}
.nf-orb-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(${c},0.055) 0%, transparent 70%);
    bottom: -6%; right: -4%;
    animation: nf-orb-2 28s ease-in-out infinite alternate;
}
.nf-orb-3 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(${e},0.045) 0%, transparent 70%);
    top: 35%; left: 55%;
    animation: nf-orb-3 32s ease-in-out infinite alternate;
}
.nf-orb-4 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(${c},0.04) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.06) 0%, rgba(${c},0.02) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    animation: nf-center-pulse 6s ease-in-out infinite;
}

@keyframes nf-center-pulse {
    0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
    50%      { opacity: 0.8; transform: translate(-50%, -50%) scale(1.15); }
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
    background: rgba(${o(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${o(180)},0.05),
        inset 0 1px 0 rgba(${e},0.1),
        inset 0 0 40px rgba(${e},0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 60px rgba(${e},0.15),
            0 0 120px rgba(${e},0.08),
            0 0 200px rgba(${o(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${o(180)},0.08),
            inset 0 1px 0 rgba(${e},0.15),
            inset 0 0 50px rgba(${e},0.05);
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
    filter: drop-shadow(0 0 18px rgba(${c},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${c},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${c},0.4)); }
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
    border-bottom: 1px solid rgba(${e},0.2);
    background: linear-gradient(180deg, rgba(${e},0.06) 0%, transparent 100%);
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
    color: ${r};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${e},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${i};
    box-shadow: 0 0 8px rgba(${e}, 0.7);
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
    background: rgba(${e},0.1);
    border: 1px solid rgba(${e},0.3);
    font-family: 'Rajdhani', 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 8px rgba(${e},0.4);
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
    scrollbar-color: rgba(${e},0.3) transparent;
}

.nf-terminal::-webkit-scrollbar { width: 4px; }
.nf-terminal::-webkit-scrollbar-track { background: transparent; }
.nf-terminal::-webkit-scrollbar-thumb { background: rgba(${e},0.3); border-radius: 2px; }

.nf-term-line {
    display: flex;
    align-items: center;
    gap: 6px;
    transition: color 0.3s, opacity 0.3s;
}

.nf-term-line.nf-term-active { color: #fff; }
.nf-term-line.nf-term-done { color: rgba(${a}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${e},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${i}; text-shadow: 0 0 6px rgba(${e},0.4); }

.nf-term-status {
    margin-left: auto;
    font-size: 17px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.nf-term-active .nf-term-status {
    background: rgba(${e},0.12);
    color: ${r};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${a}, 0.12);
    color: ${l};
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
    border-top: 1px solid rgba(${e},0.2);
    background: linear-gradient(180deg, rgba(${o(5)},0.95) 0%, rgba(${o(12)},0.98) 100%);
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
        rgba(${e},0.015) 2px,
        rgba(${e},0.015) 4px
    );
    pointer-events: none;
    z-index: 4;
}

/* HUD Frame */
.nf-engine-frame {
    position: absolute;
    inset: 8px 14px;
    border: 1px solid rgba(${e},0.25);
    border-radius: 3px;
    box-shadow:
        0 0 20px rgba(${e},0.08),
        0 0 40px rgba(${e},0.04),
        inset 0 0 20px rgba(${e},0.02);
    animation: nf-frame-pulse 4s ease-in-out infinite;
}

@keyframes nf-frame-pulse {
    0%, 100% {
        border-color: rgba(${e},0.25);
        box-shadow: 0 0 20px rgba(${e},0.08), inset 0 0 20px rgba(${e},0.02);
    }
    50% {
        border-color: rgba(${e},0.45);
        box-shadow: 0 0 30px rgba(${e},0.15), inset 0 0 30px rgba(${e},0.04);
    }
}

/* Frame corner accents */
.nf-frame-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-style: solid;
    border-color: rgba(${c},0.6);
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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${c},0.08) 40%, transparent 70%);
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
        drop-shadow(0 0 4px rgba(${e},1))
        drop-shadow(0 0 12px rgba(${e},0.7))
        drop-shadow(0 0 28px rgba(${e},0.35));
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
    background: linear-gradient(135deg, rgba(${e},1) 0%, rgba(255,255,255,0.95) 45%, rgba(${e},0.9) 70%, rgba(255,255,255,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-text-stroke: 0.5px rgba(255,255,255,0.35);
    filter:
        drop-shadow(0 0 4px rgba(255,255,255,0.9))
        drop-shadow(0 0 12px rgba(${e},0.8))
        drop-shadow(0 0 30px rgba(${e},0.45))
        drop-shadow(0 0 60px rgba(${e},0.2));
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
    border: 1px solid rgba(${e},0.25);
    border-top: 1px solid rgba(${c},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${o(6)},0.75) 0%, rgba(${o(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${c},0.08);
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
    background: linear-gradient(180deg, transparent, rgba(${e},0.4), transparent);
}

.nf-stat-label {
    color: rgba(${e},0.75);
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 1.8px;
    text-shadow: 0 0 4px rgba(${e},0.3);
    white-space: nowrap;
}
.nf-stat-val {
    color: rgba(${c},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${c},0.7),
        0 0 12px rgba(${c},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${o(8)}, 0.88);
    border: 1px solid rgba(${e},0.2);
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
    border-color: rgba(${e},0.5);
    box-shadow:
        0 0 30px rgba(${e},0.12),
        0 0 60px rgba(${e},0.06),
        inset 0 0 20px rgba(${e},0.03);
}

.nf-module.nf-done {
    border-color: rgba(${a}, 0.4);
    box-shadow: 0 0 20px rgba(${a}, 0.1);
}

.nf-module::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(${e},0.5), transparent);
    animation: nf-scanline 3s ease-in-out infinite;
}

.nf-module.nf-done::before {
    background: linear-gradient(90deg, transparent, rgba(${a}, 0.5), transparent);
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
    color: ${i};
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${e},0.5), 0 0 16px rgba(${e},0.2);
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
        0 0 10px rgba(${e},0.8),
        0 0 20px rgba(${e},0.5),
        0 0 35px rgba(${e},0.3);
}
.nf-step.nf-step-done {
    color: rgba(${a}, 0.85);
    text-shadow:
        0 0 4px rgba(${a},0.5),
        0 0 12px rgba(${a},0.3);
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
    background: ${i};
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${s};
    box-shadow: 0 0 5px rgba(${a}, 0.5);
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
    background: linear-gradient(90deg, ${i}, ${r});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${s}, ${l});
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
    background: linear-gradient(90deg, ${i}, ${d});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${s}, ${l});
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
    color: rgba(${e}, 0.35);
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(${e},0.2), 0 0 40px rgba(${e},0.1);
}

.nf-brand-logo {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    border: 2px solid rgba(${e},0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(${o(8)},0.8);
    box-shadow: 0 0 20px rgba(${e},0.15);
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
    background: rgba(${e}, 0.04);
    border: 1px solid rgba(${e}, 0.15);
    border-radius: 8px;
    color: rgba(${e}, 0.5);
    font-size: 19px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
}

.nf-close-btn:hover {
    background: rgba(${e}, 0.15);
    border-color: rgba(${e}, 0.4);
    color: #fff;
    text-shadow: 0 0 8px rgba(${e},0.5);
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
    stroke: rgba(${e},0.2);
    stroke-width: 4px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.nf-pipe-glow {
    fill: none;
    stroke: rgba(${e},0.3);
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
    fill: rgba(${e},0.9);
    filter: drop-shadow(0 0 6px rgba(${e},0.9));
}

/* ─── Particles ─── */
.nf-particle {
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(${e},0.5);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
    box-shadow: 0 0 4px rgba(${e},0.3);
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
    border: 2px solid rgba(${e},0.5);
    background: rgba(${o(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${i};
    font-size: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(${e},0.3), 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    animation: nf-toggle-pulse 2.5s ease-in-out infinite;
    font-family: 'Inter', system-ui, sans-serif;
}

#nf-toggle-btn:hover {
    transform: scale(1.1);
    border-color: rgba(${e},0.8);
    box-shadow: 0 0 30px rgba(${e},0.5), 0 4px 16px rgba(0,0,0,0.6);
    background: rgba(${e},0.15);
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
    0%, 100% { box-shadow: 0 0 20px rgba(${e},0.3), 0 4px 12px rgba(0,0,0,0.5); }
    50% { box-shadow: 0 0 30px rgba(${e},0.5), 0 4px 16px rgba(0,0,0,0.5); }
}

/* ─── Corner decorative brackets ─── */
.nf-corner-deco {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: rgba(${e},0.15);
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
    color: rgba(${e},0.35);
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
    color: ${i};
    text-shadow: 0 0 6px rgba(${e},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${i};
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${e},0.12);
    color: ${r};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${a},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${a},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${s};
    box-shadow: 0 0 5px rgba(${a},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${a},0.1);
    color: ${l};
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

    `}function Ne(){le||(le=document.createElement("style"),le.id="netflow-overlay-styles",le.textContent=ot(W),document.head.appendChild(le))}function ze(t){t.innerHTML="",Y.forEach((e,c)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${c+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function it(){const t=document.getElementById("nf-terminal");if(!t)return;ze(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function He(t,e){let r="";for(let u=0;u<32;u++){const w=u/32*Math.PI*2,M=(u+.2)/32*Math.PI*2,A=(u+.5)/32*Math.PI*2,k=(u+.8)/32*Math.PI*2,m=(u+1)/32*Math.PI*2;r+=`${u===0?"M":"L"}${(120+104*Math.cos(w)).toFixed(1)},${(120+104*Math.sin(w)).toFixed(1)} `,r+=`L${(120+104*Math.cos(M)).toFixed(1)},${(120+104*Math.sin(M)).toFixed(1)} `,r+=`L${(120+116*Math.cos(A)).toFixed(1)},${(120+116*Math.sin(A)).toFixed(1)} `,r+=`L${(120+104*Math.cos(k)).toFixed(1)},${(120+104*Math.sin(k)).toFixed(1)} `,r+=`L${(120+104*Math.cos(m)).toFixed(1)},${(120+104*Math.sin(m)).toFixed(1)} `}r+="Z";const l=24,p=100,y=90;let I="";for(let u=0;u<l;u++){const w=u/l*Math.PI*2,M=(u+.25)/l*Math.PI*2,A=(u+.75)/l*Math.PI*2,k=(u+1)/l*Math.PI*2;I+=`${u===0?"M":"L"}${(120+y*Math.cos(w)).toFixed(1)},${(120+y*Math.sin(w)).toFixed(1)} `,I+=`L${(120+p*Math.cos(M)).toFixed(1)},${(120+p*Math.sin(M)).toFixed(1)} `,I+=`L${(120+p*Math.cos(A)).toFixed(1)},${(120+p*Math.sin(A)).toFixed(1)} `,I+=`L${(120+y*Math.cos(k)).toFixed(1)},${(120+y*Math.sin(k)).toFixed(1)} `}I+="Z";let O="";for(let u=0;u<64;u++){const w=u/64*Math.PI*2,M=u%4===0?117:119,A=u%4===0?124:122,k=u%4===0?.8:.4,m=u%4===0?.7:.35;O+=`<line x1="${(120+M*Math.cos(w)).toFixed(1)}" y1="${(120+M*Math.sin(w)).toFixed(1)}" x2="${(120+A*Math.cos(w)).toFixed(1)}" y2="${(120+A*Math.sin(w)).toFixed(1)}" stroke="rgba(${t},${m})" stroke-width="${k}"/>`}const b=26,o=78,g=68;let v="";for(let u=0;u<b;u++){const w=u/b*Math.PI*2,M=(u+.2)/b*Math.PI*2,A=(u+.5)/b*Math.PI*2,k=(u+.8)/b*Math.PI*2,m=(u+1)/b*Math.PI*2;v+=`${u===0?"M":"L"}${(120+g*Math.cos(w)).toFixed(1)},${(120+g*Math.sin(w)).toFixed(1)} `,v+=`L${(120+g*Math.cos(M)).toFixed(1)},${(120+g*Math.sin(M)).toFixed(1)} `,v+=`L${(120+o*Math.cos(A)).toFixed(1)},${(120+o*Math.sin(A)).toFixed(1)} `,v+=`L${(120+g*Math.cos(k)).toFixed(1)},${(120+g*Math.sin(k)).toFixed(1)} `,v+=`L${(120+g*Math.cos(m)).toFixed(1)},${(120+g*Math.sin(m)).toFixed(1)} `}v+="Z";let C="";for(let u=0;u<48;u++){const w=u/48*Math.PI*2,M=u%4===0?79:80,A=u%4===0?85:83,k=u%4===0?.6:.3,m=u%4===0?.6:.3;C+=`<line x1="${(120+M*Math.cos(w)).toFixed(1)}" y1="${(120+M*Math.sin(w)).toFixed(1)}" x2="${(120+A*Math.cos(w)).toFixed(1)}" y2="${(120+A*Math.sin(w)).toFixed(1)}" stroke="rgba(${e},${m})" stroke-width="${k}"/>`}function x(u,w,M,A,k){let m="";for(let E=0;E<M;E++){const _=E/M*Math.PI*2,S=(E+.25)/M*Math.PI*2,R=(E+.75)/M*Math.PI*2,G=(E+1)/M*Math.PI*2;m+=`${E===0?"M":"L"}${(u+k*Math.cos(_)).toFixed(1)},${(w+k*Math.sin(_)).toFixed(1)} `,m+=`L${(u+A*Math.cos(S)).toFixed(1)},${(w+A*Math.sin(S)).toFixed(1)} `,m+=`L${(u+A*Math.cos(R)).toFixed(1)},${(w+A*Math.sin(R)).toFixed(1)} `,m+=`L${(u+k*Math.cos(G)).toFixed(1)},${(w+k*Math.sin(G)).toFixed(1)} `}return m+"Z"}const P=42,L=[],$=x(120,120,14,18,13);L.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${$}" fill="none" stroke="rgba(${t},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${e},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${t},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let u=0;u<8;u++){const w=u/8*Math.PI*2,M=120+P*Math.cos(w),A=120+P*Math.sin(w),m=x(M,A,10,14,10),E=u%2===0?"":"animation-direction:reverse;";L.push(`<g class="nf-kinetic-sub" style="transform-origin:${M.toFixed(1)}px ${A.toFixed(1)}px;${E}">
            <path d="${m}" fill="none" stroke="rgba(${e},0.6)" stroke-width="0.9"/>
            <circle cx="${M.toFixed(1)}" cy="${A.toFixed(1)}" r="7" fill="none" stroke="rgba(${t},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${M.toFixed(1)}" cy="${A.toFixed(1)}" r="2.5" fill="rgba(${t},0.6)"/>
        </g>`)}const f=L.join(`
`);let F="";for(let u=0;u<8;u++){const w=u/8*Math.PI*2,M=120+10*Math.cos(w),A=120+10*Math.sin(w),k=120+(P-10)*Math.cos(w),m=120+(P-10)*Math.sin(w);F+=`<line x1="${M.toFixed(1)}" y1="${A.toFixed(1)}" x2="${k.toFixed(1)}" y2="${m.toFixed(1)}" stroke="rgba(${e},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.95)"/>
                <stop offset="50%" stop-color="rgba(${e},0.75)"/>
                <stop offset="100%" stop-color="rgba(${t},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${e},0.8)"/>
                <stop offset="100%" stop-color="rgba(${t},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.85)"/>
                <stop offset="50%" stop-color="rgba(${e},0.65)"/>
                <stop offset="100%" stop-color="rgba(${t},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${t},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${t},0.2)" stroke-width="0.2"/>
        </g>
        ${O}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${r}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${I}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${y}" fill="none" stroke="rgba(${e},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${v}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${C}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${e},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${F}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${f}
        </g>
    </svg>`}function at(){const t=document.createElement("div");t.id="netflow-engine-overlay",ae=document.createElement("canvas"),ae.id="nf-matrix-canvas",t.appendChild(ae);const e=document.createElement("div");e.className="nf-pat-data",t.appendChild(e);const c=document.createElement("div");c.className="nf-center-glow",t.appendChild(c);const a=document.createElement("div");a.className="nf-pat-noise",t.appendChild(a);const i=document.createElement("div");i.className="nf-vignette",t.appendChild(i);for(let C=0;C<3;C++){const x=document.createElement("div");x.className="nf-pulse-ring",t.appendChild(x)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(C=>{const x=document.createElement("div");x.className=`nf-corner-deco ${C}`,t.appendChild(x)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Ae(),t.appendChild(d);const s=document.createElement("div");s.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const l=document.createElement("div");l.className="nf-core-header",l.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,r.appendChild(l);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",ze(p),r.appendChild(p);const y=document.createElement("div");y.className="nf-engine-core",y.id="nf-engine-core";const I=document.createElement("div");I.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(C=>{const x=document.createElement("div");x.className=`nf-frame-corner ${C}`,I.appendChild(x)}),y.appendChild(I);const O="http://www.w3.org/2000/svg",b=document.createElementNS(O,"svg");b.setAttribute("class","nf-engine-waves"),b.setAttribute("viewBox","0 0 560 140"),b.setAttribute("preserveAspectRatio","none"),b.id="nf-engine-waves";for(let C=0;C<6;C++){const x=document.createElementNS(O,"path");x.setAttribute("fill","none"),x.setAttribute("stroke-width",C<3?"1.5":"1"),x.setAttribute("stroke",C<3?`rgba(${W.rgb},${.12+C*.08})`:`rgba(${W.accentRgb},${.08+(C-3)*.06})`),x.setAttribute("data-wave-idx",String(C)),b.appendChild(x)}y.appendChild(b);const o=document.createElement("div");o.className="nf-engine-brand-inner",o.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${He(W.rgb,W.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${He(W.rgb,W.accentRgb)}
        </div>
    `,y.appendChild(o);const g=document.createElement("div");g.className="nf-engine-stats",g.id="nf-engine-stats",g.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([C,x,P])=>`<div class="nf-stat-item"><span class="nf-stat-label">${C}</span><span class="nf-stat-val" id="${x}">${P}</span></div>`).join(""),y.appendChild(g),r.appendChild(y),s.appendChild(r);const v=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ce.forEach((C,x)=>{const P=rt(C);P.classList.add(v[x]),P.id=`nf-mod-${C.id}`,s.appendChild(P)}),t.appendChild(s);for(let C=0;C<30;C++){const x=document.createElement("div");x.className="nf-particle",x.style.left=`${5+Math.random()*90}%`,x.style.bottom=`${Math.random()*40}%`,x.style.animationDuration=`${3+Math.random()*5}s`,x.style.animationDelay=`${Math.random()*4}s`;const P=.3+Math.random()*.4,L=.7+Math.random()*.3;x.style.background=`rgba(${Math.floor(ne*L)}, ${Math.floor(oe*L)}, ${Math.floor(ie*L)}, ${P})`,x.style.width=`${1+Math.random()*2}px`,x.style.height=x.style.width,t.appendChild(x)}return t}function rt(t){const e=document.createElement("div");e.className="nf-module";const c=document.createElement("div");c.className="nf-mod-header",c.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(c),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,e.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function st(){Oe=Date.now(),Ee=setInterval(()=>{const t=Math.floor((Date.now()-Oe)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),c=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${c}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${c}`)},1e3)}function Ve(){Ee&&(clearInterval(Ee),Ee=null)}const lt=220,Pe=210,qe=.4;let xe=[];function ct(t,e){xe=[];for(let c=0;c<lt;c++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const d=Math.random()*t,s=Math.random()*e,r=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);xe.push({x:i===0?Math.random()*t:d+Math.cos(l)*r,y:i===0?Math.random()*e:s+Math.sin(l)*r,vx:(Math.random()-.5)*qe,vy:(Math.random()-.5)*qe,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:s,oRadius:r,oAngle:l,oSpeed:p})}}function dt(){if(!ae)return;const t=ae;if(be=t.getContext("2d"),!be)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,xe.length===0&&ct(t.width,t.height)};e(),window.addEventListener("resize",e);let c=null,a=0,i=0;function d(){if(!be||!ae){we=null;return}we=requestAnimationFrame(d);const s=be,r=ae.width,l=ae.height;s.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,s.fillRect(0,0,r,l),(!c||a!==r||i!==l)&&(a=r,i=l,c=s.createRadialGradient(r*.5,l*.5,0,r*.5,l*.5,Math.max(r,l)*.6),c.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),c.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=c,s.fillRect(0,0,r,l);const p=xe,y=p.length,I=Pe*Pe;for(let b=0;b<y;b++){const o=p[b];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>r&&(o.x=r,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>l&&(o.y=l,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const g=o.oAngle,v=o.oRadius*.7;o.x=o.oCx+v*Math.cos(g),o.y=o.oCy+v*Math.sin(g)*Math.cos(g),o.oCx+=Math.sin(g*.15)*.12,o.oCy+=Math.cos(g*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const g=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*g,o.y=o.oCy+Math.sin(o.oAngle)*g,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=r+30:o.x>r+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const g=o.oRadius+50;o.oCx<-g?o.oCx=r+g:o.oCx>r+g&&(o.oCx=-g),o.oCy<-g?o.oCy=l+g:o.oCy>l+g&&(o.oCy=-g)}}const O=5;for(let b=0;b<O;b++){const o=b/O,g=(b+1)/O,v=((o+g)*.5*.35).toFixed(3);s.beginPath(),s.strokeStyle=`rgba(${ne},${oe},${ie},${v})`,s.lineWidth=(o+g)*.5*1.2;for(let C=0;C<y;C++){const x=p[C];for(let P=C+1;P<y;P++){const L=p[P],$=x.x-L.x,f=x.y-L.y,F=$*$+f*f;if(F<I){const u=1-Math.sqrt(F)/Pe;u>=o&&u<g&&(s.moveTo(x.x,x.y),s.lineTo(L.x,L.y))}}}s.stroke()}s.save(),s.shadowColor=`rgba(${ne},${oe},${ie},0.8)`,s.shadowBlur=25;for(let b=0;b<y;b++){const o=p[b],g=.6+.4*Math.sin(o.pulsePhase),v=o.radius*(.8+g*.4),C=ne+(255-ne)*.7*g|0,x=oe+(255-oe)*.7*g|0,P=ie+(255-ie)*.7*g|0;s.beginPath(),s.arc(o.x,o.y,v,0,Math.PI*2),s.fillStyle=`rgba(${C},${x},${P},${(.6+g*.4).toFixed(2)})`,s.fill()}s.restore(),s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let b=0;b<y;b++){const o=p[b];if(o.radius>2){const g=.6+.4*Math.sin(o.pulsePhase),v=o.radius*(.8+g*.4)*.35;s.moveTo(o.x+v,o.y),s.arc(o.x,o.y,v,0,Math.PI*2)}}s.fill(),s.fillStyle=`rgba(${ne},${oe},${ie},0.08)`;for(let b=0;b<6;b++)s.fillRect(Math.random()*r,Math.random()*l,1,1)}d()}function pt(){we!==null&&(cancelAnimationFrame(we),we=null),ae=null,be=null,xe=[]}function Ue(){he=requestAnimationFrame(Ue),Ie+=.035;const t=document.getElementById("nf-engine-waves");if(!t){he=null;return}const e=560,c=140,a=e/2;t.querySelectorAll("path").forEach(d=>{const s=parseInt(d.getAttribute("data-wave-idx")||"0",10),r=10+s*5,l=1.2+s*.35,p=s*.6,y=.7+s*.12;let I=`M 0 ${c/2}`;for(let O=0;O<=e;O+=3){const b=Math.abs(O-a)/a,o=Math.pow(Math.min(1,b*1.6),.6),g=c/2+r*o*Math.sin(O/e*l*Math.PI*2+Ie*y+p);I+=` L ${O} ${Math.round(g*10)/10}`}d.setAttribute("d",I)})}function ft(){Ie=0,Ue(),dt(),ke=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),c=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),c&&(c.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function We(){he!==null&&(cancelAnimationFrame(he),he=null),ke&&(clearInterval(ke),ke=null),pt()}function Te(){let t=0;const e=Y.filter(r=>r.status!=="skipped").length;for(const r of Y){const l=document.getElementById(`nf-proc-${r.stepId}`);if(!l)continue;l.className="nf-proc-row";const p=l.querySelector(".nf-proc-badge");switch(r.status){case"done":l.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),t++;break;case"active":l.classList.add("nf-proc-active"),p&&(p.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const c=document.getElementById("nf-step-counter");c&&(c.textContent=`${t}/${Y.length}`);const a=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");t>=e&&e>0?(a&&(a.textContent="COMPLETE",a.style.color=W.doneHex),i&&(i.style.background=W.doneHex,i.style.boxShadow=`0 0 8px rgba(${W.doneRgb},0.7)`)):Y.some(l=>l.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(l=>l.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=W.hex,a.style.textShadow=`0 0 10px rgba(${W.rgb},0.5)`);const d=document.getElementById("nf-terminal"),s=d==null?void 0:d.querySelector(".nf-proc-active");s&&d&&s.scrollIntoView({behavior:"smooth",block:"center"})}function Ye(){j||(Ne(),j=document.createElement("button"),j.id="nf-toggle-btn",j.className="nf-toggle-visible",j.innerHTML="⚡",j.title="ซ่อน/แสดง Netflow Overlay",j.onclick=()=>Ae(),document.body.appendChild(j))}function Ae(){X&&(Ye(),fe?(X.classList.remove("nf-hidden"),X.classList.add("nf-visible"),j&&(j.innerHTML="✕"),fe=!1):(X.classList.remove("nf-visible"),X.classList.add("nf-hidden"),j&&(j.innerHTML="⚡"),fe=!0))}const Xe={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function je(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=me;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"red"}catch{e="red"}const c=Xe[e]||Xe.red;let a;try{a=chrome.runtime.getURL(c)}catch{a=`/${c}`}const i=W.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, cover",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function _e(t=1){if(W=nt(),Ge(),X){fe&&Ae();return}if(le&&(le.remove(),le=null),Ne(),Ce=t,Y=Se(t),t>1){const e=ce.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const c=ce.find(a=>a.id==="render");if(c){const a=c.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=c.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}X=at(),document.body.appendChild(X),fe=!1,Ye(),st(),ft(),requestAnimationFrame(()=>je())}function ut(){Ve(),We(),fe=!1,X&&(X.classList.add("nf-fade-out"),setTimeout(()=>{X==null||X.remove(),X=null},500)),j&&(j.remove(),j=null)}const gt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function mt(t,e,c){const a=Y.filter(r=>r.status==="done").length,i=Y.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${a}/${i}`);const s=document.getElementById("nf-stat-scenes");if(s&&(s.textContent=Ce>1?`1/${Ce}`:"1/1"),e==="active"){const r=document.getElementById("nf-stat-status"),l=gt[t]||t.toUpperCase();r&&(r.textContent=l)}else if(e==="done"&&a>=i){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(e==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}if(c!==void 0&&c>0){const r=document.getElementById("nf-stat-progress");r&&(r.textContent=`${Math.min(100,c)}%`)}}function T(t,e,c){if(!X)return;for(const i of ce)for(const d of i.steps)d.id===t&&(d.status=e,c!==void 0&&(d.progress=c));for(const i of Y)i.stepId===t&&(i.status=e,c!==void 0&&(i.progress=c));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),mt(t,e,c),c!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,c)}%`)}Be(),Te()}function ue(t){T(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function ye(t=4e3){Ve(),We(),Be(),Te(),setTimeout(()=>ut(),t)}function Be(){for(const t of ce){const e=t.steps.filter(l=>l.status!=="skipped").length,c=t.steps.filter(l=>l.status==="done").length,a=t.steps.some(l=>l.status==="active"),i=e>0?Math.round(c/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${i}%`);const s=document.getElementById(`nf-modbar-${t.id}`);s&&(s.style.width=`${i}%`);const r=document.getElementById(`nf-mod-${t.id}`);r&&(r.classList.remove("nf-active","nf-done"),i>=100?r.classList.add("nf-done"):a&&r.classList.add("nf-active"))}}function ht(t){var a,i,d,s;Ce=t;const e=new Map;for(const r of Y)e.set(r.stepId,{status:r.status,progress:r.progress});Y=Se(t);for(const r of Y){const l=e.get(r.stepId);l&&(r.status=l.status,l.progress!==void 0&&(r.progress=l.progress))}if(it(),t>1){const r=ce.find(l=>l.id==="video");if(r){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=r.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=r.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=r.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=r.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});r.steps=l,Ke(r)}}const c=ce.find(r=>r.id==="render");if(c&&t>1){const r=c.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const l=c.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),Ke(c)}Be(),Te()}function Ke(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,e.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Je(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Je(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},B=t=>{console.warn(`[Netflow AI] ${t}`);try{Je(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}},Fe=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Re=/Win/i.test(navigator.userAgent),ge=Fe?"🍎 Mac":Re?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ge}`),document.addEventListener("click",t=>{const e=t.target;if(!e)return;const c=e.tagName.toLowerCase(),a=Math.round(t.clientX),i=Math.round(t.clientY),d=(e.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${a},${i}) → <${c}> "${d}"`)},!0);const h=t=>new Promise(e=>setTimeout(e,t));function de(){return!!window.__NETFLOW_STOP__}function Ze(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of c){if(e&&e.contains(i))continue;const d=(i.textContent||"").trim().toLowerCase();if(!(d.length>200||d.length<5)){for(const s of t)if(d.includes(s))return((a=i.textContent)==null?void 0:a.trim())||s}}return null}async function Q(t){const e=t.getBoundingClientRect(),c=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:c,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await h(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await h(50),t.click()}function bt(t){const e=t.getBoundingClientRect(),c=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:c,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function wt(t){const e=[],c=document.querySelectorAll("i");for(const a of c){if((a.textContent||"").trim()!==t)continue;let d=a,s=null,r=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const y=p.width*p.height;y<r&&(s=d,r=y)}}s&&!e.includes(s)&&e.push(s)}return e.sort((a,i)=>{const d=a.getBoundingClientRect(),s=i.getBoundingClientRect();return d.left-s.left}),e}function De(t=!1){const e=[],c=document.querySelectorAll("video");for(const s of c){let r=s.parentElement;for(let l=0;l<10&&r;l++){const p=r.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:r,left:p.left});break}r=r.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of a){const r=(s.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let l=s.parentElement;for(let p=0;p<10&&l;p++){const y=l.getBoundingClientRect();if(y.width>120&&y.height>80&&y.width<window.innerWidth*.7&&y.top>=-50&&y.left<window.innerWidth*.75){e.push({el:l,left:y.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const s of i){const r=(s.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let l=s.parentElement;for(let p=0;p<10&&l;p++){const y=l.getBoundingClientRect();if(y.width>120&&y.height>80&&y.width<window.innerWidth*.7&&y.top>=-50&&y.left<window.innerWidth*.75){e.push({el:l,left:y.left});break}l=l.parentElement}}}const d=Array.from(new Set(e.map(s=>s.el))).map(s=>e.find(r=>r.el===s));if(d.sort((s,r)=>s.left-r.left),d.length>0){const s=d[0].el,r=s.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),s}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function xt(){const t=wt("image");if(t.length>0){const c=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const c of e){let a=c.parentElement;for(let i=0;i<10&&a;i++){const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function yt(t,e){var r;const[c,a]=t.split(","),i=((r=c.match(/:(.*?);/))==null?void 0:r[1])||"image/png",d=atob(a),s=new Uint8Array(d.length);for(let l=0;l<d.length;l++)s[l]=d.charCodeAt(l);return new File([s],e,{type:i})}function ve(t){var a;const e=[],c=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of c)if(((a=i.textContent)==null?void 0:a.trim())===t){const d=i.closest("button");d&&e.push(d)}return e}function vt(){const t=[...ve("add"),...ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const s=(i.textContent||"").trim();if(s==="+"||s==="add")return i}}return null}let e=null,c=0;for(const a of t){const i=a.getBoundingClientRect();i.y>c&&(c=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${c.toFixed(0)}`),e}function Qe(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=ve(a);let d=null,s=0;for(const r of i){const l=r.getBoundingClientRect();l.y>s&&(s=l.y,d=r)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${s.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,c=0;for(const a of t){const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,s=i.y+i.x+(d?1e3:0);s>c&&(c=s,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function et(){const t=document.querySelectorAll("textarea");for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of c){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Le(t,e){var c,a,i,d;t.focus(),await h(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",e),s.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});t.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});t.dispatchEvent(l),await h(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await h(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(s);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(r),await h(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await h(200);const s=new DataTransfer;s.setData("text/plain",e),s.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});t.dispatchEvent(r),await h(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((c=navigator.clipboard)!=null&&c.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=e,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await h(200),document.execCommand("paste"),await h(500);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(t).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(s){let r=t[s];for(let l=0;l<30&&r;l++){const p=r.memoizedProps,y=r.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const I=p.editor;I.selection,I.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=y==null?void 0:y.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),y.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function $t(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const c of e)t.push({input:c,origType:"file"}),c.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Et(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ge})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ge})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function kt(t,e,c){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(y=>y.input)];for(const y of a)!i.includes(y)&&y.offsetParent===null&&i.push(y);for(const y of i)y.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ge})`),!1;let s;if(c&&c.size>0){const y=Array.from(d).filter(I=>!c.has(I));y.length>0?(s=y[y.length-1],n(`เล็งเป้า file input ใหม่ (${y.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const r=new DataTransfer;r.items.add(e);try{s.files=r.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(y){n(`กำหนด target.files ล้มเหลว: ${y.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:r.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(I){return B(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${I.message}`),!1}}const l=s._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const y=new DataTransfer;y.items.add(e);const I=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:y});s.dispatchEvent(I),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ge}`),!0}function $e(){let t=0;const e=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("img");for(const i of c){if(e&&e.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.src&&i.offsetParent!==null&&t++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const i of a){if(e&&e.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.offsetParent!==null&&t++}return t}async function tt(t,e){var y;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const c=yt(t,e);n(`ขนาดไฟล์: ${(c.size/1024).toFixed(1)} KB`);const a=$e();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async(I,O=8e3)=>{const b=Date.now();for(;Date.now()-b<O;){const o=$e();if(o>a)return n(`✅ [${I}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${o}`),!0;await h(500)}return n(`⚠️ [${I}] รูปย่อไม่เพิ่ม (ยังคง ${$e()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=vt();if(!d)return B("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const r=Et();let l=$t();const p=new MutationObserver(I=>{for(const O of I)for(const b of O.addedNodes)if(b instanceof HTMLInputElement&&b.type==="file"&&(b.type="text",l.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),b instanceof HTMLElement){const o=b.querySelectorAll('input[type="file"]');for(const g of o)g.type="text",l.push({input:g,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await h(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let I=!1;const O=Date.now();for(;!I&&Date.now()-O<5e3;){const o=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const g of o){if(g===d)continue;const v=g.querySelectorAll("i");for(const C of v){const x=((y=C.textContent)==null?void 0:y.trim())||"";if((x==="upload"||x==="upload_file")&&!Array.from(g.querySelectorAll("i")).map(L=>{var $;return($=L.textContent)==null?void 0:$.trim()}).includes("drive_folder_upload")){g.click(),I=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${x}) ✅`);break}}if(I)break}if(!I)for(const g of o){if(g===d)continue;const v=g.childNodes.length<=5?(g.textContent||"").trim():"";if(v.length>0&&v.length<40){const C=v.toLowerCase();if(C==="upload"||C==="อัปโหลด"||C==="อัพโหลด"||C.includes("upload image")||C.includes("upload photo")||C.includes("อัปโหลดรูปภาพ")||C.includes("อัพโหลดรูปภาพ")||C.includes("from computer")||C.includes("จากคอมพิวเตอร์")){g.click(),I=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${v}") ✅`);break}}}I||await h(500)}return I?(await h(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),kt(l,c,s)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(B(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(B("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),r();for(const I of l)I.input.type!=="file"&&(I.input.type="file")}}async function Ct(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const c=document.querySelectorAll("button");let a=null;for(const b of c){const o=b.textContent||"";if((o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))&&b.getBoundingClientRect().bottom>window.innerHeight*.7){a=b,n(`พบปุ่มตั้งค่าจากข้อความ: "${o.substring(0,30).trim()}"`);break}}if(!a)for(const b of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const o=ve(b);for(const g of o)if(g.getBoundingClientRect().bottom>window.innerHeight*.7){a=g,n(`พบปุ่มตั้งค่าจากไอคอน: ${b}`);break}if(a)break}if(!a)return B("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2,r={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("คลิกปุ่มตั้งค่าแล้ว"),await h(1500);let l=!1,p=null;const y=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const b of y){const o=b.getAttribute("aria-controls")||"",g=b.id||"";if(o.toUpperCase().includes("IMAGE")||g.toUpperCase().includes("IMAGE")){p=b,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const b of document.querySelectorAll('[role="tab"]')){const o=b.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=b,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const b of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const o=(b.textContent||"").trim();if((o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ")&&!o.includes("Video")&&!o.includes("วิดีโอ")){p=b,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}if(p){const b=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(b==="active"||o==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const g=p.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await h(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await h(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const I=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const b of document.querySelectorAll("button, [role='tab'], [role='option']")){const o=(b.textContent||"").trim();if(o===I||o.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const g=b.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",v)),await h(80),b.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",v)),b.dispatchEvent(new MouseEvent("click",v)),n(`เลือกทิศทาง: ${I}`),await h(400);break}}const O=`x${e}`;for(const b of document.querySelectorAll("button, [role='tab'], [role='option']"))if((b.textContent||"").trim()===O){const g=b.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",v)),await h(80),b.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",v)),b.dispatchEvent(new MouseEvent("click",v)),n(`เลือกจำนวน: ${O}`),await h(400);break}return await h(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("ปิดหน้าตั้งค่าแล้ว"),await h(600),!0}async function Mt(t){var x,P,L,$;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,c=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=c?c[1]:"unknown",i=Fe?"macOS":Re?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=Fe?((P=(x=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:x[1])==null?void 0:P.replace(/_/g,"."))||"":Re&&((L=e.match(/Windows NT ([0-9.]+)/))==null?void 0:L[1])||"",s=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${r} | แพลตฟอร์ม: ${ge}`),n("══════════════════════════════════════════");try{Me(t.theme)}catch{}try{_e()}catch(f){console.warn("Overlay show error:",f)}const l=[],p=[];try{T("settings","active");const f=t.orientation||"horizontal",F=t.outputCount||1,u=await Ct(f,F);l.push(u?"✅ Settings":"⚠️ Settings"),T("settings",u?"done":"error")}catch(f){B(`ตั้งค่าผิดพลาด: ${f.message}`),l.push("⚠️ Settings"),T("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const y=()=>{const f=document.querySelectorAll("span, div, p, label");for(const F of f){const u=(F.textContent||"").trim();if(/^\d{1,3}%$/.test(u)){if(u==="100%")return null;const w=F.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>0&&w.top<window.innerHeight)return u}}return null},I=async f=>{n(`รอการอัพโหลด ${f} เสร็จ...`),await h(2e3);const F=Date.now(),u=6e4;let w="",M=Date.now();const A=15e3;for(;Date.now()-F<u;){const k=y();if(k){if(k!==w)w=k,M=Date.now();else if(Date.now()-M>A){n(`✅ อัพโหลด ${f} — % ค้างที่ ${k} นาน ${A/1e3} วินาที ถือว่าเสร็จ`),await h(1e3);return}n(`กำลังอัพโหลด: ${k} — รอ...`),await h(1500)}else{n(`✅ อัพโหลด ${f} เสร็จ — ไม่พบตัวบอก %`),await h(1e3);return}}B(`⚠️ อัพโหลด ${f} หมดเวลาหลัง ${u/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){T("upload-char","active");try{const f=await tt(t.characterImage,"character.png");l.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||p.push("character upload failed"),T("upload-char",f?"done":"error")}catch(f){B(`อัพโหลดตัวละครผิดพลาด: ${f.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),T("upload-char","error")}await I("character")}else ue("upload-char");if(t.productImage){T("upload-prod","active");try{const f=await tt(t.productImage,"product.png");l.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||p.push("product upload failed"),T("upload-prod",f?"done":"error")}catch(f){B(`อัพโหลดสินค้าผิดพลาด: ${f.message}`),l.push("❌ สินค้า"),p.push("product upload error"),T("upload-prod","error")}await I("product")}else ue("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800);const O=y();O&&(n(`⚠️ อัพโหลดยังแสดง ${O} — รอเพิ่มเติม...`),await I("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await h(1e3);const b=(t.characterImage?1:0)+(t.productImage?1:0);if(b>0){let f=$e();f<b&&(n(`⏳ เห็นรูปย่อแค่ ${f}/${b} — รอ 3 วินาที...`),await h(3e3),f=$e()),f>=b?n(`✅ ยืนยันรูปย่ออ้างอิง: ${f}/${b}`):B(`⚠️ คาดว่าจะมี ${b} รูปย่อ แต่พบ ${f} — ดำเนินการต่อ`)}if(de()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{ye(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),T("img-prompt","active"),await h(1e3);const o=et();o?(await Le(o,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),T("img-prompt","done")):(B("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),T("img-prompt","error")),await h(800);const g=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&g.add(f.src)}),n(`บันทึกรูปเดิม: ${g.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),T("img-generate","active"),await h(500);const v=Qe();if(v){const f=v.getBoundingClientRect(),F=f.left+f.width/2,u=f.top+f.height/2,w={bubbles:!0,cancelable:!0,clientX:F,clientY:u,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",w)),await h(80),v.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",w)),v.dispatchEvent(new MouseEvent("click",w)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await h(500),v.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",w)),await h(80),v.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",w)),v.dispatchEvent(new MouseEvent("click",w)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),T("img-generate","done")}else B("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),T("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),T("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await h(15e3);const f=document.getElementById("netflow-engine-overlay"),F=()=>{const k=document.querySelectorAll("div, span, p, label, strong, small");for(const m of k){if(f&&f.contains(m))continue;const E=(m.textContent||"").trim();if(E.length>10)continue;const _=E.match(/(\d{1,3})\s*%/);if(!_)continue;const S=parseInt(_[1],10);if(S<1||S>100)continue;const R=m.getBoundingClientRect();if(!(R.width===0||R.width>150)&&!(R.top<0||R.top>window.innerHeight))return S}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let u=null,w=-1,M=0;const A=Date.now();for(;!u&&Date.now()-A<18e4;){const k=document.querySelectorAll("img");for(const m of k){if(g.has(m.src)||!(m.alt||"").toLowerCase().includes("generated"))continue;const _=m.getBoundingClientRect();if(_.width>120&&_.height>120&&_.top>0&&_.top<window.innerHeight*.85){const S=m.closest("div");if(S){u=S,n(`พบรูป AI จาก alt="${m.alt}": ${m.src.substring(0,80)}...`);break}}}if(!u)for(const m of k){if(g.has(m.src))continue;const E=m.closest("div"),_=(E==null?void 0:E.textContent)||"";if(_.includes("product.png")||_.includes("character.png")||_.includes(".png")||_.includes(".jpg"))continue;const S=m.getBoundingClientRect();if(S.width>120&&S.height>120&&S.top>0&&S.top<window.innerHeight*.85){const R=m.closest("div");if(R){u=R,n(`พบรูปใหม่ (สำรอง): ${m.src.substring(0,80)}...`);break}}}if(!u){if(de()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const m=Ze();if(m){B(`❌ สร้างรูปล้มเหลว: ${m}`),p.push(`image gen failed: ${m}`),T("img-wait","error");break}const E=F();E!==null?(E!==w&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${E}%`),w=E,T("img-wait","active",E)),M=Date.now()):w>30&&Math.floor((Date.now()-M)/1e3)>=3&&n(`🖼️ % หายที่ ${w}% — รูปน่าจะเสร็จแล้ว`),await h(3e3)}}if(!u)B("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),T("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),T("img-wait","done",100);const k=u.getBoundingClientRect(),m=k.left+k.width/2,E=k.top+k.height/2,_={bubbles:!0,cancelable:!0,clientX:m,clientY:E};u.dispatchEvent(new PointerEvent("pointerenter",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseenter",_)),u.dispatchEvent(new PointerEvent("pointerover",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseover",_)),u.dispatchEvent(new PointerEvent("pointermove",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousemove",_)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await h(1500);let S=null;for(const R of["more_vert","more_horiz","more"]){const G=ve(R);for(const H of G){const V=H.getBoundingClientRect();if(V.top>=k.top-20&&V.top<=k.bottom&&V.right>=k.right-150&&V.right<=k.right+20){S=H;break}}if(S)break}if(!S){const R=document.querySelectorAll("button");for(const G of R){const H=G.getBoundingClientRect();if(H.width<50&&H.height<50&&H.top>=k.top-10&&H.top<=k.top+60&&H.left>=k.right-80){const V=G.querySelectorAll("i");for(const K of V)if(((($=K.textContent)==null?void 0:$.trim())||"").includes("more")){S=G;break}if(S)break;const z=G.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){S=G;break}}}}if(!S)B("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const R=S.getBoundingClientRect(),G=R.left+R.width/2,H=R.top+R.height/2,V={bubbles:!0,cancelable:!0,clientX:G,clientY:H,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",V)),await h(80),S.dispatchEvent(new PointerEvent("pointerup",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",V)),S.dispatchEvent(new MouseEvent("click",V)),n("คลิกปุ่ม 3 จุดแล้ว"),await h(1500);let z=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const q of K){const J=(q.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){z=q;break}}if(!z)B("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const q=z.getBoundingClientRect(),J=q.left+q.width/2,re=q.top+q.height/2,N={bubbles:!0,cancelable:!0,clientX:J,clientY:re,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",N)),await h(80),z.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",N)),z.dispatchEvent(new MouseEvent("click",N)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),T("animate","done"),await h(3e3)}}}}catch(f){B(`ขั้น 4 ผิดพลาด: ${f.message}`),l.push("⚠️ Animate")}if(de()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{ye(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),T("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await h(3e3);let f=!1;const F=document.querySelectorAll("button, span, div");for(const M of F){const A=(M.textContent||"").trim(),k=M.getBoundingClientRect();if((A==="วิดีโอ"||A==="Video"||A.includes("วิดีโอ"))&&k.bottom>window.innerHeight*.7){f=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}f||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await h(1e3);const u=et();u?(await Le(u,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),T("vid-prompt","done")):(B("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),p.push("video prompt input not found"),T("vid-prompt","error")),await h(1e3),T("vid-generate","active");const w=Qe();if(w){const M=w.getBoundingClientRect(),A=M.left+M.width/2,k=M.top+M.height/2,m={bubbles:!0,cancelable:!0,clientX:A,clientY:k,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",m)),await h(80),w.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",m)),w.dispatchEvent(new MouseEvent("click",m)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),T("vid-generate","done"),await h(500),w.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",m)),await h(80),w.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",m)),w.dispatchEvent(new MouseEvent("click",m)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else B("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),T("vid-generate","error")}catch(f){B(`ขั้น 5 ผิดพลาด: ${f.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${f.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ue("animate"),ue("vid-prompt"),ue("vid-generate"),ue("vid-wait");if(t.videoPrompt){T("vid-wait","active");const f=t.sceneCount||1,F=t.videoScenePrompts||[t.videoPrompt];if(f>1)try{ht(f)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${f>1?`ต่อ ${f} ฉาก`:"ดาวน์โหลด"} ===`);const u=document.getElementById("netflow-engine-overlay"),w=()=>{const k=document.querySelectorAll("div, span, p, label, strong, small");for(const m of k){if(u&&u.contains(m))continue;const E=(m.textContent||"").trim();if(E.length>10)continue;const _=E.match(/(\d{1,3})\s*%/);if(!_)continue;const S=parseInt(_[1],10);if(S<1||S>100)continue;const R=m.getBoundingClientRect();if(!(R.width===0||R.width>150)&&!(R.top<0||R.top>window.innerHeight))return S}return null},M=async(k=6e5)=>{n("รอการสร้างวิดีโอ..."),T("vid-wait","active"),await h(5e3);const m=()=>{const N=document.querySelectorAll("div, span, p, label, strong, small");let D=0;for(const U of N){if(u&&u.contains(U))continue;const Z=(U.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const ee=U.tagName.toLowerCase(),pe=U.className&&typeof U.className=="string"?U.className.split(/\s+/).slice(0,2).join(" "):"",te=U.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${ee}.${pe}> ที่ (${te.left.toFixed(0)},${te.top.toFixed(0)}) w=${te.width.toFixed(0)}`),D++,D>=5)break}}D===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},E=De();n(E?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),m();const _=Date.now();let S=-1,R=0,G=!1;for(;Date.now()-_<k;){const N=w();if(N!==null){if(N!==S&&(n(`ความคืบหน้าวิดีโอ: ${N}%`),S=N,T("vid-wait","active",N)),R=Date.now(),N>=100){n("✅ ตรวจพบ 100%!"),G=!0;break}}else if(S>30){const D=Math.floor((Date.now()-R)/1e3);if(D>=5){n(`✅ % หายไปที่ ${S}% (หาย ${D} วินาที) — วิดีโอเสร็จ!`),G=!0;break}n(`⏳ % หายที่ ${S}% — ยืนยันใน ${5-D} วินาที...`)}else{const D=Math.floor((Date.now()-_)/1e3);D%15<3&&n(`⏳ รอ... (${D} วินาที) ไม่พบ %`)}if(!G&&S>0&&De(!0)&&!E){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${S}% — วิดีโอเสร็จ!`),G=!0;break}if(de())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(S<1){const D=Ze();if(D)return B(`❌ สร้างวิดีโอล้มเหลว: ${D}`),null}await h(3e3)}const H=De();if(!H)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),T("vid-wait","error"),null;const V=H;G?(T("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await h(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const z=V.getBoundingClientRect();let K=z.left+z.width/2,q=z.top+z.height/2,J=V;const re=V.querySelector("video, img, canvas");if(re){const N=re.getBoundingClientRect();N.width>50&&N.height>50&&(K=N.left+N.width/2,q=N.top+N.height/2,J=re,n(`🎯 พบรูปย่อ <${re.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${q.toFixed(0)}) ${N.width.toFixed(0)}x${N.height.toFixed(0)}`))}else q=z.top+z.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${q.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${q.toFixed(0)})...`),bt(J);for(let N=0;N<8;N++){const D={bubbles:!0,cancelable:!0,clientX:K+N%2,clientY:q};J.dispatchEvent(new PointerEvent("pointermove",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",D)),await h(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:f,scenePrompts:F,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${f} ฉาก, ${F.length} prompts, theme: ${t.theme})`)}catch(N){n(`⚠️ ไม่สามารถบันทึก pending action: ${N.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await A(V),J!==V&&await A(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),V},A=async k=>{const m=k.getBoundingClientRect(),E=m.left+m.width/2,_=m.top+m.height/2,S={bubbles:!0,cancelable:!0,clientX:E,clientY:_,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",S)),await h(80),k.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",S)),k.dispatchEvent(new MouseEvent("click",S)),await h(50),k.click(),n("คลิกการ์ดวิดีโอแล้ว"),await h(2e3)};try{await M()?(l.push("✅ Video Complete"),T("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action")):(B("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),T("vid-wait","error"))}catch(k){B(`ขั้น 6 ผิดพลาด: ${k.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${k.message}`)}}const C=p.length===0;try{ye(C?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:C,message:C?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:C?"done":"partial"}}async function It(t,e=[],c){var C;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{c&&Me(c)}catch{}try{_e(t)}catch(x){n(`⚠️ showOverlay error: ${x.message}`)}try{const x=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const P of x)T(P,"done");t>=2&&T("scene2-prompt","active"),n(`✅ overlay restored: ${x.length} steps done, sceneCount=${t}`)}catch(x){n(`⚠️ overlay restore error: ${x.message}`)}await h(1500);const a=(()=>{for(const x of document.querySelectorAll("button")){const P=x.querySelectorAll("i");for(const $ of P){const f=($.textContent||"").trim();if(f==="volume_up"||f==="volume_off"||f==="volume_mute"){const F=x.getBoundingClientRect();if(F.width>0&&F.height>0)return x}}const L=(x.getAttribute("aria-label")||"").toLowerCase();if(L.includes("mute")||L.includes("ปิดเสียง")){const $=x.getBoundingClientRect();if($.width>0&&$.height>0)return x}}return null})();if(a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await h(2e3);const x=(m,E="button, [role='menuitem'], [role='option'], li, span, div[role='button'], div")=>{let _=null,S=1/0;for(const R of document.querySelectorAll(E)){const G=(R.textContent||"").trim();if(G.includes(m)&&G.length<100){const H=R.getBoundingClientRect();H.width>0&&H.height>0&&H.top>=0&&G.length<S&&(_=R,S=G.length)}}return _};for(let m=2;m<=t;m++){const E=e[m-1];if(!E){B(`ไม่พบ prompt สำหรับฉากที่ ${m}`);continue}n(`── ฉากที่ ${m}/${t}: วาง prompt + generate ──`);let _=null;const S=Date.now();for(;!_&&Date.now()-S<1e4;){const D=document.querySelectorAll("[data-slate-editor='true']");if(D.length>0&&(_=D[D.length-1]),!_){const U=document.querySelectorAll("[role='textbox'][contenteditable='true']");U.length>0&&(_=U[U.length-1])}_||await h(1e3)}if(!_){B("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${_.tagName.toLowerCase()}> ${_.className.substring(0,40)}`),await Le(_,E),n(`วาง prompt ฉาก ${m} (${E.length} ตัวอักษร) ✅`);try{T(`scene${m}-prompt`,"done"),T(`scene${m}-gen`,"active")}catch{}await h(1e3);const R=_.getBoundingClientRect();let G=null,H=1/0;for(const D of document.querySelectorAll("button")){if(D.disabled)continue;const U=D.querySelectorAll("i");let Z=!1;for(const te of U)if((te.textContent||"").trim()==="arrow_forward"){Z=!0;break}if(!Z)continue;const ee=D.getBoundingClientRect();if(ee.width<=0||ee.height<=0)continue;const pe=Math.abs(ee.top-R.top)+Math.abs(ee.right-R.right);pe<H&&(H=pe,G=D)}if(!G)for(const D of document.querySelectorAll("button")){const U=D.querySelectorAll("i");for(const Z of U)if((Z.textContent||"").trim()==="arrow_forward"){const ee=D.getBoundingClientRect();if(ee.width>0&&ee.height>0){G=D;break}}if(G)break}if(!G){B("ไม่พบปุ่ม Generate/Send");return}await new Promise(D=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene2_gen_and_download",theme:c}},()=>D())}),n("💾 บันทึก pending action: wait_scene2_gen_and_download (ป้องกันหน้า reload)"),await Q(G),n(`คลิก Generate ฉาก ${m} ✅`);try{T(`scene${m}-gen`,"done"),T(`scene${m}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${m} gen เสร็จ ──`),await h(5e3);const V=document.getElementById("netflow-engine-overlay");let z=0,K=0;const q=Date.now(),J=6e5,re=5e3;let N=!1;for(;Date.now()-q<J;){let D=null;const U=document.querySelectorAll("div, span, p, label, strong, small");for(const Z of U){if(V&&V.contains(Z))continue;const pe=(Z.textContent||"").trim().match(/^(\d{1,3})%$/);if(pe){const te=Z.getBoundingClientRect();if(te.width>0&&te.height>0&&te.width<120&&te.height<60){D=parseInt(pe[1],10);break}}}if(D!==null)D!==z&&(n(`🎬 ฉาก ${m} ความคืบหน้า: ${D}%`),z=D),K=0;else if(z>0){if(K===0)K=Date.now(),n(`🔍 ฉาก ${m}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-K>=re){n(`✅ ฉาก ${m}: % หายไป ${re/1e3} วินาที — เจนเสร็จ!`),N=!0;break}}if(de()){n("⛔ ผู้ใช้สั่งหยุด");return}await h(2e3)}N||B(`ฉาก ${m} หมดเวลา`),n(`✅ ฉาก ${m} เสร็จแล้ว`);try{T(`scene${m}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await h(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{T("download","active")}catch{}await h(2e3);let P=null;const L=Date.now();for(;!P&&Date.now()-L<1e4;){for(const m of document.querySelectorAll("button, [role='button']")){const E=(m.textContent||"").trim().toLowerCase();if((E.includes("download")||E.includes("ดาวน์โหลด"))&&E.length<80){const _=m.getBoundingClientRect();if(_.width>0&&_.height>0){P=m;break}}}P||await h(1e3)}if(!P){B("ไม่พบปุ่มดาวน์โหลด");return}await Q(P),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await h(1500);const $=Date.now();let f=null;for(let m=0;m<3&&!f;m++){m>0&&n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`);let E=null;const _=Date.now();for(;!E&&Date.now()-_<5e3;)E=x("Full Video"),E||await h(500);if(!E){B("ไม่พบ Full Video");return}const S=E.getBoundingClientRect(),R=S.left+S.width/2,G=S.top+S.height/2;E.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:R,clientY:G})),E.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:G})),E.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R,clientY:G})),await Q(E),n("คลิก/hover Full Video ✅"),await h(2e3);const H=Date.now();for(;!f&&Date.now()-H<8e3;)f=x("720p"),f||(E.isConnected&&E.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:G})),await h(500))}if(!f){B("ไม่พบ 720p");return}await Q(f),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ..."),await h(5e3);const F=Date.now();let u=!1,w=!1,M=0;for(;Date.now()-F<3e5;){const E=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(E.includes("download complete")||E.includes("ดาวน์โหลดเสร็จ")){n("✅ Download complete!"),u=!0;break}for(const S of document.querySelectorAll("div, span, p")){const R=(S.textContent||"").trim().toLowerCase();if(R.length<60&&(R.includes("download complete")||R.includes("ดาวน์โหลดเสร็จ"))){n("✅ Download complete! (element)"),u=!0;break}}if(u)break;if(E.includes("downloading your extended video")||E.includes("กำลังดาวน์โหลด")){w=!0,M=0;const S=Math.floor((Date.now()-F)/1e3);n(`⏳ กำลังดาวน์โหลด... (${S} วินาที)`)}else if(w){if(M===0)M=Date.now(),n("🔍 ข้อความดาวน์โหลดหายไป — กำลังยืนยัน...");else if(Date.now()-M>=3e3){n("✅ ดาวน์โหลดเสร็จ (ข้อความหายไป 3 วินาที)"),u=!0;break}}if(de()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await h(2e3)}if(!u){B("ดาวน์โหลดหมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let A=!1;const k=Date.now();for(;Date.now()-k<6e4&&!A;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:$},E=>{chrome.runtime.lastError?B(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):E!=null&&E.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${E.message}`),A=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${E==null?void 0:E.message}`),m()})})}catch(m){B(`ตรวจสอบผิดพลาด: ${m.message}`)}A||await h(3e3)}A||B("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{T("open","done"),ye(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await h(2e3);const i=(x,P="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const L of document.querySelectorAll(P)){const $=(L.textContent||"").trim();if($.includes(x)&&$.length<100){const f=L.getBoundingClientRect();if(f.width>0&&f.height>0&&f.top>=0)return L}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const s=Date.now();for(;!d&&Date.now()-s<1e4;){for(const x of document.querySelectorAll("button, [role='button']")){const P=(x.textContent||"").trim(),L=P.toLowerCase();if((L.includes("download")||L.includes("ดาวน์โหลด"))&&P.length<80){const $=x.getBoundingClientRect();if($.width>0&&$.height>0){d=x;break}}}if(!d)for(const x of document.querySelectorAll("button")){const P=(x.getAttribute("aria-label")||"").toLowerCase();if(P.includes("download")||P.includes("ดาวน์")){const L=x.getBoundingClientRect();if(L.width>0&&L.height>0){d=x;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await h(1e3))}if(!d){B("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await Q(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await h(1500);const r=Date.now();let l=null;const p=Date.now();for(;!l&&Date.now()-p<5e3;)l=i("1080p"),l||(n("รอ 1080p..."),await h(500));if(!l){B("ไม่พบ 1080p");return}await Q(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const y=Date.now();let I=!1,O=!1,b=0;const o=3e3;for(;Date.now()-y<3e5;){const P=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(P.includes("upscaling complete")||P.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),I=!0;break}for(const $ of document.querySelectorAll("div, span, p")){const f=($.textContent||"").trim().toLowerCase();if(f.length<60&&(f.includes("upscaling complete")||f.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(C=$.textContent)==null?void 0:C.trim()}")`),I=!0;break}}if(I)break;if(P.includes("upscaling your video")||P.includes("กำลังอัปสเกล")){O=!0,b=0;const $=Math.floor((Date.now()-y)/1e3);n(`⏳ กำลังอัปสเกล... (${$} วินาที)`)}else if(O){if(b===0)b=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-b>=o){n(`✅ ข้อความ Upscaling หายไป ${o/1e3} วินาที — เสร็จ!`),I=!0;break}}else{const $=Math.floor((Date.now()-y)/1e3);$%10<3&&n(`⏳ รอ Upscale... (${$} วินาที)`)}if(de()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await h(2e3)}if(!I){B("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let g=!1;const v=Date.now();for(;Date.now()-v<6e4&&!g;){try{await new Promise(x=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},P=>{chrome.runtime.lastError?B(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):P!=null&&P.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${P.message}`),g=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${P==null?void 0:P.message}`),x()})})}catch(x){B(`ตรวจสอบผิดพลาด: ${x.message}`)}g||await h(3e3)}g||B("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function St(t){n("═══ Pending: รอ scene 2 gen เสร็จ + ดาวน์โหลด ═══");try{t&&Me(t)}catch{}try{_e(2)}catch($){n(`⚠️ showOverlay error: ${$.message}`)}try{const $=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait","scene2-prompt","scene2-gen"];for(const f of $)T(f,"done");T("scene2-wait","active"),n(`✅ overlay restored: ${$.length} steps done (scene2 navigate)`)}catch($){n(`⚠️ overlay restore error: ${$.message}`)}await h(2e3);const e=(()=>{for(const $ of document.querySelectorAll("button")){const f=$.querySelectorAll("i");for(const F of f){const u=(F.textContent||"").trim();if(u==="volume_up"||u==="volume_off"||u==="volume_mute"){const w=$.getBoundingClientRect();if(w.width>0&&w.height>0)return $}}}return null})();e?(e.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n("── รอวิดีโอ scene 2 gen เสร็จ (หลัง page navigate) ──");const c=document.getElementById("netflow-engine-overlay");let a=0,i=0;const d=Date.now(),s=6e5,r=5e3;let l=!1,p=0;for(;Date.now()-d<s;){let $=null;const f=document.querySelectorAll("div, span, p, label, strong, small");for(const F of f){if(c&&c.contains(F))continue;const w=(F.textContent||"").trim().match(/^(\d{1,3})%$/);if(w){const M=F.getBoundingClientRect();if(M.width>0&&M.height>0&&M.width<120&&M.height<60){$=parseInt(w[1],10);break}}}if($!==null)p=0,$!==a&&(n(`🎬 scene 2 ความคืบหน้า: ${$}%`),a=$),i=0;else if(a>0){if(i===0)i=Date.now(),n(`🔍 scene 2: % หายไป (จาก ${a}%) — กำลังยืนยัน...`);else if(Date.now()-i>=r){n(`✅ scene 2: % หายไป ${r/1e3} วินาที — เจนเสร็จ!`),l=!0;break}}else if(p++,p>=15){const F=document.querySelectorAll("video");let u=!1;for(const w of F)if(w.readyState>=2&&!w.paused&&w.getBoundingClientRect().width>200){u=!0;break}if(u){n("✅ scene 2: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว"),l=!0;break}if(p>=30){n("✅ scene 2: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ"),l=!0;break}}await h(2e3)}l||n("⚠️ scene 2 หมดเวลา — ลองดาวน์โหลดต่อ");try{T("scene2-wait","done",100)}catch{}n("✅ scene 2 เสร็จ — เริ่มดาวน์โหลด"),await h(3e3);const y=($,f="button, [role='menuitem'], [role='option'], li, span, div[role='button'], div")=>{let F=null,u=1/0;for(const w of document.querySelectorAll(f)){const M=(w.textContent||"").trim();if(M.includes($)&&M.length<100){const A=w.getBoundingClientRect();A.width>0&&A.height>0&&A.top>=0&&M.length<u&&(F=w,u=M.length)}}return F};try{T("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");let I=null;const O=Date.now();for(;!I&&Date.now()-O<1e4;){for(const $ of document.querySelectorAll("button, [role='button']")){const f=($.textContent||"").trim().toLowerCase();if((f.includes("download")||f.includes("ดาวน์โหลด"))&&f.length<80){const F=$.getBoundingClientRect();if(F.width>0&&F.height>0){I=$;break}}}I||await h(1e3)}if(!I){B("ไม่พบปุ่มดาวน์โหลด");return}await Q(I),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await h(1500);const b=Date.now();let o=null;for(let $=0;$<3&&!o;$++){$>0&&n(`🔄 ลองหา 720p ครั้งที่ ${$+1}...`);let f=null;const F=Date.now();for(;!f&&Date.now()-F<5e3;)f=y("Full Video"),f||await h(500);if(!f){B("ไม่พบ Full Video");return}const u=f.getBoundingClientRect(),w=u.left+u.width/2,M=u.top+u.height/2;f.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:w,clientY:M})),f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:w,clientY:M})),f.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:w,clientY:M})),await Q(f),n("คลิก/hover Full Video ✅"),await h(2e3);const A=Date.now();for(;!o&&Date.now()-A<8e3;)o=y("720p"),o||(f.isConnected&&f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:w,clientY:M})),await h(500))}if(!o){B("ไม่พบ 720p");return}await Q(o),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ..."),await h(5e3);const g=Date.now();let v=!1,C=!1,x=0;for(;Date.now()-g<3e5;){const f=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(f.includes("download complete")||f.includes("ดาวน์โหลดเสร็จ")){n("✅ Download complete!"),v=!0;break}for(const u of document.querySelectorAll("div, span, p")){const w=(u.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("download complete")||w.includes("ดาวน์โหลดเสร็จ"))){n("✅ Download complete! (element)"),v=!0;break}}if(v)break;if(f.includes("downloading your extended video")||f.includes("กำลังดาวน์โหลด")){C=!0,x=0;const u=Math.floor((Date.now()-g)/1e3);n(`⏳ กำลังดาวน์โหลด... (${u} วินาที)`)}else if(C){if(x===0)x=Date.now(),n("🔍 ข้อความดาวน์โหลดหายไป — กำลังยืนยัน...");else if(Date.now()-x>=3e3){n("✅ ดาวน์โหลดเสร็จ (ข้อความหายไป 3 วินาที)"),v=!0;break}}await h(2e3)}if(!v){B("ดาวน์โหลดหมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let P=!1;const L=Date.now();for(;Date.now()-L<6e4&&!P;){try{await new Promise($=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:b},f=>{chrome.runtime.lastError?B(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):f!=null&&f.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${f.message}`),P=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${f==null?void 0:f.message}`),$()})})}catch($){B(`ตรวจสอบผิดพลาด: ${$.message}`)}P||await h(3e3)}P||B("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{T("open","done"),ye(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Pt(){try{const t=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const c=Date.now()-t.timestamp;if(c>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:t},()=>d())}),await h(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const r=s==null?void 0:s.netflow_pending_action;d((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(c/1e3)} วินาที)`),t.action==="mute_video"?await It(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene2_gen_and_download"?await St(t.theme):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,c)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),c({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Mt(t).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>console.error("[Netflow AI] Generate error:",a)),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,c({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return c({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return c({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await h(500);const a=xt();if(!a){B("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const l=document.elementFromPoint(d,s);l?(await Q(l),n(`คลิก ${r+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await Q(a),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await h(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Pt(),document.addEventListener("dblclick",t=>{const e=t.target;if(!e)return;const c=e.tagName.toLowerCase(),a=Math.round(t.clientX),i=Math.round(t.clientY),d=(e.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${a},${i}) → <${c}> "${d}"`)},!0)})();
