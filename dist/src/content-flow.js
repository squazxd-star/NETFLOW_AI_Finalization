(function(){"use strict";const ie={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let W=ie.green,ue=null;function Me(t){t&&ie[t]&&(ue=t,W=ie[t],Ne(),requestAnimationFrame(()=>nt()))}function ft(){if(ue&&ie[ue])return ie[ue];try{const t=localStorage.getItem("netflow_app_theme");if(t&&ie[t])return ie[t]}catch{}return ie.green}let Z=0,Q=255,ee=65;function Ne(){const t=W.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);t&&(Z=parseInt(t[1],16),Q=parseInt(t[2],16),ee=parseInt(t[3],16))}let V=null,U=null,ae=null,Oe=0,$e=null,ge=null,Ee=null,Ie=0,se=!1,ne=null,me=null,he=null,ke=1,X=[];function Pe(t){const e=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(t<=1)e.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{e.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=t;r++)e.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});e.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return e}const le=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];X=Pe(1);function ut(t){const e=t.rgb,r=t.accentRgb,a=t.doneRgb,o=t.hex,d=t.accentHex,c=t.doneHex,s=(()=>{const i=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!i)return"#4ade80";const w=S=>Math.min(255,S+80);return`#${[1,2,3].map(S=>w(parseInt(i[S],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const i=c.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!i)return"#4ade80";const w=S=>Math.min(255,S+60);return`#${[1,2,3].map(S=>w(parseInt(i[S],16)).toString(16).padStart(2,"0")).join("")}`})(),p=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),E=p?Math.max(parseInt(p[1],16),parseInt(p[2],16),parseInt(p[3],16),1):255,_=p?parseInt(p[1],16)/E:0,N=p?parseInt(p[2],16)/E:1,M=p?parseInt(p[3],16)/E:.25,h=i=>`${Math.round(_*i)}, ${Math.round(N*i)}, ${Math.round(M*i)}`;return`
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
        radial-gradient(ellipse at 50% 50%, rgba(${h(18)},0.94) 0%, rgba(${h(4)},0.98) 40%, rgba(0,0,0,0.99) 100%);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
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
    mix-blend-mode: screen;
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
    will-change: transform;
    animation: nf-scanline-shift 0.15s steps(2) infinite;
}

@keyframes nf-scanline-shift {
    0% { transform: translateY(0); }
    100% { transform: translateY(4px); }
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
    box-shadow: 0 0 30px rgba(${e},0.09), inset 0 0 30px rgba(${e},0.06);
    pointer-events: none;
    z-index: 1;
    animation: nf-pulse-expand 5s ease-out infinite;
}
#netflow-engine-overlay .nf-pulse-ring:nth-child(2) { animation-delay: 1.6s; width: 600px; height: 600px; border-color: rgba(${r},0.18); box-shadow: 0 0 25px rgba(${r},0.09); }
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
    inset: -80px;
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
    inset: -80px;
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
    background: rgba(${h(8)}, 0.85);
    border: 1.5px solid rgba(${e},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${e},0.15),
        0 0 120px rgba(${e},0.08),
        0 0 200px rgba(${h(180)},0.05),
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
            0 0 200px rgba(${h(180)},0.05),
            inset 0 1px 0 rgba(${e},0.1),
            inset 0 0 40px rgba(${e},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${e},0.25),
            0 0 160px rgba(${e},0.12),
            0 0 250px rgba(${h(180)},0.08),
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
    color: ${s};
    font-weight: 700;
    text-shadow: 0 0 10px rgba(${e},0.5);
}

.nf-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${o};
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

.nf-term-active .nf-term-prefix { color: ${o}; text-shadow: 0 0 6px rgba(${e},0.4); }

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
    background: rgba(${a}, 0.12);
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
    background: linear-gradient(180deg, rgba(${h(5)},0.95) 0%, rgba(${h(12)},0.98) 100%);
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

/* HUD Frame */
.nf-engine-frame {
    position: absolute;
    inset: 8px 14px;
    border: 1px solid rgba(${e},0.25);
    border-radius: 3px;
    box-shadow:
        0 0 20px rgba(${e},0.08),
        0 0 40px rgba(${e},0.04),
        inset 0 0 20px rgba(${e},0.02);
    animation: nf-frame-pulse 4s ease-in-out infinite;
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
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter:
        drop-shadow(0 0 4px rgba(${e},1))
        drop-shadow(0 0 12px rgba(${e},0.7))
        drop-shadow(0 0 28px rgba(${e},0.35));
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
    border: 1px solid rgba(${e},0.25);
    border-top: 1px solid rgba(${r},0.3);
    border-radius: 4px;
    background: linear-gradient(180deg, rgba(${h(6)},0.75) 0%, rgba(${h(3)},0.92) 100%);
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
    background: rgba(${h(8)}, 0.88);
    border: 1px solid rgba(${e},0.2);
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
    border-color: rgba(${e},0.5);
    box-shadow:
        0 0 30px rgba(${e},0.12),
        0 0 60px rgba(${e},0.06),
        inset 0 0 20px rgba(${e},0.03);
}

