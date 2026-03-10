(function(){"use strict";const le={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let K=le.green,be=null;function Ae(t){t&&le[t]&&(be=t,K=le[t],Ye(),requestAnimationFrame(()=>ut()))}function Et(){if(be&&le[be])return le[be];try{const t=localStorage.getItem("netflow_app_theme");if(t&&le[t])return le[t]}catch{}return le.green}let te=0,ne=255,oe=65;function Ye(){const t=K.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(te=parseInt(t[1],16),ne=parseInt(t[2],16),oe=parseInt(t[3],16))}const Xe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',je='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let U=null,Q=null,ce=null,Ke=0,Me=null,we=null,Se=null,Re=0,de=!1,re=null,xe=null,ve=null,ye=1,W=[];function Be(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const pe=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];W=Be(1);function kt(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,o=t.hex,d=t.accentHex,l=t.doneHex,s=(()=>{const g=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const i=E=>Math.min(255,E+80);return`#${[1,2,3].map(E=>i(parseInt(g[E],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const g=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const i=E=>Math.min(255,E+60);return`#${[1,2,3].map(E=>i(parseInt(g[E],16)).toString(16).padStart(2,"0")).join("")}`})(),p=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),u=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,k=p?parseInt(p[1],16)/u:0,A=p?parseInt(p[2],16)/u:1,T=p?parseInt(p[3],16)/u:.25,y=g=>`${Math.round(k*g)}, ${Math.round(A*g)}, ${Math.round(T*g)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${r},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${r},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${y(18)},0.94) 0%, rgba(${y(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
    /* backdrop-filter removed — bg is 94%+ opaque, blur is invisible but costs ~10ms/frame */
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
    opacity: 0.85;
}

/* ─── Hex Grid Overlay ─── */
#nf-hex-grid-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.24;
}

/* ─── Vignette Overlay (enhanced with theme tint at edges) ─── */
#netflow-engine-overlay .nf-vignette {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%),
        radial-gradient(ellipse at 0% 0%, rgba(${e},0.12) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 100%, rgba(${r},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${r},0.06) 0%, transparent 35%);
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
        rgba(${e},0.045) 2px,
        rgba(${e},0.045) 4px
    );
    pointer-events: none;
    z-index: 1;
    contain: strict;
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
    border: 1.5px solid rgba(${e},0.24);
    pointer-events: none;
    z-index: 1;
    will-change: transform, opacity;
    animation: nf-pulse-expand 5s ease-out infinite;
}
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${r},0.18); }
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
    inset: -30px;
    background-image:
        radial-gradient(circle, rgba(${e},0.15) 1px, transparent 1px),
        radial-gradient(circle, rgba(${e},0.10) 1px, transparent 1px);
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
    inset: -30px;
    background-image:
        linear-gradient(rgba(${e},0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${e},0.08) 1px, transparent 1px);
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
    inset: -120px;
    will-change: transform;
    background: repeating-linear-gradient(
        35deg,
        transparent,
        transparent 70px,
        rgba(${r},0.054) 70px,
        rgba(${r},0.054) 71px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-pat-diag-r 28s linear infinite;
}

/* ─── Diagonal Traces B (-35° scrolling left) ─── */
.nf-pat-diag-b {
    position: absolute;
    inset: -120px;
    will-change: transform;
    background: repeating-linear-gradient(
        -35deg,
        transparent,
        transparent 90px,
        rgba(${e},0.042) 90px,
        rgba(${e},0.042) 91px
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
    inset: -120px;
    will-change: transform;
    background: repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 110px,
        rgba(${e},0.066) 110px,
        rgba(${e},0.066) 111px,
        transparent 111px,
        transparent 113px,
        rgba(${r},0.045) 113px,
        rgba(${r},0.045) 114px
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
    opacity: 0.09;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 200px 200px;
    contain: strict;
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
    background: radial-gradient(circle, rgba(${e},0.21) 0%, transparent 70%);
    top: -8%; left: -6%;
    animation: nf-orb-1 22s ease-in-out infinite alternate;
}
.nf-orb-2 {
    width: 450px; height: 450px;
    background: radial-gradient(circle, rgba(${r},0.16) 0%, transparent 70%);
    bottom: -6%; right: -4%;
    animation: nf-orb-2 28s ease-in-out infinite alternate;
}
.nf-orb-3 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(${e},0.13) 0%, transparent 70%);
    top: 35%; left: 55%;
    animation: nf-orb-3 32s ease-in-out infinite alternate;
}
.nf-orb-4 {
    width: 320px; height: 320px;
    background: radial-gradient(circle, rgba(${r},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${r},0.06) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    animation: nf-center-pulse 6s ease-in-out infinite;
}

@keyframes nf-center-pulse {
    0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
    50%      { opacity: 1; transform: translate(-50%, -50%) scale(1.15); }
}

/* ─── Extra Ambient Orbs (5-8) for 3x density ─── */
.nf-orb-5 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(${e},0.18) 0%, transparent 65%);
    top: 10%; right: 15%;
    animation: nf-orb-5 24s ease-in-out infinite alternate;
}
@keyframes nf-orb-5 {
    from { transform: translate(0, 0) scale(1); }
    to   { transform: translate(-180px, 160px) scale(1.25); }
}

/* ─── Pattern: Circuit Board Traces ─── */
.nf-pat-circuit {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(0deg, rgba(${e},0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${e},0.04) 1px, transparent 1px),
        linear-gradient(0deg, rgba(${r},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${r},0.025) 2px, transparent 2px);
    background-size: 80px 80px, 80px 80px, 160px 160px, 160px 160px;
    pointer-events: none;
    z-index: 0;
    contain: strict;
}

/* ─── Pattern: Honeycomb Hex ─── */
.nf-pat-honeycomb {
    position: absolute;
    inset: 0;
    background-image:
        radial-gradient(circle at 50% 0%, rgba(${e},0.06) 2px, transparent 2px),
        radial-gradient(circle at 0% 75%, rgba(${r},0.05) 2px, transparent 2px),
        radial-gradient(circle at 100% 75%, rgba(${e},0.05) 2px, transparent 2px);
    background-size: 40px 46px;
    pointer-events: none;
    z-index: 0;
    contain: strict;
}

/* ─── Pattern: Radar Sweep ─── */
.nf-pat-radar {
    position: absolute;
    left: 50%; top: 50%;
    width: 1000px; height: 1000px;
    transform: translate(-50%, -50%);
    background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(${e},0.1) 15deg,
        transparent 60deg,
        transparent 180deg,
        rgba(${r},0.06) 195deg,
        transparent 240deg,
        transparent 360deg
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    animation: nf-radar-spin 12s linear infinite;
    opacity: 0.6;
}
@keyframes nf-radar-spin {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
}

/* ─── Pattern: Horizontal Wave Lines ─── */
.nf-pat-wave-h {
    position: absolute;
    inset: -40px;
    will-change: transform;
    background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 18px,
        rgba(${r},0.035) 18px,
        rgba(${r},0.035) 19px
    );
    pointer-events: none;
    z-index: 0;
    animation: nf-wave-h 12s linear infinite;
}
@keyframes nf-wave-h {
    from { transform: translateY(0); }
    to   { transform: translateY(38px); }
}

/* ─── Pattern: Binary Dots ─── */
.nf-pat-binary {
    position: absolute;
    inset: -70px;
    will-change: transform;
    background-image:
        radial-gradient(circle, rgba(${e},0.07) 1.5px, transparent 1.5px),
        radial-gradient(circle, rgba(${r},0.05) 1px, transparent 1px);
    background-size: 18px 22px, 30px 36px;
    background-position: 0 0, 9px 11px;
    pointer-events: none;
    z-index: 0;
    animation: nf-binary-fall 15s linear infinite;
}
@keyframes nf-binary-fall {
    from { transform: translateY(0); }
    to   { transform: translateY(-66px); }
}

/* ─── Pattern: Crosshatch Fine Lines ─── */
.nf-pat-crosshatch {
    position: absolute;
    inset: 0;
    background:
        repeating-linear-gradient(
            45deg, transparent, transparent 40px,
            rgba(${e},0.03) 40px, rgba(${e},0.03) 41px
        ),
        repeating-linear-gradient(
            -45deg, transparent, transparent 40px,
            rgba(${r},0.025) 40px, rgba(${r},0.025) 41px
        );
    pointer-events: none;
    z-index: 0;
    contain: strict;
}

