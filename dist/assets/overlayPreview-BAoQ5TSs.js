import"./modulepreload-polyfill-B5Qt9EMX.js";const z={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let E=z.green,j=null;function $e(n){z[n]&&(j=n,E=z[n],pe(),requestAnimationFrame(()=>he()))}function we(){if(j&&z[j])return z[j];try{const n=localStorage.getItem("netflow_app_theme");if(n&&z[n])return z[n]}catch{}return z.green}let T=0,L=255,R=65;function pe(){const n=E.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);n&&(T=parseInt(n[1],16),L=parseInt(n[2],16),R=parseInt(n[3],16))}let A=null,S=null,G=null,ie=0,J=0,D=!1,B=null,Y=null,W=1,I=[];function Z(n){const e=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(n<=1)e.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let i=2;i<=n;i++)e.push({stepId:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"},{stepId:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"},{stepId:`scene${i}-wait`,label:`Scene ${i} รอ %`,status:"waiting",progress:0});e.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return e}const H=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];I=Z(1);function ye(n){const e=n.rgb,i=n.accentRgb,a=n.doneRgb,o=n.hex,f=n.accentHex,l=n.doneHex,r=(()=>{const p=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!p)return"#4ade80";const w=g=>Math.min(255,g+80);return`#${[1,2,3].map(g=>w(parseInt(p[g],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const p=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!p)return"#4ade80";const w=g=>Math.min(255,g+60);return`#${[1,2,3].map(g=>w(parseInt(p[g],16)).toString(16).padStart(2,"0")).join("")}`})(),d=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),$=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,M=d?parseInt(d[1],16)/$:0,C=d?parseInt(d[2],16)/$:1,x=d?parseInt(d[3],16)/$:.25,t=p=>`${Math.round(M*p)}, ${Math.round(C*p)}, ${Math.round(x*p)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.05) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${i},0.04) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(${t(18)},0.94) 0%, rgba(${t(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${i},0.03) 0%, transparent 40%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${i},0.06); box-shadow: 0 0 25px rgba(${i},0.03); }
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
        rgba(${i},0.018) 70px,
        rgba(${i},0.018) 71px
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
        rgba(${i},0.015) 113px,
        rgba(${i},0.015) 114px
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
    background: radial-gradient(circle, rgba(${i},0.055) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${i},0.04) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.06) 0%, rgba(${i},0.02) 40%, transparent 70%);
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
    background: rgba(${t(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${t(180)},0.05),
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
            0 0 200px rgba(${t(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${t(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${i},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${i},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${i},0.4)); }
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
    background: ${o};
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

.nf-term-active .nf-term-prefix { color: ${o}; text-shadow: 0 0 6px rgba(${e},0.4); }

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
    color: ${s};
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
    background: linear-gradient(180deg, rgba(${t(5)},0.95) 0%, rgba(${t(12)},0.98) 100%);
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
    border-color: rgba(${i},0.6);
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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${i},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${i},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${t(6)},0.75) 0%, rgba(${t(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${i},0.08);
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
    color: rgba(${i},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${i},0.7),
        0 0 12px rgba(${i},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${t(8)}, 0.88);
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
    color: ${o};
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
    background: ${o};
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${l};
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
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${l}, ${s});
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
    background: linear-gradient(90deg, ${o}, ${f});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${l}, ${s});
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
    background: rgba(${t(8)},0.8);
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
    background: rgba(${t(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${o};
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
    color: ${o};
    text-shadow: 0 0 6px rgba(${e},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${o};
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
    background: ${l};
    box-shadow: 0 0 5px rgba(${a},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${a},0.1);
    color: ${s};
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

    `}function fe(){G||(G=document.createElement("style"),G.id="netflow-overlay-styles",G.textContent=ye(E),document.head.appendChild(G))}function ge(n){n.innerHTML="",I.forEach((e,i)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,n.appendChild(a)})}function ve(){const n=document.getElementById("nf-terminal");if(!n)return;ge(n);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${I.length}`)}function se(n,e){let r="";for(let c=0;c<32;c++){const m=c/32*Math.PI*2,h=(c+.2)/32*Math.PI*2,u=(c+.5)/32*Math.PI*2,y=(c+.8)/32*Math.PI*2,v=(c+1)/32*Math.PI*2;r+=`${c===0?"M":"L"}${(120+104*Math.cos(m)).toFixed(1)},${(120+104*Math.sin(m)).toFixed(1)} `,r+=`L${(120+104*Math.cos(h)).toFixed(1)},${(120+104*Math.sin(h)).toFixed(1)} `,r+=`L${(120+116*Math.cos(u)).toFixed(1)},${(120+116*Math.sin(u)).toFixed(1)} `,r+=`L${(120+104*Math.cos(y)).toFixed(1)},${(120+104*Math.sin(y)).toFixed(1)} `,r+=`L${(120+104*Math.cos(v)).toFixed(1)},${(120+104*Math.sin(v)).toFixed(1)} `}r+="Z";const s=24,d=100,$=90;let M="";for(let c=0;c<s;c++){const m=c/s*Math.PI*2,h=(c+.25)/s*Math.PI*2,u=(c+.75)/s*Math.PI*2,y=(c+1)/s*Math.PI*2;M+=`${c===0?"M":"L"}${(120+$*Math.cos(m)).toFixed(1)},${(120+$*Math.sin(m)).toFixed(1)} `,M+=`L${(120+d*Math.cos(h)).toFixed(1)},${(120+d*Math.sin(h)).toFixed(1)} `,M+=`L${(120+d*Math.cos(u)).toFixed(1)},${(120+d*Math.sin(u)).toFixed(1)} `,M+=`L${(120+$*Math.cos(y)).toFixed(1)},${(120+$*Math.sin(y)).toFixed(1)} `}M+="Z";let C="";for(let c=0;c<64;c++){const m=c/64*Math.PI*2,h=c%4===0?117:119,u=c%4===0?124:122,y=c%4===0?.8:.4,v=c%4===0?.7:.35;C+=`<line x1="${(120+h*Math.cos(m)).toFixed(1)}" y1="${(120+h*Math.sin(m)).toFixed(1)}" x2="${(120+u*Math.cos(m)).toFixed(1)}" y2="${(120+u*Math.sin(m)).toFixed(1)}" stroke="rgba(${n},${v})" stroke-width="${y}"/>`}const x=26,t=78,p=68;let w="";for(let c=0;c<x;c++){const m=c/x*Math.PI*2,h=(c+.2)/x*Math.PI*2,u=(c+.5)/x*Math.PI*2,y=(c+.8)/x*Math.PI*2,v=(c+1)/x*Math.PI*2;w+=`${c===0?"M":"L"}${(120+p*Math.cos(m)).toFixed(1)},${(120+p*Math.sin(m)).toFixed(1)} `,w+=`L${(120+p*Math.cos(h)).toFixed(1)},${(120+p*Math.sin(h)).toFixed(1)} `,w+=`L${(120+t*Math.cos(u)).toFixed(1)},${(120+t*Math.sin(u)).toFixed(1)} `,w+=`L${(120+p*Math.cos(y)).toFixed(1)},${(120+p*Math.sin(y)).toFixed(1)} `,w+=`L${(120+p*Math.cos(v)).toFixed(1)},${(120+p*Math.sin(v)).toFixed(1)} `}w+="Z";let g="";for(let c=0;c<48;c++){const m=c/48*Math.PI*2,h=c%4===0?79:80,u=c%4===0?85:83,y=c%4===0?.6:.3,v=c%4===0?.6:.3;g+=`<line x1="${(120+h*Math.cos(m)).toFixed(1)}" y1="${(120+h*Math.sin(m)).toFixed(1)}" x2="${(120+u*Math.cos(m)).toFixed(1)}" y2="${(120+u*Math.sin(m)).toFixed(1)}" stroke="rgba(${e},${v})" stroke-width="${y}"/>`}function b(c,m,h,u,y){let v="";for(let F=0;F<h;F++){const ne=F/h*Math.PI*2,ae=(F+.25)/h*Math.PI*2,oe=(F+.75)/h*Math.PI*2,re=(F+1)/h*Math.PI*2;v+=`${F===0?"M":"L"}${(c+y*Math.cos(ne)).toFixed(1)},${(m+y*Math.sin(ne)).toFixed(1)} `,v+=`L${(c+u*Math.cos(ae)).toFixed(1)},${(m+u*Math.sin(ae)).toFixed(1)} `,v+=`L${(c+u*Math.cos(oe)).toFixed(1)},${(m+u*Math.sin(oe)).toFixed(1)} `,v+=`L${(c+y*Math.cos(re)).toFixed(1)},${(m+y*Math.sin(re)).toFixed(1)} `}return v+"Z"}const k=42,P=[],U=b(120,120,14,18,13);P.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${U}" fill="none" stroke="rgba(${n},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${e},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${n},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let c=0;c<8;c++){const m=c/8*Math.PI*2,h=120+k*Math.cos(m),u=120+k*Math.sin(m),v=b(h,u,10,14,10),F=c%2===0?"":"animation-direction:reverse;";P.push(`<g class="nf-kinetic-sub" style="transform-origin:${h.toFixed(1)}px ${u.toFixed(1)}px;${F}">
            <path d="${v}" fill="none" stroke="rgba(${e},0.6)" stroke-width="0.9"/>
            <circle cx="${h.toFixed(1)}" cy="${u.toFixed(1)}" r="7" fill="none" stroke="rgba(${n},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${h.toFixed(1)}" cy="${u.toFixed(1)}" r="2.5" fill="rgba(${n},0.6)"/>
        </g>`)}const V=P.join(`
`);let _="";for(let c=0;c<8;c++){const m=c/8*Math.PI*2,h=120+10*Math.cos(m),u=120+10*Math.sin(m),y=120+(k-10)*Math.cos(m),v=120+(k-10)*Math.sin(m);_+=`<line x1="${h.toFixed(1)}" y1="${u.toFixed(1)}" x2="${y.toFixed(1)}" y2="${v.toFixed(1)}" stroke="rgba(${e},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${n},0.95)"/>
                <stop offset="50%" stop-color="rgba(${e},0.75)"/>
                <stop offset="100%" stop-color="rgba(${n},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${e},0.8)"/>
                <stop offset="100%" stop-color="rgba(${n},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${n},0.85)"/>
                <stop offset="50%" stop-color="rgba(${e},0.65)"/>
                <stop offset="100%" stop-color="rgba(${n},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${n},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${n},0.2)" stroke-width="0.2"/>
        </g>
        ${C}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${r}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${n},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${M}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${$}" fill="none" stroke="rgba(${e},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${w}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${p}" fill="none" stroke="rgba(${n},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${g}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${n},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${e},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${_}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${V}
        </g>
    </svg>`}function ke(){const n=document.createElement("div");n.id="netflow-engine-overlay",B=document.createElement("canvas"),B.id="nf-matrix-canvas",n.appendChild(B);const e=document.createElement("div");e.className="nf-pat-data",n.appendChild(e);const i=document.createElement("div");i.className="nf-center-glow",n.appendChild(i);const a=document.createElement("div");a.className="nf-pat-noise",n.appendChild(a);const o=document.createElement("div");o.className="nf-vignette",n.appendChild(o);for(let g=0;g<3;g++){const b=document.createElement("div");b.className="nf-pulse-ring",n.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(g=>{const b=document.createElement("div");b.className=`nf-corner-deco ${g}`,n.appendChild(b)});const f=document.createElement("button");f.className="nf-close-btn",f.textContent="✕ ซ่อน",f.onclick=()=>Q(),n.appendChild(f);const l=document.createElement("div");l.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const s=document.createElement("div");s.className="nf-core-header",s.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${I.length}</div>
    `,r.appendChild(s);const d=document.createElement("div");d.className="nf-terminal",d.id="nf-terminal",ge(d),r.appendChild(d);const $=document.createElement("div");$.className="nf-engine-core",$.id="nf-engine-core";const M=document.createElement("div");M.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(g=>{const b=document.createElement("div");b.className=`nf-frame-corner ${g}`,M.appendChild(b)}),$.appendChild(M);const C="http://www.w3.org/2000/svg",x=document.createElementNS(C,"svg");x.setAttribute("class","nf-engine-waves"),x.setAttribute("viewBox","0 0 560 140"),x.setAttribute("preserveAspectRatio","none"),x.id="nf-engine-waves";for(let g=0;g<6;g++){const b=document.createElementNS(C,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",g<3?"1.5":"1"),b.setAttribute("stroke",g<3?`rgba(${E.rgb},${.12+g*.08})`:`rgba(${E.accentRgb},${.08+(g-3)*.06})`),b.setAttribute("data-wave-idx",String(g)),x.appendChild(b)}$.appendChild(x);const t=document.createElement("div");t.className="nf-engine-brand-inner",t.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${se(E.rgb,E.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${se(E.rgb,E.accentRgb)}
        </div>
    `,$.appendChild(t);const p=document.createElement("div");p.className="nf-engine-stats",p.id="nf-engine-stats",p.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([g,b,k])=>`<div class="nf-stat-item"><span class="nf-stat-label">${g}</span><span class="nf-stat-val" id="${b}">${k}</span></div>`).join(""),$.appendChild(p),r.appendChild($),l.appendChild(r);const w=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];H.forEach((g,b)=>{const k=Me(g);k.classList.add(w[b]),k.id=`nf-mod-${g.id}`,l.appendChild(k)}),n.appendChild(l);for(let g=0;g<30;g++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const k=.3+Math.random()*.4,P=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(T*P)}, ${Math.floor(L*P)}, ${Math.floor(R*P)}, ${k})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,n.appendChild(b)}return n}function Me(n){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
        <div class="nf-mod-title">${n.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${n.id}">0%</span>
    `,e.appendChild(i),n.steps.forEach(o=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${o.id}`;let l="";o.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${l}
        `,e.appendChild(f)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${n.id}"></div>`,e.appendChild(a),e}function Ce(){ie=Date.now(),setInterval(()=>{const n=Math.floor((Date.now()-ie)/1e3),e=String(Math.floor(n/60)).padStart(2,"0"),i=String(n%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${i}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${e}:${i}`)},1e3)}const Ee=220,K=210,le=.4;let X=[];function Ie(n,e){X=[];for(let i=0;i<Ee;i++){const a=Math.random();let o;a<.22?o=0:a<.4?o=1:a<.55?o=2:a<.68?o=3:a<.84?o=4:o=5;const f=Math.random()*n,l=Math.random()*e,r=50+Math.random()*220,s=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);X.push({x:o===0?Math.random()*n:f+Math.cos(s)*r,y:o===0?Math.random()*e:l+Math.sin(s)*r,vx:(Math.random()-.5)*le,vy:(Math.random()-.5)*le,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:f,oCy:l,oRadius:r,oAngle:s,oSpeed:d})}}function Se(){if(!B)return;const n=B;if(Y=n.getContext("2d"),!Y)return;const e=()=>{n.width=window.innerWidth,n.height=window.innerHeight,X.length===0&&Ie(n.width,n.height)};e(),window.addEventListener("resize",e);let i=null,a=0,o=0;function f(){if(!Y||!B)return;requestAnimationFrame(f);const l=Y,r=B.width,s=B.height;l.fillStyle=`rgba(${T*.04|0},${L*.04|0},${R*.06|0},1)`,l.fillRect(0,0,r,s),(!i||a!==r||o!==s)&&(a=r,o=s,i=l.createRadialGradient(r*.5,s*.5,0,r*.5,s*.5,Math.max(r,s)*.6),i.addColorStop(0,`rgba(${T*.08|0},${L*.08|0},${R*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=i,l.fillRect(0,0,r,s);const d=X,$=d.length,M=K*K;for(let x=0;x<$;x++){const t=d[x];if(t.pulsePhase+=t.pulseSpeed,t.motion===0)t.x+=t.vx,t.y+=t.vy,t.x<0?(t.x=0,t.vx=Math.abs(t.vx)*(.8+Math.random()*.4)):t.x>r&&(t.x=r,t.vx=-Math.abs(t.vx)*(.8+Math.random()*.4)),t.y<0?(t.y=0,t.vy=Math.abs(t.vy)*(.8+Math.random()*.4)):t.y>s&&(t.y=s,t.vy=-Math.abs(t.vy)*(.8+Math.random()*.4));else if(t.motion===1)t.oAngle+=t.oSpeed,t.x=t.oCx+Math.cos(t.oAngle)*t.oRadius,t.y=t.oCy+Math.sin(t.oAngle)*t.oRadius,t.oCx+=Math.sin(t.oAngle*.3)*.15,t.oCy+=Math.cos(t.oAngle*.3)*.15;else if(t.motion===2)t.oAngle+=t.oSpeed,t.x=t.oCx+Math.cos(t.oAngle)*t.oRadius,t.y=t.oCy+Math.sin(t.oAngle)*t.oRadius*.5,t.oCx+=Math.sin(t.oAngle*.2)*.1,t.oCy+=Math.cos(t.oAngle*.2)*.1;else if(t.motion===3){t.oAngle+=t.oSpeed;const p=t.oAngle,w=t.oRadius*.7;t.x=t.oCx+w*Math.cos(p),t.y=t.oCy+w*Math.sin(p)*Math.cos(p),t.oCx+=Math.sin(p*.15)*.12,t.oCy+=Math.cos(p*.15)*.12}else if(t.motion===4){t.oAngle+=t.oSpeed*1.2;const p=t.oRadius*(.5+.5*Math.abs(Math.sin(t.oAngle*.15)));t.x=t.oCx+Math.cos(t.oAngle)*p,t.y=t.oCy+Math.sin(t.oAngle)*p,t.oCx+=Math.sin(t.oAngle*.1)*.18,t.oCy+=Math.cos(t.oAngle*.1)*.18}else t.oAngle+=t.oSpeed,t.x+=t.vx*.8,t.y=t.oCy+Math.sin(t.oAngle+t.x*.008)*t.oRadius*.35,t.x<-30?t.x=r+30:t.x>r+30&&(t.x=-30),t.oCy+=Math.sin(t.oAngle*.1)*.08;if(t.motion>0){const p=t.oRadius+50;t.oCx<-p?t.oCx=r+p:t.oCx>r+p&&(t.oCx=-p),t.oCy<-p?t.oCy=s+p:t.oCy>s+p&&(t.oCy=-p)}}const C=5;for(let x=0;x<C;x++){const t=x/C,p=(x+1)/C,w=((t+p)*.5*.35).toFixed(3);l.beginPath(),l.strokeStyle=`rgba(${T},${L},${R},${w})`,l.lineWidth=(t+p)*.5*1.2;for(let g=0;g<$;g++){const b=d[g];for(let k=g+1;k<$;k++){const P=d[k],U=b.x-P.x,V=b.y-P.y,_=U*U+V*V;if(_<M){const c=1-Math.sqrt(_)/K;c>=t&&c<p&&(l.moveTo(b.x,b.y),l.lineTo(P.x,P.y))}}}l.stroke()}l.save(),l.shadowColor=`rgba(${T},${L},${R},0.8)`,l.shadowBlur=25;for(let x=0;x<$;x++){const t=d[x],p=.6+.4*Math.sin(t.pulsePhase),w=t.radius*(.8+p*.4),g=T+(255-T)*.7*p|0,b=L+(255-L)*.7*p|0,k=R+(255-R)*.7*p|0;l.beginPath(),l.arc(t.x,t.y,w,0,Math.PI*2),l.fillStyle=`rgba(${g},${b},${k},${(.6+p*.4).toFixed(2)})`,l.fill()}l.restore(),l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let x=0;x<$;x++){const t=d[x];if(t.radius>2){const p=.6+.4*Math.sin(t.pulsePhase),w=t.radius*(.8+p*.4)*.35;l.moveTo(t.x+w,t.y),l.arc(t.x,t.y,w,0,Math.PI*2)}}l.fill(),l.fillStyle=`rgba(${T},${L},${R},0.08)`;for(let x=0;x<6;x++)l.fillRect(Math.random()*r,Math.random()*s,1,1)}f()}function be(){requestAnimationFrame(be),J+=.035;const n=document.getElementById("nf-engine-waves");if(!n)return;const e=560,i=140,a=e/2;n.querySelectorAll("path").forEach(f=>{const l=parseInt(f.getAttribute("data-wave-idx")||"0",10),r=10+l*5,s=1.2+l*.35,d=l*.6,$=.7+l*.12;let M=`M 0 ${i/2}`;for(let C=0;C<=e;C+=3){const x=Math.abs(C-a)/a,t=Math.pow(Math.min(1,x*1.6),.6),p=i/2+r*t*Math.sin(C/e*s*Math.PI*2+J*$+d);M+=` L ${C} ${Math.round(p*10)/10}`}f.setAttribute("d",M)})}function Pe(){J=0,be(),Se(),setInterval(()=>{const n=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");n&&(n.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function xe(){let n=0;const e=I.filter(r=>r.status!=="skipped").length;for(const r of I){const s=document.getElementById(`nf-proc-${r.stepId}`);if(!s)continue;s.className="nf-proc-row";const d=s.querySelector(".nf-proc-badge");switch(r.status){case"done":s.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),n++;break;case"active":s.classList.add("nf-proc-active"),d&&(d.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":s.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":s.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:s.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const i=document.getElementById("nf-step-counter");i&&(i.textContent=`${n}/${I.length}`);const a=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");n>=e&&e>0?(a&&(a.textContent="COMPLETE",a.style.color=E.doneHex),o&&(o.style.background=E.doneHex,o.style.boxShadow=`0 0 8px rgba(${E.doneRgb},0.7)`)):I.some(s=>s.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):I.some(s=>s.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=E.hex,a.style.textShadow=`0 0 10px rgba(${E.rgb},0.5)`);const f=document.getElementById("nf-terminal"),l=f==null?void 0:f.querySelector(".nf-proc-active");l&&f&&l.scrollIntoView({behavior:"smooth",block:"center"})}function me(){S&&S.isConnected||(fe(),S=document.createElement("button"),S.id="nf-toggle-btn",S.className="nf-toggle-visible",S.innerHTML=D?"⚡":"✕",S.title="ซ่อน/แสดง Netflow Overlay",S.onclick=()=>Q(),document.body.appendChild(S))}function Q(){A&&(me(),D?(A.classList.remove("nf-hidden"),A.classList.add("nf-visible"),S&&(S.innerHTML="✕"),D=!1):(A.classList.remove("nf-visible"),A.classList.add("nf-hidden"),S&&(S.innerHTML="⚡"),D=!0))}const de={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function he(){const n=document.getElementById("nf-core-monitor");if(!n)return;let e=j;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"red"}catch{e="red"}const i=de[e]||de.red;let a;try{a=chrome.runtime.getURL(i)}catch{a=`/${i}`}const o=E.rgb;n.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${a}')`].join(", "),n.style.backgroundSize="auto, auto, cover",n.style.backgroundPosition="center, center, center",n.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",n.style.setProperty("--nf-bg-set","1"),n.style.border=`1.5px solid rgba(${o},0.45)`,n.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function Fe(n=1){if(E=we(),pe(),A){D&&Q();return}if(G&&(G.remove(),G=null),fe(),W=n,I=Z(n),n>1){const e=H.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=n;o++)a.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),a.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),a.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});e.steps=a}const i=H.find(a=>a.id==="render");if(i){const a=i.steps.find(f=>f.id==="download");a&&(a.label="ดาวน์โหลด 720p");const o=i.steps.find(f=>f.id==="upscale");o&&(o.label="Full Video")}}A=ke(),document.body.appendChild(A),D=!1,me(),Ce(),Pe(),requestAnimationFrame(()=>he())}const Te={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Le(n,e,i){const a=I.filter(r=>r.status==="done").length,o=I.length,f=document.getElementById("nf-stat-step");f&&(f.textContent=`${a}/${o}`);const l=document.getElementById("nf-stat-scenes");if(l&&(l.textContent=W>1?`1/${W}`:"1/1"),e==="active"){const r=document.getElementById("nf-stat-status"),s=Te[n]||n.toUpperCase();r&&(r.textContent=s)}else if(e==="done"&&a>=o){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(e==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}}function N(n,e,i){if(!A)return;for(const o of H)for(const f of o.steps)f.id===n&&(f.status=e);for(const o of I)o.stepId===n&&(o.status=e);const a=document.getElementById(`nf-step-${n}`);a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),Le(n,e),ue(),xe()}function ue(){for(const n of H){const e=n.steps.filter(s=>s.status!=="skipped").length,i=n.steps.filter(s=>s.status==="done").length,a=n.steps.some(s=>s.status==="active"),o=e>0?Math.round(i/e*100):0,f=document.getElementById(`nf-pct-${n.id}`);f&&(f.textContent=`${o}%`);const l=document.getElementById(`nf-modbar-${n.id}`);l&&(l.style.width=`${o}%`);const r=document.getElementById(`nf-mod-${n.id}`);r&&(r.classList.remove("nf-active","nf-done"),o>=100?r.classList.add("nf-done"):a&&r.classList.add("nf-active"))}}function Re(n){var a,o,f,l;W=n;const e=new Map;for(const r of I)e.set(r.stepId,{status:r.status,progress:r.progress});I=Z(n);for(const r of I){const s=e.get(r.stepId);s&&(r.status=s.status,s.progress!==void 0&&(r.progress=s.progress))}ve();{const r=H.find(s=>s.id==="video");if(r){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=r.steps.find(d=>d.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=r.steps.find(d=>d.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((f=r.steps.find(d=>d.id==="vid-generate"))==null?void 0:f.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=r.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=n;d++)s.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),s.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),s.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});r.steps=s,ce(r)}}const i=H.find(r=>r.id==="render");if(i&&n>1){const r=i.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const s=i.steps.find(d=>d.id==="upscale");s&&(s.label="Full Video"),ce(i)}ue(),xe()}function ce(n){const e=document.getElementById(`nf-mod-${n.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),n.steps.forEach(o=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${o.id}`;let l="";o.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${l}
        `,e.appendChild(f)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${n.id}"></div>`,e.appendChild(a)}function O(n){n.replace(/^\[Netflow AI\]\s*/,"")}window.chrome={runtime:{sendMessage:()=>{},lastError:null},storage:{local:{get:(n,e)=>e==null?void 0:e({}),set:()=>{}}}};const ee=new URLSearchParams(location.search).get("theme")||"red";$e(ee);Re(2);Fe();setTimeout(()=>{O("🚀 Overlay preview started — theme: "+ee),N("settings","active")},400);setTimeout(()=>{N("settings","done"),N("upload","active"),O("✅ Settings configured")},1600);setTimeout(()=>{N("upload","done"),N("prompt","active"),O("✅ Images uploaded (2 refs)")},3e3);setTimeout(()=>{N("prompt","done"),N("generate","active"),O("✅ Prompt injected"),O("⏳ Waiting for Scene 1 generation...")},4500);setTimeout(()=>{N("generate","done"),N("scene2","active"),O("✅ Scene 1 generated"),O("⏳ Generating Scene 2...")},7e3);const te=document.createElement("div");te.style.cssText=`
    position: fixed; bottom: 16px; right: 16px; z-index: 99999999;
    display: flex; gap: 8px; align-items: center;
`;const Ae=["red","blue","green","yellow","purple"],q={red:"#ef4444",blue:"#3b82f6",green:"#00ff41",yellow:"#eab308",purple:"#8b5cf6"};Ae.forEach(n=>{const e=document.createElement("button");e.textContent=n,e.style.cssText=`
        background: ${q[n]}22; border: 1.5px solid ${q[n]};
        color: ${q[n]}; padding: 4px 10px; border-radius: 6px;
        cursor: pointer; font-size: 11px; font-family: monospace; font-weight: 700;
        ${n===ee?"opacity:1; box-shadow: 0 0 8px "+q[n]:"opacity:0.5"};
    `,e.onclick=()=>location.search="?theme="+n,te.appendChild(e)});document.body.appendChild(te);
