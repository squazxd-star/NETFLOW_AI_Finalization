(function(){"use strict";const de={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let Q=de.green,Ee=null;function Ve(t){t&&de[t]&&(Ee=t,Q=de[t],Ze(),requestAnimationFrame(()=>yt()))}function Rt(){if(Ee&&de[Ee])return de[Ee];try{const t=localStorage.getItem("netflow_app_theme");if(t&&de[t])return de[t]}catch{}return de.green}let te=0,ne=255,oe=65;function Ze(){const t=Q.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(te=parseInt(t[1],16),ne=parseInt(t[2],16),oe=parseInt(t[3],16))}const et='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',tt='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let W=null,K=null,pe=null,nt=0,Re=null,ke=null,Be=null,Ge=0,fe=!1,se=null,Ce=null,Te=null,he=1,Y=[];function De(t){const e=[{stepId:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let a=2;a<=t;a++)e.push({stepId:`scene${a}-prompt`,label:`ฉาก ${a} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${a}-gen`,label:`ฉาก ${a} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${a}-wait`,label:`ฉาก ${a} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const ae=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];Y=De(1);function Bt(t){const e=t.rgb,a=t.accentRgb,r=t.doneRgb,i=t.hex,p=t.accentHex,l=t.doneHex,s=(()=>{const h=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=b=>Math.min(255,b+80);return`#${[1,2,3].map(b=>o(parseInt(h[b],16)).toString(16).padStart(2,"0")).join("")}`})(),c=(()=>{const h=l.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!h)return"#4ade80";const o=b=>Math.min(255,b+60);return`#${[1,2,3].map(b=>o(parseInt(h[b],16)).toString(16).padStart(2,"0")).join("")}`})(),d=i.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),u=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,k=d?parseInt(d[1],16)/u:0,R=d?parseInt(d[2],16)/u:1,C=d?parseInt(d[3],16)/u:.25,E=h=>`${Math.round(k*h)}, ${Math.round(R*h)}, ${Math.round(C*h)}`;return`
/* ─── Google Font ─── */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@500;600;700&family=Share+Tech+Mono&display=swap');

/* ─── Overlay Container ─── */
#netflow-engine-overlay {
    position: fixed;
    inset: 0;
    z-index: 999999;
    background:
        radial-gradient(ellipse at 25% 15%, rgba(${e},0.15) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 85%, rgba(${a},0.12) 0%, transparent 50%),
        radial-gradient(ellipse at 10% 80%, rgba(${e},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 90% 10%, rgba(${a},0.08) 0%, transparent 45%),
        radial-gradient(ellipse at 50% 50%, rgba(${E(18)},0.94) 0%, rgba(${E(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
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
        radial-gradient(ellipse at 100% 100%, rgba(${a},0.09) 0%, transparent 40%),
        radial-gradient(ellipse at 100% 0%, rgba(${e},0.06) 0%, transparent 35%),
        radial-gradient(ellipse at 0% 100%, rgba(${a},0.06) 0%, transparent 35%);
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
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${a},0.18); }
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
        rgba(${a},0.054) 70px,
        rgba(${a},0.054) 71px
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
        rgba(${a},0.045) 113px,
        rgba(${a},0.045) 114px
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
    background: radial-gradient(circle, rgba(${a},0.16) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${a},0.12) 0%, transparent 70%);
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
    background: radial-gradient(circle, rgba(${e},0.18) 0%, rgba(${a},0.06) 40%, transparent 70%);
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
        linear-gradient(0deg, rgba(${a},0.025) 2px, transparent 2px),
        linear-gradient(90deg, rgba(${a},0.025) 2px, transparent 2px);
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
        radial-gradient(circle at 0% 75%, rgba(${a},0.05) 2px, transparent 2px),
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
        rgba(${a},0.06) 195deg,
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
        rgba(${a},0.035) 18px,
        rgba(${a},0.035) 19px
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
        radial-gradient(circle, rgba(${a},0.05) 1px, transparent 1px);
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
            rgba(${a},0.025) 40px, rgba(${a},0.025) 41px
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
        rgba(${a},0.035) 25px, rgba(${a},0.035) 26px
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
        linear-gradient(45deg, transparent 75%, rgba(${a},0.03) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(${a},0.03) 75%);
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
        radial-gradient(ellipse at 80% 20%, rgba(${a},0.12) 0%, transparent 45%),
        radial-gradient(ellipse at 60% 80%, rgba(${e},0.10) 0%, transparent 40%),
        radial-gradient(ellipse at 30% 10%, rgba(${a},0.08) 0%, transparent 50%),
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
        rgba(${a},0.04) 2.5%,
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
    background: rgba(${E(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${E(180)},0.05),
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
            0 0 200px rgba(${E(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${E(180)},0.08),
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
    filter: drop-shadow(0 0 18px rgba(${a},0.25));
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
    0%, 100% { opacity: 0.45; filter: drop-shadow(0 0 18px rgba(${a},0.25)); }
    50%      { opacity: 0.6;  filter: drop-shadow(0 0 28px rgba(${a},0.4)); }
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
.nf-term-line.nf-term-done { color: rgba(${r}, 0.85); }
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

@keyframes nf-status-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.nf-term-done .nf-term-status {
    background: rgba(${r}, 0.12);
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
    background: linear-gradient(180deg, rgba(${E(5)},0.95) 0%, rgba(${E(12)},0.98) 100%);
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
    background: radial-gradient(circle, rgba(${e},0.25) 0%, rgba(${a},0.08) 40%, transparent 70%);
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
    border-top: 1px solid rgba(${a},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${E(6)},0.75) 0%, rgba(${E(3)},0.92) 100%);
    padding: 6px 0;
    box-shadow: 0 0 12px rgba(${e},0.12), 0 0 24px rgba(${e},0.06), inset 0 1px 0 rgba(${a},0.08);
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
    color: rgba(${a},1);
    font-weight: 800;
    font-size: 13.5px;
    text-shadow:
        0 0 5px rgba(${a},0.7),
        0 0 12px rgba(${a},0.35),
        0 0 20px rgba(${e},0.2);
    letter-spacing: 1px;
}

/* ─── Cross-Pattern Modules ─── */
.nf-module {
    position: absolute;
    width: 264px;
    background: rgba(${E(8)}, 0.88);
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
    box-shadow: 0 0 20px rgba(${r}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${r}, 0.5), transparent);
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
    color: rgba(${r}, 0.85);
    text-shadow:
        0 0 4px rgba(${r},0.5),
        0 0 12px rgba(${r},0.3);
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
    box-shadow: 0 0 5px rgba(${r}, 0.5);
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
    box-shadow: 0 0 6px rgba(${e},0.4);
}

.nf-step-done .nf-progress-fill {
    background: linear-gradient(90deg, ${l}, ${c});
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
    background: linear-gradient(90deg, ${l}, ${c});
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
    background: rgba(${E(8)},0.8);
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
    background: rgba(${E(8)}, 0.9);
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
    color: ${s};
    animation: nf-status-pulse 1.5s ease-in-out infinite;
    text-shadow: 0 0 6px rgba(${e},0.3);
}

.nf-proc-done {
    color: rgba(${r},0.85);
}
.nf-proc-done .nf-proc-num {
    color: rgba(${r},0.5);
    text-shadow: 0 0 4px rgba(${r},0.3);
}
.nf-proc-done .nf-proc-label {
    text-shadow:
        0 0 3px rgba(${r},0.4),
        0 0 8px rgba(${r},0.2);
}
.nf-proc-done .nf-proc-dot {
    background: ${l};
    box-shadow: 0 0 5px rgba(${r},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${r},0.1);
    color: ${c};
    text-shadow: 0 0 4px rgba(${r},0.3);
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

    `}function ot(){pe||(pe=document.createElement("style"),pe.id="netflow-overlay-styles",pe.textContent=Bt(Q),document.head.appendChild(pe))}function it(t){t.innerHTML="",Y.forEach((e,a)=>{const r=document.createElement("div");r.className="nf-proc-row nf-proc-waiting",r.id=`nf-proc-${e.stepId}`,r.innerHTML=`
            <span class="nf-proc-num">${a+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(r)})}function at(){const t=document.getElementById("nf-terminal");if(!t)return;it(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${Y.length}`)}function rt(t,e){let s="";for(let R=0;R<20;R++){const C=R/20*Math.PI*2,E=(R+.2)/20*Math.PI*2,h=(R+.5)/20*Math.PI*2,o=(R+.8)/20*Math.PI*2,b=(R+1)/20*Math.PI*2;s+=`${R===0?"M":"L"}${(120+100*Math.cos(C)).toFixed(1)},${(120+100*Math.sin(C)).toFixed(1)} `,s+=`L${(120+100*Math.cos(E)).toFixed(1)},${(120+100*Math.sin(E)).toFixed(1)} `,s+=`L${(120+112*Math.cos(h)).toFixed(1)},${(120+112*Math.sin(h)).toFixed(1)} `,s+=`L${(120+100*Math.cos(o)).toFixed(1)},${(120+100*Math.sin(o)).toFixed(1)} `,s+=`L${(120+100*Math.cos(b)).toFixed(1)},${(120+100*Math.sin(b)).toFixed(1)} `}s+="Z";const c=14,d=72,u=62;let k="";for(let R=0;R<c;R++){const C=R/c*Math.PI*2,E=(R+.25)/c*Math.PI*2,h=(R+.75)/c*Math.PI*2,o=(R+1)/c*Math.PI*2;k+=`${R===0?"M":"L"}${(120+u*Math.cos(C)).toFixed(1)},${(120+u*Math.sin(C)).toFixed(1)} `,k+=`L${(120+d*Math.cos(E)).toFixed(1)},${(120+d*Math.sin(E)).toFixed(1)} `,k+=`L${(120+d*Math.cos(h)).toFixed(1)},${(120+d*Math.sin(h)).toFixed(1)} `,k+=`L${(120+u*Math.cos(o)).toFixed(1)},${(120+u*Math.sin(o)).toFixed(1)} `}return k+="Z",`<svg width="72" height="72" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <path d="${k}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${u}" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="2,3"/>
        </g>

        <!-- Thin separator ring -->
        <circle cx="120" cy="120" r="50" fill="none" stroke="rgba(${t},0.12)" stroke-width="0.3"/>

        <!-- Core dot -->
        <circle cx="120" cy="120" r="5" fill="rgba(${t},0.8)">
            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
    </svg>`}function Dt(){const t=document.createElement("div");t.id="netflow-engine-overlay",se=document.createElement("canvas"),se.id="nf-matrix-canvas",t.appendChild(se);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let g=1;g<=5;g++){const y=document.createElement("div");y.className=`nf-ambient-orb nf-orb-${g}`,t.appendChild(y)}const a=document.createElement("div");a.className="nf-pat-data",t.appendChild(a);const r=document.createElement("div");r.className="nf-pat-diag-a",t.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-b",t.appendChild(i);const p=document.createElement("div");p.className="nf-pat-circuit",t.appendChild(p);const l=document.createElement("div");l.className="nf-pat-honeycomb",t.appendChild(l);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const c=document.createElement("div");c.className="nf-pat-crosshatch",t.appendChild(c);const d=document.createElement("div");d.className="nf-pat-diamond",t.appendChild(d);const u=document.createElement("div");u.className="nf-pat-wave-h",t.appendChild(u);const k=document.createElement("div");k.className="nf-pat-radar",t.appendChild(k);const R=document.createElement("div");R.className="nf-pat-ripple-1",t.appendChild(R);const C=document.createElement("div");C.className="nf-pat-ripple-2",t.appendChild(C);const E=document.createElement("div");E.className="nf-pat-techscan",t.appendChild(E);const h=document.createElement("div");h.className="nf-center-glow",t.appendChild(h);const o=document.createElement("div");o.className="nf-pat-noise",t.appendChild(o);const b=document.createElement("div");b.className="nf-crt-scanlines",t.appendChild(b);const I=document.createElement("div");I.className="nf-vignette",t.appendChild(I);for(let g=0;g<3;g++){const y=document.createElement("div");y.className="nf-pulse-ring",t.appendChild(y)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(g=>{const y=document.createElement("div");y.className=`nf-corner-deco ${g}`,t.appendChild(y)});const H=document.createElement("button");H.className="nf-stop-btn",H.innerHTML='<span class="nf-stop-icon"></span> หยุด',H.style.cssText="position:absolute !important;top:14px !important;right:110px !important;z-index:2147483646 !important;cursor:pointer !important;pointer-events:auto !important;background:rgba(255,60,60,0.08) !important;border:1px solid rgba(255,60,60,0.25) !important;border-radius:8px !important;color:rgba(255,100,100,0.8) !important;font-size:13px !important;padding:6px 14px !important;font-family:inherit !important;display:flex !important;align-items:center !important;gap:6px !important;",H.onclick=()=>{var g;window.__NETFLOW_STOP__=!0;try{Ne("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{typeof chrome<"u"&&((g=chrome.runtime)!=null&&g.sendMessage)&&chrome.runtime.sendMessage({action:"AUTOMATION_STOPPED"})}catch{}},t.appendChild(H);const B=document.createElement("div");B.className="nf-layout";const P=document.createElement("div");P.className="nf-core-monitor",P.id="nf-core-monitor";const v=document.createElement("div");v.className="nf-core-header",v.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${Y.length}</div>
    `,P.appendChild(v);const f=document.createElement("div");f.className="nf-terminal",f.id="nf-terminal",it(f),P.appendChild(f);const w=document.createElement("div");w.className="nf-engine-core",w.id="nf-engine-core";const M=document.createElement("div");M.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(g=>{const y=document.createElement("div");y.className=`nf-frame-corner ${g}`,M.appendChild(y)}),w.appendChild(M);const F="http://www.w3.org/2000/svg",T=document.createElementNS(F,"svg");T.setAttribute("class","nf-engine-waves"),T.setAttribute("viewBox","0 0 560 140"),T.setAttribute("preserveAspectRatio","none"),T.id="nf-engine-waves";for(let g=0;g<4;g++){const y=document.createElementNS(F,"path");y.setAttribute("fill","none"),y.setAttribute("stroke-width",g<2?"1.5":"1"),y.setAttribute("stroke",g<2?`rgba(${Q.rgb},${.14+g*.1})`:`rgba(${Q.accentRgb},${.1+(g-2)*.08})`),y.setAttribute("data-wave-idx",String(g)),T.appendChild(y)}w.appendChild(T);const $=document.createElement("div");$.className="nf-engine-brand-inner",$.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${rt(Q.rgb,Q.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${rt(Q.rgb,Q.accentRgb)}
        </div>
    `,w.appendChild($);const D=document.createElement("div");D.className="nf-engine-stats",D.id="nf-engine-stats",D.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([g,y,z])=>`<div class="nf-stat-item"><span class="nf-stat-label">${g}</span><span class="nf-stat-val" id="${y}">${z}</span></div>`).join(""),w.appendChild(D),P.appendChild(w),B.appendChild(P);const x=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];ae.forEach((g,y)=>{const z=zt(g);z.classList.add(x[y]),z.id=`nf-mod-${g.id}`,B.appendChild(z)}),t.appendChild(B);for(let g=0;g<30;g++){const y=document.createElement("div");y.className="nf-particle",y.style.left=`${5+Math.random()*90}%`,y.style.bottom=`${Math.random()*40}%`,y.style.animationDuration=`${3+Math.random()*5}s`,y.style.animationDelay=`${Math.random()*4}s`;const z=.3+Math.random()*.4,q=.7+Math.random()*.3;y.style.background=`rgba(${Math.floor(te*q)}, ${Math.floor(ne*q)}, ${Math.floor(oe*q)}, ${z})`,y.style.width=`${1+Math.random()*2}px`,y.style.height=y.style.width,t.appendChild(y)}return t}function zt(t){const e=document.createElement("div");e.className="nf-module";const a=document.createElement("div");a.className="nf-mod-header",a.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(a),t.steps.forEach(i=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(p)});const r=document.createElement("div");return r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(r),e}function Ft(){nt=Date.now(),Re=setInterval(()=>{const t=Math.floor((Date.now()-nt)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),a=String(t%60).padStart(2,"0"),r=document.getElementById("nf-timer");r&&(r.textContent=`${e}:${a}`);const i=document.getElementById("nf-stat-elapsed");i&&(i.textContent=`${e}:${a}`)},1e3)}function st(){Re&&(clearInterval(Re),Re=null)}const Ot=120,lt=160,ct=.4;let be=null,dt=0,pt=0,ft=0,Me=[];function Nt(t,e){Me=[];for(let a=0;a<Ot;a++){const r=Math.random();let i;r<.22?i=0:r<.4?i=1:r<.55?i=2:r<.68?i=3:r<.84?i=4:i=5;const p=Math.random()*t,l=Math.random()*e,s=50+Math.random()*220,c=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);Me.push({x:i===0?Math.random()*t:p+Math.cos(c)*s,y:i===0?Math.random()*e:l+Math.sin(c)*s,vx:(Math.random()-.5)*ct,vy:(Math.random()-.5)*ct,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:i,oCx:p,oCy:l,oRadius:s,oAngle:c,oSpeed:d})}}function Lt(){if(!se)return;const t=se;if(Ce=t.getContext("2d"),!Ce)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,Me.length===0&&Nt(t.width,t.height)};e(),window.addEventListener("resize",e);let a=null,r=0,i=0,p=!1;function l(){if(!Ce||!se){Te=null;return}if(Te=requestAnimationFrame(l),p=!p,p)return;const s=Ce,c=se.width,d=se.height;s.fillStyle=`rgba(${te*.04|0},${ne*.04|0},${oe*.06|0},1)`,s.fillRect(0,0,c,d),(!a||r!==c||i!==d)&&(r=c,i=d,a=s.createRadialGradient(c*.5,d*.5,0,c*.5,d*.5,Math.max(c,d)*.6),a.addColorStop(0,`rgba(${te*.08|0},${ne*.08|0},${oe*.1|0},0.4)`),a.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=a,s.fillRect(0,0,c,d);const u=Me,k=u.length,R=lt*lt;for(let h=0;h<k;h++){const o=u[h];if(o.pulsePhase+=o.pulseSpeed,o.motion===0)o.x+=o.vx,o.y+=o.vy,o.x<0?(o.x=0,o.vx=Math.abs(o.vx)*(.8+Math.random()*.4)):o.x>c&&(o.x=c,o.vx=-Math.abs(o.vx)*(.8+Math.random()*.4)),o.y<0?(o.y=0,o.vy=Math.abs(o.vy)*(.8+Math.random()*.4)):o.y>d&&(o.y=d,o.vy=-Math.abs(o.vy)*(.8+Math.random()*.4));else if(o.motion===1)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius,o.oCx+=Math.sin(o.oAngle*.3)*.15,o.oCy+=Math.cos(o.oAngle*.3)*.15;else if(o.motion===2)o.oAngle+=o.oSpeed,o.x=o.oCx+Math.cos(o.oAngle)*o.oRadius,o.y=o.oCy+Math.sin(o.oAngle)*o.oRadius*.5,o.oCx+=Math.sin(o.oAngle*.2)*.1,o.oCy+=Math.cos(o.oAngle*.2)*.1;else if(o.motion===3){o.oAngle+=o.oSpeed;const b=o.oAngle,I=o.oRadius*.7;o.x=o.oCx+I*Math.cos(b),o.y=o.oCy+I*Math.sin(b)*Math.cos(b),o.oCx+=Math.sin(b*.15)*.12,o.oCy+=Math.cos(b*.15)*.12}else if(o.motion===4){o.oAngle+=o.oSpeed*1.2;const b=o.oRadius*(.5+.5*Math.abs(Math.sin(o.oAngle*.15)));o.x=o.oCx+Math.cos(o.oAngle)*b,o.y=o.oCy+Math.sin(o.oAngle)*b,o.oCx+=Math.sin(o.oAngle*.1)*.18,o.oCy+=Math.cos(o.oAngle*.1)*.18}else o.oAngle+=o.oSpeed,o.x+=o.vx*.8,o.y=o.oCy+Math.sin(o.oAngle+o.x*.008)*o.oRadius*.35,o.x<-30?o.x=c+30:o.x>c+30&&(o.x=-30),o.oCy+=Math.sin(o.oAngle*.1)*.08;if(o.motion>0){const b=o.oRadius+50;o.oCx<-b?o.oCx=c+b:o.oCx>c+b&&(o.oCx=-b),o.oCy<-b?o.oCy=d+b:o.oCy>d+b&&(o.oCy=-b)}}s.beginPath(),s.strokeStyle=`rgba(${te},${ne},${oe},0.06)`,s.lineWidth=.4;const C=new Path2D;for(let h=0;h<k;h++){const o=u[h];for(let b=h+1;b<k;b++){const I=u[b],H=o.x-I.x,B=o.y-I.y,P=H*H+B*B;P<R&&(1-P/R<.4?(s.moveTo(o.x,o.y),s.lineTo(I.x,I.y)):(C.moveTo(o.x,o.y),C.lineTo(I.x,I.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${te},${ne},${oe},0.18)`,s.lineWidth=.8,s.stroke(C),!be||dt!==te||pt!==ne||ft!==oe){be=document.createElement("canvas");const h=48;be.width=h,be.height=h;const o=be.getContext("2d"),b=o.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);b.addColorStop(0,`rgba(${te},${ne},${oe},0.9)`),b.addColorStop(.3,`rgba(${te},${ne},${oe},0.35)`),b.addColorStop(1,`rgba(${te},${ne},${oe},0)`),o.fillStyle=b,o.fillRect(0,0,h,h),dt=te,pt=ne,ft=oe}const E=be;for(let h=0;h<k;h++){const o=u[h],b=.6+.4*Math.sin(o.pulsePhase),I=o.radius*5*(.8+b*.4);s.globalAlpha=.5+b*.4,s.drawImage(E,o.x-I/2,o.y-I/2,I,I)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let h=0;h<k;h++){const o=u[h];if(o.radius>2){const b=.6+.4*Math.sin(o.pulsePhase),I=o.radius*(.8+b*.4)*.35;s.moveTo(o.x+I,o.y),s.arc(o.x,o.y,I,0,Math.PI*2)}}s.fill()}l()}function Vt(){Te!==null&&(cancelAnimationFrame(Te),Te=null),se=null,Ce=null,Me=[]}let Se=null;const ze=560,Gt=140,ut=ze/2,gt=Gt/2,mt=[];for(let t=0;t<=ze;t+=8){const e=Math.abs(t-ut)/ut;mt.push(Math.pow(Math.min(1,e*1.6),.6))}const qt=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/ze,off:t*.6,spd:.7+t*.12}));let qe=!1;function ht(){if(ke=requestAnimationFrame(ht),qe=!qe,qe)return;if(Ge+=.07,!Se){const e=document.getElementById("nf-engine-waves");if(!e){ke=null;return}Se=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<Se.length;e++){const a=qt[e],r=Ge*a.spd+a.off;t.length=0,t.push(`M 0 ${gt}`);let i=0;for(let p=0;p<=ze;p+=8){const l=gt+a.amp*mt[i++]*Math.sin(p*a.freq+r);t.push(`L${p} ${l*10+.5|0}`)}Se[e].setAttribute("d",t.join(" "))}}function Ht(){Ge=0,ht(),Lt(),Be=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),a=document.getElementById("nf-stat-lat2"),r=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function bt(){ke!==null&&(cancelAnimationFrame(ke),ke=null),Be&&(clearInterval(Be),Be=null),Se=null,Vt()}function Fe(){let t=0;const e=Y.filter(d=>d.status!=="skipped").length;for(const d of Y){const u=document.getElementById(`nf-proc-${d.stepId}`);if(!u)continue;u.className="nf-proc-row";const k=u.querySelector(".nf-proc-badge");switch(d.status){case"done":u.classList.add("nf-proc-done"),k&&(k.textContent="✅ done"),t++;break;case"active":u.classList.add("nf-proc-active"),k&&(k.textContent=d.progress!==void 0&&d.progress>0?`⏳ ${d.progress}%`:"⏳ active");break;case"error":u.classList.add("nf-proc-error"),k&&(k.textContent="❌ error");break;case"skipped":u.classList.add("nf-proc-skipped"),k&&(k.textContent="— skip");break;default:u.classList.add("nf-proc-waiting"),k&&(k.textContent="(queued)")}}const a=Y.findIndex(d=>d.status==="active"),r=a>=0?a+1:t>=e&&e>0?Y.length:t,i=document.getElementById("nf-step-counter");i&&(i.textContent=`${r}/${Y.length}`);const p=document.querySelector(".nf-core-title-val"),l=document.querySelector(".nf-status-dot");t>=e&&e>0?(p&&(p.textContent="COMPLETE",p.style.color=Q.doneHex),l&&(l.style.background=Q.doneHex,l.style.boxShadow=`0 0 8px rgba(${Q.doneRgb},0.7)`)):Y.some(u=>u.status==="error")?(p&&(p.textContent="ERROR",p.style.color="#f87171"),l&&(l.style.background="#ef4444",l.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):Y.some(u=>u.status==="active")&&p&&(p.textContent="ACTIVE",p.style.color=Q.hex,p.style.textShadow=`0 0 10px rgba(${Q.rgb},0.5)`);const s=document.getElementById("nf-terminal"),c=s==null?void 0:s.querySelector(".nf-proc-active");c&&s&&c.scrollIntoView({behavior:"smooth",block:"center"})}function wt(){K&&K.isConnected||(ot(),K=document.createElement("button"),K.id="nf-toggle-btn",K.className="nf-toggle-visible",K.innerHTML=fe?et:tt,K.title="ซ่อน/แสดง Netflow Overlay",K.style.cssText="position:fixed !important;top:20px !important;right:20px !important;z-index:2147483647 !important;width:48px !important;height:48px !important;border-radius:50% !important;border:2px solid rgba(255,255,255,0.5) !important;background:rgba(0,0,0,0.85) !important;color:#fff !important;font-size:23px !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;pointer-events:auto !important;",K.onclick=()=>xt(),document.body.appendChild(K))}function xt(){W&&(wt(),fe?(W.classList.remove("nf-hidden"),W.classList.add("nf-visible"),W.style.opacity="1",W.style.pointerEvents="auto",K&&(K.innerHTML=tt),fe=!1):(W.classList.remove("nf-visible"),W.classList.add("nf-hidden"),W.style.opacity="0",W.style.pointerEvents="none",K&&(K.innerHTML=et),fe=!0))}const vt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function yt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=Ee;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"green"}catch{e="green"}const a=vt[e]||vt.green;let r;try{r=chrome.runtime.getURL(a)}catch{r=`/${a}`}const i=Q.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${i},0.25) 0%, rgba(${i},0.12) 50%, rgba(${i},0.20) 100%)`,`url('${r}')`].join(", "),t.style.backgroundSize="auto, auto, 50%",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${i},0.45)`,t.style.boxShadow=`0 0 70px rgba(${i},0.22), 0 0 140px rgba(${i},0.1), inset 0 1px 0 rgba(${i},0.15)`}function He(t=1){if(Q=Rt(),Ze(),W&&W.isConnected){for(const e of ae)for(const a of e.steps)a.status="waiting",a.progress=a.progress!==void 0?0:void 0;he=t,Y=De(t),at();for(const e of ae)Ue(e);Oe(),Fe(),fe&&xt();return}W&&!W.isConnected&&(W=null),pe&&(pe.remove(),pe=null),ot();for(const e of ae)for(const a of e.steps)a.status="waiting",a.progress=a.progress!==void 0?0:void 0;if(he=t,Y=De(t),t>1){const e=ae.find(r=>r.id==="video");if(e){const r=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let i=2;i<=t;i++)r.push({id:`scene${i}-prompt`,label:`Scene ${i} Prompt`,status:"waiting"}),r.push({id:`scene${i}-gen`,label:`Scene ${i} Generate`,status:"waiting"}),r.push({id:`scene${i}-wait`,label:`Scene ${i} รอผล`,status:"waiting",progress:0});e.steps=r}const a=ae.find(r=>r.id==="render");if(a){const r=a.steps.find(p=>p.id==="download");r&&(r.label="ดาวน์โหลด 720p");const i=a.steps.find(p=>p.id==="upscale");i&&(i.label="Full Video")}}W=Dt(),W.style.cssText="position:fixed !important;inset:0 !important;z-index:2147483647 !important;pointer-events:auto !important;opacity:1 !important;",document.body.appendChild(W),W.classList.add("nf-visible"),fe=!1,wt(),Ft(),Ht(),requestAnimationFrame(()=>yt())}function $t(){st(),bt(),fe=!1,W&&(W.classList.add("nf-fade-out"),setTimeout(()=>{W==null||W.remove(),W=null},500)),K&&(K.remove(),K=null)}const Ut={settings:"SETTINGS","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Wt(t,e,a){const r=Y.findIndex(u=>u.status==="active"),i=Y.filter(u=>u.status==="done").length,p=Y.length,l=r>=0?r+1:i>=p?p:i,s=document.getElementById("nf-stat-step");s&&(s.textContent=`${l}/${p}`);let c=1;for(const u of Y)if(u.status==="active"||u.status==="done")if(u.stepId.startsWith("scene")){const k=u.stepId.match(/^scene(\d+)-/);k&&(c=Math.max(c,parseInt(k[1],10)))}else(u.stepId==="download"||u.stepId==="upscale"||u.stepId==="open")&&(c=he);const d=document.getElementById("nf-stat-scenes");if(d&&(d.textContent=he>1?`${c}/${he}`:"1/1"),e==="active"){const u=document.getElementById("nf-stat-status"),k=Ut[t]||t.toUpperCase();u&&(u.textContent=k)}else if(e==="done"&&i>=p){const u=document.getElementById("nf-stat-status");u&&(u.textContent="COMPLETE")}else if(e==="error"){const u=document.getElementById("nf-stat-status");u&&(u.textContent="ERROR")}if(a!==void 0&&a>0){const u=document.getElementById("nf-stat-progress");u&&(u.textContent=`${Math.min(100,a)}%`)}}function S(t,e,a){if(!W)return;for(const i of ae)for(const p of i.steps)p.id===t&&(p.status=e,a!==void 0&&(p.progress=a));for(const i of Y)i.stepId===t&&(i.status=e,a!==void 0&&(i.progress=a));const r=document.getElementById(`nf-step-${t}`);if(r&&(r.className="nf-step",e==="active"?r.classList.add("nf-step-active"):e==="done"?r.classList.add("nf-step-done"):e==="error"&&r.classList.add("nf-step-error")),Wt(t,e,a),a!==void 0){const i=document.getElementById(`nf-bar-${t}`);i&&(i.style.width=`${Math.min(100,a)}%`)}Oe(),Fe()}function we(t){S(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function Ie(t=4e3){st(),bt(),Oe(),Fe(),setTimeout(()=>$t(),t)}function Oe(){for(const t of ae){const e=t.steps.filter(c=>c.status!=="skipped").length,a=t.steps.filter(c=>c.status==="done").length,r=t.steps.some(c=>c.status==="active"),i=e>0?Math.round(a/e*100):0,p=document.getElementById(`nf-pct-${t.id}`);p&&(p.textContent=`${i}%`);const l=document.getElementById(`nf-modbar-${t.id}`);l&&(l.style.width=`${i}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),i>=100?s.classList.add("nf-done"):r&&s.classList.add("nf-active"))}}function Yt(t){var r,i,p,l;he=t;const e=new Map;for(const s of Y)e.set(s.stepId,{status:s.status,progress:s.progress});Y=De(t);for(const s of Y){const c=e.get(s.stepId);c&&(s.status=c.status,c.progress!==void 0&&(s.progress=c.progress))}if(at(),t>1){const s=ae.find(c=>c.id==="video");if(s){const c=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((r=s.steps.find(d=>d.id==="animate"))==null?void 0:r.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((i=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:i.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((p=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:p.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((l=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:l.status)||"waiting",progress:0}];for(let d=2;d<=t;d++)c.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),c.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),c.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=c,Ue(s)}}const a=ae.find(s=>s.id==="render");if(a&&t>1){const s=a.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const c=a.steps.find(d=>d.id==="upscale");c&&(c.label="Full Video"),Ue(a)}Oe(),Fe()}function Ue(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(i=>i.remove()),t.steps.forEach(i=>{const p=document.createElement("div");p.className="nf-step",p.id=`nf-step-${i.id}`;let l="";i.progress!==void 0&&(l=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${i.id}" style="width: 0%"></div>
                </div>
            `),p.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${i.label}</span>
            ${l}
        `,e.appendChild(p)});const r=document.createElement("div");r.className="nf-mod-progress",r.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(r)}function Ne(t){t.replace(/^\[Netflow AI\]\s*/,"")}let xe=null,ue=null;const Xt=new Promise(t=>{ue=t,setTimeout(()=>t(null),2e3)});try{chrome.runtime.sendMessage({type:"GET_TAB_ID"},t=>{!chrome.runtime.lastError&&(t!=null&&t.tabId)&&(xe=t.tabId,console.log(`[Netflow AI] Tab ID: ${xe}`)),ue&&(ue(xe),ue=null)})}catch{ue&&(ue(null),ue=null)}function le(){return xe?`netflow_pending_action_${xe}`:"netflow_pending_action"}function Et(){try{chrome.runtime.sendMessage({type:"AUTOMATION_FINISHED"})}catch{}}const n=t=>{console.log(`[Netflow AI] ${t}`);try{Ne(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},A=t=>{console.warn(`[Netflow AI] ${t}`);try{Ne(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}};function We(t=3e3){n(`🔒 จะปิดแท็บ automation ใน ${t/1e3} วินาที...`),setTimeout(()=>{try{chrome.runtime.sendMessage({action:"CLOSE_AUTOMATION_TAB"},e=>{chrome.runtime.lastError?A(`ปิดแท็บไม่ได้: ${chrome.runtime.lastError.message}`):n(`✅ ปิดแท็บแล้ว: ${e==null?void 0:e.message}`)})}catch(e){A(`ปิดแท็บผิดพลาด: ${e.message}`)}},t)}async function Ye(){try{if(await new Promise(i=>{try{chrome.runtime.sendMessage({type:"PEEK_CACHED_VIDEO"},p=>{if(chrome.runtime.lastError){i(!1);return}i(!!(p!=null&&p.cached))})}catch{i(!1)}})){n("[TikTok] ✅ Background มี video cached อยู่แล้ว (จาก download) — ข้าม page capture เพื่อไม่ overwrite");const i=document.querySelectorAll("video");for(const p of i){const l=p.src||p.currentSrc||"";if(l)return l}return null}n("[TikTok] ไม่มี cached video — จะ capture จากหน้า...");const e=document.querySelectorAll("video");let a=null,r=0;for(const i of e){let p=i.src||"";if(!p){const c=i.querySelector("source");c&&(p=c.getAttribute("src")||"")}if(!p&&i.currentSrc&&(p=i.currentSrc),!p)continue;if(J()){a||(a=p,r=1);continue}const l=i.getBoundingClientRect(),s=l.width*l.height;l.width>50&&s>r&&(r=s,a=p)}if(!a)return n("[TikTok] ไม่พบ video URL บนหน้า"),null;n(`[TikTok] พบ video URL: ${a.substring(0,80)}... (area=${r.toFixed(0)})`);try{n("[TikTok] กำลัง fetch video blob จาก content script (มี auth)...");const i=await fetch(a);if(!i.ok)return n(`[TikTok] fetch failed: HTTP ${i.status}`),await kt(a),a;const p=await i.blob(),l=(p.size/1024/1024).toFixed(1);n(`[TikTok] Video blob fetched: ${l} MB, type: ${p.type}`),p.size<1e5&&n(`[TikTok] ⚠️ Blob เล็กเกินไป (${p.size} bytes) — อาจเป็น thumbnail`);const s=await new Promise((c,d)=>{const u=new FileReader;u.onloadend=()=>c(u.result),u.onerror=()=>d(new Error("FileReader error")),u.readAsDataURL(p)});n(`[TikTok] Data URL พร้อม: ${(s.length/1024/1024).toFixed(1)} MB`),await new Promise(c=>{chrome.runtime.sendMessage({type:"CACHE_VIDEO_DATA",data:s},d=>{chrome.runtime.lastError?n(`[TikTok] CACHE_VIDEO_DATA error: ${chrome.runtime.lastError.message}`):d!=null&&d.success?n("[TikTok] ✅ Video cached in background service worker"):n(`[TikTok] CACHE_VIDEO_DATA failed: ${d==null?void 0:d.error}`),c()})})}catch(i){n(`[TikTok] Content script fetch error: ${i.message}`),await kt(a)}return a}catch(t){return n(`[TikTok] captureVideoUrl error: ${t.message}`),null}}async function kt(t){if(t.startsWith("https://"))try{await new Promise(e=>{chrome.runtime.sendMessage({type:"PRE_FETCH_VIDEO",url:t},a=>{chrome.runtime.lastError?n(`[TikTok] PRE_FETCH_VIDEO error: ${chrome.runtime.lastError.message}`):a!=null&&a.success?n(`[TikTok] Video pre-fetched via background: ${((a.size||0)/1024/1024).toFixed(1)} MB`):n(`[TikTok] PRE_FETCH_VIDEO failed: ${a==null?void 0:a.error}`),e()})})}catch{}}function Xe(t){if(t){if(window.__VIDEO_COMPLETE_SENT__){n("[TikTok] ⚠️ VIDEO_GENERATION_COMPLETE already sent, skipping duplicate");return}window.__VIDEO_COMPLETE_SENT__=!0;try{chrome.runtime.sendMessage({type:"VIDEO_GENERATION_COMPLETE",videoUrl:t,source:"veo"}),n("[TikTok] Sent VIDEO_GENERATION_COMPLETE (source=veo)")}catch{}}}const je=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ke=/Win/i.test(navigator.userAgent),ve=je?"🍎 Mac":Ke?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ve}`),window.__VIDEO_COMPLETE_SENT__=!1;class Qe extends Error{constructor(){super("AUTOMATION_STOPPED"),this.name="NetflowAbortError"}}let Pe=null,ge=null,Ct=!1;const ye=new Map;let Tt=0;function jt(){if(Pe)return Pe;try{const t=new Blob(["self.onmessage=function(e){var d=e.data;setTimeout(function(){self.postMessage(d.id)},d.ms)};"],{type:"application/javascript"});return Pe=new Worker(URL.createObjectURL(t)),Pe.onmessage=e=>{const a=ye.get(e.data);a&&(ye.delete(e.data),a())},console.log("[Netflow AI] ⚡ Web Worker timer created — background tab throttling defeated"),Pe}catch{return console.warn("[Netflow AI] Web Worker timer unavailable (CSP?) — trying port relay"),null}}function Kt(){if(ge)return ge;if(Ct)return null;try{return ge=chrome.runtime.connect({name:"timer"}),ge.onMessage.addListener(t=>{const e=ye.get(t.id);e&&(ye.delete(t.id),e())}),ge.onDisconnect.addListener(()=>{ge=null}),console.log("[Netflow AI] ⚡ Port relay timer connected — background tab throttling defeated"),ge}catch{return Ct=!0,console.warn("[Netflow AI] Port relay unavailable — falling back to setTimeout"),null}}const m=t=>new Promise((e,a)=>{if(window.__NETFLOW_STOP__)return a(new Qe);const r=()=>{if(window.__NETFLOW_STOP__)return a(new Qe);e()},i=jt();if(i){const s=++Tt;ye.set(s,r),i.postMessage({id:s,ms:t});return}const p=Kt();if(p){const s=++Tt;ye.set(s,r),p.postMessage({cmd:"delay",id:s,ms:t});return}const l=setTimeout(r,t);m._lastId=l});function me(){return!!window.__NETFLOW_STOP__}const J=()=>document.hidden;function Mt(){var a;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const r of e){if(r.closest("#netflow-engine-overlay"))continue;const i=(r.textContent||"").trim().toLowerCase();if(!(i.length>200||i.length<5)){for(const p of t)if(i.includes(p))return((a=r.textContent)==null?void 0:a.trim())||p}}return null}async function ee(t){if(J()){t.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0})),t.click();return}const e=t.getBoundingClientRect(),a=e.left+e.width/2,r=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:r,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",i)),await m(80),t.dispatchEvent(new PointerEvent("pointerup",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",i)),t.dispatchEvent(new MouseEvent("click",i)),await m(50),t.click()}function Qt(t){const e=t.getBoundingClientRect(),a=e.left+e.width/2,r=e.top+e.height/2,i={bubbles:!0,cancelable:!0,clientX:a,clientY:r};t.dispatchEvent(new PointerEvent("pointerenter",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",i)),t.dispatchEvent(new PointerEvent("pointerover",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",i)),t.dispatchEvent(new PointerEvent("pointermove",{...i,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",i))}function Jt(t){const e=[],a=document.querySelectorAll("i");for(const r of a){if((r.textContent||"").trim()!==t)continue;let p=r,l=null,s=1/0;for(let c=0;c<20&&p&&(p=p.parentElement,!(!p||p===document.body));c++){if(J()){c>=3&&p.children.length>0&&!l&&(l=p);continue}const d=p.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const u=d.width*d.height;u<s&&(l=p,s=u)}}l&&!e.includes(l)&&e.push(l)}return e.sort((r,i)=>{const p=r.getBoundingClientRect(),l=i.getBoundingClientRect();return p.left-l.left}),e}function Je(t=!1){const e=[],a=document.querySelectorAll("video");for(const l of a){let s=l.parentElement;for(let c=0;c<10&&s;c++){if(J()){if(c>=3&&s.children.length>0){e.push({el:s,left:0});break}s=s.parentElement;continue}const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){e.push({el:s,left:d.left});break}s=s.parentElement}}const r=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const l of r){const s=(l.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let c=l.parentElement;for(let d=0;d<10&&c;d++){if(J()){if(d>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const i=document.querySelectorAll("img");for(const l of i){const s=(l.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let c=l.parentElement;for(let d=0;d<10&&c;d++){if(J()){if(d>=3&&c.children.length>0){e.push({el:c,left:0});break}c=c.parentElement;continue}const u=c.getBoundingClientRect();if(u.width>120&&u.height>80&&u.width<window.innerWidth*.7&&u.top>=-50&&u.left<window.innerWidth*.75){e.push({el:c,left:u.left});break}c=c.parentElement}}}const p=Array.from(new Set(e.map(l=>l.el))).map(l=>e.find(s=>s.el===l));if(p.sort((l,s)=>l.left-s.left),p.length>0){const l=p[0].el,s=l.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),l}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Zt(){const t=Jt("image");if(t.length>0){const a=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${a.left.toFixed(0)},${a.top.toFixed(0)}) ขนาด ${a.width.toFixed(0)}x${a.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const a of e){let r=a.parentElement;for(let i=0;i<10&&r;i++){if(J()){if(i>=3&&r.children.length>0)return n("🖼️ พบการ์ดรูปภาพจาก <canvas> (minimized mode)"),r;r=r.parentElement;continue}const p=r.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${p.left.toFixed(0)},${p.top.toFixed(0)})`),r;r=r.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function en(t,e){var s;const[a,r]=t.split(","),i=((s=a.match(/:(.*?);/))==null?void 0:s[1])||"image/png",p=atob(r),l=new Uint8Array(p.length);for(let c=0;c<p.length;c++)l[c]=p.charCodeAt(c);return new File([l],e,{type:i})}function _e(t){var r;const e=[],a=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const i of a)if(((r=i.textContent)==null?void 0:r.trim())===t){const p=i.closest("button");p&&e.push(p)}return e}function tn(){const t=[..._e("add"),..._e("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const r=document.querySelectorAll("button");for(const i of r){const p=(i.textContent||"").trim();if(p!=="+"&&p!=="add")continue;if(J())return i;const l=i.getBoundingClientRect();if(l.bottom>window.innerHeight*.7&&l.width<60&&l.height<60)return i}return null}let e=null,a=0;for(const r of t){const i=r.getBoundingClientRect();i.y>a&&(a=i.y,e=r)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${a.toFixed(0)}`),e}function St(){for(const r of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const i=_e(r);let p=null,l=0;for(const s of i){const c=s.getBoundingClientRect();c.y>l&&(l=c.y,p=s)}if(p)return n(`พบปุ่ม Generate จากไอคอน "${r}" ที่ y=${l.toFixed(0)}`),p}const t=document.querySelectorAll("button");let e=null,a=0;for(const r of t){if(J())break;const i=r.getBoundingClientRect();if(i.bottom>window.innerHeight*.7&&i.right>window.innerWidth*.5){const p=Math.abs(i.width-i.height)<10&&i.width<60,l=i.y+i.x+(p?1e3:0);l>a&&(a=l,e=r)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const r of t){const i=(r.getAttribute("aria-label")||"").toLowerCase();if(i.includes("generate")||i.includes("submit")||i.includes("send")||i.includes("สร้าง"))return r}return null}function It(){const t=document.querySelectorAll("textarea");for(const r of t)if(J()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const e=document.querySelectorAll('[contenteditable="true"]');for(const r of e)if(J()||r.getBoundingClientRect().bottom>window.innerHeight*.5)return r;const a=document.querySelectorAll("input[type='text'], input:not([type])");for(const r of a){const i=r.placeholder||"";if(i.includes("สร้าง")||i.includes("prompt")||i.includes("describe"))return r}return t.length>0?t[t.length-1]:null}async function Le(t,e){var a,r,i,p;t.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const c=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:l});t.dispatchEvent(c),await m(800);const d=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(l){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await m(100);const l=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(l);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await m(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await m(200);const l=new DataTransfer;l.setData("text/plain",e),l.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:l});t.dispatchEvent(s),await m(800);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${c.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(l){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((a=navigator.clipboard)!=null&&a.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await m(200),document.execCommand("paste"),await m(500);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${l.length} ตัวอักษร)`);return}}catch(l){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${l.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const l=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(l){let s=t[l];for(let c=0;c<30&&s;c++){const d=s.memoizedProps,u=s.memoizedState;if((r=d==null?void 0:d.editor)!=null&&r.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const k=d.editor;k.selection,k.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((p=(i=u==null?void 0:u.memoizedState)==null?void 0:i.editor)!=null&&p.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),u.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(l){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${l.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function nn(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const a of e)t.push({input:a,origType:"file"}),a.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function on(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ve})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ve})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function an(t,e,a){var d;const r=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),i=[...t.map(u=>u.input)];for(const u of r)!i.includes(u)&&u.offsetParent===null&&i.push(u);for(const u of i)u.type="file";n(`คืนค่า input ${i.length} ตัวเป็น type=file`);const p=document.querySelectorAll('input[type="file"]');if(p.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ve})`),!1;let l;if(a&&a.size>0){const u=Array.from(p).filter(k=>!a.has(k));u.length>0?(l=u[u.length-1],n(`เล็งเป้า file input ใหม่ (${u.length} ใหม่, ${p.length} ทั้งหมด)`)):(l=p[p.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${p.length} ตัว`))}else l=p[p.length-1];const s=new DataTransfer;s.items.add(e);try{l.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=l.files)==null?void 0:d.length)??0} ไฟล์)`)}catch(u){n(`กำหนด target.files ล้มเหลว: ${u.message} — ลอง defineProperty`);try{Object.defineProperty(l,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(k){return A(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${k.message}`),!1}}const c=l._valueTracker;c&&(c.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),l.dispatchEvent(new Event("change",{bubbles:!0})),l.dispatchEvent(new Event("input",{bubbles:!0}));try{const u=new DataTransfer;u.items.add(e);const k=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:u});l.dispatchEvent(k),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${ve}`),!0}function Ae(){let t=0;const e=document.querySelectorAll("img");for(const r of e){if(r.closest("#netflow-engine-overlay")||!r.src)continue;if(J()){t++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&t++}const a=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const r of a){if(r.closest("#netflow-engine-overlay"))continue;if(J()){t++;continue}const i=r.getBoundingClientRect();i.bottom>window.innerHeight*.6&&i.width>20&&i.width<200&&i.height>20&&i.height<200&&r.offsetParent!==null&&t++}return t}async function Pt(t,e){var u;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const a=en(t,e);n(`ขนาดไฟล์: ${(a.size/1024).toFixed(1)} KB`);const r=Ae();n(`รูปย่อปัจจุบันใน Prompt Bar: ${r} รูป`);const i=async(k,R=8e3)=>{const C=Date.now();for(;Date.now()-C<R;){const E=Ae();if(E>r)return n(`✅ [${k}] ยืนยัน: รูปย่อเพิ่มจาก ${r} → ${E}`),!0;await m(500)}return n(`⚠️ [${k}] รูปย่อไม่เพิ่ม (ยังคง ${Ae()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const p=tn();if(!p)return A("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const l=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${l.size} ตัว`);const s=on();let c=nn();const d=new MutationObserver(k=>{for(const R of k)for(const C of R.addedNodes)if(C instanceof HTMLInputElement&&C.type==="file"&&(C.type="text",c.push({input:C,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),C instanceof HTMLElement){const E=C.querySelectorAll('input[type="file"]');for(const h of E)h.type="text",c.push({input:h,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{p.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let k=!1;const R=Date.now();for(;!k&&Date.now()-R<8e3;){const E=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button'], [role='menuitemradio'], a[role='button']");for(const h of E){if(h===p)continue;const o=h.querySelectorAll("i, .material-icons, .material-symbols-outlined, [class*='icon']");for(const b of o){const I=((u=b.textContent)==null?void 0:u.trim())||"";if((I==="upload"||I==="upload_file"||I==="add_photo_alternate"||I==="image"||I==="photo_library")&&!Array.from(h.querySelectorAll("i")).map(B=>{var P;return(P=B.textContent)==null?void 0:P.trim()}).includes("drive_folder_upload")){h.click(),k=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${I}) ✅`);break}}if(k)break}if(!k)for(const h of E){if(h===p)continue;const o=h.childNodes.length<=8?(h.textContent||"").trim():"";if(o.length>0&&o.length<60){const b=o.toLowerCase();if(b==="upload"||b==="อัปโหลด"||b==="อัพโหลด"||b.includes("upload image")||b.includes("upload photo")||b.includes("upload a file")||b.includes("upload file")||b.includes("อัปโหลดรูปภาพ")||b.includes("อัพโหลดรูปภาพ")||b.includes("อัปโหลดไฟล์")||b.includes("อัพโหลดไฟล์")||b.includes("from computer")||b.includes("จากคอมพิวเตอร์")||b.includes("from device")||b.includes("จากอุปกรณ์")||b.includes("my computer")||b.includes("คอมพิวเตอร์ของฉัน")){h.click(),k=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${o}") ✅`);break}}}if(!k)for(const h of E){if(h===p)continue;const o=(h.textContent||"").trim().toLowerCase();if(o.length>0&&o.length<60){if(o.includes("drive")||o.includes("ไดรฟ์")||o.includes("google")||o.includes("สร้าง")||o.includes("create")||o.includes("cancel")||o.includes("ยกเลิก"))continue;if(o.includes("upload")||o.includes("อัป")||o.includes("อัพ")||o.includes("file")||o.includes("ไฟล์")||o.includes("รูปภาพ")||o.includes("image")||o.includes("photo")){const b=h.getBoundingClientRect();if(b.width>0&&b.height>0){h.click(),k=!0,n(`คลิกปุ่มอัปโหลด (broad match: "${o.substring(0,40)}") ✅`);break}}}}k||await m(500)}return k?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),an(c,a,l)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await i("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(A(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(A("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 8 วินาที"),!1)}finally{d.disconnect(),s();for(const k of c)k.input.type!=="file"&&(k.input.type="file")}}async function rn(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const a=document.querySelectorAll("button");let r=null;for(const C of a){const E=C.textContent||"";if((E.includes("Nano Banana")||E.includes("Imagen")||E.includes("วิดีโอ")||E.includes("รูปภาพ")||E.includes("Image")||E.includes("Video"))&&C.getBoundingClientRect().bottom>window.innerHeight*.7){r=C,n(`พบปุ่มตั้งค่าจากข้อความ: "${E.substring(0,30).trim()}"`);break}}if(!r)for(const C of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const E=_e(C);for(const h of E)if(h.getBoundingClientRect().bottom>window.innerHeight*.7){r=h,n(`พบปุ่มตั้งค่าจากไอคอน: ${C}`);break}if(r)break}if(!r)return A("ไม่พบปุ่มตั้งค่า"),!1;const i=r.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2,s={bubbles:!0,cancelable:!0,clientX:p,clientY:l,button:0};r.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),r.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",s)),r.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let c=!1,d=null;const u=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const C of u){const E=C.getAttribute("aria-controls")||"",h=C.id||"";if(E.toUpperCase().includes("IMAGE")||h.toUpperCase().includes("IMAGE")){d=C,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${E})`);break}}if(!d)for(const C of document.querySelectorAll('[role="tab"]')){const E=C.id||"";if(E.toUpperCase().includes("TRIGGER-IMAGE")){d=C,n(`พบแท็บ Image ผ่าน id: ${E}`);break}}if(!d)for(const C of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const E=(C.textContent||"").trim();if((E==="Image"||E.endsWith("Image")||E==="รูปภาพ"||E==="ภาพ")&&!E.includes("Video")&&!E.includes("วิดีโอ")){d=C,n(`พบแท็บ Image ผ่านข้อความ: "${E}"`);break}}if(d){const C=d.getAttribute("data-state")||"",E=d.getAttribute("aria-selected")||"";if(C==="active"||E==="true")c=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const h=d.getBoundingClientRect(),o={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",o)),await m(80),d.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",o)),d.dispatchEvent(new MouseEvent("click",o)),c=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}c||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const k=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const C of document.querySelectorAll("button, [role='tab'], [role='option']")){const E=(C.textContent||"").trim();if(E===k||E.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const h=C.getBoundingClientRect(),o={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",o)),await m(80),C.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",o)),C.dispatchEvent(new MouseEvent("click",o)),n(`เลือกทิศทาง: ${k}`),await m(400);break}}const R=`x${e}`;for(const C of document.querySelectorAll("button, [role='tab'], [role='option']"))if((C.textContent||"").trim()===R){const h=C.getBoundingClientRect(),o={bubbles:!0,cancelable:!0,clientX:h.left+h.width/2,clientY:h.top+h.height/2,button:0};C.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mousedown",o)),await m(80),C.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),C.dispatchEvent(new MouseEvent("mouseup",o)),C.dispatchEvent(new MouseEvent("click",o)),n(`เลือกจำนวน: ${R}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),r.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),r.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),r.dispatchEvent(new MouseEvent("mouseup",s)),r.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function sn(t){const e=t==="quality"?"Veo 3.1 - Quality":"Veo 3.1 - Fast",a=t==="quality"?"Quality":"Fast",r=t==="quality"?"Fast":"Quality",i=t==="quality"?"คุณภาพ":"เร็ว",p=t==="quality"?"เร็ว":"คุณภาพ";n(`=== เลือกคุณภาพ Veo: ${e} (${i}) ===`);let l=null;const s=Date.now()+1e4;for(;!l&&Date.now()<s;){const h=document.querySelectorAll("button, [role='button'], [role='combobox'], [aria-haspopup], div[class*='dropdown'], [class*='select'], [class*='picker']");for(const o of h){const b=(o.textContent||"").trim();if(!(b.length>80)&&(b.includes("Veo")||b.includes("veo"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.getAttribute("role")==="combobox"||b.includes("arrow_drop_down")||o.querySelector("svg"))){l=o,n(`พบปุ่ม Veo dropdown (Strategy A): "${b.substring(0,50).trim()}"`);break}}if(!l)for(const o of h){const b=(o.textContent||"").trim();if(!(b.length>80)&&(b.includes("Veo")||b.includes("veo"))){const I=o.getBoundingClientRect();if(I.width>0&&I.height>0){l=o,n(`พบปุ่ม Veo dropdown (Strategy B): "${b.substring(0,50).trim()}"`);break}}}if(!l)for(const o of h){const b=(o.textContent||"").trim();if(!(b.length>50)&&(b.includes("Fast")||b.includes("Quality")||b.includes("เร็ว")||b.includes("คุณภาพ"))&&(o.hasAttribute("aria-haspopup")||o.hasAttribute("aria-expanded")||o.querySelector("svg"))){l=o,n(`พบปุ่ม dropdown จากคำว่า Fast/Quality/TH (Strategy C): "${b.substring(0,50).trim()}"`);break}}if(!l){const o=document.querySelectorAll("div, span, button, [role='button']");for(const b of o){const I=(b.textContent||"").trim();if(I==="Veo 3.1 - Fast"||I==="Veo 3.1 - Quality"||I==="Fast"||I==="Quality"||I==="Veo 3.1 - เร็ว"||I==="Veo 3.1 - คุณภาพสูง"||I==="Veo 3.1 - คุณภาพ"||I==="Veo 2 - Fast"||I==="Veo 2 - Quality"){const H=b.getBoundingClientRect();if(H.width>0&&H.height>0){l=b,n(`พบปุ่มโดยข้อความเป๊ะๆ (Strategy D): "${I}"`);break}}}}if(!l){const o=document.querySelectorAll("button, [role='button'], div[tabindex], span[tabindex]");for(const b of o){const I=(b.textContent||"").trim();if(!(I.length>60)&&(I.includes("3.1")||I.includes("model")||I.includes("โมเดล"))){const H=b.getBoundingClientRect();if(H.bottom>window.innerHeight*.4&&H.width>0&&H.height>0){l=b,n(`พบปุ่ม model selector (Strategy E): "${I.substring(0,50).trim()}"`);break}}}}l||await m(1e3)}if(!l)return A("ไม่พบปุ่ม Veo quality dropdown หลังรอ 10 วินาที — ข้ามขั้นตอน (ใช้ค่าเดิม)"),!0;const c=(l.textContent||"").trim();if(c.includes(e)||c.includes(a)&&!c.includes(r)||c.includes(i)&&!c.includes(p))return n(`✅ Veo quality เป็น "${c}" อยู่แล้ว — ไม่ต้องเปลี่ยน`),!0;const d=l.getBoundingClientRect(),u=d.left+d.width/2,k=d.top+d.height/2,R={bubbles:!0,cancelable:!0,clientX:u,clientY:k,button:0};l.dispatchEvent(new PointerEvent("pointerdown",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mousedown",R)),await m(80),l.dispatchEvent(new PointerEvent("pointerup",{...R,pointerId:1,isPrimary:!0,pointerType:"mouse"})),l.dispatchEvent(new MouseEvent("mouseup",R)),l.dispatchEvent(new MouseEvent("click",R)),n("คลิกเปิด Veo quality dropdown"),await m(1e3);let C=!1;const E=document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='listitem'], li, div[role='button']");for(const h of E){const o=(h.textContent||"").trim();if((o===e||o===a||o.includes(e)||o.includes(i))&&!o.includes("arrow_drop_down")){const I=h.getBoundingClientRect();if(I.width>0&&I.height>0){const H=I.left+I.width/2,B=I.top+I.height/2,P={bubbles:!0,cancelable:!0,clientX:H,clientY:B,button:0};h.dispatchEvent(new PointerEvent("pointerdown",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mousedown",P)),await m(80),h.dispatchEvent(new PointerEvent("pointerup",{...P,pointerId:1,isPrimary:!0,pointerType:"mouse"})),h.dispatchEvent(new MouseEvent("mouseup",P)),h.dispatchEvent(new MouseEvent("click",P)),n(`✅ เลือก "${o}" สำเร็จ`),C=!0;break}}}return C?(await m(600),!0):(A(`ไม่พบตัวเลือก "${e}" หรือ "${i}" ใน dropdown`),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),document.body.click(),!1)}async function ln(t){var I,H,B,P;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,a=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),r=a?a[1]:"unknown",i=je?"macOS":Ke?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",p=je?((H=(I=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:I[1])==null?void 0:H.replace(/_/g,"."))||"":Ke&&((B=e.match(/Windows NT ([0-9.]+)/))==null?void 0:B[1])||"",l=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${i} ${p} | Chrome ${r}`),n(`🌐 ภาษา: ${l} | หน้าจอ: ${s} | แพลตฟอร์ม: ${ve}`),n("══════════════════════════════════════════");try{Ve(t.theme)}catch{}try{He()}catch(v){console.warn("Overlay show error:",v)}const c=[],d=[];try{S("settings","active");const v=t.orientation||"horizontal",f=t.outputCount||1,w=await rn(v,f);c.push(w?"✅ Settings":"⚠️ Settings"),S("settings",w?"done":"error")}catch(v){A(`ตั้งค่าผิดพลาด: ${v.message}`),c.push("⚠️ Settings"),S("settings","error")}try{const v=t.veoQuality||"fast";await sn(v)?(c.push(`✅ Veo ${v}`),n(`✅ Veo quality: ${v}`)):(c.push("⚠️ Veo quality"),A("ไม่สามารถเลือก Veo quality ได้ — ใช้ค่าเดิม"))}catch(v){A(`Veo quality error: ${v.message}`),c.push("⚠️ Veo quality")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const u=()=>{const v=document.querySelectorAll("span, div, p, label");for(const f of v){const w=(f.textContent||"").trim();if(/^\d{1,3}%$/.test(w)){if(w==="100%")return null;const M=f.getBoundingClientRect();if(M.width>0&&M.height>0&&M.top>0&&M.top<window.innerHeight)return w}}return null},k=async v=>{n(`รอการอัพโหลด ${v} เสร็จ...`),await m(2e3);const f=Date.now(),w=6e4;let M="",F=Date.now();const T=15e3;for(;Date.now()-f<w;){const $=u();if($){if($!==M)M=$,F=Date.now();else if(Date.now()-F>T){n(`✅ อัพโหลด ${v} — % ค้างที่ ${$} นาน ${T/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${$} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${v} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}A(`⚠️ อัพโหลด ${v} หมดเวลาหลัง ${w/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){S("upload-char","active");try{const v=await Pt(t.characterImage,"character.png");c.push(v?"✅ ตัวละคร":"⚠️ ตัวละคร"),v||d.push("character upload failed"),S("upload-char",v?"done":"error")}catch(v){A(`อัพโหลดตัวละครผิดพลาด: ${v.message}`),c.push("❌ ตัวละคร"),d.push("character upload error"),S("upload-char","error")}await k("character")}else we("upload-char");if(t.productImage){S("upload-prod","active");try{const v=await Pt(t.productImage,"product.png");c.push(v?"✅ สินค้า":"⚠️ สินค้า"),v||d.push("product upload failed"),S("upload-prod",v?"done":"error")}catch(v){A(`อัพโหลดสินค้าผิดพลาด: ${v.message}`),c.push("❌ สินค้า"),d.push("product upload error"),S("upload-prod","error")}await k("product")}else we("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const R=u();R&&(n(`⚠️ อัพโหลดยังแสดง ${R} — รอเพิ่มเติม...`),await k("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const C=(t.characterImage?1:0)+(t.productImage?1:0);if(C>0){let v=Ae();v<C&&(n(`⏳ เห็นรูปย่อแค่ ${v}/${C} — รอ 3 วินาที...`),await m(3e3),v=Ae()),v>=C?n(`✅ ยืนยันรูปย่ออ้างอิง: ${v}/${C}`):A(`⚠️ คาดว่าจะมี ${C} รูปย่อ แต่พบ ${v} — ดำเนินการต่อ`)}if(me()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{Ie(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),S("img-prompt","active"),await m(1e3);const E=It();E?(await Le(E,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),c.push("✅ Prompt"),S("img-prompt","done")):(A("ไม่พบช่องป้อนข้อความ Prompt"),c.push("❌ Prompt"),d.push("prompt input not found"),S("img-prompt","error")),await m(800);const h=new Set;document.querySelectorAll("img").forEach(v=>{v.src&&h.add(v.src)}),n(`บันทึกรูปเดิม: ${h.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),S("img-generate","active"),await m(500);const o=St();if(o){const v=o.getBoundingClientRect(),f=v.left+v.width/2,w=v.top+v.height/2,M={bubbles:!0,cancelable:!0,clientX:f,clientY:w,button:0};o.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",M)),await m(80),o.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",M)),o.dispatchEvent(new MouseEvent("click",M)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),c.push("✅ Generate"),await m(500),o.dispatchEvent(new PointerEvent("pointerdown",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mousedown",M)),await m(80),o.dispatchEvent(new PointerEvent("pointerup",{...M,pointerId:1,isPrimary:!0,pointerType:"mouse"})),o.dispatchEvent(new MouseEvent("mouseup",M)),o.dispatchEvent(new MouseEvent("click",M)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),S("img-generate","done")}else A("ไม่พบปุ่ม → Generate"),c.push("❌ Generate"),d.push("generate button not found"),S("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),S("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const v=()=>{const T=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of T){if($.closest("#netflow-engine-overlay"))continue;const D=($.textContent||"").trim();if(D.length>10)continue;const x=D.match(/(\d{1,3})\s*%/);if(!x)continue;const g=parseInt(x[1],10);if(g<1||g>100)continue;const y=$.getBoundingClientRect();if(!(y.width===0||y.width>150)&&!(y.top<0||y.top>window.innerHeight))return g}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let f=null,w=-1,M=0;const F=Date.now();for(;!f&&Date.now()-F<18e4;){const T=document.querySelectorAll("img");for(const $ of T){if(h.has($.src)||!($.alt||"").toLowerCase().includes("generated"))continue;const x=$.getBoundingClientRect();if(x.width>120&&x.height>120&&x.top>0&&x.top<window.innerHeight*.85){const g=$.closest("div");if(g){f=g,n(`พบรูป AI จาก alt="${$.alt}": ${$.src.substring(0,80)}...`);break}}}if(!f)for(const $ of T){if(h.has($.src))continue;const D=$.closest("div"),x=(D==null?void 0:D.textContent)||"";if(x.includes("product.png")||x.includes("character.png")||x.includes(".png")||x.includes(".jpg"))continue;const g=$.getBoundingClientRect();if(g.width>120&&g.height>120&&g.top>0&&g.top<window.innerHeight*.85){const y=$.closest("div");if(y){f=y,n(`พบรูปใหม่ (สำรอง): ${$.src.substring(0,80)}...`);break}}}if(!f){if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const $=Mt();if($){A(`❌ สร้างรูปล้มเหลว: ${$}`),d.push(`image gen failed: ${$}`),S("img-wait","error");break}const D=v();D!==null?(D!==w&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${D}%`),w=D,S("img-wait","active",D)),M=Date.now()):w>30&&Math.floor((Date.now()-M)/1e3)>=3&&n(`🖼️ % หายที่ ${w}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!f)A("หมดเวลารอรูปที่สร้าง"),c.push("⚠️ Wait Image"),S("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),c.push("✅ Image Found"),S("img-wait","done",100);const T=f.getBoundingClientRect(),$=T.left+T.width/2,D=T.top+T.height/2,x={bubbles:!0,cancelable:!0,clientX:$,clientY:D};f.dispatchEvent(new PointerEvent("pointerenter",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseenter",x)),f.dispatchEvent(new PointerEvent("pointerover",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseover",x)),f.dispatchEvent(new PointerEvent("pointermove",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousemove",x)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let g=null;for(const y of["more_vert","more_horiz","more"]){const z=_e(y);for(const q of z){const _=q.getBoundingClientRect();if(_.top>=T.top-20&&_.top<=T.bottom&&_.right>=T.right-150&&_.right<=T.right+20){g=q;break}}if(g)break}if(!g){const y=document.querySelectorAll("button");for(const z of y){const q=z.getBoundingClientRect();if(q.width<50&&q.height<50&&q.top>=T.top-10&&q.top<=T.top+60&&q.left>=T.right-80){const _=z.querySelectorAll("i");for(const O of _)if((((P=O.textContent)==null?void 0:P.trim())||"").includes("more")){g=z;break}if(g)break;const L=z.getAttribute("aria-label")||"";if(L.includes("เพิ่มเติม")||L.includes("more")){g=z;break}}}}if(!g)A("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),c.push("⚠️ 3-dots");else{const y=g.getBoundingClientRect(),z=y.left+y.width/2,q=y.top+y.height/2,_={bubbles:!0,cancelable:!0,clientX:z,clientY:q,button:0};g.dispatchEvent(new PointerEvent("pointerdown",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mousedown",_)),await m(80),g.dispatchEvent(new PointerEvent("pointerup",{..._,pointerId:1,isPrimary:!0,pointerType:"mouse"})),g.dispatchEvent(new MouseEvent("mouseup",_)),g.dispatchEvent(new MouseEvent("click",_)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let L=null;const O=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const N of O){const U=(N.textContent||"").trim();if(U.includes("ทำให้เป็นภาพเคลื่อนไหว")||U.includes("Animate")||U.includes("animate")){L=N;break}}if(!L)A("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),c.push("⚠️ Animate");else{const N=L.getBoundingClientRect(),U=N.left+N.width/2,j=N.top+N.height/2,V={bubbles:!0,cancelable:!0,clientX:U,clientY:j,button:0};L.dispatchEvent(new PointerEvent("pointerdown",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mousedown",V)),await m(80),L.dispatchEvent(new PointerEvent("pointerup",{...V,pointerId:1,isPrimary:!0,pointerType:"mouse"})),L.dispatchEvent(new MouseEvent("mouseup",V)),L.dispatchEvent(new MouseEvent("click",V)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),c.push("✅ Animate"),S("animate","done"),await m(3e3)}}}}catch(v){A(`ขั้น 4 ผิดพลาด: ${v.message}`),c.push("⚠️ Animate")}if(me()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{Ie(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),S("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let v=!1;const f=document.querySelectorAll("button, span, div");for(const F of f){const T=(F.textContent||"").trim(),$=F.getBoundingClientRect();if((T==="วิดีโอ"||T==="Video"||T.includes("วิดีโอ"))&&$.bottom>window.innerHeight*.7){v=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}v||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const w=It();w?(await Le(w,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),c.push("✅ Video Prompt"),S("vid-prompt","done")):(A("ไม่พบช่อง Prompt สำหรับ Video Prompt"),c.push("❌ Video Prompt"),d.push("video prompt input not found"),S("vid-prompt","error")),await m(1e3),S("vid-generate","active");const M=St();if(M){const F=M.getBoundingClientRect(),T=F.left+F.width/2,$=F.top+F.height/2,D={bubbles:!0,cancelable:!0,clientX:T,clientY:$,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),M.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",D)),M.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),c.push("✅ Video Generate"),S("vid-generate","done"),await m(500),M.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),M.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",D)),M.dispatchEvent(new MouseEvent("click",D)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else A("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),c.push("❌ Video Generate"),d.push("video generate button not found"),S("vid-generate","error")}catch(v){A(`ขั้น 5 ผิดพลาด: ${v.message}`),c.push("⚠️ Video Gen"),d.push(`video gen error: ${v.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),we("animate"),we("vid-prompt"),we("vid-generate"),we("vid-wait");if(t.videoPrompt){S("vid-wait","active");const v=t.sceneCount||1,f=t.videoScenePrompts||[t.videoPrompt];if(v>1)try{Yt(v)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${v>1?`ต่อ ${v} ฉาก`:"ดาวน์โหลด"} ===`);const w=()=>{const T=document.querySelectorAll("div, span, p, label, strong, small");for(const $ of T){if($.closest("#netflow-engine-overlay"))continue;const D=($.textContent||"").trim();if(D.length>10)continue;const x=D.match(/(\d{1,3})\s*%/);if(!x)continue;const g=parseInt(x[1],10);if(g<1||g>100)continue;const y=$.getBoundingClientRect();if(!(y.width===0||y.width>150)&&!(y.top<0||y.top>window.innerHeight))return g}return null},M=async(T=6e5)=>{n("รอการสร้างวิดีโอ..."),S("vid-wait","active"),await m(5e3);const $=()=>{const V=document.querySelectorAll("div, span, p, label, strong, small");let X=0;for(const G of V){if(G.closest("#netflow-engine-overlay"))continue;const Z=(G.textContent||"").trim();if(Z.includes("%")&&Z.length<15){const ie=G.tagName.toLowerCase(),re=G.className&&typeof G.className=="string"?G.className.split(/\s+/).slice(0,2).join(" "):"",ce=G.getBoundingClientRect();if(n(`  🔍 "${Z}" ใน <${ie}.${re}> ที่ (${ce.left.toFixed(0)},${ce.top.toFixed(0)}) w=${ce.width.toFixed(0)}`),X++,X>=5)break}}X===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},D=Je();n(D?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),$();const x=Date.now();let g=-1,y=0,z=!1;for(;Date.now()-x<T;){const V=w();if(V!==null){if(V!==g&&(n(`ความคืบหน้าวิดีโอ: ${V}%`),g=V,S("vid-wait","active",V)),y=Date.now(),V>=100){n("✅ ตรวจพบ 100%!"),z=!0;break}}else if(g>30){const X=Math.floor((Date.now()-y)/1e3);if(X>=5){n(`✅ % หายไปที่ ${g}% (หาย ${X} วินาที) — วิดีโอเสร็จ!`),z=!0;break}n(`⏳ % หายที่ ${g}% — ยืนยันใน ${5-X} วินาที...`)}else{const X=Math.floor((Date.now()-x)/1e3);X%15<3&&n(`⏳ รอ... (${X} วินาที) ไม่พบ %`)}if(!z&&g>0&&Je(!0)&&!D){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${g}% — วิดีโอเสร็จ!`),z=!0;break}if(me())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(g<1){const X=Mt();if(X)return A(`❌ สร้างวิดีโอล้มเหลว: ${X}`),null}await m(3e3)}const q=Je();if(!q)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),S("vid-wait","error"),null;const _=q;z?(S("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const L=_.getBoundingClientRect();let O=L.left+L.width/2,N=L.top+L.height/2,U=_;const j=_.querySelector("video, img, canvas");if(j){const V=j.getBoundingClientRect();V.width>50&&V.height>50&&(O=V.left+V.width/2,N=V.top+V.height/2,U=j,n(`🎯 พบรูปย่อ <${j.tagName.toLowerCase()}> ในการ์ดที่ (${O.toFixed(0)},${N.toFixed(0)}) ${V.width.toFixed(0)}x${V.height.toFixed(0)}`))}else N=L.top+L.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${O.toFixed(0)},${N.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${O.toFixed(0)}, ${N.toFixed(0)})...`),Qt(U);for(let V=0;V<8;V++){const X={bubbles:!0,cancelable:!0,clientX:O+V%2,clientY:N};U.dispatchEvent(new PointerEvent("pointermove",{...X,pointerId:1,isPrimary:!0,pointerType:"mouse"})),U.dispatchEvent(new MouseEvent("mousemove",X)),await m(500)}try{chrome.storage.local.set({[le()]:{timestamp:Date.now(),action:"mute_video",sceneCount:v,scenePrompts:f,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${v} ฉาก, ${f.length} prompts, theme: ${t.theme})`)}catch(V){n(`⚠️ ไม่สามารถบันทึก pending action: ${V.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await F(U),n("✅ คลิกการ์ดวิดีโอเสร็จ"),_},F=async T=>{const $=T.getBoundingClientRect(),D=$.left+$.width/2,x=$.top+$.height/2,g={bubbles:!0,cancelable:!0,clientX:D,clientY:x,button:0};T.dispatchEvent(new PointerEvent("pointerdown",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mousedown",g)),await m(80),T.dispatchEvent(new PointerEvent("pointerup",{...g,pointerId:1,isPrimary:!0,pointerType:"mouse"})),T.dispatchEvent(new MouseEvent("mouseup",g)),T.dispatchEvent(new MouseEvent("click",g)),await m(50),T.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await M())A("หมดเวลารอการสร้างวิดีโอ"),c.push("⚠️ Video Wait"),S("vid-wait","error");else{c.push("✅ Video Complete"),S("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const $=await new Promise(D=>{chrome.storage.local.get(le(),x=>{if(chrome.runtime.lastError){D(null);return}D((x==null?void 0:x[le()])||null)})});$&&!$._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove(le()),$.action==="mute_video"?await _t($.sceneCount||1,$.scenePrompts||[],$.theme):$.action==="wait_scene_gen_and_download"&&await At($.sceneCount||2,$.currentScene||2,$.theme,$.scenePrompts||[]))}}catch(T){A(`ขั้น 6 ผิดพลาด: ${T.message}`),c.push("⚠️ Step6"),d.push(`step 6: ${T.message}`)}}const b=d.length===0;try{Ie(b?5e3:8e3)}catch(v){console.warn("Overlay complete error:",v)}return{success:b,message:b?`สำเร็จ! ${c.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${c.join(" → ")} | ${d.join(", ")}`,step:b?"done":"partial"}}async function _t(t,e=[],a){var H;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{a&&Ve(a)}catch{}try{He(t)}catch(B){n(`⚠️ showOverlay error: ${B.message}`)}try{const B=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const P of B)S(P,"done");t>=2&&S("scene2-prompt","active"),n(`✅ overlay restored: ${B.length} steps done, sceneCount=${t}`)}catch(B){n(`⚠️ overlay restore error: ${B.message}`)}await m(1500);const r=(()=>{for(const B of document.querySelectorAll("button")){const P=B.querySelectorAll("i");for(const f of P){const w=(f.textContent||"").trim();if(w==="volume_up"||w==="volume_off"||w==="volume_mute"){const M=B.getBoundingClientRect();if(M.width>0&&M.height>0)return B}}const v=(B.getAttribute("aria-label")||"").toLowerCase();if(v.includes("mute")||v.includes("ปิดเสียง")){const f=B.getBoundingClientRect();if(f.width>0&&f.height>0)return B}}return null})();r?(r.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม");let i=null;if(t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let x=2;x<=t;x++){const g=e[x-1];if(!g){A(`ไม่พบ prompt สำหรับฉากที่ ${x}`);continue}n(`── ฉากที่ ${x}/${t}: วาง prompt + generate ──`);let y=null;const z=Date.now();for(;!y&&Date.now()-z<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(y=G[G.length-1]),!y){const Z=document.querySelectorAll("[role='textbox'][contenteditable='true']");Z.length>0&&(y=Z[Z.length-1])}y||await m(1e3)}if(!y){A("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${y.tagName.toLowerCase()}> ${y.className.substring(0,40)}`),await Le(y,g),n(`วาง prompt ฉาก ${x} (${g.length} ตัวอักษร) ✅`);try{S(`scene${x}-prompt`,"done"),S(`scene${x}-gen`,"active")}catch{}await m(1e3);const q=y.getBoundingClientRect();let _=null,L=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const Z=G.querySelectorAll("i");let ie=!1;for(const $e of Z)if(($e.textContent||"").trim()==="arrow_forward"){ie=!0;break}if(!ie)continue;const re=G.getBoundingClientRect();if(re.width<=0||re.height<=0)continue;const ce=Math.abs(re.top-q.top)+Math.abs(re.right-q.right);ce<L&&(L=ce,_=G)}if(!_)for(const G of document.querySelectorAll("button")){const Z=G.querySelectorAll("i");for(const ie of Z)if((ie.textContent||"").trim()==="arrow_forward"){const re=G.getBoundingClientRect();if(re.width>0&&re.height>0){_=G;break}}if(_)break}if(!_){A("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({[le()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:t,currentScene:x,scenePrompts:e}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${x}/${t})`),await ee(_),n(`คลิก Generate ฉาก ${x} ✅`);try{S(`scene${x}-gen`,"done"),S(`scene${x}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${x} gen เสร็จ ──`),await m(5e3);let O=0,N=0;const U=Date.now(),j=6e5,V=5e3;let X=!1;for(;Date.now()-U<j;){let G=null;const Z=document.querySelectorAll("div, span, p, label, strong, small");for(const ie of Z){if(ie.closest("#netflow-engine-overlay"))continue;const ce=(ie.textContent||"").trim().match(/^(\d{1,3})%$/);if(ce){const $e=ie.getBoundingClientRect();if($e.width>0&&$e.height>0&&$e.width<120&&$e.height<60){G=parseInt(ce[1],10);break}}}if(G!==null){if(G!==O){n(`🎬 ฉาก ${x} ความคืบหน้า: ${G}%`),O=G;try{S(`scene${x}-wait`,"active",G)}catch{}}N=0}else if(O>0){if(N===0)N=Date.now(),n(`🔍 ฉาก ${x}: % หายไป (จาก ${O}%) — กำลังยืนยัน...`);else if(Date.now()-N>=V){n(`✅ ฉาก ${x}: % หายไป ${V/1e3} วินาที — เจนเสร็จ!`),X=!0;break}}if(me()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}X||A(`ฉาก ${x} หมดเวลา`),n(`✅ ฉาก ${x} เสร็จแล้ว`);try{S(`scene${x}-wait`,"done",100)}catch{}chrome.storage.local.remove(le()),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{S("download","active")}catch{}await m(2e3);const B=Date.now();let P=null;const v=Date.now();for(;!P&&Date.now()-v<1e4;){for(const x of document.querySelectorAll("button")){const g=x.querySelector("i");if(g&&(g.textContent||"").trim()==="download"){const y=x.getBoundingClientRect();if(y.width>0&&y.height>0){P=x;break}}}P||await m(1e3)}if(!P){A("ไม่พบปุ่มดาวน์โหลด");return}await ee(P),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await m(1500);let f=null;for(let x=0;x<3&&!f;x++){x>0&&n(`🔄 ลองหา 720p ครั้งที่ ${x+1}...`);let g=null;const y=Date.now();for(;!g&&Date.now()-y<5e3;){for(const O of document.querySelectorAll("[role='menuitem']"))if((O.textContent||"").trim().includes("Full Video")&&O.querySelector("i")){const U=O.getBoundingClientRect();if(U.width>0&&U.height>0){g=O;break}}g||await m(500)}if(!g){A("ไม่พบ Full Video");continue}const z=g.getBoundingClientRect(),q=z.left+z.width/2,_=z.top+z.height/2;g.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:q,clientY:_})),g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:q,clientY:_})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:q,clientY:_})),await ee(g),n("คลิก/hover Full Video ✅"),await m(2e3);const L=Date.now();for(;!f&&Date.now()-L<8e3;){for(const O of document.querySelectorAll("button[role='menuitem']")){const N=O.querySelectorAll("span");for(const U of N)if((U.textContent||"").trim()==="720p"){const j=O.getBoundingClientRect();if(j.width>0&&j.height>0){f=O;break}}if(f)break}f||(g.isConnected&&(g.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:q,clientY:_})),g.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:q+20,clientY:_}))),await m(500))}}if(!f){A("ไม่พบ 720p");return}await ee(f),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const w=Date.now();let M=!1,F=!1;for(;Date.now()-w<3e5;){for(const x of document.querySelectorAll("div[data-title] div, div[data-content] div")){const g=(x.textContent||"").trim();if(g==="Download complete!"||g==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),M=!0;break}(g.includes("Downloading your extended video")||g.includes("กำลังดาวน์โหลด"))&&(F||(F=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(M)break;if(F){let x=!1;for(const g of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((g.textContent||"").trim().includes("Downloading")){x=!0;break}if(!x){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),M=!0;break}}if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างเตรียมไฟล์");return}await m(2e3)}if(!M){A("เตรียมไฟล์หมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let T=!1;const $=Date.now();for(;Date.now()-$<6e4&&!T;){try{await new Promise(x=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:B},g=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):g!=null&&g.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${g.message}`),T=!0,g.downloadUrl&&(i=g.downloadUrl,n(`[TikTok] จะใช้ download URL: ${g.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-$)/1e3)}s)`),x()})})}catch(x){A(`ตรวจสอบผิดพลาด: ${x.message}`)}T||await m(3e3)}T||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const D=await Ye();i||(i=D);try{S("open","done"),Ie(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══"),Xe(i),We(2e3);return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const p=(B,P="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const v of document.querySelectorAll(P)){const f=(v.textContent||"").trim();if(f.includes(B)&&f.length<100){const w=v.getBoundingClientRect();if(w.width>0&&w.height>0&&w.top>=0)return v}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let l=null;const s=Date.now();for(;!l&&Date.now()-s<1e4;){for(const B of document.querySelectorAll("button, [role='button']")){const P=(B.textContent||"").trim(),v=P.toLowerCase();if((v.includes("download")||v.includes("ดาวน์โหลด"))&&P.length<80){const f=B.getBoundingClientRect();if(f.width>0&&f.height>0){l=B;break}}}if(!l)for(const B of document.querySelectorAll("button")){const P=(B.getAttribute("aria-label")||"").toLowerCase();if(P.includes("download")||P.includes("ดาวน์")){const v=B.getBoundingClientRect();if(v.width>0&&v.height>0){l=B;break}}}l||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!l){A("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(l.textContent||"").trim().substring(0,40)}"`),await ee(l),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const c=Date.now();let d=null;const u=Date.now();for(;!d&&Date.now()-u<5e3;)d=p("1080p"),d||(n("รอ 1080p..."),await m(500));if(!d){A("ไม่พบ 1080p");return}await ee(d),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const k=Date.now();let R=!1,C=!1,E=0;const h=3e3;for(;Date.now()-k<3e5;){const P=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(P.includes("upscaling complete")||P.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),R=!0;break}for(const f of document.querySelectorAll("div, span, p")){const w=(f.textContent||"").trim().toLowerCase();if(w.length<60&&(w.includes("upscaling complete")||w.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(H=f.textContent)==null?void 0:H.trim()}")`),R=!0;break}}if(R)break;if(P.includes("upscaling your video")||P.includes("กำลังอัปสเกล")){C=!0,E=0;const f=Math.floor((Date.now()-k)/1e3);n(`⏳ กำลังอัปสเกล... (${f} วินาที)`)}else if(C){if(E===0)E=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-E>=h){n(`✅ ข้อความ Upscaling หายไป ${h/1e3} วินาที — เสร็จ!`),R=!0;break}}else{const f=Math.floor((Date.now()-k)/1e3);f%10<3&&n(`⏳ รอ Upscale... (${f} วินาที)`)}if(me()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!R){A("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let o=!1;const b=Date.now();for(;Date.now()-b<6e4&&!o;){try{await new Promise(B=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:c},P=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):P!=null&&P.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${P.message}`),o=!0,P.downloadUrl&&(i=P.downloadUrl,n(`[TikTok] จะใช้ download URL: ${P.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-b)/1e3)}s)`),B()})})}catch(B){A(`ตรวจสอบผิดพลาด: ${B.message}`)}o||await m(3e3)}o||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const I=await Ye();i||(i=I),n("═══ ดาวน์โหลดเสร็จสิ้น ═══"),Xe(i),We(2e3)}async function At(t=2,e=2,a,r=[]){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{a&&Ve(a)}catch{}try{He(t)}catch(f){n(`⚠️ showOverlay error: ${f.message}`)}try{const f=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=e;w++)f.push(`scene${w}-prompt`,`scene${w}-gen`),w<e&&f.push(`scene${w}-wait`);for(const w of f)S(w,"done");S(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${f.length} steps done (scene ${e}/${t} navigate)`)}catch(f){n(`⚠️ overlay restore error: ${f.message}`)}await m(2e3);const i=(()=>{for(const f of document.querySelectorAll("button")){const w=f.querySelectorAll("i");for(const M of w){const F=(M.textContent||"").trim();if(F==="volume_up"||F==="volume_off"||F==="volume_mute"){const T=f.getBoundingClientRect();if(T.width>0&&T.height>0)return f}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let p=0,l=0;const s=Date.now(),c=6e5,d=5e3;let u=!1,k=0;for(;Date.now()-s<c;){let f=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const M of w){if(M.closest("#netflow-engine-overlay"))continue;const T=(M.textContent||"").trim().match(/^(\d{1,3})%$/);if(T){const $=M.getBoundingClientRect();if($.width>0&&$.height>0&&$.width<120&&$.height<60){f=parseInt(T[1],10);break}}}if(f!==null){if(k=0,f!==p){n(`🎬 scene ${e} ความคืบหน้า: ${f}%`),p=f;try{S(`scene${e}-wait`,"active",f)}catch{}}l=0}else if(p>0){if(l===0)l=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${p}%) — กำลังยืนยัน...`);else if(Date.now()-l>=d){n(`✅ scene ${e}: % หายไป ${d/1e3} วินาที — เจนเสร็จ!`),u=!0;break}}else if(k++,k>=15){const M=document.querySelectorAll("video");let F=!1;for(const T of M)if(T.readyState>=2&&!T.paused&&T.getBoundingClientRect().width>200){F=!0;break}if(F){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),u=!0;break}if(k>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),u=!0;break}}await m(2e3)}u||n(`⚠️ scene ${e} หมดเวลา — ลองต่อไป`);try{S(`scene${e}-wait`,"done",100)}catch{}if(n(`✅ scene ${e} เสร็จ`),e<t&&r.length>0){n(`═══ ยังเหลืออีก ${t-e} ฉาก — ต่อฉากถัดไป ═══`),await m(2e3);for(let f=e+1;f<=t;f++){const w=r[f-1];if(!w){n(`⚠️ ไม่พบ prompt สำหรับฉากที่ ${f} — ข้าม`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate (pending recovery) ──`);let M=null;const F=Date.now();for(;!M&&Date.now()-F<1e4;){const _=document.querySelectorAll("[data-slate-editor='true']");if(_.length>0&&(M=_[_.length-1]),!M){const L=document.querySelectorAll("[role='textbox'][contenteditable='true']");L.length>0&&(M=L[L.length-1])}M||await m(1e3)}if(!M){n(`⚠️ ไม่พบ Slate editor สำหรับฉาก ${f}`);break}await Le(M,w),n(`วาง prompt ฉาก ${f} (${w.length} ตัวอักษร) ✅`);try{S(`scene${f}-prompt`,"done"),S(`scene${f}-gen`,"active")}catch{}await m(1e3);const T=M.getBoundingClientRect();let $=null,D=1/0;for(const _ of document.querySelectorAll("button")){if(_.disabled)continue;const L=_.querySelectorAll("i");let O=!1;for(const j of L)if((j.textContent||"").trim()==="arrow_forward"){O=!0;break}if(!O)continue;const N=_.getBoundingClientRect();if(N.width<=0||N.height<=0)continue;const U=Math.abs(N.top-T.top)+Math.abs(N.right-T.right);U<D&&(D=U,$=_)}if(!$)for(const _ of document.querySelectorAll("button")){const L=_.querySelectorAll("i");for(const O of L)if((O.textContent||"").trim()==="arrow_forward"){const N=_.getBoundingClientRect();if(N.width>0&&N.height>0){$=_;break}}if($)break}if(!$){n(`⚠️ ไม่พบปุ่ม Generate สำหรับฉาก ${f}`);break}await new Promise(_=>{chrome.storage.local.set({[le()]:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:a,sceneCount:t,currentScene:f,scenePrompts:r}},()=>_())}),await ee($),n(`คลิก Generate ฉาก ${f} ✅`);try{S(`scene${f}-gen`,"done"),S(`scene${f}-wait`,"active")}catch{}await m(5e3);let x=0,g=0;const y=Date.now();let z=!1,q=0;for(;Date.now()-y<6e5;){let _=null;const L=document.querySelectorAll("div, span, p, label, strong, small");for(const O of L){if(O.closest("#netflow-engine-overlay"))continue;const U=(O.textContent||"").trim().match(/^(\d{1,3})%$/);if(U){const j=O.getBoundingClientRect();if(j.width>0&&j.height>0&&j.width<120&&j.height<60){_=parseInt(U[1],10);break}}}if(_!==null){if(q=0,_!==x){n(`🎬 ฉาก ${f} ความคืบหน้า: ${_}%`),x=_;try{S(`scene${f}-wait`,"active",_)}catch{}}g=0}else if(x>0){if(g===0)g=Date.now();else if(Date.now()-g>=5e3){n(`✅ ฉาก ${f}: เจนเสร็จ!`),z=!0;break}}else if(q++,q>=15){const O=document.querySelectorAll("video");let N=!1;for(const U of O)if(U.readyState>=2&&!U.paused&&U.getBoundingClientRect().width>200){N=!0;break}if(N){n(`✅ ฉาก ${f}: พบวิดีโอเล่นอยู่ — เสร็จ`),z=!0;break}if(q>=30){n(`✅ ฉาก ${f}: ไม่พบ % 60 วินาที — ถือว่าเสร็จ`),z=!0;break}}await m(2e3)}z||n(`⚠️ ฉาก ${f} หมดเวลา`);try{S(`scene${f}-wait`,"done",100)}catch{}n(`✅ ฉาก ${f} เสร็จแล้ว`),chrome.storage.local.remove(le()),await m(2e3)}}n("✅ ทุกฉากเสร็จ — เริ่มดาวน์โหลด"),await m(3e3);let R=null;try{S("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const C=Date.now();let E=null;const h=Date.now();for(;!E&&Date.now()-h<1e4;){for(const f of document.querySelectorAll("button")){const w=f.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const M=f.getBoundingClientRect();if(M.width>0&&M.height>0){E=f;break}}}E||await m(1e3)}if(!E){A("ไม่พบปุ่มดาวน์โหลด");return}await ee(E),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await m(1500);let o=null;for(let f=0;f<3&&!o;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let w=null;const M=Date.now();for(;!w&&Date.now()-M<5e3;){for(const x of document.querySelectorAll("[role='menuitem']"))if((x.textContent||"").trim().includes("Full Video")&&x.querySelector("i")){const y=x.getBoundingClientRect();if(y.width>0&&y.height>0){w=x;break}}w||await m(500)}if(!w){A("ไม่พบ Full Video");continue}const F=w.getBoundingClientRect(),T=F.left+F.width/2,$=F.top+F.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:T,clientY:$})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:T,clientY:$})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:T,clientY:$})),await ee(w),n("คลิก/hover Full Video ✅"),await m(2e3);const D=Date.now();for(;!o&&Date.now()-D<8e3;){for(const x of document.querySelectorAll("button[role='menuitem']")){const g=x.querySelectorAll("span");for(const y of g)if((y.textContent||"").trim()==="720p"){const z=x.getBoundingClientRect();if(z.width>0&&z.height>0){o=x;break}}if(o)break}o||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:T,clientY:$})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:T+20,clientY:$}))),await m(500))}}if(!o){A("ไม่พบ 720p");return}await ee(o),n("คลิก 720p ✅"),n("⏳ รอระบบเตรียมไฟล์ Full Video (Rendering)...");const b=Date.now();let I=!1,H=!1;for(;Date.now()-b<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(f.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ เตรียมไฟล์เสร็จสิ้น! (toast)"),I=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(H||(H=!0,n("⏳ กำลังเตรียมไฟล์วิดีโอรวม...")))}if(I)break;if(H){let f=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ เตรียมไฟล์เสร็จสิ้น (toast หายไป)"),I=!0;break}}await m(2e3)}if(!I){A("เตรียมไฟล์หมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("⬇️ รอ Chrome ดาวน์โหลดไฟล์ลงเครื่อง..."),await m(5e3);let B=!1;const P=Date.now();for(;Date.now()-P<6e4&&!B;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:C},w=>{chrome.runtime.lastError?A(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),B=!0,w.downloadUrl&&(R=w.downloadUrl,n(`[TikTok] จะใช้ download URL: ${w.downloadUrl.substring(0,80)}...`))):n(`⏳ กำลังดาวน์โหลดไฟล์ลงเครื่อง... (${Math.round((Date.now()-P)/1e3)}s)`),f()})})}catch(f){A(`ตรวจสอบผิดพลาด: ${f.message}`)}B||await m(3e3)}B||A("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("[TikTok] กำลัง capture + cache video blob จาก content script...");const v=await Ye();R||(R=v);try{S("open","done"),Ie(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══"),Xe(R),We(2e3)}async function cn(){try{await Xt;const t=le();let e=await new Promise(l=>{chrome.storage.local.get(t,s=>{if(chrome.runtime.lastError){l(null);return}l((s==null?void 0:s[t])||null)})});if(!e&&xe){const l="netflow_pending_action";e=await new Promise(s=>{chrome.storage.local.get(l,c=>{if(chrome.runtime.lastError){s(null);return}s((c==null?void 0:c[l])||null)})}),e&&(n("🔄 Pending action found under global key (legacy fallback)"),chrome.storage.local.remove(l))}if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-e.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove(t);return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(l=>{chrome.storage.local.set({[t]:e},()=>l())}),await m(300),!await new Promise(l=>{chrome.storage.local.get(t,s=>{const c=s==null?void 0:s[t];l((c==null?void 0:c._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove(t),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(r/1e3)} วินาที)`),e.action==="mute_video"?await _t(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await At(e.sceneCount||2,e.currentScene||2,e.theme,e.scenePrompts||[]):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,a)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),a({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),ln(t).then(r=>{n(`✅ ระบบอัตโนมัติเสร็จ: ${r.message}`),Et()}).catch(r=>{if(r instanceof Qe||(r==null?void 0:r.name)==="NetflowAbortError"){n("⛔ Automation หยุดทำงานโดยผู้ใช้");try{Ne("⛔ ผู้ใช้หยุดการทำงาน")}catch{}try{$t()}catch{}}else console.error("[Netflow AI] Generate error:",r);Et()}),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,a({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return a({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return a({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const r=Zt();if(!r){A("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const i=r.getBoundingClientRect(),p=i.left+i.width/2,l=i.top+i.height/2;n(`การ์ดรูปที่ (${p.toFixed(0)}, ${l.toFixed(0)}) ${i.width.toFixed(0)}x${i.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const c=document.elementFromPoint(p,l);c?(await ee(c),n(`คลิก ${s+1}/2 บน <${c.tagName.toLowerCase()}>`)):(await ee(r),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),cn()})();
