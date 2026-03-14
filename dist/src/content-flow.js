(function(){"use strict";const fe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Z=fe.green,Ce=null;function Fe(t){t&&fe[t]&&(Ce=t,Z=fe[t],dt(),requestAnimationFrame(()=>Mt()))}function qt(){if(Ce&&fe[Ce])return fe[Ce];try{const t=localStorage.getItem("netflow_app_theme");if(t&&fe[t])return fe[t]}catch{}return fe.green}let re=0,se=255,le=65;function dt(){const t=Z.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(re=parseInt(t[1],16),se=parseInt(t[2],16),le=parseInt(t[3],16))}const pt='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ft='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let z=null,Q=null,X=null,ut=0,ze=null,Te=null,Ve=null,Xe=0,ge=!1,de=null,Ie=null,Se=null,ye=1,Y=[];function Ue(t){const e=[{stepId:"open-flow",label:"เปิด Google Flow",status:"waiting"},{stepId:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let o=2;o<=t;o++)e.push({stepId:`scene${o}-prompt`,label:`ฉาก ${o} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${o}-gen`,label:`ฉาก ${o} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${o}-wait`,label:`ฉาก ${o} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const ce=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"open-flow",label:"เปิด Google Flow",status:"waiting"},{id:"new-project",label:"สร้างโปรเจคใหม่",status:"waiting"},{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=Ue(1);function Wt(t){const e=t.rgb,o=t.accentRgb,a=t.doneRgb,i=t.hex,d=t.accentHex,l=t.doneHex,c=(()=>{const y=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!y)return"#4ade80";const r=m=>Math.min(255,m+80);return`#${[1,2,3].map(m=>r(parseInt(y[m],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const y=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!y)return"#4ade80";const r=m=>Math.min(255,m+60);return`#${[1,2,3].map(m=>r(parseInt(y[m],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),x=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,v=p?parseInt(p[1],16)/x:0,S=p?parseInt(p[2],16)/x:1,F=p?parseInt(p[3],16)/x:.25,C=y=>`${Math.round(v*y)}, ${Math.round(S*y)}, ${Math.round(F*y)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${o},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${o},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${C(18)},0.94) 0%, rgba(${C(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${o},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${o},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${o},0.18); }
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
        rgba(${o},0.054) 70px,
        rgba(${o},0.054) 71px
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
        rgba(${o},0.045) 113px,
        rgba(${o},0.045) 114px
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
    background: radial-gradient(circle, rgba(${o},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${o},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${o},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${o},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${o},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${o},0.05) 2px, transparent 2px),
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
        rgba(${o},0.06) 195deg,
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
        rgba(${o},0.035) 18px,
        rgba(${o},0.035) 19px
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
        radial-gradient(circle, rgba(${o},0.05) 1px, transparent 1px);
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
            rgba(${o},0.025) 40px, rgba(${o},0.025) 41px
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
        rgba(${o},0.035) 25px, rgba(${o},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${o},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${o},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${o},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${o},0.08) 0%, transparent 50%),
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
        rgba(${o},0.04) 2.5%,
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
    background: rgba(${C(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${C(180)},0.05),
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
            0 0 200px rgba(${C(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${C(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${o},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${o},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${o},0.4)); }
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
    color: ${c};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${a}, 0.12);
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
    background: linear-gradient(180deg, rgba(${C(5)},0.95) 0%, rgba(${C(12)},0.98) 100%);
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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${o},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${o},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${C(6)},0.75) 0%, rgba(${C(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${o},0.08);
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
    color: rgba(${o},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${o},0.7),
        0 0 12px rgba(${o},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${C(8)}, 0.88);
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
    background: rgba(${C(8)},0.8);
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
    background: rgba(${C(8)}, 0.9);
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
    color: ${s};
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

    `}function Ke(){X||(X=document.createElement("style"),X.id="netflow-overlay-styles",X.textContent=Wt(Z),document.head.appendChild(X))}function gt(t){t.innerHTML="",Y.forEach((e,o)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${o+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function mt(){const t=document.getElementById("nf-terminal");if(!t)return;gt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function ht(t,e){let c="";for(let S=0;S<20;S++){const F=S/20*Math.PI*2,C=(S+.2)/20*Math.PI*2,y=(S+.5)/20*Math.PI*2,r=(S+.8)/20*Math.PI*2,m=(S+1)/20*Math.PI*2;c+=`${S===0?"M":"L"}${(120+100*Math.cos(F)).toFixed(1)},${(120+100*Math.sin(F)).toFixed(1)} `,c+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `,c+=`L${(120+112*Math.cos(y)).toFixed(1)},${(120+112*Math.sin(y)).toFixed(1)} `,c+=`L${(120+100*Math.cos(r)).toFixed(1)},${(120+100*Math.sin(r)).toFixed(1)} `,c+=`L${(120+100*Math.cos(m)).toFixed(1)},${(120+100*Math.sin(m)).toFixed(1)} `}c+="Z";const s=14,p=72,x=62;let v="";for(let S=0;S<s;S++){const F=S/s*Math.PI*2,C=(S+.25)/s*Math.PI*2,y=(S+.75)/s*Math.PI*2,r=(S+1)/s*Math.PI*2;v+=`${S===0?"M":"L"}${(120+x*Math.cos(F)).toFixed(1)},${(120+x*Math.sin(F)).toFixed(1)} `,v+=`L${(120+p*Math.cos(C)).toFixed(1)},${(120+p*Math.sin(C)).toFixed(1)} `,v+=`L${(120+p*Math.cos(y)).toFixed(1)},${(120+p*Math.sin(y)).toFixed(1)} `,v+=`L${(120+x*Math.cos(r)).toFixed(1)},${(120+x*Math.sin(r)).toFixed(1)} `}return v+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${v}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${x}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function jt(){const t=document.createElement("div");t.id="netflow-engine-overlay",de=document.createElement("canvas"),de.id="nf-matrix-canvas",t.appendChild(de);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let u=1;u<=5;u++){const b=document.createElement("div");b.className=`nf-ambient-orb nf-orb-${u}`,t.appendChild(b)}const o=document.createElement("div");o.className="nf-pat-data",t.appendChild(o);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const d=document.createElement("div");d.className="nf-pat-circuit",t.appendChild(d);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const c=document.createElement("div");c.className="nf-pat-binary",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const x=document.createElement("div");x.className="nf-pat-wave-h",t.appendChild(x);const v=document.createElement("div");v.className="nf-pat-radar",t.appendChild(v);const S=document.createElement("div");S.className="nf-pat-ripple-1",t.appendChild(S);const F=document.createElement("div");F.className="nf-pat-ripple-2",t.appendChild(F);const C=document.createElement("div");C.className="nf-pat-techscan",t.appendChild(C);const y=document.createElement("div");y.className="nf-center-glow",t.appendChild(y);const r=document.createElement("div");r.className="nf-pat-noise",t.appendChild(r);const m=document.createElement("div");m.className="nf-crt-scanlines",t.appendChild(m);const k=document.createElement("div");k.className="nf-vignette",t.appendChild(k);for(let u=0;u<3;u++){const b=document.createElement("div");b.className="nf-pulse-ring",t.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(u=>{const b=document.createElement("div");b.className=`nf-corner-deco ${u}`,t.appendChild(b)});const L=document.createElement("button");L.className="nf-stop-btn",L.innerHTML='<span class="nf-stop-icon"></span> หยุด',L.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",L.onclick=()=>{var u;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((u=chrome.runtime)!=null&&u.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(L);const M=document.createElement("div");M.className="nf-layout";const B=document.createElement("div");B.className="nf-core-monitor",B.id="nf-core-monitor";const h=document.createElement("div");h.className="nf-core-header",h.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,B.appendChild(h);const g=document.createElement("div");g.className="nf-terminal",g.id="nf-terminal",gt(g),B.appendChild(g);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const T=document.createElement("div");T.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(u=>{const b=document.createElement("div");b.className=`nf-frame-corner ${u}`,T.appendChild(b)}),w.appendChild(T);const O="http://www.w3.org/2000/svg",$=document.createElementNS(O,"svg");$.setAttribute("class","nf-engine-waves"),$.setAttribute("viewBox","0 0 560 140"),$.setAttribute("preserveAspectRatio","none"),$.id="nf-engine-waves";for(let u=0;u<4;u++){const b=document.createElementNS(O,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",u<2?"1.5":"1"),b.setAttribute("stroke",u<2?`rgba(${Z.rgb},${.14+u*.1})`:`rgba(${Z.accentRgb},${.1+(u-2)*.08})`),b.setAttribute("data-wave-idx",String(u)),$.appendChild(b)}w.appendChild($);const E=document.createElement("div");E.className="nf-engine-brand-inner",E.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ht(Z.rgb,Z.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ht(Z.rgb,Z.accentRgb)}
        </div>
    `,w.appendChild(E);const D=document.createElement("div");D.className="nf-engine-stats",D.id="nf-engine-stats",D.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([u,b,N])=>`<div class="nf-stat-item"><span class="nf-stat-label">${u}</span><span class="nf-stat-val" id="${b}">${N}</span></div>`).join(""),w.appendChild(D),B.appendChild(w),M.appendChild(B);const _=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ce.forEach((u,b)=>{const N=Yt(u);N.classList.add(_[b]),N.id=`nf-mod-${u.id}`,M.appendChild(N)}),t.appendChild(M);for(let u=0;u<30;u++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const N=.3+Math.random()*.4,H=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(re*H)}, ${Math.floor(se*H)}, ${Math.floor(le*H)}, ${N})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,t.appendChild(b)}return t}function Yt(t){const e=document.createElement("div");e.className="nf-module";const o=document.createElement("div");o.className="nf-mod-header",o.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(o),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Xt(){ut=Date.now(),ze=setInterval(()=>{const t=Math.floor((Date.now()-ut)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),o=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${o}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${o}`)},1e3)}function bt(){ze&&(clearInterval(ze),ze=null)}const Kt=120,wt=160,xt=.4;let ve=null,yt=0,vt=0,$t=0,Pe=[];function Qt(t,e){Pe=[];for(let o=0;o<Kt;o++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const d=Math.random()*t,l=Math.random()*e,c=50+Math.random()*220,s=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Pe.push({x:i===0?Math.random()*t:d+Math.cos(s)*c,y:i===0?Math.random()*e:l+Math.sin(s)*c,vx:(Math.random()-.5)*xt,vy:(Math.random()-.5)*xt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:d,oCy:l,oRadius:c,oAngle:s,oSpeed:p})}}function Zt(){if(!de)return;const t=de;if(Ie=t.getContext("2d"),!Ie)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Pe.length===0&&Qt(t.width,t.height)};e(),window.addEventListener("resize",e);let o=null,a=0,i=0,d=!1;function l(){if(!Ie||!de){Se=null;return}if(Se=requestAnimationFrame(l),d=!d,d)return;const c=Ie,s=de.width,p=de.height;c.fillStyle=`rgba(${re*.04|0},${se*.04|0},${le*.06|0},1)`,c.fillRect(0,0,s,p),(!o||a!==s||i!==p)&&(a=s,i=p,o=c.createRadialGradient(s*.5,p*.5,0,s*.5,p*.5,Math.max(s,p)*.6),o.addColorStop(0,`rgba(${re*.08|0},${se*.08|0},${le*.1|0},0.4)`),o.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=o,c.fillRect(0,0,s,p);const x=Pe,v=x.length,S=wt*wt;for(let y=0;y<v;y++){const r=x[y];if(r.pulsePhase+=r.pulseSpeed,r.motion===0)r.x+=r.vx,r.y+=r.vy,r.x<0?(r.x=0,r.vx=Math.abs(r.vx)*(.8+Math.random()*.4)):r.x>s&&(r.x=s,r.vx=-Math.abs(r.vx)*(.8+Math.random()*.4)),r.y<0?(r.y=0,r.vy=Math.abs(r.vy)*(.8+Math.random()*.4)):r.y>p&&(r.y=p,r.vy=-Math.abs(r.vy)*(.8+Math.random()*.4));else if(r.motion===1)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius,r.oCx+=Math.sin(r.oAngle*.3)*.15,r.oCy+=Math.cos(r.oAngle*.3)*.15;else if(r.motion===2)r.oAngle+=r.oSpeed,r.x=r.oCx+Math.cos(r.oAngle)*r.oRadius,r.y=r.oCy+Math.sin(r.oAngle)*r.oRadius*.5,r.oCx+=Math.sin(r.oAngle*.2)*.1,r.oCy+=Math.cos(r.oAngle*.2)*.1;else if(r.motion===3){r.oAngle+=r.oSpeed;const m=r.oAngle,k=r.oRadius*.7;r.x=r.oCx+k*Math.cos(m),r.y=r.oCy+k*Math.sin(m)*Math.cos(m),r.oCx+=Math.sin(m*.15)*.12,r.oCy+=Math.cos(m*.15)*.12}else if(r.motion===4){r.oAngle+=r.oSpeed*1.2;const m=r.oRadius*(.5+.5*Math.abs(Math.sin(r.oAngle*.15)));r.x=r.oCx+Math.cos(r.oAngle)*m,r.y=r.oCy+Math.sin(r.oAngle)*m,r.oCx+=Math.sin(r.oAngle*.1)*.18,r.oCy+=Math.cos(r.oAngle*.1)*.18}else r.oAngle+=r.oSpeed,r.x+=r.vx*.8,r.y=r.oCy+Math.sin(r.oAngle+r.x*.008)*r.oRadius*.35,r.x<-30?r.x=s+30:r.x>s+30&&(r.x=-30),r.oCy+=Math.sin(r.oAngle*.1)*.08;if(r.motion>0){const m=r.oRadius+50;r.oCx<-m?r.oCx=s+m:r.oCx>s+m&&(r.oCx=-m),r.oCy<-m?r.oCy=p+m:r.oCy>p+m&&(r.oCy=-m)}}c.beginPath(),c.strokeStyle=`rgba(${re},${se},${le},0.06)`,c.lineWidth=.4;const F=new Path2D;for(let y=0;y<v;y++){const r=x[y];for(let m=y+1;m<v;m++){const k=x[m],L=r.x-k.x,M=r.y-k.y,B=L*L+M*M;B<S&&(1-B/S<.4?(c.moveTo(r.x,r.y),c.lineTo(k.x,k.y)):(F.moveTo(r.x,r.y),F.lineTo(k.x,k.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${re},${se},${le},0.18)`,c.lineWidth=.8,c.stroke(F),!ve||yt!==re||vt!==se||$t!==le){ve=document.createElement("canvas");const y=48;ve.width=y,ve.height=y;const r=ve.getContext("2d"),m=r.createRadialGradient(y/2,y/2,0,y/2,y/2,y/2);m.addColorStop(0,`rgba(${re},${se},${le},0.9)`),m.addColorStop(.3,`rgba(${re},${se},${le},0.35)`),m.addColorStop(1,`rgba(${re},${se},${le},0)`),r.fillStyle=m,r.fillRect(0,0,y,y),yt=re,vt=se,$t=le}const C=ve;for(let y=0;y<v;y++){const r=x[y],m=.6+.4*Math.sin(r.pulsePhase),k=r.radius*5*(.8+m*.4);c.globalAlpha=.5+m*.4,c.drawImage(C,r.x-k/2,r.y-k/2,k,k)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let y=0;y<v;y++){const r=x[y];if(r.radius>2){const m=.6+.4*Math.sin(r.pulsePhase),k=r.radius*(.8+m*.4)*.35;c.moveTo(r.x+k,r.y),c.arc(r.x,r.y,k,0,Math.PI*2)}}c.fill()}l()}function Jt(){Se!==null&&(cancelAnimationFrame(Se),Se=null),de=null,Ie=null,Pe=[]}let _e=null;const Ge=560,en=140,Et=Ge/2,kt=en/2,Ct=[];for(let t=0;t<=Ge;t+=8){const e=Math.abs(t-Et)/Et;Ct.push(Math.pow(Math.min(1,e*1.6),.6))}const tn=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ge,off:t*.6,spd:.7+t*.12}));let Qe=!1;function Tt(){if(Te=requestAnimationFrame(Tt),Qe=!Qe,Qe)return;if(Xe+=.07,!_e){const e=document.getElementById("nf-engine-waves");if(!e){Te=null;return}_e=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<_e.length;e++){const o=tn[e],a=Xe*o.spd+o.off;t.length=0,t.push(`M 0 ${kt}`);let i=0;for(let d=0;d<=Ge;d+=8){const l=kt+o.amp*Ct[i++]*Math.sin(d*o.freq+a);t.push(`L${d} ${l*10+.5|0}`)}_e[e].setAttribute("d",t.join(" "))}}function nn(){Xe=0,Tt(),Zt(),Ve=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),o=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),o&&(o.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function It(){Te!==null&&(cancelAnimationFrame(Te),Te=null),Ve&&(clearInterval(Ve),Ve=null),_e=null,Jt()}function He(){let t=0;const e=Y.filter(p=>p.status!=="skipped").length;for(const p of Y){const x=document.getElementById(`nf-proc-${p.stepId}`);if(!x)continue;x.className="nf-proc-row";const v=x.querySelector(".nf-proc-badge");switch(p.status){case"done":x.classList.add("nf-proc-done"),v&&(v.textContent="✅ done"),t++;break;case"active":x.classList.add("nf-proc-active"),v&&(v.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":x.classList.add("nf-proc-error"),v&&(v.textContent="❌ error");break;case"skipped":x.classList.add("nf-proc-skipped"),v&&(v.textContent="— skip");break;default:x.classList.add("nf-proc-waiting"),v&&(v.textContent="(queued)")}}const o=Y.findIndex(p=>p.status==="active"),a=o>=0?o+1:t>=e&&e>0?Y.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${Y.length}`);const d=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(d&&(d.textContent="COMPLETE",d.style.color=Z.doneHex),l&&(l.style.background=Z.doneHex,l.style.boxShadow=`0 0 8px rgba(${Z.doneRgb},0.7)`)):Y.some(x=>x.status==="error")?(d&&(d.textContent="ERROR",d.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(x=>x.status==="active")&&d&&(d.textContent="ACTIVE",d.style.color=Z.hex,d.style.textShadow=`0 0 10px rgba(${Z.rgb},0.5)`);const c=document.getElementById("nf-terminal"),s=c==null?void 0:c.querySelector(".nf-proc-active");s&&c&&s.scrollIntoView({behavior:"smooth",block:"center"})}function St(){Q&&Q.isConnected||(Ke(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=ge?pt:ft,Q.title="ซ่อน/แสดง Netflow Overlay",Q.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",Q.onclick=()=>Pt(),document.body.appendChild(Q))}function Pt(){z&&(St(),ge?(z.classList.remove("nf-hidden"),z.classList.add("nf-visible"),z.style.opacity="1",z.style.pointerEvents="auto",Q&&(Q.innerHTML=ft),ge=!1):(z.classList.remove("nf-visible"),z.classList.add("nf-hidden"),z.style.opacity="0",z.style.pointerEvents="none",Q&&(Q.innerHTML=pt),ge=!0))}const _t={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Mt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Ce;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const o=_t[e]||_t.green;let a;try{a=chrome.runtime.getURL(o)}catch{a=`/${o}`}const i=Z.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function qe(t=1){if(Z=qt(),dt(),z&&z.isConnected){z.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!X||!X.isConnected)&&(X=null,Ke()),setTimeout(()=>{if(z)try{X!=null&&X.sheet&&X.sheet.cssRules.length>0&&(z.style.removeProperty("background"),z.style.removeProperty("font-family"),z.style.removeProperty("overflow"))}catch{}},200);for(const e of ce)for(const o of e.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;ye=t,Y=Ue(t),mt();for(const e of ce)Ze(e);if(We(),He(),!z.querySelector(".nf-stop-btn")){const e=document.createElement("button");e.className="nf-stop-btn",e.innerHTML='<span class="nf-stop-icon"></span> หยุด',e.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",e.onclick=()=>{var o;window.__NETFLOW_STOP__=!0;try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((o=chrome.runtime)!=null&&o.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},z.appendChild(e)}ge&&Pt();return}z&&!z.isConnected&&(z=null),X&&(X.remove(),X=null),Ke();for(const e of ce)for(const o of e.steps)o.status="waiting",o.progress=o.progress!==void 0?0:void 0;if(ye=t,Y=Ue(t),t>1){const e=ce.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const o=ce.find(a=>a.id==="render");if(o){const a=o.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=o.steps.find(d=>d.id==="upscale");i&&(i.label="Full Video")}}z=jt(),z.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(z),z.classList.add("nf-visible"),ge=!1,St(),Xt(),nn(),requestAnimationFrame(()=>Mt()),setTimeout(()=>{if(z)try{X!=null&&X.sheet&&X.sheet.cssRules.length>0&&(z.style.removeProperty("background"),z.style.removeProperty("font-family"),z.style.removeProperty("overflow"))}catch{}},200)}function At(){bt(),It(),ge=!1,z&&(z.classList.add("nf-fade-out"),setTimeout(()=>{z==null||z.remove(),z=null},500)),Q&&(Q.remove(),Q=null)}const on={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function an(t,e,o){const a=Y.findIndex(v=>v.status==="active"),i=Y.filter(v=>v.status==="done").length,d=Y.length,l=a>=0?a+1:i>=d?d:i,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${l}/${d}`);let s=1;for(const v of Y)if(v.status==="active"||v.status==="done")if(v.stepId.startsWith("scene")){const S=v.stepId.match(/^scene(\d+)-/);S&&(s=Math.max(s,parseInt(S[1],10)))}else(v.stepId==="download"||v.stepId==="upscale"||v.stepId==="open")&&(s=ye);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=ye>1?`${s}/${ye}`:"1/1"),e==="active"){const v=document.getElementById("nf-stat-status"),S=on[t]||t.toUpperCase();v&&(v.textContent=S)}else if(e==="done"&&i>=d){const v=document.getElementById("nf-stat-status");v&&(v.textContent="COMPLETE")}else if(e==="error"){const v=document.getElementById("nf-stat-status");v&&(v.textContent="ERROR")}const x=document.getElementById("nf-stat-progress");x&&(o!==void 0&&o>0?x.textContent=`${Math.min(100,o)}%`:e==="active"&&(x.textContent="—"))}function I(t,e,o){if(!z)return;for(const i of ce)for(const d of i.steps)d.id===t&&(d.status=e,o!==void 0&&(d.progress=o));for(const i of Y)i.stepId===t&&(i.status=e,o!==void 0&&(i.progress=o));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),an(t,e,o),o!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,o)}%`)}We(),He()}function $e(t){I(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Me(t=4e3){bt(),It(),We(),He(),setTimeout(()=>At(),t)}function We(){for(const t of ce){const e=t.steps.filter(s=>s.status!=="skipped").length,o=t.steps.filter(s=>s.status==="done").length,a=t.steps.some(s=>s.status==="active"),i=e>0?Math.round(o/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):a&&c.classList.add("nf-active"))}}function rn(t){var a,i,d,l;ye=t;const e=new Map;for(const c of Y)e.set(c.stepId,{status:c.status,progress:c.progress});Y=Ue(t);for(const c of Y){const s=e.get(c.stepId);s&&(c.status=s.status,s.progress!==void 0&&(c.progress=s.progress))}if(mt(),t>1){const c=ce.find(s=>s.id==="video");if(c){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=c.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=c.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(p=>p.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)s.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),s.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),s.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});c.steps=s,Ze(c)}}const o=ce.find(c=>c.id==="render");if(o&&t>1){const c=o.steps.find(p=>p.id==="download");c&&(c.label="ดาวน์โหลด 720p");const s=o.steps.find(p=>p.id==="upscale");s&&(s.label="Full Video"),Ze(o)}We(),He()}function Ze(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Ae(t){t.replace(/^\[Netflow AI\]\s*/,"")}let Ee=null,me=null;const sn=new Promise(t=>{me=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(Ee=t.tabId,console.log(`[Netflow AI] Tab ID: ${Ee}`)),me&&(me(Ee),me=null)})}catch{me&&(me(null),me=null)}function pe(){return Ee?`netflow_pending_action_${Ee}`:"netflow_pending_action"}function Rt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ae(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},P=t=>{console.warn(`[Netflow AI] ${t}`);try{Ae(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};(()=>{const t=(o,a)=>{const i=o.tagName.toLowerCase(),d=o.id?`#${o.id}`:"",l=o.className&&typeof o.className=="string"?"."+o.className.trim().split(/\s+/).join("."):"",c=o.getBoundingClientRect(),s={};for(const r of o.attributes)["class","id","style"].includes(r.name)||(s[r.name]=r.value.length>80?r.value.slice(0,80)+"…":r.value);const p=(o.textContent||"").trim().slice(0,120),x=Array.from(o.querySelectorAll('i, [class*="icon"]')).map(r=>{var m;return(m=r.textContent)==null?void 0:m.trim()}).filter(Boolean).join(", "),v=[];let S=o.parentElement;for(let r=0;r<5&&S;r++){const m=S.tagName.toLowerCase(),k=S.id?`#${S.id}`:"",L=S.className&&typeof S.className=="string"?"."+S.className.trim().split(/\s+/).slice(0,2).join("."):"";v.push(`${m}${k}${L}`),S=S.parentElement}const F=a==="click"?`%c🖱️ CLICK %c<${i}${d}${l}>`:`%c👆 HOVER %c<${i}${d}${l}>`;console.groupCollapsed(F,a==="click"?"background:#e74c3c;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold":"background:#3498db;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold","color:#f39c12;font-weight:bold"),console.log("Element:",o),console.log("Selector:",`${i}${d}${l}`),console.log("Rect:",{x:Math.round(c.x),y:Math.round(c.y),w:Math.round(c.width),h:Math.round(c.height)}),Object.keys(s).length&&console.log("Attributes:",s),p&&console.log("Text:",p),x&&console.log("Icons:",x),v.length&&console.log("Ancestors:",v.join(" > ")),console.groupEnd()};document.addEventListener("click",o=>{const a=o.target;a!=null&&a.closest("#netflow-engine-overlay")||t(a,"click")},!0);let e=null;document.addEventListener("mouseover",o=>{const a=o.target;a!==e&&(a!=null&&a.closest("#netflow-engine-overlay")||(e=a,t(a,"hover")))},!0),console.log("%c[Netflow AI] 🔍 Debug Element Inspector ACTIVE — click/hover elements to inspect","background:#2ecc71;color:#000;padding:4px 8px;border-radius:4px;font-weight:bold")})();function Je(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?P(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){P(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function et(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},d=>{if(chrome.runtime.lastError){i(!1);return}i(!!(d!=null&&d.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const d of i){const l=d.src||d.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let o=null,a=0;for(const i of e){let d=i.src||"";if(!d){const s=i.querySelector("source");s&&(d=s.getAttribute("src")||"")}if(!d&&i.currentSrc&&(d=i.currentSrc),!d)continue;if(K()){o||(o=d,a=1);continue}const l=i.getBoundingClientRect(),c=l.width*l.height;l.width>50&&c>a&&(a=c,o=d)}if(!o)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${o.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(o);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Dt(o),o;const d=await i.blob(),l=(d.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${d.type}`),d.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${d.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((s,p)=>{const x=new FileReader;x.onloadend=()=>s(x.result),x.onerror=()=>p(new Error("FileReader error")),x.readAsDataURL(d)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),s()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Dt(o)}return o}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Dt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},o=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):o!=null&&o.success?n(`[TikTok] Video pre-fetched via background: ${((o.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${o==null?void 0:o.error}`),e()})})}catch{}}function tt(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const nt=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),ot=/Win/i.test(navigator.userAgent),Bt=nt?"🍎 Mac":ot?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${Bt}`),window.__VIDEO_COMPLETE_SENT__=!1;class it extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Re=null,he=null,Ot=!1;const ke=new Map;let Nt=0;function ln(){if(Re)return Re;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Re=new Worker(URL.createObjectURL(t)),Re.onmessage=e=>{const o=ke.get(e.data);o&&(ke.delete(e.data),o())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Re}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function cn(){if(he)return he;if(Ot)return null;try{return he=chrome.runtime.connect({name:"timer"}),he.onMessage.addListener(t=>{const e=ke.get(t.id);e&&(ke.delete(t.id),e())}),he.onDisconnect.addListener(()=>{he=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),he}catch{return Ot=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const f=t=>new Promise((e,o)=>{if(window.__NETFLOW_STOP__)return o(new it);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return o(new it);e()}};setTimeout(i,t);const d=ln();if(d){const s=++Nt;ke.set(s,i),d.postMessage({id:s,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const l=cn();if(l){const s=++Nt;ke.set(s,i),l.postMessage({cmd:"delay",id:s,ms:t});return}const c=setTimeout(i,t);f._lastId=c});function be(){return!!window.__NETFLOW_STOP__}const K=()=>document.hidden;let Lt=0;async function we(){if(!document.hidden)return!1;const t=Date.now();if(t-Lt<15e3)return!1;Lt=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await f(1500),!0}catch{return!1}}async function De(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const t=Date.now();for(;document.hidden&&Date.now()-t<5e3;)await f(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function Ft(){var o;const t=["audio generation failed","couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","might violate","violate our policies","อาจละเมิด","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const d of t)if(i.includes(d))return((o=a.textContent)==null?void 0:o.trim())||d}}return null}function dn(t){let e=t;const o=[/STRICT FACE & HEAD LOCK:[^.]*\./gi,/BODY LOCK:[^.]*\./gi,/HAIR LOCK:[^.]*\./gi,/FACE LOCK[^.]*\./gi,/PRODUCT IDENTITY LOCK:[^.]*\./gi,/LABEL LOCK:[^.]*\./gi,/PRODUCT EVERY FRAME:[^.]*\./gi,/TRANSITION STABILITY:[^.]*\./gi,/ANTI[_-]DUPLICATION:[^.]*\./gi,/ANTI[_-]TEXT[^.]*\./gi,/ANTI[_-]MORPH[^.]*\./gi,/ANTI[_-]DISTORTION[^.]*\./gi,/ANTI[_-]ADDITION[^.]*\./gi,/ANTI[_-]FLOATING[^.]*\./gi,/PROPS vs PRODUCT:[^.]*\./gi,/BRAND IDENTITY FREEZE[^.]*\./gi,/BRAND MORPHING[^.]*\./gi,/PRODUCT SIZE \(CRITICAL\):[^.]*\./gi,/PRODUCT SIZE REALISM:[^.]*\./gi,/VOICE DISCIPLINE:[^.]*\./gi,/ZERO INVENTION:[^.]*\./gi,/REALISM:[^.]*\./gi,/SCREEN CONTENT[^.]*\./gi,/SINGLE UTENSIL RULE[^.]*\./gi,/PRODUCT LOCK[^.]*\./gi,/FACE & HEAD LOCK[^.]*\./gi,/CLOTHING FIDELITY[^.]*\./gi,/FRONT[_-]FACING[^.]*\./gi];for(const l of o)e=e.replace(l,"");const a=["DO NOT","NEVER","FORBIDDEN","MUST NOT","ABSOLUTELY NO","IMMUTABLE","LOCKED","HIGHEST PRIORITY","#1 FORBIDDEN","Do NOT let","Do NOT add","Do NOT generate","Do NOT simplify","Do NOT invent","ZERO on-screen","NO split screen","NO collage","NO side-by-side","NO divided frames","never morph","never simplify","never change shape","never disappear","never be hidden","never exit","BRAND MORPHING IS","objects MUST NOT magically"];return e=e.split(/(?<=[.!])\s+/).filter(l=>!a.some(c=>l.includes(c))).join(" "),e=e.replace(/\s{2,}/g," ").trim(),e.length>1200&&(e=e.replace(/Render with extreme surface detail[^.]*\./gi,""),e=e.replace(/High-fidelity visual detail[^.]*\./gi,""),e=e.replace(/Product lit with soft rim light[^.]*\./gi,""),e=e.replace(/visible material texture[^.]*\./gi,""),e=e.replace(/Fluid motion, cinematic motion blur[^.]*\./gi,""),e=e.replace(/AI-observed appearance:[^.]*\./gi,""),e=e.replace(/Reference clothing:[^.]*\./gi,""),e=e.replace(/\s{2,}/g," ").trim()),n(`🛡️ Safe retry prompt: ${t.length} → ${e.length} chars (${Math.round((1-e.length/t.length)*100)}% reduction)`),e}async function J(t){if(K()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),o=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:o,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await f(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await f(50),t.click()}function Be(t){const e=t.getBoundingClientRect(),o=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:o,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function pn(t){const e=[],o=document.querySelectorAll("i");for(const a of o){if((a.textContent||"").trim()!==t)continue;let d=a,l=null,c=1/0;for(let s=0;s<20&&d&&(d=d.parentElement,!(!d||d===document.body));s++){if(K()){s>=3&&d.children.length>0&&!l&&(l=d);continue}const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const x=p.width*p.height;x<c&&(l=d,c=x)}}l&&!e.includes(l)&&e.push(l)}return e.sort((a,i)=>{const d=a.getBoundingClientRect(),l=i.getBoundingClientRect();return d.left-l.left}),e}function at(t=!1){const e=[],o=document.querySelectorAll("video");for(const l of o){let c=l.parentElement;for(let s=0;s<10&&c;s++){if(K()){if(s>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const p=c.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:c,left:p.left});break}c=c.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of a){const c=(l.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let s=l.parentElement;for(let p=0;p<10&&s;p++){if(K()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const x=s.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:s,left:x.left});break}s=s.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const c=(l.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let s=l.parentElement;for(let p=0;p<10&&s;p++){if(K()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const x=s.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:s,left:x.left});break}s=s.parentElement}}}const d=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(c=>c.el===l));if(d.sort((l,c)=>l.left-c.left),d.length>0){const l=d[0].el,c=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function fn(){const t=pn("image");if(t.length>0){const o=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${o.left.toFixed(0)},${o.top.toFixed(0)}) ขนาด ${o.width.toFixed(0)}x${o.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const o of e){let a=o.parentElement;for(let i=0;i<10&&a;i++){if(K()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function un(t,e){var c;const[o,a]=t.split(","),i=((c=o.match(/:(.*?);/))==null?void 0:c[1])||"image/png",d=atob(a),l=new Uint8Array(d.length);for(let s=0;s<d.length;s++)l[s]=d.charCodeAt(s);return new File([l],e,{type:i})}function je(t){var a;const e=[],o=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of o)if(((a=i.textContent)==null?void 0:a.trim())===t){const d=i.closest("button");d&&e.push(d)}return e}function rt(){const t=[...je("add"),...je("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const d=(i.textContent||"").trim();if(d!=="+"&&d!=="add")continue;if(K())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,o=0;for(const a of t){const i=a.getBoundingClientRect();i.y>o&&(o=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${o.toFixed(0)}`),e}function st(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=je(a);let d=null,l=0;for(const c of i){const s=c.getBoundingClientRect();s.y>l&&(l=s.y,d=c)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${l.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,o=0;for(const a of t){if(K())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const d=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(d?1e3:0);l>o&&(o=l,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function lt(){const t=document.querySelectorAll("textarea");for(const a of t)if(K()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(K()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const o=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of o){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Oe(t,e){var o,a,i,d;t.focus(),await f(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),await f(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await f(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(c),await f(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await f(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await f(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((o=navigator.clipboard)!=null&&o.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=e,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await f(200),document.execCommand("paste"),await f(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let s=0;s<30&&c;s++){const p=c.memoizedProps,x=c.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const v=p.editor;v.selection,v.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(i=x==null?void 0:x.memoizedState)==null?void 0:i.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),x.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Ne(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(K()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}const o=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of o){if(a.closest("#netflow-engine-overlay"))continue;if(K()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}return t}async function zt(t,e=5e3){var a,i;const o=Date.now();for(;Date.now()-o<e;){const d=t.getAttribute("aria-controls"),l=[];if(d){const c=document.getElementById(d);c&&l.push(c)}for(const c of document.querySelectorAll("[data-radix-portal]"))l.push(c);for(const c of document.querySelectorAll('[role="dialog"]'))l.push(c);for(const c of l)for(const s of c.querySelectorAll("button")){if(s===t)continue;const p=((i=(a=s.querySelector("i"))==null?void 0:a.textContent)==null?void 0:i.trim())||"",x=Array.from(s.querySelectorAll("span")).map(v=>{var S;return((S=v.textContent)==null?void 0:S.trim().toLowerCase())||""});if(p==="upload"||p==="upload_file"||x.some(v=>v==="upload image"||v==="อัปโหลดรูปภาพ"||v==="upload"))return s}await f(500)}return null}async function Vt(t,e){n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const o=un(t,e);n(`ขนาดไฟล์: ${(o.size/1024).toFixed(1)} KB`);const a=Ne();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`),n("── ขั้น 1: คลิกปุ่ม '+' (Create) ──");let i=rt();if(i||(n("ไม่พบปุ่ม '+' — รอ 2 วินาทีแล้วลองใหม่..."),await f(2e3),i=rt()),!i){n("ลองคลิกบน prompt bar area เพื่อ activate...");const l=document.querySelector('[data-slate-editor="true"], [role="textbox"][contenteditable="true"]');l&&(l.click(),await f(1500),i=rt())}if(!i)return P("ไม่พบปุ่ม '+' บน Prompt Bar — ลอง drag-drop fallback"),await ct(o,a);i.click(),n("คลิกปุ่ม '+' (Create) ✅"),await f(1500),n("── ขั้น 2: หาและคลิกปุ่ม 'Upload image' ──");const d=await zt(i,5e3);if(!d){P("ไม่พบปุ่ม 'Upload image' ใน Dialog — ลอง pointer events บนปุ่ม '+'");const l=i.getBoundingClientRect(),c=l.left+l.width/2,s=l.top+l.height/2,p={bubbles:!0,cancelable:!0,clientX:c,clientY:s,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",p)),await f(80),i.dispatchEvent(new PointerEvent("pointerup",{...p,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",p)),i.dispatchEvent(new MouseEvent("click",p)),await f(1500);const x=await zt(i,3e3);return x?await Ut(x,o,e,a):(P("❌ ไม่พบปุ่ม Upload image หลังลองทั้ง 2 วิธี — ลอง drag-drop"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500),await ct(o,a))}return await Ut(d,o,e,a)}async function Ut(t,e,o,a){var p;n("── ขั้น 3: บล็อก file dialog + คลิก Upload + ฉีดไฟล์ ──");const i=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n("🚫 บล็อก file dialog จาก click()");return}return i.call(this)};try{t.click(),n("คลิกปุ่ม 'Upload image' ✅"),await f(800)}finally{HTMLInputElement.prototype.click=i}const d=document.querySelector('input[type="file"]');if(!d)return P("ไม่พบ file input หลังคลิก Upload — ลอง direct drag-drop"),await ct(e,a);const l=new DataTransfer;l.items.add(e),d.files=l.files,n(`ฉีดไฟล์ ${o} เข้า file input (${((p=d.files)==null?void 0:p.length)??0} ไฟล์)`);const c=d._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker")),d.dispatchEvent(new Event("change",{bubbles:!0})),d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),n("ส่ง change + input event ✅"),n("── ขั้น 4: รอยืนยันรูปย่อ ──");const s=Date.now();for(;Date.now()-s<15e3;){const x=Ne();if(x>a)return n(`✅ ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${x}`),!0;const v=document.querySelectorAll("span, div, p");for(const S of v){const F=(S.textContent||"").trim();if(/^\d{1,2}%$/.test(F)){n(`กำลังอัพโหลด: ${F}`);break}}await f(1e3)}return P(`❌ อัพโหลด ${o} ล้มเหลว — ไม่พบรูปย่อใหม่หลัง 15 วินาที`),!1}async function ct(t,e){n("── Fallback: drag-and-drop ลงบน workspace ──");const o=new DataTransfer;o.items.add(t);let a=null;const i=document.querySelectorAll('[class*="workspace"], [class*="drop"], [class*="media"], main, [role="main"]');for(const x of i){const v=x.getBoundingClientRect();if(v.width>200&&v.height>200){a=x;break}}a||(a=document.elementFromPoint(window.innerWidth/2,window.innerHeight/2)||document.body);const d=a.getBoundingClientRect(),l=d.left+d.width/2,c=d.top+d.height/2,s={bubbles:!0,cancelable:!0,clientX:l,clientY:c,dataTransfer:o};a.dispatchEvent(new DragEvent("dragenter",s)),await f(100),a.dispatchEvent(new DragEvent("dragover",s)),await f(100),a.dispatchEvent(new DragEvent("drop",s)),n(`ส่ง drag-drop ลง <${a.tagName}>`);const p=Date.now();for(;Date.now()-p<8e3;){if(Ne()>e)return n("✅ drag-drop สำเร็จ — พบรูปย่อใหม่"),!0;await f(1e3)}return P("❌ drag-drop ล้มเหลว — ไม่พบรูปย่อใหม่"),!1}async function gn(t,e){var F;n("=== ขั้น 0: ตั้งค่า Flow ===");let o=null;for(let C=0;C<10;C++){const y=document.querySelectorAll("button, div, span, [role='button']");for(const m of y){const k=(m.textContent||"").trim();if(!(k.length>80)&&(k.includes("Nano Banana")||k.includes("Imagen")||k.includes("วิดีโอ")||k.includes("รูปภาพ")||k.includes("Image")||k.includes("Video"))){const L=m.getBoundingClientRect();L.bottom>window.innerHeight*.7&&L.width>30&&L.height>10&&(!o||(m.textContent||"").length<(o.textContent||"").length)&&(o=m)}}if(o){n(`พบปุ่มตั้งค่าจากข้อความ: "${(o.textContent||"").substring(0,40).trim()}"`);break}const r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const m of r){const k=((F=m.textContent)==null?void 0:F.trim())||"";if(k.includes("crop")||k==="aspect_ratio"||k==="photo_size_select_large"){const L=m.closest("button, div[role='button'], [role='button']")||m.parentElement;if(L){const M=L.getBoundingClientRect();if(M.bottom>window.innerHeight*.7&&M.width>0){o=L,n(`พบปุ่มตั้งค่าจากไอคอน: ${k}`);break}}}}if(o)break;for(const m of y){const k=(m.textContent||"").trim();if(!(k.length>40)&&/x[1-4]/.test(k)&&(k.includes("วิดีโอ")||k.includes("รูปภาพ")||k.includes("Video")||k.includes("Image"))){const L=m.getBoundingClientRect();if(L.bottom>window.innerHeight*.7&&L.width>30){o=m,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${k.substring(0,40)}"`);break}}}if(o)break;n(`⏳ รอปุ่มตั้งค่า... (${C+1}/10)`),await f(1e3)}if(!o)return P("ไม่พบปุ่มตั้งค่า (หมด 10 รอบ)"),!1;const a=o.getBoundingClientRect(),i=a.left+a.width/2,d=a.top+a.height/2,l={bubbles:!0,cancelable:!0,clientX:i,clientY:d,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",l)),await f(80),o.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",l)),o.dispatchEvent(new MouseEvent("click",l)),n("คลิกปุ่มตั้งค่าแล้ว"),await f(2500);let c=!1,s=null;const p=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const C of p){const y=C.getAttribute("aria-controls")||"",r=C.id||"";if(y.toUpperCase().includes("IMAGE")||r.toUpperCase().includes("IMAGE")){s=C,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${y})`);break}}if(!s)for(const C of document.querySelectorAll('[role="tab"]')){const y=C.id||"";if(y.toUpperCase().includes("TRIGGER-IMAGE")){s=C,n(`พบแท็บ Image ผ่าน id: ${y}`);break}}if(!s)for(const C of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const y=(C.textContent||"").trim();if(!(y.length>30)&&(y==="Image"||y.endsWith("Image")||y==="รูปภาพ"||y==="ภาพ"||y.includes("รูปภาพ"))&&!y.includes("Video")&&!y.includes("วิดีโอ")){const r=C.getBoundingClientRect();if(r.width>0&&r.height>0){s=C,n(`พบแท็บ Image ผ่านข้อความ: "${y}"`);break}}}if(s){const C=s.getAttribute("data-state")||"",y=s.getAttribute("aria-selected")||"";if(C==="active"||y==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const r=s.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:r.left+r.width/2,clientY:r.top+r.height/2,button:0};s.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",m)),await f(80),s.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",m)),s.dispatchEvent(new MouseEvent("click",m)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await f(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const x=t==="horizontal"?"แนวนอน":"แนวตั้ง",v=t==="horizontal"?"landscape":"portrait";for(const C of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const y=(C.textContent||"").trim();if(!(y.length>30)&&(y===x||y.includes(x)||y.toLowerCase()===v||y.toLowerCase().includes(v))){const r=C.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:r.left+r.width/2,clientY:r.top+r.height/2,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",m)),await f(80),C.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",m)),C.dispatchEvent(new MouseEvent("click",m)),n(`เลือกทิศทาง: ${x}`),await f(400);break}}const S=`x${e}`;for(const C of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const y=(C.textContent||"").trim();if(!(y.length>10)&&(y===S||y===`${e}`)){const r=C.getBoundingClientRect(),m={bubbles:!0,cancelable:!0,clientX:r.left+r.width/2,clientY:r.top+r.height/2,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",m)),await f(80),C.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",m)),C.dispatchEvent(new MouseEvent("click",m)),n(`เลือกจำนวน: ${S}`),await f(400);break}}return await f(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),o.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",l)),await f(80),o.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",l)),o.dispatchEvent(new MouseEvent("click",l)),n("ปิดหน้าตั้งค่าแล้ว"),await f(600),!0}async function mn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",o=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",d=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const c=Date.now()+1e4;for(;!l&&Date.now()<c;){const y=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const r of y){const m=(r.textContent||"").trim();if(!(m.length>80)&&(m.includes("Veo")||m.includes("veo"))&&(r.hasAttribute("aria-haspopup")||r.hasAttribute("aria-expanded")||r.getAttribute("role")==="combobox"||m.includes("arrow_drop_down")||r.querySelector("svg"))){l=r,n(`พบปุ่ม Veo dropdown (Strategy A): "${m.substring(0,50).trim()}"`);break}}if(!l)for(const r of y){const m=(r.textContent||"").trim();if(!(m.length>80)&&(m.includes("Veo")||m.includes("veo"))){const k=r.getBoundingClientRect();if(k.width>0&&k.height>0){l=r,n(`พบปุ่ม Veo dropdown (Strategy B): "${m.substring(0,50).trim()}"`);break}}}if(!l)for(const r of y){const m=(r.textContent||"").trim();if(!(m.length>50)&&(m.includes("Fast")||m.includes("Quality")||m.includes("เร็ว")||m.includes("คุณภาพ"))&&(r.hasAttribute("aria-haspopup")||r.hasAttribute("aria-expanded")||r.querySelector("svg"))){l=r,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${m.substring(0,50).trim()}"`);break}}if(!l){const r=document.querySelectorAll("div, span, button, [role='button']");for(const m of r){const k=(m.textContent||"").trim();if(k==="Veo 3.1 - Fast"||k==="Veo 3.1 - Quality"||k==="Fast"||k==="Quality"||k==="Veo 3.1 - เร็ว"||k==="Veo 3.1 - คุณภาพสูง"||k==="Veo 3.1 - คุณภาพ"||k==="Veo 2 - Fast"||k==="Veo 2 - Quality"){const L=m.getBoundingClientRect();if(L.width>0&&L.height>0){l=m,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${k}"`);break}}}}if(!l){const r=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const m of r){const k=(m.textContent||"").trim();if(!(k.length>60)&&(k.includes("3.1")||k.includes("model")||k.includes("โมเดล"))){const L=m.getBoundingClientRect();if(L.bottom>window.innerHeight*.4&&L.width>0&&L.height>0){l=m,n(`พบปุ่ม model selector (Strategy E): "${k.substring(0,50).trim()}"`);break}}}}l||await f(1e3)}if(!l)return P("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(l.textContent||"").trim();if(s.includes(e)||s.includes(o)&&!s.includes(a)||s.includes(i)&&!s.includes(d))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=l.getBoundingClientRect(),x=p.left+p.width/2,v=p.top+p.height/2,S={bubbles:!0,cancelable:!0,clientX:x,clientY:v,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",S)),await f(80),l.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",S)),l.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await f(1e3);let F=!1;const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const y of C){const r=(y.textContent||"").trim();if((r===e||r===o||r.includes(e)||r.includes(i))&&!r.includes("arrow_drop_down")){const k=y.getBoundingClientRect();if(k.width>0&&k.height>0){const L=k.left+k.width/2,M=k.top+k.height/2,B={bubbles:!0,cancelable:!0,clientX:L,clientY:M,button:0};y.dispatchEvent(new PointerEvent("pointerdown",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mousedown",B)),await f(80),y.dispatchEvent(new PointerEvent("pointerup",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),y.dispatchEvent(new MouseEvent("mouseup",B)),y.dispatchEvent(new MouseEvent("click",B)),n(`✅ เลือก "${r}" สำเร็จ`),F=!0;break}}}return F?(await f(600),!0):(P(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),!1)}async function hn(t){var k,L,M,B;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,o=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=o?o[1]:"unknown",i=nt?"macOS":ot?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=nt?((L=(k=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:k[1])==null?void 0:L.replace(/_/g,"."))||"":ot&&((M=e.match(/Windows NT ([0-9.]+)/))==null?void 0:M[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${c} | แพลตฟอร์ม: ${Bt}`),n("══════════════════════════════════════════");try{Fe(t.theme)}catch{}try{qe(t.sceneCount||1)}catch(h){console.warn("Overlay show error:",h)}const s=[],p=[];if(t.needsNewProject){try{I("open-flow","done"),I("new-project","active"),n("=== สร้างโปรเจคใหม่ ===");let h=null;for(let g=0;g<15;g++){const w=document.querySelectorAll("button, [role='button']");for(const T of w){const O=(T.textContent||"").trim().toLowerCase();if(O.includes("new project")||O.includes("สร้างโปรเจค")||O.includes("โปรเจกต์ใหม่")){h=T;break}}if(!h){const T=document.querySelectorAll("i.google-symbols, i[class*='google-symbols']");for(const O of T)if((O.textContent||"").trim()==="add_2"){const $=O.closest("button");if($){h=$;break}}}if(h)break;n(`⏳ รอปุ่ม New Project... (${g+1}/15)`),await f(1e3)}if(h){n(`✅ พบปุ่ม New Project: "${(h.textContent||"").trim().substring(0,30)}"`),await J(h),await f(500),await J(h),await f(2e3);let g=!1;for(let w=0;w<20;w++){const T=document.body.innerText||"";if(T.includes("Start creating")||T.includes("เริ่มสร้าง")||T.includes("What do you want to create")||T.includes("drop media")||document.querySelector("textarea, input[placeholder]")){g=!0;break}await f(500)}n(g?"✅ Workspace พร้อมแล้ว":"⚠️ Workspace อาจยังไม่โหลดเสร็จ — ดำเนินการต่อ"),I("new-project","done"),s.push("✅ New Project")}else P("ไม่พบปุ่ม New Project — อาจอยู่ใน workspace แล้ว ดำเนินการต่อ"),I("new-project","skipped"),s.push("⚠️ New Project (skipped)")}catch(h){P(`New Project error: ${h.message}`),I("new-project","error"),s.push("⚠️ New Project")}await f(3e3)}else{try{I("open-flow","skipped")}catch{}try{I("new-project","skipped")}catch{}await f(3e3)}try{I("settings","active");const h=t.orientation||"vertical",g=t.outputCount||1,w=await gn(h,g);s.push(w?"✅ Settings":"⚠️ Settings"),I("settings",w?"done":"error")}catch(h){P(`ตั้งค่าผิดพลาด: ${h.message}`),s.push("⚠️ Settings"),I("settings","error")}try{const h=t.veoQuality||"fast";await mn(h)?(s.push(`✅ Veo ${h}`),n(`✅ Veo quality: ${h}`)):(s.push("⚠️ Veo quality"),P("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(h){P(`Veo quality error: ${h.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(300),document.body.click(),await f(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const x=()=>{const h=document.querySelectorAll("span, div, p, label");for(const g of h){const w=(g.textContent||"").trim();if(/^\d{1,3}%$/.test(w)){if(w==="100%")return null;const T=g.getBoundingClientRect();if(T.width>0&&T.height>0&&T.top>0&&T.top<window.innerHeight)return w}}return null},v=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await f(2e3);const g=Date.now(),w=6e4;let T="",O=Date.now();const $=15e3;for(;Date.now()-g<w;){const E=x();if(E){if(E!==T)T=E,O=Date.now(),n(`กำลังอัพโหลด: ${E} — รอ...`);else if(Date.now()-O>$){n(`✅ อัพโหลด ${h} — % ค้างที่ ${E} นาน ${$/1e3} วินาที ถือว่าเสร็จ`),await f(1e3);return}await f(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await f(1e3);return}}P(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${w/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){I("upload-char","active");try{const h=await Vt(t.characterImage,"character.png");s.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||p.push("character upload failed"),I("upload-char",h?"done":"error")}catch(h){P(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),s.push("❌ ตัวละคร"),p.push("character upload error"),I("upload-char","error")}await v("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else $e("upload-char");if(t.productImage){I("upload-prod","active");try{const h=await Vt(t.productImage,"product.png");s.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||p.push("product upload failed"),I("upload-prod",h?"done":"error")}catch(h){P(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),s.push("❌ สินค้า"),p.push("product upload error"),I("upload-prod","error")}await v("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(500)}else $e("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await f(800);const S=x();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await v("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await f(1e3);const F=(t.characterImage?1:0)+(t.productImage?1:0);if(F>0){let h=Ne();h<F&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${F} — รอ 3 วินาที...`),await f(3e3),h=Ne()),h>=F?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${F}`):P(`⚠️ คาดว่าจะมี ${F} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(be()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Me(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),I("img-prompt","active"),await f(1e3);const C=lt();C?(await Oe(C,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),s.push("✅ Prompt"),I("img-prompt","done")):(P("ไม่พบช่องป้อนข้อความ Prompt"),s.push("❌ Prompt"),p.push("prompt input not found"),I("img-prompt","error")),await f(800);const y=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&y.add(h.src)}),n(`บันทึกรูปเดิม: ${y.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),I("img-generate","active"),await f(500);const r=st();if(r){const h=r.getBoundingClientRect(),g=h.left+h.width/2,w=h.top+h.height/2,T={bubbles:!0,cancelable:!0,clientX:g,clientY:w,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",T)),await f(80),r.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",T)),r.dispatchEvent(new MouseEvent("click",T)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await f(500),r.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",T)),await f(80),r.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",T)),r.dispatchEvent(new MouseEvent("click",T)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),I("img-generate","done")}else P("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),p.push("generate button not found"),I("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),I("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await f(15e3);const h=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const E of $){if(E.closest("#netflow-engine-overlay"))continue;const D=(E.textContent||"").trim();if(D.length>10)continue;const _=D.match(/(\d{1,3})\s*%/);if(!_)continue;const u=parseInt(_[1],10);if(u<1||u>100)continue;if(K())return u;const b=E.getBoundingClientRect();if(!(b.width===0||b.width>150)&&!(b.top<0||b.top>window.innerHeight))return u}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let g=null,w=-1,T=0;const O=Date.now();for(;!g&&Date.now()-O<18e4;){const $=document.querySelectorAll("img");for(const E of $){if(y.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;if(K()?E.naturalWidth>120&&E.naturalHeight>120:(()=>{const u=E.getBoundingClientRect();return u.width>120&&u.height>120&&u.top>0&&u.top<window.innerHeight*.85})()){const u=E.closest("div");if(u){g=u,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...${K()?" (hidden-mode)":""}`);break}}}if(!g)for(const E of $){if(y.has(E.src))continue;const D=E.closest("div"),_=(D==null?void 0:D.textContent)||"";if(_.includes("product.png")||_.includes("character.png")||_.includes(".png")||_.includes(".jpg"))continue;if(K()?E.naturalWidth>120&&E.naturalHeight>120:(()=>{const b=E.getBoundingClientRect();return b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85})()){const b=E.closest("div");if(b){g=b,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...${K()?" (hidden-mode)":""}`);break}}}if(!g){if(be()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=T>0?Date.now()-T:1/0;if(w<20||E>3e4){const _=Ft();if(_){P(`❌ สร้างรูปล้มเหลว: ${_}`),p.push(`image gen failed: ${_}`),I("img-wait","error");break}}const D=h();if(D!==null)D!==w&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${D}%`),w=D,I("img-wait","active",D)),T=Date.now();else if(w>30){const _=Math.floor((Date.now()-T)/1e3);_>=3&&n(`🖼️ % หายที่ ${w}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&_>=5&&w>50&&(n("🍎 Tab ซ่อน + รูปน่าจะเสร็จ → เปิด tab เต็มเพื่อตรวจหารูป"),await De(),await f(3e3))}document.hidden&&w>0&&Date.now()-T>1e4&&await we(),document.hidden&&w<1&&Date.now()-O>3e4&&await we(),await f(3e3)}}if(!g)P("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),I("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),I("img-wait","done",100),await De();const $=g.getBoundingClientRect(),E=$.left+$.width/2,D=$.top+$.height/2,_={bubbles:!0,cancelable:!0,clientX:E,clientY:D};g.dispatchEvent(new PointerEvent("pointerenter",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseenter",_)),g.dispatchEvent(new PointerEvent("pointerover",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseover",_)),g.dispatchEvent(new PointerEvent("pointermove",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousemove",_)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await f(1500);let u=null;for(const b of["more_vert","more_horiz","more"]){const N=je(b);for(const H of N){const A=H.getBoundingClientRect();if(A.top>=$.top-20&&A.top<=$.bottom&&A.right>=$.right-150&&A.right<=$.right+20){u=H;break}}if(u)break}if(!u){const b=document.querySelectorAll("button");for(const N of b){const H=N.getBoundingClientRect();if(H.width<50&&H.height<50&&H.top>=$.top-10&&H.top<=$.top+60&&H.left>=$.right-80){const A=N.querySelectorAll("i");for(const q of A)if((((B=q.textContent)==null?void 0:B.trim())||"").includes("more")){u=N;break}if(u)break;const V=N.getAttribute("aria-label")||"";if(V.includes("เพิ่มเติม")||V.includes("more")){u=N;break}}}}if(!u)P("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const b=u.getBoundingClientRect(),N=b.left+b.width/2,H=b.top+b.height/2,A={bubbles:!0,cancelable:!0,clientX:N,clientY:H,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",A)),await f(80),u.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",A)),u.dispatchEvent(new MouseEvent("click",A)),n("คลิกปุ่ม 3 จุดแล้ว"),await f(1500);let V=null;const q=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const U of q){const W=(U.textContent||"").trim();if(W.includes("ทำให้เป็นภาพเคลื่อนไหว")||W.includes("Animate")||W.includes("animate")){V=U;break}}if(!V)P("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const U=V.getBoundingClientRect(),W=U.left+U.width/2,ee=U.top+U.height/2,ne={bubbles:!0,cancelable:!0,clientX:W,clientY:ee,button:0};V.dispatchEvent(new PointerEvent("pointerdown",{...ne,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mousedown",ne)),await f(80),V.dispatchEvent(new PointerEvent("pointerup",{...ne,pointerId:1,isPrimary:!0,pointerType:"mouse"})),V.dispatchEvent(new MouseEvent("mouseup",ne)),V.dispatchEvent(new MouseEvent("click",ne)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),I("animate","done"),await f(3e3)}}}}catch(h){P(`ขั้น 4 ผิดพลาด: ${h.message}`),s.push("⚠️ Animate")}if(be()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Me(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),I("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await f(3e3);let h=!1;const g=document.querySelectorAll("button, span, div");for(const $ of g){const E=($.textContent||"").trim(),D=$.getBoundingClientRect();if((E==="วิดีโอ"||E==="Video"||E.includes("วิดีโอ"))&&D.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let w=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(E=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>E())),w=!0;const $=Date.now();for(;document.hidden&&Date.now()-$<5e3;)await f(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await f(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await f(1e3);let T=!1;for(let $=1;$<=5&&!T;$++){if($>1&&document.hidden){n(`🔄 Retry ${$}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),w=!0;const _=Date.now();for(;document.hidden&&Date.now()-_<5e3;)await f(200);document.hidden||await f(2e3)}catch{}}const E=lt();if(!E){n(`⚠️ ครั้งที่ ${$}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await f(3e3);continue}$>1&&(E.focus(),await f(500)),await Oe(E,t.videoPrompt),await f(500);const D=(E.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();D.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${$} (${D.length} ตัวอักษร)`),s.push("✅ Video Prompt"),I("vid-prompt","done"),T=!0):(n(`⚠️ ครั้งที่ ${$}: Prompt ไม่ถูกวาง (ได้ ${D.length} ตัวอักษร)`),await f(1500))}if(!T)throw P("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),s.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),I("vid-prompt","error"),new Error("Video prompt paste failed");await f(1e3),I("vid-generate","active");const O=st();if(O){const $=O.getBoundingClientRect(),E=$.left+$.width/2,D=$.top+$.height/2,_={bubbles:!0,cancelable:!0,clientX:E,clientY:D,button:0};O.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousedown",_)),await f(80),O.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mouseup",_)),O.dispatchEvent(new MouseEvent("click",_)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),I("vid-generate","done"),await f(500),O.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousedown",_)),await f(80),O.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mouseup",_)),O.dispatchEvent(new MouseEvent("click",_)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else P("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),p.push("video generate button not found"),I("vid-generate","error");if(w){await f(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(h){P(`ขั้น 5 ผิดพลาด: ${h.message}`),s.push("⚠️ Video Gen"),p.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),$e("animate"),$e("vid-prompt"),$e("vid-generate"),$e("vid-wait");if(t.videoPrompt){I("vid-wait","active");const h=t.sceneCount||1,g=t.videoScenePrompts||[t.videoPrompt];if(h>1)try{rn(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);const w=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const E of $){if(E.closest("#netflow-engine-overlay"))continue;const D=(E.textContent||"").trim();if(D.length>10)continue;const _=D.match(/(\d{1,3})\s*%/);if(!_)continue;const u=parseInt(_[1],10);if(u<1||u>100)continue;if(K())return u;const b=E.getBoundingClientRect();if(!(b.width===0||b.width>150)&&!(b.top<0||b.top>window.innerHeight))return u}return null},T=async($=6e5)=>{n("รอการสร้างวิดีโอ..."),I("vid-wait","active"),await f(5e3);const E=()=>{const R=document.querySelectorAll("div, span, p, label, strong, small");let G=0;for(const j of R){if(j.closest("#netflow-engine-overlay"))continue;const te=(j.textContent||"").trim();if(te.includes("%")&&te.length<15){const oe=j.tagName.toLowerCase(),ie=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",ae=j.getBoundingClientRect();if(n(`  🔍 "${te}" ใน <${oe}.${ie}> ที่ (${ae.left.toFixed(0)},${ae.top.toFixed(0)}) w=${ae.width.toFixed(0)}`),G++,G>=5)break}}G===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},D=async(R,G)=>{n(`🔄 Policy Retry ${G}/2 — สร้าง Safe Prompt แล้วลองใหม่...`),await De(),await f(2e3);const j=lt();if(!j)return P("❌ Retry: ไม่พบช่อง Prompt"),!1;j.focus(),await f(300);const te=window.getSelection();te&&te.selectAllChildren(j),await f(200),j.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"deleteContentBackward"})),j.dispatchEvent(new InputEvent("input",{bubbles:!0,inputType:"deleteContentBackward"})),await f(500);let oe=dn(R);G>=2&&(oe=oe.substring(0,600).replace(/\s\S*$/,"").trim(),n(`🛡️ 2nd retry: ultra-short prompt (${oe.length} chars)`)),await Oe(j,oe),await f(500);const ie=(j.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(ie.length<20)return P(`❌ Retry: วาง Safe Prompt ไม่สำเร็จ (${ie.length} ตัวอักษร)`),!1;n(`✅ วาง Safe Prompt สำเร็จ (${ie.length} ตัวอักษร)`),await f(500);const ae=st();if(!ae)return P("❌ Retry: ไม่พบปุ่ม Generate"),!1;const Ye=ae.getBoundingClientRect(),wn=Ye.left+Ye.width/2,xn=Ye.top+Ye.height/2,Le={bubbles:!0,cancelable:!0,clientX:wn,clientY:xn,button:0};return ae.dispatchEvent(new PointerEvent("pointerdown",{...Le,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ae.dispatchEvent(new MouseEvent("mousedown",Le)),await f(80),ae.dispatchEvent(new PointerEvent("pointerup",{...Le,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ae.dispatchEvent(new MouseEvent("mouseup",Le)),ae.dispatchEvent(new MouseEvent("click",Le)),n(`✅ คลิก Generate สำหรับ Safe Retry ${G}`),await f(5e3),!0},_=at();n(_?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),E();const u=Date.now();let b=-1,N=0,H=!1,A=0;const V=2;for(;Date.now()-u<$;){const R=w();if(R!==null){if(R!==b&&(n(`ความคืบหน้าวิดีโอ: ${R}%`),b=R,I("vid-wait","active",R)),N=Date.now(),R>=100){n("✅ ตรวจพบ 100%!"),H=!0;break}}else if(b>30){const G=Math.floor((Date.now()-N)/1e3);if(G>=5){n(`✅ % หายไปที่ ${b}% (หาย ${G} วินาที) — วิดีโอเสร็จ!`),H=!0;break}n(`⏳ % หายที่ ${b}% — ยืนยันใน ${5-G} วินาที...`)}else{const G=Math.floor((Date.now()-u)/1e3);G%15<3&&n(`⏳ รอ... (${G} วินาที) ไม่พบ %`)}if(!H&&b>0&&at(!0)&&!_){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${b}% — วิดีโอเสร็จ!`),H=!0;break}if(be())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(b<1){const G=Ft();if(G){if(P(`❌ สร้างวิดีโอล้มเหลว: ${G}`),A<V&&t.videoPrompt)if(A++,n(`🔄 Policy violation detected — attempting safe retry ${A}/${V}...`),await D(t.videoPrompt,A)){b=-1,N=0,n(`✅ Safe retry ${A} started — continuing to monitor...`);continue}else P(`❌ Safe retry ${A} failed to start`);return null}}document.hidden&&b>0&&Date.now()-N>1e4&&await we(),document.hidden&&b<1&&Date.now()-u>3e4&&await we(),await f(3e3)}await De();let q=null;for(let R=1;R<=10&&(q=at(),!q);R++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${R}/10)`),R%3===0&&await De(),await f(3e3);if(!q)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),I("vid-wait","error"),null;const U=q;H?(I("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await f(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const W=U.getBoundingClientRect();let ee=W.left+W.width/2,ne=W.top+W.height/2,ue=U;const xe=U.querySelector("video, img, canvas");if(xe){const R=xe.getBoundingClientRect();R.width>50&&R.height>50&&(ee=R.left+R.width/2,ne=R.top+R.height/2,ue=xe,n(`🎯 พบรูปย่อ <${xe.tagName.toLowerCase()}> ในการ์ดที่ (${ee.toFixed(0)},${ne.toFixed(0)}) ${R.width.toFixed(0)}x${R.height.toFixed(0)}`))}else ne=W.top+W.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${ee.toFixed(0)},${ne.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${ee.toFixed(0)}, ${ne.toFixed(0)})...`),Be(ue);for(let R=0;R<8;R++){const G={bubbles:!0,cancelable:!0,clientX:ee+R%2,clientY:ne};ue.dispatchEvent(new PointerEvent("pointermove",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),ue.dispatchEvent(new MouseEvent("mousemove",G)),await f(500)}try{chrome.storage.local.set({[pe()]:{timestamp:Date.now(),action:"mute_video",sceneCount:h,scenePrompts:g,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${h} ฉาก, ${g.length} prompts, theme: ${t.theme})`)}catch(R){n(`⚠️ ไม่สามารถบันทึก pending action: ${R.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await O(ue),n("✅ คลิกการ์ดวิดีโอเสร็จ"),U},O=async $=>{const E=$.getBoundingClientRect(),D=E.left+E.width/2,_=E.top+E.height/2,u={bubbles:!0,cancelable:!0,clientX:D,clientY:_,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",u)),await f(80),$.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",u)),$.dispatchEvent(new MouseEvent("click",u)),await f(50),$.click(),n("คลิกการ์ดวิดีโอแล้ว"),await f(2e3)};try{if(!await T())P("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),I("vid-wait","error");else{s.push("✅ Video Complete"),I("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await f(3e3);const E=await new Promise(D=>{chrome.storage.local.get(pe(),_=>{if(chrome.runtime.lastError){D(null);return}D((_==null?void 0:_[pe()])||null)})});E&&!E._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(pe()),E.action==="mute_video"?await Gt(E.sceneCount||1,E.scenePrompts||[],E.theme):E.action==="wait_scene_gen_and_download"&&await Ht(E.sceneCount||2,E.currentScene||2,E.theme,E.scenePrompts||[]))}}catch($){P(`ขั้น 6 ผิดพลาด: ${$.message}`),s.push("⚠️ Step6"),p.push(`step 6: ${$.message}`)}}const m=p.length===0;try{Me(m?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:m,message:m?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${p.join(", ")}`,step:m?"done":"partial"}}async function Gt(t,e=[],o){var L;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{o&&Fe(o)}catch{}try{qe(t)}catch(M){n(`⚠️ showOverlay error: ${M.message}`)}try{const M=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const B of M)I(B,"done");t>=2&&I("scene2-prompt","active"),n(`✅ overlay restored: ${M.length} steps done, sceneCount=${t}`)}catch(M){n(`⚠️ overlay restore error: ${M.message}`)}await f(1500);const a=(()=>{for(const M of document.querySelectorAll("button")){const B=M.querySelectorAll("i");for(const g of B){const w=(g.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const T=M.getBoundingClientRect();if(T.width>0&&T.height>0)return M}}const h=(M.getAttribute("aria-label")||"").toLowerCase();if(h.includes("mute")||h.includes("ปิดเสียง")){const g=M.getBoundingClientRect();if(g.width>0&&g.height>0)return M}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await f(2e3);for(let u=2;u<=t;u++){const b=e[u-1];if(!b){P(`ไม่พบ prompt สำหรับฉากที่ ${u}`);continue}n(`── ฉากที่ ${u}/${t}: วาง prompt + generate ──`);let N=null;const H=Date.now();for(;!N&&Date.now()-H<1e4;){const R=document.querySelectorAll("[data-slate-editor='true']");if(R.length>0&&(N=R[R.length-1]),!N){const G=document.querySelectorAll("[role='textbox'][contenteditable='true']");G.length>0&&(N=G[G.length-1])}N||await f(1e3)}if(!N){P("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${N.tagName.toLowerCase()}> ${N.className.substring(0,40)}`),await Oe(N,b),n(`วาง prompt ฉาก ${u} (${b.length} ตัวอักษร) ✅`);try{I(`scene${u}-prompt`,"done"),I(`scene${u}-gen`,"active")}catch{}await f(1e3);const A=N.getBoundingClientRect();let V=null,q=1/0;for(const R of document.querySelectorAll("button")){if(R.disabled)continue;const G=R.querySelectorAll("i");let j=!1;for(const ie of G)if((ie.textContent||"").trim()==="arrow_forward"){j=!0;break}if(!j)continue;const te=R.getBoundingClientRect();if(te.width<=0||te.height<=0)continue;const oe=Math.abs(te.top-A.top)+Math.abs(te.right-A.right);oe<q&&(q=oe,V=R)}if(!V)for(const R of document.querySelectorAll("button")){const G=R.querySelectorAll("i");for(const j of G)if((j.textContent||"").trim()==="arrow_forward"){const te=R.getBoundingClientRect();if(te.width>0&&te.height>0){V=R;break}}if(V)break}if(!V){P("ไม่พบปุ่ม Generate/Send");return}await new Promise(R=>{chrome.storage.local.set({[pe()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:t,currentScene:u,scenePrompts:e}},()=>R())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${u}/${t})`),await J(V),n(`คลิก Generate ฉาก ${u} ✅`);try{I(`scene${u}-gen`,"done"),I(`scene${u}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${u} gen เสร็จ ──`),await f(5e3);let U=0,W=0;const ee=Date.now(),ne=6e5,ue=5e3;let xe=!1;for(;Date.now()-ee<ne;){let R=null;const G=document.querySelectorAll("div, span, p, label, strong, small");for(const j of G){if(j.closest("#netflow-engine-overlay"))continue;const oe=(j.textContent||"").trim().match(/^(\d{1,3})%$/);if(oe){const ie=j.getBoundingClientRect();if(ie.width>0&&ie.height>0&&ie.width<120&&ie.height<60){R=parseInt(oe[1],10);break}}}if(R!==null){if(R!==U){n(`🎬 ฉาก ${u} ความคืบหน้า: ${R}%`),U=R;try{I(`scene${u}-wait`,"active",R)}catch{}}W=0}else if(U>0){if(W===0)W=Date.now(),n(`🔍 ฉาก ${u}: % หายไป (จาก ${U}%) — กำลังยืนยัน...`);else if(Date.now()-W>=ue){n(`✅ ฉาก ${u}: % หายไป ${ue/1e3} วินาที — เจนเสร็จ!`),xe=!0;break}}if(be()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&U>0&&W===0&&await we(),await f(2e3)}xe||P(`ฉาก ${u} หมดเวลา`),n(`✅ ฉาก ${u} เสร็จแล้ว`);try{I(`scene${u}-wait`,"done",100)}catch{}chrome.storage.local.remove(pe()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await f(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{I("download","active")}catch{}let M=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),M=!0,await f(5e3)}catch{}}await f(2e3);const B=Date.now();let h=null;const g=Date.now();for(;!h&&Date.now()-g<1e4;){for(const u of document.querySelectorAll("button")){const b=u.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const N=u.getBoundingClientRect();if(N.width>0&&N.height>0){h=u;break}}}h||await f(1e3)}if(!h){if(P("ไม่พบปุ่มดาวน์โหลด"),M)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await J(h),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await f(1500);let w=null;for(let u=0;u<3&&!w;u++){u>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`),h.isConnected&&(await J(h),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(2e3)));let b=null;const N=Date.now();for(;!b&&Date.now()-N<5e3;){for(const A of document.querySelectorAll("[role='menuitem']"))if((A.textContent||"").trim().includes("Full Video")){const q=A.getBoundingClientRect();if(q.width>0&&q.height>0){b=A;break}}b||await f(500)}if(!b){P("ไม่พบ Full Video");continue}Be(b),await f(500),await J(b),n("คลิก/hover Full Video ✅"),await f(2e3);const H=Date.now();for(;!w&&Date.now()-H<8e3;){for(const A of document.querySelectorAll("button[role='menuitem'], div[role='menuitem'] button")){const V=A.querySelectorAll("span");for(const q of V)if((q.textContent||"").trim()==="720p"){const U=A.getBoundingClientRect();if(U.width>0&&U.height>0){w=A;break}}if(w)break}w||(b.isConnected&&Be(b),await f(500))}}if(!w){if(P("ไม่พบ 720p"),M)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await J(w),n("คลิก 720p ✅"),M){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const T=Date.now();let O=!1,$=!1;for(;Date.now()-T<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(u.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),O=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&($||($=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(O)break;if($){let u=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),O=!0;break}}if(be()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await f(2e3)}if(!O){P("เตรียมไฟล์หมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let E=!1;const D=Date.now();for(;Date.now()-D<6e4&&!E;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:B},b=>{chrome.runtime.lastError?P(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),E=!0,b.downloadUrl&&(i=b.downloadUrl,n(`[TikTok] จะใช้ download URL: ${b.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-D)/1e3)}s)`),u()})})}catch(u){P(`ตรวจสอบผิดพลาด: ${u.message}`)}E||await f(3e3)}E||P("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const _=await et();i||(i=_);try{I("open","done"),Me(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),tt(i),Je(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await f(2e3);const d=(M,B="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const h of document.querySelectorAll(B)){const g=(h.textContent||"").trim();if(g.includes(M)&&g.length<100){const w=h.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return h}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const c=Date.now();for(;!l&&Date.now()-c<1e4;){for(const M of document.querySelectorAll("button, [role='button']")){const B=(M.textContent||"").trim(),h=B.toLowerCase();if((h.includes("download")||h.includes("ดาวน์โหลด"))&&B.length<80){const g=M.getBoundingClientRect();if(g.width>0&&g.height>0){l=M;break}}}if(!l)for(const M of document.querySelectorAll("button")){const B=(M.getAttribute("aria-label")||"").toLowerCase();if(B.includes("download")||B.includes("ดาวน์")){const h=M.getBoundingClientRect();if(h.width>0&&h.height>0){l=M;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await f(1e3))}if(!l){P("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await J(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await f(1500);const s=Date.now();let p=null;const x=Date.now();for(;!p&&Date.now()-x<5e3;)p=d("1080p"),p||(n("รอ 1080p..."),await f(500));if(!p){P("ไม่พบ 1080p");return}await J(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const v=Date.now();let S=!1,F=!1,C=0;const y=3e3;for(;Date.now()-v<3e5;){const B=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const g of document.querySelectorAll("div, span, p")){const w=(g.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(L=g.textContent)==null?void 0:L.trim()}")`),S=!0;break}}if(S)break;if(B.includes("upscaling your video")||B.includes("กำลังอัปสเกล")){F=!0,C=0;const g=Math.floor((Date.now()-v)/1e3);n(`⏳ กำลังอัปสเกล... (${g} วินาที)`)}else if(F){if(C===0)C=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-C>=y){n(`✅ ข้อความ Upscaling หายไป ${y/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const g=Math.floor((Date.now()-v)/1e3);g%10<3&&n(`⏳ รอ Upscale... (${g} วินาที)`)}if(be()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await f(2e3)}if(!S){P("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let r=!1;const m=Date.now();for(;Date.now()-m<6e4&&!r;){try{await new Promise(M=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},B=>{chrome.runtime.lastError?P(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):B!=null&&B.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${B.message}`),r=!0,B.downloadUrl&&(i=B.downloadUrl,n(`[TikTok] จะใช้ download URL: ${B.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-m)/1e3)}s)`),M()})})}catch(M){P(`ตรวจสอบผิดพลาด: ${M.message}`)}r||await f(3e3)}r||P("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const k=await et();i||(i=k),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),tt(i),Je(2e3)}async function Ht(t=2,e=2,o,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{o&&Fe(o)}catch{}try{qe(t)}catch(g){n(`⚠️ showOverlay error: ${g.message}`)}try{const g=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)g.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&g.push(`scene${w}-wait`);for(const w of g)I(w,"done");I(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${g.length} steps done (scene ${e}/${t} navigate)`)}catch(g){n(`⚠️ overlay restore error: ${g.message}`)}await f(2e3);const i=(()=>{for(const g of document.querySelectorAll("button")){const w=g.querySelectorAll("i");for(const T of w){const O=(T.textContent||"").trim();if(O==="volume_up"||O==="volume_off"||O==="volume_mute"){const $=g.getBoundingClientRect();if($.width>0&&$.height>0)return g}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let d=0,l=0;const c=Date.now(),s=6e5,p=5e3;let x=!1,v=0;for(;Date.now()-c<s;){let g=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const T of w){if(T.closest("#netflow-engine-overlay"))continue;const $=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if($){const E=T.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){g=parseInt($[1],10);break}}}if(g!==null){if(v=0,g!==d){n(`🎬 scene ${e} ความคืบหน้า: ${g}%`),d=g;try{I(`scene${e}-wait`,"active",g)}catch{}}l=0}else if(d>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${d}%) — กำลังยืนยัน...`);else if(Date.now()-l>=p){n(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),x=!0;break}}else if(v++,v>=15){const T=document.querySelectorAll("video");let O=!1;for(const $ of T)if($.readyState>=2&&!$.paused&&$.getBoundingClientRect().width>200){O=!0;break}if(O){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),x=!0;break}if(v>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),x=!0;break}}document.hidden&&d>0&&l===0&&await we(),await f(2e3)}x||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{I(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await f(2e3);for(let g=e+1;g<=t;g++){const w=a[g-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${g} — ข้าม`);continue}n(`── ฉากที่ ${g}/${t}: วาง prompt + generate (pending recovery) ──`);let T=null;const O=Date.now();for(;!T&&Date.now()-O<1e4;){const A=document.querySelectorAll("[data-slate-editor='true']");if(A.length>0&&(T=A[A.length-1]),!T){const V=document.querySelectorAll("[role='textbox'][contenteditable='true']");V.length>0&&(T=V[V.length-1])}T||await f(1e3)}if(!T){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${g}`);break}await Oe(T,w),n(`วาง prompt ฉาก ${g} (${w.length} ตัวอักษร) ✅`);try{I(`scene${g}-prompt`,"done"),I(`scene${g}-gen`,"active")}catch{}await f(1e3);const $=T.getBoundingClientRect();let E=null,D=1/0;for(const A of document.querySelectorAll("button")){if(A.disabled)continue;const V=A.querySelectorAll("i");let q=!1;for(const ee of V)if((ee.textContent||"").trim()==="arrow_forward"){q=!0;break}if(!q)continue;const U=A.getBoundingClientRect();if(U.width<=0||U.height<=0)continue;const W=Math.abs(U.top-$.top)+Math.abs(U.right-$.right);W<D&&(D=W,E=A)}if(!E)for(const A of document.querySelectorAll("button")){const V=A.querySelectorAll("i");for(const q of V)if((q.textContent||"").trim()==="arrow_forward"){const U=A.getBoundingClientRect();if(U.width>0&&U.height>0){E=A;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${g}`);break}await new Promise(A=>{chrome.storage.local.set({[pe()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:o,sceneCount:t,currentScene:g,scenePrompts:a}},()=>A())}),await J(E),n(`คลิก Generate ฉาก ${g} ✅`);try{I(`scene${g}-gen`,"done"),I(`scene${g}-wait`,"active")}catch{}await f(5e3);let _=0,u=0;const b=Date.now();let N=!1,H=0;for(;Date.now()-b<6e5;){let A=null;const V=document.querySelectorAll("div, span, p, label, strong, small");for(const q of V){if(q.closest("#netflow-engine-overlay"))continue;const W=(q.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const ee=q.getBoundingClientRect();if(ee.width>0&&ee.height>0&&ee.width<120&&ee.height<60){A=parseInt(W[1],10);break}}}if(A!==null){if(H=0,A!==_){n(`🎬 ฉาก ${g} ความคืบหน้า: ${A}%`),_=A;try{I(`scene${g}-wait`,"active",A)}catch{}}u=0}else if(_>0){if(u===0)u=Date.now();else if(Date.now()-u>=5e3){n(`✅ ฉาก ${g}: เจนเสร็จ!`),N=!0;break}}else if(H++,H>=15){const q=document.querySelectorAll("video");let U=!1;for(const W of q)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){U=!0;break}if(U){n(`✅ ฉาก ${g}: พบวิดีโอเล่นอยู่ — เสร็จ`),N=!0;break}if(H>=30){n(`✅ ฉาก ${g}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),N=!0;break}}document.hidden&&_>0&&u===0&&await we(),await f(2e3)}N||n(`⚠️ ฉาก ${g} หมดเวลา`);try{I(`scene${g}-wait`,"done",100)}catch{}n(`✅ ฉาก ${g} เสร็จแล้ว`),chrome.storage.local.remove(pe()),await f(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await f(3e3);let S=null;try{I("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const F=Date.now();let C=null;const y=Date.now();for(;!C&&Date.now()-y<1e4;){for(const g of document.querySelectorAll("button")){const w=g.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const T=g.getBoundingClientRect();if(T.width>0&&T.height>0){C=g;break}}}C||await f(1e3)}if(!C){P("ไม่พบปุ่มดาวน์โหลด");return}await J(C),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await f(1500);let r=null;for(let g=0;g<3&&!r;g++){g>0&&(n(`🔄 ลองหา 720p ครั้งที่ ${g+1}...`),C.isConnected&&(await J(C),n("🔄 คลิกปุ่ม Download อีกครั้ง (เปิดเมนูใหม่)"),await f(2e3)));let w=null;const T=Date.now();for(;!w&&Date.now()-T<5e3;){for(const $ of document.querySelectorAll("[role='menuitem']"))if(($.textContent||"").trim().includes("Full Video")){const D=$.getBoundingClientRect();if(D.width>0&&D.height>0){w=$;break}}w||await f(500)}if(!w){P("ไม่พบ Full Video");continue}Be(w),await f(500),await J(w),n("คลิก/hover Full Video ✅"),await f(2e3);const O=Date.now();for(;!r&&Date.now()-O<8e3;){for(const $ of document.querySelectorAll("button[role='menuitem'], div[role='menuitem'] button")){const E=$.querySelectorAll("span");for(const D of E)if((D.textContent||"").trim()==="720p"){const _=$.getBoundingClientRect();if(_.width>0&&_.height>0){r=$;break}}if(r)break}r||(w.isConnected&&Be(w),await f(500))}}if(!r){P("ไม่พบ 720p");return}await J(r),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const m=Date.now();let k=!1,L=!1;for(;Date.now()-m<3e5;){for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(g.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),k=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(L||(L=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(k)break;if(L){let g=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){g=!0;break}if(!g){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),k=!0;break}}await f(2e3)}if(!k){P("เตรียมไฟล์หมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await f(5e3);let M=!1;const B=Date.now();for(;Date.now()-B<6e4&&!M;){try{await new Promise(g=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:F},w=>{chrome.runtime.lastError?P(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),M=!0,w.downloadUrl&&(S=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-B)/1e3)}s)`),g()})})}catch(g){P(`ตรวจสอบผิดพลาด: ${g.message}`)}M||await f(3e3)}M||P("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const h=await et();S||(S=h);try{I("open","done"),Me(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),tt(S),Je(2e3)}async function bn(){try{await sn;const t=pe();let e=await new Promise(l=>{chrome.storage.local.get(t,c=>{if(chrome.runtime.lastError){l(null);return}l((c==null?void 0:c[t])||null)})});if(!e&&Ee){const l="netflow_pending_action";e=await new Promise(c=>{chrome.storage.local.get(l,s=>{if(chrome.runtime.lastError){c(null);return}c((s==null?void 0:s[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await f(300),!await new Promise(l=>{chrome.storage.local.get(t,c=>{const s=c==null?void 0:c[t];l((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await Gt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ht(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,o)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),o({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),hn(t).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),Rt()}).catch(a=>{if(a instanceof it||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ae("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{At()}catch{}}else console.error("[Netflow AI] Generate error:",a);Rt()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,o({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return o({status:"ready"}),!1;if((t==null?void 0:t.type)==="CAPTURE_PAGE_VIDEO")return(async()=>{try{const a=document.querySelectorAll("video");let i="",d=0;for(const p of a){const x=p.src||p.currentSrc||"";if(!x)continue;const v=p.getBoundingClientRect(),S=v.width*v.height;(S>d||!i&&x)&&(d=S,i=x)}if(!i){o({success:!1,error:"No video found"});return}const l=await fetch(i);if(!l.ok){o({success:!1,error:"HTTP "+l.status});return}const c=await l.blob();if(c.size<1e4){o({success:!1,error:"Video too small: "+c.size});return}const s=await new Promise((p,x)=>{const v=new FileReader;v.onloadend=()=>p(v.result),v.onerror=()=>x(new Error("FileReader error")),v.readAsDataURL(c)});o({success:!0,data:s,size:c.size})}catch(a){o({success:!1,error:a.message})}})(),!0;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return o({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await f(500);const a=fn();if(!a){P("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),d=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const s=document.elementFromPoint(d,l);s?(await J(s),n(`คลิก ${c+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await J(a),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await f(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),(async()=>{try{const t=await new Promise(e=>{chrome.storage.local.get("netflow_preshow_overlay",o=>{if(chrome.runtime.lastError){e(null);return}e((o==null?void 0:o.netflow_preshow_overlay)||null)})});if(t&&t.timestamp&&Date.now()-t.timestamp<3e4){n("⚡ Pre-show overlay — แสดง overlay ทันที");try{Fe(t.theme)}catch{}try{qe(t.sceneCount||1)}catch(e){n(`⚠️ pre-show overlay error: ${e.message}`)}chrome.storage.local.remove("netflow_preshow_overlay")}}catch{}})(),bn()})();
