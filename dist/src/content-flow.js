(function(){"use strict";const pe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Z=pe.green,Ce=null;function He(t){t&&pe[t]&&(Ce=t,Z=pe[t],ot(),requestAnimationFrame(()=>kt()))}function Ft(){if(Ce&&pe[Ce])return pe[Ce];try{const t=localStorage.getItem("netflow_app_theme");if(t&&pe[t])return pe[t]}catch{}return pe.green}let ne=0,oe=255,ie=65;function ot(){const t=Z.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}const it='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',at='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let V=null,J=null,K=null,rt=0,Re=null,Te=null,Oe=null,Ue=0,ue=!1,ce=null,Se=null,Me=null,we=1,Y=[];function Fe(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let a=2;a<=t;a++)e.push({stepId:`scene${a}-prompt`,label:`ฉาก ${a} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${a}-gen`,label:`ฉาก ${a} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${a}-wait`,label:`ฉาก ${a} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const se=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=Fe(1);function zt(t){const e=t.rgb,a=t.accentRgb,r=t.doneRgb,i=t.hex,d=t.accentHex,l=t.doneHex,c=(()=>{const b=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const o=u=>Math.min(255,u+80);return`#${[1,2,3].map(u=>o(parseInt(b[u],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const b=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const o=u=>Math.min(255,u+60);return`#${[1,2,3].map(u=>o(parseInt(b[u],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),k=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,$=p?parseInt(p[1],16)/k:0,I=p?parseInt(p[2],16)/k:1,z=p?parseInt(p[3],16)/k:.25,F=b=>`${Math.round($*b)}, ${Math.round(I*b)}, ${Math.round(z*b)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${F(18)},0.94) 0%, rgba(${F(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${F(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${F(180)},0.05),
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
            0 0 200px rgba(${F(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${F(180)},0.08),
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
.nf-term-line.nf-term-done { color: rgba(${r}, 0.85); }
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
    background: rgba(${r}, 0.12);
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
    background: linear-gradient(180deg, rgba(${F(5)},0.95) 0%, rgba(${F(12)},0.98) 100%);
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
    border-top: 1px solid rgba(${a},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${F(6)},0.75) 0%, rgba(${F(3)},0.92) 100%);
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
    background: rgba(${F(8)}, 0.88);
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
    box-shadow: 0 0 20px rgba(${r}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${r}, 0.5), transparent);
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
    color: rgba(${r}, 0.85);
    text-shadow:
        0 0 4px rgba(${r},0.5),
        0 0 12px rgba(${r},0.3);
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
    box-shadow: 0 0 5px rgba(${r}, 0.5);
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
    background: linear-gradient(90deg, ${i}, ${d});
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
    background: rgba(${F(8)},0.8);
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
    background: rgba(${F(8)}, 0.9);
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
    color: ${c};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${r},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${r},0.5);
    text-shadow: 0 0 4px rgba(${r},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${r},0.4),
        0 0 8px rgba(${r},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${l};
    box-shadow: 0 0 5px rgba(${r},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${r},0.1);
    color: ${s};
    text-shadow: 0 0 4px rgba(${r},0.3);
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

    `}function We(){K||(K=document.createElement("style"),K.id="netflow-overlay-styles",K.textContent=zt(Z),document.head.appendChild(K))}function st(t){t.innerHTML="",Y.forEach((e,a)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${e.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${a+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(r)})}function lt(){const t=document.getElementById("nf-terminal");if(!t)return;st(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function ct(t,e){let c="";for(let I=0;I<20;I++){const z=I/20*Math.PI*2,F=(I+.2)/20*Math.PI*2,b=(I+.5)/20*Math.PI*2,o=(I+.8)/20*Math.PI*2,u=(I+1)/20*Math.PI*2;c+=`${I===0?"M":"L"}${(120+100*Math.cos(z)).toFixed(1)},${(120+100*Math.sin(z)).toFixed(1)} `,c+=`L${(120+100*Math.cos(F)).toFixed(1)},${(120+100*Math.sin(F)).toFixed(1)} `,c+=`L${(120+112*Math.cos(b)).toFixed(1)},${(120+112*Math.sin(b)).toFixed(1)} `,c+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,c+=`L${(120+100*Math.cos(u)).toFixed(1)},${(120+100*Math.sin(u)).toFixed(1)} `}c+="Z";const s=14,p=72,k=62;let $="";for(let I=0;I<s;I++){const z=I/s*Math.PI*2,F=(I+.25)/s*Math.PI*2,b=(I+.75)/s*Math.PI*2,o=(I+1)/s*Math.PI*2;$+=`${I===0?"M":"L"}${(120+k*Math.cos(z)).toFixed(1)},${(120+k*Math.sin(z)).toFixed(1)} `,$+=`L${(120+p*Math.cos(F)).toFixed(1)},${(120+p*Math.sin(F)).toFixed(1)} `,$+=`L${(120+p*Math.cos(b)).toFixed(1)},${(120+p*Math.sin(b)).toFixed(1)} `,$+=`L${(120+k*Math.cos(o)).toFixed(1)},${(120+k*Math.sin(o)).toFixed(1)} `}return $+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${c}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${$}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${k}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Nt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ce=document.createElement("canvas"),ce.id="nf-matrix-canvas",t.appendChild(ce);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let f=1;f<=5;f++){const x=document.createElement("div");x.className=`nf-ambient-orb nf-orb-${f}`,t.appendChild(x)}const a=document.createElement("div");a.className="nf-pat-data",t.appendChild(a);const r=document.createElement("div");r.className="nf-pat-diag-a",t.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",t.appendChild(d);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const c=document.createElement("div");c.className="nf-pat-binary",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const k=document.createElement("div");k.className="nf-pat-wave-h",t.appendChild(k);const $=document.createElement("div");$.className="nf-pat-radar",t.appendChild($);const I=document.createElement("div");I.className="nf-pat-ripple-1",t.appendChild(I);const z=document.createElement("div");z.className="nf-pat-ripple-2",t.appendChild(z);const F=document.createElement("div");F.className="nf-pat-techscan",t.appendChild(F);const b=document.createElement("div");b.className="nf-center-glow",t.appendChild(b);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const u=document.createElement("div");u.className="nf-crt-scanlines",t.appendChild(u);const E=document.createElement("div");E.className="nf-vignette",t.appendChild(E);for(let f=0;f<3;f++){const x=document.createElement("div");x.className="nf-pulse-ring",t.appendChild(x)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(f=>{const x=document.createElement("div");x.className=`nf-corner-deco ${f}`,t.appendChild(x)});const O=document.createElement("button");O.className="nf-stop-btn",O.innerHTML='<span class="nf-stop-icon"></span> หยุด',O.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",O.onclick=()=>{var f;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((f=chrome.runtime)!=null&&f.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(O);const C=document.createElement("div");C.className="nf-layout";const _=document.createElement("div");_.className="nf-core-monitor",_.id="nf-core-monitor";const w=document.createElement("div");w.className="nf-core-header",w.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,_.appendChild(w);const g=document.createElement("div");g.className="nf-terminal",g.id="nf-terminal",st(g),_.appendChild(g);const h=document.createElement("div");h.className="nf-engine-core",h.id="nf-engine-core";const T=document.createElement("div");T.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(f=>{const x=document.createElement("div");x.className=`nf-frame-corner ${f}`,T.appendChild(x)}),h.appendChild(T);const B="http://www.w3.org/2000/svg",v=document.createElementNS(B,"svg");v.setAttribute("class","nf-engine-waves"),v.setAttribute("viewBox","0 0 560 140"),v.setAttribute("preserveAspectRatio","none"),v.id="nf-engine-waves";for(let f=0;f<4;f++){const x=document.createElementNS(B,"path");x.setAttribute("fill","none"),x.setAttribute("stroke-width",f<2?"1.5":"1"),x.setAttribute("stroke",f<2?`rgba(${Z.rgb},${.14+f*.1})`:`rgba(${Z.accentRgb},${.1+(f-2)*.08})`),x.setAttribute("data-wave-idx",String(f)),v.appendChild(x)}h.appendChild(v);const y=document.createElement("div");y.className="nf-engine-brand-inner",y.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ct(Z.rgb,Z.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ct(Z.rgb,Z.accentRgb)}
        </div>
    `,h.appendChild(y);const M=document.createElement("div");M.className="nf-engine-stats",M.id="nf-engine-stats",M.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([f,x,R])=>`<div class="nf-stat-item"><span class="nf-stat-label">${f}</span><span class="nf-stat-val" id="${x}">${R}</span></div>`).join(""),h.appendChild(M),_.appendChild(h),C.appendChild(_);const S=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];se.forEach((f,x)=>{const R=Lt(f);R.classList.add(S[x]),R.id=`nf-mod-${f.id}`,C.appendChild(R)}),t.appendChild(C);for(let f=0;f<30;f++){const x=document.createElement("div");x.className="nf-particle",x.style.left=`${5+Math.random()*90}%`,x.style.bottom=`${Math.random()*40}%`,x.style.animationDuration=`${3+Math.random()*5}s`,x.style.animationDelay=`${Math.random()*4}s`;const R=.3+Math.random()*.4,G=.7+Math.random()*.3;x.style.background=`rgba(${Math.floor(ne*G)}, ${Math.floor(oe*G)}, ${Math.floor(ie*G)}, ${R})`,x.style.width=`${1+Math.random()*2}px`,x.style.height=x.style.width,t.appendChild(x)}return t}function Lt(t){const e=document.createElement("div");e.className="nf-module";const a=document.createElement("div");a.className="nf-mod-header",a.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(a),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(d)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(r),e}function qt(){rt=Date.now(),Re=setInterval(()=>{const t=Math.floor((Date.now()-rt)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${e}:${a}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${a}`)},1e3)}function dt(){Re&&(clearInterval(Re),Re=null)}const Vt=120,pt=160,ft=.4;let xe=null,ut=0,gt=0,mt=0,_e=[];function Gt(t,e){_e=[];for(let a=0;a<Vt;a++){const r=Math.random();let i;r<.22?i=0:r<.4?i=1:r<.55?i=2:r<.68?i=3:r<.84?i=4:i=5;const d=Math.random()*t,l=Math.random()*e,c=50+Math.random()*220,s=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);_e.push({x:i===0?Math.random()*t:d+Math.cos(s)*c,y:i===0?Math.random()*e:l+Math.sin(s)*c,vx:(Math.random()-.5)*ft,vy:(Math.random()-.5)*ft,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:l,oRadius:c,oAngle:s,oSpeed:p})}}function Ht(){if(!ce)return;const t=ce;if(Se=t.getContext("2d"),!Se)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,_e.length===0&&Gt(t.width,t.height)};e(),window.addEventListener("resize",e);let a=null,r=0,i=0,d=!1;function l(){if(!Se||!ce){Me=null;return}if(Me=requestAnimationFrame(l),d=!d,d)return;const c=Se,s=ce.width,p=ce.height;c.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,c.fillRect(0,0,s,p),(!a||r!==s||i!==p)&&(r=s,i=p,a=c.createRadialGradient(s*.5,p*.5,0,s*.5,p*.5,Math.max(s,p)*.6),a.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),a.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=a,c.fillRect(0,0,s,p);const k=_e,$=k.length,I=pt*pt;for(let b=0;b<$;b++){const o=k[b];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>s&&(o.x=s,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>p&&(o.y=p,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const u=o.oAngle,E=o.oRadius*.7;o.x=o.oCx+E*Math.cos(u),o.y=o.oCy+E*Math.sin(u)*Math.cos(u),o.oCx+=Math.sin(u*.15)*.12,o.oCy+=Math.cos(u*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const u=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*u,o.y=o.oCy+Math.sin(o.oAngle)*u,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=s+30:o.x>s+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const u=o.oRadius+50;o.oCx<-u?o.oCx=s+u:o.oCx>s+u&&(o.oCx=-u),o.oCy<-u?o.oCy=p+u:o.oCy>p+u&&(o.oCy=-u)}}c.beginPath(),c.strokeStyle=`rgba(${ne},${oe},${ie},0.06)`,c.lineWidth=.4;const z=new Path2D;for(let b=0;b<$;b++){const o=k[b];for(let u=b+1;u<$;u++){const E=k[u],O=o.x-E.x,C=o.y-E.y,_=O*O+C*C;_<I&&(1-_/I<.4?(c.moveTo(o.x,o.y),c.lineTo(E.x,E.y)):(z.moveTo(o.x,o.y),z.lineTo(E.x,E.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${ne},${oe},${ie},0.18)`,c.lineWidth=.8,c.stroke(z),!xe||ut!==ne||gt!==oe||mt!==ie){xe=document.createElement("canvas");const b=48;xe.width=b,xe.height=b;const o=xe.getContext("2d"),u=o.createRadialGradient(b/2,b/2,0,b/2,b/2,b/2);u.addColorStop(0,`rgba(${ne},${oe},${ie},0.9)`),u.addColorStop(.3,`rgba(${ne},${oe},${ie},0.35)`),u.addColorStop(1,`rgba(${ne},${oe},${ie},0)`),o.fillStyle=u,o.fillRect(0,0,b,b),ut=ne,gt=oe,mt=ie}const F=xe;for(let b=0;b<$;b++){const o=k[b],u=.6+.4*Math.sin(o.pulsePhase),E=o.radius*5*(.8+u*.4);c.globalAlpha=.5+u*.4,c.drawImage(F,o.x-E/2,o.y-E/2,E,E)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let b=0;b<$;b++){const o=k[b];if(o.radius>2){const u=.6+.4*Math.sin(o.pulsePhase),E=o.radius*(.8+u*.4)*.35;c.moveTo(o.x+E,o.y),c.arc(o.x,o.y,E,0,Math.PI*2)}}c.fill()}l()}function Ut(){Me!==null&&(cancelAnimationFrame(Me),Me=null),ce=null,Se=null,_e=[]}let Pe=null;const ze=560,Wt=140,ht=ze/2,bt=Wt/2,wt=[];for(let t=0;t<=ze;t+=8){const e=Math.abs(t-ht)/ht;wt.push(Math.pow(Math.min(1,e*1.6),.6))}const Yt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/ze,off:t*.6,spd:.7+t*.12}));let Ye=!1;function xt(){if(Te=requestAnimationFrame(xt),Ye=!Ye,Ye)return;if(Ue+=.07,!Pe){const e=document.getElementById("nf-engine-waves");if(!e){Te=null;return}Pe=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Pe.length;e++){const a=Yt[e],r=Ue*a.spd+a.off;t.length=0,t.push(`M 0 ${bt}`);let i=0;for(let d=0;d<=ze;d+=8){const l=bt+a.amp*wt[i++]*Math.sin(d*a.freq+r);t.push(`L${d} ${l*10+.5|0}`)}Pe[e].setAttribute("d",t.join(" "))}}function Xt(){Ue=0,xt(),Ht(),Oe=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),a=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function yt(){Te!==null&&(cancelAnimationFrame(Te),Te=null),Oe&&(clearInterval(Oe),Oe=null),Pe=null,Ut()}function Ne(){let t=0;const e=Y.filter(p=>p.status!=="skipped").length;for(const p of Y){const k=document.getElementById(`nf-proc-${p.stepId}`);if(!k)continue;k.className="nf-proc-row";const $=k.querySelector(".nf-proc-badge");switch(p.status){case"done":k.classList.add("nf-proc-done"),$&&($.textContent="✅ done"),t++;break;case"active":k.classList.add("nf-proc-active"),$&&($.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":k.classList.add("nf-proc-error"),$&&($.textContent="❌ error");break;case"skipped":k.classList.add("nf-proc-skipped"),$&&($.textContent="— skip");break;default:k.classList.add("nf-proc-waiting"),$&&($.textContent="(queued)")}}const a=Y.findIndex(p=>p.status==="active"),r=a>=0?a+1:t>=e&&e>0?Y.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${r}/${Y.length}`);const d=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(d&&(d.textContent="COMPLETE",d.style.color=Z.doneHex),l&&(l.style.background=Z.doneHex,l.style.boxShadow=`0 0 8px rgba(${Z.doneRgb},0.7)`)):Y.some(k=>k.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(k=>k.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=Z.hex,d.style.textShadow=`0 0 10px rgba(${Z.rgb},0.5)`);const c=document.getElementById("nf-terminal"),s=c==null?void 0:c.querySelector(".nf-proc-active");s&&c&&s.scrollIntoView({behavior:"smooth",block:"center"})}function vt(){J&&J.isConnected||(We(),J=document.createElement("button"),J.id="nf-toggle-btn",J.className="nf-toggle-visible",J.innerHTML=ue?it:at,J.title="ซ่อน/แสดง Netflow Overlay",J.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",J.onclick=()=>$t(),document.body.appendChild(J))}function $t(){V&&(vt(),ue?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),V.style.opacity="1",V.style.pointerEvents="auto",J&&(J.innerHTML=at),ue=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),V.style.opacity="0",V.style.pointerEvents="none",J&&(J.innerHTML=it),ue=!0))}const Et={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function kt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Ce;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const a=Et[e]||Et.green;let r;try{r=chrome.runtime.getURL(a)}catch{r=`/${a}`}const i=Z.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${r}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Xe(t=1){if(Z=Ft(),ot(),V&&V.isConnected){V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!K||!K.isConnected)&&(K=null,We()),setTimeout(()=>{if(V)try{K!=null&&K.sheet&&K.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200);for(const e of se)for(const a of e.steps)a.status="waiting",a.progress=a.progress!==void 0?0:void 0;we=t,Y=Fe(t),lt();for(const e of se)je(e);if(Le(),Ne(),!V.querySelector(".nf-stop-btn")){const e=document.createElement("button");e.className="nf-stop-btn",e.innerHTML='<span class="nf-stop-icon"></span> หยุด',e.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",e.onclick=()=>{var a;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((a=chrome.runtime)!=null&&a.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},V.appendChild(e)}ue&&$t();return}V&&!V.isConnected&&(V=null),K&&(K.remove(),K=null),We();for(const e of se)for(const a of e.steps)a.status="waiting",a.progress=a.progress!==void 0?0:void 0;if(we=t,Y=Fe(t),t>1){const e=se.find(r=>r.id==="video");if(e){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)r.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),r.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),r.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=r}const a=se.find(r=>r.id==="render");if(a){const r=a.steps.find(d=>d.id==="download");r&&(r.label="ดาวน์โหลด 720p");const i=a.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}V=Nt(),V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(V),V.classList.add("nf-visible"),ue=!1,vt(),qt(),Xt(),requestAnimationFrame(()=>kt()),setTimeout(()=>{if(V)try{K!=null&&K.sheet&&K.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200)}function Ct(){dt(),yt(),ue=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),J&&(J.remove(),J=null)}const jt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Kt(t,e,a){const r=Y.findIndex($=>$.status==="active"),i=Y.filter($=>$.status==="done").length,d=Y.length,l=r>=0?r+1:i>=d?d:i,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${l}/${d}`);let s=1;for(const $ of Y)if($.status==="active"||$.status==="done")if($.stepId.startsWith("scene")){const I=$.stepId.match(/^scene(\d+)-/);I&&(s=Math.max(s,parseInt(I[1],10)))}else($.stepId==="download"||$.stepId==="upscale"||$.stepId==="open")&&(s=we);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=we>1?`${s}/${we}`:"1/1"),e==="active"){const $=document.getElementById("nf-stat-status"),I=jt[t]||t.toUpperCase();$&&($.textContent=I)}else if(e==="done"&&i>=d){const $=document.getElementById("nf-stat-status");$&&($.textContent="COMPLETE")}else if(e==="error"){const $=document.getElementById("nf-stat-status");$&&($.textContent="ERROR")}const k=document.getElementById("nf-stat-progress");k&&(a!==void 0&&a>0?k.textContent=`${Math.min(100,a)}%`:e==="active"&&(k.textContent="—"))}function P(t,e,a){if(!V)return;for(const i of se)for(const d of i.steps)d.id===t&&(d.status=e,a!==void 0&&(d.progress=a));for(const i of Y)i.stepId===t&&(i.status=e,a!==void 0&&(i.progress=a));const r=document.getElementById(`nf-step-${t}`);if(r&&(r.className="nf-step",e==="active"?r.classList.add("nf-step-active"):e==="done"?r.classList.add("nf-step-done"):e==="error"&&r.classList.add("nf-step-error")),Kt(t,e,a),a!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,a)}%`)}Le(),Ne()}function ye(t){P(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Ie(t=4e3){dt(),yt(),Le(),Ne(),setTimeout(()=>Ct(),t)}function Le(){for(const t of se){const e=t.steps.filter(s=>s.status!=="skipped").length,a=t.steps.filter(s=>s.status==="done").length,r=t.steps.some(s=>s.status==="active"),i=e>0?Math.round(a/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):r&&c.classList.add("nf-active"))}}function Qt(t){var r,i,d,l;we=t;const e=new Map;for(const c of Y)e.set(c.stepId,{status:c.status,progress:c.progress});Y=Fe(t);for(const c of Y){const s=e.get(c.stepId);s&&(c.status=s.status,s.progress!==void 0&&(c.progress=s.progress))}if(lt(),t>1){const c=se.find(s=>s.id==="video");if(c){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=c.steps.find(p=>p.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=c.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(p=>p.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)s.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),s.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),s.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});c.steps=s,je(c)}}const a=se.find(c=>c.id==="render");if(a&&t>1){const c=a.steps.find(p=>p.id==="download");c&&(c.label="ดาวน์โหลด 720p");const s=a.steps.find(p=>p.id==="upscale");s&&(s.label="Full Video"),je(a)}Le(),Ne()}function je(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(d)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(r)}function Ae(t){t.replace(/^\[Netflow AI\]\s*/,"")}let ve=null,ge=null;const Jt=new Promise(t=>{ge=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(ve=t.tabId,console.log(`[Netflow AI] Tab ID: ${ve}`)),ge&&(ge(ve),ge=null)})}catch{ge&&(ge(null),ge=null)}function de(){return ve?`netflow_pending_action_${ve}`:"netflow_pending_action"}function Tt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ae(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Ae(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Ke(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Qe(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){i(!1);return}i(!!(d!=null&&d.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const d of i){const l=d.src||d.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let a=null,r=0;for(const i of e){let d=i.src||"";if(!d){const s=i.querySelector("source");s&&(d=s.getAttribute("src")||"")}if(!d&&i.currentSrc&&(d=i.currentSrc),!d)continue;if(Q()){a||(a=d,r=1);continue}const l=i.getBoundingClientRect(),c=l.width*l.height;l.width>50&&c>r&&(r=c,a=d)}if(!a)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${a.substring(0,80)}... (area=${r.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(a);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await St(a),a;const d=await i.blob(),l=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((s,p)=>{const k=new FileReader;k.onloadend=()=>s(k.result),k.onerror=()=>p(new Error("FileReader error")),k.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),s()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await St(a)}return a}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function St(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},a=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):a!=null&&a.success?n(`[TikTok] Video pre-fetched via background: ${((a.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${a==null?void 0:a.error}`),e()})})}catch{}}function Je(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const qe=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ze=/Win/i.test(navigator.userAgent),fe=qe?"🍎 Mac":Ze?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${fe}`),window.__VIDEO_COMPLETE_SENT__=!1;class et extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let De=null,me=null,Mt=!1;const $e=new Map;let _t=0;function Zt(){if(De)return De;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return De=new Worker(URL.createObjectURL(t)),De.onmessage=e=>{const a=$e.get(e.data);a&&($e.delete(e.data),a())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),De}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function en(){if(me)return me;if(Mt)return null;try{return me=chrome.runtime.connect({name:"timer"}),me.onMessage.addListener(t=>{const e=$e.get(t.id);e&&($e.delete(t.id),e())}),me.onDisconnect.addListener(()=>{me=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),me}catch{return Mt=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const m=t=>new Promise((e,a)=>{if(window.__NETFLOW_STOP__)return a(new et);let r=!1;const i=()=>{if(!r){if(r=!0,window.__NETFLOW_STOP__)return a(new et);e()}};setTimeout(i,t);const d=Zt();if(d){const s=++_t;$e.set(s,i),d.postMessage({id:s,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const l=en();if(l){const s=++_t;$e.set(s,i),l.postMessage({cmd:"delay",id:s,ms:t});return}const c=setTimeout(i,t);m._lastId=c});function he(){return!!window.__NETFLOW_STOP__}const Q=()=>document.hidden;let Pt=0;async function be(){if(!document.hidden)return!1;const t=Date.now();if(t-Pt<15e3)return!1;Pt=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await m(1500),!0}catch{return!1}}async function tt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const t=Date.now();for(;document.hidden&&Date.now()-t<5e3;)await m(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await m(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function It(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of e){if(r.closest("#netflow-engine-overlay"))continue;const i=(r.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of t)if(i.includes(d))return((a=r.textContent)==null?void 0:a.trim())||d}}return null}async function ee(t){if(Q()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),a=e.left+e.width/2,r=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:r,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await m(50),t.click()}function tn(t){const e=t.getBoundingClientRect(),a=e.left+e.width/2,r=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:r};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function nn(t){const e=[],a=document.querySelectorAll("i");for(const r of a){if((r.textContent||"").trim()!==t)continue;let d=r,l=null,c=1/0;for(let s=0;s<20&&d&&(d=d.parentElement,!(!d||d===document.body));s++){if(Q()){s>=3&&d.children.length>0&&!l&&(l=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const k=p.width*p.height;k<c&&(l=d,c=k)}}l&&!e.includes(l)&&e.push(l)}return e.sort((r,i)=>{const d=r.getBoundingClientRect(),l=i.getBoundingClientRect();return d.left-l.left}),e}function nt(t=!1){const e=[],a=document.querySelectorAll("video");for(const l of a){let c=l.parentElement;for(let s=0;s<10&&c;s++){if(Q()){if(s>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const p=c.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:c,left:p.left});break}c=c.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of r){const c=(l.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let s=l.parentElement;for(let p=0;p<10&&s;p++){if(Q()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const k=s.getBoundingClientRect();if(k.width>120&&k.height>80&&k.width<window.innerWidth*.7&&k.top>=-50&&k.left<window.innerWidth*.75){e.push({el:s,left:k.left});break}s=s.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const c=(l.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let s=l.parentElement;for(let p=0;p<10&&s;p++){if(Q()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const k=s.getBoundingClientRect();if(k.width>120&&k.height>80&&k.width<window.innerWidth*.7&&k.top>=-50&&k.left<window.innerWidth*.75){e.push({el:s,left:k.left});break}s=s.parentElement}}}const d=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(c=>c.el===l));if(d.sort((l,c)=>l.left-c.left),d.length>0){const l=d[0].el,c=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function on(){const t=nn("image");if(t.length>0){const a=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${a.left.toFixed(0)},${a.top.toFixed(0)}) ขนาด ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const a of e){let r=a.parentElement;for(let i=0;i<10&&r;i++){if(Q()){if(i>=3&&r.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const d=r.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),r;r=r.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function an(t,e){var c;const[a,r]=t.split(","),i=((c=a.match(/:(.*?);/))==null?void 0:c[1])||"image/png",d=atob(r),l=new Uint8Array(d.length);for(let s=0;s<d.length;s++)l[s]=d.charCodeAt(s);return new File([l],e,{type:i})}function Ve(t){var r;const e=[],a=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of a)if(((r=i.textContent)==null?void 0:r.trim())===t){const d=i.closest("button");d&&e.push(d)}return e}function rn(){const t=[...Ve("add"),...Ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const r=document.querySelectorAll("button");for(const i of r){const d=(i.textContent||"").trim();if(d!=="+"&&d!=="add")continue;if(Q())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,a=0;for(const r of t){const i=r.getBoundingClientRect();i.y>a&&(a=i.y,e=r)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${a.toFixed(0)}`),e}function At(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Ve(r);let d=null,l=0;for(const c of i){const s=c.getBoundingClientRect();s.y>l&&(l=s.y,d=c)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${l.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,a=0;for(const r of t){if(Q())break;const i=r.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(d?1e3:0);l>a&&(a=l,e=r)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const r of t){const i=(r.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return r}return null}function Dt(){const t=document.querySelectorAll("textarea");for(const r of t)if(Q()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const e=document.querySelectorAll('[contenteditable="true"]');for(const r of e)if(Q()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const a=document.querySelectorAll("input[type='text'], input:not([type])");for(const r of a){const i=r.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return r}return t.length>0?t[t.length-1]:null}async function Ge(t,e){var a,r,i,d;t.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),await m(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await m(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(c),await m(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await m(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await m(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((a=navigator.clipboard)!=null&&a.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=e,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await m(200),document.execCommand("paste"),await m(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let s=0;s<30&&c;s++){const p=c.memoizedProps,k=c.memoizedState;if((r=p==null?void 0:p.editor)!=null&&r.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const $=p.editor;$.selection,$.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=k==null?void 0:k.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),k.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function sn(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const a of e)t.push({input:a,origType:"file"}),a.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function ln(){const t=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog via click (${fe})`);return}return t.call(this)};const e=HTMLInputElement.prototype.showPicker;typeof e=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog via showPicker (${fe})`);return}return e.call(this)});const a=window.showOpenFilePicker;return typeof a=="function"&&(window.showOpenFilePicker=function(...r){return n(`🚫 บล็อก showOpenFilePicker (${fe})`),Promise.reject(new DOMException("Blocked by Netflow","AbortError"))}),n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${fe})`),()=>{HTMLInputElement.prototype.click=t,typeof e=="function"&&(HTMLInputElement.prototype.showPicker=e),typeof a=="function"&&(window.showOpenFilePicker=a),n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function cn(t,e,a){var p,k;const r=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map($=>$.input)];for(const $ of r)!i.includes($)&&$.offsetParent===null&&i.push($);for(const $ of i)$.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${fe})`),!1;let l;if(a&&a.size>0){const $=Array.from(d).filter(I=>!a.has(I));$.length>0?(l=$[$.length-1],n(`เล็งเป้า file input ใหม่ (${$.length} ใหม่, ${d.length} ทั้งหมด)`)):(l=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else l=d[d.length-1];const c=new DataTransfer;c.items.add(e);try{l.files=c.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=l.files)==null?void 0:p.length)??0} ไฟล์)`)}catch($){n(`กำหนด target.files ล้มเหลว: ${$.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:c.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(I){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${I.message}`),!1}}const s=l._valueTracker;s&&(s.setValue(""),n("รีเซ็ต React _valueTracker บน file input"));try{const $=(k=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value"))==null?void 0:k.set;$&&($.call(l,""),n("รีเซ็ต native value setter"))}catch{}return l.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!1})),l.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!1})),l.dispatchEvent(new Event("blur",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${fe}`),!0}function Ee(){let t=0;const e=document.querySelectorAll("img");for(const r of e){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(Q()){t++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&t++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of a){if(r.closest("#netflow-engine-overlay"))continue;if(Q()){t++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&t++}return t}async function Bt(t,e){var k,$,I;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const a=an(t,e);n(`ขนาดไฟล์: ${(a.size/1024).toFixed(1)} KB`);const r=Ee();n(`รูปย่อปัจจุบันใน Prompt Bar: ${r} รูป`);const i=async(z,F=8e3)=>{const b=Date.now();for(;Date.now()-b<F;){const o=Ee();if(o>r)return n(`✅ [${z}] ยืนยัน: รูปย่อเพิ่มจาก ${r} → ${o}`),!0;await m(500)}return n(`⚠️ [${z}] รูปย่อไม่เพิ่ม (ยังคง ${Ee()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=rn();if(!d)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const l=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${l.size} ตัว`);const c=ln();let s=sn();const p=new MutationObserver(z=>{for(const F of z)for(const b of F.addedNodes)if(b instanceof HTMLInputElement&&b.type==="file"&&(b.type="text",s.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),b instanceof HTMLElement){const o=b.querySelectorAll('input[type="file"]');for(const u of o)u.type="text",s.push({input:u,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{const z=()=>{if(d.getAttribute("data-state")==="open"||d.getAttribute("aria-expanded")==="true")return!0;const u=d.getAttribute("aria-controls");if(u){const E=document.getElementById(u);if(E&&E.offsetWidth>0)return!0}return!1},F=()=>{var O,C,_,w,g;const u=d.getAttribute("aria-controls");if(u){const h=document.getElementById(u);if(h){const T=h.querySelectorAll("button");for(const v of T){const y=v.querySelectorAll("i");for(const S of y){const f=((O=S.textContent)==null?void 0:O.trim())||"";if(f==="upload"||f==="upload_file"||f==="add_photo_alternate")return v}const M=(((C=v.querySelector("span"))==null?void 0:C.textContent)||"").trim().toLowerCase();if(M==="upload image"||M==="upload"||M==="อัปโหลดรูปภาพ")return v}const B=h.querySelector("div > div > button");if(B){const v=((w=(_=B.querySelector("i"))==null?void 0:_.textContent)==null?void 0:w.trim())||"";if(v==="upload"||v==="upload_file")return B}}}const E=document.querySelectorAll("button");for(const h of E){if(h===d)continue;const T=h.getBoundingClientRect();if(T.width===0||T.height===0)continue;const B=h.querySelectorAll("i");for(const v of B){const y=((g=v.textContent)==null?void 0:g.trim())||"";if(y==="upload"||y==="upload_file"||y==="add_photo_alternate"){const M=Array.from(h.querySelectorAll("i")).map(S=>{var f;return(f=S.textContent)==null?void 0:f.trim()});if(!M.includes("drive_folder_upload")&&!M.includes("photo_library"))return h}}}return null};if(d.click(),n("คลิกปุ่ม '+' (สร้าง) ด้วย .click() ✅"),await m(1200),!z()){n("⚠️ Dialog ไม่เปิดจาก .click() — ลอง pointer events");const u=d.getBoundingClientRect(),E=u.left+u.width/2,O=u.top+u.height/2,C={bubbles:!0,cancelable:!0,clientX:E,clientY:O,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",C)),await m(80),d.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",C)),d.dispatchEvent(new MouseEvent("click",C)),await m(1200)}z()||(n("⚠️ Dialog ยังไม่เปิด — ลอง focus + Enter"),d.focus(),await m(100),d.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),d.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0})),await m(1200));const b=z();if(n(`Radix Dialog ${b?"เปิดแล้ว ✅":"ไม่เปิด ❌"} (data-state: ${d.getAttribute("data-state")}, aria-expanded: ${d.getAttribute("aria-expanded")})`),s.length>0)n(`🎯 พบ file input ${s.length} ตัวหลังคลิก '+' — ข้ามเมนูไป inject เลย`),await m(500);else{n("── ขั้น 2: หาปุ่ม 'Upload image' ในRadix Dialog ──");let u=!1;const E=Date.now();for(;!u&&Date.now()-E<6e3;){const O=F();if(O){O.click(),u=!0;const C=(($=(k=O.querySelector("i"))==null?void 0:k.textContent)==null?void 0:$.trim())||"";n(`คลิกปุ่มอัปโหลด (icon: "${C}") ในDialog ✅`);break}if(s.length>0){n("🎯 Observer จับ file input ได้ — ข้ามไป inject"),u=!0;break}await m(500)}if(!u){n("⚠️ ไม่พบ upload button ใน Dialog — ลองแบบเก่า (menu items)");const O=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const C of O){if(C===d)continue;const _=C.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const g of _){const h=((I=g.textContent)==null?void 0:I.trim())||"";if(h==="upload"||h==="upload_file"||h==="add_photo_alternate"){const T=Array.from(C.querySelectorAll("i")).map(B=>{var v;return(v=B.textContent)==null?void 0:v.trim()});if(!T.includes("drive_folder_upload")&&!T.includes("photo_library")){C.click(),u=!0,n(`คลิกปุ่มอัปโหลด (legacy icon: ${h}) ✅`);break}}}if(u)break;const w=(C.textContent||"").trim().toLowerCase();if(w.length>0&&w.length<60&&(w.includes("upload image")||w.includes("upload photo")||w.includes("อัปโหลดรูปภาพ")||w==="upload"||w==="อัปโหลด")){C.click(),u=!0,n(`คลิกปุ่มอัปโหลด (legacy text: "${w.substring(0,40)}") ✅`);break}}}if(!u){n("══════ DIAGNOSTIC: elements หลังคลิก '+' ══════");const O=d.getAttribute("aria-controls");if(n(`  aria-controls: ${O}, data-state: ${d.getAttribute("data-state")}`),O){const M=document.getElementById(O);if(n(`  dialog element: ${M?`found (${M.tagName} ${M.offsetWidth}x${M.offsetHeight})`:"NOT FOUND"}`),M){const S=M.querySelectorAll("button");n(`  buttons inside dialog: ${S.length}`),S.forEach((f,x)=>{const R=Array.from(f.querySelectorAll("i")).map(G=>{var D;return(D=G.textContent)==null?void 0:D.trim()}).join(",");n(`    [${x}] "${(f.textContent||"").trim().substring(0,40)}" icons=[${R}]`)})}}const C=document.querySelectorAll("button");let _=0;for(const M of C){const S=M.getBoundingClientRect();if(S.width===0||S.height===0)continue;const f=Array.from(M.querySelectorAll("i")).map(x=>{var R;return(R=x.textContent)==null?void 0:R.trim()}).filter(Boolean);if((f.includes("upload")||f.includes("upload_file"))&&n(`  ★ UPLOAD CANDIDATE: <button>${(M.textContent||"").trim().substring(0,50)} [icons: ${f.join(",")}] @(${Math.round(S.left)},${Math.round(S.top)})`),++_>=30)break}n("══════ END DIAGNOSTIC ══════"),n("── Fallback: ลอง drag-and-drop ลงบน workspace ──");const w=new DataTransfer;w.items.add(a);let g=null;const h=document.querySelectorAll('[class*="canvas"], [class*="workspace"], [class*="drop"], [class*="media"], [class*="gallery"], main, [role="main"]');for(const M of h){const S=M.getBoundingClientRect();if(S.width>200&&S.height>200){g=M;break}}g||(g=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const T=g.getBoundingClientRect(),B=T.left+T.width/2,v=T.top+T.height/2,y={bubbles:!0,cancelable:!0,clientX:B,clientY:v,dataTransfer:w};return g.dispatchEvent(new DragEvent("dragenter",y)),await m(100),g.dispatchEvent(new DragEvent("dragover",y)),await m(100),g.dispatchEvent(new DragEvent("drop",y)),g.dispatchEvent(new DragEvent("dragleave",y)),n(`ส่ง drag-drop ลง workspace (${g.tagName})`),document.dispatchEvent(new DragEvent("drop",{...y,bubbles:!0})),await i("WorkspaceDrop",8e3)?!0:(A("ไม่พบปุ่มอัปโหลดและ drop ไม่สำเร็จ"),!1)}}await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──");const o=cn(s,a,l);if(o?n(`ฉีดไฟล์ ${e} เสร็จ ✅`):A(`ฉีดไฟล์ ${e} ผ่าน file input ล้มเหลว — ลอง fallback`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),o&&await i("FileInput",1e4))return!0;if(o&&!qe)return n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%) [Windows: ข้ามตรง]"),!0;n(`── 🍎 Mac Fallback: primary ${o?"ฉีดสำเร็จแต่ไม่เห็นรูปย่อ":"ฉีดล้มเหลว"} — ลอง fallback ──`),n("── Fallback A: วางผ่าน Clipboard Paste ──");try{const u=new Blob([await a.arrayBuffer()],{type:a.type}),E=new ClipboardItem({[a.type]:u});await navigator.clipboard.write([E]),n(`เขียนรูปลง clipboard แล้ว (${(a.size/1024).toFixed(1)} KB)`),await m(300);const O=[...document.querySelectorAll('[contenteditable="true"]'),...document.querySelectorAll("textarea"),...document.querySelectorAll("[data-slate-editor]"),...document.querySelectorAll('[role="textbox"]')],C=document.querySelector('[class*="prompt"], [class*="input-area"], [class*="compose"]');C&&!O.includes(C)&&O.push(C);for(const _ of O)try{_.focus(),await m(100);const w=new DataTransfer;w.items.add(a),_.dispatchEvent(new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:w})),n(`ส่ง paste event บน <${_.tagName.toLowerCase()}>`);try{const g=new DataTransfer;g.items.add(a),_.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:g}))}catch{}if(await m(800),Ee()>r)return n("✅ พบรูปย่อหลัง paste!"),!0}catch(w){n(`paste บน target ล้มเหลว: ${w.message}`)}try{const _=new DataTransfer;_.items.add(a),document.dispatchEvent(new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:_})),n("ส่ง paste event บน document")}catch{}if(await i("ClipboardPaste",5e3))return!0;n("⚠️ Clipboard paste ไม่สำเร็จ — ลอง drag-and-drop")}catch(u){n(`Clipboard paste ล้มเหลว: ${u.message}`)}n("── Fallback B: วางผ่าน Drag-and-Drop ──");try{let u=null;const E=document.querySelectorAll('[class*="prompt"], [class*="input"], [class*="compose"], [class*="drop"], textarea, [contenteditable="true"], [role="textbox"]');for(const h of E){const T=h.getBoundingClientRect();if(T.bottom>window.innerHeight*.5&&T.width>100&&T.height>20){u=h;break}}u||(u=document.body);const O=new DataTransfer;O.items.add(a);const C=u.getBoundingClientRect(),_=C.left+C.width/2,w=C.top+C.height/2,g={bubbles:!0,cancelable:!0,clientX:_,clientY:w,dataTransfer:O};if(u.dispatchEvent(new DragEvent("dragenter",g)),u.dispatchEvent(new DragEvent("dragover",g)),await m(200),u.dispatchEvent(new DragEvent("drop",g)),u.dispatchEvent(new DragEvent("dragleave",g)),n(`ส่ง drag-and-drop บน <${u.tagName.toLowerCase()}>`),await i("DragDrop",5e3))return!0;n("⚠️ Drag-and-drop ไม่สำเร็จ")}catch(u){n(`Drag-and-drop ล้มเหลว: ${u.message}`)}return o?(n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`❌ อัพโหลด ${e} ล้มเหลวทุกวิธี (Mac)`),!1)}finally{p.disconnect(),c();for(const z of s)z.input.type!=="file"&&(z.input.type="file")}}async function dn(t,e){var F;n("=== ขั้น 0: ตั้งค่า Flow ===");const a=document.querySelectorAll("button, div, span, [role='button']");let r=null;for(const b of a){const o=(b.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const u=b.getBoundingClientRect();u.bottom>window.innerHeight*.7&&u.width>30&&u.height>10&&(!r||(b.textContent||"").length<(r.textContent||"").length)&&(r=b)}}if(r&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(r.textContent||"").substring(0,40).trim()}"`),!r){const b=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of b){const u=((F=o.textContent)==null?void 0:F.trim())||"";if(u.includes("crop")||u==="aspect_ratio"||u==="photo_size_select_large"){const E=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(E){const O=E.getBoundingClientRect();if(O.bottom>window.innerHeight*.7&&O.width>0){r=E,n(`พบปุ่มตั้งค่าจากไอคอน: ${u}`);break}}}}}if(!r)for(const b of a){const o=(b.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const u=b.getBoundingClientRect();if(u.bottom>window.innerHeight*.7&&u.width>30){r=b,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!r)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=r.getBoundingClientRect(),d=i.left+i.width/2,l=i.top+i.height/2,c={bubbles:!0,cancelable:!0,clientX:d,clientY:l,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",c)),await m(80),r.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",c)),r.dispatchEvent(new MouseEvent("click",c)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let s=!1,p=null;const k=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const b of k){const o=b.getAttribute("aria-controls")||"",u=b.id||"";if(o.toUpperCase().includes("IMAGE")||u.toUpperCase().includes("IMAGE")){p=b,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const b of document.querySelectorAll('[role="tab"]')){const o=b.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=b,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const b of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(b.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const u=b.getBoundingClientRect();if(u.width>0&&u.height>0){p=b,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(p){const b=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(b==="active"||o==="true")s=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const u=p.getBoundingClientRect(),E={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),p.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",E)),p.dispatchEvent(new MouseEvent("click",E)),s=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}s||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const $=t==="horizontal"?"แนวนอน":"แนวตั้ง",I=t==="horizontal"?"landscape":"portrait";for(const b of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(b.textContent||"").trim();if(!(o.length>30)&&(o===$||o.includes($)||o.toLowerCase()===I||o.toLowerCase().includes(I))){const u=b.getBoundingClientRect(),E={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",E)),b.dispatchEvent(new MouseEvent("click",E)),n(`เลือกทิศทาง: ${$}`),await m(400);break}}const z=`x${e}`;for(const b of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(b.textContent||"").trim();if(!(o.length>10)&&(o===z||o===`${e}`)){const u=b.getBoundingClientRect(),E={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",E)),b.dispatchEvent(new MouseEvent("click",E)),n(`เลือกจำนวน: ${z}`),await m(400);break}}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),r.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",c)),await m(80),r.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",c)),r.dispatchEvent(new MouseEvent("click",c)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function pn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",a=t==="quality"?"Quality":"Fast",r=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",d=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const c=Date.now()+1e4;for(;!l&&Date.now()<c;){const b=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of b){const u=(o.textContent||"").trim();if(!(u.length>80)&&(u.includes("Veo")||u.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||u.includes("arrow_drop_down")||o.querySelector("svg"))){l=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${u.substring(0,50).trim()}"`);break}}if(!l)for(const o of b){const u=(o.textContent||"").trim();if(!(u.length>80)&&(u.includes("Veo")||u.includes("veo"))){const E=o.getBoundingClientRect();if(E.width>0&&E.height>0){l=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${u.substring(0,50).trim()}"`);break}}}if(!l)for(const o of b){const u=(o.textContent||"").trim();if(!(u.length>50)&&(u.includes("Fast")||u.includes("Quality")||u.includes("เร็ว")||u.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){l=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${u.substring(0,50).trim()}"`);break}}if(!l){const o=document.querySelectorAll("div, span, button, [role='button']");for(const u of o){const E=(u.textContent||"").trim();if(E==="Veo 3.1 - Fast"||E==="Veo 3.1 - Quality"||E==="Fast"||E==="Quality"||E==="Veo 3.1 - เร็ว"||E==="Veo 3.1 - คุณภาพสูง"||E==="Veo 3.1 - คุณภาพ"||E==="Veo 2 - Fast"||E==="Veo 2 - Quality"){const O=u.getBoundingClientRect();if(O.width>0&&O.height>0){l=u,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${E}"`);break}}}}if(!l){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const u of o){const E=(u.textContent||"").trim();if(!(E.length>60)&&(E.includes("3.1")||E.includes("model")||E.includes("โมเดล"))){const O=u.getBoundingClientRect();if(O.bottom>window.innerHeight*.4&&O.width>0&&O.height>0){l=u,n(`พบปุ่ม model selector (Strategy E): "${E.substring(0,50).trim()}"`);break}}}}l||await m(1e3)}if(!l)return A("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(l.textContent||"").trim();if(s.includes(e)||s.includes(a)&&!s.includes(r)||s.includes(i)&&!s.includes(d))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=l.getBoundingClientRect(),k=p.left+p.width/2,$=p.top+p.height/2,I={bubbles:!0,cancelable:!0,clientX:k,clientY:$,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",I)),await m(80),l.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",I)),l.dispatchEvent(new MouseEvent("click",I)),n("คลิกเปิด Veo quality dropdown"),await m(1e3);let z=!1;const F=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const b of F){const o=(b.textContent||"").trim();if((o===e||o===a||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const E=b.getBoundingClientRect();if(E.width>0&&E.height>0){const O=E.left+E.width/2,C=E.top+E.height/2,_={bubbles:!0,cancelable:!0,clientX:O,clientY:C,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",_)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",_)),b.dispatchEvent(new MouseEvent("click",_)),n(`✅ เลือก "${o}" สำเร็จ`),z=!0;break}}}return z?(await m(600),!0):(A(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),!1)}async function fn(t){var E,O,C,_;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,a=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=a?a[1]:"unknown",i=qe?"macOS":Ze?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=qe?((O=(E=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:E[1])==null?void 0:O.replace(/_/g,"."))||"":Ze&&((C=e.match(/Windows NT ([0-9.]+)/))==null?void 0:C[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${r}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${c} | แพลตฟอร์ม: ${fe}`),n("══════════════════════════════════════════");try{He(t.theme)}catch{}try{Xe()}catch(w){console.warn("Overlay show error:",w)}const s=[],p=[];try{P("settings","active");const w=t.orientation||"horizontal",g=t.outputCount||1,h=await dn(w,g);s.push(h?"✅ Settings":"⚠️ Settings"),P("settings",h?"done":"error")}catch(w){A(`ตั้งค่าผิดพลาด: ${w.message}`),s.push("⚠️ Settings"),P("settings","error")}try{const w=t.veoQuality||"fast";await pn(w)?(s.push(`✅ Veo ${w}`),n(`✅ Veo quality: ${w}`)):(s.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(w){A(`Veo quality error: ${w.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),await m(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const k=()=>{const w=document.querySelectorAll("span, div, p, label");for(const g of w){const h=(g.textContent||"").trim();if(/^\d{1,3}%$/.test(h)){if(h==="100%")return null;const T=g.getBoundingClientRect();if(T.width>0&&T.height>0&&T.top>0&&T.top<window.innerHeight)return h}}return null},$=async w=>{n(`รอการอัพโหลด ${w} เสร็จ...`),await m(2e3);const g=Date.now(),h=6e4;let T="",B=Date.now();const v=15e3;for(;Date.now()-g<h;){const y=k();if(y){if(y!==T)T=y,B=Date.now(),n(`กำลังอัพโหลด: ${y} — รอ...`);else if(Date.now()-B>v){n(`✅ อัพโหลด ${w} — % ค้างที่ ${y} นาน ${v/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}await m(1500)}else{n(`✅ อัพโหลด ${w} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}A(`⚠️ อัพโหลด ${w} หมดเวลาหลัง ${h/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){P("upload-char","active");try{const w=await Bt(t.characterImage,"character.png");s.push(w?"✅ ตัวละคร":"⚠️ ตัวละคร"),w||p.push("character upload failed"),P("upload-char",w?"done":"error")}catch(w){A(`อัพโหลดตัวละครผิดพลาด: ${w.message}`),s.push("❌ ตัวละคร"),p.push("character upload error"),P("upload-char","error")}await $("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(500)}else ye("upload-char");if(t.productImage){P("upload-prod","active");try{const w=await Bt(t.productImage,"product.png");s.push(w?"✅ สินค้า":"⚠️ สินค้า"),w||p.push("product upload failed"),P("upload-prod",w?"done":"error")}catch(w){A(`อัพโหลดสินค้าผิดพลาด: ${w.message}`),s.push("❌ สินค้า"),p.push("product upload error"),P("upload-prod","error")}await $("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(500)}else ye("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const I=k();I&&(n(`⚠️ อัพโหลดยังแสดง ${I} — รอเพิ่มเติม...`),await $("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const z=(t.characterImage?1:0)+(t.productImage?1:0);if(z>0){let w=Ee();w<z&&(n(`⏳ เห็นรูปย่อแค่ ${w}/${z} — รอ 3 วินาที...`),await m(3e3),w=Ee()),w>=z?n(`✅ ยืนยันรูปย่ออ้างอิง: ${w}/${z}`):A(`⚠️ คาดว่าจะมี ${z} รูปย่อ แต่พบ ${w} — ดำเนินการต่อ`)}if(he()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Ie(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await m(1e3);const F=Dt();F?(await Ge(F,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),s.push("✅ Prompt"),P("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),s.push("❌ Prompt"),p.push("prompt input not found"),P("img-prompt","error")),await m(800);const b=new Set;document.querySelectorAll("img").forEach(w=>{w.src&&b.add(w.src)}),n(`บันทึกรูปเดิม: ${b.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await m(500);const o=At();if(o){const w=o.getBoundingClientRect(),g=w.left+w.width/2,h=w.top+w.height/2,T={bubbles:!0,cancelable:!0,clientX:g,clientY:h,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",T)),await m(80),o.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",T)),o.dispatchEvent(new MouseEvent("click",T)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await m(500),o.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",T)),await m(80),o.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",T)),o.dispatchEvent(new MouseEvent("click",T)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),p.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const w=()=>{const v=document.querySelectorAll("div, span, p, label, strong, small");for(const y of v){if(y.closest("#netflow-engine-overlay"))continue;const M=(y.textContent||"").trim();if(M.length>10)continue;const S=M.match(/(\d{1,3})\s*%/);if(!S)continue;const f=parseInt(S[1],10);if(f<1||f>100)continue;if(Q())return f;const x=y.getBoundingClientRect();if(!(x.width===0||x.width>150)&&!(x.top<0||x.top>window.innerHeight))return f}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let g=null,h=-1,T=0;const B=Date.now();for(;!g&&Date.now()-B<18e4;){const v=document.querySelectorAll("img");for(const y of v){if(b.has(y.src)||!(y.alt||"").toLowerCase().includes("generated"))continue;if(Q()?y.naturalWidth>120&&y.naturalHeight>120:(()=>{const f=y.getBoundingClientRect();return f.width>120&&f.height>120&&f.top>0&&f.top<window.innerHeight*.85})()){const f=y.closest("div");if(f){g=f,n(`พบรูป AI จาก alt="${y.alt}": ${y.src.substring(0,80)}...${Q()?" (hidden-mode)":""}`);break}}}if(!g)for(const y of v){if(b.has(y.src))continue;const M=y.closest("div"),S=(M==null?void 0:M.textContent)||"";if(S.includes("product.png")||S.includes("character.png")||S.includes(".png")||S.includes(".jpg"))continue;if(Q()?y.naturalWidth>120&&y.naturalHeight>120:(()=>{const x=y.getBoundingClientRect();return x.width>120&&x.height>120&&x.top>0&&x.top<window.innerHeight*.85})()){const x=y.closest("div");if(x){g=x,n(`พบรูปใหม่ (สำรอง): ${y.src.substring(0,80)}...${Q()?" (hidden-mode)":""}`);break}}}if(!g){if(he()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const y=It();if(y){A(`❌ สร้างรูปล้มเหลว: ${y}`),p.push(`image gen failed: ${y}`),P("img-wait","error");break}const M=w();M!==null?(M!==h&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${M}%`),h=M,P("img-wait","active",M)),T=Date.now()):h>30&&Math.floor((Date.now()-T)/1e3)>=3&&n(`🖼️ % หายที่ ${h}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&h>0&&Date.now()-T>1e4&&await be(),document.hidden&&h<1&&Date.now()-B>3e4&&await be(),await m(3e3)}}if(!g)A("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),P("img-wait","done",100),await tt();const v=g.getBoundingClientRect(),y=v.left+v.width/2,M=v.top+v.height/2,S={bubbles:!0,cancelable:!0,clientX:y,clientY:M};g.dispatchEvent(new PointerEvent("pointerenter",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseenter",S)),g.dispatchEvent(new PointerEvent("pointerover",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseover",S)),g.dispatchEvent(new PointerEvent("pointermove",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousemove",S)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let f=null;for(const x of["more_vert","more_horiz","more"]){const R=Ve(x);for(const G of R){const D=G.getBoundingClientRect();if(D.top>=v.top-20&&D.top<=v.bottom&&D.right>=v.right-150&&D.right<=v.right+20){f=G;break}}if(f)break}if(!f){const x=document.querySelectorAll("button");for(const R of x){const G=R.getBoundingClientRect();if(G.width<50&&G.height<50&&G.top>=v.top-10&&G.top<=v.top+60&&G.left>=v.right-80){const D=R.querySelectorAll("i");for(const W of D)if((((_=W.textContent)==null?void 0:_.trim())||"").includes("more")){f=R;break}if(f)break;const L=R.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){f=R;break}}}}if(!f)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const x=f.getBoundingClientRect(),R=x.left+x.width/2,G=x.top+x.height/2,D={bubbles:!0,cancelable:!0,clientX:R,clientY:G,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),f.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",D)),f.dispatchEvent(new MouseEvent("click",D)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let L=null;const W=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const N of W){const H=(N.textContent||"").trim();if(H.includes("ทำให้เป็นภาพเคลื่อนไหว")||H.includes("Animate")||H.includes("animate")){L=N;break}}if(!L)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const N=L.getBoundingClientRect(),H=N.left+N.width/2,X=N.top+N.height/2,q={bubbles:!0,cancelable:!0,clientX:H,clientY:X,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",q)),await m(80),L.dispatchEvent(new PointerEvent("pointerup",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",q)),L.dispatchEvent(new MouseEvent("click",q)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),P("animate","done"),await m(3e3)}}}}catch(w){A(`ขั้น 4 ผิดพลาด: ${w.message}`),s.push("⚠️ Animate")}if(he()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Ie(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let w=!1;const g=document.querySelectorAll("button, span, div");for(const v of g){const y=(v.textContent||"").trim(),M=v.getBoundingClientRect();if((y==="วิดีโอ"||y==="Video"||y.includes("วิดีโอ"))&&M.bottom>window.innerHeight*.7){w=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}w||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let h=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(y=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>y())),h=!0;const v=Date.now();for(;document.hidden&&Date.now()-v<5e3;)await m(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await m(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await m(1e3);let T=!1;for(let v=1;v<=5&&!T;v++){if(v>1&&document.hidden){n(`🔄 Retry ${v}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(f=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>f())),h=!0;const S=Date.now();for(;document.hidden&&Date.now()-S<5e3;)await m(200);document.hidden||await m(2e3)}catch{}}const y=Dt();if(!y){n(`⚠️ ครั้งที่ ${v}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await m(3e3);continue}v>1&&(y.focus(),await m(500)),await Ge(y,t.videoPrompt),await m(500);const M=(y.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();M.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${v} (${M.length} ตัวอักษร)`),s.push("✅ Video Prompt"),P("vid-prompt","done"),T=!0):(n(`⚠️ ครั้งที่ ${v}: Prompt ไม่ถูกวาง (ได้ ${M.length} ตัวอักษร)`),await m(1500))}if(!T)throw A("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),s.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),P("vid-prompt","error"),new Error("Video prompt paste failed");await m(1e3),P("vid-generate","active");const B=At();if(B){const v=B.getBoundingClientRect(),y=v.left+v.width/2,M=v.top+v.height/2,S={bubbles:!0,cancelable:!0,clientX:y,clientY:M,button:0};B.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mousedown",S)),await m(80),B.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseup",S)),B.dispatchEvent(new MouseEvent("click",S)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),P("vid-generate","done"),await m(500),B.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mousedown",S)),await m(80),B.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseup",S)),B.dispatchEvent(new MouseEvent("click",S)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),p.push("video generate button not found"),P("vid-generate","error");if(h){await m(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(w){A(`ขั้น 5 ผิดพลาด: ${w.message}`),s.push("⚠️ Video Gen"),p.push(`video gen error: ${w.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ye("animate"),ye("vid-prompt"),ye("vid-generate"),ye("vid-wait");if(t.videoPrompt){P("vid-wait","active");const w=t.sceneCount||1,g=t.videoScenePrompts||[t.videoPrompt];if(w>1)try{Qt(w)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${w>1?`ต่อ ${w} ฉาก`:"ดาวน์โหลด"} ===`);const h=()=>{const v=document.querySelectorAll("div, span, p, label, strong, small");for(const y of v){if(y.closest("#netflow-engine-overlay"))continue;const M=(y.textContent||"").trim();if(M.length>10)continue;const S=M.match(/(\d{1,3})\s*%/);if(!S)continue;const f=parseInt(S[1],10);if(f<1||f>100)continue;if(Q())return f;const x=y.getBoundingClientRect();if(!(x.width===0||x.width>150)&&!(x.top<0||x.top>window.innerHeight))return f}return null},T=async(v=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await m(5e3);const y=()=>{const q=document.querySelectorAll("div, span, p, label, strong, small");let j=0;for(const le of q){if(le.closest("#netflow-engine-overlay"))continue;const U=(le.textContent||"").trim();if(U.includes("%")&&U.length<15){const ae=le.tagName.toLowerCase(),re=le.className&&typeof le.className=="string"?le.className.split(/\s+/).slice(0,2).join(" "):"",te=le.getBoundingClientRect();if(n(`  🔍 "${U}" ใน <${ae}.${re}> ที่ (${te.left.toFixed(0)},${te.top.toFixed(0)}) w=${te.width.toFixed(0)}`),j++,j>=5)break}}j===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},M=nt();n(M?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),y();const S=Date.now();let f=-1,x=0,R=!1;for(;Date.now()-S<v;){const q=h();if(q!==null){if(q!==f&&(n(`ความคืบหน้าวิดีโอ: ${q}%`),f=q,P("vid-wait","active",q)),x=Date.now(),q>=100){n("✅ ตรวจพบ 100%!"),R=!0;break}}else if(f>30){const j=Math.floor((Date.now()-x)/1e3);if(j>=5){n(`✅ % หายไปที่ ${f}% (หาย ${j} วินาที) — วิดีโอเสร็จ!`),R=!0;break}n(`⏳ % หายที่ ${f}% — ยืนยันใน ${5-j} วินาที...`)}else{const j=Math.floor((Date.now()-S)/1e3);j%15<3&&n(`⏳ รอ... (${j} วินาที) ไม่พบ %`)}if(!R&&f>0&&nt(!0)&&!M){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${f}% — วิดีโอเสร็จ!`),R=!0;break}if(he())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(f<1){const j=It();if(j)return A(`❌ สร้างวิดีโอล้มเหลว: ${j}`),null}document.hidden&&f>0&&Date.now()-x>1e4&&await be(),document.hidden&&f<1&&Date.now()-S>3e4&&await be(),await m(3e3)}await tt();let G=null;for(let q=1;q<=10&&(G=nt(),!G);q++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${q}/10)`),q%3===0&&await tt(),await m(3e3);if(!G)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),P("vid-wait","error"),null;const D=G;R?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=D.getBoundingClientRect();let W=L.left+L.width/2,N=L.top+L.height/2,H=D;const X=D.querySelector("video, img, canvas");if(X){const q=X.getBoundingClientRect();q.width>50&&q.height>50&&(W=q.left+q.width/2,N=q.top+q.height/2,H=X,n(`🎯 พบรูปย่อ <${X.tagName.toLowerCase()}> ในการ์ดที่ (${W.toFixed(0)},${N.toFixed(0)}) ${q.width.toFixed(0)}x${q.height.toFixed(0)}`))}else N=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${W.toFixed(0)},${N.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${W.toFixed(0)}, ${N.toFixed(0)})...`),tn(H);for(let q=0;q<8;q++){const j={bubbles:!0,cancelable:!0,clientX:W+q%2,clientY:N};H.dispatchEvent(new PointerEvent("pointermove",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousemove",j)),await m(500)}try{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"mute_video",sceneCount:w,scenePrompts:g,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${w} ฉาก, ${g.length} prompts, theme: ${t.theme})`)}catch(q){n(`⚠️ ไม่สามารถบันทึก pending action: ${q.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await B(H),n("✅ คลิกการ์ดวิดีโอเสร็จ"),D},B=async v=>{const y=v.getBoundingClientRect(),M=y.left+y.width/2,S=y.top+y.height/2,f={bubbles:!0,cancelable:!0,clientX:M,clientY:S,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",f)),await m(80),v.dispatchEvent(new PointerEvent("pointerup",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",f)),v.dispatchEvent(new MouseEvent("click",f)),await m(50),v.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await T())A("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),P("vid-wait","error");else{s.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const y=await new Promise(M=>{chrome.storage.local.get(de(),S=>{if(chrome.runtime.lastError){M(null);return}M((S==null?void 0:S[de()])||null)})});y&&!y._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(de()),y.action==="mute_video"?await Rt(y.sceneCount||1,y.scenePrompts||[],y.theme):y.action==="wait_scene_gen_and_download"&&await Ot(y.sceneCount||2,y.currentScene||2,y.theme,y.scenePrompts||[]))}}catch(v){A(`ขั้น 6 ผิดพลาด: ${v.message}`),s.push("⚠️ Step6"),p.push(`step 6: ${v.message}`)}}const u=p.length===0;try{Ie(u?5e3:8e3)}catch(w){console.warn("Overlay complete error:",w)}return{success:u,message:u?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${p.join(", ")}`,step:u?"done":"partial"}}async function Rt(t,e=[],a){var O;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{a&&He(a)}catch{}try{Xe(t)}catch(C){n(`⚠️ showOverlay error: ${C.message}`)}try{const C=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const _ of C)P(_,"done");t>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${C.length} steps done, sceneCount=${t}`)}catch(C){n(`⚠️ overlay restore error: ${C.message}`)}await m(1500);const r=(()=>{for(const C of document.querySelectorAll("button")){const _=C.querySelectorAll("i");for(const g of _){const h=(g.textContent||"").trim();if(h==="volume_up"||h==="volume_off"||h==="volume_mute"){const T=C.getBoundingClientRect();if(T.width>0&&T.height>0)return C}}const w=(C.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const g=C.getBoundingClientRect();if(g.width>0&&g.height>0)return C}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let f=2;f<=t;f++){const x=e[f-1];if(!x){A(`ไม่พบ prompt สำหรับฉากที่ ${f}`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate ──`);let R=null;const G=Date.now();for(;!R&&Date.now()-G<1e4;){const U=document.querySelectorAll("[data-slate-editor='true']");if(U.length>0&&(R=U[U.length-1]),!R){const ae=document.querySelectorAll("[role='textbox'][contenteditable='true']");ae.length>0&&(R=ae[ae.length-1])}R||await m(1e3)}if(!R){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${R.tagName.toLowerCase()}> ${R.className.substring(0,40)}`),await Ge(R,x),n(`วาง prompt ฉาก ${f} (${x.length} ตัวอักษร) ✅`);try{P(`scene${f}-prompt`,"done"),P(`scene${f}-gen`,"active")}catch{}await m(1e3);const D=R.getBoundingClientRect();let L=null,W=1/0;for(const U of document.querySelectorAll("button")){if(U.disabled)continue;const ae=U.querySelectorAll("i");let re=!1;for(const ke of ae)if((ke.textContent||"").trim()==="arrow_forward"){re=!0;break}if(!re)continue;const te=U.getBoundingClientRect();if(te.width<=0||te.height<=0)continue;const Be=Math.abs(te.top-D.top)+Math.abs(te.right-D.right);Be<W&&(W=Be,L=U)}if(!L)for(const U of document.querySelectorAll("button")){const ae=U.querySelectorAll("i");for(const re of ae)if((re.textContent||"").trim()==="arrow_forward"){const te=U.getBoundingClientRect();if(te.width>0&&te.height>0){L=U;break}}if(L)break}if(!L){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(U=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:t,currentScene:f,scenePrompts:e}},()=>U())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${f}/${t})`),await ee(L),n(`คลิก Generate ฉาก ${f} ✅`);try{P(`scene${f}-gen`,"done"),P(`scene${f}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${f} gen เสร็จ ──`),await m(5e3);let N=0,H=0;const X=Date.now(),q=6e5,j=5e3;let le=!1;for(;Date.now()-X<q;){let U=null;const ae=document.querySelectorAll("div, span, p, label, strong, small");for(const re of ae){if(re.closest("#netflow-engine-overlay"))continue;const Be=(re.textContent||"").trim().match(/^(\d{1,3})%$/);if(Be){const ke=re.getBoundingClientRect();if(ke.width>0&&ke.height>0&&ke.width<120&&ke.height<60){U=parseInt(Be[1],10);break}}}if(U!==null){if(U!==N){n(`🎬 ฉาก ${f} ความคืบหน้า: ${U}%`),N=U;try{P(`scene${f}-wait`,"active",U)}catch{}}H=0}else if(N>0){if(H===0)H=Date.now(),n(`🔍 ฉาก ${f}: % หายไป (จาก ${N}%) — กำลังยืนยัน...`);else if(Date.now()-H>=j){n(`✅ ฉาก ${f}: % หายไป ${j/1e3} วินาที — เจนเสร็จ!`),le=!0;break}}if(he()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&N>0&&H===0&&await be(),await m(2e3)}le||A(`ฉาก ${f} หมดเวลา`),n(`✅ ฉาก ${f} เสร็จแล้ว`);try{P(`scene${f}-wait`,"done",100)}catch{}chrome.storage.local.remove(de()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}let C=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(f=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>f())),C=!0,await m(5e3)}catch{}}await m(2e3);const _=Date.now();let w=null;const g=Date.now();for(;!w&&Date.now()-g<1e4;){for(const f of document.querySelectorAll("button")){const x=f.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const R=f.getBoundingClientRect();if(R.width>0&&R.height>0){w=f;break}}}w||await m(1e3)}if(!w){if(A("ไม่พบปุ่มดาวน์โหลด"),C)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await ee(w),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await m(1500);let h=null;for(let f=0;f<3&&!h;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let x=null;const R=Date.now();for(;!x&&Date.now()-R<5e3;){for(const N of document.querySelectorAll("[role='menuitem']"))if((N.textContent||"").trim().includes("Full Video")&&N.querySelector("i")){const X=N.getBoundingClientRect();if(X.width>0&&X.height>0){x=N;break}}x||await m(500)}if(!x){A("ไม่พบ Full Video");continue}const G=x.getBoundingClientRect(),D=G.left+G.width/2,L=G.top+G.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:D,clientY:L})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:D,clientY:L})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:D,clientY:L})),await ee(x),n("คลิก/hover Full Video ✅"),await m(2e3);const W=Date.now();for(;!h&&Date.now()-W<8e3;){for(const N of document.querySelectorAll("button[role='menuitem']")){const H=N.querySelectorAll("span");for(const X of H)if((X.textContent||"").trim()==="720p"){const q=N.getBoundingClientRect();if(q.width>0&&q.height>0){h=N;break}}if(h)break}h||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:D,clientY:L})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:D+20,clientY:L}))),await m(500))}}if(!h){if(A("ไม่พบ 720p"),C)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await ee(h),n("คลิก 720p ✅"),C){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const T=Date.now();let B=!1,v=!1;for(;Date.now()-T<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(f.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),B=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(v||(v=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(B)break;if(v){let f=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),B=!0;break}}if(he()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await m(2e3)}if(!B){A("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let y=!1;const M=Date.now();for(;Date.now()-M<6e4&&!y;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:_},x=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),y=!0,x.downloadUrl&&(i=x.downloadUrl,n(`[TikTok] จะใช้ download URL: ${x.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-M)/1e3)}s)`),f()})})}catch(f){A(`ตรวจสอบผิดพลาด: ${f.message}`)}y||await m(3e3)}y||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const S=await Qe();i||(i=S);try{P("open","done"),Ie(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Je(i),Ke(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const d=(C,_="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const w of document.querySelectorAll(_)){const g=(w.textContent||"").trim();if(g.includes(C)&&g.length<100){const h=w.getBoundingClientRect();if(h.width>0&&h.height>0&&h.top>=0)return w}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const c=Date.now();for(;!l&&Date.now()-c<1e4;){for(const C of document.querySelectorAll("button, [role='button']")){const _=(C.textContent||"").trim(),w=_.toLowerCase();if((w.includes("download")||w.includes("ดาวน์โหลด"))&&_.length<80){const g=C.getBoundingClientRect();if(g.width>0&&g.height>0){l=C;break}}}if(!l)for(const C of document.querySelectorAll("button")){const _=(C.getAttribute("aria-label")||"").toLowerCase();if(_.includes("download")||_.includes("ดาวน์")){const w=C.getBoundingClientRect();if(w.width>0&&w.height>0){l=C;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!l){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await ee(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const s=Date.now();let p=null;const k=Date.now();for(;!p&&Date.now()-k<5e3;)p=d("1080p"),p||(n("รอ 1080p..."),await m(500));if(!p){A("ไม่พบ 1080p");return}await ee(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const $=Date.now();let I=!1,z=!1,F=0;const b=3e3;for(;Date.now()-$<3e5;){const _=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(_.includes("upscaling complete")||_.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),I=!0;break}for(const g of document.querySelectorAll("div, span, p")){const h=(g.textContent||"").trim().toLowerCase();if(h.length<60&&(h.includes("upscaling complete")||h.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(O=g.textContent)==null?void 0:O.trim()}")`),I=!0;break}}if(I)break;if(_.includes("upscaling your video")||_.includes("กำลังอัปสเกล")){z=!0,F=0;const g=Math.floor((Date.now()-$)/1e3);n(`⏳ กำลังอัปสเกล... (${g} วินาที)`)}else if(z){if(F===0)F=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-F>=b){n(`✅ ข้อความ Upscaling หายไป ${b/1e3} วินาที — เสร็จ!`),I=!0;break}}else{const g=Math.floor((Date.now()-$)/1e3);g%10<3&&n(`⏳ รอ Upscale... (${g} วินาที)`)}if(he()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!I){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let o=!1;const u=Date.now();for(;Date.now()-u<6e4&&!o;){try{await new Promise(C=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},_=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):_!=null&&_.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${_.message}`),o=!0,_.downloadUrl&&(i=_.downloadUrl,n(`[TikTok] จะใช้ download URL: ${_.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-u)/1e3)}s)`),C()})})}catch(C){A(`ตรวจสอบผิดพลาด: ${C.message}`)}o||await m(3e3)}o||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const E=await Qe();i||(i=E),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Je(i),Ke(2e3)}async function Ot(t=2,e=2,a,r=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{a&&He(a)}catch{}try{Xe(t)}catch(g){n(`⚠️ showOverlay error: ${g.message}`)}try{const g=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let h=2;h<=e;h++)g.push(`scene${h}-prompt`,`scene${h}-gen`),h<e&&g.push(`scene${h}-wait`);for(const h of g)P(h,"done");P(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${g.length} steps done (scene ${e}/${t} navigate)`)}catch(g){n(`⚠️ overlay restore error: ${g.message}`)}await m(2e3);const i=(()=>{for(const g of document.querySelectorAll("button")){const h=g.querySelectorAll("i");for(const T of h){const B=(T.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const v=g.getBoundingClientRect();if(v.width>0&&v.height>0)return g}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let d=0,l=0;const c=Date.now(),s=6e5,p=5e3;let k=!1,$=0;for(;Date.now()-c<s;){let g=null;const h=document.querySelectorAll("div, span, p, label, strong, small");for(const T of h){if(T.closest("#netflow-engine-overlay"))continue;const v=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if(v){const y=T.getBoundingClientRect();if(y.width>0&&y.height>0&&y.width<120&&y.height<60){g=parseInt(v[1],10);break}}}if(g!==null){if($=0,g!==d){n(`🎬 scene ${e} ความคืบหน้า: ${g}%`),d=g;try{P(`scene${e}-wait`,"active",g)}catch{}}l=0}else if(d>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-l>=p){n(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),k=!0;break}}else if($++,$>=15){const T=document.querySelectorAll("video");let B=!1;for(const v of T)if(v.readyState>=2&&!v.paused&&v.getBoundingClientRect().width>200){B=!0;break}if(B){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),k=!0;break}if($>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),k=!0;break}}document.hidden&&d>0&&l===0&&await be(),await m(2e3)}k||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{P(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&r.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await m(2e3);for(let g=e+1;g<=t;g++){const h=r[g-1];if(!h){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${g} — ข้าม`);continue}n(`── ฉากที่ ${g}/${t}: วาง prompt + generate (pending recovery) ──`);let T=null;const B=Date.now();for(;!T&&Date.now()-B<1e4;){const D=document.querySelectorAll("[data-slate-editor='true']");if(D.length>0&&(T=D[D.length-1]),!T){const L=document.querySelectorAll("[role='textbox'][contenteditable='true']");L.length>0&&(T=L[L.length-1])}T||await m(1e3)}if(!T){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${g}`);break}await Ge(T,h),n(`วาง prompt ฉาก ${g} (${h.length} ตัวอักษร) ✅`);try{P(`scene${g}-prompt`,"done"),P(`scene${g}-gen`,"active")}catch{}await m(1e3);const v=T.getBoundingClientRect();let y=null,M=1/0;for(const D of document.querySelectorAll("button")){if(D.disabled)continue;const L=D.querySelectorAll("i");let W=!1;for(const X of L)if((X.textContent||"").trim()==="arrow_forward"){W=!0;break}if(!W)continue;const N=D.getBoundingClientRect();if(N.width<=0||N.height<=0)continue;const H=Math.abs(N.top-v.top)+Math.abs(N.right-v.right);H<M&&(M=H,y=D)}if(!y)for(const D of document.querySelectorAll("button")){const L=D.querySelectorAll("i");for(const W of L)if((W.textContent||"").trim()==="arrow_forward"){const N=D.getBoundingClientRect();if(N.width>0&&N.height>0){y=D;break}}if(y)break}if(!y){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${g}`);break}await new Promise(D=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:t,currentScene:g,scenePrompts:r}},()=>D())}),await ee(y),n(`คลิก Generate ฉาก ${g} ✅`);try{P(`scene${g}-gen`,"done"),P(`scene${g}-wait`,"active")}catch{}await m(5e3);let S=0,f=0;const x=Date.now();let R=!1,G=0;for(;Date.now()-x<6e5;){let D=null;const L=document.querySelectorAll("div, span, p, label, strong, small");for(const W of L){if(W.closest("#netflow-engine-overlay"))continue;const H=(W.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const X=W.getBoundingClientRect();if(X.width>0&&X.height>0&&X.width<120&&X.height<60){D=parseInt(H[1],10);break}}}if(D!==null){if(G=0,D!==S){n(`🎬 ฉาก ${g} ความคืบหน้า: ${D}%`),S=D;try{P(`scene${g}-wait`,"active",D)}catch{}}f=0}else if(S>0){if(f===0)f=Date.now();else if(Date.now()-f>=5e3){n(`✅ ฉาก ${g}: เจนเสร็จ!`),R=!0;break}}else if(G++,G>=15){const W=document.querySelectorAll("video");let N=!1;for(const H of W)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){N=!0;break}if(N){n(`✅ ฉาก ${g}: พบวิดีโอเล่นอยู่ — เสร็จ`),R=!0;break}if(G>=30){n(`✅ ฉาก ${g}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),R=!0;break}}document.hidden&&S>0&&f===0&&await be(),await m(2e3)}R||n(`⚠️ ฉาก ${g} หมดเวลา`);try{P(`scene${g}-wait`,"done",100)}catch{}n(`✅ ฉาก ${g} เสร็จแล้ว`),chrome.storage.local.remove(de()),await m(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await m(3e3);let I=null;try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const z=Date.now();let F=null;const b=Date.now();for(;!F&&Date.now()-b<1e4;){for(const g of document.querySelectorAll("button")){const h=g.querySelector("i");if(h&&(h.textContent||"").trim()==="download"){const T=g.getBoundingClientRect();if(T.width>0&&T.height>0){F=g;break}}}F||await m(1e3)}if(!F){A("ไม่พบปุ่มดาวน์โหลด");return}await ee(F),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await m(1500);let o=null;for(let g=0;g<3&&!o;g++){g>0&&n(`🔄 ลองหา 720p ครั้งที่ ${g+1}...`);let h=null;const T=Date.now();for(;!h&&Date.now()-T<5e3;){for(const S of document.querySelectorAll("[role='menuitem']"))if((S.textContent||"").trim().includes("Full Video")&&S.querySelector("i")){const x=S.getBoundingClientRect();if(x.width>0&&x.height>0){h=S;break}}h||await m(500)}if(!h){A("ไม่พบ Full Video");continue}const B=h.getBoundingClientRect(),v=B.left+B.width/2,y=B.top+B.height/2;h.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:v,clientY:y})),h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:v,clientY:y})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:v,clientY:y})),await ee(h),n("คลิก/hover Full Video ✅"),await m(2e3);const M=Date.now();for(;!o&&Date.now()-M<8e3;){for(const S of document.querySelectorAll("button[role='menuitem']")){const f=S.querySelectorAll("span");for(const x of f)if((x.textContent||"").trim()==="720p"){const R=S.getBoundingClientRect();if(R.width>0&&R.height>0){o=S;break}}if(o)break}o||(h.isConnected&&(h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:v,clientY:y})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:v+20,clientY:y}))),await m(500))}}if(!o){A("ไม่พบ 720p");return}await ee(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const u=Date.now();let E=!1,O=!1;for(;Date.now()-u<3e5;){for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div")){const h=(g.textContent||"").trim();if(h==="Download complete!"||h==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),E=!0;break}(h.includes("Downloading your extended video")||h.includes("กำลังดาวน์โหลด"))&&(O||(O=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(E)break;if(O){let g=!1;for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((h.textContent||"").trim().includes("Downloading")){g=!0;break}if(!g){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),E=!0;break}}await m(2e3)}if(!E){A("เตรียมไฟล์หมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let C=!1;const _=Date.now();for(;Date.now()-_<6e4&&!C;){try{await new Promise(g=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:z},h=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):h!=null&&h.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${h.message}`),C=!0,h.downloadUrl&&(I=h.downloadUrl,n(`[TikTok] จะใช้ download URL: ${h.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-_)/1e3)}s)`),g()})})}catch(g){A(`ตรวจสอบผิดพลาด: ${g.message}`)}C||await m(3e3)}C||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const w=await Qe();I||(I=w);try{P("open","done"),Ie(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Je(I),Ke(2e3)}async function un(){try{await Jt;const t=de();let e=await new Promise(l=>{chrome.storage.local.get(t,c=>{if(chrome.runtime.lastError){l(null);return}l((c==null?void 0:c[t])||null)})});if(!e&&ve){const l="netflow_pending_action";e=await new Promise(c=>{chrome.storage.local.get(l,s=>{if(chrome.runtime.lastError){c(null);return}c((s==null?void 0:s[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-e.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await m(300),!await new Promise(l=>{chrome.storage.local.get(t,c=>{const s=c==null?void 0:c[t];l((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(r/1e3)} วินาที)`),e.action==="mute_video"?await Rt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ot(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,a)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),a({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),fn(t).then(r=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`),Tt()}).catch(r=>{if(r instanceof et||(r==null?void 0:r.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Ct()}catch{}}else console.error("[Netflow AI] Generate error:",r);Tt()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,a({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return a({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return a({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const r=on();if(!r){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=r.getBoundingClientRect(),d=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const s=document.elementFromPoint(d,l);s?(await ee(s),n(`คลิก ${c+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await ee(r),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),un()})();
