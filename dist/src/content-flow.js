(function(){"use strict";const at={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let W=at.green,ut=null;function kt(e){e&&at[e]&&(ut=e,W=at[e],Lt(),requestAnimationFrame(()=>Xt()))}function ne(){if(ut&&at[ut])return at[ut];try{const e=localStorage.getItem("netflow_app_theme");if(e&&at[e])return at[e]}catch{}return at.green}let tt=0,et=255,nt=65;function Lt(){const e=W.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(tt=parseInt(e[1],16),et=parseInt(e[2],16),nt=parseInt(e[3],16))}let K=null,Y=null,rt=null,Gt=0,vt=null,gt=null,$t=null,Ct=0,lt=!1,ot=null,mt=null,ht=null,Et=1,X=[];function Mt(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let l=2;l<=e;l++)t.push({stepId:`scene${l}-prompt`,label:`Scene ${l} Prompt`,status:"waiting"},{stepId:`scene${l}-gen`,label:`Scene ${l} Generate`,status:"waiting"},{stepId:`scene${l}-wait`,label:`Scene ${l} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const ct=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];X=Mt(1);function oe(e){const t=e.rgb,l=e.accentRgb,a=e.doneRgb,o=e.hex,d=e.accentHex,s=e.doneHex,r=(()=>{const g=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const k=C=>Math.min(255,C+80);return`#${[1,2,3].map(C=>k(parseInt(g[C],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const g=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const k=C=>Math.min(255,C+60);return`#${[1,2,3].map(C=>k(parseInt(g[C],16)).toString(16).padStart(2,"0")).join("")}`})(),p=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),v=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,M=p?parseInt(p[1],16)/v:0,L=p?parseInt(p[2],16)/v:1,h=p?parseInt(p[3],16)/v:.25,i=g=>`${Math.round(M*g)}, ${Math.round(L*g)}, ${Math.round(h*g)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${t},0.05) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${l},0.04) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(${i(18)},0.94) 0%, rgba(${i(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 0% 0%, rgba(${t},0.04) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 100%, rgba(${l},0.03) 0%, transparent 40%);
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
        rgba(${t},0.015) 2px,
        rgba(${t},0.015) 4px
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
    border: 1.5px solid rgba(${t},0.08);
    box-shadow: 0 0 30px rgba(${t},0.03), inset 0 0 30px rgba(${t},0.02);
    pointer-events: none;
    z-index: 1;
    animation: nf-pulse-expand 5s ease-out infinite;
}
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${l},0.06); box-shadow: 0 0 25px rgba(${l},0.03); }
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
        radial-gradient(circle, rgba(${t},0.055) 1px, transparent 1px),
        radial-gradient(circle, rgba(${t},0.035) 1px, transparent 1px);
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
        linear-gradient(rgba(${t},0.028) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${t},0.028) 1px, transparent 1px);
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
        rgba(${l},0.018) 70px,
        rgba(${l},0.018) 71px
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
        rgba(${t},0.014) 90px,
        rgba(${t},0.014) 91px
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
        rgba(${t},0.022) 110px,
        rgba(${t},0.022) 111px,
        transparent 111px,
        transparent 113px,
        rgba(${l},0.015) 113px,
        rgba(${l},0.015) 114px
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
    background: radial-gradient(circle, rgba(${t},0.07) 0%, transparent 70%);
    top: -8%; left: -6%;
    animation: nf-orb-1 22s ease-in-out infinite alternate;
}
.nf-orb-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(${l},0.055) 0%, transparent 70%);
    bottom: -6%; right: -4%;
    animation: nf-orb-2 28s ease-in-out infinite alternate;
}
.nf-orb-3 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(${t},0.045) 0%, transparent 70%);
    top: 35%; left: 55%;
    animation: nf-orb-3 32s ease-in-out infinite alternate;
}
.nf-orb-4 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(${l},0.04) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.06) 0%, rgba(${l},0.02) 40%, transparent 70%);
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
    background: rgba(${i(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${i(180)},0.05),
        inset 0 1px 0 rgba(${t},0.1),
        inset 0 0 40px rgba(${t},0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 60px rgba(${t},0.15),
            0 0 120px rgba(${t},0.08),
            0 0 200px rgba(${i(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${i(180)},0.08),
            inset 0 1px 0 rgba(${t},0.15),
            inset 0 0 50px rgba(${t},0.05);
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
    filter: drop-shadow(0 0 18px rgba(${l},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${l},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${l},0.4)); }
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
    border-bottom: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${t},0.06) 0%, transparent 100%);
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
    text-shadow: 0 0 10px rgba(${t},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${o};
    box-shadow: 0 0 8px rgba(${t}, 0.7);
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
    background: rgba(${t},0.1);
    border: 1px solid rgba(${t},0.3);
    font-family: 'Rajdhani', 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 8px rgba(${t},0.4);
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
    scrollbar-color: rgba(${t},0.3) transparent;
}

.nf-terminal::-webkit-scrollbar { width: 4px; }
.nf-terminal::-webkit-scrollbar-track { background: transparent; }
.nf-terminal::-webkit-scrollbar-thumb { background: rgba(${t},0.3); border-radius: 2px; }

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
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${o}; text-shadow: 0 0 6px rgba(${t},0.4); }

.nf-term-status {
    margin-left: auto;
    font-size: 17px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.nf-term-active .nf-term-status {
    background: rgba(${t},0.12);
    color: ${r};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${a}, 0.12);
    color: ${c};
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
    border-top: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${i(5)},0.95) 0%, rgba(${i(12)},0.98) 100%);
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
        rgba(${t},0.015) 2px,
        rgba(${t},0.015) 4px
    );
    pointer-events: none;
    z-index: 4;
}

/* HUD Frame */
.nf-engine-frame {
    position: absolute;
    inset: 8px 14px;
    border: 1px solid rgba(${t},0.25);
    border-radius: 3px;
    box-shadow:
        0 0 20px rgba(${t},0.08),
        0 0 40px rgba(${t},0.04),
        inset 0 0 20px rgba(${t},0.02);
    animation: nf-frame-pulse 4s ease-in-out infinite;
}

@keyframes nf-frame-pulse {
    0%, 100% {
        border-color: rgba(${t},0.25);
        box-shadow: 0 0 20px rgba(${t},0.08), inset 0 0 20px rgba(${t},0.02);
    }
    50% {
        border-color: rgba(${t},0.45);
        box-shadow: 0 0 30px rgba(${t},0.15), inset 0 0 30px rgba(${t},0.04);
    }
}

