(function(){"use strict";const it={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let W=it.green,ft=null;function Et(e){e&&it[e]&&(ft=e,W=it[e],Rt(),requestAnimationFrame(()=>Yt()))}function ee(){if(ft&&it[ft])return it[ft];try{const e=localStorage.getItem("netflow_app_theme");if(e&&it[e])return it[e]}catch{}return it.green}let Q=0,tt=255,et=65;function Rt(){const e=W.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(Q=parseInt(e[1],16),tt=parseInt(e[2],16),et=parseInt(e[3],16))}let V=null,Y=null,at=null,Dt=0,yt=null,ut=null,vt=null,kt=0,st=!1,nt=null,gt=null,mt=null,$t=1,X=[];function Ct(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let c=2;c<=e;c++)t.push({stepId:`scene${c}-prompt`,label:`Scene ${c} Prompt`,status:"waiting"},{stepId:`scene${c}-gen`,label:`Scene ${c} Generate`,status:"waiting"},{stepId:`scene${c}-wait`,label:`Scene ${c} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const lt=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];X=Ct(1);function ne(e){const t=e.rgb,c=e.accentRgb,a=e.doneRgb,o=e.hex,d=e.accentHex,s=e.doneHex,r=(()=>{const u=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!u)return"#4ade80";const C=M=>Math.min(255,M+80);return`#${[1,2,3].map(M=>C(parseInt(u[M],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const u=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!u)return"#4ade80";const C=M=>Math.min(255,M+60);return`#${[1,2,3].map(M=>C(parseInt(u[M],16)).toString(16).padStart(2,"0")).join("")}`})(),p=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),y=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,S=p?parseInt(p[1],16)/y:0,L=p?parseInt(p[2],16)/y:1,b=p?parseInt(p[3],16)/y:.25,i=u=>`${Math.round(S*u)}, ${Math.round(L*u)}, ${Math.round(b*u)}`;return`
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
    background: linear-gradient(180deg, rgba(${i(6)},0.75) 0%, rgba(${i(3)},0.92) 100%);
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

    `}function Lt(){at||(at=document.createElement("style"),at.id="netflow-overlay-styles",at.textContent=ne(W),document.head.appendChild(at))}function Gt(e){e.innerHTML="",X.forEach((t,c)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${t.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${c+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(a)})}function oe(){const e=document.getElementById("nf-terminal");if(!e)return;Gt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${X.length}`)}function Ot(e,t){let r="";for(let m=0;m<32;m++){const x=m/32*Math.PI*2,F=(m+.2)/32*Math.PI*2,f=(m+.5)/32*Math.PI*2,g=(m+.8)/32*Math.PI*2,k=(m+1)/32*Math.PI*2;r+=`${m===0?"M":"L"}${(120+104*Math.cos(x)).toFixed(1)},${(120+104*Math.sin(x)).toFixed(1)} `,r+=`L${(120+104*Math.cos(F)).toFixed(1)},${(120+104*Math.sin(F)).toFixed(1)} `,r+=`L${(120+116*Math.cos(f)).toFixed(1)},${(120+116*Math.sin(f)).toFixed(1)} `,r+=`L${(120+104*Math.cos(g)).toFixed(1)},${(120+104*Math.sin(g)).toFixed(1)} `,r+=`L${(120+104*Math.cos(k)).toFixed(1)},${(120+104*Math.sin(k)).toFixed(1)} `}r+="Z";const l=24,p=100,y=90;let S="";for(let m=0;m<l;m++){const x=m/l*Math.PI*2,F=(m+.25)/l*Math.PI*2,f=(m+.75)/l*Math.PI*2,g=(m+1)/l*Math.PI*2;S+=`${m===0?"M":"L"}${(120+y*Math.cos(x)).toFixed(1)},${(120+y*Math.sin(x)).toFixed(1)} `,S+=`L${(120+p*Math.cos(F)).toFixed(1)},${(120+p*Math.sin(F)).toFixed(1)} `,S+=`L${(120+p*Math.cos(f)).toFixed(1)},${(120+p*Math.sin(f)).toFixed(1)} `,S+=`L${(120+y*Math.cos(g)).toFixed(1)},${(120+y*Math.sin(g)).toFixed(1)} `}S+="Z";let L="";for(let m=0;m<64;m++){const x=m/64*Math.PI*2,F=m%4===0?117:119,f=m%4===0?124:122,g=m%4===0?.8:.4,k=m%4===0?.7:.35;L+=`<line x1="${(120+F*Math.cos(x)).toFixed(1)}" y1="${(120+F*Math.sin(x)).toFixed(1)}" x2="${(120+f*Math.cos(x)).toFixed(1)}" y2="${(120+f*Math.sin(x)).toFixed(1)}" stroke="rgba(${e},${k})" stroke-width="${g}"/>`}const b=26,i=78,u=68;let C="";for(let m=0;m<b;m++){const x=m/b*Math.PI*2,F=(m+.2)/b*Math.PI*2,f=(m+.5)/b*Math.PI*2,g=(m+.8)/b*Math.PI*2,k=(m+1)/b*Math.PI*2;C+=`${m===0?"M":"L"}${(120+u*Math.cos(x)).toFixed(1)},${(120+u*Math.sin(x)).toFixed(1)} `,C+=`L${(120+u*Math.cos(F)).toFixed(1)},${(120+u*Math.sin(F)).toFixed(1)} `,C+=`L${(120+i*Math.cos(f)).toFixed(1)},${(120+i*Math.sin(f)).toFixed(1)} `,C+=`L${(120+u*Math.cos(g)).toFixed(1)},${(120+u*Math.sin(g)).toFixed(1)} `,C+=`L${(120+u*Math.cos(k)).toFixed(1)},${(120+u*Math.sin(k)).toFixed(1)} `}C+="Z";let M="";for(let m=0;m<48;m++){const x=m/48*Math.PI*2,F=m%4===0?79:80,f=m%4===0?85:83,g=m%4===0?.6:.3,k=m%4===0?.6:.3;M+=`<line x1="${(120+F*Math.cos(x)).toFixed(1)}" y1="${(120+F*Math.sin(x)).toFixed(1)}" x2="${(120+f*Math.cos(x)).toFixed(1)}" y2="${(120+f*Math.sin(x)).toFixed(1)}" stroke="rgba(${t},${k})" stroke-width="${g}"/>`}function v(m,x,F,f,g){let k="";for(let B=0;B<F;B++){const P=B/F*Math.PI*2,R=(B+.25)/F*Math.PI*2,q=(B+.75)/F*Math.PI*2,G=(B+1)/F*Math.PI*2;k+=`${B===0?"M":"L"}${(m+g*Math.cos(P)).toFixed(1)},${(x+g*Math.sin(P)).toFixed(1)} `,k+=`L${(m+f*Math.cos(R)).toFixed(1)},${(x+f*Math.sin(R)).toFixed(1)} `,k+=`L${(m+f*Math.cos(q)).toFixed(1)},${(x+f*Math.sin(q)).toFixed(1)} `,k+=`L${(m+g*Math.cos(G)).toFixed(1)},${(x+g*Math.sin(G)).toFixed(1)} `}return k+"Z"}const A=42,E=[],$=v(120,120,14,18,13);E.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${$}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let m=0;m<8;m++){const x=m/8*Math.PI*2,F=120+A*Math.cos(x),f=120+A*Math.sin(x),k=v(F,f,10,14,10),B=m%2===0?"":"animation-direction:reverse;";E.push(`<g class="nf-kinetic-sub" style="transform-origin:${F.toFixed(1)}px ${f.toFixed(1)}px;${B}">
            <path d="${k}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${F.toFixed(1)}" cy="${f.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${F.toFixed(1)}" cy="${f.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const w=E.join(`
`);let T="";for(let m=0;m<8;m++){const x=m/8*Math.PI*2,F=120+10*Math.cos(x),f=120+10*Math.sin(x),g=120+(A-10)*Math.cos(x),k=120+(A-10)*Math.sin(x);T+=`<line x1="${F.toFixed(1)}" y1="${f.toFixed(1)}" x2="${g.toFixed(1)}" y2="${k.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${S}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${y}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
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
        ${T}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${w}
        </g>
    </svg>`}function ie(){const e=document.createElement("div");e.id="netflow-engine-overlay",nt=document.createElement("canvas"),nt.id="nf-matrix-canvas",e.appendChild(nt);const t=document.createElement("div");t.className="nf-pat-data",e.appendChild(t);const c=document.createElement("div");c.className="nf-center-glow",e.appendChild(c);const a=document.createElement("div");a.className="nf-pat-noise",e.appendChild(a);const o=document.createElement("div");o.className="nf-vignette",e.appendChild(o);for(let M=0;M<3;M++){const v=document.createElement("div");v.className="nf-pulse-ring",e.appendChild(v)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(M=>{const v=document.createElement("div");v.className=`nf-corner-deco ${M}`,e.appendChild(v)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Ut(),e.appendChild(d);const s=document.createElement("div");s.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const l=document.createElement("div");l.className="nf-core-header",l.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,r.appendChild(l);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",Gt(p),r.appendChild(p);const y=document.createElement("div");y.className="nf-engine-core",y.id="nf-engine-core";const S=document.createElement("div");S.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(M=>{const v=document.createElement("div");v.className=`nf-frame-corner ${M}`,S.appendChild(v)}),y.appendChild(S);const L="http://www.w3.org/2000/svg",b=document.createElementNS(L,"svg");b.setAttribute("class","nf-engine-waves"),b.setAttribute("viewBox","0 0 560 140"),b.setAttribute("preserveAspectRatio","none"),b.id="nf-engine-waves";for(let M=0;M<6;M++){const v=document.createElementNS(L,"path");v.setAttribute("fill","none"),v.setAttribute("stroke-width",M<3?"1.5":"1"),v.setAttribute("stroke",M<3?`rgba(${W.rgb},${.12+M*.08})`:`rgba(${W.accentRgb},${.08+(M-3)*.06})`),v.setAttribute("data-wave-idx",String(M)),b.appendChild(v)}y.appendChild(b);const i=document.createElement("div");i.className="nf-engine-brand-inner",i.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Ot(W.rgb,W.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Ot(W.rgb,W.accentRgb)}
        </div>
    `,y.appendChild(i);const u=document.createElement("div");u.className="nf-engine-stats",u.id="nf-engine-stats",u.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([M,v,A])=>`<div class="nf-stat-item"><span class="nf-stat-label">${M}</span><span class="nf-stat-val" id="${v}">${A}</span></div>`).join(""),y.appendChild(u),r.appendChild(y),s.appendChild(r);const C=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];lt.forEach((M,v)=>{const A=ae(M);A.classList.add(C[v]),A.id=`nf-mod-${M.id}`,s.appendChild(A)}),e.appendChild(s);for(let M=0;M<30;M++){const v=document.createElement("div");v.className="nf-particle",v.style.left=`${5+Math.random()*90}%`,v.style.bottom=`${Math.random()*40}%`,v.style.animationDuration=`${3+Math.random()*5}s`,v.style.animationDelay=`${Math.random()*4}s`;const A=.3+Math.random()*.4,E=.7+Math.random()*.3;v.style.background=`rgba(${Math.floor(Q*E)}, ${Math.floor(tt*E)}, ${Math.floor(et*E)}, ${A})`,v.style.width=`${1+Math.random()*2}px`,v.style.height=v.style.width,e.appendChild(v)}return e}function ae(e){const t=document.createElement("div");t.className="nf-module";const c=document.createElement("div");c.className="nf-mod-header",c.innerHTML=`
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
        `,t.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a),t}function re(){Dt=Date.now(),yt=setInterval(()=>{const e=Math.floor((Date.now()-Dt)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),c=String(e%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${t}:${c}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${t}:${c}`)},1e3)}function Nt(){yt&&(clearInterval(yt),yt=null)}const se=220,Mt=210,zt=.4;let ht=[];function le(e,t){ht=[];for(let c=0;c<se;c++){const a=Math.random();let o;a<.22?o=0:a<.4?o=1:a<.55?o=2:a<.68?o=3:a<.84?o=4:o=5;const d=Math.random()*e,s=Math.random()*t,r=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);ht.push({x:o===0?Math.random()*e:d+Math.cos(l)*r,y:o===0?Math.random()*t:s+Math.sin(l)*r,vx:(Math.random()-.5)*zt,vy:(Math.random()-.5)*zt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:d,oCy:s,oRadius:r,oAngle:l,oSpeed:p})}}function ce(){if(!nt)return;const e=nt;if(gt=e.getContext("2d"),!gt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,ht.length===0&&le(e.width,e.height)};t(),window.addEventListener("resize",t);let c=null,a=0,o=0;function d(){if(!gt||!nt){mt=null;return}mt=requestAnimationFrame(d);const s=gt,r=nt.width,l=nt.height;s.fillStyle=`rgba(${Q*.04|0},${tt*.04|0},${et*.06|0},1)`,s.fillRect(0,0,r,l),(!c||a!==r||o!==l)&&(a=r,o=l,c=s.createRadialGradient(r*.5,l*.5,0,r*.5,l*.5,Math.max(r,l)*.6),c.addColorStop(0,`rgba(${Q*.08|0},${tt*.08|0},${et*.1|0},0.4)`),c.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=c,s.fillRect(0,0,r,l);const p=ht,y=p.length,S=Mt*Mt;for(let b=0;b<y;b++){const i=p[b];if(i.pulsePhase+=i.pulseSpeed,i.motion===0)i.x+=i.vx,i.y+=i.vy,i.x<0?(i.x=0,i.vx=Math.abs(i.vx)*(.8+Math.random()*.4)):i.x>r&&(i.x=r,i.vx=-Math.abs(i.vx)*(.8+Math.random()*.4)),i.y<0?(i.y=0,i.vy=Math.abs(i.vy)*(.8+Math.random()*.4)):i.y>l&&(i.y=l,i.vy=-Math.abs(i.vy)*(.8+Math.random()*.4));else if(i.motion===1)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius,i.oCx+=Math.sin(i.oAngle*.3)*.15,i.oCy+=Math.cos(i.oAngle*.3)*.15;else if(i.motion===2)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius*.5,i.oCx+=Math.sin(i.oAngle*.2)*.1,i.oCy+=Math.cos(i.oAngle*.2)*.1;else if(i.motion===3){i.oAngle+=i.oSpeed;const u=i.oAngle,C=i.oRadius*.7;i.x=i.oCx+C*Math.cos(u),i.y=i.oCy+C*Math.sin(u)*Math.cos(u),i.oCx+=Math.sin(u*.15)*.12,i.oCy+=Math.cos(u*.15)*.12}else if(i.motion===4){i.oAngle+=i.oSpeed*1.2;const u=i.oRadius*(.5+.5*Math.abs(Math.sin(i.oAngle*.15)));i.x=i.oCx+Math.cos(i.oAngle)*u,i.y=i.oCy+Math.sin(i.oAngle)*u,i.oCx+=Math.sin(i.oAngle*.1)*.18,i.oCy+=Math.cos(i.oAngle*.1)*.18}else i.oAngle+=i.oSpeed,i.x+=i.vx*.8,i.y=i.oCy+Math.sin(i.oAngle+i.x*.008)*i.oRadius*.35,i.x<-30?i.x=r+30:i.x>r+30&&(i.x=-30),i.oCy+=Math.sin(i.oAngle*.1)*.08;if(i.motion>0){const u=i.oRadius+50;i.oCx<-u?i.oCx=r+u:i.oCx>r+u&&(i.oCx=-u),i.oCy<-u?i.oCy=l+u:i.oCy>l+u&&(i.oCy=-u)}}const L=5;for(let b=0;b<L;b++){const i=b/L,u=(b+1)/L,C=((i+u)*.5*.35).toFixed(3);s.beginPath(),s.strokeStyle=`rgba(${Q},${tt},${et},${C})`,s.lineWidth=(i+u)*.5*1.2;for(let M=0;M<y;M++){const v=p[M];for(let A=M+1;A<y;A++){const E=p[A],$=v.x-E.x,w=v.y-E.y,T=$*$+w*w;if(T<S){const m=1-Math.sqrt(T)/Mt;m>=i&&m<u&&(s.moveTo(v.x,v.y),s.lineTo(E.x,E.y))}}}s.stroke()}s.save(),s.shadowColor=`rgba(${Q},${tt},${et},0.8)`,s.shadowBlur=25;for(let b=0;b<y;b++){const i=p[b],u=.6+.4*Math.sin(i.pulsePhase),C=i.radius*(.8+u*.4),M=Q+(255-Q)*.7*u|0,v=tt+(255-tt)*.7*u|0,A=et+(255-et)*.7*u|0;s.beginPath(),s.arc(i.x,i.y,C,0,Math.PI*2),s.fillStyle=`rgba(${M},${v},${A},${(.6+u*.4).toFixed(2)})`,s.fill()}s.restore(),s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let b=0;b<y;b++){const i=p[b];if(i.radius>2){const u=.6+.4*Math.sin(i.pulsePhase),C=i.radius*(.8+u*.4)*.35;s.moveTo(i.x+C,i.y),s.arc(i.x,i.y,C,0,Math.PI*2)}}s.fill(),s.fillStyle=`rgba(${Q},${tt},${et},0.08)`;for(let b=0;b<6;b++)s.fillRect(Math.random()*r,Math.random()*l,1,1)}d()}function de(){mt!==null&&(cancelAnimationFrame(mt),mt=null),nt=null,gt=null,ht=[]}function Ht(){ut=requestAnimationFrame(Ht),kt+=.035;const e=document.getElementById("nf-engine-waves");if(!e){ut=null;return}const t=560,c=140,a=t/2;e.querySelectorAll("path").forEach(d=>{const s=parseInt(d.getAttribute("data-wave-idx")||"0",10),r=10+s*5,l=1.2+s*.35,p=s*.6,y=.7+s*.12;let S=`M 0 ${c/2}`;for(let L=0;L<=t;L+=3){const b=Math.abs(L-a)/a,i=Math.pow(Math.min(1,b*1.6),.6),u=c/2+r*i*Math.sin(L/t*l*Math.PI*2+kt*y+p);S+=` L ${L} ${Math.round(u*10)/10}`}d.setAttribute("d",S)})}function pe(){kt=0,Ht(),ce(),vt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),c=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),c&&(c.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function qt(){ut!==null&&(cancelAnimationFrame(ut),ut=null),vt&&(clearInterval(vt),vt=null),de()}function It(){let e=0;const t=X.filter(r=>r.status!=="skipped").length;for(const r of X){const l=document.getElementById(`nf-proc-${r.stepId}`);if(!l)continue;l.className="nf-proc-row";const p=l.querySelector(".nf-proc-badge");switch(r.status){case"done":l.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),e++;break;case"active":l.classList.add("nf-proc-active"),p&&(p.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const c=document.getElementById("nf-step-counter");c&&(c.textContent=`${e}/${X.length}`);const a=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");e>=t&&t>0?(a&&(a.textContent="COMPLETE",a.style.color=W.doneHex),o&&(o.style.background=W.doneHex,o.style.boxShadow=`0 0 8px rgba(${W.doneRgb},0.7)`)):X.some(l=>l.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(l=>l.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=W.hex,a.style.textShadow=`0 0 10px rgba(${W.rgb},0.5)`);const d=document.getElementById("nf-terminal"),s=d==null?void 0:d.querySelector(".nf-proc-active");s&&d&&s.scrollIntoView({behavior:"smooth",block:"center"})}function Vt(){Y&&Y.isConnected||(Lt(),Y=document.createElement("button"),Y.id="nf-toggle-btn",Y.className="nf-toggle-visible",Y.innerHTML=st?"⚡":"✕",Y.title="ซ่อน/แสดง Netflow Overlay",Y.onclick=()=>Ut(),document.body.appendChild(Y))}function Ut(){if(V)if(Vt(),st){V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),Y&&(Y.innerHTML="✕"),st=!1;try{localStorage.removeItem("nf_overlay_hidden")}catch{}}else{V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),Y&&(Y.innerHTML="⚡"),st=!0;try{localStorage.setItem("nf_overlay_hidden","1")}catch{}}}const Wt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Yt(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=ft;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const c=Wt[t]||Wt.red;let a;try{a=chrome.runtime.getURL(c)}catch{a=`/${c}`}const o=W.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${a}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${o},0.45)`,e.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function St(e=1){if(W=ee(),Rt(),V&&V.isConnected)return;if(V&&!V.isConnected&&(V=null),at&&(at.remove(),at=null),Lt(),$t=e,X=Ct(e),e>1){const c=lt.find(o=>o.id==="video");if(c){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let d=2;d<=e;d++)o.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),o.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),o.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});c.steps=o}const a=lt.find(o=>o.id==="render");if(a){const o=a.steps.find(s=>s.id==="download");o&&(o.label="ดาวน์โหลด 720p");const d=a.steps.find(s=>s.id==="upscale");d&&(d.label="Full Video")}}V=ie(),document.body.appendChild(V),!!localStorage.getItem("nf_overlay_hidden")?(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),st=!0):st=!1,Vt(),re(),pe(),requestAnimationFrame(()=>Yt())}function fe(){Nt(),qt(),st=!1;try{localStorage.removeItem("nf_overlay_hidden")}catch{}V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),Y&&(Y.remove(),Y=null)}const ue={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function ge(e,t,c){const a=X.filter(r=>r.status==="done").length,o=X.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${a}/${o}`);const s=document.getElementById("nf-stat-scenes");if(s&&(s.textContent=$t>1?`1/${$t}`:"1/1"),t==="active"){const r=document.getElementById("nf-stat-status"),l=ue[e]||e.toUpperCase();r&&(r.textContent=l)}else if(t==="done"&&a>=o){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(t==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}if(c!==void 0&&c>0){const r=document.getElementById("nf-stat-progress");r&&(r.textContent=`${Math.min(100,c)}%`)}}function I(e,t,c){if(!V)return;for(const o of lt)for(const d of o.steps)d.id===e&&(d.status=t,c!==void 0&&(d.progress=c));for(const o of X)o.stepId===e&&(o.status=t,c!==void 0&&(o.progress=c));const a=document.getElementById(`nf-step-${e}`);if(a&&(a.className="nf-step",t==="active"?a.classList.add("nf-step-active"):t==="done"?a.classList.add("nf-step-done"):t==="error"&&a.classList.add("nf-step-error")),ge(e,t,c),c!==void 0){const o=document.getElementById(`nf-bar-${e}`);o&&(o.style.width=`${Math.min(100,c)}%`)}Pt(),It()}function dt(e){I(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function bt(e=4e3){Nt(),qt(),Pt(),It(),setTimeout(()=>fe(),e)}function Pt(){for(const e of lt){const t=e.steps.filter(l=>l.status!=="skipped").length,c=e.steps.filter(l=>l.status==="done").length,a=e.steps.some(l=>l.status==="active"),o=t>0?Math.round(c/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${o}%`);const s=document.getElementById(`nf-modbar-${e.id}`);s&&(s.style.width=`${o}%`);const r=document.getElementById(`nf-mod-${e.id}`);r&&(r.classList.remove("nf-active","nf-done"),o>=100?r.classList.add("nf-done"):a&&r.classList.add("nf-active"))}}function me(e){var a,o,d,s;$t=e;const t=new Map;for(const r of X)t.set(r.stepId,{status:r.status,progress:r.progress});X=Ct(e);for(const r of X){const l=t.get(r.stepId);l&&(r.status=l.status,l.progress!==void 0&&(r.progress=l.progress))}if(oe(),e>1){const r=lt.find(l=>l.id==="video");if(r){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=r.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=r.steps.find(p=>p.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=r.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=r.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});r.steps=l,Xt(r)}}const c=lt.find(r=>r.id==="render");if(c&&e>1){const r=c.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const l=c.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),Xt(c)}Pt(),It()}function Xt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),e.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let s="";o.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${s}
        `,t.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a)}function jt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{jt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},_=e=>{console.warn(`[Netflow AI] ${e}`);try{jt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},At=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Tt=/Win/i.test(navigator.userAgent),pt=At?"🍎 Mac":Tt?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${pt}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),a=Math.round(e.clientX),o=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${a},${o}) → <${c}> "${d}"`)},!0);const h=e=>new Promise(t=>setTimeout(t,e));function ct(){return!!window.__NETFLOW_STOP__}function Kt(){var c;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of t){if(a.closest("#netflow-engine-overlay"))continue;const o=(a.textContent||"").trim().toLowerCase();if(!(o.length>200||o.length<5)){for(const d of e)if(o.includes(d))return((c=a.textContent)==null?void 0:c.trim())||d}}return null}async function Z(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,a=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:c,clientY:a,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",o)),await h(80),e.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",o)),e.dispatchEvent(new MouseEvent("click",o)),await h(50),e.click()}function he(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,a=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:c,clientY:a};e.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",o)),e.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",o)),e.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",o))}function be(e){const t=[],c=document.querySelectorAll("i");for(const a of c){if((a.textContent||"").trim()!==e)continue;let d=a,s=null,r=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const y=p.width*p.height;y<r&&(s=d,r=y)}}s&&!t.includes(s)&&t.push(s)}return t.sort((a,o)=>{const d=a.getBoundingClientRect(),s=o.getBoundingClientRect();return d.left-s.left}),t}function _t(e=!1){const t=[],c=document.querySelectorAll("video");for(const s of c){let r=s.parentElement;for(let l=0;l<10&&r;l++){const p=r.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:r,left:p.left});break}r=r.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of a){const r=(s.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let l=s.parentElement;for(let p=0;p<10&&l;p++){const y=l.getBoundingClientRect();if(y.width>120&&y.height>80&&y.width<window.innerWidth*.7&&y.top>=-50&&y.left<window.innerWidth*.75){t.push({el:l,left:y.left});break}l=l.parentElement}}}const o=document.querySelectorAll("img");for(const s of o){const r=(s.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let l=s.parentElement;for(let p=0;p<10&&l;p++){const y=l.getBoundingClientRect();if(y.width>120&&y.height>80&&y.width<window.innerWidth*.7&&y.top>=-50&&y.left<window.innerWidth*.75){t.push({el:l,left:y.left});break}l=l.parentElement}}}const d=Array.from(new Set(t.map(s=>s.el))).map(s=>t.find(r=>r.el===s));if(d.sort((s,r)=>s.left-r.left),d.length>0){const s=d[0].el,r=s.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),s}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function we(){const e=be("image");if(e.length>0){const c=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const c of t){let a=c.parentElement;for(let o=0;o<10&&a;o++){const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function xe(e,t){var r;const[c,a]=e.split(","),o=((r=c.match(/:(.*?);/))==null?void 0:r[1])||"image/png",d=atob(a),s=new Uint8Array(d.length);for(let l=0;l<d.length;l++)s[l]=d.charCodeAt(l);return new File([s],t,{type:o})}function wt(e){var a;const t=[],c=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of c)if(((a=o.textContent)==null?void 0:a.trim())===e){const d=o.closest("button");d&&t.push(d)}return t}function ye(){const e=[...wt("add"),...wt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const o of a){const d=o.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const s=(o.textContent||"").trim();if(s==="+"||s==="add")return o}}return null}let t=null,c=0;for(const a of e){const o=a.getBoundingClientRect();o.y>c&&(c=o.y,t=a)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${c.toFixed(0)}`),t}function Jt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=wt(a);let d=null,s=0;for(const r of o){const l=r.getBoundingClientRect();l.y>s&&(s=l.y,d=r)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${s.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,c=0;for(const a of e){const o=a.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const d=Math.abs(o.width-o.height)<10&&o.width<60,s=o.y+o.x+(d?1e3:0);s>c&&(c=s,t=a)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const a of e){const o=(a.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return a}return null}function Zt(){const e=document.querySelectorAll("textarea");for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const t=document.querySelectorAll('[contenteditable="true"]');for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of c){const o=a.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return a}return e.length>0?e[e.length-1]:null}async function Bt(e,t){var c,a,o,d;e.focus(),await h(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(l),await h(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await h(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(s);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(r),await h(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await h(200);const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});e.dispatchEvent(r),await h(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((c=navigator.clipboard)!=null&&c.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=t,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await h(200),document.execCommand("paste"),await h(500);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(e).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(s){let r=e[s];for(let l=0;l<30&&r;l++){const p=r.memoizedProps,y=r.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const S=p.editor;S.selection,S.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(o=y==null?void 0:y.memoizedState)==null?void 0:o.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),y.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function ve(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const c of t)e.push({input:c,origType:"file"}),c.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function $e(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${pt})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${pt})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Ee(e,t,c){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...e.map(y=>y.input)];for(const y of a)!o.includes(y)&&y.offsetParent===null&&o.push(y);for(const y of o)y.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${pt})`),!1;let s;if(c&&c.size>0){const y=Array.from(d).filter(S=>!c.has(S));y.length>0?(s=y[y.length-1],n(`เล็งเป้า file input ใหม่ (${y.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const r=new DataTransfer;r.items.add(t);try{s.files=r.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(y){n(`กำหนด target.files ล้มเหลว: ${y.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:r.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(S){return _(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${S.message}`),!1}}const l=s._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const y=new DataTransfer;y.items.add(t);const S=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:y});s.dispatchEvent(S),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${pt}`),!0}function xt(){let e=0;const t=document.querySelectorAll("img");for(const a of t){if(a.closest("#netflow-engine-overlay"))continue;const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.src&&a.offsetParent!==null&&e++}const c=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of c){if(a.closest("#netflow-engine-overlay"))continue;const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.offsetParent!==null&&e++}return e}async function Qt(e,t){var y;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const c=xe(e,t);n(`ขนาดไฟล์: ${(c.size/1024).toFixed(1)} KB`);const a=xt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const o=async(S,L=8e3)=>{const b=Date.now();for(;Date.now()-b<L;){const i=xt();if(i>a)return n(`✅ [${S}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${i}`),!0;await h(500)}return n(`⚠️ [${S}] รูปย่อไม่เพิ่ม (ยังคง ${xt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=ye();if(!d)return _("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const r=$e();let l=ve();const p=new MutationObserver(S=>{for(const L of S)for(const b of L.addedNodes)if(b instanceof HTMLInputElement&&b.type==="file"&&(b.type="text",l.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),b instanceof HTMLElement){const i=b.querySelectorAll('input[type="file"]');for(const u of i)u.type="text",l.push({input:u,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await h(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let S=!1;const L=Date.now();for(;!S&&Date.now()-L<5e3;){const i=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const u of i){if(u===d)continue;const C=u.querySelectorAll("i");for(const M of C){const v=((y=M.textContent)==null?void 0:y.trim())||"";if((v==="upload"||v==="upload_file")&&!Array.from(u.querySelectorAll("i")).map(E=>{var $;return($=E.textContent)==null?void 0:$.trim()}).includes("drive_folder_upload")){u.click(),S=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${v}) ✅`);break}}if(S)break}if(!S)for(const u of i){if(u===d)continue;const C=u.childNodes.length<=5?(u.textContent||"").trim():"";if(C.length>0&&C.length<40){const M=C.toLowerCase();if(M==="upload"||M==="อัปโหลด"||M==="อัพโหลด"||M.includes("upload image")||M.includes("upload photo")||M.includes("อัปโหลดรูปภาพ")||M.includes("อัพโหลดรูปภาพ")||M.includes("from computer")||M.includes("จากคอมพิวเตอร์")){u.click(),S=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${C}") ✅`);break}}}S||await h(500)}return S?(await h(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Ee(l,c,s)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(_(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(_("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),r();for(const S of l)S.input.type!=="file"&&(S.input.type="file")}}async function ke(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const c=document.querySelectorAll("button");let a=null;for(const b of c){const i=b.textContent||"";if((i.includes("Nano Banana")||i.includes("Imagen")||i.includes("วิดีโอ")||i.includes("รูปภาพ")||i.includes("Image")||i.includes("Video"))&&b.getBoundingClientRect().bottom>window.innerHeight*.7){a=b,n(`พบปุ่มตั้งค่าจากข้อความ: "${i.substring(0,30).trim()}"`);break}}if(!a)for(const b of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const i=wt(b);for(const u of i)if(u.getBoundingClientRect().bottom>window.innerHeight*.7){a=u,n(`พบปุ่มตั้งค่าจากไอคอน: ${b}`);break}if(a)break}if(!a)return _("ไม่พบปุ่มตั้งค่า"),!1;const o=a.getBoundingClientRect(),d=o.left+o.width/2,s=o.top+o.height/2,r={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("คลิกปุ่มตั้งค่าแล้ว"),await h(1500);let l=!1,p=null;const y=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const b of y){const i=b.getAttribute("aria-controls")||"",u=b.id||"";if(i.toUpperCase().includes("IMAGE")||u.toUpperCase().includes("IMAGE")){p=b,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${i})`);break}}if(!p)for(const b of document.querySelectorAll('[role="tab"]')){const i=b.id||"";if(i.toUpperCase().includes("TRIGGER-IMAGE")){p=b,n(`พบแท็บ Image ผ่าน id: ${i}`);break}}if(!p)for(const b of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const i=(b.textContent||"").trim();if((i==="Image"||i.endsWith("Image")||i==="รูปภาพ"||i==="ภาพ")&&!i.includes("Video")&&!i.includes("วิดีโอ")){p=b,n(`พบแท็บ Image ผ่านข้อความ: "${i}"`);break}}if(p){const b=p.getAttribute("data-state")||"",i=p.getAttribute("aria-selected")||"";if(b==="active"||i==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const u=p.getBoundingClientRect(),C={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",C)),await h(80),p.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",C)),p.dispatchEvent(new MouseEvent("click",C)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await h(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const S=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const b of document.querySelectorAll("button, [role='tab'], [role='option']")){const i=(b.textContent||"").trim();if(i===S||i.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const u=b.getBoundingClientRect(),C={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",C)),await h(80),b.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",C)),b.dispatchEvent(new MouseEvent("click",C)),n(`เลือกทิศทาง: ${S}`),await h(400);break}}const L=`x${t}`;for(const b of document.querySelectorAll("button, [role='tab'], [role='option']"))if((b.textContent||"").trim()===L){const u=b.getBoundingClientRect(),C={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",C)),await h(80),b.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",C)),b.dispatchEvent(new MouseEvent("click",C)),n(`เลือกจำนวน: ${L}`),await h(400);break}return await h(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("ปิดหน้าตั้งค่าแล้ว"),await h(600),!0}async function Ce(e){var v,A,E,$;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,c=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=c?c[1]:"unknown",o=At?"macOS":Tt?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=At?((A=(v=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:v[1])==null?void 0:A.replace(/_/g,"."))||"":Tt&&((E=t.match(/Windows NT ([0-9.]+)/))==null?void 0:E[1])||"",s=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${r} | แพลตฟอร์ม: ${pt}`),n("══════════════════════════════════════════");try{Et(e.theme)}catch{}try{St()}catch(w){console.warn("Overlay show error:",w)}const l=[],p=[];try{I("settings","active");const w=e.orientation||"horizontal",T=e.outputCount||1,m=await ke(w,T);l.push(m?"✅ Settings":"⚠️ Settings"),I("settings",m?"done":"error")}catch(w){_(`ตั้งค่าผิดพลาด: ${w.message}`),l.push("⚠️ Settings"),I("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const y=()=>{const w=document.querySelectorAll("span, div, p, label");for(const T of w){const m=(T.textContent||"").trim();if(/^\d{1,3}%$/.test(m)){if(m==="100%")return null;const x=T.getBoundingClientRect();if(x.width>0&&x.height>0&&x.top>0&&x.top<window.innerHeight)return m}}return null},S=async w=>{n(`รอการอัพโหลด ${w} เสร็จ...`),await h(2e3);const T=Date.now(),m=6e4;let x="",F=Date.now();const f=15e3;for(;Date.now()-T<m;){const g=y();if(g){if(g!==x)x=g,F=Date.now();else if(Date.now()-F>f){n(`✅ อัพโหลด ${w} — % ค้างที่ ${g} นาน ${f/1e3} วินาที ถือว่าเสร็จ`),await h(1e3);return}n(`กำลังอัพโหลด: ${g} — รอ...`),await h(1500)}else{n(`✅ อัพโหลด ${w} เสร็จ — ไม่พบตัวบอก %`),await h(1e3);return}}_(`⚠️ อัพโหลด ${w} หมดเวลาหลัง ${m/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){I("upload-char","active");try{const w=await Qt(e.characterImage,"character.png");l.push(w?"✅ ตัวละคร":"⚠️ ตัวละคร"),w||p.push("character upload failed"),I("upload-char",w?"done":"error")}catch(w){_(`อัพโหลดตัวละครผิดพลาด: ${w.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),I("upload-char","error")}await S("character")}else dt("upload-char");if(e.productImage){I("upload-prod","active");try{const w=await Qt(e.productImage,"product.png");l.push(w?"✅ สินค้า":"⚠️ สินค้า"),w||p.push("product upload failed"),I("upload-prod",w?"done":"error")}catch(w){_(`อัพโหลดสินค้าผิดพลาด: ${w.message}`),l.push("❌ สินค้า"),p.push("product upload error"),I("upload-prod","error")}await S("product")}else dt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800);const L=y();L&&(n(`⚠️ อัพโหลดยังแสดง ${L} — รอเพิ่มเติม...`),await S("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await h(1e3);const b=(e.characterImage?1:0)+(e.productImage?1:0);if(b>0){let w=xt();w<b&&(n(`⏳ เห็นรูปย่อแค่ ${w}/${b} — รอ 3 วินาที...`),await h(3e3),w=xt()),w>=b?n(`✅ ยืนยันรูปย่ออ้างอิง: ${w}/${b}`):_(`⚠️ คาดว่าจะมี ${b} รูปย่อ แต่พบ ${w} — ดำเนินการต่อ`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{bt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),I("img-prompt","active"),await h(1e3);const i=Zt();i?(await Bt(i,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),I("img-prompt","done")):(_("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),I("img-prompt","error")),await h(800);const u=new Set;document.querySelectorAll("img").forEach(w=>{w.src&&u.add(w.src)}),n(`บันทึกรูปเดิม: ${u.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),I("img-generate","active"),await h(500);const C=Jt();if(C){const w=C.getBoundingClientRect(),T=w.left+w.width/2,m=w.top+w.height/2,x={bubbles:!0,cancelable:!0,clientX:T,clientY:m,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",x)),await h(80),C.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",x)),C.dispatchEvent(new MouseEvent("click",x)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await h(500),C.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",x)),await h(80),C.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",x)),C.dispatchEvent(new MouseEvent("click",x)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),I("img-generate","done")}else _("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),I("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),I("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await h(15e3);const w=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const g of f){if(g.closest("#netflow-engine-overlay"))continue;const k=(g.textContent||"").trim();if(k.length>10)continue;const B=k.match(/(\d{1,3})\s*%/);if(!B)continue;const P=parseInt(B[1],10);if(P<1||P>100)continue;const R=g.getBoundingClientRect();if(!(R.width===0||R.width>150)&&!(R.top<0||R.top>window.innerHeight))return P}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let T=null,m=-1,x=0;const F=Date.now();for(;!T&&Date.now()-F<18e4;){const f=document.querySelectorAll("img");for(const g of f){if(u.has(g.src)||!(g.alt||"").toLowerCase().includes("generated"))continue;const B=g.getBoundingClientRect();if(B.width>120&&B.height>120&&B.top>0&&B.top<window.innerHeight*.85){const P=g.closest("div");if(P){T=P,n(`พบรูป AI จาก alt="${g.alt}": ${g.src.substring(0,80)}...`);break}}}if(!T)for(const g of f){if(u.has(g.src))continue;const k=g.closest("div"),B=(k==null?void 0:k.textContent)||"";if(B.includes("product.png")||B.includes("character.png")||B.includes(".png")||B.includes(".jpg"))continue;const P=g.getBoundingClientRect();if(P.width>120&&P.height>120&&P.top>0&&P.top<window.innerHeight*.85){const R=g.closest("div");if(R){T=R,n(`พบรูปใหม่ (สำรอง): ${g.src.substring(0,80)}...`);break}}}if(!T){if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const g=Kt();if(g){_(`❌ สร้างรูปล้มเหลว: ${g}`),p.push(`image gen failed: ${g}`),I("img-wait","error");break}const k=w();k!==null?(k!==m&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${k}%`),m=k,I("img-wait","active",k)),x=Date.now()):m>30&&Math.floor((Date.now()-x)/1e3)>=3&&n(`🖼️ % หายที่ ${m}% — รูปน่าจะเสร็จแล้ว`),await h(3e3)}}if(!T)_("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),I("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),I("img-wait","done",100);const f=T.getBoundingClientRect(),g=f.left+f.width/2,k=f.top+f.height/2,B={bubbles:!0,cancelable:!0,clientX:g,clientY:k};T.dispatchEvent(new PointerEvent("pointerenter",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseenter",B)),T.dispatchEvent(new PointerEvent("pointerover",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseover",B)),T.dispatchEvent(new PointerEvent("pointermove",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousemove",B)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await h(1500);let P=null;for(const R of["more_vert","more_horiz","more"]){const q=wt(R);for(const G of q){const z=G.getBoundingClientRect();if(z.top>=f.top-20&&z.top<=f.bottom&&z.right>=f.right-150&&z.right<=f.right+20){P=G;break}}if(P)break}if(!P){const R=document.querySelectorAll("button");for(const q of R){const G=q.getBoundingClientRect();if(G.width<50&&G.height<50&&G.top>=f.top-10&&G.top<=f.top+60&&G.left>=f.right-80){const z=q.querySelectorAll("i");for(const K of z)if(((($=K.textContent)==null?void 0:$.trim())||"").includes("more")){P=q;break}if(P)break;const H=q.getAttribute("aria-label")||"";if(H.includes("เพิ่มเติม")||H.includes("more")){P=q;break}}}}if(!P)_("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const R=P.getBoundingClientRect(),q=R.left+R.width/2,G=R.top+R.height/2,z={bubbles:!0,cancelable:!0,clientX:q,clientY:G,button:0};P.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousedown",z)),await h(80),P.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseup",z)),P.dispatchEvent(new MouseEvent("click",z)),n("คลิกปุ่ม 3 จุดแล้ว"),await h(1500);let H=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of K){const J=(U.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){H=U;break}}if(!H)_("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const U=H.getBoundingClientRect(),J=U.left+U.width/2,O=U.top+U.height/2,D={bubbles:!0,cancelable:!0,clientX:J,clientY:O,button:0};H.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousedown",D)),await h(80),H.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mouseup",D)),H.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),I("animate","done"),await h(3e3)}}}}catch(w){_(`ขั้น 4 ผิดพลาด: ${w.message}`),l.push("⚠️ Animate")}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{bt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),I("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await h(3e3);let w=!1;const T=document.querySelectorAll("button, span, div");for(const F of T){const f=(F.textContent||"").trim(),g=F.getBoundingClientRect();if((f==="วิดีโอ"||f==="Video"||f.includes("วิดีโอ"))&&g.bottom>window.innerHeight*.7){w=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}w||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await h(1e3);const m=Zt();m?(await Bt(m,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),I("vid-prompt","done")):(_("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),p.push("video prompt input not found"),I("vid-prompt","error")),await h(1e3),I("vid-generate","active");const x=Jt();if(x){const F=x.getBoundingClientRect(),f=F.left+F.width/2,g=F.top+F.height/2,k={bubbles:!0,cancelable:!0,clientX:f,clientY:g,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",k)),await h(80),x.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",k)),x.dispatchEvent(new MouseEvent("click",k)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),I("vid-generate","done"),await h(500),x.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",k)),await h(80),x.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",k)),x.dispatchEvent(new MouseEvent("click",k)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else _("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),I("vid-generate","error")}catch(w){_(`ขั้น 5 ผิดพลาด: ${w.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${w.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),dt("animate"),dt("vid-prompt"),dt("vid-generate"),dt("vid-wait");if(e.videoPrompt){I("vid-wait","active");const w=e.sceneCount||1,T=e.videoScenePrompts||[e.videoPrompt];if(w>1)try{me(w)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${w>1?`ต่อ ${w} ฉาก`:"ดาวน์โหลด"} ===`);const m=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const g of f){if(g.closest("#netflow-engine-overlay"))continue;const k=(g.textContent||"").trim();if(k.length>10)continue;const B=k.match(/(\d{1,3})\s*%/);if(!B)continue;const P=parseInt(B[1],10);if(P<1||P>100)continue;const R=g.getBoundingClientRect();if(!(R.width===0||R.width>150)&&!(R.top<0||R.top>window.innerHeight))return P}return null},x=async(f=6e5)=>{n("รอการสร้างวิดีโอ..."),I("vid-wait","active"),await h(5e3);const g=()=>{const D=document.querySelectorAll("div, span, p, label, strong, small");let N=0;for(const j of D){if(j.closest("#netflow-engine-overlay"))continue;const ot=(j.textContent||"").trim();if(ot.includes("%")&&ot.length<15){const rt=j.tagName.toLowerCase(),te=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Ft=j.getBoundingClientRect();if(n(`  🔍 "${ot}" ใน <${rt}.${te}> ที่ (${Ft.left.toFixed(0)},${Ft.top.toFixed(0)}) w=${Ft.width.toFixed(0)}`),N++,N>=5)break}}N===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},k=_t();n(k?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),g();const B=Date.now();let P=-1,R=0,q=!1;for(;Date.now()-B<f;){const D=m();if(D!==null){if(D!==P&&(n(`ความคืบหน้าวิดีโอ: ${D}%`),P=D,I("vid-wait","active",D)),R=Date.now(),D>=100){n("✅ ตรวจพบ 100%!"),q=!0;break}}else if(P>30){const N=Math.floor((Date.now()-R)/1e3);if(N>=5){n(`✅ % หายไปที่ ${P}% (หาย ${N} วินาที) — วิดีโอเสร็จ!`),q=!0;break}n(`⏳ % หายที่ ${P}% — ยืนยันใน ${5-N} วินาที...`)}else{const N=Math.floor((Date.now()-B)/1e3);N%15<3&&n(`⏳ รอ... (${N} วินาที) ไม่พบ %`)}if(!q&&P>0&&_t(!0)&&!k){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${P}% — วิดีโอเสร็จ!`),q=!0;break}if(ct())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(P<1){const N=Kt();if(N)return _(`❌ สร้างวิดีโอล้มเหลว: ${N}`),null}await h(3e3)}const G=_t();if(!G)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),I("vid-wait","error"),null;const z=G;q?(I("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await h(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const H=z.getBoundingClientRect();let K=H.left+H.width/2,U=H.top+H.height/2,J=z;const O=z.querySelector("video, img, canvas");if(O){const D=O.getBoundingClientRect();D.width>50&&D.height>50&&(K=D.left+D.width/2,U=D.top+D.height/2,J=O,n(`🎯 พบรูปย่อ <${O.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${U.toFixed(0)}) ${D.width.toFixed(0)}x${D.height.toFixed(0)}`))}else U=H.top+H.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${U.toFixed(0)})...`),he(J);for(let D=0;D<8;D++){const N={bubbles:!0,cancelable:!0,clientX:K+D%2,clientY:U};J.dispatchEvent(new PointerEvent("pointermove",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",N)),await h(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:w,scenePrompts:T,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${w} ฉาก, ${T.length} prompts, theme: ${e.theme})`)}catch(D){n(`⚠️ ไม่สามารถบันทึก pending action: ${D.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),z},F=async f=>{const g=f.getBoundingClientRect(),k=g.left+g.width/2,B=g.top+g.height/2,P={bubbles:!0,cancelable:!0,clientX:k,clientY:B,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",P)),await h(80),f.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",P)),f.dispatchEvent(new MouseEvent("click",P)),n("คลิกการ์ดวิดีโอแล้ว"),await h(2e3)};try{await x()?(l.push("✅ Video Complete"),I("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action")):(_("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),I("vid-wait","error"))}catch(f){_(`ขั้น 6 ผิดพลาด: ${f.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${f.message}`)}}const M=p.length===0;try{bt(M?5e3:8e3)}catch(w){console.warn("Overlay complete error:",w)}return{success:M,message:M?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:M?"done":"partial"}}async function Me(e,t=[],c){var M;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{c&&Et(c)}catch{}try{St(e)}catch(v){n(`⚠️ showOverlay error: ${v.message}`)}try{const v=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const A of v)I(A,"done");e>=2&&I("scene2-prompt","active"),n(`✅ overlay restored: ${v.length} steps done, sceneCount=${e}`)}catch(v){n(`⚠️ overlay restore error: ${v.message}`)}await h(1500);const a=(()=>{for(const v of document.querySelectorAll("button")){const A=v.querySelectorAll("i");for(const $ of A){const w=($.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const T=v.getBoundingClientRect();if(T.width>0&&T.height>0)return v}}const E=(v.getAttribute("aria-label")||"").toLowerCase();if(E.includes("mute")||E.includes("ปิดเสียง")){const $=v.getBoundingClientRect();if($.width>0&&$.height>0)return v}}return null})();if(a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await h(2e3);for(let f=2;f<=e;f++){const g=t[f-1];if(!g){_(`ไม่พบ prompt สำหรับฉากที่ ${f}`);continue}n(`── ฉากที่ ${f}/${e}: วาง prompt + generate ──`);let k=null;const B=Date.now();for(;!k&&Date.now()-B<1e4;){const O=document.querySelectorAll("[data-slate-editor='true']");if(O.length>0&&(k=O[O.length-1]),!k){const D=document.querySelectorAll("[role='textbox'][contenteditable='true']");D.length>0&&(k=D[D.length-1])}k||await h(1e3)}if(!k){_("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${k.tagName.toLowerCase()}> ${k.className.substring(0,40)}`),await Bt(k,g),n(`วาง prompt ฉาก ${f} (${g.length} ตัวอักษร) ✅`);try{I(`scene${f}-prompt`,"done"),I(`scene${f}-gen`,"active")}catch{}await h(1e3);const P=k.getBoundingClientRect();let R=null,q=1/0;for(const O of document.querySelectorAll("button")){if(O.disabled)continue;const D=O.querySelectorAll("i");let N=!1;for(const rt of D)if((rt.textContent||"").trim()==="arrow_forward"){N=!0;break}if(!N)continue;const j=O.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const ot=Math.abs(j.top-P.top)+Math.abs(j.right-P.right);ot<q&&(q=ot,R=O)}if(!R)for(const O of document.querySelectorAll("button")){const D=O.querySelectorAll("i");for(const N of D)if((N.textContent||"").trim()==="arrow_forward"){const j=O.getBoundingClientRect();if(j.width>0&&j.height>0){R=O;break}}if(R)break}if(!R){_("ไม่พบปุ่ม Generate/Send");return}await new Promise(O=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:c,sceneCount:e,currentScene:f}},()=>O())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${f}/${e})`),await Z(R),n(`คลิก Generate ฉาก ${f} ✅`);try{I(`scene${f}-gen`,"done"),I(`scene${f}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${f} gen เสร็จ ──`),await h(5e3);let G=0,z=0;const H=Date.now(),K=6e5,U=5e3;let J=!1;for(;Date.now()-H<K;){let O=null;const D=document.querySelectorAll("div, span, p, label, strong, small");for(const N of D){if(N.closest("#netflow-engine-overlay"))continue;const ot=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(ot){const rt=N.getBoundingClientRect();if(rt.width>0&&rt.height>0&&rt.width<120&&rt.height<60){O=parseInt(ot[1],10);break}}}if(O!==null)O!==G&&(n(`🎬 ฉาก ${f} ความคืบหน้า: ${O}%`),G=O),z=0;else if(G>0){if(z===0)z=Date.now(),n(`🔍 ฉาก ${f}: % หายไป (จาก ${G}%) — กำลังยืนยัน...`);else if(Date.now()-z>=U){n(`✅ ฉาก ${f}: % หายไป ${U/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุด");return}await h(2e3)}J||_(`ฉาก ${f} หมดเวลา`),n(`✅ ฉาก ${f} เสร็จแล้ว`);try{I(`scene${f}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await h(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{I("download","active")}catch{}await h(2e3);const v=Date.now();let A=null;const E=Date.now();for(;!A&&Date.now()-E<1e4;){for(const f of document.querySelectorAll("button")){const g=f.querySelector("i");if(g&&(g.textContent||"").trim()==="download"){const k=f.getBoundingClientRect();if(k.width>0&&k.height>0){A=f;break}}}A||await h(1e3)}if(!A){_("ไม่พบปุ่มดาวน์โหลด");return}await Z(A),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await h(1500);let $=null;for(let f=0;f<3&&!$;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let g=null;const k=Date.now();for(;!g&&Date.now()-k<5e3;){for(const G of document.querySelectorAll("[role='menuitem']"))if((G.textContent||"").trim().includes("Full Video")&&G.querySelector("i")){const H=G.getBoundingClientRect();if(H.width>0&&H.height>0){g=G;break}}g||await h(500)}if(!g){_("ไม่พบ Full Video");continue}const B=g.getBoundingClientRect(),P=B.left+B.width/2,R=B.top+B.height/2;g.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:P,clientY:R})),g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:P,clientY:R})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:P,clientY:R})),await Z(g),n("คลิก/hover Full Video ✅"),await h(2e3);const q=Date.now();for(;!$&&Date.now()-q<8e3;){for(const G of document.querySelectorAll("button[role='menuitem']")){const z=G.querySelectorAll("span");for(const H of z)if((H.textContent||"").trim()==="720p"){const K=G.getBoundingClientRect();if(K.width>0&&K.height>0){$=G;break}}if($)break}$||(g.isConnected&&(g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:P,clientY:R})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:P+20,clientY:R}))),await h(500))}}if(!$){_("ไม่พบ 720p");return}await Z($),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const w=Date.now();let T=!1,m=!1;for(;Date.now()-w<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const g=(f.textContent||"").trim();if(g==="Download complete!"||g==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),T=!0;break}(g.includes("Downloading your extended video")||g.includes("กำลังดาวน์โหลด"))&&(m||(m=!0,n("⏳ กำลังดาวน์โหลด...")))}if(T)break;if(m){let f=!1;for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((g.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),T=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await h(2e3)}if(!T){_("ดาวน์โหลดหมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let x=!1;const F=Date.now();for(;Date.now()-F<6e4&&!x;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:v},g=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):g!=null&&g.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${g.message}`),x=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${g==null?void 0:g.message}`),f()})})}catch(f){_(`ตรวจสอบผิดพลาด: ${f.message}`)}x||await h(3e3)}x||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{I("open","done"),bt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await h(2e3);const o=(v,A="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const E of document.querySelectorAll(A)){const $=(E.textContent||"").trim();if($.includes(v)&&$.length<100){const w=E.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return E}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const s=Date.now();for(;!d&&Date.now()-s<1e4;){for(const v of document.querySelectorAll("button, [role='button']")){const A=(v.textContent||"").trim(),E=A.toLowerCase();if((E.includes("download")||E.includes("ดาวน์โหลด"))&&A.length<80){const $=v.getBoundingClientRect();if($.width>0&&$.height>0){d=v;break}}}if(!d)for(const v of document.querySelectorAll("button")){const A=(v.getAttribute("aria-label")||"").toLowerCase();if(A.includes("download")||A.includes("ดาวน์")){const E=v.getBoundingClientRect();if(E.width>0&&E.height>0){d=v;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await h(1e3))}if(!d){_("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await Z(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await h(1500);const r=Date.now();let l=null;const p=Date.now();for(;!l&&Date.now()-p<5e3;)l=o("1080p"),l||(n("รอ 1080p..."),await h(500));if(!l){_("ไม่พบ 1080p");return}await Z(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const y=Date.now();let S=!1,L=!1,b=0;const i=3e3;for(;Date.now()-y<3e5;){const A=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(A.includes("upscaling complete")||A.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const $ of document.querySelectorAll("div, span, p")){const w=($.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(M=$.textContent)==null?void 0:M.trim()}")`),S=!0;break}}if(S)break;if(A.includes("upscaling your video")||A.includes("กำลังอัปสเกล")){L=!0,b=0;const $=Math.floor((Date.now()-y)/1e3);n(`⏳ กำลังอัปสเกล... (${$} วินาที)`)}else if(L){if(b===0)b=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-b>=i){n(`✅ ข้อความ Upscaling หายไป ${i/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const $=Math.floor((Date.now()-y)/1e3);$%10<3&&n(`⏳ รอ Upscale... (${$} วินาที)`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await h(2e3)}if(!S){_("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let u=!1;const C=Date.now();for(;Date.now()-C<6e4&&!u;){try{await new Promise(v=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},A=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):A!=null&&A.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${A.message}`),u=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${A==null?void 0:A.message}`),v()})})}catch(v){_(`ตรวจสอบผิดพลาด: ${v.message}`)}u||await h(3e3)}u||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function Ie(e=2,t=2,c){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{c&&Et(c)}catch{}try{St(e)}catch(E){n(`⚠️ showOverlay error: ${E.message}`)}try{const E=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let $=2;$<=t;$++)E.push(`scene${$}-prompt`,`scene${$}-gen`),$<t&&E.push(`scene${$}-wait`);for(const $ of E)I($,"done");I(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${E.length} steps done (scene ${t}/${e} navigate)`)}catch(E){n(`⚠️ overlay restore error: ${E.message}`)}await h(2e3);const a=(()=>{for(const E of document.querySelectorAll("button")){const $=E.querySelectorAll("i");for(const w of $){const T=(w.textContent||"").trim();if(T==="volume_up"||T==="volume_off"||T==="volume_mute"){const m=E.getBoundingClientRect();if(m.width>0&&m.height>0)return E}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let o=0,d=0;const s=Date.now(),r=6e5,l=5e3;let p=!1,y=0;for(;Date.now()-s<r;){let E=null;const $=document.querySelectorAll("div, span, p, label, strong, small");for(const w of $){if(w.closest("#netflow-engine-overlay"))continue;const m=(w.textContent||"").trim().match(/^(\d{1,3})%$/);if(m){const x=w.getBoundingClientRect();if(x.width>0&&x.height>0&&x.width<120&&x.height<60){E=parseInt(m[1],10);break}}}if(E!==null)y=0,E!==o&&(n(`🎬 scene ${t} ความคืบหน้า: ${E}%`),o=E),d=0;else if(o>0){if(d===0)d=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${o}%) — กำลังยืนยัน...`);else if(Date.now()-d>=l){n(`✅ scene ${t}: % หายไป ${l/1e3} วินาที — เจนเสร็จ!`),p=!0;break}}else if(y++,y>=15){const w=document.querySelectorAll("video");let T=!1;for(const m of w)if(m.readyState>=2&&!m.paused&&m.getBoundingClientRect().width>200){T=!0;break}if(T){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),p=!0;break}if(y>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),p=!0;break}}await h(2e3)}p||n(`⚠️ scene ${t} หมดเวลา — ลองดาวน์โหลดต่อ`);try{I(`scene${t}-wait`,"done",100)}catch{}n(`✅ scene ${t} เสร็จ — เริ่มดาวน์โหลด`),await h(3e3);try{I("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const S=Date.now();let L=null;const b=Date.now();for(;!L&&Date.now()-b<1e4;){for(const E of document.querySelectorAll("button")){const $=E.querySelector("i");if($&&($.textContent||"").trim()==="download"){const w=E.getBoundingClientRect();if(w.width>0&&w.height>0){L=E;break}}}L||await h(1e3)}if(!L){_("ไม่พบปุ่มดาวน์โหลด");return}await Z(L),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await h(1500);let i=null;for(let E=0;E<3&&!i;E++){E>0&&n(`🔄 ลองหา 720p ครั้งที่ ${E+1}...`);let $=null;const w=Date.now();for(;!$&&Date.now()-w<5e3;){for(const f of document.querySelectorAll("[role='menuitem']"))if((f.textContent||"").trim().includes("Full Video")&&f.querySelector("i")){const k=f.getBoundingClientRect();if(k.width>0&&k.height>0){$=f;break}}$||await h(500)}if(!$){_("ไม่พบ Full Video");continue}const T=$.getBoundingClientRect(),m=T.left+T.width/2,x=T.top+T.height/2;$.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:m,clientY:x})),$.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:m,clientY:x})),$.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:m,clientY:x})),await Z($),n("คลิก/hover Full Video ✅"),await h(2e3);const F=Date.now();for(;!i&&Date.now()-F<8e3;){for(const f of document.querySelectorAll("button[role='menuitem']")){const g=f.querySelectorAll("span");for(const k of g)if((k.textContent||"").trim()==="720p"){const B=f.getBoundingClientRect();if(B.width>0&&B.height>0){i=f;break}}if(i)break}i||($.isConnected&&($.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:m,clientY:x})),$.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:m+20,clientY:x}))),await h(500))}}if(!i){_("ไม่พบ 720p");return}await Z(i),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const u=Date.now();let C=!1,M=!1;for(;Date.now()-u<3e5;){for(const E of document.querySelectorAll("div[data-title] div, div[data-content] div")){const $=(E.textContent||"").trim();if($==="Download complete!"||$==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),C=!0;break}($.includes("Downloading your extended video")||$.includes("กำลังดาวน์โหลด"))&&(M||(M=!0,n("⏳ กำลังดาวน์โหลด...")))}if(C)break;if(M){let E=!1;for(const $ of document.querySelectorAll("div[data-title] div, div[data-content] div"))if(($.textContent||"").trim().includes("Downloading")){E=!0;break}if(!E){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),C=!0;break}}await h(2e3)}if(!C){_("ดาวน์โหลดหมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let v=!1;const A=Date.now();for(;Date.now()-A<6e4&&!v;){try{await new Promise(E=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:S},$=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):$!=null&&$.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${$.message}`),v=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${$==null?void 0:$.message}`),E()})})}catch(E){_(`ตรวจสอบผิดพลาด: ${E.message}`)}v||await h(3e3)}v||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{I("open","done"),bt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Se(){try{const e=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const c=Date.now()-e.timestamp;if(c>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:e},()=>d())}),await h(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const r=s==null?void 0:s.netflow_pending_action;d((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(c/1e3)} วินาที)`),e.action==="mute_video"?await Me(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ie(e.sceneCount||2,e.currentScene||2,e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,c)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),c({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Ce(e).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>console.error("[Netflow AI] Generate error:",a)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,c({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return c({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return c({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await h(500);const a=we();if(!a){_("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=a.getBoundingClientRect(),d=o.left+o.width/2,s=o.top+o.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const l=document.elementFromPoint(d,s);l?(await Z(l),n(`คลิก ${r+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await Z(a),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await h(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Se(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),a=Math.round(e.clientX),o=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${a},${o}) → <${c}> "${d}"`)},!0)})();
