(function(){"use strict";const ce={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Q=ce.green,we=null;function Ne(t){t&&ce[t]&&(we=t,Q=ce[t],Ke(),requestAnimationFrame(()=>ht()))}function It(){if(we&&ce[we])return ce[we];try{const t=localStorage.getItem("netflow_app_theme");if(t&&ce[t])return ce[t]}catch{}return ce.green}let oe=0,ie=255,ae=65;function Ke(){const t=Q.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(oe=parseInt(t[1],16),ie=parseInt(t[2],16),ae=parseInt(t[3],16))}const Qe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Je='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let j=null,J=null,de=null,Ze=0,Se=null,xe=null,Pe=null,Oe=0,pe=!1,le=null,ve=null,ye=null,$e=1,K=[];function ze(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let i=2;i<=t;i++)e.push({stepId:`scene${i}-prompt`,label:`ฉาก ${i} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${i}-gen`,label:`ฉาก ${i} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${i}-wait`,label:`ฉาก ${i} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const fe=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];K=ze(1);function Mt(t){const e=t.rgb,i=t.accentRgb,o=t.doneRgb,a=t.hex,p=t.accentHex,c=t.doneHex,s=(()=>{const $=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!$)return"#4ade80";const r=C=>Math.min(255,C+80);return`#${[1,2,3].map(C=>r(parseInt($[C],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const $=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!$)return"#4ade80";const r=C=>Math.min(255,C+60);return`#${[1,2,3].map(C=>r(parseInt($[C],16)).toString(16).padStart(2,"0")).join("")}`})(),d=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),m=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,w=d?parseInt(d[1],16)/m:0,P=d?parseInt(d[2],16)/m:1,N=d?parseInt(d[3],16)/m:.25,R=$=>`${Math.round(w*$)}, ${Math.round(P*$)}, ${Math.round(N*$)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${i},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${i},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${R(18)},0.94) 0%, rgba(${R(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${i},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${i},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${i},0.18); }
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
        rgba(${i},0.054) 70px,
        rgba(${i},0.054) 71px
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
        rgba(${i},0.045) 113px,
        rgba(${i},0.045) 114px
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
    background: radial-gradient(circle, rgba(${i},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${i},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${i},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${i},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${i},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${i},0.05) 2px, transparent 2px),
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
        rgba(${i},0.06) 195deg,
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
        rgba(${i},0.035) 18px,
        rgba(${i},0.035) 19px
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
        radial-gradient(circle, rgba(${i},0.05) 1px, transparent 1px);
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
            rgba(${i},0.025) 40px, rgba(${i},0.025) 41px
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
        rgba(${i},0.035) 25px, rgba(${i},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${i},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${i},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${i},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${i},0.08) 0%, transparent 50%),
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
        rgba(${i},0.04) 2.5%,
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
    background: rgba(${R(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${R(180)},0.05),
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
            0 0 200px rgba(${R(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${R(180)},0.08),
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
    color: ${s};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${e},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${a};
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

.nf-term-active .nf-term-prefix { color: ${a}; text-shadow: 0 0 6px rgba(${e},0.4); }

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
    border-top: 1px solid rgba(${e},0.2);
    background: linear-gradient(180deg, rgba(${R(5)},0.95) 0%, rgba(${R(12)},0.98) 100%);
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
    border-top: 1px solid rgba(${i},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${R(6)},0.75) 0%, rgba(${R(3)},0.92) 100%);
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
    background: rgba(${R(8)}, 0.88);
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
    color: ${a};
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
    background: ${a};
    box-shadow: 0 0 6px rgba(${e},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${c};
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
    background: linear-gradient(90deg, ${a}, ${s});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${c}, ${l});
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
    background: linear-gradient(90deg, ${a}, ${p});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${c}, ${l});
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
    background: rgba(${R(8)},0.8);
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
    background: rgba(${R(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${a};
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
    color: ${a};
    text-shadow: 0 0 6px rgba(${e},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${a};
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
    background: ${c};
    box-shadow: 0 0 5px rgba(${o},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${o},0.1);
    color: ${l};
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

    `}function et(){de||(de=document.createElement("style"),de.id="netflow-overlay-styles",de.textContent=Mt(Q),document.head.appendChild(de))}function tt(t){t.innerHTML="",K.forEach((e,i)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function St(){const t=document.getElementById("nf-terminal");if(!t)return;tt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${K.length}`)}function nt(t,e){let s="";for(let P=0;P<20;P++){const N=P/20*Math.PI*2,R=(P+.2)/20*Math.PI*2,$=(P+.5)/20*Math.PI*2,r=(P+.8)/20*Math.PI*2,C=(P+1)/20*Math.PI*2;s+=`${P===0?"M":"L"}${(120+100*Math.cos(N)).toFixed(1)},${(120+100*Math.sin(N)).toFixed(1)} `,s+=`L${(120+100*Math.cos(R)).toFixed(1)},${(120+100*Math.sin(R)).toFixed(1)} `,s+=`L${(120+112*Math.cos($)).toFixed(1)},${(120+112*Math.sin($)).toFixed(1)} `,s+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,s+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `}s+="Z";const l=14,d=72,m=62;let w="";for(let P=0;P<l;P++){const N=P/l*Math.PI*2,R=(P+.25)/l*Math.PI*2,$=(P+.75)/l*Math.PI*2,r=(P+1)/l*Math.PI*2;w+=`${P===0?"M":"L"}${(120+m*Math.cos(N)).toFixed(1)},${(120+m*Math.sin(N)).toFixed(1)} `,w+=`L${(120+d*Math.cos(R)).toFixed(1)},${(120+d*Math.sin(R)).toFixed(1)} `,w+=`L${(120+d*Math.cos($)).toFixed(1)},${(120+d*Math.sin($)).toFixed(1)} `,w+=`L${(120+m*Math.cos(r)).toFixed(1)},${(120+m*Math.sin(r)).toFixed(1)} `}return w+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${w}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${m}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Pt(){const t=document.createElement("div");t.id="netflow-engine-overlay",le=document.createElement("canvas"),le.id="nf-matrix-canvas",t.appendChild(le);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let u=1;u<=5;u++){const y=document.createElement("div");y.className=`nf-ambient-orb nf-orb-${u}`,t.appendChild(y)}const i=document.createElement("div");i.className="nf-pat-data",t.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-a",t.appendChild(o);const a=document.createElement("div");a.className="nf-pat-diag-b",t.appendChild(a);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",t.appendChild(l);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const m=document.createElement("div");m.className="nf-pat-wave-h",t.appendChild(m);const w=document.createElement("div");w.className="nf-pat-radar",t.appendChild(w);const P=document.createElement("div");P.className="nf-pat-ripple-1",t.appendChild(P);const N=document.createElement("div");N.className="nf-pat-ripple-2",t.appendChild(N);const R=document.createElement("div");R.className="nf-pat-techscan",t.appendChild(R);const $=document.createElement("div");$.className="nf-center-glow",t.appendChild($);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const C=document.createElement("div");C.className="nf-crt-scanlines",t.appendChild(C);const v=document.createElement("div");v.className="nf-vignette",t.appendChild(v);for(let u=0;u<3;u++){const y=document.createElement("div");y.className="nf-pulse-ring",t.appendChild(y)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(u=>{const y=document.createElement("div");y.className=`nf-corner-deco ${u}`,t.appendChild(y)});const B=document.createElement("button");B.className="nf-stop-btn",B.innerHTML='<span class="nf-stop-icon"></span> หยุด',B.onclick=()=>{var u;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((u=chrome.runtime)!=null&&u.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(B);const I=document.createElement("button");I.className="nf-close-btn",I.textContent="✕ ซ่อน",I.onclick=()=>Ge(),t.appendChild(I);const k=document.createElement("div");k.className="nf-layout";const x=document.createElement("div");x.className="nf-core-monitor",x.id="nf-core-monitor";const M=document.createElement("div");M.className="nf-core-header",M.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${K.length}</div>
    `,x.appendChild(M);const f=document.createElement("div");f.className="nf-terminal",f.id="nf-terminal",tt(f),x.appendChild(f);const h=document.createElement("div");h.className="nf-engine-core",h.id="nf-engine-core";const T=document.createElement("div");T.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(u=>{const y=document.createElement("div");y.className=`nf-frame-corner ${u}`,T.appendChild(y)}),h.appendChild(T);const F="http://www.w3.org/2000/svg",E=document.createElementNS(F,"svg");E.setAttribute("class","nf-engine-waves"),E.setAttribute("viewBox","0 0 560 140"),E.setAttribute("preserveAspectRatio","none"),E.id="nf-engine-waves";for(let u=0;u<4;u++){const y=document.createElementNS(F,"path");y.setAttribute("fill","none"),y.setAttribute("stroke-width",u<2?"1.5":"1"),y.setAttribute("stroke",u<2?`rgba(${Q.rgb},${.14+u*.1})`:`rgba(${Q.accentRgb},${.1+(u-2)*.08})`),y.setAttribute("data-wave-idx",String(u)),E.appendChild(y)}h.appendChild(E);const _=document.createElement("div");_.className="nf-engine-brand-inner",_.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${nt(Q.rgb,Q.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${nt(Q.rgb,Q.accentRgb)}
        </div>
    `,h.appendChild(_);const O=document.createElement("div");O.className="nf-engine-stats",O.id="nf-engine-stats",O.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([u,y,z])=>`<div class="nf-stat-item"><span class="nf-stat-label">${u}</span><span class="nf-stat-val" id="${y}">${z}</span></div>`).join(""),h.appendChild(O),x.appendChild(h),k.appendChild(x);const b=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];fe.forEach((u,y)=>{const z=Tt(u);z.classList.add(b[y]),z.id=`nf-mod-${u.id}`,k.appendChild(z)}),t.appendChild(k);for(let u=0;u<30;u++){const y=document.createElement("div");y.className="nf-particle",y.style.left=`${5+Math.random()*90}%`,y.style.bottom=`${Math.random()*40}%`,y.style.animationDuration=`${3+Math.random()*5}s`,y.style.animationDelay=`${Math.random()*4}s`;const z=.3+Math.random()*.4,G=.7+Math.random()*.3;y.style.background=`rgba(${Math.floor(oe*G)}, ${Math.floor(ie*G)}, ${Math.floor(ae*G)}, ${z})`,y.style.width=`${1+Math.random()*2}px`,y.style.height=y.style.width,t.appendChild(y)}return t}function Tt(t){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(i),t.steps.forEach(a=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${a.id}`;let c="";a.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${c}
        `,e.appendChild(p)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function At(){Ze=Date.now(),Se=setInterval(()=>{const t=Math.floor((Date.now()-Ze)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${i}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${e}:${i}`)},1e3)}function ot(){Se&&(clearInterval(Se),Se=null)}const Rt=120,it=160,at=.4;let me=null,rt=0,st=0,lt=0,Ee=[];function Bt(t,e){Ee=[];for(let i=0;i<Rt;i++){const o=Math.random();let a;o<.22?a=0:o<.4?a=1:o<.55?a=2:o<.68?a=3:o<.84?a=4:a=5;const p=Math.random()*t,c=Math.random()*e,s=50+Math.random()*220,l=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Ee.push({x:a===0?Math.random()*t:p+Math.cos(l)*s,y:a===0?Math.random()*e:c+Math.sin(l)*s,vx:(Math.random()-.5)*at,vy:(Math.random()-.5)*at,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:p,oCy:c,oRadius:s,oAngle:l,oSpeed:d})}}function Ft(){if(!le)return;const t=le;if(ve=t.getContext("2d"),!ve)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Ee.length===0&&Bt(t.width,t.height)};e(),window.addEventListener("resize",e);let i=null,o=0,a=0,p=!1;function c(){if(!ve||!le){ye=null;return}if(ye=requestAnimationFrame(c),p=!p,p)return;const s=ve,l=le.width,d=le.height;s.fillStyle=`rgba(${oe*.04|0},${ie*.04|0},${ae*.06|0},1)`,s.fillRect(0,0,l,d),(!i||o!==l||a!==d)&&(o=l,a=d,i=s.createRadialGradient(l*.5,d*.5,0,l*.5,d*.5,Math.max(l,d)*.6),i.addColorStop(0,`rgba(${oe*.08|0},${ie*.08|0},${ae*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=i,s.fillRect(0,0,l,d);const m=Ee,w=m.length,P=it*it;for(let $=0;$<w;$++){const r=m[$];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>l&&(r.x=l,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>d&&(r.y=d,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const C=r.oAngle,v=r.oRadius*.7;r.x=r.oCx+v*Math.cos(C),r.y=r.oCy+v*Math.sin(C)*Math.cos(C),r.oCx+=Math.sin(C*.15)*.12,r.oCy+=Math.cos(C*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const C=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*C,r.y=r.oCy+Math.sin(r.oAngle)*C,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=l+30:r.x>l+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const C=r.oRadius+50;r.oCx<-C?r.oCx=l+C:r.oCx>l+C&&(r.oCx=-C),r.oCy<-C?r.oCy=d+C:r.oCy>d+C&&(r.oCy=-C)}}s.beginPath(),s.strokeStyle=`rgba(${oe},${ie},${ae},0.06)`,s.lineWidth=.4;const N=new Path2D;for(let $=0;$<w;$++){const r=m[$];for(let C=$+1;C<w;C++){const v=m[C],B=r.x-v.x,I=r.y-v.y,k=B*B+I*I;k<P&&(1-k/P<.4?(s.moveTo(r.x,r.y),s.lineTo(v.x,v.y)):(N.moveTo(r.x,r.y),N.lineTo(v.x,v.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${oe},${ie},${ae},0.18)`,s.lineWidth=.8,s.stroke(N),!me||rt!==oe||st!==ie||lt!==ae){me=document.createElement("canvas");const $=48;me.width=$,me.height=$;const r=me.getContext("2d"),C=r.createRadialGradient($/2,$/2,0,$/2,$/2,$/2);C.addColorStop(0,`rgba(${oe},${ie},${ae},0.9)`),C.addColorStop(.3,`rgba(${oe},${ie},${ae},0.35)`),C.addColorStop(1,`rgba(${oe},${ie},${ae},0)`),r.fillStyle=C,r.fillRect(0,0,$,$),rt=oe,st=ie,lt=ae}const R=me;for(let $=0;$<w;$++){const r=m[$],C=.6+.4*Math.sin(r.pulsePhase),v=r.radius*5*(.8+C*.4);s.globalAlpha=.5+C*.4,s.drawImage(R,r.x-v/2,r.y-v/2,v,v)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let $=0;$<w;$++){const r=m[$];if(r.radius>2){const C=.6+.4*Math.sin(r.pulsePhase),v=r.radius*(.8+C*.4)*.35;s.moveTo(r.x+v,r.y),s.arc(r.x,r.y,v,0,Math.PI*2)}}s.fill()}c()}function Dt(){ye!==null&&(cancelAnimationFrame(ye),ye=null),le=null,ve=null,Ee=[]}let Ce=null;const Te=560,Nt=140,ct=Te/2,dt=Nt/2,pt=[];for(let t=0;t<=Te;t+=8){const e=Math.abs(t-ct)/ct;pt.push(Math.pow(Math.min(1,e*1.6),.6))}const Ot=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Te,off:t*.6,spd:.7+t*.12}));let Le=!1;function ft(){if(xe=requestAnimationFrame(ft),Le=!Le,Le)return;if(Oe+=.07,!Ce){const e=document.getElementById("nf-engine-waves");if(!e){xe=null;return}Ce=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ce.length;e++){const i=Ot[e],o=Oe*i.spd+i.off;t.length=0,t.push(`M 0 ${dt}`);let a=0;for(let p=0;p<=Te;p+=8){const c=dt+i.amp*pt[a++]*Math.sin(p*i.freq+o);t.push(`L${p} ${c*10+.5|0}`)}Ce[e].setAttribute("d",t.join(" "))}}function zt(){Oe=0,ft(),Ft(),Pe=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function ut(){xe!==null&&(cancelAnimationFrame(xe),xe=null),Pe&&(clearInterval(Pe),Pe=null),Ce=null,Dt()}function Ve(){let t=0;const e=K.filter(d=>d.status!=="skipped").length;for(const d of K){const m=document.getElementById(`nf-proc-${d.stepId}`);if(!m)continue;m.className="nf-proc-row";const w=m.querySelector(".nf-proc-badge");switch(d.status){case"done":m.classList.add("nf-proc-done"),w&&(w.textContent="✅ done"),t++;break;case"active":m.classList.add("nf-proc-active"),w&&(w.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":m.classList.add("nf-proc-error"),w&&(w.textContent="❌ error");break;case"skipped":m.classList.add("nf-proc-skipped"),w&&(w.textContent="— skip");break;default:m.classList.add("nf-proc-waiting"),w&&(w.textContent="(queued)")}}const i=K.findIndex(d=>d.status==="active"),o=i>=0?i+1:t>=e&&e>0?K.length:t,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${o}/${K.length}`);const p=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=Q.doneHex),c&&(c.style.background=Q.doneHex,c.style.boxShadow=`0 0 8px rgba(${Q.doneRgb},0.7)`)):K.some(m=>m.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):K.some(m=>m.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=Q.hex,p.style.textShadow=`0 0 10px rgba(${Q.rgb},0.5)`);const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function gt(){J&&J.isConnected||(et(),J=document.createElement("button"),J.id="nf-toggle-btn",J.className="nf-toggle-visible",J.innerHTML=pe?Qe:Je,J.title="ซ่อน/แสดง Netflow Overlay",J.onclick=()=>Ge(),document.body.appendChild(J))}function Ge(){j&&(gt(),pe?(j.classList.remove("nf-hidden"),j.classList.add("nf-visible"),J&&(J.innerHTML=Je),pe=!1):(j.classList.remove("nf-visible"),j.classList.add("nf-hidden"),J&&(J.innerHTML=Qe),pe=!0))}const mt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ht(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=we;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const i=mt[e]||mt.green;let o;try{o=chrome.runtime.getURL(i)}catch{o=`/${i}`}const a=Q.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${o}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${a},0.45)`,t.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function qe(t=1){if(Q=It(),Ke(),j&&j.isConnected){pe&&Ge();return}if(j&&!j.isConnected&&(j=null),de&&(de.remove(),de=null),et(),$e=t,K=ze(t),t>1){const e=fe.find(o=>o.id==="video");if(e){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=t;a++)o.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),o.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),o.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});e.steps=o}const i=fe.find(o=>o.id==="render");if(i){const o=i.steps.find(p=>p.id==="download");o&&(o.label="ดาวน์โหลด 720p");const a=i.steps.find(p=>p.id==="upscale");a&&(a.label="Full Video")}}j=Pt(),j.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(j),j.classList.add("nf-visible"),pe=!1,gt(),At(),zt(),requestAnimationFrame(()=>ht())}function bt(){ot(),ut(),pe=!1,j&&(j.classList.add("nf-fade-out"),setTimeout(()=>{j==null||j.remove(),j=null},500)),J&&(J.remove(),J=null)}const Lt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Vt(t,e,i){const o=K.findIndex(m=>m.status==="active"),a=K.filter(m=>m.status==="done").length,p=K.length,c=o>=0?o+1:a>=p?p:a,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${c}/${p}`);let l=1;for(const m of K)if(m.status==="active"||m.status==="done")if(m.stepId.startsWith("scene")){const w=m.stepId.match(/^scene(\d+)-/);w&&(l=Math.max(l,parseInt(w[1],10)))}else(m.stepId==="download"||m.stepId==="upscale"||m.stepId==="open")&&(l=$e);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=$e>1?`${l}/${$e}`:"1/1"),e==="active"){const m=document.getElementById("nf-stat-status"),w=Lt[t]||t.toUpperCase();m&&(m.textContent=w)}else if(e==="done"&&a>=p){const m=document.getElementById("nf-stat-status");m&&(m.textContent="COMPLETE")}else if(e==="error"){const m=document.getElementById("nf-stat-status");m&&(m.textContent="ERROR")}if(i!==void 0&&i>0){const m=document.getElementById("nf-stat-progress");m&&(m.textContent=`${Math.min(100,i)}%`)}}function S(t,e,i){if(!j)return;for(const a of fe)for(const p of a.steps)p.id===t&&(p.status=e,i!==void 0&&(p.progress=i));for(const a of K)a.stepId===t&&(a.status=e,i!==void 0&&(a.progress=i));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),Vt(t,e,i),i!==void 0){const a=document.getElementById(`nf-bar-${t}`);a&&(a.style.width=`${Math.min(100,i)}%`)}He(),Ve()}function he(t){S(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function ke(t=4e3){ot(),ut(),He(),Ve(),setTimeout(()=>bt(),t)}function He(){for(const t of fe){const e=t.steps.filter(l=>l.status!=="skipped").length,i=t.steps.filter(l=>l.status==="done").length,o=t.steps.some(l=>l.status==="active"),a=e>0?Math.round(i/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${a}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${a}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),a>=100?s.classList.add("nf-done"):o&&s.classList.add("nf-active"))}}function Gt(t){var o,a,p,c;$e=t;const e=new Map;for(const s of K)e.set(s.stepId,{status:s.status,progress:s.progress});K=ze(t);for(const s of K){const l=e.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(St(),t>1){const s=fe.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=s.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)l.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),l.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),l.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=l,wt(s)}}const i=fe.find(s=>s.id==="render");if(i&&t>1){const s=i.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=i.steps.find(d=>d.id==="upscale");l&&(l.label="Full Video"),wt(i)}He(),Ve()}function wt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),t.steps.forEach(a=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${a.id}`;let c="";a.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${c}
        `,e.appendChild(p)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function Ae(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ae(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Ae(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Ue(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}function xt(t){const e=t.replace(/\\/g,"/");return e.startsWith("/")?"file://"+e:"file:///"+e}async function Re(){try{const t=document.querySelectorAll("video");let e=null;for(const i of t)if(i.src&&i.src.startsWith("http")&&i.getBoundingClientRect().width>100){e=i.src;break}if(!e){for(const i of t)if(i.src&&i.getBoundingClientRect().width>50){e=i.src;break}}if(!e)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;if(n(`[TikTok] พบ video URL: ${e.substring(0,80)}...`),e.startsWith("https://"))try{await new Promise(i=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),i()})})}catch{}return e}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}function _e(t){if(t)try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}const vt=(()=>{const t="netflow_instance_id";let e=sessionStorage.getItem(t);return e||(e=crypto.randomUUID().slice(0,8),sessionStorage.setItem(t,e)),e})(),Z=`netflow_pending_${vt}`,We=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ye=/Win/i.test(navigator.userAgent),be=We?"🍎 Mac":Ye?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${be} [${vt}]`);class Be extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const Fe=(()=>{const t="self.onmessage=e=>{const{id,ms}=e.data;setTimeout(()=>self.postMessage(id),ms)};";try{return new Worker(URL.createObjectURL(new Blob([t],{type:"application/javascript"})))}catch{return null}})();let qt=0;const Xe=new Map;Fe&&(Fe.onmessage=t=>{const e=Xe.get(t.data);e&&(Xe.delete(t.data),e())});const g=t=>new Promise((e,i)=>{if(window.__NETFLOW_STOP__)return i(new Be);if(Fe){const o=++qt;Xe.set(o,()=>{if(window.__NETFLOW_STOP__){i(new Be);return}e()}),Fe.postMessage({id:o,ms:t})}else{const o=setTimeout(()=>{if(window.__NETFLOW_STOP__){i(new Be);return}e()},t);g._lastId=o}});function ue(){return!!window.__NETFLOW_STOP__}function yt(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=(document.body.textContent||"").toLowerCase();if(!t.some(p=>e.includes(p)))return null;const o=document.querySelectorAll("span, p, h1, h2, h3, li");for(const p of o){if(p.closest("#netflow-engine-overlay"))continue;const c=(p.textContent||"").trim().toLowerCase();if(!(c.length>200||c.length<5)){for(const s of t)if(c.includes(s))return((a=p.textContent)==null?void 0:a.trim())||s}}return null}async function ne(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",a)),t.dispatchEvent(new MouseEvent("click",a)),await g(50),t.click()}function Ht(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",a)),t.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",a)),t.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",a))}function Ut(t){const e=[],i=document.querySelectorAll("i");for(const o of i){if((o.textContent||"").trim()!==t)continue;let p=o,c=null,s=1/0;for(let l=0;l<20&&p&&(p=p.parentElement,!(!p||p===document.body));l++){const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const m=d.width*d.height;m<s&&(c=p,s=m)}}c&&!e.includes(c)&&e.push(c)}return e.sort((o,a)=>{const p=o.getBoundingClientRect(),c=a.getBoundingClientRect();return p.left-c.left}),e}function je(t=!1){const e=[],i=document.querySelectorAll("video");for(const c of i){let s=c.parentElement;for(let l=0;l<10&&s;l++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of o){const s=(c.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=c.parentElement;for(let d=0;d<10&&l;d++){const m=l.getBoundingClientRect();if(m.width>120&&m.height>80&&m.width<window.innerWidth*.7&&m.top>=-50&&m.left<window.innerWidth*.75){e.push({el:l,left:m.left});break}l=l.parentElement}}}const a=document.querySelectorAll("img");for(const c of a){const s=(c.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=c.parentElement;for(let d=0;d<10&&l;d++){const m=l.getBoundingClientRect();if(m.width>120&&m.height>80&&m.width<window.innerWidth*.7&&m.top>=-50&&m.left<window.innerWidth*.75){e.push({el:l,left:m.left});break}l=l.parentElement}}}const p=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(s=>s.el===c));if(p.sort((c,s)=>c.left-s.left),p.length>0){const c=p[0].el,s=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Wt(){const t=Ut("image");if(t.length>0){const i=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${i.left.toFixed(0)},${i.top.toFixed(0)}) ขนาด ${i.width.toFixed(0)}x${i.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const i of e){let o=i.parentElement;for(let a=0;a<10&&o;a++){const p=o.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Yt(t,e){var s;const[i,o]=t.split(","),a=((s=i.match(/:(.*?);/))==null?void 0:s[1])||"image/png",p=atob(o),c=new Uint8Array(p.length);for(let l=0;l<p.length;l++)c[l]=p.charCodeAt(l);return new File([c],e,{type:a})}function Ie(t){var o;const e=[],i=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const a of i)if(((o=a.textContent)==null?void 0:o.trim())===t){const p=a.closest("button");p&&e.push(p)}return e}function Xt(){const t=[...Ie("add"),...Ie("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const a of o){const p=a.getBoundingClientRect();if(p.bottom>window.innerHeight*.7&&p.width<60&&p.height<60){const c=(a.textContent||"").trim();if(c==="+"||c==="add")return a}}return null}let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();a.y>i&&(i=a.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${i.toFixed(0)}`),e}function $t(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=Ie(o);let p=null,c=0;for(const s of a){const l=s.getBoundingClientRect();l.y>c&&(c=l.y,p=s)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${c.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const p=Math.abs(a.width-a.height)<10&&a.width<60,c=a.y+a.x+(p?1e3:0);c>i&&(i=c,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const a=(o.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return o}return null}function Et(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const i=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of i){const a=o.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function De(t,e){var i,o,a,p;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),await g(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await g(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(s),await g(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((i=navigator.clipboard)!=null&&i.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(c){let s=t[c];for(let l=0;l<30&&s;l++){const d=s.memoizedProps,m=s.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const w=d.editor;w.selection,w.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(a=m==null?void 0:m.memoizedState)==null?void 0:a.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),m.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function jt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const i of e)t.push({input:i,origType:"file"}),i.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Kt(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${be})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${be})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Qt(t,e,i){var d;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),a=[...t.map(m=>m.input)];for(const m of o)!a.includes(m)&&m.offsetParent===null&&a.push(m);for(const m of a)m.type="file";n(`คืนค่า input ${a.length} ตัวเป็น type=file`);const p=document.querySelectorAll('input[type="file"]');if(p.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${be})`),!1;let c;if(i&&i.size>0){const m=Array.from(p).filter(w=>!i.has(w));m.length>0?(c=m[m.length-1],n(`เล็งเป้า file input ใหม่ (${m.length} ใหม่, ${p.length} ทั้งหมด)`)):(c=p[p.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${p.length} ตัว`))}else c=p[p.length-1];const s=new DataTransfer;s.items.add(e);try{c.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=c.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(m){n(`กำหนด target.files ล้มเหลว: ${m.message} — ลอง defineProperty`);try{Object.defineProperty(c,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(w){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${w.message}`),!1}}const l=c._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),c.dispatchEvent(new Event("change",{bubbles:!0})),c.dispatchEvent(new Event("input",{bubbles:!0}));try{const m=new DataTransfer;m.items.add(e);const w=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:m});c.dispatchEvent(w),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${be}`),!0}function Me(){let t=0;const e=document.querySelectorAll("img");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.src&&o.offsetParent!==null&&t++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of i){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.offsetParent!==null&&t++}return t}async function Ct(t,e){var m;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const i=Yt(t,e);n(`ขนาดไฟล์: ${(i.size/1024).toFixed(1)} KB`);const o=Me();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const a=async(w,P=8e3)=>{const N=Date.now();for(;Date.now()-N<P;){const R=Me();if(R>o)return n(`✅ [${w}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${R}`),!0;await g(500)}return n(`⚠️ [${w}] รูปย่อไม่เพิ่ม (ยังคง ${Me()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const p=Xt();if(!p)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const s=Kt();let l=jt();const d=new MutationObserver(w=>{for(const P of w)for(const N of P.addedNodes)if(N instanceof HTMLInputElement&&N.type==="file"&&(N.type="text",l.push({input:N,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),N instanceof HTMLElement){const R=N.querySelectorAll('input[type="file"]');for(const $ of R)$.type="text",l.push({input:$,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{p.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let w=!1;const P=Date.now();for(;!w&&Date.now()-P<5e3;){const R=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const $ of R){if($===p)continue;const r=$.querySelectorAll("i");for(const C of r){const v=((m=C.textContent)==null?void 0:m.trim())||"";if((v==="upload"||v==="upload_file")&&!Array.from($.querySelectorAll("i")).map(I=>{var k;return(k=I.textContent)==null?void 0:k.trim()}).includes("drive_folder_upload")){$.click(),w=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${v}) ✅`);break}}if(w)break}if(!w)for(const $ of R){if($===p)continue;const r=$.childNodes.length<=5?($.textContent||"").trim():"";if(r.length>0&&r.length<40){const C=r.toLowerCase();if(C==="upload"||C==="อัปโหลด"||C==="อัพโหลด"||C.includes("upload image")||C.includes("upload photo")||C.includes("อัปโหลดรูปภาพ")||C.includes("อัพโหลดรูปภาพ")||C.includes("from computer")||C.includes("จากคอมพิวเตอร์")){$.click(),w=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${r}") ✅`);break}}}w||await g(500)}return w?(await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Qt(l,i,c)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await a("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const w of l)w.input.type!=="file"&&(w.input.type="file")}}async function Jt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const i=document.querySelectorAll("button");let o=null;for(const v of i){const B=v.textContent||"";if((B.includes("Nano Banana")||B.includes("Imagen")||B.includes("วิดีโอ")||B.includes("รูปภาพ")||B.includes("Image")||B.includes("Video"))&&v.getBoundingClientRect().bottom>window.innerHeight*.7){o=v,n(`พบปุ่มตั้งค่าจากข้อความ: "${B.substring(0,30).trim()}"`);break}}if(!o)for(const v of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const B=Ie(v);for(const I of B)if(I.getBoundingClientRect().bottom>window.innerHeight*.7){o=I,n(`พบปุ่มตั้งค่าจากไอคอน: ${v}`);break}if(o)break}if(!o)return A("ไม่พบปุ่มตั้งค่า"),!1;const a=o.getBoundingClientRect(),p=a.left+a.width/2,c=a.top+a.height/2,s={bubbles:!0,cancelable:!0,clientX:p,clientY:c,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let l=!1,d=null;const m=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const v of m){const B=v.getAttribute("aria-controls")||"",I=v.id||"";if(B.toUpperCase().includes("IMAGE")||I.toUpperCase().includes("IMAGE")){d=v,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${B})`);break}}if(!d)for(const v of document.querySelectorAll('[role="tab"]')){const B=v.id||"";if(B.toUpperCase().includes("TRIGGER-IMAGE")){d=v,n(`พบแท็บ Image ผ่าน id: ${B}`);break}}if(!d)for(const v of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const B=(v.textContent||"").trim();if((B==="Image"||B.endsWith("Image")||B==="รูปภาพ"||B==="ภาพ")&&!B.includes("Video")&&!B.includes("วิดีโอ")){d=v,n(`พบแท็บ Image ผ่านข้อความ: "${B}"`);break}}if(d){const v=d.getAttribute("data-state")||"",B=d.getAttribute("aria-selected")||"";if(v==="active"||B==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const I=d.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:I.left+I.width/2,clientY:I.top+I.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",k)),await g(80),d.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",k)),d.dispatchEvent(new MouseEvent("click",k)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const w=t==="horizontal"?"LANDSCAPE":"PORTRAIT",P=t==="horizontal"?"แนวนอน":"แนวตั้ง";let N=!1;const R=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], button[role="tab"]');for(const v of R){const B=(v.id||"").toUpperCase(),I=(v.getAttribute("aria-controls")||"").toUpperCase();if(B.includes(w)||I.includes(w)){const k=v.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:k.left+k.width/2,clientY:k.top+k.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",x)),v.dispatchEvent(new MouseEvent("click",x)),n(`✅ เลือกทิศทางผ่าน ID: ${w}`),N=!0,await g(400);break}}if(!N)for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const B=(v.textContent||"").trim();if(B.includes(P)||B.toLowerCase().includes(t==="horizontal"?"landscape":"portrait")){const I=v.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:I.left+I.width/2,clientY:I.top+I.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",k)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",k)),v.dispatchEvent(new MouseEvent("click",k)),n(`✅ เลือกทิศทางผ่าน Text: ${P}`),N=!0,await g(400);break}}const $=String(e),r=`x${e}`;let C=!1;for(const v of document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], button[role="tab"]')){const B=(v.id||"").toUpperCase(),I=(v.getAttribute("aria-controls")||"").toUpperCase(),k=(v.textContent||"").trim();if(B.includes(`TRIGGER-${$}`)||I.includes(`CONTENT-${$}`)||k===r){const x=v.getBoundingClientRect(),M={bubbles:!0,cancelable:!0,clientX:x.left+x.width/2,clientY:x.top+x.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",M)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",M)),v.dispatchEvent(new MouseEvent("click",M)),n(`✅ เลือกจำนวนผ่าน ID/Text: ${r}`),C=!0,await g(400);break}}if(!C)for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const B=(v.textContent||"").trim();if(B===r||B.includes(r)){const I=v.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:I.left+I.width/2,clientY:I.top+I.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",k)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",k)),v.dispatchEvent(new MouseEvent("click",k)),n(`✅ เลือกจำนวนผ่าน Text (fallback): ${r}`),C=!0,await g(400);break}}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function Zt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let i=null;const o=document.querySelectorAll("button");for(const w of o){const P=(w.textContent||"").trim();if(P.includes("Veo 3.1")&&P.includes("arrow_drop_down")){i=w,n(`พบปุ่ม Veo dropdown: "${P.substring(0,40).trim()}"`);break}}if(!i){for(const w of o)if(w.getAttribute("aria-haspopup")==="menu"){const P=(w.textContent||"").trim();if(P.includes("Veo")){i=w,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${P.substring(0,40).trim()}"`);break}}}if(!i)for(const w of o){const P=(w.textContent||"").trim();if(P.includes("Veo 3.1")&&w.getBoundingClientRect().bottom>window.innerHeight*.7){i=w,n(`พบปุ่ม Veo dropdown (bottom area): "${P.substring(0,40).trim()}"`);break}}if(!i){let w="ไม่ทราบ";for(const P of o){const N=(P.textContent||"").replace(/\s+/g," ").trim();if(N.includes("Veo 3.1")&&P.getBoundingClientRect().width>0){N.includes("Quality")?w="Veo 3.1 - Quality":N.includes("Fast")?w="Veo 3.1 - Fast":w=N.substring(0,30);break}}return A(`ไม่พบปุ่ม Veo quality dropdown — ค่าปัจจุบันบนหน้าจอ: ${w}`),!1}if((i.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=i.getBoundingClientRect(),c=p.left+p.width/2,s=p.top+p.height/2,l={bubbles:!0,cancelable:!0,clientX:c,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",l)),await g(80),i.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",l)),i.dispatchEvent(new MouseEvent("click",l)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let d=!1;const m=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const w of m){const P=w.querySelectorAll("span");for(const N of P)if((N.textContent||"").trim()===e){const $=w.getBoundingClientRect();if($.width>0&&$.height>0){const r=$.left+$.width/2,C=$.top+$.height/2,v={bubbles:!0,cancelable:!0,clientX:r,clientY:C,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),w.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",v)),w.dispatchEvent(new MouseEvent("click",v)),n(`✅ เลือก "${e}" สำเร็จ`),d=!0;break}}if(d)break;if(!d){const N=(w.textContent||"").trim();if(N.includes(e)&&!N.includes("arrow_drop_down")){const R=w.getBoundingClientRect();if(R.width>0&&R.height>0){const $=R.left+R.width/2,r=R.top+R.height/2,C={bubbles:!0,cancelable:!0,clientX:$,clientY:r,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",C)),await g(80),w.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",C)),w.dispatchEvent(new MouseEvent("click",C)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),d=!0;break}}}}return d?(await g(600),!0):(A(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),!1)}async function en(t){var v,B,I,k;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,i=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=i?i[1]:"unknown",a=We?"macOS":Ye?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=We?((B=(v=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:v[1])==null?void 0:B.replace(/_/g,"."))||"":Ye&&((I=e.match(/Windows NT ([0-9.]+)/))==null?void 0:I[1])||"",c=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${p} | Chrome ${o}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${s} | แพลตฟอร์ม: ${be}`),n("══════════════════════════════════════════");try{Ne(t.theme)}catch{}try{qe()}catch(x){console.warn("Overlay show error:",x)}const l=[],d=[];try{S("settings","active");const x=t.orientation||"horizontal",M=t.outputCount||1,f=await Jt(x,M);l.push(f?"✅ Settings":"⚠️ Settings"),S("settings",f?"done":"error")}catch(x){A(`ตั้งค่าผิดพลาด: ${x.message}`),l.push("⚠️ Settings"),S("settings","error")}try{const x=t.veoQuality||"fast",M=x==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";await Zt(x)?(l.push(`✅ ${M}`),n(`✅ Veo quality ที่ใช้: ${M}`)):(l.push("⚠️ Veo quality"),A(`ไม่สามารถเลือก ${M} ได้ — ใช้ค่าเดิมที่แสดงบนหน้าจอ`))}catch(x){A(`Veo quality error: ${x.message}`),l.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const m=()=>{const x=document.querySelectorAll("span, small, label");for(const M of x){if(M.closest("#netflow-engine-overlay"))continue;const f=(M.textContent||"").trim();if(f.length>5||!/^\d{1,3}%$/.test(f))continue;if(f==="100%")return null;const h=M.getBoundingClientRect();if(h.width>0&&h.height>0&&h.width<80&&h.height<40&&h.top>window.innerHeight*.5&&h.top<window.innerHeight)return f}return null},w=async x=>{n(`รอการอัพโหลด ${x} เสร็จ...`),await g(2e3);const M=Date.now(),f=6e4;let h="",T=Date.now();const F=15e3;for(;Date.now()-M<f;){const E=m();if(E){if(E!==h)h=E,T=Date.now();else if(Date.now()-T>F){n(`✅ อัพโหลด ${x} — % ค้างที่ ${E} นาน ${F/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}n(`กำลังอัพโหลด: ${E} — รอ...`),await g(1500)}else{n(`✅ อัพโหลด ${x} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}A(`⚠️ อัพโหลด ${x} หมดเวลาหลัง ${f/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){S("upload-char","active");try{const x=await Ct(t.characterImage,"character.png");l.push(x?"✅ ตัวละคร":"⚠️ ตัวละคร"),x||d.push("character upload failed"),S("upload-char",x?"done":"error")}catch(x){A(`อัพโหลดตัวละครผิดพลาด: ${x.message}`),l.push("❌ ตัวละคร"),d.push("character upload error"),S("upload-char","error")}await w("character")}else he("upload-char");if(t.productImage){S("upload-prod","active");try{const x=await Ct(t.productImage,"product.png");l.push(x?"✅ สินค้า":"⚠️ สินค้า"),x||d.push("product upload failed"),S("upload-prod",x?"done":"error")}catch(x){A(`อัพโหลดสินค้าผิดพลาด: ${x.message}`),l.push("❌ สินค้า"),d.push("product upload error"),S("upload-prod","error")}await w("product")}else he("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const P=m();P&&(n(`⚠️ อัพโหลดยังแสดง ${P} — รอเพิ่มเติม...`),await w("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const N=(t.characterImage?1:0)+(t.productImage?1:0);if(N>0){let x=Me();x<N&&(n(`⏳ เห็นรูปย่อแค่ ${x}/${N} — รอ 3 วินาที...`),await g(3e3),x=Me()),x>=N?n(`✅ ยืนยันรูปย่ออ้างอิง: ${x}/${N}`):A(`⚠️ คาดว่าจะมี ${N} รูปย่อ แต่พบ ${x} — ดำเนินการต่อ`)}if(ue()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),S("img-prompt","active"),await g(1e3);const R=Et();R?(await De(R,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),S("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),d.push("prompt input not found"),S("img-prompt","error")),await g(800);const $=new Set;document.querySelectorAll("img").forEach(x=>{x.src&&$.add(x.src)}),n(`บันทึกรูปเดิม: ${$.size} รูปก่อน Generate`),n("=== ขั้น 3: รอ 5 วินาทีก่อนคลิก Generate → ==="),S("img-generate","active"),await g(5e3);const r=$t();if(r){const x=r.getBoundingClientRect(),M=x.left+x.width/2,f=x.top+x.height/2,h={bubbles:!0,cancelable:!0,clientX:M,clientY:f,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",h)),r.dispatchEvent(new MouseEvent("click",h)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await g(500),r.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",h)),r.dispatchEvent(new MouseEvent("click",h)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),S("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),d.push("generate button not found"),S("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),S("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const x=()=>{const F=document.querySelectorAll("div, span, p, label, strong, small");for(const E of F){if(E.closest("#netflow-engine-overlay"))continue;const _=(E.textContent||"").trim();if(_.length>10)continue;const O=_.match(/(\d{1,3})\s*%/);if(!O)continue;const b=parseInt(O[1],10);if(b<1||b>100)continue;const u=E.getBoundingClientRect();if(!(u.width===0||u.width>150)&&!(u.top<0||u.top>window.innerHeight))return b}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let M=null,f=-1,h=0;const T=Date.now();for(;!M&&Date.now()-T<18e4;){const F=document.querySelectorAll("img");for(const E of F){if($.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;const O=E.getBoundingClientRect();if(O.width>120&&O.height>120&&O.top>0&&O.top<window.innerHeight*.85){const b=E.closest("div");if(b){M=b,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...`);break}}}if(!M)for(const E of F){if($.has(E.src))continue;const _=E.closest("div"),O=(_==null?void 0:_.textContent)||"";if(O.includes("product.png")||O.includes("character.png")||O.includes(".png")||O.includes(".jpg"))continue;const b=E.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const u=E.closest("div");if(u){M=u,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...`);break}}}if(!M){if(ue()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=yt();if(E){A(`❌ สร้างรูปล้มเหลว: ${E}`),d.push(`image gen failed: ${E}`),S("img-wait","error");break}const _=x();_!==null?(_!==f&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${_}%`),f=_,S("img-wait","active",_)),h=Date.now()):f>30&&Math.floor((Date.now()-h)/1e3)>=3&&n(`🖼️ % หายที่ ${f}% — รูปน่าจะเสร็จแล้ว`),await g(3e3)}}if(!M)A("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),S("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),S("img-wait","done",100);const F=M.getBoundingClientRect(),E=F.left+F.width/2,_=F.top+F.height/2,O={bubbles:!0,cancelable:!0,clientX:E,clientY:_};M.dispatchEvent(new PointerEvent("pointerenter",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseenter",O)),M.dispatchEvent(new PointerEvent("pointerover",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseover",O)),M.dispatchEvent(new PointerEvent("pointermove",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousemove",O)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let b=null;for(const u of["more_vert","more_horiz","more"]){const y=Ie(u);for(const z of y){const G=z.getBoundingClientRect();if(G.top>=F.top-20&&G.top<=F.bottom&&G.right>=F.right-150&&G.right<=F.right+20){b=z;break}}if(b)break}if(!b){const u=document.querySelectorAll("button");for(const y of u){const z=y.getBoundingClientRect();if(z.width<50&&z.height<50&&z.top>=F.top-10&&z.top<=F.top+60&&z.left>=F.right-80){const G=y.querySelectorAll("i");for(const Y of G)if((((k=Y.textContent)==null?void 0:k.trim())||"").includes("more")){b=y;break}if(b)break;const D=y.getAttribute("aria-label")||"";if(D.includes("เพิ่มเติม")||D.includes("more")){b=y;break}}}}if(!b)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const u=b.getBoundingClientRect(),y=u.left+u.width/2,z=u.top+u.height/2,G={bubbles:!0,cancelable:!0,clientX:y,clientY:z,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",G)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",G)),b.dispatchEvent(new MouseEvent("click",G)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let D=null;const Y=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const L of Y){const q=(L.textContent||"").trim();if(q.includes("ทำให้เป็นภาพเคลื่อนไหว")||q.includes("Animate")||q.includes("animate")){D=L;break}}if(!D)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const L=D.getBoundingClientRect(),q=L.left+L.width/2,W=L.top+L.height/2,X={bubbles:!0,cancelable:!0,clientX:q,clientY:W,button:0};D.dispatchEvent(new PointerEvent("pointerdown",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),D.dispatchEvent(new MouseEvent("mousedown",X)),await g(80),D.dispatchEvent(new PointerEvent("pointerup",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),D.dispatchEvent(new MouseEvent("mouseup",X)),D.dispatchEvent(new MouseEvent("click",X)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),S("animate","done"),await g(3e3)}}}}catch(x){A(`ขั้น 4 ผิดพลาด: ${x.message}`),l.push("⚠️ Animate")}if(ue()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),S("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let x=!1;const M=document.querySelectorAll("button, span, div");for(const T of M){const F=(T.textContent||"").trim(),E=T.getBoundingClientRect();if((F==="วิดีโอ"||F==="Video"||F.includes("วิดีโอ"))&&E.bottom>window.innerHeight*.7){x=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}x||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await g(1e3);const f=Et();f?(await De(f,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),S("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),d.push("video prompt input not found"),S("vid-prompt","error")),await g(1e3),S("vid-generate","active");const h=$t();if(h){const T=h.getBoundingClientRect(),F=T.left+T.width/2,E=T.top+T.height/2,_={bubbles:!0,cancelable:!0,clientX:F,clientY:E,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",_)),await g(80),h.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",_)),h.dispatchEvent(new MouseEvent("click",_)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),S("vid-generate","done"),await g(500),h.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",_)),await g(80),h.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",_)),h.dispatchEvent(new MouseEvent("click",_)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),d.push("video generate button not found"),S("vid-generate","error")}catch(x){A(`ขั้น 5 ผิดพลาด: ${x.message}`),l.push("⚠️ Video Gen"),d.push(`video gen error: ${x.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),he("animate"),he("vid-prompt"),he("vid-generate"),he("vid-wait");if(t.videoPrompt){S("vid-wait","active");const x=t.sceneCount||1,M=t.videoScenePrompts||[t.videoPrompt];if(x>1)try{Gt(x)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${x>1?`ต่อ ${x} ฉาก`:"ดาวน์โหลด"} ===`);let f=null;const h=()=>{if(f&&f.isConnected&&!f.closest("#netflow-engine-overlay")){const O=(f.textContent||"").trim();if(O.length<=15){const b=O.match(/(\d{1,3})\s*%/);if(b){const u=parseInt(b[1],10);if(u>=1&&u<=100)return u}}f=null}const E=document.querySelectorAll('[role="progressbar"]');for(const O of E){if(O.closest("#netflow-engine-overlay"))continue;const b=O.getAttribute("aria-valuenow");if(b){const u=parseFloat(b);if(u>=1&&u<=100)return u}}const _=document.querySelectorAll("div, span, p, label, strong, small");for(const O of _){if(O.closest("#netflow-engine-overlay"))continue;const b=(O.textContent||"").trim();if(b.length>15||b.length<2)continue;const u=b.match(/(\d{1,3})\s*%/);if(!u)continue;const y=parseInt(u[1],10);if(y<1||y>100)continue;const z=O.getBoundingClientRect();if(!(z.width===0||z.width>150)&&!(z.top<0||z.top>window.innerHeight))return f=O,y}return null},T=async(E=6e5)=>{n("รอการสร้างวิดีโอ..."),S("vid-wait","active"),await g(5e3);const _=()=>{const U=document.querySelectorAll("div, span, p, label, strong, small");let V=0;for(const H of U){if(H.closest("#netflow-engine-overlay"))continue;const ee=(H.textContent||"").trim();if(ee.includes("%")&&ee.length<15){const te=H.tagName.toLowerCase(),re=H.className&&typeof H.className=="string"?H.className.split(/\s+/).slice(0,2).join(" "):"",se=H.getBoundingClientRect();if(n(`  🔍 "${ee}" ใน <${te}.${re}> ที่ (${se.left.toFixed(0)},${se.top.toFixed(0)}) w=${se.width.toFixed(0)}`),V++,V>=5)break}}V===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},O=je();n(O?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),_();const b=Date.now();let u=-1,y=0,z=!1,G=0;for(;Date.now()-b<E;){G++;const U=h();if(U!==null){if(U!==u&&(n(`ความคืบหน้าวิดีโอ: ${U}%`),u=U,S("vid-wait","active",U)),y=Date.now(),U>=100){n("✅ ตรวจพบ 100%!"),z=!0;break}}else if(u>0){const H=Math.floor((Date.now()-y)/1e3);if(H>=5){n(`✅ % หายไปที่ ${u}% (หาย ${H} วินาที) — วิดีโอเสร็จ!`),z=!0;break}n(`⏳ % หายที่ ${u}% — ยืนยันใน ${5-H} วินาที...`)}else{const H=Math.floor((Date.now()-b)/1e3);H%15<3&&n(`⏳ รอ... (${H} วินาที) ไม่พบ %`)}const V=Math.floor((Date.now()-b)/1e3);if(!z&&(u>0||V>=30)&&G%5===0){if(je(!0)&&!O){n(`✅ การ์ดวิดีโอปรากฏขึ้น${u>0?`ที่ ${u}%`:" (ไม่พบ %)"} — วิดีโอเสร็จ!`),z=!0;break}if(u<=0){const ee=document.querySelectorAll("video");for(const te of ee){const re=te.getBoundingClientRect();if(re.width>200&&re.height>100&&te.readyState>=2&&te.src){n("✅ พบ <video> พร้อมเล่น (ไม่พบ %) — วิดีโอเสร็จ!"),z=!0;break}}if(z)break;if(V>=90){n(`✅ ไม่พบ % มานาน ${V} วินาที — ถือว่าเสร็จ`),z=!0;break}}}if(ue())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(u<1&&G%5===0){const H=yt();if(H)return A(`❌ สร้างวิดีโอล้มเหลว: ${H}`),null}await g(3e3)}const D=je();if(!D)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),S("vid-wait","error"),null;const Y=D;z?(S("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=Y.getBoundingClientRect();let q=L.left+L.width/2,W=L.top+L.height/2,X=Y;const ge=Y.querySelector("video, img, canvas");if(ge){const U=ge.getBoundingClientRect();U.width>50&&U.height>50&&(q=U.left+U.width/2,W=U.top+U.height/2,X=ge,n(`🎯 พบรูปย่อ <${ge.tagName.toLowerCase()}> ในการ์ดที่ (${q.toFixed(0)},${W.toFixed(0)}) ${U.width.toFixed(0)}x${U.height.toFixed(0)}`))}else W=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${q.toFixed(0)},${W.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${q.toFixed(0)}, ${W.toFixed(0)})...`),Ht(X);for(let U=0;U<8;U++){const V={bubbles:!0,cancelable:!0,clientX:q+U%2,clientY:W};X.dispatchEvent(new PointerEvent("pointermove",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),X.dispatchEvent(new MouseEvent("mousemove",V)),await g(500)}try{chrome.storage.local.set({[Z]:{timestamp:Date.now(),action:"mute_video",sceneCount:x,scenePrompts:M,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${x} ฉาก, ${M.length} prompts, theme: ${t.theme})`)}catch(U){n(`⚠️ ไม่สามารถบันทึก pending action: ${U.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(X),n("✅ คลิกการ์ดวิดีโอเสร็จ"),Y},F=async E=>{const _=E.getBoundingClientRect(),O=_.left+_.width/2,b=_.top+_.height/2,u={bubbles:!0,cancelable:!0,clientX:O,clientY:b,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",u)),await g(80),E.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",u)),E.dispatchEvent(new MouseEvent("click",u)),await g(50),E.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await T())A("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),S("vid-wait","error");else{l.push("✅ Video Complete"),S("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const _=await new Promise(O=>{chrome.storage.local.get(Z,b=>{if(chrome.runtime.lastError){O(null);return}O((b==null?void 0:b[Z])||null)})});_&&!_._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(Z),_.action==="mute_video"?await kt(_.sceneCount||1,_.scenePrompts||[],_.theme):_.action==="wait_scene_gen_and_download"&&await _t(_.sceneCount||2,_.currentScene||2,_.theme,_.scenePrompts||[]))}}catch(E){A(`ขั้น 6 ผิดพลาด: ${E.message}`),l.push("⚠️ Step6"),d.push(`step 6: ${E.message}`)}}const C=d.length===0;try{ke(C?5e3:8e3)}catch(x){console.warn("Overlay complete error:",x)}return{success:C,message:C?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${d.join(", ")}`,step:C?"done":"partial"}}async function kt(t,e=[],i){var B;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{i&&Ne(i)}catch{}try{qe(t)}catch(I){n(`⚠️ showOverlay error: ${I.message}`)}try{const I=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const k of I)S(k,"done");t>=2&&S("scene2-prompt","active")}catch(I){n(`⚠️ overlay restore error: ${I.message}`)}await g(1500);const o=(()=>{for(const I of document.querySelectorAll("button")){const k=I.querySelectorAll("i");for(const M of k){const f=(M.textContent||"").trim();if(f==="volume_up"||f==="volume_off"||f==="volume_mute"){const h=I.getBoundingClientRect();if(h.width>0&&h.height>0)return I}}const x=(I.getAttribute("aria-label")||"").toLowerCase();if(x.includes("mute")||x.includes("ปิดเสียง")){const M=I.getBoundingClientRect();if(M.width>0&&M.height>0)return I}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");const a=await Re();if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let b=2;b<=t;b++){const u=e[b-1];if(!u){A(`ไม่พบ prompt สำหรับฉากที่ ${b}`);continue}n(`── ฉากที่ ${b}/${t}: วาง prompt + generate ──`);let y=null;const z=Date.now();for(;!y&&Date.now()-z<1e4;){const V=document.querySelectorAll("[data-slate-editor='true']");if(V.length>0&&(y=V[V.length-1]),!y){const H=document.querySelectorAll("[role='textbox'][contenteditable='true']");H.length>0&&(y=H[H.length-1])}y||await g(1e3)}if(!y){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${y.tagName.toLowerCase()}> ${y.className.substring(0,40)}`),await De(y,u),n(`วาง prompt ฉาก ${b} (${u.length} ตัวอักษร) ✅`);try{S(`scene${b}-prompt`,"done"),S(`scene${b}-gen`,"active")}catch{}await g(1e3);const G=y.getBoundingClientRect();let D=null,Y=1/0;for(const V of document.querySelectorAll("button")){if(V.disabled)continue;const H=V.querySelectorAll("i");let ee=!1;for(const se of H)if((se.textContent||"").trim()==="arrow_forward"){ee=!0;break}if(!ee)continue;const te=V.getBoundingClientRect();if(te.width<=0||te.height<=0)continue;const re=Math.abs(te.top-G.top)+Math.abs(te.right-G.right);re<Y&&(Y=re,D=V)}if(!D)for(const V of document.querySelectorAll("button")){const H=V.querySelectorAll("i");for(const ee of H)if((ee.textContent||"").trim()==="arrow_forward"){const te=V.getBoundingClientRect();if(te.width>0&&te.height>0){D=V;break}}if(D)break}if(!D){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(V=>{chrome.storage.local.set({[Z]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:b,scenePrompts:e}},()=>V())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${b}/${t})`),await ne(D),n(`คลิก Generate ฉาก ${b} ✅`);try{S(`scene${b}-gen`,"done"),S(`scene${b}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${b} gen เสร็จ ──`),await g(5e3);let L=0,q=0;const W=Date.now(),X=6e5,ge=5e3;let U=!1;for(;Date.now()-W<X;){let V=null;const H=document.querySelectorAll("div, span, p, label, strong, small");for(const ee of H){if(ee.closest("#netflow-engine-overlay"))continue;const re=(ee.textContent||"").trim().match(/^(\d{1,3})%$/);if(re){const se=ee.getBoundingClientRect();if(se.width>0&&se.height>0&&se.width<120&&se.height<60){V=parseInt(re[1],10);break}}}if(V!==null){if(V!==L){n(`🎬 ฉาก ${b} ความคืบหน้า: ${V}%`),L=V;try{S(`scene${b}-wait`,"active",V)}catch{}}q=0}else if(L>0){if(q===0)q=Date.now(),n(`🔍 ฉาก ${b}: % หายไป (จาก ${L}%) — กำลังยืนยัน...`);else if(Date.now()-q>=ge){n(`✅ ฉาก ${b}: % หายไป ${ge/1e3} วินาที — เจนเสร็จ!`),U=!0;break}}if(ue()){n("⛔ ผู้ใช้สั่งหยุด");return}await g(2e3)}U||A(`ฉาก ${b} หมดเวลา`),n(`✅ ฉาก ${b} เสร็จแล้ว`);try{S(`scene${b}-wait`,"done",100)}catch{}chrome.storage.local.remove(Z),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{S("download","active")}catch{}await g(2e3);const I=Date.now();let k=null;const x=Date.now();for(;!k&&Date.now()-x<1e4;){for(const b of document.querySelectorAll("button")){const u=b.querySelector("i");if(u&&(u.textContent||"").trim()==="download"){const y=b.getBoundingClientRect();if(y.width>0&&y.height>0){k=b;break}}}k||await g(1e3)}if(!k){A("ไม่พบปุ่มดาวน์โหลด");return}await ne(k),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await g(1500);let M=null;for(let b=0;b<3&&!M;b++){b>0&&n(`🔄 ลองหา 720p ครั้งที่ ${b+1}...`);let u=null;const y=Date.now();for(;!u&&Date.now()-y<5e3;){for(const L of document.querySelectorAll("[role='menuitem']"))if((L.textContent||"").trim().includes("Full Video")&&L.querySelector("i")){const W=L.getBoundingClientRect();if(W.width>0&&W.height>0){u=L;break}}u||await g(500)}if(!u){A("ไม่พบ Full Video");continue}const z=u.getBoundingClientRect(),G=z.left+z.width/2,D=z.top+z.height/2;u.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:G,clientY:D})),u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:G,clientY:D})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:G,clientY:D})),await ne(u),n("คลิก/hover Full Video ✅"),await g(2e3);const Y=Date.now();for(;!M&&Date.now()-Y<8e3;){for(const L of document.querySelectorAll("button[role='menuitem']")){const q=L.querySelectorAll("span");for(const W of q)if((W.textContent||"").trim()==="720p"){const X=L.getBoundingClientRect();if(X.width>0&&X.height>0){M=L;break}}if(M)break}M||(u.isConnected&&(u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:G,clientY:D})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:G+20,clientY:D}))),await g(500))}}if(!M){A("ไม่พบ 720p");return}await ne(M),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const f=Date.now();let h=!1,T=!1;for(;Date.now()-f<3e5;){for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div")){const u=(b.textContent||"").trim();if(u==="Download complete!"||u==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),h=!0;break}(u.includes("Downloading your extended video")||u.includes("กำลังดาวน์โหลด"))&&(T||(T=!0,n("⏳ กำลังดาวน์โหลด...")))}if(h)break;if(T){let b=!1;for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((u.textContent||"").trim().includes("Downloading")){b=!0;break}if(!b){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),h=!0;break}}if(ue()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await g(2e3)}if(!h){A("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let F=!1,E=null,_=null;const O=Date.now();for(;Date.now()-O<6e4&&!F;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:I},u=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):u!=null&&u.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${u.message}`),F=!0,E=u.filename||null,_=u.fileTabId||null):n(`ดาวน์โหลดยังไม่พร้อม: ${u==null?void 0:u.message}`),b()})})}catch(b){A(`ตรวจสอบผิดพลาด: ${b.message}`)}F||await g(3e3)}F||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{S("open","done"),ke(8e3)}catch{}if(n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),_){n(`[FullVideo] อ่านวิดีโอจากไฟล์ที่ดาวน์โหลด (tab ${_})...`),await new Promise(u=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_FROM_FILE",fileTabId:_},y=>{chrome.runtime.lastError?A(`[FullVideo] CACHE_VIDEO_FROM_FILE error: ${chrome.runtime.lastError.message}`):y!=null&&y.success?n(`[FullVideo] ✅ Full video cached from file: ${((y.size||0)/1024/1024).toFixed(1)} MB`):A(`[FullVideo] CACHE_VIDEO_FROM_FILE failed: ${y==null?void 0:y.error}`),u()})});const b=E?xt(E):null;_e(b||a)}else{n("[FullVideo] ไม่มี fileTabId — fallback ใช้ video จากหน้า");const b=await Re();_e(b||a)}Ue(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const p=(I,k="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const x of document.querySelectorAll(k)){const M=(x.textContent||"").trim();if(M.includes(I)&&M.length<100){const f=x.getBoundingClientRect();if(f.width>0&&f.height>0&&f.top>=0)return x}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const s=Date.now();for(;!c&&Date.now()-s<1e4;){for(const I of document.querySelectorAll("button, [role='button']")){const k=(I.textContent||"").trim(),x=k.toLowerCase();if((x.includes("download")||x.includes("ดาวน์โหลด"))&&k.length<80){const M=I.getBoundingClientRect();if(M.width>0&&M.height>0){c=I;break}}}if(!c)for(const I of document.querySelectorAll("button")){const k=(I.getAttribute("aria-label")||"").toLowerCase();if(k.includes("download")||k.includes("ดาวน์")){const x=I.getBoundingClientRect();if(x.width>0&&x.height>0){c=I;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!c){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await ne(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const l=Date.now();let d=null;const m=Date.now();for(;!d&&Date.now()-m<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await g(500));if(!d){A("ไม่พบ 1080p");return}await ne(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const w=Date.now();let P=!1,N=!1,R=0;const $=3e3;for(;Date.now()-w<3e5;){const k=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(k.includes("upscaling complete")||k.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),P=!0;break}for(const M of document.querySelectorAll("div, span, p")){const f=(M.textContent||"").trim().toLowerCase();if(f.length<60&&(f.includes("upscaling complete")||f.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(B=M.textContent)==null?void 0:B.trim()}")`),P=!0;break}}if(P)break;if(k.includes("upscaling your video")||k.includes("กำลังอัปสเกล")){N=!0,R=0;const M=Math.floor((Date.now()-w)/1e3);n(`⏳ กำลังอัปสเกล... (${M} วินาที)`)}else if(N){if(R===0)R=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-R>=$){n(`✅ ข้อความ Upscaling หายไป ${$/1e3} วินาที — เสร็จ!`),P=!0;break}}else{const M=Math.floor((Date.now()-w)/1e3);M%10<3&&n(`⏳ รอ Upscale... (${M} วินาที)`)}if(ue()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!P){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let r=!1;const C=Date.now();for(;Date.now()-C<6e4&&!r;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},k=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):k!=null&&k.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${k.message}`),r=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${k==null?void 0:k.message}`),I()})})}catch(I){A(`ตรวจสอบผิดพลาด: ${I.message}`)}r||await g(3e3)}r||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══");const v=await Re();_e(v||a),Ue(2e3)}async function _t(t=2,e=2,i,o=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{i&&Ne(i)}catch{}try{qe(t)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let h=2;h<=e;h++)f.push(`scene${h}-prompt`,`scene${h}-gen`),h<e&&f.push(`scene${h}-wait`);for(const h of f)S(h,"done");S(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${e}/${t} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await g(2e3);const a=(()=>{for(const f of document.querySelectorAll("button")){const h=f.querySelectorAll("i");for(const T of h){const F=(T.textContent||"").trim();if(F==="volume_up"||F==="volume_off"||F==="volume_mute"){const E=f.getBoundingClientRect();if(E.width>0&&E.height>0)return f}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,c=0;const s=Date.now(),l=6e5,d=5e3;let m=!1,w=0,P=null;for(;Date.now()-s<l;){let f=null;if(P&&P.isConnected&&!P.closest("#netflow-engine-overlay")){const T=(P.textContent||"").trim().match(/^(\d{1,3})%$/);T?f=parseInt(T[1],10):P=null}if(f===null){const h=document.querySelectorAll('[role="progressbar"]');for(const T of h){if(T.closest("#netflow-engine-overlay"))continue;const F=T.getAttribute("aria-valuenow");if(F){const E=parseFloat(F);if(E>=1&&E<=100){f=E;break}}}}if(f===null){const h=document.querySelectorAll("span, small, label, p");for(const T of h){if(T.closest("#netflow-engine-overlay"))continue;const E=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if(E){const _=T.getBoundingClientRect();if(_.width>0&&_.height>0&&_.width<120&&_.height<60){f=parseInt(E[1],10),P=T;break}}}}if(f!==null){if(w=0,f!==p){n(`🎬 scene ${e} ความคืบหน้า: ${f}%`),p=f;try{S(`scene${e}-wait`,"active",f)}catch{}}c=0}else if(p>0){if(c===0)c=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-c>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),m=!0;break}}else if(w++,w>=15){const h=document.querySelectorAll("video");let T=!1;for(const F of h)if(F.readyState>=2&&!F.paused&&F.getBoundingClientRect().width>200){T=!0;break}if(T){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),m=!0;break}if(w>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),m=!0;break}}await g(2e3)}m||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{S(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&o.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let f=e+1;f<=t;f++){const h=o[f-1];if(!h){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate (pending recovery) ──`);let T=null;const F=Date.now();for(;!T&&Date.now()-F<1e4;){const D=document.querySelectorAll("[data-slate-editor='true']");if(D.length>0&&(T=D[D.length-1]),!T){const Y=document.querySelectorAll("[role='textbox'][contenteditable='true']");Y.length>0&&(T=Y[Y.length-1])}T||await g(1e3)}if(!T){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await De(T,h),n(`วาง prompt ฉาก ${f} (${h.length} ตัวอักษร) ✅`);try{S(`scene${f}-prompt`,"done"),S(`scene${f}-gen`,"active")}catch{}await g(1e3);const E=T.getBoundingClientRect();let _=null,O=1/0;for(const D of document.querySelectorAll("button")){if(D.disabled)continue;const Y=D.querySelectorAll("i");let L=!1;for(const X of Y)if((X.textContent||"").trim()==="arrow_forward"){L=!0;break}if(!L)continue;const q=D.getBoundingClientRect();if(q.width<=0||q.height<=0)continue;const W=Math.abs(q.top-E.top)+Math.abs(q.right-E.right);W<O&&(O=W,_=D)}if(!_)for(const D of document.querySelectorAll("button")){const Y=D.querySelectorAll("i");for(const L of Y)if((L.textContent||"").trim()==="arrow_forward"){const q=D.getBoundingClientRect();if(q.width>0&&q.height>0){_=D;break}}if(_)break}if(!_){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(D=>{chrome.storage.local.set({[Z]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:f,scenePrompts:o}},()=>D())}),await ne(_),n(`คลิก Generate ฉาก ${f} ✅`);try{S(`scene${f}-gen`,"done"),S(`scene${f}-wait`,"active")}catch{}await g(5e3);let b=0,u=0;const y=Date.now();let z=!1,G=0;for(;Date.now()-y<6e5;){let D=null;const Y=document.querySelectorAll("div, span, p, label, strong, small");for(const L of Y){if(L.closest("#netflow-engine-overlay"))continue;const W=(L.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const X=L.getBoundingClientRect();if(X.width>0&&X.height>0&&X.width<120&&X.height<60){D=parseInt(W[1],10);break}}}if(D!==null){if(G=0,D!==b){n(`🎬 ฉาก ${f} ความคืบหน้า: ${D}%`),b=D;try{S(`scene${f}-wait`,"active",D)}catch{}}u=0}else if(b>0){if(u===0)u=Date.now();else if(Date.now()-u>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),z=!0;break}}else if(G++,G>=15){const L=document.querySelectorAll("video");let q=!1;for(const W of L)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){q=!0;break}if(q){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),z=!0;break}if(G>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),z=!0;break}}await g(2e3)}z||n(`⚠️ ฉาก ${f} หมดเวลา`);try{S(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove(Z),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);try{S("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const N=Date.now();let R=null;const $=Date.now();for(;!R&&Date.now()-$<1e4;){for(const f of document.querySelectorAll("button")){const h=f.querySelector("i");if(h&&(h.textContent||"").trim()==="download"){const T=f.getBoundingClientRect();if(T.width>0&&T.height>0){R=f;break}}}R||await g(1e3)}if(!R){A("ไม่พบปุ่มดาวน์โหลด");return}await ne(R),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await g(1500);let r=null;for(let f=0;f<3&&!r;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let h=null;const T=Date.now();for(;!h&&Date.now()-T<5e3;){for(const b of document.querySelectorAll("[role='menuitem']"))if((b.textContent||"").trim().includes("Full Video")&&b.querySelector("i")){const y=b.getBoundingClientRect();if(y.width>0&&y.height>0){h=b;break}}h||await g(500)}if(!h){A("ไม่พบ Full Video");continue}const F=h.getBoundingClientRect(),E=F.left+F.width/2,_=F.top+F.height/2;h.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:E,clientY:_})),h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:E,clientY:_})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:E,clientY:_})),await ne(h),n("คลิก/hover Full Video ✅"),await g(2e3);const O=Date.now();for(;!r&&Date.now()-O<8e3;){for(const b of document.querySelectorAll("button[role='menuitem']")){const u=b.querySelectorAll("span");for(const y of u)if((y.textContent||"").trim()==="720p"){const z=b.getBoundingClientRect();if(z.width>0&&z.height>0){r=b;break}}if(r)break}r||(h.isConnected&&(h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:E,clientY:_})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:E+20,clientY:_}))),await g(500))}}if(!r){A("ไม่พบ 720p");return}await ne(r),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const C=Date.now();let v=!1,B=!1;for(;Date.now()-C<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const h=(f.textContent||"").trim();if(h==="Download complete!"||h==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),v=!0;break}(h.includes("Downloading your extended video")||h.includes("กำลังดาวน์โหลด"))&&(B||(B=!0,n("⏳ กำลังดาวน์โหลด...")))}if(v)break;if(B){let f=!1;for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((h.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),v=!0;break}}await g(2e3)}if(!v){A("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let I=!1,k=null,x=null;const M=Date.now();for(;Date.now()-M<6e4&&!I;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:N},h=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):h!=null&&h.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${h.message}`),I=!0,k=h.filename||null,x=h.fileTabId||null):n(`ดาวน์โหลดยังไม่พร้อม: ${h==null?void 0:h.message}`),f()})})}catch(f){A(`ตรวจสอบผิดพลาด: ${f.message}`)}I||await g(3e3)}I||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{S("open","done"),ke(8e3)}catch{}if(n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),x){n(`[FullVideo] อ่านวิดีโอจากไฟล์ที่ดาวน์โหลด (tab ${x})...`),await new Promise(h=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_FROM_FILE",fileTabId:x},T=>{chrome.runtime.lastError?A(`[FullVideo] CACHE_VIDEO_FROM_FILE error: ${chrome.runtime.lastError.message}`):T!=null&&T.success?n(`[FullVideo] ✅ Full video cached from file: ${((T.size||0)/1024/1024).toFixed(1)} MB`):A(`[FullVideo] CACHE_VIDEO_FROM_FILE failed: ${T==null?void 0:T.error}`),h()})});const f=k?xt(k):null;_e(f)}else{n("[FullVideo] ไม่มี fileTabId — fallback ใช้ video จากหน้า");const f=await Re();_e(f)}Ue(2e3)}async function tn(){try{const t=await new Promise(p=>{chrome.storage.local.get(Z,c=>{if(chrome.runtime.lastError){p(null);return}p((c==null?void 0:c[Z])||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const i=Date.now()-t.timestamp;if(i>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(Z);return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=o,await new Promise(p=>{chrome.storage.local.set({[Z]:t},()=>p())}),await g(300),!await new Promise(p=>{chrome.storage.local.get(Z,c=>{const s=c==null?void 0:c[Z];p((s==null?void 0:s._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(Z),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(i/1e3)} วินาที)`),t.action==="mute_video"?await kt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await _t(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}window.__NETFLOW_LISTENER_REGISTERED__?console.log("[Netflow AI] ⚡ สคริปต์ถูกโหลดซ้ำ — ข้ามการลงทะเบียน listener (ใช้ตัวเดิม)"):(window.__NETFLOW_LISTENER_REGISTERED__=!0,chrome.runtime.onMessage.addListener((t,e,i)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE"){if(window.__NETFLOW_RUNNING__){const o=window.__NETFLOW_STARTED_AT__||0;if(o>0&&Date.now()-o>10*60*1e3)n("⚠️ __NETFLOW_RUNNING__ ค้างเกิน 10 นาที — auto-reset"),window.__NETFLOW_RUNNING__=!1;else return n("⚠️ GENERATE_IMAGE ถูกเรียกซ้ำ — ข้าม (มี instance ทำงานอยู่แล้ว)"),i({success:!1,message:"Already running"}),!1}return window.__NETFLOW_RUNNING__=!0,window.__NETFLOW_STARTED_AT__=Date.now(),window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),i({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),en(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof Be||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{bt()}catch{}}else console.error("[Netflow AI] Generate error:",o)}).finally(()=>{window.__NETFLOW_RUNNING__=!1}),!1}if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,window.__NETFLOW_RUNNING__=!1,i({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return i({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return i({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const o=Wt();if(!o){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=o.getBoundingClientRect(),p=a.left+a.width/2,c=a.top+a.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${c.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(p,c);l?(await ne(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await ne(o),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),tn())})();
