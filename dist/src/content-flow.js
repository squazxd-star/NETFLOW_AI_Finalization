(function(){"use strict";const le={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let K=le.green,be=null;function it(t){t&&le[t]&&(be=t,K=le[t],Ve(),requestAnimationFrame(()=>Ze()))}function rt(){if(be&&le[be])return le[be];try{const t=localStorage.getItem("netflow_app_theme");if(t&&le[t])return le[t]}catch{}return le.green}let ie=0,re=255,ae=65;function Ve(){const t=K.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ie=parseInt(t[1],16),re=parseInt(t[2],16),ae=parseInt(t[3],16))}let J=null,Y=null,de=null,qe=0,Ce=null,we=null,Ie=null,Te=0,ge=!1,se=null,xe=null,ve=null,Pe=1,X=[];const ye=[],at=4;function Fe(t){const e=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`Scene ${r} Prompt`,status:"waiting"},{stepId:`scene${r}-gen`,label:`Scene ${r} Generate`,status:"waiting"},{stepId:`scene${r}-wait`,label:`Scene ${r} รอ %`,status:"waiting",progress:0});e.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return e}const $e=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];X=Fe(1);function st(t){const e=t.rgb,r=t.accentRgb,o=t.doneRgb,i=t.hex,d=t.accentHex,l=t.doneHex,c=(()=>{const u=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!u)return"#4ade80";const x=A=>Math.min(255,A+80);return`#${[1,2,3].map(A=>x(parseInt(u[A],16)).toString(16).padStart(2,"0")).join("")}`})(),a=(()=>{const u=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!u)return"#4ade80";const x=A=>Math.min(255,A+60);return`#${[1,2,3].map(A=>x(parseInt(u[A],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),y=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,P=p?parseInt(p[1],16)/y:0,N=p?parseInt(p[2],16)/y:1,b=p?parseInt(p[3],16)/y:.25,s=u=>`${Math.round(P*u)}, ${Math.round(N*u)}, ${Math.round(b*u)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.05) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${r},0.04) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(${s(18)},0.94) 0%, rgba(${s(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${r},0.03) 0%, transparent 40%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${r},0.06); box-shadow: 0 0 25px rgba(${r},0.03); }
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
        rgba(${r},0.018) 70px,
        rgba(${r},0.018) 71px
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
        rgba(${r},0.015) 113px,
        rgba(${r},0.015) 114px
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
    background: radial-gradient(circle, rgba(${r},0.055) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${r},0.04) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.06) 0%, rgba(${r},0.02) 40%, transparent 70%);
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
    width: 740px;
    min-height: 365px;
    max-height: 85vh;
    background: rgba(${s(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${s(180)},0.05),
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
            0 0 200px rgba(${s(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${s(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${r},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${r},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${r},0.4)); }
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
    color: ${c};
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
    min-height: 72px;
    max-height: 360px;
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
.nf-term-line.nf-term-done { color: rgba(${o}, 0.85); }
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
    color: ${c};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${o}, 0.12);
    color: ${a};
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
    background: linear-gradient(180deg, rgba(${s(5)},0.95) 0%, rgba(${s(12)},0.98) 100%);
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
    border-color: rgba(${r},0.6);
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
    left: 50%;
    top: 44%;
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
    left: 50%;
    top: 44%;
    transform: translate(-50%, -50%);
    width: 110px;
    height: 110px;
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${r},0.08) 40%, transparent 70%);
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
    padding-left: 38px;
    z-index: 3;
    pointer-events: none;
}

