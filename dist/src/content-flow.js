(function(){"use strict";const de={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Q=de.green,ke=null;function Ge(t){t&&de[t]&&(ke=t,Q=de[t],et(),requestAnimationFrame(()=>$t()))}function Dt(){if(ke&&de[ke])return de[ke];try{const t=localStorage.getItem("netflow_app_theme");if(t&&de[t])return de[t]}catch{}return de.green}let te=0,ne=255,oe=65;function et(){const t=Q.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(te=parseInt(t[1],16),ne=parseInt(t[2],16),oe=parseInt(t[3],16))}const tt='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',nt='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let W=null,K=null,pe=null,ot=0,Be=null,Ce=null,De=null,qe=0,fe=!1,se=null,Te=null,Me=null,he=1,Y=[];function Fe(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const ae=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=Fe(1);function Ft(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,i=t.hex,p=t.accentHex,l=t.doneHex,c=(()=>{const g=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const o=f=>Math.min(255,f+80);return`#${[1,2,3].map(f=>o(parseInt(g[f],16)).toString(16).padStart(2,"0")).join("")}`})(),s=(()=>{const g=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!g)return"#4ade80";const o=f=>Math.min(255,f+60);return`#${[1,2,3].map(f=>o(parseInt(g[f],16)).toString(16).padStart(2,"0")).join("")}`})(),d=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),w=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,x=d?parseInt(d[1],16)/w:0,S=d?parseInt(d[2],16)/w:1,D=d?parseInt(d[3],16)/w:.25,A=g=>`${Math.round(x*g)}, ${Math.round(S*g)}, ${Math.round(D*g)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${A(18)},0.94) 0%, rgba(${A(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
    background: rgba(${A(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${A(180)},0.05),
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
            0 0 200px rgba(${A(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${A(180)},0.08),
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
    background: linear-gradient(180deg, rgba(${A(5)},0.95) 0%, rgba(${A(12)},0.98) 100%);
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
    background: linear-gradient(180deg, rgba(${A(6)},0.75) 0%, rgba(${A(3)},0.92) 100%);
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
    background: rgba(${A(8)}, 0.88);
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
    background: rgba(${A(8)},0.8);
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
    background: rgba(${A(8)}, 0.9);
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

    `}function it(){pe||(pe=document.createElement("style"),pe.id="netflow-overlay-styles",pe.textContent=Ft(Q),document.head.appendChild(pe))}function at(t){t.innerHTML="",Y.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function rt(){const t=document.getElementById("nf-terminal");if(!t)return;at(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function st(t,e){let c="";for(let S=0;S<20;S++){const D=S/20*Math.PI*2,A=(S+.2)/20*Math.PI*2,g=(S+.5)/20*Math.PI*2,o=(S+.8)/20*Math.PI*2,f=(S+1)/20*Math.PI*2;c+=`${S===0?"M":"L"}${(120+100*Math.cos(D)).toFixed(1)},${(120+100*Math.sin(D)).toFixed(1)} `,c+=`L${(120+100*Math.cos(A)).toFixed(1)},${(120+100*Math.sin(A)).toFixed(1)} `,c+=`L${(120+112*Math.cos(g)).toFixed(1)},${(120+112*Math.sin(g)).toFixed(1)} `,c+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,c+=`L${(120+100*Math.cos(f)).toFixed(1)},${(120+100*Math.sin(f)).toFixed(1)} `}c+="Z";const s=14,d=72,w=62;let x="";for(let S=0;S<s;S++){const D=S/s*Math.PI*2,A=(S+.25)/s*Math.PI*2,g=(S+.75)/s*Math.PI*2,o=(S+1)/s*Math.PI*2;x+=`${S===0?"M":"L"}${(120+w*Math.cos(D)).toFixed(1)},${(120+w*Math.sin(D)).toFixed(1)} `,x+=`L${(120+d*Math.cos(A)).toFixed(1)},${(120+d*Math.sin(A)).toFixed(1)} `,x+=`L${(120+d*Math.cos(g)).toFixed(1)},${(120+d*Math.sin(g)).toFixed(1)} `,x+=`L${(120+w*Math.cos(o)).toFixed(1)},${(120+w*Math.sin(o)).toFixed(1)} `}return x+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${x}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${w}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Ot(){const t=document.createElement("div");t.id="netflow-engine-overlay",se=document.createElement("canvas"),se.id="nf-matrix-canvas",t.appendChild(se);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let m=1;m<=5;m++){const k=document.createElement("div");k.className=`nf-ambient-orb nf-orb-${m}`,t.appendChild(k)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const c=document.createElement("div");c.className="nf-pat-binary",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-crosshatch",t.appendChild(s);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const w=document.createElement("div");w.className="nf-pat-wave-h",t.appendChild(w);const x=document.createElement("div");x.className="nf-pat-radar",t.appendChild(x);const S=document.createElement("div");S.className="nf-pat-ripple-1",t.appendChild(S);const D=document.createElement("div");D.className="nf-pat-ripple-2",t.appendChild(D);const A=document.createElement("div");A.className="nf-pat-techscan",t.appendChild(A);const g=document.createElement("div");g.className="nf-center-glow",t.appendChild(g);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const f=document.createElement("div");f.className="nf-crt-scanlines",t.appendChild(f);const $=document.createElement("div");$.className="nf-vignette",t.appendChild($);for(let m=0;m<3;m++){const k=document.createElement("div");k.className="nf-pulse-ring",t.appendChild(k)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(m=>{const k=document.createElement("div");k.className=`nf-corner-deco ${m}`,t.appendChild(k)});const q=document.createElement("button");q.className="nf-stop-btn",q.innerHTML='<span class="nf-stop-icon"></span> หยุด',q.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",q.onclick=()=>{var m;window.__NETFLOW_STOP__=!0;try{Le("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((m=chrome.runtime)!=null&&m.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(q);const R=document.createElement("div");R.className="nf-layout";const P=document.createElement("div");P.className="nf-core-monitor",P.id="nf-core-monitor";const v=document.createElement("div");v.className="nf-core-header",v.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,P.appendChild(v);const u=document.createElement("div");u.className="nf-terminal",u.id="nf-terminal",at(u),P.appendChild(u);const y=document.createElement("div");y.className="nf-engine-core",y.id="nf-engine-core";const M=document.createElement("div");M.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(m=>{const k=document.createElement("div");k.className=`nf-frame-corner ${m}`,M.appendChild(k)}),y.appendChild(M);const F="http://www.w3.org/2000/svg",C=document.createElementNS(F,"svg");C.setAttribute("class","nf-engine-waves"),C.setAttribute("viewBox","0 0 560 140"),C.setAttribute("preserveAspectRatio","none"),C.id="nf-engine-waves";for(let m=0;m<4;m++){const k=document.createElementNS(F,"path");k.setAttribute("fill","none"),k.setAttribute("stroke-width",m<2?"1.5":"1"),k.setAttribute("stroke",m<2?`rgba(${Q.rgb},${.14+m*.1})`:`rgba(${Q.accentRgb},${.1+(m-2)*.08})`),k.setAttribute("data-wave-idx",String(m)),C.appendChild(k)}y.appendChild(C);const E=document.createElement("div");E.className="nf-engine-brand-inner",E.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${st(Q.rgb,Q.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${st(Q.rgb,Q.accentRgb)}
        </div>
    `,y.appendChild(E);const B=document.createElement("div");B.className="nf-engine-stats",B.id="nf-engine-stats",B.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([m,k,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${m}</span><span class="nf-stat-val" id="${k}">${O}</span></div>`).join(""),y.appendChild(B),P.appendChild(y),R.appendChild(P);const b=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ae.forEach((m,k)=>{const O=zt(m);O.classList.add(b[k]),O.id=`nf-mod-${m.id}`,R.appendChild(O)}),t.appendChild(R);for(let m=0;m<30;m++){const k=document.createElement("div");k.className="nf-particle",k.style.left=`${5+Math.random()*90}%`,k.style.bottom=`${Math.random()*40}%`,k.style.animationDuration=`${3+Math.random()*5}s`,k.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,H=.7+Math.random()*.3;k.style.background=`rgba(${Math.floor(te*H)}, ${Math.floor(ne*H)}, ${Math.floor(oe*H)}, ${O})`,k.style.width=`${1+Math.random()*2}px`,k.style.height=k.style.width,t.appendChild(k)}return t}function zt(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
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
        `,e.appendChild(p)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function Nt(){ot=Date.now(),Be=setInterval(()=>{const t=Math.floor((Date.now()-ot)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${r}`)},1e3)}function lt(){Be&&(clearInterval(Be),Be=null)}const Lt=120,ct=160,dt=.4;let be=null,pt=0,ft=0,ut=0,Se=[];function Vt(t,e){Se=[];for(let r=0;r<Lt;r++){const a=Math.random();let i;a<.22?i=0:a<.4?i=1:a<.55?i=2:a<.68?i=3:a<.84?i=4:i=5;const p=Math.random()*t,l=Math.random()*e,c=50+Math.random()*220,s=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Se.push({x:i===0?Math.random()*t:p+Math.cos(s)*c,y:i===0?Math.random()*e:l+Math.sin(s)*c,vx:(Math.random()-.5)*dt,vy:(Math.random()-.5)*dt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:p,oCy:l,oRadius:c,oAngle:s,oSpeed:d})}}function Gt(){if(!se)return;const t=se;if(Te=t.getContext("2d"),!Te)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Se.length===0&&Vt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,i=0,p=!1;function l(){if(!Te||!se){Me=null;return}if(Me=requestAnimationFrame(l),p=!p,p)return;const c=Te,s=se.width,d=se.height;c.fillStyle=`rgba(${te*.04|0},${ne*.04|0},${oe*.06|0},1)`,c.fillRect(0,0,s,d),(!r||a!==s||i!==d)&&(a=s,i=d,r=c.createRadialGradient(s*.5,d*.5,0,s*.5,d*.5,Math.max(s,d)*.6),r.addColorStop(0,`rgba(${te*.08|0},${ne*.08|0},${oe*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=r,c.fillRect(0,0,s,d);const w=Se,x=w.length,S=ct*ct;for(let g=0;g<x;g++){const o=w[g];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>s&&(o.x=s,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>d&&(o.y=d,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const f=o.oAngle,$=o.oRadius*.7;o.x=o.oCx+$*Math.cos(f),o.y=o.oCy+$*Math.sin(f)*Math.cos(f),o.oCx+=Math.sin(f*.15)*.12,o.oCy+=Math.cos(f*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const f=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*f,o.y=o.oCy+Math.sin(o.oAngle)*f,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=s+30:o.x>s+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const f=o.oRadius+50;o.oCx<-f?o.oCx=s+f:o.oCx>s+f&&(o.oCx=-f),o.oCy<-f?o.oCy=d+f:o.oCy>d+f&&(o.oCy=-f)}}c.beginPath(),c.strokeStyle=`rgba(${te},${ne},${oe},0.06)`,c.lineWidth=.4;const D=new Path2D;for(let g=0;g<x;g++){const o=w[g];for(let f=g+1;f<x;f++){const $=w[f],q=o.x-$.x,R=o.y-$.y,P=q*q+R*R;P<S&&(1-P/S<.4?(c.moveTo(o.x,o.y),c.lineTo($.x,$.y)):(D.moveTo(o.x,o.y),D.lineTo($.x,$.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${te},${ne},${oe},0.18)`,c.lineWidth=.8,c.stroke(D),!be||pt!==te||ft!==ne||ut!==oe){be=document.createElement("canvas");const g=48;be.width=g,be.height=g;const o=be.getContext("2d"),f=o.createRadialGradient(g/2,g/2,0,g/2,g/2,g/2);f.addColorStop(0,`rgba(${te},${ne},${oe},0.9)`),f.addColorStop(.3,`rgba(${te},${ne},${oe},0.35)`),f.addColorStop(1,`rgba(${te},${ne},${oe},0)`),o.fillStyle=f,o.fillRect(0,0,g,g),pt=te,ft=ne,ut=oe}const A=be;for(let g=0;g<x;g++){const o=w[g],f=.6+.4*Math.sin(o.pulsePhase),$=o.radius*5*(.8+f*.4);c.globalAlpha=.5+f*.4,c.drawImage(A,o.x-$/2,o.y-$/2,$,$)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let g=0;g<x;g++){const o=w[g];if(o.radius>2){const f=.6+.4*Math.sin(o.pulsePhase),$=o.radius*(.8+f*.4)*.35;c.moveTo(o.x+$,o.y),c.arc(o.x,o.y,$,0,Math.PI*2)}}c.fill()}l()}function qt(){Me!==null&&(cancelAnimationFrame(Me),Me=null),se=null,Te=null,Se=[]}let Ie=null;const Oe=560,Ht=140,gt=Oe/2,mt=Ht/2,ht=[];for(let t=0;t<=Oe;t+=8){const e=Math.abs(t-gt)/gt;ht.push(Math.pow(Math.min(1,e*1.6),.6))}const Ut=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Oe,off:t*.6,spd:.7+t*.12}));let He=!1;function bt(){if(Ce=requestAnimationFrame(bt),He=!He,He)return;if(qe+=.07,!Ie){const e=document.getElementById("nf-engine-waves");if(!e){Ce=null;return}Ie=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Ie.length;e++){const r=Ut[e],a=qe*r.spd+r.off;t.length=0,t.push(`M 0 ${mt}`);let i=0;for(let p=0;p<=Oe;p+=8){const l=mt+r.amp*ht[i++]*Math.sin(p*r.freq+a);t.push(`L${p} ${l*10+.5|0}`)}Ie[e].setAttribute("d",t.join(" "))}}function Wt(){qe=0,bt(),Gt(),De=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function wt(){Ce!==null&&(cancelAnimationFrame(Ce),Ce=null),De&&(clearInterval(De),De=null),Ie=null,qt()}function ze(){let t=0;const e=Y.filter(d=>d.status!=="skipped").length;for(const d of Y){const w=document.getElementById(`nf-proc-${d.stepId}`);if(!w)continue;w.className="nf-proc-row";const x=w.querySelector(".nf-proc-badge");switch(d.status){case"done":w.classList.add("nf-proc-done"),x&&(x.textContent="✅ done"),t++;break;case"active":w.classList.add("nf-proc-active"),x&&(x.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":w.classList.add("nf-proc-error"),x&&(x.textContent="❌ error");break;case"skipped":w.classList.add("nf-proc-skipped"),x&&(x.textContent="— skip");break;default:w.classList.add("nf-proc-waiting"),x&&(x.textContent="(queued)")}}const r=Y.findIndex(d=>d.status==="active"),a=r>=0?r+1:t>=e&&e>0?Y.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${a}/${Y.length}`);const p=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=Q.doneHex),l&&(l.style.background=Q.doneHex,l.style.boxShadow=`0 0 8px rgba(${Q.doneRgb},0.7)`)):Y.some(w=>w.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(w=>w.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=Q.hex,p.style.textShadow=`0 0 10px rgba(${Q.rgb},0.5)`);const c=document.getElementById("nf-terminal"),s=c==null?void 0:c.querySelector(".nf-proc-active");s&&c&&s.scrollIntoView({behavior:"smooth",block:"center"})}function xt(){K&&K.isConnected||(it(),K=document.createElement("button"),K.id="nf-toggle-btn",K.className="nf-toggle-visible",K.innerHTML=fe?tt:nt,K.title="ซ่อน/แสดง Netflow Overlay",K.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",K.onclick=()=>yt(),document.body.appendChild(K))}function yt(){W&&(xt(),fe?(W.classList.remove("nf-hidden"),W.classList.add("nf-visible"),W.style.opacity="1",W.style.pointerEvents="auto",K&&(K.innerHTML=nt),fe=!1):(W.classList.remove("nf-visible"),W.classList.add("nf-hidden"),W.style.opacity="0",W.style.pointerEvents="none",K&&(K.innerHTML=tt),fe=!0))}const vt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function $t(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=ke;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const r=vt[e]||vt.green;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const i=Q.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function Ue(t=1){if(Q=Dt(),et(),W&&W.isConnected){for(const e of ae)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;he=t,Y=Fe(t),rt();for(const e of ae)We(e);Ne(),ze(),fe&&yt();return}W&&!W.isConnected&&(W=null),pe&&(pe.remove(),pe=null),it();for(const e of ae)for(const r of e.steps)r.status="waiting",r.progress=r.progress!==void 0?0:void 0;if(he=t,Y=Fe(t),t>1){const e=ae.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)a.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),a.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),a.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=a}const r=ae.find(a=>a.id==="render");if(r){const a=r.steps.find(p=>p.id==="download");a&&(a.label="ดาวน์โหลด 720p");const i=r.steps.find(p=>p.id==="upscale");i&&(i.label="Full Video")}}W=Ot(),W.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(W),W.classList.add("nf-visible"),fe=!1,xt(),Nt(),Wt(),requestAnimationFrame(()=>$t())}function Et(){lt(),wt(),fe=!1,W&&(W.classList.add("nf-fade-out"),setTimeout(()=>{W==null||W.remove(),W=null},500)),K&&(K.remove(),K=null)}const Yt={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Xt(t,e,r){const a=Y.findIndex(x=>x.status==="active"),i=Y.filter(x=>x.status==="done").length,p=Y.length,l=a>=0?a+1:i>=p?p:i,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${l}/${p}`);let s=1;for(const x of Y)if(x.status==="active"||x.status==="done")if(x.stepId.startsWith("scene")){const S=x.stepId.match(/^scene(\d+)-/);S&&(s=Math.max(s,parseInt(S[1],10)))}else(x.stepId==="download"||x.stepId==="upscale"||x.stepId==="open")&&(s=he);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=he>1?`${s}/${he}`:"1/1"),e==="active"){const x=document.getElementById("nf-stat-status"),S=Yt[t]||t.toUpperCase();x&&(x.textContent=S)}else if(e==="done"&&i>=p){const x=document.getElementById("nf-stat-status");x&&(x.textContent="COMPLETE")}else if(e==="error"){const x=document.getElementById("nf-stat-status");x&&(x.textContent="ERROR")}const w=document.getElementById("nf-stat-progress");w&&(r!==void 0&&r>0?w.textContent=`${Math.min(100,r)}%`:e==="active"&&(w.textContent="—"))}function T(t,e,r){if(!W)return;for(const i of ae)for(const p of i.steps)p.id===t&&(p.status=e,r!==void 0&&(p.progress=r));for(const i of Y)i.stepId===t&&(i.status=e,r!==void 0&&(i.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),Xt(t,e,r),r!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,r)}%`)}Ne(),ze()}function we(t){T(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Pe(t=4e3){lt(),wt(),Ne(),ze(),setTimeout(()=>Et(),t)}function Ne(){for(const t of ae){const e=t.steps.filter(s=>s.status!=="skipped").length,r=t.steps.filter(s=>s.status==="done").length,a=t.steps.some(s=>s.status==="active"),i=e>0?Math.round(r/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const c=document.getElementById(`nf-mod-${t.id}`);c&&(c.classList.remove("nf-active","nf-done"),i>=100?c.classList.add("nf-done"):a&&c.classList.add("nf-active"))}}function jt(t){var a,i,p,l;he=t;const e=new Map;for(const c of Y)e.set(c.stepId,{status:c.status,progress:c.progress});Y=Fe(t);for(const c of Y){const s=e.get(c.stepId);s&&(c.status=s.status,s.progress!==void 0&&(c.progress=s.progress))}if(rt(),t>1){const c=ae.find(s=>s.id==="video");if(c){const s=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=c.steps.find(d=>d.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=c.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=c.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=c.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)s.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),s.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),s.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});c.steps=s,We(c)}}const r=ae.find(c=>c.id==="render");if(r&&t>1){const c=r.steps.find(d=>d.id==="download");c&&(c.label="ดาวน์โหลด 720p");const s=r.steps.find(d=>d.id==="upscale");s&&(s.label="Full Video"),We(r)}Ne(),ze()}function We(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(p)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function Le(t){t.replace(/^\[Netflow AI\]\s*/,"")}let xe=null,ue=null;const Kt=new Promise(t=>{ue=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(xe=t.tabId,console.log(`[Netflow AI] Tab ID: ${xe}`)),ue&&(ue(xe),ue=null)})}catch{ue&&(ue(null),ue=null)}function le(){return xe?`netflow_pending_action_${xe}`:"netflow_pending_action"}function kt(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Le(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},I=t=>{console.warn(`[Netflow AI] ${t}`);try{Le(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function Ye(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?I(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){I(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Xe(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){i(!1);return}i(!!(p!=null&&p.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const p of i){const l=p.src||p.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let r=null,a=0;for(const i of e){let p=i.src||"";if(!p){const s=i.querySelector("source");s&&(p=s.getAttribute("src")||"")}if(!p&&i.currentSrc&&(p=i.currentSrc),!p)continue;if(J()){r||(r=p,a=1);continue}const l=i.getBoundingClientRect(),c=l.width*l.height;l.width>50&&c>a&&(a=c,r=p)}if(!r)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${r.substring(0,80)}... (area=${a.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(r);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await Ct(r),r;const p=await i.blob(),l=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const c=await new Promise((s,d)=>{const w=new FileReader;w.onloadend=()=>s(w.result),w.onerror=()=>d(new Error("FileReader error")),w.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(c.length/1024/1024).toFixed(1)} MB`),await new Promise(s=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:c},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),s()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await Ct(r)}return r}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function Ct(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},r=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):r!=null&&r.success?n(`[TikTok] Video pre-fetched via background: ${((r.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${r==null?void 0:r.error}`),e()})})}catch{}}function je(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const Ke=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Qe=/Win/i.test(navigator.userAgent),ye=Ke?"🍎 Mac":Qe?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ye}`),window.__VIDEO_COMPLETE_SENT__=!1;class Je extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let _e=null,ge=null,Tt=!1;const ve=new Map;let Mt=0;function Qt(){if(_e)return _e;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return _e=new Worker(URL.createObjectURL(t)),_e.onmessage=e=>{const r=ve.get(e.data);r&&(ve.delete(e.data),r())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),_e}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function Jt(){if(ge)return ge;if(Tt)return null;try{return ge=chrome.runtime.connect({name:"timer"}),ge.onMessage.addListener(t=>{const e=ve.get(t.id);e&&(ve.delete(t.id),e())}),ge.onDisconnect.addListener(()=>{ge=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),ge}catch{return Tt=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const h=t=>new Promise((e,r)=>{if(window.__NETFLOW_STOP__)return r(new Je);let a=!1;const i=()=>{if(!a){if(a=!0,window.__NETFLOW_STOP__)return r(new Je);e()}},p=Qt();if(p){const s=++Mt;ve.set(s,i),p.postMessage({id:s,ms:t});try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t+2e3},()=>{chrome.runtime.lastError||i()})}catch{}return}try{chrome.runtime.sendMessage({type:"TIMER_DELAY",ms:t},()=>{chrome.runtime.lastError?setTimeout(i,t):i()});return}catch{}const l=Jt();if(l){const s=++Mt;ve.set(s,i),l.postMessage({cmd:"delay",id:s,ms:t});return}const c=setTimeout(i,t);h._lastId=c});function me(){return!!window.__NETFLOW_STOP__}const J=()=>document.hidden;let St=0;async function $e(){if(!document.hidden)return!1;const t=Date.now();if(t-St<15e3)return!1;St=t;try{return n("🔄 Tab ซ่อนอยู่ — ขอ background สลับ tab ชั่วคราวเพื่ออัพเดท DOM"),chrome.runtime.sendMessage({type:"BRIEF_ACTIVATE_TAB"}),await h(1500),!0}catch{return!1}}function It(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const i=(a.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const p of t)if(i.includes(p))return((r=a.textContent)==null?void 0:r.trim())||p}}return null}async function ee(t){if(J()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await h(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await h(50),t.click()}function Zt(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function en(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let p=a,l=null,c=1/0;for(let s=0;s<20&&p&&(p=p.parentElement,!(!p||p===document.body));s++){if(J()){s>=3&&p.children.length>0&&!l&&(l=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const w=d.width*d.height;w<c&&(l=p,c=w)}}l&&!e.includes(l)&&e.push(l)}return e.sort((a,i)=>{const p=a.getBoundingClientRect(),l=i.getBoundingClientRect();return p.left-l.left}),e}function Ze(t=!1){const e=[],r=document.querySelectorAll("video");for(const l of r){let c=l.parentElement;for(let s=0;s<10&&c;s++){if(J()){if(s>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const d=c.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:c,left:d.left});break}c=c.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of a){const c=(l.textContent||"").trim();if(c==="play_arrow"||c==="play_circle"||c==="videocam"){let s=l.parentElement;for(let d=0;d<10&&s;d++){if(J()){if(d>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const w=s.getBoundingClientRect();if(w.width>120&&w.height>80&&w.width<window.innerWidth*.7&&w.top>=-50&&w.left<window.innerWidth*.75){e.push({el:s,left:w.left});break}s=s.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const c=(l.alt||"").toLowerCase();if(c.includes("video")||c.includes("วิดีโอ")){let s=l.parentElement;for(let d=0;d<10&&s;d++){if(J()){if(d>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const w=s.getBoundingClientRect();if(w.width>120&&w.height>80&&w.width<window.innerWidth*.7&&w.top>=-50&&w.left<window.innerWidth*.75){e.push({el:s,left:w.left});break}s=s.parentElement}}}const p=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(c=>c.el===l));if(p.sort((l,c)=>l.left-c.left),p.length>0){const l=p[0].el,c=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${c.left.toFixed(0)},${c.top.toFixed(0)}) ขนาด ${c.width.toFixed(0)}x${c.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function tn(){const t=en("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let i=0;i<10&&a;i++){if(J()){if(i>=3&&a.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),a;a=a.parentElement;continue}const p=a.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function nn(t,e){var c;const[r,a]=t.split(","),i=((c=r.match(/:(.*?);/))==null?void 0:c[1])||"image/png",p=atob(a),l=new Uint8Array(p.length);for(let s=0;s<p.length;s++)l[s]=p.charCodeAt(s);return new File([l],e,{type:i})}function Ve(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of r)if(((a=i.textContent)==null?void 0:a.trim())===t){const p=i.closest("button");p&&e.push(p)}return e}function on(){const t=[...Ve("add"),...Ve("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const i of a){const p=(i.textContent||"").trim();if(p!=="+"&&p!=="add")continue;if(J())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,r=0;for(const a of t){const i=a.getBoundingClientRect();i.y>r&&(r=i.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function Pt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=Ve(a);let p=null,l=0;for(const c of i){const s=c.getBoundingClientRect();s.y>l&&(l=s.y,p=c)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${l.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){if(J())break;const i=a.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const p=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(p?1e3:0);l>r&&(r=l,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const i=(a.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return a}return null}function _t(){const t=document.querySelectorAll("textarea");for(const a of t)if(J()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(J()||a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const i=a.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function Ae(t,e){var r,a,i,p;t.focus(),await h(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const s=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),await h(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await h(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const c=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(c),await h(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await h(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const c=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(c),await h(800);const s=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(s.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${s.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const c=document.createElement("textarea");c.value=e,c.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(c),c.focus(),c.select(),document.execCommand("copy"),document.body.removeChild(c),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await h(200),document.execCommand("paste"),await h(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(c=>c.startsWith("__reactFiber$")||c.startsWith("__reactInternalInstance$"));if(l){let c=t[l];for(let s=0;s<30&&c;s++){const d=c.memoizedProps,w=c.memoizedState;if((a=d==null?void 0:d.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const x=d.editor;x.selection,x.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(i=w==null?void 0:w.memoizedState)==null?void 0:i.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),w.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}c=c.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function an(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function rn(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ye})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ye})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function sn(t,e,r){var d;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(w=>w.input)];for(const w of a)!i.includes(w)&&w.offsetParent===null&&i.push(w);for(const w of i)w.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const p=document.querySelectorAll('input[type="file"]');if(p.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ye})`),!1;let l;if(r&&r.size>0){const w=Array.from(p).filter(x=>!r.has(x));w.length>0?(l=w[w.length-1],n(`เล็งเป้า file input ใหม่ (${w.length} ใหม่, ${p.length} ทั้งหมด)`)):(l=p[p.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${p.length} ตัว`))}else l=p[p.length-1];const c=new DataTransfer;c.items.add(e);try{l.files=c.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=l.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(w){n(`กำหนด target.files ล้มเหลว: ${w.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:c.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(x){return I(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${x.message}`),!1}}const s=l._valueTracker;s&&(s.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const w=new DataTransfer;w.items.add(e);const x=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:w});l.dispatchEvent(x),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ye}`),!0}function Re(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay")||!a.src)continue;if(J()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;if(J()){t++;continue}const i=a.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&a.offsetParent!==null&&t++}return t}async function At(t,e){var w;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=nn(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=Re();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const i=async(x,S=8e3)=>{const D=Date.now();for(;Date.now()-D<S;){const A=Re();if(A>a)return n(`✅ [${x}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${A}`),!0;await h(500)}return n(`⚠️ [${x}] รูปย่อไม่เพิ่ม (ยังคง ${Re()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const p=on();if(!p)return I("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const l=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${l.size} ตัว`);const c=rn();let s=an();const d=new MutationObserver(x=>{for(const S of x)for(const D of S.addedNodes)if(D instanceof HTMLInputElement&&D.type==="file"&&(D.type="text",s.push({input:D,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),D instanceof HTMLElement){const A=D.querySelectorAll('input[type="file"]');for(const g of A)g.type="text",s.push({input:g,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{p.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await h(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let x=!1;const S=Date.now();for(;!x&&Date.now()-S<8e3;){const A=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const g of A){if(g===p)continue;const o=g.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const f of o){const $=((w=f.textContent)==null?void 0:w.trim())||"";if(($==="upload"||$==="upload_file"||$==="add_photo_alternate"||$==="image"||$==="photo_library")&&!Array.from(g.querySelectorAll("i")).map(R=>{var P;return(P=R.textContent)==null?void 0:P.trim()}).includes("drive_folder_upload")){g.click(),x=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${$}) ✅`);break}}if(x)break}if(!x)for(const g of A){if(g===p)continue;const o=g.childNodes.length<=8?(g.textContent||"").trim():"";if(o.length>0&&o.length<60){const f=o.toLowerCase();if(f==="upload"||f==="อัปโหลด"||f==="อัพโหลด"||f.includes("upload image")||f.includes("upload photo")||f.includes("upload a file")||f.includes("upload file")||f.includes("อัปโหลดรูปภาพ")||f.includes("อัพโหลดรูปภาพ")||f.includes("อัปโหลดไฟล์")||f.includes("อัพโหลดไฟล์")||f.includes("from computer")||f.includes("จากคอมพิวเตอร์")||f.includes("from device")||f.includes("จากอุปกรณ์")||f.includes("my computer")||f.includes("คอมพิวเตอร์ของฉัน")){g.click(),x=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!x)for(const g of A){if(g===p)continue;const o=(g.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const f=g.getBoundingClientRect();if(f.width>0&&f.height>0){g.click(),x=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}x||await h(500)}return x?(await h(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),sn(s,r,l)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(I(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(I("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1)}finally{d.disconnect(),c();for(const x of s)x.input.type!=="file"&&(x.input.type="file")}}async function ln(t,e){var A;n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button, div, span, [role='button']");let a=null;for(const g of r){const o=(g.textContent||"").trim();if(!(o.length>80)&&(o.includes("Nano Banana")||o.includes("Imagen")||o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Image")||o.includes("Video"))){const f=g.getBoundingClientRect();f.bottom>window.innerHeight*.7&&f.width>30&&f.height>10&&(!a||(g.textContent||"").length<(a.textContent||"").length)&&(a=g)}}if(a&&n(`พบปุ่มตั้งค่าจากข้อความ: "${(a.textContent||"").substring(0,40).trim()}"`),!a){const g=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of g){const f=((A=o.textContent)==null?void 0:A.trim())||"";if(f.includes("crop")||f==="aspect_ratio"||f==="photo_size_select_large"){const $=o.closest("button, div[role='button'], [role='button']")||o.parentElement;if($){const q=$.getBoundingClientRect();if(q.bottom>window.innerHeight*.7&&q.width>0){a=$,n(`พบปุ่มตั้งค่าจากไอคอน: ${f}`);break}}}}}if(!a)for(const g of r){const o=(g.textContent||"").trim();if(!(o.length>40)&&/x[1-4]/.test(o)&&(o.includes("วิดีโอ")||o.includes("รูปภาพ")||o.includes("Video")||o.includes("Image"))){const f=g.getBoundingClientRect();if(f.bottom>window.innerHeight*.7&&f.width>30){a=g,n(`พบปุ่มตั้งค่าจาก x-count + mode text: "${o.substring(0,40)}"`);break}}}if(!a)return I("ไม่พบปุ่มตั้งค่า"),!1;const i=a.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2,c={bubbles:!0,cancelable:!0,clientX:p,clientY:l,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("คลิกปุ่มตั้งค่าแล้ว"),await h(1500);let s=!1,d=null;const w=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const g of w){const o=g.getAttribute("aria-controls")||"",f=g.id||"";if(o.toUpperCase().includes("IMAGE")||f.toUpperCase().includes("IMAGE")){d=g,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${o})`);break}}if(!d)for(const g of document.querySelectorAll('[role="tab"]')){const o=g.id||"";if(o.toUpperCase().includes("TRIGGER-IMAGE")){d=g,n(`พบแท็บ Image ผ่าน id: ${o}`);break}}if(!d)for(const g of document.querySelectorAll("button, div, span, [role='menuitem'], [role='option'], [role='tab'], [role='button']")){const o=(g.textContent||"").trim();if(!(o.length>30)&&(o==="Image"||o.endsWith("Image")||o==="รูปภาพ"||o==="ภาพ"||o.includes("รูปภาพ"))&&!o.includes("Video")&&!o.includes("วิดีโอ")){const f=g.getBoundingClientRect();if(f.width>0&&f.height>0){d=g,n(`พบแท็บ Image ผ่านข้อความ: "${o}"`);break}}}if(d){const g=d.getAttribute("data-state")||"",o=d.getAttribute("aria-selected")||"";if(g==="active"||o==="true")s=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const f=d.getBoundingClientRect(),$={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",$)),await h(80),d.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",$)),d.dispatchEvent(new MouseEvent("click",$)),s=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await h(400)}}s||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const x=t==="horizontal"?"แนวนอน":"แนวตั้ง",S=t==="horizontal"?"landscape":"portrait";for(const g of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(g.textContent||"").trim();if(!(o.length>30)&&(o===x||o.includes(x)||o.toLowerCase()===S||o.toLowerCase().includes(S))){const f=g.getBoundingClientRect(),$={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",$)),await h(80),g.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",$)),g.dispatchEvent(new MouseEvent("click",$)),n(`เลือกทิศทาง: ${x}`),await h(400);break}}const D=`x${e}`;for(const g of document.querySelectorAll("button, div, span, [role='tab'], [role='option'], [role='button']")){const o=(g.textContent||"").trim();if(!(o.length>10)&&(o===D||o===`${e}`)){const f=g.getBoundingClientRect(),$={bubbles:!0,cancelable:!0,clientX:f.left+f.width/2,clientY:f.top+f.height/2,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",$)),await h(80),g.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",$)),g.dispatchEvent(new MouseEvent("click",$)),n(`เลือกจำนวน: ${D}`),await h(400);break}}return await h(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),a.dispatchEvent(new PointerEvent("pointerdown",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",c)),await h(80),a.dispatchEvent(new PointerEvent("pointerup",{...c,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",c)),a.dispatchEvent(new MouseEvent("click",c)),n("ปิดหน้าตั้งค่าแล้ว"),await h(600),!0}async function cn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",r=t==="quality"?"Quality":"Fast",a=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",p=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const c=Date.now()+1e4;for(;!l&&Date.now()<c;){const g=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of g){const f=(o.textContent||"").trim();if(!(f.length>80)&&(f.includes("Veo")||f.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||f.includes("arrow_drop_down")||o.querySelector("svg"))){l=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${f.substring(0,50).trim()}"`);break}}if(!l)for(const o of g){const f=(o.textContent||"").trim();if(!(f.length>80)&&(f.includes("Veo")||f.includes("veo"))){const $=o.getBoundingClientRect();if($.width>0&&$.height>0){l=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${f.substring(0,50).trim()}"`);break}}}if(!l)for(const o of g){const f=(o.textContent||"").trim();if(!(f.length>50)&&(f.includes("Fast")||f.includes("Quality")||f.includes("เร็ว")||f.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){l=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${f.substring(0,50).trim()}"`);break}}if(!l){const o=document.querySelectorAll("div, span, button, [role='button']");for(const f of o){const $=(f.textContent||"").trim();if($==="Veo 3.1 - Fast"||$==="Veo 3.1 - Quality"||$==="Fast"||$==="Quality"||$==="Veo 3.1 - เร็ว"||$==="Veo 3.1 - คุณภาพสูง"||$==="Veo 3.1 - คุณภาพ"||$==="Veo 2 - Fast"||$==="Veo 2 - Quality"){const q=f.getBoundingClientRect();if(q.width>0&&q.height>0){l=f,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${$}"`);break}}}}if(!l){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const f of o){const $=(f.textContent||"").trim();if(!($.length>60)&&($.includes("3.1")||$.includes("model")||$.includes("โมเดล"))){const q=f.getBoundingClientRect();if(q.bottom>window.innerHeight*.4&&q.width>0&&q.height>0){l=f,n(`พบปุ่ม model selector (Strategy E): "${$.substring(0,50).trim()}"`);break}}}}l||await h(1e3)}if(!l)return I("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const s=(l.textContent||"").trim();if(s.includes(e)||s.includes(r)&&!s.includes(a)||s.includes(i)&&!s.includes(p))return n(`✅ Veo quality เป็น "${s}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=l.getBoundingClientRect(),w=d.left+d.width/2,x=d.top+d.height/2,S={bubbles:!0,cancelable:!0,clientX:w,clientY:x,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",S)),await h(80),l.dispatchEvent(new PointerEvent("pointerup",{...S,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",S)),l.dispatchEvent(new MouseEvent("click",S)),n("คลิกเปิด Veo quality dropdown"),await h(1e3);let D=!1;const A=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const g of A){const o=(g.textContent||"").trim();if((o===e||o===r||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const $=g.getBoundingClientRect();if($.width>0&&$.height>0){const q=$.left+$.width/2,R=$.top+$.height/2,P={bubbles:!0,cancelable:!0,clientX:q,clientY:R,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",P)),await h(80),g.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",P)),g.dispatchEvent(new MouseEvent("click",P)),n(`✅ เลือก "${o}" สำเร็จ`),D=!0;break}}}return D?(await h(600),!0):(I(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),document.body.click(),!1)}async function dn(t){var $,q,R,P;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",i=Ke?"macOS":Qe?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=Ke?((q=($=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:$[1])==null?void 0:q.replace(/_/g,"."))||"":Qe&&((R=e.match(/Windows NT ([0-9.]+)/))==null?void 0:R[1])||"",l=navigator.language||"unknown",c=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${p} | Chrome ${a}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${c} | แพลตฟอร์ม: ${ye}`),n("══════════════════════════════════════════");try{Ge(t.theme)}catch{}try{Ue()}catch(v){console.warn("Overlay show error:",v)}const s=[],d=[];try{T("settings","active");const v=t.orientation||"horizontal",u=t.outputCount||1,y=await ln(v,u);s.push(y?"✅ Settings":"⚠️ Settings"),T("settings",y?"done":"error")}catch(v){I(`ตั้งค่าผิดพลาด: ${v.message}`),s.push("⚠️ Settings"),T("settings","error")}try{const v=t.veoQuality||"fast";await cn(v)?(s.push(`✅ Veo ${v}`),n(`✅ Veo quality: ${v}`)):(s.push("⚠️ Veo quality"),I("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(v){I(`Veo quality error: ${v.message}`),s.push("⚠️ Veo quality")}document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(300),document.body.click(),await h(500),n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const w=()=>{const v=document.querySelectorAll("span, div, p, label");for(const u of v){const y=(u.textContent||"").trim();if(/^\d{1,3}%$/.test(y)){if(y==="100%")return null;const M=u.getBoundingClientRect();if(M.width>0&&M.height>0&&M.top>0&&M.top<window.innerHeight)return y}}return null},x=async v=>{n(`รอการอัพโหลด ${v} เสร็จ...`),await h(2e3);const u=Date.now(),y=6e4;let M="",F=Date.now();const C=15e3;for(;Date.now()-u<y;){const E=w();if(E){if(E!==M)M=E,F=Date.now();else if(Date.now()-F>C){n(`✅ อัพโหลด ${v} — % ค้างที่ ${E} นาน ${C/1e3} วินาที ถือว่าเสร็จ`),await h(1e3);return}n(`กำลังอัพโหลด: ${E} — รอ...`),await h(1500)}else{n(`✅ อัพโหลด ${v} เสร็จ — ไม่พบตัวบอก %`),await h(1e3);return}}I(`⚠️ อัพโหลด ${v} หมดเวลาหลัง ${y/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){T("upload-char","active");try{const v=await At(t.characterImage,"character.png");s.push(v?"✅ ตัวละคร":"⚠️ ตัวละคร"),v||d.push("character upload failed"),T("upload-char",v?"done":"error")}catch(v){I(`อัพโหลดตัวละครผิดพลาด: ${v.message}`),s.push("❌ ตัวละคร"),d.push("character upload error"),T("upload-char","error")}await x("character"),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(500)}else we("upload-char");if(t.productImage){T("upload-prod","active");try{const v=await At(t.productImage,"product.png");s.push(v?"✅ สินค้า":"⚠️ สินค้า"),v||d.push("product upload failed"),T("upload-prod",v?"done":"error")}catch(v){I(`อัพโหลดสินค้าผิดพลาด: ${v.message}`),s.push("❌ สินค้า"),d.push("product upload error"),T("upload-prod","error")}await x("product")}else we("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await h(800);const S=w();S&&(n(`⚠️ อัพโหลดยังแสดง ${S} — รอเพิ่มเติม...`),await x("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await h(1e3);const D=(t.characterImage?1:0)+(t.productImage?1:0);if(D>0){let v=Re();v<D&&(n(`⏳ เห็นรูปย่อแค่ ${v}/${D} — รอ 3 วินาที...`),await h(3e3),v=Re()),v>=D?n(`✅ ยืนยันรูปย่ออ้างอิง: ${v}/${D}`):I(`⚠️ คาดว่าจะมี ${D} รูปย่อ แต่พบ ${v} — ดำเนินการต่อ`)}if(me()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Pe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),T("img-prompt","active"),await h(1e3);const A=_t();A?(await Ae(A,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),s.push("✅ Prompt"),T("img-prompt","done")):(I("ไม่พบช่องป้อนข้อความ Prompt"),s.push("❌ Prompt"),d.push("prompt input not found"),T("img-prompt","error")),await h(800);const g=new Set;document.querySelectorAll("img").forEach(v=>{v.src&&g.add(v.src)}),n(`บันทึกรูปเดิม: ${g.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),T("img-generate","active"),await h(500);const o=Pt();if(o){const v=o.getBoundingClientRect(),u=v.left+v.width/2,y=v.top+v.height/2,M={bubbles:!0,cancelable:!0,clientX:u,clientY:y,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",M)),await h(80),o.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",M)),o.dispatchEvent(new MouseEvent("click",M)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),s.push("✅ Generate"),await h(500),o.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",M)),await h(80),o.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",M)),o.dispatchEvent(new MouseEvent("click",M)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),T("img-generate","done")}else I("ไม่พบปุ่ม → Generate"),s.push("❌ Generate"),d.push("generate button not found"),T("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),T("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await h(15e3);const v=()=>{const C=document.querySelectorAll("div, span, p, label, strong, small");for(const E of C){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim();if(B.length>10)continue;const b=B.match(/(\d{1,3})\s*%/);if(!b)continue;const m=parseInt(b[1],10);if(m<1||m>100)continue;const k=E.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return m}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let u=null,y=-1,M=0;const F=Date.now();for(;!u&&Date.now()-F<18e4;){const C=document.querySelectorAll("img");for(const E of C){if(g.has(E.src)||!(E.alt||"").toLowerCase().includes("generated"))continue;const b=E.getBoundingClientRect();if(b.width>120&&b.height>120&&b.top>0&&b.top<window.innerHeight*.85){const m=E.closest("div");if(m){u=m,n(`พบรูป AI จาก alt="${E.alt}": ${E.src.substring(0,80)}...`);break}}}if(!u)for(const E of C){if(g.has(E.src))continue;const B=E.closest("div"),b=(B==null?void 0:B.textContent)||"";if(b.includes("product.png")||b.includes("character.png")||b.includes(".png")||b.includes(".jpg"))continue;const m=E.getBoundingClientRect();if(m.width>120&&m.height>120&&m.top>0&&m.top<window.innerHeight*.85){const k=E.closest("div");if(k){u=k,n(`พบรูปใหม่ (สำรอง): ${E.src.substring(0,80)}...`);break}}}if(!u){if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const E=It();if(E){I(`❌ สร้างรูปล้มเหลว: ${E}`),d.push(`image gen failed: ${E}`),T("img-wait","error");break}const B=v();B!==null?(B!==y&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${B}%`),y=B,T("img-wait","active",B)),M=Date.now()):y>30&&Math.floor((Date.now()-M)/1e3)>=3&&n(`🖼️ % หายที่ ${y}% — รูปน่าจะเสร็จแล้ว`),document.hidden&&y>0&&Date.now()-M>1e4&&await $e(),await h(3e3)}}if(!u)I("หมดเวลารอรูปที่สร้าง"),s.push("⚠️ Wait Image"),T("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),s.push("✅ Image Found"),T("img-wait","done",100);const C=u.getBoundingClientRect(),E=C.left+C.width/2,B=C.top+C.height/2,b={bubbles:!0,cancelable:!0,clientX:E,clientY:B};u.dispatchEvent(new PointerEvent("pointerenter",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseenter",b)),u.dispatchEvent(new PointerEvent("pointerover",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mouseover",b)),u.dispatchEvent(new PointerEvent("pointermove",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),u.dispatchEvent(new MouseEvent("mousemove",b)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await h(1500);let m=null;for(const k of["more_vert","more_horiz","more"]){const O=Ve(k);for(const H of O){const _=H.getBoundingClientRect();if(_.top>=C.top-20&&_.top<=C.bottom&&_.right>=C.right-150&&_.right<=C.right+20){m=H;break}}if(m)break}if(!m){const k=document.querySelectorAll("button");for(const O of k){const H=O.getBoundingClientRect();if(H.width<50&&H.height<50&&H.top>=C.top-10&&H.top<=C.top+60&&H.left>=C.right-80){const _=O.querySelectorAll("i");for(const z of _)if((((P=z.textContent)==null?void 0:P.trim())||"").includes("more")){m=O;break}if(m)break;const L=O.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){m=O;break}}}}if(!m)I("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),s.push("⚠️ 3-dots");else{const k=m.getBoundingClientRect(),O=k.left+k.width/2,H=k.top+k.height/2,_={bubbles:!0,cancelable:!0,clientX:O,clientY:H,button:0};m.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mousedown",_)),await h(80),m.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),m.dispatchEvent(new MouseEvent("mouseup",_)),m.dispatchEvent(new MouseEvent("click",_)),n("คลิกปุ่ม 3 จุดแล้ว"),await h(1500);let L=null;const z=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const N of z){const U=(N.textContent||"").trim();if(U.includes("ทำให้เป็นภาพเคลื่อนไหว")||U.includes("Animate")||U.includes("animate")){L=N;break}}if(!L)I("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),s.push("⚠️ Animate");else{const N=L.getBoundingClientRect(),U=N.left+N.width/2,j=N.top+N.height/2,V={bubbles:!0,cancelable:!0,clientX:U,clientY:j,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",V)),await h(80),L.dispatchEvent(new PointerEvent("pointerup",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",V)),L.dispatchEvent(new MouseEvent("click",V)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),s.push("✅ Animate"),T("animate","done"),await h(3e3)}}}}catch(v){I(`ขั้น 4 ผิดพลาด: ${v.message}`),s.push("⚠️ Animate")}if(me()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Pe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),T("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await h(3e3);let v=!1;const u=document.querySelectorAll("button, span, div");for(const C of u){const E=(C.textContent||"").trim(),B=C.getBoundingClientRect();if((E==="วิดีโอ"||E==="Video"||E.includes("วิดีโอ"))&&B.bottom>window.innerHeight*.7){v=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}v||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)");let y=!1;if(document.hidden){n("🔄 Tab ซ่อนอยู่ — สลับมาค้างเพื่อวาง prompt + กด Generate");try{await new Promise(C=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>C())),y=!0,await h(1500)}catch{n("⚠️ FOCUS_TAB ล้มเหลว — ลองวางต่อ")}}await h(1e3);const M=_t();if(M){await Ae(M,t.videoPrompt);const C=(M.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(C.length<20){if(n(`⚠️ Prompt ไม่ถูกวาง (ได้ ${C.length} ตัวอักษร) — ลองวางใหม่`),document.hidden)try{await new Promise(B=>chrome.runtime.sendMessage({type:"FOCUS_TAB"},()=>B())),y=!0,await h(1500)}catch{}M.focus(),await h(500),await Ae(M,t.videoPrompt);const E=(M.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();E.length<20?(I(`❌ วาง Video Prompt ไม่สำเร็จแม้ลองซ้ำ (ได้ ${E.length} ตัวอักษร)`),s.push("❌ Video Prompt"),d.push("video prompt paste failed after retry"),T("vid-prompt","error")):(n(`วาง Video Prompt สำเร็จหลังลองใหม่ (${E.length} ตัวอักษร)`),s.push("✅ Video Prompt"),T("vid-prompt","done"))}else n(`วาง Video Prompt แล้ว (${C.length} ตัวอักษร)`),s.push("✅ Video Prompt"),T("vid-prompt","done")}else I("ไม่พบช่อง Prompt สำหรับ Video Prompt"),s.push("❌ Video Prompt"),d.push("video prompt input not found"),T("vid-prompt","error");await h(1e3),T("vid-generate","active");const F=Pt();if(F){const C=F.getBoundingClientRect(),E=C.left+C.width/2,B=C.top+C.height/2,b={bubbles:!0,cancelable:!0,clientX:E,clientY:B,button:0};F.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mousedown",b)),await h(80),F.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mouseup",b)),F.dispatchEvent(new MouseEvent("click",b)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),s.push("✅ Video Generate"),T("vid-generate","done"),await h(500),F.dispatchEvent(new PointerEvent("pointerdown",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mousedown",b)),await h(80),F.dispatchEvent(new PointerEvent("pointerup",{...b,pointerId:1,isPrimary:!0,pointerType:"mouse"})),F.dispatchEvent(new MouseEvent("mouseup",b)),F.dispatchEvent(new MouseEvent("click",b)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else I("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),s.push("❌ Video Generate"),d.push("video generate button not found"),T("vid-generate","error");if(y){await h(2e3);try{chrome.runtime.sendMessage({type:"UNFOCUS_TAB"})}catch{}n("🔄 คืน tab เดิม — วิดีโอกำลังสร้างเบื้องหลัง")}}catch(v){I(`ขั้น 5 ผิดพลาด: ${v.message}`),s.push("⚠️ Video Gen"),d.push(`video gen error: ${v.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),we("animate"),we("vid-prompt"),we("vid-generate"),we("vid-wait");if(t.videoPrompt){T("vid-wait","active");const v=t.sceneCount||1,u=t.videoScenePrompts||[t.videoPrompt];if(v>1)try{jt(v)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${v>1?`ต่อ ${v} ฉาก`:"ดาวน์โหลด"} ===`);const y=()=>{const C=document.querySelectorAll("div, span, p, label, strong, small");for(const E of C){if(E.closest("#netflow-engine-overlay"))continue;const B=(E.textContent||"").trim();if(B.length>10)continue;const b=B.match(/(\d{1,3})\s*%/);if(!b)continue;const m=parseInt(b[1],10);if(m<1||m>100)continue;const k=E.getBoundingClientRect();if(!(k.width===0||k.width>150)&&!(k.top<0||k.top>window.innerHeight))return m}return null},M=async(C=6e5)=>{n("รอการสร้างวิดีโอ..."),T("vid-wait","active"),await h(5e3);const E=()=>{const V=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const G of V){if(G.closest("#netflow-engine-overlay"))continue;const Z=(G.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const ie=G.tagName.toLowerCase(),re=G.className&&typeof G.className=="string"?G.className.split(/\s+/).slice(0,2).join(" "):"",ce=G.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${ie}.${re}> ที่ (${ce.left.toFixed(0)},${ce.top.toFixed(0)}) w=${ce.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},B=Ze();n(B?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),E();const b=Date.now();let m=-1,k=0,O=!1;for(;Date.now()-b<C;){const V=y();if(V!==null){if(V!==m&&(n(`ความคืบหน้าวิดีโอ: ${V}%`),m=V,T("vid-wait","active",V)),k=Date.now(),V>=100){n("✅ ตรวจพบ 100%!"),O=!0;break}}else if(m>30){const X=Math.floor((Date.now()-k)/1e3);if(X>=5){n(`✅ % หายไปที่ ${m}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),O=!0;break}n(`⏳ % หายที่ ${m}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-b)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!O&&m>0&&Ze(!0)&&!B){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${m}% — วิดีโอเสร็จ!`),O=!0;break}if(me())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(m<1){const X=It();if(X)return I(`❌ สร้างวิดีโอล้มเหลว: ${X}`),null}document.hidden&&m>0&&Date.now()-k>1e4&&await $e(),document.hidden&&m<1&&Date.now()-b>3e4&&await $e(),await h(3e3)}const H=Ze();if(!H)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),T("vid-wait","error"),null;const _=H;O?(T("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await h(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=_.getBoundingClientRect();let z=L.left+L.width/2,N=L.top+L.height/2,U=_;const j=_.querySelector("video, img, canvas");if(j){const V=j.getBoundingClientRect();V.width>50&&V.height>50&&(z=V.left+V.width/2,N=V.top+V.height/2,U=j,n(`🎯 พบรูปย่อ <${j.tagName.toLowerCase()}> ในการ์ดที่ (${z.toFixed(0)},${N.toFixed(0)}) ${V.width.toFixed(0)}x${V.height.toFixed(0)}`))}else N=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${z.toFixed(0)},${N.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${z.toFixed(0)}, ${N.toFixed(0)})...`),Zt(U);for(let V=0;V<8;V++){const X={bubbles:!0,cancelable:!0,clientX:z+V%2,clientY:N};U.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),U.dispatchEvent(new MouseEvent("mousemove",X)),await h(500)}try{chrome.storage.local.set({[le()]:{timestamp:Date.now(),action:"mute_video",sceneCount:v,scenePrompts:u,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${v} ฉาก, ${u.length} prompts, theme: ${t.theme})`)}catch(V){n(`⚠️ ไม่สามารถบันทึก pending action: ${V.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(U),n("✅ คลิกการ์ดวิดีโอเสร็จ"),_},F=async C=>{const E=C.getBoundingClientRect(),B=E.left+E.width/2,b=E.top+E.height/2,m={bubbles:!0,cancelable:!0,clientX:B,clientY:b,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",m)),await h(80),C.dispatchEvent(new PointerEvent("pointerup",{...m,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",m)),C.dispatchEvent(new MouseEvent("click",m)),await h(50),C.click(),n("คลิกการ์ดวิดีโอแล้ว"),await h(2e3)};try{if(!await M())I("หมดเวลารอการสร้างวิดีโอ"),s.push("⚠️ Video Wait"),T("vid-wait","error");else{s.push("✅ Video Complete"),T("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await h(3e3);const E=await new Promise(B=>{chrome.storage.local.get(le(),b=>{if(chrome.runtime.lastError){B(null);return}B((b==null?void 0:b[le()])||null)})});E&&!E._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(le()),E.action==="mute_video"?await Rt(E.sceneCount||1,E.scenePrompts||[],E.theme):E.action==="wait_scene_gen_and_download"&&await Bt(E.sceneCount||2,E.currentScene||2,E.theme,E.scenePrompts||[]))}}catch(C){I(`ขั้น 6 ผิดพลาด: ${C.message}`),s.push("⚠️ Step6"),d.push(`step 6: ${C.message}`)}}const f=d.length===0;try{Pe(f?5e3:8e3)}catch(v){console.warn("Overlay complete error:",v)}return{success:f,message:f?`สำเร็จ! ${s.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${s.join(" → ")} | ${d.join(", ")}`,step:f?"done":"partial"}}async function Rt(t,e=[],r){var q;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Ge(r)}catch{}try{Ue(t)}catch(R){n(`⚠️ showOverlay error: ${R.message}`)}try{const R=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const P of R)T(P,"done");t>=2&&T("scene2-prompt","active"),n(`✅ overlay restored: ${R.length} steps done, sceneCount=${t}`)}catch(R){n(`⚠️ overlay restore error: ${R.message}`)}await h(1500);const a=(()=>{for(const R of document.querySelectorAll("button")){const P=R.querySelectorAll("i");for(const u of P){const y=(u.textContent||"").trim();if(y==="volume_up"||y==="volume_off"||y==="volume_mute"){const M=R.getBoundingClientRect();if(M.width>0&&M.height>0)return R}}const v=(R.getAttribute("aria-label")||"").toLowerCase();if(v.includes("mute")||v.includes("ปิดเสียง")){const u=R.getBoundingClientRect();if(u.width>0&&u.height>0)return R}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await h(2e3);for(let b=2;b<=t;b++){const m=e[b-1];if(!m){I(`ไม่พบ prompt สำหรับฉากที่ ${b}`);continue}n(`── ฉากที่ ${b}/${t}: วาง prompt + generate ──`);let k=null;const O=Date.now();for(;!k&&Date.now()-O<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(k=G[G.length-1]),!k){const Z=document.querySelectorAll("[role='textbox'][contenteditable='true']");Z.length>0&&(k=Z[Z.length-1])}k||await h(1e3)}if(!k){I("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${k.tagName.toLowerCase()}> ${k.className.substring(0,40)}`),await Ae(k,m),n(`วาง prompt ฉาก ${b} (${m.length} ตัวอักษร) ✅`);try{T(`scene${b}-prompt`,"done"),T(`scene${b}-gen`,"active")}catch{}await h(1e3);const H=k.getBoundingClientRect();let _=null,L=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const Z=G.querySelectorAll("i");let ie=!1;for(const Ee of Z)if((Ee.textContent||"").trim()==="arrow_forward"){ie=!0;break}if(!ie)continue;const re=G.getBoundingClientRect();if(re.width<=0||re.height<=0)continue;const ce=Math.abs(re.top-H.top)+Math.abs(re.right-H.right);ce<L&&(L=ce,_=G)}if(!_)for(const G of document.querySelectorAll("button")){const Z=G.querySelectorAll("i");for(const ie of Z)if((ie.textContent||"").trim()==="arrow_forward"){const re=G.getBoundingClientRect();if(re.width>0&&re.height>0){_=G;break}}if(_)break}if(!_){I("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({[le()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:b,scenePrompts:e}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${b}/${t})`),await ee(_),n(`คลิก Generate ฉาก ${b} ✅`);try{T(`scene${b}-gen`,"done"),T(`scene${b}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${b} gen เสร็จ ──`),await h(5e3);let z=0,N=0;const U=Date.now(),j=6e5,V=5e3;let X=!1;for(;Date.now()-U<j;){let G=null;const Z=document.querySelectorAll("div, span, p, label, strong, small");for(const ie of Z){if(ie.closest("#netflow-engine-overlay"))continue;const ce=(ie.textContent||"").trim().match(/^(\d{1,3})%$/);if(ce){const Ee=ie.getBoundingClientRect();if(Ee.width>0&&Ee.height>0&&Ee.width<120&&Ee.height<60){G=parseInt(ce[1],10);break}}}if(G!==null){if(G!==z){n(`🎬 ฉาก ${b} ความคืบหน้า: ${G}%`),z=G;try{T(`scene${b}-wait`,"active",G)}catch{}}N=0}else if(z>0){if(N===0)N=Date.now(),n(`🔍 ฉาก ${b}: % หายไป (จาก ${z}%) — กำลังยืนยัน...`);else if(Date.now()-N>=V){n(`✅ ฉาก ${b}: % หายไป ${V/1e3} วินาที — เจนเสร็จ!`),X=!0;break}}if(me()){n("⛔ ผู้ใช้สั่งหยุด");return}document.hidden&&z>0&&N===0&&await $e(),await h(2e3)}X||I(`ฉาก ${b} หมดเวลา`),n(`✅ ฉาก ${b} เสร็จแล้ว`);try{T(`scene${b}-wait`,"done",100)}catch{}chrome.storage.local.remove(le()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await h(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{T("download","active")}catch{}await h(2e3);const R=Date.now();let P=null;const v=Date.now();for(;!P&&Date.now()-v<1e4;){for(const b of document.querySelectorAll("button")){const m=b.querySelector("i");if(m&&(m.textContent||"").trim()==="download"){const k=b.getBoundingClientRect();if(k.width>0&&k.height>0){P=b;break}}}P||await h(1e3)}if(!P){I("ไม่พบปุ่มดาวน์โหลด");return}await ee(P),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await h(1500);let u=null;for(let b=0;b<3&&!u;b++){b>0&&n(`🔄 ลองหา 720p ครั้งที่ ${b+1}...`);let m=null;const k=Date.now();for(;!m&&Date.now()-k<5e3;){for(const z of document.querySelectorAll("[role='menuitem']"))if((z.textContent||"").trim().includes("Full Video")&&z.querySelector("i")){const U=z.getBoundingClientRect();if(U.width>0&&U.height>0){m=z;break}}m||await h(500)}if(!m){I("ไม่พบ Full Video");continue}const O=m.getBoundingClientRect(),H=O.left+O.width/2,_=O.top+O.height/2;m.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:H,clientY:_})),m.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:H,clientY:_})),m.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:H,clientY:_})),await ee(m),n("คลิก/hover Full Video ✅"),await h(2e3);const L=Date.now();for(;!u&&Date.now()-L<8e3;){for(const z of document.querySelectorAll("button[role='menuitem']")){const N=z.querySelectorAll("span");for(const U of N)if((U.textContent||"").trim()==="720p"){const j=z.getBoundingClientRect();if(j.width>0&&j.height>0){u=z;break}}if(u)break}u||(m.isConnected&&(m.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:H,clientY:_})),m.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:H+20,clientY:_}))),await h(500))}}if(!u){I("ไม่พบ 720p");return}await ee(u),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const y=Date.now();let M=!1,F=!1;for(;Date.now()-y<3e5;){for(const b of document.querySelectorAll("div[data-title] div, div[data-content] div")){const m=(b.textContent||"").trim();if(m==="Download complete!"||m==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),M=!0;break}(m.includes("Downloading your extended video")||m.includes("กำลังดาวน์โหลด"))&&(F||(F=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(M)break;if(F){let b=!1;for(const m of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((m.textContent||"").trim().includes("Downloading")){b=!0;break}if(!b){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),M=!0;break}}if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await h(2e3)}if(!M){I("เตรียมไฟล์หมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await h(5e3);let C=!1;const E=Date.now();for(;Date.now()-E<6e4&&!C;){try{await new Promise(b=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:R},m=>{chrome.runtime.lastError?I(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):m!=null&&m.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${m.message}`),C=!0,m.downloadUrl&&(i=m.downloadUrl,n(`[TikTok] จะใช้ download URL: ${m.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-E)/1e3)}s)`),b()})})}catch(b){I(`ตรวจสอบผิดพลาด: ${b.message}`)}C||await h(3e3)}C||I("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const B=await Xe();i||(i=B);try{T("open","done"),Pe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),je(i),Ye(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await h(2e3);const p=(R,P="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const v of document.querySelectorAll(P)){const u=(v.textContent||"").trim();if(u.includes(R)&&u.length<100){const y=v.getBoundingClientRect();if(y.width>0&&y.height>0&&y.top>=0)return v}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const c=Date.now();for(;!l&&Date.now()-c<1e4;){for(const R of document.querySelectorAll("button, [role='button']")){const P=(R.textContent||"").trim(),v=P.toLowerCase();if((v.includes("download")||v.includes("ดาวน์โหลด"))&&P.length<80){const u=R.getBoundingClientRect();if(u.width>0&&u.height>0){l=R;break}}}if(!l)for(const R of document.querySelectorAll("button")){const P=(R.getAttribute("aria-label")||"").toLowerCase();if(P.includes("download")||P.includes("ดาวน์")){const v=R.getBoundingClientRect();if(v.width>0&&v.height>0){l=R;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await h(1e3))}if(!l){I("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await ee(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await h(1500);const s=Date.now();let d=null;const w=Date.now();for(;!d&&Date.now()-w<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await h(500));if(!d){I("ไม่พบ 1080p");return}await ee(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const x=Date.now();let S=!1,D=!1,A=0;const g=3e3;for(;Date.now()-x<3e5;){const P=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(P.includes("upscaling complete")||P.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),S=!0;break}for(const u of document.querySelectorAll("div, span, p")){const y=(u.textContent||"").trim().toLowerCase();if(y.length<60&&(y.includes("upscaling complete")||y.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(q=u.textContent)==null?void 0:q.trim()}")`),S=!0;break}}if(S)break;if(P.includes("upscaling your video")||P.includes("กำลังอัปสเกล")){D=!0,A=0;const u=Math.floor((Date.now()-x)/1e3);n(`⏳ กำลังอัปสเกล... (${u} วินาที)`)}else if(D){if(A===0)A=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-A>=g){n(`✅ ข้อความ Upscaling หายไป ${g/1e3} วินาที — เสร็จ!`),S=!0;break}}else{const u=Math.floor((Date.now()-x)/1e3);u%10<3&&n(`⏳ รอ Upscale... (${u} วินาที)`)}if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await h(2e3)}if(!S){I("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await h(5e3);let o=!1;const f=Date.now();for(;Date.now()-f<6e4&&!o;){try{await new Promise(R=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},P=>{chrome.runtime.lastError?I(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):P!=null&&P.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${P.message}`),o=!0,P.downloadUrl&&(i=P.downloadUrl,n(`[TikTok] จะใช้ download URL: ${P.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-f)/1e3)}s)`),R()})})}catch(R){I(`ตรวจสอบผิดพลาด: ${R.message}`)}o||await h(3e3)}o||I("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const $=await Xe();i||(i=$),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),je(i),Ye(2e3)}async function Bt(t=2,e=2,r,a=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Ge(r)}catch{}try{Ue(t)}catch(u){n(`⚠️ showOverlay error: ${u.message}`)}try{const u=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let y=2;y<=e;y++)u.push(`scene${y}-prompt`,`scene${y}-gen`),y<e&&u.push(`scene${y}-wait`);for(const y of u)T(y,"done");T(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${u.length} steps done (scene ${e}/${t} navigate)`)}catch(u){n(`⚠️ overlay restore error: ${u.message}`)}await h(2e3);const i=(()=>{for(const u of document.querySelectorAll("button")){const y=u.querySelectorAll("i");for(const M of y){const F=(M.textContent||"").trim();if(F==="volume_up"||F==="volume_off"||F==="volume_mute"){const C=u.getBoundingClientRect();if(C.width>0&&C.height>0)return u}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,l=0;const c=Date.now(),s=6e5,d=5e3;let w=!1,x=0;for(;Date.now()-c<s;){let u=null;const y=document.querySelectorAll("div, span, p, label, strong, small");for(const M of y){if(M.closest("#netflow-engine-overlay"))continue;const C=(M.textContent||"").trim().match(/^(\d{1,3})%$/);if(C){const E=M.getBoundingClientRect();if(E.width>0&&E.height>0&&E.width<120&&E.height<60){u=parseInt(C[1],10);break}}}if(u!==null){if(x=0,u!==p){n(`🎬 scene ${e} ความคืบหน้า: ${u}%`),p=u;try{T(`scene${e}-wait`,"active",u)}catch{}}l=0}else if(p>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-l>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),w=!0;break}}else if(x++,x>=15){const M=document.querySelectorAll("video");let F=!1;for(const C of M)if(C.readyState>=2&&!C.paused&&C.getBoundingClientRect().width>200){F=!0;break}if(F){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),w=!0;break}if(x>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),w=!0;break}}document.hidden&&p>0&&l===0&&await $e(),await h(2e3)}w||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{T(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&a.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await h(2e3);for(let u=e+1;u<=t;u++){const y=a[u-1];if(!y){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${u} — ข้าม`);continue}n(`── ฉากที่ ${u}/${t}: วาง prompt + generate (pending recovery) ──`);let M=null;const F=Date.now();for(;!M&&Date.now()-F<1e4;){const _=document.querySelectorAll("[data-slate-editor='true']");if(_.length>0&&(M=_[_.length-1]),!M){const L=document.querySelectorAll("[role='textbox'][contenteditable='true']");L.length>0&&(M=L[L.length-1])}M||await h(1e3)}if(!M){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${u}`);break}await Ae(M,y),n(`วาง prompt ฉาก ${u} (${y.length} ตัวอักษร) ✅`);try{T(`scene${u}-prompt`,"done"),T(`scene${u}-gen`,"active")}catch{}await h(1e3);const C=M.getBoundingClientRect();let E=null,B=1/0;for(const _ of document.querySelectorAll("button")){if(_.disabled)continue;const L=_.querySelectorAll("i");let z=!1;for(const j of L)if((j.textContent||"").trim()==="arrow_forward"){z=!0;break}if(!z)continue;const N=_.getBoundingClientRect();if(N.width<=0||N.height<=0)continue;const U=Math.abs(N.top-C.top)+Math.abs(N.right-C.right);U<B&&(B=U,E=_)}if(!E)for(const _ of document.querySelectorAll("button")){const L=_.querySelectorAll("i");for(const z of L)if((z.textContent||"").trim()==="arrow_forward"){const N=_.getBoundingClientRect();if(N.width>0&&N.height>0){E=_;break}}if(E)break}if(!E){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${u}`);break}await new Promise(_=>{chrome.storage.local.set({[le()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:u,scenePrompts:a}},()=>_())}),await ee(E),n(`คลิก Generate ฉาก ${u} ✅`);try{T(`scene${u}-gen`,"done"),T(`scene${u}-wait`,"active")}catch{}await h(5e3);let b=0,m=0;const k=Date.now();let O=!1,H=0;for(;Date.now()-k<6e5;){let _=null;const L=document.querySelectorAll("div, span, p, label, strong, small");for(const z of L){if(z.closest("#netflow-engine-overlay"))continue;const U=(z.textContent||"").trim().match(/^(\d{1,3})%$/);if(U){const j=z.getBoundingClientRect();if(j.width>0&&j.height>0&&j.width<120&&j.height<60){_=parseInt(U[1],10);break}}}if(_!==null){if(H=0,_!==b){n(`🎬 ฉาก ${u} ความคืบหน้า: ${_}%`),b=_;try{T(`scene${u}-wait`,"active",_)}catch{}}m=0}else if(b>0){if(m===0)m=Date.now();else if(Date.now()-m>=5e3){n(`✅ ฉาก ${u}: เจนเสร็จ!`),O=!0;break}}else if(H++,H>=15){const z=document.querySelectorAll("video");let N=!1;for(const U of z)if(U.readyState>=2&&!U.paused&&U.getBoundingClientRect().width>200){N=!0;break}if(N){n(`✅ ฉาก ${u}: พบวิดีโอเล่นอยู่ — เสร็จ`),O=!0;break}if(H>=30){n(`✅ ฉาก ${u}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),O=!0;break}}document.hidden&&b>0&&m===0&&await $e(),await h(2e3)}O||n(`⚠️ ฉาก ${u} หมดเวลา`);try{T(`scene${u}-wait`,"done",100)}catch{}n(`✅ ฉาก ${u} เสร็จแล้ว`),chrome.storage.local.remove(le()),await h(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await h(3e3);let S=null;try{T("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const D=Date.now();let A=null;const g=Date.now();for(;!A&&Date.now()-g<1e4;){for(const u of document.querySelectorAll("button")){const y=u.querySelector("i");if(y&&(y.textContent||"").trim()==="download"){const M=u.getBoundingClientRect();if(M.width>0&&M.height>0){A=u;break}}}A||await h(1e3)}if(!A){I("ไม่พบปุ่มดาวน์โหลด");return}await ee(A),n("คลิกดาวน์โหลดแล้ว ✅");try{T("download","done"),T("upscale","active")}catch{}await h(1500);let o=null;for(let u=0;u<3&&!o;u++){u>0&&n(`🔄 ลองหา 720p ครั้งที่ ${u+1}...`);let y=null;const M=Date.now();for(;!y&&Date.now()-M<5e3;){for(const b of document.querySelectorAll("[role='menuitem']"))if((b.textContent||"").trim().includes("Full Video")&&b.querySelector("i")){const k=b.getBoundingClientRect();if(k.width>0&&k.height>0){y=b;break}}y||await h(500)}if(!y){I("ไม่พบ Full Video");continue}const F=y.getBoundingClientRect(),C=F.left+F.width/2,E=F.top+F.height/2;y.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:C,clientY:E})),y.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:C,clientY:E})),y.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:C,clientY:E})),await ee(y),n("คลิก/hover Full Video ✅"),await h(2e3);const B=Date.now();for(;!o&&Date.now()-B<8e3;){for(const b of document.querySelectorAll("button[role='menuitem']")){const m=b.querySelectorAll("span");for(const k of m)if((k.textContent||"").trim()==="720p"){const O=b.getBoundingClientRect();if(O.width>0&&O.height>0){o=b;break}}if(o)break}o||(y.isConnected&&(y.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:C,clientY:E})),y.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:C+20,clientY:E}))),await h(500))}}if(!o){I("ไม่พบ 720p");return}await ee(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const f=Date.now();let $=!1,q=!1;for(;Date.now()-f<3e5;){for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div")){const y=(u.textContent||"").trim();if(y==="Download complete!"||y==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),$=!0;break}(y.includes("Downloading your extended video")||y.includes("กำลังดาวน์โหลด"))&&(q||(q=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if($)break;if(q){let u=!1;for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((y.textContent||"").trim().includes("Downloading")){u=!0;break}if(!u){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),$=!0;break}}await h(2e3)}if(!$){I("เตรียมไฟล์หมดเวลา");return}try{T("upscale","done",100),T("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await h(5e3);let R=!1;const P=Date.now();for(;Date.now()-P<6e4&&!R;){try{await new Promise(u=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:D},y=>{chrome.runtime.lastError?I(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),R=!0,y.downloadUrl&&(S=y.downloadUrl,n(`[TikTok] จะใช้ download URL: ${y.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-P)/1e3)}s)`),u()})})}catch(u){I(`ตรวจสอบผิดพลาด: ${u.message}`)}R||await h(3e3)}R||I("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const v=await Xe();S||(S=v);try{T("open","done"),Pe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),je(S),Ye(2e3)}async function pn(){try{await Kt;const t=le();let e=await new Promise(l=>{chrome.storage.local.get(t,c=>{if(chrome.runtime.lastError){l(null);return}l((c==null?void 0:c[t])||null)})});if(!e&&xe){const l="netflow_pending_action";e=await new Promise(c=>{chrome.storage.local.get(l,s=>{if(chrome.runtime.lastError){c(null);return}c((s==null?void 0:s[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const a=Date.now()-e.timestamp;if(a>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await h(300),!await new Promise(l=>{chrome.storage.local.get(t,c=>{const s=c==null?void 0:c[t];l((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(a/1e3)} วินาที)`),e.action==="mute_video"?await Rt(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await Bt(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),dn(t).then(a=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`),kt()}).catch(a=>{if(a instanceof Je||(a==null?void 0:a.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Le("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{Et()}catch{}}else console.error("[Netflow AI] Generate error:",a);kt()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await h(500);const a=tn();if(!a){I("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=a.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let c=0;c<2;c++){const s=document.elementFromPoint(p,l);s?(await ee(s),n(`คลิก ${c+1}/2 บน <${s.tagName.toLowerCase()}>`)):(await ee(a),n(`คลิก ${c+1}/2 บนการ์ด (สำรอง)`)),await h(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),pn()})();
