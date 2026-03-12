(function(){"use strict";const fe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let J=fe.green,Se=null;function Ue(t){t&&fe[t]&&(Se=t,J=fe[t],ot(),requestAnimationFrame(()=>Ct()))}function zt(){if(Se&&fe[Se])return fe[Se];try{const t=localStorage.getItem("netflow_app_theme");if(t&&fe[t])return fe[t]}catch{}return fe.green}let oe=0,ie=255,ae=65;function ot(){const t=J.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(oe=parseInt(t[1],16),ie=parseInt(t[2],16),ae=parseInt(t[3],16))}const it='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',at='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let Y=null,K=null,ue=null,rt=0,Re=null,Me=null,Oe=null,He=0,me=!1,ce=null,Pe=null,Ie=null,ve=1,X=[];function Fe(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const re=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];X=Fe(1);function Nt(t){const e=t.rgb,r=t.accentRgb,s=t.doneRgb,i=t.hex,f=t.accentHex,c=t.doneHex,a=(()=>{const m=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=u=>Math.min(255,u+80);return`#${[1,2,3].map(u=>o(parseInt(m[u],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const m=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!m)return"#4ade80";const o=u=>Math.min(255,u+60);return`#${[1,2,3].map(u=>o(parseInt(m[u],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),E=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,w=p?parseInt(p[1],16)/E:0,S=p?parseInt(p[2],16)/E:1,F=p?parseInt(p[3],16)/E:.25,M=m=>`${Math.round(w*m)}, ${Math.round(S*m)}, ${Math.round(F*m)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${M(18)},0.94) 0%, rgba(${M(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${M(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${M(180)},0.05),
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
            0 0 200px rgba(${M(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${M(180)},0.08),
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
    color: ${a};
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
.nf-term-line.nf-term-done { color: rgba(${s}, 0.85); }
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
    color: ${a};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${s}, 0.12);
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
    background: linear-gradient(180deg, rgba(${M(5)},0.95) 0%, rgba(${M(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${M(6)},0.75) 0%, rgba(${M(3)},0.92) 100%);
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
    background: rgba(${M(8)}, 0.88);
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
    box-shadow: 0 0 20px rgba(${s}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${s}, 0.5), transparent);
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
    color: rgba(${s}, 0.85);
    text-shadow:
        0 0 4px rgba(${s},0.5),
        0 0 12px rgba(${s},0.3);
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
    background: ${c};
    box-shadow: 0 0 5px rgba(${s}, 0.5);
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
    background: linear-gradient(90deg, ${i}, ${a});
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
    background: linear-gradient(90deg, ${i}, ${f});
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
    background: rgba(${M(8)},0.8);
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
    background: rgba(${M(8)}, 0.9);
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
    color: ${a};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${s},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${s},0.5);
    text-shadow: 0 0 4px rgba(${s},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${s},0.4),
        0 0 8px rgba(${s},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${c};
    box-shadow: 0 0 5px rgba(${s},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${s},0.1);
    color: ${l};
    text-shadow: 0 0 4px rgba(${s},0.3);
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

    `}function st(){ue||(ue=document.createElement("style"),ue.id="netflow-overlay-styles",ue.textContent=Nt(J),document.head.appendChild(ue))}function lt(t){t.innerHTML="",X.forEach((e,r)=>{const s=document.createElement("div");s.className="nf-proc-row nf-proc-waiting",s.id=`nf-proc-${e.stepId}`,s.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(s)})}function ct(){const t=document.getElementById("nf-terminal");if(!t)return;lt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${X.length}`)}function dt(t,e){let a="";for(let S=0;S<20;S++){const F=S/20*Math.PI*2,M=(S+.2)/20*Math.PI*2,m=(S+.5)/20*Math.PI*2,o=(S+.8)/20*Math.PI*2,u=(S+1)/20*Math.PI*2;a+=`${S===0?"M":"L"}${(120+100*Math.cos(F)).toFixed(1)},${(120+100*Math.sin(F)).toFixed(1)} `,a+=`L${(120+100*Math.cos(M)).toFixed(1)},${(120+100*Math.sin(M)).toFixed(1)} `,a+=`L${(120+112*Math.cos(m)).toFixed(1)},${(120+112*Math.sin(m)).toFixed(1)} `,a+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,a+=`L${(120+100*Math.cos(u)).toFixed(1)},${(120+100*Math.sin(u)).toFixed(1)} `}a+="Z";const l=14,p=72,E=62;let w="";for(let S=0;S<l;S++){const F=S/l*Math.PI*2,M=(S+.25)/l*Math.PI*2,m=(S+.75)/l*Math.PI*2,o=(S+1)/l*Math.PI*2;w+=`${S===0?"M":"L"}${(120+E*Math.cos(F)).toFixed(1)},${(120+E*Math.sin(F)).toFixed(1)} `,w+=`L${(120+p*Math.cos(M)).toFixed(1)},${(120+p*Math.sin(M)).toFixed(1)} `,w+=`L${(120+p*Math.cos(m)).toFixed(1)},${(120+p*Math.sin(m)).toFixed(1)} `,w+=`L${(120+E*Math.cos(o)).toFixed(1)},${(120+E*Math.sin(o)).toFixed(1)} `}return w+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${a}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="100" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.4"/>
        </g>

        <!-- Inner ring (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${w}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${E}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Lt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ce=document.createElement("canvas"),ce.id="nf-matrix-canvas",t.appendChild(ce);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let h=1;h<=5;h++){const b=document.createElement("div");b.className=`nf-ambient-orb nf-orb-${h}`,t.appendChild(b)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const s=document.createElement("div");s.className="nf-pat-diag-a",t.appendChild(s);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const f=document.createElement("div");f.className="nf-pat-circuit",t.appendChild(f);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const a=document.createElement("div");a.className="nf-pat-binary",t.appendChild(a);const l=document.createElement("div");l.className="nf-pat-crosshatch",t.appendChild(l);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const E=document.createElement("div");E.className="nf-pat-wave-h",t.appendChild(E);const w=document.createElement("div");w.className="nf-pat-radar",t.appendChild(w);const S=document.createElement("div");S.className="nf-pat-ripple-1",t.appendChild(S);const F=document.createElement("div");F.className="nf-pat-ripple-2",t.appendChild(F);const M=document.createElement("div");M.className="nf-pat-techscan",t.appendChild(M);const m=document.createElement("div");m.className="nf-center-glow",t.appendChild(m);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const u=document.createElement("div");u.className="nf-crt-scanlines",t.appendChild(u);const x=document.createElement("div");x.className="nf-vignette",t.appendChild(x);for(let h=0;h<3;h++){const b=document.createElement("div");b.className="nf-pulse-ring",t.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(h=>{const b=document.createElement("div");b.className=`nf-corner-deco ${h}`,t.appendChild(b)});const V=document.createElement("button");V.className="nf-stop-btn",V.innerHTML='<span class="nf-stop-icon"></span> หยุด',V.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",V.onclick=()=>{var h;window.__NETFLOW_STOP__=!0;try{Ve("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((h=chrome.runtime)!=null&&h.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(V);const I=document.createElement("div");I.className="nf-layout";const _=document.createElement("div");_.className="nf-core-monitor",_.id="nf-core-monitor";const U=document.createElement("div");U.className="nf-core-header",U.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,_.appendChild(U);const y=document.createElement("div");y.className="nf-terminal",y.id="nf-terminal",lt(y),_.appendChild(y);const d=document.createElement("div");d.className="nf-engine-core",d.id="nf-engine-core";const k=document.createElement("div");k.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(h=>{const b=document.createElement("div");b.className=`nf-frame-corner ${h}`,k.appendChild(b)}),d.appendChild(k);const B="http://www.w3.org/2000/svg",P=document.createElementNS(B,"svg");P.setAttribute("class","nf-engine-waves"),P.setAttribute("viewBox","0 0 560 140"),P.setAttribute("preserveAspectRatio","none"),P.id="nf-engine-waves";for(let h=0;h<4;h++){const b=document.createElementNS(B,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",h<2?"1.5":"1"),b.setAttribute("stroke",h<2?`rgba(${J.rgb},${.14+h*.1})`:`rgba(${J.accentRgb},${.1+(h-2)*.08})`),b.setAttribute("data-wave-idx",String(h)),P.appendChild(b)}d.appendChild(P);const R=document.createElement("div");R.className="nf-engine-brand-inner",R.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${dt(J.rgb,J.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${dt(J.rgb,J.accentRgb)}
        </div>
    `,d.appendChild(R);const C=document.createElement("div");C.className="nf-engine-stats",C.id="nf-engine-stats",C.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([h,b,$])=>`<div class="nf-stat-item"><span class="nf-stat-label">${h}</span><span class="nf-stat-val" id="${b}">${$}</span></div>`).join(""),d.appendChild(C),_.appendChild(d),I.appendChild(_);const v=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];re.forEach((h,b)=>{const $=Vt(h);$.classList.add(v[b]),$.id=`nf-mod-${h.id}`,I.appendChild($)}),t.appendChild(I);for(let h=0;h<30;h++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const $=.3+Math.random()*.4,O=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(oe*O)}, ${Math.floor(ie*O)}, ${Math.floor(ae*O)}, ${$})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,t.appendChild(b)}return t}function Vt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(i=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${i.id}`;let c="";i.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${c}
        `,e.appendChild(f)});const s=document.createElement("div");return s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(s),e}function qt(){rt=Date.now(),Re=setInterval(()=>{const t=Math.floor((Date.now()-rt)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),s=document.getElementById("nf-timer");s&&(s.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function pt(){Re&&(clearInterval(Re),Re=null)}const Gt=120,ft=160,ut=.4;let $e=null,gt=0,mt=0,ht=0,_e=[];function Ut(t,e){_e=[];for(let r=0;r<Gt;r++){const s=Math.random();let i;s<.22?i=0:s<.4?i=1:s<.55?i=2:s<.68?i=3:s<.84?i=4:i=5;const f=Math.random()*t,c=Math.random()*e,a=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);_e.push({x:i===0?Math.random()*t:f+Math.cos(l)*a,y:i===0?Math.random()*e:c+Math.sin(l)*a,vx:(Math.random()-.5)*ut,vy:(Math.random()-.5)*ut,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:f,oCy:c,oRadius:a,oAngle:l,oSpeed:p})}}function Ht(){if(!ce)return;const t=ce;if(Pe=t.getContext("2d"),!Pe)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,_e.length===0&&Ut(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,s=0,i=0,f=!1;function c(){if(!Pe||!ce){Ie=null;return}if(Ie=requestAnimationFrame(c),f=!f,f)return;const a=Pe,l=ce.width,p=ce.height;a.fillStyle=`rgba(${oe*.04|0},${ie*.04|0},${ae*.06|0},1)`,a.fillRect(0,0,l,p),(!r||s!==l||i!==p)&&(s=l,i=p,r=a.createRadialGradient(l*.5,p*.5,0,l*.5,p*.5,Math.max(l,p)*.6),r.addColorStop(0,`rgba(${oe*.08|0},${ie*.08|0},${ae*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),a.fillStyle=r,a.fillRect(0,0,l,p);const E=_e,w=E.length,S=ft*ft;for(let m=0;m<w;m++){const o=E[m];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>l&&(o.x=l,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>p&&(o.y=p,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const u=o.oAngle,x=o.oRadius*.7;o.x=o.oCx+x*Math.cos(u),o.y=o.oCy+x*Math.sin(u)*Math.cos(u),o.oCx+=Math.sin(u*.15)*.12,o.oCy+=Math.cos(u*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const u=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*u,o.y=o.oCy+Math.sin(o.oAngle)*u,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=l+30:o.x>l+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const u=o.oRadius+50;o.oCx<-u?o.oCx=l+u:o.oCx>l+u&&(o.oCx=-u),o.oCy<-u?o.oCy=p+u:o.oCy>p+u&&(o.oCy=-u)}}a.beginPath(),a.strokeStyle=`rgba(${oe},${ie},${ae},0.06)`,a.lineWidth=.4;const F=new Path2D;for(let m=0;m<w;m++){const o=E[m];for(let u=m+1;u<w;u++){const x=E[u],V=o.x-x.x,I=o.y-x.y,_=V*V+I*I;_<S&&(1-_/S<.4?(a.moveTo(o.x,o.y),a.lineTo(x.x,x.y)):(F.moveTo(o.x,o.y),F.lineTo(x.x,x.y)))}}if(a.stroke(),a.strokeStyle=`rgba(${oe},${ie},${ae},0.18)`,a.lineWidth=.8,a.stroke(F),!$e||gt!==oe||mt!==ie||ht!==ae){$e=document.createElement("canvas");const m=48;$e.width=m,$e.height=m;const o=$e.getContext("2d"),u=o.createRadialGradient(m/2,m/2,0,m/2,m/2,m/2);u.addColorStop(0,`rgba(${oe},${ie},${ae},0.9)`),u.addColorStop(.3,`rgba(${oe},${ie},${ae},0.35)`),u.addColorStop(1,`rgba(${oe},${ie},${ae},0)`),o.fillStyle=u,o.fillRect(0,0,m,m),gt=oe,mt=ie,ht=ae}const M=$e;for(let m=0;m<w;m++){const o=E[m],u=.6+.4*Math.sin(o.pulsePhase),x=o.radius*5*(.8+u*.4);a.globalAlpha=.5+u*.4,a.drawImage(M,o.x-x/2,o.y-x/2,x,x)}a.globalAlpha=1,a.fillStyle="rgba(255,255,255,0.45)",a.beginPath();for(let m=0;m<w;m++){const o=E[m];if(o.radius>2){const u=.6+.4*Math.sin(o.pulsePhase),x=o.radius*(.8+u*.4)*.35;a.moveTo(o.x+x,o.y),a.arc(o.x,o.y,x,0,Math.PI*2)}}a.fill()}c()}function Wt(){Ie!==null&&(cancelAnimationFrame(Ie),Ie=null),ce=null,Pe=null,_e=[]}let Ae=null;const ze=560,Yt=140,bt=ze/2,wt=Yt/2,xt=[];for(let t=0;t<=ze;t+=8){const e=Math.abs(t-bt)/bt;xt.push(Math.pow(Math.min(1,e*1.6),.6))}const Xt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/ze,off:t*.6,spd:.7+t*.12}));let We=!1;function yt(){if(Me=requestAnimationFrame(yt),We=!We,We)return;if(He+=.07,!Ae){const e=document.getElementById("nf-engine-waves");if(!e){Me=null;return}Ae=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ae.length;e++){const r=Xt[e],s=He*r.spd+r.off;t.length=0,t.push(`M 0 ${wt}`);let i=0;for(let f=0;f<=ze;f+=8){const c=wt+r.amp*xt[i++]*Math.sin(f*r.freq+s);t.push(`L${f} ${c*10+.5|0}`)}Ae[e].setAttribute("d",t.join(" "))}}function jt(){He=0,yt(),Ht(),Oe=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),s=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),s&&(s.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function vt(){Me!==null&&(cancelAnimationFrame(Me),Me=null),Oe&&(clearInterval(Oe),Oe=null),Ae=null,Wt()}function Ne(){let t=0;const e=X.filter(p=>p.status!=="skipped").length;for(const p of X){const E=document.getElementById(`nf-proc-${p.stepId}`);if(!E)continue;E.className="nf-proc-row";const w=E.querySelector(".nf-proc-badge");switch(p.status){case"done":E.classList.add("nf-proc-done"),w&&(w.textContent="✅ done"),t++;break;case"active":E.classList.add("nf-proc-active"),w&&(w.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":E.classList.add("nf-proc-error"),w&&(w.textContent="❌ error");break;case"skipped":E.classList.add("nf-proc-skipped"),w&&(w.textContent="— skip");break;default:E.classList.add("nf-proc-waiting"),w&&(w.textContent="(queued)")}}const r=X.findIndex(p=>p.status==="active"),s=r>=0?r+1:t>=e&&e>0?X.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${s}/${X.length}`);const f=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");t>=e&&e>0?(f&&(f.textContent="COMPLETE",f.style.color=J.doneHex),c&&(c.style.background=J.doneHex,c.style.boxShadow=`0 0 8px rgba(${J.doneRgb},0.7)`)):X.some(E=>E.status==="error")?(f&&(f.textContent="ERROR",f.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(E=>E.status==="active")&&f&&(f.textContent="ACTIVE",f.style.color=J.hex,f.style.textShadow=`0 0 10px rgba(${J.rgb},0.5)`);const a=document.getElementById("nf-terminal"),l=a==null?void 0:a.querySelector(".nf-proc-active");l&&a&&l.scrollIntoView({behavior:"smooth",block:"center"})}function $t(){K&&K.isConnected||(st(),K=document.createElement("button"),K.id="nf-toggle-btn",K.className="nf-toggle-visible",K.innerHTML=me?it:at,K.title="ซ่อน/แสดง Netflow Overlay",K.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",K.onclick=()=>Et(),document.body.appendChild(K))}function Et(){Y&&($t(),me?(Y.classList.remove("nf-hidden"),Y.classList.add("nf-visible"),Y.style.opacity="1",Y.style.pointerEvents="auto",K&&(K.innerHTML=at),me=!1):(Y.classList.remove("nf-visible"),Y.classList.add("nf-hidden"),Y.style.opacity="0",Y.style.pointerEvents="none",K&&(K.innerHTML=it),me=!0))}const kt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Ct(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Se;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=kt[e]||kt.green;let s;try{s=chrome.runtime.getURL(r)}catch{s=`/${r}`}const i=J.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${s}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Ye(t=1){if(J=zt(),ot(),Y&&Y.isConnected){for(const e of re)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;ve=t,X=Fe(t),ct();for(const e of re)Xe(e);Le(),Ne(),me&&Et();return}Y&&!Y.isConnected&&(Y=null),ue&&(ue.remove(),ue=null),st();for(const e of re)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;if(ve=t,X=Fe(t),t>1){const e=re.find(s=>s.id==="video");if(e){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)s.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),s.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),s.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=s}const r=re.find(s=>s.id==="render");if(r){const s=r.steps.find(f=>f.id==="download");s&&(s.label="ดาวน์โหลด 720p");const i=r.steps.find(f=>f.id==="upscale");i&&(i.label="Full Video")}}Y=Lt(),Y.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(Y),Y.classList.add("nf-visible"),me=!1,$t(),qt(),jt(),requestAnimationFrame(()=>Ct())}function Tt(){pt(),vt(),me=!1,Y&&(Y.classList.add("nf-fade-out"),setTimeout(()=>{Y==null||Y.remove(),Y=null},500)),K&&(K.remove(),K=null)}const Kt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Qt(t,e,r){const s=X.findIndex(w=>w.status==="active"),i=X.filter(w=>w.status==="done").length,f=X.length,c=s>=0?s+1:i>=f?f:i,a=document.getElementById("nf-stat-step");a&&(a.textContent=`${c}/${f}`);let l=1;for(const w of X)if(w.status==="active"||w.status==="done")if(w.stepId.startsWith("scene")){const S=w.stepId.match(/^scene(\d+)-/);S&&(l=Math.max(l,parseInt(S[1],10)))}else(w.stepId==="download"||w.stepId==="upscale"||w.stepId==="open")&&(l=ve);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=ve>1?`${l}/${ve}`:"1/1"),e==="active"){const w=document.getElementById("nf-stat-status"),S=Kt[t]||t.toUpperCase();w&&(w.textContent=S)}else if(e==="done"&&i>=f){const w=document.getElementById("nf-stat-status");w&&(w.textContent="COMPLETE")}else if(e==="error"){const w=document.getElementById("nf-stat-status");w&&(w.textContent="ERROR")}const E=document.getElementById("nf-stat-progress");E&&(r!==void 0&&r>0?E.textContent=`${Math.min(100,r)}%`:e==="active"&&(E.textContent="—"))}function T(t,e,r){if(!Y)return;for(const i of re)for(const f of i.steps)f.id===t&&(f.status=e,r!==void 0&&(f.progress=r));for(const i of X)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const s=document.getElementById(`nf-step-${t}`);if(s&&(s.className="nf-step",e==="active"?s.classList.add("nf-step-active"):e==="done"?s.classList.add("nf-step-done"):e==="error"&&s.classList.add("nf-step-error")),Qt(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}Le(),Ne()}function Ee(t){T(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Be(t=4e3){pt(),vt(),Le(),Ne(),setTimeout(()=>Tt(),t)}function Le(){for(const t of re){const e=t.steps.filter(l=>l.status!=="skipped").length,r=t.steps.filter(l=>l.status==="done").length,s=t.steps.some(l=>l.status==="active"),i=e>0?Math.round(r/e*100):0,f=document.getElementById(`nf-pct-${t.id}`);f&&(f.textContent=`${i}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${i}%`);const a=document.getElementById(`nf-mod-${t.id}`);a&&(a.classList.remove("nf-active","nf-done"),i>=100?a.classList.add("nf-done"):s&&a.classList.add("nf-active"))}}function Jt(t){var s,i,f,c;ve=t;const e=new Map;for(const a of X)e.set(a.stepId,{status:a.status,progress:a.progress});X=Fe(t);for(const a of X){const l=e.get(a.stepId);l&&(a.status=l.status,l.progress!==void 0&&(a.progress=l.progress))}if(ct(),t>1){const a=re.find(l=>l.id==="video");if(a){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((s=a.steps.find(p=>p.id==="animate"))==null?void 0:s.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=a.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((f=a.steps.find(p=>p.id==="vid-generate"))==null?void 0:f.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=a.steps.find(p=>p.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});a.steps=l,Xe(a)}}const r=re.find(a=>a.id==="render");if(r&&t>1){const a=r.steps.find(p=>p.id==="download");a&&(a.label="ดาวน์โหลด 720p");const l=r.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),Xe(r)}Le(),Ne()}function Xe(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${i.id}`;let c="";i.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${c}
        `,e.appendChild(f)});const s=document.createElement("div");s.className="nf-mod-progress",s.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(s)}function Ve(t){t.replace(/^\[Netflow AI\]\s*/,"")}let ke=null,he=null;const Zt=new Promise(t=>{he=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(ke=t.tabId,console.log(`[Netflow AI] Tab ID: ${ke}`)),he&&(he(ke),he=null)})}catch{he&&(he(null),he=null)}function de(){return ke?`netflow_pending_action_${ke}`:"netflow_pending_action"}function St(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ve(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Ve(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function je(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Ke(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},f=>{if(chrome.runtime.lastError){i(!1);return}i(!!(f!=null&&f.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const f of i){const c=f.src||f.currentSrc||"";if(c)return c}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,s=0;for(const i of e){let f=i.src||"";if(!f){const l=i.querySelector("source");l&&(f=l.getAttribute("src")||"")}if(!f&&i.currentSrc&&(f=i.currentSrc),!f)continue;if(j()){r||(r=f,s=1);continue}const c=i.getBoundingClientRect(),a=c.width*c.height;c.width>50&&a>s&&(s=a,r=f)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${s.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(r);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Mt(r),r;const f=await i.blob(),c=(f.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${c} MB, type: ${f.type}`),f.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${f.size} bytes) — อาจเป็น thumbnail`);const a=await new Promise((l,p)=>{const E=new FileReader;E.onloadend=()=>l(E.result),E.onerror=()=>p(new Error("FileReader error")),E.readAsDataURL(f)});n(`[TikTok] Data URL พร้อม: ${(a.length/1024/1024).toFixed(1)} MB`),await new Promise(l=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:a},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),l()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Mt(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Mt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function Qe(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Je=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ze=/Win/i.test(navigator.userAgent),ge=Je?"🍎 Mac":Ze?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ge}`),window.__VIDEO_COMPLETE_SENT__=!1;class et extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let De=null,be=null,Pt=!1;const Ce=new Map;let It=0;function en(){if(De)return De;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return De=new Worker(URL.createObjectURL(t)),De.onmessage=e=>{const r=Ce.get(e.data);r&&(Ce.delete(e.data),r())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),De}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function tn(){if(be)return be;if(Pt)return null;try{return be=chrome.runtime.connect({name:"timer"}),be.onMessage.addListener(t=>{const e=Ce.get(t.id);e&&(Ce.delete(t.id),e())}),be.onDisconnect.addListener(()=>{be=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),be}catch{return Pt=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const g=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new et);let s=!1;const i=()=>{if(!s){if(s=!0,window.__NETFLOW_STOP__)return r(new et);e()}},f=en();if(f){const l=++It;Ce.set(l,i),f.postMessage({id:l,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const c=tn();if(c){const l=++It;Ce.set(l,i),c.postMessage({cmd:"delay",id:l,ms:t});return}const a=setTimeout(i,t);g._lastId=a});function we(){return!!window.__NETFLOW_STOP__}const j=()=>document.hidden;let _t=0;async function xe(){if(!document.hidden)return!1;const t=Date.now();if(t-_t<15e3)return!1;_t=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await g(1500),!0}catch{return!1}}async function tt(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const t=Date.now();for(;document.hidden&&Date.now()-t<5e3;)await g(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await g(3e3),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function At(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const s of e){if(s.closest("#netflow-engine-overlay"))continue;const i=(s.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const f of t)if(i.includes(f))return((r=s.textContent)==null?void 0:r.trim())||f}}return null}async function ne(t){if(j()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,s=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:s,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await g(50),t.click()}function nn(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,s=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:s};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function on(t){const e=[],r=document.querySelectorAll("i");for(const s of r){if((s.textContent||"").trim()!==t)continue;let f=s,c=null,a=1/0;for(let l=0;l<20&&f&&(f=f.parentElement,!(!f||f===document.body));l++){if(j()){l>=3&&f.children.length>0&&!c&&(c=f);continue}const p=f.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const E=p.width*p.height;E<a&&(c=f,a=E)}}c&&!e.includes(c)&&e.push(c)}return e.sort((s,i)=>{const f=s.getBoundingClientRect(),c=i.getBoundingClientRect();return f.left-c.left}),e}function nt(t=!1){const e=[],r=document.querySelectorAll("video");for(const c of r){let a=c.parentElement;for(let l=0;l<10&&a;l++){if(j()){if(l>=3&&a.children.length>0){e.push({el:a,left:0});break}a=a.parentElement;continue}const p=a.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:a,left:p.left});break}a=a.parentElement}}const s=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of s){const a=(c.textContent||"").trim();if(a==="play_arrow"||a==="play_circle"||a==="videocam"){let l=c.parentElement;for(let p=0;p<10&&l;p++){if(j()){if(p>=3&&l.children.length>0){e.push({el:l,left:0});break}l=l.parentElement;continue}const E=l.getBoundingClientRect();if(E.width>120&&E.height>80&&E.width<window.innerWidth*.7&&E.top>=-50&&E.left<window.innerWidth*.75){e.push({el:l,left:E.left});break}l=l.parentElement}}}const i=document.querySelectorAll("img");for(const c of i){const a=(c.alt||"").toLowerCase();if(a.includes("video")||a.includes("วิดีโอ")){let l=c.parentElement;for(let p=0;p<10&&l;p++){if(j()){if(p>=3&&l.children.length>0){e.push({el:l,left:0});break}l=l.parentElement;continue}const E=l.getBoundingClientRect();if(E.width>120&&E.height>80&&E.width<window.innerWidth*.7&&E.top>=-50&&E.left<window.innerWidth*.75){e.push({el:l,left:E.left});break}l=l.parentElement}}}const f=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(a=>a.el===c));if(f.sort((c,a)=>c.left-a.left),f.length>0){const c=f[0].el,a=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${a.left.toFixed(0)},${a.top.toFixed(0)}) ขนาด ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function an(){const t=on("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let s=r.parentElement;for(let i=0;i<10&&s;i++){if(j()){if(i>=3&&s.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),s;s=s.parentElement;continue}const f=s.getBoundingClientRect();if(f.width>100&&f.height>80&&f.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${f.left.toFixed(0)},${f.top.toFixed(0)})`),s;s=s.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function rn(t,e){var a;const[r,s]=t.split(","),i=((a=r.match(/:(.*?);/))==null?void 0:a[1])||"image/png",f=atob(s),c=new Uint8Array(f.length);for(let l=0;l<f.length;l++)c[l]=f.charCodeAt(l);return new File([c],e,{type:i})}function qe(t){var s;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((s=i.textContent)==null?void 0:s.trim())===t){const f=i.closest("button");f&&e.push(f)}return e}function sn(){const t=[...qe("add"),...qe("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const s=document.querySelectorAll("button");for(const i of s){const f=(i.textContent||"").trim();if(f!=="+"&&f!=="add")continue;if(j())return i;const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width<60&&c.height<60)return i}return null}let e=null,r=0;for(const s of t){const i=s.getBoundingClientRect();i.y>r&&(r=i.y,e=s)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function Bt(){for(const s of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=qe(s);let f=null,c=0;for(const a of i){const l=a.getBoundingClientRect();l.y>c&&(c=l.y,f=a)}if(f)return n(`พบปุ่ม Generate จากไอคอน "${s}" ที่ y=${c.toFixed(0)}`),f}const t=document.querySelectorAll("button");let e=null,r=0;for(const s of t){if(j())break;const i=s.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const f=Math.abs(i.width-i.height)<10&&i.width<60,c=i.y+i.x+(f?1e3:0);c>r&&(r=c,e=s)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const s of t){const i=(s.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return s}return null}function Dt(){const t=a=>!!a.closest("#netflow-engine-overlay"),e=j(),r=document.querySelectorAll('[data-slate-editor="true"]');for(const a of r){if(t(a))continue;if(e)return n("findPromptTextInput: ✅ Slate editor (hidden mode)"),a;const l=a.getBoundingClientRect();if(l.height>0)return n(`findPromptTextInput: ✅ Slate editor (rect.bottom=${Math.round(l.bottom)})`),a}const s=document.querySelectorAll('[role="textbox"]');for(const a of s){if(t(a))continue;if(e)return n("findPromptTextInput: ✅ role=textbox (hidden mode)"),a;const l=a.getBoundingClientRect();if(l.height>0)return n(`findPromptTextInput: ✅ role=textbox (rect.bottom=${Math.round(l.bottom)})`),a}const i=document.querySelectorAll('[contenteditable="true"]');for(const a of i){if(t(a))continue;if(e)return n("findPromptTextInput: ✅ contenteditable (hidden mode)"),a;const l=a.getBoundingClientRect();if(l.bottom>window.innerHeight*.3&&l.height>0)return n(`findPromptTextInput: ✅ contenteditable (rect.bottom=${Math.round(l.bottom)})`),a}const f=document.querySelectorAll("textarea");for(const a of f){if(t(a))continue;if(e)return n("findPromptTextInput: ✅ textarea (hidden mode)"),a;if(a.getBoundingClientRect().bottom>window.innerHeight*.3)return a}const c=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of c){if(t(a))continue;const l=a.placeholder||"";if(l.includes("สร้าง")||l.includes("prompt")||l.includes("describe")||l.includes("create"))return a}for(const a of i)if(!t(a))return n(`findPromptTextInput: ⚠️ last-resort contenteditable (tag=${a.tagName})`),a;return n(`findPromptTextInput: ❌ ไม่พบ (slate=${r.length}, textbox=${s.length}, editable=${i.length}, textarea=${f.length}, input=${c.length})`),null}async function Ge(t,e){var r,s,i,f;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const a=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(a),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),await g(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const a=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(a),await g(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const a=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(a),await g(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const a=document.createElement("textarea");a.value=e,a.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(a),a.focus(),a.select(),document.execCommand("copy"),document.body.removeChild(a),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(a=>a.startsWith("__reactFiber$")||a.startsWith("__reactInternalInstance$"));if(c){let a=t[c];for(let l=0;l<30&&a;l++){const p=a.memoizedProps,E=a.memoizedState;if((s=p==null?void 0:p.editor)!=null&&s.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const w=p.editor;w.selection,w.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((f=(i=E==null?void 0:E.memoizedState)==null?void 0:i.editor)!=null&&f.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),E.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}a=a.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function ln(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}let ee=null;function cn(){ee=null;const t=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อก .click() บน file input (${ge})`),ee=this;return}return t.call(this)};const e=HTMLInputElement.prototype.showPicker;let r=!1;typeof e=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n(`🚫 บล็อก .showPicker() บน file input (${ge})`),ee=this;return}return e.call(this)},r=!0);const s=window.showOpenFilePicker;let i=!1;return typeof s=="function"&&(window.showOpenFilePicker=async function(...f){throw n(`🚫 บล็อก showOpenFilePicker (${ge})`),new DOMException("Blocked by Netflow","AbortError")},i=!0),n(`🔒 บล็อก file dialog: click ✅ | showPicker ${r?"✅":"❌"} | showOpenFilePicker ${i?"✅":"❌"} (${ge})`),()=>{HTMLInputElement.prototype.click=t,r&&(HTMLInputElement.prototype.showPicker=e),i&&(window.showOpenFilePicker=s),n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function dn(t,e,r){var E;const s=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(w=>w.input)];ee&&!i.includes(ee)&&(i.push(ee),n("เพิ่ม captured file input จากตัวบล็อก"));for(const w of s)!i.includes(w)&&w.offsetParent===null&&i.push(w);for(const w of i)w.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const c=[...document.querySelectorAll('input[type="file"]')];if(ee&&ee.type==="file"&&!c.includes(ee)&&(c.push(ee),n("captured file input ไม่อยู่ใน DOM — เพิ่มเป็น candidate")),c.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ge})`),!1;let a;if(ee&&ee.type==="file")a=ee,n("ใช้ captured file input จากตัวบล็อก ✅");else if(r&&r.size>0){const w=c.filter(S=>!r.has(S));w.length>0?(a=w[w.length-1],n(`เล็งเป้า file input ใหม่ (${w.length} ใหม่, ${c.length} ทั้งหมด)`)):(a=c[c.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${c.length} ตัว`))}else a=c[c.length-1];const l=new DataTransfer;l.items.add(e);try{a.files=l.files,n(`ฉีดไฟล์ผ่าน target.files (${((E=a.files)==null?void 0:E.length)??0} ไฟล์)`)}catch(w){n(`กำหนด target.files ล้มเหลว: ${w.message} — ลอง defineProperty`);try{Object.defineProperty(a,"files",{value:l.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(S){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${S.message}`),!1}}const p=a._valueTracker;p&&(p.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),a.dispatchEvent(new Event("change",{bubbles:!0})),a.dispatchEvent(new Event("input",{bubbles:!0}));try{const w=new DataTransfer;w.items.add(e);const S=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:w});a.dispatchEvent(S),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ge}`),!0}function Te(){let t=0;const e=document.querySelectorAll("img");for(const s of e){if(s.closest("#netflow-engine-overlay")||!s.src)continue;if(j()){t++;continue}const i=s.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&s.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const s of r){if(s.closest("#netflow-engine-overlay"))continue;if(j()){t++;continue}const i=s.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&s.offsetParent!==null&&t++}return t}async function Rt(t,e){var E;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=rn(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const s=Te();n(`รูปย่อปัจจุบันใน Prompt Bar: ${s} รูป`);const i=async(w,S=8e3)=>{const F=Date.now();for(;Date.now()-F<S;){const M=Te();if(M>s)return n(`✅ [${w}] ยืนยัน: รูปย่อเพิ่มจาก ${s} → ${M}`),!0;await g(500)}return n(`⚠️ [${w}] รูปย่อไม่เพิ่ม (ยังคง ${Te()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const f=sn();if(!f)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const a=cn();let l=ln();const p=new MutationObserver(w=>{for(const S of w)for(const F of S.addedNodes)if(F instanceof HTMLInputElement&&F.type==="file"&&(F.type="text",l.push({input:F,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),F instanceof HTMLElement){const M=F.querySelectorAll('input[type="file"]');for(const m of M)m.type="text",l.push({input:m,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{f.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let w=!1;const S=Date.now();for(;!w&&Date.now()-S<8e3;){const M=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const m of M){if(m===f)continue;const o=m.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const u of o){const x=((E=u.textContent)==null?void 0:E.trim())||"";if(x==="upload"||x==="upload_file"||x==="add_photo_alternate"){const V=Array.from(m.querySelectorAll("i")).map(I=>{var _;return(_=I.textContent)==null?void 0:_.trim()});if(!V.includes("drive_folder_upload")&&!V.includes("photo_library")){m.click(),w=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${x}) ✅`);break}}}if(w)break}if(!w)for(const m of M){if(m===f)continue;const o=m.childNodes.length<=8?(m.textContent||"").trim():"";if(o.length>0&&o.length<60){const u=o.toLowerCase();if(u.includes("ไลบรารี")||u.includes("library")||u.includes("drive")||u.includes("ไดรฟ์"))continue;if(u==="upload"||u==="อัปโหลด"||u==="อัพโหลด"||u.includes("upload image")||u.includes("upload photo")||u.includes("upload a file")||u.includes("upload file")||u.includes("อัปโหลดรูปภาพ")||u.includes("อัพโหลดรูปภาพ")||u.includes("อัปโหลดไฟล์")||u.includes("อัพโหลดไฟล์")||u.includes("from computer")||u.includes("จากคอมพิวเตอร์")||u.includes("from device")||u.includes("จากอุปกรณ์")||u.includes("my computer")||u.includes("คอมพิวเตอร์ของฉัน")){m.click(),w=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!w)for(const m of M){if(m===f)continue;const o=(m.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก")||o.includes("ไลบรารี")||o.includes("library"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const u=m.getBoundingClientRect();if(u.width>0&&u.height>0){m.click(),w=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}w||await g(500)}if(!w)return A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1;await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──");let F=dn(l,r,c);if(!F){n("⚠️ file input injection ล้มเหลว — ลอง drag-and-drop แทน");let M=null;const m=document.querySelectorAll('[role="dialog"], [data-state="open"][aria-haspopup="dialog"]');for(const o of m)if(o.getBoundingClientRect().width>0){M=o;break}if(!M){const o=document.querySelectorAll('[data-radix-portal], [class*="overlay"], [class*="modal"]');for(const u of o)if(u.getBoundingClientRect().width>0&&!u.closest("#netflow-engine-overlay")){M=u;break}}if(!M){const o=document.querySelector('[contenteditable="true"], [role="textbox"]');o&&(M=o)}if(M){n(`🎯 Drop target: <${M.tagName}> ${(M.className||"").substring(0,40)}`);const o=new DataTransfer;o.items.add(r);const u=M.getBoundingClientRect(),x=u.left+u.width/2,V=u.top+u.height/2,I={bubbles:!0,cancelable:!0,clientX:x,clientY:V,dataTransfer:o};M.dispatchEvent(new DragEvent("dragenter",I)),await g(100),M.dispatchEvent(new DragEvent("dragover",{...I,cancelable:!0})),await g(100),M.dispatchEvent(new DragEvent("drop",I)),n("✅ ส่ง drop event บน target แล้ว"),await g(2e3);const _=Te();_>s?(n(`✅ Drop สำเร็จ — รูปย่อเพิ่มจาก ${s} → ${_}`),F=!0):(n(`⚠️ Drop อาจไม่สำเร็จ — ยังคง ${_} รูป — ดำเนินการต่อ`),F=!0)}else return A(`ฉีดไฟล์ ${e} ล้มเหลว — ไม่พบ file input และ drop target`),!1}return n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0}finally{p.disconnect(),a();for(const w of l)w.input.type!=="file"&&(w.input.type="file")}}async function pn(t,e){var M;n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button, div, span, [role='button']");let s=null;for(const m of r){const o=(m.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const u=m.getBoundingClientRect();u.bottom>window.innerHeight*.7&&u.width>30&&u.height>10&&(!s||(m.textContent||"").length<(s.textContent||"").length)&&(s=m)}}if(s&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(s.textContent||"").substring(0,40).trim()}"`),!s){const m=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of m){const u=((M=o.textContent)==null?void 0:M.trim())||"";if(u.includes("crop")||u==="aspect_ratio"||u==="photo_size_select_large"){const x=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(x){const V=x.getBoundingClientRect();if(V.bottom>window.innerHeight*.7&&V.width>0){s=x,n(`พบปุ่มตั้งค่าจากไอคอน: ${u}`);break}}}}}if(!s)for(const m of r){const o=(m.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const u=m.getBoundingClientRect();if(u.bottom>window.innerHeight*.7&&u.width>30){s=m,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!s)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=s.getBoundingClientRect(),f=i.left+i.width/2,c=i.top+i.height/2,a={bubbles:!0,cancelable:!0,clientX:f,clientY:c,button:0};s.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),s.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",a)),s.dispatchEvent(new MouseEvent("click",a)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let l=!1,p=null;const E=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const m of E){const o=m.getAttribute("aria-controls")||"",u=m.id||"";if(o.toUpperCase().includes("IMAGE")||u.toUpperCase().includes("IMAGE")){p=m,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const m of document.querySelectorAll('[role="tab"]')){const o=m.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=m,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const m of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const u=m.getBoundingClientRect();if(u.width>0&&u.height>0){p=m,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(p){const m=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(m==="active"||o==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const u=p.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",x)),p.dispatchEvent(new MouseEvent("click",x)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const w=t==="horizontal"?"แนวนอน":"แนวตั้ง",S=t==="horizontal"?"landscape":"portrait";for(const m of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>30)&&(o===w||o.includes(w)||o.toLowerCase()===S||o.toLowerCase().includes(S))){const u=m.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",x)),m.dispatchEvent(new MouseEvent("click",x)),n(`เลือกทิศทาง: ${w}`),await g(400);break}}const F=`x${e}`;for(const m of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(m.textContent||"").trim();if(!(o.length>10)&&(o===F||o===`${e}`)){const u=m.getBoundingClientRect(),x={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",x)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",x)),m.dispatchEvent(new MouseEvent("click",x)),n(`เลือกจำนวน: ${F}`),await g(400);break}}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),s.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mousedown",a)),await g(80),s.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),s.dispatchEvent(new MouseEvent("mouseup",a)),s.dispatchEvent(new MouseEvent("click",a)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function fn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",s=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",f=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let c=null;const a=Date.now()+1e4;for(;!c&&Date.now()<a;){const m=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of m){const u=(o.textContent||"").trim();if(!(u.length>80)&&(u.includes("Veo")||u.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||u.includes("arrow_drop_down")||o.querySelector("svg"))){c=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${u.substring(0,50).trim()}"`);break}}if(!c)for(const o of m){const u=(o.textContent||"").trim();if(!(u.length>80)&&(u.includes("Veo")||u.includes("veo"))){const x=o.getBoundingClientRect();if(x.width>0&&x.height>0){c=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${u.substring(0,50).trim()}"`);break}}}if(!c)for(const o of m){const u=(o.textContent||"").trim();if(!(u.length>50)&&(u.includes("Fast")||u.includes("Quality")||u.includes("เร็ว")||u.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){c=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${u.substring(0,50).trim()}"`);break}}if(!c){const o=document.querySelectorAll("div, span, button, [role='button']");for(const u of o){const x=(u.textContent||"").trim();if(x==="Veo 3.1 - Fast"||x==="Veo 3.1 - Quality"||x==="Fast"||x==="Quality"||x==="Veo 3.1 - เร็ว"||x==="Veo 3.1 - คุณภาพสูง"||x==="Veo 3.1 - คุณภาพ"||x==="Veo 2 - Fast"||x==="Veo 2 - Quality"){const V=u.getBoundingClientRect();if(V.width>0&&V.height>0){c=u,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${x}"`);break}}}}if(!c){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const u of o){const x=(u.textContent||"").trim();if(!(x.length>60)&&(x.includes("3.1")||x.includes("model")||x.includes("โมเดล"))){const V=u.getBoundingClientRect();if(V.bottom>window.innerHeight*.4&&V.width>0&&V.height>0){c=u,n(`พบปุ่ม model selector (Strategy E): "${x.substring(0,50).trim()}"`);break}}}}c||await g(1e3)}if(!c)return A("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const l=(c.textContent||"").trim();if(l.includes(e)||l.includes(r)&&!l.includes(s)||l.includes(i)&&!l.includes(f))return n(`✅ Veo quality เป็น "${l}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=c.getBoundingClientRect(),E=p.left+p.width/2,w=p.top+p.height/2,S={bubbles:!0,cancelable:!0,clientX:E,clientY:w,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",S)),await g(80),c.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",S)),c.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let F=!1;const M=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const m of M){const o=(m.textContent||"").trim();if((o===e||o===r||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const x=m.getBoundingClientRect();if(x.width>0&&x.height>0){const V=x.left+x.width/2,I=x.top+x.height/2,_={bubbles:!0,cancelable:!0,clientX:V,clientY:I,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",_)),await g(80),m.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",_)),m.dispatchEvent(new MouseEvent("click",_)),n(`✅ เลือก "${o}" สำเร็จ`),F=!0;break}}}return F?(await g(600),!0):(A(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),!1)}async function un(t){var I,_,U,y;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),s=r?r[1]:"unknown",i=Je?"macOS":Ze?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",f=Je?((_=(I=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:I[1])==null?void 0:_.replace(/_/g,"."))||"":Ze&&((U=e.match(/Windows NT ([0-9.]+)/))==null?void 0:U[1])||"",c=navigator.language||"unknown",a=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${f} | Chrome ${s}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${a} | แพลตฟอร์ม: ${ge}`),n("══════════════════════════════════════════");try{Ue(t.theme)}catch{}try{Ye()}catch(d){console.warn("Overlay show error:",d)}const l=[],p=[];try{T("settings","active");const d=t.orientation||"horizontal",k=t.outputCount||1,B=await pn(d,k);l.push(B?"✅ Settings":"⚠️ Settings"),T("settings",B?"done":"error")}catch(d){A(`ตั้งค่าผิดพลาด: ${d.message}`),l.push("⚠️ Settings"),T("settings","error")}try{const d=t.veoQuality||"fast";await fn(d)?(l.push(`✅ Veo ${d}`),n(`✅ Veo quality: ${d}`)):(l.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(d){A(`Veo quality error: ${d.message}`),l.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),await g(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const E=()=>{const d=document.querySelectorAll("span, div, p, label");for(const k of d){const B=(k.textContent||"").trim();if(/^\d{1,3}%$/.test(B)){if(B==="100%")return null;const P=k.getBoundingClientRect();if(P.width>0&&P.height>0&&P.top>0&&P.top<window.innerHeight)return B}}return null},w=async d=>{n(`รอการอัพโหลด ${d} เสร็จ...`),await g(2e3);const k=Date.now(),B=6e4;let P="",R=Date.now();const C=15e3;for(;Date.now()-k<B;){const v=E();if(v){if(v!==P)P=v,R=Date.now(),n(`กำลังอัพโหลด: ${v} — รอ...`);else if(Date.now()-R>C){n(`✅ อัพโหลด ${d} — % ค้างที่ ${v} นาน ${C/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}await g(1500)}else{n(`✅ อัพโหลด ${d} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}A(`⚠️ อัพโหลด ${d} หมดเวลาหลัง ${B/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){T("upload-char","active");try{const d=await Rt(t.characterImage,"character.png");l.push(d?"✅ ตัวละคร":"⚠️ ตัวละคร"),d||p.push("character upload failed"),T("upload-char",d?"done":"error")}catch(d){A(`อัพโหลดตัวละครผิดพลาด: ${d.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),T("upload-char","error")}await w("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500)}else Ee("upload-char");if(t.productImage){T("upload-prod","active"),n("🧹 รีเซ็ต UI ก่อนอัพโหลดสินค้า..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500),document.querySelectorAll('input[type="file"]').forEach(d=>{n("🧹 ลบ file input เก่า"),d.remove()}),document.querySelectorAll('input[type="text"]').forEach(d=>{if(d.offsetParent===null&&!d.closest('[role="textbox"]')&&!d.closest("[contenteditable]")){const k=d.getBoundingClientRect();(k.width===0||k.height===0)&&(n("🧹 ลบ hidden text input เก่า"),d.remove())}}),await g(1e3),n("🧹 รีเซ็ตเสร็จ — เริ่มอัพโหลดสินค้า");try{const d=await Rt(t.productImage,"product.png");l.push(d?"✅ สินค้า":"⚠️ สินค้า"),d||p.push("product upload failed"),T("upload-prod",d?"done":"error")}catch(d){A(`อัพโหลดสินค้าผิดพลาด: ${d.message}`),l.push("❌ สินค้า"),p.push("product upload error"),T("upload-prod","error")}await w("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500)}else Ee("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const S=E();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await w("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const F=(t.characterImage?1:0)+(t.productImage?1:0);if(F>0){let d=Te();d<F&&(n(`⏳ เห็นรูปย่อแค่ ${d}/${F} — รอ 3 วินาที...`),await g(3e3),d=Te()),d>=F?n(`✅ ยืนยันรูปย่ออ้างอิง: ${d}/${F}`):A(`⚠️ คาดว่าจะมี ${F} รูปย่อ แต่พบ ${d} — ดำเนินการต่อ`)}if(we()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Be(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),T("img-prompt","active");let M=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt ภาพ + กด Generate");try{await new Promise(d=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>d())),M=!0,await g(1500)}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await g(1e3);let m=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง Image prompt + กด Generate");try{await new Promise(k=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>k())),m=!0;const d=Date.now();for(;document.hidden&&Date.now()-d<5e3;)await g(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await g(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}let o=!1;for(let d=1;d<=5&&!o;d++){if(d>1&&document.hidden){n(`🔄 Retry ${d}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise(P=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>P())),m=!0;const B=Date.now();for(;document.hidden&&Date.now()-B<5e3;)await g(200);document.hidden||await g(2e3)}catch{}}const k=Dt();if(!k){n(`⚠️ ครั้งที่ ${d}: ไม่พบช่อง Image Prompt — รอแล้วลองใหม่`),await g(3e3);continue}d>1&&(k.focus(),await g(500)),await Ge(k,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),T("img-prompt","done"),o=!0;break}if(!o)return A("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("image prompt paste failed after 5 attempts"),T("img-prompt","error"),{success:!1,message:"❌ วาง Prompt ไม่สำเร็จ",step:"img-prompt"};await g(800);const u=new Set;document.querySelectorAll("img").forEach(d=>{d.src&&u.add(d.src)}),n(`บันทึกรูปเดิม: ${u.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),T("img-generate","active"),await g(500);const x=Bt();if(x){const d=x.getBoundingClientRect(),k=d.left+d.width/2,B=d.top+d.height/2,P={bubbles:!0,cancelable:!0,clientX:k,clientY:B,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",P)),await g(80),x.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",P)),x.dispatchEvent(new MouseEvent("click",P)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await g(500),x.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",P)),await g(80),x.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",P)),x.dispatchEvent(new MouseEvent("click",P)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),T("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),T("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),T("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const d=()=>{const C=document.querySelectorAll("div, span, p, label, strong, small");for(const v of C){if(v.closest("#netflow-engine-overlay"))continue;const h=(v.textContent||"").trim();if(h.length>10)continue;const b=h.match(/(\d{1,3})\s*%/);if(!b)continue;const $=parseInt(b[1],10);if($<1||$>100)continue;if(j())return $;const O=v.getBoundingClientRect();if(!(O.width===0||O.width>150)&&!(O.top<0||O.top>window.innerHeight))return $}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let k=null,B=-1,P=0;const R=Date.now();for(;!k&&Date.now()-R<18e4;){const C=document.querySelectorAll("img");for(const v of C){if(u.has(v.src)||!(v.alt||"").toLowerCase().includes("generated"))continue;if(j()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const $=v.getBoundingClientRect();return $.width>120&&$.height>120&&$.top>0&&$.top<window.innerHeight*.85})()){const $=v.closest("div");if($){k=$,n(`พบรูป AI จาก alt="${v.alt}": ${v.src.substring(0,80)}...${j()?" (hidden-mode)":""}`);break}}}if(!k)for(const v of C){if(u.has(v.src))continue;const h=v.closest("div"),b=(h==null?void 0:h.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg"))continue;if(j()?v.naturalWidth>120&&v.naturalHeight>120:(()=>{const O=v.getBoundingClientRect();return O.width>120&&O.height>120&&O.top>0&&O.top<window.innerHeight*.85})()){const O=v.closest("div");if(O){k=O,n(`พบรูปใหม่ (สำรอง): ${v.src.substring(0,80)}...${j()?" (hidden-mode)":""}`);break}}}if(!k){if(we()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const v=At();if(v){A(`❌ สร้างรูปล้มเหลว: ${v}`),p.push(`image gen failed: ${v}`),T("img-wait","error");break}const h=d();h!==null?(h!==B&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${h}%`),B=h,T("img-wait","active",h)),P=Date.now()):B>30&&Math.floor((Date.now()-P)/1e3)>=3&&n(`🖼️ % หายที่ ${B}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&B>0&&Date.now()-P>1e4&&await xe(),document.hidden&&B<1&&Date.now()-R>3e4&&await xe(),await g(3e3)}}if(!k)A("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),T("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),T("img-wait","done",100),await tt();const C=k.getBoundingClientRect(),v=C.left+C.width/2,h=C.top+C.height/2,b={bubbles:!0,cancelable:!0,clientX:v,clientY:h};k.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseenter",b)),k.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseover",b)),k.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousemove",b)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let $=null;for(const O of["more_vert","more_horiz","more"]){const D=qe(O);for(const L of D){const G=L.getBoundingClientRect();if(G.top>=C.top-20&&G.top<=C.bottom&&G.right>=C.right-150&&G.right<=C.right+20){$=L;break}}if($)break}if(!$){const O=document.querySelectorAll("button");for(const D of O){const L=D.getBoundingClientRect();if(L.width<50&&L.height<50&&L.top>=C.top-10&&L.top<=C.top+60&&L.left>=C.right-80){const G=D.querySelectorAll("i");for(const W of G)if((((y=W.textContent)==null?void 0:y.trim())||"").includes("more")){$=D;break}if($)break;const z=D.getAttribute("aria-label")||"";if(z.includes("เพิ่มเติม")||z.includes("more")){$=D;break}}}}if(!$)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const O=$.getBoundingClientRect(),D=O.left+O.width/2,L=O.top+O.height/2,G={bubbles:!0,cancelable:!0,clientX:D,clientY:L,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",G)),await g(80),$.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",G)),$.dispatchEvent(new MouseEvent("click",G)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let z=null;const W=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const H of W){const Z=(H.textContent||"").trim();if(Z.includes("ทำให้เป็นภาพเคลื่อนไหว")||Z.includes("Animate")||Z.includes("animate")){z=H;break}}if(!z)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const H=z.getBoundingClientRect(),Z=H.left+H.width/2,pe=H.top+H.height/2,q={bubbles:!0,cancelable:!0,clientX:Z,clientY:pe,button:0};z.dispatchEvent(new PointerEvent("pointerdown",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mousedown",q)),await g(80),z.dispatchEvent(new PointerEvent("pointerup",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),z.dispatchEvent(new MouseEvent("mouseup",q)),z.dispatchEvent(new MouseEvent("click",q)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),T("animate","done"),await g(3e3)}}}}catch(d){A(`ขั้น 4 ผิดพลาด: ${d.message}`),l.push("⚠️ Animate")}if(we()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Be(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),T("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let d=!1;const k=document.querySelectorAll("button, span, div");for(const C of k){const v=(C.textContent||"").trim(),h=C.getBoundingClientRect();if((v==="วิดีโอ"||v==="Video"||v.includes("วิดีโอ"))&&h.bottom>window.innerHeight*.7){d=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}d||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let B=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(v=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>v())),B=!0;const C=Date.now();for(;document.hidden&&Date.now()-C<5e3;)await g(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว — รอ DOM render 3 วิ"),await g(3e3))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await g(1e3);let P=!1;for(let C=1;C<=5&&!P;C++){if(C>1&&document.hidden){n(`🔄 Retry ${C}: Tab ซ่อน — ดึง Chrome ขึ้นมาอีกครั้ง`);try{await new Promise($=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>$())),B=!0;const b=Date.now();for(;document.hidden&&Date.now()-b<5e3;)await g(200);document.hidden||await g(2e3)}catch{}}const v=Dt();if(!v){n(`⚠️ ครั้งที่ ${C}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await g(3e3);continue}C>1&&(v.focus(),await g(500)),await Ge(v,t.videoPrompt),await g(500);const h=(v.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();h.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${C} (${h.length} ตัวอักษร)`),l.push("✅ Video Prompt"),T("vid-prompt","done"),P=!0):(n(`⚠️ ครั้งที่ ${C}: Prompt ไม่ถูกวาง (ได้ ${h.length} ตัวอักษร)`),await g(1500))}if(!P)throw A("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 5 ครั้ง — หยุด ไม่กด Generate"),l.push("❌ Video Prompt"),p.push("video prompt paste failed after 5 attempts"),T("vid-prompt","error"),new Error("Video prompt paste failed");await g(1e3),T("vid-generate","active");const R=Bt();if(R){const C=R.getBoundingClientRect(),v=C.left+C.width/2,h=C.top+C.height/2,b={bubbles:!0,cancelable:!0,clientX:v,clientY:h,button:0};R.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mousedown",b)),await g(80),R.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mouseup",b)),R.dispatchEvent(new MouseEvent("click",b)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),T("vid-generate","done"),await g(500),R.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mousedown",b)),await g(80),R.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mouseup",b)),R.dispatchEvent(new MouseEvent("click",b)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),T("vid-generate","error");if(B){await g(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(d){A(`ขั้น 5 ผิดพลาด: ${d.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${d.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),Ee("animate"),Ee("vid-prompt"),Ee("vid-generate"),Ee("vid-wait");if(t.videoPrompt){T("vid-wait","active");const d=t.sceneCount||1,k=t.videoScenePrompts||[t.videoPrompt];if(d>1)try{Jt(d)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${d>1?`ต่อ ${d} ฉาก`:"ดาวน์โหลด"} ===`);const B=()=>{const C=document.querySelectorAll("div, span, p, label, strong, small");for(const v of C){if(v.closest("#netflow-engine-overlay"))continue;const h=(v.textContent||"").trim();if(h.length>10)continue;const b=h.match(/(\d{1,3})\s*%/);if(!b)continue;const $=parseInt(b[1],10);if($<1||$>100)continue;if(j())return $;const O=v.getBoundingClientRect();if(!(O.width===0||O.width>150)&&!(O.top<0||O.top>window.innerHeight))return $}return null},P=async(C=6e5)=>{n("รอการสร้างวิดีโอ..."),T("vid-wait","active"),await g(5e3);const v=()=>{const q=document.querySelectorAll("div, span, p, label, strong, small");let N=0;for(const Q of q){if(Q.closest("#netflow-engine-overlay"))continue;const te=(Q.textContent||"").trim();if(te.includes("%")&&te.length<15){const se=Q.tagName.toLowerCase(),ye=Q.className&&typeof Q.className=="string"?Q.className.split(/\s+/).slice(0,2).join(" "):"",le=Q.getBoundingClientRect();if(n(`  🔍 "${te}" ใน <${se}.${ye}> ที่ (${le.left.toFixed(0)},${le.top.toFixed(0)}) w=${le.width.toFixed(0)}`),N++,N>=5)break}}N===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},h=nt();n(h?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),v();const b=Date.now();let $=-1,O=0,D=!1;for(;Date.now()-b<C;){const q=B();if(q!==null){if(q!==$&&(n(`ความคืบหน้าวิดีโอ: ${q}%`),$=q,T("vid-wait","active",q)),O=Date.now(),q>=100){n("✅ ตรวจพบ 100%!"),D=!0;break}}else if($>30){const N=Math.floor((Date.now()-O)/1e3);if(N>=5){n(`✅ % หายไปที่ ${$}% (หาย ${N} วินาที) — วิดีโอเสร็จ!`),D=!0;break}n(`⏳ % หายที่ ${$}% — ยืนยันใน ${5-N} วินาที...`)}else{const N=Math.floor((Date.now()-b)/1e3);N%15<3&&n(`⏳ รอ... (${N} วินาที) ไม่พบ %`)}if(!D&&$>0&&nt(!0)&&!h){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${$}% — วิดีโอเสร็จ!`),D=!0;break}if(we())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if($<1){const N=At();if(N)return A(`❌ สร้างวิดีโอล้มเหลว: ${N}`),null}document.hidden&&$>0&&Date.now()-O>1e4&&await xe(),document.hidden&&$<1&&Date.now()-b>3e4&&await xe(),await g(3e3)}await tt();let L=null;for(let q=1;q<=10&&(L=nt(),!L);q++)n(`⏳ รอการ์ดวิดีโอ... (ครั้งที่ ${q}/10)`),q%3===0&&await tt(),await g(3e3);if(!L)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิกหลังลอง 10 ครั้ง (30 วิ)"),T("vid-wait","error"),null;const G=L;D?(T("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const z=G.getBoundingClientRect();let W=z.left+z.width/2,H=z.top+z.height/2,Z=G;const pe=G.querySelector("video, img, canvas");if(pe){const q=pe.getBoundingClientRect();q.width>50&&q.height>50&&(W=q.left+q.width/2,H=q.top+q.height/2,Z=pe,n(`🎯 พบรูปย่อ <${pe.tagName.toLowerCase()}> ในการ์ดที่ (${W.toFixed(0)},${H.toFixed(0)}) ${q.width.toFixed(0)}x${q.height.toFixed(0)}`))}else H=z.top+z.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${W.toFixed(0)},${H.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${W.toFixed(0)}, ${H.toFixed(0)})...`),nn(Z);for(let q=0;q<8;q++){const N={bubbles:!0,cancelable:!0,clientX:W+q%2,clientY:H};Z.dispatchEvent(new PointerEvent("pointermove",{...N,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Z.dispatchEvent(new MouseEvent("mousemove",N)),await g(500)}try{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"mute_video",sceneCount:d,scenePrompts:k,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${d} ฉาก, ${k.length} prompts, theme: ${t.theme})`)}catch(q){n(`⚠️ ไม่สามารถบันทึก pending action: ${q.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await R(Z),n("✅ คลิกการ์ดวิดีโอเสร็จ"),G},R=async C=>{const v=C.getBoundingClientRect(),h=v.left+v.width/2,b=v.top+v.height/2,$={bubbles:!0,cancelable:!0,clientX:h,clientY:b,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",$)),await g(80),C.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",$)),C.dispatchEvent(new MouseEvent("click",$)),await g(50),C.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await P())A("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),T("vid-wait","error");else{l.push("✅ Video Complete"),T("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const v=await new Promise(h=>{chrome.storage.local.get(de(),b=>{if(chrome.runtime.lastError){h(null);return}h((b==null?void 0:b[de()])||null)})});v&&!v._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(de()),v.action==="mute_video"?await Ot(v.sceneCount||1,v.scenePrompts||[],v.theme):v.action==="wait_scene_gen_and_download"&&await Ft(v.sceneCount||2,v.currentScene||2,v.theme,v.scenePrompts||[]))}}catch(C){A(`ขั้น 6 ผิดพลาด: ${C.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${C.message}`)}}const V=p.length===0;try{Be(V?5e3:8e3)}catch(d){console.warn("Overlay complete error:",d)}return{success:V,message:V?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:V?"done":"partial"}}async function Ot(t,e=[],r){var V;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Ue(r)}catch{}try{Ye(t)}catch(I){n(`⚠️ showOverlay error: ${I.message}`)}try{const I=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const _ of I)T(_,"done");t>=2&&T("scene2-prompt","active"),n(`✅ overlay restored: ${I.length} steps done, sceneCount=${t}`)}catch(I){n(`⚠️ overlay restore error: ${I.message}`)}await g(1500);const s=(()=>{for(const I of document.querySelectorAll("button")){const _=I.querySelectorAll("i");for(const y of _){const d=(y.textContent||"").trim();if(d==="volume_up"||d==="volume_off"||d==="volume_mute"){const k=I.getBoundingClientRect();if(k.width>0&&k.height>0)return I}}const U=(I.getAttribute("aria-label")||"").toLowerCase();if(U.includes("mute")||U.includes("ปิดเสียง")){const y=I.getBoundingClientRect();if(y.width>0&&y.height>0)return I}}return null})();s?(s.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let h=2;h<=t;h++){const b=e[h-1];if(!b){A(`ไม่พบ prompt สำหรับฉากที่ ${h}`);continue}n(`── ฉากที่ ${h}/${t}: วาง prompt + generate ──`);let $=null;const O=Date.now();for(;!$&&Date.now()-O<1e4;){const N=document.querySelectorAll("[data-slate-editor='true']");if(N.length>0&&($=N[N.length-1]),!$){const Q=document.querySelectorAll("[role='textbox'][contenteditable='true']");Q.length>0&&($=Q[Q.length-1])}$||await g(1e3)}if(!$){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${$.tagName.toLowerCase()}> ${$.className.substring(0,40)}`),await Ge($,b),n(`วาง prompt ฉาก ${h} (${b.length} ตัวอักษร) ✅`);try{T(`scene${h}-prompt`,"done"),T(`scene${h}-gen`,"active")}catch{}await g(1e3);const D=$.getBoundingClientRect();let L=null,G=1/0;for(const N of document.querySelectorAll("button")){if(N.disabled)continue;const Q=N.querySelectorAll("i");let te=!1;for(const le of Q)if((le.textContent||"").trim()==="arrow_forward"){te=!0;break}if(!te)continue;const se=N.getBoundingClientRect();if(se.width<=0||se.height<=0)continue;const ye=Math.abs(se.top-D.top)+Math.abs(se.right-D.right);ye<G&&(G=ye,L=N)}if(!L)for(const N of document.querySelectorAll("button")){const Q=N.querySelectorAll("i");for(const te of Q)if((te.textContent||"").trim()==="arrow_forward"){const se=N.getBoundingClientRect();if(se.width>0&&se.height>0){L=N;break}}if(L)break}if(!L){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(N=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:h,scenePrompts:e}},()=>N())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${h}/${t})`),await ne(L),n(`คลิก Generate ฉาก ${h} ✅`);try{T(`scene${h}-gen`,"done"),T(`scene${h}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${h} gen เสร็จ ──`),await g(5e3);let z=0,W=0;const H=Date.now(),Z=6e5,pe=5e3;let q=!1;for(;Date.now()-H<Z;){let N=null;const Q=document.querySelectorAll("div, span, p, label, strong, small");for(const te of Q){if(te.closest("#netflow-engine-overlay"))continue;const ye=(te.textContent||"").trim().match(/^(\d{1,3})%$/);if(ye){const le=te.getBoundingClientRect();if(le.width>0&&le.height>0&&le.width<120&&le.height<60){N=parseInt(ye[1],10);break}}}if(N!==null){if(N!==z){n(`🎬 ฉาก ${h} ความคืบหน้า: ${N}%`),z=N;try{T(`scene${h}-wait`,"active",N)}catch{}}W=0}else if(z>0){if(W===0)W=Date.now(),n(`🔍 ฉาก ${h}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-W>=pe){n(`✅ ฉาก ${h}: % หายไป ${pe/1e3} วินาที — เจนเสร็จ!`),q=!0;break}}if(we()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&z>0&&W===0&&await xe(),await g(2e3)}q||A(`ฉาก ${h} หมดเวลา`),n(`✅ ฉาก ${h} เสร็จแล้ว`);try{T(`scene${h}-wait`,"done",100)}catch{}chrome.storage.local.remove(de()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{T("download","active")}catch{}let I=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(h=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>h())),I=!0,await g(5e3)}catch{}}await g(2e3);const _=Date.now();let U=null;const y=Date.now();for(;!U&&Date.now()-y<1e4;){for(const h of document.querySelectorAll("button")){const b=h.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const $=h.getBoundingClientRect();if($.width>0&&$.height>0){U=h;break}}}U||await g(1e3)}if(!U){if(A("ไม่พบปุ่มดาวน์โหลด"),I)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await ne(U),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await g(1500);let d=null;for(let h=0;h<3&&!d;h++){h>0&&n(`🔄 ลองหา 720p ครั้งที่ ${h+1}...`);let b=null;const $=Date.now();for(;!b&&Date.now()-$<5e3;){for(const z of document.querySelectorAll("[role='menuitem']"))if((z.textContent||"").trim().includes("Full Video")&&z.querySelector("i")){const H=z.getBoundingClientRect();if(H.width>0&&H.height>0){b=z;break}}b||await g(500)}if(!b){A("ไม่พบ Full Video");continue}const O=b.getBoundingClientRect(),D=O.left+O.width/2,L=O.top+O.height/2;b.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:D,clientY:L})),b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:D,clientY:L})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:D,clientY:L})),await ne(b),n("คลิก/hover Full Video ✅"),await g(2e3);const G=Date.now();for(;!d&&Date.now()-G<8e3;){for(const z of document.querySelectorAll("button[role='menuitem']")){const W=z.querySelectorAll("span");for(const H of W)if((H.textContent||"").trim()==="720p"){const Z=z.getBoundingClientRect();if(Z.width>0&&Z.height>0){d=z;break}}if(d)break}d||(b.isConnected&&(b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:D,clientY:L})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:D+20,clientY:L}))),await g(500))}}if(!d){if(A("ไม่พบ 720p"),I)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await ne(d),n("คลิก 720p ✅"),I){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const k=Date.now();let B=!1,P=!1;for(;Date.now()-k<3e5;){for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(h.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),B=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&(P||(P=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(B)break;if(P){let h=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){h=!0;break}if(!h){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),B=!0;break}}if(we()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await g(2e3)}if(!B){A("เตรียมไฟล์หมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let R=!1;const C=Date.now();for(;Date.now()-C<6e4&&!R;){try{await new Promise(h=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:_},b=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),R=!0,b.downloadUrl&&(i=b.downloadUrl,n(`[TikTok] จะใช้ download URL: ${b.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-C)/1e3)}s)`),h()})})}catch(h){A(`ตรวจสอบผิดพลาด: ${h.message}`)}R||await g(3e3)}R||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const v=await Ke();i||(i=v);try{T("open","done"),Be(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Qe(i),je(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const f=(I,_="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const U of document.querySelectorAll(_)){const y=(U.textContent||"").trim();if(y.includes(I)&&y.length<100){const d=U.getBoundingClientRect();if(d.width>0&&d.height>0&&d.top>=0)return U}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const a=Date.now();for(;!c&&Date.now()-a<1e4;){for(const I of document.querySelectorAll("button, [role='button']")){const _=(I.textContent||"").trim(),U=_.toLowerCase();if((U.includes("download")||U.includes("ดาวน์โหลด"))&&_.length<80){const y=I.getBoundingClientRect();if(y.width>0&&y.height>0){c=I;break}}}if(!c)for(const I of document.querySelectorAll("button")){const _=(I.getAttribute("aria-label")||"").toLowerCase();if(_.includes("download")||_.includes("ดาวน์")){const U=I.getBoundingClientRect();if(U.width>0&&U.height>0){c=I;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!c){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await ne(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const l=Date.now();let p=null;const E=Date.now();for(;!p&&Date.now()-E<5e3;)p=f("1080p"),p||(n("รอ 1080p..."),await g(500));if(!p){A("ไม่พบ 1080p");return}await ne(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const w=Date.now();let S=!1,F=!1,M=0;const m=3e3;for(;Date.now()-w<3e5;){const _=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(_.includes("upscaling complete")||_.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const y of document.querySelectorAll("div, span, p")){const d=(y.textContent||"").trim().toLowerCase();if(d.length<60&&(d.includes("upscaling complete")||d.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(V=y.textContent)==null?void 0:V.trim()}")`),S=!0;break}}if(S)break;if(_.includes("upscaling your video")||_.includes("กำลังอัปสเกล")){F=!0,M=0;const y=Math.floor((Date.now()-w)/1e3);n(`⏳ กำลังอัปสเกล... (${y} วินาที)`)}else if(F){if(M===0)M=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-M>=m){n(`✅ ข้อความ Upscaling หายไป ${m/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const y=Math.floor((Date.now()-w)/1e3);y%10<3&&n(`⏳ รอ Upscale... (${y} วินาที)`)}if(we()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!S){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let o=!1;const u=Date.now();for(;Date.now()-u<6e4&&!o;){try{await new Promise(I=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:l},_=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):_!=null&&_.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${_.message}`),o=!0,_.downloadUrl&&(i=_.downloadUrl,n(`[TikTok] จะใช้ download URL: ${_.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-u)/1e3)}s)`),I()})})}catch(I){A(`ตรวจสอบผิดพลาด: ${I.message}`)}o||await g(3e3)}o||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const x=await Ke();i||(i=x),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Qe(i),je(2e3)}async function Ft(t=2,e=2,r,s=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Ue(r)}catch{}try{Ye(t)}catch(y){n(`⚠️ showOverlay error: ${y.message}`)}try{const y=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let d=2;d<=e;d++)y.push(`scene${d}-prompt`,`scene${d}-gen`),d<e&&y.push(`scene${d}-wait`);for(const d of y)T(d,"done");T(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${y.length} steps done (scene ${e}/${t} navigate)`)}catch(y){n(`⚠️ overlay restore error: ${y.message}`)}await g(2e3);const i=(()=>{for(const y of document.querySelectorAll("button")){const d=y.querySelectorAll("i");for(const k of d){const B=(k.textContent||"").trim();if(B==="volume_up"||B==="volume_off"||B==="volume_mute"){const P=y.getBoundingClientRect();if(P.width>0&&P.height>0)return y}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let f=0,c=0;const a=Date.now(),l=6e5,p=5e3;let E=!1,w=0;for(;Date.now()-a<l;){let y=null;const d=document.querySelectorAll("div, span, p, label, strong, small");for(const k of d){if(k.closest("#netflow-engine-overlay"))continue;const P=(k.textContent||"").trim().match(/^(\d{1,3})%$/);if(P){const R=k.getBoundingClientRect();if(R.width>0&&R.height>0&&R.width<120&&R.height<60){y=parseInt(P[1],10);break}}}if(y!==null){if(w=0,y!==f){n(`🎬 scene ${e} ความคืบหน้า: ${y}%`),f=y;try{T(`scene${e}-wait`,"active",y)}catch{}}c=0}else if(f>0){if(c===0)c=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${f}%) — กำลังยืนยัน...`);else if(Date.now()-c>=p){n(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),E=!0;break}}else if(w++,w>=15){const k=document.querySelectorAll("video");let B=!1;for(const P of k)if(P.readyState>=2&&!P.paused&&P.getBoundingClientRect().width>200){B=!0;break}if(B){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),E=!0;break}if(w>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),E=!0;break}}document.hidden&&f>0&&c===0&&await xe(),await g(2e3)}E||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{T(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&s.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let y=e+1;y<=t;y++){const d=s[y-1];if(!d){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${y} — ข้าม`);continue}n(`── ฉากที่ ${y}/${t}: วาง prompt + generate (pending recovery) ──`);let k=null;const B=Date.now();for(;!k&&Date.now()-B<1e4;){const D=document.querySelectorAll("[data-slate-editor='true']");if(D.length>0&&(k=D[D.length-1]),!k){const L=document.querySelectorAll("[role='textbox'][contenteditable='true']");L.length>0&&(k=L[L.length-1])}k||await g(1e3)}if(!k){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${y}`);break}await Ge(k,d),n(`วาง prompt ฉาก ${y} (${d.length} ตัวอักษร) ✅`);try{T(`scene${y}-prompt`,"done"),T(`scene${y}-gen`,"active")}catch{}await g(1e3);const P=k.getBoundingClientRect();let R=null,C=1/0;for(const D of document.querySelectorAll("button")){if(D.disabled)continue;const L=D.querySelectorAll("i");let G=!1;for(const H of L)if((H.textContent||"").trim()==="arrow_forward"){G=!0;break}if(!G)continue;const z=D.getBoundingClientRect();if(z.width<=0||z.height<=0)continue;const W=Math.abs(z.top-P.top)+Math.abs(z.right-P.right);W<C&&(C=W,R=D)}if(!R)for(const D of document.querySelectorAll("button")){const L=D.querySelectorAll("i");for(const G of L)if((G.textContent||"").trim()==="arrow_forward"){const z=D.getBoundingClientRect();if(z.width>0&&z.height>0){R=D;break}}if(R)break}if(!R){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${y}`);break}await new Promise(D=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:y,scenePrompts:s}},()=>D())}),await ne(R),n(`คลิก Generate ฉาก ${y} ✅`);try{T(`scene${y}-gen`,"done"),T(`scene${y}-wait`,"active")}catch{}await g(5e3);let v=0,h=0;const b=Date.now();let $=!1,O=0;for(;Date.now()-b<6e5;){let D=null;const L=document.querySelectorAll("div, span, p, label, strong, small");for(const G of L){if(G.closest("#netflow-engine-overlay"))continue;const W=(G.textContent||"").trim().match(/^(\d{1,3})%$/);if(W){const H=G.getBoundingClientRect();if(H.width>0&&H.height>0&&H.width<120&&H.height<60){D=parseInt(W[1],10);break}}}if(D!==null){if(O=0,D!==v){n(`🎬 ฉาก ${y} ความคืบหน้า: ${D}%`),v=D;try{T(`scene${y}-wait`,"active",D)}catch{}}h=0}else if(v>0){if(h===0)h=Date.now();else if(Date.now()-h>=5e3){n(`✅ ฉาก ${y}: เจนเสร็จ!`),$=!0;break}}else if(O++,O>=15){const G=document.querySelectorAll("video");let z=!1;for(const W of G)if(W.readyState>=2&&!W.paused&&W.getBoundingClientRect().width>200){z=!0;break}if(z){n(`✅ ฉาก ${y}: พบวิดีโอเล่นอยู่ — เสร็จ`),$=!0;break}if(O>=30){n(`✅ ฉาก ${y}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),$=!0;break}}document.hidden&&v>0&&h===0&&await xe(),await g(2e3)}$||n(`⚠️ ฉาก ${y} หมดเวลา`);try{T(`scene${y}-wait`,"done",100)}catch{}n(`✅ ฉาก ${y} เสร็จแล้ว`),chrome.storage.local.remove(de()),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);let S=null;try{T("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const F=Date.now();let M=null;const m=Date.now();for(;!M&&Date.now()-m<1e4;){for(const y of document.querySelectorAll("button")){const d=y.querySelector("i");if(d&&(d.textContent||"").trim()==="download"){const k=y.getBoundingClientRect();if(k.width>0&&k.height>0){M=y;break}}}M||await g(1e3)}if(!M){A("ไม่พบปุ่มดาวน์โหลด");return}await ne(M),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await g(1500);let o=null;for(let y=0;y<3&&!o;y++){y>0&&n(`🔄 ลองหา 720p ครั้งที่ ${y+1}...`);let d=null;const k=Date.now();for(;!d&&Date.now()-k<5e3;){for(const v of document.querySelectorAll("[role='menuitem']"))if((v.textContent||"").trim().includes("Full Video")&&v.querySelector("i")){const b=v.getBoundingClientRect();if(b.width>0&&b.height>0){d=v;break}}d||await g(500)}if(!d){A("ไม่พบ Full Video");continue}const B=d.getBoundingClientRect(),P=B.left+B.width/2,R=B.top+B.height/2;d.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:P,clientY:R})),d.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:P,clientY:R})),d.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:P,clientY:R})),await ne(d),n("คลิก/hover Full Video ✅"),await g(2e3);const C=Date.now();for(;!o&&Date.now()-C<8e3;){for(const v of document.querySelectorAll("button[role='menuitem']")){const h=v.querySelectorAll("span");for(const b of h)if((b.textContent||"").trim()==="720p"){const $=v.getBoundingClientRect();if($.width>0&&$.height>0){o=v;break}}if(o)break}o||(d.isConnected&&(d.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:P,clientY:R})),d.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:P+20,clientY:R}))),await g(500))}}if(!o){A("ไม่พบ 720p");return}await ne(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const u=Date.now();let x=!1,V=!1;for(;Date.now()-u<3e5;){for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div")){const d=(y.textContent||"").trim();if(d==="Download complete!"||d==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),x=!0;break}(d.includes("Downloading your extended video")||d.includes("กำลังดาวน์โหลด"))&&(V||(V=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(x)break;if(V){let y=!1;for(const d of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((d.textContent||"").trim().includes("Downloading")){y=!0;break}if(!y){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),x=!0;break}}await g(2e3)}if(!x){A("เตรียมไฟล์หมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let I=!1;const _=Date.now();for(;Date.now()-_<6e4&&!I;){try{await new Promise(y=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:F},d=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):d!=null&&d.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${d.message}`),I=!0,d.downloadUrl&&(S=d.downloadUrl,n(`[TikTok] จะใช้ download URL: ${d.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-_)/1e3)}s)`),y()})})}catch(y){A(`ตรวจสอบผิดพลาด: ${y.message}`)}I||await g(3e3)}I||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const U=await Ke();S||(S=U);try{T("open","done"),Be(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Qe(S),je(2e3)}async function gn(){try{await Zt;const t=de();let e=await new Promise(c=>{chrome.storage.local.get(t,a=>{if(chrome.runtime.lastError){c(null);return}c((a==null?void 0:a[t])||null)})});if(!e&&ke){const c="netflow_pending_action";e=await new Promise(a=>{chrome.storage.local.get(c,l=>{if(chrome.runtime.lastError){a(null);return}a((l==null?void 0:l[c])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(c))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const s=Date.now()-e.timestamp;if(s>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(c=>{chrome.storage.local.set({[t]:e},()=>c())}),await g(300),!await new Promise(c=>{chrome.storage.local.get(t,a=>{const l=a==null?void 0:a[t];c((l==null?void 0:l._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(s/1e3)} วินาที)`),e.action==="mute_video"?await Ot(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ft(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),un(t).then(s=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${s.message}`),St()}).catch(s=>{if(s instanceof et||(s==null?void 0:s.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ve("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Tt()}catch{}}else console.error("[Netflow AI] Generate error:",s);St()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const s=an();if(!s){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=s.getBoundingClientRect(),f=i.left+i.width/2,c=i.top+i.height/2;n(`การ์ดรูปที่ (${f.toFixed(0)}, ${c.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let a=0;a<2;a++){const l=document.elementFromPoint(f,c);l?(await ne(l),n(`คลิก ${a+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await ne(s),n(`คลิก ${a+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),gn()})();