.nf-module.nf-done {
    border-color: rgba(${a}, 0.4);
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
    color: ${o};
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
    background: ${o};
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
    background: linear-gradient(90deg, ${o}, ${s});
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
    background: linear-gradient(90deg, ${o}, ${d});
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
    background: rgba(${h(8)},0.8);
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
    background: rgba(${h(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${o};
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
    color: ${o};
    text-shadow: 0 0 6px rgba(${e},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${o};
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
    color: rgba(${a},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${a},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${c};
    box-shadow: 0 0 5px rgba(${a},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${a},0.1);
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

    `}function Ge(){ae||(ae=document.createElement("style"),ae.id="netflow-overlay-styles",ae.textContent=ut(W),document.head.appendChild(ae))}function ze(t){t.innerHTML="",X.forEach((e,r)=>{const a=document.createElement("div");a.className="nf-proc-row nf-proc-waiting",a.id=`nf-proc-${e.stepId}`,a.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${e.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,t.appendChild(a)})}function gt(){const t=document.getElementById("nf-terminal");if(!t)return;ze(t);const e=document.getElementById("nf-step-counter");e&&(e.textContent=`0/${X.length}`)}function He(t,e){let s="";for(let g=0;g<32;g++){const x=g/32*Math.PI*2,R=(g+.2)/32*Math.PI*2,f=(g+.5)/32*Math.PI*2,u=(g+.8)/32*Math.PI*2,v=(g+1)/32*Math.PI*2;s+=`${g===0?"M":"L"}${(120+104*Math.cos(x)).toFixed(1)},${(120+104*Math.sin(x)).toFixed(1)} `,s+=`L${(120+104*Math.cos(R)).toFixed(1)},${(120+104*Math.sin(R)).toFixed(1)} `,s+=`L${(120+116*Math.cos(f)).toFixed(1)},${(120+116*Math.sin(f)).toFixed(1)} `,s+=`L${(120+104*Math.cos(u)).toFixed(1)},${(120+104*Math.sin(u)).toFixed(1)} `,s+=`L${(120+104*Math.cos(v)).toFixed(1)},${(120+104*Math.sin(v)).toFixed(1)} `}s+="Z";const l=24,p=100,E=90;let _="";for(let g=0;g<l;g++){const x=g/l*Math.PI*2,R=(g+.25)/l*Math.PI*2,f=(g+.75)/l*Math.PI*2,u=(g+1)/l*Math.PI*2;_+=`${g===0?"M":"L"}${(120+E*Math.cos(x)).toFixed(1)},${(120+E*Math.sin(x)).toFixed(1)} `,_+=`L${(120+p*Math.cos(R)).toFixed(1)},${(120+p*Math.sin(R)).toFixed(1)} `,_+=`L${(120+p*Math.cos(f)).toFixed(1)},${(120+p*Math.sin(f)).toFixed(1)} `,_+=`L${(120+E*Math.cos(u)).toFixed(1)},${(120+E*Math.sin(u)).toFixed(1)} `}_+="Z";let N="";for(let g=0;g<64;g++){const x=g/64*Math.PI*2,R=g%4===0?117:119,f=g%4===0?124:122,u=g%4===0?.8:.4,v=g%4===0?.7:.35;N+=`<line x1="${(120+R*Math.cos(x)).toFixed(1)}" y1="${(120+R*Math.sin(x)).toFixed(1)}" x2="${(120+f*Math.cos(x)).toFixed(1)}" y2="${(120+f*Math.sin(x)).toFixed(1)}" stroke="rgba(${t},${v})" stroke-width="${u}"/>`}const M=26,h=78,i=68;let w="";for(let g=0;g<M;g++){const x=g/M*Math.PI*2,R=(g+.2)/M*Math.PI*2,f=(g+.5)/M*Math.PI*2,u=(g+.8)/M*Math.PI*2,v=(g+1)/M*Math.PI*2;w+=`${g===0?"M":"L"}${(120+i*Math.cos(x)).toFixed(1)},${(120+i*Math.sin(x)).toFixed(1)} `,w+=`L${(120+i*Math.cos(R)).toFixed(1)},${(120+i*Math.sin(R)).toFixed(1)} `,w+=`L${(120+h*Math.cos(f)).toFixed(1)},${(120+h*Math.sin(f)).toFixed(1)} `,w+=`L${(120+i*Math.cos(u)).toFixed(1)},${(120+i*Math.sin(u)).toFixed(1)} `,w+=`L${(120+i*Math.cos(v)).toFixed(1)},${(120+i*Math.sin(v)).toFixed(1)} `}w+="Z";let S="";for(let g=0;g<48;g++){const x=g/48*Math.PI*2,R=g%4===0?79:80,f=g%4===0?85:83,u=g%4===0?.6:.3,v=g%4===0?.6:.3;S+=`<line x1="${(120+R*Math.cos(x)).toFixed(1)}" y1="${(120+R*Math.sin(x)).toFixed(1)}" x2="${(120+f*Math.cos(x)).toFixed(1)}" y2="${(120+f*Math.sin(x)).toFixed(1)}" stroke="rgba(${e},${v})" stroke-width="${u}"/>`}function T(g,x,R,f,u){let v="";for(let A=0;A<R;A++){const $=A/R*Math.PI*2,C=(A+.25)/R*Math.PI*2,O=(A+.75)/R*Math.PI*2,L=(A+1)/R*Math.PI*2;v+=`${A===0?"M":"L"}${(g+u*Math.cos($)).toFixed(1)},${(x+u*Math.sin($)).toFixed(1)} `,v+=`L${(g+f*Math.cos(C)).toFixed(1)},${(x+f*Math.sin(C)).toFixed(1)} `,v+=`L${(g+f*Math.cos(O)).toFixed(1)},${(x+f*Math.sin(O)).toFixed(1)} `,v+=`L${(g+u*Math.cos(L)).toFixed(1)},${(x+u*Math.sin(L)).toFixed(1)} `}return v+"Z"}const B=42,k=[],y=T(120,120,14,18,13);k.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${y}" fill="none" stroke="rgba(${t},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${e},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${t},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let g=0;g<8;g++){const x=g/8*Math.PI*2,R=120+B*Math.cos(x),f=120+B*Math.sin(x),v=T(R,f,10,14,10),A=g%2===0?"":"animation-direction:reverse;";k.push(`<g class="nf-kinetic-sub" style="transform-origin:${R.toFixed(1)}px ${f.toFixed(1)}px;${A}">
            <path d="${v}" fill="none" stroke="rgba(${e},0.6)" stroke-width="0.9"/>
            <circle cx="${R.toFixed(1)}" cy="${f.toFixed(1)}" r="7" fill="none" stroke="rgba(${t},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${R.toFixed(1)}" cy="${f.toFixed(1)}" r="2.5" fill="rgba(${t},0.6)"/>
        </g>`)}const b=k.join(`
`);let P="";for(let g=0;g<8;g++){const x=g/8*Math.PI*2,R=120+10*Math.cos(x),f=120+10*Math.sin(x),u=120+(B-10)*Math.cos(x),v=120+(B-10)*Math.sin(x);P+=`<line x1="${R.toFixed(1)}" y1="${f.toFixed(1)}" x2="${u.toFixed(1)}" y2="${v.toFixed(1)}" stroke="rgba(${e},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="nfKGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.95)"/>
                <stop offset="50%" stop-color="rgba(${e},0.75)"/>
                <stop offset="100%" stop-color="rgba(${t},0.95)"/>
            </linearGradient>
            <linearGradient id="nfKGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="rgba(${e},0.8)"/>
                <stop offset="100%" stop-color="rgba(${t},0.6)"/>
            </linearGradient>
            <linearGradient id="nfKGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="rgba(${t},0.85)"/>
                <stop offset="50%" stop-color="rgba(${e},0.65)"/>
                <stop offset="100%" stop-color="rgba(${t},0.85)"/>
            </linearGradient>
        </defs>

        <!-- Outermost ambient rings + tick marks -->
        <g opacity="0.3">
            <circle cx="120" cy="120" r="126" stroke="rgba(${t},0.4)" stroke-width="0.3" stroke-dasharray="2,8"/>
            <circle cx="120" cy="120" r="124" stroke="rgba(${t},0.2)" stroke-width="0.2"/>
        </g>
        ${N}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${s}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${_}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${E}" fill="none" stroke="rgba(${e},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${w}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${i}" fill="none" stroke="rgba(${t},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${S}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${e},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${P}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${b}
        </g>
    </svg>`}function mt(){const t=document.createElement("div");t.id="netflow-engine-overlay",ne=document.createElement("canvas"),ne.id="nf-matrix-canvas",t.appendChild(ne);const e=document.createElement("div");e.className="nf-pat-plasma",t.appendChild(e);for(let $=1;$<=5;$++){const C=document.createElement("div");C.className=`nf-ambient-orb nf-orb-${$}`,t.appendChild(C)}const r=document.createElement("div");r.className="nf-pat-data",t.appendChild(r);const a=document.createElement("div");a.className="nf-pat-diag-a",t.appendChild(a);const o=document.createElement("div");o.className="nf-pat-diag-b",t.appendChild(o);const d=document.createElement("div");d.className="nf-pat-circuit",t.appendChild(d);const c=document.createElement("div");c.className="nf-pat-honeycomb",t.appendChild(c);const s=document.createElement("div");s.className="nf-pat-binary",t.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",t.appendChild(l);const p=document.createElement("div");p.className="nf-pat-diamond",t.appendChild(p);const E=document.createElement("div");E.className="nf-pat-wave-h",t.appendChild(E);const _=document.createElement("div");_.className="nf-pat-radar",t.appendChild(_);const N=document.createElement("div");N.className="nf-pat-ripple-1",t.appendChild(N);const M=document.createElement("div");M.className="nf-pat-ripple-2",t.appendChild(M);const h=document.createElement("div");h.className="nf-pat-techscan",t.appendChild(h);const i=document.createElement("div");i.className="nf-center-glow",t.appendChild(i);const w=document.createElement("div");w.className="nf-pat-noise",t.appendChild(w);const S=document.createElement("div");S.className="nf-crt-scanlines",t.appendChild(S);const T=document.createElement("div");T.className="nf-vignette",t.appendChild(T);for(let $=0;$<3;$++){const C=document.createElement("div");C.className="nf-pulse-ring",t.appendChild(C)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach($=>{const C=document.createElement("div");C.className=`nf-corner-deco ${$}`,t.appendChild(C)});const B=document.createElement("button");B.className="nf-close-btn",B.textContent="✕ ซ่อน",B.onclick=()=>_e(),t.appendChild(B);const k=document.createElement("div");k.className="nf-layout";const y=document.createElement("div");y.className="nf-core-monitor",y.id="nf-core-monitor";const b=document.createElement("div");b.className="nf-core-header",b.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,y.appendChild(b);const P=document.createElement("div");P.className="nf-terminal",P.id="nf-terminal",ze(P),y.appendChild(P);const g=document.createElement("div");g.className="nf-engine-core",g.id="nf-engine-core";const x=document.createElement("div");x.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach($=>{const C=document.createElement("div");C.className=`nf-frame-corner ${$}`,x.appendChild(C)}),g.appendChild(x);const R="http://www.w3.org/2000/svg",f=document.createElementNS(R,"svg");f.setAttribute("class","nf-engine-waves"),f.setAttribute("viewBox","0 0 560 140"),f.setAttribute("preserveAspectRatio","none"),f.id="nf-engine-waves";for(let $=0;$<4;$++){const C=document.createElementNS(R,"path");C.setAttribute("fill","none"),C.setAttribute("stroke-width",$<2?"1.5":"1"),C.setAttribute("stroke",$<2?`rgba(${W.rgb},${.14+$*.1})`:`rgba(${W.accentRgb},${.1+($-2)*.08})`),C.setAttribute("data-wave-idx",String($)),f.appendChild(C)}g.appendChild(f);const u=document.createElement("div");u.className="nf-engine-brand-inner",u.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${He(W.rgb,W.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${He(W.rgb,W.accentRgb)}
        </div>
    `,g.appendChild(u);const v=document.createElement("div");v.className="nf-engine-stats",v.id="nf-engine-stats",v.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([$,C,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${$}</span><span class="nf-stat-val" id="${C}">${O}</span></div>`).join(""),g.appendChild(v),y.appendChild(g),k.appendChild(y);const A=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];le.forEach(($,C)=>{const O=ht($);O.classList.add(A[C]),O.id=`nf-mod-${$.id}`,k.appendChild(O)}),t.appendChild(k);for(let $=0;$<30;$++){const C=document.createElement("div");C.className="nf-particle",C.style.left=`${5+Math.random()*90}%`,C.style.bottom=`${Math.random()*40}%`,C.style.animationDuration=`${3+Math.random()*5}s`,C.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,L=.7+Math.random()*.3;C.style.background=`rgba(${Math.floor(Z*L)}, ${Math.floor(Q*L)}, ${Math.floor(ee*L)}, ${O})`,C.style.width=`${1+Math.random()*2}px`,C.style.height=C.style.width,t.appendChild(C)}return t}function ht(t){const e=document.createElement("div");e.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${t.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${t.id}">0%</span>
    `,e.appendChild(r),t.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let c="";o.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${c}
        `,e.appendChild(d)});const a=document.createElement("div");return a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a),e}function bt(){Oe=Date.now(),$e=setInterval(()=>{const t=Math.floor((Date.now()-Oe)/1e3),e=String(Math.floor(t/60)).padStart(2,"0"),r=String(t%60).padStart(2,"0"),a=document.getElementById("nf-timer");a&&(a.textContent=`${e}:${r}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${e}:${r}`)},1e3)}function qe(){$e&&(clearInterval($e),$e=null)}const wt=120,Ve=160,Ye=.4;let de=null,We=0,Ue=0,Xe=0,be=[];function xt(t,e){be=[];for(let r=0;r<wt;r++){const a=Math.random();let o;a<.22?o=0:a<.4?o=1:a<.55?o=2:a<.68?o=3:a<.84?o=4:o=5;const d=Math.random()*t,c=Math.random()*e,s=50+Math.random()*220,l=Math.random()*Math.PI*2,p=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);be.push({x:o===0?Math.random()*t:d+Math.cos(l)*s,y:o===0?Math.random()*e:c+Math.sin(l)*s,vx:(Math.random()-.5)*Ye,vy:(Math.random()-.5)*Ye,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:d,oCy:c,oRadius:s,oAngle:l,oSpeed:p})}}function yt(){if(!ne)return;const t=ne;if(me=t.getContext("2d"),!me)return;const e=()=>{t.width=window.innerWidth,t.height=window.innerHeight,be.length===0&&xt(t.width,t.height)};e(),window.addEventListener("resize",e);let r=null,a=0,o=0;function d(){if(!me||!ne){he=null;return}he=requestAnimationFrame(d);const c=me,s=ne.width,l=ne.height;c.fillStyle=`rgba(${Z*.04|0},${Q*.04|0},${ee*.06|0},1)`,c.fillRect(0,0,s,l),(!r||a!==s||o!==l)&&(a=s,o=l,r=c.createRadialGradient(s*.5,l*.5,0,s*.5,l*.5,Math.max(s,l)*.6),r.addColorStop(0,`rgba(${Z*.08|0},${Q*.08|0},${ee*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),c.fillStyle=r,c.fillRect(0,0,s,l);const p=be,E=p.length,_=Ve*Ve;for(let h=0;h<E;h++){const i=p[h];if(i.pulsePhase+=i.pulseSpeed,i.motion===0)i.x+=i.vx,i.y+=i.vy,i.x<0?(i.x=0,i.vx=Math.abs(i.vx)*(.8+Math.random()*.4)):i.x>s&&(i.x=s,i.vx=-Math.abs(i.vx)*(.8+Math.random()*.4)),i.y<0?(i.y=0,i.vy=Math.abs(i.vy)*(.8+Math.random()*.4)):i.y>l&&(i.y=l,i.vy=-Math.abs(i.vy)*(.8+Math.random()*.4));else if(i.motion===1)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius,i.oCx+=Math.sin(i.oAngle*.3)*.15,i.oCy+=Math.cos(i.oAngle*.3)*.15;else if(i.motion===2)i.oAngle+=i.oSpeed,i.x=i.oCx+Math.cos(i.oAngle)*i.oRadius,i.y=i.oCy+Math.sin(i.oAngle)*i.oRadius*.5,i.oCx+=Math.sin(i.oAngle*.2)*.1,i.oCy+=Math.cos(i.oAngle*.2)*.1;else if(i.motion===3){i.oAngle+=i.oSpeed;const w=i.oAngle,S=i.oRadius*.7;i.x=i.oCx+S*Math.cos(w),i.y=i.oCy+S*Math.sin(w)*Math.cos(w),i.oCx+=Math.sin(w*.15)*.12,i.oCy+=Math.cos(w*.15)*.12}else if(i.motion===4){i.oAngle+=i.oSpeed*1.2;const w=i.oRadius*(.5+.5*Math.abs(Math.sin(i.oAngle*.15)));i.x=i.oCx+Math.cos(i.oAngle)*w,i.y=i.oCy+Math.sin(i.oAngle)*w,i.oCx+=Math.sin(i.oAngle*.1)*.18,i.oCy+=Math.cos(i.oAngle*.1)*.18}else i.oAngle+=i.oSpeed,i.x+=i.vx*.8,i.y=i.oCy+Math.sin(i.oAngle+i.x*.008)*i.oRadius*.35,i.x<-30?i.x=s+30:i.x>s+30&&(i.x=-30),i.oCy+=Math.sin(i.oAngle*.1)*.08;if(i.motion>0){const w=i.oRadius+50;i.oCx<-w?i.oCx=s+w:i.oCx>s+w&&(i.oCx=-w),i.oCy<-w?i.oCy=l+w:i.oCy>l+w&&(i.oCy=-w)}}c.beginPath(),c.strokeStyle=`rgba(${Z},${Q},${ee},0.06)`,c.lineWidth=.4;const N=new Path2D;for(let h=0;h<E;h++){const i=p[h];for(let w=h+1;w<E;w++){const S=p[w],T=i.x-S.x,B=i.y-S.y,k=T*T+B*B;k<_&&(1-k/_<.4?(c.moveTo(i.x,i.y),c.lineTo(S.x,S.y)):(N.moveTo(i.x,i.y),N.lineTo(S.x,S.y)))}}if(c.stroke(),c.strokeStyle=`rgba(${Z},${Q},${ee},0.18)`,c.lineWidth=.8,c.stroke(N),!de||We!==Z||Ue!==Q||Xe!==ee){de=document.createElement("canvas");const h=48;de.width=h,de.height=h;const i=de.getContext("2d"),w=i.createRadialGradient(h/2,h/2,0,h/2,h/2,h/2);w.addColorStop(0,`rgba(${Z},${Q},${ee},0.9)`),w.addColorStop(.3,`rgba(${Z},${Q},${ee},0.35)`),w.addColorStop(1,`rgba(${Z},${Q},${ee},0)`),i.fillStyle=w,i.fillRect(0,0,h,h),We=Z,Ue=Q,Xe=ee}const M=de;for(let h=0;h<E;h++){const i=p[h],w=.6+.4*Math.sin(i.pulsePhase),S=i.radius*5*(.8+w*.4);c.globalAlpha=.5+w*.4,c.drawImage(M,i.x-S/2,i.y-S/2,S,S)}c.globalAlpha=1,c.fillStyle="rgba(255,255,255,0.45)",c.beginPath();for(let h=0;h<E;h++){const i=p[h];if(i.radius>2){const w=.6+.4*Math.sin(i.pulsePhase),S=i.radius*(.8+w*.4)*.35;c.moveTo(i.x+S,i.y),c.arc(i.x,i.y,S,0,Math.PI*2)}}c.fill()}d()}function vt(){he!==null&&(cancelAnimationFrame(he),he=null),ne=null,me=null,be=[]}let we=null;const Ce=560,$t=140,je=Ce/2,Ke=$t/2,Je=[];for(let t=0;t<=Ce;t+=8){const e=Math.abs(t-je)/je;Je.push(Math.pow(Math.min(1,e*1.6),.6))}const Et=[0,1,2,3].map(t=>({amp:10+t*5,freq:(1.2+t*.35)*Math.PI*2/Ce,off:t*.6,spd:.7+t*.12}));function Ze(){if(ge=requestAnimationFrame(Ze),Ie+=.035,!we){const e=document.getElementById("nf-engine-waves");if(!e){ge=null;return}we=Array.from(e.querySelectorAll("path"))}const t=[];for(let e=0;e<we.length;e++){const r=Et[e],a=Ie*r.spd+r.off;t.length=0,t.push(`M 0 ${Ke}`);let o=0;for(let d=0;d<=Ce;d+=8){const c=Ke+r.amp*Je[o++]*Math.sin(d*r.freq+a);t.push(`L${d} ${c*10+.5|0}`)}we[e].setAttribute("d",t.join(" "))}}function kt(){Ie=0,Ze(),yt(),Ee=setInterval(()=>{const t=document.getElementById("nf-stat-freq"),e=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),a=document.getElementById("nf-stat-buf");t&&(t.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),e&&(e.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),a&&(a.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function Qe(){ge!==null&&(cancelAnimationFrame(ge),ge=null),Ee&&(clearInterval(Ee),Ee=null),we=null,vt()}function Se(){let t=0;const e=X.filter(s=>s.status!=="skipped").length;for(const s of X){const l=document.getElementById(`nf-proc-${s.stepId}`);if(!l)continue;l.className="nf-proc-row";const p=l.querySelector(".nf-proc-badge");switch(s.status){case"done":l.classList.add("nf-proc-done"),p&&(p.textContent="✅ done"),t++;break;case"active":l.classList.add("nf-proc-active"),p&&(p.textContent=s.progress!==void 0&&s.progress>0?`⏳ ${s.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),p&&(p.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),p&&(p.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),p&&(p.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${t}/${X.length}`);const a=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");t>=e&&e>0?(a&&(a.textContent="COMPLETE",a.style.color=W.doneHex),o&&(o.style.background=W.doneHex,o.style.boxShadow=`0 0 8px rgba(${W.doneRgb},0.7)`)):X.some(l=>l.status==="error")?(a&&(a.textContent="ERROR",a.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(l=>l.status==="active")&&a&&(a.textContent="ACTIVE",a.style.color=W.hex,a.style.textShadow=`0 0 10px rgba(${W.rgb},0.5)`);const d=document.getElementById("nf-terminal"),c=d==null?void 0:d.querySelector(".nf-proc-active");c&&d&&c.scrollIntoView({behavior:"smooth",block:"center"})}function et(){U&&U.isConnected||(Ge(),U=document.createElement("button"),U.id="nf-toggle-btn",U.className="nf-toggle-visible",U.innerHTML=se?"⚡":"✕",U.title="ซ่อน/แสดง Netflow Overlay",U.onclick=()=>_e(),document.body.appendChild(U))}function _e(){V&&(et(),se?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),U&&(U.innerHTML="✕"),se=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),U&&(U.innerHTML="⚡"),se=!0))}const tt={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function nt(){const t=document.getElementById("nf-core-monitor");if(!t)return;let e=ue;if(!e)try{e=localStorage.getItem("netflow_app_theme")||"red"}catch{e="red"}const r=tt[e]||tt.red;let a;try{a=chrome.runtime.getURL(r)}catch{a=`/${r}`}const o=W.rgb;t.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${a}')`].join(", "),t.style.backgroundSize="auto, auto, cover",t.style.backgroundPosition="center, center, center",t.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",t.style.setProperty("--nf-bg-set","1"),t.style.border=`1.5px solid rgba(${o},0.45)`,t.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function Ae(t=1){if(W=ft(),Ne(),V&&V.isConnected){se&&_e();return}if(V&&!V.isConnected&&(V=null),ae&&(ae.remove(),ae=null),Ge(),ke=t,X=Pe(t),t>1){const e=le.find(a=>a.id==="video");if(e){const a=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=t;o++)a.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),a.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),a.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});e.steps=a}const r=le.find(a=>a.id==="render");if(r){const a=r.steps.find(d=>d.id==="download");a&&(a.label="ดาวน์โหลด 720p");const o=r.steps.find(d=>d.id==="upscale");o&&(o.label="Full Video")}}V=mt(),document.body.appendChild(V),se=!1,et(),bt(),kt(),requestAnimationFrame(()=>nt())}function Ct(){qe(),Qe(),se=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),U&&(U.remove(),U=null)}const Mt={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function It(t,e,r){const a=X.filter(s=>s.status==="done").length,o=X.length,d=document.getElementById("nf-stat-step");d&&(d.textContent=`${a}/${o}`);const c=document.getElementById("nf-stat-scenes");if(c&&(c.textContent=ke>1?`1/${ke}`:"1/1"),e==="active"){const s=document.getElementById("nf-stat-status"),l=Mt[t]||t.toUpperCase();s&&(s.textContent=l)}else if(e==="done"&&a>=o){const s=document.getElementById("nf-stat-status");s&&(s.textContent="COMPLETE")}else if(e==="error"){const s=document.getElementById("nf-stat-status");s&&(s.textContent="ERROR")}if(r!==void 0&&r>0){const s=document.getElementById("nf-stat-progress");s&&(s.textContent=`${Math.min(100,r)}%`)}}function I(t,e,r){if(!V)return;for(const o of le)for(const d of o.steps)d.id===t&&(d.status=e,r!==void 0&&(d.progress=r));for(const o of X)o.stepId===t&&(o.status=e,r!==void 0&&(o.progress=r));const a=document.getElementById(`nf-step-${t}`);if(a&&(a.className="nf-step",e==="active"?a.classList.add("nf-step-active"):e==="done"?a.classList.add("nf-step-done"):e==="error"&&a.classList.add("nf-step-error")),It(t,e,r),r!==void 0){const o=document.getElementById(`nf-bar-${t}`);o&&(o.style.width=`${Math.min(100,r)}%`)}Te(),Se()}function pe(t){I(t,"skipped");const e=document.getElementById(`nf-step-${t}`);e&&(e.style.opacity="0.2")}function xe(t=4e3){qe(),Qe(),Te(),Se(),setTimeout(()=>Ct(),t)}function Te(){for(const t of le){const e=t.steps.filter(l=>l.status!=="skipped").length,r=t.steps.filter(l=>l.status==="done").length,a=t.steps.some(l=>l.status==="active"),o=e>0?Math.round(r/e*100):0,d=document.getElementById(`nf-pct-${t.id}`);d&&(d.textContent=`${o}%`);const c=document.getElementById(`nf-modbar-${t.id}`);c&&(c.style.width=`${o}%`);const s=document.getElementById(`nf-mod-${t.id}`);s&&(s.classList.remove("nf-active","nf-done"),o>=100?s.classList.add("nf-done"):a&&s.classList.add("nf-active"))}}function Pt(t){var a,o,d,c;ke=t;const e=new Map;for(const s of X)e.set(s.stepId,{status:s.status,progress:s.progress});X=Pe(t);for(const s of X){const l=e.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(gt(),t>1){const s=le.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((a=s.steps.find(p=>p.id==="animate"))==null?void 0:a.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=s.steps.find(p=>p.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((d=s.steps.find(p=>p.id==="vid-generate"))==null?void 0:d.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((c=s.steps.find(p=>p.id==="vid-wait"))==null?void 0:c.status)||"waiting",progress:0}];for(let p=2;p<=t;p++)l.push({id:`scene${p}-prompt`,label:`Scene ${p} Prompt`,status:"waiting"}),l.push({id:`scene${p}-gen`,label:`Scene ${p} Generate`,status:"waiting"}),l.push({id:`scene${p}-wait`,label:`Scene ${p} รอผล`,status:"waiting",progress:0});s.steps=l,ot(s)}}const r=le.find(s=>s.id==="render");if(r&&t>1){const s=r.steps.find(p=>p.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=r.steps.find(p=>p.id==="upscale");l&&(l.label="Full Video"),ot(r)}Te(),Se()}function ot(t){const e=document.getElementById(`nf-mod-${t.id}`);if(!e)return;e.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),t.steps.forEach(o=>{const d=document.createElement("div");d.className="nf-step",d.id=`nf-step-${o.id}`;let c="";o.progress!==void 0&&(c=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),d.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${c}
        `,e.appendChild(d)});const a=document.createElement("div");a.className="nf-mod-progress",a.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${t.id}"></div>`,e.appendChild(a)}function it(t){t.replace(/^\[Netflow AI\]\s*/,"")}const n=t=>{console.log(`[Netflow AI] ${t}`);try{it(t)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:t})}catch{}},F=t=>{console.warn(`[Netflow AI] ${t}`);try{it(`⚠️ ${t}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${t}`})}catch{}},Be=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Re=/Win/i.test(navigator.userAgent),fe=Be?"🍎 Mac":Re?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${fe}`),document.addEventListener("click",t=>{const e=t.target;if(!e)return;const r=e.tagName.toLowerCase(),a=Math.round(t.clientX),o=Math.round(t.clientY),d=(e.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${a},${o}) → <${r}> "${d}"`)},!0);const m=t=>new Promise(e=>setTimeout(e,t));function ce(){return!!window.__NETFLOW_STOP__}function at(){var r;const t=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],e=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const o=(a.textContent||"").trim().toLowerCase();if(!(o.length>200||o.length<5)){for(const d of t)if(o.includes(d))return((r=a.textContent)==null?void 0:r.trim())||d}}return null}async function te(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:a,button:0};t.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousedown",o)),await m(80),t.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseup",o)),t.dispatchEvent(new MouseEvent("click",o)),await m(50),t.click()}function St(t){const e=t.getBoundingClientRect(),r=e.left+e.width/2,a=e.top+e.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:a};t.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseenter",o)),t.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mouseover",o)),t.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),t.dispatchEvent(new MouseEvent("mousemove",o))}function _t(t){const e=[],r=document.querySelectorAll("i");for(const a of r){if((a.textContent||"").trim()!==t)continue;let d=a,c=null,s=1/0;for(let l=0;l<20&&d&&(d=d.parentElement,!(!d||d===document.body));l++){const p=d.getBoundingClientRect();if(p.width>100&&p.height>80&&p.width<window.innerWidth*.6&&p.top>=-10&&p.bottom<=window.innerHeight+10){const E=p.width*p.height;E<s&&(c=d,s=E)}}c&&!e.includes(c)&&e.push(c)}return e.sort((a,o)=>{const d=a.getBoundingClientRect(),c=o.getBoundingClientRect();return d.left-c.left}),e}function Fe(t=!1){const e=[],r=document.querySelectorAll("video");for(const c of r){let s=c.parentElement;for(let l=0;l<10&&s;l++){const p=s.getBoundingClientRect();if(p.width>120&&p.height>80&&p.width<window.innerWidth*.7&&p.top>=-50&&p.left<window.innerWidth*.75){e.push({el:s,left:p.left});break}s=s.parentElement}}const a=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const c of a){const s=(c.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=c.parentElement;for(let p=0;p<10&&l;p++){const E=l.getBoundingClientRect();if(E.width>120&&E.height>80&&E.width<window.innerWidth*.7&&E.top>=-50&&E.left<window.innerWidth*.75){e.push({el:l,left:E.left});break}l=l.parentElement}}}const o=document.querySelectorAll("img");for(const c of o){const s=(c.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=c.parentElement;for(let p=0;p<10&&l;p++){const E=l.getBoundingClientRect();if(E.width>120&&E.height>80&&E.width<window.innerWidth*.7&&E.top>=-50&&E.left<window.innerWidth*.75){e.push({el:l,left:E.left});break}l=l.parentElement}}}const d=Array.from(new Set(e.map(c=>c.el))).map(c=>e.find(s=>s.el===c));if(d.sort((c,s)=>c.left-s.left),d.length>0){const c=d[0].el,s=c.getBoundingClientRect();return t||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),c}return t||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function At(){const t=_t("image");if(t.length>0){const r=t[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${t.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),t[0]}const e=document.querySelectorAll("canvas");for(const r of e){let a=r.parentElement;for(let o=0;o<10&&a;o++){const d=a.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${d.left.toFixed(0)},${d.top.toFixed(0)})`),a;a=a.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Tt(t,e){var s;const[r,a]=t.split(","),o=((s=r.match(/:(.*?);/))==null?void 0:s[1])||"image/png",d=atob(a),c=new Uint8Array(d.length);for(let l=0;l<d.length;l++)c[l]=d.charCodeAt(l);return new File([c],e,{type:o})}function ye(t){var a;const e=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of r)if(((a=o.textContent)==null?void 0:a.trim())===t){const d=o.closest("button");d&&e.push(d)}return e}function Bt(){const t=[...ye("add"),...ye("add_2")];if(t.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const a=document.querySelectorAll("button");for(const o of a){const d=o.getBoundingClientRect();if(d.bottom>window.innerHeight*.7&&d.width<60&&d.height<60){const c=(o.textContent||"").trim();if(c==="+"||c==="add")return o}}return null}let e=null,r=0;for(const a of t){const o=a.getBoundingClientRect();o.y>r&&(r=o.y,e=a)}return e&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),e}function rt(){for(const a of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=ye(a);let d=null,c=0;for(const s of o){const l=s.getBoundingClientRect();l.y>c&&(c=l.y,d=s)}if(d)return n(`พบปุ่ม Generate จากไอคอน "${a}" ที่ y=${c.toFixed(0)}`),d}const t=document.querySelectorAll("button");let e=null,r=0;for(const a of t){const o=a.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const d=Math.abs(o.width-o.height)<10&&o.width<60,c=o.y+o.x+(d?1e3:0);c>r&&(r=c,e=a)}}if(e)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),e;for(const a of t){const o=(a.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return a}return null}function st(){const t=document.querySelectorAll("textarea");for(const a of t)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const e=document.querySelectorAll('[contenteditable="true"]');for(const a of e)if(a.getBoundingClientRect().bottom>window.innerHeight*.5)return a;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const a of r){const o=a.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return a}return t.length>0?t[t.length-1]:null}async function De(t,e){var r,a,o,d;t.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:c});t.dispatchEvent(l),await m(800);const p=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${p.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${p.length} ตัวอักษร)`)}catch(c){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{t.focus(),await m(100);const c=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:e});t.dispatchEvent(c);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:e});t.dispatchEvent(s),await m(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{t.focus(),await m(200);const c=new DataTransfer;c.setData("text/plain",e),c.setData("text/html",`<p>${e.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:c});t.dispatchEvent(s),await m(800);const l=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(c){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(e),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=e,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}t.focus(),await m(200),document.execCommand("paste"),await m(500);const c=(t.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(c.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${c.length} ตัวอักษร)`);return}}catch(c){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${c.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const c=Object.keys(t).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(c){let s=t[c];for(let l=0;l<30&&s;l++){const p=s.memoizedProps,E=s.memoizedState;if((a=p==null?void 0:p.editor)!=null&&a.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const _=p.editor;_.selection,_.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((d=(o=E==null?void 0:E.memoizedState)==null?void 0:o.editor)!=null&&d.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),E.memoizedState.editor.insertText(e),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(c){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${c.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Rt(){const t=[],e=document.querySelectorAll('input[type="file"]');for(const r of e)t.push({input:r,origType:"file"}),r.type="text";return t.length>0&&n(`ปิดกั้น file input ${t.length} ตัว (type → text)`),t}function Ft(){const t=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${fe})`);return}return t.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${fe})`),()=>{HTMLInputElement.prototype.click=t,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Dt(t,e,r){var p;const a=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...t.map(E=>E.input)];for(const E of a)!o.includes(E)&&E.offsetParent===null&&o.push(E);for(const E of o)E.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const d=document.querySelectorAll('input[type="file"]');if(d.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${fe})`),!1;let c;if(r&&r.size>0){const E=Array.from(d).filter(_=>!r.has(_));E.length>0?(c=E[E.length-1],n(`เล็งเป้า file input ใหม่ (${E.length} ใหม่, ${d.length} ทั้งหมด)`)):(c=d[d.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${d.length} ตัว`))}else c=d[d.length-1];const s=new DataTransfer;s.items.add(e);try{c.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((p=c.files)==null?void 0:p.length)??0} ไฟล์)`)}catch(E){n(`กำหนด target.files ล้มเหลว: ${E.message} — ลอง defineProperty`);try{Object.defineProperty(c,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(_){return F(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${_.message}`),!1}}const l=c._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),c.dispatchEvent(new Event("change",{bubbles:!0})),c.dispatchEvent(new Event("input",{bubbles:!0}));try{const E=new DataTransfer;E.items.add(e);const _=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:E});c.dispatchEvent(_),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${e.name} (${(e.size/1024).toFixed(1)} KB) → <input> ${fe}`),!0}function ve(){let t=0;const e=document.querySelectorAll("img");for(const a of e){if(a.closest("#netflow-engine-overlay"))continue;const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.src&&a.offsetParent!==null&&t++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const a of r){if(a.closest("#netflow-engine-overlay"))continue;const o=a.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&a.offsetParent!==null&&t++}return t}async function lt(t,e){var E;n(`── กำลังอัพโหลด ${e} ไปยัง Prompt Bar ──`);const r=Tt(t,e);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const a=ve();n(`รูปย่อปัจจุบันใน Prompt Bar: ${a} รูป`);const o=async(_,N=8e3)=>{const M=Date.now();for(;Date.now()-M<N;){const h=ve();if(h>a)return n(`✅ [${_}] ยืนยัน: รูปย่อเพิ่มจาก ${a} → ${h}`),!0;await m(500)}return n(`⚠️ [${_}] รูปย่อไม่เพิ่ม (ยังคง ${ve()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const d=Bt();if(!d)return F("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const c=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${c.size} ตัว`);const s=Ft();let l=Rt();const p=new MutationObserver(_=>{for(const N of _)for(const M of N.addedNodes)if(M instanceof HTMLInputElement&&M.type==="file"&&(M.type="text",l.push({input:M,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),M instanceof HTMLElement){const h=M.querySelectorAll('input[type="file"]');for(const i of h)i.type="text",l.push({input:i,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});p.observe(document.body,{childList:!0,subtree:!0});try{d.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let _=!1;const N=Date.now();for(;!_&&Date.now()-N<5e3;){const h=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const i of h){if(i===d)continue;const w=i.querySelectorAll("i");for(const S of w){const T=((E=S.textContent)==null?void 0:E.trim())||"";if((T==="upload"||T==="upload_file")&&!Array.from(i.querySelectorAll("i")).map(k=>{var y;return(y=k.textContent)==null?void 0:y.trim()}).includes("drive_folder_upload")){i.click(),_=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${T}) ✅`);break}}if(_)break}if(!_)for(const i of h){if(i===d)continue;const w=i.childNodes.length<=5?(i.textContent||"").trim():"";if(w.length>0&&w.length<40){const S=w.toLowerCase();if(S==="upload"||S==="อัปโหลด"||S==="อัพโหลด"||S.includes("upload image")||S.includes("upload photo")||S.includes("อัปโหลดรูปภาพ")||S.includes("อัพโหลดรูปภาพ")||S.includes("from computer")||S.includes("จากคอมพิวเตอร์")){i.click(),_=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${w}") ✅`);break}}}_||await m(500)}return _?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Dt(l,r,c)?(n(`ฉีดไฟล์ ${e} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(F(`ฉีดไฟล์ ${e} ล้มเหลว`),!1)):(F("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{p.disconnect(),s();for(const _ of l)_.input.type!=="file"&&(_.input.type="file")}}async function Lt(t,e){n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button");let a=null;for(const M of r){const h=M.textContent||"";if((h.includes("Nano Banana")||h.includes("Imagen")||h.includes("วิดีโอ")||h.includes("รูปภาพ")||h.includes("Image")||h.includes("Video"))&&M.getBoundingClientRect().bottom>window.innerHeight*.7){a=M,n(`พบปุ่มตั้งค่าจากข้อความ: "${h.substring(0,30).trim()}"`);break}}if(!a)for(const M of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const h=ye(M);for(const i of h)if(i.getBoundingClientRect().bottom>window.innerHeight*.7){a=i,n(`พบปุ่มตั้งค่าจากไอคอน: ${M}`);break}if(a)break}if(!a)return F("ไม่พบปุ่มตั้งค่า"),!1;const o=a.getBoundingClientRect(),d=o.left+o.width/2,c=o.top+o.height/2,s={bubbles:!0,cancelable:!0,clientX:d,clientY:c,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let l=!1,p=null;const E=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const M of E){const h=M.getAttribute("aria-controls")||"",i=M.id||"";if(h.toUpperCase().includes("IMAGE")||i.toUpperCase().includes("IMAGE")){p=M,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${h})`);break}}if(!p)for(const M of document.querySelectorAll('[role="tab"]')){const h=M.id||"";if(h.toUpperCase().includes("TRIGGER-IMAGE")){p=M,n(`พบแท็บ Image ผ่าน id: ${h}`);break}}if(!p)for(const M of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const h=(M.textContent||"").trim();if((h==="Image"||h.endsWith("Image")||h==="รูปภาพ"||h==="ภาพ")&&!h.includes("Video")&&!h.includes("วิดีโอ")){p=M,n(`พบแท็บ Image ผ่านข้อความ: "${h}"`);break}}if(p){const M=p.getAttribute("data-state")||"",h=p.getAttribute("aria-selected")||"";if(M==="active"||h==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const i=p.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:i.left+i.width/2,clientY:i.top+i.height/2,button:0};p.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mousedown",w)),await m(80),p.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),p.dispatchEvent(new MouseEvent("mouseup",w)),p.dispatchEvent(new MouseEvent("click",w)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const _=t==="horizontal"?"แนวนอน":"แนวตั้ง";for(const M of document.querySelectorAll("button, [role='tab'], [role='option']")){const h=(M.textContent||"").trim();if(h===_||h.toLowerCase()===(t==="horizontal"?"landscape":"portrait")){const i=M.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:i.left+i.width/2,clientY:i.top+i.height/2,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",w)),await m(80),M.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",w)),M.dispatchEvent(new MouseEvent("click",w)),n(`เลือกทิศทาง: ${_}`),await m(400);break}}const N=`x${e}`;for(const M of document.querySelectorAll("button, [role='tab'], [role='option']"))if((M.textContent||"").trim()===N){const i=M.getBoundingClientRect(),w={bubbles:!0,cancelable:!0,clientX:i.left+i.width/2,clientY:i.top+i.height/2,button:0};M.dispatchEvent(new PointerEvent("pointerdown",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mousedown",w)),await m(80),M.dispatchEvent(new PointerEvent("pointerup",{...w,pointerId:1,isPrimary:!0,pointerType:"mouse"})),M.dispatchEvent(new MouseEvent("mouseup",w)),M.dispatchEvent(new MouseEvent("click",w)),n(`เลือกจำนวน: ${N}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),a.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",s)),a.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function Nt(t){var T,B,k,y;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const e=navigator.userAgent,r=e.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),a=r?r[1]:"unknown",o=Be?"macOS":Re?"Windows":/Linux/i.test(e)?"Linux":/CrOS/i.test(e)?"ChromeOS":"Unknown",d=Be?((B=(T=e.match(/Mac OS X ([0-9_]+)/))==null?void 0:T[1])==null?void 0:B.replace(/_/g,"."))||"":Re&&((k=e.match(/Windows NT ([0-9.]+)/))==null?void 0:k[1])||"",c=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${d} | Chrome ${a}`),n(`🌐 ภาษา: ${c} | หน้าจอ: ${s} | แพลตฟอร์ม: ${fe}`),n("══════════════════════════════════════════");try{Me(t.theme)}catch{}try{Ae()}catch(b){console.warn("Overlay show error:",b)}const l=[],p=[];try{I("settings","active");const b=t.orientation||"horizontal",P=t.outputCount||1,g=await Lt(b,P);l.push(g?"✅ Settings":"⚠️ Settings"),I("settings",g?"done":"error")}catch(b){F(`ตั้งค่าผิดพลาด: ${b.message}`),l.push("⚠️ Settings"),I("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const E=()=>{const b=document.querySelectorAll("span, div, p, label");for(const P of b){const g=(P.textContent||"").trim();if(/^\d{1,3}%$/.test(g)){if(g==="100%")return null;const x=P.getBoundingClientRect();if(x.width>0&&x.height>0&&x.top>0&&x.top<window.innerHeight)return g}}return null},_=async b=>{n(`รอการอัพโหลด ${b} เสร็จ...`),await m(2e3);const P=Date.now(),g=6e4;let x="",R=Date.now();const f=15e3;for(;Date.now()-P<g;){const u=E();if(u){if(u!==x)x=u,R=Date.now();else if(Date.now()-R>f){n(`✅ อัพโหลด ${b} — % ค้างที่ ${u} นาน ${f/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${u} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${b} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}F(`⚠️ อัพโหลด ${b} หมดเวลาหลัง ${g/1e3} วินาที — ดำเนินการต่อ`)};if(t.characterImage){I("upload-char","active");try{const b=await lt(t.characterImage,"character.png");l.push(b?"✅ ตัวละคร":"⚠️ ตัวละคร"),b||p.push("character upload failed"),I("upload-char",b?"done":"error")}catch(b){F(`อัพโหลดตัวละครผิดพลาด: ${b.message}`),l.push("❌ ตัวละคร"),p.push("character upload error"),I("upload-char","error")}await _("character")}else pe("upload-char");if(t.productImage){I("upload-prod","active");try{const b=await lt(t.productImage,"product.png");l.push(b?"✅ สินค้า":"⚠️ สินค้า"),b||p.push("product upload failed"),I("upload-prod",b?"done":"error")}catch(b){F(`อัพโหลดสินค้าผิดพลาด: ${b.message}`),l.push("❌ สินค้า"),p.push("product upload error"),I("upload-prod","error")}await _("product")}else pe("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const N=E();N&&(n(`⚠️ อัพโหลดยังแสดง ${N} — รอเพิ่มเติม...`),await _("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const M=(t.characterImage?1:0)+(t.productImage?1:0);if(M>0){let b=ve();b<M&&(n(`⏳ เห็นรูปย่อแค่ ${b}/${M} — รอ 3 วินาที...`),await m(3e3),b=ve()),b>=M?n(`✅ ยืนยันรูปย่ออ้างอิง: ${b}/${M}`):F(`⚠️ คาดว่าจะมี ${M} รูปย่อ แต่พบ ${b} — ดำเนินการต่อ`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),p.push("stopped by user");try{xe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),I("img-prompt","active"),await m(1e3);const h=st();h?(await De(h,t.imagePrompt),n(`วาง Prompt แล้ว (${t.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),I("img-prompt","done")):(F("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),p.push("prompt input not found"),I("img-prompt","error")),await m(800);const i=new Set;document.querySelectorAll("img").forEach(b=>{b.src&&i.add(b.src)}),n(`บันทึกรูปเดิม: ${i.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),I("img-generate","active"),await m(500);const w=rt();if(w){const b=w.getBoundingClientRect(),P=b.left+b.width/2,g=b.top+b.height/2,x={bubbles:!0,cancelable:!0,clientX:P,clientY:g,button:0};w.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",x)),await m(80),w.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",x)),w.dispatchEvent(new MouseEvent("click",x)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await m(500),w.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mousedown",x)),await m(80),w.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),w.dispatchEvent(new MouseEvent("mouseup",x)),w.dispatchEvent(new MouseEvent("click",x)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),I("img-generate","done")}else F("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),p.push("generate button not found"),I("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),I("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const b=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const u of f){if(u.closest("#netflow-engine-overlay"))continue;const v=(u.textContent||"").trim();if(v.length>10)continue;const A=v.match(/(\d{1,3})\s*%/);if(!A)continue;const $=parseInt(A[1],10);if($<1||$>100)continue;const C=u.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return $}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let P=null,g=-1,x=0;const R=Date.now();for(;!P&&Date.now()-R<18e4;){const f=document.querySelectorAll("img");for(const u of f){if(i.has(u.src)||!(u.alt||"").toLowerCase().includes("generated"))continue;const A=u.getBoundingClientRect();if(A.width>120&&A.height>120&&A.top>0&&A.top<window.innerHeight*.85){const $=u.closest("div");if($){P=$,n(`พบรูป AI จาก alt="${u.alt}": ${u.src.substring(0,80)}...`);break}}}if(!P)for(const u of f){if(i.has(u.src))continue;const v=u.closest("div"),A=(v==null?void 0:v.textContent)||"";if(A.includes("product.png")||A.includes("character.png")||A.includes(".png")||A.includes(".jpg"))continue;const $=u.getBoundingClientRect();if($.width>120&&$.height>120&&$.top>0&&$.top<window.innerHeight*.85){const C=u.closest("div");if(C){P=C,n(`พบรูปใหม่ (สำรอง): ${u.src.substring(0,80)}...`);break}}}if(!P){if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const u=at();if(u){F(`❌ สร้างรูปล้มเหลว: ${u}`),p.push(`image gen failed: ${u}`),I("img-wait","error");break}const v=b();v!==null?(v!==g&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${v}%`),g=v,I("img-wait","active",v)),x=Date.now()):g>30&&Math.floor((Date.now()-x)/1e3)>=3&&n(`🖼️ % หายที่ ${g}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!P)F("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),I("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),I("img-wait","done",100);const f=P.getBoundingClientRect(),u=f.left+f.width/2,v=f.top+f.height/2,A={bubbles:!0,cancelable:!0,clientX:u,clientY:v};P.dispatchEvent(new PointerEvent("pointerenter",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseenter",A)),P.dispatchEvent(new PointerEvent("pointerover",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mouseover",A)),P.dispatchEvent(new PointerEvent("pointermove",{...A,pointerId:1,isPrimary:!0,pointerType:"mouse"})),P.dispatchEvent(new MouseEvent("mousemove",A)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let $=null;for(const C of["more_vert","more_horiz","more"]){const O=ye(C);for(const L of O){const H=L.getBoundingClientRect();if(H.top>=f.top-20&&H.top<=f.bottom&&H.right>=f.right-150&&H.right<=f.right+20){$=L;break}}if($)break}if(!$){const C=document.querySelectorAll("button");for(const O of C){const L=O.getBoundingClientRect();if(L.width<50&&L.height<50&&L.top>=f.top-10&&L.top<=f.top+60&&L.left>=f.right-80){const H=O.querySelectorAll("i");for(const K of H)if((((y=K.textContent)==null?void 0:y.trim())||"").includes("more")){$=O;break}if($)break;const q=O.getAttribute("aria-label")||"";if(q.includes("เพิ่มเติม")||q.includes("more")){$=O;break}}}}if(!$)F("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const C=$.getBoundingClientRect(),O=C.left+C.width/2,L=C.top+C.height/2,H={bubbles:!0,cancelable:!0,clientX:O,clientY:L,button:0};$.dispatchEvent(new PointerEvent("pointerdown",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mousedown",H)),await m(80),$.dispatchEvent(new PointerEvent("pointerup",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),$.dispatchEvent(new MouseEvent("mouseup",H)),$.dispatchEvent(new MouseEvent("click",H)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let q=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const Y of K){const J=(Y.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){q=Y;break}}if(!q)F("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const Y=q.getBoundingClientRect(),J=Y.left+Y.width/2,G=Y.top+Y.height/2,D={bubbles:!0,cancelable:!0,clientX:J,clientY:G,button:0};q.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),q.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mouseup",D)),q.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),I("animate","done"),await m(3e3)}}}}catch(b){F(`ขั้น 4 ผิดพลาด: ${b.message}`),l.push("⚠️ Animate")}if(ce()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),p.push("stopped by user");try{xe(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(t.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),I("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let b=!1;const P=document.querySelectorAll("button, span, div");for(const R of P){const f=(R.textContent||"").trim(),u=R.getBoundingClientRect();if((f==="วิดีโอ"||f==="Video"||f.includes("วิดีโอ"))&&u.bottom>window.innerHeight*.7){b=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}b||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const g=st();g?(await De(g,t.videoPrompt),n(`วาง Video Prompt แล้ว (${t.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),I("vid-prompt","done")):(F("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),p.push("video prompt input not found"),I("vid-prompt","error")),await m(1e3),I("vid-generate","active");const x=rt();if(x){const R=x.getBoundingClientRect(),f=R.left+R.width/2,u=R.top+R.height/2,v={bubbles:!0,cancelable:!0,clientX:f,clientY:u,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),x.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",v)),x.dispatchEvent(new MouseEvent("click",v)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),I("vid-generate","done"),await m(500),x.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),x.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",v)),x.dispatchEvent(new MouseEvent("click",v)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else F("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),p.push("video generate button not found"),I("vid-generate","error")}catch(b){F(`ขั้น 5 ผิดพลาด: ${b.message}`),l.push("⚠️ Video Gen"),p.push(`video gen error: ${b.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pe("animate"),pe("vid-prompt"),pe("vid-generate"),pe("vid-wait");if(t.videoPrompt){I("vid-wait","active");const b=t.sceneCount||1,P=t.videoScenePrompts||[t.videoPrompt];if(b>1)try{Pt(b)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${b>1?`ต่อ ${b} ฉาก`:"ดาวน์โหลด"} ===`);const g=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const u of f){if(u.closest("#netflow-engine-overlay"))continue;const v=(u.textContent||"").trim();if(v.length>10)continue;const A=v.match(/(\d{1,3})\s*%/);if(!A)continue;const $=parseInt(A[1],10);if($<1||$>100)continue;const C=u.getBoundingClientRect();if(!(C.width===0||C.width>150)&&!(C.top<0||C.top>window.innerHeight))return $}return null},x=async(f=6e5)=>{n("รอการสร้างวิดีโอ..."),I("vid-wait","active"),await m(5e3);const u=()=>{const D=document.querySelectorAll("div, span, p, label, strong, small");let z=0;for(const j of D){if(j.closest("#netflow-engine-overlay"))continue;const oe=(j.textContent||"").trim();if(oe.includes("%")&&oe.length<15){const re=j.tagName.toLowerCase(),pt=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Le=j.getBoundingClientRect();if(n(`  🔍 "${oe}" ใน <${re}.${pt}> ที่ (${Le.left.toFixed(0)},${Le.top.toFixed(0)}) w=${Le.width.toFixed(0)}`),z++,z>=5)break}}z===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},v=Fe();n(v?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),u();const A=Date.now();let $=-1,C=0,O=!1;for(;Date.now()-A<f;){const D=g();if(D!==null){if(D!==$&&(n(`ความคืบหน้าวิดีโอ: ${D}%`),$=D,I("vid-wait","active",D)),C=Date.now(),D>=100){n("✅ ตรวจพบ 100%!"),O=!0;break}}else if($>30){const z=Math.floor((Date.now()-C)/1e3);if(z>=5){n(`✅ % หายไปที่ ${$}% (หาย ${z} วินาที) — วิดีโอเสร็จ!`),O=!0;break}n(`⏳ % หายที่ ${$}% — ยืนยันใน ${5-z} วินาที...`)}else{const z=Math.floor((Date.now()-A)/1e3);z%15<3&&n(`⏳ รอ... (${z} วินาที) ไม่พบ %`)}if(!O&&$>0&&Fe(!0)&&!v){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${$}% — วิดีโอเสร็จ!`),O=!0;break}if(ce())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if($<1){const z=at();if(z)return F(`❌ สร้างวิดีโอล้มเหลว: ${z}`),null}await m(3e3)}const L=Fe();if(!L)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),I("vid-wait","error"),null;const H=L;O?(I("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const q=H.getBoundingClientRect();let K=q.left+q.width/2,Y=q.top+q.height/2,J=H;const G=H.querySelector("video, img, canvas");if(G){const D=G.getBoundingClientRect();D.width>50&&D.height>50&&(K=D.left+D.width/2,Y=D.top+D.height/2,J=G,n(`🎯 พบรูปย่อ <${G.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${Y.toFixed(0)}) ${D.width.toFixed(0)}x${D.height.toFixed(0)}`))}else Y=q.top+q.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${Y.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${Y.toFixed(0)})...`),St(J);for(let D=0;D<8;D++){const z={bubbles:!0,cancelable:!0,clientX:K+D%2,clientY:Y};J.dispatchEvent(new PointerEvent("pointermove",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",z)),await m(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:b,scenePrompts:P,theme:t.theme}}),n(`💾 บันทึก pending action: mute_video (${b} ฉาก, ${P.length} prompts, theme: ${t.theme})`)}catch(D){n(`⚠️ ไม่สามารถบันทึก pending action: ${D.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await R(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},R=async f=>{const u=f.getBoundingClientRect(),v=u.left+u.width/2,A=u.top+u.height/2,$={bubbles:!0,cancelable:!0,clientX:v,clientY:A,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",$)),await m(80),f.dispatchEvent(new PointerEvent("pointerup",{...$,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",$)),f.dispatchEvent(new MouseEvent("click",$)),await m(50),f.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await x())F("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),I("vid-wait","error");else{l.push("✅ Video Complete"),I("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const u=await new Promise(v=>{chrome.storage.local.get("netflow_pending_action",A=>{if(chrome.runtime.lastError){v(null);return}v((A==null?void 0:A.netflow_pending_action)||null)})});u&&!u._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),u.action==="mute_video"?await ct(u.sceneCount||1,u.scenePrompts||[],u.theme):u.action==="wait_scene_gen_and_download"&&await dt(u.sceneCount||2,u.currentScene||2,u.theme))}}catch(f){F(`ขั้น 6 ผิดพลาด: ${f.message}`),l.push("⚠️ Step6"),p.push(`step 6: ${f.message}`)}}const S=p.length===0;try{xe(S?5e3:8e3)}catch(b){console.warn("Overlay complete error:",b)}return{success:S,message:S?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${p.join(", ")}`,step:S?"done":"partial"}}async function ct(t,e=[],r){var S;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Me(r)}catch{}try{Ae(t)}catch(T){n(`⚠️ showOverlay error: ${T.message}`)}try{const T=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const B of T)I(B,"done");t>=2&&I("scene2-prompt","active"),n(`✅ overlay restored: ${T.length} steps done, sceneCount=${t}`)}catch(T){n(`⚠️ overlay restore error: ${T.message}`)}await m(1500);const a=(()=>{for(const T of document.querySelectorAll("button")){const B=T.querySelectorAll("i");for(const y of B){const b=(y.textContent||"").trim();if(b==="volume_up"||b==="volume_off"||b==="volume_mute"){const P=T.getBoundingClientRect();if(P.width>0&&P.height>0)return T}}const k=(T.getAttribute("aria-label")||"").toLowerCase();if(k.includes("mute")||k.includes("ปิดเสียง")){const y=T.getBoundingClientRect();if(y.width>0&&y.height>0)return T}}return null})();if(a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),t>=2){n(`═══ ${t} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let f=2;f<=t;f++){const u=e[f-1];if(!u){F(`ไม่พบ prompt สำหรับฉากที่ ${f}`);continue}n(`── ฉากที่ ${f}/${t}: วาง prompt + generate ──`);let v=null;const A=Date.now();for(;!v&&Date.now()-A<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(v=G[G.length-1]),!v){const D=document.querySelectorAll("[role='textbox'][contenteditable='true']");D.length>0&&(v=D[D.length-1])}v||await m(1e3)}if(!v){F("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${v.tagName.toLowerCase()}> ${v.className.substring(0,40)}`),await De(v,u),n(`วาง prompt ฉาก ${f} (${u.length} ตัวอักษร) ✅`);try{I(`scene${f}-prompt`,"done"),I(`scene${f}-gen`,"active")}catch{}await m(1e3);const $=v.getBoundingClientRect();let C=null,O=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const D=G.querySelectorAll("i");let z=!1;for(const re of D)if((re.textContent||"").trim()==="arrow_forward"){z=!0;break}if(!z)continue;const j=G.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const oe=Math.abs(j.top-$.top)+Math.abs(j.right-$.right);oe<O&&(O=oe,C=G)}if(!C)for(const G of document.querySelectorAll("button")){const D=G.querySelectorAll("i");for(const z of D)if((z.textContent||"").trim()==="arrow_forward"){const j=G.getBoundingClientRect();if(j.width>0&&j.height>0){C=G;break}}if(C)break}if(!C){F("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:t,currentScene:f}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${f}/${t})`),await te(C),n(`คลิก Generate ฉาก ${f} ✅`);try{I(`scene${f}-gen`,"done"),I(`scene${f}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${f} gen เสร็จ ──`),await m(5e3);let L=0,H=0;const q=Date.now(),K=6e5,Y=5e3;let J=!1;for(;Date.now()-q<K;){let G=null;const D=document.querySelectorAll("div, span, p, label, strong, small");for(const z of D){if(z.closest("#netflow-engine-overlay"))continue;const oe=(z.textContent||"").trim().match(/^(\d{1,3})%$/);if(oe){const re=z.getBoundingClientRect();if(re.width>0&&re.height>0&&re.width<120&&re.height<60){G=parseInt(oe[1],10);break}}}if(G!==null){if(G!==L){n(`🎬 ฉาก ${f} ความคืบหน้า: ${G}%`),L=G;try{I(`scene${f}-wait`,"active",G)}catch{}}H=0}else if(L>0){if(H===0)H=Date.now(),n(`🔍 ฉาก ${f}: % หายไป (จาก ${L}%) — กำลังยืนยัน...`);else if(Date.now()-H>=Y){n(`✅ ฉาก ${f}: % หายไป ${Y/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}J||F(`ฉาก ${f} หมดเวลา`),n(`✅ ฉาก ${f} เสร็จแล้ว`);try{I(`scene${f}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{I("download","active")}catch{}await m(2e3);const T=Date.now();let B=null;const k=Date.now();for(;!B&&Date.now()-k<1e4;){for(const f of document.querySelectorAll("button")){const u=f.querySelector("i");if(u&&(u.textContent||"").trim()==="download"){const v=f.getBoundingClientRect();if(v.width>0&&v.height>0){B=f;break}}}B||await m(1e3)}if(!B){F("ไม่พบปุ่มดาวน์โหลด");return}await te(B),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await m(1500);let y=null;for(let f=0;f<3&&!y;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let u=null;const v=Date.now();for(;!u&&Date.now()-v<5e3;){for(const L of document.querySelectorAll("[role='menuitem']"))if((L.textContent||"").trim().includes("Full Video")&&L.querySelector("i")){const q=L.getBoundingClientRect();if(q.width>0&&q.height>0){u=L;break}}u||await m(500)}if(!u){F("ไม่พบ Full Video");continue}const A=u.getBoundingClientRect(),$=A.left+A.width/2,C=A.top+A.height/2;u.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:$,clientY:C})),u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:$,clientY:C})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:$,clientY:C})),await te(u),n("คลิก/hover Full Video ✅"),await m(2e3);const O=Date.now();for(;!y&&Date.now()-O<8e3;){for(const L of document.querySelectorAll("button[role='menuitem']")){const H=L.querySelectorAll("span");for(const q of H)if((q.textContent||"").trim()==="720p"){const K=L.getBoundingClientRect();if(K.width>0&&K.height>0){y=L;break}}if(y)break}y||(u.isConnected&&(u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:$,clientY:C})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:$+20,clientY:C}))),await m(500))}}if(!y){F("ไม่พบ 720p");return}await te(y),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const b=Date.now();let P=!1,g=!1;for(;Date.now()-b<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const u=(f.textContent||"").trim();if(u==="Download complete!"||u==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),P=!0;break}(u.includes("Downloading your extended video")||u.includes("กำลังดาวน์โหลด"))&&(g||(g=!0,n("⏳ กำลังดาวน์โหลด...")))}if(P)break;if(g){let f=!1;for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((u.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),P=!0;break}}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await m(2e3)}if(!P){F("ดาวน์โหลดหมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let x=!1;const R=Date.now();for(;Date.now()-R<6e4&&!x;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:T},u=>{chrome.runtime.lastError?F(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):u!=null&&u.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${u.message}`),x=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${u==null?void 0:u.message}`),f()})})}catch(f){F(`ตรวจสอบผิดพลาด: ${f.message}`)}x||await m(3e3)}x||F("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{I("open","done"),xe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const o=(T,B="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const k of document.querySelectorAll(B)){const y=(k.textContent||"").trim();if(y.includes(T)&&y.length<100){const b=k.getBoundingClientRect();if(b.width>0&&b.height>0&&b.top>=0)return k}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let d=null;const c=Date.now();for(;!d&&Date.now()-c<1e4;){for(const T of document.querySelectorAll("button, [role='button']")){const B=(T.textContent||"").trim(),k=B.toLowerCase();if((k.includes("download")||k.includes("ดาวน์โหลด"))&&B.length<80){const y=T.getBoundingClientRect();if(y.width>0&&y.height>0){d=T;break}}}if(!d)for(const T of document.querySelectorAll("button")){const B=(T.getAttribute("aria-label")||"").toLowerCase();if(B.includes("download")||B.includes("ดาวน์")){const k=T.getBoundingClientRect();if(k.width>0&&k.height>0){d=T;break}}}d||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!d){F("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(d.textContent||"").trim().substring(0,40)}"`),await te(d),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const s=Date.now();let l=null;const p=Date.now();for(;!l&&Date.now()-p<5e3;)l=o("1080p"),l||(n("รอ 1080p..."),await m(500));if(!l){F("ไม่พบ 1080p");return}await te(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const E=Date.now();let _=!1,N=!1,M=0;const h=3e3;for(;Date.now()-E<3e5;){const B=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),_=!0;break}for(const y of document.querySelectorAll("div, span, p")){const b=(y.textContent||"").trim().toLowerCase();if(b.length<60&&(b.includes("upscaling complete")||b.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(S=y.textContent)==null?void 0:S.trim()}")`),_=!0;break}}if(_)break;if(B.includes("upscaling your video")||B.includes("กำลังอัปสเกล")){N=!0,M=0;const y=Math.floor((Date.now()-E)/1e3);n(`⏳ กำลังอัปสเกล... (${y} วินาที)`)}else if(N){if(M===0)M=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-M>=h){n(`✅ ข้อความ Upscaling หายไป ${h/1e3} วินาที — เสร็จ!`),_=!0;break}}else{const y=Math.floor((Date.now()-E)/1e3);y%10<3&&n(`⏳ รอ Upscale... (${y} วินาที)`)}if(ce()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!_){F("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let i=!1;const w=Date.now();for(;Date.now()-w<6e4&&!i;){try{await new Promise(T=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},B=>{chrome.runtime.lastError?F(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):B!=null&&B.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${B.message}`),i=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${B==null?void 0:B.message}`),T()})})}catch(T){F(`ตรวจสอบผิดพลาด: ${T.message}`)}i||await m(3e3)}i||F("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function dt(t=2,e=2,r){n(`═══ Pending: รอ scene ${e}/${t} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Me(r)}catch{}try{Ae(t)}catch(k){n(`⚠️ showOverlay error: ${k.message}`)}try{const k=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let y=2;y<=e;y++)k.push(`scene${y}-prompt`,`scene${y}-gen`),y<e&&k.push(`scene${y}-wait`);for(const y of k)I(y,"done");I(`scene${e}-wait`,"active"),n(`✅ overlay restored: ${k.length} steps done (scene ${e}/${t} navigate)`)}catch(k){n(`⚠️ overlay restore error: ${k.message}`)}await m(2e3);const a=(()=>{for(const k of document.querySelectorAll("button")){const y=k.querySelectorAll("i");for(const b of y){const P=(b.textContent||"").trim();if(P==="volume_up"||P==="volume_off"||P==="volume_mute"){const g=k.getBoundingClientRect();if(g.width>0&&g.height>0)return k}}}return null})();a?(a.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${e} gen เสร็จ (หลัง page navigate) ──`);let o=0,d=0;const c=Date.now(),s=6e5,l=5e3;let p=!1,E=0;for(;Date.now()-c<s;){let k=null;const y=document.querySelectorAll("div, span, p, label, strong, small");for(const b of y){if(b.closest("#netflow-engine-overlay"))continue;const g=(b.textContent||"").trim().match(/^(\d{1,3})%$/);if(g){const x=b.getBoundingClientRect();if(x.width>0&&x.height>0&&x.width<120&&x.height<60){k=parseInt(g[1],10);break}}}if(k!==null){if(E=0,k!==o){n(`🎬 scene ${e} ความคืบหน้า: ${k}%`),o=k;try{I(`scene${e}-wait`,"active",k)}catch{}}d=0}else if(o>0){if(d===0)d=Date.now(),n(`🔍 scene ${e}: % หายไป (จาก ${o}%) — กำลังยืนยัน...`);else if(Date.now()-d>=l){n(`✅ scene ${e}: % หายไป ${l/1e3} วินาที — เจนเสร็จ!`),p=!0;break}}else if(E++,E>=15){const b=document.querySelectorAll("video");let P=!1;for(const g of b)if(g.readyState>=2&&!g.paused&&g.getBoundingClientRect().width>200){P=!0;break}if(P){n(`✅ scene ${e}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),p=!0;break}if(E>=30){n(`✅ scene ${e}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),p=!0;break}}await m(2e3)}p||n(`⚠️ scene ${e} หมดเวลา — ลองดาวน์โหลดต่อ`);try{I(`scene${e}-wait`,"done",100)}catch{}n(`✅ scene ${e} เสร็จ — เริ่มดาวน์โหลด`),await m(3e3);try{I("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const _=Date.now();let N=null;const M=Date.now();for(;!N&&Date.now()-M<1e4;){for(const k of document.querySelectorAll("button")){const y=k.querySelector("i");if(y&&(y.textContent||"").trim()==="download"){const b=k.getBoundingClientRect();if(b.width>0&&b.height>0){N=k;break}}}N||await m(1e3)}if(!N){F("ไม่พบปุ่มดาวน์โหลด");return}await te(N),n("คลิกดาวน์โหลดแล้ว ✅");try{I("download","done"),I("upscale","active")}catch{}await m(1500);let h=null;for(let k=0;k<3&&!h;k++){k>0&&n(`🔄 ลองหา 720p ครั้งที่ ${k+1}...`);let y=null;const b=Date.now();for(;!y&&Date.now()-b<5e3;){for(const f of document.querySelectorAll("[role='menuitem']"))if((f.textContent||"").trim().includes("Full Video")&&f.querySelector("i")){const v=f.getBoundingClientRect();if(v.width>0&&v.height>0){y=f;break}}y||await m(500)}if(!y){F("ไม่พบ Full Video");continue}const P=y.getBoundingClientRect(),g=P.left+P.width/2,x=P.top+P.height/2;y.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:g,clientY:x})),y.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:g,clientY:x})),y.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g,clientY:x})),await te(y),n("คลิก/hover Full Video ✅"),await m(2e3);const R=Date.now();for(;!h&&Date.now()-R<8e3;){for(const f of document.querySelectorAll("button[role='menuitem']")){const u=f.querySelectorAll("span");for(const v of u)if((v.textContent||"").trim()==="720p"){const A=f.getBoundingClientRect();if(A.width>0&&A.height>0){h=f;break}}if(h)break}h||(y.isConnected&&(y.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:g,clientY:x})),y.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g+20,clientY:x}))),await m(500))}}if(!h){F("ไม่พบ 720p");return}await te(h),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const i=Date.now();let w=!1,S=!1;for(;Date.now()-i<3e5;){for(const k of document.querySelectorAll("div[data-title] div, div[data-content] div")){const y=(k.textContent||"").trim();if(y==="Download complete!"||y==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),w=!0;break}(y.includes("Downloading your extended video")||y.includes("กำลังดาวน์โหลด"))&&(S||(S=!0,n("⏳ กำลังดาวน์โหลด...")))}if(w)break;if(S){let k=!1;for(const y of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((y.textContent||"").trim().includes("Downloading")){k=!0;break}if(!k){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),w=!0;break}}await m(2e3)}if(!w){F("ดาวน์โหลดหมดเวลา");return}try{I("upscale","done",100),I("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let T=!1;const B=Date.now();for(;Date.now()-B<6e4&&!T;){try{await new Promise(k=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:_},y=>{chrome.runtime.lastError?F(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):y!=null&&y.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${y.message}`),T=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${y==null?void 0:y.message}`),k()})})}catch(k){F(`ตรวจสอบผิดพลาด: ${k.message}`)}T||await m(3e3)}T||F("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{I("open","done"),xe(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Ot(){try{const t=await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",c=>{if(chrome.runtime.lastError){d(null);return}d((c==null?void 0:c.netflow_pending_action)||null)})});if(!t||!t.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(t._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-t.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const a=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(t._claimed=a,await new Promise(d=>{chrome.storage.local.set({netflow_pending_action:t},()=>d())}),await m(300),!await new Promise(d=>{chrome.storage.local.get("netflow_pending_action",c=>{const s=c==null?void 0:c.netflow_pending_action;d((s==null?void 0:s._claimed)===a)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${t.action} (อายุ ${Math.round(r/1e3)} วินาที)`),t.action==="mute_video"?await ct(t.sceneCount||1,t.scenePrompts||[],t.theme):t.action==="wait_scene_gen_and_download"||t.action==="wait_scene2_gen_and_download"?await dt(t.sceneCount||2,t.currentScene||2,t.theme):n(`⚠️ ไม่รู้จัก pending action: ${t.action}`)}catch(t){n(`⚠️ checkAndRunPendingAction error: ${t.message}`)}}chrome.runtime.onMessage.addListener((t,e,r)=>{if((t==null?void 0:t.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Nt(t).then(a=>n(`✅ ระบบอัตโนมัติเสร็จ: ${a.message}`)).catch(a=>console.error("[Netflow AI] Generate error:",a)),!1;if((t==null?void 0:t.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((t==null?void 0:t.action)==="PING")return r({status:"ready"}),!1;if((t==null?void 0:t.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const a=At();if(!a){F("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=a.getBoundingClientRect(),d=o.left+o.width/2,c=o.top+o.height/2;n(`การ์ดรูปที่ (${d.toFixed(0)}, ${c.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(d,c);l?(await te(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await te(a),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Ot(),document.addEventListener("dblclick",t=>{const e=t.target;if(!e)return;const r=e.tagName.toLowerCase(),a=Math.round(t.clientX),o=Math.round(t.clientY),d=(e.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${a},${o}) → <${r}> "${d}"`)},!0)})();
