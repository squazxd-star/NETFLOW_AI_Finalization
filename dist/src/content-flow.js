(function(){"use strict";const ie={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Y=ie.green,ue=null;function Se(t){t&&ie[t]&&(ue=t,Y=ie[t],He(),requestAnimationFrame(()=>lt()))}function xt(){if(ue&&ie[ue])return ie[ue];try{const t=localStorage.getItem("netflow_app_theme");if(t&&ie[t])return ie[t]}catch{}return ie.green}let Z=0,Q=255,ee=65;function He(){const t=Y.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(Z=parseInt(t[1],16),Q=parseInt(t[2],16),ee=parseInt(t[3],16))}const qe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Ve='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let V=null,X=null,ae=null,We=0,$e=null,ge=null,Ee=null,Pe=0,se=!1,ne=null,me=null,he=null,ke=1,W=[];function Ie(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const le=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];W=Ie(1);function wt(t){const e=t.rgb,r=t.accentRgb,i=t.doneRgb,o=t.hex,d=t.accentHex,p=t.doneHex,s=(()=>{const b=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const a=$=>Math.min(255,$+80);return`#${[1,2,3].map($=>a(parseInt(b[$],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const b=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const a=$=>Math.min(255,$+60);return`#${[1,2,3].map($=>a(parseInt(b[$],16)).toString(16).padStart(2,"0")).join("")}`})(),l=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),h=l?Math.max(parseInt(l[1],16),parseInt(l[2],16),parseInt(l[3],16),1):255,E=l?parseInt(l[1],16)/h:0,D=l?parseInt(l[2],16)/h:1,v=l?parseInt(l[3],16)/h:.25,w=b=>`${Math.round(E*b)}, ${Math.round(D*b)}, ${Math.round(v*b)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${w(18)},0.94) 0%, rgba(${w(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${w(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${w(180)},0.05),
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
            0 0 200px rgba(${w(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${w(180)},0.08),
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
.nf-term-line.nf-term-done { color: rgba(${i}, 0.85); }
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
    background: rgba(${i}, 0.12);
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
    background: linear-gradient(180deg, rgba(${w(5)},0.95) 0%, rgba(${w(12)},0.98) 100%);
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
    border-top: 1px solid rgba(${r},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${w(6)},0.75) 0%, rgba(${w(3)},0.92) 100%);
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
    background: rgba(${w(8)}, 0.88);
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
    box-shadow: 0 0 20px rgba(${i}, 0.1);
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
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${p};
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
    background: linear-gradient(90deg, ${o}, ${s});
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
    background: linear-gradient(90deg, ${o}, ${d});
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
    background: rgba(${w(8)},0.8);
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
    background: rgba(${w(8)}, 0.9);
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
    color: rgba(${i},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${i},0.5);
    text-shadow: 0 0 4px rgba(${i},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${i},0.4),
        0 0 8px rgba(${i},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${p};
    box-shadow: 0 0 5px rgba(${i},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${i},0.1);
    color: ${c};
    text-shadow: 0 0 4px rgba(${i},0.3);
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

    `}function Ue(){ae||(ae=document.createElement("style"),ae.id="netflow-overlay-styles",ae.textContent=wt(Y),document.head.appendChild(ae))}function Ye(t){t.innerHTML="",W.forEach((e,r)=>{const i=document.createElement("div");i.className="nf-proc-row nf-proc-waiting",i.id=`nf-proc-${e.stepId}`,i.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(i)})}function vt(){const t=document.getElementById("nf-terminal");if(!t)return;Ye(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${W.length}`)}function Xe(t,e){let s="";for(let D=0;D<20;D++){const v=D/20*Math.PI*2,w=(D+.2)/20*Math.PI*2,b=(D+.5)/20*Math.PI*2,a=(D+.8)/20*Math.PI*2,$=(D+1)/20*Math.PI*2;s+=`${D===0?"M":"L"}${(120+100*Math.cos(v)).toFixed(1)},${(120+100*Math.sin(v)).toFixed(1)} `,s+=`L${(120+100*Math.cos(w)).toFixed(1)},${(120+100*Math.sin(w)).toFixed(1)} `,s+=`L${(120+112*Math.cos(b)).toFixed(1)},${(120+112*Math.sin(b)).toFixed(1)} `,s+=`L${(120+100*Math.cos(a)).toFixed(1)},${(120+100*Math.sin(a)).toFixed(1)} `,s+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `}s+="Z";const c=14,l=72,h=62;let E="";for(let D=0;D<c;D++){const v=D/c*Math.PI*2,w=(D+.25)/c*Math.PI*2,b=(D+.75)/c*Math.PI*2,a=(D+1)/c*Math.PI*2;E+=`${D===0?"M":"L"}${(120+h*Math.cos(v)).toFixed(1)},${(120+h*Math.sin(v)).toFixed(1)} `,E+=`L${(120+l*Math.cos(w)).toFixed(1)},${(120+l*Math.sin(w)).toFixed(1)} `,E+=`L${(120+l*Math.cos(b)).toFixed(1)},${(120+l*Math.sin(b)).toFixed(1)} `,E+=`L${(120+h*Math.cos(a)).toFixed(1)},${(120+h*Math.sin(a)).toFixed(1)} `}return E+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${E}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${h}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function yt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ne=document.createElement("canvas"),ne.id="nf-matrix-canvas",t.appendChild(ne);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let k=1;k<=5;k++){const _=document.createElement("div");_.className=`nf-ambient-orb nf-orb-${k}`,t.appendChild(_)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-a",t.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-b",t.appendChild(o);const d=document.createElement("div");d.className="nf-pat-circuit",t.appendChild(d);const p=document.createElement("div");p.className="nf-pat-honeycomb",t.appendChild(p);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const l=document.createElement("div");l.className="nf-pat-diamond",t.appendChild(l);const h=document.createElement("div");h.className="nf-pat-wave-h",t.appendChild(h);const E=document.createElement("div");E.className="nf-pat-radar",t.appendChild(E);const D=document.createElement("div");D.className="nf-pat-ripple-1",t.appendChild(D);const v=document.createElement("div");v.className="nf-pat-ripple-2",t.appendChild(v);const w=document.createElement("div");w.className="nf-pat-techscan",t.appendChild(w);const b=document.createElement("div");b.className="nf-center-glow",t.appendChild(b);const a=document.createElement("div");a.className="nf-pat-noise",t.appendChild(a);const $=document.createElement("div");$.className="nf-crt-scanlines",t.appendChild($);const C=document.createElement("div");C.className="nf-vignette",t.appendChild(C);for(let k=0;k<3;k++){const _=document.createElement("div");_.className="nf-pulse-ring",t.appendChild(_)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(k=>{const _=document.createElement("div");_.className=`nf-corner-deco ${k}`,t.appendChild(_)});const z=document.createElement("button");z.className="nf-stop-btn",z.innerHTML='<span class="nf-stop-icon"></span> หยุด',z.onclick=()=>{var k;window.__NETFLOW_STOP__=!0;try{Me("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((k=chrome.runtime)!=null&&k.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(z);const y=document.createElement("button");y.className="nf-close-btn",y.textContent="✕ ซ่อน",y.onclick=()=>Ae(),t.appendChild(y);const x=document.createElement("div");x.className="nf-layout";const g=document.createElement("div");g.className="nf-core-monitor",g.id="nf-core-monitor";const T=document.createElement("div");T.className="nf-core-header",T.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${W.length}</div>
    `,g.appendChild(T);const R=document.createElement("div");R.className="nf-terminal",R.id="nf-terminal",Ye(R),g.appendChild(R);const S=document.createElement("div");S.className="nf-engine-core",S.id="nf-engine-core";const q=document.createElement("div");q.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(k=>{const _=document.createElement("div");_.className=`nf-frame-corner ${k}`,q.appendChild(_)}),S.appendChild(q);const m="http://www.w3.org/2000/svg",u=document.createElementNS(m,"svg");u.setAttribute("class","nf-engine-waves"),u.setAttribute("viewBox","0 0 560 140"),u.setAttribute("preserveAspectRatio","none"),u.id="nf-engine-waves";for(let k=0;k<4;k++){const _=document.createElementNS(m,"path");_.setAttribute("fill","none"),_.setAttribute("stroke-width",k<2?"1.5":"1"),_.setAttribute("stroke",k<2?`rgba(${Y.rgb},${.14+k*.1})`:`rgba(${Y.accentRgb},${.1+(k-2)*.08})`),_.setAttribute("data-wave-idx",String(k)),u.appendChild(_)}S.appendChild(u);const M=document.createElement("div");M.className="nf-engine-brand-inner",M.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Xe(Y.rgb,Y.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Xe(Y.rgb,Y.accentRgb)}
        </div>
    `,S.appendChild(M);const B=document.createElement("div");B.className="nf-engine-stats",B.id="nf-engine-stats",B.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([k,_,F])=>`<div class="nf-stat-item"><span class="nf-stat-label">${k}</span><span class="nf-stat-val" id="${_}">${F}</span></div>`).join(""),S.appendChild(B),g.appendChild(S),x.appendChild(g);const I=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];le.forEach((k,_)=>{const F=$t(k);F.classList.add(I[_]),F.id=`nf-mod-${k.id}`,x.appendChild(F)}),t.appendChild(x);for(let k=0;k<30;k++){const _=document.createElement("div");_.className="nf-particle",_.style.left=`${5+Math.random()*90}%`,_.style.bottom=`${Math.random()*40}%`,_.style.animationDuration=`${3+Math.random()*5}s`,_.style.animationDelay=`${Math.random()*4}s`;const F=.3+Math.random()*.4,L=.7+Math.random()*.3;_.style.background=`rgba(${Math.floor(Z*L)}, ${Math.floor(Q*L)}, ${Math.floor(ee*L)}, ${F})`,_.style.width=`${1+Math.random()*2}px`,_.style.height=_.style.width,t.appendChild(_)}return t}function $t(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,e.appendChild(d)});const i=document.createElement("div");return i.className="nf-mod-progress",i.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(i),e}function Et(){We=Date.now(),$e=setInterval(()=>{const t=Math.floor((Date.now()-We)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),i=document.getElementById("nf-timer");i&&(i.textContent=`${e}:${r}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${e}:${r}`)},1e3)}function je(){$e&&(clearInterval($e),$e=null)}const kt=120,Ke=160,Je=.4;let de=null,Ze=0,Qe=0,et=0,be=[];function Ct(t,e){be=[];for(let r=0;r<kt;r++){const i=Math.random();let o;i<.22?o=0:i<.4?o=1:i<.55?o=2:i<.68?o=3:i<.84?o=4:o=5;const d=Math.random()*t,p=Math.random()*e,s=50+Math.random()*220,c=Math.random()*Math.PI*2,l=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);be.push({x:o===0?Math.random()*t:d+Math.cos(c)*s,y:o===0?Math.random()*e:p+Math.sin(c)*s,vx:(Math.random()-.5)*Je,vy:(Math.random()-.5)*Je,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:d,oCy:p,oRadius:s,oAngle:c,oSpeed:l})}}function Mt(){if(!ne)return;const t=ne;if(me=t.getContext("2d"),!me)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,be.length===0&&Ct(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,i=0,o=0,d=!1;function p(){if(!me||!ne){he=null;return}if(he=requestAnimationFrame(p),d=!d,d)return;const s=me,c=ne.width,l=ne.height;s.fillStyle=`rgba(${Z*.04|0},${Q*.04|0},${ee*.06|0},1)`,s.fillRect(0,0,c,l),(!r||i!==c||o!==l)&&(i=c,o=l,r=s.createRadialGradient(c*.5,l*.5,0,c*.5,l*.5,Math.max(c,l)*.6),r.addColorStop(0,`rgba(${Z*.08|0},${Q*.08|0},${ee*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=r,s.fillRect(0,0,c,l);const h=be,E=h.length,D=Ke*Ke;for(let b=0;b<E;b++){const a=h[b];if(a.pulsePhase+=a.pulseSpeed,a.motion===0)a.x+=a.vx,a.y+=a.vy,a.x<0?(a.x=0,a.vx=Math.abs(a.vx)*(.8+Math.random()*.4)):a.x>c&&(a.x=c,a.vx=-Math.abs(a.vx)*(.8+Math.random()*.4)),a.y<0?(a.y=0,a.vy=Math.abs(a.vy)*(.8+Math.random()*.4)):a.y>l&&(a.y=l,a.vy=-Math.abs(a.vy)*(.8+Math.random()*.4));else if(a.motion===1)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius,a.oCx+=Math.sin(a.oAngle*.3)*.15,a.oCy+=Math.cos(a.oAngle*.3)*.15;else if(a.motion===2)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius*.5,a.oCx+=Math.sin(a.oAngle*.2)*.1,a.oCy+=Math.cos(a.oAngle*.2)*.1;else if(a.motion===3){a.oAngle+=a.oSpeed;const $=a.oAngle,C=a.oRadius*.7;a.x=a.oCx+C*Math.cos($),a.y=a.oCy+C*Math.sin($)*Math.cos($),a.oCx+=Math.sin($*.15)*.12,a.oCy+=Math.cos($*.15)*.12}else if(a.motion===4){a.oAngle+=a.oSpeed*1.2;const $=a.oRadius*(.5+.5*Math.abs(Math.sin(a.oAngle*.15)));a.x=a.oCx+Math.cos(a.oAngle)*$,a.y=a.oCy+Math.sin(a.oAngle)*$,a.oCx+=Math.sin(a.oAngle*.1)*.18,a.oCy+=Math.cos(a.oAngle*.1)*.18}else a.oAngle+=a.oSpeed,a.x+=a.vx*.8,a.y=a.oCy+Math.sin(a.oAngle+a.x*.008)*a.oRadius*.35,a.x<-30?a.x=c+30:a.x>c+30&&(a.x=-30),a.oCy+=Math.sin(a.oAngle*.1)*.08;if(a.motion>0){const $=a.oRadius+50;a.oCx<-$?a.oCx=c+$:a.oCx>c+$&&(a.oCx=-$),a.oCy<-$?a.oCy=l+$:a.oCy>l+$&&(a.oCy=-$)}}s.beginPath(),s.strokeStyle=`rgba(${Z},${Q},${ee},0.06)`,s.lineWidth=.4;const v=new Path2D;for(let b=0;b<E;b++){const a=h[b];for(let $=b+1;$<E;$++){const C=h[$],z=a.x-C.x,y=a.y-C.y,x=z*z+y*y;x<D&&(1-x/D<.4?(s.moveTo(a.x,a.y),s.lineTo(C.x,C.y)):(v.moveTo(a.x,a.y),v.lineTo(C.x,C.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${Z},${Q},${ee},0.18)`,s.lineWidth=.8,s.stroke(v),!de||Ze!==Z||Qe!==Q||et!==ee){de=document.createElement("canvas");const b=48;de.width=b,de.height=b;const a=de.getContext("2d"),$=a.createRadialGradient(b/2,b/2,0,b/2,b/2,b/2);$.addColorStop(0,`rgba(${Z},${Q},${ee},0.9)`),$.addColorStop(.3,`rgba(${Z},${Q},${ee},0.35)`),$.addColorStop(1,`rgba(${Z},${Q},${ee},0)`),a.fillStyle=$,a.fillRect(0,0,b,b),Ze=Z,Qe=Q,et=ee}const w=de;for(let b=0;b<E;b++){const a=h[b],$=.6+.4*Math.sin(a.pulsePhase),C=a.radius*5*(.8+$*.4);s.globalAlpha=.5+$*.4,s.drawImage(w,a.x-C/2,a.y-C/2,C,C)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let b=0;b<E;b++){const a=h[b];if(a.radius>2){const $=.6+.4*Math.sin(a.pulsePhase),C=a.radius*(.8+$*.4)*.35;s.moveTo(a.x+C,a.y),s.arc(a.x,a.y,C,0,Math.PI*2)}}s.fill()}p()}function St(){he!==null&&(cancelAnimationFrame(he),he=null),ne=null,me=null,be=[]}let xe=null;const Ce=560,Pt=140,tt=Ce/2,nt=Pt/2,ot=[];for(let t=0;t<=Ce;t+=8){const e=Math.abs(t-tt)/tt;ot.push(Math.pow(Math.min(1,e*1.6),.6))}const It=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ce,off:t*.6,spd:.7+t*.12}));let _e=!1;function it(){if(ge=requestAnimationFrame(it),_e=!_e,_e)return;if(Pe+=.07,!xe){const e=document.getElementById("nf-engine-waves");if(!e){ge=null;return}xe=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<xe.length;e++){const r=It[e],i=Pe*r.spd+r.off;t.length=0,t.push(`M 0 ${nt}`);let o=0;for(let d=0;d<=Ce;d+=8){const p=nt+r.amp*ot[o++]*Math.sin(d*r.freq+i);t.push(`L${d} ${p*10+.5|0}`)}xe[e].setAttribute("d",t.join(" "))}}function _t(){Pe=0,it(),Mt(),Ee=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),i=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function at(){ge!==null&&(cancelAnimationFrame(ge),ge=null),Ee&&(clearInterval(Ee),Ee=null),xe=null,St()}function Te(){let t=0;const e=W.filter(l=>l.status!=="skipped").length;for(const l of W){const h=document.getElementById(`nf-proc-${l.stepId}`);if(!h)continue;h.className="nf-proc-row";const E=h.querySelector(".nf-proc-badge");switch(l.status){case"done":h.classList.add("nf-proc-done"),E&&(E.textContent="✅ done"),t++;break;case"active":h.classList.add("nf-proc-active"),E&&(E.textContent=l.progress!==void 0&&l.progress>0?`⏳ ${l.progress}%`:"⏳ active");break;case"error":h.classList.add("nf-proc-error"),E&&(E.textContent="❌ error");break;case"skipped":h.classList.add("nf-proc-skipped"),E&&(E.textContent="— skip");break;default:h.classList.add("nf-proc-waiting"),E&&(E.textContent="(queued)")}}const r=W.findIndex(l=>l.status==="active"),i=r>=0?r+1:t>=e&&e>0?W.length:t,o=document.getElementById("nf-step-counter");o&&(o.textContent=`${i}/${W.length}`);const d=document.querySelector(".nf-core-title-val"),p=document.querySelector(".nf-status-dot");t>=e&&e>0?(d&&(d.textContent="COMPLETE",d.style.color=Y.doneHex),p&&(p.style.background=Y.doneHex,p.style.boxShadow=`0 0 8px rgba(${Y.doneRgb},0.7)`)):W.some(h=>h.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),p&&(p.style.background="#ef4444",p.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):W.some(h=>h.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=Y.hex,d.style.textShadow=`0 0 10px rgba(${Y.rgb},0.5)`);const s=document.getElementById("nf-terminal"),c=s==null?void 0:s.querySelector(".nf-proc-active");c&&s&&c.scrollIntoView({behavior:"smooth",block:"center"})}function rt(){X&&X.isConnected||(Ue(),X=document.createElement("button"),X.id="nf-toggle-btn",X.className="nf-toggle-visible",X.innerHTML=se?qe:Ve,X.title="ซ่อน/แสดง Netflow Overlay",X.onclick=()=>Ae(),document.body.appendChild(X))}function Ae(){V&&(rt(),se?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),X&&(X.innerHTML=Ve),se=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),X&&(X.innerHTML=qe),se=!0))}const st={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function lt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=ue;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=st[e]||st.green;let i;try{i=chrome.runtime.getURL(r)}catch{i=`/${r}`}const o=Y.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${i}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${o},0.45)`,t.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function Be(t=1){if(Y=xt(),He(),V&&V.isConnected){se&&Ae();return}if(V&&!V.isConnected&&(V=null),ae&&(ae.remove(),ae=null),Ue(),ke=t,W=Ie(t),t>1){const e=le.find(i=>i.id==="video");if(e){const i=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=t;o++)i.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),i.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),i.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});e.steps=i}const r=le.find(i=>i.id==="render");if(r){const i=r.steps.find(d=>d.id==="download");i&&(i.label="ดาวน์โหลด 720p");const o=r.steps.find(d=>d.id==="upscale");o&&(o.label="Full Video")}}V=yt(),document.body.appendChild(V),se=!1,rt(),Et(),_t(),requestAnimationFrame(()=>lt())}function ct(){je(),at(),se=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),X&&(X.remove(),X=null)}const Tt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function At(t,e,r){const i=W.findIndex(l=>l.status==="active"),o=W.filter(l=>l.status==="done").length,d=W.length,p=i>=0?i+1:o>=d?d:o,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${p}/${d}`);const c=document.getElementById("nf-stat-scenes");if(c&&(c.textContent=ke>1?`1/${ke}`:"1/1"),e==="active"){const l=document.getElementById("nf-stat-status"),h=Tt[t]||t.toUpperCase();l&&(l.textContent=h)}else if(e==="done"&&o>=d){const l=document.getElementById("nf-stat-status");l&&(l.textContent="COMPLETE")}else if(e==="error"){const l=document.getElementById("nf-stat-status");l&&(l.textContent="ERROR")}if(r!==void 0&&r>0){const l=document.getElementById("nf-stat-progress");l&&(l.textContent=`${Math.min(100,r)}%`)}}function P(t,e,r){if(!V)return;for(const o of le)for(const d of o.steps)d.id===t&&(d.status=e,r!==void 0&&(d.progress=r));for(const o of W)o.stepId===t&&(o.status=e,r!==void 0&&(o.progress=r));const i=document.getElementById(`nf-step-${t}`);if(i&&(i.className="nf-step",e==="active"?i.classList.add("nf-step-active"):e==="done"?i.classList.add("nf-step-done"):e==="error"&&i.classList.add("nf-step-error")),At(t,e,r),r!==void 0){const o=document.getElementById(`nf-bar-${t}`);o&&(o.style.width=`${Math.min(100,r)}%`)}Re(),Te()}function pe(t){P(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function we(t=4e3){je(),at(),Re(),Te(),setTimeout(()=>ct(),t)}function Re(){for(const t of le){const e=t.steps.filter(c=>c.status!=="skipped").length,r=t.steps.filter(c=>c.status==="done").length,i=t.steps.some(c=>c.status==="active"),o=e>0?Math.round(r/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${o}%`);const p=document.getElementById(`nf-modbar-${t.id}`);p&&(p.style.width=`${o}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),o>=100?s.classList.add("nf-done"):i&&s.classList.add("nf-active"))}}function Bt(t){var i,o,d,p;ke=t;const e=new Map;for(const s of W)e.set(s.stepId,{status:s.status,progress:s.progress});W=Ie(t);for(const s of W){const c=e.get(s.stepId);c&&(s.status=c.status,c.progress!==void 0&&(s.progress=c.progress))}if(vt(),t>1){const s=le.find(c=>c.id==="video");if(s){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((i=s.steps.find(l=>l.id==="animate"))==null?void 0:i.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=s.steps.find(l=>l.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=s.steps.find(l=>l.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=s.steps.find(l=>l.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let l=2;l<=t;l++)c.push({id:`scene${l}-prompt`,label:`Scene ${l} Prompt`,status:"waiting"}),c.push({id:`scene${l}-gen`,label:`Scene ${l} Generate`,status:"waiting"}),c.push({id:`scene${l}-wait`,label:`Scene ${l} รอผล`,status:"waiting",progress:0});s.steps=c,dt(s)}}const r=le.find(s=>s.id==="render");if(r&&t>1){const s=r.steps.find(l=>l.id==="download");s&&(s.label="ดาวน์โหลด 720p");const c=r.steps.find(l=>l.id==="upscale");c&&(c.label="Full Video"),dt(r)}Re(),Te()}function dt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),t.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,e.appendChild(d)});const i=document.createElement("div");i.className="nf-mod-progress",i.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(i)}function Me(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Me(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Me(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function De(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}const ze=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ne=/Win/i.test(navigator.userAgent),fe=ze?"🍎 Mac":Ne?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${fe}`);class Fe extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const f=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new Fe);const i=setTimeout(()=>{if(window.__NETFLOW_STOP__)return r(new Fe);e()},t);f._lastId=i});function ce(){return!!window.__NETFLOW_STOP__}function pt(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of e){if(i.closest("#netflow-engine-overlay"))continue;const o=(i.textContent||"").trim().toLowerCase();if(!(o.length>200||o.length<5)){for(const d of t)if(o.includes(d))return((r=i.textContent)==null?void 0:r.trim())||d}}return null}async function te(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,i=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:i,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",o)),await f(80),t.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",o)),t.dispatchEvent(new MouseEvent("click",o)),await f(50),t.click()}function Rt(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,i=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:i};t.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",o)),t.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",o)),t.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",o))}function Dt(t){const e=[],r=document.querySelectorAll("i");for(const i of r){if((i.textContent||"").trim()!==t)continue;let d=i,p=null,s=1/0;for(let c=0;c<20&&d&&(d=d.parentElement,!(!d||d===document.body));c++){const l=d.getBoundingClientRect();if(l.width>100&&l.height>80&&l.width<window.innerWidth*.6&&l.top>=-10&&l.bottom<=window.innerHeight+10){const h=l.width*l.height;h<s&&(p=d,s=h)}}p&&!e.includes(p)&&e.push(p)}return e.sort((i,o)=>{const d=i.getBoundingClientRect(),p=o.getBoundingClientRect();return d.left-p.left}),e}function Oe(t=!1){const e=[],r=document.querySelectorAll("video");for(const p of r){let s=p.parentElement;for(let c=0;c<10&&s;c++){const l=s.getBoundingClientRect();if(l.width>120&&l.height>80&&l.width<window.innerWidth*.7&&l.top>=-50&&l.left<window.innerWidth*.75){e.push({el:s,left:l.left});break}s=s.parentElement}}const i=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const p of i){const s=(p.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let c=p.parentElement;for(let l=0;l<10&&c;l++){const h=c.getBoundingClientRect();if(h.width>120&&h.height>80&&h.width<window.innerWidth*.7&&h.top>=-50&&h.left<window.innerWidth*.75){e.push({el:c,left:h.left});break}c=c.parentElement}}}const o=document.querySelectorAll("img");for(const p of o){const s=(p.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let c=p.parentElement;for(let l=0;l<10&&c;l++){const h=c.getBoundingClientRect();if(h.width>120&&h.height>80&&h.width<window.innerWidth*.7&&h.top>=-50&&h.left<window.innerWidth*.75){e.push({el:c,left:h.left});break}c=c.parentElement}}}const d=Array.from(new Set(e.map(p=>p.el))).map(p=>e.find(s=>s.el===p));if(d.sort((p,s)=>p.left-s.left),d.length>0){const p=d[0].el,s=p.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),p}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function zt(){const t=Dt("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let i=r.parentElement;for(let o=0;o<10&&i;o++){const d=i.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),i;i=i.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Nt(t,e){var s;const[r,i]=t.split(","),o=((s=r.match(/:(.*?);/))==null?void 0:s[1])||"image/png",d=atob(i),p=new Uint8Array(d.length);for(let c=0;c<d.length;c++)p[c]=d.charCodeAt(c);return new File([p],e,{type:o})}function ve(t){var i;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of r)if(((i=o.textContent)==null?void 0:i.trim())===t){const d=o.closest("button");d&&e.push(d)}return e}function Ft(){const t=[...ve("add"),...ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const i=document.querySelectorAll("button");for(const o of i){const d=o.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const p=(o.textContent||"").trim();if(p==="+"||p==="add")return o}}return null}let e=null,r=0;for(const i of t){const o=i.getBoundingClientRect();o.y>r&&(r=o.y,e=i)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function ft(){for(const i of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=ve(i);let d=null,p=0;for(const s of o){const c=s.getBoundingClientRect();c.y>p&&(p=c.y,d=s)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${i}" ที่ y=${p.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,r=0;for(const i of t){const o=i.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const d=Math.abs(o.width-o.height)<10&&o.width<60,p=o.y+o.x+(d?1e3:0);p>r&&(r=p,e=i)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const i of t){const o=(i.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return i}return null}function ut(){const t=document.querySelectorAll("textarea");for(const i of t)if(i.getBoundingClientRect().bottom>window.innerHeight*.5)return i;const e=document.querySelectorAll('[contenteditable="true"]');for(const i of e)if(i.getBoundingClientRect().bottom>window.innerHeight*.5)return i;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const i of r){const o=i.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return i}return t.length>0?t[t.length-1]:null}async function Le(t,e){var r,i,o,d;t.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(c),await f(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${l.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${l.length} ตัวอักษร)`)}catch(p){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await f(100);const p=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(p);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await f(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await f(200);const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:p});t.dispatchEvent(s),await f(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await f(200),document.execCommand("paste"),await f(500);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${p.length} ตัวอักษร)`);return}}catch(p){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const p=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(p){let s=t[p];for(let c=0;c<30&&s;c++){const l=s.memoizedProps,h=s.memoizedState;if((i=l==null?void 0:l.editor)!=null&&i.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const E=l.editor;E.selection,E.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(o=h==null?void 0:h.memoizedState)==null?void 0:o.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),h.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(p){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${p.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ot(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Lt(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${fe})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${fe})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Gt(t,e,r){var l;const i=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...t.map(h=>h.input)];for(const h of i)!o.includes(h)&&h.offsetParent===null&&o.push(h);for(const h of o)h.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${fe})`),!1;let p;if(r&&r.size>0){const h=Array.from(d).filter(E=>!r.has(E));h.length>0?(p=h[h.length-1],n(`เล็งเป้า file input ใหม่ (${h.length} ใหม่, ${d.length} ทั้งหมด)`)):(p=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else p=d[d.length-1];const s=new DataTransfer;s.items.add(e);try{p.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((l=p.files)==null?void 0:l.length)??0} ไฟล์)`)}catch(h){n(`กำหนด target.files ล้มเหลว: ${h.message} — ลอง defineProperty`);try{Object.defineProperty(p,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(E){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${E.message}`),!1}}const c=p._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0}));try{const h=new DataTransfer;h.items.add(e);const E=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:h});p.dispatchEvent(E),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${fe}`),!0}function ye(){let t=0;const e=document.querySelectorAll("img");for(const i of e){if(i.closest("#netflow-engine-overlay"))continue;const o=i.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&i.src&&i.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const i of r){if(i.closest("#netflow-engine-overlay"))continue;const o=i.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&i.offsetParent!==null&&t++}return t}async function gt(t,e){var h;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=Nt(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const i=ye();n(`รูปย่อปัจจุบันใน Prompt Bar: ${i} รูป`);const o=async(E,D=8e3)=>{const v=Date.now();for(;Date.now()-v<D;){const w=ye();if(w>i)return n(`✅ [${E}] ยืนยัน: รูปย่อเพิ่มจาก ${i} → ${w}`),!0;await f(500)}return n(`⚠️ [${E}] รูปย่อไม่เพิ่ม (ยังคง ${ye()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=Ft();if(!d)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const p=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${p.size} ตัว`);const s=Lt();let c=Ot();const l=new MutationObserver(E=>{for(const D of E)for(const v of D.addedNodes)if(v instanceof HTMLInputElement&&v.type==="file"&&(v.type="text",c.push({input:v,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),v instanceof HTMLElement){const w=v.querySelectorAll('input[type="file"]');for(const b of w)b.type="text",c.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});l.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await f(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let E=!1;const D=Date.now();for(;!E&&Date.now()-D<5e3;){const w=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const b of w){if(b===d)continue;const a=b.querySelectorAll("i");for(const $ of a){const C=((h=$.textContent)==null?void 0:h.trim())||"";if((C==="upload"||C==="upload_file")&&!Array.from(b.querySelectorAll("i")).map(y=>{var x;return(x=y.textContent)==null?void 0:x.trim()}).includes("drive_folder_upload")){b.click(),E=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${C}) ✅`);break}}if(E)break}if(!E)for(const b of w){if(b===d)continue;const a=b.childNodes.length<=5?(b.textContent||"").trim():"";if(a.length>0&&a.length<40){const $=a.toLowerCase();if($==="upload"||$==="อัปโหลด"||$==="อัพโหลด"||$.includes("upload image")||$.includes("upload photo")||$.includes("อัปโหลดรูปภาพ")||$.includes("อัพโหลดรูปภาพ")||$.includes("from computer")||$.includes("จากคอมพิวเตอร์")){b.click(),E=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${a}") ✅`);break}}}E||await f(500)}return E?(await f(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Gt(c,r,p)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{l.disconnect(),s();for(const E of c)E.input.type!=="file"&&(E.input.type="file")}}async function Ht(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button");let i=null;for(const v of r){const w=v.textContent||"";if((w.includes("Nano Banana")||w.includes("Imagen")||w.includes("วิดีโอ")||w.includes("รูปภาพ")||w.includes("Image")||w.includes("Video"))&&v.getBoundingClientRect().bottom>window.innerHeight*.7){i=v,n(`พบปุ่มตั้งค่าจากข้อความ: "${w.substring(0,30).trim()}"`);break}}if(!i)for(const v of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const w=ve(v);for(const b of w)if(b.getBoundingClientRect().bottom>window.innerHeight*.7){i=b,n(`พบปุ่มตั้งค่าจากไอคอน: ${v}`);break}if(i)break}if(!i)return A("ไม่พบปุ่มตั้งค่า"),!1;const o=i.getBoundingClientRect(),d=o.left+o.width/2,p=o.top+o.height/2,s={bubbles:!0,cancelable:!0,clientX:d,clientY:p,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",s)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",s)),i.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await f(1500);let c=!1,l=null;const h=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const v of h){const w=v.getAttribute("aria-controls")||"",b=v.id||"";if(w.toUpperCase().includes("IMAGE")||b.toUpperCase().includes("IMAGE")){l=v,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${w})`);break}}if(!l)for(const v of document.querySelectorAll('[role="tab"]')){const w=v.id||"";if(w.toUpperCase().includes("TRIGGER-IMAGE")){l=v,n(`พบแท็บ Image ผ่าน id: ${w}`);break}}if(!l)for(const v of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const w=(v.textContent||"").trim();if((w==="Image"||w.endsWith("Image")||w==="รูปภาพ"||w==="ภาพ")&&!w.includes("Video")&&!w.includes("วิดีโอ")){l=v,n(`พบแท็บ Image ผ่านข้อความ: "${w}"`);break}}if(l){const v=l.getAttribute("data-state")||"",w=l.getAttribute("aria-selected")||"";if(v==="active"||w==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const b=l.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),l.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",a)),l.dispatchEvent(new MouseEvent("click",a)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const E=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const w=(v.textContent||"").trim();if(w===E||w.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const b=v.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",a)),v.dispatchEvent(new MouseEvent("click",a)),n(`เลือกทิศทาง: ${E}`),await f(400);break}}const D=`x${e}`;for(const v of document.querySelectorAll("button, [role='tab'], [role='option']"))if((v.textContent||"").trim()===D){const b=v.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",a)),await f(80),v.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",a)),v.dispatchEvent(new MouseEvent("click",a)),n(`เลือกจำนวน: ${D}`),await f(400);break}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),i.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",s)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",s)),i.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function qt(t){var C,z,y,x;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),i=r?r[1]:"unknown",o=ze?"macOS":Ne?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=ze?((z=(C=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:C[1])==null?void 0:z.replace(/_/g,"."))||"":Ne&&((y=e.match(/Windows NT ([0-9.]+)/))==null?void 0:y[1])||"",p=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${d} | Chrome ${i}`),n(`🌐 ภาษา: ${p} | หน้าจอ: ${s} | แพลตฟอร์ม: ${fe}`),n("══════════════════════════════════════════");try{Se(t.theme)}catch{}try{Be()}catch(g){console.warn("Overlay show error:",g)}const c=[],l=[];try{P("settings","active");const g=t.orientation||"horizontal",T=t.outputCount||1,R=await Ht(g,T);c.push(R?"✅ Settings":"⚠️ Settings"),P("settings",R?"done":"error")}catch(g){A(`ตั้งค่าผิดพลาด: ${g.message}`),c.push("⚠️ Settings"),P("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const h=()=>{const g=document.querySelectorAll("span, div, p, label");for(const T of g){const R=(T.textContent||"").trim();if(/^\d{1,3}%$/.test(R)){if(R==="100%")return null;const S=T.getBoundingClientRect();if(S.width>0&&S.height>0&&S.top>0&&S.top<window.innerHeight)return R}}return null},E=async g=>{n(`รอการอัพโหลด ${g} เสร็จ...`),await f(2e3);const T=Date.now(),R=6e4;let S="",q=Date.now();const m=15e3;for(;Date.now()-T<R;){const u=h();if(u){if(u!==S)S=u,q=Date.now();else if(Date.now()-q>m){n(`✅ อัพโหลด ${g} — % ค้างที่ ${u} นาน ${m/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}n(`กำลังอัพโหลด: ${u} — รอ...`),await f(1500)}else{n(`✅ อัพโหลด ${g} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}A(`⚠️ อัพโหลด ${g} หมดเวลาหลัง ${R/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){P("upload-char","active");try{const g=await gt(t.characterImage,"character.png");c.push(g?"✅ ตัวละคร":"⚠️ ตัวละคร"),g||l.push("character upload failed"),P("upload-char",g?"done":"error")}catch(g){A(`อัพโหลดตัวละครผิดพลาด: ${g.message}`),c.push("❌ ตัวละคร"),l.push("character upload error"),P("upload-char","error")}await E("character")}else pe("upload-char");if(t.productImage){P("upload-prod","active");try{const g=await gt(t.productImage,"product.png");c.push(g?"✅ สินค้า":"⚠️ สินค้า"),g||l.push("product upload failed"),P("upload-prod",g?"done":"error")}catch(g){A(`อัพโหลดสินค้าผิดพลาด: ${g.message}`),c.push("❌ สินค้า"),l.push("product upload error"),P("upload-prod","error")}await E("product")}else pe("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const D=h();D&&(n(`⚠️ อัพโหลดยังแสดง ${D} — รอเพิ่มเติม...`),await E("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const v=(t.characterImage?1:0)+(t.productImage?1:0);if(v>0){let g=ye();g<v&&(n(`⏳ เห็นรูปย่อแค่ ${g}/${v} — รอ 3 วินาที...`),await f(3e3),g=ye()),g>=v?n(`✅ ยืนยันรูปย่ออ้างอิง: ${g}/${v}`):A(`⚠️ คาดว่าจะมี ${v} รูปย่อ แต่พบ ${g} — ดำเนินการต่อ`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),l.push("stopped by user");try{we(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await f(1e3);const w=ut();w?(await Le(w,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),P("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),l.push("prompt input not found"),P("img-prompt","error")),await f(800);const b=new Set;document.querySelectorAll("img").forEach(g=>{g.src&&b.add(g.src)}),n(`บันทึกรูปเดิม: ${b.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await f(500);const a=ft();if(a){const g=a.getBoundingClientRect(),T=g.left+g.width/2,R=g.top+g.height/2,S={bubbles:!0,cancelable:!0,clientX:T,clientY:R,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",S)),await f(80),a.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",S)),a.dispatchEvent(new MouseEvent("click",S)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await f(500),a.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",S)),await f(80),a.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",S)),a.dispatchEvent(new MouseEvent("click",S)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),l.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const g=()=>{const m=document.querySelectorAll("div, span, p, label, strong, small");for(const u of m){if(u.closest("#netflow-engine-overlay"))continue;const M=(u.textContent||"").trim();if(M.length>10)continue;const B=M.match(/(\d{1,3})\s*%/);if(!B)continue;const I=parseInt(B[1],10);if(I<1||I>100)continue;const k=u.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return I}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let T=null,R=-1,S=0;const q=Date.now();for(;!T&&Date.now()-q<18e4;){const m=document.querySelectorAll("img");for(const u of m){if(b.has(u.src)||!(u.alt||"").toLowerCase().includes("generated"))continue;const B=u.getBoundingClientRect();if(B.width>120&&B.height>120&&B.top>0&&B.top<window.innerHeight*.85){const I=u.closest("div");if(I){T=I,n(`พบรูป AI จาก alt="${u.alt}": ${u.src.substring(0,80)}...`);break}}}if(!T)for(const u of m){if(b.has(u.src))continue;const M=u.closest("div"),B=(M==null?void 0:M.textContent)||"";if(B.includes("product.png")||B.includes("character.png")||B.includes(".png")||B.includes(".jpg"))continue;const I=u.getBoundingClientRect();if(I.width>120&&I.height>120&&I.top>0&&I.top<window.innerHeight*.85){const k=u.closest("div");if(k){T=k,n(`พบรูปใหม่ (สำรอง): ${u.src.substring(0,80)}...`);break}}}if(!T){if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const u=pt();if(u){A(`❌ สร้างรูปล้มเหลว: ${u}`),l.push(`image gen failed: ${u}`),P("img-wait","error");break}const M=g();M!==null?(M!==R&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${M}%`),R=M,P("img-wait","active",M)),S=Date.now()):R>30&&Math.floor((Date.now()-S)/1e3)>=3&&n(`🖼️ % หายที่ ${R}% — รูปน่าจะเสร็จแล้ว`),await f(3e3)}}if(!T)A("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),P("img-wait","done",100);const m=T.getBoundingClientRect(),u=m.left+m.width/2,M=m.top+m.height/2,B={bubbles:!0,cancelable:!0,clientX:u,clientY:M};T.dispatchEvent(new PointerEvent("pointerenter",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseenter",B)),T.dispatchEvent(new PointerEvent("pointerover",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseover",B)),T.dispatchEvent(new PointerEvent("pointermove",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousemove",B)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let I=null;for(const k of["more_vert","more_horiz","more"]){const _=ve(k);for(const F of _){const L=F.getBoundingClientRect();if(L.top>=m.top-20&&L.top<=m.bottom&&L.right>=m.right-150&&L.right<=m.right+20){I=F;break}}if(I)break}if(!I){const k=document.querySelectorAll("button");for(const _ of k){const F=_.getBoundingClientRect();if(F.width<50&&F.height<50&&F.top>=m.top-10&&F.top<=m.top+60&&F.left>=m.right-80){const L=_.querySelectorAll("i");for(const K of L)if((((x=K.textContent)==null?void 0:x.trim())||"").includes("more")){I=_;break}if(I)break;const H=_.getAttribute("aria-label")||"";if(H.includes("เพิ่มเติม")||H.includes("more")){I=_;break}}}}if(!I)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const k=I.getBoundingClientRect(),_=k.left+k.width/2,F=k.top+k.height/2,L={bubbles:!0,cancelable:!0,clientX:_,clientY:F,button:0};I.dispatchEvent(new PointerEvent("pointerdown",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mousedown",L)),await f(80),I.dispatchEvent(new PointerEvent("pointerup",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseup",L)),I.dispatchEvent(new MouseEvent("click",L)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let H=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of K){const J=(U.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){H=U;break}}if(!H)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const U=H.getBoundingClientRect(),J=U.left+U.width/2,O=U.top+U.height/2,N={bubbles:!0,cancelable:!0,clientX:J,clientY:O,button:0};H.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousedown",N)),await f(80),H.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mouseup",N)),H.dispatchEvent(new MouseEvent("click",N)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),P("animate","done"),await f(3e3)}}}}catch(g){A(`ขั้น 4 ผิดพลาด: ${g.message}`),c.push("⚠️ Animate")}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),l.push("stopped by user");try{we(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let g=!1;const T=document.querySelectorAll("button, span, div");for(const q of T){const m=(q.textContent||"").trim(),u=q.getBoundingClientRect();if((m==="วิดีโอ"||m==="Video"||m.includes("วิดีโอ"))&&u.bottom>window.innerHeight*.7){g=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}g||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await f(1e3);const R=ut();R?(await Le(R,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),P("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),l.push("video prompt input not found"),P("vid-prompt","error")),await f(1e3),P("vid-generate","active");const S=ft();if(S){const q=S.getBoundingClientRect(),m=q.left+q.width/2,u=q.top+q.height/2,M={bubbles:!0,cancelable:!0,clientX:m,clientY:u,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",M)),await f(80),S.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",M)),S.dispatchEvent(new MouseEvent("click",M)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),P("vid-generate","done"),await f(500),S.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",M)),await f(80),S.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",M)),S.dispatchEvent(new MouseEvent("click",M)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),l.push("video generate button not found"),P("vid-generate","error")}catch(g){A(`ขั้น 5 ผิดพลาด: ${g.message}`),c.push("⚠️ Video Gen"),l.push(`video gen error: ${g.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pe("animate"),pe("vid-prompt"),pe("vid-generate"),pe("vid-wait");if(t.videoPrompt){P("vid-wait","active");const g=t.sceneCount||1,T=t.videoScenePrompts||[t.videoPrompt];if(g>1)try{Bt(g)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${g>1?`ต่อ ${g} ฉาก`:"ดาวน์โหลด"} ===`);const R=()=>{const m=document.querySelectorAll("div, span, p, label, strong, small");for(const u of m){if(u.closest("#netflow-engine-overlay"))continue;const M=(u.textContent||"").trim();if(M.length>10)continue;const B=M.match(/(\d{1,3})\s*%/);if(!B)continue;const I=parseInt(B[1],10);if(I<1||I>100)continue;const k=u.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return I}return null},S=async(m=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await f(5e3);const u=()=>{const N=document.querySelectorAll("div, span, p, label, strong, small");let G=0;for(const j of N){if(j.closest("#netflow-engine-overlay"))continue;const oe=(j.textContent||"").trim();if(oe.includes("%")&&oe.length<15){const re=j.tagName.toLowerCase(),bt=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Ge=j.getBoundingClientRect();if(n(`  🔍 "${oe}" ใน <${re}.${bt}> ที่ (${Ge.left.toFixed(0)},${Ge.top.toFixed(0)}) w=${Ge.width.toFixed(0)}`),G++,G>=5)break}}G===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},M=Oe();n(M?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),u();const B=Date.now();let I=-1,k=0,_=!1;for(;Date.now()-B<m;){const N=R();if(N!==null){if(N!==I&&(n(`ความคืบหน้าวิดีโอ: ${N}%`),I=N,P("vid-wait","active",N)),k=Date.now(),N>=100){n("✅ ตรวจพบ 100%!"),_=!0;break}}else if(I>30){const G=Math.floor((Date.now()-k)/1e3);if(G>=5){n(`✅ % หายไปที่ ${I}% (หาย ${G} วินาที) — วิดีโอเสร็จ!`),_=!0;break}n(`⏳ % หายที่ ${I}% — ยืนยันใน ${5-G} วินาที...`)}else{const G=Math.floor((Date.now()-B)/1e3);G%15<3&&n(`⏳ รอ... (${G} วินาที) ไม่พบ %`)}if(!_&&I>0&&Oe(!0)&&!M){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${I}% — วิดีโอเสร็จ!`),_=!0;break}if(ce())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(I<1){const G=pt();if(G)return A(`❌ สร้างวิดีโอล้มเหลว: ${G}`),null}await f(3e3)}const F=Oe();if(!F)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),P("vid-wait","error"),null;const L=F;_?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const H=L.getBoundingClientRect();let K=H.left+H.width/2,U=H.top+H.height/2,J=L;const O=L.querySelector("video, img, canvas");if(O){const N=O.getBoundingClientRect();N.width>50&&N.height>50&&(K=N.left+N.width/2,U=N.top+N.height/2,J=O,n(`🎯 พบรูปย่อ <${O.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${U.toFixed(0)}) ${N.width.toFixed(0)}x${N.height.toFixed(0)}`))}else U=H.top+H.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${U.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${U.toFixed(0)})...`),Rt(J);for(let N=0;N<8;N++){const G={bubbles:!0,cancelable:!0,clientX:K+N%2,clientY:U};J.dispatchEvent(new PointerEvent("pointermove",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",G)),await f(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:g,scenePrompts:T,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${g} ฉาก, ${T.length} prompts, theme: ${t.theme})`)}catch(N){n(`⚠️ ไม่สามารถบันทึก pending action: ${N.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await q(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),L},q=async m=>{const u=m.getBoundingClientRect(),M=u.left+u.width/2,B=u.top+u.height/2,I={bubbles:!0,cancelable:!0,clientX:M,clientY:B,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",I)),await f(80),m.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",I)),m.dispatchEvent(new MouseEvent("click",I)),await f(50),m.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await S())A("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),P("vid-wait","error");else{c.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const u=await new Promise(M=>{chrome.storage.local.get("netflow_pending_action",B=>{if(chrome.runtime.lastError){M(null);return}M((B==null?void 0:B.netflow_pending_action)||null)})});u&&!u._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),u.action==="mute_video"?await mt(u.sceneCount||1,u.scenePrompts||[],u.theme):u.action==="wait_scene_gen_and_download"&&await ht(u.sceneCount||2,u.currentScene||2,u.theme))}}catch(m){A(`ขั้น 6 ผิดพลาด: ${m.message}`),c.push("⚠️ Step6"),l.push(`step 6: ${m.message}`)}}const $=l.length===0;try{we($?5e3:8e3)}catch(g){console.warn("Overlay complete error:",g)}return{success:$,message:$?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${l.join(", ")}`,step:$?"done":"partial"}}async function mt(t,e=[],r){var $;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Se(r)}catch{}try{Be(t)}catch(C){n(`⚠️ showOverlay error: ${C.message}`)}try{const C=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const z of C)P(z,"done");t>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${C.length} steps done, sceneCount=${t}`)}catch(C){n(`⚠️ overlay restore error: ${C.message}`)}await f(1500);const i=(()=>{for(const C of document.querySelectorAll("button")){const z=C.querySelectorAll("i");for(const x of z){const g=(x.textContent||"").trim();if(g==="volume_up"||g==="volume_off"||g==="volume_mute"){const T=C.getBoundingClientRect();if(T.width>0&&T.height>0)return C}}const y=(C.getAttribute("aria-label")||"").toLowerCase();if(y.includes("mute")||y.includes("ปิดเสียง")){const x=C.getBoundingClientRect();if(x.width>0&&x.height>0)return C}}return null})();if(i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let m=2;m<=t;m++){const u=e[m-1];if(!u){A(`ไม่พบ prompt สำหรับฉากที่ ${m}`);continue}n(`── ฉากที่ ${m}/${t}: วาง prompt + generate ──`);let M=null;const B=Date.now();for(;!M&&Date.now()-B<1e4;){const O=document.querySelectorAll("[data-slate-editor='true']");if(O.length>0&&(M=O[O.length-1]),!M){const N=document.querySelectorAll("[role='textbox'][contenteditable='true']");N.length>0&&(M=N[N.length-1])}M||await f(1e3)}if(!M){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${M.tagName.toLowerCase()}> ${M.className.substring(0,40)}`),await Le(M,u),n(`วาง prompt ฉาก ${m} (${u.length} ตัวอักษร) ✅`);try{P(`scene${m}-prompt`,"done"),P(`scene${m}-gen`,"active")}catch{}await f(1e3);const I=M.getBoundingClientRect();let k=null,_=1/0;for(const O of document.querySelectorAll("button")){if(O.disabled)continue;const N=O.querySelectorAll("i");let G=!1;for(const re of N)if((re.textContent||"").trim()==="arrow_forward"){G=!0;break}if(!G)continue;const j=O.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const oe=Math.abs(j.top-I.top)+Math.abs(j.right-I.right);oe<_&&(_=oe,k=O)}if(!k)for(const O of document.querySelectorAll("button")){const N=O.querySelectorAll("i");for(const G of N)if((G.textContent||"").trim()==="arrow_forward"){const j=O.getBoundingClientRect();if(j.width>0&&j.height>0){k=O;break}}if(k)break}if(!k){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(O=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:m}},()=>O())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${m}/${t})`),await te(k),n(`คลิก Generate ฉาก ${m} ✅`);try{P(`scene${m}-gen`,"done"),P(`scene${m}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${m} gen เสร็จ ──`),await f(5e3);let F=0,L=0;const H=Date.now(),K=6e5,U=5e3;let J=!1;for(;Date.now()-H<K;){let O=null;const N=document.querySelectorAll("div, span, p, label, strong, small");for(const G of N){if(G.closest("#netflow-engine-overlay"))continue;const oe=(G.textContent||"").trim().match(/^(\d{1,3})%$/);if(oe){const re=G.getBoundingClientRect();if(re.width>0&&re.height>0&&re.width<120&&re.height<60){O=parseInt(oe[1],10);break}}}if(O!==null){if(O!==F){n(`🎬 ฉาก ${m} ความคืบหน้า: ${O}%`),F=O;try{P(`scene${m}-wait`,"active",O)}catch{}}L=0}else if(F>0){if(L===0)L=Date.now(),n(`🔍 ฉาก ${m}: % หายไป (จาก ${F}%) — กำลังยืนยัน...`);else if(Date.now()-L>=U){n(`✅ ฉาก ${m}: % หายไป ${U/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุด");return}await f(2e3)}J||A(`ฉาก ${m} หมดเวลา`),n(`✅ ฉาก ${m} เสร็จแล้ว`);try{P(`scene${m}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}await f(2e3);const C=Date.now();let z=null;const y=Date.now();for(;!z&&Date.now()-y<1e4;){for(const m of document.querySelectorAll("button")){const u=m.querySelector("i");if(u&&(u.textContent||"").trim()==="download"){const M=m.getBoundingClientRect();if(M.width>0&&M.height>0){z=m;break}}}z||await f(1e3)}if(!z){A("ไม่พบปุ่มดาวน์โหลด");return}await te(z),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await f(1500);let x=null;for(let m=0;m<3&&!x;m++){m>0&&n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`);let u=null;const M=Date.now();for(;!u&&Date.now()-M<5e3;){for(const F of document.querySelectorAll("[role='menuitem']"))if((F.textContent||"").trim().includes("Full Video")&&F.querySelector("i")){const H=F.getBoundingClientRect();if(H.width>0&&H.height>0){u=F;break}}u||await f(500)}if(!u){A("ไม่พบ Full Video");continue}const B=u.getBoundingClientRect(),I=B.left+B.width/2,k=B.top+B.height/2;u.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:I,clientY:k})),u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:I,clientY:k})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:I,clientY:k})),await te(u),n("คลิก/hover Full Video ✅"),await f(2e3);const _=Date.now();for(;!x&&Date.now()-_<8e3;){for(const F of document.querySelectorAll("button[role='menuitem']")){const L=F.querySelectorAll("span");for(const H of L)if((H.textContent||"").trim()==="720p"){const K=F.getBoundingClientRect();if(K.width>0&&K.height>0){x=F;break}}if(x)break}x||(u.isConnected&&(u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:I,clientY:k})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:I+20,clientY:k}))),await f(500))}}if(!x){A("ไม่พบ 720p");return}await te(x),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const g=Date.now();let T=!1,R=!1;for(;Date.now()-g<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const u=(m.textContent||"").trim();if(u==="Download complete!"||u==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),T=!0;break}(u.includes("Downloading your extended video")||u.includes("กำลังดาวน์โหลด"))&&(R||(R=!0,n("⏳ กำลังดาวน์โหลด...")))}if(T)break;if(R){let m=!1;for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((u.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),T=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await f(2e3)}if(!T){A("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await f(5e3);let S=!1;const q=Date.now();for(;Date.now()-q<6e4&&!S;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:C},u=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):u!=null&&u.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${u.message}`),S=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${u==null?void 0:u.message}`),m()})})}catch(m){A(`ตรวจสอบผิดพลาด: ${m.message}`)}S||await f(3e3)}S||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),we(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),De(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await f(2e3);const o=(C,z="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const y of document.querySelectorAll(z)){const x=(y.textContent||"").trim();if(x.includes(C)&&x.length<100){const g=y.getBoundingClientRect();if(g.width>0&&g.height>0&&g.top>=0)return y}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const p=Date.now();for(;!d&&Date.now()-p<1e4;){for(const C of document.querySelectorAll("button, [role='button']")){const z=(C.textContent||"").trim(),y=z.toLowerCase();if((y.includes("download")||y.includes("ดาวน์โหลด"))&&z.length<80){const x=C.getBoundingClientRect();if(x.width>0&&x.height>0){d=C;break}}}if(!d)for(const C of document.querySelectorAll("button")){const z=(C.getAttribute("aria-label")||"").toLowerCase();if(z.includes("download")||z.includes("ดาวน์")){const y=C.getBoundingClientRect();if(y.width>0&&y.height>0){d=C;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!d){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await te(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(1500);const s=Date.now();let c=null;const l=Date.now();for(;!c&&Date.now()-l<5e3;)c=o("1080p"),c||(n("รอ 1080p..."),await f(500));if(!c){A("ไม่พบ 1080p");return}await te(c),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const h=Date.now();let E=!1,D=!1,v=0;const w=3e3;for(;Date.now()-h<3e5;){const z=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(z.includes("upscaling complete")||z.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),E=!0;break}for(const x of document.querySelectorAll("div, span, p")){const g=(x.textContent||"").trim().toLowerCase();if(g.length<60&&(g.includes("upscaling complete")||g.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${($=x.textContent)==null?void 0:$.trim()}")`),E=!0;break}}if(E)break;if(z.includes("upscaling your video")||z.includes("กำลังอัปสเกล")){D=!0,v=0;const x=Math.floor((Date.now()-h)/1e3);n(`⏳ กำลังอัปสเกล... (${x} วินาที)`)}else if(D){if(v===0)v=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-v>=w){n(`✅ ข้อความ Upscaling หายไป ${w/1e3} วินาที — เสร็จ!`),E=!0;break}}else{const x=Math.floor((Date.now()-h)/1e3);x%10<3&&n(`⏳ รอ Upscale... (${x} วินาที)`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!E){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await f(5e3);let b=!1;const a=Date.now();for(;Date.now()-a<6e4&&!b;){try{await new Promise(C=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},z=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):z!=null&&z.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${z.message}`),b=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${z==null?void 0:z.message}`),C()})})}catch(C){A(`ตรวจสอบผิดพลาด: ${C.message}`)}b||await f(3e3)}b||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),De(2e3)}async function ht(t=2,e=2,r){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Se(r)}catch{}try{Be(t)}catch(y){n(`⚠️ showOverlay error: ${y.message}`)}try{const y=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let x=2;x<=e;x++)y.push(`scene${x}-prompt`,`scene${x}-gen`),x<e&&y.push(`scene${x}-wait`);for(const x of y)P(x,"done");P(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${y.length} steps done (scene ${e}/${t} navigate)`)}catch(y){n(`⚠️ overlay restore error: ${y.message}`)}await f(2e3);const i=(()=>{for(const y of document.querySelectorAll("button")){const x=y.querySelectorAll("i");for(const g of x){const T=(g.textContent||"").trim();if(T==="volume_up"||T==="volume_off"||T==="volume_mute"){const R=y.getBoundingClientRect();if(R.width>0&&R.height>0)return y}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let o=0,d=0;const p=Date.now(),s=6e5,c=5e3;let l=!1,h=0;for(;Date.now()-p<s;){let y=null;const x=document.querySelectorAll("div, span, p, label, strong, small");for(const g of x){if(g.closest("#netflow-engine-overlay"))continue;const R=(g.textContent||"").trim().match(/^(\d{1,3})%$/);if(R){const S=g.getBoundingClientRect();if(S.width>0&&S.height>0&&S.width<120&&S.height<60){y=parseInt(R[1],10);break}}}if(y!==null){if(h=0,y!==o){n(`🎬 scene ${e} ความคืบหน้า: ${y}%`),o=y;try{P(`scene${e}-wait`,"active",y)}catch{}}d=0}else if(o>0){if(d===0)d=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${o}%) — กำลังยืนยัน...`);else if(Date.now()-d>=c){n(`✅ scene ${e}: % หายไป ${c/1e3} วินาที — เจนเสร็จ!`),l=!0;break}}else if(h++,h>=15){const g=document.querySelectorAll("video");let T=!1;for(const R of g)if(R.readyState>=2&&!R.paused&&R.getBoundingClientRect().width>200){T=!0;break}if(T){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),l=!0;break}if(h>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),l=!0;break}}await f(2e3)}l||n(`⚠️ scene ${e} หมดเวลา — ลองดาวน์โหลดต่อ`);try{P(`scene${e}-wait`,"done",100)}catch{}n(`✅ scene ${e} เสร็จ — เริ่มดาวน์โหลด`),await f(3e3);try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const E=Date.now();let D=null;const v=Date.now();for(;!D&&Date.now()-v<1e4;){for(const y of document.querySelectorAll("button")){const x=y.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const g=y.getBoundingClientRect();if(g.width>0&&g.height>0){D=y;break}}}D||await f(1e3)}if(!D){A("ไม่พบปุ่มดาวน์โหลด");return}await te(D),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await f(1500);let w=null;for(let y=0;y<3&&!w;y++){y>0&&n(`🔄 ลองหา 720p ครั้งที่ ${y+1}...`);let x=null;const g=Date.now();for(;!x&&Date.now()-g<5e3;){for(const m of document.querySelectorAll("[role='menuitem']"))if((m.textContent||"").trim().includes("Full Video")&&m.querySelector("i")){const M=m.getBoundingClientRect();if(M.width>0&&M.height>0){x=m;break}}x||await f(500)}if(!x){A("ไม่พบ Full Video");continue}const T=x.getBoundingClientRect(),R=T.left+T.width/2,S=T.top+T.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:R,clientY:S})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:S})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R,clientY:S})),await te(x),n("คลิก/hover Full Video ✅"),await f(2e3);const q=Date.now();for(;!w&&Date.now()-q<8e3;){for(const m of document.querySelectorAll("button[role='menuitem']")){const u=m.querySelectorAll("span");for(const M of u)if((M.textContent||"").trim()==="720p"){const B=m.getBoundingClientRect();if(B.width>0&&B.height>0){w=m;break}}if(w)break}w||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:S})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R+20,clientY:S}))),await f(500))}}if(!w){A("ไม่พบ 720p");return}await te(w),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const b=Date.now();let a=!1,$=!1;for(;Date.now()-b<3e5;){for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(y.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),a=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&($||($=!0,n("⏳ กำลังดาวน์โหลด...")))}if(a)break;if($){let y=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){y=!0;break}if(!y){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),a=!0;break}}await f(2e3)}if(!a){A("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await f(5e3);let C=!1;const z=Date.now();for(;Date.now()-z<6e4&&!C;){try{await new Promise(y=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:E},x=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),C=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${x==null?void 0:x.message}`),y()})})}catch(y){A(`ตรวจสอบผิดพลาด: ${y.message}`)}C||await f(3e3)}C||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),we(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),De(2e3)}async function Vt(){try{const t=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",p=>{if(chrome.runtime.lastError){d(null);return}d((p==null?void 0:p.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-t.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=i,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:t},()=>d())}),await f(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",p=>{const s=p==null?void 0:p.netflow_pending_action;d((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(r/1e3)} วินาที)`),t.action==="mute_video"?await mt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await ht(t.sceneCount||2,t.currentScene||2,t.theme):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),qt(t).then(i=>n(`✅ ระบบอัตโนมัติเสร็จ: ${i.message}`)).catch(i=>{if(i instanceof Fe||(i==null?void 0:i.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Me("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{ct()}catch{}}else console.error("[Netflow AI] Generate error:",i)}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const i=zt();if(!i){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=i.getBoundingClientRect(),d=o.left+o.width/2,p=o.top+o.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${p.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const c=document.elementFromPoint(d,p);c?(await te(c),n(`คลิก ${s+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await te(i),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Vt()})();
