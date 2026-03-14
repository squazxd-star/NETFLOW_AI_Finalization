(function(){"use strict";const fe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Z=fe.green,Ce=null;function Ye(t){t&&fe[t]&&(Ce=t,Z=fe[t],dt(),requestAnimationFrame(()=>_t()))}function qt(){if(Ce&&fe[Ce])return fe[Ce];try{const t=localStorage.getItem("netflow_app_theme");if(t&&fe[t])return fe[t]}catch{}return fe.green}let re=0,se=255,le=65;function dt(){const t=Z.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(re=parseInt(t[1],16),se=parseInt(t[2],16),le=parseInt(t[3],16))}const pt='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ft='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let F=null,Q=null,X=null,ut=0,Fe=null,Te=null,ze=null,je=0,ge=!1,de=null,Ie=null,Se=null,ye=1,j=[];function Ve(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const ce=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];j=Ve(1);function Wt(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,i=t.hex,p=t.accentHex,l=t.doneHex,s=(()=>{const h=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=m=>Math.min(255,m+80);return`#${[1,2,3].map(m=>o(parseInt(h[m],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const h=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=m=>Math.min(255,m+60);return`#${[1,2,3].map(m=>o(parseInt(h[m],16)).toString(16).padStart(2,"0")).join("")}`})(),d=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),y=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,E=d?parseInt(d[1],16)/y:0,C=d?parseInt(d[2],16)/y:1,L=d?parseInt(d[3],16)/y:.25,B=h=>`${Math.round(E*h)}, ${Math.round(C*h)}, ${Math.round(L*h)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${B(18)},0.94) 0%, rgba(${B(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${B(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${B(180)},0.05),
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
            0 0 200px rgba(${B(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${B(180)},0.08),
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
.nf-term-line.nf-term-done { color: rgba(${a}, 0.85); }
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
    background: linear-gradient(180deg, rgba(${B(5)},0.95) 0%, rgba(${B(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${B(6)},0.75) 0%, rgba(${B(3)},0.92) 100%);
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
    background: rgba(${B(8)}, 0.88);
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
    background: linear-gradient(90deg, ${i}, ${s});
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
    background: linear-gradient(90deg, ${i}, ${p});
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
    background: rgba(${B(8)},0.8);
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
    background: rgba(${B(8)}, 0.9);
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

    `}function Xe(){X||(X=document.createElement("style"),X.id="netflow-overlay-styles",X.textContent=Wt(Z),document.head.appendChild(X))}function gt(t){t.innerHTML="",j.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function mt(){const t=document.getElementById("nf-terminal");if(!t)return;gt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${j.length}`)}function ht(t,e){let s="";for(let C=0;C<20;C++){const L=C/20*Math.PI*2,B=(C+.2)/20*Math.PI*2,h=(C+.5)/20*Math.PI*2,o=(C+.8)/20*Math.PI*2,m=(C+1)/20*Math.PI*2;s+=`${C===0?"M":"L"}${(120+100*Math.cos(L)).toFixed(1)},${(120+100*Math.sin(L)).toFixed(1)} `,s+=`L${(120+100*Math.cos(B)).toFixed(1)},${(120+100*Math.sin(B)).toFixed(1)} `,s+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,s+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,s+=`L${(120+100*Math.cos(m)).toFixed(1)},${(120+100*Math.sin(m)).toFixed(1)} `}s+="Z";const c=14,d=72,y=62;let E="";for(let C=0;C<c;C++){const L=C/c*Math.PI*2,B=(C+.25)/c*Math.PI*2,h=(C+.75)/c*Math.PI*2,o=(C+1)/c*Math.PI*2;E+=`${C===0?"M":"L"}${(120+y*Math.cos(L)).toFixed(1)},${(120+y*Math.sin(L)).toFixed(1)} `,E+=`L${(120+d*Math.cos(B)).toFixed(1)},${(120+d*Math.sin(B)).toFixed(1)} `,E+=`L${(120+d*Math.cos(h)).toFixed(1)},${(120+d*Math.sin(h)).toFixed(1)} `,E+=`L${(120+y*Math.cos(o)).toFixed(1)},${(120+y*Math.sin(o)).toFixed(1)} `}return E+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <circle cx="120" cy="120" r="${y}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Yt(){const t=document.createElement("div");t.id="netflow-engine-overlay",de=document.createElement("canvas"),de.id="nf-matrix-canvas",t.appendChild(de);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let u=1;u<=5;u++){const b=document.createElement("div");b.className=`nf-ambient-orb nf-orb-${u}`,t.appendChild(b)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const y=document.createElement("div");y.className="nf-pat-wave-h",t.appendChild(y);const E=document.createElement("div");E.className="nf-pat-radar",t.appendChild(E);const C=document.createElement("div");C.className="nf-pat-ripple-1",t.appendChild(C);const L=document.createElement("div");L.className="nf-pat-ripple-2",t.appendChild(L);const B=document.createElement("div");B.className="nf-pat-techscan",t.appendChild(B);const h=document.createElement("div");h.className="nf-center-glow",t.appendChild(h);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const m=document.createElement("div");m.className="nf-crt-scanlines",t.appendChild(m);const k=document.createElement("div");k.className="nf-vignette",t.appendChild(k);for(let u=0;u<3;u++){const b=document.createElement("div");b.className="nf-pulse-ring",t.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(u=>{const b=document.createElement("div");b.className=`nf-corner-deco ${u}`,t.appendChild(b)});const U=document.createElement("button");U.className="nf-stop-btn",U.innerHTML='<span class="nf-stop-icon"></span> หยุด',U.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",U.onclick=()=>{var u;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((u=chrome.runtime)!=null&&u.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(U);const A=document.createElement("div");A.className="nf-layout";const D=document.createElement("div");D.className="nf-core-monitor",D.id="nf-core-monitor";const x=document.createElement("div");x.className="nf-core-header",x.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${j.length}</div>
    `,D.appendChild(x);const g=document.createElement("div");g.className="nf-terminal",g.id="nf-terminal",gt(g),D.appendChild(g);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const I=document.createElement("div");I.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(u=>{const b=document.createElement("div");b.className=`nf-frame-corner ${u}`,I.appendChild(b)}),w.appendChild(I);const N="http://www.w3.org/2000/svg",$=document.createElementNS(N,"svg");$.setAttribute("class","nf-engine-waves"),$.setAttribute("viewBox","0 0 560 140"),$.setAttribute("preserveAspectRatio","none"),$.id="nf-engine-waves";for(let u=0;u<4;u++){const b=document.createElementNS(N,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",u<2?"1.5":"1"),b.setAttribute("stroke",u<2?`rgba(${Z.rgb},${.14+u*.1})`:`rgba(${Z.accentRgb},${.1+(u-2)*.08})`),b.setAttribute("data-wave-idx",String(u)),$.appendChild(b)}w.appendChild($);const v=document.createElement("div");v.className="nf-engine-brand-inner",v.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ht(Z.rgb,Z.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ht(Z.rgb,Z.accentRgb)}
        </div>
    `,w.appendChild(v);const R=document.createElement("div");R.className="nf-engine-stats",R.id="nf-engine-stats",R.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([u,b,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${u}</span><span class="nf-stat-val" id="${b}">${O}</span></div>`).join(""),w.appendChild(R),D.appendChild(w),A.appendChild(D);const P=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ce.forEach((u,b)=>{const O=jt(u);O.classList.add(P[b]),O.id=`nf-mod-${u.id}`,A.appendChild(O)}),t.appendChild(A);for(let u=0;u<30;u++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,H=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(re*H)}, ${Math.floor(se*H)}, ${Math.floor(le*H)}, ${O})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,t.appendChild(b)}return t}function jt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(i=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(p)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Xt(){ut=Date.now(),Fe=setInterval(()=>{const t=Math.floor((Date.now()-ut)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function bt(){Fe&&(clearInterval(Fe),Fe=null)}const Kt=120,wt=160,xt=.4;let ve=null,yt=0,vt=0,$t=0,Pe=[];function Qt(t,e){Pe=[];for(let r=0;r<Kt;r++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const p=Math.random()*t,l=Math.random()*e,s=50+Math.random()*220,c=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Pe.push({x:i===0?Math.random()*t:p+Math.cos(c)*s,y:i===0?Math.random()*e:l+Math.sin(c)*s,vx:(Math.random()-.5)*xt,vy:(Math.random()-.5)*xt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:p,oCy:l,oRadius:s,oAngle:c,oSpeed:d})}}function Zt(){if(!de)return;const t=de;if(Ie=t.getContext("2d"),!Ie)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Pe.length===0&&Qt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,i=0,p=!1;function l(){if(!Ie||!de){Se=null;return}if(Se=requestAnimationFrame(l),p=!p,p)return;const s=Ie,c=de.width,d=de.height;s.fillStyle=`rgba(${re*.04|0},${se*.04|0},${le*.06|0},1)`,s.fillRect(0,0,c,d),(!r||a!==c||i!==d)&&(a=c,i=d,r=s.createRadialGradient(c*.5,d*.5,0,c*.5,d*.5,Math.max(c,d)*.6),r.addColorStop(0,`rgba(${re*.08|0},${se*.08|0},${le*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=r,s.fillRect(0,0,c,d);const y=Pe,E=y.length,C=wt*wt;for(let h=0;h<E;h++){const o=y[h];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>c&&(o.x=c,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>d&&(o.y=d,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const m=o.oAngle,k=o.oRadius*.7;o.x=o.oCx+k*Math.cos(m),o.y=o.oCy+k*Math.sin(m)*Math.cos(m),o.oCx+=Math.sin(m*.15)*.12,o.oCy+=Math.cos(m*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const m=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*m,o.y=o.oCy+Math.sin(o.oAngle)*m,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=c+30:o.x>c+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const m=o.oRadius+50;o.oCx<-m?o.oCx=c+m:o.oCx>c+m&&(o.oCx=-m),o.oCy<-m?o.oCy=d+m:o.oCy>d+m&&(o.oCy=-m)}}s.beginPath(),s.strokeStyle=`rgba(${re},${se},${le},0.06)`,s.lineWidth=.4;const L=new Path2D;for(let h=0;h<E;h++){const o=y[h];for(let m=h+1;m<E;m++){const k=y[m],U=o.x-k.x,A=o.y-k.y,D=U*U+A*A;D<C&&(1-D/C<.4?(s.moveTo(o.x,o.y),s.lineTo(k.x,k.y)):(L.moveTo(o.x,o.y),L.lineTo(k.x,k.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${re},${se},${le},0.18)`,s.lineWidth=.8,s.stroke(L),!ve||yt!==re||vt!==se||$t!==le){ve=document.createElement("canvas");const h=48;ve.width=h,ve.height=h;const o=ve.getContext("2d"),m=o.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);m.addColorStop(0,`rgba(${re},${se},${le},0.9)`),m.addColorStop(.3,`rgba(${re},${se},${le},0.35)`),m.addColorStop(1,`rgba(${re},${se},${le},0)`),o.fillStyle=m,o.fillRect(0,0,h,h),yt=re,vt=se,$t=le}const B=ve;for(let h=0;h<E;h++){const o=y[h],m=.6+.4*Math.sin(o.pulsePhase),k=o.radius*5*(.8+m*.4);s.globalAlpha=.5+m*.4,s.drawImage(B,o.x-k/2,o.y-k/2,k,k)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<E;h++){const o=y[h];if(o.radius>2){const m=.6+.4*Math.sin(o.pulsePhase),k=o.radius*(.8+m*.4)*.35;s.moveTo(o.x+k,o.y),s.arc(o.x,o.y,k,0,Math.PI*2)}}s.fill()}l()}function Jt(){Se!==null&&(cancelAnimationFrame(Se),Se=null),de=null,Ie=null,Pe=[]}let Me=null;const Ue=560,en=140,Et=Ue/2,kt=en/2,Ct=[];for(let t=0;t<=Ue;t+=8){const e=Math.abs(t-Et)/Et;Ct.push(Math.pow(Math.min(1,e*1.6),.6))}const tn=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ue,off:t*.6,spd:.7+t*.12}));let Ke=!1;function Tt(){if(Te=requestAnimationFrame(Tt),Ke=!Ke,Ke)return;if(je+=.07,!Me){const e=document.getElementById("nf-engine-waves");if(!e){Te=null;return}Me=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Me.length;e++){const r=tn[e],a=je*r.spd+r.off;t.length=0,t.push(`M 0 ${kt}`);let i=0;for(let p=0;p<=Ue;p+=8){const l=kt+r.amp*Ct[i++]*Math.sin(p*r.freq+a);t.push(`L${p} ${l*10+.5|0}`)}Me[e].setAttribute("d",t.join(" "))}}function nn(){je=0,Tt(),Zt(),ze=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function It(){Te!==null&&(cancelAnimationFrame(Te),Te=null),ze&&(clearInterval(ze),ze=null),Me=null,Jt()}function Ge(){let t=0;const e=j.filter(d=>d.status!=="skipped").length;for(const d of j){const y=document.getElementById(`nf-proc-${d.stepId}`);if(!y)continue;y.className="nf-proc-row";const E=y.querySelector(".nf-proc-badge");switch(d.status){case"done":y.classList.add("nf-proc-done"),E&&(E.textContent="✅ done"),t++;break;case"active":y.classList.add("nf-proc-active"),E&&(E.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":y.classList.add("nf-proc-error"),E&&(E.textContent="❌ error");break;case"skipped":y.classList.add("nf-proc-skipped"),E&&(E.textContent="— skip");break;default:y.classList.add("nf-proc-waiting"),E&&(E.textContent="(queued)")}}const r=j.findIndex(d=>d.status==="active"),a=r>=0?r+1:t>=e&&e>0?j.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${j.length}`);const p=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=Z.doneHex),l&&(l.style.background=Z.doneHex,l.style.boxShadow=`0 0 8px rgba(${Z.doneRgb},0.7)`)):j.some(y=>y.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):j.some(y=>y.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=Z.hex,p.style.textShadow=`0 0 10px rgba(${Z.rgb},0.5)`);const s=document.getElementById("nf-terminal"),c=s==null?void 0:s.querySelector(".nf-proc-active");c&&s&&c.scrollIntoView({behavior:"smooth",block:"center"})}function St(){Q&&Q.isConnected||(Xe(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=ge?pt:ft,Q.title="ซ่อน/แสดง Netflow Overlay",Q.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",Q.onclick=()=>Pt(),document.body.appendChild(Q))}function Pt(){F&&(St(),ge?(F.classList.remove("nf-hidden"),F.classList.add("nf-visible"),F.style.opacity="1",F.style.pointerEvents="auto",Q&&(Q.innerHTML=ft),ge=!1):(F.classList.remove("nf-visible"),F.classList.add("nf-hidden"),F.style.opacity="0",F.style.pointerEvents="none",Q&&(Q.innerHTML=pt),ge=!0))}const Mt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function _t(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Ce;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=Mt[e]||Mt.green;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const i=Z.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Qe(t=1){if(Z=qt(),dt(),F&&F.isConnected){F.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!X||!X.isConnected)&&(X=null,Xe()),setTimeout(()=>{if(F)try{X!=null&&X.sheet&&X.sheet.cssRules.length>0&&(F.style.removeProperty("background"),F.style.removeProperty("font-family"),F.style.removeProperty("overflow"))}catch{}},200);for(const e of ce)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;ye=t,j=Ve(t),mt();for(const e of ce)Ze(e);if(He(),Ge(),!F.querySelector(".nf-stop-btn")){const e=document.createElement("button");e.className="nf-stop-btn",e.innerHTML='<span class="nf-stop-icon"></span> หยุด',e.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",e.onclick=()=>{var r;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((r=chrome.runtime)!=null&&r.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},F.appendChild(e)}ge&&Pt();return}F&&!F.isConnected&&(F=null),X&&(X.remove(),X=null),Xe();for(const e of ce)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;if(ye=t,j=Ve(t),t>1){const e=ce.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const r=ce.find(a=>a.id==="render");if(r){const a=r.steps.find(p=>p.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=r.steps.find(p=>p.id==="upscale");i&&(i.label="Full Video")}}F=Yt(),F.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(F),F.classList.add("nf-visible"),ge=!1,St(),Xt(),nn(),requestAnimationFrame(()=>_t()),setTimeout(()=>{if(F)try{X!=null&&X.sheet&&X.sheet.cssRules.length>0&&(F.style.removeProperty("background"),F.style.removeProperty("font-family"),F.style.removeProperty("overflow"))}catch{}},200)}function At(){bt(),It(),ge=!1,F&&(F.classList.add("nf-fade-out"),setTimeout(()=>{F==null||F.remove(),F=null},500)),Q&&(Q.remove(),Q=null)}const on={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function an(t,e,r){const a=j.findIndex(E=>E.status==="active"),i=j.filter(E=>E.status==="done").length,p=j.length,l=a>=0?a+1:i>=p?p:i,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${l}/${p}`);let c=1;for(const E of j)if(E.status==="active"||E.status==="done")if(E.stepId.startsWith("scene")){const C=E.stepId.match(/^scene(\d+)-/);C&&(c=Math.max(c,parseInt(C[1],10)))}else(E.stepId==="download"||E.stepId==="upscale"||E.stepId==="open")&&(c=ye);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=ye>1?`${c}/${ye}`:"1/1"),e==="active"){const E=document.getElementById("nf-stat-status"),C=on[t]||t.toUpperCase();E&&(E.textContent=C)}else if(e==="done"&&i>=p){const E=document.getElementById("nf-stat-status");E&&(E.textContent="COMPLETE")}else if(e==="error"){const E=document.getElementById("nf-stat-status");E&&(E.textContent="ERROR")}const y=document.getElementById("nf-stat-progress");y&&(r!==void 0&&r>0?y.textContent=`${Math.min(100,r)}%`:e==="active"&&(y.textContent="—"))}function T(t,e,r){if(!F)return;for(const i of ce)for(const p of i.steps)p.id===t&&(p.status=e,r!==void 0&&(p.progress=r));for(const i of j)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),an(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}He(),Ge()}function $e(t){T(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function _e(t=4e3){bt(),It(),He(),Ge(),setTimeout(()=>At(),t)}function He(){for(const t of ce){const e=t.steps.filter(c=>c.status!=="skipped").length,r=t.steps.filter(c=>c.status==="done").length,a=t.steps.some(c=>c.status==="active"),i=e>0?Math.round(r/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),i>=100?s.classList.add("nf-done"):a&&s.classList.add("nf-active"))}}function rn(t){var a,i,p,l;ye=t;const e=new Map;for(const s of j)e.set(s.stepId,{status:s.status,progress:s.progress});j=Ve(t);for(const s of j){const c=e.get(s.stepId);c&&(s.status=c.status,c.progress!==void 0&&(s.progress=c.progress))}if(mt(),t>1){const s=ce.find(c=>c.id==="video");if(s){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=s.steps.find(d=>d.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)c.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),c.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),c.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=c,Ze(s)}}const r=ce.find(s=>s.id==="render");if(r&&t>1){const s=r.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const c=r.steps.find(d=>d.id==="upscale");c&&(c.label="Full Video"),Ze(r)}He(),Ge()}function Ze(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(p)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Ae(t){t.replace(/^\[Netflow AI\]\s*/,"")}let Ee=null,me=null;const sn=new Promise(t=>{me=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(Ee=t.tabId,console.log(`[Netflow AI] Tab ID: ${Ee}`)),me&&(me(Ee),me=null)})}catch{me&&(me(null),me=null)}function pe(){return Ee?`netflow_pending_action_${Ee}`:"netflow_pending_action"}function Rt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ae(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},S=t=>{console.warn(`[Netflow AI] ${t}`);try{Ae(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};(()=>{const t=(r,a)=>{const i=r.tagName.toLowerCase(),p=r.id?`#${r.id}`:"",l=r.className&&typeof r.className=="string"?"."+r.className.trim().split(/\s+/).join("."):"",s=r.getBoundingClientRect(),c={};for(const o of r.attributes)["class","id","style"].includes(o.name)||(c[o.name]=o.value.length>80?o.value.slice(0,80)+"…":o.value);const d=(r.textContent||"").trim().slice(0,120),y=Array.from(r.querySelectorAll('i, [class*="icon"]')).map(o=>{var m;return(m=o.textContent)==null?void 0:m.trim()}).filter(Boolean).join(", "),E=[];let C=r.parentElement;for(let o=0;o<5&&C;o++){const m=C.tagName.toLowerCase(),k=C.id?`#${C.id}`:"",U=C.className&&typeof C.className=="string"?"."+C.className.trim().split(/\s+/).slice(0,2).join("."):"";E.push(`${m}${k}${U}`),C=C.parentElement}const L=a==="click"?`%c🖱️ CLICK %c<${i}${p}${l}>`:`%c👆 HOVER %c<${i}${p}${l}>`;console.groupCollapsed(L,a==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",r),console.log("Selector:",`${i}${p}${l}`),console.log("Rect:",{x:Math.round(s.x),y:Math.round(s.y),w:Math.round(s.width),h:Math.round(s.height)}),Object.keys(c).length&&console.log("Attributes:",c),d&&console.log("Text:",d),y&&console.log("Icons:",y),E.length&&console.log("Ancestors:",E.join(" > ")),console.groupEnd()};document.addEventListener("click",r=>{const a=r.target;a!=null&&a.closest("#netflow-engine-overlay")||t(a,"click")},!0);let e=null;document.addEventListener("mouseover",r=>{const a=r.target;a!==e&&(a!=null&&a.closest("#netflow-engine-overlay")||(e=a,t(a,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function Je(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?S(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){S(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function et(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){i(!1);return}i(!!(p!=null&&p.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const p of i){const l=p.src||p.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,a=0;for(const i of e){let p=i.src||"";if(!p){const c=i.querySelector("source");c&&(p=c.getAttribute("src")||"")}if(!p&&i.currentSrc&&(p=i.currentSrc),!p)continue;if(K()){r||(r=p,a=1);continue}const l=i.getBoundingClientRect(),s=l.width*l.height;l.width>50&&s>a&&(a=s,r=p)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(r);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Dt(r),r;const p=await i.blob(),l=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const s=await new Promise((c,d)=>{const y=new FileReader;y.onloadend=()=>c(y.result),y.onerror=()=>d(new Error("FileReader error")),y.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(s.length/1024/1024).toFixed(1)} MB`),await new Promise(c=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:s},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),c()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Dt(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Dt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function tt(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const nt=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ot=/Win/i.test(navigator.userAgent),Bt=nt?"🍎 Mac":ot?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Bt}`),window.__VIDEO_COMPLETE_SENT__=!1;class it extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Re=null,he=null,Ot=!1;const ke=new Map;let Nt=0;function ln(){if(Re)return Re;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Re=new Worker(URL.createObjectURL(t)),Re.onmessage=e=>{const r=ke.get(e.data);r&&(ke.delete(e.data),r())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Re}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function cn(){if(he)return he;if(Ot)return null;try{return he=chrome.runtime.connect({name:"timer"}),he.onMessage.addListener(t=>{const e=ke.get(t.id);e&&(ke.delete(t.id),e())}),he.onDisconnect.addListener(()=>{he=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),he}catch{return Ot=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new it);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return r(new it);e()}};setTimeout(i,t);const p=ln();if(p){const c=++Nt;ke.set(c,i),p.postMessage({id:c,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const l=cn();if(l){const c=++Nt;ke.set(c,i),l.postMessage({cmd:"delay",id:c,ms:t});return}const s=setTimeout(i,t);f._lastId=s});function be(){return!!window.__NETFLOW_STOP__}const K=()=>document.hidden;let Lt=0;async function we(){if(!document.hidden)return!1;const t=Date.now();if(t-Lt<15e3)return!1;Lt=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function De(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const t=Date.now();for(;document.hidden&&Date.now()-t<5e3;)await f(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function Ft(){var r;const t=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const p of t)if(i.includes(p))return((r=a.textContent)==null?void 0:r.trim())||p}}return null}function dn(t){let e=t;const r=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const l of r)e=e.replace(l,"");const a=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return e=e.split(/(?<=[.!])\s+/).filter(l=>!a.some(s=>l.includes(s))).join(" "),e=e.replace(/\s{2,}/g," ").trim(),e.length>1200&&(e=e.replace(/Render with extreme surface detail[^.]*\./gi,""),e=e.replace(/High-fidelity visual detail[^.]*\./gi,""),e=e.replace(/Product lit with soft rim light[^.]*\./gi,""),e=e.replace(/visible material texture[^.]*\./gi,""),e=e.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),e=e.replace(/AI-observed appearance:[^.]*\./gi,""),e=e.replace(/Reference clothing:[^.]*\./gi,""),e=e.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${t.length} → ${e.length} chars (${Math.round((1-e.length/t.length)*100)}% reduction)`),e}async function te(t){if(K()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await f(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await f(50),t.click()}function Be(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function pn(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let p=a,l=null,s=1/0;for(let c=0;c<20&&p&&(p=p.parentElement,!(!p||p===document.body));c++){if(K()){c>=3&&p.children.length>0&&!l&&(l=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const y=d.width*d.height;y<s&&(l=p,s=y)}}l&&!e.includes(l)&&e.push(l)}return e.sort((a,i)=>{const p=a.getBoundingClientRect(),l=i.getBoundingClientRect();return p.left-l.left}),e}function at(t=!1){const e=[],r=document.querySelectorAll("video");for(const l of r){let s=l.parentElement;for(let c=0;c<10&&s;c++){if(K()){if(c>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of a){const s=(l.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let c=l.parentElement;for(let d=0;d<10&&c;d++){if(K()){if(d>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const y=c.getBoundingClientRect();if(y.width>120&&y.height>80&&y.width<window.innerWidth*.7&&y.top>=-50&&y.left<window.innerWidth*.75){e.push({el:c,left:y.left});break}c=c.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const s=(l.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let c=l.parentElement;for(let d=0;d<10&&c;d++){if(K()){if(d>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const y=c.getBoundingClientRect();if(y.width>120&&y.height>80&&y.width<window.innerWidth*.7&&y.top>=-50&&y.left<window.innerWidth*.75){e.push({el:c,left:y.left});break}c=c.parentElement}}}const p=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(s=>s.el===l));if(p.sort((l,s)=>l.left-s.left),p.length>0){const l=p[0].el,s=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function fn(){const t=pn("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let i=0;i<10&&a;i++){if(K()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const p=a.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function un(t,e){var s;const[r,a]=t.split(","),i=((s=r.match(/:(.*?);/))==null?void 0:s[1])||"image/png",p=atob(a),l=new Uint8Array(p.length);for(let c=0;c<p.length;c++)l[c]=p.charCodeAt(c);return new File([l],e,{type:i})}function qe(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((a=i.textContent)==null?void 0:a.trim())===t){const p=i.closest("button");p&&e.push(p)}return e}function rt(){const t=[...qe("add"),...qe("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const p=(i.textContent||"").trim();if(p!=="+"&&p!=="add")continue;if(K())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,r=0;for(const a of t){const i=a.getBoundingClientRect();i.y>r&&(r=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function st(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=qe(a);let p=null,l=0;for(const s of i){const c=s.getBoundingClientRect();c.y>l&&(l=c.y,p=s)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${l.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){if(K())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const p=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(p?1e3:0);l>r&&(r=l,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function lt(){const t=document.querySelectorAll("textarea");for(const a of t)if(K()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(K()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Oe(t,e){var r,a,i,p;t.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),await f(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await f(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await f(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await f(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(s),await f(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await f(200),document.execCommand("paste"),await f(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(l){let s=t[l];for(let c=0;c<30&&s;c++){const d=s.memoizedProps,y=s.memoizedState;if((a=d==null?void 0:d.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const E=d.editor;E.selection,E.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(i=y==null?void 0:y.memoizedState)==null?void 0:i.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),y.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ne(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(K()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;if(K()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}return t}async function zt(t,e=5e3){var a,i;const r=Date.now();for(;Date.now()-r<e;){const p=t.getAttribute("aria-controls"),l=[];if(p){const s=document.getElementById(p);s&&l.push(s)}for(const s of document.querySelectorAll("[data-radix-portal]"))l.push(s);for(const s of document.querySelectorAll('[role="dialog"]'))l.push(s);for(const s of l)for(const c of s.querySelectorAll("button")){if(c===t)continue;const d=((i=(a=c.querySelector("i"))==null?void 0:a.textContent)==null?void 0:i.trim())||"",y=Array.from(c.querySelectorAll("span")).map(E=>{var C;return((C=E.textContent)==null?void 0:C.trim().toLowerCase())||""});if(d==="upload"||d==="upload_file"||y.some(E=>E==="upload image"||E==="อัปโหลดรูปภาพ"||E==="upload"))return c}await f(500)}return null}async function Vt(t,e){n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=un(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Ne();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`),n("── ขั้น 1: คลิกปุ่ม '+' (Create) ──");let i=rt();if(i||(n("ไม่พบปุ่ม '+' — รอ 2 วินาทีแล้วลองใหม่..."),await f(2e3),i=rt()),!i){n("ลองคลิกบน prompt bar area เพื่อ activate...");const l=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');l&&(l.click(),await f(1500),i=rt())}if(!i)return S("ไม่พบปุ่ม '+' บน Prompt Bar — ลอง drag-drop fallback"),await ct(r,a);i.click(),n("คลิกปุ่ม '+' (Create) ✅"),await f(1500),n("── ขั้น 2: หาและคลิกปุ่ม 'Upload image' ──");const p=await zt(i,5e3);if(!p){S("ไม่พบปุ่ม 'Upload image' ใน Dialog — ลอง pointer events บนปุ่ม '+'");const l=i.getBoundingClientRect(),s=l.left+l.width/2,c=l.top+l.height/2,d={bubbles:!0,cancelable:!0,clientX:s,clientY:c,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...d,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",d)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...d,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",d)),i.dispatchEvent(new MouseEvent("click",d)),await f(1500);const y=await zt(i,3e3);return y?await Ut(y,r,e,a):(S("❌ ไม่พบปุ่ม Upload image หลังลองทั้ง 2 วิธี — ลอง drag-drop"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500),await ct(r,a))}return await Ut(p,r,e,a)}async function Ut(t,e,r,a){var d;n("── ขั้น 3: บล็อก file dialog + คลิก Upload + ฉีดไฟล์ ──");const i=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return i.call(this)};try{t.click(),n("คลิกปุ่ม 'Upload image' ✅"),await f(800)}finally{HTMLInputElement.prototype.click=i}const p=document.querySelector('input[type="file"]');if(!p)return S("ไม่พบ file input หลังคลิก Upload — ลอง direct drag-drop"),await ct(e,a);const l=new DataTransfer;l.items.add(e),p.files=l.files,n(`ฉีดไฟล์ ${r} เข้า file input (${((d=p.files)==null?void 0:d.length)??0} ไฟล์)`);const s=p._valueTracker;s&&(s.setValue(""),n("รีเซ็ต React _valueTracker")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n("ส่ง change + input event ✅"),n("── ขั้น 4: รอยืนยันรูปย่อ ──");const c=Date.now();for(;Date.now()-c<15e3;){const y=Ne();if(y>a)return n(`✅ ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${y}`),!0;const E=document.querySelectorAll("span, div, p");for(const C of E){const L=(C.textContent||"").trim();if(/^\d{1,2}%$/.test(L)){n(`กำลังอัพโหลด: ${L}`);break}}await f(1e3)}return S(`❌ อัพโหลด ${r} ล้มเหลว — ไม่พบรูปย่อใหม่หลัง 15 วินาที`),!1}async function ct(t,e){n("── Fallback: drag-and-drop ลงบน workspace ──");const r=new DataTransfer;r.items.add(t);let a=null;const i=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const y of i){const E=y.getBoundingClientRect();if(E.width>200&&E.height>200){a=y;break}}a||(a=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const p=a.getBoundingClientRect(),l=p.left+p.width/2,s=p.top+p.height/2,c={bubbles:!0,cancelable:!0,clientX:l,clientY:s,dataTransfer:r};a.dispatchEvent(new DragEvent("dragenter",c)),await f(100),a.dispatchEvent(new DragEvent("dragover",c)),await f(100),a.dispatchEvent(new DragEvent("drop",c)),n(`ส่ง drag-drop ลง <${a.tagName}>`);const d=Date.now();for(;Date.now()-d<8e3;){if(Ne()>e)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await f(1e3)}return S("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function gn(t,e){var B;n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button, div, span, [role='button']");let a=null;for(const h of r){const o=(h.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const m=h.getBoundingClientRect();m.bottom>window.innerHeight*.7&&m.width>30&&m.height>10&&(!a||(h.textContent||"").length<(a.textContent||"").length)&&(a=h)}}if(a&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(a.textContent||"").substring(0,40).trim()}"`),!a){const h=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of h){const m=((B=o.textContent)==null?void 0:B.trim())||"";if(m.includes("crop")||m==="aspect_ratio"||m==="photo_size_select_large"){const k=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(k){const U=k.getBoundingClientRect();if(U.bottom>window.innerHeight*.7&&U.width>0){a=k,n(`พบปุ่มตั้งค่าจากไอคอน: ${m}`);break}}}}}if(!a)for(const h of r){const o=(h.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const m=h.getBoundingClientRect();if(m.bottom>window.innerHeight*.7&&m.width>30){a=h,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!a)return S("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2,s={bubbles:!0,cancelable:!0,clientX:p,clientY:l,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await f(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await f(1500);let c=!1,d=null;const y=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const h of y){const o=h.getAttribute("aria-controls")||"",m=h.id||"";if(o.toUpperCase().includes("IMAGE")||m.toUpperCase().includes("IMAGE")){d=h,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!d)for(const h of document.querySelectorAll('[role="tab"]')){const o=h.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){d=h,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!d)for(const h of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(h.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const m=h.getBoundingClientRect();if(m.width>0&&m.height>0){d=h,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(d){const h=d.getAttribute("data-state")||"",o=d.getAttribute("aria-selected")||"";if(h==="active"||o==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const m=d.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:m.left+m.width/2,clientY:m.top+m.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),d.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",k)),d.dispatchEvent(new MouseEvent("click",k)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const E=t==="horizontal"?"แนวนอน":"แนวตั้ง",C=t==="horizontal"?"landscape":"portrait";for(const h of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(h.textContent||"").trim();if(!(o.length>30)&&(o===E||o.includes(E)||o.toLowerCase()===C||o.toLowerCase().includes(C))){const m=h.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:m.left+m.width/2,clientY:m.top+m.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),h.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",k)),h.dispatchEvent(new MouseEvent("click",k)),n(`เลือกทิศทาง: ${E}`),await f(400);break}}const L=`x${e}`;for(const h of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(h.textContent||"").trim();if(!(o.length>10)&&(o===L||o===`${e}`)){const m=h.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:m.left+m.width/2,clientY:m.top+m.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",k)),await f(80),h.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",k)),h.dispatchEvent(new MouseEvent("click",k)),n(`เลือกจำนวน: ${L}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await f(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function mn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",p=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const s=Date.now()+1e4;for(;!l&&Date.now()<s;){const h=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of h){const m=(o.textContent||"").trim();if(!(m.length>80)&&(m.includes("Veo")||m.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||m.includes("arrow_drop_down")||o.querySelector("svg"))){l=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${m.substring(0,50).trim()}"`);break}}if(!l)for(const o of h){const m=(o.textContent||"").trim();if(!(m.length>80)&&(m.includes("Veo")||m.includes("veo"))){const k=o.getBoundingClientRect();if(k.width>0&&k.height>0){l=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${m.substring(0,50).trim()}"`);break}}}if(!l)for(const o of h){const m=(o.textContent||"").trim();if(!(m.length>50)&&(m.includes("Fast")||m.includes("Quality")||m.includes("เร็ว")||m.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){l=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${m.substring(0,50).trim()}"`);break}}if(!l){const o=document.querySelectorAll("div, span, button, [role='button']");for(const m of o){const k=(m.textContent||"").trim();if(k==="Veo 3.1 - Fast"||k==="Veo 3.1 - Quality"||k==="Fast"||k==="Quality"||k==="Veo 3.1 - เร็ว"||k==="Veo 3.1 - คุณภาพสูง"||k==="Veo 3.1 - คุณภาพ"||k==="Veo 2 - Fast"||k==="Veo 2 - Quality"){const U=m.getBoundingClientRect();if(U.width>0&&U.height>0){l=m,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${k}"`);break}}}}if(!l){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const m of o){const k=(m.textContent||"").trim();if(!(k.length>60)&&(k.includes("3.1")||k.includes("model")||k.includes("โมเดล"))){const U=m.getBoundingClientRect();if(U.bottom>window.innerHeight*.4&&U.width>0&&U.height>0){l=m,n(`พบปุ่ม model selector (Strategy E): "${k.substring(0,50).trim()}"`);break}}}}l||await f(1e3)}if(!l)return S("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const c=(l.textContent||"").trim();if(c.includes(e)||c.includes(r)&&!c.includes(a)||c.includes(i)&&!c.includes(p))return n(`✅ Veo quality เป็น "${c}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=l.getBoundingClientRect(),y=d.left+d.width/2,E=d.top+d.height/2,C={bubbles:!0,cancelable:!0,clientX:y,clientY:E,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",C)),await f(80),l.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",C)),l.dispatchEvent(new MouseEvent("click",C)),n("คลิกเปิด Veo quality dropdown"),await f(1e3);let L=!1;const B=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const h of B){const o=(h.textContent||"").trim();if((o===e||o===r||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const k=h.getBoundingClientRect();if(k.width>0&&k.height>0){const U=k.left+k.width/2,A=k.top+k.height/2,D={bubbles:!0,cancelable:!0,clientX:U,clientY:A,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",D)),await f(80),h.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",D)),h.dispatchEvent(new MouseEvent("click",D)),n(`✅ เลือก "${o}" สำเร็จ`),L=!0;break}}}return L?(await f(600),!0):(S(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function hn(t){var k,U,A,D;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",i=nt?"macOS":ot?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=nt?((U=(k=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:k[1])==null?void 0:U.replace(/_/g,"."))||"":ot&&((A=e.match(/Windows NT ([0-9.]+)/))==null?void 0:A[1])||"",l=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${p} | Chrome ${a}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${s} | แพลตฟอร์ม: ${Bt}`),n("══════════════════════════════════════════");try{Ye(t.theme)}catch{}try{Qe()}catch(x){console.warn("Overlay show error:",x)}const c=[],d=[];try{T("settings","active");const x=t.orientation||"horizontal",g=t.outputCount||1,w=await gn(x,g);c.push(w?"✅ Settings":"⚠️ Settings"),T("settings",w?"done":"error")}catch(x){S(`ตั้งค่าผิดพลาด: ${x.message}`),c.push("⚠️ Settings"),T("settings","error")}try{const x=t.veoQuality||"fast";await mn(x)?(c.push(`✅ Veo ${x}`),n(`✅ Veo quality: ${x}`)):(c.push("⚠️ Veo quality"),S("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(x){S(`Veo quality error: ${x.message}`),c.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const y=()=>{const x=document.querySelectorAll("span, div, p, label");for(const g of x){const w=(g.textContent||"").trim();if(/^\d{1,3}%$/.test(w)){if(w==="100%")return null;const I=g.getBoundingClientRect();if(I.width>0&&I.height>0&&I.top>0&&I.top<window.innerHeight)return w}}return null},E=async x=>{n(`รอการอัพโหลด ${x} เสร็จ...`),await f(2e3);const g=Date.now(),w=6e4;let I="",N=Date.now();const $=15e3;for(;Date.now()-g<w;){const v=y();if(v){if(v!==I)I=v,N=Date.now(),n(`กำลังอัพโหลด: ${v} — รอ...`);else if(Date.now()-N>$){n(`✅ อัพโหลด ${x} — % ค้างที่ ${v} นาน ${$/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{n(`✅ อัพโหลด ${x} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}S(`⚠️ อัพโหลด ${x} หมดเวลาหลัง ${w/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){T("upload-char","active");try{const x=await Vt(t.characterImage,"character.png");c.push(x?"✅ ตัวละคร":"⚠️ ตัวละคร"),x||d.push("character upload failed"),T("upload-char",x?"done":"error")}catch(x){S(`อัพโหลดตัวละครผิดพลาด: ${x.message}`),c.push("❌ ตัวละคร"),d.push("character upload error"),T("upload-char","error")}await E("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else $e("upload-char");if(t.productImage){T("upload-prod","active");try{const x=await Vt(t.productImage,"product.png");c.push(x?"✅ สินค้า":"⚠️ สินค้า"),x||d.push("product upload failed"),T("upload-prod",x?"done":"error")}catch(x){S(`อัพโหลดสินค้าผิดพลาด: ${x.message}`),c.push("❌ สินค้า"),d.push("product upload error"),T("upload-prod","error")}await E("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else $e("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const C=y();C&&(n(`⚠️ อัพโหลดยังแสดง ${C} — รอเพิ่มเติม...`),await E("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const L=(t.characterImage?1:0)+(t.productImage?1:0);if(L>0){let x=Ne();x<L&&(n(`⏳ เห็นรูปย่อแค่ ${x}/${L} — รอ 3 วินาที...`),await f(3e3),x=Ne()),x>=L?n(`✅ ยืนยันรูปย่ออ้างอิง: ${x}/${L}`):S(`⚠️ คาดว่าจะมี ${L} รูปย่อ แต่พบ ${x} — ดำเนินการต่อ`)}if(be()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{_e(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),T("img-prompt","active"),await f(1e3);const B=lt();B?(await Oe(B,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),T("img-prompt","done")):(S("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),d.push("prompt input not found"),T("img-prompt","error")),await f(800);const h=new Set;document.querySelectorAll("img").forEach(x=>{x.src&&h.add(x.src)}),n(`บันทึกรูปเดิม: ${h.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),T("img-generate","active"),await f(500);const o=st();if(o){const x=o.getBoundingClientRect(),g=x.left+x.width/2,w=x.top+x.height/2,I={bubbles:!0,cancelable:!0,clientX:g,clientY:w,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",I)),await f(80),o.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",I)),o.dispatchEvent(new MouseEvent("click",I)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await f(500),o.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",I)),await f(80),o.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",I)),o.dispatchEvent(new MouseEvent("click",I)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),T("img-generate","done")}else S("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),d.push("generate button not found"),T("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),T("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const x=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const v of $){if(v.closest("#netflow-engine-overlay"))continue;const R=(v.textContent||"").trim();if(R.length>10)continue;const P=R.match(/(\d{1,3})\s*%/);if(!P)continue;const u=parseInt(P[1],10);if(u<1||u>100)continue;if(K())return u;const b=v.getBoundingClientRect();if(!(b.width===0||b.width>150)&&!(b.top<0||b.top>window.innerHeight))return u}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let g=null,w=-1,I=0;const N=Date.now();for(;!g&&Date.now()-N<18e4;){const $=document.querySelectorAll("img");for(const v of $){if(h.has(v.src)||!(v.alt||"").toLowerCase().includes("generated"))continue;if(K()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const u=v.getBoundingClientRect();return u.width>120&&u.height>120&&u.top>0&&u.top<window.innerHeight*.85})()){const u=v.closest("div");if(u){g=u,n(`พบรูป AI จาก alt="${v.alt}": ${v.src.substring(0,80)}...${K()?" (hidden-mode)":""}`);break}}}if(!g)for(const v of $){if(h.has(v.src))continue;const R=v.closest("div"),P=(R==null?void 0:R.textContent)||"";if(P.includes("product.png")||P.includes("character.png")||P.includes(".png")||P.includes(".jpg"))continue;if(K()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const b=v.getBoundingClientRect();return b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85})()){const b=v.closest("div");if(b){g=b,n(`พบรูปใหม่ (สำรอง): ${v.src.substring(0,80)}...${K()?" (hidden-mode)":""}`);break}}}if(!g){if(be()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const v=I>0?Date.now()-I:1/0;if(w<20||v>3e4){const P=Ft();if(P){S(`❌ สร้างรูปล้มเหลว: ${P}`),d.push(`image gen failed: ${P}`),T("img-wait","error");break}}const R=x();if(R!==null)R!==w&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${R}%`),w=R,T("img-wait","active",R)),I=Date.now();else if(w>30){const P=Math.floor((Date.now()-I)/1e3);P>=3&&n(`🖼️ % หายที่ ${w}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&P>=5&&w>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await De(),await f(3e3))}document.hidden&&w>0&&Date.now()-I>1e4&&await we(),document.hidden&&w<1&&Date.now()-N>3e4&&await we(),await f(3e3)}}if(!g)S("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),T("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),T("img-wait","done",100),await De();const $=g.getBoundingClientRect(),v=$.left+$.width/2,R=$.top+$.height/2,P={bubbles:!0,cancelable:!0,clientX:v,clientY:R};g.dispatchEvent(new PointerEvent("pointerenter",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseenter",P)),g.dispatchEvent(new PointerEvent("pointerover",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseover",P)),g.dispatchEvent(new PointerEvent("pointermove",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousemove",P)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let u=null;for(const b of["more_vert","more_horiz","more"]){const O=qe(b);for(const H of O){const M=H.getBoundingClientRect();if(M.top>=$.top-20&&M.top<=$.bottom&&M.right>=$.right-150&&M.right<=$.right+20){u=H;break}}if(u)break}if(!u){const b=document.querySelectorAll("button");for(const O of b){const H=O.getBoundingClientRect();if(H.width<50&&H.height<50&&H.top>=$.top-10&&H.top<=$.top+60&&H.left>=$.right-80){const M=O.querySelectorAll("i");for(const q of M)if((((D=q.textContent)==null?void 0:D.trim())||"").includes("more")){u=O;break}if(u)break;const z=O.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){u=O;break}}}}if(!u)S("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const b=u.getBoundingClientRect(),O=b.left+b.width/2,H=b.top+b.height/2,M={bubbles:!0,cancelable:!0,clientX:O,clientY:H,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",M)),await f(80),u.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",M)),u.dispatchEvent(new MouseEvent("click",M)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let z=null;const q=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const V of q){const W=(V.textContent||"").trim();if(W.includes("ทำให้เป็นภาพเคลื่อนไหว")||W.includes("Animate")||W.includes("animate")){z=V;break}}if(!z)S("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const V=z.getBoundingClientRect(),W=V.left+V.width/2,J=V.top+V.height/2,ne={bubbles:!0,cancelable:!0,clientX:W,clientY:J,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...ne,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",ne)),await f(80),z.dispatchEvent(new PointerEvent("pointerup",{...ne,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",ne)),z.dispatchEvent(new MouseEvent("click",ne)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),T("animate","done"),await f(3e3)}}}}catch(x){S(`ขั้น 4 ผิดพลาด: ${x.message}`),c.push("⚠️ Animate")}if(be()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{_e(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),T("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let x=!1;const g=document.querySelectorAll("button, span, div");for(const $ of g){const v=($.textContent||"").trim(),R=$.getBoundingClientRect();if((v==="วิดีโอ"||v==="Video"||v.includes("วิดีโอ"))&&R.bottom>window.innerHeight*.7){x=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}x||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let w=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(v=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>v())),w=!0;const $=Date.now();for(;document.hidden&&Date.now()-$<5e3;)await f(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let I=!1;for(let $=1;$<=5&&!I;$++){if($>1&&document.hidden){n(`🔄 Retry ${$}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),w=!0;const P=Date.now();for(;document.hidden&&Date.now()-P<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const v=lt();if(!v){n(`⚠️ ครั้งที่ ${$}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}$>1&&(v.focus(),await f(500)),await Oe(v,t.videoPrompt),await f(500);const R=(v.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();R.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${$} (${R.length} ตัวอักษร)`),c.push("✅ Video Prompt"),T("vid-prompt","done"),I=!0):(n(`⚠️ ครั้งที่ ${$}: Prompt ไม่ถูกวาง (ได้ ${R.length} ตัวอักษร)`),await f(1500))}if(!I)throw S("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),c.push("❌ Video Prompt"),d.push("video prompt paste failed after 5 attempts"),T("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),T("vid-generate","active");const N=st();if(N){const $=N.getBoundingClientRect(),v=$.left+$.width/2,R=$.top+$.height/2,P={bubbles:!0,cancelable:!0,clientX:v,clientY:R,button:0};N.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mousedown",P)),await f(80),N.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mouseup",P)),N.dispatchEvent(new MouseEvent("click",P)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),T("vid-generate","done"),await f(500),N.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mousedown",P)),await f(80),N.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mouseup",P)),N.dispatchEvent(new MouseEvent("click",P)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else S("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),d.push("video generate button not found"),T("vid-generate","error");if(w){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(x){S(`ขั้น 5 ผิดพลาด: ${x.message}`),c.push("⚠️ Video Gen"),d.push(`video gen error: ${x.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),$e("animate"),$e("vid-prompt"),$e("vid-generate"),$e("vid-wait");if(t.videoPrompt){T("vid-wait","active");const x=t.sceneCount||1,g=t.videoScenePrompts||[t.videoPrompt];if(x>1)try{rn(x)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${x>1?`ต่อ ${x} ฉาก`:"ดาวน์โหลด"} ===`);const w=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const v of $){if(v.closest("#netflow-engine-overlay"))continue;const R=(v.textContent||"").trim();if(R.length>10)continue;const P=R.match(/(\d{1,3})\s*%/);if(!P)continue;const u=parseInt(P[1],10);if(u<1||u>100)continue;if(K())return u;const b=v.getBoundingClientRect();if(!(b.width===0||b.width>150)&&!(b.top<0||b.top>window.innerHeight))return u}return null},I=async($=6e5)=>{n("รอการสร้างวิดีโอ..."),T("vid-wait","active"),await f(5e3);const v=()=>{const _=document.querySelectorAll("div, span, p, label, strong, small");let G=0;for(const Y of _){if(Y.closest("#netflow-engine-overlay"))continue;const ee=(Y.textContent||"").trim();if(ee.includes("%")&&ee.length<15){const oe=Y.tagName.toLowerCase(),ie=Y.className&&typeof Y.className=="string"?Y.className.split(/\s+/).slice(0,2).join(" "):"",ae=Y.getBoundingClientRect();if(n(`  🔍 "${ee}" ใน <${oe}.${ie}> ที่ (${ae.left.toFixed(0)},${ae.top.toFixed(0)}) w=${ae.width.toFixed(0)}`),G++,G>=5)break}}G===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},R=async(_,G)=>{n(`🔄 Policy Retry ${G}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await De(),await f(2e3);const Y=lt();if(!Y)return S("❌ Retry: ไม่พบช่อง Prompt"),!1;Y.focus(),await f(300);const ee=window.getSelection();ee&&ee.selectAllChildren(Y),await f(200),Y.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),Y.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await f(500);let oe=dn(_);G>=2&&(oe=oe.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${oe.length} chars)`)),await Oe(Y,oe),await f(500);const ie=(Y.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(ie.length<20)return S(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${ie.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${ie.length} ตัวอักษร)`),await f(500);const ae=st();if(!ae)return S("❌ Retry: ไม่พบปุ่ม Generate"),!1;const We=ae.getBoundingClientRect(),wn=We.left+We.width/2,xn=We.top+We.height/2,Le={bubbles:!0,cancelable:!0,clientX:wn,clientY:xn,button:0};return ae.dispatchEvent(new PointerEvent("pointerdown",{...Le,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ae.dispatchEvent(new MouseEvent("mousedown",Le)),await f(80),ae.dispatchEvent(new PointerEvent("pointerup",{...Le,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ae.dispatchEvent(new MouseEvent("mouseup",Le)),ae.dispatchEvent(new MouseEvent("click",Le)),n(`✅ คลิก Generate สำหรับ Safe Retry ${G}`),await f(5e3),!0},P=at();n(P?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const u=Date.now();let b=-1,O=0,H=!1,M=0;const z=2;for(;Date.now()-u<$;){const _=w();if(_!==null){if(_!==b&&(n(`ความคืบหน้าวิดีโอ: ${_}%`),b=_,T("vid-wait","active",_)),O=Date.now(),_>=100){n("✅ ตรวจพบ 100%!"),H=!0;break}}else if(b>30){const G=Math.floor((Date.now()-O)/1e3);if(G>=5){n(`✅ % หายไปที่ ${b}% (หาย ${G} วินาที) — วิดีโอเสร็จ!`),H=!0;break}n(`⏳ % หายที่ ${b}% — ยืนยันใน ${5-G} วินาที...`)}else{const G=Math.floor((Date.now()-u)/1e3);G%15<3&&n(`⏳ รอ... (${G} วินาที) ไม่พบ %`)}if(!H&&b>0&&at(!0)&&!P){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${b}% — วิดีโอเสร็จ!`),H=!0;break}if(be())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(b<1){const G=Ft();if(G){if(S(`❌ สร้างวิดีโอล้มเหลว: ${G}`),M<z&&t.videoPrompt)if(M++,n(`🔄 Policy violation detected — attempting safe retry ${M}/${z}...`),await R(t.videoPrompt,M)){b=-1,O=0,n(`✅ Safe retry ${M} started — continuing to monitor...`);continue}else S(`❌ Safe retry ${M} failed to start`);return null}}document.hidden&&b>0&&Date.now()-O>1e4&&await we(),document.hidden&&b<1&&Date.now()-u>3e4&&await we(),await f(3e3)}await De();let q=null;for(let _=1;_<=10&&(q=at(),!q);_++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${_}/10)`),_%3===0&&await De(),await f(3e3);if(!q)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),T("vid-wait","error"),null;const V=q;H?(T("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const W=V.getBoundingClientRect();let J=W.left+W.width/2,ne=W.top+W.height/2,ue=V;const xe=V.querySelector("video, img, canvas");if(xe){const _=xe.getBoundingClientRect();_.width>50&&_.height>50&&(J=_.left+_.width/2,ne=_.top+_.height/2,ue=xe,n(`🎯 พบรูปย่อ <${xe.tagName.toLowerCase()}> ในการ์ดที่ (${J.toFixed(0)},${ne.toFixed(0)}) ${_.width.toFixed(0)}x${_.height.toFixed(0)}`))}else ne=W.top+W.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${J.toFixed(0)},${ne.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${J.toFixed(0)}, ${ne.toFixed(0)})...`),Be(ue);for(let _=0;_<8;_++){const G={bubbles:!0,cancelable:!0,clientX:J+_%2,clientY:ne};ue.dispatchEvent(new PointerEvent("pointermove",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ue.dispatchEvent(new MouseEvent("mousemove",G)),await f(500)}try{chrome.storage.local.set({[pe()]:{timestamp:Date.now(),action:"mute_video",sceneCount:x,scenePrompts:g,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${x} ฉาก, ${g.length} prompts, theme: ${t.theme})`)}catch(_){n(`⚠️ ไม่สามารถบันทึก pending action: ${_.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await N(ue),n("✅ คลิกการ์ดวิดีโอเสร็จ"),V},N=async $=>{const v=$.getBoundingClientRect(),R=v.left+v.width/2,P=v.top+v.height/2,u={bubbles:!0,cancelable:!0,clientX:R,clientY:P,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),$.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",u)),$.dispatchEvent(new MouseEvent("click",u)),await f(50),$.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await I())S("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),T("vid-wait","error");else{c.push("✅ Video Complete"),T("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const v=await new Promise(R=>{chrome.storage.local.get(pe(),P=>{if(chrome.runtime.lastError){R(null);return}R((P==null?void 0:P[pe()])||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(pe()),v.action==="mute_video"?await Gt(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await Ht(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch($){S(`ขั้น 6 ผิดพลาด: ${$.message}`),c.push("⚠️ Step6"),d.push(`step 6: ${$.message}`)}}const m=d.length===0;try{_e(m?5e3:8e3)}catch(x){console.warn("Overlay complete error:",x)}return{success:m,message:m?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${d.join(", ")}`,step:m?"done":"partial"}}async function Gt(t,e=[],r){var U;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Ye(r)}catch{}try{Qe(t)}catch(A){n(`⚠️ showOverlay error: ${A.message}`)}try{const A=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const D of A)T(D,"done");t>=2&&T("scene2-prompt","active"),n(`✅ overlay restored: ${A.length} steps done, sceneCount=${t}`)}catch(A){n(`⚠️ overlay restore error: ${A.message}`)}await f(1500);const a=(()=>{for(const A of document.querySelectorAll("button")){const D=A.querySelectorAll("i");for(const g of D){const w=(g.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const I=A.getBoundingClientRect();if(I.width>0&&I.height>0)return A}}const x=(A.getAttribute("aria-label")||"").toLowerCase();if(x.includes("mute")||x.includes("ปิดเสียง")){const g=A.getBoundingClientRect();if(g.width>0&&g.height>0)return A}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let u=2;u<=t;u++){const b=e[u-1];if(!b){S(`ไม่พบ prompt สำหรับฉากที่ ${u}`);continue}n(`── ฉากที่ ${u}/${t}: วาง prompt + generate ──`);let O=null;const H=Date.now();for(;!O&&Date.now()-H<1e4;){const _=document.querySelectorAll("[data-slate-editor='true']");if(_.length>0&&(O=_[_.length-1]),!O){const G=document.querySelectorAll("[role='textbox'][contenteditable='true']");G.length>0&&(O=G[G.length-1])}O||await f(1e3)}if(!O){S("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${O.tagName.toLowerCase()}> ${O.className.substring(0,40)}`),await Oe(O,b),n(`วาง prompt ฉาก ${u} (${b.length} ตัวอักษร) ✅`);try{T(`scene${u}-prompt`,"done"),T(`scene${u}-gen`,"active")}catch{}await f(1e3);const M=O.getBoundingClientRect();let z=null,q=1/0;for(const _ of document.querySelectorAll("button")){if(_.disabled)continue;const G=_.querySelectorAll("i");let Y=!1;for(const ie of G)if((ie.textContent||"").trim()==="arrow_forward"){Y=!0;break}if(!Y)continue;const ee=_.getBoundingClientRect();if(ee.width<=0||ee.height<=0)continue;const oe=Math.abs(ee.top-M.top)+Math.abs(ee.right-M.right);oe<q&&(q=oe,z=_)}if(!z)for(const _ of document.querySelectorAll("button")){const G=_.querySelectorAll("i");for(const Y of G)if((Y.textContent||"").trim()==="arrow_forward"){const ee=_.getBoundingClientRect();if(ee.width>0&&ee.height>0){z=_;break}}if(z)break}if(!z){S("ไม่พบปุ่ม Generate/Send");return}await new Promise(_=>{chrome.storage.local.set({[pe()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:u,scenePrompts:e}},()=>_())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${u}/${t})`),await te(z),n(`คลิก Generate ฉาก ${u} ✅`);try{T(`scene${u}-gen`,"done"),T(`scene${u}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${u} gen เสร็จ ──`),await f(5e3);let V=0,W=0;const J=Date.now(),ne=6e5,ue=5e3;let xe=!1;for(;Date.now()-J<ne;){let _=null;const G=document.querySelectorAll("div, span, p, label, strong, small");for(const Y of G){if(Y.closest("#netflow-engine-overlay"))continue;const oe=(Y.textContent||"").trim().match(/^(\d{1,3})%$/);if(oe){const ie=Y.getBoundingClientRect();if(ie.width>0&&ie.height>0&&ie.width<120&&ie.height<60){_=parseInt(oe[1],10);break}}}if(_!==null){if(_!==V){n(`🎬 ฉาก ${u} ความคืบหน้า: ${_}%`),V=_;try{T(`scene${u}-wait`,"active",_)}catch{}}W=0}else if(V>0){if(W===0)W=Date.now(),n(`🔍 ฉาก ${u}: % หายไป (จาก ${V}%) — กำลังยืนยัน...`);else if(Date.now()-W>=ue){n(`✅ ฉาก ${u}: % หายไป ${ue/1e3} วินาที — เจนเสร็จ!`),xe=!0;break}}if(be()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&V>0&&W===0&&await we(),await f(2e3)}xe||S(`ฉาก ${u} หมดเวลา`),n(`✅ ฉาก ${u} เสร็จแล้ว`);try{T(`scene${u}-wait`,"done",100)}catch{}chrome.storage.local.remove(pe()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{T("download","active")}catch{}let A=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),A=!0,await f(5e3)}catch{}}await f(2e3);const D=Date.now();let x=null;const g=Date.now();for(;!x&&Date.now()-g<1e4;){for(const u of document.querySelectorAll("button")){const b=u.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const O=u.getBoundingClientRect();if(O.width>0&&O.height>0){x=u;break}}}x||await f(1e3)}if(!x){if(S("ไม่พบปุ่มดาวน์โหลด"),A)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await te(x),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await f(1500);let w=null;for(let u=0;u<3&&!w;u++){u>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`),x.isConnected&&(await te(x),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(2e3)));let b=null;const O=Date.now();for(;!b&&Date.now()-O<5e3;){for(const M of document.querySelectorAll("[role='menuitem']"))if((M.textContent||"").trim().includes("Full Video")){const q=M.getBoundingClientRect();if(q.width>0&&q.height>0){b=M;break}}b||await f(500)}if(!b){S("ไม่พบ Full Video");continue}Be(b),await f(500),await te(b),n("คลิก/hover Full Video ✅"),await f(2e3);const H=Date.now();for(;!w&&Date.now()-H<8e3;){for(const M of document.querySelectorAll("button[role='menuitem'], div[role='menuitem'] button")){const z=M.querySelectorAll("span");for(const q of z)if((q.textContent||"").trim()==="720p"){const V=M.getBoundingClientRect();if(V.width>0&&V.height>0){w=M;break}}if(w)break}w||(b.isConnected&&Be(b),await f(500))}}if(!w){if(S("ไม่พบ 720p"),A)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await te(w),n("คลิก 720p ✅"),A){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const I=Date.now();let N=!1,$=!1;for(;Date.now()-I<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(u.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),N=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&($||($=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(N)break;if($){let u=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),N=!0;break}}if(be()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!N){S("เตรียมไฟล์หมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let v=!1;const R=Date.now();for(;Date.now()-R<6e4&&!v;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},b=>{chrome.runtime.lastError?S(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),v=!0,b.downloadUrl&&(i=b.downloadUrl,n(`[TikTok] จะใช้ download URL: ${b.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-R)/1e3)}s)`),u()})})}catch(u){S(`ตรวจสอบผิดพลาด: ${u.message}`)}v||await f(3e3)}v||S("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const P=await et();i||(i=P);try{T("open","done"),_e(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),tt(i),Je(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await f(2e3);const p=(A,D="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const x of document.querySelectorAll(D)){const g=(x.textContent||"").trim();if(g.includes(A)&&g.length<100){const w=x.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return x}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const s=Date.now();for(;!l&&Date.now()-s<1e4;){for(const A of document.querySelectorAll("button, [role='button']")){const D=(A.textContent||"").trim(),x=D.toLowerCase();if((x.includes("download")||x.includes("ดาวน์โหลด"))&&D.length<80){const g=A.getBoundingClientRect();if(g.width>0&&g.height>0){l=A;break}}}if(!l)for(const A of document.querySelectorAll("button")){const D=(A.getAttribute("aria-label")||"").toLowerCase();if(D.includes("download")||D.includes("ดาวน์")){const x=A.getBoundingClientRect();if(x.width>0&&x.height>0){l=A;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!l){S("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await te(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(1500);const c=Date.now();let d=null;const y=Date.now();for(;!d&&Date.now()-y<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await f(500));if(!d){S("ไม่พบ 1080p");return}await te(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const E=Date.now();let C=!1,L=!1,B=0;const h=3e3;for(;Date.now()-E<3e5;){const D=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(D.includes("upscaling complete")||D.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),C=!0;break}for(const g of document.querySelectorAll("div, span, p")){const w=(g.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(U=g.textContent)==null?void 0:U.trim()}")`),C=!0;break}}if(C)break;if(D.includes("upscaling your video")||D.includes("กำลังอัปสเกล")){L=!0,B=0;const g=Math.floor((Date.now()-E)/1e3);n(`⏳ กำลังอัปสเกล... (${g} วินาที)`)}else if(L){if(B===0)B=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-B>=h){n(`✅ ข้อความ Upscaling หายไป ${h/1e3} วินาที — เสร็จ!`),C=!0;break}}else{const g=Math.floor((Date.now()-E)/1e3);g%10<3&&n(`⏳ รอ Upscale... (${g} วินาที)`)}if(be()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!C){S("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let o=!1;const m=Date.now();for(;Date.now()-m<6e4&&!o;){try{await new Promise(A=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},D=>{chrome.runtime.lastError?S(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):D!=null&&D.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${D.message}`),o=!0,D.downloadUrl&&(i=D.downloadUrl,n(`[TikTok] จะใช้ download URL: ${D.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-m)/1e3)}s)`),A()})})}catch(A){S(`ตรวจสอบผิดพลาด: ${A.message}`)}o||await f(3e3)}o||S("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const k=await et();i||(i=k),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),tt(i),Je(2e3)}async function Ht(t=2,e=2,r,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Ye(r)}catch{}try{Qe(t)}catch(g){n(`⚠️ showOverlay error: ${g.message}`)}try{const g=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)g.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&g.push(`scene${w}-wait`);for(const w of g)T(w,"done");T(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${g.length} steps done (scene ${e}/${t} navigate)`)}catch(g){n(`⚠️ overlay restore error: ${g.message}`)}await f(2e3);const i=(()=>{for(const g of document.querySelectorAll("button")){const w=g.querySelectorAll("i");for(const I of w){const N=(I.textContent||"").trim();if(N==="volume_up"||N==="volume_off"||N==="volume_mute"){const $=g.getBoundingClientRect();if($.width>0&&$.height>0)return g}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,l=0;const s=Date.now(),c=6e5,d=5e3;let y=!1,E=0;for(;Date.now()-s<c;){let g=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const I of w){if(I.closest("#netflow-engine-overlay"))continue;const $=(I.textContent||"").trim().match(/^(\d{1,3})%$/);if($){const v=I.getBoundingClientRect();if(v.width>0&&v.height>0&&v.width<120&&v.height<60){g=parseInt($[1],10);break}}}if(g!==null){if(E=0,g!==p){n(`🎬 scene ${e} ความคืบหน้า: ${g}%`),p=g;try{T(`scene${e}-wait`,"active",g)}catch{}}l=0}else if(p>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-l>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),y=!0;break}}else if(E++,E>=15){const I=document.querySelectorAll("video");let N=!1;for(const $ of I)if($.readyState>=2&&!$.paused&&$.getBoundingClientRect().width>200){N=!0;break}if(N){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),y=!0;break}if(E>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),y=!0;break}}document.hidden&&p>0&&l===0&&await we(),await f(2e3)}y||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{T(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let g=e+1;g<=t;g++){const w=a[g-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${g} — ข้าม`);continue}n(`── ฉากที่ ${g}/${t}: วาง prompt + generate (pending recovery) ──`);let I=null;const N=Date.now();for(;!I&&Date.now()-N<1e4;){const M=document.querySelectorAll("[data-slate-editor='true']");if(M.length>0&&(I=M[M.length-1]),!I){const z=document.querySelectorAll("[role='textbox'][contenteditable='true']");z.length>0&&(I=z[z.length-1])}I||await f(1e3)}if(!I){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${g}`);break}await Oe(I,w),n(`วาง prompt ฉาก ${g} (${w.length} ตัวอักษร) ✅`);try{T(`scene${g}-prompt`,"done"),T(`scene${g}-gen`,"active")}catch{}await f(1e3);const $=I.getBoundingClientRect();let v=null,R=1/0;for(const M of document.querySelectorAll("button")){if(M.disabled)continue;const z=M.querySelectorAll("i");let q=!1;for(const J of z)if((J.textContent||"").trim()==="arrow_forward"){q=!0;break}if(!q)continue;const V=M.getBoundingClientRect();if(V.width<=0||V.height<=0)continue;const W=Math.abs(V.top-$.top)+Math.abs(V.right-$.right);W<R&&(R=W,v=M)}if(!v)for(const M of document.querySelectorAll("button")){const z=M.querySelectorAll("i");for(const q of z)if((q.textContent||"").trim()==="arrow_forward"){const V=M.getBoundingClientRect();if(V.width>0&&V.height>0){v=M;break}}if(v)break}if(!v){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${g}`);break}await new Promise(M=>{chrome.storage.local.set({[pe()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:g,scenePrompts:a}},()=>M())}),await te(v),n(`คลิก Generate ฉาก ${g} ✅`);try{T(`scene${g}-gen`,"done"),T(`scene${g}-wait`,"active")}catch{}await f(5e3);let P=0,u=0;const b=Date.now();let O=!1,H=0;for(;Date.now()-b<6e5;){let M=null;const z=document.querySelectorAll("div, span, p, label, strong, small");for(const q of z){if(q.closest("#netflow-engine-overlay"))continue;const W=(q.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const J=q.getBoundingClientRect();if(J.width>0&&J.height>0&&J.width<120&&J.height<60){M=parseInt(W[1],10);break}}}if(M!==null){if(H=0,M!==P){n(`🎬 ฉาก ${g} ความคืบหน้า: ${M}%`),P=M;try{T(`scene${g}-wait`,"active",M)}catch{}}u=0}else if(P>0){if(u===0)u=Date.now();else if(Date.now()-u>=5e3){n(`✅ ฉาก ${g}: เจนเสร็จ!`),O=!0;break}}else if(H++,H>=15){const q=document.querySelectorAll("video");let V=!1;for(const W of q)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){V=!0;break}if(V){n(`✅ ฉาก ${g}: พบวิดีโอเล่นอยู่ — เสร็จ`),O=!0;break}if(H>=30){n(`✅ ฉาก ${g}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),O=!0;break}}document.hidden&&P>0&&u===0&&await we(),await f(2e3)}O||n(`⚠️ ฉาก ${g} หมดเวลา`);try{T(`scene${g}-wait`,"done",100)}catch{}n(`✅ ฉาก ${g} เสร็จแล้ว`),chrome.storage.local.remove(pe()),await f(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let C=null;try{T("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const L=Date.now();let B=null;const h=Date.now();for(;!B&&Date.now()-h<1e4;){for(const g of document.querySelectorAll("button")){const w=g.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const I=g.getBoundingClientRect();if(I.width>0&&I.height>0){B=g;break}}}B||await f(1e3)}if(!B){S("ไม่พบปุ่มดาวน์โหลด");return}await te(B),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await f(1500);let o=null;for(let g=0;g<3&&!o;g++){g>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${g+1}...`),B.isConnected&&(await te(B),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(2e3)));let w=null;const I=Date.now();for(;!w&&Date.now()-I<5e3;){for(const $ of document.querySelectorAll("[role='menuitem']"))if(($.textContent||"").trim().includes("Full Video")){const R=$.getBoundingClientRect();if(R.width>0&&R.height>0){w=$;break}}w||await f(500)}if(!w){S("ไม่พบ Full Video");continue}Be(w),await f(500),await te(w),n("คลิก/hover Full Video ✅"),await f(2e3);const N=Date.now();for(;!o&&Date.now()-N<8e3;){for(const $ of document.querySelectorAll("button[role='menuitem'], div[role='menuitem'] button")){const v=$.querySelectorAll("span");for(const R of v)if((R.textContent||"").trim()==="720p"){const P=$.getBoundingClientRect();if(P.width>0&&P.height>0){o=$;break}}if(o)break}o||(w.isConnected&&Be(w),await f(500))}}if(!o){S("ไม่พบ 720p");return}await te(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const m=Date.now();let k=!1,U=!1;for(;Date.now()-m<3e5;){for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(g.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),k=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(U||(U=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(k)break;if(U){let g=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){g=!0;break}if(!g){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),k=!0;break}}await f(2e3)}if(!k){S("เตรียมไฟล์หมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let A=!1;const D=Date.now();for(;Date.now()-D<6e4&&!A;){try{await new Promise(g=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:L},w=>{chrome.runtime.lastError?S(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),A=!0,w.downloadUrl&&(C=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-D)/1e3)}s)`),g()})})}catch(g){S(`ตรวจสอบผิดพลาด: ${g.message}`)}A||await f(3e3)}A||S("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const x=await et();C||(C=x);try{T("open","done"),_e(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),tt(C),Je(2e3)}async function bn(){try{await sn;const t=pe();let e=await new Promise(l=>{chrome.storage.local.get(t,s=>{if(chrome.runtime.lastError){l(null);return}l((s==null?void 0:s[t])||null)})});if(!e&&Ee){const l="netflow_pending_action";e=await new Promise(s=>{chrome.storage.local.get(l,c=>{if(chrome.runtime.lastError){s(null);return}s((c==null?void 0:c[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await f(300),!await new Promise(l=>{chrome.storage.local.get(t,s=>{const c=s==null?void 0:s[t];l((c==null?void 0:c._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await Gt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ht(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),hn(t).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),Rt()}).catch(a=>{if(a instanceof it||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{At()}catch{}}else console.error("[Netflow AI] Generate error:",a);Rt()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const a=fn();if(!a){S("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const c=document.elementFromPoint(p,l);c?(await te(c),n(`คลิก ${s+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await te(a),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),bn()})();