/* ─── Pattern: Concentric Ripples ─── */
.nf-pat-ripple-1 {
    position: absolute;
    left: 20%; top: 30%;
    width: 700px; height: 700px;
    transform: translate(-50%, -50%);
    background: repeating-radial-gradient(
        circle, transparent 0px, transparent 30px,
        rgba(${e},0.04) 30px, rgba(${e},0.04) 31px
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
    animation: nf-ripple-grow 8s ease-out infinite;
}
.nf-pat-ripple-2 {
    position: absolute;
    left: 80%; top: 70%;
    width: 550px; height: 550px;
    transform: translate(-50%, -50%);
    background: repeating-radial-gradient(
        circle, transparent 0px, transparent 25px,
        rgba(${r},0.035) 25px, rgba(${r},0.035) 26px
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 0;
    will-change: transform, opacity;
    animation: nf-ripple-grow 10s ease-out infinite;
    animation-delay: 3s;
}
@keyframes nf-ripple-grow {
    0%   { transform: translate(-50%, -50%) scale(0.3); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

/* ─── Pattern: Diamond Tiles ─── */
.nf-pat-diamond {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(45deg, rgba(${e},0.035) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(${e},0.035) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(${r},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${r},0.03) 75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 30px, 30px -30px, 30px 0px;
    pointer-events: none;
    z-index: 0;
    contain: strict;
}

/* ─── Pattern: Plasma Blobs ─── */
.nf-pat-plasma {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(ellipse at 20% 50%, rgba(${e},0.14) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(${r},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${r},0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(${e},0.09) 0%, transparent 45%);
    pointer-events: none;
    z-index: 0;
    will-change: opacity;
    animation: nf-plasma 20s ease-in-out infinite alternate;
}
@keyframes nf-plasma {
    0%   { opacity: 0.4; }
    50%  { opacity: 0.7; }
    100% { opacity: 0.5; }
}

/* ─── Pattern: Tech Scan Band ─── */
.nf-pat-techscan {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        transparent 0%,
        rgba(${e},0.08) 1.5%,
        rgba(${r},0.04) 2.5%,
        transparent 4%,
        transparent 100%
    );
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    animation: nf-techscan 6s linear infinite;
}
@keyframes nf-techscan {
    from { transform: translateY(-100%); }
    to   { transform: translateY(100%); }
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
    background: rgba(${y(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${y(180)},0.05),
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
            0 0 200px rgba(${y(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${y(180)},0.08),
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
    color: ${s};
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
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
    border-top: 1px solid rgba(${e},0.2);
    background: linear-gradient(180deg, rgba(${y(5)},0.95) 0%, rgba(${y(12)},0.98) 100%);
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
        rgba(${e},0.045) 2px,
        rgba(${e},0.045) 4px
    );
    pointer-events: none;
    z-index: 4;
}

/* HUD Frame — hidden */
.nf-engine-frame {
    display: none;
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

/* Frame corner accents — hidden */
.nf-frame-corner {
    display: none;
}

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
    padding-left: 0;
    z-index: 3;
    pointer-events: none;
}

.nf-brand-gear-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 72px;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter:
        drop-shadow(0 0 3px rgba(${e},0.7))
        drop-shadow(0 0 8px rgba(${e},0.3));
    opacity: 0.75;
    border-radius: 50%;
    overflow: hidden;
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

.nf-brand-gear-icon svg { overflow: hidden; }

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
    background: linear-gradient(180deg, rgba(${y(6)},0.75) 0%, rgba(${y(3)},0.92) 100%);
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
    background: rgba(${y(8)}, 0.88);
    border: none;
    border-radius: 12px;
    padding: 14px 17px;
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: box-shadow 0.4s;
    z-index: 5;
}

.nf-module.nf-active {
    box-shadow:
        0 0 30px rgba(${e},0.12),
        0 0 60px rgba(${e},0.06),
        inset 0 0 20px rgba(${e},0.03);
}

.nf-module.nf-done {
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
    display: none;
}
.nf-mod-br {
    display: none;
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
    background: linear-gradient(90deg, ${o}, ${s});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${l}, ${c});
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
    box-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${l}, ${c});
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
    background: rgba(${y(8)},0.8);
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

/* ─── Stop Automation Button ─── */
.nf-stop-btn {
    position: absolute;
    top: 14px;
    right: 110px;
    background: rgba(255, 60, 60, 0.08);
    border: 1px solid rgba(255, 60, 60, 0.25);
    border-radius: 8px;
    color: rgba(255, 100, 100, 0.8);
    font-size: 13px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 6px;
}
.nf-stop-btn:hover {
    background: rgba(255, 60, 60, 0.2);
    border-color: rgba(255, 60, 60, 0.6);
    color: #ff4444;
    text-shadow: 0 0 8px rgba(255,60,60,0.5);
}
.nf-stop-btn .nf-stop-icon {
    width: 10px;
    height: 10px;
    background: currentColor;
    border-radius: 2px;
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
    background: rgba(${y(8)}, 0.9);
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
    text-shadow: 0 0 4px rgba(255,255,255,0.08);
    transition: text-shadow 0.3s, color 0.3s;
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
.nf-proc-active .nf-proc-label {
    text-shadow:
        0 0 4px rgba(${e},0.6),
        0 0 10px rgba(${e},0.4),
        0 0 20px rgba(${e},0.2);
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${a},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${a},0.5);
    text-shadow: 0 0 4px rgba(${a},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${a},0.4),
        0 0 8px rgba(${a},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${l};
    box-shadow: 0 0 5px rgba(${a},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${a},0.1);
    color: ${c};
    text-shadow: 0 0 4px rgba(${a},0.3);
}

.nf-proc-error {
    color: rgba(239,68,68,0.8);
}
.nf-proc-error .nf-proc-label {
    text-shadow:
        0 0 3px rgba(239,68,68,0.4),
        0 0 8px rgba(239,68,68,0.2);
}
.nf-proc-error .nf-proc-dot { background: #ef4444; }
.nf-proc-error .nf-proc-badge {
    background: rgba(239,68,68,0.1);
    color: #f87171;
    text-shadow: 0 0 4px rgba(239,68,68,0.3);
}

.nf-proc-skipped {
    opacity: 0.15;
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESPONSIVE BREAKPOINTS — scale everything proportionally for all screens
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Extra Large (≥1600px) — plenty of room ─── */
@media (min-width: 1600px) {
    .nf-core-monitor { width: 58vw; max-width: 850px; }
}

/* ─── Large Laptop (1200–1599px) — default sweet spot, no changes needed ─── */

/* ─── Medium / Small Laptop (900–1199px) ─── */
@media (max-width: 1199px) {
    .nf-core-monitor { width: 72vw; max-width: 680px; min-height: 340px; }
    .nf-core-title { font-size: 19px; gap: 8px; }
    .nf-core-counter { min-width: 50px; height: 30px; font-size: 17px; }
    .nf-terminal { padding: 8px 14px; font-size: 17px; line-height: 1.55; }
    .nf-proc-label { font-size: 16px; }
    .nf-proc-num { font-size: 15px; width: 20px; }
    .nf-proc-badge { font-size: 14px; }
    .nf-term-status { font-size: 15px; }
    .nf-engine-core { height: 160px; }
    .nf-brand-inner-text { font-size: 15px; letter-spacing: 6px; }
    .nf-brand-gear-icon { width: 60px; height: 60px; }
    .nf-brand-gear-left { left: 24px; }
    .nf-brand-gear-right { right: 24px; }
    .nf-engine-stats { font-size: 11px; padding: 5px 0; }
    .nf-stat-label { font-size: 10px; letter-spacing: 1.2px; }
    .nf-stat-val { font-size: 12px; }
    .nf-module { width: 220px; padding: 10px 12px; }
    .nf-mod-title { font-size: 15px; }
    .nf-mod-pct { font-size: 16px; }
    .nf-step { font-size: 15px; gap: 5px; }
    .nf-mod-tl { transform: translate(calc(-100% - 200px), calc(-100% - 14px)); }
    .nf-mod-tr { transform: translate(200px, calc(-100% - 14px)); }
    .nf-mod-bl { transform: translate(calc(-100% - 200px), 14px); }
    .nf-mod-br { transform: translate(200px, 14px); }
}

/* ─── Tablet (600–899px) ─── */
@media (max-width: 899px) {
    .nf-core-monitor { width: 88vw; max-width: 560px; min-height: 300px; max-height: 78vh; border-radius: 13px; }
    .nf-core-header { padding: 12px 16px 10px; }
    .nf-core-title { font-size: 16px; gap: 6px; letter-spacing: 1px; }
    .nf-core-counter { min-width: 44px; height: 28px; font-size: 15px; border-radius: 8px; }
    .nf-terminal { padding: 6px 12px; font-size: 15px; line-height: 1.5; min-height: 80px; }
    .nf-proc-label { font-size: 14.5px; }
    .nf-proc-num { font-size: 14px; width: 18px; }
    .nf-proc-badge { font-size: 13px; padding: 1px 5px; }
    .nf-proc-dot { width: 5px; height: 5px; }
    .nf-term-status { font-size: 13.5px; padding: 1px 5px; }
    .nf-engine-core { height: 140px; }
    .nf-engine-frame { inset: 6px 10px; }
    .nf-brand-inner-text { font-size: 13px; letter-spacing: 4px; }
    .nf-brand-gear-icon { width: 50px; height: 50px; }
    .nf-brand-gear-left { left: 16px; }
    .nf-brand-gear-right { right: 16px; }
    .nf-engine-stats { font-size: 10px; padding: 4px 0; bottom: 6px; left: 8px; right: 8px; }
    .nf-stat-label { font-size: 9px; letter-spacing: 1px; }
    .nf-stat-val { font-size: 11px; }
    .nf-stat-item { padding: 0 6px; gap: 4px; }
    .nf-module { width: 180px; padding: 8px 10px; border-radius: 10px; }
    .nf-mod-title { font-size: 13px; letter-spacing: 0.8px; }
    .nf-mod-pct { font-size: 14px; }
    .nf-step { font-size: 13px; gap: 4px; padding: 2px 0; }
    .nf-step-dot { width: 5px; height: 5px; }
    .nf-mod-tl { transform: translate(calc(-100% - 160px), calc(-100% - 10px)); }
    .nf-mod-tr { transform: translate(160px, calc(-100% - 10px)); }
    .nf-mod-bl { transform: translate(calc(-100% - 160px), 10px); }
    .nf-mod-br { transform: translate(160px, 10px); }
    .nf-close-btn { top: 10px; right: 10px; padding: 4px 10px; font-size: 16px; }
    .nf-stop-btn { top: 10px; right: 80px; font-size: 11px; padding: 4px 10px; }
    .nf-gear-wrap { width: 70px; height: 70px; }
    .nf-gear-aura { width: 80px; height: 80px; }
    .nf-pulse-ring { width: 500px; height: 500px; }
    .nf-pulse-ring:nth-child(2) { width: 380px; height: 380px; }
    .nf-pulse-ring:nth-child(3) { width: 700px; height: 700px; }
}

/* ─── Small Phone (≤599px) ─── */
@media (max-width: 599px) {
    .nf-core-monitor { width: 96vw; max-width: none; min-height: 260px; max-height: 82vh; border-radius: 10px; }
    .nf-core-header { padding: 10px 12px 8px; }
    .nf-core-title { font-size: 14px; gap: 5px; letter-spacing: 0.5px; }
    .nf-core-title-label { font-size: 12px; }
    .nf-status-dot { width: 6px; height: 6px; }
    .nf-core-counter { min-width: 38px; height: 26px; font-size: 13px; border-radius: 6px; padding: 0 6px; }
    .nf-terminal { padding: 5px 10px; font-size: 13.5px; line-height: 1.45; min-height: 60px; max-height: 50vh; }
    .nf-proc-row { gap: 4px; padding: 2px 0; }
    .nf-proc-label { font-size: 13px; }
    .nf-proc-num { font-size: 12px; width: 16px; }
    .nf-proc-badge { font-size: 11px; padding: 0px 4px; }
    .nf-proc-dot { width: 4px; height: 4px; }
    .nf-term-status { font-size: 12px; padding: 0px 4px; }
    .nf-engine-core { height: 110px; }
    .nf-engine-frame { inset: 4px 8px; }
    .nf-engine-brand-inner { left: 10px; right: 10px; }
    .nf-brand-inner-text { font-size: 10px; letter-spacing: 2.5px; }
    .nf-brand-gear-icon { width: 38px; height: 38px; }
    .nf-brand-gear-left { left: 8px; }
    .nf-brand-gear-right { right: 8px; }
    .nf-engine-stats { font-size: 8.5px; padding: 3px 0; bottom: 4px; left: 6px; right: 6px; letter-spacing: 0.8px; }
    .nf-stat-label { font-size: 7.5px; letter-spacing: 0.6px; }
    .nf-stat-val { font-size: 9px; }
    .nf-stat-item { padding: 0 4px; gap: 2px; }
    /* Hide cross-pattern modules on small screens — terminal view only */
    .nf-module { display: none; }
    .nf-pipes-svg { display: none; }
    .nf-close-btn { top: 8px; right: 8px; padding: 3px 8px; font-size: 14px; border-radius: 6px; }
    .nf-stop-btn { top: 8px; right: 66px; font-size: 10px; padding: 3px 8px; }
    .nf-gear-wrap { width: 55px; height: 55px; }
    .nf-gear-aura { width: 65px; height: 65px; }
    .nf-pulse-ring { width: 300px; height: 300px; }
    .nf-pulse-ring:nth-child(2) { width: 220px; height: 220px; }
    .nf-pulse-ring:nth-child(3) { width: 450px; height: 450px; }
    .nf-center-glow { width: 400px; height: 400px; }
    .nf-ambient-orb { display: none; }
    .nf-corner-deco { display: none; }
}

/* ─── Very Short Screens (max-height ≤ 600px) ─── */
@media (max-height: 600px) {
    .nf-core-monitor { max-height: 90vh; min-height: 220px; }
    .nf-terminal { max-height: 35vh; min-height: 50px; }
    .nf-engine-core { height: 100px; }
    .nf-core-header { padding: 8px 14px 6px; }
    .nf-brand-inner-text { font-size: 11px; letter-spacing: 3px; }
    .nf-brand-gear-icon { width: 44px; height: 44px; }
}

    `}function Qe(){ce||(ce=document.createElement("style"),ce.id="netflow-overlay-styles",ce.textContent=kt(K),document.head.appendChild(ce))}function Je(t){t.innerHTML="",W.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function Ct(){const t=document.getElementById("nf-terminal");if(!t)return;Je(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${W.length}`)}function Ze(t,e){let s="";for(let A=0;A<20;A++){const T=A/20*Math.PI*2,y=(A+.2)/20*Math.PI*2,g=(A+.5)/20*Math.PI*2,i=(A+.8)/20*Math.PI*2,E=(A+1)/20*Math.PI*2;s+=`${A===0?"M":"L"}${(120+100*Math.cos(T)).toFixed(1)},${(120+100*Math.sin(T)).toFixed(1)} `,s+=`L${(120+100*Math.cos(y)).toFixed(1)},${(120+100*Math.sin(y)).toFixed(1)} `,s+=`L${(120+112*Math.cos(g)).toFixed(1)},${(120+112*Math.sin(g)).toFixed(1)} `,s+=`L${(120+100*Math.cos(i)).toFixed(1)},${(120+100*Math.sin(i)).toFixed(1)} `,s+=`L${(120+100*Math.cos(E)).toFixed(1)},${(120+100*Math.sin(E)).toFixed(1)} `}s+="Z";const c=14,p=72,u=62;let k="";for(let A=0;A<c;A++){const T=A/c*Math.PI*2,y=(A+.25)/c*Math.PI*2,g=(A+.75)/c*Math.PI*2,i=(A+1)/c*Math.PI*2;k+=`${A===0?"M":"L"}${(120+u*Math.cos(T)).toFixed(1)},${(120+u*Math.sin(T)).toFixed(1)} `,k+=`L${(120+p*Math.cos(y)).toFixed(1)},${(120+p*Math.sin(y)).toFixed(1)} `,k+=`L${(120+p*Math.cos(g)).toFixed(1)},${(120+p*Math.sin(g)).toFixed(1)} `,k+=`L${(120+u*Math.cos(i)).toFixed(1)},${(120+u*Math.sin(i)).toFixed(1)} `}return k+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.9)"/>
                <stop offset="100%" stop-color="rgba(${e},0.7)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${e},0.7)"/>
                <stop offset="100%" stop-color="rgba(${t},0.5)"/>
            </linearGradient>
        </defs>

        <!-- Outer ring (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${s}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${k}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Tt(){const t=document.createElement("div");t.id="netflow-engine-overlay",re=document.createElement("canvas"),re.id="nf-matrix-canvas",t.appendChild(re);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let $=1;$<=5;$++){const _=document.createElement("div");_.className=`nf-ambient-orb nf-orb-${$}`,t.appendChild(_)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const o=document.createElement("div");o.className="nf-pat-diag-b",t.appendChild(o);const d=document.createElement("div");d.className="nf-pat-circuit",t.appendChild(d);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const u=document.createElement("div");u.className="nf-pat-wave-h",t.appendChild(u);const k=document.createElement("div");k.className="nf-pat-radar",t.appendChild(k);const A=document.createElement("div");A.className="nf-pat-ripple-1",t.appendChild(A);const T=document.createElement("div");T.className="nf-pat-ripple-2",t.appendChild(T);const y=document.createElement("div");y.className="nf-pat-techscan",t.appendChild(y);const g=document.createElement("div");g.className="nf-center-glow",t.appendChild(g);const i=document.createElement("div");i.className="nf-pat-noise",t.appendChild(i);const E=document.createElement("div");E.className="nf-crt-scanlines",t.appendChild(E);const z=document.createElement("div");z.className="nf-vignette",t.appendChild(z);for(let $=0;$<3;$++){const _=document.createElement("div");_.className="nf-pulse-ring",t.appendChild(_)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach($=>{const _=document.createElement("div");_.className=`nf-corner-deco ${$}`,t.appendChild(_)});const Y=document.createElement("button");Y.className="nf-stop-btn",Y.innerHTML='<span class="nf-stop-icon"></span> หยุด',Y.onclick=()=>{var $;window.__NETFLOW_STOP__=!0;try{Pe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&(($=chrome.runtime)!=null&&$.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(Y);const B=document.createElement("button");B.className="nf-close-btn",B.textContent="✕ ซ่อน",B.onclick=()=>Oe(),t.appendChild(B);const R=document.createElement("div");R.className="nf-layout";const b=document.createElement("div");b.className="nf-core-monitor",b.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${W.length}</div>
    `,b.appendChild(f);const x=document.createElement("div");x.className="nf-terminal",x.id="nf-terminal",Je(x),b.appendChild(x);const C=document.createElement("div");C.className="nf-engine-core",C.id="nf-engine-core";const O=document.createElement("div");O.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach($=>{const _=document.createElement("div");_.className=`nf-frame-corner ${$}`,O.appendChild(_)}),C.appendChild(O);const M="http://www.w3.org/2000/svg",v=document.createElementNS(M,"svg");v.setAttribute("class","nf-engine-waves"),v.setAttribute("viewBox","0 0 560 140"),v.setAttribute("preserveAspectRatio","none"),v.id="nf-engine-waves";for(let $=0;$<4;$++){const _=document.createElementNS(M,"path");_.setAttribute("fill","none"),_.setAttribute("stroke-width",$<2?"1.5":"1"),_.setAttribute("stroke",$<2?`rgba(${K.rgb},${.14+$*.1})`:`rgba(${K.accentRgb},${.1+($-2)*.08})`),_.setAttribute("data-wave-idx",String($)),v.appendChild(_)}C.appendChild(v);const D=document.createElement("div");D.className="nf-engine-brand-inner",D.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Ze(K.rgb,K.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Ze(K.rgb,K.accentRgb)}
        </div>
    `,C.appendChild(D);const h=document.createElement("div");h.className="nf-engine-stats",h.id="nf-engine-stats",h.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([$,_,F])=>`<div class="nf-stat-item"><span class="nf-stat-label">${$}</span><span class="nf-stat-val" id="${_}">${F}</span></div>`).join(""),C.appendChild(h),b.appendChild(C),R.appendChild(b);const w=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];pe.forEach(($,_)=>{const F=Mt($);F.classList.add(w[_]),F.id=`nf-mod-${$.id}`,R.appendChild(F)}),t.appendChild(R);for(let $=0;$<30;$++){const _=document.createElement("div");_.className="nf-particle",_.style.left=`${5+Math.random()*90}%`,_.style.bottom=`${Math.random()*40}%`,_.style.animationDuration=`${3+Math.random()*5}s`,_.style.animationDelay=`${Math.random()*4}s`;const F=.3+Math.random()*.4,P=.7+Math.random()*.3;_.style.background=`rgba(${Math.floor(te*P)}, ${Math.floor(ne*P)}, ${Math.floor(oe*P)}, ${F})`,_.style.width=`${1+Math.random()*2}px`,_.style.height=_.style.width,t.appendChild(_)}return t}function Mt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let l="";o.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${l}
        `,e.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function St(){Ke=Date.now(),Me=setInterval(()=>{const t=Math.floor((Date.now()-Ke)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${e}:${r}`)},1e3)}function et(){Me&&(clearInterval(Me),Me=null)}const _t=120,tt=160,nt=.4;let ue=null,ot=0,it=0,at=0,$e=[];function Pt(t,e){$e=[];for(let r=0;r<_t;r++){const a=Math.random();let o;a<.22?o=0:a<.4?o=1:a<.55?o=2:a<.68?o=3:a<.84?o=4:o=5;const d=Math.random()*t,l=Math.random()*e,s=50+Math.random()*220,c=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);$e.push({x:o===0?Math.random()*t:d+Math.cos(c)*s,y:o===0?Math.random()*e:l+Math.sin(c)*s,vx:(Math.random()-.5)*nt,vy:(Math.random()-.5)*nt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:d,oCy:l,oRadius:s,oAngle:c,oSpeed:p})}}function It(){if(!re)return;const t=re;if(xe=t.getContext("2d"),!xe)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,$e.length===0&&Pt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,o=0,d=!1;function l(){if(!xe||!re){ve=null;return}if(ve=requestAnimationFrame(l),d=!d,d)return;const s=xe,c=re.width,p=re.height;s.fillStyle=`rgba(${te*.04|0},${ne*.04|0},${oe*.06|0},1)`,s.fillRect(0,0,c,p),(!r||a!==c||o!==p)&&(a=c,o=p,r=s.createRadialGradient(c*.5,p*.5,0,c*.5,p*.5,Math.max(c,p)*.6),r.addColorStop(0,`rgba(${te*.08|0},${ne*.08|0},${oe*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=r,s.fillRect(0,0,c,p);const u=$e,k=u.length,A=tt*tt;for(let g=0;g<k;g++){const i=u[g];if(i.pulsePhase+=i.pulseSpeed,i.motion===0)i.x+=i.vx,i.y+=i.vy,i.x<0?(i.x=0,i.vx=Math.abs(i.vx)*(.8+Math.random()*.4)):i.x>c&&(i.x=c,i.vx=-Math.abs(i.vx)*(.8+Math.random()*.4)),i.y<0?(i.y=0,i.vy=Math.abs(i.vy)*(.8+Math.random()*.4)):i.y>p&&(i.y=p,i.vy=-Math.abs(i.vy)*(.8+Math.random()*.4));else if(i.motion===1)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius,i.oCx+=Math.sin(i.oAngle*.3)*.15,i.oCy+=Math.cos(i.oAngle*.3)*.15;else if(i.motion===2)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius*.5,i.oCx+=Math.sin(i.oAngle*.2)*.1,i.oCy+=Math.cos(i.oAngle*.2)*.1;else if(i.motion===3){i.oAngle+=i.oSpeed;const E=i.oAngle,z=i.oRadius*.7;i.x=i.oCx+z*Math.cos(E),i.y=i.oCy+z*Math.sin(E)*Math.cos(E),i.oCx+=Math.sin(E*.15)*.12,i.oCy+=Math.cos(E*.15)*.12}else if(i.motion===4){i.oAngle+=i.oSpeed*1.2;const E=i.oRadius*(.5+.5*Math.abs(Math.sin(i.oAngle*.15)));i.x=i.oCx+Math.cos(i.oAngle)*E,i.y=i.oCy+Math.sin(i.oAngle)*E,i.oCx+=Math.sin(i.oAngle*.1)*.18,i.oCy+=Math.cos(i.oAngle*.1)*.18}else i.oAngle+=i.oSpeed,i.x+=i.vx*.8,i.y=i.oCy+Math.sin(i.oAngle+i.x*.008)*i.oRadius*.35,i.x<-30?i.x=c+30:i.x>c+30&&(i.x=-30),i.oCy+=Math.sin(i.oAngle*.1)*.08;if(i.motion>0){const E=i.oRadius+50;i.oCx<-E?i.oCx=c+E:i.oCx>c+E&&(i.oCx=-E),i.oCy<-E?i.oCy=p+E:i.oCy>p+E&&(i.oCy=-E)}}s.beginPath(),s.strokeStyle=`rgba(${te},${ne},${oe},0.06)`,s.lineWidth=.4;const T=new Path2D;for(let g=0;g<k;g++){const i=u[g];for(let E=g+1;E<k;E++){const z=u[E],Y=i.x-z.x,B=i.y-z.y,R=Y*Y+B*B;R<A&&(1-R/A<.4?(s.moveTo(i.x,i.y),s.lineTo(z.x,z.y)):(T.moveTo(i.x,i.y),T.lineTo(z.x,z.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${te},${ne},${oe},0.18)`,s.lineWidth=.8,s.stroke(T),!ue||ot!==te||it!==ne||at!==oe){ue=document.createElement("canvas");const g=48;ue.width=g,ue.height=g;const i=ue.getContext("2d"),E=i.createRadialGradient(g/2,g/2,0,g/2,g/2,g/2);E.addColorStop(0,`rgba(${te},${ne},${oe},0.9)`),E.addColorStop(.3,`rgba(${te},${ne},${oe},0.35)`),E.addColorStop(1,`rgba(${te},${ne},${oe},0)`),i.fillStyle=E,i.fillRect(0,0,g,g),ot=te,it=ne,at=oe}const y=ue;for(let g=0;g<k;g++){const i=u[g],E=.6+.4*Math.sin(i.pulsePhase),z=i.radius*5*(.8+E*.4);s.globalAlpha=.5+E*.4,s.drawImage(y,i.x-z/2,i.y-z/2,z,z)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let g=0;g<k;g++){const i=u[g];if(i.radius>2){const E=.6+.4*Math.sin(i.pulsePhase),z=i.radius*(.8+E*.4)*.35;s.moveTo(i.x+z,i.y),s.arc(i.x,i.y,z,0,Math.PI*2)}}s.fill()}l()}function At(){ve!==null&&(cancelAnimationFrame(ve),ve=null),re=null,xe=null,$e=[]}let Ee=null;const _e=560,Rt=140,rt=_e/2,st=Rt/2,lt=[];for(let t=0;t<=_e;t+=8){const e=Math.abs(t-rt)/rt;lt.push(Math.pow(Math.min(1,e*1.6),.6))}const Bt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/_e,off:t*.6,spd:.7+t*.12}));let De=!1;function ct(){if(we=requestAnimationFrame(ct),De=!De,De)return;if(Re+=.07,!Ee){const e=document.getElementById("nf-engine-waves");if(!e){we=null;return}Ee=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ee.length;e++){const r=Bt[e],a=Re*r.spd+r.off;t.length=0,t.push(`M 0 ${st}`);let o=0;for(let d=0;d<=_e;d+=8){const l=st+r.amp*lt[o++]*Math.sin(d*r.freq+a);t.push(`L${d} ${l*10+.5|0}`)}Ee[e].setAttribute("d",t.join(" "))}}function Dt(){Re=0,ct(),It(),Se=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function dt(){we!==null&&(cancelAnimationFrame(we),we=null),Se&&(clearInterval(Se),Se=null),Ee=null,At()}function ze(){let t=0;const e=W.filter(p=>p.status!=="skipped").length;for(const p of W){const u=document.getElementById(`nf-proc-${p.stepId}`);if(!u)continue;u.className="nf-proc-row";const k=u.querySelector(".nf-proc-badge");switch(p.status){case"done":u.classList.add("nf-proc-done"),k&&(k.textContent="✅ done"),t++;break;case"active":u.classList.add("nf-proc-active"),k&&(k.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),k&&(k.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),k&&(k.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),k&&(k.textContent="(queued)")}}const r=W.findIndex(p=>p.status==="active"),a=r>=0?r+1:t>=e&&e>0?W.length:t,o=document.getElementById("nf-step-counter");o&&(o.textContent=`${a}/${W.length}`);const d=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(d&&(d.textContent="COMPLETE",d.style.color=K.doneHex),l&&(l.style.background=K.doneHex,l.style.boxShadow=`0 0 8px rgba(${K.doneRgb},0.7)`)):W.some(u=>u.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):W.some(u=>u.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=K.hex,d.style.textShadow=`0 0 10px rgba(${K.rgb},0.5)`);const s=document.getElementById("nf-terminal"),c=s==null?void 0:s.querySelector(".nf-proc-active");c&&s&&c.scrollIntoView({behavior:"smooth",block:"center"})}function pt(){Q&&Q.isConnected||(Qe(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=de?Xe:je,Q.title="ซ่อน/แสดง Netflow Overlay",Q.onclick=()=>Oe(),document.body.appendChild(Q))}function Oe(){U&&(pt(),de?(U.classList.remove("nf-hidden"),U.classList.add("nf-visible"),Q&&(Q.innerHTML=je),de=!1):(U.classList.remove("nf-visible"),U.classList.add("nf-hidden"),Q&&(Q.innerHTML=Xe),de=!0))}const ft={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ut(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=be;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=ft[e]||ft.green;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const o=K.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${o},0.45)`,t.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function Fe(t=1){if(K=Et(),Ye(),U&&U.isConnected){de&&Oe();return}if(U&&!U.isConnected&&(U=null),ce&&(ce.remove(),ce=null),Qe(),ye=t,W=Be(t),t>1){const e=pe.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=t;o++)a.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),a.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),a.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});e.steps=a}const r=pe.find(a=>a.id==="render");if(r){const a=r.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const o=r.steps.find(d=>d.id==="upscale");o&&(o.label="Full Video")}}U=Tt(),U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(U),U.classList.add("nf-visible"),de=!1,pt(),St(),Dt(),requestAnimationFrame(()=>ut())}function gt(){et(),dt(),de=!1,U&&(U.classList.add("nf-fade-out"),setTimeout(()=>{U==null||U.remove(),U=null},500)),Q&&(Q.remove(),Q=null)}const zt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Ot(t,e,r){const a=W.findIndex(u=>u.status==="active"),o=W.filter(u=>u.status==="done").length,d=W.length,l=a>=0?a+1:o>=d?d:o,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${l}/${d}`);let c=1;for(const u of W)if(u.status==="active"||u.status==="done")if(u.stepId.startsWith("scene")){const k=u.stepId.match(/^scene(\d+)-/);k&&(c=Math.max(c,parseInt(k[1],10)))}else(u.stepId==="download"||u.stepId==="upscale"||u.stepId==="open")&&(c=ye);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=ye>1?`${c}/${ye}`:"1/1"),e==="active"){const u=document.getElementById("nf-stat-status"),k=zt[t]||t.toUpperCase();u&&(u.textContent=k)}else if(e==="done"&&o>=d){const u=document.getElementById("nf-stat-status");u&&(u.textContent="COMPLETE")}else if(e==="error"){const u=document.getElementById("nf-stat-status");u&&(u.textContent="ERROR")}if(r!==void 0&&r>0){const u=document.getElementById("nf-stat-progress");u&&(u.textContent=`${Math.min(100,r)}%`)}}function S(t,e,r){if(!U)return;for(const o of pe)for(const d of o.steps)d.id===t&&(d.status=e,r!==void 0&&(d.progress=r));for(const o of W)o.stepId===t&&(o.status=e,r!==void 0&&(o.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),Ot(t,e,r),r!==void 0){const o=document.getElementById(`nf-bar-${t}`);o&&(o.style.width=`${Math.min(100,r)}%`)}Ne(),ze()}function ge(t){S(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function ke(t=4e3){et(),dt(),Ne(),ze(),setTimeout(()=>gt(),t)}function Ne(){for(const t of pe){const e=t.steps.filter(c=>c.status!=="skipped").length,r=t.steps.filter(c=>c.status==="done").length,a=t.steps.some(c=>c.status==="active"),o=e>0?Math.round(r/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${o}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${o}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),o>=100?s.classList.add("nf-done"):a&&s.classList.add("nf-active"))}}function Ft(t){var a,o,d,l;ye=t;const e=new Map;for(const s of W)e.set(s.stepId,{status:s.status,progress:s.progress});W=Be(t);for(const s of W){const c=e.get(s.stepId);c&&(s.status=c.status,c.progress!==void 0&&(s.progress=c.progress))}if(Ct(),t>1){const s=pe.find(c=>c.id==="video");if(s){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=s.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=s.steps.find(p=>p.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=s.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=s.steps.find(p=>p.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)c.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),c.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),c.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});s.steps=c,mt(s)}}const r=pe.find(s=>s.id==="render");if(r&&t>1){const s=r.steps.find(p=>p.id==="download");s&&(s.label="ดาวน์โหลด 720p");const c=r.steps.find(p=>p.id==="upscale");c&&(c.label="Full Video"),mt(r)}Ne(),ze()}function mt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),t.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let l="";o.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${l}
        `,e.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Pe(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Pe(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},I=t=>{console.warn(`[Netflow AI] ${t}`);try{Pe(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Le(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?I(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){I(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Ve(){try{if(await new Promise(o=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){o(!1);return}o(!!(d!=null&&d.cached))})}catch{o(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const o=document.querySelectorAll("video");for(const d of o){const l=d.src||d.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,a=0;for(const o of e){let d=o.src||"";if(!d){const c=o.querySelector("source");c&&(d=c.getAttribute("src")||"")}if(!d&&o.currentSrc&&(d=o.currentSrc),!d)continue;if(J()){r||(r=d,a=1);continue}const l=o.getBoundingClientRect(),s=l.width*l.height;l.width>50&&s>a&&(a=s,r=d)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const o=await fetch(r);if(!o.ok)return n(`[TikTok] fetch failed: HTTP ${o.status}`),await ht(r),r;const d=await o.blob(),l=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const s=await new Promise((c,p)=>{const u=new FileReader;u.onloadend=()=>c(u.result),u.onerror=()=>p(new Error("FileReader error")),u.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(s.length/1024/1024).toFixed(1)} MB`),await new Promise(c=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:s},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),c()})})}catch(o){n(`[TikTok] Content script fetch error: ${o.message}`),await ht(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function ht(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function Ge(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const qe=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),He=/Win/i.test(navigator.userAgent),me=qe?"🍎 Mac":He?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${me}`),window.__VIDEO_COMPLETE_SENT__=!1;class Ue extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const m=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new Ue);const a=setTimeout(()=>{if(window.__NETFLOW_STOP__)return r(new Ue);e()},t);m._lastId=a});function fe(){return!!window.__NETFLOW_STOP__}const J=()=>document.hidden;function bt(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const o=(a.textContent||"").trim().toLowerCase();if(!(o.length>200||o.length<5)){for(const d of t)if(o.includes(d))return((r=a.textContent)==null?void 0:r.trim())||d}}return null}async function ee(t){if(J()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",o)),await m(80),t.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",o)),t.dispatchEvent(new MouseEvent("click",o)),await m(50),t.click()}function Nt(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",o)),t.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",o)),t.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",o))}function Lt(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let d=a,l=null,s=1/0;for(let c=0;c<20&&d&&(d=d.parentElement,!(!d||d===document.body));c++){if(J()){c>=3&&d.children.length>0&&!l&&(l=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const u=p.width*p.height;u<s&&(l=d,s=u)}}l&&!e.includes(l)&&e.push(l)}return e.sort((a,o)=>{const d=a.getBoundingClientRect(),l=o.getBoundingClientRect();return d.left-l.left}),e}function We(t=!1){const e=[],r=document.querySelectorAll("video");for(const l of r){let s=l.parentElement;for(let c=0;c<10&&s;c++){if(J()){if(c>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const p=s.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:s,left:p.left});break}s=s.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of a){const s=(l.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let c=l.parentElement;for(let p=0;p<10&&c;p++){if(J()){if(p>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const o=document.querySelectorAll("img");for(const l of o){const s=(l.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let c=l.parentElement;for(let p=0;p<10&&c;p++){if(J()){if(p>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const d=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(s=>s.el===l));if(d.sort((l,s)=>l.left-s.left),d.length>0){const l=d[0].el,s=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Vt(){const t=Lt("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let o=0;o<10&&a;o++){if(J()){if(o>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Gt(t,e){var s;const[r,a]=t.split(","),o=((s=r.match(/:(.*?);/))==null?void 0:s[1])||"image/png",d=atob(a),l=new Uint8Array(d.length);for(let c=0;c<d.length;c++)l[c]=d.charCodeAt(c);return new File([l],e,{type:o})}function Ce(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of r)if(((a=o.textContent)==null?void 0:a.trim())===t){const d=o.closest("button");d&&e.push(d)}return e}function qt(){const t=[...Ce("add"),...Ce("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const o of a){const d=(o.textContent||"").trim();if(d!=="+"&&d!=="add")continue;if(J())return o;const l=o.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return o}return null}let e=null,r=0;for(const a of t){const o=a.getBoundingClientRect();o.y>r&&(r=o.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function wt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=Ce(a);let d=null,l=0;for(const s of o){const c=s.getBoundingClientRect();c.y>l&&(l=c.y,d=s)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${l.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){if(J())break;const o=a.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const d=Math.abs(o.width-o.height)<10&&o.width<60,l=o.y+o.x+(d?1e3:0);l>r&&(r=l,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const o=(a.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return a}return null}function xt(){const t=document.querySelectorAll("textarea");for(const a of t)if(J()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(J()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const o=a.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Ie(t,e){var r,a,o,d;t.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),await m(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await m(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await m(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await m(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(s),await m(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await m(200),document.execCommand("paste"),await m(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(l){let s=t[l];for(let c=0;c<30&&s;c++){const p=s.memoizedProps,u=s.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const k=p.editor;k.selection,k.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(o=u==null?void 0:u.memoizedState)==null?void 0:o.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),u.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ht(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Ut(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${me})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${me})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Wt(t,e,r){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...t.map(u=>u.input)];for(const u of a)!o.includes(u)&&u.offsetParent===null&&o.push(u);for(const u of o)u.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${me})`),!1;let l;if(r&&r.size>0){const u=Array.from(d).filter(k=>!r.has(k));u.length>0?(l=u[u.length-1],n(`เล็งเป้า file input ใหม่ (${u.length} ใหม่, ${d.length} ทั้งหมด)`)):(l=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else l=d[d.length-1];const s=new DataTransfer;s.items.add(e);try{l.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=l.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(u){n(`กำหนด target.files ล้มเหลว: ${u.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(k){return I(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${k.message}`),!1}}const c=l._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const u=new DataTransfer;u.items.add(e);const k=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:u});l.dispatchEvent(k),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${me}`),!0}function Te(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(J()){t++;continue}const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;if(J()){t++;continue}const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.offsetParent!==null&&t++}return t}async function vt(t,e){var u;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=Gt(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Te();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const o=async(k,A=8e3)=>{const T=Date.now();for(;Date.now()-T<A;){const y=Te();if(y>a)return n(`✅ [${k}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${y}`),!0;await m(500)}return n(`⚠️ [${k}] รูปย่อไม่เพิ่ม (ยังคง ${Te()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=qt();if(!d)return I("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const l=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${l.size} ตัว`);const s=Ut();let c=Ht();const p=new MutationObserver(k=>{for(const A of k)for(const T of A.addedNodes)if(T instanceof HTMLInputElement&&T.type==="file"&&(T.type="text",c.push({input:T,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),T instanceof HTMLElement){const y=T.querySelectorAll('input[type="file"]');for(const g of y)g.type="text",c.push({input:g,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let k=!1;const A=Date.now();for(;!k&&Date.now()-A<5e3;){const y=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const g of y){if(g===d)continue;const i=g.querySelectorAll("i");for(const E of i){const z=((u=E.textContent)==null?void 0:u.trim())||"";if((z==="upload"||z==="upload_file")&&!Array.from(g.querySelectorAll("i")).map(B=>{var R;return(R=B.textContent)==null?void 0:R.trim()}).includes("drive_folder_upload")){g.click(),k=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${z}) ✅`);break}}if(k)break}if(!k)for(const g of y){if(g===d)continue;const i=g.childNodes.length<=5?(g.textContent||"").trim():"";if(i.length>0&&i.length<40){const E=i.toLowerCase();if(E==="upload"||E==="อัปโหลด"||E==="อัพโหลด"||E.includes("upload image")||E.includes("upload photo")||E.includes("อัปโหลดรูปภาพ")||E.includes("อัพโหลดรูปภาพ")||E.includes("from computer")||E.includes("จากคอมพิวเตอร์")){g.click(),k=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${i}") ✅`);break}}}k||await m(500)}return k?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Wt(c,r,l)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(I(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(I("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),s();for(const k of c)k.input.type!=="file"&&(k.input.type="file")}}async function Yt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button");let a=null;for(const T of r){const y=T.textContent||"";if((y.includes("Nano Banana")||y.includes("Imagen")||y.includes("วิดีโอ")||y.includes("รูปภาพ")||y.includes("Image")||y.includes("Video"))&&T.getBoundingClientRect().bottom>window.innerHeight*.7){a=T,n(`พบปุ่มตั้งค่าจากข้อความ: "${y.substring(0,30).trim()}"`);break}}if(!a)for(const T of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const y=Ce(T);for(const g of y)if(g.getBoundingClientRect().bottom>window.innerHeight*.7){a=g,n(`พบปุ่มตั้งค่าจากไอคอน: ${T}`);break}if(a)break}if(!a)return I("ไม่พบปุ่มตั้งค่า"),!1;const o=a.getBoundingClientRect(),d=o.left+o.width/2,l=o.top+o.height/2,s={bubbles:!0,cancelable:!0,clientX:d,clientY:l,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let c=!1,p=null;const u=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const T of u){const y=T.getAttribute("aria-controls")||"",g=T.id||"";if(y.toUpperCase().includes("IMAGE")||g.toUpperCase().includes("IMAGE")){p=T,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${y})`);break}}if(!p)for(const T of document.querySelectorAll('[role="tab"]')){const y=T.id||"";if(y.toUpperCase().includes("TRIGGER-IMAGE")){p=T,n(`พบแท็บ Image ผ่าน id: ${y}`);break}}if(!p)for(const T of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const y=(T.textContent||"").trim();if((y==="Image"||y.endsWith("Image")||y==="รูปภาพ"||y==="ภาพ")&&!y.includes("Video")&&!y.includes("วิดีโอ")){p=T,n(`พบแท็บ Image ผ่านข้อความ: "${y}"`);break}}if(p){const T=p.getAttribute("data-state")||"",y=p.getAttribute("aria-selected")||"";if(T==="active"||y==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const g=p.getBoundingClientRect(),i={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),p.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",i)),p.dispatchEvent(new MouseEvent("click",i)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const k=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const T of document.querySelectorAll("button, [role='tab'], [role='option']")){const y=(T.textContent||"").trim();if(y===k||y.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const g=T.getBoundingClientRect(),i={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),T.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",i)),T.dispatchEvent(new MouseEvent("click",i)),n(`เลือกทิศทาง: ${k}`),await m(400);break}}const A=`x${e}`;for(const T of document.querySelectorAll("button, [role='tab'], [role='option']"))if((T.textContent||"").trim()===A){const g=T.getBoundingClientRect(),i={bubbles:!0,cancelable:!0,clientX:g.left+g.width/2,clientY:g.top+g.height/2,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),T.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",i)),T.dispatchEvent(new MouseEvent("click",i)),n(`เลือกจำนวน: ${A}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function Xt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",o=t==="quality"?"คุณภาพ":"เร็ว",d=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${o}) ===`);let l=null;const s=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown']");for(const g of s){const i=(g.textContent||"").trim();if(!(i.length>60)&&i.includes("Veo")&&(g.hasAttribute("aria-haspopup")||g.hasAttribute("aria-expanded")||g.getAttribute("role")==="combobox"||i.includes("arrow_drop_down")||g.querySelector("svg"))){l=g,n(`พบปุ่ม Veo dropdown (Strategy A): "${i.substring(0,40).trim()}"`);break}}if(!l)for(const g of s){const i=(g.textContent||"").trim();if(!(i.length>60)&&i.includes("Veo")&&g.getBoundingClientRect().bottom>window.innerHeight*.5){l=g,n(`พบปุ่ม Veo dropdown (Strategy B - bottom area): "${i.substring(0,40).trim()}"`);break}}if(!l)for(const g of s){const i=(g.textContent||"").trim();if(!(i.length>40)&&(i.includes("Fast")||i.includes("Quality")||i.includes("เร็ว")||i.includes("คุณภาพ"))&&(g.hasAttribute("aria-haspopup")||g.hasAttribute("aria-expanded")||g.querySelector("svg"))){l=g,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${i.substring(0,40).trim()}"`);break}}if(!l){const g=document.querySelectorAll("div, span");for(const i of g){const E=(i.textContent||"").trim();if(E==="Veo 3.1 - Fast"||E==="Veo 3.1 - Quality"||E==="Fast"||E==="Quality"||E==="Veo 3.1 - เร็ว"||E==="Veo 3.1 - คุณภาพสูง"){const z=i.getBoundingClientRect();if(z.bottom>window.innerHeight*.6&&z.width>0){l=i,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${E}"`);break}}}}if(!l)return I("ไม่พบปุ่ม Veo quality dropdown"),!1;const c=(l.textContent||"").trim();if(c.includes(e)||c.includes(r)&&!c.includes(a)||c.includes(o)&&!c.includes(d))return n(`✅ Veo quality เป็น "${c}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=l.getBoundingClientRect(),u=p.left+p.width/2,k=p.top+p.height/2,A={bubbles:!0,cancelable:!0,clientX:u,clientY:k,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",A)),await m(80),l.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",A)),l.dispatchEvent(new MouseEvent("click",A)),n("คลิกเปิด Veo quality dropdown"),await m(1e3);let T=!1;const y=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const g of y){const i=(g.textContent||"").trim();if((i===e||i===r||i.includes(e)||i.includes(o))&&!i.includes("arrow_drop_down")){const z=g.getBoundingClientRect();if(z.width>0&&z.height>0){const Y=z.left+z.width/2,B=z.top+z.height/2,R={bubbles:!0,cancelable:!0,clientX:Y,clientY:B,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",R)),await m(80),g.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",R)),g.dispatchEvent(new MouseEvent("click",R)),n(`✅ เลือก "${i}" สำเร็จ`),T=!0;break}}}return T?(await m(600),!0):(I(`ไม่พบตัวเลือก "${e}" หรือ "${o}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),!1)}async function jt(t){var z,Y,B,R;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",o=qe?"macOS":He?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=qe?((Y=(z=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:z[1])==null?void 0:Y.replace(/_/g,"."))||"":He&&((B=e.match(/Windows NT ([0-9.]+)/))==null?void 0:B[1])||"",l=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${s} | แพลตฟอร์ม: ${me}`),n("══════════════════════════════════════════");try{Ae(t.theme)}catch{}try{Fe()}catch(b){console.warn("Overlay show error:",b)}const c=[],p=[];try{S("settings","active");const b=t.orientation||"horizontal",f=t.outputCount||1,x=await Yt(b,f);c.push(x?"✅ Settings":"⚠️ Settings"),S("settings",x?"done":"error")}catch(b){I(`ตั้งค่าผิดพลาด: ${b.message}`),c.push("⚠️ Settings"),S("settings","error")}try{const b=t.veoQuality||"fast";await Xt(b)?(c.push(`✅ Veo ${b}`),n(`✅ Veo quality: ${b}`)):(c.push("⚠️ Veo quality"),I("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(b){I(`Veo quality error: ${b.message}`),c.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const u=()=>{const b=document.querySelectorAll("span, div, p, label");for(const f of b){const x=(f.textContent||"").trim();if(/^\d{1,3}%$/.test(x)){if(x==="100%")return null;const C=f.getBoundingClientRect();if(C.width>0&&C.height>0&&C.top>0&&C.top<window.innerHeight)return x}}return null},k=async b=>{n(`รอการอัพโหลด ${b} เสร็จ...`),await m(2e3);const f=Date.now(),x=6e4;let C="",O=Date.now();const M=15e3;for(;Date.now()-f<x;){const v=u();if(v){if(v!==C)C=v,O=Date.now();else if(Date.now()-O>M){n(`✅ อัพโหลด ${b} — % ค้างที่ ${v} นาน ${M/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${v} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${b} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}I(`⚠️ อัพโหลด ${b} หมดเวลาหลัง ${x/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){S("upload-char","active");try{const b=await vt(t.characterImage,"character.png");c.push(b?"✅ ตัวละคร":"⚠️ ตัวละคร"),b||p.push("character upload failed"),S("upload-char",b?"done":"error")}catch(b){I(`อัพโหลดตัวละครผิดพลาด: ${b.message}`),c.push("❌ ตัวละคร"),p.push("character upload error"),S("upload-char","error")}await k("character")}else ge("upload-char");if(t.productImage){S("upload-prod","active");try{const b=await vt(t.productImage,"product.png");c.push(b?"✅ สินค้า":"⚠️ สินค้า"),b||p.push("product upload failed"),S("upload-prod",b?"done":"error")}catch(b){I(`อัพโหลดสินค้าผิดพลาด: ${b.message}`),c.push("❌ สินค้า"),p.push("product upload error"),S("upload-prod","error")}await k("product")}else ge("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const A=u();A&&(n(`⚠️ อัพโหลดยังแสดง ${A} — รอเพิ่มเติม...`),await k("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const T=(t.characterImage?1:0)+(t.productImage?1:0);if(T>0){let b=Te();b<T&&(n(`⏳ เห็นรูปย่อแค่ ${b}/${T} — รอ 3 วินาที...`),await m(3e3),b=Te()),b>=T?n(`✅ ยืนยันรูปย่ออ้างอิง: ${b}/${T}`):I(`⚠️ คาดว่าจะมี ${T} รูปย่อ แต่พบ ${b} — ดำเนินการต่อ`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),S("img-prompt","active"),await m(1e3);const y=xt();y?(await Ie(y,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),S("img-prompt","done")):(I("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),p.push("prompt input not found"),S("img-prompt","error")),await m(800);const g=new Set;document.querySelectorAll("img").forEach(b=>{b.src&&g.add(b.src)}),n(`บันทึกรูปเดิม: ${g.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),S("img-generate","active"),await m(500);const i=wt();if(i){const b=i.getBoundingClientRect(),f=b.left+b.width/2,x=b.top+b.height/2,C={bubbles:!0,cancelable:!0,clientX:f,clientY:x,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",C)),await m(80),i.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",C)),i.dispatchEvent(new MouseEvent("click",C)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await m(500),i.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",C)),await m(80),i.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",C)),i.dispatchEvent(new MouseEvent("click",C)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),S("img-generate","done")}else I("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),p.push("generate button not found"),S("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),S("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const b=()=>{const M=document.querySelectorAll("div, span, p, label, strong, small");for(const v of M){if(v.closest("#netflow-engine-overlay"))continue;const D=(v.textContent||"").trim();if(D.length>10)continue;const h=D.match(/(\d{1,3})\s*%/);if(!h)continue;const w=parseInt(h[1],10);if(w<1||w>100)continue;const $=v.getBoundingClientRect();if(!($.width===0||$.width>150)&&!($.top<0||$.top>window.innerHeight))return w}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,x=-1,C=0;const O=Date.now();for(;!f&&Date.now()-O<18e4;){const M=document.querySelectorAll("img");for(const v of M){if(g.has(v.src)||!(v.alt||"").toLowerCase().includes("generated"))continue;const h=v.getBoundingClientRect();if(h.width>120&&h.height>120&&h.top>0&&h.top<window.innerHeight*.85){const w=v.closest("div");if(w){f=w,n(`พบรูป AI จาก alt="${v.alt}": ${v.src.substring(0,80)}...`);break}}}if(!f)for(const v of M){if(g.has(v.src))continue;const D=v.closest("div"),h=(D==null?void 0:D.textContent)||"";if(h.includes("product.png")||h.includes("character.png")||h.includes(".png")||h.includes(".jpg"))continue;const w=v.getBoundingClientRect();if(w.width>120&&w.height>120&&w.top>0&&w.top<window.innerHeight*.85){const $=v.closest("div");if($){f=$,n(`พบรูปใหม่ (สำรอง): ${v.src.substring(0,80)}...`);break}}}if(!f){if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const v=bt();if(v){I(`❌ สร้างรูปล้มเหลว: ${v}`),p.push(`image gen failed: ${v}`),S("img-wait","error");break}const D=b();D!==null?(D!==x&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${D}%`),x=D,S("img-wait","active",D)),C=Date.now()):x>30&&Math.floor((Date.now()-C)/1e3)>=3&&n(`🖼️ % หายที่ ${x}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!f)I("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),S("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),S("img-wait","done",100);const M=f.getBoundingClientRect(),v=M.left+M.width/2,D=M.top+M.height/2,h={bubbles:!0,cancelable:!0,clientX:v,clientY:D};f.dispatchEvent(new PointerEvent("pointerenter",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",h)),f.dispatchEvent(new PointerEvent("pointerover",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",h)),f.dispatchEvent(new PointerEvent("pointermove",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",h)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let w=null;for(const $ of["more_vert","more_horiz","more"]){const _=Ce($);for(const F of _){const P=F.getBoundingClientRect();if(P.top>=M.top-20&&P.top<=M.bottom&&P.right>=M.right-150&&P.right<=M.right+20){w=F;break}}if(w)break}if(!w){const $=document.querySelectorAll("button");for(const _ of $){const F=_.getBoundingClientRect();if(F.width<50&&F.height<50&&F.top>=M.top-10&&F.top<=M.top+60&&F.left>=M.right-80){const P=_.querySelectorAll("i");for(const N of P)if((((R=N.textContent)==null?void 0:R.trim())||"").includes("more")){w=_;break}if(w)break;const V=_.getAttribute("aria-label")||"";if(V.includes("เพิ่มเติม")||V.includes("more")){w=_;break}}}}if(!w)I("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const $=w.getBoundingClientRect(),_=$.left+$.width/2,F=$.top+$.height/2,P={bubbles:!0,cancelable:!0,clientX:_,clientY:F,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",P)),await m(80),w.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",P)),w.dispatchEvent(new MouseEvent("click",P)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let V=null;const N=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const L of N){const H=(L.textContent||"").trim();if(H.includes("ทำให้เป็นภาพเคลื่อนไหว")||H.includes("Animate")||H.includes("animate")){V=L;break}}if(!V)I("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const L=V.getBoundingClientRect(),H=L.left+L.width/2,j=L.top+L.height/2,G={bubbles:!0,cancelable:!0,clientX:H,clientY:j,button:0};V.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mousedown",G)),await m(80),V.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mouseup",G)),V.dispatchEvent(new MouseEvent("click",G)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),S("animate","done"),await m(3e3)}}}}catch(b){I(`ขั้น 4 ผิดพลาด: ${b.message}`),c.push("⚠️ Animate")}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),S("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let b=!1;const f=document.querySelectorAll("button, span, div");for(const O of f){const M=(O.textContent||"").trim(),v=O.getBoundingClientRect();if((M==="วิดีโอ"||M==="Video"||M.includes("วิดีโอ"))&&v.bottom>window.innerHeight*.7){b=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}b||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const x=xt();x?(await Ie(x,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),S("vid-prompt","done")):(I("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),p.push("video prompt input not found"),S("vid-prompt","error")),await m(1e3),S("vid-generate","active");const C=wt();if(C){const O=C.getBoundingClientRect(),M=O.left+O.width/2,v=O.top+O.height/2,D={bubbles:!0,cancelable:!0,clientX:M,clientY:v,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),C.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",D)),C.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),S("vid-generate","done"),await m(500),C.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),C.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",D)),C.dispatchEvent(new MouseEvent("click",D)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else I("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),p.push("video generate button not found"),S("vid-generate","error")}catch(b){I(`ขั้น 5 ผิดพลาด: ${b.message}`),c.push("⚠️ Video Gen"),p.push(`video gen error: ${b.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ge("animate"),ge("vid-prompt"),ge("vid-generate"),ge("vid-wait");if(t.videoPrompt){S("vid-wait","active");const b=t.sceneCount||1,f=t.videoScenePrompts||[t.videoPrompt];if(b>1)try{Ft(b)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${b>1?`ต่อ ${b} ฉาก`:"ดาวน์โหลด"} ===`);const x=()=>{const M=document.querySelectorAll("div, span, p, label, strong, small");for(const v of M){if(v.closest("#netflow-engine-overlay"))continue;const D=(v.textContent||"").trim();if(D.length>10)continue;const h=D.match(/(\d{1,3})\s*%/);if(!h)continue;const w=parseInt(h[1],10);if(w<1||w>100)continue;const $=v.getBoundingClientRect();if(!($.width===0||$.width>150)&&!($.top<0||$.top>window.innerHeight))return w}return null},C=async(M=6e5)=>{n("รอการสร้างวิดีโอ..."),S("vid-wait","active"),await m(5e3);const v=()=>{const G=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const q of G){if(q.closest("#netflow-engine-overlay"))continue;const Z=(q.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const ie=q.tagName.toLowerCase(),ae=q.className&&typeof q.className=="string"?q.className.split(/\s+/).slice(0,2).join(" "):"",se=q.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${ie}.${ae}> ที่ (${se.left.toFixed(0)},${se.top.toFixed(0)}) w=${se.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},D=We();n(D?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const h=Date.now();let w=-1,$=0,_=!1;for(;Date.now()-h<M;){const G=x();if(G!==null){if(G!==w&&(n(`ความคืบหน้าวิดีโอ: ${G}%`),w=G,S("vid-wait","active",G)),$=Date.now(),G>=100){n("✅ ตรวจพบ 100%!"),_=!0;break}}else if(w>30){const X=Math.floor((Date.now()-$)/1e3);if(X>=5){n(`✅ % หายไปที่ ${w}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),_=!0;break}n(`⏳ % หายที่ ${w}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-h)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!_&&w>0&&We(!0)&&!D){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${w}% — วิดีโอเสร็จ!`),_=!0;break}if(fe())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(w<1){const X=bt();if(X)return I(`❌ สร้างวิดีโอล้มเหลว: ${X}`),null}await m(3e3)}const F=We();if(!F)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),S("vid-wait","error"),null;const P=F;_?(S("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const V=P.getBoundingClientRect();let N=V.left+V.width/2,L=V.top+V.height/2,H=P;const j=P.querySelector("video, img, canvas");if(j){const G=j.getBoundingClientRect();G.width>50&&G.height>50&&(N=G.left+G.width/2,L=G.top+G.height/2,H=j,n(`🎯 พบรูปย่อ <${j.tagName.toLowerCase()}> ในการ์ดที่ (${N.toFixed(0)},${L.toFixed(0)}) ${G.width.toFixed(0)}x${G.height.toFixed(0)}`))}else L=V.top+V.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${N.toFixed(0)},${L.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${N.toFixed(0)}, ${L.toFixed(0)})...`),Nt(H);for(let G=0;G<8;G++){const X={bubbles:!0,cancelable:!0,clientX:N+G%2,clientY:L};H.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousemove",X)),await m(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:b,scenePrompts:f,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${b} ฉาก, ${f.length} prompts, theme: ${t.theme})`)}catch(G){n(`⚠️ ไม่สามารถบันทึก pending action: ${G.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await O(H),n("✅ คลิกการ์ดวิดีโอเสร็จ"),P},O=async M=>{const v=M.getBoundingClientRect(),D=v.left+v.width/2,h=v.top+v.height/2,w={bubbles:!0,cancelable:!0,clientX:D,clientY:h,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",w)),await m(80),M.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",w)),M.dispatchEvent(new MouseEvent("click",w)),await m(50),M.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await C())I("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),S("vid-wait","error");else{c.push("✅ Video Complete"),S("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const v=await new Promise(D=>{chrome.storage.local.get("netflow_pending_action",h=>{if(chrome.runtime.lastError){D(null);return}D((h==null?void 0:h.netflow_pending_action)||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),v.action==="mute_video"?await yt(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await $t(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch(M){I(`ขั้น 6 ผิดพลาด: ${M.message}`),c.push("⚠️ Step6"),p.push(`step 6: ${M.message}`)}}const E=p.length===0;try{ke(E?5e3:8e3)}catch(b){console.warn("Overlay complete error:",b)}return{success:E,message:E?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${p.join(", ")}`,step:E?"done":"partial"}}async function yt(t,e=[],r){var Y;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Ae(r)}catch{}try{Fe(t)}catch(B){n(`⚠️ showOverlay error: ${B.message}`)}try{const B=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const R of B)S(R,"done");t>=2&&S("scene2-prompt","active"),n(`✅ overlay restored: ${B.length} steps done, sceneCount=${t}`)}catch(B){n(`⚠️ overlay restore error: ${B.message}`)}await m(1500);const a=(()=>{for(const B of document.querySelectorAll("button")){const R=B.querySelectorAll("i");for(const f of R){const x=(f.textContent||"").trim();if(x==="volume_up"||x==="volume_off"||x==="volume_mute"){const C=B.getBoundingClientRect();if(C.width>0&&C.height>0)return B}}const b=(B.getAttribute("aria-label")||"").toLowerCase();if(b.includes("mute")||b.includes("ปิดเสียง")){const f=B.getBoundingClientRect();if(f.width>0&&f.height>0)return B}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let o=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let h=2;h<=t;h++){const w=e[h-1];if(!w){I(`ไม่พบ prompt สำหรับฉากที่ ${h}`);continue}n(`── ฉากที่ ${h}/${t}: วาง prompt + generate ──`);let $=null;const _=Date.now();for(;!$&&Date.now()-_<1e4;){const q=document.querySelectorAll("[data-slate-editor='true']");if(q.length>0&&($=q[q.length-1]),!$){const Z=document.querySelectorAll("[role='textbox'][contenteditable='true']");Z.length>0&&($=Z[Z.length-1])}$||await m(1e3)}if(!$){I("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${$.tagName.toLowerCase()}> ${$.className.substring(0,40)}`),await Ie($,w),n(`วาง prompt ฉาก ${h} (${w.length} ตัวอักษร) ✅`);try{S(`scene${h}-prompt`,"done"),S(`scene${h}-gen`,"active")}catch{}await m(1e3);const F=$.getBoundingClientRect();let P=null,V=1/0;for(const q of document.querySelectorAll("button")){if(q.disabled)continue;const Z=q.querySelectorAll("i");let ie=!1;for(const he of Z)if((he.textContent||"").trim()==="arrow_forward"){ie=!0;break}if(!ie)continue;const ae=q.getBoundingClientRect();if(ae.width<=0||ae.height<=0)continue;const se=Math.abs(ae.top-F.top)+Math.abs(ae.right-F.right);se<V&&(V=se,P=q)}if(!P)for(const q of document.querySelectorAll("button")){const Z=q.querySelectorAll("i");for(const ie of Z)if((ie.textContent||"").trim()==="arrow_forward"){const ae=q.getBoundingClientRect();if(ae.width>0&&ae.height>0){P=q;break}}if(P)break}if(!P){I("ไม่พบปุ่ม Generate/Send");return}await new Promise(q=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:h,scenePrompts:e}},()=>q())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${h}/${t})`),await ee(P),n(`คลิก Generate ฉาก ${h} ✅`);try{S(`scene${h}-gen`,"done"),S(`scene${h}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${h} gen เสร็จ ──`),await m(5e3);let N=0,L=0;const H=Date.now(),j=6e5,G=5e3;let X=!1;for(;Date.now()-H<j;){let q=null;const Z=document.querySelectorAll("div, span, p, label, strong, small");for(const ie of Z){if(ie.closest("#netflow-engine-overlay"))continue;const se=(ie.textContent||"").trim().match(/^(\d{1,3})%$/);if(se){const he=ie.getBoundingClientRect();if(he.width>0&&he.height>0&&he.width<120&&he.height<60){q=parseInt(se[1],10);break}}}if(q!==null){if(q!==N){n(`🎬 ฉาก ${h} ความคืบหน้า: ${q}%`),N=q;try{S(`scene${h}-wait`,"active",q)}catch{}}L=0}else if(N>0){if(L===0)L=Date.now(),n(`🔍 ฉาก ${h}: % หายไป (จาก ${N}%) — กำลังยืนยัน...`);else if(Date.now()-L>=G){n(`✅ ฉาก ${h}: % หายไป ${G/1e3} วินาที — เจนเสร็จ!`),X=!0;break}}if(fe()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}X||I(`ฉาก ${h} หมดเวลา`),n(`✅ ฉาก ${h} เสร็จแล้ว`);try{S(`scene${h}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{S("download","active")}catch{}await m(2e3);const B=Date.now();let R=null;const b=Date.now();for(;!R&&Date.now()-b<1e4;){for(const h of document.querySelectorAll("button")){const w=h.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const $=h.getBoundingClientRect();if($.width>0&&$.height>0){R=h;break}}}R||await m(1e3)}if(!R){I("ไม่พบปุ่มดาวน์โหลด");return}await ee(R),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await m(1500);let f=null;for(let h=0;h<3&&!f;h++){h>0&&n(`🔄 ลองหา 720p ครั้งที่ ${h+1}...`);let w=null;const $=Date.now();for(;!w&&Date.now()-$<5e3;){for(const N of document.querySelectorAll("[role='menuitem']"))if((N.textContent||"").trim().includes("Full Video")&&N.querySelector("i")){const H=N.getBoundingClientRect();if(H.width>0&&H.height>0){w=N;break}}w||await m(500)}if(!w){I("ไม่พบ Full Video");continue}const _=w.getBoundingClientRect(),F=_.left+_.width/2,P=_.top+_.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:F,clientY:P})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:P})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F,clientY:P})),await ee(w),n("คลิก/hover Full Video ✅"),await m(2e3);const V=Date.now();for(;!f&&Date.now()-V<8e3;){for(const N of document.querySelectorAll("button[role='menuitem']")){const L=N.querySelectorAll("span");for(const H of L)if((H.textContent||"").trim()==="720p"){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0){f=N;break}}if(f)break}f||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:P})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F+20,clientY:P}))),await m(500))}}if(!f){I("ไม่พบ 720p");return}await ee(f),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const x=Date.now();let C=!1,O=!1;for(;Date.now()-x<3e5;){for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(h.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),C=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(O||(O=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(C)break;if(O){let h=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){h=!0;break}if(!h){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),C=!0;break}}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await m(2e3)}if(!C){I("เตรียมไฟล์หมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let M=!1;const v=Date.now();for(;Date.now()-v<6e4&&!M;){try{await new Promise(h=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:B},w=>{chrome.runtime.lastError?I(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),M=!0,w.downloadUrl&&(o=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-v)/1e3)}s)`),h()})})}catch(h){I(`ตรวจสอบผิดพลาด: ${h.message}`)}M||await m(3e3)}M||I("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const D=await Ve();o||(o=D);try{S("open","done"),ke(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Ge(o),Le(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const d=(B,R="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const b of document.querySelectorAll(R)){const f=(b.textContent||"").trim();if(f.includes(B)&&f.length<100){const x=b.getBoundingClientRect();if(x.width>0&&x.height>0&&x.top>=0)return b}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const s=Date.now();for(;!l&&Date.now()-s<1e4;){for(const B of document.querySelectorAll("button, [role='button']")){const R=(B.textContent||"").trim(),b=R.toLowerCase();if((b.includes("download")||b.includes("ดาวน์โหลด"))&&R.length<80){const f=B.getBoundingClientRect();if(f.width>0&&f.height>0){l=B;break}}}if(!l)for(const B of document.querySelectorAll("button")){const R=(B.getAttribute("aria-label")||"").toLowerCase();if(R.includes("download")||R.includes("ดาวน์")){const b=B.getBoundingClientRect();if(b.width>0&&b.height>0){l=B;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!l){I("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await ee(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const c=Date.now();let p=null;const u=Date.now();for(;!p&&Date.now()-u<5e3;)p=d("1080p"),p||(n("รอ 1080p..."),await m(500));if(!p){I("ไม่พบ 1080p");return}await ee(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const k=Date.now();let A=!1,T=!1,y=0;const g=3e3;for(;Date.now()-k<3e5;){const R=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(R.includes("upscaling complete")||R.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),A=!0;break}for(const f of document.querySelectorAll("div, span, p")){const x=(f.textContent||"").trim().toLowerCase();if(x.length<60&&(x.includes("upscaling complete")||x.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(Y=f.textContent)==null?void 0:Y.trim()}")`),A=!0;break}}if(A)break;if(R.includes("upscaling your video")||R.includes("กำลังอัปสเกล")){T=!0,y=0;const f=Math.floor((Date.now()-k)/1e3);n(`⏳ กำลังอัปสเกล... (${f} วินาที)`)}else if(T){if(y===0)y=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-y>=g){n(`✅ ข้อความ Upscaling หายไป ${g/1e3} วินาที — เสร็จ!`),A=!0;break}}else{const f=Math.floor((Date.now()-k)/1e3);f%10<3&&n(`⏳ รอ Upscale... (${f} วินาที)`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!A){I("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let i=!1;const E=Date.now();for(;Date.now()-E<6e4&&!i;){try{await new Promise(B=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},R=>{chrome.runtime.lastError?I(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):R!=null&&R.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${R.message}`),i=!0,R.downloadUrl&&(o=R.downloadUrl,n(`[TikTok] จะใช้ download URL: ${R.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-E)/1e3)}s)`),B()})})}catch(B){I(`ตรวจสอบผิดพลาด: ${B.message}`)}i||await m(3e3)}i||I("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const z=await Ve();o||(o=z),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Ge(o),Le(2e3)}async function $t(t=2,e=2,r,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Ae(r)}catch{}try{Fe(t)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let x=2;x<=e;x++)f.push(`scene${x}-prompt`,`scene${x}-gen`),x<e&&f.push(`scene${x}-wait`);for(const x of f)S(x,"done");S(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${e}/${t} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await m(2e3);const o=(()=>{for(const f of document.querySelectorAll("button")){const x=f.querySelectorAll("i");for(const C of x){const O=(C.textContent||"").trim();if(O==="volume_up"||O==="volume_off"||O==="volume_mute"){const M=f.getBoundingClientRect();if(M.width>0&&M.height>0)return f}}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let d=0,l=0;const s=Date.now(),c=6e5,p=5e3;let u=!1,k=0;for(;Date.now()-s<c;){let f=null;const x=document.querySelectorAll("div, span, p, label, strong, small");for(const C of x){if(C.closest("#netflow-engine-overlay"))continue;const M=(C.textContent||"").trim().match(/^(\d{1,3})%$/);if(M){const v=C.getBoundingClientRect();if(v.width>0&&v.height>0&&v.width<120&&v.height<60){f=parseInt(M[1],10);break}}}if(f!==null){if(k=0,f!==d){n(`🎬 scene ${e} ความคืบหน้า: ${f}%`),d=f;try{S(`scene${e}-wait`,"active",f)}catch{}}l=0}else if(d>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-l>=p){n(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),u=!0;break}}else if(k++,k>=15){const C=document.querySelectorAll("video");let O=!1;for(const M of C)if(M.readyState>=2&&!M.paused&&M.getBoundingClientRect().width>200){O=!0;break}if(O){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),u=!0;break}if(k>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),u=!0;break}}await m(2e3)}u||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{S(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await m(2e3);for(let f=e+1;f<=t;f++){const x=a[f-1];if(!x){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate (pending recovery) ──`);let C=null;const O=Date.now();for(;!C&&Date.now()-O<1e4;){const P=document.querySelectorAll("[data-slate-editor='true']");if(P.length>0&&(C=P[P.length-1]),!C){const V=document.querySelectorAll("[role='textbox'][contenteditable='true']");V.length>0&&(C=V[V.length-1])}C||await m(1e3)}if(!C){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await Ie(C,x),n(`วาง prompt ฉาก ${f} (${x.length} ตัวอักษร) ✅`);try{S(`scene${f}-prompt`,"done"),S(`scene${f}-gen`,"active")}catch{}await m(1e3);const M=C.getBoundingClientRect();let v=null,D=1/0;for(const P of document.querySelectorAll("button")){if(P.disabled)continue;const V=P.querySelectorAll("i");let N=!1;for(const j of V)if((j.textContent||"").trim()==="arrow_forward"){N=!0;break}if(!N)continue;const L=P.getBoundingClientRect();if(L.width<=0||L.height<=0)continue;const H=Math.abs(L.top-M.top)+Math.abs(L.right-M.right);H<D&&(D=H,v=P)}if(!v)for(const P of document.querySelectorAll("button")){const V=P.querySelectorAll("i");for(const N of V)if((N.textContent||"").trim()==="arrow_forward"){const L=P.getBoundingClientRect();if(L.width>0&&L.height>0){v=P;break}}if(v)break}if(!v){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(P=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:f,scenePrompts:a}},()=>P())}),await ee(v),n(`คลิก Generate ฉาก ${f} ✅`);try{S(`scene${f}-gen`,"done"),S(`scene${f}-wait`,"active")}catch{}await m(5e3);let h=0,w=0;const $=Date.now();let _=!1,F=0;for(;Date.now()-$<6e5;){let P=null;const V=document.querySelectorAll("div, span, p, label, strong, small");for(const N of V){if(N.closest("#netflow-engine-overlay"))continue;const H=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0&&j.width<120&&j.height<60){P=parseInt(H[1],10);break}}}if(P!==null){if(F=0,P!==h){n(`🎬 ฉาก ${f} ความคืบหน้า: ${P}%`),h=P;try{S(`scene${f}-wait`,"active",P)}catch{}}w=0}else if(h>0){if(w===0)w=Date.now();else if(Date.now()-w>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),_=!0;break}}else if(F++,F>=15){const N=document.querySelectorAll("video");let L=!1;for(const H of N)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){L=!0;break}if(L){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),_=!0;break}if(F>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),_=!0;break}}await m(2e3)}_||n(`⚠️ ฉาก ${f} หมดเวลา`);try{S(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),await m(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await m(3e3);let A=null;try{S("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const T=Date.now();let y=null;const g=Date.now();for(;!y&&Date.now()-g<1e4;){for(const f of document.querySelectorAll("button")){const x=f.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const C=f.getBoundingClientRect();if(C.width>0&&C.height>0){y=f;break}}}y||await m(1e3)}if(!y){I("ไม่พบปุ่มดาวน์โหลด");return}await ee(y),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await m(1500);let i=null;for(let f=0;f<3&&!i;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let x=null;const C=Date.now();for(;!x&&Date.now()-C<5e3;){for(const h of document.querySelectorAll("[role='menuitem']"))if((h.textContent||"").trim().includes("Full Video")&&h.querySelector("i")){const $=h.getBoundingClientRect();if($.width>0&&$.height>0){x=h;break}}x||await m(500)}if(!x){I("ไม่พบ Full Video");continue}const O=x.getBoundingClientRect(),M=O.left+O.width/2,v=O.top+O.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:M,clientY:v})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:M,clientY:v})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:M,clientY:v})),await ee(x),n("คลิก/hover Full Video ✅"),await m(2e3);const D=Date.now();for(;!i&&Date.now()-D<8e3;){for(const h of document.querySelectorAll("button[role='menuitem']")){const w=h.querySelectorAll("span");for(const $ of w)if(($.textContent||"").trim()==="720p"){const _=h.getBoundingClientRect();if(_.width>0&&_.height>0){i=h;break}}if(i)break}i||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:M,clientY:v})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:M+20,clientY:v}))),await m(500))}}if(!i){I("ไม่พบ 720p");return}await ee(i),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const E=Date.now();let z=!1,Y=!1;for(;Date.now()-E<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(f.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),z=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(Y||(Y=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(z)break;if(Y){let f=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),z=!0;break}}await m(2e3)}if(!z){I("เตรียมไฟล์หมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let B=!1;const R=Date.now();for(;Date.now()-R<6e4&&!B;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:T},x=>{chrome.runtime.lastError?I(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),B=!0,x.downloadUrl&&(A=x.downloadUrl,n(`[TikTok] จะใช้ download URL: ${x.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-R)/1e3)}s)`),f()})})}catch(f){I(`ตรวจสอบผิดพลาด: ${f.message}`)}B||await m(3e3)}B||I("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const b=await Ve();A||(A=b);try{S("open","done"),ke(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Ge(A),Le(2e3)}async function Kt(){try{const t=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",l=>{if(chrome.runtime.lastError){d(null);return}d((l==null?void 0:l.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-t.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:t},()=>d())}),await m(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",l=>{const s=l==null?void 0:l.netflow_pending_action;d((s==null?void 0:s._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(r/1e3)} วินาที)`),t.action==="mute_video"?await yt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await $t(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),jt(t).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>{if(a instanceof Ue||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Pe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{gt()}catch{}}else console.error("[Netflow AI] Generate error:",a)}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const a=Vt();if(!a){I("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=a.getBoundingClientRect(),d=o.left+o.width/2,l=o.top+o.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${l.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const c=document.elementFromPoint(d,l);c?(await ee(c),n(`คลิก ${s+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await ee(a),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Kt()})();
