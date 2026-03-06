(function(){"use strict";const rt={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let K=rt.green,ht=null;function Nt(e){e&&rt[e]&&(ht=e,K=rt[e],Ot(),requestAnimationFrame(()=>Kt()))}function ie(){if(ht&&rt[ht])return rt[ht];try{const e=localStorage.getItem("netflow_app_theme");if(e&&rt[e])return rt[e]}catch{}return rt.green}let nt=0,ot=255,it=65;function Ot(){const e=K.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(nt=parseInt(e[1],16),ot=parseInt(e[2],16),it=parseInt(e[3],16))}let X=null,W=null,st=null,zt=0,Ct=null,bt=null,Mt=null,Pt=0,pt=!1,at=null,wt=null,xt=null,It=1,Y=[];function St(e){const t=[{stepId:"upload-char",label:"Upload ตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"Upload สินค้า",status:"waiting"},{stepId:"img-prompt",label:"Paste Image Prompt",status:"waiting"},{stepId:"img-generate",label:"กด Generate →",status:"waiting"},{stepId:"img-wait",label:"รอรูป Generate",status:"waiting",progress:0},{stepId:"animate",label:"ทำให้เป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"Paste Video Prompt",status:"waiting"},{stepId:"vid-generate",label:"กด Generate Video",status:"waiting"},{stepId:"vid-wait",label:"รอ % วิดีโอ + คลิก",status:"waiting",progress:0},{stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"1080p → Upscale",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{stepId:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{stepId:"vid-wait",label:"Scene 1 รอ % + คลิก",status:"waiting",progress:0});for(let c=2;c<=e;c++)t.push({stepId:`scene${c}-prompt`,label:`Scene ${c} Prompt`,status:"waiting"},{stepId:`scene${c}-gen`,label:`Scene ${c} Generate`,status:"waiting"},{stepId:`scene${c}-wait`,label:`Scene ${c} รอ %`,status:"waiting",progress:0});t.push({stepId:"download",label:"กด ⋮ → ดาวน์โหลด",status:"waiting"},{stepId:"upscale",label:"Full Video → 720p",status:"waiting",progress:0},{stepId:"open",label:"เปิดวิดีโอใน Chrome",status:"waiting"})}return t}const yt=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"ตั้งค่า Flow",status:"waiting"},{id:"upload-char",label:"อัพโหลดตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัพโหลดสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่ Prompt",status:"waiting"},{id:"img-generate",label:"สร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"ใส่ Video Prompt",status:"waiting"},{id:"vid-generate",label:"สร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"รอผลวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลด 1080p",status:"waiting"},{id:"upscale",label:"Upscaling",status:"waiting",progress:0},{id:"open",label:"เปิดไฟล์วิดีโอ",status:"waiting"}]}];Y=St(1);function ae(e){const t=e.rgb,c=e.accentRgb,a=e.doneRgb,i=e.hex,d=e.accentHex,s=e.doneHex,r=(()=>{const f=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!f)return"#4ade80";const E=k=>Math.min(255,k+80);return`#${[1,2,3].map(k=>E(parseInt(f[k],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const f=s.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!f)return"#4ade80";const E=k=>Math.min(255,k+60);return`#${[1,2,3].map(k=>E(parseInt(f[k],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),b=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,C=p?parseInt(p[1],16)/b:0,D=p?parseInt(p[2],16)/b:1,g=p?parseInt(p[3],16)/b:.25,o=f=>`${Math.round(C*f)}, ${Math.round(D*f)}, ${Math.round(g*f)}`;return`
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

    `}function Ht(){st||(st=document.createElement("style"),st.id="netflow-overlay-styles",st.textContent=ae(K),document.head.appendChild(st))}function qt(e){e.innerHTML="",Y.forEach((t,c)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${t.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${c+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(a)})}function re(){const e=document.getElementById("nf-terminal");if(!e)return;qt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${Y.length}`)}function se(e,t){let r="";for(let u=0;u<32;u++){const x=u/32*Math.PI*2,P=(u+.2)/32*Math.PI*2,S=(u+.5)/32*Math.PI*2,v=(u+.8)/32*Math.PI*2,$=(u+1)/32*Math.PI*2;r+=`${u===0?"M":"L"}${(120+104*Math.cos(x)).toFixed(1)},${(120+104*Math.sin(x)).toFixed(1)} `,r+=`L${(120+104*Math.cos(P)).toFixed(1)},${(120+104*Math.sin(P)).toFixed(1)} `,r+=`L${(120+116*Math.cos(S)).toFixed(1)},${(120+116*Math.sin(S)).toFixed(1)} `,r+=`L${(120+104*Math.cos(v)).toFixed(1)},${(120+104*Math.sin(v)).toFixed(1)} `,r+=`L${(120+104*Math.cos($)).toFixed(1)},${(120+104*Math.sin($)).toFixed(1)} `}r+="Z";const l=24,p=100,b=90;let C="";for(let u=0;u<l;u++){const x=u/l*Math.PI*2,P=(u+.25)/l*Math.PI*2,S=(u+.75)/l*Math.PI*2,v=(u+1)/l*Math.PI*2;C+=`${u===0?"M":"L"}${(120+b*Math.cos(x)).toFixed(1)},${(120+b*Math.sin(x)).toFixed(1)} `,C+=`L${(120+p*Math.cos(P)).toFixed(1)},${(120+p*Math.sin(P)).toFixed(1)} `,C+=`L${(120+p*Math.cos(S)).toFixed(1)},${(120+p*Math.sin(S)).toFixed(1)} `,C+=`L${(120+b*Math.cos(v)).toFixed(1)},${(120+b*Math.sin(v)).toFixed(1)} `}C+="Z";let D="";for(let u=0;u<64;u++){const x=u/64*Math.PI*2,P=u%4===0?117:119,S=u%4===0?124:122,v=u%4===0?.8:.4,$=u%4===0?.7:.35;D+=`<line x1="${(120+P*Math.cos(x)).toFixed(1)}" y1="${(120+P*Math.sin(x)).toFixed(1)}" x2="${(120+S*Math.cos(x)).toFixed(1)}" y2="${(120+S*Math.sin(x)).toFixed(1)}" stroke="rgba(${e},${$})" stroke-width="${v}"/>`}const g=26,o=78,f=68;let E="";for(let u=0;u<g;u++){const x=u/g*Math.PI*2,P=(u+.2)/g*Math.PI*2,S=(u+.5)/g*Math.PI*2,v=(u+.8)/g*Math.PI*2,$=(u+1)/g*Math.PI*2;E+=`${u===0?"M":"L"}${(120+f*Math.cos(x)).toFixed(1)},${(120+f*Math.sin(x)).toFixed(1)} `,E+=`L${(120+f*Math.cos(P)).toFixed(1)},${(120+f*Math.sin(P)).toFixed(1)} `,E+=`L${(120+o*Math.cos(S)).toFixed(1)},${(120+o*Math.sin(S)).toFixed(1)} `,E+=`L${(120+f*Math.cos(v)).toFixed(1)},${(120+f*Math.sin(v)).toFixed(1)} `,E+=`L${(120+f*Math.cos($)).toFixed(1)},${(120+f*Math.sin($)).toFixed(1)} `}E+="Z";let k="";for(let u=0;u<48;u++){const x=u/48*Math.PI*2,P=u%4===0?79:80,S=u%4===0?85:83,v=u%4===0?.6:.3,$=u%4===0?.6:.3;k+=`<line x1="${(120+P*Math.cos(x)).toFixed(1)}" y1="${(120+P*Math.sin(x)).toFixed(1)}" x2="${(120+S*Math.cos(x)).toFixed(1)}" y2="${(120+S*Math.sin(x)).toFixed(1)}" stroke="rgba(${t},${$})" stroke-width="${v}"/>`}function w(u,x,P,S,v){let $="";for(let A=0;A<P;A++){const L=A/P*Math.PI*2,y=(A+.25)/P*Math.PI*2,I=(A+.75)/P*Math.PI*2,B=(A+1)/P*Math.PI*2;$+=`${A===0?"M":"L"}${(u+v*Math.cos(L)).toFixed(1)},${(x+v*Math.sin(L)).toFixed(1)} `,$+=`L${(u+S*Math.cos(y)).toFixed(1)},${(x+S*Math.sin(y)).toFixed(1)} `,$+=`L${(u+S*Math.cos(I)).toFixed(1)},${(x+S*Math.sin(I)).toFixed(1)} `,$+=`L${(u+v*Math.cos(B)).toFixed(1)},${(x+v*Math.sin(B)).toFixed(1)} `}return $+"Z"}const M=42,_=[],R=w(120,120,14,18,13);_.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${R}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let u=0;u<8;u++){const x=u/8*Math.PI*2,P=120+M*Math.cos(x),S=120+M*Math.sin(x),$=w(P,S,10,14,10),A=u%2===0?"":"animation-direction:reverse;";_.push(`<g class="nf-kinetic-sub" style="transform-origin:${P.toFixed(1)}px ${S.toFixed(1)}px;${A}">
            <path d="${$}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${P.toFixed(1)}" cy="${S.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${P.toFixed(1)}" cy="${S.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const h=_.join(`
`);let O="";for(let u=0;u<8;u++){const x=u/8*Math.PI*2,P=120+10*Math.cos(x),S=120+10*Math.sin(x),v=120+(M-10)*Math.cos(x),$=120+(M-10)*Math.sin(x);O+=`<line x1="${P.toFixed(1)}" y1="${S.toFixed(1)}" x2="${v.toFixed(1)}" y2="${$.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        ${D}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${r}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${C}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${b}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${E}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${f}" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${k}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${t},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${O}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${h}
        </g>
    </svg>`}function le(){const e=document.createElement("div");e.id="netflow-engine-overlay",at=document.createElement("canvas"),at.id="nf-matrix-canvas",e.appendChild(at);const t=document.createElement("div");t.className="nf-pat-data",e.appendChild(t);const c=document.createElement("div");c.className="nf-center-glow",e.appendChild(c);const a=document.createElement("div");a.className="nf-pat-noise",e.appendChild(a);const i=document.createElement("div");i.className="nf-vignette",e.appendChild(i);for(let k=0;k<3;k++){const w=document.createElement("div");w.className="nf-pulse-ring",e.appendChild(w)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const w=document.createElement("div");w.className=`nf-corner-deco ${k}`,e.appendChild(w)});const d=document.createElement("button");d.className="nf-close-btn",d.textContent="✕ ซ่อน",d.onclick=()=>Bt(),e.appendChild(d);const s=document.createElement("div");s.className="nf-layout";const r=document.createElement("div");r.className="nf-core-monitor",r.id="nf-core-monitor";const l=document.createElement("div");l.className="nf-core-header",l.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,r.appendChild(l);const p=document.createElement("div");p.className="nf-terminal",p.id="nf-terminal",qt(p),r.appendChild(p);const b=document.createElement("div");b.className="nf-engine-core",b.id="nf-engine-core";const C=document.createElement("div");C.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const w=document.createElement("div");w.className=`nf-frame-corner ${k}`,C.appendChild(w)}),b.appendChild(C);const D="http://www.w3.org/2000/svg",g=document.createElementNS(D,"svg");g.setAttribute("class","nf-engine-waves"),g.setAttribute("viewBox","0 0 560 140"),g.setAttribute("preserveAspectRatio","none"),g.id="nf-engine-waves";for(let k=0;k<6;k++){const w=document.createElementNS(D,"path");w.setAttribute("fill","none"),w.setAttribute("stroke-width",k<3?"1.5":"1"),w.setAttribute("stroke",k<3?`rgba(${K.rgb},${.12+k*.08})`:`rgba(${K.accentRgb},${.08+(k-3)*.06})`),w.setAttribute("data-wave-idx",String(k)),g.appendChild(w)}b.appendChild(g);const o=document.createElement("div");o.className="nf-engine-brand-inner",o.innerHTML=`
        <div class="nf-brand-gear-icon">
            ${se(K.rgb,K.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
    `,b.appendChild(o);const f=document.createElement("div");f.className="nf-engine-stats",f.id="nf-engine-stats",f.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,w,M])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${w}">${M}</span></div>`).join(""),b.appendChild(f),r.appendChild(b),s.appendChild(r);const E=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];yt.forEach((k,w)=>{const M=ce(k);M.classList.add(E[w]),M.id=`nf-mod-${k.id}`,s.appendChild(M)}),e.appendChild(s);for(let k=0;k<30;k++){const w=document.createElement("div");w.className="nf-particle",w.style.left=`${5+Math.random()*90}%`,w.style.bottom=`${Math.random()*40}%`,w.style.animationDuration=`${3+Math.random()*5}s`,w.style.animationDelay=`${Math.random()*4}s`;const M=.3+Math.random()*.4,_=.7+Math.random()*.3;w.style.background=`rgba(${Math.floor(nt*_)}, ${Math.floor(ot*_)}, ${Math.floor(it*_)}, ${M})`,w.style.width=`${1+Math.random()*2}px`,w.style.height=w.style.width,e.appendChild(w)}return e}function ce(e){const t=document.createElement("div");t.className="nf-module";const c=document.createElement("div");c.className="nf-mod-header",c.innerHTML=`
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
        `,t.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a),t}function de(){zt=Date.now(),Ct=setInterval(()=>{const e=Math.floor((Date.now()-zt)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),c=String(e%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${t}:${c}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${t}:${c}`)},1e3)}function Vt(){Ct&&(clearInterval(Ct),Ct=null)}const pe=220,Tt=210,Ut=.4;let $t=[];function fe(e,t){$t=[];for(let c=0;c<pe;c++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const d=Math.random()*e,s=Math.random()*t,r=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);$t.push({x:i===0?Math.random()*e:d+Math.cos(l)*r,y:i===0?Math.random()*t:s+Math.sin(l)*r,vx:(Math.random()-.5)*Ut,vy:(Math.random()-.5)*Ut,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:s,oRadius:r,oAngle:l,oSpeed:p})}}function ue(){if(!at)return;const e=at;if(wt=e.getContext("2d"),!wt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,$t.length===0&&fe(e.width,e.height)};t(),window.addEventListener("resize",t);let c=null,a=0,i=0;function d(){if(!wt||!at){xt=null;return}xt=requestAnimationFrame(d);const s=wt,r=at.width,l=at.height;s.fillStyle=`rgba(${nt*.04|0},${ot*.04|0},${it*.06|0},1)`,s.fillRect(0,0,r,l),(!c||a!==r||i!==l)&&(a=r,i=l,c=s.createRadialGradient(r*.5,l*.5,0,r*.5,l*.5,Math.max(r,l)*.6),c.addColorStop(0,`rgba(${nt*.08|0},${ot*.08|0},${it*.1|0},0.4)`),c.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=c,s.fillRect(0,0,r,l);const p=$t,b=p.length,C=Tt*Tt;for(let g=0;g<b;g++){const o=p[g];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>r&&(o.x=r,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>l&&(o.y=l,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const f=o.oAngle,E=o.oRadius*.7;o.x=o.oCx+E*Math.cos(f),o.y=o.oCy+E*Math.sin(f)*Math.cos(f),o.oCx+=Math.sin(f*.15)*.12,o.oCy+=Math.cos(f*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const f=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*f,o.y=o.oCy+Math.sin(o.oAngle)*f,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=r+30:o.x>r+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const f=o.oRadius+50;o.oCx<-f?o.oCx=r+f:o.oCx>r+f&&(o.oCx=-f),o.oCy<-f?o.oCy=l+f:o.oCy>l+f&&(o.oCy=-f)}}const D=5;for(let g=0;g<D;g++){const o=g/D,f=(g+1)/D,E=((o+f)*.5*.35).toFixed(3);s.beginPath(),s.strokeStyle=`rgba(${nt},${ot},${it},${E})`,s.lineWidth=(o+f)*.5*1.2;for(let k=0;k<b;k++){const w=p[k];for(let M=k+1;M<b;M++){const _=p[M],R=w.x-_.x,h=w.y-_.y,O=R*R+h*h;if(O<C){const u=1-Math.sqrt(O)/Tt;u>=o&&u<f&&(s.moveTo(w.x,w.y),s.lineTo(_.x,_.y))}}}s.stroke()}s.save(),s.shadowColor=`rgba(${nt},${ot},${it},0.8)`,s.shadowBlur=25;for(let g=0;g<b;g++){const o=p[g],f=.6+.4*Math.sin(o.pulsePhase),E=o.radius*(.8+f*.4),k=nt+(255-nt)*.7*f|0,w=ot+(255-ot)*.7*f|0,M=it+(255-it)*.7*f|0;s.beginPath(),s.arc(o.x,o.y,E,0,Math.PI*2),s.fillStyle=`rgba(${k},${w},${M},${(.6+f*.4).toFixed(2)})`,s.fill()}s.restore(),s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let g=0;g<b;g++){const o=p[g];if(o.radius>2){const f=.6+.4*Math.sin(o.pulsePhase),E=o.radius*(.8+f*.4)*.35;s.moveTo(o.x+E,o.y),s.arc(o.x,o.y,E,0,Math.PI*2)}}s.fill(),s.fillStyle=`rgba(${nt},${ot},${it},0.08)`;for(let g=0;g<6;g++)s.fillRect(Math.random()*r,Math.random()*l,1,1)}d()}function ge(){xt!==null&&(cancelAnimationFrame(xt),xt=null),at=null,wt=null,$t=[]}function Wt(){bt=requestAnimationFrame(Wt),Pt+=.035;const e=document.getElementById("nf-engine-waves");if(!e){bt=null;return}const t=560,c=140,a=t/2;e.querySelectorAll("path").forEach(d=>{const s=parseInt(d.getAttribute("data-wave-idx")||"0",10),r=10+s*5,l=1.2+s*.35,p=s*.6,b=.7+s*.12;let C=`M 0 ${c/2}`;for(let D=0;D<=t;D+=3){const g=Math.abs(D-a)/a,o=Math.pow(Math.min(1,g*1.6),.6),f=c/2+r*o*Math.sin(D/t*l*Math.PI*2+Pt*b+p);C+=` L ${D} ${Math.round(f*10)/10}`}d.setAttribute("d",C)})}function me(){Pt=0,Wt(),ue(),Mt=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),c=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),c&&(c.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function jt(){bt!==null&&(cancelAnimationFrame(bt),bt=null),Mt&&(clearInterval(Mt),Mt=null),ge()}function At(){let e=0;const t=Y.filter(r=>r.status!=="skipped").length;for(const r of Y){const l=document.getElementById(`nf-proc-${r.stepId}`);if(!l)continue;l.className="nf-proc-row";const p=l.querySelector(".nf-proc-badge");switch(r.status){case"done":l.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),e++;break;case"active":l.classList.add("nf-proc-active"),p&&(p.textContent=r.progress!==void 0&&r.progress>0?`⏳ ${r.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const c=document.getElementById("nf-step-counter");c&&(c.textContent=`${e}/${Y.length}`);const a=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(a&&(a.textContent="COMPLETE",a.style.color=K.doneHex),i&&(i.style.background=K.doneHex,i.style.boxShadow=`0 0 8px rgba(${K.doneRgb},0.7)`)):Y.some(l=>l.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(l=>l.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=K.hex,a.style.textShadow=`0 0 10px rgba(${K.rgb},0.5)`);const d=document.getElementById("nf-terminal"),s=d==null?void 0:d.querySelector(".nf-proc-active");s&&d&&s.scrollIntoView({behavior:"smooth",block:"center"})}function Yt(){W||(Ht(),W=document.createElement("button"),W.id="nf-toggle-btn",W.className="nf-toggle-hidden",W.innerHTML="⚡",W.title="เปิด Netflow Overlay",W.onclick=()=>Bt(),document.body.appendChild(W))}function Bt(){X&&(Yt(),pt?(X.classList.remove("nf-hidden"),X.classList.add("nf-visible"),W&&(W.classList.remove("nf-toggle-visible"),W.classList.add("nf-toggle-hidden")),pt=!1):(X.classList.remove("nf-visible"),X.classList.add("nf-hidden"),W&&(W.classList.remove("nf-toggle-hidden"),W.classList.add("nf-toggle-visible")),pt=!0))}const Xt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Kt(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=ht;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const c=Xt[t]||Xt.red;let a;try{a=chrome.runtime.getURL(c)}catch{a=`/${c}`}const i=K.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${i},0.45)`,e.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Jt(){if(K=ie(),Ot(),X){pt&&Bt();return}st&&(st.remove(),st=null),Ht(),It=1,Y=St(1),X=le(),document.body.appendChild(X),pt=!1,Yt(),de(),me(),requestAnimationFrame(()=>Kt())}function he(){Vt(),jt(),pt=!1,X&&(X.classList.add("nf-fade-out"),setTimeout(()=>{X==null||X.remove(),X=null},500)),W&&(W.remove(),W=null)}const be={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function we(e,t,c){const a=Y.filter(r=>r.status==="done").length,i=Y.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${a}/${i}`);const s=document.getElementById("nf-stat-scenes");if(s&&(s.textContent=It>1?`1/${It}`:"1/1"),t==="active"){const r=document.getElementById("nf-stat-status"),l=be[e]||e.toUpperCase();r&&(r.textContent=l)}else if(t==="done"&&a>=i){const r=document.getElementById("nf-stat-status");r&&(r.textContent="COMPLETE")}else if(t==="error"){const r=document.getElementById("nf-stat-status");r&&(r.textContent="ERROR")}if(c!==void 0&&c>0){const r=document.getElementById("nf-stat-progress");r&&(r.textContent=`${Math.min(100,c)}%`)}}function F(e,t,c){if(!X)return;for(const i of yt)for(const d of i.steps)d.id===e&&(d.status=t,c!==void 0&&(d.progress=c));for(const i of Y)i.stepId===e&&(i.status=t,c!==void 0&&(i.progress=c));const a=document.getElementById(`nf-step-${e}`);if(a&&(a.className="nf-step",t==="active"?a.classList.add("nf-step-active"):t==="done"?a.classList.add("nf-step-done"):t==="error"&&a.classList.add("nf-step-error")),we(e,t,c),c!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,c)}%`)}Rt(),At()}function ft(e){F(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function Ft(e=4e3){Vt(),jt(),Rt(),At(),setTimeout(()=>he(),e)}function Rt(){for(const e of yt){const t=e.steps.filter(l=>l.status!=="skipped").length,c=e.steps.filter(l=>l.status==="done").length,a=e.steps.some(l=>l.status==="active"),i=t>0?Math.round(c/t*100):0,d=document.getElementById(`nf-pct-${e.id}`);d&&(d.textContent=`${i}%`);const s=document.getElementById(`nf-modbar-${e.id}`);s&&(s.style.width=`${i}%`);const r=document.getElementById(`nf-mod-${e.id}`);r&&(r.classList.remove("nf-active","nf-done"),i>=100?r.classList.add("nf-done"):a&&r.classList.add("nf-active"))}}function xe(e){var a,i,d,s;It=e;const t=new Map;for(const r of Y)t.set(r.stepId,{status:r.status,progress:r.progress});Y=St(e);for(const r of Y){const l=t.get(r.stepId);l&&(r.status=l.status,l.progress!==void 0&&(r.progress=l.progress))}if(re(),e>1){const r=yt.find(l=>l.id==="video");if(r){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=r.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=r.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=r.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((s=r.steps.find(p=>p.id==="vid-wait"))==null?void 0:s.status)||"waiting",progress:0}];for(let p=2;p<=e;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});r.steps=l,Zt(r)}}const c=yt.find(r=>r.id==="render");if(c&&e>1){const r=c.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const l=c.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),Zt(c)}Rt(),At()}function Zt(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let s="";i.progress!==void 0&&(s=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${s}
        `,t.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(a)}function Qt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Qt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},T=e=>{console.warn(`[Netflow AI] ${e}`);try{Qt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},_t=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Lt=/Win/i.test(navigator.userAgent),ut=_t?"🍎 Mac":Lt?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ut}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),a=Math.round(e.clientX),i=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${a},${i}) → <${c}> "${d}"`)},!0);const m=e=>new Promise(t=>setTimeout(t,e));function dt(){return!!window.__NETFLOW_STOP__}function te(){var a;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of c){if(t&&t.contains(i))continue;const d=(i.textContent||"").trim().toLowerCase();if(!(d.length>200||d.length<5)){for(const s of e)if(d.includes(s))return((a=i.textContent)==null?void 0:a.trim())||s}}return null}async function lt(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,a=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:c,clientY:a,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),await m(50),e.click()}function ye(e){const t=e.getBoundingClientRect(),c=t.left+t.width/2,a=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:c,clientY:a};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function $e(e){const t=[],c=document.querySelectorAll("i");for(const a of c){if((a.textContent||"").trim()!==e)continue;let d=a,s=null,r=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const b=p.width*p.height;b<r&&(s=d,r=b)}}s&&!t.includes(s)&&t.push(s)}return t.sort((a,i)=>{const d=a.getBoundingClientRect(),s=i.getBoundingClientRect();return d.left-s.left}),t}function Dt(e=!1){const t=[],c=document.querySelectorAll("video");for(const s of c){let r=s.parentElement;for(let l=0;l<10&&r;l++){const p=r.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){t.push({el:r,left:p.left});break}r=r.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const s of a){const r=(s.textContent||"").trim();if(r==="play_arrow"||r==="play_circle"||r==="videocam"){let l=s.parentElement;for(let p=0;p<10&&l;p++){const b=l.getBoundingClientRect();if(b.width>120&&b.height>80&&b.width<window.innerWidth*.7&&b.top>=-50&&b.left<window.innerWidth*.75){t.push({el:l,left:b.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const s of i){const r=(s.alt||"").toLowerCase();if(r.includes("video")||r.includes("วิดีโอ")){let l=s.parentElement;for(let p=0;p<10&&l;p++){const b=l.getBoundingClientRect();if(b.width>120&&b.height>80&&b.width<window.innerWidth*.7&&b.top>=-50&&b.left<window.innerWidth*.75){t.push({el:l,left:b.left});break}l=l.parentElement}}}const d=Array.from(new Set(t.map(s=>s.el))).map(s=>t.find(r=>r.el===s));if(d.sort((s,r)=>s.left-r.left),d.length>0){const s=d[0].el,r=s.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),s}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function ve(){const e=$e("image");if(e.length>0){const c=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const c of t){let a=c.parentElement;for(let i=0;i<10&&a;i++){const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Ee(e,t){var r;const[c,a]=e.split(","),i=((r=c.match(/:(.*?);/))==null?void 0:r[1])||"image/png",d=atob(a),s=new Uint8Array(d.length);for(let l=0;l<d.length;l++)s[l]=d.charCodeAt(l);return new File([s],t,{type:i})}function vt(e){var a;const t=[],c=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of c)if(((a=i.textContent)==null?void 0:a.trim())===e){const d=i.closest("button");d&&t.push(d)}return t}function ke(){const e=[...vt("add"),...vt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const s=(i.textContent||"").trim();if(s==="+"||s==="add")return i}}return null}let t=null,c=0;for(const a of e){const i=a.getBoundingClientRect();i.y>c&&(c=i.y,t=a)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${c.toFixed(0)}`),t}function ee(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=vt(a);let d=null,s=0;for(const r of i){const l=r.getBoundingClientRect();l.y>s&&(s=l.y,d=r)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${s.toFixed(0)}`),d}const e=document.querySelectorAll("button");let t=null,c=0;for(const a of e){const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,s=i.y+i.x+(d?1e3:0);s>c&&(c=s,t=a)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const a of e){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function ne(){const e=document.querySelectorAll("textarea");for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const t=document.querySelectorAll('[contenteditable="true"]');for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of c){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return e.length>0?e[e.length-1]:null}async function Gt(e,t){var c,a,i,d;e.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(r),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:s});e.dispatchEvent(l),await m(800);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(s){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await m(100);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(s);const r=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(r),await m(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await m(200);const s=new DataTransfer;s.setData("text/plain",t),s.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const r=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:s});e.dispatchEvent(r),await m(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(s){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((c=navigator.clipboard)!=null&&c.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const r=document.createElement("textarea");r.value=t,r.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(r),r.focus(),r.select(),document.execCommand("copy"),document.body.removeChild(r),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await m(200),document.execCommand("paste"),await m(500);const s=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${s.length} ตัวอักษร)`);return}}catch(s){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${s.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const s=Object.keys(e).find(r=>r.startsWith("__reactFiber$")||r.startsWith("__reactInternalInstance$"));if(s){let r=e[s];for(let l=0;l<30&&r;l++){const p=r.memoizedProps,b=r.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const C=p.editor;C.selection,C.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=b==null?void 0:b.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),b.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}r=r.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(s){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${s.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ce(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const c of t)e.push({input:c,origType:"file"}),c.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function Me(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ut})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ut})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Ie(e,t,c){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(b=>b.input)];for(const b of a)!i.includes(b)&&b.offsetParent===null&&i.push(b);for(const b of i)b.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ut})`),!1;let s;if(c&&c.size>0){const b=Array.from(d).filter(C=>!c.has(C));b.length>0?(s=b[b.length-1],n(`เล็งเป้า file input ใหม่ (${b.length} ใหม่, ${d.length} ทั้งหมด)`)):(s=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else s=d[d.length-1];const r=new DataTransfer;r.items.add(t);try{s.files=r.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=s.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(b){n(`กำหนด target.files ล้มเหลว: ${b.message} — ลอง defineProperty`);try{Object.defineProperty(s,"files",{value:r.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(C){return T(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${C.message}`),!1}}const l=s._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),s.dispatchEvent(new Event("change",{bubbles:!0})),s.dispatchEvent(new Event("input",{bubbles:!0}));try{const b=new DataTransfer;b.items.add(t);const C=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:b});s.dispatchEvent(C),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ut}`),!0}function Et(){let e=0;const t=document.getElementById("netflow-engine-overlay"),c=document.querySelectorAll("img");for(const i of c){if(t&&t.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.src&&i.offsetParent!==null&&e++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const i of a){if(t&&t.contains(i))continue;const d=i.getBoundingClientRect();d.bottom>window.innerHeight*.6&&d.width>20&&d.width<200&&d.height>20&&d.height<200&&i.offsetParent!==null&&e++}return e}async function oe(e,t){var b;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const c=Ee(e,t);n(`ขนาดไฟล์: ${(c.size/1024).toFixed(1)} KB`);const a=Et();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async(C,D=8e3)=>{const g=Date.now();for(;Date.now()-g<D;){const o=Et();if(o>a)return n(`✅ [${C}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${o}`),!0;await m(500)}return n(`⚠️ [${C}] รูปย่อไม่เพิ่ม (ยังคง ${Et()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=ke();if(!d)return T("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const s=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${s.size} ตัว`);const r=Me();let l=Ce();const p=new MutationObserver(C=>{for(const D of C)for(const g of D.addedNodes)if(g instanceof HTMLInputElement&&g.type==="file"&&(g.type="text",l.push({input:g,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),g instanceof HTMLElement){const o=g.querySelectorAll('input[type="file"]');for(const f of o)f.type="text",l.push({input:f,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let C=!1;const D=Date.now();for(;!C&&Date.now()-D<5e3;){const o=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const f of o){if(f===d)continue;const E=f.querySelectorAll("i");for(const k of E){const w=((b=k.textContent)==null?void 0:b.trim())||"";if((w==="upload"||w==="upload_file")&&!Array.from(f.querySelectorAll("i")).map(_=>{var R;return(R=_.textContent)==null?void 0:R.trim()}).includes("drive_folder_upload")){f.click(),C=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${w}) ✅`);break}}if(C)break}if(!C)for(const f of o){if(f===d)continue;const E=f.childNodes.length<=5?(f.textContent||"").trim():"";if(E.length>0&&E.length<40){const k=E.toLowerCase();if(k==="upload"||k==="อัปโหลด"||k==="อัพโหลด"||k.includes("upload image")||k.includes("upload photo")||k.includes("อัปโหลดรูปภาพ")||k.includes("อัพโหลดรูปภาพ")||k.includes("from computer")||k.includes("จากคอมพิวเตอร์")){f.click(),C=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${E}") ✅`);break}}}C||await m(500)}return C?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Ie(l,c,s)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(T(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(T("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),r();for(const C of l)C.input.type!=="file"&&(C.input.type="file")}}async function Pe(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const c=document.querySelectorAll("button");let a=null;for(const g of c){const o=g.textContent||"";if((o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))&&g.getBoundingClientRect().bottom>window.innerHeight*.7){a=g,n(`พบปุ่มตั้งค่าจากข้อความ: "${o.substring(0,30).trim()}"`);break}}if(!a)for(const g of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const o=vt(g);for(const f of o)if(f.getBoundingClientRect().bottom>window.innerHeight*.7){a=f,n(`พบปุ่มตั้งค่าจากไอคอน: ${g}`);break}if(a)break}if(!a)return T("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2,r={bubbles:!0,cancelable:!0,clientX:d,clientY:s,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let l=!1,p=null;const b=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const g of b){const o=g.getAttribute("aria-controls")||"",f=g.id||"";if(o.toUpperCase().includes("IMAGE")||f.toUpperCase().includes("IMAGE")){p=g,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const g of document.querySelectorAll('[role="tab"]')){const o=g.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=g,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const g of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const o=(g.textContent||"").trim();if((o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ")&&!o.includes("Video")&&!o.includes("วิดีโอ")){p=g,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}if(p){const g=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(g==="active"||o==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const f=p.getBoundingClientRect(),E={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),p.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",E)),p.dispatchEvent(new MouseEvent("click",E)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const C=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const g of document.querySelectorAll("button, [role='tab'], [role='option']")){const o=(g.textContent||"").trim();if(o===C||o.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const f=g.getBoundingClientRect(),E={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),g.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",E)),g.dispatchEvent(new MouseEvent("click",E)),n(`เลือกทิศทาง: ${C}`),await m(400);break}}const D=`x${t}`;for(const g of document.querySelectorAll("button, [role='tab'], [role='option']"))if((g.textContent||"").trim()===D){const f=g.getBoundingClientRect(),E={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),g.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",E)),g.dispatchEvent(new MouseEvent("click",E)),n(`เลือกจำนวน: ${D}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),a.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",r)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",r)),a.dispatchEvent(new MouseEvent("click",r)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function Se(e){var w,M,_,R;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,c=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=c?c[1]:"unknown",i=_t?"macOS":Lt?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",d=_t?((M=(w=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:w[1])==null?void 0:M.replace(/_/g,"."))||"":Lt&&((_=t.match(/Windows NT ([0-9.]+)/))==null?void 0:_[1])||"",s=navigator.language||"unknown",r=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${s} | หน้าจอ: ${r} | แพลตฟอร์ม: ${ut}`),n("══════════════════════════════════════════");try{Nt(e.theme)}catch{}try{Jt()}catch(h){console.warn("Overlay show error:",h)}const l=[],p=[];try{F("settings","active");const h=e.orientation||"horizontal",O=e.outputCount||1,u=await Pe(h,O);l.push(u?"✅ Settings":"⚠️ Settings"),F("settings",u?"done":"error")}catch(h){T(`ตั้งค่าผิดพลาด: ${h.message}`),l.push("⚠️ Settings"),F("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const b=()=>{const h=document.querySelectorAll("span, div, p, label");for(const O of h){const u=(O.textContent||"").trim();if(/^\d{1,3}%$/.test(u)){if(u==="100%")return null;const x=O.getBoundingClientRect();if(x.width>0&&x.height>0&&x.top>0&&x.top<window.innerHeight)return u}}return null},C=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await m(2e3);const O=Date.now(),u=6e4;let x="",P=Date.now();const S=15e3;for(;Date.now()-O<u;){const v=b();if(v){if(v!==x)x=v,P=Date.now();else if(Date.now()-P>S){n(`✅ อัพโหลด ${h} — % ค้างที่ ${v} นาน ${S/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${v} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}T(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${u/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){F("upload-char","active");try{const h=await oe(e.characterImage,"character.png");l.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||p.push("character upload failed"),F("upload-char",h?"done":"error")}catch(h){T(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),F("upload-char","error")}await C("character")}else ft("upload-char");if(e.productImage){F("upload-prod","active");try{const h=await oe(e.productImage,"product.png");l.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||p.push("product upload failed"),F("upload-prod",h?"done":"error")}catch(h){T(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),l.push("❌ สินค้า"),p.push("product upload error"),F("upload-prod","error")}await C("product")}else ft("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const D=b();D&&(n(`⚠️ อัพโหลดยังแสดง ${D} — รอเพิ่มเติม...`),await C("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const g=(e.characterImage?1:0)+(e.productImage?1:0);if(g>0){let h=Et();h<g&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${g} — รอ 3 วินาที...`),await m(3e3),h=Et()),h>=g?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${g}`):T(`⚠️ คาดว่าจะมี ${g} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(dt()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Ft(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),F("img-prompt","active"),await m(1e3);const o=ne();o?(await Gt(o,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),F("img-prompt","done")):(T("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),F("img-prompt","error")),await m(800);const f=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&f.add(h.src)}),n(`บันทึกรูปเดิม: ${f.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),F("img-generate","active"),await m(500);const E=ee();if(E){const h=E.getBoundingClientRect(),O=h.left+h.width/2,u=h.top+h.height/2,x={bubbles:!0,cancelable:!0,clientX:O,clientY:u,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",x)),await m(80),E.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",x)),E.dispatchEvent(new MouseEvent("click",x)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await m(500),E.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",x)),await m(80),E.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",x)),E.dispatchEvent(new MouseEvent("click",x)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),F("img-generate","done")}else T("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),F("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),F("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const h=document.getElementById("netflow-engine-overlay"),O=()=>{const v=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of v){if(h&&h.contains($))continue;const A=($.textContent||"").trim();if(A.length>10)continue;const L=A.match(/(\d{1,3})\s*%/);if(!L)continue;const y=parseInt(L[1],10);if(y<1||y>100)continue;const I=$.getBoundingClientRect();if(!(I.width===0||I.width>150)&&!(I.top<0||I.top>window.innerHeight))return y}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let u=null,x=-1,P=0;const S=Date.now();for(;!u&&Date.now()-S<18e4;){const v=document.querySelectorAll("img");for(const $ of v){if(f.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;const L=$.getBoundingClientRect();if(L.width>120&&L.height>120&&L.top>0&&L.top<window.innerHeight*.85){const y=$.closest("div");if(y){u=y,n(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...`);break}}}if(!u)for(const $ of v){if(f.has($.src))continue;const A=$.closest("div"),L=(A==null?void 0:A.textContent)||"";if(L.includes("product.png")||L.includes("character.png")||L.includes(".png")||L.includes(".jpg"))continue;const y=$.getBoundingClientRect();if(y.width>120&&y.height>120&&y.top>0&&y.top<window.innerHeight*.85){const I=$.closest("div");if(I){u=I,n(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...`);break}}}if(!u){if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=te();if($){T(`❌ สร้างรูปล้มเหลว: ${$}`),p.push(`image gen failed: ${$}`),F("img-wait","error");break}const A=O();A!==null?(A!==x&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${A}%`),x=A,F("img-wait","active",A)),P=Date.now()):x>30&&Math.floor((Date.now()-P)/1e3)>=3&&n(`🖼️ % หายที่ ${x}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!u)T("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),F("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),F("img-wait","done",100);const v=u.getBoundingClientRect(),$=v.left+v.width/2,A=v.top+v.height/2,L={bubbles:!0,cancelable:!0,clientX:$,clientY:A};u.dispatchEvent(new PointerEvent("pointerenter",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseenter",L)),u.dispatchEvent(new PointerEvent("pointerover",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseover",L)),u.dispatchEvent(new PointerEvent("pointermove",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousemove",L)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let y=null;for(const I of["more_vert","more_horiz","more"]){const B=vt(I);for(const H of B){const N=H.getBoundingClientRect();if(N.top>=v.top-20&&N.top<=v.bottom&&N.right>=v.right-150&&N.right<=v.right+20){y=H;break}}if(y)break}if(!y){const I=document.querySelectorAll("button");for(const B of I){const H=B.getBoundingClientRect();if(H.width<50&&H.height<50&&H.top>=v.top-10&&H.top<=v.top+60&&H.left>=v.right-80){const N=B.querySelectorAll("i");for(const J of N)if((((R=J.textContent)==null?void 0:R.trim())||"").includes("more")){y=B;break}if(y)break;const z=B.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){y=B;break}}}}if(!y)T("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const I=y.getBoundingClientRect(),B=I.left+I.width/2,H=I.top+I.height/2,N={bubbles:!0,cancelable:!0,clientX:B,clientY:H,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",N)),await m(80),y.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",N)),y.dispatchEvent(new MouseEvent("click",N)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let z=null;const J=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of J){const j=(U.textContent||"").trim();if(j.includes("ทำให้เป็นภาพเคลื่อนไหว")||j.includes("Animate")||j.includes("animate")){z=U;break}}if(!z)T("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const U=z.getBoundingClientRect(),j=U.left+U.width/2,Q=U.top+U.height/2,G={bubbles:!0,cancelable:!0,clientX:j,clientY:Q,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",G)),await m(80),z.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",G)),z.dispatchEvent(new MouseEvent("click",G)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),F("animate","done"),await m(3e3)}}}}catch(h){T(`ขั้น 4 ผิดพลาด: ${h.message}`),l.push("⚠️ Animate")}if(dt()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Ft(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),F("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let h=!1;const O=document.querySelectorAll("button, span, div");for(const P of O){const S=(P.textContent||"").trim(),v=P.getBoundingClientRect();if((S==="วิดีโอ"||S==="Video"||S.includes("วิดีโอ"))&&v.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const u=ne();u?(await Gt(u,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),F("vid-prompt","done")):(T("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),p.push("video prompt input not found"),F("vid-prompt","error")),await m(1e3),F("vid-generate","active");const x=ee();if(x){const P=x.getBoundingClientRect(),S=P.left+P.width/2,v=P.top+P.height/2,$={bubbles:!0,cancelable:!0,clientX:S,clientY:v,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",$)),await m(80),x.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",$)),x.dispatchEvent(new MouseEvent("click",$)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),F("vid-generate","done"),await m(500),x.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",$)),await m(80),x.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",$)),x.dispatchEvent(new MouseEvent("click",$)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else T("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),F("vid-generate","error")}catch(h){T(`ขั้น 5 ผิดพลาด: ${h.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ft("animate"),ft("vid-prompt"),ft("vid-generate"),ft("vid-wait");if(e.videoPrompt){F("vid-wait","active");const h=e.sceneCount||1,O=e.videoScenePrompts||[e.videoPrompt];if(h>1)try{xe(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);const u=document.getElementById("netflow-engine-overlay"),x=()=>{const v=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of v){if(u&&u.contains($))continue;const A=($.textContent||"").trim();if(A.length>10)continue;const L=A.match(/(\d{1,3})\s*%/);if(!L)continue;const y=parseInt(L[1],10);if(y<1||y>100)continue;const I=$.getBoundingClientRect();if(!(I.width===0||I.width>150)&&!(I.top<0||I.top>window.innerHeight))return y}return null},P=async(v=6e5)=>{n("รอการสร้างวิดีโอ..."),F("vid-wait","active"),await m(5e3);const $=()=>{const G=document.querySelectorAll("div, span, p, label, strong, small");let V=0;for(const et of G){if(u&&u.contains(et))continue;const gt=(et.textContent||"").trim();if(gt.includes("%")&&gt.length<15){const q=et.tagName.toLowerCase(),tt=et.className&&typeof et.className=="string"?et.className.split(/\s+/).slice(0,2).join(" "):"",Z=et.getBoundingClientRect();if(n(`  🔍 "${gt}" ใน <${q}.${tt}> ที่ (${Z.left.toFixed(0)},${Z.top.toFixed(0)}) w=${Z.width.toFixed(0)}`),V++,V>=5)break}}V===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},A=Dt();n(A?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const L=Date.now();let y=-1,I=0,B=!1;for(;Date.now()-L<v;){const G=x();if(G!==null){if(G!==y&&(n(`ความคืบหน้าวิดีโอ: ${G}%`),y=G,F("vid-wait","active",G)),I=Date.now(),G>=100){n("✅ ตรวจพบ 100%!"),B=!0;break}}else if(y>30){const V=Math.floor((Date.now()-I)/1e3);if(V>=5){n(`✅ % หายไปที่ ${y}% (หาย ${V} วินาที) — วิดีโอเสร็จ!`),B=!0;break}n(`⏳ % หายที่ ${y}% — ยืนยันใน ${5-V} วินาที...`)}else{const V=Math.floor((Date.now()-L)/1e3);V%15<3&&n(`⏳ รอ... (${V} วินาที) ไม่พบ %`)}if(!B&&y>0&&Dt(!0)&&!A){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${y}% — วิดีโอเสร็จ!`),B=!0;break}if(dt())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(y<1){const V=te();if(V)return T(`❌ สร้างวิดีโอล้มเหลว: ${V}`),null}await m(3e3)}const H=Dt();if(!H)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),F("vid-wait","error"),null;const N=H;B?(F("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const z=N.getBoundingClientRect();let J=z.left+z.width/2,U=z.top+z.height/2,j=N;const Q=N.querySelector("video, img, canvas");if(Q){const G=Q.getBoundingClientRect();G.width>50&&G.height>50&&(J=G.left+G.width/2,U=G.top+G.height/2,j=Q,n(`🎯 พบรูปย่อ <${Q.tagName.toLowerCase()}> ในการ์ดที่ (${J.toFixed(0)},${U.toFixed(0)}) ${G.width.toFixed(0)}x${G.height.toFixed(0)}`))}else U=z.top+z.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${J.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${J.toFixed(0)}, ${U.toFixed(0)})...`),ye(j);for(let G=0;G<8;G++){const V={bubbles:!0,cancelable:!0,clientX:J+G%2,clientY:U};j.dispatchEvent(new PointerEvent("pointermove",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),j.dispatchEvent(new MouseEvent("mousemove",V)),await m(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:h,scenePrompts:O,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${h} ฉาก, ${O.length} prompts, theme: ${e.theme})`)}catch(G){n(`⚠️ ไม่สามารถบันทึก pending action: ${G.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await S(N),j!==N&&await S(j),n("✅ คลิกการ์ดวิดีโอเสร็จ"),N},S=async v=>{const $=v.getBoundingClientRect(),A=$.left+$.width/2,L=$.top+$.height/2,y={bubbles:!0,cancelable:!0,clientX:A,clientY:L,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),v.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",y)),v.dispatchEvent(new MouseEvent("click",y)),await m(50),v.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{await P()?(l.push("✅ Video Complete"),F("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action")):(T("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),F("vid-wait","error"))}catch(v){T(`ขั้น 6 ผิดพลาด: ${v.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${v.message}`)}}const k=p.length===0;try{Ft(k?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:k,message:k?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:k?"done":"partial"}}async function Te(e,t=[],c){var k;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{c&&Nt(c)}catch{}try{Jt()}catch{}await m(1500);const a=(()=>{for(const w of document.querySelectorAll("button")){const M=w.querySelectorAll("i");for(const R of M){const h=(R.textContent||"").trim();if(h==="volume_up"||h==="volume_off"||h==="volume_mute"){const O=w.getBoundingClientRect();if(O.width>0&&O.height>0)return w}}const _=(w.getAttribute("aria-label")||"").toLowerCase();if(_.includes("mute")||_.includes("ปิดเสียง")){const R=w.getBoundingClientRect();if(R.width>0&&R.height>0)return w}}return null})();if(a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);const w=(y,I="button, [role='menuitem'], [role='option'], li, span, div[role='button'], div")=>{for(const B of document.querySelectorAll(I)){const H=(B.textContent||"").trim();if(H.includes(y)&&H.length<100){const N=B.getBoundingClientRect();if(N.width>0&&N.height>0&&N.top>=0)return B}}return null};for(let y=2;y<=e;y++){const I=t[y-1];if(!I){T(`ไม่พบ prompt สำหรับฉากที่ ${y}`);continue}n(`── ฉากที่ ${y}/${e}: วาง prompt + generate ──`);let B=null;const H=Date.now();for(;!B&&Date.now()-H<1e4;){const q=document.querySelectorAll("[data-slate-editor='true']");if(q.length>0&&(B=q[q.length-1]),!B){const tt=document.querySelectorAll("[role='textbox'][contenteditable='true']");tt.length>0&&(B=tt[tt.length-1])}B||await m(1e3)}if(!B){T("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${B.tagName.toLowerCase()}> ${B.className.substring(0,40)}`),await Gt(B,I),n(`วาง prompt ฉาก ${y} (${I.length} ตัวอักษร) ✅`),await m(1e3);const N=B.getBoundingClientRect();let z=null,J=1/0;for(const q of document.querySelectorAll("button")){if(q.disabled)continue;const tt=q.querySelectorAll("i");let Z=!1;for(const mt of tt)if((mt.textContent||"").trim()==="arrow_forward"){Z=!0;break}if(!Z)continue;const ct=q.getBoundingClientRect();if(ct.width<=0||ct.height<=0)continue;const kt=Math.abs(ct.top-N.top)+Math.abs(ct.right-N.right);kt<J&&(J=kt,z=q)}if(!z)for(const q of document.querySelectorAll("button")){const tt=q.querySelectorAll("i");for(const Z of tt)if((Z.textContent||"").trim()==="arrow_forward"){const ct=q.getBoundingClientRect();if(ct.width>0&&ct.height>0){z=q;break}}if(z)break}if(!z){T("ไม่พบปุ่ม Generate/Send");return}await lt(z),n(`คลิก Generate ฉาก ${y} ✅`),n(`── รอวิดีโอฉาก ${y} gen เสร็จ ──`),await m(5e3);const U=document.getElementById("netflow-engine-overlay");let j=0,Q=0;const G=Date.now(),V=6e5,et=5e3;let gt=!1;for(;Date.now()-G<V;){let q=null;const tt=document.querySelectorAll("div, span, p, label, strong, small");for(const Z of tt){if(U&&U.contains(Z))continue;const kt=(Z.textContent||"").trim().match(/^(\d{1,3})%$/);if(kt){const mt=Z.getBoundingClientRect();if(mt.width>0&&mt.height>0&&mt.width<120&&mt.height<60){q=parseInt(kt[1],10);break}}}if(q!==null)q!==j&&(n(`🎬 ฉาก ${y} ความคืบหน้า: ${q}%`),j=q),Q=0;else if(j>0){if(Q===0)Q=Date.now(),n(`🔍 ฉาก ${y}: % หายไป (จาก ${j}%) — กำลังยืนยัน...`);else if(Date.now()-Q>=et){n(`✅ ฉาก ${y}: % หายไป ${et/1e3} วินาที — เจนเสร็จ!`),gt=!0;break}}if(dt()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}gt||T(`ฉาก ${y} หมดเวลา`),n(`✅ ฉาก ${y} เสร็จแล้ว`),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──"),await m(2e3);let M=null;const _=Date.now();for(;!M&&Date.now()-_<1e4;){for(const y of document.querySelectorAll("button, [role='button']")){const I=(y.textContent||"").trim().toLowerCase();if((I.includes("download")||I.includes("ดาวน์โหลด"))&&I.length<80){const B=y.getBoundingClientRect();if(B.width>0&&B.height>0){M=y;break}}}M||await m(1e3)}if(!M){T("ไม่พบปุ่มดาวน์โหลด");return}await lt(M),n("คลิกดาวน์โหลดแล้ว ✅"),await m(1500);let R=null;const h=Date.now();for(;!R&&Date.now()-h<5e3;)R=w("Full Video"),R||await m(500);if(!R){T("ไม่พบ Full Video");return}await lt(R),n("คลิก Full Video ✅"),await m(1500);const O=Date.now();let u=null;const x=Date.now();for(;!u&&Date.now()-x<5e3;)u=w("720p"),u||await m(500);if(!u){T("ไม่พบ 720p");return}await lt(u),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const P=Date.now();let S=!1,v=!1,$=0;for(;Date.now()-P<3e5;){const I=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(I.includes("download complete")||I.includes("ดาวน์โหลดเสร็จ")){n("✅ Download complete!"),S=!0;break}for(const H of document.querySelectorAll("div, span, p")){const N=(H.textContent||"").trim().toLowerCase();if(N.length<60&&(N.includes("download complete")||N.includes("ดาวน์โหลดเสร็จ"))){n("✅ Download complete! (element)"),S=!0;break}}if(S)break;if(I.includes("downloading your extended video")||I.includes("กำลังดาวน์โหลด")){v=!0,$=0;const H=Math.floor((Date.now()-P)/1e3);n(`⏳ กำลังดาวน์โหลด... (${H} วินาที)`)}else if(v){if($===0)$=Date.now(),n("🔍 ข้อความดาวน์โหลดหายไป — กำลังยืนยัน...");else if(Date.now()-$>=3e3){n("✅ ดาวน์โหลดเสร็จ (ข้อความหายไป 3 วินาที)"),S=!0;break}}if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await m(2e3)}if(!S){T("ดาวน์โหลดหมดเวลา");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let A=!1;const L=Date.now();for(;Date.now()-L<6e4&&!A;){try{await new Promise(y=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:O},I=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):I!=null&&I.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${I.message}`),A=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${I==null?void 0:I.message}`),y()})})}catch(y){T(`ตรวจสอบผิดพลาด: ${y.message}`)}A||await m(3e3)}A||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const i=(w,M="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const _ of document.querySelectorAll(M)){const R=(_.textContent||"").trim();if(R.includes(w)&&R.length<100){const h=_.getBoundingClientRect();if(h.width>0&&h.height>0&&h.top>=0)return _}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const s=Date.now();for(;!d&&Date.now()-s<1e4;){for(const w of document.querySelectorAll("button, [role='button']")){const M=(w.textContent||"").trim(),_=M.toLowerCase();if((_.includes("download")||_.includes("ดาวน์โหลด"))&&M.length<80){const R=w.getBoundingClientRect();if(R.width>0&&R.height>0){d=w;break}}}if(!d)for(const w of document.querySelectorAll("button")){const M=(w.getAttribute("aria-label")||"").toLowerCase();if(M.includes("download")||M.includes("ดาวน์")){const _=w.getBoundingClientRect();if(_.width>0&&_.height>0){d=w;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!d){T("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await lt(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const r=Date.now();let l=null;const p=Date.now();for(;!l&&Date.now()-p<5e3;)l=i("1080p"),l||(n("รอ 1080p..."),await m(500));if(!l){T("ไม่พบ 1080p");return}await lt(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const b=Date.now();let C=!1,D=!1,g=0;const o=3e3;for(;Date.now()-b<3e5;){const M=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(M.includes("upscaling complete")||M.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),C=!0;break}for(const R of document.querySelectorAll("div, span, p")){const h=(R.textContent||"").trim().toLowerCase();if(h.length<60&&(h.includes("upscaling complete")||h.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(k=R.textContent)==null?void 0:k.trim()}")`),C=!0;break}}if(C)break;if(M.includes("upscaling your video")||M.includes("กำลังอัปสเกล")){D=!0,g=0;const R=Math.floor((Date.now()-b)/1e3);n(`⏳ กำลังอัปสเกล... (${R} วินาที)`)}else if(D){if(g===0)g=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-g>=o){n(`✅ ข้อความ Upscaling หายไป ${o/1e3} วินาที — เสร็จ!`),C=!0;break}}else{const R=Math.floor((Date.now()-b)/1e3);R%10<3&&n(`⏳ รอ Upscale... (${R} วินาที)`)}if(dt()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!C){T("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let f=!1;const E=Date.now();for(;Date.now()-E<6e4&&!f;){try{await new Promise(w=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:r},M=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):M!=null&&M.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${M.message}`),f=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${M==null?void 0:M.message}`),w()})})}catch(w){T(`ตรวจสอบผิดพลาด: ${w.message}`)}f||await m(3e3)}f||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function Ae(){try{const e=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{if(chrome.runtime.lastError){d(null);return}d((s==null?void 0:s.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const c=Date.now()-e.timestamp;if(c>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:e},()=>d())}),await m(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",s=>{const r=s==null?void 0:s.netflow_pending_action;d((r==null?void 0:r._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(c/1e3)} วินาที)`),e.action==="mute_video"?await Te(e.sceneCount||1,e.scenePrompts||[],e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,c)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),c({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Se(e).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>console.error("[Netflow AI] Generate error:",a)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,c({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return c({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return c({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const a=ve();if(!a){T("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),d=i.left+i.width/2,s=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${s.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let r=0;r<2;r++){const l=document.elementFromPoint(d,s);l?(await lt(l),n(`คลิก ${r+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await lt(a),n(`คลิก ${r+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Ae(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const c=t.tagName.toLowerCase(),a=Math.round(e.clientX),i=Math.round(e.clientY),d=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${a},${i}) → <${c}> "${d}"`)},!0)})();
