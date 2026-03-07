(function(){"use strict";const st={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let j=st.green,gt=null;function Ct(e){e&&st[e]&&(gt=e,j=st[e],Gt(),requestAnimationFrame(()=>Xt()))}function ee(){if(gt&&st[gt])return st[gt];try{const e=localStorage.getItem("netflow_app_theme");if(e&&st[e])return st[e]}catch{}return st.green}let nt=0,ot=255,it=65;function Gt(){const e=j.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(nt=parseInt(e[1],16),ot=parseInt(e[2],16),it=parseInt(e[3],16))}let X=null,V=null,lt=null,Ot=0,$t=null,mt=null,Et=null,Mt=0,pt=!1,at=null,ht=null,bt=null,kt=1,Y=[];function It(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let c=2;c<=e;c++)t.push({stepId:`scene${c}-prompt`,label:`Scene ${c} Prompt`,status:"waiting"},{stepId:`scene${c}-gen`,label:`Scene ${c} Generate`,status:"waiting"},{stepId:`scene${c}-wait`,label:`Scene ${c} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const wt=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];Y=It(1);function ne(e){const t=e.rgb,c=e.accentRgb,a=e.doneRgb,i=e.hex,d=e.accentHex,s=e.doneHex,r=(()=>{const g=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const v=k=>Math.min(255,k+80);return`#${[1,2,3].map(k=>v(parseInt(g[k],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const g=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const v=k=>Math.min(255,k+60);return`#${[1,2,3].map(k=>v(parseInt(g[k],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),x=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,C=p?parseInt(p[1],16)/x:0,G=p?parseInt(p[2],16)/x:1,h=p?parseInt(p[3],16)/x:.25,o=g=>`${Math.round(C*g)}, ${Math.round(G*g)}, ${Math.round(h*g)}`;return`
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
    background: rgba(${o(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${o(180)},0.05),
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
            0 0 200px rgba(${o(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${o(180)},0.08),
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
    background: ${i};
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

.nf-term-active .nf-term-prefix { color: ${i}; text-shadow: 0 0 6px rgba(${t},0.4); }

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
    left: 0;
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
    background: linear-gradient(180deg, rgba(${o(6)},0.75) 0%, rgba(${o(3)},0.92) 100%);
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
    background: rgba(${o(8)}, 0.88);
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
    color: ${i};
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
    background: ${i};
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
    background: linear-gradient(90deg, ${i}, ${r});
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
    background: linear-gradient(90deg, ${i}, ${d});
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
    background: rgba(${o(8)},0.8);
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
    bottom: 20px;
    right: 20px;
    z-index: 999998;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid rgba(${t},0.5);
    background: rgba(${o(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${i};
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
    color: ${i};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${i};
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

    `}function Nt(){lt||(lt=document.createElement("style"),lt.id="netflow-overlay-styles",lt.textContent=ne(j),document.head.appendChild(lt))}function zt(e){e.innerHTML="",Y.forEach((t,c)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${t.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${c+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(a)})}function oe(){const e=document.getElementById("nf-terminal");if(!e)return;zt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${Y.length}`)}function ie(e,t){let r="";for(let u=0;u<32;u++){const b=u/32*Math.PI*2,P=(u+.2)/32*Math.PI*2,_=(u+.5)/32*Math.PI*2,E=(u+.8)/32*Math.PI*2,w=(u+1)/32*Math.PI*2;r+=`${u===0?"M":"L"}${(120+104*Math.cos(b)).toFixed(1)},${(120+104*Math.sin(b)).toFixed(1)} `,r+=`L${(120+104*Math.cos(P)).toFixed(1)},${(120+104*Math.sin(P)).toFixed(1)} `,r+=`L${(120+116*Math.cos(_)).toFixed(1)},${(120+116*Math.sin(_)).toFixed(1)} `,r+=`L${(120+104*Math.cos(E)).toFixed(1)},${(120+104*Math.sin(E)).toFixed(1)} `,r+=`L${(120+104*Math.cos(w)).toFixed(1)},${(120+104*Math.sin(w)).toFixed(1)} `}r+="Z";const l=24,p=100,x=90;let C="";for(let u=0;u<l;u++){const b=u/l*Math.PI*2,P=(u+.25)/l*Math.PI*2,_=(u+.75)/l*Math.PI*2,E=(u+1)/l*Math.PI*2;C+=`${u===0?"M":"L"}${(120+x*Math.cos(b)).toFixed(1)},${(120+x*Math.sin(b)).toFixed(1)} `,C+=`L${(120+p*Math.cos(P)).toFixed(1)},${(120+p*Math.sin(P)).toFixed(1)} `,C+=`L${(120+p*Math.cos(_)).toFixed(1)},${(120+p*Math.sin(_)).toFixed(1)} `,C+=`L${(120+x*Math.cos(E)).toFixed(1)},${(120+x*Math.sin(E)).toFixed(1)} `}C+="Z";let G="";for(let u=0;u<64;u++){const b=u/64*Math.PI*2,P=u%4===0?117:119,_=u%4===0?124:122,E=u%4===0?.8:.4,w=u%4===0?.7:.35;G+=`<line x1="${(120+P*Math.cos(b)).toFixed(1)}" y1="${(120+P*Math.sin(b)).toFixed(1)}" x2="${(120+_*Math.cos(b)).toFixed(1)}" y2="${(120+_*Math.sin(b)).toFixed(1)}" stroke="rgba(${e},${w})" stroke-width="${E}"/>`}const h=26,o=78,g=68;let v="";for(let u=0;u<h;u++){const b=u/h*Math.PI*2,P=(u+.2)/h*Math.PI*2,_=(u+.5)/h*Math.PI*2,E=(u+.8)/h*Math.PI*2,w=(u+1)/h*Math.PI*2;v+=`${u===0?"M":"L"}${(120+g*Math.cos(b)).toFixed(1)},${(120+g*Math.sin(b)).toFixed(1)} `,v+=`L${(120+g*Math.cos(P)).toFixed(1)},${(120+g*Math.sin(P)).toFixed(1)} `,v+=`L${(120+o*Math.cos(_)).toFixed(1)},${(120+o*Math.sin(_)).toFixed(1)} `,v+=`L${(120+g*Math.cos(E)).toFixed(1)},${(120+g*Math.sin(E)).toFixed(1)} `,v+=`L${(120+g*Math.cos(w)).toFixed(1)},${(120+g*Math.sin(w)).toFixed(1)} `}v+="Z";let k="";for(let u=0;u<48;u++){const b=u/48*Math.PI*2,P=u%4===0?79:80,_=u%4===0?85:83,E=u%4===0?.6:.3,w=u%4===0?.6:.3;k+=`<line x1="${(120+P*Math.cos(b)).toFixed(1)}" y1="${(120+P*Math.sin(b)).toFixed(1)}" x2="${(120+_*Math.cos(b)).toFixed(1)}" y2="${(120+_*Math.sin(b)).toFixed(1)}" stroke="rgba(${t},${w})" stroke-width="${E}"/>`}function y(u,b,P,_,E){let w="";for(let $=0;$<P;$++){const T=$/P*Math.PI*2,M=($+.25)/P*Math.PI*2,F=($+.75)/P*Math.PI*2,N=($+1)/P*Math.PI*2;w+=`${$===0?"M":"L"}${(u+E*Math.cos(T)).toFixed(1)},${(b+E*Math.sin(T)).toFixed(1)} `,w+=`L${(u+_*Math.cos(M)).toFixed(1)},${(b+_*Math.sin(M)).toFixed(1)} `,w+=`L${(u+_*Math.cos(F)).toFixed(1)},${(b+_*Math.sin(F)).toFixed(1)} `,w+=`L${(u+E*Math.cos(N)).toFixed(1)},${(b+E*Math.sin(N)).toFixed(1)} `}return w+"Z"}const S=42,L=[],I=y(120,120,14,18,13);L.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${I}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let u=0;u<8;u++){const b=u/8*Math.PI*2,P=120+S*Math.cos(b),_=120+S*Math.sin(b),w=y(P,_,10,14,10),$=u%2===0?"":"animation-direction:reverse;";L.push(`<g class="nf-kinetic-sub" style="transform-origin:${P.toFixed(1)}px ${_.toFixed(1)}px;${$}">
            <path d="${w}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${P.toFixed(1)}" cy="${_.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${P.toFixed(1)}" cy="${_.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const f=L.join(`
`);let B="";for(let u=0;u<8;u++){const b=u/8*Math.PI*2,P=120+10*Math.cos(b),_=120+10*Math.sin(b),E=120+(S-10)*Math.cos(b),w=120+(S-10)*Math.sin(b);B+=`<line x1="${P.toFixed(1)}" y1="${_.toFixed(1)}" x2="${E.toFixed(1)}" y2="${w.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        ${G}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${r}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${C}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${x}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${v}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${k}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${t},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${B}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${f}
        </g>
    </svg>`}function ae(){const e=document.createElement("div");e.id="netflow-engine-overlay",at=document.createElement("canvas"),at.id="nf-matrix-canvas",e.appendChild(at);const t=document.createElement("div");t.className="nf-pat-data",e.appendChild(t);const c=document.createElement("div");c.className="nf-center-glow",e.appendChild(c);const a=document.createElement("div");a.className="nf-pat-noise",e.appendChild(a);const i=document.createElement("div");i.className="nf-vignette",e.appendChild(i);for(let k=0;k<3;k++){const y=document.createElement("div");y.className="nf-pulse-ring",e.appendChild(y)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const y=document.createElement("div");y.className=`nf-corner-deco ${k}`,e.appendChild(y)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Tt(),e.appendChild(d);const s=document.createElement("div");s.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const l=document.createElement("div");l.className="nf-core-header",l.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,r.appendChild(l);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",zt(p),r.appendChild(p);const x=document.createElement("div");x.className="nf-engine-core",x.id="nf-engine-core";const C=document.createElement("div");C.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const y=document.createElement("div");y.className=`nf-frame-corner ${k}`,C.appendChild(y)}),x.appendChild(C);const G="http://www.w3.org/2000/svg",h=document.createElementNS(G,"svg");h.setAttribute("class","nf-engine-waves"),h.setAttribute("viewBox","0 0 560 140"),h.setAttribute("preserveAspectRatio","none"),h.id="nf-engine-waves";for(let k=0;k<6;k++){const y=document.createElementNS(G,"path");y.setAttribute("fill","none"),y.setAttribute("stroke-width",k<3?"1.5":"1"),y.setAttribute("stroke",k<3?`rgba(${j.rgb},${.12+k*.08})`:`rgba(${j.accentRgb},${.08+(k-3)*.06})`),y.setAttribute("data-wave-idx",String(k)),h.appendChild(y)}x.appendChild(h);const o=document.createElement("div");o.className="nf-engine-brand-inner",o.innerHTML=`
        <div class="nf-brand-gear-icon">
            ${ie(j.rgb,j.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
    `,x.appendChild(o);const g=document.createElement("div");g.className="nf-engine-stats",g.id="nf-engine-stats",g.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,y,S])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${y}">${S}</span></div>`).join(""),x.appendChild(g),r.appendChild(x),s.appendChild(r);const v=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];wt.forEach((k,y)=>{const S=re(k);S.classList.add(v[y]),S.id=`nf-mod-${k.id}`,s.appendChild(S)}),e.appendChild(s);for(let k=0;k<30;k++){const y=document.createElement("div");y.className="nf-particle",y.style.left=`${5+Math.random()*90}%`,y.style.bottom=`${Math.random()*40}%`,y.style.animationDuration=`${3+Math.random()*5}s`,y.style.animationDelay=`${Math.random()*4}s`;const S=.3+Math.random()*.4,L=.7+Math.random()*.3;y.style.background=`rgba(${Math.floor(nt*L)}, ${Math.floor(ot*L)}, ${Math.floor(it*L)}, ${S})`,y.style.width=`${1+Math.random()*2}px`,y.style.height=y.style.width,e.appendChild(y)}return e}function re(e){const t=document.createElement("div");t.className="nf-module";const c=document.createElement("div");c.className="nf-mod-header",c.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(c),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,t.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a),t}function se(){Ot=Date.now(),$t=setInterval(()=>{const e=Math.floor((Date.now()-Ot)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),c=String(e%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${t}:${c}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${t}:${c}`)},1e3)}function Ht(){$t&&(clearInterval($t),$t=null)}const le=220,Pt=210,qt=.4;let xt=[];function ce(e,t){xt=[];for(let c=0;c<le;c++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const d=Math.random()*e,s=Math.random()*t,r=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);xt.push({x:i===0?Math.random()*e:d+Math.cos(l)*r,y:i===0?Math.random()*t:s+Math.sin(l)*r,vx:(Math.random()-.5)*qt,vy:(Math.random()-.5)*qt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:s,oRadius:r,oAngle:l,oSpeed:p})}}function de(){if(!at)return;const e=at;if(ht=e.getContext("2d"),!ht)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,xt.length===0&&ce(e.width,e.height)};t(),window.addEventListener("resize",t);let c=null,a=0,i=0;function d(){if(!ht||!at){bt=null;return}bt=requestAnimationFrame(d);const s=ht,r=at.width,l=at.height;s.fillStyle=`rgba(${nt*.04|0},${ot*.04|0},${it*.06|0},1)`,s.fillRect(0,0,r,l),(!c||a!==r||i!==l)&&(a=r,i=l,c=s.createRadialGradient(r*.5,l*.5,0,r*.5,l*.5,Math.max(r,l)*.6),c.addColorStop(0,`rgba(${nt*.08|0},${ot*.08|0},${it*.1|0},0.4)`),c.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=c,s.fillRect(0,0,r,l);const p=xt,x=p.length,C=Pt*Pt;for(let h=0;h<x;h++){const o=p[h];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>r&&(o.x=r,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>l&&(o.y=l,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const g=o.oAngle,v=o.oRadius*.7;o.x=o.oCx+v*Math.cos(g),o.y=o.oCy+v*Math.sin(g)*Math.cos(g),o.oCx+=Math.sin(g*.15)*.12,o.oCy+=Math.cos(g*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const g=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*g,o.y=o.oCy+Math.sin(o.oAngle)*g,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=r+30:o.x>r+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const g=o.oRadius+50;o.oCx<-g?o.oCx=r+g:o.oCx>r+g&&(o.oCx=-g),o.oCy<-g?o.oCy=l+g:o.oCy>l+g&&(o.oCy=-g)}}const G=5;for(let h=0;h<G;h++){const o=h/G,g=(h+1)/G,v=((o+g)*.5*.35).toFixed(3);s.beginPath(),s.strokeStyle=`rgba(${nt},${ot},${it},${v})`,s.lineWidth=(o+g)*.5*1.2;for(let k=0;k<x;k++){const y=p[k];for(let S=k+1;S<x;S++){const L=p[S],I=y.x-L.x,f=y.y-L.y,B=I*I+f*f;if(B<C){const u=1-Math.sqrt(B)/Pt;u>=o&&u<g&&(s.moveTo(y.x,y.y),s.lineTo(L.x,L.y))}}}s.stroke()}s.save(),s.shadowColor=`rgba(${nt},${ot},${it},0.8)`,s.shadowBlur=25;for(let h=0;h<x;h++){const o=p[h],g=.6+.4*Math.sin(o.pulsePhase),v=o.radius*(.8+g*.4),k=nt+(255-nt)*.7*g|0,y=ot+(255-ot)*.7*g|0,S=it+(255-it)*.7*g|0;s.beginPath(),s.arc(o.x,o.y,v,0,Math.PI*2),s.fillStyle=`rgba(${k},${y},${S},${(.6+g*.4).toFixed(2)})`,s.fill()}s.restore(),s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<x;h++){const o=p[h];if(o.radius>2){const g=.6+.4*Math.sin(o.pulsePhase),v=o.radius*(.8+g*.4)*.35;s.moveTo(o.x+v,o.y),s.arc(o.x,o.y,v,0,Math.PI*2)}}s.fill(),s.fillStyle=`rgba(${nt},${ot},${it},0.08)`;for(let h=0;h<6;h++)s.fillRect(Math.random()*r,Math.random()*l,1,1)}d()}function pe(){bt!==null&&(cancelAnimationFrame(bt),bt=null),at=null,ht=null,xt=[]}function Vt(){mt=requestAnimationFrame(Vt),Mt+=.035;const e=document.getElementById("nf-engine-waves");if(!e){mt=null;return}const t=560,c=140,a=t/2;e.querySelectorAll("path").forEach(d=>{const s=parseInt(d.getAttribute("data-wave-idx")||"0",10),r=10+s*5,l=1.2+s*.35,p=s*.6,x=.7+s*.12;let C=`M 0 ${c/2}`;for(let G=0;G<=t;G+=3){const h=Math.abs(G-a)/a,o=Math.pow(Math.min(1,h*1.6),.6),g=c/2+r*o*Math.sin(G/t*l*Math.PI*2+Mt*x+p);C+=` L ${G} ${Math.round(g*10)/10}`}d.setAttribute("d",C)})}function fe(){Mt=0,Vt(),de(),Et=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),c=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),c&&(c.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Ut(){mt!==null&&(cancelAnimationFrame(mt),mt=null),Et&&(clearInterval(Et),Et=null),pe()}function St(){let e=0;const t=Y.filter(r=>r.status!=="skipped").length;for(const r of Y){const l=document.getElementById(`nf-proc-${r.stepId}`);if(!l)continue;l.className="nf-proc-row";const p=l.querySelector(".nf-proc-badge");switch(r.status){case"done":l.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),e++;break;case"active":l.classList.add("nf-proc-active"),p&&(p.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const c=document.getElementById("nf-step-counter");c&&(c.textContent=`${e}/${Y.length}`);const a=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(a&&(a.textContent="COMPLETE",a.style.color=j.doneHex),i&&(i.style.background=j.doneHex,i.style.boxShadow=`0 0 8px rgba(${j.doneRgb},0.7)`)):Y.some(l=>l.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(l=>l.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=j.hex,a.style.textShadow=`0 0 10px rgba(${j.rgb},0.5)`);const d=document.getElementById("nf-terminal"),s=d==null?void 0:d.querySelector(".nf-proc-active");s&&d&&s.scrollIntoView({behavior:"smooth",block:"center"})}function Wt(){V||(Nt(),V=document.createElement("button"),V.id="nf-toggle-btn",V.className="nf-toggle-hidden",V.innerHTML="⚡",V.title="เปิด Netflow Overlay",V.onclick=()=>Tt(),document.body.appendChild(V))}function Tt(){X&&(Wt(),pt?(X.classList.remove("nf-hidden"),X.classList.add("nf-visible"),V&&(V.classList.remove("nf-toggle-visible"),V.classList.add("nf-toggle-hidden")),pt=!1):(X.classList.remove("nf-visible"),X.classList.add("nf-hidden"),V&&(V.classList.remove("nf-toggle-hidden"),V.classList.add("nf-toggle-visible")),pt=!0))}const Yt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Xt(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=gt;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const c=Yt[t]||Yt.red;let a;try{a=chrome.runtime.getURL(c)}catch{a=`/${c}`}const i=j.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${i},0.45)`,e.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function At(){if(j=ee(),Gt(),X){pt&&Tt();return}lt&&(lt.remove(),lt=null),Nt(),kt=1,Y=It(1),X=ae(),document.body.appendChild(X),pt=!1,Wt(),se(),fe(),requestAnimationFrame(()=>Xt())}function ue(){Ht(),Ut(),pt=!1,X&&(X.classList.add("nf-fade-out"),setTimeout(()=>{X==null||X.remove(),X=null},500)),V&&(V.remove(),V=null)}const ge={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function me(e,t,c){const a=Y.filter(r=>r.status==="done").length,i=Y.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${a}/${i}`);const s=document.getElementById("nf-stat-scenes");if(s&&(s.textContent=kt>1?`1/${kt}`:"1/1"),t==="active"){const r=document.getElementById("nf-stat-status"),l=ge[e]||e.toUpperCase();r&&(r.textContent=l)}else if(t==="done"&&a>=i){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(t==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}if(c!==void 0&&c>0){const r=document.getElementById("nf-stat-progress");r&&(r.textContent=`${Math.min(100,c)}%`)}}function D(e,t,c){if(!X)return;for(const i of wt)for(const d of i.steps)d.id===e&&(d.status=t,c!==void 0&&(d.progress=c));for(const i of Y)i.stepId===e&&(i.status=t,c!==void 0&&(i.progress=c));const a=document.getElementById(`nf-step-${e}`);if(a&&(a.className="nf-step",t==="active"?a.classList.add("nf-step-active"):t==="done"?a.classList.add("nf-step-done"):t==="error"&&a.classList.add("nf-step-error")),me(e,t,c),c!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,c)}%`)}Bt(),St()}function ft(e){D(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function _t(e=4e3){Ht(),Ut(),Bt(),St(),setTimeout(()=>ue(),e)}function Bt(){for(const e of wt){const t=e.steps.filter(l=>l.status!=="skipped").length,c=e.steps.filter(l=>l.status==="done").length,a=e.steps.some(l=>l.status==="active"),i=t>0?Math.round(c/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${i}%`);const s=document.getElementById(`nf-modbar-${e.id}`);s&&(s.style.width=`${i}%`);const r=document.getElementById(`nf-mod-${e.id}`);r&&(r.classList.remove("nf-active","nf-done"),i>=100?r.classList.add("nf-done"):a&&r.classList.add("nf-active"))}}function he(e){var a,i,d,s;kt=e;const t=new Map;for(const r of Y)t.set(r.stepId,{status:r.status,progress:r.progress});Y=It(e);for(const r of Y){const l=t.get(r.stepId);l&&(r.status=l.status,l.progress!==void 0&&(r.progress=l.progress))}if(oe(),e>1){const r=wt.find(l=>l.id==="video");if(r){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=r.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=r.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=r.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=r.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});r.steps=l,jt(r)}}const c=wt.find(r=>r.id==="render");if(c&&e>1){const r=c.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const l=c.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),jt(c)}Bt(),St()}function jt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,t.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a)}function Kt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Kt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},A=e=>{console.warn(`[Netflow AI] ${e}`);try{Kt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},Ft=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Rt=/Win/i.test(navigator.userAgent),ut=Ft?"🍎 Mac":Rt?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ut}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),a=Math.round(e.clientX),i=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${a},${i}) → <${c}> "${d}"`)},!0);const m=e=>new Promise(t=>setTimeout(t,e));function ct(){return!!window.__NETFLOW_STOP__}function Jt(){var a;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of c){if(t&&t.contains(i))continue;const d=(i.textContent||"").trim().toLowerCase();if(!(d.length>200||d.length<5)){for(const s of e)if(d.includes(s))return((a=i.textContent)==null?void 0:a.trim())||s}}return null}async function Q(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,a=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:c,clientY:a,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),await m(50),e.click()}function be(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,a=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:c,clientY:a};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function we(e){const t=[],c=document.querySelectorAll("i");for(const a of c){if((a.textContent||"").trim()!==e)continue;let d=a,s=null,r=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const x=p.width*p.height;x<r&&(s=d,r=x)}}s&&!t.includes(s)&&t.push(s)}return t.sort((a,i)=>{const d=a.getBoundingClientRect(),s=i.getBoundingClientRect();return d.left-s.left}),t}function Dt(e=!1){const t=[],c=document.querySelectorAll("video");for(const s of c){let r=s.parentElement;for(let l=0;l<10&&r;l++){const p=r.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:r,left:p.left});break}r=r.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of a){const r=(s.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let l=s.parentElement;for(let p=0;p<10&&l;p++){const x=l.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){t.push({el:l,left:x.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const s of i){const r=(s.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let l=s.parentElement;for(let p=0;p<10&&l;p++){const x=l.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){t.push({el:l,left:x.left});break}l=l.parentElement}}}const d=Array.from(new Set(t.map(s=>s.el))).map(s=>t.find(r=>r.el===s));if(d.sort((s,r)=>s.left-r.left),d.length>0){const s=d[0].el,r=s.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),s}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function xe(){const e=we("image");if(e.length>0){const c=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const c of t){let a=c.parentElement;for(let i=0;i<10&&a;i++){const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function ye(e,t){var r;const[c,a]=e.split(","),i=((r=c.match(/:(.*?);/))==null?void 0:r[1])||"image/png",d=atob(a),s=new Uint8Array(d.length);for(let l=0;l<d.length;l++)s[l]=d.charCodeAt(l);return new File([s],t,{type:i})}function yt(e){var a;const t=[],c=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of c)if(((a=i.textContent)==null?void 0:a.trim())===e){const d=i.closest("button");d&&t.push(d)}return t}function ve(){const e=[...yt("add"),...yt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const s=(i.textContent||"").trim();if(s==="+"||s==="add")return i}}return null}let t=null,c=0;for(const a of e){const i=a.getBoundingClientRect();i.y>c&&(c=i.y,t=a)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${c.toFixed(0)}`),t}function Zt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=yt(a);let d=null,s=0;for(const r of i){const l=r.getBoundingClientRect();l.y>s&&(s=l.y,d=r)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${s.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,c=0;for(const a of e){const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,s=i.y+i.x+(d?1e3:0);s>c&&(c=s,t=a)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const a of e){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function Qt(){const e=document.querySelectorAll("textarea");for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const t=document.querySelectorAll('[contenteditable="true"]');for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of c){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return e.length>0?e[e.length-1]:null}async function Lt(e,t){var c,a,i,d;e.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(l),await m(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await m(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(s);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(r),await m(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await m(200);const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});e.dispatchEvent(r),await m(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((c=navigator.clipboard)!=null&&c.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=t,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await m(200),document.execCommand("paste"),await m(500);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(e).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(s){let r=e[s];for(let l=0;l<30&&r;l++){const p=r.memoizedProps,x=r.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const C=p.editor;C.selection,C.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=x==null?void 0:x.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),x.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function $e(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const c of t)e.push({input:c,origType:"file"}),c.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function Ee(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ut})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ut})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function ke(e,t,c){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(x=>x.input)];for(const x of a)!i.includes(x)&&x.offsetParent===null&&i.push(x);for(const x of i)x.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ut})`),!1;let s;if(c&&c.size>0){const x=Array.from(d).filter(C=>!c.has(C));x.length>0?(s=x[x.length-1],n(`เล็งเป้า file input ใหม่ (${x.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const r=new DataTransfer;r.items.add(t);try{s.files=r.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(x){n(`กำหนด target.files ล้มเหลว: ${x.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:r.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(C){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${C.message}`),!1}}const l=s._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const x=new DataTransfer;x.items.add(t);const C=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:x});s.dispatchEvent(C),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ut}`),!0}function vt(){let e=0;const t=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("img");for(const i of c){if(t&&t.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.src&&i.offsetParent!==null&&e++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const i of a){if(t&&t.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.offsetParent!==null&&e++}return e}async function te(e,t){var x;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const c=ye(e,t);n(`ขนาดไฟล์: ${(c.size/1024).toFixed(1)} KB`);const a=vt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async(C,G=8e3)=>{const h=Date.now();for(;Date.now()-h<G;){const o=vt();if(o>a)return n(`✅ [${C}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${o}`),!0;await m(500)}return n(`⚠️ [${C}] รูปย่อไม่เพิ่ม (ยังคง ${vt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=ve();if(!d)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const r=Ee();let l=$e();const p=new MutationObserver(C=>{for(const G of C)for(const h of G.addedNodes)if(h instanceof HTMLInputElement&&h.type==="file"&&(h.type="text",l.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),h instanceof HTMLElement){const o=h.querySelectorAll('input[type="file"]');for(const g of o)g.type="text",l.push({input:g,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let C=!1;const G=Date.now();for(;!C&&Date.now()-G<5e3;){const o=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const g of o){if(g===d)continue;const v=g.querySelectorAll("i");for(const k of v){const y=((x=k.textContent)==null?void 0:x.trim())||"";if((y==="upload"||y==="upload_file")&&!Array.from(g.querySelectorAll("i")).map(L=>{var I;return(I=L.textContent)==null?void 0:I.trim()}).includes("drive_folder_upload")){g.click(),C=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${y}) ✅`);break}}if(C)break}if(!C)for(const g of o){if(g===d)continue;const v=g.childNodes.length<=5?(g.textContent||"").trim():"";if(v.length>0&&v.length<40){const k=v.toLowerCase();if(k==="upload"||k==="อัปโหลด"||k==="อัพโหลด"||k.includes("upload image")||k.includes("upload photo")||k.includes("อัปโหลดรูปภาพ")||k.includes("อัพโหลดรูปภาพ")||k.includes("from computer")||k.includes("จากคอมพิวเตอร์")){g.click(),C=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${v}") ✅`);break}}}C||await m(500)}return C?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),ke(l,c,s)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),r();for(const C of l)C.input.type!=="file"&&(C.input.type="file")}}async function Ce(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const c=document.querySelectorAll("button");let a=null;for(const h of c){const o=h.textContent||"";if((o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))&&h.getBoundingClientRect().bottom>window.innerHeight*.7){a=h,n(`พบปุ่มตั้งค่าจากข้อความ: "${o.substring(0,30).trim()}"`);break}}if(!a)for(const h of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const o=yt(h);for(const g of o)if(g.getBoundingClientRect().bottom>window.innerHeight*.7){a=g,n(`พบปุ่มตั้งค่าจากไอคอน: ${h}`);break}if(a)break}if(!a)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2,r={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let l=!1,p=null;const x=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const h of x){const o=h.getAttribute("aria-controls")||"",g=h.id||"";if(o.toUpperCase().includes("IMAGE")||g.toUpperCase().includes("IMAGE")){p=h,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const h of document.querySelectorAll('[role="tab"]')){const o=h.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=h,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const h of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const o=(h.textContent||"").trim();if((o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ")&&!o.includes("Video")&&!o.includes("วิดีโอ")){p=h,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}if(p){const h=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(h==="active"||o==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const g=p.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const C=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const h of document.querySelectorAll("button, [role='tab'], [role='option']")){const o=(h.textContent||"").trim();if(o===C||o.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const g=h.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),h.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",v)),h.dispatchEvent(new MouseEvent("click",v)),n(`เลือกทิศทาง: ${C}`),await m(400);break}}const G=`x${t}`;for(const h of document.querySelectorAll("button, [role='tab'], [role='option']"))if((h.textContent||"").trim()===G){const g=h.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),h.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",v)),h.dispatchEvent(new MouseEvent("click",v)),n(`เลือกจำนวน: ${G}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function Me(e){var y,S,L,I;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,c=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=c?c[1]:"unknown",i=Ft?"macOS":Rt?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=Ft?((S=(y=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:y[1])==null?void 0:S.replace(/_/g,"."))||"":Rt&&((L=t.match(/Windows NT ([0-9.]+)/))==null?void 0:L[1])||"",s=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${r} | แพลตฟอร์ม: ${ut}`),n("══════════════════════════════════════════");try{Ct(e.theme)}catch{}try{At()}catch(f){console.warn("Overlay show error:",f)}const l=[],p=[];try{D("settings","active");const f=e.orientation||"horizontal",B=e.outputCount||1,u=await Ce(f,B);l.push(u?"✅ Settings":"⚠️ Settings"),D("settings",u?"done":"error")}catch(f){A(`ตั้งค่าผิดพลาด: ${f.message}`),l.push("⚠️ Settings"),D("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const x=()=>{const f=document.querySelectorAll("span, div, p, label");for(const B of f){const u=(B.textContent||"").trim();if(/^\d{1,3}%$/.test(u)){if(u==="100%")return null;const b=B.getBoundingClientRect();if(b.width>0&&b.height>0&&b.top>0&&b.top<window.innerHeight)return u}}return null},C=async f=>{n(`รอการอัพโหลด ${f} เสร็จ...`),await m(2e3);const B=Date.now(),u=6e4;let b="",P=Date.now();const _=15e3;for(;Date.now()-B<u;){const E=x();if(E){if(E!==b)b=E,P=Date.now();else if(Date.now()-P>_){n(`✅ อัพโหลด ${f} — % ค้างที่ ${E} นาน ${_/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${E} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${f} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}A(`⚠️ อัพโหลด ${f} หมดเวลาหลัง ${u/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){D("upload-char","active");try{const f=await te(e.characterImage,"character.png");l.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||p.push("character upload failed"),D("upload-char",f?"done":"error")}catch(f){A(`อัพโหลดตัวละครผิดพลาด: ${f.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),D("upload-char","error")}await C("character")}else ft("upload-char");if(e.productImage){D("upload-prod","active");try{const f=await te(e.productImage,"product.png");l.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||p.push("product upload failed"),D("upload-prod",f?"done":"error")}catch(f){A(`อัพโหลดสินค้าผิดพลาด: ${f.message}`),l.push("❌ สินค้า"),p.push("product upload error"),D("upload-prod","error")}await C("product")}else ft("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const G=x();G&&(n(`⚠️ อัพโหลดยังแสดง ${G} — รอเพิ่มเติม...`),await C("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const h=(e.characterImage?1:0)+(e.productImage?1:0);if(h>0){let f=vt();f<h&&(n(`⏳ เห็นรูปย่อแค่ ${f}/${h} — รอ 3 วินาที...`),await m(3e3),f=vt()),f>=h?n(`✅ ยืนยันรูปย่ออ้างอิง: ${f}/${h}`):A(`⚠️ คาดว่าจะมี ${h} รูปย่อ แต่พบ ${f} — ดำเนินการต่อ`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{_t(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),D("img-prompt","active"),await m(1e3);const o=Qt();o?(await Lt(o,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),D("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),D("img-prompt","error")),await m(800);const g=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&g.add(f.src)}),n(`บันทึกรูปเดิม: ${g.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),D("img-generate","active"),await m(500);const v=Zt();if(v){const f=v.getBoundingClientRect(),B=f.left+f.width/2,u=f.top+f.height/2,b={bubbles:!0,cancelable:!0,clientX:B,clientY:u,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",b)),await m(80),v.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",b)),v.dispatchEvent(new MouseEvent("click",b)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await m(500),v.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",b)),await m(80),v.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",b)),v.dispatchEvent(new MouseEvent("click",b)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),D("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),D("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),D("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const f=document.getElementById("netflow-engine-overlay"),B=()=>{const E=document.querySelectorAll("div, span, p, label, strong, small");for(const w of E){if(f&&f.contains(w))continue;const $=(w.textContent||"").trim();if($.length>10)continue;const T=$.match(/(\d{1,3})\s*%/);if(!T)continue;const M=parseInt(T[1],10);if(M<1||M>100)continue;const F=w.getBoundingClientRect();if(!(F.width===0||F.width>150)&&!(F.top<0||F.top>window.innerHeight))return M}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let u=null,b=-1,P=0;const _=Date.now();for(;!u&&Date.now()-_<18e4;){const E=document.querySelectorAll("img");for(const w of E){if(g.has(w.src)||!(w.alt||"").toLowerCase().includes("generated"))continue;const T=w.getBoundingClientRect();if(T.width>120&&T.height>120&&T.top>0&&T.top<window.innerHeight*.85){const M=w.closest("div");if(M){u=M,n(`พบรูป AI จาก alt="${w.alt}": ${w.src.substring(0,80)}...`);break}}}if(!u)for(const w of E){if(g.has(w.src))continue;const $=w.closest("div"),T=($==null?void 0:$.textContent)||"";if(T.includes("product.png")||T.includes("character.png")||T.includes(".png")||T.includes(".jpg"))continue;const M=w.getBoundingClientRect();if(M.width>120&&M.height>120&&M.top>0&&M.top<window.innerHeight*.85){const F=w.closest("div");if(F){u=F,n(`พบรูปใหม่ (สำรอง): ${w.src.substring(0,80)}...`);break}}}if(!u){if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const w=Jt();if(w){A(`❌ สร้างรูปล้มเหลว: ${w}`),p.push(`image gen failed: ${w}`),D("img-wait","error");break}const $=B();$!==null?($!==b&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${$}%`),b=$,D("img-wait","active",$)),P=Date.now()):b>30&&Math.floor((Date.now()-P)/1e3)>=3&&n(`🖼️ % หายที่ ${b}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!u)A("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),D("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),D("img-wait","done",100);const E=u.getBoundingClientRect(),w=E.left+E.width/2,$=E.top+E.height/2,T={bubbles:!0,cancelable:!0,clientX:w,clientY:$};u.dispatchEvent(new PointerEvent("pointerenter",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseenter",T)),u.dispatchEvent(new PointerEvent("pointerover",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseover",T)),u.dispatchEvent(new PointerEvent("pointermove",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousemove",T)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let M=null;for(const F of["more_vert","more_horiz","more"]){const N=yt(F);for(const q of N){const H=q.getBoundingClientRect();if(H.top>=E.top-20&&H.top<=E.bottom&&H.right>=E.right-150&&H.right<=E.right+20){M=q;break}}if(M)break}if(!M){const F=document.querySelectorAll("button");for(const N of F){const q=N.getBoundingClientRect();if(q.width<50&&q.height<50&&q.top>=E.top-10&&q.top<=E.top+60&&q.left>=E.right-80){const H=N.querySelectorAll("i");for(const K of H)if((((I=K.textContent)==null?void 0:I.trim())||"").includes("more")){M=N;break}if(M)break;const z=N.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){M=N;break}}}}if(!M)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const F=M.getBoundingClientRect(),N=F.left+F.width/2,q=F.top+F.height/2,H={bubbles:!0,cancelable:!0,clientX:N,clientY:q,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",H)),await m(80),M.dispatchEvent(new PointerEvent("pointerup",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",H)),M.dispatchEvent(new MouseEvent("click",H)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let z=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of K){const J=(U.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){z=U;break}}if(!z)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const U=z.getBoundingClientRect(),J=U.left+U.width/2,rt=U.top+U.height/2,O={bubbles:!0,cancelable:!0,clientX:J,clientY:rt,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",O)),await m(80),z.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",O)),z.dispatchEvent(new MouseEvent("click",O)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),D("animate","done"),await m(3e3)}}}}catch(f){A(`ขั้น 4 ผิดพลาด: ${f.message}`),l.push("⚠️ Animate")}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{_t(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),D("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let f=!1;const B=document.querySelectorAll("button, span, div");for(const P of B){const _=(P.textContent||"").trim(),E=P.getBoundingClientRect();if((_==="วิดีโอ"||_==="Video"||_.includes("วิดีโอ"))&&E.bottom>window.innerHeight*.7){f=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}f||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const u=Qt();u?(await Lt(u,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),D("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),p.push("video prompt input not found"),D("vid-prompt","error")),await m(1e3),D("vid-generate","active");const b=Zt();if(b){const P=b.getBoundingClientRect(),_=P.left+P.width/2,E=P.top+P.height/2,w={bubbles:!0,cancelable:!0,clientX:_,clientY:E,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",w)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",w)),b.dispatchEvent(new MouseEvent("click",w)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),D("vid-generate","done"),await m(500),b.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",w)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",w)),b.dispatchEvent(new MouseEvent("click",w)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),D("vid-generate","error")}catch(f){A(`ขั้น 5 ผิดพลาด: ${f.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${f.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ft("animate"),ft("vid-prompt"),ft("vid-generate"),ft("vid-wait");if(e.videoPrompt){D("vid-wait","active");const f=e.sceneCount||1,B=e.videoScenePrompts||[e.videoPrompt];if(f>1)try{he(f)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${f>1?`ต่อ ${f} ฉาก`:"ดาวน์โหลด"} ===`);const u=document.getElementById("netflow-engine-overlay"),b=()=>{const E=document.querySelectorAll("div, span, p, label, strong, small");for(const w of E){if(u&&u.contains(w))continue;const $=(w.textContent||"").trim();if($.length>10)continue;const T=$.match(/(\d{1,3})\s*%/);if(!T)continue;const M=parseInt(T[1],10);if(M<1||M>100)continue;const F=w.getBoundingClientRect();if(!(F.width===0||F.width>150)&&!(F.top<0||F.top>window.innerHeight))return M}return null},P=async(E=6e5)=>{n("รอการสร้างวิดีโอ..."),D("vid-wait","active"),await m(5e3);const w=()=>{const O=document.querySelectorAll("div, span, p, label, strong, small");let R=0;for(const W of O){if(u&&u.contains(W))continue;const Z=(W.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const tt=W.tagName.toLowerCase(),dt=W.className&&typeof W.className=="string"?W.className.split(/\s+/).slice(0,2).join(" "):"",et=W.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${tt}.${dt}> ที่ (${et.left.toFixed(0)},${et.top.toFixed(0)}) w=${et.width.toFixed(0)}`),R++,R>=5)break}}R===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},$=Dt();n($?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),w();const T=Date.now();let M=-1,F=0,N=!1;for(;Date.now()-T<E;){const O=b();if(O!==null){if(O!==M&&(n(`ความคืบหน้าวิดีโอ: ${O}%`),M=O,D("vid-wait","active",O)),F=Date.now(),O>=100){n("✅ ตรวจพบ 100%!"),N=!0;break}}else if(M>30){const R=Math.floor((Date.now()-F)/1e3);if(R>=5){n(`✅ % หายไปที่ ${M}% (หาย ${R} วินาที) — วิดีโอเสร็จ!`),N=!0;break}n(`⏳ % หายที่ ${M}% — ยืนยันใน ${5-R} วินาที...`)}else{const R=Math.floor((Date.now()-T)/1e3);R%15<3&&n(`⏳ รอ... (${R} วินาที) ไม่พบ %`)}if(!N&&M>0&&Dt(!0)&&!$){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${M}% — วิดีโอเสร็จ!`),N=!0;break}if(ct())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(M<1){const R=Jt();if(R)return A(`❌ สร้างวิดีโอล้มเหลว: ${R}`),null}await m(3e3)}const q=Dt();if(!q)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),D("vid-wait","error"),null;const H=q;N?(D("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const z=H.getBoundingClientRect();let K=z.left+z.width/2,U=z.top+z.height/2,J=H;const rt=H.querySelector("video, img, canvas");if(rt){const O=rt.getBoundingClientRect();O.width>50&&O.height>50&&(K=O.left+O.width/2,U=O.top+O.height/2,J=rt,n(`🎯 พบรูปย่อ <${rt.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${U.toFixed(0)}) ${O.width.toFixed(0)}x${O.height.toFixed(0)}`))}else U=z.top+z.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${U.toFixed(0)})...`),be(J);for(let O=0;O<8;O++){const R={bubbles:!0,cancelable:!0,clientX:K+O%2,clientY:U};J.dispatchEvent(new PointerEvent("pointermove",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",R)),await m(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:f,scenePrompts:B,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${f} ฉาก, ${B.length} prompts, theme: ${e.theme})`)}catch(O){n(`⚠️ ไม่สามารถบันทึก pending action: ${O.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await _(H),J!==H&&await _(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},_=async E=>{const w=E.getBoundingClientRect(),$=w.left+w.width/2,T=w.top+w.height/2,M={bubbles:!0,cancelable:!0,clientX:$,clientY:T,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",M)),await m(80),E.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",M)),E.dispatchEvent(new MouseEvent("click",M)),await m(50),E.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{await P()?(l.push("✅ Video Complete"),D("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action")):(A("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),D("vid-wait","error"))}catch(E){A(`ขั้น 6 ผิดพลาด: ${E.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${E.message}`)}}const k=p.length===0;try{_t(k?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:k,message:k?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:k?"done":"partial"}}async function Ie(e,t=[],c){var k;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{c&&Ct(c)}catch{}try{At()}catch{}await m(1500);const a=(()=>{for(const y of document.querySelectorAll("button")){const S=y.querySelectorAll("i");for(const I of S){const f=(I.textContent||"").trim();if(f==="volume_up"||f==="volume_off"||f==="volume_mute"){const B=y.getBoundingClientRect();if(B.width>0&&B.height>0)return y}}const L=(y.getAttribute("aria-label")||"").toLowerCase();if(L.includes("mute")||L.includes("ปิดเสียง")){const I=y.getBoundingClientRect();if(I.width>0&&I.height>0)return y}}return null})();if(a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);const y=(w,$="button, [role='menuitem'], [role='option'], li, span, div[role='button'], div")=>{for(const T of document.querySelectorAll($)){const M=(T.textContent||"").trim();if(M.includes(w)&&M.length<100){const F=T.getBoundingClientRect();if(F.width>0&&F.height>0&&F.top>=0)return T}}return null};for(let w=2;w<=e;w++){const $=t[w-1];if(!$){A(`ไม่พบ prompt สำหรับฉากที่ ${w}`);continue}n(`── ฉากที่ ${w}/${e}: วาง prompt + generate ──`);let T=null;const M=Date.now();for(;!T&&Date.now()-M<1e4;){const R=document.querySelectorAll("[data-slate-editor='true']");if(R.length>0&&(T=R[R.length-1]),!T){const W=document.querySelectorAll("[role='textbox'][contenteditable='true']");W.length>0&&(T=W[W.length-1])}T||await m(1e3)}if(!T){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${T.tagName.toLowerCase()}> ${T.className.substring(0,40)}`),await Lt(T,$),n(`วาง prompt ฉาก ${w} (${$.length} ตัวอักษร) ✅`),await m(1e3);const F=T.getBoundingClientRect();let N=null,q=1/0;for(const R of document.querySelectorAll("button")){if(R.disabled)continue;const W=R.querySelectorAll("i");let Z=!1;for(const et of W)if((et.textContent||"").trim()==="arrow_forward"){Z=!0;break}if(!Z)continue;const tt=R.getBoundingClientRect();if(tt.width<=0||tt.height<=0)continue;const dt=Math.abs(tt.top-F.top)+Math.abs(tt.right-F.right);dt<q&&(q=dt,N=R)}if(!N)for(const R of document.querySelectorAll("button")){const W=R.querySelectorAll("i");for(const Z of W)if((Z.textContent||"").trim()==="arrow_forward"){const tt=R.getBoundingClientRect();if(tt.width>0&&tt.height>0){N=R;break}}if(N)break}if(!N){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(R=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene2_gen_and_download",theme:c}},()=>R())}),n("💾 บันทึก pending action: wait_scene2_gen_and_download (ป้องกันหน้า reload)"),await Q(N),n(`คลิก Generate ฉาก ${w} ✅`),n(`── รอวิดีโอฉาก ${w} gen เสร็จ ──`),await m(5e3);const H=document.getElementById("netflow-engine-overlay");let z=0,K=0;const U=Date.now(),J=6e5,rt=5e3;let O=!1;for(;Date.now()-U<J;){let R=null;const W=document.querySelectorAll("div, span, p, label, strong, small");for(const Z of W){if(H&&H.contains(Z))continue;const dt=(Z.textContent||"").trim().match(/^(\d{1,3})%$/);if(dt){const et=Z.getBoundingClientRect();if(et.width>0&&et.height>0&&et.width<120&&et.height<60){R=parseInt(dt[1],10);break}}}if(R!==null)R!==z&&(n(`🎬 ฉาก ${w} ความคืบหน้า: ${R}%`),z=R),K=0;else if(z>0){if(K===0)K=Date.now(),n(`🔍 ฉาก ${w}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-K>=rt){n(`✅ ฉาก ${w}: % หายไป ${rt/1e3} วินาที — เจนเสร็จ!`),O=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}O||A(`ฉาก ${w} หมดเวลา`),n(`✅ ฉาก ${w} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──"),await m(2e3);let S=null;const L=Date.now();for(;!S&&Date.now()-L<1e4;){for(const w of document.querySelectorAll("button, [role='button']")){const $=(w.textContent||"").trim().toLowerCase();if(($.includes("download")||$.includes("ดาวน์โหลด"))&&$.length<80){const T=w.getBoundingClientRect();if(T.width>0&&T.height>0){S=w;break}}}S||await m(1e3)}if(!S){A("ไม่พบปุ่มดาวน์โหลด");return}await Q(S),n("คลิกดาวน์โหลดแล้ว ✅"),await m(1500);const I=Date.now();let f=null;for(let w=0;w<3&&!f;w++){w>0&&n(`🔄 ลองหา 720p ครั้งที่ ${w+1}...`);let $=null;const T=Date.now();for(;!$&&Date.now()-T<5e3;)$=y("Full Video"),$||await m(500);if(!$){A("ไม่พบ Full Video");return}const M=$.getBoundingClientRect(),F=M.left+M.width/2,N=M.top+M.height/2;$.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:F,clientY:N})),$.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:N})),$.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F,clientY:N})),await Q($),n("คลิก/hover Full Video ✅"),await m(2e3);const q=Date.now();for(;!f&&Date.now()-q<8e3;)f=y("720p"),f||($.isConnected&&$.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:N})),await m(500))}if(!f){A("ไม่พบ 720p");return}await Q(f),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const B=Date.now();let u=!1,b=!1,P=0;for(;Date.now()-B<3e5;){const $=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if($.includes("download complete")||$.includes("ดาวน์โหลดเสร็จ")){n("✅ Download complete!"),u=!0;break}for(const M of document.querySelectorAll("div, span, p")){const F=(M.textContent||"").trim().toLowerCase();if(F.length<60&&(F.includes("download complete")||F.includes("ดาวน์โหลดเสร็จ"))){n("✅ Download complete! (element)"),u=!0;break}}if(u)break;if($.includes("downloading your extended video")||$.includes("กำลังดาวน์โหลด")){b=!0,P=0;const M=Math.floor((Date.now()-B)/1e3);n(`⏳ กำลังดาวน์โหลด... (${M} วินาที)`)}else if(b){if(P===0)P=Date.now(),n("🔍 ข้อความดาวน์โหลดหายไป — กำลังยืนยัน...");else if(Date.now()-P>=3e3){n("✅ ดาวน์โหลดเสร็จ (ข้อความหายไป 3 วินาที)"),u=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await m(2e3)}if(!u){A("ดาวน์โหลดหมดเวลา");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let _=!1;const E=Date.now();for(;Date.now()-E<6e4&&!_;){try{await new Promise(w=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:I},$=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):$!=null&&$.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${$.message}`),_=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${$==null?void 0:$.message}`),w()})})}catch(w){A(`ตรวจสอบผิดพลาด: ${w.message}`)}_||await m(3e3)}_||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const i=(y,S="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const L of document.querySelectorAll(S)){const I=(L.textContent||"").trim();if(I.includes(y)&&I.length<100){const f=L.getBoundingClientRect();if(f.width>0&&f.height>0&&f.top>=0)return L}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const s=Date.now();for(;!d&&Date.now()-s<1e4;){for(const y of document.querySelectorAll("button, [role='button']")){const S=(y.textContent||"").trim(),L=S.toLowerCase();if((L.includes("download")||L.includes("ดาวน์โหลด"))&&S.length<80){const I=y.getBoundingClientRect();if(I.width>0&&I.height>0){d=y;break}}}if(!d)for(const y of document.querySelectorAll("button")){const S=(y.getAttribute("aria-label")||"").toLowerCase();if(S.includes("download")||S.includes("ดาวน์")){const L=y.getBoundingClientRect();if(L.width>0&&L.height>0){d=y;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!d){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await Q(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const r=Date.now();let l=null;const p=Date.now();for(;!l&&Date.now()-p<5e3;)l=i("1080p"),l||(n("รอ 1080p..."),await m(500));if(!l){A("ไม่พบ 1080p");return}await Q(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const x=Date.now();let C=!1,G=!1,h=0;const o=3e3;for(;Date.now()-x<3e5;){const S=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(S.includes("upscaling complete")||S.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),C=!0;break}for(const I of document.querySelectorAll("div, span, p")){const f=(I.textContent||"").trim().toLowerCase();if(f.length<60&&(f.includes("upscaling complete")||f.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(k=I.textContent)==null?void 0:k.trim()}")`),C=!0;break}}if(C)break;if(S.includes("upscaling your video")||S.includes("กำลังอัปสเกล")){G=!0,h=0;const I=Math.floor((Date.now()-x)/1e3);n(`⏳ กำลังอัปสเกล... (${I} วินาที)`)}else if(G){if(h===0)h=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-h>=o){n(`✅ ข้อความ Upscaling หายไป ${o/1e3} วินาที — เสร็จ!`),C=!0;break}}else{const I=Math.floor((Date.now()-x)/1e3);I%10<3&&n(`⏳ รอ Upscale... (${I} วินาที)`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!C){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let g=!1;const v=Date.now();for(;Date.now()-v<6e4&&!g;){try{await new Promise(y=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},S=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):S!=null&&S.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${S.message}`),g=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${S==null?void 0:S.message}`),y()})})}catch(y){A(`ตรวจสอบผิดพลาด: ${y.message}`)}g||await m(3e3)}g||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function Pe(e){n("═══ Pending: รอ scene 2 gen เสร็จ + ดาวน์โหลด ═══");try{e&&Ct(e)}catch{}try{At()}catch{}await m(2e3);const t=(()=>{for(const I of document.querySelectorAll("button")){const f=I.querySelectorAll("i");for(const B of f){const u=(B.textContent||"").trim();if(u==="volume_up"||u==="volume_off"||u==="volume_mute"){const b=I.getBoundingClientRect();if(b.width>0&&b.height>0)return I}}}return null})();t?(t.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n("── รอวิดีโอ scene 2 gen เสร็จ (หลัง page navigate) ──");const c=document.getElementById("netflow-engine-overlay");let a=0,i=0;const d=Date.now(),s=6e5,r=5e3;let l=!1,p=0;for(;Date.now()-d<s;){let I=null;const f=document.querySelectorAll("div, span, p, label, strong, small");for(const B of f){if(c&&c.contains(B))continue;const b=(B.textContent||"").trim().match(/^(\d{1,3})%$/);if(b){const P=B.getBoundingClientRect();if(P.width>0&&P.height>0&&P.width<120&&P.height<60){I=parseInt(b[1],10);break}}}if(I!==null)p=0,I!==a&&(n(`🎬 scene 2 ความคืบหน้า: ${I}%`),a=I),i=0;else if(a>0){if(i===0)i=Date.now(),n(`🔍 scene 2: % หายไป (จาก ${a}%) — กำลังยืนยัน...`);else if(Date.now()-i>=r){n(`✅ scene 2: % หายไป ${r/1e3} วินาที — เจนเสร็จ!`),l=!0;break}}else if(p++,p>=15){const B=document.querySelectorAll("video");let u=!1;for(const b of B)if(b.readyState>=2&&!b.paused&&b.getBoundingClientRect().width>200){u=!0;break}if(u){n("✅ scene 2: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว"),l=!0;break}if(p>=30){n("✅ scene 2: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ"),l=!0;break}}await m(2e3)}l||n("⚠️ scene 2 หมดเวลา — ลองดาวน์โหลดต่อ"),n("✅ scene 2 เสร็จ — เริ่มดาวน์โหลด"),await m(3e3);const x=(I,f="button, [role='menuitem'], [role='option'], li, span, div[role='button'], div")=>{for(const B of document.querySelectorAll(f)){const u=(B.textContent||"").trim();if(u.includes(I)&&u.length<100){const b=B.getBoundingClientRect();if(b.width>0&&b.height>0&&b.top>=0)return B}}return null};n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");let C=null;const G=Date.now();for(;!C&&Date.now()-G<1e4;){for(const I of document.querySelectorAll("button, [role='button']")){const f=(I.textContent||"").trim().toLowerCase();if((f.includes("download")||f.includes("ดาวน์โหลด"))&&f.length<80){const B=I.getBoundingClientRect();if(B.width>0&&B.height>0){C=I;break}}}C||await m(1e3)}if(!C){A("ไม่พบปุ่มดาวน์โหลด");return}await Q(C),n("คลิกดาวน์โหลดแล้ว ✅"),await m(1500);const h=Date.now();let o=null;for(let I=0;I<3&&!o;I++){I>0&&n(`🔄 ลองหา 720p ครั้งที่ ${I+1}...`);let f=null;const B=Date.now();for(;!f&&Date.now()-B<5e3;)f=x("Full Video"),f||await m(500);if(!f){A("ไม่พบ Full Video");return}const u=f.getBoundingClientRect(),b=u.left+u.width/2,P=u.top+u.height/2;f.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:b,clientY:P})),f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:b,clientY:P})),f.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:b,clientY:P})),await Q(f),n("คลิก/hover Full Video ✅"),await m(2e3);const _=Date.now();for(;!o&&Date.now()-_<8e3;)o=x("720p"),o||(f.isConnected&&f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:b,clientY:P})),await m(500))}if(!o){A("ไม่พบ 720p");return}await Q(o),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const g=Date.now();let v=!1,k=!1,y=0;for(;Date.now()-g<3e5;){const f=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(f.includes("download complete")||f.includes("ดาวน์โหลดเสร็จ")){n("✅ Download complete!"),v=!0;break}for(const u of document.querySelectorAll("div, span, p")){const b=(u.textContent||"").trim().toLowerCase();if(b.length<60&&(b.includes("download complete")||b.includes("ดาวน์โหลดเสร็จ"))){n("✅ Download complete! (element)"),v=!0;break}}if(v)break;if(f.includes("downloading your extended video")||f.includes("กำลังดาวน์โหลด")){k=!0,y=0;const u=Math.floor((Date.now()-g)/1e3);n(`⏳ กำลังดาวน์โหลด... (${u} วินาที)`)}else if(k){if(y===0)y=Date.now(),n("🔍 ข้อความดาวน์โหลดหายไป — กำลังยืนยัน...");else if(Date.now()-y>=3e3){n("✅ ดาวน์โหลดเสร็จ (ข้อความหายไป 3 วินาที)"),v=!0;break}}await m(2e3)}if(!v){A("ดาวน์โหลดหมดเวลา");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let S=!1;const L=Date.now();for(;Date.now()-L<6e4&&!S;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:h},f=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):f!=null&&f.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${f.message}`),S=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${f==null?void 0:f.message}`),I()})})}catch(I){A(`ตรวจสอบผิดพลาด: ${I.message}`)}S||await m(3e3)}S||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Se(){try{const e=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const c=Date.now()-e.timestamp;if(c>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:e},()=>d())}),await m(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const r=s==null?void 0:s.netflow_pending_action;d((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(c/1e3)} วินาที)`),e.action==="mute_video"?await Ie(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene2_gen_and_download"?await Pe(e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,c)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),c({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Me(e).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>console.error("[Netflow AI] Generate error:",a)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,c({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return c({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return c({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const a=xe();if(!a){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const l=document.elementFromPoint(d,s);l?(await Q(l),n(`คลิก ${r+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await Q(a),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Se(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),a=Math.round(e.clientX),i=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${a},${i}) → <${c}> "${d}"`)},!0)})();
