(function(){"use strict";const se={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let J=se.green,he=null;function Ae(t){t&&se[t]&&(he=t,J=se[t],Ye(),requestAnimationFrame(()=>ut()))}function $t(){if(he&&se[he])return se[he];try{const t=localStorage.getItem("netflow_app_theme");if(t&&se[t])return se[t]}catch{}return se.green}let ne=0,oe=255,ie=65;function Ye(){const t=J.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}const Xe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',je='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let X=null,Q=null,le=null,Ke=0,Ce=null,be=null,Me=null,Be=0,ce=!1,ae=null,we=null,xe=null,ve=1,Y=[];function Re(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let i=2;i<=t;i++)e.push({stepId:`scene${i}-prompt`,label:`ฉาก ${i} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${i}-gen`,label:`ฉาก ${i} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${i}-wait`,label:`ฉาก ${i} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const de=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=Re(1);function Et(t){const e=t.rgb,i=t.accentRgb,o=t.doneRgb,r=t.hex,p=t.accentHex,c=t.doneHex,s=(()=>{const w=r.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const a=C=>Math.min(255,C+80);return`#${[1,2,3].map(C=>a(parseInt(w[C],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const w=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!w)return"#4ade80";const a=C=>Math.min(255,C+60);return`#${[1,2,3].map(C=>a(parseInt(w[C],16)).toString(16).padStart(2,"0")).join("")}`})(),d=r.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),g=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,b=d?parseInt(d[1],16)/g:0,I=d?parseInt(d[2],16)/g:1,k=d?parseInt(d[3],16)/g:.25,$=w=>`${Math.round(b*w)}, ${Math.round(I*w)}, ${Math.round(k*w)}`;return`
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
    background: ${r};
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

.nf-term-active .nf-term-prefix { color: ${r}; text-shadow: 0 0 6px rgba(${e},0.4); }

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
    background: linear-gradient(180deg, rgba(${$(6)},0.75) 0%, rgba(${$(3)},0.92) 100%);
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
    color: ${r};
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
    background: ${r};
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
    background: linear-gradient(90deg, ${r}, ${s});
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
    background: linear-gradient(90deg, ${r}, ${p});
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
    color: ${r};
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
    color: ${r};
    text-shadow: 0 0 6px rgba(${e},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${r};
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

    `}function Je(){le||(le=document.createElement("style"),le.id="netflow-overlay-styles",le.textContent=Et(J),document.head.appendChild(le))}function Qe(t){t.innerHTML="",Y.forEach((e,i)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function kt(){const t=document.getElementById("nf-terminal");if(!t)return;Qe(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function Ze(t,e){let s="";for(let I=0;I<20;I++){const k=I/20*Math.PI*2,$=(I+.2)/20*Math.PI*2,w=(I+.5)/20*Math.PI*2,a=(I+.8)/20*Math.PI*2,C=(I+1)/20*Math.PI*2;s+=`${I===0?"M":"L"}${(120+100*Math.cos(k)).toFixed(1)},${(120+100*Math.sin(k)).toFixed(1)} `,s+=`L${(120+100*Math.cos($)).toFixed(1)},${(120+100*Math.sin($)).toFixed(1)} `,s+=`L${(120+112*Math.cos(w)).toFixed(1)},${(120+112*Math.sin(w)).toFixed(1)} `,s+=`L${(120+100*Math.cos(a)).toFixed(1)},${(120+100*Math.sin(a)).toFixed(1)} `,s+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `}s+="Z";const l=14,d=72,g=62;let b="";for(let I=0;I<l;I++){const k=I/l*Math.PI*2,$=(I+.25)/l*Math.PI*2,w=(I+.75)/l*Math.PI*2,a=(I+1)/l*Math.PI*2;b+=`${I===0?"M":"L"}${(120+g*Math.cos(k)).toFixed(1)},${(120+g*Math.sin(k)).toFixed(1)} `,b+=`L${(120+d*Math.cos($)).toFixed(1)},${(120+d*Math.sin($)).toFixed(1)} `,b+=`L${(120+d*Math.cos(w)).toFixed(1)},${(120+d*Math.sin(w)).toFixed(1)} `,b+=`L${(120+g*Math.cos(a)).toFixed(1)},${(120+g*Math.sin(a)).toFixed(1)} `}return b+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Ct(){const t=document.createElement("div");t.id="netflow-engine-overlay",ae=document.createElement("canvas"),ae.id="nf-matrix-canvas",t.appendChild(ae);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let y=1;y<=5;y++){const _=document.createElement("div");_.className=`nf-ambient-orb nf-orb-${y}`,t.appendChild(_)}const i=document.createElement("div");i.className="nf-pat-data",t.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-a",t.appendChild(o);const r=document.createElement("div");r.className="nf-pat-diag-b",t.appendChild(r);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",t.appendChild(l);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const g=document.createElement("div");g.className="nf-pat-wave-h",t.appendChild(g);const b=document.createElement("div");b.className="nf-pat-radar",t.appendChild(b);const I=document.createElement("div");I.className="nf-pat-ripple-1",t.appendChild(I);const k=document.createElement("div");k.className="nf-pat-ripple-2",t.appendChild(k);const $=document.createElement("div");$.className="nf-pat-techscan",t.appendChild($);const w=document.createElement("div");w.className="nf-center-glow",t.appendChild(w);const a=document.createElement("div");a.className="nf-pat-noise",t.appendChild(a);const C=document.createElement("div");C.className="nf-crt-scanlines",t.appendChild(C);const z=document.createElement("div");z.className="nf-vignette",t.appendChild(z);for(let y=0;y<3;y++){const _=document.createElement("div");_.className="nf-pulse-ring",t.appendChild(_)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(y=>{const _=document.createElement("div");_.className=`nf-corner-deco ${y}`,t.appendChild(_)});const D=document.createElement("button");D.className="nf-stop-btn",D.innerHTML='<span class="nf-stop-icon"></span> หยุด',D.onclick=()=>{var y;window.__NETFLOW_STOP__=!0;try{Pe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((y=chrome.runtime)!=null&&y.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(D);const R=document.createElement("button");R.className="nf-close-btn",R.textContent="✕ ซ่อน",R.onclick=()=>Oe(),t.appendChild(R);const V=document.createElement("div");V.className="nf-layout";const x=document.createElement("div");x.className="nf-core-monitor",x.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,x.appendChild(f);const h=document.createElement("div");h.className="nf-terminal",h.id="nf-terminal",Qe(h),x.appendChild(h);const E=document.createElement("div");E.className="nf-engine-core",E.id="nf-engine-core";const N=document.createElement("div");N.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(y=>{const _=document.createElement("div");_.className=`nf-frame-corner ${y}`,N.appendChild(_)}),E.appendChild(N);const B="http://www.w3.org/2000/svg",u=document.createElementNS(B,"svg");u.setAttribute("class","nf-engine-waves"),u.setAttribute("viewBox","0 0 560 140"),u.setAttribute("preserveAspectRatio","none"),u.id="nf-engine-waves";for(let y=0;y<4;y++){const _=document.createElementNS(B,"path");_.setAttribute("fill","none"),_.setAttribute("stroke-width",y<2?"1.5":"1"),_.setAttribute("stroke",y<2?`rgba(${J.rgb},${.14+y*.1})`:`rgba(${J.accentRgb},${.1+(y-2)*.08})`),_.setAttribute("data-wave-idx",String(y)),u.appendChild(_)}E.appendChild(u);const v=document.createElement("div");v.className="nf-engine-brand-inner",v.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Ze(J.rgb,J.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Ze(J.rgb,J.accentRgb)}
        </div>
    `,E.appendChild(v);const M=document.createElement("div");M.className="nf-engine-stats",M.id="nf-engine-stats",M.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([y,_,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${y}</span><span class="nf-stat-val" id="${_}">${O}</span></div>`).join(""),E.appendChild(M),x.appendChild(E),V.appendChild(x);const S=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];de.forEach((y,_)=>{const O=Mt(y);O.classList.add(S[_]),O.id=`nf-mod-${y.id}`,V.appendChild(O)}),t.appendChild(V);for(let y=0;y<30;y++){const _=document.createElement("div");_.className="nf-particle",_.style.left=`${5+Math.random()*90}%`,_.style.bottom=`${Math.random()*40}%`,_.style.animationDuration=`${3+Math.random()*5}s`,_.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,T=.7+Math.random()*.3;_.style.background=`rgba(${Math.floor(ne*T)}, ${Math.floor(oe*T)}, ${Math.floor(ie*T)}, ${O})`,_.style.width=`${1+Math.random()*2}px`,_.style.height=_.style.width,t.appendChild(_)}return t}function Mt(t){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(i),t.steps.forEach(r=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${r.id}`;let c="";r.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${r.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${r.label}</span>
            ${c}
        `,e.appendChild(p)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function _t(){Ke=Date.now(),Ce=setInterval(()=>{const t=Math.floor((Date.now()-Ke)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${i}`);const r=document.getElementById("nf-stat-elapsed");r&&(r.textContent=`${e}:${i}`)},1e3)}function et(){Ce&&(clearInterval(Ce),Ce=null)}const Pt=120,tt=160,nt=.4;let fe=null,ot=0,it=0,at=0,ye=[];function St(t,e){ye=[];for(let i=0;i<Pt;i++){const o=Math.random();let r;o<.22?r=0:o<.4?r=1:o<.55?r=2:o<.68?r=3:o<.84?r=4:r=5;const p=Math.random()*t,c=Math.random()*e,s=50+Math.random()*220,l=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);ye.push({x:r===0?Math.random()*t:p+Math.cos(l)*s,y:r===0?Math.random()*e:c+Math.sin(l)*s,vx:(Math.random()-.5)*nt,vy:(Math.random()-.5)*nt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:r,oCx:p,oCy:c,oRadius:s,oAngle:l,oSpeed:d})}}function It(){if(!ae)return;const t=ae;if(we=t.getContext("2d"),!we)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,ye.length===0&&St(t.width,t.height)};e(),window.addEventListener("resize",e);let i=null,o=0,r=0,p=!1;function c(){if(!we||!ae){xe=null;return}if(xe=requestAnimationFrame(c),p=!p,p)return;const s=we,l=ae.width,d=ae.height;s.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,s.fillRect(0,0,l,d),(!i||o!==l||r!==d)&&(o=l,r=d,i=s.createRadialGradient(l*.5,d*.5,0,l*.5,d*.5,Math.max(l,d)*.6),i.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=i,s.fillRect(0,0,l,d);const g=ye,b=g.length,I=tt*tt;for(let w=0;w<b;w++){const a=g[w];if(a.pulsePhase+=a.pulseSpeed,a.motion===0)a.x+=a.vx,a.y+=a.vy,a.x<0?(a.x=0,a.vx=Math.abs(a.vx)*(.8+Math.random()*.4)):a.x>l&&(a.x=l,a.vx=-Math.abs(a.vx)*(.8+Math.random()*.4)),a.y<0?(a.y=0,a.vy=Math.abs(a.vy)*(.8+Math.random()*.4)):a.y>d&&(a.y=d,a.vy=-Math.abs(a.vy)*(.8+Math.random()*.4));else if(a.motion===1)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius,a.oCx+=Math.sin(a.oAngle*.3)*.15,a.oCy+=Math.cos(a.oAngle*.3)*.15;else if(a.motion===2)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius*.5,a.oCx+=Math.sin(a.oAngle*.2)*.1,a.oCy+=Math.cos(a.oAngle*.2)*.1;else if(a.motion===3){a.oAngle+=a.oSpeed;const C=a.oAngle,z=a.oRadius*.7;a.x=a.oCx+z*Math.cos(C),a.y=a.oCy+z*Math.sin(C)*Math.cos(C),a.oCx+=Math.sin(C*.15)*.12,a.oCy+=Math.cos(C*.15)*.12}else if(a.motion===4){a.oAngle+=a.oSpeed*1.2;const C=a.oRadius*(.5+.5*Math.abs(Math.sin(a.oAngle*.15)));a.x=a.oCx+Math.cos(a.oAngle)*C,a.y=a.oCy+Math.sin(a.oAngle)*C,a.oCx+=Math.sin(a.oAngle*.1)*.18,a.oCy+=Math.cos(a.oAngle*.1)*.18}else a.oAngle+=a.oSpeed,a.x+=a.vx*.8,a.y=a.oCy+Math.sin(a.oAngle+a.x*.008)*a.oRadius*.35,a.x<-30?a.x=l+30:a.x>l+30&&(a.x=-30),a.oCy+=Math.sin(a.oAngle*.1)*.08;if(a.motion>0){const C=a.oRadius+50;a.oCx<-C?a.oCx=l+C:a.oCx>l+C&&(a.oCx=-C),a.oCy<-C?a.oCy=d+C:a.oCy>d+C&&(a.oCy=-C)}}s.beginPath(),s.strokeStyle=`rgba(${ne},${oe},${ie},0.06)`,s.lineWidth=.4;const k=new Path2D;for(let w=0;w<b;w++){const a=g[w];for(let C=w+1;C<b;C++){const z=g[C],D=a.x-z.x,R=a.y-z.y,V=D*D+R*R;V<I&&(1-V/I<.4?(s.moveTo(a.x,a.y),s.lineTo(z.x,z.y)):(k.moveTo(a.x,a.y),k.lineTo(z.x,z.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${ne},${oe},${ie},0.18)`,s.lineWidth=.8,s.stroke(k),!fe||ot!==ne||it!==oe||at!==ie){fe=document.createElement("canvas");const w=48;fe.width=w,fe.height=w;const a=fe.getContext("2d"),C=a.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);C.addColorStop(0,`rgba(${ne},${oe},${ie},0.9)`),C.addColorStop(.3,`rgba(${ne},${oe},${ie},0.35)`),C.addColorStop(1,`rgba(${ne},${oe},${ie},0)`),a.fillStyle=C,a.fillRect(0,0,w,w),ot=ne,it=oe,at=ie}const $=fe;for(let w=0;w<b;w++){const a=g[w],C=.6+.4*Math.sin(a.pulsePhase),z=a.radius*5*(.8+C*.4);s.globalAlpha=.5+C*.4,s.drawImage($,a.x-z/2,a.y-z/2,z,z)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let w=0;w<b;w++){const a=g[w];if(a.radius>2){const C=.6+.4*Math.sin(a.pulsePhase),z=a.radius*(.8+C*.4)*.35;s.moveTo(a.x+z,a.y),s.arc(a.x,a.y,z,0,Math.PI*2)}}s.fill()}c()}function Tt(){xe!==null&&(cancelAnimationFrame(xe),xe=null),ae=null,we=null,ye=[]}let $e=null;const _e=560,At=140,rt=_e/2,st=At/2,lt=[];for(let t=0;t<=_e;t+=8){const e=Math.abs(t-rt)/rt;lt.push(Math.pow(Math.min(1,e*1.6),.6))}const Bt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/_e,off:t*.6,spd:.7+t*.12}));let De=!1;function ct(){if(be=requestAnimationFrame(ct),De=!De,De)return;if(Be+=.07,!$e){const e=document.getElementById("nf-engine-waves");if(!e){be=null;return}$e=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<$e.length;e++){const i=Bt[e],o=Be*i.spd+i.off;t.length=0,t.push(`M 0 ${st}`);let r=0;for(let p=0;p<=_e;p+=8){const c=st+i.amp*lt[r++]*Math.sin(p*i.freq+o);t.push(`L${p} ${c*10+.5|0}`)}$e[e].setAttribute("d",t.join(" "))}}function Rt(){Be=0,ct(),It(),Me=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function dt(){be!==null&&(cancelAnimationFrame(be),be=null),Me&&(clearInterval(Me),Me=null),$e=null,Tt()}function Ne(){let t=0;const e=Y.filter(d=>d.status!=="skipped").length;for(const d of Y){const g=document.getElementById(`nf-proc-${d.stepId}`);if(!g)continue;g.className="nf-proc-row";const b=g.querySelector(".nf-proc-badge");switch(d.status){case"done":g.classList.add("nf-proc-done"),b&&(b.textContent="✅ done"),t++;break;case"active":g.classList.add("nf-proc-active"),b&&(b.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":g.classList.add("nf-proc-error"),b&&(b.textContent="❌ error");break;case"skipped":g.classList.add("nf-proc-skipped"),b&&(b.textContent="— skip");break;default:g.classList.add("nf-proc-waiting"),b&&(b.textContent="(queued)")}}const i=Y.findIndex(d=>d.status==="active"),o=i>=0?i+1:t>=e&&e>0?Y.length:t,r=document.getElementById("nf-step-counter");r&&(r.textContent=`${o}/${Y.length}`);const p=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=J.doneHex),c&&(c.style.background=J.doneHex,c.style.boxShadow=`0 0 8px rgba(${J.doneRgb},0.7)`)):Y.some(g=>g.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(g=>g.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=J.hex,p.style.textShadow=`0 0 10px rgba(${J.rgb},0.5)`);const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function pt(){Q&&Q.isConnected||(Je(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=ce?Xe:je,Q.title="ซ่อน/แสดง Netflow Overlay",Q.onclick=()=>Oe(),document.body.appendChild(Q))}function Oe(){X&&(pt(),ce?(X.classList.remove("nf-hidden"),X.classList.add("nf-visible"),Q&&(Q.innerHTML=je),ce=!1):(X.classList.remove("nf-visible"),X.classList.add("nf-hidden"),Q&&(Q.innerHTML=Xe),ce=!0))}const ft={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ut(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=he;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const i=ft[e]||ft.green;let o;try{o=chrome.runtime.getURL(i)}catch{o=`/${i}`}const r=J.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${r},0.25) 0%, rgba(${r},0.12) 50%, rgba(${r},0.20) 100%)`,`url('${o}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${r},0.45)`,t.style.boxShadow=`0 0 70px rgba(${r},0.22), 0 0 140px rgba(${r},0.1), inset 0 1px 0 rgba(${r},0.15)`}function ze(t=1){if(J=$t(),Ye(),X&&X.isConnected){ce&&Oe();return}if(X&&!X.isConnected&&(X=null),le&&(le.remove(),le=null),Je(),ve=t,Y=Re(t),t>1){const e=de.find(o=>o.id==="video");if(e){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let r=2;r<=t;r++)o.push({id:`scene${r}-prompt`,label:`Scene ${r} Prompt`,status:"waiting"}),o.push({id:`scene${r}-gen`,label:`Scene ${r} Generate`,status:"waiting"}),o.push({id:`scene${r}-wait`,label:`Scene ${r} รอผล`,status:"waiting",progress:0});e.steps=o}const i=de.find(o=>o.id==="render");if(i){const o=i.steps.find(p=>p.id==="download");o&&(o.label="ดาวน์โหลด 720p");const r=i.steps.find(p=>p.id==="upscale");r&&(r.label="Full Video")}}X=Ct(),document.body.appendChild(X),ce=!1,pt(),_t(),Rt(),requestAnimationFrame(()=>ut())}function gt(){et(),dt(),ce=!1,X&&(X.classList.add("nf-fade-out"),setTimeout(()=>{X==null||X.remove(),X=null},500)),Q&&(Q.remove(),Q=null)}const Dt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Nt(t,e,i){const o=Y.findIndex(g=>g.status==="active"),r=Y.filter(g=>g.status==="done").length,p=Y.length,c=o>=0?o+1:r>=p?p:r,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${c}/${p}`);let l=1;for(const g of Y)if(g.status==="active"||g.status==="done")if(g.stepId.startsWith("scene")){const b=g.stepId.match(/^scene(\d+)-/);b&&(l=Math.max(l,parseInt(b[1],10)))}else(g.stepId==="download"||g.stepId==="upscale"||g.stepId==="open")&&(l=ve);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=ve>1?`${l}/${ve}`:"1/1"),e==="active"){const g=document.getElementById("nf-stat-status"),b=Dt[t]||t.toUpperCase();g&&(g.textContent=b)}else if(e==="done"&&r>=p){const g=document.getElementById("nf-stat-status");g&&(g.textContent="COMPLETE")}else if(e==="error"){const g=document.getElementById("nf-stat-status");g&&(g.textContent="ERROR")}if(i!==void 0&&i>0){const g=document.getElementById("nf-stat-progress");g&&(g.textContent=`${Math.min(100,i)}%`)}}function P(t,e,i){if(!X)return;for(const r of de)for(const p of r.steps)p.id===t&&(p.status=e,i!==void 0&&(p.progress=i));for(const r of Y)r.stepId===t&&(r.status=e,i!==void 0&&(r.progress=i));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),Nt(t,e,i),i!==void 0){const r=document.getElementById(`nf-bar-${t}`);r&&(r.style.width=`${Math.min(100,i)}%`)}Fe(),Ne()}function ue(t){P(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Ee(t=4e3){et(),dt(),Fe(),Ne(),setTimeout(()=>gt(),t)}function Fe(){for(const t of de){const e=t.steps.filter(l=>l.status!=="skipped").length,i=t.steps.filter(l=>l.status==="done").length,o=t.steps.some(l=>l.status==="active"),r=e>0?Math.round(i/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${r}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${r}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),r>=100?s.classList.add("nf-done"):o&&s.classList.add("nf-active"))}}function Ot(t){var o,r,p,c;ve=t;const e=new Map;for(const s of Y)e.set(s.stepId,{status:s.status,progress:s.progress});Y=Re(t);for(const s of Y){const l=e.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(kt(),t>1){const s=de.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=s.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((r=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:r.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)l.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),l.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),l.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=l,mt(s)}}const i=de.find(s=>s.id==="render");if(i&&t>1){const s=i.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=i.steps.find(d=>d.id==="upscale");l&&(l.label="Full Video"),mt(i)}Fe(),Ne()}function mt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(r=>r.remove()),t.steps.forEach(r=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${r.id}`;let c="";r.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${r.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${r.label}</span>
            ${c}
        `,e.appendChild(p)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function Pe(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Pe(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Pe(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Le(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function ht(){try{const t=document.querySelectorAll("video");let e=null;for(const i of t)if(i.src&&i.src.startsWith("http")&&i.getBoundingClientRect().width>100){e=i.src;break}if(!e){for(const i of t)if(i.src&&i.getBoundingClientRect().width>50){e=i.src;break}}if(!e)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;if(n(`[TikTok] พบ video URL: ${e.substring(0,80)}...`),e.startsWith("https://"))try{await new Promise(i=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),i()})})}catch{}return e}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}function Ge(t){if(t)try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}const qe=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ve=/Win/i.test(navigator.userAgent),ge=qe?"🍎 Mac":Ve?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ge}`);class He extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const m=t=>new Promise((e,i)=>{if(window.__NETFLOW_STOP__)return i(new He);const o=setTimeout(()=>{if(window.__NETFLOW_STOP__)return i(new He);e()},t);m._lastId=o});function pe(){return!!window.__NETFLOW_STOP__}function bt(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=(document.body.textContent||"").toLowerCase();if(!t.some(p=>e.includes(p)))return null;const o=document.querySelectorAll("span, p, h1, h2, h3, li");for(const p of o){if(p.closest("#netflow-engine-overlay"))continue;const c=(p.textContent||"").trim().toLowerCase();if(!(c.length>200||c.length<5)){for(const s of t)if(c.includes(s))return((r=p.textContent)==null?void 0:r.trim())||s}}return null}async function ee(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,r={bubbles:!0,cancelable:!0,clientX:i,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",r)),await m(80),t.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",r)),t.dispatchEvent(new MouseEvent("click",r)),await m(50),t.click()}function zt(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,r={bubbles:!0,cancelable:!0,clientX:i,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",r)),t.dispatchEvent(new PointerEvent("pointerover",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",r)),t.dispatchEvent(new PointerEvent("pointermove",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",r))}function Ft(t){const e=[],i=document.querySelectorAll("i");for(const o of i){if((o.textContent||"").trim()!==t)continue;let p=o,c=null,s=1/0;for(let l=0;l<20&&p&&(p=p.parentElement,!(!p||p===document.body));l++){const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const g=d.width*d.height;g<s&&(c=p,s=g)}}c&&!e.includes(c)&&e.push(c)}return e.sort((o,r)=>{const p=o.getBoundingClientRect(),c=r.getBoundingClientRect();return p.left-c.left}),e}function We(t=!1){const e=[],i=document.querySelectorAll("video");for(const c of i){let s=c.parentElement;for(let l=0;l<10&&s;l++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of o){const s=(c.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=c.parentElement;for(let d=0;d<10&&l;d++){const g=l.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){e.push({el:l,left:g.left});break}l=l.parentElement}}}const r=document.querySelectorAll("img");for(const c of r){const s=(c.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=c.parentElement;for(let d=0;d<10&&l;d++){const g=l.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){e.push({el:l,left:g.left});break}l=l.parentElement}}}const p=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(s=>s.el===c));if(p.sort((c,s)=>c.left-s.left),p.length>0){const c=p[0].el,s=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Lt(){const t=Ft("image");if(t.length>0){const i=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${i.left.toFixed(0)},${i.top.toFixed(0)}) ขนาด ${i.width.toFixed(0)}x${i.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const i of e){let o=i.parentElement;for(let r=0;r<10&&o;r++){const p=o.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Gt(t,e){var s;const[i,o]=t.split(","),r=((s=i.match(/:(.*?);/))==null?void 0:s[1])||"image/png",p=atob(o),c=new Uint8Array(p.length);for(let l=0;l<p.length;l++)c[l]=p.charCodeAt(l);return new File([c],e,{type:r})}function ke(t){var o;const e=[],i=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const r of i)if(((o=r.textContent)==null?void 0:o.trim())===t){const p=r.closest("button");p&&e.push(p)}return e}function qt(){const t=[...ke("add"),...ke("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const r of o){const p=r.getBoundingClientRect();if(p.bottom>window.innerHeight*.7&&p.width<60&&p.height<60){const c=(r.textContent||"").trim();if(c==="+"||c==="add")return r}}return null}let e=null,i=0;for(const o of t){const r=o.getBoundingClientRect();r.y>i&&(i=r.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${i.toFixed(0)}`),e}function wt(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const r=ke(o);let p=null,c=0;for(const s of r){const l=s.getBoundingClientRect();l.y>c&&(c=l.y,p=s)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${c.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,i=0;for(const o of t){const r=o.getBoundingClientRect();if(r.bottom>window.innerHeight*.7&&r.right>window.innerWidth*.5){const p=Math.abs(r.width-r.height)<10&&r.width<60,c=r.y+r.x+(p?1e3:0);c>i&&(i=c,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const r=(o.getAttribute("aria-label")||"").toLowerCase();if(r.includes("generate")||r.includes("submit")||r.includes("send")||r.includes("สร้าง"))return o}return null}function xt(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const i=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of i){const r=o.placeholder||"";if(r.includes("สร้าง")||r.includes("prompt")||r.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function Se(t,e){var i,o,r,p;t.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),await m(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await m(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await m(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await m(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(s),await m(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((i=navigator.clipboard)!=null&&i.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await m(200),document.execCommand("paste"),await m(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(c){let s=t[c];for(let l=0;l<30&&s;l++){const d=s.memoizedProps,g=s.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const b=d.editor;b.selection,b.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(r=g==null?void 0:g.memoizedState)==null?void 0:r.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),g.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Vt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const i of e)t.push({input:i,origType:"file"}),i.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Ht(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ge})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ge})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Wt(t,e,i){var d;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),r=[...t.map(g=>g.input)];for(const g of o)!r.includes(g)&&g.offsetParent===null&&r.push(g);for(const g of r)g.type="file";n(`คืนค่า input ${r.length} ตัวเป็น type=file`);const p=document.querySelectorAll('input[type="file"]');if(p.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ge})`),!1;let c;if(i&&i.size>0){const g=Array.from(p).filter(b=>!i.has(b));g.length>0?(c=g[g.length-1],n(`เล็งเป้า file input ใหม่ (${g.length} ใหม่, ${p.length} ทั้งหมด)`)):(c=p[p.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${p.length} ตัว`))}else c=p[p.length-1];const s=new DataTransfer;s.items.add(e);try{c.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=c.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(g){n(`กำหนด target.files ล้มเหลว: ${g.message} — ลอง defineProperty`);try{Object.defineProperty(c,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(b){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${b.message}`),!1}}const l=c._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),c.dispatchEvent(new Event("change",{bubbles:!0})),c.dispatchEvent(new Event("input",{bubbles:!0}));try{const g=new DataTransfer;g.items.add(e);const b=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:g});c.dispatchEvent(b),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ge}`),!0}function re(){let t=0;const e=document.querySelectorAll("img");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const r=o.getBoundingClientRect();r.bottom>window.innerHeight*.6&&r.width>20&&r.width<200&&r.height>20&&r.height<200&&o.src&&o.offsetParent!==null&&t++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of i){if(o.closest("#netflow-engine-overlay"))continue;const r=o.getBoundingClientRect();r.bottom>window.innerHeight*.6&&r.width>20&&r.width<200&&r.height>20&&r.height<200&&o.offsetParent!==null&&t++}return t}async function Ie(t,e){var g;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const i=Gt(t,e);n(`ขนาดไฟล์: ${(i.size/1024).toFixed(1)} KB`);const o=re();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const r=async(b,I=8e3)=>{const k=Date.now();for(;Date.now()-k<I;){const $=re();if($>o)return n(`✅ [${b}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${$}`),!0;await m(500)}return n(`⚠️ [${b}] รูปย่อไม่เพิ่ม (ยังคง ${re()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const p=qt();if(!p)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const s=Ht();let l=Vt();const d=new MutationObserver(b=>{for(const I of b)for(const k of I.addedNodes)if(k instanceof HTMLInputElement&&k.type==="file"&&(k.type="text",l.push({input:k,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),k instanceof HTMLElement){const $=k.querySelectorAll('input[type="file"]');for(const w of $)w.type="text",l.push({input:w,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{p.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let b=!1;const I=Date.now();for(;!b&&Date.now()-I<5e3;){const $=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const w of $){if(w===p)continue;const a=w.querySelectorAll("i");for(const C of a){const z=((g=C.textContent)==null?void 0:g.trim())||"";if((z==="upload"||z==="upload_file")&&!Array.from(w.querySelectorAll("i")).map(R=>{var V;return(V=R.textContent)==null?void 0:V.trim()}).includes("drive_folder_upload")){w.click(),b=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${z}) ✅`);break}}if(b)break}if(!b)for(const w of $){if(w===p)continue;const a=w.childNodes.length<=5?(w.textContent||"").trim():"";if(a.length>0&&a.length<40){const C=a.toLowerCase();if(C==="upload"||C==="อัปโหลด"||C==="อัพโหลด"||C.includes("upload image")||C.includes("upload photo")||C.includes("อัปโหลดรูปภาพ")||C.includes("อัพโหลดรูปภาพ")||C.includes("from computer")||C.includes("จากคอมพิวเตอร์")){w.click(),b=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${a}") ✅`);break}}}b||await m(500)}return b?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Wt(l,i,c)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await r("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const b of l)b.input.type!=="file"&&(b.input.type="file")}}async function Ut(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const i=document.querySelectorAll("button");let o=null;for(const k of i){const $=k.textContent||"";if(($.includes("Nano Banana")||$.includes("Imagen")||$.includes("วิดีโอ")||$.includes("รูปภาพ")||$.includes("Image")||$.includes("Video"))&&k.getBoundingClientRect().bottom>window.innerHeight*.7){o=k,n(`พบปุ่มตั้งค่าจากข้อความ: "${$.substring(0,30).trim()}"`);break}}if(!o)for(const k of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const $=ke(k);for(const w of $)if(w.getBoundingClientRect().bottom>window.innerHeight*.7){o=w,n(`พบปุ่มตั้งค่าจากไอคอน: ${k}`);break}if(o)break}if(!o)return A("ไม่พบปุ่มตั้งค่า"),!1;const r=o.getBoundingClientRect(),p=r.left+r.width/2,c=r.top+r.height/2,s={bubbles:!0,cancelable:!0,clientX:p,clientY:c,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let l=!1,d=null;const g=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const k of g){const $=k.getAttribute("aria-controls")||"",w=k.id||"";if($.toUpperCase().includes("IMAGE")||w.toUpperCase().includes("IMAGE")){d=k,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${$})`);break}}if(!d)for(const k of document.querySelectorAll('[role="tab"]')){const $=k.id||"";if($.toUpperCase().includes("TRIGGER-IMAGE")){d=k,n(`พบแท็บ Image ผ่าน id: ${$}`);break}}if(!d)for(const k of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const $=(k.textContent||"").trim();if(($==="Image"||$.endsWith("Image")||$==="รูปภาพ"||$==="ภาพ")&&!$.includes("Video")&&!$.includes("วิดีโอ")){d=k,n(`พบแท็บ Image ผ่านข้อความ: "${$}"`);break}}if(d){const k=d.getAttribute("data-state")||"",$=d.getAttribute("aria-selected")||"";if(k==="active"||$==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const w=d.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:w.left+w.width/2,clientY:w.top+w.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",a)),await m(80),d.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",a)),d.dispatchEvent(new MouseEvent("click",a)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const b=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const k of document.querySelectorAll("button, [role='tab'], [role='option']")){const $=(k.textContent||"").trim();if($===b||$.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const w=k.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:w.left+w.width/2,clientY:w.top+w.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",a)),await m(80),k.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",a)),k.dispatchEvent(new MouseEvent("click",a)),n(`เลือกทิศทาง: ${b}`),await m(400);break}}const I=`x${e}`;for(const k of document.querySelectorAll("button, [role='tab'], [role='option']"))if((k.textContent||"").trim()===I){const w=k.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:w.left+w.width/2,clientY:w.top+w.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",a)),await m(80),k.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",a)),k.dispatchEvent(new MouseEvent("click",a)),n(`เลือกจำนวน: ${I}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function Yt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let i=null;const o=document.querySelectorAll("button");for(const b of o){const I=(b.textContent||"").trim();if(I.includes("Veo 3.1")&&I.includes("arrow_drop_down")){i=b,n(`พบปุ่ม Veo dropdown: "${I.substring(0,40).trim()}"`);break}}if(!i){for(const b of o)if(b.getAttribute("aria-haspopup")==="menu"){const I=(b.textContent||"").trim();if(I.includes("Veo")){i=b,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${I.substring(0,40).trim()}"`);break}}}if(!i)for(const b of o){const I=(b.textContent||"").trim();if(I.includes("Veo 3.1")&&b.getBoundingClientRect().bottom>window.innerHeight*.7){i=b,n(`พบปุ่ม Veo dropdown (bottom area): "${I.substring(0,40).trim()}"`);break}}if(!i)return A("ไม่พบปุ่ม Veo quality dropdown"),!1;if((i.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=i.getBoundingClientRect(),c=p.left+p.width/2,s=p.top+p.height/2,l={bubbles:!0,cancelable:!0,clientX:c,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",l)),await m(80),i.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",l)),i.dispatchEvent(new MouseEvent("click",l)),n("คลิกเปิด Veo quality dropdown"),await m(1e3);let d=!1;const g=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const b of g){const I=b.querySelectorAll("span");for(const k of I)if((k.textContent||"").trim()===e){const w=b.getBoundingClientRect();if(w.width>0&&w.height>0){const a=w.left+w.width/2,C=w.top+w.height/2,z={bubbles:!0,cancelable:!0,clientX:a,clientY:C,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",z)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",z)),b.dispatchEvent(new MouseEvent("click",z)),n(`✅ เลือก "${e}" สำเร็จ`),d=!0;break}}if(d)break;if(!d){const k=(b.textContent||"").trim();if(k.includes(e)&&!k.includes("arrow_drop_down")){const $=b.getBoundingClientRect();if($.width>0&&$.height>0){const w=$.left+$.width/2,a=$.top+$.height/2,C={bubbles:!0,cancelable:!0,clientX:w,clientY:a,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",C)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",C)),b.dispatchEvent(new MouseEvent("click",C)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),d=!0;break}}}}return d?(await m(600),!0):(A(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),!1)}async function Xt(t){var z,D,R,V;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,i=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=i?i[1]:"unknown",r=qe?"macOS":Ve?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=qe?((D=(z=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:z[1])==null?void 0:D.replace(/_/g,"."))||"":Ve&&((R=e.match(/Windows NT ([0-9.]+)/))==null?void 0:R[1])||"",c=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${r} ${p} | Chrome ${o}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${s} | แพลตฟอร์ม: ${ge}`),n("══════════════════════════════════════════");try{Ae(t.theme)}catch{}try{ze()}catch(x){console.warn("Overlay show error:",x)}const l=[],d=[];try{P("settings","active");const x=t.orientation||"horizontal",f=t.outputCount||1,h=await Ut(x,f);l.push(h?"✅ Settings":"⚠️ Settings"),P("settings",h?"done":"error")}catch(x){A(`ตั้งค่าผิดพลาด: ${x.message}`),l.push("⚠️ Settings"),P("settings","error")}try{const x=t.veoQuality||"fast";await Yt(x)?(l.push(`✅ Veo ${x}`),n(`✅ Veo quality: ${x}`)):(l.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(x){A(`Veo quality error: ${x.message}`),l.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const g=()=>{const x=document.querySelectorAll("span, small, label");for(const f of x){if(f.closest("#netflow-engine-overlay"))continue;const h=(f.textContent||"").trim();if(h.length>5||!/^\d{1,3}%$/.test(h))continue;if(h==="100%")return null;const E=f.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<80&&E.height<40&&E.top>window.innerHeight*.5&&E.top<window.innerHeight)return h}return null},b=async x=>{n(`รอการอัพโหลด ${x} เสร็จ...`),await m(2e3);const f=Date.now(),h=6e4;let E="",N=Date.now();const B=15e3;for(;Date.now()-f<h;){const u=g();if(u){if(u!==E)E=u,N=Date.now();else if(Date.now()-N>B){n(`✅ อัพโหลด ${x} — % ค้างที่ ${u} นาน ${B/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${u} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${x} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}A(`⚠️ อัพโหลด ${x} หมดเวลาหลัง ${h/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){P("upload-char","active");const x=re();try{const h=await Ie(t.characterImage,"character.png");l.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||d.push("character upload failed"),P("upload-char",h?"done":"error")}catch(h){A(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),l.push("❌ ตัวละคร"),d.push("character upload error"),P("upload-char","error")}if(await b("character"),re()<=x){n("⚠️ ตัวละครอัพโหลดไม่เพิ่มรูปย่อ — ลองอีกครั้ง..."),await m(2e3);try{await Ie(t.characterImage,"character.png")?n("✅ ลองอัพโหลดตัวละครซ้ำสำเร็จ"):A("⚠️ ลองอัพโหลดตัวละครซ้ำไม่สำเร็จ"),await b("character-retry")}catch{}}}else ue("upload-char");if(t.productImage){P("upload-prod","active");const x=re();try{const h=await Ie(t.productImage,"product.png");l.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||d.push("product upload failed"),P("upload-prod",h?"done":"error")}catch(h){A(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),l.push("❌ สินค้า"),d.push("product upload error"),P("upload-prod","error")}if(await b("product"),re()<=x){n("⚠️ สินค้าอัพโหลดไม่เพิ่มรูปย่อ — ลองอีกครั้ง..."),await m(2e3);try{await Ie(t.productImage,"product.png")?n("✅ ลองอัพโหลดสินค้าซ้ำสำเร็จ"):A("⚠️ ลองอัพโหลดสินค้าซ้ำไม่สำเร็จ"),await b("product-retry")}catch{}}}else ue("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const I=g();I&&(n(`⚠️ อัพโหลดยังแสดง ${I} — รอเพิ่มเติม...`),await b("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const k=(t.characterImage?1:0)+(t.productImage?1:0);if(k>0){let x=re();x<k&&(n(`⏳ เห็นรูปย่อแค่ ${x}/${k} — รอ 3 วินาที...`),await m(3e3),x=re()),x>=k?n(`✅ ยืนยันรูปย่ออ้างอิง: ${x}/${k}`):A(`⚠️ คาดว่าจะมี ${k} รูปย่อ แต่พบ ${x} — ดำเนินการต่อ`)}if(pe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Ee(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await m(1e3);const $=xt();$?(await Se($,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),P("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),d.push("prompt input not found"),P("img-prompt","error")),await m(800);const w=new Set;document.querySelectorAll("img").forEach(x=>{x.src&&w.add(x.src)}),n(`บันทึกรูปเดิม: ${w.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await m(500);const a=wt();if(a){const x=a.getBoundingClientRect(),f=x.left+x.width/2,h=x.top+x.height/2,E={bubbles:!0,cancelable:!0,clientX:f,clientY:h,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",E)),a.dispatchEvent(new MouseEvent("click",E)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await m(500),a.dispatchEvent(new PointerEvent("pointerdown",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",E)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...E,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",E)),a.dispatchEvent(new MouseEvent("click",E)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),d.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const x=()=>{const B=document.querySelectorAll("div, span, p, label, strong, small");for(const u of B){if(u.closest("#netflow-engine-overlay"))continue;const v=(u.textContent||"").trim();if(v.length>10)continue;const M=v.match(/(\d{1,3})\s*%/);if(!M)continue;const S=parseInt(M[1],10);if(S<1||S>100)continue;const y=u.getBoundingClientRect();if(!(y.width===0||y.width>150)&&!(y.top<0||y.top>window.innerHeight))return S}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,h=-1,E=0;const N=Date.now();for(;!f&&Date.now()-N<18e4;){const B=document.querySelectorAll("img");for(const u of B){if(w.has(u.src)||!(u.alt||"").toLowerCase().includes("generated"))continue;const M=u.getBoundingClientRect();if(M.width>120&&M.height>120&&M.top>0&&M.top<window.innerHeight*.85){const S=u.closest("div");if(S){f=S,n(`พบรูป AI จาก alt="${u.alt}": ${u.src.substring(0,80)}...`);break}}}if(!f)for(const u of B){if(w.has(u.src))continue;const v=u.closest("div"),M=(v==null?void 0:v.textContent)||"";if(M.includes("product.png")||M.includes("character.png")||M.includes(".png")||M.includes(".jpg"))continue;const S=u.getBoundingClientRect();if(S.width>120&&S.height>120&&S.top>0&&S.top<window.innerHeight*.85){const y=u.closest("div");if(y){f=y,n(`พบรูปใหม่ (สำรอง): ${u.src.substring(0,80)}...`);break}}}if(!f){if(pe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const u=bt();if(u){A(`❌ สร้างรูปล้มเหลว: ${u}`),d.push(`image gen failed: ${u}`),P("img-wait","error");break}const v=x();v!==null?(v!==h&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${v}%`),h=v,P("img-wait","active",v)),E=Date.now()):h>30&&Math.floor((Date.now()-E)/1e3)>=3&&n(`🖼️ % หายที่ ${h}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!f)A("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),P("img-wait","done",100);const B=f.getBoundingClientRect(),u=B.left+B.width/2,v=B.top+B.height/2,M={bubbles:!0,cancelable:!0,clientX:u,clientY:v};f.dispatchEvent(new PointerEvent("pointerenter",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",M)),f.dispatchEvent(new PointerEvent("pointerover",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",M)),f.dispatchEvent(new PointerEvent("pointermove",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",M)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let S=null;for(const y of["more_vert","more_horiz","more"]){const _=ke(y);for(const O of _){const T=O.getBoundingClientRect();if(T.top>=B.top-20&&T.top<=B.bottom&&T.right>=B.right-150&&T.right<=B.right+20){S=O;break}}if(S)break}if(!S){const y=document.querySelectorAll("button");for(const _ of y){const O=_.getBoundingClientRect();if(O.width<50&&O.height<50&&O.top>=B.top-10&&O.top<=B.top+60&&O.left>=B.right-80){const T=_.querySelectorAll("i");for(const H of T)if((((V=H.textContent)==null?void 0:V.trim())||"").includes("more")){S=_;break}if(S)break;const G=_.getAttribute("aria-label")||"";if(G.includes("เพิ่มเติม")||G.includes("more")){S=_;break}}}}if(!S)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const y=S.getBoundingClientRect(),_=y.left+y.width/2,O=y.top+y.height/2,T={bubbles:!0,cancelable:!0,clientX:_,clientY:O,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",T)),await m(80),S.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",T)),S.dispatchEvent(new MouseEvent("click",T)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let G=null;const H=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const q of H){const W=(q.textContent||"").trim();if(W.includes("ทำให้เป็นภาพเคลื่อนไหว")||W.includes("Animate")||W.includes("animate")){G=q;break}}if(!G)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const q=G.getBoundingClientRect(),W=q.left+q.width/2,K=q.top+q.height/2,F={bubbles:!0,cancelable:!0,clientX:W,clientY:K,button:0};G.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),G.dispatchEvent(new MouseEvent("mousedown",F)),await m(80),G.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),G.dispatchEvent(new MouseEvent("mouseup",F)),G.dispatchEvent(new MouseEvent("click",F)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),P("animate","done"),await m(3e3)}}}}catch(x){A(`ขั้น 4 ผิดพลาด: ${x.message}`),l.push("⚠️ Animate")}if(pe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Ee(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let x=!1;const f=document.querySelectorAll("button, span, div");for(const N of f){const B=(N.textContent||"").trim(),u=N.getBoundingClientRect();if((B==="วิดีโอ"||B==="Video"||B.includes("วิดีโอ"))&&u.bottom>window.innerHeight*.7){x=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}x||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const h=xt();h?(await Se(h,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),P("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),d.push("video prompt input not found"),P("vid-prompt","error")),await m(1e3),P("vid-generate","active");const E=wt();if(E){const N=E.getBoundingClientRect(),B=N.left+N.width/2,u=N.top+N.height/2,v={bubbles:!0,cancelable:!0,clientX:B,clientY:u,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),E.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",v)),E.dispatchEvent(new MouseEvent("click",v)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),P("vid-generate","done"),await m(500),E.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),E.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",v)),E.dispatchEvent(new MouseEvent("click",v)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),d.push("video generate button not found"),P("vid-generate","error")}catch(x){A(`ขั้น 5 ผิดพลาด: ${x.message}`),l.push("⚠️ Video Gen"),d.push(`video gen error: ${x.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ue("animate"),ue("vid-prompt"),ue("vid-generate"),ue("vid-wait");if(t.videoPrompt){P("vid-wait","active");const x=t.sceneCount||1,f=t.videoScenePrompts||[t.videoPrompt];if(x>1)try{Ot(x)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${x>1?`ต่อ ${x} ฉาก`:"ดาวน์โหลด"} ===`);let h=null;const E=()=>{if(h&&h.isConnected&&!h.closest("#netflow-engine-overlay")){const M=(h.textContent||"").trim();if(M.length<=10){const S=M.match(/(\d{1,3})\s*%/);if(S){const y=parseInt(S[1],10);if(y>=1&&y<=100)return y}}h=null}const u=document.querySelectorAll('[role="progressbar"]');for(const M of u){if(M.closest("#netflow-engine-overlay"))continue;const S=M.getAttribute("aria-valuenow");if(S){const y=parseFloat(S);if(y>=1&&y<=100)return y}}const v=document.querySelectorAll("span, small, label, p");for(const M of v){if(M.closest("#netflow-engine-overlay"))continue;const S=(M.textContent||"").trim();if(S.length>10||S.length<2)continue;const y=S.match(/(\d{1,3})\s*%/);if(!y)continue;const _=parseInt(y[1],10);if(_<1||_>100)continue;const O=M.getBoundingClientRect();if(!(O.width===0||O.width>150)&&!(O.top<0||O.top>window.innerHeight))return h=M,_}return null},N=async(u=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await m(5e3);const v=()=>{const L=document.querySelectorAll("div, span, p, label, strong, small");let j=0;for(const U of L){if(U.closest("#netflow-engine-overlay"))continue;const te=(U.textContent||"").trim();if(te.includes("%")&&te.length<15){const me=U.tagName.toLowerCase(),Te=U.className&&typeof U.className=="string"?U.className.split(/\s+/).slice(0,2).join(" "):"",Ue=U.getBoundingClientRect();if(n(`  🔍 "${te}" ใน <${me}.${Te}> ที่ (${Ue.left.toFixed(0)},${Ue.top.toFixed(0)}) w=${Ue.width.toFixed(0)}`),j++,j>=5)break}}j===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},M=We();n(M?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const S=Date.now();let y=-1,_=0,O=!1,T=0;for(;Date.now()-S<u;){T++;const L=E();if(L!==null){if(L!==y&&(n(`ความคืบหน้าวิดีโอ: ${L}%`),y=L,P("vid-wait","active",L)),_=Date.now(),L>=100){n("✅ ตรวจพบ 100%!"),O=!0;break}}else if(y>0){const U=Math.floor((Date.now()-_)/1e3);if(U>=5){n(`✅ % หายไปที่ ${y}% (หาย ${U} วินาที) — วิดีโอเสร็จ!`),O=!0;break}n(`⏳ % หายที่ ${y}% — ยืนยันใน ${5-U} วินาที...`)}else{const U=Math.floor((Date.now()-S)/1e3);U%15<3&&n(`⏳ รอ... (${U} วินาที) ไม่พบ %`)}const j=Math.floor((Date.now()-S)/1e3);if(!O&&(y>0||j>=30)&&T%5===0){if(We(!0)&&!M){n(`✅ การ์ดวิดีโอปรากฏขึ้น${y>0?`ที่ ${y}%`:" (ไม่พบ %)"} — วิดีโอเสร็จ!`),O=!0;break}if(y<=0){const te=document.querySelectorAll("video");for(const me of te){const Te=me.getBoundingClientRect();if(Te.width>200&&Te.height>100&&me.readyState>=2&&me.src){n("✅ พบ <video> พร้อมเล่น (ไม่พบ %) — วิดีโอเสร็จ!"),O=!0;break}}if(O)break;if(j>=90){n(`✅ ไม่พบ % มานาน ${j} วินาที — ถือว่าเสร็จ`),O=!0;break}}}if(pe())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(y<1&&T%5===0){const U=bt();if(U)return A(`❌ สร้างวิดีโอล้มเหลว: ${U}`),null}await m(3e3)}const G=We();if(!G)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),P("vid-wait","error"),null;const H=G;O?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const q=H.getBoundingClientRect();let W=q.left+q.width/2,K=q.top+q.height/2,F=H;const Z=H.querySelector("video, img, canvas");if(Z){const L=Z.getBoundingClientRect();L.width>50&&L.height>50&&(W=L.left+L.width/2,K=L.top+L.height/2,F=Z,n(`🎯 พบรูปย่อ <${Z.tagName.toLowerCase()}> ในการ์ดที่ (${W.toFixed(0)},${K.toFixed(0)}) ${L.width.toFixed(0)}x${L.height.toFixed(0)}`))}else K=q.top+q.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${W.toFixed(0)},${K.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${W.toFixed(0)}, ${K.toFixed(0)})...`),zt(F);for(let L=0;L<8;L++){const j={bubbles:!0,cancelable:!0,clientX:W+L%2,clientY:K};F.dispatchEvent(new PointerEvent("pointermove",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mousemove",j)),await m(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:x,scenePrompts:f,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${x} ฉาก, ${f.length} prompts, theme: ${t.theme})`)}catch(L){n(`⚠️ ไม่สามารถบันทึก pending action: ${L.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await B(F),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},B=async u=>{const v=u.getBoundingClientRect(),M=v.left+v.width/2,S=v.top+v.height/2,y={bubbles:!0,cancelable:!0,clientX:M,clientY:S,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),u.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",y)),u.dispatchEvent(new MouseEvent("click",y)),await m(50),u.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await N())A("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),P("vid-wait","error");else{l.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const v=await new Promise(M=>{chrome.storage.local.get("netflow_pending_action",S=>{if(chrome.runtime.lastError){M(null);return}M((S==null?void 0:S.netflow_pending_action)||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),v.action==="mute_video"?await vt(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await yt(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch(u){A(`ขั้น 6 ผิดพลาด: ${u.message}`),l.push("⚠️ Step6"),d.push(`step 6: ${u.message}`)}}const C=d.length===0;try{Ee(C?5e3:8e3)}catch(x){console.warn("Overlay complete error:",x)}return{success:C,message:C?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${d.join(", ")}`,step:C?"done":"partial"}}async function vt(t,e=[],i){var z;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{i&&Ae(i)}catch{}try{ze(t)}catch(D){n(`⚠️ showOverlay error: ${D.message}`)}try{const D=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const R of D)P(R,"done");t>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${D.length} steps done, sceneCount=${t}`)}catch(D){n(`⚠️ overlay restore error: ${D.message}`)}await m(1500);const o=(()=>{for(const D of document.querySelectorAll("button")){const R=D.querySelectorAll("i");for(const x of R){const f=(x.textContent||"").trim();if(f==="volume_up"||f==="volume_off"||f==="volume_mute"){const h=D.getBoundingClientRect();if(h.width>0&&h.height>0)return D}}const V=(D.getAttribute("aria-label")||"").toLowerCase();if(V.includes("mute")||V.includes("ปิดเสียง")){const x=D.getBoundingClientRect();if(x.width>0&&x.height>0)return D}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");const r=await ht();if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let u=2;u<=t;u++){const v=e[u-1];if(!v){A(`ไม่พบ prompt สำหรับฉากที่ ${u}`);continue}n(`── ฉากที่ ${u}/${t}: วาง prompt + generate ──`);let M=null;const S=Date.now();for(;!M&&Date.now()-S<1e4;){const F=document.querySelectorAll("[data-slate-editor='true']");if(F.length>0&&(M=F[F.length-1]),!M){const Z=document.querySelectorAll("[role='textbox'][contenteditable='true']");Z.length>0&&(M=Z[Z.length-1])}M||await m(1e3)}if(!M){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${M.tagName.toLowerCase()}> ${M.className.substring(0,40)}`),await Se(M,v),n(`วาง prompt ฉาก ${u} (${v.length} ตัวอักษร) ✅`);try{P(`scene${u}-prompt`,"done"),P(`scene${u}-gen`,"active")}catch{}await m(1e3);const y=M.getBoundingClientRect();let _=null,O=1/0;for(const F of document.querySelectorAll("button")){if(F.disabled)continue;const Z=F.querySelectorAll("i");let L=!1;for(const te of Z)if((te.textContent||"").trim()==="arrow_forward"){L=!0;break}if(!L)continue;const j=F.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const U=Math.abs(j.top-y.top)+Math.abs(j.right-y.right);U<O&&(O=U,_=F)}if(!_)for(const F of document.querySelectorAll("button")){const Z=F.querySelectorAll("i");for(const L of Z)if((L.textContent||"").trim()==="arrow_forward"){const j=F.getBoundingClientRect();if(j.width>0&&j.height>0){_=F;break}}if(_)break}if(!_){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(F=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:u,scenePrompts:e}},()=>F())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${u}/${t})`),await ee(_),n(`คลิก Generate ฉาก ${u} ✅`);try{P(`scene${u}-gen`,"done"),P(`scene${u}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${u} gen เสร็จ ──`),await m(5e3);let T=0,G=0;const H=Date.now(),q=6e5,W=5e3;let K=!1;for(;Date.now()-H<q;){let F=null;const Z=document.querySelectorAll("div, span, p, label, strong, small");for(const L of Z){if(L.closest("#netflow-engine-overlay"))continue;const U=(L.textContent||"").trim().match(/^(\d{1,3})%$/);if(U){const te=L.getBoundingClientRect();if(te.width>0&&te.height>0&&te.width<120&&te.height<60){F=parseInt(U[1],10);break}}}if(F!==null){if(F!==T){n(`🎬 ฉาก ${u} ความคืบหน้า: ${F}%`),T=F;try{P(`scene${u}-wait`,"active",F)}catch{}}G=0}else if(T>0){if(G===0)G=Date.now(),n(`🔍 ฉาก ${u}: % หายไป (จาก ${T}%) — กำลังยืนยัน...`);else if(Date.now()-G>=W){n(`✅ ฉาก ${u}: % หายไป ${W/1e3} วินาที — เจนเสร็จ!`),K=!0;break}}if(pe()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}K||A(`ฉาก ${u} หมดเวลา`),n(`✅ ฉาก ${u} เสร็จแล้ว`);try{P(`scene${u}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}await m(2e3);const D=Date.now();let R=null;const V=Date.now();for(;!R&&Date.now()-V<1e4;){for(const u of document.querySelectorAll("button")){const v=u.querySelector("i");if(v&&(v.textContent||"").trim()==="download"){const M=u.getBoundingClientRect();if(M.width>0&&M.height>0){R=u;break}}}R||await m(1e3)}if(!R){A("ไม่พบปุ่มดาวน์โหลด");return}await ee(R),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await m(1500);let x=null;for(let u=0;u<3&&!x;u++){u>0&&n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`);let v=null;const M=Date.now();for(;!v&&Date.now()-M<5e3;){for(const T of document.querySelectorAll("[role='menuitem']"))if((T.textContent||"").trim().includes("Full Video")&&T.querySelector("i")){const H=T.getBoundingClientRect();if(H.width>0&&H.height>0){v=T;break}}v||await m(500)}if(!v){A("ไม่พบ Full Video");continue}const S=v.getBoundingClientRect(),y=S.left+S.width/2,_=S.top+S.height/2;v.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:y,clientY:_})),v.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:y,clientY:_})),v.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:y,clientY:_})),await ee(v),n("คลิก/hover Full Video ✅"),await m(2e3);const O=Date.now();for(;!x&&Date.now()-O<8e3;){for(const T of document.querySelectorAll("button[role='menuitem']")){const G=T.querySelectorAll("span");for(const H of G)if((H.textContent||"").trim()==="720p"){const q=T.getBoundingClientRect();if(q.width>0&&q.height>0){x=T;break}}if(x)break}x||(v.isConnected&&(v.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:y,clientY:_})),v.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:y+20,clientY:_}))),await m(500))}}if(!x){A("ไม่พบ 720p");return}await ee(x),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const f=Date.now();let h=!1,E=!1;for(;Date.now()-f<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const v=(u.textContent||"").trim();if(v==="Download complete!"||v==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),h=!0;break}(v.includes("Downloading your extended video")||v.includes("กำลังดาวน์โหลด"))&&(E||(E=!0,n("⏳ กำลังดาวน์โหลด...")))}if(h)break;if(E){let u=!1;for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((v.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),h=!0;break}}if(pe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await m(2e3)}if(!h){A("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let N=!1;const B=Date.now();for(;Date.now()-B<6e4&&!N;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},v=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):v!=null&&v.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${v.message}`),N=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${v==null?void 0:v.message}`),u()})})}catch(u){A(`ตรวจสอบผิดพลาด: ${u.message}`)}N||await m(3e3)}N||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),Ee(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Ge(r),Le(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const p=(D,R="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const V of document.querySelectorAll(R)){const x=(V.textContent||"").trim();if(x.includes(D)&&x.length<100){const f=V.getBoundingClientRect();if(f.width>0&&f.height>0&&f.top>=0)return V}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const s=Date.now();for(;!c&&Date.now()-s<1e4;){for(const D of document.querySelectorAll("button, [role='button']")){const R=(D.textContent||"").trim(),V=R.toLowerCase();if((V.includes("download")||V.includes("ดาวน์โหลด"))&&R.length<80){const x=D.getBoundingClientRect();if(x.width>0&&x.height>0){c=D;break}}}if(!c)for(const D of document.querySelectorAll("button")){const R=(D.getAttribute("aria-label")||"").toLowerCase();if(R.includes("download")||R.includes("ดาวน์")){const V=D.getBoundingClientRect();if(V.width>0&&V.height>0){c=D;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!c){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await ee(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const l=Date.now();let d=null;const g=Date.now();for(;!d&&Date.now()-g<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await m(500));if(!d){A("ไม่พบ 1080p");return}await ee(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const b=Date.now();let I=!1,k=!1,$=0;const w=3e3;for(;Date.now()-b<3e5;){const R=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(R.includes("upscaling complete")||R.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),I=!0;break}for(const x of document.querySelectorAll("div, span, p")){const f=(x.textContent||"").trim().toLowerCase();if(f.length<60&&(f.includes("upscaling complete")||f.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(z=x.textContent)==null?void 0:z.trim()}")`),I=!0;break}}if(I)break;if(R.includes("upscaling your video")||R.includes("กำลังอัปสเกล")){k=!0,$=0;const x=Math.floor((Date.now()-b)/1e3);n(`⏳ กำลังอัปสเกล... (${x} วินาที)`)}else if(k){if($===0)$=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-$>=w){n(`✅ ข้อความ Upscaling หายไป ${w/1e3} วินาที — เสร็จ!`),I=!0;break}}else{const x=Math.floor((Date.now()-b)/1e3);x%10<3&&n(`⏳ รอ Upscale... (${x} วินาที)`)}if(pe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!I){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let a=!1;const C=Date.now();for(;Date.now()-C<6e4&&!a;){try{await new Promise(D=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},R=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):R!=null&&R.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${R.message}`),a=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${R==null?void 0:R.message}`),D()})})}catch(D){A(`ตรวจสอบผิดพลาด: ${D.message}`)}a||await m(3e3)}a||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Ge(r),Le(2e3)}async function yt(t=2,e=2,i,o=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{i&&Ae(i)}catch{}try{ze(t)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let h=2;h<=e;h++)f.push(`scene${h}-prompt`,`scene${h}-gen`),h<e&&f.push(`scene${h}-wait`);for(const h of f)P(h,"done");P(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${e}/${t} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await m(2e3);const r=(()=>{for(const f of document.querySelectorAll("button")){const h=f.querySelectorAll("i");for(const E of h){const N=(E.textContent||"").trim();if(N==="volume_up"||N==="volume_off"||N==="volume_mute"){const B=f.getBoundingClientRect();if(B.width>0&&B.height>0)return f}}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,c=0;const s=Date.now(),l=6e5,d=5e3;let g=!1,b=0,I=null;for(;Date.now()-s<l;){let f=null;if(I&&I.isConnected&&!I.closest("#netflow-engine-overlay")){const E=(I.textContent||"").trim().match(/^(\d{1,3})%$/);E?f=parseInt(E[1],10):I=null}if(f===null){const h=document.querySelectorAll('[role="progressbar"]');for(const E of h){if(E.closest("#netflow-engine-overlay"))continue;const N=E.getAttribute("aria-valuenow");if(N){const B=parseFloat(N);if(B>=1&&B<=100){f=B;break}}}}if(f===null){const h=document.querySelectorAll("span, small, label, p");for(const E of h){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim().match(/^(\d{1,3})%$/);if(B){const u=E.getBoundingClientRect();if(u.width>0&&u.height>0&&u.width<120&&u.height<60){f=parseInt(B[1],10),I=E;break}}}}if(f!==null){if(b=0,f!==p){n(`🎬 scene ${e} ความคืบหน้า: ${f}%`),p=f;try{P(`scene${e}-wait`,"active",f)}catch{}}c=0}else if(p>0){if(c===0)c=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-c>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),g=!0;break}}else if(b++,b>=15){const h=document.querySelectorAll("video");let E=!1;for(const N of h)if(N.readyState>=2&&!N.paused&&N.getBoundingClientRect().width>200){E=!0;break}if(E){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),g=!0;break}if(b>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),g=!0;break}}await m(2e3)}g||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{P(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&o.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await m(2e3);for(let f=e+1;f<=t;f++){const h=o[f-1];if(!h){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate (pending recovery) ──`);let E=null;const N=Date.now();for(;!E&&Date.now()-N<1e4;){const T=document.querySelectorAll("[data-slate-editor='true']");if(T.length>0&&(E=T[T.length-1]),!E){const G=document.querySelectorAll("[role='textbox'][contenteditable='true']");G.length>0&&(E=G[G.length-1])}E||await m(1e3)}if(!E){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await Se(E,h),n(`วาง prompt ฉาก ${f} (${h.length} ตัวอักษร) ✅`);try{P(`scene${f}-prompt`,"done"),P(`scene${f}-gen`,"active")}catch{}await m(1e3);const B=E.getBoundingClientRect();let u=null,v=1/0;for(const T of document.querySelectorAll("button")){if(T.disabled)continue;const G=T.querySelectorAll("i");let H=!1;for(const K of G)if((K.textContent||"").trim()==="arrow_forward"){H=!0;break}if(!H)continue;const q=T.getBoundingClientRect();if(q.width<=0||q.height<=0)continue;const W=Math.abs(q.top-B.top)+Math.abs(q.right-B.right);W<v&&(v=W,u=T)}if(!u)for(const T of document.querySelectorAll("button")){const G=T.querySelectorAll("i");for(const H of G)if((H.textContent||"").trim()==="arrow_forward"){const q=T.getBoundingClientRect();if(q.width>0&&q.height>0){u=T;break}}if(u)break}if(!u){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(T=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:f,scenePrompts:o}},()=>T())}),await ee(u),n(`คลิก Generate ฉาก ${f} ✅`);try{P(`scene${f}-gen`,"done"),P(`scene${f}-wait`,"active")}catch{}await m(5e3);let M=0,S=0;const y=Date.now();let _=!1,O=0;for(;Date.now()-y<6e5;){let T=null;const G=document.querySelectorAll("div, span, p, label, strong, small");for(const H of G){if(H.closest("#netflow-engine-overlay"))continue;const W=(H.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const K=H.getBoundingClientRect();if(K.width>0&&K.height>0&&K.width<120&&K.height<60){T=parseInt(W[1],10);break}}}if(T!==null){if(O=0,T!==M){n(`🎬 ฉาก ${f} ความคืบหน้า: ${T}%`),M=T;try{P(`scene${f}-wait`,"active",T)}catch{}}S=0}else if(M>0){if(S===0)S=Date.now();else if(Date.now()-S>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),_=!0;break}}else if(O++,O>=15){const H=document.querySelectorAll("video");let q=!1;for(const W of H)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){q=!0;break}if(q){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),_=!0;break}if(O>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),_=!0;break}}await m(2e3)}_||n(`⚠️ ฉาก ${f} หมดเวลา`);try{P(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),await m(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await m(3e3);try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const k=Date.now();let $=null;const w=Date.now();for(;!$&&Date.now()-w<1e4;){for(const f of document.querySelectorAll("button")){const h=f.querySelector("i");if(h&&(h.textContent||"").trim()==="download"){const E=f.getBoundingClientRect();if(E.width>0&&E.height>0){$=f;break}}}$||await m(1e3)}if(!$){A("ไม่พบปุ่มดาวน์โหลด");return}await ee($),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await m(1500);let a=null;for(let f=0;f<3&&!a;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let h=null;const E=Date.now();for(;!h&&Date.now()-E<5e3;){for(const M of document.querySelectorAll("[role='menuitem']"))if((M.textContent||"").trim().includes("Full Video")&&M.querySelector("i")){const y=M.getBoundingClientRect();if(y.width>0&&y.height>0){h=M;break}}h||await m(500)}if(!h){A("ไม่พบ Full Video");continue}const N=h.getBoundingClientRect(),B=N.left+N.width/2,u=N.top+N.height/2;h.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:B,clientY:u})),h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:B,clientY:u})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:B,clientY:u})),await ee(h),n("คลิก/hover Full Video ✅"),await m(2e3);const v=Date.now();for(;!a&&Date.now()-v<8e3;){for(const M of document.querySelectorAll("button[role='menuitem']")){const S=M.querySelectorAll("span");for(const y of S)if((y.textContent||"").trim()==="720p"){const _=M.getBoundingClientRect();if(_.width>0&&_.height>0){a=M;break}}if(a)break}a||(h.isConnected&&(h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:B,clientY:u})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:B+20,clientY:u}))),await m(500))}}if(!a){A("ไม่พบ 720p");return}await ee(a),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const C=Date.now();let z=!1,D=!1;for(;Date.now()-C<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const h=(f.textContent||"").trim();if(h==="Download complete!"||h==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),z=!0;break}(h.includes("Downloading your extended video")||h.includes("กำลังดาวน์โหลด"))&&(D||(D=!0,n("⏳ กำลังดาวน์โหลด...")))}if(z)break;if(D){let f=!1;for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((h.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),z=!0;break}}await m(2e3)}if(!z){A("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let R=!1;const V=Date.now();for(;Date.now()-V<6e4&&!R;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:k},h=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):h!=null&&h.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${h.message}`),R=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${h==null?void 0:h.message}`),f()})})}catch(f){A(`ตรวจสอบผิดพลาด: ${f.message}`)}R||await m(3e3)}R||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),Ee(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══");const x=await ht();Ge(x),Le(2e3)}async function jt(){try{const t=await new Promise(p=>{chrome.storage.local.get("netflow_pending_action",c=>{if(chrome.runtime.lastError){p(null);return}p((c==null?void 0:c.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const i=Date.now()-t.timestamp;if(i>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=o,await new Promise(p=>{chrome.storage.local.set({netflow_pending_action:t},()=>p())}),await m(300),!await new Promise(p=>{chrome.storage.local.get("netflow_pending_action",c=>{const s=c==null?void 0:c.netflow_pending_action;p((s==null?void 0:s._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(i/1e3)} วินาที)`),t.action==="mute_video"?await vt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await yt(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,i)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_RUNNING__?(n("⚠️ GENERATE_IMAGE ถูกเรียกซ้ำ — ข้าม (มี instance ทำงานอยู่แล้ว)"),i({success:!1,message:"Already running"}),!1):(window.__NETFLOW_RUNNING__=!0,window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),i({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Xt(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof He||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Pe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{gt()}catch{}}else console.error("[Netflow AI] Generate error:",o)}).finally(()=>{window.__NETFLOW_RUNNING__=!1}),!1);if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,window.__NETFLOW_RUNNING__=!1,i({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return i({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return i({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const o=Lt();if(!o){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const r=o.getBoundingClientRect(),p=r.left+r.width/2,c=r.top+r.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${c.toFixed(0)}) ${r.width.toFixed(0)}x${r.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(p,c);l?(await ee(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await ee(o),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),jt()})();
