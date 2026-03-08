(function(){"use strict";const ie={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let X=ie.green,ue=null;function Pe(t){t&&ie[t]&&(ue=t,X=ie[t],qe(),requestAnimationFrame(()=>lt()))}function wt(){if(ue&&ie[ue])return ie[ue];try{const t=localStorage.getItem("netflow_app_theme");if(t&&ie[t])return ie[t]}catch{}return ie.green}let Z=0,ee=255,te=65;function qe(){const t=X.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(Z=parseInt(t[1],16),ee=parseInt(t[2],16),te=parseInt(t[3],16))}const Ve='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',He='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let Y=null,j=null,ae=null,We=0,$e=null,ge=null,Ee=null,Ie=0,se=!1,ne=null,me=null,he=null,ke=1,U=[];function _e(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let a=2;a<=t;a++)e.push({stepId:`scene${a}-prompt`,label:`ฉาก ${a} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${a}-gen`,label:`ฉาก ${a} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${a}-wait`,label:`ฉาก ${a} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const le=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];U=_e(1);function xt(t){const e=t.rgb,a=t.accentRgb,o=t.doneRgb,i=t.hex,d=t.accentHex,p=t.doneHex,s=(()=>{const h=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const r=E=>Math.min(255,E+80);return`#${[1,2,3].map(E=>r(parseInt(h[E],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const h=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const r=E=>Math.min(255,E+60);return`#${[1,2,3].map(E=>r(parseInt(h[E],16)).toString(16).padStart(2,"0")).join("")}`})(),l=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),w=l?Math.max(parseInt(l[1],16),parseInt(l[2],16),parseInt(l[3],16),1):255,b=l?parseInt(l[1],16)/w:0,T=l?parseInt(l[2],16)/w:1,v=l?parseInt(l[3],16)/w:.25,$=h=>`${Math.round(b*h)}, ${Math.round(T*h)}, ${Math.round(v*h)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${a},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${a},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${$(18)},0.94) 0%, rgba(${$(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${a},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${a},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${a},0.18); }
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
        rgba(${a},0.054) 70px,
        rgba(${a},0.054) 71px
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
        rgba(${a},0.045) 113px,
        rgba(${a},0.045) 114px
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
    background: radial-gradient(circle, rgba(${a},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${a},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${a},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${a},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${a},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${a},0.05) 2px, transparent 2px),
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
        rgba(${a},0.06) 195deg,
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
        rgba(${a},0.035) 18px,
        rgba(${a},0.035) 19px
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
        radial-gradient(circle, rgba(${a},0.05) 1px, transparent 1px);
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
            rgba(${a},0.025) 40px, rgba(${a},0.025) 41px
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
        rgba(${a},0.035) 25px, rgba(${a},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${a},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${a},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${a},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${a},0.08) 0%, transparent 50%),
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
        rgba(${a},0.04) 2.5%,
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
    background: rgba(${$(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${$(180)},0.05),
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
            0 0 200px rgba(${$(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${$(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${a},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${a},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${a},0.4)); }
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${o}, 0.12);
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
    background: linear-gradient(180deg, rgba(${$(5)},0.95) 0%, rgba(${$(12)},0.98) 100%);
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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${a},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${a},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${$(6)},0.75) 0%, rgba(${$(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${a},0.08);
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
    color: rgba(${a},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${a},0.7),
        0 0 12px rgba(${a},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${$(8)}, 0.88);
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
    background: ${p};
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
    background: linear-gradient(90deg, ${i}, ${s});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${p}, ${c});
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
    background: linear-gradient(90deg, ${p}, ${c});
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
    background: rgba(${$(8)},0.8);
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
    background: rgba(${$(8)}, 0.9);
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${o},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${o},0.5);
    text-shadow: 0 0 4px rgba(${o},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${o},0.4),
        0 0 8px rgba(${o},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${p};
    box-shadow: 0 0 5px rgba(${o},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${o},0.1);
    color: ${c};
    text-shadow: 0 0 4px rgba(${o},0.3);
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

    `}function Ye(){ae||(ae=document.createElement("style"),ae.id="netflow-overlay-styles",ae.textContent=xt(X),document.head.appendChild(ae))}function Ue(t){t.innerHTML="",U.forEach((e,a)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${a+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function vt(){const t=document.getElementById("nf-terminal");if(!t)return;Ue(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${U.length}`)}function Xe(t,e){let s="";for(let T=0;T<20;T++){const v=T/20*Math.PI*2,$=(T+.2)/20*Math.PI*2,h=(T+.5)/20*Math.PI*2,r=(T+.8)/20*Math.PI*2,E=(T+1)/20*Math.PI*2;s+=`${T===0?"M":"L"}${(120+100*Math.cos(v)).toFixed(1)},${(120+100*Math.sin(v)).toFixed(1)} `,s+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `,s+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,s+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,s+=`L${(120+100*Math.cos(E)).toFixed(1)},${(120+100*Math.sin(E)).toFixed(1)} `}s+="Z";const c=14,l=72,w=62;let b="";for(let T=0;T<c;T++){const v=T/c*Math.PI*2,$=(T+.25)/c*Math.PI*2,h=(T+.75)/c*Math.PI*2,r=(T+1)/c*Math.PI*2;b+=`${T===0?"M":"L"}${(120+w*Math.cos(v)).toFixed(1)},${(120+w*Math.sin(v)).toFixed(1)} `,b+=`L${(120+l*Math.cos($)).toFixed(1)},${(120+l*Math.sin($)).toFixed(1)} `,b+=`L${(120+l*Math.cos(h)).toFixed(1)},${(120+l*Math.sin(h)).toFixed(1)} `,b+=`L${(120+w*Math.cos(r)).toFixed(1)},${(120+w*Math.sin(r)).toFixed(1)} `}return b+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${b}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${w}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function yt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ne=document.createElement("canvas"),ne.id="nf-matrix-canvas",t.appendChild(ne);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let k=1;k<=5;k++){const y=document.createElement("div");y.className=`nf-ambient-orb nf-orb-${k}`,t.appendChild(y)}const a=document.createElement("div");a.className="nf-pat-data",t.appendChild(a);const o=document.createElement("div");o.className="nf-pat-diag-a",t.appendChild(o);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",t.appendChild(d);const p=document.createElement("div");p.className="nf-pat-honeycomb",t.appendChild(p);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const l=document.createElement("div");l.className="nf-pat-diamond",t.appendChild(l);const w=document.createElement("div");w.className="nf-pat-wave-h",t.appendChild(w);const b=document.createElement("div");b.className="nf-pat-radar",t.appendChild(b);const T=document.createElement("div");T.className="nf-pat-ripple-1",t.appendChild(T);const v=document.createElement("div");v.className="nf-pat-ripple-2",t.appendChild(v);const $=document.createElement("div");$.className="nf-pat-techscan",t.appendChild($);const h=document.createElement("div");h.className="nf-center-glow",t.appendChild(h);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const E=document.createElement("div");E.className="nf-crt-scanlines",t.appendChild(E);const C=document.createElement("div");C.className="nf-vignette",t.appendChild(C);for(let k=0;k<3;k++){const y=document.createElement("div");y.className="nf-pulse-ring",t.appendChild(y)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const y=document.createElement("div");y.className=`nf-corner-deco ${k}`,t.appendChild(y)});const R=document.createElement("button");R.className="nf-stop-btn",R.innerHTML='<span class="nf-stop-icon"></span> หยุด',R.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Me("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(R);const q=document.createElement("button");q.className="nf-close-btn",q.textContent="✕ ซ่อน",q.onclick=()=>Be(),t.appendChild(q);const m=document.createElement("div");m.className="nf-layout";const f=document.createElement("div");f.className="nf-core-monitor",f.id="nf-core-monitor";const I=document.createElement("div");I.className="nf-core-header",I.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${U.length}</div>
    `,f.appendChild(I);const D=document.createElement("div");D.className="nf-terminal",D.id="nf-terminal",Ue(D),f.appendChild(D);const M=document.createElement("div");M.className="nf-engine-core",M.id="nf-engine-core";const O=document.createElement("div");O.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const y=document.createElement("div");y.className=`nf-frame-corner ${k}`,O.appendChild(y)}),M.appendChild(O);const x="http://www.w3.org/2000/svg",g=document.createElementNS(x,"svg");g.setAttribute("class","nf-engine-waves"),g.setAttribute("viewBox","0 0 560 140"),g.setAttribute("preserveAspectRatio","none"),g.id="nf-engine-waves";for(let k=0;k<4;k++){const y=document.createElementNS(x,"path");y.setAttribute("fill","none"),y.setAttribute("stroke-width",k<2?"1.5":"1"),y.setAttribute("stroke",k<2?`rgba(${X.rgb},${.14+k*.1})`:`rgba(${X.accentRgb},${.1+(k-2)*.08})`),y.setAttribute("data-wave-idx",String(k)),g.appendChild(y)}M.appendChild(g);const S=document.createElement("div");S.className="nf-engine-brand-inner",S.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Xe(X.rgb,X.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Xe(X.rgb,X.accentRgb)}
        </div>
    `,M.appendChild(S);const B=document.createElement("div");B.className="nf-engine-stats",B.id="nf-engine-stats",B.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,y,z])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${y}">${z}</span></div>`).join(""),M.appendChild(B),f.appendChild(M),m.appendChild(f);const _=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];le.forEach((k,y)=>{const z=$t(k);z.classList.add(_[y]),z.id=`nf-mod-${k.id}`,m.appendChild(z)}),t.appendChild(m);for(let k=0;k<30;k++){const y=document.createElement("div");y.className="nf-particle",y.style.left=`${5+Math.random()*90}%`,y.style.bottom=`${Math.random()*40}%`,y.style.animationDuration=`${3+Math.random()*5}s`,y.style.animationDelay=`${Math.random()*4}s`;const z=.3+Math.random()*.4,F=.7+Math.random()*.3;y.style.background=`rgba(${Math.floor(Z*F)}, ${Math.floor(ee*F)}, ${Math.floor(te*F)}, ${z})`,y.style.width=`${1+Math.random()*2}px`,y.style.height=y.style.width,t.appendChild(y)}return t}function $t(t){const e=document.createElement("div");e.className="nf-module";const a=document.createElement("div");a.className="nf-mod-header",a.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(a),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let p="";i.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${p}
        `,e.appendChild(d)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function Et(){We=Date.now(),$e=setInterval(()=>{const t=Math.floor((Date.now()-We)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${a}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${a}`)},1e3)}function je(){$e&&(clearInterval($e),$e=null)}const kt=120,Ke=160,Je=.4;let de=null,Qe=0,Ze=0,et=0,be=[];function Ct(t,e){be=[];for(let a=0;a<kt;a++){const o=Math.random();let i;o<.22?i=0:o<.4?i=1:o<.55?i=2:o<.68?i=3:o<.84?i=4:i=5;const d=Math.random()*t,p=Math.random()*e,s=50+Math.random()*220,c=Math.random()*Math.PI*2,l=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);be.push({x:i===0?Math.random()*t:d+Math.cos(c)*s,y:i===0?Math.random()*e:p+Math.sin(c)*s,vx:(Math.random()-.5)*Je,vy:(Math.random()-.5)*Je,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:p,oRadius:s,oAngle:c,oSpeed:l})}}function Mt(){if(!ne)return;const t=ne;if(me=t.getContext("2d"),!me)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,be.length===0&&Ct(t.width,t.height)};e(),window.addEventListener("resize",e);let a=null,o=0,i=0,d=!1;function p(){if(!me||!ne){he=null;return}if(he=requestAnimationFrame(p),d=!d,d)return;const s=me,c=ne.width,l=ne.height;s.fillStyle=`rgba(${Z*.04|0},${ee*.04|0},${te*.06|0},1)`,s.fillRect(0,0,c,l),(!a||o!==c||i!==l)&&(o=c,i=l,a=s.createRadialGradient(c*.5,l*.5,0,c*.5,l*.5,Math.max(c,l)*.6),a.addColorStop(0,`rgba(${Z*.08|0},${ee*.08|0},${te*.1|0},0.4)`),a.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=a,s.fillRect(0,0,c,l);const w=be,b=w.length,T=Ke*Ke;for(let h=0;h<b;h++){const r=w[h];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>c&&(r.x=c,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>l&&(r.y=l,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const E=r.oAngle,C=r.oRadius*.7;r.x=r.oCx+C*Math.cos(E),r.y=r.oCy+C*Math.sin(E)*Math.cos(E),r.oCx+=Math.sin(E*.15)*.12,r.oCy+=Math.cos(E*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const E=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*E,r.y=r.oCy+Math.sin(r.oAngle)*E,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=c+30:r.x>c+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const E=r.oRadius+50;r.oCx<-E?r.oCx=c+E:r.oCx>c+E&&(r.oCx=-E),r.oCy<-E?r.oCy=l+E:r.oCy>l+E&&(r.oCy=-E)}}s.beginPath(),s.strokeStyle=`rgba(${Z},${ee},${te},0.06)`,s.lineWidth=.4;const v=new Path2D;for(let h=0;h<b;h++){const r=w[h];for(let E=h+1;E<b;E++){const C=w[E],R=r.x-C.x,q=r.y-C.y,m=R*R+q*q;m<T&&(1-m/T<.4?(s.moveTo(r.x,r.y),s.lineTo(C.x,C.y)):(v.moveTo(r.x,r.y),v.lineTo(C.x,C.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${Z},${ee},${te},0.18)`,s.lineWidth=.8,s.stroke(v),!de||Qe!==Z||Ze!==ee||et!==te){de=document.createElement("canvas");const h=48;de.width=h,de.height=h;const r=de.getContext("2d"),E=r.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);E.addColorStop(0,`rgba(${Z},${ee},${te},0.9)`),E.addColorStop(.3,`rgba(${Z},${ee},${te},0.35)`),E.addColorStop(1,`rgba(${Z},${ee},${te},0)`),r.fillStyle=E,r.fillRect(0,0,h,h),Qe=Z,Ze=ee,et=te}const $=de;for(let h=0;h<b;h++){const r=w[h],E=.6+.4*Math.sin(r.pulsePhase),C=r.radius*5*(.8+E*.4);s.globalAlpha=.5+E*.4,s.drawImage($,r.x-C/2,r.y-C/2,C,C)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<b;h++){const r=w[h];if(r.radius>2){const E=.6+.4*Math.sin(r.pulsePhase),C=r.radius*(.8+E*.4)*.35;s.moveTo(r.x+C,r.y),s.arc(r.x,r.y,C,0,Math.PI*2)}}s.fill()}p()}function St(){he!==null&&(cancelAnimationFrame(he),he=null),ne=null,me=null,be=[]}let we=null;const Ce=560,Pt=140,tt=Ce/2,nt=Pt/2,ot=[];for(let t=0;t<=Ce;t+=8){const e=Math.abs(t-tt)/tt;ot.push(Math.pow(Math.min(1,e*1.6),.6))}const It=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ce,off:t*.6,spd:.7+t*.12}));let Ae=!1;function it(){if(ge=requestAnimationFrame(it),Ae=!Ae,Ae)return;if(Ie+=.07,!we){const e=document.getElementById("nf-engine-waves");if(!e){ge=null;return}we=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<we.length;e++){const a=It[e],o=Ie*a.spd+a.off;t.length=0,t.push(`M 0 ${nt}`);let i=0;for(let d=0;d<=Ce;d+=8){const p=nt+a.amp*ot[i++]*Math.sin(d*a.freq+o);t.push(`L${d} ${p*10+.5|0}`)}we[e].setAttribute("d",t.join(" "))}}function _t(){Ie=0,it(),Mt(),Ee=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),a=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function at(){ge!==null&&(cancelAnimationFrame(ge),ge=null),Ee&&(clearInterval(Ee),Ee=null),we=null,St()}function Te(){let t=0;const e=U.filter(l=>l.status!=="skipped").length;for(const l of U){const w=document.getElementById(`nf-proc-${l.stepId}`);if(!w)continue;w.className="nf-proc-row";const b=w.querySelector(".nf-proc-badge");switch(l.status){case"done":w.classList.add("nf-proc-done"),b&&(b.textContent="✅ done"),t++;break;case"active":w.classList.add("nf-proc-active"),b&&(b.textContent=l.progress!==void 0&&l.progress>0?`⏳ ${l.progress}%`:"⏳ active");break;case"error":w.classList.add("nf-proc-error"),b&&(b.textContent="❌ error");break;case"skipped":w.classList.add("nf-proc-skipped"),b&&(b.textContent="— skip");break;default:w.classList.add("nf-proc-waiting"),b&&(b.textContent="(queued)")}}const a=U.findIndex(l=>l.status==="active"),o=a>=0?a+1:t>=e&&e>0?U.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${o}/${U.length}`);const d=document.querySelector(".nf-core-title-val"),p=document.querySelector(".nf-status-dot");t>=e&&e>0?(d&&(d.textContent="COMPLETE",d.style.color=X.doneHex),p&&(p.style.background=X.doneHex,p.style.boxShadow=`0 0 8px rgba(${X.doneRgb},0.7)`)):U.some(w=>w.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),p&&(p.style.background="#ef4444",p.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):U.some(w=>w.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=X.hex,d.style.textShadow=`0 0 10px rgba(${X.rgb},0.5)`);const s=document.getElementById("nf-terminal"),c=s==null?void 0:s.querySelector(".nf-proc-active");c&&s&&c.scrollIntoView({behavior:"smooth",block:"center"})}function rt(){j&&j.isConnected||(Ye(),j=document.createElement("button"),j.id="nf-toggle-btn",j.className="nf-toggle-visible",j.innerHTML=se?Ve:He,j.title="ซ่อน/แสดง Netflow Overlay",j.onclick=()=>Be(),document.body.appendChild(j))}function Be(){Y&&(rt(),se?(Y.classList.remove("nf-hidden"),Y.classList.add("nf-visible"),j&&(j.innerHTML=He),se=!1):(Y.classList.remove("nf-visible"),Y.classList.add("nf-hidden"),j&&(j.innerHTML=Ve),se=!0))}const st={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function lt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=ue;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const a=st[e]||st.green;let o;try{o=chrome.runtime.getURL(a)}catch{o=`/${a}`}const i=X.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${o}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Re(t=1){if(X=wt(),qe(),Y&&Y.isConnected){se&&Be();return}if(Y&&!Y.isConnected&&(Y=null),ae&&(ae.remove(),ae=null),Ye(),ke=t,U=_e(t),t>1){const e=le.find(o=>o.id==="video");if(e){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)o.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),o.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),o.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=o}const a=le.find(o=>o.id==="render");if(a){const o=a.steps.find(d=>d.id==="download");o&&(o.label="ดาวน์โหลด 720p");const i=a.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}Y=yt(),document.body.appendChild(Y),se=!1,rt(),Et(),_t(),requestAnimationFrame(()=>lt())}function ct(){je(),at(),se=!1,Y&&(Y.classList.add("nf-fade-out"),setTimeout(()=>{Y==null||Y.remove(),Y=null},500)),j&&(j.remove(),j=null)}const At={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Tt(t,e,a){const o=U.findIndex(l=>l.status==="active"),i=U.filter(l=>l.status==="done").length,d=U.length,p=o>=0?o+1:i>=d?d:i,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${p}/${d}`);const c=document.getElementById("nf-stat-scenes");if(c&&(c.textContent=ke>1?`1/${ke}`:"1/1"),e==="active"){const l=document.getElementById("nf-stat-status"),w=At[t]||t.toUpperCase();l&&(l.textContent=w)}else if(e==="done"&&i>=d){const l=document.getElementById("nf-stat-status");l&&(l.textContent="COMPLETE")}else if(e==="error"){const l=document.getElementById("nf-stat-status");l&&(l.textContent="ERROR")}if(a!==void 0&&a>0){const l=document.getElementById("nf-stat-progress");l&&(l.textContent=`${Math.min(100,a)}%`)}}function P(t,e,a){if(!Y)return;for(const i of le)for(const d of i.steps)d.id===t&&(d.status=e,a!==void 0&&(d.progress=a));for(const i of U)i.stepId===t&&(i.status=e,a!==void 0&&(i.progress=a));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),Tt(t,e,a),a!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,a)}%`)}De(),Te()}function pe(t){P(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function xe(t=4e3){je(),at(),De(),Te(),setTimeout(()=>ct(),t)}function De(){for(const t of le){const e=t.steps.filter(c=>c.status!=="skipped").length,a=t.steps.filter(c=>c.status==="done").length,o=t.steps.some(c=>c.status==="active"),i=e>0?Math.round(a/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${i}%`);const p=document.getElementById(`nf-modbar-${t.id}`);p&&(p.style.width=`${i}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),i>=100?s.classList.add("nf-done"):o&&s.classList.add("nf-active"))}}function Bt(t){var o,i,d,p;ke=t;const e=new Map;for(const s of U)e.set(s.stepId,{status:s.status,progress:s.progress});U=_e(t);for(const s of U){const c=e.get(s.stepId);c&&(s.status=c.status,c.progress!==void 0&&(s.progress=c.progress))}if(vt(),t>1){const s=le.find(c=>c.id==="video");if(s){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=s.steps.find(l=>l.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=s.steps.find(l=>l.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=s.steps.find(l=>l.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=s.steps.find(l=>l.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let l=2;l<=t;l++)c.push({id:`scene${l}-prompt`,label:`Scene ${l} Prompt`,status:"waiting"}),c.push({id:`scene${l}-gen`,label:`Scene ${l} Generate`,status:"waiting"}),c.push({id:`scene${l}-wait`,label:`Scene ${l} รอผล`,status:"waiting",progress:0});s.steps=c,dt(s)}}const a=le.find(s=>s.id==="render");if(a&&t>1){const s=a.steps.find(l=>l.id==="download");s&&(s.label="ดาวน์โหลด 720p");const c=a.steps.find(l=>l.id==="upscale");c&&(c.label="Full Video"),dt(a)}De(),Te()}function dt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let p="";i.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${p}
        `,e.appendChild(d)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function Me(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Me(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Me(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function ze(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}const Fe=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ne=/Win/i.test(navigator.userAgent),fe=Fe?"🍎 Mac":Ne?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${fe}`);class Oe extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const u=t=>new Promise((e,a)=>{if(window.__NETFLOW_STOP__)return a(new Oe);const o=setTimeout(()=>{if(window.__NETFLOW_STOP__)return a(new Oe);e()},t);u._lastId=o});function ce(){return!!window.__NETFLOW_STOP__}function pt(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const i=(o.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of t)if(i.includes(d))return((a=o.textContent)==null?void 0:a.trim())||d}}return null}async function Q(t){const e=t.getBoundingClientRect(),a=e.left+e.width/2,o=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await u(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await u(50),t.click()}function Rt(t){const e=t.getBoundingClientRect(),a=e.left+e.width/2,o=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function Dt(t){const e=[],a=document.querySelectorAll("i");for(const o of a){if((o.textContent||"").trim()!==t)continue;let d=o,p=null,s=1/0;for(let c=0;c<20&&d&&(d=d.parentElement,!(!d||d===document.body));c++){const l=d.getBoundingClientRect();if(l.width>100&&l.height>80&&l.width<window.innerWidth*.6&&l.top>=-10&&l.bottom<=window.innerHeight+10){const w=l.width*l.height;w<s&&(p=d,s=w)}}p&&!e.includes(p)&&e.push(p)}return e.sort((o,i)=>{const d=o.getBoundingClientRect(),p=i.getBoundingClientRect();return d.left-p.left}),e}function Le(t=!1){const e=[],a=document.querySelectorAll("video");for(const p of a){let s=p.parentElement;for(let c=0;c<10&&s;c++){const l=s.getBoundingClientRect();if(l.width>120&&l.height>80&&l.width<window.innerWidth*.7&&l.top>=-50&&l.left<window.innerWidth*.75){e.push({el:s,left:l.left});break}s=s.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const p of o){const s=(p.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let c=p.parentElement;for(let l=0;l<10&&c;l++){const w=c.getBoundingClientRect();if(w.width>120&&w.height>80&&w.width<window.innerWidth*.7&&w.top>=-50&&w.left<window.innerWidth*.75){e.push({el:c,left:w.left});break}c=c.parentElement}}}const i=document.querySelectorAll("img");for(const p of i){const s=(p.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let c=p.parentElement;for(let l=0;l<10&&c;l++){const w=c.getBoundingClientRect();if(w.width>120&&w.height>80&&w.width<window.innerWidth*.7&&w.top>=-50&&w.left<window.innerWidth*.75){e.push({el:c,left:w.left});break}c=c.parentElement}}}const d=Array.from(new Set(e.map(p=>p.el))).map(p=>e.find(s=>s.el===p));if(d.sort((p,s)=>p.left-s.left),d.length>0){const p=d[0].el,s=p.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),p}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function zt(){const t=Dt("image");if(t.length>0){const a=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${a.left.toFixed(0)},${a.top.toFixed(0)}) ขนาด ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const a of e){let o=a.parentElement;for(let i=0;i<10&&o;i++){const d=o.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Ft(t,e){var s;const[a,o]=t.split(","),i=((s=a.match(/:(.*?);/))==null?void 0:s[1])||"image/png",d=atob(o),p=new Uint8Array(d.length);for(let c=0;c<d.length;c++)p[c]=d.charCodeAt(c);return new File([p],e,{type:i})}function ve(t){var o;const e=[],a=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of a)if(((o=i.textContent)==null?void 0:o.trim())===t){const d=i.closest("button");d&&e.push(d)}return e}function Nt(){const t=[...ve("add"),...ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const i of o){const d=i.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const p=(i.textContent||"").trim();if(p==="+"||p==="add")return i}}return null}let e=null,a=0;for(const o of t){const i=o.getBoundingClientRect();i.y>a&&(a=i.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${a.toFixed(0)}`),e}function ft(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=ve(o);let d=null,p=0;for(const s of i){const c=s.getBoundingClientRect();c.y>p&&(p=c.y,d=s)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${p.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,a=0;for(const o of t){const i=o.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,p=i.y+i.x+(d?1e3:0);p>a&&(a=p,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const i=(o.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return o}return null}function ut(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const a=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of a){const i=o.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function Se(t,e){var a,o,i,d;t.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(c),await u(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${l.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${l.length} ตัวอักษร)`)}catch(p){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await u(100);const p=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(p);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await u(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await u(200);const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:p});t.dispatchEvent(s),await u(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((a=navigator.clipboard)!=null&&a.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await u(200),document.execCommand("paste"),await u(500);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${p.length} ตัวอักษร)`);return}}catch(p){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const p=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(p){let s=t[p];for(let c=0;c<30&&s;c++){const l=s.memoizedProps,w=s.memoizedState;if((o=l==null?void 0:l.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const b=l.editor;b.selection,b.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=w==null?void 0:w.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),w.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(p){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${p.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ot(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const a of e)t.push({input:a,origType:"file"}),a.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Lt(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${fe})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${fe})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Gt(t,e,a){var l;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(w=>w.input)];for(const w of o)!i.includes(w)&&w.offsetParent===null&&i.push(w);for(const w of i)w.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${fe})`),!1;let p;if(a&&a.size>0){const w=Array.from(d).filter(b=>!a.has(b));w.length>0?(p=w[w.length-1],n(`เล็งเป้า file input ใหม่ (${w.length} ใหม่, ${d.length} ทั้งหมด)`)):(p=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else p=d[d.length-1];const s=new DataTransfer;s.items.add(e);try{p.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((l=p.files)==null?void 0:l.length)??0} ไฟล์)`)}catch(w){n(`กำหนด target.files ล้มเหลว: ${w.message} — ลอง defineProperty`);try{Object.defineProperty(p,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(b){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${b.message}`),!1}}const c=p._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0}));try{const w=new DataTransfer;w.items.add(e);const b=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:w});p.dispatchEvent(b),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${fe}`),!0}function ye(){let t=0;const e=document.querySelectorAll("img");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const i=o.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&o.src&&o.offsetParent!==null&&t++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of a){if(o.closest("#netflow-engine-overlay"))continue;const i=o.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&o.offsetParent!==null&&t++}return t}async function gt(t,e){var w;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const a=Ft(t,e);n(`ขนาดไฟล์: ${(a.size/1024).toFixed(1)} KB`);const o=ye();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const i=async(b,T=8e3)=>{const v=Date.now();for(;Date.now()-v<T;){const $=ye();if($>o)return n(`✅ [${b}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${$}`),!0;await u(500)}return n(`⚠️ [${b}] รูปย่อไม่เพิ่ม (ยังคง ${ye()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=Nt();if(!d)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const p=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${p.size} ตัว`);const s=Lt();let c=Ot();const l=new MutationObserver(b=>{for(const T of b)for(const v of T.addedNodes)if(v instanceof HTMLInputElement&&v.type==="file"&&(v.type="text",c.push({input:v,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),v instanceof HTMLElement){const $=v.querySelectorAll('input[type="file"]');for(const h of $)h.type="text",c.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});l.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await u(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let b=!1;const T=Date.now();for(;!b&&Date.now()-T<5e3;){const $=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const h of $){if(h===d)continue;const r=h.querySelectorAll("i");for(const E of r){const C=((w=E.textContent)==null?void 0:w.trim())||"";if((C==="upload"||C==="upload_file")&&!Array.from(h.querySelectorAll("i")).map(q=>{var m;return(m=q.textContent)==null?void 0:m.trim()}).includes("drive_folder_upload")){h.click(),b=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${C}) ✅`);break}}if(b)break}if(!b)for(const h of $){if(h===d)continue;const r=h.childNodes.length<=5?(h.textContent||"").trim():"";if(r.length>0&&r.length<40){const E=r.toLowerCase();if(E==="upload"||E==="อัปโหลด"||E==="อัพโหลด"||E.includes("upload image")||E.includes("upload photo")||E.includes("อัปโหลดรูปภาพ")||E.includes("อัพโหลดรูปภาพ")||E.includes("from computer")||E.includes("จากคอมพิวเตอร์")){h.click(),b=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${r}") ✅`);break}}}b||await u(500)}return b?(await u(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Gt(c,a,p)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{l.disconnect(),s();for(const b of c)b.input.type!=="file"&&(b.input.type="file")}}async function qt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const a=document.querySelectorAll("button");let o=null;for(const v of a){const $=v.textContent||"";if(($.includes("Nano Banana")||$.includes("Imagen")||$.includes("วิดีโอ")||$.includes("รูปภาพ")||$.includes("Image")||$.includes("Video"))&&v.getBoundingClientRect().bottom>window.innerHeight*.7){o=v,n(`พบปุ่มตั้งค่าจากข้อความ: "${$.substring(0,30).trim()}"`);break}}if(!o)for(const v of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const $=ve(v);for(const h of $)if(h.getBoundingClientRect().bottom>window.innerHeight*.7){o=h,n(`พบปุ่มตั้งค่าจากไอคอน: ${v}`);break}if(o)break}if(!o)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=o.getBoundingClientRect(),d=i.left+i.width/2,p=i.top+i.height/2,s={bubbles:!0,cancelable:!0,clientX:d,clientY:p,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await u(1500);let c=!1,l=null;const w=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const v of w){const $=v.getAttribute("aria-controls")||"",h=v.id||"";if($.toUpperCase().includes("IMAGE")||h.toUpperCase().includes("IMAGE")){l=v,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${$})`);break}}if(!l)for(const v of document.querySelectorAll('[role="tab"]')){const $=v.id||"";if($.toUpperCase().includes("TRIGGER-IMAGE")){l=v,n(`พบแท็บ Image ผ่าน id: ${$}`);break}}if(!l)for(const v of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const $=(v.textContent||"").trim();if(($==="Image"||$.endsWith("Image")||$==="รูปภาพ"||$==="ภาพ")&&!$.includes("Video")&&!$.includes("วิดีโอ")){l=v,n(`พบแท็บ Image ผ่านข้อความ: "${$}"`);break}}if(l){const v=l.getAttribute("data-state")||"",$=l.getAttribute("aria-selected")||"";if(v==="active"||$==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const h=l.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",r)),await u(80),l.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",r)),l.dispatchEvent(new MouseEvent("click",r)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const b=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const $=(v.textContent||"").trim();if($===b||$.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const h=v.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",r)),await u(80),v.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",r)),v.dispatchEvent(new MouseEvent("click",r)),n(`เลือกทิศทาง: ${b}`),await u(400);break}}const T=`x${e}`;for(const v of document.querySelectorAll("button, [role='tab'], [role='option']"))if((v.textContent||"").trim()===T){const h=v.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",r)),await u(80),v.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",r)),v.dispatchEvent(new MouseEvent("click",r)),n(`เลือกจำนวน: ${T}`),await u(400);break}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function Vt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let a=null;const o=document.querySelectorAll("button");for(const b of o){const T=(b.textContent||"").trim();if(T.includes("Veo 3.1")&&T.includes("arrow_drop_down")){a=b,n(`พบปุ่ม Veo dropdown: "${T.substring(0,40).trim()}"`);break}}if(!a){for(const b of o)if(b.getAttribute("aria-haspopup")==="menu"){const T=(b.textContent||"").trim();if(T.includes("Veo")){a=b,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${T.substring(0,40).trim()}"`);break}}}if(!a)for(const b of o){const T=(b.textContent||"").trim();if(T.includes("Veo 3.1")&&b.getBoundingClientRect().bottom>window.innerHeight*.7){a=b,n(`พบปุ่ม Veo dropdown (bottom area): "${T.substring(0,40).trim()}"`);break}}if(!a)return A("ไม่พบปุ่ม Veo quality dropdown"),!1;if((a.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=a.getBoundingClientRect(),p=d.left+d.width/2,s=d.top+d.height/2,c={bubbles:!0,cancelable:!0,clientX:p,clientY:s,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await u(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let l=!1;const w=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const b of w){const T=b.querySelectorAll("span");for(const v of T)if((v.textContent||"").trim()===e){const h=b.getBoundingClientRect();if(h.width>0&&h.height>0){const r=h.left+h.width/2,E=h.top+h.height/2,C={bubbles:!0,cancelable:!0,clientX:r,clientY:E,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",C)),await u(80),b.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",C)),b.dispatchEvent(new MouseEvent("click",C)),n(`✅ เลือก "${e}" สำเร็จ`),l=!0;break}}if(l)break;if(!l){const v=(b.textContent||"").trim();if(v.includes(e)&&!v.includes("arrow_drop_down")){const $=b.getBoundingClientRect();if($.width>0&&$.height>0){const h=$.left+$.width/2,r=$.top+$.height/2,E={bubbles:!0,cancelable:!0,clientX:h,clientY:r,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",E)),await u(80),b.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",E)),b.dispatchEvent(new MouseEvent("click",E)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),l=!0;break}}}}return l?(await u(600),!0):(A(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),!1)}async function Ht(t){var C,R,q,m;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,a=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=a?a[1]:"unknown",i=Fe?"macOS":Ne?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=Fe?((R=(C=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:C[1])==null?void 0:R.replace(/_/g,"."))||"":Ne&&((q=e.match(/Windows NT ([0-9.]+)/))==null?void 0:q[1])||"",p=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${o}`),n(`🌐 ภาษา: ${p} | หน้าจอ: ${s} | แพลตฟอร์ม: ${fe}`),n("══════════════════════════════════════════");try{Pe(t.theme)}catch{}try{Re()}catch(f){console.warn("Overlay show error:",f)}const c=[],l=[];try{P("settings","active");const f=t.orientation||"horizontal",I=t.outputCount||1,D=await qt(f,I);c.push(D?"✅ Settings":"⚠️ Settings"),P("settings",D?"done":"error")}catch(f){A(`ตั้งค่าผิดพลาด: ${f.message}`),c.push("⚠️ Settings"),P("settings","error")}try{const f=t.veoQuality||"fast";await Vt(f)?(c.push(`✅ Veo ${f}`),n(`✅ Veo quality: ${f}`)):(c.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(f){A(`Veo quality error: ${f.message}`),c.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const w=()=>{const f=document.querySelectorAll("span, div, p, label");for(const I of f){const D=(I.textContent||"").trim();if(/^\d{1,3}%$/.test(D)){if(D==="100%")return null;const M=I.getBoundingClientRect();if(M.width>0&&M.height>0&&M.top>0&&M.top<window.innerHeight)return D}}return null},b=async f=>{n(`รอการอัพโหลด ${f} เสร็จ...`),await u(2e3);const I=Date.now(),D=6e4;let M="",O=Date.now();const x=15e3;for(;Date.now()-I<D;){const g=w();if(g){if(g!==M)M=g,O=Date.now();else if(Date.now()-O>x){n(`✅ อัพโหลด ${f} — % ค้างที่ ${g} นาน ${x/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}n(`กำลังอัพโหลด: ${g} — รอ...`),await u(1500)}else{n(`✅ อัพโหลด ${f} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}A(`⚠️ อัพโหลด ${f} หมดเวลาหลัง ${D/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){P("upload-char","active");try{const f=await gt(t.characterImage,"character.png");c.push(f?"✅ ตัวละคร":"⚠️ ตัวละคร"),f||l.push("character upload failed"),P("upload-char",f?"done":"error")}catch(f){A(`อัพโหลดตัวละครผิดพลาด: ${f.message}`),c.push("❌ ตัวละคร"),l.push("character upload error"),P("upload-char","error")}await b("character")}else pe("upload-char");if(t.productImage){P("upload-prod","active");try{const f=await gt(t.productImage,"product.png");c.push(f?"✅ สินค้า":"⚠️ สินค้า"),f||l.push("product upload failed"),P("upload-prod",f?"done":"error")}catch(f){A(`อัพโหลดสินค้าผิดพลาด: ${f.message}`),c.push("❌ สินค้า"),l.push("product upload error"),P("upload-prod","error")}await b("product")}else pe("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const T=w();T&&(n(`⚠️ อัพโหลดยังแสดง ${T} — รอเพิ่มเติม...`),await b("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const v=(t.characterImage?1:0)+(t.productImage?1:0);if(v>0){let f=ye();f<v&&(n(`⏳ เห็นรูปย่อแค่ ${f}/${v} — รอ 3 วินาที...`),await u(3e3),f=ye()),f>=v?n(`✅ ยืนยันรูปย่ออ้างอิง: ${f}/${v}`):A(`⚠️ คาดว่าจะมี ${v} รูปย่อ แต่พบ ${f} — ดำเนินการต่อ`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),l.push("stopped by user");try{xe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await u(1e3);const $=ut();$?(await Se($,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),P("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),l.push("prompt input not found"),P("img-prompt","error")),await u(800);const h=new Set;document.querySelectorAll("img").forEach(f=>{f.src&&h.add(f.src)}),n(`บันทึกรูปเดิม: ${h.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await u(500);const r=ft();if(r){const f=r.getBoundingClientRect(),I=f.left+f.width/2,D=f.top+f.height/2,M={bubbles:!0,cancelable:!0,clientX:I,clientY:D,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",M)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",M)),r.dispatchEvent(new MouseEvent("click",M)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await u(500),r.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",M)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",M)),r.dispatchEvent(new MouseEvent("click",M)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),l.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const f=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const g of x){if(g.closest("#netflow-engine-overlay"))continue;const S=(g.textContent||"").trim();if(S.length>10)continue;const B=S.match(/(\d{1,3})\s*%/);if(!B)continue;const _=parseInt(B[1],10);if(_<1||_>100)continue;const k=g.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return _}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let I=null,D=-1,M=0;const O=Date.now();for(;!I&&Date.now()-O<18e4;){const x=document.querySelectorAll("img");for(const g of x){if(h.has(g.src)||!(g.alt||"").toLowerCase().includes("generated"))continue;const B=g.getBoundingClientRect();if(B.width>120&&B.height>120&&B.top>0&&B.top<window.innerHeight*.85){const _=g.closest("div");if(_){I=_,n(`พบรูป AI จาก alt="${g.alt}": ${g.src.substring(0,80)}...`);break}}}if(!I)for(const g of x){if(h.has(g.src))continue;const S=g.closest("div"),B=(S==null?void 0:S.textContent)||"";if(B.includes("product.png")||B.includes("character.png")||B.includes(".png")||B.includes(".jpg"))continue;const _=g.getBoundingClientRect();if(_.width>120&&_.height>120&&_.top>0&&_.top<window.innerHeight*.85){const k=g.closest("div");if(k){I=k,n(`พบรูปใหม่ (สำรอง): ${g.src.substring(0,80)}...`);break}}}if(!I){if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const g=pt();if(g){A(`❌ สร้างรูปล้มเหลว: ${g}`),l.push(`image gen failed: ${g}`),P("img-wait","error");break}const S=f();S!==null?(S!==D&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${S}%`),D=S,P("img-wait","active",S)),M=Date.now()):D>30&&Math.floor((Date.now()-M)/1e3)>=3&&n(`🖼️ % หายที่ ${D}% — รูปน่าจะเสร็จแล้ว`),await u(3e3)}}if(!I)A("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),P("img-wait","done",100);const x=I.getBoundingClientRect(),g=x.left+x.width/2,S=x.top+x.height/2,B={bubbles:!0,cancelable:!0,clientX:g,clientY:S};I.dispatchEvent(new PointerEvent("pointerenter",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseenter",B)),I.dispatchEvent(new PointerEvent("pointerover",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseover",B)),I.dispatchEvent(new PointerEvent("pointermove",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mousemove",B)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let _=null;for(const k of["more_vert","more_horiz","more"]){const y=ve(k);for(const z of y){const F=z.getBoundingClientRect();if(F.top>=x.top-20&&F.top<=x.bottom&&F.right>=x.right-150&&F.right<=x.right+20){_=z;break}}if(_)break}if(!_){const k=document.querySelectorAll("button");for(const y of k){const z=y.getBoundingClientRect();if(z.width<50&&z.height<50&&z.top>=x.top-10&&z.top<=x.top+60&&z.left>=x.right-80){const F=y.querySelectorAll("i");for(const W of F)if((((m=W.textContent)==null?void 0:m.trim())||"").includes("more")){_=y;break}if(_)break;const L=y.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){_=y;break}}}}if(!_)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const k=_.getBoundingClientRect(),y=k.left+k.width/2,z=k.top+k.height/2,F={bubbles:!0,cancelable:!0,clientX:y,clientY:z,button:0};_.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mousedown",F)),await u(80),_.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),_.dispatchEvent(new MouseEvent("mouseup",F)),_.dispatchEvent(new MouseEvent("click",F)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let L=null;const W=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const H of W){const J=(H.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){L=H;break}}if(!L)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const H=L.getBoundingClientRect(),J=H.left+H.width/2,G=H.top+H.height/2,N={bubbles:!0,cancelable:!0,clientX:J,clientY:G,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",N)),await u(80),L.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",N)),L.dispatchEvent(new MouseEvent("click",N)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),P("animate","done"),await u(3e3)}}}}catch(f){A(`ขั้น 4 ผิดพลาด: ${f.message}`),c.push("⚠️ Animate")}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),l.push("stopped by user");try{xe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let f=!1;const I=document.querySelectorAll("button, span, div");for(const O of I){const x=(O.textContent||"").trim(),g=O.getBoundingClientRect();if((x==="วิดีโอ"||x==="Video"||x.includes("วิดีโอ"))&&g.bottom>window.innerHeight*.7){f=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}f||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await u(1e3);const D=ut();D?(await Se(D,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),P("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),l.push("video prompt input not found"),P("vid-prompt","error")),await u(1e3),P("vid-generate","active");const M=ft();if(M){const O=M.getBoundingClientRect(),x=O.left+O.width/2,g=O.top+O.height/2,S={bubbles:!0,cancelable:!0,clientX:x,clientY:g,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",S)),await u(80),M.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",S)),M.dispatchEvent(new MouseEvent("click",S)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),P("vid-generate","done"),await u(500),M.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",S)),await u(80),M.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",S)),M.dispatchEvent(new MouseEvent("click",S)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),l.push("video generate button not found"),P("vid-generate","error")}catch(f){A(`ขั้น 5 ผิดพลาด: ${f.message}`),c.push("⚠️ Video Gen"),l.push(`video gen error: ${f.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pe("animate"),pe("vid-prompt"),pe("vid-generate"),pe("vid-wait");if(t.videoPrompt){P("vid-wait","active");const f=t.sceneCount||1,I=t.videoScenePrompts||[t.videoPrompt];if(f>1)try{Bt(f)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${f>1?`ต่อ ${f} ฉาก`:"ดาวน์โหลด"} ===`);const D=()=>{const x=document.querySelectorAll("div, span, p, label, strong, small");for(const g of x){if(g.closest("#netflow-engine-overlay"))continue;const S=(g.textContent||"").trim();if(S.length>10)continue;const B=S.match(/(\d{1,3})\s*%/);if(!B)continue;const _=parseInt(B[1],10);if(_<1||_>100)continue;const k=g.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return _}return null},M=async(x=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await u(5e3);const g=()=>{const N=document.querySelectorAll("div, span, p, label, strong, small");let V=0;for(const K of N){if(K.closest("#netflow-engine-overlay"))continue;const oe=(K.textContent||"").trim();if(oe.includes("%")&&oe.length<15){const re=K.tagName.toLowerCase(),bt=K.className&&typeof K.className=="string"?K.className.split(/\s+/).slice(0,2).join(" "):"",Ge=K.getBoundingClientRect();if(n(`  🔍 "${oe}" ใน <${re}.${bt}> ที่ (${Ge.left.toFixed(0)},${Ge.top.toFixed(0)}) w=${Ge.width.toFixed(0)}`),V++,V>=5)break}}V===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},S=Le();n(S?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),g();const B=Date.now();let _=-1,k=0,y=!1;for(;Date.now()-B<x;){const N=D();if(N!==null){if(N!==_&&(n(`ความคืบหน้าวิดีโอ: ${N}%`),_=N,P("vid-wait","active",N)),k=Date.now(),N>=100){n("✅ ตรวจพบ 100%!"),y=!0;break}}else if(_>30){const V=Math.floor((Date.now()-k)/1e3);if(V>=5){n(`✅ % หายไปที่ ${_}% (หาย ${V} วินาที) — วิดีโอเสร็จ!`),y=!0;break}n(`⏳ % หายที่ ${_}% — ยืนยันใน ${5-V} วินาที...`)}else{const V=Math.floor((Date.now()-B)/1e3);V%15<3&&n(`⏳ รอ... (${V} วินาที) ไม่พบ %`)}if(!y&&_>0&&Le(!0)&&!S){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${_}% — วิดีโอเสร็จ!`),y=!0;break}if(ce())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(_<1){const V=pt();if(V)return A(`❌ สร้างวิดีโอล้มเหลว: ${V}`),null}await u(3e3)}const z=Le();if(!z)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),P("vid-wait","error"),null;const F=z;y?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=F.getBoundingClientRect();let W=L.left+L.width/2,H=L.top+L.height/2,J=F;const G=F.querySelector("video, img, canvas");if(G){const N=G.getBoundingClientRect();N.width>50&&N.height>50&&(W=N.left+N.width/2,H=N.top+N.height/2,J=G,n(`🎯 พบรูปย่อ <${G.tagName.toLowerCase()}> ในการ์ดที่ (${W.toFixed(0)},${H.toFixed(0)}) ${N.width.toFixed(0)}x${N.height.toFixed(0)}`))}else H=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${W.toFixed(0)},${H.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${W.toFixed(0)}, ${H.toFixed(0)})...`),Rt(J);for(let N=0;N<8;N++){const V={bubbles:!0,cancelable:!0,clientX:W+N%2,clientY:H};J.dispatchEvent(new PointerEvent("pointermove",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",V)),await u(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:f,scenePrompts:I,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${f} ฉาก, ${I.length} prompts, theme: ${t.theme})`)}catch(N){n(`⚠️ ไม่สามารถบันทึก pending action: ${N.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await O(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),F},O=async x=>{const g=x.getBoundingClientRect(),S=g.left+g.width/2,B=g.top+g.height/2,_={bubbles:!0,cancelable:!0,clientX:S,clientY:B,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",_)),await u(80),x.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",_)),x.dispatchEvent(new MouseEvent("click",_)),await u(50),x.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await M())A("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),P("vid-wait","error");else{c.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const g=await new Promise(S=>{chrome.storage.local.get("netflow_pending_action",B=>{if(chrome.runtime.lastError){S(null);return}S((B==null?void 0:B.netflow_pending_action)||null)})});g&&!g._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),g.action==="mute_video"?await mt(g.sceneCount||1,g.scenePrompts||[],g.theme):g.action==="wait_scene_gen_and_download"&&await ht(g.sceneCount||2,g.currentScene||2,g.theme,g.scenePrompts||[]))}}catch(x){A(`ขั้น 6 ผิดพลาด: ${x.message}`),c.push("⚠️ Step6"),l.push(`step 6: ${x.message}`)}}const E=l.length===0;try{xe(E?5e3:8e3)}catch(f){console.warn("Overlay complete error:",f)}return{success:E,message:E?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${l.join(", ")}`,step:E?"done":"partial"}}async function mt(t,e=[],a){var E;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{a&&Pe(a)}catch{}try{Re(t)}catch(C){n(`⚠️ showOverlay error: ${C.message}`)}try{const C=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const R of C)P(R,"done");t>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${C.length} steps done, sceneCount=${t}`)}catch(C){n(`⚠️ overlay restore error: ${C.message}`)}await u(1500);const o=(()=>{for(const C of document.querySelectorAll("button")){const R=C.querySelectorAll("i");for(const m of R){const f=(m.textContent||"").trim();if(f==="volume_up"||f==="volume_off"||f==="volume_mute"){const I=C.getBoundingClientRect();if(I.width>0&&I.height>0)return C}}const q=(C.getAttribute("aria-label")||"").toLowerCase();if(q.includes("mute")||q.includes("ปิดเสียง")){const m=C.getBoundingClientRect();if(m.width>0&&m.height>0)return C}}return null})();if(o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let x=2;x<=t;x++){const g=e[x-1];if(!g){A(`ไม่พบ prompt สำหรับฉากที่ ${x}`);continue}n(`── ฉากที่ ${x}/${t}: วาง prompt + generate ──`);let S=null;const B=Date.now();for(;!S&&Date.now()-B<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(S=G[G.length-1]),!S){const N=document.querySelectorAll("[role='textbox'][contenteditable='true']");N.length>0&&(S=N[N.length-1])}S||await u(1e3)}if(!S){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${S.tagName.toLowerCase()}> ${S.className.substring(0,40)}`),await Se(S,g),n(`วาง prompt ฉาก ${x} (${g.length} ตัวอักษร) ✅`);try{P(`scene${x}-prompt`,"done"),P(`scene${x}-gen`,"active")}catch{}await u(1e3);const _=S.getBoundingClientRect();let k=null,y=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const N=G.querySelectorAll("i");let V=!1;for(const re of N)if((re.textContent||"").trim()==="arrow_forward"){V=!0;break}if(!V)continue;const K=G.getBoundingClientRect();if(K.width<=0||K.height<=0)continue;const oe=Math.abs(K.top-_.top)+Math.abs(K.right-_.right);oe<y&&(y=oe,k=G)}if(!k)for(const G of document.querySelectorAll("button")){const N=G.querySelectorAll("i");for(const V of N)if((V.textContent||"").trim()==="arrow_forward"){const K=G.getBoundingClientRect();if(K.width>0&&K.height>0){k=G;break}}if(k)break}if(!k){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:t,currentScene:x,scenePrompts:e}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${x}/${t})`),await Q(k),n(`คลิก Generate ฉาก ${x} ✅`);try{P(`scene${x}-gen`,"done"),P(`scene${x}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${x} gen เสร็จ ──`),await u(5e3);let z=0,F=0;const L=Date.now(),W=6e5,H=5e3;let J=!1;for(;Date.now()-L<W;){let G=null;const N=document.querySelectorAll("div, span, p, label, strong, small");for(const V of N){if(V.closest("#netflow-engine-overlay"))continue;const oe=(V.textContent||"").trim().match(/^(\d{1,3})%$/);if(oe){const re=V.getBoundingClientRect();if(re.width>0&&re.height>0&&re.width<120&&re.height<60){G=parseInt(oe[1],10);break}}}if(G!==null){if(G!==z){n(`🎬 ฉาก ${x} ความคืบหน้า: ${G}%`),z=G;try{P(`scene${x}-wait`,"active",G)}catch{}}F=0}else if(z>0){if(F===0)F=Date.now(),n(`🔍 ฉาก ${x}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-F>=H){n(`✅ ฉาก ${x}: % หายไป ${H/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุด");return}await u(2e3)}J||A(`ฉาก ${x} หมดเวลา`),n(`✅ ฉาก ${x} เสร็จแล้ว`);try{P(`scene${x}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}await u(2e3);const C=Date.now();let R=null;const q=Date.now();for(;!R&&Date.now()-q<1e4;){for(const x of document.querySelectorAll("button")){const g=x.querySelector("i");if(g&&(g.textContent||"").trim()==="download"){const S=x.getBoundingClientRect();if(S.width>0&&S.height>0){R=x;break}}}R||await u(1e3)}if(!R){A("ไม่พบปุ่มดาวน์โหลด");return}await Q(R),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await u(1500);let m=null;for(let x=0;x<3&&!m;x++){x>0&&n(`🔄 ลองหา 720p ครั้งที่ ${x+1}...`);let g=null;const S=Date.now();for(;!g&&Date.now()-S<5e3;){for(const z of document.querySelectorAll("[role='menuitem']"))if((z.textContent||"").trim().includes("Full Video")&&z.querySelector("i")){const L=z.getBoundingClientRect();if(L.width>0&&L.height>0){g=z;break}}g||await u(500)}if(!g){A("ไม่พบ Full Video");continue}const B=g.getBoundingClientRect(),_=B.left+B.width/2,k=B.top+B.height/2;g.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:_,clientY:k})),g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:_,clientY:k})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:_,clientY:k})),await Q(g),n("คลิก/hover Full Video ✅"),await u(2e3);const y=Date.now();for(;!m&&Date.now()-y<8e3;){for(const z of document.querySelectorAll("button[role='menuitem']")){const F=z.querySelectorAll("span");for(const L of F)if((L.textContent||"").trim()==="720p"){const W=z.getBoundingClientRect();if(W.width>0&&W.height>0){m=z;break}}if(m)break}m||(g.isConnected&&(g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:_,clientY:k})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:_+20,clientY:k}))),await u(500))}}if(!m){A("ไม่พบ 720p");return}await Q(m),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const f=Date.now();let I=!1,D=!1;for(;Date.now()-f<3e5;){for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div")){const g=(x.textContent||"").trim();if(g==="Download complete!"||g==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),I=!0;break}(g.includes("Downloading your extended video")||g.includes("กำลังดาวน์โหลด"))&&(D||(D=!0,n("⏳ กำลังดาวน์โหลด...")))}if(I)break;if(D){let x=!1;for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((g.textContent||"").trim().includes("Downloading")){x=!0;break}if(!x){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),I=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await u(2e3)}if(!I){A("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let M=!1;const O=Date.now();for(;Date.now()-O<6e4&&!M;){try{await new Promise(x=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:C},g=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):g!=null&&g.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${g.message}`),M=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${g==null?void 0:g.message}`),x()})})}catch(x){A(`ตรวจสอบผิดพลาด: ${x.message}`)}M||await u(3e3)}M||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),xe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),ze(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await u(2e3);const i=(C,R="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const q of document.querySelectorAll(R)){const m=(q.textContent||"").trim();if(m.includes(C)&&m.length<100){const f=q.getBoundingClientRect();if(f.width>0&&f.height>0&&f.top>=0)return q}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const p=Date.now();for(;!d&&Date.now()-p<1e4;){for(const C of document.querySelectorAll("button, [role='button']")){const R=(C.textContent||"").trim(),q=R.toLowerCase();if((q.includes("download")||q.includes("ดาวน์โหลด"))&&R.length<80){const m=C.getBoundingClientRect();if(m.width>0&&m.height>0){d=C;break}}}if(!d)for(const C of document.querySelectorAll("button")){const R=(C.getAttribute("aria-label")||"").toLowerCase();if(R.includes("download")||R.includes("ดาวน์")){const q=C.getBoundingClientRect();if(q.width>0&&q.height>0){d=C;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!d){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await Q(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(1500);const s=Date.now();let c=null;const l=Date.now();for(;!c&&Date.now()-l<5e3;)c=i("1080p"),c||(n("รอ 1080p..."),await u(500));if(!c){A("ไม่พบ 1080p");return}await Q(c),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const w=Date.now();let b=!1,T=!1,v=0;const $=3e3;for(;Date.now()-w<3e5;){const R=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(R.includes("upscaling complete")||R.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),b=!0;break}for(const m of document.querySelectorAll("div, span, p")){const f=(m.textContent||"").trim().toLowerCase();if(f.length<60&&(f.includes("upscaling complete")||f.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(E=m.textContent)==null?void 0:E.trim()}")`),b=!0;break}}if(b)break;if(R.includes("upscaling your video")||R.includes("กำลังอัปสเกล")){T=!0,v=0;const m=Math.floor((Date.now()-w)/1e3);n(`⏳ กำลังอัปสเกล... (${m} วินาที)`)}else if(T){if(v===0)v=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-v>=$){n(`✅ ข้อความ Upscaling หายไป ${$/1e3} วินาที — เสร็จ!`),b=!0;break}}else{const m=Math.floor((Date.now()-w)/1e3);m%10<3&&n(`⏳ รอ Upscale... (${m} วินาที)`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!b){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let h=!1;const r=Date.now();for(;Date.now()-r<6e4&&!h;){try{await new Promise(C=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},R=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):R!=null&&R.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${R.message}`),h=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${R==null?void 0:R.message}`),C()})})}catch(C){A(`ตรวจสอบผิดพลาด: ${C.message}`)}h||await u(3e3)}h||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),ze(2e3)}async function ht(t=2,e=2,a,o=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{a&&Pe(a)}catch{}try{Re(t)}catch(m){n(`⚠️ showOverlay error: ${m.message}`)}try{const m=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let f=2;f<=e;f++)m.push(`scene${f}-prompt`,`scene${f}-gen`),f<e&&m.push(`scene${f}-wait`);for(const f of m)P(f,"done");P(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${m.length} steps done (scene ${e}/${t} navigate)`)}catch(m){n(`⚠️ overlay restore error: ${m.message}`)}await u(2e3);const i=(()=>{for(const m of document.querySelectorAll("button")){const f=m.querySelectorAll("i");for(const I of f){const D=(I.textContent||"").trim();if(D==="volume_up"||D==="volume_off"||D==="volume_mute"){const M=m.getBoundingClientRect();if(M.width>0&&M.height>0)return m}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let d=0,p=0;const s=Date.now(),c=6e5,l=5e3;let w=!1,b=0;for(;Date.now()-s<c;){let m=null;const f=document.querySelectorAll("div, span, p, label, strong, small");for(const I of f){if(I.closest("#netflow-engine-overlay"))continue;const M=(I.textContent||"").trim().match(/^(\d{1,3})%$/);if(M){const O=I.getBoundingClientRect();if(O.width>0&&O.height>0&&O.width<120&&O.height<60){m=parseInt(M[1],10);break}}}if(m!==null){if(b=0,m!==d){n(`🎬 scene ${e} ความคืบหน้า: ${m}%`),d=m;try{P(`scene${e}-wait`,"active",m)}catch{}}p=0}else if(d>0){if(p===0)p=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-p>=l){n(`✅ scene ${e}: % หายไป ${l/1e3} วินาที — เจนเสร็จ!`),w=!0;break}}else if(b++,b>=15){const I=document.querySelectorAll("video");let D=!1;for(const M of I)if(M.readyState>=2&&!M.paused&&M.getBoundingClientRect().width>200){D=!0;break}if(D){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),w=!0;break}if(b>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),w=!0;break}}await u(2e3)}w||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{P(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&o.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let m=e+1;m<=t;m++){const f=o[m-1];if(!f){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${m} — ข้าม`);continue}n(`── ฉากที่ ${m}/${t}: วาง prompt + generate (pending recovery) ──`);let I=null;const D=Date.now();for(;!I&&Date.now()-D<1e4;){const y=document.querySelectorAll("[data-slate-editor='true']");if(y.length>0&&(I=y[y.length-1]),!I){const z=document.querySelectorAll("[role='textbox'][contenteditable='true']");z.length>0&&(I=z[z.length-1])}I||await u(1e3)}if(!I){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${m}`);break}await Se(I,f),n(`วาง prompt ฉาก ${m} (${f.length} ตัวอักษร) ✅`);try{P(`scene${m}-prompt`,"done"),P(`scene${m}-gen`,"active")}catch{}await u(1e3);const M=I.getBoundingClientRect();let O=null,x=1/0;for(const y of document.querySelectorAll("button")){if(y.disabled)continue;const z=y.querySelectorAll("i");let F=!1;for(const H of z)if((H.textContent||"").trim()==="arrow_forward"){F=!0;break}if(!F)continue;const L=y.getBoundingClientRect();if(L.width<=0||L.height<=0)continue;const W=Math.abs(L.top-M.top)+Math.abs(L.right-M.right);W<x&&(x=W,O=y)}if(!O)for(const y of document.querySelectorAll("button")){const z=y.querySelectorAll("i");for(const F of z)if((F.textContent||"").trim()==="arrow_forward"){const L=y.getBoundingClientRect();if(L.width>0&&L.height>0){O=y;break}}if(O)break}if(!O){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${m}`);break}await new Promise(y=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:t,currentScene:m,scenePrompts:o}},()=>y())}),await Q(O),n(`คลิก Generate ฉาก ${m} ✅`);try{P(`scene${m}-gen`,"done"),P(`scene${m}-wait`,"active")}catch{}await u(5e3);let g=0,S=0;const B=Date.now();let _=!1,k=0;for(;Date.now()-B<6e5;){let y=null;const z=document.querySelectorAll("div, span, p, label, strong, small");for(const F of z){if(F.closest("#netflow-engine-overlay"))continue;const W=(F.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const H=F.getBoundingClientRect();if(H.width>0&&H.height>0&&H.width<120&&H.height<60){y=parseInt(W[1],10);break}}}if(y!==null){if(k=0,y!==g){n(`🎬 ฉาก ${m} ความคืบหน้า: ${y}%`),g=y;try{P(`scene${m}-wait`,"active",y)}catch{}}S=0}else if(g>0){if(S===0)S=Date.now();else if(Date.now()-S>=5e3){n(`✅ ฉาก ${m}: เจนเสร็จ!`),_=!0;break}}else if(k++,k>=15){const F=document.querySelectorAll("video");let L=!1;for(const W of F)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){L=!0;break}if(L){n(`✅ ฉาก ${m}: พบวิดีโอเล่นอยู่ — เสร็จ`),_=!0;break}if(k>=30){n(`✅ ฉาก ${m}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),_=!0;break}}await u(2e3)}_||n(`⚠️ ฉาก ${m} หมดเวลา`);try{P(`scene${m}-wait`,"done",100)}catch{}n(`✅ ฉาก ${m} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const T=Date.now();let v=null;const $=Date.now();for(;!v&&Date.now()-$<1e4;){for(const m of document.querySelectorAll("button")){const f=m.querySelector("i");if(f&&(f.textContent||"").trim()==="download"){const I=m.getBoundingClientRect();if(I.width>0&&I.height>0){v=m;break}}}v||await u(1e3)}if(!v){A("ไม่พบปุ่มดาวน์โหลด");return}await Q(v),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await u(1500);let h=null;for(let m=0;m<3&&!h;m++){m>0&&n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`);let f=null;const I=Date.now();for(;!f&&Date.now()-I<5e3;){for(const g of document.querySelectorAll("[role='menuitem']"))if((g.textContent||"").trim().includes("Full Video")&&g.querySelector("i")){const B=g.getBoundingClientRect();if(B.width>0&&B.height>0){f=g;break}}f||await u(500)}if(!f){A("ไม่พบ Full Video");continue}const D=f.getBoundingClientRect(),M=D.left+D.width/2,O=D.top+D.height/2;f.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:M,clientY:O})),f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:M,clientY:O})),f.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:M,clientY:O})),await Q(f),n("คลิก/hover Full Video ✅"),await u(2e3);const x=Date.now();for(;!h&&Date.now()-x<8e3;){for(const g of document.querySelectorAll("button[role='menuitem']")){const S=g.querySelectorAll("span");for(const B of S)if((B.textContent||"").trim()==="720p"){const _=g.getBoundingClientRect();if(_.width>0&&_.height>0){h=g;break}}if(h)break}h||(f.isConnected&&(f.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:M,clientY:O})),f.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:M+20,clientY:O}))),await u(500))}}if(!h){A("ไม่พบ 720p");return}await Q(h),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const r=Date.now();let E=!1,C=!1;for(;Date.now()-r<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const f=(m.textContent||"").trim();if(f==="Download complete!"||f==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),E=!0;break}(f.includes("Downloading your extended video")||f.includes("กำลังดาวน์โหลด"))&&(C||(C=!0,n("⏳ กำลังดาวน์โหลด...")))}if(E)break;if(C){let m=!1;for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((f.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),E=!0;break}}await u(2e3)}if(!E){A("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let R=!1;const q=Date.now();for(;Date.now()-q<6e4&&!R;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:T},f=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):f!=null&&f.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${f.message}`),R=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${f==null?void 0:f.message}`),m()})})}catch(m){A(`ตรวจสอบผิดพลาด: ${m.message}`)}R||await u(3e3)}R||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),xe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),ze(2e3)}async function Wt(){try{const t=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",p=>{if(chrome.runtime.lastError){d(null);return}d((p==null?void 0:p.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-t.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=o,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:t},()=>d())}),await u(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",p=>{const s=p==null?void 0:p.netflow_pending_action;d((s==null?void 0:s._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(a/1e3)} วินาที)`),t.action==="mute_video"?await mt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await ht(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,a)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),a({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Ht(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof Oe||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Me("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{ct()}catch{}}else console.error("[Netflow AI] Generate error:",o)}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,a({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return a({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return a({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const o=zt();if(!o){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=o.getBoundingClientRect(),d=i.left+i.width/2,p=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${p.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const c=document.elementFromPoint(d,p);c?(await Q(c),n(`คลิก ${s+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await Q(o),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Wt()})();
