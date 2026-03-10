(function(){"use strict";const le={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let K=le.green,be=null;function Ne(t){t&&le[t]&&(be=t,K=le[t],Ke(),requestAnimationFrame(()=>ht()))}function Pt(){if(be&&le[be])return le[be];try{const t=localStorage.getItem("netflow_app_theme");if(t&&le[t])return le[t]}catch{}return le.green}let ne=0,oe=255,ie=65;function Ke(){const t=K.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}const Qe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Je='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let j=null,Q=null,ce=null,Ze=0,Ie=null,we=null,Se=null,Oe=0,de=!1,se=null,xe=null,ve=null,ye=1,W=[];function ze(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let i=2;i<=t;i++)e.push({stepId:`scene${i}-prompt`,label:`ฉาก ${i} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${i}-gen`,label:`ฉาก ${i} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${i}-wait`,label:`ฉาก ${i} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const pe=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];W=ze(1);function Mt(t){const e=t.rgb,i=t.accentRgb,o=t.doneRgb,a=t.hex,f=t.accentHex,c=t.doneHex,s=(()=>{const k=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!k)return"#4ade80";const r=C=>Math.min(255,C+80);return`#${[1,2,3].map(C=>r(parseInt(k[C],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const k=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!k)return"#4ade80";const r=C=>Math.min(255,C+60);return`#${[1,2,3].map(C=>r(parseInt(k[C],16)).toString(16).padStart(2,"0")).join("")}`})(),d=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),g=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,h=d?parseInt(d[1],16)/g:0,_=d?parseInt(d[2],16)/g:1,N=d?parseInt(d[3],16)/g:.25,B=k=>`${Math.round(h*k)}, ${Math.round(_*k)}, ${Math.round(N*k)}`;return`
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
    background: linear-gradient(180deg, rgba(${B(6)},0.75) 0%, rgba(${B(3)},0.92) 100%);
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
    background: linear-gradient(90deg, ${a}, ${f});
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

    `}function et(){ce||(ce=document.createElement("style"),ce.id="netflow-overlay-styles",ce.textContent=Mt(K),document.head.appendChild(ce))}function tt(t){t.innerHTML="",W.forEach((e,i)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function It(){const t=document.getElementById("nf-terminal");if(!t)return;tt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${W.length}`)}function nt(t,e){let s="";for(let _=0;_<20;_++){const N=_/20*Math.PI*2,B=(_+.2)/20*Math.PI*2,k=(_+.5)/20*Math.PI*2,r=(_+.8)/20*Math.PI*2,C=(_+1)/20*Math.PI*2;s+=`${_===0?"M":"L"}${(120+100*Math.cos(N)).toFixed(1)},${(120+100*Math.sin(N)).toFixed(1)} `,s+=`L${(120+100*Math.cos(B)).toFixed(1)},${(120+100*Math.sin(B)).toFixed(1)} `,s+=`L${(120+112*Math.cos(k)).toFixed(1)},${(120+112*Math.sin(k)).toFixed(1)} `,s+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,s+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `}s+="Z";const l=14,d=72,g=62;let h="";for(let _=0;_<l;_++){const N=_/l*Math.PI*2,B=(_+.25)/l*Math.PI*2,k=(_+.75)/l*Math.PI*2,r=(_+1)/l*Math.PI*2;h+=`${_===0?"M":"L"}${(120+g*Math.cos(N)).toFixed(1)},${(120+g*Math.sin(N)).toFixed(1)} `,h+=`L${(120+d*Math.cos(B)).toFixed(1)},${(120+d*Math.sin(B)).toFixed(1)} `,h+=`L${(120+d*Math.cos(k)).toFixed(1)},${(120+d*Math.sin(k)).toFixed(1)} `,h+=`L${(120+g*Math.cos(r)).toFixed(1)},${(120+g*Math.sin(r)).toFixed(1)} `}return h+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${h}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function St(){const t=document.createElement("div");t.id="netflow-engine-overlay",se=document.createElement("canvas"),se.id="nf-matrix-canvas",t.appendChild(se);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let v=1;v<=5;v++){const I=document.createElement("div");I.className=`nf-ambient-orb nf-orb-${v}`,t.appendChild(I)}const i=document.createElement("div");i.className="nf-pat-data",t.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-a",t.appendChild(o);const a=document.createElement("div");a.className="nf-pat-diag-b",t.appendChild(a);const f=document.createElement("div");f.className="nf-pat-circuit",t.appendChild(f);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",t.appendChild(l);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const g=document.createElement("div");g.className="nf-pat-wave-h",t.appendChild(g);const h=document.createElement("div");h.className="nf-pat-radar",t.appendChild(h);const _=document.createElement("div");_.className="nf-pat-ripple-1",t.appendChild(_);const N=document.createElement("div");N.className="nf-pat-ripple-2",t.appendChild(N);const B=document.createElement("div");B.className="nf-pat-techscan",t.appendChild(B);const k=document.createElement("div");k.className="nf-center-glow",t.appendChild(k);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const C=document.createElement("div");C.className="nf-crt-scanlines",t.appendChild(C);const y=document.createElement("div");y.className="nf-vignette",t.appendChild(y);for(let v=0;v<3;v++){const I=document.createElement("div");I.className="nf-pulse-ring",t.appendChild(I)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(v=>{const I=document.createElement("div");I.className=`nf-corner-deco ${v}`,t.appendChild(I)});const D=document.createElement("button");D.className="nf-stop-btn",D.innerHTML='<span class="nf-stop-icon"></span> หยุด',D.onclick=()=>{var v;window.__NETFLOW_STOP__=!0;try{Te("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((v=chrome.runtime)!=null&&v.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(D);const M=document.createElement("button");M.className="nf-close-btn",M.textContent="✕ ซ่อน",M.onclick=()=>Ge(),t.appendChild(M);const P=document.createElement("div");P.className="nf-layout";const w=document.createElement("div");w.className="nf-core-monitor",w.id="nf-core-monitor";const p=document.createElement("div");p.className="nf-core-header",p.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${W.length}</div>
    `,w.appendChild(p);const m=document.createElement("div");m.className="nf-terminal",m.id="nf-terminal",tt(m),w.appendChild(m);const $=document.createElement("div");$.className="nf-engine-core",$.id="nf-engine-core";const L=document.createElement("div");L.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(v=>{const I=document.createElement("div");I.className=`nf-frame-corner ${v}`,L.appendChild(I)}),$.appendChild(L);const F="http://www.w3.org/2000/svg",E=document.createElementNS(F,"svg");E.setAttribute("class","nf-engine-waves"),E.setAttribute("viewBox","0 0 560 140"),E.setAttribute("preserveAspectRatio","none"),E.id="nf-engine-waves";for(let v=0;v<4;v++){const I=document.createElementNS(F,"path");I.setAttribute("fill","none"),I.setAttribute("stroke-width",v<2?"1.5":"1"),I.setAttribute("stroke",v<2?`rgba(${K.rgb},${.14+v*.1})`:`rgba(${K.accentRgb},${.1+(v-2)*.08})`),I.setAttribute("data-wave-idx",String(v)),E.appendChild(I)}$.appendChild(E);const A=document.createElement("div");A.className="nf-engine-brand-inner",A.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${nt(K.rgb,K.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${nt(K.rgb,K.accentRgb)}
        </div>
    `,$.appendChild(A);const b=document.createElement("div");b.className="nf-engine-stats",b.id="nf-engine-stats",b.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([v,I,z])=>`<div class="nf-stat-item"><span class="nf-stat-label">${v}</span><span class="nf-stat-val" id="${I}">${z}</span></div>`).join(""),$.appendChild(b),w.appendChild($),P.appendChild(w);const x=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];pe.forEach((v,I)=>{const z=_t(v);z.classList.add(x[I]),z.id=`nf-mod-${v.id}`,P.appendChild(z)}),t.appendChild(P);for(let v=0;v<30;v++){const I=document.createElement("div");I.className="nf-particle",I.style.left=`${5+Math.random()*90}%`,I.style.bottom=`${Math.random()*40}%`,I.style.animationDuration=`${3+Math.random()*5}s`,I.style.animationDelay=`${Math.random()*4}s`;const z=.3+Math.random()*.4,R=.7+Math.random()*.3;I.style.background=`rgba(${Math.floor(ne*R)}, ${Math.floor(oe*R)}, ${Math.floor(ie*R)}, ${z})`,I.style.width=`${1+Math.random()*2}px`,I.style.height=I.style.width,t.appendChild(I)}return t}function _t(t){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(i),t.steps.forEach(a=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${a.id}`;let c="";a.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${c}
        `,e.appendChild(f)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function Tt(){Ze=Date.now(),Ie=setInterval(()=>{const t=Math.floor((Date.now()-Ze)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${i}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${e}:${i}`)},1e3)}function ot(){Ie&&(clearInterval(Ie),Ie=null)}const At=120,it=160,at=.4;let ge=null,rt=0,st=0,lt=0,$e=[];function Rt(t,e){$e=[];for(let i=0;i<At;i++){const o=Math.random();let a;o<.22?a=0:o<.4?a=1:o<.55?a=2:o<.68?a=3:o<.84?a=4:a=5;const f=Math.random()*t,c=Math.random()*e,s=50+Math.random()*220,l=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);$e.push({x:a===0?Math.random()*t:f+Math.cos(l)*s,y:a===0?Math.random()*e:c+Math.sin(l)*s,vx:(Math.random()-.5)*at,vy:(Math.random()-.5)*at,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:f,oCy:c,oRadius:s,oAngle:l,oSpeed:d})}}function Bt(){if(!se)return;const t=se;if(xe=t.getContext("2d"),!xe)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,$e.length===0&&Rt(t.width,t.height)};e(),window.addEventListener("resize",e);let i=null,o=0,a=0,f=!1;function c(){if(!xe||!se){ve=null;return}if(ve=requestAnimationFrame(c),f=!f,f)return;const s=xe,l=se.width,d=se.height;s.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,s.fillRect(0,0,l,d),(!i||o!==l||a!==d)&&(o=l,a=d,i=s.createRadialGradient(l*.5,d*.5,0,l*.5,d*.5,Math.max(l,d)*.6),i.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=i,s.fillRect(0,0,l,d);const g=$e,h=g.length,_=it*it;for(let k=0;k<h;k++){const r=g[k];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>l&&(r.x=l,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>d&&(r.y=d,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const C=r.oAngle,y=r.oRadius*.7;r.x=r.oCx+y*Math.cos(C),r.y=r.oCy+y*Math.sin(C)*Math.cos(C),r.oCx+=Math.sin(C*.15)*.12,r.oCy+=Math.cos(C*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const C=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*C,r.y=r.oCy+Math.sin(r.oAngle)*C,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=l+30:r.x>l+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const C=r.oRadius+50;r.oCx<-C?r.oCx=l+C:r.oCx>l+C&&(r.oCx=-C),r.oCy<-C?r.oCy=d+C:r.oCy>d+C&&(r.oCy=-C)}}s.beginPath(),s.strokeStyle=`rgba(${ne},${oe},${ie},0.06)`,s.lineWidth=.4;const N=new Path2D;for(let k=0;k<h;k++){const r=g[k];for(let C=k+1;C<h;C++){const y=g[C],D=r.x-y.x,M=r.y-y.y,P=D*D+M*M;P<_&&(1-P/_<.4?(s.moveTo(r.x,r.y),s.lineTo(y.x,y.y)):(N.moveTo(r.x,r.y),N.lineTo(y.x,y.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${ne},${oe},${ie},0.18)`,s.lineWidth=.8,s.stroke(N),!ge||rt!==ne||st!==oe||lt!==ie){ge=document.createElement("canvas");const k=48;ge.width=k,ge.height=k;const r=ge.getContext("2d"),C=r.createRadialGradient(k/2,k/2,0,k/2,k/2,k/2);C.addColorStop(0,`rgba(${ne},${oe},${ie},0.9)`),C.addColorStop(.3,`rgba(${ne},${oe},${ie},0.35)`),C.addColorStop(1,`rgba(${ne},${oe},${ie},0)`),r.fillStyle=C,r.fillRect(0,0,k,k),rt=ne,st=oe,lt=ie}const B=ge;for(let k=0;k<h;k++){const r=g[k],C=.6+.4*Math.sin(r.pulsePhase),y=r.radius*5*(.8+C*.4);s.globalAlpha=.5+C*.4,s.drawImage(B,r.x-y/2,r.y-y/2,y,y)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let k=0;k<h;k++){const r=g[k];if(r.radius>2){const C=.6+.4*Math.sin(r.pulsePhase),y=r.radius*(.8+C*.4)*.35;s.moveTo(r.x+y,r.y),s.arc(r.x,r.y,y,0,Math.PI*2)}}s.fill()}c()}function Dt(){ve!==null&&(cancelAnimationFrame(ve),ve=null),se=null,xe=null,$e=[]}let Ee=null;const _e=560,Ft=140,ct=_e/2,dt=Ft/2,pt=[];for(let t=0;t<=_e;t+=8){const e=Math.abs(t-ct)/ct;pt.push(Math.pow(Math.min(1,e*1.6),.6))}const Nt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/_e,off:t*.6,spd:.7+t*.12}));let Le=!1;function ft(){if(we=requestAnimationFrame(ft),Le=!Le,Le)return;if(Oe+=.07,!Ee){const e=document.getElementById("nf-engine-waves");if(!e){we=null;return}Ee=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ee.length;e++){const i=Nt[e],o=Oe*i.spd+i.off;t.length=0,t.push(`M 0 ${dt}`);let a=0;for(let f=0;f<=_e;f+=8){const c=dt+i.amp*pt[a++]*Math.sin(f*i.freq+o);t.push(`L${f} ${c*10+.5|0}`)}Ee[e].setAttribute("d",t.join(" "))}}function Ot(){Oe=0,ft(),Bt(),Se=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function ut(){we!==null&&(cancelAnimationFrame(we),we=null),Se&&(clearInterval(Se),Se=null),Ee=null,Dt()}function Ve(){let t=0;const e=W.filter(d=>d.status!=="skipped").length;for(const d of W){const g=document.getElementById(`nf-proc-${d.stepId}`);if(!g)continue;g.className="nf-proc-row";const h=g.querySelector(".nf-proc-badge");switch(d.status){case"done":g.classList.add("nf-proc-done"),h&&(h.textContent="✅ done"),t++;break;case"active":g.classList.add("nf-proc-active"),h&&(h.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":g.classList.add("nf-proc-error"),h&&(h.textContent="❌ error");break;case"skipped":g.classList.add("nf-proc-skipped"),h&&(h.textContent="— skip");break;default:g.classList.add("nf-proc-waiting"),h&&(h.textContent="(queued)")}}const i=W.findIndex(d=>d.status==="active"),o=i>=0?i+1:t>=e&&e>0?W.length:t,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${o}/${W.length}`);const f=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");t>=e&&e>0?(f&&(f.textContent="COMPLETE",f.style.color=K.doneHex),c&&(c.style.background=K.doneHex,c.style.boxShadow=`0 0 8px rgba(${K.doneRgb},0.7)`)):W.some(g=>g.status==="error")?(f&&(f.textContent="ERROR",f.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):W.some(g=>g.status==="active")&&f&&(f.textContent="ACTIVE",f.style.color=K.hex,f.style.textShadow=`0 0 10px rgba(${K.rgb},0.5)`);const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function gt(){Q&&Q.isConnected||(et(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=de?Qe:Je,Q.title="ซ่อน/แสดง Netflow Overlay",Q.onclick=()=>Ge(),document.body.appendChild(Q))}function Ge(){j&&(gt(),de?(j.classList.remove("nf-hidden"),j.classList.add("nf-visible"),Q&&(Q.innerHTML=Je),de=!1):(j.classList.remove("nf-visible"),j.classList.add("nf-hidden"),Q&&(Q.innerHTML=Qe),de=!0))}const mt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ht(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=be;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const i=mt[e]||mt.green;let o;try{o=chrome.runtime.getURL(i)}catch{o=`/${i}`}const a=K.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${o}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${a},0.45)`,t.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function qe(t=1){if(K=Pt(),Ke(),j&&j.isConnected){de&&Ge();return}if(j&&!j.isConnected&&(j=null),ce&&(ce.remove(),ce=null),et(),ye=t,W=ze(t),t>1){const e=pe.find(o=>o.id==="video");if(e){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=t;a++)o.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),o.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),o.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});e.steps=o}const i=pe.find(o=>o.id==="render");if(i){const o=i.steps.find(f=>f.id==="download");o&&(o.label="ดาวน์โหลด 720p");const a=i.steps.find(f=>f.id==="upscale");a&&(a.label="Full Video")}}j=St(),document.body.appendChild(j),de=!1,gt(),Tt(),Ot(),requestAnimationFrame(()=>ht())}function bt(){ot(),ut(),de=!1,j&&(j.classList.add("nf-fade-out"),setTimeout(()=>{j==null||j.remove(),j=null},500)),Q&&(Q.remove(),Q=null)}const zt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Lt(t,e,i){const o=W.findIndex(g=>g.status==="active"),a=W.filter(g=>g.status==="done").length,f=W.length,c=o>=0?o+1:a>=f?f:a,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${c}/${f}`);let l=1;for(const g of W)if(g.status==="active"||g.status==="done")if(g.stepId.startsWith("scene")){const h=g.stepId.match(/^scene(\d+)-/);h&&(l=Math.max(l,parseInt(h[1],10)))}else(g.stepId==="download"||g.stepId==="upscale"||g.stepId==="open")&&(l=ye);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=ye>1?`${l}/${ye}`:"1/1"),e==="active"){const g=document.getElementById("nf-stat-status"),h=zt[t]||t.toUpperCase();g&&(g.textContent=h)}else if(e==="done"&&a>=f){const g=document.getElementById("nf-stat-status");g&&(g.textContent="COMPLETE")}else if(e==="error"){const g=document.getElementById("nf-stat-status");g&&(g.textContent="ERROR")}if(i!==void 0&&i>0){const g=document.getElementById("nf-stat-progress");g&&(g.textContent=`${Math.min(100,i)}%`)}}function S(t,e,i){if(!j)return;for(const a of pe)for(const f of a.steps)f.id===t&&(f.status=e,i!==void 0&&(f.progress=i));for(const a of W)a.stepId===t&&(a.status=e,i!==void 0&&(a.progress=i));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),Lt(t,e,i),i!==void 0){const a=document.getElementById(`nf-bar-${t}`);a&&(a.style.width=`${Math.min(100,i)}%`)}He(),Ve()}function me(t){S(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function ke(t=4e3){ot(),ut(),He(),Ve(),setTimeout(()=>bt(),t)}function He(){for(const t of pe){const e=t.steps.filter(l=>l.status!=="skipped").length,i=t.steps.filter(l=>l.status==="done").length,o=t.steps.some(l=>l.status==="active"),a=e>0?Math.round(i/e*100):0,f=document.getElementById(`nf-pct-${t.id}`);f&&(f.textContent=`${a}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${a}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),a>=100?s.classList.add("nf-done"):o&&s.classList.add("nf-active"))}}function Vt(t){var o,a,f,c;ye=t;const e=new Map;for(const s of W)e.set(s.stepId,{status:s.status,progress:s.progress});W=ze(t);for(const s of W){const l=e.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(It(),t>1){const s=pe.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=s.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((f=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:f.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)l.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),l.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),l.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=l,wt(s)}}const i=pe.find(s=>s.id==="render");if(i&&t>1){const s=i.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=i.steps.find(d=>d.id==="upscale");l&&(l.label="Full Video"),wt(i)}He(),Ve()}function wt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),t.steps.forEach(a=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${a.id}`;let c="";a.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${c}
        `,e.appendChild(f)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function Te(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Te(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},T=t=>{console.warn(`[Netflow AI] ${t}`);try{Te(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Ue(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?T(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){T(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Ae(){try{const t=document.querySelectorAll("video");let e=null;for(const i of t)if(i.src&&i.src.startsWith("http")&&i.getBoundingClientRect().width>100){e=i.src;break}if(!e){for(const i of t)if(i.src&&i.getBoundingClientRect().width>50){e=i.src;break}}if(!e)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;if(n(`[TikTok] พบ video URL: ${e.substring(0,80)}...`),e.startsWith("https://"))try{await new Promise(i=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),i()})})}catch{}return e}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}function Ce(t){if(t)try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}const xt=(()=>{const t="netflow_instance_id";let e=sessionStorage.getItem(t);return e||(e=crypto.randomUUID().slice(0,8),sessionStorage.setItem(t,e)),e})(),J=`netflow_pending_${xt}`,We=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ye=/Win/i.test(navigator.userAgent),he=We?"🍎 Mac":Ye?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${he} [${xt}]`);class Re extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const Be=(()=>{const t="self.onmessage=e=>{const{id,ms}=e.data;setTimeout(()=>self.postMessage(id),ms)};";try{return new Worker(URL.createObjectURL(new Blob([t],{type:"application/javascript"})))}catch{return null}})();let Gt=0;const Xe=new Map;Be&&(Be.onmessage=t=>{const e=Xe.get(t.data);e&&(Xe.delete(t.data),e())});const u=t=>new Promise((e,i)=>{if(window.__NETFLOW_STOP__)return i(new Re);if(Be){const o=++Gt;Xe.set(o,()=>{if(window.__NETFLOW_STOP__){i(new Re);return}e()}),Be.postMessage({id:o,ms:t})}else{const o=setTimeout(()=>{if(window.__NETFLOW_STOP__){i(new Re);return}e()},t);u._lastId=o}});function fe(){return!!window.__NETFLOW_STOP__}function vt(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=(document.body.textContent||"").toLowerCase();if(!t.some(f=>e.includes(f)))return null;const o=document.querySelectorAll("span, p, h1, h2, h3, li");for(const f of o){if(f.closest("#netflow-engine-overlay"))continue;const c=(f.textContent||"").trim().toLowerCase();if(!(c.length>200||c.length<5)){for(const s of t)if(c.includes(s))return((a=f.textContent)==null?void 0:a.trim())||s}}return null}async function te(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",a)),await u(80),t.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",a)),t.dispatchEvent(new MouseEvent("click",a)),await u(50),t.click()}function qt(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",a)),t.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",a)),t.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",a))}function Ht(t){const e=[],i=document.querySelectorAll("i");for(const o of i){if((o.textContent||"").trim()!==t)continue;let f=o,c=null,s=1/0;for(let l=0;l<20&&f&&(f=f.parentElement,!(!f||f===document.body));l++){const d=f.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const g=d.width*d.height;g<s&&(c=f,s=g)}}c&&!e.includes(c)&&e.push(c)}return e.sort((o,a)=>{const f=o.getBoundingClientRect(),c=a.getBoundingClientRect();return f.left-c.left}),e}function je(t=!1){const e=[],i=document.querySelectorAll("video");for(const c of i){let s=c.parentElement;for(let l=0;l<10&&s;l++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of o){const s=(c.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=c.parentElement;for(let d=0;d<10&&l;d++){const g=l.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){e.push({el:l,left:g.left});break}l=l.parentElement}}}const a=document.querySelectorAll("img");for(const c of a){const s=(c.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=c.parentElement;for(let d=0;d<10&&l;d++){const g=l.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){e.push({el:l,left:g.left});break}l=l.parentElement}}}const f=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(s=>s.el===c));if(f.sort((c,s)=>c.left-s.left),f.length>0){const c=f[0].el,s=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Ut(){const t=Ht("image");if(t.length>0){const i=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${i.left.toFixed(0)},${i.top.toFixed(0)}) ขนาด ${i.width.toFixed(0)}x${i.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const i of e){let o=i.parentElement;for(let a=0;a<10&&o;a++){const f=o.getBoundingClientRect();if(f.width>100&&f.height>80&&f.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${f.left.toFixed(0)},${f.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Wt(t,e){var s;const[i,o]=t.split(","),a=((s=i.match(/:(.*?);/))==null?void 0:s[1])||"image/png",f=atob(o),c=new Uint8Array(f.length);for(let l=0;l<f.length;l++)c[l]=f.charCodeAt(l);return new File([c],e,{type:a})}function Pe(t){var o;const e=[],i=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const a of i)if(((o=a.textContent)==null?void 0:o.trim())===t){const f=a.closest("button");f&&e.push(f)}return e}function Yt(){const t=[...Pe("add"),...Pe("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const a of o){const f=a.getBoundingClientRect();if(f.bottom>window.innerHeight*.7&&f.width<60&&f.height<60){const c=(a.textContent||"").trim();if(c==="+"||c==="add")return a}}return null}let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();a.y>i&&(i=a.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${i.toFixed(0)}`),e}function yt(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=Pe(o);let f=null,c=0;for(const s of a){const l=s.getBoundingClientRect();l.y>c&&(c=l.y,f=s)}if(f)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${c.toFixed(0)}`),f}const t=document.querySelectorAll("button");let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const f=Math.abs(a.width-a.height)<10&&a.width<60,c=a.y+a.x+(f?1e3:0);c>i&&(i=c,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const a=(o.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return o}return null}function $t(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const i=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of i){const a=o.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function De(t,e){var i,o,a,f;t.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),await u(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await u(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await u(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await u(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(s),await u(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((i=navigator.clipboard)!=null&&i.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await u(200),document.execCommand("paste"),await u(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(c){let s=t[c];for(let l=0;l<30&&s;l++){const d=s.memoizedProps,g=s.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const h=d.editor;h.selection,h.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((f=(a=g==null?void 0:g.memoizedState)==null?void 0:a.editor)!=null&&f.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),g.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Xt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const i of e)t.push({input:i,origType:"file"}),i.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function jt(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${he})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${he})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Kt(t,e,i){var d;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),a=[...t.map(g=>g.input)];for(const g of o)!a.includes(g)&&g.offsetParent===null&&a.push(g);for(const g of a)g.type="file";n(`คืนค่า input ${a.length} ตัวเป็น type=file`);const f=document.querySelectorAll('input[type="file"]');if(f.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${he})`),!1;let c;if(i&&i.size>0){const g=Array.from(f).filter(h=>!i.has(h));g.length>0?(c=g[g.length-1],n(`เล็งเป้า file input ใหม่ (${g.length} ใหม่, ${f.length} ทั้งหมด)`)):(c=f[f.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${f.length} ตัว`))}else c=f[f.length-1];const s=new DataTransfer;s.items.add(e);try{c.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=c.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(g){n(`กำหนด target.files ล้มเหลว: ${g.message} — ลอง defineProperty`);try{Object.defineProperty(c,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(h){return T(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${h.message}`),!1}}const l=c._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),c.dispatchEvent(new Event("change",{bubbles:!0})),c.dispatchEvent(new Event("input",{bubbles:!0}));try{const g=new DataTransfer;g.items.add(e);const h=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:g});c.dispatchEvent(h),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${he}`),!0}function Me(){let t=0;const e=document.querySelectorAll("img");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.src&&o.offsetParent!==null&&t++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of i){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.offsetParent!==null&&t++}return t}async function Et(t,e){var g;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const i=Wt(t,e);n(`ขนาดไฟล์: ${(i.size/1024).toFixed(1)} KB`);const o=Me();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const a=async(h,_=8e3)=>{const N=Date.now();for(;Date.now()-N<_;){const B=Me();if(B>o)return n(`✅ [${h}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${B}`),!0;await u(500)}return n(`⚠️ [${h}] รูปย่อไม่เพิ่ม (ยังคง ${Me()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const f=Yt();if(!f)return T("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const s=jt();let l=Xt();const d=new MutationObserver(h=>{for(const _ of h)for(const N of _.addedNodes)if(N instanceof HTMLInputElement&&N.type==="file"&&(N.type="text",l.push({input:N,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),N instanceof HTMLElement){const B=N.querySelectorAll('input[type="file"]');for(const k of B)k.type="text",l.push({input:k,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{f.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await u(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let h=!1;const _=Date.now();for(;!h&&Date.now()-_<5e3;){const B=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const k of B){if(k===f)continue;const r=k.querySelectorAll("i");for(const C of r){const y=((g=C.textContent)==null?void 0:g.trim())||"";if((y==="upload"||y==="upload_file")&&!Array.from(k.querySelectorAll("i")).map(M=>{var P;return(P=M.textContent)==null?void 0:P.trim()}).includes("drive_folder_upload")){k.click(),h=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${y}) ✅`);break}}if(h)break}if(!h)for(const k of B){if(k===f)continue;const r=k.childNodes.length<=5?(k.textContent||"").trim():"";if(r.length>0&&r.length<40){const C=r.toLowerCase();if(C==="upload"||C==="อัปโหลด"||C==="อัพโหลด"||C.includes("upload image")||C.includes("upload photo")||C.includes("อัปโหลดรูปภาพ")||C.includes("อัพโหลดรูปภาพ")||C.includes("from computer")||C.includes("จากคอมพิวเตอร์")){k.click(),h=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${r}") ✅`);break}}}h||await u(500)}return h?(await u(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Kt(l,i,c)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await a("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(T(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(T("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const h of l)h.input.type!=="file"&&(h.input.type="file")}}async function Qt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const i=document.querySelectorAll("button");let o=null;for(const y of i){const D=y.textContent||"";if((D.includes("Nano Banana")||D.includes("Imagen")||D.includes("วิดีโอ")||D.includes("รูปภาพ")||D.includes("Image")||D.includes("Video"))&&y.getBoundingClientRect().bottom>window.innerHeight*.7){o=y,n(`พบปุ่มตั้งค่าจากข้อความ: "${D.substring(0,30).trim()}"`);break}}if(!o)for(const y of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const D=Pe(y);for(const M of D)if(M.getBoundingClientRect().bottom>window.innerHeight*.7){o=M,n(`พบปุ่มตั้งค่าจากไอคอน: ${y}`);break}if(o)break}if(!o)return T("ไม่พบปุ่มตั้งค่า"),!1;const a=o.getBoundingClientRect(),f=a.left+a.width/2,c=a.top+a.height/2,s={bubbles:!0,cancelable:!0,clientX:f,clientY:c,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await u(1500);let l=!1,d=null;const g=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const y of g){const D=y.getAttribute("aria-controls")||"",M=y.id||"";if(D.toUpperCase().includes("IMAGE")||M.toUpperCase().includes("IMAGE")){d=y,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${D})`);break}}if(!d)for(const y of document.querySelectorAll('[role="tab"]')){const D=y.id||"";if(D.toUpperCase().includes("TRIGGER-IMAGE")){d=y,n(`พบแท็บ Image ผ่าน id: ${D}`);break}}if(!d)for(const y of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const D=(y.textContent||"").trim();if((D==="Image"||D.endsWith("Image")||D==="รูปภาพ"||D==="ภาพ")&&!D.includes("Video")&&!D.includes("วิดีโอ")){d=y,n(`พบแท็บ Image ผ่านข้อความ: "${D}"`);break}}if(d){const y=d.getAttribute("data-state")||"",D=d.getAttribute("aria-selected")||"";if(y==="active"||D==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const M=d.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",P)),await u(80),d.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",P)),d.dispatchEvent(new MouseEvent("click",P)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const h=t==="horizontal"?"LANDSCAPE":"PORTRAIT",_=t==="horizontal"?"แนวนอน":"แนวตั้ง";let N=!1;const B=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], button[role="tab"]');for(const y of B){const D=(y.id||"").toUpperCase(),M=(y.getAttribute("aria-controls")||"").toUpperCase();if(D.includes(h)||M.includes(h)){const P=y.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:P.left+P.width/2,clientY:P.top+P.height/2,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",w)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",w)),y.dispatchEvent(new MouseEvent("click",w)),n(`✅ เลือกทิศทางผ่าน ID: ${h}`),N=!0,await u(400);break}}if(!N)for(const y of document.querySelectorAll("button, [role='tab'], [role='option']")){const D=(y.textContent||"").trim();if(D.includes(_)||D.toLowerCase().includes(t==="horizontal"?"landscape":"portrait")){const M=y.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",P)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",P)),y.dispatchEvent(new MouseEvent("click",P)),n(`✅ เลือกทิศทางผ่าน Text: ${_}`),N=!0,await u(400);break}}const k=String(e),r=`x${e}`;let C=!1;for(const y of document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], button[role="tab"]')){const D=(y.id||"").toUpperCase(),M=(y.getAttribute("aria-controls")||"").toUpperCase(),P=(y.textContent||"").trim();if(D.includes(`TRIGGER-${k}`)||M.includes(`CONTENT-${k}`)||P===r){const w=y.getBoundingClientRect(),p={bubbles:!0,cancelable:!0,clientX:w.left+w.width/2,clientY:w.top+w.height/2,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",p)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",p)),y.dispatchEvent(new MouseEvent("click",p)),n(`✅ เลือกจำนวนผ่าน ID/Text: ${r}`),C=!0,await u(400);break}}if(!C)for(const y of document.querySelectorAll("button, [role='tab'], [role='option']")){const D=(y.textContent||"").trim();if(D===r||D.includes(r)){const M=y.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",P)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",P)),y.dispatchEvent(new MouseEvent("click",P)),n(`✅ เลือกจำนวนผ่าน Text (fallback): ${r}`),C=!0,await u(400);break}}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function Jt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let i=null;const o=document.querySelectorAll("button");for(const h of o){const _=(h.textContent||"").trim();if(_.includes("Veo 3.1")&&_.includes("arrow_drop_down")){i=h,n(`พบปุ่ม Veo dropdown: "${_.substring(0,40).trim()}"`);break}}if(!i){for(const h of o)if(h.getAttribute("aria-haspopup")==="menu"){const _=(h.textContent||"").trim();if(_.includes("Veo")){i=h,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${_.substring(0,40).trim()}"`);break}}}if(!i)for(const h of o){const _=(h.textContent||"").trim();if(_.includes("Veo 3.1")&&h.getBoundingClientRect().bottom>window.innerHeight*.7){i=h,n(`พบปุ่ม Veo dropdown (bottom area): "${_.substring(0,40).trim()}"`);break}}if(!i){let h="ไม่ทราบ";for(const _ of o){const N=(_.textContent||"").replace(/\s+/g," ").trim();if(N.includes("Veo 3.1")&&_.getBoundingClientRect().width>0){N.includes("Quality")?h="Veo 3.1 - Quality":N.includes("Fast")?h="Veo 3.1 - Fast":h=N.substring(0,30);break}}return T(`ไม่พบปุ่ม Veo quality dropdown — ค่าปัจจุบันบนหน้าจอ: ${h}`),!1}if((i.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const f=i.getBoundingClientRect(),c=f.left+f.width/2,s=f.top+f.height/2,l={bubbles:!0,cancelable:!0,clientX:c,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",l)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",l)),i.dispatchEvent(new MouseEvent("click",l)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let d=!1;const g=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const h of g){const _=h.querySelectorAll("span");for(const N of _)if((N.textContent||"").trim()===e){const k=h.getBoundingClientRect();if(k.width>0&&k.height>0){const r=k.left+k.width/2,C=k.top+k.height/2,y={bubbles:!0,cancelable:!0,clientX:r,clientY:C,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",y)),await u(80),h.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",y)),h.dispatchEvent(new MouseEvent("click",y)),n(`✅ เลือก "${e}" สำเร็จ`),d=!0;break}}if(d)break;if(!d){const N=(h.textContent||"").trim();if(N.includes(e)&&!N.includes("arrow_drop_down")){const B=h.getBoundingClientRect();if(B.width>0&&B.height>0){const k=B.left+B.width/2,r=B.top+B.height/2,C={bubbles:!0,cancelable:!0,clientX:k,clientY:r,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",C)),await u(80),h.dispatchEvent(new PointerEvent("pointerup",{...C,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",C)),h.dispatchEvent(new MouseEvent("click",C)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),d=!0;break}}}}return d?(await u(600),!0):(T(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),!1)}async function Zt(t){var y,D,M,P;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,i=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=i?i[1]:"unknown",a=We?"macOS":Ye?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",f=We?((D=(y=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:y[1])==null?void 0:D.replace(/_/g,"."))||"":Ye&&((M=e.match(/Windows NT ([0-9.]+)/))==null?void 0:M[1])||"",c=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${f} | Chrome ${o}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${s} | แพลตฟอร์ม: ${he}`),n("══════════════════════════════════════════");try{Ne(t.theme)}catch{}try{qe()}catch(w){console.warn("Overlay show error:",w)}const l=[],d=[];try{S("settings","active");const w=t.orientation||"horizontal",p=t.outputCount||1,m=await Qt(w,p);l.push(m?"✅ Settings":"⚠️ Settings"),S("settings",m?"done":"error")}catch(w){T(`ตั้งค่าผิดพลาด: ${w.message}`),l.push("⚠️ Settings"),S("settings","error")}try{const w=t.veoQuality||"fast",p=w==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";await Jt(w)?(l.push(`✅ ${p}`),n(`✅ Veo quality ที่ใช้: ${p}`)):(l.push("⚠️ Veo quality"),T(`ไม่สามารถเลือก ${p} ได้ — ใช้ค่าเดิมที่แสดงบนหน้าจอ`))}catch(w){T(`Veo quality error: ${w.message}`),l.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const g=()=>{const w=document.querySelectorAll("span, small, label");for(const p of w){if(p.closest("#netflow-engine-overlay"))continue;const m=(p.textContent||"").trim();if(m.length>5||!/^\d{1,3}%$/.test(m))continue;if(m==="100%")return null;const $=p.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<80&&$.height<40&&$.top>window.innerHeight*.5&&$.top<window.innerHeight)return m}return null},h=async w=>{n(`รอการอัพโหลด ${w} เสร็จ...`),await u(2e3);const p=Date.now(),m=6e4;let $="",L=Date.now();const F=15e3;for(;Date.now()-p<m;){const E=g();if(E){if(E!==$)$=E,L=Date.now();else if(Date.now()-L>F){n(`✅ อัพโหลด ${w} — % ค้างที่ ${E} นาน ${F/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}n(`กำลังอัพโหลด: ${E} — รอ...`),await u(1500)}else{n(`✅ อัพโหลด ${w} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}T(`⚠️ อัพโหลด ${w} หมดเวลาหลัง ${m/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){S("upload-char","active");try{const w=await Et(t.characterImage,"character.png");l.push(w?"✅ ตัวละคร":"⚠️ ตัวละคร"),w||d.push("character upload failed"),S("upload-char",w?"done":"error")}catch(w){T(`อัพโหลดตัวละครผิดพลาด: ${w.message}`),l.push("❌ ตัวละคร"),d.push("character upload error"),S("upload-char","error")}await h("character")}else me("upload-char");if(t.productImage){S("upload-prod","active");try{const w=await Et(t.productImage,"product.png");l.push(w?"✅ สินค้า":"⚠️ สินค้า"),w||d.push("product upload failed"),S("upload-prod",w?"done":"error")}catch(w){T(`อัพโหลดสินค้าผิดพลาด: ${w.message}`),l.push("❌ สินค้า"),d.push("product upload error"),S("upload-prod","error")}await h("product")}else me("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const _=g();_&&(n(`⚠️ อัพโหลดยังแสดง ${_} — รอเพิ่มเติม...`),await h("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const N=(t.characterImage?1:0)+(t.productImage?1:0);if(N>0){let w=Me();w<N&&(n(`⏳ เห็นรูปย่อแค่ ${w}/${N} — รอ 3 วินาที...`),await u(3e3),w=Me()),w>=N?n(`✅ ยืนยันรูปย่ออ้างอิง: ${w}/${N}`):T(`⚠️ คาดว่าจะมี ${N} รูปย่อ แต่พบ ${w} — ดำเนินการต่อ`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),S("img-prompt","active"),await u(1e3);const B=$t();B?(await De(B,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),S("img-prompt","done")):(T("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),d.push("prompt input not found"),S("img-prompt","error")),await u(800);const k=new Set;document.querySelectorAll("img").forEach(w=>{w.src&&k.add(w.src)}),n(`บันทึกรูปเดิม: ${k.size} รูปก่อน Generate`),n("=== ขั้น 3: รอ 5 วินาทีก่อนคลิก Generate → ==="),S("img-generate","active"),await u(5e3);const r=yt();if(r){const w=r.getBoundingClientRect(),p=w.left+w.width/2,m=w.top+w.height/2,$={bubbles:!0,cancelable:!0,clientX:p,clientY:m,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",$)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",$)),r.dispatchEvent(new MouseEvent("click",$)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await u(500),r.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",$)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",$)),r.dispatchEvent(new MouseEvent("click",$)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),S("img-generate","done")}else T("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),d.push("generate button not found"),S("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),S("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const w=()=>{const F=document.querySelectorAll("div, span, p, label, strong, small");for(const E of F){if(E.closest("#netflow-engine-overlay"))continue;const A=(E.textContent||"").trim();if(A.length>10)continue;const b=A.match(/(\d{1,3})\s*%/);if(!b)continue;const x=parseInt(b[1],10);if(x<1||x>100)continue;const v=E.getBoundingClientRect();if(!(v.width===0||v.width>150)&&!(v.top<0||v.top>window.innerHeight))return x}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let p=null,m=-1,$=0;const L=Date.now();for(;!p&&Date.now()-L<18e4;){const F=document.querySelectorAll("img");for(const E of F){if(k.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;const b=E.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const x=E.closest("div");if(x){p=x,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...`);break}}}if(!p)for(const E of F){if(k.has(E.src))continue;const A=E.closest("div"),b=(A==null?void 0:A.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg"))continue;const x=E.getBoundingClientRect();if(x.width>120&&x.height>120&&x.top>0&&x.top<window.innerHeight*.85){const v=E.closest("div");if(v){p=v,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...`);break}}}if(!p){if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=vt();if(E){T(`❌ สร้างรูปล้มเหลว: ${E}`),d.push(`image gen failed: ${E}`),S("img-wait","error");break}const A=w();A!==null?(A!==m&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${A}%`),m=A,S("img-wait","active",A)),$=Date.now()):m>30&&Math.floor((Date.now()-$)/1e3)>=3&&n(`🖼️ % หายที่ ${m}% — รูปน่าจะเสร็จแล้ว`),await u(3e3)}}if(!p)T("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),S("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),S("img-wait","done",100);const F=p.getBoundingClientRect(),E=F.left+F.width/2,A=F.top+F.height/2,b={bubbles:!0,cancelable:!0,clientX:E,clientY:A};p.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseenter",b)),p.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseover",b)),p.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousemove",b)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let x=null;for(const v of["more_vert","more_horiz","more"]){const I=Pe(v);for(const z of I){const R=z.getBoundingClientRect();if(R.top>=F.top-20&&R.top<=F.bottom&&R.right>=F.right-150&&R.right<=F.right+20){x=z;break}}if(x)break}if(!x){const v=document.querySelectorAll("button");for(const I of v){const z=I.getBoundingClientRect();if(z.width<50&&z.height<50&&z.top>=F.top-10&&z.top<=F.top+60&&z.left>=F.right-80){const R=I.querySelectorAll("i");for(const G of R)if((((P=G.textContent)==null?void 0:P.trim())||"").includes("more")){x=I;break}if(x)break;const q=I.getAttribute("aria-label")||"";if(q.includes("เพิ่มเติม")||q.includes("more")){x=I;break}}}}if(!x)T("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const v=x.getBoundingClientRect(),I=v.left+v.width/2,z=v.top+v.height/2,R={bubbles:!0,cancelable:!0,clientX:I,clientY:z,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",R)),await u(80),x.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",R)),x.dispatchEvent(new MouseEvent("click",R)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let q=null;const G=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const V of G){const H=(V.textContent||"").trim();if(H.includes("ทำให้เป็นภาพเคลื่อนไหว")||H.includes("Animate")||H.includes("animate")){q=V;break}}if(!q)T("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const V=q.getBoundingClientRect(),H=V.left+V.width/2,Y=V.top+V.height/2,Z={bubbles:!0,cancelable:!0,clientX:H,clientY:Y,button:0};q.dispatchEvent(new PointerEvent("pointerdown",{...Z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mousedown",Z)),await u(80),q.dispatchEvent(new PointerEvent("pointerup",{...Z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mouseup",Z)),q.dispatchEvent(new MouseEvent("click",Z)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),S("animate","done"),await u(3e3)}}}}catch(w){T(`ขั้น 4 ผิดพลาด: ${w.message}`),l.push("⚠️ Animate")}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),S("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let w=!1;const p=document.querySelectorAll("button, span, div");for(const L of p){const F=(L.textContent||"").trim(),E=L.getBoundingClientRect();if((F==="วิดีโอ"||F==="Video"||F.includes("วิดีโอ"))&&E.bottom>window.innerHeight*.7){w=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}w||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await u(1e3);const m=$t();m?(await De(m,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),S("vid-prompt","done")):(T("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),d.push("video prompt input not found"),S("vid-prompt","error")),await u(1e3),S("vid-generate","active");const $=yt();if($){const L=$.getBoundingClientRect(),F=L.left+L.width/2,E=L.top+L.height/2,A={bubbles:!0,cancelable:!0,clientX:F,clientY:E,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",A)),await u(80),$.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",A)),$.dispatchEvent(new MouseEvent("click",A)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),S("vid-generate","done"),await u(500),$.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",A)),await u(80),$.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",A)),$.dispatchEvent(new MouseEvent("click",A)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else T("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),d.push("video generate button not found"),S("vid-generate","error")}catch(w){T(`ขั้น 5 ผิดพลาด: ${w.message}`),l.push("⚠️ Video Gen"),d.push(`video gen error: ${w.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),me("animate"),me("vid-prompt"),me("vid-generate"),me("vid-wait");if(t.videoPrompt){S("vid-wait","active");const w=t.sceneCount||1,p=t.videoScenePrompts||[t.videoPrompt];if(w>1)try{Vt(w)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${w>1?`ต่อ ${w} ฉาก`:"ดาวน์โหลด"} ===`);let m=null;const $=()=>{if(m&&m.isConnected&&!m.closest("#netflow-engine-overlay")){const b=(m.textContent||"").trim();if(b.length<=15){const x=b.match(/(\d{1,3})\s*%/);if(x){const v=parseInt(x[1],10);if(v>=1&&v<=100)return v}}m=null}const E=document.querySelectorAll('[role="progressbar"]');for(const b of E){if(b.closest("#netflow-engine-overlay"))continue;const x=b.getAttribute("aria-valuenow");if(x){const v=parseFloat(x);if(v>=1&&v<=100)return v}}const A=document.querySelectorAll("div, span, p, label, strong, small");for(const b of A){if(b.closest("#netflow-engine-overlay"))continue;const x=(b.textContent||"").trim();if(x.length>15||x.length<2)continue;const v=x.match(/(\d{1,3})\s*%/);if(!v)continue;const I=parseInt(v[1],10);if(I<1||I>100)continue;const z=b.getBoundingClientRect();if(!(z.width===0||z.width>150)&&!(z.top<0||z.top>window.innerHeight))return m=b,I}return null},L=async(E=6e5)=>{n("รอการสร้างวิดีโอ..."),S("vid-wait","active"),await u(5e3);const A=()=>{const O=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const U of O){if(U.closest("#netflow-engine-overlay"))continue;const ee=(U.textContent||"").trim();if(ee.includes("%")&&ee.length<15){const ae=U.tagName.toLowerCase(),re=U.className&&typeof U.className=="string"?U.className.split(/\s+/).slice(0,2).join(" "):"",Fe=U.getBoundingClientRect();if(n(`  🔍 "${ee}" ใน <${ae}.${re}> ที่ (${Fe.left.toFixed(0)},${Fe.top.toFixed(0)}) w=${Fe.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},b=je();n(b?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),A();const x=Date.now();let v=-1,I=0,z=!1,R=0;for(;Date.now()-x<E;){R++;const O=$();if(O!==null){if(O!==v&&(n(`ความคืบหน้าวิดีโอ: ${O}%`),v=O,S("vid-wait","active",O)),I=Date.now(),O>=100){n("✅ ตรวจพบ 100%!"),z=!0;break}}else if(v>0){const U=Math.floor((Date.now()-I)/1e3);if(U>=5){n(`✅ % หายไปที่ ${v}% (หาย ${U} วินาที) — วิดีโอเสร็จ!`),z=!0;break}n(`⏳ % หายที่ ${v}% — ยืนยันใน ${5-U} วินาที...`)}else{const U=Math.floor((Date.now()-x)/1e3);U%15<3&&n(`⏳ รอ... (${U} วินาที) ไม่พบ %`)}const X=Math.floor((Date.now()-x)/1e3);if(!z&&(v>0||X>=30)&&R%5===0){if(je(!0)&&!b){n(`✅ การ์ดวิดีโอปรากฏขึ้น${v>0?`ที่ ${v}%`:" (ไม่พบ %)"} — วิดีโอเสร็จ!`),z=!0;break}if(v<=0){const ee=document.querySelectorAll("video");for(const ae of ee){const re=ae.getBoundingClientRect();if(re.width>200&&re.height>100&&ae.readyState>=2&&ae.src){n("✅ พบ <video> พร้อมเล่น (ไม่พบ %) — วิดีโอเสร็จ!"),z=!0;break}}if(z)break;if(X>=90){n(`✅ ไม่พบ % มานาน ${X} วินาที — ถือว่าเสร็จ`),z=!0;break}}}if(fe())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(v<1&&R%5===0){const U=vt();if(U)return T(`❌ สร้างวิดีโอล้มเหลว: ${U}`),null}await u(3e3)}const q=je();if(!q)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),S("vid-wait","error"),null;const G=q;z?(S("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const V=G.getBoundingClientRect();let H=V.left+V.width/2,Y=V.top+V.height/2,Z=G;const ue=G.querySelector("video, img, canvas");if(ue){const O=ue.getBoundingClientRect();O.width>50&&O.height>50&&(H=O.left+O.width/2,Y=O.top+O.height/2,Z=ue,n(`🎯 พบรูปย่อ <${ue.tagName.toLowerCase()}> ในการ์ดที่ (${H.toFixed(0)},${Y.toFixed(0)}) ${O.width.toFixed(0)}x${O.height.toFixed(0)}`))}else Y=V.top+V.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${H.toFixed(0)},${Y.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${H.toFixed(0)}, ${Y.toFixed(0)})...`),qt(Z);for(let O=0;O<8;O++){const X={bubbles:!0,cancelable:!0,clientX:H+O%2,clientY:Y};Z.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousemove",X)),await u(500)}try{chrome.storage.local.set({[J]:{timestamp:Date.now(),action:"mute_video",sceneCount:w,scenePrompts:p,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${w} ฉาก, ${p.length} prompts, theme: ${t.theme})`)}catch(O){n(`⚠️ ไม่สามารถบันทึก pending action: ${O.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(Z),n("✅ คลิกการ์ดวิดีโอเสร็จ"),G},F=async E=>{const A=E.getBoundingClientRect(),b=A.left+A.width/2,x=A.top+A.height/2,v={bubbles:!0,cancelable:!0,clientX:b,clientY:x,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",v)),await u(80),E.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",v)),E.dispatchEvent(new MouseEvent("click",v)),await u(50),E.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await L())T("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),S("vid-wait","error");else{l.push("✅ Video Complete"),S("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const A=await new Promise(b=>{chrome.storage.local.get(J,x=>{if(chrome.runtime.lastError){b(null);return}b((x==null?void 0:x[J])||null)})});A&&!A._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(J),A.action==="mute_video"?await kt(A.sceneCount||1,A.scenePrompts||[],A.theme):A.action==="wait_scene_gen_and_download"&&await Ct(A.sceneCount||2,A.currentScene||2,A.theme,A.scenePrompts||[]))}}catch(E){T(`ขั้น 6 ผิดพลาด: ${E.message}`),l.push("⚠️ Step6"),d.push(`step 6: ${E.message}`)}}const C=d.length===0;try{ke(C?5e3:8e3)}catch(w){console.warn("Overlay complete error:",w)}return{success:C,message:C?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${d.join(", ")}`,step:C?"done":"partial"}}async function kt(t,e=[],i){var D;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{i&&Ne(i)}catch{}try{qe(t)}catch(M){n(`⚠️ showOverlay error: ${M.message}`)}try{const M=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const P of M)S(P,"done");t>=2&&S("scene2-prompt","active")}catch(M){n(`⚠️ overlay restore error: ${M.message}`)}await u(1500);const o=(()=>{for(const M of document.querySelectorAll("button")){const P=M.querySelectorAll("i");for(const p of P){const m=(p.textContent||"").trim();if(m==="volume_up"||m==="volume_off"||m==="volume_mute"){const $=M.getBoundingClientRect();if($.width>0&&$.height>0)return M}}const w=(M.getAttribute("aria-label")||"").toLowerCase();if(w.includes("mute")||w.includes("ปิดเสียง")){const p=M.getBoundingClientRect();if(p.width>0&&p.height>0)return M}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");const a=await Ae();if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let b=2;b<=t;b++){const x=e[b-1];if(!x){T(`ไม่พบ prompt สำหรับฉากที่ ${b}`);continue}n(`── ฉากที่ ${b}/${t}: วาง prompt + generate ──`);let v=null;const I=Date.now();for(;!v&&Date.now()-I<1e4;){const O=document.querySelectorAll("[data-slate-editor='true']");if(O.length>0&&(v=O[O.length-1]),!v){const X=document.querySelectorAll("[role='textbox'][contenteditable='true']");X.length>0&&(v=X[X.length-1])}v||await u(1e3)}if(!v){T("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${v.tagName.toLowerCase()}> ${v.className.substring(0,40)}`),await De(v,x),n(`วาง prompt ฉาก ${b} (${x.length} ตัวอักษร) ✅`);try{S(`scene${b}-prompt`,"done"),S(`scene${b}-gen`,"active")}catch{}await u(1e3);const z=v.getBoundingClientRect();let R=null,q=1/0;for(const O of document.querySelectorAll("button")){if(O.disabled)continue;const X=O.querySelectorAll("i");let U=!1;for(const re of X)if((re.textContent||"").trim()==="arrow_forward"){U=!0;break}if(!U)continue;const ee=O.getBoundingClientRect();if(ee.width<=0||ee.height<=0)continue;const ae=Math.abs(ee.top-z.top)+Math.abs(ee.right-z.right);ae<q&&(q=ae,R=O)}if(!R)for(const O of document.querySelectorAll("button")){const X=O.querySelectorAll("i");for(const U of X)if((U.textContent||"").trim()==="arrow_forward"){const ee=O.getBoundingClientRect();if(ee.width>0&&ee.height>0){R=O;break}}if(R)break}if(!R){T("ไม่พบปุ่ม Generate/Send");return}await new Promise(O=>{chrome.storage.local.set({[J]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:b,scenePrompts:e}},()=>O())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${b}/${t})`),await te(R),n(`คลิก Generate ฉาก ${b} ✅`);try{S(`scene${b}-gen`,"done"),S(`scene${b}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${b} gen เสร็จ ──`),await u(5e3);let G=0,V=0;const H=Date.now(),Y=6e5,Z=5e3;let ue=!1;for(;Date.now()-H<Y;){let O=null;const X=document.querySelectorAll("div, span, p, label, strong, small");for(const U of X){if(U.closest("#netflow-engine-overlay"))continue;const ae=(U.textContent||"").trim().match(/^(\d{1,3})%$/);if(ae){const re=U.getBoundingClientRect();if(re.width>0&&re.height>0&&re.width<120&&re.height<60){O=parseInt(ae[1],10);break}}}if(O!==null){if(O!==G){n(`🎬 ฉาก ${b} ความคืบหน้า: ${O}%`),G=O;try{S(`scene${b}-wait`,"active",O)}catch{}}V=0}else if(G>0){if(V===0)V=Date.now(),n(`🔍 ฉาก ${b}: % หายไป (จาก ${G}%) — กำลังยืนยัน...`);else if(Date.now()-V>=Z){n(`✅ ฉาก ${b}: % หายไป ${Z/1e3} วินาที — เจนเสร็จ!`),ue=!0;break}}if(fe()){n("⛔ ผู้ใช้สั่งหยุด");return}await u(2e3)}ue||T(`ฉาก ${b} หมดเวลา`),n(`✅ ฉาก ${b} เสร็จแล้ว`);try{S(`scene${b}-wait`,"done",100)}catch{}chrome.storage.local.remove(J),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{S("download","active")}catch{}await u(2e3);const M=Date.now();let P=null;const w=Date.now();for(;!P&&Date.now()-w<1e4;){for(const b of document.querySelectorAll("button")){const x=b.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const v=b.getBoundingClientRect();if(v.width>0&&v.height>0){P=b;break}}}P||await u(1e3)}if(!P){T("ไม่พบปุ่มดาวน์โหลด");return}await te(P),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await u(1500);let p=null;for(let b=0;b<3&&!p;b++){b>0&&n(`🔄 ลองหา 720p ครั้งที่ ${b+1}...`);let x=null;const v=Date.now();for(;!x&&Date.now()-v<5e3;){for(const G of document.querySelectorAll("[role='menuitem']"))if((G.textContent||"").trim().includes("Full Video")&&G.querySelector("i")){const H=G.getBoundingClientRect();if(H.width>0&&H.height>0){x=G;break}}x||await u(500)}if(!x){T("ไม่พบ Full Video");continue}const I=x.getBoundingClientRect(),z=I.left+I.width/2,R=I.top+I.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:z,clientY:R})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:z,clientY:R})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:z,clientY:R})),await te(x),n("คลิก/hover Full Video ✅"),await u(2e3);const q=Date.now();for(;!p&&Date.now()-q<8e3;){for(const G of document.querySelectorAll("button[role='menuitem']")){const V=G.querySelectorAll("span");for(const H of V)if((H.textContent||"").trim()==="720p"){const Y=G.getBoundingClientRect();if(Y.width>0&&Y.height>0){p=G;break}}if(p)break}p||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:z,clientY:R})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:z+20,clientY:R}))),await u(500))}}if(!p){T("ไม่พบ 720p");return}await te(p),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const m=Date.now();let $=!1,L=!1;for(;Date.now()-m<3e5;){for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=(b.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),$=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(L||(L=!0,n("⏳ กำลังดาวน์โหลด...")))}if($)break;if(L){let b=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){b=!0;break}if(!b){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),$=!0;break}}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await u(2e3)}if(!$){T("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let F=!1,E=null;const A=Date.now();for(;Date.now()-A<6e4&&!F;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:M},x=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),F=!0,E=x.downloadUrl||null):n(`ดาวน์โหลดยังไม่พร้อม: ${x==null?void 0:x.message}`),b()})})}catch(b){T(`ตรวจสอบผิดพลาด: ${b.message}`)}F||await u(3e3)}F||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{S("open","done"),ke(8e3)}catch{}if(n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),E&&E.startsWith("http"))n(`[FullVideo] พบ download URL — re-cache วิดีโอเต็ม: ${E.substring(0,80)}...`),await new Promise(b=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:E},x=>{chrome.runtime.lastError?T(`[FullVideo] PRE_FETCH error: ${chrome.runtime.lastError.message}`):x!=null&&x.success?n(`[FullVideo] ✅ Full video cached: ${((x.size||0)/1024/1024).toFixed(1)} MB`):T(`[FullVideo] PRE_FETCH failed: ${x==null?void 0:x.error}`),b()})}),Ce(E);else{n("[FullVideo] ไม่พบ download URL — fallback ใช้ video จากหน้า");const b=await Ae();Ce(b||a)}Ue(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await u(2e3);const f=(M,P="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const w of document.querySelectorAll(P)){const p=(w.textContent||"").trim();if(p.includes(M)&&p.length<100){const m=w.getBoundingClientRect();if(m.width>0&&m.height>0&&m.top>=0)return w}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const s=Date.now();for(;!c&&Date.now()-s<1e4;){for(const M of document.querySelectorAll("button, [role='button']")){const P=(M.textContent||"").trim(),w=P.toLowerCase();if((w.includes("download")||w.includes("ดาวน์โหลด"))&&P.length<80){const p=M.getBoundingClientRect();if(p.width>0&&p.height>0){c=M;break}}}if(!c)for(const M of document.querySelectorAll("button")){const P=(M.getAttribute("aria-label")||"").toLowerCase();if(P.includes("download")||P.includes("ดาวน์")){const w=M.getBoundingClientRect();if(w.width>0&&w.height>0){c=M;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!c){T("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await te(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(1500);const l=Date.now();let d=null;const g=Date.now();for(;!d&&Date.now()-g<5e3;)d=f("1080p"),d||(n("รอ 1080p..."),await u(500));if(!d){T("ไม่พบ 1080p");return}await te(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const h=Date.now();let _=!1,N=!1,B=0;const k=3e3;for(;Date.now()-h<3e5;){const P=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(P.includes("upscaling complete")||P.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),_=!0;break}for(const p of document.querySelectorAll("div, span, p")){const m=(p.textContent||"").trim().toLowerCase();if(m.length<60&&(m.includes("upscaling complete")||m.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(D=p.textContent)==null?void 0:D.trim()}")`),_=!0;break}}if(_)break;if(P.includes("upscaling your video")||P.includes("กำลังอัปสเกล")){N=!0,B=0;const p=Math.floor((Date.now()-h)/1e3);n(`⏳ กำลังอัปสเกล... (${p} วินาที)`)}else if(N){if(B===0)B=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-B>=k){n(`✅ ข้อความ Upscaling หายไป ${k/1e3} วินาที — เสร็จ!`),_=!0;break}}else{const p=Math.floor((Date.now()-h)/1e3);p%10<3&&n(`⏳ รอ Upscale... (${p} วินาที)`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!_){T("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let r=!1;const C=Date.now();for(;Date.now()-C<6e4&&!r;){try{await new Promise(M=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},P=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):P!=null&&P.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${P.message}`),r=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${P==null?void 0:P.message}`),M()})})}catch(M){T(`ตรวจสอบผิดพลาด: ${M.message}`)}r||await u(3e3)}r||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══");const y=await Ae();Ce(y||a),Ue(2e3)}async function Ct(t=2,e=2,i,o=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{i&&Ne(i)}catch{}try{qe(t)}catch(p){n(`⚠️ showOverlay error: ${p.message}`)}try{const p=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let m=2;m<=e;m++)p.push(`scene${m}-prompt`,`scene${m}-gen`),m<e&&p.push(`scene${m}-wait`);for(const m of p)S(m,"done");S(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${p.length} steps done (scene ${e}/${t} navigate)`)}catch(p){n(`⚠️ overlay restore error: ${p.message}`)}await u(2e3);const a=(()=>{for(const p of document.querySelectorAll("button")){const m=p.querySelectorAll("i");for(const $ of m){const L=($.textContent||"").trim();if(L==="volume_up"||L==="volume_off"||L==="volume_mute"){const F=p.getBoundingClientRect();if(F.width>0&&F.height>0)return p}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let f=0,c=0;const s=Date.now(),l=6e5,d=5e3;let g=!1,h=0,_=null;for(;Date.now()-s<l;){let p=null;if(_&&_.isConnected&&!_.closest("#netflow-engine-overlay")){const $=(_.textContent||"").trim().match(/^(\d{1,3})%$/);$?p=parseInt($[1],10):_=null}if(p===null){const m=document.querySelectorAll('[role="progressbar"]');for(const $ of m){if($.closest("#netflow-engine-overlay"))continue;const L=$.getAttribute("aria-valuenow");if(L){const F=parseFloat(L);if(F>=1&&F<=100){p=F;break}}}}if(p===null){const m=document.querySelectorAll("span, small, label, p");for(const $ of m){if($.closest("#netflow-engine-overlay"))continue;const F=($.textContent||"").trim().match(/^(\d{1,3})%$/);if(F){const E=$.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){p=parseInt(F[1],10),_=$;break}}}}if(p!==null){if(h=0,p!==f){n(`🎬 scene ${e} ความคืบหน้า: ${p}%`),f=p;try{S(`scene${e}-wait`,"active",p)}catch{}}c=0}else if(f>0){if(c===0)c=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${f}%) — กำลังยืนยัน...`);else if(Date.now()-c>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),g=!0;break}}else if(h++,h>=15){const m=document.querySelectorAll("video");let $=!1;for(const L of m)if(L.readyState>=2&&!L.paused&&L.getBoundingClientRect().width>200){$=!0;break}if($){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),g=!0;break}if(h>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),g=!0;break}}await u(2e3)}g||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{S(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&o.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let p=e+1;p<=t;p++){const m=o[p-1];if(!m){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${p} — ข้าม`);continue}n(`── ฉากที่ ${p}/${t}: วาง prompt + generate (pending recovery) ──`);let $=null;const L=Date.now();for(;!$&&Date.now()-L<1e4;){const R=document.querySelectorAll("[data-slate-editor='true']");if(R.length>0&&($=R[R.length-1]),!$){const q=document.querySelectorAll("[role='textbox'][contenteditable='true']");q.length>0&&($=q[q.length-1])}$||await u(1e3)}if(!$){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${p}`);break}await De($,m),n(`วาง prompt ฉาก ${p} (${m.length} ตัวอักษร) ✅`);try{S(`scene${p}-prompt`,"done"),S(`scene${p}-gen`,"active")}catch{}await u(1e3);const F=$.getBoundingClientRect();let E=null,A=1/0;for(const R of document.querySelectorAll("button")){if(R.disabled)continue;const q=R.querySelectorAll("i");let G=!1;for(const Y of q)if((Y.textContent||"").trim()==="arrow_forward"){G=!0;break}if(!G)continue;const V=R.getBoundingClientRect();if(V.width<=0||V.height<=0)continue;const H=Math.abs(V.top-F.top)+Math.abs(V.right-F.right);H<A&&(A=H,E=R)}if(!E)for(const R of document.querySelectorAll("button")){const q=R.querySelectorAll("i");for(const G of q)if((G.textContent||"").trim()==="arrow_forward"){const V=R.getBoundingClientRect();if(V.width>0&&V.height>0){E=R;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${p}`);break}await new Promise(R=>{chrome.storage.local.set({[J]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:p,scenePrompts:o}},()=>R())}),await te(E),n(`คลิก Generate ฉาก ${p} ✅`);try{S(`scene${p}-gen`,"done"),S(`scene${p}-wait`,"active")}catch{}await u(5e3);let b=0,x=0;const v=Date.now();let I=!1,z=0;for(;Date.now()-v<6e5;){let R=null;const q=document.querySelectorAll("div, span, p, label, strong, small");for(const G of q){if(G.closest("#netflow-engine-overlay"))continue;const H=(G.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const Y=G.getBoundingClientRect();if(Y.width>0&&Y.height>0&&Y.width<120&&Y.height<60){R=parseInt(H[1],10);break}}}if(R!==null){if(z=0,R!==b){n(`🎬 ฉาก ${p} ความคืบหน้า: ${R}%`),b=R;try{S(`scene${p}-wait`,"active",R)}catch{}}x=0}else if(b>0){if(x===0)x=Date.now();else if(Date.now()-x>=5e3){n(`✅ ฉาก ${p}: เจนเสร็จ!`),I=!0;break}}else if(z++,z>=15){const G=document.querySelectorAll("video");let V=!1;for(const H of G)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){V=!0;break}if(V){n(`✅ ฉาก ${p}: พบวิดีโอเล่นอยู่ — เสร็จ`),I=!0;break}if(z>=30){n(`✅ ฉาก ${p}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),I=!0;break}}await u(2e3)}I||n(`⚠️ ฉาก ${p} หมดเวลา`);try{S(`scene${p}-wait`,"done",100)}catch{}n(`✅ ฉาก ${p} เสร็จแล้ว`),chrome.storage.local.remove(J),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);try{S("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const N=Date.now();let B=null;const k=Date.now();for(;!B&&Date.now()-k<1e4;){for(const p of document.querySelectorAll("button")){const m=p.querySelector("i");if(m&&(m.textContent||"").trim()==="download"){const $=p.getBoundingClientRect();if($.width>0&&$.height>0){B=p;break}}}B||await u(1e3)}if(!B){T("ไม่พบปุ่มดาวน์โหลด");return}await te(B),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await u(1500);let r=null;for(let p=0;p<3&&!r;p++){p>0&&n(`🔄 ลองหา 720p ครั้งที่ ${p+1}...`);let m=null;const $=Date.now();for(;!m&&Date.now()-$<5e3;){for(const b of document.querySelectorAll("[role='menuitem']"))if((b.textContent||"").trim().includes("Full Video")&&b.querySelector("i")){const v=b.getBoundingClientRect();if(v.width>0&&v.height>0){m=b;break}}m||await u(500)}if(!m){T("ไม่พบ Full Video");continue}const L=m.getBoundingClientRect(),F=L.left+L.width/2,E=L.top+L.height/2;m.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:F,clientY:E})),m.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:E})),m.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F,clientY:E})),await te(m),n("คลิก/hover Full Video ✅"),await u(2e3);const A=Date.now();for(;!r&&Date.now()-A<8e3;){for(const b of document.querySelectorAll("button[role='menuitem']")){const x=b.querySelectorAll("span");for(const v of x)if((v.textContent||"").trim()==="720p"){const I=b.getBoundingClientRect();if(I.width>0&&I.height>0){r=b;break}}if(r)break}r||(m.isConnected&&(m.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:E})),m.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F+20,clientY:E}))),await u(500))}}if(!r){T("ไม่พบ 720p");return}await te(r),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const C=Date.now();let y=!1,D=!1;for(;Date.now()-C<3e5;){for(const p of document.querySelectorAll("div[data-title] div, div[data-content] div")){const m=(p.textContent||"").trim();if(m==="Download complete!"||m==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),y=!0;break}(m.includes("Downloading your extended video")||m.includes("กำลังดาวน์โหลด"))&&(D||(D=!0,n("⏳ กำลังดาวน์โหลด...")))}if(y)break;if(D){let p=!1;for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((m.textContent||"").trim().includes("Downloading")){p=!0;break}if(!p){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),y=!0;break}}await u(2e3)}if(!y){T("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let M=!1,P=null;const w=Date.now();for(;Date.now()-w<6e4&&!M;){try{await new Promise(p=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:N},m=>{chrome.runtime.lastError?T(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):m!=null&&m.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${m.message}`),M=!0,P=m.downloadUrl||null):n(`ดาวน์โหลดยังไม่พร้อม: ${m==null?void 0:m.message}`),p()})})}catch(p){T(`ตรวจสอบผิดพลาด: ${p.message}`)}M||await u(3e3)}M||T("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{S("open","done"),ke(8e3)}catch{}if(n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),P&&P.startsWith("http"))n(`[FullVideo] พบ download URL — re-cache วิดีโอเต็ม: ${P.substring(0,80)}...`),await new Promise(p=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:P},m=>{chrome.runtime.lastError?T(`[FullVideo] PRE_FETCH error: ${chrome.runtime.lastError.message}`):m!=null&&m.success?n(`[FullVideo] ✅ Full video cached: ${((m.size||0)/1024/1024).toFixed(1)} MB`):T(`[FullVideo] PRE_FETCH failed: ${m==null?void 0:m.error}`),p()})}),Ce(P);else{n("[FullVideo] ไม่พบ download URL — fallback ใช้ video จากหน้า");const p=await Ae();Ce(p)}Ue(2e3)}async function en(){try{const t=await new Promise(f=>{chrome.storage.local.get(J,c=>{if(chrome.runtime.lastError){f(null);return}f((c==null?void 0:c[J])||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const i=Date.now()-t.timestamp;if(i>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(J);return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=o,await new Promise(f=>{chrome.storage.local.set({[J]:t},()=>f())}),await u(300),!await new Promise(f=>{chrome.storage.local.get(J,c=>{const s=c==null?void 0:c[J];f((s==null?void 0:s._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(J),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(i/1e3)} วินาที)`),t.action==="mute_video"?await kt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ct(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,i)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_RUNNING__?(n("⚠️ GENERATE_IMAGE ถูกเรียกซ้ำ — ข้าม (มี instance ทำงานอยู่แล้ว)"),i({success:!1,message:"Already running"}),!1):(window.__NETFLOW_RUNNING__=!0,window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),i({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Zt(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof Re||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Te("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{bt()}catch{}}else console.error("[Netflow AI] Generate error:",o)}).finally(()=>{window.__NETFLOW_RUNNING__=!1}),!1);if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,window.__NETFLOW_RUNNING__=!1,i({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return i({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return i({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const o=Ut();if(!o){T("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=o.getBoundingClientRect(),f=a.left+a.width/2,c=a.top+a.height/2;n(`การ์ดรูปที่ (${f.toFixed(0)}, ${c.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(f,c);l?(await te(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await te(o),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),en()})();