.nf-brand-inner-text {
    font-family: 'Orbitron', 'JetBrains Mono', monospace;
    font-size: 28px;
    font-weight: 900;
    letter-spacing: 12px;
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

.nf-brand-gear-icon {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    filter:
        drop-shadow(0 0 4px rgba(${e},1))
        drop-shadow(0 0 12px rgba(${e},0.7))
        drop-shadow(0 0 28px rgba(${e},0.35));
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
    border-top: 1px solid rgba(${r},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${s(6)},0.75) 0%, rgba(${s(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${r},0.08);
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
    color: rgba(${r},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${r},0.7),
        0 0 12px rgba(${r},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${s(8)}, 0.88);
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
    border-color: rgba(${o}, 0.4);
    box-shadow: 0 0 20px rgba(${o}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${o}, 0.5), transparent);
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
    color: rgba(${o}, 0.85);
    text-shadow:
        0 0 4px rgba(${o},0.5),
        0 0 12px rgba(${o},0.3);
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
    background: ${l};
    box-shadow: 0 0 5px rgba(${o}, 0.5);
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
    background: linear-gradient(90deg, ${i}, ${c});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${l}, ${a});
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
    background: linear-gradient(90deg, ${l}, ${a});
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
    background: rgba(${s(8)},0.8);
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
    bottom: 20px;
    right: 20px;
    z-index: 999998;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid rgba(${e},0.5);
    background: rgba(${s(8)}, 0.9);
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
    color: ${c};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${o},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${o},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${l};
    box-shadow: 0 0 5px rgba(${o},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${o},0.1);
    color: ${a};
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
    padding: 7px 17px 10px;
    border-top: 1px solid rgba(${e},0.12);
    font-family: 'Share Tech Mono', 'JetBrains Mono', monospace;
    font-size: 17px;
    line-height: 1.5;
    color: rgba(${e},0.4);
    max-height: 78px;
    overflow: hidden;
}
.nf-log-line:last-child {
    color: rgba(${e},0.7);
    text-shadow: 0 0 6px rgba(${e},0.3);
}
.nf-log-line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.5px 0;
}
    `}function We(){de||(de=document.createElement("style"),de.id="netflow-overlay-styles",de.textContent=st(K),document.head.appendChild(de))}function Ue(t){t.innerHTML="",X.forEach((e,r)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function ct(){const t=document.getElementById("nf-terminal");if(!t)return;Ue(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${X.length}`)}function lt(t,e){let c="";for(let f=0;f<32;f++){const m=f/32*Math.PI*2,C=(f+.2)/32*Math.PI*2,E=(f+.5)/32*Math.PI*2,k=(f+.8)/32*Math.PI*2,w=(f+1)/32*Math.PI*2;c+=`${f===0?"M":"L"}${(120+104*Math.cos(m)).toFixed(1)},${(120+104*Math.sin(m)).toFixed(1)} `,c+=`L${(120+104*Math.cos(C)).toFixed(1)},${(120+104*Math.sin(C)).toFixed(1)} `,c+=`L${(120+116*Math.cos(E)).toFixed(1)},${(120+116*Math.sin(E)).toFixed(1)} `,c+=`L${(120+104*Math.cos(k)).toFixed(1)},${(120+104*Math.sin(k)).toFixed(1)} `,c+=`L${(120+104*Math.cos(w)).toFixed(1)},${(120+104*Math.sin(w)).toFixed(1)} `}c+="Z";const a=24,p=100,y=90;let P="";for(let f=0;f<a;f++){const m=f/a*Math.PI*2,C=(f+.25)/a*Math.PI*2,E=(f+.75)/a*Math.PI*2,k=(f+1)/a*Math.PI*2;P+=`${f===0?"M":"L"}${(120+y*Math.cos(m)).toFixed(1)},${(120+y*Math.sin(m)).toFixed(1)} `,P+=`L${(120+p*Math.cos(C)).toFixed(1)},${(120+p*Math.sin(C)).toFixed(1)} `,P+=`L${(120+p*Math.cos(E)).toFixed(1)},${(120+p*Math.sin(E)).toFixed(1)} `,P+=`L${(120+y*Math.cos(k)).toFixed(1)},${(120+y*Math.sin(k)).toFixed(1)} `}P+="Z";let N="";for(let f=0;f<64;f++){const m=f/64*Math.PI*2,C=f%4===0?117:119,E=f%4===0?124:122,k=f%4===0?.8:.4,w=f%4===0?.7:.35;N+=`<line x1="${(120+C*Math.cos(m)).toFixed(1)}" y1="${(120+C*Math.sin(m)).toFixed(1)}" x2="${(120+E*Math.cos(m)).toFixed(1)}" y2="${(120+E*Math.sin(m)).toFixed(1)}" stroke="rgba(${t},${w})" stroke-width="${k}"/>`}const b=26,s=78,u=68;let x="";for(let f=0;f<b;f++){const m=f/b*Math.PI*2,C=(f+.2)/b*Math.PI*2,E=(f+.5)/b*Math.PI*2,k=(f+.8)/b*Math.PI*2,w=(f+1)/b*Math.PI*2;x+=`${f===0?"M":"L"}${(120+u*Math.cos(m)).toFixed(1)},${(120+u*Math.sin(m)).toFixed(1)} `,x+=`L${(120+u*Math.cos(C)).toFixed(1)},${(120+u*Math.sin(C)).toFixed(1)} `,x+=`L${(120+s*Math.cos(E)).toFixed(1)},${(120+s*Math.sin(E)).toFixed(1)} `,x+=`L${(120+u*Math.cos(k)).toFixed(1)},${(120+u*Math.sin(k)).toFixed(1)} `,x+=`L${(120+u*Math.cos(w)).toFixed(1)},${(120+u*Math.sin(w)).toFixed(1)} `}x+="Z";let A="";for(let f=0;f<48;f++){const m=f/48*Math.PI*2,C=f%4===0?79:80,E=f%4===0?85:83,k=f%4===0?.6:.3,w=f%4===0?.6:.3;A+=`<line x1="${(120+C*Math.cos(m)).toFixed(1)}" y1="${(120+C*Math.sin(m)).toFixed(1)}" x2="${(120+E*Math.cos(m)).toFixed(1)}" y2="${(120+E*Math.sin(m)).toFixed(1)}" stroke="rgba(${e},${w})" stroke-width="${k}"/>`}function V(f,m,C,E,k){let w="";for(let F=0;F<C;F++){const _=F/C*Math.PI*2,v=(F+.25)/C*Math.PI*2,B=(F+.75)/C*Math.PI*2,R=(F+1)/C*Math.PI*2;w+=`${F===0?"M":"L"}${(f+k*Math.cos(_)).toFixed(1)},${(m+k*Math.sin(_)).toFixed(1)} `,w+=`L${(f+E*Math.cos(v)).toFixed(1)},${(m+E*Math.sin(v)).toFixed(1)} `,w+=`L${(f+E*Math.cos(B)).toFixed(1)},${(m+E*Math.sin(B)).toFixed(1)} `,w+=`L${(f+k*Math.cos(R)).toFixed(1)},${(m+k*Math.sin(R)).toFixed(1)} `}return w+"Z"}const T=42,S=[],U=V(120,120,14,18,13);S.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${U}" fill="none" stroke="rgba(${t},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${e},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${t},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let f=0;f<8;f++){const m=f/8*Math.PI*2,C=120+T*Math.cos(m),E=120+T*Math.sin(m),w=V(C,E,10,14,10),F=f%2===0?"":"animation-direction:reverse;";S.push(`<g class="nf-kinetic-sub" style="transform-origin:${C.toFixed(1)}px ${E.toFixed(1)}px;${F}">
            <path d="${w}" fill="none" stroke="rgba(${e},0.6)" stroke-width="0.9"/>
            <circle cx="${C.toFixed(1)}" cy="${E.toFixed(1)}" r="7" fill="none" stroke="rgba(${t},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${C.toFixed(1)}" cy="${E.toFixed(1)}" r="2.5" fill="rgba(${t},0.6)"/>
        </g>`)}const h=S.join(`
`);let q="";for(let f=0;f<8;f++){const m=f/8*Math.PI*2,C=120+10*Math.cos(m),E=120+10*Math.sin(m),k=120+(T-10)*Math.cos(m),w=120+(T-10)*Math.sin(m);q+=`<line x1="${C.toFixed(1)}" y1="${E.toFixed(1)}" x2="${k.toFixed(1)}" y2="${w.toFixed(1)}" stroke="rgba(${e},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        ${N}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${c}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${P}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${y}" fill="none" stroke="rgba(${e},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${x}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${A}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${e},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${q}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${h}
        </g>
    </svg>`}function dt(){const t=document.createElement("div");t.id="netflow-engine-overlay",se=document.createElement("canvas"),se.id="nf-matrix-canvas",t.appendChild(se);const e=document.createElement("div");e.className="nf-pat-data",t.appendChild(e);const r=document.createElement("div");r.className="nf-center-glow",t.appendChild(r);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const i=document.createElement("div");i.className="nf-vignette",t.appendChild(i);for(let T=0;T<3;T++){const S=document.createElement("div");S.className="nf-pulse-ring",t.appendChild(S)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(T=>{const S=document.createElement("div");S.className=`nf-corner-deco ${T}`,t.appendChild(S)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Re(),t.appendChild(d);const l=document.createElement("div");l.className="nf-layout";const c=document.createElement("div");c.className="nf-core-monitor",c.id="nf-core-monitor";const a=document.createElement("div");a.className="nf-core-header",a.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,c.appendChild(a);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",Ue(p),c.appendChild(p);const y=document.createElement("div");y.className="nf-log-feed",y.id="nf-log-feed",y.innerHTML=`<div class="nf-log-line" style="color:rgba(${K.rgb},0.4)">Waiting for automation...</div>`,c.appendChild(y);const P=document.createElement("div");P.className="nf-engine-core",P.id="nf-engine-core";const N=document.createElement("div");N.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(T=>{const S=document.createElement("div");S.className=`nf-frame-corner ${T}`,N.appendChild(S)}),P.appendChild(N);const b="http://www.w3.org/2000/svg",s=document.createElementNS(b,"svg");s.setAttribute("class","nf-engine-waves"),s.setAttribute("viewBox","0 0 560 140"),s.setAttribute("preserveAspectRatio","none"),s.id="nf-engine-waves";for(let T=0;T<6;T++){const S=document.createElementNS(b,"path");S.setAttribute("fill","none"),S.setAttribute("stroke-width",T<3?"1.5":"1"),S.setAttribute("stroke",T<3?`rgba(${K.rgb},${.12+T*.08})`:`rgba(${K.accentRgb},${.08+(T-3)*.06})`),S.setAttribute("data-wave-idx",String(T)),s.appendChild(S)}P.appendChild(s);const u=document.createElement("div");u.className="nf-engine-brand-inner",u.innerHTML=`
        <div class="nf-brand-gear-icon">
            ${lt(K.rgb,K.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
    `,P.appendChild(u);const x=document.createElement("div");x.className="nf-engine-stats",x.id="nf-engine-stats",x.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([T,S,U])=>`<div class="nf-stat-item"><span class="nf-stat-label">${T}</span><span class="nf-stat-val" id="${S}">${U}</span></div>`).join(""),P.appendChild(x),c.appendChild(P),l.appendChild(c);const A=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];$e.forEach((T,S)=>{const U=pt(T);U.classList.add(A[S]),U.id=`nf-mod-${T.id}`,l.appendChild(U)}),t.appendChild(l);for(let T=0;T<30;T++){const S=document.createElement("div");S.className="nf-particle",S.style.left=`${5+Math.random()*90}%`,S.style.bottom=`${Math.random()*40}%`,S.style.animationDuration=`${3+Math.random()*5}s`,S.style.animationDelay=`${Math.random()*4}s`;const U=.3+Math.random()*.4,h=.7+Math.random()*.3;S.style.background=`rgba(${Math.floor(ie*h)}, ${Math.floor(re*h)}, ${Math.floor(ae*h)}, ${U})`,S.style.width=`${1+Math.random()*2}px`,S.style.height=S.style.width,t.appendChild(S)}const V=document.createElement("div");return V.className="nf-footer",V.innerHTML='<div class="nf-timer" id="nf-timer">00:00</div>',t.appendChild(V),t}function pt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(d)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function ft(){qe=Date.now(),Ce=setInterval(()=>{const t=Math.floor((Date.now()-qe)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function je(){Ce&&(clearInterval(Ce),Ce=null)}const ut=144,Be=192,Ye=.35;let Ee=[];function gt(t,e){Ee=[];for(let r=0;r<ut;r++){const o=Math.random();let i;o<.35?i=0:o<.6?i=1:o<.82?i=2:i=3;const d=Math.random()*t,l=Math.random()*e,c=40+Math.random()*180,a=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Ee.push({x:i===0?Math.random()*t:d+Math.cos(a)*c,y:i===0?Math.random()*e:l+Math.sin(a)*c,vx:(Math.random()-.5)*Ye,vy:(Math.random()-.5)*Ye,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:l,oRadius:c,oAngle:a,oSpeed:p})}}function mt(){if(!se)return;const t=se;if(xe=t.getContext("2d"),!xe)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Ee.length===0&&gt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,o=0,i=0;function d(){if(!xe||!se){ve=null;return}ve=requestAnimationFrame(d);const l=xe,c=se.width,a=se.height;l.fillStyle=`rgba(${ie*.04|0},${re*.04|0},${ae*.06|0},1)`,l.fillRect(0,0,c,a),(!r||o!==c||i!==a)&&(o=c,i=a,r=l.createRadialGradient(c*.5,a*.5,0,c*.5,a*.5,Math.max(c,a)*.6),r.addColorStop(0,`rgba(${ie*.08|0},${re*.08|0},${ae*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=r,l.fillRect(0,0,c,a);const p=Ee,y=p.length,P=Be*Be;for(let b=0;b<y;b++){const s=p[b];if(s.pulsePhase+=s.pulseSpeed,s.motion===0)s.x+=s.vx,s.y+=s.vy,s.x<0?(s.x=0,s.vx=Math.abs(s.vx)*(.8+Math.random()*.4)):s.x>c&&(s.x=c,s.vx=-Math.abs(s.vx)*(.8+Math.random()*.4)),s.y<0?(s.y=0,s.vy=Math.abs(s.vy)*(.8+Math.random()*.4)):s.y>a&&(s.y=a,s.vy=-Math.abs(s.vy)*(.8+Math.random()*.4));else if(s.motion===1)s.oAngle+=s.oSpeed,s.x=s.oCx+Math.cos(s.oAngle)*s.oRadius,s.y=s.oCy+Math.sin(s.oAngle)*s.oRadius,s.oCx+=Math.sin(s.oAngle*.3)*.15,s.oCy+=Math.cos(s.oAngle*.3)*.15;else if(s.motion===2)s.oAngle+=s.oSpeed,s.x=s.oCx+Math.cos(s.oAngle)*s.oRadius,s.y=s.oCy+Math.sin(s.oAngle)*s.oRadius*.5,s.oCx+=Math.sin(s.oAngle*.2)*.1,s.oCy+=Math.cos(s.oAngle*.2)*.1;else{s.oAngle+=s.oSpeed;const u=s.oAngle,x=s.oRadius*.7;s.x=s.oCx+x*Math.cos(u),s.y=s.oCy+x*Math.sin(u)*Math.cos(u),s.oCx+=Math.sin(u*.15)*.12,s.oCy+=Math.cos(u*.15)*.12}if(s.motion>0){const u=s.oRadius+50;s.oCx<-u?s.oCx=c+u:s.oCx>c+u&&(s.oCx=-u),s.oCy<-u?s.oCy=a+u:s.oCy>a+u&&(s.oCy=-u)}}const N=5;for(let b=0;b<N;b++){const s=b/N,u=(b+1)/N,x=((s+u)*.5*.35).toFixed(3);l.beginPath(),l.strokeStyle=`rgba(${ie},${re},${ae},${x})`,l.lineWidth=(s+u)*.5*1.2;for(let A=0;A<y;A++){const V=p[A];for(let T=A+1;T<y;T++){const S=p[T],U=V.x-S.x,h=V.y-S.y,q=U*U+h*h;if(q<P){const f=1-Math.sqrt(q)/Be;f>=s&&f<u&&(l.moveTo(V.x,V.y),l.lineTo(S.x,S.y))}}}l.stroke()}l.save(),l.shadowColor=`rgba(${ie},${re},${ae},0.8)`,l.shadowBlur=20;for(let b=0;b<y;b++){const s=p[b],u=.6+.4*Math.sin(s.pulsePhase),x=s.radius*(.8+u*.4),A=ie+(255-ie)*.7*u|0,V=re+(255-re)*.7*u|0,T=ae+(255-ae)*.7*u|0;l.beginPath(),l.arc(s.x,s.y,x,0,Math.PI*2),l.fillStyle=`rgba(${A},${V},${T},${(.6+u*.4).toFixed(2)})`,l.fill()}l.restore(),l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let b=0;b<y;b++){const s=p[b];if(s.radius>2){const u=.6+.4*Math.sin(s.pulsePhase),x=s.radius*(.8+u*.4)*.35;l.moveTo(s.x+x,s.y),l.arc(s.x,s.y,x,0,Math.PI*2)}}l.fill(),l.fillStyle=`rgba(${ie},${re},${ae},0.08)`;for(let b=0;b<6;b++)l.fillRect(Math.random()*c,Math.random()*a,1,1)}d()}function ht(){ve!==null&&(cancelAnimationFrame(ve),ve=null),se=null,xe=null,Ee=[]}function Xe(){we=requestAnimationFrame(Xe),Te+=.035;const t=document.getElementById("nf-engine-waves");if(!t){we=null;return}const e=560,r=140,o=e/2;t.querySelectorAll("path").forEach(d=>{const l=parseInt(d.getAttribute("data-wave-idx")||"0",10),c=10+l*5,a=1.2+l*.35,p=l*.6,y=.7+l*.12;let P=`M 0 ${r/2}`;for(let N=0;N<=e;N+=3){const b=Math.abs(N-o)/o,s=Math.pow(Math.min(1,b*1.6),.6),u=r/2+c*s*Math.sin(N/e*a*Math.PI*2+Te*y+p);P+=` L ${N} ${Math.round(u*10)/10}`}d.setAttribute("d",P)})}function bt(){Te=0,Xe(),mt(),Ie=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Ke(){we!==null&&(cancelAnimationFrame(we),we=null),Ie&&(clearInterval(Ie),Ie=null),ht()}function Ae(){let t=0;const e=X.filter(c=>c.status!=="skipped").length;for(const c of X){const a=document.getElementById(`nf-proc-${c.stepId}`);if(!a)continue;a.className="nf-proc-row";const p=a.querySelector(".nf-proc-badge");switch(c.status){case"done":a.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),t++;break;case"active":a.classList.add("nf-proc-active"),p&&(p.textContent=c.progress!==void 0&&c.progress>0?`⏳ ${c.progress}%`:"⏳ active");break;case"error":a.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":a.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:a.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${t}/${X.length}`);const o=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");t>=e&&e>0?(o&&(o.textContent="COMPLETE",o.style.color=K.doneHex),i&&(i.style.background=K.doneHex,i.style.boxShadow=`0 0 8px rgba(${K.doneRgb},0.7)`)):X.some(a=>a.status==="error")?(o&&(o.textContent="ERROR",o.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(a=>a.status==="active")&&o&&(o.textContent="ACTIVE",o.style.color=K.hex,o.style.textShadow=`0 0 10px rgba(${K.rgb},0.5)`);const d=document.getElementById("nf-terminal"),l=d==null?void 0:d.querySelector(".nf-proc-active");l&&d&&l.scrollIntoView({behavior:"smooth",block:"center"})}function Je(){Y||(We(),Y=document.createElement("button"),Y.id="nf-toggle-btn",Y.className="nf-toggle-hidden",Y.innerHTML="⚡",Y.title="เปิด Netflow Overlay",Y.onclick=()=>Re(),document.body.appendChild(Y))}function Re(){J&&(Je(),ge?(J.classList.remove("nf-hidden"),J.classList.add("nf-visible"),Y&&(Y.classList.remove("nf-toggle-visible"),Y.classList.add("nf-toggle-hidden")),ge=!1):(J.classList.remove("nf-visible"),J.classList.add("nf-hidden"),Y&&(Y.classList.remove("nf-toggle-hidden"),Y.classList.add("nf-toggle-visible")),ge=!0))}const wt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Ze(){const t=document.getElementById("nf-core-monitor");if(!t)return;const r=wt[be||"red"];if(!r)return;let o;try{o=chrome.runtime.getURL(r)}catch{o=`/${r}`}const i=K.rgb;t.style.backgroundImage=`linear-gradient(180deg, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.82) 45%, rgba(0,0,0,0.92) 100%), url('${o}')`,t.style.backgroundSize="auto, cover",t.style.backgroundPosition="center, center",t.style.backgroundRepeat="no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function xt(){if(K=rt(),Ve(),J){ge&&Re();return}de&&(de.remove(),de=null),We(),Pe=1,X=Fe(1),ye.length=0,J=dt(),document.body.appendChild(J),ge=!1,Je(),ft(),bt(),requestAnimationFrame(()=>Ze())}function vt(){je(),Ke(),ge=!1,J&&(J.classList.add("nf-fade-out"),setTimeout(()=>{J==null||J.remove(),J=null},500)),Y&&(Y.remove(),Y=null)}const yt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function $t(t,e,r){const o=X.filter(c=>c.status==="done").length,i=X.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${o}/${i}`);const l=document.getElementById("nf-stat-scenes");if(l&&(l.textContent=Pe>1?`1/${Pe}`:"1/1"),e==="active"){const c=document.getElementById("nf-stat-status"),a=yt[t]||t.toUpperCase();c&&(c.textContent=a)}else if(e==="done"&&o>=i){const c=document.getElementById("nf-stat-status");c&&(c.textContent="COMPLETE")}else if(e==="error"){const c=document.getElementById("nf-stat-status");c&&(c.textContent="ERROR")}if(r!==void 0&&r>0){const c=document.getElementById("nf-stat-progress");c&&(c.textContent=`${Math.min(100,r)}%`)}}function $(t,e,r){if(!J)return;for(const i of $e)for(const d of i.steps)d.id===t&&(d.status=e,r!==void 0&&(d.progress=r));for(const i of X)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),$t(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}_e(),Ae()}function me(t){$(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Le(t=4e3){je(),Ke(),_e(),Ae(),setTimeout(()=>vt(),t)}function _e(){for(const t of $e){const e=t.steps.filter(a=>a.status!=="skipped").length,r=t.steps.filter(a=>a.status==="done").length,o=t.steps.some(a=>a.status==="active"),i=e>0?Math.round(r/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):o&&c.classList.add("nf-active"))}}function Et(t){var o,i,d,l;Pe=t;const e=new Map;for(const c of X)e.set(c.stepId,{status:c.status,progress:c.progress});X=Fe(t);for(const c of X){const a=e.get(c.stepId);a&&(c.status=a.status,a.progress!==void 0&&(c.progress=a.progress))}if(ct(),t>1){const c=$e.find(a=>a.id==="video");if(c){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=c.steps.find(p=>p.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=c.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(p=>p.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)a.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),a.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),a.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});c.steps=a,Qe(c)}}const r=$e.find(c=>c.id==="render");if(r&&t>1){const c=r.steps.find(p=>p.id==="download");c&&(c.label="ดาวน์โหลด 720p");const a=r.steps.find(p=>p.id==="upscale");a&&(a.label="Full Video"),Qe(r)}_e(),Ae()}function Qe(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(d)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function et(t){const e=t.replace(/^\[Netflow AI\]\s*/,"");ye.push(e),ye.length>at&&ye.shift();const r=document.getElementById("nf-log-feed");r&&(r.innerHTML=ye.map(o=>`<div class="nf-log-line">&gt; ${o}</div>`).join(""))}const n=t=>{console.log(`[Netflow AI] ${t}`);try{et(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},L=t=>{console.warn(`[Netflow AI] ${t}`);try{et(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}},ke=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Oe=/Win/i.test(navigator.userAgent),he=ke?"🍎 Mac":Oe?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${he}`),document.addEventListener("click",t=>{const e=t.target;if(!e)return;const r=e.tagName.toLowerCase(),o=Math.round(t.clientX),i=Math.round(t.clientY),d=(e.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${o},${i}) → <${r}> "${d}"`)},!0);const g=t=>new Promise(e=>setTimeout(e,t));function fe(){return!!window.__NETFLOW_STOP__}function Ge(){var o;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.getElementById("netflow-engine-overlay"),r=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of r){if(e&&e.contains(i))continue;const d=(i.textContent||"").trim().toLowerCase();if(!(d.length>200||d.length<5)){for(const l of t)if(d.includes(l))return((o=i.textContent)==null?void 0:o.trim())||l}}return null}async function ue(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,o=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await g(50),t.click()}function kt(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,o=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function tt(t){const e=[],r=document.querySelectorAll("i");for(const o of r){if((o.textContent||"").trim()!==t)continue;let d=o,l=null,c=1/0;for(let a=0;a<20&&d&&(d=d.parentElement,!(!d||d===document.body));a++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const y=p.width*p.height;y<c&&(l=d,c=y)}}l&&!e.includes(l)&&e.push(l)}return e.sort((o,i)=>{const d=o.getBoundingClientRect(),l=i.getBoundingClientRect();return d.left-l.left}),e}function De(){const t=tt("videocam");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🎬 พบการ์ดวิดีโอ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("video");for(const r of e){let o=r.parentElement;for(let i=0;i<10&&o;i++){const d=o.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🎬 พบการ์ดวิดีโอจาก <video> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),o;o=o.parentElement}}return n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Mt(){const t=tt("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let o=r.parentElement;for(let i=0;i<10&&o;i++){const d=o.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Ct(t,e){var c;const[r,o]=t.split(","),i=((c=r.match(/:(.*?);/))==null?void 0:c[1])||"image/png",d=atob(o),l=new Uint8Array(d.length);for(let a=0;a<d.length;a++)l[a]=d.charCodeAt(a);return new File([l],e,{type:i})}function Me(t){var o;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((o=i.textContent)==null?void 0:o.trim())===t){const d=i.closest("button");d&&e.push(d)}return e}function It(){const t=[...Me("add"),...Me("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const i of o){const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const l=(i.textContent||"").trim();if(l==="+"||l==="add")return i}}return null}let e=null,r=0;for(const o of t){const i=o.getBoundingClientRect();i.y>r&&(r=i.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function Ne(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Me(o);let d=null,l=0;for(const c of i){const a=c.getBoundingClientRect();a.y>l&&(l=a.y,d=c)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${l.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,r=0;for(const o of t){const i=o.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(d?1e3:0);l>r&&(r=l,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const i=(o.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return o}return null}function Se(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of r){const i=o.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function ze(t,e){var r,o,i,d;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const a=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(a),await g(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(c),await g(800);const a=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(a.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${a.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await g(800);const a=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(a.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${a.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=e,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let a=0;a<30&&c;a++){const p=c.memoizedProps,y=c.memoizedState;if((o=p==null?void 0:p.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const P=p.editor;P.selection,P.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=y==null?void 0:y.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),y.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Pt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function St(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${he})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${he})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Tt(t,e,r){var p;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(y=>y.input)];for(const y of o)!i.includes(y)&&y.offsetParent===null&&i.push(y);for(const y of i)y.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${he})`),!1;let l;if(r&&r.size>0){const y=Array.from(d).filter(P=>!r.has(P));y.length>0?(l=y[y.length-1],n(`เล็งเป้า file input ใหม่ (${y.length} ใหม่, ${d.length} ทั้งหมด)`)):(l=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else l=d[d.length-1];const c=new DataTransfer;c.items.add(e);try{l.files=c.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=l.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(y){n(`กำหนด target.files ล้มเหลว: ${y.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:c.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(P){return L(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${P.message}`),!1}}const a=l._valueTracker;a&&(a.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const y=new DataTransfer;y.items.add(e);const P=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:y});l.dispatchEvent(P),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${he}`),!0}function nt(){let t=0;const e=document.getElementById("netflow-engine-overlay"),r=document.querySelectorAll("img");for(const i of r){if(e&&e.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.src&&i.offsetParent!==null&&t++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const i of o){if(e&&e.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.offsetParent!==null&&t++}return t}function He(){const t=document.querySelectorAll("img");for(const r of t){const o=r.getBoundingClientRect();if(o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&r.src&&r.offsetParent!==null)return n(`พบรูปย่อ: ${o.width.toFixed(0)}x${o.height.toFixed(0)} ที่ y=${o.top.toFixed(0)}`),!0}const e=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of e){const o=r.getBoundingClientRect();if(o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&r.offsetParent!==null)return n(`พบรูปย่อ div: ${o.width.toFixed(0)}x${o.height.toFixed(0)} ที่ y=${o.top.toFixed(0)}`),!0}return!1}async function Ft(t){n("ลองลากวางไฟล์บน Prompt Bar (drag-and-drop)...");const e=[],r=document.querySelectorAll('[contenteditable="true"]');for(const i of r)i.getBoundingClientRect().bottom>window.innerHeight*.5&&e.push(i);const o=document.querySelectorAll('form, [role="textbox"], [data-slate-editor]');for(const i of o)i.getBoundingClientRect().bottom>window.innerHeight*.5&&!e.includes(i)&&e.push(i);if(e.length===0){const i=document.querySelectorAll("div");for(const d of i){const l=d.getBoundingClientRect();if(l.bottom>window.innerHeight*.8&&l.width>300&&l.height>30&&l.height<200&&(e.push(d),e.length>=3))break}}if(e.length===0)return n("ไม่พบเป้าหมายบน Prompt Bar สำหรับ drag-and-drop"),!1;n(`พบเป้าหมาย drag-and-drop ${e.length} ตัว`);for(const i of e)try{const d=i.getBoundingClientRect(),l=d.left+d.width/2,c=d.top+d.height/2,a={bubbles:!0,cancelable:!0,clientX:l,clientY:c},p=new DataTransfer;if(p.items.add(t),i.dispatchEvent(new DragEvent("dragenter",{...a,dataTransfer:p})),await g(100),i.dispatchEvent(new DragEvent("dragover",{...a,dataTransfer:p})),await g(100),i.dispatchEvent(new DragEvent("drop",{...a,dataTransfer:p})),n(`ส่ง drag-and-drop บน <${i.tagName.toLowerCase()}> ที่ (${l.toFixed(0)}, ${c.toFixed(0)})`),await g(500),He())return!0}catch(d){n(`drag-and-drop ผิดพลาด: ${d.message}`)}return!1}async function Bt(t){n("ลองวางไฟล์ผ่านคลิปบอร์ด (clipboard paste)...");const e=Se();if(!e)return n("ไม่พบช่อง prompt สำหรับวางไฟล์"),!1;try{e.focus(),await g(200);const r=new DataTransfer;r.items.add(t);const o=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:r});return e.dispatchEvent(o),n("ส่ง paste event พร้อมไฟล์รูปบน Prompt Bar แล้ว"),!0}catch(r){return n(`วางผ่านคลิปบอร์ดผิดพลาด: ${r.message}`),!1}}async function ot(t,e){var a;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=Ct(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const o=It();if(!o)return L("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const i=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${i.size} ตัว`);const d=St();let l=Pt();const c=new MutationObserver(p=>{for(const y of p)for(const P of y.addedNodes)if(P instanceof HTMLInputElement&&P.type==="file"&&(P.type="text",l.push({input:P,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),P instanceof HTMLElement){const N=P.querySelectorAll('input[type="file"]');for(const b of N)b.type="text",l.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});c.observe(document.body,{childList:!0,subtree:!0});try{await ue(o),n("คลิกปุ่ม '+' แล้ว"),await g(1500),n("กำลังค้นหาเมนูอัพโหลด...");let p=!1;const y=Date.now();for(;!p&&Date.now()-y<5e3;){const s=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const u of s){if(u===o)continue;const x=u.querySelectorAll("i");for(const A of x){const V=((a=A.textContent)==null?void 0:a.trim())||"";if((V==="upload"||V==="upload_file")&&!Array.from(u.querySelectorAll("i")).map(S=>{var U;return(U=S.textContent)==null?void 0:U.trim()}).includes("drive_folder_upload")){await ue(u),p=!0,n(`คลิกเมนูอัพโหลด (ไอคอน: ${V}) [${ke?"Mac":"Win"}]`);break}}if(p)break}if(!p)for(const u of s){if(u===o)continue;const x=u.childNodes.length<=5?(u.textContent||"").trim():"";if(x.length>0&&x.length<40){const A=x.toLowerCase();if(A==="upload"||A==="อัปโหลด"||A==="อัพโหลด"||A.includes("upload image")||A.includes("upload photo")||A.includes("อัปโหลดรูปภาพ")||A.includes("อัพโหลดรูปภาพ")||A.includes("from computer")||A.includes("จากคอมพิวเตอร์")){await ue(u),p=!0,n(`คลิกเมนูอัพโหลด (ข้อความ: "${x}") [${ke?"Mac":"Win"}]`);break}}}p||await g(500)}return p||n("⚠️ ไม่พบเมนูอัพโหลดหลังรอ 5 วินาที"),await g(1e3),Tt(l,r,i)?(n(`✅ ฉีดไฟล์ ${e} สำเร็จ — ไม่มี dialog เปิด`),await g(2500),!0):(n("⚠️ การฉีดไฟล์ล้มเหลว — ลองวิธี drag-and-drop"),await Ft(r)&&(await g(2500),He())?(n("✅ ยืนยันรูปย่อผ่าน drag-and-drop!"),!0):await Bt(r)&&(await g(2500),He())?(n("✅ ยืนยันรูปย่อผ่าน clipboard paste!"),!0):(L(`การอัพโหลดล้มเหลวทุกวิธีสำหรับ ${e}`),!1))}finally{c.disconnect(),d();for(const p of l)p.input.type!=="file"&&(p.input.type="file")}}async function At(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button");let o=null;for(const b of r){const s=b.textContent||"";if((s.includes("Nano Banana")||s.includes("Imagen")||s.includes("วิดีโอ")||s.includes("รูปภาพ")||s.includes("Image")||s.includes("Video"))&&b.getBoundingClientRect().bottom>window.innerHeight*.7){o=b,n(`พบปุ่มตั้งค่าจากข้อความ: "${s.substring(0,30).trim()}"`);break}}if(!o)for(const b of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const s=Me(b);for(const u of s)if(u.getBoundingClientRect().bottom>window.innerHeight*.7){o=u,n(`พบปุ่มตั้งค่าจากไอคอน: ${b}`);break}if(o)break}if(!o)return L("ไม่พบปุ่มตั้งค่า"),!1;const i=o.getBoundingClientRect(),d=i.left+i.width/2,l=i.top+i.height/2,c={bubbles:!0,cancelable:!0,clientX:d,clientY:l,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",c)),o.dispatchEvent(new MouseEvent("click",c)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let a=!1,p=null;const y=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const b of y){const s=b.getAttribute("aria-controls")||"",u=b.id||"";if(s.toUpperCase().includes("IMAGE")||u.toUpperCase().includes("IMAGE")){p=b,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${s})`);break}}if(!p)for(const b of document.querySelectorAll('[role="tab"]')){const s=b.id||"";if(s.toUpperCase().includes("TRIGGER-IMAGE")){p=b,n(`พบแท็บ Image ผ่าน id: ${s}`);break}}if(!p)for(const b of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const s=(b.textContent||"").trim();if((s==="Image"||s.endsWith("Image")||s==="รูปภาพ"||s==="ภาพ")&&!s.includes("Video")&&!s.includes("วิดีโอ")){p=b,n(`พบแท็บ Image ผ่านข้อความ: "${s}"`);break}}if(p){const b=p.getAttribute("data-state")||"",s=p.getAttribute("aria-selected")||"";if(b==="active"||s==="true")a=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const u=p.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",x)),p.dispatchEvent(new MouseEvent("click",x)),a=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}a||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const P=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const b of document.querySelectorAll("button, [role='tab'], [role='option']")){const s=(b.textContent||"").trim();if(s===P||s.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const u=b.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",x)),b.dispatchEvent(new MouseEvent("click",x)),n(`เลือกทิศทาง: ${P}`),await g(400);break}}const N=`x${e}`;for(const b of document.querySelectorAll("button, [role='tab'], [role='option']"))if((b.textContent||"").trim()===N){const u=b.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",x)),b.dispatchEvent(new MouseEvent("click",x)),n(`เลือกจำนวน: ${N}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),o.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",c)),o.dispatchEvent(new MouseEvent("click",c)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function Rt(t){var V,T,S,U;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=r?r[1]:"unknown",i=ke?"macOS":Oe?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=ke?((T=(V=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:V[1])==null?void 0:T.replace(/_/g,"."))||"":Oe&&((S=e.match(/Windows NT ([0-9.]+)/))==null?void 0:S[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${o}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${c} | แพลตฟอร์ม: ${he}`),n("══════════════════════════════════════════");try{it(t.theme)}catch{}try{xt()}catch(h){console.warn("Overlay show error:",h)}const a=[],p=[];try{$("settings","active");const h=t.orientation||"horizontal",q=t.outputCount||1,f=await At(h,q);a.push(f?"✅ Settings":"⚠️ Settings"),$("settings",f?"done":"error")}catch(h){L(`ตั้งค่าผิดพลาด: ${h.message}`),a.push("⚠️ Settings"),$("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const y=()=>{const h=document.querySelectorAll("span, div, p, label");for(const q of h){const f=(q.textContent||"").trim();if(/^\d{1,3}%$/.test(f)){if(f==="100%")return null;const m=q.getBoundingClientRect();if(m.width>0&&m.height>0&&m.top>0&&m.top<window.innerHeight)return f}}return null},P=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await g(2e3);const q=Date.now(),f=6e4;let m="",C=Date.now();const E=15e3;for(;Date.now()-q<f;){const k=y();if(k){if(k!==m)m=k,C=Date.now();else if(Date.now()-C>E){n(`✅ อัพโหลด ${h} — % ค้างที่ ${k} นาน ${E/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}n(`กำลังอัพโหลด: ${k} — รอ...`),await g(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}L(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${f/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){$("upload-char","active");try{const h=await ot(t.characterImage,"character.png");a.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||p.push("character upload failed"),$("upload-char",h?"done":"error")}catch(h){L(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),a.push("❌ ตัวละคร"),p.push("character upload error"),$("upload-char","error")}await P("character")}else me("upload-char");if(t.productImage){$("upload-prod","active");try{const h=await ot(t.productImage,"product.png");a.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||p.push("product upload failed"),$("upload-prod",h?"done":"error")}catch(h){L(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),a.push("❌ สินค้า"),p.push("product upload error"),$("upload-prod","error")}await P("product")}else me("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const N=y();N&&(n(`⚠️ อัพโหลดยังแสดง ${N} — รอเพิ่มเติม...`),await P("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const b=(t.characterImage?1:0)+(t.productImage?1:0);if(b>0){let h=nt();h<b&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${b} — รอ 3 วินาที...`),await g(3e3),h=nt()),h>=b?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${b}`):L(`⚠️ คาดว่าจะมี ${b} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Le(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),$("img-prompt","active"),await g(1e3);const s=Se();s?(await ze(s,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),a.push("✅ Prompt"),$("img-prompt","done")):(L("ไม่พบช่องป้อนข้อความ Prompt"),a.push("❌ Prompt"),p.push("prompt input not found"),$("img-prompt","error")),await g(800);const u=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&u.add(h.src)}),n(`บันทึกรูปเดิม: ${u.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),$("img-generate","active"),await g(500);const x=Ne();if(x){const h=x.getBoundingClientRect(),q=h.left+h.width/2,f=h.top+h.height/2,m={bubbles:!0,cancelable:!0,clientX:q,clientY:f,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),x.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",m)),x.dispatchEvent(new MouseEvent("click",m)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),a.push("✅ Generate"),await g(500),x.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),x.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",m)),x.dispatchEvent(new MouseEvent("click",m)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),$("img-generate","done")}else L("ไม่พบปุ่ม → Generate"),a.push("❌ Generate"),p.push("generate button not found"),$("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),$("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3),n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let h=null;const q=Date.now();for(;!h&&Date.now()-q<18e4;){const f=document.querySelectorAll("img");for(const m of f){if(u.has(m.src)||!(m.alt||"").toLowerCase().includes("generated"))continue;const E=m.getBoundingClientRect();if(E.width>120&&E.height>120&&E.top>0&&E.top<window.innerHeight*.85){const k=m.closest("div");if(k){h=k,n(`พบรูป AI จาก alt="${m.alt}": ${m.src.substring(0,80)}...`);break}}}if(!h)for(const m of f){if(u.has(m.src))continue;const C=m.closest("div"),E=(C==null?void 0:C.textContent)||"";if(E.includes("product.png")||E.includes("character.png")||E.includes(".png")||E.includes(".jpg")){n(`ข้ามรูปอ้างอิง (มีชื่อไฟล์): ${E.substring(0,40)}`);continue}const k=m.getBoundingClientRect();if(k.width>120&&k.height>120&&k.top>0&&k.top<window.innerHeight*.85){const w=m.closest("div");if(w){h=w,n(`พบรูปใหม่ (สำรอง): ${m.src.substring(0,80)}...`);break}}}if(!h){if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const m=Ge();if(m){L(`❌ สร้างรูปล้มเหลว: ${m}`),p.push(`image gen failed: ${m}`),$("img-wait","error");break}await g(5e3),n("ยังรอรูปที่สร้างใหม่...")}}if(!h)L("หมดเวลารอรูปที่สร้าง"),a.push("⚠️ Wait Image"),$("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),a.push("✅ Image Found"),$("img-wait","done",100);const f=h.getBoundingClientRect(),m=f.left+f.width/2,C=f.top+f.height/2,E={bubbles:!0,cancelable:!0,clientX:m,clientY:C};h.dispatchEvent(new PointerEvent("pointerenter",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseenter",E)),h.dispatchEvent(new PointerEvent("pointerover",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseover",E)),h.dispatchEvent(new PointerEvent("pointermove",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousemove",E)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let k=null;for(const w of["more_vert","more_horiz","more"]){const F=Me(w);for(const _ of F){const v=_.getBoundingClientRect();if(v.top>=f.top-20&&v.top<=f.bottom&&v.right>=f.right-150&&v.right<=f.right+20){k=_;break}}if(k)break}if(!k){const w=document.querySelectorAll("button");for(const F of w){const _=F.getBoundingClientRect();if(_.width<50&&_.height<50&&_.top>=f.top-10&&_.top<=f.top+60&&_.left>=f.right-80){const v=F.querySelectorAll("i");for(const R of v)if((((U=R.textContent)==null?void 0:U.trim())||"").includes("more")){k=F;break}if(k)break;const B=F.getAttribute("aria-label")||"";if(B.includes("เพิ่มเติม")||B.includes("more")){k=F;break}}}}if(!k)L("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),a.push("⚠️ 3-dots");else{const w=k.getBoundingClientRect(),F=w.left+w.width/2,_=w.top+w.height/2,v={bubbles:!0,cancelable:!0,clientX:F,clientY:_,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",v)),k.dispatchEvent(new MouseEvent("click",v)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let B=null;const R=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const G of R){const W=(G.textContent||"").trim();if(W.includes("ทำให้เป็นภาพเคลื่อนไหว")||W.includes("Animate")||W.includes("animate")){B=G;break}}if(!B)L("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),a.push("⚠️ Animate");else{const G=B.getBoundingClientRect(),W=G.left+G.width/2,te=G.top+G.height/2,j={bubbles:!0,cancelable:!0,clientX:W,clientY:te,button:0};B.dispatchEvent(new PointerEvent("pointerdown",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mousedown",j)),await g(80),B.dispatchEvent(new PointerEvent("pointerup",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseup",j)),B.dispatchEvent(new MouseEvent("click",j)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),a.push("✅ Animate"),$("animate","done"),await g(3e3)}}}}catch(h){L(`ขั้น 4 ผิดพลาด: ${h.message}`),a.push("⚠️ Animate")}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Le(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),$("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let h=!1;const q=document.querySelectorAll("button, span, div");for(const C of q){const E=(C.textContent||"").trim(),k=C.getBoundingClientRect();if((E==="วิดีโอ"||E==="Video"||E.includes("วิดีโอ"))&&k.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await g(1e3);const f=Se();f?(await ze(f,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),a.push("✅ Video Prompt"),$("vid-prompt","done")):(L("ไม่พบช่อง Prompt สำหรับ Video Prompt"),a.push("❌ Video Prompt"),p.push("video prompt input not found"),$("vid-prompt","error")),await g(1e3),$("vid-generate","active");const m=Ne();if(m){const C=m.getBoundingClientRect(),E=C.left+C.width/2,k=C.top+C.height/2,w={bubbles:!0,cancelable:!0,clientX:E,clientY:k,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",w)),m.dispatchEvent(new MouseEvent("click",w)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),a.push("✅ Video Generate"),$("vid-generate","done"),await g(500),m.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",w)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",w)),m.dispatchEvent(new MouseEvent("click",w)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else L("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),a.push("❌ Video Generate"),p.push("video generate button not found"),$("vid-generate","error")}catch(h){L(`ขั้น 5 ผิดพลาด: ${h.message}`),a.push("⚠️ Video Gen"),p.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),me("animate"),me("vid-prompt"),me("vid-generate"),me("vid-wait");if(t.videoPrompt){$("vid-wait","active");const h=t.sceneCount||1,q=t.videoScenePrompts||[t.videoPrompt];if(h>1)try{Et(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);const f=document.getElementById("netflow-engine-overlay"),m=()=>{const w=document.querySelectorAll("div, span, p, label, strong, small");for(const F of w){if(f&&f.contains(F))continue;const _=(F.textContent||"").trim();if(_.length>10)continue;const v=_.match(/(\d{1,3})\s*%/);if(!v)continue;const B=parseInt(v[1],10);if(B<1||B>100)continue;const R=F.getBoundingClientRect();if(!(R.width===0||R.width>150)&&!(R.top<0||R.top>window.innerHeight))return B}return null},C=async(w=6e5)=>{n("รอการสร้างวิดีโอ..."),$("vid-wait","active"),await g(5e3);const F=()=>{const D=document.querySelectorAll("div, span, p, label, strong, small");let H=0;for(const oe of D){if(f&&f.contains(oe))continue;const I=(oe.textContent||"").trim();if(I.includes("%")&&I.length<15){const M=oe.tagName.toLowerCase(),O=oe.className&&typeof oe.className=="string"?oe.className.split(/\s+/).slice(0,2).join(" "):"",Q=oe.getBoundingClientRect();if(n(`  🔍 "${I}" ใน <${M}.${O}> ที่ (${Q.left.toFixed(0)},${Q.top.toFixed(0)}) w=${Q.width.toFixed(0)}`),H++,H>=5)break}}H===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},_=De();n(_?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),F();const v=Date.now();let B=-1,R=0,G=!1;for(;Date.now()-v<w;){const D=m();if(D!==null){if(D!==B&&(n(`ความคืบหน้าวิดีโอ: ${D}%`),B=D,$("vid-wait","active",D)),R=Date.now(),D>=100){n("✅ ตรวจพบ 100%!"),G=!0;break}}else if(B>30){const H=Math.floor((Date.now()-R)/1e3);if(H>=5){n(`✅ % หายไปที่ ${B}% (หาย ${H} วินาที) — วิดีโอเสร็จ!`),G=!0;break}n(`⏳ % หายที่ ${B}% — ยืนยันใน ${5-H} วินาที...`)}else{const H=Math.floor((Date.now()-v)/1e3);H%15<3&&n(`⏳ รอ... (${H} วินาที) ไม่พบ %`)}if(!G&&B>0&&De()&&!_){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${B}% — วิดีโอเสร็จ!`),G=!0;break}if(fe())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(B<1){const H=Ge();if(H)return L(`❌ สร้างวิดีโอล้มเหลว: ${H}`),null}await g(3e3)}const W=De();if(!W)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),$("vid-wait","error"),null;const te=W;G?($("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const j=te.getBoundingClientRect();let z=j.left+j.width/2,ne=j.top+j.height/2,ee=te;const pe=te.querySelector("video, img, canvas");if(pe){const D=pe.getBoundingClientRect();D.width>50&&D.height>50&&(z=D.left+D.width/2,ne=D.top+D.height/2,ee=pe,n(`🎯 พบรูปย่อ <${pe.tagName.toLowerCase()}> ในการ์ดที่ (${z.toFixed(0)},${ne.toFixed(0)}) ${D.width.toFixed(0)}x${D.height.toFixed(0)}`))}else ne=j.top+j.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${z.toFixed(0)},${ne.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${z.toFixed(0)}, ${ne.toFixed(0)})...`),kt(ee);for(let D=0;D<8;D++){const H={bubbles:!0,cancelable:!0,clientX:z+D%2,clientY:ne};ee.dispatchEvent(new PointerEvent("pointermove",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ee.dispatchEvent(new MouseEvent("mousemove",H)),await g(500)}n("คลิกการ์ดวิดีโอ...");for(let D=0;D<2;D++){const H=document.elementFromPoint(z,ne);H?await ue(H):await ue(ee),await g(300)}return n("✅ คลิกการ์ดวิดีโอเสร็จ"),te},E=async(w,F=6e5)=>{n(`รอการสร้างวิดีโอฉาก ${w}...`),await g(5e3);const _=Date.now();let v=-1,B=0;for(;Date.now()-_<F;){const R=m();if(R!==null){if(R!==v&&(n(`ความคืบหน้าฉาก ${w}: ${R}%`),v=R),B=Date.now(),R>=100)return n(`✅ ฉาก ${w} — 100%!`),!0}else if(v>30){const G=Math.floor((Date.now()-B)/1e3);if(G>=5)return n(`✅ ฉาก ${w} — % หายที่ ${v}% (${G} วินาที) — เสร็จ!`),!0;n(`⏳ ฉาก ${w} % หายที่ ${v}% — ยืนยันใน ${5-G} วินาที...`)}else{const G=Math.floor((Date.now()-_)/1e3);G%15<3&&n(`⏳ ฉาก ${w} รอ... (${G} วินาที)`)}if(fe())return n(`⛔ ผู้ใช้สั่งหยุดระหว่างรอฉาก ${w}`),!1;if(v<1){const G=Ge();if(G)return L(`❌ สร้างฉาก ${w} ล้มเหลว: ${G}`),!1}await g(3e3)}return!1},k=async()=>{var oe;let w=null;const F=document.querySelectorAll("button");for(const I of F){const M=(I.textContent||"").trim();if(M.includes("ดาวน์โหลด")||M.toLowerCase().includes("download")){w=I,n(`พบปุ่มดาวน์โหลดจากข้อความ: "${M}"`);break}}if(!w)for(const I of F){const M=I.getBoundingClientRect();if(M.top<80&&M.right>window.innerWidth-300){const O=(I.textContent||"").trim().toLowerCase(),Q=(I.getAttribute("aria-label")||"").toLowerCase();if(O.includes("ดาวน์")||O.includes("download")||Q.includes("ดาวน์")||Q.includes("download")){w=I,n("พบปุ่มดาวน์โหลดจากตำแหน่ง+ข้อความ");break}}}if(!w){const I=document.querySelectorAll('[data-type="button-overlay"]');for(const M of I){const O=M.closest("button")||M.parentElement;if(O){const Q=(O.textContent||"").trim();if(Q.includes("ดาวน์โหลด")||Q.toLowerCase().includes("download")){w=O,n("พบปุ่มดาวน์โหลดผ่าน button-overlay parent");break}}}}if(!w){L("ไม่พบปุ่มดาวน์โหลดในหน้ารายละเอียด"),a.push("⚠️ Download btn");return}const _=w.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:_.left+_.width/2,clientY:_.top+_.height/2,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),w.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",v)),w.dispatchEvent(new MouseEvent("click",v)),await g(50),w.click(),n("คลิกปุ่มดาวน์โหลดแล้ว"),a.push("✅ ดาวน์โหลด"),$("download","done"),$("upscale","active"),await g(1500);const B=async I=>{const M=I.getBoundingClientRect(),O={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};I.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mousedown",O)),await g(80),I.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseup",O)),I.dispatchEvent(new MouseEvent("click",O)),await g(50),I.click()},R=async I=>{const M=I.getBoundingClientRect(),O={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2};I.dispatchEvent(new PointerEvent("pointerenter",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseenter",O)),I.dispatchEvent(new PointerEvent("pointermove",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseover",O)),I.dispatchEvent(new MouseEvent("mousemove",O))},G=I=>{const M=document.querySelectorAll('[role="menuitem"]');for(const O of M)if((O.textContent||"").trim().includes(I)){const Z=O.getBoundingClientRect();if(Z.width>0&&Z.height>0)return O}return null};let W=null;const te=["Full Video","วิดีโอเต็ม","ฉบับเต็ม","คลิปเต็ม","ทั้งหมด"];for(const I of te)if(W=G(I),W)break;if(W){n("พบเมนูหลายฉาก — ชี้ไปที่ Full Video..."),await R(W),await g(500),await B(W),n("คลิก Full Video แล้ว"),a.push("✅ Full Video"),await g(1500);let I=null;const M=Date.now();for(;Date.now()-M<5e3&&(I=G("720p"),!I);)n("รอเมนูย่อย 720p..."),await g(500);if(!I){L("ไม่พบตัวเลือก 720p ในเมนูย่อย"),a.push("⚠️ 720p");return}await B(I),n("คลิก 720p — เริ่มดาวน์โหลด"),a.push("✅ 720p"),$("upscale","active")}else{let I=G("1080p");if(!I){const M=document.querySelectorAll("button, div[role='button'], span");for(const O of M)if((O.textContent||"").trim().includes("1080p")&&O.offsetParent!==null){I=O.closest("button")||O;break}}if(!I){L("ไม่พบตัวเลือก 1080p"),a.push("⚠️ 1080p");return}await B(I),n("คลิก 1080p — เริ่มดาวน์โหลด"),a.push("✅ 1080p"),$("upscale","active")}n("รอการดาวน์โหลดเสร็จ...");const j=Date.now();let z=!1,ne=!1,ee=0;const pe=8e3;for(;Date.now()-j<3e5;){const M=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(M.includes("download complete")||M.includes("upscaling complete")||M.includes("upscale complete")||M.includes("scaling complete")||M.includes("video is ready")||M.includes("video ready")||M.includes("อัปสเกลเสร็จ")||M.includes("ดาวน์โหลดเสร็จ")||M.includes("วิดีโอพร้อม")){const Z=M.includes("download")?"Downloaded":"Upscaled";n(`✅ ${Z}! (จับคู่ข้อความ)`),a.push(`✅ ${Z}`),$("upscale","done",100),z=!0;break}const O=document.querySelectorAll("div, span, p, h1, h2, h3");for(const Z of O){const ce=(Z.textContent||"").trim().toLowerCase();if(ce.length<60&&(ce.includes("upscaling complete")||ce.includes("upscale complete")||ce.includes("scaling complete")||ce.includes("download complete")||ce.includes("video is ready")||ce.includes("อัปสเกลเสร็จ")||ce.includes("ดาวน์โหลดเสร็จ")||ce.includes("วิดีโอพร้อม"))){n(`✅ เสร็จ! (element: "${(oe=Z.textContent)==null?void 0:oe.trim()}")`),a.push("✅ Upscaled"),$("upscale","done",100),z=!0;break}}if(z)break;if(M.includes("upscaling your video")||M.includes("upscaling video")||M.includes("downloading your extended video")||M.includes("downloading video")||M.includes("กำลังอัปสเกล")||M.includes("กำลังดาวน์โหลด")){ne=!0,ee=0;const Z=Math.floor((Date.now()-j)/1e3);M.includes("downloading")?n(`⏳ กำลังดาวน์โหลดวิดีโอ... (${Z} วินาที)`):n(`⏳ กำลังอัปสเกล... (${Z} วินาที)`)}else if(ne)if(ee===0)ee=Date.now(),n("🔍 ข้อความประมวลผลหายไป — กำลังยืนยัน...");else if(Date.now()-ee>=pe){n(`✅ ข้อความประมวลผลหายไป ${pe/1e3} วินาที — เสร็จ!`),a.push("✅ Upscaled"),$("upscale","done",100),z=!0;break}else{const Z=Math.ceil((pe-(Date.now()-ee))/1e3);n(`🔍 กำลังยืนยัน... (อีก ${Z} วินาที)`)}else{const Z=Math.floor((Date.now()-j)/1e3);n(`⏳ รอ... (${Z} วินาที)`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอดาวน์โหลด"),a.push("⛔ Stopped"),$("upscale","error");return}await g(2e3)}if(!z){L("ดาวน์โหลดหมดเวลา — ไฟล์อาจยังดาวน์โหลดอยู่"),a.push("⚠️ Download timeout"),$("upscale","error");return}$("open","active"),n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let D=!1;const H=Date.now();for(;Date.now()-H<6e4&&!D;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO"},M=>{chrome.runtime.lastError?L(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):M!=null&&M.success?(n(`✅ เปิดวิดีโอแล้ว: ${M.message}`),a.push("✅ Opened"),$("open","done"),D=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${M==null?void 0:M.message}`),I()})})}catch(I){L(`ตรวจสอบผิดพลาด: ${I.message}`)}D||await g(3e3)}D||(L("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),a.push("⚠️ Open"))};try{if(!await C())L("หมดเวลารอการสร้างวิดีโอ"),a.push("⚠️ Video Wait"),$("vid-wait","error");else if(a.push("✅ Video Complete"),$("vid-wait","done",100),$("download","active"),h<=1)n("ฉากเดียว — รอ 3 วินาทีเพื่อโหลดหน้ารายละเอียด..."),a.push("✅ Clicked"),await g(3e3),await k();else{n(`โหมดหลายฉาก: ${h} ฉาก`);for(let F=1;F<h;F++){const _=q[F];if(!_){n(`ไม่มี Prompt สำหรับฉาก ${F+1} — ข้าม`);continue}if(fe()){n(`⛔ ผู้ใช้สั่งหยุดก่อนฉาก ${F+1}`),p.push("stopped by user");break}const v=F+1;n(`--- ฉาก ${v}/${h} ---`),await g(2e3),$(`scene${v}-prompt`,"active");const B=Se();if(B)await ze(B,_),n(`วาง Prompt ฉาก ${v} แล้ว (${_.length} ตัวอักษร)`),a.push(`✅ Scene${v} Prompt`),$(`scene${v}-prompt`,"done");else{L(`ไม่พบช่อง Prompt สำหรับฉาก ${v}`),a.push(`❌ Scene${v}`),p.push(`scene ${v} prompt input not found`),$(`scene${v}-prompt`,"error");break}await g(1e3),$(`scene${v}-gen`,"active");const R=Ne();if(R){const W=R.getBoundingClientRect(),te=W.left+W.width/2,j=W.top+W.height/2,z={bubbles:!0,cancelable:!0,clientX:te,clientY:j,button:0};R.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mousedown",z)),await g(80),R.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mouseup",z)),R.dispatchEvent(new MouseEvent("click",z)),n(`คลิก Generate สำหรับฉาก ${v} แล้ว`),a.push(`✅ Scene${v} Gen`),$(`scene${v}-gen`,"done"),await g(500),R.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mousedown",z)),await g(80),R.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mouseup",z)),R.dispatchEvent(new MouseEvent("click",z))}else{L(`ไม่พบปุ่ม Generate สำหรับฉาก ${v}`),a.push(`❌ Scene${v} Gen`),p.push(`scene ${v} generate button not found`),$(`scene${v}-gen`,"error");break}$(`scene${v}-wait`,"active"),await E(v)?(a.push(`✅ Scene${v}`),$(`scene${v}-wait`,"done",100)):(L(`ฉาก ${v} หมดเวลา`),a.push(`⚠️ Scene${v}`),$(`scene${v}-wait`,"error"))}n("สร้างครบทุกฉากแล้ว!"),a.push("✅ All Scenes"),await g(3e3),await k()}}catch(w){L(`ขั้น 6 ผิดพลาด: ${w.message}`),a.push("⚠️ Step6"),p.push(`step 6: ${w.message}`)}}const A=p.length===0;try{Le(A?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:A,message:A?`สำเร็จ! ${a.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${a.join(" → ")} | ${p.join(", ")}`,step:A?"done":"partial"}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Rt(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>console.error("[Netflow AI] Generate error:",o)),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const o=Mt();if(!o){L("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=o.getBoundingClientRect(),d=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const a=document.elementFromPoint(d,l);a?(await ue(a),n(`คลิก ${c+1}/2 บน <${a.tagName.toLowerCase()}>`)):(await ue(o),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),document.addEventListener("dblclick",t=>{const e=t.target;if(!e)return;const r=e.tagName.toLowerCase(),o=Math.round(t.clientX),i=Math.round(t.clientY),d=(e.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${o},${i}) → <${r}> "${d}"`)},!0)})();
