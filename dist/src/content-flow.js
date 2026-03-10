(function(){"use strict";const le={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let K=le.green,be=null;function Ne(t){t&&le[t]&&(be=t,K=le[t],Ke(),requestAnimationFrame(()=>ht()))}function Mt(){if(be&&le[be])return le[be];try{const t=localStorage.getItem("netflow_app_theme");if(t&&le[t])return le[t]}catch{}return le.green}let ne=0,oe=255,ie=65;function Ke(){const t=K.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}const Qe='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',Je='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let j=null,Q=null,ce=null,Ze=0,Pe=null,we=null,Se=null,Oe=0,de=!1,se=null,xe=null,ve=null,ye=1,W=[];function ze(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let i=2;i<=t;i++)e.push({stepId:`scene${i}-prompt`,label:`ฉาก ${i} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${i}-gen`,label:`ฉาก ${i} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${i}-wait`,label:`ฉาก ${i} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const pe=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];W=ze(1);function Pt(t){const e=t.rgb,i=t.accentRgb,o=t.doneRgb,a=t.hex,p=t.accentHex,c=t.doneHex,s=(()=>{const E=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!E)return"#4ade80";const r=k=>Math.min(255,k+80);return`#${[1,2,3].map(k=>r(parseInt(E[k],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const E=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!E)return"#4ade80";const r=k=>Math.min(255,k+60);return`#${[1,2,3].map(k=>r(parseInt(E[k],16)).toString(16).padStart(2,"0")).join("")}`})(),d=a.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),g=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,m=d?parseInt(d[1],16)/g:0,_=d?parseInt(d[2],16)/g:1,O=d?parseInt(d[3],16)/g:.25,R=E=>`${Math.round(m*E)}, ${Math.round(_*E)}, ${Math.round(O*E)}`;return`
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

    `}function et(){ce||(ce=document.createElement("style"),ce.id="netflow-overlay-styles",ce.textContent=Pt(K),document.head.appendChild(ce))}function tt(t){t.innerHTML="",W.forEach((e,i)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${e.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${i+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(o)})}function St(){const t=document.getElementById("nf-terminal");if(!t)return;tt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${W.length}`)}function nt(t,e){let s="";for(let _=0;_<20;_++){const O=_/20*Math.PI*2,R=(_+.2)/20*Math.PI*2,E=(_+.5)/20*Math.PI*2,r=(_+.8)/20*Math.PI*2,k=(_+1)/20*Math.PI*2;s+=`${_===0?"M":"L"}${(120+100*Math.cos(O)).toFixed(1)},${(120+100*Math.sin(O)).toFixed(1)} `,s+=`L${(120+100*Math.cos(R)).toFixed(1)},${(120+100*Math.sin(R)).toFixed(1)} `,s+=`L${(120+112*Math.cos(E)).toFixed(1)},${(120+112*Math.sin(E)).toFixed(1)} `,s+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,s+=`L${(120+100*Math.cos(k)).toFixed(1)},${(120+100*Math.sin(k)).toFixed(1)} `}s+="Z";const l=14,d=72,g=62;let m="";for(let _=0;_<l;_++){const O=_/l*Math.PI*2,R=(_+.25)/l*Math.PI*2,E=(_+.75)/l*Math.PI*2,r=(_+1)/l*Math.PI*2;m+=`${_===0?"M":"L"}${(120+g*Math.cos(O)).toFixed(1)},${(120+g*Math.sin(O)).toFixed(1)} `,m+=`L${(120+d*Math.cos(R)).toFixed(1)},${(120+d*Math.sin(R)).toFixed(1)} `,m+=`L${(120+d*Math.cos(E)).toFixed(1)},${(120+d*Math.sin(E)).toFixed(1)} `,m+=`L${(120+g*Math.cos(r)).toFixed(1)},${(120+g*Math.sin(r)).toFixed(1)} `}return m+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <circle cx="120" cy="120" r="${g}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function It(){const t=document.createElement("div");t.id="netflow-engine-overlay",se=document.createElement("canvas"),se.id="nf-matrix-canvas",t.appendChild(se);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let x=1;x<=5;x++){const S=document.createElement("div");S.className=`nf-ambient-orb nf-orb-${x}`,t.appendChild(S)}const i=document.createElement("div");i.className="nf-pat-data",t.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-a",t.appendChild(o);const a=document.createElement("div");a.className="nf-pat-diag-b",t.appendChild(a);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",t.appendChild(l);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const g=document.createElement("div");g.className="nf-pat-wave-h",t.appendChild(g);const m=document.createElement("div");m.className="nf-pat-radar",t.appendChild(m);const _=document.createElement("div");_.className="nf-pat-ripple-1",t.appendChild(_);const O=document.createElement("div");O.className="nf-pat-ripple-2",t.appendChild(O);const R=document.createElement("div");R.className="nf-pat-techscan",t.appendChild(R);const E=document.createElement("div");E.className="nf-center-glow",t.appendChild(E);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const k=document.createElement("div");k.className="nf-crt-scanlines",t.appendChild(k);const v=document.createElement("div");v.className="nf-vignette",t.appendChild(v);for(let x=0;x<3;x++){const S=document.createElement("div");S.className="nf-pulse-ring",t.appendChild(S)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(x=>{const S=document.createElement("div");S.className=`nf-corner-deco ${x}`,t.appendChild(S)});const D=document.createElement("button");D.className="nf-stop-btn",D.innerHTML='<span class="nf-stop-icon"></span> หยุด',D.onclick=()=>{var x;window.__NETFLOW_STOP__=!0;try{_e("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((x=chrome.runtime)!=null&&x.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(D);const M=document.createElement("button");M.className="nf-close-btn",M.textContent="✕ ซ่อน",M.onclick=()=>Ge(),t.appendChild(M);const P=document.createElement("div");P.className="nf-layout";const h=document.createElement("div");h.className="nf-core-monitor",h.id="nf-core-monitor";const f=document.createElement("div");f.className="nf-core-header",f.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${W.length}</div>
    `,h.appendChild(f);const b=document.createElement("div");b.className="nf-terminal",b.id="nf-terminal",tt(b),h.appendChild(b);const $=document.createElement("div");$.className="nf-engine-core",$.id="nf-engine-core";const L=document.createElement("div");L.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(x=>{const S=document.createElement("div");S.className=`nf-frame-corner ${x}`,L.appendChild(S)}),$.appendChild(L);const N="http://www.w3.org/2000/svg",C=document.createElementNS(N,"svg");C.setAttribute("class","nf-engine-waves"),C.setAttribute("viewBox","0 0 560 140"),C.setAttribute("preserveAspectRatio","none"),C.id="nf-engine-waves";for(let x=0;x<4;x++){const S=document.createElementNS(N,"path");S.setAttribute("fill","none"),S.setAttribute("stroke-width",x<2?"1.5":"1"),S.setAttribute("stroke",x<2?`rgba(${K.rgb},${.14+x*.1})`:`rgba(${K.accentRgb},${.1+(x-2)*.08})`),S.setAttribute("data-wave-idx",String(x)),C.appendChild(S)}$.appendChild(C);const T=document.createElement("div");T.className="nf-engine-brand-inner",T.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${nt(K.rgb,K.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${nt(K.rgb,K.accentRgb)}
        </div>
    `,$.appendChild(T);const w=document.createElement("div");w.className="nf-engine-stats",w.id="nf-engine-stats",w.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([x,S,F])=>`<div class="nf-stat-item"><span class="nf-stat-label">${x}</span><span class="nf-stat-val" id="${S}">${F}</span></div>`).join(""),$.appendChild(w),h.appendChild($),P.appendChild(h);const y=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];pe.forEach((x,S)=>{const F=_t(x);F.classList.add(y[S]),F.id=`nf-mod-${x.id}`,P.appendChild(F)}),t.appendChild(P);for(let x=0;x<30;x++){const S=document.createElement("div");S.className="nf-particle",S.style.left=`${5+Math.random()*90}%`,S.style.bottom=`${Math.random()*40}%`,S.style.animationDuration=`${3+Math.random()*5}s`,S.style.animationDelay=`${Math.random()*4}s`;const F=.3+Math.random()*.4,A=.7+Math.random()*.3;S.style.background=`rgba(${Math.floor(ne*A)}, ${Math.floor(oe*A)}, ${Math.floor(ie*A)}, ${F})`,S.style.width=`${1+Math.random()*2}px`,S.style.height=S.style.width,t.appendChild(S)}return t}function _t(t){const e=document.createElement("div");e.className="nf-module";const i=document.createElement("div");i.className="nf-mod-header",i.innerHTML=`
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
        `,e.appendChild(p)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o),e}function Tt(){Ze=Date.now(),Pe=setInterval(()=>{const t=Math.floor((Date.now()-Ze)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),i=String(t%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${e}:${i}`);const a=document.getElementById("nf-stat-elapsed");a&&(a.textContent=`${e}:${i}`)},1e3)}function ot(){Pe&&(clearInterval(Pe),Pe=null)}const At=120,it=160,at=.4;let ge=null,rt=0,st=0,lt=0,$e=[];function Rt(t,e){$e=[];for(let i=0;i<At;i++){const o=Math.random();let a;o<.22?a=0:o<.4?a=1:o<.55?a=2:o<.68?a=3:o<.84?a=4:a=5;const p=Math.random()*t,c=Math.random()*e,s=50+Math.random()*220,l=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);$e.push({x:a===0?Math.random()*t:p+Math.cos(l)*s,y:a===0?Math.random()*e:c+Math.sin(l)*s,vx:(Math.random()-.5)*at,vy:(Math.random()-.5)*at,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:a,oCx:p,oCy:c,oRadius:s,oAngle:l,oSpeed:d})}}function Bt(){if(!se)return;const t=se;if(xe=t.getContext("2d"),!xe)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,$e.length===0&&Rt(t.width,t.height)};e(),window.addEventListener("resize",e);let i=null,o=0,a=0,p=!1;function c(){if(!xe||!se){ve=null;return}if(ve=requestAnimationFrame(c),p=!p,p)return;const s=xe,l=se.width,d=se.height;s.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,s.fillRect(0,0,l,d),(!i||o!==l||a!==d)&&(o=l,a=d,i=s.createRadialGradient(l*.5,d*.5,0,l*.5,d*.5,Math.max(l,d)*.6),i.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),i.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=i,s.fillRect(0,0,l,d);const g=$e,m=g.length,_=it*it;for(let E=0;E<m;E++){const r=g[E];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>l&&(r.x=l,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>d&&(r.y=d,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const k=r.oAngle,v=r.oRadius*.7;r.x=r.oCx+v*Math.cos(k),r.y=r.oCy+v*Math.sin(k)*Math.cos(k),r.oCx+=Math.sin(k*.15)*.12,r.oCy+=Math.cos(k*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const k=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*k,r.y=r.oCy+Math.sin(r.oAngle)*k,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=l+30:r.x>l+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const k=r.oRadius+50;r.oCx<-k?r.oCx=l+k:r.oCx>l+k&&(r.oCx=-k),r.oCy<-k?r.oCy=d+k:r.oCy>d+k&&(r.oCy=-k)}}s.beginPath(),s.strokeStyle=`rgba(${ne},${oe},${ie},0.06)`,s.lineWidth=.4;const O=new Path2D;for(let E=0;E<m;E++){const r=g[E];for(let k=E+1;k<m;k++){const v=g[k],D=r.x-v.x,M=r.y-v.y,P=D*D+M*M;P<_&&(1-P/_<.4?(s.moveTo(r.x,r.y),s.lineTo(v.x,v.y)):(O.moveTo(r.x,r.y),O.lineTo(v.x,v.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${ne},${oe},${ie},0.18)`,s.lineWidth=.8,s.stroke(O),!ge||rt!==ne||st!==oe||lt!==ie){ge=document.createElement("canvas");const E=48;ge.width=E,ge.height=E;const r=ge.getContext("2d"),k=r.createRadialGradient(E/2,E/2,0,E/2,E/2,E/2);k.addColorStop(0,`rgba(${ne},${oe},${ie},0.9)`),k.addColorStop(.3,`rgba(${ne},${oe},${ie},0.35)`),k.addColorStop(1,`rgba(${ne},${oe},${ie},0)`),r.fillStyle=k,r.fillRect(0,0,E,E),rt=ne,st=oe,lt=ie}const R=ge;for(let E=0;E<m;E++){const r=g[E],k=.6+.4*Math.sin(r.pulsePhase),v=r.radius*5*(.8+k*.4);s.globalAlpha=.5+k*.4,s.drawImage(R,r.x-v/2,r.y-v/2,v,v)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let E=0;E<m;E++){const r=g[E];if(r.radius>2){const k=.6+.4*Math.sin(r.pulsePhase),v=r.radius*(.8+k*.4)*.35;s.moveTo(r.x+v,r.y),s.arc(r.x,r.y,v,0,Math.PI*2)}}s.fill()}c()}function Dt(){ve!==null&&(cancelAnimationFrame(ve),ve=null),se=null,xe=null,$e=[]}let Ee=null;const Ie=560,Nt=140,ct=Ie/2,dt=Nt/2,pt=[];for(let t=0;t<=Ie;t+=8){const e=Math.abs(t-ct)/ct;pt.push(Math.pow(Math.min(1,e*1.6),.6))}const Ot=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ie,off:t*.6,spd:.7+t*.12}));let Fe=!1;function ft(){if(we=requestAnimationFrame(ft),Fe=!Fe,Fe)return;if(Oe+=.07,!Ee){const e=document.getElementById("nf-engine-waves");if(!e){we=null;return}Ee=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ee.length;e++){const i=Ot[e],o=Oe*i.spd+i.off;t.length=0,t.push(`M 0 ${dt}`);let a=0;for(let p=0;p<=Ie;p+=8){const c=dt+i.amp*pt[a++]*Math.sin(p*i.freq+o);t.push(`L${p} ${c*10+.5|0}`)}Ee[e].setAttribute("d",t.join(" "))}}function zt(){Oe=0,ft(),Bt(),Se=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),i=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function ut(){we!==null&&(cancelAnimationFrame(we),we=null),Se&&(clearInterval(Se),Se=null),Ee=null,Dt()}function Le(){let t=0;const e=W.filter(d=>d.status!=="skipped").length;for(const d of W){const g=document.getElementById(`nf-proc-${d.stepId}`);if(!g)continue;g.className="nf-proc-row";const m=g.querySelector(".nf-proc-badge");switch(d.status){case"done":g.classList.add("nf-proc-done"),m&&(m.textContent="✅ done"),t++;break;case"active":g.classList.add("nf-proc-active"),m&&(m.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":g.classList.add("nf-proc-error"),m&&(m.textContent="❌ error");break;case"skipped":g.classList.add("nf-proc-skipped"),m&&(m.textContent="— skip");break;default:g.classList.add("nf-proc-waiting"),m&&(m.textContent="(queued)")}}const i=W.findIndex(d=>d.status==="active"),o=i>=0?i+1:t>=e&&e>0?W.length:t,a=document.getElementById("nf-step-counter");a&&(a.textContent=`${o}/${W.length}`);const p=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=K.doneHex),c&&(c.style.background=K.doneHex,c.style.boxShadow=`0 0 8px rgba(${K.doneRgb},0.7)`)):W.some(g=>g.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):W.some(g=>g.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=K.hex,p.style.textShadow=`0 0 10px rgba(${K.rgb},0.5)`);const s=document.getElementById("nf-terminal"),l=s==null?void 0:s.querySelector(".nf-proc-active");l&&s&&l.scrollIntoView({behavior:"smooth",block:"center"})}function gt(){Q&&Q.isConnected||(et(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=de?Qe:Je,Q.title="ซ่อน/แสดง Netflow Overlay",Q.onclick=()=>Ge(),document.body.appendChild(Q))}function Ge(){j&&(gt(),de?(j.classList.remove("nf-hidden"),j.classList.add("nf-visible"),Q&&(Q.innerHTML=Je),de=!1):(j.classList.remove("nf-visible"),j.classList.add("nf-hidden"),Q&&(Q.innerHTML=Qe),de=!0))}const mt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ht(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=be;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const i=mt[e]||mt.green;let o;try{o=chrome.runtime.getURL(i)}catch{o=`/${i}`}const a=K.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${a},0.25) 0%, rgba(${a},0.12) 50%, rgba(${a},0.20) 100%)`,`url('${o}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${a},0.45)`,t.style.boxShadow=`0 0 70px rgba(${a},0.22), 0 0 140px rgba(${a},0.1), inset 0 1px 0 rgba(${a},0.15)`}function qe(t=1){if(K=Mt(),Ke(),j&&j.isConnected){de&&Ge();return}if(j&&!j.isConnected&&(j=null),ce&&(ce.remove(),ce=null),et(),ye=t,W=ze(t),t>1){const e=pe.find(o=>o.id==="video");if(e){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let a=2;a<=t;a++)o.push({id:`scene${a}-prompt`,label:`Scene ${a} Prompt`,status:"waiting"}),o.push({id:`scene${a}-gen`,label:`Scene ${a} Generate`,status:"waiting"}),o.push({id:`scene${a}-wait`,label:`Scene ${a} รอผล`,status:"waiting",progress:0});e.steps=o}const i=pe.find(o=>o.id==="render");if(i){const o=i.steps.find(p=>p.id==="download");o&&(o.label="ดาวน์โหลด 720p");const a=i.steps.find(p=>p.id==="upscale");a&&(a.label="Full Video")}}j=It(),document.body.appendChild(j),de=!1,gt(),Tt(),zt(),requestAnimationFrame(()=>ht())}function bt(){ot(),ut(),de=!1,j&&(j.classList.add("nf-fade-out"),setTimeout(()=>{j==null||j.remove(),j=null},500)),Q&&(Q.remove(),Q=null)}const Ft={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Lt(t,e,i){const o=W.findIndex(g=>g.status==="active"),a=W.filter(g=>g.status==="done").length,p=W.length,c=o>=0?o+1:a>=p?p:a,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${c}/${p}`);let l=1;for(const g of W)if(g.status==="active"||g.status==="done")if(g.stepId.startsWith("scene")){const m=g.stepId.match(/^scene(\d+)-/);m&&(l=Math.max(l,parseInt(m[1],10)))}else(g.stepId==="download"||g.stepId==="upscale"||g.stepId==="open")&&(l=ye);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=ye>1?`${l}/${ye}`:"1/1"),e==="active"){const g=document.getElementById("nf-stat-status"),m=Ft[t]||t.toUpperCase();g&&(g.textContent=m)}else if(e==="done"&&a>=p){const g=document.getElementById("nf-stat-status");g&&(g.textContent="COMPLETE")}else if(e==="error"){const g=document.getElementById("nf-stat-status");g&&(g.textContent="ERROR")}if(i!==void 0&&i>0){const g=document.getElementById("nf-stat-progress");g&&(g.textContent=`${Math.min(100,i)}%`)}}function I(t,e,i){if(!j)return;for(const a of pe)for(const p of a.steps)p.id===t&&(p.status=e,i!==void 0&&(p.progress=i));for(const a of W)a.stepId===t&&(a.status=e,i!==void 0&&(a.progress=i));const o=document.getElementById(`nf-step-${t}`);if(o&&(o.className="nf-step",e==="active"?o.classList.add("nf-step-active"):e==="done"?o.classList.add("nf-step-done"):e==="error"&&o.classList.add("nf-step-error")),Lt(t,e,i),i!==void 0){const a=document.getElementById(`nf-bar-${t}`);a&&(a.style.width=`${Math.min(100,i)}%`)}Ve(),Le()}function me(t){I(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function ke(t=4e3){ot(),ut(),Ve(),Le(),setTimeout(()=>bt(),t)}function Ve(){for(const t of pe){const e=t.steps.filter(l=>l.status!=="skipped").length,i=t.steps.filter(l=>l.status==="done").length,o=t.steps.some(l=>l.status==="active"),a=e>0?Math.round(i/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${a}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${a}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),a>=100?s.classList.add("nf-done"):o&&s.classList.add("nf-active"))}}function Gt(t){var o,a,p,c;ye=t;const e=new Map;for(const s of W)e.set(s.stepId,{status:s.status,progress:s.progress});W=ze(t);for(const s of W){const l=e.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(St(),t>1){const s=pe.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=s.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((a=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:a.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)l.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),l.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),l.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=l,wt(s)}}const i=pe.find(s=>s.id==="render");if(i&&t>1){const s=i.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=i.steps.find(d=>d.id==="upscale");l&&(l.label="Full Video"),wt(i)}Ve(),Le()}function wt(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(a=>a.remove()),t.steps.forEach(a=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${a.id}`;let c="";a.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${a.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${a.label}</span>
            ${c}
        `,e.appendChild(p)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(o)}function _e(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{_e(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},B=t=>{console.warn(`[Netflow AI] ${t}`);try{_e(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function He(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?B(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){B(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Te(){try{const t=document.querySelectorAll("video");let e=null;for(const i of t)if(i.src&&i.src.startsWith("http")&&i.getBoundingClientRect().width>100){e=i.src;break}if(!e){for(const i of t)if(i.src&&i.getBoundingClientRect().width>50){e=i.src;break}}if(!e)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;if(n(`[TikTok] พบ video URL: ${e.substring(0,80)}...`),e.startsWith("https://"))try{await new Promise(i=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:e},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),i()})})}catch{}return e}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}function Ue(t){if(t)try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}const xt=(()=>{const t="netflow_instance_id";let e=sessionStorage.getItem(t);return e||(e=crypto.randomUUID().slice(0,8),sessionStorage.setItem(t,e)),e})(),J=`netflow_pending_${xt}`,We=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ye=/Win/i.test(navigator.userAgent),he=We?"🍎 Mac":Ye?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${he} [${xt}]`);class Ae extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const Re=(()=>{const t="self.onmessage=e=>{const{id,ms}=e.data;setTimeout(()=>self.postMessage(id),ms)};";try{return new Worker(URL.createObjectURL(new Blob([t],{type:"application/javascript"})))}catch{return null}})();let qt=0;const Xe=new Map;Re&&(Re.onmessage=t=>{const e=Xe.get(t.data);e&&(Xe.delete(t.data),e())});const u=t=>new Promise((e,i)=>{if(window.__NETFLOW_STOP__)return i(new Ae);if(Re){const o=++qt;Xe.set(o,()=>{if(window.__NETFLOW_STOP__){i(new Ae);return}e()}),Re.postMessage({id:o,ms:t})}else{const o=setTimeout(()=>{if(window.__NETFLOW_STOP__){i(new Ae);return}e()},t);u._lastId=o}});function fe(){return!!window.__NETFLOW_STOP__}function vt(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=(document.body.textContent||"").toLowerCase();if(!t.some(p=>e.includes(p)))return null;const o=document.querySelectorAll("span, p, h1, h2, h3, li");for(const p of o){if(p.closest("#netflow-engine-overlay"))continue;const c=(p.textContent||"").trim().toLowerCase();if(!(c.length>200||c.length<5)){for(const s of t)if(c.includes(s))return((a=p.textContent)==null?void 0:a.trim())||s}}return null}async function te(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",a)),await u(80),t.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",a)),t.dispatchEvent(new MouseEvent("click",a)),await u(50),t.click()}function Vt(t){const e=t.getBoundingClientRect(),i=e.left+e.width/2,o=e.top+e.height/2,a={bubbles:!0,cancelable:!0,clientX:i,clientY:o};t.dispatchEvent(new PointerEvent("pointerenter",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",a)),t.dispatchEvent(new PointerEvent("pointerover",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",a)),t.dispatchEvent(new PointerEvent("pointermove",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",a))}function Ht(t){const e=[],i=document.querySelectorAll("i");for(const o of i){if((o.textContent||"").trim()!==t)continue;let p=o,c=null,s=1/0;for(let l=0;l<20&&p&&(p=p.parentElement,!(!p||p===document.body));l++){const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const g=d.width*d.height;g<s&&(c=p,s=g)}}c&&!e.includes(c)&&e.push(c)}return e.sort((o,a)=>{const p=o.getBoundingClientRect(),c=a.getBoundingClientRect();return p.left-c.left}),e}function je(t=!1){const e=[],i=document.querySelectorAll("video");for(const c of i){let s=c.parentElement;for(let l=0;l<10&&s;l++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of o){const s=(c.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=c.parentElement;for(let d=0;d<10&&l;d++){const g=l.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){e.push({el:l,left:g.left});break}l=l.parentElement}}}const a=document.querySelectorAll("img");for(const c of a){const s=(c.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=c.parentElement;for(let d=0;d<10&&l;d++){const g=l.getBoundingClientRect();if(g.width>120&&g.height>80&&g.width<window.innerWidth*.7&&g.top>=-50&&g.left<window.innerWidth*.75){e.push({el:l,left:g.left});break}l=l.parentElement}}}const p=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(s=>s.el===c));if(p.sort((c,s)=>c.left-s.left),p.length>0){const c=p[0].el,s=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Ut(){const t=Ht("image");if(t.length>0){const i=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${i.left.toFixed(0)},${i.top.toFixed(0)}) ขนาด ${i.width.toFixed(0)}x${i.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const i of e){let o=i.parentElement;for(let a=0;a<10&&o;a++){const p=o.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Wt(t,e){var s;const[i,o]=t.split(","),a=((s=i.match(/:(.*?);/))==null?void 0:s[1])||"image/png",p=atob(o),c=new Uint8Array(p.length);for(let l=0;l<p.length;l++)c[l]=p.charCodeAt(l);return new File([c],e,{type:a})}function Ce(t){var o;const e=[],i=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const a of i)if(((o=a.textContent)==null?void 0:o.trim())===t){const p=a.closest("button");p&&e.push(p)}return e}function Yt(){const t=[...Ce("add"),...Ce("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const a of o){const p=a.getBoundingClientRect();if(p.bottom>window.innerHeight*.7&&p.width<60&&p.height<60){const c=(a.textContent||"").trim();if(c==="+"||c==="add")return a}}return null}let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();a.y>i&&(i=a.y,e=o)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${i.toFixed(0)}`),e}function yt(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const a=Ce(o);let p=null,c=0;for(const s of a){const l=s.getBoundingClientRect();l.y>c&&(c=l.y,p=s)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${c.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,i=0;for(const o of t){const a=o.getBoundingClientRect();if(a.bottom>window.innerHeight*.7&&a.right>window.innerWidth*.5){const p=Math.abs(a.width-a.height)<10&&a.width<60,c=a.y+a.x+(p?1e3:0);c>i&&(i=c,e=o)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const o of t){const a=(o.getAttribute("aria-label")||"").toLowerCase();if(a.includes("generate")||a.includes("submit")||a.includes("send")||a.includes("สร้าง"))return o}return null}function $t(){const t=document.querySelectorAll("textarea");for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const e=document.querySelectorAll('[contenteditable="true"]');for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const i=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of i){const a=o.placeholder||"";if(a.includes("สร้าง")||a.includes("prompt")||a.includes("describe"))return o}return t.length>0?t[t.length-1]:null}async function Be(t,e){var i,o,a,p;t.focus(),await u(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),await u(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await u(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await u(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await u(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(s),await u(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((i=navigator.clipboard)!=null&&i.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await u(200),document.execCommand("paste"),await u(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(c){let s=t[c];for(let l=0;l<30&&s;l++){const d=s.memoizedProps,g=s.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const m=d.editor;m.selection,m.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(a=g==null?void 0:g.memoizedState)==null?void 0:a.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),g.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Xt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const i of e)t.push({input:i,origType:"file"}),i.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function jt(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${he})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${he})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Kt(t,e,i){var d;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),a=[...t.map(g=>g.input)];for(const g of o)!a.includes(g)&&g.offsetParent===null&&a.push(g);for(const g of a)g.type="file";n(`คืนค่า input ${a.length} ตัวเป็น type=file`);const p=document.querySelectorAll('input[type="file"]');if(p.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${he})`),!1;let c;if(i&&i.size>0){const g=Array.from(p).filter(m=>!i.has(m));g.length>0?(c=g[g.length-1],n(`เล็งเป้า file input ใหม่ (${g.length} ใหม่, ${p.length} ทั้งหมด)`)):(c=p[p.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${p.length} ตัว`))}else c=p[p.length-1];const s=new DataTransfer;s.items.add(e);try{c.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=c.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(g){n(`กำหนด target.files ล้มเหลว: ${g.message} — ลอง defineProperty`);try{Object.defineProperty(c,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(m){return B(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${m.message}`),!1}}const l=c._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),c.dispatchEvent(new Event("change",{bubbles:!0})),c.dispatchEvent(new Event("input",{bubbles:!0}));try{const g=new DataTransfer;g.items.add(e);const m=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:g});c.dispatchEvent(m),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${he}`),!0}function Me(){let t=0;const e=document.querySelectorAll("img");for(const o of e){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.src&&o.offsetParent!==null&&t++}const i=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of i){if(o.closest("#netflow-engine-overlay"))continue;const a=o.getBoundingClientRect();a.bottom>window.innerHeight*.6&&a.width>20&&a.width<200&&a.height>20&&a.height<200&&o.offsetParent!==null&&t++}return t}async function Et(t,e){var g;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const i=Wt(t,e);n(`ขนาดไฟล์: ${(i.size/1024).toFixed(1)} KB`);const o=Me();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const a=async(m,_=8e3)=>{const O=Date.now();for(;Date.now()-O<_;){const R=Me();if(R>o)return n(`✅ [${m}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${R}`),!0;await u(500)}return n(`⚠️ [${m}] รูปย่อไม่เพิ่ม (ยังคง ${Me()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const p=Yt();if(!p)return B("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const s=jt();let l=Xt();const d=new MutationObserver(m=>{for(const _ of m)for(const O of _.addedNodes)if(O instanceof HTMLInputElement&&O.type==="file"&&(O.type="text",l.push({input:O,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),O instanceof HTMLElement){const R=O.querySelectorAll('input[type="file"]');for(const E of R)E.type="text",l.push({input:E,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{p.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await u(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let m=!1;const _=Date.now();for(;!m&&Date.now()-_<5e3;){const R=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const E of R){if(E===p)continue;const r=E.querySelectorAll("i");for(const k of r){const v=((g=k.textContent)==null?void 0:g.trim())||"";if((v==="upload"||v==="upload_file")&&!Array.from(E.querySelectorAll("i")).map(M=>{var P;return(P=M.textContent)==null?void 0:P.trim()}).includes("drive_folder_upload")){E.click(),m=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${v}) ✅`);break}}if(m)break}if(!m)for(const E of R){if(E===p)continue;const r=E.childNodes.length<=5?(E.textContent||"").trim():"";if(r.length>0&&r.length<40){const k=r.toLowerCase();if(k==="upload"||k==="อัปโหลด"||k==="อัพโหลด"||k.includes("upload image")||k.includes("upload photo")||k.includes("อัปโหลดรูปภาพ")||k.includes("อัพโหลดรูปภาพ")||k.includes("from computer")||k.includes("จากคอมพิวเตอร์")){E.click(),m=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${r}") ✅`);break}}}m||await u(500)}return m?(await u(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Kt(l,i,c)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await a("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(B(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(B("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const m of l)m.input.type!=="file"&&(m.input.type="file")}}async function Qt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const i=document.querySelectorAll("button");let o=null;for(const v of i){const D=v.textContent||"";if((D.includes("Nano Banana")||D.includes("Imagen")||D.includes("วิดีโอ")||D.includes("รูปภาพ")||D.includes("Image")||D.includes("Video"))&&v.getBoundingClientRect().bottom>window.innerHeight*.7){o=v,n(`พบปุ่มตั้งค่าจากข้อความ: "${D.substring(0,30).trim()}"`);break}}if(!o)for(const v of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const D=Ce(v);for(const M of D)if(M.getBoundingClientRect().bottom>window.innerHeight*.7){o=M,n(`พบปุ่มตั้งค่าจากไอคอน: ${v}`);break}if(o)break}if(!o)return B("ไม่พบปุ่มตั้งค่า"),!1;const a=o.getBoundingClientRect(),p=a.left+a.width/2,c=a.top+a.height/2,s={bubbles:!0,cancelable:!0,clientX:p,clientY:c,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await u(1500);let l=!1,d=null;const g=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const v of g){const D=v.getAttribute("aria-controls")||"",M=v.id||"";if(D.toUpperCase().includes("IMAGE")||M.toUpperCase().includes("IMAGE")){d=v,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${D})`);break}}if(!d)for(const v of document.querySelectorAll('[role="tab"]')){const D=v.id||"";if(D.toUpperCase().includes("TRIGGER-IMAGE")){d=v,n(`พบแท็บ Image ผ่าน id: ${D}`);break}}if(!d)for(const v of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const D=(v.textContent||"").trim();if((D==="Image"||D.endsWith("Image")||D==="รูปภาพ"||D==="ภาพ")&&!D.includes("Video")&&!D.includes("วิดีโอ")){d=v,n(`พบแท็บ Image ผ่านข้อความ: "${D}"`);break}}if(d){const v=d.getAttribute("data-state")||"",D=d.getAttribute("aria-selected")||"";if(v==="active"||D==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const M=d.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",P)),await u(80),d.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",P)),d.dispatchEvent(new MouseEvent("click",P)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await u(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const m=t==="horizontal"?"LANDSCAPE":"PORTRAIT",_=t==="horizontal"?"แนวนอน":"แนวตั้ง";let O=!1;const R=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], button[role="tab"]');for(const v of R){const D=(v.id||"").toUpperCase(),M=(v.getAttribute("aria-controls")||"").toUpperCase();if(D.includes(m)||M.includes(m)){const P=v.getBoundingClientRect(),h={bubbles:!0,cancelable:!0,clientX:P.left+P.width/2,clientY:P.top+P.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",h)),await u(80),v.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",h)),v.dispatchEvent(new MouseEvent("click",h)),n(`✅ เลือกทิศทางผ่าน ID: ${m}`),O=!0,await u(400);break}}if(!O)for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const D=(v.textContent||"").trim();if(D.includes(_)||D.toLowerCase().includes(t==="horizontal"?"landscape":"portrait")){const M=v.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",P)),await u(80),v.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",P)),v.dispatchEvent(new MouseEvent("click",P)),n(`✅ เลือกทิศทางผ่าน Text: ${_}`),O=!0,await u(400);break}}const E=String(e),r=`x${e}`;let k=!1;for(const v of document.querySelectorAll('.flow_tab_slider_trigger[role="tab"], button[role="tab"]')){const D=(v.id||"").toUpperCase(),M=(v.getAttribute("aria-controls")||"").toUpperCase(),P=(v.textContent||"").trim();if(D.includes(`TRIGGER-${E}`)||M.includes(`CONTENT-${E}`)||P===r){const h=v.getBoundingClientRect(),f={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",f)),await u(80),v.dispatchEvent(new PointerEvent("pointerup",{...f,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",f)),v.dispatchEvent(new MouseEvent("click",f)),n(`✅ เลือกจำนวนผ่าน ID/Text: ${r}`),k=!0,await u(400);break}}if(!k)for(const v of document.querySelectorAll("button, [role='tab'], [role='option']")){const D=(v.textContent||"").trim();if(D===r||D.includes(r)){const M=v.getBoundingClientRect(),P={bubbles:!0,cancelable:!0,clientX:M.left+M.width/2,clientY:M.top+M.height/2,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",P)),await u(80),v.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",P)),v.dispatchEvent(new MouseEvent("click",P)),n(`✅ เลือกจำนวนผ่าน Text (fallback): ${r}`),k=!0,await u(400);break}}return await u(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await u(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await u(600),!0}async function Jt(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";n(`=== เลือกคุณภาพ Veo: ${e} ===`);let i=null;const o=document.querySelectorAll("button");for(const m of o){const _=(m.textContent||"").trim();if(_.includes("Veo 3.1")&&_.includes("arrow_drop_down")){i=m,n(`พบปุ่ม Veo dropdown: "${_.substring(0,40).trim()}"`);break}}if(!i){for(const m of o)if(m.getAttribute("aria-haspopup")==="menu"){const _=(m.textContent||"").trim();if(_.includes("Veo")){i=m,n(`พบปุ่ม Veo dropdown (aria-haspopup): "${_.substring(0,40).trim()}"`);break}}}if(!i)for(const m of o){const _=(m.textContent||"").trim();if(_.includes("Veo 3.1")&&m.getBoundingClientRect().bottom>window.innerHeight*.7){i=m,n(`พบปุ่ม Veo dropdown (bottom area): "${_.substring(0,40).trim()}"`);break}}if(!i){let m="ไม่ทราบ";for(const _ of o){const O=(_.textContent||"").replace(/\s+/g," ").trim();if(O.includes("Veo 3.1")&&_.getBoundingClientRect().width>0){O.includes("Quality")?m="Veo 3.1 - Quality":O.includes("Fast")?m="Veo 3.1 - Fast":m=O.substring(0,30);break}}return B(`ไม่พบปุ่ม Veo quality dropdown — ค่าปัจจุบันบนหน้าจอ: ${m}`),!1}if((i.textContent||"").trim().includes(e))return n(`✅ Veo quality เป็น "${e}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=i.getBoundingClientRect(),c=p.left+p.width/2,s=p.top+p.height/2,l={bubbles:!0,cancelable:!0,clientX:c,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",l)),await u(80),i.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",l)),i.dispatchEvent(new MouseEvent("click",l)),n("คลิกเปิด Veo quality dropdown"),await u(1e3);let d=!1;const g=document.querySelectorAll("button, [role='menuitem'], [role='option']");for(const m of g){const _=m.querySelectorAll("span");for(const O of _)if((O.textContent||"").trim()===e){const E=m.getBoundingClientRect();if(E.width>0&&E.height>0){const r=E.left+E.width/2,k=E.top+E.height/2,v={bubbles:!0,cancelable:!0,clientX:r,clientY:k,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",v)),await u(80),m.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",v)),m.dispatchEvent(new MouseEvent("click",v)),n(`✅ เลือก "${e}" สำเร็จ`),d=!0;break}}if(d)break;if(!d){const O=(m.textContent||"").trim();if(O.includes(e)&&!O.includes("arrow_drop_down")){const R=m.getBoundingClientRect();if(R.width>0&&R.height>0){const E=R.left+R.width/2,r=R.top+R.height/2,k={bubbles:!0,cancelable:!0,clientX:E,clientY:r,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",k)),await u(80),m.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",k)),m.dispatchEvent(new MouseEvent("click",k)),n(`✅ เลือก "${e}" สำเร็จ (fallback)`),d=!0;break}}}}return d?(await u(600),!0):(B(`ไม่พบตัวเลือก "${e}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(300),!1)}async function Zt(t){var v,D,M,P;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,i=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=i?i[1]:"unknown",a=We?"macOS":Ye?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=We?((D=(v=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:v[1])==null?void 0:D.replace(/_/g,"."))||"":Ye&&((M=e.match(/Windows NT ([0-9.]+)/))==null?void 0:M[1])||"",c=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${a} ${p} | Chrome ${o}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${s} | แพลตฟอร์ม: ${he}`),n("══════════════════════════════════════════");try{Ne(t.theme)}catch{}try{qe()}catch(h){console.warn("Overlay show error:",h)}const l=[],d=[];try{I("settings","active");const h=t.orientation||"horizontal",f=t.outputCount||1,b=await Qt(h,f);l.push(b?"✅ Settings":"⚠️ Settings"),I("settings",b?"done":"error")}catch(h){B(`ตั้งค่าผิดพลาด: ${h.message}`),l.push("⚠️ Settings"),I("settings","error")}try{const h=t.veoQuality||"fast",f=h==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast";await Jt(h)?(l.push(`✅ ${f}`),n(`✅ Veo quality ที่ใช้: ${f}`)):(l.push("⚠️ Veo quality"),B(`ไม่สามารถเลือก ${f} ได้ — ใช้ค่าเดิมที่แสดงบนหน้าจอ`))}catch(h){B(`Veo quality error: ${h.message}`),l.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const g=()=>{const h=document.querySelectorAll("span, small, label");for(const f of h){if(f.closest("#netflow-engine-overlay"))continue;const b=(f.textContent||"").trim();if(b.length>5||!/^\d{1,3}%$/.test(b))continue;if(b==="100%")return null;const $=f.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<80&&$.height<40&&$.top>window.innerHeight*.5&&$.top<window.innerHeight)return b}return null},m=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await u(2e3);const f=Date.now(),b=6e4;let $="",L=Date.now();const N=15e3;for(;Date.now()-f<b;){const C=g();if(C){if(C!==$)$=C,L=Date.now();else if(Date.now()-L>N){n(`✅ อัพโหลด ${h} — % ค้างที่ ${C} นาน ${N/1e3} วินาที ถือว่าเสร็จ`),await u(1e3);return}n(`กำลังอัพโหลด: ${C} — รอ...`),await u(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await u(1e3);return}}B(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${b/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){I("upload-char","active");try{const h=await Et(t.characterImage,"character.png");l.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||d.push("character upload failed"),I("upload-char",h?"done":"error")}catch(h){B(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),l.push("❌ ตัวละคร"),d.push("character upload error"),I("upload-char","error")}await m("character")}else me("upload-char");if(t.productImage){I("upload-prod","active");try{const h=await Et(t.productImage,"product.png");l.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||d.push("product upload failed"),I("upload-prod",h?"done":"error")}catch(h){B(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),l.push("❌ สินค้า"),d.push("product upload error"),I("upload-prod","error")}await m("product")}else me("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await u(800);const _=g();_&&(n(`⚠️ อัพโหลดยังแสดง ${_} — รอเพิ่มเติม...`),await m("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await u(1e3);const O=(t.characterImage?1:0)+(t.productImage?1:0);if(O>0){let h=Me();h<O&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${O} — รอ 3 วินาที...`),await u(3e3),h=Me()),h>=O?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${O}`):B(`⚠️ คาดว่าจะมี ${O} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),I("img-prompt","active"),await u(1e3);const R=$t();R?(await Be(R,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),I("img-prompt","done")):(B("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),d.push("prompt input not found"),I("img-prompt","error")),await u(800);const E=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&E.add(h.src)}),n(`บันทึกรูปเดิม: ${E.size} รูปก่อน Generate`),n("=== ขั้น 3: รอ 5 วินาทีก่อนคลิก Generate → ==="),I("img-generate","active"),await u(5e3);const r=yt();if(r){const h=r.getBoundingClientRect(),f=h.left+h.width/2,b=h.top+h.height/2,$={bubbles:!0,cancelable:!0,clientX:f,clientY:b,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",$)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",$)),r.dispatchEvent(new MouseEvent("click",$)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await u(500),r.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",$)),await u(80),r.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",$)),r.dispatchEvent(new MouseEvent("click",$)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),I("img-generate","done")}else B("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),d.push("generate button not found"),I("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),I("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await u(15e3);const h=()=>{const N=document.querySelectorAll("div, span, p, label, strong, small");for(const C of N){if(C.closest("#netflow-engine-overlay"))continue;const T=(C.textContent||"").trim();if(T.length>10)continue;const w=T.match(/(\d{1,3})\s*%/);if(!w)continue;const y=parseInt(w[1],10);if(y<1||y>100)continue;const x=C.getBoundingClientRect();if(!(x.width===0||x.width>150)&&!(x.top<0||x.top>window.innerHeight))return y}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,b=-1,$=0;const L=Date.now();for(;!f&&Date.now()-L<18e4;){const N=document.querySelectorAll("img");for(const C of N){if(E.has(C.src)||!(C.alt||"").toLowerCase().includes("generated"))continue;const w=C.getBoundingClientRect();if(w.width>120&&w.height>120&&w.top>0&&w.top<window.innerHeight*.85){const y=C.closest("div");if(y){f=y,n(`พบรูป AI จาก alt="${C.alt}": ${C.src.substring(0,80)}...`);break}}}if(!f)for(const C of N){if(E.has(C.src))continue;const T=C.closest("div"),w=(T==null?void 0:T.textContent)||"";if(w.includes("product.png")||w.includes("character.png")||w.includes(".png")||w.includes(".jpg"))continue;const y=C.getBoundingClientRect();if(y.width>120&&y.height>120&&y.top>0&&y.top<window.innerHeight*.85){const x=C.closest("div");if(x){f=x,n(`พบรูปใหม่ (สำรอง): ${C.src.substring(0,80)}...`);break}}}if(!f){if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const C=vt();if(C){B(`❌ สร้างรูปล้มเหลว: ${C}`),d.push(`image gen failed: ${C}`),I("img-wait","error");break}const T=h();T!==null?(T!==b&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${T}%`),b=T,I("img-wait","active",T)),$=Date.now()):b>30&&Math.floor((Date.now()-$)/1e3)>=3&&n(`🖼️ % หายที่ ${b}% — รูปน่าจะเสร็จแล้ว`),await u(3e3)}}if(!f)B("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),I("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),I("img-wait","done",100);const N=f.getBoundingClientRect(),C=N.left+N.width/2,T=N.top+N.height/2,w={bubbles:!0,cancelable:!0,clientX:C,clientY:T};f.dispatchEvent(new PointerEvent("pointerenter",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",w)),f.dispatchEvent(new PointerEvent("pointerover",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",w)),f.dispatchEvent(new PointerEvent("pointermove",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",w)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await u(1500);let y=null;for(const x of["more_vert","more_horiz","more"]){const S=Ce(x);for(const F of S){const A=F.getBoundingClientRect();if(A.top>=N.top-20&&A.top<=N.bottom&&A.right>=N.right-150&&A.right<=N.right+20){y=F;break}}if(y)break}if(!y){const x=document.querySelectorAll("button");for(const S of x){const F=S.getBoundingClientRect();if(F.width<50&&F.height<50&&F.top>=N.top-10&&F.top<=N.top+60&&F.left>=N.right-80){const A=S.querySelectorAll("i");for(const q of A)if((((P=q.textContent)==null?void 0:P.trim())||"").includes("more")){y=S;break}if(y)break;const V=S.getAttribute("aria-label")||"";if(V.includes("เพิ่มเติม")||V.includes("more")){y=S;break}}}}if(!y)B("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const x=y.getBoundingClientRect(),S=x.left+x.width/2,F=x.top+x.height/2,A={bubbles:!0,cancelable:!0,clientX:S,clientY:F,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",A)),await u(80),y.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",A)),y.dispatchEvent(new MouseEvent("click",A)),n("คลิกปุ่ม 3 จุดแล้ว"),await u(1500);let V=null;const q=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const G of q){const H=(G.textContent||"").trim();if(H.includes("ทำให้เป็นภาพเคลื่อนไหว")||H.includes("Animate")||H.includes("animate")){V=G;break}}if(!V)B("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const G=V.getBoundingClientRect(),H=G.left+G.width/2,Y=G.top+G.height/2,Z={bubbles:!0,cancelable:!0,clientX:H,clientY:Y,button:0};V.dispatchEvent(new PointerEvent("pointerdown",{...Z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mousedown",Z)),await u(80),V.dispatchEvent(new PointerEvent("pointerup",{...Z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mouseup",Z)),V.dispatchEvent(new MouseEvent("click",Z)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),I("animate","done"),await u(3e3)}}}}catch(h){B(`ขั้น 4 ผิดพลาด: ${h.message}`),l.push("⚠️ Animate")}if(fe()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{ke(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),I("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await u(3e3);let h=!1;const f=document.querySelectorAll("button, span, div");for(const L of f){const N=(L.textContent||"").trim(),C=L.getBoundingClientRect();if((N==="วิดีโอ"||N==="Video"||N.includes("วิดีโอ"))&&C.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await u(1e3);const b=$t();b?(await Be(b,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),I("vid-prompt","done")):(B("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),d.push("video prompt input not found"),I("vid-prompt","error")),await u(1e3),I("vid-generate","active");const $=yt();if($){const L=$.getBoundingClientRect(),N=L.left+L.width/2,C=L.top+L.height/2,T={bubbles:!0,cancelable:!0,clientX:N,clientY:C,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",T)),await u(80),$.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",T)),$.dispatchEvent(new MouseEvent("click",T)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),I("vid-generate","done"),await u(500),$.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",T)),await u(80),$.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",T)),$.dispatchEvent(new MouseEvent("click",T)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else B("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),d.push("video generate button not found"),I("vid-generate","error")}catch(h){B(`ขั้น 5 ผิดพลาด: ${h.message}`),l.push("⚠️ Video Gen"),d.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),me("animate"),me("vid-prompt"),me("vid-generate"),me("vid-wait");if(t.videoPrompt){I("vid-wait","active");const h=t.sceneCount||1,f=t.videoScenePrompts||[t.videoPrompt];if(h>1)try{Gt(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);let b=null;const $=()=>{if(b&&b.isConnected&&!b.closest("#netflow-engine-overlay")){const w=(b.textContent||"").trim();if(w.length<=15){const y=w.match(/(\d{1,3})\s*%/);if(y){const x=parseInt(y[1],10);if(x>=1&&x<=100)return x}}b=null}const C=document.querySelectorAll('[role="progressbar"]');for(const w of C){if(w.closest("#netflow-engine-overlay"))continue;const y=w.getAttribute("aria-valuenow");if(y){const x=parseFloat(y);if(x>=1&&x<=100)return x}}const T=document.querySelectorAll("div, span, p, label, strong, small");for(const w of T){if(w.closest("#netflow-engine-overlay"))continue;const y=(w.textContent||"").trim();if(y.length>15||y.length<2)continue;const x=y.match(/(\d{1,3})\s*%/);if(!x)continue;const S=parseInt(x[1],10);if(S<1||S>100)continue;const F=w.getBoundingClientRect();if(!(F.width===0||F.width>150)&&!(F.top<0||F.top>window.innerHeight))return b=w,S}return null},L=async(C=6e5)=>{n("รอการสร้างวิดีโอ..."),I("vid-wait","active"),await u(5e3);const T=()=>{const z=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const U of z){if(U.closest("#netflow-engine-overlay"))continue;const ee=(U.textContent||"").trim();if(ee.includes("%")&&ee.length<15){const ae=U.tagName.toLowerCase(),re=U.className&&typeof U.className=="string"?U.className.split(/\s+/).slice(0,2).join(" "):"",De=U.getBoundingClientRect();if(n(`  🔍 "${ee}" ใน <${ae}.${re}> ที่ (${De.left.toFixed(0)},${De.top.toFixed(0)}) w=${De.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},w=je();n(w?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),T();const y=Date.now();let x=-1,S=0,F=!1,A=0;for(;Date.now()-y<C;){A++;const z=$();if(z!==null){if(z!==x&&(n(`ความคืบหน้าวิดีโอ: ${z}%`),x=z,I("vid-wait","active",z)),S=Date.now(),z>=100){n("✅ ตรวจพบ 100%!"),F=!0;break}}else if(x>0){const U=Math.floor((Date.now()-S)/1e3);if(U>=5){n(`✅ % หายไปที่ ${x}% (หาย ${U} วินาที) — วิดีโอเสร็จ!`),F=!0;break}n(`⏳ % หายที่ ${x}% — ยืนยันใน ${5-U} วินาที...`)}else{const U=Math.floor((Date.now()-y)/1e3);U%15<3&&n(`⏳ รอ... (${U} วินาที) ไม่พบ %`)}const X=Math.floor((Date.now()-y)/1e3);if(!F&&(x>0||X>=30)&&A%5===0){if(je(!0)&&!w){n(`✅ การ์ดวิดีโอปรากฏขึ้น${x>0?`ที่ ${x}%`:" (ไม่พบ %)"} — วิดีโอเสร็จ!`),F=!0;break}if(x<=0){const ee=document.querySelectorAll("video");for(const ae of ee){const re=ae.getBoundingClientRect();if(re.width>200&&re.height>100&&ae.readyState>=2&&ae.src){n("✅ พบ <video> พร้อมเล่น (ไม่พบ %) — วิดีโอเสร็จ!"),F=!0;break}}if(F)break;if(X>=90){n(`✅ ไม่พบ % มานาน ${X} วินาที — ถือว่าเสร็จ`),F=!0;break}}}if(fe())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(x<1&&A%5===0){const U=vt();if(U)return B(`❌ สร้างวิดีโอล้มเหลว: ${U}`),null}await u(3e3)}const V=je();if(!V)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),I("vid-wait","error"),null;const q=V;F?(I("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await u(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const G=q.getBoundingClientRect();let H=G.left+G.width/2,Y=G.top+G.height/2,Z=q;const ue=q.querySelector("video, img, canvas");if(ue){const z=ue.getBoundingClientRect();z.width>50&&z.height>50&&(H=z.left+z.width/2,Y=z.top+z.height/2,Z=ue,n(`🎯 พบรูปย่อ <${ue.tagName.toLowerCase()}> ในการ์ดที่ (${H.toFixed(0)},${Y.toFixed(0)}) ${z.width.toFixed(0)}x${z.height.toFixed(0)}`))}else Y=G.top+G.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${H.toFixed(0)},${Y.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${H.toFixed(0)}, ${Y.toFixed(0)})...`),Vt(Z);for(let z=0;z<8;z++){const X={bubbles:!0,cancelable:!0,clientX:H+z%2,clientY:Y};Z.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousemove",X)),await u(500)}try{chrome.storage.local.set({[J]:{timestamp:Date.now(),action:"mute_video",sceneCount:h,scenePrompts:f,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${h} ฉาก, ${f.length} prompts, theme: ${t.theme})`)}catch(z){n(`⚠️ ไม่สามารถบันทึก pending action: ${z.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await N(Z),n("✅ คลิกการ์ดวิดีโอเสร็จ"),q},N=async C=>{const T=C.getBoundingClientRect(),w=T.left+T.width/2,y=T.top+T.height/2,x={bubbles:!0,cancelable:!0,clientX:w,clientY:y,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",x)),await u(80),C.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",x)),C.dispatchEvent(new MouseEvent("click",x)),await u(50),C.click(),n("คลิกการ์ดวิดีโอแล้ว"),await u(2e3)};try{if(!await L())B("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),I("vid-wait","error");else{l.push("✅ Video Complete"),I("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await u(3e3);const T=await new Promise(w=>{chrome.storage.local.get(J,y=>{if(chrome.runtime.lastError){w(null);return}w((y==null?void 0:y[J])||null)})});T&&!T._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(J),T.action==="mute_video"?await kt(T.sceneCount||1,T.scenePrompts||[],T.theme):T.action==="wait_scene_gen_and_download"&&await Ct(T.sceneCount||2,T.currentScene||2,T.theme,T.scenePrompts||[]))}}catch(C){B(`ขั้น 6 ผิดพลาด: ${C.message}`),l.push("⚠️ Step6"),d.push(`step 6: ${C.message}`)}}const k=d.length===0;try{ke(k?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:k,message:k?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${d.join(", ")}`,step:k?"done":"partial"}}async function kt(t,e=[],i){var D;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{i&&Ne(i)}catch{}try{qe(t)}catch(M){n(`⚠️ showOverlay error: ${M.message}`)}try{const M=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const P of M)I(P,"done");t>=2&&I("scene2-prompt","active")}catch(M){n(`⚠️ overlay restore error: ${M.message}`)}await u(1500);const o=(()=>{for(const M of document.querySelectorAll("button")){const P=M.querySelectorAll("i");for(const f of P){const b=(f.textContent||"").trim();if(b==="volume_up"||b==="volume_off"||b==="volume_mute"){const $=M.getBoundingClientRect();if($.width>0&&$.height>0)return M}}const h=(M.getAttribute("aria-label")||"").toLowerCase();if(h.includes("mute")||h.includes("ปิดเสียง")){const f=M.getBoundingClientRect();if(f.width>0&&f.height>0)return M}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");const a=await Te();if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await u(2e3);for(let w=2;w<=t;w++){const y=e[w-1];if(!y){B(`ไม่พบ prompt สำหรับฉากที่ ${w}`);continue}n(`── ฉากที่ ${w}/${t}: วาง prompt + generate ──`);let x=null;const S=Date.now();for(;!x&&Date.now()-S<1e4;){const z=document.querySelectorAll("[data-slate-editor='true']");if(z.length>0&&(x=z[z.length-1]),!x){const X=document.querySelectorAll("[role='textbox'][contenteditable='true']");X.length>0&&(x=X[X.length-1])}x||await u(1e3)}if(!x){B("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${x.tagName.toLowerCase()}> ${x.className.substring(0,40)}`),await Be(x,y),n(`วาง prompt ฉาก ${w} (${y.length} ตัวอักษร) ✅`);try{I(`scene${w}-prompt`,"done"),I(`scene${w}-gen`,"active")}catch{}await u(1e3);const F=x.getBoundingClientRect();let A=null,V=1/0;for(const z of document.querySelectorAll("button")){if(z.disabled)continue;const X=z.querySelectorAll("i");let U=!1;for(const re of X)if((re.textContent||"").trim()==="arrow_forward"){U=!0;break}if(!U)continue;const ee=z.getBoundingClientRect();if(ee.width<=0||ee.height<=0)continue;const ae=Math.abs(ee.top-F.top)+Math.abs(ee.right-F.right);ae<V&&(V=ae,A=z)}if(!A)for(const z of document.querySelectorAll("button")){const X=z.querySelectorAll("i");for(const U of X)if((U.textContent||"").trim()==="arrow_forward"){const ee=z.getBoundingClientRect();if(ee.width>0&&ee.height>0){A=z;break}}if(A)break}if(!A){B("ไม่พบปุ่ม Generate/Send");return}await new Promise(z=>{chrome.storage.local.set({[J]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:w,scenePrompts:e}},()=>z())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${w}/${t})`),await te(A),n(`คลิก Generate ฉาก ${w} ✅`);try{I(`scene${w}-gen`,"done"),I(`scene${w}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${w} gen เสร็จ ──`),await u(5e3);let q=0,G=0;const H=Date.now(),Y=6e5,Z=5e3;let ue=!1;for(;Date.now()-H<Y;){let z=null;const X=document.querySelectorAll("div, span, p, label, strong, small");for(const U of X){if(U.closest("#netflow-engine-overlay"))continue;const ae=(U.textContent||"").trim().match(/^(\d{1,3})%$/);if(ae){const re=U.getBoundingClientRect();if(re.width>0&&re.height>0&&re.width<120&&re.height<60){z=parseInt(ae[1],10);break}}}if(z!==null){if(z!==q){n(`🎬 ฉาก ${w} ความคืบหน้า: ${z}%`),q=z;try{I(`scene${w}-wait`,"active",z)}catch{}}G=0}else if(q>0){if(G===0)G=Date.now(),n(`🔍 ฉาก ${w}: % หายไป (จาก ${q}%) — กำลังยืนยัน...`);else if(Date.now()-G>=Z){n(`✅ ฉาก ${w}: % หายไป ${Z/1e3} วินาที — เจนเสร็จ!`),ue=!0;break}}if(fe()){n("⛔ ผู้ใช้สั่งหยุด");return}await u(2e3)}ue||B(`ฉาก ${w} หมดเวลา`),n(`✅ ฉาก ${w} เสร็จแล้ว`);try{I(`scene${w}-wait`,"done",100)}catch{}chrome.storage.local.remove(J),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await u(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{I("download","active")}catch{}await u(2e3);const M=Date.now();let P=null;const h=Date.now();for(;!P&&Date.now()-h<1e4;){for(const w of document.querySelectorAll("button")){const y=w.querySelector("i");if(y&&(y.textContent||"").trim()==="download"){const x=w.getBoundingClientRect();if(x.width>0&&x.height>0){P=w;break}}}P||await u(1e3)}if(!P){B("ไม่พบปุ่มดาวน์โหลด");return}await te(P),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await u(1500);let f=null;for(let w=0;w<3&&!f;w++){w>0&&n(`🔄 ลองหา 720p ครั้งที่ ${w+1}...`);let y=null;const x=Date.now();for(;!y&&Date.now()-x<5e3;){for(const q of document.querySelectorAll("[role='menuitem']"))if((q.textContent||"").trim().includes("Full Video")&&q.querySelector("i")){const H=q.getBoundingClientRect();if(H.width>0&&H.height>0){y=q;break}}y||await u(500)}if(!y){B("ไม่พบ Full Video");continue}const S=y.getBoundingClientRect(),F=S.left+S.width/2,A=S.top+S.height/2;y.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:F,clientY:A})),y.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:A})),y.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F,clientY:A})),await te(y),n("คลิก/hover Full Video ✅"),await u(2e3);const V=Date.now();for(;!f&&Date.now()-V<8e3;){for(const q of document.querySelectorAll("button[role='menuitem']")){const G=q.querySelectorAll("span");for(const H of G)if((H.textContent||"").trim()==="720p"){const Y=q.getBoundingClientRect();if(Y.width>0&&Y.height>0){f=q;break}}if(f)break}f||(y.isConnected&&(y.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:F,clientY:A})),y.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:F+20,clientY:A}))),await u(500))}}if(!f){B("ไม่พบ 720p");return}await te(f),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const b=Date.now();let $=!1,L=!1;for(;Date.now()-b<3e5;){for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div")){const y=(w.textContent||"").trim();if(y==="Download complete!"||y==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),$=!0;break}(y.includes("Downloading your extended video")||y.includes("กำลังดาวน์โหลด"))&&(L||(L=!0,n("⏳ กำลังดาวน์โหลด...")))}if($)break;if(L){let w=!1;for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((y.textContent||"").trim().includes("Downloading")){w=!0;break}if(!w){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),$=!0;break}}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await u(2e3)}if(!$){B("ดาวน์โหลดหมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let N=!1;const C=Date.now();for(;Date.now()-C<6e4&&!N;){try{await new Promise(w=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:M},y=>{chrome.runtime.lastError?B(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),N=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${y==null?void 0:y.message}`),w()})})}catch(w){B(`ตรวจสอบผิดพลาด: ${w.message}`)}N||await u(3e3)}N||B("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{I("open","done"),ke(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");const T=await Te();Ue(T||a),He(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await u(2e3);const p=(M,P="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const h of document.querySelectorAll(P)){const f=(h.textContent||"").trim();if(f.includes(M)&&f.length<100){const b=h.getBoundingClientRect();if(b.width>0&&b.height>0&&b.top>=0)return h}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const s=Date.now();for(;!c&&Date.now()-s<1e4;){for(const M of document.querySelectorAll("button, [role='button']")){const P=(M.textContent||"").trim(),h=P.toLowerCase();if((h.includes("download")||h.includes("ดาวน์โหลด"))&&P.length<80){const f=M.getBoundingClientRect();if(f.width>0&&f.height>0){c=M;break}}}if(!c)for(const M of document.querySelectorAll("button")){const P=(M.getAttribute("aria-label")||"").toLowerCase();if(P.includes("download")||P.includes("ดาวน์")){const h=M.getBoundingClientRect();if(h.width>0&&h.height>0){c=M;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await u(1e3))}if(!c){B("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await te(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await u(1500);const l=Date.now();let d=null;const g=Date.now();for(;!d&&Date.now()-g<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await u(500));if(!d){B("ไม่พบ 1080p");return}await te(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const m=Date.now();let _=!1,O=!1,R=0;const E=3e3;for(;Date.now()-m<3e5;){const P=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(P.includes("upscaling complete")||P.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),_=!0;break}for(const f of document.querySelectorAll("div, span, p")){const b=(f.textContent||"").trim().toLowerCase();if(b.length<60&&(b.includes("upscaling complete")||b.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(D=f.textContent)==null?void 0:D.trim()}")`),_=!0;break}}if(_)break;if(P.includes("upscaling your video")||P.includes("กำลังอัปสเกล")){O=!0,R=0;const f=Math.floor((Date.now()-m)/1e3);n(`⏳ กำลังอัปสเกล... (${f} วินาที)`)}else if(O){if(R===0)R=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-R>=E){n(`✅ ข้อความ Upscaling หายไป ${E/1e3} วินาที — เสร็จ!`),_=!0;break}}else{const f=Math.floor((Date.now()-m)/1e3);f%10<3&&n(`⏳ รอ Upscale... (${f} วินาที)`)}if(fe()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await u(2e3)}if(!_){B("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let r=!1;const k=Date.now();for(;Date.now()-k<6e4&&!r;){try{await new Promise(M=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},P=>{chrome.runtime.lastError?B(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):P!=null&&P.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${P.message}`),r=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${P==null?void 0:P.message}`),M()})})}catch(M){B(`ตรวจสอบผิดพลาด: ${M.message}`)}r||await u(3e3)}r||B("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══");const v=await Te();Ue(v||a),He(2e3)}async function Ct(t=2,e=2,i,o=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{i&&Ne(i)}catch{}try{qe(t)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let b=2;b<=e;b++)f.push(`scene${b}-prompt`,`scene${b}-gen`),b<e&&f.push(`scene${b}-wait`);for(const b of f)I(b,"done");I(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${e}/${t} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await u(2e3);const a=(()=>{for(const f of document.querySelectorAll("button")){const b=f.querySelectorAll("i");for(const $ of b){const L=($.textContent||"").trim();if(L==="volume_up"||L==="volume_off"||L==="volume_mute"){const N=f.getBoundingClientRect();if(N.width>0&&N.height>0)return f}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,c=0;const s=Date.now(),l=6e5,d=5e3;let g=!1,m=0,_=null;for(;Date.now()-s<l;){let f=null;if(_&&_.isConnected&&!_.closest("#netflow-engine-overlay")){const $=(_.textContent||"").trim().match(/^(\d{1,3})%$/);$?f=parseInt($[1],10):_=null}if(f===null){const b=document.querySelectorAll('[role="progressbar"]');for(const $ of b){if($.closest("#netflow-engine-overlay"))continue;const L=$.getAttribute("aria-valuenow");if(L){const N=parseFloat(L);if(N>=1&&N<=100){f=N;break}}}}if(f===null){const b=document.querySelectorAll("span, small, label, p");for(const $ of b){if($.closest("#netflow-engine-overlay"))continue;const N=($.textContent||"").trim().match(/^(\d{1,3})%$/);if(N){const C=$.getBoundingClientRect();if(C.width>0&&C.height>0&&C.width<120&&C.height<60){f=parseInt(N[1],10),_=$;break}}}}if(f!==null){if(m=0,f!==p){n(`🎬 scene ${e} ความคืบหน้า: ${f}%`),p=f;try{I(`scene${e}-wait`,"active",f)}catch{}}c=0}else if(p>0){if(c===0)c=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-c>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),g=!0;break}}else if(m++,m>=15){const b=document.querySelectorAll("video");let $=!1;for(const L of b)if(L.readyState>=2&&!L.paused&&L.getBoundingClientRect().width>200){$=!0;break}if($){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),g=!0;break}if(m>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),g=!0;break}}await u(2e3)}g||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{I(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&o.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await u(2e3);for(let f=e+1;f<=t;f++){const b=o[f-1];if(!b){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate (pending recovery) ──`);let $=null;const L=Date.now();for(;!$&&Date.now()-L<1e4;){const A=document.querySelectorAll("[data-slate-editor='true']");if(A.length>0&&($=A[A.length-1]),!$){const V=document.querySelectorAll("[role='textbox'][contenteditable='true']");V.length>0&&($=V[V.length-1])}$||await u(1e3)}if(!$){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await Be($,b),n(`วาง prompt ฉาก ${f} (${b.length} ตัวอักษร) ✅`);try{I(`scene${f}-prompt`,"done"),I(`scene${f}-gen`,"active")}catch{}await u(1e3);const N=$.getBoundingClientRect();let C=null,T=1/0;for(const A of document.querySelectorAll("button")){if(A.disabled)continue;const V=A.querySelectorAll("i");let q=!1;for(const Y of V)if((Y.textContent||"").trim()==="arrow_forward"){q=!0;break}if(!q)continue;const G=A.getBoundingClientRect();if(G.width<=0||G.height<=0)continue;const H=Math.abs(G.top-N.top)+Math.abs(G.right-N.right);H<T&&(T=H,C=A)}if(!C)for(const A of document.querySelectorAll("button")){const V=A.querySelectorAll("i");for(const q of V)if((q.textContent||"").trim()==="arrow_forward"){const G=A.getBoundingClientRect();if(G.width>0&&G.height>0){C=A;break}}if(C)break}if(!C){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(A=>{chrome.storage.local.set({[J]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:i,sceneCount:t,currentScene:f,scenePrompts:o}},()=>A())}),await te(C),n(`คลิก Generate ฉาก ${f} ✅`);try{I(`scene${f}-gen`,"done"),I(`scene${f}-wait`,"active")}catch{}await u(5e3);let w=0,y=0;const x=Date.now();let S=!1,F=0;for(;Date.now()-x<6e5;){let A=null;const V=document.querySelectorAll("div, span, p, label, strong, small");for(const q of V){if(q.closest("#netflow-engine-overlay"))continue;const H=(q.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const Y=q.getBoundingClientRect();if(Y.width>0&&Y.height>0&&Y.width<120&&Y.height<60){A=parseInt(H[1],10);break}}}if(A!==null){if(F=0,A!==w){n(`🎬 ฉาก ${f} ความคืบหน้า: ${A}%`),w=A;try{I(`scene${f}-wait`,"active",A)}catch{}}y=0}else if(w>0){if(y===0)y=Date.now();else if(Date.now()-y>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),S=!0;break}}else if(F++,F>=15){const q=document.querySelectorAll("video");let G=!1;for(const H of q)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){G=!0;break}if(G){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),S=!0;break}if(F>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),S=!0;break}}await u(2e3)}S||n(`⚠️ ฉาก ${f} หมดเวลา`);try{I(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove(J),await u(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await u(3e3);try{I("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const O=Date.now();let R=null;const E=Date.now();for(;!R&&Date.now()-E<1e4;){for(const f of document.querySelectorAll("button")){const b=f.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const $=f.getBoundingClientRect();if($.width>0&&$.height>0){R=f;break}}}R||await u(1e3)}if(!R){B("ไม่พบปุ่มดาวน์โหลด");return}await te(R),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await u(1500);let r=null;for(let f=0;f<3&&!r;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let b=null;const $=Date.now();for(;!b&&Date.now()-$<5e3;){for(const w of document.querySelectorAll("[role='menuitem']"))if((w.textContent||"").trim().includes("Full Video")&&w.querySelector("i")){const x=w.getBoundingClientRect();if(x.width>0&&x.height>0){b=w;break}}b||await u(500)}if(!b){B("ไม่พบ Full Video");continue}const L=b.getBoundingClientRect(),N=L.left+L.width/2,C=L.top+L.height/2;b.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:N,clientY:C})),b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:N,clientY:C})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:N,clientY:C})),await te(b),n("คลิก/hover Full Video ✅"),await u(2e3);const T=Date.now();for(;!r&&Date.now()-T<8e3;){for(const w of document.querySelectorAll("button[role='menuitem']")){const y=w.querySelectorAll("span");for(const x of y)if((x.textContent||"").trim()==="720p"){const S=w.getBoundingClientRect();if(S.width>0&&S.height>0){r=w;break}}if(r)break}r||(b.isConnected&&(b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:N,clientY:C})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:N+20,clientY:C}))),await u(500))}}if(!r){B("ไม่พบ 720p");return}await te(r),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const k=Date.now();let v=!1,D=!1;for(;Date.now()-k<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(f.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),v=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&(D||(D=!0,n("⏳ กำลังดาวน์โหลด...")))}if(v)break;if(D){let f=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),v=!0;break}}await u(2e3)}if(!v){B("ดาวน์โหลดหมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await u(5e3);let M=!1;const P=Date.now();for(;Date.now()-P<6e4&&!M;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:O},b=>{chrome.runtime.lastError?B(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),M=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${b==null?void 0:b.message}`),f()})})}catch(f){B(`ตรวจสอบผิดพลาด: ${f.message}`)}M||await u(3e3)}M||B("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{I("open","done"),ke(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══");const h=await Te();Ue(h),He(2e3)}async function en(){try{const t=await new Promise(p=>{chrome.storage.local.get(J,c=>{if(chrome.runtime.lastError){p(null);return}p((c==null?void 0:c[J])||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const i=Date.now()-t.timestamp;if(i>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(J);return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=o,await new Promise(p=>{chrome.storage.local.set({[J]:t},()=>p())}),await u(300),!await new Promise(p=>{chrome.storage.local.get(J,c=>{const s=c==null?void 0:c[J];p((s==null?void 0:s._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(J),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(i/1e3)} วินาที)`),t.action==="mute_video"?await kt(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await Ct(t.sceneCount||2,t.currentScene||2,t.theme,t.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,i)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_RUNNING__?(n("⚠️ GENERATE_IMAGE ถูกเรียกซ้ำ — ข้าม (มี instance ทำงานอยู่แล้ว)"),i({success:!1,message:"Already running"}),!1):(window.__NETFLOW_RUNNING__=!0,window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),i({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Zt(t).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof Ae||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{_e("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{bt()}catch{}}else console.error("[Netflow AI] Generate error:",o)}).finally(()=>{window.__NETFLOW_RUNNING__=!1}),!1);if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,window.__NETFLOW_RUNNING__=!1,i({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return i({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return i({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await u(500);const o=Ut();if(!o){B("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const a=o.getBoundingClientRect(),p=a.left+a.width/2,c=a.top+a.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${c.toFixed(0)}) ${a.width.toFixed(0)}x${a.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(p,c);l?(await te(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await te(o),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await u(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),en()})();
