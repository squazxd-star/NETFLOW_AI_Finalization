(function(){"use strict";const it={green:{rgb:"0, 255, 65",hex:"#00ff41",accentRgb:"0, 255, 180",accentHex:"#00ffb4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},red:{rgb:"220, 38, 38",hex:"#dc2626",accentRgb:"251, 146, 60",accentHex:"#fb923c",doneRgb:"34, 197, 94",doneHex:"#22c55e"},blue:{rgb:"43, 125, 233",hex:"#2b7de9",accentRgb:"6, 182, 212",accentHex:"#06b6d4",doneRgb:"34, 197, 94",doneHex:"#22c55e"},yellow:{rgb:"234, 179, 8",hex:"#eab308",accentRgb:"245, 158, 11",accentHex:"#f59e0b",doneRgb:"34, 197, 94",doneHex:"#22c55e"},purple:{rgb:"139, 92, 246",hex:"#8b5cf6",accentRgb:"168, 85, 247",accentHex:"#a855f7",doneRgb:"34, 197, 94",doneHex:"#22c55e"}};let W=it.green,ut=null;function Mt(e){e&&it[e]&&(ut=e,W=it[e],Ot(),requestAnimationFrame(()=>oe()))}function ue(){if(ut&&it[ut])return it[ut];try{const e=localStorage.getItem("netflow_app_theme");if(e&&it[e])return it[e]}catch{}return it.green}let Z=0,Q=255,tt=65;function Ot(){const e=W.hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);e&&(Z=parseInt(e[1],16),Q=parseInt(e[2],16),tt=parseInt(e[3],16))}let V=null,U=null,at=null,Gt=0,$t=null,gt=null,Et=null,It=0,st=!1,nt=null,mt=null,ht=null,kt=1,X=[];function Pt(e){const t=[{stepId:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{stepId:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"},{stepId:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{stepId:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{stepId:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0},{stepId:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"}];if(e<=1)t.push({stepId:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{stepId:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0},{stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"});else{t.push({stepId:"vid-prompt",label:"ฉาก 1 — ใส่คำสั่ง",status:"waiting"},{stepId:"vid-generate",label:"ฉาก 1 — สั่งสร้าง",status:"waiting"},{stepId:"vid-wait",label:"ฉาก 1 — กำลังสร้าง",status:"waiting",progress:0});for(let r=2;r<=e;r++)t.push({stepId:`scene${r}-prompt`,label:`ฉาก ${r} — ใส่คำสั่ง`,status:"waiting"},{stepId:`scene${r}-gen`,label:`ฉาก ${r} — สั่งสร้าง`,status:"waiting"},{stepId:`scene${r}-wait`,label:`ฉาก ${r} — กำลังสร้าง`,status:"waiting",progress:0});t.push({stepId:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{stepId:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{stepId:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"})}return t}const lt=[{id:"ingest",title:"ASSET_INGEST",steps:[{id:"settings",label:"กำหนดค่าเริ่มต้น",status:"waiting"},{id:"upload-char",label:"อัปโหลดภาพตัวละคร",status:"waiting"},{id:"upload-prod",label:"อัปโหลดภาพสินค้า",status:"waiting"}]},{id:"image",title:"AI_IMAGE_SYNTHESIS",steps:[{id:"img-prompt",label:"ใส่คำสั่งสร้างภาพ",status:"waiting"},{id:"img-generate",label:"สั่งสร้างภาพ",status:"waiting"},{id:"img-wait",label:"รอผลลัพธ์การสร้างภาพ",status:"waiting",progress:0}]},{id:"video",title:"VIDEO_PRODUCTION",steps:[{id:"animate",label:"แปลงเป็นภาพเคลื่อนไหว",status:"waiting"},{id:"vid-prompt",label:"ใส่คำสั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-generate",label:"สั่งสร้างวิดีโอ",status:"waiting"},{id:"vid-wait",label:"กำลังสร้างวิดีโอ",status:"waiting",progress:0}]},{id:"render",title:"FINAL_RENDER_OUTPUT",steps:[{id:"download",label:"ดาวน์โหลดวิดีโอ",status:"waiting"},{id:"upscale",label:"อัปสเกลความละเอียด",status:"waiting",progress:0},{id:"open",label:"เปิดดูตัวอย่างวิดีโอ",status:"waiting"}]}];X=Pt(1);function ge(e){const t=e.rgb,r=e.accentRgb,i=e.doneRgb,o=e.hex,c=e.accentHex,p=e.doneHex,s=(()=>{const b=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const a=I=>Math.min(255,I+80);return`#${[1,2,3].map(I=>a(parseInt(b[I],16)).toString(16).padStart(2,"0")).join("")}`})(),l=(()=>{const b=p.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(!b)return"#4ade80";const a=I=>Math.min(255,I+60);return`#${[1,2,3].map(I=>a(parseInt(b[I],16)).toString(16).padStart(2,"0")).join("")}`})(),d=o.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i),$=d?Math.max(parseInt(d[1],16),parseInt(d[2],16),parseInt(d[3],16),1):255,_=d?parseInt(d[1],16)/$:0,N=d?parseInt(d[2],16)/$:1,k=d?parseInt(d[3],16)/$:.25,C=b=>`${Math.round(_*b)}, ${Math.round(N*b)}, ${Math.round(k*b)}`;return`
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
    background: rgba(${C(8)}, 0.85);
    border: 1.5px solid rgba(${t},0.35);
    border-radius: 17px;
    padding: 0;
    overflow: hidden;
    box-shadow:
        0 0 60px rgba(${t},0.15),
        0 0 120px rgba(${t},0.08),
        0 0 200px rgba(${C(180)},0.05),
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
            0 0 200px rgba(${C(180)},0.05),
            inset 0 1px 0 rgba(${t},0.1),
            inset 0 0 40px rgba(${t},0.03);
    }
    50% {
        box-shadow:
            0 0 80px rgba(${t},0.25),
            0 0 160px rgba(${t},0.12),
            0 0 250px rgba(${C(180)},0.08),
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
    background: ${o};
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
.nf-term-line.nf-term-done { color: rgba(${i}, 0.85); }
.nf-term-line.nf-term-error { color: rgba(239, 68, 68, 0.8); }
.nf-term-line.nf-term-waiting { color: rgba(255, 255, 255, 0.55); }

.nf-term-prefix {
    color: rgba(${t},0.92);
    font-weight: 700;
    user-select: none;
}

.nf-term-active .nf-term-prefix { color: ${o}; text-shadow: 0 0 6px rgba(${t},0.4); }

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
    background: rgba(${i}, 0.12);
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
    background: linear-gradient(180deg, rgba(${C(6)},0.75) 0%, rgba(${C(3)},0.92) 100%);
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
    background: rgba(${C(8)}, 0.88);
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
    border-color: rgba(${i}, 0.4);
    box-shadow: 0 0 20px rgba(${i}, 0.1);
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
    background: linear-gradient(90deg, transparent, rgba(${i}, 0.5), transparent);
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
    color: rgba(${i}, 0.85);
    text-shadow:
        0 0 4px rgba(${i},0.5),
        0 0 12px rgba(${i},0.3);
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
    box-shadow: 0 0 6px rgba(${t},0.6);
    animation: nf-dot-pulse 1s ease-in-out infinite;
}

.nf-step-done .nf-step-dot {
    background: ${p};
    box-shadow: 0 0 5px rgba(${i}, 0.5);
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
    background: linear-gradient(90deg, ${o}, ${c});
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
    background: rgba(${C(8)},0.8);
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
    background: rgba(${C(8)}, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${o};
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
    color: ${o};
    text-shadow: 0 0 6px rgba(${t},0.4);
}
.nf-proc-active .nf-proc-dot {
    background: ${o};
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
    color: rgba(${i},0.7);
}
.nf-proc-done .nf-proc-num { color: rgba(${i},0.5); }
.nf-proc-done .nf-proc-dot {
    background: ${p};
    box-shadow: 0 0 5px rgba(${i},0.5);
}
.nf-proc-done .nf-proc-badge {
    background: rgba(${i},0.1);
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

    `}function zt(){at||(at=document.createElement("style"),at.id="netflow-overlay-styles",at.textContent=ge(W),document.head.appendChild(at))}function Ht(e){e.innerHTML="",X.forEach((t,r)=>{const i=document.createElement("div");i.className="nf-proc-row nf-proc-waiting",i.id=`nf-proc-${t.stepId}`,i.innerHTML=`
            <span class="nf-proc-num">${r+1}</span>
            <span class="nf-proc-dot"></span>
            <span class="nf-proc-label">${t.label}</span>
            <span class="nf-proc-badge">(queued)</span>
        `,e.appendChild(i)})}function me(){const e=document.getElementById("nf-terminal");if(!e)return;Ht(e);const t=document.getElementById("nf-step-counter");t&&(t.textContent=`0/${X.length}`)}function qt(e,t){let s="";for(let g=0;g<32;g++){const x=g/32*Math.PI*2,R=(g+.2)/32*Math.PI*2,f=(g+.5)/32*Math.PI*2,u=(g+.8)/32*Math.PI*2,y=(g+1)/32*Math.PI*2;s+=`${g===0?"M":"L"}${(120+104*Math.cos(x)).toFixed(1)},${(120+104*Math.sin(x)).toFixed(1)} `,s+=`L${(120+104*Math.cos(R)).toFixed(1)},${(120+104*Math.sin(R)).toFixed(1)} `,s+=`L${(120+116*Math.cos(f)).toFixed(1)},${(120+116*Math.sin(f)).toFixed(1)} `,s+=`L${(120+104*Math.cos(u)).toFixed(1)},${(120+104*Math.sin(u)).toFixed(1)} `,s+=`L${(120+104*Math.cos(y)).toFixed(1)},${(120+104*Math.sin(y)).toFixed(1)} `}s+="Z";const l=24,d=100,$=90;let _="";for(let g=0;g<l;g++){const x=g/l*Math.PI*2,R=(g+.25)/l*Math.PI*2,f=(g+.75)/l*Math.PI*2,u=(g+1)/l*Math.PI*2;_+=`${g===0?"M":"L"}${(120+$*Math.cos(x)).toFixed(1)},${(120+$*Math.sin(x)).toFixed(1)} `,_+=`L${(120+d*Math.cos(R)).toFixed(1)},${(120+d*Math.sin(R)).toFixed(1)} `,_+=`L${(120+d*Math.cos(f)).toFixed(1)},${(120+d*Math.sin(f)).toFixed(1)} `,_+=`L${(120+$*Math.cos(u)).toFixed(1)},${(120+$*Math.sin(u)).toFixed(1)} `}_+="Z";let N="";for(let g=0;g<64;g++){const x=g/64*Math.PI*2,R=g%4===0?117:119,f=g%4===0?124:122,u=g%4===0?.8:.4,y=g%4===0?.7:.35;N+=`<line x1="${(120+R*Math.cos(x)).toFixed(1)}" y1="${(120+R*Math.sin(x)).toFixed(1)}" x2="${(120+f*Math.cos(x)).toFixed(1)}" y2="${(120+f*Math.sin(x)).toFixed(1)}" stroke="rgba(${e},${y})" stroke-width="${u}"/>`}const k=26,C=78,b=68;let a="";for(let g=0;g<k;g++){const x=g/k*Math.PI*2,R=(g+.2)/k*Math.PI*2,f=(g+.5)/k*Math.PI*2,u=(g+.8)/k*Math.PI*2,y=(g+1)/k*Math.PI*2;a+=`${g===0?"M":"L"}${(120+b*Math.cos(x)).toFixed(1)},${(120+b*Math.sin(x)).toFixed(1)} `,a+=`L${(120+b*Math.cos(R)).toFixed(1)},${(120+b*Math.sin(R)).toFixed(1)} `,a+=`L${(120+C*Math.cos(f)).toFixed(1)},${(120+C*Math.sin(f)).toFixed(1)} `,a+=`L${(120+b*Math.cos(u)).toFixed(1)},${(120+b*Math.sin(u)).toFixed(1)} `,a+=`L${(120+b*Math.cos(y)).toFixed(1)},${(120+b*Math.sin(y)).toFixed(1)} `}a+="Z";let I="";for(let g=0;g<48;g++){const x=g/48*Math.PI*2,R=g%4===0?79:80,f=g%4===0?85:83,u=g%4===0?.6:.3,y=g%4===0?.6:.3;I+=`<line x1="${(120+R*Math.cos(x)).toFixed(1)}" y1="${(120+R*Math.sin(x)).toFixed(1)}" x2="${(120+f*Math.cos(x)).toFixed(1)}" y2="${(120+f*Math.sin(x)).toFixed(1)}" stroke="rgba(${t},${y})" stroke-width="${u}"/>`}function P(g,x,R,f,u){let y="";for(let T=0;T<R;T++){const v=T/R*Math.PI*2,M=(T+.25)/R*Math.PI*2,O=(T+.75)/R*Math.PI*2,L=(T+1)/R*Math.PI*2;y+=`${T===0?"M":"L"}${(g+u*Math.cos(v)).toFixed(1)},${(x+u*Math.sin(v)).toFixed(1)} `,y+=`L${(g+f*Math.cos(M)).toFixed(1)},${(x+f*Math.sin(M)).toFixed(1)} `,y+=`L${(g+f*Math.cos(O)).toFixed(1)},${(x+f*Math.sin(O)).toFixed(1)} `,y+=`L${(g+u*Math.cos(L)).toFixed(1)},${(x+u*Math.sin(L)).toFixed(1)} `}return y+"Z"}const B=42,E=[],w=P(120,120,14,18,13);E.push(`<g class="nf-kinetic-sub" style="transform-origin:120px 120px">
        <path d="${w}" fill="none" stroke="rgba(${e},0.8)" stroke-width="1.2"/>
        <circle cx="120" cy="120" r="9" fill="none" stroke="rgba(${t},0.5)" stroke-width="0.6" stroke-dasharray="2,1"/>
        <circle cx="120" cy="120" r="4" fill="rgba(${e},0.9)">
            <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite"/>
        </circle>
    </g>`);for(let g=0;g<8;g++){const x=g/8*Math.PI*2,R=120+B*Math.cos(x),f=120+B*Math.sin(x),y=P(R,f,10,14,10),T=g%2===0?"":"animation-direction:reverse;";E.push(`<g class="nf-kinetic-sub" style="transform-origin:${R.toFixed(1)}px ${f.toFixed(1)}px;${T}">
            <path d="${y}" fill="none" stroke="rgba(${t},0.6)" stroke-width="0.9"/>
            <circle cx="${R.toFixed(1)}" cy="${f.toFixed(1)}" r="7" fill="none" stroke="rgba(${e},0.4)" stroke-width="0.5" stroke-dasharray="1.5,1.5"/>
            <circle cx="${R.toFixed(1)}" cy="${f.toFixed(1)}" r="2.5" fill="rgba(${e},0.6)"/>
        </g>`)}const h=E.join(`
`);let A="";for(let g=0;g<8;g++){const x=g/8*Math.PI*2,R=120+10*Math.cos(x),f=120+10*Math.sin(x),u=120+(B-10)*Math.cos(x),y=120+(B-10)*Math.sin(x);A+=`<line x1="${R.toFixed(1)}" y1="${f.toFixed(1)}" x2="${u.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(${t},0.25)" stroke-width="0.5"/>`}return`<svg width="80" height="80" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        ${N}

        <!-- OUTER LAYER 1 — 32 sharp teeth (CW) -->
        <g class="nf-kinetic-outer">
            <path d="${s}" fill="none" stroke="url(#nfKGrad)" stroke-width="1.5" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="104" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.5"/>
        </g>

        <!-- OUTER LAYER 2 — 24 teeth (CCW) -->
        <g class="nf-kinetic-mid">
            <path d="${_}" fill="none" stroke="url(#nfKGrad2)" stroke-width="1.2" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${$}" fill="none" stroke="rgba(${t},0.25)" stroke-width="0.5" stroke-dasharray="1,2"/>
        </g>

        <!-- INNER RING 3 — 26 teeth (CW fast) + inner tick marks -->
        <g class="nf-kinetic-inner">
            <path d="${a}" fill="none" stroke="url(#nfKGrad3)" stroke-width="1.1" stroke-linejoin="bevel"/>
            <circle cx="120" cy="120" r="${b}" fill="none" stroke="rgba(${e},0.2)" stroke-width="0.4"/>
            <circle cx="120" cy="120" r="65" fill="none" stroke="rgba(${t},0.15)" stroke-width="0.3" stroke-dasharray="1,2"/>
        </g>
        ${I}

        <!-- Precision rings between inner gear and core -->
        <circle cx="120" cy="120" r="60" fill="none" stroke="rgba(${e},0.15)" stroke-width="0.3" stroke-dasharray="3,5" opacity="0.5"/>
        <circle cx="120" cy="120" r="58" fill="none" stroke="rgba(${t},0.1)" stroke-width="0.2"/>

        <!-- Connecting spokes (static) -->
        ${A}

        <!-- 9 PACKED SUB-GEARS (1 center + 8 ring, all spinning) -->
        <g class="nf-kinetic-mid" style="animation-duration:18s">
            ${h}
        </g>
    </svg>`}function he(){const e=document.createElement("div");e.id="netflow-engine-overlay",nt=document.createElement("canvas"),nt.id="nf-matrix-canvas",e.appendChild(nt);const t=document.createElement("div");t.className="nf-pat-plasma",e.appendChild(t);for(let v=1;v<=5;v++){const M=document.createElement("div");M.className=`nf-ambient-orb nf-orb-${v}`,e.appendChild(M)}const r=document.createElement("div");r.className="nf-pat-data",e.appendChild(r);const i=document.createElement("div");i.className="nf-pat-diag-a",e.appendChild(i);const o=document.createElement("div");o.className="nf-pat-diag-b",e.appendChild(o);const c=document.createElement("div");c.className="nf-pat-circuit",e.appendChild(c);const p=document.createElement("div");p.className="nf-pat-honeycomb",e.appendChild(p);const s=document.createElement("div");s.className="nf-pat-binary",e.appendChild(s);const l=document.createElement("div");l.className="nf-pat-crosshatch",e.appendChild(l);const d=document.createElement("div");d.className="nf-pat-diamond",e.appendChild(d);const $=document.createElement("div");$.className="nf-pat-wave-h",e.appendChild($);const _=document.createElement("div");_.className="nf-pat-radar",e.appendChild(_);const N=document.createElement("div");N.className="nf-pat-ripple-1",e.appendChild(N);const k=document.createElement("div");k.className="nf-pat-ripple-2",e.appendChild(k);const C=document.createElement("div");C.className="nf-pat-techscan",e.appendChild(C);const b=document.createElement("div");b.className="nf-center-glow",e.appendChild(b);const a=document.createElement("div");a.className="nf-pat-noise",e.appendChild(a);const I=document.createElement("div");I.className="nf-crt-scanlines",e.appendChild(I);const P=document.createElement("div");P.className="nf-vignette",e.appendChild(P);for(let v=0;v<3;v++){const M=document.createElement("div");M.className="nf-pulse-ring",e.appendChild(M)}["nf-deco-tl","nf-deco-tr","nf-deco-bl","nf-deco-br"].forEach(v=>{const M=document.createElement("div");M.className=`nf-corner-deco ${v}`,e.appendChild(M)});const B=document.createElement("button");B.className="nf-close-btn",B.textContent="✕ ซ่อน",B.onclick=()=>At(),e.appendChild(B);const E=document.createElement("div");E.className="nf-layout";const w=document.createElement("div");w.className="nf-core-monitor",w.id="nf-core-monitor";const h=document.createElement("div");h.className="nf-core-header",h.innerHTML=`
        <div class="nf-core-title">
            <span class="nf-core-title-label">NETFLOW CORE:</span>
            <span class="nf-core-title-val">ACTIVE</span>
            <span class="nf-status-dot"></span>
        </div>
        <div class="nf-core-counter" id="nf-step-counter">0/${X.length}</div>
    `,w.appendChild(h);const A=document.createElement("div");A.className="nf-terminal",A.id="nf-terminal",Ht(A),w.appendChild(A);const g=document.createElement("div");g.className="nf-engine-core",g.id="nf-engine-core";const x=document.createElement("div");x.className="nf-engine-frame",["nf-fc-tl","nf-fc-tr","nf-fc-bl","nf-fc-br"].forEach(v=>{const M=document.createElement("div");M.className=`nf-frame-corner ${v}`,x.appendChild(M)}),g.appendChild(x);const R="http://www.w3.org/2000/svg",f=document.createElementNS(R,"svg");f.setAttribute("class","nf-engine-waves"),f.setAttribute("viewBox","0 0 560 140"),f.setAttribute("preserveAspectRatio","none"),f.id="nf-engine-waves";for(let v=0;v<4;v++){const M=document.createElementNS(R,"path");M.setAttribute("fill","none"),M.setAttribute("stroke-width",v<2?"1.5":"1"),M.setAttribute("stroke",v<2?`rgba(${W.rgb},${.14+v*.1})`:`rgba(${W.accentRgb},${.1+(v-2)*.08})`),M.setAttribute("data-wave-idx",String(v)),f.appendChild(M)}g.appendChild(f);const u=document.createElement("div");u.className="nf-engine-brand-inner",u.innerHTML=`
        <div class="nf-brand-gear-icon nf-brand-gear-left">
            ${qt(W.rgb,W.accentRgb)}
        </div>
        <div class="nf-brand-inner-text">NETFLOW AI ENGINE V1.0</div>
        <div class="nf-brand-gear-icon nf-brand-gear-right">
            ${qt(W.rgb,W.accentRgb)}
        </div>
    `,g.appendChild(u);const y=document.createElement("div");y.className="nf-engine-stats",y.id="nf-engine-stats",y.innerHTML=[["SCENES","nf-stat-scenes","1/1"],["ELAPSED","nf-stat-elapsed","00:00"],["STEP","nf-stat-step","0/0"],["STATUS","nf-stat-status","READY"],["PROGRESS","nf-stat-progress","—"]].map(([v,M,O])=>`<div class="nf-stat-item"><span class="nf-stat-label">${v}</span><span class="nf-stat-val" id="${M}">${O}</span></div>`).join(""),g.appendChild(y),w.appendChild(g),E.appendChild(w);const T=["nf-mod-tl","nf-mod-tr","nf-mod-bl","nf-mod-br"];lt.forEach((v,M)=>{const O=be(v);O.classList.add(T[M]),O.id=`nf-mod-${v.id}`,E.appendChild(O)}),e.appendChild(E);for(let v=0;v<30;v++){const M=document.createElement("div");M.className="nf-particle",M.style.left=`${5+Math.random()*90}%`,M.style.bottom=`${Math.random()*40}%`,M.style.animationDuration=`${3+Math.random()*5}s`,M.style.animationDelay=`${Math.random()*4}s`;const O=.3+Math.random()*.4,L=.7+Math.random()*.3;M.style.background=`rgba(${Math.floor(Z*L)}, ${Math.floor(Q*L)}, ${Math.floor(tt*L)}, ${O})`,M.style.width=`${1+Math.random()*2}px`,M.style.height=M.style.width,e.appendChild(M)}return e}function be(e){const t=document.createElement("div");t.className="nf-module";const r=document.createElement("div");r.className="nf-mod-header",r.innerHTML=`
        <div class="nf-mod-title">${e.title}</div>
        <span class="nf-mod-pct" id="nf-pct-${e.id}">0%</span>
    `,t.appendChild(r),e.steps.forEach(o=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,t.appendChild(c)});const i=document.createElement("div");return i.className="nf-mod-progress",i.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(i),t}function we(){Gt=Date.now(),$t=setInterval(()=>{const e=Math.floor((Date.now()-Gt)/1e3),t=String(Math.floor(e/60)).padStart(2,"0"),r=String(e%60).padStart(2,"0"),i=document.getElementById("nf-timer");i&&(i.textContent=`${t}:${r}`);const o=document.getElementById("nf-stat-elapsed");o&&(o.textContent=`${t}:${r}`)},1e3)}function Vt(){$t&&(clearInterval($t),$t=null)}const xe=120,Yt=160,Wt=.4;let dt=null,Ut=0,Xt=0,jt=0,bt=[];function ye(e,t){bt=[];for(let r=0;r<xe;r++){const i=Math.random();let o;i<.22?o=0:i<.4?o=1:i<.55?o=2:i<.68?o=3:i<.84?o=4:o=5;const c=Math.random()*e,p=Math.random()*t,s=50+Math.random()*220,l=Math.random()*Math.PI*2,d=(.003+Math.random()*.008)*(Math.random()>.5?1:-1);bt.push({x:o===0?Math.random()*e:c+Math.cos(l)*s,y:o===0?Math.random()*t:p+Math.sin(l)*s,vx:(Math.random()-.5)*Wt,vy:(Math.random()-.5)*Wt,radius:1.2+Math.random()*2.5,pulsePhase:Math.random()*Math.PI*2,pulseSpeed:.02+Math.random()*.03,motion:o,oCx:c,oCy:p,oRadius:s,oAngle:l,oSpeed:d})}}function ve(){if(!nt)return;const e=nt;if(mt=e.getContext("2d"),!mt)return;const t=()=>{e.width=window.innerWidth,e.height=window.innerHeight,bt.length===0&&ye(e.width,e.height)};t(),window.addEventListener("resize",t);let r=null,i=0,o=0,c=!1;function p(){if(!mt||!nt){ht=null;return}if(ht=requestAnimationFrame(p),c=!c,c)return;const s=mt,l=nt.width,d=nt.height;s.fillStyle=`rgba(${Z*.04|0},${Q*.04|0},${tt*.06|0},1)`,s.fillRect(0,0,l,d),(!r||i!==l||o!==d)&&(i=l,o=d,r=s.createRadialGradient(l*.5,d*.5,0,l*.5,d*.5,Math.max(l,d)*.6),r.addColorStop(0,`rgba(${Z*.08|0},${Q*.08|0},${tt*.1|0},0.4)`),r.addColorStop(1,"rgba(0,0,0,0)")),s.fillStyle=r,s.fillRect(0,0,l,d);const $=bt,_=$.length,N=Yt*Yt;for(let b=0;b<_;b++){const a=$[b];if(a.pulsePhase+=a.pulseSpeed,a.motion===0)a.x+=a.vx,a.y+=a.vy,a.x<0?(a.x=0,a.vx=Math.abs(a.vx)*(.8+Math.random()*.4)):a.x>l&&(a.x=l,a.vx=-Math.abs(a.vx)*(.8+Math.random()*.4)),a.y<0?(a.y=0,a.vy=Math.abs(a.vy)*(.8+Math.random()*.4)):a.y>d&&(a.y=d,a.vy=-Math.abs(a.vy)*(.8+Math.random()*.4));else if(a.motion===1)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius,a.oCx+=Math.sin(a.oAngle*.3)*.15,a.oCy+=Math.cos(a.oAngle*.3)*.15;else if(a.motion===2)a.oAngle+=a.oSpeed,a.x=a.oCx+Math.cos(a.oAngle)*a.oRadius,a.y=a.oCy+Math.sin(a.oAngle)*a.oRadius*.5,a.oCx+=Math.sin(a.oAngle*.2)*.1,a.oCy+=Math.cos(a.oAngle*.2)*.1;else if(a.motion===3){a.oAngle+=a.oSpeed;const I=a.oAngle,P=a.oRadius*.7;a.x=a.oCx+P*Math.cos(I),a.y=a.oCy+P*Math.sin(I)*Math.cos(I),a.oCx+=Math.sin(I*.15)*.12,a.oCy+=Math.cos(I*.15)*.12}else if(a.motion===4){a.oAngle+=a.oSpeed*1.2;const I=a.oRadius*(.5+.5*Math.abs(Math.sin(a.oAngle*.15)));a.x=a.oCx+Math.cos(a.oAngle)*I,a.y=a.oCy+Math.sin(a.oAngle)*I,a.oCx+=Math.sin(a.oAngle*.1)*.18,a.oCy+=Math.cos(a.oAngle*.1)*.18}else a.oAngle+=a.oSpeed,a.x+=a.vx*.8,a.y=a.oCy+Math.sin(a.oAngle+a.x*.008)*a.oRadius*.35,a.x<-30?a.x=l+30:a.x>l+30&&(a.x=-30),a.oCy+=Math.sin(a.oAngle*.1)*.08;if(a.motion>0){const I=a.oRadius+50;a.oCx<-I?a.oCx=l+I:a.oCx>l+I&&(a.oCx=-I),a.oCy<-I?a.oCy=d+I:a.oCy>d+I&&(a.oCy=-I)}}s.beginPath(),s.strokeStyle=`rgba(${Z},${Q},${tt},0.06)`,s.lineWidth=.4;const k=new Path2D;for(let b=0;b<_;b++){const a=$[b];for(let I=b+1;I<_;I++){const P=$[I],B=a.x-P.x,E=a.y-P.y,w=B*B+E*E;w<N&&(1-w/N<.4?(s.moveTo(a.x,a.y),s.lineTo(P.x,P.y)):(k.moveTo(a.x,a.y),k.lineTo(P.x,P.y)))}}if(s.stroke(),s.strokeStyle=`rgba(${Z},${Q},${tt},0.18)`,s.lineWidth=.8,s.stroke(k),!dt||Ut!==Z||Xt!==Q||jt!==tt){dt=document.createElement("canvas");const b=48;dt.width=b,dt.height=b;const a=dt.getContext("2d"),I=a.createRadialGradient(b/2,b/2,0,b/2,b/2,b/2);I.addColorStop(0,`rgba(${Z},${Q},${tt},0.9)`),I.addColorStop(.3,`rgba(${Z},${Q},${tt},0.35)`),I.addColorStop(1,`rgba(${Z},${Q},${tt},0)`),a.fillStyle=I,a.fillRect(0,0,b,b),Ut=Z,Xt=Q,jt=tt}const C=dt;for(let b=0;b<_;b++){const a=$[b],I=.6+.4*Math.sin(a.pulsePhase),P=a.radius*5*(.8+I*.4);s.globalAlpha=.5+I*.4,s.drawImage(C,a.x-P/2,a.y-P/2,P,P)}s.globalAlpha=1,s.fillStyle="rgba(255,255,255,0.45)",s.beginPath();for(let b=0;b<_;b++){const a=$[b];if(a.radius>2){const I=.6+.4*Math.sin(a.pulsePhase),P=a.radius*(.8+I*.4)*.35;s.moveTo(a.x+P,a.y),s.arc(a.x,a.y,P,0,Math.PI*2)}}s.fill()}p()}function $e(){ht!==null&&(cancelAnimationFrame(ht),ht=null),nt=null,mt=null,bt=[]}let wt=null;const Ct=560,Ee=140,Kt=Ct/2,Jt=Ee/2,Zt=[];for(let e=0;e<=Ct;e+=8){const t=Math.abs(e-Kt)/Kt;Zt.push(Math.pow(Math.min(1,t*1.6),.6))}const ke=[0,1,2,3].map(e=>({amp:10+e*5,freq:(1.2+e*.35)*Math.PI*2/Ct,off:e*.6,spd:.7+e*.12}));let St=!1;function Qt(){if(gt=requestAnimationFrame(Qt),St=!St,St)return;if(It+=.07,!wt){const t=document.getElementById("nf-engine-waves");if(!t){gt=null;return}wt=Array.from(t.querySelectorAll("path"))}const e=[];for(let t=0;t<wt.length;t++){const r=ke[t],i=It*r.spd+r.off;e.length=0,e.push(`M 0 ${Jt}`);let o=0;for(let c=0;c<=Ct;c+=8){const p=Jt+r.amp*Zt[o++]*Math.sin(c*r.freq+i);e.push(`L${c} ${p*10+.5|0}`)}wt[t].setAttribute("d",e.join(" "))}}function Ce(){It=0,Qt(),ve(),Et=setInterval(()=>{const e=document.getElementById("nf-stat-freq"),t=document.getElementById("nf-stat-lat1"),r=document.getElementById("nf-stat-lat2"),i=document.getElementById("nf-stat-buf");e&&(e.textContent=`${(4.5+Math.random()*.5).toFixed(1)} GHz`),t&&(t.textContent=`${Math.floor(12+Math.random()*10)}ms`),r&&(r.textContent=`${Math.floor(12+Math.random()*10)}ms`),i&&(i.textContent=`${Math.floor(90+Math.random()*9)}%`)},2e3)}function te(){gt!==null&&(cancelAnimationFrame(gt),gt=null),Et&&(clearInterval(Et),Et=null),wt=null,$e()}function _t(){let e=0;const t=X.filter(s=>s.status!=="skipped").length;for(const s of X){const l=document.getElementById(`nf-proc-${s.stepId}`);if(!l)continue;l.className="nf-proc-row";const d=l.querySelector(".nf-proc-badge");switch(s.status){case"done":l.classList.add("nf-proc-done"),d&&(d.textContent="✅ done"),e++;break;case"active":l.classList.add("nf-proc-active"),d&&(d.textContent=s.progress!==void 0&&s.progress>0?`⏳ ${s.progress}%`:"⏳ active");break;case"error":l.classList.add("nf-proc-error"),d&&(d.textContent="❌ error");break;case"skipped":l.classList.add("nf-proc-skipped"),d&&(d.textContent="— skip");break;default:l.classList.add("nf-proc-waiting"),d&&(d.textContent="(queued)")}}const r=document.getElementById("nf-step-counter");r&&(r.textContent=`${e}/${X.length}`);const i=document.querySelector(".nf-core-title-val"),o=document.querySelector(".nf-status-dot");e>=t&&t>0?(i&&(i.textContent="COMPLETE",i.style.color=W.doneHex),o&&(o.style.background=W.doneHex,o.style.boxShadow=`0 0 8px rgba(${W.doneRgb},0.7)`)):X.some(l=>l.status==="error")?(i&&(i.textContent="ERROR",i.style.color="#f87171"),o&&(o.style.background="#ef4444",o.style.boxShadow="0 0 8px rgba(239,68,68,0.7)")):X.some(l=>l.status==="active")&&i&&(i.textContent="ACTIVE",i.style.color=W.hex,i.style.textShadow=`0 0 10px rgba(${W.rgb},0.5)`);const c=document.getElementById("nf-terminal"),p=c==null?void 0:c.querySelector(".nf-proc-active");p&&c&&p.scrollIntoView({behavior:"smooth",block:"center"})}function ee(){U&&U.isConnected||(zt(),U=document.createElement("button"),U.id="nf-toggle-btn",U.className="nf-toggle-visible",U.innerHTML=st?"⚡":"✕",U.title="ซ่อน/แสดง Netflow Overlay",U.onclick=()=>At(),document.body.appendChild(U))}function At(){V&&(ee(),st?(V.classList.remove("nf-hidden"),V.classList.add("nf-visible"),U&&(U.innerHTML="✕"),st=!1):(V.classList.remove("nf-visible"),V.classList.add("nf-hidden"),U&&(U.innerHTML="⚡"),st=!0))}const ne={red:"themes/theme-red.jpg",yellow:"themes/theme-yellow.jpg",blue:"themes/theme-blue.jpg",purple:"themes/theme-purple.jpg",green:"themes/theme-green.jpg"};function oe(){const e=document.getElementById("nf-core-monitor");if(!e)return;let t=ut;if(!t)try{t=localStorage.getItem("netflow_app_theme")||"red"}catch{t="red"}const r=ne[t]||ne.red;let i;try{i=chrome.runtime.getURL(r)}catch{i=`/${r}`}const o=W.rgb;e.style.backgroundImage=["linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.90) 100%)",`linear-gradient(180deg, rgba(${o},0.25) 0%, rgba(${o},0.12) 50%, rgba(${o},0.20) 100%)`,`url('${i}')`].join(", "),e.style.backgroundSize="auto, auto, cover",e.style.backgroundPosition="center, center, center",e.style.backgroundRepeat="no-repeat, no-repeat, no-repeat",e.style.setProperty("--nf-bg-set","1"),e.style.border=`1.5px solid rgba(${o},0.45)`,e.style.boxShadow=`0 0 70px rgba(${o},0.22), 0 0 140px rgba(${o},0.1), inset 0 1px 0 rgba(${o},0.15)`}function Tt(e=1){if(W=ue(),Ot(),V&&V.isConnected){st&&At();return}if(V&&!V.isConnected&&(V=null),at&&(at.remove(),at=null),zt(),kt=e,X=Pt(e),e>1){const t=lt.find(i=>i.id==="video");if(t){const i=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:"waiting",progress:0}];for(let o=2;o<=e;o++)i.push({id:`scene${o}-prompt`,label:`Scene ${o} Prompt`,status:"waiting"}),i.push({id:`scene${o}-gen`,label:`Scene ${o} Generate`,status:"waiting"}),i.push({id:`scene${o}-wait`,label:`Scene ${o} รอผล`,status:"waiting",progress:0});t.steps=i}const r=lt.find(i=>i.id==="render");if(r){const i=r.steps.find(c=>c.id==="download");i&&(i.label="ดาวน์โหลด 720p");const o=r.steps.find(c=>c.id==="upscale");o&&(o.label="Full Video")}}V=he(),document.body.appendChild(V),st=!1,ee(),we(),Ce(),requestAnimationFrame(()=>oe())}function Me(){Vt(),te(),st=!1,V&&(V.classList.add("nf-fade-out"),setTimeout(()=>{V==null||V.remove(),V=null},500)),U&&(U.remove(),U=null)}const Ie={settings:"CONFIG","upload-char":"UPLOAD","upload-prod":"UPLOAD","img-prompt":"PROMPT","img-generate":"GENERATE","img-wait":"IMG WAIT",animate:"ANIMATE","vid-prompt":"VID PROMPT","vid-generate":"VID GEN","vid-wait":"VID WAIT",download:"DOWNLOAD",upscale:"UPSCALE",open:"OPENING"};function Pe(e,t,r){const i=X.filter(s=>s.status==="done").length,o=X.length,c=document.getElementById("nf-stat-step");c&&(c.textContent=`${i}/${o}`);const p=document.getElementById("nf-stat-scenes");if(p&&(p.textContent=kt>1?`1/${kt}`:"1/1"),t==="active"){const s=document.getElementById("nf-stat-status"),l=Ie[e]||e.toUpperCase();s&&(s.textContent=l)}else if(t==="done"&&i>=o){const s=document.getElementById("nf-stat-status");s&&(s.textContent="COMPLETE")}else if(t==="error"){const s=document.getElementById("nf-stat-status");s&&(s.textContent="ERROR")}if(r!==void 0&&r>0){const s=document.getElementById("nf-stat-progress");s&&(s.textContent=`${Math.min(100,r)}%`)}}function S(e,t,r){if(!V)return;for(const o of lt)for(const c of o.steps)c.id===e&&(c.status=t,r!==void 0&&(c.progress=r));for(const o of X)o.stepId===e&&(o.status=t,r!==void 0&&(o.progress=r));const i=document.getElementById(`nf-step-${e}`);if(i&&(i.className="nf-step",t==="active"?i.classList.add("nf-step-active"):t==="done"?i.classList.add("nf-step-done"):t==="error"&&i.classList.add("nf-step-error")),Pe(e,t,r),r!==void 0){const o=document.getElementById(`nf-bar-${e}`);o&&(o.style.width=`${Math.min(100,r)}%`)}Bt(),_t()}function pt(e){S(e,"skipped");const t=document.getElementById(`nf-step-${e}`);t&&(t.style.opacity="0.2")}function xt(e=4e3){Vt(),te(),Bt(),_t(),setTimeout(()=>Me(),e)}function Bt(){for(const e of lt){const t=e.steps.filter(l=>l.status!=="skipped").length,r=e.steps.filter(l=>l.status==="done").length,i=e.steps.some(l=>l.status==="active"),o=t>0?Math.round(r/t*100):0,c=document.getElementById(`nf-pct-${e.id}`);c&&(c.textContent=`${o}%`);const p=document.getElementById(`nf-modbar-${e.id}`);p&&(p.style.width=`${o}%`);const s=document.getElementById(`nf-mod-${e.id}`);s&&(s.classList.remove("nf-active","nf-done"),o>=100?s.classList.add("nf-done"):i&&s.classList.add("nf-active"))}}function Se(e){var i,o,c,p;kt=e;const t=new Map;for(const s of X)t.set(s.stepId,{status:s.status,progress:s.progress});X=Pt(e);for(const s of X){const l=t.get(s.stepId);l&&(s.status=l.status,l.progress!==void 0&&(s.progress=l.progress))}if(me(),e>1){const s=lt.find(l=>l.id==="video");if(s){const l=[{id:"animate",label:"สลับเป็นโหมดวิดีโอ",status:((i=s.steps.find(d=>d.id==="animate"))==null?void 0:i.status)||"waiting"},{id:"vid-prompt",label:"Scene 1 Prompt",status:((o=s.steps.find(d=>d.id==="vid-prompt"))==null?void 0:o.status)||"waiting"},{id:"vid-generate",label:"Scene 1 Generate",status:((c=s.steps.find(d=>d.id==="vid-generate"))==null?void 0:c.status)||"waiting"},{id:"vid-wait",label:"Scene 1 รอผล",status:((p=s.steps.find(d=>d.id==="vid-wait"))==null?void 0:p.status)||"waiting",progress:0}];for(let d=2;d<=e;d++)l.push({id:`scene${d}-prompt`,label:`Scene ${d} Prompt`,status:"waiting"}),l.push({id:`scene${d}-gen`,label:`Scene ${d} Generate`,status:"waiting"}),l.push({id:`scene${d}-wait`,label:`Scene ${d} รอผล`,status:"waiting",progress:0});s.steps=l,ie(s)}}const r=lt.find(s=>s.id==="render");if(r&&e>1){const s=r.steps.find(d=>d.id==="download");s&&(s.label="ดาวน์โหลด 720p");const l=r.steps.find(d=>d.id==="upscale");l&&(l.label="Full Video"),ie(r)}Bt(),_t()}function ie(e){const t=document.getElementById(`nf-mod-${e.id}`);if(!t)return;t.querySelectorAll(".nf-step, .nf-mod-progress").forEach(o=>o.remove()),e.steps.forEach(o=>{const c=document.createElement("div");c.className="nf-step",c.id=`nf-step-${o.id}`;let p="";o.progress!==void 0&&(p=`
                <div class="nf-progress-bar">
                    <div class="nf-progress-fill" id="nf-bar-${o.id}" style="width: 0%"></div>
                </div>
            `),c.innerHTML=`
            <span class="nf-step-dot"></span>
            <span class="nf-step-label">${o.label}</span>
            ${p}
        `,t.appendChild(c)});const i=document.createElement("div");i.className="nf-mod-progress",i.innerHTML=`<div class="nf-mod-progress-fill" id="nf-modbar-${e.id}"></div>`,t.appendChild(i)}function ae(e){e.replace(/^\[Netflow AI\]\s*/,"")}const n=e=>{console.log(`[Netflow AI] ${e}`);try{ae(e)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"info",msg:e})}catch{}},F=e=>{console.warn(`[Netflow AI] ${e}`);try{ae(`⚠️ ${e}`)}catch{}try{chrome.runtime.sendMessage({action:"FLOW_LOG",level:"warn",msg:`⚠️ ${e}`})}catch{}},Rt=/Mac|iPhone|iPad|iPod/i.test(navigator.userAgent),Ft=/Win/i.test(navigator.userAgent),ft=Rt?"🍎 Mac":Ft?"🪟 Win":"🐧 Other";n(`สคริปต์โหลดบนหน้า Google Flow แล้ว ${ft}`),document.addEventListener("click",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),i=Math.round(e.clientX),o=Math.round(e.clientY),c=(t.textContent||"").trim().slice(0,30);n(`🖱️ คลิก (${i},${o}) → <${r}> "${c}"`)},!0);const m=e=>new Promise(t=>setTimeout(t,e));function ct(){return!!window.__NETFLOW_STOP__}function re(){var r;const e=["couldn't generate","could not generate","failed to generate","generation failed","ไม่สามารถสร้าง","สร้างไม่สำเร็จ","try again later","ลองอีกครั้งภายหลัง","ลองใหม่อีกครั้ง","something went wrong","เกิดข้อผิดพลาด","safety filter","policy violation","content policy","unable to generate","ไม่สามารถสร้างวิดีโอ","couldn't generate video","couldn't generate image"],t=document.querySelectorAll("div, span, p, h1, h2, h3, li");for(const i of t){if(i.closest("#netflow-engine-overlay"))continue;const o=(i.textContent||"").trim().toLowerCase();if(!(o.length>200||o.length<5)){for(const c of e)if(o.includes(c))return((r=i.textContent)==null?void 0:r.trim())||c}}return null}async function et(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,i=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:i,button:0};e.dispatchEvent(new PointerEvent("pointerdown",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousedown",o)),await m(80),e.dispatchEvent(new PointerEvent("pointerup",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseup",o)),e.dispatchEvent(new MouseEvent("click",o)),await m(50),e.click()}function _e(e){const t=e.getBoundingClientRect(),r=t.left+t.width/2,i=t.top+t.height/2,o={bubbles:!0,cancelable:!0,clientX:r,clientY:i};e.dispatchEvent(new PointerEvent("pointerenter",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseenter",o)),e.dispatchEvent(new PointerEvent("pointerover",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mouseover",o)),e.dispatchEvent(new PointerEvent("pointermove",{...o,pointerId:1,isPrimary:!0,pointerType:"mouse"})),e.dispatchEvent(new MouseEvent("mousemove",o))}function Ae(e){const t=[],r=document.querySelectorAll("i");for(const i of r){if((i.textContent||"").trim()!==e)continue;let c=i,p=null,s=1/0;for(let l=0;l<20&&c&&(c=c.parentElement,!(!c||c===document.body));l++){const d=c.getBoundingClientRect();if(d.width>100&&d.height>80&&d.width<window.innerWidth*.6&&d.top>=-10&&d.bottom<=window.innerHeight+10){const $=d.width*d.height;$<s&&(p=c,s=$)}}p&&!t.includes(p)&&t.push(p)}return t.sort((i,o)=>{const c=i.getBoundingClientRect(),p=o.getBoundingClientRect();return c.left-p.left}),t}function Dt(e=!1){const t=[],r=document.querySelectorAll("video");for(const p of r){let s=p.parentElement;for(let l=0;l<10&&s;l++){const d=s.getBoundingClientRect();if(d.width>120&&d.height>80&&d.width<window.innerWidth*.7&&d.top>=-50&&d.left<window.innerWidth*.75){t.push({el:s,left:d.left});break}s=s.parentElement}}const i=document.querySelectorAll("i, span.material-symbols-outlined, span.google-symbols, .google-symbols");for(const p of i){const s=(p.textContent||"").trim();if(s==="play_arrow"||s==="play_circle"||s==="videocam"){let l=p.parentElement;for(let d=0;d<10&&l;d++){const $=l.getBoundingClientRect();if($.width>120&&$.height>80&&$.width<window.innerWidth*.7&&$.top>=-50&&$.left<window.innerWidth*.75){t.push({el:l,left:$.left});break}l=l.parentElement}}}const o=document.querySelectorAll("img");for(const p of o){const s=(p.alt||"").toLowerCase();if(s.includes("video")||s.includes("วิดีโอ")){let l=p.parentElement;for(let d=0;d<10&&l;d++){const $=l.getBoundingClientRect();if($.width>120&&$.height>80&&$.width<window.innerWidth*.7&&$.top>=-50&&$.left<window.innerWidth*.75){t.push({el:l,left:$.left});break}l=l.parentElement}}}const c=Array.from(new Set(t.map(p=>p.el))).map(p=>t.find(s=>s.el===p));if(c.sort((p,s)=>p.left-s.left),c.length>0){const p=c[0].el,s=p.getBoundingClientRect();return e||n(`🎬 พบการ์ดวิดีโอที่ (${s.left.toFixed(0)},${s.top.toFixed(0)}) ขนาด ${s.width.toFixed(0)}x${s.height.toFixed(0)}`),p}return e||n("🎬 ไม่พบการ์ดวิดีโอ"),null}function Te(){const e=Ae("image");if(e.length>0){const r=e[0].getBoundingClientRect();return n(`🖼️ พบการ์ดรูปภาพ ${e.length} ใบ — ใบแรกที่ (${r.left.toFixed(0)},${r.top.toFixed(0)}) ขนาด ${r.width.toFixed(0)}x${r.height.toFixed(0)}`),e[0]}const t=document.querySelectorAll("canvas");for(const r of t){let i=r.parentElement;for(let o=0;o<10&&i;o++){const c=i.getBoundingClientRect();if(c.width>100&&c.height>80&&c.width<window.innerWidth*.6)return n(`🖼️ พบการ์ดรูปภาพจาก <canvas> สำรองที่ (${c.left.toFixed(0)},${c.top.toFixed(0)})`),i;i=i.parentElement}}return n("🖼️ ไม่พบการ์ดรูปภาพ"),null}function Be(e,t){var s;const[r,i]=e.split(","),o=((s=r.match(/:(.*?);/))==null?void 0:s[1])||"image/png",c=atob(i),p=new Uint8Array(c.length);for(let l=0;l<c.length;l++)p[l]=c.charCodeAt(l);return new File([p],t,{type:o})}function yt(e){var i;const t=[],r=document.querySelectorAll("i.google-symbols, i[class*='google-symbols'], .material-symbols-outlined, .material-icons");for(const o of r)if(((i=o.textContent)==null?void 0:i.trim())===e){const c=o.closest("button");c&&t.push(c)}return t}function Re(){const e=[...yt("add"),...yt("add_2")];if(e.length===0){n("ไม่พบปุ่มเพิ่มจากไอคอน — ลองค้นหาจากข้อความ");const i=document.querySelectorAll("button");for(const o of i){const c=o.getBoundingClientRect();if(c.bottom>window.innerHeight*.7&&c.width<60&&c.height<60){const p=(o.textContent||"").trim();if(p==="+"||p==="add")return o}}return null}let t=null,r=0;for(const i of e){const o=i.getBoundingClientRect();o.y>r&&(r=o.y,t=i)}return t&&n(`พบปุ่ม "+" ของ Prompt Bar ที่ y=${r.toFixed(0)}`),t}function se(){for(const i of["arrow_forward","send","arrow_upward","navigate_next","arrow_right"]){const o=yt(i);let c=null,p=0;for(const s of o){const l=s.getBoundingClientRect();l.y>p&&(p=l.y,c=s)}if(c)return n(`พบปุ่ม Generate จากไอคอน "${i}" ที่ y=${p.toFixed(0)}`),c}const e=document.querySelectorAll("button");let t=null,r=0;for(const i of e){const o=i.getBoundingClientRect();if(o.bottom>window.innerHeight*.7&&o.right>window.innerWidth*.5){const c=Math.abs(o.width-o.height)<10&&o.width<60,p=o.y+o.x+(c?1e3:0);p>r&&(r=p,t=i)}}if(t)return n("พบปุ่ม Generate จากตำแหน่งขวาล่าง"),t;for(const i of e){const o=(i.getAttribute("aria-label")||"").toLowerCase();if(o.includes("generate")||o.includes("submit")||o.includes("send")||o.includes("สร้าง"))return i}return null}function le(){const e=document.querySelectorAll("textarea");for(const i of e)if(i.getBoundingClientRect().bottom>window.innerHeight*.5)return i;const t=document.querySelectorAll('[contenteditable="true"]');for(const i of t)if(i.getBoundingClientRect().bottom>window.innerHeight*.5)return i;const r=document.querySelectorAll("input[type='text'], input:not([type])");for(const i of r){const o=i.placeholder||"";if(o.includes("สร้าง")||o.includes("prompt")||o.includes("describe"))return i}return e.length>0?e[e.length-1]:null}async function Lt(e,t){var r,i,o,c;e.focus(),await m(300),n("วางข้อความ: วิธี 1 — Slate beforeinput insertFromPaste");try{const p=new DataTransfer;p.setData("text/plain",t),p.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertFromPaste",dataTransfer:p});e.dispatchEvent(s),n("วางข้อความ: ส่ง beforeinput insertFromPaste แล้ว");const l=new InputEvent("input",{bubbles:!0,inputType:"insertFromPaste",dataTransfer:p});e.dispatchEvent(l),await m(800);const d=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(d.length>20){n(`วางข้อความ: ✅ วิธี 1 สำเร็จ (${d.length} ตัวอักษร)`);return}n(`วางข้อความ: วิธี 1 — ไม่พบข้อความ (ได้ ${d.length} ตัวอักษร)`)}catch(p){n(`วางข้อความ: วิธี 1 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 2 — Slate beforeinput insertText");try{e.focus(),await m(100);const p=new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,inputType:"insertText",data:t});e.dispatchEvent(p);const s=new InputEvent("input",{bubbles:!0,inputType:"insertText",data:t});e.dispatchEvent(s),await m(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 2 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 2 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 2 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 3 — ClipboardEvent paste");try{e.focus(),await m(200);const p=new DataTransfer;p.setData("text/plain",t),p.setData("text/html",`<p>${t.replace(/\n/g,"<br>")}</p>`);const s=new ClipboardEvent("paste",{bubbles:!0,cancelable:!0,clipboardData:p});e.dispatchEvent(s),await m(800);const l=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(l.length>20){n(`วางข้อความ: ✅ วิธี 3 สำเร็จ (${l.length} ตัวอักษร)`);return}n("วางข้อความ: วิธี 3 — ไม่พบข้อความ")}catch(p){n(`วางข้อความ: วิธี 3 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 4 — navigator.clipboard + execCommand paste");try{if((r=navigator.clipboard)!=null&&r.writeText)await navigator.clipboard.writeText(t),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน navigator.clipboard");else{const s=document.createElement("textarea");s.value=t,s.style.cssText="position:fixed;left:-9999px;top:-9999px;opacity:0",document.body.appendChild(s),s.focus(),s.select(),document.execCommand("copy"),document.body.removeChild(s),n("วางข้อความ: คัดลอกไปคลิปบอร์ดผ่าน execCommand")}e.focus(),await m(200),document.execCommand("paste"),await m(500);const p=(e.textContent||"").replace(/คุณต้องการสร้างอะไร|What do you want to create/gi,"").trim();if(p.length>20){n(`วางข้อความ: ✅ วิธี 4 สำเร็จ (${p.length} ตัวอักษร)`);return}}catch(p){n(`วางข้อความ: วิธี 4 ล้มเหลว: ${p.message}`)}n("วางข้อความ: วิธี 5 — React fiber Slate editor");try{const p=Object.keys(e).find(s=>s.startsWith("__reactFiber$")||s.startsWith("__reactInternalInstance$"));if(p){let s=e[p];for(let l=0;l<30&&s;l++){const d=s.memoizedProps,$=s.memoizedState;if((i=d==null?void 0:d.editor)!=null&&i.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber props");const _=d.editor;_.selection,_.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน editor.insertText");return}if((c=(o=$==null?void 0:$.memoizedState)==null?void 0:o.editor)!=null&&c.insertText){n("วางข้อความ: พบ Slate editor ผ่าน fiber state"),$.memoizedState.editor.insertText(t),n("วางข้อความ: ✅ วิธี 5 — แทรกผ่าน state editor");return}s=s.return}n("วางข้อความ: พบ Fiber แต่ไม่พบ Slate editor ใน tree")}else n("วางข้อความ: ไม่พบ React fiber บน element")}catch(p){n(`วางข้อความ: วิธี 5 ล้มเหลว: ${p.message}`)}n("วางข้อความ: ⚠️ ลองครบทั้ง 5 วิธีแล้ว — ตรวจสอบผลใน Console")}function Fe(){const e=[],t=document.querySelectorAll('input[type="file"]');for(const r of t)e.push({input:r,origType:"file"}),r.type="text";return e.length>0&&n(`ปิดกั้น file input ${e.length} ตัว (type → text)`),e}function De(){const e=HTMLInputElement.prototype.click;return HTMLInputElement.prototype.click=function(){if(this.type==="file"){n(`🚫 บล็อกการเปิด file dialog (${ft})`);return}return e.call(this)},n(`🔒 ติดตั้งตัวบล็อก file dialog แล้ว (${ft})`),()=>{HTMLInputElement.prototype.click=e,n("🔓 ถอดตัวบล็อก file dialog แล้ว")}}function Le(e,t,r){var d;const i=document.querySelectorAll('input[type="text"][style*="display: none"], input[type="text"][hidden], input[type="text"]'),o=[...e.map($=>$.input)];for(const $ of i)!o.includes($)&&$.offsetParent===null&&o.push($);for(const $ of o)$.type="file";n(`คืนค่า input ${o.length} ตัวเป็น type=file`);const c=document.querySelectorAll('input[type="file"]');if(c.length===0)return n(`⚠️ ไม่พบ file input หลังคืนค่า (${ft})`),!1;let p;if(r&&r.size>0){const $=Array.from(c).filter(_=>!r.has(_));$.length>0?(p=$[$.length-1],n(`เล็งเป้า file input ใหม่ (${$.length} ใหม่, ${c.length} ทั้งหมด)`)):(p=c[c.length-1],n(`ไม่พบ file input ใหม่ — ใช้ตัวสุดท้ายจาก ${c.length} ตัว`))}else p=c[c.length-1];const s=new DataTransfer;s.items.add(t);try{p.files=s.files,n(`ฉีดไฟล์ผ่าน target.files (${((d=p.files)==null?void 0:d.length)??0} ไฟล์)`)}catch($){n(`กำหนด target.files ล้มเหลว: ${$.message} — ลอง defineProperty`);try{Object.defineProperty(p,"files",{value:s.files,writable:!0,configurable:!0}),n("ฉีดไฟล์ผ่าน Object.defineProperty")}catch(_){return F(`การฉีดไฟล์ล้มเหลวทั้ง 2 วิธี: ${_.message}`),!1}}const l=p._valueTracker;l&&(l.setValue(""),n("รีเซ็ต React _valueTracker บน file input")),p.dispatchEvent(new Event("change",{bubbles:!0})),p.dispatchEvent(new Event("input",{bubbles:!0}));try{const $=new DataTransfer;$.items.add(t);const _=new DragEvent("drop",{bubbles:!0,cancelable:!0,dataTransfer:$});p.dispatchEvent(_),n("ส่ง drop event บน file input ด้วย")}catch{}return n(`✅ ฉีดไฟล์เสร็จ: ${t.name} (${(t.size/1024).toFixed(1)} KB) → <input> ${ft}`),!0}function vt(){let e=0;const t=document.querySelectorAll("img");for(const i of t){if(i.closest("#netflow-engine-overlay"))continue;const o=i.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&i.src&&i.offsetParent!==null&&e++}const r=document.querySelectorAll('[style*="background-image"], [class*="thumb"], [class*="preview"]');for(const i of r){if(i.closest("#netflow-engine-overlay"))continue;const o=i.getBoundingClientRect();o.bottom>window.innerHeight*.6&&o.width>20&&o.width<200&&o.height>20&&o.height<200&&i.offsetParent!==null&&e++}return e}async function ce(e,t){var $;n(`── กำลังอัพโหลด ${t} ไปยัง Prompt Bar ──`);const r=Be(e,t);n(`ขนาดไฟล์: ${(r.size/1024).toFixed(1)} KB`);const i=vt();n(`รูปย่อปัจจุบันใน Prompt Bar: ${i} รูป`);const o=async(_,N=8e3)=>{const k=Date.now();for(;Date.now()-k<N;){const C=vt();if(C>i)return n(`✅ [${_}] ยืนยัน: รูปย่อเพิ่มจาก ${i} → ${C}`),!0;await m(500)}return n(`⚠️ [${_}] รูปย่อไม่เพิ่ม (ยังคง ${vt()} รูป)`),!1};n("── ขั้น 1: คลิกปุ่ม '+' (สร้าง) ──");const c=Re();if(!c)return F("ไม่พบปุ่ม '+' บน Prompt Bar"),!1;const p=new Set(document.querySelectorAll('input[type="file"]'));n(`file input ที่มีอยู่เดิม: ${p.size} ตัว`);const s=De();let l=Fe();const d=new MutationObserver(_=>{for(const N of _)for(const k of N.addedNodes)if(k instanceof HTMLInputElement&&k.type==="file"&&(k.type="text",l.push({input:k,origType:"file"}),n("🎯 Observer ปิดกั้น file input ใหม่")),k instanceof HTMLElement){const C=k.querySelectorAll('input[type="file"]');for(const b of C)b.type="text",l.push({input:b,origType:"file"}),n("🎯 Observer ปิดกั้น file input ซ้อน")}});d.observe(document.body,{childList:!0,subtree:!0});try{c.click(),n("คลิกปุ่ม '+' (สร้าง) แล้ว ✅"),await m(1500),n("── ขั้น 2: คลิกปุ่ม 'อัปโหลดรูปภาพ' ──");let _=!1;const N=Date.now();for(;!_&&Date.now()-N<5e3;){const C=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const b of C){if(b===c)continue;const a=b.querySelectorAll("i");for(const I of a){const P=(($=I.textContent)==null?void 0:$.trim())||"";if((P==="upload"||P==="upload_file")&&!Array.from(b.querySelectorAll("i")).map(E=>{var w;return(w=E.textContent)==null?void 0:w.trim()}).includes("drive_folder_upload")){b.click(),_=!0,n(`คลิกปุ่มอัปโหลด (ไอคอน: ${P}) ✅`);break}}if(_)break}if(!_)for(const b of C){if(b===c)continue;const a=b.childNodes.length<=5?(b.textContent||"").trim():"";if(a.length>0&&a.length<40){const I=a.toLowerCase();if(I==="upload"||I==="อัปโหลด"||I==="อัพโหลด"||I.includes("upload image")||I.includes("upload photo")||I.includes("อัปโหลดรูปภาพ")||I.includes("อัพโหลดรูปภาพ")||I.includes("from computer")||I.includes("จากคอมพิวเตอร์")){b.click(),_=!0,n(`คลิกปุ่มอัปโหลด (ข้อความ: "${a}") ✅`);break}}}_||await m(500)}return _?(await m(1e3),n("── ขั้น 3: ฉีดไฟล์ base64 เข้า file input ──"),Le(l,r,p)?(n(`ฉีดไฟล์ ${t} เสร็จ ✅`),n("── ขั้น 4: ตรวจสอบว่ารูปอัพโหลดเสร็จ ──"),await o("FileInput",1e4)||n("⚠️ ยังไม่พบรูปย่อใหม่ — อาจกำลังอัพโหลด (%)"),!0):(F(`ฉีดไฟล์ ${t} ล้มเหลว`),!1)):(F("ไม่พบปุ่มอัปโหลดในเมนูหลังรอ 5 วินาที"),!1)}finally{d.disconnect(),s();for(const _ of l)_.input.type!=="file"&&(_.input.type="file")}}async function Ne(e,t){n("=== ขั้น 0: ตั้งค่า Flow ===");const r=document.querySelectorAll("button");let i=null;for(const k of r){const C=k.textContent||"";if((C.includes("Nano Banana")||C.includes("Imagen")||C.includes("วิดีโอ")||C.includes("รูปภาพ")||C.includes("Image")||C.includes("Video"))&&k.getBoundingClientRect().bottom>window.innerHeight*.7){i=k,n(`พบปุ่มตั้งค่าจากข้อความ: "${C.substring(0,30).trim()}"`);break}}if(!i)for(const k of["crop_16_9","crop_portrait","crop_landscape","crop_3_2","crop_5_4"]){const C=yt(k);for(const b of C)if(b.getBoundingClientRect().bottom>window.innerHeight*.7){i=b,n(`พบปุ่มตั้งค่าจากไอคอน: ${k}`);break}if(i)break}if(!i)return F("ไม่พบปุ่มตั้งค่า"),!1;const o=i.getBoundingClientRect(),c=o.left+o.width/2,p=o.top+o.height/2,s={bubbles:!0,cancelable:!0,clientX:c,clientY:p,button:0};i.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),i.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",s)),i.dispatchEvent(new MouseEvent("click",s)),n("คลิกปุ่มตั้งค่าแล้ว"),await m(1500);let l=!1,d=null;const $=document.querySelectorAll('.flow_tab_slider_trigger[role="tab"]');for(const k of $){const C=k.getAttribute("aria-controls")||"",b=k.id||"";if(C.toUpperCase().includes("IMAGE")||b.toUpperCase().includes("IMAGE")){d=k,n(`พบแท็บ Image ผ่าน flow_tab_slider_trigger (aria-controls: ${C})`);break}}if(!d)for(const k of document.querySelectorAll('[role="tab"]')){const C=k.id||"";if(C.toUpperCase().includes("TRIGGER-IMAGE")){d=k,n(`พบแท็บ Image ผ่าน id: ${C}`);break}}if(!d)for(const k of document.querySelectorAll("button, [role='menuitem'], [role='option'], [role='tab']")){const C=(k.textContent||"").trim();if((C==="Image"||C.endsWith("Image")||C==="รูปภาพ"||C==="ภาพ")&&!C.includes("Video")&&!C.includes("วิดีโอ")){d=k,n(`พบแท็บ Image ผ่านข้อความ: "${C}"`);break}}if(d){const k=d.getAttribute("data-state")||"",C=d.getAttribute("aria-selected")||"";if(k==="active"||C==="true")l=!0,n("แท็บ Image เปิดอยู่แล้ว — ไม่ต้องคลิก");else{const b=d.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};d.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mousedown",a)),await m(80),d.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),d.dispatchEvent(new MouseEvent("mouseup",a)),d.dispatchEvent(new MouseEvent("click",a)),l=!0,n("✅ คลิกแท็บ Image — สลับเป็นโหมดรูปภาพแล้ว"),await m(400)}}l||n("⚠️ ไม่พบปุ่มโหมด Image — อาจอยู่ในโหมดนี้แล้ว");const _=e==="horizontal"?"แนวนอน":"แนวตั้ง";for(const k of document.querySelectorAll("button, [role='tab'], [role='option']")){const C=(k.textContent||"").trim();if(C===_||C.toLowerCase()===(e==="horizontal"?"landscape":"portrait")){const b=k.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",a)),await m(80),k.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",a)),k.dispatchEvent(new MouseEvent("click",a)),n(`เลือกทิศทาง: ${_}`),await m(400);break}}const N=`x${t}`;for(const k of document.querySelectorAll("button, [role='tab'], [role='option']"))if((k.textContent||"").trim()===N){const b=k.getBoundingClientRect(),a={bubbles:!0,cancelable:!0,clientX:b.left+b.width/2,clientY:b.top+b.height/2,button:0};k.dispatchEvent(new PointerEvent("pointerdown",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mousedown",a)),await m(80),k.dispatchEvent(new PointerEvent("pointerup",{...a,pointerId:1,isPrimary:!0,pointerType:"mouse"})),k.dispatchEvent(new MouseEvent("mouseup",a)),k.dispatchEvent(new MouseEvent("click",a)),n(`เลือกจำนวน: ${N}`),await m(400);break}return await m(300),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(300),i.dispatchEvent(new PointerEvent("pointerdown",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mousedown",s)),await m(80),i.dispatchEvent(new PointerEvent("pointerup",{...s,pointerId:1,isPrimary:!0,pointerType:"mouse"})),i.dispatchEvent(new MouseEvent("mouseup",s)),i.dispatchEvent(new MouseEvent("click",s)),n("ปิดหน้าตั้งค่าแล้ว"),await m(600),!0}async function Oe(e){var P,B,E,w;try{console.clear(),console.log("%c[Netflow AI] 🚀 Automation started — console cleared","color:#00e676;font-weight:bold;font-size:14px"),sessionStorage.removeItem("netflow_last_run"),sessionStorage.setItem("netflow_last_run",new Date().toISOString())}catch{}const t=navigator.userAgent,r=t.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/),i=r?r[1]:"unknown",o=Rt?"macOS":Ft?"Windows":/Linux/i.test(t)?"Linux":/CrOS/i.test(t)?"ChromeOS":"Unknown",c=Rt?((B=(P=t.match(/Mac OS X ([0-9_]+)/))==null?void 0:P[1])==null?void 0:B.replace(/_/g,"."))||"":Ft&&((E=t.match(/Windows NT ([0-9.]+)/))==null?void 0:E[1])||"",p=navigator.language||"unknown",s=`${window.innerWidth}x${window.innerHeight}`;n("══════════════════════════════════════════"),n(`🖥️ ระบบ: ${o} ${c} | Chrome ${i}`),n(`🌐 ภาษา: ${p} | หน้าจอ: ${s} | แพลตฟอร์ม: ${ft}`),n("══════════════════════════════════════════");try{Mt(e.theme)}catch{}try{Tt()}catch(h){console.warn("Overlay show error:",h)}const l=[],d=[];try{S("settings","active");const h=e.orientation||"horizontal",A=e.outputCount||1,g=await Ne(h,A);l.push(g?"✅ Settings":"⚠️ Settings"),S("settings",g?"done":"error")}catch(h){F(`ตั้งค่าผิดพลาด: ${h.message}`),l.push("⚠️ Settings"),S("settings","error")}n("=== ขั้น 1: อัพโหลดรูปอ้างอิง ===");const $=()=>{const h=document.querySelectorAll("span, div, p, label");for(const A of h){const g=(A.textContent||"").trim();if(/^\d{1,3}%$/.test(g)){if(g==="100%")return null;const x=A.getBoundingClientRect();if(x.width>0&&x.height>0&&x.top>0&&x.top<window.innerHeight)return g}}return null},_=async h=>{n(`รอการอัพโหลด ${h} เสร็จ...`),await m(2e3);const A=Date.now(),g=6e4;let x="",R=Date.now();const f=15e3;for(;Date.now()-A<g;){const u=$();if(u){if(u!==x)x=u,R=Date.now();else if(Date.now()-R>f){n(`✅ อัพโหลด ${h} — % ค้างที่ ${u} นาน ${f/1e3} วินาที ถือว่าเสร็จ`),await m(1e3);return}n(`กำลังอัพโหลด: ${u} — รอ...`),await m(1500)}else{n(`✅ อัพโหลด ${h} เสร็จ — ไม่พบตัวบอก %`),await m(1e3);return}}F(`⚠️ อัพโหลด ${h} หมดเวลาหลัง ${g/1e3} วินาที — ดำเนินการต่อ`)};if(e.characterImage){S("upload-char","active");try{const h=await ce(e.characterImage,"character.png");l.push(h?"✅ ตัวละคร":"⚠️ ตัวละคร"),h||d.push("character upload failed"),S("upload-char",h?"done":"error")}catch(h){F(`อัพโหลดตัวละครผิดพลาด: ${h.message}`),l.push("❌ ตัวละคร"),d.push("character upload error"),S("upload-char","error")}await _("character")}else pt("upload-char");if(e.productImage){S("upload-prod","active");try{const h=await ce(e.productImage,"product.png");l.push(h?"✅ สินค้า":"⚠️ สินค้า"),h||d.push("product upload failed"),S("upload-prod",h?"done":"error")}catch(h){F(`อัพโหลดสินค้าผิดพลาด: ${h.message}`),l.push("❌ สินค้า"),d.push("product upload error"),S("upload-prod","error")}await _("product")}else pt("upload-prod");n("ปิด dialog ที่เปิดอยู่..."),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800),document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",code:"Escape",bubbles:!0})),await m(800);const N=$();N&&(n(`⚠️ อัพโหลดยังแสดง ${N} — รอเพิ่มเติม...`),await _("final")),n("อัพโหลดทั้งหมดเสร็จ — ไปต่อที่ Prompt"),await m(1e3);const k=(e.characterImage?1:0)+(e.productImage?1:0);if(k>0){let h=vt();h<k&&(n(`⏳ เห็นรูปย่อแค่ ${h}/${k} — รอ 3 วินาที...`),await m(3e3),h=vt()),h>=k?n(`✅ ยืนยันรูปย่ออ้างอิง: ${h}/${k}`):F(`⚠️ คาดว่าจะมี ${k} รูปย่อ แต่พบ ${h} — ดำเนินการต่อ`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนวาง Prompt"),d.push("stopped by user");try{xt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}n("=== ขั้น 2: วาง Image Prompt ==="),S("img-prompt","active"),await m(1e3);const C=le();C?(await Lt(C,e.imagePrompt),n(`วาง Prompt แล้ว (${e.imagePrompt.length} ตัวอักษร)`),l.push("✅ Prompt"),S("img-prompt","done")):(F("ไม่พบช่องป้อนข้อความ Prompt"),l.push("❌ Prompt"),d.push("prompt input not found"),S("img-prompt","error")),await m(800);const b=new Set;document.querySelectorAll("img").forEach(h=>{h.src&&b.add(h.src)}),n(`บันทึกรูปเดิม: ${b.size} รูปก่อน Generate`),n("=== ขั้น 3: คลิก Generate → ==="),S("img-generate","active"),await m(500);const a=se();if(a){const h=a.getBoundingClientRect(),A=h.left+h.width/2,g=h.top+h.height/2,x={bubbles:!0,cancelable:!0,clientX:A,clientY:g,button:0};a.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",x)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",x)),a.dispatchEvent(new MouseEvent("click",x)),n("ส่งชุดคลิกเต็มรูปแบบบนปุ่ม Generate แล้ว"),l.push("✅ Generate"),await m(500),a.dispatchEvent(new PointerEvent("pointerdown",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mousedown",x)),await m(80),a.dispatchEvent(new PointerEvent("pointerup",{...x,pointerId:1,isPrimary:!0,pointerType:"mouse"})),a.dispatchEvent(new MouseEvent("mouseup",x)),a.dispatchEvent(new MouseEvent("click",x)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate"),S("img-generate","done")}else F("ไม่พบปุ่ม → Generate"),l.push("❌ Generate"),d.push("generate button not found"),S("img-generate","error");n("=== ขั้น 4: รอรูปที่สร้าง + ทำเป็นวิดีโอ ==="),S("img-wait","active");try{n("รอ 15 วินาทีเพื่อเริ่มการสร้าง..."),await m(15e3);const h=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const u of f){if(u.closest("#netflow-engine-overlay"))continue;const y=(u.textContent||"").trim();if(y.length>10)continue;const T=y.match(/(\d{1,3})\s*%/);if(!T)continue;const v=parseInt(T[1],10);if(v<1||v>100)continue;const M=u.getBoundingClientRect();if(!(M.width===0||M.width>150)&&!(M.top<0||M.top>window.innerHeight))return v}return null};n("ค้นหารูปที่สร้างใหม่ (ไม่ใช่รูปเดิม)...");let A=null,g=-1,x=0;const R=Date.now();for(;!A&&Date.now()-R<18e4;){const f=document.querySelectorAll("img");for(const u of f){if(b.has(u.src)||!(u.alt||"").toLowerCase().includes("generated"))continue;const T=u.getBoundingClientRect();if(T.width>120&&T.height>120&&T.top>0&&T.top<window.innerHeight*.85){const v=u.closest("div");if(v){A=v,n(`พบรูป AI จาก alt="${u.alt}": ${u.src.substring(0,80)}...`);break}}}if(!A)for(const u of f){if(b.has(u.src))continue;const y=u.closest("div"),T=(y==null?void 0:y.textContent)||"";if(T.includes("product.png")||T.includes("character.png")||T.includes(".png")||T.includes(".jpg"))continue;const v=u.getBoundingClientRect();if(v.width>120&&v.height>120&&v.top>0&&v.top<window.innerHeight*.85){const M=u.closest("div");if(M){A=M,n(`พบรูปใหม่ (สำรอง): ${u.src.substring(0,80)}...`);break}}}if(!A){if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอรูป");break}const u=re();if(u){F(`❌ สร้างรูปล้มเหลว: ${u}`),d.push(`image gen failed: ${u}`),S("img-wait","error");break}const y=h();y!==null?(y!==g&&(n(`🖼️ ความคืบหน้ารูปภาพ: ${y}%`),g=y,S("img-wait","active",y)),x=Date.now()):g>30&&Math.floor((Date.now()-x)/1e3)>=3&&n(`🖼️ % หายที่ ${g}% — รูปน่าจะเสร็จแล้ว`),await m(3e3)}}if(!A)F("หมดเวลารอรูปที่สร้าง"),l.push("⚠️ Wait Image"),S("img-wait","error");else{n("พบรูปที่สร้างแล้ว"),l.push("✅ Image Found"),S("img-wait","done",100);const f=A.getBoundingClientRect(),u=f.left+f.width/2,y=f.top+f.height/2,T={bubbles:!0,cancelable:!0,clientX:u,clientY:y};A.dispatchEvent(new PointerEvent("pointerenter",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mouseenter",T)),A.dispatchEvent(new PointerEvent("pointerover",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mouseover",T)),A.dispatchEvent(new PointerEvent("pointermove",{...T,pointerId:1,isPrimary:!0,pointerType:"mouse"})),A.dispatchEvent(new MouseEvent("mousemove",T)),n("ส่งเหตุการณ์ hover บนรูปแล้ว"),await m(1500);let v=null;for(const M of["more_vert","more_horiz","more"]){const O=yt(M);for(const L of O){const H=L.getBoundingClientRect();if(H.top>=f.top-20&&H.top<=f.bottom&&H.right>=f.right-150&&H.right<=f.right+20){v=L;break}}if(v)break}if(!v){const M=document.querySelectorAll("button");for(const O of M){const L=O.getBoundingClientRect();if(L.width<50&&L.height<50&&L.top>=f.top-10&&L.top<=f.top+60&&L.left>=f.right-80){const H=O.querySelectorAll("i");for(const K of H)if((((w=K.textContent)==null?void 0:w.trim())||"").includes("more")){v=O;break}if(v)break;const q=O.getAttribute("aria-label")||"";if(q.includes("เพิ่มเติม")||q.includes("more")){v=O;break}}}}if(!v)F("ไม่พบปุ่ม 3 จุดบนรูปที่สร้าง"),l.push("⚠️ 3-dots");else{const M=v.getBoundingClientRect(),O=M.left+M.width/2,L=M.top+M.height/2,H={bubbles:!0,cancelable:!0,clientX:O,clientY:L,button:0};v.dispatchEvent(new PointerEvent("pointerdown",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mousedown",H)),await m(80),v.dispatchEvent(new PointerEvent("pointerup",{...H,pointerId:1,isPrimary:!0,pointerType:"mouse"})),v.dispatchEvent(new MouseEvent("mouseup",H)),v.dispatchEvent(new MouseEvent("click",H)),n("คลิกปุ่ม 3 จุดแล้ว"),await m(1500);let q=null;const K=document.querySelectorAll("button, [role='menuitem'], [role='option'], li, div[role='button']");for(const Y of K){const J=(Y.textContent||"").trim();if(J.includes("ทำให้เป็นภาพเคลื่อนไหว")||J.includes("Animate")||J.includes("animate")){q=Y;break}}if(!q)F("ไม่พบเมนู 'ทำให้เป็นภาพเคลื่อนไหว'"),l.push("⚠️ Animate");else{const Y=q.getBoundingClientRect(),J=Y.left+Y.width/2,G=Y.top+Y.height/2,D={bubbles:!0,cancelable:!0,clientX:J,clientY:G,button:0};q.dispatchEvent(new PointerEvent("pointerdown",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mousedown",D)),await m(80),q.dispatchEvent(new PointerEvent("pointerup",{...D,pointerId:1,isPrimary:!0,pointerType:"mouse"})),q.dispatchEvent(new MouseEvent("mouseup",D)),q.dispatchEvent(new MouseEvent("click",D)),n("✅ คลิก 'ทำให้เป็นภาพเคลื่อนไหว' — สลับเป็นโหมดวิดีโอแล้ว"),l.push("✅ Animate"),S("animate","done"),await m(3e3)}}}}catch(h){F(`ขั้น 4 ผิดพลาด: ${h.message}`),l.push("⚠️ Animate")}if(ct()){n("⛔ ผู้ใช้สั่งหยุด — ยกเลิกก่อนขั้นวิดีโอ"),d.push("stopped by user");try{xt(3e3)}catch{}return{success:!1,message:"⛔ หยุดโดยผู้ใช้",step:"stopped"}}if(e.videoPrompt){n("=== ขั้น 5: วาง Video Prompt + สร้างวิดีโอ ==="),S("vid-prompt","active");try{n("รอ UI โหมดวิดีโอ..."),await m(3e3);let h=!1;const A=document.querySelectorAll("button, span, div");for(const R of A){const f=(R.textContent||"").trim(),u=R.getBoundingClientRect();if((f==="วิดีโอ"||f==="Video"||f.includes("วิดีโอ"))&&u.bottom>window.innerHeight*.7){h=!0,n("ยืนยัน: อยู่ในโหมดวิดีโอแล้ว");break}}h||n("ไม่พบตัวบอกโหมดวิดีโอ — ดำเนินการต่อ (อาจอยู่ในโหมดวิดีโอหลัง Animate)"),await m(1e3);const g=le();g?(await Lt(g,e.videoPrompt),n(`วาง Video Prompt แล้ว (${e.videoPrompt.length} ตัวอักษร)`),l.push("✅ Video Prompt"),S("vid-prompt","done")):(F("ไม่พบช่อง Prompt สำหรับ Video Prompt"),l.push("❌ Video Prompt"),d.push("video prompt input not found"),S("vid-prompt","error")),await m(1e3),S("vid-generate","active");const x=se();if(x){const R=x.getBoundingClientRect(),f=R.left+R.width/2,u=R.top+R.height/2,y={bubbles:!0,cancelable:!0,clientX:f,clientY:u,button:0};x.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),x.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",y)),x.dispatchEvent(new MouseEvent("click",y)),n("✅ คลิก Generate สำหรับวิดีโอ — เริ่มสร้างวิดีโอ!"),l.push("✅ Video Generate"),S("vid-generate","done"),await m(500),x.dispatchEvent(new PointerEvent("pointerdown",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mousedown",y)),await m(80),x.dispatchEvent(new PointerEvent("pointerup",{...y,pointerId:1,isPrimary:!0,pointerType:"mouse"})),x.dispatchEvent(new MouseEvent("mouseup",y)),x.dispatchEvent(new MouseEvent("click",y)),n("ส่งคลิกซ้ำเพื่อความปลอดภัยบนปุ่ม Generate วิดีโอ")}else F("ไม่พบปุ่ม Generate สำหรับวิดีโอ"),l.push("❌ Video Generate"),d.push("video generate button not found"),S("vid-generate","error")}catch(h){F(`ขั้น 5 ผิดพลาด: ${h.message}`),l.push("⚠️ Video Gen"),d.push(`video gen error: ${h.message}`)}}else n("ไม่มี Video Prompt — ข้ามขั้นสร้างวิดีโอ"),pt("animate"),pt("vid-prompt"),pt("vid-generate"),pt("vid-wait");if(e.videoPrompt){S("vid-wait","active");const h=e.sceneCount||1,A=e.videoScenePrompts||[e.videoPrompt];if(h>1)try{Se(h)}catch{}n(`=== ขั้น 6: รอวิดีโอ + ${h>1?`ต่อ ${h} ฉาก`:"ดาวน์โหลด"} ===`);const g=()=>{const f=document.querySelectorAll("div, span, p, label, strong, small");for(const u of f){if(u.closest("#netflow-engine-overlay"))continue;const y=(u.textContent||"").trim();if(y.length>10)continue;const T=y.match(/(\d{1,3})\s*%/);if(!T)continue;const v=parseInt(T[1],10);if(v<1||v>100)continue;const M=u.getBoundingClientRect();if(!(M.width===0||M.width>150)&&!(M.top<0||M.top>window.innerHeight))return v}return null},x=async(f=6e5)=>{n("รอการสร้างวิดีโอ..."),S("vid-wait","active"),await m(5e3);const u=()=>{const D=document.querySelectorAll("div, span, p, label, strong, small");let z=0;for(const j of D){if(j.closest("#netflow-engine-overlay"))continue;const ot=(j.textContent||"").trim();if(ot.includes("%")&&ot.length<15){const rt=j.tagName.toLowerCase(),fe=j.className&&typeof j.className=="string"?j.className.split(/\s+/).slice(0,2).join(" "):"",Nt=j.getBoundingClientRect();if(n(`  🔍 "${ot}" ใน <${rt}.${fe}> ที่ (${Nt.left.toFixed(0)},${Nt.top.toFixed(0)}) w=${Nt.width.toFixed(0)}`),z++,z>=5)break}}z===0&&n("  🔍 ไม่พบ element ที่มีข้อความ '%'")},y=Dt();n(y?"📍 การ์ดวิดีโอมีอยู่แล้วตั้งแต่เริ่ม":"⏳ ยังไม่มีการ์ดวิดีโอ — จะติดตามความคืบหน้า %"),n("🔍 สแกนข้อความ % เพื่อตรวจสอบ:"),u();const T=Date.now();let v=-1,M=0,O=!1;for(;Date.now()-T<f;){const D=g();if(D!==null){if(D!==v&&(n(`ความคืบหน้าวิดีโอ: ${D}%`),v=D,S("vid-wait","active",D)),M=Date.now(),D>=100){n("✅ ตรวจพบ 100%!"),O=!0;break}}else if(v>30){const z=Math.floor((Date.now()-M)/1e3);if(z>=5){n(`✅ % หายไปที่ ${v}% (หาย ${z} วินาที) — วิดีโอเสร็จ!`),O=!0;break}n(`⏳ % หายที่ ${v}% — ยืนยันใน ${5-z} วินาที...`)}else{const z=Math.floor((Date.now()-T)/1e3);z%15<3&&n(`⏳ รอ... (${z} วินาที) ไม่พบ %`)}if(!O&&v>0&&Dt(!0)&&!y){n(`✅ การ์ดวิดีโอปรากฏขึ้นที่ ${v}% — วิดีโอเสร็จ!`),O=!0;break}if(ct())return n("⛔ ผู้ใช้สั่งหยุดระหว่างรอวิดีโอ"),null;if(v<1){const z=re();if(z)return F(`❌ สร้างวิดีโอล้มเหลว: ${z}`),null}await m(3e3)}const L=Dt();if(!L)return n("❌ ไม่พบการ์ดวิดีโอที่จะคลิก"),S("vid-wait","error"),null;const H=L;O?(S("vid-wait","done",100),n("รอ 4 วินาทีก่อนคลิก..."),await m(4e3)):n("⚠️ หมดเวลา — ลองคลิกการ์ดวิดีโอต่อ");const q=H.getBoundingClientRect();let K=q.left+q.width/2,Y=q.top+q.height/2,J=H;const G=H.querySelector("video, img, canvas");if(G){const D=G.getBoundingClientRect();D.width>50&&D.height>50&&(K=D.left+D.width/2,Y=D.top+D.height/2,J=G,n(`🎯 พบรูปย่อ <${G.tagName.toLowerCase()}> ในการ์ดที่ (${K.toFixed(0)},${Y.toFixed(0)}) ${D.width.toFixed(0)}x${D.height.toFixed(0)}`))}else Y=q.top+q.height*.3,n(`🎯 ไม่พบรูปย่อย่อย — คลิกส่วนบน 1/3 ที่ (${K.toFixed(0)},${Y.toFixed(0)})`);n(`🖱️ ชี้เมาส์การ์ดวิดีโอ 4 วินาที ที่ (${K.toFixed(0)}, ${Y.toFixed(0)})...`),_e(J);for(let D=0;D<8;D++){const z={bubbles:!0,cancelable:!0,clientX:K+D%2,clientY:Y};J.dispatchEvent(new PointerEvent("pointermove",{...z,pointerId:1,isPrimary:!0,pointerType:"mouse"})),J.dispatchEvent(new MouseEvent("mousemove",z)),await m(500)}try{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"mute_video",sceneCount:h,scenePrompts:A,theme:e.theme}}),n(`💾 บันทึก pending action: mute_video (${h} ฉาก, ${A.length} prompts, theme: ${e.theme})`)}catch(D){n(`⚠️ ไม่สามารถบันทึก pending action: ${D.message}`)}return n("คลิกการ์ดวิดีโอเพื่อเข้าหน้ารายละเอียด..."),await R(J),n("✅ คลิกการ์ดวิดีโอเสร็จ"),H},R=async f=>{const u=f.getBoundingClientRect(),y=u.left+u.width/2,T=u.top+u.height/2,v={bubbles:!0,cancelable:!0,clientX:y,clientY:T,button:0};f.dispatchEvent(new PointerEvent("pointerdown",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mousedown",v)),await m(80),f.dispatchEvent(new PointerEvent("pointerup",{...v,pointerId:1,isPrimary:!0,pointerType:"mouse"})),f.dispatchEvent(new MouseEvent("mouseup",v)),f.dispatchEvent(new MouseEvent("click",v)),await m(50),f.click(),n("คลิกการ์ดวิดีโอแล้ว"),await m(2e3)};try{if(!await x())F("หมดเวลารอการสร้างวิดีโอ"),l.push("⚠️ Video Wait"),S("vid-wait","error");else{l.push("✅ Video Complete"),S("vid-wait","done",100),n("✅ คลิกเข้าหน้ารายละเอียดวิดีโอแล้ว — รอ mute จาก pending action"),await m(3e3);const u=await new Promise(y=>{chrome.storage.local.get("netflow_pending_action",T=>{if(chrome.runtime.lastError){y(null);return}y((T==null?void 0:T.netflow_pending_action)||null)})});u&&!u._claimed&&(n("🔄 สคริปต์ยังทำงานอยู่หลังคลิกการ์ด (SPA navigation) — เรียก pending action โดยตรง"),chrome.storage.local.remove("netflow_pending_action"),u.action==="mute_video"?await de(u.sceneCount||1,u.scenePrompts||[],u.theme):u.action==="wait_scene_gen_and_download"&&await pe(u.sceneCount||2,u.currentScene||2,u.theme))}}catch(f){F(`ขั้น 6 ผิดพลาด: ${f.message}`),l.push("⚠️ Step6"),d.push(`step 6: ${f.message}`)}}const I=d.length===0;try{xt(I?5e3:8e3)}catch(h){console.warn("Overlay complete error:",h)}return{success:I,message:I?`สำเร็จ! ${l.join(" → ")}`:`บางขั้นตอนมีปัญหา: ${l.join(" → ")} | ${d.join(", ")}`,step:I?"done":"partial"}}async function de(e,t=[],r){var I;n("═══ Auto Mute: ปิดเสียงวิดีโอ ═══");try{r&&Mt(r)}catch{}try{Tt(e)}catch(P){n(`⚠️ showOverlay error: ${P.message}`)}try{const P=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(const B of P)S(B,"done");e>=2&&S("scene2-prompt","active"),n(`✅ overlay restored: ${P.length} steps done, sceneCount=${e}`)}catch(P){n(`⚠️ overlay restore error: ${P.message}`)}await m(1500);const i=(()=>{for(const P of document.querySelectorAll("button")){const B=P.querySelectorAll("i");for(const w of B){const h=(w.textContent||"").trim();if(h==="volume_up"||h==="volume_off"||h==="volume_mute"){const A=P.getBoundingClientRect();if(A.width>0&&A.height>0)return P}}const E=(P.getAttribute("aria-label")||"").toLowerCase();if(E.includes("mute")||E.includes("ปิดเสียง")){const w=P.getBoundingClientRect();if(w.width>0&&w.height>0)return P}}return null})();if(i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),e>=2){n(`═══ ${e} ฉาก — เริ่มต่อฉาก ═══`),await m(2e3);for(let f=2;f<=e;f++){const u=t[f-1];if(!u){F(`ไม่พบ prompt สำหรับฉากที่ ${f}`);continue}n(`── ฉากที่ ${f}/${e}: วาง prompt + generate ──`);let y=null;const T=Date.now();for(;!y&&Date.now()-T<1e4;){const G=document.querySelectorAll("[data-slate-editor='true']");if(G.length>0&&(y=G[G.length-1]),!y){const D=document.querySelectorAll("[role='textbox'][contenteditable='true']");D.length>0&&(y=D[D.length-1])}y||await m(1e3)}if(!y){F("ไม่พบช่อง prompt (Slate editor)");return}n(`พบ Slate editor: <${y.tagName.toLowerCase()}> ${y.className.substring(0,40)}`),await Lt(y,u),n(`วาง prompt ฉาก ${f} (${u.length} ตัวอักษร) ✅`);try{S(`scene${f}-prompt`,"done"),S(`scene${f}-gen`,"active")}catch{}await m(1e3);const v=y.getBoundingClientRect();let M=null,O=1/0;for(const G of document.querySelectorAll("button")){if(G.disabled)continue;const D=G.querySelectorAll("i");let z=!1;for(const rt of D)if((rt.textContent||"").trim()==="arrow_forward"){z=!0;break}if(!z)continue;const j=G.getBoundingClientRect();if(j.width<=0||j.height<=0)continue;const ot=Math.abs(j.top-v.top)+Math.abs(j.right-v.right);ot<O&&(O=ot,M=G)}if(!M)for(const G of document.querySelectorAll("button")){const D=G.querySelectorAll("i");for(const z of D)if((z.textContent||"").trim()==="arrow_forward"){const j=G.getBoundingClientRect();if(j.width>0&&j.height>0){M=G;break}}if(M)break}if(!M){F("ไม่พบปุ่ม Generate/Send");return}await new Promise(G=>{chrome.storage.local.set({netflow_pending_action:{timestamp:Date.now(),action:"wait_scene_gen_and_download",theme:r,sceneCount:e,currentScene:f}},()=>G())}),n(`💾 บันทึก pending action: wait_scene_gen_and_download (ฉาก ${f}/${e})`),await et(M),n(`คลิก Generate ฉาก ${f} ✅`);try{S(`scene${f}-gen`,"done"),S(`scene${f}-wait`,"active")}catch{}n(`── รอวิดีโอฉาก ${f} gen เสร็จ ──`),await m(5e3);let L=0,H=0;const q=Date.now(),K=6e5,Y=5e3;let J=!1;for(;Date.now()-q<K;){let G=null;const D=document.querySelectorAll("div, span, p, label, strong, small");for(const z of D){if(z.closest("#netflow-engine-overlay"))continue;const ot=(z.textContent||"").trim().match(/^(\d{1,3})%$/);if(ot){const rt=z.getBoundingClientRect();if(rt.width>0&&rt.height>0&&rt.width<120&&rt.height<60){G=parseInt(ot[1],10);break}}}if(G!==null){if(G!==L){n(`🎬 ฉาก ${f} ความคืบหน้า: ${G}%`),L=G;try{S(`scene${f}-wait`,"active",G)}catch{}}H=0}else if(L>0){if(H===0)H=Date.now(),n(`🔍 ฉาก ${f}: % หายไป (จาก ${L}%) — กำลังยืนยัน...`);else if(Date.now()-H>=Y){n(`✅ ฉาก ${f}: % หายไป ${Y/1e3} วินาที — เจนเสร็จ!`),J=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุด");return}await m(2e3)}J||F(`ฉาก ${f} หมดเวลา`),n(`✅ ฉาก ${f} เสร็จแล้ว`);try{S(`scene${f}-wait`,"done",100)}catch{}chrome.storage.local.remove("netflow_pending_action"),n("🗑️ ลบ pending action (tracking เสร็จแล้วบนหน้านี้)"),await m(2e3)}n("── เริ่มดาวน์โหลด Full Video ──");try{S("download","active")}catch{}await m(2e3);const P=Date.now();let B=null;const E=Date.now();for(;!B&&Date.now()-E<1e4;){for(const f of document.querySelectorAll("button")){const u=f.querySelector("i");if(u&&(u.textContent||"").trim()==="download"){const y=f.getBoundingClientRect();if(y.width>0&&y.height>0){B=f;break}}}B||await m(1e3)}if(!B){F("ไม่พบปุ่มดาวน์โหลด");return}await et(B),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await m(1500);let w=null;for(let f=0;f<3&&!w;f++){f>0&&n(`🔄 ลองหา 720p ครั้งที่ ${f+1}...`);let u=null;const y=Date.now();for(;!u&&Date.now()-y<5e3;){for(const L of document.querySelectorAll("[role='menuitem']"))if((L.textContent||"").trim().includes("Full Video")&&L.querySelector("i")){const q=L.getBoundingClientRect();if(q.width>0&&q.height>0){u=L;break}}u||await m(500)}if(!u){F("ไม่พบ Full Video");continue}const T=u.getBoundingClientRect(),v=T.left+T.width/2,M=T.top+T.height/2;u.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:v,clientY:M})),u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:v,clientY:M})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:v,clientY:M})),await et(u),n("คลิก/hover Full Video ✅"),await m(2e3);const O=Date.now();for(;!w&&Date.now()-O<8e3;){for(const L of document.querySelectorAll("button[role='menuitem']")){const H=L.querySelectorAll("span");for(const q of H)if((q.textContent||"").trim()==="720p"){const K=L.getBoundingClientRect();if(K.width>0&&K.height>0){w=L;break}}if(w)break}w||(u.isConnected&&(u.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:v,clientY:M})),u.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:v+20,clientY:M}))),await m(500))}}if(!w){F("ไม่พบ 720p");return}await et(w),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const h=Date.now();let A=!1,g=!1;for(;Date.now()-h<3e5;){for(const f of document.querySelectorAll("div[data-title] div, div[data-content] div")){const u=(f.textContent||"").trim();if(u==="Download complete!"||u==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),A=!0;break}(u.includes("Downloading your extended video")||u.includes("กำลังดาวน์โหลด"))&&(g||(g=!0,n("⏳ กำลังดาวน์โหลด...")))}if(A)break;if(g){let f=!1;for(const u of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((u.textContent||"").trim().includes("Downloading")){f=!0;break}if(!f){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),A=!0;break}}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างดาวน์โหลด");return}await m(2e3)}if(!A){F("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let x=!1;const R=Date.now();for(;Date.now()-R<6e4&&!x;){try{await new Promise(f=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:P},u=>{chrome.runtime.lastError?F(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):u!=null&&u.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${u.message}`),x=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${u==null?void 0:u.message}`),f()})})}catch(f){F(`ตรวจสอบผิดพลาด: ${f.message}`)}x||await m(3e3)}x||F("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{S("open","done"),xt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น ═══");return}n("═══ 1 ฉาก — เริ่มดาวน์โหลด ═══"),await m(2e3);const o=(P,B="button, [role='menuitem'], [role='option'], li, span, div[role='button']")=>{for(const E of document.querySelectorAll(B)){const w=(E.textContent||"").trim();if(w.includes(P)&&w.length<100){const h=E.getBoundingClientRect();if(h.width>0&&h.height>0&&h.top>=0)return E}}return null};n("── ค้นหาปุ่มดาวน์โหลด ──");let c=null;const p=Date.now();for(;!c&&Date.now()-p<1e4;){for(const P of document.querySelectorAll("button, [role='button']")){const B=(P.textContent||"").trim(),E=B.toLowerCase();if((E.includes("download")||E.includes("ดาวน์โหลด"))&&B.length<80){const w=P.getBoundingClientRect();if(w.width>0&&w.height>0){c=P;break}}}if(!c)for(const P of document.querySelectorAll("button")){const B=(P.getAttribute("aria-label")||"").toLowerCase();if(B.includes("download")||B.includes("ดาวน์")){const E=P.getBoundingClientRect();if(E.width>0&&E.height>0){c=P;break}}}c||(n(`รอปุ่มดาวน์โหลด... (${document.querySelectorAll("button").length} ปุ่ม)`),await m(1e3))}if(!c){F("ไม่พบปุ่มดาวน์โหลด (รอ 10 วินาที)");return}n(`พบปุ่มดาวน์โหลด: "${(c.textContent||"").trim().substring(0,40)}"`),await et(c),n("คลิกปุ่มดาวน์โหลดแล้ว ✅"),await m(1500);const s=Date.now();let l=null;const d=Date.now();for(;!l&&Date.now()-d<5e3;)l=o("1080p"),l||(n("รอ 1080p..."),await m(500));if(!l){F("ไม่พบ 1080p");return}await et(l),n("คลิก 1080p Upscaled ✅"),n("รอการอัปสเกลเสร็จ...");const $=Date.now();let _=!1,N=!1,k=0;const C=3e3;for(;Date.now()-$<3e5;){const B=((document.body.innerText||"")+" "+(document.body.textContent||"")).toLowerCase();if(B.includes("upscaling complete")||B.includes("อัปสเกลเสร็จ")){n("✅ Upscaling complete!"),_=!0;break}for(const w of document.querySelectorAll("div, span, p")){const h=(w.textContent||"").trim().toLowerCase();if(h.length<60&&(h.includes("upscaling complete")||h.includes("อัปสเกลเสร็จ"))){n(`✅ Upscaling complete! (element: "${(I=w.textContent)==null?void 0:I.trim()}")`),_=!0;break}}if(_)break;if(B.includes("upscaling your video")||B.includes("กำลังอัปสเกล")){N=!0,k=0;const w=Math.floor((Date.now()-$)/1e3);n(`⏳ กำลังอัปสเกล... (${w} วินาที)`)}else if(N){if(k===0)k=Date.now(),n("🔍 ข้อความ Upscaling หายไป — กำลังยืนยัน...");else if(Date.now()-k>=C){n(`✅ ข้อความ Upscaling หายไป ${C/1e3} วินาที — เสร็จ!`),_=!0;break}}else{const w=Math.floor((Date.now()-$)/1e3);w%10<3&&n(`⏳ รอ Upscale... (${w} วินาที)`)}if(ct()){n("⛔ ผู้ใช้สั่งหยุดระหว่างรอ Upscale");return}await m(2e3)}if(!_){F("Upscale หมดเวลา — ไฟล์อาจยังอัปสเกลอยู่");return}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let b=!1;const a=Date.now();for(;Date.now()-a<6e4&&!b;){try{await new Promise(P=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:s},B=>{chrome.runtime.lastError?F(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):B!=null&&B.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${B.message}`),b=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${B==null?void 0:B.message}`),P()})})}catch(P){F(`ตรวจสอบผิดพลาด: ${P.message}`)}b||await m(3e3)}b||F("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้"),n("═══ ดาวน์โหลดเสร็จสิ้น ═══")}async function pe(e=2,t=2,r){n(`═══ Pending: รอ scene ${t}/${e} gen เสร็จ + ดาวน์โหลด ═══`);try{r&&Mt(r)}catch{}try{Tt(e)}catch(E){n(`⚠️ showOverlay error: ${E.message}`)}try{const E=["settings","upload-char","upload-prod","img-prompt","img-generate","img-wait","animate","vid-prompt","vid-generate","vid-wait"];for(let w=2;w<=t;w++)E.push(`scene${w}-prompt`,`scene${w}-gen`),w<t&&E.push(`scene${w}-wait`);for(const w of E)S(w,"done");S(`scene${t}-wait`,"active"),n(`✅ overlay restored: ${E.length} steps done (scene ${t}/${e} navigate)`)}catch(E){n(`⚠️ overlay restore error: ${E.message}`)}await m(2e3);const i=(()=>{for(const E of document.querySelectorAll("button")){const w=E.querySelectorAll("i");for(const h of w){const A=(h.textContent||"").trim();if(A==="volume_up"||A==="volume_off"||A==="volume_mute"){const g=E.getBoundingClientRect();if(g.width>0&&g.height>0)return E}}}return null})();i?(i.click(),n("🔇 คลิกปิดเสียงวิดีโอแล้ว ✅")):n("⚠️ ไม่พบปุ่มปิดเสียง — ข้าม"),n(`── รอวิดีโอ scene ${t} gen เสร็จ (หลัง page navigate) ──`);let o=0,c=0;const p=Date.now(),s=6e5,l=5e3;let d=!1,$=0;for(;Date.now()-p<s;){let E=null;const w=document.querySelectorAll("div, span, p, label, strong, small");for(const h of w){if(h.closest("#netflow-engine-overlay"))continue;const g=(h.textContent||"").trim().match(/^(\d{1,3})%$/);if(g){const x=h.getBoundingClientRect();if(x.width>0&&x.height>0&&x.width<120&&x.height<60){E=parseInt(g[1],10);break}}}if(E!==null){if($=0,E!==o){n(`🎬 scene ${t} ความคืบหน้า: ${E}%`),o=E;try{S(`scene${t}-wait`,"active",E)}catch{}}c=0}else if(o>0){if(c===0)c=Date.now(),n(`🔍 scene ${t}: % หายไป (จาก ${o}%) — กำลังยืนยัน...`);else if(Date.now()-c>=l){n(`✅ scene ${t}: % หายไป ${l/1e3} วินาที — เจนเสร็จ!`),d=!0;break}}else if($++,$>=15){const h=document.querySelectorAll("video");let A=!1;for(const g of h)if(g.readyState>=2&&!g.paused&&g.getBoundingClientRect().width>200){A=!0;break}if(A){n(`✅ scene ${t}: พบวิดีโอกำลังเล่น — ถือว่า gen เสร็จแล้ว`),d=!0;break}if($>=30){n(`✅ scene ${t}: ไม่พบ % มานาน 60 วินาที — ถือว่าเสร็จ`),d=!0;break}}await m(2e3)}d||n(`⚠️ scene ${t} หมดเวลา — ลองดาวน์โหลดต่อ`);try{S(`scene${t}-wait`,"done",100)}catch{}n(`✅ scene ${t} เสร็จ — เริ่มดาวน์โหลด`),await m(3e3);try{S("download","active")}catch{}n("── เริ่มดาวน์โหลด Full Video (หลัง page navigate) ──");const _=Date.now();let N=null;const k=Date.now();for(;!N&&Date.now()-k<1e4;){for(const E of document.querySelectorAll("button")){const w=E.querySelector("i");if(w&&(w.textContent||"").trim()==="download"){const h=E.getBoundingClientRect();if(h.width>0&&h.height>0){N=E;break}}}N||await m(1e3)}if(!N){F("ไม่พบปุ่มดาวน์โหลด");return}await et(N),n("คลิกดาวน์โหลดแล้ว ✅");try{S("download","done"),S("upscale","active")}catch{}await m(1500);let C=null;for(let E=0;E<3&&!C;E++){E>0&&n(`🔄 ลองหา 720p ครั้งที่ ${E+1}...`);let w=null;const h=Date.now();for(;!w&&Date.now()-h<5e3;){for(const f of document.querySelectorAll("[role='menuitem']"))if((f.textContent||"").trim().includes("Full Video")&&f.querySelector("i")){const y=f.getBoundingClientRect();if(y.width>0&&y.height>0){w=f;break}}w||await m(500)}if(!w){F("ไม่พบ Full Video");continue}const A=w.getBoundingClientRect(),g=A.left+A.width/2,x=A.top+A.height/2;w.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0,clientX:g,clientY:x})),w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:g,clientY:x})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g,clientY:x})),await et(w),n("คลิก/hover Full Video ✅"),await m(2e3);const R=Date.now();for(;!C&&Date.now()-R<8e3;){for(const f of document.querySelectorAll("button[role='menuitem']")){const u=f.querySelectorAll("span");for(const y of u)if((y.textContent||"").trim()==="720p"){const T=f.getBoundingClientRect();if(T.width>0&&T.height>0){C=f;break}}if(C)break}C||(w.isConnected&&(w.dispatchEvent(new MouseEvent("mouseover",{bubbles:!0,clientX:g,clientY:x})),w.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:g+20,clientY:x}))),await m(500))}}if(!C){F("ไม่พบ 720p");return}await et(C),n("คลิก 720p ✅"),n("รอดาวน์โหลดเสร็จ...");const b=Date.now();let a=!1,I=!1;for(;Date.now()-b<3e5;){for(const E of document.querySelectorAll("div[data-title] div, div[data-content] div")){const w=(E.textContent||"").trim();if(w==="Download complete!"||w==="ดาวน์โหลดเสร็จ"){n("✅ Download complete! (toast)"),a=!0;break}(w.includes("Downloading your extended video")||w.includes("กำลังดาวน์โหลด"))&&(I||(I=!0,n("⏳ กำลังดาวน์โหลด...")))}if(a)break;if(I){let E=!1;for(const w of document.querySelectorAll("div[data-title] div, div[data-content] div"))if((w.textContent||"").trim().includes("Downloading")){E=!0;break}if(!E){n("✅ ดาวน์โหลดเสร็จ (toast หายไป)"),a=!0;break}}await m(2e3)}if(!a){F("ดาวน์โหลดหมดเวลา");return}try{S("upscale","done",100),S("open","active")}catch{}n("รอไฟล์ดาวน์โหลดพร้อม..."),await m(5e3);let P=!1;const B=Date.now();for(;Date.now()-B<6e4&&!P;){try{await new Promise(E=>{chrome.runtime.sendMessage({action:"OPEN_LATEST_VIDEO",afterTimestamp:_},w=>{chrome.runtime.lastError?F(`ตรวจสอบดาวน์โหลดผิดพลาด: ${chrome.runtime.lastError.message}`):w!=null&&w.success?(n(`✅ เปิดวิดีโอใน Chrome แล้ว: ${w.message}`),P=!0):n(`ดาวน์โหลดยังไม่พร้อม: ${w==null?void 0:w.message}`),E()})})}catch(E){F(`ตรวจสอบผิดพลาด: ${E.message}`)}P||await m(3e3)}P||F("ไม่สามารถหา/เปิดวิดีโอที่ดาวน์โหลดได้");try{S("open","done"),xt(8e3)}catch{}n("═══ ดาวน์โหลด Full Video เสร็จสิ้น (หลัง page navigate) ═══")}async function Ge(){try{const e=await new Promise(c=>{chrome.storage.local.get("netflow_pending_action",p=>{if(chrome.runtime.lastError){c(null);return}c((p==null?void 0:p.netflow_pending_action)||null)})});if(!e||!e.timestamp)return;if(!window.location.href.includes("/edit/")){n("⏭️ pending action พบ แต่ไม่ใช่หน้า video detail — ข้าม");return}if(e._claimed){n("⏭️ pending action ถูก tab อื่น claim แล้ว — ข้าม");return}const r=Date.now()-e.timestamp;if(r>3e5){n("⏰ พบ pending action แต่เก่าเกินไป — ข้าม"),chrome.storage.local.remove("netflow_pending_action");return}const i=`${Date.now()}-${Math.random().toString(36).slice(2)}`;if(e._claimed=i,await new Promise(c=>{chrome.storage.local.set({netflow_pending_action:e},()=>c())}),await m(300),!await new Promise(c=>{chrome.storage.local.get("netflow_pending_action",p=>{const s=p==null?void 0:p.netflow_pending_action;c((s==null?void 0:s._claimed)===i)})})){n("⏭️ pending action ถูก tab อื่น claim ชนะ — ข้าม");return}chrome.storage.local.remove("netflow_pending_action"),n(`🔄 ตรวจพบ pending action: ${e.action} (อายุ ${Math.round(r/1e3)} วินาที)`),e.action==="mute_video"?await de(e.sceneCount||1,e.scenePrompts||[],e.theme):e.action==="wait_scene_gen_and_download"||e.action==="wait_scene2_gen_and_download"?await pe(e.sceneCount||2,e.currentScene||2,e.theme):n(`⚠️ ไม่รู้จัก pending action: ${e.action}`)}catch(e){n(`⚠️ checkAndRunPendingAction error: ${e.message}`)}}chrome.runtime.onMessage.addListener((e,t,r)=>{if((e==null?void 0:e.action)==="GENERATE_IMAGE")return window.__NETFLOW_STOP__=!1,n("ได้รับคำสั่ง GENERATE_IMAGE"),r({success:!0,message:"⏳ เริ่มกระบวนการอัตโนมัติแล้ว — ดูผลที่หน้า Google Flow",step:"started"}),Oe(e).then(i=>n(`✅ ระบบอัตโนมัติเสร็จ: ${i.message}`)).catch(i=>console.error("[Netflow AI] Generate error:",i)),!1;if((e==null?void 0:e.action)==="STOP_AUTOMATION")return n("⛔ ได้รับ STOP_AUTOMATION — ตั้งค่าสถานะหยุด"),window.__NETFLOW_STOP__=!0,r({success:!0,message:"Stop signal sent"}),!1;if((e==null?void 0:e.action)==="PING")return r({status:"ready"}),!1;if((e==null?void 0:e.action)==="CLICK_FIRST_IMAGE")return r({success:!0,message:"⏳ กำลังคลิกรูปแรก..."}),(async()=>{n("CLICK_FIRST_IMAGE — ค้นหาการ์ดรูปแรกผ่านไอคอน <i>image</i>..."),await m(500);const i=Te();if(!i){F("ไม่พบการ์ดรูปผ่านไอคอน <i>image</i>");return}const o=i.getBoundingClientRect(),c=o.left+o.width/2,p=o.top+o.height/2;n(`การ์ดรูปที่ (${c.toFixed(0)}, ${p.toFixed(0)}) ${o.width.toFixed(0)}x${o.height.toFixed(0)} — คลิก 2 ครั้ง`);for(let s=0;s<2;s++){const l=document.elementFromPoint(c,p);l?(await et(l),n(`คลิก ${s+1}/2 บน <${l.tagName.toLowerCase()}>`)):(await et(i),n(`คลิก ${s+1}/2 บนการ์ด (สำรอง)`)),await m(300)}n("✅ คลิกการ์ดรูป 2 ครั้งเสร็จ")})(),!1}),n("สคริปต์ Google Flow พร้อมแล้ว — รอคำสั่ง"),Ge(),document.addEventListener("dblclick",e=>{const t=e.target;if(!t)return;const r=t.tagName.toLowerCase(),i=Math.round(e.clientX),o=Math.round(e.clientY),c=(t.textContent||"").trim().slice(0,30);n(`🖱️🖱️ ดับเบิลคลิก (${i},${o}) → <${r}> "${c}"`)},!0)})();
