(function(){"use strict";const se={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let K=se.green,he=null;function _e(t){t&&se[t]&&(he=t,K=se[t],We(),requestAnimationFrame(()=>ft()))}function $t(){if(he&&se[he])return se[he];try{const t=localStorage.getItem("netflow_app_theme");if(t&&se[t])return se[t]}catch{}return se.green}let ee=0,te=255,ne=65;function We(){const t=K.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ee=parseInt(t[1],16),te=parseInt(t[2],16),ne=parseInt(t[3],16))}const Ye='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Xe='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let U=null,J=null,le=null,je=0,Me=null,be=null,Te=null,Ae=0,ce=!1,ae=null,we=null,xe=null,ve=1,W=[];function Be(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let i=2;i<=t;i++)e.push({stepId:`scene${i}-prompt`,label:`ฉาก ${i} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${i}-gen`,label:`ฉาก ${i} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${i}-wait`,label:`ฉาก ${i} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const de=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];W=Be(1);function Et(t){const e=t.rgb,i=t.accentRgb,a=t.doneRgb,o=t.hex,l=t.accentHex,p=t.doneHex,s=(()=>{const h=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const r=M=>Math.min(255,M+80);return`#${[1,2,3].map(M=>r(parseInt(h[M],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const h=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const r=M=>Math.min(255,M+60);return`#${[1,2,3].map(M=>r(parseInt(h[M],16)).toString(16).padStart(2,"0")).join("")}`})(),d=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),u=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,m=d?parseInt(d[1],16)/u:0,I=d?parseInt(d[2],16)/u:1,k=d?parseInt(d[3],16)/u:.25,y=h=>`${Math.round(m*h)}, ${Math.round(I*h)}, ${Math.round(k*h)}`;return`
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
    background: ${p};
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
    background: linear-gradient(90deg, ${o}, ${l});
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
    background: ${p};
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

    `}function Ke(){le||(le=document.createElement("style"),le.id="netflow-overlay-styles",le.textContent=Et(K),document.head.appendChild(le))}function Je(t){t.innerHTML="",W.forEach((e,i)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function kt(){const t=document.getElementById("nf-terminal");if(!t)return;Je(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${W.length}`)}function Qe(t,e){let s="";for(let I=0;I<20;I++){const k=I/20*Math.PI*2,y=(I+.2)/20*Math.PI*2,h=(I+.5)/20*Math.PI*2,r=(I+.8)/20*Math.PI*2,M=(I+1)/20*Math.PI*2;s+=`${I===0?"M":"L"}${(120+100*Math.cos(k)).toFixed(1)},${(120+100*Math.sin(k)).toFixed(1)} `,s+=`L${(120+100*Math.cos(y)).toFixed(1)},${(120+100*Math.sin(y)).toFixed(1)} `,s+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,s+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,s+=`L${(120+100*Math.cos(M)).toFixed(1)},${(120+100*Math.sin(M)).toFixed(1)} `}s+="Z";const c=14,d=72,u=62;let m="";for(let I=0;I<c;I++){const k=I/c*Math.PI*2,y=(I+.25)/c*Math.PI*2,h=(I+.75)/c*Math.PI*2,r=(I+1)/c*Math.PI*2;m+=`${I===0?"M":"L"}${(120+u*Math.cos(k)).toFixed(1)},${(120+u*Math.sin(k)).toFixed(1)} `,m+=`L${(120+d*Math.cos(y)).toFixed(1)},${(120+d*Math.sin(y)).toFixed(1)} `,m+=`L${(120+d*Math.cos(h)).toFixed(1)},${(120+d*Math.sin(h)).toFixed(1)} `,m+=`L${(120+u*Math.cos(r)).toFixed(1)},${(120+u*Math.sin(r)).toFixed(1)} `}return m+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${m}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Ct(){const t=document.createElement("div");t.id="netflow-engine-overlay",ae=document.createElement("canvas"),ae.id="nf-matrix-canvas",t.appendChild(ae);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let E=1;E<=5;E++){const P=document.createElement("div");P.className=`nf-ambient-orb nf-orb-${E}`,t.appendChild(P)}const i=document.createElement("div");i.className="nf-pat-data",t.appendChild(i);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const o=document.createElement("div");o.className="nf-pat-diag-b",t.appendChild(o);const l=document.createElement("div");l.className="nf-pat-circuit",t.appendChild(l);const p=document.createElement("div");p.className="nf-pat-honeycomb",t.appendChild(p);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const u=document.createElement("div");u.className="nf-pat-wave-h",t.appendChild(u);const m=document.createElement("div");m.className="nf-pat-radar",t.appendChild(m);const I=document.createElement("div");I.className="nf-pat-ripple-1",t.appendChild(I);const k=document.createElement("div");k.className="nf-pat-ripple-2",t.appendChild(k);const y=document.createElement("div");y.className="nf-pat-techscan",t.appendChild(y);const h=document.createElement("div");h.className="nf-center-glow",t.appendChild(h);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const M=document.createElement("div");M.className="nf-crt-scanlines",t.appendChild(M);const z=document.createElement("div");z.className="nf-vignette",t.appendChild(z);for(let E=0;E<3;E++){const P=document.createElement("div");P.className="nf-pulse-ring",t.appendChild(P)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(E=>{const P=document.createElement("div");P.className=`nf-corner-deco ${E}`,t.appendChild(P)});const X=document.createElement("button");X.className="nf-stop-btn",X.innerHTML='<span class="nf-stop-icon"></span> หยุด',X.onclick=()=>{var E;window.__NETFLOW_STOP__=!0;try{Pe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((E=chrome.runtime)!=null&&E.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(X);const B=document.createElement("button");B.className="nf-close-btn",B.textContent="✕ ซ่อน",B.onclick=()=>ze(),t.appendChild(B);const R=document.createElement("div");R.className="nf-layout";const w=document.createElement("div");w.className="nf-core-monitor",w.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${W.length}</div>
    `,w.appendChild(f);const v=document.createElement("div");v.className="nf-terminal",v.id="nf-terminal",Je(v),w.appendChild(v);const C=document.createElement("div");C.className="nf-engine-core",C.id="nf-engine-core";const F=document.createElement("div");F.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(E=>{const P=document.createElement("div");P.className=`nf-frame-corner ${E}`,F.appendChild(P)}),C.appendChild(F);const T="http://www.w3.org/2000/svg",$=document.createElementNS(T,"svg");$.setAttribute("class","nf-engine-waves"),$.setAttribute("viewBox","0 0 560 140"),$.setAttribute("preserveAspectRatio","none"),$.id="nf-engine-waves";for(let E=0;E<4;E++){const P=document.createElementNS(T,"path");P.setAttribute("fill","none"),P.setAttribute("stroke-width",E<2?"1.5":"1"),P.setAttribute("stroke",E<2?`rgba(${K.rgb},${.14+E*.1})`:`rgba(${K.accentRgb},${.1+(E-2)*.08})`),P.setAttribute("data-wave-idx",String(E)),$.appendChild(P)}C.appendChild($);const D=document.createElement("div");D.className="nf-engine-brand-inner",D.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Qe(K.rgb,K.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Qe(K.rgb,K.accentRgb)}
        </div>
    `,C.appendChild(D);const b=document.createElement("div");b.className="nf-engine-stats",b.id="nf-engine-stats",b.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([E,P,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${E}</span><span class="nf-stat-val" id="${P}">${O}</span></div>`).join(""),C.appendChild(b),w.appendChild(C),R.appendChild(w);const x=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];de.forEach((E,P)=>{const O=Mt(E);O.classList.add(x[P]),O.id=`nf-mod-${E.id}`,R.appendChild(O)}),t.appendChild(R);for(let E=0;E<30;E++){const P=document.createElement("div");P.className="nf-particle",P.style.left=`${5+Math.random()*90}%`,P.style.bottom=`${Math.random()*40}%`,P.style.animationDuration=`${3+Math.random()*5}s`,P.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,_=.7+Math.random()*.3;P.style.background=`rgba(${Math.floor(ee*_)}, ${Math.floor(te*_)}, ${Math.floor(ne*_)}, ${O})`,P.style.width=`${1+Math.random()*2}px`,P.style.height=P.style.width,t.appendChild(P)}return t}function Mt(t){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(i),t.steps.forEach(o=>{const l=document.createElement("div");l.className="nf-step",l.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),l.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,e.appendChild(l)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Tt(){je=Date.now(),Me=setInterval(()=>{const t=Math.floor((Date.now()-je)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${i}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${e}:${i}`)},1e3)}function Ze(){Me&&(clearInterval(Me),Me=null)}const St=120,et=160,tt=.4;let fe=null,nt=0,ot=0,it=0,ye=[];function Pt(t,e){ye=[];for(let i=0;i<St;i++){const a=Math.random();let o;a<.22?o=0:a<.4?o=1:a<.55?o=2:a<.68?o=3:a<.84?o=4:o=5;const l=Math.random()*t,p=Math.random()*e,s=50+Math.random()*220,c=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);ye.push({x:o===0?Math.random()*t:l+Math.cos(c)*s,y:o===0?Math.random()*e:p+Math.sin(c)*s,vx:(Math.random()-.5)*tt,vy:(Math.random()-.5)*tt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:l,oCy:p,oRadius:s,oAngle:c,oSpeed:d})}}function It(){if(!ae)return;const t=ae;if(we=t.getContext("2d"),!we)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,ye.length===0&&Pt(t.width,t.height)};e(),window.addEventListener("resize",e);let i=null,a=0,o=0,l=!1;function p(){if(!we||!ae){xe=null;return}if(xe=requestAnimationFrame(p),l=!l,l)return;const s=we,c=ae.width,d=ae.height;s.fillStyle=`rgba(${ee*.04|0},${te*.04|0},${ne*.06|0},1)`,s.fillRect(0,0,c,d),(!i||a!==c||o!==d)&&(a=c,o=d,i=s.createRadialGradient(c*.5,d*.5,0,c*.5,d*.5,Math.max(c,d)*.6),i.addColorStop(0,`rgba(${ee*.08|0},${te*.08|0},${ne*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=i,s.fillRect(0,0,c,d);const u=ye,m=u.length,I=et*et;for(let h=0;h<m;h++){const r=u[h];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>c&&(r.x=c,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>d&&(r.y=d,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const M=r.oAngle,z=r.oRadius*.7;r.x=r.oCx+z*Math.cos(M),r.y=r.oCy+z*Math.sin(M)*Math.cos(M),r.oCx+=Math.sin(M*.15)*.12,r.oCy+=Math.cos(M*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const M=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*M,r.y=r.oCy+Math.sin(r.oAngle)*M,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=c+30:r.x>c+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const M=r.oRadius+50;r.oCx<-M?r.oCx=c+M:r.oCx>c+M&&(r.oCx=-M),r.oCy<-M?r.oCy=d+M:r.oCy>d+M&&(r.oCy=-M)}}s.beginPath(),s.strokeStyle=`rgba(${ee},${te},${ne},0.06)`,s.lineWidth=.4;const k=new Path2D;for(let h=0;h<m;h++){const r=u[h];for(let M=h+1;M<m;M++){const z=u[M],X=r.x-z.x,B=r.y-z.y,R=X*X+B*B;R<I&&(1-R/I<.4?(s.moveTo(r.x,r.y),s.lineTo(z.x,z.y)):(k.moveTo(r.x,r.y),k.lineTo(z.x,z.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${ee},${te},${ne},0.18)`,s.lineWidth=.8,s.stroke(k),!fe||nt!==ee||ot!==te||it!==ne){fe=document.createElement("canvas");const h=48;fe.width=h,fe.height=h;const r=fe.getContext("2d"),M=r.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);M.addColorStop(0,`rgba(${ee},${te},${ne},0.9)`),M.addColorStop(.3,`rgba(${ee},${te},${ne},0.35)`),M.addColorStop(1,`rgba(${ee},${te},${ne},0)`),r.fillStyle=M,r.fillRect(0,0,h,h),nt=ee,ot=te,it=ne}const y=fe;for(let h=0;h<m;h++){const r=u[h],M=.6+.4*Math.sin(r.pulsePhase),z=r.radius*5*(.8+M*.4);s.globalAlpha=.5+M*.4,s.drawImage(y,r.x-z/2,r.y-z/2,z,z)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<m;h++){const r=u[h];if(r.radius>2){const M=.6+.4*Math.sin(r.pulsePhase),z=r.radius*(.8+M*.4)*.35;s.moveTo(r.x+z,r.y),s.arc(r.x,r.y,z,0,Math.PI*2)}}s.fill()}p()}function _t(){xe!==null&&(cancelAnimationFrame(xe),xe=null),ae=null,we=null,ye=[]}let $e=null;const Se=560,At=140,at=Se/2,rt=At/2,st=[];for(let t=0;t<=Se;t+=8){const e=Math.abs(t-at)/at;st.push(Math.pow(Math.min(1,e*1.6),.6))}const Bt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Se,off:t*.6,spd:.7+t*.12}));let Re=!1;function lt(){if(be=requestAnimationFrame(lt),Re=!Re,Re)return;if(Ae+=.07,!$e){const e=document.getElementById("nf-engine-waves");if(!e){be=null;return}$e=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<$e.length;e++){const i=Bt[e],a=Ae*i.spd+i.off;t.length=0,t.push(`M 0 ${rt}`);let o=0;for(let l=0;l<=Se;l+=8){const p=rt+i.amp*st[o++]*Math.sin(l*i.freq+a);t.push(`L${l} ${p*10+.5|0}`)}$e[e].setAttribute("d",t.join(" "))}}function Rt(){Ae=0,lt(),It(),Te=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function ct(){be!==null&&(cancelAnimationFrame(be),be=null),Te&&(clearInterval(Te),Te=null),$e=null,_t()}function De(){let t=0;const e=W.filter(d=>d.status!=="skipped").length;for(const d of W){const u=document.getElementById(`nf-proc-${d.stepId}`);if(!u)continue;u.className="nf-proc-row";const m=u.querySelector(".nf-proc-badge");switch(d.status){case"done":u.classList.add("nf-proc-done"),m&&(m.textContent="✅ done"),t++;break;case"active":u.classList.add("nf-proc-active"),m&&(m.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),m&&(m.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),m&&(m.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),m&&(m.textContent="(queued)")}}const i=W.findIndex(d=>d.status==="active"),a=i>=0?i+1:t>=e&&e>0?W.length:t,o=document.getElementById("nf-step-counter");o&&(o.textContent=`${a}/${W.length}`);const l=document.querySelector(".nf-core-title-val"),p=document.querySelector(".nf-status-dot");t>=e&&e>0?(l&&(l.textContent="COMPLETE",l.style.color=K.doneHex),p&&(p.style.background=K.doneHex,p.style.boxShadow=`0 0 8px rgba(${K.doneRgb},0.7)`)):W.some(u=>u.status==="error")?(l&&(l.textContent="ERROR",l.style.color="#f87171"),p&&(p.style.background="#ef4444",p.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):W.some(u=>u.status==="active")&&l&&(l.textContent="ACTIVE",l.style.color=K.hex,l.style.textShadow=`0 0 10px rgba(${K.rgb},0.5)`);const s=document.getElementById("nf-terminal"),c=s==null?void 0:s.querySelector(".nf-proc-active");c&&s&&c.scrollIntoView({behavior:"smooth",block:"center"})}function dt(){J&&J.isConnected||(Ke(),J=document.createElement("button"),J.id="nf-toggle-btn",J.className="nf-toggle-visible",J.innerHTML=ce?Ye:Xe,J.title="ซ่อน/แสดง Netflow Overlay",J.onclick=()=>ze(),document.body.appendChild(J))}function ze(){U&&(dt(),ce?(U.classList.remove("nf-hidden"),U.classList.add("nf-visible"),J&&(J.innerHTML=Xe),ce=!1):(U.classList.remove("nf-visible"),U.classList.add("nf-hidden"),J&&(J.innerHTML=Ye),ce=!0))}const pt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ft(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=he;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const i=pt[e]||pt.green;let a;try{a=chrome.runtime.getURL(i)}catch{a=`/${i}`}const o=K.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${o},0.45)`,t.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function Fe(t=1){if(K=$t(),We(),U&&U.isConnected){ce&&ze();return}if(U&&!U.isConnected&&(U=null),le&&(le.remove(),le=null),Ke(),ve=t,W=Be(t),t>1){const e=de.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=t;o++)a.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),a.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),a.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});e.steps=a}const i=de.find(a=>a.id==="render");if(i){const a=i.steps.find(l=>l.id==="download");a&&(a.label="ดาวน์โหลด 720p");const o=i.steps.find(l=>l.id==="upscale");o&&(o.label="Full Video")}}U=Ct(),U.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(U),U.classList.add("nf-visible"),ce=!1,dt(),Tt(),Rt(),requestAnimationFrame(()=>ft())}function ut(){Ze(),ct(),ce=!1,U&&(U.classList.add("nf-fade-out"),setTimeout(()=>{U==null||U.remove(),U=null},500)),J&&(J.remove(),J=null)}const Dt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function zt(t,e,i){const a=W.findIndex(u=>u.status==="active"),o=W.filter(u=>u.status==="done").length,l=W.length,p=a>=0?a+1:o>=l?l:o,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${p}/${l}`);let c=1;for(const u of W)if(u.status==="active"||u.status==="done")if(u.stepId.startsWith("scene")){const m=u.stepId.match(/^scene(\d+)-/);m&&(c=Math.max(c,parseInt(m[1],10)))}else(u.stepId==="download"||u.stepId==="upscale"||u.stepId==="open")&&(c=ve);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=ve>1?`${c}/${ve}`:"1/1"),e==="active"){const u=document.getElementById("nf-stat-status"),m=Dt[t]||t.toUpperCase();u&&(u.textContent=m)}else if(e==="done"&&o>=l){const u=document.getElementById("nf-stat-status");u&&(u.textContent="COMPLETE")}else if(e==="error"){const u=document.getElementById("nf-stat-status");u&&(u.textContent="ERROR")}if(i!==void 0&&i>0){const u=document.getElementById("nf-stat-progress");u&&(u.textContent=`${Math.min(100,i)}%`)}}function S(t,e,i){if(!U)return;for(const o of de)for(const l of o.steps)l.id===t&&(l.status=e,i!==void 0&&(l.progress=i));for(const o of W)o.stepId===t&&(o.status=e,i!==void 0&&(o.progress=i));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),zt(t,e,i),i!==void 0){const o=document.getElementById(`nf-bar-${t}`);o&&(o.style.width=`${Math.min(100,i)}%`)}Oe(),De()}function ue(t){S(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Ee(t=4e3){Ze(),ct(),Oe(),De(),setTimeout(()=>ut(),t)}function Oe(){for(const t of de){const e=t.steps.filter(c=>c.status!=="skipped").length,i=t.steps.filter(c=>c.status==="done").length,a=t.steps.some(c=>c.status==="active"),o=e>0?Math.round(i/e*100):0,l=document.getElementById(`nf-pct-${t.id}`);l&&(l.textContent=`${o}%`);const p=document.getElementById(`nf-modbar-${t.id}`);p&&(p.style.width=`${o}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),o>=100?s.classList.add("nf-done"):a&&s.classList.add("nf-active"))}}function Ft(t){var a,o,l,p;ve=t;const e=new Map;for(const s of W)e.set(s.stepId,{status:s.status,progress:s.progress});W=Be(t);for(const s of W){const c=e.get(s.stepId);c&&(s.status=c.status,c.progress!==void 0&&(s.progress=c.progress))}if(kt(),t>1){const s=de.find(c=>c.id==="video");if(s){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=s.steps.find(d=>d.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((l=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:l.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)c.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),c.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),c.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=c,gt(s)}}const i=de.find(s=>s.id==="render");if(i&&t>1){const s=i.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const c=i.steps.find(d=>d.id==="upscale");c&&(c.label="Full Video"),gt(i)}Oe(),De()}function gt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),t.steps.forEach(o=>{const l=document.createElement("div");l.className="nf-step",l.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),l.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,e.appendChild(l)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Pe(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Pe(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Pe(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Ne(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Le(){try{if(await new Promise(o=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},l=>{if(chrome.runtime.lastError){o(!1);return}o(!!(l!=null&&l.cached))})}catch{o(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const o=document.querySelectorAll("video");for(const l of o){const p=l.src||l.currentSrc||"";if(p)return p}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let i=null,a=0;for(const o of e){let l=o.src||"";if(!l){const c=o.querySelector("source");c&&(l=c.getAttribute("src")||"")}if(!l&&o.currentSrc&&(l=o.currentSrc),!l)continue;const p=o.getBoundingClientRect(),s=p.width*p.height;p.width>50&&s>a&&(a=s,i=l)}if(!i)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${i.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const o=await fetch(i);if(!o.ok)return n(`[TikTok] fetch failed: HTTP ${o.status}`),await mt(i),i;const l=await o.blob(),p=(l.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${p} MB, type: ${l.type}`),l.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${l.size} bytes) — อาจเป็น thumbnail`);const s=await new Promise((c,d)=>{const u=new FileReader;u.onloadend=()=>c(u.result),u.onerror=()=>d(new Error("FileReader error")),u.readAsDataURL(l)});n(`[TikTok] Data URL พร้อม: ${(s.length/1024/1024).toFixed(1)} MB`),await new Promise(c=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:s},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),c()})})}catch(o){n(`[TikTok] Content script fetch error: ${o.message}`),await mt(i)}return i}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function mt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},i=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):i!=null&&i.success?n(`[TikTok] Video pre-fetched via background: ${((i.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${i==null?void 0:i.error}`),e()})})}catch{}}function Ge(t){if(t)try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}const Ve=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),qe=/Win/i.test(navigator.userAgent),ge=Ve?"🍎 Mac":qe?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ge}`);class He extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const g=t=>new Promise((e,i)=>{if(window.__NETFLOW_STOP__)return i(new He);const a=setTimeout(()=>{if(window.__NETFLOW_STOP__)return i(new He);e()},t);g._lastId=a});function pe(){return!!window.__NETFLOW_STOP__}function ht(){var i;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const o=(a.textContent||"").trim().toLowerCase();if(!(o.length>200||o.length<5)){for(const l of t)if(o.includes(l))return((i=a.textContent)==null?void 0:i.trim())||l}}return null}async function Z(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,a=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:i,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",o)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",o)),t.dispatchEvent(new MouseEvent("click",o)),await g(50),t.click()}function Ot(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,a=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:i,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",o)),t.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",o)),t.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",o))}function Nt(t){const e=[],i=document.querySelectorAll("i");for(const a of i){if((a.textContent||"").trim()!==t)continue;let l=a,p=null,s=1/0;for(let c=0;c<20&&l&&(l=l.parentElement,!(!l||l===document.body));c++){const d=l.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const u=d.width*d.height;u<s&&(p=l,s=u)}}p&&!e.includes(p)&&e.push(p)}return e.sort((a,o)=>{const l=a.getBoundingClientRect(),p=o.getBoundingClientRect();return l.left-p.left}),e}function Ue(t=!1){const e=[],i=document.querySelectorAll("video");for(const p of i){let s=p.parentElement;for(let c=0;c<10&&s;c++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const p of a){const s=(p.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let c=p.parentElement;for(let d=0;d<10&&c;d++){const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const o=document.querySelectorAll("img");for(const p of o){const s=(p.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let c=p.parentElement;for(let d=0;d<10&&c;d++){const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const l=Array.from(new Set(e.map(p=>p.el))).map(p=>e.find(s=>s.el===p));if(l.sort((p,s)=>p.left-s.left),l.length>0){const p=l[0].el,s=p.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),p}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Lt(){const t=Nt("image");if(t.length>0){const i=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${i.left.toFixed(0)},${i.top.toFixed(0)}) ขนาด ${i.width.toFixed(0)}x${i.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const i of e){let a=i.parentElement;for(let o=0;o<10&&a;o++){const l=a.getBoundingClientRect();if(l.width>100&&l.height>80&&l.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${l.left.toFixed(0)},${l.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Gt(t,e){var s;const[i,a]=t.split(","),o=((s=i.match(/:(.*?);/))==null?void 0:s[1])||"image/png",l=atob(a),p=new Uint8Array(l.length);for(let c=0;c<l.length;c++)p[c]=l.charCodeAt(c);return new File([p],e,{type:o})}function ke(t){var a;const e=[],i=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of i)if(((a=o.textContent)==null?void 0:a.trim())===t){const l=o.closest("button");l&&e.push(l)}return e}function Vt(){const t=[...ke("add"),...ke("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const o of a){const l=o.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60){const p=(o.textContent||"").trim();if(p==="+"||p==="add")return o}}return null}let e=null,i=0;for(const a of t){const o=a.getBoundingClientRect();o.y>i&&(i=o.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${i.toFixed(0)}`),e}function bt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=ke(a);let l=null,p=0;for(const s of o){const c=s.getBoundingClientRect();c.y>p&&(p=c.y,l=s)}if(l)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${p.toFixed(0)}`),l}const t=document.querySelectorAll("button");let e=null,i=0;for(const a of t){const o=a.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const l=Math.abs(o.width-o.height)<10&&o.width<60,p=o.y+o.x+(l?1e3:0);p>i&&(i=p,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const o=(a.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return a}return null}function wt(){const t=document.querySelectorAll("textarea");for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const i=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of i){const o=a.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Ie(t,e){var i,a,o,l;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:p});t.dispatchEvent(c),await g(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(p){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const p=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(p);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await g(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const p=new DataTransfer;p.setData("text/plain",e),p.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:p});t.dispatchEvent(s),await g(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((i=navigator.clipboard)!=null&&i.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${p.length} ตัวอักษร)`);return}}catch(p){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const p=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(p){let s=t[p];for(let c=0;c<30&&s;c++){const d=s.memoizedProps,u=s.memoizedState;if((a=d==null?void 0:d.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const m=d.editor;m.selection,m.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((l=(o=u==null?void 0:u.memoizedState)==null?void 0:o.editor)!=null&&l.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),u.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(p){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${p.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function qt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const i of e)t.push({input:i,origType:"file"}),i.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Ht(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ge})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ge})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Ut(t,e,i){var d;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...t.map(u=>u.input)];for(const u of a)!o.includes(u)&&u.offsetParent===null&&o.push(u);for(const u of o)u.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const l=document.querySelectorAll('input[type="file"]');if(l.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ge})`),!1;let p;if(i&&i.size>0){const u=Array.from(l).filter(m=>!i.has(m));u.length>0?(p=u[u.length-1],n(`เล็งเป้า file input ใหม่ (${u.length} ใหม่, ${l.length} ทั้งหมด)`)):(p=l[l.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${l.length} ตัว`))}else p=l[l.length-1];const s=new DataTransfer;s.items.add(e);try{p.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=p.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(u){n(`กำหนด target.files ล้มเหลว: ${u.message} — ลอง defineProperty`);try{Object.defineProperty(p,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(m){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${m.message}`),!1}}const c=p._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0}));try{const u=new DataTransfer;u.items.add(e);const m=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:u});p.dispatchEvent(m),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ge}`),!0}function Ce(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.src&&a.offsetParent!==null&&t++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of i){if(a.closest("#netflow-engine-overlay"))continue;const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.offsetParent!==null&&t++}return t}async function xt(t,e){var u;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const i=Gt(t,e);n(`ขนาดไฟล์: ${(i.size/1024).toFixed(1)} KB`);const a=Ce();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const o=async(m,I=8e3)=>{const k=Date.now();for(;Date.now()-k<I;){const y=Ce();if(y>a)return n(`✅ [${m}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${y}`),!0;await g(500)}return n(`⚠️ [${m}] รูปย่อไม่เพิ่ม (ยังคง ${Ce()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const l=Vt();if(!l)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const p=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${p.size} ตัว`);const s=Ht();let c=qt();const d=new MutationObserver(m=>{for(const I of m)for(const k of I.addedNodes)if(k instanceof HTMLInputElement&&k.type==="file"&&(k.type="text",c.push({input:k,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),k instanceof HTMLElement){const y=k.querySelectorAll('input[type="file"]');for(const h of y)h.type="text",c.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{l.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let m=!1;const I=Date.now();for(;!m&&Date.now()-I<5e3;){const y=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const h of y){if(h===l)continue;const r=h.querySelectorAll("i");for(const M of r){const z=((u=M.textContent)==null?void 0:u.trim())||"";if((z==="upload"||z==="upload_file")&&!Array.from(h.querySelectorAll("i")).map(B=>{var R;return(R=B.textContent)==null?void 0:R.trim()}).includes("drive_folder_upload")){h.click(),m=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${z}) ✅`);break}}if(m)break}if(!m)for(const h of y){if(h===l)continue;const r=h.childNodes.length<=5?(h.textContent||"").trim():"";if(r.length>0&&r.length<40){const M=r.toLowerCase();if(M==="upload"||M==="อัปโหลด"||M==="อัพโหลด"||M.includes("upload image")||M.includes("upload photo")||M.includes("อัปโหลดรูปภาพ")||M.includes("อัพโหลดรูปภาพ")||M.includes("from computer")||M.includes("จากคอมพิวเตอร์")){h.click(),m=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${r}") ✅`);break}}}m||await g(500)}return m?(await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Ut(c,i,p)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const m of c)m.input.type!=="file"&&(m.input.type="file")}}async function Wt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const i=document.querySelectorAll("button");let a=null;for(const k of i){const y=k.textContent||"";if((y.includes("Nano Banana")||y.includes("Imagen")||y.includes("วิดีโอ")||y.includes("รูปภาพ")||y.includes("Image")||y.includes("Video"))&&k.getBoundingClientRect().bottom>window.innerHeight*.7){a=k,n(`พบปุ่มตั้งค่าจากข้อความ: "${y.substring(0,30).trim()}"`);break}}if(!a)for(const k of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const y=ke(k);for(const h of y)if(h.getBoundingClientRect().bottom>window.innerHeight*.7){a=h,n(`พบปุ่มตั้งค่าจากไอคอน: ${k}`);break}if(a)break}if(!a)return A("ไม่พบปุ่มตั้งค่า"),!1;const o=a.getBoundingClientRect(),l=o.left+o.width/2,p=o.top+o.height/2,s={bubbles:!0,cancelable:!0,clientX:l,clientY:p,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await g(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let c=!1,d=null;const u=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const k of u){const y=k.getAttribute("aria-controls")||"",h=k.id||"";if(y.toUpperCase().includes("IMAGE")||h.toUpperCase().includes("IMAGE")){d=k,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${y})`);break}}if(!d)for(const k of document.querySelectorAll('[role="tab"]')){const y=k.id||"";if(y.toUpperCase().includes("TRIGGER-IMAGE")){d=k,n(`พบแท็บ Image ผ่าน id: ${y}`);break}}if(!d)for(const k of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const y=(k.textContent||"").trim();if((y==="Image"||y.endsWith("Image")||y==="รูปภาพ"||y==="ภาพ")&&!y.includes("Video")&&!y.includes("วิดีโอ")){d=k,n(`พบแท็บ Image ผ่านข้อความ: "${y}"`);break}}if(d){const k=d.getAttribute("data-state")||"",y=d.getAttribute("aria-selected")||"";if(k==="active"||y==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const h=d.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",r)),await g(80),d.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",r)),d.dispatchEvent(new MouseEvent("click",r)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const m=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const k of document.querySelectorAll("button, [role='tab'], [role='option']")){const y=(k.textContent||"").trim();if(y===m||y.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const h=k.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",r)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",r)),k.dispatchEvent(new MouseEvent("click",r)),n(`เลือกทิศทาง: ${m}`),await g(400);break}}const I=`x${e}`;for(const k of document.querySelectorAll("button, [role='tab'], [role='option']"))if((k.textContent||"").trim()===I){const h=k.getBoundingClientRect(),r={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",r)),await g(80),k.dispatchEvent(new PointerEvent("pointerup",{...r,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",r)),k.dispatchEvent(new MouseEvent("click",r)),n(`เลือกจำนวน: ${I}`),await g(400);break}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await g(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function Yt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let i=null;const a=document.querySelectorAll("button");for(const m of a){const I=(m.textContent||"").trim();if(I.includes("Veo 3.1")&&I.includes("arrow_drop_down")){i=m,n(`พบปุ่ม Veo dropdown: "${I.substring(0,40).trim()}"`);break}}if(!i){for(const m of a)if(m.getAttribute("aria-haspopup")==="menu"){const I=(m.textContent||"").trim();if(I.includes("Veo")){i=m,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${I.substring(0,40).trim()}"`);break}}}if(!i)for(const m of a){const I=(m.textContent||"").trim();if(I.includes("Veo 3.1")&&m.getBoundingClientRect().bottom>window.innerHeight*.7){i=m,n(`พบปุ่ม Veo dropdown (bottom area): "${I.substring(0,40).trim()}"`);break}}if(!i)return A("ไม่พบปุ่ม Veo quality dropdown"),!1;if((i.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const l=i.getBoundingClientRect(),p=l.left+l.width/2,s=l.top+l.height/2,c={bubbles:!0,cancelable:!0,clientX:p,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),i.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",c)),i.dispatchEvent(new MouseEvent("click",c)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let d=!1;const u=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const m of u){const I=m.querySelectorAll("span");for(const k of I)if((k.textContent||"").trim()===e){const h=m.getBoundingClientRect();if(h.width>0&&h.height>0){const r=h.left+h.width/2,M=h.top+h.height/2,z={bubbles:!0,cancelable:!0,clientX:r,clientY:M,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",z)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",z)),m.dispatchEvent(new MouseEvent("click",z)),n(`✅ เลือก "${e}" สำเร็จ`),d=!0;break}}if(d)break;if(!d){const k=(m.textContent||"").trim();if(k.includes(e)&&!k.includes("arrow_drop_down")){const y=m.getBoundingClientRect();if(y.width>0&&y.height>0){const h=y.left+y.width/2,r=y.top+y.height/2,M={bubbles:!0,cancelable:!0,clientX:h,clientY:r,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",M)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",M)),m.dispatchEvent(new MouseEvent("click",M)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),d=!0;break}}}}return d?(await g(600),!0):(A(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),!1)}async function Xt(t){var z,X,B,R;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,i=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=i?i[1]:"unknown",o=Ve?"macOS":qe?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",l=Ve?((X=(z=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:z[1])==null?void 0:X.replace(/_/g,"."))||"":qe&&((B=e.match(/Windows NT ([0-9.]+)/))==null?void 0:B[1])||"",p=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${l} | Chrome ${a}`),n(`🌐 ภาษา: ${p} | หน้าจอ: ${s} | แพลตฟอร์ม: ${ge}`),n("══════════════════════════════════════════");try{_e(t.theme)}catch{}try{Fe()}catch(w){console.warn("Overlay show error:",w)}const c=[],d=[];try{S("settings","active");const w=t.orientation||"horizontal",f=t.outputCount||1,v=await Wt(w,f);c.push(v?"✅ Settings":"⚠️ Settings"),S("settings",v?"done":"error")}catch(w){A(`ตั้งค่าผิดพลาด: ${w.message}`),c.push("⚠️ Settings"),S("settings","error")}try{const w=t.veoQuality||"fast";await Yt(w)?(c.push(`✅ Veo ${w}`),n(`✅ Veo quality: ${w}`)):(c.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(w){A(`Veo quality error: ${w.message}`),c.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const u=()=>{const w=document.querySelectorAll("span, div, p, label");for(const f of w){const v=(f.textContent||"").trim();if(/^\d{1,3}%$/.test(v)){if(v==="100%")return null;const C=f.getBoundingClientRect();if(C.width>0&&C.height>0&&C.top>0&&C.top<window.innerHeight)return v}}return null},m=async w=>{n(`รอการอัพโหลด ${w} เสร็จ...`),await g(2e3);const f=Date.now(),v=6e4;let C="",F=Date.now();const T=15e3;for(;Date.now()-f<v;){const $=u();if($){if($!==C)C=$,F=Date.now();else if(Date.now()-F>T){n(`✅ อัพโหลด ${w} — % ค้างที่ ${$} นาน ${T/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}n(`กำลังอัพโหลด: ${$} — รอ...`),await g(1500)}else{n(`✅ อัพโหลด ${w} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}A(`⚠️ อัพโหลด ${w} หมดเวลาหลัง ${v/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){S("upload-char","active");try{const w=await xt(t.characterImage,"character.png");c.push(w?"✅ ตัวละคร":"⚠️ ตัวละคร"),w||d.push("character upload failed"),S("upload-char",w?"done":"error")}catch(w){A(`อัพโหลดตัวละครผิดพลาด: ${w.message}`),c.push("❌ ตัวละคร"),d.push("character upload error"),S("upload-char","error")}await m("character")}else ue("upload-char");if(t.productImage){S("upload-prod","active");try{const w=await xt(t.productImage,"product.png");c.push(w?"✅ สินค้า":"⚠️ สินค้า"),w||d.push("product upload failed"),S("upload-prod",w?"done":"error")}catch(w){A(`อัพโหลดสินค้าผิดพลาด: ${w.message}`),c.push("❌ สินค้า"),d.push("product upload error"),S("upload-prod","error")}await m("product")}else ue("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const I=u();I&&(n(`⚠️ อัพโหลดยังแสดง ${I} — รอเพิ่มเติม...`),await m("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const k=(t.characterImage?1:0)+(t.productImage?1:0);if(k>0){let w=Ce();w<k&&(n(`⏳ เห็นรูปย่อแค่ ${w}/${k} — รอ 3 วินาที...`),await g(3e3),w=Ce()),w>=k?n(`✅ ยืนยันรูปย่ออ้างอิง: ${w}/${k}`):A(`⚠️ คาดว่าจะมี ${k} รูปย่อ แต่พบ ${w} — ดำเนินการต่อ`)}if(pe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Ee(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),S("img-prompt","active"),await g(1e3);const y=wt();y?(await Ie(y,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),S("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),d.push("prompt input not found"),S("img-prompt","error")),await g(800);const h=new Set;document.querySelectorAll("img").forEach(w=>{w.src&&h.add(w.src)}),n(`บันทึกรูปเดิม: ${h.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),S("img-generate","active"),await g(500);const r=bt();if(r){const w=r.getBoundingClientRect(),f=w.left+w.width/2,v=w.top+w.height/2,C={bubbles:!0,cancelable:!0,clientX:f,clientY:v,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",C)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",C)),r.dispatchEvent(new MouseEvent("click",C)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await g(500),r.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",C)),await g(80),r.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",C)),r.dispatchEvent(new MouseEvent("click",C)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),S("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),d.push("generate button not found"),S("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),S("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const w=()=>{const T=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of T){if($.closest("#netflow-engine-overlay"))continue;const D=($.textContent||"").trim();if(D.length>10)continue;const b=D.match(/(\d{1,3})\s*%/);if(!b)continue;const x=parseInt(b[1],10);if(x<1||x>100)continue;const E=$.getBoundingClientRect();if(!(E.width===0||E.width>150)&&!(E.top<0||E.top>window.innerHeight))return x}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,v=-1,C=0;const F=Date.now();for(;!f&&Date.now()-F<18e4;){const T=document.querySelectorAll("img");for(const $ of T){if(h.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;const b=$.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const x=$.closest("div");if(x){f=x,n(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...`);break}}}if(!f)for(const $ of T){if(h.has($.src))continue;const D=$.closest("div"),b=(D==null?void 0:D.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg"))continue;const x=$.getBoundingClientRect();if(x.width>120&&x.height>120&&x.top>0&&x.top<window.innerHeight*.85){const E=$.closest("div");if(E){f=E,n(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...`);break}}}if(!f){if(pe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=ht();if($){A(`❌ สร้างรูปล้มเหลว: ${$}`),d.push(`image gen failed: ${$}`),S("img-wait","error");break}const D=w();D!==null?(D!==v&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${D}%`),v=D,S("img-wait","active",D)),C=Date.now()):v>30&&Math.floor((Date.now()-C)/1e3)>=3&&n(`🖼️ % หายที่ ${v}% — รูปน่าจะเสร็จแล้ว`),await g(3e3)}}if(!f)A("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),S("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),S("img-wait","done",100);const T=f.getBoundingClientRect(),$=T.left+T.width/2,D=T.top+T.height/2,b={bubbles:!0,cancelable:!0,clientX:$,clientY:D};f.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",b)),f.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",b)),f.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",b)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let x=null;for(const E of["more_vert","more_horiz","more"]){const P=ke(E);for(const O of P){const _=O.getBoundingClientRect();if(_.top>=T.top-20&&_.top<=T.bottom&&_.right>=T.right-150&&_.right<=T.right+20){x=O;break}}if(x)break}if(!x){const E=document.querySelectorAll("button");for(const P of E){const O=P.getBoundingClientRect();if(O.width<50&&O.height<50&&O.top>=T.top-10&&O.top<=T.top+60&&O.left>=T.right-80){const _=P.querySelectorAll("i");for(const N of _)if((((R=N.textContent)==null?void 0:R.trim())||"").includes("more")){x=P;break}if(x)break;const G=P.getAttribute("aria-label")||"";if(G.includes("เพิ่มเติม")||G.includes("more")){x=P;break}}}}if(!x)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const E=x.getBoundingClientRect(),P=E.left+E.width/2,O=E.top+E.height/2,_={bubbles:!0,cancelable:!0,clientX:P,clientY:O,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",_)),await g(80),x.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",_)),x.dispatchEvent(new MouseEvent("click",_)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let G=null;const N=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const L of N){const H=(L.textContent||"").trim();if(H.includes("ทำให้เป็นภาพเคลื่อนไหว")||H.includes("Animate")||H.includes("animate")){G=L;break}}if(!G)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const L=G.getBoundingClientRect(),H=L.left+L.width/2,j=L.top+L.height/2,V={bubbles:!0,cancelable:!0,clientX:H,clientY:j,button:0};G.dispatchEvent(new PointerEvent("pointerdown",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),G.dispatchEvent(new MouseEvent("mousedown",V)),await g(80),G.dispatchEvent(new PointerEvent("pointerup",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),G.dispatchEvent(new MouseEvent("mouseup",V)),G.dispatchEvent(new MouseEvent("click",V)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),S("animate","done"),await g(3e3)}}}}catch(w){A(`ขั้น 4 ผิดพลาด: ${w.message}`),c.push("⚠️ Animate")}if(pe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Ee(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),S("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let w=!1;const f=document.querySelectorAll("button, span, div");for(const F of f){const T=(F.textContent||"").trim(),$=F.getBoundingClientRect();if((T==="วิดีโอ"||T==="Video"||T.includes("วิดีโอ"))&&$.bottom>window.innerHeight*.7){w=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}w||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await g(1e3);const v=wt();v?(await Ie(v,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),S("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),d.push("video prompt input not found"),S("vid-prompt","error")),await g(1e3),S("vid-generate","active");const C=bt();if(C){const F=C.getBoundingClientRect(),T=F.left+F.width/2,$=F.top+F.height/2,D={bubbles:!0,cancelable:!0,clientX:T,clientY:$,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",D)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",D)),C.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),S("vid-generate","done"),await g(500),C.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",D)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",D)),C.dispatchEvent(new MouseEvent("click",D)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),d.push("video generate button not found"),S("vid-generate","error")}catch(w){A(`ขั้น 5 ผิดพลาด: ${w.message}`),c.push("⚠️ Video Gen"),d.push(`video gen error: ${w.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ue("animate"),ue("vid-prompt"),ue("vid-generate"),ue("vid-wait");if(t.videoPrompt){S("vid-wait","active");const w=t.sceneCount||1,f=t.videoScenePrompts||[t.videoPrompt];if(w>1)try{Ft(w)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${w>1?`ต่อ ${w} ฉาก`:"ดาวน์โหลด"} ===`);const v=()=>{const T=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of T){if($.closest("#netflow-engine-overlay"))continue;const D=($.textContent||"").trim();if(D.length>10)continue;const b=D.match(/(\d{1,3})\s*%/);if(!b)continue;const x=parseInt(b[1],10);if(x<1||x>100)continue;const E=$.getBoundingClientRect();if(!(E.width===0||E.width>150)&&!(E.top<0||E.top>window.innerHeight))return x}return null},C=async(T=6e5)=>{n("รอการสร้างวิดีโอ..."),S("vid-wait","active"),await g(5e3);const $=()=>{const V=document.querySelectorAll("div, span, p, label, strong, small");let Y=0;for(const q of V){if(q.closest("#netflow-engine-overlay"))continue;const Q=(q.textContent||"").trim();if(Q.includes("%")&&Q.length<15){const oe=q.tagName.toLowerCase(),ie=q.className&&typeof q.className=="string"?q.className.split(/\s+/).slice(0,2).join(" "):"",re=q.getBoundingClientRect();if(n(`  🔍 "${Q}" ใน <${oe}.${ie}> ที่ (${re.left.toFixed(0)},${re.top.toFixed(0)}) w=${re.width.toFixed(0)}`),Y++,Y>=5)break}}Y===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},D=Ue();n(D?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const b=Date.now();let x=-1,E=0,P=!1;for(;Date.now()-b<T;){const V=v();if(V!==null){if(V!==x&&(n(`ความคืบหน้าวิดีโอ: ${V}%`),x=V,S("vid-wait","active",V)),E=Date.now(),V>=100){n("✅ ตรวจพบ 100%!"),P=!0;break}}else if(x>30){const Y=Math.floor((Date.now()-E)/1e3);if(Y>=5){n(`✅ % หายไปที่ ${x}% (หาย ${Y} วินาที) — วิดีโอเสร็จ!`),P=!0;break}n(`⏳ % หายที่ ${x}% — ยืนยันใน ${5-Y} วินาที...`)}else{const Y=Math.floor((Date.now()-b)/1e3);Y%15<3&&n(`⏳ รอ... (${Y} วินาที) ไม่พบ %`)}if(!P&&x>0&&Ue(!0)&&!D){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${x}% — วิดีโอเสร็จ!`),P=!0;break}if(pe())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(x<1){const Y=ht();if(Y)return A(`❌ สร้างวิดีโอล้มเหลว: ${Y}`),null}await g(3e3)}const O=Ue();if(!O)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),S("vid-wait","error"),null;const _=O;P?(S("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const G=_.getBoundingClientRect();let N=G.left+G.width/2,L=G.top+G.height/2,H=_;const j=_.querySelector("video, img, canvas");if(j){const V=j.getBoundingClientRect();V.width>50&&V.height>50&&(N=V.left+V.width/2,L=V.top+V.height/2,H=j,n(`🎯 พบรูปย่อ <${j.tagName.toLowerCase()}> ในการ์ดที่ (${N.toFixed(0)},${L.toFixed(0)}) ${V.width.toFixed(0)}x${V.height.toFixed(0)}`))}else L=G.top+G.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${N.toFixed(0)},${L.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${N.toFixed(0)}, ${L.toFixed(0)})...`),Ot(H);for(let V=0;V<8;V++){const Y={bubbles:!0,cancelable:!0,clientX:N+V%2,clientY:L};H.dispatchEvent(new PointerEvent("pointermove",{...Y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousemove",Y)),await g(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:w,scenePrompts:f,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${w} ฉาก, ${f.length} prompts, theme: ${t.theme})`)}catch(V){n(`⚠️ ไม่สามารถบันทึก pending action: ${V.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(H),n("✅ คลิกการ์ดวิดีโอเสร็จ"),_},F=async T=>{const $=T.getBoundingClientRect(),D=$.left+$.width/2,b=$.top+$.height/2,x={bubbles:!0,cancelable:!0,clientX:D,clientY:b,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),T.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",x)),T.dispatchEvent(new MouseEvent("click",x)),await g(50),T.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await C())A("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),S("vid-wait","error");else{c.push("✅ Video Complete"),S("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const $=await new Promise(D=>{chrome.storage.local.get("netflow_pending_action",b=>{if(chrome.runtime.lastError){D(null);return}D((b==null?void 0:b.netflow_pending_action)||null)})});$&&!$._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),$.action==="mute_video"?await vt($.sceneCount||1,$.scenePrompts||[],$.theme):$.action==="wait_scene_gen_and_download"&&await yt($.sceneCount||2,$.currentScene||2,$.theme,$.scenePrompts||[]))}}catch(T){A(`ขั้น 6 ผิดพลาด: ${T.message}`),c.push("⚠️ Step6"),d.push(`step 6: ${T.message}`)}}const M=d.length===0;try{Ee(M?5e3:8e3)}catch(w){console.warn("Overlay complete error:",w)}return{success:M,message:M?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${d.join(", ")}`,step:M?"done":"partial"}}async function vt(t,e=[],i){var X;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{i&&_e(i)}catch{}try{Fe(t)}catch(B){n(`⚠️ showOverlay error: ${B.message}`)}try{const B=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const R of B)S(R,"done");t>=2&&S("scene2-prompt","active"),n(`✅ overlay restored: ${B.length} steps done, sceneCount=${t}`)}catch(B){n(`⚠️ overlay restore error: ${B.message}`)}await g(1500);const a=(()=>{for(const B of document.querySelectorAll("button")){const R=B.querySelectorAll("i");for(const f of R){const v=(f.textContent||"").trim();if(v==="volume_up"||v==="volume_off"||v==="volume_mute"){const C=B.getBoundingClientRect();if(C.width>0&&C.height>0)return B}}const w=(B.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const f=B.getBoundingClientRect();if(f.width>0&&f.height>0)return B}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let o=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let b=2;b<=t;b++){const x=e[b-1];if(!x){A(`ไม่พบ prompt สำหรับฉากที่ ${b}`);continue}n(`── ฉากที่ ${b}/${t}: วาง prompt + generate ──`);let E=null;const P=Date.now();for(;!E&&Date.now()-P<1e4;){const q=document.querySelectorAll("[data-slate-editor='true']");if(q.length>0&&(E=q[q.length-1]),!E){const Q=document.querySelectorAll("[role='textbox'][contenteditable='true']");Q.length>0&&(E=Q[Q.length-1])}E||await g(1e3)}if(!E){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${E.tagName.toLowerCase()}> ${E.className.substring(0,40)}`),await Ie(E,x),n(`วาง prompt ฉาก ${b} (${x.length} ตัวอักษร) ✅`);try{S(`scene${b}-prompt`,"done"),S(`scene${b}-gen`,"active")}catch{}await g(1e3);const O=E.getBoundingClientRect();let _=null,G=1/0;for(const q of document.querySelectorAll("button")){if(q.disabled)continue;const Q=q.querySelectorAll("i");let oe=!1;for(const me of Q)if((me.textContent||"").trim()==="arrow_forward"){oe=!0;break}if(!oe)continue;const ie=q.getBoundingClientRect();if(ie.width<=0||ie.height<=0)continue;const re=Math.abs(ie.top-O.top)+Math.abs(ie.right-O.right);re<G&&(G=re,_=q)}if(!_)for(const q of document.querySelectorAll("button")){const Q=q.querySelectorAll("i");for(const oe of Q)if((oe.textContent||"").trim()==="arrow_forward"){const ie=q.getBoundingClientRect();if(ie.width>0&&ie.height>0){_=q;break}}if(_)break}if(!_){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(q=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:b,scenePrompts:e}},()=>q())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${b}/${t})`),await Z(_),n(`คลิก Generate ฉาก ${b} ✅`);try{S(`scene${b}-gen`,"done"),S(`scene${b}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${b} gen เสร็จ ──`),await g(5e3);let N=0,L=0;const H=Date.now(),j=6e5,V=5e3;let Y=!1;for(;Date.now()-H<j;){let q=null;const Q=document.querySelectorAll("div, span, p, label, strong, small");for(const oe of Q){if(oe.closest("#netflow-engine-overlay"))continue;const re=(oe.textContent||"").trim().match(/^(\d{1,3})%$/);if(re){const me=oe.getBoundingClientRect();if(me.width>0&&me.height>0&&me.width<120&&me.height<60){q=parseInt(re[1],10);break}}}if(q!==null){if(q!==N){n(`🎬 ฉาก ${b} ความคืบหน้า: ${q}%`),N=q;try{S(`scene${b}-wait`,"active",q)}catch{}}L=0}else if(N>0){if(L===0)L=Date.now(),n(`🔍 ฉาก ${b}: % หายไป (จาก ${N}%) — กำลังยืนยัน...`);else if(Date.now()-L>=V){n(`✅ ฉาก ${b}: % หายไป ${V/1e3} วินาที — เจนเสร็จ!`),Y=!0;break}}if(pe()){n("⛔ ผู้ใช้สั่งหยุด");return}await g(2e3)}Y||A(`ฉาก ${b} หมดเวลา`),n(`✅ ฉาก ${b} เสร็จแล้ว`);try{S(`scene${b}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{S("download","active")}catch{}await g(2e3);const B=Date.now();let R=null;const w=Date.now();for(;!R&&Date.now()-w<1e4;){for(const b of document.querySelectorAll("button")){const x=b.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const E=b.getBoundingClientRect();if(E.width>0&&E.height>0){R=b;break}}}R||await g(1e3)}if(!R){A("ไม่พบปุ่มดาวน์โหลด");return}await Z(R),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await g(1500);let f=null;for(let b=0;b<3&&!f;b++){b>0&&n(`🔄 ลองหา 720p ครั้งที่ ${b+1}...`);let x=null;const E=Date.now();for(;!x&&Date.now()-E<5e3;){for(const N of document.querySelectorAll("[role='menuitem']"))if((N.textContent||"").trim().includes("Full Video")&&N.querySelector("i")){const H=N.getBoundingClientRect();if(H.width>0&&H.height>0){x=N;break}}x||await g(500)}if(!x){A("ไม่พบ Full Video");continue}const P=x.getBoundingClientRect(),O=P.left+P.width/2,_=P.top+P.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:O,clientY:_})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:O,clientY:_})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:O,clientY:_})),await Z(x),n("คลิก/hover Full Video ✅"),await g(2e3);const G=Date.now();for(;!f&&Date.now()-G<8e3;){for(const N of document.querySelectorAll("button[role='menuitem']")){const L=N.querySelectorAll("span");for(const H of L)if((H.textContent||"").trim()==="720p"){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0){f=N;break}}if(f)break}f||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:O,clientY:_})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:O+20,clientY:_}))),await g(500))}}if(!f){A("ไม่พบ 720p");return}await Z(f),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const v=Date.now();let C=!1,F=!1;for(;Date.now()-v<3e5;){for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(b.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),C=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(F||(F=!0,n("⏳ กำลังดาวน์โหลด...")))}if(C)break;if(F){let b=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){b=!0;break}if(!b){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),C=!0;break}}if(pe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await g(2e3)}if(!C){A("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let T=!1;const $=Date.now();for(;Date.now()-$<6e4&&!T;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:B},x=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),T=!0,x.downloadUrl&&(o=x.downloadUrl,n(`[TikTok] จะใช้ download URL: ${x.downloadUrl.substring(0,80)}...`))):n(`ดาวน์โหลดยังไม่พร้อม: ${x==null?void 0:x.message}`),b()})})}catch(b){A(`ตรวจสอบผิดพลาด: ${b.message}`)}T||await g(3e3)}T||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const D=await Le();o||(o=D);try{S("open","done"),Ee(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Ge(o),Ne(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const l=(B,R="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const w of document.querySelectorAll(R)){const f=(w.textContent||"").trim();if(f.includes(B)&&f.length<100){const v=w.getBoundingClientRect();if(v.width>0&&v.height>0&&v.top>=0)return w}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let p=null;const s=Date.now();for(;!p&&Date.now()-s<1e4;){for(const B of document.querySelectorAll("button, [role='button']")){const R=(B.textContent||"").trim(),w=R.toLowerCase();if((w.includes("download")||w.includes("ดาวน์โหลด"))&&R.length<80){const f=B.getBoundingClientRect();if(f.width>0&&f.height>0){p=B;break}}}if(!p)for(const B of document.querySelectorAll("button")){const R=(B.getAttribute("aria-label")||"").toLowerCase();if(R.includes("download")||R.includes("ดาวน์")){const w=B.getBoundingClientRect();if(w.width>0&&w.height>0){p=B;break}}}p||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!p){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(p.textContent||"").trim().substring(0,40)}"`),await Z(p),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const c=Date.now();let d=null;const u=Date.now();for(;!d&&Date.now()-u<5e3;)d=l("1080p"),d||(n("รอ 1080p..."),await g(500));if(!d){A("ไม่พบ 1080p");return}await Z(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const m=Date.now();let I=!1,k=!1,y=0;const h=3e3;for(;Date.now()-m<3e5;){const R=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(R.includes("upscaling complete")||R.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),I=!0;break}for(const f of document.querySelectorAll("div, span, p")){const v=(f.textContent||"").trim().toLowerCase();if(v.length<60&&(v.includes("upscaling complete")||v.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(X=f.textContent)==null?void 0:X.trim()}")`),I=!0;break}}if(I)break;if(R.includes("upscaling your video")||R.includes("กำลังอัปสเกล")){k=!0,y=0;const f=Math.floor((Date.now()-m)/1e3);n(`⏳ กำลังอัปสเกล... (${f} วินาที)`)}else if(k){if(y===0)y=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-y>=h){n(`✅ ข้อความ Upscaling หายไป ${h/1e3} วินาที — เสร็จ!`),I=!0;break}}else{const f=Math.floor((Date.now()-m)/1e3);f%10<3&&n(`⏳ รอ Upscale... (${f} วินาที)`)}if(pe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!I){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let r=!1;const M=Date.now();for(;Date.now()-M<6e4&&!r;){try{await new Promise(B=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},R=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):R!=null&&R.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${R.message}`),r=!0,R.downloadUrl&&(o=R.downloadUrl,n(`[TikTok] จะใช้ download URL: ${R.downloadUrl.substring(0,80)}...`))):n(`ดาวน์โหลดยังไม่พร้อม: ${R==null?void 0:R.message}`),B()})})}catch(B){A(`ตรวจสอบผิดพลาด: ${B.message}`)}r||await g(3e3)}r||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const z=await Le();o||(o=z),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Ge(o),Ne(2e3)}async function yt(t=2,e=2,i,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{i&&_e(i)}catch{}try{Fe(t)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let v=2;v<=e;v++)f.push(`scene${v}-prompt`,`scene${v}-gen`),v<e&&f.push(`scene${v}-wait`);for(const v of f)S(v,"done");S(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${e}/${t} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await g(2e3);const o=(()=>{for(const f of document.querySelectorAll("button")){const v=f.querySelectorAll("i");for(const C of v){const F=(C.textContent||"").trim();if(F==="volume_up"||F==="volume_off"||F==="volume_mute"){const T=f.getBoundingClientRect();if(T.width>0&&T.height>0)return f}}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let l=0,p=0;const s=Date.now(),c=6e5,d=5e3;let u=!1,m=0;for(;Date.now()-s<c;){let f=null;const v=document.querySelectorAll("div, span, p, label, strong, small");for(const C of v){if(C.closest("#netflow-engine-overlay"))continue;const T=(C.textContent||"").trim().match(/^(\d{1,3})%$/);if(T){const $=C.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<120&&$.height<60){f=parseInt(T[1],10);break}}}if(f!==null){if(m=0,f!==l){n(`🎬 scene ${e} ความคืบหน้า: ${f}%`),l=f;try{S(`scene${e}-wait`,"active",f)}catch{}}p=0}else if(l>0){if(p===0)p=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${l}%) — กำลังยืนยัน...`);else if(Date.now()-p>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),u=!0;break}}else if(m++,m>=15){const C=document.querySelectorAll("video");let F=!1;for(const T of C)if(T.readyState>=2&&!T.paused&&T.getBoundingClientRect().width>200){F=!0;break}if(F){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),u=!0;break}if(m>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),u=!0;break}}await g(2e3)}u||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{S(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let f=e+1;f<=t;f++){const v=a[f-1];if(!v){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate (pending recovery) ──`);let C=null;const F=Date.now();for(;!C&&Date.now()-F<1e4;){const _=document.querySelectorAll("[data-slate-editor='true']");if(_.length>0&&(C=_[_.length-1]),!C){const G=document.querySelectorAll("[role='textbox'][contenteditable='true']");G.length>0&&(C=G[G.length-1])}C||await g(1e3)}if(!C){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await Ie(C,v),n(`วาง prompt ฉาก ${f} (${v.length} ตัวอักษร) ✅`);try{S(`scene${f}-prompt`,"done"),S(`scene${f}-gen`,"active")}catch{}await g(1e3);const T=C.getBoundingClientRect();let $=null,D=1/0;for(const _ of document.querySelectorAll("button")){if(_.disabled)continue;const G=_.querySelectorAll("i");let N=!1;for(const j of G)if((j.textContent||"").trim()==="arrow_forward"){N=!0;break}if(!N)continue;const L=_.getBoundingClientRect();if(L.width<=0||L.height<=0)continue;const H=Math.abs(L.top-T.top)+Math.abs(L.right-T.right);H<D&&(D=H,$=_)}if(!$)for(const _ of document.querySelectorAll("button")){const G=_.querySelectorAll("i");for(const N of G)if((N.textContent||"").trim()==="arrow_forward"){const L=_.getBoundingClientRect();if(L.width>0&&L.height>0){$=_;break}}if($)break}if(!$){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(_=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:f,scenePrompts:a}},()=>_())}),await Z($),n(`คลิก Generate ฉาก ${f} ✅`);try{S(`scene${f}-gen`,"done"),S(`scene${f}-wait`,"active")}catch{}await g(5e3);let b=0,x=0;const E=Date.now();let P=!1,O=0;for(;Date.now()-E<6e5;){let _=null;const G=document.querySelectorAll("div, span, p, label, strong, small");for(const N of G){if(N.closest("#netflow-engine-overlay"))continue;const H=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const j=N.getBoundingClientRect();if(j.width>0&&j.height>0&&j.width<120&&j.height<60){_=parseInt(H[1],10);break}}}if(_!==null){if(O=0,_!==b){n(`🎬 ฉาก ${f} ความคืบหน้า: ${_}%`),b=_;try{S(`scene${f}-wait`,"active",_)}catch{}}x=0}else if(b>0){if(x===0)x=Date.now();else if(Date.now()-x>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),P=!0;break}}else if(O++,O>=15){const N=document.querySelectorAll("video");let L=!1;for(const H of N)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){L=!0;break}if(L){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),P=!0;break}if(O>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),P=!0;break}}await g(2e3)}P||n(`⚠️ ฉาก ${f} หมดเวลา`);try{S(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove("netflow_pending_action"),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);let I=null;try{S("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const k=Date.now();let y=null;const h=Date.now();for(;!y&&Date.now()-h<1e4;){for(const f of document.querySelectorAll("button")){const v=f.querySelector("i");if(v&&(v.textContent||"").trim()==="download"){const C=f.getBoundingClientRect();if(C.width>0&&C.height>0){y=f;break}}}y||await g(1e3)}if(!y){A("ไม่พบปุ่มดาวน์โหลด");return}await Z(y),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await g(1500);let r=null;for(let f=0;f<3&&!r;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let v=null;const C=Date.now();for(;!v&&Date.now()-C<5e3;){for(const b of document.querySelectorAll("[role='menuitem']"))if((b.textContent||"").trim().includes("Full Video")&&b.querySelector("i")){const E=b.getBoundingClientRect();if(E.width>0&&E.height>0){v=b;break}}v||await g(500)}if(!v){A("ไม่พบ Full Video");continue}const F=v.getBoundingClientRect(),T=F.left+F.width/2,$=F.top+F.height/2;v.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:T,clientY:$})),v.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:T,clientY:$})),v.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:T,clientY:$})),await Z(v),n("คลิก/hover Full Video ✅"),await g(2e3);const D=Date.now();for(;!r&&Date.now()-D<8e3;){for(const b of document.querySelectorAll("button[role='menuitem']")){const x=b.querySelectorAll("span");for(const E of x)if((E.textContent||"").trim()==="720p"){const P=b.getBoundingClientRect();if(P.width>0&&P.height>0){r=b;break}}if(r)break}r||(v.isConnected&&(v.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:T,clientY:$})),v.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:T+20,clientY:$}))),await g(500))}}if(!r){A("ไม่พบ 720p");return}await Z(r),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const M=Date.now();let z=!1,X=!1;for(;Date.now()-M<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const v=(f.textContent||"").trim();if(v==="Download complete!"||v==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),z=!0;break}(v.includes("Downloading your extended video")||v.includes("กำลังดาวน์โหลด"))&&(X||(X=!0,n("⏳ กำลังดาวน์โหลด...")))}if(z)break;if(X){let f=!1;for(const v of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((v.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),z=!0;break}}await g(2e3)}if(!z){A("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await g(5e3);let B=!1;const R=Date.now();for(;Date.now()-R<6e4&&!B;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:k},v=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):v!=null&&v.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${v.message}`),B=!0,v.downloadUrl&&(I=v.downloadUrl,n(`[TikTok] จะใช้ download URL: ${v.downloadUrl.substring(0,80)}...`))):n(`ดาวน์โหลดยังไม่พร้อม: ${v==null?void 0:v.message}`),f()})})}catch(f){A(`ตรวจสอบผิดพลาด: ${f.message}`)}B||await g(3e3)}B||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const w=await Le();I||(I=w);try{S("open","done"),Ee(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Ge(I),Ne(2e3)}async function jt(){try{const t=await new Promise(l=>{chrome.storage.local.get("netflow_pending_action",p=>{if(chrome.runtime.lastError){l(null);return}l((p==null?void 0:p.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const i=Date.now()-t.timestamp;if(i>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(l=>{chrome.storage.local.set({netflow_pending_action:t},()=>l())}),await g(300),!await new Promise(l=>{chrome.storage.local.get("netflow_pending_action",p=>{const s=p==null?void 0:p.netflow_pending_action;l((s==null?void 0:s._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(i/1e3)} วินาที)`),t.action==="mute_video"?await vt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await yt(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,i)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),i({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Xt(t).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>{if(a instanceof He||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Pe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{ut()}catch{}}else console.error("[Netflow AI] Generate error:",a)}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,i({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return i({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return i({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const a=Lt();if(!a){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=a.getBoundingClientRect(),l=o.left+o.width/2,p=o.top+o.height/2;n(`การ์ดรูปที่ (${l.toFixed(0)}, ${p.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const c=document.elementFromPoint(l,p);c?(await Z(c),n(`คลิก ${s+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await Z(a),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),jt()})();
