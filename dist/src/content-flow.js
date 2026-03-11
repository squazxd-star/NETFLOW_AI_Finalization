(function(){"use strict";const pe={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let J=pe.green,Ce=null;function qe(t){t&&pe[t]&&(Ce=t,J=pe[t],tt(),requestAnimationFrame(()=>Et()))}function Ft(){if(Ce&&pe[Ce])return pe[Ce];try{const t=localStorage.getItem("netflow_app_theme");if(t&&pe[t])return pe[t]}catch{}return pe.green}let te=0,ne=255,oe=65;function tt(){const t=J.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(te=parseInt(t[1],16),ne=parseInt(t[2],16),oe=parseInt(t[3],16))}const nt='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',ot='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let W=null,Q=null,fe=null,it=0,De=null,Te=null,Re=null,Ue=0,ue=!1,le=null,Se=null,Me=null,we=1,X=[];function Oe(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const re=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];X=Oe(1);function zt(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,i=t.hex,f=t.accentHex,l=t.doneHex,c=(()=>{const b=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const o=u=>Math.min(255,u+80);return`#${[1,2,3].map(u=>o(parseInt(b[u],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const b=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const o=u=>Math.min(255,u+60);return`#${[1,2,3].map(u=>o(parseInt(b[u],16)).toString(16).padStart(2,"0")).join("")}`})(),p=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),x=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,y=p?parseInt(p[1],16)/x:0,S=p?parseInt(p[2],16)/x:1,O=p?parseInt(p[3],16)/x:.25,P=b=>`${Math.round(y*b)}, ${Math.round(S*b)}, ${Math.round(O*b)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${P(18)},0.94) 0%, rgba(${P(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${P(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${P(180)},0.05),
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
            0 0 200px rgba(${P(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${P(180)},0.08),
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
    background: linear-gradient(180deg, rgba(${P(5)},0.95) 0%, rgba(${P(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${P(6)},0.75) 0%, rgba(${P(3)},0.92) 100%);
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
    background: rgba(${P(8)}, 0.88);
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
    background: linear-gradient(90deg, ${i}, ${f});
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
    background: rgba(${P(8)},0.8);
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
    background: rgba(${P(8)}, 0.9);
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

    `}function at(){fe||(fe=document.createElement("style"),fe.id="netflow-overlay-styles",fe.textContent=zt(J),document.head.appendChild(fe))}function rt(t){t.innerHTML="",X.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function st(){const t=document.getElementById("nf-terminal");if(!t)return;rt(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${X.length}`)}function lt(t,e){let c="";for(let S=0;S<20;S++){const O=S/20*Math.PI*2,P=(S+.2)/20*Math.PI*2,b=(S+.5)/20*Math.PI*2,o=(S+.8)/20*Math.PI*2,u=(S+1)/20*Math.PI*2;c+=`${S===0?"M":"L"}${(120+100*Math.cos(O)).toFixed(1)},${(120+100*Math.sin(O)).toFixed(1)} `,c+=`L${(120+100*Math.cos(P)).toFixed(1)},${(120+100*Math.sin(P)).toFixed(1)} `,c+=`L${(120+112*Math.cos(b)).toFixed(1)},${(120+112*Math.sin(b)).toFixed(1)} `,c+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,c+=`L${(120+100*Math.cos(u)).toFixed(1)},${(120+100*Math.sin(u)).toFixed(1)} `}c+="Z";const s=14,p=72,x=62;let y="";for(let S=0;S<s;S++){const O=S/s*Math.PI*2,P=(S+.25)/s*Math.PI*2,b=(S+.75)/s*Math.PI*2,o=(S+1)/s*Math.PI*2;y+=`${S===0?"M":"L"}${(120+x*Math.cos(O)).toFixed(1)},${(120+x*Math.sin(O)).toFixed(1)} `,y+=`L${(120+p*Math.cos(P)).toFixed(1)},${(120+p*Math.sin(P)).toFixed(1)} `,y+=`L${(120+p*Math.cos(b)).toFixed(1)},${(120+p*Math.sin(b)).toFixed(1)} `,y+=`L${(120+x*Math.cos(o)).toFixed(1)},${(120+x*Math.sin(o)).toFixed(1)} `}return y+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${y}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${x}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Nt(){const t=document.createElement("div");t.id="netflow-engine-overlay",le=document.createElement("canvas"),le.id="nf-matrix-canvas",t.appendChild(le);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let m=1;m<=5;m++){const h=document.createElement("div");h.className=`nf-ambient-orb nf-orb-${m}`,t.appendChild(h)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const f=document.createElement("div");f.className="nf-pat-circuit",t.appendChild(f);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const c=document.createElement("div");c.className="nf-pat-binary",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const x=document.createElement("div");x.className="nf-pat-wave-h",t.appendChild(x);const y=document.createElement("div");y.className="nf-pat-radar",t.appendChild(y);const S=document.createElement("div");S.className="nf-pat-ripple-1",t.appendChild(S);const O=document.createElement("div");O.className="nf-pat-ripple-2",t.appendChild(O);const P=document.createElement("div");P.className="nf-pat-techscan",t.appendChild(P);const b=document.createElement("div");b.className="nf-center-glow",t.appendChild(b);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const u=document.createElement("div");u.className="nf-crt-scanlines",t.appendChild(u);const v=document.createElement("div");v.className="nf-vignette",t.appendChild(v);for(let m=0;m<3;m++){const h=document.createElement("div");h.className="nf-pulse-ring",t.appendChild(h)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(m=>{const h=document.createElement("div");h.className=`nf-corner-deco ${m}`,t.appendChild(h)});const V=document.createElement("button");V.className="nf-stop-btn",V.innerHTML='<span class="nf-stop-icon"></span> หยุด',V.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",V.onclick=()=>{var m;window.__NETFLOW_STOP__=!0;try{Le("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((m=chrome.runtime)!=null&&m.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(V);const _=document.createElement("div");_.className="nf-layout";const D=document.createElement("div");D.className="nf-core-monitor",D.id="nf-core-monitor";const H=document.createElement("div");H.className="nf-core-header",H.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,D.appendChild(H);const d=document.createElement("div");d.className="nf-terminal",d.id="nf-terminal",rt(d),D.appendChild(d);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const T=document.createElement("div");T.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(m=>{const h=document.createElement("div");h.className=`nf-frame-corner ${m}`,T.appendChild(h)}),w.appendChild(T);const I="http://www.w3.org/2000/svg",A=document.createElementNS(I,"svg");A.setAttribute("class","nf-engine-waves"),A.setAttribute("viewBox","0 0 560 140"),A.setAttribute("preserveAspectRatio","none"),A.id="nf-engine-waves";for(let m=0;m<4;m++){const h=document.createElementNS(I,"path");h.setAttribute("fill","none"),h.setAttribute("stroke-width",m<2?"1.5":"1"),h.setAttribute("stroke",m<2?`rgba(${J.rgb},${.14+m*.1})`:`rgba(${J.accentRgb},${.1+(m-2)*.08})`),h.setAttribute("data-wave-idx",String(m)),A.appendChild(h)}w.appendChild(A);const $=document.createElement("div");$.className="nf-engine-brand-inner",$.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${lt(J.rgb,J.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${lt(J.rgb,J.accentRgb)}
        </div>
    `,w.appendChild($);const E=document.createElement("div");E.className="nf-engine-stats",E.id="nf-engine-stats",E.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([m,h,C])=>`<div class="nf-stat-item"><span class="nf-stat-label">${m}</span><span class="nf-stat-val" id="${h}">${C}</span></div>`).join(""),w.appendChild(E),D.appendChild(w),_.appendChild(D);const B=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];re.forEach((m,h)=>{const C=Lt(m);C.classList.add(B[h]),C.id=`nf-mod-${m.id}`,_.appendChild(C)}),t.appendChild(_);for(let m=0;m<30;m++){const h=document.createElement("div");h.className="nf-particle",h.style.left=`${5+Math.random()*90}%`,h.style.bottom=`${Math.random()*40}%`,h.style.animationDuration=`${3+Math.random()*5}s`,h.style.animationDelay=`${Math.random()*4}s`;const C=.3+Math.random()*.4,U=.7+Math.random()*.3;h.style.background=`rgba(${Math.floor(te*U)}, ${Math.floor(ne*U)}, ${Math.floor(oe*U)}, ${C})`,h.style.width=`${1+Math.random()*2}px`,h.style.height=h.style.width,t.appendChild(h)}return t}function Lt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(i=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(f)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Vt(){it=Date.now(),De=setInterval(()=>{const t=Math.floor((Date.now()-it)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function ct(){De&&(clearInterval(De),De=null)}const Gt=120,dt=160,pt=.4;let xe=null,ft=0,ut=0,gt=0,_e=[];function qt(t,e){_e=[];for(let r=0;r<Gt;r++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const f=Math.random()*t,l=Math.random()*e,c=50+Math.random()*220,s=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);_e.push({x:i===0?Math.random()*t:f+Math.cos(s)*c,y:i===0?Math.random()*e:l+Math.sin(s)*c,vx:(Math.random()-.5)*pt,vy:(Math.random()-.5)*pt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:f,oCy:l,oRadius:c,oAngle:s,oSpeed:p})}}function Ut(){if(!le)return;const t=le;if(Se=t.getContext("2d"),!Se)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,_e.length===0&&qt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,i=0,f=!1;function l(){if(!Se||!le){Me=null;return}if(Me=requestAnimationFrame(l),f=!f,f)return;const c=Se,s=le.width,p=le.height;c.fillStyle=`rgba(${te*.04|0},${ne*.04|0},${oe*.06|0},1)`,c.fillRect(0,0,s,p),(!r||a!==s||i!==p)&&(a=s,i=p,r=c.createRadialGradient(s*.5,p*.5,0,s*.5,p*.5,Math.max(s,p)*.6),r.addColorStop(0,`rgba(${te*.08|0},${ne*.08|0},${oe*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=r,c.fillRect(0,0,s,p);const x=_e,y=x.length,S=dt*dt;for(let b=0;b<y;b++){const o=x[b];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>s&&(o.x=s,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>p&&(o.y=p,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const u=o.oAngle,v=o.oRadius*.7;o.x=o.oCx+v*Math.cos(u),o.y=o.oCy+v*Math.sin(u)*Math.cos(u),o.oCx+=Math.sin(u*.15)*.12,o.oCy+=Math.cos(u*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const u=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*u,o.y=o.oCy+Math.sin(o.oAngle)*u,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=s+30:o.x>s+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const u=o.oRadius+50;o.oCx<-u?o.oCx=s+u:o.oCx>s+u&&(o.oCx=-u),o.oCy<-u?o.oCy=p+u:o.oCy>p+u&&(o.oCy=-u)}}c.beginPath(),c.strokeStyle=`rgba(${te},${ne},${oe},0.06)`,c.lineWidth=.4;const O=new Path2D;for(let b=0;b<y;b++){const o=x[b];for(let u=b+1;u<y;u++){const v=x[u],V=o.x-v.x,_=o.y-v.y,D=V*V+_*_;D<S&&(1-D/S<.4?(c.moveTo(o.x,o.y),c.lineTo(v.x,v.y)):(O.moveTo(o.x,o.y),O.lineTo(v.x,v.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${te},${ne},${oe},0.18)`,c.lineWidth=.8,c.stroke(O),!xe||ft!==te||ut!==ne||gt!==oe){xe=document.createElement("canvas");const b=48;xe.width=b,xe.height=b;const o=xe.getContext("2d"),u=o.createRadialGradient(b/2,b/2,0,b/2,b/2,b/2);u.addColorStop(0,`rgba(${te},${ne},${oe},0.9)`),u.addColorStop(.3,`rgba(${te},${ne},${oe},0.35)`),u.addColorStop(1,`rgba(${te},${ne},${oe},0)`),o.fillStyle=u,o.fillRect(0,0,b,b),ft=te,ut=ne,gt=oe}const P=xe;for(let b=0;b<y;b++){const o=x[b],u=.6+.4*Math.sin(o.pulsePhase),v=o.radius*5*(.8+u*.4);c.globalAlpha=.5+u*.4,c.drawImage(P,o.x-v/2,o.y-v/2,v,v)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let b=0;b<y;b++){const o=x[b];if(o.radius>2){const u=.6+.4*Math.sin(o.pulsePhase),v=o.radius*(.8+u*.4)*.35;c.moveTo(o.x+v,o.y),c.arc(o.x,o.y,v,0,Math.PI*2)}}c.fill()}l()}function Ht(){Me!==null&&(cancelAnimationFrame(Me),Me=null),le=null,Se=null,_e=[]}let Ie=null;const Fe=560,Wt=140,mt=Fe/2,ht=Wt/2,bt=[];for(let t=0;t<=Fe;t+=8){const e=Math.abs(t-mt)/mt;bt.push(Math.pow(Math.min(1,e*1.6),.6))}const Yt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Fe,off:t*.6,spd:.7+t*.12}));let He=!1;function wt(){if(Te=requestAnimationFrame(wt),He=!He,He)return;if(Ue+=.07,!Ie){const e=document.getElementById("nf-engine-waves");if(!e){Te=null;return}Ie=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ie.length;e++){const r=Yt[e],a=Ue*r.spd+r.off;t.length=0,t.push(`M 0 ${ht}`);let i=0;for(let f=0;f<=Fe;f+=8){const l=ht+r.amp*bt[i++]*Math.sin(f*r.freq+a);t.push(`L${f} ${l*10+.5|0}`)}Ie[e].setAttribute("d",t.join(" "))}}function Xt(){Ue=0,wt(),Ut(),Re=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function xt(){Te!==null&&(cancelAnimationFrame(Te),Te=null),Re&&(clearInterval(Re),Re=null),Ie=null,Ht()}function ze(){let t=0;const e=X.filter(p=>p.status!=="skipped").length;for(const p of X){const x=document.getElementById(`nf-proc-${p.stepId}`);if(!x)continue;x.className="nf-proc-row";const y=x.querySelector(".nf-proc-badge");switch(p.status){case"done":x.classList.add("nf-proc-done"),y&&(y.textContent="✅ done"),t++;break;case"active":x.classList.add("nf-proc-active"),y&&(y.textContent=p.progress!==void 0&&p.progress>0?`⏳ ${p.progress}%`:"⏳ active");break;case"error":x.classList.add("nf-proc-error"),y&&(y.textContent="❌ error");break;case"skipped":x.classList.add("nf-proc-skipped"),y&&(y.textContent="— skip");break;default:x.classList.add("nf-proc-waiting"),y&&(y.textContent="(queued)")}}const r=X.findIndex(p=>p.status==="active"),a=r>=0?r+1:t>=e&&e>0?X.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${X.length}`);const f=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(f&&(f.textContent="COMPLETE",f.style.color=J.doneHex),l&&(l.style.background=J.doneHex,l.style.boxShadow=`0 0 8px rgba(${J.doneRgb},0.7)`)):X.some(x=>x.status==="error")?(f&&(f.textContent="ERROR",f.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(x=>x.status==="active")&&f&&(f.textContent="ACTIVE",f.style.color=J.hex,f.style.textShadow=`0 0 10px rgba(${J.rgb},0.5)`);const c=document.getElementById("nf-terminal"),s=c==null?void 0:c.querySelector(".nf-proc-active");s&&c&&s.scrollIntoView({behavior:"smooth",block:"center"})}function yt(){Q&&Q.isConnected||(at(),Q=document.createElement("button"),Q.id="nf-toggle-btn",Q.className="nf-toggle-visible",Q.innerHTML=ue?nt:ot,Q.title="ซ่อน/แสดง Netflow Overlay",Q.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",Q.onclick=()=>vt(),document.body.appendChild(Q))}function vt(){W&&(yt(),ue?(W.classList.remove("nf-hidden"),W.classList.add("nf-visible"),W.style.opacity="1",W.style.pointerEvents="auto",Q&&(Q.innerHTML=ot),ue=!1):(W.classList.remove("nf-visible"),W.classList.add("nf-hidden"),W.style.opacity="0",W.style.pointerEvents="none",Q&&(Q.innerHTML=nt),ue=!0))}const $t={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function Et(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Ce;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=$t[e]||$t.green;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const i=J.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function We(t=1){if(J=Ft(),tt(),W&&W.isConnected){for(const e of re)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;we=t,X=Oe(t),st();for(const e of re)Ye(e);Ne(),ze(),ue&&vt();return}W&&!W.isConnected&&(W=null),fe&&(fe.remove(),fe=null),at();for(const e of re)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;if(we=t,X=Oe(t),t>1){const e=re.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const r=re.find(a=>a.id==="render");if(r){const a=r.steps.find(f=>f.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=r.steps.find(f=>f.id==="upscale");i&&(i.label="Full Video")}}W=Nt(),W.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(W),W.classList.add("nf-visible"),ue=!1,yt(),Vt(),Xt(),requestAnimationFrame(()=>Et())}function kt(){ct(),xt(),ue=!1,W&&(W.classList.add("nf-fade-out"),setTimeout(()=>{W==null||W.remove(),W=null},500)),Q&&(Q.remove(),Q=null)}const jt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Kt(t,e,r){const a=X.findIndex(y=>y.status==="active"),i=X.filter(y=>y.status==="done").length,f=X.length,l=a>=0?a+1:i>=f?f:i,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${l}/${f}`);let s=1;for(const y of X)if(y.status==="active"||y.status==="done")if(y.stepId.startsWith("scene")){const S=y.stepId.match(/^scene(\d+)-/);S&&(s=Math.max(s,parseInt(S[1],10)))}else(y.stepId==="download"||y.stepId==="upscale"||y.stepId==="open")&&(s=we);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=we>1?`${s}/${we}`:"1/1"),e==="active"){const y=document.getElementById("nf-stat-status"),S=jt[t]||t.toUpperCase();y&&(y.textContent=S)}else if(e==="done"&&i>=f){const y=document.getElementById("nf-stat-status");y&&(y.textContent="COMPLETE")}else if(e==="error"){const y=document.getElementById("nf-stat-status");y&&(y.textContent="ERROR")}const x=document.getElementById("nf-stat-progress");x&&(r!==void 0&&r>0?x.textContent=`${Math.min(100,r)}%`:e==="active"&&(x.textContent="—"))}function k(t,e,r){if(!W)return;for(const i of re)for(const f of i.steps)f.id===t&&(f.status=e,r!==void 0&&(f.progress=r));for(const i of X)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),Kt(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}Ne(),ze()}function ye(t){k(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Pe(t=4e3){ct(),xt(),Ne(),ze(),setTimeout(()=>kt(),t)}function Ne(){for(const t of re){const e=t.steps.filter(s=>s.status!=="skipped").length,r=t.steps.filter(s=>s.status==="done").length,a=t.steps.some(s=>s.status==="active"),i=e>0?Math.round(r/e*100):0,f=document.getElementById(`nf-pct-${t.id}`);f&&(f.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):a&&c.classList.add("nf-active"))}}function Qt(t){var a,i,f,l;we=t;const e=new Map;for(const c of X)e.set(c.stepId,{status:c.status,progress:c.progress});X=Oe(t);for(const c of X){const s=e.get(c.stepId);s&&(c.status=s.status,s.progress!==void 0&&(c.progress=s.progress))}if(st(),t>1){const c=re.find(s=>s.id==="video");if(c){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=c.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(p=>p.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((f=c.steps.find(p=>p.id==="vid-generate"))==null?void 0:f.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(p=>p.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)s.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),s.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),s.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});c.steps=s,Ye(c)}}const r=re.find(c=>c.id==="render");if(r&&t>1){const c=r.steps.find(p=>p.id==="download");c&&(c.label="ดาวน์โหลด 720p");const s=r.steps.find(p=>p.id==="upscale");s&&(s.label="Full Video"),Ye(r)}Ne(),ze()}function Ye(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const f=document.createElement("div");f.className="nf-step",f.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),f.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(f)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Le(t){t.replace(/^\[Netflow AI\]\s*/,"")}let ve=null,ge=null;const Jt=new Promise(t=>{ge=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(ve=t.tabId,console.log(`[Netflow AI] Tab ID: ${ve}`)),ge&&(ge(ve),ge=null)})}catch{ge&&(ge(null),ge=null)}function ce(){return ve?`netflow_pending_action_${ve}`:"netflow_pending_action"}function Ct(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Le(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},M=t=>{console.warn(`[Netflow AI] ${t}`);try{Le(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Xe(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?M(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){M(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function je(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},f=>{if(chrome.runtime.lastError){i(!1);return}i(!!(f!=null&&f.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const f of i){const l=f.src||f.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,a=0;for(const i of e){let f=i.src||"";if(!f){const s=i.querySelector("source");s&&(f=s.getAttribute("src")||"")}if(!f&&i.currentSrc&&(f=i.currentSrc),!f)continue;if(K()){r||(r=f,a=1);continue}const l=i.getBoundingClientRect(),c=l.width*l.height;l.width>50&&c>a&&(a=c,r=f)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(r);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Tt(r),r;const f=await i.blob(),l=(f.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${f.type}`),f.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${f.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((s,p)=>{const x=new FileReader;x.onloadend=()=>s(x.result),x.onerror=()=>p(new Error("FileReader error")),x.readAsDataURL(f)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},p=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):p!=null&&p.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${p==null?void 0:p.error}`),s()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Tt(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Tt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function Ke(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Qe=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Je=/Win/i.test(navigator.userAgent),$e=Qe?"🍎 Mac":Je?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${$e}`),window.__VIDEO_COMPLETE_SENT__=!1;class Ze extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Ae=null,me=null,St=!1;const Ee=new Map;let Mt=0;function Zt(){if(Ae)return Ae;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Ae=new Worker(URL.createObjectURL(t)),Ae.onmessage=e=>{const r=Ee.get(e.data);r&&(Ee.delete(e.data),r())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Ae}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function en(){if(me)return me;if(St)return null;try{return me=chrome.runtime.connect({name:"timer"}),me.onMessage.addListener(t=>{const e=Ee.get(t.id);e&&(Ee.delete(t.id),e())}),me.onDisconnect.addListener(()=>{me=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),me}catch{return St=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const g=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new Ze);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return r(new Ze);e()}},f=Zt();if(f){const s=++Mt;Ee.set(s,i),f.postMessage({id:s,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const l=en();if(l){const s=++Mt;Ee.set(s,i),l.postMessage({cmd:"delay",id:s,ms:t});return}const c=setTimeout(i,t);g._lastId=c});function he(){return!!window.__NETFLOW_STOP__}const K=()=>document.hidden;let _t=0;async function be(){if(!document.hidden)return!1;const t=Date.now();if(t-_t<15e3)return!1;_t=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await g(1500),!0}catch{return!1}}async function It(){if(!document.hidden)return!0;n("🔄 Tab ซ่อนอยู่ — ดึงหน้าต่าง Chrome ขึ้นมาข้างหน้า...");try{await new Promise(e=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>e()));const t=Date.now();for(;document.hidden&&Date.now()-t<5e3;)await g(200);return document.hidden?(n("⚠️ Tab ยังซ่อนอยู่หลัง 5 วินาที"),!1):(n("✅ Tab กลับมาแสดงผลแล้ว"),await g(500),!0)}catch{return n("⚠️ ensureTabVisible ล้มเหลว"),!1}}function Pt(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const f of t)if(i.includes(f))return((r=a.textContent)==null?void 0:r.trim())||f}}return null}async function ee(t){if(K()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await g(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await g(50),t.click()}function tn(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function nn(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let f=a,l=null,c=1/0;for(let s=0;s<20&&f&&(f=f.parentElement,!(!f||f===document.body));s++){if(K()){s>=3&&f.children.length>0&&!l&&(l=f);continue}const p=f.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const x=p.width*p.height;x<c&&(l=f,c=x)}}l&&!e.includes(l)&&e.push(l)}return e.sort((a,i)=>{const f=a.getBoundingClientRect(),l=i.getBoundingClientRect();return f.left-l.left}),e}function et(t=!1){const e=[],r=document.querySelectorAll("video");for(const l of r){let c=l.parentElement;for(let s=0;s<10&&c;s++){if(K()){if(s>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const p=c.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:c,left:p.left});break}c=c.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of a){const c=(l.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let s=l.parentElement;for(let p=0;p<10&&s;p++){if(K()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const x=s.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:s,left:x.left});break}s=s.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const c=(l.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let s=l.parentElement;for(let p=0;p<10&&s;p++){if(K()){if(p>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const x=s.getBoundingClientRect();if(x.width>120&&x.height>80&&x.width<window.innerWidth*.7&&x.top>=-50&&x.left<window.innerWidth*.75){e.push({el:s,left:x.left});break}s=s.parentElement}}}const f=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(c=>c.el===l));if(f.sort((l,c)=>l.left-c.left),f.length>0){const l=f[0].el,c=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function on(){const t=nn("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let i=0;i<10&&a;i++){if(K()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const f=a.getBoundingClientRect();if(f.width>100&&f.height>80&&f.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${f.left.toFixed(0)},${f.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function an(t,e){var c;const[r,a]=t.split(","),i=((c=r.match(/:(.*?);/))==null?void 0:c[1])||"image/png",f=atob(a),l=new Uint8Array(f.length);for(let s=0;s<f.length;s++)l[s]=f.charCodeAt(s);return new File([l],e,{type:i})}function Ve(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((a=i.textContent)==null?void 0:a.trim())===t){const f=i.closest("button");f&&e.push(f)}return e}function rn(){const t=[...Ve("add"),...Ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const f=(i.textContent||"").trim();if(f!=="+"&&f!=="add")continue;if(K())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,r=0;for(const a of t){const i=a.getBoundingClientRect();i.y>r&&(r=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function At(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Ve(a);let f=null,l=0;for(const c of i){const s=c.getBoundingClientRect();s.y>l&&(l=s.y,f=c)}if(f)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${l.toFixed(0)}`),f}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){if(K())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const f=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(f?1e3:0);l>r&&(r=l,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function Bt(){const t=document.querySelectorAll("textarea");for(const a of t)if(K()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(K()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Ge(t,e){var r,a,i,f;t.focus(),await g(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),await g(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await g(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(c),await g(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await g(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await g(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=e,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await g(200),document.execCommand("paste"),await g(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let s=0;s<30&&c;s++){const p=c.memoizedProps,x=c.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const y=p.editor;y.selection,y.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((f=(i=x==null?void 0:x.memoizedState)==null?void 0:i.editor)!=null&&f.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),x.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function sn(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function ln(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${$e})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${$e})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function cn(t,e,r){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(x=>x.input)];for(const x of a)!i.includes(x)&&x.offsetParent===null&&i.push(x);for(const x of i)x.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const f=document.querySelectorAll('input[type="file"]');if(f.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${$e})`),!1;let l;if(r&&r.size>0){const x=Array.from(f).filter(y=>!r.has(y));x.length>0?(l=x[x.length-1],n(`เล็งเป้า file input ใหม่ (${x.length} ใหม่, ${f.length} ทั้งหมด)`)):(l=f[f.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${f.length} ตัว`))}else l=f[f.length-1];const c=new DataTransfer;c.items.add(e);try{l.files=c.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=l.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(x){n(`กำหนด target.files ล้มเหลว: ${x.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:c.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(y){return M(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${y.message}`),!1}}const s=l._valueTracker;s&&(s.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const x=new DataTransfer;x.items.add(e);const y=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:x});l.dispatchEvent(y),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${$e}`),!0}function Be(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(K()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;if(K()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}return t}async function Dt(t,e){var x;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=an(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Be();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async(y,S=8e3)=>{const O=Date.now();for(;Date.now()-O<S;){const P=Be();if(P>a)return n(`✅ [${y}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${P}`),!0;await g(500)}return n(`⚠️ [${y}] รูปย่อไม่เพิ่ม (ยังคง ${Be()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const f=rn();if(!f)return M("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const l=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${l.size} ตัว`);const c=ln();let s=sn();const p=new MutationObserver(y=>{for(const S of y)for(const O of S.addedNodes)if(O instanceof HTMLInputElement&&O.type==="file"&&(O.type="text",s.push({input:O,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),O instanceof HTMLElement){const P=O.querySelectorAll('input[type="file"]');for(const b of P)b.type="text",s.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{f.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await g(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let y=!1;const S=Date.now();for(;!y&&Date.now()-S<8e3;){const P=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const b of P){if(b===f)continue;const o=b.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const u of o){const v=((x=u.textContent)==null?void 0:x.trim())||"";if(v==="upload"||v==="upload_file"||v==="add_photo_alternate"){const V=Array.from(b.querySelectorAll("i")).map(_=>{var D;return(D=_.textContent)==null?void 0:D.trim()});if(!V.includes("drive_folder_upload")&&!V.includes("photo_library")){b.click(),y=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${v}) ✅`);break}}}if(y)break}if(!y)for(const b of P){if(b===f)continue;const o=b.childNodes.length<=8?(b.textContent||"").trim():"";if(o.length>0&&o.length<60){const u=o.toLowerCase();if(u.includes("ไลบรารี")||u.includes("library")||u.includes("drive")||u.includes("ไดรฟ์"))continue;if(u==="upload"||u==="อัปโหลด"||u==="อัพโหลด"||u.includes("upload image")||u.includes("upload photo")||u.includes("upload a file")||u.includes("upload file")||u.includes("อัปโหลดรูปภาพ")||u.includes("อัพโหลดรูปภาพ")||u.includes("อัปโหลดไฟล์")||u.includes("อัพโหลดไฟล์")||u.includes("from computer")||u.includes("จากคอมพิวเตอร์")||u.includes("from device")||u.includes("จากอุปกรณ์")||u.includes("my computer")||u.includes("คอมพิวเตอร์ของฉัน")){b.click(),y=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!y)for(const b of P){if(b===f)continue;const o=(b.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก")||o.includes("ไลบรารี")||o.includes("library"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const u=b.getBoundingClientRect();if(u.width>0&&u.height>0){b.click(),y=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}y||await g(500)}return y?(await g(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),cn(s,r,l)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(M(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(M("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1)}finally{p.disconnect(),c();for(const y of s)y.input.type!=="file"&&(y.input.type="file")}}async function dn(t,e){var P;n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button, div, span, [role='button']");let a=null;for(const b of r){const o=(b.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const u=b.getBoundingClientRect();u.bottom>window.innerHeight*.7&&u.width>30&&u.height>10&&(!a||(b.textContent||"").length<(a.textContent||"").length)&&(a=b)}}if(a&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(a.textContent||"").substring(0,40).trim()}"`),!a){const b=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of b){const u=((P=o.textContent)==null?void 0:P.trim())||"";if(u.includes("crop")||u==="aspect_ratio"||u==="photo_size_select_large"){const v=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if(v){const V=v.getBoundingClientRect();if(V.bottom>window.innerHeight*.7&&V.width>0){a=v,n(`พบปุ่มตั้งค่าจากไอคอน: ${u}`);break}}}}}if(!a)for(const b of r){const o=(b.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const u=b.getBoundingClientRect();if(u.bottom>window.innerHeight*.7&&u.width>30){a=b,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!a)return M("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),f=i.left+i.width/2,l=i.top+i.height/2,c={bubbles:!0,cancelable:!0,clientX:f,clientY:l,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("คลิกปุ่มตั้งค่าแล้ว"),await g(1500);let s=!1,p=null;const x=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const b of x){const o=b.getAttribute("aria-controls")||"",u=b.id||"";if(o.toUpperCase().includes("IMAGE")||u.toUpperCase().includes("IMAGE")){p=b,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!p)for(const b of document.querySelectorAll('[role="tab"]')){const o=b.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){p=b,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!p)for(const b of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(b.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const u=b.getBoundingClientRect();if(u.width>0&&u.height>0){p=b,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(p){const b=p.getAttribute("data-state")||"",o=p.getAttribute("aria-selected")||"";if(b==="active"||o==="true")s=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const u=p.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),p.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",v)),p.dispatchEvent(new MouseEvent("click",v)),s=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await g(400)}}s||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const y=t==="horizontal"?"แนวนอน":"แนวตั้ง",S=t==="horizontal"?"landscape":"portrait";for(const b of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(b.textContent||"").trim();if(!(o.length>30)&&(o===y||o.includes(y)||o.toLowerCase()===S||o.toLowerCase().includes(S))){const u=b.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",v)),b.dispatchEvent(new MouseEvent("click",v)),n(`เลือกทิศทาง: ${y}`),await g(400);break}}const O=`x${e}`;for(const b of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(b.textContent||"").trim();if(!(o.length>10)&&(o===O||o===`${e}`)){const u=b.getBoundingClientRect(),v={bubbles:!0,cancelable:!0,clientX:u.left+u.width/2,clientY:u.top+u.height/2,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",v)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",v)),b.dispatchEvent(new MouseEvent("click",v)),n(`เลือกจำนวน: ${O}`),await g(400);break}}return await g(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await g(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("ปิดหน้าตั้งค่าแล้ว"),await g(600),!0}async function pn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",f=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const c=Date.now()+1e4;for(;!l&&Date.now()<c;){const b=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of b){const u=(o.textContent||"").trim();if(!(u.length>80)&&(u.includes("Veo")||u.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||u.includes("arrow_drop_down")||o.querySelector("svg"))){l=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${u.substring(0,50).trim()}"`);break}}if(!l)for(const o of b){const u=(o.textContent||"").trim();if(!(u.length>80)&&(u.includes("Veo")||u.includes("veo"))){const v=o.getBoundingClientRect();if(v.width>0&&v.height>0){l=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${u.substring(0,50).trim()}"`);break}}}if(!l)for(const o of b){const u=(o.textContent||"").trim();if(!(u.length>50)&&(u.includes("Fast")||u.includes("Quality")||u.includes("เร็ว")||u.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){l=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${u.substring(0,50).trim()}"`);break}}if(!l){const o=document.querySelectorAll("div, span, button, [role='button']");for(const u of o){const v=(u.textContent||"").trim();if(v==="Veo 3.1 - Fast"||v==="Veo 3.1 - Quality"||v==="Fast"||v==="Quality"||v==="Veo 3.1 - เร็ว"||v==="Veo 3.1 - คุณภาพสูง"||v==="Veo 3.1 - คุณภาพ"||v==="Veo 2 - Fast"||v==="Veo 2 - Quality"){const V=u.getBoundingClientRect();if(V.width>0&&V.height>0){l=u,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${v}"`);break}}}}if(!l){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const u of o){const v=(u.textContent||"").trim();if(!(v.length>60)&&(v.includes("3.1")||v.includes("model")||v.includes("โมเดล"))){const V=u.getBoundingClientRect();if(V.bottom>window.innerHeight*.4&&V.width>0&&V.height>0){l=u,n(`พบปุ่ม model selector (Strategy E): "${v.substring(0,50).trim()}"`);break}}}}l||await g(1e3)}if(!l)return M("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(l.textContent||"").trim();if(s.includes(e)||s.includes(r)&&!s.includes(a)||s.includes(i)&&!s.includes(f))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const p=l.getBoundingClientRect(),x=p.left+p.width/2,y=p.top+p.height/2,S={bubbles:!0,cancelable:!0,clientX:x,clientY:y,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",S)),await g(80),l.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",S)),l.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await g(1e3);let O=!1;const P=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const b of P){const o=(b.textContent||"").trim();if((o===e||o===r||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const v=b.getBoundingClientRect();if(v.width>0&&v.height>0){const V=v.left+v.width/2,_=v.top+v.height/2,D={bubbles:!0,cancelable:!0,clientX:V,clientY:_,button:0};b.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mousedown",D)),await g(80),b.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),b.dispatchEvent(new MouseEvent("mouseup",D)),b.dispatchEvent(new MouseEvent("click",D)),n(`✅ เลือก "${o}" สำเร็จ`),O=!0;break}}}return O?(await g(600),!0):(M(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),!1)}async function fn(t){var V,_,D,H;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",i=Qe?"macOS":Je?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",f=Qe?((_=(V=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:V[1])==null?void 0:_.replace(/_/g,"."))||"":Je&&((D=e.match(/Windows NT ([0-9.]+)/))==null?void 0:D[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${f} | Chrome ${a}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${c} | แพลตฟอร์ม: ${$e}`),n("══════════════════════════════════════════");try{qe(t.theme)}catch{}try{We()}catch(d){console.warn("Overlay show error:",d)}const s=[],p=[];try{k("settings","active");const d=t.orientation||"horizontal",w=t.outputCount||1,T=await dn(d,w);s.push(T?"✅ Settings":"⚠️ Settings"),k("settings",T?"done":"error")}catch(d){M(`ตั้งค่าผิดพลาด: ${d.message}`),s.push("⚠️ Settings"),k("settings","error")}try{const d=t.veoQuality||"fast";await pn(d)?(s.push(`✅ Veo ${d}`),n(`✅ Veo quality: ${d}`)):(s.push("⚠️ Veo quality"),M("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(d){M(`Veo quality error: ${d.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(300),document.body.click(),await g(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const x=()=>{const d=document.querySelectorAll("span, div, p, label");for(const w of d){const T=(w.textContent||"").trim();if(/^\d{1,3}%$/.test(T)){if(T==="100%")return null;const I=w.getBoundingClientRect();if(I.width>0&&I.height>0&&I.top>0&&I.top<window.innerHeight)return T}}return null},y=async d=>{n(`รอการอัพโหลด ${d} เสร็จ...`),await g(2e3);const w=Date.now(),T=6e4;let I="",A=Date.now();const $=15e3;for(;Date.now()-w<T;){const E=x();if(E){if(E!==I)I=E,A=Date.now(),n(`กำลังอัพโหลด: ${E} — รอ...`);else if(Date.now()-A>$){n(`✅ อัพโหลด ${d} — % ค้างที่ ${E} นาน ${$/1e3} วินาที ถือว่าเสร็จ`),await g(1e3);return}await g(1500)}else{n(`✅ อัพโหลด ${d} เสร็จ — ไม่พบตัวบอก %`),await g(1e3);return}}M(`⚠️ อัพโหลด ${d} หมดเวลาหลัง ${T/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){k("upload-char","active");try{const d=await Dt(t.characterImage,"character.png");s.push(d?"✅ ตัวละคร":"⚠️ ตัวละคร"),d||p.push("character upload failed"),k("upload-char",d?"done":"error")}catch(d){M(`อัพโหลดตัวละครผิดพลาด: ${d.message}`),s.push("❌ ตัวละคร"),p.push("character upload error"),k("upload-char","error")}await y("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500)}else ye("upload-char");if(t.productImage){k("upload-prod","active");try{const d=await Dt(t.productImage,"product.png");s.push(d?"✅ สินค้า":"⚠️ สินค้า"),d||p.push("product upload failed"),k("upload-prod",d?"done":"error")}catch(d){M(`อัพโหลดสินค้าผิดพลาด: ${d.message}`),s.push("❌ สินค้า"),p.push("product upload error"),k("upload-prod","error")}await y("product"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(500)}else ye("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await g(800);const S=x();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await y("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await g(1e3);const O=(t.characterImage?1:0)+(t.productImage?1:0);if(O>0){let d=Be();d<O&&(n(`⏳ เห็นรูปย่อแค่ ${d}/${O} — รอ 3 วินาที...`),await g(3e3),d=Be()),d>=O?n(`✅ ยืนยันรูปย่ออ้างอิง: ${d}/${O}`):M(`⚠️ คาดว่าจะมี ${O} รูปย่อ แต่พบ ${d} — ดำเนินการต่อ`)}if(he()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{Pe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),k("img-prompt","active"),await g(1e3);let P=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง Image prompt + กด Generate");try{await new Promise(w=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>w())),P=!0;const d=Date.now();for(;document.hidden&&Date.now()-d<5e3;)await g(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว"),await g(500))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}let b=!1;for(let d=1;d<=3&&!b;d++){const w=Bt();if(!w){n(`⚠️ ครั้งที่ ${d}: ไม่พบช่อง Image Prompt — รอแล้วลองใหม่`),await g(2e3);continue}if(d>1){if(document.hidden)try{await new Promise(A=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>A())),P=!0;const I=Date.now();for(;document.hidden&&Date.now()-I<5e3;)await g(200);document.hidden||await g(500)}catch{}w.focus(),await g(500)}await Ge(w,t.imagePrompt),await g(500);const T=(w.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();T.length>=20?(n(`วาง Image Prompt สำเร็จ ครั้งที่ ${d} (${T.length} ตัวอักษร)`),s.push("✅ Prompt"),k("img-prompt","done"),b=!0):(n(`⚠️ ครั้งที่ ${d}: Image Prompt ไม่ถูกวาง (ได้ ${T.length} ตัวอักษร)`),await g(1500))}if(!b)return M("❌ วาง Image Prompt ไม่สำเร็จหลังลอง 3 ครั้ง — หยุด ไม่กด Generate"),s.push("❌ Prompt"),p.push("image prompt paste failed after 3 attempts"),k("img-prompt","error"),{success:!1,message:"❌ วาง Prompt ไม่สำเร็จ",step:"img-prompt"};await g(800);const o=new Set;document.querySelectorAll("img").forEach(d=>{d.src&&o.add(d.src)}),n(`บันทึกรูปเดิม: ${o.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),k("img-generate","active"),await g(500);const u=At();if(u){const d=u.getBoundingClientRect(),w=d.left+d.width/2,T=d.top+d.height/2,I={bubbles:!0,cancelable:!0,clientX:w,clientY:T,button:0};u.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",I)),u.dispatchEvent(new MouseEvent("click",I)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await g(500),u.dispatchEvent(new PointerEvent("pointerdown",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousedown",I)),await g(80),u.dispatchEvent(new PointerEvent("pointerup",{...I,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseup",I)),u.dispatchEvent(new MouseEvent("click",I)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),k("img-generate","done")}else M("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),p.push("generate button not found"),k("img-generate","error");if(P){await g(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — รูปภาพกำลังสร้างเบื้องหลัง")}n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),k("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await g(15e3);const d=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const E of $){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim();if(B.length>10)continue;const m=B.match(/(\d{1,3})\s*%/);if(!m)continue;const h=parseInt(m[1],10);if(h<1||h>100)continue;if(K())return h;const C=E.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return h}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let w=null,T=-1,I=0;const A=Date.now();for(;!w&&Date.now()-A<18e4;){const $=document.querySelectorAll("img");for(const E of $){if(o.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;if(K()?E.naturalWidth>120&&E.naturalHeight>120:(()=>{const h=E.getBoundingClientRect();return h.width>120&&h.height>120&&h.top>0&&h.top<window.innerHeight*.85})()){const h=E.closest("div");if(h){w=h,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...${K()?" (hidden-mode)":""}`);break}}}if(!w)for(const E of $){if(o.has(E.src))continue;const B=E.closest("div"),m=(B==null?void 0:B.textContent)||"";if(m.includes("product.png")||m.includes("character.png")||m.includes(".png")||m.includes(".jpg"))continue;if(K()?E.naturalWidth>120&&E.naturalHeight>120:(()=>{const C=E.getBoundingClientRect();return C.width>120&&C.height>120&&C.top>0&&C.top<window.innerHeight*.85})()){const C=E.closest("div");if(C){w=C,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...${K()?" (hidden-mode)":""}`);break}}}if(!w){if(he()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=Pt();if(E){M(`❌ สร้างรูปล้มเหลว: ${E}`),p.push(`image gen failed: ${E}`),k("img-wait","error");break}const B=d();B!==null?(B!==T&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${B}%`),T=B,k("img-wait","active",B)),I=Date.now()):T>30&&Math.floor((Date.now()-I)/1e3)>=3&&n(`🖼️ % หายที่ ${T}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&T>0&&Date.now()-I>1e4&&await be(),document.hidden&&T<1&&Date.now()-A>3e4&&await be(),await g(3e3)}}if(!w)M("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),k("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),k("img-wait","done",100),await It();const $=w.getBoundingClientRect(),E=$.left+$.width/2,B=$.top+$.height/2,m={bubbles:!0,cancelable:!0,clientX:E,clientY:B};w.dispatchEvent(new PointerEvent("pointerenter",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseenter",m)),w.dispatchEvent(new PointerEvent("pointerover",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseover",m)),w.dispatchEvent(new PointerEvent("pointermove",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousemove",m)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await g(1500);let h=null;for(const C of["more_vert","more_horiz","more"]){const U=Ve(C);for(const R of U){const F=R.getBoundingClientRect();if(F.top>=$.top-20&&F.top<=$.bottom&&F.right>=$.right-150&&F.right<=$.right+20){h=R;break}}if(h)break}if(!h){const C=document.querySelectorAll("button");for(const U of C){const R=U.getBoundingClientRect();if(R.width<50&&R.height<50&&R.top>=$.top-10&&R.top<=$.top+60&&R.left>=$.right-80){const F=U.querySelectorAll("i");for(const z of F)if((((H=z.textContent)==null?void 0:H.trim())||"").includes("more")){h=U;break}if(h)break;const N=U.getAttribute("aria-label")||"";if(N.includes("เพิ่มเติม")||N.includes("more")){h=U;break}}}}if(!h)M("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const C=h.getBoundingClientRect(),U=C.left+C.width/2,R=C.top+C.height/2,F={bubbles:!0,cancelable:!0,clientX:U,clientY:R,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",F)),await g(80),h.dispatchEvent(new PointerEvent("pointerup",{...F,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",F)),h.dispatchEvent(new MouseEvent("click",F)),n("คลิกปุ่ม 3 จุดแล้ว"),await g(1500);let N=null;const z=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const L of z){const Y=(L.textContent||"").trim();if(Y.includes("ทำให้เป็นภาพเคลื่อนไหว")||Y.includes("Animate")||Y.includes("animate")){N=L;break}}if(!N)M("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const L=N.getBoundingClientRect(),Y=L.left+L.width/2,ie=L.top+L.height/2,G={bubbles:!0,cancelable:!0,clientX:Y,clientY:ie,button:0};N.dispatchEvent(new PointerEvent("pointerdown",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mousedown",G)),await g(80),N.dispatchEvent(new PointerEvent("pointerup",{...G,pointerId:1,isPrimary:!0,pointerType:"mouse"})),N.dispatchEvent(new MouseEvent("mouseup",G)),N.dispatchEvent(new MouseEvent("click",G)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),k("animate","done"),await g(3e3)}}}}catch(d){M(`ขั้น 4 ผิดพลาด: ${d.message}`),s.push("⚠️ Animate")}if(he()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{Pe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),k("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await g(3e3);let d=!1;const w=document.querySelectorAll("button, span, div");for(const $ of w){const E=($.textContent||"").trim(),B=$.getBoundingClientRect();if((E==="วิดีโอ"||E==="Video"||E.includes("วิดีโอ"))&&B.bottom>window.innerHeight*.7){d=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}d||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let T=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(E=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>E())),T=!0;const $=Date.now();for(;document.hidden&&Date.now()-$<5e3;)await g(200);document.hidden?n("⚠️ Tab ยังซ่อนอยู่หลัง FOCUS_TAB 5 วิ — ลองวางต่อ"):(n("✅ Tab กลับมาแสดงผลแล้ว"),await g(500))}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await g(1e3);let I=!1;for(let $=1;$<=3&&!I;$++){const E=Bt();if(!E){n(`⚠️ ครั้งที่ ${$}: ไม่พบช่อง Prompt — รอแล้วลองใหม่`),await g(2e3);continue}if($>1){if(document.hidden)try{await new Promise(h=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>h())),T=!0;const m=Date.now();for(;document.hidden&&Date.now()-m<5e3;)await g(200);document.hidden||await g(500)}catch{}E.focus(),await g(500)}await Ge(E,t.videoPrompt),await g(500);const B=(E.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();B.length>=20?(n(`วาง Video Prompt สำเร็จ ครั้งที่ ${$} (${B.length} ตัวอักษร)`),s.push("✅ Video Prompt"),k("vid-prompt","done"),I=!0):(n(`⚠️ ครั้งที่ ${$}: Prompt ไม่ถูกวาง (ได้ ${B.length} ตัวอักษร)`),await g(1500))}if(!I)throw M("❌ วาง Video Prompt ไม่สำเร็จหลังลอง 3 ครั้ง — หยุด ไม่กด Generate"),s.push("❌ Video Prompt"),p.push("video prompt paste failed after 3 attempts"),k("vid-prompt","error"),new Error("Video prompt paste failed");await g(1e3),k("vid-generate","active");const A=At();if(A){const $=A.getBoundingClientRect(),E=$.left+$.width/2,B=$.top+$.height/2,m={bubbles:!0,cancelable:!0,clientX:E,clientY:B,button:0};A.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),A.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mouseup",m)),A.dispatchEvent(new MouseEvent("click",m)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),k("vid-generate","done"),await g(500),A.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mousedown",m)),await g(80),A.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mouseup",m)),A.dispatchEvent(new MouseEvent("click",m)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else M("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),p.push("video generate button not found"),k("vid-generate","error");if(T){await g(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(d){M(`ขั้น 5 ผิดพลาด: ${d.message}`),s.push("⚠️ Video Gen"),p.push(`video gen error: ${d.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),ye("animate"),ye("vid-prompt"),ye("vid-generate"),ye("vid-wait");if(t.videoPrompt){k("vid-wait","active");const d=t.sceneCount||1,w=t.videoScenePrompts||[t.videoPrompt];if(d>1)try{Qt(d)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${d>1?`ต่อ ${d} ฉาก`:"ดาวน์โหลด"} ===`);const T=()=>{const $=document.querySelectorAll("div, span, p, label, strong, small");for(const E of $){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim();if(B.length>10)continue;const m=B.match(/(\d{1,3})\s*%/);if(!m)continue;const h=parseInt(m[1],10);if(h<1||h>100)continue;if(K())return h;const C=E.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return h}return null},I=async($=6e5)=>{n("รอการสร้างวิดีโอ..."),k("vid-wait","active"),await g(5e3);const E=()=>{const G=document.querySelectorAll("div, span, p, label, strong, small");let j=0;for(const q of G){if(q.closest("#netflow-engine-overlay"))continue;const Z=(q.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const ae=q.tagName.toLowerCase(),se=q.className&&typeof q.className=="string"?q.className.split(/\s+/).slice(0,2).join(" "):"",de=q.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${ae}.${se}> ที่ (${de.left.toFixed(0)},${de.top.toFixed(0)}) w=${de.width.toFixed(0)}`),j++,j>=5)break}}j===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},B=et();n(B?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),E();const m=Date.now();let h=-1,C=0,U=!1;for(;Date.now()-m<$;){const G=T();if(G!==null){if(G!==h&&(n(`ความคืบหน้าวิดีโอ: ${G}%`),h=G,k("vid-wait","active",G)),C=Date.now(),G>=100){n("✅ ตรวจพบ 100%!"),U=!0;break}}else if(h>30){const j=Math.floor((Date.now()-C)/1e3);if(j>=5){n(`✅ % หายไปที่ ${h}% (หาย ${j} วินาที) — วิดีโอเสร็จ!`),U=!0;break}n(`⏳ % หายที่ ${h}% — ยืนยันใน ${5-j} วินาที...`)}else{const j=Math.floor((Date.now()-m)/1e3);j%15<3&&n(`⏳ รอ... (${j} วินาที) ไม่พบ %`)}if(!U&&h>0&&et(!0)&&!B){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${h}% — วิดีโอเสร็จ!`),U=!0;break}if(he())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(h<1){const j=Pt();if(j)return M(`❌ สร้างวิดีโอล้มเหลว: ${j}`),null}document.hidden&&h>0&&Date.now()-C>1e4&&await be(),document.hidden&&h<1&&Date.now()-m>3e4&&await be(),await g(3e3)}await It();const R=et();if(!R)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),k("vid-wait","error"),null;const F=R;U?(k("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await g(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const N=F.getBoundingClientRect();let z=N.left+N.width/2,L=N.top+N.height/2,Y=F;const ie=F.querySelector("video, img, canvas");if(ie){const G=ie.getBoundingClientRect();G.width>50&&G.height>50&&(z=G.left+G.width/2,L=G.top+G.height/2,Y=ie,n(`🎯 พบรูปย่อ <${ie.tagName.toLowerCase()}> ในการ์ดที่ (${z.toFixed(0)},${L.toFixed(0)}) ${G.width.toFixed(0)}x${G.height.toFixed(0)}`))}else L=N.top+N.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${z.toFixed(0)},${L.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${z.toFixed(0)}, ${L.toFixed(0)})...`),tn(Y);for(let G=0;G<8;G++){const j={bubbles:!0,cancelable:!0,clientX:z+G%2,clientY:L};Y.dispatchEvent(new PointerEvent("pointermove",{...j,pointerId:1,isPrimary:!0,pointerType:"mouse"})),Y.dispatchEvent(new MouseEvent("mousemove",j)),await g(500)}try{chrome.storage.local.set({[ce()]:{timestamp:Date.now(),action:"mute_video",sceneCount:d,scenePrompts:w,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${d} ฉาก, ${w.length} prompts, theme: ${t.theme})`)}catch(G){n(`⚠️ ไม่สามารถบันทึก pending action: ${G.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await A(Y),n("✅ คลิกการ์ดวิดีโอเสร็จ"),F},A=async $=>{const E=$.getBoundingClientRect(),B=E.left+E.width/2,m=E.top+E.height/2,h={bubbles:!0,cancelable:!0,clientX:B,clientY:m,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",h)),await g(80),$.dispatchEvent(new PointerEvent("pointerup",{...h,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",h)),$.dispatchEvent(new MouseEvent("click",h)),await g(50),$.click(),n("คลิกการ์ดวิดีโอแล้ว"),await g(2e3)};try{if(!await I())M("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),k("vid-wait","error");else{s.push("✅ Video Complete"),k("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await g(3e3);const E=await new Promise(B=>{chrome.storage.local.get(ce(),m=>{if(chrome.runtime.lastError){B(null);return}B((m==null?void 0:m[ce()])||null)})});E&&!E._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(ce()),E.action==="mute_video"?await Rt(E.sceneCount||1,E.scenePrompts||[],E.theme):E.action==="wait_scene_gen_and_download"&&await Ot(E.sceneCount||2,E.currentScene||2,E.theme,E.scenePrompts||[]))}}catch($){M(`ขั้น 6 ผิดพลาด: ${$.message}`),s.push("⚠️ Step6"),p.push(`step 6: ${$.message}`)}}const v=p.length===0;try{Pe(v?5e3:8e3)}catch(d){console.warn("Overlay complete error:",d)}return{success:v,message:v?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${p.join(", ")}`,step:v?"done":"partial"}}async function Rt(t,e=[],r){var V;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&qe(r)}catch{}try{We(t)}catch(_){n(`⚠️ showOverlay error: ${_.message}`)}try{const _=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const D of _)k(D,"done");t>=2&&k("scene2-prompt","active"),n(`✅ overlay restored: ${_.length} steps done, sceneCount=${t}`)}catch(_){n(`⚠️ overlay restore error: ${_.message}`)}await g(1500);const a=(()=>{for(const _ of document.querySelectorAll("button")){const D=_.querySelectorAll("i");for(const d of D){const w=(d.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const T=_.getBoundingClientRect();if(T.width>0&&T.height>0)return _}}const H=(_.getAttribute("aria-label")||"").toLowerCase();if(H.includes("mute")||H.includes("ปิดเสียง")){const d=_.getBoundingClientRect();if(d.width>0&&d.height>0)return _}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await g(2e3);for(let m=2;m<=t;m++){const h=e[m-1];if(!h){M(`ไม่พบ prompt สำหรับฉากที่ ${m}`);continue}n(`── ฉากที่ ${m}/${t}: วาง prompt + generate ──`);let C=null;const U=Date.now();for(;!C&&Date.now()-U<1e4;){const q=document.querySelectorAll("[data-slate-editor='true']");if(q.length>0&&(C=q[q.length-1]),!C){const Z=document.querySelectorAll("[role='textbox'][contenteditable='true']");Z.length>0&&(C=Z[Z.length-1])}C||await g(1e3)}if(!C){M("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${C.tagName.toLowerCase()}> ${C.className.substring(0,40)}`),await Ge(C,h),n(`วาง prompt ฉาก ${m} (${h.length} ตัวอักษร) ✅`);try{k(`scene${m}-prompt`,"done"),k(`scene${m}-gen`,"active")}catch{}await g(1e3);const R=C.getBoundingClientRect();let F=null,N=1/0;for(const q of document.querySelectorAll("button")){if(q.disabled)continue;const Z=q.querySelectorAll("i");let ae=!1;for(const ke of Z)if((ke.textContent||"").trim()==="arrow_forward"){ae=!0;break}if(!ae)continue;const se=q.getBoundingClientRect();if(se.width<=0||se.height<=0)continue;const de=Math.abs(se.top-R.top)+Math.abs(se.right-R.right);de<N&&(N=de,F=q)}if(!F)for(const q of document.querySelectorAll("button")){const Z=q.querySelectorAll("i");for(const ae of Z)if((ae.textContent||"").trim()==="arrow_forward"){const se=q.getBoundingClientRect();if(se.width>0&&se.height>0){F=q;break}}if(F)break}if(!F){M("ไม่พบปุ่ม Generate/Send");return}await new Promise(q=>{chrome.storage.local.set({[ce()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:m,scenePrompts:e}},()=>q())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${m}/${t})`),await ee(F),n(`คลิก Generate ฉาก ${m} ✅`);try{k(`scene${m}-gen`,"done"),k(`scene${m}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${m} gen เสร็จ ──`),await g(5e3);let z=0,L=0;const Y=Date.now(),ie=6e5,G=5e3;let j=!1;for(;Date.now()-Y<ie;){let q=null;const Z=document.querySelectorAll("div, span, p, label, strong, small");for(const ae of Z){if(ae.closest("#netflow-engine-overlay"))continue;const de=(ae.textContent||"").trim().match(/^(\d{1,3})%$/);if(de){const ke=ae.getBoundingClientRect();if(ke.width>0&&ke.height>0&&ke.width<120&&ke.height<60){q=parseInt(de[1],10);break}}}if(q!==null){if(q!==z){n(`🎬 ฉาก ${m} ความคืบหน้า: ${q}%`),z=q;try{k(`scene${m}-wait`,"active",q)}catch{}}L=0}else if(z>0){if(L===0)L=Date.now(),n(`🔍 ฉาก ${m}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-L>=G){n(`✅ ฉาก ${m}: % หายไป ${G/1e3} วินาที — เจนเสร็จ!`),j=!0;break}}if(he()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&z>0&&L===0&&await be(),await g(2e3)}j||M(`ฉาก ${m} หมดเวลา`),n(`✅ ฉาก ${m} เสร็จแล้ว`);try{k(`scene${m}-wait`,"done",100)}catch{}chrome.storage.local.remove(ce()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await g(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{k("download","active")}catch{}let _=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อคลิกเมนูดาวน์โหลด (Radix UI)");try{await new Promise(m=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>m())),_=!0,await g(1500)}catch{}}await g(2e3);const D=Date.now();let H=null;const d=Date.now();for(;!H&&Date.now()-d<1e4;){for(const m of document.querySelectorAll("button")){const h=m.querySelector("i");if(h&&(h.textContent||"").trim()==="download"){const C=m.getBoundingClientRect();if(C.width>0&&C.height>0){H=m;break}}}H||await g(1e3)}if(!H){if(M("ไม่พบปุ่มดาวน์โหลด"),_)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}await ee(H),n("คลิกดาวน์โหลดแล้ว ✅");try{k("download","done"),k("upscale","active")}catch{}await g(1500);let w=null;for(let m=0;m<3&&!w;m++){m>0&&n(`🔄 ลองหา 720p ครั้งที่ ${m+1}...`);let h=null;const C=Date.now();for(;!h&&Date.now()-C<5e3;){for(const z of document.querySelectorAll("[role='menuitem']"))if((z.textContent||"").trim().includes("Full Video")&&z.querySelector("i")){const Y=z.getBoundingClientRect();if(Y.width>0&&Y.height>0){h=z;break}}h||await g(500)}if(!h){M("ไม่พบ Full Video");continue}const U=h.getBoundingClientRect(),R=U.left+U.width/2,F=U.top+U.height/2;h.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:R,clientY:F})),h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:F})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R,clientY:F})),await ee(h),n("คลิก/hover Full Video ✅"),await g(2e3);const N=Date.now();for(;!w&&Date.now()-N<8e3;){for(const z of document.querySelectorAll("button[role='menuitem']")){const L=z.querySelectorAll("span");for(const Y of L)if((Y.textContent||"").trim()==="720p"){const ie=z.getBoundingClientRect();if(ie.width>0&&ie.height>0){w=z;break}}if(w)break}w||(h.isConnected&&(h.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:R,clientY:F})),h.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:R+20,clientY:F}))),await g(500))}}if(!w){if(M("ไม่พบ 720p"),_)try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}return}if(await ee(w),n("คลิก 720p ✅"),_){try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — ดาวน์โหลดสั่งงานเสร็จแล้ว (รอไฟล์โหลดเบื้องหลัง)")}n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const T=Date.now();let I=!1,A=!1;for(;Date.now()-T<3e5;){for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div")){const h=(m.textContent||"").trim();if(h==="Download complete!"||h==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),I=!0;break}(h.includes("Downloading your extended video")||h.includes("กำลังดาวน์โหลด"))&&(A||(A=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(I)break;if(A){let m=!1;for(const h of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((h.textContent||"").trim().includes("Downloading")){m=!0;break}if(!m){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),I=!0;break}}if(he()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await g(2e3)}if(!I){M("เตรียมไฟล์หมดเวลา");return}try{k("upscale","done",100),k("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let $=!1;const E=Date.now();for(;Date.now()-E<6e4&&!$;){try{await new Promise(m=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},h=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):h!=null&&h.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${h.message}`),$=!0,h.downloadUrl&&(i=h.downloadUrl,n(`[TikTok] จะใช้ download URL: ${h.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-E)/1e3)}s)`),m()})})}catch(m){M(`ตรวจสอบผิดพลาด: ${m.message}`)}$||await g(3e3)}$||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await je();i||(i=B);try{k("open","done"),Pe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Ke(i),Xe(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await g(2e3);const f=(_,D="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const H of document.querySelectorAll(D)){const d=(H.textContent||"").trim();if(d.includes(_)&&d.length<100){const w=H.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return H}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const c=Date.now();for(;!l&&Date.now()-c<1e4;){for(const _ of document.querySelectorAll("button, [role='button']")){const D=(_.textContent||"").trim(),H=D.toLowerCase();if((H.includes("download")||H.includes("ดาวน์โหลด"))&&D.length<80){const d=_.getBoundingClientRect();if(d.width>0&&d.height>0){l=_;break}}}if(!l)for(const _ of document.querySelectorAll("button")){const D=(_.getAttribute("aria-label")||"").toLowerCase();if(D.includes("download")||D.includes("ดาวน์")){const H=_.getBoundingClientRect();if(H.width>0&&H.height>0){l=_;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await g(1e3))}if(!l){M("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await ee(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await g(1500);const s=Date.now();let p=null;const x=Date.now();for(;!p&&Date.now()-x<5e3;)p=f("1080p"),p||(n("รอ 1080p..."),await g(500));if(!p){M("ไม่พบ 1080p");return}await ee(p),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const y=Date.now();let S=!1,O=!1,P=0;const b=3e3;for(;Date.now()-y<3e5;){const D=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(D.includes("upscaling complete")||D.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const d of document.querySelectorAll("div, span, p")){const w=(d.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(V=d.textContent)==null?void 0:V.trim()}")`),S=!0;break}}if(S)break;if(D.includes("upscaling your video")||D.includes("กำลังอัปสเกล")){O=!0,P=0;const d=Math.floor((Date.now()-y)/1e3);n(`⏳ กำลังอัปสเกล... (${d} วินาที)`)}else if(O){if(P===0)P=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-P>=b){n(`✅ ข้อความ Upscaling หายไป ${b/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const d=Math.floor((Date.now()-y)/1e3);d%10<3&&n(`⏳ รอ Upscale... (${d} วินาที)`)}if(he()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await g(2e3)}if(!S){M("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let o=!1;const u=Date.now();for(;Date.now()-u<6e4&&!o;){try{await new Promise(_=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},D=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):D!=null&&D.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${D.message}`),o=!0,D.downloadUrl&&(i=D.downloadUrl,n(`[TikTok] จะใช้ download URL: ${D.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-u)/1e3)}s)`),_()})})}catch(_){M(`ตรวจสอบผิดพลาด: ${_.message}`)}o||await g(3e3)}o||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const v=await je();i||(i=v),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Ke(i),Xe(2e3)}async function Ot(t=2,e=2,r,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&qe(r)}catch{}try{We(t)}catch(d){n(`⚠️ showOverlay error: ${d.message}`)}try{const d=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)d.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&d.push(`scene${w}-wait`);for(const w of d)k(w,"done");k(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${d.length} steps done (scene ${e}/${t} navigate)`)}catch(d){n(`⚠️ overlay restore error: ${d.message}`)}await g(2e3);const i=(()=>{for(const d of document.querySelectorAll("button")){const w=d.querySelectorAll("i");for(const T of w){const I=(T.textContent||"").trim();if(I==="volume_up"||I==="volume_off"||I==="volume_mute"){const A=d.getBoundingClientRect();if(A.width>0&&A.height>0)return d}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let f=0,l=0;const c=Date.now(),s=6e5,p=5e3;let x=!1,y=0;for(;Date.now()-c<s;){let d=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const T of w){if(T.closest("#netflow-engine-overlay"))continue;const A=(T.textContent||"").trim().match(/^(\d{1,3})%$/);if(A){const $=T.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<120&&$.height<60){d=parseInt(A[1],10);break}}}if(d!==null){if(y=0,d!==f){n(`🎬 scene ${e} ความคืบหน้า: ${d}%`),f=d;try{k(`scene${e}-wait`,"active",d)}catch{}}l=0}else if(f>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${f}%) — กำลังยืนยัน...`);else if(Date.now()-l>=p){n(`✅ scene ${e}: % หายไป ${p/1e3} วินาที — เจนเสร็จ!`),x=!0;break}}else if(y++,y>=15){const T=document.querySelectorAll("video");let I=!1;for(const A of T)if(A.readyState>=2&&!A.paused&&A.getBoundingClientRect().width>200){I=!0;break}if(I){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),x=!0;break}if(y>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),x=!0;break}}document.hidden&&f>0&&l===0&&await be(),await g(2e3)}x||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{k(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await g(2e3);for(let d=e+1;d<=t;d++){const w=a[d-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${d} — ข้าม`);continue}n(`── ฉากที่ ${d}/${t}: วาง prompt + generate (pending recovery) ──`);let T=null;const I=Date.now();for(;!T&&Date.now()-I<1e4;){const R=document.querySelectorAll("[data-slate-editor='true']");if(R.length>0&&(T=R[R.length-1]),!T){const F=document.querySelectorAll("[role='textbox'][contenteditable='true']");F.length>0&&(T=F[F.length-1])}T||await g(1e3)}if(!T){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${d}`);break}await Ge(T,w),n(`วาง prompt ฉาก ${d} (${w.length} ตัวอักษร) ✅`);try{k(`scene${d}-prompt`,"done"),k(`scene${d}-gen`,"active")}catch{}await g(1e3);const A=T.getBoundingClientRect();let $=null,E=1/0;for(const R of document.querySelectorAll("button")){if(R.disabled)continue;const F=R.querySelectorAll("i");let N=!1;for(const Y of F)if((Y.textContent||"").trim()==="arrow_forward"){N=!0;break}if(!N)continue;const z=R.getBoundingClientRect();if(z.width<=0||z.height<=0)continue;const L=Math.abs(z.top-A.top)+Math.abs(z.right-A.right);L<E&&(E=L,$=R)}if(!$)for(const R of document.querySelectorAll("button")){const F=R.querySelectorAll("i");for(const N of F)if((N.textContent||"").trim()==="arrow_forward"){const z=R.getBoundingClientRect();if(z.width>0&&z.height>0){$=R;break}}if($)break}if(!$){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${d}`);break}await new Promise(R=>{chrome.storage.local.set({[ce()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:d,scenePrompts:a}},()=>R())}),await ee($),n(`คลิก Generate ฉาก ${d} ✅`);try{k(`scene${d}-gen`,"done"),k(`scene${d}-wait`,"active")}catch{}await g(5e3);let B=0,m=0;const h=Date.now();let C=!1,U=0;for(;Date.now()-h<6e5;){let R=null;const F=document.querySelectorAll("div, span, p, label, strong, small");for(const N of F){if(N.closest("#netflow-engine-overlay"))continue;const L=(N.textContent||"").trim().match(/^(\d{1,3})%$/);if(L){const Y=N.getBoundingClientRect();if(Y.width>0&&Y.height>0&&Y.width<120&&Y.height<60){R=parseInt(L[1],10);break}}}if(R!==null){if(U=0,R!==B){n(`🎬 ฉาก ${d} ความคืบหน้า: ${R}%`),B=R;try{k(`scene${d}-wait`,"active",R)}catch{}}m=0}else if(B>0){if(m===0)m=Date.now();else if(Date.now()-m>=5e3){n(`✅ ฉาก ${d}: เจนเสร็จ!`),C=!0;break}}else if(U++,U>=15){const N=document.querySelectorAll("video");let z=!1;for(const L of N)if(L.readyState>=2&&!L.paused&&L.getBoundingClientRect().width>200){z=!0;break}if(z){n(`✅ ฉาก ${d}: พบวิดีโอเล่นอยู่ — เสร็จ`),C=!0;break}if(U>=30){n(`✅ ฉาก ${d}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),C=!0;break}}document.hidden&&B>0&&m===0&&await be(),await g(2e3)}C||n(`⚠️ ฉาก ${d} หมดเวลา`);try{k(`scene${d}-wait`,"done",100)}catch{}n(`✅ ฉาก ${d} เสร็จแล้ว`),chrome.storage.local.remove(ce()),await g(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await g(3e3);let S=null;try{k("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const O=Date.now();let P=null;const b=Date.now();for(;!P&&Date.now()-b<1e4;){for(const d of document.querySelectorAll("button")){const w=d.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const T=d.getBoundingClientRect();if(T.width>0&&T.height>0){P=d;break}}}P||await g(1e3)}if(!P){M("ไม่พบปุ่มดาวน์โหลด");return}await ee(P),n("คลิกดาวน์โหลดแล้ว ✅");try{k("download","done"),k("upscale","active")}catch{}await g(1500);let o=null;for(let d=0;d<3&&!o;d++){d>0&&n(`🔄 ลองหา 720p ครั้งที่ ${d+1}...`);let w=null;const T=Date.now();for(;!w&&Date.now()-T<5e3;){for(const B of document.querySelectorAll("[role='menuitem']"))if((B.textContent||"").trim().includes("Full Video")&&B.querySelector("i")){const h=B.getBoundingClientRect();if(h.width>0&&h.height>0){w=B;break}}w||await g(500)}if(!w){M("ไม่พบ Full Video");continue}const I=w.getBoundingClientRect(),A=I.left+I.width/2,$=I.top+I.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:A,clientY:$})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:A,clientY:$})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:A,clientY:$})),await ee(w),n("คลิก/hover Full Video ✅"),await g(2e3);const E=Date.now();for(;!o&&Date.now()-E<8e3;){for(const B of document.querySelectorAll("button[role='menuitem']")){const m=B.querySelectorAll("span");for(const h of m)if((h.textContent||"").trim()==="720p"){const C=B.getBoundingClientRect();if(C.width>0&&C.height>0){o=B;break}}if(o)break}o||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:A,clientY:$})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:A+20,clientY:$}))),await g(500))}}if(!o){M("ไม่พบ 720p");return}await ee(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const u=Date.now();let v=!1,V=!1;for(;Date.now()-u<3e5;){for(const d of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(d.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),v=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(V||(V=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(v)break;if(V){let d=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){d=!0;break}if(!d){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),v=!0;break}}await g(2e3)}if(!v){M("เตรียมไฟล์หมดเวลา");return}try{k("upscale","done",100),k("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await g(5e3);let _=!1;const D=Date.now();for(;Date.now()-D<6e4&&!_;){try{await new Promise(d=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:O},w=>{chrome.runtime.lastError?M(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),_=!0,w.downloadUrl&&(S=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-D)/1e3)}s)`),d()})})}catch(d){M(`ตรวจสอบผิดพลาด: ${d.message}`)}_||await g(3e3)}_||M("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const H=await je();S||(S=H);try{k("open","done"),Pe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Ke(S),Xe(2e3)}async function un(){try{await Jt;const t=ce();let e=await new Promise(l=>{chrome.storage.local.get(t,c=>{if(chrome.runtime.lastError){l(null);return}l((c==null?void 0:c[t])||null)})});if(!e&&ve){const l="netflow_pending_action";e=await new Promise(c=>{chrome.storage.local.get(l,s=>{if(chrome.runtime.lastError){c(null);return}c((s==null?void 0:s[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await g(300),!await new Promise(l=>{chrome.storage.local.get(t,c=>{const s=c==null?void 0:c[t];l((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await Rt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Ot(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),fn(t).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),Ct()}).catch(a=>{if(a instanceof Ze||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Le("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{kt()}catch{}}else console.error("[Netflow AI] Generate error:",a);Ct()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await g(500);const a=on();if(!a){M("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),f=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${f.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const s=document.elementFromPoint(f,l);s?(await ee(s),n(`คลิก ${c+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await ee(a),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await g(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),un()})();
