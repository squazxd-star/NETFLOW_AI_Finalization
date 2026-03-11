(function(){"use strict";const fe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Q=fe.green,Se=null;function Ue(t){t&&fe[t]&&(Se=t,Q=fe[t],nt(),requestAnimationFrame(()=>kt()))}function Ot(){if(Se&&fe[Se])return fe[Se];try{const t=localStorage.getItem("netflow_app_theme");if(t&&fe[t])return fe[t]}catch{}return fe.green}let ne=0,oe=255,ie=65;function nt(){const t=Q.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(ne=parseInt(t[1],16),oe=parseInt(t[2],16),ie=parseInt(t[3],16))}const ot='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',it='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let W=null,K=null,ue=null,at=0,Fe=null,Pe=null,Oe=null,He=0,me=!1,ce=null,_e=null,Ie=null,xe=1,X=[];function ze(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const se=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];X=ze(1);function zt(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,i=t.hex,u=t.accentHex,c=t.doneHex,l=(()=>{const h=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=f=>Math.min(255,f+80);return`#${[1,2,3].map(f=>o(parseInt(h[f],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const h=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=f=>Math.min(255,f+60);return`#${[1,2,3].map(f=>o(parseInt(h[f],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),v=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,x=p?parseInt(p[1],16)/v:0,T=p?parseInt(p[2],16)/v:1,F=p?parseInt(p[3],16)/v:.25,C=h=>`${Math.round(x*h)}, ${Math.round(T*h)}, ${Math.round(F*h)}`;return`
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
    color: ${l};
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
    color: ${l};
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
    background: linear-gradient(180deg, rgba(${C(6)},0.75) 0%, rgba(${C(3)},0.92) 100%);
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
    background: ${c};
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
    background: linear-gradient(90deg, ${i}, ${l});
    border-radius: 2px;
    transition: width 0.5s ease;
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${c}, ${s});
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
    background: linear-gradient(90deg, ${i}, ${u});
    border-radius: 2px;
    transition: width 0.6s ease;
    width: 0%;
    box-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-module.nf-done .nf-mod-progress-fill {
    background: linear-gradient(90deg, ${c}, ${s});
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
    color: ${l};
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
    background: ${c};
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

    `}function rt(){ue||(ue=document.createElement("style"),ue.id="netflow-overlay-styles",ue.textContent=zt(Q),document.head.appendChild(ue))}function st(t){t.innerHTML="",X.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function lt(){const t=document.getElementById("nf-terminal");if(!t)return;st(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${X.length}`)}function ct(t,e){let l="";for(let T=0;T<20;T++){const F=T/20*Math.PI*2,C=(T+.2)/20*Math.PI*2,h=(T+.5)/20*Math.PI*2,o=(T+.8)/20*Math.PI*2,f=(T+1)/20*Math.PI*2;l+=`${T===0?"M":"L"}${(120+100*Math.cos(F)).toFixed(1)},${(120+100*Math.sin(F)).toFixed(1)} `,l+=`L${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `,l+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,l+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,l+=`L${(120+100*Math.cos(f)).toFixed(1)},${(120+100*Math.sin(f)).toFixed(1)} `}l+="Z";const s=14,p=72,v=62;let x="";for(let T=0;T<s;T++){const F=T/s*Math.PI*2,C=(T+.25)/s*Math.PI*2,h=(T+.75)/s*Math.PI*2,o=(T+1)/s*Math.PI*2;x+=`${T===0?"M":"L"}${(120+v*Math.cos(F)).toFixed(1)},${(120+v*Math.sin(F)).toFixed(1)} `,x+=`L${(120+p*Math.cos(C)).toFixed(1)},${(120+p*Math.sin(C)).toFixed(1)} `,x+=`L${(120+p*Math.cos(h)).toFixed(1)},${(120+p*Math.sin(h)).toFixed(1)} `,x+=`L${(120+v*Math.cos(o)).toFixed(1)},${(120+v*Math.sin(o)).toFixed(1)} `}return x+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${x}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${v}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Nt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ce=document.createElement("canvas"),ce.id="nf-matrix-canvas",t.appendChild(ce);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let g=1;g<=5;g++){const b=document.createElement("div");b.className=`nf-ambient-orb nf-orb-${g}`,t.appendChild(b)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const u=document.createElement("div");u.className="nf-pat-circuit",t.appendChild(u);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const l=document.createElement("div");l.className="nf-pat-binary",t.appendChild(l);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const v=document.createElement("div");v.className="nf-pat-wave-h",t.appendChild(v);const x=document.createElement("div");x.className="nf-pat-radar",t.appendChild(x);const T=document.createElement("div");T.className="nf-pat-ripple-1",t.appendChild(T);const F=document.createElement("div");F.className="nf-pat-ripple-2",t.appendChild(F);const C=document.createElement("div");C.className="nf-pat-techscan",t.appendChild(C);const h=document.createElement("div");h.className="nf-center-glow",t.appendChild(h);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const f=document.createElement("div");f.className="nf-crt-scanlines",t.appendChild(f);const y=document.createElement("div");y.className="nf-vignette",t.appendChild(y);for(let g=0;g<3;g++){const b=document.createElement("div");b.className="nf-pulse-ring",t.appendChild(b)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(g=>{const b=document.createElement("div");b.className=`nf-corner-deco ${g}`,t.appendChild(b)});const N=document.createElement("button");N.className="nf-stop-btn",N.innerHTML='<span class="nf-stop-icon"></span> หยุด',N.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",N.onclick=()=>{var g;window.__NETFLOW_STOP__=!0;try{qe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((g=chrome.runtime)!=null&&g.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(N);const S=document.createElement("div");S.className="nf-layout";const I=document.createElement("div");I.className="nf-core-monitor",I.id="nf-core-monitor";const H=document.createElement("div");H.className="nf-core-header",H.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,I.appendChild(H);const d=document.createElement("div");d.className="nf-terminal",d.id="nf-terminal",st(d),I.appendChild(d);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const M=document.createElement("div");M.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(g=>{const b=document.createElement("div");b.className=`nf-frame-corner ${g}`,M.appendChild(b)}),w.appendChild(M);const A="http://www.w3.org/2000/svg",R=document.createElementNS(A,"svg");R.setAttribute("class","nf-engine-waves"),R.setAttribute("viewBox","0 0 560 140"),R.setAttribute("preserveAspectRatio","none"),R.id="nf-engine-waves";for(let g=0;g<4;g++){const b=document.createElementNS(A,"path");b.setAttribute("fill","none"),b.setAttribute("stroke-width",g<2?"1.5":"1"),b.setAttribute("stroke",g<2?`rgba(${Q.rgb},${.14+g*.1})`:`rgba(${Q.accentRgb},${.1+(g-2)*.08})`),b.setAttribute("data-wave-idx",String(g)),R.appendChild(b)}w.appendChild(R);const $=document.createElement("div");$.className="nf-engine-brand-inner",$.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${ct(Q.rgb,Q.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${ct(Q.rgb,Q.accentRgb)}
        </div>
    `,w.appendChild($);const E=document.createElement("div");E.className="nf-engine-stats",E.id="nf-engine-stats",E.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([g,b,P])=>`<div class="nf-stat-item"><span class="nf-stat-label">${g}</span><span class="nf-stat-val" id="${b}">${P}</span></div>`).join(""),w.appendChild(E),I.appendChild(w),S.appendChild(I);const B=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];se.forEach((g,b)=>{const P=Lt(g);P.classList.add(B[b]),P.id=`nf-mod-${g.id}`,S.appendChild(P)}),t.appendChild(S);for(let g=0;g<30;g++){const b=document.createElement("div");b.className="nf-particle",b.style.left=`${5+Math.random()*90}%`,b.style.bottom=`${Math.random()*40}%`,b.style.animationDuration=`${3+Math.random()*5}s`,b.style.animationDelay=`${Math.random()*4}s`;const P=.3+Math.random()*.4,U=.7+Math.random()*.3;b.style.background=`rgba(${Math.floor(ne*U)}, ${Math.floor(oe*U)}, ${Math.floor(ie*U)}, ${P})`,b.style.width=`${1+Math.random()*2}px`,b.style.height=b.style.width,t.appendChild(b)}return t}function Lt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(i=>{const u=document.createElement("div");u.className="nf-step",u.id=`nf-step-${i.id}`;let c="";i.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),u.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${c}
        `,e.appendChild(u)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Vt(){at=Date.now(),Fe=setInterval(()=>{const t=Math.floor((Date.now()-at)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function dt(){Fe&&(clearInterval(Fe),Fe=null)}const qt=120,pt=160,ft=.4;let ye=null,ut=0,gt=0,mt=0,Ae=[];function Gt(t,e){Ae=[];for(let r=0;r<qt;r++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const u=Math.random()*t,c=Math.random()*e,l=50+Math.random()*220,s=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Ae.push({x:i===0?Math.random()*t:u+Math.cos(s)*l,y:i===0?Math.random()*e:c+Math.sin(s)*l,vx:(Math.random()-.5)*ft,vy:(Math.random()-.5)*ft,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:u,oCy:c,oRadius:l,oAngle:s,oSpeed:p})}}function Ut(){if(!ce)return;const t=ce;if(_e=t.getContext("2d"),!_e)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Ae.length===0&&Gt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,i=0,u=!1;function c(){if(!_e||!ce){Ie=null;return}if(Ie=requestAnimationFrame(c),u=!u,u)return;const l=_e,s=ce.width,p=ce.height;l.fillStyle=`rgba(${ne*.04|0},${oe*.04|0},${ie*.06|0},1)`,l.fillRect(0,0,s,p),(!r||a!==s||i!==p)&&(a=s,i=p,r=l.createRadialGradient(s*.5,p*.5,0,s*.5,p*.5,Math.max(s,p)*.6),r.addColorStop(0,`rgba(${ne*.08|0},${oe*.08|0},${ie*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),l.fillStyle=r,l.fillRect(0,0,s,p);const v=Ae,x=v.length,T=pt*pt;for(let h=0;h<x;h++){const o=v[h];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>s&&(o.x=s,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>p&&(o.y=p,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const f=o.oAngle,y=o.oRadius*.7;o.x=o.oCx+y*Math.cos(f),o.y=o.oCy+y*Math.sin(f)*Math.cos(f),o.oCx+=Math.sin(f*.15)*.12,o.oCy+=Math.cos(f*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const f=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*f,o.y=o.oCy+Math.sin(o.oAngle)*f,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=s+30:o.x>s+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const f=o.oRadius+50;o.oCx<-f?o.oCx=s+f:o.oCx>s+f&&(o.oCx=-f),o.oCy<-f?o.oCy=p+f:o.oCy>p+f&&(o.oCy=-f)}}l.beginPath(),l.strokeStyle=`rgba(${ne},${oe},${ie},0.06)`,l.lineWidth=.4;const F=new Path2D;for(let h=0;h<x;h++){const o=v[h];for(let f=h+1;f<x;f++){const y=v[f],N=o.x-y.x,S=o.y-y.y,I=N*N+S*S;I<T&&(1-I/T<.4?(l.moveTo(o.x,o.y),l.lineTo(y.x,y.y)):(F.moveTo(o.x,o.y),F.lineTo(y.x,y.y)))}}if(l.stroke(),l.strokeStyle=`rgba(${ne},${oe},${ie},0.18)`,l.lineWidth=.8,l.stroke(F),!ye||ut!==ne||gt!==oe||mt!==ie){ye=document.createElement("canvas");const h=48;ye.width=h,ye.height=h;const o=ye.getContext("2d"),f=o.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);f.addColorStop(0,`rgba(${ne},${oe},${ie},0.9)`),f.addColorStop(.3,`rgba(${ne},${oe},${ie},0.35)`),f.addColorStop(1,`rgba(${ne},${oe},${ie},0)`),o.fillStyle=f,o.fillRect(0,0,h,h),ut=ne,gt=oe,mt=ie}const C=ye;for(let h=0;h<x;h++){const o=v[h],f=.6+.4*Math.sin(o.pulsePhase),y=o.radius*5*(.8+f*.4);l.globalAlpha=.5+f*.4,l.drawImage(C,o.x-y/2,o.y-y/2,y,y)}l.globalAlpha=1,l.fillStyle="rgba(255,255,255,0.45)",l.beginPath();for(let h=0;h<x;h++){const o=v[h];if(o.radius>2){const f=.6+.4*Math.sin(o.pulsePhase),y=o.radius*(.8+f*.4)*.35;l.moveTo(o.x+y,o.y),l.arc(o.x,o.y,y,0,Math.PI*2)}}l.fill()}c()}function Ht(){Ie!==null&&(cancelAnimationFrame(Ie),Ie=null),ce=null,_e=null,Ae=[]}let Be=null;const Ne=560,Wt=140,ht=Ne/2,bt=Wt/2,wt=[];for(let t=0;t<=Ne;t+=8){const e=Math.abs(t-ht)/ht;wt.push(Math.pow(Math.min(1,e*1.6),.6))}const Yt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ne,off:t*.6,spd:.7+t*.12}));let We=!1;function xt(){if(Pe=requestAnimationFrame(xt),We=!We,We)return;if(He+=.07,!Be){const e=document.getElementById("nf-engine-waves");if(!e){Pe=null;return}Be=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Be.length;e++){const r=Yt[e],a=He*r.spd+r.off;t.length=0,t.push(`M 0 ${bt}`);let i=0;for(let u=0;u<=Ne;u+=8){const c=bt+r.amp*wt[i++]*Math.sin(u*r.freq+a);t.push(`L${u} ${c*10+.5|0}`)}Be[e].setAttribute("d",t.join(" "))}}function Xt(){He=0,xt(),Ut(),Oe=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function yt(){Pe!==null&&(cancelAnimationFrame(Pe),Pe=null),Oe&&(clearInterval(Oe),Oe=null),Be=null,Ht()}function Le(){let t=0;const e=X.filter(p=>p.status!=="skipped").length;for(const p of X){const v=document.getElementById(`nf-proc-${p.stepId}`);if(!v)continue;v.className="nf-proc-row";const x=v.querySelector(".nf-proc-badge");switch(p.status){case"done":v.classList.add("nf-proc-done"),x&&(x.textContent="✅ done"),t++;break;case"active":v.classList.add("nf-proc-active"),x&&(x.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":v.classList.add("nf-proc-error"),x&&(x.textContent="❌ error");break;case"skipped":v.classList.add("nf-proc-skipped"),x&&(x.textContent="— skip");break;default:v.classList.add("nf-proc-waiting"),x&&(x.textContent="(queued)")}}const r=X.findIndex(p=>p.status==="active"),a=r>=0?r+1:t>=e&&e>0?X.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${X.length}`);const u=document.querySelector(".nf-core-title-val"),c=document.querySelector(".nf-status-dot");t>=e&&e>0?(u&&(u.textContent="COMPLETE",u.style.color=Q.doneHex),c&&(c.style.background=Q.doneHex,c.style.boxShadow=`0 0 8px rgba(${Q.doneRgb},0.7)`)):X.some(v=>v.status==="error")?(u&&(u.textContent="ERROR",u.style.color="#f87171"),c&&(c.style.background="#ef4444",c.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(v=>v.status==="active")&&u&&(u.textContent="ACTIVE",u.style.color=Q.hex,u.style.textShadow=`0 0 10px rgba(${Q.rgb},0.5)`);const l=document.getElementById("nf-terminal"),s=l==null?void 0:l.querySelector(".nf-proc-active");s&&l&&s.scrollIntoView({behavior:"smooth",block:"center"})}function vt(){K&&K.isConnected||(rt(),K=document.createElement("button"),K.id="nf-toggle-btn",K.className="nf-toggle-visible",K.innerHTML=me?ot:it,K.title="ซ่อน/แสดง Netflow Overlay",K.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",K.onclick=()=>$t(),document.body.appendChild(K))}function $t(){W&&(vt(),me?(W.classList.remove("nf-hidden"),W.classList.add("nf-visible"),W.style.opacity="1",W.style.pointerEvents="auto",K&&(K.innerHTML=it),me=!1):(W.classList.remove("nf-visible"),W.classList.add("nf-hidden"),W.style.opacity="0",W.style.pointerEvents="none",K&&(K.innerHTML=ot),me=!0))}const Et={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function kt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Se;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=Et[e]||Et.green;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const i=Q.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Ye(t=1){if(Q=Ot(),nt(),W&&W.isConnected){for(const e of se)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;xe=t,X=ze(t),lt();for(const e of se)Xe(e);Ve(),Le(),me&&$t();return}W&&!W.isConnected&&(W=null),ue&&(ue.remove(),ue=null),rt();for(const e of se)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;if(xe=t,X=ze(t),t>1){const e=se.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const r=se.find(a=>a.id==="render");if(r){const a=r.steps.find(u=>u.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=r.steps.find(u=>u.id==="upscale");i&&(i.label="Full Video")}}W=Nt(),W.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(W),W.classList.add("nf-visible"),me=!1,vt(),Vt(),Xt(),requestAnimationFrame(()=>kt())}function Ct(){dt(),yt(),me=!1,W&&(W.classList.add("nf-fade-out"),setTimeout(()=>{W==null||W.remove(),W=null},500)),K&&(K.remove(),K=null)}const jt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Kt(t,e,r){const a=X.findIndex(x=>x.status==="active"),i=X.filter(x=>x.status==="done").length,u=X.length,c=a>=0?a+1:i>=u?u:i,l=document.getElementById("nf-stat-step");l&&(l.textContent=`${c}/${u}`);let s=1;for(const x of X)if(x.status==="active"||x.status==="done")if(x.stepId.startsWith("scene")){const T=x.stepId.match(/^scene(\d+)-/);T&&(s=Math.max(s,parseInt(T[1],10)))}else(x.stepId==="download"||x.stepId==="upscale"||x.stepId==="open")&&(s=xe);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=xe>1?`${s}/${xe}`:"1/1"),e==="active"){const x=document.getElementById("nf-stat-status"),T=jt[t]||t.toUpperCase();x&&(x.textContent=T)}else if(e==="done"&&i>=u){const x=document.getElementById("nf-stat-status");x&&(x.textContent="COMPLETE")}else if(e==="error"){const x=document.getElementById("nf-stat-status");x&&(x.textContent="ERROR")}const v=document.getElementById("nf-stat-progress");v&&(r!==void 0&&r>0?v.textContent=`${Math.min(100,r)}%`:e==="active"&&(v.textContent="—"))}function k(t,e,r){if(!W)return;for(const i of se)for(const u of i.steps)u.id===t&&(u.status=e,r!==void 0&&(u.progress=r));for(const i of X)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),Kt(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}Ve(),Le()}function ve(t){k(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Re(t=4e3){dt(),yt(),Ve(),Le(),setTimeout(()=>Ct(),t)}function Ve(){for(const t of se){const e=t.steps.filter(s=>s.status!=="skipped").length,r=t.steps.filter(s=>s.status==="done").length,a=t.steps.some(s=>s.status==="active"),i=e>0?Math.round(r/e*100):0,u=document.getElementById(`nf-pct-${t.id}`);u&&(u.textContent=`${i}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${i}%`);const l=document.getElementById(`nf-mod-${t.id}`);l&&(l.classList.remove("nf-active","nf-done"),i>=100?l.classList.add("nf-done"):a&&l.classList.add("nf-active"))}}function Qt(t){var a,i,u,c;xe=t;const e=new Map;for(const l of X)e.set(l.stepId,{status:l.status,progress:l.progress});X=ze(t);for(const l of X){const s=e.get(l.stepId);s&&(l.status=s.status,s.progress!==void 0&&(l.progress=s.progress))}if(lt(),t>1){const l=se.find(s=>s.id==="video");if(l){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=l.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=l.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((u=l.steps.find(p=>p.id==="vid-generate"))==null?void 0:u.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=l.steps.find(p=>p.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)s.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),s.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),s.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});l.steps=s,Xe(l)}}const r=se.find(l=>l.id==="render");if(r&&t>1){const l=r.steps.find(p=>p.id==="download");l&&(l.label="ดาวน์โหลด 720p");const s=r.steps.find(p=>p.id==="upscale");s&&(s.label="Full Video"),Xe(r)}Ve(),Le()}function Xe(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const u=document.createElement("div");u.className="nf-step",u.id=`nf-step-${i.id}`;let c="";i.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),u.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${c}
        `,e.appendChild(u)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function qe(t){t.replace(/^\[Netflow AI\]\s*/,"")}let $e=null,he=null;const Jt=new Promise(t=>{he=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&($e=t.tabId,console.log(`[Netflow AI] Tab ID: ${$e}`)),he&&(he($e),he=null)})}catch{he&&(he(null),he=null)}function de(){return $e?`netflow_pending_action_${$e}`:"netflow_pending_action"}function Tt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{qe(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},_=t=>{console.warn(`[Netflow AI] ${t}`);try{qe(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function je(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?_(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){_(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Ke(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},u=>{if(chrome.runtime.lastError){i(!1);return}i(!!(u!=null&&u.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const u of i){const c=u.src||u.currentSrc||"";if(c)return c}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,a=0;for(const i of e){let u=i.src||"";if(!u){const s=i.querySelector("source");s&&(u=s.getAttribute("src")||"")}if(!u&&i.currentSrc&&(u=i.currentSrc),!u)continue;if(J()){r||(r=u,a=1);continue}const c=i.getBoundingClientRect(),l=c.width*c.height;c.width>50&&l>a&&(a=l,r=u)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(r);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Mt(r),r;const u=await i.blob(),c=(u.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${c} MB, type: ${u.type}`),u.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${u.size} bytes) — อาจเป็น thumbnail`);const l=await new Promise((s,p)=>{const v=new FileReader;v.onloadend=()=>s(v.result),v.onerror=()=>p(new Error("FileReader error")),v.readAsDataURL(u)});n(`[TikTok] Data URL พร้อม: ${(l.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:l},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),s()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Mt(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Mt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function Qe(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Je=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ze=/Win/i.test(navigator.userAgent),ge=Je?"🍎 Mac":Ze?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ge}`),window.__VIDEO_COMPLETE_SENT__=!1;class et extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let De=null,be=null,St=!1;const Ee=new Map;let Pt=0;function Zt(){if(De)return De;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return De=new Worker(URL.createObjectURL(t)),De.onmessage=e=>{const r=Ee.get(e.data);r&&(Ee.delete(e.data),r())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),De}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function en(){if(be)return be;if(St)return null;try{return be=chrome.runtime.connect({name:"timer"}),be.onMessage.addListener(t=>{const e=Ee.get(t.id);e&&(Ee.delete(t.id),e())}),be.onDisconnect.addListener(()=>{be=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),be}catch{return St=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const m=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new et);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return r(new et);e()}},u=Zt();if(u){const s=++Pt;Ee.set(s,i),u.postMessage({id:s,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const c=en();if(c){const s=++Pt;Ee.set(s,i),c.postMessage({cmd:"delay",id:s,ms:t});return}const l=setTimeout(i,t);m._lastId=l});function we(){return!!window.__NETFLOW_STOP__}const J=()=>document.hidden;let _t=0;async function ke(){if(!document.hidden)return!1;const t=Date.now();if(t-_t<15e3)return!1;_t=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await m(1500),!0}catch{return!1}}function It(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const u of t)if(i.includes(u))return((r=a.textContent)==null?void 0:r.trim())||u}}return null}async function te(t){if(J()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await m(50),t.click()}function tn(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function nn(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let u=a,c=null,l=1/0;for(let s=0;s<20&&u&&(u=u.parentElement,!(!u||u===document.body));s++){if(J()){s>=3&&u.children.length>0&&!c&&(c=u);continue}const p=u.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const v=p.width*p.height;v<l&&(c=u,l=v)}}c&&!e.includes(c)&&e.push(c)}return e.sort((a,i)=>{const u=a.getBoundingClientRect(),c=i.getBoundingClientRect();return u.left-c.left}),e}function tt(t=!1){const e=[],r=document.querySelectorAll("video");for(const c of r){let l=c.parentElement;for(let s=0;s<10&&l;s++){if(J()){if(s>=3&&l.children.length>0){e.push({el:l,left:0});break}l=l.parentElement;continue}const p=l.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:l,left:p.left});break}l=l.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of a){const l=(c.textContent||"").trim();if(l==="play_arrow"||l==="play_circle"||l==="videocam"){let s=c.parentElement;for(let p=0;p<10&&s;p++){if(J()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const v=s.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){e.push({el:s,left:v.left});break}s=s.parentElement}}}const i=document.querySelectorAll("img");for(const c of i){const l=(c.alt||"").toLowerCase();if(l.includes("video")||l.includes("วิดีโอ")){let s=c.parentElement;for(let p=0;p<10&&s;p++){if(J()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const v=s.getBoundingClientRect();if(v.width>120&&v.height>80&&v.width<window.innerWidth*.7&&v.top>=-50&&v.left<window.innerWidth*.75){e.push({el:s,left:v.left});break}s=s.parentElement}}}const u=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(l=>l.el===c));if(u.sort((c,l)=>c.left-l.left),u.length>0){const c=u[0].el,l=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${l.left.toFixed(0)},${l.top.toFixed(0)}) ขนาด ${l.width.toFixed(0)}x${l.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function on(){const t=nn("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let i=0;i<10&&a;i++){if(J()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const u=a.getBoundingClientRect();if(u.width>100&&u.height>80&&u.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${u.left.toFixed(0)},${u.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function an(t,e){var l;const[r,a]=t.split(","),i=((l=r.match(/:(.*?);/))==null?void 0:l[1])||"image/png",u=atob(a),c=new Uint8Array(u.length);for(let s=0;s<u.length;s++)c[s]=u.charCodeAt(s);return new File([c],e,{type:i})}function Ge(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((a=i.textContent)==null?void 0:a.trim())===t){const u=i.closest("button");u&&e.push(u)}return e}function rn(){const t=[...Ge("add"),...Ge("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const u=(i.textContent||"").trim();if(u!=="+"&&u!=="add")continue;if(J())return i;const c=i.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width<60&&c.height<60)return i}return null}let e=null,r=0;for(const a of t){const i=a.getBoundingClientRect();i.y>r&&(r=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function At(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Ge(a);let u=null,c=0;for(const l of i){const s=l.getBoundingClientRect();s.y>c&&(c=s.y,u=l)}if(u)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${c.toFixed(0)}`),u}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){if(J())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const u=Math.abs(i.width-i.height)<10&&i.width<60,c=i.y+i.x+(u?1e3:0);c>r&&(r=c,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function Bt(){const t=document.querySelectorAll("textarea");for(const a of t)if(J()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(J()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Ce(t,e){var r,a,i,u;t.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(s),await m(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await m(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const l=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(l),await m(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await m(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const l=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(l),await m(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const l=document.createElement("textarea");l.value=e,l.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(l),l.focus(),l.select(),document.execCommand("copy"),document.body.removeChild(l),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await m(200),document.execCommand("paste"),await m(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(l=>l.startsWith("__reactFiber$")||l.startsWith("__reactInternalInstance$"));if(c){let l=t[c];for(let s=0;s<30&&l;s++){const p=l.memoizedProps,v=l.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const x=p.editor;x.selection,x.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((u=(i=v==null?void 0:v.memoizedState)==null?void 0:i.editor)!=null&&u.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),v.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}l=l.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function sn(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}let Z=null;function ln(){Z=null;const t=HTMLInputElement.prototype.click;HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อก .click() บน file input (${ge})`),Z=this;return}return t.call(this)};const e=HTMLInputElement.prototype.showPicker;let r=!1;typeof e=="function"&&(HTMLInputElement.prototype.showPicker=function(){if(this.type==="file"){n(`🚫 บล็อก .showPicker() บน file input (${ge})`),Z=this;return}return e.call(this)},r=!0);const a=window.showOpenFilePicker;let i=!1;return typeof a=="function"&&(window.showOpenFilePicker=async function(...u){throw n(`🚫 บล็อก showOpenFilePicker (${ge})`),new DOMException("Blocked by Netflow","AbortError")},i=!0),n(`🔒 บล็อก file dialog: click ✅ | showPicker ${r?"✅":"❌"} | showOpenFilePicker ${i?"✅":"❌"} (${ge})`),()=>{HTMLInputElement.prototype.click=t,r&&(HTMLInputElement.prototype.showPicker=e),i&&(window.showOpenFilePicker=a),n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function cn(t,e,r){var v;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(x=>x.input)];Z&&!i.includes(Z)&&(i.push(Z),n("เพิ่ม captured file input จากตัวบล็อก"));for(const x of a)!i.includes(x)&&x.offsetParent===null&&i.push(x);for(const x of i)x.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const c=[...document.querySelectorAll('input[type="file"]')];if(Z&&Z.type==="file"&&!c.includes(Z)&&(c.push(Z),n("captured file input ไม่อยู่ใน DOM — เพิ่มเป็น candidate")),c.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ge})`),!1;let l;if(Z&&Z.type==="file")l=Z,n("ใช้ captured file input จากตัวบล็อก ✅");else if(r&&r.size>0){const x=c.filter(T=>!r.has(T));x.length>0?(l=x[x.length-1],n(`เล็งเป้า file input ใหม่ (${x.length} ใหม่, ${c.length} ทั้งหมด)`)):(l=c[c.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${c.length} ตัว`))}else l=c[c.length-1];const s=new DataTransfer;s.items.add(e);try{l.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((v=l.files)==null?void 0:v.length)??0} ไฟล์)`)}catch(x){n(`กำหนด target.files ล้มเหลว: ${x.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(T){return _(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${T.message}`),!1}}const p=l._valueTracker;p&&(p.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const x=new DataTransfer;x.items.add(e);const T=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:x});l.dispatchEvent(T),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ge}`),!0}function Te(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(J()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;if(J()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}return t}async function Rt(t,e){var v;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=an(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Te();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async(x,T=8e3)=>{const F=Date.now();for(;Date.now()-F<T;){const C=Te();if(C>a)return n(`✅ [${x}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${C}`),!0;await m(500)}return n(`⚠️ [${x}] รูปย่อไม่เพิ่ม (ยังคง ${Te()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const u=rn();if(!u)return _("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const l=ln();let s=sn();const p=new MutationObserver(x=>{for(const T of x)for(const F of T.addedNodes)if(F instanceof HTMLInputElement&&F.type==="file"&&(F.type="text",s.push({input:F,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),F instanceof HTMLElement){const C=F.querySelectorAll('input[type="file"]');for(const h of C)h.type="text",s.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{u.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let x=!1;const T=Date.now();for(;!x&&Date.now()-T<8e3;){const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const h of C){if(h===u)continue;const o=h.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const f of o){const y=((v=f.textContent)==null?void 0:v.trim())||"";if(y==="upload"||y==="upload_file"||y==="add_photo_alternate"){const N=Array.from(h.querySelectorAll("i")).map(S=>{var I;return(I=S.textContent)==null?void 0:I.trim()});if(!N.includes("drive_folder_upload")&&!N.includes("photo_library")){h.click(),x=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${y}) ✅`);break}}}if(x)break}if(!x)for(const h of C){if(h===u)continue;const o=h.childNodes.length<=8?(h.textContent||"").trim():"";if(o.length>0&&o.length<60){const f=o.toLowerCase();if(f.includes("ไลบรารี")||f.includes("library")||f.includes("drive")||f.includes("ไดรฟ์"))continue;if(f==="upload"||f==="อัปโหลด"||f==="อัพโหลด"||f.includes("upload image")||f.includes("upload photo")||f.includes("upload a file")||f.includes("upload file")||f.includes("อัปโหลดรูปภาพ")||f.includes("อัพโหลดรูปภาพ")||f.includes("อัปโหลดไฟล์")||f.includes("อัพโหลดไฟล์")||f.includes("from computer")||f.includes("จากคอมพิวเตอร์")||f.includes("from device")||f.includes("จากอุปกรณ์")||f.includes("my computer")||f.includes("คอมพิวเตอร์ของฉัน")){h.click(),x=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!x)for(const h of C){if(h===u)continue;const o=(h.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก")||o.includes("ไลบรารี")||o.includes("library"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const f=h.getBoundingClientRect();if(f.width>0&&f.height>0){h.click(),x=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}x||await m(500)}if(!x)return _("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1;await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──");let F=cn(s,r,c);if(!F){n("⚠️ file input injection ล้มเหลว — ลอง drag-and-drop แทน");let C=null;const h=document.querySelectorAll('[role="dialog"], [data-state="open"][aria-haspopup="dialog"]');for(const o of h)if(o.getBoundingClientRect().width>0){C=o;break}if(!C){const o=document.querySelectorAll('[data-radix-portal], [class*="overlay"], [class*="modal"]');for(const f of o)if(f.getBoundingClientRect().width>0&&!f.closest("#netflow-engine-overlay")){C=f;break}}if(!C){const o=document.querySelector('[contenteditable="true"], [role="textbox"]');o&&(C=o)}if(C){n(`🎯 Drop target: <${C.tagName}> ${(C.className||"").substring(0,40)}`);const o=new DataTransfer;o.items.add(r);const f=C.getBoundingClientRect(),y=f.left+f.width/2,N=f.top+f.height/2,S={bubbles:!0,cancelable:!0,clientX:y,clientY:N,dataTransfer:o};C.dispatchEvent(new DragEvent("dragenter",S)),await m(100),C.dispatchEvent(new DragEvent("dragover",{...S,cancelable:!0})),await m(100),C.dispatchEvent(new DragEvent("drop",S)),n("✅ ส่ง drop event บน target แล้ว"),await m(2e3);const I=Te();I>a?(n(`✅ Drop สำเร็จ — รูปย่อเพิ่มจาก ${a} → ${I}`),F=!0):(n(`⚠️ Drop อาจไม่สำเร็จ — ยังคง ${I} รูป — ดำเนินการต่อ`),F=!0)}else return _(`ฉีดไฟล์ ${e} ล้มเหลว — ไม่พบ file input และ drop target`),!1}return n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0}finally{p.disconnect(),l();for(const x of s)x.input.type!=="file"&&(x.input.type="file")}}async function dn(t,e){var C;n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button, div, span, [role='button']");let a=null;for(const h of r){const o=(h.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const f=h.getBoundingClientRect();f.bottom>window.innerHeight*.7&&f.width>30&&f.height>10&&(!a||(h.textContent||"").length<(a.textContent||"").length)&&(a=h)}}if(a&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(a.textContent||"").substring(0,40).trim()}"`),!a){const h=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of h){const f=((C=o.textContent)==null?void 0:C.trim())||"";if(f.includes("crop")||f==="aspect_ratio"||f==="photo_size_select_large"){const y=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(y){const N=y.getBoundingClientRect();if(N.bottom>window.innerHeight*.7&&N.width>0){a=y,n(`พบปุ่มตั้งค่าจากไอคอน: ${f}`);break}}}}}if(!a)for(const h of r){const o=(h.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const f=h.getBoundingClientRect();if(f.bottom>window.innerHeight*.7&&f.width>30){a=h,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!a)return _("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),u=i.left+i.width/2,c=i.top+i.height/2,l={bubbles:!0,cancelable:!0,clientX:u,clientY:c,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",l)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",l)),a.dispatchEvent(new MouseEvent("click",l)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let s=!1,p=null;const v=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const h of v){const o=h.getAttribute("aria-controls")||"",f=h.id||"";if(o.toUpperCase().includes("IMAGE")||f.toUpperCase().includes("IMAGE")){p=h,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const h of document.querySelectorAll('[role="tab"]')){const o=h.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=h,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const h of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(h.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const f=h.getBoundingClientRect();if(f.width>0&&f.height>0){p=h,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(p){const h=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(h==="active"||o==="true")s=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const f=p.getBoundingClientRect(),y={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),p.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",y)),p.dispatchEvent(new MouseEvent("click",y)),s=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}s||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const x=t==="horizontal"?"แนวนอน":"แนวตั้ง",T=t==="horizontal"?"landscape":"portrait";for(const h of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(h.textContent||"").trim();if(!(o.length>30)&&(o===x||o.includes(x)||o.toLowerCase()===T||o.toLowerCase().includes(T))){const f=h.getBoundingClientRect(),y={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),h.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",y)),h.dispatchEvent(new MouseEvent("click",y)),n(`เลือกทิศทาง: ${x}`),await m(400);break}}const F=`x${e}`;for(const h of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(h.textContent||"").trim();if(!(o.length>10)&&(o===F||o===`${e}`)){const f=h.getBoundingClientRect(),y={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),h.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",y)),h.dispatchEvent(new MouseEvent("click",y)),n(`เลือกจำนวน: ${F}`),await m(400);break}}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),a.dispatchEvent(new PointerEvent("pointerdown",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",l)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...l,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",l)),a.dispatchEvent(new MouseEvent("click",l)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function pn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",u=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let c=null;const l=Date.now()+1e4;for(;!c&&Date.now()<l;){const h=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of h){const f=(o.textContent||"").trim();if(!(f.length>80)&&(f.includes("Veo")||f.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||f.includes("arrow_drop_down")||o.querySelector("svg"))){c=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${f.substring(0,50).trim()}"`);break}}if(!c)for(const o of h){const f=(o.textContent||"").trim();if(!(f.length>80)&&(f.includes("Veo")||f.includes("veo"))){const y=o.getBoundingClientRect();if(y.width>0&&y.height>0){c=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${f.substring(0,50).trim()}"`);break}}}if(!c)for(const o of h){const f=(o.textContent||"").trim();if(!(f.length>50)&&(f.includes("Fast")||f.includes("Quality")||f.includes("เร็ว")||f.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){c=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${f.substring(0,50).trim()}"`);break}}if(!c){const o=document.querySelectorAll("div, span, button, [role='button']");for(const f of o){const y=(f.textContent||"").trim();if(y==="Veo 3.1 - Fast"||y==="Veo 3.1 - Quality"||y==="Fast"||y==="Quality"||y==="Veo 3.1 - เร็ว"||y==="Veo 3.1 - คุณภาพสูง"||y==="Veo 3.1 - คุณภาพ"||y==="Veo 2 - Fast"||y==="Veo 2 - Quality"){const N=f.getBoundingClientRect();if(N.width>0&&N.height>0){c=f,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${y}"`);break}}}}if(!c){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const f of o){const y=(f.textContent||"").trim();if(!(y.length>60)&&(y.includes("3.1")||y.includes("model")||y.includes("โมเดล"))){const N=f.getBoundingClientRect();if(N.bottom>window.innerHeight*.4&&N.width>0&&N.height>0){c=f,n(`พบปุ่ม model selector (Strategy E): "${y.substring(0,50).trim()}"`);break}}}}c||await m(1e3)}if(!c)return _("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(c.textContent||"").trim();if(s.includes(e)||s.includes(r)&&!s.includes(a)||s.includes(i)&&!s.includes(u))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=c.getBoundingClientRect(),v=p.left+p.width/2,x=p.top+p.height/2,T={bubbles:!0,cancelable:!0,clientX:v,clientY:x,button:0};c.dispatchEvent(new PointerEvent("pointerdown",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mousedown",T)),await m(80),c.dispatchEvent(new PointerEvent("pointerup",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),c.dispatchEvent(new MouseEvent("mouseup",T)),c.dispatchEvent(new MouseEvent("click",T)),n("คลิกเปิด Veo quality dropdown"),await m(1e3);let F=!1;const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const h of C){const o=(h.textContent||"").trim();if((o===e||o===r||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const y=h.getBoundingClientRect();if(y.width>0&&y.height>0){const N=y.left+y.width/2,S=y.top+y.height/2,I={bubbles:!0,cancelable:!0,clientX:N,clientY:S,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",I)),await m(80),h.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",I)),h.dispatchEvent(new MouseEvent("click",I)),n(`✅ เลือก "${o}" สำเร็จ`),F=!0;break}}}return F?(await m(600),!0):(_(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),!1)}async function fn(t){var N,S,I,H;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",i=Je?"macOS":Ze?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",u=Je?((S=(N=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:N[1])==null?void 0:S.replace(/_/g,"."))||"":Ze&&((I=e.match(/Windows NT ([0-9.]+)/))==null?void 0:I[1])||"",c=navigator.language||"unknown",l=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${u} | Chrome ${a}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${l} | แพลตฟอร์ม: ${ge}`),n("══════════════════════════════════════════");try{Ue(t.theme)}catch{}try{Ye()}catch(d){console.warn("Overlay show error:",d)}const s=[],p=[];try{k("settings","active");const d=t.orientation||"horizontal",w=t.outputCount||1,M=await dn(d,w);s.push(M?"✅ Settings":"⚠️ Settings"),k("settings",M?"done":"error")}catch(d){_(`ตั้งค่าผิดพลาด: ${d.message}`),s.push("⚠️ Settings"),k("settings","error")}try{const d=t.veoQuality||"fast";await pn(d)?(s.push(`✅ Veo ${d}`),n(`✅ Veo quality: ${d}`)):(s.push("⚠️ Veo quality"),_("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(d){_(`Veo quality error: ${d.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),await m(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const v=()=>{const d=document.querySelectorAll("span, div, p, label");for(const w of d){const M=(w.textContent||"").trim();if(/^\d{1,3}%$/.test(M)){if(M==="100%")return null;const A=w.getBoundingClientRect();if(A.width>0&&A.height>0&&A.top>0&&A.top<window.innerHeight)return M}}return null},x=async d=>{n(`รอการอัพโหลด ${d} เสร็จ...`),await m(2e3);const w=Date.now(),M=6e4;let A="",R=Date.now();const $=15e3;for(;Date.now()-w<M;){const E=v();if(E){if(E!==A)A=E,R=Date.now();else if(Date.now()-R>$){n(`✅ อัพโหลด ${d} — % ค้างที่ ${E} นาน ${$/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${E} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${d} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}_(`⚠️ อัพโหลด ${d} หมดเวลาหลัง ${M/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){k("upload-char","active");try{const d=await Rt(t.characterImage,"character.png");s.push(d?"✅ ตัวละคร":"⚠️ ตัวละคร"),d||p.push("character upload failed"),k("upload-char",d?"done":"error")}catch(d){_(`อัพโหลดตัวละครผิดพลาด: ${d.message}`),s.push("❌ ตัวละคร"),p.push("character upload error"),k("upload-char","error")}await x("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(500)}else ve("upload-char");if(t.productImage){k("upload-prod","active"),n("🧹 รีเซ็ต UI ก่อนอัพโหลดสินค้า..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(500),document.querySelectorAll('input[type="file"]').forEach(d=>{n("🧹 ลบ file input เก่า"),d.remove()}),document.querySelectorAll('input[type="text"]').forEach(d=>{if(d.offsetParent===null&&!d.closest('[role="textbox"]')&&!d.closest("[contenteditable]")){const w=d.getBoundingClientRect();(w.width===0||w.height===0)&&(n("🧹 ลบ hidden text input เก่า"),d.remove())}}),await m(1e3),n("🧹 รีเซ็ตเสร็จ — เริ่มอัพโหลดสินค้า");try{const d=await Rt(t.productImage,"product.png");s.push(d?"✅ สินค้า":"⚠️ สินค้า"),d||p.push("product upload failed"),k("upload-prod",d?"done":"error")}catch(d){_(`อัพโหลดสินค้าผิดพลาด: ${d.message}`),s.push("❌ สินค้า"),p.push("product upload error"),k("upload-prod","error")}await x("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(500)}else ve("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const T=v();T&&(n(`⚠️ อัพโหลดยังแสดง ${T} — รอเพิ่มเติม...`),await x("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const F=(t.characterImage?1:0)+(t.productImage?1:0);if(F>0){let d=Te();d<F&&(n(`⏳ เห็นรูปย่อแค่ ${d}/${F} — รอ 3 วินาที...`),await m(3e3),d=Te()),d>=F?n(`✅ ยืนยันรูปย่ออ้างอิง: ${d}/${F}`):_(`⚠️ คาดว่าจะมี ${F} รูปย่อ แต่พบ ${d} — ดำเนินการต่อ`)}if(we()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Re(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),k("img-prompt","active");let C=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt ภาพ + กด Generate");try{await new Promise(d=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>d())),C=!0,await m(1500)}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await m(1e3);const h=Bt();if(h){await Ce(h,t.imagePrompt);const d=(h.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length<20){if(n("⚠️ Prompt ไม่ถูกวาง — ลองสลับ tab แล้ววางใหม่"),!C)try{await new Promise(M=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>M())),C=!0,await m(1500)}catch{}h.focus(),await m(500),await Ce(h,t.imagePrompt);const w=(h.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();w.length<20?(_(`❌ วาง Image Prompt ไม่สำเร็จแม้ลองซ้ำ (ได้ ${w.length} ตัวอักษร)`),s.push("❌ Prompt"),p.push("image prompt paste failed after retry"),k("img-prompt","error")):(n(`วาง Image Prompt สำเร็จหลังลองใหม่ (${w.length} ตัวอักษร)`),s.push("✅ Prompt"),k("img-prompt","done"))}else n(`วาง Prompt แล้ว (${d.length} ตัวอักษร)`),s.push("✅ Prompt"),k("img-prompt","done")}else _("ไม่พบช่องป้อนข้อความ Prompt"),s.push("❌ Prompt"),p.push("prompt input not found"),k("img-prompt","error");await m(800);const o=new Set;document.querySelectorAll("img").forEach(d=>{d.src&&o.add(d.src)}),n(`บันทึกรูปเดิม: ${o.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),k("img-generate","active"),await m(500);const f=At();if(f){const d=f.getBoundingClientRect(),w=d.left+d.width/2,M=d.top+d.height/2,A={bubbles:!0,cancelable:!0,clientX:w,clientY:M,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",A)),await m(80),f.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",A)),f.dispatchEvent(new MouseEvent("click",A)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await m(500),f.dispatchEvent(new PointerEvent("pointerdown",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",A)),await m(80),f.dispatchEvent(new PointerEvent("pointerup",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",A)),f.dispatchEvent(new MouseEvent("click",A)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),k("img-generate","done")}else _("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),p.push("generate button not found"),k("img-generate","error");if(C){await m(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ภาพกำลังสร้างเบื้องหลัง")}n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),k("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const d=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const E of $){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim();if(B.length>10)continue;const g=B.match(/(\d{1,3})\s*%/);if(!g)continue;const b=parseInt(g[1],10);if(b<1||b>100)continue;const P=E.getBoundingClientRect();if(!(P.width===0||P.width>150)&&!(P.top<0||P.top>window.innerHeight))return b}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let w=null,M=-1,A=0;const R=Date.now();for(;!w&&Date.now()-R<18e4;){const $=document.querySelectorAll("img");for(const E of $){if(o.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;const g=E.getBoundingClientRect();if(g.width>120&&g.height>120&&g.top>0&&g.top<window.innerHeight*.85){const b=E.closest("div");if(b){w=b,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...`);break}}}if(!w)for(const E of $){if(o.has(E.src))continue;const B=E.closest("div"),g=(B==null?void 0:B.textContent)||"";if(g.includes("product.png")||g.includes("character.png")||g.includes(".png")||g.includes(".jpg"))continue;const b=E.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const P=E.closest("div");if(P){w=P,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...`);break}}}if(!w){if(we()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=It();if(E){_(`❌ สร้างรูปล้มเหลว: ${E}`),p.push(`image gen failed: ${E}`),k("img-wait","error");break}const B=d();B!==null?(B!==M&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${B}%`),M=B,k("img-wait","active",B)),A=Date.now()):M>30&&Math.floor((Date.now()-A)/1e3)>=3&&n(`🖼️ % หายที่ ${M}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&M>0&&Date.now()-A>1e4&&await ke(),await m(3e3)}}if(!w)_("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),k("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),k("img-wait","done",100);const $=w.getBoundingClientRect(),E=$.left+$.width/2,B=$.top+$.height/2,g={bubbles:!0,cancelable:!0,clientX:E,clientY:B};w.dispatchEvent(new PointerEvent("pointerenter",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseenter",g)),w.dispatchEvent(new PointerEvent("pointerover",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseover",g)),w.dispatchEvent(new PointerEvent("pointermove",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousemove",g)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let b=null;for(const P of["more_vert","more_horiz","more"]){const U=Ge(P);for(const D of U){const O=D.getBoundingClientRect();if(O.top>=$.top-20&&O.top<=$.bottom&&O.right>=$.right-150&&O.right<=$.right+20){b=D;break}}if(b)break}if(!b){const P=document.querySelectorAll("button");for(const U of P){const D=U.getBoundingClientRect();if(D.width<50&&D.height<50&&D.top>=$.top-10&&D.top<=$.top+60&&D.left>=$.right-80){const O=U.querySelectorAll("i");for(const z of O)if((((H=z.textContent)==null?void 0:H.trim())||"").includes("more")){b=U;break}if(b)break;const L=U.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){b=U;break}}}}if(!b)_("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const P=b.getBoundingClientRect(),U=P.left+P.width/2,D=P.top+P.height/2,O={bubbles:!0,cancelable:!0,clientX:U,clientY:D,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",O)),await m(80),b.dispatchEvent(new PointerEvent("pointerup",{...O,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",O)),b.dispatchEvent(new MouseEvent("click",O)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let L=null;const z=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const V of z){const Y=(V.textContent||"").trim();if(Y.includes("ทำให้เป็นภาพเคลื่อนไหว")||Y.includes("Animate")||Y.includes("animate")){L=V;break}}if(!L)_("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const V=L.getBoundingClientRect(),Y=V.left+V.width/2,ae=V.top+V.height/2,q={bubbles:!0,cancelable:!0,clientX:Y,clientY:ae,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",q)),await m(80),L.dispatchEvent(new PointerEvent("pointerup",{...q,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",q)),L.dispatchEvent(new MouseEvent("click",q)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),k("animate","done"),await m(3e3)}}}}catch(d){_(`ขั้น 4 ผิดพลาด: ${d.message}`),s.push("⚠️ Animate")}if(we()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Re(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),k("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let d=!1;const w=document.querySelectorAll("button, span, div");for(const $ of w){const E=($.textContent||"").trim(),B=$.getBoundingClientRect();if((E==="วิดีโอ"||E==="Video"||E.includes("วิดีโอ"))&&B.bottom>window.innerHeight*.7){d=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}d||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let M=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise($=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>$())),M=!0,await m(1500)}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await m(1e3);const A=Bt();if(A){await Ce(A,t.videoPrompt);const $=(A.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if($.length<20){if(n(`⚠️ Prompt ไม่ถูกวาง (ได้ ${$.length} ตัวอักษร) — ลองวางใหม่`),document.hidden)try{await new Promise(B=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>B())),M=!0,await m(1500)}catch{}A.focus(),await m(500),await Ce(A,t.videoPrompt);const E=(A.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();E.length<20?(_(`❌ วาง Video Prompt ไม่สำเร็จแม้ลองซ้ำ (ได้ ${E.length} ตัวอักษร)`),s.push("❌ Video Prompt"),p.push("video prompt paste failed after retry"),k("vid-prompt","error")):(n(`วาง Video Prompt สำเร็จหลังลองใหม่ (${E.length} ตัวอักษร)`),s.push("✅ Video Prompt"),k("vid-prompt","done"))}else n(`วาง Video Prompt แล้ว (${$.length} ตัวอักษร)`),s.push("✅ Video Prompt"),k("vid-prompt","done")}else _("ไม่พบช่อง Prompt สำหรับ Video Prompt"),s.push("❌ Video Prompt"),p.push("video prompt input not found"),k("vid-prompt","error");await m(1e3),k("vid-generate","active");const R=At();if(R){const $=R.getBoundingClientRect(),E=$.left+$.width/2,B=$.top+$.height/2,g={bubbles:!0,cancelable:!0,clientX:E,clientY:B,button:0};R.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mousedown",g)),await m(80),R.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mouseup",g)),R.dispatchEvent(new MouseEvent("click",g)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),k("vid-generate","done"),await m(500),R.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mousedown",g)),await m(80),R.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),R.dispatchEvent(new MouseEvent("mouseup",g)),R.dispatchEvent(new MouseEvent("click",g)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else _("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),p.push("video generate button not found"),k("vid-generate","error");if(M){await m(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(d){_(`ขั้น 5 ผิดพลาด: ${d.message}`),s.push("⚠️ Video Gen"),p.push(`video gen error: ${d.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ve("animate"),ve("vid-prompt"),ve("vid-generate"),ve("vid-wait");if(t.videoPrompt){k("vid-wait","active");const d=t.sceneCount||1,w=t.videoScenePrompts||[t.videoPrompt];if(d>1)try{Qt(d)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${d>1?`ต่อ ${d} ฉาก`:"ดาวน์โหลด"} ===`);const M=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const E of $){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim();if(B.length>10)continue;const g=B.match(/(\d{1,3})\s*%/);if(!g)continue;const b=parseInt(g[1],10);if(b<1||b>100)continue;const P=E.getBoundingClientRect();if(!(P.width===0||P.width>150)&&!(P.top<0||P.top>window.innerHeight))return b}return null},A=async($=6e5)=>{n("รอการสร้างวิดีโอ..."),k("vid-wait","active"),await m(5e3);const E=()=>{const q=document.querySelectorAll("div, span, p, label, strong, small");let j=0;for(const G of q){if(G.closest("#netflow-engine-overlay"))continue;const ee=(G.textContent||"").trim();if(ee.includes("%")&&ee.length<15){const re=G.tagName.toLowerCase(),le=G.className&&typeof G.className=="string"?G.className.split(/\s+/).slice(0,2).join(" "):"",pe=G.getBoundingClientRect();if(n(`  🔍 "${ee}" ใน <${re}.${le}> ที่ (${pe.left.toFixed(0)},${pe.top.toFixed(0)}) w=${pe.width.toFixed(0)}`),j++,j>=5)break}}j===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},B=tt();n(B?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),E();const g=Date.now();let b=-1,P=0,U=!1;for(;Date.now()-g<$;){const q=M();if(q!==null){if(q!==b&&(n(`ความคืบหน้าวิดีโอ: ${q}%`),b=q,k("vid-wait","active",q)),P=Date.now(),q>=100){n("✅ ตรวจพบ 100%!"),U=!0;break}}else if(b>30){const j=Math.floor((Date.now()-P)/1e3);if(j>=5){n(`✅ % หายไปที่ ${b}% (หาย ${j} วินาที) — วิดีโอเสร็จ!`),U=!0;break}n(`⏳ % หายที่ ${b}% — ยืนยันใน ${5-j} วินาที...`)}else{const j=Math.floor((Date.now()-g)/1e3);j%15<3&&n(`⏳ รอ... (${j} วินาที) ไม่พบ %`)}if(!U&&b>0&&tt(!0)&&!B){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${b}% — วิดีโอเสร็จ!`),U=!0;break}if(we())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(b<1){const j=It();if(j)return _(`❌ สร้างวิดีโอล้มเหลว: ${j}`),null}document.hidden&&b>0&&Date.now()-P>1e4&&await ke(),document.hidden&&b<1&&Date.now()-g>3e4&&await ke(),await m(3e3)}const D=tt();if(!D)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),k("vid-wait","error"),null;const O=D;U?(k("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=O.getBoundingClientRect();let z=L.left+L.width/2,V=L.top+L.height/2,Y=O;const ae=O.querySelector("video, img, canvas");if(ae){const q=ae.getBoundingClientRect();q.width>50&&q.height>50&&(z=q.left+q.width/2,V=q.top+q.height/2,Y=ae,n(`🎯 พบรูปย่อ <${ae.tagName.toLowerCase()}> ในการ์ดที่ (${z.toFixed(0)},${V.toFixed(0)}) ${q.width.toFixed(0)}x${q.height.toFixed(0)}`))}else V=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${z.toFixed(0)},${V.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${z.toFixed(0)}, ${V.toFixed(0)})...`),tn(Y);for(let q=0;q<8;q++){const j={bubbles:!0,cancelable:!0,clientX:z+q%2,clientY:V};Y.dispatchEvent(new PointerEvent("pointermove",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Y.dispatchEvent(new MouseEvent("mousemove",j)),await m(500)}try{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"mute_video",sceneCount:d,scenePrompts:w,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${d} ฉาก, ${w.length} prompts, theme: ${t.theme})`)}catch(q){n(`⚠️ ไม่สามารถบันทึก pending action: ${q.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await R(Y),n("✅ คลิกการ์ดวิดีโอเสร็จ"),O},R=async $=>{const E=$.getBoundingClientRect(),B=E.left+E.width/2,g=E.top+E.height/2,b={bubbles:!0,cancelable:!0,clientX:B,clientY:g,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",b)),await m(80),$.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",b)),$.dispatchEvent(new MouseEvent("click",b)),await m(50),$.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await A())_("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),k("vid-wait","error");else{s.push("✅ Video Complete"),k("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const E=await new Promise(B=>{chrome.storage.local.get(de(),g=>{if(chrome.runtime.lastError){B(null);return}B((g==null?void 0:g[de()])||null)})});E&&!E._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(de()),E.action==="mute_video"?await Dt(E.sceneCount||1,E.scenePrompts||[],E.theme):E.action==="wait_scene_gen_and_download"&&await Ft(E.sceneCount||2,E.currentScene||2,E.theme,E.scenePrompts||[]))}}catch($){_(`ขั้น 6 ผิดพลาด: ${$.message}`),s.push("⚠️ Step6"),p.push(`step 6: ${$.message}`)}}const y=p.length===0;try{Re(y?5e3:8e3)}catch(d){console.warn("Overlay complete error:",d)}return{success:y,message:y?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${p.join(", ")}`,step:y?"done":"partial"}}async function Dt(t,e=[],r){var N;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Ue(r)}catch{}try{Ye(t)}catch(S){n(`⚠️ showOverlay error: ${S.message}`)}try{const S=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const I of S)k(I,"done");t>=2&&k("scene2-prompt","active"),n(`✅ overlay restored: ${S.length} steps done, sceneCount=${t}`)}catch(S){n(`⚠️ overlay restore error: ${S.message}`)}await m(1500);const a=(()=>{for(const S of document.querySelectorAll("button")){const I=S.querySelectorAll("i");for(const d of I){const w=(d.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const M=S.getBoundingClientRect();if(M.width>0&&M.height>0)return S}}const H=(S.getAttribute("aria-label")||"").toLowerCase();if(H.includes("mute")||H.includes("ปิดเสียง")){const d=S.getBoundingClientRect();if(d.width>0&&d.height>0)return S}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let g=2;g<=t;g++){const b=e[g-1];if(!b){_(`ไม่พบ prompt สำหรับฉากที่ ${g}`);continue}n(`── ฉากที่ ${g}/${t}: วาง prompt + generate ──`);let P=null;const U=Date.now();for(;!P&&Date.now()-U<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(P=G[G.length-1]),!P){const ee=document.querySelectorAll("[role='textbox'][contenteditable='true']");ee.length>0&&(P=ee[ee.length-1])}P||await m(1e3)}if(!P){_("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${P.tagName.toLowerCase()}> ${P.className.substring(0,40)}`),await Ce(P,b),n(`วาง prompt ฉาก ${g} (${b.length} ตัวอักษร) ✅`);try{k(`scene${g}-prompt`,"done"),k(`scene${g}-gen`,"active")}catch{}await m(1e3);const D=P.getBoundingClientRect();let O=null,L=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const ee=G.querySelectorAll("i");let re=!1;for(const Me of ee)if((Me.textContent||"").trim()==="arrow_forward"){re=!0;break}if(!re)continue;const le=G.getBoundingClientRect();if(le.width<=0||le.height<=0)continue;const pe=Math.abs(le.top-D.top)+Math.abs(le.right-D.right);pe<L&&(L=pe,O=G)}if(!O)for(const G of document.querySelectorAll("button")){const ee=G.querySelectorAll("i");for(const re of ee)if((re.textContent||"").trim()==="arrow_forward"){const le=G.getBoundingClientRect();if(le.width>0&&le.height>0){O=G;break}}if(O)break}if(!O){_("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:g,scenePrompts:e}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${g}/${t})`),await te(O),n(`คลิก Generate ฉาก ${g} ✅`);try{k(`scene${g}-gen`,"done"),k(`scene${g}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${g} gen เสร็จ ──`),await m(5e3);let z=0,V=0;const Y=Date.now(),ae=6e5,q=5e3;let j=!1;for(;Date.now()-Y<ae;){let G=null;const ee=document.querySelectorAll("div, span, p, label, strong, small");for(const re of ee){if(re.closest("#netflow-engine-overlay"))continue;const pe=(re.textContent||"").trim().match(/^(\d{1,3})%$/);if(pe){const Me=re.getBoundingClientRect();if(Me.width>0&&Me.height>0&&Me.width<120&&Me.height<60){G=parseInt(pe[1],10);break}}}if(G!==null){if(G!==z){n(`🎬 ฉาก ${g} ความคืบหน้า: ${G}%`),z=G;try{k(`scene${g}-wait`,"active",G)}catch{}}V=0}else if(z>0){if(V===0)V=Date.now(),n(`🔍 ฉาก ${g}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-V>=q){n(`✅ ฉาก ${g}: % หายไป ${q/1e3} วินาที — เจนเสร็จ!`),j=!0;break}}if(we()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&z>0&&V===0&&await ke(),await m(2e3)}j||_(`ฉาก ${g} หมดเวลา`),n(`✅ ฉาก ${g} เสร็จแล้ว`);try{k(`scene${g}-wait`,"done",100)}catch{}chrome.storage.local.remove(de()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{k("download","active")}catch{}let S=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(g=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>g())),S=!0,await m(1500)}catch{}}await m(2e3);const I=Date.now();let H=null;const d=Date.now();for(;!H&&Date.now()-d<1e4;){for(const g of document.querySelectorAll("button")){const b=g.querySelector("i");if(b&&(b.textContent||"").trim()==="download"){const P=g.getBoundingClientRect();if(P.width>0&&P.height>0){H=g;break}}}H||await m(1e3)}if(!H){if(_("ไม่พบปุ่มดาวน์โหลด"),S)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await te(H),n("คลิกดาวน์โหลดแล้ว ✅");try{k("download","done"),k("upscale","active")}catch{}await m(1500);let w=null;for(let g=0;g<3&&!w;g++){g>0&&n(`🔄 ลองหา 720p ครั้งที่ ${g+1}...`);let b=null;const P=Date.now();for(;!b&&Date.now()-P<5e3;){for(const z of document.querySelectorAll("[role='menuitem']"))if((z.textContent||"").trim().includes("Full Video")&&z.querySelector("i")){const Y=z.getBoundingClientRect();if(Y.width>0&&Y.height>0){b=z;break}}b||await m(500)}if(!b){_("ไม่พบ Full Video");continue}const U=b.getBoundingClientRect(),D=U.left+U.width/2,O=U.top+U.height/2;b.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:D,clientY:O})),b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:D,clientY:O})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:D,clientY:O})),await te(b),n("คลิก/hover Full Video ✅"),await m(2e3);const L=Date.now();for(;!w&&Date.now()-L<8e3;){for(const z of document.querySelectorAll("button[role='menuitem']")){const V=z.querySelectorAll("span");for(const Y of V)if((Y.textContent||"").trim()==="720p"){const ae=z.getBoundingClientRect();if(ae.width>0&&ae.height>0){w=z;break}}if(w)break}w||(b.isConnected&&(b.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:D,clientY:O})),b.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:D+20,clientY:O}))),await m(500))}}if(!w){if(_("ไม่พบ 720p"),S)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await te(w),n("คลิก 720p ✅"),S){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const M=Date.now();let A=!1,R=!1;for(;Date.now()-M<3e5;){for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div")){const b=(g.textContent||"").trim();if(b==="Download complete!"||b==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),A=!0;break}(b.includes("Downloading your extended video")||b.includes("กำลังดาวน์โหลด"))&&(R||(R=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(A)break;if(R){let g=!1;for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((b.textContent||"").trim().includes("Downloading")){g=!0;break}if(!g){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),A=!0;break}}if(we()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await m(2e3)}if(!A){_("เตรียมไฟล์หมดเวลา");return}try{k("upscale","done",100),k("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let $=!1;const E=Date.now();for(;Date.now()-E<6e4&&!$;){try{await new Promise(g=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:I},b=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):b!=null&&b.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${b.message}`),$=!0,b.downloadUrl&&(i=b.downloadUrl,n(`[TikTok] จะใช้ download URL: ${b.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-E)/1e3)}s)`),g()})})}catch(g){_(`ตรวจสอบผิดพลาด: ${g.message}`)}$||await m(3e3)}$||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await Ke();i||(i=B);try{k("open","done"),Re(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Qe(i),je(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const u=(S,I="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const H of document.querySelectorAll(I)){const d=(H.textContent||"").trim();if(d.includes(S)&&d.length<100){const w=H.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return H}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const l=Date.now();for(;!c&&Date.now()-l<1e4;){for(const S of document.querySelectorAll("button, [role='button']")){const I=(S.textContent||"").trim(),H=I.toLowerCase();if((H.includes("download")||H.includes("ดาวน์โหลด"))&&I.length<80){const d=S.getBoundingClientRect();if(d.width>0&&d.height>0){c=S;break}}}if(!c)for(const S of document.querySelectorAll("button")){const I=(S.getAttribute("aria-label")||"").toLowerCase();if(I.includes("download")||I.includes("ดาวน์")){const H=S.getBoundingClientRect();if(H.width>0&&H.height>0){c=S;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!c){_("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await te(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const s=Date.now();let p=null;const v=Date.now();for(;!p&&Date.now()-v<5e3;)p=u("1080p"),p||(n("รอ 1080p..."),await m(500));if(!p){_("ไม่พบ 1080p");return}await te(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const x=Date.now();let T=!1,F=!1,C=0;const h=3e3;for(;Date.now()-x<3e5;){const I=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(I.includes("upscaling complete")||I.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),T=!0;break}for(const d of document.querySelectorAll("div, span, p")){const w=(d.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(N=d.textContent)==null?void 0:N.trim()}")`),T=!0;break}}if(T)break;if(I.includes("upscaling your video")||I.includes("กำลังอัปสเกล")){F=!0,C=0;const d=Math.floor((Date.now()-x)/1e3);n(`⏳ กำลังอัปสเกล... (${d} วินาที)`)}else if(F){if(C===0)C=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-C>=h){n(`✅ ข้อความ Upscaling หายไป ${h/1e3} วินาที — เสร็จ!`),T=!0;break}}else{const d=Math.floor((Date.now()-x)/1e3);d%10<3&&n(`⏳ รอ Upscale... (${d} วินาที)`)}if(we()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!T){_("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let o=!1;const f=Date.now();for(;Date.now()-f<6e4&&!o;){try{await new Promise(S=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},I=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):I!=null&&I.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${I.message}`),o=!0,I.downloadUrl&&(i=I.downloadUrl,n(`[TikTok] จะใช้ download URL: ${I.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-f)/1e3)}s)`),S()})})}catch(S){_(`ตรวจสอบผิดพลาด: ${S.message}`)}o||await m(3e3)}o||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const y=await Ke();i||(i=y),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Qe(i),je(2e3)}async function Ft(t=2,e=2,r,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Ue(r)}catch{}try{Ye(t)}catch(d){n(`⚠️ showOverlay error: ${d.message}`)}try{const d=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)d.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&d.push(`scene${w}-wait`);for(const w of d)k(w,"done");k(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${d.length} steps done (scene ${e}/${t} navigate)`)}catch(d){n(`⚠️ overlay restore error: ${d.message}`)}await m(2e3);const i=(()=>{for(const d of document.querySelectorAll("button")){const w=d.querySelectorAll("i");for(const M of w){const A=(M.textContent||"").trim();if(A==="volume_up"||A==="volume_off"||A==="volume_mute"){const R=d.getBoundingClientRect();if(R.width>0&&R.height>0)return d}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let u=0,c=0;const l=Date.now(),s=6e5,p=5e3;let v=!1,x=0;for(;Date.now()-l<s;){let d=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const M of w){if(M.closest("#netflow-engine-overlay"))continue;const R=(M.textContent||"").trim().match(/^(\d{1,3})%$/);if(R){const $=M.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<120&&$.height<60){d=parseInt(R[1],10);break}}}if(d!==null){if(x=0,d!==u){n(`🎬 scene ${e} ความคืบหน้า: ${d}%`),u=d;try{k(`scene${e}-wait`,"active",d)}catch{}}c=0}else if(u>0){if(c===0)c=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${u}%) — กำลังยืนยัน...`);else if(Date.now()-c>=p){n(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),v=!0;break}}else if(x++,x>=15){const M=document.querySelectorAll("video");let A=!1;for(const R of M)if(R.readyState>=2&&!R.paused&&R.getBoundingClientRect().width>200){A=!0;break}if(A){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),v=!0;break}if(x>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),v=!0;break}}document.hidden&&u>0&&c===0&&await ke(),await m(2e3)}v||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{k(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await m(2e3);for(let d=e+1;d<=t;d++){const w=a[d-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${d} — ข้าม`);continue}n(`── ฉากที่ ${d}/${t}: วาง prompt + generate (pending recovery) ──`);let M=null;const A=Date.now();for(;!M&&Date.now()-A<1e4;){const D=document.querySelectorAll("[data-slate-editor='true']");if(D.length>0&&(M=D[D.length-1]),!M){const O=document.querySelectorAll("[role='textbox'][contenteditable='true']");O.length>0&&(M=O[O.length-1])}M||await m(1e3)}if(!M){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${d}`);break}await Ce(M,w),n(`วาง prompt ฉาก ${d} (${w.length} ตัวอักษร) ✅`);try{k(`scene${d}-prompt`,"done"),k(`scene${d}-gen`,"active")}catch{}await m(1e3);const R=M.getBoundingClientRect();let $=null,E=1/0;for(const D of document.querySelectorAll("button")){if(D.disabled)continue;const O=D.querySelectorAll("i");let L=!1;for(const Y of O)if((Y.textContent||"").trim()==="arrow_forward"){L=!0;break}if(!L)continue;const z=D.getBoundingClientRect();if(z.width<=0||z.height<=0)continue;const V=Math.abs(z.top-R.top)+Math.abs(z.right-R.right);V<E&&(E=V,$=D)}if(!$)for(const D of document.querySelectorAll("button")){const O=D.querySelectorAll("i");for(const L of O)if((L.textContent||"").trim()==="arrow_forward"){const z=D.getBoundingClientRect();if(z.width>0&&z.height>0){$=D;break}}if($)break}if(!$){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${d}`);break}await new Promise(D=>{chrome.storage.local.set({[de()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:d,scenePrompts:a}},()=>D())}),await te($),n(`คลิก Generate ฉาก ${d} ✅`);try{k(`scene${d}-gen`,"done"),k(`scene${d}-wait`,"active")}catch{}await m(5e3);let B=0,g=0;const b=Date.now();let P=!1,U=0;for(;Date.now()-b<6e5;){let D=null;const O=document.querySelectorAll("div, span, p, label, strong, small");for(const L of O){if(L.closest("#netflow-engine-overlay"))continue;const V=(L.textContent||"").trim().match(/^(\d{1,3})%$/);if(V){const Y=L.getBoundingClientRect();if(Y.width>0&&Y.height>0&&Y.width<120&&Y.height<60){D=parseInt(V[1],10);break}}}if(D!==null){if(U=0,D!==B){n(`🎬 ฉาก ${d} ความคืบหน้า: ${D}%`),B=D;try{k(`scene${d}-wait`,"active",D)}catch{}}g=0}else if(B>0){if(g===0)g=Date.now();else if(Date.now()-g>=5e3){n(`✅ ฉาก ${d}: เจนเสร็จ!`),P=!0;break}}else if(U++,U>=15){const L=document.querySelectorAll("video");let z=!1;for(const V of L)if(V.readyState>=2&&!V.paused&&V.getBoundingClientRect().width>200){z=!0;break}if(z){n(`✅ ฉาก ${d}: พบวิดีโอเล่นอยู่ — เสร็จ`),P=!0;break}if(U>=30){n(`✅ ฉาก ${d}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),P=!0;break}}document.hidden&&B>0&&g===0&&await ke(),await m(2e3)}P||n(`⚠️ ฉาก ${d} หมดเวลา`);try{k(`scene${d}-wait`,"done",100)}catch{}n(`✅ ฉาก ${d} เสร็จแล้ว`),chrome.storage.local.remove(de()),await m(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await m(3e3);let T=null;try{k("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const F=Date.now();let C=null;const h=Date.now();for(;!C&&Date.now()-h<1e4;){for(const d of document.querySelectorAll("button")){const w=d.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const M=d.getBoundingClientRect();if(M.width>0&&M.height>0){C=d;break}}}C||await m(1e3)}if(!C){_("ไม่พบปุ่มดาวน์โหลด");return}await te(C),n("คลิกดาวน์โหลดแล้ว ✅");try{k("download","done"),k("upscale","active")}catch{}await m(1500);let o=null;for(let d=0;d<3&&!o;d++){d>0&&n(`🔄 ลองหา 720p ครั้งที่ ${d+1}...`);let w=null;const M=Date.now();for(;!w&&Date.now()-M<5e3;){for(const B of document.querySelectorAll("[role='menuitem']"))if((B.textContent||"").trim().includes("Full Video")&&B.querySelector("i")){const b=B.getBoundingClientRect();if(b.width>0&&b.height>0){w=B;break}}w||await m(500)}if(!w){_("ไม่พบ Full Video");continue}const A=w.getBoundingClientRect(),R=A.left+A.width/2,$=A.top+A.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:R,clientY:$})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:$})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R,clientY:$})),await te(w),n("คลิก/hover Full Video ✅"),await m(2e3);const E=Date.now();for(;!o&&Date.now()-E<8e3;){for(const B of document.querySelectorAll("button[role='menuitem']")){const g=B.querySelectorAll("span");for(const b of g)if((b.textContent||"").trim()==="720p"){const P=B.getBoundingClientRect();if(P.width>0&&P.height>0){o=B;break}}if(o)break}o||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:$})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R+20,clientY:$}))),await m(500))}}if(!o){_("ไม่พบ 720p");return}await te(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const f=Date.now();let y=!1,N=!1;for(;Date.now()-f<3e5;){for(const d of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(d.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),y=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(N||(N=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(y)break;if(N){let d=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){d=!0;break}if(!d){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),y=!0;break}}await m(2e3)}if(!y){_("เตรียมไฟล์หมดเวลา");return}try{k("upscale","done",100),k("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let S=!1;const I=Date.now();for(;Date.now()-I<6e4&&!S;){try{await new Promise(d=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:F},w=>{chrome.runtime.lastError?_(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),S=!0,w.downloadUrl&&(T=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-I)/1e3)}s)`),d()})})}catch(d){_(`ตรวจสอบผิดพลาด: ${d.message}`)}S||await m(3e3)}S||_("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const H=await Ke();T||(T=H);try{k("open","done"),Re(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Qe(T),je(2e3)}async function un(){try{await Jt;const t=de();let e=await new Promise(c=>{chrome.storage.local.get(t,l=>{if(chrome.runtime.lastError){c(null);return}c((l==null?void 0:l[t])||null)})});if(!e&&$e){const c="netflow_pending_action";e=await new Promise(l=>{chrome.storage.local.get(c,s=>{if(chrome.runtime.lastError){l(null);return}l((s==null?void 0:s[c])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(c))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(c=>{chrome.storage.local.set({[t]:e},()=>c())}),await m(300),!await new Promise(c=>{chrome.storage.local.get(t,l=>{const s=l==null?void 0:l[t];c((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await Dt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ft(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),fn(t).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),Tt()}).catch(a=>{if(a instanceof et||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{qe("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Ct()}catch{}}else console.error("[Netflow AI] Generate error:",a);Tt()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const a=on();if(!a){_("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),u=i.left+i.width/2,c=i.top+i.height/2;n(`การ์ดรูปที่ (${u.toFixed(0)}, ${c.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let l=0;l<2;l++){const s=document.elementFromPoint(u,c);s?(await te(s),n(`คลิก ${l+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await te(a),n(`คลิก ${l+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),un()})();
