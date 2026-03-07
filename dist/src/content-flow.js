(function(){"use strict";const at={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let W=at.green,ut=null;function kt(e){e&&at[e]&&(ut=e,W=at[e],Lt(),requestAnimationFrame(()=>Xt()))}function ne(){if(ut&&at[ut])return at[ut];try{const e=localStorage.getItem("netflow_app_theme");if(e&&at[e])return at[e]}catch{}return at.green}let tt=0,et=255,nt=65;function Lt(){const e=W.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(tt=parseInt(e[1],16),et=parseInt(e[2],16),nt=parseInt(e[3],16))}let K=null,Y=null,rt=null,Gt=0,vt=null,gt=null,$t=null,Ct=0,lt=!1,ot=null,mt=null,ht=null,Et=1,X=[];function Mt(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let c=2;c<=e;c++)t.push({stepId:`scene${c}-prompt`,label:`Scene ${c} Prompt`,status:"waiting"},{stepId:`scene${c}-gen`,label:`Scene ${c} Generate`,status:"waiting"},{stepId:`scene${c}-wait`,label:`Scene ${c} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const ct=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];X=Mt(1);function oe(e){const t=e.rgb,c=e.accentRgb,i=e.doneRgb,o=e.hex,d=e.accentHex,s=e.doneHex,r=(()=>{const u=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!u)return"#4ade80";const C=M=>Math.min(255,M+80);return`#${[1,2,3].map(M=>C(parseInt(u[M],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const u=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!u)return"#4ade80";const C=M=>Math.min(255,M+60);return`#${[1,2,3].map(M=>C(parseInt(u[M],16)).toString(16).padStart(2,"0")).join("")}`})(),p=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),v=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,I=p?parseInt(p[1],16)/v:0,L=p?parseInt(p[2],16)/v:1,m=p?parseInt(p[3],16)/v:.25,a=u=>`${Math.round(I*u)}, ${Math.round(L*u)}, ${Math.round(m*u)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${t},0.05) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${c},0.04) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(${a(18)},0.94) 0%, rgba(${a(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: radial-gradient(circle, rgba(${t},0.07) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.045) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.06) 0%, rgba(${c},0.02) 40%, transparent 70%);
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
    background: rgba(${a(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${a(180)},0.05),
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
            0 0 200px rgba(${a(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${a(180)},0.08),
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
.nf-term-line.nf-term-done { color: rgba(${i}, 0.85); }
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
    background: rgba(${i}, 0.12);
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
    border-top: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${a(5)},0.95) 0%, rgba(${a(12)},0.98) 100%);
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
    background: radial-gradient(circle, rgba(${t},0.25) 0%, rgba(${c},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${c},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${a(6)},0.75) 0%, rgba(${a(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${t},0.12), 0 0 24px rgba(${t},0.06), inset 0 1px 0 rgba(${c},0.08);
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
    color: rgba(${c},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${c},0.7),
        0 0 12px rgba(${c},0.35),
        0 0 20px rgba(${t},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${a(8)}, 0.88);
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
    border-color: rgba(${i}, 0.4);
    box-shadow: 0 0 20px rgba(${i}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${i}, 0.5), transparent);
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
    color: rgba(${i}, 0.85);
    text-shadow:
        0 0 4px rgba(${i},0.5),
        0 0 12px rgba(${i},0.3);
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
    box-shadow: 0 0 5px rgba(${i}, 0.5);
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
    background: linear-gradient(90deg, ${o}, ${d});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${t},0.3);
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
    background: rgba(${a(8)},0.8);
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
    background: rgba(${a(8)}, 0.9);
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
    color: rgba(${i},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${i},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${s};
    box-shadow: 0 0 5px rgba(${i},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${i},0.1);
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

    `}function Ot(){rt||(rt=document.createElement("style"),rt.id="netflow-overlay-styles",rt.textContent=oe(W),document.head.appendChild(rt))}function Nt(e){e.innerHTML="",X.forEach((t,c)=>{const i=document.createElement("div");i.className="nf-proc-row nf-proc-waiting",i.id=`nf-proc-${t.stepId}`,i.innerHTML=`
            <span class="nf-proc-num">${c+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(i)})}function ie(){const e=document.getElementById("nf-terminal");if(!e)return;Nt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${X.length}`)}function zt(e,t){let r="";for(let f=0;f<32;f++){const E=f/32*Math.PI*2,A=(f+.2)/32*Math.PI*2,x=(f+.5)/32*Math.PI*2,g=(f+.8)/32*Math.PI*2,y=(f+1)/32*Math.PI*2;r+=`${f===0?"M":"L"}${(120+104*Math.cos(E)).toFixed(1)},${(120+104*Math.sin(E)).toFixed(1)} `,r+=`L${(120+104*Math.cos(A)).toFixed(1)},${(120+104*Math.sin(A)).toFixed(1)} `,r+=`L${(120+116*Math.cos(x)).toFixed(1)},${(120+116*Math.sin(x)).toFixed(1)} `,r+=`L${(120+104*Math.cos(g)).toFixed(1)},${(120+104*Math.sin(g)).toFixed(1)} `,r+=`L${(120+104*Math.cos(y)).toFixed(1)},${(120+104*Math.sin(y)).toFixed(1)} `}r+="Z";const l=24,p=100,v=90;let I="";for(let f=0;f<l;f++){const E=f/l*Math.PI*2,A=(f+.25)/l*Math.PI*2,x=(f+.75)/l*Math.PI*2,g=(f+1)/l*Math.PI*2;I+=`${f===0?"M":"L"}${(120+v*Math.cos(E)).toFixed(1)},${(120+v*Math.sin(E)).toFixed(1)} `,I+=`L${(120+p*Math.cos(A)).toFixed(1)},${(120+p*Math.sin(A)).toFixed(1)} `,I+=`L${(120+p*Math.cos(x)).toFixed(1)},${(120+p*Math.sin(x)).toFixed(1)} `,I+=`L${(120+v*Math.cos(g)).toFixed(1)},${(120+v*Math.sin(g)).toFixed(1)} `}I+="Z";let L="";for(let f=0;f<64;f++){const E=f/64*Math.PI*2,A=f%4===0?117:119,x=f%4===0?124:122,g=f%4===0?.8:.4,y=f%4===0?.7:.35;L+=`<line x1="${(120+A*Math.cos(E)).toFixed(1)}" y1="${(120+A*Math.sin(E)).toFixed(1)}" x2="${(120+x*Math.cos(E)).toFixed(1)}" y2="${(120+x*Math.sin(E)).toFixed(1)}" stroke="rgba(${e},${y})" stroke-width="${g}"/>`}const m=26,a=78,u=68;let C="";for(let f=0;f<m;f++){const E=f/m*Math.PI*2,A=(f+.2)/m*Math.PI*2,x=(f+.5)/m*Math.PI*2,g=(f+.8)/m*Math.PI*2,y=(f+1)/m*Math.PI*2;C+=`${f===0?"M":"L"}${(120+u*Math.cos(E)).toFixed(1)},${(120+u*Math.sin(E)).toFixed(1)} `,C+=`L${(120+u*Math.cos(A)).toFixed(1)},${(120+u*Math.sin(A)).toFixed(1)} `,C+=`L${(120+a*Math.cos(x)).toFixed(1)},${(120+a*Math.sin(x)).toFixed(1)} `,C+=`L${(120+u*Math.cos(g)).toFixed(1)},${(120+u*Math.sin(g)).toFixed(1)} `,C+=`L${(120+u*Math.cos(y)).toFixed(1)},${(120+u*Math.sin(y)).toFixed(1)} `}C+="Z";let M="";for(let f=0;f<48;f++){const E=f/48*Math.PI*2,A=f%4===0?79:80,x=f%4===0?85:83,g=f%4===0?.6:.3,y=f%4===0?.6:.3;M+=`<line x1="${(120+A*Math.cos(E)).toFixed(1)}" y1="${(120+A*Math.sin(E)).toFixed(1)}" x2="${(120+x*Math.cos(E)).toFixed(1)}" y2="${(120+x*Math.sin(E)).toFixed(1)}" stroke="rgba(${t},${y})" stroke-width="${g}"/>`}function $(f,E,A,x,g){let y="";for(let F=0;F<A;F++){const R=F/A*Math.PI*2,S=(F+.25)/A*Math.PI*2,G=(F+.75)/A*Math.PI*2,O=(F+1)/A*Math.PI*2;y+=`${F===0?"M":"L"}${(f+g*Math.cos(R)).toFixed(1)},${(E+g*Math.sin(R)).toFixed(1)} `,y+=`L${(f+x*Math.cos(S)).toFixed(1)},${(E+x*Math.sin(S)).toFixed(1)} `,y+=`L${(f+x*Math.cos(G)).toFixed(1)},${(E+x*Math.sin(G)).toFixed(1)} `,y+=`L${(f+g*Math.cos(O)).toFixed(1)},${(E+g*Math.sin(O)).toFixed(1)} `}return y+"Z"}const b=42,k=[],T=$(120,120,14,18,13);k.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${T}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let f=0;f<8;f++){const E=f/8*Math.PI*2,A=120+b*Math.cos(E),x=120+b*Math.sin(E),y=$(A,x,10,14,10),F=f%2===0?"":"animation-direction:reverse;";k.push(`<g class="nf-kinetic-sub" style="transform-origin:${A.toFixed(1)}px ${x.toFixed(1)}px;${F}">
            <path d="${y}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${A.toFixed(1)}" cy="${x.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${A.toFixed(1)}" cy="${x.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const w=k.join(`
`);let B="";for(let f=0;f<8;f++){const E=f/8*Math.PI*2,A=120+10*Math.cos(E),x=120+10*Math.sin(E),g=120+(b-10)*Math.cos(E),y=120+(b-10)*Math.sin(E);B+=`<line x1="${A.toFixed(1)}" y1="${x.toFixed(1)}" x2="${g.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${I}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${v}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${C}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${M}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${t},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${B}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${w}
        </g>
    </svg>`}function ae(){const e=document.createElement("div");e.id="netflow-engine-overlay",ot=document.createElement("canvas"),ot.id="nf-matrix-canvas",e.appendChild(ot);const t=document.createElement("div");t.className="nf-pat-data",e.appendChild(t);const c=document.createElement("div");c.className="nf-center-glow",e.appendChild(c);const i=document.createElement("div");i.className="nf-pat-noise",e.appendChild(i);const o=document.createElement("div");o.className="nf-vignette",e.appendChild(o);for(let M=0;M<3;M++){const $=document.createElement("div");$.className="nf-pulse-ring",e.appendChild($)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(M=>{const $=document.createElement("div");$.className=`nf-corner-deco ${M}`,e.appendChild($)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Pt(),e.appendChild(d);const s=document.createElement("div");s.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const l=document.createElement("div");l.className="nf-core-header",l.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,r.appendChild(l);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",Nt(p),r.appendChild(p);const v=document.createElement("div");v.className="nf-engine-core",v.id="nf-engine-core";const I=document.createElement("div");I.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(M=>{const $=document.createElement("div");$.className=`nf-frame-corner ${M}`,I.appendChild($)}),v.appendChild(I);const L="http://www.w3.org/2000/svg",m=document.createElementNS(L,"svg");m.setAttribute("class","nf-engine-waves"),m.setAttribute("viewBox","0 0 560 140"),m.setAttribute("preserveAspectRatio","none"),m.id="nf-engine-waves";for(let M=0;M<6;M++){const $=document.createElementNS(L,"path");$.setAttribute("fill","none"),$.setAttribute("stroke-width",M<3?"1.5":"1"),$.setAttribute("stroke",M<3?`rgba(${W.rgb},${.12+M*.08})`:`rgba(${W.accentRgb},${.08+(M-3)*.06})`),$.setAttribute("data-wave-idx",String(M)),m.appendChild($)}v.appendChild(m);const a=document.createElement("div");a.className="nf-engine-brand-inner",a.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${zt(W.rgb,W.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${zt(W.rgb,W.accentRgb)}
        </div>
    `,v.appendChild(a);const u=document.createElement("div");u.className="nf-engine-stats",u.id="nf-engine-stats",u.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([M,$,b])=>`<div class="nf-stat-item"><span class="nf-stat-label">${M}</span><span class="nf-stat-val" id="${$}">${b}</span></div>`).join(""),v.appendChild(u),r.appendChild(v),s.appendChild(r);const C=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ct.forEach((M,$)=>{const b=re(M);b.classList.add(C[$]),b.id=`nf-mod-${M.id}`,s.appendChild(b)}),e.appendChild(s);for(let M=0;M<30;M++){const $=document.createElement("div");$.className="nf-particle",$.style.left=`${5+Math.random()*90}%`,$.style.bottom=`${Math.random()*40}%`,$.style.animationDuration=`${3+Math.random()*5}s`,$.style.animationDelay=`${Math.random()*4}s`;const b=.3+Math.random()*.4,k=.7+Math.random()*.3;$.style.background=`rgba(${Math.floor(tt*k)}, ${Math.floor(et*k)}, ${Math.floor(nt*k)}, ${b})`,$.style.width=`${1+Math.random()*2}px`,$.style.height=$.style.width,e.appendChild($)}return e}function re(e){const t=document.createElement("div");t.className="nf-module";const c=document.createElement("div");c.className="nf-mod-header",c.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(c),e.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let s="";o.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${s}
        `,t.appendChild(d)});const i=document.createElement("div");return i.className="nf-mod-progress",i.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(i),t}function se(){Gt=Date.now(),vt=setInterval(()=>{const e=Math.floor((Date.now()-Gt)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),c=String(e%60).padStart(2,"0"),i=document.getElementById("nf-timer");i&&(i.textContent=`${t}:${c}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${t}:${c}`)},1e3)}function qt(){vt&&(clearInterval(vt),vt=null)}const le=220,It=210,Ht=.4;let bt=[];function ce(e,t){bt=[];for(let c=0;c<le;c++){const i=Math.random();let o;i<.22?o=0:i<.4?o=1:i<.55?o=2:i<.68?o=3:i<.84?o=4:o=5;const d=Math.random()*e,s=Math.random()*t,r=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);bt.push({x:o===0?Math.random()*e:d+Math.cos(l)*r,y:o===0?Math.random()*t:s+Math.sin(l)*r,vx:(Math.random()-.5)*Ht,vy:(Math.random()-.5)*Ht,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:d,oCy:s,oRadius:r,oAngle:l,oSpeed:p})}}function de(){if(!ot)return;const e=ot;if(mt=e.getContext("2d"),!mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,bt.length===0&&ce(e.width,e.height)};t(),window.addEventListener("resize",t);let c=null,i=0,o=0;function d(){if(!mt||!ot){ht=null;return}ht=requestAnimationFrame(d);const s=mt,r=ot.width,l=ot.height;s.fillStyle=`rgba(${tt*.04|0},${et*.04|0},${nt*.06|0},1)`,s.fillRect(0,0,r,l),(!c||i!==r||o!==l)&&(i=r,o=l,c=s.createRadialGradient(r*.5,l*.5,0,r*.5,l*.5,Math.max(r,l)*.6),c.addColorStop(0,`rgba(${tt*.08|0},${et*.08|0},${nt*.1|0},0.4)`),c.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=c,s.fillRect(0,0,r,l);const p=bt,v=p.length,I=It*It;for(let m=0;m<v;m++){const a=p[m];if(a.pulsePhase+=a.pulseSpeed,a.motion===0)a.x+=a.vx,a.y+=a.vy,a.x<0?(a.x=0,a.vx=Math.abs(a.vx)*(.8+Math.random()*.4)):a.x>r&&(a.x=r,a.vx=-Math.abs(a.vx)*(.8+Math.random()*.4)),a.y<0?(a.y=0,a.vy=Math.abs(a.vy)*(.8+Math.random()*.4)):a.y>l&&(a.y=l,a.vy=-Math.abs(a.vy)*(.8+Math.random()*.4));else if(a.motion===1)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius,a.oCx+=Math.sin(a.oAngle*.3)*.15,a.oCy+=Math.cos(a.oAngle*.3)*.15;else if(a.motion===2)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius*.5,a.oCx+=Math.sin(a.oAngle*.2)*.1,a.oCy+=Math.cos(a.oAngle*.2)*.1;else if(a.motion===3){a.oAngle+=a.oSpeed;const u=a.oAngle,C=a.oRadius*.7;a.x=a.oCx+C*Math.cos(u),a.y=a.oCy+C*Math.sin(u)*Math.cos(u),a.oCx+=Math.sin(u*.15)*.12,a.oCy+=Math.cos(u*.15)*.12}else if(a.motion===4){a.oAngle+=a.oSpeed*1.2;const u=a.oRadius*(.5+.5*Math.abs(Math.sin(a.oAngle*.15)));a.x=a.oCx+Math.cos(a.oAngle)*u,a.y=a.oCy+Math.sin(a.oAngle)*u,a.oCx+=Math.sin(a.oAngle*.1)*.18,a.oCy+=Math.cos(a.oAngle*.1)*.18}else a.oAngle+=a.oSpeed,a.x+=a.vx*.8,a.y=a.oCy+Math.sin(a.oAngle+a.x*.008)*a.oRadius*.35,a.x<-30?a.x=r+30:a.x>r+30&&(a.x=-30),a.oCy+=Math.sin(a.oAngle*.1)*.08;if(a.motion>0){const u=a.oRadius+50;a.oCx<-u?a.oCx=r+u:a.oCx>r+u&&(a.oCx=-u),a.oCy<-u?a.oCy=l+u:a.oCy>l+u&&(a.oCy=-u)}}const L=5;for(let m=0;m<L;m++){const a=m/L,u=(m+1)/L,C=((a+u)*.5*.35).toFixed(3);s.beginPath(),s.strokeStyle=`rgba(${tt},${et},${nt},${C})`,s.lineWidth=(a+u)*.5*1.2;for(let M=0;M<v;M++){const $=p[M];for(let b=M+1;b<v;b++){const k=p[b],T=$.x-k.x,w=$.y-k.y,B=T*T+w*w;if(B<I){const f=1-Math.sqrt(B)/It;f>=a&&f<u&&(s.moveTo($.x,$.y),s.lineTo(k.x,k.y))}}}s.stroke()}s.save(),s.shadowColor=`rgba(${tt},${et},${nt},0.8)`,s.shadowBlur=25;for(let m=0;m<v;m++){const a=p[m],u=.6+.4*Math.sin(a.pulsePhase),C=a.radius*(.8+u*.4),M=tt+(255-tt)*.7*u|0,$=et+(255-et)*.7*u|0,b=nt+(255-nt)*.7*u|0;s.beginPath(),s.arc(a.x,a.y,C,0,Math.PI*2),s.fillStyle=`rgba(${M},${$},${b},${(.6+u*.4).toFixed(2)})`,s.fill()}s.restore(),s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let m=0;m<v;m++){const a=p[m];if(a.radius>2){const u=.6+.4*Math.sin(a.pulsePhase),C=a.radius*(.8+u*.4)*.35;s.moveTo(a.x+C,a.y),s.arc(a.x,a.y,C,0,Math.PI*2)}}s.fill(),s.fillStyle=`rgba(${tt},${et},${nt},0.08)`;for(let m=0;m<6;m++)s.fillRect(Math.random()*r,Math.random()*l,1,1)}d()}function pe(){ht!==null&&(cancelAnimationFrame(ht),ht=null),ot=null,mt=null,bt=[]}function Vt(){gt=requestAnimationFrame(Vt),Ct+=.035;const e=document.getElementById("nf-engine-waves");if(!e){gt=null;return}const t=560,c=140,i=t/2;e.querySelectorAll("path").forEach(d=>{const s=parseInt(d.getAttribute("data-wave-idx")||"0",10),r=10+s*5,l=1.2+s*.35,p=s*.6,v=.7+s*.12;let I=`M 0 ${c/2}`;for(let L=0;L<=t;L+=3){const m=Math.abs(L-i)/i,a=Math.pow(Math.min(1,m*1.6),.6),u=c/2+r*a*Math.sin(L/t*l*Math.PI*2+Ct*v+p);I+=` L ${L} ${Math.round(u*10)/10}`}d.setAttribute("d",I)})}function fe(){Ct=0,Vt(),de(),$t=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),c=document.getElementById("nf-stat-lat2"),i=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),c&&(c.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Ut(){gt!==null&&(cancelAnimationFrame(gt),gt=null),$t&&(clearInterval($t),$t=null),pe()}function St(){let e=0;const t=X.filter(r=>r.status!=="skipped").length;for(const r of X){const l=document.getElementById(`nf-proc-${r.stepId}`);if(!l)continue;l.className="nf-proc-row";const p=l.querySelector(".nf-proc-badge");switch(r.status){case"done":l.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),e++;break;case"active":l.classList.add("nf-proc-active"),p&&(p.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const c=document.getElementById("nf-step-counter");c&&(c.textContent=`${e}/${X.length}`);const i=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");e>=t&&t>0?(i&&(i.textContent="COMPLETE",i.style.color=W.doneHex),o&&(o.style.background=W.doneHex,o.style.boxShadow=`0 0 8px rgba(${W.doneRgb},0.7)`)):X.some(l=>l.status==="error")?(i&&(i.textContent="ERROR",i.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(l=>l.status==="active")&&i&&(i.textContent="ACTIVE",i.style.color=W.hex,i.style.textShadow=`0 0 10px rgba(${W.rgb},0.5)`);const d=document.getElementById("nf-terminal"),s=d==null?void 0:d.querySelector(".nf-proc-active");s&&d&&s.scrollIntoView({behavior:"smooth",block:"center"})}function Wt(){Y&&Y.isConnected||(Ot(),Y=document.createElement("button"),Y.id="nf-toggle-btn",Y.className="nf-toggle-visible",Y.innerHTML=lt?"⚡":"✕",Y.title="ซ่อน/แสดง Netflow Overlay",Y.onclick=()=>Pt(),document.body.appendChild(Y))}function Pt(){K&&(Wt(),lt?(K.classList.remove("nf-hidden"),K.classList.add("nf-visible"),Y&&(Y.innerHTML="✕"),lt=!1):(K.classList.remove("nf-visible"),K.classList.add("nf-hidden"),Y&&(Y.innerHTML="⚡"),lt=!0))}const Yt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Xt(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=ut;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const c=Yt[t]||Yt.red;let i;try{i=chrome.runtime.getURL(c)}catch{i=`/${c}`}const o=W.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${i}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${o},0.45)`,e.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function At(e=1){if(W=ne(),Lt(),K){lt&&Pt();return}if(rt&&(rt.remove(),rt=null),Ot(),Et=e,X=Mt(e),e>1){const t=ct.find(i=>i.id==="video");if(t){const i=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=e;o++)i.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),i.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),i.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});t.steps=i}const c=ct.find(i=>i.id==="render");if(c){const i=c.steps.find(d=>d.id==="download");i&&(i.label="ดาวน์โหลด 720p");const o=c.steps.find(d=>d.id==="upscale");o&&(o.label="Full Video")}}K=ae(),document.body.appendChild(K),lt=!1,Wt(),se(),fe(),requestAnimationFrame(()=>Xt())}function ue(){qt(),Ut(),lt=!1,K&&(K.classList.add("nf-fade-out"),setTimeout(()=>{K==null||K.remove(),K=null},500)),Y&&(Y.remove(),Y=null)}const ge={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function me(e,t,c){const i=X.filter(r=>r.status==="done").length,o=X.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${i}/${o}`);const s=document.getElementById("nf-stat-scenes");if(s&&(s.textContent=Et>1?`1/${Et}`:"1/1"),t==="active"){const r=document.getElementById("nf-stat-status"),l=ge[e]||e.toUpperCase();r&&(r.textContent=l)}else if(t==="done"&&i>=o){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(t==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}if(c!==void 0&&c>0){const r=document.getElementById("nf-stat-progress");r&&(r.textContent=`${Math.min(100,c)}%`)}}function P(e,t,c){if(!K)return;for(const o of ct)for(const d of o.steps)d.id===e&&(d.status=t,c!==void 0&&(d.progress=c));for(const o of X)o.stepId===e&&(o.status=t,c!==void 0&&(o.progress=c));const i=document.getElementById(`nf-step-${e}`);if(i&&(i.className="nf-step",t==="active"?i.classList.add("nf-step-active"):t==="done"?i.classList.add("nf-step-done"):t==="error"&&i.classList.add("nf-step-error")),me(e,t,c),c!==void 0){const o=document.getElementById(`nf-bar-${e}`);o&&(o.style.width=`${Math.min(100,c)}%`)}Tt(),St()}function pt(e){P(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function wt(e=4e3){qt(),Ut(),Tt(),St(),setTimeout(()=>ue(),e)}function Tt(){for(const e of ct){const t=e.steps.filter(l=>l.status!=="skipped").length,c=e.steps.filter(l=>l.status==="done").length,i=e.steps.some(l=>l.status==="active"),o=t>0?Math.round(c/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${o}%`);const s=document.getElementById(`nf-modbar-${e.id}`);s&&(s.style.width=`${o}%`);const r=document.getElementById(`nf-mod-${e.id}`);r&&(r.classList.remove("nf-active","nf-done"),o>=100?r.classList.add("nf-done"):i&&r.classList.add("nf-active"))}}function he(e){var i,o,d,s;Et=e;const t=new Map;for(const r of X)t.set(r.stepId,{status:r.status,progress:r.progress});X=Mt(e);for(const r of X){const l=t.get(r.stepId);l&&(r.status=l.status,l.progress!==void 0&&(r.progress=l.progress))}if(ie(),e>1){const r=ct.find(l=>l.id==="video");if(r){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((i=r.steps.find(p=>p.id==="animate"))==null?void 0:i.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=r.steps.find(p=>p.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=r.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=r.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});r.steps=l,jt(r)}}const c=ct.find(r=>r.id==="render");if(c&&e>1){const r=c.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const l=c.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),jt(c)}Tt(),St()}function jt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),e.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let s="";o.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${s}
        `,t.appendChild(d)});const i=document.createElement("div");i.className="nf-mod-progress",i.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(i)}function Kt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Kt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},_=e=>{console.warn(`[Netflow AI] ${e}`);try{Kt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},_t=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Bt=/Win/i.test(navigator.userAgent),ft=_t?"🍎 Mac":Bt?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ft}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),i=Math.round(e.clientX),o=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${i},${o}) → <${c}> "${d}"`)},!0);const h=e=>new Promise(t=>setTimeout(t,e));function dt(){return!!window.__NETFLOW_STOP__}function Jt(){var i;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const o of c){if(t&&t.contains(o))continue;const d=(o.textContent||"").trim().toLowerCase();if(!(d.length>200||d.length<5)){for(const s of e)if(d.includes(s))return((i=o.textContent)==null?void 0:i.trim())||s}}return null}async function Z(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,i=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:c,clientY:i,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",o)),await h(80),e.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",o)),e.dispatchEvent(new MouseEvent("click",o)),await h(50),e.click()}function be(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,i=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:c,clientY:i};e.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",o)),e.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",o)),e.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",o))}function we(e){const t=[],c=document.querySelectorAll("i");for(const i of c){if((i.textContent||"").trim()!==e)continue;let d=i,s=null,r=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const v=p.width*p.height;v<r&&(s=d,r=v)}}s&&!t.includes(s)&&t.push(s)}return t.sort((i,o)=>{const d=i.getBoundingClientRect(),s=o.getBoundingClientRect();return d.left-s.left}),t}function Ft(e=!1){const t=[],c=document.querySelectorAll("video");for(const s of c){let r=s.parentElement;for(let l=0;l<10&&r;l++){const p=r.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:r,left:p.left});break}r=r.parentElement}}const i=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of i){const r=(s.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let l=s.parentElement;for(let p=0;p<10&&l;p++){const v=l.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){t.push({el:l,left:v.left});break}l=l.parentElement}}}const o=document.querySelectorAll("img");for(const s of o){const r=(s.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let l=s.parentElement;for(let p=0;p<10&&l;p++){const v=l.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){t.push({el:l,left:v.left});break}l=l.parentElement}}}const d=Array.from(new Set(t.map(s=>s.el))).map(s=>t.find(r=>r.el===s));if(d.sort((s,r)=>s.left-r.left),d.length>0){const s=d[0].el,r=s.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),s}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function xe(){const e=we("image");if(e.length>0){const c=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const c of t){let i=c.parentElement;for(let o=0;o<10&&i;o++){const d=i.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),i;i=i.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function ye(e,t){var r;const[c,i]=e.split(","),o=((r=c.match(/:(.*?);/))==null?void 0:r[1])||"image/png",d=atob(i),s=new Uint8Array(d.length);for(let l=0;l<d.length;l++)s[l]=d.charCodeAt(l);return new File([s],t,{type:o})}function xt(e){var i;const t=[],c=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of c)if(((i=o.textContent)==null?void 0:i.trim())===e){const d=o.closest("button");d&&t.push(d)}return t}function ve(){const e=[...xt("add"),...xt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const i=document.querySelectorAll("button");for(const o of i){const d=o.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const s=(o.textContent||"").trim();if(s==="+"||s==="add")return o}}return null}let t=null,c=0;for(const i of e){const o=i.getBoundingClientRect();o.y>c&&(c=o.y,t=i)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${c.toFixed(0)}`),t}function Zt(){for(const i of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=xt(i);let d=null,s=0;for(const r of o){const l=r.getBoundingClientRect();l.y>s&&(s=l.y,d=r)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${i}" ที่ y=${s.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,c=0;for(const i of e){const o=i.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const d=Math.abs(o.width-o.height)<10&&o.width<60,s=o.y+o.x+(d?1e3:0);s>c&&(c=s,t=i)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const i of e){const o=(i.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return i}return null}function Qt(){const e=document.querySelectorAll("textarea");for(const i of e)if(i.getBoundingClientRect().bottom>window.innerHeight*.5)return i;const t=document.querySelectorAll('[contenteditable="true"]');for(const i of t)if(i.getBoundingClientRect().bottom>window.innerHeight*.5)return i;const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const i of c){const o=i.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return i}return e.length>0?e[e.length-1]:null}async function Rt(e,t){var c,i,o,d;e.focus(),await h(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(l),await h(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await h(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(s);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(r),await h(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await h(200);const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});e.dispatchEvent(r),await h(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((c=navigator.clipboard)!=null&&c.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=t,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await h(200),document.execCommand("paste"),await h(500);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(e).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(s){let r=e[s];for(let l=0;l<30&&r;l++){const p=r.memoizedProps,v=r.memoizedState;if((i=p==null?void 0:p.editor)!=null&&i.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const I=p.editor;I.selection,I.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(o=v==null?void 0:v.memoizedState)==null?void 0:o.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),v.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function $e(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const c of t)e.push({input:c,origType:"file"}),c.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function Ee(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ft})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ft})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function ke(e,t,c){var p;const i=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...e.map(v=>v.input)];for(const v of i)!o.includes(v)&&v.offsetParent===null&&o.push(v);for(const v of o)v.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ft})`),!1;let s;if(c&&c.size>0){const v=Array.from(d).filter(I=>!c.has(I));v.length>0?(s=v[v.length-1],n(`เล็งเป้า file input ใหม่ (${v.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const r=new DataTransfer;r.items.add(t);try{s.files=r.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(v){n(`กำหนด target.files ล้มเหลว: ${v.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:r.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(I){return _(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${I.message}`),!1}}const l=s._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const v=new DataTransfer;v.items.add(t);const I=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:v});s.dispatchEvent(I),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ft}`),!0}function yt(){let e=0;const t=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("img");for(const o of c){if(t&&t.contains(o))continue;const d=o.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&o.src&&o.offsetParent!==null&&e++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of i){if(t&&t.contains(o))continue;const d=o.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&o.offsetParent!==null&&e++}return e}async function te(e,t){var v;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const c=ye(e,t);n(`ขนาดไฟล์: ${(c.size/1024).toFixed(1)} KB`);const i=yt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${i} รูป`);const o=async(I,L=8e3)=>{const m=Date.now();for(;Date.now()-m<L;){const a=yt();if(a>i)return n(`✅ [${I}] ยืนยัน: รูปย่อเพิ่มจาก ${i} → ${a}`),!0;await h(500)}return n(`⚠️ [${I}] รูปย่อไม่เพิ่ม (ยังคง ${yt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=ve();if(!d)return _("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const r=Ee();let l=$e();const p=new MutationObserver(I=>{for(const L of I)for(const m of L.addedNodes)if(m instanceof HTMLInputElement&&m.type==="file"&&(m.type="text",l.push({input:m,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),m instanceof HTMLElement){const a=m.querySelectorAll('input[type="file"]');for(const u of a)u.type="text",l.push({input:u,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await h(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let I=!1;const L=Date.now();for(;!I&&Date.now()-L<5e3;){const a=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const u of a){if(u===d)continue;const C=u.querySelectorAll("i");for(const M of C){const $=((v=M.textContent)==null?void 0:v.trim())||"";if(($==="upload"||$==="upload_file")&&!Array.from(u.querySelectorAll("i")).map(k=>{var T;return(T=k.textContent)==null?void 0:T.trim()}).includes("drive_folder_upload")){u.click(),I=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${$}) ✅`);break}}if(I)break}if(!I)for(const u of a){if(u===d)continue;const C=u.childNodes.length<=5?(u.textContent||"").trim():"";if(C.length>0&&C.length<40){const M=C.toLowerCase();if(M==="upload"||M==="อัปโหลด"||M==="อัพโหลด"||M.includes("upload image")||M.includes("upload photo")||M.includes("อัปโหลดรูปภาพ")||M.includes("อัพโหลดรูปภาพ")||M.includes("from computer")||M.includes("จากคอมพิวเตอร์")){u.click(),I=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${C}") ✅`);break}}}I||await h(500)}return I?(await h(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),ke(l,c,s)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(_(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(_("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),r();for(const I of l)I.input.type!=="file"&&(I.input.type="file")}}async function Ce(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const c=document.querySelectorAll("button");let i=null;for(const m of c){const a=m.textContent||"";if((a.includes("Nano Banana")||a.includes("Imagen")||a.includes("วิดีโอ")||a.includes("รูปภาพ")||a.includes("Image")||a.includes("Video"))&&m.getBoundingClientRect().bottom>window.innerHeight*.7){i=m,n(`พบปุ่มตั้งค่าจากข้อความ: "${a.substring(0,30).trim()}"`);break}}if(!i)for(const m of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const a=xt(m);for(const u of a)if(u.getBoundingClientRect().bottom>window.innerHeight*.7){i=u,n(`พบปุ่มตั้งค่าจากไอคอน: ${m}`);break}if(i)break}if(!i)return _("ไม่พบปุ่มตั้งค่า"),!1;const o=i.getBoundingClientRect(),d=o.left+o.width/2,s=o.top+o.height/2,r={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",r)),await h(80),i.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",r)),i.dispatchEvent(new MouseEvent("click",r)),n("คลิกปุ่มตั้งค่าแล้ว"),await h(1500);let l=!1,p=null;const v=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const m of v){const a=m.getAttribute("aria-controls")||"",u=m.id||"";if(a.toUpperCase().includes("IMAGE")||u.toUpperCase().includes("IMAGE")){p=m,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${a})`);break}}if(!p)for(const m of document.querySelectorAll('[role="tab"]')){const a=m.id||"";if(a.toUpperCase().includes("TRIGGER-IMAGE")){p=m,n(`พบแท็บ Image ผ่าน id: ${a}`);break}}if(!p)for(const m of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const a=(m.textContent||"").trim();if((a==="Image"||a.endsWith("Image")||a==="รูปภาพ"||a==="ภาพ")&&!a.includes("Video")&&!a.includes("วิดีโอ")){p=m,n(`พบแท็บ Image ผ่านข้อความ: "${a}"`);break}}if(p){const m=p.getAttribute("data-state")||"",a=p.getAttribute("aria-selected")||"";if(m==="active"||a==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const u=p.getBoundingClientRect(),C={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",C)),await h(80),p.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",C)),p.dispatchEvent(new MouseEvent("click",C)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await h(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const I=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const m of document.querySelectorAll("button, [role='tab'], [role='option']")){const a=(m.textContent||"").trim();if(a===I||a.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const u=m.getBoundingClientRect(),C={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",C)),await h(80),m.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",C)),m.dispatchEvent(new MouseEvent("click",C)),n(`เลือกทิศทาง: ${I}`),await h(400);break}}const L=`x${t}`;for(const m of document.querySelectorAll("button, [role='tab'], [role='option']"))if((m.textContent||"").trim()===L){const u=m.getBoundingClientRect(),C={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",C)),await h(80),m.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",C)),m.dispatchEvent(new MouseEvent("click",C)),n(`เลือกจำนวน: ${L}`),await h(400);break}return await h(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),i.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",r)),await h(80),i.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",r)),i.dispatchEvent(new MouseEvent("click",r)),n("ปิดหน้าตั้งค่าแล้ว"),await h(600),!0}async function Me(e){var $,b,k,T;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,c=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),i=c?c[1]:"unknown",o=_t?"macOS":Bt?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=_t?((b=($=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:$[1])==null?void 0:b.replace(/_/g,"."))||"":Bt&&((k=t.match(/Windows NT ([0-9.]+)/))==null?void 0:k[1])||"",s=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${d} | Chrome ${i}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${r} | แพลตฟอร์ม: ${ft}`),n("══════════════════════════════════════════");try{kt(e.theme)}catch{}try{At()}catch(w){console.warn("Overlay show error:",w)}const l=[],p=[];try{P("settings","active");const w=e.orientation||"horizontal",B=e.outputCount||1,f=await Ce(w,B);l.push(f?"✅ Settings":"⚠️ Settings"),P("settings",f?"done":"error")}catch(w){_(`ตั้งค่าผิดพลาด: ${w.message}`),l.push("⚠️ Settings"),P("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const v=()=>{const w=document.querySelectorAll("span, div, p, label");for(const B of w){const f=(B.textContent||"").trim();if(/^\d{1,3}%$/.test(f)){if(f==="100%")return null;const E=B.getBoundingClientRect();if(E.width>0&&E.height>0&&E.top>0&&E.top<window.innerHeight)return f}}return null},I=async w=>{n(`รอการอัพโหลด ${w} เสร็จ...`),await h(2e3);const B=Date.now(),f=6e4;let E="",A=Date.now();const x=15e3;for(;Date.now()-B<f;){const g=v();if(g){if(g!==E)E=g,A=Date.now();else if(Date.now()-A>x){n(`✅ อัพโหลด ${w} — % ค้างที่ ${g} นาน ${x/1e3} วินาที ถือว่าเสร็จ`),await h(1e3);return}n(`กำลังอัพโหลด: ${g} — รอ...`),await h(1500)}else{n(`✅ อัพโหลด ${w} เสร็จ — ไม่พบตัวบอก %`),await h(1e3);return}}_(`⚠️ อัพโหลด ${w} หมดเวลาหลัง ${f/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){P("upload-char","active");try{const w=await te(e.characterImage,"character.png");l.push(w?"✅ ตัวละคร":"⚠️ ตัวละคร"),w||p.push("character upload failed"),P("upload-char",w?"done":"error")}catch(w){_(`อัพโหลดตัวละครผิดพลาด: ${w.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),P("upload-char","error")}await I("character")}else pt("upload-char");if(e.productImage){P("upload-prod","active");try{const w=await te(e.productImage,"product.png");l.push(w?"✅ สินค้า":"⚠️ สินค้า"),w||p.push("product upload failed"),P("upload-prod",w?"done":"error")}catch(w){_(`อัพโหลดสินค้าผิดพลาด: ${w.message}`),l.push("❌ สินค้า"),p.push("product upload error"),P("upload-prod","error")}await I("product")}else pt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800);const L=v();L&&(n(`⚠️ อัพโหลดยังแสดง ${L} — รอเพิ่มเติม...`),await I("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await h(1e3);const m=(e.characterImage?1:0)+(e.productImage?1:0);if(m>0){let w=yt();w<m&&(n(`⏳ เห็นรูปย่อแค่ ${w}/${m} — รอ 3 วินาที...`),await h(3e3),w=yt()),w>=m?n(`✅ ยืนยันรูปย่ออ้างอิง: ${w}/${m}`):_(`⚠️ คาดว่าจะมี ${m} รูปย่อ แต่พบ ${w} — ดำเนินการต่อ`)}if(dt()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{wt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await h(1e3);const a=Qt();a?(await Rt(a,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),P("img-prompt","done")):(_("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),P("img-prompt","error")),await h(800);const u=new Set;document.querySelectorAll("img").forEach(w=>{w.src&&u.add(w.src)}),n(`บันทึกรูปเดิม: ${u.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await h(500);const C=Zt();if(C){const w=C.getBoundingClientRect(),B=w.left+w.width/2,f=w.top+w.height/2,E={bubbles:!0,cancelable:!0,clientX:B,clientY:f,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",E)),await h(80),C.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",E)),C.dispatchEvent(new MouseEvent("click",E)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await h(500),C.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",E)),await h(80),C.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",E)),C.dispatchEvent(new MouseEvent("click",E)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else _("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await h(15e3);const w=document.getElementById("netflow-engine-overlay"),B=()=>{const g=document.querySelectorAll("div, span, p, label, strong, small");for(const y of g){if(w&&w.contains(y))continue;const F=(y.textContent||"").trim();if(F.length>10)continue;const R=F.match(/(\d{1,3})\s*%/);if(!R)continue;const S=parseInt(R[1],10);if(S<1||S>100)continue;const G=y.getBoundingClientRect();if(!(G.width===0||G.width>150)&&!(G.top<0||G.top>window.innerHeight))return S}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,E=-1,A=0;const x=Date.now();for(;!f&&Date.now()-x<18e4;){const g=document.querySelectorAll("img");for(const y of g){if(u.has(y.src)||!(y.alt||"").toLowerCase().includes("generated"))continue;const R=y.getBoundingClientRect();if(R.width>120&&R.height>120&&R.top>0&&R.top<window.innerHeight*.85){const S=y.closest("div");if(S){f=S,n(`พบรูป AI จาก alt="${y.alt}": ${y.src.substring(0,80)}...`);break}}}if(!f)for(const y of g){if(u.has(y.src))continue;const F=y.closest("div"),R=(F==null?void 0:F.textContent)||"";if(R.includes("product.png")||R.includes("character.png")||R.includes(".png")||R.includes(".jpg"))continue;const S=y.getBoundingClientRect();if(S.width>120&&S.height>120&&S.top>0&&S.top<window.innerHeight*.85){const G=y.closest("div");if(G){f=G,n(`พบรูปใหม่ (สำรอง): ${y.src.substring(0,80)}...`);break}}}if(!f){if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const y=Jt();if(y){_(`❌ สร้างรูปล้มเหลว: ${y}`),p.push(`image gen failed: ${y}`),P("img-wait","error");break}const F=B();F!==null?(F!==E&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${F}%`),E=F,P("img-wait","active",F)),A=Date.now()):E>30&&Math.floor((Date.now()-A)/1e3)>=3&&n(`🖼️ % หายที่ ${E}% — รูปน่าจะเสร็จแล้ว`),await h(3e3)}}if(!f)_("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),P("img-wait","done",100);const g=f.getBoundingClientRect(),y=g.left+g.width/2,F=g.top+g.height/2,R={bubbles:!0,cancelable:!0,clientX:y,clientY:F};f.dispatchEvent(new PointerEvent("pointerenter",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",R)),f.dispatchEvent(new PointerEvent("pointerover",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",R)),f.dispatchEvent(new PointerEvent("pointermove",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",R)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await h(1500);let S=null;for(const G of["more_vert","more_horiz","more"]){const O=xt(G);for(const V of O){const z=V.getBoundingClientRect();if(z.top>=g.top-20&&z.top<=g.bottom&&z.right>=g.right-150&&z.right<=g.right+20){S=V;break}}if(S)break}if(!S){const G=document.querySelectorAll("button");for(const O of G){const V=O.getBoundingClientRect();if(V.width<50&&V.height<50&&V.top>=g.top-10&&V.top<=g.top+60&&V.left>=g.right-80){const z=O.querySelectorAll("i");for(const Q of z)if((((T=Q.textContent)==null?void 0:T.trim())||"").includes("more")){S=O;break}if(S)break;const H=O.getAttribute("aria-label")||"";if(H.includes("เพิ่มเติม")||H.includes("more")){S=O;break}}}}if(!S)_("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const G=S.getBoundingClientRect(),O=G.left+G.width/2,V=G.top+G.height/2,z={bubbles:!0,cancelable:!0,clientX:O,clientY:V,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",z)),await h(80),S.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",z)),S.dispatchEvent(new MouseEvent("click",z)),n("คลิกปุ่ม 3 จุดแล้ว"),await h(1500);let H=null;const Q=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of Q){const J=(U.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){H=U;break}}if(!H)_("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const U=H.getBoundingClientRect(),J=U.left+U.width/2,N=U.top+U.height/2,D={bubbles:!0,cancelable:!0,clientX:J,clientY:N,button:0};H.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousedown",D)),await h(80),H.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mouseup",D)),H.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),P("animate","done"),await h(3e3)}}}}catch(w){_(`ขั้น 4 ผิดพลาด: ${w.message}`),l.push("⚠️ Animate")}if(dt()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{wt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await h(3e3);let w=!1;const B=document.querySelectorAll("button, span, div");for(const A of B){const x=(A.textContent||"").trim(),g=A.getBoundingClientRect();if((x==="วิดีโอ"||x==="Video"||x.includes("วิดีโอ"))&&g.bottom>window.innerHeight*.7){w=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}w||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await h(1e3);const f=Qt();f?(await Rt(f,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),P("vid-prompt","done")):(_("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),p.push("video prompt input not found"),P("vid-prompt","error")),await h(1e3),P("vid-generate","active");const E=Zt();if(E){const A=E.getBoundingClientRect(),x=A.left+A.width/2,g=A.top+A.height/2,y={bubbles:!0,cancelable:!0,clientX:x,clientY:g,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",y)),await h(80),E.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",y)),E.dispatchEvent(new MouseEvent("click",y)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),P("vid-generate","done"),await h(500),E.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",y)),await h(80),E.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",y)),E.dispatchEvent(new MouseEvent("click",y)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else _("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),P("vid-generate","error")}catch(w){_(`ขั้น 5 ผิดพลาด: ${w.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${w.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pt("animate"),pt("vid-prompt"),pt("vid-generate"),pt("vid-wait");if(e.videoPrompt){P("vid-wait","active");const w=e.sceneCount||1,B=e.videoScenePrompts||[e.videoPrompt];if(w>1)try{he(w)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${w>1?`ต่อ ${w} ฉาก`:"ดาวน์โหลด"} ===`);const f=document.getElementById("netflow-engine-overlay"),E=()=>{const g=document.querySelectorAll("div, span, p, label, strong, small");for(const y of g){if(f&&f.contains(y))continue;const F=(y.textContent||"").trim();if(F.length>10)continue;const R=F.match(/(\d{1,3})\s*%/);if(!R)continue;const S=parseInt(R[1],10);if(S<1||S>100)continue;const G=y.getBoundingClientRect();if(!(G.width===0||G.width>150)&&!(G.top<0||G.top>window.innerHeight))return S}return null},A=async(g=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await h(5e3);const y=()=>{const D=document.querySelectorAll("div, span, p, label, strong, small");let q=0;for(const j of D){if(f&&f.contains(j))continue;const it=(j.textContent||"").trim();if(it.includes("%")&&it.length<15){const st=j.tagName.toLowerCase(),ee=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Dt=j.getBoundingClientRect();if(n(`  🔍 "${it}" ใน <${st}.${ee}> ที่ (${Dt.left.toFixed(0)},${Dt.top.toFixed(0)}) w=${Dt.width.toFixed(0)}`),q++,q>=5)break}}q===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},F=Ft();n(F?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),y();const R=Date.now();let S=-1,G=0,O=!1;for(;Date.now()-R<g;){const D=E();if(D!==null){if(D!==S&&(n(`ความคืบหน้าวิดีโอ: ${D}%`),S=D,P("vid-wait","active",D)),G=Date.now(),D>=100){n("✅ ตรวจพบ 100%!"),O=!0;break}}else if(S>30){const q=Math.floor((Date.now()-G)/1e3);if(q>=5){n(`✅ % หายไปที่ ${S}% (หาย ${q} วินาที) — วิดีโอเสร็จ!`),O=!0;break}n(`⏳ % หายที่ ${S}% — ยืนยันใน ${5-q} วินาที...`)}else{const q=Math.floor((Date.now()-R)/1e3);q%15<3&&n(`⏳ รอ... (${q} วินาที) ไม่พบ %`)}if(!O&&S>0&&Ft(!0)&&!F){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${S}% — วิดีโอเสร็จ!`),O=!0;break}if(dt())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(S<1){const q=Jt();if(q)return _(`❌ สร้างวิดีโอล้มเหลว: ${q}`),null}await h(3e3)}const V=Ft();if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),P("vid-wait","error"),null;const z=V;O?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await h(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const H=z.getBoundingClientRect();let Q=H.left+H.width/2,U=H.top+H.height/2,J=z;const N=z.querySelector("video, img, canvas");if(N){const D=N.getBoundingClientRect();D.width>50&&D.height>50&&(Q=D.left+D.width/2,U=D.top+D.height/2,J=N,n(`🎯 พบรูปย่อ <${N.tagName.toLowerCase()}> ในการ์ดที่ (${Q.toFixed(0)},${U.toFixed(0)}) ${D.width.toFixed(0)}x${D.height.toFixed(0)}`))}else U=H.top+H.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${Q.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${Q.toFixed(0)}, ${U.toFixed(0)})...`),be(J);for(let D=0;D<8;D++){const q={bubbles:!0,cancelable:!0,clientX:Q+D%2,clientY:U};J.dispatchEvent(new PointerEvent("pointermove",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",q)),await h(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:w,scenePrompts:B,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${w} ฉาก, ${B.length} prompts, theme: ${e.theme})`)}catch(D){n(`⚠️ ไม่สามารถบันทึก pending action: ${D.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await x(z),J!==z&&await x(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),z},x=async g=>{const y=g.getBoundingClientRect(),F=y.left+y.width/2,R=y.top+y.height/2,S={bubbles:!0,cancelable:!0,clientX:F,clientY:R,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",S)),await h(80),g.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",S)),g.dispatchEvent(new MouseEvent("click",S)),await h(50),g.click(),n("คลิกการ์ดวิดีโอแล้ว"),await h(2e3)};try{await A()?(l.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action")):(_("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),P("vid-wait","error"))}catch(g){_(`ขั้น 6 ผิดพลาด: ${g.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${g.message}`)}}const M=p.length===0;try{wt(M?5e3:8e3)}catch(w){console.warn("Overlay complete error:",w)}return{success:M,message:M?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:M?"done":"partial"}}async function Ie(e,t=[],c){var M;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{c&&kt(c)}catch{}try{At(e)}catch($){n(`⚠️ showOverlay error: ${$.message}`)}try{const $=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const b of $)P(b,"done");e>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${$.length} steps done, sceneCount=${e}`)}catch($){n(`⚠️ overlay restore error: ${$.message}`)}await h(1500);const i=(()=>{for(const $ of document.querySelectorAll("button")){const b=$.querySelectorAll("i");for(const T of b){const w=(T.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const B=$.getBoundingClientRect();if(B.width>0&&B.height>0)return $}}const k=($.getAttribute("aria-label")||"").toLowerCase();if(k.includes("mute")||k.includes("ปิดเสียง")){const T=$.getBoundingClientRect();if(T.width>0&&T.height>0)return $}}return null})();if(i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await h(2e3);for(let x=2;x<=e;x++){const g=t[x-1];if(!g){_(`ไม่พบ prompt สำหรับฉากที่ ${x}`);continue}n(`── ฉากที่ ${x}/${e}: วาง prompt + generate ──`);let y=null;const F=Date.now();for(;!y&&Date.now()-F<1e4;){const N=document.querySelectorAll("[data-slate-editor='true']");if(N.length>0&&(y=N[N.length-1]),!y){const D=document.querySelectorAll("[role='textbox'][contenteditable='true']");D.length>0&&(y=D[D.length-1])}y||await h(1e3)}if(!y){_("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${y.tagName.toLowerCase()}> ${y.className.substring(0,40)}`),await Rt(y,g),n(`วาง prompt ฉาก ${x} (${g.length} ตัวอักษร) ✅`);try{P(`scene${x}-prompt`,"done"),P(`scene${x}-gen`,"active")}catch{}await h(1e3);const R=y.getBoundingClientRect();let S=null,G=1/0;for(const N of document.querySelectorAll("button")){if(N.disabled)continue;const D=N.querySelectorAll("i");let q=!1;for(const st of D)if((st.textContent||"").trim()==="arrow_forward"){q=!0;break}if(!q)continue;const j=N.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const it=Math.abs(j.top-R.top)+Math.abs(j.right-R.right);it<G&&(G=it,S=N)}if(!S)for(const N of document.querySelectorAll("button")){const D=N.querySelectorAll("i");for(const q of D)if((q.textContent||"").trim()==="arrow_forward"){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0){S=N;break}}if(S)break}if(!S){_("ไม่พบปุ่ม Generate/Send");return}await new Promise(N=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene2_gen_and_download",theme:c}},()=>N())}),n("💾 บันทึก pending action: wait_scene2_gen_and_download (ป้องกันหน้า reload)"),await Z(S),n(`คลิก Generate ฉาก ${x} ✅`);try{P(`scene${x}-gen`,"done"),P(`scene${x}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${x} gen เสร็จ ──`),await h(5e3);const O=document.getElementById("netflow-engine-overlay");let V=0,z=0;const H=Date.now(),Q=6e5,U=5e3;let J=!1;for(;Date.now()-H<Q;){let N=null;const D=document.querySelectorAll("div, span, p, label, strong, small");for(const q of D){if(O&&O.contains(q))continue;const it=(q.textContent||"").trim().match(/^(\d{1,3})%$/);if(it){const st=q.getBoundingClientRect();if(st.width>0&&st.height>0&&st.width<120&&st.height<60){N=parseInt(it[1],10);break}}}if(N!==null)N!==V&&(n(`🎬 ฉาก ${x} ความคืบหน้า: ${N}%`),V=N),z=0;else if(V>0){if(z===0)z=Date.now(),n(`🔍 ฉาก ${x}: % หายไป (จาก ${V}%) — กำลังยืนยัน...`);else if(Date.now()-z>=U){n(`✅ ฉาก ${x}: % หายไป ${U/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(dt()){n("⛔ ผู้ใช้สั่งหยุด");return}await h(2e3)}J||_(`ฉาก ${x} หมดเวลา`),n(`✅ ฉาก ${x} เสร็จแล้ว`);try{P(`scene${x}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await h(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}await h(2e3);const $=Date.now();let b=null;const k=Date.now();for(;!b&&Date.now()-k<1e4;){for(const x of document.querySelectorAll("button")){const g=x.querySelector("i");if(g&&(g.textContent||"").trim()==="download"){const y=x.getBoundingClientRect();if(y.width>0&&y.height>0){b=x;break}}}b||await h(1e3)}if(!b){_("ไม่พบปุ่มดาวน์โหลด");return}await Z(b),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await h(1500);let T=null;for(let x=0;x<3&&!T;x++){x>0&&n(`🔄 ลองหา 720p ครั้งที่ ${x+1}...`);let g=null;const y=Date.now();for(;!g&&Date.now()-y<5e3;){for(const O of document.querySelectorAll("[role='menuitem']"))if((O.textContent||"").trim().includes("Full Video")&&O.querySelector("i")){const z=O.getBoundingClientRect();if(z.width>0&&z.height>0){g=O;break}}g||await h(500)}if(!g){_("ไม่พบ Full Video");continue}const F=g.getBoundingClientRect(),R=F.left+F.width/2,S=F.top+F.height/2;g.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:R,clientY:S})),g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:S})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R,clientY:S})),await Z(g),n("คลิก/hover Full Video ✅"),await h(2e3);const G=Date.now();for(;!T&&Date.now()-G<8e3;){for(const O of document.querySelectorAll("button[role='menuitem']")){const V=O.querySelectorAll("span");for(const z of V)if((z.textContent||"").trim()==="720p"){const H=O.getBoundingClientRect();if(H.width>0&&H.height>0){T=O;break}}if(T)break}T||(g.isConnected&&(g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:S})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R+20,clientY:S}))),await h(500))}}if(!T){_("ไม่พบ 720p");return}await Z(T),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const w=Date.now();let B=!1,f=!1;for(;Date.now()-w<3e5;){for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div")){const g=(x.textContent||"").trim();if(g==="Download complete!"||g==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),B=!0;break}(g.includes("Downloading your extended video")||g.includes("กำลังดาวน์โหลด"))&&(f||(f=!0,n("⏳ กำลังดาวน์โหลด...")))}if(B)break;if(f){let x=!1;for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((g.textContent||"").trim().includes("Downloading")){x=!0;break}if(!x){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),B=!0;break}}if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await h(2e3)}if(!B){_("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let E=!1;const A=Date.now();for(;Date.now()-A<6e4&&!E;){try{await new Promise(x=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:$},g=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):g!=null&&g.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${g.message}`),E=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${g==null?void 0:g.message}`),x()})})}catch(x){_(`ตรวจสอบผิดพลาด: ${x.message}`)}E||await h(3e3)}E||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),wt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await h(2e3);const o=($,b="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const k of document.querySelectorAll(b)){const T=(k.textContent||"").trim();if(T.includes($)&&T.length<100){const w=k.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return k}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const s=Date.now();for(;!d&&Date.now()-s<1e4;){for(const $ of document.querySelectorAll("button, [role='button']")){const b=($.textContent||"").trim(),k=b.toLowerCase();if((k.includes("download")||k.includes("ดาวน์โหลด"))&&b.length<80){const T=$.getBoundingClientRect();if(T.width>0&&T.height>0){d=$;break}}}if(!d)for(const $ of document.querySelectorAll("button")){const b=($.getAttribute("aria-label")||"").toLowerCase();if(b.includes("download")||b.includes("ดาวน์")){const k=$.getBoundingClientRect();if(k.width>0&&k.height>0){d=$;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await h(1e3))}if(!d){_("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await Z(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await h(1500);const r=Date.now();let l=null;const p=Date.now();for(;!l&&Date.now()-p<5e3;)l=o("1080p"),l||(n("รอ 1080p..."),await h(500));if(!l){_("ไม่พบ 1080p");return}await Z(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const v=Date.now();let I=!1,L=!1,m=0;const a=3e3;for(;Date.now()-v<3e5;){const b=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(b.includes("upscaling complete")||b.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),I=!0;break}for(const T of document.querySelectorAll("div, span, p")){const w=(T.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(M=T.textContent)==null?void 0:M.trim()}")`),I=!0;break}}if(I)break;if(b.includes("upscaling your video")||b.includes("กำลังอัปสเกล")){L=!0,m=0;const T=Math.floor((Date.now()-v)/1e3);n(`⏳ กำลังอัปสเกล... (${T} วินาที)`)}else if(L){if(m===0)m=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-m>=a){n(`✅ ข้อความ Upscaling หายไป ${a/1e3} วินาที — เสร็จ!`),I=!0;break}}else{const T=Math.floor((Date.now()-v)/1e3);T%10<3&&n(`⏳ รอ Upscale... (${T} วินาที)`)}if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await h(2e3)}if(!I){_("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let u=!1;const C=Date.now();for(;Date.now()-C<6e4&&!u;){try{await new Promise($=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},b=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),u=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${b==null?void 0:b.message}`),$()})})}catch($){_(`ตรวจสอบผิดพลาด: ${$.message}`)}u||await h(3e3)}u||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function Se(e){n("═══ Pending: รอ scene 2 gen เสร็จ + ดาวน์โหลด ═══");try{e&&kt(e)}catch{}try{At(2)}catch(b){n(`⚠️ showOverlay error: ${b.message}`)}try{const b=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait","scene2-prompt","scene2-gen"];for(const k of b)P(k,"done");P("scene2-wait","active"),n(`✅ overlay restored: ${b.length} steps done (scene2 navigate)`)}catch(b){n(`⚠️ overlay restore error: ${b.message}`)}await h(2e3);const t=(()=>{for(const b of document.querySelectorAll("button")){const k=b.querySelectorAll("i");for(const T of k){const w=(T.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const B=b.getBoundingClientRect();if(B.width>0&&B.height>0)return b}}}return null})();t?(t.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n("── รอวิดีโอ scene 2 gen เสร็จ (หลัง page navigate) ──");const c=document.getElementById("netflow-engine-overlay");let i=0,o=0;const d=Date.now(),s=6e5,r=5e3;let l=!1,p=0;for(;Date.now()-d<s;){let b=null;const k=document.querySelectorAll("div, span, p, label, strong, small");for(const T of k){if(c&&c.contains(T))continue;const B=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if(B){const f=T.getBoundingClientRect();if(f.width>0&&f.height>0&&f.width<120&&f.height<60){b=parseInt(B[1],10);break}}}if(b!==null)p=0,b!==i&&(n(`🎬 scene 2 ความคืบหน้า: ${b}%`),i=b),o=0;else if(i>0){if(o===0)o=Date.now(),n(`🔍 scene 2: % หายไป (จาก ${i}%) — กำลังยืนยัน...`);else if(Date.now()-o>=r){n(`✅ scene 2: % หายไป ${r/1e3} วินาที — เจนเสร็จ!`),l=!0;break}}else if(p++,p>=15){const T=document.querySelectorAll("video");let w=!1;for(const B of T)if(B.readyState>=2&&!B.paused&&B.getBoundingClientRect().width>200){w=!0;break}if(w){n("✅ scene 2: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว"),l=!0;break}if(p>=30){n("✅ scene 2: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ"),l=!0;break}}await h(2e3)}l||n("⚠️ scene 2 หมดเวลา — ลองดาวน์โหลดต่อ");try{P("scene2-wait","done",100)}catch{}n("✅ scene 2 เสร็จ — เริ่มดาวน์โหลด"),await h(3e3);try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const v=Date.now();let I=null;const L=Date.now();for(;!I&&Date.now()-L<1e4;){for(const b of document.querySelectorAll("button")){const k=b.querySelector("i");if(k&&(k.textContent||"").trim()==="download"){const T=b.getBoundingClientRect();if(T.width>0&&T.height>0){I=b;break}}}I||await h(1e3)}if(!I){_("ไม่พบปุ่มดาวน์โหลด");return}await Z(I),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await h(1500);let m=null;for(let b=0;b<3&&!m;b++){b>0&&n(`🔄 ลองหา 720p ครั้งที่ ${b+1}...`);let k=null;const T=Date.now();for(;!k&&Date.now()-T<5e3;){for(const A of document.querySelectorAll("[role='menuitem']"))if((A.textContent||"").trim().includes("Full Video")&&A.querySelector("i")){const g=A.getBoundingClientRect();if(g.width>0&&g.height>0){k=A;break}}k||await h(500)}if(!k){_("ไม่พบ Full Video");continue}const w=k.getBoundingClientRect(),B=w.left+w.width/2,f=w.top+w.height/2;k.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:B,clientY:f})),k.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:B,clientY:f})),k.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:B,clientY:f})),await Z(k),n("คลิก/hover Full Video ✅"),await h(2e3);const E=Date.now();for(;!m&&Date.now()-E<8e3;){for(const A of document.querySelectorAll("button[role='menuitem']")){const x=A.querySelectorAll("span");for(const g of x)if((g.textContent||"").trim()==="720p"){const y=A.getBoundingClientRect();if(y.width>0&&y.height>0){m=A;break}}if(m)break}m||(k.isConnected&&(k.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:B,clientY:f})),k.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:B+20,clientY:f}))),await h(500))}}if(!m){_("ไม่พบ 720p");return}await Z(m),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const a=Date.now();let u=!1,C=!1;for(;Date.now()-a<3e5;){for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div")){const k=(b.textContent||"").trim();if(k==="Download complete!"||k==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),u=!0;break}(k.includes("Downloading your extended video")||k.includes("กำลังดาวน์โหลด"))&&(C||(C=!0,n("⏳ กำลังดาวน์โหลด...")))}if(u)break;if(C){let b=!1;for(const k of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((k.textContent||"").trim().includes("Downloading")){b=!0;break}if(!b){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),u=!0;break}}await h(2e3)}if(!u){_("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let M=!1;const $=Date.now();for(;Date.now()-$<6e4&&!M;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:v},k=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):k!=null&&k.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${k.message}`),M=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${k==null?void 0:k.message}`),b()})})}catch(b){_(`ตรวจสอบผิดพลาด: ${b.message}`)}M||await h(3e3)}M||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),wt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Pe(){try{const e=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const c=Date.now()-e.timestamp;if(c>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:e},()=>d())}),await h(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const r=s==null?void 0:s.netflow_pending_action;d((r==null?void 0:r._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(c/1e3)} วินาที)`),e.action==="mute_video"?await Ie(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene2_gen_and_download"?await Se(e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,c)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),c({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Me(e).then(i=>n(`✅ ระบบอัตโนมัติเสร็จ: ${i.message}`)).catch(i=>console.error("[Netflow AI] Generate error:",i)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,c({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return c({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return c({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await h(500);const i=xe();if(!i){_("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=i.getBoundingClientRect(),d=o.left+o.width/2,s=o.top+o.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const l=document.elementFromPoint(d,s);l?(await Z(l),n(`คลิก ${r+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await Z(i),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await h(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Pe(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),i=Math.round(e.clientX),o=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${i},${o}) → <${c}> "${d}"`)},!0)})();
