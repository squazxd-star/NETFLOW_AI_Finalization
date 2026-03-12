(function(){"use strict";const pe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Z=pe.green,ke=null;function Ge(t){t&&pe[t]&&(ke=t,Z=pe[t],ot(),requestAnimationFrame(()=>kt()))}function Ft(){if(ke&&pe[ke])return pe[ke];try{const t=localStorage.getItem("netflow_app_theme");if(t&&pe[t])return pe[t]}catch{}return pe.green}let ne=0,oe=255,ie=65;function ot(){const t=Z.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}const it='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',at='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let V=null,J=null,K=null,rt=0,De=null,Ce=null,Oe=null,He=0,fe=!1,ce=null,Te=null,Me=null,be=1,Y=[];function Fe(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const se=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=Fe(1);function zt(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,i=t.hex,p=t.accentHex,l=t.doneHex,c=(()=>{const m=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=f=>Math.min(255,f+80);return`#${[1,2,3].map(f=>o(parseInt(m[f],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const m=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=f=>Math.min(255,f+60);return`#${[1,2,3].map(f=>o(parseInt(m[f],16)).toString(16).padStart(2,"0")).join("")}`})(),d=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),x=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,$=d?parseInt(d[1],16)/x:0,S=d?parseInt(d[2],16)/x:1,F=d?parseInt(d[3],16)/x:.25,I=m=>`${Math.round($*m)}, ${Math.round(S*m)}, ${Math.round(F*m)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${I(18)},0.94) 0%, rgba(${I(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${I(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${I(180)},0.05),
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
            0 0 200px rgba(${I(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${I(180)},0.08),
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
    background: linear-gradient(180deg, rgba(${I(5)},0.95) 0%, rgba(${I(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${I(6)},0.75) 0%, rgba(${I(3)},0.92) 100%);
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
    background: rgba(${I(8)}, 0.88);
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
    background: linear-gradient(90deg, ${i}, ${p});
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
    background: rgba(${I(8)},0.8);
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
    background: rgba(${I(8)}, 0.9);
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

    `}function Ue(){K||(K=document.createElement("style"),K.id="netflow-overlay-styles",K.textContent=zt(Z),document.head.appendChild(K))}function st(t){t.innerHTML="",Y.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function lt(){const t=document.getElementById("nf-terminal");if(!t)return;st(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function ct(t,e){let c="";for(let S=0;S<20;S++){const F=S/20*Math.PI*2,I=(S+.2)/20*Math.PI*2,m=(S+.5)/20*Math.PI*2,o=(S+.8)/20*Math.PI*2,f=(S+1)/20*Math.PI*2;c+=`${S===0?"M":"L"}${(120+100*Math.cos(F)).toFixed(1)},${(120+100*Math.sin(F)).toFixed(1)} `,c+=`L${(120+100*Math.cos(I)).toFixed(1)},${(120+100*Math.sin(I)).toFixed(1)} `,c+=`L${(120+112*Math.cos(m)).toFixed(1)},${(120+112*Math.sin(m)).toFixed(1)} `,c+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,c+=`L${(120+100*Math.cos(f)).toFixed(1)},${(120+100*Math.sin(f)).toFixed(1)} `}c+="Z";const s=14,d=72,x=62;let $="";for(let S=0;S<s;S++){const F=S/s*Math.PI*2,I=(S+.25)/s*Math.PI*2,m=(S+.75)/s*Math.PI*2,o=(S+1)/s*Math.PI*2;$+=`${S===0?"M":"L"}${(120+x*Math.cos(F)).toFixed(1)},${(120+x*Math.sin(F)).toFixed(1)} `,$+=`L${(120+d*Math.cos(I)).toFixed(1)},${(120+d*Math.sin(I)).toFixed(1)} `,$+=`L${(120+d*Math.cos(m)).toFixed(1)},${(120+d*Math.sin(m)).toFixed(1)} `,$+=`L${(120+x*Math.cos(o)).toFixed(1)},${(120+x*Math.sin(o)).toFixed(1)} `}return $+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <circle cx="120" cy="120" r="${x}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Nt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ce=document.createElement("canvas"),ce.id="nf-matrix-canvas",t.appendChild(ce);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let u=1;u<=5;u++){const b=document.createElement("div");b.className=`nf-ambient-orb nf-orb-${u}`,t.appendChild(b)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const c=document.createElement("div");c.className="nf-pat-binary",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const x=document.createElement("div");x.className="nf-pat-wave-h",t.appendChild(x);const $=document.createElement("div");$.className="nf-pat-radar",t.appendChild($);const S=document.createElement("div");S.className="nf-pat-ripple-1",t.appendChild(S);const F=document.createElement("div");F.className="nf-pat-ripple-2",t.appendChild(F);const I=document.createElement("div");I.className="nf-pat-techscan",t.appendChild(I);const m=document.createElement("div");m.className="nf-center-glow",t.appendChild(m);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const f=document.createElement("div");f.className="nf-crt-scanlines",t.appendChild(f);const k=document.createElement("div");k.className="nf-vignette",t.appendChild(k);for(let u=0;u<3;u++){const b=document.createElement("div");b.className="nf-pulse-ring",t.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(u=>{const b=document.createElement("div");b.className=`nf-corner-deco ${u}`,t.appendChild(b)});const q=document.createElement("button");q.className="nf-stop-btn",q.innerHTML='<span class="nf-stop-icon"></span> หยุด',q.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",q.onclick=()=>{var u;window.__NETFLOW_STOP__=!0;try{Ie("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((u=chrome.runtime)!=null&&u.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(q);const P=document.createElement("div");P.className="nf-layout";const A=document.createElement("div");A.className="nf-core-monitor",A.id="nf-core-monitor";const v=document.createElement("div");v.className="nf-core-header",v.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,A.appendChild(v);const h=document.createElement("div");h.className="nf-terminal",h.id="nf-terminal",st(h),A.appendChild(h);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const T=document.createElement("div");T.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(u=>{const b=document.createElement("div");b.className=`nf-frame-corner ${u}`,T.appendChild(b)}),w.appendChild(T);const O="http://www.w3.org/2000/svg",E=document.createElementNS(O,"svg");E.setAttribute("class","nf-engine-waves"),E.setAttribute("viewBox","0 0 560 140"),E.setAttribute("preserveAspectRatio","none"),E.id="nf-engine-waves";for(let u=0;u<4;u++){const b=document.createElementNS(O,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",u<2?"1.5":"1"),b.setAttribute("stroke",u<2?`rgba(${Z.rgb},${.14+u*.1})`:`rgba(${Z.accentRgb},${.1+(u-2)*.08})`),b.setAttribute("data-wave-idx",String(u)),E.appendChild(b)}w.appendChild(E);const y=document.createElement("div");y.className="nf-engine-brand-inner",y.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ct(Z.rgb,Z.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ct(Z.rgb,Z.accentRgb)}
        </div>
    `,w.appendChild(y);const D=document.createElement("div");D.className="nf-engine-stats",D.id="nf-engine-stats",D.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([u,b,R])=>`<div class="nf-stat-item"><span class="nf-stat-label">${u}</span><span class="nf-stat-val" id="${b}">${R}</span></div>`).join(""),w.appendChild(D),A.appendChild(w),P.appendChild(A);const M=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];se.forEach((u,b)=>{const R=Lt(u);R.classList.add(M[b]),R.id=`nf-mod-${u.id}`,P.appendChild(R)}),t.appendChild(P);for(let u=0;u<30;u++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const R=.3+Math.random()*.4,G=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(ne*G)}, ${Math.floor(oe*G)}, ${Math.floor(ie*G)}, ${R})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,t.appendChild(b)}return t}function Lt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
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
        `,e.appendChild(p)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Vt(){rt=Date.now(),De=setInterval(()=>{const t=Math.floor((Date.now()-rt)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function dt(){De&&(clearInterval(De),De=null)}const qt=120,pt=160,ft=.4;let we=null,ut=0,gt=0,mt=0,Se=[];function Gt(t,e){Se=[];for(let r=0;r<qt;r++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const p=Math.random()*t,l=Math.random()*e,c=50+Math.random()*220,s=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Se.push({x:i===0?Math.random()*t:p+Math.cos(s)*c,y:i===0?Math.random()*e:l+Math.sin(s)*c,vx:(Math.random()-.5)*ft,vy:(Math.random()-.5)*ft,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:p,oCy:l,oRadius:c,oAngle:s,oSpeed:d})}}function Ht(){if(!ce)return;const t=ce;if(Te=t.getContext("2d"),!Te)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Se.length===0&&Gt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,i=0,p=!1;function l(){if(!Te||!ce){Me=null;return}if(Me=requestAnimationFrame(l),p=!p,p)return;const c=Te,s=ce.width,d=ce.height;c.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,c.fillRect(0,0,s,d),(!r||a!==s||i!==d)&&(a=s,i=d,r=c.createRadialGradient(s*.5,d*.5,0,s*.5,d*.5,Math.max(s,d)*.6),r.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=r,c.fillRect(0,0,s,d);const x=Se,$=x.length,S=pt*pt;for(let m=0;m<$;m++){const o=x[m];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>s&&(o.x=s,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>d&&(o.y=d,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const f=o.oAngle,k=o.oRadius*.7;o.x=o.oCx+k*Math.cos(f),o.y=o.oCy+k*Math.sin(f)*Math.cos(f),o.oCx+=Math.sin(f*.15)*.12,o.oCy+=Math.cos(f*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const f=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*f,o.y=o.oCy+Math.sin(o.oAngle)*f,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=s+30:o.x>s+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const f=o.oRadius+50;o.oCx<-f?o.oCx=s+f:o.oCx>s+f&&(o.oCx=-f),o.oCy<-f?o.oCy=d+f:o.oCy>d+f&&(o.oCy=-f)}}c.beginPath(),c.strokeStyle=`rgba(${ne},${oe},${ie},0.06)`,c.lineWidth=.4;const F=new Path2D;for(let m=0;m<$;m++){const o=x[m];for(let f=m+1;f<$;f++){const k=x[f],q=o.x-k.x,P=o.y-k.y,A=q*q+P*P;A<S&&(1-A/S<.4?(c.moveTo(o.x,o.y),c.lineTo(k.x,k.y)):(F.moveTo(o.x,o.y),F.lineTo(k.x,k.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${ne},${oe},${ie},0.18)`,c.lineWidth=.8,c.stroke(F),!we||ut!==ne||gt!==oe||mt!==ie){we=document.createElement("canvas");const m=48;we.width=m,we.height=m;const o=we.getContext("2d"),f=o.createRadialGradient(m/2,m/2,0,m/2,m/2,m/2);f.addColorStop(0,`rgba(${ne},${oe},${ie},0.9)`),f.addColorStop(.3,`rgba(${ne},${oe},${ie},0.35)`),f.addColorStop(1,`rgba(${ne},${oe},${ie},0)`),o.fillStyle=f,o.fillRect(0,0,m,m),ut=ne,gt=oe,mt=ie}const I=we;for(let m=0;m<$;m++){const o=x[m],f=.6+.4*Math.sin(o.pulsePhase),k=o.radius*5*(.8+f*.4);c.globalAlpha=.5+f*.4,c.drawImage(I,o.x-k/2,o.y-k/2,k,k)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let m=0;m<$;m++){const o=x[m];if(o.radius>2){const f=.6+.4*Math.sin(o.pulsePhase),k=o.radius*(.8+f*.4)*.35;c.moveTo(o.x+k,o.y),c.arc(o.x,o.y,k,0,Math.PI*2)}}c.fill()}l()}function Ut(){Me!==null&&(cancelAnimationFrame(Me),Me=null),ce=null,Te=null,Se=[]}let _e=null;const ze=560,Wt=140,ht=ze/2,bt=Wt/2,wt=[];for(let t=0;t<=ze;t+=8){const e=Math.abs(t-ht)/ht;wt.push(Math.pow(Math.min(1,e*1.6),.6))}const Yt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/ze,off:t*.6,spd:.7+t*.12}));let We=!1;function xt(){if(Ce=requestAnimationFrame(xt),We=!We,We)return;if(He+=.07,!_e){const e=document.getElementById("nf-engine-waves");if(!e){Ce=null;return}_e=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<_e.length;e++){const r=Yt[e],a=He*r.spd+r.off;t.length=0,t.push(`M 0 ${bt}`);let i=0;for(let p=0;p<=ze;p+=8){const l=bt+r.amp*wt[i++]*Math.sin(p*r.freq+a);t.push(`L${p} ${l*10+.5|0}`)}_e[e].setAttribute("d",t.join(" "))}}function Xt(){He=0,xt(),Ht(),Oe=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function yt(){Ce!==null&&(cancelAnimationFrame(Ce),Ce=null),Oe&&(clearInterval(Oe),Oe=null),_e=null,Ut()}function Ne(){let t=0;const e=Y.filter(d=>d.status!=="skipped").length;for(const d of Y){const x=document.getElementById(`nf-proc-${d.stepId}`);if(!x)continue;x.className="nf-proc-row";const $=x.querySelector(".nf-proc-badge");switch(d.status){case"done":x.classList.add("nf-proc-done"),$&&($.textContent="✅ done"),t++;break;case"active":x.classList.add("nf-proc-active"),$&&($.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":x.classList.add("nf-proc-error"),$&&($.textContent="❌ error");break;case"skipped":x.classList.add("nf-proc-skipped"),$&&($.textContent="— skip");break;default:x.classList.add("nf-proc-waiting"),$&&($.textContent="(queued)")}}const r=Y.findIndex(d=>d.status==="active"),a=r>=0?r+1:t>=e&&e>0?Y.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${Y.length}`);const p=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=Z.doneHex),l&&(l.style.background=Z.doneHex,l.style.boxShadow=`0 0 8px rgba(${Z.doneRgb},0.7)`)):Y.some(x=>x.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(x=>x.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=Z.hex,p.style.textShadow=`0 0 10px rgba(${Z.rgb},0.5)`);const c=document.getElementById("nf-terminal"),s=c==null?void 0:c.querySelector(".nf-proc-active");s&&c&&s.scrollIntoView({behavior:"smooth",block:"center"})}function vt(){J&&J.isConnected||(Ue(),J=document.createElement("button"),J.id="nf-toggle-btn",J.className="nf-toggle-visible",J.innerHTML=fe?it:at,J.title="ซ่อน/แสดง Netflow Overlay",J.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",J.onclick=()=>$t(),document.body.appendChild(J))}function $t(){V&&(vt(),fe?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),V.style.opacity="1",V.style.pointerEvents="auto",J&&(J.innerHTML=at),fe=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),V.style.opacity="0",V.style.pointerEvents="none",J&&(J.innerHTML=it),fe=!0))}const Et={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function kt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=ke;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=Et[e]||Et.green;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const i=Z.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Ye(t=1){if(Z=Ft(),ot(),V&&V.isConnected){V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",(!K||!K.isConnected)&&(K=null,Ue()),setTimeout(()=>{if(V)try{K!=null&&K.sheet&&K.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200);for(const e of se)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;be=t,Y=Fe(t),lt();for(const e of se)Xe(e);if(Le(),Ne(),!V.querySelector(".nf-stop-btn")){const e=document.createElement("button");e.className="nf-stop-btn",e.innerHTML='<span class="nf-stop-icon"></span> หยุด',e.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",e.onclick=()=>{var r;window.__NETFLOW_STOP__=!0;try{Ie("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((r=chrome.runtime)!=null&&r.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},V.appendChild(e)}fe&&$t();return}V&&!V.isConnected&&(V=null),K&&(K.remove(),K=null),Ue();for(const e of se)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;if(be=t,Y=Fe(t),t>1){const e=se.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const r=se.find(a=>a.id==="render");if(r){const a=r.steps.find(p=>p.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=r.steps.find(p=>p.id==="upscale");i&&(i.label="Full Video")}}V=Nt(),V.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;background:#0a0a0f !important;overflow:hidden !important;font-family:Inter,system-ui,-apple-system,sans-serif !important;",document.body.appendChild(V),V.classList.add("nf-visible"),fe=!1,vt(),Vt(),Xt(),requestAnimationFrame(()=>kt()),setTimeout(()=>{if(V)try{K!=null&&K.sheet&&K.sheet.cssRules.length>0&&(V.style.removeProperty("background"),V.style.removeProperty("font-family"),V.style.removeProperty("overflow"))}catch{}},200)}function Ct(){dt(),yt(),fe=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),J&&(J.remove(),J=null)}const jt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Kt(t,e,r){const a=Y.findIndex($=>$.status==="active"),i=Y.filter($=>$.status==="done").length,p=Y.length,l=a>=0?a+1:i>=p?p:i,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${l}/${p}`);let s=1;for(const $ of Y)if($.status==="active"||$.status==="done")if($.stepId.startsWith("scene")){const S=$.stepId.match(/^scene(\d+)-/);S&&(s=Math.max(s,parseInt(S[1],10)))}else($.stepId==="download"||$.stepId==="upscale"||$.stepId==="open")&&(s=be);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=be>1?`${s}/${be}`:"1/1"),e==="active"){const $=document.getElementById("nf-stat-status"),S=jt[t]||t.toUpperCase();$&&($.textContent=S)}else if(e==="done"&&i>=p){const $=document.getElementById("nf-stat-status");$&&($.textContent="COMPLETE")}else if(e==="error"){const $=document.getElementById("nf-stat-status");$&&($.textContent="ERROR")}const x=document.getElementById("nf-stat-progress");x&&(r!==void 0&&r>0?x.textContent=`${Math.min(100,r)}%`:e==="active"&&(x.textContent="—"))}function C(t,e,r){if(!V)return;for(const i of se)for(const p of i.steps)p.id===t&&(p.status=e,r!==void 0&&(p.progress=r));for(const i of Y)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),Kt(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}Le(),Ne()}function xe(t){C(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Pe(t=4e3){dt(),yt(),Le(),Ne(),setTimeout(()=>Ct(),t)}function Le(){for(const t of se){const e=t.steps.filter(s=>s.status!=="skipped").length,r=t.steps.filter(s=>s.status==="done").length,a=t.steps.some(s=>s.status==="active"),i=e>0?Math.round(r/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):a&&c.classList.add("nf-active"))}}function Qt(t){var a,i,p,l;be=t;const e=new Map;for(const c of Y)e.set(c.stepId,{status:c.status,progress:c.progress});Y=Fe(t);for(const c of Y){const s=e.get(c.stepId);s&&(c.status=s.status,s.progress!==void 0&&(c.progress=s.progress))}if(lt(),t>1){const c=se.find(s=>s.id==="video");if(c){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=c.steps.find(d=>d.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=c.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)s.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),s.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),s.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});c.steps=s,Xe(c)}}const r=se.find(c=>c.id==="render");if(r&&t>1){const c=r.steps.find(d=>d.id==="download");c&&(c.label="ดาวน์โหลด 720p");const s=r.steps.find(d=>d.id==="upscale");s&&(s.label="Full Video"),Xe(r)}Le(),Ne()}function Xe(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(p)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Ie(t){t.replace(/^\[Netflow AI\]\s*/,"")}let ye=null,ue=null;const Jt=new Promise(t=>{ue=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(ye=t.tabId,console.log(`[Netflow AI] Tab ID: ${ye}`)),ue&&(ue(ye),ue=null)})}catch{ue&&(ue(null),ue=null)}function de(){return ye?`netflow_pending_action_${ye}`:"netflow_pending_action"}function Tt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ie(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},_=t=>{console.warn(`[Netflow AI] ${t}`);try{Ie(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function je(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?_(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){_(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Ke(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){i(!1);return}i(!!(p!=null&&p.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const p of i){const l=p.src||p.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,a=0;for(const i of e){let p=i.src||"";if(!p){const s=i.querySelector("source");s&&(p=s.getAttribute("src")||"")}if(!p&&i.currentSrc&&(p=i.currentSrc),!p)continue;if(Q()){r||(r=p,a=1);continue}const l=i.getBoundingClientRect(),c=l.width*l.height;l.width>50&&c>a&&(a=c,r=p)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(r);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Mt(r),r;const p=await i.blob(),l=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((s,d)=>{const x=new FileReader;x.onloadend=()=>s(x.result),x.onerror=()=>d(new Error("FileReader error")),x.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),s()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Mt(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Mt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function Qe(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Je=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ze=/Win/i.test(navigator.userAgent),ve=Je?"🍎 Mac":Ze?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ve}`),window.__VIDEO_COMPLETE_SENT__=!1;class et extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Ae=null,ge=null,St=!1;const $e=new Map;let _t=0;function Zt(){if(Ae)return Ae;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Ae=new Worker(URL.createObjectURL(t)),Ae.onmessage=e=>{const r=$e.get(e.data);r&&($e.delete(e.data),r())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Ae}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function en(){if(ge)return ge;if(St)return null;try{return ge=chrome.runtime.connect({name:"timer"}),ge.onMessage.addListener(t=>{const e=$e.get(t.id);e&&($e.delete(t.id),e())}),ge.onDisconnect.addListener(()=>{ge=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),ge}catch{return St=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const g=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new et);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return r(new et);e()}};setTimeout(i,t);const p=Zt();if(p){const s=++_t;$e.set(s,i),p.postMessage({id:s,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const l=en();if(l){const s=++_t;$e.set(s,i),l.postMessage({cmd:"delay",id:s,ms:t});return}const c=setTimeout(i,t);g._lastId=c});function me(){return!!window.__NETFLOW_STOP__}const Q=()=>document.hidden;let Pt=0;async function he(){if(!document.hidden)return!1;const t=Date.now();if(t-Pt<15e3)return!1;Pt=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await g(1500),!0}catch{return!1}}async function tt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const t=Date.now();for(;document.hidden&&Date.now()-t<5e3;)await g(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await g(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function It(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const p of t)if(i.includes(p))return((r=a.textContent)==null?void 0:r.trim())||p}}return null}async function ee(t){if(Q()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await g(50),t.click()}function tn(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function nn(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let p=a,l=null,c=1/0;for(let s=0;s<20&&p&&(p=p.parentElement,!(!p||p===document.body));s++){if(Q()){s>=3&&p.children.length>0&&!l&&(l=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const x=d.width*d.height;x<c&&(l=p,c=x)}}l&&!e.includes(l)&&e.push(l)}return e.sort((a,i)=>{const p=a.getBoundingClientRect(),l=i.getBoundingClientRect();return p.left-l.left}),e}function nt(t=!1){const e=[],r=document.querySelectorAll("video");for(const l of r){let c=l.parentElement;for(let s=0;s<10&&c;s++){if(Q()){if(s>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const d=c.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:c,left:d.left});break}c=c.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of a){const c=(l.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let s=l.parentElement;for(let d=0;d<10&&s;d++){if(Q()){if(d>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const x=s.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:s,left:x.left});break}s=s.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const c=(l.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let s=l.parentElement;for(let d=0;d<10&&s;d++){if(Q()){if(d>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const x=s.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:s,left:x.left});break}s=s.parentElement}}}const p=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(c=>c.el===l));if(p.sort((l,c)=>l.left-c.left),p.length>0){const l=p[0].el,c=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function on(){const t=nn("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let i=0;i<10&&a;i++){if(Q()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const p=a.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function an(t,e){var c;const[r,a]=t.split(","),i=((c=r.match(/:(.*?);/))==null?void 0:c[1])||"image/png",p=atob(a),l=new Uint8Array(p.length);for(let s=0;s<p.length;s++)l[s]=p.charCodeAt(s);return new File([l],e,{type:i})}function Ve(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((a=i.textContent)==null?void 0:a.trim())===t){const p=i.closest("button");p&&e.push(p)}return e}function rn(){const t=[...Ve("add"),...Ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const p=(i.textContent||"").trim();if(p!=="+"&&p!=="add")continue;if(Q())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,r=0;for(const a of t){const i=a.getBoundingClientRect();i.y>r&&(r=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function At(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Ve(a);let p=null,l=0;for(const c of i){const s=c.getBoundingClientRect();s.y>l&&(l=s.y,p=c)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${l.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){if(Q())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const p=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(p?1e3:0);l>r&&(r=l,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function Bt(){const t=document.querySelectorAll("textarea");for(const a of t)if(Q()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(Q()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function qe(t,e){var r,a,i,p;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),await g(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(c),await g(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await g(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=e,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let s=0;s<30&&c;s++){const d=c.memoizedProps,x=c.memoizedState;if((a=d==null?void 0:d.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const $=d.editor;$.selection,$.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(i=x==null?void 0:x.memoizedState)==null?void 0:i.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),x.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function sn(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function ln(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ve})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ve})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function cn(t,e,r){var d;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(x=>x.input)];for(const x of a)!i.includes(x)&&x.offsetParent===null&&i.push(x);for(const x of i)x.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const p=document.querySelectorAll('input[type="file"]');if(p.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ve})`),!1;let l;if(r&&r.size>0){const x=Array.from(p).filter($=>!r.has($));x.length>0?(l=x[x.length-1],n(`เล็งเป้า file input ใหม่ (${x.length} ใหม่, ${p.length} ทั้งหมด)`)):(l=p[p.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${p.length} ตัว`))}else l=p[p.length-1];const c=new DataTransfer;c.items.add(e);try{l.files=c.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=l.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(x){n(`กำหนด target.files ล้มเหลว: ${x.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:c.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch($){return _(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${$.message}`),!1}}const s=l._valueTracker;return s&&(s.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0})),n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ve}`),!0}function Be(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(Q()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;if(Q()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}return t}async function Rt(t,e){var x;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=an(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Be();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async($,S=8e3)=>{const F=Date.now();for(;Date.now()-F<S;){const I=Be();if(I>a)return n(`✅ [${$}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${I}`),!0;await g(500)}return n(`⚠️ [${$}] รูปย่อไม่เพิ่ม (ยังคง ${Be()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const p=rn();if(!p)return _("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const l=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${l.size} ตัว`);const c=ln();let s=sn();const d=new MutationObserver($=>{for(const S of $)for(const F of S.addedNodes)if(F instanceof HTMLInputElement&&F.type==="file"&&(F.type="text",s.push({input:F,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),F instanceof HTMLElement){const I=F.querySelectorAll('input[type="file"]');for(const m of I)m.type="text",s.push({input:m,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{p.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let $=!1;const S=Date.now();for(;!$&&Date.now()-S<8e3;){const I=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const m of I){if(m===p)continue;const o=m.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const f of o){const k=((x=f.textContent)==null?void 0:x.trim())||"";if(k==="upload"||k==="upload_file"||k==="add_photo_alternate"){const q=Array.from(m.querySelectorAll("i")).map(P=>{var A;return(A=P.textContent)==null?void 0:A.trim()});if(!q.includes("drive_folder_upload")&&!q.includes("photo_library")){m.click(),$=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${k}) ✅`);break}}}if($)break}if(!$)for(const m of I){if(m===p)continue;const o=m.childNodes.length<=8?(m.textContent||"").trim():"";if(o.length>0&&o.length<60){const f=o.toLowerCase();if(f.includes("ไลบรารี")||f.includes("library")||f.includes("drive")||f.includes("ไดรฟ์"))continue;if(f==="upload"||f==="อัปโหลด"||f==="อัพโหลด"||f.includes("upload image")||f.includes("upload photo")||f.includes("upload a file")||f.includes("upload file")||f.includes("อัปโหลดรูปภาพ")||f.includes("อัพโหลดรูปภาพ")||f.includes("อัปโหลดไฟล์")||f.includes("อัพโหลดไฟล์")||f.includes("from computer")||f.includes("จากคอมพิวเตอร์")||f.includes("from device")||f.includes("จากอุปกรณ์")||f.includes("my computer")||f.includes("คอมพิวเตอร์ของฉัน")){m.click(),$=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!$)for(const m of I){if(m===p)continue;const o=(m.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก")||o.includes("ไลบรารี")||o.includes("library"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const f=m.getBoundingClientRect();if(f.width>0&&f.height>0){m.click(),$=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}$||await g(500)}return $?(await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),cn(s,r,l)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(_(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(_("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1)}finally{d.disconnect(),c();for(const $ of s)$.input.type!=="file"&&($.input.type="file")}}async function dn(t,e){var I;n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button, div, span, [role='button']");let a=null;for(const m of r){const o=(m.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const f=m.getBoundingClientRect();f.bottom>window.innerHeight*.7&&f.width>30&&f.height>10&&(!a||(m.textContent||"").length<(a.textContent||"").length)&&(a=m)}}if(a&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(a.textContent||"").substring(0,40).trim()}"`),!a){const m=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of m){const f=((I=o.textContent)==null?void 0:I.trim())||"";if(f.includes("crop")||f==="aspect_ratio"||f==="photo_size_select_large"){const k=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(k){const q=k.getBoundingClientRect();if(q.bottom>window.innerHeight*.7&&q.width>0){a=k,n(`พบปุ่มตั้งค่าจากไอคอน: ${f}`);break}}}}}if(!a)for(const m of r){const o=(m.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const f=m.getBoundingClientRect();if(f.bottom>window.innerHeight*.7&&f.width>30){a=m,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!a)return _("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2,c={bubbles:!0,cancelable:!0,clientX:p,clientY:l,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let s=!1,d=null;const x=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const m of x){const o=m.getAttribute("aria-controls")||"",f=m.id||"";if(o.toUpperCase().includes("IMAGE")||f.toUpperCase().includes("IMAGE")){d=m,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!d)for(const m of document.querySelectorAll('[role="tab"]')){const o=m.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){d=m,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!d)for(const m of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const f=m.getBoundingClientRect();if(f.width>0&&f.height>0){d=m,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(d){const m=d.getAttribute("data-state")||"",o=d.getAttribute("aria-selected")||"";if(m==="active"||o==="true")s=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const f=d.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",k)),await g(80),d.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",k)),d.dispatchEvent(new MouseEvent("click",k)),s=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}s||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const $=t==="horizontal"?"แนวนอน":"แนวตั้ง",S=t==="horizontal"?"landscape":"portrait";for(const m of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>30)&&(o===$||o.includes($)||o.toLowerCase()===S||o.toLowerCase().includes(S))){const f=m.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",k)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",k)),m.dispatchEvent(new MouseEvent("click",k)),n(`เลือกทิศทาง: ${$}`),await g(400);break}}const F=`x${e}`;for(const m of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>10)&&(o===F||o===`${e}`)){const f=m.getBoundingClientRect(),k={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",k)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...k,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",k)),m.dispatchEvent(new MouseEvent("click",k)),n(`เลือกจำนวน: ${F}`),await g(400);break}}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function pn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",p=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const c=Date.now()+1e4;for(;!l&&Date.now()<c;){const m=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of m){const f=(o.textContent||"").trim();if(!(f.length>80)&&(f.includes("Veo")||f.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||f.includes("arrow_drop_down")||o.querySelector("svg"))){l=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${f.substring(0,50).trim()}"`);break}}if(!l)for(const o of m){const f=(o.textContent||"").trim();if(!(f.length>80)&&(f.includes("Veo")||f.includes("veo"))){const k=o.getBoundingClientRect();if(k.width>0&&k.height>0){l=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${f.substring(0,50).trim()}"`);break}}}if(!l)for(const o of m){const f=(o.textContent||"").trim();if(!(f.length>50)&&(f.includes("Fast")||f.includes("Quality")||f.includes("เร็ว")||f.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){l=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${f.substring(0,50).trim()}"`);break}}if(!l){const o=document.querySelectorAll("div, span, button, [role='button']");for(const f of o){const k=(f.textContent||"").trim();if(k==="Veo 3.1 - Fast"||k==="Veo 3.1 - Quality"||k==="Fast"||k==="Quality"||k==="Veo 3.1 - เร็ว"||k==="Veo 3.1 - คุณภาพสูง"||k==="Veo 3.1 - คุณภาพ"||k==="Veo 2 - Fast"||k==="Veo 2 - Quality"){const q=f.getBoundingClientRect();if(q.width>0&&q.height>0){l=f,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${k}"`);break}}}}if(!l){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const f of o){const k=(f.textContent||"").trim();if(!(k.length>60)&&(k.includes("3.1")||k.includes("model")||k.includes("โมเดล"))){const q=f.getBoundingClientRect();if(q.bottom>window.innerHeight*.4&&q.width>0&&q.height>0){l=f,n(`พบปุ่ม model selector (Strategy E): "${k.substring(0,50).trim()}"`);break}}}}l||await g(1e3)}if(!l)return _("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(l.textContent||"").trim();if(s.includes(e)||s.includes(r)&&!s.includes(a)||s.includes(i)&&!s.includes(p))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=l.getBoundingClientRect(),x=d.left+d.width/2,$=d.top+d.height/2,S={bubbles:!0,cancelable:!0,clientX:x,clientY:$,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",S)),await g(80),l.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",S)),l.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let F=!1;const I=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const m of I){const o=(m.textContent||"").trim();if((o===e||o===r||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const k=m.getBoundingClientRect();if(k.width>0&&k.height>0){const q=k.left+k.width/2,P=k.top+k.height/2,A={bubbles:!0,cancelable:!0,clientX:q,clientY:P,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",A)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",A)),m.dispatchEvent(new MouseEvent("click",A)),n(`✅ เลือก "${o}" สำเร็จ`),F=!0;break}}}return F?(await g(600),!0):(_(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),!1)}async function fn(t){var k,q,P,A;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",i=Je?"macOS":Ze?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=Je?((q=(k=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:k[1])==null?void 0:q.replace(/_/g,"."))||"":Ze&&((P=e.match(/Windows NT ([0-9.]+)/))==null?void 0:P[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${p} | Chrome ${a}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${c} | แพลตฟอร์ม: ${ve}`),n("══════════════════════════════════════════");try{Ge(t.theme)}catch{}try{Ye()}catch(v){console.warn("Overlay show error:",v)}const s=[],d=[];try{C("settings","active");const v=t.orientation||"horizontal",h=t.outputCount||1,w=await dn(v,h);s.push(w?"✅ Settings":"⚠️ Settings"),C("settings",w?"done":"error")}catch(v){_(`ตั้งค่าผิดพลาด: ${v.message}`),s.push("⚠️ Settings"),C("settings","error")}try{const v=t.veoQuality||"fast";await pn(v)?(s.push(`✅ Veo ${v}`),n(`✅ Veo quality: ${v}`)):(s.push("⚠️ Veo quality"),_("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(v){_(`Veo quality error: ${v.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),await g(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const x=()=>{const v=document.querySelectorAll("span, div, p, label");for(const h of v){const w=(h.textContent||"").trim();if(/^\d{1,3}%$/.test(w)){if(w==="100%")return null;const T=h.getBoundingClientRect();if(T.width>0&&T.height>0&&T.top>0&&T.top<window.innerHeight)return w}}return null},$=async v=>{n(`รอการอัพโหลด ${v} เสร็จ...`),await g(2e3);const h=Date.now(),w=6e4;let T="",O=Date.now();const E=15e3;for(;Date.now()-h<w;){const y=x();if(y){if(y!==T)T=y,O=Date.now(),n(`กำลังอัพโหลด: ${y} — รอ...`);else if(Date.now()-O>E){n(`✅ อัพโหลด ${v} — % ค้างที่ ${y} นาน ${E/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}await g(1500)}else{n(`✅ อัพโหลด ${v} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}_(`⚠️ อัพโหลด ${v} หมดเวลาหลัง ${w/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){C("upload-char","active");try{const v=await Rt(t.characterImage,"character.png");s.push(v?"✅ ตัวละคร":"⚠️ ตัวละคร"),v||d.push("character upload failed"),C("upload-char",v?"done":"error")}catch(v){_(`อัพโหลดตัวละครผิดพลาด: ${v.message}`),s.push("❌ ตัวละคร"),d.push("character upload error"),C("upload-char","error")}await $("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500)}else xe("upload-char");if(t.productImage){C("upload-prod","active");try{const v=await Rt(t.productImage,"product.png");s.push(v?"✅ สินค้า":"⚠️ สินค้า"),v||d.push("product upload failed"),C("upload-prod",v?"done":"error")}catch(v){_(`อัพโหลดสินค้าผิดพลาด: ${v.message}`),s.push("❌ สินค้า"),d.push("product upload error"),C("upload-prod","error")}await $("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500)}else xe("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const S=x();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await $("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const F=(t.characterImage?1:0)+(t.productImage?1:0);if(F>0){let v=Be();v<F&&(n(`⏳ เห็นรูปย่อแค่ ${v}/${F} — รอ 3 วินาที...`),await g(3e3),v=Be()),v>=F?n(`✅ ยืนยันรูปย่ออ้างอิง: ${v}/${F}`):_(`⚠️ คาดว่าจะมี ${F} รูปย่อ แต่พบ ${v} — ดำเนินการต่อ`)}if(me()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Pe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),C("img-prompt","active"),await g(1e3);const I=Bt();I?(await qe(I,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),s.push("✅ Prompt"),C("img-prompt","done")):(_("ไม่พบช่องป้อนข้อความ Prompt"),s.push("❌ Prompt"),d.push("prompt input not found"),C("img-prompt","error")),await g(800);const m=new Set;document.querySelectorAll("img").forEach(v=>{v.src&&m.add(v.src)}),n(`บันทึกรูปเดิม: ${m.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),C("img-generate","active"),await g(500);const o=At();if(o){const v=o.getBoundingClientRect(),h=v.left+v.width/2,w=v.top+v.height/2,T={bubbles:!0,cancelable:!0,clientX:h,clientY:w,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",T)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",T)),o.dispatchEvent(new MouseEvent("click",T)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await g(500),o.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",T)),await g(80),o.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",T)),o.dispatchEvent(new MouseEvent("click",T)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),C("img-generate","done")}else _("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),d.push("generate button not found"),C("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),C("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const v=()=>{const E=document.querySelectorAll("div, span, p, label, strong, small");for(const y of E){if(y.closest("#netflow-engine-overlay"))continue;const D=(y.textContent||"").trim();if(D.length>10)continue;const M=D.match(/(\d{1,3})\s*%/);if(!M)continue;const u=parseInt(M[1],10);if(u<1||u>100)continue;if(Q())return u;const b=y.getBoundingClientRect();if(!(b.width===0||b.width>150)&&!(b.top<0||b.top>window.innerHeight))return u}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let h=null,w=-1,T=0;const O=Date.now();for(;!h&&Date.now()-O<18e4;){const E=document.querySelectorAll("img");for(const y of E){if(m.has(y.src)||!(y.alt||"").toLowerCase().includes("generated"))continue;if(Q()?y.naturalWidth>120&&y.naturalHeight>120:(()=>{const u=y.getBoundingClientRect();return u.width>120&&u.height>120&&u.top>0&&u.top<window.innerHeight*.85})()){const u=y.closest("div");if(u){h=u,n(`พบรูป AI จาก alt="${y.alt}": ${y.src.substring(0,80)}...${Q()?" (hidden-mode)":""}`);break}}}if(!h)for(const y of E){if(m.has(y.src))continue;const D=y.closest("div"),M=(D==null?void 0:D.textContent)||"";if(M.includes("product.png")||M.includes("character.png")||M.includes(".png")||M.includes(".jpg"))continue;if(Q()?y.naturalWidth>120&&y.naturalHeight>120:(()=>{const b=y.getBoundingClientRect();return b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85})()){const b=y.closest("div");if(b){h=b,n(`พบรูปใหม่ (สำรอง): ${y.src.substring(0,80)}...${Q()?" (hidden-mode)":""}`);break}}}if(!h){if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const y=It();if(y){_(`❌ สร้างรูปล้มเหลว: ${y}`),d.push(`image gen failed: ${y}`),C("img-wait","error");break}const D=v();D!==null?(D!==w&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${D}%`),w=D,C("img-wait","active",D)),T=Date.now()):w>30&&Math.floor((Date.now()-T)/1e3)>=3&&n(`🖼️ % หายที่ ${w}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&w>0&&Date.now()-T>1e4&&await he(),document.hidden&&w<1&&Date.now()-O>3e4&&await he(),await g(3e3)}}if(!h)_("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),C("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),C("img-wait","done",100),await tt();const E=h.getBoundingClientRect(),y=E.left+E.width/2,D=E.top+E.height/2,M={bubbles:!0,cancelable:!0,clientX:y,clientY:D};h.dispatchEvent(new PointerEvent("pointerenter",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseenter",M)),h.dispatchEvent(new PointerEvent("pointerover",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseover",M)),h.dispatchEvent(new PointerEvent("pointermove",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousemove",M)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let u=null;for(const b of["more_vert","more_horiz","more"]){const R=Ve(b);for(const G of R){const B=G.getBoundingClientRect();if(B.top>=E.top-20&&B.top<=E.bottom&&B.right>=E.right-150&&B.right<=E.right+20){u=G;break}}if(u)break}if(!u){const b=document.querySelectorAll("button");for(const R of b){const G=R.getBoundingClientRect();if(G.width<50&&G.height<50&&G.top>=E.top-10&&G.top<=E.top+60&&G.left>=E.right-80){const B=R.querySelectorAll("i");for(const W of B)if((((A=W.textContent)==null?void 0:A.trim())||"").includes("more")){u=R;break}if(u)break;const N=R.getAttribute("aria-label")||"";if(N.includes("เพิ่มเติม")||N.includes("more")){u=R;break}}}}if(!u)_("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const b=u.getBoundingClientRect(),R=b.left+b.width/2,G=b.top+b.height/2,B={bubbles:!0,cancelable:!0,clientX:R,clientY:G,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",B)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...B,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",B)),u.dispatchEvent(new MouseEvent("click",B)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let N=null;const W=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const z of W){const H=(z.textContent||"").trim();if(H.includes("ทำให้เป็นภาพเคลื่อนไหว")||H.includes("Animate")||H.includes("animate")){N=z;break}}if(!N)_("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const z=N.getBoundingClientRect(),H=z.left+z.width/2,X=z.top+z.height/2,L={bubbles:!0,cancelable:!0,clientX:H,clientY:X,button:0};N.dispatchEvent(new PointerEvent("pointerdown",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mousedown",L)),await g(80),N.dispatchEvent(new PointerEvent("pointerup",{...L,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mouseup",L)),N.dispatchEvent(new MouseEvent("click",L)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),C("animate","done"),await g(3e3)}}}}catch(v){_(`ขั้น 4 ผิดพลาด: ${v.message}`),s.push("⚠️ Animate")}if(me()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Pe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),C("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let v=!1;const h=document.querySelectorAll("button, span, div");for(const E of h){const y=(E.textContent||"").trim(),D=E.getBoundingClientRect();if((y==="วิดีโอ"||y==="Video"||y.includes("วิดีโอ"))&&D.bottom>window.innerHeight*.7){v=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}v||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let w=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(y=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>y())),w=!0;const E=Date.now();for(;document.hidden&&Date.now()-E<5e3;)await g(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await g(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await g(1e3);let T=!1;for(let E=1;E<=5&&!T;E++){if(E>1&&document.hidden){n(`🔄 Retry ${E}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),w=!0;const M=Date.now();for(;document.hidden&&Date.now()-M<5e3;)await g(200);document.hidden||await g(2e3)}catch{}}const y=Bt();if(!y){n(`⚠️ ครั้งที่ ${E}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await g(3e3);continue}E>1&&(y.focus(),await g(500)),await qe(y,t.videoPrompt),await g(500);const D=(y.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();D.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${E} (${D.length} ตัวอักษร)`),s.push("✅ Video Prompt"),C("vid-prompt","done"),T=!0):(n(`⚠️ ครั้งที่ ${E}: Prompt ไม่ถูกวาง (ได้ ${D.length} ตัวอักษร)`),await g(1500))}if(!T)throw _("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),s.push("❌ Video Prompt"),d.push("video prompt paste failed after 5 attempts"),C("vid-prompt","error"),new Error("Video prompt paste failed");await g(1e3),C("vid-generate","active");const O=At();if(O){const E=O.getBoundingClientRect(),y=E.left+E.width/2,D=E.top+E.height/2,M={bubbles:!0,cancelable:!0,clientX:y,clientY:D,button:0};O.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousedown",M)),await g(80),O.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mouseup",M)),O.dispatchEvent(new MouseEvent("click",M)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),C("vid-generate","done"),await g(500),O.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mousedown",M)),await g(80),O.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),O.dispatchEvent(new MouseEvent("mouseup",M)),O.dispatchEvent(new MouseEvent("click",M)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else _("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),d.push("video generate button not found"),C("vid-generate","error");if(w){await g(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(v){_(`ขั้น 5 ผิดพลาด: ${v.message}`),s.push("⚠️ Video Gen"),d.push(`video gen error: ${v.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),xe("animate"),xe("vid-prompt"),xe("vid-generate"),xe("vid-wait");if(t.videoPrompt){C("vid-wait","active");const v=t.sceneCount||1,h=t.videoScenePrompts||[t.videoPrompt];if(v>1)try{Qt(v)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${v>1?`ต่อ ${v} ฉาก`:"ดาวน์โหลด"} ===`);const w=()=>{const E=document.querySelectorAll("div, span, p, label, strong, small");for(const y of E){if(y.closest("#netflow-engine-overlay"))continue;const D=(y.textContent||"").trim();if(D.length>10)continue;const M=D.match(/(\d{1,3})\s*%/);if(!M)continue;const u=parseInt(M[1],10);if(u<1||u>100)continue;if(Q())return u;const b=y.getBoundingClientRect();if(!(b.width===0||b.width>150)&&!(b.top<0||b.top>window.innerHeight))return u}return null},T=async(E=6e5)=>{n("รอการสร้างวิดีโอ..."),C("vid-wait","active"),await g(5e3);const y=()=>{const L=document.querySelectorAll("div, span, p, label, strong, small");let j=0;for(const le of L){if(le.closest("#netflow-engine-overlay"))continue;const U=(le.textContent||"").trim();if(U.includes("%")&&U.length<15){const ae=le.tagName.toLowerCase(),re=le.className&&typeof le.className=="string"?le.className.split(/\s+/).slice(0,2).join(" "):"",te=le.getBoundingClientRect();if(n(`  🔍 "${U}" ใน <${ae}.${re}> ที่ (${te.left.toFixed(0)},${te.top.toFixed(0)}) w=${te.width.toFixed(0)}`),j++,j>=5)break}}j===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},D=nt();n(D?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),y();const M=Date.now();let u=-1,b=0,R=!1;for(;Date.now()-M<E;){const L=w();if(L!==null){if(L!==u&&(n(`ความคืบหน้าวิดีโอ: ${L}%`),u=L,C("vid-wait","active",L)),b=Date.now(),L>=100){n("✅ ตรวจพบ 100%!"),R=!0;break}}else if(u>30){const j=Math.floor((Date.now()-b)/1e3);if(j>=5){n(`✅ % หายไปที่ ${u}% (หาย ${j} วินาที) — วิดีโอเสร็จ!`),R=!0;break}n(`⏳ % หายที่ ${u}% — ยืนยันใน ${5-j} วินาที...`)}else{const j=Math.floor((Date.now()-M)/1e3);j%15<3&&n(`⏳ รอ... (${j} วินาที) ไม่พบ %`)}if(!R&&u>0&&nt(!0)&&!D){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${u}% — วิดีโอเสร็จ!`),R=!0;break}if(me())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(u<1){const j=It();if(j)return _(`❌ สร้างวิดีโอล้มเหลว: ${j}`),null}document.hidden&&u>0&&Date.now()-b>1e4&&await he(),document.hidden&&u<1&&Date.now()-M>3e4&&await he(),await g(3e3)}await tt();let G=null;for(let L=1;L<=10&&(G=nt(),!G);L++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${L}/10)`),L%3===0&&await tt(),await g(3e3);if(!G)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),C("vid-wait","error"),null;const B=G;R?(C("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const N=B.getBoundingClientRect();let W=N.left+N.width/2,z=N.top+N.height/2,H=B;const X=B.querySelector("video, img, canvas");if(X){const L=X.getBoundingClientRect();L.width>50&&L.height>50&&(W=L.left+L.width/2,z=L.top+L.height/2,H=X,n(`🎯 พบรูปย่อ <${X.tagName.toLowerCase()}> ในการ์ดที่ (${W.toFixed(0)},${z.toFixed(0)}) ${L.width.toFixed(0)}x${L.height.toFixed(0)}`))}else z=N.top+N.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${W.toFixed(0)},${z.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${W.toFixed(0)}, ${z.toFixed(0)})...`),tn(H);for(let L=0;L<8;L++){const j={bubbles:!0,cancelable:!0,clientX:W+L%2,clientY:z};H.dispatchEvent(new PointerEvent("pointermove",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),H.dispatchEvent(new MouseEvent("mousemove",j)),await g(500)}try{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"mute_video",sceneCount:v,scenePrompts:h,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${v} ฉาก, ${h.length} prompts, theme: ${t.theme})`)}catch(L){n(`⚠️ ไม่สามารถบันทึก pending action: ${L.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await O(H),n("✅ คลิกการ์ดวิดีโอเสร็จ"),B},O=async E=>{const y=E.getBoundingClientRect(),D=y.left+y.width/2,M=y.top+y.height/2,u={bubbles:!0,cancelable:!0,clientX:D,clientY:M,button:0};E.dispatchEvent(new PointerEvent("pointerdown",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mousedown",u)),await g(80),E.dispatchEvent(new PointerEvent("pointerup",{...u,pointerId:1,isPrimary:!0,pointerType:"mouse"})),E.dispatchEvent(new MouseEvent("mouseup",u)),E.dispatchEvent(new MouseEvent("click",u)),await g(50),E.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await T())_("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),C("vid-wait","error");else{s.push("✅ Video Complete"),C("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const y=await new Promise(D=>{chrome.storage.local.get(de(),M=>{if(chrome.runtime.lastError){D(null);return}D((M==null?void 0:M[de()])||null)})});y&&!y._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(de()),y.action==="mute_video"?await Dt(y.sceneCount||1,y.scenePrompts||[],y.theme):y.action==="wait_scene_gen_and_download"&&await Ot(y.sceneCount||2,y.currentScene||2,y.theme,y.scenePrompts||[]))}}catch(E){_(`ขั้น 6 ผิดพลาด: ${E.message}`),s.push("⚠️ Step6"),d.push(`step 6: ${E.message}`)}}const f=d.length===0;try{Pe(f?5e3:8e3)}catch(v){console.warn("Overlay complete error:",v)}return{success:f,message:f?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${d.join(", ")}`,step:f?"done":"partial"}}async function Dt(t,e=[],r){var q;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Ge(r)}catch{}try{Ye(t)}catch(P){n(`⚠️ showOverlay error: ${P.message}`)}try{const P=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const A of P)C(A,"done");t>=2&&C("scene2-prompt","active"),n(`✅ overlay restored: ${P.length} steps done, sceneCount=${t}`)}catch(P){n(`⚠️ overlay restore error: ${P.message}`)}await g(1500);const a=(()=>{for(const P of document.querySelectorAll("button")){const A=P.querySelectorAll("i");for(const h of A){const w=(h.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const T=P.getBoundingClientRect();if(T.width>0&&T.height>0)return P}}const v=(P.getAttribute("aria-label")||"").toLowerCase();if(v.includes("mute")||v.includes("ปิดเสียง")){const h=P.getBoundingClientRect();if(h.width>0&&h.height>0)return P}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let u=2;u<=t;u++){const b=e[u-1];if(!b){_(`ไม่พบ prompt สำหรับฉากที่ ${u}`);continue}n(`── ฉากที่ ${u}/${t}: วาง prompt + generate ──`);let R=null;const G=Date.now();for(;!R&&Date.now()-G<1e4;){const U=document.querySelectorAll("[data-slate-editor='true']");if(U.length>0&&(R=U[U.length-1]),!R){const ae=document.querySelectorAll("[role='textbox'][contenteditable='true']");ae.length>0&&(R=ae[ae.length-1])}R||await g(1e3)}if(!R){_("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${R.tagName.toLowerCase()}> ${R.className.substring(0,40)}`),await qe(R,b),n(`วาง prompt ฉาก ${u} (${b.length} ตัวอักษร) ✅`);try{C(`scene${u}-prompt`,"done"),C(`scene${u}-gen`,"active")}catch{}await g(1e3);const B=R.getBoundingClientRect();let N=null,W=1/0;for(const U of document.querySelectorAll("button")){if(U.disabled)continue;const ae=U.querySelectorAll("i");let re=!1;for(const Ee of ae)if((Ee.textContent||"").trim()==="arrow_forward"){re=!0;break}if(!re)continue;const te=U.getBoundingClientRect();if(te.width<=0||te.height<=0)continue;const Re=Math.abs(te.top-B.top)+Math.abs(te.right-B.right);Re<W&&(W=Re,N=U)}if(!N)for(const U of document.querySelectorAll("button")){const ae=U.querySelectorAll("i");for(const re of ae)if((re.textContent||"").trim()==="arrow_forward"){const te=U.getBoundingClientRect();if(te.width>0&&te.height>0){N=U;break}}if(N)break}if(!N){_("ไม่พบปุ่ม Generate/Send");return}await new Promise(U=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:u,scenePrompts:e}},()=>U())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${u}/${t})`),await ee(N),n(`คลิก Generate ฉาก ${u} ✅`);try{C(`scene${u}-gen`,"done"),C(`scene${u}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${u} gen เสร็จ ──`),await g(5e3);let z=0,H=0;const X=Date.now(),L=6e5,j=5e3;let le=!1;for(;Date.now()-X<L;){let U=null;const ae=document.querySelectorAll("div, span, p, label, strong, small");for(const re of ae){if(re.closest("#netflow-engine-overlay"))continue;const Re=(re.textContent||"").trim().match(/^(\d{1,3})%$/);if(Re){const Ee=re.getBoundingClientRect();if(Ee.width>0&&Ee.height>0&&Ee.width<120&&Ee.height<60){U=parseInt(Re[1],10);break}}}if(U!==null){if(U!==z){n(`🎬 ฉาก ${u} ความคืบหน้า: ${U}%`),z=U;try{C(`scene${u}-wait`,"active",U)}catch{}}H=0}else if(z>0){if(H===0)H=Date.now(),n(`🔍 ฉาก ${u}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-H>=j){n(`✅ ฉาก ${u}: % หายไป ${j/1e3} วินาที — เจนเสร็จ!`),le=!0;break}}if(me()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&z>0&&H===0&&await he(),await g(2e3)}le||_(`ฉาก ${u} หมดเวลา`),n(`✅ ฉาก ${u} เสร็จแล้ว`);try{C(`scene${u}-wait`,"done",100)}catch{}chrome.storage.local.remove(de()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{C("download","active")}catch{}let P=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(u=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>u())),P=!0,await g(5e3)}catch{}}await g(2e3);const A=Date.now();let v=null;const h=Date.now();for(;!v&&Date.now()-h<1e4;){for(const u of document.querySelectorAll("button")){const b=u.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const R=u.getBoundingClientRect();if(R.width>0&&R.height>0){v=u;break}}}v||await g(1e3)}if(!v){if(_("ไม่พบปุ่มดาวน์โหลด"),P)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await ee(v),n("คลิกดาวน์โหลดแล้ว ✅");try{C("download","done"),C("upscale","active")}catch{}await g(1500);let w=null;for(let u=0;u<3&&!w;u++){u>0&&n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`);let b=null;const R=Date.now();for(;!b&&Date.now()-R<5e3;){for(const z of document.querySelectorAll("[role='menuitem']"))if((z.textContent||"").trim().includes("Full Video")&&z.querySelector("i")){const X=z.getBoundingClientRect();if(X.width>0&&X.height>0){b=z;break}}b||await g(500)}if(!b){_("ไม่พบ Full Video");continue}const G=b.getBoundingClientRect(),B=G.left+G.width/2,N=G.top+G.height/2;b.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:B,clientY:N})),b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:B,clientY:N})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:B,clientY:N})),await ee(b),n("คลิก/hover Full Video ✅"),await g(2e3);const W=Date.now();for(;!w&&Date.now()-W<8e3;){for(const z of document.querySelectorAll("button[role='menuitem']")){const H=z.querySelectorAll("span");for(const X of H)if((X.textContent||"").trim()==="720p"){const L=z.getBoundingClientRect();if(L.width>0&&L.height>0){w=z;break}}if(w)break}w||(b.isConnected&&(b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:B,clientY:N})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:B+20,clientY:N}))),await g(500))}}if(!w){if(_("ไม่พบ 720p"),P)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await ee(w),n("คลิก 720p ✅"),P){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const T=Date.now();let O=!1,E=!1;for(;Date.now()-T<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(u.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),O=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&(E||(E=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(O)break;if(E){let u=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),O=!0;break}}if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await g(2e3)}if(!O){_("เตรียมไฟล์หมดเวลา");return}try{C("upscale","done",100),C("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let y=!1;const D=Date.now();for(;Date.now()-D<6e4&&!y;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:A},b=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),y=!0,b.downloadUrl&&(i=b.downloadUrl,n(`[TikTok] จะใช้ download URL: ${b.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-D)/1e3)}s)`),u()})})}catch(u){_(`ตรวจสอบผิดพลาด: ${u.message}`)}y||await g(3e3)}y||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const M=await Ke();i||(i=M);try{C("open","done"),Pe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Qe(i),je(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const p=(P,A="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const v of document.querySelectorAll(A)){const h=(v.textContent||"").trim();if(h.includes(P)&&h.length<100){const w=v.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return v}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const c=Date.now();for(;!l&&Date.now()-c<1e4;){for(const P of document.querySelectorAll("button, [role='button']")){const A=(P.textContent||"").trim(),v=A.toLowerCase();if((v.includes("download")||v.includes("ดาวน์โหลด"))&&A.length<80){const h=P.getBoundingClientRect();if(h.width>0&&h.height>0){l=P;break}}}if(!l)for(const P of document.querySelectorAll("button")){const A=(P.getAttribute("aria-label")||"").toLowerCase();if(A.includes("download")||A.includes("ดาวน์")){const v=P.getBoundingClientRect();if(v.width>0&&v.height>0){l=P;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!l){_("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await ee(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const s=Date.now();let d=null;const x=Date.now();for(;!d&&Date.now()-x<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await g(500));if(!d){_("ไม่พบ 1080p");return}await ee(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const $=Date.now();let S=!1,F=!1,I=0;const m=3e3;for(;Date.now()-$<3e5;){const A=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(A.includes("upscaling complete")||A.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const h of document.querySelectorAll("div, span, p")){const w=(h.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(q=h.textContent)==null?void 0:q.trim()}")`),S=!0;break}}if(S)break;if(A.includes("upscaling your video")||A.includes("กำลังอัปสเกล")){F=!0,I=0;const h=Math.floor((Date.now()-$)/1e3);n(`⏳ กำลังอัปสเกล... (${h} วินาที)`)}else if(F){if(I===0)I=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-I>=m){n(`✅ ข้อความ Upscaling หายไป ${m/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const h=Math.floor((Date.now()-$)/1e3);h%10<3&&n(`⏳ รอ Upscale... (${h} วินาที)`)}if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!S){_("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let o=!1;const f=Date.now();for(;Date.now()-f<6e4&&!o;){try{await new Promise(P=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},A=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):A!=null&&A.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${A.message}`),o=!0,A.downloadUrl&&(i=A.downloadUrl,n(`[TikTok] จะใช้ download URL: ${A.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-f)/1e3)}s)`),P()})})}catch(P){_(`ตรวจสอบผิดพลาด: ${P.message}`)}o||await g(3e3)}o||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const k=await Ke();i||(i=k),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Qe(i),je(2e3)}async function Ot(t=2,e=2,r,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Ge(r)}catch{}try{Ye(t)}catch(h){n(`⚠️ showOverlay error: ${h.message}`)}try{const h=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)h.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&h.push(`scene${w}-wait`);for(const w of h)C(w,"done");C(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${h.length} steps done (scene ${e}/${t} navigate)`)}catch(h){n(`⚠️ overlay restore error: ${h.message}`)}await g(2e3);const i=(()=>{for(const h of document.querySelectorAll("button")){const w=h.querySelectorAll("i");for(const T of w){const O=(T.textContent||"").trim();if(O==="volume_up"||O==="volume_off"||O==="volume_mute"){const E=h.getBoundingClientRect();if(E.width>0&&E.height>0)return h}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,l=0;const c=Date.now(),s=6e5,d=5e3;let x=!1,$=0;for(;Date.now()-c<s;){let h=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const T of w){if(T.closest("#netflow-engine-overlay"))continue;const E=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if(E){const y=T.getBoundingClientRect();if(y.width>0&&y.height>0&&y.width<120&&y.height<60){h=parseInt(E[1],10);break}}}if(h!==null){if($=0,h!==p){n(`🎬 scene ${e} ความคืบหน้า: ${h}%`),p=h;try{C(`scene${e}-wait`,"active",h)}catch{}}l=0}else if(p>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-l>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),x=!0;break}}else if($++,$>=15){const T=document.querySelectorAll("video");let O=!1;for(const E of T)if(E.readyState>=2&&!E.paused&&E.getBoundingClientRect().width>200){O=!0;break}if(O){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),x=!0;break}if($>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),x=!0;break}}document.hidden&&p>0&&l===0&&await he(),await g(2e3)}x||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{C(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let h=e+1;h<=t;h++){const w=a[h-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${h} — ข้าม`);continue}n(`── ฉากที่ ${h}/${t}: วาง prompt + generate (pending recovery) ──`);let T=null;const O=Date.now();for(;!T&&Date.now()-O<1e4;){const B=document.querySelectorAll("[data-slate-editor='true']");if(B.length>0&&(T=B[B.length-1]),!T){const N=document.querySelectorAll("[role='textbox'][contenteditable='true']");N.length>0&&(T=N[N.length-1])}T||await g(1e3)}if(!T){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${h}`);break}await qe(T,w),n(`วาง prompt ฉาก ${h} (${w.length} ตัวอักษร) ✅`);try{C(`scene${h}-prompt`,"done"),C(`scene${h}-gen`,"active")}catch{}await g(1e3);const E=T.getBoundingClientRect();let y=null,D=1/0;for(const B of document.querySelectorAll("button")){if(B.disabled)continue;const N=B.querySelectorAll("i");let W=!1;for(const X of N)if((X.textContent||"").trim()==="arrow_forward"){W=!0;break}if(!W)continue;const z=B.getBoundingClientRect();if(z.width<=0||z.height<=0)continue;const H=Math.abs(z.top-E.top)+Math.abs(z.right-E.right);H<D&&(D=H,y=B)}if(!y)for(const B of document.querySelectorAll("button")){const N=B.querySelectorAll("i");for(const W of N)if((W.textContent||"").trim()==="arrow_forward"){const z=B.getBoundingClientRect();if(z.width>0&&z.height>0){y=B;break}}if(y)break}if(!y){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${h}`);break}await new Promise(B=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:h,scenePrompts:a}},()=>B())}),await ee(y),n(`คลิก Generate ฉาก ${h} ✅`);try{C(`scene${h}-gen`,"done"),C(`scene${h}-wait`,"active")}catch{}await g(5e3);let M=0,u=0;const b=Date.now();let R=!1,G=0;for(;Date.now()-b<6e5;){let B=null;const N=document.querySelectorAll("div, span, p, label, strong, small");for(const W of N){if(W.closest("#netflow-engine-overlay"))continue;const H=(W.textContent||"").trim().match(/^(\d{1,3})%$/);if(H){const X=W.getBoundingClientRect();if(X.width>0&&X.height>0&&X.width<120&&X.height<60){B=parseInt(H[1],10);break}}}if(B!==null){if(G=0,B!==M){n(`🎬 ฉาก ${h} ความคืบหน้า: ${B}%`),M=B;try{C(`scene${h}-wait`,"active",B)}catch{}}u=0}else if(M>0){if(u===0)u=Date.now();else if(Date.now()-u>=5e3){n(`✅ ฉาก ${h}: เจนเสร็จ!`),R=!0;break}}else if(G++,G>=15){const W=document.querySelectorAll("video");let z=!1;for(const H of W)if(H.readyState>=2&&!H.paused&&H.getBoundingClientRect().width>200){z=!0;break}if(z){n(`✅ ฉาก ${h}: พบวิดีโอเล่นอยู่ — เสร็จ`),R=!0;break}if(G>=30){n(`✅ ฉาก ${h}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),R=!0;break}}document.hidden&&M>0&&u===0&&await he(),await g(2e3)}R||n(`⚠️ ฉาก ${h} หมดเวลา`);try{C(`scene${h}-wait`,"done",100)}catch{}n(`✅ ฉาก ${h} เสร็จแล้ว`),chrome.storage.local.remove(de()),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);let S=null;try{C("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const F=Date.now();let I=null;const m=Date.now();for(;!I&&Date.now()-m<1e4;){for(const h of document.querySelectorAll("button")){const w=h.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const T=h.getBoundingClientRect();if(T.width>0&&T.height>0){I=h;break}}}I||await g(1e3)}if(!I){_("ไม่พบปุ่มดาวน์โหลด");return}await ee(I),n("คลิกดาวน์โหลดแล้ว ✅");try{C("download","done"),C("upscale","active")}catch{}await g(1500);let o=null;for(let h=0;h<3&&!o;h++){h>0&&n(`🔄 ลองหา 720p ครั้งที่ ${h+1}...`);let w=null;const T=Date.now();for(;!w&&Date.now()-T<5e3;){for(const M of document.querySelectorAll("[role='menuitem']"))if((M.textContent||"").trim().includes("Full Video")&&M.querySelector("i")){const b=M.getBoundingClientRect();if(b.width>0&&b.height>0){w=M;break}}w||await g(500)}if(!w){_("ไม่พบ Full Video");continue}const O=w.getBoundingClientRect(),E=O.left+O.width/2,y=O.top+O.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:E,clientY:y})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:E,clientY:y})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:E,clientY:y})),await ee(w),n("คลิก/hover Full Video ✅"),await g(2e3);const D=Date.now();for(;!o&&Date.now()-D<8e3;){for(const M of document.querySelectorAll("button[role='menuitem']")){const u=M.querySelectorAll("span");for(const b of u)if((b.textContent||"").trim()==="720p"){const R=M.getBoundingClientRect();if(R.width>0&&R.height>0){o=M;break}}if(o)break}o||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:E,clientY:y})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:E+20,clientY:y}))),await g(500))}}if(!o){_("ไม่พบ 720p");return}await ee(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const f=Date.now();let k=!1,q=!1;for(;Date.now()-f<3e5;){for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(h.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),k=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(q||(q=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(k)break;if(q){let h=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){h=!0;break}if(!h){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),k=!0;break}}await g(2e3)}if(!k){_("เตรียมไฟล์หมดเวลา");return}try{C("upscale","done",100),C("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let P=!1;const A=Date.now();for(;Date.now()-A<6e4&&!P;){try{await new Promise(h=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:F},w=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),P=!0,w.downloadUrl&&(S=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-A)/1e3)}s)`),h()})})}catch(h){_(`ตรวจสอบผิดพลาด: ${h.message}`)}P||await g(3e3)}P||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const v=await Ke();S||(S=v);try{C("open","done"),Pe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Qe(S),je(2e3)}async function un(){try{await Jt;const t=de();let e=await new Promise(l=>{chrome.storage.local.get(t,c=>{if(chrome.runtime.lastError){l(null);return}l((c==null?void 0:c[t])||null)})});if(!e&&ye){const l="netflow_pending_action";e=await new Promise(c=>{chrome.storage.local.get(l,s=>{if(chrome.runtime.lastError){c(null);return}c((s==null?void 0:s[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await g(300),!await new Promise(l=>{chrome.storage.local.get(t,c=>{const s=c==null?void 0:c[t];l((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await Dt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ot(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),fn(t).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),Tt()}).catch(a=>{if(a instanceof et||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ie("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Ct()}catch{}}else console.error("[Netflow AI] Generate error:",a);Tt()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const a=on();if(!a){_("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const s=document.elementFromPoint(p,l);s?(await ee(s),n(`คลิก ${c+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await ee(a),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),un()})();
