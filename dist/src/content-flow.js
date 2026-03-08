(function(){"use strict";const ie={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let j=ie.green,ge=null;function _e(t){t&&ie[t]&&(ge=t,j=ie[t],He(),requestAnimationFrame(()=>dt()))}function vt(){if(ge&&ie[ge])return ie[ge];try{const t=localStorage.getItem("netflow_app_theme");if(t&&ie[t])return ie[t]}catch{}return ie.green}let Z=0,ee=255,te=65;function He(){const t=j.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(Z=parseInt(t[1],16),ee=parseInt(t[2],16),te=parseInt(t[3],16))}const We='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Ue='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let Y=null,K=null,ae=null,Ye=0,ke=null,me=null,Ce=null,Te=0,se=!1,ne=null,he=null,be=null,we=1,U=[];function Ae(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let i=2;i<=t;i++)e.push({stepId:`scene${i}-prompt`,label:`ฉาก ${i} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${i}-gen`,label:`ฉาก ${i} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${i}-wait`,label:`ฉาก ${i} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const le=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];U=Ae(1);function yt(t){const e=t.rgb,i=t.accentRgb,o=t.doneRgb,a=t.hex,f=t.accentHex,p=t.doneHex,l=(()=>{const h=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const r=$=>Math.min(255,$+80);return`#${[1,2,3].map($=>r(parseInt(h[$],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const h=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const r=$=>Math.min(255,$+60);return`#${[1,2,3].map($=>r(parseInt(h[$],16)).toString(16).padStart(2,"0")).join("")}`})(),d=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),u=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,b=d?parseInt(d[1],16)/u:0,T=d?parseInt(d[2],16)/u:1,v=d?parseInt(d[3],16)/u:.25,y=h=>`${Math.round(b*h)}, ${Math.round(T*h)}, ${Math.round(v*h)}`;return`
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
    color: ${l};
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
    color: ${l};
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
    background: linear-gradient(180deg, rgba(${y(6)},0.75) 0%, rgba(${y(3)},0.92) 100%);
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
    background: linear-gradient(90deg, ${a}, ${l});
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
    background: linear-gradient(90deg, ${a}, ${f});
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
    color: ${l};
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

    `}function Xe(){ae||(ae=document.createElement("style"),ae.id="netflow-overlay-styles",ae.textContent=yt(j),document.head.appendChild(ae))}function je(t){t.innerHTML="",U.forEach((e,i)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function $t(){const t=document.getElementById("nf-terminal");if(!t)return;je(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${U.length}`)}function Ke(t,e){let l="";for(let T=0;T<20;T++){const v=T/20*Math.PI*2,y=(T+.2)/20*Math.PI*2,h=(T+.5)/20*Math.PI*2,r=(T+.8)/20*Math.PI*2,$=(T+1)/20*Math.PI*2;l+=`${T===0?"M":"L"}${(120+100*Math.cos(v)).toFixed(1)},${(120+100*Math.sin(v)).toFixed(1)} `,l+=`L${(120+100*Math.cos(y)).toFixed(1)},${(120+100*Math.sin(y)).toFixed(1)} `,l+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,l+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,l+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `}l+="Z";const c=14,d=72,u=62;let b="";for(let T=0;T<c;T++){const v=T/c*Math.PI*2,y=(T+.25)/c*Math.PI*2,h=(T+.75)/c*Math.PI*2,r=(T+1)/c*Math.PI*2;b+=`${T===0?"M":"L"}${(120+u*Math.cos(v)).toFixed(1)},${(120+u*Math.sin(v)).toFixed(1)} `,b+=`L${(120+d*Math.cos(y)).toFixed(1)},${(120+d*Math.sin(y)).toFixed(1)} `,b+=`L${(120+d*Math.cos(h)).toFixed(1)},${(120+d*Math.sin(h)).toFixed(1)} `,b+=`L${(120+u*Math.cos(r)).toFixed(1)},${(120+u*Math.sin(r)).toFixed(1)} `}return b+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${l}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${b}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Et(){const t=document.createElement("div");t.id="netflow-engine-overlay",ne=document.createElement("canvas"),ne.id="nf-matrix-canvas",t.appendChild(ne);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let E=1;E<=5;E++){const k=document.createElement("div");k.className=`nf-ambient-orb nf-orb-${E}`,t.appendChild(k)}const i=document.createElement("div");i.className="nf-pat-data",t.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-a",t.appendChild(o);const a=document.createElement("div");a.className="nf-pat-diag-b",t.appendChild(a);const f=document.createElement("div");f.className="nf-pat-circuit",t.appendChild(f);const p=document.createElement("div");p.className="nf-pat-honeycomb",t.appendChild(p);const l=document.createElement("div");l.className="nf-pat-binary",t.appendChild(l);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const u=document.createElement("div");u.className="nf-pat-wave-h",t.appendChild(u);const b=document.createElement("div");b.className="nf-pat-radar",t.appendChild(b);const T=document.createElement("div");T.className="nf-pat-ripple-1",t.appendChild(T);const v=document.createElement("div");v.className="nf-pat-ripple-2",t.appendChild(v);const y=document.createElement("div");y.className="nf-pat-techscan",t.appendChild(y);const h=document.createElement("div");h.className="nf-center-glow",t.appendChild(h);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const $=document.createElement("div");$.className="nf-crt-scanlines",t.appendChild($);const N=document.createElement("div");N.className="nf-vignette",t.appendChild(N);for(let E=0;E<3;E++){const k=document.createElement("div");k.className="nf-pulse-ring",t.appendChild(k)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(E=>{const k=document.createElement("div");k.className=`nf-corner-deco ${E}`,t.appendChild(k)});const D=document.createElement("button");D.className="nf-stop-btn",D.innerHTML='<span class="nf-stop-icon"></span> หยุด',D.onclick=()=>{var E;window.__NETFLOW_STOP__=!0;try{Se("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((E=chrome.runtime)!=null&&E.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(D);const z=document.createElement("button");z.className="nf-close-btn",z.textContent="✕ ซ่อน",z.onclick=()=>De(),t.appendChild(z);const G=document.createElement("div");G.className="nf-layout";const s=document.createElement("div");s.className="nf-core-monitor",s.id="nf-core-monitor";const w=document.createElement("div");w.className="nf-core-header",w.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${U.length}</div>
    `,s.appendChild(w);const _=document.createElement("div");_.className="nf-terminal",_.id="nf-terminal",je(_),s.appendChild(_);const S=document.createElement("div");S.className="nf-engine-core",S.id="nf-engine-core";const F=document.createElement("div");F.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(E=>{const k=document.createElement("div");k.className=`nf-frame-corner ${E}`,F.appendChild(k)}),S.appendChild(F);const M="http://www.w3.org/2000/svg",m=document.createElementNS(M,"svg");m.setAttribute("class","nf-engine-waves"),m.setAttribute("viewBox","0 0 560 140"),m.setAttribute("preserveAspectRatio","none"),m.id="nf-engine-waves";for(let E=0;E<4;E++){const k=document.createElementNS(M,"path");k.setAttribute("fill","none"),k.setAttribute("stroke-width",E<2?"1.5":"1"),k.setAttribute("stroke",E<2?`rgba(${j.rgb},${.14+E*.1})`:`rgba(${j.accentRgb},${.1+(E-2)*.08})`),k.setAttribute("data-wave-idx",String(E)),m.appendChild(k)}S.appendChild(m);const x=document.createElement("div");x.className="nf-engine-brand-inner",x.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Ke(j.rgb,j.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Ke(j.rgb,j.accentRgb)}
        </div>
    `,S.appendChild(x);const P=document.createElement("div");P.className="nf-engine-stats",P.id="nf-engine-stats",P.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([E,k,R])=>`<div class="nf-stat-item"><span class="nf-stat-label">${E}</span><span class="nf-stat-val" id="${k}">${R}</span></div>`).join(""),S.appendChild(P),s.appendChild(S),G.appendChild(s);const I=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];le.forEach((E,k)=>{const R=kt(E);R.classList.add(I[k]),R.id=`nf-mod-${E.id}`,G.appendChild(R)}),t.appendChild(G);for(let E=0;E<30;E++){const k=document.createElement("div");k.className="nf-particle",k.style.left=`${5+Math.random()*90}%`,k.style.bottom=`${Math.random()*40}%`,k.style.animationDuration=`${3+Math.random()*5}s`,k.style.animationDelay=`${Math.random()*4}s`;const R=.3+Math.random()*.4,O=.7+Math.random()*.3;k.style.background=`rgba(${Math.floor(Z*O)}, ${Math.floor(ee*O)}, ${Math.floor(te*O)}, ${R})`,k.style.width=`${1+Math.random()*2}px`,k.style.height=k.style.width,t.appendChild(k)}return t}function kt(t){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(i),t.steps.forEach(a=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${a.id}`;let p="";a.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${p}
        `,e.appendChild(f)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function Ct(){Ye=Date.now(),ke=setInterval(()=>{const t=Math.floor((Date.now()-Ye)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${i}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${e}:${i}`)},1e3)}function Je(){ke&&(clearInterval(ke),ke=null)}const Mt=120,Qe=160,Ze=.4;let pe=null,et=0,tt=0,nt=0,xe=[];function St(t,e){xe=[];for(let i=0;i<Mt;i++){const o=Math.random();let a;o<.22?a=0:o<.4?a=1:o<.55?a=2:o<.68?a=3:o<.84?a=4:a=5;const f=Math.random()*t,p=Math.random()*e,l=50+Math.random()*220,c=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);xe.push({x:a===0?Math.random()*t:f+Math.cos(c)*l,y:a===0?Math.random()*e:p+Math.sin(c)*l,vx:(Math.random()-.5)*Ze,vy:(Math.random()-.5)*Ze,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:f,oCy:p,oRadius:l,oAngle:c,oSpeed:d})}}function Pt(){if(!ne)return;const t=ne;if(he=t.getContext("2d"),!he)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,xe.length===0&&St(t.width,t.height)};e(),window.addEventListener("resize",e);let i=null,o=0,a=0,f=!1;function p(){if(!he||!ne){be=null;return}if(be=requestAnimationFrame(p),f=!f,f)return;const l=he,c=ne.width,d=ne.height;l.fillStyle=`rgba(${Z*.04|0},${ee*.04|0},${te*.06|0},1)`,l.fillRect(0,0,c,d),(!i||o!==c||a!==d)&&(o=c,a=d,i=l.createRadialGradient(c*.5,d*.5,0,c*.5,d*.5,Math.max(c,d)*.6),i.addColorStop(0,`rgba(${Z*.08|0},${ee*.08|0},${te*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=i,l.fillRect(0,0,c,d);const u=xe,b=u.length,T=Qe*Qe;for(let h=0;h<b;h++){const r=u[h];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>c&&(r.x=c,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>d&&(r.y=d,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const $=r.oAngle,N=r.oRadius*.7;r.x=r.oCx+N*Math.cos($),r.y=r.oCy+N*Math.sin($)*Math.cos($),r.oCx+=Math.sin($*.15)*.12,r.oCy+=Math.cos($*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const $=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*$,r.y=r.oCy+Math.sin(r.oAngle)*$,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=c+30:r.x>c+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const $=r.oRadius+50;r.oCx<-$?r.oCx=c+$:r.oCx>c+$&&(r.oCx=-$),r.oCy<-$?r.oCy=d+$:r.oCy>d+$&&(r.oCy=-$)}}l.beginPath(),l.strokeStyle=`rgba(${Z},${ee},${te},0.06)`,l.lineWidth=.4;const v=new Path2D;for(let h=0;h<b;h++){const r=u[h];for(let $=h+1;$<b;$++){const N=u[$],D=r.x-N.x,z=r.y-N.y,G=D*D+z*z;G<T&&(1-G/T<.4?(l.moveTo(r.x,r.y),l.lineTo(N.x,N.y)):(v.moveTo(r.x,r.y),v.lineTo(N.x,N.y)))}}if(l.stroke(),l.strokeStyle=`rgba(${Z},${ee},${te},0.18)`,l.lineWidth=.8,l.stroke(v),!pe||et!==Z||tt!==ee||nt!==te){pe=document.createElement("canvas");const h=48;pe.width=h,pe.height=h;const r=pe.getContext("2d"),$=r.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);$.addColorStop(0,`rgba(${Z},${ee},${te},0.9)`),$.addColorStop(.3,`rgba(${Z},${ee},${te},0.35)`),$.addColorStop(1,`rgba(${Z},${ee},${te},0)`),r.fillStyle=$,r.fillRect(0,0,h,h),et=Z,tt=ee,nt=te}const y=pe;for(let h=0;h<b;h++){const r=u[h],$=.6+.4*Math.sin(r.pulsePhase),N=r.radius*5*(.8+$*.4);l.globalAlpha=.5+$*.4,l.drawImage(y,r.x-N/2,r.y-N/2,N,N)}l.globalAlpha=1,l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let h=0;h<b;h++){const r=u[h];if(r.radius>2){const $=.6+.4*Math.sin(r.pulsePhase),N=r.radius*(.8+$*.4)*.35;l.moveTo(r.x+N,r.y),l.arc(r.x,r.y,N,0,Math.PI*2)}}l.fill()}p()}function It(){be!==null&&(cancelAnimationFrame(be),be=null),ne=null,he=null,xe=[]}let ve=null;const Me=560,_t=140,ot=Me/2,it=_t/2,at=[];for(let t=0;t<=Me;t+=8){const e=Math.abs(t-ot)/ot;at.push(Math.pow(Math.min(1,e*1.6),.6))}const Tt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Me,off:t*.6,spd:.7+t*.12}));let Be=!1;function rt(){if(me=requestAnimationFrame(rt),Be=!Be,Be)return;if(Te+=.07,!ve){const e=document.getElementById("nf-engine-waves");if(!e){me=null;return}ve=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<ve.length;e++){const i=Tt[e],o=Te*i.spd+i.off;t.length=0,t.push(`M 0 ${it}`);let a=0;for(let f=0;f<=Me;f+=8){const p=it+i.amp*at[a++]*Math.sin(f*i.freq+o);t.push(`L${f} ${p*10+.5|0}`)}ve[e].setAttribute("d",t.join(" "))}}function At(){Te=0,rt(),Pt(),Ce=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function st(){me!==null&&(cancelAnimationFrame(me),me=null),Ce&&(clearInterval(Ce),Ce=null),ve=null,It()}function Re(){let t=0;const e=U.filter(d=>d.status!=="skipped").length;for(const d of U){const u=document.getElementById(`nf-proc-${d.stepId}`);if(!u)continue;u.className="nf-proc-row";const b=u.querySelector(".nf-proc-badge");switch(d.status){case"done":u.classList.add("nf-proc-done"),b&&(b.textContent="✅ done"),t++;break;case"active":u.classList.add("nf-proc-active"),b&&(b.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),b&&(b.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),b&&(b.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),b&&(b.textContent="(queued)")}}const i=U.findIndex(d=>d.status==="active"),o=i>=0?i+1:t>=e&&e>0?U.length:t,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${o}/${U.length}`);const f=document.querySelector(".nf-core-title-val"),p=document.querySelector(".nf-status-dot");t>=e&&e>0?(f&&(f.textContent="COMPLETE",f.style.color=j.doneHex),p&&(p.style.background=j.doneHex,p.style.boxShadow=`0 0 8px rgba(${j.doneRgb},0.7)`)):U.some(u=>u.status==="error")?(f&&(f.textContent="ERROR",f.style.color="#f87171"),p&&(p.style.background="#ef4444",p.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):U.some(u=>u.status==="active")&&f&&(f.textContent="ACTIVE",f.style.color=j.hex,f.style.textShadow=`0 0 10px rgba(${j.rgb},0.5)`);const l=document.getElementById("nf-terminal"),c=l==null?void 0:l.querySelector(".nf-proc-active");c&&l&&c.scrollIntoView({behavior:"smooth",block:"center"})}function lt(){K&&K.isConnected||(Xe(),K=document.createElement("button"),K.id="nf-toggle-btn",K.className="nf-toggle-visible",K.innerHTML=se?We:Ue,K.title="ซ่อน/แสดง Netflow Overlay",K.onclick=()=>De(),document.body.appendChild(K))}function De(){Y&&(lt(),se?(Y.classList.remove("nf-hidden"),Y.classList.add("nf-visible"),K&&(K.innerHTML=Ue),se=!1):(Y.classList.remove("nf-visible"),Y.classList.add("nf-hidden"),K&&(K.innerHTML=We),se=!0))}const ct={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function dt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=ge;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const i=ct[e]||ct.green;let o;try{o=chrome.runtime.getURL(i)}catch{o=`/${i}`}const a=j.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${o}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${a},0.45)`,t.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function ze(t=1){if(j=vt(),He(),Y&&Y.isConnected){se&&De();return}if(Y&&!Y.isConnected&&(Y=null),ae&&(ae.remove(),ae=null),Xe(),we=t,U=Ae(t),t>1){const e=le.find(o=>o.id==="video");if(e){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=t;a++)o.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),o.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),o.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});e.steps=o}const i=le.find(o=>o.id==="render");if(i){const o=i.steps.find(f=>f.id==="download");o&&(o.label="ดาวน์โหลด 720p");const a=i.steps.find(f=>f.id==="upscale");a&&(a.label="Full Video")}}Y=Et(),document.body.appendChild(Y),se=!1,lt(),Ct(),At(),requestAnimationFrame(()=>dt())}function pt(){Je(),st(),se=!1,Y&&(Y.classList.add("nf-fade-out"),setTimeout(()=>{Y==null||Y.remove(),Y=null},500)),K&&(K.remove(),K=null)}const Bt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Rt(t,e,i){const o=U.findIndex(u=>u.status==="active"),a=U.filter(u=>u.status==="done").length,f=U.length,p=o>=0?o+1:a>=f?f:a,l=document.getElementById("nf-stat-step");l&&(l.textContent=`${p}/${f}`);let c=1;for(const u of U)if(u.status==="active"||u.status==="done")if(u.stepId.startsWith("scene")){const b=u.stepId.match(/^scene(\d+)-/);b&&(c=Math.max(c,parseInt(b[1],10)))}else(u.stepId==="download"||u.stepId==="upscale"||u.stepId==="open")&&(c=we);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=we>1?`${c}/${we}`:"1/1"),e==="active"){const u=document.getElementById("nf-stat-status"),b=Bt[t]||t.toUpperCase();u&&(u.textContent=b)}else if(e==="done"&&a>=f){const u=document.getElementById("nf-stat-status");u&&(u.textContent="COMPLETE")}else if(e==="error"){const u=document.getElementById("nf-stat-status");u&&(u.textContent="ERROR")}if(i!==void 0&&i>0){const u=document.getElementById("nf-stat-progress");u&&(u.textContent=`${Math.min(100,i)}%`)}}function C(t,e,i){if(!Y)return;for(const a of le)for(const f of a.steps)f.id===t&&(f.status=e,i!==void 0&&(f.progress=i));for(const a of U)a.stepId===t&&(a.status=e,i!==void 0&&(a.progress=i));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),Rt(t,e,i),i!==void 0){const a=document.getElementById(`nf-bar-${t}`);a&&(a.style.width=`${Math.min(100,i)}%`)}Oe(),Re()}function fe(t){C(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function ye(t=4e3){Je(),st(),Oe(),Re(),setTimeout(()=>pt(),t)}function Oe(){for(const t of le){const e=t.steps.filter(c=>c.status!=="skipped").length,i=t.steps.filter(c=>c.status==="done").length,o=t.steps.some(c=>c.status==="active"),a=e>0?Math.round(i/e*100):0,f=document.getElementById(`nf-pct-${t.id}`);f&&(f.textContent=`${a}%`);const p=document.getElementById(`nf-modbar-${t.id}`);p&&(p.style.width=`${a}%`);const l=document.getElementById(`nf-mod-${t.id}`);l&&(l.classList.remove("nf-active","nf-done"),a>=100?l.classList.add("nf-done"):o&&l.classList.add("nf-active"))}}function Dt(t){var o,a,f,p;we=t;const e=new Map;for(const l of U)e.set(l.stepId,{status:l.status,progress:l.progress});U=Ae(t);for(const l of U){const c=e.get(l.stepId);c&&(l.status=c.status,c.progress!==void 0&&(l.progress=c.progress))}if($t(),t>1){const l=le.find(c=>c.id==="video");if(l){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=l.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=l.steps.find(d=>d.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((f=l.steps.find(d=>d.id==="vid-generate"))==null?void 0:f.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=l.steps.find(d=>d.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)c.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),c.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),c.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});l.steps=c,ft(l)}}const i=le.find(l=>l.id==="render");if(i&&t>1){const l=i.steps.find(d=>d.id==="download");l&&(l.label="ดาวน์โหลด 720p");const c=i.steps.find(d=>d.id==="upscale");c&&(c.label="Full Video"),ft(i)}Oe(),Re()}function ft(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),t.steps.forEach(a=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${a.id}`;let p="";a.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${p}
        `,e.appendChild(f)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function Se(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Se(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Se(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Fe(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function ut(){try{const t=document.querySelectorAll("video");let e=null;for(const i of t)if(i.src&&i.src.startsWith("http")&&i.getBoundingClientRect().width>100){e=i.src;break}if(!e){for(const i of t)if(i.src&&i.getBoundingClientRect().width>50){e=i.src;break}}if(!e)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;if(n(`[TikTok] พบ video URL: ${e.substring(0,80)}...`),e.startsWith("https://"))try{await new Promise(i=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),i()})})}catch{}return e}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}function Ne(t){if(t)try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}const Le=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ge=/Win/i.test(navigator.userAgent),ue=Le?"🍎 Mac":Ge?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ue}`);class qe extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const g=t=>new Promise((e,i)=>{if(window.__NETFLOW_STOP__)return i(new qe);const o=setTimeout(()=>{if(window.__NETFLOW_STOP__)return i(new qe);e()},t);g._lastId=o});function ce(){return!!window.__NETFLOW_STOP__}function gt(){var i;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const a=(o.textContent||"").trim().toLowerCase();if(!(a.length>200||a.length<5)){for(const f of t)if(a.includes(f))return((i=o.textContent)==null?void 0:i.trim())||f}}return null}async function J(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",a)),t.dispatchEvent(new MouseEvent("click",a)),await g(50),t.click()}function zt(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",a)),t.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",a)),t.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",a))}function Ot(t){const e=[],i=document.querySelectorAll("i");for(const o of i){if((o.textContent||"").trim()!==t)continue;let f=o,p=null,l=1/0;for(let c=0;c<20&&f&&(f=f.parentElement,!(!f||f===document.body));c++){const d=f.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const u=d.width*d.height;u<l&&(p=f,l=u)}}p&&!e.includes(p)&&e.push(p)}return e.sort((o,a)=>{const f=o.getBoundingClientRect(),p=a.getBoundingClientRect();return f.left-p.left}),e}function Ve(t=!1){const e=[],i=document.querySelectorAll("video");for(const p of i){let l=p.parentElement;for(let c=0;c<10&&l;c++){const d=l.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:l,left:d.left});break}l=l.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const p of o){const l=(p.textContent||"").trim();if(l==="play_arrow"||l==="play_circle"||l==="videocam"){let c=p.parentElement;for(let d=0;d<10&&c;d++){const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const a=document.querySelectorAll("img");for(const p of a){const l=(p.alt||"").toLowerCase();if(l.includes("video")||l.includes("วิดีโอ")){let c=p.parentElement;for(let d=0;d<10&&c;d++){const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const f=Array.from(new Set(e.map(p=>p.el))).map(p=>e.find(l=>l.el===p));if(f.sort((p,l)=>p.left-l.left),f.length>0){const p=f[0].el,l=p.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),p}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Ft(){const t=Ot("image");if(t.length>0){const i=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${i.left.toFixed(0)},${i.top.toFixed(0)}) ขนาด ${i.width.toFixed(0)}x${i.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const i of e){let o=i.parentElement;for(let a=0;a<10&&o;a++){const f=o.getBoundingClientRect();if(f.width>100&&f.height>80&&f.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${f.left.toFixed(0)},${f.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Nt(t,e){var l;const[i,o]=t.split(","),a=((l=i.match(/:(.*?);/))==null?void 0:l[1])||"image/png",f=atob(o),p=new Uint8Array(f.length);for(let c=0;c<f.length;c++)p[c]=f.charCodeAt(c);return new File([p],e,{type:a})}function $e(t){var o;const e=[],i=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const a of i)if(((o=a.textContent)==null?void 0:o.trim())===t){const f=a.closest("button");f&&e.push(f)}return e}function Lt(){const t=[...$e("add"),...$e("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const a of o){const f=a.getBoundingClientRect();if(f.bottom>window.innerHeight*.7&&f.width<60&&f.height<60){const p=(a.textContent||"").trim();if(p==="+"||p==="add")return a}}return null}let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();a.y>i&&(i=a.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${i.toFixed(0)}`),e}function mt(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=$e(o);let f=null,p=0;for(const l of a){const c=l.getBoundingClientRect();c.y>p&&(p=c.y,f=l)}if(f)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${p.toFixed(0)}`),f}const t=document.querySelectorAll("button");let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const f=Math.abs(a.width-a.height)<10&&a.width<60,p=a.y+a.x+(f?1e3:0);p>i&&(i=p,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const a=(o.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return o}return null}function ht(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const i=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of i){const a=o.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function Pe(t,e){var i,o,a,f;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(l),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(c),await g(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(p){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const p=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(p);const l=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(l),await g(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const l=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:p});t.dispatchEvent(l),await g(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((i=navigator.clipboard)!=null&&i.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const l=document.createElement("textarea");l.value=e,l.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(l),l.focus(),l.select(),document.execCommand("copy"),document.body.removeChild(l),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${p.length} ตัวอักษร)`);return}}catch(p){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const p=Object.keys(t).find(l=>l.startsWith("__reactFiber$")||l.startsWith("__reactInternalInstance$"));if(p){let l=t[p];for(let c=0;c<30&&l;c++){const d=l.memoizedProps,u=l.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const b=d.editor;b.selection,b.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((f=(a=u==null?void 0:u.memoizedState)==null?void 0:a.editor)!=null&&f.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),u.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}l=l.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(p){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${p.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Gt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const i of e)t.push({input:i,origType:"file"}),i.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function qt(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ue})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ue})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Vt(t,e,i){var d;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),a=[...t.map(u=>u.input)];for(const u of o)!a.includes(u)&&u.offsetParent===null&&a.push(u);for(const u of a)u.type="file";n(`คืนค่า input ${a.length} ตัวเป็น type=file`);const f=document.querySelectorAll('input[type="file"]');if(f.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ue})`),!1;let p;if(i&&i.size>0){const u=Array.from(f).filter(b=>!i.has(b));u.length>0?(p=u[u.length-1],n(`เล็งเป้า file input ใหม่ (${u.length} ใหม่, ${f.length} ทั้งหมด)`)):(p=f[f.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${f.length} ตัว`))}else p=f[f.length-1];const l=new DataTransfer;l.items.add(e);try{p.files=l.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=p.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(u){n(`กำหนด target.files ล้มเหลว: ${u.message} — ลอง defineProperty`);try{Object.defineProperty(p,"files",{value:l.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(b){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${b.message}`),!1}}const c=p._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0}));try{const u=new DataTransfer;u.items.add(e);const b=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:u});p.dispatchEvent(b),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ue}`),!0}function Ee(){let t=0;const e=document.querySelectorAll("img");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.src&&o.offsetParent!==null&&t++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of i){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.offsetParent!==null&&t++}return t}async function bt(t,e){var u;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const i=Nt(t,e);n(`ขนาดไฟล์: ${(i.size/1024).toFixed(1)} KB`);const o=Ee();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const a=async(b,T=8e3)=>{const v=Date.now();for(;Date.now()-v<T;){const y=Ee();if(y>o)return n(`✅ [${b}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${y}`),!0;await g(500)}return n(`⚠️ [${b}] รูปย่อไม่เพิ่ม (ยังคง ${Ee()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const f=Lt();if(!f)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const p=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${p.size} ตัว`);const l=qt();let c=Gt();const d=new MutationObserver(b=>{for(const T of b)for(const v of T.addedNodes)if(v instanceof HTMLInputElement&&v.type==="file"&&(v.type="text",c.push({input:v,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),v instanceof HTMLElement){const y=v.querySelectorAll('input[type="file"]');for(const h of y)h.type="text",c.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{f.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let b=!1;const T=Date.now();for(;!b&&Date.now()-T<5e3;){const y=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const h of y){if(h===f)continue;const r=h.querySelectorAll("i");for(const $ of r){const N=((u=$.textContent)==null?void 0:u.trim())||"";if((N==="upload"||N==="upload_file")&&!Array.from(h.querySelectorAll("i")).map(z=>{var G;return(G=z.textContent)==null?void 0:G.trim()}).includes("drive_folder_upload")){h.click(),b=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${N}) ✅`);break}}if(b)break}if(!b)for(const h of y){if(h===f)continue;const r=h.childNodes.length<=5?(h.textContent||"").trim():"";if(r.length>0&&r.length<40){const $=r.toLowerCase();if($==="upload"||$==="อัปโหลด"||$==="อัพโหลด"||$.includes("upload image")||$.includes("upload photo")||$.includes("อัปโหลดรูปภาพ")||$.includes("อัพโหลดรูปภาพ")||$.includes("from computer")||$.includes("จากคอมพิวเตอร์")){h.click(),b=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${r}") ✅`);break}}}b||await g(500)}return b?(await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Vt(c,i,p)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await a("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),l();for(const b of c)b.input.type!=="file"&&(b.input.type="file")}}async function Ht(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const i=document.querySelectorAll("button");let o=null;for(const v of i){const y=v.textContent||"";if((y.includes("Nano Banana")||y.includes("Imagen")||y.includes("วิดีโอ")||y.includes("รูปภาพ")||y.includes("Image")||y.includes("Video"))&&v.getBoundingClientRect().bottom>window.innerHeight*.7){o=v,n(`พบปุ่มตั้งค่าจากข้อความ: "${y.substring(0,30).trim()}"`);break}}if(!o)for(const v of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const y=$e(v);for(const h of y)if(h.getBoundingClientRect().bottom>window.innerHeight*.7){o=h,n(`พบปุ่มตั้งค่าจากไอคอน: ${v}`);break}if(o)break}if(!o)return A("ไม่พบปุ่มตั้งค่า"),!1;const a=o.getBoundingClientRect(),f=a.left+a.width/2,p=a.top+a.height/2,l={bubbles:!0,cancelable:!0,clientX:f,clientY:p,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",l)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",l)),o.dispatchEvent(new MouseEvent("click",l)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let c=!1,d=null;const u=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const v of u){const y=v.getAttribute("aria-controls")||"",h=v.id||"";if(y.toUpperCase().includes("IMAGE")||h.toUpperCase().includes("IMAGE")){d=v,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${y})`);break}}if(!d)for(const v of document.querySelectorAll('[role="tab"]')){const y=v.id||"";if(y.toUpperCase().includes("TRIGGER-IMAGE")){d=v,n(`พบแท็บ Image ผ่าน id: ${y}`);break}}if(!d)for(const v of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const y=(v.textContent||"").trim();if((y==="Image"||y.endsWith("Image")||y==="รูปภาพ"||y==="ภาพ")&&!y.includes("Video")&&!y.includes("วิดีโอ")){d=v,n(`พบแท็บ Image ผ่านข้อความ: "${y}"`);break}}if(d){const v=d.getAttribute("data-state")||"",y=d.getAttribute("aria-selected")||"";if(v==="active"||y==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const h=d.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",r)),await g(80),d.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",r)),d.dispatchEvent(new MouseEvent("click",r)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const b=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const y=(v.textContent||"").trim();if(y===b||y.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const h=v.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",r)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",r)),v.dispatchEvent(new MouseEvent("click",r)),n(`เลือกทิศทาง: ${b}`),await g(400);break}}const T=`x${e}`;for(const v of document.querySelectorAll("button, [role='tab'], [role='option']"))if((v.textContent||"").trim()===T){const h=v.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",r)),await g(80),v.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",r)),v.dispatchEvent(new MouseEvent("click",r)),n(`เลือกจำนวน: ${T}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),o.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",l)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",l)),o.dispatchEvent(new MouseEvent("click",l)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function Wt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let i=null;const o=document.querySelectorAll("button");for(const b of o){const T=(b.textContent||"").trim();if(T.includes("Veo 3.1")&&T.includes("arrow_drop_down")){i=b,n(`พบปุ่ม Veo dropdown: "${T.substring(0,40).trim()}"`);break}}if(!i){for(const b of o)if(b.getAttribute("aria-haspopup")==="menu"){const T=(b.textContent||"").trim();if(T.includes("Veo")){i=b,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${T.substring(0,40).trim()}"`);break}}}if(!i)for(const b of o){const T=(b.textContent||"").trim();if(T.includes("Veo 3.1")&&b.getBoundingClientRect().bottom>window.innerHeight*.7){i=b,n(`พบปุ่ม Veo dropdown (bottom area): "${T.substring(0,40).trim()}"`);break}}if(!i)return A("ไม่พบปุ่ม Veo quality dropdown"),!1;if((i.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const f=i.getBoundingClientRect(),p=f.left+f.width/2,l=f.top+f.height/2,c={bubbles:!0,cancelable:!0,clientX:p,clientY:l,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),i.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",c)),i.dispatchEvent(new MouseEvent("click",c)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let d=!1;const u=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const b of u){const T=b.querySelectorAll("span");for(const v of T)if((v.textContent||"").trim()===e){const h=b.getBoundingClientRect();if(h.width>0&&h.height>0){const r=h.left+h.width/2,$=h.top+h.height/2,N={bubbles:!0,cancelable:!0,clientX:r,clientY:$,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",N)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",N)),b.dispatchEvent(new MouseEvent("click",N)),n(`✅ เลือก "${e}" สำเร็จ`),d=!0;break}}if(d)break;if(!d){const v=(b.textContent||"").trim();if(v.includes(e)&&!v.includes("arrow_drop_down")){const y=b.getBoundingClientRect();if(y.width>0&&y.height>0){const h=y.left+y.width/2,r=y.top+y.height/2,$={bubbles:!0,cancelable:!0,clientX:h,clientY:r,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",$)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",$)),b.dispatchEvent(new MouseEvent("click",$)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),d=!0;break}}}}return d?(await g(600),!0):(A(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),!1)}async function Ut(t){var N,D,z,G;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,i=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=i?i[1]:"unknown",a=Le?"macOS":Ge?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",f=Le?((D=(N=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:N[1])==null?void 0:D.replace(/_/g,"."))||"":Ge&&((z=e.match(/Windows NT ([0-9.]+)/))==null?void 0:z[1])||"",p=navigator.language||"unknown",l=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${f} | Chrome ${o}`),n(`🌐 ภาษา: ${p} | หน้าจอ: ${l} | แพลตฟอร์ม: ${ue}`),n("══════════════════════════════════════════");try{_e(t.theme)}catch{}try{ze()}catch(s){console.warn("Overlay show error:",s)}const c=[],d=[];try{C("settings","active");const s=t.orientation||"horizontal",w=t.outputCount||1,_=await Ht(s,w);c.push(_?"✅ Settings":"⚠️ Settings"),C("settings",_?"done":"error")}catch(s){A(`ตั้งค่าผิดพลาด: ${s.message}`),c.push("⚠️ Settings"),C("settings","error")}try{const s=t.veoQuality||"fast";await Wt(s)?(c.push(`✅ Veo ${s}`),n(`✅ Veo quality: ${s}`)):(c.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(s){A(`Veo quality error: ${s.message}`),c.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const u=()=>{const s=document.querySelectorAll("span, div, p, label");for(const w of s){const _=(w.textContent||"").trim();if(/^\d{1,3}%$/.test(_)){if(_==="100%")return null;const S=w.getBoundingClientRect();if(S.width>0&&S.height>0&&S.top>0&&S.top<window.innerHeight)return _}}return null},b=async s=>{n(`รอการอัพโหลด ${s} เสร็จ...`),await g(2e3);const w=Date.now(),_=6e4;let S="",F=Date.now();const M=15e3;for(;Date.now()-w<_;){const m=u();if(m){if(m!==S)S=m,F=Date.now();else if(Date.now()-F>M){n(`✅ อัพโหลด ${s} — % ค้างที่ ${m} นาน ${M/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}n(`กำลังอัพโหลด: ${m} — รอ...`),await g(1500)}else{n(`✅ อัพโหลด ${s} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}A(`⚠️ อัพโหลด ${s} หมดเวลาหลัง ${_/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){C("upload-char","active");try{const s=await bt(t.characterImage,"character.png");c.push(s?"✅ ตัวละคร":"⚠️ ตัวละคร"),s||d.push("character upload failed"),C("upload-char",s?"done":"error")}catch(s){A(`อัพโหลดตัวละครผิดพลาด: ${s.message}`),c.push("❌ ตัวละคร"),d.push("character upload error"),C("upload-char","error")}await b("character")}else fe("upload-char");if(t.productImage){C("upload-prod","active");try{const s=await bt(t.productImage,"product.png");c.push(s?"✅ สินค้า":"⚠️ สินค้า"),s||d.push("product upload failed"),C("upload-prod",s?"done":"error")}catch(s){A(`อัพโหลดสินค้าผิดพลาด: ${s.message}`),c.push("❌ สินค้า"),d.push("product upload error"),C("upload-prod","error")}await b("product")}else fe("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const T=u();T&&(n(`⚠️ อัพโหลดยังแสดง ${T} — รอเพิ่มเติม...`),await b("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const v=(t.characterImage?1:0)+(t.productImage?1:0);if(v>0){let s=Ee();s<v&&(n(`⏳ เห็นรูปย่อแค่ ${s}/${v} — รอ 3 วินาที...`),await g(3e3),s=Ee()),s>=v?n(`✅ ยืนยันรูปย่ออ้างอิง: ${s}/${v}`):A(`⚠️ คาดว่าจะมี ${v} รูปย่อ แต่พบ ${s} — ดำเนินการต่อ`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{ye(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),C("img-prompt","active"),await g(1e3);const y=ht();y?(await Pe(y,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),C("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),d.push("prompt input not found"),C("img-prompt","error")),await g(800);const h=new Set;document.querySelectorAll("img").forEach(s=>{s.src&&h.add(s.src)}),n(`บันทึกรูปเดิม: ${h.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),C("img-generate","active"),await g(500);const r=mt();if(r){const s=r.getBoundingClientRect(),w=s.left+s.width/2,_=s.top+s.height/2,S={bubbles:!0,cancelable:!0,clientX:w,clientY:_,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",S)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",S)),r.dispatchEvent(new MouseEvent("click",S)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await g(500),r.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",S)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",S)),r.dispatchEvent(new MouseEvent("click",S)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),C("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),d.push("generate button not found"),C("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),C("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const s=()=>{const M=document.querySelectorAll("div, span, p, label, strong, small");for(const m of M){if(m.closest("#netflow-engine-overlay"))continue;const x=(m.textContent||"").trim();if(x.length>10)continue;const P=x.match(/(\d{1,3})\s*%/);if(!P)continue;const I=parseInt(P[1],10);if(I<1||I>100)continue;const E=m.getBoundingClientRect();if(!(E.width===0||E.width>150)&&!(E.top<0||E.top>window.innerHeight))return I}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let w=null,_=-1,S=0;const F=Date.now();for(;!w&&Date.now()-F<18e4;){const M=document.querySelectorAll("img");for(const m of M){if(h.has(m.src)||!(m.alt||"").toLowerCase().includes("generated"))continue;const P=m.getBoundingClientRect();if(P.width>120&&P.height>120&&P.top>0&&P.top<window.innerHeight*.85){const I=m.closest("div");if(I){w=I,n(`พบรูป AI จาก alt="${m.alt}": ${m.src.substring(0,80)}...`);break}}}if(!w)for(const m of M){if(h.has(m.src))continue;const x=m.closest("div"),P=(x==null?void 0:x.textContent)||"";if(P.includes("product.png")||P.includes("character.png")||P.includes(".png")||P.includes(".jpg"))continue;const I=m.getBoundingClientRect();if(I.width>120&&I.height>120&&I.top>0&&I.top<window.innerHeight*.85){const E=m.closest("div");if(E){w=E,n(`พบรูปใหม่ (สำรอง): ${m.src.substring(0,80)}...`);break}}}if(!w){if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const m=gt();if(m){A(`❌ สร้างรูปล้มเหลว: ${m}`),d.push(`image gen failed: ${m}`),C("img-wait","error");break}const x=s();x!==null?(x!==_&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${x}%`),_=x,C("img-wait","active",x)),S=Date.now()):_>30&&Math.floor((Date.now()-S)/1e3)>=3&&n(`🖼️ % หายที่ ${_}% — รูปน่าจะเสร็จแล้ว`),await g(3e3)}}if(!w)A("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),C("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),C("img-wait","done",100);const M=w.getBoundingClientRect(),m=M.left+M.width/2,x=M.top+M.height/2,P={bubbles:!0,cancelable:!0,clientX:m,clientY:x};w.dispatchEvent(new PointerEvent("pointerenter",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseenter",P)),w.dispatchEvent(new PointerEvent("pointerover",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseover",P)),w.dispatchEvent(new PointerEvent("pointermove",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousemove",P)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let I=null;for(const E of["more_vert","more_horiz","more"]){const k=$e(E);for(const R of k){const O=R.getBoundingClientRect();if(O.top>=M.top-20&&O.top<=M.bottom&&O.right>=M.right-150&&O.right<=M.right+20){I=R;break}}if(I)break}if(!I){const E=document.querySelectorAll("button");for(const k of E){const R=k.getBoundingClientRect();if(R.width<50&&R.height<50&&R.top>=M.top-10&&R.top<=M.top+60&&R.left>=M.right-80){const O=k.querySelectorAll("i");for(const V of O)if((((G=V.textContent)==null?void 0:G.trim())||"").includes("more")){I=k;break}if(I)break;const L=k.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){I=k;break}}}}if(!I)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const E=I.getBoundingClientRect(),k=E.left+E.width/2,R=E.top+E.height/2,O={bubbles:!0,cancelable:!0,clientX:k,clientY:R,button:0};I.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mousedown",O)),await g(80),I.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),I.dispatchEvent(new MouseEvent("mouseup",O)),I.dispatchEvent(new MouseEvent("click",O)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let L=null;const V=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const q of V){const W=(q.textContent||"").trim();if(W.includes("ทำให้เป็นภาพเคลื่อนไหว")||W.includes("Animate")||W.includes("animate")){L=q;break}}if(!L)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const q=L.getBoundingClientRect(),W=q.left+q.width/2,oe=q.top+q.height/2,B={bubbles:!0,cancelable:!0,clientX:W,clientY:oe,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",B)),await g(80),L.dispatchEvent(new PointerEvent("pointerup",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",B)),L.dispatchEvent(new MouseEvent("click",B)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),C("animate","done"),await g(3e3)}}}}catch(s){A(`ขั้น 4 ผิดพลาด: ${s.message}`),c.push("⚠️ Animate")}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{ye(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),C("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let s=!1;const w=document.querySelectorAll("button, span, div");for(const F of w){const M=(F.textContent||"").trim(),m=F.getBoundingClientRect();if((M==="วิดีโอ"||M==="Video"||M.includes("วิดีโอ"))&&m.bottom>window.innerHeight*.7){s=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}s||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await g(1e3);const _=ht();_?(await Pe(_,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),C("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),d.push("video prompt input not found"),C("vid-prompt","error")),await g(1e3),C("vid-generate","active");const S=mt();if(S){const F=S.getBoundingClientRect(),M=F.left+F.width/2,m=F.top+F.height/2,x={bubbles:!0,cancelable:!0,clientX:M,clientY:m,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),S.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",x)),S.dispatchEvent(new MouseEvent("click",x)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),C("vid-generate","done"),await g(500),S.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),S.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",x)),S.dispatchEvent(new MouseEvent("click",x)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),d.push("video generate button not found"),C("vid-generate","error")}catch(s){A(`ขั้น 5 ผิดพลาด: ${s.message}`),c.push("⚠️ Video Gen"),d.push(`video gen error: ${s.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),fe("animate"),fe("vid-prompt"),fe("vid-generate"),fe("vid-wait");if(t.videoPrompt){C("vid-wait","active");const s=t.sceneCount||1,w=t.videoScenePrompts||[t.videoPrompt];if(s>1)try{Dt(s)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${s>1?`ต่อ ${s} ฉาก`:"ดาวน์โหลด"} ===`);const _=()=>{const M=document.querySelectorAll("div, span, p, label, strong, small");for(const m of M){if(m.closest("#netflow-engine-overlay"))continue;const x=(m.textContent||"").trim();if(x.length>10)continue;const P=x.match(/(\d{1,3})\s*%/);if(!P)continue;const I=parseInt(P[1],10);if(I<1||I>100)continue;const E=m.getBoundingClientRect();if(!(E.width===0||E.width>150)&&!(E.top<0||E.top>window.innerHeight))return I}return null},S=async(M=6e5)=>{n("รอการสร้างวิดีโอ..."),C("vid-wait","active"),await g(5e3);const m=()=>{const B=document.querySelectorAll("div, span, p, label, strong, small");let H=0;for(const X of B){if(X.closest("#netflow-engine-overlay"))continue;const Q=(X.textContent||"").trim();if(Q.includes("%")&&Q.length<15){const de=X.tagName.toLowerCase(),re=X.className&&typeof X.className=="string"?X.className.split(/\s+/).slice(0,2).join(" "):"",Ie=X.getBoundingClientRect();if(n(`  🔍 "${Q}" ใน <${de}.${re}> ที่ (${Ie.left.toFixed(0)},${Ie.top.toFixed(0)}) w=${Ie.width.toFixed(0)}`),H++,H>=5)break}}H===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},x=Ve();n(x?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),m();const P=Date.now();let I=-1,E=0,k=!1;for(;Date.now()-P<M;){const B=_();if(B!==null){if(B!==I&&(n(`ความคืบหน้าวิดีโอ: ${B}%`),I=B,C("vid-wait","active",B)),E=Date.now(),B>=100){n("✅ ตรวจพบ 100%!"),k=!0;break}}else if(I>30){const H=Math.floor((Date.now()-E)/1e3);if(H>=5){n(`✅ % หายไปที่ ${I}% (หาย ${H} วินาที) — วิดีโอเสร็จ!`),k=!0;break}n(`⏳ % หายที่ ${I}% — ยืนยันใน ${5-H} วินาที...`)}else{const H=Math.floor((Date.now()-P)/1e3);H%15<3&&n(`⏳ รอ... (${H} วินาที) ไม่พบ %`)}if(!k&&I>0&&Ve(!0)&&!x){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${I}% — วิดีโอเสร็จ!`),k=!0;break}if(ce())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(I<1){const H=gt();if(H)return A(`❌ สร้างวิดีโอล้มเหลว: ${H}`),null}await g(3e3)}const R=Ve();if(!R)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),C("vid-wait","error"),null;const O=R;k?(C("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=O.getBoundingClientRect();let V=L.left+L.width/2,q=L.top+L.height/2,W=O;const oe=O.querySelector("video, img, canvas");if(oe){const B=oe.getBoundingClientRect();B.width>50&&B.height>50&&(V=B.left+B.width/2,q=B.top+B.height/2,W=oe,n(`🎯 พบรูปย่อ <${oe.tagName.toLowerCase()}> ในการ์ดที่ (${V.toFixed(0)},${q.toFixed(0)}) ${B.width.toFixed(0)}x${B.height.toFixed(0)}`))}else q=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${V.toFixed(0)},${q.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${V.toFixed(0)}, ${q.toFixed(0)})...`),zt(W);for(let B=0;B<8;B++){const H={bubbles:!0,cancelable:!0,clientX:V+B%2,clientY:q};W.dispatchEvent(new PointerEvent("pointermove",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),W.dispatchEvent(new MouseEvent("mousemove",H)),await g(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:s,scenePrompts:w,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${s} ฉาก, ${w.length} prompts, theme: ${t.theme})`)}catch(B){n(`⚠️ ไม่สามารถบันทึก pending action: ${B.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(W),n("✅ คลิกการ์ดวิดีโอเสร็จ"),O},F=async M=>{const m=M.getBoundingClientRect(),x=m.left+m.width/2,P=m.top+m.height/2,I={bubbles:!0,cancelable:!0,clientX:x,clientY:P,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),M.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",I)),M.dispatchEvent(new MouseEvent("click",I)),await g(50),M.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await S())A("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),C("vid-wait","error");else{c.push("✅ Video Complete"),C("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const m=await new Promise(x=>{chrome.storage.local.get("netflow_pending_action",P=>{if(chrome.runtime.lastError){x(null);return}x((P==null?void 0:P.netflow_pending_action)||null)})});m&&!m._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),m.action==="mute_video"?await wt(m.sceneCount||1,m.scenePrompts||[],m.theme):m.action==="wait_scene_gen_and_download"&&await xt(m.sceneCount||2,m.currentScene||2,m.theme,m.scenePrompts||[]))}}catch(M){A(`ขั้น 6 ผิดพลาด: ${M.message}`),c.push("⚠️ Step6"),d.push(`step 6: ${M.message}`)}}const $=d.length===0;try{ye($?5e3:8e3)}catch(s){console.warn("Overlay complete error:",s)}return{success:$,message:$?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${d.join(", ")}`,step:$?"done":"partial"}}async function wt(t,e=[],i){var N;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{i&&_e(i)}catch{}try{ze(t)}catch(D){n(`⚠️ showOverlay error: ${D.message}`)}try{const D=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const z of D)C(z,"done");t>=2&&C("scene2-prompt","active"),n(`✅ overlay restored: ${D.length} steps done, sceneCount=${t}`)}catch(D){n(`⚠️ overlay restore error: ${D.message}`)}await g(1500);const o=(()=>{for(const D of document.querySelectorAll("button")){const z=D.querySelectorAll("i");for(const s of z){const w=(s.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const _=D.getBoundingClientRect();if(_.width>0&&_.height>0)return D}}const G=(D.getAttribute("aria-label")||"").toLowerCase();if(G.includes("mute")||G.includes("ปิดเสียง")){const s=D.getBoundingClientRect();if(s.width>0&&s.height>0)return D}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");const a=await ut();if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let m=2;m<=t;m++){const x=e[m-1];if(!x){A(`ไม่พบ prompt สำหรับฉากที่ ${m}`);continue}n(`── ฉากที่ ${m}/${t}: วาง prompt + generate ──`);let P=null;const I=Date.now();for(;!P&&Date.now()-I<1e4;){const B=document.querySelectorAll("[data-slate-editor='true']");if(B.length>0&&(P=B[B.length-1]),!P){const H=document.querySelectorAll("[role='textbox'][contenteditable='true']");H.length>0&&(P=H[H.length-1])}P||await g(1e3)}if(!P){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${P.tagName.toLowerCase()}> ${P.className.substring(0,40)}`),await Pe(P,x),n(`วาง prompt ฉาก ${m} (${x.length} ตัวอักษร) ✅`);try{C(`scene${m}-prompt`,"done"),C(`scene${m}-gen`,"active")}catch{}await g(1e3);const E=P.getBoundingClientRect();let k=null,R=1/0;for(const B of document.querySelectorAll("button")){if(B.disabled)continue;const H=B.querySelectorAll("i");let X=!1;for(const re of H)if((re.textContent||"").trim()==="arrow_forward"){X=!0;break}if(!X)continue;const Q=B.getBoundingClientRect();if(Q.width<=0||Q.height<=0)continue;const de=Math.abs(Q.top-E.top)+Math.abs(Q.right-E.right);de<R&&(R=de,k=B)}if(!k)for(const B of document.querySelectorAll("button")){const H=B.querySelectorAll("i");for(const X of H)if((X.textContent||"").trim()==="arrow_forward"){const Q=B.getBoundingClientRect();if(Q.width>0&&Q.height>0){k=B;break}}if(k)break}if(!k){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(B=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:m,scenePrompts:e}},()=>B())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${m}/${t})`),await J(k),n(`คลิก Generate ฉาก ${m} ✅`);try{C(`scene${m}-gen`,"done"),C(`scene${m}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${m} gen เสร็จ ──`),await g(5e3);let O=0,L=0;const V=Date.now(),q=6e5,W=5e3;let oe=!1;for(;Date.now()-V<q;){let B=null;const H=document.querySelectorAll("div, span, p, label, strong, small");for(const X of H){if(X.closest("#netflow-engine-overlay"))continue;const de=(X.textContent||"").trim().match(/^(\d{1,3})%$/);if(de){const re=X.getBoundingClientRect();if(re.width>0&&re.height>0&&re.width<120&&re.height<60){B=parseInt(de[1],10);break}}}if(B!==null){if(B!==O){n(`🎬 ฉาก ${m} ความคืบหน้า: ${B}%`),O=B;try{C(`scene${m}-wait`,"active",B)}catch{}}L=0}else if(O>0){if(L===0)L=Date.now(),n(`🔍 ฉาก ${m}: % หายไป (จาก ${O}%) — กำลังยืนยัน...`);else if(Date.now()-L>=W){n(`✅ ฉาก ${m}: % หายไป ${W/1e3} วินาที — เจนเสร็จ!`),oe=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุด");return}await g(2e3)}oe||A(`ฉาก ${m} หมดเวลา`),n(`✅ ฉาก ${m} เสร็จแล้ว`);try{C(`scene${m}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{C("download","active")}catch{}await g(2e3);const D=Date.now();let z=null;const G=Date.now();for(;!z&&Date.now()-G<1e4;){for(const m of document.querySelectorAll("button")){const x=m.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const P=m.getBoundingClientRect();if(P.width>0&&P.height>0){z=m;break}}}z||await g(1e3)}if(!z){A("ไม่พบปุ่มดาวน์โหลด");return}await J(z),n("คลิกดาวน์โหลดแล้ว ✅");try{C("download","done"),C("upscale","active")}catch{}await g(1500);let s=null;for(let m=0;m<3&&!s;m++){m>0&&n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`);let x=null;const P=Date.now();for(;!x&&Date.now()-P<5e3;){for(const O of document.querySelectorAll("[role='menuitem']"))if((O.textContent||"").trim().includes("Full Video")&&O.querySelector("i")){const V=O.getBoundingClientRect();if(V.width>0&&V.height>0){x=O;break}}x||await g(500)}if(!x){A("ไม่พบ Full Video");continue}const I=x.getBoundingClientRect(),E=I.left+I.width/2,k=I.top+I.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:E,clientY:k})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:E,clientY:k})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:E,clientY:k})),await J(x),n("คลิก/hover Full Video ✅"),await g(2e3);const R=Date.now();for(;!s&&Date.now()-R<8e3;){for(const O of document.querySelectorAll("button[role='menuitem']")){const L=O.querySelectorAll("span");for(const V of L)if((V.textContent||"").trim()==="720p"){const q=O.getBoundingClientRect();if(q.width>0&&q.height>0){s=O;break}}if(s)break}s||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:E,clientY:k})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:E+20,clientY:k}))),await g(500))}}if(!s){A("ไม่พบ 720p");return}await J(s),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const w=Date.now();let _=!1,S=!1;for(;Date.now()-w<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(m.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),_=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(S||(S=!0,n("⏳ กำลังดาวน์โหลด...")))}if(_)break;if(S){let m=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),_=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await g(2e3)}if(!_){A("ดาวน์โหลดหมดเวลา");return}try{C("upscale","done",100),C("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let F=!1;const M=Date.now();for(;Date.now()-M<6e4&&!F;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},x=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),F=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${x==null?void 0:x.message}`),m()})})}catch(m){A(`ตรวจสอบผิดพลาด: ${m.message}`)}F||await g(3e3)}F||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{C("open","done"),ye(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Ne(a),Fe(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const f=(D,z="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const G of document.querySelectorAll(z)){const s=(G.textContent||"").trim();if(s.includes(D)&&s.length<100){const w=G.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return G}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let p=null;const l=Date.now();for(;!p&&Date.now()-l<1e4;){for(const D of document.querySelectorAll("button, [role='button']")){const z=(D.textContent||"").trim(),G=z.toLowerCase();if((G.includes("download")||G.includes("ดาวน์โหลด"))&&z.length<80){const s=D.getBoundingClientRect();if(s.width>0&&s.height>0){p=D;break}}}if(!p)for(const D of document.querySelectorAll("button")){const z=(D.getAttribute("aria-label")||"").toLowerCase();if(z.includes("download")||z.includes("ดาวน์")){const G=D.getBoundingClientRect();if(G.width>0&&G.height>0){p=D;break}}}p||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!p){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(p.textContent||"").trim().substring(0,40)}"`),await J(p),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const c=Date.now();let d=null;const u=Date.now();for(;!d&&Date.now()-u<5e3;)d=f("1080p"),d||(n("รอ 1080p..."),await g(500));if(!d){A("ไม่พบ 1080p");return}await J(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const b=Date.now();let T=!1,v=!1,y=0;const h=3e3;for(;Date.now()-b<3e5;){const z=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(z.includes("upscaling complete")||z.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),T=!0;break}for(const s of document.querySelectorAll("div, span, p")){const w=(s.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(N=s.textContent)==null?void 0:N.trim()}")`),T=!0;break}}if(T)break;if(z.includes("upscaling your video")||z.includes("กำลังอัปสเกล")){v=!0,y=0;const s=Math.floor((Date.now()-b)/1e3);n(`⏳ กำลังอัปสเกล... (${s} วินาที)`)}else if(v){if(y===0)y=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-y>=h){n(`✅ ข้อความ Upscaling หายไป ${h/1e3} วินาที — เสร็จ!`),T=!0;break}}else{const s=Math.floor((Date.now()-b)/1e3);s%10<3&&n(`⏳ รอ Upscale... (${s} วินาที)`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!T){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let r=!1;const $=Date.now();for(;Date.now()-$<6e4&&!r;){try{await new Promise(D=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},z=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):z!=null&&z.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${z.message}`),r=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${z==null?void 0:z.message}`),D()})})}catch(D){A(`ตรวจสอบผิดพลาด: ${D.message}`)}r||await g(3e3)}r||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Ne(a),Fe(2e3)}async function xt(t=2,e=2,i,o=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{i&&_e(i)}catch{}try{ze(t)}catch(s){n(`⚠️ showOverlay error: ${s.message}`)}try{const s=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)s.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&s.push(`scene${w}-wait`);for(const w of s)C(w,"done");C(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${s.length} steps done (scene ${e}/${t} navigate)`)}catch(s){n(`⚠️ overlay restore error: ${s.message}`)}await g(2e3);const a=(()=>{for(const s of document.querySelectorAll("button")){const w=s.querySelectorAll("i");for(const _ of w){const S=(_.textContent||"").trim();if(S==="volume_up"||S==="volume_off"||S==="volume_mute"){const F=s.getBoundingClientRect();if(F.width>0&&F.height>0)return s}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let f=0,p=0;const l=Date.now(),c=6e5,d=5e3;let u=!1,b=0;for(;Date.now()-l<c;){let s=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const _ of w){if(_.closest("#netflow-engine-overlay"))continue;const F=(_.textContent||"").trim().match(/^(\d{1,3})%$/);if(F){const M=_.getBoundingClientRect();if(M.width>0&&M.height>0&&M.width<120&&M.height<60){s=parseInt(F[1],10);break}}}if(s!==null){if(b=0,s!==f){n(`🎬 scene ${e} ความคืบหน้า: ${s}%`),f=s;try{C(`scene${e}-wait`,"active",s)}catch{}}p=0}else if(f>0){if(p===0)p=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${f}%) — กำลังยืนยัน...`);else if(Date.now()-p>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),u=!0;break}}else if(b++,b>=15){const _=document.querySelectorAll("video");let S=!1;for(const F of _)if(F.readyState>=2&&!F.paused&&F.getBoundingClientRect().width>200){S=!0;break}if(S){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),u=!0;break}if(b>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),u=!0;break}}await g(2e3)}u||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{C(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&o.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let s=e+1;s<=t;s++){const w=o[s-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${s} — ข้าม`);continue}n(`── ฉากที่ ${s}/${t}: วาง prompt + generate (pending recovery) ──`);let _=null;const S=Date.now();for(;!_&&Date.now()-S<1e4;){const R=document.querySelectorAll("[data-slate-editor='true']");if(R.length>0&&(_=R[R.length-1]),!_){const O=document.querySelectorAll("[role='textbox'][contenteditable='true']");O.length>0&&(_=O[O.length-1])}_||await g(1e3)}if(!_){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${s}`);break}await Pe(_,w),n(`วาง prompt ฉาก ${s} (${w.length} ตัวอักษร) ✅`);try{C(`scene${s}-prompt`,"done"),C(`scene${s}-gen`,"active")}catch{}await g(1e3);const F=_.getBoundingClientRect();let M=null,m=1/0;for(const R of document.querySelectorAll("button")){if(R.disabled)continue;const O=R.querySelectorAll("i");let L=!1;for(const W of O)if((W.textContent||"").trim()==="arrow_forward"){L=!0;break}if(!L)continue;const V=R.getBoundingClientRect();if(V.width<=0||V.height<=0)continue;const q=Math.abs(V.top-F.top)+Math.abs(V.right-F.right);q<m&&(m=q,M=R)}if(!M)for(const R of document.querySelectorAll("button")){const O=R.querySelectorAll("i");for(const L of O)if((L.textContent||"").trim()==="arrow_forward"){const V=R.getBoundingClientRect();if(V.width>0&&V.height>0){M=R;break}}if(M)break}if(!M){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${s}`);break}await new Promise(R=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:s,scenePrompts:o}},()=>R())}),await J(M),n(`คลิก Generate ฉาก ${s} ✅`);try{C(`scene${s}-gen`,"done"),C(`scene${s}-wait`,"active")}catch{}await g(5e3);let x=0,P=0;const I=Date.now();let E=!1,k=0;for(;Date.now()-I<6e5;){let R=null;const O=document.querySelectorAll("div, span, p, label, strong, small");for(const L of O){if(L.closest("#netflow-engine-overlay"))continue;const q=(L.textContent||"").trim().match(/^(\d{1,3})%$/);if(q){const W=L.getBoundingClientRect();if(W.width>0&&W.height>0&&W.width<120&&W.height<60){R=parseInt(q[1],10);break}}}if(R!==null){if(k=0,R!==x){n(`🎬 ฉาก ${s} ความคืบหน้า: ${R}%`),x=R;try{C(`scene${s}-wait`,"active",R)}catch{}}P=0}else if(x>0){if(P===0)P=Date.now();else if(Date.now()-P>=5e3){n(`✅ ฉาก ${s}: เจนเสร็จ!`),E=!0;break}}else if(k++,k>=15){const L=document.querySelectorAll("video");let V=!1;for(const q of L)if(q.readyState>=2&&!q.paused&&q.getBoundingClientRect().width>200){V=!0;break}if(V){n(`✅ ฉาก ${s}: พบวิดีโอเล่นอยู่ — เสร็จ`),E=!0;break}if(k>=30){n(`✅ ฉาก ${s}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),E=!0;break}}await g(2e3)}E||n(`⚠️ ฉาก ${s} หมดเวลา`);try{C(`scene${s}-wait`,"done",100)}catch{}n(`✅ ฉาก ${s} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);try{C("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const T=Date.now();let v=null;const y=Date.now();for(;!v&&Date.now()-y<1e4;){for(const s of document.querySelectorAll("button")){const w=s.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const _=s.getBoundingClientRect();if(_.width>0&&_.height>0){v=s;break}}}v||await g(1e3)}if(!v){A("ไม่พบปุ่มดาวน์โหลด");return}await J(v),n("คลิกดาวน์โหลดแล้ว ✅");try{C("download","done"),C("upscale","active")}catch{}await g(1500);let h=null;for(let s=0;s<3&&!h;s++){s>0&&n(`🔄 ลองหา 720p ครั้งที่ ${s+1}...`);let w=null;const _=Date.now();for(;!w&&Date.now()-_<5e3;){for(const x of document.querySelectorAll("[role='menuitem']"))if((x.textContent||"").trim().includes("Full Video")&&x.querySelector("i")){const I=x.getBoundingClientRect();if(I.width>0&&I.height>0){w=x;break}}w||await g(500)}if(!w){A("ไม่พบ Full Video");continue}const S=w.getBoundingClientRect(),F=S.left+S.width/2,M=S.top+S.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:F,clientY:M})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:M})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F,clientY:M})),await J(w),n("คลิก/hover Full Video ✅"),await g(2e3);const m=Date.now();for(;!h&&Date.now()-m<8e3;){for(const x of document.querySelectorAll("button[role='menuitem']")){const P=x.querySelectorAll("span");for(const I of P)if((I.textContent||"").trim()==="720p"){const E=x.getBoundingClientRect();if(E.width>0&&E.height>0){h=x;break}}if(h)break}h||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:M})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F+20,clientY:M}))),await g(500))}}if(!h){A("ไม่พบ 720p");return}await J(h),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const r=Date.now();let $=!1,N=!1;for(;Date.now()-r<3e5;){for(const s of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(s.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),$=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(N||(N=!0,n("⏳ กำลังดาวน์โหลด...")))}if($)break;if(N){let s=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){s=!0;break}if(!s){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),$=!0;break}}await g(2e3)}if(!$){A("ดาวน์โหลดหมดเวลา");return}try{C("upscale","done",100),C("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let D=!1;const z=Date.now();for(;Date.now()-z<6e4&&!D;){try{await new Promise(s=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:T},w=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),D=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${w==null?void 0:w.message}`),s()})})}catch(s){A(`ตรวจสอบผิดพลาด: ${s.message}`)}D||await g(3e3)}D||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{C("open","done"),ye(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══");const G=await ut();Ne(G),Fe(2e3)}async function Yt(){try{const t=await new Promise(f=>{chrome.storage.local.get("netflow_pending_action",p=>{if(chrome.runtime.lastError){f(null);return}f((p==null?void 0:p.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const i=Date.now()-t.timestamp;if(i>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=o,await new Promise(f=>{chrome.storage.local.set({netflow_pending_action:t},()=>f())}),await g(300),!await new Promise(f=>{chrome.storage.local.get("netflow_pending_action",p=>{const l=p==null?void 0:p.netflow_pending_action;f((l==null?void 0:l._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(i/1e3)} วินาที)`),t.action==="mute_video"?await wt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await xt(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,i)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),i({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Ut(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof qe||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Se("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{pt()}catch{}}else console.error("[Netflow AI] Generate error:",o)}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,i({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return i({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return i({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const o=Ft();if(!o){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=o.getBoundingClientRect(),f=a.left+a.width/2,p=a.top+a.height/2;n(`การ์ดรูปที่ (${f.toFixed(0)}, ${p.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let l=0;l<2;l++){const c=document.elementFromPoint(f,p);c?(await J(c),n(`คลิก ${l+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await J(o),n(`คลิก ${l+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Yt()})();