/* Frame corner accents */
.nf-frame-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-style: solid;
    border-color: rgba(${l},0.6);
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
    background: radial-gradient(circle, rgba(${t},0.25) 0%, rgba(${l},0.08) 40%, transparent 70%);
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
        drop-shadow(0 0 4px rgba(${t},1))
        drop-shadow(0 0 12px rgba(${t},0.7))
        drop-shadow(0 0 28px rgba(${t},0.35));
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
    background: linear-gradient(135deg, rgba(${t},1) 0%, rgba(255,255,255,0.95) 45%, rgba(${t},0.9) 70%, rgba(255,255,255,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-text-stroke: 0.5px rgba(255,255,255,0.35);
    filter:
        drop-shadow(0 0 4px rgba(255,255,255,0.9))
        drop-shadow(0 0 12px rgba(${t},0.8))
        drop-shadow(0 0 30px rgba(${t},0.45))
        drop-shadow(0 0 60px rgba(${t},0.2));
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
    border: 1px solid rgba(${t},0.25);
    border-top: 1px solid rgba(${l},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${i(6)},0.75) 0%, rgba(${i(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${t},0.12), 0 0 24px rgba(${t},0.06), inset 0 1px 0 rgba(${l},0.08);
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
    background: linear-gradient(180deg, transparent, rgba(${t},0.4), transparent);
}

.nf-stat-label {
    color: rgba(${t},0.75);
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 1.8px;
    text-shadow: 0 0 4px rgba(${t},0.3);
    white-space: nowrap;
}
.nf-stat-val {
    color: rgba(${l},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${l},0.7),
        0 0 12px rgba(${l},0.35),
        0 0 20px rgba(${t},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${i(8)}, 0.88);
    border: 1px solid rgba(${t},0.2);
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
    border-color: rgba(${t},0.5);
    box-shadow:
        0 0 30px rgba(${t},0.12),
        0 0 60px rgba(${t},0.06),
        inset 0 0 20px rgba(${t},0.03);
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
    background: linear-gradient(90deg, transparent, rgba(${t},0.5), transparent);
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
    color: ${o};
    text-transform: uppercase;
    text-shadow: 0 0 8px rgba(${t},0.5), 0 0 16px rgba(${t},0.2);
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
        0 0 10px rgba(${t},0.8),
        0 0 20px rgba(${t},0.5),
        0 0 35px rgba(${t},0.3);
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
    background: ${o};
    box-shadow: 0 0 6px rgba(${t},0.6);
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
    background: linear-gradient(90deg, ${o}, ${r});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${s}, ${c});
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
    background: linear-gradient(90deg, ${o}, ${d});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${s}, ${c});
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
    color: rgba(${t}, 0.35);
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(${t},0.2), 0 0 40px rgba(${t},0.1);
}

.nf-brand-logo {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    border: 2px solid rgba(${t},0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(${i(8)},0.8);
    box-shadow: 0 0 20px rgba(${t},0.15);
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
    background: rgba(${t}, 0.04);
    border: 1px solid rgba(${t}, 0.15);
    border-radius: 8px;
    color: rgba(${t}, 0.5);
    font-size: 19px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
}

.nf-close-btn:hover {
    background: rgba(${t}, 0.15);
    border-color: rgba(${t}, 0.4);
    color: #fff;
    text-shadow: 0 0 8px rgba(${t},0.5);
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
    stroke: rgba(${t},0.2);
    stroke-width: 4px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.nf-pipe-glow {
    fill: none;
    stroke: rgba(${t},0.3);
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
    fill: rgba(${t},0.9);
    filter: drop-shadow(0 0 6px rgba(${t},0.9));
}

/* ─── Particles ─── */
.nf-particle {
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(${t},0.5);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
    box-shadow: 0 0 4px rgba(${t},0.3);
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
    border: 2px solid rgba(${t},0.5);
    background: rgba(${i(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${o};
    font-size: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(${t},0.3), 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    animation: nf-toggle-pulse 2.5s ease-in-out infinite;
    font-family: 'Inter', system-ui, sans-serif;
}

#nf-toggle-btn:hover {
    transform: scale(1.1);
    border-color: rgba(${t},0.8);
    box-shadow: 0 0 30px rgba(${t},0.5), 0 4px 16px rgba(0,0,0,0.6);
    background: rgba(${t},0.15);
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
    0%, 100% { box-shadow: 0 0 20px rgba(${t},0.3), 0 4px 12px rgba(0,0,0,0.5); }
    50% { box-shadow: 0 0 30px rgba(${t},0.5), 0 4px 16px rgba(0,0,0,0.5); }
}

/* ─── Corner decorative brackets ─── */
.nf-corner-deco {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: rgba(${t},0.15);
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
    color: rgba(${t},0.35);
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
    color: ${o};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${o};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${t},0.12);
    color: ${r};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
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
    color: ${c};
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

    `}function Ot(){rt||(rt=document.createElement("style"),rt.id="netflow-overlay-styles",rt.textContent=oe(W),document.head.appendChild(rt))}function Nt(e){e.innerHTML="",X.forEach((t,l)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${t.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${l+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(a)})}function ie(){const e=document.getElementById("nf-terminal");if(!e)return;Nt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${X.length}`)}function zt(e,t){let r="";for(let u=0;u<32;u++){const w=u/32*Math.PI*2,A=(u+.2)/32*Math.PI*2,x=(u+.5)/32*Math.PI*2,m=(u+.8)/32*Math.PI*2,y=(u+1)/32*Math.PI*2;r+=`${u===0?"M":"L"}${(120+104*Math.cos(w)).toFixed(1)},${(120+104*Math.sin(w)).toFixed(1)} `,r+=`L${(120+104*Math.cos(A)).toFixed(1)},${(120+104*Math.sin(A)).toFixed(1)} `,r+=`L${(120+116*Math.cos(x)).toFixed(1)},${(120+116*Math.sin(x)).toFixed(1)} `,r+=`L${(120+104*Math.cos(m)).toFixed(1)},${(120+104*Math.sin(m)).toFixed(1)} `,r+=`L${(120+104*Math.cos(y)).toFixed(1)},${(120+104*Math.sin(y)).toFixed(1)} `}r+="Z";const c=24,p=100,v=90;let M="";for(let u=0;u<c;u++){const w=u/c*Math.PI*2,A=(u+.25)/c*Math.PI*2,x=(u+.75)/c*Math.PI*2,m=(u+1)/c*Math.PI*2;M+=`${u===0?"M":"L"}${(120+v*Math.cos(w)).toFixed(1)},${(120+v*Math.sin(w)).toFixed(1)} `,M+=`L${(120+p*Math.cos(A)).toFixed(1)},${(120+p*Math.sin(A)).toFixed(1)} `,M+=`L${(120+p*Math.cos(x)).toFixed(1)},${(120+p*Math.sin(x)).toFixed(1)} `,M+=`L${(120+v*Math.cos(m)).toFixed(1)},${(120+v*Math.sin(m)).toFixed(1)} `}M+="Z";let L="";for(let u=0;u<64;u++){const w=u/64*Math.PI*2,A=u%4===0?117:119,x=u%4===0?124:122,m=u%4===0?.8:.4,y=u%4===0?.7:.35;L+=`<line x1="${(120+A*Math.cos(w)).toFixed(1)}" y1="${(120+A*Math.sin(w)).toFixed(1)}" x2="${(120+x*Math.cos(w)).toFixed(1)}" y2="${(120+x*Math.sin(w)).toFixed(1)}" stroke="rgba(${e},${y})" stroke-width="${m}"/>`}const h=26,i=78,g=68;let k="";for(let u=0;u<h;u++){const w=u/h*Math.PI*2,A=(u+.2)/h*Math.PI*2,x=(u+.5)/h*Math.PI*2,m=(u+.8)/h*Math.PI*2,y=(u+1)/h*Math.PI*2;k+=`${u===0?"M":"L"}${(120+g*Math.cos(w)).toFixed(1)},${(120+g*Math.sin(w)).toFixed(1)} `,k+=`L${(120+g*Math.cos(A)).toFixed(1)},${(120+g*Math.sin(A)).toFixed(1)} `,k+=`L${(120+i*Math.cos(x)).toFixed(1)},${(120+i*Math.sin(x)).toFixed(1)} `,k+=`L${(120+g*Math.cos(m)).toFixed(1)},${(120+g*Math.sin(m)).toFixed(1)} `,k+=`L${(120+g*Math.cos(y)).toFixed(1)},${(120+g*Math.sin(y)).toFixed(1)} `}k+="Z";let C="";for(let u=0;u<48;u++){const w=u/48*Math.PI*2,A=u%4===0?79:80,x=u%4===0?85:83,m=u%4===0?.6:.3,y=u%4===0?.6:.3;C+=`<line x1="${(120+A*Math.cos(w)).toFixed(1)}" y1="${(120+A*Math.sin(w)).toFixed(1)}" x2="${(120+x*Math.cos(w)).toFixed(1)}" y2="${(120+x*Math.sin(w)).toFixed(1)}" stroke="rgba(${t},${y})" stroke-width="${m}"/>`}function $(u,w,A,x,m){let y="";for(let _=0;_<A;_++){const F=_/A*Math.PI*2,I=(_+.25)/A*Math.PI*2,G=(_+.75)/A*Math.PI*2,O=(_+1)/A*Math.PI*2;y+=`${_===0?"M":"L"}${(u+m*Math.cos(F)).toFixed(1)},${(w+m*Math.sin(F)).toFixed(1)} `,y+=`L${(u+x*Math.cos(I)).toFixed(1)},${(w+x*Math.sin(I)).toFixed(1)} `,y+=`L${(u+x*Math.cos(G)).toFixed(1)},${(w+x*Math.sin(G)).toFixed(1)} `,y+=`L${(u+m*Math.cos(O)).toFixed(1)},${(w+m*Math.sin(O)).toFixed(1)} `}return y+"Z"}const S=42,D=[],E=$(120,120,14,18,13);D.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${E}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let u=0;u<8;u++){const w=u/8*Math.PI*2,A=120+S*Math.cos(w),x=120+S*Math.sin(w),y=$(A,x,10,14,10),_=u%2===0?"":"animation-direction:reverse;";D.push(`<g class="nf-kinetic-sub" style="transform-origin:${A.toFixed(1)}px ${x.toFixed(1)}px;${_}">
            <path d="${y}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${A.toFixed(1)}" cy="${x.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${A.toFixed(1)}" cy="${x.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const f=D.join(`
`);let B="";for(let u=0;u<8;u++){const w=u/8*Math.PI*2,A=120+10*Math.cos(w),x=120+10*Math.sin(w),m=120+(S-10)*Math.cos(w),y=120+(S-10)*Math.sin(w);B+=`<line x1="${A.toFixed(1)}" y1="${x.toFixed(1)}" x2="${m.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${e},0.95)"/>
                <stop offset="50%" stop-color="rgba(${t},0.75)"/>
                <stop offset="100%" stop-color="rgba(${e},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${t},0.8)"/>
                <stop offset="100%" stop-color="rgba(${e},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${e},0.85)"/>
                <stop offset="50%" stop-color="rgba(${t},0.65)"/>
                <stop offset="100%" stop-color="rgba(${e},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${e},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${e},0.2)" stroke-width="0.2"/>
        </g>
        ${L}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${r}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${M}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${v}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${k}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${C}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${t},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${B}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${f}
        </g>
    </svg>`}function ae(){const e=document.createElement("div");e.id="netflow-engine-overlay",ot=document.createElement("canvas"),ot.id="nf-matrix-canvas",e.appendChild(ot);const t=document.createElement("div");t.className="nf-pat-data",e.appendChild(t);const l=document.createElement("div");l.className="nf-center-glow",e.appendChild(l);const a=document.createElement("div");a.className="nf-pat-noise",e.appendChild(a);const o=document.createElement("div");o.className="nf-vignette",e.appendChild(o);for(let C=0;C<3;C++){const $=document.createElement("div");$.className="nf-pulse-ring",e.appendChild($)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(C=>{const $=document.createElement("div");$.className=`nf-corner-deco ${C}`,e.appendChild($)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Pt(),e.appendChild(d);const s=document.createElement("div");s.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const c=document.createElement("div");c.className="nf-core-header",c.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,r.appendChild(c);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",Nt(p),r.appendChild(p);const v=document.createElement("div");v.className="nf-engine-core",v.id="nf-engine-core";const M=document.createElement("div");M.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(C=>{const $=document.createElement("div");$.className=`nf-frame-corner ${C}`,M.appendChild($)}),v.appendChild(M);const L="http://www.w3.org/2000/svg",h=document.createElementNS(L,"svg");h.setAttribute("class","nf-engine-waves"),h.setAttribute("viewBox","0 0 560 140"),h.setAttribute("preserveAspectRatio","none"),h.id="nf-engine-waves";for(let C=0;C<6;C++){const $=document.createElementNS(L,"path");$.setAttribute("fill","none"),$.setAttribute("stroke-width",C<3?"1.5":"1"),$.setAttribute("stroke",C<3?`rgba(${W.rgb},${.12+C*.08})`:`rgba(${W.accentRgb},${.08+(C-3)*.06})`),$.setAttribute("data-wave-idx",String(C)),h.appendChild($)}v.appendChild(h);const i=document.createElement("div");i.className="nf-engine-brand-inner",i.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${zt(W.rgb,W.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${zt(W.rgb,W.accentRgb)}
        </div>
    `,v.appendChild(i);const g=document.createElement("div");g.className="nf-engine-stats",g.id="nf-engine-stats",g.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([C,$,S])=>`<div class="nf-stat-item"><span class="nf-stat-label">${C}</span><span class="nf-stat-val" id="${$}">${S}</span></div>`).join(""),v.appendChild(g),r.appendChild(v),s.appendChild(r);const k=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ct.forEach((C,$)=>{const S=re(C);S.classList.add(k[$]),S.id=`nf-mod-${C.id}`,s.appendChild(S)}),e.appendChild(s);for(let C=0;C<30;C++){const $=document.createElement("div");$.className="nf-particle",$.style.left=`${5+Math.random()*90}%`,$.style.bottom=`${Math.random()*40}%`,$.style.animationDuration=`${3+Math.random()*5}s`,$.style.animationDelay=`${Math.random()*4}s`;const S=.3+Math.random()*.4,D=.7+Math.random()*.3;$.style.background=`rgba(${Math.floor(tt*D)}, ${Math.floor(et*D)}, ${Math.floor(nt*D)}, ${S})`,$.style.width=`${1+Math.random()*2}px`,$.style.height=$.style.width,e.appendChild($)}return e}function re(e){const t=document.createElement("div");t.className="nf-module";const l=document.createElement("div");l.className="nf-mod-header",l.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(l),e.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let s="";o.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${s}
        `,t.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a),t}function se(){Gt=Date.now(),vt=setInterval(()=>{const e=Math.floor((Date.now()-Gt)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),l=String(e%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${t}:${l}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${t}:${l}`)},1e3)}function qt(){vt&&(clearInterval(vt),vt=null)}const le=220,It=210,Ht=.4;let bt=[];function ce(e,t){bt=[];for(let l=0;l<le;l++){const a=Math.random();let o;a<.22?o=0:a<.4?o=1:a<.55?o=2:a<.68?o=3:a<.84?o=4:o=5;const d=Math.random()*e,s=Math.random()*t,r=50+Math.random()*220,c=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);bt.push({x:o===0?Math.random()*e:d+Math.cos(c)*r,y:o===0?Math.random()*t:s+Math.sin(c)*r,vx:(Math.random()-.5)*Ht,vy:(Math.random()-.5)*Ht,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:d,oCy:s,oRadius:r,oAngle:c,oSpeed:p})}}function de(){if(!ot)return;const e=ot;if(mt=e.getContext("2d"),!mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,bt.length===0&&ce(e.width,e.height)};t(),window.addEventListener("resize",t);let l=null,a=0,o=0;function d(){if(!mt||!ot){ht=null;return}ht=requestAnimationFrame(d);const s=mt,r=ot.width,c=ot.height;s.fillStyle=`rgba(${tt*.04|0},${et*.04|0},${nt*.06|0},1)`,s.fillRect(0,0,r,c),(!l||a!==r||o!==c)&&(a=r,o=c,l=s.createRadialGradient(r*.5,c*.5,0,r*.5,c*.5,Math.max(r,c)*.6),l.addColorStop(0,`rgba(${tt*.08|0},${et*.08|0},${nt*.1|0},0.4)`),l.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=l,s.fillRect(0,0,r,c);const p=bt,v=p.length,M=It*It;for(let h=0;h<v;h++){const i=p[h];if(i.pulsePhase+=i.pulseSpeed,i.motion===0)i.x+=i.vx,i.y+=i.vy,i.x<0?(i.x=0,i.vx=Math.abs(i.vx)*(.8+Math.random()*.4)):i.x>r&&(i.x=r,i.vx=-Math.abs(i.vx)*(.8+Math.random()*.4)),i.y<0?(i.y=0,i.vy=Math.abs(i.vy)*(.8+Math.random()*.4)):i.y>c&&(i.y=c,i.vy=-Math.abs(i.vy)*(.8+Math.random()*.4));else if(i.motion===1)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius,i.oCx+=Math.sin(i.oAngle*.3)*.15,i.oCy+=Math.cos(i.oAngle*.3)*.15;else if(i.motion===2)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius*.5,i.oCx+=Math.sin(i.oAngle*.2)*.1,i.oCy+=Math.cos(i.oAngle*.2)*.1;else if(i.motion===3){i.oAngle+=i.oSpeed;const g=i.oAngle,k=i.oRadius*.7;i.x=i.oCx+k*Math.cos(g),i.y=i.oCy+k*Math.sin(g)*Math.cos(g),i.oCx+=Math.sin(g*.15)*.12,i.oCy+=Math.cos(g*.15)*.12}else if(i.motion===4){i.oAngle+=i.oSpeed*1.2;const g=i.oRadius*(.5+.5*Math.abs(Math.sin(i.oAngle*.15)));i.x=i.oCx+Math.cos(i.oAngle)*g,i.y=i.oCy+Math.sin(i.oAngle)*g,i.oCx+=Math.sin(i.oAngle*.1)*.18,i.oCy+=Math.cos(i.oAngle*.1)*.18}else i.oAngle+=i.oSpeed,i.x+=i.vx*.8,i.y=i.oCy+Math.sin(i.oAngle+i.x*.008)*i.oRadius*.35,i.x<-30?i.x=r+30:i.x>r+30&&(i.x=-30),i.oCy+=Math.sin(i.oAngle*.1)*.08;if(i.motion>0){const g=i.oRadius+50;i.oCx<-g?i.oCx=r+g:i.oCx>r+g&&(i.oCx=-g),i.oCy<-g?i.oCy=c+g:i.oCy>c+g&&(i.oCy=-g)}}const L=5;for(let h=0;h<L;h++){const i=h/L,g=(h+1)/L,k=((i+g)*.5*.35).toFixed(3);s.beginPath(),s.strokeStyle=`rgba(${tt},${et},${nt},${k})`,s.lineWidth=(i+g)*.5*1.2;for(let C=0;C<v;C++){const $=p[C];for(let S=C+1;S<v;S++){const D=p[S],E=$.x-D.x,f=$.y-D.y,B=E*E+f*f;if(B<M){const u=1-Math.sqrt(B)/It;u>=i&&u<g&&(s.moveTo($.x,$.y),s.lineTo(D.x,D.y))}}}s.stroke()}s.save(),s.shadowColor=`rgba(${tt},${et},${nt},0.8)`,s.shadowBlur=25;for(let h=0;h<v;h++){const i=p[h],g=.6+.4*Math.sin(i.pulsePhase),k=i.radius*(.8+g*.4),C=tt+(255-tt)*.7*g|0,$=et+(255-et)*.7*g|0,S=nt+(255-nt)*.7*g|0;s.beginPath(),s.arc(i.x,i.y,k,0,Math.PI*2),s.fillStyle=`rgba(${C},${$},${S},${(.6+g*.4).toFixed(2)})`,s.fill()}s.restore(),s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<v;h++){const i=p[h];if(i.radius>2){const g=.6+.4*Math.sin(i.pulsePhase),k=i.radius*(.8+g*.4)*.35;s.moveTo(i.x+k,i.y),s.arc(i.x,i.y,k,0,Math.PI*2)}}s.fill(),s.fillStyle=`rgba(${tt},${et},${nt},0.08)`;for(let h=0;h<6;h++)s.fillRect(Math.random()*r,Math.random()*c,1,1)}d()}function pe(){ht!==null&&(cancelAnimationFrame(ht),ht=null),ot=null,mt=null,bt=[]}function Vt(){gt=requestAnimationFrame(Vt),Ct+=.035;const e=document.getElementById("nf-engine-waves");if(!e){gt=null;return}const t=560,l=140,a=t/2;e.querySelectorAll("path").forEach(d=>{const s=parseInt(d.getAttribute("data-wave-idx")||"0",10),r=10+s*5,c=1.2+s*.35,p=s*.6,v=.7+s*.12;let M=`M 0 ${l/2}`;for(let L=0;L<=t;L+=3){const h=Math.abs(L-a)/a,i=Math.pow(Math.min(1,h*1.6),.6),g=l/2+r*i*Math.sin(L/t*c*Math.PI*2+Ct*v+p);M+=` L ${L} ${Math.round(g*10)/10}`}d.setAttribute("d",M)})}function fe(){Ct=0,Vt(),de(),$t=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),l=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),l&&(l.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Ut(){gt!==null&&(cancelAnimationFrame(gt),gt=null),$t&&(clearInterval($t),$t=null),pe()}function St(){let e=0;const t=X.filter(r=>r.status!=="skipped").length;for(const r of X){const c=document.getElementById(`nf-proc-${r.stepId}`);if(!c)continue;c.className="nf-proc-row";const p=c.querySelector(".nf-proc-badge");switch(r.status){case"done":c.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),e++;break;case"active":c.classList.add("nf-proc-active"),p&&(p.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":c.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":c.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:c.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const l=document.getElementById("nf-step-counter");l&&(l.textContent=`${e}/${X.length}`);const a=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");e>=t&&t>0?(a&&(a.textContent="COMPLETE",a.style.color=W.doneHex),o&&(o.style.background=W.doneHex,o.style.boxShadow=`0 0 8px rgba(${W.doneRgb},0.7)`)):X.some(c=>c.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(c=>c.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=W.hex,a.style.textShadow=`0 0 10px rgba(${W.rgb},0.5)`);const d=document.getElementById("nf-terminal"),s=d==null?void 0:d.querySelector(".nf-proc-active");s&&d&&s.scrollIntoView({behavior:"smooth",block:"center"})}function Wt(){Y&&Y.isConnected||(Ot(),Y=document.createElement("button"),Y.id="nf-toggle-btn",Y.className="nf-toggle-visible",Y.innerHTML=lt?"⚡":"✕",Y.title="ซ่อน/แสดง Netflow Overlay",Y.onclick=()=>Pt(),document.body.appendChild(Y))}function Pt(){K&&(Wt(),lt?(K.classList.remove("nf-hidden"),K.classList.add("nf-visible"),Y&&(Y.innerHTML="✕"),lt=!1):(K.classList.remove("nf-visible"),K.classList.add("nf-hidden"),Y&&(Y.innerHTML="⚡"),lt=!0))}const Yt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Xt(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=ut;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const l=Yt[t]||Yt.red;let a;try{a=chrome.runtime.getURL(l)}catch{a=`/${l}`}const o=W.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${a}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${o},0.45)`,e.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function At(e=1){if(W=ne(),Lt(),K){lt&&Pt();return}if(rt&&(rt.remove(),rt=null),Ot(),Et=e,X=Mt(e),e>1){const t=ct.find(a=>a.id==="video");if(t){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=e;o++)a.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),a.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),a.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});t.steps=a}const l=ct.find(a=>a.id==="render");if(l){const a=l.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const o=l.steps.find(d=>d.id==="upscale");o&&(o.label="Full Video")}}K=ae(),document.body.appendChild(K),lt=!1,Wt(),se(),fe(),requestAnimationFrame(()=>Xt())}function ue(){qt(),Ut(),lt=!1,K&&(K.classList.add("nf-fade-out"),setTimeout(()=>{K==null||K.remove(),K=null},500)),Y&&(Y.remove(),Y=null)}const ge={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function me(e,t,l){const a=X.filter(r=>r.status==="done").length,o=X.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${a}/${o}`);const s=document.getElementById("nf-stat-scenes");if(s&&(s.textContent=Et>1?`1/${Et}`:"1/1"),t==="active"){const r=document.getElementById("nf-stat-status"),c=ge[e]||e.toUpperCase();r&&(r.textContent=c)}else if(t==="done"&&a>=o){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(t==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}if(l!==void 0&&l>0){const r=document.getElementById("nf-stat-progress");r&&(r.textContent=`${Math.min(100,l)}%`)}}function P(e,t,l){if(!K)return;for(const o of ct)for(const d of o.steps)d.id===e&&(d.status=t,l!==void 0&&(d.progress=l));for(const o of X)o.stepId===e&&(o.status=t,l!==void 0&&(o.progress=l));const a=document.getElementById(`nf-step-${e}`);if(a&&(a.className="nf-step",t==="active"?a.classList.add("nf-step-active"):t==="done"?a.classList.add("nf-step-done"):t==="error"&&a.classList.add("nf-step-error")),me(e,t,l),l!==void 0){const o=document.getElementById(`nf-bar-${e}`);o&&(o.style.width=`${Math.min(100,l)}%`)}Tt(),St()}function pt(e){P(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function wt(e=4e3){qt(),Ut(),Tt(),St(),setTimeout(()=>ue(),e)}function Tt(){for(const e of ct){const t=e.steps.filter(c=>c.status!=="skipped").length,l=e.steps.filter(c=>c.status==="done").length,a=e.steps.some(c=>c.status==="active"),o=t>0?Math.round(l/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${o}%`);const s=document.getElementById(`nf-modbar-${e.id}`);s&&(s.style.width=`${o}%`);const r=document.getElementById(`nf-mod-${e.id}`);r&&(r.classList.remove("nf-active","nf-done"),o>=100?r.classList.add("nf-done"):a&&r.classList.add("nf-active"))}}function he(e){var a,o,d,s;Et=e;const t=new Map;for(const r of X)t.set(r.stepId,{status:r.status,progress:r.progress});X=Mt(e);for(const r of X){const c=t.get(r.stepId);c&&(r.status=c.status,c.progress!==void 0&&(r.progress=c.progress))}if(ie(),e>1){const r=ct.find(c=>c.id==="video");if(r){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=r.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=r.steps.find(p=>p.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=r.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=r.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)c.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),c.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),c.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});r.steps=c,jt(r)}}const l=ct.find(r=>r.id==="render");if(l&&e>1){const r=l.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const c=l.steps.find(p=>p.id==="upscale");c&&(c.label="Full Video"),jt(l)}Tt(),St()}function jt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),e.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let s="";o.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${s}
        `,t.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a)}function Kt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Kt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},T=e=>{console.warn(`[Netflow AI] ${e}`);try{Kt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},_t=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Bt=/Win/i.test(navigator.userAgent),ft=_t?"🍎 Mac":Bt?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ft}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const l=t.tagName.toLowerCase(),a=Math.round(e.clientX),o=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${a},${o}) → <${l}> "${d}"`)},!0);const b=e=>new Promise(t=>setTimeout(t,e));function dt(){return!!window.__NETFLOW_STOP__}function Jt(){var a;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.getElementById("netflow-engine-overlay"),l=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const o of l){if(t&&t.contains(o))continue;const d=(o.textContent||"").trim().toLowerCase();if(!(d.length>200||d.length<5)){for(const s of e)if(d.includes(s))return((a=o.textContent)==null?void 0:a.trim())||s}}return null}async function Z(e){const t=e.getBoundingClientRect(),l=t.left+t.width/2,a=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:l,clientY:a,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",o)),await b(80),e.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",o)),e.dispatchEvent(new MouseEvent("click",o)),await b(50),e.click()}function be(e){const t=e.getBoundingClientRect(),l=t.left+t.width/2,a=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:l,clientY:a};e.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",o)),e.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",o)),e.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",o))}function we(e){const t=[],l=document.querySelectorAll("i");for(const a of l){if((a.textContent||"").trim()!==e)continue;let d=a,s=null,r=1/0;for(let c=0;c<20&&d&&(d=d.parentElement,!(!d||d===document.body));c++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const v=p.width*p.height;v<r&&(s=d,r=v)}}s&&!t.includes(s)&&t.push(s)}return t.sort((a,o)=>{const d=a.getBoundingClientRect(),s=o.getBoundingClientRect();return d.left-s.left}),t}function Ft(e=!1){const t=[],l=document.querySelectorAll("video");for(const s of l){let r=s.parentElement;for(let c=0;c<10&&r;c++){const p=r.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:r,left:p.left});break}r=r.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of a){const r=(s.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let c=s.parentElement;for(let p=0;p<10&&c;p++){const v=c.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){t.push({el:c,left:v.left});break}c=c.parentElement}}}const o=document.querySelectorAll("img");for(const s of o){const r=(s.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let c=s.parentElement;for(let p=0;p<10&&c;p++){const v=c.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){t.push({el:c,left:v.left});break}c=c.parentElement}}}const d=Array.from(new Set(t.map(s=>s.el))).map(s=>t.find(r=>r.el===s));if(d.sort((s,r)=>s.left-r.left),d.length>0){const s=d[0].el,r=s.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),s}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function xe(){const e=we("image");if(e.length>0){const l=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const l of t){let a=l.parentElement;for(let o=0;o<10&&a;o++){const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function ye(e,t){var r;const[l,a]=e.split(","),o=((r=l.match(/:(.*?);/))==null?void 0:r[1])||"image/png",d=atob(a),s=new Uint8Array(d.length);for(let c=0;c<d.length;c++)s[c]=d.charCodeAt(c);return new File([s],t,{type:o})}function xt(e){var a;const t=[],l=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of l)if(((a=o.textContent)==null?void 0:a.trim())===e){const d=o.closest("button");d&&t.push(d)}return t}function ve(){const e=[...xt("add"),...xt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const o of a){const d=o.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const s=(o.textContent||"").trim();if(s==="+"||s==="add")return o}}return null}let t=null,l=0;for(const a of e){const o=a.getBoundingClientRect();o.y>l&&(l=o.y,t=a)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${l.toFixed(0)}`),t}function Zt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=xt(a);let d=null,s=0;for(const r of o){const c=r.getBoundingClientRect();c.y>s&&(s=c.y,d=r)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${s.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,l=0;for(const a of e){const o=a.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const d=Math.abs(o.width-o.height)<10&&o.width<60,s=o.y+o.x+(d?1e3:0);s>l&&(l=s,t=a)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const a of e){const o=(a.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return a}return null}function Qt(){const e=document.querySelectorAll("textarea");for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const t=document.querySelectorAll('[contenteditable="true"]');for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const l=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of l){const o=a.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return a}return e.length>0?e[e.length-1]:null}async function Rt(e,t){var l,a,o,d;e.focus(),await b(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(c),await b(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await b(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(s);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(r),await b(800);const c=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await b(200);const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});e.dispatchEvent(r),await b(800);const c=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((l=navigator.clipboard)!=null&&l.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=t,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await b(200),document.execCommand("paste"),await b(500);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(e).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(s){let r=e[s];for(let c=0;c<30&&r;c++){const p=r.memoizedProps,v=r.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const M=p.editor;M.selection,M.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(o=v==null?void 0:v.memoizedState)==null?void 0:o.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),v.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function $e(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const l of t)e.push({input:l,origType:"file"}),l.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function Ee(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ft})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ft})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function ke(e,t,l){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...e.map(v=>v.input)];for(const v of a)!o.includes(v)&&v.offsetParent===null&&o.push(v);for(const v of o)v.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ft})`),!1;let s;if(l&&l.size>0){const v=Array.from(d).filter(M=>!l.has(M));v.length>0?(s=v[v.length-1],n(`เล็งเป้า file input ใหม่ (${v.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const r=new DataTransfer;r.items.add(t);try{s.files=r.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(v){n(`กำหนด target.files ล้มเหลว: ${v.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:r.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(M){return T(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${M.message}`),!1}}const c=s._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const v=new DataTransfer;v.items.add(t);const M=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:v});s.dispatchEvent(M),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ft}`),!0}function yt(){let e=0;const t=document.getElementById("netflow-engine-overlay"),l=document.querySelectorAll("img");for(const o of l){if(t&&t.contains(o))continue;const d=o.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&o.src&&o.offsetParent!==null&&e++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of a){if(t&&t.contains(o))continue;const d=o.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&o.offsetParent!==null&&e++}return e}async function te(e,t){var v;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const l=ye(e,t);n(`ขนาดไฟล์: ${(l.size/1024).toFixed(1)} KB`);const a=yt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const o=async(M,L=8e3)=>{const h=Date.now();for(;Date.now()-h<L;){const i=yt();if(i>a)return n(`✅ [${M}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${i}`),!0;await b(500)}return n(`⚠️ [${M}] รูปย่อไม่เพิ่ม (ยังคง ${yt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=ve();if(!d)return T("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const r=Ee();let c=$e();const p=new MutationObserver(M=>{for(const L of M)for(const h of L.addedNodes)if(h instanceof HTMLInputElement&&h.type==="file"&&(h.type="text",c.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),h instanceof HTMLElement){const i=h.querySelectorAll('input[type="file"]');for(const g of i)g.type="text",c.push({input:g,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await b(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let M=!1;const L=Date.now();for(;!M&&Date.now()-L<5e3;){const i=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const g of i){if(g===d)continue;const k=g.querySelectorAll("i");for(const C of k){const $=((v=C.textContent)==null?void 0:v.trim())||"";if(($==="upload"||$==="upload_file")&&!Array.from(g.querySelectorAll("i")).map(D=>{var E;return(E=D.textContent)==null?void 0:E.trim()}).includes("drive_folder_upload")){g.click(),M=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${$}) ✅`);break}}if(M)break}if(!M)for(const g of i){if(g===d)continue;const k=g.childNodes.length<=5?(g.textContent||"").trim():"";if(k.length>0&&k.length<40){const C=k.toLowerCase();if(C==="upload"||C==="อัปโหลด"||C==="อัพโหลด"||C.includes("upload image")||C.includes("upload photo")||C.includes("อัปโหลดรูปภาพ")||C.includes("อัพโหลดรูปภาพ")||C.includes("from computer")||C.includes("จากคอมพิวเตอร์")){g.click(),M=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${k}") ✅`);break}}}M||await b(500)}return M?(await b(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),ke(c,l,s)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(T(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(T("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),r();for(const M of c)M.input.type!=="file"&&(M.input.type="file")}}async function Ce(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const l=document.querySelectorAll("button");let a=null;for(const h of l){const i=h.textContent||"";if((i.includes("Nano Banana")||i.includes("Imagen")||i.includes("วิดีโอ")||i.includes("รูปภาพ")||i.includes("Image")||i.includes("Video"))&&h.getBoundingClientRect().bottom>window.innerHeight*.7){a=h,n(`พบปุ่มตั้งค่าจากข้อความ: "${i.substring(0,30).trim()}"`);break}}if(!a)for(const h of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const i=xt(h);for(const g of i)if(g.getBoundingClientRect().bottom>window.innerHeight*.7){a=g,n(`พบปุ่มตั้งค่าจากไอคอน: ${h}`);break}if(a)break}if(!a)return T("ไม่พบปุ่มตั้งค่า"),!1;const o=a.getBoundingClientRect(),d=o.left+o.width/2,s=o.top+o.height/2,r={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await b(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("คลิกปุ่มตั้งค่าแล้ว"),await b(1500);let c=!1,p=null;const v=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const h of v){const i=h.getAttribute("aria-controls")||"",g=h.id||"";if(i.toUpperCase().includes("IMAGE")||g.toUpperCase().includes("IMAGE")){p=h,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${i})`);break}}if(!p)for(const h of document.querySelectorAll('[role="tab"]')){const i=h.id||"";if(i.toUpperCase().includes("TRIGGER-IMAGE")){p=h,n(`พบแท็บ Image ผ่าน id: ${i}`);break}}if(!p)for(const h of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const i=(h.textContent||"").trim();if((i==="Image"||i.endsWith("Image")||i==="รูปภาพ"||i==="ภาพ")&&!i.includes("Video")&&!i.includes("วิดีโอ")){p=h,n(`พบแท็บ Image ผ่านข้อความ: "${i}"`);break}}if(p){const h=p.getAttribute("data-state")||"",i=p.getAttribute("aria-selected")||"";if(h==="active"||i==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const g=p.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",k)),await b(80),p.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",k)),p.dispatchEvent(new MouseEvent("click",k)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await b(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const M=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const h of document.querySelectorAll("button, [role='tab'], [role='option']")){const i=(h.textContent||"").trim();if(i===M||i.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const g=h.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",k)),await b(80),h.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",k)),h.dispatchEvent(new MouseEvent("click",k)),n(`เลือกทิศทาง: ${M}`),await b(400);break}}const L=`x${t}`;for(const h of document.querySelectorAll("button, [role='tab'], [role='option']"))if((h.textContent||"").trim()===L){const g=h.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",k)),await b(80),h.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",k)),h.dispatchEvent(new MouseEvent("click",k)),n(`เลือกจำนวน: ${L}`),await b(400);break}return await b(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await b(300),a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await b(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("ปิดหน้าตั้งค่าแล้ว"),await b(600),!0}async function Me(e){var $,S,D,E;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,l=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=l?l[1]:"unknown",o=_t?"macOS":Bt?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=_t?((S=($=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:$[1])==null?void 0:S.replace(/_/g,"."))||"":Bt&&((D=t.match(/Windows NT ([0-9.]+)/))==null?void 0:D[1])||"",s=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${r} | แพลตฟอร์ม: ${ft}`),n("══════════════════════════════════════════");try{kt(e.theme)}catch{}try{At()}catch(f){console.warn("Overlay show error:",f)}const c=[],p=[];try{P("settings","active");const f=e.orientation||"horizontal",B=e.outputCount||1,u=await Ce(f,B);c.push(u?"✅ Settings":"⚠️ Settings"),P("settings",u?"done":"error")}catch(f){T(`ตั้งค่าผิดพลาด: ${f.message}`),c.push("⚠️ Settings"),P("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const v=()=>{const f=document.querySelectorAll("span, div, p, label");for(const B of f){const u=(B.textContent||"").trim();if(/^\d{1,3}%$/.test(u)){if(u==="100%")return null;const w=B.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>0&&w.top<window.innerHeight)return u}}return null},M=async f=>{n(`รอการอัพโหลด ${f} เสร็จ...`),await b(2e3);const B=Date.now(),u=6e4;let w="",A=Date.now();const x=15e3;for(;Date.now()-B<u;){const m=v();if(m){if(m!==w)w=m,A=Date.now();else if(Date.now()-A>x){n(`✅ อัพโหลด ${f} — % ค้างที่ ${m} นาน ${x/1e3} วินาที ถือว่าเสร็จ`),await b(1e3);return}n(`กำลังอัพโหลด: ${m} — รอ...`),await b(1500)}else{n(`✅ อัพโหลด ${f} เสร็จ — ไม่พบตัวบอก %`),await b(1e3);return}}T(`⚠️ อัพโหลด ${f} หมดเวลาหลัง ${u/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){P("upload-char","active");try{const f=await te(e.characterImage,"character.png");c.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||p.push("character upload failed"),P("upload-char",f?"done":"error")}catch(f){T(`อัพโหลดตัวละครผิดพลาด: ${f.message}`),c.push("❌ ตัวละคร"),p.push("character upload error"),P("upload-char","error")}await M("character")}else pt("upload-char");if(e.productImage){P("upload-prod","active");try{const f=await te(e.productImage,"product.png");c.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||p.push("product upload failed"),P("upload-prod",f?"done":"error")}catch(f){T(`อัพโหลดสินค้าผิดพลาด: ${f.message}`),c.push("❌ สินค้า"),p.push("product upload error"),P("upload-prod","error")}await M("product")}else pt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await b(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await b(800);const L=v();L&&(n(`⚠️ อัพโหลดยังแสดง ${L} — รอเพิ่มเติม...`),await M("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await b(1e3);const h=(e.characterImage?1:0)+(e.productImage?1:0);if(h>0){let f=yt();f<h&&(n(`⏳ เห็นรูปย่อแค่ ${f}/${h} — รอ 3 วินาที...`),await b(3e3),f=yt()),f>=h?n(`✅ ยืนยันรูปย่ออ้างอิง: ${f}/${h}`):T(`⚠️ คาดว่าจะมี ${h} รูปย่อ แต่พบ ${f} — ดำเนินการต่อ`)}if(dt()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{wt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await b(1e3);const i=Qt();i?(await Rt(i,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),P("img-prompt","done")):(T("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),p.push("prompt input not found"),P("img-prompt","error")),await b(800);const g=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&g.add(f.src)}),n(`บันทึกรูปเดิม: ${g.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await b(500);const k=Zt();if(k){const f=k.getBoundingClientRect(),B=f.left+f.width/2,u=f.top+f.height/2,w={bubbles:!0,cancelable:!0,clientX:B,clientY:u,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",w)),await b(80),k.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",w)),k.dispatchEvent(new MouseEvent("click",w)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await b(500),k.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",w)),await b(80),k.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",w)),k.dispatchEvent(new MouseEvent("click",w)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else T("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),p.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await b(15e3);const f=document.getElementById("netflow-engine-overlay"),B=()=>{const m=document.querySelectorAll("div, span, p, label, strong, small");for(const y of m){if(f&&f.contains(y))continue;const _=(y.textContent||"").trim();if(_.length>10)continue;const F=_.match(/(\d{1,3})\s*%/);if(!F)continue;const I=parseInt(F[1],10);if(I<1||I>100)continue;const G=y.getBoundingClientRect();if(!(G.width===0||G.width>150)&&!(G.top<0||G.top>window.innerHeight))return I}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let u=null,w=-1,A=0;const x=Date.now();for(;!u&&Date.now()-x<18e4;){const m=document.querySelectorAll("img");for(const y of m){if(g.has(y.src)||!(y.alt||"").toLowerCase().includes("generated"))continue;const F=y.getBoundingClientRect();if(F.width>120&&F.height>120&&F.top>0&&F.top<window.innerHeight*.85){const I=y.closest("div");if(I){u=I,n(`พบรูป AI จาก alt="${y.alt}": ${y.src.substring(0,80)}...`);break}}}if(!u)for(const y of m){if(g.has(y.src))continue;const _=y.closest("div"),F=(_==null?void 0:_.textContent)||"";if(F.includes("product.png")||F.includes("character.png")||F.includes(".png")||F.includes(".jpg"))continue;const I=y.getBoundingClientRect();if(I.width>120&&I.height>120&&I.top>0&&I.top<window.innerHeight*.85){const G=y.closest("div");if(G){u=G,n(`พบรูปใหม่ (สำรอง): ${y.src.substring(0,80)}...`);break}}}if(!u){if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const y=Jt();if(y){T(`❌ สร้างรูปล้มเหลว: ${y}`),p.push(`image gen failed: ${y}`),P("img-wait","error");break}const _=B();_!==null?(_!==w&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${_}%`),w=_,P("img-wait","active",_)),A=Date.now()):w>30&&Math.floor((Date.now()-A)/1e3)>=3&&n(`🖼️ % หายที่ ${w}% — รูปน่าจะเสร็จแล้ว`),await b(3e3)}}if(!u)T("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),P("img-wait","done",100);const m=u.getBoundingClientRect(),y=m.left+m.width/2,_=m.top+m.height/2,F={bubbles:!0,cancelable:!0,clientX:y,clientY:_};u.dispatchEvent(new PointerEvent("pointerenter",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseenter",F)),u.dispatchEvent(new PointerEvent("pointerover",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseover",F)),u.dispatchEvent(new PointerEvent("pointermove",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousemove",F)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await b(1500);let I=null;for(const G of["more_vert","more_horiz","more"]){const O=xt(G);for(const V of O){const z=V.getBoundingClientRect();if(z.top>=m.top-20&&z.top<=m.bottom&&z.right>=m.right-150&&z.right<=m.right+20){I=V;break}}if(I)break}if(!I){const G=document.querySelectorAll("button");for(const O of G){const V=O.getBoundingClientRect();if(V.width<50&&V.height<50&&V.top>=m.top-10&&V.top<=m.top+60&&V.left>=m.right-80){const z=O.querySelectorAll("i");for(const Q of z)if((((E=Q.textContent)==null?void 0:E.trim())||"").includes("more")){I=O;break}if(I)break;const H=O.getAttribute("aria-label")||"";if(H.includes("เพิ่มเติม")||H.includes("more")){I=O;break}}}}if(!I)T("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const G=I.getBoundingClientRect(),O=G.left+G.width/2,V=G.top+G.height/2,z={bubbles:!0,cancelable:!0,clientX:O,clientY:V,button:0};I.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mousedown",z)),await b(80),I.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseup",z)),I.dispatchEvent(new MouseEvent("click",z)),n("คลิกปุ่ม 3 จุดแล้ว"),await b(1500);let H=null;const Q=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of Q){const J=(U.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){H=U;break}}if(!H)T("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const U=H.getBoundingClientRect(),J=U.left+U.width/2,N=U.top+U.height/2,R={bubbles:!0,cancelable:!0,clientX:J,clientY:N,button:0};H.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousedown",R)),await b(80),H.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mouseup",R)),H.dispatchEvent(new MouseEvent("click",R)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),P("animate","done"),await b(3e3)}}}}catch(f){T(`ขั้น 4 ผิดพลาด: ${f.message}`),c.push("⚠️ Animate")}if(dt()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{wt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await b(3e3);let f=!1;const B=document.querySelectorAll("button, span, div");for(const A of B){const x=(A.textContent||"").trim(),m=A.getBoundingClientRect();if((x==="วิดีโอ"||x==="Video"||x.includes("วิดีโอ"))&&m.bottom>window.innerHeight*.7){f=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}f||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await b(1e3);const u=Qt();u?(await Rt(u,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),P("vid-prompt","done")):(T("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),p.push("video prompt input not found"),P("vid-prompt","error")),await b(1e3),P("vid-generate","active");const w=Zt();if(w){const A=w.getBoundingClientRect(),x=A.left+A.width/2,m=A.top+A.height/2,y={bubbles:!0,cancelable:!0,clientX:x,clientY:m,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",y)),await b(80),w.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",y)),w.dispatchEvent(new MouseEvent("click",y)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),P("vid-generate","done"),await b(500),w.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",y)),await b(80),w.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",y)),w.dispatchEvent(new MouseEvent("click",y)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else T("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),p.push("video generate button not found"),P("vid-generate","error")}catch(f){T(`ขั้น 5 ผิดพลาด: ${f.message}`),c.push("⚠️ Video Gen"),p.push(`video gen error: ${f.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pt("animate"),pt("vid-prompt"),pt("vid-generate"),pt("vid-wait");if(e.videoPrompt){P("vid-wait","active");const f=e.sceneCount||1,B=e.videoScenePrompts||[e.videoPrompt];if(f>1)try{he(f)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${f>1?`ต่อ ${f} ฉาก`:"ดาวน์โหลด"} ===`);const u=document.getElementById("netflow-engine-overlay"),w=()=>{const m=document.querySelectorAll("div, span, p, label, strong, small");for(const y of m){if(u&&u.contains(y))continue;const _=(y.textContent||"").trim();if(_.length>10)continue;const F=_.match(/(\d{1,3})\s*%/);if(!F)continue;const I=parseInt(F[1],10);if(I<1||I>100)continue;const G=y.getBoundingClientRect();if(!(G.width===0||G.width>150)&&!(G.top<0||G.top>window.innerHeight))return I}return null},A=async(m=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await b(5e3);const y=()=>{const R=document.querySelectorAll("div, span, p, label, strong, small");let q=0;for(const j of R){if(u&&u.contains(j))continue;const it=(j.textContent||"").trim();if(it.includes("%")&&it.length<15){const st=j.tagName.toLowerCase(),ee=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Dt=j.getBoundingClientRect();if(n(`  🔍 "${it}" ใน <${st}.${ee}> ที่ (${Dt.left.toFixed(0)},${Dt.top.toFixed(0)}) w=${Dt.width.toFixed(0)}`),q++,q>=5)break}}q===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},_=Ft();n(_?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),y();const F=Date.now();let I=-1,G=0,O=!1;for(;Date.now()-F<m;){const R=w();if(R!==null){if(R!==I&&(n(`ความคืบหน้าวิดีโอ: ${R}%`),I=R,P("vid-wait","active",R)),G=Date.now(),R>=100){n("✅ ตรวจพบ 100%!"),O=!0;break}}else if(I>30){const q=Math.floor((Date.now()-G)/1e3);if(q>=5){n(`✅ % หายไปที่ ${I}% (หาย ${q} วินาที) — วิดีโอเสร็จ!`),O=!0;break}n(`⏳ % หายที่ ${I}% — ยืนยันใน ${5-q} วินาที...`)}else{const q=Math.floor((Date.now()-F)/1e3);q%15<3&&n(`⏳ รอ... (${q} วินาที) ไม่พบ %`)}if(!O&&I>0&&Ft(!0)&&!_){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${I}% — วิดีโอเสร็จ!`),O=!0;break}if(dt())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(I<1){const q=Jt();if(q)return T(`❌ สร้างวิดีโอล้มเหลว: ${q}`),null}await b(3e3)}const V=Ft();if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),P("vid-wait","error"),null;const z=V;O?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await b(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const H=z.getBoundingClientRect();let Q=H.left+H.width/2,U=H.top+H.height/2,J=z;const N=z.querySelector("video, img, canvas");if(N){const R=N.getBoundingClientRect();R.width>50&&R.height>50&&(Q=R.left+R.width/2,U=R.top+R.height/2,J=N,n(`🎯 พบรูปย่อ <${N.tagName.toLowerCase()}> ในการ์ดที่ (${Q.toFixed(0)},${U.toFixed(0)}) ${R.width.toFixed(0)}x${R.height.toFixed(0)}`))}else U=H.top+H.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${Q.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${Q.toFixed(0)}, ${U.toFixed(0)})...`),be(J);for(let R=0;R<8;R++){const q={bubbles:!0,cancelable:!0,clientX:Q+R%2,clientY:U};J.dispatchEvent(new PointerEvent("pointermove",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",q)),await b(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:f,scenePrompts:B,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${f} ฉาก, ${B.length} prompts, theme: ${e.theme})`)}catch(R){n(`⚠️ ไม่สามารถบันทึก pending action: ${R.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await x(z),J!==z&&await x(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),z},x=async m=>{const y=m.getBoundingClientRect(),_=y.left+y.width/2,F=y.top+y.height/2,I={bubbles:!0,cancelable:!0,clientX:_,clientY:F,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",I)),await b(80),m.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",I)),m.dispatchEvent(new MouseEvent("click",I)),await b(50),m.click(),n("คลิกการ์ดวิดีโอแล้ว"),await b(2e3)};try{await A()?(c.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action")):(T("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),P("vid-wait","error"))}catch(m){T(`ขั้น 6 ผิดพลาด: ${m.message}`),c.push("⚠️ Step6"),p.push(`step 6: ${m.message}`)}}const C=p.length===0;try{wt(C?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:C,message:C?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${p.join(", ")}`,step:C?"done":"partial"}}async function Ie(e,t=[],l){var C;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{l&&kt(l)}catch{}try{At(e)}catch($){n(`⚠️ showOverlay error: ${$.message}`)}try{const $=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const S of $)P(S,"done");e>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${$.length} steps done, sceneCount=${e}`)}catch($){n(`⚠️ overlay restore error: ${$.message}`)}await b(1500);const a=(()=>{for(const $ of document.querySelectorAll("button")){const S=$.querySelectorAll("i");for(const E of S){const f=(E.textContent||"").trim();if(f==="volume_up"||f==="volume_off"||f==="volume_mute"){const B=$.getBoundingClientRect();if(B.width>0&&B.height>0)return $}}const D=($.getAttribute("aria-label")||"").toLowerCase();if(D.includes("mute")||D.includes("ปิดเสียง")){const E=$.getBoundingClientRect();if(E.width>0&&E.height>0)return $}}return null})();if(a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await b(2e3);for(let x=2;x<=e;x++){const m=t[x-1];if(!m){T(`ไม่พบ prompt สำหรับฉากที่ ${x}`);continue}n(`── ฉากที่ ${x}/${e}: วาง prompt + generate ──`);let y=null;const _=Date.now();for(;!y&&Date.now()-_<1e4;){const N=document.querySelectorAll("[data-slate-editor='true']");if(N.length>0&&(y=N[N.length-1]),!y){const R=document.querySelectorAll("[role='textbox'][contenteditable='true']");R.length>0&&(y=R[R.length-1])}y||await b(1e3)}if(!y){T("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${y.tagName.toLowerCase()}> ${y.className.substring(0,40)}`),await Rt(y,m),n(`วาง prompt ฉาก ${x} (${m.length} ตัวอักษร) ✅`);try{P(`scene${x}-prompt`,"done"),P(`scene${x}-gen`,"active")}catch{}await b(1e3);const F=y.getBoundingClientRect();let I=null,G=1/0;for(const N of document.querySelectorAll("button")){if(N.disabled)continue;const R=N.querySelectorAll("i");let q=!1;for(const st of R)if((st.textContent||"").trim()==="arrow_forward"){q=!0;break}if(!q)continue;const j=N.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const it=Math.abs(j.top-F.top)+Math.abs(j.right-F.right);it<G&&(G=it,I=N)}if(!I)for(const N of document.querySelectorAll("button")){const R=N.querySelectorAll("i");for(const q of R)if((q.textContent||"").trim()==="arrow_forward"){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0){I=N;break}}if(I)break}if(!I){T("ไม่พบปุ่ม Generate/Send");return}await new Promise(N=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:l,sceneCount:e,currentScene:x}},()=>N())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${x}/${e})`),await Z(I),n(`คลิก Generate ฉาก ${x} ✅`);try{P(`scene${x}-gen`,"done"),P(`scene${x}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${x} gen เสร็จ ──`),await b(5e3);const O=document.getElementById("netflow-engine-overlay");let V=0,z=0;const H=Date.now(),Q=6e5,U=5e3;let J=!1;for(;Date.now()-H<Q;){let N=null;const R=document.querySelectorAll("div, span, p, label, strong, small");for(const q of R){if(O&&O.contains(q))continue;const it=(q.textContent||"").trim().match(/^(\d{1,3})%$/);if(it){const st=q.getBoundingClientRect();if(st.width>0&&st.height>0&&st.width<120&&st.height<60){N=parseInt(it[1],10);break}}}if(N!==null)N!==V&&(n(`🎬 ฉาก ${x} ความคืบหน้า: ${N}%`),V=N),z=0;else if(V>0){if(z===0)z=Date.now(),n(`🔍 ฉาก ${x}: % หายไป (จาก ${V}%) — กำลังยืนยัน...`);else if(Date.now()-z>=U){n(`✅ ฉาก ${x}: % หายไป ${U/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(dt()){n("⛔ ผู้ใช้สั่งหยุด");return}await b(2e3)}J||T(`ฉาก ${x} หมดเวลา`),n(`✅ ฉาก ${x} เสร็จแล้ว`);try{P(`scene${x}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await b(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}await b(2e3);const $=Date.now();let S=null;const D=Date.now();for(;!S&&Date.now()-D<1e4;){for(const x of document.querySelectorAll("button")){const m=x.querySelector("i");if(m&&(m.textContent||"").trim()==="download"){const y=x.getBoundingClientRect();if(y.width>0&&y.height>0){S=x;break}}}S||await b(1e3)}if(!S){T("ไม่พบปุ่มดาวน์โหลด");return}await Z(S),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await b(1500);let E=null;for(let x=0;x<3&&!E;x++){x>0&&n(`🔄 ลองหา 720p ครั้งที่ ${x+1}...`);let m=null;const y=Date.now();for(;!m&&Date.now()-y<5e3;){for(const O of document.querySelectorAll("[role='menuitem']"))if((O.textContent||"").trim().includes("Full Video")&&O.querySelector("i")){const z=O.getBoundingClientRect();if(z.width>0&&z.height>0){m=O;break}}m||await b(500)}if(!m){T("ไม่พบ Full Video");continue}const _=m.getBoundingClientRect(),F=_.left+_.width/2,I=_.top+_.height/2;m.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:F,clientY:I})),m.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:I})),m.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F,clientY:I})),await Z(m),n("คลิก/hover Full Video ✅"),await b(2e3);const G=Date.now();for(;!E&&Date.now()-G<8e3;){for(const O of document.querySelectorAll("button[role='menuitem']")){const V=O.querySelectorAll("span");for(const z of V)if((z.textContent||"").trim()==="720p"){const H=O.getBoundingClientRect();if(H.width>0&&H.height>0){E=O;break}}if(E)break}E||(m.isConnected&&(m.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:I})),m.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F+20,clientY:I}))),await b(500))}}if(!E){T("ไม่พบ 720p");return}await Z(E),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const f=Date.now();let B=!1,u=!1;for(;Date.now()-f<3e5;){for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div")){const m=(x.textContent||"").trim();if(m==="Download complete!"||m==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),B=!0;break}(m.includes("Downloading your extended video")||m.includes("กำลังดาวน์โหลด"))&&(u||(u=!0,n("⏳ กำลังดาวน์โหลด...")))}if(B)break;if(u){let x=!1;for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((m.textContent||"").trim().includes("Downloading")){x=!0;break}if(!x){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),B=!0;break}}if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await b(2e3)}if(!B){T("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await b(5e3);let w=!1;const A=Date.now();for(;Date.now()-A<6e4&&!w;){try{await new Promise(x=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:$},m=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):m!=null&&m.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${m.message}`),w=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${m==null?void 0:m.message}`),x()})})}catch(x){T(`ตรวจสอบผิดพลาด: ${x.message}`)}w||await b(3e3)}w||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),wt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await b(2e3);const o=($,S="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const D of document.querySelectorAll(S)){const E=(D.textContent||"").trim();if(E.includes($)&&E.length<100){const f=D.getBoundingClientRect();if(f.width>0&&f.height>0&&f.top>=0)return D}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const s=Date.now();for(;!d&&Date.now()-s<1e4;){for(const $ of document.querySelectorAll("button, [role='button']")){const S=($.textContent||"").trim(),D=S.toLowerCase();if((D.includes("download")||D.includes("ดาวน์โหลด"))&&S.length<80){const E=$.getBoundingClientRect();if(E.width>0&&E.height>0){d=$;break}}}if(!d)for(const $ of document.querySelectorAll("button")){const S=($.getAttribute("aria-label")||"").toLowerCase();if(S.includes("download")||S.includes("ดาวน์")){const D=$.getBoundingClientRect();if(D.width>0&&D.height>0){d=$;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await b(1e3))}if(!d){T("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await Z(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await b(1500);const r=Date.now();let c=null;const p=Date.now();for(;!c&&Date.now()-p<5e3;)c=o("1080p"),c||(n("รอ 1080p..."),await b(500));if(!c){T("ไม่พบ 1080p");return}await Z(c),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const v=Date.now();let M=!1,L=!1,h=0;const i=3e3;for(;Date.now()-v<3e5;){const S=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(S.includes("upscaling complete")||S.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),M=!0;break}for(const E of document.querySelectorAll("div, span, p")){const f=(E.textContent||"").trim().toLowerCase();if(f.length<60&&(f.includes("upscaling complete")||f.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(C=E.textContent)==null?void 0:C.trim()}")`),M=!0;break}}if(M)break;if(S.includes("upscaling your video")||S.includes("กำลังอัปสเกล")){L=!0,h=0;const E=Math.floor((Date.now()-v)/1e3);n(`⏳ กำลังอัปสเกล... (${E} วินาที)`)}else if(L){if(h===0)h=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-h>=i){n(`✅ ข้อความ Upscaling หายไป ${i/1e3} วินาที — เสร็จ!`),M=!0;break}}else{const E=Math.floor((Date.now()-v)/1e3);E%10<3&&n(`⏳ รอ Upscale... (${E} วินาที)`)}if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await b(2e3)}if(!M){T("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await b(5e3);let g=!1;const k=Date.now();for(;Date.now()-k<6e4&&!g;){try{await new Promise($=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},S=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):S!=null&&S.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${S.message}`),g=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${S==null?void 0:S.message}`),$()})})}catch($){T(`ตรวจสอบผิดพลาด: ${$.message}`)}g||await b(3e3)}g||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function Se(e=2,t=2,l){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{l&&kt(l)}catch{}try{At(e)}catch(E){n(`⚠️ showOverlay error: ${E.message}`)}try{const E=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let f=2;f<=t;f++)E.push(`scene${f}-prompt`,`scene${f}-gen`),f<t&&E.push(`scene${f}-wait`);for(const f of E)P(f,"done");P(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${E.length} steps done (scene ${t}/${e} navigate)`)}catch(E){n(`⚠️ overlay restore error: ${E.message}`)}await b(2e3);const a=(()=>{for(const E of document.querySelectorAll("button")){const f=E.querySelectorAll("i");for(const B of f){const u=(B.textContent||"").trim();if(u==="volume_up"||u==="volume_off"||u==="volume_mute"){const w=E.getBoundingClientRect();if(w.width>0&&w.height>0)return E}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);const o=document.getElementById("netflow-engine-overlay");let d=0,s=0;const r=Date.now(),c=6e5,p=5e3;let v=!1,M=0;for(;Date.now()-r<c;){let E=null;const f=document.querySelectorAll("div, span, p, label, strong, small");for(const B of f){if(o&&o.contains(B))continue;const w=(B.textContent||"").trim().match(/^(\d{1,3})%$/);if(w){const A=B.getBoundingClientRect();if(A.width>0&&A.height>0&&A.width<120&&A.height<60){E=parseInt(w[1],10);break}}}if(E!==null)M=0,E!==d&&(n(`🎬 scene ${t} ความคืบหน้า: ${E}%`),d=E),s=0;else if(d>0){if(s===0)s=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-s>=p){n(`✅ scene ${t}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),v=!0;break}}else if(M++,M>=15){const B=document.querySelectorAll("video");let u=!1;for(const w of B)if(w.readyState>=2&&!w.paused&&w.getBoundingClientRect().width>200){u=!0;break}if(u){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),v=!0;break}if(M>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),v=!0;break}}await b(2e3)}v||n(`⚠️ scene ${t} หมดเวลา — ลองดาวน์โหลดต่อ`);try{P(`scene${t}-wait`,"done",100)}catch{}n(`✅ scene ${t} เสร็จ — เริ่มดาวน์โหลด`),await b(3e3);try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const L=Date.now();let h=null;const i=Date.now();for(;!h&&Date.now()-i<1e4;){for(const E of document.querySelectorAll("button")){const f=E.querySelector("i");if(f&&(f.textContent||"").trim()==="download"){const B=E.getBoundingClientRect();if(B.width>0&&B.height>0){h=E;break}}}h||await b(1e3)}if(!h){T("ไม่พบปุ่มดาวน์โหลด");return}await Z(h),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await b(1500);let g=null;for(let E=0;E<3&&!g;E++){E>0&&n(`🔄 ลองหา 720p ครั้งที่ ${E+1}...`);let f=null;const B=Date.now();for(;!f&&Date.now()-B<5e3;){for(const m of document.querySelectorAll("[role='menuitem']"))if((m.textContent||"").trim().includes("Full Video")&&m.querySelector("i")){const _=m.getBoundingClientRect();if(_.width>0&&_.height>0){f=m;break}}f||await b(500)}if(!f){T("ไม่พบ Full Video");continue}const u=f.getBoundingClientRect(),w=u.left+u.width/2,A=u.top+u.height/2;f.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:w,clientY:A})),f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:w,clientY:A})),f.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:w,clientY:A})),await Z(f),n("คลิก/hover Full Video ✅"),await b(2e3);const x=Date.now();for(;!g&&Date.now()-x<8e3;){for(const m of document.querySelectorAll("button[role='menuitem']")){const y=m.querySelectorAll("span");for(const _ of y)if((_.textContent||"").trim()==="720p"){const F=m.getBoundingClientRect();if(F.width>0&&F.height>0){g=m;break}}if(g)break}g||(f.isConnected&&(f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:w,clientY:A})),f.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:w+20,clientY:A}))),await b(500))}}if(!g){T("ไม่พบ 720p");return}await Z(g),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const k=Date.now();let C=!1,$=!1;for(;Date.now()-k<3e5;){for(const E of document.querySelectorAll("div[data-title] div, div[data-content] div")){const f=(E.textContent||"").trim();if(f==="Download complete!"||f==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),C=!0;break}(f.includes("Downloading your extended video")||f.includes("กำลังดาวน์โหลด"))&&($||($=!0,n("⏳ กำลังดาวน์โหลด...")))}if(C)break;if($){let E=!1;for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((f.textContent||"").trim().includes("Downloading")){E=!0;break}if(!E){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),C=!0;break}}await b(2e3)}if(!C){T("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await b(5e3);let S=!1;const D=Date.now();for(;Date.now()-D<6e4&&!S;){try{await new Promise(E=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:L},f=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):f!=null&&f.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${f.message}`),S=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${f==null?void 0:f.message}`),E()})})}catch(E){T(`ตรวจสอบผิดพลาด: ${E.message}`)}S||await b(3e3)}S||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),wt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Pe(){try{const e=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const l=Date.now()-e.timestamp;if(l>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:e},()=>d())}),await b(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const r=s==null?void 0:s.netflow_pending_action;d((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(l/1e3)} วินาที)`),e.action==="mute_video"?await Ie(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Se(e.sceneCount||2,e.currentScene||2,e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,l)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),l({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Me(e).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>console.error("[Netflow AI] Generate error:",a)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,l({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return l({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return l({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await b(500);const a=xe();if(!a){T("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=a.getBoundingClientRect(),d=o.left+o.width/2,s=o.top+o.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const c=document.elementFromPoint(d,s);c?(await Z(c),n(`คลิก ${r+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await Z(a),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await b(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Pe(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const l=t.tagName.toLowerCase(),a=Math.round(e.clientX),o=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${a},${o}) → <${l}> "${d}"`)},!0)})();
