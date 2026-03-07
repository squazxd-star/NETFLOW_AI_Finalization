(function(){"use strict";const it={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Y=it.green,ut=null;function It(e){e&&it[e]&&(ut=e,Y=it[e],zt(),requestAnimationFrame(()=>ae()))}function me(){if(ut&&it[ut])return it[ut];try{const e=localStorage.getItem("netflow_app_theme");if(e&&it[e])return it[e]}catch{}return it.green}let Z=0,Q=255,tt=65;function zt(){const e=Y.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(Z=parseInt(e[1],16),Q=parseInt(e[2],16),tt=parseInt(e[3],16))}let V=null,U=null,at=null,Ht=0,$t=null,gt=null,Et=null,Pt=0,st=!1,nt=null,mt=null,ht=null,kt=1,X=[];function St(e){const t=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=e;r++)t.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const lt=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];X=St(1);function he(e){const t=e.rgb,r=e.accentRgb,o=e.doneRgb,i=e.hex,c=e.accentHex,p=e.doneHex,s=(()=>{const b=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const a=M=>Math.min(255,M+80);return`#${[1,2,3].map(M=>a(parseInt(b[M],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const b=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const a=M=>Math.min(255,M+60);return`#${[1,2,3].map(M=>a(parseInt(b[M],16)).toString(16).padStart(2,"0")).join("")}`})(),d=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),v=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,T=d?parseInt(d[1],16)/v:0,O=d?parseInt(d[2],16)/v:1,E=d?parseInt(d[3],16)/v:.25,k=b=>`${Math.round(T*b)}, ${Math.round(O*b)}, ${Math.round(E*b)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${t},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${r},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${t},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${r},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${k(18)},0.94) 0%, rgba(${k(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 0% 0%, rgba(${t},0.12) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 100%, rgba(${r},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${t},0.06) 0%, transparent 35%),
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
        rgba(${t},0.045) 2px,
        rgba(${t},0.045) 4px
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
    border: 1.5px solid rgba(${t},0.24);
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
        radial-gradient(circle, rgba(${t},0.15) 1px, transparent 1px),
        radial-gradient(circle, rgba(${t},0.10) 1px, transparent 1px);
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
        linear-gradient(rgba(${t},0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${t},0.08) 1px, transparent 1px);
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
        rgba(${t},0.042) 90px,
        rgba(${t},0.042) 91px
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
        rgba(${t},0.066) 110px,
        rgba(${t},0.066) 111px,
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
    background: radial-gradient(circle, rgba(${t},0.21) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.13) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.18) 0%, rgba(${r},0.06) 40%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${t},0.18) 0%, transparent 65%);
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
        linear-gradient(0deg, rgba(${t},0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${t},0.04) 1px, transparent 1px),
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
        radial-gradient(circle at 50% 0%, rgba(${t},0.06) 2px, transparent 2px),
        radial-gradient(circle at 0% 75%, rgba(${r},0.05) 2px, transparent 2px),
        radial-gradient(circle at 100% 75%, rgba(${t},0.05) 2px, transparent 2px);
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
        rgba(${t},0.1) 15deg,
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
        radial-gradient(circle, rgba(${t},0.07) 1.5px, transparent 1.5px),
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
            rgba(${t},0.03) 40px, rgba(${t},0.03) 41px
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
        rgba(${t},0.04) 30px, rgba(${t},0.04) 31px
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
        linear-gradient(45deg, rgba(${t},0.035) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(${t},0.035) 25%, transparent 25%),
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
        radial-gradient(ellipse at 20% 50%, rgba(${t},0.14) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(${r},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${t},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${r},0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 70% 60%, rgba(${t},0.09) 0%, transparent 45%);
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
        rgba(${t},0.08) 1.5%,
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
    background: rgba(${k(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${k(180)},0.05),
        inset 0 1px 0 rgba(${t},0.1),
        inset 0 0 40px rgba(${t},0.03);
    animation: nf-core-breathe 4s ease-in-out infinite;
    z-index: 10;
    backdrop-filter: blur(20px) saturate(1.5);
    -webkit-backdrop-filter: blur(20px) saturate(1.5);
}

@keyframes nf-core-breathe {
    0%, 100% {
        box-shadow:
            0 0 60px rgba(${t},0.15),
            0 0 120px rgba(${t},0.08),
            0 0 200px rgba(${k(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${k(180)},0.08),
            inset 0 1px 0 rgba(${t},0.15),
            inset 0 0 50px rgba(${t},0.05);
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
    border-bottom: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${t},0.06) 0%, transparent 100%);
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
    text-shadow: 0 0 10px rgba(${t},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${i};
    box-shadow: 0 0 8px rgba(${t}, 0.7);
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
    background: rgba(${t},0.1);
    border: 1px solid rgba(${t},0.3);
    font-family: 'Rajdhani', 'Orbitron', monospace;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 0 8px rgba(${t},0.4);
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
    scrollbar-color: rgba(${t},0.3) transparent;
}

.nf-terminal::-webkit-scrollbar { width: 4px; }
.nf-terminal::-webkit-scrollbar-track { background: transparent; }
.nf-terminal::-webkit-scrollbar-thumb { background: rgba(${t},0.3); border-radius: 2px; }

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
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${i}; text-shadow: 0 0 6px rgba(${t},0.4); }

.nf-term-status {
    margin-left: auto;
    font-size: 17px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: 4px;
    letter-spacing: 0.5px;
}

.nf-term-active .nf-term-status {
    background: rgba(${t},0.12);
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
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
    border-top: 1px solid rgba(${t},0.2);
    background: linear-gradient(180deg, rgba(${k(5)},0.95) 0%, rgba(${k(12)},0.98) 100%);
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
        rgba(${t},0.045) 2px,
        rgba(${t},0.045) 4px
    );
    pointer-events: none;
    z-index: 4;
}

/* HUD Frame */
.nf-engine-frame {
    position: absolute;
    inset: 8px 14px;
    border: 1px solid rgba(${t},0.25);
    border-radius: 3px;
    box-shadow:
        0 0 20px rgba(${t},0.08),
        0 0 40px rgba(${t},0.04),
        inset 0 0 20px rgba(${t},0.02);
    animation: nf-frame-pulse 4s ease-in-out infinite;
}

@keyframes nf-frame-pulse {
    0%, 100% {
        border-color: rgba(${t},0.25);
        box-shadow: 0 0 20px rgba(${t},0.08), inset 0 0 20px rgba(${t},0.02);
    }
    50% {
        border-color: rgba(${t},0.45);
        box-shadow: 0 0 30px rgba(${t},0.15), inset 0 0 30px rgba(${t},0.04);
    }
}

/* Frame corner accents */
.nf-frame-corner {
    position: absolute;
    width: 14px;
    height: 14px;
    border-style: solid;
    border-color: rgba(${r},0.6);
}
.nf-frame-corner.nf-fc-tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
.nf-frame-corner.nf-fc-tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
.nf-frame-corner.nf-fc-bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
.nf-frame-corner.nf-fc-br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }

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
    background: radial-gradient(circle, rgba(${t},0.25) 0%, rgba(${r},0.08) 40%, transparent 70%);
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
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter:
        drop-shadow(0 0 4px rgba(${t},1))
        drop-shadow(0 0 12px rgba(${t},0.7))
        drop-shadow(0 0 28px rgba(${t},0.35));
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
    background: linear-gradient(135deg, rgba(${t},1) 0%, rgba(255,255,255,0.95) 45%, rgba(${t},0.9) 70%, rgba(255,255,255,0.85) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    -webkit-text-stroke: 0.5px rgba(255,255,255,0.35);
    filter:
        drop-shadow(0 0 4px rgba(255,255,255,0.9))
        drop-shadow(0 0 12px rgba(${t},0.8))
        drop-shadow(0 0 30px rgba(${t},0.45))
        drop-shadow(0 0 60px rgba(${t},0.2));
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
    border: 1px solid rgba(${t},0.25);
    border-top: 1px solid rgba(${r},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${k(6)},0.75) 0%, rgba(${k(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${t},0.12), 0 0 24px rgba(${t},0.06), inset 0 1px 0 rgba(${r},0.08);
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
    background: linear-gradient(180deg, transparent, rgba(${t},0.4), transparent);
}

.nf-stat-label {
    color: rgba(${t},0.75);
    font-weight: 600;
    font-size: 11.5px;
    letter-spacing: 1.8px;
    text-shadow: 0 0 4px rgba(${t},0.3);
    white-space: nowrap;
}
.nf-stat-val {
    color: rgba(${r},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${r},0.7),
        0 0 12px rgba(${r},0.35),
        0 0 20px rgba(${t},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${k(8)}, 0.88);
    border: 1px solid rgba(${t},0.2);
    border-radius: 12px;
    padding: 14px 17px;
    backdrop-filter: blur(16px) saturate(1.3);
    -webkit-backdrop-filter: blur(16px) saturate(1.3);
    overflow: hidden;
    animation: nf-module-in 0.5s ease-out both;
    transition: border-color 0.4s, box-shadow 0.4s;
    z-index: 5;
}

.nf-module.nf-active {
    border-color: rgba(${t},0.5);
    box-shadow:
        0 0 30px rgba(${t},0.12),
        0 0 60px rgba(${t},0.06),
        inset 0 0 20px rgba(${t},0.03);
}

.nf-module.nf-done {
    border-color: rgba(${o}, 0.4);
    box-shadow: 0 0 20px rgba(${o}, 0.1);
}

.nf-module::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(${t},0.5), transparent);
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
    text-shadow: 0 0 8px rgba(${t},0.5), 0 0 16px rgba(${t},0.2);
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
        0 0 10px rgba(${t},0.8),
        0 0 20px rgba(${t},0.5),
        0 0 35px rgba(${t},0.3);
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
    box-shadow: 0 0 6px rgba(${t},0.6);
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
    box-shadow: 0 0 6px rgba(${t},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${p}, ${l});
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
    background: linear-gradient(90deg, ${i}, ${c});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${p}, ${l});
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
    color: rgba(${t}, 0.35);
    text-transform: uppercase;
    text-shadow: 0 0 20px rgba(${t},0.2), 0 0 40px rgba(${t},0.1);
}

.nf-brand-logo {
    width: 43px;
    height: 43px;
    border-radius: 50%;
    border: 2px solid rgba(${t},0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(${k(8)},0.8);
    box-shadow: 0 0 20px rgba(${t},0.15);
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
    background: rgba(${t}, 0.04);
    border: 1px solid rgba(${t}, 0.15);
    border-radius: 8px;
    color: rgba(${t}, 0.5);
    font-size: 19px;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.2s;
    z-index: 20;
    font-family: inherit;
}

.nf-close-btn:hover {
    background: rgba(${t}, 0.15);
    border-color: rgba(${t}, 0.4);
    color: #fff;
    text-shadow: 0 0 8px rgba(${t},0.5);
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
    stroke: rgba(${t},0.2);
    stroke-width: 4px;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
}

.nf-pipe-glow {
    fill: none;
    stroke: rgba(${t},0.3);
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
    fill: rgba(${t},0.9);
    filter: drop-shadow(0 0 6px rgba(${t},0.9));
}

/* ─── Particles ─── */
.nf-particle {
    position: absolute;
    width: 2px; height: 2px;
    background: rgba(${t},0.5);
    border-radius: 50%;
    animation: nf-float-up linear infinite;
    pointer-events: none;
    box-shadow: 0 0 4px rgba(${t},0.3);
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
    border: 2px solid rgba(${t},0.5);
    background: rgba(${k(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${i};
    font-size: 23px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(${t},0.3), 0 4px 12px rgba(0,0,0,0.5);
    transition: all 0.3s ease;
    animation: nf-toggle-pulse 2.5s ease-in-out infinite;
    font-family: 'Inter', system-ui, sans-serif;
}

#nf-toggle-btn:hover {
    transform: scale(1.1);
    border-color: rgba(${t},0.8);
    box-shadow: 0 0 30px rgba(${t},0.5), 0 4px 16px rgba(0,0,0,0.6);
    background: rgba(${t},0.15);
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
    0%, 100% { box-shadow: 0 0 20px rgba(${t},0.3), 0 4px 12px rgba(0,0,0,0.5); }
    50% { box-shadow: 0 0 30px rgba(${t},0.5), 0 4px 16px rgba(0,0,0,0.5); }
}

/* ─── Corner decorative brackets ─── */
.nf-corner-deco {
    position: absolute;
    width: 20px;
    height: 20px;
    border-color: rgba(${t},0.15);
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
    color: rgba(${t},0.35);
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
.nf-proc-active .nf-proc-num {
    color: ${i};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${i};
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}
.nf-proc-active .nf-proc-badge {
    background: rgba(${t},0.12);
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${t},0.3);
}

.nf-proc-done {
    color: rgba(${o},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${o},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${p};
    box-shadow: 0 0 5px rgba(${o},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${o},0.1);
    color: ${l};
}

.nf-proc-error {
    color: rgba(239,68,68,0.8);
}
.nf-proc-error .nf-proc-dot { background: #ef4444; }
.nf-proc-error .nf-proc-badge {
    background: rgba(239,68,68,0.1);
    color: #f87171;
}

.nf-proc-skipped {
    opacity: 0.15;
}

    `}function qt(){at||(at=document.createElement("style"),at.id="netflow-overlay-styles",at.textContent=he(Y),document.head.appendChild(at))}function Vt(e){e.innerHTML="",X.forEach((t,r)=>{const o=document.createElement("div");o.className="nf-proc-row nf-proc-waiting",o.id=`nf-proc-${t.stepId}`,o.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(o)})}function be(){const e=document.getElementById("nf-terminal");if(!e)return;Vt(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${X.length}`)}function Wt(e,t){let s="";for(let g=0;g<32;g++){const w=g/32*Math.PI*2,F=(g+.2)/32*Math.PI*2,f=(g+.5)/32*Math.PI*2,u=(g+.8)/32*Math.PI*2,y=(g+1)/32*Math.PI*2;s+=`${g===0?"M":"L"}${(120+104*Math.cos(w)).toFixed(1)},${(120+104*Math.sin(w)).toFixed(1)} `,s+=`L${(120+104*Math.cos(F)).toFixed(1)},${(120+104*Math.sin(F)).toFixed(1)} `,s+=`L${(120+116*Math.cos(f)).toFixed(1)},${(120+116*Math.sin(f)).toFixed(1)} `,s+=`L${(120+104*Math.cos(u)).toFixed(1)},${(120+104*Math.sin(u)).toFixed(1)} `,s+=`L${(120+104*Math.cos(y)).toFixed(1)},${(120+104*Math.sin(y)).toFixed(1)} `}s+="Z";const l=24,d=100,v=90;let T="";for(let g=0;g<l;g++){const w=g/l*Math.PI*2,F=(g+.25)/l*Math.PI*2,f=(g+.75)/l*Math.PI*2,u=(g+1)/l*Math.PI*2;T+=`${g===0?"M":"L"}${(120+v*Math.cos(w)).toFixed(1)},${(120+v*Math.sin(w)).toFixed(1)} `,T+=`L${(120+d*Math.cos(F)).toFixed(1)},${(120+d*Math.sin(F)).toFixed(1)} `,T+=`L${(120+d*Math.cos(f)).toFixed(1)},${(120+d*Math.sin(f)).toFixed(1)} `,T+=`L${(120+v*Math.cos(u)).toFixed(1)},${(120+v*Math.sin(u)).toFixed(1)} `}T+="Z";let O="";for(let g=0;g<64;g++){const w=g/64*Math.PI*2,F=g%4===0?117:119,f=g%4===0?124:122,u=g%4===0?.8:.4,y=g%4===0?.7:.35;O+=`<line x1="${(120+F*Math.cos(w)).toFixed(1)}" y1="${(120+F*Math.sin(w)).toFixed(1)}" x2="${(120+f*Math.cos(w)).toFixed(1)}" y2="${(120+f*Math.sin(w)).toFixed(1)}" stroke="rgba(${e},${y})" stroke-width="${u}"/>`}const E=26,k=78,b=68;let a="";for(let g=0;g<E;g++){const w=g/E*Math.PI*2,F=(g+.2)/E*Math.PI*2,f=(g+.5)/E*Math.PI*2,u=(g+.8)/E*Math.PI*2,y=(g+1)/E*Math.PI*2;a+=`${g===0?"M":"L"}${(120+b*Math.cos(w)).toFixed(1)},${(120+b*Math.sin(w)).toFixed(1)} `,a+=`L${(120+b*Math.cos(F)).toFixed(1)},${(120+b*Math.sin(F)).toFixed(1)} `,a+=`L${(120+k*Math.cos(f)).toFixed(1)},${(120+k*Math.sin(f)).toFixed(1)} `,a+=`L${(120+b*Math.cos(u)).toFixed(1)},${(120+b*Math.sin(u)).toFixed(1)} `,a+=`L${(120+b*Math.cos(y)).toFixed(1)},${(120+b*Math.sin(y)).toFixed(1)} `}a+="Z";let M="";for(let g=0;g<48;g++){const w=g/48*Math.PI*2,F=g%4===0?79:80,f=g%4===0?85:83,u=g%4===0?.6:.3,y=g%4===0?.6:.3;M+=`<line x1="${(120+F*Math.cos(w)).toFixed(1)}" y1="${(120+F*Math.sin(w)).toFixed(1)}" x2="${(120+f*Math.cos(w)).toFixed(1)}" y2="${(120+f*Math.sin(w)).toFixed(1)}" stroke="rgba(${t},${y})" stroke-width="${u}"/>`}function I(g,w,F,f,u){let y="";for(let A=0;A<F;A++){const S=A/F*Math.PI*2,C=(A+.25)/F*Math.PI*2,_=(A+.75)/F*Math.PI*2,L=(A+1)/F*Math.PI*2;y+=`${A===0?"M":"L"}${(g+u*Math.cos(S)).toFixed(1)},${(w+u*Math.sin(S)).toFixed(1)} `,y+=`L${(g+f*Math.cos(C)).toFixed(1)},${(w+f*Math.sin(C)).toFixed(1)} `,y+=`L${(g+f*Math.cos(_)).toFixed(1)},${(w+f*Math.sin(_)).toFixed(1)} `,y+=`L${(g+u*Math.cos(L)).toFixed(1)},${(w+u*Math.sin(L)).toFixed(1)} `}return y+"Z"}const R=42,$=[],x=I(120,120,14,18,13);$.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${x}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let g=0;g<8;g++){const w=g/8*Math.PI*2,F=120+R*Math.cos(w),f=120+R*Math.sin(w),y=I(F,f,10,14,10),A=g%2===0?"":"animation-direction:reverse;";$.push(`<g class="nf-kinetic-sub" style="transform-origin:${F.toFixed(1)}px ${f.toFixed(1)}px;${A}">
            <path d="${y}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${F.toFixed(1)}" cy="${f.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${F.toFixed(1)}" cy="${f.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const m=$.join(`
`);let B="";for(let g=0;g<8;g++){const w=g/8*Math.PI*2,F=120+10*Math.cos(w),f=120+10*Math.sin(w),u=120+(R-10)*Math.cos(w),y=120+(R-10)*Math.sin(w);B+=`<line x1="${F.toFixed(1)}" y1="${f.toFixed(1)}" x2="${u.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${e},0.95)"/>
                <stop offset="50%" stop-color="rgba(${t},0.75)"/>
                <stop offset="100%" stop-color="rgba(${e},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${t},0.8)"/>
                <stop offset="100%" stop-color="rgba(${e},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${e},0.85)"/>
                <stop offset="50%" stop-color="rgba(${t},0.65)"/>
                <stop offset="100%" stop-color="rgba(${e},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${e},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${e},0.2)" stroke-width="0.2"/>
        </g>
        ${O}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${s}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${T}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${v}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${a}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${b}" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${M}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${t},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${B}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${m}
        </g>
    </svg>`}function we(){const e=document.createElement("div");e.id="netflow-engine-overlay",nt=document.createElement("canvas"),nt.id="nf-matrix-canvas",e.appendChild(nt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let C=1;C<=5;C++){const _=document.createElement("div");_.className=`nf-ambient-orb nf-orb-${C}`,e.appendChild(_)}const r=document.createElement("div");r.className="nf-pat-data",e.appendChild(r);const o=document.createElement("div");o.className="nf-pat-diag-a",e.appendChild(o);const i=document.createElement("div");i.className="nf-pat-diag-b",e.appendChild(i);const c=document.createElement("div");c.className="nf-pat-circuit",e.appendChild(c);const p=document.createElement("div");p.className="nf-pat-honeycomb",e.appendChild(p);const s=document.createElement("div");s.className="nf-pat-binary",e.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",e.appendChild(l);const d=document.createElement("div");d.className="nf-pat-diamond",e.appendChild(d);const v=document.createElement("div");v.className="nf-pat-wave-h",e.appendChild(v);const T=document.createElement("div");T.className="nf-pat-radar",e.appendChild(T);const O=document.createElement("div");O.className="nf-pat-ripple-1",e.appendChild(O);const E=document.createElement("div");E.className="nf-pat-ripple-2",e.appendChild(E);const k=document.createElement("div");k.className="nf-pat-techscan",e.appendChild(k);const b=document.createElement("div");b.className="nf-center-glow",e.appendChild(b);const a=document.createElement("div");a.className="nf-pat-noise",e.appendChild(a);const M=document.createElement("div");M.className="nf-crt-scanlines",e.appendChild(M);const I=document.createElement("div");I.className="nf-vignette",e.appendChild(I);for(let C=0;C<3;C++){const _=document.createElement("div");_.className="nf-pulse-ring",e.appendChild(_)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(C=>{const _=document.createElement("div");_.className=`nf-corner-deco ${C}`,e.appendChild(_)});const R=document.createElement("button");R.className="nf-stop-btn",R.innerHTML='<span class="nf-stop-icon"></span> หยุด',R.onclick=()=>{var C;window.__NETFLOW_STOP__=!0;try{Mt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((C=chrome.runtime)!=null&&C.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},e.appendChild(R);const $=document.createElement("button");$.className="nf-close-btn",$.textContent="✕ ซ่อน",$.onclick=()=>At(),e.appendChild($);const x=document.createElement("div");x.className="nf-layout";const m=document.createElement("div");m.className="nf-core-monitor",m.id="nf-core-monitor";const B=document.createElement("div");B.className="nf-core-header",B.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,m.appendChild(B);const g=document.createElement("div");g.className="nf-terminal",g.id="nf-terminal",Vt(g),m.appendChild(g);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const F=document.createElement("div");F.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(C=>{const _=document.createElement("div");_.className=`nf-frame-corner ${C}`,F.appendChild(_)}),w.appendChild(F);const f="http://www.w3.org/2000/svg",u=document.createElementNS(f,"svg");u.setAttribute("class","nf-engine-waves"),u.setAttribute("viewBox","0 0 560 140"),u.setAttribute("preserveAspectRatio","none"),u.id="nf-engine-waves";for(let C=0;C<4;C++){const _=document.createElementNS(f,"path");_.setAttribute("fill","none"),_.setAttribute("stroke-width",C<2?"1.5":"1"),_.setAttribute("stroke",C<2?`rgba(${Y.rgb},${.14+C*.1})`:`rgba(${Y.accentRgb},${.1+(C-2)*.08})`),_.setAttribute("data-wave-idx",String(C)),u.appendChild(_)}w.appendChild(u);const y=document.createElement("div");y.className="nf-engine-brand-inner",y.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${Wt(Y.rgb,Y.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${Wt(Y.rgb,Y.accentRgb)}
        </div>
    `,w.appendChild(y);const A=document.createElement("div");A.className="nf-engine-stats",A.id="nf-engine-stats",A.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([C,_,L])=>`<div class="nf-stat-item"><span class="nf-stat-label">${C}</span><span class="nf-stat-val" id="${_}">${L}</span></div>`).join(""),w.appendChild(A),m.appendChild(w),x.appendChild(m);const S=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];lt.forEach((C,_)=>{const L=xe(C);L.classList.add(S[_]),L.id=`nf-mod-${C.id}`,x.appendChild(L)}),e.appendChild(x);for(let C=0;C<30;C++){const _=document.createElement("div");_.className="nf-particle",_.style.left=`${5+Math.random()*90}%`,_.style.bottom=`${Math.random()*40}%`,_.style.animationDuration=`${3+Math.random()*5}s`,_.style.animationDelay=`${Math.random()*4}s`;const L=.3+Math.random()*.4,z=.7+Math.random()*.3;_.style.background=`rgba(${Math.floor(Z*z)}, ${Math.floor(Q*z)}, ${Math.floor(tt*z)}, ${L})`,_.style.width=`${1+Math.random()*2}px`,_.style.height=_.style.width,e.appendChild(_)}return e}function xe(e){const t=document.createElement("div");t.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(r),e.steps.forEach(i=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${i.id}`;let p="";i.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${p}
        `,t.appendChild(c)});const o=document.createElement("div");return o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o),t}function ye(){Ht=Date.now(),$t=setInterval(()=>{const e=Math.floor((Date.now()-Ht)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),r=String(e%60).padStart(2,"0"),o=document.getElementById("nf-timer");o&&(o.textContent=`${t}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${t}:${r}`)},1e3)}function Yt(){$t&&(clearInterval($t),$t=null)}const ve=120,Ut=160,Xt=.4;let dt=null,jt=0,Kt=0,Jt=0,bt=[];function $e(e,t){bt=[];for(let r=0;r<ve;r++){const o=Math.random();let i;o<.22?i=0:o<.4?i=1:o<.55?i=2:o<.68?i=3:o<.84?i=4:i=5;const c=Math.random()*e,p=Math.random()*t,s=50+Math.random()*220,l=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);bt.push({x:i===0?Math.random()*e:c+Math.cos(l)*s,y:i===0?Math.random()*t:p+Math.sin(l)*s,vx:(Math.random()-.5)*Xt,vy:(Math.random()-.5)*Xt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:c,oCy:p,oRadius:s,oAngle:l,oSpeed:d})}}function Ee(){if(!nt)return;const e=nt;if(mt=e.getContext("2d"),!mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,bt.length===0&&$e(e.width,e.height)};t(),window.addEventListener("resize",t);let r=null,o=0,i=0,c=!1;function p(){if(!mt||!nt){ht=null;return}if(ht=requestAnimationFrame(p),c=!c,c)return;const s=mt,l=nt.width,d=nt.height;s.fillStyle=`rgba(${Z*.04|0},${Q*.04|0},${tt*.06|0},1)`,s.fillRect(0,0,l,d),(!r||o!==l||i!==d)&&(o=l,i=d,r=s.createRadialGradient(l*.5,d*.5,0,l*.5,d*.5,Math.max(l,d)*.6),r.addColorStop(0,`rgba(${Z*.08|0},${Q*.08|0},${tt*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=r,s.fillRect(0,0,l,d);const v=bt,T=v.length,O=Ut*Ut;for(let b=0;b<T;b++){const a=v[b];if(a.pulsePhase+=a.pulseSpeed,a.motion===0)a.x+=a.vx,a.y+=a.vy,a.x<0?(a.x=0,a.vx=Math.abs(a.vx)*(.8+Math.random()*.4)):a.x>l&&(a.x=l,a.vx=-Math.abs(a.vx)*(.8+Math.random()*.4)),a.y<0?(a.y=0,a.vy=Math.abs(a.vy)*(.8+Math.random()*.4)):a.y>d&&(a.y=d,a.vy=-Math.abs(a.vy)*(.8+Math.random()*.4));else if(a.motion===1)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius,a.oCx+=Math.sin(a.oAngle*.3)*.15,a.oCy+=Math.cos(a.oAngle*.3)*.15;else if(a.motion===2)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius*.5,a.oCx+=Math.sin(a.oAngle*.2)*.1,a.oCy+=Math.cos(a.oAngle*.2)*.1;else if(a.motion===3){a.oAngle+=a.oSpeed;const M=a.oAngle,I=a.oRadius*.7;a.x=a.oCx+I*Math.cos(M),a.y=a.oCy+I*Math.sin(M)*Math.cos(M),a.oCx+=Math.sin(M*.15)*.12,a.oCy+=Math.cos(M*.15)*.12}else if(a.motion===4){a.oAngle+=a.oSpeed*1.2;const M=a.oRadius*(.5+.5*Math.abs(Math.sin(a.oAngle*.15)));a.x=a.oCx+Math.cos(a.oAngle)*M,a.y=a.oCy+Math.sin(a.oAngle)*M,a.oCx+=Math.sin(a.oAngle*.1)*.18,a.oCy+=Math.cos(a.oAngle*.1)*.18}else a.oAngle+=a.oSpeed,a.x+=a.vx*.8,a.y=a.oCy+Math.sin(a.oAngle+a.x*.008)*a.oRadius*.35,a.x<-30?a.x=l+30:a.x>l+30&&(a.x=-30),a.oCy+=Math.sin(a.oAngle*.1)*.08;if(a.motion>0){const M=a.oRadius+50;a.oCx<-M?a.oCx=l+M:a.oCx>l+M&&(a.oCx=-M),a.oCy<-M?a.oCy=d+M:a.oCy>d+M&&(a.oCy=-M)}}s.beginPath(),s.strokeStyle=`rgba(${Z},${Q},${tt},0.06)`,s.lineWidth=.4;const E=new Path2D;for(let b=0;b<T;b++){const a=v[b];for(let M=b+1;M<T;M++){const I=v[M],R=a.x-I.x,$=a.y-I.y,x=R*R+$*$;x<O&&(1-x/O<.4?(s.moveTo(a.x,a.y),s.lineTo(I.x,I.y)):(E.moveTo(a.x,a.y),E.lineTo(I.x,I.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${Z},${Q},${tt},0.18)`,s.lineWidth=.8,s.stroke(E),!dt||jt!==Z||Kt!==Q||Jt!==tt){dt=document.createElement("canvas");const b=48;dt.width=b,dt.height=b;const a=dt.getContext("2d"),M=a.createRadialGradient(b/2,b/2,0,b/2,b/2,b/2);M.addColorStop(0,`rgba(${Z},${Q},${tt},0.9)`),M.addColorStop(.3,`rgba(${Z},${Q},${tt},0.35)`),M.addColorStop(1,`rgba(${Z},${Q},${tt},0)`),a.fillStyle=M,a.fillRect(0,0,b,b),jt=Z,Kt=Q,Jt=tt}const k=dt;for(let b=0;b<T;b++){const a=v[b],M=.6+.4*Math.sin(a.pulsePhase),I=a.radius*5*(.8+M*.4);s.globalAlpha=.5+M*.4,s.drawImage(k,a.x-I/2,a.y-I/2,I,I)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let b=0;b<T;b++){const a=v[b];if(a.radius>2){const M=.6+.4*Math.sin(a.pulsePhase),I=a.radius*(.8+M*.4)*.35;s.moveTo(a.x+I,a.y),s.arc(a.x,a.y,I,0,Math.PI*2)}}s.fill()}p()}function ke(){ht!==null&&(cancelAnimationFrame(ht),ht=null),nt=null,mt=null,bt=[]}let wt=null;const Ct=560,Ce=140,Zt=Ct/2,Qt=Ce/2,te=[];for(let e=0;e<=Ct;e+=8){const t=Math.abs(e-Zt)/Zt;te.push(Math.pow(Math.min(1,t*1.6),.6))}const Me=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Ct,off:e*.6,spd:.7+e*.12}));let _t=!1;function ee(){if(gt=requestAnimationFrame(ee),_t=!_t,_t)return;if(Pt+=.07,!wt){const t=document.getElementById("nf-engine-waves");if(!t){gt=null;return}wt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<wt.length;t++){const r=Me[t],o=Pt*r.spd+r.off;e.length=0,e.push(`M 0 ${Qt}`);let i=0;for(let c=0;c<=Ct;c+=8){const p=Qt+r.amp*te[i++]*Math.sin(c*r.freq+o);e.push(`L${c} ${p*10+.5|0}`)}wt[t].setAttribute("d",e.join(" "))}}function Ie(){Pt=0,ee(),Ee(),Et=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),o=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function ne(){gt!==null&&(cancelAnimationFrame(gt),gt=null),Et&&(clearInterval(Et),Et=null),wt=null,ke()}function Tt(){let e=0;const t=X.filter(s=>s.status!=="skipped").length;for(const s of X){const l=document.getElementById(`nf-proc-${s.stepId}`);if(!l)continue;l.className="nf-proc-row";const d=l.querySelector(".nf-proc-badge");switch(s.status){case"done":l.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),e++;break;case"active":l.classList.add("nf-proc-active"),d&&(d.textContent=s.progress!==void 0&&s.progress>0?`⏳ ${s.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${e}/${X.length}`);const o=document.querySelector(".nf-core-title-val"),i=document.querySelector(".nf-status-dot");e>=t&&t>0?(o&&(o.textContent="COMPLETE",o.style.color=Y.doneHex),i&&(i.style.background=Y.doneHex,i.style.boxShadow=`0 0 8px rgba(${Y.doneRgb},0.7)`)):X.some(l=>l.status==="error")?(o&&(o.textContent="ERROR",o.style.color="#f87171"),i&&(i.style.background="#ef4444",i.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(l=>l.status==="active")&&o&&(o.textContent="ACTIVE",o.style.color=Y.hex,o.style.textShadow=`0 0 10px rgba(${Y.rgb},0.5)`);const c=document.getElementById("nf-terminal"),p=c==null?void 0:c.querySelector(".nf-proc-active");p&&c&&p.scrollIntoView({behavior:"smooth",block:"center"})}function oe(){U&&U.isConnected||(qt(),U=document.createElement("button"),U.id="nf-toggle-btn",U.className="nf-toggle-visible",U.innerHTML=st?"⚡":"✕",U.title="ซ่อน/แสดง Netflow Overlay",U.onclick=()=>At(),document.body.appendChild(U))}function At(){V&&(oe(),st?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),U&&(U.innerHTML="✕"),st=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),U&&(U.innerHTML="⚡"),st=!0))}const ie={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function ae(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=ut;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const r=ie[t]||ie.red;let o;try{o=chrome.runtime.getURL(r)}catch{o=`/${r}`}const i=Y.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${o}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${i},0.45)`,e.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Bt(e=1){if(Y=me(),zt(),V&&V.isConnected){st&&At();return}if(V&&!V.isConnected&&(V=null),at&&(at.remove(),at=null),qt(),kt=e,X=St(e),e>1){const t=lt.find(o=>o.id==="video");if(t){const o=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=e;i++)o.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),o.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),o.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});t.steps=o}const r=lt.find(o=>o.id==="render");if(r){const o=r.steps.find(c=>c.id==="download");o&&(o.label="ดาวน์โหลด 720p");const i=r.steps.find(c=>c.id==="upscale");i&&(i.label="Full Video")}}V=we(),document.body.appendChild(V),st=!1,oe(),ye(),Ie(),requestAnimationFrame(()=>ae())}function re(){Yt(),ne(),st=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),U&&(U.remove(),U=null)}const Pe={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Se(e,t,r){const o=X.filter(s=>s.status==="done").length,i=X.length,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${o}/${i}`);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=kt>1?`1/${kt}`:"1/1"),t==="active"){const s=document.getElementById("nf-stat-status"),l=Pe[e]||e.toUpperCase();s&&(s.textContent=l)}else if(t==="done"&&o>=i){const s=document.getElementById("nf-stat-status");s&&(s.textContent="COMPLETE")}else if(t==="error"){const s=document.getElementById("nf-stat-status");s&&(s.textContent="ERROR")}if(r!==void 0&&r>0){const s=document.getElementById("nf-stat-progress");s&&(s.textContent=`${Math.min(100,r)}%`)}}function P(e,t,r){if(!V)return;for(const i of lt)for(const c of i.steps)c.id===e&&(c.status=t,r!==void 0&&(c.progress=r));for(const i of X)i.stepId===e&&(i.status=t,r!==void 0&&(i.progress=r));const o=document.getElementById(`nf-step-${e}`);if(o&&(o.className="nf-step",t==="active"?o.classList.add("nf-step-active"):t==="done"?o.classList.add("nf-step-done"):t==="error"&&o.classList.add("nf-step-error")),Se(e,t,r),r!==void 0){const i=document.getElementById(`nf-bar-${e}`);i&&(i.style.width=`${Math.min(100,r)}%`)}Ft(),Tt()}function pt(e){P(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function xt(e=4e3){Yt(),ne(),Ft(),Tt(),setTimeout(()=>re(),e)}function Ft(){for(const e of lt){const t=e.steps.filter(l=>l.status!=="skipped").length,r=e.steps.filter(l=>l.status==="done").length,o=e.steps.some(l=>l.status==="active"),i=t>0?Math.round(r/t*100):0,c=document.getElementById(`nf-pct-${e.id}`);c&&(c.textContent=`${i}%`);const p=document.getElementById(`nf-modbar-${e.id}`);p&&(p.style.width=`${i}%`);const s=document.getElementById(`nf-mod-${e.id}`);s&&(s.classList.remove("nf-active","nf-done"),i>=100?s.classList.add("nf-done"):o&&s.classList.add("nf-active"))}}function _e(e){var o,i,c,p;kt=e;const t=new Map;for(const s of X)t.set(s.stepId,{status:s.status,progress:s.progress});X=St(e);for(const s of X){const l=t.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(be(),e>1){const s=lt.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((o=s.steps.find(d=>d.id==="animate"))==null?void 0:o.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((c=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:c.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)l.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),l.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),l.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=l,se(s)}}const r=lt.find(s=>s.id==="render");if(r&&e>1){const s=r.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=r.steps.find(d=>d.id==="upscale");l&&(l.label="Full Video"),se(r)}Ft(),Tt()}function se(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),e.steps.forEach(i=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${i.id}`;let p="";i.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${p}
        `,t.appendChild(c)});const o=document.createElement("div");o.className="nf-mod-progress",o.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(o)}function Mt(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{Mt(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},D=e=>{console.warn(`[Netflow AI] ${e}`);try{Mt(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},Rt=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Dt=/Win/i.test(navigator.userAgent),ft=Rt?"🍎 Mac":Dt?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ft}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),c=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${o},${i}) → <${r}> "${c}"`)},!0);class Nt extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}const h=e=>new Promise((t,r)=>{if(window.__NETFLOW_STOP__)return r(new Nt);const o=setTimeout(()=>{if(window.__NETFLOW_STOP__)return r(new Nt);t()},e);h._lastId=o});function ct(){return!!window.__NETFLOW_STOP__}function le(){var r;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const o of t){if(o.closest("#netflow-engine-overlay"))continue;const i=(o.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const c of e)if(i.includes(c))return((r=o.textContent)==null?void 0:r.trim())||c}}return null}async function et(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",i)),await h(80),e.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",i)),e.dispatchEvent(new MouseEvent("click",i)),await h(50),e.click()}function Te(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,o=t.top+t.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:o};e.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",i)),e.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",i)),e.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",i))}function Ae(e){const t=[],r=document.querySelectorAll("i");for(const o of r){if((o.textContent||"").trim()!==e)continue;let c=o,p=null,s=1/0;for(let l=0;l<20&&c&&(c=c.parentElement,!(!c||c===document.body));l++){const d=c.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const v=d.width*d.height;v<s&&(p=c,s=v)}}p&&!t.includes(p)&&t.push(p)}return t.sort((o,i)=>{const c=o.getBoundingClientRect(),p=i.getBoundingClientRect();return c.left-p.left}),t}function Lt(e=!1){const t=[],r=document.querySelectorAll("video");for(const p of r){let s=p.parentElement;for(let l=0;l<10&&s;l++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){t.push({el:s,left:d.left});break}s=s.parentElement}}const o=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const p of o){const s=(p.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=p.parentElement;for(let d=0;d<10&&l;d++){const v=l.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){t.push({el:l,left:v.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const p of i){const s=(p.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=p.parentElement;for(let d=0;d<10&&l;d++){const v=l.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){t.push({el:l,left:v.left});break}l=l.parentElement}}}const c=Array.from(new Set(t.map(p=>p.el))).map(p=>t.find(s=>s.el===p));if(c.sort((p,s)=>p.left-s.left),c.length>0){const p=c[0].el,s=p.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),p}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Be(){const e=Ae("image");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const r of t){let o=r.parentElement;for(let i=0;i<10&&o;i++){const c=o.getBoundingClientRect();if(c.width>100&&c.height>80&&c.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${c.left.toFixed(0)},${c.top.toFixed(0)})`),o;o=o.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Fe(e,t){var s;const[r,o]=e.split(","),i=((s=r.match(/:(.*?);/))==null?void 0:s[1])||"image/png",c=atob(o),p=new Uint8Array(c.length);for(let l=0;l<c.length;l++)p[l]=c.charCodeAt(l);return new File([p],t,{type:i})}function yt(e){var o;const t=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((o=i.textContent)==null?void 0:o.trim())===e){const c=i.closest("button");c&&t.push(c)}return t}function Re(){const e=[...yt("add"),...yt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const o=document.querySelectorAll("button");for(const i of o){const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width<60&&c.height<60){const p=(i.textContent||"").trim();if(p==="+"||p==="add")return i}}return null}let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();i.y>r&&(r=i.y,t=o)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),t}function ce(){for(const o of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=yt(o);let c=null,p=0;for(const s of i){const l=s.getBoundingClientRect();l.y>p&&(p=l.y,c=s)}if(c)return n(`พบปุ่ม Generate จากไอคอน "${o}" ที่ y=${p.toFixed(0)}`),c}const e=document.querySelectorAll("button");let t=null,r=0;for(const o of e){const i=o.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const c=Math.abs(i.width-i.height)<10&&i.width<60,p=i.y+i.x+(c?1e3:0);p>r&&(r=p,t=o)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const o of e){const i=(o.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return o}return null}function de(){const e=document.querySelectorAll("textarea");for(const o of e)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const t=document.querySelectorAll('[contenteditable="true"]');for(const o of t)if(o.getBoundingClientRect().bottom>window.innerHeight*.5)return o;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const o of r){const i=o.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return o}return e.length>0?e[e.length-1]:null}async function Ot(e,t){var r,o,i,c;e.focus(),await h(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const p=new DataTransfer;p.setData("text/plain",t),p.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:p});e.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:p});e.dispatchEvent(l),await h(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(p){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await h(100);const p=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(p);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(s),await h(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await h(200);const p=new DataTransfer;p.setData("text/plain",t),p.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:p});e.dispatchEvent(s),await h(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=t,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await h(200),document.execCommand("paste"),await h(500);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${p.length} ตัวอักษร)`);return}}catch(p){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const p=Object.keys(e).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(p){let s=e[p];for(let l=0;l<30&&s;l++){const d=s.memoizedProps,v=s.memoizedState;if((o=d==null?void 0:d.editor)!=null&&o.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const T=d.editor;T.selection,T.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((c=(i=v==null?void 0:v.memoizedState)==null?void 0:i.editor)!=null&&c.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),v.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(p){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${p.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function De(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const r of t)e.push({input:r,origType:"file"}),r.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function Ne(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ft})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ft})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Le(e,t,r){var d;const o=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...e.map(v=>v.input)];for(const v of o)!i.includes(v)&&v.offsetParent===null&&i.push(v);for(const v of i)v.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const c=document.querySelectorAll('input[type="file"]');if(c.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ft})`),!1;let p;if(r&&r.size>0){const v=Array.from(c).filter(T=>!r.has(T));v.length>0?(p=v[v.length-1],n(`เล็งเป้า file input ใหม่ (${v.length} ใหม่, ${c.length} ทั้งหมด)`)):(p=c[c.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${c.length} ตัว`))}else p=c[c.length-1];const s=new DataTransfer;s.items.add(t);try{p.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=p.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(v){n(`กำหนด target.files ล้มเหลว: ${v.message} — ลอง defineProperty`);try{Object.defineProperty(p,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(T){return D(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${T.message}`),!1}}const l=p._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0}));try{const v=new DataTransfer;v.items.add(t);const T=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:v});p.dispatchEvent(T),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ft}`),!0}function vt(){let e=0;const t=document.querySelectorAll("img");for(const o of t){if(o.closest("#netflow-engine-overlay"))continue;const i=o.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&o.src&&o.offsetParent!==null&&e++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const o of r){if(o.closest("#netflow-engine-overlay"))continue;const i=o.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&o.offsetParent!==null&&e++}return e}async function pe(e,t){var v;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const r=Fe(e,t);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const o=vt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${o} รูป`);const i=async(T,O=8e3)=>{const E=Date.now();for(;Date.now()-E<O;){const k=vt();if(k>o)return n(`✅ [${T}] ยืนยัน: รูปย่อเพิ่มจาก ${o} → ${k}`),!0;await h(500)}return n(`⚠️ [${T}] รูปย่อไม่เพิ่ม (ยังคง ${vt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const c=Re();if(!c)return D("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const p=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${p.size} ตัว`);const s=Ne();let l=De();const d=new MutationObserver(T=>{for(const O of T)for(const E of O.addedNodes)if(E instanceof HTMLInputElement&&E.type==="file"&&(E.type="text",l.push({input:E,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),E instanceof HTMLElement){const k=E.querySelectorAll('input[type="file"]');for(const b of k)b.type="text",l.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{c.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await h(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let T=!1;const O=Date.now();for(;!T&&Date.now()-O<5e3;){const k=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const b of k){if(b===c)continue;const a=b.querySelectorAll("i");for(const M of a){const I=((v=M.textContent)==null?void 0:v.trim())||"";if((I==="upload"||I==="upload_file")&&!Array.from(b.querySelectorAll("i")).map($=>{var x;return(x=$.textContent)==null?void 0:x.trim()}).includes("drive_folder_upload")){b.click(),T=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${I}) ✅`);break}}if(T)break}if(!T)for(const b of k){if(b===c)continue;const a=b.childNodes.length<=5?(b.textContent||"").trim():"";if(a.length>0&&a.length<40){const M=a.toLowerCase();if(M==="upload"||M==="อัปโหลด"||M==="อัพโหลด"||M.includes("upload image")||M.includes("upload photo")||M.includes("อัปโหลดรูปภาพ")||M.includes("อัพโหลดรูปภาพ")||M.includes("from computer")||M.includes("จากคอมพิวเตอร์")){b.click(),T=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${a}") ✅`);break}}}T||await h(500)}return T?(await h(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Le(l,r,p)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(D(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(D("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const T of l)T.input.type!=="file"&&(T.input.type="file")}}async function Oe(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button");let o=null;for(const E of r){const k=E.textContent||"";if((k.includes("Nano Banana")||k.includes("Imagen")||k.includes("วิดีโอ")||k.includes("รูปภาพ")||k.includes("Image")||k.includes("Video"))&&E.getBoundingClientRect().bottom>window.innerHeight*.7){o=E,n(`พบปุ่มตั้งค่าจากข้อความ: "${k.substring(0,30).trim()}"`);break}}if(!o)for(const E of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const k=yt(E);for(const b of k)if(b.getBoundingClientRect().bottom>window.innerHeight*.7){o=b,n(`พบปุ่มตั้งค่าจากไอคอน: ${E}`);break}if(o)break}if(!o)return D("ไม่พบปุ่มตั้งค่า"),!1;const i=o.getBoundingClientRect(),c=i.left+i.width/2,p=i.top+i.height/2,s={bubbles:!0,cancelable:!0,clientX:c,clientY:p,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await h(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await h(1500);let l=!1,d=null;const v=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const E of v){const k=E.getAttribute("aria-controls")||"",b=E.id||"";if(k.toUpperCase().includes("IMAGE")||b.toUpperCase().includes("IMAGE")){d=E,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${k})`);break}}if(!d)for(const E of document.querySelectorAll('[role="tab"]')){const k=E.id||"";if(k.toUpperCase().includes("TRIGGER-IMAGE")){d=E,n(`พบแท็บ Image ผ่าน id: ${k}`);break}}if(!d)for(const E of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const k=(E.textContent||"").trim();if((k==="Image"||k.endsWith("Image")||k==="รูปภาพ"||k==="ภาพ")&&!k.includes("Video")&&!k.includes("วิดีโอ")){d=E,n(`พบแท็บ Image ผ่านข้อความ: "${k}"`);break}}if(d){const E=d.getAttribute("data-state")||"",k=d.getAttribute("aria-selected")||"";if(E==="active"||k==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const b=d.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",a)),await h(80),d.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",a)),d.dispatchEvent(new MouseEvent("click",a)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await h(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const T=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const E of document.querySelectorAll("button, [role='tab'], [role='option']")){const k=(E.textContent||"").trim();if(k===T||k.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const b=E.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",a)),await h(80),E.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",a)),E.dispatchEvent(new MouseEvent("click",a)),n(`เลือกทิศทาง: ${T}`),await h(400);break}}const O=`x${t}`;for(const E of document.querySelectorAll("button, [role='tab'], [role='option']"))if((E.textContent||"").trim()===O){const b=E.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",a)),await h(80),E.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",a)),E.dispatchEvent(new MouseEvent("click",a)),n(`เลือกจำนวน: ${O}`),await h(400);break}return await h(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),o.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",s)),await h(80),o.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",s)),o.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await h(600),!0}async function Ge(e){var I,R,$,x;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,r=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),o=r?r[1]:"unknown",i=Rt?"macOS":Dt?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",c=Rt?((R=(I=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:I[1])==null?void 0:R.replace(/_/g,"."))||"":Dt&&(($=t.match(/Windows NT ([0-9.]+)/))==null?void 0:$[1])||"",p=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${c} | Chrome ${o}`),n(`🌐 ภาษา: ${p} | หน้าจอ: ${s} | แพลตฟอร์ม: ${ft}`),n("══════════════════════════════════════════");try{It(e.theme)}catch{}try{Bt()}catch(m){console.warn("Overlay show error:",m)}const l=[],d=[];try{P("settings","active");const m=e.orientation||"horizontal",B=e.outputCount||1,g=await Oe(m,B);l.push(g?"✅ Settings":"⚠️ Settings"),P("settings",g?"done":"error")}catch(m){D(`ตั้งค่าผิดพลาด: ${m.message}`),l.push("⚠️ Settings"),P("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const v=()=>{const m=document.querySelectorAll("span, div, p, label");for(const B of m){const g=(B.textContent||"").trim();if(/^\d{1,3}%$/.test(g)){if(g==="100%")return null;const w=B.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>0&&w.top<window.innerHeight)return g}}return null},T=async m=>{n(`รอการอัพโหลด ${m} เสร็จ...`),await h(2e3);const B=Date.now(),g=6e4;let w="",F=Date.now();const f=15e3;for(;Date.now()-B<g;){const u=v();if(u){if(u!==w)w=u,F=Date.now();else if(Date.now()-F>f){n(`✅ อัพโหลด ${m} — % ค้างที่ ${u} นาน ${f/1e3} วินาที ถือว่าเสร็จ`),await h(1e3);return}n(`กำลังอัพโหลด: ${u} — รอ...`),await h(1500)}else{n(`✅ อัพโหลด ${m} เสร็จ — ไม่พบตัวบอก %`),await h(1e3);return}}D(`⚠️ อัพโหลด ${m} หมดเวลาหลัง ${g/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){P("upload-char","active");try{const m=await pe(e.characterImage,"character.png");l.push(m?"✅ ตัวละคร":"⚠️ ตัวละคร"),m||d.push("character upload failed"),P("upload-char",m?"done":"error")}catch(m){D(`อัพโหลดตัวละครผิดพลาด: ${m.message}`),l.push("❌ ตัวละคร"),d.push("character upload error"),P("upload-char","error")}await T("character")}else pt("upload-char");if(e.productImage){P("upload-prod","active");try{const m=await pe(e.productImage,"product.png");l.push(m?"✅ สินค้า":"⚠️ สินค้า"),m||d.push("product upload failed"),P("upload-prod",m?"done":"error")}catch(m){D(`อัพโหลดสินค้าผิดพลาด: ${m.message}`),l.push("❌ สินค้า"),d.push("product upload error"),P("upload-prod","error")}await T("product")}else pt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800);const O=v();O&&(n(`⚠️ อัพโหลดยังแสดง ${O} — รอเพิ่มเติม...`),await T("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await h(1e3);const E=(e.characterImage?1:0)+(e.productImage?1:0);if(E>0){let m=vt();m<E&&(n(`⏳ เห็นรูปย่อแค่ ${m}/${E} — รอ 3 วินาที...`),await h(3e3),m=vt()),m>=E?n(`✅ ยืนยันรูปย่ออ้างอิง: ${m}/${E}`):D(`⚠️ คาดว่าจะมี ${E} รูปย่อ แต่พบ ${m} — ดำเนินการต่อ`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{xt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),P("img-prompt","active"),await h(1e3);const k=de();k?(await Ot(k,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),P("img-prompt","done")):(D("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),d.push("prompt input not found"),P("img-prompt","error")),await h(800);const b=new Set;document.querySelectorAll("img").forEach(m=>{m.src&&b.add(m.src)}),n(`บันทึกรูปเดิม: ${b.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),P("img-generate","active"),await h(500);const a=ce();if(a){const m=a.getBoundingClientRect(),B=m.left+m.width/2,g=m.top+m.height/2,w={bubbles:!0,cancelable:!0,clientX:B,clientY:g,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",w)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",w)),a.dispatchEvent(new MouseEvent("click",w)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await h(500),a.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",w)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",w)),a.dispatchEvent(new MouseEvent("click",w)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),P("img-generate","done")}else D("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),d.push("generate button not found"),P("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),P("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await h(15e3);const m=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const u of f){if(u.closest("#netflow-engine-overlay"))continue;const y=(u.textContent||"").trim();if(y.length>10)continue;const A=y.match(/(\d{1,3})\s*%/);if(!A)continue;const S=parseInt(A[1],10);if(S<1||S>100)continue;const C=u.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return S}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let B=null,g=-1,w=0;const F=Date.now();for(;!B&&Date.now()-F<18e4;){const f=document.querySelectorAll("img");for(const u of f){if(b.has(u.src)||!(u.alt||"").toLowerCase().includes("generated"))continue;const A=u.getBoundingClientRect();if(A.width>120&&A.height>120&&A.top>0&&A.top<window.innerHeight*.85){const S=u.closest("div");if(S){B=S,n(`พบรูป AI จาก alt="${u.alt}": ${u.src.substring(0,80)}...`);break}}}if(!B)for(const u of f){if(b.has(u.src))continue;const y=u.closest("div"),A=(y==null?void 0:y.textContent)||"";if(A.includes("product.png")||A.includes("character.png")||A.includes(".png")||A.includes(".jpg"))continue;const S=u.getBoundingClientRect();if(S.width>120&&S.height>120&&S.top>0&&S.top<window.innerHeight*.85){const C=u.closest("div");if(C){B=C,n(`พบรูปใหม่ (สำรอง): ${u.src.substring(0,80)}...`);break}}}if(!B){if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const u=le();if(u){D(`❌ สร้างรูปล้มเหลว: ${u}`),d.push(`image gen failed: ${u}`),P("img-wait","error");break}const y=m();y!==null?(y!==g&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${y}%`),g=y,P("img-wait","active",y)),w=Date.now()):g>30&&Math.floor((Date.now()-w)/1e3)>=3&&n(`🖼️ % หายที่ ${g}% — รูปน่าจะเสร็จแล้ว`),await h(3e3)}}if(!B)D("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),P("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),P("img-wait","done",100);const f=B.getBoundingClientRect(),u=f.left+f.width/2,y=f.top+f.height/2,A={bubbles:!0,cancelable:!0,clientX:u,clientY:y};B.dispatchEvent(new PointerEvent("pointerenter",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseenter",A)),B.dispatchEvent(new PointerEvent("pointerover",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mouseover",A)),B.dispatchEvent(new PointerEvent("pointermove",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),B.dispatchEvent(new MouseEvent("mousemove",A)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await h(1500);let S=null;for(const C of["more_vert","more_horiz","more"]){const _=yt(C);for(const L of _){const z=L.getBoundingClientRect();if(z.top>=f.top-20&&z.top<=f.bottom&&z.right>=f.right-150&&z.right<=f.right+20){S=L;break}}if(S)break}if(!S){const C=document.querySelectorAll("button");for(const _ of C){const L=_.getBoundingClientRect();if(L.width<50&&L.height<50&&L.top>=f.top-10&&L.top<=f.top+60&&L.left>=f.right-80){const z=_.querySelectorAll("i");for(const K of z)if((((x=K.textContent)==null?void 0:x.trim())||"").includes("more")){S=_;break}if(S)break;const q=_.getAttribute("aria-label")||"";if(q.includes("เพิ่มเติม")||q.includes("more")){S=_;break}}}}if(!S)D("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const C=S.getBoundingClientRect(),_=C.left+C.width/2,L=C.top+C.height/2,z={bubbles:!0,cancelable:!0,clientX:_,clientY:L,button:0};S.dispatchEvent(new PointerEvent("pointerdown",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mousedown",z)),await h(80),S.dispatchEvent(new PointerEvent("pointerup",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),S.dispatchEvent(new MouseEvent("mouseup",z)),S.dispatchEvent(new MouseEvent("click",z)),n("คลิกปุ่ม 3 จุดแล้ว"),await h(1500);let q=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const W of K){const J=(W.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){q=W;break}}if(!q)D("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const W=q.getBoundingClientRect(),J=W.left+W.width/2,G=W.top+W.height/2,N={bubbles:!0,cancelable:!0,clientX:J,clientY:G,button:0};q.dispatchEvent(new PointerEvent("pointerdown",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mousedown",N)),await h(80),q.dispatchEvent(new PointerEvent("pointerup",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mouseup",N)),q.dispatchEvent(new MouseEvent("click",N)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),P("animate","done"),await h(3e3)}}}}catch(m){D(`ขั้น 4 ผิดพลาด: ${m.message}`),l.push("⚠️ Animate")}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{xt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),P("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await h(3e3);let m=!1;const B=document.querySelectorAll("button, span, div");for(const F of B){const f=(F.textContent||"").trim(),u=F.getBoundingClientRect();if((f==="วิดีโอ"||f==="Video"||f.includes("วิดีโอ"))&&u.bottom>window.innerHeight*.7){m=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}m||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await h(1e3);const g=de();g?(await Ot(g,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),P("vid-prompt","done")):(D("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),d.push("video prompt input not found"),P("vid-prompt","error")),await h(1e3),P("vid-generate","active");const w=ce();if(w){const F=w.getBoundingClientRect(),f=F.left+F.width/2,u=F.top+F.height/2,y={bubbles:!0,cancelable:!0,clientX:f,clientY:u,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",y)),await h(80),w.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",y)),w.dispatchEvent(new MouseEvent("click",y)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),P("vid-generate","done"),await h(500),w.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",y)),await h(80),w.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",y)),w.dispatchEvent(new MouseEvent("click",y)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else D("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),d.push("video generate button not found"),P("vid-generate","error")}catch(m){D(`ขั้น 5 ผิดพลาด: ${m.message}`),l.push("⚠️ Video Gen"),d.push(`video gen error: ${m.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pt("animate"),pt("vid-prompt"),pt("vid-generate"),pt("vid-wait");if(e.videoPrompt){P("vid-wait","active");const m=e.sceneCount||1,B=e.videoScenePrompts||[e.videoPrompt];if(m>1)try{_e(m)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${m>1?`ต่อ ${m} ฉาก`:"ดาวน์โหลด"} ===`);const g=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const u of f){if(u.closest("#netflow-engine-overlay"))continue;const y=(u.textContent||"").trim();if(y.length>10)continue;const A=y.match(/(\d{1,3})\s*%/);if(!A)continue;const S=parseInt(A[1],10);if(S<1||S>100)continue;const C=u.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return S}return null},w=async(f=6e5)=>{n("รอการสร้างวิดีโอ..."),P("vid-wait","active"),await h(5e3);const u=()=>{const N=document.querySelectorAll("div, span, p, label, strong, small");let H=0;for(const j of N){if(j.closest("#netflow-engine-overlay"))continue;const ot=(j.textContent||"").trim();if(ot.includes("%")&&ot.length<15){const rt=j.tagName.toLowerCase(),ge=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Gt=j.getBoundingClientRect();if(n(`  🔍 "${ot}" ใน <${rt}.${ge}> ที่ (${Gt.left.toFixed(0)},${Gt.top.toFixed(0)}) w=${Gt.width.toFixed(0)}`),H++,H>=5)break}}H===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},y=Lt();n(y?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),u();const A=Date.now();let S=-1,C=0,_=!1;for(;Date.now()-A<f;){const N=g();if(N!==null){if(N!==S&&(n(`ความคืบหน้าวิดีโอ: ${N}%`),S=N,P("vid-wait","active",N)),C=Date.now(),N>=100){n("✅ ตรวจพบ 100%!"),_=!0;break}}else if(S>30){const H=Math.floor((Date.now()-C)/1e3);if(H>=5){n(`✅ % หายไปที่ ${S}% (หาย ${H} วินาที) — วิดีโอเสร็จ!`),_=!0;break}n(`⏳ % หายที่ ${S}% — ยืนยันใน ${5-H} วินาที...`)}else{const H=Math.floor((Date.now()-A)/1e3);H%15<3&&n(`⏳ รอ... (${H} วินาที) ไม่พบ %`)}if(!_&&S>0&&Lt(!0)&&!y){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${S}% — วิดีโอเสร็จ!`),_=!0;break}if(ct())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(S<1){const H=le();if(H)return D(`❌ สร้างวิดีโอล้มเหลว: ${H}`),null}await h(3e3)}const L=Lt();if(!L)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),P("vid-wait","error"),null;const z=L;_?(P("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await h(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const q=z.getBoundingClientRect();let K=q.left+q.width/2,W=q.top+q.height/2,J=z;const G=z.querySelector("video, img, canvas");if(G){const N=G.getBoundingClientRect();N.width>50&&N.height>50&&(K=N.left+N.width/2,W=N.top+N.height/2,J=G,n(`🎯 พบรูปย่อ <${G.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${W.toFixed(0)}) ${N.width.toFixed(0)}x${N.height.toFixed(0)}`))}else W=q.top+q.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${W.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${W.toFixed(0)})...`),Te(J);for(let N=0;N<8;N++){const H={bubbles:!0,cancelable:!0,clientX:K+N%2,clientY:W};J.dispatchEvent(new PointerEvent("pointermove",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",H)),await h(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:m,scenePrompts:B,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${m} ฉาก, ${B.length} prompts, theme: ${e.theme})`)}catch(N){n(`⚠️ ไม่สามารถบันทึก pending action: ${N.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),z},F=async f=>{const u=f.getBoundingClientRect(),y=u.left+u.width/2,A=u.top+u.height/2,S={bubbles:!0,cancelable:!0,clientX:y,clientY:A,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",S)),await h(80),f.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",S)),f.dispatchEvent(new MouseEvent("click",S)),await h(50),f.click(),n("คลิกการ์ดวิดีโอแล้ว"),await h(2e3)};try{if(!await w())D("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),P("vid-wait","error");else{l.push("✅ Video Complete"),P("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await h(3e3);const u=await new Promise(y=>{chrome.storage.local.get("netflow_pending_action",A=>{if(chrome.runtime.lastError){y(null);return}y((A==null?void 0:A.netflow_pending_action)||null)})});u&&!u._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),u.action==="mute_video"?await fe(u.sceneCount||1,u.scenePrompts||[],u.theme):u.action==="wait_scene_gen_and_download"&&await ue(u.sceneCount||2,u.currentScene||2,u.theme))}}catch(f){D(`ขั้น 6 ผิดพลาด: ${f.message}`),l.push("⚠️ Step6"),d.push(`step 6: ${f.message}`)}}const M=d.length===0;try{xt(M?5e3:8e3)}catch(m){console.warn("Overlay complete error:",m)}return{success:M,message:M?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${d.join(", ")}`,step:M?"done":"partial"}}async function fe(e,t=[],r){var M;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&It(r)}catch{}try{Bt(e)}catch(I){n(`⚠️ showOverlay error: ${I.message}`)}try{const I=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const R of I)P(R,"done");e>=2&&P("scene2-prompt","active"),n(`✅ overlay restored: ${I.length} steps done, sceneCount=${e}`)}catch(I){n(`⚠️ overlay restore error: ${I.message}`)}await h(1500);const o=(()=>{for(const I of document.querySelectorAll("button")){const R=I.querySelectorAll("i");for(const x of R){const m=(x.textContent||"").trim();if(m==="volume_up"||m==="volume_off"||m==="volume_mute"){const B=I.getBoundingClientRect();if(B.width>0&&B.height>0)return I}}const $=(I.getAttribute("aria-label")||"").toLowerCase();if($.includes("mute")||$.includes("ปิดเสียง")){const x=I.getBoundingClientRect();if(x.width>0&&x.height>0)return I}}return null})();if(o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await h(2e3);for(let f=2;f<=e;f++){const u=t[f-1];if(!u){D(`ไม่พบ prompt สำหรับฉากที่ ${f}`);continue}n(`── ฉากที่ ${f}/${e}: วาง prompt + generate ──`);let y=null;const A=Date.now();for(;!y&&Date.now()-A<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(y=G[G.length-1]),!y){const N=document.querySelectorAll("[role='textbox'][contenteditable='true']");N.length>0&&(y=N[N.length-1])}y||await h(1e3)}if(!y){D("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${y.tagName.toLowerCase()}> ${y.className.substring(0,40)}`),await Ot(y,u),n(`วาง prompt ฉาก ${f} (${u.length} ตัวอักษร) ✅`);try{P(`scene${f}-prompt`,"done"),P(`scene${f}-gen`,"active")}catch{}await h(1e3);const S=y.getBoundingClientRect();let C=null,_=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const N=G.querySelectorAll("i");let H=!1;for(const rt of N)if((rt.textContent||"").trim()==="arrow_forward"){H=!0;break}if(!H)continue;const j=G.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const ot=Math.abs(j.top-S.top)+Math.abs(j.right-S.right);ot<_&&(_=ot,C=G)}if(!C)for(const G of document.querySelectorAll("button")){const N=G.querySelectorAll("i");for(const H of N)if((H.textContent||"").trim()==="arrow_forward"){const j=G.getBoundingClientRect();if(j.width>0&&j.height>0){C=G;break}}if(C)break}if(!C){D("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:e,currentScene:f}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${f}/${e})`),await et(C),n(`คลิก Generate ฉาก ${f} ✅`);try{P(`scene${f}-gen`,"done"),P(`scene${f}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${f} gen เสร็จ ──`),await h(5e3);let L=0,z=0;const q=Date.now(),K=6e5,W=5e3;let J=!1;for(;Date.now()-q<K;){let G=null;const N=document.querySelectorAll("div, span, p, label, strong, small");for(const H of N){if(H.closest("#netflow-engine-overlay"))continue;const ot=(H.textContent||"").trim().match(/^(\d{1,3})%$/);if(ot){const rt=H.getBoundingClientRect();if(rt.width>0&&rt.height>0&&rt.width<120&&rt.height<60){G=parseInt(ot[1],10);break}}}if(G!==null){if(G!==L){n(`🎬 ฉาก ${f} ความคืบหน้า: ${G}%`),L=G;try{P(`scene${f}-wait`,"active",G)}catch{}}z=0}else if(L>0){if(z===0)z=Date.now(),n(`🔍 ฉาก ${f}: % หายไป (จาก ${L}%) — กำลังยืนยัน...`);else if(Date.now()-z>=W){n(`✅ ฉาก ${f}: % หายไป ${W/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุด");return}await h(2e3)}J||D(`ฉาก ${f} หมดเวลา`),n(`✅ ฉาก ${f} เสร็จแล้ว`);try{P(`scene${f}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await h(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{P("download","active")}catch{}await h(2e3);const I=Date.now();let R=null;const $=Date.now();for(;!R&&Date.now()-$<1e4;){for(const f of document.querySelectorAll("button")){const u=f.querySelector("i");if(u&&(u.textContent||"").trim()==="download"){const y=f.getBoundingClientRect();if(y.width>0&&y.height>0){R=f;break}}}R||await h(1e3)}if(!R){D("ไม่พบปุ่มดาวน์โหลด");return}await et(R),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await h(1500);let x=null;for(let f=0;f<3&&!x;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let u=null;const y=Date.now();for(;!u&&Date.now()-y<5e3;){for(const L of document.querySelectorAll("[role='menuitem']"))if((L.textContent||"").trim().includes("Full Video")&&L.querySelector("i")){const q=L.getBoundingClientRect();if(q.width>0&&q.height>0){u=L;break}}u||await h(500)}if(!u){D("ไม่พบ Full Video");continue}const A=u.getBoundingClientRect(),S=A.left+A.width/2,C=A.top+A.height/2;u.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:S,clientY:C})),u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:S,clientY:C})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:S,clientY:C})),await et(u),n("คลิก/hover Full Video ✅"),await h(2e3);const _=Date.now();for(;!x&&Date.now()-_<8e3;){for(const L of document.querySelectorAll("button[role='menuitem']")){const z=L.querySelectorAll("span");for(const q of z)if((q.textContent||"").trim()==="720p"){const K=L.getBoundingClientRect();if(K.width>0&&K.height>0){x=L;break}}if(x)break}x||(u.isConnected&&(u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:S,clientY:C})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:S+20,clientY:C}))),await h(500))}}if(!x){D("ไม่พบ 720p");return}await et(x),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const m=Date.now();let B=!1,g=!1;for(;Date.now()-m<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const u=(f.textContent||"").trim();if(u==="Download complete!"||u==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),B=!0;break}(u.includes("Downloading your extended video")||u.includes("กำลังดาวน์โหลด"))&&(g||(g=!0,n("⏳ กำลังดาวน์โหลด...")))}if(B)break;if(g){let f=!1;for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((u.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),B=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await h(2e3)}if(!B){D("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let w=!1;const F=Date.now();for(;Date.now()-F<6e4&&!w;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:I},u=>{chrome.runtime.lastError?D(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):u!=null&&u.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${u.message}`),w=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${u==null?void 0:u.message}`),f()})})}catch(f){D(`ตรวจสอบผิดพลาด: ${f.message}`)}w||await h(3e3)}w||D("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),xt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await h(2e3);const i=(I,R="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const $ of document.querySelectorAll(R)){const x=($.textContent||"").trim();if(x.includes(I)&&x.length<100){const m=$.getBoundingClientRect();if(m.width>0&&m.height>0&&m.top>=0)return $}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const p=Date.now();for(;!c&&Date.now()-p<1e4;){for(const I of document.querySelectorAll("button, [role='button']")){const R=(I.textContent||"").trim(),$=R.toLowerCase();if(($.includes("download")||$.includes("ดาวน์โหลด"))&&R.length<80){const x=I.getBoundingClientRect();if(x.width>0&&x.height>0){c=I;break}}}if(!c)for(const I of document.querySelectorAll("button")){const R=(I.getAttribute("aria-label")||"").toLowerCase();if(R.includes("download")||R.includes("ดาวน์")){const $=I.getBoundingClientRect();if($.width>0&&$.height>0){c=I;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await h(1e3))}if(!c){D("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await et(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await h(1500);const s=Date.now();let l=null;const d=Date.now();for(;!l&&Date.now()-d<5e3;)l=i("1080p"),l||(n("รอ 1080p..."),await h(500));if(!l){D("ไม่พบ 1080p");return}await et(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const v=Date.now();let T=!1,O=!1,E=0;const k=3e3;for(;Date.now()-v<3e5;){const R=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(R.includes("upscaling complete")||R.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),T=!0;break}for(const x of document.querySelectorAll("div, span, p")){const m=(x.textContent||"").trim().toLowerCase();if(m.length<60&&(m.includes("upscaling complete")||m.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(M=x.textContent)==null?void 0:M.trim()}")`),T=!0;break}}if(T)break;if(R.includes("upscaling your video")||R.includes("กำลังอัปสเกล")){O=!0,E=0;const x=Math.floor((Date.now()-v)/1e3);n(`⏳ กำลังอัปสเกล... (${x} วินาที)`)}else if(O){if(E===0)E=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-E>=k){n(`✅ ข้อความ Upscaling หายไป ${k/1e3} วินาที — เสร็จ!`),T=!0;break}}else{const x=Math.floor((Date.now()-v)/1e3);x%10<3&&n(`⏳ รอ Upscale... (${x} วินาที)`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await h(2e3)}if(!T){D("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let b=!1;const a=Date.now();for(;Date.now()-a<6e4&&!b;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},R=>{chrome.runtime.lastError?D(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):R!=null&&R.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${R.message}`),b=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${R==null?void 0:R.message}`),I()})})}catch(I){D(`ตรวจสอบผิดพลาด: ${I.message}`)}b||await h(3e3)}b||D("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function ue(e=2,t=2,r){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&It(r)}catch{}try{Bt(e)}catch($){n(`⚠️ showOverlay error: ${$.message}`)}try{const $=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let x=2;x<=t;x++)$.push(`scene${x}-prompt`,`scene${x}-gen`),x<t&&$.push(`scene${x}-wait`);for(const x of $)P(x,"done");P(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${$.length} steps done (scene ${t}/${e} navigate)`)}catch($){n(`⚠️ overlay restore error: ${$.message}`)}await h(2e3);const o=(()=>{for(const $ of document.querySelectorAll("button")){const x=$.querySelectorAll("i");for(const m of x){const B=(m.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const g=$.getBoundingClientRect();if(g.width>0&&g.height>0)return $}}}return null})();o?(o.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let i=0,c=0;const p=Date.now(),s=6e5,l=5e3;let d=!1,v=0;for(;Date.now()-p<s;){let $=null;const x=document.querySelectorAll("div, span, p, label, strong, small");for(const m of x){if(m.closest("#netflow-engine-overlay"))continue;const g=(m.textContent||"").trim().match(/^(\d{1,3})%$/);if(g){const w=m.getBoundingClientRect();if(w.width>0&&w.height>0&&w.width<120&&w.height<60){$=parseInt(g[1],10);break}}}if($!==null){if(v=0,$!==i){n(`🎬 scene ${t} ความคืบหน้า: ${$}%`),i=$;try{P(`scene${t}-wait`,"active",$)}catch{}}c=0}else if(i>0){if(c===0)c=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${i}%) — กำลังยืนยัน...`);else if(Date.now()-c>=l){n(`✅ scene ${t}: % หายไป ${l/1e3} วินาที — เจนเสร็จ!`),d=!0;break}}else if(v++,v>=15){const m=document.querySelectorAll("video");let B=!1;for(const g of m)if(g.readyState>=2&&!g.paused&&g.getBoundingClientRect().width>200){B=!0;break}if(B){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),d=!0;break}if(v>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),d=!0;break}}await h(2e3)}d||n(`⚠️ scene ${t} หมดเวลา — ลองดาวน์โหลดต่อ`);try{P(`scene${t}-wait`,"done",100)}catch{}n(`✅ scene ${t} เสร็จ — เริ่มดาวน์โหลด`),await h(3e3);try{P("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const T=Date.now();let O=null;const E=Date.now();for(;!O&&Date.now()-E<1e4;){for(const $ of document.querySelectorAll("button")){const x=$.querySelector("i");if(x&&(x.textContent||"").trim()==="download"){const m=$.getBoundingClientRect();if(m.width>0&&m.height>0){O=$;break}}}O||await h(1e3)}if(!O){D("ไม่พบปุ่มดาวน์โหลด");return}await et(O),n("คลิกดาวน์โหลดแล้ว ✅");try{P("download","done"),P("upscale","active")}catch{}await h(1500);let k=null;for(let $=0;$<3&&!k;$++){$>0&&n(`🔄 ลองหา 720p ครั้งที่ ${$+1}...`);let x=null;const m=Date.now();for(;!x&&Date.now()-m<5e3;){for(const f of document.querySelectorAll("[role='menuitem']"))if((f.textContent||"").trim().includes("Full Video")&&f.querySelector("i")){const y=f.getBoundingClientRect();if(y.width>0&&y.height>0){x=f;break}}x||await h(500)}if(!x){D("ไม่พบ Full Video");continue}const B=x.getBoundingClientRect(),g=B.left+B.width/2,w=B.top+B.height/2;x.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:g,clientY:w})),x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:g,clientY:w})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g,clientY:w})),await et(x),n("คลิก/hover Full Video ✅"),await h(2e3);const F=Date.now();for(;!k&&Date.now()-F<8e3;){for(const f of document.querySelectorAll("button[role='menuitem']")){const u=f.querySelectorAll("span");for(const y of u)if((y.textContent||"").trim()==="720p"){const A=f.getBoundingClientRect();if(A.width>0&&A.height>0){k=f;break}}if(k)break}k||(x.isConnected&&(x.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:g,clientY:w})),x.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g+20,clientY:w}))),await h(500))}}if(!k){D("ไม่พบ 720p");return}await et(k),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const b=Date.now();let a=!1,M=!1;for(;Date.now()-b<3e5;){for(const $ of document.querySelectorAll("div[data-title] div, div[data-content] div")){const x=($.textContent||"").trim();if(x==="Download complete!"||x==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),a=!0;break}(x.includes("Downloading your extended video")||x.includes("กำลังดาวน์โหลด"))&&(M||(M=!0,n("⏳ กำลังดาวน์โหลด...")))}if(a)break;if(M){let $=!1;for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((x.textContent||"").trim().includes("Downloading")){$=!0;break}if(!$){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),a=!0;break}}await h(2e3)}if(!a){D("ดาวน์โหลดหมดเวลา");return}try{P("upscale","done",100),P("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await h(5e3);let I=!1;const R=Date.now();for(;Date.now()-R<6e4&&!I;){try{await new Promise($=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:T},x=>{chrome.runtime.lastError?D(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):x!=null&&x.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${x.message}`),I=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${x==null?void 0:x.message}`),$()})})}catch($){D(`ตรวจสอบผิดพลาด: ${$.message}`)}I||await h(3e3)}I||D("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{P("open","done"),xt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function ze(){try{const e=await new Promise(c=>{chrome.storage.local.get("netflow_pending_action",p=>{if(chrome.runtime.lastError){c(null);return}c((p==null?void 0:p.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-e.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const o=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=o,await new Promise(c=>{chrome.storage.local.set({netflow_pending_action:e},()=>c())}),await h(300),!await new Promise(c=>{chrome.storage.local.get("netflow_pending_action",p=>{const s=p==null?void 0:p.netflow_pending_action;c((s==null?void 0:s._claimed)===o)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(r/1e3)} วินาที)`),e.action==="mute_video"?await fe(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await ue(e.sceneCount||2,e.currentScene||2,e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,r)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Ge(e).then(o=>n(`✅ ระบบอัตโนมัติเสร็จ: ${o.message}`)).catch(o=>{if(o instanceof Nt||(o==null?void 0:o.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Mt("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{re()}catch{}}else console.error("[Netflow AI] Generate error:",o)}),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return r({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await h(500);const o=Be();if(!o){D("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=o.getBoundingClientRect(),c=i.left+i.width/2,p=i.top+i.height/2;n(`การ์ดรูปที่ (${c.toFixed(0)}, ${p.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(c,p);l?(await et(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await et(o),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await h(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),ze(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),o=Math.round(e.clientX),i=Math.round(e.clientY),c=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${o},${i}) → <${r}> "${c}"`)},!0)})();
